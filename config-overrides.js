const path = require('path');

module.exports = {
    paths : function(paths, env) {
        paths.appIndexJs = path.resolve(__dirname, '2. finance-portfolio');
        paths.appSrc = path.resolve(__dirname, '2. finance-portfolio');
        // paths.appIndexJs = path.resolve(__dirname, 'src');
        // paths.appSrc = path.resolve(__dirname, 'src');
        return paths;
    },
}