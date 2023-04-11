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

const populateTours = async () => {
  const tours = JSON.parse(fs.readFileSync(toursDataPath, 'utf-8'))
  await Tour.create(tours)
  console.log('done')
}

const deleteTours = async () => {
  await Tour.deleteMany()
  console.log('done')
}

if (process.argv[2] === '--import') populateTours()
if (process.argv[2] === '--delete') deleteTours()
