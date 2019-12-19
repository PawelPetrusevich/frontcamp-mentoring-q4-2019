exports.getNews = (req, res, next) => {
    res.send("All news endpoint");
}

exports.getNewsById = (req, res, next) => { 
    var err = new Error("No Found");
    err.status = 404;
    return next(err);   
    res.send("Get news by id endpoint");
}

exports.addNews = (req, res, next) => {
    res.send("Create news endpoint");
}

exports.updateNews = (req, res, next) => {
    res.send("Update news endpoint");
}

exports.deleteNews = (req, res, next) => {
    res.send("Delete news endpoint");
}
