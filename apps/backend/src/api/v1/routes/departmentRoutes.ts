import express, { Router } from "express";
import * as departmentController from "../controllers/departmentController";
import { pool } from "../db/pool";

const router: Router = express.Router();

// "/api/v1/departments" prefixes all below routes
router.get("/", async (req, res) => {
    const limit = Math.min(Number(req.query.limit ?? 10), 100);
    const offset = Number(req.query.offset ?? 0);
    
    try {
        const result = await pool.query(
            "SELECT * FROM departments ORDER BY id LIMIT $1 OFFSET $2",
            [limit, offset]
        );
        
        const totalResult = await pool.query(
            "SELECT COUNT(*) FROM departments"
        );
        
        res.json({
            data: result.rows,
            meta: {
                limit,
                offset,
                total: Number(totalResult.rows[0].count),
            },
        });
    } catch (err: any) {
        res.status(500).json({
            error: err.message,
        });
    }
});

router.post("/", departmentController.createDepartment);
router.put("/:name", departmentController.updateDepartment);
router.post("/:name/", departmentController.addEmployee);

export default router;