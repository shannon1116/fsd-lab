import express, { Router } from "express";
import * as organizationController from "../controllers/organizationController";

const router: Router = express.Router();

// "/api/v1/organizations" prefixes all below routes
router.get("/", organizationController.getAllRoles);
router.post("/", organizationController.createRole);
router.post("/:name/", organizationController.addEmployee)

export default router;