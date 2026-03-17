// import the express application and type definition
import express, { Express } from "express";
import cors from "cors";

import departmentRoutes from "./api/v1/routes/departmentRoutes";
import organizationRoutes from "./api/v1/routes/organizationRoutes";

// initialize the express application
const app: Express = express();

// Interface for health check response
// An interface in TypeScript defines the structure or "shape" of an object.
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}
// Middleware START

// Ensures incoming body is correctly parsed to JSON, otherwise req.body would be undefined
app.use(express.json());

// Middleware END
app.use(cors({
  origin: "http://localhost:5173"
}));

// respond to GET request at endpoint "/" with message
app.get("/", (_req, res) => {
    res.send("Hello World");
});

/**
 * Health check endpoint that returns server status information
 * @returns JSON response with server health metrics
 */
app.get("/api/v1/health", (_req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

// Route Imports START
// "/api/v1/departments" will prefix all department routes
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/organizations", organizationRoutes);

// Route Imports END

export default app;