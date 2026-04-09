<?php
// public/api/index.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Ajuda para dev local
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

// ======================================
// GET: Buscar Tudo (Load Inicial)
// ======================================
if ($method === 'GET') {
    $profile = $pdo->query("SELECT * FROM profile ORDER BY id DESC LIMIT 1")->fetch();
    if (!$profile) $profile = new stdClass();
    
    $categories = $pdo->query("SELECT * FROM categories")->fetchAll();
    
    $products = $pdo->query("SELECT * FROM products")->fetchAll();
    
    // Tratamento de parse (cast e jsonDecode)
    foreach($products as &$p) {
        $p['price'] = (float)$p['price'];
        $p['tags'] = json_decode($p['tags'], true);
        if (!$p['tags']) $p['tags'] = [];
    }

    echo json_encode([
        'profile' => $profile,
        'categories' => $categories,
        'products' => $products
    ]);
    exit;
}

// ======================================
// POST/PUT/DELETE via action unificada
// ======================================
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['action'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Ação inválida ou não informada no Payload.']);
    exit;
}

$action = $input['action'];
$data = isset($input['data']) ? $input['data'] : [];

try {
    switch ($action) {
        case 'updateProfile':
            $stmt = $pdo->prepare("UPDATE profile SET name=?, logo=?, phone=?, whatsapp=?, address=?, addressShort=?, instagram=?, facebook=?, email=?, bio=?, experience=? WHERE id=1");
            $stmt->execute([
                $data['name'], $data['logo'], $data['phone'], $data['whatsapp'],
                $data['address'], $data['addressShort'], $data['instagram'],
                $data['facebook'], $data['email'], $data['bio'], $data['experience']
            ]);
            break;

        case 'addCategory':
            $stmt = $pdo->prepare("INSERT INTO categories (id, name, image) VALUES (?, ?, ?)");
            $stmt->execute([$data['id'], $data['name'], $data['image']]);
            break;

        case 'updateCategory':
            $stmt = $pdo->prepare("UPDATE categories SET name=?, image=? WHERE id=?");
            $stmt->execute([$data['name'], $data['image'], $data['id']]);
            break;

        case 'deleteCategory':
            $stmt = $pdo->prepare("DELETE FROM categories WHERE id=?");
            $stmt->execute([$data['id']]);
            break;

        case 'addProduct':
            $stmt = $pdo->prepare("INSERT INTO products (id, name, description, price, image, category, tags) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([$data['id'], $data['name'], $data['description'], $data['price'], $data['image'], $data['category'], json_encode($data['tags'] ?? [])]);
            break;

        case 'updateProduct':
            $stmt = $pdo->prepare("UPDATE products SET name=?, description=?, price=?, image=?, category=?, tags=? WHERE id=?");
            $stmt->execute([$data['name'], $data['description'], $data['price'], $data['image'], $data['category'], json_encode($data['tags'] ?? []), $data['id']]);
            break;

        case 'deleteProduct':
            $stmt = $pdo->prepare("DELETE FROM products WHERE id=?");
            $stmt->execute([$data['id']]);
            break;

        default:
            throw new Exception("Ação '$action' não implementada.");
    }
    
    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
