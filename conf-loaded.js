'use strict';

feather.on('conf:loaded', function(){
	var modulename = feather.config.get('project.modulename'), ns = feather.config.get('project.name');
    var isCommon = !modulename || modulename == 'common';

    if(!ns){
        feather.config.set('project.name', ns = '_default');
    }

    //查找是否有common模块
    if(isCommon){
    	feather.commonInfo = {
            config: {},
            components: {},
            map: {}
        };
    }else{
        var root = feather.project.getCachePath() + '/info/' + ns + '.json';

        if(feather.util.exists(root)){
            var info = feather.util.read(root);
            try{
                feather.commonInfo = (new Function('return ' + info))();
            }catch(e){
                feather.log.on.error('common info is not valid jsondata! rerun common module please!');
                feather.log.error('common info is not valid jsondata! rerun common module please!');
            }
        }else{
        	feather.log.on.error('Run common module first please!');
            feather.log.error('Run common module first please!');
        }
    }

    switch(feather.config.get('project.mode')){
        case 'php':
            require('./config/php.js');
            break;

        default:
            require('./config/static.js');
    }
})