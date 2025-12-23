import express from "express";
import prisma from "./db/index.js";
import  errorHandler from './middleware/error.middleware.js'

export const app = express();

app.use(express.json());

app.use(errorHandler);



app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await prisma.user.create({
    data: { name, email, password }
  });

  res.json(user);
});


app.get("/users", async (req, res) => {
  const users = await prisma.User.findMany();
  res.json(users);
});

app.get("/", (req, res) => {
  res.send("Express app is running 🚀");
});
