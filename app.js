const env = process.env.NODE_ENV || 'prod'
const config = require(`./config.${ env === 'dev' ? 'dev' : 'prod' }.json`) 
const swaggerDocument = require('./swagger.json');
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const app = express()
const router = express.Router()

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
})


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

