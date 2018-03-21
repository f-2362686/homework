/* 柱图组件对象 */

var H5ComponentBar_v = function( name,cfg ){
    var component = new H5ComponentBar(name,cfg);

    var width = (100/cfg.data.length)>>0;
    component.find('.line').width(width+'%');

    $.each(component.find('.rate'),function(){
        var w = $(this).css('width');
        $(this).height(w).width('');   //取消原来的宽度
    })
    $.each( component.find('.per'),function(){
       //重新调整 DOM 结构，把百分比数值(.per)添加到 进度区 (.rate)中，和色块元素(.bg)同级。
        $(this).appendTo( $(this).prev()) ; 
    })
    
    return component;
}