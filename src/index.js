import express from 'express';
import cors from 'cors';
import sequelize from './models/index.js';
import User from './models/User.model.js';

import authRoutes from './routes/auth.route.js';

const app = express();
app.use(cors());

const port = process.env.PORT || 9000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);

sequelize
  .authenticate()
  .then(async () => {
    console.log(`Connected to DB:-${process.env.DB_NAME}`);
    await sequelize.sync({ alter: true }).then(() => {
      console.log('synced db');
      // const models = [User];
    });
    app.listen(port, () => console.log(`Server running on ${port}`));
  })
  .catch((err) => {
    console.log('Failed to authenticate database!' + err);
  });
