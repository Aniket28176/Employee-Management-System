const { createEmploy, getAllEmploy,getEmployById,deleteEmployById ,updateEmployById } = require('../controllers/EmployController');
const { cloudinaryFileUploader } = require('../Middlewares/FileUploader');
const { verifyToken } = require('../Middlewares/AuthMiddleware');

const routes = require('express').Router();

// Require authentication to access employ routes (employees and admins)
routes.get('/', verifyToken, getAllEmploy);

routes.post('/', verifyToken, cloudinaryFileUploader.single('profileImage'), createEmploy);

routes.get('/:id', verifyToken, getEmployById);
routes.put('/:id', verifyToken, cloudinaryFileUploader.single('profileImage'), updateEmployById);
routes.delete('/:id', verifyToken, deleteEmployById);

module.exports = routes;