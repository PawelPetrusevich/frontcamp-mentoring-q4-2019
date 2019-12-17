import  GetNewsRequest  from "./GetNewsRequest.js";
import  PostNewsRequest  from "./PostNewsRequest.js";

export default class ApiFactory{
    create(type,url){
        var apiRequest;
        if (type == 'GET') {
            apiRequest = new GetNewsRequest(url);
        }
        if (type == 'POST') {
            apiRequest = new PostNewsRequest(url);
        }

        return apiRequest;
    }
}