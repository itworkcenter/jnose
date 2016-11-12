var path = require("path"),
    gulp = require("gulp"),
    rename = require("gulp-rename"), /*Rename files*/
    image = require('gulp-image'),
    uglify = require("gulp-uglify"), /*minify file*/
    jshint = require("gulp-jshint"), /*detect javascript code error.*/
    concat = require("gulp-concat"),
    size = require("gulp-filesize"),
    minifyCss = require("gulp-minify-css"),
    minifyHtml = require("gulp-minify-html"),
    minifyHtmlAll = require('gulp-minifier'),
    // imageop = require("gulp-image-optimization"),
    clean = require("gulp-clean"),
    browserSync = require("browser-sync"),
    runSequence  = require("run-sequence");

// :start  distribution define
var buildPath = "dist",
    buildJs = buildPath + "/scripts",
    buildImg = buildPath + "/images",
    buildCss = buildPath + "/css";

// :start public define
var publicPath = "public",
    publJs = publicPath + "/scripts/*.js",
    imagesrc = publicPath + "/images/*.*";

// :start module define
var modulePath = "*",
    modJs = modulePath + "/scripts/*.js",
    modCss = modulePath + "/css/*.css",
    modImg = modulePath + "/images/*.*";

// :start detect error and potential problem in your Javascript code
gulp.task("hint.js",function () {
    gulp.src(["*/scripts/*.js","!dist/scripts/*.js"])
        .pipe(jshint())
        .pipe(jshint.reporter('fail'));
});

gulp.task("public.js",function () {
    return gulp.src(publJs)
        .pipe(uglify())
        .pipe(rename({dirname: ""}))
        .pipe(concat("jquery.all.js"))
        .pipe(gulp.dest( buildJs ))
        .pipe(size());
});

gulp.task("module.js",function () {
    return gulp.src([modJs, "public/scripts/!jquery*.js", "!dist/scripts/*.js"])
        .pipe(uglify())
        .pipe(rename({dirname: "", suffix: ".mini"}))
        .pipe(concat("base.js"))
        .pipe(gulp.dest(buildJs))
        .pipe(size());
});

gulp.task("module.css",function () {
    return gulp.src([modCss, "!public/css/*.css", "!dist/css/*.css"])
        .pipe(minifyCss())
        .pipe(rename({dirname: "", suffix: ".mini"}))
        .pipe(concat("base.css"))
        .pipe(gulp.dest(buildCss))
        .pipe(size());
});

// :start image processing
gulp.task("module.img",function () {
    return gulp.src([modImg, "!public/images/*.*", "!dist/images/*.*"])
        /*.pipe(concat("jquery.plugin.js"))*/
        .pipe(image())
        .pipe(rename({dirname: ""}))
        .pipe(gulp.dest(buildImg))
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
        "public.js",
        "module.js",
        "module.css",
        "module.img"
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
