const ControllerException = require("../utils/ControllerException");
const knex = require("../utils/db");

// add a new answer (admin)
exports.createAnswer = async ({ question_id, manager_id, text }) => {
  try {
    const [{ id: answerId }] = await knex("products")
      .insert([{ question_id, manager_id, text }])
      .returning("id");
    return { answerId };
  } catch (error) {
    throw new ControllerException("", "");
  }
};

// update an answer (admin)
exports.updateAnswer = async ({ answerId, question_id, manager_id, text }) => {
  const [record] = await knex("answers")
    .select("id", "question_id", "manager_id", "text")
    .where({ id: answerId });

  if (!record) {
    throw new ControllerException("NOT_FOUND", "Answer has not been found");
  }
  await knex("answers")
    .update({
      question_id: question_id,
      manager_id: manager_id,
      text: text,
    })
    .where({ id: answerId });

  return {};
};

// delete an answer (admin)
exports.deleteAnswer = async ({ answerId }) => {
  const [record] = await knex("answers").select("id").where({ id: answerId });

  if (!record) {
    throw new ControllerException("NOT_FOUND", "Answer has not been found");
  }

  await knex("answers").where("id", answerId).del();

  return {};
};

// get an answer by id (admin)
exports.getAnswerById = async ({ answerId }) => {
  const [record] = await knex("answers")
    .select("id", "question_id", "manager_id", "text")
    .where({ id: answerId });

  return record;
};

// get list answers by id
exports.listAnswerById = async ({ answerId }) => {
  const [record] = await knex("answers")
    .select("*")
    .where({ id: answerId })
    .limit(10)
    .offset(30);

  return record;
};
