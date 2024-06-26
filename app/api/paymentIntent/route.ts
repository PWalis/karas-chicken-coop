"use server";

// This is your test secret API key.
import { NextRequest, NextResponse } from "next/server";
import { fetchProductsTotal } from "@/app/lib/actions";
import Stripe from "stripe";

const stripe_secret = process.env.STRIPE_SECRET_KEY || " ";

const stripe = new Stripe(stripe_secret);

export async function POST(req: Request, res: Response) {
  const { products, shipping } = await req.json();

  const costOfProducts = await fetchProductsTotal(products);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: (costOfProducts + shipping) as number,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    }
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  });
}

export async function PATCH(req: Request, res: Response) {
  const { paymentIntentId, products, shipping } = await req.json();

  const amountTotal = await fetchProductsTotal(products) + shipping;

  const updatedPaymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
    amount: amountTotal as number,
  });

  return NextResponse.json({ message: "PaymentIntent updated" });
}
