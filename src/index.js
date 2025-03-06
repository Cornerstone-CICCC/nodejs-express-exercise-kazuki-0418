"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
const products = [
    {
        id: 1,
        product_name: "product1",
        product_description: "description1",
        product_price: 1000,
    },
    {
        id: 2,
        product_name: "product2",
        product_description: "description2",
        product_price: 2000,
    },
    {
        id: 3,
        product_name: "product3",
        product_description: "description3",
        product_price: 3000,
    },
];
app.use(express_1.default.json());
app.get("/products", (req, res) => {
    res.json(products);
});
app.post("/products", (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.json(newProduct);
});
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const product = products.find((product) => product.id === +id);
    res.json(product);
});
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const productIndex = products.findIndex((product) => product.id === +id);
    products[productIndex] = req.body;
    res.json(products[productIndex]);
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const productIndex = products.findIndex((product) => product.id === +id);
    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct);
});
// 404
app.use((req, res) => {
    res.status(404).json({ error: "ルートが見つかりません" });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
