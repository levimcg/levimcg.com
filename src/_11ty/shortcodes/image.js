const Image = require('@11ty/eleventy-img')

module.exports = async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [420, 780, 1280],
    formats: ["webp", "jpeg"],
    outputDir: './build/img/'
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: 'inline'
  });
}