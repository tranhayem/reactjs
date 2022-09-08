var productList = [];
function renderProductList() {
    document.getElementById("tableBody").innerHTML = "",
        productList.forEach(product => {
            document.getElementById("tableBody").innerHTML += `
        <tr>
            <th scope="col"></th>
            <th scope="col">${product.name}</th>
            <th scope="col">${product.price}</th>
            <th scope="col">${product.unit}</th>
            <th scope="col">
                <button type="button" class="btn btn-primary">
                    <i class="bi bi-search"></i>
                </button>
                <button type="button" class="btn btn-primary" onclick = "editProduct(${product.id})">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                <button type="button" class="btn btn-danger" onclick = "deleteProduct(${product.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </th>
        </tr>
        `
        });
}

function FindMaxId() {
    var max = 0;
    productList.forEach(element => {
        if (element.id > max)
            max = element.id;
    });
    return max;
}

function editProduct(id) {
    // tìm phần tử bằng id, lấy được index
    var index = productList.findIndex(function (element) {
        return element.id == id;
    });
    // đổ thông tin của phần từ vừa tìm được ra form
    var product = productList[index];
    $("#productId").val() = productList[index].id;
    $("#productName").val() = productList[index].name;
    $("#productCode").val() = productList[index].code;
    $("#productUnit").val() = productList[index].unit;
    $("#productPrice").val() = productList[index].price;
    $("#productImportDate").val() = productList[index].importDate;
    var checkBoxes = document.querySelectorAll('input[name-pro]')
    renderProductList()
}

function deleteProduct(id) {
    //PHẦN NÀY ĐÚNG
    // tìm phần tử bằng id, lấy được index
    // dùng hàm splice để xóa
    // hiển thị lại danh sách
    var check = confirm('ban co muon xoa')
    if (check) {
        // 1. tim phan tu can xoa
        var index = productList.findIndex(function (element) {
            return element.id == id;
        })
        // 2. xoa phan tu ra khoi mang
        if (index > -1)
            productList.splice(index, 1);
        // 3. update lai bang
        renderProductList();
    }
}

function validateForm() {
    var isValide = true;
    var product = {
        name : document.getElementById('productName').value,
        code : document.getElementById('productCode').value,
    }
    // validate
    if (product.name.length > 20) {
        document.getElementById("validateForm").innerHTML = "Ten san pham khong vuot qua 20 ky tu"
        document.getElementById("validateForm").style.display = "block";
        isValide = false;
    }
    var index = productList.findIndex(function(element){
        return element.name == product.name;
    });
    if(index != -1) {
        document.getElementById("validateForm").innerHTML = "Ten san pham bi trung"
        document.getElementById("validateForm").style.display = "block";
        isValide = false;
    }
    return isValide;
}

function saveProduct() {
    if(!validateForm())
    return;
    var productType = []
    var checkBoxes = document.querySelectorAll('input[name=productType]:checked');
    checkBoxes.forEach(element => {
        productType.push(element.value);
    })
    var id = document.getElementById("productId").value
    if (id === '') {
        var id = FindMaxId() + 1;
        var newProduct = {
            id: id,
            name: document.getElementById("productName").value,
            code: document.getElementById("productCode").value,
            unit: document.getElementById("productUnit").value,
            price: document.getElementById("productPrice").value,
            importDate: document.getElementById("productImportDate").value
        };
    productList.push(newProduct);
    } else {
        var index = productList.findIndex(function(element){
            return element.id == id;
        })
        productList[index].name = document.getElementById("productName").value,
        productList[index].code = document.getElementById("productCode").value,
        productList[index].unit = document.getElementById("productUnit").value,
        productList[index].price = document.getElementById("productPrice").value,
        productList[index].importDate = document.getElementById("productImportDate").value
    }
    // cách 1: var id = productList.length === 0 ? 1 : 0;
    // cách 2: var id = FindMaxId() + 1;
    // th1: thêm mới sản phẩm
    // kiểm tra xem mảng có phần tử hay không
    // lấy phần tử có id lớn nhất
    // lấy id của phần tử đó +1
    renderProductList();

}
