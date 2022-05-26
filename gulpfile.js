"use strict";

const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');
const { on } = require('events');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/scss/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(gulp.dest("C://OpenServer/domains/OrganicFood.ru/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/scss/**/*.+(scss|sass|css)").on('change', gulp.parallel('styles'));
    gulp.watch("src/*.+(php|html)").on('change', gulp.parallel('html'));
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/php/**/*").on('all', gulp.parallel('php'));
  
});

gulp.task('html', function () {
    return gulp.src("src/*.+(php|html)")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"))
        .pipe(gulp.dest("C://OpenServer/domains/OrganicFood.ru"));
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(gulp.dest("C://OpenServer/domains/OrganicFood.ru/js"))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(gulp.dest("C://OpenServer/domains/OrganicFood.ru/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"))
       .pipe(gulp.dest("C://OpenServer/domains/OrganicFood.ru/icons"))
        .pipe(browserSync.stream());
});
gulp.task('image', function () {
    return gulp.src("src/img/**/*")
        .pipe(gulp.dest("dist/img"))
       .pipe(gulp.dest("C://OpenServer/domains/OrganicFood.ru/img"))
        .pipe(browserSync.stream());
});
gulp.task('php', function () {
    return gulp.src("src/php/**/*.php")
        .pipe(gulp.dest("dist/php"))
       .pipe(gulp.dest("C://OpenServer/domains/OrganicFood.ru/php"))
        .pipe(browserSync.stream());
});



gulp.task('default', gulp.parallel('watch', /*'server', */'styles', 'scripts', 'fonts', 'icons', 'html','image','php'));