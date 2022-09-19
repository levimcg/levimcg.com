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
  'public-sans': [
    `public-sans-latin-400-normal.woff`,
    `public-sans-latin-400-normal.woff2`,
    `public-sans-latin-400-italic.woff`,
    `public-sans-latin-400-italic.woff2`,
    `public-sans-latin-700-normal.woff`,
    `public-sans-latin-700-normal.woff2`,
    `public-sans-latin-700-italic.woff`,
    `public-sans-latin-700-italic.woff2`
  ]
}

for (let family in fonts) {
  fonts[family].forEach(font => {
    jetpack.copy(`${sourcePath}/${family}/files/${font}`, `${destPath}/${font}`, { overwrite: true })
  })
}