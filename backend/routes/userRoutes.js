import express from 'express'
const router = express.Router()
import { authUser, userProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controller/userController.js'
import { protect, admin } from '../middleware/authMiddlewere.js'


router.post('/login', authUser)
router.post('/', registerUser)
router.get('/', protect, admin, getUsers)
router.delete('/:id', protect, admin, deleteUser)
router.get('/:id', protect, admin, getUserById)
router.put('/:id', protect, admin, updateUser)

router.route('/profile')
    .get(protect, userProfile)
    .put(protect, updateUserProfile)



export default router