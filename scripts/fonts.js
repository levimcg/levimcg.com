const jetpack = require('fs-jetpack')
const sourcePath = `node_modules/@fontsource`
const destPath = `src/fonts`

const fonts = {
  'source-serif-pro': [
    `source-serif-pro-latin-400-italic.woff`,
    `source-serif-pro-latin-400-italic.woff2`,
    `source-serif-pro-latin-400-normal.woff`,
    `source-serif-pro-latin-400-normal.woff2`,
    `source-serif-pro-latin-700-italic.woff`,
    `source-serif-pro-latin-700-italic.woff2`,
    `source-serif-pro-latin-700-normal.woff`,
    `source-serif-pro-latin-700-normal.woff2`,
    `source-serif-pro-latin-600-italic.woff`,
    `source-serif-pro-latin-600-italic.woff2`,
    `source-serif-pro-latin-600-normal.woff`,
    `source-serif-pro-latin-600-normal.woff2`,

  ],
  'source-sans-pro': [
    `source-sans-pro-latin-400-normal.woff`,
    `source-sans-pro-latin-400-normal.woff2`,
    `source-sans-pro-latin-400-italic.woff`,
    `source-sans-pro-latin-400-italic.woff2`,
    `source-sans-pro-latin-700-normal.woff`,
    `source-sans-pro-latin-700-normal.woff2`,
    `source-sans-pro-latin-700-italic.woff`,
    `source-sans-pro-latin-700-italic.woff2`
  ]
}

for (let family in fonts) {
  fonts[family].forEach(font => {
    jetpack.copy(`${sourcePath}/${family}/files/${font}`, `${destPath}/${font}`, { overwrite: true })
  })
}