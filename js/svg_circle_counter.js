;(function($){

    var circle = {
        init:function(){
            this.AnimationFn();
        },
        AnimationFn:function(){
            var circle = $('.circle');
            var number = $('.number');
            var totLen = [];
            var second = 3;
            var per = [.75, .9, .8, .7];
            var perLen = []; //퍼센트의 길이
            var piece = []; //초당 길이 마디
            var cnt = [0,0,0,0];
            var setId = [];
                $.each(circle, function(idx,obj){
                    totLen[idx] = Math.ceil(obj.getTotalLength());

                    //초기값
                    obj.style.strokeDasharray = totLen[idx];
                    obj.style.strokeDashoffset = totLen[idx];

                    // console.log(totLen[idx]);

                    perLen[idx] = totLen[idx] * per[idx];
                    // console.log(idx+1, '퍼센트별 길이', perLen[idx]);
                    
                    piece[idx] = (perLen[idx]/second)/100; // 0.01초 에 한마디
                    // console.log(piece[idx]);

                    setId[idx] = setInterval(countFn, 10);
                    function countFn(){
                        cnt[idx] += piece[idx];
                        // console.log(cnt[idx]);
                        if( cnt[idx] > perLen[idx] ){ 
                            clearInterval(setId[idx]);
                        }
                        else{
                            $(obj).css({ strokeDashoffset: totLen[idx]-cnt[idx] }); //원형 라인이 그려진다.
                            number.eq(idx).text( Math.ceil(cnt[idx]/totLen[idx]*100) + '%' ); //숫자가입력된다.
                        }
                    }
                });


        }
    }
    circle.init();

})(jQuery);