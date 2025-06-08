const Leak = require("../models/Leak");

exports.getLeaks = async (req, res) => {
  const leaks = await Leak.find();
  res.json(leaks);
};

exports.createLeak = async (req, res) => {
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
};