const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('./models/db');

const client = require('prom-client');
const {requestCounter} = require('./metrics')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cors')());
app.use(require('helmet')());

app.use('/api/students', require('./routes/students'));

app.get('/api', (req, res) => {
  try{
      requestCounter.inc({'method':'Get' ,'route': '/', 'status_code': 200, 'many':false})
      res.send('This is the students Platform!');
  }catch(err){
      requestCounter.inc({'method': 'Get','route': '/', 'status_code': 400, 'many':false})
  }
})

app.get('/metrics', async (req, res) => {
  try{
      return res.status(200).send(await client.register.metrics())
  }
  catch(err){

  }
})

// Production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`App running on port ${PORT}`)  );