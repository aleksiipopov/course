const loader = document.getElementById('loader');
const block = document.getElementById('block');
const listOfArticles = [];

function requestOfDate () {
  return fetch('https://api.punkapi.com/v2/beers/random', {method: 'GET'})
  .then(data => {
    return data.json()
  });
}

function openTaglineByClick (event) {
  const target = event.currentTarget;
  const lastElement = target.children.length - 1;
  const arrayOfClassNames = target.children[lastElement].classList;
  if (arrayOfClassNames[arrayOfClassNames.length - 1] === 'flex') {
    target.children[lastElement].className = [arrayOfClassNames[0], 'hidden'].join(' ');
    return;
  }
  target.children[lastElement].className = [arrayOfClassNames[0], 'flex'].join(' ')
}

function renderContent (listOfArticles) {
    if (loader) {
      loader.className = 'hidden';
    }
    listOfArticles.forEach(item => {
      const wrapper = document.createElement('div');
      wrapper.className = 'article';
      
      const articleTagline = document.createElement('div');
      articleTagline.className = 'article__tagline';
      articleTagline.innerHTML = `Tagline: ${item[0].tagline}`;
      
      const image = item[0].image_url && document.createElement('img');
      if (item[0].image_url) {
        image.src = item[0].image_url;
        image.alt = item[0].name;
      };
      
      const articleBlock = document.createElement('div');
      articleBlock.onclick = openTaglineByClick;
      articleBlock.className = 'article__block';

      const articleContent = document.createElement('div');
      articleContent.className = 'article__content';

      const articleTitle = document.createElement('h2');
      articleTitle.innerHTML = `Name: ${item[0].name}`;

      const articleDescription = document.createElement('p');
      articleDescription.innerHTML = `Description: ${item[0].description}`;

      articleContent.appendChild(articleTitle);
      articleContent.appendChild(articleDescription);
      articleBlock.appendChild(articleContent);
      articleBlock.appendChild(articleTagline);

      if (item[0].image_url) {
        wrapper.appendChild(image);
      };
      wrapper.appendChild(articleBlock);

      if (block) {
        block.appendChild(wrapper);
      }
    })
}

window.addEventListener('load', () => {
  const arrayOfRequests = [];
  for (let step = 0; step < 10; step++) {
    arrayOfRequests.push(requestOfDate());
  };
  Promise.all(arrayOfRequests).then(data => {
    return data;
  }).then(res => {
      renderContent(res);
  });
})
