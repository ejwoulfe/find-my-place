import express from 'express';
import { stateRouter } from './routes/states.js';
const app = express();
const port = 8888;
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


// Routes
app.use('/states', stateRouter);



app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});







