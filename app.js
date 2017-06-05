const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const Collections = require('spike-collections')

const locals = {
  foo: 'bar'
}
const collections = new Collections({
  addDataTo: locals,
  collections: {
    posts: { files: 'posts/**' }
  }
})

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.{sgr,md}',
    css: '*(**/)*.sss'
  },
  ignore: [
    '**/layout.sgr',
    '**/_*',
    '**/.*',
    'readme.md',
    'yarn.lock',
    '!**/_redirects' // still not working...
  ],
  reshape: htmlStandards({
    locals: (ctx) => { return collections.locals(ctx, locals) }
    // locals: { pageId: pageId(ctx), foo: 'bar'}
  }),
  postcss: cssStandards(),
  babel: jsStandards(),
  plugins: [
    collections
  ],
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [{
          loader: './util/layout-loader',
          options: {
            layout: '_markdown_layout.sgr'
          }
        }],
        enforce: 'pre'
      }
    ]
  }
}
