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
        modulename: '',
        ignore: ['node_modules/**', 'output/**', '.git/**']
    },

    combo: {
        use: false,
        onlyUnPackFile: false,
        maxUrlLength: 2000
    },

    statics: '/static',

    require: {
        config: {
            rules: []
        }
    },

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