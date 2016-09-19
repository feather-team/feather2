var fis = require('fis3'), fs = require('fs'), path = require('path');

process.on('message', function(dir) {
    var dirname = path.dirname(dir), basename = path.basename(dir);
    var same = basename.replace(/0\.\d+$/, '');

    fs.readdir(dirname, function(err, names){
        if(err){
            process.exit(0);
        }

        names.forEach(function(name){
            if(name.indexOf(same) == 0){
                try{
                    fis.util.del(dirname + '/' + name);
                }catch(e){};
            }   
        });

        process.exit(0);
    });
});