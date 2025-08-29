const { pgTable, serial, text, integer } = require("drizzle-orm/pg-core");
const { users } = require("./user");

const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  user_id: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

module.exports = { contacts };
