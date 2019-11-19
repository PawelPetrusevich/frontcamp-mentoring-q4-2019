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
        li.onclick = loadNewsBySource;
        newUl.append(li);
    });

    oldUl.replaceWith(newUl);
}

function loadNewsBySource(event){
    var sourceId = event.currentTarget.dataset.value;
}