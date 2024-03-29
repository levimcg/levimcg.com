const jetpack = require('fs-jetpack')
const sourcePath = `node_modules/@fontsource`
const destPath = `src/fonts`

const fonts = {
  'source-code-pro': [
    `source-code-pro-latin-400-italic.woff`,
    `source-code-pro-latin-400-italic.woff2`,
    `source-code-pro-latin-400-normal.woff`,
    `source-code-pro-latin-400-normal.woff2`,
  ],
  'source-sans-pro': [
    `source-sans-pro-latin-400-normal.woff`,
    `source-sans-pro-latin-400-normal.woff2`,
    `source-sans-pro-latin-400-italic.woff`,
    `source-sans-pro-latin-400-italic.woff2`,
    `source-sans-pro-latin-700-normal.woff`,
    `source-sans-pro-latin-700-normal.woff2`,
    `source-sans-pro-latin-700-italic.woff`,
    `source-sans-pro-latin-700-italic.woff2`,
    `source-sans-pro-latin-900-normal.woff`,
    `source-sans-pro-latin-900-normal.woff2`,
    `source-sans-pro-latin-900-italic.woff`,
    `source-sans-pro-latin-900-italic.woff2`
  ]
}

for (let family in fonts) {
  fonts[family].forEach(font => {
    jetpack.copy(`${sourcePath}/${family}/files/${font}`, `${destPath}/${font}`, { overwrite: true })
  })
}