import express from 'express';

const router = express.Router();

router.post('/sign-up', (req, res) => {
  res.send('signUp');
});

export default router;
