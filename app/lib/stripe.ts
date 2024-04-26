"use server";

import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import Stripe from "stripe";

const stripe_secret = process.env.STRIPE_SECRET || " ";

const stripe = new Stripe(stripe_secret);

export const stripeCreateProduct = async (productName: any) => {
  try {
    const product = await stripe.products.create({
      name: productName,
    });
    console.log("\n\n\nSTRIPE PRODUCT", product);
    return product;
  } catch (error) {
    console.log("Error creating stripe product", error);
  }
};

export const stripeCreatePrice = async (
  priceInCents: number,
  productId: string
) => {
  try {
    const stripePrice = await stripe.prices.create({
      product: productId,
      unit_amount: priceInCents,
      currency: "usd",
    });
    return stripePrice;
  } catch (error) {
    console.log("error creating stripe price", error);
  }
};

export const stripeDeleteProduct = async (productId: string) => {
  try {
    const product = await stripe.products.del(productId);
    return product;
  } catch (error) {
    console.log("error deleting stripe product", error);
  }
};

export const stripeArchiveProduct = async (productId: string) => {
  try {
    const product = await stripe.products.update(productId, {
      active: false,
    });
    return product;
  } catch (error) {
    console.log("error archiving stripe product", error);
  }
};

export const stripeFetchProductId = async (productId: string) => {};

export const stripeFetchPriceId = async (priceId: string) => {};

export const stripeUpdateProduct = async (
  productId: string,
  productName: any
) => {
  try {
    const updatedProduct = await stripe.products.update(productId, {
      name: productName,
    });
    return updatedProduct;
  } catch (error) {
    console.log("error updating stripe product", error);
  }
};

export const createProductAndReturnId = async (product: any) => {};

export const createCheckoutSession = async (line_items: any[]) => {
  try {
    const prices = await stripe.prices.list();
    // console.log("\nSTRIPE PRICES", prices);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      ui_mode: "embedded",
      line_items: [...line_items],
      mode: "payment",
      return_url: "http://localhost:3000/shop",
    });
    // console.log("STRIPE CHECKOUT SESSION", session); 
    return session.client_secret;
  } catch (error) {
    console.log("\nERROR creating stripe checkout session\n", error);
  }
};


