define(['jquery'],function(){

		
		function getData(){

		}
		getData.prototype = {
			constructor:getData,
			init:function(){
				this.$content_list_li=$(".content_list").find("li")/*.find(".sale_img")*/;
				this.list_img=this.$content_list_li.find("img");
				//console.log(this.list_img)
				this.$sale_title=$(".sale_title");
				this.$sale_price=$(".sale_price").find("a");
				this.$origin_price=$(".origin_price").find("a");
				this.buy=$(".buy_btn");
				
				var setup={
				url:"scripts/recomend.json",
				type:"GET",
				context:this
				}
			  $.ajax(setup).then($.proxy(this.rendring,this));
			},
			rendring:function(res){
				
				//console.log(this);
				var _this=this;
				
				res.index_data.forEach(function(item,index){
					//console.log($(_this.$content_list_li[index]).find("img"))
					$(_this.$content_list_li[index]).find("img").attr({"src":item.img,"id":item.id,"title":item.title,"price":item.sale_price});

					$(_this.$sale_title[index]).find("a").html(item.title);
					$(_this.$sale_price[index]).html(item.price);
					$(_this.$origin_price[index]).html(item.sale_price);
					$(_this.buy[index]).attr("data-id",item.id);
					//console.log(res.img)

				})
				for(var i=0;i<_this.list_img.length;i++){
					_this.list_img[i].index=i;
					$(_this.list_img[i]).on("click",$.proxy(_this.getInfo,this));
				}
				
			},
			getInfo:function(e){
				var e=e||window.event;
				
				//console.log(1);
				this.index=e.target.index;
				//console.log(this.index);
				
				this.id=$(this.list_img[this.index]).attr("id");
				this.img=$(".sale_img").eq(this.index).find("img").attr("src");
				//this.sale_slogan=$(".sale_pink").eq(this.index).text();
				this.title=$(".sale_title").eq(this.index).find("a").text();
				
				this.sale_price=$(".sale_price").eq(this.index).find("a").text();
				
				this.original_price=$(".origin_price").eq(this.index).find("a").text();
				console.log(this.id,this.img,this.title,this.sale_price,this.original_price);
				//this.setCookie();
				$.cookie("shopping_cart",'{"id":"'+this.id+ '","original_price":"'+this.original_price+ '","sale_price":"'+this.sale_price+ '","title":"'+this.title+'","img":"'+this.img+'"}')
				self.location.href="detail.html";

			}/*,
			


		
		setCookie:function(){
			$.cookie("id",this.id);
		}*/
	


}

	
	return new getData();
})