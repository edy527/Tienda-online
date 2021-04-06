const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

let products = [
  {
    id: 1,
    name: "Cafetera",
    price: 160,
    image: "img/cafetera.jpg",
    sotock: 2,
  },
  {
    id: 2,
    name: "Celular",
    price: 50,
    image: "img/celular.jpg",
    sotock: 50,
  },
  {
    id: 3,
    name: "Heladera",
    price: 50,
    image: "img/heladera.jpg",
    sotock: 50,
  },
  {
    id: 4,
    name: "Lavarropas",
    price: 50,
    image: "img/lavarropas.jpg",
    sotock: 50,
  },
  {
    id: 5,
    name: "Smart TV",
    price: 50,
    image: "img/TV.jpg",
    sotock: 50,
  },
];

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.post("/api/pay", (req, res) => {
  const ids = req.body;
  const productsCopy = products.map((p) => ({ ...p })); //realiza copia de los productos para control de stock si varios usuarios compran al mismo tiempo
  ids.forEach(id => {
    const product = productsCopy.find(p => p.id === id);
    if (product.sotock > 0) {
      product.sotock--;
    } else {
      throw "sin stock";
    }
  });
  products = productsCopy; //si la compra se completa, porductsCopy sera el nuevo array (se puede optimizar)
  res.send(products);
});

app.use("/", express.static("frontend"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
