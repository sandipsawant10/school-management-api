import express from "express";
import db from "./config/db.js";
import schoolRoutes from "./routes/school.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "School Management API is running" });
});

app.use("/api", schoolRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
