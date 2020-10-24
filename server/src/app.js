const express       = require('express');
const app           = express();
const appRoute      = require('./api/index');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const mongoose      = require('mongoose');
const PORT          = process.env.PORT || 3100;


mongoose.connect('mongodb://localhost:27017/mern-todo-app',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => { console.log('Database is Connected'); },
    err => {console.log('error',err); }
  );
  mongoose.set('useCreateIndex', true);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use('/api/v1/',appRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
  });
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });

app.listen(PORT,(err)=>{
    if(err){
        console.log('Server Could not start');
    } else {
        console.log(`Server is Running on Port ${PORT}`);
    }
})