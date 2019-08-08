"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var del = require("del");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require('gulp-svgstore');
var rename = require("gulp-rename");
var postcss = require("gulp-postcss");
var jsminify = require('gulp-minify');
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/**/*.html",
    "source/fonts/**/*.{woff,woff2}"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build/"));
});

gulp.task("htmlreload", function () {
  return gulp.src(
    "source/**/*.html",
    {
    base: "source"
  })
    .pipe(gulp.dest("build/"));
});

gulp.task("css", function () {
  return gulp.src(["source/sass/style.scss", "source/sass/normalize.scss"])
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("csso", function () {
  return gulp.src("build/css/*.css")
    .pipe(sourcemap.init())
    .pipe(csso())
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css/"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img/"));
});

gulp.task("webp", function () {
  return gulp.src([
    "source/img/**/*.{png,jpg}",
    "!source/img/**/advantage-*.png",
    "!gift-*.jpg",
    "index-background-*.jpg"
  ])
    .pipe(webp({quality: 99.9}))
    .pipe(gulp.dest("build/img/"));
});

gulp.task ("svgsprite", function () {
  return gulp.src(
    "source/img/{" +
    "htmlacademy," +
    "icon-fb," +
    "icon-insta," +
    "icon-vk" +
    "}.svg"
  )
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/"));
});

gulp.task("jsmin", function () {
  return gulp.src("source/js/*.js")
    .pipe(jsminify({
      ext:{
        src:".js",
        min:".min.js"
      },
      noSource:"*.js"
    }))
    .pipe(gulp.dest("build/js/"))
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "csso"));
  gulp.watch(
    "source/img/{" +
    "htmlacademy," +
    "icon-fb," +
    "icon-insta," +
    "icon-vk" +
    "}.svg", gulp.series("svgsprite", "refresh"));
  gulp.watch("source/*.html", gulp.series("htmlreload")).on("change", server.reload);
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "csso",
  "images",
  "svgsprite",
  "webp",
  "jsmin"
));

gulp.task("start", gulp.series("build", "server"));
