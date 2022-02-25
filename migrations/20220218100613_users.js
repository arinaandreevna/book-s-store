exports.up = async (knex) => {
    await knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("login").notNullable();
        table.string("password");
        table.string("email").notNullable();
        table.boolean("email_is_confirmed").notNullable().defaultTo(false);
        table.string("email_confirmation_code", 6);
        table
        .enu("role", ["user", "editor", "admin"])
        .notNullable()
        .defaultTo("user");
    });
    

    await knex.schema.createTable("products", (table) => {
        table.increments("id");
        table.string("title").notNullable();
        table.integer("amount").notNullable();
        table.integer("price").notNullable();
    });


    await knex.schema.createTable("questions", (table) => {
        table.increments("id");
        table.string("title").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table.integer("products_id").notNullable();
        table
            .enu("status", ["streatment", "answered"])
            .notNullable()
            .defaultTo("streatment");
        table.text("text").notNullable();
        table.integer("manager_id").notNullable();
        table.text("answer").notNullable();
        table.boolean("answered").notNullable().defaultTo(false);
        table.integer("author_id").notNullable();

        table
            .foreign("products_id")
            .references("products.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");

        table
            .foreign("manager_id")
            .references("users.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");

        table
            .foreign("author_id")
            .references("users.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    });

    await knex.schema.createTable("orders", (table) => {
        table.increments("id");
        table.integer("products_id").notNullable();
        table.integer("amount").notNullable();
        table.integer("sum").notNullable();

        table
            .foreign("products_id")
            .references("products.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");
    });

    await knex.schema.createTable("users_orders", (table) => {
        table.integer("user_id").notNullable();
        table.integer("order_id").notNullable();
        table
            .foreign("user_id")
            .references("users.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");

        table
            .foreign("order_id")
            .references("orders.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");


    });

    await knex.schema.createTable("products_orders", (table) => {
        table.integer("product_id").notNullable();
        table.integer("order_id").notNullable();
        table
            .foreign("product_id")
            .references("products.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");

        table
            .foreign("order_id")
            .references("orders.id")
            .onDelete("RESTRICT")
            .onUpdate("CASCADE");


    });




};


exports.down = async (knex) => {
    await knex.schema.dropTableIfExists("products_orders");
    await knex.schema.dropTableIfExists("users_orders");
    await knex.schema.dropTableIfExists("orders");
    await knex.schema.dropTableIfExists("questions");
    await knex.schema.dropTableIfExists("products");
    await knex.schema.dropTableIfExists("users");

};
