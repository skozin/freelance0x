var path = require('path')
var util = require('util')
var openBrowser = require('react-dev-utils/openBrowser')

var argv = require('yargs').argv
var isDevServer = argv['$0'].indexOf('webpack-dev-server') >= 0

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = isDevServer ? 'development' : 'production'
}

var appDir = argv.env ? argv.env.appDir : undefined
if (!appDir) {
  throw new Error('you must pass --env.appDir command-line option pointing ' +
    'to the target app directory (which contains build.config.js file)')
}

var contextDir = path.resolve(process.cwd(), appDir)
var buildConfig = require(path.resolve(contextDir, 'build.config.js'))

var dev = process.env.NODE_ENV === 'development'
var uglify = !dev && process.env.UGLIFY !== '0'

var options = module.exports = {
  isDevServer: isDevServer,
  dev: dev,
  uglify: uglify,
  publicUrl: appendTrailingSlashIfNeeded(buildConfig.publicUrl),
  devServerPort: buildConfig.devServerPort,
  paths: {
    appEntryPoint: buildConfig.paths.appEntryPoint,
    indexHtml: buildConfig.paths.indexHtml,
    output: buildConfig.paths.output,
  },
  env: {
    DEBUG: dev,
    'process.env': {
      NODE_ENV: dev ? '"development"' : '"production"'
    },
  }
}

options.paths = Object.keys(options.paths).reduce((resolvedPaths, key) => {
  resolvedPaths[key] = path.resolve(contextDir, options.paths[key])
  return resolvedPaths
}, {})

options.paths.context = contextDir


console.error('Using options:', util.inspect(options, {
  colors: process.stdout.isTTY,
  depth: 100
}))


if (isDevServer && process.stdout.isTTY) {
  var openPage = function() {
    openBrowser('http://localhost:' + options.devServerPort + options.publicUrl)
  }
  setTimeout(openPage, 1000)
}


function appendTrailingSlashIfNeeded(url) {
  return /[/]$/.test(url) ? url : url + '/'
}
