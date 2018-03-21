/* 折线图组件对象 */

var H5ComponentPie = function( name,cfg ){
    var component = new H5ComponentBase(name,cfg);

    //绘制网格线 - 背景层
    var w = cfg.width;
    var h = cfg.height;

    //加入一个底图层

    var canvas = document.createElement('canvas');
    var ctx   = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h;
    $(canvas).css('zIndex',1);
    component.append(canvas);

    var r = w/2;

    ctx.beginPath();
    ctx.strokeStyle = '#eee';
    ctx.fillStyle = '#eee';
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    //绘制数据层

    var canvas = document.createElement('canvas');
    var ctx   = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h;
    $(canvas).css('zIndex',2);
    component.append(canvas);
 
    var colors = ['red','green','blue','darkred','orange']; //备用颜色
    var sAngle = 1.5 * Math.PI;//12点位置
    var eAngle = 0;
    var aAngle = 2 * Math.PI;//100%结束的圆

    var step = cfg.data.length;
    for(var i=0;i<step;i++){
        var item = cfg.data[i];
        var color = item[2]  || (item[2] = colors.pop()); //pop方法是为数组删除并返回最后一个元素

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        eAngle = sAngle + aAngle * item[1];
        ctx.moveTo(r,r,);
        ctx.arc(r,r,r,sAngle,eAngle);
        ctx.fill();
        ctx.stroke();

        sAngle = eAngle;

        //加入文字

        var text = $('<div class="text">');
        text.text( cfg.data[i][0]);
        var rate = $('<div class="rate">');
        rate.text( cfg.data[i][1] * 100 + "%");
        text.css('opacity',0);
        component.append(text);
        text.append(rate);


        var x = r + Math.sin( .5 * Math.PI - sAngle) * r;
        var y = r + Math.cos( .5 * Math.PI - sAngle) * r;
        

        if(x>w/2){
            text.css('left',x/2);
        }else{
            text.css('right',(w-x)/2+10);
        }

        if(y>h/2){
            text.css('top',y/2);
        }else{
            text.css('bottom',(h-y)/2+10);
        }

        if( cfg.data[i][2]){
             text.css('color',cfg.data[i][2]);
        }


    }
    //加入蒙板层
    var canvas = document.createElement('canvas');
    var ctx   = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height = h;
    $(canvas).css('zIndex',3);
    component.append(canvas);

    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#eee';

    //生长动画
    var draw = function( per ){
        ctx.beginPath();
        ctx.moveTo(r,r);
        ctx.clearRect(0,0,w,h);

        if(per <=0){
            ctx.arc(r,r,r,0,2 * Math.PI);//false顺时针
            component.find('.text').css('opacity',0);
        }else{
            ctx.arc(r,r,r,sAngle,sAngle + 2 * Math.PI * per,true);
        };

        ctx.fill();
        ctx.stroke();

        if( per >= 1){
        component.find('.text').css('opacity',1);
        }
    }
    // draw(0);

    component.on('onLoad',function(){
        //饼图生长动画
        var s=0;
        for(i=0;i<100;i++){
            setTimeout(function(){
                s += .01;
                draw(s);
            },i*10+500);
        }
    })

    component.on('onLeave',function(){
    //饼图生长动画
        var s=1;
        for(i=0;i<100;i++){
        setTimeout(function(){
                s -= .01;
                draw(s);
             },i*10+500);
        }
    })


  

    return component;


}