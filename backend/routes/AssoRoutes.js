import express from "express";
import multer from 'multer'
import path from 'path'
import { getAssos,getClosedAssos, getAsso, createAsso, updateAsso, deleteAsso, searchAsso, getEventsByAsso, getAssosByCategories } from "../controllers/AssoController.js" 
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

router.get('/', getAssos)
router.get('/deleted', verifyToken, getClosedAssos)
router.get('/:id', getAsso)
router.get('/events/:id', getEventsByAsso)
router.post('/', upload.single('image'), verifyToken, createAsso)
router.patch('/:id', upload.single('image'),verifyToken, updateAsso)
router.delete('/:id', verifyToken, deleteAsso)
router.get('/search/:searchInput', searchAsso)
router.get('/category/:category', getAssosByCategories)

router.post('/upload', upload.single('file'), (req, res) => {
    const filePath = req.file.path
})

export default router