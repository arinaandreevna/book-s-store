const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

// add a new product
exports.createProduct = async ({ title, amount, price, picture }) => {
  try {
    const [{ id: productId }] = await knex("products")
      .insert([{ title, amount, price, picture }])
      .returning("id");
    return { productId };
  } catch (error) {
    throw new ControllerException("", "");
  }
};

// update a product
exports.updateProduct = async ({
  productId,
  title,
  amount,
  price,
  picture,
}) => {
  const [record] = await knex("products")
    .select("id", "title", "amount", "price", "picture")
    .where({ id: productId });

  if (!record) {
    throw new ControllerException("NOT_FOUND", "Product has not been found");
  }
  await knex("products")
    .update({
      title: title,
      amount: amount,
      price: price,
      picture: picture,
    })
    .where({ id: productId });

  return {};
};

// delete a product
exports.deleteProduct = async ({ productId }) => {
  const [record] = await knex("products").select("id").where({ id: productId });

  if (!record) {
    throw new ControllerException("NOT_FOUND", "Product has not been found");
  }

  await knex("products").where("id", productId).del();

  return {};
};

// get a product by id
exports.getProductById = async ({ productId }) => {
  const [record] = await knex("products")
    .select("id", "title", "amount", "price", "picture")
    .where({ id: productId });

  return record;
};

// get list products by id
exports.listProductById = async ({ productId }) => {
  const [record] = await knex("products")
    .select("*")
    .where({ id: productId })
    .limit(10)
    .offset(30);

  return record;
};
