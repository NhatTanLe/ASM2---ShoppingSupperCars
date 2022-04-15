document.getElementById("showcart").style.display = "none";
var arrsp = new Array();

function themvaogiohang(x){
    var nodeSP = x.parentElement.children;
    var hinh = nodeSP[0].children[0].src;
    var giasp = nodeSP[1].children[0].innerText;
    var tenSP = nodeSP[2].innerText;
    var soluong = nodeSP[3].value;
    var sp = [hinh, tenSP, giasp, soluong];
    arrsp.push(sp);
    demgiohang();
    showmycart();
}

function demgiohang(){
    var a = arrsp.length;
    document.getElementById("countsp").innerText = a;
}

function showcart(){
    var x = document.getElementById("showcart");
    if(x.style.display == "none"){
        x.style.display = "block";
    }else{
        x.style.display = "none";
    }
    showmycart();
}

function showmycart(){
    var ttgh = "";
    var tongtt = 0;
    for(let i = 0; i < arrsp.length; i++){
        var tt = Number(arrsp[i][2]) * Number(arrsp[i][3]);
        tongtt += tt;
        ttgh += `
        <tr>
            <td>${i+1}</td>
            <td><img src="${arrsp[i][0]}"></td>
            <td>${arrsp[i][1]}</td>
            <td>${arrsp[i][2]}</td>
            <td>${arrsp[i][3]}</td>
            <td>${tt} ($)</td>
        </tr>
        `
    }
    
    ttgh +=`
    <tr>
        <td colspan="5">TỔNG ĐƠN HÀNG</td>
        <td>${tongtt} ($)</td>
    </tr>
    `
    document.getElementById("mycart").innerHTML = ttgh;
}

// Hàm tính lại giá tiền sản phẩm khi thay đổi số lượng
function tinhlaidon(x) {
    var gh_str = sessionStorage.getItem("ssgiohang");
    var giohang = JSON.parse(gh_str);

    var tr = x.parentElement.parentElement;
    var dg = parseInt(tr.children[3].innerHTML);
    var sl = x.value;
    var tt = parseInt(tr.children[5].innerHTML);
    var tongdon = document.getElementById("tongtien").innerText;
    tongdon -= tt;

    var tensp = tr.children[2].innerText;
    if (sl == 0){
        dongy = confirm("Số lượng 0 sẽ xóa sản phẩm khỏi giỏ hàng. OK?");
        // Xoa trên giao diện
        if (dongy == true)
        tr.remove();
        // Xóa sản phẩm khỏi mảng
        for (let i = 0; i < giohang.length; i++){
            if (giohang[i][1] == tensp){
                giohang.splice(i, 1);
            }
        }
        var countsp = parseInt(sessionStorage.getItem("countsp") - 1);
        sessionStorage.setItem("countsp", countsp);
        showcountsp();
    }else {
        for (let i = 0; i < giohang.length; i++){
            if (giohang[i][1] == tensp){
                giohang[i][3] = sl;
            }
        }
        tt = dg * sl;
        tr.children[5].innerHTML = tt;
        tongdon += tt;
    }
    document.getElementById("tongtien").innerHTML = tongdon;
    sessionStorage.setItem("ssgiohang", JSON.stringify(giohang));
}