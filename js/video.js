;(function($){

    var obj = {
        init:function(){
            this.videoFn();
            this.videoControlFn();
        },
        videoFn:function(){
            var winW = 0;
            var winH = 0;
            var vidW = 0;
            var vidH = 0;
            var $mainVideo = $('#section1 .main-video');
            var $section1 = $('#section1');

            function resizeFn(){
                winW = $(window).innerWidth();
                winH = $(window).innerHeight();
                vidW = $mainVideo.innerWidth();
                vidH = $mainVideo.innerHeight();
                marT = (winH-vidH)/2; //(969-1080)/2 = -5.5
                marL = (winW-vidW)/2; //(1903-1920)/2 = -8.5

                $section1.css({ width:winW, height:winH });

                //창너비가 비디오 너비보다 크면 
                if( winW > vidW ){
                    $mainVideo.css({ width:winW, height:'auto' });
                }

                //창높이가 비디오 높이보다 크면
                if( winH > vidH ){
                    $mainVideo.css({ width:'auto', height: winH });
                }

                $mainVideo.css({ marginTop: marT, marginLeft: marL});
            }

            setTimeout(resizeFn, 100);

            $(window).resize(function(){
                setTimeout(resizeFn, 100);
            });
        },
        videoControlFn:function(){
            //비디오 콘트롤 재성 정지 사운드 켜기 끄기
            var $mainVideo = $('.main-video');
            var $controlBox = $('.control-box');
            var $button = $('.control-box a');
            var $volumeBox = $('.volume-box');
            var $i = $('.volume-box > a > i')
            var t = 0;
            var t2 = 0;
            var x = 0;

                $mainVideo.get(0).autoplay = true; //자동재생 true
                $mainVideo.get(0).muted    = true; //사운드 꺼짐 true
                $mainVideo.get(0).loop     = true; //반복재성 true
                $mainVideo.get(0).currentTime = 0; //재생 시점위치를 지정
                x = Number(xspeed_form.xspeed.value); // 폼 셀렉트 옵션 값
                $mainVideo.get(0).playbackRate = x; // 1 배속

                $button.on({
                    click:function(){                  
                        if(t == 0){
                            t = 1;
                            $controlBox.addClass('addPlay');
                            $mainVideo.get(0).pause();
                        }
                        else{
                            t = 0;
                            $controlBox.removeClass('addPlay');
                            $mainVideo.get(0).play();
                        }


                    }
                });

                $volumeBox.on({
                    click:function(){
                        if( t2 == 0 ){
                            t2 = 1;
                            $mainVideo.get(0).muted = false; //사운드 켜짐 false
                            $i.attr('class', 'fas fa-volume-up');
                        }
                        else{
                            t2 = 0;
                            $mainVideo.get(0).muted = true; //사운드 꺼짐 true
                            $i.attr('class', 'fas fa-volume-mute');

                        }
                    }
                });

                //리 플레이 다시시작
                $('.replay-btn').on({
                    click:function(){
                        $mainVideo.get(0).currentTime = 0;
                        $mainVideo.get(0).play();
                        $controlBox.removeClass('addPlay');
                        t = 0; // 초기화
                    }
                });

                //배속 0.75 / 1.25 / 1.5 / 2
                $('#xspeed').on({
                    change:function(){                        
                            x = Number(xspeed_form.xspeed.value);
                            //배속 지정
                            $mainVideo.get(0).playbackRate = x; //재생 시간 조절 0.75 1 1.25 .... 2
                    }
                });
        }
    };

    obj.init();

})(jQuery);