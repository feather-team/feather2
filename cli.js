feather.cli.name = 'feather';
feather.cli.info = feather.util.readJSON(__dirname + '/package.json');
feather.require.prefixes.unshift('feather', 'feather2', 'fis');
feather.set('modules.commands', ['init', 'release', 'server', 'install', 'switch', 'inspect', 'revert']);

feather.cli.version = function(){        
    var string = feather.util.read(__dirname + '/vendor/icon', true);
    console.log(string.replace('{version}', ('Version: ' + feather.cli.info.version).bold.red));
}

var old = feather.cli.run;

//override run
feather.cli.run = function(argv, env){
    var first = argv[2], action = argv._[0];

    if(['release', 'server', 'init', 'switch', 'install', 'inspect', 'revert'].indexOf(action) > -1){
        switch(action){
            case 'server':
                if(!argv.root && !argv.r){
                    var www = feather.project.getTempPath('www'), script = www + '/preview/index.php';
                    !feather.util.exists(script) && feather.util.copy(__dirname + '/vendor/index.php', script);
                    argv.root = www + '/preview';
                }

                old(argv, env);
                break;
        
            case 'install':
                old(argv, env);
                break;

            case 'release':
                if(argv.h || argv.help){
                    feather.cli.help('release [media name]', {
                        '-h, --help': 'print this help message',
                        '-d, --dest <path>': 'release output destination',
                        '-l, --lint': 'with lint',
                        '-w, --watch': 'monitor the changes of project',
                        '-L, --live': 'automatically reload your browser',
                        '-c, --clean': 'clean compile cache',
                        '-u, --unique': 'use unique compile caching',
                        '-r, --root <path>': 'specify project root',
                        '-f, --file <filename>': 'specify the file path of feather\'s config file',
                        '--no-color': 'disable colored output',
                        '--verbose': 'enable verbose mode'
                    });

                    break;
                }

                if(!env.configPath){
                    feather.log.error('Not found feather\'s config file! Please confirm it\'s a valid feather project');
                }

                if(argv.c || argv.clean){
                    try{
                        feather.util.del(feather.project.getTempPath('www'));
                    }catch(e){}
                }

                //每次重新编译时，都不读取缓存，但不包括watch
                argv.clean = true;
                delete argv.c;

                var dest = argv.d || argv.dest;

                if(typeof dest != 'string'){
                    argv.dest = 'preview';
                    delete argv.d;
                }

                feather._argv = argv;
                
                require('./conf-loaded.js');

                old(argv, env);

                break;

            case 'revert':
                env._configPath = env.configPath;
                env.configPath = '';
                
                old(argv, env);
                break;

            default:
                old(argv, env);
        }
    }else{
        if(argv.version || argv.v){
            feather.cli.version();
        }else{
            feather.cli.help(null, {
                '-h, --help': 'print this help message',
                '-v, --version': 'print product version and exit'
            });
        }
    }
};

feather.cli.help = function(cmdName, options, commands){
    var strs = [
        '',
        ' Usage: ' + feather.cli.name + ' ' + (cmdName ? cmdName : '<command>')
    ];
    var _ = feather.util, util = require('util');

    if(!cmdName){
        commands = {};
        feather.media().get('modules.commands', []).forEach(function(name){
            var cmd = feather.require('command', name);
            name = cmd.name || name;
            name = feather.util.pad(name, 12);
            commands[name] = cmd.desc || '';
        });
    }

    options = options || {};
    commands = commands || {};
    var optionsKeys = Object.keys(options);
    var commandsKeys = Object.keys(commands);
    var maxWidth;

    if(commandsKeys.length){
        maxWidth = commandsKeys.reduce(function(prev, curr){
            return curr.length > prev ? curr.length : prev;
        }, 0) + 4;

        strs.push(null, ' Commands:', null);

        commandsKeys.forEach(function(key){
            strs.push(util.format('   %s %s', _.pad(key, maxWidth), commands[key]));
        });
    }

    if(optionsKeys.length){
        maxWidth = optionsKeys.reduce(function(prev, curr){
            return curr.length > prev ? curr.length : prev;
        }, 0) + 4;

        strs.push(null, ' Options:', null);

        optionsKeys.forEach(function(key){
            strs.push(util.format('   %s %s', _.pad(key, maxWidth), options[key]));
        });

        strs.push(null);
    }

    console.log(strs.join('\n'));
};