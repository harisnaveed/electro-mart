<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

require 'Database.php';
require 'Order.php';
$stripe_secret_key = $_ENV['STRIPE_SECRET_KEY'];
\Stripe\Stripe::setApiKey($stripe_secret_key);



$input = json_decode(file_get_contents('php://input'), true);

$db = (new Database())->getConnection();
$order = new Order($db);

// =====================
// Extract Data
// =====================
$cart = $input['cart'];
$shippingAmount = (float) $input['shipping'];
$taxValue = (float) $input['tax'];

$formData = $input['form'];

$name = $formData['name'];
$email = $formData['email'];
$phone = $formData['phone'];
$address = $formData['address'];

// =====================
// Calculate totals
// =====================
$subtotal = 0;

foreach ($cart as $item) {
  $subtotal += $item['price'] * $item['quantity'];
}

$tax = $subtotal * $taxValue;
$total = $subtotal + $shippingAmount + $tax;

// =====================
// Save Order (PENDING)
// =====================
$data = [
  'name' => $name,
  'email' => $email,
  'phone' => $phone,
  'address' => $address,
  'cart' => $cart,
  'shipping' => $shippingAmount,
  'tax' => $tax,
  'total' => $total
];

$orderId = $order->createOrder($data);

// =====================
// Stripe Line Items
// =====================
$line_items = [];

foreach ($cart as $item) {
  $line_items[] = [
    'price_data' => [
      'currency' => 'usd',
      'product_data' => [
        'name' => $item['title'],
      ],
      'unit_amount' => (int) round($item['price'] * 100),
    ],
    'quantity' => (int) $item['quantity'],
  ];
}

// Shipping
$line_items[] = [
  'price_data' => [
    'currency' => 'usd',
    'product_data' => ['name' => 'Shipping'],
    'unit_amount' => (int) round($shippingAmount * 100),
  ],
  'quantity' => 1,
];

// Tax
$line_items[] = [
  'price_data' => [
    'currency' => 'usd',
    'product_data' => ['name' => 'Tax'],
    'unit_amount' => (int) round($tax * 100),
  ],
  'quantity' => 1,
];

// =====================
// Create Stripe Session
// =====================
$session = \Stripe\Checkout\Session::create([
  'payment_method_types' => ['card'],
  'line_items' => $line_items,
  'mode' => 'payment',

  'customer_email' => $email,

  'success_url' => 'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
  'cancel_url' => 'http://localhost:5173/cancel',

  // 🔥 CRITICAL
  'metadata' => [
    'order_id' => $orderId
  ]
]);

// =====================
// Save REAL session ID
// =====================
$order->updateStripeSession($orderId, $session->id);

// =====================
// Response
// =====================
echo json_encode([
  'url' => $session->url
]);
