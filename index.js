import express from 'express';
import cors from 'cors';
import sequelize from './models';

const app = express();
app.use(cors());

const port = process.env.PORT || 9000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = [];
routes.forEach((route) => app.use('/api', route.router));

sequelize.authenticate().then(async () => {
  await sequelize.sync();
  app.listen(port, () => console.log(`Server running on ${port}`));
});
