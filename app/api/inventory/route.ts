"use server";

import { NextRequest, NextResponse } from "next/server";
import { checkInventory } from "@/app/lib/actions";

export async function POST(req: NextRequest) {
  // will return true if there is inventory
  const body = await req.json();

  const hasInventory = await checkInventory(body.data);
  console.log("Checking Inventory", hasInventory)

  return NextResponse.json({ message: hasInventory }, { status: 200 });
}
