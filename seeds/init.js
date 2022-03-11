exports.seed = async (knex) => {
  await knex("questions").del();
  await knex("users").del();
  await knex("products").del();

  await knex("users").insert([
    {
      id: 1,
      name: "Victoria",
      login: "Vicsa",
      password: "a1a2a3a4",
      email: "ddddddgggth123@gmail.com",
      email_is_confirmed: true,
      role: "user",
    },
  ]);

  await knex("products").insert([
    {
      id: 1,
      title: "Джейн Остин 'Гордость и предубеждение'",
      amount: 20,
      price: 300,
      picture: "link",
    },
  ]);

  await knex("questions").insert([
    {
      title: "Кто переводил книгу?",
      products_id: 1,
      status: "streatment",
      text: "Подскажите, кто является переводчиком книги в этом издании?",
      author_id: 1,
    },
  ]);
};
