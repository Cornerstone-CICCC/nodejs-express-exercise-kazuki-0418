import express, { Application, Request, Response } from "express";

type Product = {
  id: number;
  product_name: string;
  product_description: string;
  product_price: number;
};

const app: Application = express();
const PORT = 3000;

const products: Product[] = [
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
app.use(express.json());

app.get("/products", (req: Request, res: Response) => {
  res.json(products);
});

app.post("/products", (req: Request, res: Response) => {
  const newProduct: Product = req.body;
  products.push(newProduct);
  res.json(newProduct);
});

app.get("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === +id);
  res.json(product);
});

app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const productIndex = products.findIndex((product) => product.id === +id);
  products[productIndex] = req.body;
  res.json(products[productIndex]);
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const productIndex = products.findIndex((product) => product.id === +id);
  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct);
});

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "ルートが見つかりません" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
