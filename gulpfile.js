var browserify = require('browserify'),
    watchify = require('watchify'),
    Duo = require('duo'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    streamify = require('gulp-streamify'),
    source = require('vinyl-source-stream'),
    map = require('map-stream'),
    sourceFile = './client/db/index.js',
    destFolder = './public/db/',
    destFile = 'db.js';

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
 
gulp.task('watch', function() {
  var bundler = browserify(sourceFile,{debug: true, cache: {}, packageCache: {}});
  bundler = watchify(bundler);
  bundler.on('update', rebundle);
 
  function rebundle() {
    console.log('building new version')
    gulp.src('./client/db/index.css')
      .pipe(duo())
      .pipe(rename("db.css"))
      .pipe(gulp.dest(destFolder))
    return bundler.bundle()
      .on('error', function(err){
          console.log(err.message);
          this.end();
        })
      .pipe(source(destFile))
      .pipe(gulp.dest(destFolder));
  }
 
  return rebundle();
});

gulp.task('compress', function() {
  var bundler = browserify(sourceFile,{cache: {}, packageCache: {} }),
      bundle = function() {
        gulp.src('./client/db/index.css')
          .pipe(duo())
          .pipe(minifyCSS({cache:true}))
          .pipe(rename("db.css"))
          .pipe(gulp.dest(destFolder))
        return bundler
          .bundle()
          .pipe(source(destFile))
          .pipe(streamify(uglify()))
          .pipe(gulp.dest(destFolder));
      };
  return bundle();
});

function duo(opts) {
  opts = opts || {};

  return map(function (file, fn) {
    Duo(__dirname)
      .entry(file.path)
      .run(function (err, src) {
        if (err) {
          return fn(err);
        }

        file.contents = new Buffer(src);
        fn(null, file);
      });
  });
}
 
gulp.task('default', ['browserify', 'watch']);