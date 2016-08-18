'use strict';

var _ = feather.util;

_.makeArray = function(arr){
    if(arr == null){
        return [];
    }

    return Array.isArray(arr) ? arr : [arr];
};

_.isEmptyObject = function(obj){
    for(var i in obj){
        if(obj.hasOwnProperty(i)){
            return false;
        }
    }

    return true;
};

    //数组去重
_.unique = function(arr){
    var obj = {};

    arr.forEach(function(v){
        obj[v] = true; 
    });

    return Object.keys(obj);
};

//任意类型转json
_.json = function json(obj, addSpace, space, _bspace){
    var tmp, space = space || '\t', _bspace = _bspace || '';

    if(obj.constructor == Object){
        tmp = [];

        for(var i in obj){
            tmp.push('"' + i + '": ' + json(obj[i], addSpace, space + '\t', space));
        }

        if(tmp.length){
            return "{" + (addSpace ? '\r\n' + space : '') + tmp.join(',' + (addSpace ? '\r\n' + space : ''), addSpace, space) + (addSpace ? '\r\n' + _bspace : '') + "}";
        }else{
            return "{}";
        }            
    }else if(obj.constructor == Array){
        tmp = [];

        obj.forEach(function(v){
            tmp.push(json(v, addSpace, space + '\t', space));
        });

        if(tmp.length){
            return "[" + (addSpace ? '\r\n' + space : '') + tmp.join(',' + (addSpace ? '\r\n' + space : ''), addSpace, space) + (addSpace ? '\r\n' + _bspace : '') + "]";
        }else{
            return "[]";
        }   
    }else if(obj.constructor == String){
        tmp = '"' + String(obj) + '"';
    }else{
        tmp = String(obj);
    }

    return tmp.replace(/[\r\n]+/g, '');
};

//判断是否为远程url
_.isRemoteUrl = function(path){
    return /^(?:https?:)?\/\//.test(path);
};