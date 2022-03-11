const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

// add a new question
exports.createQuestion = async ({ title, products_id, text, author_id }) => {
  try {
    const [{ id: questionId }] = await knex("questions")
      .insert([{ title, products_id, text, author_id }])
      .returning("id");
    return { questionId };
  } catch (error) {
    throw new ControllerException("", "");
  }
};

// update a question
exports.updateQuestion = async ({ questionId, title, text }) => {
  const [record] = await knex("questions")
    .select("id", "title", "text")
    .where({ id: questionId });

  if (!record) {
    throw new ControllerException("NOT_FOUND", "Question has not been found");
  }
  await knex("questions")
    .update({
      title: title,
      text: text,
    })
    .where({ id: questionId });

  return {};
};

// delete a question
exports.deleteQuestion = async ({ questionId }) => {
  const [record] = await knex("questions")
    .select("id")
    .where({ id: questionId });

  if (!record) {
    throw new ControllerException("NOT_FOUND", "Question has not been found");
  }

  await knex("questions").where("id", questionId).del();

  return {};
};

// get a question by id
exports.getQuestionById = async ({ questionId }) => {
  const [record] = await knex("questions")
    .select("id", "title", "text", "author_id", "products_id", "status")
    .where({ id: questionId });

  return record;
};

// get list questions by id
exports.listQuestionById = async ({ questionId }) => {
  const [record] = await knex("questions")
    .select("*")
    .where({ id: questionId })
    .limit(10)
    .offset(30);

  return record;
};
