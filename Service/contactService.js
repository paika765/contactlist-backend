const { db } = require("../database/connection");
const { contacts } = require("../models/contact");
const { eq, and } = require("drizzle-orm");

async function addContact({ user_id, name, email, phone }) {
  const [result] = await db
    .insert(contacts)
    .values({ user_id, name, email, phone })
    .returning();
  return result;
}

async function updateContact({ id, user_id, name, email, phone }) {
  const [result] = await db
    .update(contacts)
    .set({ name, email, phone })
    .where(and(eq(contacts.id, id), eq(contacts.user_id, user_id)))
    .returning();
  if (!result) throw new Error("Contact not found or no permission");
  return result;
}


async function deleteContactService({ id, user_id }) {
  const [result] = await db
    .delete(contacts)
    .where(and(eq(contacts.id, id), eq(contacts.user_id, user_id)))
    .returning();

  if (!result) return false;
  return true;
}

async function getContacts(user_id) {
  if (user_id) {
    return await db.select().from(contacts).where(eq(contacts.user_id, user_id));
  }
  return await db.select().from(contacts); // all contacts if no user
}


async function getContact(id, user_id) {
  let rows;
  if (user_id) {
    rows = await db
      .select()
      .from(contacts)
      .where(and(eq(contacts.id, id), eq(contacts.user_id, user_id)));
  } else {
    rows = await db.select().from(contacts).where(eq(contacts.id, id));
  }
  return rows[0] || null;
}

module.exports = {
  addContact,
  updateContact,
  deleteContactService,
  getContacts,
  getContact,
};
