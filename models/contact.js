const { pgTable, serial, text } = require("drizzle-orm/pg-core");

const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
});

module.exports = { contacts };
