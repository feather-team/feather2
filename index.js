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
        modulename: '',
        ignore: ['node_modules/**', 'output/**', '.git/**'],
        mode: 'php' //basic, php,
    },

    // autoCombine: {
    //     use: false,
    //     type: 'pack'    //pack, combo
    // },

    combo: {
        use: true,
        onlyUnPackFile: false,
        maxUrlLength: 2000
    },
    
    cssA2R: false,

    template: {
        suffix: 'html' 
    },

    widget: {
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

    statics: '/static',

    require: {
        use: true,
        config: {
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
            ]
        }
    },

    server: {
        rewrite: 'index.php',
        type: 'php'
    }
});

var _ = require('./lib/util.js');

for(var i in _){
    feather.util[i] = _[i];
}

//require cli.js overwrite fis-cli.js
require('./cli.js');