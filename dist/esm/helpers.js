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

export { createPlugin, withInstall };
