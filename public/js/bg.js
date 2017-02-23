
var TYPE = {
    newsCode:1,
    newsType:"recom"
};

//选择新闻类型
function  choose(){
    $(".news-btn").each(function(index){
        $(this).click(function () {
            $(".success").remove();
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
            getdata();
        })
    })
}

//得到并显示新闻数据
function getdata() {
    $.ajax({
        async:false,
        url:"/select",
        type:"post",
        dataType:"json",
        data:{
            classfy:TYPE.newsType
        },
        success: function (data) {
            data = JSON.stringify(data);
            $.each(JSON.parse(data),function(index,value){
                var success =  $("<tr>").addClass("success").appendTo(".news-tbody");
                $("<td>").addClass("idtd").text(value.id).appendTo(success);
                $("<td>").addClass("titletd").text(value.title).appendTo(success);
                $("<td>").addClass("contd").text(value.content).appendTo(success);
                $("<td>").addClass("labeltd").text(value.classfy).appendTo(success);
                $("<td>").addClass("pictd").text(value.img).appendTo(success);
                $("<td>").addClass("datetd").text(value.time).appendTo(success);
                var itd = $("<td>").addClass("itd").appendTo(success);
                $("<a style='font-size: 17px'>").appendTo(itd);
                $("<i class='icon-remove-sign removenews'>").appendTo(itd);
                var newsmodify = $("<td>").appendTo(success);
                $("<a class='btn btn-success btn-sm'>").addClass("modifynews").text("修改").appendTo(newsmodify);
            });
            //deletenews();
            modify();
        }
    })
}

//修改新闻
function modify(){
    $(".success").each(function(key){
        $(".modifynews").eq(key).click(function () {
            var pullright = $("<div>").addClass("pull-right").appendTo(".bgform");
            $(" <button type='submit' class='btn btn-default active save-btn'></button>").text("修改").appendTo(pullright);
            $(" <button type='button' class='btn btn-default active goback'></button>").text("返回").appendTo(pullright);
            $(".news-table").hide();
            $(".bgnews").show();
            $(".inputId").val($(".idtd").eq(key).text());
            $(".inputtitle").val($(".titletd").eq(key).text());
            $(".inputcontent").val($(".contd").eq(key).text());
            $(".inputlabel").val($(".labeltd").eq(key).text());
            $(".inputpic").val($(".pictd").eq(key).text());
            $(".inputdate").val($(".datetd").eq(key).text());

            $(".save-btn").click(function () {
                $.ajax({
                    async:false,
                    url: "/update",
                    type: "post",
                    dataType:"json",
                    data: {
                        //classfy: TYPE.newsType,
                        id: $(".inputId").val(),
                        title: $(".inputtitle").val(),
                        content: $(".inputcontent").val(),
                        img: $(".inputpic").val(),
                        time: $(".inputdate").val(),
                        classfy: $(".inputlabel").val(),
                    },
                    success: function (data) {
                        console.log(data)
                        alert("修改成功");
                    },
                    error: function (XMLHttpRequest) {
                        alert("通讯失败" + XMLHttpRequest.status);
                    }
                })
            });
            $(function() {
                $(".goback").click(function () {
                    $(".news-table").show();
                    $(".bgnews").hide();
                    pullright.remove();
                })

            })
        })
    })

}

//添加新闻
function addnews(){
    $(".addbtn").click(function () {

        $(".inputId").val("");
        $(".inputtitle").val("");
        $(".inputcontent").val("");
        $(".inputlabel").val("");
        $(".inputpic").val("");
        $(".inputdate").val("");

        var pullright = $("<div>").addClass("pull-right").appendTo(".bgform");
        $(" <button type='submit' class='btn btn-default active appnews'></button>").text("添加").appendTo(pullright);
        $(" <button type='text' class='btn btn-default active goback'></button>").text("返回").appendTo(pullright);
        $(".news-table").hide();
        $(".bgnews").show();



        $(".appnews").click(function (){
                $.ajax({
                    url: "/add",
                    type: "post",
                    dataType:"json",
                    data: {
                        classfy: TYPE.newsType,
                        id: $(".inputId").val(),
                        title: $(".inputtitle").val(),
                        content: $(".inputcontent").val(),
                        img: $(".inputpic").val(),
                        time: $(".inputdate").val()
                    },
                    success: function (data) {
                        console.log(data)
                        alert("添加成功");
                    },
                    error: function (XMLHttpRequest) {
                        alert("通讯失败" + XMLHttpRequest.status);
                    }
                })
        });
        //返回按钮
        $(function() {
            $(".goback").click(function () {
                $(".news-table").show();
                $(".bgnews").hide();
                pullright.remove();
            })

        })
    })
}

choose();
getdata();
addnews();