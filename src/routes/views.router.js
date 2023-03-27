import { Router } from "express";
import CartManager from "../dao/mongoManagers/cartManager.js";
import ProductsManager from "../dao/mongoManagers/productsManager.js";

const cartManager = new CartManager();
const productsManager = new ProductsManager();

const router = Router();

//login
router.get("/", async (req, res) => {
  res.render("login");
});
//registro
router.get("/registro", async (req, res) => {
  res.render("registro");
});
//error login
router.get("/errorLogin", async (req, res) => {
  res.render("errorLogin");
});
//error registro
router.get("/errorRegistro", async (req, res) => {
  res.render("errorRegistro");
});
//home
router.get("/home", async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.query;
  const products = await productsManager.getProducts(limit, page, sort, query);
  res.render("home", { products: products.docs });
});

//products
router.get("/products", async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.query;
  const { firstName, lastName, email} = req.session.user;
  const {role} = req.session;
  const products = await productsManager.getProducts(limit, page, sort, query);
  res.render("products", {
    products: products.docs,
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: role
  });
});

//carts
router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);
  res.render("cart", { cart: cart.products });
});

//Real time products
router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
