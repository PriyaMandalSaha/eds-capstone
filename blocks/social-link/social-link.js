export default function decorate(block) {
  const mediaLinksDiv = block.querySelector('p');

  if (mediaLinksDiv) {
    const aTags = mediaLinksDiv.querySelectorAll('a');

    aTags.forEach((aTag) => {
      const title = aTag.getAttribute('title');

      if (title) {
        const className = `${title.toLowerCase().replace(/\s+/g, '-')}-link`;
        aTag.classList.add(className);
      }
    });

    block.append(mediaLinksDiv);
  }
}
