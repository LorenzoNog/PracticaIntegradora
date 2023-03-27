import { Router } from "express";
import ProductsManager from "../dao/mongoManagers/productsManager.js";

const productManager = new ProductsManager();
const productsRouter = Router();

//Obtener los productos
productsRouter.get("/", async (req, res) => {
  const {limit = 10, page = 1, sort, ...query} = req.query
  const products = await productManager.getProducts(limit,page,sort,query);
  if(products){
    res.json({
      status: 'Success',
      payload: products.docs,
      totalPages: products.docs.totalPages,
      prevPage: products.hasPrevPage,
      nextPage: products.hasNextPage,
      page: products.actualPage,
      prevLink: products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null,
      nextLink: products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null,
  })
  }else{
    res.json({message:'ERROR'})
  }
  
});

//obtener un producto especifico
productsRouter.get('/:pid',async(req,res)=>{
    const {pid} = req.params
    const product = await productManager.getProductById(pid)
    res.json({product})
});

//Crear producto
productsRouter.post("/", async (req, res) => {
  const {title, description, code, price, status, stock, category } = req.body;
  const NewProduct = await productManager.createProduct({
    title,
    description,
    code,
    price,
    status,
    stock,
    category
  });
  res.json({ menssage: "Producto creado con exito",producto: NewProduct });
});

//Borrar producto especifico
productsRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await productManager.deleteProduct(pid);
  res.json({ menssage: "Producto eliminado con exito", deletedProduct });
});

//Actualizar info de un producto determinado
productsRouter.put('/:pid',async(req,res)=>{
    const {pid} = req.params
    const obj = req.body
    const updatedProduct = await productManager.updateProduct(pid,obj)
    res.json({menssage:'Producto actualizado con exito', updatedProduct})
})

export default productsRouter;
