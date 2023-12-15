class ProductService {

  base=window.baseURL;
  server = this.base +"/back/api/product_ws.php";
  //baseURL = "http://localhost/Back-Inventario/back/api/product_ws.php";  
    async getProducts() {
      const response = await fetch(`${this.server}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error al obtener productos: ${response.statusText}`);
      }
  
      return response.json();
    }
    async getProductsByData(productData){

      const response = await $.ajax({
        url: `${this.server}`, // Reemplaza con la ruta correcta a tu archivo PHP
        type: 'GET',
        data: { data: productData }, // Pasa el dato de búsqueda como parámetro
        dataType: 'json',
        error: function (error) {
          throw new Error(`Error al obtener productos: ${error.responseText}`);
          //console.error('Error en la búsqueda:', error.responseText);
        }
      });
      return response;

    }
  
    async createProduct(productData) {
      const response = await fetch(`${this.server}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        throw new Error(`Error al crear producto: ${response.statusText}`);
      }
  
      return response.json();
    }
    
    async updateProduct(productData) {
      const response = await fetch(`${this.server}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        throw new Error(`Error al actualizar producto2: ${response.statusText}`);
      }
      
      return response.json();
    }
  }