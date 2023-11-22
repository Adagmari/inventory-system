<?php

require_once("autoload.php");

try {
    $product = new product();
    $requestData = json_decode(file_get_contents('php://input'), true);

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $requestData = isset($_GET['data']) ? $_GET['data'] : '';
        if (empty($requestData)) {
            $product_list = $product->list_product();
            echo $product_list;
        }else {
            $product_data = $product->listProductByData($requestData);
            echo $product_data;
        }
    }
    
    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        if (empty($requestData)) {
            http_response_code(402);
            echo json_encode(array('error' => 'No se recibio parámetros.'));
            exit();
        }

        $product_creado = $product->create_product($requestData);
        echo $product_creado;

    }
    
    if($_SERVER['REQUEST_METHOD'] == 'PUT') {

        if (empty($requestData)) {
            http_response_code(402);
            echo json_encode(array('error' => 'No se recibio parámetros.'));
            exit();
        }

        $product_update = $product->update_product($requestData);
        echo $product_update;
    }

} catch (Exception $e) {
    http_response_code(500); 
    $response = array('error' => 'Se produjo un error en el servidor.');
    echo json_encode($response);
    exit();
}


?>