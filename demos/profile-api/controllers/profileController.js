const fs = require("fs");
const path = "./data/profiles.json";

const getProfiles = () => {
  const data = fs.readFileSync(path);
  return JSON.parse(data);
};

exports.getAll = (req, res) => {
  res.json(getProfiles());
};

exports.getOne = (req, res) => {
  const profiles = getProfiles();
  const profile = profiles.find((p) => p.id === req.params.id);
  profile ? res.json(profile) : res.status(404).json({ error: "Not found" });
};

exports.addOne = (req, res) => {
  const profiles = getProfiles();
  const newProfile = {
    id: profiles.length + 1,
    name: req.body.name,
    job: req.body.job,
  };
  profiles.push(newProfile);
  fs.writeFileSync(path, JSON.stringify(profiles, null, 2));
  res.status(201).json(newProfile);
};
