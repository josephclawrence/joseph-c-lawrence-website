/******************************/
/* SYSPRO Visual Builder JS   */
/*							  */
/*							  */
/******************************/

var initColumns = [
	{
	    Index: 0,
	    ResponsiveStyle: 3,
	    Widgets: []
	},
	{
	    Index: 1,
	    ResponsiveStyle: 3,
	    Widgets: []
	},
	{
	    Index: 2,
	    ResponsiveStyle: 3,
	    Widgets: []
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

var parentModel = kendo.data.Node.define({
    id: "Id",
    children: WidgetsSch,
});

var column1InputId = sysproInterop.generateUUID();
var column2InputId = sysproInterop.generateUUID();

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

var viewModel;


$(window).load(function () {
    SYSPRO_VB.init();
    $("#loading-cover").fadeOut();
})

var SYSPRO_VB = {

    history: [],
    historyIndex: 0,
	fieldsJSON: [],
	linkFieldsJSON: [],
	entryFieldsJSON: [],
	tilesJSON: {},
    //Initisalisation function
    init: function () {
	    
	    // Initialise form JS
	    $.material.init();
	    $(".dropdown-select").dropdown({ "autoinit" : ".dropdown-select" });
	    $('.date-input').bootstrapMaterialDatePicker({ weekStart : 0, time: false });
	    $(document).ready(function(){
		    $('.combobox').combobox({newOptionsAllowed: true});
			Inputmask().mask(document.querySelectorAll("input"));
		});
			
        sysproInterop.getModel("", function (dataout) {
	        console.log(dataout);
            viewModel = kendo.observable({
                //create a dataSource
                dataSource: new kendo.data.HierarchicalDataSource({
                    data: dataout,
                    schema: {
                        model: parentModel
                    }
                }),
                selected: {}, //this field will contain the edited dataItem
                columnLayout: '3col' //this field will contain the overall column layout type
            });

            viewModel.dataSource.read(); //invoke the read transport of the DataSource
            //Load the invisible treeview in the visual builder to load the entire existing datasource.
            $("#invisibleNode").kendoTreeView({
                dataSource: viewModel.dataSource,
                dataTextField: "TypeName",
                loadOnDemand: false
            });

            SYSPRO_VB.history[SYSPRO_VB.historyIndex] = [JSON.stringify(viewModel.dataSource.data().toJSON()), viewModel.columnLayout];
            SYSPRO_VB.historyIndex++;
            //ROB: Reset changes  on load so it doesnn't  always prompt  to  save  changes.
            sysproInterop.internalHistoryIndex = SYSPRO_VB.historyIndex;
            sysproInterop.internalHistoryChange = 0;
            kendo.bind($("#dataEditWindow"), viewModel);
            kendo.bind($("#rowEditWindow"), viewModel);
            SYSPRO_VB.dataEditValidator = $("#dataEditWindow").kendoValidator().data("kendoValidator"); //create a validator instance
            SYSPRO_VB.layoutValidator = $("#rowWindow").kendoValidator().data("kendoValidator"); //create a validator instance
            SYSPRO_VB.layoutEditValidator = $("#rowEditWindow").kendoValidator().data("kendoValidator"); //create a validator instance
            SYSPRO_VB.dataValidator = $("#dataWindow").kendoValidator().data("kendoValidator"); //create a validator instance

            sysproInterop.getAvailableFields(
				function (bindable_fields_data) {
					SYSPRO_VB.bindableFieldsData = bindable_fields_data;
				    SYSPRO_VB.fieldsDisplayViewModel = kendo.observable({
				        dataSource: new kendo.data.HierarchicalDataSource({
				            data: bindable_fields_data,
				            schema: {
				                data: function (response) {
				                    var result = [{ Fields: [] }];
				                    var newObj = {};
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
		            fields_data = fields_data.Fields;
					console.log(fields_data);
		            SYSPRO_VB.fieldsListDataSource = new kendo.data.HierarchicalDataSource({

		                data: fields_data,
		                schema: {
		                    data: function (response) {
			                    
		                        var results = $.map(response, function (obj, index) {
		                            if (index != "Charts" && index != "CardsAvailable" && index != "LinksAvailable" && index != "SYSPROKeyData" && index != "TilesAvailable" && index != "EntryFields") {
		                                function formatFields(obj) {
		                                    var itemsString = "";
		                                    var itemsArray = [];
		                                    for (var key in obj) {

		                                            var fieldObject = obj[key];
		                                            var fieldPath = key;
		                                            var caption = getCaption(fieldObject);
		                                            var smartTag = getSmartTag(fieldObject);
		                                            var dataType = getDataType(fieldObject);
		                                            var formattedFieldPath = fieldPath.split(' ').join('_');
		                                            itemsString += '<li class="list-group-item quickAddDataWidget field-name" id="' + formattedFieldPath + '" data-bind="dataPath: selected.FieldPath" data-field-path="Fields.' + fieldPath + '" data-smart-tag="' + smartTag + '" data-data-type="' + dataType + '"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ' + caption + '</li>';
		                                            if ( caption != '' ) {
			                                            SYSPRO_VB.fieldsJSON.push({
				                                            fieldpath: "Fields." + fieldPath,
				                                            smarttag: smartTag,
				                                            datatype: dataType,
				                                            name: caption
			                                            });
			                                            SYSPRO_VB.entryFieldsJSON.push({
				                                            fieldpath: "Fields." + fieldPath,
				                                            smarttag: smartTag,
				                                            datatype: dataType,
				                                            name: caption
			                                            });
			                                            
			                                        }
		                                    }
		                                    return itemsString;

		                                    function getFieldPath(fieldObject) {
		                                        var itemString = "";
		                                        for (var key in fieldObject) {
		                                            if (key === "FieldPath") {
		                                                itemString = fieldObject[key];
		                                            }
		                                        }
		                                        return itemString;
		                                    }

		                                    function getCaption(fieldObject) {
		                                        var captionString = "";
		                                        for (var key in fieldObject) {
		                                            if (key == "Caption") {
		                                                captionString = fieldObject[key];
		                                            }
		                                        }
		                                        captionString = captionString.replace("[", "<span class='secondaryCaption'>(");
		                                        captionString = captionString.replace("]", ")</span>");
		                                        return captionString;
		                                    }

		                                    function getSmartTag(fieldObject) {
		                                        var captionString = "false";
		                                        for (var key in fieldObject) {
		                                            if (key === "HasSmartTag") {
		                                                captionString = fieldObject[key];
		                                            }
		                                        }
		                                        return captionString;
		                                    }

		                                    function getDataType(fieldObject) {
		                                        var dataTypeString = "";
		                                        for (var key in fieldObject) {
		                                            if (key === "DataType") {
		                                                dataTypeString = fieldObject[key];
		                                            }
		                                        }
		                                        return dataTypeString;
		                                    }
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
			                                    
		                                            var fieldObject = tileObj[tc];
		                                            var keyField = getKeyField(fieldObject);
		                                            var description = getDescription(fieldObject);
		                                            var name = getName(fieldObject);
		                                            var tileType = getTileType(fieldObject);
		                                            var formattedFieldPath = keyField.split(' ').join('_');
		                                            itemsString += '<li data-bind="tileBind: selected.Widgets[0].TileTypeDetail" class="list-group-item" id="' + name + '" data-tile-type="' + tileType + '" data-tile-keyfield="' + keyField + '" data-tile-name="' + name + '"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ' + description + '</li>';
		                                            SYSPRO_VB.tilesJSON[name] = fieldObject.Parameters;
			                                    }
		                                    } else {
/* 			                                        var fieldObject = tileObj[key]; */
	                                            var keyField = getKeyField(tileObj);
	                                            var description = getDescription(tileObj);
	                                            var name = getName(tileObj);
	                                            var tileType = getTileType(tileObj);
	                                            var formattedFieldPath = keyField.split(' ').join('_');
	                                            itemsString += '<li data-bind="tileBind: selected.Widgets[0].TileTypeDetail" class="list-group-item" id="' + name + '" data-tile-type="' + tileType + '" data-tile-keyfield="' + keyField + '" data-tile-name="' + name + '"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ' + description + '</li>';
	                                            SYSPRO_VB.tilesJSON[name] = tileObj.Parameters;

		                                    }
		                                    return itemsString;

		                                    function getKeyField(fieldObject) {
		                                        var itemString = "";
		                                        for (var key in fieldObject) {
		                                            if (key === "KeyField") {
		                                                itemString = fieldObject[key];
		                                            }
		                                        }
		                                        return itemString;
		                                    }

		                                    function getDescription(fieldObject) {
		                                        var descriptionString = "false";
		                                        for (var key in fieldObject) {
		                                            if (key === "Description") {
		                                                descriptionString = fieldObject[key];
		                                            }
		                                        }
		                                        return descriptionString;
		                                    }
		                                    
		                                    function getTileType(fieldObject) {
		                                        var tileTypeString = "false";
		                                        for (var key in fieldObject) {
		                                            if (key === "Type") {
		                                                tileTypeString = fieldObject[key];
		                                            }
		                                        }
		                                        return tileTypeString;
		                                    }

		                                    function getName(fieldObject) {
		                                        var nameString = "";
		                                        for (var key in fieldObject) {
		                                            if (key === "Name") {
		                                                nameString = fieldObject[key];
		                                            }
		                                        }
		                                        return nameString;
		                                    }
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

		            SYSPRO_VB.chartfieldsListDataSource = new kendo.data.HierarchicalDataSource({

		                data: fields_data,
		                schema: {
		                    data: function (response) {
		                        var results = $.map(response, function (obj, index) {

		                            var items = "No charts available";

		                            if (index === "Charts") {
		                                function formatFields(obj) {
		                                    var itemsString = "";
		                                    var itemsArray = [];
		                                    var chartCount = 0;
		                                    for (var key in obj) {
		                                        if (obj.hasOwnProperty(key)) {
		                                            var fieldObject = obj[key];
		                                            var fieldCategory = getCategory(fieldObject);
		                                            if (fieldCategory === "Charts") {
		                                                var fieldPath = key;
		                                                var caption = getCaption(fieldObject);
		                                                var formattedFieldPath = fieldPath.split(' ').join('_');
		                                                itemsString += '<li class="list-group-item field-name';
/*
		                                                if ( chartCount == 0 ) {
			                                                itemsString += ' active';
		                                                }
*/
		                                                itemsString += '" id="' + formattedFieldPath + '" data-bind="dataPath: selected.FieldPath" data-field-path="Fields.' + fieldPath + '">' + caption + '</li>';
		                                                chartCount++;
		                                            }
		                                        }
		                                    }
		                                    return itemsString;

		                                    function getFieldPath(fieldObject) {
		                                        var itemString = "";
		                                        for (var key in fieldObject) {
		                                            if (key === "FieldPath") {
		                                                itemString = fieldObject[key];
		                                            }
		                                        }
		                                        return itemString;
		                                    }

		                                    function getCaption(fieldObject) {
		                                        var captionString = "";
		                                        for (var key in fieldObject) {
		                                            if (key === "Caption") {
		                                                captionString = fieldObject[key];
		                                            }
		                                        }
		                                        captionString = captionString.replace("[", "<span class='secondaryCaption'>(");
		                                        captionString = captionString.replace("]", ")</span>");
		                                        return captionString;
		                                    }

		                                    function getCategory(fieldObject) {
		                                        var categoryString = "";
		                                        for (var key in fieldObject) {
		                                            if (key === "Category") {
		                                                categoryString = fieldObject[key];
		                                            }
		                                        }
		                                        return categoryString;
		                                    }
		                                }

		                                var items = formatFields(obj);

		                                return {
		                                    text: 'Select chart data',
		                                    content: '<ul class="list-group list">' + items + '</ul>',
		                                    encoded: false, // Allows use of HTML for item text
		                                    expanded: true,

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

		            SYSPRO_VB.linksListDataSource = new kendo.data.HierarchicalDataSource({

		                data: fields_data.LinksAvailable,
		                schema: {
		                    data: function (response) {
		                        var results = $.map(response, function (obj, index) {

		                            var items = "No links available";

		                            function formatFields(obj) {
		                                var itemsString = "";
		                                var itemsArray = [];
		                                for (var key in obj) {
		                                    if (obj.hasOwnProperty(key)) {
		                                        var fieldObject = obj[key];
		                                        var fieldPath = key;
		                                        var keyField = getKeyField(fieldObject);
		                                        var keyAction = getKeyAction(fieldObject);
		                                        var description = getDescription(fieldObject);
		                                        var formattedDescription = description.split(' ').join('_');
		                                        itemsString += '<li class="list-group-item field-name" id="' + formattedDescription + '" data-bind="linkListField: selected.KeyAction" data-key-field="' + keyField + '" data-field-path="Fields.' + fieldPath + '" data-key-action="' + keyAction + '" data-description="' + description + '">' + description + '</li>';
		                                        if ( description != '' ) {
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

		                                function getKeyField(fieldObject) {
		                                    var itemString = "";
		                                    for (var key in fieldObject) {
		                                        if (key === "KeyField") {
		                                            itemString = fieldObject[key];
		                                        }
		                                    }
		                                    return itemString;
		                                }

		                                function getKeyAction(fieldObject) {
		                                    var captionString = "";
		                                    for (var key in fieldObject) {
		                                        if (key === "KeyAction") {
		                                            captionString = fieldObject[key];
		                                        }
		                                    }
		                                    captionString = captionString.replace("[", "<span class='secondaryCaption'>(");
		                                    captionString = captionString.replace("]", ")</span>");
		                                    return captionString;
		                                }

		                                function getDescription(fieldObject) {
		                                    var captionString = "";
		                                    for (var key in fieldObject) {
		                                        if (key === "Description") {
		                                            captionString = fieldObject[key];
		                                        }
		                                    }
		                                    return captionString;
		                                }
		                            }

		                            var items = formatFields(obj);

		                            return {
		                                text: index.replace("_", " "),
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
		            
		            SYSPRO_VB.entryFieldsDataSource = new kendo.data.HierarchicalDataSource({

		                data: fields_data.EntryFields,
		                schema: {
		                    data: function (response) {
		                        var results = $.map(response, function (obj, index) {

		                            var items = "No entry fields available";

		                            function formatFields(obj) {
		                                var itemsString = "";
		                                var itemsArray = [];
		                                for (var key in obj) {
		                                    if (obj.hasOwnProperty(key)) {
		                                        var fieldObject = obj[key];
		                                        var fieldPath = key;
		                                        var keyField = getKeyField(fieldObject);
		                                        var entryType = getEntryType(fieldObject);
		                                        var dataType = getDataType(fieldObject);
		                                        var caption = getCaption(fieldObject);
		                                        var formattedCaption = caption.split(' ').join('_');
		                                        itemsString += '<li class="list-group-item field-name" id="' + formattedCaption + '" data-bind="dataPath: selected.FieldPath" data-key-field="' + keyField + '" data-field-path="Fields.' + fieldPath + '" data-data-type="' + dataType + '" data-entry-type="' + entryType + '">' + caption + '</li>';
		                                        if ( caption != '' ) {
		                                            SYSPRO_VB.entryFieldsJSON.push({
			                                            fieldpath: "Fields." + fieldPath,
			                                            smarttag: '',
			                                            datatype: dataType,
			                                            name: caption
		                                            });
		                                            
		                                        }
		                                    }
		                                    

		                                }
		                                return itemsString;

		                                function getEntryType(fieldObject) {
		                                    var itemString = "";
		                                    for (var key in fieldObject) {
		                                        if (key === "EntryType") {
		                                            itemString = fieldObject[key];
		                                        }
		                                    }
		                                    return itemString;
		                                }
		                                
		                                function getKeyField(fieldObject) {
		                                    var itemString = "";
		                                    for (var key in fieldObject) {
		                                        if (key === "KeyField") {
		                                            itemString = fieldObject[key];
		                                        }
		                                    }
		                                    return itemString;
		                                }
										
										function getCaption(fieldObject) {
	                                        var captionString = "";
	                                        for (var key in fieldObject) {
	                                            if (key == "Caption") {
	                                                captionString = fieldObject[key];
	                                            }
	                                        }
	                                        /*
captionString = captionString.replace("[", "<span class='secondaryCaption'>(");
	                                        captionString = captionString.replace("]", ")</span>");
*/
	                                        return captionString;
	                                    }
		                                
		                                function getDataType(fieldObject) {
	                                        var dataTypeString = "";
	                                        for (var key in fieldObject) {
	                                            if (key === "DataType") {
	                                                dataTypeString = fieldObject[key];
	                                            }
	                                        }
	                                        return dataTypeString;
	                                    }
		                            }

		                            var items = formatFields(obj);

		                            return {
		                                text: "Entry Fields: " + index.replace(/_/g, " "),
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
		            
		            SYSPRO_VB.fieldsListDataSource.read().then(function () {
		                SYSPRO_VB.sidebarPanelBar = $("#initial-fields-list").kendoPanelBar({
		                    expand: SYSPRO_VB.onExpandQuickAddFieldsList,
		                    collapse: SYSPRO_VB.onCollapseQuickAddFieldsList,
		                    expandMode: "multiple",
		                    dataSource: SYSPRO_VB.fieldsListDataSource.data().toJSON(), //need to convert data to JSON array
		                }).data("kendoPanelBar");

		                SYSPRO_VB.dataWindowPanelBar = $("#initial-fields-list-data-window").kendoPanelBar({
		                    expandMode: "multiple",
		                    dataSource: SYSPRO_VB.fieldsListDataSource.data().toJSON(), //need to convert data to JSON array
		                }).data("kendoPanelBar");

		                SYSPRO_VB.editDataWindowPanelBar = $("#initial-fields-list-data-edit-window").kendoPanelBar({
		                    expandMode: "multiple",
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
		                SYSPRO_VB.initQuickAddDataWidgets();
		            });

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

		                SYSPRO_VB.initialisePanelBar("#chart-fields-list");
		                SYSPRO_VB.initialisePanelBar("#chart-fields-list-edit-window");
						
						$("#chart-fields-list ul li:first-child").addClass("active");
// 						$("#chart-fields-list-edit-window .list-group li:first-child").addClass("active");
						
		                SYSPRO_VB.initQuickAddDataWidgets();
		            });

		            SYSPRO_VB.linksListDataSource.read().then(function () {

		                SYSPRO_VB.dataWindowlinksPanelBar = $("#links-fields-list-data-window").kendoPanelBar({
		                    expandMode: "single",
		                    dataSource: SYSPRO_VB.linksListDataSource.data().toJSON(), //need to convert data to JSON array
		                }).data("kendoPanelBar");

		                SYSPRO_VB.editDataWindowlinksPanelBar = $("#links-fields-list-data-edit-window").kendoPanelBar({
		                    expandMode: "single",
		                    dataSource: SYSPRO_VB.linksListDataSource.data().toJSON(), //need to convert data to JSON array
		                }).data("kendoPanelBar");

		            }).then(function () {

						SYSPRO_VB.initialisePanelBar("#links-fields-list-data-window");
						SYSPRO_VB.initialisePanelBar("#links-fields-list-data-edit-window");
		                SYSPRO_VB.initQuickAddDataWidgets();
		            });
		            
		            SYSPRO_VB.entryFieldsDataSource.read().then(function () {

		                SYSPRO_VB.dataWindowEntryFieldsPanelBar = $("#entry-fields-list-data-window").kendoPanelBar({
		                    expandMode: "single",
		                    dataSource: SYSPRO_VB.entryFieldsDataSource.data().toJSON(), //need to convert data to JSON array
		                }).data("kendoPanelBar");

		                SYSPRO_VB.editDataWindowEntryFieldsPanelBar = $("#entry-fields-list-data-edit-window").kendoPanelBar({
		                    expandMode: "single",
		                    dataSource: SYSPRO_VB.entryFieldsDataSource.data().toJSON(), //need to convert data to JSON array
		                }).data("kendoPanelBar");

		            }).then(function () {

						SYSPRO_VB.initialisePanelBar("#entry-fields-list-data-window");
						SYSPRO_VB.initialisePanelBar("#entry-fields-list-data-edit-window");
		                SYSPRO_VB.initQuickAddDataWidgets();
		            });
					
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
						for ( tile in SYSPRO_VB.tilesJSON ) {
							if ( SYSPRO_VB.tilesJSON[tile] != undefined && SYSPRO_VB.tilesJSON[tile].hasOwnProperty('Parameter') ) {
								
								tileOptionsHTML += '<div class="' + tile + 'Parameters tile-parameter-wrapper" style="display:none;">';
								
								if ( SYSPRO_VB.tilesJSON[tile].Parameter.length ) {
									
									for (var tp = 0; tp < SYSPRO_VB.tilesJSON[tile].Parameter.length; tp++ ) {
										
										if ( SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamType == "A" ) {
											
											tileOptionsHTML += '<p class="tile-text-option-label">' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamDescription + '</p>';
											tileOptionsHTML += '<div class="form-group"><input data-bind="value: selected.Widgets[0].TileParameters.' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" type="text" class="form-control" name="' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" id="' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" autocomplete="off" placeholder=""></div>';
											
										} else if ( SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamType == "L" ) {

											tileOptionsHTML += '<p class="tile-list-option-label">' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamDescription + '</p>';
											tileOptionsHTML += '<div class="form-group"><select data-bind="value: selected.Widgets[0].TileParameters.' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" class="form-control" name="' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" id="' + SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamName + '" autocomplete="off">';
											$.each(SYSPRO_VB.tilesJSON[tile].Parameter[tp].ParamOptions.ParamOption, function (i, option) {
												tileOptionsHTML += '<option value="' + option + '">' + option + '</option>';
											});
											tileOptionsHTML += '</select></div>';
											
										}
									}
									
								} else {
									
									if ( SYSPRO_VB.tilesJSON[tile].Parameter.ParamType == "A" ) {
										tileOptionsHTML += '<p class="tile-text-option-label">' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamDescription + '</p>';
										tileOptionsHTML += '<div class="form-group"><input data-bind="value: selected.Widgets[0].TileParameters.' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" type="text" class="form-control" name="' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" id="' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" autocomplete="off" placeholder=""></div>';
									} else if ( SYSPRO_VB.tilesJSON[tile].Parameter.ParamType == "L" ) {
										tileOptionsHTML += '<p class="tile-list-option-label">' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamDescription + '</p>';
										tileOptionsHTML += '<div class="form-group"><select data-bind="value: selected.Widgets[0].TileParameters.' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" class="form-control" name="' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" id="' + SYSPRO_VB.tilesJSON[tile].Parameter.ParamName + '" autocomplete="off">';
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
						SYSPRO_VB.initialisePanelBar("#tiles-list");
						SYSPRO_VB.initialisePanelBar("#tiles-edit-list");
		            });
		            
		            if (fields_data.hasOwnProperty('CardsAvailable')) {

		                if (fields_data.CardsAvailable.Card.length) {
			                console.log("cards has length");
			                var ci = 0;
			                function processCards() {
				                var cardsQuickAddHTML = "";
								var cardsLayoutWindowHTML = "";
								var cardsEditLayoutWindowHTML = "";
				                var WidgetType = fields_data.CardsAvailable.Card[ci].Name;
				                var WidgetName = fields_data.CardsAvailable.Card[ci].Name + "_card";
				                var widgetDescription = fields_data.CardsAvailable.Card[ci].Description;
				                cardsQuickAddHTML += '<div class="col-xs-6 mb-10 draggable quickAddWidget quickAddCard" id="' + WidgetName + '" value="' + WidgetName + '" data-layout-widget-type="Card" data-layout-widget-subtype="MaxiCard" data-card-type-detail="' + WidgetType + '" data-layout-widget-displaystyle="0" data-parent-field-path="';

		                        if (fields_data.CardsAvailable.Card[ci].KeyField && fields_data.CardsAvailable.Card[ci].KeyField.length) {
		                            cardsQuickAddHTML += 'Fields.SYSPROKeyData.' + fields_data.CardsAvailable.Card[ci].KeyField + '.Value';
		                            var ParentFieldPath = 'Fields.SYSPROKeyData.' + fields_data.CardsAvailable.Card[ci].KeyField + '.Value';
		                        } else {
			                        var ParentFieldPath = "";
		                        }

		                        cardsQuickAddHTML += '"><div class="draggableLayoutWidget draggable"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ' + widgetDescription + ' </div></div>';
								
								
		                        cardsLayoutWindowHTML += '<label class="btn btn-radio col-sm-5 text-left no-sunken" data-tooltip="tooltip" data-placement="top" title=" ' + widgetDescription + ' "><input type="radio" name="row_options" id="' + WidgetName + '" value="' + WidgetName + '" autocomplete="off" data-layout-widget-type="Card" data-layout-widget-subtype="MaxiCard" data-layout-widget-displaystyle="0" data-card-type-detail="' + WidgetType + '" data-parent-field-path="';

		                        if (fields_data.CardsAvailable.Card[ci].KeyField && fields_data.CardsAvailable.Card[ci].KeyField.length) {
		                            cardsLayoutWindowHTML += 'Fields.SYSPROKeyData.' + fields_data.CardsAvailable.Card[ci].KeyField + '.Value';
		                        }

		                        cardsLayoutWindowHTML += '" required="required"><i class="material-icons text-muted">panorama_fish_eye</i><i class="material-icons text-success">check_circle</i> ' + widgetDescription.replace(/ Card$/, "") + '</label>';
		                        
		                        cardsEditLayoutWindowHTML += '<label class="btn btn-radio col-sm-5 text-left no-sunken" data-tooltip="tooltip" data-placement="top" title=" ' + widgetDescription + ' "><input data-bind="checked: selected.WidgetName" type="radio" name="row_options" id="' + WidgetName + '" value="' + WidgetName + '" autocomplete="off" data-layout-widget-type="Card" data-layout-widget-subtype="MaxiCard" data-layout-widget-displaystyle="0" data-card-type-detail="' + WidgetType + '" data-parent-field-path="';

		                        if (fields_data.CardsAvailable.Card[ci].KeyField && fields_data.CardsAvailable.Card[ci].KeyField.length) {
		                            cardsEditLayoutWindowHTML += 'Fields.SYSPROKeyData.' + fields_data.CardsAvailable.Card[ci].KeyField + '.Value';
		                        }

		                        cardsEditLayoutWindowHTML += '" required="required"><i class="material-icons text-muted">panorama_fish_eye</i><i class="material-icons text-success">check_circle</i> ' + widgetDescription.replace(/ Card$/, "") + '</label>';
						        
								
						        var cardHTMLObject = SYSPRO_VB.setupFinalLayoutWidget("", WidgetName, "", "Card", "MaxiCard", false, 0, 0, 9, 8, "Joined", "", "", "", WidgetType, ParentFieldPath, 0, 9, 0, 9, "");
						        sysproInterop.getHtmlFromModel("Widget", cardHTMLObject.toJSON(), function (result) {
						            var cardHTMLObjectjQuery = $($.trim(result));
						            cardHTMLObjectjQuery.find(".remove-row-section, .edit-row-section, .drag-row-section, .layout-widget-options").remove();
						            SYSPRO_VB.cardsHTML[WidgetName] = cardHTMLObjectjQuery;
						            ci++;
						            if ( ci < fields_data.CardsAvailable.Card.length ) {
							            processCards();
						            }
						        },
						        '','','',
						        function(error){console.log(error)}
						        );
						        
						        $("#quick-add-layout .quick-sortable-list.row").append(cardsQuickAddHTML);
								$("#AvailableCards .layout-radio-options").append(cardsLayoutWindowHTML);
								$("#editCard .layout-radio-options").append(cardsEditLayoutWindowHTML);
						        
			                }
			                
			                processCards();

		                } else {
			                console.log("cards has no length");
							var cardsQuickAddHTML = "";
							var cardsLayoutWindowHTML = "";
							var cardsEditLayoutWindowHTML = ""
							var WidgetType = fields_data.CardsAvailable.Card.Name;
				            var WidgetName = fields_data.CardsAvailable.Card.Name + "_card";
				            var widgetDescription = fields_data.CardsAvailable.Card.Description;
		                    cardsQuickAddHTML += '<div class="col-xs-6 mb-10 draggable quickAddWidget quickAddCard" id="' + WidgetName + '" value="' + WidgetName + '" data-layout-widget-type="Card" data-layout-widget-subtype="MaxiCard" data-card-type-detail="' + WidgetType + '" data-layout-widget-displaystyle="0" data-parent-field-path="';

		                    if (fields_data.CardsAvailable.Card.KeyField && fields_data.CardsAvailable.Card.KeyField.length) {
		                        cardsQuickAddHTML += 'Fields.SYSPROKeyData.' + fields_data.CardsAvailable.Card.KeyField + '.Value';
								var ParentFieldPath = 'Fields.SYSPROKeyData.' + fields_data.CardsAvailable.Card.KeyField + '.Value';
	                        } else {
		                        var ParentFieldPath = '';
	                        }

		                    cardsQuickAddHTML += '"><div class="draggableLayoutWidget draggable"><i class="material-icons text-primary quickAddDragHandle">open_with</i> ' + widgetDescription + ' </div></div>';

		                    cardsLayoutWindowHTML += '<label class="btn btn-radio col-sm-5 text-left no-sunken" data-tooltip="tooltip" data-placement="top" title=" ' + widgetDescription + ' "><input type="radio" name="row_options" id="' + WidgetName + '" value="' + WidgetName + '" autocomplete="off" data-layout-widget-type="Card" data-layout-widget-subtype="MaxiCard" data-layout-widget-displaystyle="0" data-card-type-detail="' + WidgetType + '" data-parent-field-path="';

		                    if (fields_data.CardsAvailable.Card.KeyField && fields_data.CardsAvailable.Card.KeyField.length) {
		                        cardsLayoutWindowHTML += 'Fields.SYSPROKeyData.' + fields_data.CardsAvailable.Card.KeyField + '.Value';
		                    }

		                    cardsLayoutWindowHTML += '" required="required"><i class="material-icons text-muted">panorama_fish_eye</i><i class="material-icons text-success">check_circle</i> ' + widgetDescription.replace(/ Card$/, "") + '</label>';
		                    
		                    cardsEditLayoutWindowHTML += '<label class="btn btn-radio col-sm-5 text-left no-sunken" data-tooltip="tooltip" data-placement="top" title=" ' + widgetDescription + ' "><input data-bind="checked: selected.WidgetName" type="radio" name="row_options" id="' + WidgetName + '" value="' + WidgetName + '" autocomplete="off" data-layout-widget-type="Card" data-layout-widget-subtype="MaxiCard" data-layout-widget-displaystyle="0" data-card-type-detail="' + WidgetType + '" data-parent-field-path="';

	                        if (fields_data.CardsAvailable.Card.KeyField && fields_data.CardsAvailable.Card.KeyField.length) {
	                            cardsEditLayoutWindowHTML += 'Fields.SYSPROKeyData.' + fields_data.CardsAvailable.Card.KeyField + '.Value';
	                        }

	                        cardsEditLayoutWindowHTML += '" required="required"><i class="material-icons text-muted">panorama_fish_eye</i><i class="material-icons text-success">check_circle</i> ' + widgetDescription.replace(/ Card$/, "") + '</label>';
		                        				        
					        var cardHTMLObject = SYSPRO_VB.setupFinalLayoutWidget("", WidgetName, "", "Card", "MaxiCard", false, 0, 0, 9, 8, "Joined", "", "", "", WidgetType, ParentFieldPath, 0, 9, 0, 9, "");
					        
					        sysproInterop.getHtmlFromModel("Widget", cardHTMLObject.toJSON(), function (result) {
					            var cardHTMLObjectjQuery = $($.trim(result));
					            cardHTMLObjectjQuery.find(".remove-row-section, .edit-row-section, .drag-row-section, .layout-widget-options").remove();
					            SYSPRO_VB.cardsHTML[WidgetName] = cardHTMLObjectjQuery;
					        },
					        '','','',
					        function(error){console.log(error)}
					        );
					        
					        $("#quick-add-layout .quick-sortable-list.row").append(cardsQuickAddHTML);
							$("#AvailableCards .layout-radio-options").append(cardsLayoutWindowHTML);
							$("#editCard .layout-radio-options").append(cardsEditLayoutWindowHTML);
		                }

		                
		            }
		            
		            
		            SYSPRO_VB.initQuickAddLayoutWidgets();
		        },
		        function (a) {
		            //The error callback where a.ErrorMessage is the error
		            console.log("Error: " + a.ErrorMessage);
		        },
				false
			);

            $(".menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
                $("#sidebar-tab-controls").find("li.active").removeClass("active");
            });

            $(".menu-toggle-tab").click(function (e) {
                e.preventDefault();
                if ($("#wrapper").hasClass("toggled")) {
                    $("#wrapper").toggleClass("toggled");
                }
            });

            $("#undo-button").prop("disabled", true);
            $("#redo-button").prop("disabled", true);

            SYSPRO_VB.initNormalSorting();
            SYSPRO_VB.initQuickAddLayoutWidgets();

            $("#dataWindow .select-icon").click(function (e) {
                $("#dataWindow .data-section-pane-1").fadeOut(300, function () {
                    $("#dataWindow .data-section-pane-2").fadeIn(300);
                });
            });
            $("#dataWindow .back-to-data-section").click(function (e) {
                $("#dataWindow .data-section-pane-2").fadeOut(300, function () {
                    $("#dataWindow .data-section-pane-1").fadeIn(300);
                });
            });
            $("#dataEditWindow .select-icon").click(function (e) {
                $("#dataEditWindow .data-section-pane-1").fadeOut(300, function () {
                    $("#dataEditWindow .data-section-pane-2").fadeIn(300);
                });
            });
            $("#dataEditWindow .back-to-data-section").click(function (e) {
                $("#dataEditWindow .data-section-pane-2").fadeOut(300, function () {
                    $("#dataEditWindow .data-section-pane-1").fadeIn(300);
                });
            });
            $("#rowWindow .select-icon").click(function (e) {
                $("#rowWindow .data-section-pane-1").fadeOut(300, function () {
                    $("#rowWindow .data-section-pane-2").fadeIn(300);
                });
            });
            $("#rowWindow .back-to-data-section").click(function (e) {
                $("#rowWindow .data-section-pane-2").fadeOut(300, function () {
                    $("#rowWindow .data-section-pane-1").fadeIn(300);
                });
            });
            $("#rowEditWindow .select-icon").click(function (e) {
                $("#rowEditWindow .data-section-pane-1").fadeOut(300, function () {
                    $("#rowEditWindow .data-section-pane-2").fadeIn(300);
                });
            });
            $("#rowEditWindow .back-to-data-section").click(function (e) {
                $("#rowEditWindow .data-section-pane-2").fadeOut(300, function () {
                    $("#rowEditWindow .data-section-pane-1").fadeIn(300);
                });
            });

            // Main column layout changing
            $("input[name='column-layout']").change(function (e) {

                var previousLayout = $("body").data("column-layout");

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
                                console.log("expected");
                                VBdata[0].ResponsiveStyle = 3;
                                VBdata[1].ResponsiveStyle = 3;
                                VBdata.splice(2, 0, SYSPRO_VB.column2Copy);
                                VBdata[2].ResponsiveStyle = 3;
                            }

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

            //New Layout Widget Window
            $("#rowWindow").kendoWindow({
                actions: [],
                draggable: true,
                minHeight: "500px",
                minWidth: "800px",
                width: "900px",
                height: "550px",
                modal: false,
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
                title: "Add new layout widget",
                visible: false,
                open: SYSPRO_VB.rowWindowOpen,
                close: SYSPRO_VB.rowWindowClose
            });

            SYSPRO_VB.rowWindow = $("#rowWindow").data("kendoWindow");

            // Edit layout widget Window
            $("#rowEditWindow").kendoWindow({
                actions: [],
                draggable: true,
                minHeight: "500px",
                minWidth: "800px",
                width: "900px",
                height: "550px",
                modal: false,
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
                title: "Edit layout widget",
                visible: false,
                open: SYSPRO_VB.rowEditWindowOpen,
                close: SYSPRO_VB.rowEditWindowClose
            });

            SYSPRO_VB.rowEditWindow = $("#rowEditWindow").data("kendoWindow");

            $(".add-row-section").bind("click", function () {
                SYSPRO_VB.column_num = $(this).parents(".main-column").data("column");
                SYSPRO_VB.rowWindow.open();
            });

            // Add data widget Kendo Window
            $("#dataWindow").kendoWindow({
                actions: [],
                draggable: true,
                minHeight: "500px",
                minWidth: "800px",
                width: "900px",
                height: "550px",
                modal: false,
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
                title: "Add new data widget",
                visible: false,
                open: SYSPRO_VB.dataWindowOpen,
                close: SYSPRO_VB.dataWindowClose
            });

            SYSPRO_VB.dataWindow = $("#dataWindow").data("kendoWindow");

            $("#dataEditWindow").kendoWindow({ //create a window
                actions: [],
                draggable: true,
                minHeight: "500px",
                minWidth: "800px",
                width: "900px",
                height: "550px",
                modal: false,
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
                title: "Edit Data Widget",

                visible: false,
                open: SYSPRO_VB.dataEditWindowOpen,
                close: SYSPRO_VB.dataEditWindowClose
            });

            SYSPRO_VB.dataEditWindow = $("#dataEditWindow").data("kendoWindow");
            
            $("#tileWindow").kendoWindow({ //create a window
                actions: [],
                draggable: true,
                minHeight: "500px",
                minWidth: "800px",
                width: "900px",
                height: "550px",
                modal: false,
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
                title: "Add tile",

                visible: false,
                open: SYSPRO_VB.tileWindowOpen,
                close: SYSPRO_VB.tileWindowClose
            });

            SYSPRO_VB.tileWindow = $("#tileWindow").data("kendoWindow");
            
            $("#tileEditWindow").kendoWindow({ //create a window
                actions: [],
                draggable: true,
                minHeight: "500px",
                minWidth: "800px",
                width: "900px",
                height: "550px",
                modal: false,
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
                title: "Edit tile",

                visible: false,
                open: SYSPRO_VB.tileEditWindowOpen,
                close: SYSPRO_VB.tileEditWindowClose
            });

            SYSPRO_VB.tileEditWindow = $("#tileEditWindow").data("kendoWindow");
			
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

                    e.element.parent().css({top: newTop, left: newLeft});
                }
            }
            
            $(document).one("kendo:pageUnload", function(){ if (notification) { notification.hide(); } });
            
            
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
                $("#dataWindowIconList, #rowWindowIconList").append(iconHTML);
                $("#editDataWindowIconList").append(editDataIconHTML);
                $("#editRowWindowIconList").append(editLayoutIconHTML);
				
				$(".icon-field-container").off().on("click", ".btn-icon", function(icon) {
					$(this).parents(".icon-field-container").find(".active").removeClass("active");
					$(this).addClass("active");
				});
            });		    
                    
            $('[data-tooltip="tooltip"]').tooltip()

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
			
			$("#initial-fields-list-data-window-wrapper, #initial-fields-list-data-edit-window-wrapper, #initial-fields-list-wrapper").perfectScrollbar();
			
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
                var parentOfToRemoveDataWidget = $(c.target).parents(".draggable-row-section");
                var parentOfToRemoveDataWidgetModel = viewModel.dataSource.get(parentOfToRemoveDataWidget.data("guid"));
                
                if ( parentOfToRemoveDataWidgetModel.DisplayStyle === 1 ) {
	                var toRemoveDataWidgetModel = viewModel.dataSource.get($(c.target).parents(".draggable-data-section").data("guid"));
	                var listViewRow = $(c.target).parents(".draggable-data-section").data("row");
	                viewModel.dataSource.remove(parentOfToRemoveDataWidgetModel.Rows.at(listViewRow - 1));
	                $(this).parents("tr.draggable-data-section").remove();
	                parentOfToRemoveDataWidget.find("tr").each(function(index) {
		                $(this).data("row",index);
		                $(this).attr("data-row",index);
	                });
	                viewModel.dataSource.remove(toRemoveDataWidgetModel);
	                $(this).closest(".data-section").find(".add-data-widget").show();
	                $(this).closest(".data-section").find(".panel").not(".add-data-widget").remove();
                } else if ( parentOfToRemoveDataWidgetModel.DisplayStyle === 3 ) {
	                var toRemoveDataWidgetModel = viewModel.dataSource.get($(c.target).parents(".draggable-data-section").data("guid"));
	                var listViewRow = $(c.target).parents(".draggable-data-section").data("row");
	                viewModel.dataSource.remove(parentOfToRemoveDataWidgetModel.Rows.at(listViewRow - 1));
	                $(this).parents("a.draggable-data-section").remove();
	                parentOfToRemoveDataWidget.find(".list-group-item").each(function(index) {
		                console.log(index);
		                console.log($(this));
		                $(this).data("row",index);
		                $(this).attr("data-row",index);
	                });
	                viewModel.dataSource.remove(toRemoveDataWidgetModel);
	                $(this).closest(".data-section").find(".add-data-widget").show();
	                $(this).closest(".data-section").find(".panel").not(".add-data-widget").remove();
					$(this).parents("a.list-group-item.draggable-data-section").remove();
                } else if ( parentOfToRemoveDataWidgetModel.DisplayStyle === 4 ) {
	                var toRemoveDataWidgetModel = viewModel.dataSource.get($(c.target).parents(".tile").data("guid"));
	                viewModel.dataSource.remove(toRemoveDataWidgetModel);
	                SYSPRO_VB.initiateTiles(parentOfToRemoveDataWidgetModel);
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
                
                if ( SYSPRO_VB.currentParentLayoutWidget.DisplayStyle === 4 ) {
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
	                SYSPRO_VB.tempDataWidgetJSON["keyField"] = SYSPRO_VB.currentDataWidget.Widgets[0].keyField;
	                SYSPRO_VB.tempDataWidgetJSON["TileWidth"] = SYSPRO_VB.currentDataWidget.Widgets[0].TileWidth;
	                SYSPRO_VB.tempDataWidgetJSON["parentFieldPath"] = SYSPRO_VB.currentDataWidget.Widgets[0].parentFieldPath;
	                SYSPRO_VB.tempDataWidgetJSON["TileParameters"] = SYSPRO_VB.currentDataWidget.Widgets[0].TileParameters.toJSON();
	                viewModel.set("selected", SYSPRO_VB.currentDataWidget); //update the viewModel
	                $("#tileEditWindow").data("kendoWindow").open();
	            } else {
		        	SYSPRO_VB.section_num = $(this).closest(".data-section").data("section");
	                SYSPRO_VB.row_num = $(this).closest(".row").data("row");
	                
	                SYSPRO_VB.currentDataWidgetUid = $(e.target).parents(".draggable-data-section").data("guid");
	                //Rob: Now always do a get instead of getByUid so we can use our own Id.
	                SYSPRO_VB.currentDataWidget = viewModel.dataSource.get($(e.target).parents(".draggable-data-section").data("guid")); //get reference to the model
	                SYSPRO_VB.currentDataWidgetHTML = $(this).closest(".draggable-data-section");
	                SYSPRO_VB.tempDataWidgetJSON = SYSPRO_VB.currentDataWidget.toJSON();
	           
	                viewModel.set("selected", SYSPRO_VB.currentDataWidget); //update the viewModel
	                $("#dataEditWindow").data("kendoWindow").open();
		        }
            });

            $(document).on("click", ".remove-row-section", function (f) {
                f.preventDefault();
                //Rob: Now always do a get instead of getByUid so we can use our own Id.
                toRemoveLayoutWidgetModel = viewModel.dataSource.get($(this).parents(".draggable-row-section").data("guid"));
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
                SYSPRO_VB.rowEditWindow.open();
                // $("#rowEditWindow").data("kendoWindow").open();
            });

            $(document).on("shown.bs.collapse", ".collapse", function (e) {
                sysproInterop.resizeSparklines();
            });
			
		     
		    $(window).resize(function() {
		    	if(this.resizeTO) clearTimeout(this.resizeTO);
				this.resizeTO = setTimeout(function() {
					$(this).trigger('resizeEnd');
				}, 10);
				SYSPRO_VB.sizeTiles();
		    });
		    
		    $(window).bind('resizeEnd', function() {
		    	$(".tile").height($("#tile1").width());
		        $(".carousel").height($("#tile1").width());
		        $(".item").height($("#tile1").width());
		    });
		    
		    
    
            SYSPRO_VB.initEditRemoveDataWidget();

            SYSPRO_VB.initDataWidgetSorting();

            SYSPRO_VB.finishAddLayoutWidget();

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
        SYSPRO_VB.history[SYSPRO_VB.historyIndex] = [JSON.stringify(viewModel.dataSource.data().toJSON()), viewModel.columnLayout];

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
    column1Id: column1InputId,
    column2Id: column2InputId,
    column1Copy: { "PrimaryStyle": 0, "ResponsiveStyle": 3, "Widgets": [], "Id": column1InputId, "Index": 1, "TypeName": "Column", "HasChildren": false, "index": 1 },
    column2Copy: { "PrimaryStyle": 0, "ResponsiveStyle": 3, "Widgets": [], "Id": column2InputId, "Index": 2, "TypeName": "Column", "HasChildren": false, "index": 2 },
    column_num: '',
    section_num: '',
    layout_widget_guid: '',
    widget_index: '',
    section: '',
    starting_section_num: '',
    currentRowWindow: '',
    row_num: '',
    column: '',
    currentDraggedWidget: '',
    currentDataWidgetUid: '',
    currentDataWidget: '',
    currentDataWidgetHTML: '',
    currentLayoutWidget: '',
    currentLayoutWidgetHTML: '',
    tempDataWidgetJSON: '',
    draggedDataWidget: '',
    draggedDataWidgetUid: '',
    draggedDataWidgetTempCopy: '',
    tempDataWidgetTarget: '',
    previewLayoutWidget: '',
    tempHiddenWidg: null,
    availableDataWidgetSections: 0,
    openWindow: '',
    cardsHTML: {},
    bindableFieldsData: {},

    // New Layout Widget window open function
    rowWindowOpen: function () {
		
		SYSPRO_VB.openWindow = 'rowWindow';
		
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

            var newLayoutWidget = SYSPRO_VB.setupLayoutWidget("#rowWindow");

            var GUID = newLayoutWidget[0];

            var kendoLayoutWidget = newLayoutWidget[1];
			console.log(kendoLayoutWidget);
            var widgetTypeName = kendoLayoutWidget.TypeName;

            SYSPRO_VB.insertLayoutWidget("#rowWindow", GUID, kendoLayoutWidget);

            SYSPRO_VB.rowWindow.close();

        });

        $("#rowWindow .btn-default").off().on('click', function (e) {

            SYSPRO_VB.rowWindow.close();
        });
    },

    // Row/Layout widget window close function
    rowWindowClose: function () {
	    SYSPRO_VB.openWindow = '';
	    $(".layout-section-styling-title").hide();
        $(".widget_title_options").hide();
        $("#collapsible_title_styles").collapse("hide");
        $(".widget_joined_options").hide();
        $(".widget_border_options").hide();
        $(".widget_listview_options").hide();
        $(".widget_linklist_options").hide();
        $(".tile_section_options").hide();
        $(".widget_card_options").hide();
        $(".widget_chart_options").hide();
        $(".layout-widget-preview-wrapper").hide();
        $(".layout-widget-preview-title").hide();
        $("#charts-colour-options").hide();
        $("#chart-fields-list").hide();
        $(".layout-widget-preview").html("");
        $("#layout_widget_title").val("");
        $('#rowWindow input[name="row_options"]:checked').prop('checked', false);
        $(".layout-widget-type-tab.active").removeClass("active in");
        $("#row-tabs li.active").removeClass("active");
        $("#chart-fields-list .list-group-item.active").removeClass("active");
        $("#chart-fields-list ul li:first-child").addClass("active");
        $(".icon-field-container .icon-option.active").removeClass("active");
        $("#addLayoutWidgetButton").addClass("disabled");
        $("#addLayoutWidgetButton").prop("disabled", true);
        $("#rowWindow input").off();
        $('a#tile_layout_section').off();
        $("#rowWindow .data-section-pane-2").fadeOut(50, function () {
            $("#rowWindow .data-section-pane-1").fadeIn(50);
        });
    },

    // Edit layout widget window open function
    rowEditWindowOpen: function () {

		SYSPRO_VB.openWindow = 'rowEditWindow';
        kendo.bind($("#rowEditWindow"), viewModel);

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

                if (targetEditWidget.DisplayStyle == 2) {

                    var initialNumRowsInCarousel = targetEditWidget.Rows.length;
                    var targetEditWidgetJSON = targetEditWidget.toJSON();

                    if (targetEditWidgetJSON.Rows[0].Columns[0].hasOwnProperty("Widgets")) {
                        var carouselRowNumber = initialNumRowsInCarousel;

                        $(newWidgetHTMLjQuery).find(".carousel-inner").append('<div class="item"><div class="panel-body sys-bg-white text-left"><div class="row " data-row="' + carouselRowNumber + '"><div class="col-xs-12" data-section="0"><div class="panel sys-widget sys-box-shadow-off sys-mg-off  add-data-widget"><div class="panel-body text-center sys-fg-primary"><a class="pull-left text-center add-data-section" href="#"><i class="material-icons">note_add</i></a></div></div></div></div></div></div>');

                    } else {
                        var carouselRowNumber = 1;
                    }
                } else if (targetEditWidget.DisplayStyle == 4) {
	                var clonedTileWidgetSection = newWidgetHTMLjQuery.find(".tile-widget").parent(".col-xs-12").clone();
	                newWidgetHTMLjQuery.find(".tile-widget").parents(".layout-widget").find(".panel-body .row").html(clonedTileWidgetSection);
                }

                SYSPRO_VB.currentLayoutWidgetHTML.replaceWith(newWidgetHTMLjQuery);
				
				SYSPRO_VB.initiateTiles(targetEditWidget);
				
                SYSPRO_VB.finishAddLayoutWidget();

                SYSPRO_VB.initAddDataWidgets();

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
	    SYSPRO_VB.openWindow = '';
	    $(".layout-section-styling-title").hide();
        $(".widget_title_options").hide();
        $("#edit_collapsible_title_styles").collapse("hide");
        $(".widget_joined_options").hide();
        $(".widget_border_options").hide();
        $(".widget_listview_options").hide();
        $(".widget_linklist_options").hide();
        $(".widget_card_options").hide();
        $(".widget_chart_options").hide();
        $("#layout_widget_title").val("");
        $(document.querySelector('input[name="row_options"]:checked')).prop('checked', false);
        $(".layout-widget-type-tab.active").removeClass("active in");
        $("#row-tabs li.active").removeClass("active");
        $(".icon-field-container .icon-option.active").removeClass("active");
        $("#rowEditWindow .data-section-pane-2").fadeOut(50, function () {
            $("#rowEditWindow .data-section-pane-1").fadeIn(50);
        });
    },

    // Kendo Window version of data widget 
    dataWindowOpen: function () {
		
		SYSPRO_VB.openWindow = 'dataWindow';
        $('#addDataButtonPopoverWrap').popover({
            html: false,
            trigger: "hover",
            placement: 'top',
            delay: { "show": 100, "hide": 100 },
            content: "Select and configure a data widget to proceed"
        });

        var column_num = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]').parents(".main-column").data("column");
        var widget_index = $('div[data-column="' + column_num + '"] .draggable-row-section').index($('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]'));

        var targetLayoutWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid);

        var targetLayoutWidgetDisplayStyle = targetLayoutWidget.DisplayStyle;
        if (targetLayoutWidgetDisplayStyle == 0 || targetLayoutWidgetDisplayStyle == 2) {
            var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] div[data-row="' + SYSPRO_VB.row_num + '"] div[data-section="' + SYSPRO_VB.section_num + '"]');
            $("#tiles-addition").hide();
            $("#non-tiles-addition").show();
            $("#initial-fields-list-data-window").show();
            $("#links-fields-list-data-window").hide();
            $("#entry-fields-list-data-window").hide();
            $(".typeahead-fields").show();
            $(".typeahead-entry-fields").hide();
            $(".typeahead-link-fields").hide();
            $("#dataWindow .fieldBackgroundColorOption").show();
            $(".field-caption-option").show();
            $(".text-alignment-options").show();
            $(".linklist-text-option").hide();
            $(".icon-option").show();
        } else if (targetLayoutWidgetDisplayStyle == 1) {
            var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] tr[data-row="0"]');
            $("#tiles-addition").hide();
            $("#non-tiles-addition").show();
            $("#initial-fields-list-data-window").show();
            $("#links-fields-list-data-window").hide();
            $("#entry-fields-list-data-window").hide();
            $(".typeahead-fields").show();
            $(".typeahead-entry-fields").hide();
            $(".typeahead-link-fields").hide();
            $("#dataWindow .fieldBackgroundColorOption").hide();
            $(".field-caption-option").hide();
            $(".text-alignment-options").hide();
            $(".linklist-text-option").hide();
            $(".icon-option").hide();
        } else if (targetLayoutWidgetDisplayStyle == 3) {
            var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] a[data-row="0"]');
            $("#tiles-addition").hide();
            $("#non-tiles-addition").show();            
            $(".field-caption-option").hide();
            $("#dataWindow .fieldBackgroundColorOption").hide();
            $("#initial-fields-list-data-window").hide();
            $("#links-fields-list-data-window").show();
            $("#entry-fields-list-data-window").hide();
            $(".typeahead-fields").hide();
            $(".typeahead-entry-fields").hide();
            $(".typeahead-link-fields").show();
            $(".text-alignment-options").hide();
            $(".linklist-text-option").show();
            $(".icon-option").hide();
        } else if (targetLayoutWidgetDisplayStyle == 5) {
            var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] a[data-row="0"]');
            $("#tiles-addition").hide();
            $("#non-tiles-addition").show();            
            $(".field-caption-option").hide();
            $("#dataWindow .fieldBackgroundColorOption").hide();
            $("#initial-fields-list-data-window").show();
            $("#links-fields-list-data-window").show();
            $("#entry-fields-list-data-window").show();
            $(".typeahead-fields").hide();
            $(".typeahead-entry-fields").show();
            $(".typeahead-link-fields").hide();
            $(".text-alignment-options").hide();
            $(".linklist-text-option").hide();
            $(".icon-option").hide();
        }

        $("#initial-fields-list-data-window.fieldsPanelBar .list-group-item").on("click", function (event) {
            //$("#linklist_link_text").val($(this).data("description"));
            $(".text-colour-weight-options").show();
            $("#fieldStylingOptions").show();
//             if (SYSPRO_VB.dataValidator.validate()) {
                // If the form is valid, the Validator will return true
                $("#addDataWidgetButton").removeClass("disabled");
                $("#addDataWidgetButton").prop("disabled", false);
                $('#addDataButtonPopoverWrap').popover("destroy");
/*             } */
        });
        
        $("#links-fields-list-data-window.fieldsPanelBar .list-group-item").on("click", function (event) {
            $("#linklist_link_text").val($(this).data("description"));
            $(".text-colour-weight-options").hide();
            $("#fieldStylingOptions").show();
/*             if (SYSPRO_VB.dataValidator.validate()) { */
                // If the form is valid, the Validator will return true
                $("#addDataWidgetButton").removeClass("disabled");
                $("#addDataWidgetButton").prop("disabled", false);
                $('#addDataButtonPopoverWrap').popover("destroy");
/*             } */
        });
        
        $("#entry-fields-list-data-window.fieldsPanelBar .list-group-item").on("click", function (event) {
            $(".text-colour-weight-options").hide();
            $("#fieldStylingOptions").show();
                $("#addDataWidgetButton").removeClass("disabled");
                $("#addDataWidgetButton").prop("disabled", false);
                $('#addDataButtonPopoverWrap').popover("destroy");
        });

        $("#dataWindow .btn-primary").off().on('click', function () {

            var newKendoWidget = SYSPRO_VB.setUpDataWidget("#dataWindow", targetLayoutWidgetDisplayStyle);

            var dataGUID = newKendoWidget[0];

            var kendoDataWidget = newKendoWidget[1];

            SYSPRO_VB.insertDataWidget(dataGUID, newKendoWidget[1], column_num, widget_index, SYSPRO_VB.row_num, SYSPRO_VB.section_num, section, SYSPRO_VB.layout_widget_guid);

            SYSPRO_VB.initAddDataWidgets();

            $("#dataWindow").data("kendoWindow").close();

        });

        $("#dataWindow .btn-default").off().on('click', function (e) {
            SYSPRO_VB.dataWindow.close();
        });
    },

    // data widget window close function
    dataWindowClose: function () {
	    SYSPRO_VB.openWindow = '';
        $("#dataWindow #initial-fields-list-data-window li.active").removeClass("active");
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
		
        $("#addDataWidgetButton").addClass("disabled");
        $(".icon-field-container .icon-option.active").removeClass("active");
        $("#addDataWidgetButton").prop("disabled", true);
    },

    //data Edit Window open function
    dataEditWindowOpen: function () {
		SYSPRO_VB.openWindow = 'dataEditWindow';
        $("#dataEditWindow input").each(function (index) {
            if ($(this).prop("checked")) {
                $(this).parent("label").addClass("active");
            } else {
                $(this).parent("label").removeClass("active");
            }
        });

        if ($("#initial-fields-list-data-edit-window .list-group .list-group-item.active")) {

            SYSPRO_VB.editDataWindowPanelBar.collapse($("li"));
            SYSPRO_VB.editDataWindowPanelBar.clearSelection();
            SYSPRO_VB.editDataWindowPanelBar.expand($("#initial-fields-list-data-edit-window .list-group .list-group-item.active").parents("li"));
        }

        SYSPRO_VB.column_num = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]').parents(".main-column").data("column");

        SYSPRO_VB.widget_index = $('div[data-column="' + SYSPRO_VB.column_num + '"] .draggable-row-section').index($('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]'));

        SYSPRO_VB.section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] div[data-row="' + SYSPRO_VB.row_num + '"] div[data-section="' + SYSPRO_VB.section_num + '"]');

        var targetLayoutWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid);

        var targetLayoutWidgetDisplayStyle = targetLayoutWidget.DisplayStyle;

        if (targetLayoutWidgetDisplayStyle == 0 || targetLayoutWidgetDisplayStyle == 2) {
            var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] div[data-row="' + SYSPRO_VB.row_num + '"] div[data-section="' + SYSPRO_VB.section_num + '"]');
            $("#initial-fields-list-data-edit-window").show();
            $("#links-fields-list-data-edit-window").hide();
            $("#entry-fields-list-data-edit-window").hide();
            $(".field-caption-option").show();
            $(".text-alignment-options").show();
            $("#fieldBackgroundColorOption").show();
            $(".text-colour-weight-options").show();
            $(".linklist-text-option").hide();
            $(".icon-option").show();
        } else if (targetLayoutWidgetDisplayStyle == 1) {
            var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] tr[data-row="0"]');
            $("#initial-fields-list-data-edit-window").show();
            $("#links-fields-list-data-edit-window").hide();
            $("#entry-fields-list-data-edit-window").hide();
            $(".field-caption-option").hide();
            $(".text-alignment-options").hide();
            $("#fieldBackgroundColorOption").hide();
            $(".text-colour-weight-options").show();
            $(".linklist-text-option").hide();
            $(".icon-option").hide();
        } else if (targetLayoutWidgetDisplayStyle == 3) {
            var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] a[data-row="0"]');
            $("#initial-fields-list-data-edit-window").hide();
            $("#links-fields-list-data-edit-window").show();
            $("#entry-fields-list-data-edit-window").hide();
            $(".field-caption-option").hide();
            $(".text-alignment-options").hide();
            $(".text-colour-weight-options").hide();
            $("#fieldBackgroundColorOption").hide();
            $(".linklist-text-option").show();
            $(".icon-option").hide();
        } else if (targetLayoutWidgetDisplayStyle == 5) {
            var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] a[data-row="0"]');
            $("#initial-fields-list-data-edit-window").show();
            $("#links-fields-list-data-edit-window").show();
            $("#entry-fields-list-data-edit-window").show();
            $(".field-caption-option").hide();
            $(".text-alignment-options").hide();
            $(".text-colour-weight-options").hide();
            $("#fieldBackgroundColorOption").hide();
            $(".linklist-text-option").hide();
            $(".icon-option").hide();
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
            var targetParentWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid);
            var targetDataWidgetRowNum = SYSPRO_VB.currentDataWidgetHTML.data("row");
			
			//console.log(SYSPRO_VB.stringifyJSONObject(SYSPRO_VB.currentDataWidgetUid));
			
            sysproInterop.getHtmlFromModel(
				"Widget",
				SYSPRO_VB.stringifyJSONObject(SYSPRO_VB.currentDataWidgetUid),
				function (result) {
				    var newDataWidgetHTMLjQuery = $($.trim(result));
					
					//console.log(SYSPRO_VB.currentDataWidgetHTML.html());
					console.log(newDataWidgetHTMLjQuery.html());
					
				    if (targetParentWidget.DisplayStyle == 0 || targetParentWidget.DisplayStyle == 2) {

				        SYSPRO_VB.currentDataWidgetHTML.replaceWith(newDataWidgetHTMLjQuery);
				        SYSPRO_VB.initAddDataWidgets();

				    } else {

				        newDataWidgetHTMLjQuery.attr("data-row", targetDataWidgetRowNum);
				        newDataWidgetHTMLjQuery.data("row", targetDataWidgetRowNum);
				        SYSPRO_VB.currentDataWidgetHTML.replaceWith(newDataWidgetHTMLjQuery);

				    }

				    kendo.bind($("#dataEditWindow"), viewModel);
					sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true);
					
				    SYSPRO_VB.initEditRemoveDataWidget();

				    SYSPRO_VB.initDataWidgetSorting();

				    SYSPRO_VB.finishAddLayoutWidget();

				    SYSPRO_VB.initAddDataWidgets();

				},
				targetParentWidget.SubType,
				targetParentWidget.DisplayStyle,
				targetParentWidget.Border);

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
		SYSPRO_VB.openWindow = '';
		$(".typeahead-fields").val('');
		$(".typeahead-link-fields").val('');
		$(".typeahead-entry-fields").val('');
		$("#dataEditWindow .data-section-pane-2").fadeOut(50, function () {
            $("#dataEditWindow .data-section-pane-1").fadeIn(50);
        });
    },
    
    // Tile window open function
    tileWindowOpen: function () {
		
		SYSPRO_VB.openWindow = 'tileWindow';
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

        var column_num = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]').parents(".main-column").data("column");
        var widget_index = $('div[data-column="' + column_num + '"] .draggable-row-section').index($('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]'));
        var targetLayoutWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid); 
        var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] a[data-row="0"]');
		
		$("#tiles-list").on("click", ".list-group-item", function() {
			var tileName = $(this).data("tile-name");
			var tileParameters = SYSPRO_VB.tilesJSON[tileName];
			$(".tile-parameter-wrapper").hide();
			$("#tileWindow ." + tileName + "Parameters").show();
			
            $("#addTileButton").removeClass("disabled");
            $("#addTileButton").prop("disabled", false);
            $('#addTileButtonPopoverWrap').popover("destroy");
		});
		

        $("#tileWindow .btn-primary").off().on('click', function () {
			
			var tileWidth = $("#tileWindow input[name='tile_width']:checked").val();
			var tileName = $("#tileWindow #tiles-list .list-group-item.active").data("tile-name");
			var enteredTileParameters = {};
			var tileParameters = SYSPRO_VB.tilesJSON[tileName];
			if ( tileParameters != undefined && tileParameters.hasOwnProperty('Parameter') ) {
				if ( tileParameters.Parameter.length ) {
					for (var tp = 0; tp < tileParameters.Parameter.length; tp++ ) {
						if ( tileParameters.Parameter[tp].ParamType == "A" ) {
							enteredTileParameters[tileParameters.Parameter[tp].ParamName] = $("#tiles-parameters-wrapper ." + tileName + "Parameters input[name='" + tileParameters.Parameter[tp].ParamName + "']").val();
						} else if ( tileParameters.Parameter[tp].ParamType == "L" ) {
							enteredTileParameters[tileParameters.Parameter[tp].ParamName] = $("#tiles-parameters-wrapper ." + tileName + "Parameters select[name='" + tileParameters.Parameter[tp].ParamName + "']").val();
						}
					}
				} else {
					if ( tileParameters.Parameter.ParamType == "A" ) {
						enteredTileParameters[tileParameters.Parameter.ParamName] = $("#tiles-parameters-wrapper ." + tileName + "Parameters input[name='" + tileParameters.Parameter.ParamName + "']").val();
					} else if ( tileParameters.Parameter.ParamType == "L" ) {
						enteredTileParameters[tileParameters.Parameter.ParamName] = $("#tiles-parameters-wrapper ." + tileName + "Parameters select[name='" + tileParameters.Parameter.ParamName + "']").val();
					}
				} 
			}

			var tileType = $("#tileWindow #tiles-list .list-group-item.active").data("tile-type");
			var parentFieldPath = $("#tileWindow #tiles-list .list-group-item.active").data("tile-keyfield");
			var Id1 = sysproInterop.generateUUID();
			var Id2 = sysproInterop.generateUUID();
			var newTileWidget = new dataWidgetModel({ 
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
						},
						'', '', '',
						function (error) { console.log(error) 
						
					});
	                return "<div id='async_" + uid + "'> </div>";
	            }
			});
	
			if ( targetLayoutWidget.children.at(0).hasOwnProperty("Columns") ) {
				var columnIndex = targetLayoutWidget.children.at(0).Columns.length;
				var newColumn = new columnModel({ Id: Id2, Index: columnIndex, ResponsiveStyle: tileWidth });
				newColumn.append(newTileWidget);
				targetLayoutWidget.children.at(0).append(newColumn);
			} else {
				var newColumn = new columnModel({ Id: Id2, Index: 0, ResponsiveStyle: tileWidth });
				newColumn.append(newTileWidget);
				targetLayoutWidget.children.at(0).append(newColumn);
			}
			
			SYSPRO_VB.initiateTiles(targetLayoutWidget);
	        SYSPRO_VB.initAddDataWidgets();

            $("#tileWindow").data("kendoWindow").close();
            
            SYSPRO_VB.save();

        });

        $("#tileWindow .btn-default").off().on('click', function (e) {
            SYSPRO_VB.tileWindow.close();
        });
    },
    
    // tile window close function
    tileWindowClose: function () {
	    SYSPRO_VB.openWindow = '';
	    $("#tile-list-option").hide();
	    $(".tile-parameter-wrapper").hide();
	    $("#tileWindow input[type='text']").val("");
	    $("#tileWindow .list-group-item.active").removeClass("active");
	    //$("#tileWindow .tile_width").prop("checked", false);
	    $("#tile-text-option").hide();
	    $("#tile_list").html();
	    
	    $("#addTileButton").addClass("disabled");
        $("#addTileButton").prop("disabled", true);
    },
    
    // Tile edit window open function
    tileEditWindowOpen: function () {
		
		SYSPRO_VB.openWindow = 'tileEditWindow';
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
            SYSPRO_VB.tilesEditPanelBar.collapse($("li"));
            SYSPRO_VB.tilesEditPanelBar.clearSelection();
            SYSPRO_VB.tilesEditPanelBar.expand($("#tiles-edit-list .list-group .list-group-item.active").parents("li"));
        }
        
        showTileParameters($("#tiles-edit-list .list-group-item.active").data("tile-name"));
        
        var column_num = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]').parents(".main-column").data("column");
        var widget_index = $('div[data-column="' + column_num + '"] .draggable-row-section').index($('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"]'));
        var targetLayoutWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid); 
        var section = $('div[data-guid="' + SYSPRO_VB.layout_widget_guid + '"] a[data-row="0"]');
		
		$("#tiles-list").on("click", ".list-group-item", function() {
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
	    SYSPRO_VB.openWindow = '';
    },

    // Initialise Edit and remove functions on data widgets
    initEditRemoveDataWidget: function () {

        $(".panel.sys-widget:not(.sys-carousel) .panel.sys-widget .data-widget-options .col-xs-6:last-child i, .panel.sys-widget:not(.sys-carousel) .table td:last-child .data-widget-options i, .panel.sys-widget:not(.sys-carousel) .list-group .data-widget-options .col-xs-6:last-child i, .tile-widget .tile .data-widget-options .col-xs-6:last-child i").popover({
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
        sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, false);
        $(".add-data-section").off().on("click", function (a) {
            a.preventDefault();
            SYSPRO_VB.row_num = $(this).closest(".row").data("row");
            SYSPRO_VB.layout_widget_guid = $(this).parents(".draggable-row-section").data("guid");
			var targetParentWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid);
			var targetParentWidgetDisplayStyle = targetParentWidget.DisplayStyle;
			if ( targetParentWidgetDisplayStyle === 4 ) {
				console.log(targetParentWidget);
				viewModel.set("selected", targetParentWidget); //update the viewModel
				SYSPRO_VB.tileWindow.open();
			} else {
				SYSPRO_VB.section_num = $(this).closest("[data-section]").data("section");
            	SYSPRO_VB.dataWindow.open();
            }
        });

        SYSPRO_VB.initEditRemoveDataWidget();
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
                draggedWidgetCopy = VBdata[endParentColumn].Widgets[widget.oldIndex];
                viewModel.dataSource.remove(SYSPRO_VB.currentDraggedWidget);
            }
        } else if (widget.action === "receive") {

            if (widget.item.hasClass("quickAddWidget")) {
				console.log('ParentFieldPath');
                var widgetType = widget.item.attr("id");
                var Type = widget.item.data("layout-widget-type");
                var SubType = widget.item.data("layout-widget-subtype");
                var DisplayStyle = widget.item.data("layout-widget-displaystyle");
                var CardTypeDetail = widget.item.data("card-type-detail");
                var ParentFieldPath = widget.item.data("parent-field-path");
                
                SYSPRO_VB.rowWindowOpen();

                var newLayoutWidget = SYSPRO_VB.setupFinalLayoutWidget("", widgetType, "", Type, SubType, false, DisplayStyle, 0, 9, 8, "Joined", "", "", "", CardTypeDetail, ParentFieldPath, 0, 9, 0, 9, "");
                //Rob: Use the Id instead of uid
                var GUID = newLayoutWidget.Id;

                viewModel.dataSource.at(SYSPRO_VB.column_num).children.insert(widget.newIndex, newLayoutWidget);

                sysproInterop.getHtmlFromModel("Widget", SYSPRO_VB.stringifyJSONObject(GUID), function (result) {

                    var newWidgetHTMLjQuery = $($.trim(result));

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
			
			if ( !widget.item.hasClass("quickAddWidget") ) {
	            var VBdata = viewModel.dataSource.data().toJSON();
	            draggedWidgetCopy = VBdata[endParentColumn].Widgets[widget.oldIndex];
	            viewModel.dataSource.remove(SYSPRO_VB.currentDraggedWidget);
	
	            viewModel.dataSource.at(SYSPRO_VB.column_num).children.insert(widget.newIndex, draggedWidgetCopy);
	
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
        console.log("finishDragWidget");
        console.log(widget.action);
        finishDraggedWidget = $(widget.item);
        if (widget.action === 'receive') {
            viewModel.dataSource.at(SYSPRO_VB.column_num).children.insert(widget.newIndex, draggedWidgetCopy);
            SYSPRO_VB.save();

        }
    },

    // Runs when a data widget is finished being dragged
    finishDragDataWidget: function (widget) {

        if (widget.action === 'receive') {
            viewModel.dataSource.at(SYSPRO_VB.column_num).children.at(SYSPRO_VB.widget_index).children.at(SYSPRO_VB.row_num).children.at(SYSPRO_VB.section_num).append(SYSPRO_VB.draggedDataWidgetTempCopy);

            SYSPRO_VB.save();
        }
    },

    // Runs when a widget is finished being dragged
    finishQuickDragWidget: function (widget) {
        var widgetType = widget.item.attr("id");
        var Type = widget.item.data("layout-widget-type");
        var SubType = widget.item.data("layout-widget-subtype");
        var DisplayStyle = widget.item.data("layout-widget-displaystyle");
        var CardTypeDetail = widget.item.data("card-type-detail");

        SYSPRO_VB.rowWindowOpen();
		
        var newLayoutWidget = SYSPRO_VB.setupFinalLayoutWidget("", widgetType, "", Type, SubType, false, DisplayStyle, 0, 9, 8, "Joined", "", "", "", CardTypeDetail, ParentFieldPath, 0, 9, 0, 9, "");
        //Rob: Use the Id instead of the uid.
        var GUID = newLayoutWidget.Id;

        var newWidgetHTML = $(SYSPRO_VB.layoutWidgetHTML[widgetType]);

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
	    
	    var TypeName = element.data("layout-widget-type");
        var WidgetName = element.attr("id");     
        if ( TypeName === "Card" ) {
	        return $(SYSPRO_VB.cardsHTML[WidgetName]).clone().addClass("placeholderGhost");
        } else {
	        if ( SYSPRO_VB.layoutWidgetHTML[WidgetName] ) {
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
	                .width(element.width());
    },

    // Helper function for drag and drop interactivity
    quickhint: function (element) {

        var TypeName = element.data("layout-widget-type");
        var WidgetName = element.attr("id");
        
		if ( TypeName === "Card" ) {
	        return $(SYSPRO_VB.cardsHTML[WidgetName]).clone().addClass("hint").width($(".main-column").width());
        } else {
	        if ( SYSPRO_VB.layoutWidgetHTML[WidgetName] ) {
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
        return '<li class="panel draggable-data-section placeholderGhost sys-widget sys-box-shadow-off sys-mg-off"><div class="panel-body  text-center widget data-widget sys-bg-white"><span class="data-field-value sys-mg-off sys-txt-md text-left sys-500 sys-fg-inverse">Field value</span><small class="sys-300 pull-left sys-fg-inverse">' + captionText + '</small></div></li>';
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
            var previewWidgetHTMLjQuery = $($.trim(result));
            previewWidgetHTMLjQuery.find(".remove-row-section, .edit-row-section, .drag-row-section, .layout-widget-options").remove();
            $(".layout-widget-preview-wrapper").show();
            $(".layout-widget-preview-title").show();
            $(currentRowWindow + " .layout-widget-preview").html(previewWidgetHTMLjQuery);
            SYSPRO_VB.sizeTiles();
            sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, currentRowWindow + " .layout-widget-preview");
            SYSPRO_VB.previewLayoutWidget = null;
        });
    },

    // Regenerate the entire layout from a version of the JSON
    regenerateLayout: function () {

        $("#main-container > .row").html("");
        console.log(viewModel.columnLayout);
        console.log(viewModel.columnLayout);
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
                        SYSPRO_VB.rowWindow.open();
                    });

                    i++;
                    generateColumn();

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
                            SYSPRO_VB.rowWindow.open();
                        });


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
                                SYSPRO_VB.rowWindow.open();
                            });
                        });
                    });
                }
            }
        }
        generateColumn();

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
            changeLayoutOptions(Widget_Type, General_Type);

            // If the form is valid, the Validator will return true
            $("#addLayoutWidgetButton").removeClass("disabled");
            $("#addLayoutWidgetButton").prop("disabled", false);
            $('#addLayoutButtonPopoverWrap').popover("destroy");

        });
            
	    $('a#tile_layout_section').on('shown.bs.tab', function (e) {
	        console.log($(currentRowWindow + ' input#tiles_section'));
	        $(currentRowWindow + ' #tiles_section').prop('checked', true);
	        var General_Type = "LayoutWidget";
			console.log(General_Type);
			changeLayoutOptions("tiles_section", "LayoutWidget"); 
        });

        function changeLayoutOptions(Widget_Type, General_Type) {
		
			$(currentRowWindow + " .layout-section-styling-title").show();
			
			if ((Widget_Type != "line_chart_widget" && Widget_Type != "column_chart_widget") ) {
	            console.log("immediate preview");
                SYSPRO_VB.previewLayoutWidgetHTML("#rowWindow");
            } else {
                $(currentRowWindow + " #chart-fields-list").show();
                SYSPRO_VB.previewLayoutWidgetHTML("#rowWindow");
            }
            
            if (Widget_Type === "row_1_col") {
	            $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
				$(currentRowWindow + " .tile_section_options").hide();
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").show();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");

            } else if (Widget_Type === "row_2_col" || Widget_Type === "row_3_col" || Widget_Type === "row_4_col" || Widget_Type === "row_4_block" || Widget_Type === "row_6_block") {
	            $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
				$(currentRowWindow + " .tile_section_options").hide();
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").show();
                $(currentRowWindow + " .widget_border_options").show();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
            } else if (Widget_Type === "row_list_view") {
	            $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
	            $(currentRowWindow + " .tile_section_options").hide();
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").show();
                $(currentRowWindow + " .widget_listview_options").show();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " #all_borders").show();
                $(currentRowWindow + " #inner_borders").show();
                $(currentRowWindow + " #outer_borders").show();
                $(currentRowWindow + " #no_borders").hide();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
            } else if (Widget_Type === "row_link_list") {
	            $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
	            $(currentRowWindow + " .tile_section_options").hide();
                $(currentRowWindow + " .widget_linklist_options").show();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").show();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
            } else if (General_Type === "Card") {
	            $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
	            $(currentRowWindow + " .tile_section_options").hide();
                $(currentRowWindow + " .widget_title_options").hide();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " .widget_card_options").show();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
            } else if (General_Type === "Sparkline") {
	            $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
	            $(currentRowWindow + " .tile_section_options").hide();
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").show();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
                SYSPRO_VB.chartsPanelBar.select("#chart-fields-list .list-group li:first-child");
            } else if (Widget_Type === "row_carousel") {
	            $(currentRowWindow + " .layout-section-styling-title .step-number").text("3");
	            $(currentRowWindow + " .tile_section_options").hide();
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
            } else if (Widget_Type === "tiles_section") {
	            $(currentRowWindow + " .layout-section-styling-title .step-number").text("2");
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
                $(currentRowWindow + " .tile_section_options").show();
                $(currentRowWindow + " .widget_separator_options").hide();
                
                $("#addLayoutWidgetButton").removeClass("disabled");
                $("#addLayoutWidgetButton").prop("disabled", false);
                $('#addLayoutButtonPopoverWrap').popover("destroy");

            } else if (Widget_Type === "row_separator") {
                $(currentRowWindow + " .widget_title_options").hide();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " #no_borders").hide();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " .widget_separator_options").show();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
                $(currentRowWindow + " .tile_section_options").hide();
                
                $("#addLayoutWidgetButton").removeClass("disabled");
                $("#addLayoutWidgetButton").prop("disabled", false);
                $('#addLayoutButtonPopoverWrap').popover("destroy");
            } else if (Widget_Type === "standard_form_widget") {
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " #no_borders").hide();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
                $(currentRowWindow + " .tile_section_options").hide();
                
                $("#addLayoutWidgetButton").removeClass("disabled");
                $("#addLayoutWidgetButton").prop("disabled", false);
                $('#addLayoutButtonPopoverWrap').popover("destroy");
            }
            
        }

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
        
        $(currentRowWindow + " .icon-field-container").on("click", ".icon-option", function () {
            SYSPRO_VB.previewLayoutWidgetHTML("#rowWindow");
        });

        //Clear right panel when changing widget type to insert
        $(currentRowWindow + " a.widget-option-tab").on('show.bs.tab', function (e) {
			console.log("clearing right panel");
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
            changeEditLayoutOptions(Widget_Type, General_Type);
        }

        function changeEditLayoutOptions(Widget_Type, General_Type) {
			console.log("changeEditLayoutOptions");
            if (Widget_Type != "line_chart_widget" && Widget_Type != "column_chart_widget") {
                SYSPRO_VB.previewLayoutWidgetHTML(currentRowWindow);
            } else {
                $(currentRowWindow + " #chart-fields-list").show();
                SYSPRO_VB.previewLayoutWidgetHTML(currentRowWindow);
            }

            if (Widget_Type === "row_1_col") {
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").show();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " .tile_section_options").hide();
            } else if (Widget_Type === "row_2_col" || Widget_Type === "row_3_col" || Widget_Type === "row_4_col" || Widget_Type === "row_4_block" || Widget_Type === "row_6_block") {
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").show();
                $(currentRowWindow + " .widget_border_options").show();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " .tile_section_options").hide();
            } else if (Widget_Type === "row_list_view") {
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").show();
                $(currentRowWindow + " #all_borders").show();
                $(currentRowWindow + " #inner_borders").show();
                $(currentRowWindow + " #outer_borders").show();
                $(currentRowWindow + " #no_borders").hide();
                $(currentRowWindow + " .widget_listview_options").show();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " .tile_section_options").hide();
                if ( viewModel.selected.SubType === true ) {
	                viewModel.set("selected.SubType", "Striped");
                }
            } else if (Widget_Type === "row_link_list") {
	            $(currentRowWindow + " .widget_linklist_options").show();
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_border_options").show();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " .tile_section_options").hide();
                if ( viewModel.selected.SubType === true ) {
	                viewModel.set("selected.SubType", "Compact");
                }
            } else if (General_Type === "Card") {
                $(currentRowWindow + " .widget_title_options").hide();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_card_options").show();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " .tile_section_options").hide();
            } else if (General_Type === "Sparkline") {
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").show();
                $(currentRowWindow + " .tile_section_options").hide();
            } else if (Widget_Type === "row_carousel") {
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
                $(currentRowWindow + " .tile_section_options").hide();
            } else if (Widget_Type === "tiles_section") {
	            $(currentRowWindow + " .layout-section-styling-title .step-number").text("2");
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " #no_borders").show();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
                $(currentRowWindow + " .tile_section_options").show();
            } else if (Widget_Type === "row_separator") {
                $(currentRowWindow + " .widget_title_options").hide();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " #no_borders").hide();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " .widget_separator_options").show();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
                $(currentRowWindow + " .tile_section_options").hide();
                
                $("#addLayoutWidgetButton").removeClass("disabled");
                $("#addLayoutWidgetButton").prop("disabled", false);
                $('#addLayoutButtonPopoverWrap').popover("destroy");
            } else if (Widget_Type === "standard_form_widget") {
                $(currentRowWindow + " .widget_title_options").show();
                $(currentRowWindow + " .widget_joined_options").hide();
                $(currentRowWindow + " .widget_border_options").hide();
                $(currentRowWindow + " .widget_listview_options").hide();
                $(currentRowWindow + " #no_borders").hide();
                $(currentRowWindow + " .widget_linklist_options").hide();
                $(currentRowWindow + " .widget_card_options").hide();
                $(currentRowWindow + " .widget_chart_options").hide();
                $(currentRowWindow + " .widget_separator_options").hide();
                $(currentRowWindow + " #collapsible_title_styles").collapse("hide");
                $(currentRowWindow + " #widget_collapsible").prop('checked', false);
                $(currentRowWindow + " #widget_collapsible").parent(".btn-checkbox").removeClass("active");
                $(currentRowWindow + " .tile_section_options").hide();
                
                $("#addLayoutWidgetButton").removeClass("disabled");
                $("#addLayoutWidgetButton").prop("disabled", false);
                $('#addLayoutButtonPopoverWrap').popover("destroy");
            }
        }

        // Display only relevant border settings
        $(currentRowWindow + " input[name='blocks_joined']").change(function (e) {
            SYSPRO_VB.showCorrectBorderOptions($(this).val(), currentRowWindow);
            SYSPRO_VB.previewLayoutWidgetHTML(currentRowWindow);
        });
        
        $(currentRowWindow).off().on('change', "input[name='border_options'], input[name='widget_collapsible'], input[name='widget_title_text_colour'], input[name='widget_title_background_colour'], input[name='layout_widget_title'], input[name='listview_striped_rows'], input[name='card_colour'], input[name='chart_colour'], input[name='linklist_compact'], input.tile-row-column-layout, input[name='tile_border_colour'], input[name='separator_colour']", function (e) {

			changeEditLayoutOptions(Widget_Type, General_Type);
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
		
		$(currentRowWindow + " .icon-field-container").on("click", ".icon-option", function () {
            SYSPRO_VB.previewLayoutWidgetHTML(currentRowWindow);
        });
        
        $(currentRowWindow + " #chart-fields-list").on("click", ".list-group-item", function () {
            SYSPRO_VB.previewLayoutWidgetHTML(currentRowWindow);
        });

    },

    // Helper function to show correct border options
    showCorrectBorderOptions: function (widgetType, currentRowWindow) {
        if (widgetType === "Joined") {
            $(currentRowWindow + " #all_borders").show();
            $(currentRowWindow + " #inner_borders").show();
        } else {
            $(currentRowWindow + " #all_borders").hide();
            $(currentRowWindow + " #inner_borders").hide();
            if ($(currentRowWindow + " input[name='border_options']").val() == 3 || $(currentRowWindow + " input[name='border_options']").val() == 2) {
                $(currentRowWindow + " #border_options_2").prop("checked", false);
                $(currentRowWindow + " #border_options_2").parent().removeClass("active");
                $(currentRowWindow + " #border_options_3").prop("checked", false);
                $(currentRowWindow + " #border_options_3").parent().removeClass("active");
                $(currentRowWindow + " #border_options_1").prop("checked", true);
                $(currentRowWindow + " #border_options_1").parent().addClass("active");
            }
        }
    },

    // Setup Layout Widget helper function
    setupLayoutWidget: function (currentRowWindow) {
     
        var row_section_type = $(currentRowWindow + ".k-window-content").find("input[name='row_options']:checked");
		
        var WidgetName = $(row_section_type).val();
        console.log(WidgetName);
        var TypeName = $(row_section_type).data("layout-widget-type");
        var SubType = $(row_section_type).data("layout-widget-subtype");
        var CardTypeDetail = $(row_section_type).data("card-type-detail");
        var ParentFieldPath = $(row_section_type).data("parent-field-path");
        var DisplayStyle = $(row_section_type).data("layout-widget-displaystyle");
        var Title = $(currentRowWindow + " #layout_widget_title").val();
        var TilesRows = $(currentRowWindow + " .tile-radio-options").length;
        var Joined, Striped, Border, TitleForeground, TitleBackground, FieldName, FieldPath, CardBackground, CardColor, ChartColor, BackgroundColor, Icon;

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
		
		if ( DisplayStyle == 3 ) {
			if (document.querySelector(currentRowWindow + ' input[name="linklist_compact"]:checked') !== null) {
				SubType = document.querySelector(currentRowWindow + ' input[name="linklist_compact"]:checked').value;
				console.log(document.querySelector(currentRowWindow + ' input[name="linklist_compact"]:checked').value);
			}
		}
		
        if (document.querySelector(currentRowWindow + ' #chart-fields-list .list-group-item.active') !== null) {
            FieldName = $(currentRowWindow + ' #chart-fields-list .list-group-item.active').data("field-path");
            FieldPath = $(currentRowWindow + ' #chart-fields-list .list-group-item.active').data("field-path");
        }
        var ChartTitle = $(currentRowWindow + ' #chart_title').prop("checked");
        var ChartLegend = $(currentRowWindow + ' #chart_legend').prop("checked");
        var Collapsible = $(currentRowWindow + ' #widget_collapsible').prop("checked");
        var LineColor = $(currentRowWindow + ' input[name="separator_colour"]:checked').val();
        var kendoLayoutWidget = SYSPRO_VB.setupFinalLayoutWidget(currentRowWindow, WidgetName, Title, TypeName, SubType, Collapsible, DisplayStyle, Border, TitleBackground, TitleForeground, Joined, Striped, FieldName, FieldPath, CardTypeDetail, ParentFieldPath, CardBackground, CardColor, ChartColor, BackgroundColor, Icon, ChartTitle, ChartLegend, LineColor);
		console.log(WidgetName);
        console.log(kendoLayoutWidget);
        //Rob: Use the Id instead of the uid.
        var GUID = kendoLayoutWidget.Id;
        return [GUID, kendoLayoutWidget];

    },
	
    // FInal setup and creation of Kendo Object for Layout Widget
    setupFinalLayoutWidget: function (currentRowWindow, WidgetName, Title, TypeName, SubType, Collapsible, DisplayStyle, Border, TitleBackground, TitleForeground, Joined, Striped, FieldName, FieldPath, CardTypeDetail, ParentFieldPath, CardBackground, CardColor, ChartColor, BackgroundColor, Icon, ChartTitle, ChartLegend, LineColor) {

        //Rob: I now generate a unique id and use it when creating models for later use.
        var widgetId = sysproInterop.generateUUID();
		console.log(TypeName);
		console.log(WidgetName);
		switch (TypeName) {
			case "LayoutWidget":
				switch (WidgetName) {
		            case "row_1_col":
		                Rows = new rowModel({ Index: 0 });
		                Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
		                SubType = Joined;
		                //Rob: Set the Id in the constructor.
		                var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
		                kendoLayoutWidget.append(Rows);
		                break;
		            case "row_2_col":
		                Rows = new rowModel({ Index: 0 });
		                Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 4 }));
		                Rows.append(new columnModel({ Index: 1, ResponsiveStyle: 4 }));
		                SubType = Joined;
		                //Rob: Set the Id in the constructor.
		                var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
		                kendoLayoutWidget.append(Rows);
		                break;
		            case "row_3_col":
		                Rows = new rowModel({ Index: 0 });
		                Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 5 }));
		                Rows.append(new columnModel({ Index: 1, ResponsiveStyle: 5 }));
		                Rows.append(new columnModel({ Index: 2, ResponsiveStyle: 5 }));
		                SubType = Joined;
		                //Rob: Set the Id in the constructor.
		                var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
		                kendoLayoutWidget.append(Rows);
		                break;
		            case "row_4_col":
		                Rows = new rowModel({ Index: 0 });
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
		                Rows = new rowModel({ Index: 0 });
		                Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 4 }));
		                Rows.append(new columnModel({ Index: 1, ResponsiveStyle: 4 }));
		                Rows2 = new rowModel({ Index: 1 });
		                Rows2.append(new columnModel({ Index: 0, ResponsiveStyle: 4 }));
		                Rows2.append(new columnModel({ Index: 1, ResponsiveStyle: 4 }));
		                SubType = Joined;
		                //Rob: Set the Id in the constructor.
		                var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
		                kendoLayoutWidget.append(Rows);
		                kendoLayoutWidget.append(Rows2);
		                break;
		            case "row_6_block":
		                Rows = new rowModel({ Index: 0 });
		                Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 5 }));
		                Rows.append(new columnModel({ Index: 1, ResponsiveStyle: 5 }));
		                Rows.append(new columnModel({ Index: 2, ResponsiveStyle: 5 }));
		                Rows2 = new rowModel({ Index: 1 });
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
		                Rows = new rowModel({ Index: 0 });
		                Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
		                SubType = Striped;
		                //Rob: Set the Id in the constructor.
		                var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
		                kendoLayoutWidget.append(Rows);
		                break;
		            case "row_link_list":
		            case "row_carousel":
		                Rows = new rowModel({ Index: 0 });
		                Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
		                SubType = SubType;
		                var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
		                kendoLayoutWidget.append(Rows);
		                break;
		            case "tiles_section":
		                SubType = SubType;
		                var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, BackgroundColor: BackgroundColor, Icon: Icon });
		                Rows = new rowModel({ Index: 0 });
		                kendoLayoutWidget.append(Rows);
		                break;
		            case "standard_form_widget":
		            	Rows = new rowModel({ Index: 0 });
		                Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
		                SubType = Joined;
		                //Rob: Set the Id in the constructor.
		                var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, Icon: Icon });
		                kendoLayoutWidget.append(Rows);
                }
				break;
			case "Sparkline":
				Rows = new rowModel({ Index: 0 });
                Rows.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
                //Rob: Set the Id in the constructor.
                var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, FieldName: FieldName, FieldPath: FieldPath, Details: { Color: ChartColor }, Icon: Icon, ChartTitle: ChartTitle, ChartLegend: ChartLegend });
                kendoLayoutWidget.append(Rows);
				break;
			case "Card":
				Rows = [];
                //Rob: Set the Id in the constructor.
                var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, Collapsible: Collapsible, DisplayStyle: DisplayStyle, Border: Border, TitleBackground: TitleBackground, TitleForeground: TitleForeground, CardTypeDetail: CardTypeDetail, ParentFieldPath: ParentFieldPath, BackgroundColor: CardBackground, Details: { Color: CardColor }, Icon: Icon });
                kendoLayoutWidget.append(Rows);
                break;
            case "StaticElement":
				Rows = [];
                //Rob: Set the Id in the constructor.
                var kendoLayoutWidget = new layoutWidgetModel({ Id: widgetId, Title: Title, TypeName: TypeName, SubType: SubType, WidgetName: WidgetName, DisplayStyle: DisplayStyle, Details: { Color: LineColor }, Color: LineColor });
                kendoLayoutWidget.append(Rows);
		}

        return kendoLayoutWidget;
    },

    // Insert Layout Widget
    insertLayoutWidget: function (currentRowWindow, GUID, widgetObject) {

        var VBdata = viewModel.dataSource.data().toJSON();
        var CleanWidget = widgetObject.toJSON();
        var SubType = widgetObject.SubType;
        CleanWidget.Id = GUID;
        VBdata[SYSPRO_VB.column_num].Widgets.unshift(CleanWidget);

        viewModel.dataSource.data(VBdata);
		
        sysproInterop.getHtmlFromModel("Widget", SYSPRO_VB.stringifyJSONObject(GUID), function (result) {
            var newWidgetHTMLjQuery = $($.trim(result));
			if ( widgetObject.DisplayStyle == 4 ) {
				newWidgetHTMLjQuery.find(".data-section").removeClass("data-section");
			}
            SYSPRO_VB.column.find(".sortable-list").prepend(newWidgetHTMLjQuery);

            $(currentRowWindow + " .layout-radio-options .btn-radio").each(function () {
                $(this).removeClass("active");
            });

            $(currentRowWindow + " span[href='#empty-tab']").tab('show');

            SYSPRO_VB.finishAddLayoutWidget();

            SYSPRO_VB.initAddDataWidgets();
        });

        SYSPRO_VB.save();

    },

    // Helper function to 
    setUpDataWidget: function (parentWindow, targetLayoutWidgetDisplayStyle) {

        var TextColour, TextSize, TextWeight, TextAlign, DataBackground, IconOption, IconColour, IconAlign, IconSize, Title, HasSmartTag, DataType, KeyField, KeyAction, EntryType;

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
        IconTooltip = $(parentWindow + " #icon_tooltip").val();
        Title = $(parentWindow + " #linklist_link_text").val();
        var dataWidgetClone = $(parentWindow + " .fields-wrapper .list-group-item.active.field-name").clone();
        dataWidgetClone.find("i").remove();
        FieldName = dataWidgetClone.text();
        FieldPath = dataWidgetClone.data("field-path");
        HasSmartTag = dataWidgetClone.data("smart-tag");
        DataType = dataWidgetClone.data("data-type");
        KeyField = dataWidgetClone.data("key-field");
        EntryType = dataWidgetClone.data("entry-type");
        KeyAction = dataWidgetClone.data("key-action");
        Caption = $(parentWindow + " #data_show_caption").prop("checked");
        if ( targetLayoutWidgetDisplayStyle == 5 ) {
	        TypeName = "EntryDataWidget";
        } else {
	        TypeName = "DataWidget";
        }
        
        SubType = "";

        //Rob: Generate a Unique GUID for the Id and set it so we don't have to use the kendo uid because we don't have it yet.
        var KendoDataWidget = new dataWidgetModel({ Id: sysproInterop.generateUUID(), Title: Title, FieldName: FieldName, FieldPath: FieldPath, HasSmartTag: HasSmartTag, DataType: DataType, KeyField: KeyField, KeyAction: KeyAction, TypeName: TypeName, SubType: SubType, BackgroundColor: DataBackground, Caption: { Color: 8, Size: 0, Alignment: TextAlign, Visibility: Caption }, Value: { Color: TextColour, Size: TextSize, Alignment: TextAlign, Weight: TextWeight }, Icon: { Name: IconOption, Color: IconColour, Size: IconSize, Alignment: IconAlign, Tooltip: IconTooltip }, EntryType: EntryType });
        //Rob: Use the ID instead of the uid.
        var dataGUID = KendoDataWidget.Id;

        return [dataGUID, KendoDataWidget];
    },

    // Helper function to insert new Kendo Data Widget
    insertDataWidget: function (dataGUID, widgetObject, column_num, widget_index, row_num, section_num, section, parentGUID) {
		
        //Rob: Now always do a get instead of getByUid so we can use our own Id.
        var targetParentWidget = viewModel.dataSource.get(parentGUID);
        if (targetParentWidget.DisplayStyle == 0) {

            viewModel.dataSource.at(column_num).children.at(widget_index).children.at(row_num).children.at(section_num).append(widgetObject);

        } else if (targetParentWidget.DisplayStyle == 1) {

            var initialNumRowsInTable = targetParentWidget.Rows.length;
            var targetParentWidgetJSON = targetParentWidget.toJSON();
            if (targetParentWidgetJSON.Rows[0].Columns[0].hasOwnProperty("Widgets")) {
                section = $('div[data-guid="' + parentGUID + '"] tr[data-row="' + initialNumRowsInTable + '"]');
                var Row = new rowModel({ Index: (initialNumRowsInTable) });
                Row.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
                targetParentWidget.append(Row);
                targetParentWidget.children.at(initialNumRowsInTable).children.at(0).append(widgetObject);
                var listViewRowNumber = initialNumRowsInTable + 1;

            } else {
                section = $('div[data-guid="' + parentGUID + '"] tr[data-row="0"]');
                var listViewRowNumber = 1;
                targetParentWidget.children.at(0).children.at(0).append(widgetObject);

            }

        } else if (targetParentWidget.DisplayStyle == 2) {

            var initialNumRowsInCarousel = targetParentWidget.Rows.length;
            var targetParentWidgetJSON = targetParentWidget.toJSON();

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

        } else if (targetParentWidget.DisplayStyle == 3) {

            var initialNumRowsInList = targetParentWidget.Rows.length;
            var targetParentWidgetJSON = targetParentWidget.toJSON();

            if (targetParentWidgetJSON.Rows[0].Columns[0].hasOwnProperty("Widgets")) {

                section = $('div[data-guid="' + parentGUID + '"] a[data-row="' + initialNumRowsInList + '"]');
                var Row = new rowModel({ Index: (initialNumRowsInList) });
                Row.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
                targetParentWidget.append(Row);
                targetParentWidget.children.at(initialNumRowsInList).children.at(0).append(widgetObject);
                var linkListRowNumber = initialNumRowsInList + 1;

            } else {
                section = $('div[data-guid="' + parentGUID + '"] a[data-row="0"]');
                var linkListRowNumber = 1;
                targetParentWidget.children.at(0).children.at(0).append(widgetObject);

            }

        } else if (targetParentWidget.DisplayStyle == 5) {

            var initialNumRowsInList = targetParentWidget.Rows.length;
            var targetParentWidgetJSON = targetParentWidget.toJSON();

            if (targetParentWidgetJSON.Rows[0].Columns[0].hasOwnProperty("Widgets")) {

                section = $('div[data-guid="' + parentGUID + '"] .form-group[data-row="' + initialNumRowsInList + '"]');
                var Row = new rowModel({ Index: (initialNumRowsInList) });
                Row.append(new columnModel({ Index: 0, ResponsiveStyle: 0 }));
                targetParentWidget.append(Row);
                targetParentWidget.children.at(initialNumRowsInList).children.at(0).append(widgetObject);
                var linkListRowNumber = initialNumRowsInList + 1;

            } else {
                section = $('div[data-guid="' + parentGUID + '"] .form-group[data-row="0"]');
                var linkListRowNumber = 1;
                targetParentWidget.children.at(0).children.at(0).append(widgetObject);

            }

        }

        sysproInterop.getHtmlFromModel("Widget",
			SYSPRO_VB.stringifyJSONObject(dataGUID),
			function (result) {

			    var newDataWidgetHTMLjQuery = $($.trim(result));

			    if (targetParentWidget.DisplayStyle == 0) {

			        if (section.find(".add-data-widget")) {
			            section.find(".add-data-widget").hide();
			        }
			        section.append(newDataWidgetHTMLjQuery);

			    } else if (targetParentWidget.DisplayStyle == 1) {

			        newDataWidgetHTMLjQuery.attr("data-row", listViewRowNumber);
			        newDataWidgetHTMLjQuery.data("row", listViewRowNumber);
			        newDataWidgetHTMLjQuery.insertAfter(section);
			    } else if (targetParentWidget.DisplayStyle == 2) {

			        if (section.find(".add-data-widget")) {
			            section.find(".add-data-widget").remove();
			        }

			        section.append(newDataWidgetHTMLjQuery);

			        section.parents(".carousel-inner").append('<div class="item"><div class="panel-body sys-bg-white text-left"><div class="row " data-row="' + carouselRowNumber + '"><div class="col-xs-12" data-section="0"><div class="panel sys-widget sys-box-shadow-off sys-mg-off  add-data-widget"><div class="panel-body text-center sys-fg-primary"><a class="pull-left text-center add-data-section" href="#"><i class="material-icons">note_add</i></a></div></div></div></div></div></div>');

			        SYSPRO_VB.initAddDataWidgets();

			    } else if (targetParentWidget.DisplayStyle == 3 || targetParentWidget.DisplayStyle == 5) {

			        newDataWidgetHTMLjQuery.attr("data-row", linkListRowNumber);
			        newDataWidgetHTMLjQuery.data("row", linkListRowNumber);

			        newDataWidgetHTMLjQuery.insertAfter(section);
			    }

			    kendo.bind($("#dataEditWindow"), viewModel);

			    sysproInterop.performBind(SYSPRO_VB.bindableFieldsData, true, null, section.closest(".layout-widget"));

			    SYSPRO_VB.initEditRemoveDataWidget();
			    SYSPRO_VB.initDataWidgetSorting();

			},
		targetParentWidget.SubType,
		targetParentWidget.DisplayStyle,
		targetParentWidget.Border);

        SYSPRO_VB.save();

    },

    // Initialising some JS after Layout Widgets added
    finishAddLayoutWidget: function () {

        $(".layout-widget-options .col-xs-6:last-child i").popover({
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
        SYSPRO_VB.sizeTiles();
        SYSPRO_VB.initNormalSorting();
        SYSPRO_VB.initDataWidgetSorting();

    },

    // Main sorting initialisation function for layout widgets
    initNormalSorting: function () {
        sortableWidgets = [];

        $('.sortable-list').each(function (index) {

            sortableWidgets[index] = $(this).kendoSortable({
                connectWith: '.sortable-list',
                placeholder: SYSPRO_VB.placeholder,
                hint: SYSPRO_VB.hint,
                filter: '>div.draggable-row-section',
                ignore: ".data-section, .data-section>div, .data-section *, .tile-widget, .tile, .tile-widget *, .form-control, .form-group *",
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
        sortableDataWidgets = [];

        $('.data-section').each(function (index) {
            sortableDataWidgets[index] = $(this).kendoSortable({
                connectWith: '.data-section',
                placeholder: SYSPRO_VB.placeholder,
                hint: SYSPRO_VB.hint,
                filter: '>div',
                disabled: '.add-data-widget',
                handle: ".drag-data-section",
                cursor: "move",
                start: function (widget) {
                    $(".data-section .panel.add-data-widget").each(function () {
                        $(this).addClass("pulse");
                    });
                    var parentSortableList = $(widget.draggableEvent.originalEvent.srcElement.parentElement);

                    // Need to disable every sortable widget that already has a data widget in it, so it cannot be a valid target
                    $(".draggable-data-section").each(function () {
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
                        SYSPRO_VB.draggedDataWidgetUid = widget.item.data("guid");
                        //Rob: Now always do a get instead of getByUid so we can use our own Id.
                        SYSPRO_VB.draggedDataWidget = viewModel.dataSource.get(SYSPRO_VB.draggedDataWidgetUid);
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

                            //Rob: Generate a Unique GUID for the Id and set it so we don't have to use the kendo uid because we don't have it yet.
                            var kendoDataWidget = new dataWidgetModel({ Id: sysproInterop.generateUUID(), FieldName: dataWidgetFieldName, FieldPath: dataWidgetFieldPath, HasSmartTag: dataWidgetSmartTag, DataType: dataWidgetDataType, TypeName: "DataWidget", SubType: "", BackgroundColor: 9, Caption: { Color: 8, Size: 0, Alignment: 0, Visibility: true }, Value: { Color: 8, Size: 1, Alignment: 0, Weight: 1 }, Icon: { Name: "", Color: 0, Size: 0, Alignment: 0, Tooltip: "" } });
                            //Rob: Use the ID instead of the uid.
                            SYSPRO_VB.insertDataWidget(kendoDataWidget.Id, kendoDataWidget, SYSPRO_VB.column_num, SYSPRO_VB.widget_index, SYSPRO_VB.row_num, SYSPRO_VB.section_num, SYSPRO_VB.section, SYSPRO_VB.layout_widget_guid);

                            SYSPRO_VB.finishAddLayoutWidget();

                            SYSPRO_VB.initAddDataWidgets();

                            widget.preventDefault();

                        } else {

                            SYSPRO_VB.currentDataWidgetHTML = widget.item.closest(".draggable-data-section");

                            //Rob: Now always do a get instead of getByUid so we can use our own Id.
                            var targetParentWidget = viewModel.dataSource.get(SYSPRO_VB.layout_widget_guid);
                            var targetDataWidgetRowNum = SYSPRO_VB.currentDataWidgetHTML.data("row");

                            sysproInterop.getHtmlFromModel(
								"Widget",
								SYSPRO_VB.stringifyJSONObject(SYSPRO_VB.currentDataWidgetUid),
								function (result) {

								    var newDataWidgetHTMLjQuery = $($.trim(result));

								    if (targetParentWidget.DisplayStyle == 0) {

								        SYSPRO_VB.currentDataWidgetHTML.replaceWith(newDataWidgetHTMLjQuery);

								    } else if (targetParentWidget.DisplayStyle == 1) {

								        newDataWidgetHTMLjQuery.attr("data-row", targetDataWidgetRowNum);
								        newDataWidgetHTMLjQuery.data("row", targetDataWidgetRowNum);
								        SYSPRO_VB.currentDataWidgetHTML.replaceWith(newDataWidgetHTMLjQuery);

								    } else if (targetParentWidget.DisplayStyle == 2) {

								        SYSPRO_VB.currentDataWidgetHTML.replaceWith(newDataWidgetHTMLjQuery);
								        SYSPRO_VB.initAddDataWidgets();

								    } else if (targetParentWidget.DisplayStyle == 3) {

								        newDataWidgetHTMLjQuery.attr("data-row", targetDataWidgetRowNum);
								        newDataWidgetHTMLjQuery.data("row", targetDataWidgetRowNum);
								        SYSPRO_VB.currentDataWidgetHTML.replaceWith(newDataWidgetHTMLjQuery);

								    }

								    kendo.bind($("#dataEditWindow"), viewModel);

								    SYSPRO_VB.initEditRemoveDataWidget();
								    SYSPRO_VB.initDataWidgetSorting();
								    SYSPRO_VB.finishAddLayoutWidget();
								    SYSPRO_VB.initAddDataWidgets();

								},
								targetParentWidget.SubType,
								targetParentWidget.DisplayStyle,
								targetParentWidget.Border);

                        }


                    } else if (widget.action === "remove") {

                        //Rob: Now always do a get instead of getByUid so we can use our own Id.
                        var currentDraggedDataWidget = viewModel.dataSource.get($(widget.item).data("guid"));
                        SYSPRO_VB.draggedDataWidgetTempCopy = currentDraggedDataWidget;
                        viewModel.dataSource.remove(currentDraggedDataWidget);

                    } else if (widget.action === "sort") {

                    }

                },
                change: function (widget) {
                    SYSPRO_VB.finishDragDataWidget(widget);
                },

                move: function (widget) {

                    SYSPRO_VB.column_num = widget.target.parents(".main-column").data("column");

                    if (widget.target.hasClass("data-section")) {
                        SYSPRO_VB.section_num = widget.target.data("section");
                    } else {
                        SYSPRO_VB.section_num = widget.target.parent(".data-section").data("section");
                    }
                    if (SYSPRO_VB.tempHiddenWidg != null) {
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
                    SYSPRO_VB.row_num = widget.target.parents(".row").data("row");
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
        quickSortableWidgets = [];

        $('#initial-fields-list .list').each(function (index) {

            quickSortableWidgets[index] = $(this).kendoSortable({
                connectWith: '.data-section',
                placeholder: SYSPRO_VB.quickPlaceHolderData,
                hint: SYSPRO_VB.quickHintData,
                filter: '>li',
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
        quickAddLayoutWidgets = $('.quick-sortable-list').kendoSortable({
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
        layoutWidgetCount = 0;

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
        columnCount = 0;
        dataWidgetCount = 0;

        for (var i = 0; i < dataSource._data.length; i++) {
            for (var prop in dataSource._data[i]) {
                if (prop === "Widgets") {
                    for (var j = 0; j < dataSource._data[i][prop].length; j++) {
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

        availableDataWidgetCount = columnCount - dataWidgetCount;
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
		
		if ( SYSPRO_VB.openWindow === 'dataWindow' ) {
			
			SYSPRO_VB.dataWindowPanelBar.collapse($("li"));
	        SYSPRO_VB.dataWindowPanelBar.clearSelection();
			var currentItem = $("#initial-fields-list-data-window-wrapper .fieldsPanelBar .list-group-item[data-field-path='" + item.fieldpath + "']");
			setTimeout(function(){console.log(currentItem.position())}, 1000);
			currentItem.addClass("active");
	        currentItem.parents(".fieldsPanelBar").find(".list-group-item").each(function (index) {
	            $(this).not(currentItem).removeClass("active");
	        });
			SYSPRO_VB.dataWindowPanelBar.expand(currentItem.parents("li"));
			
			setTimeout(function() {
				$("#dataWindow .fields-wrapper").scrollTop(currentItem.position().top);
			},
			500);
			
			if (SYSPRO_VB.dataValidator.validate()) {
	            // If the form is valid, the Validator will return true
	            $("#addDataWidgetButton").removeClass("disabled");
	            $("#addDataWidgetButton").prop("disabled", false);
	            $('#addDataButtonPopoverWrap').popover("destroy");
	        }
	        $("#fieldStylingOptions").show();
	        
		} else if ( SYSPRO_VB.openWindow === 'dataEditWindow' ) {
			
			viewModel.set("selected.FieldPath", item.fieldpath); //update the viewModel
			viewModel.set("selected.FieldName", ''); //update the viewModel
			viewModel.set("selected.DataType", item.datatype); //update the viewModel
			viewModel.set("selected.HasSmartTag", item.smarttag); //update the viewModel
			SYSPRO_VB.editDataWindowPanelBar.collapse($("li"));
	        SYSPRO_VB.editDataWindowPanelBar.clearSelection();
			var currentItem = $("#initial-fields-list-data-edit-window-wrapper .fieldsPanelBar .list-group-item[data-field-path='" + item.fieldpath + "']");
			currentItem.addClass("active");
	        currentItem.parents(".fieldsPanelBar").find(".list-group-item").each(function (index) {
	            $(this).not(currentItem).removeClass("active");
	        });
			SYSPRO_VB.editDataWindowPanelBar.expand(currentItem.parents("li"));
			
			setTimeout(function() {
				$("#dataEditWindow .fields-wrapper").scrollTop(currentItem.position().top);
			},
			500);
		}
		
	},
	
	// Error Notification display function
	showErrorMessage: function(message, title) {
		if ( title && title != '' ) {
			title = title;
		} else {
			title = "Sorry, something has gone wrong. The technical error message is:";
		}
		SYSPRO_VB.errorNotification.show({
            title: title,
            message: message
        }, "error");	
	},
	
	initiateTiles: function(tileWidget) {
		
		var tileWidgetId = tileWidget.Id;		
        
		$('.layout-widget[data-guid="' + tileWidgetId + '"] .tile-widget').kendoListView({
            dataSource: tileWidget.Rows[0].Columns,
            template: kendo.template($("#tileTemplate").html())
        });
        $('.layout-widget[data-guid="' + tileWidgetId + '"] .tile-widget').append('<div class="col-sm-3 col-xs-6 tile unsortable-tile"><div class="panel sys-widget sys-box-shadow-off sys-mg-off add-data-widget tile-inner"> <div class="panel-body text-center sys-fg-primary"> <a href="#" class="pull-left text-center add-data-section" data-tooltip="tooltip" data-placement="top" data-original-title="Add Tile"> <i class="material-icons">note_add</i></a></div></div></div>');
        
        $('.layout-widget[data-guid="' + tileWidgetId + '"] .tile-widget').kendoSortable({
            filter: ">div.tile",
            disabled: '.unsortable-tile',
            handle: '.drag-row-section',
            cursor: "move",
            placeholder: function(element) {
                return element.clone().css("opacity", 0.1);
            },
            hint: function(element) {
                var originalWidth = element.width();
                return element.clone().removeClass("k-state-selected").width(originalWidth);
            },
            change: function(e) {
                var dataItem = viewModel.dataSource.get(e.item.data("guid"));
                var parentTileWidget = viewModel.dataSource.get($(e.item).parents(".layout-widget").data("guid"));
                viewModel.dataSource.remove(dataItem);
                parentTileWidget.children.at(0).children.insert(e.newIndex, dataItem);
                $('.layout-widget[data-guid="' + parentTileWidget.Id + '"] .tile-widget').append('<div class="col-sm-3 col-xs-6 tile unsortable-tile"><div class="panel sys-widget sys-box-shadow-off sys-mg-off add-data-widget tile-inner"> <div class="panel-body text-center sys-fg-primary"> <a href="#" class="pull-left text-center add-data-section" data-tooltip="tooltip" data-placement="top" data-original-title="Add Tile"> <i class="material-icons">note_add</i></a></div></div></div>');
                SYSPRO_VB.initAddDataWidgets();
                SYSPRO_VB.sizeTiles();
            }
        });
        
        // Tiles initialisation JS
		SYSPRO_VB.sizeTiles();
    },
    
    getRandomInt: function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	
	sizeTiles: function() {
		$(".tile").height($(".tile.col-sm-3").first().width());
	},
	
	initiateExistingTiles: function() {
		$('.tile-widget').each(function(i){
			var tileWidget = viewModel.dataSource.get($(this).parents('.layout-widget').data("guid"));
			SYSPRO_VB.initiateTiles(tileWidget);
		});	
	},	
	
	// General local JSON loading function, using vanilla JavaScript - tailored for icons
    loadIconJSON: function (callback) {
        console.log("loadIconJSON");
        sysproInterop.getIconsAvailable(callback);
    },
    
    // PanelBar Initialisation helper
    initialisePanelBar: function(PanelBar) {
		$(PanelBar).on("click", ".list-group-item", function (event) {
            $(this).addClass("active");
            var currentItem = $(this);
            $(PanelBar).find(".list-group-item").each(function (index) {
                $(this).not(currentItem).removeClass("active");
            });
        });  
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

function showModel() {

}