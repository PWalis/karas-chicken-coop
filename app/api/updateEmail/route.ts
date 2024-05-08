import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe_secret = process.env.STRIPE_SECRET_KEY || " ";

const stripe = new Stripe(stripe_secret);

export async function POST(req: NextRequest) {
  const { paymentIntentId, email } = await req.json();

  try {
    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      receipt_email: email,
    });
    return NextResponse.json({ message: "Success", PI: paymentIntent }, { status: 200 });
  } catch (error) {
    console.log("error adding email to payment intent")
    return NextResponse.json({ error: error });
  }
}
