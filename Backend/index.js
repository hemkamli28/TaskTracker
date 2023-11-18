const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
connectToMongo();

const app = express();
const port = 5000;  

app.use(cors())
app.use(express.json());
//Routes
app.get("/",(req, res) => {
    res.send("Welcome ")
})
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})