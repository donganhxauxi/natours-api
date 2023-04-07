const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  let queryOptions = { ...req.query };

  const excludeOptions = ["page", "limit", "sort", "fields"];

  excludeOptions.forEach((option) => {
    delete queryOptions[option];
  });

  const tours = await Tour.find(queryOptions);

  res.status(200).json({
    status: "success",
    quantity: tours.length,
    data: tours,
  });
};

exports.getTour = async (req, res) => {
  const { id: tourId } = req.params;

  const tour = await Tour.findById(tourId);

  res.status(200).json({
    status: "success",
    data: tour,
  });
};

exports.createTour = async (req, res) => {
  try {
    const createTourRes = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      msg: "tour successfully created.",
      data: {
        tour: createTourRes,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { id: tourId } = req.params;
    const updateTourRes = await Tour.findByIdAndUpdate(tourId, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour: updateTourRes,
      },
    });
  } catch (err) {}
};

exports.deleteTour = async (req, res) => {
  try {
    const { id: tourId } = req.params;
    await Tour.findByIdAndDelete(tourId);

    res.status(200).json({
      status: "success",
      msg: "tour successfully deleted.",
    });
  } catch (err) {}
};
