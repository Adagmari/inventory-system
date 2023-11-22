<?php

class Product extends Conectar{

    public function list_product(){
        try {
            $conectar = parent::db();
            $query = "SELECT * FROM product";
            $query = $conectar->prepare($query);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            if ($result == null || !$result) {
                $result = array();
            }
            return json_encode($result);
        } catch(Exception $e){
            return json_encode(["error" => $e->getMessage()]);
        }
        
    }
    public function listProductByData($data){
        try {
            $conectar = parent::db();
            $query = "SELECT * 
            FROM product p
            WHERE p.product_SKU LIKE '%{$data}%'OR p.product_name LIKE '%{$data}%' ";

            $query = $conectar->prepare($query);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            if ($result == null || !$result) {
                $result = array();
            }
            return json_encode($result);
        } catch(Exception $e){
            return json_encode(["error" => $e->getMessage()]);
        }
    }

    public function create_product($data){
        try {
            // Validación de datos
            if (empty($data['product_SKU'])) {
                return json_encode(["error" => "El SKU es obligatorio", "recibido" => $data]);
            }
    
            $conectar = parent::db();
            $conectar->beginTransaction();
            $timestamp = time();
    
            // Verificar si el producto ya existe
            $product_sku = $data['product_SKU'];
            $queryVerificar = "SELECT COUNT(*) FROM product WHERE product_SKU = :sku";
            $queryVerificar = $conectar->prepare($queryVerificar);
            $queryVerificar->execute([':sku' => $product_sku]);
            $productExistente = $queryVerificar->fetchColumn();
    
            if ($productExistente > 0) {
                $conectar->rollback();
                return json_encode(["error" => "Ya existe un producto con el mismo sku"]);
            }
    
            
            // Insertar el producto
            $queryInsertar = "INSERT INTO product (product_SKU, product_name, product_description,product_color,product_state,product_image)
                VALUES (:sku, :nameP, :descriptionP,:color,:stateP,:imageP)";
            $queryInsertar = $conectar->prepare($queryInsertar);
            $queryInsertar->execute([
                ':sku' => $data['product_SKU'],
                ':nameP' => $data['product_name'],
                ':descriptionP' => $data['product_description'],
                ':color' => $data['product_color'],
                ':stateP' => $data['product_state'],
                ':imageP' => $data['product_image']
            ]);
    
            if ($queryInsertar->rowCount() > 0) {
                $product_id = $conectar->lastInsertId();
                $conectar->commit();
                $result = [
                    "mensaje" => "Producto insertado exitosamente.",
                    "product_id" => $product_id
                ];
            } else {
                $conectar->rollback();
                $result = ["mensaje" => "No se insertó el producto."];
            }
    
            return json_encode($result);
    
        } catch(Exception $e){
            $conectar->rollback();
            return json_encode(["error" => $e->getMessage()]);
        }
    }

    public function update_product($data){
        try {
            // Validación de datos
            if (empty($data['product_SKU']) ) {
                return json_encode(["mensaje" => "Campo sku es obligatorio", "recibido" => $data]);
            }
            // Verificar si el producto ya existe
            /*$product_sku = $data['product_SKU'];
            $queryVerificar = "SELECT COUNT(*) FROM product WHERE product_SKU = :sku";
            $queryVerificar = $conectar->prepare($queryVerificar);
            $queryVerificar->execute([':sku' => $product_sku]);
            $productExistente = $queryVerificar->fetchColumn();
    
            if ($productExistente > 0) {
                $conectar->rollback();
                return json_encode(["error" => "Ya existe un product con el mismo sku"]);
            }*/

            $conectar = parent::db();
            $query ="";
            if(empty($data['product_image'])){
                $query .= "UPDATE product 
                        SET product_SKU = '{$data['product_SKU']}',
                        product_name = '{$data['product_name']}',
                        product_description = '{$data['product_description']}',
                        product_color = '{$data['product_color']}',
                        product_state = '{$data['product_state']}'
                        WHERE product_id = {$data['product_id']}
                        ";
            }else{
                $query .= "UPDATE product
                        SET product_SKU = '{$data['product_SKU']}',
                        product_name = '{$data['product_name']}',
                        product_description = '{$data['product_description']}',
                        product_color = '{$data['product_color']}',
                        product_state = '{$data['product_state']}',
                        product_image = '{$data['product_image']}'
                        WHERE product_id = {$data['product_id']}
                        ";

            }
            $query = $conectar->prepare($query);
            $query->execute();

            if ($query->rowCount() > 0) {
                $result = ["mensaje" => "product actualizado exitosamente."];
            } else {
                $result = ["mensaje" => "No hubo cambios en los datos del product."];
            }
            return json_encode($result);
        } catch(Exception $e){
            return json_encode(["error" => $e->getMessage()]);
        }
    }

}

?>