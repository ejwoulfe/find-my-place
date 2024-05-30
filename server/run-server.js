import express from 'express';
import { stateRouter } from './routes/states.js';
import { cityRouter } from './routes/cities.js';
const app = express();
const port = 8888;
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


// Routes
app.use('/states', stateRouter);
app.use('/cities', cityRouter);



app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});







