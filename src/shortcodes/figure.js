module.exports= params => `
<figure class="${params.classes || ''}">
  <img loading="lazy" src="${params.image}">
  <figcaption>${params.caption || '' }</figcaption>
</figure>
`;