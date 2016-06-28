'use strict';

feather.on('conf:loaded', function(){
	var modulename = feather.config.get('project.modulename'), ns = feather.config.get('project.name');
    var isCommon = !modulename || modulename == 'common';

    if(!ns){
        feather.config.set('project.name', ns = '_default');
    }

    //查找是否有common模块
    if(isCommon){
        feather.releaseInfo = {
            commonConfig: {},
            components: {},
            map: {},
            modules: {}
        };
    }else{
        var root = feather.project.getCachePath() + '/release/' + ns + '.json';

        if(feather.util.exists(root)){
            var info = feather.util.read(root);
            
            try{
                feather.releaseInfo = (new Function('return ' + info))();
            }catch(e){
                feather.log.on.error('Project\'s release info is not valid jsondata! Rerun common module please!');
                feather.log.error('Project\'s release info is not valid jsondata! Rerun common module please!');
            }
        }else{
        	feather.log.on.error('Run common module first please!');
            feather.log.error('Run common module first please!');
        }

        var commonConfig = feather.releaseInfo.commonConfig, config = feather.config.get();

        'require template widget cssA2R combo'.split(' ').forEach(function(item){
            feather.config.set(item, commonConfig[item]);
        });

        if(feather.util.isEmpty(config.project.domain)){
            feather.config.set('project.domain', commonConfig.project.domain);
        }

        if(commonConfig.statics != config.statics){
            feather.log.warn('common module\'s statics[' + commonConfig.statics + '] is different from current module\'s statics[' + config.statics + ']!');
        }

        feather.config.set('release', feather.releaseInfo);

        var currentModifyTime = feather.config.get('release.modules.' + modulename + '.modifyTime', 0);
        var commonModifyTime = feather.config.get('release.modules.common.modifyTime', 0);

        if(commonModifyTime >= currentModifyTime){
            feather._argv.clean = true;
            delete feather._argv.c;
        }
    }

    switch(feather.config.get('template.engine')){
        case 'laravel':
        case 'blade':
            feather.config.set('template.engine', 'blade');
            break;

        default: 
            feather.config.set('template.engine', 'feather');
    }

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