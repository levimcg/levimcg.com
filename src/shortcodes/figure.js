module.exports= params => `
<figure class="${params.classes || ''}">
  <img src="${params.image}">
  <figcaption>${params.caption}</figcaption>
</figure>
`;