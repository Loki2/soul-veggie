const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createHttpError = require('http-errors');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const connectFlash = require('connect-flash');

const app = express();

//Initialization Middleware
app.use(morgan('dev'));
app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../', 'public')));
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, '../', 'temp'),
  createParentPath: true,
  limits: { fileSize: 5 * 1024 * 1024 }
}))


//Init session
app.use(session({
  secret: process.env.SESSION_SECRET || 'SOME_OF_SUPER_SECRET',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true
  }
}));



//connect flash
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
})



//Connection to database --MongoDB
mongoose.connect(process.env.DB_URI || 'mongodb+srv://Loki2:rixnickz1135@cluster0.eiqpo.mongodb.net/soul-veggie?retryWrites=true&w=majority', {
  dbName: process.env.DB_NAME || 'soul-veggie',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to database ...!')
});

//Import routers
const AuthRoute = require('./Routes/Auth.Routes');
const UserRoute = require('./Routes/User.Routes');
const HomeRoute = require('./Routes/Home.Routes');
const MyInfoRoute = require('./Routes/MyInfo.Routes');
const AdminRoute = require('./Routes/Admin.Routes');
const CateRoute = require('./Routes/Category.Routes');
const SuppRoute = require('./Routes/Supplier.Routes');
const VegetableRoute = require('./Routes/Vegetable.Routes');
const MemberRoute = require('./Routes/Member.Routes');
const MarketRoute = require('./Routes/Market.Routes');
const ProductRoute = require('./Routes/Product.Routes');

//Manage Routes
const ManageRoute = require('./Routes/Manage.Routes');

app.use('/', HomeRoute);
app.use('/auth', AuthRoute);

app.use('/admin', AdminRoute);
app.use('/category', CateRoute);
app.use('/user', UserRoute);
app.use('/supplier', SuppRoute);
app.use('/vegetable', VegetableRoute);
app.use('/member', MemberRoute);
app.use('/market', MarketRoute);
app.use('/product', ProductRoute);

//Management
app.use('/manage', ManageRoute);


app.use('/my-info', MyInfoRoute);


//Handle Error
app.use((req, res, next) => {
  next(createHttpError.NotFound());
})

app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.send(error);
})

module.exports = app;