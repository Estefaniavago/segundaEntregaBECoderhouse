import fs from 'fs/promises';

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async readFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async getProducts() {
    return await this.readFile();
  }

  async addProduct(product) {
    const products = await this.readFile();
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id: newId,
      title: product.title,
      description: product.description,
      code: product.code,
      price: product.price,
      status: product.status ?? true,
      stock: product.stock,
      category: product.category,
      thumbnails: Array.isArray(product.thumbnails) ? product.thumbnails : []
    };

    products.push(newProduct);
    await this.writeFile(products);
    return newProduct;
  }

  // 🔥 AGREGADO
  async deleteProduct(id) {
    const products = await this.readFile();
    const filtered = products.filter(p => p.id !== id);
    await this.writeFile(filtered);
  }
}

// Exportación correcta
export const productManager = new ProductManager("./data/products.json");
export default ProductManager;
