import express from 'express';
const router = express.Router();

export default function UserServiceRoutes(userServiceController) {
    router.get("/getUsers", userServiceController.getUsers);
    router.put("/updateUserRole/:userId", userServiceController.updateUserRole);
    router.put("/updateUserStatus/:userId", userServiceController.updateUserStatus);
    return router;
}