import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const classes = ['sections'];
  classes.forEach((c, i) => {
    const section = footer.children[i];
    if (section) section.classList.add(`footer-nav-${c}`);
  });

  // footer.classList.add('footer-nav-brand');
  const footerNav = footer.querySelector('.footer-nav-sections');
  // const brandLink = footerNav.querySelector('.button');
  if(footerNav) {
    const brandFooterImage = document.createElement('img');
    const brandFooterLogoLink = document.createElement('a');
    brandFooterImage.src = '../../img/wknd-logo-light.svg';
    brandFooterImage.alt = 'Brand Logo';
    brandFooterImage.classList.add('footer-logo-img');
    brandFooterLogoLink.href = '/us/en';
    brandFooterLogoLink.classList.add('footer-logo-link');
    footerNav.prepend(brandFooterImage);
    brandFooterLogoLink.appendChild(brandFooterImage);

    footerNav.prepend(brandFooterLogoLink);
    footer.prepend(footerNav);
  }

  block.append(footer);
}
