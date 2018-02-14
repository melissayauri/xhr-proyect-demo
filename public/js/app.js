/* llamando a la ventana para que cargen todas la funciones*/
window.addEventListener('load', function() {
  /* asignando valores*/
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;
  /* Incorporando evento submit*/
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNews();
  });
  /* función para crear peticiones*/
  function getNews() {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=65082f4668484e9484931f976feb3d4c`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
  };
  function handleError() {
    console.log('se ha presentado un error');
  };
  function addNews() {
    const data = JSON.parse(this.responseText);
    const response = data.response;
    console.log(response);
    const article = data.response.docs;
    /* recorrido en la data*/
    article.forEach(function(value, i) {
      console.log(article[i]);
      /* variables*/
      const title = article[i].headline.main;
      const snippet = article[i].snippet;
      const web = article[i].web_url;
      const imgs = article[i].multimedia[0].url;
      console.log(imgs);
      console.log(web);
      /* creación del contenedor*/
      let container = document.createElement('div');
      container.className = 'articleClass';
      responseContainer.appendChild(container);
      /* creación del título*/
      let header = document.createElement('h5');
      header.className = 'title';
      container.appendChild(header);
      header.innerText = title;
      /* creación de la información*/
      let text = document.createElement('p');
      container.appendChild(text);
      text.innerText = snippet;
      /* creación del link para ver más información*/
      let moreText = document.createElement('a');
      moreText.className = 'link';
      moreText.innerText = 'Ver más';
      moreText.setAttribute('href', web);
      moreText.setAttribute('target', '_blank');
      container.appendChild(moreText);
      let imagen = document.createElement('img');
      imagen.setAttribute('src', `https://static01.nyt.com/${imgs}`);
      container.appendChild(imagen);
    });
  };
});
