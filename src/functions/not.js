"use strict";
exports.__esModule = true;
var evaluate_rule_1 = require("../private/evaluate-rule");
var attach_to_json_1 = require("../private/attach-to-json");
exports["default"] = (function (rule) {
    return (0, attach_to_json_1["default"])(function not(data) {
        return !(0, evaluate_rule_1["default"])(rule, data);
    }, [rule], 'not');
});
