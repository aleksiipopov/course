const loader = document.getElementById('loader');
const block = document.getElementById('block');
const title = document.getElementById('title');
const listOfArticles = [];

async function requestOfDate () {
  const response = await fetch('https://api.punkapi.com/v2/beers/random', {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
}

function onClick (event) {
  const target = event.currentTarget;
  const lastElement = target.children.length - 1;
  if (target.children[lastElement].style.display === 'flex') {
    target.children[lastElement].style.display = 'none';
    return;
  }
  target.children[lastElement].style.display = 'flex';
}

window.addEventListener('load', async () => {
  for (let step = 0; step < 10; step++) {
    const article = await requestOfDate();
    listOfArticles.push(article);
  };
  if (listOfArticles.length === 10 && loader) {
    // @ts-ignore
    loader.style.display = 'none';
    // @ts-ignore
    title.style.display = 'block';
    listOfArticles.forEach(item => {
      const wrapper = document.createElement('div');
      wrapper.className = 'article';
      
      const articleTagline = document.createElement('div');
      articleTagline.className = 'article__tagline';
      articleTagline.innerHTML = `Tagline: ${item[0].tagline}`;
      
      const image = document.createElement('img');
      if (item[0].image_url) {
        image.src = item[0].image_url;
        image.alt = item[0].name;
      };
      
      const articleBlock = document.createElement('div');
      articleBlock.onclick = onClick;
      articleBlock.className = 'article__block';

      const articleContent = document.createElement('div');
      articleContent.className = 'article__content';

      const articleTitle = document.createElement('h2');
      articleTitle.innerHTML = `Name: ${item[0].name}`;

      const articleDescription = document.createElement('p');
      articleDescription.innerHTML = `Description: ${item[0].description}`

      articleContent.appendChild(articleTitle);
      articleContent.appendChild(articleDescription);
      articleBlock.appendChild(articleContent);
      articleBlock.appendChild(articleTagline);

      if (item[0].image_url) {
        wrapper.appendChild(image);
      };
      wrapper.appendChild(articleBlock);

      // @ts-ignore
      block?.appendChild(wrapper);
    })
  }
})
