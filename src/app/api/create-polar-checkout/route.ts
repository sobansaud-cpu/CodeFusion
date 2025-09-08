import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const productId = 'a66f61fa-8ed2-46b9-a2e2-44475e5a401d'; // Pro plan product ID
  const successUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?plan=pro`;
  const cancelUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`;

  // Call Polar.sh API to create checkout session
  const response = await fetch('https://api.polar.sh/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.POLAR_API_KEY}`,
    },
    body: JSON.stringify({
      productId,
      userId,
      successUrl,
      cancelUrl,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Polar.sh API error:', errorText);
    return NextResponse.json({ error: 'Failed to create Polar.sh checkout session', details: errorText }, { status: 500 });
  }

  const data = await response.json();
  // Redirect user to Polar.sh checkout page
  return NextResponse.redirect(data.checkoutUrl);
}
