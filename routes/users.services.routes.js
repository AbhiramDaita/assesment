import express from 'express';
const router = express.Router();

export default function UserServiceRoutes(userServiceController) {
    router.get("/getUsers", userServiceController.getUsers);
    router.put("/role/:userId", userServiceController.updateUserRole);
    router.put("/status/:userId", userServiceController.updateUserStatus);
    return router;
}
