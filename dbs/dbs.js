var express = require('express');
var orm = require('orm');

// 服务器的配置
//orm相关用法 关系映射模型
var dbusername = 'root';
var dbpassword = 'root';
var dbname = 'nodebaidunews';

// 导入到路由
module.exports = function(router) {

    // 数据库设置
    router.use(orm.express("mysql://" + dbusername + ":" + dbpassword + "@localhost/" + dbname, {
        define: function (db, models, next) {

            models.newsinfo = db.define("newsinfo", {
                id: Number,
                title: String,
                img: String,
                content: String,
                time: Date,
                classfy: ["recom", "baijia", "local", "img", "fun",
                    "society"
                ]
            });
            next();
        }
    }));

    var dbs = {
        getData: function (req, res, next) {
            var selectType;

            if(req.body.id==undefined){
                selectType = {
                    classfy:req.body.classfy
                }
            }else{
                selectType = {
                    id:req.body.id
                }

            }

               req.models.newsinfo.find(selectType, function (err, newsinfo) {
                   console.log(newsinfo);
                   res.locals.newsinfo = newsinfo;
                   next();
               })
        },

        addData: function (req, res, next) {
            req.models.newsinfo.create({
                id:req.body.id,
                title:req.body.title,
                img:req.body.img,
                content:req.body.content,
                time:req.body.time,
                classfy:req.body.classfy
            }, function (err, newsinfo) {
                res.locals.newsinfo = {

                }
                next();
            })
        },

        updateData: function (req, res, next) {
            req.models.newsinfo.find({
                id:req.body.id
            }, function (err, newsinfo) {
                newsinfo[0].title = req.body.title;
                newsinfo[0].img = req.body.img;
                newsinfo[0].content = req.body.content;
                newsinfo[0].time = req.body.time;


                newsinfo[0].save(function (err) {
                    if(err){
                        return console.error('Connection error: ' + err);
                    }
                    res.locals.newsinfo = {
                        'result1': newsinfo[0].title,
                        'result2': newsinfo[0].img,
                        'result3': newsinfo[0].content,
                        'result4': newsinfo[0].time
                    }
                    next();
                })
            })
        }
    };
    return dbs;
};
