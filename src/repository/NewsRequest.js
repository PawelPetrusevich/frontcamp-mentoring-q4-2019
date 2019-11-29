export default class NewsRequest {
    constructor(request){
        this.request = request;
    }

    async fetchAsync(){
        let response = await fetch(this.request)    
        if(!response.ok){
            throw new Error("Some error");
        }        
        let data = await response.json();
        return data;
    }
}

