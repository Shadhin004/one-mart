import { NextResponse } from "next/server";
import { getDB } from "@/lib/db.js";

export async function GET() {
  const db = await getDB();
  const [products] = await db.query("SELECT p.product_id, p.product_name, c.category_name, u.unit_name, p.price, p.stock_quantity, p.is_active, pi.image_url AS primary_image FROM Products p JOIN Categories c ON p.category_id = c.category_id JOIN Units u ON p.unit_id = u.unit_id LEFT JOIN ProductImages pi ON p.product_id = pi.product_id AND pi.is_primary = 1;");
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