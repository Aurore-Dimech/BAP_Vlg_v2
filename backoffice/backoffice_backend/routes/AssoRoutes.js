import express from "express";
import { getAssos,getClosedAssos, getAsso, createAsso, updateAsso, deleteAsso, searchAsso, getEventsByAsso, getAssosByCategories } from "../controllers/AssoController.js" 

const router = express.Router() 

router.get('/', getAssos)
router.get('/deleted', getClosedAssos)
router.get('/:id', getAsso)
router.get('/events/:id', getEventsByAsso)
router.post('/', createAsso)
router.patch('/:id', updateAsso)
router.delete('/:id', deleteAsso)
router.get('/search/:searchInput', searchAsso)
router.get('/category/:category', getAssosByCategories)

export default router