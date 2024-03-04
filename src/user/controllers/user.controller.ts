import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttResponse } from "../../shared/response/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(), 
    private readonly httpResponse: HttResponse = new HttResponse()) {}
  async getUsers(req: Request, res: Response) {
    try {
      const data = await this.userService.findAllUser();
      return this.httpResponse.Ok(res, data)
      if(data.length === 0){
        return this.httpResponse.NotFound(res, "No existe dato");
      }
    } catch (e) {
      return this.httpResponse.Error(res,e);
    }
  }
  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.userService.findUserById(id);
      return this.httpResponse.Ok(res, data)
      if(!data){
        return this.httpResponse.NotFound(res, "No existe dato");
      }
    } catch (e) {
      return this.httpResponse.Error(res,e);
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const data = await this.userService.createUser(req.body);
      return this.httpResponse.Ok(res, data)
    } catch (e) {
      return this.httpResponse.Error(res,e);
    }
  }
  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.userService.updateUser(id, req.body);
      
      if(!data.affected){
        return this.httpResponse.NotFound(res, "Hay un error en actualizar");
      }
      return this.httpResponse.Ok(res, data)
    } catch (e) {
      return this.httpResponse.Error(res,e);
    }
  }
  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.userService.deleteUser(id);

      if(!data.affected){
        return this.httpResponse.NotFound(res, "Hay un error en eliminar");
      }
      
      return this.httpResponse.Ok(res, data)
    } catch (e) {
      return this.httpResponse.Error(res,e);
    }
  }
}
