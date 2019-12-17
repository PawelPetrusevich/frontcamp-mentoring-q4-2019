import SubscribeOnError from './ErrorHandler.js';
import NewsController from './controllers/newsController.js'
import NewsService from './services/newsService.js';
import NewsView from "./views/newsView.js";

var newsService = new NewsService();
var newsView = new NewsView();
var newsController = new NewsController(newsView, newsService);

newsController.init();