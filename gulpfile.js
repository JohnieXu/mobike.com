const argv = require('yargs').argv,
  _ = require('lodash'),
  path = require('path'),
  gulp = require('gulp'),
  babel = require('gulp-babel'),
  gutil = require('gulp-util'),
  gulpif = require('gulp-if'),
  filter = require('gulp-filter'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync').create(),
  del = require('del'),
  fileInclude = require('gulp-file-include'),
  imagemin = require('gulp-imagemin'),
  // compass = require('gulp-compass'),
  sass = require('gulp-sass'),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
  rev = require('gulp-rev'),
  revReplace = require('gulp-rev-replace'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  watchFile = require('gulp-watch'),
  batch = require('gulp-batch')

/* gulp入口路径 */
const src = {
  root: 'src/',
  html: 'src/pages/**/*.html',
  css: ['src/css/*.scss','src/css/*.less'],
  js: 'src/js/**/*.js',
  assets: ['src/assets/**/*'],
  font: 'src/assets/font/*',
  img: 'src/assets/img/*',
  json: 'src/assets/json/*',
  md: 'src/assets/md/*',
  vendor: ['vendor/**/*', 'bower_components/**/*']
}

/* gulp出口路径 */
const dist = {
  root: 'dist/',
  vendor: 'dist/static/vendor/',
  assets: 'dist/static/assets/',
  html: 'dist/',
  css: 'dist/static/css',
  js: 'dist/static/js'
}

/* 生产环境参数 */
let env = argv.p || !argv.d // env=true=>生产环境，env=>开发环境 gulp build -p or gulp build -d
let serve = argv.s || false // serve=true=>开启browser-sync,serve=false=>不开启browser-sync
let env1 = env ? 'production' : 'dev'
gutil.log(gutil.colors.yellow('env: ' + env1))

/* 清除dist目录 */
function cleanFn() {
  gutil.log(gutil.colors.green('cleaning dist'))
  return del('dist')
}
/* html打包-编译html */
function buildHtmlFn() {
  gutil.log(gutil.colors.green('building html'))
  return gulp.src(src.html)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: 'src/components/'
    }))       // 导入html模板文件
    .pipe(gulp.dest(dist.html))
}
/* css打包-编译压缩合并css */
function buildCssFn() {
  gutil.log(gutil.colors.green('building css'))
  return gulp.src(src.css)
  .pipe(sass())
  .on('error', err => handleError(err))
  .pipe(less())
  .on('error',err => handleError(err))
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(gulp.dest(dist.css))
  .pipe(gulpif(env, csso({
    restructure: true,
    sourcemap: false,
    debug: false
  }), csso({
    restructure: false,
    sourcemap: true,
    debug: true
  })))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest(dist.css))
}
/* js打包-合并压缩js */
function buildJsFn() {
  gutil.log(gutil.colors.green('building js'))
  return gulp.src(src.js)
    .pipe(babel({
      // presets: ['env']
    }))
    .on('error', err => handleError(err))
    .pipe(gulp.dest(dist.js)) // copy原始js
    // .pipe(gulpif(env, uglify()))
    // .on('error', err => handleError(err))
    .pipe(rename({            // 压缩添加.min
      suffix: '.min'
    }))
    .pipe(gulp.dest(dist.js))
}

/* img assets打包-压缩图片 */
function buildImgFn() {
  let imgFilter = filter(['**/*.jpg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.webp'], {restore: true})
  gutil.log(gutil.colors.green('building img'))
  return gulp.src(src.assets)
    .pipe(imgFilter)
    .pipe(gulpif(env, imagemin())) // env=true->production->压缩image
    .pipe(imgFilter.restore)
    .pipe(gulp.dest(dist.assets))
}
/* vendor 文件打包=>引入的外部资源库: jquery.min.js jquery.min.css... */
function buildVendorFn() {
  gutil.log(gutil.colors.green('building vendor'))
  return gulp.src(src.vendor)
    .pipe(gulp.dest(dist.vendor))
}

/* assets打包-拷贝assets目录 */
// function buildAssetsFn() {
//   gutil.log(gutil.colors.green('building assets'))
//   return
// }

/* md5打包-添加md5后缀 */
function buildMd5Fn() {
  gutil.log(gutil.colors.green('building md5'))
  return
}

/* 处理error */
function handleError(err) {
  if (err.message) {
    gutil.log(gutil.colors.red('Error:' + err.message))
  } else {
    gutil.log(gutil.colors.red('Error:' + err))
  }
  this.emit('end')
}

/* default task */
gulp.task('default', () => {
  if (serve) {
    runSequence(['clean'], ['build'], ['serve'], ['watch'])
  } else {
    runSequence(['clean'], ['build'])
  }
})

/* dev task: 开发调试task */
// gulp.task('dev', () => runSequence(['clean'], ['build'], ['serve', 'watch']))

/* clean task */
gulp.task('clean', () => cleanFn())

/* build task */
gulp.task('build', () => runSequence(['buildHtml'],['buildCss'], ['buildJs'], ['buildImg'], ['buildVendor']))
/* buildHtml task */
gulp.task('buildHtml', () => buildHtmlFn())
/* buildCss task */
gulp.task('buildCss', () => buildCssFn())
/* buildJs task */
gulp.task('buildJs', () => buildJsFn())
/* buildImg task */
gulp.task('buildImg', () => buildImgFn())
/* buildVendor task */
gulp.task('buildVendor', () => buildVendorFn())
/* buildMd5 task */
gulp.task('buildMd5', () => buildMd5Fn())

/* serve task: 启动server */
gulp.task('serve', () => browserSync.init({
  server: './dist',
  port: 8080
}))
/* reload task */
gulp.task('reload', () => browserSync.reload())

/* watch task: 监视文件改动 */
// gulp.task('watch', () => gulp.watch(['./src/**/*'], () => runSequence(['build'],['reload'])))

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['buildJs', 'reload'])
  gulp.watch('src/**/*.scss', ['buildCss', 'reload'])
  gulp.watch('src/**/*.html', ['buildHtml', 'reload'])
})
/* reload task: 刷新浏览器 */

gulp.task('watchJs', () => {
  watchFile(src.js, batch((events, cb) => {
    gutil.log(gutil.colors.yellow(events.type))
    gulp.start(['buildJs','reload'], cb)
  }))
})

gulp.task('watchCss', () => {
  watchFile(src.css, batch((events, cb) => {
    gutil.log(gutil.colors.yellow(events.type))
    gulp.start(['buildCss', 'reload'], cb)
  }))
})

gulp.task('watchHtml', () => {
  watchFile(src.html, batch((events, cb) => {
    gutil.log(gutil.colors.yellow(events.type))
    gulp.start(['buildHtml', 'reload'], cb)
  }))
})
