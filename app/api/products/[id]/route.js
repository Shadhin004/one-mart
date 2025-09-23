import { NextResponse } from "next/server";
import { getDB } from "@/lib/db.js";



export async function GET(req, { params }) {
  const { id } = params;
  const db = await getDB();

  try {
    const [rows] = await db.query(
       `SELECT 
        p.product_id,
        p.product_name,
        c.category_name,
        u.unit_name,
        p.price,
        p.stock_quantity,
        p.is_active,
        pi.image_url,
        pi.is_primary
      FROM Products p
      JOIN Categories c ON p.category_id = c.category_id
      JOIN Units u ON p.unit_id = u.unit_id
      LEFT JOIN ProductImages pi ON p.product_id = pi.product_id
      WHERE p.product_id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

     // Build product object
    const product = {
      product_id: rows[0].product_id,
      product_name: rows[0].product_name,
      category_name: rows[0].category_name,
      unit_name: rows[0].unit_name,
      price: rows[0].price,
      stock_quantity: rows[0].stock_quantity,
      is_active: rows[0].is_active,
      primary_image: rows.find(r => r.is_primary)?.image_url || null,
      images: rows
        .filter(r => r.image_url)
        .map(r => r.image_url),
    };

    return NextResponse.json(product); // return single product
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
