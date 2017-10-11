const b = require('substance-bundler')
const substancePath = require.resolve('substance')
const momentPath = require.resolve('moment')
const DIST = 'dist/'

function _substance() {
  b.make('substance', 'lib')
}

function _buildDist() {
  _substance()
  _buildLib(DIST, 'browser')
  _buildLib(DIST, 'browser:legacy')
  _buildLib(DIST, 'nodejs')
  _buildCSS(DIST)
}

b.task('clean', function() {
  b.rm(DIST)
})

b.task('lib', function() {
  b.rm(DIST)
  _buildDist()
})

b.task('default', ['clean', 'lib'])

b.task('dev', ['default'])

/* HELPERS */

function _buildLib(DEST, platform) {
  let source = './index.es.js'
  let external = ['substance']
  let targets = []
  if (platform === 'browser' || platform === 'all') {
    targets.push({
      dest: DEST+'archivist.js',
      format: 'umd', moduleName: 'archivist', sourceMapRoot: __dirname, sourceMapPrefix: 'archivist'
    })
  }
  if (platform === 'browser:legacy' || platform === 'all') {
    targets.push({
      dest: DEST+'archivist.es5.js',
      format: 'umd', moduleName: 'archivist', sourceMapRoot: __dirname, sourceMapPrefix: 'archivist',
      useStrict: false
    })
  }
  if (platform === 'nodejs' || platform === 'all') {
    source = './server.es.js'
    external = ['substance', 'massive', 'bluebird', 'password-generator', 'bcryptjs', 'args-js', 'ws']
    targets.push({
      dest: DEST+'archivist.cjs.js',
      format: 'cjs'
    })
  }
  if (platform === 'es' || platform === 'all') {
    targets.push({
      dest: DEST+'archivist.es.js',
      format: 'es'
    })
  }

  let config = {
    targets,
    commonjs: {
      include: [
        momentPath
      ]
    },
    external: external,
    globals: {
      'substance': 'substance'
    }
  }

  if(platform === 'browser:legacy') config.buble = true

  b.js(source, config)
}

function _buildCSS(DEST) {
  b.css('./styles/archivist.css', DEST+'archivist.css')
  b.css('./styles/archivist-pagestyle.css', DEST+'archivist-pagestyle.css')
  b.css(substancePath.replace('substance.cjs.js','') + 'substance-reset.css', DEST+'archivist-reset.css')
}
