import { NextResponse } from "next/server";
import { getDB } from "@/lib/db.js";

export async function GET() {
    const db = await getDB();
    const [categories] = await db.query("SELECT * FROM Categories");
    return NextResponse.json(categories);
}