var productData = {};
/*tipo_form 1 --> register
tipo_form 2 --> edit*/
function crearActualizarProducto(tipo_form,product_SKU,product_color,product_description,product_image,product_name,product_state,product_id) {
    nombre_form="";
    buttonFuntion="";
    buttonName="";
    if(tipo_form==1){
        this.nombre_form="Registrar Producto";
        this.buttonName="Registrar";
        this.buttonFuntion="registerProduct()";
        product_image="../../resources/img/backgroundImage.jpg";
    }else{
        this.nombre_form="Actualizar Producto";
        this.buttonName="Editar";
        this.buttonFuntion="updateProduct("+product_id+")";
    }
    console.log("ingresando");
    var modalBody = document.getElementById('product2ModalBody');
      modalBody.innerHTML=`
      <h1>${nombre_form}</h1>
      <div class="container mt-5">
        <form id="productForm">
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
                        <img src="${product_image}"id="imagePreview" class="img-fluid" alt="Vista previa de la imagen">
                    </div>
                </div>
            </div>
            <div class="btn-register-update">
              <button type="submit" class="btn btn-primary " id="submitButton" disabled onclick="${this.buttonFuntion}">${this.buttonName}</button>
            </div>
        </form>
      </div>
      `;
      $("#productForm input, #productForm textarea, #productForm select ").on("input", checkForm);

      
      function checkForm() {
        var allFieldsFilled = true;
        if(tipo_form==1){
            $("#productForm input, #productForm textarea, #productForm select  #productForm file").each(function () {
                if ($(this).prop("required") && $(this).val().trim() === ""|| ($(this).is('input[type="file"]') && $(this).get(0).files.length === 0)) {
                    allFieldsFilled = false;
                    return false;
                }
            });
        }else{
            $("#updateForm input, #updateForm textarea, #updateForm select  ").each(function () {
                if ($(this).prop("required") && $(this).val().trim() === "") {
                    allFieldsFilled = false;
                    return false;
                }
            });
        }
        
        $("#submitButton").prop("disabled", !allFieldsFilled);
    }  
  }; 

  function registerProduct() {
    $("#productForm").submit(function(event) {
        event.preventDefault();
    });
    // Obtiene los valores del formulario
    var formData = $("#productForm").serializeArray();
    
    
    formData.forEach(function (entry) {
        if(entry.name =="product_state" && entry.value=="on"){
            productData[entry.name] = 1;
            
        }else{
            productData[entry.name] = entry.value;
            productData["product_state"] = 0;
        }
        
    });
    
    console.log("Datos del Producto:", productData);
    swal({
        title: "Confirmar",
        text: "Desea crear un nuevo producto con los datos cargados?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
      }).then((result) => {
        if (!result.dismiss) {
            //console.log("Creando.....")
            productService.createProduct(productData)
            .then(createdProduct => {
                if(createdProduct.mensaje != ""){
                    console.log("ingreso");
                    swal("Creado!", "Se ha creado el producto con el SKU: "+productData["product_SKU"], "success");
                    /*document.getElementById("registerForm").reset();
                    $("#submitButton").prop("disabled", true);*/
                }else{
                    swal("Error!", "No se pudo crear el producto: "+createdProduct["error"], "error");
                }
                
                 
            })
            .then(() => {
                $('#productModal').modal('hide');
            })
            .catch(error => {
                swal("Error!", "No se pudo crear el producto: "+error, "error");
            });           
        }
      }); 
}
function updateProduct(product_id) {
    $("#productForm").submit(function(event) {
      event.preventDefault();
    });
    var productData2 = {};
    var formData = $("#productForm").serializeArray();
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
                document.getElementById("productForm").reset();
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