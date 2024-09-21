const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const moment = require("moment");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);
app.use(express.json());
// Use cookie-parser middleware
app.use(cookieParser());

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
    const patientsCollection = database.collection("patients");

    // jwt
    app.post("/jwt", async (req, res) => {
      const { email, password } = req.body;
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "6h",
        });
        res.send({ token });
      } else {
        res.status(401).send({ message: "Invalid email or password" });
      }
    });

    // middlewares
    const verifyAdminAccess = (req, res, next) => {
      const token = req.cookies.admin_token; // Get token from cookies
      if (!token) {
        return res.status(401).send({ message: "Unauthorized access" });
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized access" });
        }

        const email = decoded.email;
        if (email !== process.env.ADMIN_EMAIL) {
          return res.status(401).send({ message: "Unauthorized access!!" });
        }

        req.user = decoded;
        next();
      });
    };

    app.get("/chart-data", async (req, res) => {
      try {
        const { year, month } = req.query;

        // Prepare appointment query based on formatted date
        let appointmentQuery = { date: { $regex: `${year}` } };

        // If month is provided, refine the appointment query
        if (month) {
          const monthName = moment(month, "MM").format("MM"); // Convert month number to two-digit format
          appointmentQuery.date = { $regex: `${monthName}/${year}` };
        }

        // Fetch appointments
        const appointments = await appointmentCollection
          .find(appointmentQuery)
          .toArray();

        let patientQuery = {
          createdAt: {
            $gte: `${month}/01/${year}`,
            $lte: `${month}/31/${year}`,
          },
        };

        // Fetch patients
        const patients = await patientsCollection.find(patientQuery).toArray();

        // Return both appointments and patients data
        res.status(200).json({ appointments, patients });
      } catch (error) {
        console.error("Error fetching chart data:", error); // Log the error for debugging
        res.status(500).send({ error: "Failed to fetch data" });
      }
    });

    app.get("/patients", verifyAdminAccess, async (req, res) => {
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
        const patients = await patientsCollection
          .find(query)
          .skip(skip)
          .sort({ _id: -1 })
          .limit(limit)
          .toArray();

        const total = await patientsCollection.countDocuments(query);

        res.send({
          patients,
          total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        });
      } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).send({ message: "Error fetching appointments" });
      }
    });

    app.post("/patients", async (req, res) => {
      try {
        const patient = req.body;

        // Get the current date
        const now = new Date();

        // Format the date as MM/DD/YYYY
        const formattedDate = `${
          now.getMonth() + 1
        }/${now.getDate()}/${now.getFullYear()}`;

        patient.createdAt = formattedDate;

        const result = await patientsCollection.insertOne(patient);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to add patient" });
      }
    });

    app.delete("/patients/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await patientsCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          res.status(404).send({ error: "Patient not found" });
        } else {
          res.send(result);
        }
      } catch (error) {
        res.status(500).send({ error: "Failed to delete patient" });
      }
    });

    app.put("/patients/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await patientsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );

        if (result.matchedCount === 0) {
          res.status(404).send({ error: "Patient not found" });
        } else {
          res.send(result);
        }
      } catch (error) {
        res.status(500).send({ error: "Failed to update patient" });
      }
    });

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
      let blockReason = "";
      let blockedTimes = [];

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
            blockedTimes.push({
              startTime: blockedStartMinutes,
              endTime: blockedEndMinutes,
              date: blockedDate,
              day: blockedDay,
            });

            if (isDateBlocked) {
              blockReason = `The selected time ${time} on ${date} is Closed for appointment.`;
            } else if (isDayBlocked) {
              blockReason = `The selected time ${time} on ${day} is closed for appointment.`;
            } else if (isTimeRangeBlockedForAll) {
              blockReason = `The selected time ${time} is closed for appointment.`;
            }
            break;
          }
        } else if (isDateBlocked || isDayBlocked) {
          isBlocked = true;
          if (isDateBlocked) {
            blockReason = `The selected date ${date} is closed for appointments.`;
          } else if (isDayBlocked) {
            blockReason = `Appointments are closed in ${day}.`;
          }
          break;
        }
      }

      if (isBlocked) {
        return res.status(400).send({
          error: "Unable to book appointment",
          message: blockReason,
          blockedTimes: blockedTimes.map(
            ({ startTime, endTime, date, day }) => ({
              startTime: startTime
                ? new Date(startTime * 60 * 1000).toISOString().substr(11, 5)
                : "N/A",
              endTime: endTime
                ? new Date(endTime * 60 * 1000).toISOString().substr(11, 5)
                : "N/A",
              date: date || "N/A",
              day: day || "N/A",
            })
          ),
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
