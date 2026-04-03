import express from "express";
const router = express.Router();

export default function AuthRoutes(authController) {

    router.post("/login", authController.loginUser);
    router.post("/register", authController.registerUser);

    return router;

}

