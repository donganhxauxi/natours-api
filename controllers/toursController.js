const Tour = require('../models/tourModel')

const QueryFeatures = require('../utils/apiFeatures')

exports.getAllTours = async (req, res) => {
  const query = new QueryFeatures(Tour, req.query)
    .filter()
    .sort()
    .limitingFields()
    .pagination().query

  const tours = await query

  res.status(200).json({
    status: 'success',
    quantity: tours.length,
    data: tours,
  })
}

exports.get5CheapestTourAlias = (req, _, next) => {
  req.query.limit = 5
  req.query.sort = 'price name'
  next()
}

exports.getTour = async (req, res) => {
  const { id: tourId } = req.params

  const tour = await Tour.findById(tourId)

  res.status(200).json({
    status: 'success',
    data: tour,
  })
}

exports.getToursStat = async (_, res) => {
  const stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: { $gte: 4.5 },
      },
    },
    {
      $group: {
        _id: '$difficulty',
        sum: { $sum: 1 },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        avgPrice: 1,
      },
    },
  ])

  res.status(200).json({
    status: 'success',
    stats,
  })
}

exports.createTour = async (req, res) => {
  const createTourRes = await Tour.create(req.body)
  res.status(201).json({
    status: 'success',
    msg: 'tour successfully created.',
    data: {
      tour: createTourRes,
    },
  })
}

exports.updateTour = async (req, res) => {
  const { id: tourId } = req.params
  const updateTourRes = await Tour.findByIdAndUpdate(tourId, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    status: 'success',
    data: {
      tour: updateTourRes,
    },
  })
}

exports.deleteTour = async (req, res) => {
  const { id: tourId } = req.params
  await Tour.findByIdAndDelete(tourId)

  res.status(200).json({
    status: 'success',
    msg: 'tour successfully deleted.',
  })
}

exports.getMonthlyPlan = async (req, res) => {
  try {
    const { year } = req.params

    const monthlyPlan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: {
            $month: '$startDates',
          },
          numTours: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: {
          month: '$_id',
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          numTours: 1,
        },
      },
    ])

    res.status(200).json({
      status: 'success',
      data: monthlyPlan,
    })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      msg: 'failed to query.',
    })
  }
}
