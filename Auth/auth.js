const { db } = require("../database/connection");
const { users } = require("../models/user");
const { eq } = require("drizzle-orm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET;

async function signup({ name, email, password }) {
  // Check if user exists
  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length) throw new Error("User already exists");

  // Hash password
  const hashed = await bcrypt.hash(password, 10);

  // Insert new user
  const [user] = await db
    .insert(users)
    .values({ name, email, password: hashed })
    .returning();

  // Generate JWT
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return { user, token };
}

async function login({ email, password }) {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return { user, token };
}

module.exports = { signup, login };
