import express from "express";
import { getAssos, getAsso, searchAsso, getEventsByAsso, getAssosByCategories } from "../controllers/AssoController.js" 

const router = express.Router() 

router.get('/', getAssos)
router.get('/:id', getAsso)
router.get('/events/:id', getEventsByAsso)
router.get('/search/:searchInput', searchAsso)
router.get('/category/:category', getAssosByCategories)

export default router