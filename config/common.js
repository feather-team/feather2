var media = feather.project.currentMedia(), isPreview = feather._argv.dest == 'preview';

switch(media){
    case 'pd':
    case 'production':
        feather.match('**.js', {
            optimizer: feather.plugin('uglify-js')
        });

        feather.match('**.{less,css}', {
            optimizer: feather.plugin('clean-css')
        });

        feather.match('**.${template.suffix}', {
            optimizer: feather.plugin('htmlmin')
        });

        feather.match('**.png', {
            optimizer: feather.plugin('png-compressor')
        });

        feather.match('::package', {
            spriter: feather.plugin('csssprites')
        });

    case 'test':
        feather.match('**', {
            useHash: true
        });
        break;

    default:;
}

feather.match('**', {
    isHtmlLike: false
});

feather.match('**.js', {
    preprocessor: feather.util.makeArray(feather.config.get('preprocessor')).concat(feather.plugin('analyse')),
    postprocessor: feather.util.makeArray(feather.config.get('postprocessor')).concat(feather.plugin('analyse'))
});

feather.match('page/(**)', {
    url: '${statics}/p_/$1',
    release: 'static/${statics}/p_/$1'
});

feather.match('pagelet/(**)', {
    url: '${statics}/pl_/$1',
    release: 'static/${statics}/pl_/$1',
    isWidget: true,
    isPagelet: true
});

feather.match('widget/(**)', {
    url: '${statics}/w_/$1',
    release: 'static/${statics}/w_/$1',
    isWidget: true
});

//feather2.0支持test目录，作为测试目录， 同page目录，只是release时，如果不是预览模式，则不会产出，用于日常的单元测试
//此目录下所有静态资源都会被临时产出到static/t_下面
feather.match('/test/(**)', {
    url: '${statics}/t_/$1',
    release: isPreview ? 'static/${statics}/t_/$1' : false
}, isPreview ? null : 10);

feather.match('**.${template.suffix}', {
    release: 'view/$&',
    isHtmlLike: true,
    useHash: false,
    useMap: true,
    url: false,
    preprocessor: feather.util.makeArray(feather.config.get('preprocessor')).concat(feather.plugin('analyse')),
    postprocessor: feather.util.makeArray(feather.config.get('postprocessor')).concat([
        feather.plugin('analyse'),
        feather.plugin('inline-compress')
    ])
});

feather.match('components/(**)', {
    url: '${statics}/c_/$1',
    release: 'static/${statics}/c_/$1',
    isComponent: true,
    isHtmlLike: false
}, 10);

feather.match('components/**.js', {
    useSameNameRequire: true
});

feather.match('**.{less,css}', {
    parser: feather.plugin('less'),
    rExt: '.css',
    useSprite: true
});

feather.match('static/(**)', {
    isHtmlLike: false,
    url: '${statics}/$1',
    release: 'static/${statics}/$1'
});

//任意目录下的third都不做任何处理
feather.match(/^\/static\/(?:.+?\/)*third\/.*$/, {
    useParser: false,
    useCompile: false,
    useHash: false,
    isThird: true
}, 100000);

//feather2.0规定data目录 同feather1.x中的test目录，1.x中test目录创建的初衷也是为了测试数据
feather.match('/data/**', {
    useHash: false,
    useCompile: false,
    release: isPreview ? '$&' : false
});

feather.match('**/{feather_conf.js,feather-conf.js,pack.json}', {
    useCompile: false,
    useParser: false,
    release: false
});

feather.match('/conf/**', {
    useCompile: false,
    useParser: false,
    release: false,
    useHash: false
});

feather.match('**/component.json', {
    useCompile: false,
    useHash: false,
    useParser: false
});

feather.match('**', {
    deploy: feather.plugin('default')
});

feather.match('::package', {
    prepackager: feather.config.get('prepackager'),
    packager: feather.plugin('map'),
    postpackager: feather.util.makeArray(feather.config.get('postpackager')).concat([
        feather.plugin('cleancss'), feather.plugin('runtime')
    ])
});