module.exports = (content, classes) => {
  return `<div class="article-layout__hero ${classes || ''}">
${content}
</div>
`
}