const header = document.getElementById('header');
const input = document.getElementById('range');
const subtitle = document.getElementById('percent');
const block = document.querySelector('.block');
const height = document.querySelector('body')?.offsetHeight || 0;
const maxHeight = height - window.innerHeight;
const star = document.getElementById('star');
let counterForBg = 3;

window.addEventListener('load', () => {
  if (input && subtitle && star) {
    input.value = 0;
    subtitle.innerHTML = '0%';
    star.style.display = 'none';
  }
});

function onScroll () {
  const position = maxHeight - window.scrollY;
  const heightInPercent = position / (maxHeight / 100);
  const result = 100 - heightInPercent;
  if (Math.round(result) > 99 && subtitle && header && star) {
    header.style.display = 'none';
    star.style.display = 'block';
    return;
  }
  if (subtitle && input && header && star) {
    input.value = result;
    subtitle.innerHTML = `${Math.round(result)}%`;
    header.style.display = 'block';
    star.style.display = 'none';
  }
};

function onChange (event) {
  const inputValue = event.currentTarget.value;
  if (inputValue === '100' && header && star) {
    header.style.display = 'none';
    star.style.display = 'block';
    return;
  }
  if (subtitle && star) {
    const test = (maxHeight / 100) * inputValue;
    window.scroll(0, test);
    subtitle.innerHTML = `${inputValue}%`;
    star.style.display = 'none';
    return;
  }
}

function onScrollBlock () {
  const addElements = block.scrollHeight === block.clientHeight + block?.scrollTop
  if (addElements) {
    for (let step = 0; step < 10; step++ ) {
      let element = document.createElement('div');
      counterForBg = counterForBg + 1;
      if (counterForBg%3  === 0) {
        element.className = 'block__element--1';
        block.appendChild(element);
      }
      if (counterForBg%3  === 1) {
        element.className = 'block__element--2';
        block.appendChild(element);
      }
      if (counterForBg%3 === 2) {
        element.className = 'block__element--3';
        block.appendChild(element);
      }
    }
  }
};

window.addEventListener('scroll', onScroll);
block?.addEventListener('scroll', onScrollBlock);
input?.addEventListener('change', onChange);
