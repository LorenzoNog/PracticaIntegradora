import { Router } from "express";

import ProductsManager from "../dao/mongoManagers/productsManager.js";
import CartManager from "../dao/mongoManagers/cartManager.js";

const cartRouter = Router();
const cartManager = new CartManager();
const productManager = new ProductsManager();

//Mostrar todos los carritos creados
cartRouter.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.json(carts);
});

//Mostrar solo un carrito especifico
cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  res.json({ cart });
});

//Crear un carrito
cartRouter.post("/", async (req, res) => {
  const prod = req.body;
  if (Object.keys(prod).length === 0 || (!prod.id && !prod._id)) {
    res.json({
      message:
        "No has ingresado ningun producto o el producto ingresado no tiene Id",
    });
  } else {
    const newCart = await cartManager.createCart(prod);
    res.json({message:"Se creo un nuevo carrito",newCart});
  }
});

//Agregar un producto a un carrito determinado
cartRouter.post("/:cid/products/:pid", async (req, res) => {
  const {cid,pid} = req.params
  const addedProd = await cartManager.addProductToCart(cid,pid)
  res.json({message:"producto agregado con exito", addedProd})
});

//Actualizar todo el carrito
cartRouter.put('/:cid',async(req,res)=>{
  const {cid} = req.params;
  const {newProducts} = req.body;
  const updatedCart = await cartManager.updateAllCart(cid,newProducts)
  res.json({message:'Cart actualizado con exito', updatedCart})
});

//Actualizar la cantidad de un producto determinado dentro de un carrito
cartRouter.put(':/cid/products/:pid', async (req,res)=>{
  const {cid,pid} = req.params;
  const quantity= req.body;
  const updateQuantity = await cartManager.updateQuantityOfProduct(cid,pid,quantity);
  res.json({message:`Se actualizo correctamente la cantidad del producto ${pid} en el cart ${cid}`,updateQuantity})
})

cartRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cartForDelete = await cartManager.deleteCart(cid);
  res.json({ menssage: `Se borraron con exito los productos del cart ${cid}`, cartForDelete });
});

//Eliminar un producto determinado del carrito
cartRouter.delete('/:cid/products/:pid', async (req,res)=>{
  const {cid,pid} = req.params;
  const updatedCart = await cartManager.deleteProductFromCart(cid,pid)
  res.json({message:`Se elimino con exito el producto del cart ${cid}`, updatedCart})
})

export default cartRouter;
