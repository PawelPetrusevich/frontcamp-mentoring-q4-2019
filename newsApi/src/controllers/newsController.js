export default class NewsController{
    constructor(newsView, newsService){
        this.newsView = newsView;
        this.newsService = newsService;
    }

    init(){
        document.getElementById('searchSubmit').onclick = this.getSearchSources.bind(this);
    } 

    async getSearchSources(){

        try {
            var data = await this.newsService.searchSources().fetchAsync();

            this.newsView.renderNewsSource(data.sources);

             var sourceLinks = document.getElementsByClassName('source-item');

            Array.prototype.forEach.call(sourceLinks, element => {
                element.onclick = this.getNewsBySource.bind(this);
            }); 
        } catch (error) {
            let SubscribeOnError = await import('../ErrorHandler.js');
            var params = {
                time : 1000
            };
            SubscribeOnError.default(error,params);
        }                
    }

    async getNewsBySource(event){

        try {
            var data = await this.newsService.searchNewsBySource(event).fetchAsync();
            this.newsView.renderNewsList(data.articles);
        } catch (error) {
            let SubscribeOnError = await import('../ErrorHandler.js');
            var params = {
                time : 1000
            };
            SubscribeOnError.default(error,params);
        }        
    }    
}