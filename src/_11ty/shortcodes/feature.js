module.exports = (content, classes) => {
  return `<div class="feature ${classes || ''}">
${content}
</div>
`
}