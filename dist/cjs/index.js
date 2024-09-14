'use strict';

var index = require('./ModalForm/index.js');
var index$1 = require('./SearchForm/index.js');
var helpers = require('./helpers.js');

var components = [index.default, index$1.default, index$1.SearchFormItem];
var install = helpers.createPlugin(components);

exports.ModalForm = index.default;
exports.SearchForm = index$1.default;
exports.SearchFormItem = index$1.SearchFormItem;
exports.install = install;
