;(function (global) {

    //Polyfill
    if (!String.prototype.repeat) {
        String.prototype.repeat = function(count) {
            'use strict';

            var str = '' + this;
            count = +count;
            if (count != count) {
                count = 0;
            }
            if (count < 0) {
                throw new RangeError('repeat count must be non-negative');
            }
            if (count == Infinity) {
                throw new RangeError('repeat count must be less than infinity');
            }
            count = Math.floor(count);
            if (str.length == 0 || count == 0) {
                return '';
            }

            if (str.length * count >= 1 << 28) {
                throw new RangeError('repeat count must not overflow maximum string size');
            }
            var rpt = '';
            for (;;) {
                if ((count & 1) == 1) {
                    rpt += str;
                }
                count >>>= 1;
                if (count == 0) {
                    break;
                }
                str += str;
            }

            return rpt;
        }
    }


    var sm = function(strObj) {
        // ReSharper disable once InconsistentNaming
        return new sm.init(strObj);
    };

    sm.prototype = {

        getLength: function () {

            var result;            

            var callbackSuccess = (function() {
                result =  this.strObj.length;
            }).bind(this);

            var callBackFailure = function() { result = -1; };

            if (isString.call(this)) {
                executeCallback(callbackSuccess);
            } else {
                executeCallback(callBackFailure);
            }
            return result;
        },

        between: function (delimiter1, delimiter2) {
            if (delimiter1 == null || delimiter1.length > 1 || delimiter2 == null || delimiter2 > 1) {
                console.error('missing delimiters');
            }
            var startPos = this.strObj.indexOf(delimiter1) + 1;
            var endPos = this.strObj.indexOf(delimiter2, startPos);
            return this.strObj.substring(startPos, endPos);
        },

        camelize: function () {
            return this.strObj.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
                return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
        },

        pascalize: function () {
            return this.strObj.replace(/\w+/g,
                function(w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); });
        },

        removeExtraWhitespaces: function () {
            return this.strObj.replace(/ +/g, ' ');
        },

        removeAllWhitespaces: function () {
            return this.strObj.replace(/ +/g, '');
        },

        contains: function (pattern) {
            return this.strObj.includes(pattern);
        },

        countOfSubstring: function (pattern) {
            var m = this.strObj.match(new RegExp(pattern.replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"), "g"));
            return m ? m.length : 0;
        },

        dasherize: function () {
            return this.strObj.replace(/[A-Z]/g, function(char, index) {
                return (index !== 0 ? '-' : '') + char.toLowerCase();
            });
        },

        underscorize: function () {
            return this.strObj.replace(/[A-Z]/g, function (char, index) {
                return (index !== 0 ? '_' : '') + char.toLowerCase();
            });
        },

        capitalizeFirstLetter: function () {
            return this.strObj.charAt(0).toUpperCase() + this.strObj.slice(1);
        },

        capitalizeEachWord: function () {
            var index, word, words, i, len;
            words = this.strObj.split(" ");
            for (index = i = 0, len = words.length; i < len; index = ++i) {
                word = words[index].charAt(0).toUpperCase();
                words[index] = word + words[index].substr(1);
            }
            return words.join(" ");
        },

        decodeHtmlEntities: function () {
            var str;
            var element = document.createElement('div');


            str = this.strObj.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
            return str;
        },

        escapeHTML: function () {
            return this.strObj.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        },

        endsWith: function (suffix) {
            return this.strObj.indexOf(suffix, this.strObj.length - suffix.length) !== -1;
        },
        

        isAlpha: function () {
            for (var i = 0; i < this.strObj.length; i++) {
                if (!((this.strObj[i] >= "a" && this.strObj[i] <= "z" )|| (this.strObj[i] >= "A" && this.strObj[i] <= "Z")))
                    return false;
            }
            return true;
        },

        isAlphaNumeric: function () {
            var code, i, len;

            for (i = 0, len = this.strObj.length; i < len; i++) {
                code = this.strObj.charCodeAt(i);
                if (!(code > 47 && code < 58) && // numeric (0-9)
                    !(code > 64 && code < 91) && // upper alpha (A-Z)
                    !(code > 96 && code < 123)) { // lower alpha (a-z)
                    return false;
                }
            }
            return true;
        },

        isEmpty: function () {
            return !this.strObj || this.strObj == undefined || this.strObj == "" || this.strObj.trim() == "" || this.strObj.length == 0;
        },

        isLower: function () {
            return this.strObj === this.strObj.toLowerCase();
        },

        isUpper: function () {
            return this.strObj === this.strObj.toUpperCase();
        },

        isNumeric: function () {
            return !isNaN(parseFloat(this.strObj)) && isFinite(this.strObj);
        },

        trimLeft: function() {
            return this.strObj.trimLeft();
        },

        trimRight: function () {
            return this.strObj.trimRight();
        },

        trim: function () {
            return this.strObj.trim();
        },

        truncate: function (length) {
            return this.strObj.substring(this.strObj, length);
        },

        toInt: function () {
            return parseInt(this.strObj);
        },

        toFloat: function () {
            return parseFloat(this.strObj);
        },

        toBool: function() {
            return (this.strObj == 'true');
        },

        repeat: function(times) {
            return this.strObj.repeat(times);
        },

        startsWith: function (pattern) {
            return this.strObj.startsWith(pattern);
        },

        replaceAll: function (pattern, replacement) {
            return this.strObj.replace(new RegExp(pattern, 'g'), replacement);
        }
    };

    function isString() {
        if (typeof this.strObj === 'string') {
            return true;
        }
        return false;
    }

    var executeCallback = function(callback) {
        return callback();
    }

    sm.init = function (strObj) {
        var self = this;
        self.strObj = strObj;
        if (!isString.call(self)) {
            self.strObj = null;
            console.error('Invalid agrument. Please provide a valid string');
        }
    }

    sm.init.prototype = sm.prototype;

    global.s$ = sm;


}(window));