import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const userId = session.user.id;
  const body = await req.json();
  const { address, paymentMethodId } = body;

  const db = await getDB();
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

    // 1. Create order
    const [orderResult] = await conn.query(
      "INSERT INTO Orders (user_id, status_id, total_amount) VALUES (?, ?, ?)",
      [userId, 1, 0] 
    );
    const orderId = orderResult.insertId;

    // 2. Handle shipping address
    // let shippingAddress = {};
    // if (addressType === "existing") {
    //   // fetch existing address
    //   const [rows] = await conn.query("SELECT * FROM UserAddresses WHERE address_id=? AND user_id=?", [
    //     existingAddressId,
    //     userId,
    //   ]);
    //   if (!rows[0]) throw new Error("Invalid address");
    //   shippingAddress = address
    // } else if (addressType === "new") {
    //   // add to UserAddresses
    //   const [addrResult] = await conn.query(
    //     "INSERT INTO UserAddresses (user_id, street, city, state, postal_code, country, is_default) VALUES (?, ?, ?, ?, ?, ?, ?)",
    //     [
    //       userId,
    //       address.street,
    //       address.city,
    //       address.state,
    //       address.postal_code,
    //       address.country,
    //       false,
    //     ]
    //   );
    //   shippingAddress = { ...address };
    // }

    // insert into ShippingAddresses (linked to order)
    await conn.query(
      "INSERT INTO ShippingAddresses (order_id, street, city, state, postal_code, country) VALUES (?, ?, ?, ?, ?, ?)",
      [
        orderId,
        address.street,
        address.city,
        address.state,
        address.postal_code,
        address.country,
      ]
    );

    // 3. Move cart items into OrderItems
    const [cartItems] = await conn.query(
      "SELECT c.product_id, c.quantity, p.price FROM CartItems c JOIN Products p ON c.product_id = p.product_id WHERE c.user_id=?",
      [userId]
    );

    if (cartItems.length === 0) throw new Error("Cart is empty");

    let totalAmount = 0;
    for (const item of cartItems) {
      const subtotal = item.quantity * item.price;
      totalAmount += subtotal;

      await conn.query(
        "INSERT INTO OrderItems (order_id, product_id, quantity, price, subtotal) VALUES (?, ?, ?, ?, ?)",
        [orderId, item.product_id, item.quantity, item.price, subtotal]
      );

      // reduce stock
      await conn.query(
        "UPDATE Products SET stock_quantity = stock_quantity - ? WHERE product_id=? AND stock_quantity >= ?",
        [item.quantity, item.product_id, item.quantity]
      );
    }

    // update order total
    await conn.query("UPDATE Orders SET total_amount=? WHERE order_id=?", [totalAmount, orderId]);

    // 4. Clear cart
    await conn.query("DELETE FROM CartItems WHERE user_id=?", [userId]);

    // 5. Add payment (optional at this stage)
    if (paymentMethodId) {
      await conn.query(
        "INSERT INTO Payments (order_id, method_id, amount, status) VALUES (?, ?, ?, ?)",
        [orderId, paymentMethodId, totalAmount, "Pending"]
      );
    }

    // Commit transaction
    await conn.commit();

    return new Response(JSON.stringify({ success: true, orderId }), { status: 200 });
  } catch (err) {
    await conn.rollback();
    console.error("Order creation failed:", err);
    return new Response(JSON.stringify({ error: "Order creation failed" }), { status: 500 });
  } finally {
    conn.release();
  }
}

export async function GET(){
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const userId = session.user.id;
  const db = await getDB()
  try{
    const [result] = await db.query('SELECT o.order_id, o.order_date, o.total_amount, os.status_name FROM Orders o JOIN OrderStatuses os ON o.status_id = os.status_id WHERE user_id=?',userId)
    return NextResponse.json(result)
  }catch (err){
    return NextResponse.json(err)
  }
}
