const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT,
  })
);
app.use(express.json());

async function run() {
  try {
    const database = client.db("Denta-Ease");
    const appointmentCollection = database.collection("appointments");

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
      const appointment = req.body;

      const result = await appointmentCollection.insertOne(appointment);
      res.send(result);
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
