const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: [true, 'duration is missing'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'group size is missing'],
  },
  difficulty: {
    type: String,
    required: [true, 'difficulty is missing'],
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'summary is required'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'image cover is required.'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
