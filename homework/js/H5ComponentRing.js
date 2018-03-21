/* 折线图组件对象 */

var H5ComponentRing = function( name,cfg ){

    if(cfg.data.length>1){
        cfg.data = [cfg.data[0]];  //数据格式化为一项，应为环图只需要第一项数据
    }
    cfg.type = 'pie';
    var component = new H5ComponentPie(name,cfg); //把预设的ring修改为pie，应用pie的逻辑

    component.addClass('h5_component_ring');  //为了css文件中能选中生效

    var mask = $('<div class="mask">');
    component.append(mask);
    
    var text = component.find('.text');

    text.attr('style','');
    if(cfg.data[0][2]){
        text.css('color',cfg.data[0][2]);  //字体颜色获得
    }
    mask.append(text);

    return component;
}


