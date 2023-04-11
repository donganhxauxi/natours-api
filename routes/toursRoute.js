const express = require('express')
const {
  createTour,
  getAllTours,
  get5CheapestTourAlias,
  getTour,
  getToursStat,
  getMonthlyPlan,
  updateTour,
  deleteTour,
} = require('../controllers/toursController')

const router = express.Router()

router.route('/').get(getAllTours).post(createTour)

router.route('/top-5-cheapest').get(get5CheapestTourAlias, getAllTours)
router.route('/stats').get(getToursStat)
router.route('/monthly-plan/:year').get(getMonthlyPlan)

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
