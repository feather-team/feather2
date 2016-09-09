var fis = require('fis'), fs = require('fs'), path = require('path');

process.on('message', function(dir) {
    var bakName = dir + '.' + Math.random();   

    fs.rename(dir, bakName, function(err){
        if(err){
            process.exit(0);
        }

        var dirname = path.dirname(dir), basename = path.basename(dir);

        fs.readdir(dirname, function(err, names){
            if(err){
                process.exit(0);
            }

            names.forEach(function(name){
                if(name.indexOf(basename + '.') == 0){
                    try{
                        fis.util.del(dirname + '/' + name);
                    }catch(e){};
                }   
            });

            process.exit(0);
        });
    });
});