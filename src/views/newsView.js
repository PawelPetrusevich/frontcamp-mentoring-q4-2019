export default class NewsView {
    renderNewsSource(sources){
        var oldUl = document.getElementById('newsSourceList');
        var newUl = document.createElement('ul');    
        newUl.id = 'newsSourceList';

        sources.forEach(element => {
            var li = document.createElement('li');
            li.className = 'source-item';
            li.innerHTML = element.name;
            li.dataset.value = element.id;
            li.onclick = newsService.searchNewsBySource;
            newUl.append(li);
        });

        oldUl.replaceWith(newUl);
    }

    renderNewsList(newsList) {
        var oldNewsList = document.getElementById("newsList");
        var newNewsList = document.createElement('div');
        newNewsList.id = 'newsList';

        newsList.forEach(element => {
            var newsDiv = document.createElement('div');
            newsDiv.className = 'news-item';
            var newsItemHeader = document.createElement('h4');
            var newsItemBody = document.createElement('p');
            var newsItemLink = document.createElement('a');

            newsItemHeader.innerHTML = element.title;
            newsItemBody.innerHTML = element.content;
            newsItemLink.href = element.url;
            newsItemLink.innerHTML = 'Read full...';
            newsItemLink.setAttribute('target','_blank');

            newsDiv.append(newsItemHeader,newsItemBody,newsItemLink);
            newNewsList.append(newsDiv);
        })

        oldNewsList.replaceWith(newNewsList);
    }
}