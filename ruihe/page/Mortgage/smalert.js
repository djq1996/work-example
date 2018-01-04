
//alert 
function smalert(con, bj) {
    if (bj) {
        $('<div class="smalert">' + con + '</div>').appendTo($("body"))
        setTimeout(function () {
            $(".smalert").remove();
        }, 1500)
    } else {
        $('<div class="alertChoice">' + con + '</div>').appendTo($("body"))
        setTimeout(function () {
            $(".alertChoice").remove();
        }, 1500)
    }
}

// url 结束弹窗手跳到指定的页面
function smalertCopy(con, bj, url) {
    if (bj) {
        $('<div class="smalert">' + con + '</div>').appendTo($("body"))
        setTimeout(function () {
            $(".smalert").remove();
            window.location.href = url;
        }, 1500)
    } else {
        $('<div class="alertChoice">' + con + '</div>').appendTo($("body"))
        setTimeout(function () {
            $(".alertChoice").remove();
            window.location.href = url;
        }, 1500)
    }
}