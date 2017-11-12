const gulp = require('gulp'),
  gutil = require('gulp-util'),
  fileInclude = require('gulp-file-include'),
  filter= require('gulp-filter'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync').create(),
  del = require('del'),
  sass = require('gulp-sass'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
  compass = require('gulp-compass'),
  imagemin = require('gulp-imagemin'),
  rev = require('gulp-rev'),
  revReplace = require('gulp-rev-replace'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  csso = require('gulp-csso')

/* input path */
const src = {
  all: 'src/**/*',
  html: 'src/pages/**/*.html', // html files
  vendor: ['vendor/**/*','bower_components/**/*'], // vendor and bower_components files
  css: 'src/css/**/*',
  scss: 'src/css/** /*.scss', // index.scss files in style
  less: 'src/css/**/*.less', // index.scss files in style
  js: 'src/js/**/*.js', // index.js files in js
  assets: 'src/assets/**/*' // static files: font image json
}

/* output path */
const dist = {
  root: 'dist/',
  html: 'dist/',
  css: 'dist/static/css',
  js: 'dist/static/js',
  vendor: 'dist/static/vendor',
  assets: 'dist/static/assets'
}

/* combined path */

const scssFilter = filter('**/*.scss', {restore: true})
const lessFilter = filter('**/*.less', {restore: true})
const jsFilter = filter('**/*.js', {restore: true})

/* default task */
gulp.task('default', () => runSequence(['clean'], ['build'], ['serve', 'watch']))

/* dev task */
gulp.task('dist', () => runSequence(['clean'], ['build']))

/* clean task: del dist directory */
gulp.task('clean', cb => del([dist.root], cb))

/* build task: run compass file combine in sequence */
gulp.task('build', cb => runSequence(['compile'], ['file', 'fileInclude', 'combine'], ['useref'], cb) )

/* compass task: compass scss less files */
gulp.task('compile', () => {
  return gulp.src([src.css, src.js])
  .pipe(scssFilter)
  .pipe(sass())
  // .on('error', err => console.log(err))
  .pipe(scssFilter.restore)
  .pipe(lessFilter)
  .pipe(less())
  // .on('error', err => console.log(err))
  .pipe(lessFilter.store)
  .pipe(jsFilter)
  .pipe(uglify())
  // .on('error', err => console.log(err))
  .pipe(jsFilter.restore)
  .pipe(gulp.dest(dist.root))
})

/* fileInclude task: 导入模块到HTML文件 */
gulp.task('fileInclude', () => {
  gulp.src(src.html)
  .pipe(fileInclude({
    prefix: '@@',
    basepath: 'src/components'
  }))
  .pipe(useref()) // 临时注释掉
  .pipe(gulp.dest(dist.root))
})

/* file task: pack static files */
gulp.task('file', 
  // () => gulp.src(['./src/static/*',
  // './src/index.html']).pipe(gulp.dest('./dist/'))
  () => {
    gulp.src(src.vendor)
    .pipe(gulp.dest(dist.root))
  }
)

/* combine task: combine and add version to .js .css .html files */
gulp.task('combine', () => {
  // copyDist()
})

/* test */
gulp.task('useref', () => {
  // useref1()
})

/* serve task: serve from dist */
gulp.task('serve', () => {
  browserSync.init({
    server: dist.root,
    port: 8080
  })
})

/* reload task: make browserSync reload to refresh the browser */
gulp.task('reload',() => browserSync.reload())

/* watch task: watch .html .less .scss .sass .styl .js files */
gulp.task('watch', () => gulp.watch(['./src/**/*.html', './src/**/*.scss', './src/**/*.sass', './src/**/*.js'], () => runSequence(['fileInclude', 'build'], ['reload'])))
