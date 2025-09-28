import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/react";
import { getDB } from "@/lib/db";

export async function POST(request) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const db = await getDB();
        const {street, city, state, postal_code, country} = await request.json();

        const [result] = await db.query("INSERT INTO ShippingAddresses (user_id, street, city, state, postal_code, country) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE street = VALUES(street), city = VALUES(city), state = VALUES(state), postal_code = VALUES(postal_code), country = VALUES(country)", [session.user.id, street, city, state, postal_code, country]);
        
        return NextResponse.json({ message: "Shipping address updated successfully" });
    } catch (error) {
        console.error("Error updating shipping address:", error);
        return NextResponse.json({ error: "Failed to update shipping address" }, { status: 500 });
    }
}