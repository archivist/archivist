var browserify = require('browserify'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    babelify = require('babelify'),
    through2 = require('through2'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    importCSS = require('gulp-import-css'),
    minifyCSS = require('gulp-minify-css'),
    streamify = require('gulp-streamify'),
    buffer = require('vinyl-buffer')
    source = require('vinyl-source-stream'),
    sourceFile = './src/index.js',
    destFolder = './public/platform/',
    destFile = 'index.js',
    composerSourceFile = './boot_archivist_composer.js',
    composerDestFolder = './public/composer/';


// Manager tasks
// -------------

gulp.task('manager-assets', function () {
  gulp.src('./src/manager/assets/**/*')
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('manager-bundle', function() {
  var bundler = browserify('./src/manager/index.js', {cache: {}, packageCache: {} }),
      bundle = function() {
        gulp.src('./src/manager/index.css')
          .pipe(importCSS())
          .pipe(minifyCSS({cache:true}))
          .pipe(rename("manager.css"))
          .pipe(gulp.dest('./public/manager'))
        bundler
          .bundle()
          .pipe(source('manager.js'))
          .pipe(streamify(uglify()))
          .pipe(gulp.dest('./public/manager'));
      };
  return bundle();
});

gulp.task('manager', ['manager-assets', 'manager-bundle']);

// Writer tasks
// -------------

gulp.task('writer-assets', function () {
  gulp.src('./src/writer/assets/**/*')
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('writer-styles', function () {
  gulp.src('./src/writer/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("writer.css"))
    .pipe(gulp.dest('./public/writer'));
});

gulp.task('writer-bundle', function () {
  return gulp.src('./src/writer/app.js')
    .pipe(through2.obj(function (file, enc, next) {
      browserify(file.path)
        //.transform(babelify)
        .bundle(function (err, res) {
          if (err) { return next(err); }
          file.contents = res;
          next(null, file);
        });
    }))
    .on('error', function (error) {
      console.log(error.stack);
      this.emit('end');
    })
    .pipe(rename('writer.js'))
    //.pipe(streamify(uglify()))
    .pipe(gulp.dest('./public/writer'));
});

gulp.task('writer-compress', function() {
  gulp.src('./public/writer/writer.js')
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./public/writer'));
});

gulp.task('writer', ['writer-assets', 'writer-styles', 'writer-bundle']);

gulp.task('default', ['manager', 'writer']);

gulp.task('assets', function () {
  gulp.src('./app/assets/*')
    .pipe(gulp.dest('./dist'));
});

gulp.task('browserify', function() {
  var bundler = browserify(sourceFile,{ debug: true, cache: {}, packageCache: {} }),
      bundle = function() {
        return bundler
          .bundle()
          .pipe(source(destFile))
          .pipe(gulp.dest(destFolder));
      };
  return bundle();
});

gulp.task('compress', function() {
  var bundler = browserify(sourceFile,{cache: {}, packageCache: {} }),
      bundle = function() {
        gulp.src('./src/index.css')
          .pipe(importCSS())
          .pipe(minifyCSS({cache:true}))
          .pipe(rename("index.css"))
          .pipe(gulp.dest(destFolder))
        bundler
          .bundle()
          .pipe(source(destFile))
          .pipe(streamify(uglify()))
          .pipe(gulp.dest(destFolder));
      };
  return bundle();
});

gulp.task('bundle-composer', function() {
  var bundler = browserify(composerSourceFile, {cache: {}, packageCache: {} }),
      bundle = function() {
        gulp.src('./node_modules/archivist-composer/styles/composer.css')
          .pipe(minifyCSS({cache:true}))
          .pipe(rename("composer.css"))
          .pipe(gulp.dest(composerDestFolder));

        gulp.src("./node_modules/archivist-composer/lib/**/*")
          .pipe(gulp.dest(composerDestFolder+"/lib"));

        bundler
          .bundle()
          .pipe(source(destFile))
          .pipe(streamify(uglify()))
          .pipe(rename("composer.js"))
          .pipe(gulp.dest(composerDestFolder));
      };

  return bundle();
});