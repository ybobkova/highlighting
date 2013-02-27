define("ace/mode/titorules", function(require, exports, module) {
"use strict";

var oop = require("pilot/oop");
var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

var MyNewHighlightRules = function() {
  
    var identifier = "[a-zA-ZöäüÖÄÜ]";
    var soundoperator = "\\s*\\>\\s*|\\s*\\*\\s*\\>";
    var gotooperator = "^\\s*\\=\\s*\\>";
    var ifelse = "Oder|Wenn|Ansonsten";
    var soundtype = "\\[|\\]|\\(|\\)";
    var preposition = "(?:aus|zu|zum|zur|in|jedes|für)";
    var declaration = "\\s*\\:\\=\\s*";
    var operator = "\\<|\\>|\\=\\=|\\>\\=|\\<\\=";


    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
    
   this.$rules = {
        "start" : [
            {
                token: "keyword", // Spieldeklaration bleibt weiss
                regex: "Spiel:\\s*"
            },
            {
                token: "variable", // Variablendeklaration, keine Tabelle
                regex: identifier+"+(?="+declaration+"\\d+)"
            },
            {
                token: "variable", // Wenn nach := eine variable steht
                regex: identifier+"+(?!"+declaration+"\\d+)(?="+declaration+")",
                next: "variable"
            },
            {
                token: "comment", // Wenn nach := eine variable steht
                regex: "\\#",
                next: "comment"
            },
            {
                token: "planetext",
                regex: "\\s*\\:",
                next: "declaration"
            },
            {
                token: "functions", // Anfang einer Funktiondeklaration
                regex: "^.*\\:\\s*$"
            },
            {
                token: "keyword", //Kontrollesymbole
                regex: ifelse
            },
            {
                token: "keyword", //"Für jedes"
                regex: "für jedes\\s*",
                next: "variableImText"
            },
            {
                token: "keyword", //Goto
                regex: gotooperator,
                next: "gotofunction"
            },
            {
                token: "sound", // Soundsymbole
                regex: soundoperator,
                next: "sound"
            },
            {
                token: "variable", // Variablen mit < oder > oder ==
                regex: identifier+"+\\s*(?="+operator+"\\s*)",
                next: "variable"
            },
            {
                token: "variable", // Variablen mit < oder > oder == einer Value
                regex: identifier+"+(?=\\s*(?:"+operator+")\\s*\\d+)"
            },
            {
                token: "planetext",
                regex: "^\\s*Füge\\s*",
                next: "fuegeeinen"
            },
            {
                token: "planetext",
                regex: "(?:Wähle|auf)\\s*",
                next: "waehle"
            },
            {
                token: "planetext",
                regex: preposition+"\\s+",
                next: "variableImText"
            }
          ],
          variable: [
            {
                token: "variable",
                regex: "\\s*"+identifier
            },
            {
                token: "planetext",
                regex: "true|false|\\s|$",
                next: "start"
            }
          ],
          comment: [
            {
                token: "planetext",
                regex: "$",
                next: "start"
            },
            {
                token: "comment",
                regex: ".*"
            }
          ],
          waehle: [
            {
                token: "planetext",
                regex: "(?:einen|eine|ein|von der)\\s+",
                next: "variableImText"
            },
            {
                token: "planetext",
                regex: "etwas",
                next: "start"
            },
            {
                token: "planetext",
                regex: "[0-9]+\\s*",
                next: "variableNachZahl"
            },
            {
                token: "variable",
                regex: identifier+"+",
                next: "start"
            }
          ],
          fuegeeinen: [
            {
                token: "planetext",
                regex: "(?:einen|eine|ein|von der)\\s+",
                next: "variableImText"
            },
            {
                token: "variable",
                regex: identifier+"+",
                next: "start"
            }
          ],
          variableImText:[
            {
                token: "variable",
                regex: identifier
            },
            {
                token: "planetext",
                regex: "\\s*\\d+\\s*",
                next: "variableNachZahl"
            },
            {
                token: "planetext",
                regex: "\\s",
                next: "start"
            }
          ],
          variableNachZahl:[
            {
                token: "planetext",
                regex: "\\s|$",
                next: "start"
            },
            {
                token: "variable",
                regex: identifier+"+"
            },
          ],
          sound: [
            {
                token: "planetext",
                regex: "$",
                next: "start"
            },
            {
                token: "sound",
                regex: soundtype
            },
            {
                token: "planetext",
                regex: "\\s*\\:\\s*",
                next: "variable"
            }
          ],
          gotofunction: [
            {
                token: "planetext",
                regex: "$",
                next: "start"
            },
            {
                token: "gotofunction",
                regex: ".*"
            }
          ],
          declaration: [
            {
                token: "planetext",
                regex: "true|false|$|table",
                next: "start"
            },
            {
                token: "variable",
                regex: identifier
            }
          ]
    };
        var tokenMap = {
        "variable": "support.function",
        "functions": "string",
        "sound": "comment",
        "gotofunction": "constant.language.boolean",
        "planetext": "text",
        "comment": "constant.numeric"
    };
    
    for (var state in this.$rules) {
        var stateRules = this.$rules[state];
        for (var i = stateRules.length; i--; ) {
            var rule = stateRules[i];
            if (rule.include || typeof rule == "string") {
                var args = [i, 1].concat(this.$rules[rule.include || rule]);
                if (rule.noEscape) {
                    args = args.filter(function(x) {
                        return !x.next;
                    });
                }
                stateRules.splice.apply(stateRules, args);
            } else if (rule.token in tokenMap) {
                rule.token = tokenMap[rule.token];
            }
        }
    }

};

oop.inherits(MyNewHighlightRules, TextHighlightRules);

exports.MyNewHighlightRules = MyNewHighlightRules;

});