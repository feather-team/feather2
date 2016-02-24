feather.match('**', {
    isHtmlLike: false
});

feather.match('**.js', {
    preprocessor: feather.plugin('analyse'),
    postprocessor: feather.plugin('analyse')
});

feather.match('/(**.{js,css,less})', {
    moduleId: '$1$2'
});

feather.match('page/(**)', {
    url: '${statics}/p_/$1',
    release: 'static/${statics}/p_/$1'
});

feather.match('widget/(**)', {
    url: '${statics}/w_/$1',
    release: 'static/${statics}/w_/$1',
    isWidget: true
});

feather.match('pagelet/(**)', {
    url: '${statics}/pl_/$1',
    release: 'static/${statics}/pl_/$1',
    isWidget: true,
    isPagelet: true
});

feather.match('**.${template.suffix}', {
    release: 'view/$&',
    isHtmlLike: true,
    useHash: false,
    useMap: true,
    url: false,
    preprocessor: feather.plugin('analyse'),
    postprocessor: [feather.plugin('analyse'), feather.plugin('inline-compress')]
});

feather.match('components/(**)', {
    url: '${statics}/c_/$1',
    release: 'static/${statics}/c_/$1',
    isComponent: true,
    isHtmlLike: false
});

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

feather.match(/^\/static\/(?:.+?\/)*third\/.*$/, {
    useParser: false,
    useCompile: false,
    useHash: false,
    isThird: true
});

feather.match('/{map,plugins}/**', {
    release: '/view/$&',
    useHash: false
});

feather.match('::package', {
    spriter: feather.plugin('csssprites'),
    packager: feather.plugin('map'),
    postpackager: [feather.plugin('cleancss'), feather.plugin('runtime')]
});