"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var svgstore = require('gulp-svgstore');
var rename = require("gulp-rename");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

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

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/**/*.html"
  ])

});

gulp.task ("svgsprite", function () {
  return gulp.src("source/img/{" +
    "htmlacademy," +
    "icon-fb," +
    "icon-insta," +
    "icon-vk" +
    "}.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"));
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("css", "server"));
