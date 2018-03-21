/* 折线图组件对象 */

var H5ComponentRadar = function( name,cfg ){
    var component = new H5ComponentBase(name,cfg);

    //绘制网格线 - 背景层
    var w = cfg.width;
    var h = cfg.height;

    //加入一个画布（用于做网格线的背景）

    var canvas = document.createElement('canvas');
    var ctx   = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h;
    component.append(canvas);

    var r = w/2;
    var step = cfg.data.length;


    // ctx.beginPath();
    // ctx.arc(x,y,5,0,2*Math.PI);
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.arc(r,r,r,0,2*Math.PI);
    // ctx.stroke();

    // 计算一个圆周上的坐标（计算多边形的顶点坐标）
    //rad = (2 * Math.PI/360) * (360/边数(step)) * i
    //x = a + Math.sin(rad) * r
    //y = b + Math.cos(rad) * r

    //绘制网格背景（分面绘制，分为十份）
    var isBlue = false;
    for (var s = 10; s > 0; s--) {

        ctx.beginPath();
        for (i = 0; i <step; i++) {
            var rad = (2 * Math.PI/360) * (360/step) * i;
            var x = r + Math.sin(rad) * r * (s/10);
            var y = r + Math.cos(rad) * r * (s/10);
            ctx.lineTo(x,y);

        }
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff':'#f1f9ff';  //与页面的onLoad和onLeave处理方法一致
        ctx.fill();


    }

    //绘制伞骨

    for (i = 0; i <step; i++) {
        var rad = (2 * Math.PI/360) * (360/step) * i;
        var x = r + Math.sin(rad) * r ;
        var y = r + Math.cos(rad) * r ;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);
        //输出项目文字（因为伞骨是到头的，所以插在这里）
        var text = $('<div class="text">');
        text.text( cfg.data[i][0] );
        text.css('transition','all .5s' + i * .1 + 's' );
        component.append(text);
        // text.css('left',x/2);
        // text.css('top',y/2);
        if( x > w/2 ){
            text.css('left',x/2);
        }else{
            text.css('right',w/2-x/2+5);
        }
        if( y > h/2 ){
            text.css('top',y/2);
        }else{
            text.css('bottom',h/2-y/2+5);
        }
        if (cfg.data[i][2] ){
            text.css('color',cfg.data[i][2]);
        }

    }
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();


    //数据层的开发

    //加入一个画布（数据层）

    var canvas = document.createElement('canvas');
    var ctx   = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h;
    component.append(canvas);

    ctx.strokeStyle = '#f00';
    var draw = function( per ){

    if( per >= 1){
        component.find('.text').css('opacity',1);
    }
    if( per <= 1){
        component.find('.text').css('opacity',0);
    }

        ctx.clearRect(0,0,w,h);
    //输出数据的折线
        for (i = 0; i <step; i++) {
            var rate = cfg.data[i][1] * per;
            var rad = (2 * Math.PI/360) * (360/step) * i;
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;
            ctx.lineTo(x,y);
            
        }
        ctx.closePath();
        ctx.stroke();
    //输出数据的点
        ctx.fillStyle = '#ff7676';
        for (i = 0; i <step; i++) {
            var rate = cfg.data[i][1] * per;
            var rad = (2 * Math.PI/360) * (360/step) * i;
            var x = r + Math.sin(rad) * r * rate;
            var y = r + Math.cos(rad) * r * rate;

            ctx.beginPath();
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
        
        ctx.stroke();
    }
    draw(0.5);

        component.on('onLoad',function(){   //生长动画
            var s = 0;
            for(i =0;i<100;i++){
                setTimeout(function(){        //Window对象setTimeout
                    s += .01;
                    draw(s);

                },i*10)
            }
        })

        component.on('onLeave',function(){   //腿长动画
            var s = 1;
            for(i =0;i<100;i++){
                setTimeout(function(){        //Window对象setTimeout
                    s -= .01;
                    draw(s);
                },i*10)
            }
        })

    return component;


}