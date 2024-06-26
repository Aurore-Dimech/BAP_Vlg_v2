import express from "express";
import multer from 'multer'
import path from 'path'
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent, searchEvent, getArchivedEvents, findAssociatedAsso } from "../controllers/EventController.js" 
import { verifyRole, verifyToken } from "../controllers/UserController.js";

const router = express.Router()
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
}) 
const upload = multer({ storage: storage })

router.get('/', getEvents)
router.get('/archived',verifyToken, getArchivedEvents)
router.get('/:id', getEvent)
router.post('/', upload.single('image'),verifyToken, createEvent)
router.patch('/:id', upload.single('image'),verifyToken, updateEvent)
router.delete('/:id',verifyToken, deleteEvent)
router.get('/search/:searchInput', searchEvent)
router.get('/association/:id', findAssociatedAsso)

router.post('/upload', upload.single('file'), (req, res) => {
    const filePath = req.file.path
})

export default router