feather.cli.name = 'feather';
feather.cli.info = feather.util.readJSON(__dirname + '/package.json');
feather.require.prefixes.unshift('feather', 'feather2');
feather.set('modules.commands', ['init', 'release', 'server', 'install', 'inspect', 'switch']);

feather.cli.version = function(){        
    var string = feather.util.read(__dirname + '/vendor/icon', true);
    console.log(string.replace('{version}', ('Version: ' + feather.cli.info.version).bold.red));
}

var old = feather.cli.run;

//override run
feather.cli.run = function(argv, env){
    var first = argv[2], action = argv._[0];

    if(action){
        if(['release', 'server', 'init', 'switch', 'inspect', 'install'].indexOf(action) == -1){
            feather.log.error('command error');
            return;
        }else{
            switch(action){
                case 'server':
                    var script = feather.project.getTempPath('www') + '/index.php';
                    !feather.util.isFile(script) && feather.util.copy(__dirname + '/vendor/index.php', script);
                    old(argv, env);
                    break;
            
                case 'install':
                  //  process.argv.push.apply(process.argv, ['--repos', 'http://feather-team.github.io/package']);
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
                            '-f, --file <filename>': 'specify the file path of `feather-conf.js`',
                            '--no-color': 'disable colored output',
                            '--verbose': 'enable verbose mode'
                        });
                        break;
                    }

                    if(action.c || action.clean){
                        var www = feather.project.getTempPath('www');

                        'proj static c_proj'.split(' ').forEach(function(item){
                            feather.util.del(www + '/' + item);
                        });
                    }

                    old(argv, env);
                    break;

                default:
                    old(argv, env);
            }
        }
    }else{
        if(argv.version || argv.v){
            feather.cli.version();
        }else{
            feather.cli.help(' ', {
                '-h, --help': 'print this help message',
                '-v, --version': 'print product version and exit'
            });
        }
    }
};