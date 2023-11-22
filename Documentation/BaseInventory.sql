CREATE DATABASE IF NOT EXISTS `inventario`;
USE `inventario`;
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_SKU` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `product_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `product_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `product_color` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `product_state` int NOT NULL,
  `product_image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,  
  PRIMARY KEY (`product_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
INSERT INTO `product` VALUES 
  (1,'FLR001', 'Rose', 'A classic symbol of love and beauty.', '#FF0000', 1, 'https://i.pinimg.com/736x/85/39/77/853977033b04e3c241325db0f48fea96.jpg'),
  (2,'FLR002', 'Tulip', 'A delicate flower with vibrant colors.', '#FFA500', 1, 'https://cdn11.bigcommerce.com/s-1b9100svju/images/stencil/1280x1280/products/488/931/DETA-128__69986.1631199402.jpg?c=1');
