const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const cookieparser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { globalErrorHandler } = require('./middlewares');

const { REACT_APP_URL, NEXT_APP_URL } = process.env;

if (!REACT_APP_URL || !NEXT_APP_URL) {
  throw new Error('REACT_APP_URL or NEXT_APP_URL is not defined');
}

const corsOptions = {
  //  To allow requests from client
  origin: [
    REACT_APP_URL,
    NEXT_APP_URL,
    'https://ahrohimpromcentr.com',
    'https://ahrohimpromcentr.com/*',
  ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

const app = express();
app.use(cookieparser());

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const {
  usersRouter,
  vacanciesRouter,
  productsRouter,
  feedbackRouter,
  servicesRouter,
  resumesRouter,
  authenticationRouter,
} = require('./routes/api');

app.use(logger(formatsLogger));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authenticationRouter);
app.use('/api/users', usersRouter);
app.use('/api/vacancies', vacanciesRouter);
app.use('/api/products', productsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/resumes', resumesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(globalErrorHandler);

module.exports = app;
