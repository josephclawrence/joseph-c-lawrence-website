/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  __webpack_require__.r(__webpack_exports__);
  var init_namespaceObject = {};
  __webpack_require__.r(init_namespaceObject);
  __webpack_require__.d(init_namespaceObject, "init", function() { return init; });
  __webpack_require__.d(init_namespaceObject, "initiateTiles", function() { return initiateTiles; });
  __webpack_require__.d(init_namespaceObject, "initiateExistingTiles", function() { return initiateExistingTiles; });
  __webpack_require__.d(init_namespaceObject, "sizeTiles", function() { return sizeTiles; });
  __webpack_require__.d(init_namespaceObject, "sizeTilesCallback", function() { return sizeTilesCallback; });
  __webpack_require__.d(init_namespaceObject, "initAllOffCanvasSections", function() { return initAllOffCanvasSections; });
  __webpack_require__.d(init_namespaceObject, "hideErrorMessage", function() { return hideErrorMessage; });
  __webpack_require__.d(init_namespaceObject, "showErrorMessage", function() { return showErrorMessage; });
  __webpack_require__.d(init_namespaceObject, "createKendoWindow", function() { return createKendoWindow; });
  __webpack_require__.d(init_namespaceObject, "sizeAddonButtons", function() { return sizeAddonButtons; });
  __webpack_require__.d(init_namespaceObject, "adjustContainerPadding", function() { return adjustContainerPadding; });
  __webpack_require__.d(init_namespaceObject, "initProgramListTileDragging", function() { return initProgramListTileDragging; });
  __webpack_require__.d(init_namespaceObject, "disposeVisualDesigner", function() { return disposeVisualDesigner; });
  __webpack_require__.d(init_namespaceObject, "onComboboxDataBound", function() { return onComboboxDataBound; });
  __webpack_require__.d(init_namespaceObject, "createDiagram", function() { return createDiagram; });
  __webpack_require__.d(init_namespaceObject, "getOpenWindows", function() { return getOpenWindows; });
  
  // CONCATENATED MODULE: ./finaljs/modules/kendoStructure.js
  var dataWidgetModel = kendo.data.Node.define({
    id: 'Id'
  });
  var DataWidgetSch = {
    schema: {
      data: 'Widgets',
      model: dataWidgetModel
    }
  };
  var columnModel = kendo.data.Node.define({
    id: 'Id',
    children: DataWidgetSch
  });
  var ColumnsSch = {
    schema: {
      data: 'Columns',
      model: columnModel
    }
  };
  var rowModel = kendo.data.Node.define({
    id: 'Id',
    children: ColumnsSch
  });
  var RowsSch = {
    schema: {
      data: 'Rows',
      model: rowModel
    }
  };
  var layoutWidgetModel = kendo.data.Node.define({
    id: 'Id',
    children: RowsSch
  });
  var WidgetsSch = {
    schema: {
      data: 'Widgets',
      model: layoutWidgetModel
    }
  };
  var toolbarSubSubSubWidgetModel = kendo.data.Node.define({
    id: 'Id'
  });
  var ToolbarSubSubSubWidgetsSch = {
    schema: {
      data: 'Widgets',
      model: toolbarSubSubSubWidgetModel
    }
  };
  var toolbarSubSubWidgetModel = kendo.data.Node.define({
    id: 'Id',
    children: ToolbarSubSubSubWidgetsSch
  });
  var ToolbarSubSubWidgetsSch = {
    schema: {
      data: 'Widgets',
      model: toolbarSubSubWidgetModel
    }
  };
  var toolbarSubWidgetModel = kendo.data.Node.define({
    id: 'Id',
    children: ToolbarSubSubWidgetsSch
  });
  var ToolbarSubWidgetsSch = {
    schema: {
      data: 'Widgets',
      model: toolbarSubWidgetModel
    }
  };
  var toolbarWidgetModel = kendo.data.Node.define({
    id: 'Id',
    children: ToolbarSubWidgetsSch
  });
  var parentColumnsModel = kendo.data.Node.define({
    id: 'Id',
    children: WidgetsSch
  });
  var ToolbarWidgetsSch = {
    schema: {
      data: 'Widgets',
      model: toolbarWidgetModel
    }
  };
  var toolbarModel = kendo.data.Node.define({
    id: 'Id',
    children: ToolbarWidgetsSch
  });
  var OffCanvasToolbarColumnsSch = {
    schema: {
      data: 'Columns',
      model: toolbarModel
    }
  };
  var ParentColumnsSch = {
    schema: {
      data: 'Columns',
      model: parentColumnsModel
    }
  };
  // CONCATENATED MODULE: ./finaljs/modules/kendoBinders.js
  // module kendo.data.binders.widget {
  //   export class dataPath extends kendo.data.Binder {
  //     init(widget, bindings, options) {
  //       // call the base constructor
  //       kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
  //       const that = this;
  //       // listen for the change event of the element
  //       $(that.element).on('click', () => {
  //         that.change(); // call the change function
  //       });
  //     }
  //     refresh() {
  //       const that = this;
  //       const value = that.bindings['dataPath'].get();
  //       $(that.element).toggleClass('active', value === $(that.element).data('field-path'));
  //     }
  //     change() {
  //       const value = $(this.element).data('field-path');
  //       this.bindings.dataPath.set(value); // update the View-Model
  //       const elementClone = $(this.element).clone();
  //       elementClone.find('i, span').remove();
  //       if (window.viewModel.selected) {
  //         window.viewModel.selected.FieldName = elementClone.text();
  //         window.viewModel.selected.HasSmartTag = $(this.element).data('smart-tag');
  //         window.viewModel.selected.DataType = $(this.element).data('data-type');
  //         window.viewModel.selected.EntryType = $(this.element).data('entry-type');
  //       }
  //     }
  //   }
  // }
  function initialiseKendoBinders() {
    kendo.data.binders.dataPath = kendo.data.Binder.extend({
      init: function init(element, bindings, options) {
        // call the base constructor
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
        var that = this; // listen for the change event of the element
  
        $(that.element).on('click', function () {
          that.change(); // call the change function
        });
      },
      refresh: function refresh() {
        var that = this;
        var value = that.bindings['dataPath'].get();
        $(that.element).toggleClass('active', value === $(that.element).data('field-path'));
      },
      change: function change() {
        var value = $(this.element).data('field-path');
        this.bindings['dataPath'].set(value); // update the View-Model
  
        var elementClone = $(this.element).clone();
        elementClone.find('i, span').remove();
  
        if (window.viewModel.selected) {
          window.viewModel.selected.FieldName = elementClone.text();
          window.viewModel.selected.HasSmartTag = $(this.element).data('smart-tag');
          window.viewModel.selected.DataType = $(this.element).data('data-type');
          window.viewModel.selected.EntryType = $(this.element).data('entry-type');
        }
      }
    });
    kendo.data.binders.iconName = kendo.data.Binder.extend({
      init: function init(element, bindings, options) {
        // call the base constructor
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
        var that = this; // listen for the change event of the element
  
        $(that.element).on('click', function () {
          that.change(); // call the change function
        });
      },
      refresh: function refresh() {
        var that = this;
        var value = that.bindings['iconName'].get();
        $(that.element).toggleClass('active', value === $(that.element).data('icon-name'));
      },
      change: function change() {
        var value = $(this.element).data('icon-name');
        this.bindings['iconName'].set(value); // update the View-Model
      }
    });
    kendo.data.binders.linkListField = kendo.data.Binder.extend({
      init: function init(element, bindings, options) {
        // call the base constructor
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
        var that = this; // listen for the change event of the element
  
        $(that.element).on('click', function () {
          that.change(); // call the change function
        });
      },
      refresh: function refresh() {
        var that = this;
        var value = that.bindings['linkListField'].get();
        $(that.element).toggleClass('active', value === $(that.element).data('key-action'));
      },
      change: function change() {
        // const value = this.element.value;
        var value = $(this.element).data('key-action');
        this.bindings['linkListField'].set(value); // update the View-Model
      }
    });
    kendo.data.binders.tileBind = kendo.data.Binder.extend({
      init: function init(element, bindings, options) {
        // call the base constructor
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
        var that = this; // listen for the change event of the element
  
        $(that.element).on('click', function () {
          that.change(); // call the change function
        });
      },
      refresh: function refresh() {
        var that = this;
        var value = that.bindings['tileBind'].get();
        $(that.element).toggleClass('active', value === $(that.element).data('tile-name'));
      },
      change: function change() {
        // const value = this.element.value;
        var value = $(this.element).data('tile-name');
        this.bindings['tileBind'].set(value); // update the View-Model
      }
    });
    kendo.data.binders.layoutWidgetType = kendo.data.Binder.extend({
      refresh: function refresh() {
        var value = this.bindings.layoutWidgetType.get();
  
        if (value === $(this.element).data('widget-type')) {
          $(this.element).tab('show');
        }
      }
    });
    kendo.data.binders.toolbarFieldName = kendo.data.Binder.extend({
      init: function init(element, bindings, options) {
        // call the base constructor
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
        var that = this; // listen for the change event of the element
  
        $(that.element).on('click', function () {
          that.change(); // call the change function
        });
      },
      refresh: function refresh() {
        var that = this;
        var value = that.bindings['toolbarFieldName'].get();
        $(that.element).toggleClass('active', value === $(that.element).data('field-name'));
      },
      change: function change() {
        var value = $(this.element).data('field-name');
        this.bindings['toolbarFieldName'].set(value); // update the View-Model
  
        if (window.viewModel.selected) {
          window.viewModel.selected.ToolbarWidgetType = $(this.element).data('toolbar-widget-type');
        }
      }
    });
  }
  // CONCATENATED MODULE: ./finaljs/modules/state.js
  var column1InputId = sysproInterop.generateUUID();
  var column2InputId = sysproInterop.generateUUID(); // export const viewModel = kendo.observable({
  //   // create a dataSource
  //   dataSource: null,
  //   toolbar: null,
  //   OffCanvasLayouts: {},
  //   offCanvasWindows: {},
  //   selected: null, // this field will contain the edited dataItem
  //   selectedOffCanvas: null, // To hold currently edited off canvas widget object
  //   targetLayoutWidget: null, // to hold currently targeted widget's parent layout widget reference
  //   genericObject: {
  //     // A generic object to set 'selected' to when it is not in use, to prevent issues with removing objects otherwise currently assigned to 'selected'
  //     Id: 0,
  //     id: 0,
  //   },
  //   columnLayout: '3col', // this field will contain the overall column layout type
  // });
  
  var state = {
    tilesSearchJSON: [],
    fieldsSearchReady: false,
    toolbarFieldsSearchReady: false,
    column1Id: column1InputId,
    column2Id: column2InputId,
    column1Copy: {
      PrimaryStyle: 0,
      ResponsiveStyle: 3,
      Widgets: [],
      Id: column1InputId,
      Index: 1,
      TypeName: 'Column',
      HasChildren: false,
      index: 1
    },
    column2Copy: {
      PrimaryStyle: 0,
      ResponsiveStyle: 3,
      Widgets: [],
      Id: column2InputId,
      Index: 2,
      TypeName: 'Column',
      HasChildren: false,
      index: 2
    },
    currentLayoutWidgetOption: null,
    layoutWidgetSelectOptions: null,
    dataWindowFieldsList: null,
    dataEditWindowFieldsList: null,
    tilesList: null,
    toolbarActionsList: null,
    toolbarActionsEditList: null,
    currentRowWindow: null,
    draggedLayoutWidgetCopy: null,
    draggedDataWidgetTempCopy: null,
    draggedToolbarWidgetTempCopy: null,
    tempHiddenWidg: null,
    openWindow: null,
    tileWindowsReady: false,
    tileEditWindowReady: false,
    tilesJSONReady: false,
    finishedQuickAddWidgets: false,
    bindableFieldsData: {},
    quickAddIndex: null,
    tileWidgets: {},
    CleanOffCanvasModels: {},
    invisibleTreeViews: {},
    diagrams: {},
    errorNotification: null,
    diagramSelected: [],
    sortableWidgets: [],
    sortableDataWidgets: [],
    sortableLinkListDataWidgets: [],
    quickSortableWidgets: [],
    sortableToolbarWidgets: [],
    diagramActiveItemProgram: null,
    diagramActiveItem: null,
    placeholderCardHTML: '<div class="draggable-row-section row widget layout-widget"><div class="col-xs-12"><div class="panel sys-widget card-widget"><div class="card-bindable panel-body sys-pd-off sys-rd-t"><div class="panel-body text-left sys-wrapper sys-bg-primary sys-fg-white sys-rd-t"><div class="row" ><div class="sys-mg-t-11 col-sm-10 col-xs-10 sys-fg-white"><h3 class="sys-mg-t-5 sys-txt-lg sys-mg-b-5 text-white sys-fg-white pull-left card-name"></h3></div></div></div><div class="panel-body text-left sys-wrapper sys-bg-white sys-fg-inverse"><div class="row"><div class="col-xs-12 sys-pd-t-15 text-left sys-vcenter"><div style="height: 300px; float:left; display: block;"></div></div></div></div></div></div></div></div>',
    layoutWidgetHTML: {
      row_4_block: '<div class="draggable-row-section sortable-item removeable panel sys-widget sys-bd-off sys-box-shadow-off" data-guid=""><div class="panel-body sys-bg-white text-center sys-pd-10"><div class="row sys-tbl" data-row="0"><div data-section="0" class="text-left col-xs-6 sys-bd-light-gray-right sys-pd-15 data-section"><div><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div></div><div data-section="1" class="text-right col-xs-6 sys-pd-15 data-section"><div><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div></div></div><hr class="sys-hr-light-gray sys-mg-off"><div class="row sys-tbl" data-row="1"><div data-section="0" class="text-left col-xs-6 sys-bd-light-gray-right sys-pd-15 data-section"><div><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div></div><div data-section="1" class="text-right col-xs-6 sys-pd-15 data-section"><div><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div></div></div></div></div>',
      row_1_col: '<div class="draggable-row-section sortable-item removeable panel sys-widget sys-bd-off sys-box-shadow-off" data-guid=""><div class="panel-body sys-bg-white text-center sys-pd-10"><div class="row sys-tbl" data-row="0"><div data-section="0" class="text-left col-xs-12 sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div></div></div></div>',
      row_2_col: '<div class="draggable-row-section sortable-item removeable panel sys-widget sys-bd-off sys-box-shadow-off" data-guid=""><div class="panel-body sys-bg-white text-center sys-pd-10"><div class="row sys-tbl" data-row="0"><div data-section="0" class="text-left col-xs-6 sys-bd-light-gray-right sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div><div data-section="1" class="text-right col-xs-6 sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div></div></div></div>',
      row_3_col: '<div class="draggable-row-section sortable-item removeable panel sys-widget sys-bd-off sys-box-shadow-off" data-guid=""><div class="panel-body sys-bg-white text-center sys-pd-10"><div class="row sys-tbl" data-row="0"><div data-section="0" class="text-left col-xs-4 sys-bd-light-gray-right sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div><div data-section="1" class="text-center col-xs-4 sys-bd-light-gray-right sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div><div data-section="2" class="text-right col-xs-4 sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div></div></div></div>',
      row_4_col: '<div class="draggable-row-section sortable-item removeable panel sys-widget sys-bd-off sys-box-shadow-off" data-guid=""><div class="panel-body sys-bg-white text-center sys-pd-10"><div class="row sys-tbl" data-row="0"><div data-section="0" class="text-left col-xs-3 sys-bd-light-gray-right sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div><div data-section="1" class="text-left col-xs-3 sys-bd-light-gray-right sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div><div data-section="2" class="text-center col-xs-3 sys-bd-light-gray-right sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div><div data-section="3" class="text-right col-xs-3 sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div></div></div></div>',
      row_6_block: '<div class="draggable-row-section sortable-item removeable panel sys-widget sys-bd-off sys-box-shadow-off" data-guid=""><div class="panel-body sys-bg-white text-center sys-pd-10"><div class="row sys-tbl" data-row="0"><div data-section="0" class="text-left col-xs-4 sys-bd-light-gray-right sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div><div data-section="1" class="text-left col-xs-4 sys-bd-light-gray-right sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div><div data-section="2" class="text-right col-xs-4 sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div></div><hr class="sys-hr-light-gray sys-mg-off"><div class="row sys-tbl" data-row="1"><div data-section="0" class="text-left col-xs-4 sys-bd-light-gray-right sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div><div data-section="1" class="text-left col-xs-4 sys-bd-light-gray-right sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div><div data-section="2" class="text-right col-xs-4 sys-pd-15 data-section"><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></div></div></div></div>',
      row_list_view: '<div class="draggable-row-section sortable-item removeable panel card-widget sys-widget sys-bd-off sys-box-shadow-off" data-guid=""><div class="panel-body sys-bg-white text-center sys-pd-10"><div class="row sys-tbl" data-row="0"><div data-section="0" class="text-left col-xs-12 sys-pd-15 data-section"><table class="table sys-mg-off-b"><tbody><tr class="sys-fg-primary"><td><a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a></td></tr></tbody></table></div></div></div></div>',
      row_carousel: '<div class="draggable-row-section sortable-item removeable panel card-widget sys-widget sys-carousel sys-box-shadow-off" data-guid=""><div class="panel-body sys-pd-off"><div class="carousel slide" id="a38cbe58-bd7a-43f9-8116-13838dc7d6b5" data-ride="carousel"><div class="carousel-inner"><div class="item  active "><div class="panel-body sys-bg-white text-left"><div class="row " data-row="0"><div class="col-xs-12 data-section" data-section="0"><div class="panel sys-widget sys-box-shadow-off sys-mg-off  add-data-widget"><div class="panel-body text-center sys-fg-primary"><a class="pull-left text-center add-data-section" href="#"><i class="material-icons">note_add</i></a></div></div></div></div></div></div></div></div><hr class="sys-mg-off"><div class="panel-body sys-pd-off"><div class="row"><a class="col-xs-6 pull-left sys-bg-very-light-gray sys-fg-textcolor sys-pd-t-10 sys-pd-b-10 text-center" href="#a38cbe58-bd7a-43f9-8116-13838dc7d6b5" data-slide="prev"><small><i class="fa fa-angle-left"></i> PREVIOUS</small></a><a class="col-xs-6 pull-left sys-bg-very-light-gray sys-fg-textcolor sys-pd-t-10 sys-pd-b-10 text-center" href="#a38cbe58-bd7a-43f9-8116-13838dc7d6b5" data-slide="next"><small>NEXT <i class="fa fa-angle-right"></i></small></a></div></div></div></div></div>',
      row_link_list: '<div class="draggable-row-section sortable-item removeable panel card-widget sys-widget sys-box-shadow-off" data-guid=""><div class="panel-body sys-bg-white sys-pd-off"><div class="list-group"><a class="list-group-item data-section add-data-section text-center" data-row="0" data-section="0" href="#"><i class="material-icons text-primary">note_add</i><i class="pull-right fa fa-angle-right"></i></a></div></div></div>'
    }
  };
  // CONCATENATED MODULE: ./finaljs/modules/treeviews.js
   // Helper function to build treeviews for hierarchical datasource initialisation
  
  function createInvisibleTreeView(treeviewId, dataSource) {
    $("<div id='" + treeviewId + "'></div>").appendTo('#invisibleNodes');
    state.invisibleTreeViews[treeviewId] = $("#" + treeviewId).kendoTreeView({
      dataSource: dataSource,
      loadOnDemand: false
    });
  } // Destroy all treeview Kendo widgets
  
  function destroyTreeViews() {
    for (var prop in state.invisibleTreeViews) {
      if (Object.prototype.hasOwnProperty.call(state.invisibleTreeViews, prop)) {
        destroyTreeView(prop);
      }
    }
  }
  function destroyTreeView(treeviewID) {
    var treeview = $("#" + treeviewID).data('kendoTreeView');
    if (treeview) treeview.destroy();
    delete state.invisibleTreeViews[treeviewID];
    $("#" + treeviewID).remove();
  } // Regenerate all treeviews
  
  function regenerateTreeViews() {
    createInvisibleTreeView('invisibleNode', window.viewModel.dataSource);
    createInvisibleTreeView('invisibleToolbarNode', window.viewModel.toolbar);
  
    for (var prop in window.viewModel.OffCanvasLayouts) {
      if (prop.includes('offcanvas')) {
        createInvisibleTreeView("OC_" + window.viewModel.OffCanvasLayouts[prop].Id, window.viewModel.OffCanvasLayouts[prop].Columns);
        createInvisibleTreeView("OCT_" + window.viewModel.OffCanvasLayouts[prop].Id, window.viewModel.OffCanvasLayouts[prop].MainToolbar.Columns);
      }
    } // TODO: find tab widgets to regenerate treeviews...
  
  
    $("[data-displaystyle='TabControl']").each(function (_idx, tabWidget) {
      if ($(tabWidget).closest('.layout-widget-preview').length === 0) {
        var objectUid = $(tabWidget).attr('data-guid');
        var canvasID = $(tabWidget).parents('.navbar-offcanvas').length ? $(tabWidget).parents('.navbar-offcanvas').attr('id').split('offcanvas-')[1] : $(tabWidget).parents('.k-window').length ? $(tabWidget).parents('.k-window-content').attr('id').split('offcanvas-')[1] : null;
        var currentParentDataSource = canvasID !== null ? window.viewModel.OffCanvasLayouts["offcanvas-" + canvasID].Columns : window.viewModel.dataSource;
        var widget = currentParentDataSource.get(objectUid);
        createInvisibleTreeView("TABS_" + objectUid, widget.Tabs);
      }
    });
  }
  // CONCATENATED MODULE: ./finaljs/modules/helpers.js
  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
  
  var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
  
        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
      }
  
      return t;
    };
  
    return __assign.apply(this, arguments);
  };
  
   // Helper functionn to get number of items in a JSON object
  
  function objLength(object) {
    var length = 0;
  
    for (var key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        length++;
      }
    }
  
    return length;
  } // Helper function to stringify a widget before sending to SysproInterop
  
  function stringifyJSONObject(objectUid, currentDataSource) {
    // Rob: Now always do a get instead of getByUid so we can use our own Id.
    var fullObject = currentDataSource.get(objectUid);
    var JSONObject;
  
    if (fullObject.DisplayStyle === 9) {
      JSONObject = __assign(__assign({}, fullObject.toJSON()), {
        Tabs: fullObject.Tabs.data().toJSON()
      });
    } else {
      JSONObject = fullObject.toJSON();
    }
  
    if (fullObject.Rows) {
      $.each(fullObject.Rows, function (rowKey, rowValue) {
        if (rowValue.Columns) {
          $.each(rowValue.Columns, function (columnKey, columnValue) {
            if (columnValue.Widgets) {
              $.each(columnValue.Widgets, function (widgetKey, widgetValue) {
                // Rob: I replaced uid with Id to be consistent with widgets.
                JSONObject.Rows[rowKey].Columns[columnKey].Widgets[widgetKey].Id = widgetValue.Id;
              });
            }
          });
        }
      });
    }
  
    JSONObject.Id = objectUid;
    return JSONObject;
  }
  function hideErrorMessage() {
    if (state.errorNotification) state.errorNotification.hide();
  } // function getZIndex() {
  //   var modalsZIndexes = [];
  //   if ( kendo.ui.Window.fn._modals && kendo.ui.Window.fn._modals().length ) {
  //       kendo.ui.Window.fn._modals().each(function(idx, modal) {
  //           modalsZIndexes.push(parseInt($(modal).css('z-index')));
  //       });
  //       return Math.max(...modalsZIndexes);
  //   } else {
  //       return 1000000;
  //   }
  // }
  
  function getKendoObject(element) {
    var content = element.children('.k-window-content');
    var widget = kendo.widgetInstance(content);
  
    if (widget) {
      return widget;
    }
  
    return undefined;
  }
  
  function getOpenWindows() {
    var zStack = $('.k-window').filter(function () {
      var dom = $(this);
      var object = getKendoObject(dom);
      var options = object && object.options;
      return options && options.visible && dom.is(':visible');
    }).sort(function (a, b) {
      return +$(a).css('zIndex') - +$(b).css('zIndex');
    });
    return zStack;
  } // Error Notification display function
  
  function showErrorMessage(message, title) {
    if (title === void 0) {
      title = 'Sorry, something has gone wrong. The technical error message is:';
    }
  
    function onShow(e) {
      if (e.sender.getNotifications().length == 1) {
        var element = e.element.parent();
        var eWidth = element.width();
        var eHeight = element.height();
        var wWidth = $(window).width();
        var wHeight = $(window).height();
        var newLeft = Math.floor(wWidth / 2 - eWidth / 2);
        var newTop = Math.floor(wHeight / 2 - eHeight / 2);
        e.element.parent().css({
          top: newTop,
          left: newLeft
        });
        e.element.parent().css('z-index', parseInt(sysproInterop.getModalsHighestZIndex()) + 1);
        e.element.parent().addClass('avantiNotification');
      }
    } // Error Notification setup
  
  
    state.errorNotification = $('#errorNotification').kendoNotification({
      position: {
        pinned: true
      },
      autoHideAfter: 0,
      button: true,
      show: onShow,
      stacking: 'down',
      templates: [{
        type: 'error',
        template: $('#errorTemplate').html()
      }]
    }).data('kendoNotification');
    state.errorNotification.show({
      title: title,
      message: message
    }, 'error');
  } // General local JSON loading function, using vanilla JavaScript - tailored for icons
  
  function loadIconJSON(destination, currentWindow) {
    sysproInterop.getIconsAvailable(function (response) {
      // Parse JSON string into object
      var iconHTML = '';
      $.each(response, function () {
        var iconName = this.Name; // value.name.toLowerCase().replace(/ /g, "_");
  
        var readableName = iconName.replace(/_/g, ' ');
        iconHTML += "<label data-container=\"body\" data-placement=\"top\" data-original-title=\"" + readableName + "\" class=\"btn btn-radio btn-icon icon-option\" data-icon-name=\"" + iconName;
  
        if (destination === 'base') {
          iconHTML += '"><i class="material-icons">';
        } else if (destination === 'editData') {
          iconHTML += '" data-bind="iconName: selected.Icon.Name"><i class="material-icons">';
        } else if (destination === 'editRow') {
          iconHTML += '" data-bind="iconName: selected.Icon"><i class="material-icons">';
        } else if (destination === 'editTile') {
          iconHTML += '" data-bind="iconName: selected.Widgets[0].TileTypeIcon"><i class="material-icons">';
        }
  
        iconHTML += iconName + "</i></label>";
      });
      $(currentWindow + " .icon-field-container > .radio-btn-group").append(iconHTML);
      kendo.bind($(currentWindow + " .icon-field-container"), window.viewModel);
  
      if (currentWindow === '#toolbarEditWindow' && window.viewModel.selected && window.viewModel.selected.Icon.Name) {
        var activeIcon_1 = $("#toolbarEditWindowIconList label[data-icon-name='" + window.viewModel.selected.Icon.Name + "']");
        activeIcon_1.addClass('active');
        setTimeout(function () {
          $('.toolbar-icon-option .icon-field-container').scrollTop($('.toolbar-icon-option .icon-field-container').scrollTop() + activeIcon_1.position().top - 193);
        }, 300);
      }
  
      function makeIconActive() {
        $(this).parents('.icon-field-container').find('.active').removeClass('active');
        $(this).addClass('active');
      }
  
      $(currentWindow + " .icon-field-container").off('click', '.btn-icon').on('click', '.btn-icon', makeIconActive);
      $(currentWindow + " .icon-search").each(function (_idx, elem) {
        var icons = $(elem).siblings('.radio-btn-group').find('.icon-option');
        $(elem).find('input').off().on('keydown', function () {
          window.setTimeout(function () {
            var search = String($(elem).find('input').val());
  
            if (search === '') {
              icons.show();
              return;
            }
  
            for (var j = 0; j < icons.length; j++) {
              if (!$(icons[j]).attr('data-icon-name').replace('_', ' ').includes(search)) {
                $(icons[j]).hide();
              } else {
                $(icons[j]).show();
              }
            }
          }, 50);
        });
      });
      $(currentWindow + " .icon-field-container").each(function (_idx, elem) {
        $(elem).find('.radio-btn-group').tooltip('destroy');
      });
      $(currentWindow + " .icon-field-container").each(function (_idx, elem) {
        $(elem).find('.radio-btn-group').tooltip({
          selector: 'label',
          title: function title() {
            return $(this).data('icon-name').replace(/_/g, ' ');
          },
          placement: 'top',
          container: 'body'
        });
      });
    });
  } // Fuction to create a Kendo UI Window
  
  function createKendoWindow(windowID, windowTitle, openFunction, closeFunction, actions, width, height, notmodal, issysprowindow, disposeonclose, left, top, updatePlacementOff, dragNotContained) {
    if (actions === void 0) {
      actions = [];
    }
  
    var ismodal = !notmodal;
    var widthInput = width && width.indexOf('%') > 0 ? width : width && width.indexOf('%') <= 0 ? width + "px" : '900px';
    var correctedHeight = height && height.indexOf('%') > 0 && parseInt(height.substring(0, height.length - 1)) >= 87 ? '86%' : height && height.indexOf('%') <= 0 && parseInt(height) >= window.screen.height - 60 ? window.screen.height - 65 : height;
    var heightInput = correctedHeight && typeof correctedHeight === 'string' && correctedHeight.indexOf('%') > 0 ? correctedHeight : correctedHeight && (typeof correctedHeight === 'number' || correctedHeight.indexOf('%') <= 0) ? correctedHeight + "px" : '550px'; // If a top or left are given then position the box accordingly
  
    var correctedTop = top && top.indexOf('%') > 0 && parseInt(top.substring(0, top.length - 1)) <= 10 ? '10%' : top && top.indexOf('%') <= 0 && parseInt(top) <= 60 ? 60 : top;
    var topInput = correctedTop && typeof correctedTop === 'string' && correctedTop.indexOf('%') > 0 ? correctedTop : correctedTop && (typeof correctedTop === 'number' || correctedTop.indexOf('%') <= 0) ? correctedTop + "px" : '50%';
    var leftInput = left && left.indexOf('%') > 0 ? left : left && left.indexOf('%') <= 0 ? left + "px" : '50%'; // If its a syspro window dispose of it after it closes.
  
    var deactivateMethod = disposeonclose ? function () {
      if ($('.syspro-trackfield-change-richtext').length > 0) {
        kendo.unbind($('.syspro-trackfield-change-richtext'));
        $.each($('.syspro-trackfield-change-richtext'), function (_idx, elem) {
          if ($(elem).data('kendoEditor')) {
            $(elem).data('kendoEditor').destroy();
          }
        });
      }
  
      queryLayoutUIHelpers.disposeViewOnly(windowID);
      var that = this;
      setTimeout(function () {
        if (that && _typeof(that) === 'object' && typeof that.destroy === 'function') {
          that.destroy();
        }
      }, 1000);
    } : function () {
      if ($('.syspro-trackfield-change-richtext').length > 0) {
        kendo.unbind($('.syspro-trackfield-change-richtext'));
        $.each($('.syspro-trackfield-change-richtext'), function (_idx, elem) {
          if ($(elem).data('kendoEditor')) {
            $(elem).data('kendoEditor').destroy();
          }
        });
      }
    };
    var updatePlacement = !updatePlacementOff ? function () {
      var windowPlacement = JSON.parse(localStorage.getItem('windowPlacement')) || {};
      var offcanvasWindow = $("#" + windowID).data("kendoWindow");
      var sysproModalId = $("#" + windowID).data('syspromodalid') || windowID;
  
      if (!windowPlacement.hasOwnProperty(callLayerInterop.programName)) {
        windowPlacement[callLayerInterop.programName] = {};
      }
  
      windowPlacement[callLayerInterop.programName][sysproModalId] = {
        position: offcanvasWindow.options.position,
        width: offcanvasWindow.options.width,
        height: offcanvasWindow.options.height
      };
      localStorage.setItem('windowPlacement', JSON.stringify(windowPlacement));
    } : null;
    $("#" + windowID).kendoWindow({
      // create a window
      actions: actions,
      minHeight: 200,
      minWidth: 200,
      width: widthInput,
      height: heightInput,
      modal: ismodal,
      // pinned: false,
      draggable: true,
      // draggable: dragNotContained ? true :
      //   {
      //     containment: '#main-container',
      //     axis: "",
      //   },
      position: {
        top: topInput,
        left: leftInput
      },
      animation: {
        open: {
          effects: 'fadeIn',
          duration: 100
        },
        close: {
          effects: 'fadeOut',
          duration: 80
        }
      },
      resizable: true,
      title: windowTitle,
      deactivate: deactivateMethod,
      visible: false,
      open: openFunction,
      close: closeFunction,
      resize: updatePlacement,
      dragend: updatePlacement,
      activate: function activate() {
        $('.k-window-action').attr('tabIndex', -1);
        $('.k-window-action').prop('tab-index', -1);
      }
    });
    var windowHolder = $("#" + windowID).data('kendoWindow');
  
    if (issysprowindow && windowHolder) {
      // If its a syspro window then add compact to the wrapper.
      windowHolder.wrapper.addClass('compact-window');
    } // check if the window includes a single widget with new special-text-notes class
  
  
    if ($('.special-text-notes', $("#" + windowID)).length === 1) {
      // .special-text-notes could even just be textarea for now.
      // Do some magic on the window and it's column containers
      windowHolder.wrapper.addClass('special-notes-window');
    }
  
    return windowHolder;
  } // initialise date pickers
  
  function initDatePicker(prefix) {
    $(prefix + " .date").datepicker({
      format: sysproInterop.dateFormat.toLowerCase(),
      maxViewMode: 2,
      todayBtn: true,
      autoclose: true,
      todayHighlight: true,
      zIndexOffset: 1000000
    });
  } // Get current off-canvas or main parent layout id
  
  function setContext(object) {
    var canvas_id = $(object).parents('.navbar-offcanvas').length ? $(object).parents('.navbar-offcanvas').attr('id').split('offcanvas-')[1] : $(object).parents('.k-window').length ? $(object).parents('.k-window-content').attr('id').split('offcanvas-')[1] : null;
    var parentTabWidgetJQuery = $(object).parents('.tab-pane').length ? $(object).parents('[data-displaystyle="TabControl"]') : null;
    var parentTabWidgetPresent = parentTabWidgetJQuery !== null;
    var currentParentDataSource = canvas_id !== null ? window.viewModel.OffCanvasLayouts["offcanvas-" + canvas_id].Columns : window.viewModel.dataSource;
    var parentTabWidget = parentTabWidgetJQuery ? currentParentDataSource.get(parentTabWidgetJQuery.attr('data-guid')) : null;
    var currentDataSource = parentTabWidget ? parentTabWidget.Tabs : currentParentDataSource;
    var layoutWidgetGuid = $(object).closest('.draggable-row-section').data('guid');
    var targetLayoutWidget = layoutWidgetGuid ? currentDataSource.get(layoutWidgetGuid) : null;
    var currentToolbarDataSource = canvas_id !== null ? window.viewModel.OffCanvasLayouts["offcanvas-" + canvas_id].MainToolbar.Columns : window.viewModel.toolbar;
    var columnsJQuery = $(object).parents('.main-column');
    var column_num = parseInt($(object).closest('ul.nav') && $(object).closest('ul.nav').length ? $(object).closest('ul.nav').data('column') : $(columnsJQuery[columnsJQuery.length - 1]).data('column'));
    var tab_column_num = parentTabWidgetJQuery ? $(object).closest('.main-column').data('column') : null;
    var widget_index;
  
    if (canvas_id !== null) {
      if (parentTabWidget) {
        widget_index = $("#offcanvas-" + canvas_id + " div[data-guid=\"" + parentTabWidget.Id + "\"] div[data-column=\"" + tab_column_num + "\"] .draggable-row-section").index($("div[data-guid=\"" + layoutWidgetGuid + "\"]"));
      } else {
        widget_index = $("#offcanvas-" + canvas_id + " div[data-column=\"" + column_num + "\"] > .sortable-list > .draggable-row-section").index($("div[data-guid=\"" + layoutWidgetGuid + "\"]"));
      }
    } else if (parentTabWidget) {
      widget_index = $("div[data-guid=\"" + parentTabWidget.Id + "\"] div[data-column=\"" + tab_column_num + "\"] .draggable-row-section").index($("div[data-guid=\"" + layoutWidgetGuid + "\"]"));
    } else {
      widget_index = $("#wrapper [id^=\"main_column\"][data-column=\"" + column_num + "\"] > .sortable-list > .draggable-row-section").index($("div[data-guid=\"" + layoutWidgetGuid + "\"]"));
    }
  
    var row_num = $(object).closest('.row').data('row');
    var section_num = parseInt($(object).hasClass('data-section') ? $(object).data('section') || 0 : $(object).closest('.data-section').data('section') ? $(object).closest('.data-section').data('section') || 0 : $(object).closest('.form-group').siblings('table') && $(object).closest('.form-group').siblings('table').find('tbody').hasClass('data-section') ? $(object).closest('.form-group').siblings('table').find('tbody.data-section').data('section') || 0 : 0);
    return {
      canvas_id: canvas_id,
      parentTabWidgetPresent: parentTabWidgetPresent,
      currentDataSource: currentDataSource,
      currentParentDataSource: currentParentDataSource,
      parentTabWidget: parentTabWidget,
      currentToolbarDataSource: currentToolbarDataSource,
      column_num: column_num,
      layoutWidgetGuid: layoutWidgetGuid,
      targetLayoutWidget: targetLayoutWidget,
      tab_column_num: tab_column_num,
      widget_index: widget_index,
      row_num: row_num,
      section_num: section_num
    };
  } // Size add on buttons
  
  function sizeAddonButtons() {
    $('.additional-input-button').each(function (_idx, elem) {
      var parentWidth = $(elem).width();
      var input = $(elem).find('.input-group').length ? $(elem).find('.input-group') : $(elem).find('input');
      var isDropdown = input.hasClass('dropdown-select');
      var button = $(elem).find('.btn.btn-sm.btn-default');
      var buttonWidth = button.textWidth() + 18;
  
      if (parentWidth <= 126 + buttonWidth || isDropdown) {
        // button.width('100%');
        button.css('width', '100%');
        button.css('margin-left', '0px');
        button.css('margin-top', '3px');
        input.width('100%');
        input.css('width', '100%');
      } else {
        button.width(buttonWidth - 18);
        button.css('margin-left', '5px');
        input.width(parentWidth - buttonWidth - 10);
      }
    });
  }
  function adjustContainerPadding() {
    var navHeight = $("#navbar-toolbar").outerHeight();
    $("#main-container").css("padding-top", navHeight + "px");
  }
  function toArray(changes) {
    var result = [];
  
    for (var id in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, id)) {
        result.push(changes[id]);
      }
    }
  
    return result;
  }
  function lightenDarkenColour(col, amt) {
    function rgbToHex(color) {
      var colorString = "" + color;
  
      if (!colorString || colorString.indexOf('rgb') < 0) {
        return;
      }
  
      if (colorString.charAt(0) == '#') {
        return colorString;
      }
  
      var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(colorString);
      var r = parseInt(nums[2], 10).toString(16);
      var g = parseInt(nums[3], 10).toString(16);
      var b = parseInt(nums[4], 10).toString(16);
      return "#" + ((r.length == 1 ? "0" + r : r) + (g.length == 1 ? "0" + g : g) + (b.length == 1 ? "0" + b : b));
    }
  
    var hexCol = rgbToHex(col);
    var usePound = false;
  
    if (hexCol[0] == '#') {
      hexCol = hexCol.slice(1);
      usePound = true;
    }
  
    var num = parseInt(hexCol, 16);
    var r = (num >> 16) + amt;
  
    if (r > 255) {
      r = 255;
    } else if (r < 0) {
      r = 0;
    }
  
    var b = (num >> 8 & 0x00ff) + amt;
  
    if (b > 255) {
      b = 255;
    } else if (b < 0) {
      b = 0;
    }
  
    var g = (num & 0x0000ff) + amt;
  
    if (g > 255) {
      g = 255;
    } else if (g < 0) {
      g = 0;
    }
  
    return (usePound ? '#' : '') + (g | b << 8 | r << 16).toString(16);
  }
  function onComboboxDataBound(e) {
    if (e.sender && e.sender.element) {
      $(e.sender.element).closest('.k-combobox').removeClass('form-control');
    }
  }
  // CONCATENATED MODULE: ./finaljs/modules/dragDropSortable.js
  
  
   // Runs when a widget starts being dragged
  
  function endQuickDragWidget() {
    $('.quick-sortable-list div').each(function (_idx, elem) {
      $(elem).addClass('draggable');
    });
  } // Runs when a layout widget ends being dragged, but complete process is not finished yet
  
  
  function endDragWidget(widget, context) {
    // Rob: Now always do a get instead of getByUid so we can use our own Id.
    var currentDraggedWidget = context.currentDataSource.get($(widget.item).data('guid'));
  
    if (widget.action === 'remove') {
      if (widget.item.hasClass('quickAddWidget')) {
        endQuickDragWidget();
      } else {
        var VBdata = context.currentDataSource.data().toJSON();
        var endParentColumn = widget.item.closest('.main-column').data('column');
        state.draggedLayoutWidgetCopy = VBdata[endParentColumn].Widgets[widget.oldIndex];
        context.currentDataSource.remove(currentDraggedWidget);
      }
    } else if (widget.action === 'receive') {
      if (widget.item.hasClass('quickAddWidget')) {
        var widgetType = widget.item.attr('id');
        var Type = widget.item.data('layout-widget-type');
        var SubType = widget.item.data('layout-widget-subtype');
        var DisplayStyle_1 = widget.item.data('layout-widget-displaystyle');
        var CardTypeDetail = widget.item.data('card-type-detail');
        var ParentFieldPath = widget.item.data('parent-field-path');
        $('body').removeClass('window-open');
        var newLayoutWidget = setupFinalLayoutWidget({
          WidgetName: widgetType,
          Title: '',
          TypeName: Type,
          SubType: SubType,
          Collapsible: false,
          DisplayStyle: DisplayStyle_1,
          Border: 0,
          TitleBackground: 9,
          TitleForeground: 8,
          Joined: 'Joined',
          Striped: '',
          FieldName: '',
          FieldPath: '',
          CardTypeDetail: CardTypeDetail,
          ParentFieldPath: ParentFieldPath,
          CardBackground: 0,
          CardColor: 9,
          ChartColor: 0,
          BackgroundColor: 9,
          Icon: '',
          ChartTitle: '',
          ChartLegend: null,
          LineColor: null,
          HarmonyComponentId: null,
          GridDataFieldName: null,
          GridListCaption: null,
          IsCollapsibleOpen: true,
          Size: 0,
          Compact: null,
          RichTextFieldName: null,
          ChartStacked: null,
          TabNum: null,
          TabTitles: [],
          ColumnLayout: '1col',
          DisplayOnly: [false, false, false]
        });
        context.currentDataSource.at(context.column_num).children.insert(widget.newIndex, newLayoutWidget);
        sysproInterop.getHtmlFromModel('Widget', stringifyJSONObject(newLayoutWidget.Id, context.currentDataSource), function (result) {
          var newWidgetHTMLjQuery = $($.trim(result));
  
          if (DisplayStyle_1 === 4) {
            newWidgetHTMLjQuery.find('.data-section').removeClass('data-section');
            newWidgetHTMLjQuery.children('.col-sm-12').addClass('tile-widget-wrapper');
            newWidgetHTMLjQuery.find('.panel-body').first().prepend('<div class="tile-loading-cover"><span class="spinner"></span></div>');
          }
  
          if (context.canvas_id) {
            if (widget.newIndex === 0) {
              $("#offcanvas-" + context.canvas_id + " .main-column[data-column='" + context.column_num + "'] .sortable-list").prepend(newWidgetHTMLjQuery);
            } else {
              newWidgetHTMLjQuery.insertAfter("#offcanvas-" + context.canvas_id + " .main-column[data-column='" + context.column_num + "'] .sortable-list .draggable-row-section:nth-child(" + widget.newIndex + ")");
            }
          } else if (widget.newIndex === 0) {
            $("#main_column_" + context.column_num + " .sortable-list").prepend(newWidgetHTMLjQuery);
          } else {
            newWidgetHTMLjQuery.insertAfter("#main_column_" + context.column_num + " .sortable-list .draggable-row-section:nth-child(" + widget.newIndex + ")");
          }
  
          finishAddLayoutWidget();
          initEditRemoveDataWidget();
        }, '', '', '', '', function (error) {
          console.log(error);
        }, false);
        widget.preventDefault();
      }
    } else if (widget.action === 'sort') {
      if (!widget.item.hasClass('quickAddWidget')) {
        var VBdata = context.currentDataSource.data().toJSON();
        currentDraggedWidget = context.currentDataSource.get($(widget.item).data('guid'));
        var endParentColumn = widget.item.parents('.main-column').data('column');
        var draggedLayoutWidgetCopy = VBdata[endParentColumn].Widgets[widget.oldIndex];
        context.currentDataSource.remove(currentDraggedWidget);
        context.currentDataSource.at(context.tab_column_num !== null ? context.tab_column_num : context.column_num).children.insert(widget.newIndex, draggedLayoutWidgetCopy);
      }
    }
  } // Runs when a layout widget is finished being dragged
  
  
  function finishDragWidget(widget, context) {
    if (widget.action === 'receive') {
      if (context.currentDataSource.at(context.tab_column_num !== null ? context.tab_column_num : context.column_num).hasChildren) {
        context.currentDataSource.at(context.tab_column_num !== null ? context.tab_column_num : context.column_num).children.insert(widget.newIndex, state.draggedLayoutWidgetCopy);
      } else {
        context.currentDataSource.at(context.tab_column_num !== null ? context.tab_column_num : context.column_num).append(state.draggedLayoutWidgetCopy);
      }
    }
  } // Runs when a data widget is finished being dragged
  
  
  function finishDragDataWidget(widget) {
    var targetContext = setContext(widget.draggableEvent.currentTarget);
  
    if (widget.action === 'receive') {
      if (targetContext.targetLayoutWidget.DisplayStyle === 1 || targetContext.targetLayoutWidget.DisplayStyle === 3) {
        var hasChildren = targetContext.targetLayoutWidget.children.at(0).children.at(0).hasChildren;
  
        if (hasChildren) {
          targetContext.currentDataSource.at(targetContext.tab_column_num !== null ? targetContext.tab_column_num : targetContext.column_num).children.at(targetContext.widget_index).children.at(0).children.at(0).children.insert(widget.newIndex, state.draggedDataWidgetTempCopy);
        } else {
          targetContext.currentDataSource.at(targetContext.tab_column_num !== null ? targetContext.tab_column_num : targetContext.column_num).children.at(targetContext.widget_index).children.at(0).children.at(0).append(state.draggedDataWidgetTempCopy);
        }
      } else if (targetContext.targetLayoutWidget.DisplayStyle === 5) {
        if (targetContext.currentDataSource.at(targetContext.tab_column_num !== null ? targetContext.tab_column_num : targetContext.column_num).children.at(targetContext.widget_index).children.at(0).children.at(targetContext.section_num).hasChildren) {
          targetContext.currentDataSource.at(targetContext.tab_column_num !== null ? targetContext.tab_column_num : targetContext.column_num).children.at(targetContext.widget_index).children.at(0).children.at(targetContext.section_num).children.insert(widget.newIndex, state.draggedDataWidgetTempCopy);
        } else {
          targetContext.currentDataSource.at(targetContext.tab_column_num !== null ? targetContext.tab_column_num : targetContext.column_num).children.at(targetContext.widget_index).children.at(0).children.at(targetContext.section_num).append(state.draggedDataWidgetTempCopy);
        }
      } else {
        targetContext.currentDataSource.at(targetContext.tab_column_num !== null ? targetContext.tab_column_num : targetContext.column_num).children.at(targetContext.widget_index).children.at(targetContext.row_num).children.at(targetContext.section_num).append(state.draggedDataWidgetTempCopy);
      }
    }
  
    sysproInterop.performBind(state.bindableFieldsData, true, '', $(widget.item).parents('.draggable-row-section'));
  } // Runs when a toolbar widget is finished being dragged
  
  
  function finishDragToolbarWidget(widget, context) {
    if (widget.action === 'receive') {
      var TBData = context.currentToolbarDataSource.data().toJSON();
      TBData[context.column_num].Widgets.splice(widget.newIndex, 0, state.draggedToolbarWidgetTempCopy);
      context.currentToolbarDataSource.data(TBData);
    }
  } // Helper function for drag and drop interactivity
  
  
  function placeholder(element) {
    return element.clone().addClass('placeholderGhost');
  } // Helper function for drag and drop interactivity
  
  
  function quickplaceholder(element) {
    var TypeName = element.data('layout-widget-type');
    var WidgetName = element.attr('id');
    var elementClone = element.clone();
    elementClone.find('i').remove();
    var widgetText = elementClone.text();
  
    if (TypeName === 'Card' || TypeName === 'HarmonyWidget') {
      var cardPlaceholder = $(state.placeholderCardHTML);
      cardPlaceholder.find('.card-name').text(widgetText);
      return cardPlaceholder.addClass('placeholderGhost');
    }
  
    if (state.layoutWidgetHTML[WidgetName]) {
      return $(state.layoutWidgetHTML[WidgetName]).addClass('placeholderGhost');
    }
  
    return $("<div class=\"draggable-row-section sortable-item removeable placeholderGhost\" data-guid=\"\"><div class=\"panel sys-widget card-widget sys-bd-off\"> <div class=\"panel-body text-center sys-bg-white\"> <h4 class=\"sys-mg-off sys-pd-t-10\">" + widgetText + "</h4> <small>" + TypeName + "</small> </div> </div></div>");
  } // Helper function for drag and drop interactivity
  
  
  function hint(element) {
    return element.clone().addClass('hint').height(element.height()).width(element.width() + 25);
  } // Helper function for drag and drop interactivity
  
  
  function quickhint(element) {
    var TypeName = element.data('layout-widget-type');
    var WidgetName = element.attr('id');
    var elementClone = element.clone();
    elementClone.find('i').remove();
    var widgetText = elementClone.text();
  
    if (TypeName === 'Card' || TypeName === 'HarmonyWidget') {
      var cardPlaceholder = $(state.placeholderCardHTML);
      cardPlaceholder.find('.card-name').text(widgetText);
      return cardPlaceholder.addClass('hint').width($('.main-column').width());
    }
  
    if (state.layoutWidgetHTML[WidgetName]) {
      return $(state.layoutWidgetHTML[WidgetName]).addClass('hint').width($('.main-column').width());
    }
  
    return $("<div class=\"draggable-row-section sortable-item removeable hint\"><div class=\"panel sys-widget card-widget sys-bd-off\"> <div class=\"panel-body text-center sys-bg-white\"> <h4 class=\"sys-mg-off sys-pd-t-10\">" + widgetText + "</h4> <small>" + TypeName + "</small> </div> </div></div>").width($('.main-column').width());
  } // Destroy Layout widgets Kendo Sortable Widget
  
  
  function destroySorting(sortableWidgets) {
    for (var i = 0; i < sortableWidgets.length; i++) {
      if (sortableWidgets[i].draggable) sortableWidgets[i].draggable.destroy();
      sortableWidgets[i].destroy();
    }
  } // Main sorting initialisation function for layout widgets
  
  
  function initNormalSorting() {
    var sectionsToInit = [];
    sectionsToInit.push('wrapper');
  
    for (var prop in window.viewModel.OffCanvasLayouts) {
      if (prop.includes('offcanvas')) {
        sectionsToInit.push(prop);
      }
    }
  
    if (state.sortableWidgets.length) destroySorting(state.sortableWidgets);
    state.sortableWidgets = [];
  
    function initSectionNormalSorting(parentElement) {
      $(parentElement + " .main-column").each(function (index, elem) {
        state.sortableWidgets[state.sortableWidgets.length] = $(elem).find('.sortable-list, .tab-sortable-list').kendoSortable({
          connectWith: parentElement + " .sortable-list, " + parentElement + " .tab-sortable-list",
          placeholder: placeholder,
          hint: hint,
          handle: '>.draggable-row-section .layout-widget-options > .row > .col-xs-3:first-child',
          filter: '>.draggable-row-section',
          ignore: '.data-section, .data-section>div, .data-section *, .tile-widget, .tile, .tile-widget *, .form-control, .form-group *, tr, tr *, .diagram-card, .diagram-card *',
          cursor: 'move',
          end: function end(widget) {
            var context = setContext(widget.sender.draggedElement ? widget.sender.draggedElement[0].parentElement : widget.sender.element);
            endDragWidget(widget, context);
            $(parentElement + " .initial-target").each(function (_idx, element) {
              $(element).toggle(!$(element).siblings('.draggable-row-section').length);
            });
          },
          change: function change(widget) {
            var context = setContext(widget.item);
            finishDragWidget(widget, context);
          },
          move: function move(widget) {
            var dropTarget = widget.target;
            $(parentElement + " .initial-target").each(function (_idx, element) {
              if (!$(element).siblings('.draggable-row-section').not('.placeholderGhost').length) {
                $(element).toggle(!$(element).is(dropTarget));
              }
            });
          }
        }).data('kendoSortable');
      });
    }
  
    for (var i = 0; i < sectionsToInit.length; i++) {
      initSectionNormalSorting("#" + sectionsToInit[i]);
    }
  } // Data Widget sorting initialisation
  
  function initDataWidgetSorting() {
    var sectionsToInit = [];
    sectionsToInit.push('wrapper');
  
    for (var prop in window.viewModel.OffCanvasLayouts) {
      if (prop.includes('offcanvas')) {
        sectionsToInit.push(prop);
      }
    }
  
    if (state.sortableDataWidgets.length) destroySorting(state.sortableDataWidgets);
    state.sortableDataWidgets = [];
  
    function initDataSectionNormalSorting(parentElement) {
      $(parentElement + " div.data-section, " + parentElement + " tbody.data-section").each(function (_idx, elem) {
        state.sortableDataWidgets[state.sortableDataWidgets.length] = $(elem).kendoSortable({
          connectWith: parentElement + " div.data-section, " + parentElement + " tbody.data-section",
          placeholder: placeholder,
          hint: hint,
          ignore: 'input',
          filter: '>div:not(.form-group:first-child), >tr, >a',
          disabled: '.add-data-widget',
          handle: '.data-widget-options .drag-data-section',
          cursor: 'move',
          start: function start() {
            // Need to disable every sortable widget that already has a data widget in it, so it cannot be a valid target
            $(parentElement + " .panel.draggable-data-section").each(function (_index, element) {
              $(element).closest('div.data-section').removeClass('data-section').addClass('data-section-disabled');
            });
  
            if (this.element.find('.add-data-widget')) {
              state.tempHiddenWidg = this.element.find('.add-data-widget');
            }
  
            if (this.element.find('.add-data-section')) {
              this.element.find('.add-data-section').show();
            }
          },
          end: function end(widget) {
            var context = setContext(widget.sender.element);
            $(parentElement + " .draggable-data-section").each(function (_index, element) {
              $(element).closest('div.data-section-disabled').removeClass('data-section-disabled').addClass('data-section');
            });
  
            if (widget.action === 'receive') {
              var currentDataWidgetHTML_1 = widget.item.closest('.draggable-data-section');
              sysproInterop.getHtmlFromModel('Widget', state.draggedDataWidgetTempCopy.toJSON(), function (result) {
                var newDataWidgetHTMLjQuery = $($.trim(result));
  
                if (context.targetLayoutWidget.DisplayStyle === 0 || context.targetLayoutWidget.DisplayStyle === 5 || context.targetLayoutWidget.DisplayStyle === 2) {
                  currentDataWidgetHTML_1.replaceWith(newDataWidgetHTMLjQuery);
                  initEditRemoveDataWidget();
                } else if (context.targetLayoutWidget.DisplayStyle === 1 || context.targetLayoutWidget.DisplayStyle === 3) {
                  currentDataWidgetHTML_1.replaceWith(newDataWidgetHTMLjQuery);
                }
  
                var offCanvasLayoutId = state.draggedDataWidgetTempCopy.OffCanvasLayoutId || null;
  
                if (offCanvasLayoutId) {
                  var offCanvasType = window.viewModel.OffCanvasLayouts["offcanvas-" + offCanvasLayoutId].OffCanvas;
  
                  if (offCanvasType === 3) {
                    newDataWidgetHTMLjQuery.find('a').removeClass('offcanvas-toggle');
                    newDataWidgetHTMLjQuery.find('a').on('click', function (e) {
                      window.viewModel.offCanvasWindows[$(e.currentTarget).data('target')].center().open();
                    });
                  } else {
                    $(newDataWidgetHTMLjQuery.find('a.offcanvas-toggle').data('target')).removeClass('js-offcanvas-done');
                    var initOffCanvas = newDataWidgetHTMLjQuery.hasClass('offcanvas-toggle') ? new Offcanvas(newDataWidgetHTMLjQuery) : new Offcanvas(newDataWidgetHTMLjQuery.find('a.offcanvas-toggle'));
                  }
                }
  
                sysproInterop.performBind(state.bindableFieldsData, true, '', widget.item.closest('.layout-widget'));
                initEditRemoveDataWidget();
                initDataWidgetSorting();
                finishAddLayoutWidget();
              }, context.targetLayoutWidget.SubType, context.targetLayoutWidget.DisplayStyle, context.targetLayoutWidget.Border, context.section_num, function (error) {
                console.log(error);
              }, false);
            } else if (widget.action === 'remove') {
              // Rob: Now always do a get instead of getByUid so we can use our own Id.
              var currentDraggedDataWidget = context.currentDataSource.get($(widget.item).data('guid') || $(widget.item).children('.draggable-data-section').data('guid'));
              state.draggedDataWidgetTempCopy = currentDraggedDataWidget;
              context.currentDataSource.remove(currentDraggedDataWidget);
            } else if (widget.action === 'sort') {
              var draggedDataWidget = context.currentDataSource.get($(widget.item).data('guid') || $(widget.item).children('.draggable-data-section').data('guid'));
  
              if (context.targetLayoutWidget.DisplayStyle === 1 || context.targetLayoutWidget.DisplayStyle === 3) {
                var draggedDataWidgetCopy = draggedDataWidget.toJSON();
                context.currentDataSource.remove(draggedDataWidget);
                context.currentDataSource.at(context.tab_column_num !== null ? context.tab_column_num : context.column_num).children.at(context.widget_index).children.at(0).children.at(0).children.insert(widget.newIndex - 1, draggedDataWidgetCopy);
              } else if (context.targetLayoutWidget.DisplayStyle === 5) {
                var draggedDataWidgetCopy = draggedDataWidget.toJSON();
                context.currentDataSource.remove(draggedDataWidget);
                console.log(context);
                console.log(context.currentDataSource.at(context.tab_column_num !== null ? context.tab_column_num : context.column_num));
                console.log(context.currentDataSource.at(context.tab_column_num !== null ? context.tab_column_num : context.column_num).children.at(context.widget_index).children);
                console.log(context.currentDataSource.at(context.tab_column_num !== null ? context.tab_column_num : context.column_num).children.at(context.widget_index).children.at(0).children);
                context.currentDataSource.at(context.tab_column_num !== null ? context.tab_column_num : context.column_num).children.at(context.widget_index).children.at(0).children.at(context.section_num).children.insert(widget.newIndex, draggedDataWidgetCopy);
              }
            }
          },
          change: function change(widget) {
            // const context = setContext(widget.item);
            finishDragDataWidget(widget);
          },
          move: function move(widget) {
            if (state.tempHiddenWidg !== null) {
              state.tempHiddenWidg.show();
            }
  
            $(parentElement + " .add-data-widget").each(function (_index, element) {
              if ($(element).siblings('.draggable-data-section:visible').length || $(element).siblings('a:visible').length) {
                $(element).not(state.tempHiddenWidg).hide();
  
                if (widget.target.hasClass('add-data-widget')) {
                  widget.target.hide();
                }
              } else {
                $(element).not(widget.target).show();
                $(element).addClass('pulse');
              }
            });
          }
        }).data('kendoSortable');
      });
    }
  
    for (var i = 0; i < sectionsToInit.length; i++) {
      initDataSectionNormalSorting("#" + sectionsToInit[i]);
    }
  
    var linkSectionsToInit = [];
    linkSectionsToInit.push('wrapper');
  
    for (var prop in window.viewModel.OffCanvasLayouts) {
      if (prop.includes('offcanvas')) {
        linkSectionsToInit.push(prop);
      }
    }
  
    if (state.sortableLinkListDataWidgets.length) {
      destroySorting(state.sortableLinkListDataWidgets);
    }
  
    state.sortableLinkListDataWidgets = [];
  
    function initLinkListNormalSorting(parentElement) {
      $(parentElement + " div.layout-widget .panel-body .list-group").each(function (index, element) {
        state.sortableLinkListDataWidgets[index] = $(element).kendoSortable({
          connectWith: parentElement + " div.layout-widget .panel-body .list-group",
          placeholder: placeholder,
          hint: hint,
          ignore: 'input',
          filter: '>a',
          disabled: '.add-data-widget',
          handle: '.drag-data-section',
          cursor: 'move',
          end: function end(widget) {
            var context = setContext(widget.sender.element);
  
            if (widget.action === 'receive') {
              var currentDataWidgetHTML_2 = widget.item.closest('.draggable-data-section');
              sysproInterop.getHtmlFromModel('Widget', state.draggedDataWidgetTempCopy.toJSON(), function (result) {
                var newDataWidgetHTMLjQuery = $($.trim(result));
                currentDataWidgetHTML_2.replaceWith(newDataWidgetHTMLjQuery);
                sysproInterop.performBind(state.bindableFieldsData, true, '', widget.item.closest('.layout-widget'));
                initEditRemoveDataWidget();
                initDataWidgetSorting();
                finishAddLayoutWidget();
              }, context.targetLayoutWidget.SubType, context.targetLayoutWidget.DisplayStyle, context.targetLayoutWidget.Border, context.section_num);
            } else if (widget.action === 'remove') {
              // Rob: Now always do a get instead of getByUid so we can use our own Id.
              var currentDraggedDataWidget = context.currentDataSource.get($(widget.item).data('guid'));
              state.draggedDataWidgetTempCopy = currentDraggedDataWidget;
              context.currentDataSource.remove(currentDraggedDataWidget);
            } else if (widget.action === 'sort') {
              var currentDataWidgetUid = widget.item.data('guid');
              var draggedDataWidget = context.currentDataSource.get(currentDataWidgetUid);
              var draggedDataWidgetCopy = draggedDataWidget.toJSON();
              context.currentDataSource.remove(draggedDataWidget);
              context.currentDataSource.at(context.column_num).children.at(context.widget_index).children.at(0).children.at(0).children.insert(widget.newIndex - 1, draggedDataWidgetCopy);
            }
          },
          change: function change(widget) {
            // const context = setContext(widget.item);
            finishDragDataWidget(widget);
          }
        }).data('kendoSortable');
      });
    }
  
    for (var i = 0; i < linkSectionsToInit.length; i++) {
      initLinkListNormalSorting("#" + linkSectionsToInit[i]);
    }
  } // Initialise quick add layout widgets for dragging from the left sidebar
  
  function initQuickAddLayoutWidgets() {
    if ($('.quick-sortable-list').data('kendoSortable')) {
      $('.quick-sortable-list').data('kendoSortable').destroy();
    }
  
    var quickAddLayoutWidgets = $('.quick-sortable-list').kendoSortable({
      connectWith: '.sortable-list, .tab-sortable-list',
      placeholder: quickplaceholder,
      hint: quickhint,
      filter: '>div',
      cursor: 'move',
      start: function start() {
        $('#draggableCover').show();
        $('.sortable-list').each(function (_idx, elem) {
          $(elem).addClass('pulse');
        });
      },
      end: function end(widget) {
        $('#draggableCover').hide();
        $('.sortable-list').each(function (_idx, elem) {
          $(elem).removeClass('pulse');
        });
        var context = setContext(widget.sender.element);
        endDragWidget(widget, context);
      }
    }).data('kendoSortable');
  } // Toolbar sorting initialisation function for layout widgets
  
  function initToolbarSorting() {
    var toolbarSectionsToInit = [];
    toolbarSectionsToInit.push('wrapper');
  
    for (var prop in window.viewModel.OffCanvasLayouts) {
      if (prop.includes('offcanvas')) {
        toolbarSectionsToInit.push(prop);
      }
    }
  
    if (state.sortableToolbarWidgets.length) destroySorting(state.sortableToolbarWidgets);
    state.sortableToolbarWidgets = [];
  
    function initToolbarNormalSorting(parentElement) {
      $(parentElement + " .navbar-controlbar ul.nav").each(function (index, element) {
        state.sortableToolbarWidgets[index] = $(element).kendoSortable({
          connectWith: parentElement + " .navbar-controlbar ul.nav," + parentElement + " .navbar-controlbar ul.dropdown-menu",
          placeholder: placeholder,
          hint: hint,
          handle: '.toolbar-widget-options .col-xs-6:first-child i',
          filter: '>li:not(.add-toolbar-widget)',
          ignore: '.form-control, .form-group, .form-group *, .dropdown-menu *',
          cursor: 'move',
          end: function end(widget) {
            var context = setContext(widget.sender.element);
  
            if (widget.action === 'receive') {
              var currentToolbarWidgetHTML_1 = widget.item.closest('li');
              console.log(state.draggedToolbarWidgetTempCopy);
              var Type = state.draggedToolbarWidgetTempCopy.FieldName === 'ToolbarDropdown' ? 'ToolbarDropdown' : state.draggedToolbarWidgetTempCopy.FieldName === 'ToolbarSubDropdown' ? 'ToolbarDropdown' : state.draggedToolbarWidgetTempCopy.FieldName === 'ButtonWidget' ? 'Widget' : 'ToolbarWidget';
              sysproInterop.getHtmlFromModel(Type, state.draggedToolbarWidgetTempCopy.toJSON(), function (result) {
                var newToolbarWidgetHTMLjQuery = $($.trim(result));
                currentToolbarWidgetHTML_1.replaceWith(newToolbarWidgetHTMLjQuery);
                var offCanvasLayoutId = state.draggedToolbarWidgetTempCopy.OffCanvasLayoutId || null;
  
                if (offCanvasLayoutId) {
                  var offCanvasType = window.viewModel.OffCanvasLayouts["offcanvas-" + offCanvasLayoutId].OffCanvas;
  
                  if (offCanvasType === 3) {
                    newToolbarWidgetHTMLjQuery.find('a').removeClass('offcanvas-toggle');
                    newToolbarWidgetHTMLjQuery.find('a').on('click', function (e) {
                      window.viewModel.offCanvasWindows[$(e.currentTarget).data('target')].center().open();
                    });
                  } else {
                    $(newToolbarWidgetHTMLjQuery.find('a.offcanvas-toggle').data('target')).removeClass('js-offcanvas-done');
                    var initOffCanvas = newToolbarWidgetHTMLjQuery.hasClass('offcanvas-toggle') ? new Offcanvas(newToolbarWidgetHTMLjQuery) : new Offcanvas(newToolbarWidgetHTMLjQuery.find('a.offcanvas-toggle'));
                  }
                }
  
                sysproInterop.performBind(state.bindableFieldsData, true, '', $('#navbar-toolbar'));
                $.material.init();
                initEditRemoveDataWidget();
                initEditRemoveToolbarWidgets();
                initToolbarSorting();
              }, '', 7, '', '', function (error) {
                console.log(error);
              }, false);
            } else if (widget.action === 'remove') {
              // Rob: Now always do a get instead of getByUid so we can use our own Id.
              console.log(context);
              console.log($(widget.item).data('guid'));
              var currentDraggedToolbarWidget = context.currentToolbarDataSource.get($(widget.item).data('guid'));
              console.log(currentDraggedToolbarWidget);
              state.draggedToolbarWidgetTempCopy = currentDraggedToolbarWidget;
              context.currentToolbarDataSource.remove(currentDraggedToolbarWidget);
            } else if (widget.action === 'sort') {
              var draggedToolbarWidget = context.currentToolbarDataSource.get(widget.item.data('guid'));
              var draggedToolbarWidgetCopy = draggedToolbarWidget.toJSON();
              context.currentToolbarDataSource.remove(draggedToolbarWidget);
              context.currentToolbarDataSource.at(context.column_num).children.insert(widget.newIndex, draggedToolbarWidgetCopy);
            }
          },
          change: function change(widget) {
            var context = setContext(widget.item);
            finishDragToolbarWidget(widget, context);
          }
        }).data('kendoSortable');
      });
      $(parentElement + " .navbar-controlbar ul.dropdown-menu").each(function (index, elem) {
        state.sortableToolbarWidgets[$(parentElement + " .navbar-controlbar ul.nav").length + index] = $(elem).kendoSortable({
          connectWith: parentElement + " .navbar-controlbar ul.nav," + parentElement + " .navbar-controlbar ul.dropdown-menu",
          placeholder: placeholder,
          hint: hint,
          handle: '.toolbar-widget-options .col-xs-6:first-child',
          filter: '>li:not(.add-toolbar-widget)',
          ignore: '.form-control, .form-group, .form-group *',
          cursor: 'move',
          end: function end(widget) {
            var context = setContext(widget.sender.element);
  
            if (widget.action === 'receive') {
              var currentToolbarWidgetHTML_2 = widget.item.closest('li');
              var Type = state.draggedToolbarWidgetTempCopy.FieldName === 'ToolbarDropdown' ? 'ToolbarDropdown' : state.draggedToolbarWidgetTempCopy.FieldName === 'ToolbarSubDropdown' ? 'ToolbarDropdown' : state.draggedToolbarWidgetTempCopy.FieldName === 'ButtonWidget' ? 'Widget' : 'ToolbarWidget';
              sysproInterop.getHtmlFromModel(Type, state.draggedToolbarWidgetTempCopy.toJSON(), function (result) {
                var newToolbarWidgetHTMLjQuery = $($.trim(result));
                currentToolbarWidgetHTML_2.replaceWith(newToolbarWidgetHTMLjQuery); // sysproInterop.performBind(state.bindableFieldsData, true);
  
                sysproInterop.performBind(state.bindableFieldsData, true, '', $('#navbar-toolbar'));
                $.material.init();
                initEditRemoveDataWidget();
                initToolbarSorting();
              }, '', 7, '', '', function (error) {
                console.log(error);
              }, false);
            } else if (widget.action === 'remove') {
              // Rob: Now always do a get instead of getByUid so we can use our own Id.
              var currentDraggedToolbarWidget = context.currentToolbarDataSource.get($(widget.item).data('guid'));
              state.draggedToolbarWidgetTempCopy = currentDraggedToolbarWidget;
              context.currentToolbarDataSource.remove(currentDraggedToolbarWidget);
            } else if (widget.action === 'sort') {
              var draggedToolbarWidget = context.currentToolbarDataSource.get(widget.item.data('guid'));
              var draggedToolbarWidgetCopy = draggedToolbarWidget.toJSON();
              context.currentToolbarDataSource.remove(draggedToolbarWidget);
              var parentDropdownWidget = $(widget.item.closest('li.dropdown'));
              context.widget_index = $("ul.nav[data-column=\"" + context.column_num + "\"] > li:not(.add-toolbar-widget)").index(parentDropdownWidget);
              context.currentToolbarDataSource.at(context.column_num).children.at(context.widget_index).children.insert(widget.newIndex, draggedToolbarWidgetCopy);
            }
          },
          change: function change(widget) {
            var context = setContext(widget.item);
            finishDragToolbarWidget(widget, context);
          }
        }).data('kendoSortable');
      });
    }
  
    for (var i = 0; i < toolbarSectionsToInit.length; i++) {
      initToolbarNormalSorting("#" + toolbarSectionsToInit[i]);
    }
  }
  // CONCATENATED MODULE: ./finaljs/modules/offCanvas.js
  
  
  
   // Setup an off-canvas section with a parent column layout
  
  function setupOffCanvasSection(OffCanvasLayoutId, offCanvasTitle, offCanvasType, Toolbar, columnLayout) {
    var columnsData;
  
    switch (columnLayout) {
      case '1col':
        columnsData = [new parentColumnsModel({
          Index: 0,
          ResponsiveStyle: 0,
          Widgets: []
        })];
        break;
  
      case '2colequal':
        columnsData = [new parentColumnsModel({
          Index: 0,
          ResponsiveStyle: 1,
          Widgets: []
        }), new parentColumnsModel({
          Index: 1,
          ResponsiveStyle: 1,
          Widgets: []
        })];
        break;
  
      case '2colleft':
        columnsData = [new parentColumnsModel({
          Index: 0,
          ResponsiveStyle: 2,
          Widgets: []
        }), new parentColumnsModel({
          Index: 1,
          ResponsiveStyle: 3,
          Widgets: []
        })];
        break;
  
      case '2colright':
        columnsData = [new parentColumnsModel({
          Index: 0,
          ResponsiveStyle: 3,
          Widgets: []
        }), new parentColumnsModel({
          Index: 1,
          ResponsiveStyle: 2,
          Widgets: []
        })];
        break;
  
      case '3col':
        columnsData = [new parentColumnsModel({
          Index: 0,
          ResponsiveStyle: 3,
          Widgets: []
        }), new parentColumnsModel({
          Index: 1,
          ResponsiveStyle: 3,
          Widgets: []
        }), new parentColumnsModel({
          Index: 2,
          ResponsiveStyle: 3,
          Widgets: []
        })];
        break;
  
      default:
        break;
    }
  
    var IsToolbarVisible = !!Toolbar;
    var toolbarData = Toolbar ? [new toolbarModel({
      Index: 0,
      Alignment: 0,
      ResponsiveStyle: 0,
      Widgets: []
    }), new toolbarModel({
      Index: 1,
      Alignment: 1,
      ResponsiveStyle: 0,
      Widgets: []
    })] : []; // TODO: look into making a new offCanvas specific constructor
    // const offCanvasWidget = new offCanvasModel({
  
    var offCanvasWidget = kendo.observable({
      Id: OffCanvasLayoutId,
      Title: offCanvasTitle,
      OffCanvas: offCanvasType,
      columnLayout: columnLayout,
      Columns: new kendo.data.HierarchicalDataSource({
        data: columnsData,
        schema: {
          model: parentColumnsModel
        }
      }),
      // IsToolbarVisible: IsToolbarVisible,
      MainToolbar: kendo.observable({
        IsToolbarVisible: IsToolbarVisible,
        Columns: new kendo.data.HierarchicalDataSource({
          data: toolbarData,
          schema: {
            model: toolbarModel
          }
        })
      })
    });
    offCanvasWidget.Columns.read();
    offCanvasWidget.MainToolbar.Columns.read();
    createInvisibleTreeView("OC_" + OffCanvasLayoutId, offCanvasWidget.Columns);
    createInvisibleTreeView("OCT_" + OffCanvasLayoutId, offCanvasWidget.MainToolbar.Columns);
    return offCanvasWidget;
  } // Edit an off-canvas section
  
  function editOffCanvasSection() {
    var currentColumnsCount = window.viewModel.selectedOffCanvas.Columns.data().length;
    var currentToolbarCount = window.viewModel.selectedOffCanvas.MainToolbar.Columns.data().length;
  
    switch (window.viewModel.selectedOffCanvas.columnLayout) {
      case '1col':
        if (currentColumnsCount > 1) {
          var OCdata = window.viewModel.selectedOffCanvas.Columns.data().toJSON();
          OCdata.splice(1, 2);
          window.viewModel.selectedOffCanvas.Columns.data(OCdata);
        }
  
        window.viewModel.selectedOffCanvas.Columns.at(0).ResponsiveStyle = 0;
        break;
  
      case '2colequal':
        if (currentColumnsCount === 3) {
          var OCdata = window.viewModel.selectedOffCanvas.Columns.data().toJSON();
          OCdata.splice(2, 1);
          window.viewModel.selectedOffCanvas.Columns.data(OCdata);
        } else if (currentColumnsCount === 1) {
          window.viewModel.selectedOffCanvas.Columns.data().push(new parentColumnsModel({
            Index: 1,
            ResponsiveStyle: 1,
            Widgets: []
          }));
        }
  
        window.viewModel.selectedOffCanvas.Columns.at(0).ResponsiveStyle = 1;
        window.viewModel.selectedOffCanvas.Columns.at(1).ResponsiveStyle = 1;
        break;
  
      case '2colleft':
        if (currentColumnsCount === 3) {
          var OCdata = window.viewModel.selectedOffCanvas.Columns.data().toJSON();
          OCdata.splice(2, 1);
          window.viewModel.selectedOffCanvas.Columns.data(OCdata);
        } else if (currentColumnsCount === 1) {
          window.viewModel.selectedOffCanvas.Columns.data().push(new parentColumnsModel({
            Index: 1,
            ResponsiveStyle: 1,
            Widgets: []
          }));
        }
  
        window.viewModel.selectedOffCanvas.Columns.at(0).ResponsiveStyle = 2;
        window.viewModel.selectedOffCanvas.Columns.at(1).ResponsiveStyle = 3;
        break;
  
      case '2colright':
        if (currentColumnsCount === 3) {
          var OCdata = window.viewModel.selectedOffCanvas.Columns.data().toJSON();
          OCdata.splice(2, 1);
          window.viewModel.selectedOffCanvas.Columns.data(OCdata);
        } else if (currentColumnsCount === 1) {
          window.viewModel.selectedOffCanvas.Columns.data().push(new parentColumnsModel({
            Index: 1,
            ResponsiveStyle: 1,
            Widgets: []
          }));
        }
  
        window.viewModel.selectedOffCanvas.Columns.at(0).ResponsiveStyle = 3;
        window.viewModel.selectedOffCanvas.Columns.at(1).ResponsiveStyle = 2;
        break;
  
      case '3col':
        if (currentColumnsCount === 2) {
          window.viewModel.selectedOffCanvas.Columns.data().push(new parentColumnsModel({
            Index: 2,
            ResponsiveStyle: 3,
            Widgets: []
          }));
        } else if (currentColumnsCount === 1) {
          window.viewModel.selectedOffCanvas.Columns.data().push(new parentColumnsModel({
            Index: 1,
            ResponsiveStyle: 3,
            Widgets: []
          }));
          window.viewModel.selectedOffCanvas.Columns.data().push(new parentColumnsModel({
            Index: 2,
            ResponsiveStyle: 3,
            Widgets: []
          }));
        }
  
        window.viewModel.selectedOffCanvas.Columns.at(0).ResponsiveStyle = 3;
        window.viewModel.selectedOffCanvas.Columns.at(1).ResponsiveStyle = 3;
        window.viewModel.selectedOffCanvas.Columns.at(2).ResponsiveStyle = 3;
        break;
  
      default:
        break;
    }
  
    if (window.viewModel.selectedOffCanvas.MainToolbar.IsToolbarVisible && currentToolbarCount === 0) {
      window.viewModel.selectedOffCanvas.MainToolbar.Columns.data([new toolbarModel({
        Index: 0,
        Alignment: 0,
        ResponsiveStyle: 0,
        Widgets: []
      }), new toolbarModel({
        Index: 1,
        Alignment: 1,
        ResponsiveStyle: 0,
        Widgets: []
      })]);
    } else if (!window.viewModel.selectedOffCanvas.MainToolbar.IsToolbarVisible && currentToolbarCount > 0) {
      window.viewModel.selectedOffCanvas.MainToolbar.Columns.data([]);
    }
  } // Insert off canvas section
  
  function insertOffCanvasSection(offCanvasWidget, replace, tempOffCanvasJSON, callback) {
    if (!replace) window.viewModel.OffCanvasLayouts["offcanvas-" + offCanvasWidget.Id] = offCanvasWidget;
    var serializedOffCanvas = {
      Id: offCanvasWidget.Id,
      Title: offCanvasWidget.Title,
      OffCanvas: offCanvasWidget.OffCanvas,
      columnLayout: offCanvasWidget.columnLayout,
      Columns: offCanvasWidget.Columns.data().toJSON(),
      MainToolbar: {
        IsToolbarVisible: offCanvasWidget.MainToolbar.IsToolbarVisible,
        Columns: offCanvasWidget.MainToolbar.Columns.data().toJSON()
      }
    };
    sysproInterop.getHtmlFromModel('OffCanvas', serializedOffCanvas, function (result) {
      var newOffCanvasWidgetHTMLjQuery = $($.trim(result)); // TODO: cater for kendo window types
  
      if (replace) {
        if (tempOffCanvasJSON && tempOffCanvasJSON.OffCanvas == 3) {
          window.viewModel.offCanvasWindows["#offcanvas-" + offCanvasWidget.Id].destroy();
          delete window.viewModel.offCanvasWindows["#offcanvas-" + offCanvasWidget.Id];
          $('#offCanvasContainer').append(newOffCanvasWidgetHTMLjQuery);
  
          if (offCanvasWidget.OffCanvas == 3) {
            window.viewModel.offCanvasWindows["#offcanvas-" + offCanvasWidget.Id] = createKendoWindow("offcanvas-" + offCanvasWidget.Id, offCanvasWidget.Title, null, null, ['Close'], null, null, true, true, false, null, null);
          }
        } else if (offCanvasWidget.OffCanvas == 3) {
          $("#offcanvas-" + offCanvasWidget.Id).remove();
          $('#offCanvasContainer').append(newOffCanvasWidgetHTMLjQuery);
          window.viewModel.offCanvasWindows["#offcanvas-" + offCanvasWidget.Id] = createKendoWindow("offcanvas-" + offCanvasWidget.Id, offCanvasWidget.Title, null, null, ['Close'], null, null, true, true, false, null, null);
        } else {
          $("#offcanvas-" + offCanvasWidget.Id).replaceWith(newOffCanvasWidgetHTMLjQuery);
        }
      } else {
        $('#offCanvasContainer').append(newOffCanvasWidgetHTMLjQuery);
  
        if (offCanvasWidget.OffCanvas == 3) {
          window.viewModel.offCanvasWindows["#offcanvas-" + offCanvasWidget.Id] = createKendoWindow("offcanvas-" + offCanvasWidget.Id, offCanvasWidget.Title, null, null, ['Close'], null, null, true, true, false, null, null);
        }
      }
  
      if (offCanvasWidget.OffCanvas !== 3) {
        $(newOffCanvasWidgetHTMLjQuery.find('.offcanvas-toggle')).on('click', function (e) {
          var selector = $(e.currentTarget).attr('data-target');
          var el = $(selector);
  
          if (el) {
            el.removeClass('in');
            return $('body').css({
              overflow: '',
              position: ''
            });
          }
        });
      }
  
      if (callback && typeof callback === 'function') callback();
      initNormalSorting();
      initDataWidgetSorting();
    }, '', '', '', '', function (error) {
      console.log(error);
    }, false);
  } // Initialise all Off Canvas sections
  
  function initAllOffCanvasSections() {
    var _this = this; // Initialise OffCanvas Layouts
  
  
    $.each($('.modal-center'), function (_idx, val) {
      var ocId = val.id;
      var currentOC = $(val);
      var ocDiv = $(".offcanvas-toggle[data-target=\"#" + ocId + "\"]");
      ocDiv.removeClass('offcanvas-toggle');
      ocDiv.addClass('in-modal-window');
      window.viewModel.offCanvasWindows["#" + ocId] = createKendoWindow(ocId, currentOC.data('modaltitle'), function () {}, function () {}, ['Close'], null, null, true, true, false, null, null);
      queryLayoutUIHelpers.kendoWindowsCreated.push(window.viewModel.offCanvasWindows["#" + ocId]);
    });
    $('[data-toggle="offcanvas"]').each(function (_idx, val) {
      if (window.viewModel.offCanvasWindows.hasOwnProperty($(val).data('target'))) {
        $(val).on('click', function (e) {
          window.viewModel.offCanvasWindows[$(e.currentTarget).data('target')].center().open();
        });
      } else if (!$(val).hasClass('in-modal-window')) {
        // Only if the off canvas initialised isn't a modal window
        var oc = new Offcanvas($(val));
      }
    });
    return $('.offcanvas-toggle').each(function (_idx, val) {
      $(_this).on('click', function (e) {
        if (!$(e.currentTarget).hasClass('js-offcanvas-has-events')) {
          var selector = $(e.currentTarget).attr('data-target');
          var el = $(selector);
  
          if (el) {
            // el.height('');
            el.removeClass('in');
            return $('body').css({
              overflow: '',
              position: ''
            });
          }
        }
      });
    });
  }
  // CONCATENATED MODULE: ./finaljs/modules/widgetBuilding.js
  
  
  
  
  
  
   // Helper function to create array of Tabs for Tab widgets
  
  function createTabsArray(TabNum, TabTitles, TabsJSON) {
    var tabsData; // TODO: need to check for duplicates on 'Tab' property
  
    if (TabsJSON && TabNum < TabsJSON.length) {
      tabsData = TabsJSON.slice(0, TabNum);
    } else if (TabsJSON && TabNum === TabsJSON.length) {
      tabsData = TabsJSON;
    } else {
      tabsData = TabsJSON || [];
  
      for (var i = tabsData.length; i < parseInt(TabNum); i++) {
        tabsData.push({
          Index: i,
          Title: TabTitles[i],
          Tab: TabTitles[i].replace(/[^A-Z0-9]/gi, ''),
          ResponsiveStyle: 0,
          Widgets: [],
          TypeName: 'Column'
        });
      }
    }
  
    for (var i = 0; i < parseInt(TabNum); i++) {
      tabsData[i].Title = TabTitles[i];
    }
  
    return tabsData;
  } // FInal setup and creation of Kendo Object for Layout Widget
  
  function setupFinalLayoutWidget(RawLayoutProps) {
    var WidgetName = RawLayoutProps.WidgetName,
        Title = RawLayoutProps.Title,
        TypeName = RawLayoutProps.TypeName,
        Collapsible = RawLayoutProps.Collapsible,
        DisplayStyle = RawLayoutProps.DisplayStyle,
        Border = RawLayoutProps.Border,
        TitleBackground = RawLayoutProps.TitleBackground,
        TitleForeground = RawLayoutProps.TitleForeground,
        Joined = RawLayoutProps.Joined,
        Striped = RawLayoutProps.Striped,
        FieldName = RawLayoutProps.FieldName,
        FieldPath = RawLayoutProps.FieldPath,
        CardTypeDetail = RawLayoutProps.CardTypeDetail,
        ParentFieldPath = RawLayoutProps.ParentFieldPath,
        CardBackground = RawLayoutProps.CardBackground,
        CardColor = RawLayoutProps.CardColor,
        ChartColor = RawLayoutProps.ChartColor,
        BackgroundColor = RawLayoutProps.BackgroundColor,
        Icon = RawLayoutProps.Icon,
        ChartTitle = RawLayoutProps.ChartTitle,
        ChartLegend = RawLayoutProps.ChartLegend,
        LineColor = RawLayoutProps.LineColor,
        HarmonyComponentId = RawLayoutProps.HarmonyComponentId,
        GridDataFieldName = RawLayoutProps.GridDataFieldName,
        GridListCaption = RawLayoutProps.GridListCaption,
        IsCollapsibleOpen = RawLayoutProps.IsCollapsibleOpen,
        Size = RawLayoutProps.Size,
        Compact = RawLayoutProps.Compact,
        RichTextFieldName = RawLayoutProps.RichTextFieldName,
        TabNum = RawLayoutProps.TabNum,
        TabTitles = RawLayoutProps.TabTitles,
        ColumnLayout = RawLayoutProps.ColumnLayout,
        DisplayOnly = RawLayoutProps.DisplayOnly;
    var ChartStacked = RawLayoutProps.ChartStacked,
        SubType = RawLayoutProps.SubType;
    var formColumnWidths = [ColumnLayout == "2colequal" || ColumnLayout == "3colleft" ? 1 : ColumnLayout == "2colright" || ColumnLayout == "3colequal" ? 3 : ColumnLayout == "2colleft" ? 2 : ColumnLayout == "1col" ? 0 : 6, ColumnLayout == "2colequal" || ColumnLayout == "3colmiddle" ? 1 : ColumnLayout == "2colleft" || ColumnLayout == "3colequal" ? 3 : ColumnLayout == "2colright" ? 2 : 6, ColumnLayout == "3colequal" ? 3 : ColumnLayout == "3colmiddle" || ColumnLayout == "3colleft" ? 6 : 1]; // Rob: I now generate a unique id and use it when creating models for later use.
  
    var widgetId = sysproInterop.generateUUID();
    var kendoLayoutWidget;
  
    switch (TypeName) {
      case 'LayoutWidget':
        {
          switch (WidgetName) {
            case 'row_1_col':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 0
                }));
                SubType = Joined; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            case 'row_2_col':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 4
                }));
                Rows.append(new columnModel({
                  Index: 1,
                  ResponsiveStyle: 4
                }));
                SubType = Joined; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            case 'row_3_col':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 5
                }));
                Rows.append(new columnModel({
                  Index: 1,
                  ResponsiveStyle: 5
                }));
                Rows.append(new columnModel({
                  Index: 2,
                  ResponsiveStyle: 5
                }));
                SubType = Joined; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            case 'row_4_col':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 6
                }));
                Rows.append(new columnModel({
                  Index: 1,
                  ResponsiveStyle: 6
                }));
                Rows.append(new columnModel({
                  Index: 2,
                  ResponsiveStyle: 6
                }));
                Rows.append(new columnModel({
                  Index: 3,
                  ResponsiveStyle: 6
                }));
                SubType = Joined; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            case 'row_4_block':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 4
                }));
                Rows.append(new columnModel({
                  Index: 1,
                  ResponsiveStyle: 4
                }));
                var Rows2 = new rowModel({
                  Index: 1
                });
                Rows2.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 4
                }));
                Rows2.append(new columnModel({
                  Index: 1,
                  ResponsiveStyle: 4
                }));
                SubType = Joined; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size
                });
                kendoLayoutWidget.append(Rows);
                kendoLayoutWidget.append(Rows2);
                break;
              }
  
            case 'row_6_block':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 5
                }));
                Rows.append(new columnModel({
                  Index: 1,
                  ResponsiveStyle: 5
                }));
                Rows.append(new columnModel({
                  Index: 2,
                  ResponsiveStyle: 5
                }));
                var Rows2 = new rowModel({
                  Index: 1
                });
                Rows2.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 5
                }));
                Rows2.append(new columnModel({
                  Index: 1,
                  ResponsiveStyle: 5
                }));
                Rows2.append(new columnModel({
                  Index: 2,
                  ResponsiveStyle: 5
                }));
                SubType = Joined; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size
                });
                kendoLayoutWidget.append(Rows);
                kendoLayoutWidget.append(Rows2);
                break;
              }
  
            case 'row_list_view':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 0
                }));
                SubType = Striped && Compact ? 'CompactStriped' : Striped && !Compact ? 'Striped' : Compact && !Striped ? 'Compact' : null; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            case 'row_tab_widget':
              {
                var tabsData = createTabsArray(TabNum, TabTitles, null);
                var Tabs = new kendo.data.HierarchicalDataSource({
                  data: tabsData,
                  schema: {
                    model: parentColumnsModel
                  },
                  error: function error(e) {
                    console.log('ERROR!', e);
                  }
                }); // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size,
                  Tabs: Tabs
                });
                kendoLayoutWidget.Tabs.read();
                break;
              }
  
            case 'row_link_list':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 0
                }));
                SubType = Compact ? 'Compact' : null; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            case 'row_carousel':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 0
                }));
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            case 'tiles_section':
              {
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  BackgroundColor: BackgroundColor,
                  Icon: Icon,
                  Height: Size
                });
                var Rows = new rowModel({
                  Index: 0
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            case '1col_form_widget':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 0,
                  IsDisplayOnly: DisplayOnly[0]
                }));
                SubType = Joined; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size,
                  ColumnLayout: ColumnLayout
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            case 'standard_form_widget':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: 0,
                  IsDisplayOnly: DisplayOnly && DisplayOnly.length ? DisplayOnly[0] : false
                }));
                SubType = Joined; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: '1col_form_widget',
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size,
                  ColumnLayout: ColumnLayout
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            case '2col_form_widget':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: formColumnWidths[0],
                  IsDisplayOnly: DisplayOnly[0]
                }));
                Rows.append(new columnModel({
                  Index: 1,
                  ResponsiveStyle: formColumnWidths[1],
                  IsDisplayOnly: DisplayOnly[1]
                }));
                SubType = Joined; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size,
                  ColumnLayout: ColumnLayout
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            case '3col_form_widget':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                Rows.append(new columnModel({
                  Index: 0,
                  ResponsiveStyle: formColumnWidths[0],
                  IsDisplayOnly: DisplayOnly[0]
                }));
                Rows.append(new columnModel({
                  Index: 1,
                  ResponsiveStyle: formColumnWidths[1],
                  IsDisplayOnly: DisplayOnly[1]
                }));
                Rows.append(new columnModel({
                  Index: 2,
                  ResponsiveStyle: formColumnWidths[2],
                  IsDisplayOnly: DisplayOnly[2]
                }));
                SubType = Joined; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size,
                  ColumnLayout: ColumnLayout
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            case 'custom_text':
              {
                var Rows = new rowModel({
                  Index: 0
                });
                SubType = Joined; // Rob: Set the Id in the constructor.
  
                kendoLayoutWidget = new layoutWidgetModel({
                  Id: widgetId,
                  Title: Title,
                  TypeName: TypeName,
                  SubType: SubType,
                  WidgetName: WidgetName,
                  Collapsible: Collapsible,
                  IsCollapsibleOpen: IsCollapsibleOpen,
                  DisplayStyle: DisplayStyle,
                  Border: Border,
                  TitleBackground: TitleBackground,
                  TitleForeground: TitleForeground,
                  Icon: Icon,
                  Height: Size,
                  ColumnLayout: ColumnLayout
                });
                kendoLayoutWidget.append(Rows);
                break;
              }
  
            default:
              break;
          }
  
          break;
        }
  
      case 'Sparkline':
        {
          var Rows = new rowModel({
            Index: 0
          });
          Rows.append(new columnModel({
            Index: 0,
            ResponsiveStyle: 0
          })); // Rob: Set the Id in the constructor.
  
          ChartStacked = WidgetName === 'column_chart_widget' || WidgetName === 'line_chart_widget' ? ChartStacked : false;
          kendoLayoutWidget = new layoutWidgetModel({
            Id: widgetId,
            Title: Title,
            TypeName: TypeName,
            SubType: SubType,
            WidgetName: WidgetName,
            Collapsible: Collapsible,
            IsCollapsibleOpen: IsCollapsibleOpen,
            DisplayStyle: DisplayStyle,
            Border: Border,
            TitleBackground: TitleBackground,
            TitleForeground: TitleForeground,
            FieldName: FieldName,
            FieldPath: FieldPath,
            Details: {
              Color: ChartColor
            },
            Icon: Icon,
            ChartTitle: ChartTitle,
            ChartLegend: ChartLegend,
            Stacked: ChartStacked,
            Height: Size
          });
          kendoLayoutWidget.append(Rows);
          break;
        }
  
      case 'Card':
        {
          var Rows = []; // Rob: Set the Id in the constructor.
  
          kendoLayoutWidget = new layoutWidgetModel({
            Id: widgetId,
            Title: Title,
            TypeName: TypeName,
            SubType: SubType,
            WidgetName: WidgetName,
            Collapsible: Collapsible,
            IsCollapsibleOpen: IsCollapsibleOpen,
            DisplayStyle: DisplayStyle,
            Border: Border,
            TitleBackground: TitleBackground,
            TitleForeground: TitleForeground,
            CardTypeDetail: CardTypeDetail,
            ParentFieldPath: ParentFieldPath,
            BackgroundColor: CardBackground,
            Details: {
              Color: CardColor
            },
            Icon: Icon,
            Height: Size
          });
          kendoLayoutWidget.append(Rows);
          break;
        }
  
      case 'HarmonyWidget':
        {
          var Rows = []; // Rob: Set the Id in the constructor.
  
          kendoLayoutWidget = new layoutWidgetModel({
            Id: widgetId,
            Title: Title,
            TypeName: TypeName,
            SubType: SubType,
            WidgetName: WidgetName,
            Collapsible: Collapsible,
            IsCollapsibleOpen: IsCollapsibleOpen,
            DisplayStyle: DisplayStyle,
            Border: Border,
            TitleBackground: TitleBackground,
            TitleForeground: TitleForeground,
            CardTypeDetail: CardTypeDetail,
            ParentFieldPath: ParentFieldPath,
            BackgroundColor: CardBackground,
            Details: {
              Color: CardColor
            },
            Icon: Icon,
            ComponentId: HarmonyComponentId,
            Height: Size
          });
          kendoLayoutWidget.append(Rows);
          break;
        }
  
      case 'GridList':
        {
          var Rows = []; // Rob: Set the Id in the constructor.
  
          kendoLayoutWidget = new layoutWidgetModel({
            Id: widgetId,
            Title: Title,
            TypeName: TypeName,
            SubType: SubType,
            WidgetName: WidgetName,
            Collapsible: Collapsible,
            IsCollapsibleOpen: IsCollapsibleOpen,
            DisplayStyle: DisplayStyle,
            Border: Border,
            TitleBackground: TitleBackground,
            TitleForeground: TitleForeground,
            CardTypeDetail: CardTypeDetail,
            ParentFieldPath: ParentFieldPath,
            BackgroundColor: CardBackground,
            Details: {
              Color: CardColor
            },
            Icon: Icon,
            ComponentId: HarmonyComponentId,
            GridDataFieldName: GridDataFieldName,
            Caption: GridListCaption,
            Height: Size
          });
          kendoLayoutWidget.append(Rows);
          break;
        }
  
      case 'TreeList':
        {
          var Rows = []; // Rob: Set the Id in the constructor.
  
          kendoLayoutWidget = new layoutWidgetModel({
            Id: widgetId,
            Title: Title,
            TypeName: TypeName,
            SubType: SubType,
            WidgetName: WidgetName,
            Collapsible: Collapsible,
            IsCollapsibleOpen: IsCollapsibleOpen,
            DisplayStyle: DisplayStyle,
            Border: Border,
            TitleBackground: TitleBackground,
            TitleForeground: TitleForeground,
            CardTypeDetail: CardTypeDetail,
            ParentFieldPath: ParentFieldPath,
            BackgroundColor: CardBackground,
            Details: {
              Color: CardColor
            },
            Icon: Icon,
            ComponentId: HarmonyComponentId,
            GridDataFieldName: GridDataFieldName,
            Caption: GridListCaption,
            Height: Size
          });
          kendoLayoutWidget.append(Rows);
          break;
        }
  
      case 'TreeView':
        {
          var Rows = []; // Rob: Set the Id in the constructor.
  
          kendoLayoutWidget = new layoutWidgetModel({
            Id: widgetId,
            Title: Title,
            TypeName: TypeName,
            SubType: SubType,
            WidgetName: WidgetName,
            Collapsible: Collapsible,
            IsCollapsibleOpen: IsCollapsibleOpen,
            DisplayStyle: DisplayStyle,
            Border: Border,
            TitleBackground: TitleBackground,
            TitleForeground: TitleForeground,
            CardTypeDetail: CardTypeDetail,
            ParentFieldPath: ParentFieldPath,
            BackgroundColor: CardBackground,
            Details: {
              Color: CardColor
            },
            Icon: Icon,
            ComponentId: HarmonyComponentId,
            GridDataFieldName: GridDataFieldName,
            Caption: GridListCaption,
            Height: Size
          });
          kendoLayoutWidget.append(Rows);
          break;
        }
  
      case 'RichTextWidget':
        {
          var Rows = []; // Rob: Set the Id in the constructor.
  
          kendoLayoutWidget = new layoutWidgetModel({
            Id: widgetId,
            Title: Title,
            TypeName: TypeName,
            SubType: SubType,
            WidgetName: 'Builder_card',
            Collapsible: Collapsible,
            IsCollapsibleOpen: IsCollapsibleOpen,
            DisplayStyle: DisplayStyle,
            Border: Border,
            TitleBackground: TitleBackground,
            TitleForeground: TitleForeground,
            CardTypeDetail: CardTypeDetail,
            ParentFieldPath: ParentFieldPath,
            BackgroundColor: CardBackground,
            Details: {
              Color: CardColor
            },
            Icon: Icon,
            ComponentId: HarmonyComponentId,
            RichTextFieldName: RichTextFieldName,
            Caption: GridListCaption,
            Height: Size
          });
          kendoLayoutWidget.append(Rows);
          break;
        }
  
      case 'StaticElement':
        {
          var Rows = []; // Rob: Set the Id in the constructor.
  
          kendoLayoutWidget = new layoutWidgetModel({
            Id: widgetId,
            Title: Title,
            TypeName: TypeName,
            SubType: SubType,
            WidgetName: WidgetName,
            DisplayStyle: DisplayStyle,
            Details: {
              Color: LineColor
            },
            Color: LineColor,
            Height: Size
          });
          kendoLayoutWidget.append(Rows);
          break;
        }
  
      default:
        break;
    }
  
    return kendoLayoutWidget;
  } // Setup Layout Widget helper function
  
  function setupLayoutWidget(currentRowWindow) {
    var rowSectionType = window.viewModel.selected && window.viewModel.selected.WidgetName ? window.viewModel.selected.WidgetName : $(currentRowWindow + ".k-window-content").find("input[name='row_options']:checked");
    var WidgetName = window.viewModel.selected && window.viewModel.selected.WidgetName ? window.viewModel.selected.WidgetName : $(rowSectionType).val();
    var TypeName = window.viewModel.selected && window.viewModel.selected.TypeName ? window.viewModel.selected.TypeName : $(rowSectionType).data('layout-widget-type');
    var SubType = window.viewModel.selected && window.viewModel.selected.SubType ? window.viewModel.selected.SubType : $(rowSectionType).data('layout-widget-subtype');
    var CardTypeDetail = window.viewModel.selected && window.viewModel.selected.CardTypeDetail ? window.viewModel.selected.CardTypeDetail : $(rowSectionType).data('card-type-detail');
    var HarmonyComponentId = window.viewModel.selected && window.viewModel.selected.ComponentId ? window.viewModel.selected.ComponentId : $(rowSectionType).data('component-id');
    var GridDataFieldName = window.viewModel.selected && window.viewModel.selected.GridDataFieldName ? window.viewModel.selected.GridDataFieldName : $(rowSectionType).data('gridlist-field-name');
    var GridListCaption = window.viewModel.selected && window.viewModel.selected.Caption ? window.viewModel.selected.Caption : $(rowSectionType).data('caption');
    var ParentFieldPath = window.viewModel.selected && window.viewModel.selected.ParentFieldPath ? window.viewModel.selected.ParentFieldPath : $(rowSectionType).data('parent-field-path');
    var DisplayStyle = window.viewModel.selected && window.viewModel.selected.DisplayStyle ? window.viewModel.selected.DisplayStyle : $(rowSectionType).data('layout-widget-displaystyle');
    var RichTextFieldName = window.viewModel.selected && window.viewModel.selected.RichTextFieldName ? window.viewModel.selected.RichTextFieldName : $(rowSectionType).data('richtext-field-name');
    var Title = window.viewModel.selected && window.viewModel.selected.Title ? window.viewModel.selected.Title : $(currentRowWindow + " .layout_widget_title").val();
    var TabNum = $(currentRowWindow + " input[name=\"tab_widget_number\"]").val();
    var Striped;
    var Compact;
    var Joined = document.querySelector(currentRowWindow + " input[name=\"blocks_joined\"]:checked") !== null ? document.querySelector(currentRowWindow + " input[name=\"blocks_joined\"]:checked").value : null;
    var Border = document.querySelector(currentRowWindow + " input[name=\"border_options\"]:checked") !== null ? parseInt(document.querySelector(currentRowWindow + " input[name=\"border_options\"]:checked").value) : 0;
    var ColumnLayout = document.querySelector(currentRowWindow + " input[name=\"column_layout\"]:checked") !== null ? document.querySelector(currentRowWindow + " input[name=\"column_layout\"]:checked").value : '1col';
    var DisplayOnly = [document.querySelector(currentRowWindow + " input[name=\"display_form_col_1\"]:checked") !== null, document.querySelector(currentRowWindow + " input[name=\"display_form_col_2\"]:checked") !== null, document.querySelector(currentRowWindow + " input[name=\"display_form_col_3\"]:checked") !== null];
    var Size = document.querySelector(currentRowWindow + " input[name=\"size_options\"]:checked") !== null ? parseInt(document.querySelector(currentRowWindow + " input[name=\"size_options\"]:checked").value) : 0;
    var TitleForeground = document.querySelector(currentRowWindow + " input[name=\"widget_title_text_colour\"]:checked") !== null ? parseInt(document.querySelector(currentRowWindow + " input[name=\"widget_title_text_colour\"]:checked").value) : 8;
    var TitleBackground = document.querySelector(currentRowWindow + " input[name=\"widget_title_background_colour\"]:checked") !== null ? parseInt(document.querySelector(currentRowWindow + " input[name=\"widget_title_background_colour\"]:checked").value) : 9;
    var BackgroundColor = document.querySelector(currentRowWindow + " input[name=\"tile_border_colour\"]:checked") !== null ? parseInt(document.querySelector(currentRowWindow + " input[name=\"tile_border_colour\"]:checked").value) : 9;
    var Icon = document.querySelector(currentRowWindow + " .icon-field-container .icon-option.active") !== null ? $(currentRowWindow + " .icon-field-container .icon-option.active").data('icon-name') : null;
    var CardBackground = document.querySelector(currentRowWindow + " input[name=\"card_colour\"]:checked") !== null ? parseInt(document.querySelector(currentRowWindow + " input[name=\"card_colour\"]:checked").value) : 0;
    var CardColor = CardBackground == 0 || CardBackground == 2 || CardBackground == 3 || CardBackground == 4 || CardBackground == 8 || CardBackground == 7 ? 9 : 8;
    var ChartColor = document.querySelector(currentRowWindow + " input[name=\"chart_colour\"]:checked") !== null ? parseInt(document.querySelector(currentRowWindow + " input[name=\"chart_colour\"]:checked").value) : 0;
  
    if (DisplayStyle === 3 || DisplayStyle === 1) {
      Compact = document.querySelector(currentRowWindow + " input[name=\"linklist_compact\"]:checked") !== null ? document.querySelector(currentRowWindow + " input[name=\"linklist_compact\"]:checked").value : null;
      Striped = document.querySelector(currentRowWindow + " input[name=\"listview_striped_rows\"]:checked") !== null ? document.querySelector(currentRowWindow + " input[name=\"listview_striped_rows\"]:checked").value : null;
    }
  
    var FieldName = document.querySelector(currentRowWindow + " #chart-fields-list .list-group-item.active") !== null ? $(currentRowWindow + " #chart-fields-list .list-group-item.active").data('field-path') : null;
    var FieldPath = document.querySelector(currentRowWindow + " #chart-fields-list .list-group-item.active") !== null ? $(currentRowWindow + " #chart-fields-list .list-group-item.active").data('field-path') : null;
    var TabTitles = [];
    $(currentRowWindow + " input.tab-title-input").each(function (idx, titleinput) {
      TabTitles[idx] = $(titleinput).val();
    });
    var ChartTitle = $(currentRowWindow + " [name=\"chart_title\"]").prop('checked');
    var ChartLegend = $(currentRowWindow + " [name=\"chart_legend\"]").prop('checked');
    var ChartStacked = $(currentRowWindow + " [name=\"chart_stacked\"]").prop('checked');
    var Collapsible = $(currentRowWindow + " [name=\"widget_collapsible\"]").prop('checked');
    var IsCollapsibleOpen = $(currentRowWindow + " [name=\"default_open\"]").prop('checked');
    var LineColor = $(currentRowWindow + " input[name=\"separator_colour\"]:checked").val();
    var kendoLayoutWidget = setupFinalLayoutWidget({
      WidgetName: WidgetName,
      Title: Title,
      TypeName: TypeName,
      SubType: SubType,
      Collapsible: Collapsible,
      DisplayStyle: DisplayStyle,
      Border: Border,
      TitleBackground: TitleBackground,
      TitleForeground: TitleForeground,
      Joined: Joined,
      Striped: Striped,
      FieldName: FieldName,
      FieldPath: FieldPath,
      CardTypeDetail: CardTypeDetail,
      ParentFieldPath: ParentFieldPath,
      CardBackground: CardBackground,
      CardColor: CardColor,
      ChartColor: ChartColor,
      BackgroundColor: BackgroundColor,
      Icon: Icon,
      ChartTitle: ChartTitle,
      ChartLegend: ChartLegend,
      LineColor: LineColor,
      HarmonyComponentId: HarmonyComponentId,
      GridDataFieldName: GridDataFieldName,
      GridListCaption: GridListCaption,
      IsCollapsibleOpen: IsCollapsibleOpen,
      Size: Size,
      Compact: Compact,
      RichTextFieldName: RichTextFieldName,
      ChartStacked: ChartStacked,
      TabNum: TabNum,
      TabTitles: TabTitles,
      ColumnLayout: ColumnLayout,
      DisplayOnly: DisplayOnly
    }); // Rob: Use the Id instead of the uid.
  
    return kendoLayoutWidget;
  } // Initialising some JS after Layout Widgets added
  
  function finishAddLayoutWidget() {
    $('.layout-widget-options .col-xs-3:last-child i, .layout-widget-options .col-xs-6:last-child i').popover({
      html: true,
      placement: 'left',
      trigger: 'manual',
      animation: false,
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
      content: '<ul class="nav nav-pills"><li><a class="edit-row-section"><i class="material-icons text-primary">edit</i></a></li><li><a class="remove-row-section"><i class="material-icons text-danger">delete</i></a></li></ul>'
    }).off().on('click', function (e) {
      var _this = e.currentTarget;
      $(e.currentTarget).popover('show');
      $(e.currentTarget).siblings('.popover').on('mouseleave', function () {
        $(_this).popover('hide');
      });
    });
    $('.options-popover').off().on('click', function (e) {
      $(e.currentTarget).parents('.sys-carousel').popover({
        html: true,
        placement: 'left',
        trigger: 'hover',
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
        content: '<ul class="nav nav-pills"><li><a href="#"><i class="material-icons text-primary">edit</i></a></li><li><a href="#"><i class="material-icons text-danger">delete</i></a></li></ul>'
      });
    });
    $('.initial-target').each(function (_idx, elem) {
      $(elem).toggle(!$(elem).siblings('.draggable-row-section').length);
    }); // A few things to initialise the sortablitiy and draggability of the newly added elements - might need to move these after changing to Rob's convertor
  
    sizeTiles();
    initNormalSorting();
    initDataWidgetSorting();
  } // Initialise Edit and remove functions on data widgets
  
  function initEditRemoveDataWidget() {
    $('.panel.sys-widget:not(.sys-carousel) .panel.sys-widget .data-widget-options .col-xs-6:last-child i, .panel.sys-widget:not(.sys-carousel) .table td:last-child .data-widget-options i, .panel.sys-widget:not(.sys-carousel) .list-group .data-widget-options .col-xs-6:last-child i, .tile-widget .tile .data-widget-options .col-xs-6:last-child i, .form-group .data-widget-options .col-xs-6:last-child i').popover('destroy');
    $('.panel.sys-widget:not(.sys-carousel) .panel.sys-widget .data-widget-options .col-xs-6:last-child i, .panel.sys-widget:not(.sys-carousel) .table td:last-child .data-widget-options i, .panel.sys-widget:not(.sys-carousel) .list-group .data-widget-options .col-xs-6:last-child i, .tile-widget .tile .data-widget-options .col-xs-6:last-child i, .form-group .data-widget-options .col-xs-6:last-child i').popover({
      html: true,
      placement: 'left',
      trigger: 'manual',
      animation: false,
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
      content: '<ul class="nav nav-pills"><li><a class="edit-section"><i class="material-icons text-primary">edit</i></a></li><li><a class="remove-section"><i class="material-icons text-danger">delete</i></a></li></ul>'
    }).off().on('click', function (e) {
      var _this = e.currentTarget;
      $(e.currentTarget).popover('show');
      $(e.currentTarget).siblings('.popover').on('mouseleave', function () {
        $(_this).popover('hide');
      });
    }).on('mouseleave', function (e) {
      var _this = e.currentTarget;
  
      var hidePop = function hidePop() {
        setTimeout(function () {
          if (!$('.popover:hover').length) {
            $(_this).popover('hide');
          } else {
            hidePop();
          }
        }, 50);
      };
  
      hidePop();
    });
    $('.panel.sys-widget.sys-carousel .panel.sys-widget .data-widget-options .col-xs-6:last-child i').popover('destroy');
    $('.panel.sys-widget.sys-carousel .panel.sys-widget .data-widget-options .col-xs-6:last-child i').popover({
      html: true,
      placement: 'left',
      trigger: 'manual',
      animation: false,
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
      content: '<ul class="nav nav-pills"><li><a class="edit-section"><i class="material-icons text-primary">edit</i></a></li><li><a class="remove-section"><i class="material-icons text-danger">delete</i></a></li></ul>'
    }).off().on('click', function (e) {
      var _this = e.currentTarget;
      $(e.currentTarget).parents('.carousel-inner, .sys-carousel .panel-body').css('overflow', 'visible');
      $(e.currentTarget).popover('show');
      $(e.currentTarget).siblings('.popover').on('mouseleave', function () {
        $(_this).popover('hide');
        $(e.currentTarget).parents('.carousel-inner, .sys-carousel .panel-body').css('overflow', 'hidden');
      });
    }).on('mouseleave', function (e) {
      var _this = e.currentTarget;
  
      var hidePop = function hidePop() {
        setTimeout(function () {
          if (!$('.popover:hover').length) {
            $(_this).popover('hide');
            $(e.currentTarget).parents('.carousel-inner, .sys-carousel .panel-body').css('overflow', 'hidden');
          } else {
            hidePop();
          }
        }, 50);
      };
  
      hidePop();
    });
  } // Insert Layout Widget
  
  function insertLayoutWidget(currentRowWindow, widgetObject, context) {
    var CleanWidget = widgetObject.toJSON();
    CleanWidget.Id = widgetObject.Id;
  
    if (context.parentTabWidget) {
      context.parentTabWidget.Tabs.at(context.tab_column_num).append(widgetObject);
      var VBdata = context.currentParentDataSource.data().toJSON();
      context.currentParentDataSource.data(VBdata);
    } else {
      var VBdata = context.currentDataSource.data().toJSON();
      VBdata[context.column_num].Widgets.unshift(CleanWidget);
      context.currentDataSource.data(VBdata);
    }
  
    sysproInterop.getHtmlFromModel('Widget', stringifyJSONObject(widgetObject.Id, context.currentDataSource), function (result) {
      var newWidgetHTMLjQuery = $($.trim(result));
  
      if (widgetObject.DisplayStyle === 4) {
        newWidgetHTMLjQuery.find('.data-section').removeClass('data-section');
        newWidgetHTMLjQuery.children('.col-sm-12').addClass('tile-widget-wrapper');
        newWidgetHTMLjQuery.find('.panel-body').first().prepend('<div class="tile-loading-cover"><span class="spinner"></span></div>');
      }
  
      if (widgetObject.DisplayStyle === 9) {
        newWidgetHTMLjQuery.addClass('tab-layout-widget');
        newWidgetHTMLjQuery.find('.sortable-list').each(function (idx, elem) {
          $(elem).removeClass('sortable-list').addClass('tab-sortable-list');
        });
        newWidgetHTMLjQuery.find('.main-column').each(function (idx, elem) {
          $(elem).addClass('tab-main-column');
        });
      }
  
      if (context.parentTabWidgetPresent) {
        var column = $("[data-guid=\"" + context.layoutWidgetGuid + "\"").find('.tab-pane').eq(context.tab_column_num).find('.main-column');
        column.children('.tab-sortable-list').append(newWidgetHTMLjQuery);
      } else {
        var column = context.canvas_id !== null ? $("#offcanvas-" + context.canvas_id + " div[data-column=\"" + context.column_num + "\"]") : $("#main-container div[data-column=\"" + context.column_num + "\"]:not(.tab-main-column)");
        column.children('.sortable-list').prepend(newWidgetHTMLjQuery);
      }
  
      $(currentRowWindow + " .layout-radio-options .btn-radio").each(function (_idx, elem) {
        $(elem).removeClass('active');
      });
      $(currentRowWindow + " span[href='#empty-tab']").tab('show');
  
      if (widgetObject.Tabs) {
        createInvisibleTreeView("TABS_" + widgetObject.Id, widgetObject.Tabs);
      }
  
      kendo.bind(newWidgetHTMLjQuery, window.viewModel);
      finishAddLayoutWidget();
      initEditRemoveDataWidget();
    }, '', '', '', '', function (error) {
      console.log(error);
    }, false);
  } // Helper function to
  
  function setUpDataWidget(parentWindow) {
    var TextColour = document.querySelector(parentWindow + " input[name=\"data_text_colour\"]:checked") !== null ? parseInt(document.querySelector(parentWindow + " input[name=\"data_text_colour\"]:checked").value) : 8;
    var TextSize = document.querySelector(parentWindow + " input[name=\"data_text_size\"]:checked") !== null ? parseInt(document.querySelector(parentWindow + " input[name=\"data_text_size\"]:checked").value) : 1;
    var TextWeight = document.querySelector(parentWindow + " input[name=\"data_text_weight\"]:checked") !== null ? parseInt(document.querySelector(parentWindow + " input[name=\"data_text_weight\"]:checked").value) : 1;
    var TextAlign = document.querySelector(parentWindow + " input[name=\"data_text_alignment\"]:checked") !== null ? parseInt(document.querySelector(parentWindow + " input[name=\"data_text_alignment\"]:checked").value) : 0;
    var DataBackground = document.querySelector(parentWindow + " input[name=\"link_as_button\"]:checked") !== null ? parseInt(document.querySelector(parentWindow + " input[name=\"link_button_colour\"]:checked").value) : document.querySelector(parentWindow + " input[name=\"data_background_colour\"]:checked") !== null ? parseInt(document.querySelector(parentWindow + " input[name=\"data_background_colour\"]:checked").value) : 9;
    var IconOption = document.querySelector(parentWindow + " .icon-field-container .icon-option.active") !== null ? $(parentWindow + " .icon-field-container .icon-option.active").data('icon-name') : null;
    var IconColour = document.querySelector(parentWindow + " input[name=\"icon_colour\"]:checked") !== null ? parseInt(document.querySelector(parentWindow + " input[name=\"icon_colour\"]:checked").value) : 0;
    var IconAlign = document.querySelector(parentWindow + " input[name=\"icon_alignment\"]:checked") !== null ? parseInt(document.querySelector(parentWindow + " input[name=\"icon_alignment\"]:checked").value) : 0;
    var IconSize = document.querySelector(parentWindow + " input[name=\"icon_size\"]:checked") !== null ? parseInt(document.querySelector(parentWindow + " input[name=\"icon_size\"]:checked").value) : 1;
    var IsMandatory = document.querySelector(parentWindow + " input[name=\"isMandatory\"]:checked") !== null;
    var SubType = document.querySelector(parentWindow + " input[name=\"link_as_button\"]:checked") !== null ? 'Button' : '';
    var IconTooltip = $(parentWindow + " #icon_tooltip").val();
    var Title = $(parentWindow + " #linklist_link_text").val();
    var dataWidgetClone = $(parentWindow + " .fields-wrapper .list-group-item.active.field-name").clone();
    dataWidgetClone.find('i').remove();
    dataWidgetClone.find('.quickAddEntryField').remove();
    var FieldName = dataWidgetClone.text();
    var FieldPath = dataWidgetClone.data('field-path');
    var HasSmartTag = dataWidgetClone.data('smart-tag');
    var DataType = dataWidgetClone.data('data-type');
    var KeyField = dataWidgetClone.data('key-field');
    var EntryType = dataWidgetClone.data('entry-type');
    var TypeName = dataWidgetClone.data('type-name');
    var KeyAction = dataWidgetClone.data('key-action');
    var Caption = $(parentWindow + " #data_show_caption").prop('checked');
    var offCanvasWidget;
    var OffCanvasLayoutId;
  
    if (TypeName === 'ButtonWidget') {
      var offCanvasType = parseInt(document.querySelector('#dataWindow input[name="data-window-off-canvas-type"]:checked').value);
      var columnLayout = document.querySelector('#dataWindow input[name="data-window-offcanvas-column-layout"]:checked').value;
      OffCanvasLayoutId = sysproInterop.generateUUID();
      var offCanvasTitle = $('#dataWindow #off_canvas_title_data_window').val();
      SubType = document.querySelector('#dataWindow input[name="offcanvas-text-options"]:checked').value;
      var Toolbar = document.querySelector('#dataWindow input[name="data-window-offcanvas_toolbar_option"]:checked') ? true : null;
      offCanvasWidget = setupOffCanvasSection(OffCanvasLayoutId, offCanvasTitle, offCanvasType, Toolbar, columnLayout);
    } else if (TypeName === 'LinkWidget') {
      SubType = $('#dataWindow input[name="link_as_button"]').is(':checked') ? 'Button' : 'Link';
    }
  
    if (FieldPath === "freeTextDataField") {
      SubType = "freeTextDataField";
    } // Rob: Generate a Unique GUID for the Id and set it so we don't have to use the kendo uid because we don't have it yet.
  
  
    var KendoDataWidget = new dataWidgetModel({
      Id: sysproInterop.generateUUID(),
      Title: Title,
      FieldName: FieldName,
      FieldPath: FieldPath,
      HasSmartTag: HasSmartTag,
      DataType: DataType,
      KeyField: KeyField,
      KeyAction: KeyAction,
      TypeName: TypeName,
      SubType: SubType,
      BackgroundColor: DataBackground,
      Caption: {
        Color: 8,
        Size: 0,
        Alignment: TextAlign,
        Visibility: Caption
      },
      Value: {
        Color: TextColour,
        Size: TextSize,
        Alignment: TextAlign,
        Weight: TextWeight
      },
      Icon: {
        Name: IconOption,
        Color: IconColour,
        Size: IconSize,
        Alignment: IconAlign,
        Tooltip: IconTooltip
      },
      EntryType: EntryType,
      IsMandatory: IsMandatory,
      OffCanvasLayoutId: OffCanvasLayoutId
    }); // Rob: Use the ID instead of the uid.
  
    return [KendoDataWidget, offCanvasWidget];
  } // Helper function to insert new Kendo Data Widget
  
  function insertDataWidget(widgetObject, context, section, quickAddIndex, offCanvasWidget, callback) {
    var carouselRowNumber;
    var hasChildren; // Rob: Now always do a get instead of getByUid so we can use our own Id.
  
    if (context.targetLayoutWidget.DisplayStyle === 0) {
      context.targetLayoutWidget.children.at(context.row_num).children.at(context.section_num).append(widgetObject);
    } else if (context.targetLayoutWidget.DisplayStyle === 1 || context.targetLayoutWidget.DisplayStyle === 3) {
      // Check if this data widget coming in to a listview is coming in from a quick add drag, in which case we need to inert it at the right index, rather than just adding it to the end of the 'list'
      hasChildren = context.targetLayoutWidget.children.at(0).children.at(0).hasChildren;
  
      if (quickAddIndex !== null && hasChildren) {
        context.targetLayoutWidget.children.at(0).children.at(0).children.insert(quickAddIndex, widgetObject);
      } else {
        context.targetLayoutWidget.children.at(0).children.at(0).append(widgetObject);
      }
    } else if (context.targetLayoutWidget.DisplayStyle === 2) {
      var initialNumRowsInCarousel = context.targetLayoutWidget.Rows.length;
      var targetParentWidgetJSON = context.targetLayoutWidget.toJSON();
  
      if (targetParentWidgetJSON.Rows[0].Columns[0].hasOwnProperty('Widgets')) {
        var Row = new rowModel({
          Index: initialNumRowsInCarousel
        });
        Row.append(new columnModel({
          Index: 0,
          ResponsiveStyle: 0
        }));
        context.targetLayoutWidget.append(Row);
        context.targetLayoutWidget.children.at(initialNumRowsInCarousel).children.at(0).append(widgetObject);
        carouselRowNumber = initialNumRowsInCarousel + 1;
      } else {
        carouselRowNumber = 1;
        context.targetLayoutWidget.children.at(0).children.at(0).append(widgetObject);
      }
    } else if (context.targetLayoutWidget.DisplayStyle === 5) {
      if (context.targetLayoutWidget.Rows && context.targetLayoutWidget.Rows.length && context.targetLayoutWidget.Rows[0].Columns && context.targetLayoutWidget.Rows[0].Columns.length && context.targetLayoutWidget.Rows[0].Columns[context.section_num].IsDisplayOnly) {
        widgetObject.SubType = widgetObject.SubType.length > 0 ? "Display-" + widgetObject.SubType : 'Display';
      }
  
      context.targetLayoutWidget.children.at(0).children.at(context.section_num).append(widgetObject);
    }
  
    sysproInterop.getHtmlFromModel('Widget', stringifyJSONObject(widgetObject.Id, context.currentDataSource), function (result) {
      var newDataWidgetHTMLjQuery = $($.trim(result));
  
      if (context.targetLayoutWidget.DisplayStyle === 0) {
        if (section.find('.add-data-widget')) {
          section.find('.add-data-widget').hide();
        }
  
        section.append(newDataWidgetHTMLjQuery);
      } else if (context.targetLayoutWidget.DisplayStyle === 1) {
        if (quickAddIndex !== null && hasChildren) {
          newDataWidgetHTMLjQuery.insertAfter(section.find("tr:nth-child(" + quickAddIndex + ")"));
        } else {
          section.append(newDataWidgetHTMLjQuery);
        }
      } else if (context.targetLayoutWidget.DisplayStyle === 2) {
        if (section.find('.add-data-widget')) {
          section.find('.add-data-widget').remove();
        }
  
        section.append(newDataWidgetHTMLjQuery);
        section.parents('.carousel-inner').append("<div class=\"item\"><div class=\"panel-body sys-bg-white text-left\"><div class=\"row \" data-row=\"" + carouselRowNumber + "\"><div class=\"col-xs-12\" data-section=\"0\"><div class=\"panel sys-widget sys-box-shadow-off sys-mg-off  add-data-widget\"><div class=\"panel-body text-center sys-fg-primary\"><a class=\"pull-left text-center add-data-section\" href=\"#\"><i class=\"material-icons\">note_add</i></a></div></div></div></div></div></div>");
        initEditRemoveDataWidget();
      } else if (context.targetLayoutWidget.DisplayStyle === 3) {
        if (quickAddIndex !== null && hasChildren) {
          newDataWidgetHTMLjQuery.insertAfter(section.find("a:nth-child(" + quickAddIndex + ")"));
        } else {
          section.append(newDataWidgetHTMLjQuery);
        }
      } else if (context.targetLayoutWidget.DisplayStyle === 5) {
        if (!newDataWidgetHTMLjQuery.find('.always-show').text().trim().length) {
          newDataWidgetHTMLjQuery.find('.always-show').removeClass('always-show');
        }
  
        if (!newDataWidgetHTMLjQuery.find('.help-block').text().trim().length) {
          newDataWidgetHTMLjQuery.find('.help-block').addClass('disabled-help-block');
        }
  
        if (context.targetLayoutWidget.Rows && context.targetLayoutWidget.Rows.length && context.targetLayoutWidget.Rows[0].Columns && context.targetLayoutWidget.Rows[0].Columns.length && context.targetLayoutWidget.Rows[0].Columns[context.section_num].IsDisplayOnly) {
          newDataWidgetHTMLjQuery.find('.draggable-data-section').removeClass('draggable-data-section');
        }
  
        section.append(newDataWidgetHTMLjQuery);
        initDatePicker("div[data-guid=\"" + context.layoutWidgetGuid + "\"]");
      }
  
      kendo.bind($('#dataEditWindow'), window.viewModel);
      sysproInterop.performBind(state.bindableFieldsData, true, '', section.closest('.layout-widget'));
  
      if (widgetObject.TypeName === 'ButtonWidget') {
        insertOffCanvasSection(offCanvasWidget, false, null, function () {
          if (offCanvasWidget.OffCanvas == 3) {
            newDataWidgetHTMLjQuery.find('a').removeClass('offcanvas-toggle');
            newDataWidgetHTMLjQuery.find('a').on('click', function (e) {
              window.viewModel.offCanvasWindows[$(e.currentTarget).data('target')].center().open();
            });
          } else {
            var initOffCanvas = newDataWidgetHTMLjQuery.hasClass('offcanvas-toggle') ? new Offcanvas(newDataWidgetHTMLjQuery) : new Offcanvas(newDataWidgetHTMLjQuery.find('a.offcanvas-toggle'));
          }
        });
      }
  
      initEditRemoveDataWidget();
      initDataWidgetSorting();
      if (callback && typeof callback === 'function') callback();
    }, context.targetLayoutWidget.SubType, context.targetLayoutWidget.DisplayStyle, context.targetLayoutWidget.Border, context.section_num, function (error) {
      console.log(error);
    }, false);
  } // Initialise Edit and remove functions on toolbar widgets
  
  function initEditRemoveToolbarWidgets() {
    $('.toolbar-widget-options .col-xs-6:last-child i').popover('destroy');
    $('.toolbar-widget-options .col-xs-6:last-child i').popover({
      html: true,
      placement: 'left',
      trigger: 'manual',
      animation: false,
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
      content: '<ul class="nav nav-pills"><li><a class="edit-toolbar-widget"><i class="material-icons text-primary">edit</i></a></li><li><a class="remove-toolbar-widget"><i class="material-icons text-danger">delete</i></a></li></ul>'
    }).off().on('click', function (e) {
      e.stopPropagation();
      var _this = e.currentTarget;
      $(e.currentTarget).popover('show');
      $(e.currentTarget).siblings('.popover').on('mouseleave', function () {
        $(_this).popover('hide');
      });
    }).on('mouseleave', function (e) {
      var _this = e.currentTarget;
  
      var hidePop = function hidePop() {
        setTimeout(function () {
          if (!$('.popover:hover').length) {
            $(_this).popover('hide');
          } else {
            hidePop();
          }
        }, 50);
      };
  
      hidePop();
    });
  }
  // CONCATENATED MODULE: ./finaljs/modules/tiles.js
  
  
  
  function sizeTiles() {
    $('.tile-widget').each(function (_idx, elem) {
      var tileWidget = $(elem);
  
      if (state.tileWidgets[tileWidget.closest('.draggable-row-section').data('guid')]) {
        state.tileWidgets[tileWidget.closest('.draggable-row-section').data('guid')].packery('layout');
      }
  
      tileWidget.parents('.tile-widget-wrapper').find('.tile-loading-cover').hide();
    }); // Tiles initialisation JS
  
    fitty('.small-tile .valueIconWrapper .tile-main-value', {
      minSize: 16,
      maxSize: 20.5,
      multiLine: false
    }); // Tiles initialisation JS
  
    fitty('.small-tile .metric-only .tile-main-value', {
      minSize: 16,
      maxSize: 30,
      multiLine: true
    });
    fitty('.wide-tile .tile-main-value, .big-tile .tile-main-value', {
      minSize: 22,
      maxSize: 56,
      multiLine: true
    });
  
    function sizeTileTitles(titleElement, targetHeight) {
      $(titleElement).css('height', targetHeight + "px");
      $(titleElement).addClass('show-more-icon');
      $(titleElement).hover(function () {
        $(titleElement).removeClass('show-more-icon');
        $(titleElement).animate({
          height: $(titleElement).get(0).scrollHeight
        }, 120);
      }, function () {
        $(titleElement).animate({
          height: targetHeight
        }, 60);
        $(titleElement).addClass('show-more-icon');
      });
    }
  
    $('.small-tile .tile-title:visible').each(function (_idx, elem) {
      var that = elem;
  
      if ($(that).get(0).scrollHeight > 33 && ($(that).siblings('.tile-subtitle').text().length > 0 || $(that).closest('.ai-tile-icon-title').siblings('.tile-subtitle').text().length > 0)) {
        sizeTileTitles(that, 32);
      } else if ($(that).get(0).scrollHeight > 46 && ($(that).siblings('.tile-subtitle').text().length === 0 || $(that).closest('.ai-tile-icon-title').siblings('.tile-subtitle').text().length === 0)) {
        sizeTileTitles(that, 45);
      }
    });
    $('.wide-tile .tile-title:visible').each(function (_idx, elem) {
      var that = elem;
  
      if ($(that).get(0).scrollHeight > 40 && ($(that).siblings('.tile-subtitle').text().length > 0 || $(that).closest('.ai-tile-icon-title').siblings('.tile-subtitle').text().length > 0)) {
        sizeTileTitles(that, 39);
      } else if ($(that).get(0).scrollHeight > 40 && ($(that).siblings('.tile-subtitle').text().length === 0 || $(that).closest('.ai-tile-icon-title').siblings('.tile-subtitle').text().length === 0)) {
        sizeTileTitles(that, 39);
      }
    });
  }
  function initiateTiles(tileWidget) {
    if (tileWidget.Rows[0].Columns) {
      var tileWidgetId_1 = tileWidget.Id;
      $.when($.each(tileWidget.Rows[0].Columns, function (_idx, val) {
        var currColumn = val;
  
        currColumn.Widgets[0].HTMLContent = function () {
          var uid = sysproInterop.generateUUID();
          sysproInterop.getHtmlFromModel('Widget', currColumn.Widgets[0].toJSON(), function (result) {
            $("#async_" + uid).html($.trim(result));
          }, '', '', '', '', function (error) {
            console.log(error);
          }, false);
          return "<div id='async_" + uid + "'> </div>";
        };
      })).then(function () {
        var tileTemplate = kendo.template($('#tileTemplate').html());
        var result = kendo.render(tileTemplate, tileWidget.Rows[0].Columns); // render the template
  
        $(".layout-widget[data-guid=\"" + tileWidgetId_1 + "\"] .tile-widget").html(result); // append the result to the page
  
        $(".layout-widget[data-guid=\"" + tileWidgetId_1 + "\"] .tile-widget").prepend('<div class="tile col-xs-6 col-sm-4 tile-width-marker"></div>');
        if (state.tileWidgets[tileWidgetId_1]) state.tileWidgets[tileWidgetId_1].packery('destroy');
        state.tileWidgets[tileWidgetId_1] = $(".layout-widget[data-guid=\"" + tileWidgetId_1 + "\"] .tile-widget").packery({
          itemSelector: '.tile:not(.tile-width-marker)',
          gutter: 0,
          columnWidth: 142,
          transitionDuration: '0.27s'
        });
        state.tileWidgets[tileWidgetId_1].packery('layout');
        state.tileWidgets[tileWidgetId_1].find('.tile:not(.tile-width-marker)').each(function (i, gridItem) {
          var draggie = new Draggabilly(gridItem, {
            handle: '.drag-row-section'
          }); // bind drag events to Packery
  
          state.tileWidgets[tileWidgetId_1].packery('bindDraggabillyEvents', draggie);
        });
        state.tileWidgets[tileWidgetId_1].off('dragItemPositioned').on('dragItemPositioned', function (event, draggedItem) {
          var context = setContext(draggedItem.element);
          var draggedTile = context.currentDataSource.get($(draggedItem.element).data('guid'));
          var parentTileWidgetGuid = $(draggedItem.element).parents('.layout-widget').data('guid');
          var parentTileWidget = context.currentDataSource.get(parentTileWidgetGuid);
          var allTiles = state.tileWidgets[tileWidgetId_1].packery('getItemElements');
          var newIndex = allTiles.indexOf(draggedItem.element);
          context.currentDataSource.remove(draggedTile);
          parentTileWidget.children.at(0).children.insert(newIndex, draggedTile);
          state.tileWidgets[tileWidgetId_1].packery('layout');
        });
        initEditRemoveDataWidget();
        sizeTiles();
      });
    }
  } // Callback function for calling sizeTiles from performBind callback
  
  function sizeTilesCallback(noError, msg) {
    if (noError) {
      sizeTiles();
    } else {
      showErrorMessage(msg);
    }
  }
  function initiateExistingTiles() {
    $('.tile-widget').each(function (_idx, elem) {
      var context = setContext(elem);
      $(elem).parents('.layout-widget').find('.data-section').removeClass('data-section');
      $(elem).parents('.layout-widget').children('.col-sm-12').addClass('tile-widget-wrapper');
      $(elem).parents('.layout-widget').find('.panel-body').first().prepend('<div class="tile-loading-cover"><span class="spinner"></span></div>');
  
      if ($(elem).parents('.layout-widget').data('guid')) {
        var tileWidget = context.currentDataSource.get($(elem).parents('.layout-widget').data('guid'));
        initiateTiles(tileWidget);
      }
    });
  }
  function initPackery() {
    // Packery centering initialisation
    var __resetLayout = Packery.prototype._resetLayout;
  
    Packery.prototype._resetLayout = function () {
      __resetLayout.call(this); // reset packer
  
  
      var parentSize = getSize(this.element.parentNode);
      var colW = this.columnWidth + this.gutter;
      this.fitWidth = Math.floor((parentSize.innerWidth + this.gutter) / colW) * colW;
      this.packer.width = this.fitWidth;
      this.packer.height = Number.POSITIVE_INFINITY;
      this.packer.reset();
    };
  
    Packery.prototype._getContainerSize = function () {
      // remove empty space from fit width
      var emptyWidth = 0;
  
      for (var i = 0, len = this.packer.spaces.length; i < len; i++) {
        var space = this.packer.spaces[i];
  
        if (space.y === 0 && space.height === Number.POSITIVE_INFINITY) {
          emptyWidth += space.width;
        }
      }
  
      return {
        width: this.fitWidth - this.gutter - emptyWidth,
        height: this.maxY - this.gutter
      };
    }; // always resize
  
  
    Packery.prototype.needsResizeLayout = function () {
      return true;
    };
  }
  // CONCATENATED MODULE: ./finaljs/modules/avantiUI.js
  // Initialise program list dragging to tile widgets
  function initProgramListTileDragging(onDropEvent) {
    // create a draggable for the parent container
    $('#programListMenu .treeview-menu >li:not(.treeview)').each(function (_idx, elem) {
      if (!$(elem).data('kendoDraggable')) {
        $(elem).kendoDraggable({
          hint: function hint(element) {
            var elementClone = element.clone();
            elementClone.find('i, span').remove();
            var styles = {
              height: '142px',
              width: '142px',
              backgroundColor: '#fff'
            };
            elementClone.css(styles);
            elementClone.addClass('hint');
            return elementClone;
          },
          dragstart: function dragstart() {
            if ($('.tiles-parent').length) {
              $('.tiles-parent').find('.sys-bg-white').addClass('pulse'); // modify dropTarget element
            }
          }
        });
      }
    });
  
    function onDrop(e) {
      e.dropTarget.find('.sys-bg-white').removeClass('pulse');
  
      if (onDropEvent) {
        var elementClone = e.draggable.element.find('a.syspro-program-link').clone();
        elementClone.children().remove();
        var programDescription = elementClone.text();
        onDropEvent(e.dropTarget, e.draggable.element.find('a.syspro-program-link').data('sysproprogramname'), programDescription, e.draggable.element.find('a.syspro-program-link').data('syspromenuitemtype'), e.draggable.element.find('a.syspro-program-link').data('syspromenuitemsubtype'));
      }
    }
  
    $('.tiles-parent').each(function (_idx, elem) {
      if (!$(elem).data('kendoDropTarget')) {
        $(elem).kendoDropTarget({
          drop: onDrop
        });
      }
    });
  }
  function setupExpandableCard(card) {
    var cardBindableHeight = $(card).find('.card-bindable').outerHeight();
    var expandedViewHeight = $(card).find('.expandedView').outerHeight();
    $(card).find('.expandedView').css('height', '0px');
    $(card).find('.expandedView').css('display', 'block');
    $(card).find('.card-bindable').css('minHeight', cardBindableHeight);
  
    function slideFade(elem) {
      var fade = {
        opacity: 0,
        marginLeft: '-200%'
      };
      elem.css(fade);
    }
  
    function slideInFade(elem) {
      var fade = {
        opacity: 1,
        marginLeft: '0%'
      };
      elem.css(fade);
    }
  
    function expandFade(elem) {
      var fade = {
        opacity: 1,
        height: expandedViewHeight + "px"
      };
      elem.css(fade);
    }
  
    function shrinkFade(elem) {
      var fade = {
        opacity: 0,
        height: '0px'
      };
      elem.css(fade);
    }
  
    $(card).find('.expand-card').off('click').on('click', function (e) {
      e.preventDefault();
      slideFade($(e.currentTarget).closest('.miniView'));
    });
    $(card).find('.shrink-card').off('click').on('click', function (e) {
      e.preventDefault();
      shrinkFade($(e.currentTarget).closest('.expandedView'));
    });
    $(card).find('.miniView').off('transitionend webkitTransitionEnd oTransitionEnd').on('transitionend webkitTransitionEnd oTransitionEnd', function (e) {
      if (e.originalEvent.propertyName === 'opacity' && parseInt($(e.currentTarget).css('opacity')) == 0) {
        expandFade($(e.currentTarget).siblings('.expandedView'));
        $(e.currentTarget).css('height', '0px');
      }
    });
    $(card).find('.expandedView').off('transitionend webkitTransitionEnd oTransitionEnd').on('transitionend webkitTransitionEnd oTransitionEnd', function (e) {
      if (e.originalEvent.propertyName === 'opacity' && parseInt($(e.currentTarget).css('opacity')) === 0) {
        $(card).find('.miniView').css('height', 'auto');
        slideInFade($(e.currentTarget).siblings('.miniView'));
      }
    });
  }
  // CONCATENATED MODULE: ./finaljs/modules/diagram.js
  
   // Return a Kendo Diagram shape from given options
  
  function visualTemplate(options) {
    var dataviz = kendo.dataviz;
    var g = new dataviz.diagram.Group();
    var dataItem = options.dataItem;
    var dataItemTitle = dataItem.Title;
    var dataItemSubtitle = dataItem.Subtitle || '';
    var dataItemProgram = dataItem.Program.Name;
    var dataItemType = dataItem.Program.Type;
    var dataItemClickable = dataItem.Clickable;
    var titleX;
    var titleY; // let programX;
    // let programY;
    // let elementWidth;
  
    g.drawingElement.options.tooltip = {
      content: dataItemProgram + " (" + dataItemType + ") - " + dataItemSubtitle,
      shared: true
    };
  
    if (dataItem.type === 'circle') {
      g.append(new dataviz.diagram.Circle({
        radius: dataItem.width || 120,
        stroke: {
          width: 0
        },
        fill: {
          color: dataItem.Color || '#ecf0f1'
        }
      }));
    } else if (dataItem.path !== null && dataItem.path !== undefined) {
      g.append(new kendo.dataviz.diagram.Path({
        data: dataItem.path,
        stroke: {
          width: 0
        },
        fill: dataItem.Color || '#ecf0f1'
      }));
  
      switch (dataItem.shapeName) {
        case 'data':
          titleX = 35;
          titleY = 25; // programX = 25;
          // programY = 55;
          // elementWidth = 100;
  
          break;
  
        case 'decision':
          titleX = 25;
          titleY = 40; // programX = 25;
          // programY = 55;
          // elementWidth = 100;
  
          break;
  
        case 'delay':
          titleX = 15;
          titleY = 25; // programX = 15;
          // programY = 55;
          // elementWidth = 80;
  
          break;
  
        case 'display':
          titleX = 25;
          titleY = 30; // programX = 25;
          // programY = 55;
          // elementWidth = 120;
  
          break;
  
        case 'document':
          titleX = 15;
          titleY = 25; // programX = 15;
          // programY = 50;
          // elementWidth = 120;
  
          break;
  
        case 'manualinput':
          titleX = 15;
          titleY = 30; // programX = 15;
          // programY = 60;
          // elementWidth = 120;
  
          break;
  
        case 'manualoperation':
          titleX = 25;
          titleY = 25; // programX = 25;
          // programY = 55;
          // elementWidth = 100;
  
          break;
  
        case 'merge':
          // dataItemTitle = '';
          // dataItemProgram = '';
          break;
  
        case 'or':
          // dataItemTitle = '';
          // dataItemProgram = '';
          break;
  
        case 'preparation':
          titleX = 25;
          titleY = 25; // programX = 25;
          // programY = 55;
          // elementWidth = 110;
  
          break;
  
        case 'process':
          titleX = 15;
          titleY = 25; // programX = 15;
          // programY = 55;
          // elementWidth = 120;
  
          break;
  
        case 'octagon':
          titleX = 20;
          titleY = 20; // programX = 20;
          // programY = 40;
          // elementWidth = 120;
  
          break;
  
        default:
          break;
      }
    } else {
      g.append(new dataviz.diagram.Rectangle({
        width: dataItem.width || 200,
        height: dataItem.height || 100,
        stroke: {
          width: 0
        },
        fill: dataItem.Color || '#ecf0f1'
      }));
    }
  
    var layout = new dataviz.diagram.Layout(new dataviz.diagram.Rect(titleX || 15, titleY || 15, 120, 50), {
      alignContent: 'start',
      spacing: 4
    });
    g.append(layout);
    var texts = dataItemTitle.split(' ');
  
    for (var i = 0; i < texts.length; i++) {
      layout.append(new dataviz.diagram.TextBlock({
        text: texts[i]
      }));
    }
  
    layout.reflow();
  
    if (dataItemClickable) {
      g.append(new dataviz.diagram.Image({
        source: '../../../img/openProgram.png',
        x: 3,
        y: 3,
        width: 18,
        height: 18
      }));
    }
  
    return g;
  } // Helper function to create local data source for Kendo UI diagram
  
  
  function localDataSource(options) {
    var id = options.schema.model.id;
    var data = options.data;
    var created;
    var updated;
    var deleted;
    var dataSource = new kendo.data.DataSource($.extend(true, {
      transport: {
        read: function read(e) {
          created = {};
          updated = {};
          deleted = {};
          e.success(data || []);
        },
        update: function update(e) {
          var item = e.data;
  
          if (!created[item[id]]) {
            updated[item[id]] = item;
          }
  
          e.success();
        },
        destroy: function destroy(e) {
          var idValue = e.data[id];
  
          if (!created[idValue]) {
            deleted[idValue] = e.data;
          } else {
            delete created[idValue];
          }
  
          e.success();
        },
        create: function create(e) {
          var item = e.data;
          item[id] = sysproInterop.generateUUID();
          created[item[id]] = $.extend(true, {}, item);
          e.success(item);
        }
      }
    }, options));
  
    dataSource.getChanges = function () {
      return {
        deleted: toArray(deleted),
        created: toArray(created),
        updated: toArray(updated)
      };
    };
  
    return dataSource;
  } // Create a Kendo UI diagram
  
  
  function createDiagram(diagramData, containerElement, editable) {
    var shapesDataSource = localDataSource({
      data: diagramData.shapesData || [],
      schema: {
        model: {
          id: 'Id',
          fields: {
            Id: {
              type: 'string',
              editable: false
            },
            Title: {
              type: 'string'
            },
            Program: {
              type: 'string',
              parse: function parse(val) {
                return typeof val === 'string' ? {
                  Name: val
                } : typeof val.Name === 'string' ? val : {
                  Name: 'Select program'
                };
              }
            },
            Color: {
              type: 'string'
            },
            path: {
              type: 'string'
            },
            x: {
              type: 'number'
            },
            y: {
              type: 'number'
            },
            width: {
              type: 'number'
            },
            height: {
              type: 'number'
            }
          }
        }
      }
    });
    var connectionsDataSource = localDataSource({
      data: diagramData.connectionsData || [],
      schema: {
        model: {
          id: 'Id',
          fields: {
            Id: {
              type: 'string',
              editable: false
            },
            from: {
              type: 'string'
            },
            to: {
              type: 'string'
            }
          }
        }
      }
    });
    var shapesEditable = editable ? {
      tools: [{
        name: 'edit',
        icon: 'pencil'
      }, {
        name: 'delete',
        icon: 'trash'
      }]
    } : false;
    var connectionsEditable = editable ? {
      tools: [{
        name: 'delete'
      }]
    } : false;
    var overallEditable = editable ? {
      resize: false,
      rotate: false,
      tools: [{}],
      shapeTemplate: function shapeTemplate(dataItem) {
        return kendo.template($('#programEditTemplate').html())(dataItem);
      }
    } : false;
    var clickFunction = editable ? null : function (e) {
      if (e.item instanceof kendo.dataviz.diagram.Shape) {
        sysproInterop.runProgramInSYSPRO(e.item.dataItem.Program.Name, e.item.dataItem.Program.Type, e.item.dataItem.Program.Description, e.item.dataItem.Program.SubType);
      } else {
        console.log('Clicked a connection.');
      }
    };
  
    function updateShapeProperties(shape) {
      $('.shapeBackgroundColorPicker', containerElement).getKendoColorPicker().value(kendo.parseColor(shape.dataItem.Color, false));
    }
  
    function updateConnectionProperties(shape) {
      $('input.connectionStartCap', containerElement).getKendoDropDownList().value(shape.startCap);
      $('input.connectionEndCap', containerElement).getKendoDropDownList().value(shape.endCap);
    }
  
    function onDataBound() {
      this.bringIntoView(this.shapes);
    }
  
    var select = editable ? function (e) {
      if (e.selected.length) {
        state.diagramSelected = e.selected;
        var element = e.selected[0];
  
        if (element instanceof kendo.dataviz.diagram.Shape) {
          updateShapeProperties(element);
        } else {
          updateConnectionProperties(element.options);
        }
      }
    } : null;
    return $(editable ? '.diagramEdit' : '.diagram', containerElement).kendoDiagram({
      theme: 'default',
      dataSource: shapesDataSource,
      connectionsDataSource: connectionsDataSource,
      shapeDefaults: {
        visual: visualTemplate,
        width: 120,
        height: 120,
        fill: '#ecf0f1',
        editable: shapesEditable
      },
      connectionDefaults: {
        stroke: {
          color: '#2c3e50',
          width: 2
        },
        type: 'cascading',
        endCap: 'ArrowEnd',
        editable: connectionsEditable
      },
      layout: diagramData.layout,
      editable: overallEditable,
      select: select,
      click: clickFunction,
      edit: function edit(e) {
        state.diagramActiveItem = e.shape;
        state.diagramActiveItemProgram = e.shape.Program;
      },
      zoom: 0.8,
      dataBound: onDataBound
    }).data('kendoDiagram');
  }
  // CONCATENATED MODULE: ./finaljs/modules/processWidgets.js
  
   // Generic helper function to retrieve a value from the fields JSON
  
  function getPropertyValue(fieldObject, property) {
    var itemString = property === 'HasSmartTag' ? 'false' : '';
  
    for (var key in fieldObject) {
      if (key === property) {
        itemString = fieldObject[key];
      }
    }
  
    return itemString;
  } // Specific helper function to grab captions with secondary captions
  
  
  function getCaption(fieldObject) {
    var captionString = '';
  
    for (var key in fieldObject) {
      if (key == 'Caption') {
        captionString = fieldObject[key];
      }
    }
  
    var pureCaption = captionString.replace('[', '').replace(']', '');
    var shortCaption = captionString.replace(/\[.*\]/g, '');
    captionString = captionString.replace('[', "<span class='secondaryCaption'>(");
    captionString = captionString.replace(']', ')</span>');
    return [captionString, pureCaption, shortCaption];
  } // Helper fuction to process Available Cards from the XML/JSON
  
  
  function processCards(cardsObject, cardIndex) {
    if (!cardsObject) return;
    var cardObject = Array.isArray(cardsObject) ? cardsObject[cardIndex] : cardsObject;
    var cardsQuickAddHTML = '';
    var cardsLayoutWindowHTML = '';
    var WidgetType = cardObject.Name;
    var WidgetName = cardObject.Name + "_card";
    var widgetDescription = cardObject.Description;
    cardsLayoutWindowHTML += "<label class=\"btn btn-radio col-sm-5 text-left no-sunken sys-mg-r-2\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\" " + widgetDescription + " \"><input type=\"radio\" name=\"row_options\" id=\"" + WidgetName + "\" value=\"" + WidgetName + "\" autocomplete=\"off\" data-layout-widget-type=\"Card\" data-layout-widget-subtype=\"MaxiCard\" data-layout-widget-displaystyle=\"0\" data-card-type-detail=\"" + WidgetType + "\" data-parent-field-path=\"";
  
    if (cardObject.KeyField && cardObject.KeyField.length) {
      cardsLayoutWindowHTML += "Fields.SYSPROKeyData." + cardObject.KeyField + ".Value";
    }
  
    cardsLayoutWindowHTML += "\" required=\"required\"><i class=\"material-icons text-muted\">panorama_fish_eye</i><i class=\"material-icons text-success\">check_circle</i> " + widgetDescription.replace(/ Card$/, '') + "</label>";
  
    if (!state.finishedQuickAddWidgets) {
      cardsQuickAddHTML += "<div class=\"col-xs-6 mb-10 draggable quickAddWidget quickAddCard\" id=\"" + WidgetName + "\" value=\"" + WidgetName + "\" data-layout-widget-type=\"Card\" data-layout-widget-subtype=\"MaxiCard\" data-card-type-detail=\"" + WidgetType + "\" data-layout-widget-displaystyle=\"0\" data-parent-field-path=\"";
  
      if (cardObject.KeyField && cardObject.KeyField.length) {
        cardsQuickAddHTML += "Fields.SYSPROKeyData." + cardObject.KeyField + ".Value";
      }
  
      cardsQuickAddHTML += "\"><div class=\"draggableLayoutWidget draggable\"><i class=\"material-icons text-primary quickAddDragHandle\">open_with</i> " + widgetDescription + " </div></div>";
      $('#quick-add-layout .quick-sortable-list.row').append(cardsQuickAddHTML);
    }
  
    $('#AvailableCards .layout-radio-options').append(cardsLayoutWindowHTML);
  
    if (cardsObject.length) {
      cardIndex++;
  
      if (cardIndex < cardsObject.length) {
        processCards(cardsObject, cardIndex);
      }
    }
  } // Helper fuction to process Available Harmony Widgets from the XML/JSON
  
  function processHarmony(harmonyWidgetsObject, harmonyIndex) {
    if (!harmonyWidgetsObject) return;
    var harmonyWidgetObject = Array.isArray(harmonyWidgetsObject) ? harmonyWidgetsObject[harmonyIndex] : harmonyWidgetsObject;
    var harmonyQuickAddHTML = '';
    var harmonyLayoutWindowHTML = '';
    var WidgetID = harmonyWidgetObject.ComponentId;
    var WidgetName = harmonyWidgetObject.Name;
    var widgetDescription = harmonyWidgetObject.Description;
    harmonyLayoutWindowHTML += "<label class=\"btn btn-radio col-sm-5 text-left no-sunken sys-mg-r-2\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\" " + widgetDescription + " \"><input type=\"radio\" name=\"row_options\" id=\"" + WidgetName + "\" value=\"" + WidgetName + "\" autocomplete=\"off\" data-layout-widget-type=\"HarmonyWidget\" data-layout-widget-subtype=\"MaxiWidget\" data-layout-widget-displaystyle=\"0\" data-component-id=\"" + WidgetID + "\" required=\"required\"><i class=\"material-icons text-muted\">panorama_fish_eye</i><i class=\"material-icons text-success\">check_circle</i> " + widgetDescription + "</label>";
  
    if (!state.finishedQuickAddWidgets) {
      harmonyQuickAddHTML += "<div class=\"col-xs-6 mb-10 draggable quickAddWidget quickAddCard\" id=\"" + WidgetName + "\" value=\"" + WidgetName + "\" data-layout-widget-type=\"HarmonyWidget\" data-layout-widget-subtype=\"MaxiWidget\" data-layout-widget-displaystyle=\"0\" data-component-id=\"" + WidgetID + "\"><div class=\"draggableLayoutWidget draggable\"><i class=\"material-icons text-primary quickAddDragHandle\">open_with</i> " + widgetDescription + " </div></div>";
      $('#quick-add-layout .quick-sortable-list.row').append(harmonyQuickAddHTML);
    }
  
    $('#HarmonyWidgets .layout-radio-options').append(harmonyLayoutWindowHTML);
  
    if (harmonyWidgetsObject.length) {
      harmonyIndex++;
  
      if (harmonyIndex < harmonyWidgetsObject.length) {
        processHarmony(harmonyWidgetsObject, harmonyIndex);
      }
    }
  } // Helper fuction to process GridLists from the XML/JSON
  
  function processGridLists(gridlistsObject, gridlistIndex) {
    if (!gridlistsObject) return;
    var gridlistObject = Array.isArray(gridlistsObject) ? gridlistsObject[gridlistIndex] : gridlistsObject;
    var gridlistQuickAddHTML = '';
    var gridlistLayoutWindowHTML = '';
    var WidgetFieldName = gridlistObject.FieldName;
    var widgetDescription = gridlistObject.Caption;
    gridlistLayoutWindowHTML += "<label class=\"btn btn-radio text-left no-sunken sys-mg-r-2\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\" " + widgetDescription + " \"><input type=\"radio\" name=\"row_options\" id=\"" + WidgetFieldName + "\" value=\"" + WidgetFieldName + "\" autocomplete=\"off\" data-layout-widget-type=\"GridList\" data-layout-widget-displaystyle=\"0\" data-gridlist-field-name=\"" + WidgetFieldName + "\" required=\"required\" data-caption=\"" + widgetDescription + "\"><i class=\"material-icons text-muted\">panorama_fish_eye</i><i class=\"material-icons text-success\">check_circle</i> " + widgetDescription + "</label>";
  
    if (!state.finishedQuickAddWidgets) {
      gridlistQuickAddHTML += "<div class=\"col-xs-6 mb-10 draggable quickAddWidget quickAddCard\" id=\"" + WidgetFieldName + "\" value=\"" + WidgetFieldName + "\" data-layout-widget-type=\"GridList\" data-layout-widget-displaystyle=\"0\" data-gridlist-field-name=\"" + WidgetFieldName + "\" data-caption=\"" + widgetDescription + "\"><div class=\"draggableLayoutWidget draggable\"><i class=\"material-icons text-primary quickAddDragHandle\">open_with</i> " + widgetDescription + " </div></div>";
      $('#quick-add-layout .quick-sortable-list.row').append(gridlistQuickAddHTML);
    }
  
    $('#GridlistWidgets .layout-radio-options').append(gridlistLayoutWindowHTML);
  
    if (gridlistsObject.length) {
      gridlistIndex++;
  
      if (gridlistIndex < gridlistsObject.length) {
        processGridLists(gridlistsObject, gridlistIndex);
      }
    }
  } // Helper fuction to process TreeLists from the XML/JSON
  
  function processTreeLists(treelistsObject, treelistIndex) {
    if (!treelistsObject) return;
    var treelistObject = Array.isArray(treelistsObject) ? treelistsObject[treelistIndex] : treelistsObject;
    var treelistQuickAddHTML = '';
    var treelistLayoutWindowHTML = '';
    var WidgetFieldName = treelistObject.FieldName;
    var widgetDescription = treelistObject.Caption;
    treelistLayoutWindowHTML += "<label class=\"btn btn-radio text-left no-sunken sys-mg-r-2\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\" " + widgetDescription + " \"><input type=\"radio\" name=\"row_options\" id=\"" + WidgetFieldName + "\" value=\"" + WidgetFieldName + "\" autocomplete=\"off\" data-layout-widget-type=\"TreeList\" data-layout-widget-displaystyle=\"0\" data-gridlist-field-name=\"" + WidgetFieldName + "\" required=\"required\" data-caption=\"" + widgetDescription + "\"><i class=\"material-icons text-muted\">panorama_fish_eye</i><i class=\"material-icons text-success\">check_circle</i> " + widgetDescription + "</label>";
  
    if (!state.finishedQuickAddWidgets) {
      treelistQuickAddHTML += "<div class=\"col-xs-6 mb-10 draggable quickAddWidget quickAddCard\" id=\"" + WidgetFieldName + "\" value=\"" + WidgetFieldName + "\" data-layout-widget-type=\"TreeList\" data-layout-widget-displaystyle=\"0\" data-gridlist-field-name=\"" + WidgetFieldName + "\" data-caption=\"" + widgetDescription + "\"><div class=\"draggableLayoutWidget draggable\"><i class=\"material-icons text-primary quickAddDragHandle\">open_with</i> " + widgetDescription + " </div></div>";
      $('#quick-add-layout .quick-sortable-list.row').append(treelistQuickAddHTML);
    }
  
    $('#TreelistWidgets .layout-radio-options').append(treelistLayoutWindowHTML);
  
    if (treelistsObject.length) {
      treelistIndex++;
  
      if (treelistIndex < treelistsObject.length) {
        processTreeLists(treelistsObject, treelistIndex);
      }
    }
  } // Helper fuction to process TreeViews from the XML/JSON
  
  function processTreeViews(treeviewsObject, treeviewIndex) {
    if (!treeviewsObject) return;
    var treeViewObject = Array.isArray(treeviewsObject) ? treeviewsObject[treeviewIndex] : treeviewsObject;
    var treeviewQuickAddHTML = '';
    var treeviewLayoutWindowHTML = '';
    var WidgetFieldName = treeViewObject.FieldName;
    var widgetDescription = treeViewObject.Caption;
    treeviewLayoutWindowHTML += "<label class=\"btn btn-radio text-left no-sunken sys-mg-r-2\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\" " + widgetDescription + " \"><input type=\"radio\" name=\"row_options\" id=\"" + WidgetFieldName + "\" value=\"" + WidgetFieldName + "\" autocomplete=\"off\" data-layout-widget-type=\"TreeView\" data-layout-widget-displaystyle=\"0\" data-gridlist-field-name=\"" + WidgetFieldName + "\" required=\"required\" data-caption=\"" + widgetDescription + "\"><i class=\"material-icons text-muted\">panorama_fish_eye</i><i class=\"material-icons text-success\">check_circle</i> " + widgetDescription + "</label>";
  
    if (!state.finishedQuickAddWidgets) {
      treeviewQuickAddHTML += "<div class=\"col-xs-6 mb-10 draggable quickAddWidget quickAddCard\" id=\"" + WidgetFieldName + "\" value=\"" + WidgetFieldName + "\" data-layout-widget-type=\"TreeView\" data-layout-widget-displaystyle=\"0\" data-gridlist-field-name=\"" + WidgetFieldName + "\" data-caption=\"" + widgetDescription + "\"><div class=\"draggableLayoutWidget draggable\"><i class=\"material-icons text-primary quickAddDragHandle\">open_with</i> " + widgetDescription + " </div></div>";
      $('#quick-add-layout .quick-sortable-list.row').append(treeviewQuickAddHTML);
    }
  
    $('#TreeviewWidgets .layout-radio-options').append(treeviewLayoutWindowHTML);
  
    if (treeviewsObject.length) {
      treeviewIndex++;
  
      if (treeviewIndex < treeviewsObject.length) {
        processTreeViews(treeviewsObject, treeviewIndex);
      }
    }
  } // Helper fuction to process TreeLists from the XML/JSON
  
  function processNotepadWidgets(notepadsObject, notepadIndex) {
    if (!notepadsObject) return;
    var notepadObject = Array.isArray(notepadsObject) ? notepadsObject[notepadIndex] : notepadsObject;
    var notepadQuickAddHTML = '';
    var notepadLayoutWindowHTML = '';
    var WidgetFieldName = notepadObject.FieldName;
    var widgetDescription = notepadObject.Caption;
    notepadLayoutWindowHTML += "<label class=\"btn btn-radio text-left no-sunken sys-mg-r-2\" data-tooltip=\"tooltip\" data-placement=\"top\" title=\" " + widgetDescription + " \"><input type=\"radio\" name=\"row_options\" id=\"" + WidgetFieldName + "\" value=\"" + WidgetFieldName + "\" autocomplete=\"off\" data-layout-widget-type=\"RichTextWidget\" data-layout-widget-displaystyle=\"0\" data-richtext-field-name=\"" + WidgetFieldName + "\" required=\"required\" data-caption=\"" + widgetDescription + "\"><i class=\"material-icons text-muted\">panorama_fish_eye</i><i class=\"material-icons text-success\">check_circle</i> " + widgetDescription + "</label>";
  
    if (!state.finishedQuickAddWidgets) {
      notepadQuickAddHTML += "<div class=\"col-xs-6 mb-10 draggable quickAddWidget quickAddCard\" id=\"" + WidgetFieldName + "\" value=\"" + WidgetFieldName + "\" data-layout-widget-type=\"RichTextWidget\" data-layout-widget-displaystyle=\"0\" data-richtext-field-name=\"" + WidgetFieldName + "\" data-caption=\"" + widgetDescription + "\"><div class=\"draggableLayoutWidget draggable\"><i class=\"material-icons text-primary quickAddDragHandle\">open_with</i> " + widgetDescription + " </div></div>";
      $('#quick-add-layout .quick-sortable-list.row').append(notepadQuickAddHTML);
    }
  
    $('#NotepadWidgets .layout-radio-options').append(notepadLayoutWindowHTML);
  
    if (notepadsObject.length) {
      notepadIndex++;
  
      if (notepadIndex < notepadsObject.length) {
        processNotepadWidgets(notepadsObject, notepadIndex);
      }
    }
  } // Parse tiles, getting them in a structure suitable for the drill down menu UI
  
  function processTileJSON(tileWidgetFields) {
    var tilesJSON = {};
  
    for (var key in tileWidgetFields) {
      if (tileWidgetFields.hasOwnProperty(key)) {
        for (var subkey in tileWidgetFields[key]) {
          if (tileWidgetFields[key].hasOwnProperty(subkey)) {
            var tileObj = tileWidgetFields[key][subkey];
  
            if (Array.isArray(tileObj)) {
              for (var tc = 0; tc < tileObj.length; tc++) {
                var fieldObject = tileObj[tc];
                var keyField = getPropertyValue(fieldObject, 'KeyType');
                var description = getPropertyValue(fieldObject, 'Description');
                var name_1 = getPropertyValue(fieldObject, 'Name');
                var tileType = getPropertyValue(fieldObject, 'Type');
                var activity = getPropertyValue(fieldObject, 'Activity');
                var detailAvailable = getPropertyValue(fieldObject, 'DetailAvailable');
  
                if (!state.tilesJSONReady) {
                  tilesJSON[name_1] = fieldObject.Parameters;
                  state.tilesSearchJSON.push({
                    keyField: keyField,
                    description: description,
                    tileType: tileType,
                    detailAvailable: detailAvailable,
                    activity: activity,
                    tileName: name_1,
                    name: description + (activity === 'Workspace' ? '' : keyField ? " (" + keyField + ")" : '')
                  });
                }
              }
            } else {
              var keyField = getPropertyValue(tileObj, 'KeyType');
              var description = getPropertyValue(tileObj, 'Description');
              var name_2 = getPropertyValue(tileObj, 'Name');
              var tileType = getPropertyValue(tileObj, 'Type');
              var activity = getPropertyValue(tileObj, 'Activity');
              var detailAvailable = getPropertyValue(tileObj, 'DetailAvailable');
  
              if (!state.tilesJSONReady) {
                tilesJSON[name_2] = tileObj.Parameters;
                state.tilesSearchJSON.push({
                  keyField: keyField,
                  description: description,
                  tileType: tileType,
                  detailAvailable: detailAvailable,
                  activity: activity,
                  tileName: name_2,
                  name: description + (activity === 'Workspace' ? '' : keyField ? " (" + keyField + ")" : '')
                });
              }
            }
          }
        }
      }
    }
  
    sysproInterop.storeData('tilesJSON', JSON.stringify(tilesJSON));
    state.tilesJSONReady = true;
  } // Parse tiles, getting them in a structure suitable for the drill down menu UI
  
  function processTiles(tileWidgetFields) {
    var tilesJSON = {};
    var tilesListHTML = '';
    var duplicatesCheckList = [];
    console.log('tile ting');
  
    for (var key in tileWidgetFields) {
      if (tileWidgetFields.hasOwnProperty(key)) {
        tilesListHTML += "<li class=\"list-group-item\"><a href=\"#\">" + key.replace(/_/g, ' ') + "</a><ul class=\"list-group\">";
  
        for (var subkey in tileWidgetFields[key]) {
          if (tileWidgetFields[key].hasOwnProperty(subkey)) {
            var tileObj = tileWidgetFields[key][subkey];
  
            if (Array.isArray(tileObj)) {
              for (var tc = 0; tc < tileObj.length; tc++) {
                var fieldObject = tileObj[tc];
                var description = getPropertyValue(fieldObject, 'Description');
                var name_3 = getPropertyValue(fieldObject, 'Name');
                var tileType = getPropertyValue(fieldObject, 'Type');
                var activity = getPropertyValue(fieldObject, 'Activity');
                var keyField = activity === 'Workspace' ? name_3 : getPropertyValue(fieldObject, 'KeyType');
                var par1 = getPropertyValue(fieldObject, 'Par1');
                var kpiLevelFound = getPropertyValue(fieldObject, 'KpiLevelFound');
                var detailAvailable = getPropertyValue(fieldObject, 'DetailAvailable');
                var duplicateCheckName = name_3 + "-" + keyField;
  
                if (!duplicatesCheckList.includes(duplicateCheckName)) {
                  tilesListHTML += "<li data-bind=\"tileBind: selected.Widgets[0].TileTypeDetail\" class=\"list-group-item field-name\" id=\"" + name_3 + "\" data-tile-type=\"" + tileType + "\" data-tile-keyfield=\"" + keyField + "\" data-tile-name=\"" + name_3 + "\" data-detail-available=\"" + detailAvailable + "\" data-sub-type=\"" + par1 + "\" data-kpi-indicator=\"" + kpiLevelFound + "\"><i class=\"material-icons text-primary quickAddDragHandle\">open_with</i> " + description;
  
                  if (tileType === 'Program') {
                    tilesListHTML += keyField !== null && keyField !== 'null' && activity !== 'Workspace' ? " - " + keyField : '';
                    tilesListHTML += activity ? "<span class=\"program-activity\">" + activity + "</span>" : '';
                  }
  
                  tilesListHTML += '</li>';
  
                  if (!state.tilesJSONReady) {
                    tilesJSON[name_3] = fieldObject.Parameters;
                    state.tilesSearchJSON.push({
                      keyField: keyField,
                      description: description,
                      tileType: tileType,
                      detailAvailable: detailAvailable,
                      activity: activity,
                      tileName: name_3,
                      name: description + (activity === 'Workspace' ? '' : keyField ? " (" + keyField + ")" : '')
                    });
                  }
                }
  
                duplicatesCheckList.push(duplicateCheckName);
              }
            } else {
              var description = getPropertyValue(tileObj, 'Description');
              var name_4 = getPropertyValue(tileObj, 'Name');
              var tileType = getPropertyValue(tileObj, 'Type');
              var activity = getPropertyValue(tileObj, 'Activity');
              var keyField = activity === 'Workspace' ? name_4 : getPropertyValue(tileObj, 'KeyType');
              var par1 = getPropertyValue(tileObj, 'Par1');
              var kpiLevelFound = getPropertyValue(tileObj, 'KpiLevelFound');
              var detailAvailable = getPropertyValue(tileObj, 'DetailAvailable');
              tilesListHTML += "<li data-bind=\"tileBind: selected.Widgets[0].TileTypeDetail\" class=\"list-group-item field-name\" id=\"" + name_4 + "\" data-tile-type=\"" + tileType + "\" data-tile-keyfield=\"" + keyField + "\" data-tile-name=\"" + name_4 + "\" data-detail-available=\"" + detailAvailable + "\" data-sub-type=\"" + par1 + "\" data-kpi-indicator=\"" + kpiLevelFound + "\"><i class=\"material-icons text-primary quickAddDragHandle\">open_with</i> " + description;
  
              if (tileType === 'Program') {
                tilesListHTML += keyField !== null && keyField !== 'null' && activity !== 'Workspace' ? " - " + keyField : '';
                tilesListHTML += activity ? "<span class=\"program-activity\">" + activity + "</span>" : '';
              }
  
              tilesListHTML += '</li>';
  
              if (!state.tilesJSONReady) {
                tilesJSON[name_4] = tileObj.Parameters;
                state.tilesSearchJSON.push({
                  keyField: keyField,
                  description: description,
                  tileType: tileType,
                  detailAvailable: detailAvailable,
                  activity: activity,
                  tileName: name_4,
                  name: description + (activity === 'Workspace' ? '' : keyField ? " (" + keyField + ")" : '')
                });
              }
            }
  
            tilesListHTML += '</ul>';
          }
        }
  
        tilesListHTML += '</ul>';
      }
    }
  
    if (!state.tilesJSONReady) {
      sysproInterop.storeData('tilesJSON', JSON.stringify(tilesJSON));
      state.tilesJSONReady = true;
    }
  
    return tilesListHTML;
  } // Parse display, entry and link fields, getting them in a structure suitable for the drill down menu UI
  
  function processDataWidgetFields(dataWidgetFields) {
    var fieldsListHTML = '';
    var fieldsJSON = [];
  
    function dataFieldsParser(dataFieldObj, subsubkey, TypeName) {
      var keyAction = getPropertyValue(dataFieldObj, 'KeyAction');
      var fieldPath = keyAction || (getPropertyValue(dataFieldObj, 'FieldName') ? getPropertyValue(dataFieldObj, 'FieldName') : subsubkey);
      var caption = getCaption(dataFieldObj)[0];
      var shortCaption = getCaption(dataFieldObj)[2];
      var smartTag = getPropertyValue(dataFieldObj, 'HasSmartTag');
      var entryType = getPropertyValue(dataFieldObj, 'EntryType');
      var dataType = getPropertyValue(dataFieldObj, 'DataType');
      var formattedFieldPath = fieldPath.split(' ').join('_');
      var infoTooltip;
      var returnHTML = '';
  
      switch (entryType) {
        case '0':
          infoTooltip = 'Standard text entry field';
          break;
  
        case '1':
          infoTooltip = 'Standard text entry field';
          break;
  
        case '2':
          infoTooltip = 'Date entry field';
          break;
  
        case '3':
          infoTooltip = 'Email entry field';
          break;
  
        case '4':
          infoTooltip = 'Password entry field';
          break;
  
        case '5':
          infoTooltip = 'Long/paragraph text entry field';
          break;
  
        case '6':
          infoTooltip = 'Checkbox';
          break;
  
        case '7':
          infoTooltip = 'Radio button';
          break;
  
        case '8':
          infoTooltip = 'Dropdown';
          break;
  
        case '9':
          infoTooltip = 'Dropdown multiple select';
          break;
  
        case '10':
          infoTooltip = 'Browse';
          break;
  
        case '11':
          infoTooltip = 'Slider';
          break;
  
        case '12':
          infoTooltip = 'Dropdown editable';
          break;
  
        case '13':
          infoTooltip = 'Rich text';
          break;
  
        case '14':
          infoTooltip = 'File browse';
          break;
  
        case '15':
          infoTooltip = 'Disabled browse';
          break;
  
        case '16':
          infoTooltip = 'Date & time';
          break;
  
        case '17':
          infoTooltip = 'Time';
          break;
  
        case '18':
          infoTooltip = 'File browse & edit';
          break;
  
        case '19':
          infoTooltip = 'Colour picker';
          break;
  
        default:
          break;
      }
  
      returnHTML += "<li class=\"list-group-item quickAddDataWidget field-name\" id=\"" + formattedFieldPath + "\" data-bind=\"dataPath: selected.FieldPath\" data-field-path=\"Fields." + fieldPath + "\" data-smart-tag=\"" + smartTag + "\" data-key-action=\"" + keyAction + "\" data-data-type=\"" + dataType + "\" data-entry-type=\"" + entryType + "\" data-type-name=\"" + TypeName + "\" data-description=\"" + caption + "\"><i class=\"material-icons text-primary quickAddDragHandle\">open_with</i> ";
  
      if (infoTooltip !== null && infoTooltip !== '' && infoTooltip !== undefined) {
        returnHTML += "<i class=\"material-icons text-info\" data-tooltip=\"tooltip\" data-placement=\"right\" data-original-title=\"" + infoTooltip + "\">info</i> ";
      }
  
      returnHTML += caption + "<span class=\"btn btn-xs btn-primary pull-right quickAddEntryField sys-pd-l-5 sys-pd-r-5\">Quick add</span></li>";
  
      if (caption && !state.fieldsSearchReady) {
        fieldsJSON.push({
          fieldpath: "Fields." + fieldPath,
          smarttag: smartTag,
          datatype: dataType,
          name: shortCaption
        });
      }
  
      return returnHTML;
    }
  
    for (var key in dataWidgetFields) {
      if (dataWidgetFields.hasOwnProperty(key)) {
        var displayKey = void 0;
        var TypeName = void 0;
  
        if (key === 'LinksAvailable') {
          displayKey = 'Links';
          TypeName = 'LinkWidget';
        } else if (key === 'EntryFields') {
          displayKey = 'Entry Fields';
          TypeName = 'EntryDataWidget';
        } else if (key === 'DisplayFields') {
          displayKey = 'Display Fields';
          TypeName = 'DataWidget';
        }
  
        fieldsListHTML += "<li class=\"list-group-item " + key + "Section\"><a href=\"#\">" + displayKey.replace(/_/g, ' ') + "</a><ul class=\"list-group\">";
  
        for (var subkey in dataWidgetFields[key]) {
          if (dataWidgetFields[key].hasOwnProperty(subkey)) {
            fieldsListHTML += "<li class=\"list-group-item\"><a href=\"#\">" + subkey.replace(/_/g, ' ') + "</a><ul class=\"list-group\">";
  
            if (dataWidgetFields[key][subkey].hasOwnProperty('KeyAction') || dataWidgetFields[key][subkey].hasOwnProperty('Caption') || dataWidgetFields[key][subkey].hasOwnProperty('FieldName')) {
              fieldsListHTML += dataFieldsParser(dataWidgetFields[key][subkey], null, TypeName);
            } else {
              for (var subsubkey in dataWidgetFields[key][subkey]) {
                if (dataWidgetFields[key][subkey].hasOwnProperty(subsubkey)) {
                  fieldsListHTML += dataFieldsParser(dataWidgetFields[key][subkey][subsubkey], subsubkey, TypeName);
                }
              }
            }
  
            fieldsListHTML += '</ul>';
          }
        }
  
        fieldsListHTML += '</ul>';
      }
    } // Set up fields auto-complete search
  
  
    if (!state.fieldsSearchReady) {
      $('#dataWindow .typeahead-fields, #dataEditWindow .typeahead-fields').typeahead({
        source: fieldsJSON,
        autoSelect: true,
        afterSelect: selectFieldFromSearch
      });
      state.fieldsSearchReady = true;
    }
  
    fieldsListHTML += '<li class="divider">or</li><li data-bind="dataPath: selected.SubType" class="list-group-item field-name freeTextDataField" data-field-path="freeTextDataField" data-data-type="T">Free text field</li><li data-bind="dataPath: selected.FieldPath" class="OffCanvasLink list-group-item field-name" data-field-path="OffCanvasLink" data-type-name="ButtonWidget">Off-canvas section</li>';
    return fieldsListHTML;
  }
  function processToolbarWidgetFields(toolbarWidgetFields) {
    // Helper function for parsing toolbar widgets
    function parseToolbarWidgets(fieldObject) {
      var fieldName = getPropertyValue(fieldObject, 'FieldName');
      var actionType = getPropertyValue(fieldObject, 'ActionType');
      var caption = getCaption(fieldObject)[0];
      var shortCaption = getCaption(fieldObject)[1];
      var shorterCaption = getCaption(fieldObject)[2];
      var icon = getPropertyValue(fieldObject, 'Icon');
      var tooltip = getPropertyValue(fieldObject, 'Tooltip');
      var formattedCaption = shortCaption.split(' ').join('_');
      var returnHTML = '';
      returnHTML += '<li class="list-group-item field-name';
  
      if (caption === '(TOOLBAR GROUP)') {
        returnHTML += ' toolbar-group-heading';
      }
  
      returnHTML += "\" id=\"" + formattedCaption + "\" data-bind=\"toolbarFieldName: selected.FieldName\" data-field-name=\"Toolbar." + fieldName + "\" data-toolbar-widget-type=\"" + actionType + "\" data-toolbar-icon=\"" + icon + "\" data-caption=\"" + shortCaption + "\" data-shortcaption=\"" + shorterCaption + "\" data-toolbar-tooltip=\"" + tooltip + "\">";
  
      if (icon) {
        returnHTML += "<i class=\"material-icons text-primary\">" + icon + "</i> ";
      }
  
      returnHTML += caption + "<span class=\"btn btn-xs btn-primary pull-right quickAddEntryField sys-pd-l-5 sys-pd-r-5\">Quick add</span></li>";
  
      if (caption && !state.toolbarFieldsSearchReady) {
        toolbarFieldsJSON.push({
          fieldname: 'Toolbar.' + fieldName,
          actiontype: actionType,
          name: shorterCaption
        });
      }
  
      return returnHTML;
    }
  
    var toolbarFieldsJSON = [];
    var toolbarListHTML = ''; // Parse toolbar actions, getting them in a structure suitable for the drill down menu UI
  
    for (var key in toolbarWidgetFields) {
      if (toolbarWidgetFields.hasOwnProperty(key)) {
        var displayKey = key;
        toolbarListHTML += "<li class=\"list-group-item " + key + "Section\"><a href=\"#\">" + displayKey.replace(/_/g, ' ') + "</a><ul class=\"list-group\">";
  
        if (Array.isArray(toolbarWidgetFields[key])) {
          for (var subkey in toolbarWidgetFields[key]) {
            if (toolbarWidgetFields[key].hasOwnProperty(subkey)) {
              toolbarListHTML += parseToolbarWidgets(toolbarWidgetFields[key][subkey]);
            }
          }
        } else {
          toolbarListHTML += parseToolbarWidgets(toolbarWidgetFields[key]);
        }
  
        toolbarListHTML += '</ul>';
      }
    } // Set up fields auto-complete search
  
  
    if (!state.toolbarFieldsSearchReady) {
      $('#toolbarWindow .typeahead-fields, #toolbarEditWindow .typeahead-fields').typeahead({
        source: toolbarFieldsJSON,
        autoSelect: true,
        afterSelect: selectToolbarFieldFromSearch
      });
      state.toolbarFieldsSearchReady = true;
    }
  
    toolbarListHTML += '<li class="divider">or</li><li class="list-group-item field-name ToolbarDropdown" data-bind="toolbarFieldName: selected.TypeName" data-field-name="ToolbarDropdown" data-toolbar-widget-type="4" data-toolbar-icon="" data-caption="Dropdown Menu" data-toolbar-tooltip="">Dropdown Menu</li><li class="list-group-item field-name ToolbarSubDropdown" data-bind="toolbarFieldName: selected.TypeName" data-field-name="ToolbarSubDropdown" data-toolbar-widget-type="4" data-toolbar-icon="" data-caption="Dropdown Sub-menu" data-toolbar-tooltip="">Dropdown Sub-menu</li><li class="list-group-item field-name OffCanvasToolbarItem" data-bind="toolbarFieldName: selected.FieldName" data-field-name="ButtonWidget" data-toolbar-widget-type="0" data-toolbar-icon="" data-caption="Off-Canvas Section" data-toolbar-tooltip="">Off-canvas section</li>';
    return toolbarListHTML;
  }
  function processChartWidgetFields(chartsFields) {
    var chartsListHTML = ''; // Parse charts, getting them in a structure suitable for the drill down menu UI
  
    for (var key in chartsFields) {
      if (chartsFields.hasOwnProperty(key)) {
        var fieldObject = chartsFields[key];
        var fieldCategory = getPropertyValue(fieldObject, 'Category');
  
        if (fieldCategory === 'Charts') {
          var fieldPath = key;
          var caption = getCaption(fieldObject)[0];
          var formattedFieldPath = fieldPath.split(' ').join('_');
          chartsListHTML += '<a class="list-group-item field-name';
          chartsListHTML += "\" id=\"" + formattedFieldPath + "\" data-bind=\"dataPath: selected.FieldPath\" data-field-path=\"Fields." + fieldPath + "\">" + caption + "</a>";
        }
      }
    }
  
    return chartsListHTML;
  } // Process tile options
  
  function processTileOptions(tilesJSON, tileName) {
    var tileOptionsHTML = '';
  
    function processIndividualTileOptions(tile) {
      var tileOptionsKCHTML = '';
      var tileOptionsNOKCHTML = '';
  
      if (tilesJSON[tile] !== undefined && tilesJSON[tile].hasOwnProperty('Parameter')) {
        tileOptionsHTML += "<div class=\"" + tile + "Parameters tile-parameter-wrapper\" style=\"display:none;\">";
  
        if (tilesJSON[tile].Parameter.length) {
          for (var tp = 0; tp < tilesJSON[tile].Parameter.length; tp++) {
            tilesJSON[tile].Parameter[tp].ParamName = tilesJSON[tile].Parameter[tp].ParamName || tilesJSON[tile].Parameter[tp].SysproKeyColumn;
            tilesJSON[tile].Parameter[tp].ParamDescription = tilesJSON[tile].Parameter[tp].ParamDescription || tilesJSON[tile].Parameter[tp].SysproKeyColumn || tilesJSON[tile].Parameter[tp].ParamName;
  
            if (tilesJSON[tile].Parameter[tp].SysproKeyColumn !== '' && tilesJSON[tile].Parameter[tp].SysproKeyColumn !== undefined && tilesJSON[tile].Parameter[tp].SysproKeyColumn !== null) {
              if (tilesJSON[tile].Parameter[tp].ParamType === 'A') {
                tileOptionsKCHTML += "<p class=\"tile-text-option-label\">" + tilesJSON[tile].Parameter[tp].ParamDescription + "</p>";
                tileOptionsKCHTML += "<div class=\"form-group\"><input data-bind=\"value: selected.Widgets[0].TileParameters." + tilesJSON[tile].Parameter[tp].ParamName + "\" type=\"text\" class=\"form-control\" name=\"" + tilesJSON[tile].Parameter[tp].ParamName + "\" id=\"" + tilesJSON[tile].Parameter[tp].ParamName + "\" autocomplete=\"off\" placeholder=\"\"></div>";
              } else if (tilesJSON[tile].Parameter[tp].ParamType === 'L') {
                tileOptionsKCHTML += "<p class=\"tile-list-option-label\">" + tilesJSON[tile].Parameter[tp].ParamDescription + "</p>";
                tileOptionsKCHTML += "<div class=\"form-group\"><select data-bind=\"value: selected.Widgets[0].TileParameters." + tilesJSON[tile].Parameter[tp].ParamName + "\" class=\"form-control dropdown-select\" name=\"" + tilesJSON[tile].Parameter[tp].ParamName + "\" id=\"" + tilesJSON[tile].Parameter[tp].ParamName + "\" autocomplete=\"off\">";
                $.each(tilesJSON[tile].Parameter[tp].ParamOptions.ParamOption, function (i, option) {
                  tileOptionsKCHTML += "<option value=\"" + option + "\">" + option + "</option>";
                });
                tileOptionsKCHTML += '</select></div>';
              }
            } else if (tilesJSON[tile].Parameter[tp].ParamType === 'A') {
              tileOptionsNOKCHTML += "<p class=\"tile-text-option-label\">" + tilesJSON[tile].Parameter[tp].ParamDescription + "</p>";
              tileOptionsNOKCHTML += "<div class=\"form-group\"><input data-bind=\"value: selected.Widgets[0].TileParameters." + tilesJSON[tile].Parameter[tp].ParamName + "\" type=\"text\" class=\"form-control\" name=\"" + tilesJSON[tile].Parameter[tp].ParamName + "\" id=\"" + tilesJSON[tile].Parameter[tp].ParamName + "\" autocomplete=\"off\" placeholder=\"\"></div>";
            } else if (tilesJSON[tile].Parameter[tp].ParamType === 'L') {
              tileOptionsNOKCHTML += "<p class=\"tile-list-option-label\">" + tilesJSON[tile].Parameter[tp].ParamDescription + "</p>";
              tileOptionsNOKCHTML += "<div class=\"form-group\"><select data-bind=\"value: selected.Widgets[0].TileParameters." + tilesJSON[tile].Parameter[tp].ParamName + "\" class=\"form-control dropdown-select\" name=\"" + tilesJSON[tile].Parameter[tp].ParamName + "\" id=\"" + tilesJSON[tile].Parameter[tp].ParamName + "\" autocomplete=\"off\">";
              $.each(tilesJSON[tile].Parameter[tp].ParamOptions.ParamOption, function (i, option) {
                tileOptionsNOKCHTML += "<option value=\"" + option + "\">" + option + "</option>";
              });
              tileOptionsNOKCHTML += '</select></div>';
            }
          }
        } else {
          tilesJSON[tile].Parameter.ParamName = tilesJSON[tile].Parameter.ParamName || tilesJSON[tile].Parameter.SysproKeyColumn;
          tilesJSON[tile].Parameter.ParamDescription = tilesJSON[tile].Parameter.ParamDescription || tilesJSON[tile].Parameter.SysproKeyColumn || tilesJSON[tile].Parameter.ParamName;
  
          if (tilesJSON[tile].Parameter.SysproKeyColumn !== '' && tilesJSON[tile].Parameter.SysproKeyColumn !== undefined && tilesJSON[tile].Parameter.SysproKeyColumn !== null) {
            if (tilesJSON[tile].Parameter.ParamType === 'A') {
              tileOptionsKCHTML += "<p class=\"tile-text-option-label\">" + tilesJSON[tile].Parameter.ParamDescription + "</p>";
              tileOptionsKCHTML += "<div class=\"form-group\"><input data-bind=\"value: selected.Widgets[0].TileParameters." + tilesJSON[tile].Parameter.ParamName + "\" type=\"text\" class=\"form-control\" name=\"" + tilesJSON[tile].Parameter.ParamName + "\" id=\"" + tilesJSON[tile].Parameter.ParamName + "\" autocomplete=\"off\" placeholder=\"\"></div>";
            } else if (tilesJSON[tile].Parameter.ParamType === 'L') {
              tileOptionsKCHTML += "<p class=\"tile-list-option-label\">" + tilesJSON[tile].Parameter.ParamDescription + "</p>";
              tileOptionsKCHTML += "<div class=\"form-group\"><select data-bind=\"value: selected.Widgets[0].TileParameters." + tilesJSON[tile].Parameter.ParamName + "\" class=\"form-control dropdown-select\" name=\"" + tilesJSON[tile].Parameter.ParamName + "\" id=\"" + tilesJSON[tile].Parameter.ParamName + "\" autocomplete=\"off\">";
              $.each(tilesJSON[tile].Parameter.ParamOptions.ParamOption, function (i, option) {
                tileOptionsKCHTML += "<option value=\"" + option + "\">" + option + "</option>";
              });
              tileOptionsKCHTML += '</select></div>';
            }
          } else if (tilesJSON[tile].Parameter.ParamType === 'A') {
            tileOptionsNOKCHTML += "<p class=\"tile-text-option-label\">" + tilesJSON[tile].Parameter.ParamDescription + "</p>";
            tileOptionsNOKCHTML += "<div class=\"form-group\"><input data-bind=\"value: selected.Widgets[0].TileParameters." + tilesJSON[tile].Parameter.ParamName + "\" type=\"text\" class=\"form-control\" name=\"" + tilesJSON[tile].Parameter.ParamName + "\" id=\"" + tilesJSON[tile].Parameter.ParamName + "\" autocomplete=\"off\" placeholder=\"\"></div>";
          } else if (tilesJSON[tile].Parameter.ParamType === 'L') {
            tileOptionsNOKCHTML += "<p class=\"tile-list-option-label\">" + tilesJSON[tile].Parameter.ParamDescription + "</p>";
            tileOptionsNOKCHTML += "<div class=\"form-group\"><select data-bind=\"value: selected.Widgets[0].TileParameters." + tilesJSON[tile].Parameter.ParamName + "\" class=\"form-control dropdown-select\" name=\"" + tilesJSON[tile].Parameter.ParamName + "\" id=\"" + tilesJSON[tile].Parameter.ParamName + "\" autocomplete=\"off\">";
            $.each(tilesJSON[tile].Parameter.ParamOptions.ParamOption, function (i, option) {
              tileOptionsNOKCHTML += "<option value=\"" + option + "\">" + option + "</option>";
            });
            tileOptionsNOKCHTML += '</select></div>';
          }
        }
  
        if (tileOptionsKCHTML !== '') {
          var collapsibleID1 = sysproInterop.generateUUID();
          var collapsibleID2 = sysproInterop.generateUUID();
          var collapsibleID3 = sysproInterop.generateUUID();
          tileOptionsHTML += tileOptionsKCHTML;
          tileOptionsHTML += "<div class=\"panel-group\" id=\"" + collapsibleID1 + "\" role=\"tablist\" aria-multiselectable=\"true\"><div class=\"panel sys-widget sys-box-shadow-off\"><h4 class=\"sys-mg-off\" role=\"tab\" id=\"" + collapsibleID3 + "\"><a class=\"sys-fg-lighten panel-heading sys-block sys-bg-white sys-fg-inverse  collapsed\" data-toggle=\"collapse\" data-parent=\"#" + collapsibleID1 + "\" href=\"#" + collapsibleID2 + "\" ariaexpanded=\"false\" aria-controls=\"" + collapsibleID2 + "\">Additional parameters <i class=\"material-icons pull-right collapsible-open-icon\">keyboard_arrow_down</i><i class=\"material-icons pull-right collapsible-close-icon\">keyboard_arrow_up</i></a></h4><div class=\"panel-collapse collapse \" id=\"" + collapsibleID2 + "\" role=\"tabpanel\" aria-labelledby=\"" + collapsibleID3 + "\"><div class=\"panel-body sys-block sys-box-shadow-off sys-pd-off\"><div class=\"row sys-tbl\" data-row=\"0\"><div class=\"col-xs-12 sys-bg-white \">";
          tileOptionsHTML += tileOptionsNOKCHTML;
          tileOptionsHTML += '</div></div></div></div></div></div>';
        } else {
          tileOptionsHTML += tileOptionsNOKCHTML;
        }
  
        tileOptionsHTML += '</div>';
      }
    }
  
    if (tileName) {
      processIndividualTileOptions(tileName);
    } else {
      for (var tile in tilesJSON) {
        if (Object.prototype.hasOwnProperty.call(tilesJSON, tile)) {
          processIndividualTileOptions(tile);
        }
      }
    }
  
    return tileOptionsHTML;
  }
  // CONCATENATED MODULE: ./finaljs/modules/colourPicker.js
  // Helper function to set correct colour on colour pickers
  function setColourPicker(currentWindow) {
    $(currentWindow + " .colour-picker-dot").each(function (_idx, colourPickerDot) {
      var colourClass = $(colourPickerDot).attr('class').match(/\bsys-bg\S+/g) ? $(colourPickerDot).attr('class').match(/\bsys-bg\S+/g)[0] : '';
      var colourGroupWrap = $(colourPickerDot).next('.colour-group-wrap');
      var colourGroup = colourGroupWrap.find('.colour-group');
      var initDotColour;
      $(colourPickerDot).removeClass(colourClass);
  
      if (colourGroup.find("input[type='radio']:checked").length > 0) {
        var checkedColourClassList = colourGroup.find("input[type='radio']:checked").parent('label').attr('class').split(/\s+/);
        $.each(checkedColourClassList, function (_idx, item) {
          if (item.includes('sys-bg-')) {
            initDotColour = item;
          }
        });
      }
  
      $(colourPickerDot).addClass(initDotColour || 'sys-bg-primary');
    });
  } // Helper function to set correct colour picker dot colour in tile Windows
  
  function setColourPickerDotColour(activeWindow, changedElement, optionTypeClass) {
    if ([0, 1, 2, 3, 4, 7, 8].includes($(changedElement).val())) {
      $(activeWindow + " " + optionTypeClass + " .btn-radio").each(function (_idx, elem) {
        $(elem).toggleClass('disabled', !$(elem).hasClass('sys-bg-white'));
        $(elem).toggleClass('active', $(elem).hasClass('sys-bg-white'));
        $(elem).find('input').prop('checked', $(elem).hasClass('sys-bg-white'));
      });
      var colourPickerDot = $(changedElement).closest('.col-xs-6').siblings('.col-xs-6').find('.colour-picker-dot');
      var colourClass = colourPickerDot.attr('class').match(/\bsys-bg\S+/g)[0];
      colourPickerDot.removeClass(colourClass).addClass('sys-bg-white');
    } else if ([5, 9].includes($(changedElement).val())) {
      $(activeWindow + " " + optionTypeClass + " .btn-radio.sys-bg-white").addClass('disabled');
      $(activeWindow + " " + optionTypeClass + " .btn-radio.sys-bg-white").addClass('disabled');
      $(activeWindow + " " + optionTypeClass + " .btn-radio").each(function (_idx, elem) {
        if ($(elem).hasClass('sys-bg-white') || $(elem).hasClass('sys-bg-very-light-gray')) {
          $(elem).addClass('disabled');
          $(elem).removeClass('active');
          $(elem).find('input').prop('checked', false);
        } else {
          $(elem).removeClass('disabled');
          $(activeWindow + " " + optionTypeClass + " .btn-radio.sys-bg-inverse").find('input').prop('checked', true);
          $(activeWindow + " " + optionTypeClass + " .btn-radio.sys-bg-inverse").addClass('active');
        }
      });
      var colourPickerDot = $(changedElement).closest('.col-xs-6').siblings('.col-xs-6').find('.colour-picker-dot');
      var colourClass = colourPickerDot.attr('class').match(/\bsys-bg\S+/g)[0];
      colourPickerDot.removeClass(colourClass).addClass('sys-bg-inverse');
    } else {
      $(activeWindow + " " + optionTypeClass + " .btn-radio").removeClass('disabled');
    }
  }
  // CONCATENATED MODULE: ./finaljs/modules/builderWindowsUI.js
  var builderWindowsUI_assign = undefined && undefined.__assign || function () {
    builderWindowsUI_assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
  
        for (var p in s) {
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
      }
  
      return t;
    };
  
    return builderWindowsUI_assign.apply(this, arguments);
  }; /// <reference path="../typings.d.ts" />
  
  
  
  
  
  
  
  
  
  
  
  
  var layoutWidgetSelect = $('.widgetSelection');
  var layoutWidgetSelectPlaceholder; // Setup tab number slider
  
  function setupTabNumSlider(currentWindow) {
    var tabNumSlider = document.querySelector(currentWindow + " .tab_widget_slider");
    var tabNumInput = $(currentWindow + " [name='tab_widget_number']");
  
    function updateSlider(values, handle) {
      var value = values[handle];
      tabNumInput.val(parseInt(value)).change();
      $(currentWindow + " .tab-title-input-wrapper").each(function (idx, elem) {
        $(elem).toggle(value > idx);
      });
    }
  
    if (currentWindow === '#rowEditWindow' && tabNumSlider && tabNumSlider.noUiSlider && tabNumInput.val()) {
      tabNumSlider.noUiSlider.set(tabNumInput.val());
      updateSlider([tabNumInput.val()], 0);
    } else if (!tabNumSlider) {
      if (currentWindow === '#rowEditWindow') {
        $(currentWindow + " .tab-title-input-wrapper").each(function (idx, elem) {
          $(elem).toggle(tabNumInput.val() > idx);
        });
      }
  
      tabNumInput.off().on('change keyup', function () {
        if (currentWindow === '#rowEditWindow') window.viewModel.selected.TabsNum = tabNumInput.val();
        $(currentWindow + " .tab-title-input-wrapper").each(function (idx, elem) {
          $(elem).toggle(tabNumInput.val() > idx);
        });
      });
    }
  
    if (tabNumSlider && tabNumSlider.noUiSlider) {
      tabNumSlider.noUiSlider.off('slide');
      tabNumSlider.noUiSlider.on('slide', updateSlider);
    }
  }
  
  function hideShowWindowElements(currentRowWindow, tileSection, title, joined, border, listview, linklist, noborders, card, chart, separator, size, tabs, columns) {
    $(currentRowWindow + " .tile_section_options").toggle(tileSection);
    $(currentRowWindow + " .widget_title_options").toggle(title);
    $(currentRowWindow + " .widget_joined_options").toggle(joined);
    $(currentRowWindow + " .widget_border_options").toggle(border);
    $(currentRowWindow + " .widget_listview_options").toggle(listview);
    $(currentRowWindow + " .widget_linklist_options").toggle(linklist);
    $(currentRowWindow + " #no_borders").toggle(noborders);
    $(currentRowWindow + " .widget_card_options").toggle(card);
    $(currentRowWindow + " .chart-selection-title").toggle(chart);
    $(currentRowWindow + " .widget_chart_options").toggle(chart);
    $(currentRowWindow + " .widget_size_options").toggle(size);
    $(currentRowWindow + " .widget_separator_options").toggle(separator);
    $(currentRowWindow + " .widget_tab_options").toggle(tabs);
    $(currentRowWindow + " .widget_column_options").toggle(columns);
    $(currentRowWindow + " .display_only_form_options").toggle(columns);
  
    if (separator) {
      $(currentRowWindow + " #collapsible_title_styles").collapse('hide');
      $(currentRowWindow + " #widget_collapsible").prop('checked', false);
      $(currentRowWindow + " #widget_collapsible").parent('.btn-checkbox').removeClass('active');
    }
  } // Return preview Layout Widget HTML
  
  
  function previewLayoutWidgetHTML(currentRowWindow) {
    var previewLayoutWidget = setupLayoutWidget(currentRowWindow);
    var serialisedLayoutWidget;
  
    if (previewLayoutWidget.DisplayStyle === 9) {
      serialisedLayoutWidget = builderWindowsUI_assign(builderWindowsUI_assign({}, previewLayoutWidget), {
        Tabs: previewLayoutWidget.Tabs.data().toJSON()
      });
    } else {
      serialisedLayoutWidget = previewLayoutWidget.toJSON();
    }
  
    sysproInterop.getHtmlFromModel('Widget', serialisedLayoutWidget, function (result) {
      var previewWidgetHTMLjQuery = $($.trim(result));
      previewWidgetHTMLjQuery.find('.remove-row-section, .edit-row-section, .drag-row-section, .layout-widget-options').remove();
      $('.layout-widget-preview-wrapper').show();
      $('.layout-widget-preview-title').show();
      $(currentRowWindow + " .layout-widget-preview").empty().append(previewWidgetHTMLjQuery);
      sysproInterop.performBind(state.bindableFieldsData, true, currentRowWindow + " .layout-widget-preview");
      sizeTiles();
    }, '', '', '', '', function (error) {
      console.log(error);
    }, true);
  } // Helper function to show correct border options
  
  function showCorrectBorderOptions(widgetType, currentRowWindow) {
    $(currentRowWindow + " .all_borders").toggle(widgetType === 'Joined');
    $(currentRowWindow + " .inner_borders").toggle(widgetType === 'Joined');
  
    if (widgetType !== 'Joined' && ($(currentRowWindow + " input[name='border_options']").val() == 3 || $(currentRowWindow + " input[name='border_options']").val() == 2 || $(currentRowWindow + " input[name='border_options']").val() == 1)) {
      $(currentRowWindow + " #border_options_2").prop('checked', false);
      $(currentRowWindow + " #border_options_2").parent().removeClass('active');
      $(currentRowWindow + " #border_options_3").prop('checked', false);
      $(currentRowWindow + " #border_options_3").parent().removeClass('active');
      $(currentRowWindow + " #border_options_1").prop('checked', false);
      $(currentRowWindow + " #border_options_1").parent().removeClass('active');
      $(currentRowWindow + " #border_options_0").prop('checked', true);
      $(currentRowWindow + " #border_options_0").parent().addClass('active');
    }
  } // Helper function to show correct column layout options
  
  
  function showCorrectColumnLayoutOptions(widgetType, currentRowWindow) {
    var columnLayout = $(currentRowWindow + " [name=\"column_layout\"]:checked").val();
    $(currentRowWindow + " .col_widths_2").toggle(widgetType === '2col_form_widget');
    $(currentRowWindow + " .col_widths_3").toggle(widgetType === '3col_form_widget');
    $(currentRowWindow + " .display-form-column-2").toggle(widgetType === '2col_form_widget' || widgetType === '3col_form_widget');
    $(currentRowWindow + " .display-form-column-3").toggle(widgetType === '3col_form_widget');
  
    if (widgetType === '2col_form_widget') {
      if (!['2colequal', '2colleft', '2colright'].includes(columnLayout)) {
        $(currentRowWindow + " [name=\"column_layout\"]").prop('checked', false);
        $(currentRowWindow + " [name=\"column_layout\"]").parent().removeClass('active');
        $(currentRowWindow + " [name=\"column_layout\"][value=\"2colequal\"]").prop('checked', true);
        $(currentRowWindow + " [name=\"column_layout\"][value=\"2colequal\"]").parent().addClass('active');
      }
    } else if (widgetType === '3col_form_widget') {
      if (!['3colequal', '3colleft', '3colright', '3colmiddle'].includes(columnLayout)) {
        $(currentRowWindow + " [name=\"column_layout\"]").prop('checked', false);
        $(currentRowWindow + " [name=\"column_layout\"]").parent().removeClass('active');
        $(currentRowWindow + " [name=\"column_layout\"][value=\"3colequal\"]").prop('checked', true);
        $(currentRowWindow + " [name=\"column_layout\"][value=\"3colequal\"]").parent().addClass('active');
      }
    }
  } // Helper function to chenge visible styling options in the layout widget windows
  
  
  function changeLayoutOptions(currentRowWindow, widgetType, generalType) {
    console.log('change layout options');
  
    if (currentRowWindow === '#rowWindow') {
      $(currentRowWindow + " .layout-section-styling-title").show();
    }
  
    if (generalType === 'Sparkline') {
      $(currentRowWindow + " .line-bar-options").toggle(widgetType === 'line_chart_widget' || widgetType === 'column_chart_widget');
      $(currentRowWindow + " .widget_chart_options .fieldsPanelBar").show();
    }
  
    if (widgetType === 'row_1_col') {
      if (currentRowWindow === '#rowWindow') {
        $(currentRowWindow + " .layout-section-styling-title .step-number").text('3');
      }
  
      hideShowWindowElements(currentRowWindow, false, true, false, true, false, false, true, false, false, false, false, false, false);
    } else if (widgetType === 'row_2_col' || widgetType === 'row_3_col' || widgetType === 'row_4_col' || widgetType === 'row_4_block' || widgetType === 'row_6_block') {
      if (currentRowWindow === '#rowWindow') {
        $(currentRowWindow + " .layout-section-styling-title .step-number").text('3');
      }
  
      hideShowWindowElements(currentRowWindow, false, true, true, true, false, false, true, false, false, false, false, false, false);
    } else if (widgetType === 'row_list_view') {
      if (currentRowWindow === '#rowWindow') {
        $(currentRowWindow + " .layout-section-styling-title .step-number").text('3');
      } else if (window.viewModel.selected.SubType === true) {
        window.viewModel.set('selected.SubType', 'Striped');
      }
  
      hideShowWindowElements(currentRowWindow, false, true, false, true, true, true, false, false, false, false, false, false, false);
      $(currentRowWindow + " .all_borders").show();
      $(currentRowWindow + " .inner_borders").show();
      $(currentRowWindow + " .outer_borders").show();
    } else if (widgetType === 'row_link_list') {
      if (currentRowWindow === '#rowWindow') {
        $(currentRowWindow + " .layout-section-styling-title .step-number").text('3');
      } else if (window.viewModel.selected.SubType === true) {
        window.viewModel.set('selected.SubType', 'Compact');
      }
  
      showCorrectBorderOptions('Separate', currentRowWindow);
      hideShowWindowElements(currentRowWindow, false, true, false, false, false, true, true, false, false, false, false, false, false);
    } else if (generalType === 'Card') {
      if (currentRowWindow === '#rowWindow') {
        $(currentRowWindow + " .layout-section-styling-title .step-number").text('3');
      }
  
      hideShowWindowElements(currentRowWindow, false, false, false, false, false, false, true, true, false, false, false, false, false);
    } else if (generalType === 'GridList' || generalType === 'TreeList' || generalType === 'TreeView' || generalType === 'RichTextWidget') {
      if (currentRowWindow === '#rowWindow') {
        $(currentRowWindow + " .layout-section-styling-title .step-number").text('3');
      }
  
      hideShowWindowElements(currentRowWindow, false, true, false, true, false, false, true, false, false, false, true, false, false);
    } else if (generalType === 'HarmonyWidget') {
      hideShowWindowElements(currentRowWindow, false, false, false, false, false, false, false, false, false, false, false, false, false);
    } else if (generalType === 'Sparkline') {
      if (currentRowWindow === '#rowWindow') {
        $(currentRowWindow + " .layout-section-styling-title .step-number").text('4'); // SYSPRO_VB.chartsPanelBar.select("#chart-fields-list .list-group li:first-child");
  
        $('#chart-fields-list a.field-name:first-child').addClass('active');
      }
  
      hideShowWindowElements(currentRowWindow, false, true, false, false, false, false, true, false, true, false, true, false, false);
    } else if (widgetType === 'row_carousel') {
      if (currentRowWindow === '#rowWindow') {
        $(currentRowWindow + " .layout-section-styling-title .step-number").text('3');
      }
  
      hideShowWindowElements(currentRowWindow, false, true, false, false, false, false, true, false, false, false, false, false, false);
    } else if (widgetType === 'row_tab_widget') {
      if (currentRowWindow === '#rowWindow') {
        $(currentRowWindow + " .layout-section-styling-title .step-number").text('3');
      }
  
      $(currentRowWindow + " .all_borders").hide();
      $(currentRowWindow + " .inner_borders").hide();
      hideShowWindowElements(currentRowWindow, false, true, false, true, false, false, true, false, false, false, false, true, false);
      showCorrectBorderOptions('Separate', currentRowWindow);
    } else if (widgetType === 'tiles_section') {
      if (currentRowWindow === '#rowWindow') {
        $(currentRowWindow + " .layout-section-styling-title .step-number").text('2');
        $('#addLayoutWidgetButton').removeClass('disabled');
        $('#addLayoutWidgetButton').prop('disabled', false);
        $('#addLayoutButtonPopoverWrap').tooltip('destroy');
        $('#addLayoutButtonPopoverWrap').removeClass('disabled');
      }
  
      hideShowWindowElements(currentRowWindow, true, true, false, false, false, false, true, false, false, false, false, false, false);
    } else if (widgetType === 'row_separator') {
      if (currentRowWindow === '#rowWindow') {
        $('#addLayoutWidgetButton').removeClass('disabled');
        $('#addLayoutWidgetButton').prop('disabled', false);
        $('#addLayoutButtonPopoverWrap').tooltip('destroy');
        $('#addLayoutButtonPopoverWrap').removeClass('disabled');
      }
  
      hideShowWindowElements(currentRowWindow, false, false, false, false, false, false, false, false, false, true, false, false, false);
    } else if (widgetType === '1col_form_widget' || widgetType === '2col_form_widget' || widgetType === '3col_form_widget') {
      if (currentRowWindow === '#rowWindow') {
        $('#addLayoutWidgetButton').removeClass('disabled');
        $('#addLayoutWidgetButton').prop('disabled', false);
        $('#addLayoutButtonPopoverWrap').tooltip('destroy');
        $('#addLayoutButtonPopoverWrap').removeClass('disabled');
      }
  
      $(currentRowWindow + " .all_borders").hide();
      $(currentRowWindow + " .inner_borders").hide();
      hideShowWindowElements(currentRowWindow, false, true, false, true, false, false, true, false, false, false, false, false, true);
      showCorrectBorderOptions('Separate', currentRowWindow);
      showCorrectColumnLayoutOptions(widgetType, currentRowWindow);
      $(currentRowWindow + " .widget_column_options").toggle(widgetType !== '1col_form_widget');
    } else if (widgetType === 'custom_text') {
      if (currentRowWindow === '#rowWindow') {
        $('#addLayoutWidgetButton').removeClass('disabled');
        $('#addLayoutWidgetButton').prop('disabled', false);
        $('#addLayoutButtonPopoverWrap').tooltip('destroy');
        $('#addLayoutButtonPopoverWrap').removeClass('disabled');
      }
  
      $(currentRowWindow + " .all_borders").hide();
      $(currentRowWindow + " .inner_borders").hide();
      hideShowWindowElements(currentRowWindow, false, true, false, false, false, false, true, false, false, false, false, false, false);
    }
  
    previewLayoutWidgetHTML(currentRowWindow);
  } // Set up Layout Widget Windows UI
  
  
  function setupRowWindow(currentRowWindow, parentTabBool) {
    var elementPrefix = currentRowWindow === '#rowEditWindow' ? 'edit_' : ''; // Initialise the collapsible title stylings collapsible options section, and hide it initially
  
    $(currentRowWindow + " #" + elementPrefix + "collapsible_title_styles").collapse({
      toggle: false
    }); // tab widget slider
  
    setupTabNumSlider(currentRowWindow);
    showCorrectBorderOptions($(currentRowWindow + " input[name='blocks_joined']:checked").val(), currentRowWindow);
    showCorrectColumnLayoutOptions($(currentRowWindow + " input[name='row_options']:checked").val(), currentRowWindow); // Display correct styling options for the different layout widgets
  
    function onRowOptionsChange() {
      var generalTypeElement = document.querySelector(currentRowWindow + " input[name=\"row_options\"]:checked");
      var generalType = generalTypeElement.getAttribute('data-layout-widget-type');
      var widgetType = $(currentRowWindow + " input[name='row_options']:checked").val();
      changeLayoutOptions(currentRowWindow, widgetType, generalType); // If the form is valid, the Validator will return true
  
      $('#addLayoutWidgetButton').removeClass('disabled');
      $('#addLayoutWidgetButton').prop('disabled', false);
      $('#addLayoutButtonPopoverWrap').tooltip('destroy');
      $('#addLayoutButtonPopoverWrap').removeClass('disabled');
    }
  
    function onTileTabShown() {
      $(currentRowWindow + " #tiles_section").prop('checked', true);
      changeLayoutOptions(currentRowWindow, 'tiles_section', 'LayoutWidget');
    }
  
    function onWidgetOptionTabShow(e) {
      $($(e.target).attr('href')).find('.row_options').prop('checked', false);
      $($(e.target).attr('href')).find('label.btn-radio.active').removeClass('active');
      $(currentRowWindow + " .chart-selection-title").hide();
      $(currentRowWindow + " .layout-section-styling-title").hide();
      $(currentRowWindow + " .widget_title_options").hide();
      $(currentRowWindow + " .widget_joined_options").hide();
      $(currentRowWindow + " .widget_border_options").hide();
      $(currentRowWindow + " .widget_listview_options").hide();
      $(currentRowWindow + " .tile_section_options").hide();
      $(currentRowWindow + " .widget_size_options").hide();
      $(currentRowWindow + " .widget_card_options").hide();
      $(currentRowWindow + " .widget_chart_options").hide();
      $(currentRowWindow + " .widget_column_options").hide();
      $(currentRowWindow + " input[name=\"row_options\"]:checked").prop('checked', false);
      $(currentRowWindow + " input[name=\"row_options\"]:checked").parent().removeClass('active');
      $(currentRowWindow + " #collapsible_title_styles").collapse('hide');
      $(currentRowWindow + " #widget_collapsible").prop('checked', false);
      $(currentRowWindow + " #widget_collapsible").parent().removeClass('active');
      $(currentRowWindow + " #default_open").prop('checked', false);
      $(currentRowWindow + " #default_open").parent().removeClass('active');
      $(currentRowWindow + " .layout-widget-preview").empty();
      showCorrectBorderOptions($(currentRowWindow + " input[name='blocks_joined']:checked").val(), currentRowWindow);
    }
  
    if (currentRowWindow === '#rowWindow') {
      $(currentRowWindow + " input").each(function (_idx, elem) {
        $(elem).parent('label').toggleClass('active', $(elem).prop('checked'));
      });
      $(currentRowWindow + " .tab-widget-option").toggle(parentTabBool);
      $(currentRowWindow + " input[name='row_options']").on('change', onRowOptionsChange);
      $('a#tile_layout_section').on('shown.bs.tab', onTileTabShown);
      $(currentRowWindow + " a.widget-option-tab").on('show.bs.tab', onWidgetOptionTabShow);
    } else {
      if (document.querySelector(currentRowWindow + " input[name=\"widget_collapsible\"]:checked") !== null) {
        $(currentRowWindow + " #edit_collapsible_title_styles").collapse('show');
      } else {
        $(currentRowWindow + " #edit_collapsible_title_styles").collapse('hide');
      }
  
      changeLayoutOptions(currentRowWindow, window.viewModel.selected.WidgetName, window.viewModel.selected.TypeName);
    }
  
    function setupButtons() {
      $('#addLayoutWidgetButton').removeClass('disabled');
      $('#addLayoutWidgetButton').prop('disabled', false);
      $('#addLayoutButtonPopoverWrap').tooltip('destroy');
      $('#addLayoutButtonPopoverWrap').removeClass('disabled');
    }
  
    function previewHTML() {
      previewLayoutWidgetHTML(currentRowWindow);
    } // Display only relevant border settings
  
  
    $(currentRowWindow + " input[name='blocks_joined']").on('change', function (e) {
      showCorrectBorderOptions($(e.currentTarget).val(), currentRowWindow);
      previewHTML();
      if (currentRowWindow === '#rowWindow') setupButtons();
    });
  
    function onMultiOptionsChange(e) {
      if (currentRowWindow === '#rowEditWindow') {
        changeLayoutOptions(currentRowWindow, window.viewModel.selected.WidgetName, window.viewModel.selected.TypeName);
      }
  
      if ($(currentRowWindow + " #widget_collapsible").prop('checked') === true) {
        if ($(currentRowWindow + " input[name='" + elementPrefix + "layout_widget_title']").val() === '') {
          $(currentRowWindow + " input[name='" + elementPrefix + "layout_widget_title']").val('Default title');
        }
      }
  
      previewHTML();
      if (currentRowWindow === '#rowWindow') setupButtons();
    }
  
    $(currentRowWindow).on('change', "input[name='column_layout'], input[name='border_options'], input[name='widget_collapsible'], input[name='widget_title_text_colour'], input[name='widget_title_background_colour'], input[name='layout_widget_title'], input[name='edit_layout_widget_title'], input[name='listview_striped_rows'], input[name='card_colour'], input[name='chart_colour'], input[name='linklist_compact'], input.tile-row-column-layout, input[name='tile_border_colour'], input[name='separator_colour'], input[name='chart_legend'], input[name='chart_title'], input[name='chart_stacked'], input.tab-title-input, input[name='tab_widget_number']", onMultiOptionsChange);
    $(currentRowWindow + " input[name='" + elementPrefix + "layout_widget_title']").on('input', previewHTML);
    $(currentRowWindow + " .icon-field-container").on('click', '.icon-option', previewHTML);
    $(currentRowWindow + " .window-content").on('click', '.clear-icon-selection', previewHTML);
  
    function onChartSelection() {
      previewHTML();
      $('#chart-fields-list.fieldsPanelBar a.field-name.active').removeClass('active');
      $(this).addClass('active');
    }
  
    $(currentRowWindow + " #chart-fields-list").on('click', '.list-group-item', onChartSelection);
    $(currentRowWindow + " #chart-fields-list-edit-window").on('click', '.list-group-item', previewHTML);
  } // New Layout Widget window open function
  
  function rowWindowOpen() {
    state.openWindow = 'rowWindow';
    var thisWindow = this;
    var context = thisWindow.options.context;
    $('body').addClass('window-open');
    sysproInterop.getAvailableFields(function (output) {
      if (output.Fields) {
        if (output.Fields.DisplayFields && output.Fields.DisplayFields.Charts) {
          $('#chart-fields-list').html(processChartWidgetFields(output.Fields.DisplayFields.Charts));
          $('#chart-fields-list a.field-name:first-child').addClass('active');
        } else {
          $('#ChartWidgetTab').hide();
        }
  
        if (output.Fields.hasOwnProperty('CardsAvailable')) {
          processCards(output.Fields.CardsAvailable.Card, 0);
        } else {
          $('#CardWidgetTab').hide();
        }
  
        if (output.Fields.hasOwnProperty('HarmonyWidgetsAvailable')) {
          processHarmony(output.Fields.HarmonyWidgetsAvailable.HarmonyWidget, 0);
        } else {
          $('#HarmonyWidgetTab').hide();
        }
  
        if (output.Fields.hasOwnProperty('GridLists')) {
          processGridLists(output.Fields.GridLists.GridList, 0);
        } else {
          $('#GridlistWidgetTab').hide();
        }
  
        if (output.Fields.hasOwnProperty('TreeLists')) {
          processTreeLists(output.Fields.TreeLists.TreeList, 0);
        } else {
          $('#TreelistWidgetTab').hide();
        }
  
        if (output.Fields.hasOwnProperty('TreeViews')) {
          processTreeViews(output.Fields.TreeViews.TreeView, 0);
        } else {
          $('#TreeviewWidgetTab').hide();
        }
  
        if (output.Fields.hasOwnProperty('NotepadWidgets')) {
          processNotepadWidgets(output.Fields.NotepadWidgets.NotepadWidget, 0);
        } else {
          $('#NotepadWidgetTab').hide();
        }
  
        state.finishedQuickAddWidgets = true;
      }
  
      $('#rowWindow .drilldown-loading-cover').fadeOut();
      $('#addLayoutButtonPopoverWrap').tooltip({
        html: false,
        trigger: 'hover',
        placement: 'top',
        delay: {
          show: 100,
          hide: 100
        },
        title: 'Select and configure a layout widget to proceed'
      });
      $('#addLayoutButtonPopoverWrap').addClass("disabled");
      $('#rowWindow_wnd_title').text('Configure new layout section'); // Initialise the collapsible title stylings collapsible options section, and hide it initially
  
      setupRowWindow('#rowWindow', !context.parentTabWidgetPresent);
      setColourPicker('#rowWindow');
    }, function (error) {
      console.log("Error: " + error);
    }, 'Fields,CardsAvailable,HarmonyWidgetsAvailable,GridLists,TreeLists,TreeViews,NotepadWidgets');
    $('#rowWindow .btn-primary').on('click', function () {
      var newLayoutWidget = setupLayoutWidget('#rowWindow');
      insertLayoutWidget('#rowWindow', newLayoutWidget, context);
      thisWindow.close();
    });
    $('#rowWindow .closeWindow').off().on('click', function () {
      thisWindow.close();
    });
  } // Row/Layout widget window close function
  
  function rowWindowClose() {
    state.openWindow = null; // Reload the JSON object into the dataSource to prevent issues with immediate removeal, or dragging and dropping of same layout widget.
  
    this.options.context.currentDataSource.data(this.options.context.currentDataSource.data().toJSON());
    this.options.context.currentParentDataSource.data(this.options.context.currentParentDataSource.data().toJSON()); // Then destroy the old treeviews
  
    destroyTreeViews(); // And regenerate
  
    regenerateTreeViews();
    $('#addLayoutButtonPopoverWrap').tooltip('destroy');
    $('#addLayoutButtonPopoverWrap').removeClass('disabled');
    $('body').removeClass('window-open');
    $('#collapsible_title_styles').collapse('hide');
    $('.layout-widget-preview').empty();
    $('#layout_widget_title').val('');
    $('#rowWindow input[name="row_options"]:checked').prop('checked', false);
    $('#rowWindow .hide-on-close').hide();
    $('#rowWindow .active').removeClass('active in');
    $('#rowWindow .cs-selected').removeClass('cs-selected');
    layoutWidgetSelectPlaceholder.text('Choose a layout section');
    layoutWidgetSelect.addClass('cs-active');
    $('#addLayoutWidgetButton').addClass('disabled');
    $('#addLayoutWidgetButton').prop('disabled', true);
    $('#rowWindow input').off();
    $('#rowWindow').off('change');
    $('#rowWindow a#tile_layout_section').off();
    $('#rowWindow a.widget-option-tab').off();
    $('#rowWindow .icon-field-container').off();
    $('#rowWindow .icon-field-container > .radio-btn-group').empty();
    $('#rowWindow .window-content').off();
    $('#rowWindow  #chart-fields-list').off();
    $('#chart-fields-list').empty();
    $('#rowWindow .btn-primary').off();
    var tabNumSlider = document.querySelector('#rowWindow .tab_widget_slider');
    var tabNumInput = $('#rowWindow [name="tab_widget_number"]');
    tabNumInput.val(2).change();
    if (tabNumSlider) tabNumSlider.noUiSlider.set(tabNumInput.val());
    $('#rowWindow .tab-title-input-wrapper').each(function (idx, elem) {
      $(elem).toggle(2 > idx);
    });
    $('#rowWindow .data-section-pane-2').hide();
    $('#rowWindow .data-section-pane-1').velocity('fadeIn', {
      duration: 1
    });
    $('#rowWindow .icon-option').show();
    $('#AvailableCards .layout-radio-options, #HarmonyWidgets .layout-radio-options, #GridlistWidgets .layout-radio-options, #TreelistWidgets .layout-radio-options, #TreeviewWidgets .layout-radio-options, #NotepadWidgets .layout-radio-options').html('');
  } // Edit layout widget window open function
  
  function rowEditWindowOpen() {
    state.openWindow = 'rowEditWindow';
    var thisWindow = this;
    var _a = thisWindow.options,
        context = _a.context,
        tempLayoutWidgetJSON = _a.tempLayoutWidgetJSON,
        currentLayoutWidgetHTML = _a.currentLayoutWidgetHTML;
    $('body').addClass('window-open');
    kendo.bind($('#rowEditWindow'), window.viewModel);
    $('#rowEditWindow input').each(function (_idx, elem) {
      $(elem).parent('label').toggleClass('active', $(elem).prop('checked'));
    }); // Initialise the collapsible title stylings collapsible options section, and hide it initially
  
    setupRowWindow('#rowEditWindow', false);
    setColourPicker('#rowEditWindow');
  
    if (window.viewModel.selected.DisplayStyle === 5 && window.viewModel.selected.ColumnLayout === null) {
      var numColumns = window.viewModel.selected.Rows[0].Columns.length;
      window.viewModel.selected.ColumnLayout = numColumns === 1 ? "1col" : numColumns === 2 ? "2colequal" : "3colequal";
    }
  
    kendo.bind($('.display_only_form_options'), window.viewModel);
    $('#rowEditWindow .display_only_form_options input').each(function (_idx, elem) {
      $(elem).parent('label').toggleClass('active', $(elem).prop('checked'));
    });
    $('#rowEditWindow .btn-primary').on('click', function () {
      if (window.viewModel.selected.DisplayStyle === 9) {
        var widgetTabData = window.viewModel.selected.Tabs.data().toJSON();
        var widgetTabDataClone = JSON.parse(JSON.stringify(widgetTabData));
        var TabTitles_1 = [];
        $('#rowEditWindow input.tab-title-input').each(function (idx, titleinput) {
          TabTitles_1[idx] = $(titleinput).val();
        });
        var tabsData = createTabsArray(window.viewModel.selected.TabsNum, TabTitles_1, widgetTabDataClone);
        window.viewModel.selected.Tabs.data(tabsData);
      } else if (window.viewModel.selected.DisplayStyle === 5) {
        var formColumnWidths = [window.viewModel.selected.ColumnLayout == "2colequal" || window.viewModel.selected.ColumnLayout == "3colleft" ? 1 : window.viewModel.selected.ColumnLayout == "2colright" || window.viewModel.selected.ColumnLayout == "3colequal" ? 3 : window.viewModel.selected.ColumnLayout == "2colleft" ? 2 : window.viewModel.selected.ColumnLayout == "1col" ? 0 : 6, window.viewModel.selected.ColumnLayout == "2colequal" || window.viewModel.selected.ColumnLayout == "3colmiddle" ? 1 : window.viewModel.selected.ColumnLayout == "2colleft" || window.viewModel.selected.ColumnLayout == "3colequal" ? 3 : window.viewModel.selected.ColumnLayout == "2colright" ? 2 : 6, window.viewModel.selected.ColumnLayout == "3colequal" ? 3 : window.viewModel.selected.ColumnLayout == "3colmiddle" || window.viewModel.selected.ColumnLayout == "3colleft" ? 6 : 1];
  
        for (var i = 0; i < window.viewModel.selected.Rows[0].Columns.length; i++) {
          var ci = i;
          window.viewModel.selected.Rows[0].Columns[ci].ResponsiveStyle = formColumnWidths[ci];
  
          for (var w = 0; w < window.viewModel.selected.Rows[0].Columns[ci].Widgets.length; w++) {
            var widgetObject = window.viewModel.selected.Rows[0].Columns[ci].Widgets[w];
  
            if (window.viewModel.selected.Rows[0].Columns[ci].IsDisplayOnly) {
              if (!widgetObject.SubType.startsWith('Display')) {
                widgetObject.SubType = widgetObject.SubType.length > 0 ? "Display-" + widgetObject.SubType : 'Display';
              }
            } else {
              if (widgetObject.SubType.startsWith('Display')) {
                widgetObject.SubType = widgetObject.SubType.replace('Display-', '').replace('Display', '');
              }
            }
          }
        }
      }
  
      sysproInterop.getHtmlFromModel('Widget', stringifyJSONObject(context.layoutWidgetGuid, context.currentDataSource), function (result) {
        var newWidgetHTMLjQuery = $($.trim(result));
  
        if (window.viewModel.selected.DisplayStyle === 2) {
          var initialNumRowsInCarousel = window.viewModel.selected.Rows.length;
          var targetEditWidgetJSON = window.viewModel.selected.toJSON();
          var carouselRowNumber = void 0;
  
          if (targetEditWidgetJSON.Rows[0].Columns[0].hasOwnProperty('Widgets')) {
            carouselRowNumber = initialNumRowsInCarousel;
            $(newWidgetHTMLjQuery).find('.carousel-inner').append("<div class=\"item\"><div class=\"panel-body sys-bg-white text-left\"><div class=\"row \" data-row=\"" + carouselRowNumber + "\"><div class=\"col-xs-12\" data-section=\"0\"><div class=\"panel sys-widget sys-box-shadow-off sys-mg-off  add-data-widget\"><div class=\"panel-body text-center sys-fg-primary\"><a class=\"pull-left text-center add-data-section\" href=\"#\"><i class=\"material-icons\">note_add</i></a></div></div></div></div></div></div>");
          } else {
            carouselRowNumber = 1;
          }
        } else if (window.viewModel.selected.DisplayStyle === 4) {
          var clonedTileWidgetSection = newWidgetHTMLjQuery.find('.tile-widget').parent('.col-xs-12').clone();
          newWidgetHTMLjQuery.find('.tile-widget').parents('.layout-widget').find('.panel-body .row').empty().append(clonedTileWidgetSection);
          newWidgetHTMLjQuery.find('.data-section').removeClass('data-section');
          newWidgetHTMLjQuery.children('.col-sm-12').addClass('tile-widget-wrapper');
          newWidgetHTMLjQuery.find('.panel-body').first().prepend('<div class="tile-loading-cover"><span class="spinner"></span></div>');
  
          if (state.tileWidgets[window.viewModel.selected.Id]) {
            state.tileWidgets[window.viewModel.selected.Id].packery('destroy');
          }
  
          delete state.tileWidgets[window.viewModel.selected.Id];
        } else if (window.viewModel.selected.DisplayStyle === 9) {
          newWidgetHTMLjQuery.addClass('tab-layout-widget');
          newWidgetHTMLjQuery.find('.main-column').each(function (idx, elem) {
            $(elem).addClass('tab-main-column');
          });
        }
  
        currentLayoutWidgetHTML.replaceWith(newWidgetHTMLjQuery);
  
        if (context.targetLayoutWidget.DisplayStyle === 4) {
          initiateTiles(context.targetLayoutWidget);
        }
  
        finishAddLayoutWidget();
        initEditRemoveDataWidget();
        sysproInterop.performBind(state.bindableFieldsData, true, '', newWidgetHTMLjQuery.parent());
        thisWindow.close();
      }, '', '', '', '', function (error) {
        console.log(error);
        thisWindow.close();
      }, false);
    });
    $('#rowEditWindow .closeWindow').on('click', function () {
      // ROB:  Added SYSPRO_VB  for SYSPRO_VB.tempLayoutWidgetJSON because  it got lost in scope andd appeared  as  null.
      for (var key in tempLayoutWidgetJSON) {
        window.viewModel.selected.set(key, tempLayoutWidgetJSON[key]);
      }
  
      thisWindow.close();
    });
  } // Edit Row/Layout widget window close function
  
  function rowEditWindowClose() {
    state.openWindow = null; // Reload the JSON object into the dataSource to prevent issues with immediate removeal, or dragging and dropping of same layout widget.
  
    this.options.context.currentDataSource.data(this.options.context.currentDataSource.data().toJSON());
    this.options.context.currentParentDataSource.data(this.options.context.currentParentDataSource.data().toJSON()); // Then destroy the old treeviews
  
    destroyTreeViews(); // And regenerate
  
    regenerateTreeViews();
    $('body').removeClass('window-open');
    $('#edit_collapsible_title_styles').collapse('hide');
    $('#rowEditWindow .hide-on-close').hide();
    $('#edit_layout_widget_title').val('');
    $(document.querySelector('input[name="row_options"]:checked')).prop('checked', false);
    $('#rowEditWindow .active').removeClass('active in');
    $('#rowEditWindow .icon-field-container').off();
    $('#rowEditWindow input').off();
    $('#rowEditWindow').off('change');
    $('#rowEditWindow a.widget-option-tab').off();
    $('#rowEditWindow .btn-primary').off();
    $('#rowEditWindow .closeWindow').off();
    $('#rowEditWindow .icon-field-container > .radio-btn-group').empty();
    $('#rowEditWindow .window-content').off();
    $('#rowEditWindow  #chart-fields-list-edit-window').off();
    $('#rowEditWindow .data-section-pane-2').hide();
    $('#rowEditWindow .data-section-pane-1').velocity('fadeIn', {
      duration: 1
    });
    $('#rowEditWindow .icon-option').show();
    $('#rowEditWindow .layout-widget-preview').empty();
    window.viewModel.set('selected', null);
  } // Helper function to control data window UI
  
  function setupDataWindowUI(currentWindow, activeField, targetLayoutWidgetDisplayStyle) {
    var TypeName = activeField.data('type-name');
  
    if (TypeName === 'LinkWidget') {
      $(currentWindow + " .field-caption-option").show();
      $(currentWindow + " .link-field-options").show();
      $(currentWindow + " .offcanvas-text-option").hide();
      $(currentWindow + " .entryFieldOptions").hide();
      $(currentWindow + " .linklist-text-option").show();
      $(currentWindow + " [name='linklist_link_text']").val(activeField.data('description'));
      $(currentWindow + " .dataWidgetWindowOffCanvasPopoverWrap").velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $(currentWindow + " #addDataButtonPopoverWrap, " + currentWindow + " .dataWidgetWindowButton").velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $(currentWindow + " .dataWidgetWindowButton").removeClass('disabled');
              $(currentWindow + " .dataWidgetWindowButton").prop('disabled', false);
              $(currentWindow + " #addDataButtonPopoverWrap").tooltip('destroy');
              $('#addDataButtonPopoverWrap').removeClass('disabled');
            }
          });
        }
      });
      $(currentWindow + " .text-colour-weight-options").toggle(targetLayoutWidgetDisplayStyle !== 3);
      $(currentWindow + " #fieldStylingOptions").show();
    } else if (TypeName === 'EntryDataWidget' && targetLayoutWidgetDisplayStyle === 5) {
      $(currentWindow + " .field-caption-option").show();
      $(currentWindow + " .linklist-text-option").hide();
      $(currentWindow + " .link-field-options").hide();
      $(currentWindow + " .text-alignment-options").hide();
      $(currentWindow + " .fieldBackgroundColorOption").hide();
      $(currentWindow + " .offcanvas-text-option").hide();
      $(currentWindow + " .entryFieldOptions").show();
      $(currentWindow + " .text-colour-weight-options").hide();
      $(currentWindow + " .dataWidgetWindowOffCanvasPopoverWrap").velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $(currentWindow + " #addDataButtonPopoverWrap, " + currentWindow + " .dataWidgetWindowButton").velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $(currentWindow + " .dataWidgetWindowButton").removeClass('disabled');
              $(currentWindow + " .dataWidgetWindowButton").prop('disabled', false);
              $(currentWindow + " #addDataButtonPopoverWrap").tooltip('destroy');
              $('#addDataButtonPopoverWrap').removeClass('disabled');
            }
          });
        }
      });
      $(currentWindow + " #fieldStylingOptions").show();
    } else if (activeField.hasClass('freeTextDataField')) {
      $(currentWindow + " .field-caption-option").hide();
      $(currentWindow + " .link-field-options").hide();
      $(currentWindow + " .offcanvas-text-option").hide();
      $(currentWindow + " .fieldsPanelBar li.active").removeClass('active');
      $(currentWindow + " .text-alignment-options").hide();
      $(currentWindow + " .fieldBackgroundColorOption").hide();
      $(currentWindow + " .linklist-text-option").show();
      $(currentWindow + " .text-colour-weight-options").hide();
      $(currentWindow + " .entryFieldOptions").hide();
      $(currentWindow + " #fieldStylingOptions").show();
      $(currentWindow + " .dataWidgetWindowOffCanvasPopoverWrap").velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $(currentWindow + " #addDataButtonPopoverWrap, " + currentWindow + " .dataWidgetWindowButton").velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $(currentWindow + " .dataWidgetWindowButton").removeClass('disabled');
              $(currentWindow + " .dataWidgetWindowButton").prop('disabled', false);
              $(currentWindow + " #addDataButtonPopoverWrap").tooltip('destroy');
              $('#addDataButtonPopoverWrap').removeClass('disabled');
            }
          });
        }
      });
      $(currentWindow + " #fieldStylingOptions").show();
    } else if (TypeName === 'ButtonWidget') {
      $(currentWindow + " .field-caption-option").hide();
      $(currentWindow + " .link-field-options").hide();
      $(currentWindow + " .entryFieldOptions").hide();
      $(currentWindow + " .text-alignment-options").show();
      $(currentWindow + " .fieldBackgroundColorOption").show();
      $(currentWindow + " .linklist-text-option").show();
      $(currentWindow + " .text-colour-weight-options").show();
      $(currentWindow + " [name='linklist_link_text']").val(activeField.data('description'));
      $(currentWindow + " .offcanvas-text-option").show();
      $(currentWindow + " .add-icon-option").show();
      $(currentWindow + " #addDataButtonPopoverWrap, " + currentWindow + " .dataWidgetWindowButton").velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $(currentWindow + " .dataWidgetWindowOffCanvasPopoverWrap").velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $(currentWindow + " .dataWidgetWindowOffCanvasPopoverWrap").click(function () {
                $(currentWindow + " .dataWidgetWindowOffCanvasPopoverWrap").velocity('fadeOut', {
                  duration: 300,
                  complete: function complete() {
                    $(currentWindow + " #addDataButtonPopoverWrap, " + currentWindow + " .dataWidgetWindowButton").velocity('fadeIn', {
                      duration: 300,
                      complete: function complete() {
                        $(currentWindow + " .dataWidgetWindowButton").removeClass('disabled');
                        $(currentWindow + " .dataWidgetWindowButton").prop('disabled', false);
                        $(currentWindow + " #addDataButtonPopoverWrap").tooltip('destroy');
                        $('#addDataButtonPopoverWrap').removeClass('disabled');
                      }
                    });
                  }
                });
              });
            }
          });
        }
      });
      $(currentWindow + " #fieldStylingOptions").show();
    } else {
      $(currentWindow + " .field-caption-option").show();
      $(currentWindow + " .link-field-options").hide();
      $(currentWindow + " .offcanvas-text-option").hide();
      $(currentWindow + " .linklist-text-option").hide();
      $(currentWindow + " .entryFieldOptions").hide();
      $(currentWindow + " .text-colour-weight-options").show();
      $(currentWindow + " .dataWidgetWindowOffCanvasPopoverWrap").velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $(currentWindow + " #addDataButtonPopoverWrap, " + currentWindow + " .dataWidgetWindowButton").velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $(currentWindow + " .dataWidgetWindowButton").removeClass('disabled');
              $(currentWindow + " .dataWidgetWindowButton").prop('disabled', false);
              $(currentWindow + " #addDataButtonPopoverWrap").tooltip('destroy');
              $('#addDataButtonPopoverWrap').removeClass('disabled');
            }
          });
        }
      });
      $(currentWindow + " #fieldStylingOptions").toggle(targetLayoutWidgetDisplayStyle !== 5);
    }
  
    $(currentWindow + " .fieldsPanelBar .list-group-item.field-name.active").removeClass('active');
    activeField.addClass('active');
  } // Toolbar edit window UI setup helper method
  
  
  function setupToolbarEditWindowUI(activeField, parentToolbarWidget, parentToolbarWidgetHTML, fromSearch, updateVM) {
    $('.toolbar-text-option').show();
    $('.toolbar-icon-option').show();
    parentToolbarWidget !== null ? $('#toolbarEditWindow .ToolbarDropdown').css({
      visibility: "hidden",
      height: "0px",
      padding: "0px"
    }) : $('#toolbarEditWindow .ToolbarDropdown').css({
      visibility: "visible",
      height: "auto",
      padding: "7px 15px"
    });
    parentToolbarWidget !== null ? $('#toolbarEditWindow .ToolbarSubDropdown').css({
      visibility: "visible",
      height: "auto",
      padding: "7px 15px"
    }) : $('#toolbarEditWindow .ToolbarSubDropdown').css({
      visibility: "hidden",
      height: "0px",
      padding: "0px"
    });
  
    if (parentToolbarWidget !== null && parentToolbarWidgetHTML && parentToolbarWidgetHTML.hasClass("dropdown-submenu") && parentToolbarWidgetHTML.parents(".dropdown-submenu").length === 1) {
      $('#ToolbarSubDropdown').css({
        visibility: "hidden",
        height: "0px",
        padding: "0px"
      });
    }
  
    $("#toolbarEditWindow .toolbar-tooltip").toggle(parentToolbarWidget === null);
    $('#edit-toolbar-widget-parameters-wrapper').show();
  
    function completeOffCanvasConfigAnimation() {
      $('#configureEditToolbarOffCanvasButton').velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $('#editToolbarWidgetButton').velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $('#editToolbarWidgetButton').removeClass('disabled');
              $('#editToolbarWidgetButton').prop('disabled', false);
            }
          });
        }
      });
    }
  
    $('#edit-toolbar-widgets-list.fieldsPanelBar .list-group-item.field-name.active').removeClass('active');
    activeField.addClass('active');
    var FieldName = activeField.data('field-name');
  
    if (fromSearch && FieldName !== 'ToolbarDropdown' && FieldName !== 'ToolbarSubDropdown' && FieldName !== 'ButtonWidget') {
      // $('#toolbar_item_text_edit').val(activeField.data('shortcaption'));
      // $('#toolbar_item_tooltip_edit').val(activeField.data('tooltip')); 
      $('#toolbar-widget-edit-list-wrapper > .drilldown').addClass("disabled");
      state.toolbarActionsEditList[0].resetDdMenu();
      state.toolbarActionsEditList[0].drillto(activeField.closest('.dd-parent').parent().closest('.dd-parent'));
      state.toolbarActionsEditList[0].drillto(activeField.closest('.dd-parent'));
      setTimeout(function () {
        state.toolbarActionsEditList[0].partResetDdMenu();
        $('#edit-toolbar-widgets-list').scrollTop($('#edit-toolbar-widgets-list .list-group-item.active').position().top - 140);
      }, 300);
    }
  
    if (updateVM) {
      window.viewModel.selected.TypeName = FieldName === 'ToolbarDropdown' || FieldName === 'ToolbarSubDropdown' || FieldName === 'ButtonWidget' ? FieldName : 'ToolbarWidget';
      window.viewModel.selected.ToolbarWidgetType = activeField.data('toolbar-widget-type');
      window.viewModel.selected.Title = activeField.data('shortcaption') || activeField.data('caption');
      window.viewModel.selected.Tooltip = activeField.data('toolbar-tooltip');
    }
  
    if ($(activeField).hasClass('OffCanvasToolbarItem')) {
      $('#editToolbarWidgetButton').velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $('#configureEditToolbarOffCanvasButton').velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $('#configureEditToolbarOffCanvasButton').off('click', completeOffCanvasConfigAnimation).on('click', completeOffCanvasConfigAnimation);
              $('#toolbar-widget-edit-list-wrapper > .drilldown').removeClass("disabled");
            }
          });
        }
      });
    } else {
      $('#configureEditToolbarOffCanvasButton').velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $('#editToolbarWidgetButton').velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $('#editToolbarWidgetButton').removeClass('disabled');
              $('#editToolbarWidgetButton').prop('disabled', false);
              $('#toolbar-widget-edit-list-wrapper > .drilldown').removeClass("disabled");
            }
          });
        }
      });
    }
  
    kendo.bind($('#toolbarEditWindow'), window.viewModel);
  } // Toolbar window UI setup helper method
  
  
  function setupToolbarWindowUI(activeField, parentToolbarWidget, parentToolbarWidgetHTML, fromSearch) {
    parentToolbarWidget !== null ? $('#toolbarWindow .ToolbarDropdown').css({
      visibility: "hidden",
      height: "0px",
      padding: "0px"
    }) : $('#toolbarWindow .ToolbarDropdown').css({
      visibility: "visible",
      height: "auto",
      padding: "7px 15px"
    });
    parentToolbarWidget !== null ? $('#toolbarWindow .ToolbarSubDropdown').css({
      visibility: "visible",
      height: "auto",
      padding: "7px 15px"
    }) : $('#toolbarWindow .ToolbarSubDropdown').css({
      visibility: "hidden",
      height: "0px",
      padding: "0px"
    });
  
    if (parentToolbarWidget !== null && parentToolbarWidgetHTML && parentToolbarWidgetHTML.hasClass("dropdown-submenu") && parentToolbarWidgetHTML.parents(".dropdown-submenu").length === 1) {
      $('#ToolbarSubDropdown').css({
        visibility: "hidden",
        height: "0px",
        padding: "0px"
      });
    }
  
    $("#toolbarWindow .toolbar-tooltip").toggle(parentToolbarWidget === null);
  
    function completeOffCanvasConfigAnimation() {
      $('#configureToolbarOffCanvasPopoverWrap').velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $('#addToolbarWidgetButtonPopoverWrap').velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $('#addToolbarWidgetButton').removeClass('disabled');
              $('#addToolbarWidgetButton').prop('disabled', false);
              $('#addToolbarWidgetButtonPopoverWrap').tooltip('destroy');
              $('#addToolbarWidgetButtonPopoverWrap').removeClass('disabled');
            }
          });
        }
      });
    }
  
    if (activeField) {
      $('#toolbar-widgets-list.fieldsPanelBar .list-group-item.field-name.active').removeClass('active');
      activeField.addClass('active');
  
      if (fromSearch) {
        $('#toolbar-widget-list-wrapper > .drilldown').addClass("disabled");
        state.toolbarActionsList[0].resetDdMenu();
        state.toolbarActionsList[0].drillto(activeField.closest('.dd-parent').parent().closest('.dd-parent'));
        state.toolbarActionsList[0].drillto(activeField.closest('.dd-parent'));
        setTimeout(function () {
          if ($('#toolbar-widgets-list .list-group-item')) {
            $('#toolbar-widgets-list').scrollTop($('#toolbar-widgets-list .list-group-item.active').position().top - 140);
          }
        }, 300);
      }
  
      $('#toolbarWindow #toolbar_item_text').val(activeField.data('shortcaption'));
      $('#toolbarWindow #toolbar_item_tooltip').val(activeField.data('tooltip'));
      $('.toolbar-text-option').show();
      $('.toolbar-icon-option').show();
      $('#toolbarWindowIconList label.active').removeClass('active');
  
      if (activeField.data('toolbar-icon')) {
        var activeIcon_1 = $("#toolbarWindowIconList label[data-icon-name='" + activeField.data('toolbar-icon') + "']");
        activeIcon_1.addClass('active');
        setTimeout(function () {
          $('.toolbar-icon-option .icon-field-container').scrollTop($('.toolbar-icon-option .icon-field-container').scrollTop() + activeIcon_1.position().top - 193);
        }, 200);
      }
  
      $('#toolbar-widget-parameters-wrapper').show();
  
      if (activeField.hasClass('OffCanvasToolbarItem')) {
        $('#addToolbarWidgetButtonPopoverWrap').velocity('fadeOut', {
          duration: 300,
          complete: function complete() {
            $('#configureToolbarOffCanvasPopoverWrap').velocity('fadeIn', {
              duration: 300,
              complete: function complete() {
                $('#configureToolbarOffCanvasPopoverWrap').off('click', completeOffCanvasConfigAnimation).on('click', completeOffCanvasConfigAnimation);
                $('#toolbar-widget-list-wrapper > .drilldown').removeClass("disabled");
              }
            });
          }
        });
      } else {
        $('#configureToolbarOffCanvasPopoverWrap').velocity('fadeOut', {
          duration: 300,
          complete: function complete() {
            $('#addToolbarWidgetButtonPopoverWrap').velocity('fadeIn', {
              duration: 300,
              complete: function complete() {
                $('#addToolbarWidgetButton').removeClass('disabled');
                $('#addToolbarWidgetButton').prop('disabled', false);
                $('#addToolbarWidgetButtonPopoverWrap').tooltip('destroy');
                $('#addToolbarWidgetButtonPopoverWrap').removeClass('disabled');
                $('#toolbar-widget-list-wrapper > .drilldown').removeClass("disabled");
              }
            });
          }
        });
      }
    }
  } // Helper function to set correct active states and selected field in view model when a user selects a field from the autopredict search.
  
  
  function selectFieldFromSearch(item) {
    var currentItem;
  
    if (state.openWindow === 'dataWindow') {
      $('#initial-fields-list-data-window-wrapper .list-group-item.active').removeClass('active');
      currentItem = $("#initial-fields-list-data-window-wrapper .list-group-item[data-field-path='" + item.fieldpath + "']");
      currentItem.addClass('active');
      state.dataWindowFieldsList[0].resetDdMenu();
      state.dataWindowFieldsList[0].drillto(currentItem.closest('.dd-parent').parent().closest('.dd-parent'));
      state.dataWindowFieldsList[0].drillto(currentItem.closest('.dd-parent'));
      setTimeout(function () {
        if ($('#initial-fields-list-data-window .list-group-item')) {
          $('#initial-fields-list-data-window').scrollTop($('#initial-fields-list-data-window .list-group-item.active').position().top - 140);
        }
      }, 300);
      $('#addDataWidgetButton').removeClass('disabled');
      $('#addDataWidgetButton').prop('disabled', false);
      $('#addDataButtonPopoverWrap').tooltip('destroy');
      $('#addDataButtonPopoverWrap').removeClass('disabled'); // var targetParentWidgetDisplayStyle = SYSPRO_VB.targetParentWidget.DisplayStyle;
    } else if (state.openWindow === 'dataEditWindow') {
      window.viewModel.set('selected.FieldPath', item.fieldpath); // update the window.viewModel
  
      window.viewModel.set('selected.FieldName', ''); // update the window.viewModel
  
      window.viewModel.set('selected.DataType', item.datatype); // update the window.viewModel
  
      window.viewModel.set('selected.HasSmartTag', item.smarttag); // update the window.viewModel
  
      $('#initial-fields-list-data-edit-window-wrapper .list-group-item.active').removeClass('active');
      currentItem = $("#initial-fields-list-data-edit-window-wrapper .list-group-item[data-field-path='" + item.fieldpath + "']");
      currentItem.addClass('active');
      state.dataEditWindowFieldsList[0].resetDdMenu();
      state.dataEditWindowFieldsList[0].drillto(currentItem.closest('.dd-parent').parent().closest('.dd-parent'));
      state.dataEditWindowFieldsList[0].drillto(currentItem.closest('.dd-parent'));
      setTimeout(function () {
        if ($('#initial-fields-list-data-edit-window .list-group-item').length) {
          $('#initial-fields-list-data-edit-window').scrollTop($('#initial-fields-list-data-edit-window .list-group-item.active').position().top - 140);
        }
      }, 300);
    }
  
    setupDataWindowUI("#" + state.openWindow, currentItem, $("#" + state.openWindow).data('kendoWindow').options.context.targetLayoutWidget.DisplayStyle);
  } //Helper function to set correct active states and selected field in view model when a user selects a field from the autopredict search.
  
  function selectToolbarFieldFromSearch(item) {
    var currentItem;
  
    if (state.openWindow === 'toolbarWindow') {
      $('#toolbar-widget-list-wrapper .list-group-item.active').removeClass('active');
      currentItem = $("#toolbar-widget-list-wrapper .list-group-item[data-field-name='" + item.fieldname + "']");
      currentItem.addClass('active');
      setupToolbarWindowUI(currentItem, $('#' + state.openWindow).data('kendoWindow').options.parentToolbarWidget, $('#' + state.openWindow).data('kendoWindow').options.parentToolbarWidgetHTML, true);
      $('#addtoolbarWidgetButton').removeClass('disabled');
      $('#addtoolbarWidgetButton').prop('disabled', false);
      $('#addToolbarWidgetButtonPopoverWrap').tooltip('destroy');
      $('#addToolbarWidgetButtonPopoverWrap').removeClass('disabled'); // var targetParentWidgetDisplayStyle = state.targetParentWidget.DisplayStyle;
    } else if (state.openWindow === 'toolbarEditWindow') {
      window.viewModel.set('selected.FieldName', item.fieldname); //update the viewModel
  
      window.viewModel.set('selected.ToolbarWidgetType', item.actiontype); //update the viewModel
  
      $('#toolbar-widget-edit-list-wrapper .list-group-item.active').removeClass('active');
      currentItem = $("#toolbar-widget-edit-list-wrapper .list-group-item[data-field-name='" + item.fieldname + "']");
      currentItem.addClass('active');
      setupToolbarEditWindowUI(currentItem, $('#' + state.openWindow).data('kendoWindow').options.parentToolbarWidget, $('#' + state.openWindow).data('kendoWindow').options.parentToolbarWidgetHTML, true, true);
    }
  } // Helper function to control display of data widget option sections
  
  function hideShowDataWidgetOptions(currentWindow, nonTilesAddition, initFields, linksFields, entryFields, typeaheadFields, typeaheadEntryFields, typeaheadLinkFields, fieldBgColour, fieldCaption, textAlign, linkList, iconOption, textColourWeight) {
    $(currentWindow + " #non-tiles-addition").toggle(nonTilesAddition);
    $(currentWindow + " #initial-fields-list-data-window").toggle(initFields);
    $(currentWindow + " #links-fields-list-data-window").toggle(linksFields);
    $(currentWindow + " .entryFieldOptions").toggle(entryFields);
    $(currentWindow + " #entry-fields-list-data-window").toggle(entryFields);
    $(currentWindow + " .typeahead-fields").toggle(typeaheadFields);
    $(currentWindow + " .typeahead-entry-fields").toggle(typeaheadEntryFields);
    $(currentWindow + " .typeahead-link-fields").toggle(typeaheadLinkFields);
    $(currentWindow + " .fieldBackgroundColorOption").toggle(fieldBgColour);
    $(currentWindow + " .field-caption-option").toggle(fieldCaption);
    $(currentWindow + " .text-alignment-options").toggle(textAlign);
    $(currentWindow + " .text-colour-weight-options").toggle(textColourWeight);
    $(currentWindow + " .linklist-text-option").toggle(linkList);
    $(currentWindow + " .DisplayFieldsSection").toggle(!linkList);
    $(currentWindow + " .EntryFieldsSection").toggle(!linkList);
    $(currentWindow + " .add-icon-option").toggle(iconOption);
  }
  
  function changeOffCanvasOptions(windowIdentifier, windowIdentifierClass) {
    var ocLayout = $("#" + windowIdentifier + " input[name='" + windowIdentifierClass + "-window-off-canvas-type']:checked").val();
    $("#" + windowIdentifier + " .not-available-for-windows").toggle(ocLayout !== 3);
  
    if (ocLayout === 3) {
      $("input[name='" + windowIdentifierClass + "-window-offcanvas-column-layout'], #" + windowIdentifierClass + "-window-offcanvas_toolbar_option").prop('checked', false);
      $("input[name='" + windowIdentifierClass + "-window-offcanvas-column-layout']").parent().removeClass('active');
      $("#" + windowIdentifierClass + "-offcanvas-1col").prop('checked', true);
      $("#" + windowIdentifierClass + "-offcanvas-1col").parent().addClass('active');
    } else {
      $("#" + windowIdentifier + " .not-available-for-windows").show();
    }
  } // Kendo Window data window open function (runs as window opens)
  
  
  function dataWindowOpen() {
    state.openWindow = 'dataWindow';
    var thisWindow = this;
    var context = thisWindow.options.context;
    var targetLayoutWidgetDisplayStyle = context.targetLayoutWidget.DisplayStyle;
    var section;
    $('body').addClass('window-open');
    sysproInterop.getAvailableFields(function (output) {
      var fieldListHTML = processDataWidgetFields(output.Fields);
      $('#initial-fields-list-data-window').html(fieldListHTML);
      $('#initial-fields-list-data-window [data-tooltip="tooltip"]').tooltip();
      state.dataWindowFieldsList = $('#initial-fields-list-data-window').drilldown();
      $('#initial-fields-list-data-window.fieldsPanelBar .list-group-item.field-name').on('click', function (e) {
        $('#dataWindow .closeWindow').text('Cancel');
        setupDataWindowUI('#dataWindow', $(e.currentTarget), context.targetLayoutWidget.DisplayStyle);
      });
      $('#dataWindow .quickAddEntryField').on('click', function (e) {
        e.stopPropagation();
        var $thisButton = $(e.currentTarget);
        $('#dataWindow #fieldStylingOptions').hide();
        var field = $(e.currentTarget).closest('.list-group-item');
        var IsMandatory = document.querySelector('#dataWindow input[name="isMandatory"]:checked') !== null;
        var dataWidgetClone = $('#dataWindow .fields-wrapper .list-group-item.active.field-name').clone();
        dataWidgetClone.find('i').remove();
        var FieldName = dataWidgetClone.text();
        var KendoDataWidget = new dataWidgetModel({
          Id: sysproInterop.generateUUID(),
          Title: '',
          FieldName: FieldName,
          FieldPath: field.data('field-path'),
          HasSmartTag: field.data('smart-tag'),
          DataType: field.data('data-type'),
          KeyField: field.data('key-field'),
          KeyAction: field.data('key-action'),
          TypeName: field.data('type-name'),
          SubType: '',
          BackgroundColor: 9,
          Caption: {
            Color: 8,
            Size: 0,
            Alignment: 0,
            Visibility: $('#dataWindow #data_show_caption').prop('checked')
          },
          Value: {
            Color: 8,
            Size: 1,
            Alignment: 0,
            Weight: 1
          },
          Icon: {
            Name: null,
            Color: 0,
            Size: 0,
            Alignment: 0,
            Tooltip: null
          },
          EntryType: field.data('entry-type'),
          IsMandatory: IsMandatory,
          OffCanvasLayoutId: null
        });
        insertDataWidget(KendoDataWidget, context, section, null, null, function () {
          $thisButton.removeClass('btn-primary').addClass('btn-success').html('<i class="material-icons">check</i>');
        });
        $('#dataWindow .closeWindow').text('Close window');
      });
      $('#dataWindow .OffCanvasLink').toggle(context.canvas_id === null);
      $('#dataWindow .drilldown-loading-cover').fadeOut();
    }, function (error) {
      console.log("Error: " + error);
    }, 'Fields,LinksAvailable');
    $('#addDataButtonPopoverWrap').tooltip({
      html: false,
      trigger: 'hover',
      placement: 'top',
      delay: {
        show: 100,
        hide: 100
      },
      title: 'Select and configure a data widget to proceed'
    });
    $('#addDataButtonPopoverWrap').addClass('disabled');
    setColourPicker('#dataWindow');
    console.log(context);
  
    if (targetLayoutWidgetDisplayStyle == 0 || targetLayoutWidgetDisplayStyle == 2) {
      section = $("div[data-guid=\"" + context.layoutWidgetGuid + "\"] div[data-row=\"" + context.row_num + "\"] div[data-section=\"" + context.section_num + "\"]");
      hideShowDataWidgetOptions('#dataWindow', true, true, false, true, true, false, false, true, true, true, false, true, true);
    } else if (targetLayoutWidgetDisplayStyle == 1) {
      section = $("div[data-guid=\"" + context.layoutWidgetGuid + "\"] table tbody");
      hideShowDataWidgetOptions('#dataWindow', true, true, false, true, true, false, false, false, false, false, false, false, true);
    } else if (targetLayoutWidgetDisplayStyle == 3) {
      section = $("div[data-guid=\"" + context.layoutWidgetGuid + "\"] .list-group");
      hideShowDataWidgetOptions('#dataWindow', true, true, true, false, false, false, true, false, false, false, true, false, false);
    } else if (targetLayoutWidgetDisplayStyle == 5) {
      if (context.targetLayoutWidget.Rows && context.targetLayoutWidget.Rows.length && context.targetLayoutWidget.Rows[0].Columns && context.targetLayoutWidget.Rows[0].Columns.length && context.targetLayoutWidget.Rows[0].Columns[context.section_num].IsDisplayOnly === true) {
        section = $("div[data-guid=\"" + context.layoutWidgetGuid + "\"] tbody[data-section=\"" + context.section_num + "\"]");
      } else {
        section = $("div[data-guid=\"" + context.layoutWidgetGuid + "\"] div.row[data-row=\"0\"] div[data-section=\"" + context.section_num + "\"]");
      }
  
      hideShowDataWidgetOptions('#dataWindow', true, true, true, true, false, true, false, true, false, true, false, false, false);
      $('#dataWindow').addClass('parentWidgetIsEntryForm');
    }
  
    function completeCanvasConfigAnimation() {
      $('#configureDataOffCanvasPopoverWrap').velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $('#addDataButtonPopoverWrap').velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $('#addDataWidgetButton').removeClass('disabled');
              $('#addDataWidgetButton').prop('disabled', false);
              $('#addDataButtonPopoverWrap').tooltip('destroy');
              $('#addDataButtonPopoverWrap').removeClass('disabled');
            }
          });
        }
      });
    }
  
    function startCanvasConfigAnimation() {
      $('#addDataButtonPopoverWrap').velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $('#configureDataOffCanvasPopoverWrap').velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $('#configureDataOffCanvasPopoverWrap').off('click', completeCanvasConfigAnimation).on('click', completeCanvasConfigAnimation);
            }
          });
        }
      });
    }
  
    $('#dataWindow .change-button-back').on('click', startCanvasConfigAnimation);
    $("#dataWindow input[name='link_as_button']").on('change', function (e) {
      $('#dataWindow .link-button-colour').toggle($(e.currentTarget).prop('checked') === true);
      $('#dataWindow .text-colour-weight-options').toggle($(e.currentTarget).prop('checked') !== true);
    });
    $("#dataWindow input[name='data-window-off-canvas-type']").on('change', function () {
      var ocLayout = $("#dataWindow input[name='data-window-off-canvas-type']:checked").val();
  
      if (ocLayout == 3) {
        $('#dataWindow .not-available-for-windows').hide();
        $("input[name='data-window-offcanvas-column-layout'], #data_offcanvas_toolbar_option").prop('checked', false);
        $("input[name='data-window-offcanvas-column-layout']").parent().removeClass('active');
        $('#data_offcanvas_toolbar_option').parent().removeClass('active');
        $('#data-offcanvas-1col').prop('checked', true);
        $('#data-offcanvas-1col').parent().addClass('active');
      } else {
        $('#dataWindow .not-available-for-windows').show();
      }
    });
    $('#dataWindow #addDataWidgetButton').on('click', function () {
      section.prepend('<div class="tile-loading-cover"><span class="spinner"></span></</div>');
      section.find('.tile-loading-cover').fadeIn();
      $('#dataWindow .closeWindow').text('Cancel');
      var newKendoWidget = setUpDataWidget('#dataWindow');
      var kendoDataWidget = newKendoWidget[0],
          offCanvasWidget = newKendoWidget[1];
      thisWindow.close();
      insertDataWidget(kendoDataWidget, context, section, null, offCanvasWidget, null);
      section.find('.tile-loading-cover').fadeOut().remove();
    });
    $('#dataWindow .closeWindow').on('click', function () {
      thisWindow.close();
      $('#dataWindow .closeWindow').text('Cancel');
    });
  } // data widget window close function
  
  function dataWindowClose() {
    state.openWindow = null;
    $('#addDataButtonPopoverWrap').tooltip('destroy');
    $('#addDataButtonPopoverWrap').removeClass('disabled');
    $('#initial-fields-list-data-window [data-tooltip="tooltip"]').tooltip('destroy');
    $('body').removeClass('window-open');
    $('#dataWindow').removeClass('parentWidgetIsEntryForm');
    $('#dataWindow #data_show_caption').prop('checked', true);
    $('#dataWindow #isMandatory').prop('checked', false);
    $('#dataWindow #isMandatory').parent().removeClass('active');
    $('#dataWindow #data_show_caption').parent().addClass('active');
    $("#dataWindow input[name='data-fields-radios']:checked").prop('checked', false);
    $("#dataWindow input[name='link_as_button']").prop('checked', false);
    $("#dataWindow input[name='link_as_button']").parent().removeClass('active');
    $('#dataWindow .link-button-colour').hide();
    $('#dataWindow .quickAddEntryField').off();
    $('#dataWindow input:not(.typeahead-fields)').off();
    $('#dataWindow .change-button-back').off();
    $('#dataWindow #addDataWidgetButton').off();
    $('#dataWindow #addDataWidgetButton').css('opacity', '');
    $('#dataWindow .closeWindow').off();
    $('#initial-fields-list-data-window.fieldsPanelBar .list-group-item.field-name').off();
  
    if (!$('#dataWindow .data-text-colour-options .sys-bg-inverse').hasClass('active')) {
      $('#dataWindow .data-text-colour-options .sys-bg-inverse').button('toggle');
    }
  
    $('.quickAddEntryField.btn-success').removeClass('btn-success').addClass('btn-primary').html('Quick add');
  
    if (!$('#dataWindow .data-background-colour-options .sys-bg-white').hasClass('active')) {
      $('#dataWindow .data-background-colour-options .sys-bg-white').button('toggle');
    }
  
    $('#dataWindow .icon-field-container > .radio-btn-group').empty();
    $('#dataWindow .data-section-pane-2, #dataWindow .data-section-pane-3').hide();
    $('#dataWindow .data-section-pane-1').velocity('fadeIn', {
      duration: 1
    });
    $('.text-colour-weight-options').show();
    $('#fieldStylingOptions').hide();
    $('.typeahead-fields, #off_canvas_title_data_window').val('');
    $('#addDataWidgetButton').addClass('disabled');
    $('#addDataWidgetButton').prop('disabled', true);
    delete state.dataWindowFieldsList;
    $('#initial-fields-list-data-window-wrapper').empty().html('<ul id="initial-fields-list-data-window" class="fieldsPanelBar"></ul>');
    $('#chart-fields-list').empty();
    $('#dataWindow .icon-option').show(); // window.viewModel.set('targetLayoutWidget', null);
  } // data Edit Window open function
  
  function dataEditWindowOpen() {
    var _this = this;
  
    state.openWindow = 'dataEditWindow';
    var thisWindow = this;
    var _a = thisWindow.options,
        context = _a.context,
        tempOffCanvasJSON = _a.tempOffCanvasJSON,
        tempDataWidgetJSON = _a.tempDataWidgetJSON;
    $('body').addClass('window-open');
    sysproInterop.getAvailableFields(function (output) {
      // if (output.Fields && output.Fields.DisplayFields && output.Fields.DisplayFields.Charts) {
      //   $('#chart-fields-list-edit-window').html(processChartWidgetFields(output.Fields.DisplayFields.Charts));
      // }
      var fieldListHTML = processDataWidgetFields(output.Fields);
      $('#initial-fields-list-data-edit-window').html(fieldListHTML);
      $('#initial-fields-list-data-edit-window [data-tooltip="tooltip"]').tooltip();
      state.dataEditWindowFieldsList = $('#initial-fields-list-data-edit-window').drilldown();
      kendo.bind($('#dataEditWindow'), window.viewModel);
      var currentItem;
  
      if ($('#initial-fields-list-data-edit-window .list-group-item.active')) {
        currentItem = $('#initial-fields-list-data-edit-window .list-group-item.active');
        currentItem.addClass('active');
        state.dataEditWindowFieldsList[0].resetDdMenu();
        state.dataEditWindowFieldsList[0].drillto(currentItem.closest('.dd-parent').parent().closest('.dd-parent'));
        state.dataEditWindowFieldsList[0].drillto(currentItem.closest('.dd-parent'));
        setTimeout(function () {
          state.dataEditWindowFieldsList[0].partResetDdMenu();
          $('#initial-fields-list-data-edit-window').scrollTop($('#initial-fields-list-data-edit-window .list-group-item.active').position().top - 140);
        }, 300);
      }
  
      $('#initial-fields-list-data-edit-window .list-group-item.field-name').on('click', function () {
        var activeField = $(_this);
        $("#dataEditWindow [name='linklist_link_text']").val(activeField.data('description'));
        setupDataWindowUI('#dataEditWindow', activeField, context.targetLayoutWidget.DisplayStyle);
      });
      setupDataWindowUI('#dataEditWindow', currentItem, context.targetLayoutWidget.DisplayStyle);
      changeOffCanvasOptions('dataEditWindow', 'data-edit');
      $("#dataEditWindow input[name='link_as_button']").prop('checked', window.viewModel.selected.SubType === 'Button' || window.viewModel.selected.SubType === 'Display-Button');
      $('#dataEditWindow .link-button-colour').toggle($("#dataEditWindow input[name='link_as_button']").prop('checked') === true);
      $('#dataEditWindow .text-colour-weight-options').toggle($("#dataEditWindow input[name='link_as_button']").prop('checked') !== true);
      $('#dataEditWindow input').each(function (_idx, elem) {
        $(elem).parent('label').toggleClass('active', $(elem).prop('checked'));
      });
      $('#dataEditWindow .drilldown-loading-cover').fadeOut();
    }, function (error) {
      console.log("Error: " + error);
    }, 'Fields,LinksAvailable');
    setColourPicker('#dataEditWindow');
    var targetLayoutWidgetDisplayStyle = context.targetLayoutWidget.DisplayStyle;
  
    if (targetLayoutWidgetDisplayStyle === 0 || targetLayoutWidgetDisplayStyle === 2) {
      hideShowDataWidgetOptions('#dataEditWindow', false, true, false, false, true, false, false, true, true, true, false, true, true);
    } else if (targetLayoutWidgetDisplayStyle === 1) {
      hideShowDataWidgetOptions('#dataEditWindow', false, true, false, false, true, false, false, false, false, false, false, false, true);
    } else if (targetLayoutWidgetDisplayStyle === 3) {
      hideShowDataWidgetOptions('#dataEditWindow', false, true, true, false, false, false, false, false, false, false, true, false, false);
    } else if (targetLayoutWidgetDisplayStyle === 5) {
      hideShowDataWidgetOptions('#dataEditWindow', false, true, true, true, true, false, false, false, false, false, false, false, false);
      $('#dataEditWindow').addClass('parentWidgetIsEntryForm');
    }
  
    $("#dataEditWindow input[name='link_as_button']").on('change', function (e) {
      $('#dataEditWindow .link-button-colour').toggle($(e.currentTarget).prop('checked') === true);
      $('#dataEditWindow .text-colour-weight-options').toggle($(e.currentTarget).prop('checked') !== true);
      window.viewModel.selected.SubType = document.querySelector('#dataEditWindow input[name="link_as_button"]:checked') !== null ? 'Button' : null;
    });
  
    if (context.targetLayoutWidget.SubType === 'Joined') {
      $('#dataEditWindow .fieldBackgroundColorOption').hide();
    } else if (targetLayoutWidgetDisplayStyle === 0 || targetLayoutWidgetDisplayStyle === 2) {
      $('#dataEditWindow .fieldBackgroundColorOption').show();
    }
  
    $("#dataEditWindow input[name='data-edit-window-off-canvas-type']").on('change', function () {
      changeOffCanvasOptions('dataEditWindow', 'data-edit');
    });
    $('#dataEditWindow #editDataWidgetSaveButton').on('click', function () {
      var currentDataWidgetHTML;
  
      if (targetLayoutWidgetDisplayStyle === 5) {
        if (context.targetLayoutWidget.Rows && context.targetLayoutWidget.Rows.length && context.targetLayoutWidget.Rows[0].Columns && context.targetLayoutWidget.Rows[0].Columns.length && context.targetLayoutWidget.Rows[0].Columns[context.section_num].IsDisplayOnly) {
          window.viewModel.selected.SubType = window.viewModel.selected.SubType === 'Button' ? 'Display-Button' : window.viewModel.selected.SubType.startsWith('Display') ? window.viewModel.selected.SubType : 'Display';
          currentDataWidgetHTML = $("[data-guid=\"" + window.viewModel.selected.Id + "\"]");
        } else {
          currentDataWidgetHTML = window.viewModel.selected.TypeName === 'LinkWidget' || window.viewModel.selected.HasSmartTag === true ? $("[data-guid=\"" + window.viewModel.selected.Id + "\"]").closest('a') : $("[data-guid=\"" + window.viewModel.selected.Id + "\"]");
        }
      }
  
      var targetParentWidgetjQuery = currentDataWidgetHTML.parents('.draggable-row-section');
      sysproInterop.getHtmlFromModel('Widget', stringifyJSONObject(window.viewModel.selected.Id, context.currentDataSource), function (result) {
        var newDataWidgetHTMLjQuery = $($.trim(result));
        currentDataWidgetHTML.replaceWith(newDataWidgetHTMLjQuery);
        kendo.bind($('#dataEditWindow'), window.viewModel);
        sysproInterop.performBind(state.bindableFieldsData, true, '', targetParentWidgetjQuery);
  
        if (window.viewModel.selectedOffCanvas) {
          editOffCanvasSection();
          insertOffCanvasSection(window.viewModel.selectedOffCanvas, true, tempOffCanvasJSON, function () {
            if (window.viewModel.selectedOffCanvas.OffCanvas == 3) {
              newDataWidgetHTMLjQuery.find('a').removeClass('offcanvas-toggle');
              newDataWidgetHTMLjQuery.find('a').on('click', function (e) {
                window.viewModel.offCanvasWindows[$(e.currentTarget).data('target')].center().open();
              });
            } else {
              $("#offcanvas-" + window.viewModel.selectedOffCanvas.Id).removeClass('js-offcanvas-done');
              var initOffCanvas = newDataWidgetHTMLjQuery.hasClass('offcanvas-toggle') ? new Offcanvas(newDataWidgetHTMLjQuery) : new Offcanvas(newDataWidgetHTMLjQuery.find('a.offcanvas-toggle'));
            }
  
            thisWindow.close();
          });
        }
  
        initEditRemoveDataWidget();
        initDataWidgetSorting();
        finishAddLayoutWidget();
        if (!window.viewModel.selectedOffCanvas) thisWindow.close();
      }, context.targetLayoutWidget.SubType, context.targetLayoutWidget.DisplayStyle, context.targetLayoutWidget.Border, context.section_num, function (error) {
        console.log(error);
        thisWindow.close();
      }, false);
    });
    $('#dataEditWindow .closeWindow').on('click', function () {
      for (var datakey in tempDataWidgetJSON) {
        if (Object.prototype.hasOwnProperty.call(tempDataWidgetJSON, datakey)) {
          window.viewModel.selected.set(datakey, tempDataWidgetJSON[datakey]);
        }
      }
  
      for (var datakey in tempOffCanvasJSON) {
        if (Object.prototype.hasOwnProperty.call(tempOffCanvasJSON, datakey)) {
          if (datakey !== 'IsToolbarVisible') {
            window.viewModel.selectedOffCanvas.set(datakey, tempOffCanvasJSON[datakey]);
          } else {
            window.viewModel.selectedOffCanvas.MainToolbar.set('IsToolbarVisible', tempOffCanvasJSON.IsToolbarVisible);
          }
        }
      }
  
      thisWindow.close();
    });
  } // data Edit Window close function
  
  function dataEditWindowClose() {
    state.openWindow = null; // Reload the JSON object into the dataSource to prevent issues with immediate removal, or dragging and dropping of same layout widget.
  
    this.options.context.currentDataSource.data(this.options.context.currentDataSource.data().toJSON());
  
    if (window.viewModel.selectedOffCanvas) {
      window.viewModel.selectedOffCanvas.Columns.data(window.viewModel.selectedOffCanvas.Columns.data().toJSON());
      window.viewModel.selectedOffCanvas.MainToolbar.Columns.data(window.viewModel.selectedOffCanvas.MainToolbar.Columns.data().toJSON());
      window.viewModel.set('selectedOffCanvas', null);
    }
  
    $('#initial-fields-list-data-edit-window .list-group-item.field-name').off();
    $('#initial-fields-list-data-edit-window [data-tooltip="tooltip"]').tooltip('destroy');
    $('#dataEditWindow input:not(.typeahead-fields)').off();
    $('#dataEditWindow #editDataWidgetSaveButton').off();
    $('#dataEditWindow .closeWindow').off();
    $('#dataEditWindow .link-button-colour').hide();
    $('body').removeClass('window-open');
    $('#dataEditWindow').removeClass('parentWidgetIsEntryForm');
    $('.typeahead-fields').val('');
    $('#dataEditWindow .data-section-pane-2, #dataEditWindow .data-section-pane-3').hide();
    $('#dataEditWindow .data-section-pane-1').velocity('fadeIn', {
      duration: 1
    });
    $('#dataEditWindow .icon-field-container > .radio-btn-group').empty();
    $('#chart-fields-list-edit-window').empty();
    $('#initial-fields-list-data-edit-window-wrapper').empty().html('<ul id="initial-fields-list-data-edit-window" class="fieldsPanelBar"></ul>');
    delete state.dataEditWindowFieldsList;
    $('#dataEditWindow .icon-option').show();
    window.viewModel.set('selected', null);
  }
  
  function showTileParameters(tileName, tileWindow) {
    $('.tile-parameter-wrapper').hide(); // $(`#${tileWindow} .${tileName}Parameters`).show();
  
    $("#" + $.escapeSelector("#" + tileWindow + " ." + tileName + "Parameters")).show();
  } // Determine which colour choices users can make for foreground or background choices, depending on their choice in one of those options
  
  
  function setupTileWIndowUI(tileWindow) {
    $("#" + tileWindow + " input[name='tile_background_colour']").on('change', function (e) {
      setColourPickerDotColour("#" + tileWindow, e.currentTarget, '.tile-text-colour-options');
    });
    $("#" + tileWindow + " input[name='tile_text_colour']").on('change', function (e) {
      setColourPickerDotColour("#" + tileWindow, e.currentTarget, '.tile-background-colour-options');
    });
    $("#" + tileWindow + ".clear-color-selections").on('click', function (e) {
      e.preventDefault();
      $('.tile-text-colour-options .btn-radio').removeClass('disabled');
      $('.tile-background-colour-options .btn-radio').removeClass('disabled');
    });
  } // Helper function to set correct active states and selected tile in view model when a user selects a tile from the autopredict search.
  
  
  function selectTileFromSearch(item) {
    if (state.openWindow === 'tileWindow') {
      $('#tile-widgets-list-wrapper .list-group-item.active').removeClass('active');
      var currentItem = $("#tile-widgets-list-wrapper .list-group-item[data-tile-name='" + item.tileName + "']");
      currentItem.addClass('active');
      state.tilesList[0].resetDdMenu();
      state.tilesList[0].drillto(currentItem.closest('.dd-parent').parent().closest('.dd-parent'));
      state.tilesList[0].drillto(currentItem.closest('.dd-parent'));
      setTimeout(function () {
        $('#tiles-list').scrollTop($('#tiles-list .list-group-item.active').position().top - 140);
      }, 300);
      showTileParameters($(this).data('tile-name'), state.openWindow);
      $('#addTileButton').removeClass('disabled');
      $('#addTileButton').prop('disabled', false);
      $('#addTileButtonPopoverWrap').tooltip('destroy');
      $('#addTileButtonPopoverWrap').removeClass('disabled');
    }
  
    setupTileWIndowUI(state.openWindow);
  } // Tile window open function
  
  
  function tileWindowOpen() {
    var _this = this;
  
    $('#loading-cover').hide();
    state.openWindow = 'tileWindow';
    var thisWindow = this;
    var context = thisWindow.options.context;
    var tilesJSON;
    sysproInterop.getAvailableFields(function (output) {
      var tilesListHTML = processTiles(output.Fields.TilesAvailable);
      tilesJSON = JSON.parse(sysproInterop.retrieveData('tilesJSON'));
      var tileOptionsHTML = processTileOptions(tilesJSON, null);
      $('#tiles-parameters-wrapper').append(tileOptionsHTML);
      $('.typeahead-tiles').typeahead({
        source: state.tilesSearchJSON,
        autoSelect: true,
        afterSelect: selectTileFromSearch
      });
      $('#tiles-list').html(tilesListHTML);
      state.tilesList = $('#tiles-list').drilldown();
      $('#tiles-list').on('click', '.list-group-item.field-name', function (e) {
        $('#tiles-list li.active').removeClass('active');
        $(e.currentTarget).addClass('active');
        $('.tile-kpi-indicator-option').toggle($(_this).data('kpi-indicator') === 'Y');
        showTileParameters($(e.currentTarget).data('tile-name'), state.openWindow);
        $('#addTileButton').removeClass('disabled');
        $('#addTileButton').prop('disabled', false);
        $('#addTileButtonPopoverWrap').tooltip('destroy');
        $('#addTileButtonPopoverWrap').removeClass('disabled');
      });
      setupTileWIndowUI(state.openWindow);
      $('#tileWindow .drilldown-loading-cover').fadeOut();
    }, function (error) {
      console.log("Error: " + error);
    }, 'TilesAvailable');
    $('body').addClass('window-open');
    $('#addTileButtonPopoverWrap').tooltip({
      html: false,
      trigger: 'hover',
      placement: 'top',
      delay: {
        show: 100,
        hide: 100
      },
      title: 'Select and configure a tile to proceed'
    });
    $('#addTileButtonPopoverWrap').addClass('disabled');
    $('#tileWindow input').each(function (_idx, elem) {
      $(elem).parent('label').toggleClass('active', $(elem).prop('checked'));
    });
    setColourPicker('#tileWindow');
    $('#tileWindow .btn-primary').on('click', function () {
      $(".layout-widget[data-guid=\"" + context.layoutWidgetGuid + "\"]").find('.tiles-parent .tile-loading-cover').first().show(100, function () {
        var tileWidth = $("#tileWindow input[name='tile_width']:checked").val();
        var tileName = $('#tileWindow #tiles-list .list-group-item.active').data('tile-name').replace('IMPMENLZ', '');
        var detailAvailable = $('#tileWindow #tiles-list .list-group-item.active').data('detail-available');
        var subType = $('#tileWindow #tiles-list .list-group-item.active').data('sub-type');
        var kpiIndicator = $('#tileWindow #tiles-list .list-group-item.active').data('kpi-indicator');
        var kpiIndicatorType = $("#tileWindow select[name='tile_kpi_indicator']").val();
        var tileBackgroundColour = $("#tileWindow input[name='tile_background_colour']:checked").val();
        var tileForegroundColour = $("#tileWindow input[name='tile_text_colour']:checked").val();
        var enteredTileParameters = {};
        var tileParameters = tilesJSON[tileName];
        var rawTileType = $('#tileWindow #tiles-list .list-group-item.active').data('tile-type');
        var tileType = rawTileType === 'MLText' && kpiIndicator === 'Y' && kpiIndicatorType === 'gauge' ? 'MLGauge' : rawTileType === 'Text' && kpiIndicator === 'Y' && kpiIndicatorType === 'gauge' ? 'TextGauge' : rawTileType;
  
        if (tileParameters !== undefined && tileParameters.hasOwnProperty('Parameter')) {
          if (tileParameters.Parameter.length) {
            for (var tp = 0; tp < tileParameters.Parameter.length; tp++) {
              if (tileParameters.Parameter[tp].ParamType == 'A') {
                enteredTileParameters[tileParameters.Parameter[tp].ParamName] = $("#tiles-parameters-wrapper ." + tileName + "Parameters input[name='" + tileParameters.Parameter[tp].ParamName + "']").val();
              } else if (tileParameters.Parameter[tp].ParamType == 'L') {
                enteredTileParameters[tileParameters.Parameter[tp].ParamName] = $("#tiles-parameters-wrapper ." + tileName + "Parameters select[name='" + tileParameters.Parameter[tp].ParamName + "']").val();
              }
            }
          } else if (tileParameters.Parameter.ParamType == 'A') {
            enteredTileParameters[tileParameters.Parameter.ParamName] = $("#tiles-parameters-wrapper ." + tileName + "Parameters input[name='" + tileParameters.Parameter.ParamName + "']").val();
          } else if (tileParameters.Parameter.ParamType == 'L') {
            enteredTileParameters[tileParameters.Parameter.ParamName] = $("#tiles-parameters-wrapper ." + tileName + "Parameters select[name='" + tileParameters.Parameter.ParamName + "']").val();
          }
        }
  
        var IconOption = document.querySelector('#tileWindow .icon-field-container .icon-option.active') !== null ? $('#tileWindow .icon-field-container .icon-option.active').data('icon-name') : null;
        var IconColour = document.querySelector('#tileWindow input[name="tile_icon_colour"]:checked') !== null ? document.querySelector('#tileWindow input[name="tile_icon_colour"]:checked').value : null;
        var tileTypeDetail = subType && subType.indexOf('Plugin') === 0 ? subType : tileName;
        var parentFieldPath = $('#tileWindow #tiles-list .list-group-item.active').data('tile-keyfield');
        var Id1 = sysproInterop.generateUUID();
        var Id2 = sysproInterop.generateUUID();
        var newTileWidget = new dataWidgetModel({
          Id: Id1,
          Title: tileName,
          FieldName: '',
          FieldPath: '',
          HasSmartTag: false,
          DataType: 'A',
          KeyField: parentFieldPath,
          KeyAction: undefined,
          parentFieldPath: parentFieldPath,
          TypeName: 'Tile',
          SubType: subType,
          KpiLevelIndicator: kpiIndicator,
          Details: {
            Color: tileForegroundColour
          },
          BackgroundColor: tileBackgroundColour,
          TileParameters: enteredTileParameters,
          TileWidth: tileWidth,
          TileTypeDetail: tileTypeDetail,
          TileType: tileType,
          TileTypeIcon: IconOption,
          DetailAvailable: detailAvailable,
          TileTypeIconColor: IconColour,
          Caption: {
            Color: 8,
            Size: 0
          },
          HTMLContent: function HTMLContent() {
            var uid = sysproInterop.generateUUID();
            sysproInterop.getHtmlFromModel('Widget', newTileWidget.toJSON(), function (result) {
              $("#async_" + uid).html($.trim(result));
            }, '', '', '', '', function (error) {
              console.log(error);
            }, false);
            return "<div id='async_" + uid + "'> </div>";
          }
        });
  
        if (context.targetLayoutWidget.children.at(0).hasOwnProperty('Columns')) {
          var columnIndex = context.targetLayoutWidget.children.at(0).Columns.length;
          var newColumn = new columnModel({
            Id: Id2,
            index: columnIndex,
            ResponsiveStyle: tileWidth
          });
          newColumn.append(newTileWidget);
          context.targetLayoutWidget.children.at(0).append(newColumn);
        } else {
          var newColumn = new columnModel({
            Id: Id2,
            index: 0,
            ResponsiveStyle: tileWidth
          });
          newColumn.append(newTileWidget);
          context.targetLayoutWidget.children.at(0).append(newColumn);
        }
  
        initiateTiles(context.targetLayoutWidget);
        initEditRemoveDataWidget();
        thisWindow.close();
      });
    });
    $('#tileWindow .closeWindow').on('click', function () {
      thisWindow.close();
    });
  } // tile window close function
  
  function tileWindowClose() {
    state.openWindow = null;
    $('#addTileButtonPopoverWrap').tooltip('destroy');
    $('#addTileButtonPopoverWrap').removeClass('disabled');
    $('body').removeClass('window-open');
    $('#tile-list-option').hide();
    $('.hide-on-close').hide();
    $('.tile-parameter-wrapper').hide();
    $("#tileWindow input[type='text']").val('');
    $('#tileWindow .list-group-item.active').removeClass('active');
    $('#tileWindow .tile_width').prop('checked', false);
    $("#tileWindow input[name='tile_width'][value='2']").prop('checked', true);
    $('#tile-text-option').hide();
    $('#tile_list').html();
    $('#tiles-list').off();
    $('#tileWindow .closeWindow').off();
    $('#tileWindow .btn-primary').off();
    $("#tileWindow input[name='tile_background_colour']").off();
    $("#tileWindow input[name='tile_text_colour']").off();
    $('#tileWindow .clear-color-selections').off();
    $('#addTileButton').addClass('disabled');
    $('#addTileButton').prop('disabled', true);
    $('#tileWindow .fieldsPanelBar').scrollTop(0);
    $('#tileWindow .icon-option').show();
    $('#tile-widgets-list-wrapper').empty().html('<ul id="tiles-list" class="fieldsPanelBar"></ul>');
    $('#tiles-parameters-wrapper').empty();
    delete state.tilesList;
    $('#tileWindow .icon-field-container > .radio-btn-group').empty();
    $('#tileWindow .data-section-pane-2').hide();
    $('#tileWindow .data-section-pane-1').velocity('fadeIn', {
      duration: 1
    });
    $('.tile-text-colour-options .btn-radio').removeClass('disabled');
    $('.tile-background-colour-options .btn-radio').removeClass('disabled');
  } // Tile edit window open function
  
  function tileEditWindowOpen() {
    $('#loading-cover').hide();
    state.openWindow = 'tileEditWindow';
    var thisWindow = this;
    var _a = thisWindow.options,
        context = _a.context,
        tempDataWidgetJSON = _a.tempDataWidgetJSON;
    var tilesJSON;
    sysproInterop.getAvailableFields(function (output) {
      if (!state.tilesJSONReady) processTileJSON(output.Fields.TilesAvailable);
      tilesJSON = JSON.parse(sysproInterop.retrieveData('tilesJSON'));
      var tileOptionsHTML = processTileOptions(tilesJSON, window.viewModel.selected.Widgets[0].TileTypeDetail);
      $('#tiles-edit-parameters-wrapper').append(tileOptionsHTML);
      $('#tiles-edit-parameters-wrapper').find('input, select').each(function (_idx, elem) {
        $(elem).attr('id', $(elem).attr('id') + "Edit");
      });
      $('.typeahead-tiles').typeahead({
        source: state.tilesSearchJSON,
        autoSelect: true,
        afterSelect: selectTileFromSearch
      });
      kendo.bind($('#tileEditWindow'), window.viewModel);
      $('#tileEditWindow input').each(function (_idx, elem) {
        $(elem).parent('label').toggleClass('active', $(elem).prop('checked'));
      });
      showTileParameters(window.viewModel.selected.Widgets[0].TileTypeDetail, 'tileEditWindow');
      $('#tileEditWindow .tile-kpi-indicator-option').toggle(window.viewModel.selected.Widgets[0].KpiLevelIndicator === 'Y');
      setupTileWIndowUI('tileEditWindow');
    }, function (error) {
      console.log("Error: " + error);
    }, 'TilesAvailable');
    $('body').addClass('window-open');
    setColourPicker('#tileEditWindow');
    $('#tileEditWindow .btn-primary').on('click', function () {
      initiateTiles(context.targetLayoutWidget);
      initEditRemoveDataWidget();
      thisWindow.close();
    });
    $('#tileEditWindow .closeWindow').on('click', function () {
      for (var datakey in tempDataWidgetJSON) {
        window.viewModel.selected.Widgets[0].set(datakey, tempDataWidgetJSON[datakey]);
      }
  
      initiateTiles(context.targetLayoutWidget);
      initEditRemoveDataWidget();
      thisWindow.close();
    });
  } // tile window close function
  
  function tileEditWindowClose() {
    state.openWindow = null;
    $('body').removeClass('window-open');
    $('#tileEditWindow .data-section-pane-2').hide();
    $('#tileEditWindow .data-section-pane-1').velocity('fadeIn', {
      duration: 1
    });
    $('#tileEditWindow .fieldsPanelBar').scrollTop(0);
    $('#tileEditWindow .icon-option').show();
    $('.hide-on-close').hide();
    $('.tile-text-colour-options .btn-radio').removeClass('disabled');
    $('.tile-background-colour-options .btn-radio').removeClass('disabled');
    $('#tileEditWindow .btn-primary').off();
    $('#tileEditWindow .closeWindow').off();
    $("#tileEditWindow input[name='tile_background_colour']").off();
    $("#tileEditWindow input[name='tile_text_colour']").off();
    $('#tileEditWindow .clear-color-selections').off();
    $('#tileEditWindow .icon-field-container > .radio-btn-group').empty();
    $('#tiles-edit-parameters-wrapper').empty();
    window.viewModel.set('selected', null);
  } // Kendo Window version of data widget
  
  function toolbarWindowOpen() {
    state.openWindow = 'toolbarWindow';
    var thisWindow = this;
    var _a = thisWindow.options,
        context = _a.context,
        parentToolbarWidgetHTML = _a.parentToolbarWidgetHTML,
        parentToolbarWidget = _a.parentToolbarWidget;
    var hierarchicalLevel;
    $('body').addClass('window-open');
  
    function completeOffCanvasConfigAnimation() {
      $('#configureToolbarOffCanvasPopoverWrap').velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $('#addToolbarWidgetButtonPopoverWrap').velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $('#addToolbarWidgetButton').removeClass('disabled');
              $('#addToolbarWidgetButton').prop('disabled', false);
              $('#addToolbarWidgetButtonPopoverWrap').tooltip('destroy');
              $('#addToolbarWidgetButtonPopoverWrap').removeClass('disabled');
            }
          });
        }
      });
    }
  
    function startOffCanvasConfigAnimation() {
      $('#addToolbarWidgetButtonPopoverWrap').velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $('#configureToolbarOffCanvasPopoverWrap').velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $('#configureToolbarOffCanvasPopoverWrap').off('click', completeOffCanvasConfigAnimation).on('click', completeOffCanvasConfigAnimation);
            }
          });
        }
      });
    }
  
    sysproInterop.getAvailableFields(function (output) {
      window.joey = output.Fields;
      $('#toolbar-widgets-list').html(processToolbarWidgetFields(output.Fields.ToolbarActions));
      state.toolbarActionsList = $('#toolbar-widgets-list').drilldown();
      setupToolbarWindowUI(null, parentToolbarWidget, parentToolbarWidgetHTML, false);
  
      if (parentToolbarWidget !== null && parentToolbarWidgetHTML.hasClass("dropdown-submenu") && parentToolbarWidgetHTML.parents(".dropdown-submenu").length === 1) {
        hierarchicalLevel = 3;
      } else if (parentToolbarWidget !== null && parentToolbarWidgetHTML.hasClass("dropdown-submenu") && parentToolbarWidgetHTML.parents(".dropdown-submenu").length === 0) {
        hierarchicalLevel = 2;
      } else if (parentToolbarWidget !== null && !parentToolbarWidgetHTML.hasClass("dropdown-submenu")) {
        hierarchicalLevel = 1;
      } else if (parentToolbarWidget === null) {
        hierarchicalLevel = 0;
      }
  
      $('#toolbar-widgets-list.fieldsPanelBar .list-group-item.field-name').on('click', function (e) {
        var activeField = $(e.currentTarget);
        setupToolbarWindowUI(activeField, parentToolbarWidget, parentToolbarWidgetHTML, false);
      });
      $('#toolbarWindow .OffCanvasToolbarItem').toggle(context.canvas_id === null);
      $('#toolbarWindow .drilldown-loading-cover').fadeOut();
    }, function (error) {
      console.log("Error: " + error);
    }, 'ToolbarActions');
    $('#addToolbarWidgetButtonPopoverWrap').tooltip({
      html: false,
      trigger: 'hover',
      placement: 'top',
      delay: {
        show: 100,
        hide: 100
      },
      title: 'Select and configure a toolbar widget to proceed'
    });
    $('#addToolbarWidgetButtonPopoverWrap').addClass('disabled');
    setColourPicker('#toolbarWindow');
    $('#toolbarWindow .change-button-back').on('click', startOffCanvasConfigAnimation);
    $("#toolbarWindow input[name='toolbar-window-off-canvas-type']").on('change', function () {
      var ocLayout = $("#toolbarWindow input[name='toolbar-window-off-canvas-type']:checked").val();
  
      if (ocLayout == 3) {
        $('#toolbarWindow .not-available-for-windows').hide();
        $("input[name='toolbar-window-offcanvas-column-layout'], #offcanvas_toolbar_option").prop('checked', false);
        $('.offcanvas-layout-options label').removeClass('active');
        $('#offcanvas_toolbar_option').parent().removeClass('active');
        $('#offcanvas-1col').prop('checked', true);
        $('#offcanvas-1col').parent().addClass('active');
      } else {
        $('#toolbarWindow .not-available-for-windows').show();
      }
    });
    $('#toolbarWindow #addToolbarWidgetButton').on('click', function () {
      if (parentToolbarWidgetHTML) {
        parentToolbarWidgetHTML.find('> .dropdown-menu').append('<li class="toolbar-placeholder"><div class="tile-loading-cover" style="display:block;"><div class="loader"><div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div></div></li>');
      } else if (context.canvas_id !== null) {
        $("#offcanvas-" + context.canvas_id + " ul.nav[data-column='" + context.column_num + "']").append('<li class="toolbar-placeholder"><div class="tile-loading-cover" style="display:block;"><div class="loader"><div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div></div></li>');
      } else {
        $("#navbar-toolbar ul.nav[data-column='" + context.column_num + "']").append('<li class="toolbar-placeholder"><div class="tile-loading-cover" style="display:block;"><div class="loader"><div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div></div></li>');
      }
  
      var TypeName;
      var toolbarWidgetData;
      var Type;
      var offCanvasWidget;
      var isOffCanvas = false;
      var IconOption = document.querySelector('#toolbarWindow .icon-field-container .icon-option.active') !== null ? $('#toolbarWindow .icon-field-container .icon-option.active').data('icon-name') : null;
      var IconColour = document.querySelector('#toolbarWindow input[name="toolbar_icon_colour"]:checked') !== null ? document.querySelector('#toolbarWindow input[name="toolbar_icon_colour"]:checked').value : null;
      var IconAlign = document.querySelector('#toolbarWindow input[name="toolbar_icon_alignment"]:checked') !== null ? document.querySelector('#toolbarWindow input[name="toolbar_icon_alignment"]:checked').value : 0;
      var toolbarWidgetClone = $('#toolbarWindow #toolbar-widgets-list .list-group-item.active.field-name').clone();
      toolbarWidgetClone.find('i').remove();
      var FieldName = toolbarWidgetClone.data('field-name');
      var Tooltip = $('#toolbarWindow #toolbar_item_tooltip').val();
      var ToolbarWidgetType = toolbarWidgetClone.data('toolbar-widget-type');
      var Caption = $('#toolbarWindow #toolbar_item_text').val();
      var IconVisibility = IconOption !== null;
  
      if (FieldName === 'ButtonWidget') {
        isOffCanvas = true;
        TypeName = 'ButtonWidget';
        Type = 'Widget';
        var offCanvasType = document.querySelector('#toolbarWindow input[name="toolbar-window-off-canvas-type"]:checked').value;
        var columnLayout = document.querySelector('#toolbarWindow input[name="toolbar-window-offcanvas-column-layout"]:checked').value;
        var OffCanvasLayoutId = sysproInterop.generateUUID();
        var offCanvasTitle = $('#toolbarWindow #off_canvas_title').val();
        var Toolbar = document.querySelector('#toolbarWindow input[name="offcanvas_toolbar_option"]:checked') ? true : null;
        offCanvasWidget = setupOffCanvasSection(OffCanvasLayoutId, offCanvasTitle, offCanvasType, Toolbar, columnLayout);
        toolbarWidgetData = {
          Id: sysproInterop.generateUUID(),
          Title: Caption,
          FieldName: FieldName,
          TypeName: TypeName,
          ToolbarWidgetType: ToolbarWidgetType,
          Icon: {
            Name: IconOption,
            Color: IconColour,
            Alignment: IconAlign,
            Visibility: IconVisibility
          },
          Tooltip: Tooltip,
          OffCanvasLayoutId: OffCanvasLayoutId
        };
      } else {
        if (FieldName === 'ToolbarDropdown') {
          TypeName = Type = 'ToolbarDropdown';
        } else if (FieldName === 'ToolbarSubDropdown') {
          TypeName = Type = 'ToolbarSubDropdown';
        } else {
          TypeName = Type = 'ToolbarWidget';
        }
  
        toolbarWidgetData = {
          Id: sysproInterop.generateUUID(),
          Title: Caption,
          FieldName: FieldName,
          TypeName: TypeName,
          ToolbarWidgetType: ToolbarWidgetType,
          Icon: {
            Name: IconOption,
            Color: IconColour,
            Alignment: IconAlign,
            Visibility: IconVisibility
          },
          Tooltip: Tooltip
        };
      }
  
      var KendoToolbarWidget = hierarchicalLevel === 0 ? new toolbarWidgetModel(toolbarWidgetData) : hierarchicalLevel === 1 ? new toolbarSubWidgetModel(toolbarWidgetData) : hierarchicalLevel === 2 ? new toolbarSubSubWidgetModel(toolbarWidgetData) : new toolbarSubSubSubWidgetModel(toolbarWidgetData);
  
      if (parentToolbarWidget) {
        parentToolbarWidget.append(KendoToolbarWidget);
        var VBdata = context.currentToolbarDataSource.data().toJSON();
        context.currentToolbarDataSource.data(VBdata);
      } else if (context.canvas_id !== null) {
        var offCanvasSection = window.viewModel.OffCanvasLayouts["offcanvas-" + context.canvas_id];
        offCanvasSection.MainToolbar.Columns.at(context.column_num).append(KendoToolbarWidget);
      } else {
        window.viewModel.toolbar.at(context.column_num).append(KendoToolbarWidget);
      }
  
      thisWindow.close();
      var getHTMLMethod = Type === "ToolbarSubDropdown" ? "ToolbarDropdown" : Type;
      sysproInterop.getHtmlFromModel(getHTMLMethod, KendoToolbarWidget.toJSON(), function (result) {
        var newToolbarWidgetHTMLjQuery = $($.trim(result));
  
        if (context.canvas_id !== null) {
          if (parentToolbarWidgetHTML) {
            parentToolbarWidgetHTML.find('> .dropdown-menu').append(newToolbarWidgetHTMLjQuery);
          } else {
            $("#offcanvas-" + context.canvas_id + " ul.nav[data-column='" + context.column_num + "']").append(newToolbarWidgetHTMLjQuery);
          }
  
          sysproInterop.performBind(state.bindableFieldsData, true, '', $("#offcanvas-" + context.canvas_id));
        } else {
          if (parentToolbarWidgetHTML) {
            parentToolbarWidgetHTML.find('> .dropdown-menu').append(newToolbarWidgetHTMLjQuery);
          } else {
            $("#navbar-toolbar ul.nav[data-column='" + context.column_num + "']").append(newToolbarWidgetHTMLjQuery);
          }
  
          sysproInterop.performBind(state.bindableFieldsData, true, '', $('#navbar-toolbar'));
  
          if (isOffCanvas === true) {
            insertOffCanvasSection(offCanvasWidget, false, null, function () {
              if (offCanvasWidget.OffCanvas == 3) {
                newToolbarWidgetHTMLjQuery.removeClass('offcanvas-toggle');
                newToolbarWidgetHTMLjQuery.find('.offcanvas-toggle').on('click', function (e) {
                  window.viewModel.offCanvasWindows[$(e.currentTarget).data('target')].center().open();
                });
              } else {
                var initOffCanvas = new Offcanvas(newToolbarWidgetHTMLjQuery.find('a.offcanvas-toggle'));
              }
            });
          }
        }
  
        $.material.init();
        initEditRemoveToolbarWidgets();
        $('#navbar-toolbar [data-tooltip="tooltip"]').tooltip('destroy');
        $('#navbar-toolbar [data-tooltip="tooltip"]').tooltip();
  
        if (parentToolbarWidgetHTML) {
          parentToolbarWidgetHTML.find('.dropdown-menu').find('.toolbar-placeholder').fadeOut().remove();
        } else if (context.canvas_id !== null) {
          $("#offcanvas-" + context.canvas_id + " ul.nav[data-column='" + context.column_num + "']").find('.toolbar-placeholder').fadeOut().remove();
        } else {
          $("#navbar-toolbar ul.nav[data-column='" + context.column_num + "']").find('.toolbar-placeholder').fadeOut().remove();
        } // if (TypeName === 'ToolbarDropdown') initToolbarSorting();
  
  
        initToolbarSorting(); // if (!isOffCanvas) SYSPRO_VB.toolbarWindow.close();
      }, '', 7, '', '', function (error) {
        console.log(error);
        thisWindow.close();
      }, false);
    });
    $('#toolbarWindow .closeWindow').on('click', function () {
      thisWindow.close();
    });
  } // data widget window close function
  
  function toolbarWindowClose() {
    state.openWindow = null;
    $('body').removeClass('window-open');
    $('#addToolbarWidgetButtonPopoverWrap').tooltip('destroy');
    $('#addToolbarWidgetButtonPopoverWrap').removeClass('disabled');
  
    if (!$('#toolbarWindow .data-text-colour-options .sys-bg-inverse').hasClass('active')) {
      $('#toolbarWindow .data-text-colour-options .sys-bg-inverse').button('toggle');
    }
  
    $('.toolbar-text-option, #off_canvas_title').val('');
    $('#toolbarWindow .field-name.active').removeClass('active');
    $("#toolbarWindow input[name='data-fields-radios']:checked").prop('checked', false);
    $('#toolbar-widgets-list.fieldsPanelBar .list-group-item.field-name').off();
    $('#toolbarWindow .change-button-back').off();
    $("#toolbarWindow input[name='toolbar-window-off-canvas-type']").off();
    $('#toolbarWindow .closeWindow').off();
    $('#toolbarWindow #addToolbarWidgetButton').off();
    $('#toolbarWindow .hide-on-close').hide();
    $('#toolbarWindow .data-section-pane-2, #toolbarWindow .data-section-pane-3').hide();
    $('#toolbarWindow .data-section-pane-1').velocity('fadeIn', {
      duration: 1
    });
    $('#addToolbarWidgetButton').addClass('disabled');
    $('#addToolbarWidgetButton').prop('disabled', true);
    $('#toolbarWindow .icon-field-container > .radio-btn-group').empty();
    $('.typeahead-fields').val('');
    delete state.toolbarActionsList;
    $('#toolbar-widget-list-wrapper').empty().html('<ul id="toolbar-widgets-list" class="fieldsPanelBar list-group"></ul>');
    $('#toolbarWindow .icon-option').show();
  } // toolbar Edit Window open function
  
  function toolbarEditWindowOpen() {
    $('body').addClass('window-open');
    var thisWindow = this;
    var _a = thisWindow.options,
        context = _a.context,
        tempOffCanvasJSON = _a.tempOffCanvasJSON,
        tempToolbarWidgetJSON = _a.tempToolbarWidgetJSON,
        currentToolbarWidgetHTML = _a.currentToolbarWidgetHTML,
        parentToolbarWidgetHTML = _a.parentToolbarWidgetHTML,
        parentToolbarWidget = _a.parentToolbarWidget;
    state.openWindow = 'toolbarEditWindow';
    var hierarchicalLevel;
  
    function completeOffCanvasConfigAnimation() {
      $('#configureEditToolbarOffCanvasButton').velocity('fadeOut', {
        duration: 300,
        complete: function complete() {
          $('#editToolbarWidgetButton').velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $('#editToolbarWidgetButton').removeClass('disabled');
              $('#editToolbarWidgetButton').prop('disabled', false);
            }
          });
        }
      });
    }
  
    sysproInterop.getAvailableFields(function (output) {
      $('#edit-toolbar-widgets-list').html(processToolbarWidgetFields(output.Fields.ToolbarActions));
      state.toolbarActionsEditList = $('#edit-toolbar-widgets-list').drilldown();
      kendo.bind($('#toolbarEditWindow'), window.viewModel);
      setupToolbarEditWindowUI($('#edit-toolbar-widgets-list.fieldsPanelBar .list-group-item.field-name.active'), parentToolbarWidget, parentToolbarWidgetHTML, true, false);
  
      if (parentToolbarWidget !== null && parentToolbarWidgetHTML && parentToolbarWidgetHTML.hasClass("dropdown-submenu") && parentToolbarWidgetHTML.parents(".dropdown-submenu").length === 1) {
        hierarchicalLevel = 3;
      } else if (parentToolbarWidget !== null && parentToolbarWidgetHTML && parentToolbarWidgetHTML.hasClass("dropdown-submenu") && parentToolbarWidgetHTML.parents(".dropdown-submenu").length === 0) {
        hierarchicalLevel = 2;
      } else if (parentToolbarWidget !== null && parentToolbarWidgetHTML && !parentToolbarWidgetHTML.hasClass("dropdown-submenu")) {
        hierarchicalLevel = 1;
      } else if (parentToolbarWidget === null) {
        hierarchicalLevel = 0;
      }
  
      changeOffCanvasOptions('toolbarEditWindow', 'toolbar-edit');
      $('#edit-toolbar-widgets-list .list-group-item.field-name').on('click', function (e) {
        var activeField = $(e.currentTarget);
        setupToolbarEditWindowUI(activeField, parentToolbarWidget, parentToolbarWidgetHTML, false, true);
  
        if ($(activeField).data('toolbar-icon')) {
          $("#toolbarEditWindowIconList label.active").removeClass("active");
          var activeIcon_2 = $("#toolbarEditWindowIconList label[data-icon-name='" + $(activeField).data('toolbar-icon') + "']");
          activeIcon_2.addClass('active');
          window.viewModel.selected.Icon.Visibility = true;
          window.viewModel.selected.Icon.Name = $(activeField).data('toolbar-icon');
          setTimeout(function () {
            $('.toolbar-icon-option .icon-field-container').scrollTop($('.toolbar-icon-option .icon-field-container').scrollTop() + activeIcon_2.position().top - 193);
          }, 300);
        }
      });
      $('#toolbarEditWindow .drilldown-loading-cover').fadeOut();
    }, function (error) {
      console.log("Error: " + error);
    }, 'ToolbarActions');
    $('#toolbarEditWindow input').each(function (_idx, elem) {
      $(elem).parent('label').toggleClass('active', $(elem).prop('checked'));
    });
    setColourPicker('#toolbarEditWindow');
    $("#toolbarEditWindow input[name='toolbar-edit-window-off-canvas-type']").on('change', function () {
      changeOffCanvasOptions('toolbarEditWindow', 'toolbar-edit');
    });
    var getHTMLMethod = window.viewModel.selected.FieldName === 'ToolbarDropdown' ? 'ToolbarDropdown' : window.viewModel.selected.FieldName === 'ToolbarSubDropdown' ? 'ToolbarSubDropdown' : window.viewModel.selected.FieldName === 'ButtonWidget' ? 'Widget' : 'ToolbarWidget';
    $('#toolbarEditWindow #editToolbarWidgetButton').on('click', function () {
      if (window.viewModel.selected.Icon.Name !== null && window.viewModel.selected.Icon.Name !== '') {
        window.viewModel.selected.Icon.Visibility = true;
      }
  
      sysproInterop.getHtmlFromModel(getHTMLMethod, window.viewModel.selected.toJSON(), function (result) {
        var newToolbarWidgetHTMLjQuery = $($.trim(result));
        currentToolbarWidgetHTML.replaceWith(newToolbarWidgetHTMLjQuery);
  
        if (context.canvas_id !== null) {
          sysproInterop.performBind(state.bindableFieldsData, true, '', $("#offcanvas-" + context.canvas_id + " .navbar"));
        } else {
          sysproInterop.performBind(state.bindableFieldsData, true, '', $('#navbar-toolbar'));
        }
  
        if (window.viewModel.selectedOffCanvas) {
          editOffCanvasSection();
          insertOffCanvasSection(window.viewModel.selectedOffCanvas, true, tempOffCanvasJSON, function () {
            if (window.viewModel.selectedOffCanvas.OffCanvas == 3) {
              newToolbarWidgetHTMLjQuery.find('a').removeClass('offcanvas-toggle');
              newToolbarWidgetHTMLjQuery.find('a').on('click', function (e) {
                window.viewModel.offCanvasWindows[$(e.currentTarget).data('target')].center().open();
              });
            } else {
              $("#offcanvas-" + window.viewModel.selectedOffCanvas.Id).removeClass('js-offcanvas-done');
              var initOffCanvas = newToolbarWidgetHTMLjQuery.hasClass('offcanvas-toggle') ? new Offcanvas(newToolbarWidgetHTMLjQuery) : new Offcanvas(newToolbarWidgetHTMLjQuery.find('a.offcanvas-toggle'));
            }
  
            thisWindow.close();
          });
        }
  
        $.material.init();
        initEditRemoveDataWidget();
        initEditRemoveToolbarWidgets();
        $('#navbar-toolbar [data-tooltip="tooltip"]').tooltip('destroy');
        $('#navbar-toolbar [data-tooltip="tooltip"]').tooltip();
        finishAddLayoutWidget();
  
        if (!window.viewModel.selectedOffCanvas) {
          thisWindow.close();
        }
      }, '', 7, '', '', function (error) {
        console.log(error);
        thisWindow.close();
      }, false);
    });
    $('#toolbarEditWindow .closeWindow').on('click', function () {
      for (var datakey in tempToolbarWidgetJSON) {
        window.viewModel.selected.set(datakey, tempToolbarWidgetJSON[datakey]);
      }
  
      for (var datakey in tempOffCanvasJSON) {
        if (datakey !== 'IsToolbarVisible') {
          window.viewModel.selectedOffCanvas.set(datakey, tempOffCanvasJSON[datakey]);
        } else {
          window.viewModel.selectedOffCanvas.MainToolbar.set('IsToolbarVisible', tempOffCanvasJSON.IsToolbarVisible);
        }
      }
  
      thisWindow.close();
    });
  } // toolbar Edit Window close function
  
  function toolbarEditWindowClose() {
    state.openWindow = null; // delete SYSPRO_VB.tempOffCanvasJSON;
  
    if (window.viewModel.selectedOffCanvas) {
      window.viewModel.selectedOffCanvas.Columns.data(window.viewModel.selectedOffCanvas.Columns.data().toJSON());
      window.viewModel.selectedOffCanvas.MainToolbar.Columns.data(window.viewModel.selectedOffCanvas.MainToolbar.Columns.data().toJSON());
      window.viewModel.set('selectedOffCanvas', null);
    }
  
    $('#toolbarEditWindow .hide-on-close').hide();
    $('#toolbarEditWindow .data-section-pane-2, #toolbarEditWindow .data-section-pane-3').hide();
    $('#toolbarEditWindow .data-section-pane-1').velocity('fadeIn', {
      duration: 1
    });
    $('body').removeClass('window-open');
    $('#toolbarEditWindow .icon-option').show();
    $('#edit-toolbar-widgets-list.fieldsPanelBar .list-group-item.field-name').off();
    $("#toolbarEditWindow input[name='toolbar-edit-window-off-canvas-type']").off();
    $('#toolbarEditWindow #editToolbarWidgetButton').off();
    $('#toolbarEditWindow .closeWindow').off();
    $('#toolbarEditWindow .icon-field-container > .radio-btn-group').empty();
    delete state.toolbarActionsEditList;
    $('#toolbar-widget-edit-list-wrapper').empty().html('<ul id="edit-toolbar-widgets-list" class="fieldsPanelBar list-group"></ul>');
    $('.typeahead-fields').val('');
    window.viewModel.set('selected', null);
  } // Helper function to initialise multipane functinality of windows
  
  function initialiseMultiPaneWindow(windowElement) {
    $(windowElement + " .window-container").on('click', '.view-pane', function (e) {
      e.preventDefault();
      var targetPane = $(e.currentTarget).data('view-pane');
      $(windowElement + " .data-section-pane-1, " + windowElement + " .data-section-pane-2").velocity('fadeOut', {
        duration: 300,
        begin: function begin() {
          var height = $(windowElement + " .window-container").height() - 50;
          $(windowElement + " .window-content").wrapAll("<div class='animation-wrapper' style='height:" + height + "px'></div>");
        },
        complete: function complete() {
          $(windowElement + " .data-section-pane-" + targetPane).velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              if (window.viewModel.selected && window.viewModel.selected.Icon && window.viewModel.selected.Icon.Name) {
                var activeIcon_3 = $(windowElement + " label[data-icon-name='" + window.viewModel.selected.Icon.Name + "']");
                setTimeout(function () {
                  $(windowElement + " .icon-field-container").scrollTop($(windowElement + " .icon-field-container").scrollTop() + activeIcon_3.position().top - 193);
                }, 300);
              } else if (window.viewModel.selected && window.viewModel.selected.Icon) {
                var activeIcon_4 = $(windowElement + " label[data-icon-name='" + window.viewModel.selected.Icon + "']");
                setTimeout(function () {
                  $(windowElement + " .icon-field-container").scrollTop($(windowElement + " .icon-field-container").scrollTop() + activeIcon_4.position().top - 193);
                }, 300);
              }
  
              if (window.viewModel.selected && window.viewModel.selected.Widgets && window.viewModel.selected.Widgets[0].TileTypeIcon) {
                var activeIcon_5 = $(windowElement + " label[data-icon-name='" + window.viewModel.selected.Widgets[0].TileTypeIcon + "']");
                setTimeout(function () {
                  $(windowElement + " .icon-field-container").scrollTop($(windowElement + " .icon-field-container").scrollTop() + activeIcon_5.position().top - 193);
                }, 300);
              }
  
              $(windowElement + " .window-content").unwrap();
            }
          });
        }
      });
    });
    $(windowElement + " .window-container").on('click', '.back-to-data-section', function (e) {
      e.preventDefault();
      $(windowElement + " .data-section-pane-2, " + windowElement + " .data-section-pane-3").velocity('fadeOut', {
        duration: 300,
        begin: function begin() {
          var height = $(windowElement + " .window-container").height() - 50;
          $(windowElement + " .window-content").wrapAll("<div class='animation-wrapper' style='height:" + height + "px'></div>");
        },
        complete: function complete() {
          $(windowElement + " .data-section-pane-1").velocity('fadeIn', {
            duration: 300,
            complete: function complete() {
              $(windowElement + " .window-content").unwrap();
            }
          });
        }
      });
    });
  } // open/close layout widget select; when opened show the default placeholder if any
  
  function toggleLayoutWidgetSelect() {
    if (layoutWidgetSelect.hasClass('cs-active')) {
      if (state.currentLayoutWidgetOption !== -1) {
        // update placeholder text
        layoutWidgetSelectPlaceholder.textContent = state.layoutWidgetSelectOptions[state.currentLayoutWidgetOption].textContent;
      }
    }
  
    layoutWidgetSelect.toggleClass('cs-active');
  } // change layout widget option - the new value is set
  
  
  function changeLayoutWidgetOption() {
    // current option
    var opt = state.layoutWidgetSelectOptions[state.currentLayoutWidgetOption]; // update current selected value
  
    layoutWidgetSelectPlaceholder.text($(opt).text()); // remove class cs-selected from old selected option and add it to current selected option
  
    var oldOpt = layoutWidgetSelect.find('li.cs-selected');
  
    if (oldOpt) {
      $(oldOpt).removeClass('cs-selected');
    }
  
    $(opt).addClass('cs-selected');
  } // Initialise layout widget selection events
  
  
  function initLayoutWidgetEvents() {
    state.layoutWidgetSelectOptions = [].slice.call(layoutWidgetSelect.find('li.widget-option-tab-li'));
    state.currentLayoutWidgetOption = -1;
    layoutWidgetSelectPlaceholder = layoutWidgetSelect.find('span.cs-placeholder'); // open/close select
  
    layoutWidgetSelectPlaceholder.off().on('click', function () {
      toggleLayoutWidgetSelect();
    }); // clicking the options
  
    $.each(state.layoutWidgetSelectOptions, function (idx, opt) {
      $(opt).off().on('click', function () {
        state.currentLayoutWidgetOption = idx;
        changeLayoutWidgetOption(); // close select elem
  
        toggleLayoutWidgetSelect();
      });
    });
  }
  // CONCATENATED MODULE: ./finaljs/modules/disposal.js
  function disposeVisualDesigner() {
    var column1InputId = sysproInterop.generateUUID();
    var column2InputId = sysproInterop.generateUUID();
    SYSPRO_VB.tilesSearchJSON = [];
    SYSPRO_VB.fieldsSearchReady = false;
    SYSPRO_VB.column1Id = column1InputId;
    SYSPRO_VB.column2Id = column2InputId;
    SYSPRO_VB.column1Copy = {
      PrimaryStyle: 0,
      ResponsiveStyle: 3,
      Widgets: [],
      Id: column1InputId,
      Index: 1,
      TypeName: 'Column',
      HasChildren: false,
      index: 1
    };
    SYSPRO_VB.column2Copy = {
      PrimaryStyle: 0,
      ResponsiveStyle: 3,
      Widgets: [],
      Id: column2InputId,
      Index: 2,
      TypeName: 'Column',
      HasChildren: false,
      index: 2
    };
    SYSPRO_VB.currentRowWindow = null;
    SYSPRO_VB.draggedLayoutWidgetCopy = null;
    SYSPRO_VB.draggedDataWidgetTempCopy = null;
    SYSPRO_VB.draggedToolbarWidgetTempCopy = null;
    SYSPRO_VB.tempHiddenWidg = null;
    SYSPRO_VB.openWindow = null;
    SYSPRO_VB.tileWindowsReady = false;
    SYSPRO_VB.tileEditWindowReady = false;
    SYSPRO_VB.tilesJSONReady = false;
    SYSPRO_VB.finishedQuickAddWidgets = false;
    SYSPRO_VB.bindableFieldsData = {};
    SYSPRO_VB.quickAddIndex = null;
    SYSPRO_VB.tileWidgets = {};
    SYSPRO_VB.CleanOffCanvasModels = {};
    SYSPRO_VB.invisibleTreeViews = {};
    SYSPRO_VB.diagrams = {};
    SYSPRO_VB.diagramSelected = [];
    SYSPRO_VB.sortableWidgets = [];
    SYSPRO_VB.sortableDataWidgets = [];
    SYSPRO_VB.sortableLinkListDataWidgets = [];
    SYSPRO_VB.quickSortableWidgets = [];
    SYSPRO_VB.sortableToolbarWidgets = [];
    SYSPRO_VB.diagramActiveItemProgram = null;
    SYSPRO_VB.diagramActiveItem = null;
  
    if (SYSPRO_VB.layoutWidgetSelectOptions) {
      $.each(SYSPRO_VB.layoutWidgetSelectOptions, function (_idx, opt) {
        $(opt).off('click');
      });
    }
  
    if (SYSPRO_VB.layoutWidgetSelectPlaceholder) {
      SYSPRO_VB.layoutWidgetSelectPlaceholder.off('click');
    }
  
    if (SYSPRO_VB.tileWidgets) {
      for (var widgetID in SYSPRO_VB.tileWidgets) {
        if (SYSPRO_VB.tileWidgets[widgetID]) SYSPRO_VB.tileWidgets[widgetID].packery('destroy');
      }
    }
  
    if (SYSPRO_VB.destroyTreeViews) {
      SYSPRO_VB.destroyTreeViews();
    }
  
    if (SYSPRO_VB.offCanvasWindows) {
      $.each(SYSPRO_VB.offCanvasWindows, function (key, _val) {
        if (SYSPRO_VB.offCanvasWindows[key] && SYSPRO_VB.offCanvasWindows[key].destroy) SYSPRO_VB.offCanvasWindows[key].destroy();
        $(key).remove();
      });
      SYSPRO_VB.offCanvasWindows = {};
    }
  
    if (window.viewModel.offCanvasWindows) {
      $.each(window.viewModel.offCanvasWindows, function (key, _val) {
        if (window.viewModel.offCanvasWindows[key] && window.viewModel.offCanvasWindows[key].destroy) window.viewModel.offCanvasWindows[key].destroy();
        $(key).remove();
      });
      window.viewModel.offCanvasWindows = {};
    }
  
    window.viewModel = null; //Clean up event handlers
  
    $(window).off('resize');
    $('.disabled, .disabled a').off('click');
    $(".menu-toggle").off('click');
    $(".menu-toggle-tab").off('click');
    $("input[name='column-layout']").parent().off('click');
    $("input[name='column-layout']").off('change');
    $("#exportTotalJSON").off("click");
    $('.block-bg-button').off('shown.bs.popover');
    $(document).off("click", ".add-row-section");
    $(document).off("click", ".add-data-section");
    $(document).off("click", ".remove-section");
    $(document).off("click", ".remove-row-section");
    $(document).off("click", ".edit-row-section");
    $(document).off("click", ".add-toolbar-section");
    $(document).off("click", ".remove-toolbar-widget");
    $(document).off("click", ".edit-toolbar-widget");
    $(".window-content").off("click");
    $(document).off("shown.bs.collapse");
    $("#initial-fields-list-data-window.fieldsPanelBar .list-group-item.field-name").off("click");
    $("#dataWindow input[name='data-window-off-canvas-type']").off("change");
    $(".links-fields-list-data-edit-window .list-group-item").off("click");
    $("#dataEditWindow input[name='data-edit-window-off-canvas-type']").off("click");
    $("#tiles-list").off("click");
    $("#tileWindow input[name='tile_text_colour']").off("change");
    $(".clear-color-selections").off("click");
    $("#tiles-list").off("click");
    $("#toolbar-widgets-list.fieldsPanelBar .list-group-item").off("click");
    $("#toolbarWindow input[name='off-canvas-type']").off("change"); //Clear the drilldowns that have been created and initialize them with the previous contents.
  
    $('#initial-fields-list').html("");
    $('#initial-fields-list-data-window-wrapper').html('<ul id="initial-fields-list-data-window" class="fieldsPanelBar list-group"></ul>');
    $('#initial-fields-list-data-edit-window-wrapper').html('<ul id="initial-fields-list-data-edit-window" class="fieldsPanelBar"></ul>');
    $("#toolbar-widget-list-wrapper").html('<ul id="toolbar-widgets-list" class="fieldsPanelBar list-group"></ul>');
    $("#toolbar-widget-edit-list-wrapper").html('<ul id="edit-toolbar-widgets-list" class="fieldsPanelBar list-group"></ul>');
    $('#tile-widgets-list-wrapper').html('<ul id="tiles-list" class="fieldsPanelBar"></ul>');
    $('#tile-widgets-edit-list-wrapper').html('<ul id="tiles-edit-list" class="fieldsPanelBar"></ul>');
    $("#quick-add-layout .quick-sortable-list.row").html("");
    $("#GridlistWidgets .layout-radio-options").html("");
    $("#editGridlistWidgets .layout-radio-options").html("");
    $("#NotepadWidgets .layout-radio-options").html("");
    $("#TreeviewWidgets .layout-radio-options").html("");
    $("#TreelistWidgets .layout-radio-options").html("");
    $("#editNotepadWidgets .layout-radio-options").html("");
    $("#editTreeviewWidgets .layout-radio-options").html("");
    $("#editTreelistWidgets .layout-radio-options").html("");
    $("#quick-add-layout .quick-sortable-list.row").html("");
    $("#AvailableCards .layout-radio-options").html("");
    $("#editCard .layout-radio-options").html("");
    $("#quick-add-layout .quick-sortable-list.row").html("");
    $("#HarmonyWidgets .layout-radio-options").html("");
    $("#EditHarmonyWidgets .layout-radio-options").html("");
    $("#tiles-parameters-wrapper").empty();
  }
  // CONCATENATED MODULE: ./finaljs/modules/init.js
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /** *************************** */
  
  /* 						      */
  
  /*	SYSPRO Visual Builder JS  */
  
  /*							  */
  
  /** *************************** */
  
  function initColumnChanging() {
    $('.column-parent').off().on('transitionend', function (a) {
      $(window).trigger('resize');
      $(a.currentTarget).off(a);
    });
    var previousLayout = $('body').data('column-layout');
    var VBdata = window.viewModel.dataSource.data().toJSON();
  
    if ($(this).val() == '1col') {
      $('#main_column_2').closest('.column-parent').hide(0, function () {
        $('#main_column_1').closest('.column-parent').hide(0, function () {
          $('#main_column_0').closest('.column-parent').removeClass('col-sm-4').removeClass('col-sm-8').removeClass('col-sm-6').addClass('col-sm-12');
  
          if (VBdata.length === 2) {
            state.column1Copy = VBdata[1];
          }
  
          if (VBdata.length === 3) {
            state.column1Copy = VBdata[1];
            state.column2Copy = VBdata[2];
          }
  
          VBdata.splice(1, 2);
          VBdata[0].ResponsiveStyle = 0;
        });
      });
      window.viewModel.dataSource.data(VBdata);
      window.viewModel.set('columnLayout', $(this).val()); // update the window.viewModel columnLayout
    } else if ($(this).val() == '2colequal') {
      if (previousLayout === '1col') {
        $('#main_column_0').closest('.column-parent').hide();
        $('#main_column_0').closest('.column-parent').removeClass('col-sm-4 col-sm-8 col-sm-12').addClass('col-sm-6');
        $('#main_column_1').closest('.column-parent').removeClass('col-sm-4 col-sm-8 col-sm-12').addClass('col-sm-6');
        $('#main_column_0').closest('.column-parent').show(0, function () {
          $('#main_column_1').closest('.column-parent').show(0, function () {
            VBdata.splice(1, 0, state.column1Copy);
            VBdata[0].ResponsiveStyle = 1;
            VBdata[1].ResponsiveStyle = 1;
          });
        });
      } else {
        $('#main_column_2').closest('.column-parent').hide(0, function () {
          $('#main_column_0').closest('.column-parent').removeClass('col-sm-4 col-sm-8 col-sm-12').addClass('col-sm-6').show();
          $('#main_column_1').closest('.column-parent').removeClass('col-sm-4 col-sm-8 col-sm-12').addClass('col-sm-6').show(0, function () {
            VBdata[0].ResponsiveStyle = 1;
            VBdata[1].ResponsiveStyle = 1;
          });
        });
      }
  
      if (previousLayout === '3col') {
        state.column2Copy = VBdata[2];
        VBdata.splice(2, 1);
      }
  
      window.viewModel.dataSource.data(VBdata);
      window.viewModel.set('columnLayout', $(this).val()); // update the window.viewModel columnLayout
    } else if ($(this).val() == '2colleft') {
      if (previousLayout === '1col') {
        $('#main_column_0').closest('.column-parent').hide();
        $('#main_column_0').closest('.column-parent').removeClass('col-sm-4 col-sm-6 col-sm-12').addClass('col-sm-8');
        $('#main_column_1').closest('.column-parent').removeClass('col-sm-6 col-sm-8 col-sm-12').addClass('col-sm-4');
        $('#main_column_0').closest('.column-parent').show(0, function () {
          $('#main_column_1').closest('.column-parent').show(0, function () {
            VBdata.splice(1, 0, state.column1Copy);
            VBdata[0].ResponsiveStyle = 2;
            VBdata[1].ResponsiveStyle = 3;
          });
        });
      } else {
        $('#main_column_2').closest('.column-parent').hide(0, function () {
          $('#main_column_0').closest('.column-parent').removeClass('col-sm-4 col-sm-6 col-sm-12').addClass('col-sm-8').show();
          $('#main_column_1').closest('.column-parent').removeClass('col-sm-6 col-sm-8 col-sm-12').addClass('col-sm-4').show(0, function () {
            VBdata[0].ResponsiveStyle = 2;
            VBdata[1].ResponsiveStyle = 3;
          });
        });
      }
  
      if (previousLayout === '3col') {
        state.column2Copy = VBdata[2];
        VBdata.splice(2, 1);
      }
  
      window.viewModel.dataSource.data(VBdata);
      window.viewModel.set('columnLayout', $(this).val()); // update the window.viewModel columnLayout
    } else if ($(this).val() == '2colright') {
      if (previousLayout === '1col') {
        $('#main_column_0').closest('.column-parent').hide();
        $('#main_column_0').closest('.column-parent').removeClass('col-sm-4 col-sm-8 col-sm-12').addClass('col-sm-4');
        $('#main_column_1').closest('.column-parent').removeClass('col-sm-4 col-sm-8 col-sm-12').addClass('col-sm-8');
        $('#main_column_0').closest('.column-parent').show(0, function () {
          $('#main_column_1').closest('.column-parent').show(0, function () {
            VBdata.splice(1, 0, state.column1Copy);
            VBdata[0].ResponsiveStyle = 3;
            VBdata[1].ResponsiveStyle = 2;
          });
        });
      } else {
        $('#main_column_2').closest('.column-parent').hide(0, function () {
          $('#main_column_0').closest('.column-parent').removeClass('col-sm-8 col-sm-6 col-sm-12').addClass('col-sm-4').show();
          $('#main_column_1').closest('.column-parent').removeClass('col-sm-6 col-sm-4 col-sm-12').addClass('col-sm-8').show(0, function () {
            VBdata[0].ResponsiveStyle = 3;
            VBdata[1].ResponsiveStyle = 2;
          });
        });
      }
  
      if (previousLayout === '3col') {
        state.column2Copy = VBdata[2];
        VBdata.splice(2, 1);
      }
  
      window.viewModel.dataSource.data(VBdata);
      window.viewModel.set('columnLayout', $(this).val()); // update the window.viewModel columnLayout
    } else if ($(this).val() == '3col') {
      $('#main_column_0').closest('.column-parent').hide();
      $('#main_column_1').closest('.column-parent').hide();
      $('#main_column_2').closest('.column-parent').hide();
      $('#main_column_0').closest('.column-parent').removeClass('col-sm-8 col-sm-6 col-sm-12').addClass('col-sm-4');
      $('#main_column_1').closest('.column-parent').removeClass('col-sm-8 col-sm-6 col-sm-12').addClass('col-sm-4');
      $('#main_column_2').closest('.column-parent').removeClass('col-sm-8 col-sm-6 col-sm-12').addClass('col-sm-4');
      $('#main_column_0').closest('.column-parent').show(0, function () {
        $('#main_column_1').closest('.column-parent').show();
        $('#main_column_2').closest('.column-parent').show(0, function () {
          if (VBdata.length === 1) {
            VBdata[0].ResponsiveStyle = 3;
            VBdata.splice(1, 0, state.column1Copy);
            VBdata[1].ResponsiveStyle = 3;
            VBdata.splice(2, 0, state.column2Copy);
            VBdata[2].ResponsiveStyle = 3;
          } else if (VBdata.length === 2) {
            VBdata[0].ResponsiveStyle = 3;
            VBdata[1].ResponsiveStyle = 3;
            VBdata.splice(2, 0, state.column2Copy);
            VBdata[2].ResponsiveStyle = 3;
          }
  
          sizeTiles();
        });
      });
      window.viewModel.dataSource.data(VBdata);
      window.viewModel.set('columnLayout', $(this).val()); // update the window.viewModel columnLayout
    }
  
    $('body').data('column-layout', $(this).val());
    $('body').attr('data-column-layout', $(this).val());
  }
  
  function menuToggle(e) {
    e.preventDefault();
    $('#sidebar-wrapper').off().on('transitionend', function (a) {
      $('#sidebar-tab-controls').find('li.active').removeClass('active');
      $(window).trigger('resize');
      $(a.currentTarget).off(a);
    });
    $('#wrapper').toggleClass('toggled');
  }
  
  function menuTabToggle(e) {
    e.preventDefault();
  
    if (!state.finishedQuickAddWidgets) {
      sysproInterop.getAvailableFields(function (output) {
        if (output.Fields) {
          if (output.Fields.hasOwnProperty('CardsAvailable')) {
            processCards(output.Fields.CardsAvailable.Card, 0);
          } else {
            $('#CardWidgetTab').hide();
          }
  
          if (output.Fields.hasOwnProperty('HarmonyWidgetsAvailable')) {
            processHarmony(output.Fields.HarmonyWidgetsAvailable.HarmonyWidget, 0);
          } else {
            $('#HarmonyWidgetTab').hide();
          }
  
          if (output.Fields.hasOwnProperty('GridLists')) {
            processGridLists(output.Fields.GridLists.GridList, 0);
          } else {
            $('#GridlistWidgetTab').hide();
          }
  
          if (output.Fields.hasOwnProperty('TreeLists')) {
            processTreeLists(output.Fields.TreeLists.TreeList, 0);
          } else {
            $('#TreelistWidgetTab').hide();
          }
  
          if (output.Fields.hasOwnProperty('TreeViews')) {
            processTreeViews(output.Fields.TreeViews.TreeView, 0);
          } else {
            $('#TreeviewWidgetTab').hide();
          }
  
          if (output.Fields.hasOwnProperty('NotepadWidgets')) {
            processNotepadWidgets(output.Fields.NotepadWidgets.NotepadWidget, 0);
          } else {
            $('#NotepadWidgetTab').hide();
          }
  
          state.finishedQuickAddWidgets = true;
        }
      }, function (error) {
        console.log("Error: " + error);
      }, 'CardsAvailable,HarmonyWidgetsAvailable,GridLists,TreeLists,TreeViews,NotepadWidgets');
    }
  
    $('#sidebar-wrapper').off().on('transitionend', function (a) {
      $(window).trigger('resize');
  
      if ($('#wrapper').hasClass('toggled')) {
        $("input[name='column-layout']").off('change', initColumnChanging);
      } else {
        $("input[name='column-layout']").on('change', initColumnChanging);
      }
  
      $(a.currentTarget).off(a);
    });
  
    if ($('#wrapper').hasClass('toggled')) {
      $('#wrapper').toggleClass('toggled');
    }
  } // Initisalisation function
  
  
  function init() {
    initialiseKendoBinders(); // Initialise form JS
  
    $.material.init();
    $('.dropdown-select').dropdown({
      autoinit: true
    });
    $(document).ready(function () {
      initDatePicker('');
      $('.combobox:not(.combobox-initialized)').combobox({
        newOptionsAllowed: true
      });
      $('.combobox:not(.combobox-initialized)').addClass('combobox-initialized');
      Inputmask().mask(document.querySelectorAll('.syspro-supports-mask:not([disabled])'));
    });
    $(document).off('click', '.disabled, .disabled a');
    $(document).on('click', '.disabled, .disabled a', function (e) {
      e.stopImmediatePropagation();
    }); // $(window).on('load', () => {
    // Edit layout widget Window
  
    createKendoWindow('rowEditWindow', 'Edit layout widget', rowEditWindowOpen, rowEditWindowClose, null, null, null, null, null, null, null, null, true, true); // Add data widget Kendo Window
  
    createKendoWindow('dataWindow', 'Add new data widget', dataWindowOpen, dataWindowClose, null, null, null, null, null, null, null, null, true, true); // Edit data widget Kendo Window
  
    createKendoWindow('dataEditWindow', 'Edit data widget', dataEditWindowOpen, dataEditWindowClose, null, null, null, null, null, null, null, null, true, true); // Add tile widget Kendo Window
  
    createKendoWindow('tileWindow', 'Add tile', tileWindowOpen, tileWindowClose, null, null, null, null, null, null, null, null, true, true); // Add tile widget Kendo Window
  
    createKendoWindow('tileEditWindow', 'Edit tile', tileEditWindowOpen, tileEditWindowClose, null, null, null, null, null, null, null, null, true, true); // Add toolbar widget Kendo Window
  
    createKendoWindow('toolbarWindow', 'Add toolbar item', toolbarWindowOpen, toolbarWindowClose, null, null, null, null, null, null, null, null, true, true); // Add toolbar widget Kendo Window
  
    createKendoWindow('toolbarEditWindow', 'Edit toolbar item', toolbarEditWindowOpen, toolbarEditWindowClose, null, null, null, null, null, null, null, null, true, true); // New Layout Widget Window
  
    createKendoWindow('rowWindow', 'Add new layout widget', rowWindowOpen, rowWindowClose, null, null, null, null, null, null, null, null, true, true);
    sysproInterop.getModel('', function (dataout) {
      dataout.OffCanvasLayouts = dataout.OffCanvasLayouts || {}; // Now  Build the list of off  canvas layouts with the datasources parsed correctly.
  
      $.each(dataout.OffCanvasLayouts, function (key, value) {
        if (value.Id) {
          state.CleanOffCanvasModels["offcanvas-" + value.Id] = {
            Id: value.Id,
            OffCanvas: value.OffCanvas,
            columnLayout: value.columnLayout,
            Title: value.Title,
            Columns: new kendo.data.HierarchicalDataSource({
              data: value.Columns,
              schema: {
                model: parentColumnsModel
              }
            }),
            MainToolbar: kendo.observable({
              IsToolbarVisible: value.MainToolbar.IsToolbarVisible,
              Columns: new kendo.data.HierarchicalDataSource({
                data: value.MainToolbar.Columns,
                schema: {
                  model: toolbarModel
                }
              })
            })
          };
          state.CleanOffCanvasModels["offcanvas-" + value.Id].Columns.read();
          state.CleanOffCanvasModels["offcanvas-" + value.Id].MainToolbar.Columns.read();
          createInvisibleTreeView("invisibleColumns" + value.Id, state.CleanOffCanvasModels["offcanvas-" + value.Id].Columns);
          createInvisibleTreeView("invisibleToolbar" + value.Id, state.CleanOffCanvasModels["offcanvas-" + value.Id].MainToolbar.Columns);
          state.CleanOffCanvasModels["offcanvas-" + value.Id].Columns.data().forEach(function (column) {
            column.Widgets.forEach(function (widget) {
              if (widget.hasOwnProperty('Tabs') && widget.Tabs && widget.Tabs.length) {
                var tabsData = JSON.parse(JSON.stringify(widget.Tabs));
                widget.Tabs = new kendo.data.HierarchicalDataSource({
                  data: tabsData,
                  schema: {
                    model: parentColumnsModel
                  },
                  error: function error(e) {
                    console.log('ERROR!', e);
                  }
                });
                widget.Tabs.read();
                createInvisibleTreeView("TABS_" + widget.id, widget.Tabs);
              }
            });
          });
        }
      });
      window.viewModel = kendo.observable({
        // create a dataSource
        dataSource: new kendo.data.HierarchicalDataSource({
          data: dataout.Columns,
          schema: {
            model: parentColumnsModel
          },
          error: function error(e) {
            console.log('DATASOURCE ERROR!', e);
          }
        }),
        toolbar: new kendo.data.HierarchicalDataSource({
          data: dataout.MainToolbar.Columns,
          schema: {
            model: toolbarModel
          }
        }),
        OffCanvasLayouts: state.CleanOffCanvasModels,
        offCanvasWindows: {},
        selected: null,
        targetLayoutWidget: null,
        selectedOffCanvas: null,
        genericObject: {
          // A generic object to set 'selected' to when it is not in use, to prevent issues with removing objects otherwise currently assigned to 'selected'
          Id: 0,
          id: 0
        },
        columnLayout: '3col'
      });
      window.viewModel.dataSource.read(); // invoke the read transport of the main DataSource
  
      window.viewModel.toolbar.read(); // invoke the read transport of the toolbar DataSource
      // Load the invisible treeviews in the visual builder to load the entire existing datasource.
  
      createInvisibleTreeView('invisibleNode', window.viewModel.dataSource);
      createInvisibleTreeView('invisibleToolbarNode', window.viewModel.toolbar);
      window.viewModel.dataSource.data().forEach(function (column) {
        column.Widgets.forEach(function (widget) {
          if (widget.hasOwnProperty('Tabs') && widget.Tabs && widget.Tabs.length) {
            var tabsData = JSON.parse(JSON.stringify(widget.Tabs));
            widget.Tabs = new kendo.data.HierarchicalDataSource({
              data: tabsData,
              schema: {
                model: parentColumnsModel
              },
              error: function error(e) {
                console.log('ERROR!', e);
              }
            });
            widget.Tabs.read();
            createInvisibleTreeView("TABS_" + widget.id, widget.Tabs);
          }
        });
      });
      kendo.bind($('#dataEditWindow'), window.viewModel);
      kendo.bind($('#rowEditWindow'), window.viewModel);
      kendo.bind($('#toolbarEditWindow'), window.viewModel);
      kendo.bind($('#tileEditWindow'), window.viewModel);
      sysproInterop.getAvailableFields(function (bindableFieldsData) {
        state.bindableFieldsData = bindableFieldsData;
        initEditRemoveDataWidget(); // Now perform a bind to make sure values are populated correctly
  
        sysproInterop.performBind(state.bindableFieldsData, true);
      }, function (a) {
        // The error callback where a.ErrorMessage is the error
        console.log("Error: " + a.ErrorMessage);
      }, true);
      state.finishedQuickAddWidgets = false;
      $('.menu-toggle').off('click', menuToggle).on('click', menuToggle);
      $('.menu-toggle-tab').off('click', menuTabToggle).on('click', menuTabToggle); // Initialise multi pane windows
  
      $.each(['#rowWindow', '#dataWindow', '#dataEditWindow', '#rowEditWindow', '#toolbarWindow', '#toolbarEditWindow', '#tileWindow', '#tileEditWindow'], function (index, value) {
        initialiseMultiPaneWindow(value);
      }); // Packery centering initialisation
  
      initPackery(); // Main column layout changing
  
      $("input[name='column-layout']").parent().off().on('click', function (e) {
        $("input[name='column-layout']", e.currentTarget).trigger('change');
      });
  
      if ($('#exportTotalJSON').length) {
        $('#exportTotalJSON').off().on('click', function () {
          console.log(JSON.stringify(window.viewModel.dataSource.data().toJSON()));
        });
      }
  
      $(document).one('kendo:pageUnload', function () {
        if (state.errorNotification) {
          state.errorNotification.hide();
        }
      });
  
      if ($('[data-tooltip="tooltip"]').length > 0) {
        $(':not(.k-grid-toolbar) [data-tooltip="tooltip"]').tooltip();
        $('body').tooltip({
          selector: '.k-grid-toolbar [data-tooltip="tooltip"]',
          trigger: 'hover',
          container: 'body'
        });
        $('body').off('mouseleave', '.k-grid-toolbar [data-tooltip="tooltip"]').on('mouseleave', '.k-grid-toolbar [data-tooltip="tooltip"]', function () {
          $('.k-grid-toolbar [data-tooltip="tooltip"]').tooltip('destroy');
          $('body > .tooltip').remove();
        });
      }
  
      $('.block-bg-button').popover();
      $('.block-bg-button').off().on('shown.bs.popover', function () {
        $('.popover .btn-colour').click(function (e) {
          var bgColour = "sys-bg-" + $(e.currentTarget).find('.block-background-colour').val();
          $(e.currentTarget).parents('.popover').siblings('.block-bg-button').removeClass().addClass("block-bg-button btn btn-radio btn-colour " + bgColour);
          $('.block-bg-button').popover('hide');
        });
      });
      $("input[name*='row_options']").change(function (e) {
        var row_options_val = $(e.currentTarget).val();
        $('.block-bg-setting').hide(0, function () {
          $("#block-bg-" + row_options_val).velocity('fadeIn', {
            duration: 100
          });
        });
      });
      $("input[name='column-layout']").each(function (_idx, elem) {
        if ($(elem).val() == $('body').data('column-layout')) {
          $(elem).prop('checked', true);
          $(elem).parent().addClass('active');
        } else {
          $(elem).prop('checked', false);
          $(elem).parent().removeClass('active');
        }
      }); // Initialise the add buttons for layout widgets only once
  
      $(document).off('click', '.add-row-section');
      $(document).on('click', '.add-row-section', function (e) {
        e.preventDefault();
        if ($(e.currentTarget).parents('.layout-widget-preview').length) return;
        var context = setContext($(e.currentTarget));
        loadIconJSON('base', '#rowWindow');
        $('#rowWindow .drilldown-loading-cover').show();
        $('#rowWindow').data('kendoWindow').setOptions({
          context: context
        });
        $('#rowWindow').data('kendoWindow').center().open();
      }); // This is for when in SYSPRO and link lists that have been loaded seem  to lose  any click events. Might need to change!!!!
  
      if (callLayerInterop.interopType === 'SYSPRORehostedBrowser') {
        $('.add-data-section.list-group-item').on('click', function (e) {
          e.preventDefault();
          if ($(e.currentTarget).parents('.layout-widget-preview').length) return;
          var context = setContext($(e.currentTarget));
  
          if (context.targetLayoutWidget.DisplayStyle === 4) {
            $('#loading-cover').toggle(!state.tileWindowsReady);
            window.viewModel.set('selected', context.targetLayoutWidget); // update the window.viewModel
  
            loadIconJSON('base', '#tileWindow');
            $('#tileWindow').data('kendoWindow').setOptions({
              context: context
            });
            $('#tileWindow').data('kendoWindow').center().open();
          } else {
            context.section_num = $(e.currentTarget).closest('[data-section]').data('section');
            loadIconJSON('base', '#dataWindow');
            $('#dataWindow').data('kendoWindow').setOptions({
              context: context
            });
            $('#dataWindow').data('kendoWindow').center().open();
          }
        });
      }
  
      $(document).off('click', '.add-data-section');
      $(document).on('click', '.add-data-section', function (e) {
        e.preventDefault();
        if ($(e.currentTarget).parents('.layout-widget-preview').length) return;
        var context = setContext($(e.currentTarget));
  
        if (context.targetLayoutWidget.DisplayStyle === 4) {
          $('#loading-cover').toggle(!state.tileWindowsReady);
          $('#tileWindow .drilldown-loading-cover').show();
          loadIconJSON('base', '#tileWindow');
          setTimeout(function () {
            window.viewModel.set('selected', context.targetLayoutWidget); // update the window.viewModel
  
            $('#tileWindow').data('kendoWindow').setOptions({
              context: context
            });
            $('#tileWindow').data('kendoWindow').center().open();
          }, 400);
        } else {
          $('#dataWindow .drilldown-loading-cover').show(); // context.section_num = $(e.currentTarget)
          //   .closest('[data-section]')
          //   .data('section');
  
          loadIconJSON('base', '#dataWindow');
          $('#dataWindow').data('kendoWindow').setOptions({
            context: context
          });
          $('#dataWindow').data('kendoWindow').center().open();
        }
      }); // Initialise the edit and remove buttons on data widgets and layout widgets only once
  
      $(document).off('click', '.remove-section');
      $(document).on('click', '.remove-section', function (e) {
        e.preventDefault();
        var context = setContext($(e.currentTarget)); // Rob: Now always do a get instead of getByUid so we can use our own Id.
  
        var toRemoveDataWidgetModel;
  
        if (context.targetLayoutWidget.DisplayStyle === 1) {
          toRemoveDataWidgetModel = context.currentDataSource.get($(e.target).closest('.draggable-data-section').data('guid'));
          $(e.currentTarget).closest('tr.draggable-data-section').remove();
          context.currentDataSource.remove(toRemoveDataWidgetModel);
        } else if (context.targetLayoutWidget.DisplayStyle === 3) {
          toRemoveDataWidgetModel = context.currentDataSource.get($(e.target).closest('.draggable-data-section').data('guid'));
          context.currentDataSource.remove(toRemoveDataWidgetModel);
          $(e.currentTarget).closest('a.draggable-data-section').remove();
          context.currentDataSource.remove(toRemoveDataWidgetModel);
          $(e.currentTarget).closest('.data-section').find('.add-data-widget').show();
          $(e.currentTarget).closest('.data-section').find('.panel').not('.add-data-widget').remove();
          $(e.currentTarget).closest('a.list-group-item.draggable-data-section').remove();
        } else if (context.targetLayoutWidget.DisplayStyle === 4) {
          toRemoveDataWidgetModel = context.currentDataSource.get($(e.target).closest('.tile').data('guid'));
          context.currentDataSource.remove(toRemoveDataWidgetModel);
          initiateTiles(context.targetLayoutWidget);
        } else if (context.targetLayoutWidget.DisplayStyle === 5) {
          toRemoveDataWidgetModel = context.currentDataSource.get($(e.target).closest('.draggable-data-section').data('guid'));
          context.currentDataSource.remove(toRemoveDataWidgetModel);
          $(e.currentTarget).closest('.draggable-data-section').remove();
        } else {
          toRemoveDataWidgetModel = context.currentDataSource.get($(e.target).closest('.draggable-data-section').data('guid'));
          context.currentDataSource.remove(toRemoveDataWidgetModel);
          $(e.currentTarget).closest('.data-section').find('.add-data-widget').show();
          $(e.currentTarget).closest('.data-section').find('.panel').not('.add-data-widget').remove();
        }
  
        var targetOffCanvasId = toRemoveDataWidgetModel.OffCanvasLayoutId;
  
        if (targetOffCanvasId) {
          if (window.viewModel.OffCanvasLayouts["offcanvas-" + targetOffCanvasId].OffCanvas == 3) {
            window.viewModel.offCanvasWindows["#offcanvas-" + targetOffCanvasId].destroy();
            delete window.viewModel.offCanvasWindows["#offcanvas-" + targetOffCanvasId];
            delete window.viewModel.OffCanvasLayouts["offcanvas-" + targetOffCanvasId];
          } else {
            delete window.viewModel.OffCanvasLayouts["offcanvas-" + targetOffCanvasId];
            $("#offcanvas-" + targetOffCanvasId).remove();
          }
        }
  
        initEditRemoveDataWidget();
      });
      $(document).off('click', '.edit-section');
      $(document).on('click', '.edit-section', function (e) {
        e.preventDefault();
        var context = setContext($(e.currentTarget));
  
        if (context.targetLayoutWidget.DisplayStyle === 4) {
          $('#loading-cover').toggle(!state.tileEditWindowReady);
          context.section_num = 0;
          context.row_num = 0;
          var currentTileWidgetUid = $(e.target).parents('.tile').data('guid'); // Rob: Now always do a get instead of getByUid so we can use our own Id.
  
          window.viewModel.set('selected', context.currentDataSource.get(currentTileWidgetUid));
          var tempDataWidgetJSON_1 = {};
          tempDataWidgetJSON_1.TileType = window.viewModel.selected.Widgets[0].TileType;
          tempDataWidgetJSON_1.Title = window.viewModel.selected.Widgets[0].Title;
          tempDataWidgetJSON_1.TileWidth = window.viewModel.selected.Widgets[0].TileWidth;
          tempDataWidgetJSON_1.keyField = window.viewModel.selected.Widgets[0].KeyType;
          tempDataWidgetJSON_1.TileWidth = window.viewModel.selected.Widgets[0].TileWidth;
          tempDataWidgetJSON_1.parentFieldPath = window.viewModel.selected.Widgets[0].KeyType;
          tempDataWidgetJSON_1.TileParameters = window.viewModel.selected.Widgets[0].TileParameters.toJSON();
          loadIconJSON('editTile', '#tileEditWindow');
          setTimeout(function () {
            $('#tileEditWindow').data('kendoWindow').setOptions({
              context: context,
              tempDataWidgetJSON: tempDataWidgetJSON_1
            });
            $('#tileEditWindow').data('kendoWindow').center().open();
          }, 500);
        } else {
          $('#dataEditWindow .drilldown-loading-cover').show();
          var currentDataWidgetUid = $(e.target).parents('.draggable-data-section').data('guid'); // Rob: Now always do a get instead of getByUid so we can use our own Id.
  
          window.viewModel.set('selected', context.currentDataSource.get(currentDataWidgetUid));
          var tempDataWidgetJSON = window.viewModel.selected.toJSON();
          var targetOffCanvasId = window.viewModel.selected.OffCanvasLayoutId;
          var tempOffCanvasJSON = {};
  
          if (targetOffCanvasId) {
            window.viewModel.set('selectedOffCanvas', window.viewModel.OffCanvasLayouts["offcanvas-" + targetOffCanvasId]); // update the window.viewModel
  
            tempOffCanvasJSON.Title = window.viewModel.selectedOffCanvas.Title;
            tempOffCanvasJSON.columnLayout = window.viewModel.selectedOffCanvas.columnLayout;
            tempOffCanvasJSON.OffCanvas = window.viewModel.selectedOffCanvas.OffCanvas;
            tempOffCanvasJSON.IsToolbarVisible = window.viewModel.selectedOffCanvas.MainToolbar.IsToolbarVisible;
          }
  
          loadIconJSON('editData', '#dataEditWindow');
          $('#dataEditWindow').data('kendoWindow').setOptions({
            context: context,
            tempOffCanvasJSON: tempOffCanvasJSON,
            tempDataWidgetJSON: tempDataWidgetJSON
          });
          $('#dataEditWindow').data('kendoWindow').center().open();
        }
      });
      $(document).off('click', '.remove-row-section');
      $(document).on('click', '.remove-row-section', function (e) {
        e.preventDefault();
        var context = setContext($(e.currentTarget)); // Rob: Now always do a get instead of getByUid so we can use our own Id.
  
        var toRemoveLayoutWidgetModel = context.currentDataSource.get($(e.currentTarget).closest('.draggable-row-section').data('guid'));
  
        if (toRemoveLayoutWidgetModel.Tabs) {
          destroyTreeView("TABS_" + toRemoveLayoutWidgetModel.Id);
        }
  
        context.currentDataSource.remove(toRemoveLayoutWidgetModel);
        $(e.currentTarget).closest('.draggable-row-section').remove();
      });
      $(document).off('click', '.edit-row-section');
      $(document).on('click', '.edit-row-section', function (e) {
        e.preventDefault();
        var context = setContext($(e.currentTarget));
        var currentLayoutWidgetHTML = $(e.currentTarget).closest('.draggable-row-section'); // Rob: Now always do a get instead of getByUid so we can use our own Id.
  
        window.viewModel.set('selected', context.targetLayoutWidget);
        var tempLayoutWidgetJSON = window.viewModel.selected.toJSON();
        window.viewModel.selected.WidgetName = window.viewModel.selected.WidgetName || 'row_1_col';
  
        if (window.viewModel.selected.hasOwnProperty('Tabs') && window.viewModel.selected.Tabs) {
          window.viewModel.selected.TabsNum = window.viewModel.selected.Tabs.data().length;
          window.viewModel.selected.Tabs.data().forEach(function (tabItem, idx) {
            window.viewModel.selected["TabTitle_" + idx] = tabItem.Title;
          });
        }
  
        loadIconJSON('editRow', '#rowEditWindow');
        $('#rowEditWindow').data('kendoWindow').setOptions({
          title: "Edit " + window.viewModel.selected.TypeName.split(/(?=[A-Z])/).join(' '),
          context: context,
          tempLayoutWidgetJSON: tempLayoutWidgetJSON,
          currentLayoutWidgetHTML: currentLayoutWidgetHTML
        });
        $('#rowEditWindow').data('kendoWindow').center().open();
      });
      $(document).off('click', '.add-toolbar-section');
      $(document).on('click', '.add-toolbar-section', function (e) {
        e.preventDefault();
        var context = setContext($(e.currentTarget));
        $('#toolbarWindow .drilldown-loading-cover').show();
        var parentToolbarWidgetHTML = $(e.currentTarget).closest('.dropdown-menu').length ? $(e.currentTarget).closest('li.dropdown-submenu').length ? $(e.currentTarget).closest('li.dropdown-submenu') : $(e.currentTarget).closest('li.dropdown') : null;
        var parentToolbarWidgetUid = $(e.currentTarget).closest('.dropdown-menu').length ? parentToolbarWidgetHTML.data('guid') : null;
        var parentToolbarWidget = $(e.currentTarget).closest('.dropdown-menu').length ? context.currentToolbarDataSource.get(parentToolbarWidgetUid) : null;
        loadIconJSON('base', '#toolbarWindow');
        $('#toolbarWindow').data('kendoWindow').setOptions({
          context: context,
          parentToolbarWidgetHTML: parentToolbarWidgetHTML,
          parentToolbarWidget: parentToolbarWidget
        });
        $('#toolbarWindow').data('kendoWindow').center().open();
      });
      $(document).off('click', '.remove-toolbar-widget');
      $(document).on('click', '.remove-toolbar-widget', function (e) {
        e.preventDefault();
        var context = setContext($(e.currentTarget));
        var toRemoveToolbarWidget = context.currentToolbarDataSource.get($(e.target).parents('li[data-guid]').data('guid'));
        var targetOffCanvasId = toRemoveToolbarWidget.OffCanvasLayoutId;
  
        if (targetOffCanvasId) {
          if (window.viewModel.OffCanvasLayouts["offcanvas-" + targetOffCanvasId].OffCanvas == 3) {
            window.viewModel.offCanvasWindows["#offcanvas-" + targetOffCanvasId].destroy();
            delete window.viewModel.offCanvasWindows["#offcanvas-" + targetOffCanvasId];
            delete window.viewModel.OffCanvasLayouts["offcanvas-" + targetOffCanvasId];
          } else {
            delete window.viewModel.OffCanvasLayouts["offcanvas-" + targetOffCanvasId];
            $("#offcanvas-" + targetOffCanvasId).remove();
          }
        }
  
        context.currentToolbarDataSource.remove(toRemoveToolbarWidget);
        $(e.currentTarget).closest('li[data-guid]').remove();
      });
      $(document).off('click', '.edit-toolbar-widget');
      $(document).on('click', '.edit-toolbar-widget', function (e) {
        e.preventDefault();
        var context = setContext($(e.currentTarget));
        $('#toolbarEditWindow .drilldown-loading-cover').show();
        var currentToolbarWidgetHTML = $(e.target).closest('li[data-guid]');
        var currentToolbarWidget = context.currentToolbarDataSource.get(currentToolbarWidgetHTML.data('guid')); // get reference to the model
  
        var tempToolbarWidgetJSON = currentToolbarWidget.toJSON();
        var parentToolbarWidgetHTML = $(e.target).closest('.dropdown-menu').length ? $(e.target).closest('li.dropdown-submenu').length ? $(e.target).closest('li.dropdown-submenu') : $(e.target).closest('li.dropdown') : null;
        var parentToolbarWidgetUid = $(e.target).closest('.dropdown-menu').length ? parentToolbarWidgetHTML.data('guid') : null;
        var parentToolbarWidget = $(e.target).closest('.dropdown-menu').length ? context.currentToolbarDataSource.get(parentToolbarWidgetUid) : null;
        var targetOffCanvasId = currentToolbarWidget.OffCanvasLayoutId;
        var tempOffCanvasJSON = {};
  
        if (targetOffCanvasId) {
          window.viewModel.set('selectedOffCanvas', window.viewModel.OffCanvasLayouts["offcanvas-" + targetOffCanvasId]); // update the window.viewModel
  
          tempOffCanvasJSON.Title = window.viewModel.selectedOffCanvas.Title;
          tempOffCanvasJSON.columnLayout = window.viewModel.selectedOffCanvas.columnLayout;
          tempOffCanvasJSON.OffCanvas = window.viewModel.selectedOffCanvas.OffCanvas;
          tempOffCanvasJSON.IsToolbarVisible = window.viewModel.selectedOffCanvas.MainToolbar.IsToolbarVisible;
        }
  
        for (var property in currentToolbarWidgetHTML[0]) {
          if (currentToolbarWidgetHTML[0].hasOwnProperty(property) && property.includes("jQuery") && currentToolbarWidgetHTML[0][property].hasOwnProperty("bs.tooltip")) {
            delete currentToolbarWidgetHTML[0][property]["bs.tooltip"];
          }
        } // window.viewModel.set('selected', currentToolbarWidget); //update the window.viewModel
  
  
        window.viewModel.selected = currentToolbarWidget; // update the window.viewModel
  
        loadIconJSON('editData', '#toolbarEditWindow');
        $('#toolbarEditWindow').data('kendoWindow').setOptions({
          context: context,
          tempOffCanvasJSON: tempOffCanvasJSON,
          tempToolbarWidgetJSON: tempToolbarWidgetJSON,
          currentToolbarWidgetHTML: currentToolbarWidgetHTML,
          parentToolbarWidgetHTML: parentToolbarWidgetHTML,
          parentToolbarWidget: parentToolbarWidget
        });
        $('#toolbarEditWindow').data('kendoWindow').center().open();
      });
  
      function clearIconSelection(e) {
        e.preventDefault();
        $(this).parents('.window-content').find('.icon-field-container .icon-option.active').removeClass('active');
        $(this).parents('.window-content').find('.icon-field-container .icon-search input').val('').trigger('keyup');
      }
  
      $('.window-content').off('click', '.clear-icon-selection', clearIconSelection).on('click', '.clear-icon-selection', clearIconSelection); // Add minimize icons to the main columns - this can be done server side in future (TODO:)
      // $('.column-parent').each((_idx, columnParent) => {
      //   if (!$(columnParent).parents('.tab-pane').length) {
      //     $(columnParent).prepend('<i class="material-icons minimize-column main-column-minimize sys-fg-light-gray">trip_origin</i>');
      //   }
      // });
      // Add event listeners to deal with the minmizing of columns, both in the search windows for the filter panel, and also for main layout columns.
  
      $(document).off('click', '.minimize-column');
      $(document).on('click', '.minimize-column', function (e) {
        var parentColumn = $(e.currentTarget).closest('.column-parent');
        parentColumn.css('width', '');
        parentColumn.toggleClass('minimized', !parentColumn.hasClass('minimized'));
  
        if ($(e.currentTarget).hasClass('main-column-minimize')) {
          // If true, we are dealing with main layout columns
          var columnsGroup = parentColumn.siblings('.column-parent');
          var numColumns = columnsGroup.length + 1;
          var parentColumnIdx = columnsGroup.index(parentColumn);
          var columnLayout = $('body').data('column-layout'); // parentColumn.css('width', '4%');
  
          if (columnLayout === '2colequal' || columnLayout === '2colleft' || columnLayout === '2colright') {
            if (parentColumn.siblings('.column-parent').hasClass('minimized')) {
              parentColumn.css('width', parentColumn.hasClass('minimized') ? '' : '96%');
            } else {
              parentColumn.siblings('.column-parent').css('width', parentColumn.hasClass('minimized') ? '96%' : '');
            }
          } else if (columnLayout === '3col') {
            if (parentColumn.siblings('.column-parent.minimized').length === 1) {
              parentColumn.css('width', parentColumn.hasClass('minimized') ? '' : '48%');
              parentColumn.siblings('.column-parent:not(.minimized)').css('width', parentColumn.hasClass('minimized') ? '92%' : '48%');
            } else if (parentColumn.siblings('.column-parent.minimized').length === 2) {
              parentColumn.css('width', parentColumn.hasClass('minimized') ? '' : '92%');
            } else {
              parentColumn.siblings('.column-parent').css('width', parentColumn.hasClass('minimized') ? '48%' : '');
            }
          } // Change colour of the icon to indicate if active of not
  
  
          if ($(e.currentTarget).hasClass('sys-fg-light-gray')) {
            $(e.currentTarget).removeClass('sys-fg-light-gray').addClass('sys-fg-primary');
          } else if ($(e.currentTarget).hasClass('sys-fg-primary')) {
            $(e.currentTarget).removeClass('sys-fg-primary').addClass('sys-fg-light-gray');
          }
        }
      });
      $('.colour-picker-dot').each(function (_idx, colourPickerDot) {
        var colourGroupWrap = $(colourPickerDot).next('.colour-group-wrap');
        var colourGroup = colourGroupWrap.find('.colour-group');
        $(colourPickerDot).popover('destroy');
        $(colourPickerDot).popover({
          html: true,
          trigger: 'manual',
          placement: 'right',
          delay: {
            show: 100,
            hide: 100
          },
          content: '<div class="popover-colour-picker"></div>'
        }).off().on('click', function (e) {
          var colourClass = $(e.currentTarget).attr('class').match(/\bsys-bg\S+/g)[0];
          $(e.currentTarget).popover('show');
          $(e.currentTarget).siblings('.popover').on('mouseleave', function () {
            $(e.currentTarget).popover('hide');
          });
          $(e.currentTarget).siblings('.popover').on('click', '.btn-radio', function (a) {
            $(e.currentTarget).removeClass(colourClass);
            var classList = $(a.currentTarget).attr('class').split(/\s+/);
            $.each(classList, function (index, item) {
              if (item.includes('sys-bg-')) {
                $(e.currentTarget).addClass(item);
              }
            });
            $(e.currentTarget).popover('hide');
          });
        }).on('mouseleave', function (e) {
          var hidePop = function hidePop() {
            setTimeout(function () {
              if (!$('.popover:hover').length) {
                $(e.currentTarget).popover('hide');
              } else {
                hidePop();
              }
            }, 50);
          };
  
          hidePop();
        }).on('hide.bs.popover', function () {
          colourGroup.detach().appendTo(colourGroupWrap);
        }).on('inserted.bs.popover', function () {
          if ($('.popover-colour-picker').length) {
            colourGroup.detach().appendTo('.popover-colour-picker');
          }
        });
      });
      $(document).off('shown.bs.collapse', '.collapse');
      $(document).on('shown.bs.collapse', '.collapse', function () {
        sysproInterop.resizeSparklines();
        initiateExistingTiles();
        sysproInterop.sizeTiles();
      });
      $(window).resize(function (e) {
        if (e.currentTarget.resizeTO) clearTimeout(e.currentTarget.resizeTO);
        e.currentTarget.resizeTO = setTimeout(function () {
          $(e.currentTarget).trigger('resizeEnd');
        }, 250);
      });
      $(window).bind('resizeEnd', function () {
        sizeTiles();
        sizeAddonButtons();
        adjustContainerPadding();
      });
      $('.layout-widget-preview-wrapper').perfectScrollbar({
        suppressScrollX: true,
        suppressScrollY: false
      });
      ElementQueries.init();
      initNormalSorting();
      initAllOffCanvasSections();
      initToolbarSorting();
      initQuickAddLayoutWidgets();
      sizeAddonButtons();
      adjustContainerPadding();
      initEditRemoveDataWidget();
      finishAddLayoutWidget();
      initEditRemoveToolbarWidgets();
      initLayoutWidgetEvents();
      initiateExistingTiles();
      initProgramListTileDragging(null);
  
      if ($('[data-tooltip="tooltip"]').length > 0) {
        $(':not(.k-grid-toolbar) [data-tooltip="tooltip"]').tooltip();
        $('body').tooltip({
          selector: '.k-grid-toolbar [data-tooltip="tooltip"]',
          trigger: 'hover',
          container: 'body'
        });
        $('body').off('mouseleave', '.k-grid-toolbar [data-tooltip="tooltip"]').on('mouseleave', '.k-grid-toolbar [data-tooltip="tooltip"]', function () {
          $('.k-grid-toolbar [data-tooltip="tooltip"]').tooltip('destroy');
          $('body > .tooltip').remove();
        });
      }
  
      $('#loading-cover').fadeOut();
    }, function (error) {
      console.log(error);
    });
  }
  // CONCATENATED MODULE: ./finaljs/app.js
  // [JCL] Root TypeScript file for the Visual Designer - everything is pulled in here ultimately.
  
  
  window.SYSPRO_VB = init_namespaceObject;
  window.SYSPRO_VB.tileWidgets = state.tileWidgets;
  window.SYSPRO_VB.diagrams = state.diagrams;
  window.SYSPRO_VB.diagramSelected = state.diagramSelected;
  window.SYSPRO_VB.diagramActiveItemProgram = state.diagramActiveItemProgram;
  window.SYSPRO_VB.diagramActiveItem = state.diagramActiveItem; // textWidth jQuery function
  
  $.fn.textWidth = function (text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    var htmlText = text || this.val() || this.text();
    htmlText = $.fn.textWidth.fakeEl.text(htmlText).html(); //encode to Html
  
    htmlText = htmlText.replace(/\s/g, '&nbsp;'); //replace trailing and leading spaces
  
    $.fn.textWidth.fakeEl.html(htmlText).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
  };
  
  /***/ })
  /******/ ]);
  //# sourceMappingURL=bundle.js.map