var env = process.env.NODE_ENV || 'production';
var config = require(`./config.${ env === 'development' ? 'dev' : 'prod' }.json`);
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./api/swagger.json');

var signin = require('./routes/signin');
var feedbackRouter = require('./routes/feedback');
var sessionRouter = require('./routes/session');
var errorHandler = require('./middlewares/errorHandler');
var database = require('./middlewares/database');
var debug = require('debug')('feedback-demo:server');
var cors = require('cors')

var app = express();
app.disable('x-powered-by');
app.config = config;
app.debug = debug;

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "allowedHeaders": ['Content-Type', 'Authorization', 'X-Total', 'X-Limit'],
  "exposedHeaders": ['Content-Type', 'Authorization', 'X-Total', 'X-Limit']
}));
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

app.use('/api/v1/signin', signin);
app.use('/api/v1/feedback', feedbackRouter);
app.use('/api/v1/session', sessionRouter);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

module.exports = app;
