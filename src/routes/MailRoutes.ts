import express from "express";
import MailController from "../controllers/MailController";

const router = express.Router();

router.post("/send/api", (req, res) => {
    MailController.sendMail(req, res).catch((error) => {
        console.error("Error in sendMail:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    });
});

export default router;
