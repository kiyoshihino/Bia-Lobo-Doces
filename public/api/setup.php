<?php
// public/api/setup.php
require 'config.php';

try {
    // Tabela: Empresa / Perfil
    $pdo->exec("CREATE TABLE IF NOT EXISTS profile (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255),
        logo LONGTEXT,
        phone VARCHAR(50),
        whatsapp VARCHAR(50),
        address VARCHAR(255),
        addressShort VARCHAR(255),
        instagram VARCHAR(100),
        facebook VARCHAR(100),
        email VARCHAR(100),
        bio TEXT,
        experience VARCHAR(50)
    )");

    // Tabela: Categorias
    $pdo->exec("CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255),
        image LONGTEXT
    )");

    // Tabela: Produtos
    $pdo->exec("CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        price DECIMAL(10,2),
        image LONGTEXT,
        category VARCHAR(100),
        tags TEXT
    )");
    // Tabela: Users (Múltiplos Acessos)
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL
    )");

    // Inserir Usuários Iniciais (Seed) se vazio
    $stmtUsers = $pdo->query("SELECT COUNT(*) FROM users");
    if ($stmtUsers->fetchColumn() == 0) {
        $hashKiyoshi = password_hash('SenhaKiyoshi123', PASSWORD_DEFAULT);
        $hashBia = password_hash('BiaDoces2026', PASSWORD_DEFAULT);
        
        $pdo->exec("INSERT INTO users (username, password_hash) VALUES 
            ('kiyoshi', '$hashKiyoshi'),
            ('bia', '$hashBia')
        ");
    }

    // Inserir Perfil Inicial (Seed) se vazio
    $stmt = $pdo->query("SELECT COUNT(*) FROM profile");
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("INSERT INTO profile (name, logo, phone, whatsapp, address, addressShort, instagram, facebook, email, bio, experience) 
        VALUES (
            'Bia Lobo', 
            './assets/logo.png', 
            '+55 61 99259-0209', 
            '5561992590209', 
            'QBR8, bloco O, Residencial Santos Dumont, DF.', 
            'Residencial Santos Dumont, DF', 
            'bialobodoces', 
            'bialobodoces', 
            'contato@bialobodoces.com.br', 
            'A Bia Lobo Doces nasceu de forma simples e despretensiosa, entre receitas feitas para a família e para amigos. O que começou como um gesto de carinho logo se transformou em uma grande paixão pela confeitaria.\nMovida pelo desejo constante de aprender e se aperfeiçoar, Bia mergulhou no estudo das técnicas da confeitaria, explorando sabores, massas e texturas. Cada receita passou a ser desenvolvida com cuidado, pesquisa e dedicação, sempre buscando entregar algo especial e memorável.\n\nAssim surgiu a Bia Lobo Doces: uma confeitaria que valoriza o sabor, a qualidade dos ingredientes e a experiência de cada cliente. Cada doce é pensado com atenção aos detalhes, preparado com carinho e feito para participar de momentos importantes e celebrar histórias únicas.\n\nPor trás de cada criação existe muito mais do que técnica: existe amor pelo que se faz. Bia é mãe, esposa, professora e uma apaixonada pela arte de transformar ingredientes em doces que encantam.', 
            ''
        )");
    }

    echo "<h1>Sucesso!</h1>";
    echo "<p>Banco de dados e tabelas configurados com sucesso.</p>";
    echo "<p>Você pode <strong>apagar este arquivo (setup.php)</strong> do servidor por segurança.</p>";
} catch (Exception $e) {
    echo "<h1>Erro</h1>";
    echo "<p>Erro ao configurar banco: " . $e->getMessage() . "</p>";
}
?>
