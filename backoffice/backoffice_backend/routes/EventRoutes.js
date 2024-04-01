import express from "express";
import multer from 'multer'
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent, searchEvent, getArchivedEvents } from "../controllers/EventController.js" 

const router = express.Router() 
const upload = multer({ dest: 'uploads/' })

router.get('/', getEvents)
router.get('/archived', getArchivedEvents)
router.get('/:id', getEvent)
router.post('/', createEvent)
router.patch('/:id', upload.single('image'), updateEvent)
router.delete('/:id', deleteEvent)
router.get('/search/:searchInput', searchEvent)

router.post('/upload', upload.single('file'), (req, res) => {
    const filePath = req.file.path
})

export default router