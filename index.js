'use strict';

global.feather = module.exports = require('fis3');

//feather default config
feather.config.merge({
    project: {
        fileType: {
            text: 'phtml'
        },

        name: '_default',
        charset: 'utf-8',
        ignore: ['node_modules/**', 'output/**', '.git/**']
    },

    combo: {
        use: false,
        onlyUnPackFile: false,
        maxUrlLength: 2000
    },

    replaceWidget: '<link rel="import" href="${url}?__inline" />',

    statics: '/static',

    require: {
        config: {
            rules: []
        }
    },

    preprocessor: [],

    server: {
        rewrite: 'index.php',
        type: 'php'
    }
});

var _ = require('./lib/util.js');

for(var i in _){
    feather.util[i] = _[i];
}

//require cli.js overwrite fis-cli.js
require('./cli.js');