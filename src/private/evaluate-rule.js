"use strict";
exports.__esModule = true;
exports["default"] = (function (rule, data) {
    return typeof rule === 'function' ? rule(data) : rule;
});
