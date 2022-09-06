/******************************/
/* SYSPRO Visual Builder JS   */
/*							  */
/*							  */
/******************************/
"use strict";

(function () {
    var initColumns = [
		{
		    Index: 0,
		    ResponsiveStyle: 3,
		    Widgets: [],
		    TypeName: "Column"
		},
		{
		    Index: 1,
		    ResponsiveStyle: 3,
		    Widgets: [],
		    TypeName: "Column"
		},
		{
		    Index: 2,
		    ResponsiveStyle: 3,
		    Widgets: [],
		    TypeName: "Column"
		}
    ];

    var initToolbar = [
		{
		    Index: 0,
		    Alignment: 0,
		    ResponsiveStyle: 0,
		    PrimaryStyle: 0,
		    Widgets: [],
		    TypeName: "Column"
		},
		{
		    Index: 1,
		    Alignment: 1,
		    ResponsiveStyle: 0,
		    PrimaryStyle: 0,
		    Widgets: [],
		    TypeName: "Column"
		}
    ];

    var dataWidgetModel = kendo.data.Node.define({
        id: "Id",
    });

    var DataWidgetSch = {
        schema: {
            data: "Widgets",
            model: dataWidgetModel
        }
    };

    var columnModel = kendo.data.Node.define({
        id: "Id",
        children: DataWidgetSch,
    });

    var ColumnsSch = {
        schema: {
            data: "Columns",
            model: columnModel
        }
    };

    var rowModel = kendo.data.Node.define({
        id: "Id",
        children: ColumnsSch,
    });

    var RowsSch = {
        schema: {
            data: "Rows",
            model: rowModel
        }
    };

    var layoutWidgetModel = kendo.data.Node.define({
        id: "Id",
        children: RowsSch,
    });

    var WidgetsSch = {
        schema: {
            data: "Widgets",
            model: layoutWidgetModel
        }
    };

    var toolbarSubWidgetModel = kendo.data.Node.define({
        id: "Id"
    });

    var ToolbarSubWidgetsSch = {
        schema: {
            data: "Widgets",
            model: toolbarSubWidgetModel
        }
    };

    var toolbarWidgetModel = kendo.data.Node.define({
        id: "Id",
        children: ToolbarSubWidgetsSch
    });

    var ToolbarWidgetsSch = {
        schema: {
            data: "Widgets",
            model: toolbarWidgetModel
        }
    };

    var parentModel = kendo.data.Node.define({
        id: "Id",
        children: WidgetsSch,
    });

    var toolbarModel = kendo.data.Node.define({
        id: "Id",
        children: ToolbarWidgetsSch,
    });

    var column1InputId = sysproInterop.generateUUID(),
		column2InputId = sysproInterop.generateUUID();

    kendo.data.binders.dataPath = kendo.data.Binder.extend({
        init: function (element, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, element, bindings, options);

            var that = this;
            //listen for the change event of the element
            $(that.element).on("click", function () {
                that.change(); //call the change function
            });
        },
        refresh: function () {
            var that = this,
	        value = that.bindings["dataPath"].get();

            if (value === $(that.element).data("field-path")) {
                $(that.element).addClass("active");
            } else {
                $(that.element).removeClass("active");
            }
        },
        change: function () {
            var value = $(this.element).data('field-path');

            this.bindings["dataPath"].set(value); //update the View-Model
            var elementClone = $(this.element).clone();
            elementClone.find('i, span').remove();
            SYSPRO_VB.currentDataWidget.FieldName = elementClone.text();
            SYSPRO_VB.currentDataWidget.HasSmartTag = $(this.element).data('smart-tag');
            SYSPRO_VB.currentDataWidget.DataType = $(this.element).data('data-type');
            SYSPRO_VB.currentDataWidget.EntryType = $(this.element).data('entry-type');
        }
    });

    kendo.data.binders.iconName = kendo.data.Binder.extend({
        init: function (element, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, element, bindings, options);

            var that = this;
            //listen for the change event of the element
            $(that.element).on("click", function () {
                that.change(); //call the change function
            });
        },
        refresh: function () {
            var that = this,
	        value = that.bindings["iconName"].get();

            if (value === $(that.element).data("icon-name")) {
                $(that.element).addClass("active");
            } else {
                $(that.element).removeClass("active");
            }
        },
        change: function () {
            var value = $(this.element).data('icon-name');

            this.bindings["iconName"].set(value); //update the View-Model
        }
    });

    kendo.data.binders.linkListField = kendo.data.Binder.extend({
        init: function (element, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, element, bindings, options);

            var that = this;
            //listen for the change event of the element
            $(that.element).on("click", function () {
                that.change(); //call the change function
            });
        },
        refresh: function () {
            var that = this,
	        value = that.bindings["linkListField"].get();

            if (value === $(that.element).data("key-action")) {
                $(that.element).addClass("active");
            } else {
                $(that.element).removeClass("active");
            }
        },
        change: function () {
            //var value = this.element.value;
            var value = $(this.element).data('key-action');

            this.bindings["linkListField"].set(value); //update the View-Model
        }
    });

    kendo.data.binders.tileBind = kendo.data.Binder.extend({
        init: function (element, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, element, bindings, options);

            var that = this;
            //listen for the change event of the element
            $(that.element).on("click", function () {
                that.change(); //call the change function
            });
        },
        refresh: function () {

            var that = this,
	        value = that.bindings["tileBind"].get();

            if (value === $(that.element).data("tile-name")) {
                $(that.element).addClass("active");
            } else {
                $(that.element).removeClass("active");
            }

        },
        change: function () {
            //var value = this.element.value;
            var value = $(this.element).data('tile-name');

            this.bindings["tileBind"].set(value); //update the View-Model
        }

    });

    kendo.data.binders.layoutWidgetType = kendo.data.Binder.extend({
        refresh: function () {
            var value = this.bindings["layoutWidgetType"].get();

            if (value === $(this.element).data("widget-type")) {
                $(this.element).tab('show');
            }
        }
    });

    kendo.data.binders.toolbarFieldName = kendo.data.Binder.extend({
        init: function (element, bindings, options) {
            //call the base constructor
            kendo.data.Binder.fn.init.call(this, element, bindings, options);

            var that = this;
            //listen for the change event of the element
            $(that.element).on("click", function () {
                that.change(); //call the change function
            });
        },
        refresh: function () {
            var that = this,
	        value = that.bindings["toolbarFieldName"].get();
            if (value === $(that.element).data("field-name")) {
                console.log("yebo");
                $(that.element).addClass("active");
            } else {
                $(that.element).removeClass("active");
            }
        },
        change: function () {
            var value = $(this.element).data('field-name');

            this.bindings["toolbarFieldName"].set(value); //update the View-Model
            SYSPRO_VB.currentToolbarWidget.ToolbarWidgetType = $(this.element).data('toolbar-widget-type');
        }
    });

    var viewModel;

    $(window).load(function () {

        // Edit layout widget Window
        SYSPRO_VB.rowEditWindow = SYSPRO_VB.createKendoWindow("rowEditWindow", "Edit layout widget", SYSPRO_VB.rowEditWindowOpen, SYSPRO_VB.rowEditWindowClose);

        // Add data widget Kendo Window
        SYSPRO_VB.dataWindow = SYSPRO_VB.createKendoWindow("dataWindow", "Add new data widget", SYSPRO_VB.dataWindowOpen, SYSPRO_VB.dataWindowClose);

        // Edit data widget Kendo Window
        SYSPRO_VB.dataEditWindow = SYSPRO_VB.createKendoWindow("dataEditWindow", "Edit data widget", SYSPRO_VB.dataEditWindowOpen, SYSPRO_VB.dataEditWindowClose);

        // Add tile widget Kendo Window
        SYSPRO_VB.tileWindow = SYSPRO_VB.createKendoWindow("tileWindow", "Add tile", SYSPRO_VB.tileWindowOpen, SYSPRO_VB.tileWindowClose);

        // Add tile widget Kendo Window
        SYSPRO_VB.tileEditWindow = SYSPRO_VB.createKendoWindow("tileEditWindow", "Edit tile", SYSPRO_VB.tileEditWindowOpen, SYSPRO_VB.tileEditWindowClose);

        // Add toolbar widget Kendo Window
        SYSPRO_VB.toolbarWindow = SYSPRO_VB.createKendoWindow("toolbarWindow", "Add toolbar item", SYSPRO_VB.toolbarWindowOpen, SYSPRO_VB.toolbarWindowClose);

        // Add toolbar widget Kendo Window
        SYSPRO_VB.toolbarEditWindow = SYSPRO_VB.createKendoWindow("toolbarEditWindow", "Edit toolbar item", SYSPRO_VB.toolbarEditWindowOpen, SYSPRO_VB.toolbarEditWindowClose);

        //New Layout Widget Window
        SYSPRO_VB.rowWindow = SYSPRO_VB.createKendoWindow("rowWindow", "Add new layout widget", SYSPRO_VB.rowWindowOpen, SYSPRO_VB.rowWindowClose);

        //SYSPRO_VB.init();
    });

    var SYSPRO_VB = {

        //Initisalisation function
        init: function () {

            // Initialise form JS
            $.material.init();
            $(".dropdown-select").dropdown({ "autoinit": ".dropdown-select" });

            $(document).ready(function () {
                //$('.date').datetimepicker({ format: sysproInterop.dateFormat.toUpperCase() });
                SYSPRO_VB.initDatePicker();
               // $('.combobox').combobox({ newOptionsAllowed: true });
                $('.combobox:not(.combobox-initialized)').combobox({ newOptionsAllowed: true });
                $('.combobox:not(.combobox-initialized)').addClass("combobox-initialized");
                Inputmask().mask(document.querySelectorAll(".syspro-supports-mask:not([disabled])"));
            });

            sysproInterop.getModel("", function (dataout) {
                console.log(dataout);
                viewModel = kendo.observable({
                    //create a dataSource
                    dataSource: new kendo.data.HierarchicalDataSource({
                        data: dataout.Columns,
                        schema: {
                            model: parentModel
                        }
                    }),
                    toolbar: new kendo.data.HierarchicalDataSource({
                        data: dataout.MainToolbar.Columns,
                        schema: {
                            model: toolbarModel
                        }
                    }),
                    selected: {}, //this field will contain the edited dataItem
                    columnLayout: '3col' //this field will contain the overall column layout type
                });

                viewModel.dataSource.read(); //invoke the read transport of the main DataSource
                viewModel.toolbar.read(); //invoke the read transport of the toolbar DataSource

                //Load the invisible treeviews in the visual builder to load the entire existing datasource.
                $("#invisibleNode").kendoTreeView({
                    dataSource: viewModel.dataSource,
                    dataTextField: "TypeName",
                    loadOnDemand: false
                });
                $("#invisibleToolbarNode").kendoTreeView({
                    dataSource: viewModel.toolbar,
                    dataTextField: "TypeName",
                    loadOnDemand: false
                });

                SYSPRO_VB.history[SYSPRO_VB.historyIndex] = [JSON.stringify(viewModel.dataSource.data().toJSON()), viewModel.columnLayout, JSON.stringify(viewModel.toolbar.data().toJSON())];
                SYSPRO_VB.historyIndex++;
                //ROB: Reset changes  on load so it doesnn't  always prompt  to  save  changes.
                sysproInterop.internalHistoryIndex = SYSPRO_VB.historyIndex;
                sysproInterop.internalHistoryChange = 0;
                kendo.bind($("#dataEditWindow"), viewModel);
                kendo.bind($("#rowEditWindow"), viewModel);
                kendo.bind($("#toolbarEditWindow"), viewModel);
                SYSPRO_VB.dataEditValidator = $("#dataEditWindow").kendoValidator().data("kendoValidator"); //create a validator instance
                SYSPRO_VB.dataValidator = $("#dataWindow").kendoValidator().data("kendoValidator"); //create a validator instance

                sysproInterop.getAvailableFields(
					function (bindable_fields_data) {
					    SYSPRO_VB.bindableFieldsData = bindable_fields_data;

					    SYSPRO_VB.fieldsDisplayViewModel = kendo.observable({
					        dataSource: new kendo.data.HierarchicalDataSource({
					            data: bindable_fields_data,
					            schema: {
					                data: function (response) {
					                    var result = [{ Fields: [] }],
					                    	newObj = {};
					                    for (var key in response) {
					                        if (response.hasOwnProperty(key)) {
					                            var currentObj = response[key];
					                            for (var subkey in currentObj) {
					                                if (currentObj.hasOwnProperty(subkey)) {
					                                    var currentSubObj = currentObj[subkey];
					                                    newObj[subkey] = currentSubObj;
					                                }
					                            }
					                        }
					                    }
					                    result[0].Fields = newObj;
					                    return result;
					                },
					                model: {
					                    hasChildren: true
					                }
					            }
					        })
					    });

					    SYSPRO_VB.fieldsDisplayViewModel.dataSource.read();
					    SYSPRO_VB.initAddDataWidgets();
					},
			        function (a) {
			            //The error callback where a.ErrorMessage is the error
			            console.log("Error: " + a.ErrorMessage);
			        },
					true
				);

                sysproInterop.getAvailableFields(
			        function (fields_data) {
			            console.log(fields_data);

			            SYSPRO_VB.dataWidgetFields.DisplayFields = $.extend(true, {}, fields_data.Fields.DisplayFields);
			            delete SYSPRO_VB.dataWidgetFields.DisplayFields.Charts;
			            SYSPRO_VB.dataWidgetFields.EntryFields = $.extend(true, {}, fields_data.Fields.EntryFields);
			            SYSPRO_VB.dataWidgetFields.LinksAvailable = $.extend(true, {}, fields_data.Fields.LinksAvailable);
			            SYSPRO_VB.tileWidgetFields = $.extend(true, {}, fields_data.Fields.TilesAvailable);
			            SYSPRO_VB.toolbarWidgetFields = $.extend(true, {}, fields_data.Fields.ToolbarActions);
			            SYSPRO_VB.chartsFields = $.extend(true, {}, fields_data.Fields.DisplayFields.Charts);
			            fields_data = fields_data.Fields;

			            // Parse display, entry and link fields, getting them in a structure suitable for the drill down menu UI
			            for (var key in SYSPRO_VB.dataWidgetFields) {
			                if (SYSPRO_VB.dataWidgetFields.hasOwnProperty(key)) {
			                    SYSPRO_VB.fieldsListHTML += '<li class="list-group-item"><a href="#">' + key.replace(/_/g, " ") + '</a><ul class="list-group">';

			                    for (var subkey in SYSPRO_VB.dataWidgetFields[key]) {
			                        if (SYSPRO_VB.dataWidgetFields[key].hasOwnProperty(subkey)) {
			                            SYSPRO_VB.fieldsListHTML += '<li class="list-group-item"><a href="#">' + subkey.replace(/_/g, " ") + '</a><ul class="list-group">';

			                            for (var subsubkey in SYSPRO_VB.dataWidgetFields[key][subkey]) {
			                                if (SYSPRO_VB.dataWidgetFields[key][subkey].hasOwnProperty(subsubkey)) {

			                                    var fieldObject = SYSPRO_VB.dataWidgetFields[key][subkey][subsubkey],
	                                            	fieldPath = subsubkey,
													caption = SYSPRO_VB.getCaption(fieldObject)[0],
													shortCaption = SYSPRO_VB.getCaption(fieldObject)[2],
													smartTag = SYSPRO_VB.getPropertyValue(fieldObject, "HasSmartTag"),
													entryType = SYSPRO_VB.getPropertyValue(fieldObject, "EntryType"),
			                                        infoTooltip,
			                                        dataType = SYSPRO_VB.getPropertyValue(fieldObject, "DataType"),
													formattedFieldPath = fieldPath.split(' ').join('_');
			                                    switch (entryType) {
			                                        case "0":
			                                            infoTooltip = "Standard text entry field";
			                                            break;
			                                        case "1":
			                                            infoTooltip = "Standard text entry field";
			                                            break;
			                                        case "2":
			                                            infoTooltip = "Date entry field";
			                                            break;
			                                        case "3":
			                                            infoTooltip = "Email entry field";
			                                            break;
			                                        case "4":
			                                            infoTooltip = "Password entry field";
			                                            break;
			                                        case "5":
			                                            infoTooltip = "Long/paragraph text entry field";
			                                            break;
			                                        case "6":
			                                            infoTooltip = "Checkbox";
			                                            break;
			                                        case "7":
			                                            infoTooltip = "Radio button";
			                                            break;
			                                        case "8":
			                                            infoTooltip = "Dropdown";
			                                            break;
			                                        case "9":
			                                            infoTooltip = "Dropdown multiple select";
			                                            break;
			                                        case "10":
			                                            infoTooltip = "Browse";
			                                            break;
			                                        case "11":
			                                            infoTooltip = "Slider";
			                                            break;
			                                        case "12":
			                                            infoTooltip = "Dropdown editable";
			                                            break;
			                                    }


			                                    SYSPRO_VB.fieldsListHTML += '<li class="list-group-item quickAddDataWidget field-name" id="' + formattedFieldPath + '" data-bind="dataPath: selected.FieldPath" data-field-path="Fields.' + fieldPath + '" data-smart-tag="' + smartTag + '" data-data-type="' + dataType + '" data-entry-type="' + entryType + '"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ';

			                                    if (infoTooltip !== null && infoTooltip !== '' && infoTooltip !== undefined) {
			                                        SYSPRO_VB.fieldsListHTML += '<i class="material-icons text-info" data-tooltip="tooltip" data-placement="right" data-original-title="' + infoTooltip + '">info</i> ';
			                                    }

			                                    SYSPRO_VB.fieldsListHTML += caption + '</li>';

			                                    if (caption) {
			                                        SYSPRO_VB.fieldsJSON.push({
			                                            fieldpath: "Fields." + fieldPath,
			                                            smarttag: smartTag,
			                                            datatype: dataType,
			                                            name: shortCaption
			                                        });
			                                        SYSPRO_VB.entryFieldsJSON.push({
			                                            fieldpath: "Fields." + fieldPath,
			                                            smarttag: smartTag,
			                                            datatype: dataType,
			                                            name: shortCaption
			                                        });

			                                    }
			                                    //SYSPRO_VB.fieldsListHTML += '<li class="list-group-item"><a href="#">' + subkey + '</a>';

			                                    // NEED TO GET ALL THE LITTLE BITS AND PIECES

			                                }
			                            }

			                            SYSPRO_VB.fieldsListHTML += '</ul>';

			                        }
			                    }
			                    SYSPRO_VB.fieldsListHTML += '</ul>';
			                }
			            }

			            SYSPRO_VB.fieldsListHTML += '<li class="divider">or</li><li class="list-group-item field-name" id="freeTextDataField" data-field-path="freeTextDataField" data-data-type="T">Free text field</li>';


			            // Parse tiles, getting them in a structure suitable for the drill down menu UI
			            for (var key in SYSPRO_VB.tileWidgetFields) {
			                if (SYSPRO_VB.tileWidgetFields.hasOwnProperty(key)) {
			                    SYSPRO_VB.tilesListHTML += '<li class="list-group-item"><a href="#">' + key.replace(/_/g, " ") + '</a><ul class="list-group">';

			                    for (var subkey in SYSPRO_VB.tileWidgetFields[key]) {
			                        if (SYSPRO_VB.tileWidgetFields[key].hasOwnProperty(subkey)) {

			                            var tileObj = SYSPRO_VB.tileWidgetFields[key][subkey];

			                            if (Array.isArray(tileObj)) {
			                                for (var tc = 0; tc < tileObj.length; tc++) {

			                                    var fieldObject = tileObj[tc],
	                                            	keyField = SYSPRO_VB.getPropertyValue(fieldObject, "KeyType"),
													description = SYSPRO_VB.getPropertyValue(fieldObject, "Description"),
													name = SYSPRO_VB.getPropertyValue(fieldObject, "Name"),
													tileType = SYSPRO_VB.getPropertyValue(fieldObject, "Type");

			                                    SYSPRO_VB.tilesListHTML += '<li data-bind="tileBind: selected.Widgets[0].TileTypeDetail" class="list-group-item field-name" id="' + name + '" data-tile-type="' + tileType + '" data-tile-keyfield="' + keyField + '" data-tile-name="' + name + '"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ' + description + '</li>';

			                                    SYSPRO_VB.tilesJSON[name] = fieldObject.Parameters;

			                                }
			                            } else {
			                                var keyField = SYSPRO_VB.getPropertyValue(tileObj, "KeyType"),
                                            	description = SYSPRO_VB.getPropertyValue(tileObj, "Description"),
												name = SYSPRO_VB.getPropertyValue(tileObj, "Name"),
												tileType = SYSPRO_VB.getPropertyValue(tileObj, "Type");

			                                SYSPRO_VB.tilesListHTML += '<li data-bind="tileBind: selected.Widgets[0].TileTypeDetail" class="list-group-item field-name" id="' + name + '" data-tile-type="' + tileType + '" data-tile-keyfield="' + keyField + '" data-tile-name="' + name + '"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ' + description + '</li>';

			                                SYSPRO_VB.tilesJSON[name] = fieldObject.Parameters;

			                            }

			                            SYSPRO_VB.tilesListHTML += '</ul>';

			                        }
			                    }

			                    SYSPRO_VB.tilesListHTML += '</ul>';
			                }
			            }


			            // Parse toolbar actions, getting them in a structure suitable for the drill down menu UI
			            SYSPRO_VB.toolbarListHTML = '<li class="list-group-item field-name" id="ToolbarDropdown" data-bind="toolbarFieldName: selected.FieldName" data-field-name="ToolbarDropdown" data-toolbar-widget-type="4" data-toolbar-icon="" data-caption="Dropdown Menu" data-toolbar-tooltip="">Dropdown Menu</li><li class="divider">or</li>';

			            for (var key in SYSPRO_VB.toolbarWidgetFields.ToolbarAction) {
			                if (SYSPRO_VB.toolbarWidgetFields.ToolbarAction.hasOwnProperty(key)) {
			                    var fieldObject = SYSPRO_VB.toolbarWidgetFields.ToolbarAction[key],
                                	fieldPath = key,
									fieldName = SYSPRO_VB.getPropertyValue(fieldObject, "FieldName"),
									actionType = SYSPRO_VB.getPropertyValue(fieldObject, "ActionType"),
									caption = SYSPRO_VB.getCaption(fieldObject)[0],
									shortCaption = SYSPRO_VB.getCaption(fieldObject)[1],
									icon = SYSPRO_VB.getPropertyValue(fieldObject, "Icon"),
									tooltip = SYSPRO_VB.getPropertyValue(fieldObject, "Tooltip"),
									formattedCaption = shortCaption.split(' ').join('_');

			                    SYSPRO_VB.toolbarListHTML += '<li class="list-group-item field-name" id="' + formattedCaption + '" data-bind="toolbarFieldName: selected.FieldName" data-field-name="Toolbar.' + fieldName + '" data-toolbar-widget-type="' + actionType + '" data-toolbar-icon="' + icon + '" data-caption="' + shortCaption + '" data-toolbar-tooltip="' + tooltip + '">';

			                    if (icon) {
			                        SYSPRO_VB.toolbarListHTML += '<i class="material-icons text-primary">' + icon + '</i> ';
			                    }

			                    SYSPRO_VB.toolbarListHTML += caption + '</li>';
			                }
			            }


			            // Parse charts, getting them in a structure suitable for the drill down menu UI
			            for (var key in SYSPRO_VB.chartsFields) {
			                if (SYSPRO_VB.chartsFields.hasOwnProperty(key)) {

			                    var fieldObject = SYSPRO_VB.chartsFields[key];
			                    var fieldCategory = SYSPRO_VB.getPropertyValue(fieldObject, "Category");
			                    if (fieldCategory === "Charts") {
			                        var fieldPath = key,
                                    	caption = SYSPRO_VB.getCaption(fieldObject)[0],
										formattedFieldPath = fieldPath.split(' ').join('_');
			                        SYSPRO_VB.chartsListHTML += '<li class="list-group-item field-name';
			                        SYSPRO_VB.chartsListHTML += '" id="' + formattedFieldPath + '" data-bind="dataPath: selected.FieldPath" data-field-path="Fields.' + fieldPath + '">' + caption + '</li>';
			                    }
			                }
			            }


			            // Set up tiles extra options
			            var tileOptionsHTML = "";
			            for (var tile in SYSPRO_VB.tilesJSON) {
			                if (SYSPRO_VB.tilesJSON[tile] !== undefined && SYSPRO_VB.tilesJSON[tile].hasOwnProperty('Parameter')) {

			                    tileOptionsHTML += '<div class="' + tile + 'Parameters tile-parameter-wrapper" style="display:none;">';

			                    if (SYSPRO_VB.tilesJSON[tile].Parameter.length) {

			                        for (var tp = 0; tp < SYSPRO_VB.tilesJSON[tile].Parameter.length; tp++) {

			                            if (SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamType === "A") {

			                                tileOptionsHTML += '<p class="tile-text-option-label">' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamDescription + '</p>';
			                                tileOptionsHTML += '<div class="form-group"><input data-bind="value: selected.Widgets[0].TileParameters.' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" type="text" class="form-control" name="' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" id="' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" autocomplete="off" placeholder=""></div>';

			                            } else if (SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamType === "L") {

			                                tileOptionsHTML += '<p class="tile-list-option-label">' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamDescription + '</p>';
			                                tileOptionsHTML += '<div class="form-group"><select data-bind="value: selected.Widgets[0].TileParameters.' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" class="form-control dropdown-select" name="' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" id="' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" autocomplete="off">';
			                                $.each(SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamOptions.ParamOption, function (i, option) {
			                                    tileOptionsHTML += '<option value="' + option + '">' + option + '</option>';
			                                });
			                                tileOptionsHTML += '</select></div>';

			                            }
			                        }

			                    } else {

			                        if (SYSPRO_VB.tilesJSON[tile].Parameter.ParamType === "A") {
			                            tileOptionsHTML += '<p class="tile-text-option-label">' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamDescription + '</p>';
			                            tileOptionsHTML += '<div class="form-group"><input data-bind="value: selected.Widgets[0].TileParameters.' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" type="text" class="form-control" name="' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" id="' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" autocomplete="off" placeholder=""></div>';
			                        } else if (SYSPRO_VB.tilesJSON[tile].Parameter.ParamType === "L") {
			                            tileOptionsHTML += '<p class="tile-list-option-label">' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamDescription + '</p>';
			                            tileOptionsHTML += '<div class="form-group"><select data-bind="value: selected.Widgets[0].TileParameters.' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" class="form-control dropdown-select" name="' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" id="' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" autocomplete="off">';
			                            $.each(SYSPRO_VB.tilesJSON[tile].Parameter.ParamOptions.ParamOption, function (i, option) {
			                                tileOptionsHTML += '<option value="' + option + '">' + option + '</option>';
			                            });
			                            tileOptionsHTML += '</select></div>';
			                        }
			                    }

			                    tileOptionsHTML += '</div>';
			                }
			            }

			            $("#tiles-parameters-wrapper").append(tileOptionsHTML);
			            $("#tiles-edit-parameters-wrapper").append(tileOptionsHTML);



			            // Set up fields auto-complete search 
			            $('.typeahead-fields').typeahead({
			                source: SYSPRO_VB.fieldsJSON,
			                autoSelect: true,
			                afterSelect: SYSPRO_VB.selectFieldFromSearch
			            });

			            $('.typeahead-link-fields').typeahead({
			                source: SYSPRO_VB.linkFieldsJSON,
			                autoSelect: true,
			                afterSelect: SYSPRO_VB.selectFieldFromSearch
			            });

			            $('.typeahead-entry-fields').typeahead({
			                source: SYSPRO_VB.entryFieldsJSON,
			                autoSelect: true,
			                afterSelect: SYSPRO_VB.selectFieldFromSearch
			            });



			            /*
SYSPRO_VB.fieldsListDataSource = new kendo.data.HierarchicalDataSource({
	
			                data: fields_data,
			                schema: {
			                    data: function (response) {
			                        var results = $.map(response, function (obj, index) {
			                            if (index !== "Charts" && index !== "CardsAvailable" && index !== "LinksAvailable" && index !== "SYSPROKeyData" && index !== "TilesAvailable" && index !== "EntryFields" && index !== "ToolbarActions" && index !== "HarmonyWidgetsAvailable") {
			                                function formatFields(obj) {
			                                    var itemsString = "";
			                                    var itemsArray = [];
			                                    for (var key in obj) {
	
			                                            var fieldObject = obj[key],
			                                            	fieldPath = key,
															caption = SYSPRO_VB.getCaption(fieldObject)[0],
															shortCaption = SYSPRO_VB.getCaption(fieldObject)[2],
															smartTag = SYSPRO_VB.getPropertyValue(fieldObject, "HasSmartTag"),
															dataType = SYSPRO_VB.getPropertyValue(fieldObject, "DataType"),
															formattedFieldPath = fieldPath.split(' ').join('_');
			                                            itemsString += '<li class="list-group-item quickAddDataWidget field-name" id="' + formattedFieldPath + '" data-bind="dataPath: selected.FieldPath" data-field-path="Fields.' + fieldPath + '" data-smart-tag="' + smartTag + '" data-data-type="' + dataType + '"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ' + caption + '</li>';
			                                            
if ( caption ) {
				                                            SYSPRO_VB.fieldsJSON.push({
					                                            fieldpath: "Fields." + fieldPath,
					                                            smarttag: smartTag,
					                                            datatype: dataType,
					                                            name: shortCaption
				                                            });
				                                            SYSPRO_VB.entryFieldsJSON.push({
					                                            fieldpath: "Fields." + fieldPath,
					                                            smarttag: smartTag,
					                                            datatype: dataType,
					                                            name: shortCaption
				                                            });
				                                            
				                                        }

			                                    }
			                                    return itemsString;
			                                    
			                                }
			                                
	
			                                var items = formatFields(obj);
			                                return {
			                                    text: index.replace(/_/g, " "),
			                                    content: '<ul class="list-group list">' + items + '</ul>',
			                                    encoded: false, // Allows use of HTML for item text
			                                    expanded: false,
			                                }
			                            }
			                        });
			                        return results;
			                    },
			                    model: {
			                        fields: {
			                            text: { type: "string" },
			                            content: { type: "string" },
			                            encoded: { type: "boolean" },
			                            expanded: { type: "boolean" },
			                            items: { defaultValue: [] }
			                        }
			                    },
			                },
			            });
*/

			            /*
SYSPRO_VB.tilesListDataSource = new kendo.data.HierarchicalDataSource({
	
			                data: fields_data,
			                schema: {
			                    data: function (response) {
				                    
				                    if ( response.hasOwnProperty('TilesAvailable') ) {
				                        var results = $.map(response.TilesAvailable, function (obj, index) {
										
		 			                        var items = "No tiles available";
					                        				                            
			                                function formatFields(tileObj) {
			                                    var itemsString = "";
			                                    if ( Array.isArray(tileObj) ) {
					                                for (var tc = 0; tc < tileObj.length; tc++) {
				                                    
			                                            var fieldObject = tileObj[tc],
			                                            	keyField = SYSPRO_VB.getPropertyValue(fieldObject, "KeyType"),
															description = SYSPRO_VB.getPropertyValue(fieldObject, "Description"),
															name = SYSPRO_VB.getPropertyValue(fieldObject, "Name"),
															tileType = SYSPRO_VB.getPropertyValue(fieldObject, "Type");

			                                            itemsString += '<li data-bind="tileBind: selected.Widgets[0].TileTypeDetail" class="list-group-item" id="' + name + '" data-tile-type="' + tileType + '" data-tile-keyfield="' + keyField + '" data-tile-name="' + name + '"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ' + description + '</li>';
			                                            SYSPRO_VB.tilesJSON[name] = fieldObject.Parameters;
				                                    }
			                                    } else {
		                                            var keyField = SYSPRO_VB.getPropertyValue(tileObj, "KeyType"),
		                                            	description = SYSPRO_VB.getPropertyValue(tileObj, "Description"),
														name = SYSPRO_VB.getPropertyValue(tileObj, "Name"),
														tileType = SYSPRO_VB.getPropertyValue(tileObj, "Type");

		                                            itemsString += '<li data-bind="tileBind: selected.Widgets[0].TileTypeDetail" class="list-group-item" id="' + name + '" data-tile-type="' + tileType + '" data-tile-keyfield="' + keyField + '" data-tile-name="' + name + '"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ' + description + '</li>';
		                                            SYSPRO_VB.tilesJSON[name] = tileObj.Parameters;
	
			                                    }
			                                    return itemsString;
	
			                                }
	
			                                var items = formatFields(obj.Tile);
			                                
			                                return {
			                                    text: index.replace(/_/g, " "),
			                                    content: '<ul class="list-group list">' + items + '</ul>',
			                                    encoded: false, // Allows use of HTML for item text
			                                    expanded: false,
			                                }
			                                
				                        });
				                        return results;
			                        }
			                    },
			                    model: {
			                        fields: {
			                            text: { type: "string" },
			                            content: { type: "string" },
			                            encoded: { type: "boolean" },
			                            expanded: { type: "boolean" },
			                            items: { defaultValue: [] }
			                        }
			                    },
			                },
			            });
*/

			            /*
                                                SYSPRO_VB.chartfieldsListDataSource = new kendo.data.HierarchicalDataSource({
                            
                                                    data: fields_data,
                                                    schema: {
                                                        data: function (response) {
                                                            var results = $.map(response, function (obj, index) {
                            
                                                                var items = "No charts available";
                            
                                                                if (index === "Charts") {
                                                                    function formatFields(obj) {
                                                                        var itemsString = "",
                                                                            itemsArray = [],
                                                                            chartCount = 0;
                                                                        for (var key in obj) {
                                                                            if (obj.hasOwnProperty(key)) {
                                                                                var fieldObject = obj[key];
                                                                                var fieldCategory = SYSPRO_VB.getPropertyValue(fieldObject, "Category");
                                                                                if (fieldCategory === "Charts") {
                                                                                    var fieldPath = key,
                                                                                        caption = SYSPRO_VB.getCaption(fieldObject)[0],
                                                                                        formattedFieldPath = fieldPath.split(' ').join('_');
                                                                                    itemsString += '<li class="list-group-item field-name';
                                                                                    itemsString += '" id="' + formattedFieldPath + '" data-bind="dataPath: selected.FieldPath" data-field-path="Fields.' + fieldPath + '">' + caption + '</li>';
                                                                                    chartCount++;
                                                                                }
                                                                            }
                                                                        }
                                                                        return itemsString;
                            
                                                                    }
                            
                                                                    var items = formatFields(obj);
                            
                                                                    return {
                                                                        text: 'Select chart data',
                                                                        content: '<ul class="list-group list">' + items + '</ul>',
                                                                        encoded: false, // Allows use of HTML for item text
                                                                        expanded: false,
                                                                    }
                                                                }
                            
                                                            });
                                                            return results;
                                                        },
                                                        model: {
                                                            fields: {
                                                                text: { type: "string" },
                                                                content: { type: "string" },
                                                                encoded: { type: "boolean" },
                                                                expanded: { type: "boolean" },
                                                                items: { defaultValue: [] }
                                                            }
                                                        },
                                                    },
                                                });
                        */
			            /*
                            
                                                SYSPRO_VB.linksListDataSource = new kendo.data.HierarchicalDataSource({
                            
                                                    data: fields_data.LinksAvailable,
                                                    schema: {
                                                        data: function (response) {
                                                            var results = $.map(response, function (obj, index) {
                            
                                                                var items = "No links available";
                            
                                                                function formatFields(obj) {
                                                                    var itemsString = "",
                                                                        itemsArray = [];
                                                                    for (var key in obj) {
                                                                        if (obj.hasOwnProperty(key)) {
                                                                            var fieldObject = obj[key],
                                                                                fieldPath = key,
                                                                                keyField = SYSPRO_VB.getPropertyValue(fieldObject, "KeyField"),
                                                                                keyAction = SYSPRO_VB.getPropertyValue(fieldObject, "KeyAction"),
                                                                                description = SYSPRO_VB.getPropertyValue(fieldObject, "Description"),
                                                                                formattedDescription = description.split(' ').join('_');
                                                                            itemsString += '<li class="list-group-item field-name" id="' + formattedDescription + '" data-bind="linkListField: selected.KeyAction" data-key-field="' + keyField + '" data-field-path="Fields.' + fieldPath + '" data-key-action="' + keyAction + '" data-description="' + description + '">' + description + '</li>';
                                                                            if ( description ) {
                                                                                SYSPRO_VB.linkFieldsJSON.push({
                                                                                    fieldpath: "Fields." + fieldPath,
                                                                                    smarttag: '',
                                                                                    datatype: '',
                                                                                    name: description
                                                                                });
                                                                                SYSPRO_VB.entryFieldsJSON.push({
                                                                                    fieldpath: "Fields." + fieldPath,
                                                                                    smarttag: '',
                                                                                    datatype: '',
                                                                                    name: description
                                                                                });
                                                                                
                                                                            }
                                                                        }
                                                                        
                            
                                                                    }
                                                                    return itemsString;
                            
                                                                }
                            
                                                                var items = formatFields(obj);
                            
                                                                return {
                                                                    text: index.replace("_", " "),
                                                                    content: '<ul class="list-group list">' + items + '</ul>',
                                                                    encoded: false, // Allows use of HTML for item text
                                                                    expanded: false,
                                                                }
                            
                                                            });
                                                            return results;
                                                        },
                                                        model: {
                                                            fields: {
                                                                text: { type: "string" },
                                                                content: { type: "string" },
                                                                encoded: { type: "boolean" },
                                                                expanded: { type: "boolean" },
                                                                items: { defaultValue: [] }
                                                            }
                                                        },
                                                    },
                                                });
                        */

			            /*
SYSPRO_VB.entryFieldsDataSource = new kendo.data.HierarchicalDataSource({
	
			                data: fields_data.EntryFields,
			                schema: {
			                    data: function (response) {
			                        var results = $.map(response, function (obj, index) {
	
			                            var items = "No entry fields available";
	
			                            function formatFields(obj) {
			                                var itemsString = "",
			                                	itemsArray = [];
			                                for (var key in obj) {
			                                    if (obj.hasOwnProperty(key)) {
			                                        var fieldObject = obj[key],
			                                        	fieldPath = key,
			                                        	keyField = SYSPRO_VB.getPropertyValue(fieldObject, "KeyField"),
														entryType = SYSPRO_VB.getPropertyValue(fieldObject, "EntryType"),
			                                        	infoTooltip;
			                                        switch (entryType) {
														case "0":
															infoTooltip = "Standard text entry field";
															break;
														case "1":
															infoTooltip = "Standard text entry field";
															break;
														case "2":
															infoTooltip = "Date entry field";
															break;
														case "3":
															infoTooltip = "Email entry field";
															break;
														case "4":
															infoTooltip = "Password entry field";
															break;
														case "5":
															infoTooltip = "Long/paragraph text entry field";
															break;
														case "6":
															infoTooltip = "Checkbox";
															break;
														case "7":
															infoTooltip = "Radio button";
															break;
														case "8":
															infoTooltip = "Dropdown";
															break;
														case "9":
															infoTooltip = "Dropdown multiple select";
															break;
														case "10":
															infoTooltip = "Browse";
															break;
														case "11":
															infoTooltip = "Slider";
															break;
														case "12":
															infoTooltip = "Dropdown editable";
															break;
													}		
														
			                                        var dataType = SYSPRO_VB.getPropertyValue(fieldObject, "DataType"),
			                                        	//caption = SYSPRO_VB.getPropertyValue(fieldObject, "Caption"),
			                                        	caption = SYSPRO_VB.getCaption(fieldObject)[0],
			                                        	shortCaption = SYSPRO_VB.getCaption(fieldObject)[2],
														formattedCaption = caption.split(' ').join('_');
			                                        itemsString += '<li class="list-group-item field-name" id="' + formattedCaption + '" data-bind="dataPath: selected.FieldPath" data-key-field="' + keyField + '" data-field-path="Fields.' + fieldPath + '" data-data-type="' + dataType + '" data-entry-type="' + entryType + '"><i class="material-icons text-info" data-tooltip="tooltip" data-placement="right" data-original-title="' + infoTooltip + '">info</i> ' + caption + '</li>';
			                                        if ( caption ) {
			                                            SYSPRO_VB.entryFieldsJSON.push({
				                                            fieldpath: "Fields." + fieldPath,
				                                            smarttag: '',
				                                            datatype: dataType,
				                                            name: shortCaption,
				                                            entrytype: entryType
			                                            });
			                                            
			                                        }
			                                    }
			                                    
	
			                                }
			                                return itemsString;
	
			                            }
	
			                            var items = formatFields(obj);
										
			                            return {
			                                text: "Entry Fields: " + index.replace(/_/g, " "),
			                                content: '<ul class="list-group list">' + items + '</ul>',
			                                encoded: false, // Allows use of HTML for item text
			                                expanded: false,
			                            }
	
			                        });
			                        return results;
			                    },
			                    model: {
			                        fields: {
			                            text: { type: "string" },
			                            content: { type: "string" },
			                            encoded: { type: "boolean" },
			                            expanded: { type: "boolean" },
			                            items: { defaultValue: [] }
			                        }
			                    },
			                },
			            });
*/

			            /*
SYSPRO_VB.toolbarDataSource = new kendo.data.HierarchicalDataSource({
	
			                data: fields_data.ToolbarActions,
			                schema: {
			                    data: function (response) {
			                        var results = $.map(response, function (obj, index) {
	
			                            var items = "No toolbar items available";
	
			                            function formatFields(obj) {
			                                var itemsString = '<li class="list-group-item field-name" id="ToolbarDropdown" data-bind="toolbarFieldName: selected.FieldName" data-field-name="ToolbarDropdown" data-toolbar-widget-type="4" data-toolbar-icon="" data-caption="Dropdown Menu" data-toolbar-tooltip="">Dropdown Menu</li>',
			                                	itemsArray = [];
			                                for (var key in obj) {
			                                    if (obj.hasOwnProperty(key)) {
			                                        var fieldObject = obj[key],
			                                        	fieldPath = key,
														fieldName = SYSPRO_VB.getPropertyValue(fieldObject, "FieldName"),
														actionType = SYSPRO_VB.getPropertyValue(fieldObject, "ActionType"),
														caption = SYSPRO_VB.getCaption(fieldObject)[0],
														shortCaption = SYSPRO_VB.getCaption(fieldObject)[1],
														icon = SYSPRO_VB.getPropertyValue(fieldObject, "Icon"),
														tooltip = SYSPRO_VB.getPropertyValue(fieldObject, "Tooltip"),
														formattedCaption = shortCaption.split(' ').join('_');
			                                        itemsString += '<li class="list-group-item field-name" id="' + formattedCaption + '" data-bind="toolbarFieldName: selected.FieldName" data-field-name="Toolbar.' + fieldName + '" data-toolbar-widget-type="' + actionType + '" data-toolbar-icon="' + icon + '" data-caption="' + shortCaption + '" data-toolbar-tooltip="' + tooltip + '">';
			                                        if ( icon ) {
				                                        itemsString += '<i class="material-icons text-primary">' + icon + '</i> ';
			                                        }
			                                        itemsString += caption + '</li>';
			                                        
			                                    }
			                                    
	
			                                }
			                                return itemsString;
	
			                            }
	
			                            var items = formatFields(obj);
										
			                            return {
			                                text: "Toolbar items",
			                                content: '<ul class="list-group list">' + items + '</ul>',
			                                encoded: false, // Allows use of HTML for item text
			                                expanded: true,
			                            }
	
			                        });
			                        return results;
			                    },
			                    model: {
			                        fields: {
			                            text: { type: "string" },
			                            content: { type: "string" },
			                            encoded: { type: "boolean" },
			                            expanded: { type: "boolean" },
			                            items: { defaultValue: [] }
			                        }
			                    },
			                },
			            });
*/

			            /*
 SYSPRO_VB.fieldsListDataSource.read().then(function () {
			                
SYSPRO_VB.sidebarPanelBar = $("#initial-fields-list").kendoPanelBar({
			                    expand: SYSPRO_VB.onExpandQuickAddFieldsList,
			                    collapse: SYSPRO_VB.onCollapseQuickAddFieldsList,
			                    expandMode: "single",
			                    dataSource: SYSPRO_VB.fieldsListDataSource.data().toJSON(), //need to convert data to JSON array
			                }).data("kendoPanelBar");

	
			                
SYSPRO_VB.dataWindowPanelBar = $("#initial-fields-list-data-window").kendoPanelBar({
			                    expandMode: "single",
			                    dataSource: SYSPRO_VB.fieldsListDataSource.data().toJSON(), //need to convert data to JSON array
			                }).data("kendoPanelBar");
	
			                SYSPRO_VB.editDataWindowPanelBar = $("#initial-fields-list-data-edit-window").kendoPanelBar({
			                    expandMode: "single",
			                    dataSource: SYSPRO_VB.fieldsListDataSource.data().toJSON(), //need to convert data to JSON array
			                }).data("kendoPanelBar");

							
							$('.typeahead-fields').typeahead({
								source:SYSPRO_VB.fieldsJSON, 
								autoSelect: true,
								afterSelect: SYSPRO_VB.selectFieldFromSearch
							});
							
							$('.typeahead-link-fields').typeahead({
								source:SYSPRO_VB.linkFieldsJSON, 
								autoSelect: true,
								afterSelect: SYSPRO_VB.selectFieldFromSearch
							});
							
							$('.typeahead-entry-fields').typeahead({
								source:SYSPRO_VB.entryFieldsJSON, 
								autoSelect: true,
								afterSelect: SYSPRO_VB.selectFieldFromSearch
							});
	
			            }).then(function () {
	
			                var options = {
			                    valueNames: ['field-name']
			                };
	
			                SYSPRO_VB.initialisePanelBar("#initial-fields-list");
			                
SYSPRO_VB.initialisePanelBar("#initial-fields-list-data-window");
			                SYSPRO_VB.initialisePanelBar("#initial-fields-list-data-edit-window");

			                
							//$(".list-group").perfectScrollbar();
							
							
			                SYSPRO_VB.initQuickAddDataWidgets();
			            });
*/

			            /*
SYSPRO_VB.chartfieldsListDataSource.read().then(function () {
	
			                
SYSPRO_VB.chartsPanelBar = $("#chart-fields-list").kendoPanelBar({
			                    expandMode: "single",
			                    dataSource: SYSPRO_VB.chartfieldsListDataSource.data().toJSON(), //need to convert data to JSON array
			                }).data("kendoPanelBar");
			                
			                SYSPRO_VB.editWindowChartsPanelBar = $("#chart-fields-list-edit-window").kendoPanelBar({
			                    expandMode: "single",
			                    dataSource: SYSPRO_VB.chartfieldsListDataSource.data().toJSON(), //need to convert data to JSON array
			                }).data("kendoPanelBar");

	
			            }).then(function () {
	
			                //SYSPRO_VB.initialisePanelBar("#chart-fields-list");
			                //SYSPRO_VB.initialisePanelBar("#chart-fields-list-edit-window");
							
							//$(".list-group").perfectScrollbar();
							
							//$("#chart-fields-list ul li:first-child").addClass("active");
	// 						$("#chart-fields-list-edit-window .list-group li:first-child").addClass("active");
							
			                SYSPRO_VB.initQuickAddDataWidgets();
			            });
*/

			            /*
                                                SYSPRO_VB.linksListDataSource.read().then(function () {
                            
                                                    SYSPRO_VB.dataWindowlinksPanelBar = $("#links-fields-list-data-window").kendoPanelBar({
                                                        expandMode: "multiple",
                                                        dataSource: SYSPRO_VB.linksListDataSource.data().toJSON(), //need to convert data to JSON array
                                                    }).data("kendoPanelBar");
                            
                                                    SYSPRO_VB.editDataWindowlinksPanelBar = $("#links-fields-list-data-edit-window").kendoPanelBar({
                                                        expandMode: "multiple",
                                                        dataSource: SYSPRO_VB.linksListDataSource.data().toJSON(), //need to convert data to JSON array
                                                    }).data("kendoPanelBar");
                            
                                                }).then(function () {
                            
                                                    SYSPRO_VB.initialisePanelBar("#links-fields-list-data-window");
                                                    SYSPRO_VB.initialisePanelBar("#links-fields-list-data-edit-window");
                                                    //$(".list-group").perfectScrollbar();
                                                    
                                                    SYSPRO_VB.initQuickAddDataWidgets();
                                                });
                        */

			            /*
SYSPRO_VB.entryFieldsDataSource.read().then(function () {
	
			                
SYSPRO_VB.dataWindowEntryFieldsPanelBar = $("#entry-fields-list-data-window").kendoPanelBar({
			                    expandMode: "multiple",
			                    dataSource: SYSPRO_VB.entryFieldsDataSource.data().toJSON(), //need to convert data to JSON array
			                }).data("kendoPanelBar");
	
			                SYSPRO_VB.editDataWindowEntryFieldsPanelBar = $("#entry-fields-list-data-edit-window").kendoPanelBar({
			                    expandMode: "multiple",
			                    dataSource: SYSPRO_VB.entryFieldsDataSource.data().toJSON(), //need to convert data to JSON array
			                }).data("kendoPanelBar");

	
			            }).then(function () {
	
							//SYSPRO_VB.initialisePanelBar("#entry-fields-list-data-window");
							//SYSPRO_VB.initialisePanelBar("#entry-fields-list-data-edit-window");
							
							//$(".list-group").perfectScrollbar();
							
							$('[data-tooltip="tooltip"]').tooltip();
			                SYSPRO_VB.initQuickAddDataWidgets();
			            });
*/

			            /*
SYSPRO_VB.toolbarDataSource.read().then(function () {
	

			                SYSPRO_VB.toolbarWindowPanelBar = $("#toolbar-widgets-list").kendoPanelBar({
			                    expandMode: "single",
			                    dataSource: SYSPRO_VB.toolbarDataSource.data().toJSON(), //need to convert data to JSON array
			                }).data("kendoPanelBar");
	
			                SYSPRO_VB.editToolbarWindowPanelBar = $("#edit-toolbar-widgets-list").kendoPanelBar({
			                    expandMode: "single",
			                    dataSource: SYSPRO_VB.toolbarDataSource.data().toJSON(), //need to convert data to JSON array
			                }).data("kendoPanelBar");

	
			            }).then(function () {
	
							//SYSPRO_VB.initialisePanelBar("#toolbar-widgets-list");
							//SYSPRO_VB.initialisePanelBar("#edit-toolbar-widgets-list");
							
							//$(".list-group").perfectScrollbar();
							
			                //SYSPRO_VB.initQuickAddDataWidgets();
			            });
*/

			            /*
SYSPRO_VB.tilesListDataSource.read().then(function () {
	
			                
SYSPRO_VB.tilesPanelBar = $("#tiles-list").kendoPanelBar({
			                    expandMode: "single",
			                    dataSource: SYSPRO_VB.tilesListDataSource.data().toJSON(), //need to convert data to JSON array
			                }).data("kendoPanelBar");
			                
			                SYSPRO_VB.tilesEditPanelBar = $("#tiles-edit-list").kendoPanelBar({
			                    expandMode: "single",
			                    dataSource: SYSPRO_VB.tilesListDataSource.data().toJSON(), //need to convert data to JSON array
			                }).data("kendoPanelBar");

	
							
var tileOptionsHTML = "";
							for ( var tile in SYSPRO_VB.tilesJSON ) {
								if ( SYSPRO_VB.tilesJSON[tile] !== undefined && SYSPRO_VB.tilesJSON[tile].hasOwnProperty('Parameter') ) {
									
									tileOptionsHTML += '<div class="' + tile + 'Parameters tile-parameter-wrapper" style="display:none;">';
									
									if ( SYSPRO_VB.tilesJSON[tile].Parameter.length ) {
										
										for (var tp = 0; tp < SYSPRO_VB.tilesJSON[tile].Parameter.length; tp++ ) {
											
											if ( SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamType === "A" ) {
												
												tileOptionsHTML += '<p class="tile-text-option-label">' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamDescription + '</p>';
												tileOptionsHTML += '<div class="form-group"><input data-bind="value: selected.Widgets[0].TileParameters.' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" type="text" class="form-control" name="' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" id="' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" autocomplete="off" placeholder=""></div>';
												
											} else if ( SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamType === "L" ) {
	
												tileOptionsHTML += '<p class="tile-list-option-label">' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamDescription + '</p>';
												tileOptionsHTML += '<div class="form-group"><select data-bind="value: selected.Widgets[0].TileParameters.' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" class="form-control dropdown-select" name="' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" id="' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" autocomplete="off">';
												$.each(SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamOptions.ParamOption, function (i, option) {
													tileOptionsHTML += '<option value="' + option + '">' + option + '</option>';
												});
												tileOptionsHTML += '</select></div>';
												
											}
										}
										
									} else {
										
										if ( SYSPRO_VB.tilesJSON[tile].Parameter.ParamType === "A" ) {
											tileOptionsHTML += '<p class="tile-text-option-label">' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamDescription + '</p>';
											tileOptionsHTML += '<div class="form-group"><input data-bind="value: selected.Widgets[0].TileParameters.' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" type="text" class="form-control" name="' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" id="' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" autocomplete="off" placeholder=""></div>';
										} else if ( SYSPRO_VB.tilesJSON[tile].Parameter.ParamType === "L" ) {
											tileOptionsHTML += '<p class="tile-list-option-label">' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamDescription + '</p>';
											tileOptionsHTML += '<div class="form-group"><select data-bind="value: selected.Widgets[0].TileParameters.' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" class="form-control dropdown-select" name="' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" id="' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" autocomplete="off">';
											$.each(SYSPRO_VB.tilesJSON[tile].Parameter.ParamOptions.ParamOption, function (i, option) {
												tileOptionsHTML += '<option value="' + option + '">' + option + '</option>';
											});
											tileOptionsHTML += '</select></div>';
										}
									}
									
									tileOptionsHTML += '</div>';
								}	
							}
							
							$("#tiles-parameters-wrapper").append(tileOptionsHTML);
							$("#tiles-edit-parameters-wrapper").append(tileOptionsHTML);

	
			            }).then(function () {
							//SYSPRO_VB.initialisePanelBar("#tiles-list");
							//SYSPRO_VB.initialisePanelBar("#tiles-edit-list");
							
							//$(".list-group").perfectScrollbar();
							
			            });
*/

			            if (fields_data.hasOwnProperty('CardsAvailable')) {
			                SYSPRO_VB.processCards(fields_data.CardsAvailable.Card, 0);
			            }

			            if (fields_data.hasOwnProperty('HarmonyWidgetsAvailable')) {
			                SYSPRO_VB.processHarmony(fields_data.HarmonyWidgetsAvailable.HarmonyWidget, 0);
			            }

			            $("#initial-fields-list, #initial-fields-list-data-window, #initial-fields-list-data-edit-window").html(SYSPRO_VB.fieldsListHTML);
			            $("#tiles-list, #tiles-edit-list").html(SYSPRO_VB.tilesListHTML);
			            $("#toolbar-widgets-list, #edit-toolbar-widgets-list").html(SYSPRO_VB.toolbarListHTML);
			            $("#chart-fields-list, #chart-fields-list-edit-window").html(SYSPRO_VB.chartsListHTML);
			            $("#chart-fields-list li.field-name:first-child").addClass("active");


			            //$("#drilldown").html(SYSPRO_VB.fieldsListHTML);
			            /*
$('#initial-fields-list-data-window').drilldown({ wrapper_class: 'drilldown panel panel-default sys-bd-off sys-box-shadow-off sys-mg-off-b initial-fields-list-data-window' });
			            $('#initial-fields-list-data-edit-window').drilldown({ wrapper_class: 'drilldown panel panel-default sys-bd-off sys-box-shadow-off sys-mg-off-b initial-fields-list-data-edit-window' });
			            $('#tiles-list').drilldown({ wrapper_class: 'drilldown panel panel-default sys-bd-off sys-box-shadow-off sys-mg-off-b tiles-list' });
			            $('#tiles-edit-list').drilldown({ wrapper_class: 'drilldown panel panel-default sys-bd-off sys-box-shadow-off sys-mg-off-b tiles-edit-list' });
*/
			            SYSPRO_VB.sidebarFieldsList = $('#initial-fields-list').drilldown();
			            SYSPRO_VB.dataWindowFieldsList = $('#initial-fields-list-data-window').drilldown();
			            SYSPRO_VB.dataEditWindowFieldsList = $('#initial-fields-list-data-edit-window').drilldown();
			            SYSPRO_VB.tilesList = $('#tiles-list').drilldown();
			            SYSPRO_VB.tilesEditList = $('#tiles-edit-list').drilldown();

			            /*
$(".drilldown .drilldown-menu, #toolbar-widget-list-wrapper.fields-wrapper").perfectScrollbar({
				            
							suppressScrollX: true,
				            suppressScrollY: false,
				            minScrollbarLength: 50

			            });
*/


			            $('[data-tooltip="tooltip"]').tooltip();
			            SYSPRO_VB.initQuickAddDataWidgets();
			            SYSPRO_VB.initiateExistingTiles();
			            SYSPRO_VB.initQuickAddLayoutWidgets();
			            $("#loading-cover").fadeOut();
			        },
			        function (a) {
			            //The error callback where a.ErrorMessage is the error
			            console.log("Error: " + a.ErrorMessage);
			        },
					false
				);

                $(".menu-toggle").click(function (e) {
                    e.preventDefault();
                    $("#sidebar-wrapper").on("transitionend",
					 	function (a) {

					 	    $("#sidebar-tab-controls").find("li.active").removeClass("active");
					 	    SYSPRO_VB.sizeTiles(0);
					 	    $(this).off(a);
					 	}
					);
                    $("#wrapper").toggleClass("toggled");
                });

                $(".menu-toggle-tab").click(function (e) {
                    e.preventDefault();
                    $("#sidebar-wrapper").on("transitionend",
					 	function (a) {

					 	    SYSPRO_VB.sizeTiles(0);
					 	    $(this).off(a);
					 	}
					);

                    if ($("#wrapper").hasClass("toggled")) {
                        $("#wrapper").toggleClass("toggled");
                    }
                });

                $("#undo-button").prop("disabled", true);
                $("#redo-button").prop("disabled", true);

                SYSPRO_VB.initNormalSorting();
                SYSPRO_VB.initToolbarSorting();
                SYSPRO_VB.initQuickAddLayoutWidgets();

                // Initialise multi pane windows
                $.each(["#rowWindow", "#dataWindow", "#dataEditWindow", "#rowEditWindow"], function (index, value) {
                    SYSPRO_VB.initialiseMultiPaneWindow(value);
                });

                // Main column layout changing
                $("input[name='column-layout']").change(function (e) {

                    $(".column-parent").on("transitionend",
					 	function (a) {
					 	    SYSPRO_VB.sizeTiles(0);
					 	    $(this).off(a);
					 	}
					);

                    var previousLayout = $("body").data("column-layout");

                    if ($(this).val() == '1col') {
                        $(".form-horizontal .col-sm-4 .form-group label.col-md-3").addClass("col-md-4").removeClass("col-md-3");
                        $(".form-horizontal .col-sm-4 .form-group .col-md-9").addClass("col-md-8").removeClass("col-md-9");

                        $(".tile.col-sm-3").addClass("col-sm-2").removeClass("col-sm-3");
                        $(".tile.col-sm-6").addClass("col-sm-4").removeClass("col-sm-6");
                    } else {
                        $(".form-horizontal .col-sm-4 .form-group label.col-md-4").addClass("col-md-3").removeClass("col-md-4");
                        $(".form-horizontal .col-sm-4 .form-group .col-md-8").addClass("col-md-9").removeClass("col-md-8");

                        $(".tile.col-sm-2").addClass("col-sm-3").removeClass("col-sm-2");
                        $(".tile.col-sm-4").addClass("col-sm-6").removeClass("col-sm-4");
                    }

                    if ($(this).val() == '1col') {

                        var VBdata = viewModel.dataSource.data().toJSON();

                        $("#main_column_2").closest(".column-parent").hide(0, function () {
                            $("#main_column_1").closest(".column-parent").hide(0, function () {
                                $("#main_column_0").closest(".column-parent").removeClass("col-sm-4").removeClass("col-sm-8").removeClass("col-sm-6").addClass("col-sm-12");

                                SYSPRO_VB.column1Copy = VBdata[1];

                                if (VBdata.length === 3) {
                                    SYSPRO_VB.column2Copy = VBdata[2];
                                }

                                VBdata.splice(1, 2);
                                VBdata[0].ResponsiveStyle = 0;

                            });
                        });

                        viewModel.dataSource.data(VBdata);
                        viewModel.set("columnLayout", $(this).val()); //update the viewModel columnLayout
                        SYSPRO_VB.save();

                    } else if ($(this).val() == '2colequal') {

                        var VBdata = viewModel.dataSource.data().toJSON();

                        if (previousLayout === "1col") {
                            $("#main_column_0").closest(".column-parent").hide();
                            $("#main_column_0").closest(".column-parent").removeClass("col-sm-4 col-sm-8 col-sm-12").addClass("col-sm-6");
                            $("#main_column_1").closest(".column-parent").removeClass("col-sm-4 col-sm-8 col-sm-12").addClass("col-sm-6");
                            $("#main_column_0").closest(".column-parent").show(0, function () {
                                $("#main_column_1").closest(".column-parent").show(0, function () {
                                    VBdata.splice(1, 0, SYSPRO_VB.column1Copy);
                                    VBdata[0].ResponsiveStyle = 1;
                                    VBdata[1].ResponsiveStyle = 1;

                                });
                            });
                        } else {

                            $("#main_column_2").closest(".column-parent").hide(0, function () {
                                $("#main_column_0").closest(".column-parent").removeClass("col-sm-4 col-sm-8 col-sm-12").addClass("col-sm-6").show();
                                $("#main_column_1").closest(".column-parent").removeClass("col-sm-4 col-sm-8 col-sm-12").addClass("col-sm-6").show(0, function () {
                                    VBdata[0].ResponsiveStyle = 1;
                                    VBdata[1].ResponsiveStyle = 1;

                                });
                            });
                        }
                        if (previousLayout === "3col") {

                            SYSPRO_VB.column2Copy = VBdata[2];
                            VBdata.splice(2, 1);

                        }

                        viewModel.dataSource.data(VBdata);
                        viewModel.set("columnLayout", $(this).val()); //update the viewModel columnLayout
                        SYSPRO_VB.save();

                    } else if ($(this).val() == '2colleft') {

                        var VBdata = viewModel.dataSource.data().toJSON();

                        if (previousLayout === "1col") {
                            $("#main_column_0").closest(".column-parent").hide();
                            $("#main_column_0").closest(".column-parent").removeClass("col-sm-4 col-sm-6 col-sm-12").addClass("col-sm-8");
                            $("#main_column_1").closest(".column-parent").removeClass("col-sm-6 col-sm-8 col-sm-12").addClass("col-sm-4");
                            $("#main_column_0").closest(".column-parent").show(0, function () {
                                $("#main_column_1").closest(".column-parent").show(0, function () {

                                    VBdata.splice(1, 0, SYSPRO_VB.column1Copy);
                                    VBdata[0].ResponsiveStyle = 2;
                                    VBdata[1].ResponsiveStyle = 3;

                                });
                            });
                        } else {
                            $("#main_column_2").closest(".column-parent").hide(0, function () {
                                $("#main_column_0").closest(".column-parent").removeClass("col-sm-4 col-sm-6 col-sm-12").addClass("col-sm-8").show();
                                $("#main_column_1").closest(".column-parent").removeClass("col-sm-6 col-sm-8 col-sm-12").addClass("col-sm-4").show(0, function () {

                                    VBdata[0].ResponsiveStyle = 2;
                                    VBdata[1].ResponsiveStyle = 3;

                                });
                            });
                        }
                        if (previousLayout === "3col") {

                            SYSPRO_VB.column2Copy = VBdata[2];
                            VBdata.splice(2, 1);

                        }

                        viewModel.dataSource.data(VBdata);
                        viewModel.set("columnLayout", $(this).val()); //update the viewModel columnLayout
                        SYSPRO_VB.save();


                    } else if ($(this).val() == '2colright') {

                        var VBdata = viewModel.dataSource.data().toJSON();

                        if (previousLayout === "1col") {
                            $("#main_column_0").closest(".column-parent").hide();
                            $("#main_column_0").closest(".column-parent").removeClass("col-sm-4 col-sm-8 col-sm-12").addClass("col-sm-4");
                            $("#main_column_1").closest(".column-parent").removeClass("col-sm-4 col-sm-8 col-sm-12").addClass("col-sm-8");
                            $("#main_column_0").closest(".column-parent").show(0, function () {
                                $("#main_column_1").closest(".column-parent").show(0, function () {

                                    VBdata.splice(1, 0, SYSPRO_VB.column1Copy);
                                    VBdata[0].ResponsiveStyle = 3;
                                    VBdata[1].ResponsiveStyle = 2;

                                });
                            });
                        } else {
                            $("#main_column_2").closest(".column-parent").hide(0, function () {
                                $("#main_column_0").closest(".column-parent").removeClass("col-sm-8 col-sm-6 col-sm-12").addClass("col-sm-4").show();
                                $("#main_column_1").closest(".column-parent").removeClass("col-sm-6 col-sm-4 col-sm-12").addClass("col-sm-8").show(0, function () {

                                    VBdata[0].ResponsiveStyle = 3;
                                    VBdata[1].ResponsiveStyle = 2;

                                });
                            });
                        }
                        if (previousLayout === "3col") {

                            SYSPRO_VB.column2Copy = VBdata[2];
                            VBdata.splice(2, 1);

                        }

                        viewModel.dataSource.data(VBdata);
                        viewModel.set("columnLayout", $(this).val()); //update the viewModel columnLayout
                        SYSPRO_VB.save();

                    } else if ($(this).val() == '3col') {

                        var VBdata = viewModel.dataSource.data().toJSON();
                        $("#main_column_0").closest(".column-parent").hide();
                        $("#main_column_1").closest(".column-parent").hide();
                        $("#main_column_2").closest(".column-parent").hide();
                        $("#main_column_0").closest(".column-parent").removeClass("col-sm-8 col-sm-6 col-sm-12").addClass("col-sm-4");
                        $("#main_column_1").closest(".column-parent").removeClass("col-sm-8 col-sm-6 col-sm-12").addClass("col-sm-4");
                        $("#main_column_2").closest(".column-parent").removeClass("col-sm-8 col-sm-6 col-sm-12").addClass("col-sm-4");

                        $("#main_column_0").closest(".column-parent").show(0, function () {
                            $("#main_column_1").closest(".column-parent").show();
                            $("#main_column_2").closest(".column-parent").show(0, function () {

                                if (VBdata.length === 1) {

                                    VBdata[0].ResponsiveStyle = 3;
                                    VBdata.splice(1, 0, SYSPRO_VB.column1Copy);
                                    VBdata[1].ResponsiveStyle = 3;
                                    VBdata.splice(2, 0, SYSPRO_VB.column2Copy);
                                    VBdata[2].ResponsiveStyle = 3;
                                } else if (VBdata.length === 2) {
                                    VBdata[0].ResponsiveStyle = 3;
                                    VBdata[1].ResponsiveStyle = 3;
                                    VBdata.splice(2, 0, SYSPRO_VB.column2Copy);
                                    VBdata[2].ResponsiveStyle = 3;
                                }

                                SYSPRO_VB.sizeTiles(0);

                            });
                        });

                        viewModel.dataSource.data(VBdata);
                        viewModel.set("columnLayout", $(this).val()); //update the viewModel columnLayout
                        SYSPRO_VB.save();

                    }

                    $("body").data("column-layout", $(this).val());
                    $("body").attr("data-column-layout", $(this).val());


                });

                $("#exportTotalJSON").on("click", function () {
                    console.log(JSON.stringify(viewModel.dataSource.data().toJSON()));
                });

        
                /*
templateLoader.loadExtTemplate("layoutWidgetWindow.html");
	            
	            $(document).bind("TEMPLATE_LOADED", function(e, path) {
		            console.log('Templates loaded');
		            console.log(e);
		            console.log(path);
		
		            //SYSPRO_VB.rowWindow = SYSPRO_VB.createKendoWindow("rowWindow", "Add new layout widget", SYSPRO_VB.rowWindowOpen, SYSPRO_VB.rowWindowClose);
		        })
*/


                $(".add-row-section").bind("click", function () {
                    SYSPRO_VB.column_num = $(this).parents(".main-column").data("column");
                    SYSPRO_VB.rowWindow.center().open();
                });


                $(document).one("kendo:pageUnload", function () { if (notification) { notification.hide(); } });


                // Load icons
                SYSPRO_VB.loadIconJSON(function (response) {
                    // Parse JSON string into object
                    var icon_JSON = response;
                    var iconHTML = "";
                    var editDataIconHTML = "";
                    var editLayoutIconHTML = "";
                    $.each(icon_JSON, function (key, value) {
                        var iconName = this.Name;// value.name.toLowerCase().replace(/ /g, "_");
                        iconHTML += '<label class="btn btn-radio btn-icon icon-option" data-icon-name="' + iconName + '"><i class="material-icons">' + iconName + '</i></label>';
                        editDataIconHTML += '<label class="btn btn-radio btn-icon icon-option" data-icon-name="' + iconName + '" data-bind="iconName: selected.Icon.Name"><i class="material-icons">' + iconName + '</i></label>';
                        editLayoutIconHTML += '<label class="btn btn-radio btn-icon icon-option" data-icon-name="' + iconName + '" data-bind="iconName: selected.Icon"><i class="material-icons">' + iconName + '</i></label>';
                    });
                    $("#dataWindowIconList, #rowWindowIconList, #toolbarWindowIconList").append(iconHTML);
                    $("#editDataWindowIconList, #toolbarEditWindowIconList").append(editDataIconHTML);
                    $("#editRowWindowIconList").append(editLayoutIconHTML);

                    $(".icon-field-container").off().on("click", ".btn-icon", function (icon) {
                        $(this).parents(".icon-field-container").find(".active").removeClass("active");
                        $(this).addClass("active");
                    });
                });

                $('[data-tooltip="tooltip"]').tooltip();

                $('.block-bg-button').popover();

                $('.block-bg-button').on('shown.bs.popover', function () {
                    $(".popover .btn-colour").click(function () {
                        var bg_colour = 'sys-bg-' + $(this).find(".block-background-colour").val();
                        $(this).parents(".popover").siblings(".block-bg-button").removeClass().addClass("block-bg-button btn btn-radio btn-colour " + bg_colour);
                        $('.block-bg-button').popover('hide');
                    });
                });

                $("input[name*='row_options']").change(function () {
                    var row_options_val = $(this).val();
                    $(".block-bg-setting").hide(0, function () {
                        $("#block-bg-" + row_options_val).fadeIn(100);
                    });

                });

                // Scroll on hover text for overflowing text in data widgets
                $(".overflowing").hoverForMore({
                    speed: 40.0,		// Measured in pixels-per-second
                    loop: false,		// Scroll to the end and stop, or loop continuously?
                    gap: 20,			// When looping, insert this many pixels of blank space
                    target: false,		// Hover on this CSS selector instead of the text line itself
                    removeTitle: true,	// By default, remove the title attribute, as a tooltip is redundant
                    snapback: true,		// Animate when de-activating, as opposed to instantly reverting
                    addStyles: true,	// Auto-add CSS; leave this on unless you need to override default styles
                    alwaysOn: false,	// If you're insane, you can turn this into a <marquee> tag. (Please don't.)
                    // In case you want to alter the events which activate and de-activate the effect:
                    startEvent: "mouseenter",
                    stopEvent: "mouseleave"
                });

                //$("#initial-fields-list-data-window-wrapper, #initial-fields-list-data-edit-window-wrapper, #initial-fields-list-wrapper, #toolbar-widget-list-wrapper, #toolbar-widget-edit-list-wrapper, #tile-widgets-list-wrapper, #tile-widgets-edit-list-wrapper").perfectScrollbar();


                $("input[name='column-layout']").each(function () {
                    if ($(this).val() == $("body").data("column-layout")) {
                        $(this).prop("checked", true);
                        $(this).parent().addClass("active");
                    } else {
                        $(this).prop("checked", false);
                        $(this).parent().removeClass("active");
                    }
                });

                //Initialise the edit and remove buttons on data widgets and layout widgets only once
                $(document).on("click", ".remove-section", function (c) {
                    c.preventDefault();
                    //Rob: Now always do a get instead of getByUid so we can use our own Id.
                    var parentOfToRemoveDataWidget = $(c.target).parents(".draggable-row-section"),
	                	parentOfToRemoveDataWidgetModel = viewModel.dataSource.get(parentOfToRemoveDataWidget.data("guid"));

                    if (parentOfToRemoveDataWidgetModel.DisplayStyle === 1) {
                        var toRemoveDataWidgetModel = viewModel.dataSource.get($(c.target).parents(".draggable-data-section").data("guid"));

                        $(this).parents("tr.draggable-data-section").remove();

                        viewModel.dataSource.remove(toRemoveDataWidgetModel);

                    } else if (parentOfToRemoveDataWidgetModel.DisplayStyle === 3) {
                        var toRemoveDataWidgetModel = viewModel.dataSource.get($(c.target).parents(".draggable-data-section").data("guid")),
		                	listViewRow = $(c.target).parents(".draggable-data-section").data("row");
                        viewModel.dataSource.remove(parentOfToRemoveDataWidgetModel.Rows.at(listViewRow - 1));
                        $(this).parents("a.draggable-data-section").remove();

                        parentOfToRemoveDataWidget.find(".list-group-item").each(function (index) {
                            $(this).data("row", index);
                            $(this).attr("data-row", index);
                        });

                        viewModel.dataSource.remove(toRemoveDataWidgetModel);
                        $(this).closest(".data-section").find(".add-data-widget").show();
                        $(this).closest(".data-section").find(".panel").not(".add-data-widget").remove();
                        $(this).parents("a.list-group-item.draggable-data-section").remove();
                    } else if (parentOfToRemoveDataWidgetModel.DisplayStyle === 4) {
                        var toRemoveDataWidgetModel = viewModel.dataSource.get($(c.target).parents(".tile").data("guid"));
                        viewModel.dataSource.remove(toRemoveDataWidgetModel);
                        SYSPRO_VB.initiateTiles(parentOfToRemoveDataWidgetModel);
                    } else if (parentOfToRemoveDataWidgetModel.DisplayStyle === 5) {
                        var toRemoveDataWidgetModel = viewModel.dataSource.get($(c.target).parents(".draggable-data-section").data("guid")),
		                	entryFieldRow = $(c.target).parents(".draggable-data-section").data("row");
                        viewModel.dataSource.remove(toRemoveDataWidgetModel);
                        $(this).closest(".draggable-data-section").remove();

                        /*
parentOfToRemoveDataWidget.find(".form-group").each(function(index) {
			                $(this).data("row",index);
			                $(this).attr("data-row",index);
		                });
*/

                        // 		                viewModel.dataSource.remove(toRemoveDataWidgetModel);

                    } else {
                        var toRemoveDataWidgetModel = viewModel.dataSource.get($(c.target).parents(".draggable-data-section").data("guid"));
                        viewModel.dataSource.remove(toRemoveDataWidgetModel);
                        $(this).closest(".data-section").find(".add-data-widget").show();
                        $(this).closest(".data-section").find(".panel").not(".add-data-widget").remove();
                    }

                    SYSPRO_VB.initAddDataWidgets();
                    SYSPRO_VB.save();
                });

                $(document).on("click", ".edit-section", function (e) {
                    e.preventDefault();
                    SYSPRO_VB.layout_widget_guid = $(this).parents(".draggable-row-section").data("guid");
                    SYSPRO_VB.currentParentLayoutWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid); //get reference to the model

                    if (SYSPRO_VB.currentParentLayoutWidget.DisplayStyle === 4) {
                        SYSPRO_VB.section_num = 0;
                        SYSPRO_VB.row_num = 0;
                        SYSPRO_VB.currentDataWidgetUid = $(e.target).parents(".tile").data("guid");
                        //Rob: Now always do a get instead of getByUid so we can use our own Id.
                        SYSPRO_VB.currentDataWidget = viewModel.dataSource.get(SYSPRO_VB.currentDataWidgetUid); //get reference to the model
                        SYSPRO_VB.tileHTMLFunction = SYSPRO_VB.currentDataWidget.Widgets[0].HTMLContent;
                        SYSPRO_VB.currentDataWidgetHTML = $(this).closest(".tile");
                        SYSPRO_VB.tempDataWidgetJSON = {};
                        SYSPRO_VB.tempDataWidgetJSON["TileType"] = SYSPRO_VB.currentDataWidget.Widgets[0].TileType;
                        SYSPRO_VB.tempDataWidgetJSON["Title"] = SYSPRO_VB.currentDataWidget.Widgets[0].Title;
                        SYSPRO_VB.tempDataWidgetJSON["TileWidth"] = SYSPRO_VB.currentDataWidget.Widgets[0].TileWidth;
                        SYSPRO_VB.tempDataWidgetJSON["keyField"] = SYSPRO_VB.currentDataWidget.Widgets[0].KeyType;
                        SYSPRO_VB.tempDataWidgetJSON["TileWidth"] = SYSPRO_VB.currentDataWidget.Widgets[0].TileWidth;
                        SYSPRO_VB.tempDataWidgetJSON["parentFieldPath"] = SYSPRO_VB.currentDataWidget.Widgets[0].KeyType;
                        SYSPRO_VB.tempDataWidgetJSON["TileParameters"] = SYSPRO_VB.currentDataWidget.Widgets[0].TileParameters.toJSON();
                        viewModel.set("selected", SYSPRO_VB.currentDataWidget); //update the viewModel
                        $("#tileEditWindow").data("kendoWindow").center().open();
                    } else {
                        SYSPRO_VB.section_num = $(this).closest(".data-section").data("section");
                        SYSPRO_VB.row_num = $(this).closest("[data-row]").data("row");

                        SYSPRO_VB.currentDataWidgetUid = $(e.target).parents(".draggable-data-section").data("guid");
                        //Rob: Now always do a get instead of getByUid so we can use our own Id.
                        SYSPRO_VB.currentDataWidget = viewModel.dataSource.get($(e.target).parents(".draggable-data-section").data("guid")); //get reference to the model
                        SYSPRO_VB.currentDataWidgetHTML = $(this).closest(".draggable-data-section");
                        SYSPRO_VB.tempDataWidgetJSON = SYSPRO_VB.currentDataWidget.toJSON();

                        viewModel.set("selected", SYSPRO_VB.currentDataWidget); //update the viewModel
                        $("#dataEditWindow").data("kendoWindow").center().open();
                    }
                });

                $(document).on("click", ".remove-row-section", function (f) {
                    f.preventDefault();
                    //Rob: Now always do a get instead of getByUid so we can use our own Id.
                    var toRemoveLayoutWidgetModel = viewModel.dataSource.get($(this).parents(".draggable-row-section").data("guid"));
                    viewModel.dataSource.remove(toRemoveLayoutWidgetModel);
                    $(this).parents(".draggable-row-section").remove();
                    SYSPRO_VB.save();
                });

                $(document).on("click", ".edit-row-section", function (e) {
                    e.preventDefault();
                    SYSPRO_VB.column_num = $(this).parents(".main-column").data("column");
                    SYSPRO_VB.row_num = $(this).closest(".row").data("row");
                    SYSPRO_VB.layout_widget_guid = $(this).parents(".draggable-row-section").data("guid");

                    SYSPRO_VB.currentLayoutWidgetHTML = $(this).parents(".draggable-row-section");
                    //Rob: Now always do a get instead of getByUid so we can use our own Id.
                    SYSPRO_VB.currentLayoutWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid); //get reference to the model
                    SYSPRO_VB.tempLayoutWidgetJSON = SYSPRO_VB.currentLayoutWidget.toJSON();
                    SYSPRO_VB.dataEditValidator.hideMessages(); //hide the validation messages (if any)
                    //ROB:  This is to stop it from breaking when WidgetName is  null for  existing layouts  designed.  WidgetName has  been added  to the LayoutWidget model.
                    if (!SYSPRO_VB.currentLayoutWidget.WidgetName) {
                        SYSPRO_VB.currentLayoutWidget.WidgetName = "row_1_col";
                    }

                    viewModel.set("selected", SYSPRO_VB.currentLayoutWidget); //update the viewModel
                    SYSPRO_VB.rowEditWindow.center().open();
                });

                $(document).on("click", ".remove-toolbar-widget", function (e) {
                    var toRemoveToolbarWidget = viewModel.toolbar.get($(e.target).parents("li[data-guid]").data("guid"));
                    viewModel.toolbar.remove(toRemoveToolbarWidget);
                    $(this).closest("li[data-guid]").remove();
                });

                $(document).on("click", ".edit-toolbar-widget", function (e) {
                    e.preventDefault();
                    SYSPRO_VB.currentToolbarWidgetHTML = $(e.target).parents("li[data-guid]");
                    //SYSPRO_VB.currentToolbarWidgetUid = SYSPRO_VB.currentToolbarWidgetHTML.data("guid"); //get reference to the model
                    SYSPRO_VB.currentToolbarWidget = viewModel.toolbar.get(SYSPRO_VB.currentToolbarWidgetHTML.data("guid")); //get reference to the model
                    console.log(SYSPRO_VB.currentToolbarWidgetHTML);
                    console.log(SYSPRO_VB.currentToolbarWidget);
                    SYSPRO_VB.tempToolbarWidgetJSON = SYSPRO_VB.currentToolbarWidget.toJSON();

                    viewModel.set("selected", SYSPRO_VB.currentToolbarWidget); //update the viewModel
                    SYSPRO_VB.toolbarEditWindow.center().open();
                });

                $(document).on("shown.bs.collapse", ".collapse", function (e) {
                    sysproInterop.resizeSparklines();
                });


                $(window).resize(function () {
                    if (this.resizeTO) clearTimeout(this.resizeTO);
                    this.resizeTO = setTimeout(function () {
                        $(this).trigger('resizeEnd');
                    }, 250);

                });

                $(window).bind('resizeEnd', function () {
                    console.log('resize end');
                    SYSPRO_VB.sizeTiles(0);
                });

                $(".layout-widget-preview-wrapper").perfectScrollbar({
                    suppressScrollX: true,
                    suppressScrollY: false
                });

                SYSPRO_VB.initAddDataWidgets();

                SYSPRO_VB.initDataWidgetSorting();

                SYSPRO_VB.finishAddLayoutWidget();

                SYSPRO_VB.initAddToolbarWidgets();

                window.viewModel = viewModel;

            });
        },

        // Use immutable js to allow saving, undoing and redoing of changes to the JSON object representing the layout
        save: function () {
            // first, make sure that there is no future
            // in the history list. for instance, if the user
            // does something, clicks undo, and then
            // does something else, we need to dispose of the
            // future state
            SYSPRO_VB.history = SYSPRO_VB.history.slice(0, SYSPRO_VB.historyIndex);

            // create a new version of the data
            SYSPRO_VB.history[SYSPRO_VB.historyIndex] = [JSON.stringify(viewModel.dataSource.data().toJSON()), viewModel.columnLayout, JSON.stringify(viewModel.toolbar.data().toJSON())];

            // add the new version to the history list and increment
            // the index to match
            SYSPRO_VB.historyIndex++;

            //if (SYSPRO_VB.history.length > 0) {
            if (SYSPRO_VB.historyIndex > 1) {
                $("#undo-button").removeClass("disabled");
                $("#undo-button").prop("disabled", false);
            } else {
                $("#undo-button").addClass("disabled");
                $("#undo-button").prop("disabled", true);
            }

            if (SYSPRO_VB.history.length > 0 && SYSPRO_VB.historyIndex < SYSPRO_VB.history.length) {
                $("#redo-button").removeClass("disabled");
                $("#redo-button").prop("disabled", false);
            } else {
                $("#redo-button").addClass("disabled");
                $("#redo-button").prop("disabled", true);
            }

            if (SYSPRO_VB.countAvailableSlots(viewModel.dataSource) > 0) {
                $("#draggableDataCover").hide();
            } else {
                $("#draggableDataCover").show();
            }

            if (SYSPRO_VB.countLayoutWidgets(viewModel.dataSource) > 0) {
                $("#initial-instruction").fadeOut();
            } else {
                $("#initial-instruction").fadeIn();
            }

            console.log("Save action");


        },

        undo: function () {

            if (SYSPRO_VB.historyIndex > 1) SYSPRO_VB.historyIndex--;
            viewModel.dataSource.data(JSON.parse(SYSPRO_VB.history[SYSPRO_VB.historyIndex - 1][0]));
            viewModel.toolbar.data(JSON.parse(SYSPRO_VB.history[SYSPRO_VB.historyIndex - 1][2]));
            viewModel.set("columnLayout", SYSPRO_VB.history[SYSPRO_VB.historyIndex - 1][1]);

            //Then destroy the old  treeview
            var treeview = $("#invisibleNode").data("kendoTreeView");
            treeview.destroy();

            //Create the new  treeview with loadOnDemand: false
            $("#invisibleNode").kendoTreeView({
                dataSource: viewModel.dataSource,
                dataTextField: "TypeName",
                loadOnDemand: false
            });

            //Then destroy the old toolbar treeview
            var toolbarTreeview = $("#invisibleToolbarNode").data("kendoTreeView");
            toolbarTreeview.destroy();

            //Create the new  treeview with loadOnDemand: false
            $("#invisibleToolbarNode").kendoTreeView({
                dataSource: viewModel.toolbar,
                dataTextField: "TypeName",
                loadOnDemand: false
            });

            SYSPRO_VB.regenerateLayout();

            if (SYSPRO_VB.historyIndex > 1) {
                $("#undo-button").removeClass("disabled");
                $("#undo-button").prop("disabled", false);
            } else {
                $("#undo-button").addClass("disabled");
                $("#undo-button").prop("disabled", true);
            }

            if (SYSPRO_VB.history.length > 1 && SYSPRO_VB.historyIndex < SYSPRO_VB.history.length) {
                $("#redo-button").removeClass("disabled");
                $("#redo-button").prop("disabled", false);
            } else {
                $("#redo-button").addClass("disabled");
                $("#redo-button").prop("disabled", true);
            }

            if (SYSPRO_VB.countAvailableSlots(viewModel.dataSource) > 0) {
                $("#draggableDataCover").hide();
            } else {
                $("#draggableDataCover").show();
            }

            if (SYSPRO_VB.countLayoutWidgets(viewModel.dataSource) > 0) {
                $("#initial-instruction").fadeOut();
            } else {
                $("#initial-instruction").fadeIn();
            }

            $("input[name='column-layout']").each(function () {
                if ($(this).val() == SYSPRO_VB.history[SYSPRO_VB.historyIndex - 1][1]) {
                    $(this).prop("checked", true);
                    $(this).parent().addClass("active");
                } else {
                    $(this).prop("checked", false);
                    $(this).parent().removeClass("active");
                }
            });

            sysproInterop.undoCalled();

        },

        redo: function () {
            if (SYSPRO_VB.historyIndex < SYSPRO_VB.history.length) SYSPRO_VB.historyIndex++;
            viewModel.dataSource.data(JSON.parse(SYSPRO_VB.history[SYSPRO_VB.historyIndex - 1][0]));
            viewModel.toolbar.data(JSON.parse(SYSPRO_VB.history[SYSPRO_VB.historyIndex - 1][2]));
            viewModel.set("columnLayout", SYSPRO_VB.history[SYSPRO_VB.historyIndex - 1][1]);

            //Then destroy the old  treeview
            var treeview = $("#invisibleNode").data("kendoTreeView");
            treeview.destroy();

            //Create the new  treeview with loadOnDemand: false
            $("#invisibleNode").kendoTreeView({
                dataSource: viewModel.dataSource,
                dataTextField: "TypeName",
                loadOnDemand: false
            });

            //Then destroy the old  treeview
            var toolbarTreeview = $("#invisibleToolbarNode").data("kendoTreeView");
            toolbarTreeview.destroy();

            //Create the new  treeview with loadOnDemand: false
            $("#invisibleToolbarNode").kendoTreeView({
                dataSource: viewModel.toolbar,
                dataTextField: "TypeName",
                loadOnDemand: false
            });

            SYSPRO_VB.regenerateLayout();

            if (SYSPRO_VB.historyIndex > 1) {
                $("#undo-button").removeClass("disabled");
                $("#undo-button").prop("disabled", false);
            } else {
                $("#undo-button").addClass("disabled");
                $("#undo-button").prop("disabled", true);
            }

            if (SYSPRO_VB.history.length > 0 && SYSPRO_VB.historyIndex < SYSPRO_VB.history.length) {
                $("#redo-button").removeClass("disabled");
                $("#redo-button").prop("disabled", false);
            } else {
                $("#redo-button").addClass("disabled");
                $("#redo-button").prop("disabled", true);
            }

            if (SYSPRO_VB.countAvailableSlots(viewModel.dataSource) > 0) {
                $("#draggableDataCover").hide();
            } else {
                $("#draggableDataCover").show();
            }

            if (SYSPRO_VB.countLayoutWidgets(viewModel.dataSource) > 0) {
                $("#initial-instruction").fadeOut();
            } else {
                $("#initial-instruction").fadeIn();
            }

            $("input[name='column-layout']").each(function () {
                if ($(this).val() == SYSPRO_VB.history[SYSPRO_VB.historyIndex - 1][1]) {
                    $(this).prop("checked", true);
                    $(this).parent().addClass("active");
                } else {
                    $(this).prop("checked", false);
                    $(this).parent().removeClass("active");
                }
            });

            sysproInterop.redoCalled();

        },

        deleteAll: function () {
            viewModel.dataSource.data(initColumns);
            viewModel.toolbar.data(initToolbar);

            SYSPRO_VB.regenerateLayout();

            if (SYSPRO_VB.countAvailableSlots(viewModel.dataSource) > 0) {
                $("#draggableDataCover").hide();
            } else {
                $("#draggableDataCover").show();
            }

            if (SYSPRO_VB.countLayoutWidgets(viewModel.dataSource) > 0) {
                $("#initial-instruction").fadeOut();
            } else {
                $("#initial-instruction").fadeIn();
            }
        },

        // Object scope variables
        history: [],
        historyIndex: 0,
        fieldsJSON: [],
        linkFieldsJSON: [],
        entryFieldsJSON: [],
        fieldsListHTML: '',
        tilesListHTML: '',
        toolbarListHTML: '',
        chartsListHTML: '',
        tilesJSON: {},
        column1Id: column1InputId,
        column2Id: column2InputId,
        column1Copy: { "PrimaryStyle": 0, "ResponsiveStyle": 3, "Widgets": [], "Id": column1InputId, "Index": 1, "TypeName": "Column", "HasChildren": false, "index": 1 },
        column2Copy: { "PrimaryStyle": 0, "ResponsiveStyle": 3, "Widgets": [], "Id": column2InputId, "Index": 2, "TypeName": "Column", "HasChildren": false, "index": 2 },
        column_num: null,
        toolbar_column_num: null,
        section_num: null,
        layout_widget_guid: null,
        widget_index: null,
        section: null,
        starting_section_num: null,
        currentRowWindow: null,
        row_num: null,
        column: null,
        currentDraggedWidget: null,
        currentDataWidgetUid: null,
        currentDataWidget: null,
        currentDataWidgetHTML: null,
        currentLayoutWidget: null,
        currentLayoutWidgetHTML: null,
        currentToolbarWidget: null,
        currentToolbarWidgetUid: null,
        currentToolbarWidgetHTML: null,
        parentToolbarWidgetUid: null,
        parentToolbarWidget: null,
        parentToolbarWidgetHTML: null,
        tempDataWidgetJSON: null,
        tempToolbarWidgetJSON: null,
        draggedDataWidget: null,
        draggedToolbarWidget: null,
        draggedLayoutWidgetCopy: null,
        draggedDataWidgetTempCopy: null,
        draggedToolbarWidgetTempCopy: null,
        dragTargetParentWidget: null,
        tempDataWidgetTarget: null,
        previewLayoutWidget: null,
        tempHiddenWidg: null,
        availableDataWidgetSections: 0,
        openWindow: null,
        cardsHTML: {},
        harmonyHTML: {},
        bindableFieldsData: {},
        dataWidgetFields: {},
        tileWidgetFields: {},
        toolbarWidgetFields: {},
        chartsFields: {},

        // New Layout Widget window open function
        rowWindowOpen: function () {

            SYSPRO_VB.openWindow = 'rowWindow';

            $('body').addClass('window-open');

            $('#addLayoutButtonPopoverWrap').popover({
                html: false,
                trigger: "hover",
                placement: 'top',
                /*             container: 'body', */
                delay: { "show": 100, "hide": 100 },
                content: "Select and configure a layout widget to proceed"
            });

            SYSPRO_VB.column = $('div[data-column="' + SYSPRO_VB.column_num + '"]');

            // $('#rowWindow_wnd_title').text('Add section to column ' + (SYSPRO_VB.column_num + 1));
            $('#rowWindow_wnd_title').text('Configure new layout section');

            // Initialise the collapsible title stylings collapsible options section, and hide it initially
            SYSPRO_VB.setupRowWindow("#rowWindow");

            $("#rowWindow .btn-primary").off().on('click', function () {

                var newLayoutWidget = SYSPRO_VB.setupLayoutWidget("#rowWindow"),
					GUID = newLayoutWidget[0],
					kendoLayoutWidget = newLayoutWidget[1],
					widgetTypeName = kendoLayoutWidget.TypeName;

                SYSPRO_VB.insertLayoutWidget("#rowWindow", GUID, kendoLayoutWidget);

                SYSPRO_VB.rowWindow.close();

            });

            $("#rowWindow .btn-default").off().on('click', function (e) {

                SYSPRO_VB.rowWindow.close();
            });
        },

        // Row/Layout widget window close function
        rowWindowClose: function () {
            SYSPRO_VB.openWindow = null;
            $('body').removeClass('window-open');
            $("#collapsible_title_styles").collapse("hide");
            $(".layout-widget-preview").html("");
            $("#layout_widget_title").val("");
            $('#rowWindow input[name="row_options"]:checked').prop('checked', false);
            $("#rowWindow .hide-on-close").hide();
            $("#rowWindow .active").removeClass("active in");
            $("#addLayoutWidgetButton").addClass("disabled");
            $("#addLayoutWidgetButton").prop("disabled", true);
            $("#rowWindow input").off();
            $('a#tile_layout_section').off();
            $("#rowWindow .icon-field-container").scrollTop(0);
            $("#rowWindow .data-section-pane-2").fadeOut(50, function () {
                $("#rowWindow .data-section-pane-1").fadeIn(50);
            });
        },

        // Edit layout widget window open function
        rowEditWindowOpen: function () {

            SYSPRO_VB.openWindow = 'rowEditWindow';
            kendo.bind($("#rowEditWindow"), viewModel);
            $('body').addClass('window-open');

            $("#rowEditWindow input").each(function (index) {
                if ($(this).prop("checked")) {
                    $(this).parent("label").addClass("active");
                } else {
                    $(this).parent("label").removeClass("active");
                }
            });

            SYSPRO_VB.column = $('div[data-column="' + SYSPRO_VB.column_num + '"]');

            // Initialise the collapsible title stylings collapsible options section, and hide it initially
            SYSPRO_VB.setupEditRowWindow("#rowEditWindow");

            $("#rowEditWindow .btn-primary").off().on('click', function () {

                sysproInterop.getHtmlFromModel("Widget", SYSPRO_VB.stringifyJSONObject(SYSPRO_VB.layout_widget_guid), function (result) {
                    console.log("getHtmlFromModel completed");

                    var newWidgetHTMLjQuery = $($.trim(result));

                    //Rob: Now always do a get instead of getByUid so we can use our own Id.
                    var targetEditWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid);

                    if (targetEditWidget.DisplayStyle === 2) {

                        var initialNumRowsInCarousel = targetEditWidget.Rows.length,
	                    	targetEditWidgetJSON = targetEditWidget.toJSON();

                        if (targetEditWidgetJSON.Rows[0].Columns[0].hasOwnProperty("Widgets")) {
                            var carouselRowNumber = initialNumRowsInCarousel;

                            $(newWidgetHTMLjQuery).find(".carousel-inner").append('<div class="item"><div class="panel-body sys-bg-white text-left"><div class="row " data-row="' + carouselRowNumber + '"><div class="col-xs-12" data-section="0"><div class="panel sys-widget sys-box-shadow-off sys-mg-off  add-data-widget"><div class="panel-body text-center sys-fg-primary"><a class="pull-left text-center add-data-section" href="#"><i class="material-icons">note_add</i></a></div></div></div></div></div></div>');

                        } else {
                            var carouselRowNumber = 1;
                        }

                    } else if (targetEditWidget.DisplayStyle === 4) {
                        var clonedTileWidgetSection = newWidgetHTMLjQuery.find(".tile-widget").parent(".col-xs-12").clone();
                        newWidgetHTMLjQuery.find(".tile-widget").parents(".layout-widget").find(".panel-body .row").html(clonedTileWidgetSection);
                    }

                    SYSPRO_VB.currentLayoutWidgetHTML.replaceWith(newWidgetHTMLjQuery);

                    if (targetEditWidget.DisplayStyle === 4) {
                        console.log("before intiate tiles");
                        SYSPRO_VB.initiateTiles(targetEditWidget);
                    }

                    SYSPRO_VB.finishAddLayoutWidget();

                    SYSPRO_VB.initAddDataWidgets();

                    //sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true);
                    sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', SYSPRO_VB.column);

                });

                SYSPRO_VB.rowEditWindow.close();
                SYSPRO_VB.save();


            });

            $("#rowEditWindow .btn-default").off().on('click', function (e) {
                //ROB:  Added SYSPRO_VB  for SYSPRO_VB.tempLayoutWidgetJSON because  it got lost in scope andd appeared  as  null.
                for (var key in SYSPRO_VB.tempLayoutWidgetJSON) {
                    SYSPRO_VB.currentLayoutWidget.set(key, SYSPRO_VB.tempLayoutWidgetJSON[key]);
                }

                SYSPRO_VB.rowEditWindow.close();
            });
        },

        // Edit Row/Layout widget window close function
        rowEditWindowClose: function () {
            SYSPRO_VB.openWindow = null;
            SYSPRO_VB.currentLayoutWidget = null;
            $('body').removeClass('window-open');
            $("#edit_collapsible_title_styles").collapse("hide");
            $("#rowEditWindow .hide-on-close").hide();
            $("#layout_widget_title").val("");
            $(document.querySelector('input[name="row_options"]:checked')).prop('checked', false);
            $("#rowEditWindow .active").removeClass("active in");
            $("#rowEditWindow .data-section-pane-2").fadeOut(50, function () {
                $("#rowEditWindow .data-section-pane-1").fadeIn(50);
            });
        },

        // Kendo Window version of data widget 
        dataWindowOpen: function () {

            SYSPRO_VB.openWindow = 'dataWindow';
            $('body').addClass('window-open');
            $('#addDataButtonPopoverWrap').popover({
                html: false,
                trigger: "hover",
                placement: 'top',
                delay: { "show": 100, "hide": 100 },
                content: "Select and configure a data widget to proceed"
            });

            var column_num = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]').parents(".main-column").data("column"),
	        	widget_index = $('div[data-column="' + column_num + '"] .draggable-row-section').index($('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]')),
				targetLayoutWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid),
				targetLayoutWidgetDisplayStyle = targetLayoutWidget.DisplayStyle;

            if (targetLayoutWidgetDisplayStyle == 0 || targetLayoutWidgetDisplayStyle == 2) {
                var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] div[data-row="' + SYSPRO_VB.row_num + '"] div[data-section="' + SYSPRO_VB.section_num + '"]');
                SYSPRO_VB.hideShowDataWidgetOptions(false, true, true, false, true, true, false, false, true, true, true, false, true, true, false, false);
            } else if (targetLayoutWidgetDisplayStyle == 1) {
                var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] table tbody');
                SYSPRO_VB.hideShowDataWidgetOptions(false, true, true, false, true, true, false, false, false, false, false, false, false, true, false, false);
            } else if (targetLayoutWidgetDisplayStyle == 3) {
                var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] .list-group');
                SYSPRO_VB.hideShowDataWidgetOptions(false, true, false, true, false, false, false, true, false, false, false, true, false, false, true, false);
            } else if (targetLayoutWidgetDisplayStyle == 5) {
                var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] div.row[data-row="0"] div[data-section="' + SYSPRO_VB.section_num + '"]');
                SYSPRO_VB.hideShowDataWidgetOptions(false, true, true, true, true, false, true, false, false, false, false, false, false, false, false, true);
            }

            $("#freeTextDataField").on("click", function (event) {
                console.log("click recorded");
                $("#dataWindow #entry-fields-list-data-window.fieldsPanelBar li.active").removeClass("active");
                $("#dataWindow #initial-fields-list-data-window.fieldsPanelBar li.active").removeClass("active");
                $("#dataWindow #links-fields-list-data-window.fieldsPanelBar li.active").removeClass("active");
                $(".linklist-text-option").show();
                $("#fieldStylingOptions").show();
                $("#addDataWidgetButton").removeClass("disabled");
                $("#addDataWidgetButton").prop("disabled", false);
                $('#addDataButtonPopoverWrap').popover("destroy");
            });

            $("#initial-fields-list-data-window.fieldsPanelBar .list-group-item.field-name").on("click", function (event) {
                //$("#linklist_link_text").val($(this).data("description"));
                $("#initial-fields-list-data-window.fieldsPanelBar li.field-name.active").removeClass("active");
                $("#dataWindow #entry-fields-list-data-window.fieldsPanelBar li.active").removeClass("active");
                $(this).addClass("active");
                $(".linklist-text-option").hide();
                $(".text-colour-weight-options").show();
                $("#fieldStylingOptions").show();
                $("#addDataWidgetButton").removeClass("disabled");
                $("#addDataWidgetButton").prop("disabled", false);
                $('#addDataButtonPopoverWrap').popover("destroy");
            });

            $("#links-fields-list-data-window.fieldsPanelBar .list-group-item").on("click", function (event) {
                $("#linklist_link_text").val($(this).data("description"));
                $(".text-colour-weight-options").hide();
                $("#fieldStylingOptions").show();
                $("#addDataWidgetButton").removeClass("disabled");
                $("#addDataWidgetButton").prop("disabled", false);
                $('#addDataButtonPopoverWrap').popover("destroy");
            });

            $("#entry-fields-list-data-window.fieldsPanelBar .list-group-item").on("click", function (event) {
                $("#dataWindow #initial-fields-list-data-window.fieldsPanelBar li.active").removeClass("active");
                if (targetLayoutWidgetDisplayStyle == 5) {
                    $(".text-colour-weight-options").hide();
                } else {
                    $(".text-colour-weight-options").show();
                }
                $(".linklist-text-option").hide();
                $("#fieldStylingOptions").show();
                $("#addDataWidgetButton").removeClass("disabled");
                $("#addDataWidgetButton").prop("disabled", false);
                $('#addDataButtonPopoverWrap').popover("destroy");
            });

            $("#dataWindow .btn-primary").off().on('click', function () {

                var newKendoWidget = SYSPRO_VB.setUpDataWidget("#dataWindow", targetLayoutWidgetDisplayStyle),
	            	dataGUID = newKendoWidget[0],
					kendoDataWidget = newKendoWidget[1];

                SYSPRO_VB.insertDataWidget(dataGUID, newKendoWidget[1], column_num, widget_index, SYSPRO_VB.row_num, SYSPRO_VB.section_num, section, SYSPRO_VB.layout_widget_guid, null);

                SYSPRO_VB.initAddDataWidgets();

                $("#dataWindow").data("kendoWindow").close();

            });

            $("#dataWindow .btn-default").off().on('click', function (e) {
                SYSPRO_VB.dataWindow.close();
            });
        },

        // data widget window close function
        dataWindowClose: function () {
            SYSPRO_VB.openWindow = null;
            $('body').removeClass('window-open');
            $("#dataWindow .fieldsPanelBar li.active").removeClass("active");
            $("#dataWindow #data_show_caption").prop('checked', true);
            $("#dataWindow #data_show_caption").parent().addClass("active");
            $("#dataWindow input[name='data-fields-radios']:checked").prop("checked", false);

            if (!$("#dataWindow .data-text-colour-options .sys-bg-inverse").hasClass("active")) {
                $("#dataWindow .data-text-colour-options .sys-bg-inverse").button("toggle");
            }

            if (!$("#dataWindow .data-background-colour-options .sys-bg-white").hasClass("active")) {
                $("#dataWindow .data-background-colour-options .sys-bg-white").button("toggle");
            }

            $("#dataWindow .data-section-pane-2").fadeOut(50, function () {
                $("#dataWindow .data-section-pane-1").fadeIn(50);
            });
            $(".text-colour-weight-options").show();
            $("#fieldStylingOptions").hide();
            $(".typeahead-fields").val('');
            $(".typeahead-link-fields").val('');
            $(".typeahead-entry-fields").val('');
            $("#dataWindow .icon-field-container").scrollTop(0);
            $("#addDataWidgetButton").addClass("disabled");
            $(".icon-field-container .icon-option.active").removeClass("active");
            $("#addDataWidgetButton").prop("disabled", true);
            SYSPRO_VB.dataWindowFieldsList[0].resetDdMenu();
            $("#dataWindow .fieldsPanelBar").scrollTop(0);
            //SYSPRO_VB.dataWindowlinksPanelBar.collapse($("#links-fields-list-data-window li:first-child"), false);
            //SYSPRO_VB.dataWindowEntryFieldsPanelBar.collapse($("#entry-fields-list-data-window li:first-child"), false);
            //SYSPRO_VB.dataWindowPanelBar.collapse($("#initial-fields-list-data-window li"));
        },

        //data Edit Window open function
        dataEditWindowOpen: function () {
            SYSPRO_VB.openWindow = 'dataEditWindow';
            $('body').addClass('window-open');
            $("#dataEditWindow input").each(function (index) {
                if ($(this).prop("checked")) {
                    $(this).parent("label").addClass("active");
                } else {
                    $(this).parent("label").removeClass("active");
                }
            });

            if ($("#initial-fields-list-data-edit-window .list-group .list-group-item.active")) {

                var currentItem = $("#initial-fields-list-data-edit-window .list-group .list-group-item.active");
                currentItem.addClass("active");
                SYSPRO_VB.dataEditWindowFieldsList[0].resetDdMenu();
                SYSPRO_VB.dataEditWindowFieldsList[0].drillto(currentItem.closest(".dd-parent").parent().closest(".dd-parent"));
                SYSPRO_VB.dataEditWindowFieldsList[0].drillto(currentItem.closest(".dd-parent"));
                setTimeout(function () {
                    $("#initial-fields-list-data-edit-window").scrollTop($("#initial-fields-list-data-edit-window .list-group-item.active").position().top - 140);
                }, 300);


                /*
SYSPRO_VB.editDataWindowPanelBar.collapse($("li"));
	            SYSPRO_VB.editDataWindowPanelBar.clearSelection();
	            SYSPRO_VB.editDataWindowPanelBar.expand($("#initial-fields-list-data-edit-window .list-group .list-group-item.active").parents("li"));
*/
            }

            SYSPRO_VB.column_num = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]').parents(".main-column").data("column");

            SYSPRO_VB.widget_index = $('div[data-column="' + SYSPRO_VB.column_num + '"] .draggable-row-section').index($('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]'));

            SYSPRO_VB.section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] div[data-row="' + SYSPRO_VB.row_num + '"] div[data-section="' + SYSPRO_VB.section_num + '"]');

            var targetLayoutWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid),
	        	targetLayoutWidgetDisplayStyle = targetLayoutWidget.DisplayStyle;

            if (targetLayoutWidgetDisplayStyle == 0 || targetLayoutWidgetDisplayStyle == 2) {
                var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] div[data-row="' + SYSPRO_VB.row_num + '"] div[data-section="' + SYSPRO_VB.section_num + '"]');
                SYSPRO_VB.hideShowDataWidgetOptions(false, false, true, false, false, true, false, false, true, true, true, false, true, true, false, false);

            } else if (targetLayoutWidgetDisplayStyle == 1) {
                var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] tr[data-row="0"]');
                SYSPRO_VB.hideShowDataWidgetOptions(false, false, true, false, false, true, false, false, false, false, false, false, false, true, false, false);
            } else if (targetLayoutWidgetDisplayStyle == 3) {
                var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] a[data-row="0"]');
                SYSPRO_VB.hideShowDataWidgetOptions(false, false, false, true, false, false, false, false, false, false, false, true, false, false, true, false);
            } else if (targetLayoutWidgetDisplayStyle == 5) {
                var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] a[data-row="0"]');
                SYSPRO_VB.hideShowDataWidgetOptions(false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, true);
            }

            $(".links-fields-list-data-edit-window .list-group-item").on("click", function (event) {
                $("#dataEditWindow  #linklist_link_text").val($(this).data("description"));
            });

            if (targetLayoutWidget.SubType === "Joined") {
                $("#dataEditWindow .fieldBackgroundColorOption").hide();
            } else {
                $("#dataEditWindow .fieldBackgroundColorOption").show();
            }

            $("#dataEditWindow .btn-primary").off().on('click', function () {
                //Rob: Now always do a get instead of getByUid so we can use our own Id.
                var targetParentWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid),
	            	targetDataWidgetRowNum = SYSPRO_VB.currentDataWidgetHTML.data("row");

                console.log(SYSPRO_VB.currentDataWidget);
                console.log(SYSPRO_VB.stringifyJSONObject(SYSPRO_VB.currentDataWidgetUid));

                sysproInterop.getHtmlFromModel(
					"Widget",
					SYSPRO_VB.stringifyJSONObject(SYSPRO_VB.currentDataWidgetUid),
					function (result) {
					    var newDataWidgetHTMLjQuery = $($.trim(result));

					    if (targetParentWidget.DisplayStyle == 0 || targetParentWidget.DisplayStyle == 2) {

					        SYSPRO_VB.currentDataWidgetHTML.replaceWith(newDataWidgetHTMLjQuery);
					        SYSPRO_VB.initAddDataWidgets();

					    } else {

					        newDataWidgetHTMLjQuery.attr("data-row", targetDataWidgetRowNum);
					        newDataWidgetHTMLjQuery.data("row", targetDataWidgetRowNum);
					        SYSPRO_VB.currentDataWidgetHTML.replaceWith(newDataWidgetHTMLjQuery);

					    }

					    kendo.bind($("#dataEditWindow"), viewModel);
					    sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', newDataWidgetHTMLjQuery.parents(".draggable-row-section"));

					    SYSPRO_VB.initAddDataWidgets();
					    SYSPRO_VB.initDataWidgetSorting();
					    SYSPRO_VB.finishAddLayoutWidget();

					},
					targetParentWidget.SubType,
					targetParentWidget.DisplayStyle,
					targetParentWidget.Border,
					SYSPRO_VB.section_num);

                $("#dataEditWindow").data("kendoWindow").close();

                SYSPRO_VB.save();

            });

            $("#dataEditWindow .btn-default").off().on('click', function (e) {

                for (var datakey in SYSPRO_VB.tempDataWidgetJSON) {
                    SYSPRO_VB.currentDataWidget.set(datakey, SYSPRO_VB.tempDataWidgetJSON[datakey]);
                }

                SYSPRO_VB.dataEditWindow.close();
            });
        },

        //data Edit Window close function
        dataEditWindowClose: function () {
            SYSPRO_VB.openWindow = null;
            SYSPRO_VB.currentDataWidget = null;
            $('body').removeClass('window-open');
            $(".typeahead-fields").val('');
            $(".typeahead-link-fields").val('');
            $(".typeahead-entry-fields").val('');
            $("#dataEditWindow .data-section-pane-2").fadeOut(50, function () {
                $("#dataEditWindow .data-section-pane-1").fadeIn(50);
            });
            SYSPRO_VB.dataEditWindowFieldsList[0].resetDdMenu();
            $("#dataEditWindow .fieldsPanelBar").scrollTop(0);
            /*
SYSPRO_VB.editDataWindowlinksPanelBar.collapse($("#links-fields-list-data-edit-window li:first-child"), false);
			SYSPRO_VB.editDataWindowEntryFieldsPanelBar.collapse($("#entry-fields-list-data-edit-window li:first-child"), false);
			SYSPRO_VB.editDataWindowPanelBar.collapse($("#initial-fields-list-data-edit-window li"));
*/
        },

        // Tile window open function
        tileWindowOpen: function () {

            SYSPRO_VB.openWindow = 'tileWindow';
            $('body').addClass('window-open');
            /* 		kendo.bind($("#tileWindow"), viewModel); */
            $('#addTileButtonPopoverWrap').popover({
                html: false,
                trigger: "hover",
                placement: 'top',
                delay: { "show": 100, "hide": 100 },
                content: "Select and configure a tile to proceed"
            });

            $("#tileWindow input").each(function (index) {
                if ($(this).prop("checked")) {
                    $(this).parent("label").addClass("active");
                } else {
                    $(this).parent("label").removeClass("active");
                }
            });

            var column_num = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]').parents(".main-column").data("column"),
	        	widget_index = $('div[data-column="' + column_num + '"] .draggable-row-section').index($('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]')),
				targetLayoutWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid),
				section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] a[data-row="0"]');

            $("#tiles-list").on("click", ".list-group-item.field-name", function () {
                var tileName = $(this).data("tile-name"),
					tileParameters = SYSPRO_VB.tilesJSON[tileName];
                $("#tiles-list li.active").removeClass("active");
                $(this).addClass("active");
                $(".tile-parameter-wrapper").hide();
                $("#tileWindow ." + tileName + "Parameters").show();

                $("#addTileButton").removeClass("disabled");
                $("#addTileButton").prop("disabled", false);
                $('#addTileButtonPopoverWrap').popover("destroy");
            });


            $("#tileWindow .btn-primary").off().on('click', function () {
                console.log('put up the screen on this element:');
                console.log($('.layout-widget[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]'));
                $('.layout-widget[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]').find('.tile-loading-cover').show(100, function () {

                    var tileWidth = $("#tileWindow input[name='tile_width']:checked").val(),
						tileName = $("#tileWindow #tiles-list .list-group-item.active").data("tile-name"),
						enteredTileParameters = {},
						tileParameters = SYSPRO_VB.tilesJSON[tileName];
                    if (tileParameters !== undefined && tileParameters.hasOwnProperty('Parameter')) {
                        if (tileParameters.Parameter.length) {
                            for (var tp = 0; tp < tileParameters.Parameter.length; tp++) {
                                if (tileParameters.Parameter[tp].ParamType == "A") {
                                    enteredTileParameters[tileParameters.Parameter[tp].ParamName] = $("#tiles-parameters-wrapper ." + tileName + "Parameters input[name='" + tileParameters.Parameter[tp].ParamName + "']").val();
                                } else if (tileParameters.Parameter[tp].ParamType == "L") {
                                    enteredTileParameters[tileParameters.Parameter[tp].ParamName] = $("#tiles-parameters-wrapper ." + tileName + "Parameters select[name='" + tileParameters.Parameter[tp].ParamName + "']").val();
                                }
                            }
                        } else {
                            if (tileParameters.Parameter.ParamType == "A") {
                                enteredTileParameters[tileParameters.Parameter.ParamName] = $("#tiles-parameters-wrapper ." + tileName + "Parameters input[name='" + tileParameters.Parameter.ParamName + "']").val();
                            } else if (tileParameters.Parameter.ParamType == "L") {
                                enteredTileParameters[tileParameters.Parameter.ParamName] = $("#tiles-parameters-wrapper ." + tileName + "Parameters select[name='" + tileParameters.Parameter.ParamName + "']").val();
                            }
                        }
                    }

                    var tileType = $("#tileWindow #tiles-list .list-group-item.active").data("tile-type"),
						parentFieldPath = $("#tileWindow #tiles-list .list-group-item.active").data("tile-keyfield"),
						Id1 = sysproInterop.generateUUID(),
						Id2 = sysproInterop.generateUUID(),
						newTileWidget = new dataWidgetModel({
						    "Id": Id1,
						    "Title": tileName,
						    "FieldName": "",
						    "FieldPath": "",
						    "HasSmartTag": false,
						    "DataType": "A",
						    "KeyField": parentFieldPath,
						    "KeyAction": undefined,
						    "parentFieldPath": parentFieldPath,
						    "TypeName": "Tile",
						    "SubType": "Tile",
						    "TileParameters": enteredTileParameters,
						    "TileWidth": tileWidth,
						    "TileTypeDetail": tileName,
						    "TileType": tileType,
						    "Caption": { Color: 8, Size: 0 },

						    "HTMLContent": function () {
						        var uid = sysproInterop.generateUUID();
						        sysproInterop.getHtmlFromModel("Widget", newTileWidget.toJSON(), function (result) {
						            var cardHTMLObjectjQuery = $($.trim(result));
						            $("#async_" + uid).html($.trim(result));
						            //sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true);
						            //sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]'));
						            //sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', $("#async_" + uid));
						            kendo.bind($("#async_" + uid), viewModel);
						        },
                                    '', '', '',
                                    function (error) {
                                        console.log(error)

                                    });
						        return "<div id='async_" + uid + "'> </div>";
						    }

						});

                    if (targetLayoutWidget.children.at(0).hasOwnProperty("Columns")) {
                        var columnIndex = targetLayoutWidget.children.at(0).Columns.length,
							newColumn = new columnModel({ Id: Id2, index: columnIndex, ResponsiveStyle: tileWidth });
                        newColumn.append(newTileWidget);
                        targetLayoutWidget.children.at(0).append(newColumn);
                    } else {
                        var newColumn = new columnModel({ Id: Id2, index: 0, ResponsiveStyle: tileWidth });
                        newColumn.append(newTileWidget);
                        targetLayoutWidget.children.at(0).append(newColumn);
                    }


                    SYSPRO_VB.initiateTiles(targetLayoutWidget);
                    SYSPRO_VB.initAddDataWidgets();

                    $("#tileWindow").data("kendoWindow").close();

                    SYSPRO_VB.save();
                });

            });

            $("#tileWindow .btn-default").off().on('click', function (e) {
                SYSPRO_VB.tileWindow.close();
            });
        },

        // tile window close function
        tileWindowClose: function () {
            SYSPRO_VB.openWindow = null;
            $('body').removeClass('window-open');
            $("#tile-list-option").hide();
            $(".tile-parameter-wrapper").hide();
            $("#tileWindow input[type='text']").val("");
            $("#tileWindow .list-group-item.active").removeClass("active");
            //$("#tileWindow .tile_width").prop("checked", false);
            $("#tile-text-option").hide();
            $("#tile_list").html();
            SYSPRO_VB.tilesList[0].resetDdMenu();
            $("#addTileButton").addClass("disabled");
            $("#addTileButton").prop("disabled", true);
            $("#tileWindow .fieldsPanelBar").scrollTop(0);
        },

        // Tile edit window open function
        tileEditWindowOpen: function () {

            SYSPRO_VB.openWindow = 'tileEditWindow';
            $('body').addClass('window-open');
            kendo.bind($("#tileEditWindow"), viewModel);

            /*         SYSPRO_VB.save(); */

            $("#tileEditWindow input").each(function (index) {
                if ($(this).prop("checked")) {
                    $(this).parent("label").addClass("active");
                } else {
                    $(this).parent("label").removeClass("active");
                }
            });

            if ($("#tiles-edit-list .list-group .list-group-item.active")) {

                var currentItem = $("#tiles-edit-list .list-group .list-group-item.active");
                currentItem.addClass("active");
                SYSPRO_VB.tilesEditList[0].resetDdMenu();
                SYSPRO_VB.tilesEditList[0].drillto(currentItem.closest(".dd-parent").parent().closest(".dd-parent"));
                SYSPRO_VB.tilesEditList[0].drillto(currentItem.closest(".dd-parent"));
                setTimeout(function () {
                    $("#tiles-edit-list").scrollTop($("#tiles-edit-list .list-group-item.active").position().top - 140);
                }, 300);
                /*
SYSPRO_VB.tilesEditPanelBar.collapse($("li"));
	            SYSPRO_VB.tilesEditPanelBar.clearSelection();
	            SYSPRO_VB.tilesEditPanelBar.expand($("#tiles-edit-list .list-group .list-group-item.active").parents("li"));
*/
            }

            showTileParameters($("#tiles-edit-list .list-group-item.active").data("tile-name"));

            var column_num = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]').parents(".main-column").data("column"),
	        	widget_index = $('div[data-column="' + column_num + '"] .draggable-row-section').index($('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]')),
				targetLayoutWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid),
				section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] a[data-row="0"]');

            $("#tiles-list").on("click", ".list-group-item", function () {
                showTileParameters($(this).data("tile-name"));
            });

            function showTileParameters(tileName) {
                var tileParameters = SYSPRO_VB.tilesJSON[tileName];
                $(".tile-parameter-wrapper").hide();
                $("#tileEditWindow ." + tileName + "Parameters").show();
            }

            $("#tileEditWindow .btn-primary").off().on('click', function () {

                SYSPRO_VB.initiateTiles(targetLayoutWidget);
                SYSPRO_VB.initAddDataWidgets();
                SYSPRO_VB.tileEditWindow.close();
                SYSPRO_VB.save();

            });

            $("#tileEditWindow .btn-default").off().on('click', function (e) {

                for (var datakey in SYSPRO_VB.tempDataWidgetJSON) {
                    SYSPRO_VB.currentDataWidget.Widgets[0].set(datakey, SYSPRO_VB.tempDataWidgetJSON[datakey]);
                }

                SYSPRO_VB.initiateTiles(targetLayoutWidget);
                SYSPRO_VB.initAddDataWidgets();
                SYSPRO_VB.tileEditWindow.close();
            });
        },

        // tile window close function
        tileEditWindowClose: function () {
            SYSPRO_VB.openWindow = null;
            $('body').removeClass('window-open');
            SYSPRO_VB.tilesEditList[0].resetDdMenu();
            $("#tileEditWindow .fieldsPanelBar").scrollTop(0);
        },

        // Kendo Window version of data widget 
        toolbarWindowOpen: function () {

            SYSPRO_VB.openWindow = 'toolbarWindow';
            $('body').addClass('window-open');
            $('#addToolbarWidgetButtonPopoverWrap').popover({
                html: false,
                trigger: "hover",
                placement: 'top',
                delay: { "show": 100, "hide": 100 },
                content: "Select and configure a toolbar widget to proceed"
            });

            if (SYSPRO_VB.parentToolbarWidget) {
                $("#ToolbarDropdown").hide();
            } else {
                $("#ToolbarDropdown").show();
            }

            $("#toolbar-widgets-list.fieldsPanelBar .list-group-item").on("click", function (event) {
                $("#toolbar-widgets-list.fieldsPanelBar .list-group-item.active").removeClass("active");
                $(this).addClass("active");
                $("#toolbarWindow #toolbar_item_text").val($(this).data("caption"));
                $(".toolbar-text-option").show();
                $(".toolbar-icon-option").show();
                $("#toolbarWindowIconList label.active").removeClass("active");
                if ($(this).data("toolbar-icon")) {

                    var activeIcon = $("#toolbarWindowIconList label[data-icon-name='" + $(this).data("toolbar-icon") + "']");
                    activeIcon.addClass("active");
                    setTimeout(
		            	function () { $(".toolbar-icon-option .icon-field-container").scrollTop($(".toolbar-icon-option .icon-field-container").scrollTop() + activeIcon.position().top - 193) },
		            	200
		            );
                }
                /*
	if ( $(this).data("field-name") === "ToolbarDropdown" ) {
		            $(".toolbar-text-option").show();
	            } else {
		            $(".toolbar-text-option").hide();
	            }
	*/
                $("#toolbar-widget-parameters-wrapper").show();
                $("#addToolbarWidgetButton").removeClass("disabled");
                $("#addToolbarWidgetButton").prop("disabled", false);
                $('#addToolbarWidgetButtonPopoverWrap').popover("destroy");
            });


            $("#toolbarWindow .btn-primary").off().on('click', function () {

                var TextColour, TextWeight, TextAlign, IconOption, IconColour, IconAlign, IconVisibility, TypeName;

                if (document.querySelector('#toolbarWindow input[name="data_text_colour"]:checked') !== null) {
                    TextColour = document.querySelector('#toolbarWindow input[name="data_text_colour"]:checked').value;
                }
                if (document.querySelector('#toolbarWindow input[name="data_text_weight"]:checked') !== null) {
                    TextWeight = document.querySelector('#toolbarWindow input[name="data_text_weight"]:checked').value;
                }
                if (document.querySelector('#toolbarWindow input[name="data_text_alignment"]:checked') !== null) {
                    TextAlign = document.querySelector('#toolbarWindow input[name="data_text_alignment"]:checked').value;
                }
                if (document.querySelector('#toolbarWindow .icon-field-container .icon-option.active') !== null) {
                    IconOption = $('#toolbarWindow .icon-field-container .icon-option.active').data("icon-name");
                }
                if (document.querySelector('#toolbarWindow input[name="toolbar_icon_colour"]:checked') !== null) {
                    IconColour = document.querySelector('#toolbarWindow input[name="toolbar_icon_colour"]:checked').value;
                }
                if (document.querySelector('#toolbarWindow input[name="toolbar_icon_alignment"]:checked') !== null) {
                    IconAlign = document.querySelector('#toolbarWindow input[name="toolbar_icon_alignment"]:checked').value;
                }

                var toolbarWidgetClone = $("#toolbarWindow #toolbar-widgets-list .list-group-item.active.field-name").clone();
                toolbarWidgetClone.find("i").remove();
                var FieldName = toolbarWidgetClone.data("field-name"),
		        	Tooltip = toolbarWidgetClone.data("toolbar-tooltip"),
					ToolbarWidgetType = toolbarWidgetClone.data("toolbar-widget-type"),
					Caption = $("#toolbarWindow #toolbar_item_text").val();
                //$("#toolbarWindow #toolbar_item_text").val() ? Caption = $("#toolbarWindow #toolbar_item_text").val() : Caption = toolbarWidgetClone.data("caption");;

                IconOption === undefined ? IconVisibility = false : IconVisibility = true;
                FieldName === "ToolbarDropdown" ? TypeName = "ToolbarDropdown" : TypeName = "ToolbarWidget";

                var KendoToolbarWidget = new toolbarWidgetModel({ Id: sysproInterop.generateUUID(), Title: Caption, FieldName: FieldName, TypeName: TypeName, ToolbarWidgetType: ToolbarWidgetType, Icon: { Name: IconOption, Color: IconColour, Alignment: IconAlign, Visibility: IconVisibility }, Tooltip: Tooltip });

                if (SYSPRO_VB.parentToolbarWidget) {
                    SYSPRO_VB.parentToolbarWidget.append(KendoToolbarWidget)
                } else {
                    viewModel.toolbar.at(SYSPRO_VB.toolbar_column_num).append(KendoToolbarWidget);
                }

                sysproInterop.getHtmlFromModel(
					TypeName,
					KendoToolbarWidget.toJSON(),
					function (result) {
					    var newToolbarWidgetHTMLjQuery = $($.trim(result));
					    if (SYSPRO_VB.parentToolbarWidgetHTML) {
					        SYSPRO_VB.parentToolbarWidgetHTML.find(".dropdown-menu").append(newToolbarWidgetHTMLjQuery);
					    } else {
					        console.log("it is a normal toolbar widget!");
					        $("#navbar-toolbar ul.nav[data-column='" + SYSPRO_VB.toolbar_column_num + "']").append(newToolbarWidgetHTMLjQuery);
					    }

					    sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', $('#navbar-toolbar'));

					    $.material.init();
					    SYSPRO_VB.initAddToolbarWidgets();
					    $('[data-tooltip="tooltip"]').tooltip();
					    SYSPRO_VB.initToolbarSorting();

					    SYSPRO_VB.save();

					    SYSPRO_VB.toolbarWindow.close();

					},
					'', '', '', '',
					function (error) {
					    console.log(error);
					    SYSPRO_VB.toolbarWindow.close();
					}
				);



            });

            $("#toolbarWindow .btn-default").off().on('click', function (e) {
                SYSPRO_VB.toolbarWindow.close();
            });
        },

        // data widget window close function
        toolbarWindowClose: function () {
            SYSPRO_VB.openWindow = null;
            SYSPRO_VB.parentToolbarWidgetUid = null;
            SYSPRO_VB.parentToolbarWidget = null;
            SYSPRO_VB.parentToolbarWidgetHTML = null;
            $('body').removeClass('window-open');
            if (!$("#toolbarWindow .data-text-colour-options .sys-bg-inverse").hasClass("active")) {
                $("#toolbarWindow .data-text-colour-options .sys-bg-inverse").button("toggle");
            }
            $(".toolbar-text-option").val("");
            $("#toolbarWindow .active").removeClass("active");
            $("#toolbarWindow input[name='data-fields-radios']:checked").prop("checked", false);

            $("#toolbarWindow .hide-on-close").hide();
            $("#toolbarWindow .data-section-pane-2").fadeOut(50, function () {
                $("#toolbarWindow .data-section-pane-1").fadeIn(50);
            });
            $("#toolbarWindow .icon-field-container").scrollTop(0);
            $("#addToolbarWidgetButton").addClass("disabled");
            $("#addToolbarWidgetButton").prop("disabled", true);
            $(".toolbar-icon-option .icon-field-container").scrollTop(0);
        },

        // toolbar Edit Window open function
        toolbarEditWindowOpen: function () {
            kendo.bind($("#toolbarEditWindow"), viewModel);
            $('body').addClass('window-open');
            SYSPRO_VB.openWindow = 'toolbarEditWindow';
            $("#toolbarEditWindow input").each(function (index) {
                if ($(this).prop("checked")) {
                    $(this).parent("label").addClass("active");
                } else {
                    $(this).parent("label").removeClass("active");
                }
            });

            if (SYSPRO_VB.currentToolbarWidget.Icon.Name) {

                var activeIcon = $("#toolbarEditWindowIconList label[data-icon-name='" + SYSPRO_VB.currentToolbarWidget.Icon.Name + "']");
                activeIcon.addClass("active");
                setTimeout(
	            	function () { $(".toolbar-icon-option .icon-field-container").scrollTop($(".toolbar-icon-option .icon-field-container").scrollTop() + activeIcon.position().top - 193) },
	            	300
	            );
            }

            $("#edit-toolbar-widgets-list.fieldsPanelBar .list-group-item").on("click", function (event) {
                $("#toolbarEditWindow #toolbar_item_text").val($(this).data("caption"));
                $(".toolbar-text-option").show();
                $(".toolbar-icon-option").show();
                $("#toolbarWindowIconList label.active").removeClass("active");
                if ($(this).data("toolbar-icon")) {

                    var activeIcon = $("#toolbarEditWindowIconList label[data-icon-name='" + $(this).data("toolbar-icon") + "']");
                    activeIcon.addClass("active");
                    setTimeout(
		            	function () { $(".toolbar-icon-option .icon-field-container").scrollTop($(".toolbar-icon-option .icon-field-container").scrollTop() + activeIcon.position().top - 193) },
		            	300
		            );
                }

            });


            var getHTMLMethod;
            SYSPRO_VB.currentToolbarWidget.FieldName === "ToolbarDropdown" ? getHTMLMethod = "ToolbarDropdown" : getHTMLMethod = "ToolbarWidget";

            $("#toolbarEditWindow .btn-primary").off().on('click', function () {

                sysproInterop.getHtmlFromModel(
					getHTMLMethod,
					SYSPRO_VB.currentToolbarWidget.toJSON(),
					function (result) {
					    var newToolbarWidgetHTMLjQuery = $($.trim(result));

					    console.log(newDataWidgetHTMLjQuery.html());

					    SYSPRO_VB.currentToolbarWidgetHTML.replaceWith(newToolbarWidgetHTMLjQuery);

					    SYSPRO_VB.initAddDataWidgets();

					    sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', $('#navbar-toolbar'));

					    SYSPRO_VB.initDataWidgetSorting();

					    SYSPRO_VB.finishAddLayoutWidget();

					},
					'', '', '', ''
				);

                SYSPRO_VB.toolbarEditWindow.close();

                SYSPRO_VB.save();

            });

            $("#toolbarEditWindow .btn-default").off().on('click', function (e) {

                for (var datakey in SYSPRO_VB.tempToolbarWidgetJSON) {
                    SYSPRO_VB.currentToolbarWidget.set(datakey, SYSPRO_VB.tempToolbarWidgetJSON[datakey]);
                }

                SYSPRO_VB.toolbarEditWindow.close();
            });
        },

        //toolbar Edit Window close function
        toolbarEditWindowClose: function () {
            SYSPRO_VB.openWindow = null;
            $('body').removeClass('window-open');
        },

        // Helper function to control display of data widget option sections
        hideShowDataWidgetOptions: function (tilesAddition, nonTilesAddition, initFields, linksFields, entryFields, typeaheadFields, typeaheadEntryFields, typeaheadLinkFields, fieldBgColour, fieldCaption, textAlign, linkList, iconOption, textColourWeight, expandLinkListPanel, expandEntryFieldPanel) {
            nonTilesAddition ? $("#non-tiles-addition").show() : $("#non-tiles-addition").hide();
            initFields ? $("#initial-fields-list-data-window").show() : $("#initial-fields-list-data-window").hide();
            linksFields ? $("#links-fields-list-data-window").show() : $("#links-fields-list-data-window").hide();
            /*
if ( expandLinkListPanel ) {
		        setTimeout(function() {
			        SYSPRO_VB.dataWindowlinksPanelBar.expand($("#links-fields-list-data-window li:first-child"), false);
			        SYSPRO_VB.editDataWindowlinksPanelBar.expand($("#links-fields-list-data-edit-window li:first-child"), false);
			    }, 200);
	        } else {
		        setTimeout(function() {
			        SYSPRO_VB.dataWindowlinksPanelBar.collapse($("#links-fields-list-data-window li:first-child"), false);
			        SYSPRO_VB.editDataWindowlinksPanelBar.collapse($("#links-fields-list-data-edit-window li:first-child"), false);
			    }, 200);
	        }
			
			if ( expandEntryFieldPanel ) {
				setTimeout(function() {
					//SYSPRO_VB.dataWindowEntryFieldsPanelBar.expand($("#entry-fields-list-data-window li:first-child"), false);
					SYSPRO_VB.editDataWindowEntryFieldsPanelBar.expand($("#entry-fields-list-data-edit-window li:first-child"), false);
					SYSPRO_VB.dataWindowlinksPanelBar.collapse($("#links-fields-list-data-window li:first-child"), false);
					SYSPRO_VB.editDataWindowlinksPanelBar.collapse($("#links-fields-list-data-edit-window li:first-child"), false);
				}, 200);
			} else {
				setTimeout(function() {
					//SYSPRO_VB.dataWindowEntryFieldsPanelBar.collapse($("#entry-fields-list-data-window li:first-child"), false);
					//SYSPRO_VB.editDataWindowEntryFieldsPanelBar.collapse($("#entry-fields-list-data-edit-window li:first-child"), false);
				}, 200);
				
			}
*/

            entryFields ? $("#entry-fields-list-data-window").show() : $("#entry-fields-list-data-window").hide();
            typeaheadFields ? $(".typeahead-fields").show() : $(".typeahead-fields").hide();
            typeaheadEntryFields ? $(".typeahead-entry-fields").show() : $(".typeahead-entry-fields").hide();
            typeaheadLinkFields ? $(".typeahead-link-fields").show() : $(".typeahead-link-fields").hide();
            fieldBgColour ? $("#dataWindow .fieldBackgroundColorOption").show() : $("#dataWindow .fieldBackgroundColorOption").hide();
            fieldCaption ? $(".field-caption-option").show() : $(".field-caption-option").hide();
            textAlign ? $(".text-alignment-options").show() : $(".text-alignment-options").hide();
            textColourWeight ? $(".text-colour-weight-options").show() : $(".text-colour-weight-options").hide();
            linkList ? $(".linklist-text-option").show() : $(".linklist-text-option").hide();
            iconOption ? $(".add-icon-option").show() : $(".add-icon-option").hide();
        },

        // Initialise Edit and remove functions on data widgets
        initEditRemoveDataWidget: function () {

            $(".panel.sys-widget:not(.sys-carousel) .panel.sys-widget .data-widget-options .col-xs-6:last-child i, .panel.sys-widget:not(.sys-carousel) .table td:last-child .data-widget-options i, .panel.sys-widget:not(.sys-carousel) .list-group .data-widget-options .col-xs-6:last-child i, .tile-widget .tile .data-widget-options .col-xs-6:last-child i, .form-group .data-widget-options .col-xs-6:last-child i").popover({
                html: true,
                placement: "left",
                trigger: "manual",
                animation: false,
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
                content: '<ul class="nav nav-pills"><li><a class="edit-section"><i class="material-icons text-primary">edit</i></a></li><li><a class="remove-section"><i class="material-icons text-danger">delete</i></a></li></ul>'
            })
		    .on("click", function () {
		        var _this = this;
		        $(this).popover("show");
		        $(this).siblings(".popover").on("mouseleave", function () {
		            $(_this).popover('hide');
		        });
		    }).on("mouseleave", function () {
		        var _this = this;
		        var some_function = function () {
		            setTimeout(function () {
		                if (!$(".popover:hover").length) {
		                    $(_this).popover("hide")
		                } else {
		                    some_function();
		                }
		            }, 50);
		        };
		        some_function();
		    });

            $(".panel.sys-widget.sys-carousel .panel.sys-widget .data-widget-options .col-xs-6:last-child i").popover({
                html: true,
                placement: "left",
                trigger: "manual",
                animation: false,
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
                content: '<ul class="nav nav-pills"><li><a class="edit-section"><i class="material-icons text-primary">edit</i></a></li><li><a class="remove-section"><i class="material-icons text-danger">delete</i></a></li></ul>'
            })
		    .on("click", function () {
		        var _this = this;
		        $(this).parents(".carousel-inner, .sys-carousel .panel-body").css("overflow", "visible");
		        $(this).popover("show");
		        $(this).siblings(".popover").on("mouseleave", function () {
		            $(_this).popover('hide');
		            $(this).parents(".carousel-inner, .sys-carousel .panel-body").css("overflow", "hidden");
		        });
		    }).on("mouseleave", function () {
		        var _this = this;
		        var some_function = function () {
		            setTimeout(function () {
		                if (!$(".popover:hover").length) {
		                    $(_this).popover("hide");
		                    $(this).parents(".carousel-inner, .sys-carousel .panel-body").css("overflow", "hidden");
		                } else {
		                    some_function();
		                }
		            }, 50);
		        };
		        some_function();
		    });

        },

        // Initialise add data widget actions
        initAddDataWidgets: function () {
            //sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true);
            $(".add-data-section").off().on("click", function (a) {
                a.preventDefault();
                SYSPRO_VB.row_num = $(this).closest(".row").data("row");
                SYSPRO_VB.layout_widget_guid = $(this).parents(".draggable-row-section").data("guid");
                var targetParentWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid),
					targetParentWidgetDisplayStyle = targetParentWidget.DisplayStyle;
                if (targetParentWidgetDisplayStyle === 4) {
                    console.log(targetParentWidget);
                    viewModel.set("selected", targetParentWidget); //update the viewModel
                    SYSPRO_VB.tileWindow.center().open();
                } else {
                    SYSPRO_VB.section_num = $(this).closest("[data-section]").data("section");
                    SYSPRO_VB.dataWindow.center().open();
                }
            });

            SYSPRO_VB.initEditRemoveDataWidget();
        },

        // Initialise add toolbar widget actions
        initAddToolbarWidgets: function () {
            $(".add-toolbar-section").on("click", function () {
                SYSPRO_VB.toolbar_column_num = $(this).parents(".nav").data("column");
                if ($(this).parents(".dropdown-menu").length) {
                    console.log($(this).parents(".dropwdown-menu"));
                    SYSPRO_VB.parentToolbarWidgetHTML = $(this).parents("li.dropdown");
                    SYSPRO_VB.parentToolbarWidgetUid = SYSPRO_VB.parentToolbarWidgetHTML.data("guid");
                    SYSPRO_VB.parentToolbarWidget = viewModel.toolbar.get(SYSPRO_VB.parentToolbarWidgetUid);
                }
                SYSPRO_VB.toolbarWindow.center().open();
            });

            SYSPRO_VB.initEditRemoveToolbarWidgets();
        },

        // Initialise Edit and remove functions on toolbar widgets
        initEditRemoveToolbarWidgets: function () {

            $(".toolbar-widget-options .col-xs-6:last-child i").popover({
                html: true,
                placement: "left",
                trigger: "manual",
                animation: false,
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
                content: '<ul class="nav nav-pills"><li><a class="edit-toolbar-widget"><i class="material-icons text-primary">edit</i></a></li><li><a class="remove-toolbar-widget"><i class="material-icons text-danger">delete</i></a></li></ul>'
            })
		    .on("click", function () {
		        var _this = this;
		        $(this).popover("show");
		        $(this).siblings(".popover").on("mouseleave", function () {
		            $(_this).popover('hide');
		        });
		    }).on("mouseleave", function () {
		        var _this = this;
		        var some_function = function () {
		            setTimeout(function () {
		                if (!$(".popover:hover").length) {
		                    $(_this).popover("hide");
		                } else {
		                    some_function();
		                }
		            }, 50);
		        };
		        some_function();
		    });
        },

        // Runs when a layout widget ends being dragged, but complete process is not finished yet
        endDragWidget: function (widget) {
            //Rob: Now always do a get instead of getByUid so we can use our own Id.
            SYSPRO_VB.currentDraggedWidget = viewModel.dataSource.get($(widget.item).data("guid"));
            var endParentColumn = widget.item.parents(".main-column").data("column");
            if (widget.action === 'remove') {
                if (widget.item.hasClass("quickAddWidget")) {
                    SYSPRO_VB.endQuickDragWidget(widget);

                } else {
                    var VBdata = viewModel.dataSource.data().toJSON();
                    SYSPRO_VB.draggedLayoutWidgetCopy = VBdata[endParentColumn].Widgets[widget.oldIndex];
                    viewModel.dataSource.remove(SYSPRO_VB.currentDraggedWidget);
                }
            } else if (widget.action === "receive") {

                if (widget.item.hasClass("quickAddWidget")) {
                    console.log('ParentFieldPath');
                    var widgetType = widget.item.attr("id"),
	                	Type = widget.item.data("layout-widget-type"),
						SubType = widget.item.data("layout-widget-subtype"),
						DisplayStyle = widget.item.data("layout-widget-displaystyle"),
						CardTypeDetail = widget.item.data("card-type-detail"),
						ParentFieldPath = widget.item.data("parent-field-path");

                    SYSPRO_VB.rowWindowOpen();
                    $('body').removeClass('window-open');

                    var newLayoutWidget = SYSPRO_VB.setupFinalLayoutWidget("", widgetType, "", Type, SubType, false, DisplayStyle, 0, 9, 8, "Joined", "", "", "", CardTypeDetail, ParentFieldPath, 0, 9, 0, 9, "");
                    //Rob: Use the Id instead of uid
                    var GUID = newLayoutWidget.Id;

                    viewModel.dataSource.at(SYSPRO_VB.column_num).children.insert(widget.newIndex, newLayoutWidget);

                    sysproInterop.getHtmlFromModel("Widget", SYSPRO_VB.stringifyJSONObject(GUID), function (result) {

                        var newWidgetHTMLjQuery = $($.trim(result));

                        if (DisplayStyle === 4) {
                            newWidgetHTMLjQuery.find(".data-section").removeClass("data-section");
                            newWidgetHTMLjQuery.children('.col-sm-12').addClass('tile-widget-wrapper');
                            newWidgetHTMLjQuery.find('.panel-body').first().prepend('<div class="tile-loading-cover"><div class="loader"><div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div></div>');
                        }

                        if (widget.newIndex === 0) {
                            $("#main_column_" + SYSPRO_VB.column_num + " .sortable-list").prepend(newWidgetHTMLjQuery);
                            console.log(widget.newIndex);
                            console.log(newWidgetHTMLjQuery);
                            console.log(newWidgetHTMLjQuery.html());
                        } else {
                            newWidgetHTMLjQuery.insertAfter("#main_column_" + SYSPRO_VB.column_num + " .sortable-list .draggable-row-section:nth-child(" + widget.newIndex + ")");
                        }

                        SYSPRO_VB.finishAddLayoutWidget();

                        SYSPRO_VB.initAddDataWidgets();

                        SYSPRO_VB.save();

                    });

                    widget.preventDefault();

                }
            } else if (widget.action === "sort") {

                if (!widget.item.hasClass("quickAddWidget")) {
                    var VBdata = viewModel.dataSource.data().toJSON();
                    SYSPRO_VB.draggedLayoutWidgetCopy = VBdata[endParentColumn].Widgets[widget.oldIndex];
                    viewModel.dataSource.remove(SYSPRO_VB.currentDraggedWidget);

                    viewModel.dataSource.at(SYSPRO_VB.column_num).children.insert(widget.newIndex, SYSPRO_VB.draggedLayoutWidgetCopy);

                    SYSPRO_VB.save();
                }
            }

        },

        // Runs when a widget starts being dragged
        endQuickDragWidget: function (widget) {
            $(".quick-sortable-list div").each(function () {
                $(this).addClass("draggable");
            });
        },

        // Runs when a layout widget is finished being dragged
        finishDragWidget: function (widget) {
            if (widget.action === 'receive') {
                viewModel.dataSource.at(SYSPRO_VB.column_num).children.insert(widget.newIndex, SYSPRO_VB.draggedLayoutWidgetCopy);
                SYSPRO_VB.save();
            }
        },

        // Runs when a data widget is finished being dragged
        finishDragDataWidget: function (widget) {

            if (widget.action === 'receive') {
                var targetParentWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid);
                if (targetParentWidget.DisplayStyle === 1 || targetParentWidget.DisplayStyle === 3) {

                    SYSPRO_VB.draggedDataWidgetCopy = SYSPRO_VB.draggedDataWidget.toJSON();
                    viewModel.dataSource.remove(SYSPRO_VB.draggedDataWidget);

                    viewModel.dataSource.at(SYSPRO_VB.column_num).children.at(SYSPRO_VB.widget_index).children.at(0).children.at(0).children.insert(widget.newIndex, SYSPRO_VB.draggedDataWidgetTempCopy);
                    SYSPRO_VB.save();

                } else if (targetParentWidget.DisplayStyle === 5) {
                    viewModel.dataSource.at(SYSPRO_VB.column_num).children.at(SYSPRO_VB.widget_index).children.at(0).children.at(SYSPRO_VB.section_num).children.insert(widget.newIndex, SYSPRO_VB.draggedDataWidgetTempCopy);

                } else {
                    viewModel.dataSource.at(SYSPRO_VB.column_num).children.at(SYSPRO_VB.widget_index).children.at(SYSPRO_VB.row_num).children.at(SYSPRO_VB.section_num).append(SYSPRO_VB.draggedDataWidgetTempCopy);

                }

                SYSPRO_VB.save();
            }

        },

        // Runs when a toolbar widget is finished being dragged
        finishDragToolbarWidget: function (widget) {
            if (widget.action === 'receive') {
                //viewModel.toolbar.at(SYSPRO_VB.column_num).append(SYSPRO_VB.draggedToolbarWidgetTempCopy);
                viewModel.toolbar.at(SYSPRO_VB.column_num).Widgets.splice(widget.newIndex, 0, SYSPRO_VB.draggedToolbarWidgetTempCopy)
                SYSPRO_VB.save();
            }
        },

        // Runs when a data widget is finished being dragged
        finishDragEntryDataWidget: function (widget) {
            if (widget.action === 'receive') {

                var targetParentWidgetJSON = SYSPRO_VB.dragTargetParentWidget.toJSON();

                if (targetParentWidgetJSON.Rows[0].Columns[0].hasOwnProperty("Widgets")) {

                    var Row = new rowModel({ Index: (SYSPRO_VB.row_num) });
                    Row.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
                    viewModel.dataSource.at(SYSPRO_VB.column_num).children.at(SYSPRO_VB.widget_index).Rows.splice(SYSPRO_VB.row_num, 0, Row);
                    SYSPRO_VB.dragTargetParentWidget.children.at(SYSPRO_VB.row_num).children.at(0).append(SYSPRO_VB.draggedDataWidgetTempCopy);

                } else {
                    SYSPRO_VB.dragTargetParentWidget.children.at(0).children.at(0).append(SYSPRO_VB.draggedDataWidgetTempCopy);
                }


                SYSPRO_VB.save();
            }

            $("form").each(function () {
                $(this).find(".form-group").each(function (fieldindex) {
                    $(this).data("row", fieldindex);
                    $(this).attr("data-row", fieldindex);
                });
            });

        },

        // Runs when a widget is finished being dragged
        finishQuickDragWidget: function (widget) {
            var widgetType = widget.item.attr("id"),
	        	Type = widget.item.data("layout-widget-type"),
				SubType = widget.item.data("layout-widget-subtype"),
				DisplayStyle = widget.item.data("layout-widget-displaystyle"),
				CardTypeDetail = widget.item.data("card-type-detail");

            SYSPRO_VB.rowWindowOpen();
            $('body').removeClass('window-open');

            var newLayoutWidget = SYSPRO_VB.setupFinalLayoutWidget("", widgetType, "", Type, SubType, false, DisplayStyle, 0, 9, 8, "Joined", "", "", "", CardTypeDetail, ParentFieldPath, 0, 9, 0, 9, "");
            //Rob: Use the Id instead of the uid.
            var GUID = newLayoutWidget.Id,
	        	newWidgetHTML = $(SYSPRO_VB.layoutWidgetHTML[widgetType]);

            newWidgetHTML.data("guid", GUID);
            newWidgetHTML.attr("data-guid", GUID);

            viewModel.dataSource.at(SYSPRO_VB.column_num).children.insert(widget.newIndex, newLayoutWidget);



            return newWidgetHTML;

        },

        // Helper function for drag and drop interactivity
        placeholder: function (element) {
            return element.clone().addClass("placeholderGhost");
        },

        // Helper function for drag and drop interactivity
        quickplaceholder: function (element) {

            var TypeName = element.data("layout-widget-type"),
	        	WidgetName = element.attr("id");
            if (TypeName === "Card") {
                return $(SYSPRO_VB.cardsHTML[WidgetName]).clone().addClass("placeholderGhost");
            } else {
                if (SYSPRO_VB.layoutWidgetHTML[WidgetName]) {
                    return $(SYSPRO_VB.layoutWidgetHTML[WidgetName]).addClass("placeholderGhost");
                } else {
                    return $('<div class="draggable-row-section sortable-item removeable placeholderGhost" data-guid=""><div class="panel sys-widget card-widget sys-bd-off"> <div class="panel-body text-center sys-bg-white"> <div class="sys-avatar"> <img src="img/face/chelsea-128.jpg" alt="" class="img-circle sys-img-80 sys-bd-gray sys-bd-3x"> </div> <h4 class="sys-mg-off sys-pd-t-10">Chelsea Otakan</h4> <small>HR Consultant</small> </div> </div></div>')
                }
            }

        },

        // Helper function for drag and drop interactivity
        hint: function (element) {
            return element.clone().addClass("hint")
		                .height(element.height())
		                .width(element.width() + 25);
        },

        // Helper function for drag and drop interactivity
        quickhint: function (element) {

            var TypeName = element.data("layout-widget-type"),
	        	WidgetName = element.attr("id");

            if (TypeName === "Card") {
                return $(SYSPRO_VB.cardsHTML[WidgetName]).clone().addClass("hint").width($(".main-column").width());
            } else {
                if (SYSPRO_VB.layoutWidgetHTML[WidgetName]) {
                    return $(SYSPRO_VB.layoutWidgetHTML[WidgetName]).addClass("hint").width($(".main-column").width());
                } else {
                    return $('<div class="draggable-row-section sortable-item removeable hint"><div class="panel sys-widget card-widget sys-bd-off"> <div class="panel-body text-center sys-bg-white"> <div class="sys-avatar"> <img src="img/face/chelsea-128.jpg" alt="" class="img-circle sys-img-80 sys-bd-gray sys-bd-3x"> </div> <h4 class="sys-mg-off sys-pd-t-10">Chelsea Otakan</h4> <small>HR Consultant</small> </div> </div></div>').width($(".main-column").width());
                }
            }

        },

        // Helper function for the quick add data widget hint object
        quickHintData: function (element) {
            var captionText = element.clone().children().remove().end().text();
            return '<div class="panel draggable-data-section sys-widget sys-box-shadow-off hint sys-mg-off"><div class="panel-body  text-center widget data-widget sys-bg-white"><span class="data-field-value sys-mg-off sys-txt-md text-left sys-500 sys-fg-inverse">Field Value</span><small class="sys-300 pull-left sys-fg-inverse">' + captionText + '</small></div></div>';
        },

        // Helper function for placeholder for quick add data widgets
        quickPlaceHolderData: function (element) {
            var captionText = element.clone().children().remove().end().text();
            return '<li class="panel draggable-data-section placeholderGhost sys-widget sys-box-shadow-off sys-mg-off quickAddDataWidget"><div class="panel-body  text-center widget data-widget sys-bg-white"><span class="data-field-value sys-mg-off sys-txt-md text-left sys-500 sys-fg-inverse">Field value</span><small class="sys-300 pull-left sys-fg-inverse">' + captionText + '</small></div></li>';
        },

        // Helper functionn to get number of items in a JSON object
        objLength: function (object) {
            var length = 0;
            for (key in object)
                length++;
            return length
        },

        // Return preview Layotu Widget HTML
        previewLayoutWidgetHTML: function (currentRowWindow) {

            SYSPRO_VB.previewLayoutWidget = SYSPRO_VB.setupLayoutWidget(currentRowWindow);

            console.log(SYSPRO_VB.previewLayoutWidget[1]);
            sysproInterop.getHtmlFromModel("Widget", SYSPRO_VB.previewLayoutWidget[1].toJSON(), function (result) {
                console.log(result);
                var previewWidgetHTMLjQuery = $($.trim(result));
                previewWidgetHTMLjQuery.find(".remove-row-section, .edit-row-section, .drag-row-section, .layout-widget-options").remove();
                $(".layout-widget-preview-wrapper").show();
                $(".layout-widget-preview-title").show();
                $(currentRowWindow + " .layout-widget-preview").html(previewWidgetHTMLjQuery);

                sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, currentRowWindow + " .layout-widget-preview");
                SYSPRO_VB.sizeTiles(100, currentRowWindow + " .layout-widget-preview")

                SYSPRO_VB.previewLayoutWidget = null;
            },
		    '', '', '', '',
		    function (error) { console.log(error) }
		    );
        },

        // Regenerate the entire layout from a version of the JSON
        regenerateLayout: function () {

            $("#main-container > .row").html("");
            $("body").attr("data-column-layout", viewModel.columnLayout);
            $("body").data("column-layout", viewModel.columnLayout);

            var i = 0;

            function generateColumn() {
                if (i < viewModel.dataSource.data().length) {

                    var columnJSON = viewModel.dataSource.data()[i].toJSON();

                    sysproInterop.getHtmlFromModel("Column", columnJSON, function (result) {

                        var newColumnHTMLjQuery = $($.trim(result));
                        $("#main-container > .row").append(newColumnHTMLjQuery);

                        SYSPRO_VB.finishAddLayoutWidget();
                        SYSPRO_VB.initiateExistingTiles();
                        SYSPRO_VB.initAddDataWidgets();

                        $(".add-row-section").bind("click", function () {
                            SYSPRO_VB.column_num = $(this).parents(".main-column").data("column");
                            SYSPRO_VB.rowWindow.center().open();
                        });

                        i++;
                        generateColumn();
                        sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true);

                    });
                } else if (i === viewModel.dataSource.data().length) {

                    if (viewModel.dataSource.data().length === 2) {

                        sysproInterop.getHtmlFromModel("Column", SYSPRO_VB.column2Copy, function (result) {

                            var newHiddenColumnHTMLjQuery = $($.trim(result));

                            newHiddenColumnHTMLjQuery.css("display", "none");
                            $("#main-container > .row").append(newHiddenColumnHTMLjQuery);

                            SYSPRO_VB.finishAddLayoutWidget();
                            SYSPRO_VB.initiateExistingTiles();
                            SYSPRO_VB.initAddDataWidgets();

                            $(".add-row-section").bind("click", function () {
                                SYSPRO_VB.column_num = $(this).parents(".main-column").data("column");
                                SYSPRO_VB.rowWindow.center().open();
                            });
                            sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true);

                        });

                    } else if (viewModel.dataSource.data().length === 1) {

                        sysproInterop.getHtmlFromModel("Column", SYSPRO_VB.column1Copy, function (result) {

                            var newHiddenColumnHTMLjQuery = $($.trim(result));

                            newHiddenColumnHTMLjQuery.css("display", "none");
                            $("#main-container > .row").append(newHiddenColumnHTMLjQuery);

                            sysproInterop.getHtmlFromModel("Column", SYSPRO_VB.column2Copy, function (result) {

                                var newHiddenColumnHTMLjQuery = $($.trim(result));

                                newHiddenColumnHTMLjQuery.css("display", "none");
                                $("#main-container > .row").append(newHiddenColumnHTMLjQuery);

                                SYSPRO_VB.finishAddLayoutWidget();
                                SYSPRO_VB.initiateExistingTiles();
                                SYSPRO_VB.initAddDataWidgets();

                                $(".add-row-section").bind("click", function () {
                                    SYSPRO_VB.column_num = $(this).parents(".main-column").data("column");
                                    SYSPRO_VB.rowWindow.center().open();
                                });

                            });

                            sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true);
                        });
                    }
                }
            }

            function generateToolbar() {

                var toolbarJSON = { Columns: null };
                toolbarJSON.Columns = viewModel.toolbar.data().toJSON();

                console.log(toolbarJSON);

                sysproInterop.getHtmlFromModel("Toolbar", toolbarJSON, function (result) {

                    var newToolbarHTMLjQuery = $($.trim(result));
                    $(".navbar-controlbar").replaceWith(newToolbarHTMLjQuery);

                    $.material.init();
                    SYSPRO_VB.finishAddLayoutWidget();
                    SYSPRO_VB.initiateExistingTiles();
                    SYSPRO_VB.initAddDataWidgets();

                    $(".add-toolbar-section").on("click", function () {
                        SYSPRO_VB.toolbar_column_num = $(this).parents(".nav").data("column");
                        SYSPRO_VB.toolbarWindow.center().open();
                    });

                    sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', $("#navbar-toolbar"));

                });
            }

            generateColumn();
            generateToolbar();

        },

        // Set up Layout Widget Windows UI
        setupRowWindow: function (currentRowWindow) {

            $(currentRowWindow + " input").each(function (index) {
                if ($(this).prop("checked")) {
                    $(this).parent("label").addClass("active");
                } else {
                    $(this).parent("label").removeClass("active");
                }
            });

            // Initialise the collapsible title stylings collapsible options section, and hide it initially
            $(currentRowWindow + " #collapsible_title_styles").collapse({
                toggle: false
            });

            SYSPRO_VB.showCorrectBorderOptions($(currentRowWindow + " input[name='blocks_joined']:checked").val(), currentRowWindow);

            // Display correct styling options for the different layout widgets
            $(currentRowWindow + " input[name='row_options']").on("change", function () {

                var General_Type_Element = document.querySelector(currentRowWindow + ' input[name="row_options"]:checked');
                var General_Type = General_Type_Element.getAttribute('data-layout-widget-type');
                var Widget_Type = $(currentRowWindow + " input[name='row_options']:checked").val();
                SYSPRO_VB.changeLayoutOptions(currentRowWindow, Widget_Type, General_Type);

                // If the form is valid, the Validator will return true
                $("#addLayoutWidgetButton").removeClass("disabled");
                $("#addLayoutWidgetButton").prop("disabled", false);
                $('#addLayoutButtonPopoverWrap').popover("destroy");

            });

            $('a#tile_layout_section').on('shown.bs.tab', function (e) {
                $(currentRowWindow + ' #tiles_section').prop('checked', true);
                var General_Type = "LayoutWidget";
                SYSPRO_VB.changeLayoutOptions(currentRowWindow, "tiles_section", "LayoutWidget");
            });

            // Display only relevant border settings
            $(currentRowWindow + " input[name='blocks_joined']").on("change", function (e) {
                SYSPRO_VB.showCorrectBorderOptions($(this).val(), currentRowWindow);
                SYSPRO_VB.previewLayoutWidgetHTML("#rowWindow");

                $("#addLayoutWidgetButton").removeClass("disabled");
                $("#addLayoutWidgetButton").prop("disabled", false);
                $('#addLayoutButtonPopoverWrap').popover("destroy");
            });

            $(currentRowWindow).off().on('change', "input[name='border_options'], input[name='widget_collapsible'], input[name='widget_title_text_colour'], input[name='widget_title_background_colour'], input[name='layout_widget_title'], input[name='listview_striped_rows'], input[name='card_colour'], input[name='chart_colour'], input[name='linklist_compact'], input.tile-row-column-layout, input[name='tile_border_colour'], input[name='separator_colour']", function (e) {

                if ($(currentRowWindow + " #widget_collapsible").prop('checked') === true) {
                    if ($(currentRowWindow + " input[name='layout_widget_title']").val() === '') {
                        $(currentRowWindow + " input[name='layout_widget_title']").val("Default title");
                    }
                }

                SYSPRO_VB.previewLayoutWidgetHTML("#rowWindow");

                $("#addLayoutWidgetButton").removeClass("disabled");
                $("#addLayoutWidgetButton").prop("disabled", false);
                $('#addLayoutButtonPopoverWrap').popover("destroy");
            });


            $(currentRowWindow + " input[name='layout_widget_title']").on('input', function (e) {
                SYSPRO_VB.previewLayoutWidgetHTML("#rowWindow");
            });

            $(currentRowWindow + " #chart-fields-list").on("click", ".list-group-item", function () {
                SYSPRO_VB.previewLayoutWidgetHTML("#rowWindow");
                //$("#charts-colour-options").show();
            });

            $(currentRowWindow + " .icon-field-container").on("click", ".add-icon-option", function () {
                SYSPRO_VB.previewLayoutWidgetHTML("#rowWindow");
            });

            //Clear right panel when changing widget type to insert
            $(currentRowWindow + " a.widget-option-tab").on('show.bs.tab', function (e) {
                $($(e.target).attr("href")).find(".row_options").prop("checked", false);
                $($(e.target).attr("href")).find("label.btn-radio.active").removeClass("active");
                $(currentRowWindow + " .chart-selection-title").hide();
                $(currentRowWindow + " .layout-section-styling-title").hide();
                $(currentRowWindow + " .widget_title_options").hide();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " .tile_section_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + ' input[name="row_options"]:checked').prop('checked', false);
                $(currentRowWindow + ' input[name="row_options"]:checked').parent().removeClass("active");
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop("checked", false);
                $(currentRowWindow + " #widget_collapsible").parent().removeClass("active");
                $(currentRowWindow + " .layout-widget-preview").html("");
                SYSPRO_VB.showCorrectBorderOptions($(currentRowWindow + " input[name='blocks_joined']:checked").val(), currentRowWindow);
            });

        },

        // Set up Layout Widget Windows UI
        setupEditRowWindow: function (currentRowWindow) {

            $(currentRowWindow + " .layout-widget-preview").show();

            // Initialise the collapsible title stylings collapsible options section, and hide it initially
            $(currentRowWindow + " #edit_collapsible_title_styles").collapse({
                toggle: false
            });

            if (document.querySelector(currentRowWindow + ' input[name="widget_collapsible"]:checked') !== null) {
                $(currentRowWindow + " #edit_collapsible_title_styles").collapse("show");
            } else {
                $(currentRowWindow + " #edit_collapsible_title_styles").collapse("hide");
            }

            SYSPRO_VB.showCorrectBorderOptions($(currentRowWindow + " input[name='blocks_joined']:checked").val(), currentRowWindow);

            if (document.querySelector(currentRowWindow + ' input[name="row_options"]:checked') !== null) {
                var Widget_Type = document.querySelector(currentRowWindow + ' input[name="row_options"]:checked').value;
                var General_Type_Element = document.querySelector(currentRowWindow + ' input[name="row_options"]:checked');
                var General_Type = General_Type_Element.getAttribute('data-layout-widget-type');
                SYSPRO_VB.changeLayoutOptions(currentRowWindow, Widget_Type, General_Type);
            }

            // Display only relevant border settings
            $(currentRowWindow + " input[name='blocks_joined']").change(function (e) {
                SYSPRO_VB.showCorrectBorderOptions($(this).val(), currentRowWindow);
                SYSPRO_VB.previewLayoutWidgetHTML(currentRowWindow);
            });

            $(currentRowWindow).off().on('change', "input[name='border_options'], input[name='widget_collapsible'], input[name='widget_title_text_colour'], input[name='widget_title_background_colour'], input[name='layout_widget_title'], input[name='listview_striped_rows'], input[name='card_colour'], input[name='chart_colour'], input[name='linklist_compact'], input.tile-row-column-layout, input[name='tile_border_colour'], input[name='separator_colour']", function (e) {

                SYSPRO_VB.changeLayoutOptions(currentRowWindow, Widget_Type, General_Type);
                if ($(currentRowWindow + " #widget_collapsible").prop('checked') === true) {
                    if ($(currentRowWindow + " input[name='layout_widget_title']").val() === '') {
                        $(currentRowWindow + " input[name='layout_widget_title']").val("Default title");
                    }
                }

                SYSPRO_VB.previewLayoutWidgetHTML(currentRowWindow);

            });

            $(currentRowWindow + " input[name='layout_widget_title']").on('input', function (e) {
                SYSPRO_VB.previewLayoutWidgetHTML(currentRowWindow);
            });

            $(currentRowWindow + " .icon-field-container").on("click", ".add-icon-option", function () {
                SYSPRO_VB.previewLayoutWidgetHTML(currentRowWindow);
            });

            $(currentRowWindow + " #chart-fields-list").on("click", ".list-group-item", function () {
                SYSPRO_VB.previewLayoutWidgetHTML(currentRowWindow);
            });

        },

        // Helper function to chenge visible styling options in the layout widget windows
        changeLayoutOptions: function (currentRowWindow, Widget_Type, General_Type) {

            if (currentRowWindow === "#rowWindow") {
                $(currentRowWindow + " .layout-section-styling-title").show();
            }

            if ((Widget_Type !== "line_chart_widget" && Widget_Type !== "column_chart_widget")) {
                SYSPRO_VB.previewLayoutWidgetHTML(currentRowWindow);
            } else {
                $(currentRowWindow + " #chart-fields-list").show();
                SYSPRO_VB.previewLayoutWidgetHTML(currentRowWindow);
            }

            function hideShowWindowElements(currentRowWindow, tileSection, title, joined, border, listview, linklist, noborders, card, chart, separator) {
                tileSection ? $(currentRowWindow + " .tile_section_options").show() : $(currentRowWindow + " .tile_section_options").hide();
                title ? $(currentRowWindow + " .widget_title_options").show() : $(currentRowWindow + " .widget_title_options").hide();
                joined ? $(currentRowWindow + " .widget_joined_options").show() : $(currentRowWindow + " .widget_joined_options").hide();
                border ? $(currentRowWindow + " .widget_border_options").show() : $(currentRowWindow + " .widget_border_options").hide();
                listview ? $(currentRowWindow + " .widget_listview_options").show() : $(currentRowWindow + " .widget_listview_options").hide();
                linklist ? $(currentRowWindow + " .widget_linklist_options").show() : $(currentRowWindow + " .widget_linklist_options").hide();
                noborders ? $(currentRowWindow + " #no_borders").show() : $(currentRowWindow + " #no_borders").hide();
                card ? $(currentRowWindow + " .widget_card_options").show() : $(currentRowWindow + " .widget_card_options").hide();
                chart ? $(currentRowWindow + " .chart-selection-title").show() : $(currentRowWindow + " .chart-selection-title").hide();
                chart ? $(currentRowWindow + " .widget_chart_options").show() : $(currentRowWindow + " .widget_chart_options").hide();
                separator ? $(currentRowWindow + " .widget_separator_options").show() : $(currentRowWindow + " .widget_separator_options").hide();
                //$(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                //$(currentRowWindow + " #widget_collapsible").prop('checked', false);
                //$(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
            }

            if (Widget_Type === "row_1_col") {
                if (currentRowWindow === "#rowWindow") {
                    $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
                }
                hideShowWindowElements(currentRowWindow, false, true, false, true, false, false, true, false, false, false);

            } else if (Widget_Type === "row_2_col" || Widget_Type === "row_3_col" || Widget_Type === "row_4_col" || Widget_Type === "row_4_block" || Widget_Type === "row_6_block") {
                if (currentRowWindow === "#rowWindow") {
                    $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
                }
                hideShowWindowElements(currentRowWindow, false, true, true, true, false, false, true, false, false, false);
            } else if (Widget_Type === "row_list_view") {
                if (currentRowWindow === "#rowWindow") {
                    $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
                } else {
                    if (viewModel.selected.SubType === true) {
                        viewModel.set("selected.SubType", "Striped");
                    }
                }
                hideShowWindowElements(currentRowWindow, false, true, false, true, true, false, false, false, false, false);
                $(currentRowWindow + " #all_borders").show();
                $(currentRowWindow + " #inner_borders").show();
                $(currentRowWindow + " #outer_borders").show();
            } else if (Widget_Type === "row_link_list") {
                if (currentRowWindow === "#rowWindow") {
                    $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
                } else {
                    if (viewModel.selected.SubType === true) {
                        viewModel.set("selected.SubType", "Compact");
                    }
                }
                hideShowWindowElements(currentRowWindow, false, true, false, true, false, true, true, false, false, false);
            } else if (General_Type === "Card") {
                if (currentRowWindow === "#rowWindow") {
                    $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
                }
                hideShowWindowElements(currentRowWindow, false, false, false, false, false, false, true, true, false, false);
            } else if (General_Type === "HarmonyWidget") {

                hideShowWindowElements(currentRowWindow, false, false, false, false, false, false, false, false, false, false);
            } else if (General_Type === "Sparkline") {
                if (currentRowWindow === "#rowWindow") {
                    $(currentRowWindow + " .layout-section-styling-title .step-number").text("4");
                    //SYSPRO_VB.chartsPanelBar.select("#chart-fields-list .list-group li:first-child");
                    $("#chart-fields-list li.field-name:first-child").addClass("active");
                }
                hideShowWindowElements(currentRowWindow, false, true, false, false, false, false, true, false, true, false);

            } else if (Widget_Type === "row_carousel") {
                if (currentRowWindow === "#rowWindow") {
                    $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
                }
                hideShowWindowElements(currentRowWindow, false, true, false, false, false, false, true, false, false, false);
            } else if (Widget_Type === "tiles_section") {
                if (currentRowWindow === "#rowWindow") {
                    $(currentRowWindow + " .layout-section-styling-title .step-number").text("2");
                    $("#addLayoutWidgetButton").removeClass("disabled");
                    $("#addLayoutWidgetButton").prop("disabled", false);
                    $('#addLayoutButtonPopoverWrap').popover("destroy");
                }
                hideShowWindowElements(currentRowWindow, true, true, false, false, false, false, true, false, false, false);
            } else if (Widget_Type === "row_separator") {
                if (currentRowWindow === "#rowWindow") {
                    $("#addLayoutWidgetButton").removeClass("disabled");
                    $("#addLayoutWidgetButton").prop("disabled", false);
                    $('#addLayoutButtonPopoverWrap').popover("destroy");
                }
                hideShowWindowElements(currentRowWindow, false, false, false, false, false, false, false, false, false, true);
            } else if (Widget_Type === "1col_form_widget" || Widget_Type === "2col_form_widget" || Widget_Type === "3col_form_widget") {
                if (currentRowWindow === "#rowWindow") {
                    $("#addLayoutWidgetButton").removeClass("disabled");
                    $("#addLayoutWidgetButton").prop("disabled", false);
                    $('#addLayoutButtonPopoverWrap').popover("destroy");
                }
                $(currentRowWindow + " #all_borders").hide();
                $(currentRowWindow + " #inner_borders").hide();
                hideShowWindowElements(currentRowWindow, false, true, false, true, false, false, true, false, false, false);
                SYSPRO_VB.showCorrectBorderOptions('Separate', currentRowWindow);
            } else if (Widget_Type === "custom_text") {
                if (currentRowWindow === "#rowWindow") {
                    $("#addLayoutWidgetButton").removeClass("disabled");
                    $("#addLayoutWidgetButton").prop("disabled", false);
                    $('#addLayoutButtonPopoverWrap').popover("destroy");
                }
                $(currentRowWindow + " #all_borders").hide();
                $(currentRowWindow + " #inner_borders").hide();
                hideShowWindowElements(currentRowWindow, false, true, false, false, false, false, true, false, false, false);
            }

        },

        // Helper function to show correct border options
        showCorrectBorderOptions: function (widgetType, currentRowWindow) {
            if (widgetType === "Joined") {
                $(currentRowWindow + " #all_borders").show();
                $(currentRowWindow + " #inner_borders").show();
            } else {
                $(currentRowWindow + " #all_borders").hide();
                $(currentRowWindow + " #inner_borders").hide();
                if ($(currentRowWindow + " input[name='border_options']").val() == 3 || $(currentRowWindow + " input[name='border_options']").val() == 2 || $(currentRowWindow + " input[name='border_options']").val() == 1) {
                    $(currentRowWindow + " #border_options_2").prop("checked", false);
                    $(currentRowWindow + " #border_options_2").parent().removeClass("active");
                    $(currentRowWindow + " #border_options_3").prop("checked", false);
                    $(currentRowWindow + " #border_options_3").parent().removeClass("active");
                    $(currentRowWindow + " #border_options_1").prop("checked", false);
                    $(currentRowWindow + " #border_options_1").parent().removeClass("active");
                    $(currentRowWindow + " #border_options_0").prop("checked", true);
                    $(currentRowWindow + " #border_options_0").parent().addClass("active");
                }
            }
        },

        // Setup Layout Widget helper function
        setupLayoutWidget: function (currentRowWindow) {

            var row_section_type = $(currentRowWindow + ".k-window-content").find("input[name='row_options']:checked"),
	        	WidgetName = $(row_section_type).val(),
				TypeName = $(row_section_type).data("layout-widget-type"),
				SubType = $(row_section_type).data("layout-widget-subtype"),
				CardTypeDetail = $(row_section_type).data("card-type-detail"),
				HarmonyComponentId = $(row_section_type).data("component-id"),
				ParentFieldPath = $(row_section_type).data("parent-field-path"),
				DisplayStyle = $(row_section_type).data("layout-widget-displaystyle"),
				Title = $(currentRowWindow + " #layout_widget_title").val(),
				TilesRows = $(currentRowWindow + " .tile-radio-options").length,
				Joined, Striped, Border, TitleForeground, TitleBackground, FieldName, FieldPath, CardBackground, CardColor, ChartColor, BackgroundColor, Icon;

            if (document.querySelector(currentRowWindow + ' input[name="blocks_joined"]:checked') !== null) {
                Joined = document.querySelector(currentRowWindow + ' input[name="blocks_joined"]:checked').value;
            }
            if (document.querySelector(currentRowWindow + ' input[name="listview_striped_rows"]:checked') !== null) {
                Striped = document.querySelector(currentRowWindow + ' input[name="listview_striped_rows"]:checked').value;
            }
            if (document.querySelector(currentRowWindow + ' input[name="border_options"]:checked') !== null) {
                Border = document.querySelector(currentRowWindow + ' input[name="border_options"]:checked').value;
            }
            if (document.querySelector(currentRowWindow + ' input[name="widget_title_text_colour"]:checked') !== null) {
                TitleForeground = document.querySelector(currentRowWindow + ' input[name="widget_title_text_colour"]:checked').value;
            }
            if (document.querySelector(currentRowWindow + ' input[name="widget_title_background_colour"]:checked') !== null) {
                TitleBackground = document.querySelector(currentRowWindow + ' input[name="widget_title_background_colour"]:checked').value;
            }
            if (document.querySelector(currentRowWindow + ' input[name="tile_border_colour"]:checked') !== null) {
                BackgroundColor = document.querySelector(currentRowWindow + ' input[name="tile_border_colour"]:checked').value;
            }
            if (document.querySelector(currentRowWindow + ' .icon-field-container .icon-option.active') !== null) {
                console.log("has icon");
                Icon = $(currentRowWindow + ' .icon-field-container .icon-option.active').data("icon-name");
            }
            if (document.querySelector(currentRowWindow + ' input[name="card_colour"]:checked') !== null) {
                CardBackground = document.querySelector(currentRowWindow + ' input[name="card_colour"]:checked').value;
                if (CardBackground == 0 || CardBackground == 2 || CardBackground == 3 || CardBackground == 4 || CardBackground == 8 || CardBackground == 7) {
                    CardColor = 9;
                } else {
                    CardColor = 8;
                }
            }
            if (document.querySelector(currentRowWindow + ' input[name="chart_colour"]:checked') !== null) {
                ChartColor = document.querySelector(currentRowWindow + ' input[name="chart_colour"]:checked').value;
            }

            if (DisplayStyle == 3) {
                if (document.querySelector(currentRowWindow + ' input[name="linklist_compact"]:checked') !== null) {
                    SubType = document.querySelector(currentRowWindow + ' input[name="linklist_compact"]:checked').value;
                    console.log(document.querySelector(currentRowWindow + ' input[name="linklist_compact"]:checked').value);
                }
            }

            if (document.querySelector(currentRowWindow + ' #chart-fields-list .list-group-item.active') !== null) {
                FieldName = $(currentRowWindow + ' #chart-fields-list .list-group-item.active').data("field-path");
                FieldPath = $(currentRowWindow + ' #chart-fields-list .list-group-item.active').data("field-path");
            }
            var ChartTitle = $(currentRowWindow + ' #chart_title').prop("checked"),
	        	ChartLegend = $(currentRowWindow + ' #chart_legend').prop("checked"),
				Collapsible = $(currentRowWindow + ' #widget_collapsible').prop("checked"),
				LineColor = $(currentRowWindow + ' input[name="separator_colour"]:checked').val(),
				kendoLayoutWidget = SYSPRO_VB.setupFinalLayoutWidget(currentRowWindow, WidgetName, Title, TypeName, SubType, Collapsible, DisplayStyle, Border, TitleBackground, TitleForeground, Joined, Striped, FieldName, FieldPath, CardTypeDetail, ParentFieldPath, CardBackground, CardColor, ChartColor, BackgroundColor, Icon, ChartTitle, ChartLegend, LineColor, HarmonyComponentId);
            console.log(WidgetName);
            console.log(kendoLayoutWidget);
            //Rob: Use the Id instead of the uid.
            var GUID = kendoLayoutWidget.Id;
            return [GUID, kendoLayoutWidget];

        },

        // FInal setup and creation of Kendo Object for Layout Widget
        setupFinalLayoutWidget: function (currentRowWindow, WidgetName, Title, TypeName, SubType, Collapsible, DisplayStyle, Border, TitleBackground, TitleForeground, Joined, Striped, FieldName, FieldPath, CardTypeDetail, ParentFieldPath, CardBackground, CardColor, ChartColor, BackgroundColor, Icon, ChartTitle, ChartLegend, LineColor, HarmonyComponentId) {

            //Rob: I now generate a unique id and use it when creating models for later use.
            var widgetId = sysproInterop.generateUUID();
            console.log(TypeName);
            console.log(WidgetName);
            switch (TypeName) {
                case "LayoutWidget":
                    switch (WidgetName) {
                        case "row_1_col":
                            var Rows = new rowModel({ Index: 0 });
                            Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
                            SubType = Joined;
                            //Rob: Set the Id in the constructor.
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
                            kendoLayoutWidget.append(Rows);
                            break;
                        case "row_2_col":
                            var Rows = new rowModel({ Index: 0 });
                            Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 4 }));
                            Rows.append(new columnModel({ Index: 1, ResponsiveStyle: 4 }));
                            SubType = Joined;
                            //Rob: Set the Id in the constructor.
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
                            kendoLayoutWidget.append(Rows);
                            break;
                        case "row_3_col":
                            var Rows = new rowModel({ Index: 0 });
                            Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 5 }));
                            Rows.append(new columnModel({ Index: 1, ResponsiveStyle: 5 }));
                            Rows.append(new columnModel({ Index: 2, ResponsiveStyle: 5 }));
                            SubType = Joined;
                            //Rob: Set the Id in the constructor.
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
                            kendoLayoutWidget.append(Rows);
                            break;
                        case "row_4_col":
                            var Rows = new rowModel({ Index: 0 });
                            Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 6 }));
                            Rows.append(new columnModel({ Index: 1, ResponsiveStyle: 6 }));
                            Rows.append(new columnModel({ Index: 2, ResponsiveStyle: 6 }));
                            Rows.append(new columnModel({ Index: 3, ResponsiveStyle: 6 }));
                            SubType = Joined;
                            //Rob: Set the Id in the constructor.
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
                            kendoLayoutWidget.append(Rows);
                            break;
                        case "row_4_block":
                            var Rows = new rowModel({ Index: 0 });
                            Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 4 }));
                            Rows.append(new columnModel({ Index: 1, ResponsiveStyle: 4 }));
                            var Rows2 = new rowModel({ Index: 1 });
                            Rows2.append(new columnModel({ Index: 0, ResponsiveStyle: 4 }));
                            Rows2.append(new columnModel({ Index: 1, ResponsiveStyle: 4 }));
                            SubType = Joined;
                            //Rob: Set the Id in the constructor.
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
                            kendoLayoutWidget.append(Rows);
                            kendoLayoutWidget.append(Rows2);
                            break;
                        case "row_6_block":
                            var Rows = new rowModel({ Index: 0 });
                            Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 5 }));
                            Rows.append(new columnModel({ Index: 1, ResponsiveStyle: 5 }));
                            Rows.append(new columnModel({ Index: 2, ResponsiveStyle: 5 }));
                            var Rows2 = new rowModel({ Index: 1 });
                            Rows2.append(new columnModel({ Index: 0, ResponsiveStyle: 5 }));
                            Rows2.append(new columnModel({ Index: 1, ResponsiveStyle: 5 }));
                            Rows2.append(new columnModel({ Index: 2, ResponsiveStyle: 5 }));
                            SubType = Joined;
                            //Rob: Set the Id in the constructor.
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
                            kendoLayoutWidget.append(Rows);
                            kendoLayoutWidget.append(Rows2);
                            break;
                        case "row_list_view":
                            var Rows = new rowModel({ Index: 0 });
                            Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
                            SubType = Striped;
                            //Rob: Set the Id in the constructor.
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
                            kendoLayoutWidget.append(Rows);
                            break;
                        case "row_link_list":
                        case "row_carousel":
                            var Rows = new rowModel({ Index: 0 });
                            Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
                            SubType = SubType;
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
                            kendoLayoutWidget.append(Rows);
                            break;
                        case "tiles_section":
                            SubType = SubType;
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, BackgroundColor: BackgroundColor, Icon: Icon });
                            var Rows = new rowModel({ Index: 0 });
                            kendoLayoutWidget.append(Rows);
                            break;
                        case "1col_form_widget":
                            var Rows = new rowModel({ Index: 0 });
                            Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
                            SubType = Joined;
                            //Rob: Set the Id in the constructor.
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
                            kendoLayoutWidget.append(Rows);
                            break;
                        case "2col_form_widget":
                            var Rows = new rowModel({ Index: 0 });
                            Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 4 }));
                            Rows.append(new columnModel({ Index: 1, ResponsiveStyle: 4 }));
                            SubType = Joined;
                            //Rob: Set the Id in the constructor.
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
                            kendoLayoutWidget.append(Rows);
                            break;
                        case "3col_form_widget":
                            var Rows = new rowModel({ Index: 0 });
                            Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 5 }));
                            Rows.append(new columnModel({ Index: 1, ResponsiveStyle: 5 }));
                            Rows.append(new columnModel({ Index: 2, ResponsiveStyle: 5 }));
                            SubType = Joined;
                            //Rob: Set the Id in the constructor.
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
                            kendoLayoutWidget.append(Rows);
                            break;
                        case "custom_text":
                            var Rows = new rowModel({ Index: 0 });
                            SubType = Joined;
                            //Rob: Set the Id in the constructor.
                            var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
                            kendoLayoutWidget.append(Rows);
                    }
                    break;
                case "Sparkline":
                    var Rows = new rowModel({ Index: 0 });
                    Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
                    //Rob: Set the Id in the constructor.
                    var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, FieldName: FieldName, FieldPath: FieldPath, Details: { Color: ChartColor }, Icon: Icon, ChartTitle: ChartTitle, ChartLegend: ChartLegend });
                    kendoLayoutWidget.append(Rows);
                    break;
                case "Card":
                    var Rows = [];
                    //Rob: Set the Id in the constructor.
                    var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, CardTypeDetail: CardTypeDetail, ParentFieldPath: ParentFieldPath, BackgroundColor: CardBackground, Details: { Color: CardColor }, Icon: Icon });
                    kendoLayoutWidget.append(Rows);
                    break;
                case "HarmonyWidget":
                    var Rows = [];
                    //Rob: Set the Id in the constructor.
                    var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, CardTypeDetail: CardTypeDetail, ParentFieldPath: ParentFieldPath, BackgroundColor: CardBackground, Details: { Color: CardColor }, Icon: Icon, ComponentId: HarmonyComponentId });
                    kendoLayoutWidget.append(Rows);
                    break;
                case "StaticElement":
                    var Rows = [];
                    //Rob: Set the Id in the constructor.
                    var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, DisplayStyle: DisplayStyle, Details: { Color: LineColor }, Color: LineColor });
                    kendoLayoutWidget.append(Rows);
            }

            return kendoLayoutWidget;
        },

        // Insert Layout Widget
        insertLayoutWidget: function (currentRowWindow, GUID, widgetObject) {

            var VBdata = viewModel.dataSource.data().toJSON(),
	        	CleanWidget = widgetObject.toJSON(),
				SubType = widgetObject.SubType;
            CleanWidget.Id = GUID;
            VBdata[SYSPRO_VB.column_num].Widgets.unshift(CleanWidget);

            viewModel.dataSource.data(VBdata);

            sysproInterop.getHtmlFromModel("Widget", SYSPRO_VB.stringifyJSONObject(GUID), function (result) {
                var newWidgetHTMLjQuery = $($.trim(result));
                if (widgetObject.DisplayStyle === 4) {
                    newWidgetHTMLjQuery.find(".data-section").removeClass("data-section");
                    newWidgetHTMLjQuery.children('.col-sm-12').addClass('tile-widget-wrapper');
                    console.log(newWidgetHTMLjQuery);
                    newWidgetHTMLjQuery.find('.panel-body').first().prepend('<div class="tile-loading-cover"><div class="loader"><div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div></div>');
                }
                SYSPRO_VB.column.find(".sortable-list").prepend(newWidgetHTMLjQuery);

                $(currentRowWindow + " .layout-radio-options .btn-radio").each(function () {
                    $(this).removeClass("active");
                });

                $(currentRowWindow + " span[href='#empty-tab']").tab('show');

                SYSPRO_VB.finishAddLayoutWidget();

                SYSPRO_VB.initAddDataWidgets();

                //SYSPRO_VB.sizeTiles(0);
            });

            SYSPRO_VB.save();

        },

        // Helper function to 
        setUpDataWidget: function (parentWindow, targetLayoutWidgetDisplayStyle) {

            var TextColour, TextSize, TextWeight, TextAlign, DataBackground, IconOption, IconColour, IconAlign, IconSize;

            if (document.querySelector(parentWindow + ' input[name="data_text_colour"]:checked') !== null) {
                TextColour = document.querySelector(parentWindow + ' input[name="data_text_colour"]:checked').value;
            }
            if (document.querySelector(parentWindow + ' input[name="data_text_size"]:checked') !== null) {
                TextSize = document.querySelector(parentWindow + ' input[name="data_text_size"]:checked').value;
            }
            if (document.querySelector(parentWindow + ' input[name="data_text_weight"]:checked') !== null) {
                TextWeight = document.querySelector(parentWindow + ' input[name="data_text_weight"]:checked').value;
            }
            if (document.querySelector(parentWindow + ' input[name="data_text_alignment"]:checked') !== null) {
                TextAlign = document.querySelector(parentWindow + ' input[name="data_text_alignment"]:checked').value;
            }
            if (document.querySelector(parentWindow + ' input[name="data_background_colour"]:checked') !== null) {
                DataBackground = document.querySelector(parentWindow + ' input[name="data_background_colour"]:checked').value;
            }
            if (document.querySelector(parentWindow + ' .icon-field-container .icon-option.active') !== null) {
                IconOption = $(parentWindow + ' .icon-field-container .icon-option.active').data("icon-name");
            }
            if (document.querySelector(parentWindow + ' input[name="icon_colour"]:checked') !== null) {
                IconColour = document.querySelector(parentWindow + ' input[name="icon_colour"]:checked').value;
            }
            if (document.querySelector(parentWindow + ' input[name="icon_alignment"]:checked') !== null) {
                IconAlign = document.querySelector(parentWindow + ' input[name="icon_alignment"]:checked').value;
            }
            if (document.querySelector(parentWindow + ' input[name="icon_size"]:checked') !== null) {
                IconSize = document.querySelector(parentWindow + ' input[name="icon_size"]:checked').value;
            }

            var IconTooltip = $(parentWindow + " #icon_tooltip").val(),
	        	Title = $(parentWindow + " #linklist_link_text").val(),
				dataWidgetClone = $(parentWindow + " .fields-wrapper .list-group-item.active.field-name").clone();
            dataWidgetClone.find("i").remove();
            var FieldName = dataWidgetClone.text(),
	        	FieldPath = dataWidgetClone.data("field-path"),
				HasSmartTag = dataWidgetClone.data("smart-tag"),
				DataType = dataWidgetClone.data("data-type"),
				KeyField = dataWidgetClone.data("key-field"),
				EntryType = dataWidgetClone.data("entry-type"),
				KeyAction = dataWidgetClone.data("key-action"),
				Caption = $(parentWindow + " #data_show_caption").prop("checked"),
				SubType = "";
			console.log(EntryType);
            if (EntryType === undefined || EntryType === null || EntryType === '') {
                var TypeName = "DataWidget";
            } else {
                var TypeName = "EntryDataWidget";
            }


            //Rob: Generate a Unique GUID for the Id and set it so we don't have to use the kendo uid because we don't have it yet.
            var KendoDataWidget = new dataWidgetModel({ Id: sysproInterop.generateUUID(), Title: Title, FieldName: FieldName, FieldPath: FieldPath, HasSmartTag: HasSmartTag, DataType: DataType, KeyField: KeyField, KeyAction: KeyAction, TypeName: TypeName, SubType: SubType, BackgroundColor: DataBackground, Caption: { Color: 8, Size: 0, Alignment: TextAlign, Visibility: Caption }, Value: { Color: TextColour, Size: TextSize, Alignment: TextAlign, Weight: TextWeight }, Icon: { Name: IconOption, Color: IconColour, Size: IconSize, Alignment: IconAlign, Tooltip: IconTooltip }, EntryType: EntryType });
            //Rob: Use the ID instead of the uid.
            var dataGUID = KendoDataWidget.Id;

            return [dataGUID, KendoDataWidget];
        },

        // Helper function to insert new Kendo Data Widget
        insertDataWidget: function (dataGUID, widgetObject, column_num, widget_index, row_num, section_num, section, parentGUID, quickAddIndex) {

            //Rob: Now always do a get instead of getByUid so we can use our own Id.
            var targetParentWidget = viewModel.dataSource.get(parentGUID);
            if (targetParentWidget.DisplayStyle === 0) {

                viewModel.dataSource.at(column_num).children.at(widget_index).children.at(row_num).children.at(section_num).append(widgetObject);

            } else if (targetParentWidget.DisplayStyle === 1 || targetParentWidget.DisplayStyle === 3) {

                console.log("we got this far");

                console.log(section);

                // Check if this data widget coming in to a listview is coming in from a quick add drag, in which case we need to inert it at the right index, rather than just adding it to the end of the 'list'
                if (quickAddIndex !== null) {
                    targetParentWidget.children.at(0).children.at(0).children.insert(quickAddIndex, widgetObject);
                } else {
                    targetParentWidget.children.at(0).children.at(0).append(widgetObject);
                }

            } else if (targetParentWidget.DisplayStyle == 2) {

                var initialNumRowsInCarousel = targetParentWidget.Rows.length,
	            	targetParentWidgetJSON = targetParentWidget.toJSON();

                if (targetParentWidgetJSON.Rows[0].Columns[0].hasOwnProperty("Widgets")) {

                    var Row = new rowModel({ Index: (initialNumRowsInCarousel) });
                    Row.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
                    targetParentWidget.append(Row);
                    targetParentWidget.children.at(initialNumRowsInCarousel).children.at(0).append(widgetObject);
                    var carouselRowNumber = initialNumRowsInCarousel + 1;

                } else {
                    var carouselRowNumber = 1;
                    targetParentWidget.children.at(0).children.at(0).append(widgetObject);
                }

            } else if (targetParentWidget.DisplayStyle === 5) {

                targetParentWidget.children.at(0).children.at(section_num).append(widgetObject);

            }

            sysproInterop.getHtmlFromModel("Widget",
				SYSPRO_VB.stringifyJSONObject(dataGUID),
				function (result) {

				    var newDataWidgetHTMLjQuery = $($.trim(result));

				    if (targetParentWidget.DisplayStyle === 0) {

				        if (section.find(".add-data-widget")) {
				            section.find(".add-data-widget").hide();
				        }
				        section.append(newDataWidgetHTMLjQuery);

				    } else if (targetParentWidget.DisplayStyle === 1) {

				        if (quickAddIndex !== null) {
				            newDataWidgetHTMLjQuery.insertAfter(section.find("tr:nth-child(" + quickAddIndex + ")"));
				        } else {
				            section.append(newDataWidgetHTMLjQuery);
				        }

				    } else if (targetParentWidget.DisplayStyle === 2) {

				        if (section.find(".add-data-widget")) {
				            section.find(".add-data-widget").remove();
				        }

				        section.append(newDataWidgetHTMLjQuery);

				        section.parents(".carousel-inner").append('<div class="item"><div class="panel-body sys-bg-white text-left"><div class="row " data-row="' + carouselRowNumber + '"><div class="col-xs-12" data-section="0"><div class="panel sys-widget sys-box-shadow-off sys-mg-off  add-data-widget"><div class="panel-body text-center sys-fg-primary"><a class="pull-left text-center add-data-section" href="#"><i class="material-icons">note_add</i></a></div></div></div></div></div></div>');

				        SYSPRO_VB.initAddDataWidgets();

				    } else if (targetParentWidget.DisplayStyle === 3) {

				        if (quickAddIndex !== null) {
				            newDataWidgetHTMLjQuery.insertAfter(section.find("a:nth-child(" + quickAddIndex + ")"));
				        } else {
				            section.append(newDataWidgetHTMLjQuery);
				        }

				    } else if (targetParentWidget.DisplayStyle === 5) {

				        section.append(newDataWidgetHTMLjQuery);

				        SYSPRO_VB.initDatePicker('div[data-guid="' + parentGUID + '"]');

				    }

				    kendo.bind($("#dataEditWindow"), viewModel);

				    sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', section.closest(".layout-widget"));

				    SYSPRO_VB.initEditRemoveDataWidget();
				    SYSPRO_VB.initDataWidgetSorting();

				},
			targetParentWidget.SubType,
			targetParentWidget.DisplayStyle,
			targetParentWidget.Border,
			section_num);

            SYSPRO_VB.save();

        },

        // Initialising some JS after Layout Widgets added
        finishAddLayoutWidget: function () {

            $(".layout-widget-options .col-xs-3:last-child i, .layout-widget-options .col-xs-6:last-child i").popover({
                html: true,
                placement: "left",
                trigger: "manual",
                animation: false,
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
                content: '<ul class="nav nav-pills"><li><a class="edit-row-section"><i class="material-icons text-primary">edit</i></a></li><li><a class="remove-row-section"><i class="material-icons text-danger">delete</i></a></li></ul>'
            })
		    .on("click", function () {
		        var _this = this;
		        $(this).popover("show");
		        $(this).siblings(".popover").on("mouseleave", function () {
		            $(_this).popover('hide');
		        });

		    });

            $('.options-popover').off().on("click", function () {
                $(this).parents(".sys-carousel").popover({
                    html: true,
                    placement: "left",
                    trigger: "hover",
                    template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
                    content: '<ul class="nav nav-pills"><li><a href="#"><i class="material-icons text-primary">edit</i></a></li><li><a href="#"><i class="material-icons text-danger">delete</i></a></li></ul>'
                });
            });

            $(".initial-target").each(function () {
                if ($(this).siblings(".draggable-row-section").length) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });

            // A few things to initialise the sortablitiy and draggability of the newly added elements - might need to move these after changing to Rob's convertor
            SYSPRO_VB.sizeTiles(0);
            SYSPRO_VB.initNormalSorting();
            SYSPRO_VB.initDataWidgetSorting();

        },

        // Main sorting initialisation function for layout widgets
        initNormalSorting: function () {
            var sortableWidgets = [];

            $('.sortable-list').each(function (index) {

                sortableWidgets[index] = $(this).kendoSortable({
                    connectWith: '.sortable-list',
                    placeholder: SYSPRO_VB.placeholder,
                    hint: SYSPRO_VB.hint,
                    handle: ".layout-widget-options .col-xs-6",
                    filter: '>div.draggable-row-section',
                    ignore: ".data-section, .data-section>div, .data-section *, .tile-widget, .tile, .tile-widget *, .form-control, .form-group *, tr, tr *",
                    cursor: "move",
                    start: function (widget) {
                        $(".sortable-list").each(function () {
                            $(this).addClass("pulse");
                        });
                    },
                    end: function (widget) {
                        $(".sortable-list").each(function () {
                            $(this).removeClass("pulse");
                        });
                        SYSPRO_VB.endDragWidget(widget);
                        $(".initial-target").each(function () {
                            if ($(this).siblings(".draggable-row-section").length) {
                                $(this).hide();
                            } else {
                                $(this).show();
                            }
                        });
                    },
                    change: function (widget) {
                        SYSPRO_VB.finishDragWidget(widget);
                    },
                    move: function (widget) {
                        SYSPRO_VB.column_num = widget.target.parents(".main-column").data("column");
                        var dropTarget = widget.target;
                        $(".initial-target").each(function () {

                            if ($(this).siblings(".draggable-row-section").not(".placeholderGhost").length) {
                            } else {
                                if ($(this).is(dropTarget)) {
                                    $(this).hide();
                                } else {
                                    $(this).show();
                                }
                            }
                        });

                    }
                }).data("kendoSortable");

            });
        },

        // Destroy Layout widgets Kendo Sortable Widget
        destroyLayoutSorting: function (sortableWidgets) {
            for (i = 0; i < sortableWidgets.length; i++) {
                sortableWidgets[i].draggable.destroy();
                sortableWidgets[i].destroy();
            }
        },

        // Data Widget sorting initialisation
        initDataWidgetSorting: function () {
            var sortableDataWidgets = [];

            $('div.data-section, tbody.data-section').each(function (index) {
                sortableDataWidgets[index] = $(this).kendoSortable({
                    connectWith: 'div.data-section, tbody.data-section',
                    placeholder: SYSPRO_VB.placeholder,
                    hint: SYSPRO_VB.hint,
                    ignore: 'input',
                    filter: '>div:not(.form-group:first-child), >tr',
                    disabled: '.add-data-widget',
                    handle: ".drag-data-section",
                    cursor: "move",
                    start: function (widget) {
                        $(".data-section .panel.add-data-widget, form .data-section").each(function () {
                            $(this).addClass("pulse");
                        });
                        var parentSortableList = $(widget.draggableEvent.originalEvent.srcElement.parentElement);

                        // Need to disable every sortable widget that already has a data widget in it, so it cannot be a valid target
                        $(".panel.draggable-data-section").each(function () {
                            $(this).closest(".data-section").removeClass("data-section").addClass("data-section-disabled");
                        });

                        if (this.element.find(".add-data-widget")) {
                            SYSPRO_VB.tempHiddenWidg = this.element.find(".add-data-widget");
                        }
                        if (this.element.find(".add-data-section")) {
                            this.element.find(".add-data-section").show();
                        }
                        // Grab correct section index if moving existing data widgets
                        if (widget.item.hasClass("quickAddDataWidget")) {

                        } else {

                            // THE PROBLEM IS NOT GETTING THE DATA-SECTION OF THE PARENT BECAUSE AS SOON AS 'START' FIRES IT HAS ALREADY BEEN REMOVED FROM THE DOM?
                            SYSPRO_VB.currentDataWidgetUid = widget.item.data("guid");
                            //Rob: Now always do a get instead of getByUid so we can use our own Id.
                            SYSPRO_VB.draggedDataWidget = viewModel.dataSource.get(SYSPRO_VB.currentDataWidgetUid);
                            var draggedDataWidgetParentNode = SYSPRO_VB.draggedDataWidget.parentNode();
                            var startDataWidgetDragColumn = widget.item.parents(".main-column").data("column");
                            var parentLayoutWidgetUid = widget.item.parents(".draggable-row-section").data("guid");

                            if (widget.item.hasClass("data-section")) {
                                SYSPRO_VB.starting_section_num = widget.item.data("section");
                            } else {
                                SYSPRO_VB.starting_section_num = widget.item.parent(".data-section").data("section");
                            }
                        }
                    },
                    end: function (widget) {
                        $(".pulse").each(function () {
                            $(this).removeClass("pulse");
                        });
                        // Need to reenable every sortable widget that already has a data widget in it, so it can again be a valid target
                        $(".draggable-data-section").each(function () {
                            $(this).closest(".data-section-disabled").removeClass("data-section-disabled").addClass("data-section");
                        });

                        console.log(widget.action);

                        if (widget.action === "receive") {

                            if (widget.item.hasClass("quickAddDataWidget")) {

                                $("#draggableCover").hide();
                                SYSPRO_VB.endQuickDragWidget(widget);

                                var widgetClone = widget.item.clone();
                                widgetClone.find("i").remove();
                                var dataWidgetFieldName = widgetClone.text();
                                var dataWidgetFieldPath = widgetClone.data('field-path');
                                var dataWidgetSmartTag = widgetClone.data('smart-tag');
                                var dataWidgetDataType = widgetClone.data('data-type');
                                var quickAddIndex = widget.newIndex;

                                //Rob: Generate a Unique GUID for the Id and set it so we don't have to use the kendo uid because we don't have it yet.
                                var kendoDataWidget = new dataWidgetModel({ Id: sysproInterop.generateUUID(), FieldName: dataWidgetFieldName, FieldPath: dataWidgetFieldPath, HasSmartTag: dataWidgetSmartTag, DataType: dataWidgetDataType, TypeName: "DataWidget", SubType: "", BackgroundColor: 9, Caption: { Color: 8, Size: 0, Alignment: 0, Visibility: true }, Value: { Color: 8, Size: 1, Alignment: 0, Weight: 1 }, Icon: { Name: "", Color: 0, Size: 0, Alignment: 0, Tooltip: "" } });
                                //Rob: Use the ID instead of the uid.
                                SYSPRO_VB.insertDataWidget(kendoDataWidget.Id, kendoDataWidget, SYSPRO_VB.column_num, SYSPRO_VB.widget_index, SYSPRO_VB.row_num, SYSPRO_VB.section_num, SYSPRO_VB.section, SYSPRO_VB.layout_widget_guid, quickAddIndex);

                                SYSPRO_VB.finishAddLayoutWidget();

                                SYSPRO_VB.initAddDataWidgets();

                                widget.preventDefault();

                            } else {

                                SYSPRO_VB.currentDataWidgetHTML = widget.item.closest(".draggable-data-section");

                                //Rob: Now always do a get instead of getByUid so we can use our own Id.
                                var targetParentWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid),
	                            	targetDataWidgetRowNum = SYSPRO_VB.currentDataWidgetHTML.data("row");

                                sysproInterop.getHtmlFromModel(
									"Widget",
									SYSPRO_VB.draggedDataWidgetTempCopy.toJSON(),
									//SYSPRO_VB.stringifyJSONObject(SYSPRO_VB.currentDataWidgetUid),
									function (result) {

									    console.log(result);
									    var newDataWidgetHTMLjQuery = $($.trim(result));

									    if (targetParentWidget.DisplayStyle == 0 || targetParentWidget.DisplayStyle == 5 || targetParentWidget.DisplayStyle == 2) {

									        SYSPRO_VB.currentDataWidgetHTML.replaceWith(newDataWidgetHTMLjQuery);
									        SYSPRO_VB.initAddDataWidgets();

									    } else if (targetParentWidget.DisplayStyle == 1 || targetParentWidget.DisplayStyle == 3) {

									        //newDataWidgetHTMLjQuery.attr("data-row", targetDataWidgetRowNum);
									        //newDataWidgetHTMLjQuery.data("row", targetDataWidgetRowNum);
									        SYSPRO_VB.currentDataWidgetHTML.replaceWith(newDataWidgetHTMLjQuery);

									    }

									    //kendo.bind($("#dataEditWindow"), viewModel);
									    //sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true);
									    sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', widget.item.closest(".layout-widget"));

									    SYSPRO_VB.initAddDataWidgets();
									    SYSPRO_VB.initDataWidgetSorting();
									    SYSPRO_VB.finishAddLayoutWidget();


									},
									targetParentWidget.SubType,
									targetParentWidget.DisplayStyle,
									targetParentWidget.Border,
									SYSPRO_VB.section_num);

                            }


                        } else if (widget.action === "remove") {

                            //Rob: Now always do a get instead of getByUid so we can use our own Id.
                            var currentDraggedDataWidget = viewModel.dataSource.get($(widget.item).data("guid"));
                            SYSPRO_VB.draggedDataWidgetTempCopy = currentDraggedDataWidget;
                            viewModel.dataSource.remove(currentDraggedDataWidget);

                        } else if (widget.action === "sort") {
                            var targetParentWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid);
                            console.log(targetParentWidget.DisplayStyle);
                            if (targetParentWidget.DisplayStyle === 1 || targetParentWidget.DisplayStyle === 3) {
                                SYSPRO_VB.draggedDataWidgetCopy = SYSPRO_VB.draggedDataWidget.toJSON();
                                viewModel.dataSource.remove(SYSPRO_VB.draggedDataWidget);
                                console.log(widget.newIndex);
                                viewModel.dataSource.at(SYSPRO_VB.column_num).children.at(SYSPRO_VB.widget_index).children.at(0).children.at(0).children.insert(widget.newIndex - 1, SYSPRO_VB.draggedDataWidgetCopy);
                                SYSPRO_VB.save();
                            } else if (targetParentWidget.DisplayStyle === 5) {
                                SYSPRO_VB.draggedDataWidgetCopy = SYSPRO_VB.draggedDataWidget.toJSON();
                                viewModel.dataSource.remove(SYSPRO_VB.draggedDataWidget);
                                console.log(widget.newIndex);
                                viewModel.dataSource.at(SYSPRO_VB.column_num).children.at(SYSPRO_VB.widget_index).children.at(0).children.at(SYSPRO_VB.section_num).children.insert(widget.newIndex, SYSPRO_VB.draggedDataWidgetCopy);
                            }
                        }

                    },
                    change: function (widget) {
                        SYSPRO_VB.finishDragDataWidget(widget);
                    },

                    move: function (widget) {

                        SYSPRO_VB.column_num = widget.target.parents(".main-column").data("column");

                        if (widget.target.hasClass("data-section")) {
                            SYSPRO_VB.section_num = widget.target.data("section") || 0;
                        } else {
                            SYSPRO_VB.section_num = widget.target.parent(".data-section").data("section") || 0;
                        }
                        if (SYSPRO_VB.tempHiddenWidg !== null) {
                            SYSPRO_VB.tempHiddenWidg.show();
                        }
                        $(".add-data-widget").each(function (index) {
                            if ($(this).siblings(".draggable-data-section:visible").length) {

                                $(this).not(SYSPRO_VB.tempHiddenWidg).hide();

                                if (widget.target.hasClass("add-data-widget")) {
                                    widget.target.hide();
                                }

                            } else {
                                $(this).not(widget.target).show();
                                $(this).addClass("pulse");

                            }
                        });

                        SYSPRO_VB.layout_widget_guid = widget.target.parents(".draggable-row-section").data("guid");
                        var targetParentWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid);
                        SYSPRO_VB.row_num = widget.target.parents(".row").data("row") || 0;
                        if (targetParentWidget.DisplayStyle === 1) {
                            SYSPRO_VB.section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] tbody[data-section="0"]');
                        } else {
                            SYSPRO_VB.section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] div[data-row="' + SYSPRO_VB.row_num + '"] div[data-section="' + SYSPRO_VB.section_num + '"]');
                        }
                        SYSPRO_VB.widget_index = $('div[data-column="' + SYSPRO_VB.column_num + '"] .draggable-row-section').index($('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]'));

                    }

                }).data("kendoSortable");

            });

            var sortableLinkListDataWidgets = [];

            $('div.layout-widget .panel-body .list-group').each(function (index) {
                sortableLinkListDataWidgets[index] = $(this).kendoSortable({
                    connectWith: 'div.layout-widget .panel-body .list-group',
                    placeholder: SYSPRO_VB.placeholder,
                    hint: SYSPRO_VB.hint,
                    ignore: 'input',
                    filter: '>a',
                    disabled: '.add-data-widget',
                    handle: ".drag-data-section",
                    cursor: "move",
                    start: function (widget) {
                        $("div.layout-widget .panel-body .list-group").each(function () {
                            $(this).addClass("pulse");
                        });
                        var parentSortableList = $(widget.draggableEvent.originalEvent.srcElement.parentElement);

                        // Grab correct section index if moving existing data widgets
                        if (widget.item.hasClass("quickAddDataWidget")) {

                        } else {

                            // THE PROBLEM IS NOT GETTING THE DATA-SECTION OF THE PARENT BECAUSE AS SOON AS 'START' FIRES IT HAS ALREADY BEEN REMOVED FROM THE DOM?
                            SYSPRO_VB.currentDataWidgetUid = widget.item.data("guid");
                            //Rob: Now always do a get instead of getByUid so we can use our own Id.
                            SYSPRO_VB.draggedDataWidget = viewModel.dataSource.get(SYSPRO_VB.currentDataWidgetUid);
                            var draggedDataWidgetParentNode = SYSPRO_VB.draggedDataWidget.parentNode();
                            var startDataWidgetDragColumn = widget.item.parents(".main-column").data("column");
                            var parentLayoutWidgetUid = widget.item.parents(".draggable-row-section").data("guid");

                            if (widget.item.hasClass("data-section")) {
                                SYSPRO_VB.starting_section_num = widget.item.data("section");
                            } else {
                                SYSPRO_VB.starting_section_num = widget.item.parent(".data-section").data("section");
                            }
                        }
                    },
                    end: function (widget) {
                        $(".pulse").each(function () {
                            $(this).removeClass("pulse");
                        });

                        console.log(widget.action);

                        if (widget.action === "receive") {

                            if (widget.item.hasClass("quickAddDataWidget")) {

                                $("#draggableCover").hide();
                                SYSPRO_VB.endQuickDragWidget(widget);

                                var widgetClone = widget.item.clone();
                                widgetClone.find("i").remove();
                                var dataWidgetFieldName = widgetClone.text();
                                var dataWidgetFieldPath = widgetClone.data('field-path');
                                var dataWidgetSmartTag = widgetClone.data('smart-tag');
                                var dataWidgetDataType = widgetClone.data('data-type');
                                var quickAddIndex = widget.newIndex;

                                //Rob: Generate a Unique GUID for the Id and set it so we don't have to use the kendo uid because we don't have it yet.
                                var kendoDataWidget = new dataWidgetModel({ Id: sysproInterop.generateUUID(), FieldName: dataWidgetFieldName, FieldPath: dataWidgetFieldPath, HasSmartTag: dataWidgetSmartTag, DataType: dataWidgetDataType, TypeName: "DataWidget", SubType: "", BackgroundColor: 9, Caption: { Color: 8, Size: 0, Alignment: 0, Visibility: true }, Value: { Color: 8, Size: 1, Alignment: 0, Weight: 1 }, Icon: { Name: "", Color: 0, Size: 0, Alignment: 0, Tooltip: "" } });
                                //Rob: Use the ID instead of the uid.
                                SYSPRO_VB.insertDataWidget(kendoDataWidget.Id, kendoDataWidget, SYSPRO_VB.column_num, SYSPRO_VB.widget_index, SYSPRO_VB.row_num, SYSPRO_VB.section_num, SYSPRO_VB.section, SYSPRO_VB.layout_widget_guid, quickAddIndex);

                                SYSPRO_VB.finishAddLayoutWidget();

                                SYSPRO_VB.initAddDataWidgets();

                                widget.preventDefault();

                            } else {

                                SYSPRO_VB.currentDataWidgetHTML = widget.item.closest(".draggable-data-section");

                                //Rob: Now always do a get instead of getByUid so we can use our own Id.
                                var targetParentWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid),
	                            	targetDataWidgetRowNum = SYSPRO_VB.currentDataWidgetHTML.data("row");

                                sysproInterop.getHtmlFromModel(
									"Widget",
									SYSPRO_VB.draggedDataWidgetTempCopy.toJSON(),
									//SYSPRO_VB.stringifyJSONObject(SYSPRO_VB.currentDataWidgetUid),
									function (result) {

									    console.log(result);
									    var newDataWidgetHTMLjQuery = $($.trim(result));

									    SYSPRO_VB.currentDataWidgetHTML.replaceWith(newDataWidgetHTMLjQuery);

									    sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', widget.item.closest(".layout-widget"));

									    SYSPRO_VB.initAddDataWidgets();
									    SYSPRO_VB.initDataWidgetSorting();
									    SYSPRO_VB.finishAddLayoutWidget();


									},
									targetParentWidget.SubType,
									targetParentWidget.DisplayStyle,
									targetParentWidget.Border,
									SYSPRO_VB.section_num);

                            }


                        } else if (widget.action === "remove") {

                            //Rob: Now always do a get instead of getByUid so we can use our own Id.
                            var currentDraggedDataWidget = viewModel.dataSource.get($(widget.item).data("guid"));
                            SYSPRO_VB.draggedDataWidgetTempCopy = currentDraggedDataWidget;
                            viewModel.dataSource.remove(currentDraggedDataWidget);

                        } else if (widget.action === "sort") {
                            var targetParentWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid);
                            console.log(targetParentWidget.DisplayStyle);
                            SYSPRO_VB.draggedDataWidgetCopy = SYSPRO_VB.draggedDataWidget.toJSON();
                            viewModel.dataSource.remove(SYSPRO_VB.draggedDataWidget);
                            console.log(widget.newIndex);
                            viewModel.dataSource.at(SYSPRO_VB.column_num).children.at(SYSPRO_VB.widget_index).children.at(0).children.at(0).children.insert(widget.newIndex - 1, SYSPRO_VB.draggedDataWidgetCopy);
                            SYSPRO_VB.save();
                        }

                    },
                    change: function (widget) {
                        SYSPRO_VB.finishDragDataWidget(widget);
                    },

                    move: function (widget) {

                        SYSPRO_VB.column_num = widget.target.parents(".main-column").data("column");

                        if (widget.target.hasClass("data-section")) {
                            SYSPRO_VB.section_num = widget.target.data("section") || 0;
                        } else {
                            SYSPRO_VB.section_num = widget.target.parent(".data-section").data("section") || 0;
                        }

                        SYSPRO_VB.layout_widget_guid = widget.target.parents(".draggable-row-section").data("guid");
                        var targetParentWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid);
                        SYSPRO_VB.row_num = 0;
                        SYSPRO_VB.section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] div[data-row="' + SYSPRO_VB.row_num + '"] div[data-section="' + SYSPRO_VB.section_num + '"]');

                        SYSPRO_VB.widget_index = $('div[data-column="' + SYSPRO_VB.column_num + '"] .draggable-row-section').index($('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]'));

                    }

                }).data("kendoSortable");

            });

        },

        // Destroy Data Widgets Kendo Sortable Widget
        destroyDataSorting: function (sortableDataWidgets) {
            for (i = 0; i < sortableDataWidgets.length; i++) {
                sortableDataWidgets[i].draggable.destroy();
                sortableDataWidgets[i].destroy();
            }
        },

        // Initisalise the quick add data widget from the left sidebar
        initQuickAddDataWidgets: function () {
            var quickSortableWidgets = [];

            $('#initial-fields-list .list-group').each(function (index) {

                quickSortableWidgets[index] = $(this).kendoSortable({
                    connectWith: '.data-section',
                    placeholder: SYSPRO_VB.quickPlaceHolderData,
                    hint: SYSPRO_VB.quickHintData,
                    filter: '.quickAddDataWidget',
                    disabled: '.placeholder',
                    cursor: "move",
                    start: function (widget) {
                        $("#draggableCover").show();
                        console.log("start dragging data widget");

                        $(".data-section .panel.add-data-widget").each(function () {
                            $(this).addClass("pulse");
                        });

                        // Need to disable every sortable widget that already has a data widget in it, so it cannot be a valid target
                        $(".draggable-data-section").each(function () {
                            $(this).closest(".data-section").removeClass("data-section").addClass("data-section-disabled");
                        });

                        //this.element.html('<a href="#" class="pull-left text-center add-data-section"><i class="material-icons">note_add</i></a>');
                        if (this.element.find(".add-data-widget")) {
                            SYSPRO_VB.tempHiddenWidg = this.element.find(".add-data-widget");
                            //this.element.find(".add-data-widget").show();
                        }
                        if (this.element.find(".add-data-section")) {
                            this.element.find(".add-data-section").show();
                        }

                    },
                    move: function (widget) {
                        console.log("quick add data move event");
                        SYSPRO_VB.layout_widget_guid = widget.target.parents(".draggable-row-section").data("guid");
                    },
                    end: function () {
                        $("#draggableCover").hide();
                        $(".pulse").each(function () {
                            $(this).removeClass("pulse");
                        });

                        $(".draggable-data-section").each(function () {
                            $(this).closest(".data-section-disabled").removeClass("data-section-disabled").addClass("data-section");
                        });
                    }

                }).data("kendoSortable");
            });
        },

        // Initialise quick add layout widgets for dragging from the left sidebar
        initQuickAddLayoutWidgets: function () {
            var quickAddLayoutWidgets = $('.quick-sortable-list').kendoSortable({
                connectWith: ".sortable-list",
                placeholder: SYSPRO_VB.quickplaceholder,
                hint: SYSPRO_VB.quickhint,
                filter: '>div',
                cursor: "move",
                start: function () {
                    $("#draggableCover").show();
                    $(".sortable-list").each(function () {
                        $(this).addClass("pulse");
                    });

                },
                end: function (widget) {
                    $("#draggableCover").hide();
                    $(".sortable-list").each(function () {
                        $(this).removeClass("pulse");
                    });
                    SYSPRO_VB.endDragWidget(widget);
                }
            }).data("kendoSortable");
        },

        // Toolbar sorting initialisation function for layout widgets
        initToolbarSorting: function () {

            var sortableToolbarWidgets = [];

            $('#navbar-toolbar ul').each(function (index) {

                sortableToolbarWidgets[index] = $(this).kendoSortable({
                    connectWith: '#navbar-toolbar ul',
                    placeholder: SYSPRO_VB.placeholder,
                    hint: SYSPRO_VB.hint,
                    handle: ".toolbar-widget-options .col-xs-6",
                    filter: '>li:not(.add-toolbar-widget)',
                    ignore: ".form-control, .form-group, .form-group *, .dropdown-menu",
                    cursor: "move",
                    start: function (widget) {
                        $("#navbar-toolbar ul").each(function () {
                            $(this).addClass("pulse");
                        });

                        SYSPRO_VB.column_num = widget.item.parents("ul").data("column");
                        //Rob: Now always do a get instead of getByUid so we can use our own Id.
                        SYSPRO_VB.draggedToolbarWidget = viewModel.toolbar.get(widget.item.data("guid"));
                        console.log(widget.item);
                        console.log(SYSPRO_VB.column_num);
                        console.log(SYSPRO_VB.draggedToolbarWidget);
                    },
                    end: function (widget) {
                        $("#navbar-toolbar ul").each(function () {
                            $(this).removeClass("pulse");
                        });

                        if (widget.action === "receive") {

                            var currentToolbarWidgetHTML = widget.item.closest("li");

                            sysproInterop.getHtmlFromModel(
								"ToolbarWidget",
								SYSPRO_VB.draggedToolbarWidgetTempCopy.toJSON(),
								function (result) {
								    var newToolbarWidgetHTMLjQuery = $($.trim(result));
								    currentToolbarWidgetHTML.replaceWith(newToolbarWidgetHTMLjQuery);
								    //sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true);
								    sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', $("#navbar-toolbar"));

								    $.material.init();
								    SYSPRO_VB.initEditRemoveDataWidget();
								    SYSPRO_VB.initToolbarSorting();

								}
							);

                        } else if (widget.action === "remove") {

                            //Rob: Now always do a get instead of getByUid so we can use our own Id.
                            var currentDraggedToolbarWidget = viewModel.toolbar.get($(widget.item).data("guid"));
                            console.log(currentDraggedToolbarWidget);
                            SYSPRO_VB.draggedToolbarWidgetTempCopy = currentDraggedToolbarWidget;
                            viewModel.toolbar.remove(currentDraggedToolbarWidget);

                        } else if (widget.action === "sort") {
                            SYSPRO_VB.draggedToolbarWidgetCopy = SYSPRO_VB.draggedToolbarWidget.toJSON();
                            viewModel.toolbar.remove(SYSPRO_VB.draggedToolbarWidget);
                            viewModel.toolbar.at(SYSPRO_VB.column_num).children.insert(widget.newIndex, SYSPRO_VB.draggedToolbarWidgetCopy);
                            SYSPRO_VB.save();
                        }

                    },
                    change: function (widget) {
                        SYSPRO_VB.finishDragToolbarWidget(widget);
                    },
                    move: function (widget) {
                        SYSPRO_VB.column_num = widget.target.parents("ul").data("column");
                    }
                }).data("kendoSortable");
            });

        },

        // Helper function to stringify a widget before sending to SysproInterop
        stringifyJSONObject: function (objectUid) {

            //Rob: Now always do a get instead of getByUid so we can use our own Id.
            var fullObject = viewModel.dataSource.get(objectUid);

            //Rob: Now always do a get instead of getByUid so we can use our own Id.
            var JSONObject = viewModel.dataSource.get(objectUid).toJSON();

            if (fullObject.Rows) {
                $.each(fullObject.Rows, function (rowKey, rowValue) {
                    if (rowValue.Columns) {
                        $.each(rowValue.Columns, function (columnKey, columnValue) {
                            if (columnValue.Widgets) {
                                $.each(columnValue.Widgets, function (widgetKey, widgetValue) {
                                    //Rob: I replaced uid with Id to be consistent with widgets.
                                    JSONObject.Rows[rowKey].Columns[columnKey].Widgets[widgetKey]["Id"] = widgetValue.Id;
                                });
                            }
                        });
                    }
                });
            }

            JSONObject["Id"] = objectUid;
            var JSONObjectString = JSON.stringify(JSONObject);
            return JSONObject;
        },

        // Helper function to count layout widgets present
        countLayoutWidgets: function (dataSource) {
            var layoutWidgetCount = 0;

            for (var i = 0; i < dataSource._data.length; i++) {
                for (var prop in dataSource._data[i]) {
                    if (prop === "Widgets") {
                        for (var j = 0; j < dataSource._data[i][prop].length; j++) {
                            layoutWidgetCount++;
                        }
                    }

                }
            }

            return layoutWidgetCount;
        },

        // Helper function to count Columns and Available slots in dataSource
        countAvailableSlots: function (dataSource) {
            var columnCount = 0,
	        	dataWidgetCount = 0;

            for (var i = 0; i < dataSource._data.length; i++) {
                for (var prop in dataSource._data[i]) {
                    if (prop === "Widgets") {
                        for (var j = 0; j < dataSource._data[i][prop].length; j++) {
                            if (dataSource._data[i][prop][0].DisplayStyle === 1) {
                                columnCount++;
                            }
                            for (var prop_2 in dataSource._data[i][prop][j]) {
                                if (prop_2 === "Rows") {
                                    for (var k = 0; k < dataSource._data[i][prop][j][prop_2].length; k++) {
                                        for (var prop_3 in dataSource._data[i][prop][j][prop_2][k]) {
                                            if (prop_3 === "Columns") {
                                                for (var l = 0; l < dataSource._data[i][prop][j][prop_2][k][prop_3].length; l++) {

                                                    columnCount++;

                                                    for (var prop_4 in dataSource._data[i][prop][j][prop_2][k][prop_3][l]) {
                                                        if (prop_4 === "Widgets") {
                                                            for (var m = 0; m < dataSource._data[i][prop][j][prop_2][k][prop_3][l][prop_4].length; m++) {

                                                                dataWidgetCount++;

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            var availableDataWidgetCount = columnCount - dataWidgetCount;
            return availableDataWidgetCount;
        },

        // Helper functions to resize UI cover HTML on the quick add data widget sidebar when expanding and collapsing the fields panelbar
        onExpandQuickAddFieldsList: function (e) {
            setTimeout(function () {
                $("#draggableDataCover").height($(e.item).parents('.fields-wrapper').height() + 100);
            }, 300);

        },

        onCollapseQuickAddFieldsList: function (e) {
            setTimeout(function () {
                $("#draggableDataCover").height($(e.item).parents('.fields-wrapper').height() + 100);
            }, 300);

        },

        //Helper function to set correct active states and selected field in view model when a user selects a field from the autopredict search.
        selectFieldFromSearch: function (item) {

            if (SYSPRO_VB.openWindow === 'dataWindow') {
                //SYSPRO_VB.dataWindowPanelBar.collapse($("li"));
                //SYSPRO_VB.dataWindowPanelBar.clearSelection();
                $("#initial-fields-list-data-window-wrapper .list-group-item.active").removeClass("active");
                var currentItem = $("#initial-fields-list-data-window-wrapper .list-group-item[data-field-path='" + item.fieldpath + "']");
                console.log(currentItem);
                currentItem.addClass("active");
                /*
currentItem.parents(".fieldsPanelBar").find(".list-group-item").each(function (index) {
		            $(this).not(currentItem).removeClass("active");
		        });
		        
		        
*/
                SYSPRO_VB.dataWindowFieldsList[0].resetDdMenu();
                SYSPRO_VB.dataWindowFieldsList[0].drillto(currentItem.closest(".dd-parent").parent().closest(".dd-parent"));
                SYSPRO_VB.dataWindowFieldsList[0].drillto(currentItem.closest(".dd-parent"));
                setTimeout(function () {
                    $("#initial-fields-list-data-window").scrollTop($("#initial-fields-list-data-window .list-group-item.active").position().top - 140);
                }, 300);
                //SYSPRO_VB.dataWindowPanelBar.expand(currentItem.parents("li"));

                /*
                                setTimeout(function() {
                                    $("#dataWindow .fields-wrapper").scrollTop(currentItem.position().top);
                                },
                                500);
                */

                if (SYSPRO_VB.dataValidator.validate()) {
                    // If the form is valid, the Validator will return true
                    $("#addDataWidgetButton").removeClass("disabled");
                    $("#addDataWidgetButton").prop("disabled", false);
                    $('#addDataButtonPopoverWrap').popover("destroy");
                }
                if (item.entrytype === undefined) {
                    $("#fieldStylingOptions").show();
                }

            } else if (SYSPRO_VB.openWindow === 'dataEditWindow') {

                viewModel.set("selected.FieldPath", item.fieldpath); //update the viewModel
                viewModel.set("selected.FieldName", ''); //update the viewModel
                viewModel.set("selected.DataType", item.datatype); //update the viewModel
                viewModel.set("selected.HasSmartTag", item.smarttag); //update the viewModel
                /*
SYSPRO_VB.editDataWindowPanelBar.collapse($("li"));
		        SYSPRO_VB.editDataWindowPanelBar.clearSelection();
*/
                $("#initial-fields-list-data-edit-window-wrapper .list-group-item.active").removeClass("active");
                var currentItem = $("#initial-fields-list-data-edit-window-wrapper .list-group-item[data-field-path='" + item.fieldpath + "']");
                currentItem.addClass("active");

                SYSPRO_VB.dataEditWindowFieldsList[0].resetDdMenu();
                SYSPRO_VB.dataEditWindowFieldsList[0].drillto(currentItem.closest(".dd-parent").parent().closest(".dd-parent"));
                SYSPRO_VB.dataEditWindowFieldsList[0].drillto(currentItem.closest(".dd-parent"));
                setTimeout(function () {
                    $("#initial-fields-list-data-edit-window").scrollTop($("#initial-fields-list-data-edit-window .list-group-item.active").position().top - 140);
                }, 300);

                /*
currentItem.parents(".fieldsPanelBar").find(".list-group-item").each(function (index) {
		            $(this).not(currentItem).removeClass("active");
		        });
				SYSPRO_VB.editDataWindowPanelBar.expand(currentItem.parents("li"));
				
				setTimeout(function() {
					$("#dataEditWindow .fields-wrapper").scrollTop(currentItem.position().top);
				},
				500);
*/
            }

        },
        hideErrorMessage: function () {
            console.log("hideErrorMessage");
            if (SYSPRO_VB.errorNotification)
                SYSPRO_VB.errorNotification.hide();
        },
        // Error Notification display function
        showErrorMessage: function (message, title) {

            title = title || "Sorry, something has gone wrong. The technical error message is:";

            function onShow(e) {
                if (e.sender.getNotifications().length == 1) {
                    var element = e.element.parent(),
		                eWidth = element.width(),
		                eHeight = element.height(),
		                wWidth = $(window).width(),
		                wHeight = $(window).height(),
		                newTop, newLeft;

                    newLeft = Math.floor(wWidth / 2 - eWidth / 2);
                    newTop = Math.floor(wHeight / 2 - eHeight / 2);

                    e.element.parent().css({ top: newTop, left: newLeft });
                }
            }

            // Error Notification setup
            SYSPRO_VB.errorNotification = $("#errorNotification").kendoNotification({
                position: {
                    pinned: true
                },
                autoHideAfter: 0,
                button: true,
                show: onShow,
                stacking: "down",
                templates: [{
                    type: "error",
                    template: $("#errorTemplate").html()
                }]

            }).data("kendoNotification");

            SYSPRO_VB.errorNotification.show({
                title: title,
                message: message
            }, "error");
        },

        initiateTiles: function (tileWidget) {
            console.log("initiateTiles");
            console.log(tileWidget);

            if (tileWidget.Rows[0].Columns) {
                var tileWidgetId = tileWidget.Id;

                $.when(
			        $.each(tileWidget.Rows[0].Columns, function (index) {
			            console.log("each tile");
			            var currColumn = this;
			            console.log("Column Logged  - " + currColumn.Id)

			            currColumn.Widgets[0].HTMLContent = function () {

			                var uid = sysproInterop.generateUUID();
			                sysproInterop.getHtmlFromModel("Widget", currColumn.Widgets[0].toJSON(), function (result) {
			                    var cardHTMLObjectjQuery = $($.trim(result));
			                    $("#async_" + uid).html($.trim(result));
			                    //sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, null, $("#async_" + uid));
			                    kendo.bind($("#async_" + uid), viewModel);
			                },
		                    '', '', '',
		                    function (error) { console.log(error) }
		                    );

			                return "<div id='async_" + uid + "'> </div>";
			            };

			        })
			    ).then(function () {
			        $('.layout-widget[data-guid="' + tileWidgetId + '"] .tile-widget').kendoListView({
			            dataSource: tileWidget.Rows[0].Columns,
			            template: kendo.template($("#tileTemplate").html()),


			            /*
dataBound: function() {
				            console.log('dataBound event from kendoListView');
				            console.log('div[data-guid="' + tileWidgetId + '"] .tile-widget');
							//sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', $('div[data-guid="' + tileWidgetId + '"] .tile-widget')); 
			                //console.log('before performBind end of initiateTiles');
							sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, null, $('div[data-guid="' + tileWidgetId + '"] .tile-widget'), SYSPRO_VB.sizeTiles);   
							//SYSPRO_VB.sizeTiles(0);
							SYSPRO_VB.initAddDataWidgets();
			            }
*/


			        });

			        $('.layout-widget[data-guid="' + tileWidgetId + '"] .tile-widget').append('<div class="col-sm-3 col-xs-6 tile unsortable-tile"><div class="panel sys-widget sys-box-shadow-off sys-mg-off add-data-widget tile-inner"> <div class="panel-body text-center sys-fg-primary"> <a href="#" class="pull-left text-center add-data-section" data-tooltip="tooltip" data-placement="top" data-original-title="Add Tile"> <i class="material-icons">note_add</i></a></div></div></div>');
			        $('.layout-widget[data-guid="' + tileWidgetId + '"] .tile-widget').prepend('<div class="tile col-xs-3 col-sm-3 tile-width-marker"></div>');

			        $('.layout-widget[data-guid="' + tileWidgetId + '"] .tile-widget').kendoSortable({
			            filter: ">div.tile",
			            disabled: '.unsortable-tile, .tile-width-marker',
			            handle: '.drag-row-section',
			            cursor: "move",
			            placeholder: function (element) {
			                return element.clone().css("opacity", 0.1);
			            },
			            hint: function (element) {
			                var originalWidth = element.width();
			                return element.clone().removeClass("k-state-selected").width(originalWidth);
			            },
			            change: function (e) {
			                console.log(e.oldIndex);
			                console.log(e.newIndex);
			                console.log(e.item);
			                var dataItem = viewModel.dataSource.get(e.item.data("guid"));
			                console.log(dataItem);
			                var parentTileWidget = viewModel.dataSource.get($(e.item).parents(".layout-widget").data("guid"));
			                console.log(parentTileWidget);
			                viewModel.dataSource.remove(dataItem);
			                console.log(parentTileWidget);
			                parentTileWidget.children.at(0).children.insert(e.newIndex, dataItem);
			                console.log(parentTileWidget);

			                if (!$('.layout-widget[data-guid="' + parentTileWidget.Id + '"] .tile-widget').find(".unsortable-tile").length)
			                    $('.layout-widget[data-guid="' + parentTileWidget.Id + '"] .tile-widget').append('<div class="col-sm-3 col-xs-6 tile unsortable-tile"><div class="panel sys-widget sys-box-shadow-off sys-mg-off add-data-widget tile-inner"> <div class="panel-body text-center sys-fg-primary"> <a href="#" class="pull-left text-center add-data-section" data-tooltip="tooltip" data-placement="top" data-original-title="Add Tile"> <i class="material-icons">note_add</i></a></div></div></div>');

			                if (!$('.layout-widget[data-guid="' + parentTileWidget.Id + '"] .tile-widget').find(".tile-width-marker").length)
			                    $('.layout-widget[data-guid="' + parentTileWidget.Id + '"] .tile-widget').prepend('<div class="tile col-xs-3 col-sm-3 tile-width-marker"></div>');

			                /*
if ( !$('.layout-widget[data-guid="' + parentTileWidget.Id + '"]').children(".tile-loading-cover").length )
								$('.layout-widget[data-guid="' + parentTileWidget.Id + '"]').children('.panel-body').first().prepend('<div class="tile-loading-cover"><div class="loader"><div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div></div>');
*/


			                console.log('tile sortable change event');
			                console.log('div[data-guid="' + tileWidgetId + '"] .tile-widget');
			                sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, null, $('div[data-guid="' + tileWidgetId + '"] .tile-widget-wrapper'), SYSPRO_VB.sizeTilesCallback);


			                SYSPRO_VB.initAddDataWidgets();
			                /*
		setTimeout(function() {
				                console.log('div[data-guid="' + parentTileWidget.Id + '"] .tile-widget');
								sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, null, $('div[data-guid="' + parentTileWidget.Id + '"] .tile-widget')); 
								//sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true);
			                
								SYSPRO_VB.sizeTiles(100);
								SYSPRO_VB.initAddDataWidgets();
				            }, 180);
		*/

			            }
			        });

			        // Tiles initialisation JS
			        SYSPRO_VB.initAddDataWidgets();
			        SYSPRO_VB.sizeTiles(300, '.layout-widget[data-guid="' + tileWidgetId + '"]');
			        /*
                                        $.each($(".sparkline-widget-chart:visible"), function (index) {
                                            var chartSelected = $(this);
                            
                                            if (chartSelected.data("kendoChart")) {
                    */
			        //SYSPRO_VB.initTileHover();
			    });

            }



        },

        // Initialise the hover zoom/detail functionality of tiles
        initTileHover: function () {
            $(".tile").not(".unsortable-tile").mouseenter(function () {
                console.log("here i is");
                var zoomTile = $(this).clone();
                zoomTile.addClass("zoom-tile").find(".data-widget-options").remove();
                zoomTile.data("guid", "").attr("data-guid", "");
                zoomTile.height($(this).height() * 1.5).width($(this).width() * 1.5);
                zoomTile.insertAfter($(this));

                sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, '', $('div[data-guid="' + zoomTile.parents(".layout-widget").data("guid") + '"]'));
                zoomTile.fadeIn(250);
                /*
var sparkline = $(this).find(".sparkline-widget-chart").data("kendoChart");
			    console.log(sparkline);
			    sparkline.refresh();
			    sparkline.exportPDF();
*/

                zoomTile.mouseleave(function () {
                    zoomTile.fadeOut(300, function () {
                        $(".zoom-tile").remove();
                    });
                });
            });
        },

        getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        sizeTiles: function (delay, prefix) {
            console.log('size the tiles');
            console.log(prefix);
            delay = delay || 100;
            prefix = prefix || '';
            console.log(prefix);
            if ($('.tile:not(.unsortable-tile)').length) {
                console.log($(prefix + " .tile-widget-wrapper"));
                setTimeout(function () {
                    $(prefix + " .tile-widget-wrapper").each(function (index) {
                        var tw = this;
                        $(tw).find('.tile-loading-cover').show();

                        console.log('start tile widget resize');
                        console.log(tw);

                       // kendo.bind($(tw), sysproInterop.viewModel);

                        $.when(
							$(tw).find(".tile:not(.tile-width-marker)").velocity({ height: $(tw).find(".tile-width-marker").first().width() }, 80, "linear", function () {
							    console.log('tile size animate function callback function');
							    var that = this;
							    console.log(that);
							    console.log($(that));

							    if ($(that).hasClass('col-xs-3')) {
							        // Wait for CSS transition animation	
							        $(that).find(".transition-element").one("transitionend",
									 	function (a) {
									 	    if ($(that).find('.small-tile .tile-top-half') && $(that).find('.small-tile .tile-top-half').length) {
									 	        console.log('start bottom/top half resize');
									 	        var topHalfHeight = $(that).find('.small-tile .tile-top-half').height();
									 	        var parentHeight = $(that).find('.small-tile .tile-top-half').parent().height();
									 	        var bottomHalfHeight = $(that).find('.small-tile .tile-bottom-half').height();

									 	        $(that).find('.small-tile .tile-bottom-half').css('margin-top', Math.max((parentHeight - topHalfHeight - bottomHalfHeight - 10), 0));
									 	    }
									 	    console.log('small tile animation complete');
									 	    console.log(that);
									 	    /* 											$(this).off(a); */
									 	}
									);

							        $(that).find(".small-tile .tile-title").fitText(0.8);
							        $(that).find(".small-tile .tile-subtitle").fitText(1.1);
							        $(that).find(".small-tile .tile-value-label").fitText(1.1);
							        $(that).find(".small-tile .tile-main-value").slabText({
							            fontRatio: 1,
							            noResizeEvent: true,
							            maxFontSize: 70
							        });
							        $(that).find(".small-tile .tile-icon").slabText({
							            /* 										fontRatio: 1, */
							            noResizeEvent: true
							        });


							    } else {
							        // Wait for CSS transition animation
							        $(that).find(".transition-element").one("transitionend",
									 	function (a) {
									 	    if ($(that).find('.wide-tile .tile-top-half') && $(that).find('.wide-tile .tile-top-half').length) {
									 	        console.log('start bottom/top half resize');
									 	        var topHalfHeight = $(that).find('.wide-tile .tile-top-half').height();
									 	        var parentHeight = $(that).find('.wide-tile .tile-top-half').parent().height();
									 	        var bottomHalfHeight = $(that).find('.wide-tile .tile-bottom-half').height();

									 	        $(that).find('.wide-tile .tile-bottom-half').css('margin-top', Math.max((parentHeight - topHalfHeight - bottomHalfHeight - 2), 0));
									 	    }
									 	    console.log('wide tile animation complete');
									 	    console.log(that);
									 	    /* 											$(this).off(a); */
									 	}
									);

							        $(that).find(".wide-tile .col-xs-12 .tile-title").fitText(1);
							        $(that).find(".wide-tile .col-xs-12 .tile-subtitle").fitText(1.4);
							        $(that).find(".wide-tile .col-xs-12 .tile-value-label").fitText(1.5);
							        $(that).find(".wide-tile .col-xs-6 .tile-title").fitText(0.7);
							        $(that).find(".wide-tile .col-xs-6 .tile-subtitle").fitText(1);
							        $(that).find(".wide-tile .col-xs-6 .tile-value-label").fitText(1);
							        $(that).find(".wide-tile .col-xs-12 .tile-main-value").fitText(0.7);
							        $(that).find(".wide-tile .col-xs-6 .tile-main-value").slabText({
							            fontRatio: 1,
							            noResizeEvent: true,
							            maxFontSize: 70
							        });
							        $(that).find(".wide-tile .tile-icon").slabText({
							            /* 										fontRatio: 1, */
							            noResizeEvent: true
							        });

							    }

							})
						).done(function () {
						    //sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, null, $(tw), function () {
						    //    setTimeout(function () {
						    //        console.log('hide the tile cover');
						    //        $(tw).find('.tile-loading-cover').hide();
						    //    }, 400);
						    //});
						    console.log('hide the tile cover');
						    $(tw).find('.tile-loading-cover').hide();
						})
                    });

                }, delay);
            }
        },

        // Callback function for calling sizeTiles from performBind callback
        sizeTilesCallback: function (no_error, msg) {
            if (no_error) {
                SYSPRO_VB.sizeTiles();
            } else {
                SYSPRO_VB.showErrorMessage(msg);
            }

        },

        initiateExistingTiles: function () {
            $('.tile-widget').each(function (i) {
                $(this).parents('.layout-widget').find(".data-section").removeClass("data-section");
                $(this).parents('.layout-widget').children(".col-sm-12").addClass("tile-widget-wrapper");
                $(this).parents('.layout-widget').find(".panel-body").first().prepend('<div class="tile-loading-cover"><div class="loader"><div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div></div>');
                if ($(this).parents('.layout-widget').data("guid")) {
                    var tileWidget = viewModel.dataSource.get($(this).parents('.layout-widget').data("guid"));
                    SYSPRO_VB.initiateTiles(tileWidget);
                }
            });
        },

        // General local JSON loading function, using vanilla JavaScript - tailored for icons
        loadIconJSON: function (callback) {
            sysproInterop.getIconsAvailable(callback);
        },

        // PanelBar Initialisation helper
        initialisePanelBar: function (PanelBar) {
            $(PanelBar).on("click", ".list-group-item", function (event) {
                $(this).addClass("active");
                var currentItem = $(this);
                $(PanelBar).find(".list-group-item").each(function (index) {
                    $(this).not(currentItem).removeClass("active");
                });
            });
        },

        // Fuction to create a Kendo UI Window
        createKendoWindow: function (windowID, windowTitle, openFunction, closeFunction) {
            $("#" + windowID).kendoWindow({ //create a window
                actions: [],
                draggable: true,
                minHeight: "500px",
                minWidth: "800px",
                width: "900px",
                height: "550px",
                modal: true,
                pinned: true,
                position: {
                    top: "50%",
                    left: "50%"
                },
                animation: {
                    open: {
                        effects: "fade:in",
                        duration: 200
                    },
                    close: {
                        effects: "fade:out",
                        duration: 200
                    }
                },
                resizable: true,
                title: windowTitle,

                visible: false,
                open: openFunction,
                close: closeFunction
            });

            return $("#" + windowID).data("kendoWindow");
        },

        // function to load external templates into the main HTML file
        templateLoader: function () {
            //Loads external templates from path and injects in to page DOM
            return {
                //Method: loadExtTemplate
                //Params: (string) path: the relative path to a file that contains template definition(s)
                loadExtTemplate: function (path) {
                    //Use jQuery Ajax to fetch the template file
                    var tmplLoader = $.get(path)
	                    .success(function (result) {
	                        //On success, Add templates to DOM (assumes file only has template definitions)
	                        $("body").append(result);
	                    })
	                    .error(function (result) {
	                        alert("Error Loading Templates -- TODO: Better Error Handling");
	                    })

                    tmplLoader.complete(function () {
                        //Publish an event that indicates when a template is done loading
                        $(document).trigger("TEMPLATE_LOADED", [path]);
                    });
                }
            };
        },

        // Helper function to initialise multipane functinality of windows
        initialiseMultiPaneWindow: function (windowElement) {
            $(windowElement + " .window-content .add-icon-option").on("click", ".select-icon", function (e) {
                e.preventDefault();
                $(windowElement + " .data-section-pane-1").fadeOut(300, function () {
                    $(windowElement + " .data-section-pane-2").fadeIn(300);
                    if (SYSPRO_VB.currentDataWidget && SYSPRO_VB.currentDataWidget.Icon.Name) {
                        var activeIcon = $(windowElement + " label[data-icon-name='" + SYSPRO_VB.currentDataWidget.Icon.Name + "']");
                        setTimeout(
			            	function () { $(windowElement + " .icon-field-container").scrollTop($(windowElement + " .icon-field-container").scrollTop() + activeIcon.position().top - 193) },
			            	300
			            );
                    }

                    if (SYSPRO_VB.currentLayoutWidget && SYSPRO_VB.currentLayoutWidget.Icon) {
                        var activeIcon = $(windowElement + " label[data-icon-name='" + SYSPRO_VB.currentLayoutWidget.Icon + "']");
                        setTimeout(
			            	function () { $(windowElement + " .icon-field-container").scrollTop($(windowElement + " .icon-field-container").scrollTop() + activeIcon.position().top - 193) },
			            	300
			            );
                    }
                });
            });

            $(windowElement + " .window-container").on("click", ".back-to-data-section", function (e) {
                e.preventDefault();
                $(windowElement + " .data-section-pane-2").fadeOut(300, function () {
                    $(windowElement + " .data-section-pane-1").fadeIn(300);
                });
            });
        },

        // Generic helper function to retrieve a value from the fields JSON
        getPropertyValue: function (fieldObject, property) {
            if (property === "HasSmartTag") {
                var itemString = "false";
            } else {
                var itemString = "";
            }

            for (var key in fieldObject) {
                if (key === property) {
                    itemString = fieldObject[key];
                }
            }
            return itemString;
        },

        // Specific helper function to grab captions with secondary captions
        getCaption: function (fieldObject) {
            var captionString = "";
            for (var key in fieldObject) {
                if (key == "Caption") {
                    captionString = fieldObject[key];
                }
            }
            var pureCaption = captionString.replace("[", "").replace("]", "");
            var shortCaption = captionString.replace(/\[.*\]/g, "");
            captionString = captionString.replace("[", "<span class='secondaryCaption'>(");
            captionString = captionString.replace("]", ")</span>");
            return [captionString, pureCaption, shortCaption];
        },

        // Helper fuction to process Available Cards from the XML/JSON
        processCards: function (cardsObject, cardIndex) {
            if (cardsObject.length) {
                var cardObject = cardsObject[cardIndex];
            } else {
                var cardObject = cardsObject;
            }

            var cardsQuickAddHTML = "",
				cardsLayoutWindowHTML = "",
				cardsEditLayoutWindowHTML = "",
				WidgetType = cardObject.Name,
				WidgetName = cardObject.Name + "_card",
				widgetDescription = cardObject.Description;
            cardsQuickAddHTML += '<div class="col-xs-6 mb-10 draggable quickAddWidget quickAddCard" id="' + WidgetName + '" value="' + WidgetName + '" data-layout-widget-type="Card" data-layout-widget-subtype="MaxiCard" data-card-type-detail="' + WidgetType + '" data-layout-widget-displaystyle="0" data-parent-field-path="';

            if (cardObject.KeyField && cardObject.KeyField.length) {
                cardsQuickAddHTML += 'Fields.SYSPROKeyData.' + cardObject.KeyField + '.Value';
                var ParentFieldPath = 'Fields.SYSPROKeyData.' + cardObject.KeyField + '.Value';
            } else {
                var ParentFieldPath = "";
            }

            cardsQuickAddHTML += '"><div class="draggableLayoutWidget draggable"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ' + widgetDescription + ' </div></div>';


            cardsLayoutWindowHTML += '<label class="btn btn-radio col-sm-5 text-left no-sunken" data-tooltip="tooltip" data-placement="top" title=" ' + widgetDescription + ' "><input type="radio" name="row_options" id="' + WidgetName + '" value="' + WidgetName + '" autocomplete="off" data-layout-widget-type="Card" data-layout-widget-subtype="MaxiCard" data-layout-widget-displaystyle="0" data-card-type-detail="' + WidgetType + '" data-parent-field-path="';

            if (cardObject.KeyField && cardObject.KeyField.length) {
                cardsLayoutWindowHTML += 'Fields.SYSPROKeyData.' + cardObject.KeyField + '.Value';
            }

            cardsLayoutWindowHTML += '" required="required"><i class="material-icons text-muted">panorama_fish_eye</i><i class="material-icons text-success">check_circle</i> ' + widgetDescription.replace(/ Card$/, "") + '</label>';

            cardsEditLayoutWindowHTML += '<label class="btn btn-radio col-sm-5 text-left no-sunken" data-tooltip="tooltip" data-placement="top" title=" ' + widgetDescription + ' "><input data-bind="checked: selected.WidgetName" type="radio" name="row_options" id="' + WidgetName + '" value="' + WidgetName + '" autocomplete="off" data-layout-widget-type="Card" data-layout-widget-subtype="MaxiCard" data-layout-widget-displaystyle="0" data-card-type-detail="' + WidgetType + '" data-parent-field-path="';

            if (cardObject.KeyField && cardObject.KeyField.length) {
                cardsEditLayoutWindowHTML += 'Fields.SYSPROKeyData.' + cardObject.KeyField + '.Value';
            }

            cardsEditLayoutWindowHTML += '" required="required"><i class="material-icons text-muted">panorama_fish_eye</i><i class="material-icons text-success">check_circle</i> ' + widgetDescription.replace(/ Card$/, "") + '</label>';

            var cardHTMLObject = SYSPRO_VB.setupFinalLayoutWidget("", WidgetName, "", "Card", "MaxiCard", false, 0, 0, 9, 8, "Joined", "", "", "", WidgetType, ParentFieldPath, 0, 9, 0, 9, "");
            sysproInterop.getHtmlFromModel("Widget", cardHTMLObject.toJSON(), function (result) {
                var cardHTMLObjectjQuery = $($.trim(result));
                cardHTMLObjectjQuery.find(".remove-row-section, .edit-row-section, .drag-row-section, .layout-widget-options").remove();
                SYSPRO_VB.cardsHTML[WidgetName] = cardHTMLObjectjQuery;
                if (cardsObject.length) {
                    cardIndex++;
                    if (cardIndex < cardsObject.length) {
                        SYSPRO_VB.processCards(cardsObject, cardIndex);
                    }
                }
            },
		    '', '', '',
		    function (error) { console.log(error) }
		    );

            $("#quick-add-layout .quick-sortable-list.row").append(cardsQuickAddHTML);
            $("#AvailableCards .layout-radio-options").append(cardsLayoutWindowHTML);
            $("#editCard .layout-radio-options").append(cardsEditLayoutWindowHTML);

        },

        // Helper fuction to process Available Harmony Widgets from the XML/JSON
        processHarmony: function (harmonyWidgetsObject, harmonyIndex) {
            if (harmonyWidgetsObject.length) {
                var harmonyWidgetObject = harmonyWidgetsObject[harmonyIndex];
            } else {
                var harmonyWidgetObject = harmonyWidgetsObject;
            }

            var harmonyQuickAddHTML = "",
				harmonyLayoutWindowHTML = "",
				harmonyEditLayoutWindowHTML = "",
				WidgetID = harmonyWidgetObject.ComponentId,
				WidgetName = harmonyWidgetObject.Name,
				widgetDescription = harmonyWidgetObject.Description;
            harmonyQuickAddHTML += '<div class="col-xs-6 mb-10 draggable quickAddWidget quickAddCard" id="' + WidgetName + '" value="' + WidgetName + '" data-layout-widget-type="HarmonyWidget" data-layout-widget-subtype="MaxiWidget" data-layout-widget-displaystyle="0" data-component-id="' + WidgetID + '"><div class="draggableLayoutWidget draggable"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ' + widgetDescription + ' </div></div>';

            harmonyLayoutWindowHTML += '<label class="btn btn-radio col-sm-5 text-left no-sunken" data-tooltip="tooltip" data-placement="top" title=" ' + widgetDescription + ' "><input type="radio" name="row_options" id="' + WidgetName + '" value="' + WidgetName + '" autocomplete="off" data-layout-widget-type="HarmonyWidget" data-layout-widget-subtype="MaxiWidget" data-layout-widget-displaystyle="0" data-component-id="' + WidgetID + '" required="required"><i class="material-icons text-muted">panorama_fish_eye</i><i class="material-icons text-success">check_circle</i> ' + widgetDescription + '</label>';

            harmonyEditLayoutWindowHTML += '<label class="btn btn-radio col-sm-5 text-left no-sunken" data-tooltip="tooltip" data-placement="top" title=" ' + widgetDescription + ' "><input data-bind="checked: selected.WidgetName" type="radio" name="row_options" id="' + WidgetName + '" value="' + WidgetName + '" autocomplete="off" data-layout-widget-type="HarmonyWidget" data-layout-widget-subtype="MaxiWidget" data-layout-widget-displaystyle="0" data-component-id="' + WidgetID + '" required="required"><i class="material-icons text-muted">panorama_fish_eye</i><i class="material-icons text-success">check_circle</i> ' + widgetDescription + '</label>';

            var harmonyHTMLObject = SYSPRO_VB.setupFinalLayoutWidget("", WidgetName, "", "HarmonyWidget", "MaxiWidget", false, 0, 0, 9, 8, "Joined", "", "", "", "", "", 0, 9, 0, 9, "", null, null, null, WidgetID);

            sysproInterop.getHtmlFromModel("Widget", harmonyHTMLObject.toJSON(), function (result) {
                var harmonyHTMLObjectjQuery = $($.trim(result));
                harmonyHTMLObjectjQuery.find(".remove-row-section, .edit-row-section, .drag-row-section, .layout-widget-options").remove();
                SYSPRO_VB.harmonyHTML[WidgetName] = harmonyHTMLObjectjQuery;
                if (harmonyWidgetsObject.length) {
                    harmonyIndex++;
                    if (harmonyIndex < harmonyWidgetsObject.length) {
                        SYSPRO_VB.processHarmony(harmonyWidgetsObject, harmonyIndex);
                    }
                }
            },
		    '', '', '',
		    function (error) { console.log(error) }
		    );

            $("#quick-add-layout .quick-sortable-list.row").append(harmonyQuickAddHTML);
            $("#HarmonyWidgets .layout-radio-options").append(harmonyLayoutWindowHTML);
            $("#EditHarmonyWidgets .layout-radio-options").append(harmonyEditLayoutWindowHTML);

        },

        // initialise date pickers
        initDatePicker: function (prefix) {
            $(prefix + ' .date').datetimepicker({
                format: sysproInterop.dateFormat.toUpperCase(), icons: {
                    time: 'material-icons',
                    date: 'material-icons',
                    up: 'material-icons',
                    down: 'material-icons',
                    previous: 'material-icons',
                    next: 'material-icons',
                    today: 'material-icons',
                    clear: 'material-icons',
                    close: 'material-icons'
                }
            });

            /*
$(prefix + ' .date .material-icons').each(function(index) {
				var that = this;
				var className = that.className.match(/iconclass-(.+)/)[1];
				console.log(className);
				$(that).text(className.split('iconclass-')[1]);
			});	
*/
        },

        // Object for cloning HTML elements in the Quick add
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
    }

    window.SYSPRO_VB = SYSPRO_VB;

}());

var templateLoader = (function ($, host) {
    //Loads external templates from path and injects in to page DOM
    return {
        //Method: loadExtTemplate
        //Params: (string) path: the relative path to a file that contains template definition(s)
        loadExtTemplate: function (path) {
            //Use jQuery Ajax to fetch the template file
            var tmplLoader = $.get(path)
                .success(function (result) {
                    //On success, Add templates to DOM (assumes file only has template definitions)
                    $("body").append(result);
                })
                .error(function (result) {
                    alert("Error Loading Templates -- TODO: Better Error Handling");
                })

            tmplLoader.complete(function () {
                //Publish an event that indicates when a template is done loading
                $(host).trigger("TEMPLATE_LOADED", [path]);
            });
        }
    };
})(jQuery, document);