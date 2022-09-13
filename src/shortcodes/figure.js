module.exports= params => `
<figure class="${params.classes || ''}">
  <img loading="lazy" src="${params.image}">
  ${params.caption ? `<figcaption>${params.caption}</figcaption>` : ''}
</figure>
`;