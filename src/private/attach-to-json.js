"use strict";
exports.__esModule = true;
function attachToJson(fn, rules, name) {
    var _a;
    var ruleJson = (_a = {}, _a[name] = [], _a);
    rules.forEach(function (rule) {
        if (typeof rule === 'boolean') {
            ruleJson[name].push(rule);
        }
        else {
            ruleJson[name].push(JSON.parse(rule.toJson()));
        }
    });
    fn.toJson = function () { return JSON.stringify(ruleJson); };
    return fn;
}
exports["default"] = attachToJson;
