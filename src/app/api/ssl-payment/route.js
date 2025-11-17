import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const { product, userEmail } = data;

    console.log("Received request data:", { product, userEmail });

    // Validate required fields
    if (!product || !product.price || !product.name) {
      return NextResponse.json(
        { error: "Product information is required" },
        { status: 400 }
      );
    }

    const store_id = process.env.SSL_STORE_ID;
    const store_passwd = process.env.SSL_STORE_PASSWORD;
    const is_live = process.env.SSL_SANDBOX === "true" ? false : true;

    console.log("Environment check:", {
      store_id: store_id ? "✓ Set" : "✗ Missing",
      store_passwd: store_passwd ? "✓ Set" : "✗ Missing",
      is_live: is_live,
      base_url: process.env.NEXT_PUBLIC_BASE_URL
    });

    // Validate environment variables
    if (!store_id || !store_passwd) {
      return NextResponse.json(
        { error: "Payment configuration error - Check SSL_STORE_ID and SSL_STORE_PASSWORD in .env.local" },
        { status: 500 }
      );
    }

    const tran_id = `tran_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Prepare the data for SSLCommerz
    const postData = {
      store_id: store_id,
      store_passwd: store_passwd,
      total_amount: Number(product.price).toFixed(2), // Ensure it's a number with 2 decimal places
      currency: "BDT",
      tran_id: tran_id,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/ssl-payment/success?tran_id=${tran_id}`,
      fail_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/ssl-payment/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/ssl-payment/cancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/ssl-payment/ipn`,
      shipping_method: "NO",
      product_name: product.name.substring(0, 100),
      product_category: product.category || "General",
      product_profile: "general",
      cus_name: "Test Customer",
      cus_email: userEmail || "test@example.com",
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01700000000",
    };

    console.log("Final postData to SSLCommerz:", postData);

    // Determine API endpoint based on environment
    const apiUrl = is_live 
      ? 'https://securepay.sslcommerz.com/gwprocess/v4/api.php'
      : 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

    // Convert data to URL-encoded format
    const formData = new URLSearchParams();
    for (const [key, value] of Object.entries(postData)) {
      formData.append(key, value.toString());
    }

    console.log("Making request to:", apiUrl);

    // Make API request to SSLCommerz with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    const responseText = await response.text();
    console.log("Raw SSLCommerz response:", responseText);

    let apiResponse;
    try {
      apiResponse = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse SSLCommerz response:", parseError);
      return NextResponse.json(
        { 
          error: "Invalid response from payment gateway",
          details: responseText
        },
        { status: 500 }
      );
    }

    console.log("Parsed SSLCommerz response:", apiResponse);

    // Check if initialization was successful
    if (apiResponse.status === 'SUCCESS' && apiResponse.GatewayPageURL) {
      console.log("Payment initialization successful, redirecting to:", apiResponse.GatewayPageURL);
      return NextResponse.json({ 
        success: true,
        redirectURL: apiResponse.GatewayPageURL,
        tran_id: tran_id
      });
    } else {
      console.error("SSLCommerz Init Failed:", apiResponse);
      return NextResponse.json(
        { 
          error: apiResponse.failedreason || "Payment initialization failed",
          response: apiResponse
        },
        { status: 400 }
      );
    }

  } catch (err) {
    console.error("SSL Payment Error:", err);
    if (err.name === 'AbortError') {
      return NextResponse.json(
        { error: "Payment gateway timeout - please try again" },
        { status: 408 }
      );
    }
    return NextResponse.json(
      { 
        error: "Payment initialization failed",
        message: err.message
      },
      { status: 500 }
    );
  }
}