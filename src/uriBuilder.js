export default class UriBuilder {
    constructor(baseUrl,relativeUrl) {
        this.baseUrl = baseUrl;
        this.relativeUrl = relativeUrl;
        this.parameters = [];
    }

    addParameter(parameterName,parameterValue) {
        let parameter = {
            name: parameterName,
            value: parameterValue
        };
        this.parameters.push(parameter)
    }

    build() {
        var url = this.baseUrl;
        if(this.relativeUrl){
            url = url + this.relativeUrl;
        }

        this.parameters.forEach(element => {
            url = url + `${element.name}=${element.value}&`
        });

        return url;
    }
}