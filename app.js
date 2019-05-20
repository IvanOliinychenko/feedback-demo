var env = process.env.NODE_ENV || 'production';
var config = require(`./config.${ env === 'dev' ? 'dev' : 'prod' }.json`);
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./api/swagger.json');

var auth = require('./routes/auth');
var feedbackRouter = require('./routes/feedback');
var errorHandler = require('./middlewares/errorHandler');
var database = require('./middlewares/database');
var debug = require('debug')('feedback-demo:server');
var cors = require('cors')

var app = express();
app.disable('x-powered-by');
app.config = config;
app.debug = debug;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(database());

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/auth', auth);
app.use('/api/v1/feedback', feedbackRouter);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

module.exports = app;
