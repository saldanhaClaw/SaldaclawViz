"use strict";
var __StripeExtExports = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/@stripe/ui-extension-sdk/version.js
  var require_version = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SDK_VERSION = void 0;
      exports.SDK_VERSION = "9.1.0";
    }
  });

  // node_modules/@stripe/ui-extension-sdk/ui/index.js
  var require_ui = __commonJS({
    "node_modules/@stripe/ui-extension-sdk/ui/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TableHeaderCell = exports.TableHead = exports.TableFooter = exports.TableCell = exports.TableBody = exports.Tab = exports.TabPanels = exports.TabPanel = exports.TabList = exports.Switch = exports.StripeFileUploader = exports.Spinner = exports.Sparkline = exports.SignInView = exports.SettingsView = exports.Select = exports.Radio = exports.PropertyList = exports.PropertyListItem = exports.PlatformConfigurationView = exports.OnboardingView = exports.Menu = exports.MenuItem = exports.MenuGroup = exports.List = exports.ListItem = exports.Link = exports.LineChart = exports.Inline = exports.Img = exports.Icon = exports.FormFieldGroup = exports.FocusView = exports.Divider = exports.DetailPageTable = exports.DetailPagePropertyList = exports.DetailPageModule = exports.DateField = exports.ContextView = exports.Chip = exports.ChipList = exports.Checkbox = exports.Button = exports.ButtonGroup = exports.Box = exports.BarChart = exports.Banner = exports.Badge = exports.Accordion = exports.AccordionItem = void 0;
      exports.Tooltip = exports.TextField = exports.TextArea = exports.TaskList = exports.TaskListItem = exports.Tabs = exports.TableRow = exports.Table = void 0;
      var jsx_runtime_1 = __require("react/jsx-runtime");
      var react_1 = __require("@remote-ui/react");
      var version_1 = require_version();
      var withSdkProps = (Component) => {
        const wrappedComponentName = Component.displayName || Component.toString();
        const WithSdkProps = (props) => (0, jsx_runtime_1.jsx)(Component, __spreadProps(__spreadValues({}, props), { wrappedComponentName, sdkVersion: version_1.SDK_VERSION, schemaVersion: "v9" }));
        WithSdkProps.wrappedComponentName = wrappedComponentName;
        return WithSdkProps;
      };
      var defineComponent = (name, fragmentProps, wrapWithSdkProps) => {
        const remoteComponent = (0, react_1.createRemoteReactComponent)(name, {
          fragmentProps
        });
        if (!wrapWithSdkProps) {
          return remoteComponent;
        }
        return withSdkProps(remoteComponent);
      };
      exports.AccordionItem = defineComponent("AccordionItem", ["title", "actions", "media", "subtitle"], true);
      exports.Accordion = defineComponent("Accordion", [], true);
      exports.Badge = defineComponent("Badge", [], true);
      exports.Banner = defineComponent("Banner", ["actions", "description", "title"], true);
      exports.BarChart = defineComponent("BarChart", [], true);
      exports.Box = defineComponent("Box", [], true);
      exports.ButtonGroup = defineComponent("ButtonGroup", ["menuTrigger"], true);
      exports.Button = defineComponent("Button", [], true);
      exports.Checkbox = defineComponent("Checkbox", ["label"], true);
      exports.ChipList = defineComponent("ChipList", [], true);
      exports.Chip = defineComponent("Chip", [], true);
      exports.ContextView = defineComponent("ContextView", ["actions", "banner", "footerContent", "primaryAction", "secondaryAction"], true);
      exports.DateField = defineComponent("DateField", ["label"], true);
      exports.DetailPageModule = defineComponent("DetailPageModule", [], true);
      exports.DetailPagePropertyList = defineComponent("DetailPagePropertyList", [], true);
      exports.DetailPageTable = defineComponent("DetailPageTable", [], true);
      exports.Divider = defineComponent("Divider", [], true);
      exports.FocusView = defineComponent("FocusView", ["footerContent", "primaryAction", "secondaryAction"], true);
      exports.FormFieldGroup = defineComponent("FormFieldGroup", [], true);
      exports.Icon = defineComponent("Icon", [], true);
      exports.Img = defineComponent("Img", [], true);
      exports.Inline = defineComponent("Inline", [], true);
      exports.LineChart = defineComponent("LineChart", [], true);
      exports.Link = defineComponent("Link", [], true);
      exports.ListItem = defineComponent("ListItem", ["icon", "image", "secondaryTitle", "title", "value"], true);
      exports.List = defineComponent("List", [], true);
      exports.MenuGroup = defineComponent("MenuGroup", ["title"], true);
      exports.MenuItem = defineComponent("MenuItem", [], true);
      exports.Menu = defineComponent("Menu", ["trigger"], true);
      exports.OnboardingView = defineComponent("OnboardingView", ["error"], true);
      exports.PlatformConfigurationView = defineComponent("PlatformConfigurationView", [], true);
      exports.PropertyListItem = defineComponent("PropertyListItem", ["label", "value"], true);
      exports.PropertyList = defineComponent("PropertyList", [], true);
      exports.Radio = defineComponent("Radio", ["label"], true);
      exports.Select = defineComponent("Select", ["label"], true);
      exports.SettingsView = defineComponent("SettingsView", [], true);
      exports.SignInView = defineComponent("SignInView", ["descriptionActionContents", "footerContent"], true);
      exports.Sparkline = defineComponent("Sparkline", [], true);
      exports.Spinner = defineComponent("Spinner", [], true);
      exports.StripeFileUploader = defineComponent("StripeFileUploader", [], true);
      exports.Switch = defineComponent("Switch", ["label"], true);
      exports.TabList = defineComponent("TabList", [], true);
      exports.TabPanel = defineComponent("TabPanel", [], true);
      exports.TabPanels = defineComponent("TabPanels", [], true);
      exports.Tab = defineComponent("Tab", [], true);
      exports.TableBody = defineComponent("TableBody", [], true);
      exports.TableCell = defineComponent("TableCell", [], true);
      exports.TableFooter = defineComponent("TableFooter", [], true);
      exports.TableHead = defineComponent("TableHead", [], true);
      exports.TableHeaderCell = defineComponent("TableHeaderCell", [], true);
      exports.Table = defineComponent("Table", [], true);
      exports.TableRow = defineComponent("TableRow", [], true);
      exports.Tabs = defineComponent("Tabs", [], true);
      exports.TaskListItem = defineComponent("TaskListItem", [], true);
      exports.TaskList = defineComponent("TaskList", [], true);
      exports.TextArea = defineComponent("TextArea", ["label"], true);
      exports.TextField = defineComponent("TextField", ["label"], true);
      exports.Tooltip = defineComponent("Tooltip", ["trigger"], true);
    }
  });

  // .build/manifest.js
  var manifest_exports = {};
  __export(manifest_exports, {
    App: () => App_default,
    BUILD_TIME: () => BUILD_TIME,
    default: () => manifest_default
  });

  // src/views/App.tsx
  var import_ui = __toESM(require_ui());
  var import_jsx_runtime = __require("react/jsx-runtime");
  var App = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.ContextView, {
      title: "SaldaCloud Manager",
      brandColor: "#635bff",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Box, {
        css: {
          padding: "large",
          display: "grid",
          gapY: "medium",
          backgroundColor: "surface",
          borderRadius: "medium"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
            css: { alignY: "center", gapX: "small" },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Icon, {
                name: "rocket",
                size: "medium",
                css: { fill: "success" }
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                font: "heading",
                children: "F\xE1brica em Opera\xE7\xE3o"
              })
            ]
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
            font: "body",
            css: { color: "secondary" },
            children: "Neste momento, 7 agentes **MiMo-v2-Flash** est\xE3o processando suas automa\xE7\xF5es de vendas e gera\xE7\xE3o de e-books em tempo real."
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
            paddingY: "small",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Inline, {
              css: { gapX: "xsmall", alignY: "center" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Icon, {
                  name: "checkCircle",
                  size: "xsmall",
                  css: { fill: "success" }
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
                  font: "caption",
                  children: "Conectado ao Vercel Cloud"
                })
              ]
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
            paddingY: "medium",
            borderTopWidth: 1,
            borderTopStyle: "solid",
            borderColor: "neutral",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Link, {
              href: "https://saldaclaw-viz.vercel.app/api",
              target: "_blank",
              external: true,
              children: "Visualizar Monitor Completo (Vercel)"
            })
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Box, {
            font: "caption",
            css: { color: "disabled", textAlign: "center" },
            children: "v1.1.11 \u2022 SaldaCloud Enterprise"
          })
        ]
      })
    });
  };
  var App_default = App;

  // .build/manifest.js
  __reExport(manifest_exports, __toESM(require_version()));
  var BUILD_TIME = "2026-03-19 10:59:18.9588951 -0300 -03 m=+5.754409601";
  var manifest_default = {
    "$schema": "https://stripe.com/stripe-app.schema.json",
    "distribution_type": "PRIVATE",
    "id": "com.saldacloud.manager",
    "name": "SaldaCloud Manager",
    "ui_extension": {
      "content_security_policy": {
        "connect-src": [
          "https://saldaclaw-viz.vercel.app/api"
        ],
        "purpose": ""
      },
      "views": [
        {
          "component": "App",
          "viewport": "stripe.dashboard.drawer.default"
        }
      ]
    },
    "version": "1.1.10"
  };
  return __toCommonJS(manifest_exports);
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9Ac3RyaXBlL3VpLWV4dGVuc2lvbi1zZGsvdWkvaW5kZXguanMiLCAibWFuaWZlc3QuanMiLCAiLi4vc3JjL3ZpZXdzL0FwcC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TREtfVkVSU0lPTiA9IHZvaWQgMDtcbmV4cG9ydHMuU0RLX1ZFUlNJT04gPSAnOS4xLjAnO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UYWJsZUhlYWRlckNlbGwgPSBleHBvcnRzLlRhYmxlSGVhZCA9IGV4cG9ydHMuVGFibGVGb290ZXIgPSBleHBvcnRzLlRhYmxlQ2VsbCA9IGV4cG9ydHMuVGFibGVCb2R5ID0gZXhwb3J0cy5UYWIgPSBleHBvcnRzLlRhYlBhbmVscyA9IGV4cG9ydHMuVGFiUGFuZWwgPSBleHBvcnRzLlRhYkxpc3QgPSBleHBvcnRzLlN3aXRjaCA9IGV4cG9ydHMuU3RyaXBlRmlsZVVwbG9hZGVyID0gZXhwb3J0cy5TcGlubmVyID0gZXhwb3J0cy5TcGFya2xpbmUgPSBleHBvcnRzLlNpZ25JblZpZXcgPSBleHBvcnRzLlNldHRpbmdzVmlldyA9IGV4cG9ydHMuU2VsZWN0ID0gZXhwb3J0cy5SYWRpbyA9IGV4cG9ydHMuUHJvcGVydHlMaXN0ID0gZXhwb3J0cy5Qcm9wZXJ0eUxpc3RJdGVtID0gZXhwb3J0cy5QbGF0Zm9ybUNvbmZpZ3VyYXRpb25WaWV3ID0gZXhwb3J0cy5PbmJvYXJkaW5nVmlldyA9IGV4cG9ydHMuTWVudSA9IGV4cG9ydHMuTWVudUl0ZW0gPSBleHBvcnRzLk1lbnVHcm91cCA9IGV4cG9ydHMuTGlzdCA9IGV4cG9ydHMuTGlzdEl0ZW0gPSBleHBvcnRzLkxpbmsgPSBleHBvcnRzLkxpbmVDaGFydCA9IGV4cG9ydHMuSW5saW5lID0gZXhwb3J0cy5JbWcgPSBleHBvcnRzLkljb24gPSBleHBvcnRzLkZvcm1GaWVsZEdyb3VwID0gZXhwb3J0cy5Gb2N1c1ZpZXcgPSBleHBvcnRzLkRpdmlkZXIgPSBleHBvcnRzLkRldGFpbFBhZ2VUYWJsZSA9IGV4cG9ydHMuRGV0YWlsUGFnZVByb3BlcnR5TGlzdCA9IGV4cG9ydHMuRGV0YWlsUGFnZU1vZHVsZSA9IGV4cG9ydHMuRGF0ZUZpZWxkID0gZXhwb3J0cy5Db250ZXh0VmlldyA9IGV4cG9ydHMuQ2hpcCA9IGV4cG9ydHMuQ2hpcExpc3QgPSBleHBvcnRzLkNoZWNrYm94ID0gZXhwb3J0cy5CdXR0b24gPSBleHBvcnRzLkJ1dHRvbkdyb3VwID0gZXhwb3J0cy5Cb3ggPSBleHBvcnRzLkJhckNoYXJ0ID0gZXhwb3J0cy5CYW5uZXIgPSBleHBvcnRzLkJhZGdlID0gZXhwb3J0cy5BY2NvcmRpb24gPSBleHBvcnRzLkFjY29yZGlvbkl0ZW0gPSB2b2lkIDA7XG5leHBvcnRzLlRvb2x0aXAgPSBleHBvcnRzLlRleHRGaWVsZCA9IGV4cG9ydHMuVGV4dEFyZWEgPSBleHBvcnRzLlRhc2tMaXN0ID0gZXhwb3J0cy5UYXNrTGlzdEl0ZW0gPSBleHBvcnRzLlRhYnMgPSBleHBvcnRzLlRhYmxlUm93ID0gZXhwb3J0cy5UYWJsZSA9IHZvaWQgMDtcbmNvbnN0IGpzeF9ydW50aW1lXzEgPSByZXF1aXJlKFwicmVhY3QvanN4LXJ1bnRpbWVcIik7XG5jb25zdCByZWFjdF8xID0gcmVxdWlyZShcIkByZW1vdGUtdWkvcmVhY3RcIik7XG5jb25zdCB2ZXJzaW9uXzEgPSByZXF1aXJlKFwiLi4vdmVyc2lvblwiKTtcbmNvbnN0IHdpdGhTZGtQcm9wcyA9IChDb21wb25lbnQpID0+IHtcbiAgICBjb25zdCB3cmFwcGVkQ29tcG9uZW50TmFtZSA9IENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQudG9TdHJpbmcoKTtcbiAgICBjb25zdCBXaXRoU2RrUHJvcHMgPSAocHJvcHMpID0+ICgoMCwganN4X3J1bnRpbWVfMS5qc3gpKENvbXBvbmVudCwgeyAuLi5wcm9wcywgd3JhcHBlZENvbXBvbmVudE5hbWU6IHdyYXBwZWRDb21wb25lbnROYW1lLCBzZGtWZXJzaW9uOiB2ZXJzaW9uXzEuU0RLX1ZFUlNJT04sIHNjaGVtYVZlcnNpb246IFwidjlcIiB9KSk7XG4gICAgV2l0aFNka1Byb3BzLndyYXBwZWRDb21wb25lbnROYW1lID0gd3JhcHBlZENvbXBvbmVudE5hbWU7XG4gICAgcmV0dXJuIFdpdGhTZGtQcm9wcztcbn07XG5jb25zdCBkZWZpbmVDb21wb25lbnQgPSAobmFtZSwgZnJhZ21lbnRQcm9wcywgd3JhcFdpdGhTZGtQcm9wcykgPT4ge1xuICAgIGNvbnN0IHJlbW90ZUNvbXBvbmVudCA9ICgwLCByZWFjdF8xLmNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KShuYW1lLCB7XG4gICAgICAgIGZyYWdtZW50UHJvcHMsXG4gICAgfSk7XG4gICAgaWYgKCF3cmFwV2l0aFNka1Byb3BzKSB7XG4gICAgICAgIHJldHVybiByZW1vdGVDb21wb25lbnQ7XG4gICAgfVxuICAgIHJldHVybiB3aXRoU2RrUHJvcHMocmVtb3RlQ29tcG9uZW50KTtcbn07XG5leHBvcnRzLkFjY29yZGlvbkl0ZW0gPSBkZWZpbmVDb21wb25lbnQoJ0FjY29yZGlvbkl0ZW0nLCBbJ3RpdGxlJywgJ2FjdGlvbnMnLCAnbWVkaWEnLCAnc3VidGl0bGUnXSwgdHJ1ZSk7XG5leHBvcnRzLkFjY29yZGlvbiA9IGRlZmluZUNvbXBvbmVudCgnQWNjb3JkaW9uJywgW10sIHRydWUpO1xuZXhwb3J0cy5CYWRnZSA9IGRlZmluZUNvbXBvbmVudCgnQmFkZ2UnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkJhbm5lciA9IGRlZmluZUNvbXBvbmVudCgnQmFubmVyJywgWydhY3Rpb25zJywgJ2Rlc2NyaXB0aW9uJywgJ3RpdGxlJ10sIHRydWUpO1xuZXhwb3J0cy5CYXJDaGFydCA9IGRlZmluZUNvbXBvbmVudCgnQmFyQ2hhcnQnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkJveCA9IGRlZmluZUNvbXBvbmVudCgnQm94JywgW10sIHRydWUpO1xuZXhwb3J0cy5CdXR0b25Hcm91cCA9IGRlZmluZUNvbXBvbmVudCgnQnV0dG9uR3JvdXAnLCBbJ21lbnVUcmlnZ2VyJ10sIHRydWUpO1xuZXhwb3J0cy5CdXR0b24gPSBkZWZpbmVDb21wb25lbnQoJ0J1dHRvbicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuQ2hlY2tib3ggPSBkZWZpbmVDb21wb25lbnQoJ0NoZWNrYm94JywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuQ2hpcExpc3QgPSBkZWZpbmVDb21wb25lbnQoJ0NoaXBMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5DaGlwID0gZGVmaW5lQ29tcG9uZW50KCdDaGlwJywgW10sIHRydWUpO1xuZXhwb3J0cy5Db250ZXh0VmlldyA9IGRlZmluZUNvbXBvbmVudCgnQ29udGV4dFZpZXcnLCBbJ2FjdGlvbnMnLCAnYmFubmVyJywgJ2Zvb3RlckNvbnRlbnQnLCAncHJpbWFyeUFjdGlvbicsICdzZWNvbmRhcnlBY3Rpb24nXSwgdHJ1ZSk7XG5leHBvcnRzLkRhdGVGaWVsZCA9IGRlZmluZUNvbXBvbmVudCgnRGF0ZUZpZWxkJywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuRGV0YWlsUGFnZU1vZHVsZSA9IGRlZmluZUNvbXBvbmVudCgnRGV0YWlsUGFnZU1vZHVsZScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuRGV0YWlsUGFnZVByb3BlcnR5TGlzdCA9IGRlZmluZUNvbXBvbmVudCgnRGV0YWlsUGFnZVByb3BlcnR5TGlzdCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuRGV0YWlsUGFnZVRhYmxlID0gZGVmaW5lQ29tcG9uZW50KCdEZXRhaWxQYWdlVGFibGUnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkRpdmlkZXIgPSBkZWZpbmVDb21wb25lbnQoJ0RpdmlkZXInLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkZvY3VzVmlldyA9IGRlZmluZUNvbXBvbmVudCgnRm9jdXNWaWV3JywgWydmb290ZXJDb250ZW50JywgJ3ByaW1hcnlBY3Rpb24nLCAnc2Vjb25kYXJ5QWN0aW9uJ10sIHRydWUpO1xuZXhwb3J0cy5Gb3JtRmllbGRHcm91cCA9IGRlZmluZUNvbXBvbmVudCgnRm9ybUZpZWxkR3JvdXAnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkljb24gPSBkZWZpbmVDb21wb25lbnQoJ0ljb24nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkltZyA9IGRlZmluZUNvbXBvbmVudCgnSW1nJywgW10sIHRydWUpO1xuZXhwb3J0cy5JbmxpbmUgPSBkZWZpbmVDb21wb25lbnQoJ0lubGluZScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuTGluZUNoYXJ0ID0gZGVmaW5lQ29tcG9uZW50KCdMaW5lQ2hhcnQnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkxpbmsgPSBkZWZpbmVDb21wb25lbnQoJ0xpbmsnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLkxpc3RJdGVtID0gZGVmaW5lQ29tcG9uZW50KCdMaXN0SXRlbScsIFsnaWNvbicsICdpbWFnZScsICdzZWNvbmRhcnlUaXRsZScsICd0aXRsZScsICd2YWx1ZSddLCB0cnVlKTtcbmV4cG9ydHMuTGlzdCA9IGRlZmluZUNvbXBvbmVudCgnTGlzdCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuTWVudUdyb3VwID0gZGVmaW5lQ29tcG9uZW50KCdNZW51R3JvdXAnLCBbJ3RpdGxlJ10sIHRydWUpO1xuZXhwb3J0cy5NZW51SXRlbSA9IGRlZmluZUNvbXBvbmVudCgnTWVudUl0ZW0nLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLk1lbnUgPSBkZWZpbmVDb21wb25lbnQoJ01lbnUnLCBbJ3RyaWdnZXInXSwgdHJ1ZSk7XG5leHBvcnRzLk9uYm9hcmRpbmdWaWV3ID0gZGVmaW5lQ29tcG9uZW50KCdPbmJvYXJkaW5nVmlldycsIFsnZXJyb3InXSwgdHJ1ZSk7XG5leHBvcnRzLlBsYXRmb3JtQ29uZmlndXJhdGlvblZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ1BsYXRmb3JtQ29uZmlndXJhdGlvblZpZXcnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlByb3BlcnR5TGlzdEl0ZW0gPSBkZWZpbmVDb21wb25lbnQoJ1Byb3BlcnR5TGlzdEl0ZW0nLCBbJ2xhYmVsJywgJ3ZhbHVlJ10sIHRydWUpO1xuZXhwb3J0cy5Qcm9wZXJ0eUxpc3QgPSBkZWZpbmVDb21wb25lbnQoJ1Byb3BlcnR5TGlzdCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuUmFkaW8gPSBkZWZpbmVDb21wb25lbnQoJ1JhZGlvJywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuU2VsZWN0ID0gZGVmaW5lQ29tcG9uZW50KCdTZWxlY3QnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5TZXR0aW5nc1ZpZXcgPSBkZWZpbmVDb21wb25lbnQoJ1NldHRpbmdzVmlldycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuU2lnbkluVmlldyA9IGRlZmluZUNvbXBvbmVudCgnU2lnbkluVmlldycsIFsnZGVzY3JpcHRpb25BY3Rpb25Db250ZW50cycsICdmb290ZXJDb250ZW50J10sIHRydWUpO1xuZXhwb3J0cy5TcGFya2xpbmUgPSBkZWZpbmVDb21wb25lbnQoJ1NwYXJrbGluZScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuU3Bpbm5lciA9IGRlZmluZUNvbXBvbmVudCgnU3Bpbm5lcicsIFtdLCB0cnVlKTtcbmV4cG9ydHMuU3RyaXBlRmlsZVVwbG9hZGVyID0gZGVmaW5lQ29tcG9uZW50KCdTdHJpcGVGaWxlVXBsb2FkZXInLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlN3aXRjaCA9IGRlZmluZUNvbXBvbmVudCgnU3dpdGNoJywgWydsYWJlbCddLCB0cnVlKTtcbmV4cG9ydHMuVGFiTGlzdCA9IGRlZmluZUNvbXBvbmVudCgnVGFiTGlzdCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFiUGFuZWwgPSBkZWZpbmVDb21wb25lbnQoJ1RhYlBhbmVsJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJQYW5lbHMgPSBkZWZpbmVDb21wb25lbnQoJ1RhYlBhbmVscycsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFiID0gZGVmaW5lQ29tcG9uZW50KCdUYWInLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlQm9keSA9IGRlZmluZUNvbXBvbmVudCgnVGFibGVCb2R5JywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZUNlbGwgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlQ2VsbCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVGb290ZXIgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlRm9vdGVyJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJsZUhlYWQgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlSGVhZCcsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVIZWFkZXJDZWxsID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZUhlYWRlckNlbGwnLCBbXSwgdHJ1ZSk7XG5leHBvcnRzLlRhYmxlID0gZGVmaW5lQ29tcG9uZW50KCdUYWJsZScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFibGVSb3cgPSBkZWZpbmVDb21wb25lbnQoJ1RhYmxlUm93JywgW10sIHRydWUpO1xuZXhwb3J0cy5UYWJzID0gZGVmaW5lQ29tcG9uZW50KCdUYWJzJywgW10sIHRydWUpO1xuZXhwb3J0cy5UYXNrTGlzdEl0ZW0gPSBkZWZpbmVDb21wb25lbnQoJ1Rhc2tMaXN0SXRlbScsIFtdLCB0cnVlKTtcbmV4cG9ydHMuVGFza0xpc3QgPSBkZWZpbmVDb21wb25lbnQoJ1Rhc2tMaXN0JywgW10sIHRydWUpO1xuZXhwb3J0cy5UZXh0QXJlYSA9IGRlZmluZUNvbXBvbmVudCgnVGV4dEFyZWEnLCBbJ2xhYmVsJ10sIHRydWUpO1xuZXhwb3J0cy5UZXh0RmllbGQgPSBkZWZpbmVDb21wb25lbnQoJ1RleHRGaWVsZCcsIFsnbGFiZWwnXSwgdHJ1ZSk7XG5leHBvcnRzLlRvb2x0aXAgPSBkZWZpbmVDb21wb25lbnQoJ1Rvb2x0aXAnLCBbJ3RyaWdnZXInXSwgdHJ1ZSk7XG4iLCAiLy8gQVVUT0dFTkVSQVRFRCAtIERPIE5PVCBNT0RJRllcbmltcG9ydCBBcHAgZnJvbSAnLi4vc3JjL3ZpZXdzL0FwcCc7XG5cbmV4cG9ydCAqIGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay92ZXJzaW9uJztcbmV4cG9ydCBjb25zdCBCVUlMRF9USU1FID0gJzIwMjYtMDMtMTkgMTA6NTk6MTguOTU4ODk1MSAtMDMwMCAtMDMgbT0rNS43NTQ0MDk2MDEnO1xuXG5leHBvcnQgeyBcbiAgQXBwXG4gfTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBcIiRzY2hlbWFcIjogXCJodHRwczovL3N0cmlwZS5jb20vc3RyaXBlLWFwcC5zY2hlbWEuanNvblwiLFxuICBcImRpc3RyaWJ1dGlvbl90eXBlXCI6IFwiUFJJVkFURVwiLFxuICBcImlkXCI6IFwiY29tLnNhbGRhY2xvdWQubWFuYWdlclwiLFxuICBcIm5hbWVcIjogXCJTYWxkYUNsb3VkIE1hbmFnZXJcIixcbiAgXCJ1aV9leHRlbnNpb25cIjoge1xuICAgIFwiY29udGVudF9zZWN1cml0eV9wb2xpY3lcIjoge1xuICAgICAgXCJjb25uZWN0LXNyY1wiOiBbXG4gICAgICAgIFwiaHR0cHM6Ly9zYWxkYWNsYXctdml6LnZlcmNlbC5hcHAvYXBpXCJcbiAgICAgIF0sXG4gICAgICBcInB1cnBvc2VcIjogXCJcIlxuICAgIH0sXG4gICAgXCJ2aWV3c1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiY29tcG9uZW50XCI6IFwiQXBwXCIsXG4gICAgICAgIFwidmlld3BvcnRcIjogXCJzdHJpcGUuZGFzaGJvYXJkLmRyYXdlci5kZWZhdWx0XCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwidmVyc2lvblwiOiBcIjEuMS4xMFwiXG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBDb250ZXh0VmlldyxcbiAgQm94LFxuICBMaW5rLFxuICBJY29uLFxuICBJbmxpbmUsXG59IGZyb20gJ0BzdHJpcGUvdWktZXh0ZW5zaW9uLXNkay91aSc7XG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Q29udGV4dFZpZXcgXG4gICAgICB0aXRsZT1cIlNhbGRhQ2xvdWQgTWFuYWdlclwiXG4gICAgICBicmFuZENvbG9yPVwiIzYzNWJmZlwiIFxuICAgID5cbiAgICAgICA8Qm94IGNzcz17eyBcbiAgICAgICAgIHBhZGRpbmc6ICdsYXJnZScsIFxuICAgICAgICAgZGlzcGxheTogJ2dyaWQnLCBcbiAgICAgICAgIGdhcFk6ICdtZWRpdW0nLFxuICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnc3VyZmFjZScsXG4gICAgICAgICBib3JkZXJSYWRpdXM6ICdtZWRpdW0nXG4gICAgICAgfX0+XG4gICAgICAgICAgPElubGluZSBjc3M9e3sgYWxpZ25ZOiAnY2VudGVyJywgZ2FwWDogJ3NtYWxsJyB9fT5cbiAgICAgICAgICAgICA8SWNvbiBuYW1lPVwicm9ja2V0XCIgc2l6ZT1cIm1lZGl1bVwiIGNzcz17eyBmaWxsOiAnc3VjY2VzcycgfX0gLz5cbiAgICAgICAgICAgICA8Qm94IGZvbnQ9XCJoZWFkaW5nXCI+Rlx1MDBFMWJyaWNhIGVtIE9wZXJhXHUwMEU3XHUwMEUzbzwvQm94PlxuICAgICAgICAgIDwvSW5saW5lPlxuICAgICAgICAgIFxuICAgICAgICAgIDxCb3ggZm9udD1cImJvZHlcIiBjc3M9e3sgY29sb3I6ICdzZWNvbmRhcnknIH19PlxuICAgICAgICAgICAgTmVzdGUgbW9tZW50bywgNyBhZ2VudGVzICoqTWlNby12Mi1GbGFzaCoqIGVzdFx1MDBFM28gcHJvY2Vzc2FuZG8gc3VhcyBhdXRvbWFcdTAwRTdcdTAwRjVlcyBkZSB2ZW5kYXMgZSBnZXJhXHUwMEU3XHUwMEUzbyBkZSBlLWJvb2tzIGVtIHRlbXBvIHJlYWwuXG4gICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICA8Qm94IHBhZGRpbmdZPVwic21hbGxcIj5cbiAgICAgICAgICAgICA8SW5saW5lIGNzcz17eyBnYXBYOiAneHNtYWxsJywgYWxpZ25ZOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwiY2hlY2tDaXJjbGVcIiBzaXplPVwieHNtYWxsXCIgY3NzPXt7IGZpbGw6ICdzdWNjZXNzJyB9fSAvPlxuICAgICAgICAgICAgICAgIDxCb3ggZm9udD1cImNhcHRpb25cIj5Db25lY3RhZG8gYW8gVmVyY2VsIENsb3VkPC9Cb3g+XG4gICAgICAgICAgICAgPC9JbmxpbmU+XG4gICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICA8Qm94IHBhZGRpbmdZPVwibWVkaXVtXCIgYm9yZGVyVG9wV2lkdGg9ezF9IGJvcmRlclRvcFN0eWxlPVwic29saWRcIiBib3JkZXJDb2xvcj1cIm5ldXRyYWxcIj5cbiAgICAgICAgICAgIDxMaW5rIFxuICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9zYWxkYWNsYXctdml6LnZlcmNlbC5hcHAvYXBpXCIgXG4gICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiIFxuICAgICAgICAgICAgICBleHRlcm5hbFxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgVmlzdWFsaXphciBNb25pdG9yIENvbXBsZXRvIChWZXJjZWwpXG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPC9Cb3g+XG5cbiAgICAgICAgICA8Qm94IGZvbnQ9XCJjYXB0aW9uXCIgY3NzPXt7IGNvbG9yOiAnZGlzYWJsZWQnLCB0ZXh0QWxpZ246ICdjZW50ZXInIH19PlxuICAgICAgICAgICAgIHYxLjEuMTEgXHUyMDIyIFNhbGRhQ2xvdWQgRW50ZXJwcmlzZVxuICAgICAgICAgIDwvQm94PlxuICAgICAgIDwvQm94PlxuICAgIDwvQ29udGV4dFZpZXc+XG4gICk7XG59O1xuXG5leHBvcnQg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
