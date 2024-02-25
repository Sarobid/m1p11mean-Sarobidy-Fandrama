function route(pathname,handle,ws){
    if(typeof handle[pathname] === 'function'){
        handle[pathname](ws);
    }
}
exports.route = route;