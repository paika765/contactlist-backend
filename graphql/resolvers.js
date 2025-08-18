const { db } = require("../database/connection");
const { users } = require("../models/user");
const { contacts } = require("../models/contact"); 
const { signup, login } = require("../Auth/auth");
const { eq } = require("drizzle-orm");

const resolvers = {
  // Queries
  users: async () => {
    return await db.select().from(users);
  },

  contacts: async () => {
    return await db.select().from(contacts);
  },

  contact: async ({ id }) => {
    const result = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, id));
    return result[0] || null;
  },

  // Mutations
  addUser: async ({ name, email, password }) => {
    return await signup({ name, email, password });
  },

  loginUser: async ({ email, password }) => {
    return await login({ email, password });
  },

  addContact: async ({ name, email, phone }) => {
    const result = await db
      .insert(contacts)
      .values({ name, email, phone })
      .returning();
    return result[0];
  },

  updateContact: async ({ id, name, email, phone }) => {
    const result = await db
      .update(contacts)
      .set({ name, email, phone })
      .where(eq(contacts.id, id))
      .returning();
    return result[0];
  },

  deleteContact: async ({ id }) => {
    const result = await db
      .delete(contacts)
      .where(eq(contacts.id, id))
      .returning();
    return result.length > 0;
  },
};

module.exports = resolvers;
