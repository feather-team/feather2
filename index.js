'use strict';

global.feather = module.exports = require('fis3');

//feather default config
feather.config.merge({
    namespace: '',
    
    project: {
        fileType: {
            text: 'phtml'
        },

        charset: 'utf-8',
        ignore: ['node_modules/**', 'output/**', '.git/**']
    },

    template: {
        suffix: 'html'
    },

    autoPack: {
        type: 'combo',
        options: {
            onlyUnPackFile: false,
            maxUrlLength: 2000
        }
    },

    statics: '/static',
    
    preprocessor: ['widget'],
    postprocessor: [require('feather2-postprocessor-analyse')],
    prepackager: [require('feather2-prepackager-framework')],
    packager: [require('feather2-packager-map')],
    postpackager: ['loader'],
    
    server: {
        type: 'node'
    }
});

require('./lib/util.js');
//require cli.js overwrite fis-cli.js
require('./cli.js');