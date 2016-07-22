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

    template: {
        suffix: 'html'
    },

    combo: {
        use: true,
        onlyUnPackFile: false,
        maxUrlLength: 2000
    },

    statics: '/static',

    require: {
        config: {
            rules: []
        }
    },

    preprocessor: ['widget'],
    postprocessor: [],
    prepackager: [],
    postpackager: [],
    server: {
        type: 'node'
    }
});

var _ = require('./lib/util.js');

for(var i in _){
    feather.util[i] = _[i];
}

//require cli.js overwrite fis-cli.js
require('./cli.js');