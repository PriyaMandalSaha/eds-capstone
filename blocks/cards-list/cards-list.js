import { createHtmlFromData } from '../../utils/helper.js';

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
