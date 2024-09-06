import { createOptimizedPicture } from '../../scripts/aem.js';

async function createHtmlFromData(template, data, target) {
  const fragment = document.createDocumentFragment();

  data.forEach((row) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = template
      .replace(/{{path}}/g, row.path)
      .replace(/{{title}}/g, row.title)
      .replace(/{{description}}/g, row.description);

    const pictureElement = createOptimizedPicture(row.image, row.title, false, [{ width: '750' }]);
    const imageContainer = tempDiv.querySelector('.cards-list-image a');
    if (imageContainer) {
      imageContainer.appendChild(pictureElement);
    }
    fragment.appendChild(tempDiv.firstElementChild);
  });

  target.appendChild(fragment);
}

async function fetchDataAndRender(jsonURL, target) {
  try {
    const response = await fetch(jsonURL);
    if (!response.ok) {
      return; // Handle fetch error by exiting if response is not OK
    }

    const json = await response.json();

    const template = `
      <li>
        <div class="cards-list-image">
          <a href="{{path}}" title="{{title}}">
            <!-- Optimized picture will be inserted here -->
          </a>
        </div>
        <div class="cards-list-body">
          <a href="{{path}}" title="{{title}}">{{title}}</a>
          <p class="cards-list-paragraph">{{description}}</p>
        </div>
      </li>`;

    const filteredData = json.data.filter((row) => row.template === 'Magazine');

    createHtmlFromData(template, filteredData, target);
  } catch {
    // Handle error silently without console logs
  }
}

export default async function decorate(block) {
  const dataList = block.querySelector('a[href$=".json"]');
  const ulElement = document.createElement('ul'); // Create ul element

  if (dataList) {
    await fetchDataAndRender(dataList.href, ulElement);
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('cards-list-container');
    parentDiv.appendChild(ulElement);
    dataList.replaceWith(parentDiv);
  }
}
