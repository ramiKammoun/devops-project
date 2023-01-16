const mongoose = require('mongoose');
// Allow Promises
mongoose.Promise = global.Promise;
// Connection
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify:false  });
// Validation
mongoose.connection
  .once('open', () => console.log('Connected to the database!'))
  .on('error', err => console.log('Error with the database!', err));

//mongodb+srv://Rami:rami@cluster0.btbcw.mongodb.net/?retryWrites=true&w=majority
//process.env.CONNECTION_URL