'use strict';

feather.on('conf:loaded', function(){
    require('./config.js');
})

//load all pack.json
feather.on('conf:loaded', function(){
    var files = feather.project.getSourceByPatterns('**/pack.json');
    var path = require('path');
    var previousPack = feather.config.get('pack') || {}, pack = {};

    Object.keys(files).reverse().forEach(function(subpath){
        var file = files[subpath];
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
    var files = feather.project.getSourceByPatterns('/conf/deploy/*.js');
    var deploys = feather.config.get('deploy') || {}, root = feather.project.getProjectPath();

    feather.util.map(files, function(subpath, file){
        if(deploys[file.filename]) return;

        var exports = require(file.realpath);
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
            deploys[file.filename] = config;
        }        
    });

    feather.config.set('deploy', deploys);
});

feather.on('conf:loaded', function(){
    feather._argv.dest == 'preview' && require('feather2-command-switch').switch(feather.config.get('project.name'), true);
});