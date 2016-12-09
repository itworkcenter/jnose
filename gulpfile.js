var path = require("path");
var gulp = require("gulp");
var rename = require("gulp-rename"); /*Rename files*/
var image = require('gulp-image');
var uglify = require("gulp-uglify"); /*minify file*/
var jshint = require("gulp-jshint"); /*detect javascript code error.*/
var concat = require("gulp-concat");
var size = require("gulp-filesize");
var minifyCss = require("gulp-minify-css");
var minifyHtml = require("gulp-minify-html");
var minifyHtmlAll = require('gulp-minifier');
// var imageop = require("gulp-image-optimization");
var clean = require("gulp-clean");
var browserSync = require("browser-sync");
var runSequence  = require("run-sequence");

// :start  distribution define
var buildPath = "dist/";
var buildJs = buildPath + "scripts";
var buildImg = buildPath + "images";
var buildCss = buildPath + "css";
var buildFont = buildPath + "fonts";

// :start public define
var publicPath = "modules/_public_/";
var fontPath = publicPath + "fonts/*.*";
var publImg = publicPath + "/images/*.*";
var publJs = [
  publicPath + "scripts/jquery.min.js",
  publicPath + "scripts/jquery-ui.min.js",
  publicPath + "scripts/base.js"
];
var publCss = [
  publicPath + "css/reset.css",
  publicPath + "css/font-awesome.mini.css",
  publicPath + "css/base.css"
];

// :start module define
var modulePath = "modules/*/";
var modJs = modulePath + "scripts/*.js";
var modCss = modulePath + "css/*.css";
var modImg = modulePath + "images/*.*";

// :start detect error and potential problem in your Javascript code
gulp.task("hint.js",function () {
    gulp.src(["*/scripts/*.js","!dist/scripts/*.js"])
        .pipe(jshint())
        .pipe(jshint.reporter('fail'));
});
// :start public
gulp.task("public.font",function () {
    return gulp.src(fontPath)
        .pipe(gulp.dest(buildFont))
        .pipe(size());
});
gulp.task("public.js",function () {
    return gulp.src(publJs)
        .pipe(uglify())
        .pipe(rename({dirname: ""}))
        .pipe(concat("base.all.js"))
        .pipe(gulp.dest(buildJs))
        .pipe(size());
});

gulp.task("public.img",function () {
    return gulp.src(publImg)
        .pipe(image())
        .pipe(rename({dirname: ""}))
        .pipe(gulp.dest(buildImg))
        .pipe(size());
});

gulp.task("public.css",function () {
    return gulp.src(publCss)
      .pipe(minifyCss())
      .pipe(rename({dirname: ""}))
      .pipe(concat("base.all.css"))
      .pipe(gulp.dest(buildCss))
      .pipe(size());
});
// :start module
gulp.task("module.js",function () {
    return gulp.src([modJs, "!" + publicPath + "*/*.js"])
        .pipe(uglify())
        .pipe(rename({dirname: ""}))
        .pipe(concat("module.all.js"))
        .pipe(gulp.dest(buildJs))
        .pipe(size());
});

gulp.task("module.css",function () {
    return gulp.src([modCss, "!" + publicPath + "*/*.css"])
        .pipe(minifyCss())
        .pipe(rename({dirname: ""}))
        .pipe(concat("module.all.css"))
        .pipe(gulp.dest(buildCss))
        .pipe(size());
});

gulp.task("module.img",function () {
    return gulp.src([modImg])
        .pipe(image())
        .pipe(rename({dirname: ""}))
        .pipe(gulp.dest(buildImg))
        .pipe(size());
});
// :start build compress
gulp.task("dist.css",function () {
    return gulp.src([
      buildCss + "/base.all.css",
      buildCss + "/module.all.css"
    ])
      .pipe(minifyCss())
      .pipe(rename({dirname: ""}))
      .pipe(concat("jnose.min.css"))
      .pipe(gulp.dest(buildCss))
      .pipe(size());
});
gulp.task("dist.js",function () {
    return gulp.src([
      buildJs + "/base.all.js",
      buildJs + "/module.all.js"
    ])
        .pipe(uglify())
        .pipe(rename({dirname: ""}))
        .pipe(concat("jnose.min.js"))
        .pipe(gulp.dest(buildJs))
        .pipe(size());
});

/*style-font*/
// gulp.task("style-font",function () {
//     return gulp.src(stylesrc+"/*/*.*")
//         .pipe(gulp.dest(stylePath));
// });


/*jade to html*/
// gulp.task("jade",function (cb) {
//      return gulp.src(jadesrc)
//          .pipe(jade())
//          .pipe(gulp.dest(jadePath))
//          .pipe(minifyHtmlAll({
//              minify: true,
//              collapseWhitespace: true,
//              conservativeCollapse: true,
//              minifyJS: true,
//              minifyCSS: true
//          }))
//          .pipe(gulp.dest(jadePath))
//          .pipe(size());
// });
/*html*/
// gulp.task("html",function () {
//     return gulp.src(htmlsrc)
//         .pipe(minifyHtmlAll({
//             minify: true,
//             collapseWhitespace: true,
//             conservativeCollapse: true,
//             minifyJS: true,
//             minifyCSS: true
//         }))
//         .pipe(gulp.dest(buildPath))
//         .pipe(size());
// });
// :start build work
gulp.task("build",function (back) {
    runSequence(
        "clean",
        "public.font",
        "public.js",
        "public.css",
        "public.img",
        "module.js",
        "module.css",
        "module.img",
        "dist.css",
        "dist.js"
        ,back)
});
// :start clean build file
gulp.task("clean",function(){
   return gulp.src(buildPath+"/*",{read:false})
       .pipe(clean({force:true}))
});
// :start watch file change
gulp.task("watch",function () {
    /*gulp.watch(["public/!**!/!*.*"],{debounceDelay:2000}).on("change",browserSync.reload);*/
    // gulp.watch(jqpluginsrc, ["js.jquery.plugin"]);
    gulp.watch(modJs, ["module.js"]);
    gulp.watch(modCss, ["module.css"]);
    gulp.watch(modImg, ["module.img"]);
    // gulp.watch(imagesrc, ["image"]);
    // gulp.watch(stylesrc, ["style"]);
    // gulp.watch(htmlsrc, ["html"]).on("change",browserSync.reload);
    // gulp.watch(jadesrc, ["jade"]).on("change",browserSync.reload);
});

/*sync testing*/
/*gulp.task("serve",function(){
   browsersync({
       server:{
           baseDir:"public",
           middleware:[]
       },
       port:5000
   });
});*/
gulp.task('serve', function() {
    browserSync({
        proxy: "127.0.0.1:3000"
    });
});

/*start*/
gulp.task("default",function(){
    runSequence("build");
    // runSequence("build", "serve", "watch");
});
