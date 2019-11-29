import  getSelectedItem  from './selectExtension.js';
import  UriBuilder  from './uriBuilder.js';
import SubscribeOnError from './ErrorHandler.js';
import  ApiFactory  from "./repository/ApiFactory.js";
import NewsController from './controllers/newsController.js'

const languageDropDownName = "languageList";
const categoryDropDownName = "categoryList";
const apiKey = "b4207d5caddc4695852d9539c73183a3";
const sourceBaseUri = 'https://newsapi.org/v2';
const sourceRelativeUri = '/sources?';
const newsBaseUri = 'https://newsapi.org/v2';
const newsRelativeUri = '/top-headlines?';

window.addEventListener('error', err => {
    var params = {
        time : 1000
    };
    SubscribeOnError(err,params);
})

document.getElementById('searchSubmit').onclick = searchSources;

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

    var apiFactory = new ApiFactory();
    var request = apiFactory.create('GET',url)

    request.fetchAsync()
        .then(data=> displaySources(data.sources))
        .catch(function(err){
            setTimeout(function() { throw err; });
        });
}

function displaySources(sources){
    var oldUl = document.getElementById('newsSourceList');
    var newUl = document.createElement('ul');    
    newUl.id = 'newsSourceList';

    sources.forEach(element => {
        var li = document.createElement('li');
        li.className = 'source-item';
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

    var apiFactory = new ApiFactory();
    var request = apiFactory.create('GET',url)

    request.fetchAsync()
        .then(data => displayNews(data.articles));
}

function displayNews(newsList){
    var oldNewsList = document.getElementById("newsList");
    var newNewsList = document.createElement('div');
    newNewsList.id = 'newsList';

    newsList.forEach(element => {
        var newsDiv = document.createElement('div');
        newsDiv.className = 'news-item';
        var newsItemHeader = document.createElement('h4');
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