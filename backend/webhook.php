<?php

require 'Database.php';
require 'Order.php';
require 'vendor/autoload.php';



$stripe_secret_key = $_ENV['STRIPE_SECRET_KEY'];
$endpoint_secret = $_ENV['END_POINT_SECRET'];

\Stripe\Stripe::setApiKey($stripe_secret_key);

// Get raw payload
$payload = @file_get_contents('php://input');
$sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? null;

try {
    // Verify webhook signature
    $event = \Stripe\Webhook::constructEvent(
        $payload,
        $sig_header,
        $endpoint_secret
    );
} catch (\UnexpectedValueException $e) {
    http_response_code(400);
    echo 'Invalid payload';
    exit();
} catch (\Stripe\Exception\SignatureVerificationException $e) {
    http_response_code(400);
    echo 'Invalid signature';
    exit();
}

// ==========================
// DB Setup
// ==========================
$db = (new Database())->getConnection();
$order = new Order($db);

// ==========================
// Handle Events
// ==========================
switch ($event->type) {

    case 'checkout.session.completed':

        $session = $event->data->object;

        $orderId = $session->metadata->order_id ?? null;

        if ($orderId) {
            $order->markAsPaid($orderId);
        }

        break;

    case 'payment_intent.payment_failed':

        $intent = $event->data->object;

        // Optional: mark failed
        // You can map using metadata if needed

        break;

    default:
        // Unknown event
        break;
}

// ==========================
// Response
// ==========================
http_response_code(200);
echo json_encode(['status' => 'success']);
?>