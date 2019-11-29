import  NewsRequest  from "./NewsRequest.js";

export default class PostNewsRequest extends NewsRequest{
    constructor(url) {
        request = new Request(url, {method: 'POST'});
        super(request);
    }
}