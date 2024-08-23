export default function decorate(block) {
  const socialLinksDiv = block.querySelector('p');

  if (socialLinksDiv) {
    const aTags = socialLinksDiv.querySelectorAll('a');

    aTags.forEach((aTag) => {
      const title = aTag.getAttribute('title');

      if (title) {
        const className = `${title.toLowerCase().replace(/\s+/g, '-')}-link`;
        aTag.classList.add(className);
      }
    });

    block.append(socialLinksDiv);
  }
}
