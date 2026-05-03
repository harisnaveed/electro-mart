<?php

class Order
{
  private $conn;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  public function createOrder($data)
  {
    try {
      $this->conn->beginTransaction();

      // 1. Insert order
      $query = "INSERT INTO orders 
                (name, email, phone, address, cart_data, shipping, tax, total, status)
                VALUES 
                (:name, :email, :phone, :address, :cart, :shipping, :tax, :total, 'pending')
                RETURNING id";

      $stmt = $this->conn->prepare($query);

      $stmt->execute([
        ':name' => $data['name'],
        ':email' => $data['email'],
        ':phone' => $data['phone'],
        ':address' => $data['address'],
        ':cart' => json_encode($data['cart']),
        ':shipping' => $data['shipping'],
        ':tax' => $data['tax'],
        ':total' => $data['total']
      ]);

      $orderId = $stmt->fetchColumn();

      // 2. Insert order items
      $itemQuery = "INSERT INTO order_items
                (order_id, product_id, product_name, price, quantity, subtotal)
                VALUES
                (:order_id, :product_id, :product_name, :price, :quantity, :subtotal)";

      $itemStmt = $this->conn->prepare($itemQuery);

      foreach ($data['cart'] as $item) {
        $itemStmt->execute([
          ':order_id' => $orderId,
          ':product_id' => $item['id'] ?? null,
          ':product_name' => $item['title'],
          ':price' => $item['price'],
          ':quantity' => $item['quantity'],
          ':subtotal' => $item['price'] * $item['quantity']
        ]);
      }

      $this->conn->commit();

      return $orderId;
    } catch (Exception $e) {
      $this->conn->rollBack();
      throw $e;
    }
  }

  public function updateStripeSession($orderId, $sessionId)
  {
    $query = "UPDATE orders SET stripe_session_id = :session WHERE id = :id";
    $stmt = $this->conn->prepare($query);

    return $stmt->execute([
      ':session' => $sessionId,
      ':id' => $orderId
    ]);
  }

  public function markAsPaid($orderId)
  {
    $query = "UPDATE orders SET status = 'paid' WHERE id = :id";
    $stmt = $this->conn->prepare($query);

    return $stmt->execute([
      ':id' => $orderId
    ]);
  }
}
