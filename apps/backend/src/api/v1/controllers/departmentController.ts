import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as departmentService from "../services/departmentService";
import { Departments, Employees } from "../models/departmentModel";

/**
 * Manages requests and reponses to retrieve all Departments
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllDepartments = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const departments: Departments[] = await departmentService.getAllDepartments();
        res.status(HTTP_STATUS.OK).json({
            message: "Departments retrieved successfully",
            data: departments,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests, reponses, and validation to create a Department
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.body.name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Department name is required",
            });
        } if (!req.body.employees) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Department employee is required",
            });
        } else {
            const { name, employees } = req.body;

            const newDepartment: Departments = await departmentService.createDepartment({ name, employees });
            res.status(HTTP_STATUS.CREATED).json({
                message: "Department created successfully",
                data: newDepartment,
            });
        }
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and reponses to update a Department
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name } = req.params as { name: string };

        const { employees } = req.body as { employees: Employees[] };

        const updatedDepartment: Departments = await departmentService.updateDepartment({ name, employees });

        res.status(HTTP_STATUS.OK).json({
            message: "Department updated successfully",
            data: updatedDepartment,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests, reponses, and validation to create an Employee
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const addEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { departmentName, firstName, lastName } = req.body;

        if (!departmentName) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Department name is required" });
            return;
        }
        if (!firstName) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Employee first name is required" });
            return;
        }
        if (!lastName) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Employee last name is required" });
            return;
        }

        const updatedDepartment = await departmentService.addEmployeeToDepartment(departmentName, { firstName, lastName });

        res.status(HTTP_STATUS.CREATED).json({
            message: "Employee added successfully",
            data: updatedDepartment,
        });
    } catch (error: unknown) {
        next(error);
    }
};