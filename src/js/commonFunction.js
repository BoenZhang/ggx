function loadImages(imgList){
    var process = 0;

    if (imgList.length == 0) {
        init();
        return
    }

    for(var i=0;i<imgList.length;i++){
        var image = new Image();

        image.onload = function (){
            process ++;
            document.getElementById('isload').innerHTML = Math.floor(process/imgList.length*100);
            if(process==imgList.length){
                init();
            }
        }
        image.src = imgList[i];
    }

}

function loadImagesNormal(imgList){
    var process = 0;
    for(var i=0;i<imgList.length;i++){
        var image = new Image();

        image.src = imgList[i];
    }

}

function screenResize() {
    window.scrollTo(0, 0);

    //标准屏幕尺寸
    var phoneWidth = 640;
    var phoneHeight = 1008;

    var screen2Bg = document.getElementsByClassName('screen2-bg'),
        screen2BgDown = document.getElementsByClassName('screen2-bg-down'),
        screen3Bg = document.getElementsByClassName('screen3-bg'),
        screen3BgDown = document.getElementsByClassName('screen3-bg-down'),
        screen4Bg = document.getElementsByClassName('screen4-bg'),
        screen5Bg = document.getElementsByClassName('screen5-bg'),
        screen5BgDown = document.getElementsByClassName('screen5-bg-down'),
        shareBg = document.getElementsByClassName('screen5-share-bg'),
        canvas = document.getElementById('canvas'),
        canvasMask = document.getElementsByClassName('canvas-mask');

    var w = document.body.clientWidth;
    var h = document.documentElement.clientHeight;
    var v = phoneWidth/phoneHeight;
    var scale = w/h>v?(h/phoneHeight):(w/phoneWidth);
    var scaleY = h/phoneHeight, scaleY2 = h / 1080;

    for(var i=0;i<screen2Bg.length;i++){
        screen2Bg[i].style.transform = 'scale('+scale+')';
        screen2Bg[i].style.WebkitTransform = 'scale('+scale+')';
        screen2BgDown[i].style.transform = 'scale('+scale + ',' + scaleY +')';
        screen2BgDown[i].style.WebkitTransform = 'scale('+scale + ',' + scaleY +')';

        screen3Bg[i].style.transform = 'scale('+scale+')';
        screen3Bg[i].style.WebkitTransform = 'scale('+scale+')';
        screen3BgDown[i].style.transform = 'scale('+scale + ',' + scaleY +')';
        screen3BgDown[i].style.WebkitTransform = 'scale('+scale + ',' + scaleY +')';

        screen4Bg[i].style.transform = 'scale('+scale+')';
        screen4Bg[i].style.WebkitTransform = 'scale('+scale+')';

        screen5Bg[i].style.transform = 'scale('+scale+')';
        screen5Bg[i].style.WebkitTransform = 'scale('+scale+')';
        screen5BgDown[i].style.transform = 'scale('+scale + ',' + scaleY +')';
        screen5BgDown[i].style.WebkitTransform = 'scale('+scale + ',' + scaleY +')';

        canvasMask[i].style.transform = 'scale('+scale + ',' + scaleY +')';
        canvasMask[i].style.WebkitTransform = 'scale('+scale + ',' + scaleY +')';

        shareBg[i].style.transform = 'scale('+scale + ',' + scaleY +')';
        shareBg[i].style.WebkitTransform = 'scale('+scale + ',' + scaleY +')';
    }

    if (scale > 0.61) {
        $('.screen3-header').css("top", "0")
    }

    canvas.style.transform = 'scale('+scale + ',' + scaleY2 +')';
    canvas.style.WebkitTransform = 'scale('+scale + ',' + scaleY2 +')';

    return scale;
}