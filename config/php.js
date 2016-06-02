require('./common.js');

var isPreview = feather._argv.dest == 'preview', www = feather.project.getTempPath('www');

feather.match('/{map,plugins}/**', {
    release: '/view/$&',
    useHash: false
});

feather.match('/conf/rewrite.php', {
    useHash: false,
    release: isPreview ? '/tmp/rewrite/${project.modulename}.php' : false
});

feather.match('/conf/compatible.php', {
    release: isPreview ? '/tmp/compatible.php' : false,
    useHash: false
});

feather.match('/conf/engine/local.php', {
    release: isPreview ? '/view/engine.config.php' : false,
    useHash: false  
});

feather.match('/conf/engine/online.php', {
    release: isPreview ? false : '/view/engine.config.php',
    useHash: false
});

feather.config.set('deploy.preview',[ 
    {
        from: '/',
        to: www + '/proj/' + feather.config.get('project.name'),
        subOnly: true
    },

    {
        from: '/data',
        to: www + '/preview'
    },
    
    {
        from: '/static',
        to: www + '/preview',
        subOnly: true
    }
]);
