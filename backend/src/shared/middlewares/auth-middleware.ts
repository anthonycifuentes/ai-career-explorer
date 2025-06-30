// src/shared/middlewares/auth-middleware.ts

import { Request, Response, NextFunction } from "express";
import { db } from "../../db";
import { session, user, tenantUser } from "../../db/schema/auth-schema";
import { staff } from "../../db/schema";
import { eq, and } from "drizzle-orm";

/**
 * Middleware to authenticate requests
 * This middleware only verifies the user's identity and session
 * It doesn't enforce tenant access (that's handled by requireTenant middleware)
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get auth header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ message: "Missing or invalid authorization header" });
      return;
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Missing authentication token" });
      return;
    }

    // Find session by token
    const sessions = await db
      .select()
      .from(session)
      .where(eq(session.token, token))
      .limit(1);

    if (sessions.length === 0) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    const currentSession = sessions[0];

    // Check if session is expired
    if (new Date() > new Date(currentSession.expiresAt)) {
      res.status(401).json({ message: "Token has expired" });
      return;
    }

    // Get user
    const users = await db
      .select()
      .from(user)
      .where(eq(user.id, currentSession.userId))
      .limit(1);

    if (users.length === 0) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const currentUser = users[0];

    // Get user's tenant
    const tenantUsers = await db
      .select({
        tenantId: tenantUser.tenantId,
      })
      .from(tenantUser)
      .where(eq(tenantUser.userId, currentUser.id))
      .limit(1);

    const staffMember = await db
      .select({
        id: staff.id,
      })
      .from(staff)
      .where(eq(staff.userId, currentUser.id))
      .limit(1);

    // Add user info to request
    req.user = {
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name,
      // Use tenant ID if available, otherwise set to null (for tenant creation)
      tenantId: tenantUsers.length > 0 ? tenantUsers[0].tenantId : null,
      staffId: staffMember.length > 0 ? staffMember[0].id : null,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res
      .status(500)
      .json({ message: "Internal server error during authentication" });
  }
};

/**
 * Middleware to ensure a user has a valid tenant ID
 * This should be applied to routes that require a tenant context
 */
export const requireTenant = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Check if user is authenticated and has a tenant ID
  if (!req.user || !req.user.tenantId) {
    res.status(403).json({
      message: "Tenant ID is required for this operation",
    });
    return;
  }

  // If we reach here, tenantId exists and is non-null
  next();
};

/**
 * Middleware to check if user has a specific role in the current tenant
 *
 * @param roles Array of roles that are allowed to access the route
 * @returns Middleware function
 */
export const hasRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user is authenticated
      if (!req.user || !req.user.id || !req.user.tenantId) {
        return res.status(401).json({ message: "Authentication required" });
      }

      // Get user's role in the current tenant
      const staffRecords = await db
        .select()
        .from(staff)
        .where(
          and(
            eq(staff.userId, req.user.id),
            eq(staff.tenantId, req.user.tenantId),
            eq(staff.active, true)
          )
        )
        .limit(1);

      // If user is not staff or inactive in this tenant
      if (staffRecords.length === 0) {
        return res.status(403).json({
          message: "You are not an active staff member in this tenant",
        });
      }

      const userRole = staffRecords[0].role;

      // Check if user has one of the required roles
      if (!roles.includes(userRole)) {
        return res.status(403).json({
          message: `Access denied. Required roles: ${roles.join(", ")}`,
        });
      }

      // User has required role, proceed
      next();
    } catch (error) {
      console.error("Role check middleware error:", error);
      res.status(500).json({
        message: "Internal server error during role verification",
      });
    }
  };
};

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        name: string;
        tenantId: string | null; // Modified to allow null
        staffId: string | null;
      };
    }
  }
}
