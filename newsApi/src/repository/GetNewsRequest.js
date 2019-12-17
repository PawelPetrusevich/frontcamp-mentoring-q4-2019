import  NewsRequest  from "./NewsRequest.js";

var request = null;

export default class GetNewsRequest extends NewsRequest{
    

    constructor(url) {
        request = new Request(url, {method: 'GET'});
        super(request);
    }
}