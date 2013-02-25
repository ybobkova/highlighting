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
                token: "support.function", // Variablendeklaration, keine Tabelle
                regex: "[a-z,A-Z,äöü,ÄÖÜ]+(?!\\s*\\:\\=\\s*table)(?=\\s*\\:\\=\\s*)"
            },
//            {
//                token: "keyword", // Soundsymbol
//                regex: "(?<!\\=)\\>" //Problem wegen ?<!
//            },
//            {
//                token: "constant.language", // Geh zu einer Funktion
//                regex: "\\s*\\=\\>\\s*([a-z,A-Z,äöü,ÄÖÜ]+\\s*)*" //Problem wegen letztem Sternchen
//            },
//            {
//                token: "string", // Beginn einer Funktiondeklaration
//                regex: "[a-z,A-Z,äöü,ÄÖÜ]+\\s*(?=\\s*\\:\\s*)$" //Wird wegen $ nicht verstanden
//            },
//            {
//                token: "support.function", // Variablen im Text
//                regex: "(?<=auf|zum|des|dem|den|in|für\\s*)[a-z]+" //Problem wegen ?<!
//            },
//            {
//                token: "support.function", // Variablen im Text
//                regex: "(?<=\\:\\=\\s*)(?!(true)(false)\\d\\[\\])+[a-z,A-Z,äöü,ÄÖÜ]+" // Problem wegen ?<!
//            {
//                token: "support.function", // Variablen mit < oder > oder ==
//                regex: "[a-z,A-Z,äöü,ÄÖÜ]+\\s*(?=(\\<|\\>|\\=\\=)\\s*[a-z,A-Z,äöü,ÄÖÜ]+)" // entfernt das Wort
//            },
//            {
//                token: "support.function", // Variablen mit < oder > oder ==
//                regex: "(?<=[a-z,A-Z,äöü,ÄÖÜ]+\\s*(\\<|\\>|\\=\\=)\\s*)[a-z,A-Z,äöü,ÄÖÜ]+" //Problem wegen ?<!
//            },
            {
                token: "support.function", // Variablen mit < oder > oder == einer Value
                regex: "[a-z,A-Z,äöü,ÄÖÜ]+(?=\\s*(?:\\<|\\>|\\=\\=)\\s*\\d+)" // entfernt das Wort
            },
        ]
    };
};

oop.inherits(MyNewHighlightRules, TextHighlightRules);

exports.MyNewHighlightRules = MyNewHighlightRules;

});