'use server';

import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/app/lib/actions";

import Stripe from "stripe";

const stripe_secret = process.env.STRIPE_SECRET_KEY || " ";

const stripe = new Stripe(stripe_secret);

export async function POST(req: Request, res: Response) {
  const { address, cart, paymentIntentId } = await req.json();
  const order = await createOrder(address, cart, paymentIntentId);

  if (order!.id === undefined || order!.id === null) {
    throw new Error("Failed to add orderId to Payment Intent");
  } else {
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      metadata: {
        orderId: order!.id,
      },
    });
    console.log("metadata added to payment intent", paymentIntent.id)
  }

  return NextResponse.json({ message: "Order created and order Id added to payment intent" });
}
