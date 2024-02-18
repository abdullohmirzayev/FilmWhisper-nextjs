import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  if (method === "GET") {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });
    return res.status(200).json({ products });
  } else if (method === "POST") {
  } else {
    return res.status(400).json({ massage: "Method not allowed" });
  }
}

interface Data {
  massage?: string;
  products?: Stripe.Response<Stripe.ApiList<Stripe.Product>>
};
