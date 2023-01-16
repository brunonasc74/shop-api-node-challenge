# Innovation Servicos Digitais - Backend Challenge

Welcome to my project! This challenge is intended by Innovation Servicos Digitais to evaluate me as a Back-end developer.

This API allows you to manage products. It includes endpoints for creating, reading, updating, and soft deleting products.

## Running this project locally
Follow these simple steps bellow on your favorite terminal to run this API 

```bash
# with yarn
git clone git@github.com:brunonasc74/shop-api-node-challenge.git
cd .\shop-api-node-challenge
yarn
yarn dev

# with npm
git clone git@github.com:brunonasc74/Banco-de-talentos.git
cd .\Banco-de-talentos\backend
git checkout bruno-nascimento-backend
npm install
npm run dev
```

```bash
# All done! Server will run on port 4000
http://localhost:4000
```

## Swagger documentation

```bash
# For more information about the API follow this link after following the steps above
http://localhost:4000/api-docs
```

## Schemas

### <strong>Product</strong>

| Method     | Route                   | Description                   |
| ---------- | ----------------------- | ----------------------------- |
| **GET**    | `/products`             | Return all products           |
| **POST**   | `/products`             | Create a new product          |
| **GET**    | `/products/`<strong>:id | Return selected product by id |
| **PUT**    | `/products/`<strong>:id | Update selected product by id |
| **DELETE** | `/products/`<strong>:id | Delete selected product by id |

<hr>
  
## Obrigado!
