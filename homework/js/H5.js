/* 内容管理对象 */

var H5 = function(){
    this.id = ('h5_'+Math.random()).replace('.','_');
    this.el = $('<div class="h5" id="'+this.id+'" >').hide();
    this.page = [];
    $('body').append(this.el);

    /* 新增一个页*/
    this.addPage = function( name , text ){     //this指针指向函数绑定的H5对象
        var page = $('<div class = "h5_page section">');
        if(name != undefined){
            page.addClass('h5_page_'+name);   //如果那么有定义，那么在追加h5_page后面追加一个类名...
        }
        if(text != undefined){
            page.text(text);  
        }
        this.el.append(page);   //this指针指向函数绑定的this.addpage对象,即H5.addpage.
        this.page.push(page);

        if(typeof this.whenAddPage === 'function' ){
            this.whenAddPage();
        }
        return this;
    }
    /* 新增一个组件*/
    this.addComponent = function( name , cfg ){
        var cfg = cfg || {};
        cfg = $.extend({
            type:'base'
        },cfg) ;                //jQuery核心函数——插件机制
        var component;
        var page = this.page.slice(-1)[0]; //jQuery遍历筛选的方法，slice（selector,end），省略end则代表selector参数index之后都选中

        switch(cfg.type){
            case'base':
                component = new H5ComponentBase( name,cfg );
            break;
            case'polyline':
                component = new H5ComponentPolyline( name,cfg );
            break;
            case'pie':
                component = new H5ComponentPie( name,cfg );
            break;
            case'radar':
                component = new H5ComponentRadar( name,cfg );
            break;
            case'point':
                component = new H5ComponentPoint( name,cfg );
            break;
            case'bar':
                component = new H5ComponentBar( name,cfg );
            break;
            case'bar_v':
                component = new H5ComponentBar_v( name,cfg );
            break;
            case'ring':
                component = new H5ComponentRing( name,cfg );
            break;
            default:
        }    
        page.append(component);
        return this;                                                   //不明白为什么要为了type大费周章
    }
    /* H5对象初始化呈现*/
    this.loader = function(){
        this.el.fullpage({
            onLeave:function(index,nextIndex,direction){
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function(anchorLink,index){ 
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
        if(firstpage){
            $.fn.fullpage.moveTo(firstpage);
        }
    }
    this.loader = typeof H5_loading == 'function'? H5_loading :this.loader;
    return this;
}
