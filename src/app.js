const flash = require('connect-flash');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');

const { database } = require('./keys');


const app = express();
require('./lib/passport');


// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});


// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/auth.routes'));
app.use(require('./routes/user.routes'));
app.use('/reports', require('./routes/reports.routes'));


// Public
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;