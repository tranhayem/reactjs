var productList = [];

// ajax là tạo ra http request

$(document).ready(function () {
    // lần đầu tiên load trang sẽ gọi đến hàm này
    getProductList();
});

function getProductList() {
    $.ajax(
        {
            // API là phương thức kết nối giữa các thư viện và ứng dụng khác nhau
            url: "http://localhost:8081/product", // đường dẫn đến API
            type: "GET", // kiểu của API
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                console.log(response);
                renderTableElement(response);
            },
            error: function (error) {
                alert(error);
            }
        }
    );
}

function renderProductList(data) {
    $("#tableBody").html(""),
        data.forEach(product => {
            $("#tableBody").append(`
        <tr>
            <th scope="col"></th>
            <th scope="col">${product.name}</th>
            <th scope="col">${product.price}</th>
            <th scope="col">${product.unit}</th>
            <th scope="col">
                <button type="button" class="btn btn-primary"><i class="bi bi-search"></i></button>
                <button type="button" class="btn btn-primary" onclick = "editProduct(${product.id})"><i class="bi bi-pencil-square"></i></button>
                <button type="button" class="btn btn-danger" onclick = "deleteProduct(${product.id})"><i class="bi bi-trash"></i></button>
            </th>
        </tr>
        `)
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
    $.ajax(
        {
            // API là phương thức kết nối giữa các thư viện và ứng dụng khác nhau
            url: `http://localhost:8081/product/${id}`, // đường dẫn đến API
            // với type GET có thể truyền thêm tham số vào url
            // vd: url: `http://localhost:8081/product/${id}&name=abc`
            type: "GET", // kiểu của API
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                // đổ thông tin của phần tử vừa tìm được ra form
                $("#productId").val(product.id);
                $("#productName").val(product.name);
                $("#productCode").val(product.code);
                $("#productUnit").val(product.unit);
                $("#productPrice").val(product.price);
                $("#productImportDate").val(product.importDate);
                var checkBoxes = document.querySelectorAll('input[name=productType]');
                checkBoxes.forEach(element => {
                    if (product.type.includes(parseInt(element.value)))
                        element.checked = true;
                    else
                        element.checked = false;
                });
            },
            error: function (error) {
                alert(error);
            }
        }
    );
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
    // tìm phần tử bằng id, lấy được index
    // dùng hàm splice để xóa
    // hiển thị lại danh sách
    var check = confirm('ban co muon xoa')
    if (check) {
        $.ajax(
            {
                // API là phương thức kết nối giữa các thư viện và ứng dụng khác nhau
                url: `http://localhost:8081/product/${id}`, // đường dẫn đến API
                type: "DELETE", // kiểu của API
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    getProductList();
                },
                error: function (error) {
                    alert(error);
                }
            }
        );
    }
}

function validateForm() {
    var isValide = true;
    var product = {
        name: $('productName').val(),
        code: $('productCode').val(),
    }
    // validate
    if (product.name.length > 20) {
        $("validateForm").html("Ten san pham khong vuot qua 20 ky tu")
        $("validateForm").style.display = "block";
        isValide = false;
    }
    var index = productList.findIndex(function (element) {
        return element.name == product.name;
    });
    if (index != -1) {
        $("validateForm").html("Ten san pham bi trung")
        $("validateForm").style.display = "block";
        isValide = false;
    }
    return isValide;
}

function saveProduct() {
    if (!validateForm())
        return;
    var productType = []
    var checkBoxes = document.querySelectorAll('input[name=productType]:checked');
    checkBoxes.forEach(element => {
        productType.push(element.value);
    });
    var id = $("productId").val();
    var newProduct = {
        id: id,
        name: $("#productName").val(),
        code: $("#productCode").val(),
        unit: $("#productUnit").val(),
        price: $("#productPrice").val(),
        importDate: $("#productImportDate").val(),
        productType : productType,
    };
    if (id === '') {
        $.ajax(
            {
                // API là phương thức kết nối giữa các thư viện và ứng dụng khác nhau
                url: `http://localhost:8081/product/`, // đường dẫn đến API
                type: "POST", // kiểu của API
                data: JSON.stringify(newProduct), // che giấu thông tin
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    getProductList();
                },
                error: function (error) {
                    alert(error);
                }
            }
        );
    } else {
        $.ajax(
            {
                // API là phương thức kết nối giữa các thư viện và ứng dụng khác nhau
                url: `http://localhost:8081/product/`, // đường dẫn đến API
                type: "POST", // kiểu của API
                data: JSON.stringify(newProduct),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    getProductList();
                },
                error: function (error) {
                    alert(error);
                }
            }
        );
        productList[index].name = $("productName").val(),
            productList[index].code = $("productCode").val(),
            productList[index].unit = $("productUnit").val(),
            productList[index].price = $("productPrice").val(),
            productList[index].importDate = $("productImportDate").val()
    }
    // cách 1: var id = productList.length === 0 ? 1 : 0;
    // cách 2: var id = FindMaxId() + 1;
    // th1: thêm mới sản phẩm
    // kiểm tra xem mảng có phần tử hay không
    // lấy phần tử có id lớn nhất
    // lấy id của phần tử đó +1
    renderProductList();
}
