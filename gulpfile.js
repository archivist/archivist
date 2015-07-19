var browserify = require('browserify'),
    watchify = require('watchify'),
    //Duo = require('duo'),
    gulp = require('gulp'),
    //gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    importCSS = require('gulp-import-css'),
    minifyCSS = require('gulp-minify-css'),
    streamify = require('gulp-streamify'),
    source = require('vinyl-source-stream'),
    //map = require('map-stream'),
    sourceFile = './src/index.js',
    destFolder = './public/platform/',
    destFile = 'index.js',
    composerSourceFile = './boot_archivist_composer.js',
    composerDestFolder = './public/composer/';

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
          //.pipe(streamify(uglify()))
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

gulp.task('default', ['browserify', 'bundle-composer']);