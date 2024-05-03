"use server";

import { NextRequest, NextResponse } from "next/server";
import { setOrderStatus } from "@/app/lib/actions";

import Stripe from "stripe";

const stripe_secret = process.env.STRIPE_SECRET_KEY || " ";

const stripe = new Stripe(stripe_secret);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_336f1ab4537a4862dc2cea46e45ed0461e445000e4486160304e87cc85fbeb19";

export async function POST(req: Request, res: Response) {
  const headers = req.headers as any;
  const body = await req.text();
  const sig = headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.log(`Webhook Error: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      console.log("Payment Intent Success:", paymentIntentSucceeded.id);
      const successStatus = await setOrderStatus(
        paymentIntentSucceeded.metadata.orderId,
        "PAID"
      );
      console.log("Order Status Updated:", successStatus);
      break;
    // ... handle other event types
    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object;
      // Then define and call a function to handle the event payment_intent.payment_failed
      console.log("Payment Intent Failed:", paymentIntentFailed.id);
      break;
    case "payment_intent.created":
      const paymentIntentCreated = event.data.object;
      // Then define and call a function to handle the event payment_intent.created
      console.log("Payment Intent Created:", paymentIntentCreated.id);
      break;
    case "payment_intent.canceled":
      const paymentIntentCanceled = event.data.object;
      // Then define and call a function to handle the event payment_intent.canceled
      console.log("Payment Intent Canceled:", paymentIntentCanceled.id);

      const cancelStatus = await setOrderStatus(
        paymentIntentCanceled.metadata.orderId,
        "CANCELED"
      );
      console.log("Order Status Updated:", cancelStatus);
      break;
    case "payment_intent.processing":
      const paymentIntentProcessing = event.data.object;
      // Then define and call a function to handle the event payment_intent.processing
      console.log("Payment Intent Processing:", paymentIntentProcessing.id);
      break;
    case "charge.failed":
      const chargeFailed = event.data.object;
      // Then define and call a function to handle the event charge.failed
      console.log("Charge Failed:", chargeFailed.id);
      break;
    case "charge.succeeded":
      const chargeSucceeded = event.data.object;
      // Then define and call a function to handle the event charge.succeeded
      console.log("Charge Succeeded:", chargeSucceeded.id);
      break;
    case "charge.updated":
      const chargeUpdated = event.data.object;
      // Then define and call a function to handle the event charge.updated
      console.log("Charge Updated:", chargeUpdated.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  //   console.log("Event Received", event);
  return NextResponse.json({ received: true }, { status: 200 });
}
