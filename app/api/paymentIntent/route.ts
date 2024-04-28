"use server";

// This is your test secret API key.
import { NextRequest, NextResponse } from "next/server";
import { fetchProductsTotal } from "@/app/lib/actions";
import Stripe from "stripe";

const stripe_secret = process.env.STRIPE_SECRET_KEY || " ";

const stripe = new Stripe(stripe_secret);

export async function POST(req: Request, res: Response) {
  const { productIds } = req.body as any;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await fetchProductsTotal(productIds) as any,
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
