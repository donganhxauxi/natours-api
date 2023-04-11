require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')
const path = require('path')
const Tour = require('./models/tourModel')

const dbURI = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

const toursDataPath = path.join(
  process.cwd(),
  'dev-data',
  'data',
  'tours-simple.json'
)

mongoose.connect(dbURI)

const populateTours = () => {
  const tours = JSON.parse(fs.readFileSync(toursDataPath, 'utf-8'))
  Tour.create(tours).then((doc) => {
    console.log(doc)
  })
}

const deleteTours = () => {
  Tour.deleteMany().then((val) => {
    console.log(val)
  })
}

if (process.argv[2] === '--import') populateTours()
if (process.argv[2] === '--delete') deleteTours()
