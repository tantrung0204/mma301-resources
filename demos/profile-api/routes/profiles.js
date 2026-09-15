const express = require("express");
const { getAll, getOne, addOne } = require("../controllers/profileController");
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", addOne);

module.exports = router;
