'use strict';

module.exports = {
    makeArray: function(arr){
        if(arr == null){
            return [];
        }

        return Array.isArray(arr) ? arr : [arr];
    },

    isEmptyObject: function(obj){
        for(var i in obj){
            if(obj.hasOwnProperty(i)){
                return false;
            }
        }

        return true;
    },

    //数组去重
    unique: function(arr){
        var obj = {}, uq = [];

        arr.forEach(function(v){
            if(obj[v]) return;

            obj[v] = true; 
            uq.push(v);
        });

        return uq;
    },

    /*
        任意类型转json
    */
    json: function json(obj, addSpace, space, _bspace){
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
    },

    //判断是否为远程url
    isRemoteUrl: function(path){
        return /^(?:https?:)?\/\//.test(path);
    },

    toPhpArray: function(json, space, _bspace){
        var d = [], self = this, space = space || '\t', _bspace = _bspace || '';

        if(Array.isArray(json)){
            json.forEach(function(v){
                d.push(self.toPhpArray(v, space + '\t', space));
            });

            if(d.length){
                return "array(\r\n" + space + d.join(',\r\n' + space) + '\r\n' + _bspace + ')';
            }else{
                return "array()";
            }
        }else if(typeof json == 'object'){
            for(var i in json){
                d.push('\'' + i + '\' => ' + self.toPhpArray(json[i], space + '\t', space));
            }

            if(d.length){
                return "array(\r\n" + space + d.join(',\r\n' + space) + '\r\n' + _bspace + ')';
            }else{
                return "array()";
            }
        }else{
            return typeof json == 'string' ? '\'' + json.replace(/'/g, '\\\'') + '\'' : json;
        }
    },

    extend: function(source, target){
        if(feather.util.is(target, 'Array')){
            source = source || [];

            target.forEach(function(item, key){
                source.push(feather.util.extend(null, item));
            });
        }else if(feather.util.is(target, 'Object')){
            source = source || {};

            for(var key in target){
                source[key] = feather.util.extend(source[key], target[key]);
            }
        }else{
            source = target;
        }

        return source;
    }
};