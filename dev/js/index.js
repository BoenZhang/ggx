var quesType = -1,
    quesArr = [
        {
            num: '2、',
            content: '当你喜欢上一个人，你会怎么做？',
            answer1: 'A大胆去表白，攻坚克难，一定会成功的',
            answer2: 'B慢慢相处、肯定会水到渠成的',
            answer3: 'C凭本事暗恋，谁也别想鼓动我表白'
        },
        {
            num: '3、',
            content: '生活经常起起落落落落······你通常会怎么办？',
            answer1: 'A勇敢面对，什么事都打不垮我几顿重的心',
            answer2: 'B撒娇卖萌请朋友开导',
            answer3: 'C佛系人生，走一步算一步，无需烦恼'
        },
        {
            num: '4、',
            content: '参加朋友的婚礼，如何穿搭才能艳压群芳还不失礼节？',
            answer1: 'A天天这么忙，哪有时间打扮，随便穿',
            answer2: 'B听别人的建议，主见是个什么东西？',
            answer3: 'C穿当季最流行的衣服，搭配精致妆容'
        },
    ],
    score = 0,
    // score = 50,
    canSelect = true,
    screenCount = 4,
    $musicbg = $('#musicbg'),
    $musicIcon = $('.music-icon'),
    sex,
    scoreType,
    picMap = {
        girl: {
            a: ['wa', 'wwa'],
            b: ['wb', 'wwb'],
            c: ['wc', 'wwc'],
            d: ['wd', 'wwd'],
            e: ['we', 'wwe'],
        },
        boy: {
            a: ['ma', 'mma'],
            b: ['mb', 'mmb'],
            c: ['mc', 'mmc'],
            d: ['md', 'mmd'],
            e: ['me', 'mme'],
        }
    };

function loadStepThree() {
    var picArr = ["../img/screen-three/bg.png", "../img/screen-three/bg-up.png", "../img/screen-three/generate-btn.png",
        "../img/screen-three/score.png", "../img/screen-three/score-bg.png", "../img/screen-three/score-mask.png", "../img/screen-three/wave.png",
        "../img/answer/answer-btn1.png", "../img/answer/answer-btn2.png", "../img/answer/answer-btn3.png"];

    for (var i = 1; i < 10; i++) {
        picArr.push("../img/fruits/fruit" + i + ".png")
    }

    loadImagesNormal(picArr);
}

function loadStepFour() {
    var picArr = [
        "../img/screen-four/rotate.png"
    ];

    for (var i = 0; i < 34; i++) {
        picArr.push("../img/canvas/" + i + ".jpg")
    }

    loadImagesNormal(picArr);
}


