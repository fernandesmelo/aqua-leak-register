const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
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

const Leak = mongoose.model("Leak", {
  name: String,
  description: String,
  photo: String,
  latitude: Number,
  longitude: Number,
  emPerigo: Boolean,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.get("/leaks", async (req, res) => {
  const leaks = await Leak.find();
  res.json(leaks);
});

app.post("/leaks", upload.single("photo"), async (req, res) => {
  const { name, description, latitude, longitude, emPerigo } = req.body;
  const photo = req.file ? req.file.path.replace(/\\/g, "/") : null;
  const leak = new Leak({
    name,
    description,
    photo,
    latitude,
    longitude,
    emPerigo: emPerigo === "true",
  });
  await leak.save();
  res.json(leak);
});

app.listen(3000, "0.0.0.0", () =>
  console.log("Backend listening on port 3000")
);
