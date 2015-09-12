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
    source = require('vinyl-source-stream');


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

// i18n tasks
// -------------

gulp.task('i18n', function () {
  gulp.src('./src/i18n/en.json')
    .pipe(gulp.dest('./public/i18n'));
  gulp.src('./src/i18n/ru.json')
    .pipe(gulp.dest('./public/i18n'));
});

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
        .transform(babelify)
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
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./public/writer'));
});

gulp.task('writer', ['writer-assets', 'writer-styles', 'writer-bundle']);


// Reader tasks
// -------------

gulp.task('reader-styles', function () {
  gulp.src('./src/reader/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("reader.css"))
    .pipe(gulp.dest('./public/reader'));
});

gulp.task('reader-bundle', function () {
  return gulp.src('./src/reader/app.js')
    .pipe(through2.obj(function (file, enc, next) {
      browserify(file.path)
        .transform(babelify)
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
    .pipe(rename('reader.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./public/reader'));
});

gulp.task('reader', ['reader-styles', 'reader-bundle']);


// Browser tasks
// -------------

gulp.task('browser-styles', function () {
  gulp.src('./src/browser/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("browser.css"))
    .pipe(gulp.dest('./public/browser'));
});

gulp.task('browser-bundle', function () {
  return gulp.src('./src/browser/app.js')
    .pipe(through2.obj(function (file, enc, next) {
      browserify(file.path)
        .transform(babelify)
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
    .pipe(rename('browser.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./public/browser'));
});

gulp.task('browser', ['browser-styles', 'browser-bundle']);


// Map tasks
// -------------

gulp.task('maps-assets', function () {
  gulp.src('./src/map/assets/**/*')
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('maps-styles', function () {
  gulp.src('./src/map/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("map.css"))
    .pipe(gulp.dest('./public/map'));
});

gulp.task('maps-bundle', function () {
  return gulp.src('./src/map/app.js')
    .pipe(through2.obj(function (file, enc, next) {
      browserify(file.path)
        .transform(babelify)
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
    .pipe(rename('map.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./public/map'));
});

gulp.task('maps', ['maps-assets', 'maps-styles', 'maps-bundle']);

// Resources browser tasks
// -------------

gulp.task('resources-styles', function () {
  gulp.src('./src/resources/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("resources.css"))
    .pipe(gulp.dest('./public/resources-browser'));
});

gulp.task('resources-bundle', function () {
  return gulp.src('./src/resources/app.js')
    .pipe(through2.obj(function (file, enc, next) {
      browserify(file.path)
        .transform(babelify)
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
    .pipe(rename('resources.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./public/resources-browser'));
});

gulp.task('resources', ['resources-styles', 'resources-bundle']);

// Memorial specific tasks
// -------------

gulp.task('memo-styles', function () {
  gulp.src('./src/memorial/menu.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("main-menu.css"))
    .pipe(gulp.dest('./public/assets/styles'));
});

gulp.task('memo-ga', function () {
  gulp.src('./src/memorial/ga.js')
    .pipe(gulp.dest('./public/assets/javascripts'));
});

gulp.task('memo-assets', function () {
  gulp.src('./src/memorial/img/**/*')
    .pipe(gulp.dest('./public/assets/img'));
});

gulp.task('memo', ['memo-styles', 'memo-ga', 'memo-assets']);

gulp.task('default', ['manager', 'i18n', 'writer', 'reader', 'browser', 'resources', 'maps', 'memo']);