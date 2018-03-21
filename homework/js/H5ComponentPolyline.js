/* 折线图组件对象 */

var H5ComponentPolyline = function( name,cfg ){
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

    //水平网格线 一百份---》十份

    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#AAAAAA";
    window.ctx = ctx;
    for(var i=0;i<step+1;i++){
    var y = (h/step) *i;
        ctx.moveTo(0,y);
        ctx.lineTo(w,y)
    }
    ctx.stroke();

    //垂直网格线 一百份---》十份

    step = cfg.data.length+1;

    var text_w = w/step >> 0;//两个大于号取整数

    for(var i=0;i<step+1;i++){
    var x = (w/step) *i;
        ctx.moveTo(x,0);
        ctx.lineTo(x,h)
         if(cfg.data[i]){ 
            var text = $('<div class="text">');
            text.text(cfg.data[i][0]);
            text.css('width',text_w/2).css('left',x/2+text_w/4);
           


            component.append(text);}
    }
    ctx.stroke();


    //加入画布 - 数据层
    var canvas = document.createElement('canvas');
    var ctx   = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h;
    component.append(canvas);

    
    var draw = function( per ){
        // console.log(per);   
        ctx.clearRect(0, 0, w, h);//清空画布


    //绘制折线数据

        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ff8878";

        var x = 0;
        var y = 0;

        var row_w = (w/(cfg.data.length+1));
        //画点
        for(i in cfg.data){
            var item = cfg.data[i];
            
            x = row_w * i + row_w;
            y = h - h * item[1]* per ;
            ctx.moveTo(x,y);
            ctx.arc(x,y,5,0,2*Math.PI);
        }
        //连线
        //移动画笔到第一个数据的点位
        //ctx.moveTo( row_w , h * (1-cfg.data[0][1]) );//cfgdata是item数组，取值为item数组的
        ctx.moveTo( row_w , h - h * cfg.data[0][1]* per);
        for(i in cfg.data){
            var item = cfg.data[i];
            x = row_w * i + row_w;
            y = h - h * item[1]* per ;
            ctx.lineTo(x,y);
        }

        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,255,255,0)';
        //绘制阴影
        ctx.lineTo(x,h);
        ctx.lineTo(row_w ,h);
        ctx.fillStyle = 'rgba(255,118,118,0.31)';
        //ctx.shadowColor();
        ctx.fill();


        //写数据
        for(i in cfg.data){
            var item = cfg.data[i];
            
            x = row_w * i + row_w;
            y = h - h * item[1]* per ;

            ctx.fillStyle = item[2] ? item[2] : '#595959';

            ctx.fillText( ((item[1]*100)>>0)+'%',x-10,y-10);
            
        }
    ctx.stroke();
    }

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

        // component.on('onLoad',function(){   //文字显现
        //     var s = 0;
        //     for(i =0;i<5;i++){
        //         setTimeout(function(){        //Window对象setTimeout
        //             s += .2;
        //             show_text(s);
        //         },i*10)
        //     }
        // })
    
    return component;

    //绘制折线数据
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokestyle = "#ff8878";
    
    


    





    return component;
}