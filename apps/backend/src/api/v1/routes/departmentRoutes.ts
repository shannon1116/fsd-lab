import express, { Router } from "express";
import * as departmentController from "../controllers/departmentController";

const router: Router = express.Router();

// "/api/v1/departments" prefixes all below routes
router.get("/", departmentController.getAllDepartments);
router.post("/", departmentController.createDepartment);
router.put("/:name", departmentController.updateDepartment);
router.post("/:name/", departmentController.addEmployee);

export default router;