import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, gigId, userId, userName, userEmail } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Gig Booking - ${gigId}`,
            },
            unit_amount: amount, // in paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: userEmail || undefined,
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
      metadata: {
        gigId,
        userId,
        userName,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
