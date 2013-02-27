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
                token: "text", // Spieldeklaration bleibt weiss
                regex: "Spiel:\\s*[a-zA-ZöäüÖÄÜ]+"
            },
            {
                token: "support.function", // Variablendeklaration, keine Tabelle
                regex: "[a-zA-ZöäüÖÄÜ]+(?=\\s*\\:\\=\\s*\\d+)"
            },
            {
                token: "support.function", // Wenn nach := eine variable steht
                regex: "[a-zA-ZöäüÖÄÜ]+(?!\\s*\\:\\=\\s*\\d+)(?=\\s*\\:\\=\\s*)",
                next: "variable"
            },
            {
                token: "text",
                regex: "\\s*\\:",
                next: "tableUndZeile"
            },
            {
                token: "string", // Anfang einer Funktiondeklaration
                regex: "^[a-zA-ZöäüÖÄÜ\\s]+\\:\\s*$"
            },
            {
                token: "keyword", //Kontrollesymbole
                regex: "Oder|Wenn|Ansonsten"
            },
            {
                token: "keyword", //"Für jedes"
                regex: "für jedes\\s*",
                next: "variableImText"
            },
            {
                token: "keyword", //Goto
                regex: "^\\s*\\=\\s*\\>",
                next: "gotofunction"
            },
            {
                token: "comment", // Soundsymbole
                regex: "\\s*\\>\\s*|\\s*\\*\\s*\\>",
                next: "sound"
            },
            {
                token: "support.function", // Variablen mit < oder > oder ==
                regex: "[a-zA-ZöäüÖÄÜ]+\\s*(?=\\<|\\>|\\=\\=|\\>\\=|\\<\\=\\s*)",
                next: "variable"
            },
            {
                token: "support.function", // Variablen mit < oder > oder == einer Value
                regex: "[a-zA-ZöäüÖÄÜ]+(?=\\s*(?:\\<|\\>|\\=\\=|\\>\\=|\\<\\=)\\s*\\d+)"
            },
            {
                token: "text",
                regex: "Füge",
                next: "fuegeeinen"
            },
            {
                token: "text",
                regex: "(?:Wähle|auf)\\s*",
                next: "waehle"
            },
            {
                token: "text",
                regex: "(?:aus|zu|zum|zur|in|jedes|für)\\s+",
                next: "variableImText"
            }
          ],
          variable: [
            {
                token: "support.function",
                regex: "\\s*[a-zA-ZöäüÖÄÜ]"
            },
            {
                token: "text",
                regex: "true|false|\\s|$",
                next: "start"
            }
          ],
          waehle: [
            {
                token: "text",
                regex: "(?:einen|eine|ein|von der)\\s+",
                next: "variableImText"
            },
            {
                token: "text",
                regex: "[0-9]+\\s*",
                next: "variableNachZahl"
            },
            {
                token: "support.function",
                regex: "[a-zA-ZöäüÖÄÜ]+",
                next: "start"
            }
          ],
          variableImText:[
            {
                token: "support.function",
                regex: "[a-zA-ZöäüÖÄÜ]"
            },
            {
                token: "text",
                regex: "\\s*[0-9]+\\s*",
                next: "variableNachZahl"
            },
            {
                token: "text",
                regex: "\\s",
                next: "start"
            }
          ],
          variableNachZahl:[
            {
                token: "text",
                regex: "\\s|$",
                next: "start"
            },
            {
                token: "support.function",
                regex: "[a-zA-ZöäüÖÄÜ]+"
            },
          ],
          sound: [
            {
                token: "text",
                regex: "$",
                next: "start"
            },
            {
                token: "comment",
                regex: "\\[|\\]|\\(|\\)"
            },
            {
                token: "text",
                regex: "\\s*\\:\\s*",
                next: "variable"
            }
          ],
          gotofunction: [
            {
                token: "text",
                regex: "$",
                next: "start"
            },
            {
                token: "constant.numeric",
                regex: ".*"
            }
          ],
          tableUndZeile: [
            {
                token: "text",
                regex: "true|false|$|table",
                next: "start"
            },
            {
                token: "support.function",
                regex: "[a-zA-ZöäüÖÄÜ]"
            }
          ]
    };
};

oop.inherits(MyNewHighlightRules, TextHighlightRules);

exports.MyNewHighlightRules = MyNewHighlightRules;

});