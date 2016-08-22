'use strict';

global.feather = module.exports = require('fis3');

//feather default config
feather.config.merge({
    namespace: '',

    component: {
        ext: ['.js', '.jsx', '.coffee', '.css', '.sass', '.scss', '.less', '.html', '.tpl', '.vm'],
        dir: 'components'
    },
    
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
    
    preprocessor: ['label-analyse'],
    postprocessor: [require('feather2-postprocessor-analyse')],
    prepackager: [require('feather2-prepackager-framework')],
    packager: [require('feather2-packager-map')],
    postpackager: ['loader'],
    
    server: {
        type: 'node',
        clean: true
    }
});

require('./lib/util.js');
//require cli.js overwrite fis-cli.js
require('./cli.js');