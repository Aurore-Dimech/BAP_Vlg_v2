import express from "express";
import { getUsers, getUserById, updateUser, deleteUser, verifyRole, importUsers } from '../controllers/UserController.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUser)
router.patch('/update/:id', updateUser)
router.get('/connection', verifyRole)
router.post('/import', importUsers)

export default router