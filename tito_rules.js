define("ace/mode/titorules", function(require, exports, module) {
  "use strict";

  var oop = require("pilot/oop");
  var TextHighlightRules = require("ace/mode/text_highlight_rules").TextHighlightRules;

  var MyNewHighlightRules = function() {
    var identifier = "[a-zA-ZöäüÖÄÜ]";
    var soundOperator = "\\s*\\>\\s*|\\s*\\*\\s*\\>";
    var gotoOperator = "^\\s*\\=\\s*\\>";
    var ifElse = "Oder|Wenn|Ansonsten";
    var soundType = "\\[|\\]|\\(|\\)";
    var preposition = "(?:aus|zu|zum|zur|in|jedes|für)";
    var equals = "\\s*\\:\\=\\s*";
    var operator = "\\<|\\>|\\=\\=|\\>\\=|\\<\\=";

    this.$rules = {
      "start" : [
        {
          token: "keyword", // Spieldeklaration bleibt weiss
          regex: "Spiel:\\s*"
        },
        {
          token: "variable", // Variablendeklaration, keine Tabelle
          regex: identifier+"+(?="+equals+"\\d+)"
        },
        {
          token: "variable", // Wenn nach := eine variable steht
          regex: identifier+"+(?!"+equals+"\\d+)(?="+equals+")",
          next: "variable"
        },
        {
          token: "comment", // Wenn nach := eine variable steht
          regex: "\\#",
          next: "comment"
        },
        {
          token: "plaintext",
          regex: "\\s*\\:",
          next: "declaration"
        },
        {
          token: "functions", // Anfang einer Funktiondeklaration
          regex: "^.*\\:\\s*$"
        },
        {
          token: "keyword", //Kontrollesymbole
          regex: ifElse
        },
        {
          token: "keyword", //"Für jedes"
          regex: "für jedes\\s*",
          next: "variableImText"
        },
        {
          token: "keyword", //Goto
          regex: gotoOperator,
          next: "gotoFunction"
        },
        {
          token: "sound", // Soundsymbole
          regex: soundOperator,
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
          token: "plaintext",
          regex: "^\\s*Füge\\s*",
          next: "fuegeEinen"
        },
        {
          token: "plaintext",
          regex: "(?:Wähle|auf)\\s*",
          next: "waehle"
        },
        {
          token: "plaintext",
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
          token: "plaintext",
          regex: "true|false|\\s|$",
          next: "start"
        }
      ],
      comment: [
        {
          token: "plaintext",
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
          token: "plaintext",
          regex: "(?:einen|eine|ein|von der)\\s+",
          next: "variableImText"
        },
        {
          token: "plaintext",
          regex: "etwas",
          next: "start"
        },
        {
          token: "plaintext",
          regex: "[0-9]+\\s*",
          next: "variableNachZahl"
        },
        {
          token: "variable",
          regex: identifier+"+",
          next: "start"
        }
      ],
      fuegeEinen: [
        {
          token: "plaintext",
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
          token: "plaintext",
          regex: "\\s*\\d+\\s*",
          next: "variableNachZahl"
        },
        {
          token: "plaintext",
          regex: "\\s",
          next: "start"
        }
      ],
      variableNachZahl:[
        {
          token: "plaintext",
          regex: "\\s|$",
          next: "start"
        },
        {
          token: "variable",
          regex: identifier+"+"
        }
      ],
      sound: [
        {
          token: "plaintext",
          regex: "$",
          next: "start"
        },
        {
          token: "sound",
          regex: soundType
        },
        {
          token: "plaintext",
          regex: "\\s*\\:\\s*",
          next: "variable"
        }
      ],
      gotoFunction: [
        {
          token: "plaintext",
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
          token: "plaintext",
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
      "plaintext": "text",
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