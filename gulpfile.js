"use strict";
const {src, dest, watch, parallel, task} = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');
const { on } = require('events');

task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

   watch("src/*.html").on('change', browserSync.reload);
});

task('styles', function() {
    return src("src/scss/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream());
});

task('watch', function() {
    watch("src/scss/**/*.+(scss|sass|css)").on('change', parallel('styles'));
    watch("src/*.html").on('change', parallel('html'));
    watch("src/js/**/*.js").on('change', parallel('scripts'));
    watch("src/fonts/**/*").on('all', parallel('fonts'));
    watch("src/icons/**/*").on('all', parallel('icons'));
    
});

task('html', function () {
    return src("src/*.html")
        .pipe( htmlmin(  { collapseWhitespace: true }) )
        .pipe( dest("dist/"));
        });

task('scripts', function () {
    return src("src/js/**/*.js")
        .pipe(dest("dist/js"))
        .pipe(browserSync.stream());
});

task('fonts', function () {
    return src("src/fonts/**/*")
        .pipe(dest("dist/fonts"))
        .pipe(browserSync.stream());
});

task('icons', function () {
    return src("src/icons/**/*")
        .pipe(dest("dist/icons"))
        .pipe(browserSync.stream());
});

task('image', function () {
    return src("src/img/**/*")
        .pipe(dest("dist/img"))
        .pipe(browserSync.stream());
});



task('default', parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'html','image'));