function init() {
    FastClick.attach(document.body);
    var screenScale = screenResize();
    window.onresize = screenResize;

    //init music
    document.addEventListener("WeixinJSBridgeReady", function () {
        $musicbg.get(0).play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function () {
        $musicbg.get(0).play();
    }, false);

    $musicIcon.click(function (e) {
        if (e.target.className.indexOf('music-animation') > -1) {
            $musicIcon.attr("class", "music-icon")
            $musicbg.get(0).pause();
        } else {
            $musicIcon.attr("class", "music-icon music-animation");
            $musicbg.get(0).play();
        }
    })

    // init pageSlider
    var pageSlider = new WxMoment.PageSlider({
        pages: $('.screen')
    });

    // pageSlider.moveTo(2)

    // hide loading mask
    var $loadingMask = $('#loadingMask');
    $loadingMask.css("display", "none");

    $musicIcon.css("display", "block");
    $musicIcon.attr("class", "music-icon music-animation")
    $musicbg.get(0).play();

    // screen two
    var $sc2_boy_btn = $('.screen2__boy'),
        $sc2_girl_btn = $('.screen2__girl'),
        $screen3_bg = $('.screen3-bg');

    $sc2_boy_btn.click(function (e) {
        sex = 'boy';
        pageSlider.next();
        $screen3_bg.attr("class", "screen3-bg screen3-fruit");
        loadStepThree();
    })

    $sc2_girl_btn.click(function (e) {
        sex = 'girl';
        pageSlider.next();
        $screen3_bg.attr("class", "screen3-bg screen3-fruit");
        loadStepThree();
    })


    //screen three
    var $screenFive = $('.screen5-bg'),
        $screen5ShareBg = $('.screen5-share-bg'),
        $answer = $('.answer'),
        $answerNum = $('.question .num'),
        $answerCont = $('.question .contq'),
        $answer1 = $('.answer1'),
        $answer2 = $('.answer2'),
        $answer3 = $('.answer3'),
        $wave = $('.screen3-wave'),
        $waveUp = $('.screen3-wave-up'),
        $score = $('.score'),
        $f1 = $('.f1'),
        $f2 = $('.f2'),
        $f3 = $('.f3'),
        $f4 = $('.f4'),
        $f5 = $('.f5'),
        $f6 = $('.f6'),
        $f7 = $('.f7'),
        $f8 = $('.f8'),
        $f9 = $('.f9'),
        $geneBtn = $('.gene-btn'),
        process = 0;
    console.log(document.body.clientHeight)

    $wave.css("bottom", '-' + Math.ceil((document.body.clientHeight / screenCount - 1008 * screenScale) / 2 / screenScale) + 'px');
    $waveUp.css("bottom", '-' + Math.ceil((document.body.clientHeight / screenCount - 1008 * screenScale) / 2 / screenScale) + 'px');

    $answer.click(function (e) {
        if (e && e.target && e.target.dataset && e.target.dataset.answer && canSelect) {

            var answer = e.target.dataset.answer;

            canSelect = false;

            if (quesType == -1) {
                $f1.css("transform", "translate(300px, 58px) translate3d(0, 0, 0)");
                $f2.css("transform", "translate(160px, 88px) translate3d(0, 0, 0)");

                $f3.css("bottom", '-' + Math.ceil((document.body.clientHeight / screenCount - 1008 * screenScale) / 2 / screenScale) + 'px');
                $f3.css("display", "block");

                if (answer == '1') {
                    score += 5;
                }
                else if (answer == '2') {
                    score += 25;
                } else {
                    score += 10;
                }

                loadStepFour();
            }

            if (quesType == 0) {
                $f4.css("transform", "translate(530px, 28px) translate3d(0, 0, 0)");

                if (answer == '1') {
                    score += 25;
                }
                else if (answer == '2') {
                    score += 5;
                } else {
                    score += 10;
                }
            }

            if (quesType == 1) {
                $f7.css("transform", "translate(480px, 138px) translate3d(0, 0, 0)");
                $f8.css("bottom", '-' + Math.ceil((document.body.clientHeight / screenCount - 1008 * screenScale) / 2 / screenScale) + 'px');
                $f8.css("display", "block");
                $f9.css("bottom", '-' + Math.ceil((document.body.clientHeight / screenCount - 1008 * screenScale) / 2 / screenScale) + 'px');
                $f9.css("display", "block");

                if (answer == '1') {
                    score += 25;
                }
                else if (answer == '2') {
                    score += 10;
                } else {
                    score += 5;
                }
            }

            if (quesType == 2) {
                $f5.css("transform", "translate(30px, 168px) translate3d(0, 0, 0)");
                $f6.css("bottom", '-' + Math.ceil((document.body.clientHeight / screenCount - 1008 * screenScale) / 2 / screenScale) + 'px');
                $f6.css("display", "block");

                if (answer == '1') {
                    score += 5;
                }
                else if (answer == '2') {
                    score += 10;
                } else {
                    score += 25;
                }
            }

            process += 25;

            $score.css("width", process * 566 / 100 + 'px');

            setTimeout(function () {
                canSelect = true;
                quesType += 1;

                if (quesType != 3) {
                    $answerNum.html(quesArr[quesType].num);
                    $answerCont.html(quesArr[quesType].content);
                    $answer1.html(quesArr[quesType].answer1);
                    $answer2.html(quesArr[quesType].answer2);
                    $answer3.html(quesArr[quesType].answer3);
                } else {
                    $geneBtn.css("display", "block");

                    if (score == 100) {
                        scoreType = 'a';
                    }
                    else if (score >= 80 && score <= 95) {
                        scoreType = 'b';
                    }
                    else if (score >= 60 && score <= 75) {
                        scoreType = 'c';
                    }
                    else if (score >= 40 && score <= 55) {
                        scoreType = 'd';
                    } else {
                        scoreType = 'e';
                    }

                    loadImagesNormal([
                        "../img/screen-five/" + picMap[sex][scoreType][0] + ".png", "../img/screen-five/" + picMap[sex][scoreType][1] + ".jpg",
                        "../img/screen-five/bg.png", "../img/screen-five/jd-btn.png", "../img/screen-five/share-btn.png", "../img/screen-five/share-font.png"
                    ]);

                    $screenFive.css("background", 'url("../img/screen-five/' + picMap[sex][scoreType][0] + '.png") 0 30px no-repeat');

                    $screen5ShareBg.attr("src", "../img/screen-five/" + picMap[sex][scoreType][1] + ".jpg");
                }
            }, 200)
        }
    })

    $geneBtn.click(function (e) {
        pageSlider.next();
    })

    // screen four
    var canvasElement = document.getElementById('canvas'),
        $rotate = $('.rotate'),
        $canvasMask = $('.canvas-mask'),
        ctx = canvasElement.getContext('2d'),
        $screen4 = $('.screen4'),
        $screen5 = $('.screen5'),
        img = new Image(),
        imgIndex = 0,
        count = 0,
        touchstart,
        startTime,
        startTime1,
        speed = 30,
        toTop = 0,
        toRight = 0,
        toDown = 0;

    img.src = "../img/canvas/" + imgIndex + ".jpg";
    img.onload = function () {
        ctx.clearRect(0, 0, 640, 1080);
        ctx.drawImage(img, 0, 0, 640, 1080);
    }

    function run() {
        count += 1;

        if (imgIndex == 33) {
            setTimeout(function () {
                $screen4.css("opacity", ".2");
            }, 200)
            setTimeout(function () {
                // pageSlider.next();
                pageSlider.moveTo(3, true)
                $screen5.css("opacity", "1");
            }, 1700)
            return
        }

        if (Math.floor(count / speed) != imgIndex) {
            startTime = new Date();

            imgIndex += 1;
            img.src = "../img/canvas/" + imgIndex + ".jpg";
            img.onload = function () {
                ctx.clearRect(0, 0, 640, 1080);
                ctx.drawImage(img, 0, 0, 640, 1080);
            }
        }
        requestAnimationFrame(run);
    }

    $canvasMask.on('touchstart', function (e) {
        touchstart = e.touches[0]
        startTime1 = new Date();
    })

    $canvasMask.on('touchmove', function (e) {
        if (Math.abs(e.touches[0].pageX - touchstart.pageX) > 80 && Math.abs(e.touches[0].pageY - touchstart.pageY) < 10) {
            console.log('1')
            toRight = 1;
        }
        else if (Math.abs(e.touches[0].pageX - touchstart.pageX) > 40 && e.touches[0].pageY - touchstart.pageY > 40) {
            console.log('2')
            toTop = 1;
        }
        else if (Math.abs(e.touches[0].pageX - touchstart.pageX > 40) && e.touches[0].pageY - touchstart.pageY < -40) {
            console.log('3')
            toDown = 1;
        }

        if ((toTop + toDown + toRight) > 1) {
            if (new Date() - startTime1 < 300) {
                speed = 28
            }else {
                speed = 30
            }
            $rotate.css("display", "none");
            $canvasMask.css("display", "none");
            setTimeout(function () {
                startTime = new Date();
                run();
            }, 600)
        }
    })

    // screen five
    var $shareBtn = $('.share-btn'),
        $shareFont = $('.screen5-font');

    $shareBtn.click(function () {
        $screen5ShareBg.css('z-index', '2');
        $shareFont.css('z-index', '3');
        $musicIcon.css("display", "none");
    })

    $screen5ShareBg.on('touchstart', function () {
        $shareFont.css('z-index', '-3');
    })

    $screen5ShareBg.on('touchend', function () {
        $shareFont.css('z-index', '3');
    })

    loadImagesNormal([]);
}


loadImages(["../img/screen-two/bg.png", "../img/screen-two/bg-up.png", "../img/screen-two/hands.png", "../img/screen-two/music-icon.png"]);
