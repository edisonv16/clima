const gulp = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(dartSass);
const pug = require('gulp-pug');
const terser = require('gulp-terser');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

// Compilar SCSS a CSS (sin advertencias de deprecación de Sass)
function scssTask() {
  return gulp.src('./src/assets/scss/style_tools.scss')
    .pipe(plumber())
    .pipe(sass({
      silenceDeprecations: ['legacy-js-api', 'import']
    }).on('error', sass.logError))
    .pipe(gulp.dest('./build/assets/css'))
    .pipe(browserSync.stream());
}

// Minificar y procesar JavaScript
function jsTask() {
  return gulp.src('./src/assets/js/**/*.js')
    .pipe(plumber())
    .pipe(terser())
    .pipe(gulp.dest('./build/assets/js'))
    .pipe(browserSync.stream());
}

// Copiar archivos de datos JSON (data.json)
function jsonTask() {
  return gulp.src('./src/assets/js/**/*.json')
    .pipe(plumber())
    .pipe(gulp.dest('./build/assets/js'))
    .pipe(browserSync.stream());
}

// Compilar plantillas Pug a HTML
function pugTask() {
  return gulp.src(['./src/pug/*.pug', './src/pug/**/*.pug'])
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./build/html'))
    .pipe(browserSync.stream());
}

// Copiar y sincronizar imágenes binarias
function imagesTask() {
  return gulp.src('./src/assets/images/**/*.{jpg,jpeg,png,gif,svg}', { encoding: false })
    .pipe(plumber())
    .pipe(gulp.dest('./build/assets/images'))
    .pipe(browserSync.stream());
}

// Servidor local con BrowserSync y recarga en vivo
function serverTask(done) {
  browserSync.init({
    server: {
      baseDir: './build'
    },
    startPath: '/html/index.html',
    port: 8000,
    open: true,
    notify: false
  });
  done();
}

// Observador de cambios en archivos
function watchTask() {
  gulp.watch('./src/assets/scss/**/*.scss', scssTask);
  gulp.watch('./src/assets/js/**/*.js', jsTask);
  gulp.watch('./src/assets/js/**/*.json', jsonTask);
  gulp.watch('./src/pug/**/*.pug', pugTask);
  gulp.watch('./src/assets/images/**/*.{jpg,jpeg,png,gif,svg}', imagesTask);
  gulp.watch('./build/**/*.html').on('change', browserSync.reload);
}

// Tareas compuestas
const build = gulp.parallel(
  scssTask,
  jsTask,
  jsonTask,
  pugTask,
  imagesTask
);

const dev = gulp.series(
  build,
  gulp.parallel(watchTask, serverTask)
);

// Exportar tareas
exports.scss = scssTask;
exports.js = jsTask;
exports.json = jsTask;
exports.pug = pugTask;
exports.images = imagesTask;
exports.build = build;
exports.server = serverTask;
exports.default = dev;
