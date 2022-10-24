require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/user.router');
const authRouter = require('./routes/auth.router');
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const db = require('./models');
const swaggerUi = require('swagger-ui-express');

//SWAGGER SETUP
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0.0',
      title: 'User Management API',
      description: 'User management API that performs basic CRUD operations',
      contact: {
        name: 'Gerardo Abantao Jr.',
      },
      servers: 'http://localhost:' + 3001 + '/',
    },
  },
  // ['.routes/*.js']
  // apis: ["server.js"]
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(cors());
//db.sequelize.sync();

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Server Started on port ' + port);
});

module.exports = app;
