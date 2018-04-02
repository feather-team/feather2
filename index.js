'use strict';

global.feather = module.exports = require('fis3');

if(!('EventEmitter' in process)){
    process.EventEmitter = require('events');
}

//feather default config
feather.config.merge({
    namespace: '',

    component: {
        ext: ['.js', '.css'],
        dir: 'components'
    },
    
    project: {
        fileType: {
            text: 'phtml',
            js: [],
            css: ['less']
        },

        charset: 'utf-8',
        ignore: ['node_modules/**', 'output/**', '.git/**']
    },

    template: {
        suffix: 'html',
        mustache: false
    },

    autoPack: {
        type: false,  //可选 combo， 关闭 false
        options: {
            syntax: ['??', ','], 
            onlyUnPackFile: true,
            maxUrlLength: 2000
        }
    },

    require: {
        config: {}
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

feather.media('dev').set('project.domain', '');

require('./lib/util.js');
//require cli.js overwrite fis-cli.js
require('./cli.js');

feather.compile = require('./lib/compile.js');

//lookup查找规则 如果是非/|.开头的文件，查找时，优先按照相对路径处理，找不到，按照相对于根目录处理
//以便统一所有情况
var lookup = feather.project.lookup;

feather.project.lookup = function(path, file){
    var info = lookup(path, file);

    if((!info.file || !info.file.isFile()) && file && !/^[./]/.test(info.rest) && !/:\/\//.test(info.rest)){
        return lookup(path);
    }

    return info;
};

feather.cache.clean = function(name){
    name = name || '';
    
    var path = fis.project.getCachePath(name);

    if (fis.util.exists(path)) {
        feather.util.delAsync(path);
    }
};