window.onload = () => {
  const currencySymbol = '€';
  const products = [
    {
      name: '365 Signature Hoodie',
      price: '33.95',
      image: '../images/green-hoodie.png',
      colors: ['#99C3CC', '#CC9999', '#CB99CC', '#A6CC99'],
    },
    {
      name: 'Organic Skinny High Waist Jeans',
      price: '33.95',
      image: '../images/jeans.png',
      colors: ['#99C3CC', '#CC9999', '#CB99CC', '#A6CC99'],
    },
    {
      name: 'Organic Skinny High Waist Jeans',
      price: '33.95',
      image: '../images/blue-hoodie.png',
      colors: ['#99C3CC', '#CC9999', '#CB99CC', '#A6CC99'],
    },
  ];

  products.push(...products); // Better visualization for recommender swipe

  const getProductColorHTML = (colors) => {
    var productColorHTML = '';

    colors.forEach((color, index) => {
      productColorHTML += `<div class="product-color ${
        index === 0 ? 'active-color' : ''
      }" style="background-color: ${color}"></div>`;
    });

    return `<div class="product-color-wrapper">${productColorHTML}</div>`;
  };

  const appendProducts = () => {
    const $recommenderWraper = document.querySelector('.product-container');

    products.forEach((product) => {
      const productColorHTML = getProductColorHTML(product.colors);
      const productHTML = 
      `<div class="product-wrapper">
            <div class="product-image" style="background-image: url(${product.image})"></div>
            <div class="product-name">${product.name}</div>
            <div class="product-attributes">
                <div class="product-price">${currencySymbol}${product.price}</div>
                ${productColorHTML}
            </div>
        </div>`;

      $recommenderWraper.insertAdjacentHTML('beforeend', productHTML);
    });
  };

  const slideRecommender = (isRight) => {
    const $productContainer = document.querySelector('.product-container');
    let currentIndex = Number($productContainer.getAttribute('current-index'));

    if (!isRight && currentIndex === 0) {
      currentIndex = products.length - 1;
    }

    const nextIndex = (isRight ? currentIndex + 1 : currentIndex - 1) % (products.length - 1);

    $productContainer.style.transform = 'translateX(-' + nextIndex * 262 + 'px)';
    $productContainer.setAttribute('current-index', nextIndex);
  };

  appendProducts();

  document.querySelectorAll('.product-color').forEach((item) => {
    item.addEventListener('click', (event) => {
      if (!event.target.classList.contains('active-color')) {
        event.target.parentNode.querySelector('.active-color').classList.remove('active-color');

        event.target.classList.add('active-color');
      }
    });
  });

  document.querySelector('.slide-right').addEventListener('click', (event) => {
    slideRecommender(true);
  });

  document.querySelector('.slide-left').addEventListener('click', (event) => {
    slideRecommender(false);
  });
};
