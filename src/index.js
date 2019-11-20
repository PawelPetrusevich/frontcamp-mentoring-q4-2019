import  getSelectedItem  from './selectExtension.js';
import  UriBuilder  from './uriBuilder.js';

const languageDropDownName = "languageList";
const categoryDropDownName = "categoryList";
const apiKey = "b4207d5caddc4695852d9539c73183a3";
const sourceBaseUri = 'https://newsapi.org/v2';
const sourceRelativeUri = '/sources?';
const newsBaseUri = 'https://newsapi.org/v2';
const newsRelativeUri = '/top-headlines?';

document.getElementById('searchSubmit').onclick = searchSources;

async function fetchAsync(url) {
    let response = await fetch(url)

    if(!response.ok){
        throw new Error("Some error");
    }

    let data = await response.json();
    return data;
}

function searchSources(){
    let language = getSelectedItem(languageDropDownName);
    let category = getSelectedItem(categoryDropDownName);
    let uriBuilder = new UriBuilder(sourceBaseUri,sourceRelativeUri);
    if(language) {
        uriBuilder.addParameter("language",language);
    }
    if(category) {
        uriBuilder.addParameter("category",category);
    }

    uriBuilder.addParameter("apiKey",apiKey);

    var url = uriBuilder.build();

    fetchAsync(url)
        .then(data=> displaySources(data.sources));
}

function displaySources(sources){
    var oldUl = document.getElementById('newsSourceList');
    var newUl = document.createElement('ul');    
    newUl.id = 'newsSourceList';

    sources.forEach(element => {
        var li = document.createElement('li');
        li.innerHTML = element.name;
        li.dataset.value = element.id;
        li.onclick = searchNewsBySource;
        newUl.append(li);
    });

    oldUl.replaceWith(newUl);
}

function searchNewsBySource(event){
    var sourceId = event.currentTarget.dataset.value;
    var urlBuilder = new UriBuilder(newsBaseUri,newsRelativeUri);
    urlBuilder.addParameter("sources",sourceId);
    urlBuilder.addParameter("apiKey",apiKey);
    var url = urlBuilder.build();

    fetchAsync(url)
        .then(data => displayNews(data.articles));
}

function displayNews(newsList){
    var oldNewsList = document.getElementById("newsList");
    var newNewsList = document.createElement('div');
    newNewsList.id = 'newsList';

    newsList.forEach(element => {
        var newsDiv = document.createElement('div');
        newsDiv.classList.add = 'news-item';
        var newsItemHeader = document.createElement('h5');
        var newsItemBody = document.createElement('p');
        var newsItemLink = document.createElement('a');

        newsItemHeader.innerHTML = element.title;
        newsItemBody.innerHTML = element.content;
        newsItemLink.href = element.url;
        newsItemLink.innerHTML = 'Read full...';
        newsItemLink.setAttribute('target','_blank'); 

        newsDiv.append(newsItemHeader,newsItemBody,newsItemLink);
        newNewsList.append(newsDiv);
    })

    oldNewsList.replaceWith(newNewsList);
}