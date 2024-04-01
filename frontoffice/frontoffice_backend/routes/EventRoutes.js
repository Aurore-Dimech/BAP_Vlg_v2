import express from "express";
import { getEvents, getEvent, searchEvent, findAssociatedAsso } from "../controllers/EventController.js" 

const router = express.Router() 

router.get('/', getEvents)
router.get('/:id', getEvent)
router.get('/association/:id', findAssociatedAsso)
router.get('/search/:searchInput', searchEvent)

export default router