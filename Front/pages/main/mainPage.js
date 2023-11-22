if (typeof ProductService) {
  var productService = new ProductService('http://localhost/Back-Inventario/back/api/product_ws.php');
}
var products=[];
async function getProducts() {
  try {
    products = await productService.getProducts();
    //console.log(products)
    var productContainer = $("#productContainer");
    for (var i = 0; i < products.length; i++) {
        productContainer.append(createCard(products[i]));
        //console.log(products[i].product_name);
    };
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
}
/*var products=[
    {
      "product_id": "1",
      "product_SKU": "FLR001",
      "product_name": "Rose",
      "product_description": "A classic symbol of love and beauty.",
      "product_color": "#FF0000",
      "product_state": "1",
      "product_image": "https://i.pinimg.com/736x/85/39/77/853977033b04e3c241325db0f48fea96.jpg"
    },
    {
      "product_id": "2",
      "product_SKU": "FLR002",
      "product_name": "Tulip",
      "product_description": "A delicate flower with vibrant colors.",
      "product_color": "#FFA500",
      "product_state": "1",
      "product_image": "https://cdn11.bigcommerce.com/s-1b9100svju/images/stencil/1280x1280/products/488/931/DETA-128__69986.1631199402.jpg?c=1"
    },
    {
      "product_id": "3",
      "product_SKU": "FLR003",
      "product_name": "Sunflower",
      "product_description": "A bright and cheerful flower that follows the sun.",
      "product_color": "#FFD700",
      "product_state": "1",
      "product_image": "https://www.collinsdictionary.com/images/full/sunflower_145293031.jpg"
    },
    {
      "product_id": "4",
      "product_SKU": "FLR004",
      "product_name": "Lily",
      "product_description": "A fragrant flower often used in bouquets.",
      "product_color": "#FFD700",
      "product_state": "0",
      "product_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Lilium_candidum_1.jpg/640px-Lilium_candidum_1.jpg"
    },
    {
      "product_id": "5",
      "product_SKU": "FLR005",
      "product_name": "Carnation",
      "product_description": "A versatile flower with many different meanings.",
      "product_color": "#FFC0CB",
      "product_state": "1",
      "product_image": "https://cdn.britannica.com/04/204204-050-13AFD426/red-carnation-flowers.jpg"
    },
    {
      "product_id": "6",
      "product_SKU": "FLR006",
      "product_name": "Orchid",
      "product_description": "An exotic and elegant flower.",
      "product_color": "#DA70D6",
      "product_state": "1",
      "product_image": "https://www.1800flowers.com/blog/wp-content/uploads/2019/09/orchid-facts-hero.jpg"
    },
    {
      "product_id": "7",
      "product_SKU": "FLR007",
      "product_name": "Daisy",
      "product_description": "A simple and cheerful flower.",
      "product_color": "#FFFF00",
      "product_state": "1",
      "product_image": "https://i.pinimg.com/originals/39/da/a6/39daa6e9a23d95e8fcd89ac5d84fc67a.jpg"
    },
    {
      "product_id": "8",
      "product_SKU": "FLR008",
      "product_name": "Cactus",
      "product_description": "A unique and low-maintenance plant.",
      "product_color": "#008000",
      "product_state": "1",
      "product_image": "https://hips.hearstapps.com/hmg-prod/images/cactus-cereus-1633078950.jpg"
    }
  ];*/

  function mostrarInformacionProducto(product_SKU,product_color,product_description,product_image,product_name,product_state,product_id) {
    var modalBody = document.getElementById('productModalBody');
      modalBody.innerHTML=`
      <h1>Actualizar Producto</h1>
      <div class="container mt-5">
        <form id="updateForm">
            <div class="row">
                <div class="col-md-6">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="sku">SKU:</label>
                                <input value="${product_SKU}" type="text" class="form-control" id="sku" name="product_SKU" required>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="productColor">Color del Producto:</label>
                                <input value="${product_color}"type="color" class="form-control" id="productColor" name="product_color" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="productName">Nombre del Producto:</label>
                        <input value="${product_name}"type="text" class="form-control" id="productName" name="product_name" required>
                    </div>
                    <div class="form-group">
                        <label for="productDescription">Descripción del Producto:</label>
                        <textarea class="form-control" id="productDescription" name="product_description" rows="3" required>${product_description}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <div class="form-check">
                            <input ${product_state==1 ? 'checked' : ''} class="form-check-input" type="checkbox" id="productState" name="product_state">
                            <label class="form-check-label" for="productState">
                                Estado del Producto (Activo)
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="productImage">Imagen del Producto:</label>
                        <input type="file" class="form-control-file" id="productImage" name="product_image" accept="image/*" onchange="previewImage(this)">
                        <small class="form-text text-muted">Selecciona una imagen para tu producto.</small>
                    </div>
                    <div class="form-group imageProduct">
                        <!-- Establece la URL de la imagen por defecto en el atributo src -->
                        <img src="${product_image}" id="imagePreview"  class="img-fluid" alt="Vista previa de la imagen">
                    </div>
                </div>
            </div>
            <div class="btn-register-update">
              <button type="submit" class="btn btn-primary " id="submitButton" disabled onclick="updateProduct('${product_id}')">Actualizar Datos</button>
            </div>
        </form>
      </div>
      `;
      $("#updateForm input, #updateForm textarea, #updateForm select ").on("input", checkForm);

      function checkForm() {
          var allFieldsFilled = true;
          $("#updateForm input, #updateForm textarea, #updateForm select  ").each(function () {
              if ($(this).prop("required") && $(this).val().trim() === "") {
                  allFieldsFilled = false;
                  return false;
              }
          });
          $("#submitButton").prop("disabled", !allFieldsFilled);
      }  
  }; 
    
    function updateProduct(product_id) {
      $("#updateForm").submit(function(event) {
        event.preventDefault();
      });
      var productData2 = {};
      var formData = $("#updateForm").serializeArray();
      formData.forEach(function (entry) {
          if(entry.name =="product_state" && entry.value=="on"){
              productData2[entry.name] = 1;
              
          }else{
              productData2[entry.name] = entry.value;
              productData2["product_state"] = 0;
          }
          
      });
      productData2["product_id"] = +product_id;
      //unificando datos
      const resultado = Object.assign({}, productData, productData2);
      swal({
        title: "Confirmar",
        text: "Desea actualizar la información del producto con los datos cargados?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
      }).then((result) => {
        console.log(result);
        if (!result.dismiss) {
            productService.updateProduct(resultado)
            .then(updatedProduct => {
              //console.log('Producto actualizado:', updatedProduct)
              if(!updatedProduct.error){
                  swal(
                    "Actualizado!", 
                    "Se ha actualizado el producto con el SKU: "+productData2["product_SKU"], 
                    "success"
                  ).then((result) => {
                    if (result) {
                        location.reload();
                    }
                  });
                  $("#submitButton").prop("disabled", true);
                  document.getElementById("updateForm").reset();
              }else{
                  swal("Error!", "No se pudo actualizar el producto: "+updatedProduct["error"], "error");
              }
            })
            .then(() => {
                $('#productModal').modal('hide');
            })
            .catch(error => {
              swal("Error!", "No se pudo actualizar el producto: "+error, "error");
            });
            
        }
      });
      
    };


  function createCard(product) {
    return `
        <div class="col-md-3 mb-3">
            <div class="card" style="width: 15rem;">
                <div class="card-body cardHeader">
                    <h4 class="card-title"><strong>${product.product_name}</strong></h3>
                    <h6 class="card-SKU"><strong>SKU:</strong> ${product.product_SKU}</h6>
                </div>
                <div class="image">
                  <img src="${product.product_image}" alt="Avatar" class="desImg card-img-top">
                  <div class="descriptionImage" style="background-color: ${product.product_color}80;">
                    <div class="textDescription">${product.product_description}</div>
                  </div>
                </div>
                <!--<div class="card-body">
                    <p class="card-text">${product.product_description}</p>
                </div>-->
                <div class="card-body card-color-state">
                    <div class="row">
                        <div class="col-md-6 content-color">
                            <p><strong>Color:</strong> <span style="background-color: ${product.product_color}; display: inline-block; width: 12px; height: 12px;border-radius: 50%;"></span></p>
                        </div>
                        <div class="col-md-6 content-state">
                            <p style="color: ${product.product_state == 1 ? 'green' : 'red'}; text-align: right;" >${product.product_state == 1 ? 'Activo' : 'Inactivo'}</p>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productModal" onclick="mostrarInformacionProducto('${product.product_SKU}','${product.product_color}','${product.product_description}','${product.product_image}','${product.product_name}','${product.product_state}','${product.product_id}')">
                    Editar
                </button>

            </div>
        </div>
    `;
};
async function filterProducts(searchProduct) {
  try {
    var productsFiltered = await productService.getProductsByData(searchProduct);
    //console.log(productsFiltered)
    updateCardProduct(productsFiltered);
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
    
}

function updateCardProduct(products) {
    var container = $("#productContainer");
    container.empty(); 
    for (var i = 0; i < products.length; i++) {
        container.append(createCard(products[i]));
    }
}

$("#searchProduct").on("input", function () {
    var searchProduct = $(this).val();
    filterProducts(searchProduct);
});

$(document).ready(function () {
  getProducts();
  
});