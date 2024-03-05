import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { HttpResponse } from "../../shared/response/http.response";
import { CategoryDTO } from "../dto/category.dto";
import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";

export class CategoryMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }
  categoryValidator(req: Request, res: Response, next: NextFunction) {
    const { categoryName } = req.body;

    const valid = new CategoryDTO();

    valid.categoryName = categoryName;
    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
}