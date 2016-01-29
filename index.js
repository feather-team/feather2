'use strict';

global.feather = module.exports = require('fis3');

//require cli.js overwrite fis-cli.js
require('./cli.js');

//feather default config
feather.config.merge({
    project: {
        fileType: {
            text: 'phtml'
        },

        name: '_default',
        charset: 'utf-8',
        modulename: '',
        ignore: ['node_modules/**', 'output/**', '.git/**'],
        mode: 'php' //basic, php,
    },

    template: {
        suffix: 'html' 
    },

    widget: {
        dir: 'widget',
        rules: [        
            /*
            :nav => /widget/nav/nav.tpl
            common:nav => /widget/common/nav/nav.tpl
            common/a:nav => /widget/common/a/nav/nav.tpl
            common/a:nav/a => /widget/common/a/nav/a/a.tpl
            common/a:nav/a.tpl => /widget/common/a/nav/a.tpl
            common/a/b => /widget/common/a/b.tpl
            common/a/b.tpl => /widget/common/a/b/tpl
            */
            [/^([^:]+)?\:((?:[^\/]+\/)*)((?:(?!\.[^.]+).)+?)(\..+)?$/, function(_0, _1, _2, _3, _4){
                return (_1 ? (_1 + '/') : '') + _2 + _3 + (_4 ? _4 : ('/' + _3 + '.' + feather.config.get('template.suffix')));
            }]
        ]
    },

    components: {
        dir: 'ui'
    },

    statics: '/static',

    require: {
        use: true,
        config: {
            baseurl: '/',
            rules: [
                /*
                :dialog => /dialog/dialog.js
                common:dialog => /common/dialog/dialog.js
                common/a:dialog => /common/a/dialog/dialog.js
                common/a:dialog/a => /common/a/dialog/a/a.js
                common/a:dialog/a.js => /common/a/dialog/a.js
                common:dialog.js => /common/dialog.js
                common/a.js => /common/a.js
                */

                [/^([^:]+)?\:((?:[^\/]+\/)*)([^\.]+?)(\..+)?$/, function(_0, _1, _2, _3, _4){
                    return (_1 ? _1 + '/' : '') + _2 + _3 + (_4 ? _4 : ('/' + _3 + '.js'));
                }],

                [/(?:^|\/)[^\.]+$/, function(all){
                    return all + '.js';
                }]
            ],
            charset: 'utf-8',
            map: {},
            deps: {}
        }
    },

    server: {
        rewrite: 'index.php'
    }
});

feather.on('conf:loaded', function(){
    //feather.unhook('components');
    feather.commonMap = {};

    var modulename = feather.config.get('project.modulename'), ns = feather.config.get('project.name');

    //查找是否有common模块
    if(modulename && modulename != 'common'){
        var root = feather.project.getTempPath() + '/release/' + ns + '/common.json';

        if(feather.util.exists(root)){
            feather.commonMap = feather.util.readJSON(root);
        }
    }

    switch(feather.config.get('project.mode')){
        case 'php':
            require('./config/php.js');
            break;

        default:
            require('./config/static.js');
    }
});

//load lib/**.js
var _ = require('./lib/util.js');

for(var i in _){
    feather.util[i] = _[i];
}