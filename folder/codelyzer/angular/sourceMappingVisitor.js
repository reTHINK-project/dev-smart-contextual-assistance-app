"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tslint_1 = require("tslint");
var source_map_1 = require("source-map");
var LineFeed = 0x0A;
var CarriageReturn = 0x0D;
var MaxAsciiCharacter = 0x7F;
var LineSeparator = 0x2028;
var ParagraphSeparator = 0x2029;
function isLineBreak(ch) {
    return ch === LineFeed ||
        ch === CarriageReturn ||
        ch === LineSeparator ||
        ch === ParagraphSeparator;
}
exports.isLineBreak = isLineBreak;
function binarySearch(array, value, comparer, offset) {
    if (!array || array.length === 0) {
        return -1;
    }
    var low = offset || 0;
    var high = array.length - 1;
    comparer = comparer !== undefined
        ? comparer
        : function (v1, v2) { return (v1 < v2 ? -1 : (v1 > v2 ? 1 : 0)); };
    while (low <= high) {
        var middle = low + ((high - low) >> 1);
        var midValue = array[middle];
        if (comparer(midValue, value) === 0) {
            return middle;
        }
        else if (comparer(midValue, value) > 0) {
            high = middle - 1;
        }
        else {
            low = middle + 1;
        }
    }
    return ~low;
}
function getLineAndCharacterOfPosition(sourceFile, position) {
    return computeLineAndCharacterOfPosition(computeLineStarts(sourceFile), position);
}
function getPositionOfLineAndCharacter(sourceFile, line, character) {
    return computePositionOfLineAndCharacter(computeLineStarts(sourceFile), line, character);
}
function computePositionOfLineAndCharacter(lineStarts, line, character) {
    return lineStarts[line] + character;
}
function computeLineAndCharacterOfPosition(lineStarts, position) {
    var lineNumber = binarySearch(lineStarts, position);
    if (lineNumber < 0) {
        lineNumber = ~lineNumber - 1;
    }
    return {
        line: lineNumber,
        character: position - lineStarts[lineNumber]
    };
}
function computeLineStarts(text) {
    var result = new Array();
    var pos = 0;
    var lineStart = 0;
    while (pos < text.length) {
        var ch = text.charCodeAt(pos);
        pos++;
        switch (ch) {
            case CarriageReturn:
                if (text.charCodeAt(pos) === LineFeed) {
                    pos++;
                }
            case LineFeed:
                result.push(lineStart);
                lineStart = pos;
                break;
            default:
                if (ch > MaxAsciiCharacter && isLineBreak(ch)) {
                    result.push(lineStart);
                    lineStart = pos;
                }
                break;
        }
    }
    result.push(lineStart);
    return result;
}
var SourceMappingVisitor = (function (_super) {
    __extends(SourceMappingVisitor, _super);
    function SourceMappingVisitor(sourceFile, options, codeWithMap, basePosition) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.codeWithMap = codeWithMap;
        _this.basePosition = basePosition;
        if (_this.codeWithMap.map) {
            _this.consumer = new source_map_1.SourceMapConsumer(_this.codeWithMap.map);
        }
        return _this;
    }
    SourceMappingVisitor.prototype.createFailure = function (s, l, message, fix) {
        var _a = this.getMappedInterval(s, l), start = _a.start, length = _a.length;
        return _super.prototype.createFailure.call(this, start, length, message, fix);
    };
    SourceMappingVisitor.prototype.createReplacement = function (s, l, replacement) {
        var _a = this.getMappedInterval(s, l), start = _a.start, length = _a.length;
        return _super.prototype.createReplacement.call(this, start, length, replacement);
    };
    SourceMappingVisitor.prototype.getSourcePosition = function (pos) {
        if (this.consumer) {
            try {
                var absPos = getLineAndCharacterOfPosition(this.codeWithMap.code, pos);
                var result = this.consumer.originalPositionFor({ line: absPos.line + 1, column: absPos.character + 1 });
                absPos = { line: result.line - 1, character: result.column - 1 };
                pos = getPositionOfLineAndCharacter(this.codeWithMap.source, absPos.line, absPos.character);
            }
            catch (e) {
                console.log(e);
            }
        }
        return pos + this.basePosition;
    };
    SourceMappingVisitor.prototype.getMappedInterval = function (start, length) {
        var end = start + length;
        start = this.getSourcePosition(start);
        end = this.getSourcePosition(end);
        return { start: start, length: end - start };
    };
    return SourceMappingVisitor;
}(tslint_1.RuleWalker));
exports.SourceMappingVisitor = SourceMappingVisitor;
