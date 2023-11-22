var productData = {};
function previewImage(input) {
    var fileInput = input;
    var imagePreview = document.getElementById('imagePreview');
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            productData["product_image"]=e.target.result;
            imagePreview.src = e.target.result;
            //console.log("ruta ", e.target.result);
            
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
    return productData;
}


$(document).ready(function () {
    // Cargar la página principal al inicio
    const productService = new ProductService();
    $('#mainContainer').load('pages/main/mainPage.html'); 

    // Manejar eventos de menú
    $('#menuMain').on('click', function () {
        $('#mainContainer').load('pages/main/mainPage.html');
    });

    $('#menuNewProduct').on('click', function () {
        $('#mainContainer').load('pages/register/registerPage.html');
    });
});