const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });


//NOTE - connection to DB-URL
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   })
//   .then(() => console.log('DB connection established'))
//   .catch((err) => console.log(err.message));

mongoose
  .connect('mongodb://127.0.0.1:27017/ticket-master-node', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('MongoDB connection established successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    console.error('Error code:', error.code);
    process.exit(1); // Exit the process with an error code
  });

//NOTE - Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}....`);
});

process.on('uncaughtException', (err) => {
  console.error('Unhandled Rejection:', err.stack || err);
  server.close(() => {
    process.exit(1); //1 for uncalled exception and 0 for successfull
  });
});
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.stack || err);
  server.close(() => {
    process.exit(1); //1 for uncalled exception and 0 for successfull
  });
});
