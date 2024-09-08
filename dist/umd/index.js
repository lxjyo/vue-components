(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('ant-design-vue'), require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'ant-design-vue', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueAntdComps = {}, global.Antd, global.Vue));
})(this, (function (exports, antDesignVue, vue) { 'use strict';

  var script = vue.defineComponent({
      name: 'ModalForm',
      props: {
          /**
           * 是否显示 v-model:open
           * @type {boolean}
           */
          open: Boolean,
          /**
           * 表单数据
           */
          model: {
              type: Object,
              required: true
          },
          /**
           * 表单验证规则
           */
          rules: Object,
          /**
           * 表单标签布局
           */
          labelCol: {
              type: Object,
              default: () => ({
                  span: 4
              })
          },
          /**
           * 表单内容布局
           */
          wrapperCol: {
              type: Object,
              default: () => ({
                  span: 20
              })
          }
      },
      emits: {
          'update:open': (value) => typeof value === 'boolean',
          /**
           * 确认按钮事件(表单验证后触发)
           * @param param0 modal 确认按钮回调参数
           * @returns
           */
          ok: ({ resolve, reject }) => typeof resolve === 'function' && typeof reject === 'function',
          /**
           * 取消按钮事件
           */
          cancel: null
      },
      setup(props, { slots, emit }) {
          const confirmLoading = vue.ref(false);
          const formRef = vue.ref();
          const onSubmit = async () => {
              try {
                  await formRef.value?.validate();
                  confirmLoading.value = true;
                  const message = await new Promise((resolve, reject) => {
                      emit('ok', { resolve, reject });
                  });
                  if (typeof message === 'string') {
                      antDesignVue.notification.success({
                          message
                      });
                  }
                  onClose();
              }
              catch (err) {
                  console.log(err);
              }
              finally {
                  confirmLoading.value = false;
              }
          };
          const onClose = () => {
              formRef.value?.resetFields();
              emit('update:open', false);
              emit('cancel');
          };
          const { default: defaultSlot, ...otherSlots } = slots;
          return () => vue.h(antDesignVue.Modal, {
              open: props.open,
              width: 640,
              maskClosable: false,
              confirmLoading: confirmLoading.value,
              onCancel: onClose,
              onOk: onSubmit
          }, {
              ...otherSlots,
              default: () => [
                  vue.h(antDesignVue.Form, {
                      ref: formRef,
                      ...props
                  }, {
                      default: defaultSlot
                  })
              ]
          });
      }
  });

  script.__file = "components/ModalForm/index.vue";

  var withInstall = function withInstall(component) {
    component.install = function (app) {
      var name = component.name;
      // 注册组件
      app.component(name, component);
    };
    return component;
  };
  /**
   * 创建一个Vue插件，用于注册一组组件。
   * @param components 组件数组，每个组件应该是一个具有 `name` 属性的 Vue 组件。
   * @returns Vue插件对象，包含一个`install`方法。
   */
  function createPlugin(components) {
    return {
      install: function install(app) {
        components.forEach(function (component) {
          app.component(component.name, component);
        });
      }
    };
  }

  var ModalForm = withInstall(script);

  /**
   * Take input from [0, n] and return it as [0, 1]
   * @hidden
   */
  function bound01(n, max) {
      if (isOnePointZero(n)) {
          n = '100%';
      }
      var isPercent = isPercentage(n);
      n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
      // Automatically convert percentage into number
      if (isPercent) {
          n = parseInt(String(n * max), 10) / 100;
      }
      // Handle floating point rounding errors
      if (Math.abs(n - max) < 0.000001) {
          return 1;
      }
      // Convert into [0, 1] range if it isn't already
      if (max === 360) {
          // If n is a hue given in degrees,
          // wrap around out-of-range values into [0, 360] range
          // then convert into [0, 1].
          n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
      }
      else {
          // If n not a hue given in degrees
          // Convert into [0, 1] range if it isn't already.
          n = (n % max) / parseFloat(String(max));
      }
      return n;
  }
  /**
   * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
   * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
   * @hidden
   */
  function isOnePointZero(n) {
      return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
  }
  /**
   * Check to see if string passed in is a percentage
   * @hidden
   */
  function isPercentage(n) {
      return typeof n === 'string' && n.indexOf('%') !== -1;
  }
  /**
   * Return a valid alpha value [0,1] with all invalid values being set to 1
   * @hidden
   */
  function boundAlpha(a) {
      a = parseFloat(a);
      if (isNaN(a) || a < 0 || a > 1) {
          a = 1;
      }
      return a;
  }
  /**
   * Replace a decimal with it's percentage value
   * @hidden
   */
  function convertToPercentage(n) {
      if (n <= 1) {
          return "".concat(Number(n) * 100, "%");
      }
      return n;
  }
  /**
   * Force a hex value to have 2 characters
   * @hidden
   */
  function pad2(c) {
      return c.length === 1 ? '0' + c : String(c);
  }

  // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
  // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
  /**
   * Handle bounds / percentage checking to conform to CSS color spec
   * <http://www.w3.org/TR/css3-color/>
   * *Assumes:* r, g, b in [0, 255] or [0, 1]
   * *Returns:* { r, g, b } in [0, 255]
   */
  function rgbToRgb(r, g, b) {
      return {
          r: bound01(r, 255) * 255,
          g: bound01(g, 255) * 255,
          b: bound01(b, 255) * 255,
      };
  }
  function hue2rgb(p, q, t) {
      if (t < 0) {
          t += 1;
      }
      if (t > 1) {
          t -= 1;
      }
      if (t < 1 / 6) {
          return p + (q - p) * (6 * t);
      }
      if (t < 1 / 2) {
          return q;
      }
      if (t < 2 / 3) {
          return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
  }
  /**
   * Converts an HSL color value to RGB.
   *
   * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
   * *Returns:* { r, g, b } in the set [0, 255]
   */
  function hslToRgb(h, s, l) {
      var r;
      var g;
      var b;
      h = bound01(h, 360);
      s = bound01(s, 100);
      l = bound01(l, 100);
      if (s === 0) {
          // achromatic
          g = l;
          b = l;
          r = l;
      }
      else {
          var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          var p = 2 * l - q;
          r = hue2rgb(p, q, h + 1 / 3);
          g = hue2rgb(p, q, h);
          b = hue2rgb(p, q, h - 1 / 3);
      }
      return { r: r * 255, g: g * 255, b: b * 255 };
  }
  /**
   * Converts an RGB color value to HSV
   *
   * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
   * *Returns:* { h, s, v } in [0,1]
   */
  function rgbToHsv(r, g, b) {
      r = bound01(r, 255);
      g = bound01(g, 255);
      b = bound01(b, 255);
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h = 0;
      var v = max;
      var d = max - min;
      var s = max === 0 ? 0 : d / max;
      if (max === min) {
          h = 0; // achromatic
      }
      else {
          switch (max) {
              case r:
                  h = (g - b) / d + (g < b ? 6 : 0);
                  break;
              case g:
                  h = (b - r) / d + 2;
                  break;
              case b:
                  h = (r - g) / d + 4;
                  break;
          }
          h /= 6;
      }
      return { h: h, s: s, v: v };
  }
  /**
   * Converts an HSV color value to RGB.
   *
   * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
   * *Returns:* { r, g, b } in the set [0, 255]
   */
  function hsvToRgb(h, s, v) {
      h = bound01(h, 360) * 6;
      s = bound01(s, 100);
      v = bound01(v, 100);
      var i = Math.floor(h);
      var f = h - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);
      var mod = i % 6;
      var r = [v, q, p, p, t, v][mod];
      var g = [t, v, v, q, p, p][mod];
      var b = [p, p, t, v, v, q][mod];
      return { r: r * 255, g: g * 255, b: b * 255 };
  }
  /**
   * Converts an RGB color to hex
   *
   * Assumes r, g, and b are contained in the set [0, 255]
   * Returns a 3 or 6 character hex
   */
  function rgbToHex(r, g, b, allow3Char) {
      var hex = [
          pad2(Math.round(r).toString(16)),
          pad2(Math.round(g).toString(16)),
          pad2(Math.round(b).toString(16)),
      ];
      return hex.join('');
  }
  /** Converts a hex value to a decimal */
  function convertHexToDecimal(h) {
      return parseIntFromHex(h) / 255;
  }
  /** Parse a base-16 hex value into a base-10 integer */
  function parseIntFromHex(val) {
      return parseInt(val, 16);
  }

  // https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
  /**
   * @hidden
   */
  var names = {
      aliceblue: '#f0f8ff',
      antiquewhite: '#faebd7',
      aqua: '#00ffff',
      aquamarine: '#7fffd4',
      azure: '#f0ffff',
      beige: '#f5f5dc',
      bisque: '#ffe4c4',
      black: '#000000',
      blanchedalmond: '#ffebcd',
      blue: '#0000ff',
      blueviolet: '#8a2be2',
      brown: '#a52a2a',
      burlywood: '#deb887',
      cadetblue: '#5f9ea0',
      chartreuse: '#7fff00',
      chocolate: '#d2691e',
      coral: '#ff7f50',
      cornflowerblue: '#6495ed',
      cornsilk: '#fff8dc',
      crimson: '#dc143c',
      cyan: '#00ffff',
      darkblue: '#00008b',
      darkcyan: '#008b8b',
      darkgoldenrod: '#b8860b',
      darkgray: '#a9a9a9',
      darkgreen: '#006400',
      darkgrey: '#a9a9a9',
      darkkhaki: '#bdb76b',
      darkmagenta: '#8b008b',
      darkolivegreen: '#556b2f',
      darkorange: '#ff8c00',
      darkorchid: '#9932cc',
      darkred: '#8b0000',
      darksalmon: '#e9967a',
      darkseagreen: '#8fbc8f',
      darkslateblue: '#483d8b',
      darkslategray: '#2f4f4f',
      darkslategrey: '#2f4f4f',
      darkturquoise: '#00ced1',
      darkviolet: '#9400d3',
      deeppink: '#ff1493',
      deepskyblue: '#00bfff',
      dimgray: '#696969',
      dimgrey: '#696969',
      dodgerblue: '#1e90ff',
      firebrick: '#b22222',
      floralwhite: '#fffaf0',
      forestgreen: '#228b22',
      fuchsia: '#ff00ff',
      gainsboro: '#dcdcdc',
      ghostwhite: '#f8f8ff',
      goldenrod: '#daa520',
      gold: '#ffd700',
      gray: '#808080',
      green: '#008000',
      greenyellow: '#adff2f',
      grey: '#808080',
      honeydew: '#f0fff0',
      hotpink: '#ff69b4',
      indianred: '#cd5c5c',
      indigo: '#4b0082',
      ivory: '#fffff0',
      khaki: '#f0e68c',
      lavenderblush: '#fff0f5',
      lavender: '#e6e6fa',
      lawngreen: '#7cfc00',
      lemonchiffon: '#fffacd',
      lightblue: '#add8e6',
      lightcoral: '#f08080',
      lightcyan: '#e0ffff',
      lightgoldenrodyellow: '#fafad2',
      lightgray: '#d3d3d3',
      lightgreen: '#90ee90',
      lightgrey: '#d3d3d3',
      lightpink: '#ffb6c1',
      lightsalmon: '#ffa07a',
      lightseagreen: '#20b2aa',
      lightskyblue: '#87cefa',
      lightslategray: '#778899',
      lightslategrey: '#778899',
      lightsteelblue: '#b0c4de',
      lightyellow: '#ffffe0',
      lime: '#00ff00',
      limegreen: '#32cd32',
      linen: '#faf0e6',
      magenta: '#ff00ff',
      maroon: '#800000',
      mediumaquamarine: '#66cdaa',
      mediumblue: '#0000cd',
      mediumorchid: '#ba55d3',
      mediumpurple: '#9370db',
      mediumseagreen: '#3cb371',
      mediumslateblue: '#7b68ee',
      mediumspringgreen: '#00fa9a',
      mediumturquoise: '#48d1cc',
      mediumvioletred: '#c71585',
      midnightblue: '#191970',
      mintcream: '#f5fffa',
      mistyrose: '#ffe4e1',
      moccasin: '#ffe4b5',
      navajowhite: '#ffdead',
      navy: '#000080',
      oldlace: '#fdf5e6',
      olive: '#808000',
      olivedrab: '#6b8e23',
      orange: '#ffa500',
      orangered: '#ff4500',
      orchid: '#da70d6',
      palegoldenrod: '#eee8aa',
      palegreen: '#98fb98',
      paleturquoise: '#afeeee',
      palevioletred: '#db7093',
      papayawhip: '#ffefd5',
      peachpuff: '#ffdab9',
      peru: '#cd853f',
      pink: '#ffc0cb',
      plum: '#dda0dd',
      powderblue: '#b0e0e6',
      purple: '#800080',
      rebeccapurple: '#663399',
      red: '#ff0000',
      rosybrown: '#bc8f8f',
      royalblue: '#4169e1',
      saddlebrown: '#8b4513',
      salmon: '#fa8072',
      sandybrown: '#f4a460',
      seagreen: '#2e8b57',
      seashell: '#fff5ee',
      sienna: '#a0522d',
      silver: '#c0c0c0',
      skyblue: '#87ceeb',
      slateblue: '#6a5acd',
      slategray: '#708090',
      slategrey: '#708090',
      snow: '#fffafa',
      springgreen: '#00ff7f',
      steelblue: '#4682b4',
      tan: '#d2b48c',
      teal: '#008080',
      thistle: '#d8bfd8',
      tomato: '#ff6347',
      turquoise: '#40e0d0',
      violet: '#ee82ee',
      wheat: '#f5deb3',
      white: '#ffffff',
      whitesmoke: '#f5f5f5',
      yellow: '#ffff00',
      yellowgreen: '#9acd32',
  };

  /* eslint-disable @typescript-eslint/no-redundant-type-constituents */
  /**
   * Given a string or object, convert that input to RGB
   *
   * Possible string inputs:
   * ```
   * "red"
   * "#f00" or "f00"
   * "#ff0000" or "ff0000"
   * "#ff000000" or "ff000000"
   * "rgb 255 0 0" or "rgb (255, 0, 0)"
   * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
   * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
   * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
   * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
   * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
   * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
   * ```
   */
  function inputToRGB(color) {
      var rgb = { r: 0, g: 0, b: 0 };
      var a = 1;
      var s = null;
      var v = null;
      var l = null;
      var ok = false;
      var format = false;
      if (typeof color === 'string') {
          color = stringInputToObject(color);
      }
      if (typeof color === 'object') {
          if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
              rgb = rgbToRgb(color.r, color.g, color.b);
              ok = true;
              format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
          }
          else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
              s = convertToPercentage(color.s);
              v = convertToPercentage(color.v);
              rgb = hsvToRgb(color.h, s, v);
              ok = true;
              format = 'hsv';
          }
          else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
              s = convertToPercentage(color.s);
              l = convertToPercentage(color.l);
              rgb = hslToRgb(color.h, s, l);
              ok = true;
              format = 'hsl';
          }
          if (Object.prototype.hasOwnProperty.call(color, 'a')) {
              a = color.a;
          }
      }
      a = boundAlpha(a);
      return {
          ok: ok,
          format: color.format || format,
          r: Math.min(255, Math.max(rgb.r, 0)),
          g: Math.min(255, Math.max(rgb.g, 0)),
          b: Math.min(255, Math.max(rgb.b, 0)),
          a: a,
      };
  }
  // <http://www.w3.org/TR/css3-values/#integers>
  var CSS_INTEGER = '[-\\+]?\\d+%?';
  // <http://www.w3.org/TR/css3-values/#number-value>
  var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
  // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
  var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
  // Actual matching.
  // Parentheses and commas are optional, but not required.
  // Whitespace can take the place of commas or opening paren
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
  var matchers = {
      CSS_UNIT: new RegExp(CSS_UNIT),
      rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
      rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
      hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
      hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
      hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
      hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };
  /**
   * Permissive string parsing.  Take in a number of formats, and output an object
   * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
   */
  function stringInputToObject(color) {
      color = color.trim().toLowerCase();
      if (color.length === 0) {
          return false;
      }
      var named = false;
      if (names[color]) {
          color = names[color];
          named = true;
      }
      else if (color === 'transparent') {
          return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
      }
      // Try to match string input using regular expressions.
      // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
      // Just return an object and let the conversion functions handle that.
      // This way the result will be the same whether the tinycolor is initialized with string or object.
      var match = matchers.rgb.exec(color);
      if (match) {
          return { r: match[1], g: match[2], b: match[3] };
      }
      match = matchers.rgba.exec(color);
      if (match) {
          return { r: match[1], g: match[2], b: match[3], a: match[4] };
      }
      match = matchers.hsl.exec(color);
      if (match) {
          return { h: match[1], s: match[2], l: match[3] };
      }
      match = matchers.hsla.exec(color);
      if (match) {
          return { h: match[1], s: match[2], l: match[3], a: match[4] };
      }
      match = matchers.hsv.exec(color);
      if (match) {
          return { h: match[1], s: match[2], v: match[3] };
      }
      match = matchers.hsva.exec(color);
      if (match) {
          return { h: match[1], s: match[2], v: match[3], a: match[4] };
      }
      match = matchers.hex8.exec(color);
      if (match) {
          return {
              r: parseIntFromHex(match[1]),
              g: parseIntFromHex(match[2]),
              b: parseIntFromHex(match[3]),
              a: convertHexToDecimal(match[4]),
              format: named ? 'name' : 'hex8',
          };
      }
      match = matchers.hex6.exec(color);
      if (match) {
          return {
              r: parseIntFromHex(match[1]),
              g: parseIntFromHex(match[2]),
              b: parseIntFromHex(match[3]),
              format: named ? 'name' : 'hex',
          };
      }
      match = matchers.hex4.exec(color);
      if (match) {
          return {
              r: parseIntFromHex(match[1] + match[1]),
              g: parseIntFromHex(match[2] + match[2]),
              b: parseIntFromHex(match[3] + match[3]),
              a: convertHexToDecimal(match[4] + match[4]),
              format: named ? 'name' : 'hex8',
          };
      }
      match = matchers.hex3.exec(color);
      if (match) {
          return {
              r: parseIntFromHex(match[1] + match[1]),
              g: parseIntFromHex(match[2] + match[2]),
              b: parseIntFromHex(match[3] + match[3]),
              format: named ? 'name' : 'hex',
          };
      }
      return false;
  }
  /**
   * Check to see if it looks like a CSS unit
   * (see `matchers` above for definition).
   */
  function isValidCSSUnit(color) {
      return Boolean(matchers.CSS_UNIT.exec(String(color)));
  }

  var hueStep = 2; // 色相阶梯

  var saturationStep = 0.16; // 饱和度阶梯，浅色部分

  var saturationStep2 = 0.05; // 饱和度阶梯，深色部分

  var brightnessStep1 = 0.05; // 亮度阶梯，浅色部分

  var brightnessStep2 = 0.15; // 亮度阶梯，深色部分

  var lightColorCount = 5; // 浅色数量，主色上

  var darkColorCount = 4; // 深色数量，主色下
  // 暗色主题颜色映射关系表

  var darkColorMap = [{
    index: 7,
    opacity: 0.15
  }, {
    index: 6,
    opacity: 0.25
  }, {
    index: 5,
    opacity: 0.3
  }, {
    index: 5,
    opacity: 0.45
  }, {
    index: 5,
    opacity: 0.65
  }, {
    index: 5,
    opacity: 0.85
  }, {
    index: 4,
    opacity: 0.9
  }, {
    index: 3,
    opacity: 0.95
  }, {
    index: 2,
    opacity: 0.97
  }, {
    index: 1,
    opacity: 0.98
  }]; // Wrapper function ported from TinyColor.prototype.toHsv
  // Keep it here because of `hsv.h * 360`

  function toHsv(_ref) {
    var r = _ref.r,
        g = _ref.g,
        b = _ref.b;
    var hsv = rgbToHsv(r, g, b);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v
    };
  } // Wrapper function ported from TinyColor.prototype.toHexString
  // Keep it here because of the prefix `#`


  function toHex(_ref2) {
    var r = _ref2.r,
        g = _ref2.g,
        b = _ref2.b;
    return "#".concat(rgbToHex(r, g, b));
  } // Wrapper function ported from TinyColor.prototype.mix, not treeshakable.
  // Amount in range [0, 1]
  // Assume color1 & color2 has no alpha, since the following src code did so.


  function mix(rgb1, rgb2, amount) {
    var p = amount / 100;
    var rgb = {
      r: (rgb2.r - rgb1.r) * p + rgb1.r,
      g: (rgb2.g - rgb1.g) * p + rgb1.g,
      b: (rgb2.b - rgb1.b) * p + rgb1.b
    };
    return rgb;
  }

  function getHue(hsv, i, light) {
    var hue; // 根据色相不同，色相转向不同

    if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
      hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
    } else {
      hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
    }

    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }

    return hue;
  }

  function getSaturation(hsv, i, light) {
    // grey color don't change saturation
    if (hsv.h === 0 && hsv.s === 0) {
      return hsv.s;
    }

    var saturation;

    if (light) {
      saturation = hsv.s - saturationStep * i;
    } else if (i === darkColorCount) {
      saturation = hsv.s + saturationStep;
    } else {
      saturation = hsv.s + saturationStep2 * i;
    } // 边界值修正


    if (saturation > 1) {
      saturation = 1;
    } // 第一格的 s 限制在 0.06-0.1 之间


    if (light && i === lightColorCount && saturation > 0.1) {
      saturation = 0.1;
    }

    if (saturation < 0.06) {
      saturation = 0.06;
    }

    return Number(saturation.toFixed(2));
  }

  function getValue(hsv, i, light) {
    var value;

    if (light) {
      value = hsv.v + brightnessStep1 * i;
    } else {
      value = hsv.v - brightnessStep2 * i;
    }

    if (value > 1) {
      value = 1;
    }

    return Number(value.toFixed(2));
  }

  function generate$1(color) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var patterns = [];
    var pColor = inputToRGB(color);

    for (var i = lightColorCount; i > 0; i -= 1) {
      var hsv = toHsv(pColor);
      var colorString = toHex(inputToRGB({
        h: getHue(hsv, i, true),
        s: getSaturation(hsv, i, true),
        v: getValue(hsv, i, true)
      }));
      patterns.push(colorString);
    }

    patterns.push(toHex(pColor));

    for (var _i = 1; _i <= darkColorCount; _i += 1) {
      var _hsv = toHsv(pColor);

      var _colorString = toHex(inputToRGB({
        h: getHue(_hsv, _i),
        s: getSaturation(_hsv, _i),
        v: getValue(_hsv, _i)
      }));

      patterns.push(_colorString);
    } // dark theme patterns


    if (opts.theme === 'dark') {
      return darkColorMap.map(function (_ref3) {
        var index = _ref3.index,
            opacity = _ref3.opacity;
        var darkColorString = toHex(mix(inputToRGB(opts.backgroundColor || '#141414'), inputToRGB(patterns[index]), opacity * 100));
        return darkColorString;
      });
    }

    return patterns;
  }

  var presetPrimaryColors = {
    red: '#F5222D',
    volcano: '#FA541C',
    orange: '#FA8C16',
    gold: '#FAAD14',
    yellow: '#FADB14',
    lime: '#A0D911',
    green: '#52C41A',
    cyan: '#13C2C2',
    blue: '#1890FF',
    geekblue: '#2F54EB',
    purple: '#722ED1',
    magenta: '#EB2F96',
    grey: '#666666'
  };
  var presetPalettes = {};
  var presetDarkPalettes = {};
  Object.keys(presetPrimaryColors).forEach(function (key) {
    presetPalettes[key] = generate$1(presetPrimaryColors[key]);
    presetPalettes[key].primary = presetPalettes[key][5]; // dark presetPalettes

    presetDarkPalettes[key] = generate$1(presetPrimaryColors[key], {
      theme: 'dark',
      backgroundColor: '#141414'
    });
    presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
  });
  var blue = presetPalettes.blue;

  var contextKey = Symbol('iconContext');
  var useInjectIconContext = function useInjectIconContext() {
    return vue.inject(contextKey, {
      prefixCls: vue.ref('anticon'),
      rootClassName: vue.ref(''),
      csp: vue.ref()
    });
  };

  function canUseDom() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  }

  function contains(root, n) {
    if (!root) {
      return false;
    } // Use native if support


    if (root.contains) {
      return root.contains(n);
    }

    return false;
  }

  var APPEND_ORDER = 'data-vc-order';
  var MARK_KEY = "vc-icon-key";
  var containerCache = new Map();

  function getMark() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        mark = _ref.mark;

    if (mark) {
      return mark.startsWith('data-') ? mark : "data-".concat(mark);
    }

    return MARK_KEY;
  }

  function getContainer(option) {
    if (option.attachTo) {
      return option.attachTo;
    }

    var head = document.querySelector('head');
    return head || document.body;
  }

  function getOrder(prepend) {
    if (prepend === 'queue') {
      return 'prependQueue';
    }

    return prepend ? 'prepend' : 'append';
  }
  /**
   * Find style which inject by rc-util
   */


  function findStyles(container) {
    return Array.from((containerCache.get(container) || container).children).filter(function (node) {
      return node.tagName === 'STYLE';
    });
  }

  function injectCSS(css) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!canUseDom()) {
      return null;
    }

    var csp = option.csp,
        prepend = option.prepend;
    var styleNode = document.createElement('style');
    styleNode.setAttribute(APPEND_ORDER, getOrder(prepend));

    if (csp && csp.nonce) {
      styleNode.nonce = csp.nonce;
    }

    styleNode.innerHTML = css;
    var container = getContainer(option);
    var firstChild = container.firstChild;

    if (prepend) {
      // If is queue `prepend`, it will prepend first style and then append rest style
      if (prepend === 'queue') {
        var existStyle = findStyles(container).filter(function (node) {
          return ['prepend', 'prependQueue'].includes(node.getAttribute(APPEND_ORDER));
        });

        if (existStyle.length) {
          container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
          return styleNode;
        }
      } // Use `insertBefore` as `prepend`


      container.insertBefore(styleNode, firstChild);
    } else {
      container.appendChild(styleNode);
    }

    return styleNode;
  }

  function findExistNode(key) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var container = getContainer(option);
    return findStyles(container).find(function (node) {
      return node.getAttribute(getMark(option)) === key;
    });
  }
  /**
   * qiankun will inject `appendChild` to insert into other
   */

  function syncRealContainer(container, option) {
    var cachedRealContainer = containerCache.get(container); // Find real container when not cached or cached container removed

    if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
      var placeholderStyle = injectCSS('', option);
      var parentNode = placeholderStyle.parentNode;
      containerCache.set(container, parentNode);
      container.removeChild(placeholderStyle);
    }
  }
  function updateCSS(css, key) {
    var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var container = getContainer(option); // Sync real parent

    syncRealContainer(container, option);
    var existNode = findExistNode(key, option);

    if (existNode) {
      if (option.csp && option.csp.nonce && existNode.nonce !== option.csp.nonce) {
        existNode.nonce = option.csp.nonce;
      }

      if (existNode.innerHTML !== css) {
        existNode.innerHTML = css;
      }

      return existNode;
    }

    var newNode = injectCSS(css, option);
    newNode.setAttribute(getMark(option), key);
    return newNode;
  }

  function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$3(target, key, source[key]); }); } return target; }

  function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function warn(valid, message) {
    // Support uglify
    if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
      console.error("Warning: ".concat(message));
    }
  }
  function warning(valid, message) {
    warn(valid, "[@ant-design/icons-vue] ".concat(message));
  }


  function isIconDefinition(target) {
    return typeof target === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && (typeof target.icon === 'object' || typeof target.icon === 'function');
  }
  function generate(node, key, rootProps) {
    if (!rootProps) {
      return vue.h(node.tag, _objectSpread$3({
        key: key
      }, node.attrs), (node.children || []).map(function (child, index) {
        return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
      }));
    }

    return vue.h(node.tag, _objectSpread$3({
      key: key
    }, rootProps, node.attrs), (node.children || []).map(function (child, index) {
      return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
    }));
  }
  function getSecondaryColor(primaryColor) {
    // choose the second color
    return generate$1(primaryColor)[0];
  }
  function normalizeTwoToneColors(twoToneColor) {
    if (!twoToneColor) {
      return [];
    }

    return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
  } // These props make sure that the SVG behaviours like general text.
  var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";

  function getRoot(ele) {
    return ele && ele.getRootNode && ele.getRootNode();
  }
  /**
   * Check if is in shadowRoot
   */


  function inShadow(ele) {
    if (!canUseDom()) {
      return false;
    }

    return getRoot(ele) instanceof ShadowRoot;
  }
  /**
   * Return shadowRoot if possible
   */


  function getShadowRoot(ele) {
    return inShadow(ele) ? getRoot(ele) : null;
  }

  var useInsertStyles = function useInsertStyles() {
    var _useInjectIconContext = useInjectIconContext(),
        prefixCls = _useInjectIconContext.prefixCls,
        csp = _useInjectIconContext.csp;

    var instance = vue.getCurrentInstance();
    var mergedStyleStr = iconStyles;

    if (prefixCls) {
      mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls.value);
    }

    vue.nextTick(function () {
      if (!canUseDom()) {
        return;
      }

      var ele = instance.vnode.el;
      var shadowRoot = getShadowRoot(ele);
      updateCSS(mergedStyleStr, '@ant-design-vue-icons', {
        prepend: true,
        csp: csp.value,
        attachTo: shadowRoot
      });
    });
  };

  var _excluded$1 = ["icon", "primaryColor", "secondaryColor"];

  function _objectWithoutProperties$1(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$1(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } return target; }

  function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var twoToneColorPalette = vue.reactive({
    primaryColor: '#333',
    secondaryColor: '#E6E6E6',
    calculated: false
  });

  function setTwoToneColors(_ref) {
    var primaryColor = _ref.primaryColor,
        secondaryColor = _ref.secondaryColor;
    twoToneColorPalette.primaryColor = primaryColor;
    twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
    twoToneColorPalette.calculated = !!secondaryColor;
  }

  function getTwoToneColors() {
    return _objectSpread$2({}, twoToneColorPalette);
  }

  var IconBase = function IconBase(props, context) {
    var _props$context$attrs = _objectSpread$2({}, props, context.attrs),
        icon = _props$context$attrs.icon,
        primaryColor = _props$context$attrs.primaryColor,
        secondaryColor = _props$context$attrs.secondaryColor,
        restProps = _objectWithoutProperties$1(_props$context$attrs, _excluded$1);

    var colors = twoToneColorPalette;

    if (primaryColor) {
      colors = {
        primaryColor: primaryColor,
        secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
      };
    }

    warning(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));

    if (!isIconDefinition(icon)) {
      return null;
    }

    var target = icon;

    if (target && typeof target.icon === 'function') {
      target = _objectSpread$2({}, target, {
        icon: target.icon(colors.primaryColor, colors.secondaryColor)
      });
    }

    return generate(target.icon, "svg-".concat(target.name), _objectSpread$2({}, restProps, {
      'data-icon': target.name,
      width: '1em',
      height: '1em',
      fill: 'currentColor',
      'aria-hidden': 'true'
    })); // },
  };

  IconBase.props = {
    icon: Object,
    primaryColor: String,
    secondaryColor: String,
    focusable: String
  };
  IconBase.inheritAttrs = false;
  IconBase.displayName = 'IconBase';
  IconBase.getTwoToneColors = getTwoToneColors;
  IconBase.setTwoToneColors = setTwoToneColors;

  function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }

  function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit$1(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
  function setTwoToneColor(twoToneColor) {
    var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
        _normalizeTwoToneColo2 = _slicedToArray$1(_normalizeTwoToneColo, 2),
        primaryColor = _normalizeTwoToneColo2[0],
        secondaryColor = _normalizeTwoToneColo2[1];

    return IconBase.setTwoToneColors({
      primaryColor: primaryColor,
      secondaryColor: secondaryColor
    });
  }
  function getTwoToneColor() {
    var colors = IconBase.getTwoToneColors();

    if (!colors.calculated) {
      return colors.primaryColor;
    }

    return [colors.primaryColor, colors.secondaryColor];
  }

  var InsertStyles = vue.defineComponent({
    name: 'InsertStyles',
    setup: function setup() {
      useInsertStyles();
      return function () {
        return null;
      };
    }
  });

  var _excluded = ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"];

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }

  function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

  setTwoToneColor(blue.primary);

  var Icon = function Icon(props, context) {
    var _classObj;

    var _props$context$attrs = _objectSpread$1({}, props, context.attrs),
        cls = _props$context$attrs["class"],
        icon = _props$context$attrs.icon,
        spin = _props$context$attrs.spin,
        rotate = _props$context$attrs.rotate,
        tabindex = _props$context$attrs.tabindex,
        twoToneColor = _props$context$attrs.twoToneColor,
        onClick = _props$context$attrs.onClick,
        restProps = _objectWithoutProperties(_props$context$attrs, _excluded);

    var _useInjectIconContext = useInjectIconContext(),
        prefixCls = _useInjectIconContext.prefixCls,
        rootClassName = _useInjectIconContext.rootClassName;

    var classObj = (_classObj = {}, _defineProperty$1(_classObj, rootClassName.value, !!rootClassName.value), _defineProperty$1(_classObj, prefixCls.value, true), _defineProperty$1(_classObj, "".concat(prefixCls.value, "-").concat(icon.name), Boolean(icon.name)), _defineProperty$1(_classObj, "".concat(prefixCls.value, "-spin"), !!spin || icon.name === 'loading'), _classObj);
    var iconTabIndex = tabindex;

    if (iconTabIndex === undefined && onClick) {
      iconTabIndex = -1;
    }

    var svgStyle = rotate ? {
      msTransform: "rotate(".concat(rotate, "deg)"),
      transform: "rotate(".concat(rotate, "deg)")
    } : undefined;

    var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
        _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2),
        primaryColor = _normalizeTwoToneColo2[0],
        secondaryColor = _normalizeTwoToneColo2[1];

    return vue.createVNode("span", _objectSpread$1({
      "role": "img",
      "aria-label": icon.name
    }, restProps, {
      "onClick": onClick,
      "class": [classObj, cls],
      "tabindex": iconTabIndex
    }), [vue.createVNode(IconBase, {
      "icon": icon,
      "primaryColor": primaryColor,
      "secondaryColor": secondaryColor,
      "style": svgStyle
    }, null), vue.createVNode(InsertStyles, null, null)]);
  };

  Icon.props = {
    spin: Boolean,
    rotate: Number,
    icon: Object,
    twoToneColor: [String, Array]
  };
  Icon.displayName = 'AntdIcon';
  Icon.inheritAttrs = false;
  Icon.getTwoToneColor = getTwoToneColor;
  Icon.setTwoToneColor = setTwoToneColor;

  // This icon file is generated automatically.
  var SearchOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" } }] }, "name": "search", "theme": "outlined" };

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var SearchOutlined = function SearchOutlined(props, context) {
    var p = _objectSpread({}, props, context.attrs);

    return vue.createVNode(Icon, _objectSpread({}, p, {
      "icon": SearchOutlined$1
    }), null);
  };

  SearchOutlined.displayName = 'SearchOutlined';
  SearchOutlined.inheritAttrs = false;

  const COL_GAP = 16;
  /**
   * 验证 children 类型
   * @param {*} children
   */
  const validateChildrenType = (children) => {
      let flag = true;
      for (let child of children) {
          if (child.type !== SearchFormItem$1 && child.children !== 'v-if') {
              if (Array.isArray(child.children)) {
                  flag = validateChildrenType(child.children);
              }
              else {
                  flag = false;
                  console.warn('children should be SearchFormItem');
              }
          }
          if (!flag) {
              break;
          }
      }
      return flag;
  };
  const SearchFormContext = Symbol();
  const SearchForm = vue.defineComponent({
      name: 'SearchForm',
      inheritAttrs: false,
      props: {
          // 垂直方向间距 16 24, 默认间距16；表单有验证提示推荐>=24
          gutter: {
              type: Number,
              default: 16
          },
          // 每一项的宽度
          width: {
              type: Number,
              default: 300
          },
          // label文本宽度
          labelWidth: {
              type: Number,
              default: 100
          },
          // 用于获取 form ref
          formRef: {
              type: Function
          },
          loading: {
              type: Boolean,
              default: false
          },
          showBtns: {
              type: Boolean,
              default: () => true
          }
      },
      emits: ['submit', 'reset'],
      setup(props, { attrs, slots, emit, expose }) {
          const propsRefs = vue.toRefs(props);
          const formRef = vue.ref();
          const containerRef = vue.ref();
          vue.provide(SearchFormContext, {
              width: propsRefs.width,
              labelWidth: propsRefs.labelWidth,
              gutter: propsRefs.gutter
          });
          // 暴露实例
          expose({
              getFormInstance: () => formRef.value
          });
          vue.watch(formRef, val => props.formRef && props.formRef(val));
          return () => {
              const children = (slots.default ? slots.default() : []);
              validateChildrenType(children);
              const renderSlots = slots.btns
                  ? slots.btns
                  : () => [
                      vue.h(antDesignVue.Button, {
                          type: 'primary',
                          loading: props.loading,
                          onClick: async () => {
                              try {
                                  await formRef.value?.validateFields();
                                  emit('submit');
                              }
                              catch (err) {
                                  console.log(err);
                              }
                          }
                      }, {
                          icon: () => vue.h(SearchOutlined),
                          default: () => '查询'
                      }),
                      vue.h(antDesignVue.Button, {
                          onClick: () => {
                              formRef.value?.resetFields();
                              emit('reset');
                          }
                      }, () => '重置')
                  ];
              if (props.showBtns) {
                  const inlineBtns = vue.h(SearchFormItem$1, {
                      flex: 1
                  }, () => vue.h(antDesignVue.Space, {
                      style: {
                          width: '100%',
                          align: 'center'
                      }
                  }, () => [renderSlots(), slots.extra ? slots.extra() : null]));
                  children.push(inlineBtns);
              }
              return vue.h('div', {
                  ref: containerRef,
                  class: 'search-form-container'
              }, vue.h(antDesignVue.Form, {
                  ...attrs,
                  ref: formRef,
                  layout: 'horizontal'
              }, () => vue.h(antDesignVue.Row, {
                  gutter: [COL_GAP, 0],
                  wrap: true
              }, () => children)));
          };
      }
  });
  /**
   * 搜索表单项
   */
  const SearchFormItem$1 = vue.defineComponent({
      name: 'SearchFormItem',
      props: {
          // 所占列数
          span: {
              type: Number,
              default: 1
          }
      },
      setup(props, { attrs, slots }) {
          const { width, labelWidth, gutter } = vue.inject(SearchFormContext);
          return () => {
              const { flex, style = {}, ...otherAttrs } = attrs;
              const itemWidth = (width.value + COL_GAP) * (props.span || 1);
              return vue.h(antDesignVue.Col, {
                  flex: flex ? flex : `0 0 ${itemWidth}px`,
                  style: {
                      overflow: 'hidden',
                      ...style
                  }
              }, () => vue.h(antDesignVue.FormItem, {
                  ...otherAttrs,
                  class: ['search-form-item', gutter.value < 24 ? 'no-message' : ''],
                  labelCol: {
                      style: {
                          width: `${labelWidth.value}px`
                      }
                  },
                  wrapperCol: {
                      flex: `calc(100% - ${labelWidth.value}px)`
                  }
              }, slots));
          };
      }
  });
  SearchForm.Item = SearchFormItem$1;
  const __default__ = SearchForm;
  const __injectCSSVars__ = () => {
      vue.useCssVars(_ctx => ({
          "30461d6a-gutter\+\'px\'": (_ctx.gutter + 'px')
      }));
  };
  const __setup__ = __default__.setup;
  __default__.setup = __setup__
      ? (props, ctx) => { __injectCSSVars__(); return __setup__(props, ctx); }
      : __injectCSSVars__;

  __default__.__scopeId = "data-v-30461d6a";
  __default__.__file = "components/SearchForm/index.vue";

  var SearchFormWithInstall = withInstall(__default__);
  var SearchFormItem = withInstall(__default__.Item);

  var components = [ModalForm, SearchFormWithInstall, SearchFormItem];
  var Plugin = createPlugin(components);

  exports.ModalForm = ModalForm;
  exports.Plugin = Plugin;
  exports.SearchForm = SearchFormWithInstall;
  exports.SearchFormItem = SearchFormItem;

}));
