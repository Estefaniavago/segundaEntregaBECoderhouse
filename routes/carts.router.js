import { Router } from "express";
import CartManager from "../managers/cartManager.js";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartManager = new CartManager(path.join(__dirname, "../data/carts.json"));

// Crear carrito
router.post("/", async (req, res) => {
    const cart = await cartManager.createCart();
    res.status(201).json(cart);
});

// Obtener carrito
router.get("/:cid", async (req, res) => {
    const cart = await cartManager.getCartById(Number(req.params.cid));
    res.json(cart ?? { error: "Carrito no encontrado" });
});

// Agregar producto
router.post("/:cid/product/:pid", async (req, res) => {
    const cart = await cartManager.addProductToCart(
        Number(req.params.cid),
        Number(req.params.pid)
    );

    res.json(cart ?? { error: "Carrito no encontrado" });
});

export default router;
