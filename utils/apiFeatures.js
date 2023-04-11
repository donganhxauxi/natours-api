class QueryFeatures {
  constructor(query, queryOptions) {
    this.query = query
    this.queryOptions = queryOptions
  }

  filter() {
    let queryOptions = { ...this.queryOptions }

    const excludeOptions = ['page', 'limit', 'sort', 'fields']
    excludeOptions.forEach((option) => {
      delete queryOptions[option]
    })

    const queryOptionsString = JSON.stringify(queryOptions).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => '$' + match
    )

    this.query = this.query.find(JSON.parse(queryOptionsString))
    return this
  }

  sort() {
    if (this.queryOptions.sort) {
      const sortingCriteria = this.queryOptions.sort.replace(/\b,\b/g, ' ')
      this.query = this.query.sort(sortingCriteria)
    } else {
      this.query = this.query.sort('_id')
    }

    return this
  }

  limitingFields() {
    if (this.queryOptions.fields) {
      const selectedFields = this.queryOptions.fields.replace(/\b,\b/g, ' ')
      this.query = this.query.select(selectedFields)
    }
    this.query = this.query.select('-__v')

    return this
  }

  pagination() {
    const page = this.queryOptions.page * 1 || 1
    const limit = this.queryOptions.limit * 1 || 100
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}

module.exports = QueryFeatures
