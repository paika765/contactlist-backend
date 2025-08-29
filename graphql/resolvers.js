const { db } = require("../database/connection");
const { users } = require("../models/user");
const { signup, login } = require("../Service/auth");
const {
  addContact,
  updateContact,
  deleteContactService,
  getContacts,
  getContact,
} = require("../Service/contactService");

const resolvers = {
  // Queries
  users: async () => await db.select().from(users),

  contacts: async (args, context) => {
    const user_id = context.user?.id;
    return await getContacts(user_id); // fetch only user's contacts if logged in
  },

  contact: async ({ id }, context) => {
    const user_id = context.user?.id;
    return await getContact(id, user_id); // fetch user's contact if logged in
  },

  // Mutations
  addUser: async ({ name, email, password }) => await signup({ name, email, password }),
  loginUser: async ({ email, password }) => await login({ email, password }),

  addContact: async ({ name, email, phone }, context) => {
    const user_id = context.user?.id;
    if (!user_id) throw new Error("Unauthorized: No user logged in");
    return await addContact({ user_id, name, email, phone });
  },

  updateContact: async ({ id, name, email, phone }, context) => {
    const user_id = context.user?.id;
    if (!user_id) throw new Error("Unauthorized: No user logged in");
    return await updateContact({ id, user_id, name, email, phone });
  },

deleteContact: async ({ id }, context) => {
  const user_id = context.user?.id;
  if (!user_id) throw new Error("Unauthorized: No user logged in");

  const deleted = await deleteContactService({ id, user_id });
  return deleted;
},

};

module.exports = resolvers;
