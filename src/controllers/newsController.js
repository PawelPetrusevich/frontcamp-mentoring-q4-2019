export default class NewsController{
    constructor(newsView, newsService){
        this.newsView = newsView;
        this.newsService = newsService;
    }

    init(){
        document.getElementById('searchSubmit').onclick = this.getSearchSources.bind(this);
    } 

    getSearchSources(){
        this.newsService.searchSources().fetchAsync()
            .then(data => this.newsView.renderNewsSource(data.sources))
            .then(()=> {
                var sourceLinks = document.getElementsByClassName('source-item');

                Array.prototype.forEach.call(sourceLinks, element => {
                    element.onclick = this.getNewsBySource.bind(this);
                });
            })
            .catch(function(err){
                setTimeout(function() { throw err; });
            });
         
    }

    getNewsBySource(event){
        this.newsService.searchNewsBySource(event).fetchAsync()
            .then(data=>this.newsView.renderNewsList(data.articles))
            .catch(function(err){
                setTimeout(function() { throw err; });
            });
    }
    
}