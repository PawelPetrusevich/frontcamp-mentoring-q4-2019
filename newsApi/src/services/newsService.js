import  UriBuilder  from '../uriBuilder.js';
import  ApiFactory  from "../repository/ApiFactory.js";
import  getSelectedItem  from '../selectExtension.js';

const languageDropDownName = "languageList";
const categoryDropDownName = "categoryList";
const apiKey = "b4207d5caddc4695852d9539c73183a3";
const sourceBaseUri = 'https://newsapi.org/v2';
const sourceRelativeUri = '/sources?';
const newsBaseUri = 'https://newsapi.org/v2';
const newsRelativeUri = '/top-headlines?';

export default class NewsService {

    searchSources(){
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
    
        return request;
    }

    searchNewsBySource(event){
        var sourceId = event.currentTarget.dataset.value;
        var urlBuilder = new UriBuilder(newsBaseUri,newsRelativeUri);
        urlBuilder.addParameter("sources",sourceId);
        urlBuilder.addParameter("apiKey",apiKey);
        var url = urlBuilder.build();
    
        var apiFactory = new ApiFactory();
        var request = apiFactory.create('GET',url)
    
        return request;
    }
}