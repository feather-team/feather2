'use strict';

var _ = feather.util;

feather.on('conf:loaded', function(){
    //强制components作为component目录
    feather.config.set('component.dir', 'components');
    
    var jsExts = feather.config.get('project.fileType.js', []);
    var txtExts = _.makeArray(feather.config.get('project.fileType.text'));

    if(Array.isArray(jsExts)){
        jsExts = jsExts.join(',');
    }

    var cExts = feather.config.get('component.ext'), exts = [];

    jsExts.split(/\s*,\s*/).forEach(function(item){
        if(item.charAt(0) == '.'){
            item = item.substr(1);
        }

        if(item != 'js'){
            cExts.push('.' + item);
            exts.push(item);
        }
    });

    feather.config.set('project.fileType.text', txtExts.concat(exts).join(','));
    feather.config.set('project.fileType.js', exts);

    exts.unshift('js');
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
    var root = feather.project.getProjectPath(), files = feather.util.find(root, '**/pack.json') || [];
    var path = require('path');
    var previousPack = feather.config.get('pack') || {}, pack = {};

    files.reverse().forEach(function(realpath){
        var file = feather.file(realpath);
        var dir = path.dirname(file.id) + '/';
        var json;

        try{
            json = JSON.parse(file.getContent());
        }catch(e){
            feather.log.warn('unable to load file [`%s`].', file.id);
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
    
    feather.config.set('pack', previousPack);
});

//analyse deploy files
feather.on('conf:loaded', function(){
    var root = feather.project.getProjectPath(), files = feather.util.find(root + '/conf/deploy', '*.js') || [];
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