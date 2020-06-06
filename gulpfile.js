// Archivo gulpfile.js

var gulp = require('gulp'),
uglify = require('gulp-uglify'),
sass = require('gulp-sass'),
pug = require('gulp-pug2'),
plumber = require('gulp-plumber'),
imagemin = require('gulp-imagemin'),
webserver = require('gulp-webserver'),
fontgen = require('gulp-fontgen');
//requireDir = require('require-dir');

//var dir = requireDir('./gulp-tasks', {recurse: true});

gulp.task('uglify', function() {//Comprime los .js y los pone en build
  return gulp.src('./src/assets/js/*.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest('./build/assets/js'));
  console.log("Archivos compilados con éxito!");
});

gulp.task('webserver', function() {//Servidor web defecto puerto :8000
  return gulp.src('build')
  .pipe(webserver({
    livereload: true,
    directoryListing: {
      enable: true,
      path: 'build'
    },
    open: true
  }));
});

gulp.task('scss', function() {//Compila los archivos sass a css
  return gulp.src(['./src/assets/scss/*.scss', './src/assets/scss/**/*.scss'])
  .pipe(plumber())
  .pipe(sass({/*outputStyle: 'compressed'*/}))//Verificar si se manipula css
  .pipe(gulp.dest('./build/assets/css'));
  console.log("SCSS compilado!");
});

gulp.task('pug', function() {// Comilas los archivos pug a HTML
  return gulp.src(['./src/pug/*.pug', './src/pug/**/*.pug'])
  .pipe(plumber())
  .pipe(pug({
    // opciones.
  }))
  .pipe(gulp.dest('./build/html'));
  console.log("Archivos HTML Compilados con éxito!");
});

gulp.task('imagemin', function() {//Optimiza las imágenes
  return gulp.src('./src/assets/images/*.{jpg,jpeg,png,gif}')
  .pipe(plumber())
  .pipe(imagemin())
  .pipe(gulp.dest('./build/assets/images'));
  console.log("Imágenes comprimidas con éxito!");
});

gulp.task('fontgen', function(){//Convierte las fuentes a otros formatos
  return gulp.src("./src/assets/scss/fonts/*.{ttf,otf}")
  .pipe(plumber())
  .pipe(fontgen({
    dest: "./build/assets/fonts"
  }));
  console.log("Fuentes generadas con éxito!");
});

gulp.task('watch', function() {
  gulp.watch('./src/assets/js/*.js', gulp.series('uglify'));
  gulp.watch(['./src/assets/scss/*.scss', './src/assets/scss/**/*.scss'], gulp.series('scss'));
  gulp.watch(['./src/pug/*.pug', './src/pug/**/*.pug'], gulp.series('pug'));
  gulp.watch('./src/assets/images/*.{jpg,jpeg,png,gif}', gulp.series('imagemin'));
  gulp.watch('./src/assets/scss/fonts/*.{ttf,otf}', gulp.series('fontgen'));
});

gulp.task('default',gulp.parallel('watch','uglify', 'scss', 'pug', 'imagemin', 'webserver', 'fontgen'));
