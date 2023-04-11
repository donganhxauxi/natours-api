const mongoose = require('mongoose')
const app = require('./app')

const dbURI = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose.connect(dbURI).then(() => {
  app.listen(process.env.PORT, () => {})
})
