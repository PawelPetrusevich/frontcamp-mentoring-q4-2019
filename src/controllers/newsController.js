export default class NewsController{
    constructor(newsView, newsService){
        this.newsView = newsView;
        this.newsService = newsService;
    }

    init(){
        document.getElementById('searchSubmit').onclick = this.getSearchSources;
    }    
}

function getSearchSources(){
    this.newsService.searchSources.fetchAsync()
        .then(data => this.newsView.renderNewsSource(data.sources))
        .catch(function(err){
            setTimeout(function() { throw err; });
        });
    var sourceLinks = document.getElementsByClassName('source-item');
    sourceLinks.forEach(element => {
        element.onclick = newsService.searchNewsBySource;
    }); 
}

function getNewsBySource(event){
    this.newsService.searchNewsBySource(event).fetchAsync()
        .then(data=>this.newsView.renderNewsList(data.articles))
        .catch(function(err){
            setTimeout(function() { throw err; });
        });
}