const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const cron = require("node-cron");
const moment = require("moment");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT,
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.iq3jpr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "arne35@ethereal.email",
    pass: "gTMfHzP1TSyA6X5wJ2",
  },
});

function scheduleReminderEmail(name, email, date, time) {
  const appointmentMoment = moment(`${date} ${time}`, "DD/MM/YYYY hh:mm A");
  const reminderMoment = appointmentMoment.subtract(1, "hour");

  // Schedule the reminder email
  schedule.scheduleJob(reminderMoment.toDate(), () => {
    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Appointment Reminder",
      text: `Dear ${name}, this is a reminder for your appointment at ${time} on ${date}.`,
    };

    transporter.sendMail(mailOptions);
  });
}

async function run() {
  try {
    const database = client.db("Denta-Ease");
    const appointmentCollection = database.collection("appointments");
    const blockedCollection = database.collection("blockedDates");

    // // jwt
    // app.post("/jwt", async (req, res) => {
    //   const user = req.body;
    //   const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: "6h",
    //   });
    //   res.send({ token });
    // });

    // // middlewares
    // const verifyToken = (req, res, next) => {
    //   if (!req.headers.authorization) {
    //     return res.status(401).send({ message: "unauthorized access" });
    //   }
    //   const token = req.headers.authorization.split(" ")[1];
    //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //     if (err) {
    //       return res.status(401).send({ message: "unauthorized access" });
    //     }
    //     req.user = decoded;
    //     next();
    //   });
    // };

    // const verifyAdmin = async (req, res, next) => {
    //   const user = req.user;
    //   const query = { email: user?.email };
    //   const result = await userCollection.findOne(query);

    //   if (!result || result?.role !== "admin")
    //     return res.status(401).send({ message: "unauthorized access!!" });

    //   next();
    // };
    // verify member middleware

    // upload Appointments
    app.post("/appointments", async (req, res) => {
      const { name, email, date, time, day } = req.body;

      const timeToMinutes = (timeStr) => {
        const [time, period] = timeStr.split(" ");
        const [hours, minutes] = time.split(":").map(Number);
        return ((hours % 12) + (period === "PM" ? 12 : 0)) * 60 + minutes;
      };

      const appointmentTimeMinutes = timeToMinutes(time);

      const appointmentDate = date;
      const appointmentDayOfWeek = day;

      const blockedEntries = await blockedCollection.find().toArray();

      let isBlocked = false;

      for (const entry of blockedEntries) {
        const {
          date: blockedDate,
          day: blockedDay,
          startTime,
          endTime,
        } = entry;

        const blockedDayOfWeek = blockedDate
          ? new Date(blockedDate).toLocaleDateString("en-US", {
              weekday: "long",
            })
          : "";

        const blockedStartMinutes = startTime ? timeToMinutes(startTime) : null;
        const blockedEndMinutes = endTime ? timeToMinutes(endTime) : null;

        const isDateBlocked = blockedDate && blockedDate === date;
        const isDayBlocked = blockedDay && blockedDay === appointmentDayOfWeek;

        const isTimeRangeBlockedForAll =
          !blockedDate &&
          !blockedDay &&
          blockedStartMinutes !== null &&
          blockedEndMinutes !== null;

        if (blockedStartMinutes !== null && blockedEndMinutes !== null) {
          const isTimeBlocked =
            appointmentTimeMinutes >= blockedStartMinutes &&
            appointmentTimeMinutes <= blockedEndMinutes;

          if (
            (isDateBlocked || isDayBlocked || isTimeRangeBlockedForAll) &&
            isTimeBlocked
          ) {
            isBlocked = true;
            break;
          }
        } else if (isDateBlocked || isDayBlocked) {
          isBlocked = true;
          break;
        }
      }

      if (isBlocked) {
        return res.status(400).send({
          error: "Selected date/time/day is blocked for appointments",
        });
      }

      // If not blocked, proceed with booking the appointment
      const result = await appointmentCollection.insertOne(req.body);

      // Send confirmation email
      const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "Appointment Confirmation",
        text: `Dear ${name}, your appointment is confirmed for ${time} on ${date}.`,
      };

      transporter.sendMail(mailOptions);

      // Schedule reminder email
      scheduleReminderEmail(name, email, date, time);

      res.send(result);
    });

    app.get("/appointments", async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;
      const search = req.query.search || "";

      let query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };
      try {
        const appointments = await appointmentCollection
          .find(query)
          .skip(skip)
          .sort({ _id: -1 })
          .limit(limit)
          .toArray();

        const total = await appointmentCollection.countDocuments(query);

        res.send({
          appointments,
          total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        });
      } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).send({ message: "Error fetching appointments" });
      }
    });

    // Get today's appointments
    app.get("/appointments/today", async (req, res) => {
      try {
        const today = new Date();
        const formattedToday = today.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          weekday: "long",
        });

        // Reformat to match the stored format in MongoDB
        const formattedTodayMongo = `${formattedToday.split(", ")[1]} ${
          formattedToday.split(", ")[0]
        }`;

        const todayAppointments = await appointmentCollection
          .find({
            date: formattedTodayMongo, // Match the stored date format in MongoDB
          })
          .toArray();

        res.send(todayAppointments);
      } catch (error) {
        res.status(500).send({
          error: "An error occurred while fetching today's appointments",
        });
      }
    });

    // add blocked appointment date
    app.post("/block-date", async (req, res) => {
      try {
        const blockData = req.body;
        const result = await blockedCollection.insertOne(blockData);
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .send({ error: "An error occurred while blocking date/time/day" });
      }
    });

    // API to Get All Blocked Dates/Times/Days
    app.get("/blocked-dates", async (req, res) => {
      try {
        const blockedDates = await blockedCollection.find({}).toArray();
        res.send(blockedDates);
      } catch (error) {
        res.status(500).send({
          error: "An error occurred while fetching blocked dates/times/days",
        });
      }
    });

    // API to Delete a Blocked Date/Time/Day
    app.delete("/blocked-dates/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await blockedCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      } catch (error) {
        res
          .status(500)
          .send({ error: "An error occurred while deleting blocked entry" });
      }
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server running ${port}`);
});
