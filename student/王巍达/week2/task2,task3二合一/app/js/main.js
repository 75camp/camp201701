import '../css/reset.css';
import '../css/index.less';
import $ from 'n-zepto';
import './touch';
import './transform';

'use strict';

$(function () {

    //暂留--------------------------------------------------

    let url = require('../images/detail1.png'),
        $img = $('#detail img');

    $img.attr('src', url);

    //基本信息
    url = require('../images/information.png');
    $('.information').attr('src', url);
    //学前
    url = require('../images/before-study.jpg');
    $('.before-study').attr('src', url);
    //学后
    url = require('../images/after-study.png');
    $('.after-study').attr('src', url);
    //项目经验
    url = require('../images/love-this-project.png');
    $('.love-this-project').attr('src', url);
    //项目踩坑
    url = require('../images/review.png');
    $('.review').attr('src', url);
    url = require('../images/oh-no.png');
    $('.oh-no').attr('src', url);
    //项目描述
    url = require('../images/project-describe.png');
    $('.project-describe').attr('src', url);

    //暂留--------------------------------------------------



    window.addEventListener('touchstart', function (event) {
        event.preventDefault();
    }, false);


    let gameBoyPromise = function (selector, type) {
        return new Promise((resolve) => $(selector).on(type, resolve));
    };
    //前置动画
    (function () {

        //插卡
        gameBoyPromise('#game-card-box', 'swipeDown')
        //卡向下走
            .then(
                () => gameBoyPromise($('#game-card').addClass('to-bot').selector, 'transitionend')
            )
            //插卡提示动画消失
            .then(
                () => gameBoyPromise($('#insert-card').removeClass('flash infinite').addClass('fadeOut').selector, 'webkitAnimationEnd animationend')
            )
            .then(
                () => {
                    //水花蹦出
                    $('#water').addClass('to-top');
                    return gameBoyPromise('#water', 'transitionend');
                }
            )
            //水花蹦出后足球蹦出
            .then(
                () => gameBoyPromise($('.football').addClass('to-top').selector, 'transitionend')
            )
            //然后排球蹦出
            .then(
                () => gameBoyPromise($('.volleyball').addClass('to-top').selector, 'transitionend')
            )
            //然后网球蹦出
            .then(
                () => gameBoyPromise($('.tennis').addClass('to-top').selector, 'transitionend')
            )
            //哔！！！还有对话线,雪花，屏幕闪烁
            .then(
                () => {
                    $('#gb-solid').removeClass('solid-flash').addClass('talk-solid-flash');
                    $('.text').css('opacity', 1).addClass('pulse');
                    $('.gb-player-bg').addClass('fadeOut');
                    $('#xuehua').addClass('to-top');
                    $('#music-btn').addClass('fadeOut');
                    return gameBoyPromise($('#cover-area').addClass('cover-flash').selector, 'webkitAnimationEnd animationend');
                }
            )
            //进入标题，小人蹦蹦蹦！！！
            .then(
                () => {
                    $('#music-btn').hide();
                    $('#cover-area').css('zIndex', -20);
                    $('#content-gb-wrapper').addClass('fadeIn');
                    $('.person').each(function (index, ele) {
                        $(ele).addClass('person' + (index + 1));
                    });
                    return gameBoyPromise($('.title-h1').addClass('flash').selector, 'webkitAnimationEnd animationend')
                }
            )
            //进入操作指示页面
            .then(
                () => {
                    $('.person').removeClass('animated');
                    $('#a-btn').removeClass('default').addClass('active');
                    $('.guide').addClass('fadeIn');
                }
            )

    })();

    //gbPlayer对象
    let gameBoyPlayer = (function () {

        let $aBtn = $('#a-btn'),
            $bBtn = $('#b-btn'),
            $topBtn = $('#top-btn'),
            $leftBtn = $('#left-btn'),
            $rightBtn = $('#right-btn'),
            $botBtn = $('#bot-btn'),
            $content = $('#content'),
            $aContentDiv = $('#content>div[class *= "page"]'),
            $detail = $('#detail'),
            $aSection = $('#detail>section'),
            oldIndex = 0,
            nowIndex = 0,
            maxTranslateYArr = [],
            translateY = 0,
            screenHeight = $('.screen').height(),
            timer = null,
            tapSpeed = 50,
            longTapSpeed = 20;



        //暂时留下---------------------------------------------------------------------------------------------------------------------
        var $aImg = $('img');
        //封装section，maxTranslateYArr

        var state = 0;

        function testState() {
            if(state === $aImg.length) {
                $aSection.each(function (index, ele) {
                    Transform(ele, true);
                    maxTranslateYArr.push(-($(ele).height() - screenHeight));
                });
            }
        }

        $aImg.on('load', function () {
            state += 1;
            testState();
        });
        //暂时留下---------------------------------------------------------------------------------------------------------------------


        //判断btn是否可点击
        let judgeBtnCantClick = (
            function () {
                let judgeBtnClassReg = /default/;

                return function ($ele) {
                    return judgeBtnClassReg.test(($ele).attr('class'));
                }
            }
        )();

        //更改btn的状态
        function toggleBtnState(btn) {
            $.each(btn, function (index, ele) {
                if(judgeBtnCantClick($(ele))) {
                    $(ele).removeClass('default').addClass('active');
                }
                else {
                    $(ele).removeClass('active').addClass('default');
                }
            });
        }
        
        //判断内容页何时切换leftBtn与rightBtn的状态
        function judgeContentBtnState(boolean) {
            //判断leftBtn是否切换为active
            if(boolean && nowIndex === 1) {
                toggleBtnState($leftBtn);
            }
            if(!boolean && nowIndex === 0) {
                toggleBtnState($leftBtn);
            }
            //判断rightBtn
            if(boolean && nowIndex === $aContentDiv.length - 1) {
                toggleBtnState([$rightBtn, $bBtn]);
            }
            if(!boolean && nowIndex === $aContentDiv.length - 2) {
                toggleBtnState([$rightBtn, $bBtn]);
            }
        }

        //判断详情页切换topBtn与botBtn的状态
        function judgeDetailBtnState(boolean) {
            //botBtn
            if(boolean) {
                if($aSection[nowIndex].translateY <= 0 && judgeBtnCantClick($topBtn)) {
                    toggleBtnState($topBtn);
                }
                if($aSection[nowIndex].translateY <= maxTranslateYArr[nowIndex] && (!judgeBtnCantClick($botBtn))) {
                    toggleBtnState($botBtn);
                }
            }
            //topBtn
            else {
                if($aSection[nowIndex].translateY >= 0 && (!judgeBtnCantClick($topBtn))) {
                    toggleBtnState($topBtn);
                }
                if($aSection[nowIndex].translateY >= maxTranslateYArr[nowIndex] && judgeBtnCantClick($botBtn)) {
                    toggleBtnState($botBtn);
                }
            }
        }

        function animationHandle(isAContentDiv, isAnimationStart, isFadeIn, nowIndex) {
            //animationstart
            if(isAnimationStart) {
                if(isFadeIn) {
                    if(isAContentDiv) {
                        nowIndex = nowIndex - 1;
                        $aContentDiv.eq(nowIndex + 1).children('.page-children').css('opacity', 1);
                        animationFactory();
                    }
                    $aContentDiv.eq(nowIndex).children('.page-children').css('opacity', 0).removeClass('page' + (nowIndex + 1) + '-animation fly');
                    if(nowIndex === 4) {
                        $('.zoushiming').removeClass('appear');
                    }
                }
                else {
                    if(isAContentDiv) {
                        $aContentDiv.eq(nowIndex + 1).children('.page-children').css('opacity', 0).removeClass('page' + (nowIndex + 2) + '-animation');

                        if(nowIndex + 1 === 4) {
                            $('.zoushiming').removeClass('appear');
                        }
                        animationFactory();
                    }
                    $aContentDiv.eq(nowIndex).children('.page-children').css('opacity', 1);
                }
            }
            //animationend
            else {
                $aContentDiv.eq(nowIndex).children('.page-children').addClass('page' + (nowIndex + 1) + '-animation');
                if(!isAContentDiv) {
                    animationFactory();
                }
            }
        }

        //修改动画
        function editAnimation() {
            //start中移除上一页触发动画的class
            $aContentDiv.on('webkitAnimationStart animationstart', function (event) {
                //pageX触发动画开始时
                if(/page[\d] /.test($(event.target).attr('class'))) {
                    //通过判断class中是否有fadeIn判断向左或向右
                    //点击rightBtn隐藏并移除前一页animationClass（不隐藏直接移除很突兀）
                    if(/fadeIn/.test($(event.target).attr('class'))) {
                        animationHandle(true, true, true, nowIndex);
                    }
                    //点击leftBtn隐藏并移除前一页animationClass（不隐藏直接移除很突兀）
                    else {
                        animationHandle($aContentDiv, true, false, nowIndex);
                    }
                }
            });
            //end中为本页添加触发动画的class
            $aContentDiv.on('webkitAnimationEnd animationend', function (event) {
                //pageX触发动画结束时
                if(/page[\d] /.test($(event.target).attr('class'))) {
                    animationHandle(true, false, null, nowIndex)
                }
            });

            $detail.on('webkitAnimationStart animationstart', function (event) {
                if(/fadeIn/.test($(event.target).attr('class'))) {
                    animationHandle(false, true, true, nowIndex);
                }
                else {
                    animationHandle(false, true, false, nowIndex);
                }
            });

            $detail.on('webkitAnimationEnd animationend', function () {
                if(!(/fadeIn/.test($(event.target).attr('class')))) {
                    animationHandle(false, false, null, nowIndex);
                    //切换屏幕z-index
                    $detail.css('z-index', 10);
                    $content.css('z-index', 20);
                }
            })
        }

        editAnimation();

        //链式动画库
        function animationFactory() {
            //page1Animation
            if(nowIndex === 0) {
                gameBoyPromise('.page1-football', 'webkitAnimationEnd animationend')
                    .then(
                        () => $('.football-player').removeClass('page1-animation').addClass('fly')
                    );
            }
            //page5Animation
            if(nowIndex === 4) {
                gameBoyPromise('.sprite-ball', 'webkitAnimationEnd animationend')
                    .then(
                        () => $('.zoushiming').addClass('appear')
                    );
            }
        }

        //切换contentPage
        function getContentPage(boolean) {
            //true+一页，false减一页
            if(boolean) {
                nowIndex = oldIndex + 1;
            }
            else {
                nowIndex = oldIndex - 1;
            }

            judgeContentBtnState(boolean);

            //如果是rightBtn，后一页fadeIn进入
            if(boolean) {
                $aContentDiv.eq(nowIndex).removeClass('fadeOut').addClass('fadeIn');
            }
            //如果是leftBtn，
            else {
                $aContentDiv.eq(oldIndex).removeClass('fadeIn').addClass('fadeOut');
            }

            oldIndex = nowIndex;
        }

        //推进toggleBtnArr
        function pushToggleBtnArr(isAHandle, judgeBtnArr, toggleBtnArr) {
            $.each(judgeBtnArr, function (index, $ele) {
                if(!judgeBtnCantClick($ele)) {
                    toggleBtnArr.push($ele);
                }
            });
            if(!isAHandle) {
                if(nowIndex !== 0) {
                    toggleBtnArr.push($leftBtn);
                }
                if(nowIndex !== $aContentDiv.length - 1) {
                    toggleBtnArr.push($rightBtn);
                }
            }

            return toggleBtnArr;
        }



        return {
            state : 0,  //0-操作指导页面, 1-内容页, 2-详情页
            timer : timer,
            controller : {
                aBtn : $aBtn,
                bBtn : $bBtn,
                topBtn : $topBtn,
                botBtn : $botBtn,
                leftBtn : $leftBtn,
                rightBtn : $rightBtn
            },
            handle : {
                aBtnHandle : function () {
                    let toggleBtnArr = [$botBtn, $aBtn, $bBtn];

                    if(judgeBtnCantClick($aBtn)) {
                        return;
                    }
                    //第一次从操作指导页面进入详情页
                    if(this.state === 0) {
                        this.state++;

                        //切换屏幕z-index
                        $('#nav').css('z-index', 10);
                        $content.css('z-index', 20);

                        toggleBtnState($rightBtn);
                        gameBoyPromise($content.addClass('fadeIn').selector, 'webkitAnimationEnd animationend')
                            .then(
                                () => {
                                    $('.football-player').addClass('page1-animation');
                                    return gameBoyPromise($('.page1-football').addClass('page1-animation').selector, 'webkitAnimationEnd animationend')
                                }
                            )
                            .then(
                                () => $('.football-player').removeClass('page1-animation').addClass('fly')
                            );
                    }
                    //进入详情页
                    else if(this.state === 1) {

                        //切换屏幕z-index
                        $content.css('z-index', 10);
                        $detail.css('z-index', 20);

                        //分享页点击aBtn刷新
                        if(nowIndex === $aContentDiv.length - 1) {
                            window.location = window.location.href + '?' + new Date().getTime();
                        }

                        this.state++;
                        $aSection.css('opacity', 0);
                        $aSection.eq(nowIndex).css('opacity', 1);

                        $detail.removeClass('fadeOut').addClass('fadeIn');

                        //左右按钮class为不为default的加入到切换数组中
                        pushToggleBtnArr(true, [$leftBtn, $rightBtn], toggleBtnArr);

                        toggleBtnState(toggleBtnArr);
                    }

                },
                bBtnHandle : function () {
                    let toggleBtnArr = [$aBtn, $bBtn];

                    if(judgeBtnCantClick($bBtn)) {
                        return;
                    }

                    //内容页最后一页分享页，点击B弹层
                    if(this.state === 1) {
                        $('.area-share').css('z-index', 100);
                        toggleBtnState([$leftBtn, $aBtn, $bBtn]);
                    }

                    if(judgeBtnCantClick($bBtn) || this.state !== 2) {
                        return;
                    }

                    $detail.removeClass('fadeIn').addClass('fadeOut');

                    translateY = 0;
                    $aSection.css('transition', 'none');
                    $aSection.each(function (index, ele) {
                       ele.translateY = 0;
                    });

                    pushToggleBtnArr(false, [$topBtn, $botBtn], toggleBtnArr);

                    toggleBtnState(toggleBtnArr);

                    this.state--;

                },
                xDirHandle : function () {
                    //如果按钮不是可点击状态则返回
                    if(judgeBtnCantClick($(this))) {
                        return;
                    }
                    //判断点击left还是right
                    if(/right/.test($(this).attr('class'))) {
                        getContentPage(true);
                    }
                    else {
                        getContentPage(false);
                    }

                },
                yDirHandle : function (event, clickBotBtn, longTap) {
                    if(judgeBtnCantClick($(event.target))) {
                        return;
                    }
                    //长按
                    if(longTap) {
                        $aSection.eq(nowIndex).css('transition' , 'none');
                        this.timer = setInterval(function () {
                            translateY =  $aSection[nowIndex].translateY;

                            this.handle.moveHandle(clickBotBtn, longTapSpeed);
                        }.bind(this), 30);
                    }
                    //点击
                    else {
                        $aSection.eq(nowIndex).css('transition' , '.3s ease');

                        this.handle.moveHandle(clickBotBtn, tapSpeed);
                    }
                },
                moveHandle : function (clickBotBtn, speed) {
                    if(clickBotBtn) {
                        translateY -= speed;
                    }
                    else {
                        translateY += speed;
                    }

                    //控制translateY范围
                    if(translateY >= 0) {
                        translateY = 0;
                    }
                    else if(translateY <= maxTranslateYArr[nowIndex]) {
                        translateY = maxTranslateYArr[nowIndex];
                    }

                    $aSection[nowIndex].translateY = translateY;

                    judgeDetailBtnState(clickBotBtn);
                },
                toggleBtnState : toggleBtnState
            }
        };

    })();

    //aBtn，bBtn点击
    gameBoyPlayer.controller.aBtn.on('tap', gameBoyPlayer.handle.aBtnHandle.bind(gameBoyPlayer));
    gameBoyPlayer.controller.bBtn.on('tap', gameBoyPlayer.handle.bBtnHandle.bind(gameBoyPlayer));

    //x方向Btn点击
    gameBoyPlayer.controller.rightBtn.on('tap', gameBoyPlayer.handle.xDirHandle);
    gameBoyPlayer.controller.leftBtn.on('tap', gameBoyPlayer.handle.xDirHandle);

    //y方向Btn点击
    gameBoyPlayer.controller.topBtn.on('tap', () => gameBoyPlayer.handle.yDirHandle.bind(gameBoyPlayer)(event, false, false));
    gameBoyPlayer.controller.botBtn.on('tap', () => gameBoyPlayer.handle.yDirHandle.bind(gameBoyPlayer)(event, true, false));

    //y方向Btn长按
        //安卓微信很难用
    gameBoyPlayer.controller.topBtn.on('longTap', () => gameBoyPlayer.handle.yDirHandle.bind(gameBoyPlayer)(event, false, true));
    gameBoyPlayer.controller.botBtn.on('longTap', () => gameBoyPlayer.handle.yDirHandle.bind(gameBoyPlayer)(event, true, true));
    //长按后清除定时器
    gameBoyPlayer.controller.topBtn.on('touchend', function () {
        clearInterval(gameBoyPlayer.timer);
    });
    gameBoyPlayer.controller.botBtn.on('touchend', function () {
        clearInterval(gameBoyPlayer.timer);
    });

    //点击音乐
    function tapMusic() {
        let $musicBtn = $('#music-btn'),
            $musicSolid = $('.music-solid'),
            $contentMusicBtn = $('.content-music-btn');

        $musicBtn.on('tap', function () {
            $(this).toggleClass('close-music');
            $musicSolid.toggleClass('animated');

            //关闭音乐

        });

        $contentMusicBtn.on('tap', function () {
            $(this).toggleClass('close-music');

            //关闭音乐

        })
    }
    tapMusic();

    //closeShare
    let $closeShareBtn = $('.close-share-btn');
    $closeShareBtn.on('tap', () => {
        $('.area-share').css('z-index', -20);
        gameBoyPlayer.handle.toggleBtnState([gameBoyPlayer.controller.aBtn, gameBoyPlayer.controller.bBtn, gameBoyPlayer.controller.leftBtn]);
    });

});




















