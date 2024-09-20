'use strict';

var helpers = require('./helpers.js');
var components = require('./components.js');
var index$1 = require('./SearchForm/index.js');
var index = require('./ModalForm/index.js');

var install = helpers.createPlugin(Object.values(components));

exports.SearchForm = index$1.default;
exports.SearchFormItem = index$1.SearchFormItem;
exports.ModalForm = index.default;
exports.install = install;
