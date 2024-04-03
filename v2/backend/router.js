import express from 'express';
import asso from './routes/AssoRoutes.js'
import auth from './routes/AuthRoutes.js'
import event from './routes/EventRoutes.js'
import user from './routes/UserRoutes.js'

const router = express.Router();

router.use('/associations', asso)
router.use('/auth', auth)
router.use('/events', event)
router.use('/users', user)

export default router