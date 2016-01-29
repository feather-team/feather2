if(feather.util.isEmpty(feather.config.get('project.domain'))){
    feather.config.set('project.domain', '<?php echo $FEATHER_STATIC_DOMAIN;?>');
}

feather.match('/(**)', {
    url: '${statics}/s_/$1',
    release: 'static/${statics}/s_/$1',
    isMod: true,
    useHash: true,
    isHtmlLike: false
});

feather.match('**.${template.suffix}', {
    isPage: true
});

feather.match('**.js', {
    preprocessor: feather.plugin('analyse'),
    postprocessor: feather.plugin('analyse')
});

feather.match('/(**.{js,css})', {
    moduleId: '$1$2'
});

feather.match('page/(**)', {
    url: '${statics}/p_/$1',
    release: 'static/${statics}/p_/$1'
});

feather.match('${widget.dir}/(**)', {
    url: '${statics}/w_/$1',
    release: 'static/${statics}/w_/$1',
    isMod: true,
    isWidget: true,
    isHtmlLike: false,
    isPage: false
});

feather.match('pagelet/(**)', {
    url: '${statics}/pl_/$1',
    release: 'static/${statics}/pl_/$1',
    isMod: true,
    isWidget: true,
    isPagelet: true,
    isHtmlLike: false,
    isPage: false
});

feather.match('${components.dir}/(**)', {
    postprocessor: false,
    url: '${statics}/c_/$1',
    release: 'static/${statics}/c_/$1',
    isMod: true,
    isComponent: true,
    isHtmlLike: false,
    isPage: false
});

feather.match('${components.dir}/**.js', {
    useSameNameRequire: true
});

feather.match('**.${template.suffix}', {
    release: 'view/$&',
    isHtmlLike: true,
    isMod: false,
    useMap: true,
    useHash: false,
    preprocessor: feather.plugin('analyse'),
    postprocessor: [feather.plugin('analyse'), feather.plugin('inline-compress')]
});

feather.match('**.{less,css}', {
    parser: feather.plugin('less'),
    rExt: '.css'
});

feather.match('static/(**)', {
    isPage: false,
    url: '${statics}/$1',
    release: 'static/${statics}/$1',
    isMod: true
});

feather.match(/^\/static\/(?:.+?\/)*third\/.*$/, {
    useParser: false,
    useCompile: false,
    useHash: false,
    isThird: true,
    isMod: false
});

feather.match('/{feather_conf.js,feather-conf.js}', {
    useCompile: false,
    useParser: false,
    release: false
});

// feather.match('::package', {
//     postpackager: [feather.plugin('map-before')]
// });