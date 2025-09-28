import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getDB } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const db = await getDB();
        const {street, city, state, postal_code, country} = await request.json();

        const [result] = await db.query("INSERT INTO UserAddresses (user_id, street, city, state, postal_code, country, is_default) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE street = VALUES(street), city = VALUES(city), state = VALUES(state), postal_code = VALUES(postal_code), country = VALUES(country)", [session.user.id, street, city, state, postal_code, country, 0]);
        
        return NextResponse.json({ message: "Address updated successfully" });
    } catch (error) {
        console.error("Error updating address:", error);
        return NextResponse.json({ error: "Failed to update address" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const db = await getDB();
        const [rows] = await db.query("SELECT * FROM UserAddresses WHERE user_id = ?", [session.user.id]);
        return NextResponse.json({ address: rows });
    } catch (error) {
        console.error("Error fetching address:", error);
        return NextResponse.json({ error: "Failed to fetch address" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const db = await getDB();
        const {address_id, street, city, state, postal_code, country} = await request.json();

        const [result] = await db.query("UPDATE UserAddresses SET street = ?, city = ?, state = ?, postal_code = ?, country = ? WHERE address_id = ? AND user_id = ?", [street, city, state, postal_code, country, address_id, session.user.id]);
        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "Address not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Address updated successfully" });
    } catch (error) {
        console.error("Error updating address:", error);
        return NextResponse.json({ error: "Failed to update address" }, { status: 500 });
    }
}