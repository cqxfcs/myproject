var TYPE = {
    newsCode:1,
    newsType:"recom"
};


//根据newscode选择新闻类型
function  choose(){
    $(".news-tab-ul li").each(function(index){
        $(this).click(function () {
            $(".news-list-item").remove();
            TYPE.newsCode = index+1;
            switch (TYPE.newsCode){
                case 1:TYPE.newsType = "recom";
                    break;
                case 2:TYPE.newsType = "baijia";
                    break;
                case 3:TYPE.newsType = "local";
                    break;
                case 4:TYPE.newsType = "img";
                    break;
                case 5:TYPE.newsType = "fun";
                    break;
                case 6:TYPE.newsType = "society";
                    break;
                default:
                    break;
            }
            $(this).addClass("selected").siblings().removeClass("selected");
            getdata();
        })
    })
}

choose();
getdata();

function getdata() {
        $.ajax({
            url:'/select',
            type:'post',
            dataType:"json",
            data:{
              classfy:TYPE.newsType
            },
            success: function (data) {
                data = JSON.stringify(data);
                $.each(JSON.parse(data), function (index, value) {
                    console.log(value);
                    //$(".mydiv").text(value.title);


                   //fenjiexian
                    var newslistItem = $("<div>").addClass("news-list-item").appendTo(".news-list-container");
                    var listMain = $("<div>").addClass("list-main").appendTo(newslistItem);
                    if(value.img ){
                        var listImg = $("<div>").addClass("list-img").appendTo(listMain);
                        $("<img width='100%'>").attr("src",value.img).appendTo(listImg);
                    }else{
                        $(".list-title").css({
                            "margin-bottom":0
                        })
                        $(".list-text").css({
                            "width":"100%"
                        })
                    }

                    var listText = $("<div>").addClass("list-text").appendTo(listMain);

                    if(value.img ){

                    }else{
                        $(".list-text").css({
                            "width":"100%"
                        })
                    }

                    $("<div>").addClass("list-title").text(value.title).appendTo(listText);
                    var listBottom = $("<div>").addClass("list-bottom").appendTo(listText);
                    var listTime = $("<div>").addClass("list-time").appendTo(listBottom);
                    $("<div>").addClass("tip-time").text(value.time.substring(0,10)).appendTo(listTime);

                })

            }
        })
}
