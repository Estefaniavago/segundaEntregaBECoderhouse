import { Router } from "express";
import { productManager } from "../managers/productManager.js";

let io = null;

export function injectSocket(socketServer) {
    io = socketServer;
}

const router = Router();

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

router.post("/", async (req, res) => {
    const newProduct = await productManager.addProduct(req.body);

    if (io) {
        io.emit("product_list", await productManager.getProducts());
    }

    res.status(201).json(newProduct);
});

router.delete("/:pid", async (req, res) => {
    const id = Number(req.params.pid);
    await productManager.deleteProduct(id);

    if (io) {
        io.emit("product_list", await productManager.getProducts());
    }

    res.json({ status: "success" });
});

export default router;
