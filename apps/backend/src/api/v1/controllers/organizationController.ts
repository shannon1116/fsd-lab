import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as organizationService from "../services/organizationService";
import { Roles, Employees } from "../models/roleModel";

/**
 * Retrieves all roles
 */
export const getAllRoles = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const roles: Roles[] = await organizationService.getAllRoles();

        res.status(HTTP_STATUS.OK).json({
            message: "Roles retrieved successfully",
            data: roles,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Create a new role
 */
export const createRole = async (
    req: Request<{}, {}, { name: string; employees?: Employees[] }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, employees } = req.body;

        if (!name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Role name is required",
            });
            return;
        }

        const newRole: Roles = await organizationService.createRole({
            name,
            employees,
        });

        res.status(HTTP_STATUS.CREATED).json({
            message: "Role created successfully",
            data: newRole,
        });

    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Add an employee to an existing role
 */
export const addEmployee = async (
    req: Request<{ roleName: string }, {}, { firstName: string; lastName: string }>,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { roleName } = req.params;
        const { firstName, lastName } = req.body;

        // Basic validation
        if (!firstName?.trim() || firstName.trim().length < 3) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "First name must be at least 3 characters",
            });
            return;
        }

        if (!lastName?.trim() || lastName.trim().length < 3) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Last name must be at least 3 characters",
            });
            return;
        }

        // Call service to add employee
        const updatedRole: Roles = await organizationService.addEmployee(roleName, {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
        });

        res.status(HTTP_STATUS.OK).json({
            message: `Employee added to role '${roleName}' successfully`,
            data: updatedRole,
        });

    } catch (error: unknown) {
        if (error instanceof Error && error.message.includes("already exists")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
        } else {
            next(error);
        }
    }
};