const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const mongoURI = process.env.MONGO_URI;

(async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error.message);
  }
})();

const leakRoutes = require("./routes/leakRoutes");
app.use("/leaks", leakRoutes);

app.listen(3000, "0.0.0.0", () =>
  console.log("Backend listening on port 3000")
);