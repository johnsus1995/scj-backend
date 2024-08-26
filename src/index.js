import express from 'express';
import cors from 'cors';
import sequelize from '../models/index.js';

const app = express();
app.use(cors());

const port = process.env.PORT || 9000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = [];
routes.forEach((route) => app.use('/api', route.router));

sequelize
  .authenticate()
  .then(async () => {
    console.log(`Connected to DB:-${process.env.DB_NAME}`);
    await sequelize.sync({ alter: true });
    app.listen(port, () => console.log(`Server running on ${port}`));
  })
  .catch((err) => {
    console.log('Failed to authenticate database!' + err);
  });
