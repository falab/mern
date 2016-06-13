import express from 'express';
import blog from './blog';
import socialIcons from './socialIcons';

const router = new express.Router();

router.use('/blog', blog);
router.use('/socialIcons', socialIcons);

export default router;
