/* llamando a la ventana para que cargen todas la funciones*/

window.addEventListener('load', function(event) {
  /* asignando valores*/
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;
  /* Incorporando evento submit*/
  form.addEventListener('submit', function(event){
    event.preventDefault();
    responseContainer.innerHTML= '';
    searchedForText = searchField.value;
    getNews();
  })
  /* función para crear peticiones*/
  function getNews(){
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `https://api.nytimes.com/svc/books/v3/lists/overview.json?q=${searchedForText}&api-key=<65082f4668484e9484931f976feb3d4c>`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    articleRequest.send();
  }
  function  handleError(){
    console.log('se ha presentado un error');
  }
  function addNews(){
    const data = JSON.parse(this.responseText);
    const response = data.response;
    console.log(response);
  }
});
