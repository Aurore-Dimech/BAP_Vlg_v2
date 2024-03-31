import express from "express";
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent, searchEvent, getArchivedEvents } from "../controllers/EventController.js" 

const router = express.Router() 

router.get('/', getEvents)
router.get('/archived', getArchivedEvents)
router.get('/:id', getEvent)
router.post('/', createEvent)
router.patch('/:id', updateEvent)
router.delete('/:id', deleteEvent)
router.get('/search/:searchInput', searchEvent)

export default router