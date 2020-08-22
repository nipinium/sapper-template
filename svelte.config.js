const path = require('path')
const sass = require('node-sass')
const prep = require('svelte-preprocess')

module.exports = {
  preprocess: {
    ...prep({ typescript: { transpileOnly: true } }),
    style: async ({ content, attributes, filename }) => {
      if (content.length === 0) return { code: content }

      const { type, lang } = attributes
      if (type !== 'text/scss' && lang !== 'scss') return

      const prepend_content = '@import "@nipin/mould/css/essence";\n'
      content = prepend_content + content

      const options = {
        data: content,
        sourceMap: true,
        includePaths: [
          path.dirname(filename),
          path.resolve(__dirname, 'src/styles'),
          path.resolve(__dirname, 'node_modules'),
        ],
        outFile: filename + '.css',
      }

      return new Promise((resolve, reject) => {
        sass.render(options, (err, result) => {
          if (err) return reject(err)
          resolve({
            code: result.css.toString(),
            map: result.map.toString(),
          })
        })
      })
    },
  },
}
