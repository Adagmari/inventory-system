var productData = {};
function registerProduct() {
    $("#registerForm").submit(function(event) {
        event.preventDefault();
    });
    // Obtiene los valores del formulario
    var formData = $("#registerForm").serializeArray();
    
    formData.forEach(function (entry) {
        if(entry.name =="product_state" && entry.value=="on"){
            productData[entry.name] = 1;
            
        }else{
            productData[entry.name] = entry.value;
            productData["product_state"] = 0;
        }
        
    });
    //console.log("Datos del Producto:", productData);
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
                //console.log('Producto creado:', createdProduct);
                if(!createdProduct.error){
                    swal("Creado!", "Se ha creado el producto con el SKU: "+productData["product_SKU"], "success");
                    document.getElementById("registerForm").reset();
                    $("#submitButton").prop("disabled", true);
                }else{
                    swal("Error!", "No se pudo crear el producto: "+createdProduct["error"], "error");
                }
                
                 
            })
            .catch(error => {
                swal("Error!", "No se pudo crear el producto: "+error, "error");
            });
            
        }
      });
    
    
}

$(document).ready(function () {
    $("#registerForm input, #registerForm textarea, #registerForm select  #registerForm file").on("input change", checkForm);

    function checkForm() {
        var allFieldsFilled = true;
        $("#registerForm input, #registerForm textarea, #registerForm select  #registerForm file").each(function () {
            if ($(this).prop("required") && $(this).val().trim() === ""|| ($(this).is('input[type="file"]') && $(this).get(0).files.length === 0)) {
                allFieldsFilled = false;
                return false;
            }
        });
        $("#submitButton").prop("disabled", !allFieldsFilled);
    }
});
