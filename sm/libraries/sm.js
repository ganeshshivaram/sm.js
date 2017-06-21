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

        // cant be chained
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

        // cant be chained
        countOfSubstring: function (pattern) {
            var m = this.strObj.match(new RegExp(pattern.replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"), "g"));
            return m ? m.length : 0;
        },

        // cant be chained
        endsWith: function (suffix) {
            return this.strObj.indexOf(suffix, this.strObj.length - suffix.length) !== -1;
        },

        // cant be chained
        isAlpha: function () {
            for (var i = 0; i < this.strObj.length; i++) {
                if (!((this.strObj[i] >= "a" && this.strObj[i] <= "z") || (this.strObj[i] >= "A" && this.strObj[i] <= "Z")))
                    return false;
            }
            return true;
        },

        // cant be chained
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

        // cant be chained
        isEmpty: function () {
            return !this.strObj || this.strObj == undefined || this.strObj == "" || this.strObj.trim() == "" || this.strObj.length == 0;
        },

        // cant be chained
        isLower: function () {
            return this.strObj === this.strObj.toLowerCase();
        },

        // cant be chained
        isUpper: function () {
            return this.strObj === this.strObj.toUpperCase();
        },

        // cant be chained
        isNumeric: function () {
            return !isNaN(parseFloat(this.strObj)) && isFinite(this.strObj);
        },

        // cant be chained
        toInt: function () {
            return parseInt(this.strObj);
        },

        // cant be chained
        toFloat: function () {
            return parseFloat(this.strObj);
        },

        // cant be chained
        toBool: function () {
            return (this.strObj == 'true');
        },

        between: function (delimiter1, delimiter2) {
            if (delimiter1 == null || delimiter1.length > 1 || delimiter2 == null || delimiter2 > 1) {
                console.error('missing delimiters');
            }
            var startPos = this.strObj.indexOf(delimiter1) + 1;
            var endPos = this.strObj.indexOf(delimiter2, startPos);
            this.result = this.strObj = this.strObj.substring(startPos, endPos);
            return this;
        },

        camelize: function () {
            this.result = this.strObj = this.strObj.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
                return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
            return this;
        },

        pascalize: function () {
            this.result = this.strObj = this.strObj.replace(/\w+/g,
                function (w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); });
            return this;
        },

        removeExtraWhitespaces: function () {
            this.result = this.strObj = this.strObj.replace(/ +/g, ' ');
            return this;
        },

        removeAllWhitespaces: function () {
            this.result = this.strObj = this.strObj.replace(/ +/g, '');
            return this;
        },

        contains: function (pattern) {
            this.result = this.strObj = this.strObj.includes(pattern);
            return this;
        },

        dasherize: function () {
            this.result = this.strObj = this.strObj.replace(/[A-Z]/g, function (char, index) {
                return (index !== 0 ? '-' : '') + char.toLowerCase();
            });
            return this;
        },

        underscorize: function () {
            this.result = this.strObj = this.strObj.replace(/[A-Z]/g, function (char, index) {
                return (index !== 0 ? '_' : '') + char.toLowerCase();
            });
            return this;
        },

        capitalizeFirstLetter: function () {
            this.result = this.strObj = this.strObj.charAt(0).toUpperCase() + this.strObj.slice(1);
            return this;
        },

        capitalizeEachWord: function () {
            var index, word, words, i, len;
            words = this.strObj.split(" ");
            for (index = i = 0, len = words.length; i < len; index = ++i) {
                word = words[index].charAt(0).toUpperCase();
                words[index] = word + words[index].substr(1);
            }
            this.result = this.strObj = words.join(" ");
            return this;
        },

        decodeHtmlEntities: function () {
            var str;
            var element = document.createElement('div');


            str = this.strObj.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';

            this.result = this.strObj = str;
            return this;
        },

        escapeHTML: function () {
            this.result = this.strObj = this.strObj.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return this;
        },

        trimLeft: function() {
            this.result = this.strObj = this.strObj.trimLeft();
            return this;
        },

        trimRight: function () {
            this.result = this.strObj = this.strObj.trimRight();
            return this;
        },

        trim: function () {
            this.result = this.strObj = this.strObj.trim();
            return this;
        },

        truncate: function (length) {
            this.result = this.strObj = this.strObj.substring(this.strObj, length);
            return this;
        },

        repeat: function(times) {
            this.result = this.strObj = this.strObj.repeat(times);
            return this;
        },

        startsWith: function (pattern) {
            this.result = this.strObj = this.strObj.startsWith(pattern);
            return this;
        },

        replaceAll: function (pattern, replacement) {
            this.result = this.strObj = this.strObj.replace(new RegExp(pattern, 'g'), replacement);
            return this;
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
        self.result = strObj;

        if (!isString.call(self)) {
            self.strObj = null;
            self.result = null;
            console.error('Invalid agrument. Please provide a valid string');
        }
    }

    sm.init.prototype = sm.prototype;

    global.s$ = sm;


}(window));