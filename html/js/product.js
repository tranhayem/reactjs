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

function editProduct(id) {
    // tìm phần tử bằng id, lấy được index
    // đổ thông tin của phần từ vừa tìm được ra form
    // 
}

function deleteProduct(id) {
    // tìm phần tử bằng id, lấy được index
    // dùng hàm splice để xóa
    // hiển thị lại danh sách
    renderProductList()
}
function saveProduct() {
    // kiểm tra xem mảng có phần tử hay không
    // lấy phần tử có id lớn nhất
    // lấy id của phần tử đó +1
    var newProduct = {
        id : 0,
        name: document.getElementById("productName").value,
        code: document.getElementById("productCode").value,
        unit: document.getElementById("productUnit").value,
        price: document.getElementById("productPrice").value,
    };
    productList.push(newProduct);
    renderProductList();
}
