class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  //filtering : URL/v1/movie?movieName=abcd&language=kannada&rating[gt|gte|lte|lt]=value
  filter() {
    const queryObj = { ...this.queryString };
    console.log(queryObj);
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|lte|gt|eq|lt)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  //sorting the output values : URL/v1/movie?movieName=abcd&language=kannada&rating[gt|gte|lte|lt]=value&sort=value
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort({ createdAt: -1 });
    }
    return this;
  }

  //limiting the fields : URL/v1/movie?movieName=abcd&language=kannada&rating[gt|gte|lte|lt]=value&sort=value&fields=a,b,c,d
  limitFields() {
    if (this.queryString.limitFields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select({ __v: -1 });
    }
    return this;
  }

  //Pagination : URL/v1/movie?movieName=abcd&language=kannada&rating[gt|gte|lte|lt]=value&sort=value&fields=a,b,c,d&page=3&limit=10
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default APIFeatures;