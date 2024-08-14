const express = require("express");
const config = require("./db/config");
const users = require("./db/users");
const app = express();
const cors = require("cors");
const product = require("./db/Products");
const Jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtkey = process.env.API_KEY;

app.use(express.json());
app.use(cors());
app.post("/register", async (request, response) => {
  const db = new users(request.body);
  let result = await db.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      response.send({ result: "something went wrong!" });
    }
    response.send({ result, auth: token });
  });
});
app.post("/login", async (request, response) => {
  if (request.body.email && request.body.password) {
    const user = await users.findOne(request.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          response.send({ result: "something went wrong!" });
        }
        response.send({ user, auth: token });
      });
    } else {
      response.send({ result: "user not found" });
    }
  } else {
    response.send({ result: "user not found" });
  }
});
app.post("/aproduct", verifyToken, async (request, response) => {
  let pdb = new product(request.body);
  let result = await pdb.save();
  response.send(result);
});
app.get("/product", verifyToken, async (request, response) => {
  let pdb = await product.find();
  if (pdb.length > 0) {
    response.send(pdb);
  } else {
    response.send({ result: "no value found" });
  }
});
app.delete("/products/:id", verifyToken, async (request, response) => {
  const result = await product.deleteOne({ _id: request.params.id });
  response.send(result);
});
app.get("/products/:id", verifyToken, async (request, response) => {
  const result = await product.findOne({ _id: request.params.id });
  if (result) {
    response.send(result);
  } else {
    response.send({ val: "item not found" });
  }
});
app.put("/update/:id", verifyToken, async (request, response) => {
  const result = await product.updateOne(
    { _id: request.params.id },
    {
      $set: request.body,
    },
  );
  if (result) {
    response.send(result);
  } else {
    response.send({ result: "no item found" });
  }
});
app.get("/search/:key", verifyToken, async (request, response) => {
  let result = await product.find({
    $or: [
      { name: { $regex: request.params.key } },
      { price: { $regex: request.params.key } },
      { category: { $regex: request.params.key } },
      { company: { $regex: request.params.key } },
    ],
  });

  //response.send({result,auth:token})
  response.send(result);
});
app.put("/updateuser/:password", verifyToken, async (request, response) => {
  let result = await users.updateOne(
    { password: request.params.password },
    {
      $set: request.body,
    },
  );
  if (result.modifiedCount > 0) {
    response.send(result);
  } else {
    response.send({ result: "PLease provide correct password" });
  }
  console.log(result);
});

function verifyToken(request, response, next) {
  let token = request.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        response.status(401).send({ result: "inavlid key " });
      } else {
        next();
      }
    });
  } else {
    response.send({ result: "please define headers with key" });
  }
}

app.listen(5000);
