const loaderUtils = require('loader-utils')

const mkAp = (arg) => (maybeFn) => typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn

module.exports = function (source) {
  const options = loaderUtils.getOptions(this)

  if (!options) return source
  const {
    layout = 'markdown.sgr',
    block = 'content'
  } = options

  const ap = mkAp(this.resourcePath)

  const [ , , noFrontMatter] = source.split('---')
  const indented = noFrontMatter.replace(/(\r\n|\n|\r)/g, '\n    ')

  const result = `
extends(src='${ap(layout)}')
block(name='${ap(block)}')
  .content(md). ${indented}
`
  return result
}
