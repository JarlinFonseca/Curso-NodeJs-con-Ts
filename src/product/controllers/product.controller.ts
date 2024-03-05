import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { HttpResponse } from "../../shared/response/http.response";

export class ProductController {
  private readonly httpResponse: HttpResponse = new HttpResponse()
  constructor(
    private readonly productService: ProductService = new ProductService()
  ) {
  }
  async getProducts(req: Request, res: Response) {
    try {
      const data = await this.productService.findAllProducts();
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
  async getProductById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.findProductById(id);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
  async findProductsByName(req: Request, res: Response) {
    const { search } = req.query;
    try {
      if (search !== undefined) {
        const data = await this.productService.findProductsByName(search);
        if (!data) {
          return this.httpResponse.NotFound(res, "No existe dato");
        }
        return this.httpResponse.Ok(res, data);
      }
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    }
  }
  
  async createProduct(req: Request, res: Response) {
    try {
      const data = await this.productService.createProduct(req.body);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
  async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.updateProduct(id, req.body);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
  async deleteProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.deleteProduct(id);
      res.status(200).json(data);
    } catch (e) {
      console.error(e);
    }
  }
}
