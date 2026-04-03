import express from 'express';
import AuthRoutes from './authroutes.js';
import AuthController from '../controllers/authcontroller.js';
import AuthServices from '../services/authservices.js';
import UserServiceRoutes from './users.services.routes.js';
import UserController from '../controllers/UserController.js';
import UserServices from '../services/userservices.js';
import TransactionServices from '../services/transactionservices.js';
import TransactionsController from '../controllers/transactionscontroller.js';
import TransactionRoutes from './transactions.routes.js';
import DashboardServices from '../services/dashboardservices.js';
import DashboardController from '../controllers/dashboardcontroller.js';
import DashboardRoutes from './dashboardroutes.js';

const router = express.Router();

//Authentication
const authServices = AuthServices();
const authController = AuthController(authServices);
const authRoutes = AuthRoutes(authController);

//User Services
const userServices = UserServices();
const userController = UserController(userServices);
const userRoutes = UserServiceRoutes(userController);


//Transaction Services
const transactionServices = TransactionServices();
const transactionController = TransactionsController(transactionServices);
const transactionRoutes = TransactionRoutes(transactionController);

//Dashboard Services
const dashboardServices = DashboardServices();
const dashboardController = DashboardController(dashboardServices);
const dashboardRoutes = DashboardRoutes(dashboardController);


router.use('/transactions', transactionRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/dashboard',dashboardRoutes)

export default router;