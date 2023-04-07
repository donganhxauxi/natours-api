const express = require("express");
const {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
} = require("../controllers/toursController");

const router = express.Router();

router.route("/").get(getAllTours).post(createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
