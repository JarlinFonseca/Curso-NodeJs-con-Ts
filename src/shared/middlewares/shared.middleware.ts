import passport from "passport";
import { HttpResponse } from "../response/http.response";
import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../../user/entities/user.entity";
import { RoleType } from "../../user/dto/user.dto";

export class SharedMiddleware {
    constructor(public httpResponse: HttpResponse = new HttpResponse()){}

    passAuth(type: string){
        return passport.authenticate(type, {session: false});
    }

    checkCustomerRole(req: Request, res: Response, next: NextFunction) {
        const user = req.user as UserEntity;
        if (user.role !== RoleType.CUSTOMER) {
          return this.httpResponse.Unauthorized(res, "No tienes permiso");
        }
        return next();
      }

    checkAdminRole(req: Request, res: Response, next: NextFunction){
        const user = req.user as UserEntity
        if(user.role !== RoleType.ADMIN){
            return this.httpResponse.Unauthorized(res, "No tienes permiso");
        }
        return next();

    }
}