/* 基本图文组件对象 */

var H5ComponentBase = function( name,cfg ){
	var cfg = cfg || {};
	var id = ('h5_c_'+Math.random()).replace('.','_');
	//把当前的组建类型添加到样式中进行标记
	var cls =' h5_component_name_'+name+' h5_component_' + cfg.type ;//' h5_component_'最前面的空格很重要，缺少导致黏在一起变成一个class
    // var component = $('<div class="h5_component '+cls+' h5_component_name_'+name+'" id="'+id+'"></div>');
    var component = $('<div class="h5_component '+cls+'" id="'+id+'">');
    cfg.text   && component.text(cfg.text);//如果cfg的text中有值，则写在component的text属性中
    cfg.width  && component.width(cfg.width/2);//设计图为200%
    cfg.height && component.height(cfg.height/2);

    cfg.css && component.css( cfg.css ); 
    cfg.bg  && component.css('backgroundImage','url('+cfg.bg+')')

    if(cfg.center === true){
    	component.css({
    		marginLeft : (cfg.width/4 * -1) + 'px',
    		left:'50%'                                 //强制居中的办法，需要记忆 4因为是retina
    	})
    }

    if(typeof cfg.onclick === 'function'){ //onclick变量性质为函数
        component.on('click',cfg.onclick)
    }
    component.on('onLoad',function(){

        setTimeout(function(){
            // component.addClass(cls + '_load').removeclass(cls + '_leave');//会把name的类删掉
            component.addClass(cls + '_load').removeClass(' h5_component_' + cfg.type + '_leave');
            cfg.animateIn && component.animate(cfg.animateIn); //jQuery的自定义效果函数animate()

        },cfg.delay || 0 )


    	return false;
    })
    component.on('onLeave',function(){
        setTimeout(function(){
    	component.addClass(cls + '_leave').removeClass(' h5_component_' + cfg.type + '_load');
    	cfg.animateOut && component.animate(cfg.animateOut);
        
        },cfg.delay || 0 )

    	return false;
    })








    return component;
}