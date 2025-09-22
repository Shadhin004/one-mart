import { NextResponse } from "next/server";
import { getDB } from "@/lib/db.js";

export async function GET() {
  const db = await getDB();
  const [products] = await db.query("SELECT * FROM Products WHERE is_active = TRUE");
  return NextResponse.json(products);
}

//Create a new product
export async function POST(req) {
  try {
    const { product_name, category_id, unit_id, description, price, stock_quantity } =
      await req.json();

    const db = await getDB();
    const [result] = await db.query(
      "INSERT INTO Products (product_name, category_id, unit_id, description, price, stock_quantity) VALUES (?, ?, ?, ?, ?, ?)",
      [product_name, category_id, unit_id, description, price, stock_quantity]
    );

    return NextResponse.json({ product_id: result.insertId, message: "Product added" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}