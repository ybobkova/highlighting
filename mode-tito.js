define("ace/mode/tito", ["require", "exports", "module"], function(require, exports, module) {
"use strict";

var oop = require("pilot/oop");
// defines the parent mode
var TextMode = require("ace/mode/text").Mode;
console.log(TextMode);
var Tokenizer = require("ace/tokenizer").Tokenizer;
//var MatchingBraceOutdent = require("ace/mode/matching_brace_outdent").MatchingBraceOutdent;

// defines the language specific highlighters and folding rules
var MyNewHighlightRules = require("ace/mode/titorules").MyNewHighlightRules;

var Mode = function() {
    // set everything up
    var highlighter = new MyNewHighlightRules();
 //   this.$outdent = new MatchingBraceOutdent();
    //this.foldingRules = new MyNewFoldMode();

    this.$tokenizer = new Tokenizer(highlighter.getRules());
};
oop.inherits(Mode, TextMode);

(function() {
    // Extra logic goes here--we won't be covering all of this

    /* These are all optional pieces of code!
    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);
        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/mynew_worker", "NewWorker");
        worker.attachToDocument(session.getDocument());

        return worker;
    };
    */
}).call(Mode.prototype);

exports.Mode = Mode;
});