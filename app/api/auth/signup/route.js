import { NextResponse } from "next/server";
import { getDB } from "@/lib/db.js";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { first_name, last_name, email, phone, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email & password required" }, { status: 400 });
    }

    const db = await getDB();
    const [existing] = await db.query("SELECT * FROM Users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO Users (first_name, last_name, email, phone, password_hash) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, email, phone, hashed]
    );

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
