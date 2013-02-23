define("ace/mode/titorules", function(require, exports, module) {
"use strict";

var oop = require("pilot/oop");
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

var MyNewHighlightRules = function() {

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
   this.$rules = {
        "start" : [
            {
                token: "support.function",
                regex: "[a-z,A-Z,äöü,ÄÖÜ]+(?=\\s*\\:\\=\\s*(?:[0-9]+|true|false))"
            },
//            {
//                token: "support.function",
//                regex: "(?<=für\\s*)[a-z]+(?=\\s*\\.*)" //Problem wegen ?<=
//            },
//            {
//                token: "keyword",
//                regex: "(?<!\\=)\\>" //Problem wegen ?<!
//            },
//            {
//                token: "constant.language",
//                regex: "\\s*\\=\\>\\s*([a-z,A-Z,äöü,ÄÖÜ]+\\s*)*" //Problem wegen letztem Sternchen
//            },
//            {
//                token: "string",
//                regex: "[a-z,A-Z,äöü,ÄÖÜ]+\\s*(?=\\s*\\:\\s*)$" //Wird wegen $ nicht verstanden
//            },
        ]
    };
};

oop.inherits(MyNewHighlightRules, TextHighlightRules);

exports.MyNewHighlightRules = MyNewHighlightRules;

});