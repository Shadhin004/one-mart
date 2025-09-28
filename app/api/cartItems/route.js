import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { product_id, quantity } = await req.json();
    const user_id = session.user.id;

    const db = await getDB();

    const [rows] = await db.query(
      "SELECT * FROM CartItems WHERE user_id = ? AND product_id = ?",
      [user_id, product_id]
    );

    if (rows.length > 0) {
      await db.query(
        "UPDATE CartItems SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?",
        [quantity || 1, user_id, product_id]
      );
      return NextResponse.json({ message: "Cart updated" });
    }

    await db.query(
      "INSERT INTO CartItems (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [user_id, product_id, quantity || 1]
    );

    return NextResponse.json({ message: "Item added to cart" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

//get cart for logged in user
export async function GET(req) {
  try {

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    
    const db = await getDB();

    const [rows] = await db.query(
      `SELECT c.cart_item_id, c.quantity, p.product_id, p.product_name, p.price
       FROM CartItems c
       JOIN Products p ON c.product_id = p.product_id
       WHERE c.user_id = ?`,
      [userId]
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// delete cart item by cart_item_id
export async function DELETE(req) {
  try {

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { cart_item_id } = await req.json();
    if (!cart_item_id) return NextResponse.json({ error: "Cart ID required" }, { status: 400 });

    const db = await getDB();
    await db.query("DELETE FROM CartItems WHERE cart_item_id = ?", [cart_item_id]);

    return NextResponse.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
