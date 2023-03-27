import { ProductsModel } from "../models/products.model.js";

export default class ProductsManager {
  async getProducts(limit, page, sort, query) {
    const filtro = {
      limit,page,sort: !sort ? {} : {price:sort} 
    };
    try {
      const paginate = await ProductsModel.paginate(query,filtro);
      return paginate
    } catch (error) {
      return error;
    }
  }

  async createProduct(obj) {
    try {
      const newProduct = await ProductsModel.create(obj);
      return newProduct;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProductDB = await ProductsModel.findByIdAndDelete(id);
      return deletedProductDB;
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductsModel.findById(id);
      return product;
    } catch (error) {
      return error;
    }
  }
}
