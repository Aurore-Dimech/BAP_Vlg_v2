import express from 'express';
import asso from './routes/AssoRoutes.js'
import event from './routes/EventRoutes.js'

const router = express.Router();

router.use('/associations', asso)
router.use('/events', event)

export default router