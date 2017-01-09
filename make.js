var b = require('substance-bundler');
var fs = require('fs')
var config = require('config')

b.task('clean', function() {
  b.rm('./dist')
})

// copy assets
b.task('assets', function() {
  b.copy('node_modules/font-awesome', './dist/font-awesome')
})

// this optional task makes it easier to work on Substance core
b.task('substance', function() {
  b.make('substance', 'clean', 'browser', 'server')
  b.copy('node_modules/substance/dist', './dist/substance')
})

function buildApp(app, core) {
  return function() {
    if(core) {
      _archvistJS()
      b.css('./node_modules/substance/dist/substance-pagestyle.css', 'dist/archivist/archivist-pagestyle.css', {variables: true})
      b.css('./node_modules/substance/dist/substance-reset.css', 'dist/archivist/archivist-reset.css', {variables: true})
    }
    b.copy('client/'+app+'/index.html', './dist/'+app+'/')
    b.copy('client/'+app+'/assets', './dist/'+app+'/assets/')
    b.css('./client/' + app + '/app.css', 'dist/' + app + '/' + app + '.css', {variables: true})
    b.js('client/' + app + '/app.js', {
      // need buble if we want to minify later
      buble: true,
      external: ['substance'],
      commonjs: { include: ['node_modules/lodash/**', 'node_modules/moment/moment.js', 'node_modules/plyr/src/js/plyr.js'] },
      dest: './dist/' + app + '/app.js',
      format: 'umd',
      moduleName: app
    })
    b.custom('injecting config', {
      src: './dist/' + app + '/app.js',
      dest: './dist/' + app + '/' + app + '.js',
      execute: function(file) {
        const code = fs.readFileSync(file[0], 'utf8')
        const result = code.replace(/ARCHIVISTCONFIG/g, JSON.stringify(config.get('app')))
        fs.writeFileSync(this.outputs[0], result, 'utf8')
      }      
    })
    b.copy('./dist/' + app + '/app.js.map', './dist/' + app + '/' + app + '.js.map')
    b.rm('./dist/' + app + '/app.js')
    b.rm('./dist/' + app + '/app.js.map')
  }
}

function _archvistJS() {
  b.js('./index.es.js', {
    buble: true,
    external: ['substance'],
    commonjs: { include: ['node_modules/lodash/**'] },
    targets: [{
      dest: 'dist/archivist/archivist.cjs.js',
      format: 'cjs', sourceMapRoot: __dirname, sourceMapPrefix: 'archivist'
    }]
  })
}

b.task('publisher', ['clean', 'substance', 'assets'], buildApp('publisher', true))
b.task('scholar', buildApp('scholar'))

b.task('client', ['publisher', 'scholar'])

// build all
b.task('default', ['client'])

// starts a server when CLI argument '-s' is set
b.setServerPort(5001)
b.serve({
  static: true, route: '/', folder: 'dist'
});