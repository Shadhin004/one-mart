import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(){
    const db = await getDB()

    const [result] = await db.query('SELECT * From PaymentMethods')

    return NextResponse.json(result)
}