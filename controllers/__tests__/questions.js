const db = require("../../utils/db");

const ControllerException = require("../../utils/ControllerException");
const questionsController = require("../questions");

const questions = [
  { title: "Question1", products_id: 1, text: "Descriotion1", author_id: 1 },
  { title: "Question2", products_id: 2, text: "Descriotion2", author_id: 2 },
  { title: "Question3", products_id: 3, text: "Descriotion3", author_id: 3 },
];

beforeEach(async () => {
  await db.seed.run();
});

test("Can create a new question", async () => {
  const data = await questionsController.createQuestion(questions[0]);

  expect(data).toEqual(expect.any(Object));
  expect(data.questionId).toEqual(expect.any(Number));
  expect(data.questionId).toBeGreaterThan(0);
});

test("Can save all fields on create", async () => {
  const { questionId } = await questionController.createQuestion(questions[0]);
  const record = await questionsController.getQuestionById({ questionId });

  expect(record.title).toBe(questions[0].title);
  expect(record.products_id).toBe(questions[0].products_id);
  expect(record.text).toBe(questions[0].text);
  expect(record.author_id).toBe(questions[0].author_id);
  expect(record.status).toBe("streatmen");
});

test("Can save all fields on update", async () => {
  const { questionId } = await questionController.updateQuestion(
    questions[0].title,
    questions[0].text
  );
  const record = await questionsController.getQuestionById({ questionId });

  expect(record.title).toBe(questions[0].title);
  expect(record.text).toBe(questions[0].text);
});

test("Delete", async () => {
  const record = await questionController.deleteQuestion({ questionId });

  expect(record.questionId).toBeUndefined();
});
