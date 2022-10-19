module.exports= props => `
<figure class="${props.classes || ''}">
  <img loading="lazy" src="${props.image}" alt="${props.altText || ''}">
  ${props.caption ? `<figcaption>${props.caption}</figcaption>` : ''}
</figure>
`;