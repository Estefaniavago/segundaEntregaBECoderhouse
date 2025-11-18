import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productManager = new ProductManager(path.join(__dirname, "../data/products.json"));

// Página principal
router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("home", {
        title: "Página de inicio",
        message: "Bienvenido a la tienda",
        products
    });
});

// Vista normal
router.get("/products", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("products", { products });
});

// Vista realtime
router.get("/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
});

export default router;
