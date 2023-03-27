import { cartModel } from "../models/carts.model.js";
import { ProductsModel } from "../models/products.model.js";
export default class CartManager {
  async getCarts() {
    try {
      const CartsDB = await cartModel.find({});
      return CartsDB;
    } catch (error) {
      return error;
    }
  };

  async createCart(prod) {
    try {
      const newCart = await cartModel.create({
        products: { pid: prod._id, quantity: 1 }
      });
      return newCart;
    } catch (error) {
      return error;
    }
  };

  async getCartById(cid) {
    try {
      const cart = await cartModel.findOne({_id:cid})
      return cart
    } catch (error) {
      return error;
    }
  };

  async addProductToCart(cid, pid) {
    try {
      const cart = await cartModel.findById(cid)
      const prod = cart.products.find((p) => p.pid.toString() === pid)
      if(prod){
        const indexProd = cart.products.findIndex((p) => p.pid.toString() === pid)
        const newProduct = {pid, quantity: prod.quantity + 1}
        cart.products.splice(indexProd,1,newProduct)
      }else{
        cart.products.push({pid,quantity:1})
      }
      await cartModel.findByIdAndUpdate(cid,cart)
    } catch (error) {
      return error;
    }
  };

  async updateQuantityOfProduct(cid,pid,quantity){
    try {
      const cart = await cartModel.findById(cid)
      const specificProduct = cart.products.find((prod) => prod.pid.toString() === pid)
      if(specificProduct && quantity){
        const prodIndex = cart.products.findIndex((p)=>p.pid.toString() === pid)
        const updatedCart = {pid, quantity:quantity}
        cart.products.splice(prodIndex,1,updatedCart)
        await cartModel.findByIdAndUpdate(cid,cart)
      }else{
        return 'error'
      }
    } catch (error) {
      return error
    }
  }

  async updateAllCart(cid, newProducts){
    try {
      const cart = await cartModel.findByIdAndUpdate(cid,{
        products: newProducts
      });
      return cart
    } catch (error) {
      return error
    }
  }

  async deleteCart(cid) {
    try {
      const cartForDelete = await cartModel.findOneAndUpdate(cid,{
        products: []
      })
      cartForDelete.save()
      return cartForDelete
    } catch (error) {
      return error;
    }
  };

  async deleteProductFromCart(cid,pid){
    try {
      const products = await ProductsModel.find();
      const filtro = products.filter((p) => p.id !== pid);
      const cart = await cartModel.findByIdAndUpdate(cid,{
        products: filtro
      });
      return cart
    } catch (error) {
      return error;
    }
  };
}
