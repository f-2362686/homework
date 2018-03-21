var H5_loading = function(images,firstpage){

    var id = this.id;

    if(this._images === undefined){  //第一次进入。。。this是指H5对象

        this._images = (images || []).length;  //一共几张图片
        this._loaded = 0;  //初始为0，逐渐增大
        
        window[id] = this;   //把当前对象存储在全局对象window中，用来进行某个图片加载完成后的回调

        for(s in images){
            var item = images[s];   //把每张图片按顺序放进item
            var img = new Image;    
            img.onload = function(){
                window[id].loader();  //window[id]就是this也就是H5,到H5.js中获取当前对象
            }
            img.src = item; //html DOM中Image对象的src方法，赋予一个新的URL。此处是把图片地址放进img中
        }

        $('#rate').text('0%');
        return this;
    }else{
        this._loaded ++ ;
        $('#rate').text( ( (this._loaded/this._images * 100 ) >> 0 ) + '%' );
        if( this._loaded<this._images){
            return this;
        }
    }

    window[id] = null;

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