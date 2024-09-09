'use strict';

var index = require('./ModalForm/index.js');
var index$1 = require('./SearchForm/index.js');
var helpers = require('./helpers.js');

var components = [index, index$1.default, index$1.SearchFormItem];
var Plugin = helpers.createPlugin(components);

exports.ModalForm = index;
exports.SearchForm = index$1.default;
exports.SearchFormItem = index$1.SearchFormItem;
exports.Plugin = Plugin;
