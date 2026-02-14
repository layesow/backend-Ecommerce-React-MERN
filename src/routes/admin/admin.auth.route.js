import { Router } from "express";
import { login } from "../../controllers/admin/admin.auth.controller.js";

const router = Router();

router.route("/login").post(login);

export default router;