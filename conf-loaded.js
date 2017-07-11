'use strict';

var _ = feather.util;

function serialize(exts){
    if(!exts) return [];

    if(typeof exts == 'string'){
        exts = exts.split(/\s*,\s*/);
    }

    return exts.map(function(ext){
        return ext.replace(/^\./, '');
    });
}

feather.on('conf:loaded', function(){
    //强制components作为component目录
    feather.config.set('component.dir', 'components');
    
    var jsExts = serialize(feather.config.get('project.fileType.js'));
    var cssExts = serialize(feather.config.get('project.fileType.css'));
    var txtExts = serialize(feather.config.get('project.fileType.text'));
    var cExts = feather.config.get('component.ext'), exts = [];
    var cJsExts = [], cCssExts = [];

    jsExts.forEach(function(ext){
        cJsExts.push('.' + ext);
    });

    cExts = cJsExts.concat(cExts);

    cssExts.forEach(function(ext){
        cCssExts.push('.' + ext);
    });

    cExts = cExts.concat(cCssExts);

    feather.config.set('project.fileType.text', txtExts.concat(jsExts, cssExts));

    jsExts.unshift('js');
    cssExts.unshift('css');

    feather.config.set('project.fileType.js', jsExts);
    feather.config.set('project.fileType.css', cssExts);
    feather.config.set('component.ext', cExts);
});

feather.on('conf:loaded', function(){
    require('./config.js');

    if(feather.config.get('server.clean')){
        try{
            feather.util.del(feather.project.getTempPath('www'));
        }catch(e){}
    }
});

//load all pack.json
feather.on('conf:loaded', function(){
    var path = require('path'), root = feather.project.getProjectPath();
    var previousPack = feather.config.get('pack') || {}, pack = {};
    var files = (feather.util.find(root, null, 'node_modules') || []).filter(function(file){
        return feather.util.filter(file, '**/pack.json');
    });

    files.reverse().forEach(function(realpath){
        var file = feather.file(realpath);
        var id = file.subpath.replace('/', '');
        var dir = path.dirname(id) + '/';
        var json;

        try{
            json = JSON.parse(file.getContent());
        }catch(e){
            feather.log.warn('unable to load file [`%s`].', id);
        }

        if(json){
            for(var i in json){
                var list = json[i];

                if(i[0] == '.'){
                    i = path.normalize(dir + i).replace(/[\\\/]+/g, '/');
                }

                if(list.constructor != Array){
                    list = [list];
                }

                list = list.map(function(item){
                    if(typeof item == 'string' && item[0] == '.'){
                        return path.normalize(dir + item).replace(/[\\\/]+/g, '/');
                    }

                    return item;
                });

                pack[i] = list;
            }
        }
    });

    for(var i in pack){
        previousPack[i] = pack[i];
    }

    feather.config.set('pack', _.merge({
        'conf/pkg_.js': 'conf/**.js'    //备份conf下的js文件，防止用户打包时，不小心收集了里面的内容
    }, previousPack));
});

//analyse deploy files
feather.on('conf:loaded', function(){
    var root = feather.project.getProjectPath();

    if(!feather.util.exists(root + '/conf/deploy')){
        return ;
    }

    var files = feather.util.find(root + '/conf/deploy', '*.js') || [];
    var deploys = feather.config.get('deploy') || {};

    files.forEach(function(file){
        var info = feather.util.ext(file);

        if(deploys[info.filename]) return;

        var exports = require(file);
        var config = [];

        if(!Array.isArray(exports)){
            exports = [exports];
        }

        exports.forEach(function(item){
            if(!item.to) return;

            if(item.to[0] == '.'){
                item.to = require('path').normalize(root + '/' + item.to).replace(/[\\\/]+/g, '/');
            }

            config.push(item);
        });

        if(config.length){
            deploys[info.filename] = config;
        }        
    });

    feather.config.set('deploy', deploys);
});
