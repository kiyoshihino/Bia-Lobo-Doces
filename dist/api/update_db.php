<?php
// public/api/update_db.php
require 'config.php';

$address = 'QBR8, bloco O, Residencial Santos Dumont, DF.';
$addressShort = 'Residencial Santos Dumont, DF';
$bio = 'A Bia Lobo Doces nasceu de forma simples e despretensiosa, entre receitas feitas para a família e para amigos. O que começou como um gesto de carinho logo se transformou em uma grande paixão pela confeitaria.\nMovida pelo desejo constante de aprender e se aperfeiçoar, Bia mergulhou no estudo das técnicas da confeitaria, explorando sabores, massas e texturas. Cada receita passou a ser desenvolvida com cuidado, pesquisa e dedicação, sempre buscando entregar algo especial e memorável.\n\nAssim surgiu a Bia Lobo Doces: uma confeitaria que valoriza o sabor, a qualidade dos ingredientes e a experiência de cada cliente. Cada doce é pensado com atenção aos detalhes, preparado com carinho e feito para participar de momentos importantes e celebrar histórias únicas.\n\nPor trás de cada criação existe muito mais do que técnica: existe amor pelo que se faz. Bia é mãe, esposa, professora e uma apaixonada pela arte de transformar ingredientes em doces que encantam.';

try {
    $stmt = $pdo->prepare("UPDATE profile SET address=?, addressShort=?, bio=? WHERE id=1");
    $stmt->execute([$address, $addressShort, $bio]);
    echo "<h1>Sucesso!</h1><p>Endereço e Bio atualizados no banco de dados.</p>";
} catch (Exception $e) {
    echo "<h1>Erro</h1><p>" . $e->getMessage() . "</p>";
}
?>
