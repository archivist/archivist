var b = require('substance-bundler');
var fs = require('fs')
var config = require('config')

var DIST = 'dist/'

function _substanceCSS(DEST) {
  b.make('substance', 'css')
}

function _buildServerArchivistJS(DEST) {
  b.js('./server.es.js', {
    buble: true,
    commonjs: true,
    external: ['substance', 'moment', 'massive', 'bluebird', 'password-generator', 'bcryptjs', 'args-js'],
    targets: [{
      dest: DEST + 'archivist.cjs.js',
      format: 'cjs', 
      sourceMapRoot: __dirname, 
      sourceMapPrefix: 'archivist'
    }]
  })
}

function _buildBrowserArchivist(DEST) {
  b.js('./index.es.js', {
    buble: true,
    external: ['substance'],
    targets: [{
      useStrict: false,
      dest: DEST + 'archivist.js',
      format: 'umd', moduleName: 'archivist', sourceMapRoot: __dirname, sourceMapPrefix: 'archivist'
    }]
  })
}

function _buildDist(DEST, dependency) {
  var path = './node_modules/'
  if(dependency) path = '../'
  // Bundle Substance and Archivist
  _substanceCSS(DEST+'substance')
  _buildServerArchivistJS(DEST)
  _buildBrowserArchivist(DEST)
  // Bundle CSS
  b.css('archivist.css', DEST+'archivist.css', {variables: true})
  b.css(path + 'substance/substance-pagestyle.css', DEST+'archivist-pagestyle.css', {variables: true})
  b.css(path + 'substance/substance-reset.css', DEST+'archivist-reset.css', {variables: true})
}

b.task('build', function() {
  b.rm(DIST)
  _buildDist(DIST, true)
})

b.task('dev', function() {
  b.rm(DIST)
  _buildDist(DIST, false)
})

b.task('default', ['dev'])
