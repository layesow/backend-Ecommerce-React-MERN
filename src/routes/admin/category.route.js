import { Router } from "express";
import { createCategory, updateCategory, getCategory, deleteCategory, getAllCategories } from "../../controllers/admin/category.controller.js";

const router = Router();

router.route("/all").get(getAllCategories);
router.route("/create").post(createCategory);
router.route("/update/:id").put(updateCategory);
router.route("/:id").get(getCategory);
router.route("/:id").delete(deleteCategory);

export default router;