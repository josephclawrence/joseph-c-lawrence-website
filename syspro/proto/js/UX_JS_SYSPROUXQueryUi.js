var Dictionary = (function () {
    function Dictionary(init) {
        this._keys = [];
        this._values = [];
        if (init) {
            for (var x = 0; x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }
    }
    Dictionary.prototype.add = function (key, value) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    };
    Dictionary.prototype.remove = function (key) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        delete this[key];
    };
    Dictionary.prototype.keys = function () {
        return this._keys;
    };
    Dictionary.prototype.values = function () {
        return this._values;
    };
    Dictionary.prototype.containsKey = function (key) {
        if (typeof this[key] === "undefined") {
            return false;
        }
        return true;
    };
    Dictionary.prototype.toLookup = function () {
        return this;
    };
    return Dictionary;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TypeAheadParent = (function () {
    function TypeAheadParent() {
    }
    return TypeAheadParent;
}());
var ProgramListItem = (function () {
    function ProgramListItem() {
    }
    return ProgramListItem;
}());
var FieldValueModel = (function () {
    function FieldValueModel() {
    }
    return FieldValueModel;
}());
var ErrorMessageModel = (function () {
    function ErrorMessageModel() {
    }
    return ErrorMessageModel;
}());
var GridInternalEventParameter = (function () {
    function GridInternalEventParameter() {
    }
    return GridInternalEventParameter;
}());
var ToolbarModel = (function (_super) {
    __extends(ToolbarModel, _super);
    function ToolbarModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ToolbarModel;
}(ErrorMessageModel));
var ModalWindowModel = (function () {
    function ModalWindowModel() {
    }
    return ModalWindowModel;
}());
var ESPQRY_SB_Results = (function () {
    function ESPQRY_SB_Results() {
        this.Query = new COMFNDQuery();
    }
    return ESPQRY_SB_Results;
}());
var COMFNDQuery = (function () {
    function COMFNDQuery() {
        this.Search = new Search();
    }
    return COMFNDQuery;
}());
var Search = (function () {
    function Search() {
        this.GlobalValue = "";
        this.GlobalValue1 = "";
        this.GlobalValue2 = "";
        this.Columns = new Columns();
        this.Where = new Where();
        this.OrderBy = new Columns();
    }
    return Search;
}());
var Columns = (function () {
    function Columns() {
    }
    return Columns;
}());
var Where = (function () {
    function Where() {
        this.Expression = new Array();
    }
    return Where;
}());
var Expression = (function () {
    function Expression() {
    }
    return Expression;
}());
var ColumnMetadata = (function () {
    function ColumnMetadata() {
        this.ColumnValues = new ColumnValues();
    }
    return ColumnMetadata;
}());
var ColumnValues = (function () {
    function ColumnValues() {
        this.ColumnValue = new Array();
    }
    return ColumnValues;
}());
var ColumnValue = (function () {
    function ColumnValue() {
    }
    return ColumnValue;
}());
var Results = (function () {
    function Results() {
        this.HeaderDetails = new HeaderDetails();
        this.Rows = new Array();
    }
    return Results;
}());
var Row = (function () {
    function Row() {
    }
    return Row;
}());
var HeaderDetails = (function () {
    function HeaderDetails() {
        this.Columns = new Columns();
        this.OrderBy = new Columns();
        this.ColumnMetadata = new ColumnMetadataColumn();
    }
    return HeaderDetails;
}());
var ColumnMetadataColumn = (function () {
    function ColumnMetadataColumn() {
        this.Columns = new Array();
    }
    return ColumnMetadataColumn;
}());
var ESPQSCResult = (function () {
    function ESPQSCResult() {
        this.Query = new ESPQSCQuery();
    }
    return ESPQSCResult;
}());
var ESPQSCQuery = (function () {
    function ESPQSCQuery() {
        this.Item = new ESPQSCItem();
    }
    return ESPQSCQuery;
}());
var ESPQSCItem = (function () {
    function ESPQSCItem() {
        this.Columns = new ESPQSCColumns();
    }
    return ESPQSCItem;
}());
var ESPQSCColumns = (function () {
    function ESPQSCColumns() {
        this.Categories = new Array();
    }
    return ESPQSCColumns;
}());
var ESPQSCCategories = (function () {
    function ESPQSCCategories() {
        this.Column = new Array();
    }
    return ESPQSCCategories;
}());
var ESPQSCColumn = (function () {
    function ESPQSCColumn() {
        this.ColumnValues = new Array();
    }
    return ESPQSCColumn;
}());
var ESPQSCColumnValue = (function () {
    function ESPQSCColumnValue() {
        this.ColumnValue = new Array();
    }
    return ESPQSCColumnValue;
}());
var ESPQSCColumnValueDetails = (function () {
    function ESPQSCColumnValueDetails() {
    }
    return ESPQSCColumnValueDetails;
}());
var ExistingFilters = (function () {
    function ExistingFilters() {
    }
    return ExistingFilters;
}());
var QueryLayoutUIHelpersClass = (function () {
    function QueryLayoutUIHelpersClass() {
        this.offCanvasesCreated = [];
        this.tilesCreated = [];
        this.kendoWindowsCreated = [];
        this.resizeToFunction = null;
        this.programListTypeahead = new Array();
        this.typeParent = new TypeAheadParent();
        this.kendoWindowsCreatedInContainer = new Dictionary([]);
    }
    ;
    QueryLayoutUIHelpersClass.prototype.formatLongNumber = function (value, kendoFormat) {
        if (!kendoFormat) {
            kendoFormat = "n0";
        }
        if (value == 0) {
            return "0";
        }
        else {
            if (value <= 999) {
                return kendo.toString(value, kendoFormat);
            }
            else if (value >= 1000 && value <= 999999) {
                return kendo.toString(value / 1000, kendoFormat) + 'K';
            }
            else if (value >= 1000000 && value <= 999999999) {
                return kendo.toString(value / 1000000, kendoFormat) + 'M';
            }
            else if (value >= 1000000000 && value <= 999999999999) {
                return kendo.toString(value / 1000000000, kendoFormat) + 'B';
            }
            else
                return kendo.toString(value, kendoFormat);
        }
    };
    ;
    QueryLayoutUIHelpersClass.prototype.addWindowToTrackingList = function (newWindow, containerId) {
        if (containerId) {
            if (this.kendoWindowsCreatedInContainer[containerId]) {
                this.kendoWindowsCreatedInContainer[containerId].push(newWindow);
            }
            else {
                this.kendoWindowsCreatedInContainer[containerId] = [newWindow];
            }
        }
        else {
            this.kendoWindowsCreated.push(newWindow);
        }
    };
    ;
    QueryLayoutUIHelpersClass.prototype.disposeOfWindows = function (containerId) {
        if (containerId) {
            if (this.kendoWindowsCreatedInContainer[containerId]) {
                while (this.kendoWindowsCreatedInContainer[containerId].length > 0) {
                    var windowToRemove = this.kendoWindowsCreatedInContainer[containerId].pop();
                    $.each($(".syspro-grid-list", windowToRemove.element), function (index) {
                        if ($(this).data("kendoGrid")) {
                            $(this).data("kendoGrid").destroy();
                        }
                    });
                    windowToRemove.destroy();
                }
            }
        }
        else {
            while (this.kendoWindowsCreated.length > 0) {
                var windowToRemove = this.kendoWindowsCreated.pop();
                $.each($(".syspro-grid-list", windowToRemove.element), function (index) {
                    if ($(this).data("kendoGrid")) {
                        $(this).data("kendoGrid").destroy();
                    }
                });
                windowToRemove.destroy();
            }
        }
    };
    ;
    QueryLayoutUIHelpersClass.prototype.initializeIconSelector = function () {
        sysproInterop.getIconsAvailable(function (result) {
            $("#icontreeview").kendoListView({
                template: kendo.template($("#icon-treeview-template").html()),
                dataSource: result,
                dataBound: function () {
                    this.initializeTooltips();
                    $(".icon-item").click(function (e) {
                        sysproInterop.iconSelected($("#icontreeview").data("kendoListView").dataItem(this));
                    });
                }
            });
        }, function (error) {
        });
        var handleTextBox = function (callback) {
            return function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    callback(e);
                }
            };
        };
        var filter = handleTextBox(function (e) {
            var filterText = $("#filterText").val();
            var treeView = $("#icontreeview").data("kendoListView");
            treeView.dataSource.filter({
                field: "Description",
                operator: "contains",
                value: filterText
            });
        });
        $("#filterText").keypress(filter);
    };
    ;
    QueryLayoutUIHelpersClass.prototype.initializeTooltips = function () {
        if ($('[data-tooltip="tooltip"]').length > 0) {
            $(':not(.k-grid-toolbar) [data-tooltip="tooltip"]').tooltip();
            $('body').tooltip({
                selector: '.k-grid-toolbar [data-tooltip=â€œtooltipâ€]',
                trigger: 'hover',
                container: 'body'
            });
            $('body').off('mouseleave', '.k-grid-toolbar [data-tooltip="tooltip"]').on('mouseleave', '.k-grid-toolbar [data-tooltip="tooltip"]', function () {
                $('.k-grid-toolbar [data-tooltip="tooltip"]').tooltip("hide");
                $('body > .tooltip').remove();
            });
        }
    };
    ;
    QueryLayoutUIHelpersClass.prototype.initializeDragDrop = function () {
        var queryHolder = this;
        SYSPRO_VB.initProgramListTileDragging(function (tileParent, ProgramName, ProgramDescription, ItemType, ItemSubType) {
            var tileParentIn = tileParent;
            var tileworkingGuid = tileParent.closest(".layout-widget").data("guid");
            var TileToBind = false;
            var programDescriptionIn = ProgramName;
            var ParentFieldPath = "";
            var tileTypeDetail = ItemSubType;
            if (ItemType === "Tile") {
                ItemType = ItemSubType;
                tileTypeDetail = ProgramName;
                TileToBind = true;
            }
            else {
                programDescriptionIn = ProgramDescription;
                if (!tileTypeDetail)
                    tileTypeDetail = ProgramDescription;
                ParentFieldPath = ProgramName;
            }
            sysproInterop.getModel(tileworkingGuid, function (modelFound) {
                if (modelFound && modelFound.Rows && modelFound.Rows.length > 0 && modelFound.Rows[0].Columns) {
                    var tileColorToUse = 0;
                    var ComplementaryTilesColorIndex = [0, 2, 7, 4, 8, 1, 6, 3, 9];
                    if (modelFound.Rows[0].Columns.length > 0 && modelFound.Rows[0].Columns[0].Widgets && modelFound.Rows[0].Columns[0].Widgets.length > 0) {
                        var previousColor = modelFound.Rows[0].Columns[0].Widgets[0].BackgroundColor;
                        if (ComplementaryTilesColorIndex.indexOf(previousColor) > 1) {
                            tileColorToUse = ComplementaryTilesColorIndex[ComplementaryTilesColorIndex.indexOf(previousColor) - 1];
                        }
                        else {
                            tileColorToUse = ComplementaryTilesColorIndex.length - 1;
                        }
                    }
                    var tileModel = {
                        "TileType": ItemType,
                        "TileTypeIcon": null,
                        "TileTypeIconColor": 0,
                        "TileTypeDetail": tileTypeDetail,
                        "TileTypeName": ProgramName,
                        "ParentFieldPath": ParentFieldPath,
                        "Details": {
                            "Color": 9,
                            "Size": 0,
                            "Name": null,
                            "Visibility": false,
                            "Alignment": 0,
                            "Weight": 0,
                            "Tooltip": null
                        },
                        "TileWidth": 2,
                        "TileParameters": {},
                        "SubType": "DragDropRequest",
                        "Title": ProgramDescription,
                        "PrimaryStyle": 0,
                        "SecondaryStyle": 0,
                        "WidgetName": null,
                        "Collapsible": false,
                        "IsCollapsibleOpen": false,
                        "Border": 0,
                        "BackgroundColor": tileColorToUse,
                        "TitleBackground": 0,
                        "TitleForeground": 0,
                        "Id": sysproInterop.generateUUID(),
                        "Index": 0,
                        "index": 0,
                        "TypeName": "Tile",
                        "HasChildren": false
                    };
                    sysproInterop.getHtmlFromModel("Widget", tileModel, function (htmlOut) {
                        $(".tile-width-marker", $(".tile-widget", tileParentIn)).after(htmlOut);
                        queryHolder.disposeViewOnly(null);
                        queryHolder.initializeViewOnly(null, tileParentIn, null);
                        sysproInterop.subscribeToFieldEvents();
                        if (TileToBind)
                            sysproInterop.bindTiles(sysproInterop.viewModel, $(".tile-widget", tileParentIn), "", null);
                    }, null, null, null, null, function (ex) {
                        console.log("getHtmlFromModel for tile error - " + ex.message);
                    }, null);
                    modelFound.Rows[0].Columns.unshift({ "Widgets": [tileModel] });
                    sysproInterop.setModel(tileworkingGuid, modelFound, function (e) {
                        if (e) {
                            console.log("SetModel performed");
                            sysproInterop.getModel("", function (MainModelFound) {
                                sysproInterop.triggerModelChanged(MainModelFound);
                            }, null, null);
                        }
                        else {
                            console.log("SetModel not performed. No Id found.");
                        }
                    }, function (e) {
                    });
                }
            }, null, null);
        });
    };
    ;
    QueryLayoutUIHelpersClass.prototype.createTimestamp = function (str) {
        var dateOut = kendo.parseDate(str, "yyyy-MM-dd");
        if (!dateOut)
            return 0;
        return dateOut.getTime();
    };
    ;
    QueryLayoutUIHelpersClass.prototype.initializeViewOnly = function (ignoreControls, containerDiv, containerId) {
        var queryLayoutHelper = this;
        if ($.material && !ignoreControls) {
            $.material.init();
        }
        if (containerDiv) {
            var parentId = $(".container-id-holder", containerDiv).data("containerid");
            if (parentId) {
                containerDiv = $.merge(containerDiv, $("*[data-parentwindowid='" + parentId + "']"));
            }
        }
        queryLayoutHelper.initSliders(containerDiv);
        $('.minimize-column', containerDiv).off("click");
        $('.minimize-column', containerDiv).on("click", function (e) {
            var parentColumn = $(this).closest('.column-parent');
            if (parentColumn.hasClass('minimized')) {
                parentColumn.removeClass('minimized');
            }
            else {
                parentColumn.addClass('minimized');
            }
        });
        $.each($(".modal-center"), function (index) {
            var ocId = this.id;
            var currentOC = $(this);
            if (!currentOC.data("kendoWindow")) {
                var ocDiv = $('.offcanvas-toggle[data-target="#' + ocId + '"]', containerDiv);
                ocDiv.removeClass("offcanvas-toggle");
                ocDiv.addClass("in-modal-window");
                queryLayoutHelper.addWindowToTrackingList(SYSPRO_VB.createKendoWindow(ocId, currentOC.data("modaltitle"), function (e) { }, function (e) { }, ["Close"], null, null, true, true, false, null, null), containerId);
                ocDiv.on("click", function () {
                    if (currentOC.data("kendoWindow")) {
                        currentOC.data("kendoWindow").center().open();
                    }
                    else {
                        var currWindow = SYSPRO_VB.createKendoWindow(ocId, currentOC.data("modaltitle"), function (e) { }, function (e) { }, ["Close"], null, null, true, true, false, null, null);
                        queryLayoutHelper.addWindowToTrackingList(currWindow, containerId);
                        currWindow.center().open();
                    }
                    sysproInterop.gridHelpers.requestGridListsRefresh(currentOC);
                    if ($(".tile-widget", currentOC).length > 0) {
                        sysproInterop.bindTiles(sysproInterop.viewModel, $(".tile-widget", currentOC), "", null);
                    }
                });
            }
        });
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (arg) {
            var hrefIn = $(arg.target).attr('href');
            queryLayoutHelper.hiddenSectionShown($(hrefIn));
            if (callLayerInterop.runningMode === "PoS") {
                sysproInterop.eventTrigged(arg.target.getAttribute("data-tabidentifier"), "", "", "", "tabPageShown", function (e) { }, false);
            }
        });
        $(document).on("shown.bs.collapse", function (arg) {
            queryLayoutHelper.hiddenSectionShown(arg.target);
        });
        $('[data-toggle="offcanvas"]').each(function () {
            if (!$(this).hasClass("in-modal-window")) {
                if ($(this).data("isocinitialized")) {
                }
                else {
                    var oc;
                    $(this).data("isocinitialized", "true");
                    oc = new Offcanvas($(this));
                    return oc;
                }
            }
        });
        var toggleoffcanvas = function (e) {
            var el, selector;
            if (!$(this).hasClass('js-offcanvas-has-events')) {
                selector = $(this).attr('data-target');
                el = $(selector);
                if (el) {
                    el.removeClass('in');
                    $("body").removeClass("offcanvas-stop-scrolling");
                    return $('body').css({
                        overflow: '',
                        position: ''
                    });
                }
            }
            else {
                selector = $(this).attr('data-target');
                el = $(selector);
                sysproInterop.gridHelpers.requestGridListsRefresh(el);
                if ($(".tile-widget", el).length > 0) {
                    sysproInterop.bindTiles(sysproInterop.viewModel, $(".tile-widget", el), "", null);
                }
            }
        };
        $('.offcanvas-toggle', containerDiv).each(function () {
            $(this).off('click', toggleoffcanvas);
            $(this).on('click', toggleoffcanvas);
        });
        $("*[data-target='#offcanvas-avanti-notifications']").one("click", function () {
            sysproInterop.bindAvantiNotifications($('#fusion-sidebar-wrapper2'));
        });
        var optionsIn;
        optionsIn = { "autoinit": false };
        $(".dropdown-select", containerDiv).dropdown(optionsIn);
        $('.datetimepicker', containerDiv).datetimepicker({
            sideBySide: false,
            showClose: true,
            keepOpen: true,
            allowInputToggle: true,
            format: sysproInterop.dateFormat.toUpperCase() + " HH:mm",
        });
        $('.date', containerDiv).datepicker({
            format: sysproInterop.dateFormat.toLowerCase(),
            maxViewMode: 2,
            todayBtn: "linked",
            autoclose: true,
            todayHighlight: true,
            showOnFocus: false,
            zIndexOffset: 1000000
        });
        var comboboxes = $('.combobox:not(.combobox-initialized)').combobox({ bsVersion: '3', clearIfNoMatch: false });
        $('.combobox:not(.combobox-initialized)').addClass("combobox-initialized");
        $.each($(".syspro-colorpicker"), function (index) {
            var viewModel = kendo.observable({
                isVisible: true,
                isEnabled: true
            });
            kendo.bind($(this), viewModel);
        });
        this.initializeTooltips();
        var toAddParent = this;
        $.each($(".tile-widget", containerDiv), function (index) {
            var packeryIn = $(this).packery({
                itemSelector: '.tile:not(.tile-width-marker)',
                gutter: 0,
                columnWidth: 142,
                transitionDuration: '0.27s'
            });
            packeryIn.packery('layout');
            toAddParent.tilesCreated.push(packeryIn);
        });
        $("form", containerDiv).on("submit", function (e) {
            e.preventDefault();
            return false;
        });
        this.initializeDragDrop();
        $(document).ready(function () {
            $(document).off("click", ".disabled, .disabled a");
            $(document).on("click", ".disabled, .disabled a", function (e) {
                e.stopImmediatePropagation();
            });
            $(window).resize(function () {
                if (queryLayoutHelper.resizeTO)
                    clearTimeout(queryLayoutHelper.resizeTO);
                queryLayoutHelper.resizeTO = setTimeout(function () {
                    $(this).trigger('resizeEnd');
                }, 250);
            });
            $(window).bind('resizeEnd', function () {
                sysproInterop.sizeTiles(0, null);
            });
            var __resetLayout = Packery.prototype._resetLayout;
            Packery.prototype._resetLayout = function () {
                __resetLayout.call(this);
                var parentSize = getSize(this.element.parentNode);
                var colW = this.columnWidth + this.gutter;
                this.fitWidth = Math.floor((parentSize.innerWidth + this.gutter) / colW) * colW;
                this.packer.width = this.fitWidth;
                this.packer.height = Number.POSITIVE_INFINITY;
                this.packer.reset();
            };
            Packery.prototype._getContainerSize = function () {
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
            };
            Packery.prototype.needsResizeLayout = function () {
                return true;
            };
            sysproInterop.initiateExistingTiles();
            sysproInterop.sizeTiles(0, null);
        });
    };
    ;
    QueryLayoutUIHelpersClass.prototype.hiddenSectionShown = function (element) {
        if ($(".syspro-grid-list", element).length > 0) {
            $.each($(".syspro-grid-list", element), function (index) {
                var gridInCollapse = $(this);
                if (gridInCollapse.data("kendoGrid")) {
                    gridInCollapse.data("kendoGrid").refresh();
                    sysproInterop.gridHelpers.requestGridListsRefresh(gridInCollapse.parent());
                }
            });
        }
        if ($(".tile-widget", element).length > 0) {
            sysproInterop.bindTiles(sysproInterop.viewModel, $(".tile-widget", element), "", null);
        }
        sysproInterop.resizeSparklines(element);
    };
    QueryLayoutUIHelpersClass.prototype.initSliders = function (containerDiv) {
        var queryLayoutHelper = this;
        var sliders = $(".slider", containerDiv);
        $.each(sliders, function (index, currentSliderElement) {
            var sliderCreated = false;
            var slider = this;
            if (slider.noUiSlider) {
                sliderCreated = true;
            }
            var currValue = [30];
            if (this.getAttribute("data-fieldvalue") && this.getAttribute("data-fieldvalue") !== "undefined")
                currValue = [parseInt(this.getAttribute("data-fieldvalue"))];
            var sliderInput = this;
            var minValue = 0;
            var maxValue = 100;
            var isNotBound = $(this).hasClass("nonbound-slider");
            var connectValue;
            connectValue = [true, false];
            var isDateSlider = $(this).hasClass("avanti-date-slider");
            var isSentimentSlider = $(this).hasClass("avanti-sentiment-slider");
            var sliderTooltip = $(this).data("avanti-slider-tooltip-format");
            var changeEvent = $(this).data("slider-event-change");
            var stepsIn = null;
            if ($(this).data("avanti-slider-steps"))
                stepsIn = parseFloat($(this).data("avanti-slider-steps"));
            var tooltipsIn = [];
            if (isNotBound) {
                var startvalueInput = this.getAttribute("data-slider-startvalue");
                if (isDateSlider) {
                    var startValueNumber = 0;
                    if (startvalueInput) {
                        startValueNumber = queryLayoutHelper.createTimestamp(this.getAttribute("data-slider-startvalue"));
                    }
                    var endValueNumber = queryLayoutHelper.createTimestamp(this.getAttribute("data-slider-endvalue"));
                    if (startValueNumber === 0 || endValue === 0) {
                        this.setAttribute("data-slider-status", "disabled");
                        return;
                    }
                    var startValueOut = startValueNumber.toString();
                    if (startValueOut)
                        startValueOut = kendo.toString(new Date(parseFloat(startValueOut)), "yyyy-MM-dd");
                    var endValueOut = endValueNumber.toString();
                    if (endValueOut)
                        endValueOut = kendo.toString(new Date(parseFloat(endValueOut)), "yyyy-MM-dd");
                    sliderInput.setAttribute("data-slider-startvalue", startValueOut);
                    sliderInput.setAttribute("data-slider-endvalue", endValueOut);
                    minValue = queryLayoutHelper.createTimestamp(this.getAttribute("data-slider-min"));
                    maxValue = queryLayoutHelper.createTimestamp(this.getAttribute("data-slider-max"));
                    stepsIn = 7 * 24 * 60 * 60 * 1000;
                    var formatInput = {
                        to: function (value) {
                            return kendo.toString(new Date(value), sysproInterop.dateFormat);
                        },
                        from: function (value) {
                            return kendo.toString(new Date(value), sysproInterop.dateFormat);
                        }
                    };
                    if (startvalueInput) {
                        currValue = [startValueNumber, endValueNumber];
                        connectValue = [false, true, false];
                        tooltipsIn = [formatInput, formatInput];
                    }
                    else {
                        currValue = [endValueNumber];
                        connectValue = true;
                        tooltipsIn = [formatInput];
                    }
                }
                else if (isSentimentSlider) {
                    var startValue = 0;
                    if (startvalueInput) {
                        startValue = parseInt(this.getAttribute("data-slider-startvalue"));
                    }
                    var tooltipformat = {
                        to: function (value) {
                            var sentiment = "";
                            var sentimentColor = "";
                            var sentimentI = "";
                            switch (true) {
                                case (value > 7):
                                    sentiment = "Very satisfied";
                                    sentimentI = "sentiment_very_satisfied";
                                    sentimentColor = "sys-fg-success";
                                    break;
                                case (value > 2 && value < 6):
                                    sentiment = "Satisfied";
                                    sentimentI = "sentiment_satisfied";
                                    sentimentColor = "sys-fg-success";
                                    break;
                                case (value > -2 && value < 3):
                                    sentimentI = "sentiment_neutral";
                                    sentiment = "Neutral";
                                    sentimentColor = "text-info";
                                    break;
                                case (value > -5 && value < -1):
                                    sentimentI = "sentiment_dissatisfied";
                                    sentiment = "Dissatisfied";
                                    sentimentColor = "sys-fg-warning";
                                    break;
                                case (value < -5):
                                    sentimentI = "sentiment_very_dissatisfie";
                                    sentiment = "Very dissatisfied";
                                    sentimentColor = "sys-fg-danger";
                                    break;
                                default:
                                    sentimentI = "sentiment_very_satisfied";
                                    sentiment = "Very satisfied";
                                    break;
                            }
                            setTimeout(function () {
                                $.each($(".noUi-tooltip"), function () {
                                    $(this).html($(this).html().replace(sentiment, '<i class="avanti-sentiment-image-slider material-icons ' + sentimentColor + '">' + sentimentI + '</i>'));
                                });
                            }, 200);
                            return sentiment;
                        },
                        from: function (value) {
                            return queryLayoutHelper.formatLongNumber(value, sliderTooltip);
                        }
                    };
                    var endValue = parseInt(this.getAttribute("data-slider-endvalue"));
                    minValue = parseInt(this.getAttribute("data-slider-min"));
                    maxValue = parseInt(this.getAttribute("data-slider-max"));
                    if (startvalueInput) {
                        currValue = [startValue, endValue];
                        connectValue = [false, true, false];
                        tooltipsIn = [tooltipformat, tooltipformat];
                    }
                    else {
                        currValue = [endValue];
                        connectValue = true;
                        tooltipsIn = [tooltipformat];
                    }
                }
                else {
                    var startValue = 0;
                    if (startvalueInput) {
                        startValue = parseInt(this.getAttribute("data-slider-startvalue"));
                    }
                    var tooltipformatslider = {
                        to: function (value) {
                            return queryLayoutHelper.formatLongNumber(value, sliderTooltip);
                        },
                        from: function (value) {
                            return queryLayoutHelper.formatLongNumber(value, sliderTooltip);
                        }
                    };
                    var endValue = parseInt(this.getAttribute("data-slider-endvalue"));
                    minValue = parseInt(this.getAttribute("data-slider-min"));
                    maxValue = parseInt(this.getAttribute("data-slider-max"));
                    if (startvalueInput) {
                        currValue = [startValue, endValue];
                        connectValue = [false, true, false];
                        tooltipsIn = [tooltipformatslider, tooltipformatslider];
                    }
                    else {
                        currValue = [endValue];
                        connectValue = true;
                        tooltipsIn = [tooltipformatslider];
                    }
                }
            }
            else {
                var tooltipformatslider = {
                    to: function (value) {
                        return queryLayoutHelper.formatLongNumber(value, sliderTooltip);
                    },
                    from: function (value) {
                        return queryLayoutHelper.formatLongNumber(value, sliderTooltip);
                    }
                };
                if (this.getAttribute("data-slider-min") && this.getAttribute("data-slider-min") !== "undefined")
                    minValue = parseInt(this.getAttribute("data-slider-min"));
                if (this.getAttribute("data-slider-max") && this.getAttribute("data-slider-max") !== "undefined")
                    maxValue = parseInt(this.getAttribute("data-slider-max"));
                tooltipsIn = [tooltipformatslider];
            }
            if (minValue === maxValue) {
                maxValue = minValue + 100;
            }
            var sliderObject = {
                start: currValue,
                connect: connectValue,
                range: {
                    'min': minValue,
                    'max': maxValue
                },
                tooltips: tooltipsIn,
            };
            if (stepsIn)
                sliderObject.step = stepsIn;
            if (sliderCreated) {
                slider.noUiSlider.updateOptions(sliderObject);
            }
            else {
                noUiSlider.create(slider, sliderObject);
            }
            var disabledParent = $(currentSliderElement).parents('.disabled');
            if (disabledParent && disabledParent.length !== 0) {
                slider.setAttribute('disabled', "true");
            }
            else {
                slider.removeAttribute('disabled');
            }
            slider.noUiSlider.off('change');
            slider.noUiSlider.on('change', function (e, e2, e3) {
                if (isNotBound) {
                    var startValue;
                    startValue = 0;
                    var endValue;
                    endValue = 0;
                    if (e.length > 1) {
                        startValue = e[0];
                        endValue = e[1];
                    }
                    else {
                        endValue = e[0];
                    }
                    if (isDateSlider) {
                        if (startValue)
                            startValue = kendo.toString(new Date(parseFloat(startValue)), "yyyy-MM-dd");
                        if (endValue)
                            endValue = kendo.toString(new Date(parseFloat(endValue)), "yyyy-MM-dd");
                    }
                    sliderInput.setAttribute("data-slider-startvalue", startValue);
                    sliderInput.setAttribute("data-slider-endvalue", endValue);
                    if (changeEvent) {
                        eval(changeEvent);
                    }
                }
                else {
                    var dataFieldName = sliderInput.getAttribute("data-fieldname");
                    var dataValue = e[0];
                    if (sysproInterop) {
                        if (sysproInterop.viewModel && sysproInterop.viewModel)
                            sysproInterop.viewModel.set(dataFieldName + ".Value", dataValue);
                        sysproInterop.eventTrigged(dataFieldName, dataValue, "", "", "fieldChange", function (eCurrent) { }, function (eCurrent) { });
                    }
                }
            });
        });
    };
    QueryLayoutUIHelpersClass.prototype.toolbarEventHandler = function (index) {
        var dataFieldName = this.getAttribute("data-fieldname");
        if (!this.disabled) {
            if (dataFieldName === "FusionInternal.HelpTour") {
                var isModal = "";
                if ($(this).closest(".modal-window-main").length > 0) {
                    isModal = "ModalWindow";
                }
                sysproInterop.startHelpTourForApplication(isModal);
            }
            else if (dataFieldName === "Toolbar.NOTES002") {
                var dateStamp = kendo.toString(new Date(), "yyyy/MM/dd");
                var OperatorNameIn = "";
                if (sysproInterop.currentUserSession)
                    OperatorNameIn = sysproInterop.currentUserSession.OperatorName;
                dateStamp = dateStamp + " " + OperatorNameIn;
                var notesInputField = $('#Fields\\.IMPWEDF0NOTESMAIN');
                if (notesInputField.length === 0) {
                    notesInputField = $("#Fields\\.NOTESMAINRTF");
                    var richTextContainer = $(this).closest(".avanti-richtextwidget");
                    if (richTextContainer.length > 0) {
                        notesInputField = $(".avanti-richtextwidget-textholder", richTextContainer);
                    }
                    if (notesInputField.data("kendoEditor")) {
                        var editorControl = notesInputField.data("kendoEditor");
                        editorControl.focus();
                        var selectionIn = editorControl.getSelection();
                        var nodeSelected = selectionIn.focusNode;
                        var selectionStartIndex = selectionIn.focusOffset;
                        var selectionRange = selectionIn.rangeCount - 1;
                        editorControl.paste(dateStamp, { split: false });
                    }
                }
                else {
                    var cursorPosStart = notesInputField.prop('selectionStart');
                    var cursorPosEnd = notesInputField.prop('selectionEnd');
                    var v = notesInputField.val();
                    var textBefore = v.substring(0, cursorPosStart);
                    var textAfter = v.substring(cursorPosEnd, v.length);
                    notesInputField.val(textBefore + dateStamp + textAfter);
                    var inputField = notesInputField;
                    inputField[0].setSelectionRange(cursorPosEnd + dateStamp.length, cursorPosEnd + dateStamp.length);
                    inputField.focus();
                }
            }
            else {
                if (dataFieldName && dataFieldName.indexOf("Toolbar.AVANTICARDBUILDER") === 0) {
                    if (sysproCardBuilder) {
                        sysproCardBuilder.toolbarEvent(dataFieldName);
                    }
                }
                else {
                    sysproInterop.eventTrigged(dataFieldName, "", "", "", "toolbarEvent", function (eCurrent) { }, function (eCurrent) { });
                }
            }
        }
    };
    ;
    QueryLayoutUIHelpersClass.prototype.toolbarChangeEventHandler = function (index) {
        if (this.classList.contains('combobox') && this.tagName === "SELECT") {
            return;
        }
        if (!sysproInterop.ignoreLastToolbarChange) {
            var dataFieldName = this.getAttribute("data-fieldname");
            if (!dataFieldName && this.id) {
                dataFieldName = this.id.replace("undefined", "");
            }
            var dataValue;
            dataValue = this.value;
            if (this.type == "checkbox") {
                dataValue = this.checked;
            }
            console.log("Toolbar Event: " + dataValue + "," + this.getAttribute("data-lastchangevalue"));
            if (dataValue !== this.getAttribute("data-lastchangevalue")) {
                this.setAttribute("data-lastchangevalue", dataValue);
                sysproInterop.updateSYSPROKeyDataFromElementChange($(this), dataValue);
                sysproInterop.eventTrigged(dataFieldName, dataValue, "", "", "toolbarEvent", function (eCurrent) { }, function (eCurrent) { });
            }
            else {
                this.setAttribute("data-lastchangevalue", null);
            }
        }
        sysproInterop.ignoreLastToolbarChange = false;
    };
    ;
    QueryLayoutUIHelpersClass.prototype.initializeToolbarEvents = function () {
        $(".syspro-toolbar-widget-button").off("click", this.toolbarEventHandler);
        $(".syspro-toolbar-widget-button").on("click", this.toolbarEventHandler);
        $(".syspro-toolbar-widget-change").off("change", this.toolbarChangeEventHandler);
        $(".syspro-toolbar-widget-change").on("change", this.toolbarChangeEventHandler);
    };
    ;
    QueryLayoutUIHelpersClass.prototype.disposeVisualDesigner = function () {
        var column1InputId = sysproInterop.generateUUID(), column2InputId = sysproInterop.generateUUID();
        SYSPRO_VB.history = [];
        SYSPRO_VB.historyIndex = 0;
        SYSPRO_VB.column1Copy = { "PrimaryStyle": 0, "ResponsiveStyle": 3, "Widgets": [], "Id": column1InputId, "Index": 1, "TypeName": "Column", "HasChildren": false, "index": 1 };
        SYSPRO_VB.column2Copy = { "PrimaryStyle": 0, "ResponsiveStyle": 3, "Widgets": [], "Id": column2InputId, "Index": 2, "TypeName": "Column", "HasChildren": false, "index": 2 };
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
        $("#toolbarWindow input[name='off-canvas-type']").off("change");
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
        SYSPRO_VB.tileWindowsReady = false;
        $(window).off('resize');
        if (SYSPRO_VB.layoutWidgetSelectOptions) {
            $.each(SYSPRO_VB.layoutWidgetSelectOptions, function (idx, opt) {
                $(opt).off('click');
            });
        }
        if (SYSPRO_VB.layoutWidgetSelectPlaceholder) {
            SYSPRO_VB.layoutWidgetSelectPlaceholder.off('click');
        }
        SYSPRO_VB.CleanOffCanvasModels = {};
        if (SYSPRO_VB.destroyTreeViews) {
            SYSPRO_VB.destroyTreeViews();
        }
        if (SYSPRO_VB.offCanvasWindows) {
            $.each(SYSPRO_VB.offCanvasWindows, function (key, value) {
                if (SYSPRO_VB.offCanvasWindows[key] && SYSPRO_VB.offCanvasWindows[key].destroy)
                    SYSPRO_VB.offCanvasWindows[key].destroy();
                $(key).remove();
            });
        }
        SYSPRO_VB.offCanvasWindows = {};
        SYSPRO_VB.fieldsListHTML = "";
        SYSPRO_VB.chartsListHTML = "";
        SYSPRO_VB.toolbarListHTML = "";
        SYSPRO_VB.tilesListHTML = "";
        SYSPRO_VB.tileWidgetFields = [];
        SYSPRO_VB.tileOptionsHTML = "";
    };
    ;
    QueryLayoutUIHelpersClass.prototype.disposeViewOnly = function (containerId) {
        $(".tooltip").hide();
        this.disposeOfWindows(containerId);
        var indexRemoved = [];
        if (!containerId) {
            $.each(sysproInterop.modalWindowHolder, function (index) {
                if (!this.NotModal) {
                    indexRemoved.push(index);
                    if (this.ModalType === 0) {
                        this.Window.close();
                    }
                    else {
                        this.Window.close();
                        this.Window.element.remove();
                    }
                }
            });
            while (indexRemoved.length > 0) {
                var IndexToRemove = indexRemoved.pop();
                sysproInterop.modalWindowHolder.splice(IndexToRemove, 1);
            }
        }
        if (!containerId) {
            var parentHolder = this;
            $.each(parentHolder.tilesCreated, function (index) {
                this.packery('destroy');
            });
            parentHolder.tilesCreated = [];
            $(document).off("shown.bs.collapse");
            $(".syspro-field-search-dropdown").remove();
        }
        if (containerId) {
            $(".syspro-field-search-dropdown." + containerId).remove();
        }
        $('.k-editor-widget').hide();
        $(".tooltip").hide();
    };
    ;
    QueryLayoutUIHelpersClass.prototype.initialiazeChartData = function (e) {
        var currChart = e.sender;
        var schemaSet = currChart.element[0].getAttribute("data-dataschemasetup");
        if (!schemaSet) {
            var fieldnames = currChart.element[0].getAttribute("data-fieldnames");
            var fieldsIn = {};
            if (fieldnames) {
                $.each(fieldnames.split(','), function (index) {
                    if (this) {
                        fieldsIn[this] = { type: "number" };
                    }
                });
                var dataIn = e.sender.dataSource.data();
                var dataSource = new kendo.data.DataSource({
                    data: dataIn,
                    schema: {
                        model: {
                            fields: fieldsIn
                        }
                    }
                });
                if (currChart.element[0].parentElement.getAttribute("data-series1name") && currChart.element[0].parentElement.getAttribute("data-series1name") !== "" && currChart.element[0].parentElement.getAttribute("data-series1name") !== "null")
                    currChart._sourceSeries[0].name = currChart.element[0].parentElement.getAttribute("data-series1name");
                if (currChart.element[0].parentElement.getAttribute("data-series2name") && currChart.element[0].parentElement.getAttribute("data-series2name") !== "" && currChart.element[0].parentElement.getAttribute("data-series2name") !== "null")
                    currChart._sourceSeries[1].name = currChart.element[0].parentElement.getAttribute("data-series2name");
                if (currChart.element[0].parentElement.getAttribute("data-series3name") && currChart.element[0].parentElement.getAttribute("data-series3name") !== "" && currChart.element[0].parentElement.getAttribute("data-series3name") !== "null")
                    currChart._sourceSeries[2].name = currChart.element[0].parentElement.getAttribute("data-series3name");
                if (currChart.element[0].parentElement.getAttribute("data-series3name") && currChart.element[0].parentElement.getAttribute("data-series4name") !== "" && currChart.element[0].parentElement.getAttribute("data-series4name") !== "null")
                    currChart._sourceSeries[3].name = currChart.element[0].parentElement.getAttribute("data-series4name");
                currChart.element[0].setAttribute("data-dataschemasetup", "SchemaBind");
                currChart.setDataSource(dataSource);
                sysproInterop.hideShowSparklineSeries($(currChart.element[0]), null);
            }
        }
        else {
            currChart.element[0].setAttribute("data-dataschemasetup", "");
        }
    };
    ;
    QueryLayoutUIHelpersClass.prototype.calculateYValueOnNormalCurve = function (x, sd, m) {
        return Math.exp(-(Math.pow(x - m, 2)) / (2 * Math.pow(sd, 2))) / (sd * Math.sqrt(2 * Math.PI));
    };
    ;
    QueryLayoutUIHelpersClass.prototype.calculateYValuesOnNormalCurve = function (min, max, sd, m, numobs) {
        if (max === min)
            max = min + 1;
        var numobsside = numobs / (max - min);
        var outputvals = [];
        for (var lc = 0; lc <= numobs; lc = lc + 1) {
            var valueIn = lc / numobsside;
            outputvals.push(this.calculateYValueOnNormalCurve(lc, sd, m));
        }
        return outputvals;
    };
    ;
    QueryLayoutUIHelpersClass.prototype.showProcessingMessage = function (message) {
        if (message) {
            $("#processingMessage").text(message);
            $("#processingMessageContainer").animate({ top: '0px' }, 400);
        }
        else {
            $("#processingMessageContainer").animate({ top: '-30px' }, 400);
        }
    };
    ;
    QueryLayoutUIHelpersClass.prototype.hideProcessingMessage = function () {
        $("#processingMessageContainer").animate({ top: '-150px' }, 300);
    };
    ;
    QueryLayoutUIHelpersClass.prototype.createTreeMenu = function (obj, level) {
        level = level || 0;
        var c, $a, $li, breadcrumb = '', $ul = $('<ul>', { class: 'treeview-menu' });
        if (this.typeParent.current !== obj.Description) {
            if (obj.Type === 'Folder') {
                this.typeParent.current = obj.Description;
                if (level === 1) {
                    this.typeParent.a = obj.Description;
                }
            }
        }
        breadcrumb += this.typeParent.a ? this.typeParent.a : '';
        for (c = 0; c < obj.Children.length; c++) {
            var children = obj.Children[c].Children;
            var item = '<li';
            if (children) {
                item += ' class="treeview"';
            }
            item += '><a';
            if (!children) {
                item +=
                    ' class="syspro-program-link" data-syspromenuitemtype="' +
                        obj.Children[c].Type +
                        '"  data-syspromenuitemsubtype="' +
                        obj.Children[c].SubType +
                        '"  data-sysproprogramname="' +
                        obj.Children[c].Name +
                        '"';
            }
            item += ' href="#" ';
            item +=
                '><span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">' +
                    obj.Children[c].Icon +
                    '</span>' +
                    obj.Children[c].Description;
            if (children) {
                item += '<span class="material-icons treeview-menu-expand-indicator pull-right ">chevron_right</span>';
            }
            item += '</a>';
            if (obj.Children[c].Tooltip) {
                item +=
                    '<i class="material-icons pull-right sys-txt-sm text-muted program-link-help" data-container="body" data-trigger="hover" data-tooltip="tooltip" data-placement="right" data-original-title="' +
                        obj.Children[c].Tooltip +
                        '">help_outline</i>';
            }
            item += '</li>';
            $li = $(item);
            if (children) {
                $li.append(this.createTreeMenu(obj.Children[c], level + 1));
            }
            $ul.append($li);
            if (!children) {
                this.programListTypeahead.push({
                    name: obj.Children[c].Description,
                    breadcrumb: breadcrumb,
                    sysproprogramname: obj.Children[c].Name,
                    syspromenuitemtype: obj.Children[c].Type,
                    syspromenuitemsubtype: obj.Children[c].SubType,
                    icon: obj.Children[c].Icon,
                });
            }
        }
        return $ul;
    };
    ;
    QueryLayoutUIHelpersClass.prototype.initializeExpandableCards = function (card) {
        var cardBindableHeight = 0;
        var cardholderdiv = $(card).find(".card-bindable");
        if ($(card).find(".card-bindable").length === 0 && $(card).hasClass("card-bindable")) {
            cardholderdiv = $(card);
        }
        cardBindableHeight = cardholderdiv.outerHeight();
        var expandedViewHeight = $(card).find(".expandedView").outerHeight();
        if (cardBindableHeight !== 0) {
            cardholderdiv.data("storedheight", cardBindableHeight);
        }
        else {
            if (cardholderdiv.data("storedheight") > 0)
                cardBindableHeight = cardholderdiv.data("storedheight");
        }
        if (expandedViewHeight !== 0) {
            $(card).find(".expandedView").data("storedheight", expandedViewHeight);
        }
        else {
            if ($(card).find(".expandedView").data("storedheight") > 0)
                expandedViewHeight = $(card).find(".expandedView").data("storedheight");
        }
        if (!$(card).data("isinitialized")) {
            $(card).find(".expandedView").css("height", "0px");
            $(card).find(".expandedView").css("display", "block");
            cardholderdiv.css("minHeight", cardBindableHeight);
            $(card).data("isinitialized", true);
        }
        function slideFade(elem) {
            var fade = { opacity: 0, marginLeft: '-200%' };
            elem.css(fade);
        }
        function slideInFade(elem) {
            var fade = { opacity: 1, marginLeft: '0%' };
            elem.css(fade);
        }
        function expandFade(elem) {
            var fade = { opacity: 1, height: expandedViewHeight + "px" };
            elem.css(fade);
        }
        function shrinkFade(elem) {
            var fade = { opacity: 0, height: '0px' };
            elem.css(fade);
        }
        $(card).find(".expand-card").off('click').on('click', function (e) {
            e.preventDefault();
            slideFade($(this).closest(".miniView"));
        });
        $(card).find(".shrink-card").off('click').on('click', function (e) {
            e.preventDefault();
            shrinkFade($(this).closest(".expandedView"));
        });
        $(card).find(".miniView").off('transitionend webkitTransitionEnd oTransitionEnd').on('transitionend webkitTransitionEnd oTransitionEnd', function (e) {
            if (e.originalEvent.propertyName === 'opacity' && parseInt($(this).css("opacity")) == 0) {
                expandFade($(this).siblings(".expandedView"));
                $(this).css("height", "0px");
            }
        });
        $(card).find(".expandedView").off('transitionend webkitTransitionEnd oTransitionEnd').on('transitionend webkitTransitionEnd oTransitionEnd', function (e) {
            if (e.originalEvent) {
                if (e.originalEvent.propertyName === 'opacity' && parseInt($(this).css("opacity")) == 0) {
                    $(card).find(".miniView").css("height", "auto");
                    slideInFade($(this).siblings(".miniView"));
                }
            }
        });
    };
    return QueryLayoutUIHelpersClass;
}());
var CallLayerInteropClass = (function () {
    function CallLayerInteropClass(sysInteropIn, queryLayoutIn) {
        this.interopType = "SYSPRORehostedBrowser";
        this.runningMode = null;
        this.standaloneAddress = "http://localhost/UXTools/";
        this.renderMode = "api";
        this.connectionId = null;
        this.sessionId = null;
        this.menuHtml = null;
        this.menuDetail = null;
        this.changeFromKeyPress = false;
        this.validationInProgress = false;
        this.devMode = "";
        this.serverSessionIdOverride = "";
        this.avantiPluginLoaded = "";
        this.isSecondInstance = false;
        this.previousAvantiPlugin = "";
        this.programName = "";
        this.sysproInteropInternal = sysInteropIn;
        this.queryLayoutInternal = queryLayoutIn;
        this.dataStorage = new Dictionary();
    }
    CallLayerInteropClass.prototype.initializeInBrowser = function (optionalAddress, optionalMode) {
        this.runningMode = optionalMode;
        this.interopType = "StandaloneBrowser";
        if (optionalAddress) {
            this.standaloneAddress = optionalAddress;
        }
        this.sysproInteropInternal.activateTheme();
        $('.combobox-logon:not(.combobox-initialized)').combobox({ newOptionsAllowed: true });
        $('.combobox-logon:not(.combobox-initialized)').addClass("combobox-initialized");
        var ParentHolder = this;
        var url_string = window.location.href;
        if (url_string) {
            url_string = url_string.replace("??", "?");
        }
        var url = null;
        var SecondInstance = "";
        var OpenParameters = "";
        var StartupParameters = "";
        try {
            url = new URL(url_string);
            SecondInstance = url.searchParams.get("SecondInstance");
            OpenParameters = url.searchParams.get("OpenParameters");
            StartupParameters = url.searchParams.get("StartupParameters");
        }
        catch (e) {
            var getParameterByName = function (name) {
                var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
                return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
            };
            SecondInstance = getParameterByName("SecondInstance");
            OpenParameters = getParameterByName("OpenParameters");
            StartupParameters = getParameterByName("StartupParameters");
        }
        ParentHolder.setMFAToken("");
        $(document).on("keydown", function (event) {
            var keycode = event.keyCode || event.which;
            if (keycode === 112) {
                ParentHolder.sysproInteropInternal.showHelp(null);
                event.preventDefault();
                return false;
            }
            return true;
        });
        $(document).off("click", "[data-toggle='offcanvas']", ParentHolder.updateWindowPlacement);
        $(document).on("click", "[data-toggle='offcanvas']", ParentHolder.updateWindowPlacement);
        $("input.syspro-logon-field").on("change", function (e) {
            if (!ParentHolder.changeFromKeyPress) {
                var idOfChange = "";
                if (e.target)
                    idOfChange = e.target.id;
                if (!ParentHolder.validationInProgress) {
                    ParentHolder.validateCredentials(idOfChange);
                }
            }
            ParentHolder.changeFromKeyPress = false;
        });
        $("#logonForm").off("keypress");
        $("#logonForm").on("keypress", function (event) {
            var keycode = event.keyCode || event.which;
            if (keycode === 13) {
                if (!ParentHolder.validationInProgress) {
                    ParentHolder.changeFromKeyPress = true;
                    if (!$(".logon-button button").is(":focus")) {
                        console.log("ENTER: Validation not in progress, intializeInteropLayer");
                        ParentHolder.intializeInteropLayer("AnyValueSetsFusionOnEnter", "", StartupParameters);
                    }
                }
            }
        });
        var comboboxChangedHandler = function (e) {
            if (ParentHolder.validationInProgress)
                return;
            if (!e.currentTarget)
                return;
            ParentHolder.validateCredentials(e.currentTarget.id);
        };
        $("input.syspro-logon-field-combo").on("change", comboboxChangedHandler);
        $(".change-password-link").off("click");
        $(".change-password-link").on("click", function (e) {
            $("#logonForm").hide();
            $("#changePasswordForm").show();
            $("#ChangePasswordForm_operator").val($("#UserName").val());
            if ($("#UserName").val())
                $("#ChangePasswordForm_operator").closest(".form-group").removeClass("is-empty");
        });
        $(".forgot-password-link").off("click");
        $(".forgot-password-link").on("click", function (e) {
            $("#logonForm").hide();
            $("#forgotPasswordForm").show();
            $("#ForgotPasswordForm_operator").val($("#UserName").val());
            if ($("#UserName").val())
                $("#ForgotPasswordForm_operator").closest(".form-group").removeClass("is-empty");
        });
        $(".back-to-logon-link").off("click");
        $(".back-to-logon-link").on("click", function (e) {
            $("#logonForm").show();
            $("#forgotPasswordForm").hide();
            $("#changePasswordForm").hide();
            if ($("#ChangePasswordForm_operator").val()) {
                $("#UserName").val($("#ChangePasswordForm_operator").val());
                $("#UserName").closest(".form-group").removeClass("is-empty");
            }
            else if ($("#ForgotPasswordForm_operator").val()) {
                $("#UserName").val($("#ForgotPasswordForm_operator").val());
                $("#UserName").closest(".form-group").removeClass("is-empty");
            }
        });
        if (SecondInstance === "true") {
            $("#logonForm").hide();
            ParentHolder.isSecondInstance = true;
            ParentHolder.intializeInteropLayer("SecondInstance", OpenParameters, StartupParameters);
        }
        else if (SecondInstance === "debug") {
            $("body").addClass("dev-mode-body");
            ParentHolder.intializeInteropLayer("debug", OpenParameters, StartupParameters);
        }
        else if (ParentHolder.getKMSToken()) {
            $("#logonForm").hide();
            ParentHolder.intializeInteropLayer("kmsauth", ParentHolder.getKMSToken(), StartupParameters);
        }
        else {
            $("#UserName").focus();
        }
        $(window).on("mousedown", function (e) {
            ParentHolder.sysproInteropInternal.lastActivityDateTime = Date.now();
        });
        $(window).on("keydown", function (e) {
            ParentHolder.sysproInteropInternal.lastActivityDateTime = Date.now();
        });
    };
    ;
    CallLayerInteropClass.prototype.validateCredentials = function (fieldName) {
        this.validationInProgress = true;
        console.log("validateCredentials");
        this.toggleSignInLoading(true);
        var sessionIdForValidate = this.sysproInteropInternal.generateUUID();
        if (fieldName === "UserName")
            this.setMFAToken("");
        var operatorIn = $("#UserName").val();
        var operatorPasswordIn = $("#UserPwd").val();
        var companyInFromCombo = $("#CompId").val();
        var companyInFromTextbox = $("#CompIdundefined").val();
        var companyIn = companyInFromCombo ? companyInFromCombo : companyInFromTextbox;
        var companyPasswordIn = $("#CompPass").val();
        var MfaPin = $("#UserPin").val();
        var MFAToken = this.getMFAToken();
        if (!operatorIn)
            operatorIn = "";
        if (!operatorPasswordIn)
            operatorPasswordIn = "";
        if (!companyIn)
            companyIn = "";
        if (!companyPasswordIn)
            companyPasswordIn = "";
        if (!MfaPin)
            MfaPin = "";
        if (!MFAToken)
            MFAToken = "";
        var dataIn = {
            SessionId: sessionIdForValidate,
            Operator: operatorIn,
            OperatorPassword: operatorPasswordIn,
            Company: companyIn,
            CompanyPassword: companyPasswordIn,
            RunningMode: this.runningMode,
            OperatorMfaPin: MfaPin,
            MfaEncryptedString: MFAToken
        };
        var ParentHolder = this;
        $.ajax({
            url: ParentHolder.standaloneAddress + ParentHolder.renderMode + "/UXInteropWeb/ValidateCredentials",
            data: dataIn,
            contentType: "application/json; charset=utf-8",
        }).done(function (result) {
            ParentHolder.showValidationOutput(result, fieldName, dataIn);
            if (result.MFAToken && result.MFAToken !== null) {
                ParentHolder.setMFAToken(result.MFAToken);
            }
            else {
                ParentHolder.removeMFAToken();
            }
            ParentHolder.toggleSignInLoading(false);
            ParentHolder.validationInProgress = false;
        }).fail(function (result) {
            var errorToShow = result.statusText;
            if (errorToShow === "error") {
                errorToShow = "Cannot connect to server: " + ParentHolder.standaloneAddress;
            }
            ParentHolder.sysproInteropInternal.showErrorMessage("Error validating credentials - " + errorToShow, "Validate credentials");
            ParentHolder.toggleSignInLoading(false);
            ParentHolder.validationInProgress = false;
        });
    };
    CallLayerInteropClass.prototype.resendPin = function (fieldName) {
        this.validationInProgress = true;
        console.log("resendPin");
        this.toggleSignInLoading(true);
        var sessionIdForValidate = this.sysproInteropInternal.generateUUID();
        var operatorIn = $("#UserName").val();
        var operatorPasswordIn = $("#UserPwd").val();
        var companyIn = $("#CompId").val();
        var companyPasswordIn = $("#CompPass").val();
        var MfaPin = $("#UserPin").val();
        if (!operatorIn)
            operatorIn = "";
        if (!operatorPasswordIn)
            operatorPasswordIn = "";
        if (!companyIn)
            companyIn = "";
        if (!companyPasswordIn)
            companyPasswordIn = "";
        if (!MfaPin)
            MfaPin = "";
        var dataIn = {
            SessionId: sessionIdForValidate,
            Operator: operatorIn,
            OperatorPassword: operatorPasswordIn,
            Company: companyIn,
            CompanyPassword: companyPasswordIn,
            RunningMode: this.runningMode,
            OperatorMfaPin: MfaPin
        };
        var ParentHolder = this;
        $.ajax({
            url: ParentHolder.standaloneAddress + ParentHolder.renderMode + "/UXInteropWeb/ValidateCredentials",
            data: dataIn,
            contentType: "application/json; charset=utf-8",
        }).done(function (result) {
            ParentHolder.showValidationOutput(result, fieldName, dataIn);
            if (result.MFAToken && result.MFAToken !== null) {
                ParentHolder.setMFAToken(result.MFAToken);
            }
            else {
                ParentHolder.removeMFAToken();
            }
            $("#UserPin").closest(".form-group").addClass("has-info");
            $("#UserPin").closest(".form-group").removeClass("has-error");
            $("#UserPin").next(".help-block").text("Pin has been resent.");
            $("#UserPin").next(".help-block").addClass("always-show");
            ParentHolder.toggleSignInLoading(false);
            ParentHolder.validationInProgress = false;
        }).fail(function (result) {
            var errorToShow = result.statusText;
            if (errorToShow === "error") {
                errorToShow = "Cannot connect to server: " + ParentHolder.standaloneAddress;
            }
            ParentHolder.sysproInteropInternal.showErrorMessage("Error resending pin - " + errorToShow, "Resending pin");
            ParentHolder.toggleSignInLoading(false);
            ParentHolder.validationInProgress = false;
        });
    };
    CallLayerInteropClass.prototype.toggleSignInLoading = function (ShowLoading) {
        if (!ShowLoading) {
            $("[id=loading-cover]").fadeOut();
            $(".logon-button").css("opacity", 1);
            this.queryLayoutInternal.hideProcessingMessage();
        }
        else {
            $(".logon-button").css("opacity", 0.3);
            $("[id=loading-cover]").fadeIn();
        }
    };
    CallLayerInteropClass.prototype.showValidationOutput = function (loginValidationResult, fieldChanged, loginInputs) {
        var ParentHolder = this;
        var CompanyListArray = [];
        var companyToSelect = 0;
        var companyCounter = 0;
        $(".help-block").removeClass("always-show");
        $(".help-block").text("");
        $(".form-group").removeClass("has-error");
        $(".form-group").removeClass("has-info");
        $(".form-group").removeClass("has-information");
        $(".form-group").removeClass("has-warning");
        if (loginValidationResult.UserName) {
            $("#UserName").val(loginValidationResult.UserName);
            $("#ChangePasswordForm_operator").val(loginValidationResult.UserName);
            if (loginValidationResult.UserName) {
                $("#ChangePasswordForm_operator").closest(".form-group").removeClass("is-empty");
                $("#UserName").closest(".form-group").removeClass("is-empty");
            }
            $("#CompId").closest(".form-group").removeClass("is-empty");
        }
        if (loginValidationResult.UserNameFull) {
            $("#UserName").closest(".form-group").addClass("has-information");
            $("#UserName").next(".help-block").addClass("always-show");
            $("#UserName").next(".help-block").removeClass("error-message");
            $("#UserName").next(".help-block").text(loginValidationResult.UserNameFull);
        }
        if (loginValidationResult.CompanyName) {
            $("#CompId").closest(".form-group").addClass("has-information");
            $("#CompId").next(".help-block").addClass("always-show");
            $("#CompId").next(".help-block").removeClass("error-message");
            $("#CompId").next(".help-block").text(loginValidationResult.CompanyName);
        }
        if (loginValidationResult.CompaniesAvailable && loginValidationResult.CompaniesAvailable.length >= 1) {
            var CompanyData_1 = null;
            $("#CompId").html("<option value=''></option>");
            $.each(loginValidationResult.CompaniesAvailable, function (index) {
                if (this.Value != "") {
                    CompanyData_1 = { text: this.Value + " - " + this.Description, value: this.Value };
                    CompanyListArray.push(CompanyData_1);
                    if (loginValidationResult.CompanyId === this.Value) {
                        companyToSelect = companyCounter;
                    }
                    companyCounter++;
                }
            });
        }
        if (loginValidationResult.CompanyId) {
            $("#CompId").closest(".form-group").removeClass("is-empty");
            $("#CompId").val(loginInputs.Company ? loginInputs.Company : loginValidationResult.CompanyId);
            $("#CompId").kendoComboBox({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: CompanyListArray,
                placeholder: "Company",
                filter: "contains"
            });
            var companyDropDown = $("#CompId").data("kendoComboBox");
            if (companyDropDown) {
                companyDropDown.select(companyToSelect);
            }
            $("#CompId").closest('.k-combobox').removeClass('form-control');
        }
        if (loginValidationResult.MFARequired && loginValidationResult.MFARequired !== "N" && loginValidationResult.MFARequired !== " ") {
            $("#MfaPinEntry").show();
            if (loginValidationResult.MFARequired === "V") {
                $("#UserPin").closest(".form-group").addClass("has-info");
                $("#UserPin").next(".help-block").text("Verfied");
                $("#UserPin").next(".help-block").addClass("always-show");
                ParentHolder.hideMfaResendButton();
            }
            else if (loginValidationResult.MFARequired === "R") {
                ParentHolder.showMfaResendButton();
                if (fieldChanged === "UserPwd")
                    $("#UserPin").focus();
            }
            else {
                ParentHolder.hideMfaResendButton();
                if (fieldChanged === "UserPwd")
                    $("#UserPin").focus();
            }
        }
        else {
            $("#MfaPinEntry").hide();
            $("#UserPin").text("");
        }
        if (loginValidationResult.ValidationMessage) {
            $("#logonForm").show();
            if (!loginValidationResult.ValidationMessage.IsGlobal) {
                if ((fieldChanged === "UserName" && (loginValidationResult.ValidationMessage.FieldName === "UserPwd" || loginValidationResult.ValidationMessage.FieldName === "CompPass")) || (fieldChanged === "CompId" && (loginValidationResult.ValidationMessage.FieldName === "UserPwd" || loginValidationResult.ValidationMessage.FieldName === "CompPass")) || (fieldChanged === "UserPwd" && (loginValidationResult.ValidationMessage.FieldName === "CompId" || loginValidationResult.ValidationMessage.FieldName === "CompPass"))) {
                }
                else if ((loginValidationResult.ValidationMessage.FieldName === "CompId") && !loginInputs.Company) {
                }
                else {
                    if ($("#" + loginValidationResult.ValidationMessage.FieldName).length > 0) {
                        $("#" + loginValidationResult.ValidationMessage.FieldName).closest(".form-group").addClass(loginValidationResult.ValidationMessage.ValidationClass);
                        $("#" + loginValidationResult.ValidationMessage.FieldName).next(".help-block").addClass("error-message");
                        $("#" + loginValidationResult.ValidationMessage.FieldName).next(".help-block").html(loginValidationResult.ValidationMessage.Text);
                    }
                    else {
                        this.sysproInteropInternal.showErrorMessage(loginValidationResult.ValidationMessage.Text, "Validating credentials");
                    }
                }
            }
            else {
                this.sysproInteropInternal.showErrorMessage(loginValidationResult.ValidationMessage.Text, "Validating credentials");
            }
            $("#keep_signed_in").prop("checked", false);
            this.setKMSToken("");
            return false;
        }
        return true;
    };
    CallLayerInteropClass.prototype.changePassword = function () {
        this.validationInProgress = true;
        console.log("changePassword");
        $("#loading-cover").fadeIn();
        var operatorIn = $("#ChangePasswordForm_operator").val();
        var operatorPasswordIn = $("#ChangePasswordForm_oldpassword").val();
        var operatorNewPasswordIn = $("#ChangePasswordForm_newpassword").val();
        var operatorConfirmPasswordIn = $("#ChangePasswordForm_confirmnewpassword").val();
        if (!operatorIn)
            operatorIn = "";
        if (!operatorPasswordIn)
            operatorPasswordIn = "";
        if (!operatorNewPasswordIn)
            operatorNewPasswordIn = "";
        if (!operatorConfirmPasswordIn)
            operatorConfirmPasswordIn = "";
        var emailaddress = "";
        if (this.runningMode === "Portal") {
            emailaddress = operatorIn;
        }
        var dataIn = {
            UserName: operatorIn,
            OldPassword: operatorPasswordIn,
            NewPassword: operatorNewPasswordIn,
            ConfirmNewPassword: operatorConfirmPasswordIn,
            EmailAddress: emailaddress
        };
        var ParentHolder = this;
        $.ajax({
            url: ParentHolder.standaloneAddress + ParentHolder.renderMode + "/UxInternalWeb/ChangePassword",
            data: dataIn,
            type: "POST"
        }).done(function (result) {
            ParentHolder.showValidationOutputChangePassword(result, "#changePasswordForm", "Password change", "Password changed successfully");
            $("[id=loading-cover]").fadeOut();
            ParentHolder.validationInProgress = false;
        }).fail(function (result) {
            var errorToShow = result.statusText;
            if (errorToShow === "error") {
                errorToShow = "Cannot connect to server: " + ParentHolder.standaloneAddress;
            }
            this.sysproInteropInternal.showErrorMessage("Error validating credentials - " + errorToShow);
            $("[id=loading-cover]").fadeOut();
            ParentHolder.validationInProgress = false;
        });
    };
    CallLayerInteropClass.prototype.forgotPassword = function () {
        this.validationInProgress = true;
        console.log("forgotPassword");
        $("#loading-cover").fadeIn();
        var operatorIn = $("#ForgotPasswordForm_operator").val();
        if (this.runningMode === "Portal") {
            operatorIn = "{A2F63B01-C144-4101-81AB-8504D0E42ACC}";
        }
        var operatorEmailIn = $("#ForgotPasswordForm_email").val();
        if (!operatorIn)
            operatorIn = "";
        if (!operatorEmailIn)
            operatorEmailIn = "";
        var dataIn = {
            UserName: operatorIn,
            EmailAddress: operatorEmailIn
        };
        var ParentHolder = this;
        $.ajax({
            url: ParentHolder.standaloneAddress + ParentHolder.renderMode + "/UxInternalWeb/ResetPassword",
            data: dataIn,
            type: "POST"
        }).done(function (result) {
            ParentHolder.showValidationOutputChangePassword(result, "#forgotPasswordForm", "Password reset", "Password reset successfully. A new password will be emailed to you.");
            $("[id=loading-cover]").fadeOut();
            ParentHolder.validationInProgress = false;
        }).fail(function (result) {
            var errorToShow = result.statusText;
            if (errorToShow === "error") {
                errorToShow = "Cannot connect to server: " + ParentHolder.standaloneAddress;
            }
            this.sysproInteropInternal.showErrorMessage("Error validating credentials - " + errorToShow);
            $("[id=loading-cover]").fadeOut();
            ParentHolder.validationInProgress = false;
        });
    };
    CallLayerInteropClass.prototype.showValidationOutputChangePassword = function (result, passwordform, messageTitle, messageSubTitle) {
        $(".help-block").removeClass("always-show");
        $(".help-block").text("");
        $(".form-group").removeClass("has-error");
        $(".form-group").removeClass("has-information");
        $(".form-group").removeClass("has-warning");
        if (result.ValidationMessage) {
            if (!result.ValidationMessage.IsGlobal) {
                if ($("#" + result.ValidationMessage.FieldName).length > 0) {
                    $("#" + result.ValidationMessage.FieldName).closest(".form-group").addClass(result.ValidationMessage.ValidationClass);
                    $("#" + result.ValidationMessage.FieldName).next(".help-block").addClass("error-message");
                    result.ValidationMessage.Text = result.ValidationMessage.Text.replace("\\n\\n", " ");
                    $("#" + result.ValidationMessage.FieldName).next(".help-block").html(result.ValidationMessage.Text);
                }
                else {
                    this.sysproInteropInternal.showErrorMessage(result.ValidationMessage.Text, "Validating credentials");
                }
            }
            else {
                if (result.ValidationMessage.ValidationStyle == 1) {
                    this.sysproInteropInternal.showCustomTaskDialog("sys-bg-success", "sys-fg-white", messageTitle, messageSubTitle, "", "done");
                    $("#logonForm").show();
                    $(passwordform).hide();
                }
                else {
                    this.sysproInteropInternal.showErrorMessage(result.ValidationMessage.Text, "Validating credentials");
                }
            }
            return false;
        }
        return true;
    };
    CallLayerInteropClass.prototype.decompressString = function (inputStr, useCompression) {
        if (this.sysproInteropInternal.currentUserSession && this.sysproInteropInternal.currentUserSession.UseCompression && useCompression) {
            var compressDataIn;
            compressDataIn = atob(inputStr);
            var compressData;
            compressData = compressDataIn.split('').map(function (e) {
                return e.charCodeAt(0);
            });
            var binData = new Uint8Array(compressData);
            var fulldata = pako.inflate(binData, { raw: true });
            var charsetIn = 'windows-1252';
            if (this.sysproInteropInternal.currentUserSession && this.sysproInteropInternal.currentUserSession.Charset) {
                charsetIn = this.sysproInteropInternal.currentUserSession.Charset;
            }
            var decoderIn = new TextDecoder(charsetIn);
            var outstr = decoderIn.decode(fulldata);
            return outstr;
        }
        else {
            return inputStr;
        }
    };
    CallLayerInteropClass.prototype.intializeInteropLayer = function (optionalAddress, openParameters, startupParameters) {
        console.log("intializeInteropLayer - " + optionalAddress);
        var LayerHolder = this;
        if (LayerHolder.interopType === "SYSPRORehostedBrowser") {
            console = {
                log: function (message) {
                    try {
                        LayerHolder.sysproInteropInternal.logMessage(null, null, null, null, JSON.stringify(message));
                    }
                    catch (ex) {
                    }
                }
            };
        }
        else if (LayerHolder.interopType === "StandaloneBrowser") {
            if (!LayerHolder.validationInProgress) {
                if (optionalAddress === "debug") {
                    LayerHolder.devMode = optionalAddress;
                    LayerHolder.serverSessionIdOverride = openParameters;
                    optionalAddress = "";
                }
                if (optionalAddress) {
                    if (LayerHolder.devMode) {
                        optionalAddress = this.devMode;
                        openParameters = this.serverSessionIdOverride;
                    }
                    LayerHolder.validationInProgress = true;
                    if (optionalAddress !== "kmsauth") {
                        LayerHolder.toggleSignInLoading(true);
                    }
                    else {
                        LayerHolder.queryLayoutInternal.showProcessingMessage("Signing you back in...");
                    }
                    $.connection.hub.url = LayerHolder.standaloneAddress + "signalr/hubs";
                    var chat = $.connection.scriptHub;
                    if (chat) {
                        chat.client.broadcastMessage = function (name, fulldata, detail, windowDetails, useCompression, avantiPlugin) {
                            try {
                                if (LayerHolder.avantiPluginLoaded)
                                    LayerHolder.previousAvantiPlugin = LayerHolder.avantiPluginLoaded;
                                LayerHolder.avantiPluginLoaded = avantiPlugin;
                                if (name == "ShowError") {
                                    LayerHolder.toggleSignInLoading(false);
                                    LayerHolder.sysproInteropInternal.showErrorMessage(fulldata, detail);
                                    var executionOutput2 = "ERROR: " + fulldata;
                                    LayerHolder.sysproInteropInternal.eventTrigged(executionOutput2, "", "", "", "invocationCallback", function (e) { }, function (e) { }, false, false);
                                }
                                else if (name == "InsertBody" || name == "InsertBodyDesigner") {
                                    fulldata = LayerHolder.decompressString(fulldata, useCompression);
                                    LayerHolder.queryLayoutInternal.disposeVisualDesigner();
                                    LayerHolder.queryLayoutInternal.disposeViewOnly(null);
                                    var BoundItemDiv = $("#harness-container .sys-widget:not(.card-widget,.harmony-widget,.tile-widget,.tile-inner,.syspro-toolbar,.tiles-parent,.syspro-nonbound)");
                                    kendo.unbind(BoundItemDiv);
                                    $.each($(".syspro-grid-list"), function (index) {
                                        if ($(this).data("kendoGrid")) {
                                            $(this).data("kendoGrid").destroy();
                                        }
                                    });
                                    kendo.destroy($("#harness-container"));
                                    $("#harness-container").html("");
                                    if (!LayerHolder.menuHtml) {
                                        LayerHolder.menuHtml = fulldata;
                                        LayerHolder.menuDetail = detail;
                                    }
                                    $("#harness-container").html("<div id=\"wrapper\" class=\"toggled\">" + fulldata + "</div>");
                                    $("#harness-container").show();
                                    if (windowDetails) {
                                        var parsedDetails = JSON.parse(windowDetails);
                                        LayerHolder.sysproInteropInternal.isInEntryScreen = parsedDetails.ProgramType;
                                        LayerHolder.programName = parsedDetails.Program;
                                        var originalText = " - " + $('head title').text();
                                        if ($('head title').data("originaltitle")) {
                                            originalText = $('head title').data("originaltitle");
                                        }
                                        else {
                                            $('head title').data("originaltitle", originalText);
                                        }
                                        $('head title').text(parsedDetails.Title + originalText);
                                        $(".application-sub-title").text(parsedDetails.Title);
                                        if (name == "InsertBody") {
                                            if (parsedDetails.Title === "Home Menu" || (parsedDetails.Program && parsedDetails.Program.trim() === "IMPMEN")) {
                                                LayerHolder.sysproInteropInternal.recentCalledProgramList = [];
                                            }
                                            if (parsedDetails.Program && parsedDetails.Title && parsedDetails.Program !== "IMPMEN" && parsedDetails.Program !== "      ") {
                                                LayerHolder.sysproInteropInternal.addRecentProgram(parsedDetails.Program, parsedDetails.Title, "Program", avantiPlugin);
                                            }
                                        }
                                    }
                                    $("body")[0].setAttribute("data-column-layout", detail);
                                    $("body").data("column-layout", detail);
                                    LayerHolder.toggleSignInLoading(false);
                                    $(".fusion-bottom-toolbar").hide();
                                    if (name == "InsertBody") {
                                        LayerHolder.sysproInteropInternal.inDesignMode = false;
                                        LayerHolder.queryLayoutInternal.initializeViewOnly(false, null, null);
                                        LayerHolder.queryLayoutInternal.initializeToolbarEvents();
                                        $("body").removeClass("body-edit-mode");
                                        $("body").addClass("body-view-mode");
                                        $("body").addClass("avanti-mode");
                                        $("#builder-toolbar").hide();
                                        if (LayerHolder.runningMode !== "Portal" && !LayerHolder.isSecondInstance) {
                                            $(".fusion-maininstance-buttons").show();
                                        }
                                        else {
                                            $(".fusion-maininstance-buttons").hide();
                                        }
                                    }
                                    else {
                                        LayerHolder.sysproInteropInternal.inDesignMode = true;
                                        SYSPRO_VB.init();
                                        LayerHolder.queryLayoutInternal.initializeToolbarEvents();
                                        $("body").removeClass("body-view-mode");
                                        $("body").addClass("body-edit-mode");
                                        $("body").addClass("avanti-mode");
                                        $("#builder-toolbar").show();
                                        $(".fusion-maininstance-buttons").hide();
                                    }
                                    LayerHolder.sysproInteropInternal.viewModel = null;
                                    LayerHolder.sysproInteropInternal.toolbarModel = null;
                                    LayerHolder.sysproInteropInternal.fullBindRequired = null;
                                }
                                else if (name == "OpenSearchWindow") {
                                    fulldata = LayerHolder.decompressString(fulldata, useCompression);
                                    var modalId = LayerHolder.sysproInteropInternal.showModalWindow(JSON.parse(fulldata), "SearchWindow");
                                    var SearchType = detail.split("|")[0];
                                    var SearchField = detail.split("|")[1];
                                    var SearchValue = "";
                                    if (detail.split("|").length > 2)
                                        SearchValue = detail.split("|")[2];
                                    AvantiSearchInterop.OpenSearch(SearchType, SearchValue, LayerHolder.sysproInteropInternal.getGlobalValue("SearchLevelId"), LayerHolder.sysproInteropInternal.getGlobalValue("SearchLevelValue"), "", function (ValueClicked) {
                                        LayerHolder.sysproInteropInternal.browseValueSelected(SearchField, ValueClicked, SearchType);
                                    }, $("#" + modalId));
                                }
                                else if (name == "ExecuteScript") {
                                    try {
                                        fulldata = LayerHolder.decompressString(fulldata, useCompression);
                                        var executionOutput = sysproInteropFunction(fulldata);
                                        if (!executionOutput || executionOutput === undefined) {
                                            executionOutput = "";
                                        }
                                    }
                                    catch (exScript) {
                                        executionOutput = "ERROR: " + exScript.message;
                                        LayerHolder.sysproInteropInternal.showErrorMessage(exScript.message, "The instruction from the SYSPRO Server failed");
                                    }
                                    if (windowDetails === "True") {
                                        setTimeout(function (callguid) {
                                            LayerHolder.sysproInteropInternal.eventTrigged(executionOutput, callguid, "", "", "invocationCallback", function (e) { }, function (e) { });
                                        }, 0, detail);
                                    }
                                }
                                else if (name == "SetLogonCredentials") {
                                    $("body").addClass("light-gradient-background");
                                    $("#logonForm").hide();
                                    var SessionDetails = JSON.parse(fulldata);
                                    if (SessionDetails) {
                                        LayerHolder.sysproInteropInternal.currentUserSession = SessionDetails;
                                        $(".fusion-current-account-name").text(LayerHolder.sysproInteropInternal.currentUserSession.OperatorName);
                                        LayerHolder.sysproInteropInternal.dateFormat = LayerHolder.sysproInteropInternal.currentUserSession.DateFormat;
                                        if (!LayerHolder.sysproInteropInternal.currentUserSession.NotificationsCount)
                                            LayerHolder.sysproInteropInternal.currentUserSession.NotificationsCount = 0;
                                        LayerHolder.sysproInteropInternal.updateNotificationsCount(LayerHolder.sysproInteropInternal.currentUserSession.NotificationsCount);
                                        if (LayerHolder.runningMode !== "PoS" || LayerHolder.isSecondInstance)
                                            LayerHolder.sysproInteropInternal.bindProgramList($("#fusion-sidebar-wrapper2"), true, true);
                                    }
                                }
                                else if (name === "SendNotification") {
                                    if (LayerHolder.avantiPluginLoaded === avantiPlugin)
                                        LayerHolder.avantiPluginLoaded = LayerHolder.previousAvantiPlugin;
                                    LayerHolder.sysproInteropInternal.sendNotification(JSON.parse(fulldata));
                                    return "";
                                }
                                else if (name === "UpdateInProgress") {
                                    $("#avantiUpdateCover").show();
                                    return "";
                                }
                                else if (name == "ExitSYSPRO") {
                                    LayerHolder.sysproInteropInternal.showErrorMessage("The SYSPRO.exe on the server linked to your session has been closed. Please refresh your browser (F5)  and logon again.", "SYSPRO server closed.");
                                    return "";
                                }
                                else if (name == "SetWindowPositions") {
                                    LayerHolder.setBrowserSettings(fulldata);
                                    return "";
                                }
                            }
                            catch (ex) {
                                LayerHolder.sysproInteropInternal.handleError(ex.message, "ServerMessage");
                            }
                        };
                    }
                    else {
                        LayerHolder.toggleSignInLoading(false);
                        LayerHolder.validationInProgress = false;
                        this.sysproInteropInternal.showErrorMessage("Cannot connect to the Avanti server '" + LayerHolder.standaloneAddress + "'. Please check your network settings and try again.", "Logon Failed");
                    }
                    this.sysproInteropInternal.reconnectionAttempts = 0;
                    if ($.connection.hub.disconnected) {
                        $.connection.hub.disconnected(function () {
                            console.log("SIGNALR disconnected " + LayerHolder.connectionId);
                            if (LayerHolder.sysproInteropInternal.reconnectionAttempts < 20) {
                                LayerHolder.sysproInteropInternal.showCustomTaskDialog("sys-bg-danger", "sys-fg-white", "Connection with Avanti server lost", "Please wait while Avanti attempts to reconnect.", "", "portable_wifi_off");
                                setTimeout(function () {
                                    LayerHolder.sysproInteropInternal.showCustomTaskDialog("sys-bg-primary", "sys-fg-white", "Connecting to Avanti server", "Connection in progress...", "", "wifi_tethering");
                                    $.connection.hub.start({ withCredentials: false }).done(function () {
                                        console.log("SIGNALR reconnected on " + $.connection.hub.id);
                                        LayerHolder.sysproInteropInternal.reconnectionAttempts = 0;
                                        var dataIn = {
                                            SessionIdOld: LayerHolder.connectionId,
                                            SessionIdNew: $.connection.hub.id
                                        };
                                        $.ajax({
                                            url: LayerHolder.standaloneAddress + LayerHolder.renderMode + "/UXInteropWeb/UpdateScriptSessionId",
                                            data: dataIn,
                                            contentType: "application/json; charset=utf-8"
                                        }).done(function (result) {
                                            LayerHolder.sysproInteropInternal.showCustomTaskDialog("sys-bg-success", "sys-fg-white", "Connection successful", "You may continue using Avanti.", "", "wifi");
                                            LayerHolder.connectionId = $.connection.hub.id;
                                        });
                                    }).fail(function (ex) {
                                        LayerHolder.sysproInteropInternal.reconnectionAttempts = LayerHolder.sysproInteropInternal.reconnectionAttempts + 1;
                                        console.log("error on reconnect number " + LayerHolder.sysproInteropInternal.reconnectionAttempts + " - " + ex.message);
                                        var AttemptsLeft = 20 - LayerHolder.sysproInteropInternal.reconnectionAttempts;
                                        LayerHolder.sysproInteropInternal.showCustomTaskDialog("sys-bg-danger", "sys-fg-white", "Connection attempt failed", "Please check your connectivity. Avanti will continue to attempt to reconnect " + AttemptsLeft + " more times.", "", "portable_wifi_off");
                                    });
                                }, 5000);
                            }
                            else {
                                LayerHolder.sysproInteropInternal.showCustomTaskDialog("sys-bg-danger", "sys-fg-white", "Connection with Avanti server lost", "20 reconnection attempts failed. Please check connectivity and reload Avanti.", "", "portable_wifi_off");
                            }
                        });
                    }
                    var ConnectSucceed = false;
                    $.connection.hub.start({ withCredentials: false }).done(function () {
                        ConnectSucceed = true;
                        LayerHolder.connectionId = $.connection.hub.id;
                        var secondInstance = "";
                        var openParametersInput = "";
                        if (optionalAddress === "SecondInstance" && openParameters) {
                            secondInstance = "true";
                            openParametersInput = openParameters;
                        }
                        else if (optionalAddress === "debug" && openParameters) {
                            secondInstance = "debug";
                            openParametersInput = openParameters;
                        }
                        else if (optionalAddress === "kmsauth" && openParameters) {
                            secondInstance = "kmsauth";
                            openParametersInput = openParameters;
                        }
                        var operatorIn = $("#UserName").val();
                        var operatorPasswordIn = $("#UserPwd").val();
                        var companyInFromCombo = $("#CompId").val();
                        var companyInFromTextbox = $("#CompIdundefined").val();
                        var companyIn = companyInFromCombo ? companyInFromCombo : companyInFromTextbox;
                        var companyPasswordIn = $("#CompPass").val();
                        var MfaPin = $("#UserPin").val();
                        var MFAToken = LayerHolder.getMFAToken();
                        var keepMeSignedIn = $("#keep_signed_in").prop("checked");
                        if (secondInstance === "kmsauth") {
                            keepMeSignedIn = false;
                        }
                        var deviceid = LayerHolder.getDeviceId();
                        if (!operatorIn)
                            operatorIn = "";
                        if (!operatorPasswordIn)
                            operatorPasswordIn = "";
                        if (!companyIn)
                            companyIn = "";
                        if (!companyPasswordIn)
                            companyPasswordIn = "";
                        if (!MfaPin)
                            MfaPin = "";
                        if (!MFAToken)
                            MFAToken = "";
                        var dataIn = {
                            SessionId: LayerHolder.connectionId,
                            Operator: operatorIn,
                            OperatorPassword: operatorPasswordIn,
                            Company: companyIn,
                            CompanyPassword: companyPasswordIn,
                            ServerAddress: LayerHolder.standaloneAddress,
                            SecondInstance: secondInstance,
                            OpenParameters: openParametersInput,
                            RunningMode: LayerHolder.runningMode,
                            KeepMeSignedIn: keepMeSignedIn,
                            StartupParameters: startupParameters,
                            OperatorMfaPin: MfaPin,
                            MfaEncryptedString: MFAToken
                        };
                        $.ajax({
                            url: LayerHolder.standaloneAddress + LayerHolder.renderMode + "/UXInteropWeb/CreateSession",
                            headers: {
                                'DeviceId': deviceid
                            },
                            data: dataIn,
                            contentType: "application/json; charset=utf-8"
                        }).done(function (result) {
                            if (!LayerHolder.showValidationOutput(result, null, dataIn)) {
                                LayerHolder.toggleSignInLoading(false);
                            }
                            else {
                                if (keepMeSignedIn) {
                                    if (result) {
                                        if (result.KMSToken) {
                                            LayerHolder.setKMSToken(result.KMSToken);
                                        }
                                    }
                                }
                                LayerHolder.removeMFAToken();
                                $(".fusion-logon-page-buttons").hide();
                                $(".fusion-main-page-buttons").show();
                                $("#fusion-toolbar").addClass("toolbar-loaded");
                                $("#logonForm").off("keypress");
                                if (secondInstance === "true" || LayerHolder.runningMode === "Portal") {
                                    $(".fusion-maininstance-buttons").hide();
                                }
                                $("a[href^=mailto],a[href^=tel]").click(function (evt) {
                                    LayerHolder.sysproInteropInternal.ignoreUnload = true;
                                });
                                window.onbeforeunload = function () {
                                    if (!LayerHolder.sysproInteropInternal.ignoreUnload) {
                                        LayerHolder.sysproInteropInternal.ignoreUnloadFromBefore = false;
                                        LayerHolder.sysproInteropInternal.closeSYSPROFusion(null);
                                        var IsInEntryScreenPrompt = null;
                                        if (LayerHolder.sysproInteropInternal.isInEntryScreen === "ENTRY" || LayerHolder.sysproInteropInternal.popupDialogOpened)
                                            IsInEntryScreenPrompt = "Are you sure you want to close SYSPRO Avanti? All unsaved changes will be lost.";
                                        return IsInEntryScreenPrompt;
                                    }
                                    else {
                                        LayerHolder.sysproInteropInternal.ignoreUnloadFromBefore = true;
                                    }
                                    LayerHolder.sysproInteropInternal.ignoreUnload = false;
                                };
                                window.onunload = function () {
                                    if (!LayerHolder.sysproInteropInternal.ignoreUnloadFromBefore) {
                                        LayerHolder.sessionId = null;
                                    }
                                    LayerHolder.sysproInteropInternal.ignoreUnloadFromBefore = false;
                                };
                                console.log("Session Created: " + result.DataOut);
                                if (result.DataOut) {
                                    LayerHolder.sessionId = result.DataOut;
                                }
                                else {
                                    LayerHolder.toggleSignInLoading(false);
                                }
                            }
                            console.log("Create Session complete");
                        })
                            .fail(function (ex) {
                            console.log("Create Session failed");
                            LayerHolder.toggleSignInLoading(false);
                            console.log("error - " + ex.responseText);
                            var errorOut = ex.responseText;
                            if (!errorOut) {
                                errorOut = "Creation of the users session fail. Server not found at: " + LayerHolder.standaloneAddress;
                            }
                            LayerHolder.sysproInteropInternal.showErrorMessage(errorOut, "Session creation");
                        })
                            .always(function () {
                            console.log("Create Session always");
                            LayerHolder.validationInProgress = false;
                        });
                    }).always(function () {
                        if (!ConnectSucceed) {
                            LayerHolder.validationInProgress = false;
                            LayerHolder.toggleSignInLoading(false);
                            LayerHolder.sysproInteropInternal.showErrorMessage("Server sockets connection failed.", "Connection failed.");
                            console.log("Connect Finished: validationInProgress false");
                        }
                    });
                }
            }
        }
    };
    CallLayerInteropClass.prototype.callLayerWithData = function (dataIn, synchronous) {
        if (synchronous === void 0) { synchronous = false; }
        if (this.interopType === "SYSPRORehostedBrowser") {
            var serializedData = JSON.stringify(dataIn);
            try {
                window.external.callFromScript(serializedData);
            }
            catch (ex) {
                console.log("SYSPRORehostedBrowser window.external.callFromScript: " + ex.message);
            }
        }
        else if (this.interopType === "StandaloneBrowser") {
            if (dataIn.Operation === "logMessage") {
            }
            else {
                if (!dataIn.KeyFieldValue)
                    dataIn.KeyFieldValue = "";
                if (!dataIn.AdditionalField1)
                    dataIn.AdditionalField1 = "";
                var avantiPlugin = "";
                if (dataIn.Operation === "eventTrigged" && dataIn.AdditionalField1 !== "invocationCallback" && dataIn.AdditionalField1 !== "popupDialogButtonClicked" && dataIn.AdditionalField1.indexOf("PLUGIN|") !== 0) {
                    avantiPlugin = this.avantiPluginLoaded;
                }
                if (!dataIn.AdditionalField2)
                    dataIn.AdditionalField2 = "";
                if (!dataIn.AdditionalField3)
                    dataIn.AdditionalField3 = "";
                if (!dataIn.AdditionalField4)
                    dataIn.AdditionalField4 = "";
                var useAsync = true;
                if (synchronous) {
                    useAsync = false;
                }
                if (dataIn.AdditionalField1 === "closeBrowser" && navigator.sendBeacon) {
                    dataIn.AdditionalField4 = this.sessionId;
                    try {
                        var deviceId = this.getDeviceId();
                        if (!dataIn.KeyField)
                            deviceId = "";
                        var browserSettings = this.getBrowserSettings();
                        if (!browserSettings)
                            browserSettings = "";
                        browserSettings = browserSettings.split('&').join('%26');
                        var closesuccess = navigator.sendBeacon(this.standaloneAddress + "api/UXAdminWeb/CloseSYSPROCalled?SessionId=" + this.sessionId + "&AvantiPlugin=" + avantiPlugin + "&DeviceId=" + deviceId + "&BrowserSettings=" + browserSettings);
                        console.log("CloseSuccess - " + closesuccess);
                    }
                    catch (e) {
                        console.log(e.message);
                    }
                }
                else {
                    var ParentHolder_1 = this;
                    $.ajax({
                        url: ParentHolder_1.standaloneAddress + ParentHolder_1.renderMode + "/UXInteropWeb/CallFromScript",
                        type: "POST",
                        headers: {
                            'SessionId': ParentHolder_1.sessionId,
                            'AvantiPlugin': avantiPlugin,
                            'DeviceId': ParentHolder_1.getDeviceId()
                        },
                        data: dataIn,
                        async: useAsync
                    }).done(function (result) {
                        ParentHolder_1.sysproInteropInternal.callFromSYSPRO(result.MethodName, result.DataOut);
                    })
                        .fail(function (ex) {
                        console.log("CallFromScript error - " + ex);
                    })
                        .always(function () {
                    });
                }
            }
        }
    };
    CallLayerInteropClass.prototype.calledFromNative = function (callType, appNameIn, componentIn, keyFieldValue, dataIn) {
        this.sysproInteropInternal.callFromSYSPRO(callType, appNameIn);
    };
    CallLayerInteropClass.prototype.selectFile = function (callbackMethod, errorcallbackMethod, fileTypes) {
        if (this.interopType === "SYSPRORehostedBrowser")
            this.sysproInteropInternal.genericCall("selectFile", fileTypes, "", "", "", "", "", "", callbackMethod, errorcallbackMethod);
        else if (this.interopType === "StandaloneBrowser") {
            try {
                var fileSelector = null;
                var isconfirmRequired = false;
                var confirmDialog_1 = null;
                var fileClickNotSupported = navigator.userAgent.indexOf("Firefox") != -1;
                if (fileClickNotSupported) {
                    isconfirmRequired = true;
                    $("#invisibleNodes").append("<div id='filedialog'></div>");
                    confirmDialog_1 = $("#filedialog").kendoDialog({
                        title: 'Please select a file',
                        content: '<input class="file-browser-input" type="file"></input>',
                        visible: false,
                        width: '200px',
                        modal: true,
                        actions: [{
                                text: "Cancel",
                                action: function (e) {
                                    var fileOut = {
                                        FilePath: "",
                                        FileExt: "",
                                        FileBase64: "",
                                        ErrorMessage: "No file selected.",
                                    };
                                    errorcallbackMethod(fileOut);
                                    return true;
                                }
                            },]
                    }).data("kendoDialog");
                    confirmDialog_1.open();
                    fileSelector = $(".file-browser-input")[0];
                }
                else {
                    fileSelector = document.createElement('input');
                    fileSelector.setAttribute('type', 'file');
                }
                var filterType = "";
                if (fileTypes === "Images")
                    filterType = "image/*";
                else if (fileTypes === "Documents")
                    filterType = ".pdf, .docx, .doc, .xls, .xlsx";
                else if (fileTypes)
                    filterType = fileTypes;
                fileSelector.setAttribute('accept', filterType);
                $(fileSelector).on("change", function (e) {
                    if (isconfirmRequired) {
                        confirmDialog_1.close();
                        confirmDialog_1.destroy();
                        $("#filedialog").html("");
                    }
                    var files = e.target.files;
                    $.each(files, function (index) {
                        var reader = new FileReader();
                        var currentFile = this;
                        reader.onload = function (e) {
                            var targetResult = e.target.result;
                            console.log("File  Loaded:  " + targetResult);
                            var base64Content = targetResult.substring(targetResult.indexOf(";base64,") + ";base64,".length);
                            console.log("File  name:  " + currentFile.name);
                            var fileExtIn = currentFile.name.substr(currentFile.name.lastIndexOf("."));
                            console.log("File  type:  " + fileExtIn);
                            var fileOut = {
                                FilePath: currentFile.name,
                                FileExt: fileExtIn,
                                FileBase64: base64Content,
                                ErrorMessage: "",
                            };
                            callbackMethod(fileOut);
                        };
                        reader.readAsDataURL(this);
                    });
                });
                if (!fileClickNotSupported)
                    fileSelector.click();
            }
            catch (ex) {
                errorcallbackMethod(ex);
            }
        }
    };
    CallLayerInteropClass.prototype.openFile = function (callbackMethod, errorcallbackMethod, fileUrl, fileName, print) {
        if (this.interopType === "SYSPRORehostedBrowser")
            this.sysproInteropInternal.genericCall("openFile", fileUrl, fileName, "", "", "", "", "", callbackMethod, errorcallbackMethod);
        else if (this.interopType === "StandaloneBrowser") {
            try {
                var fileUrlNew = this.standaloneAddress + "api/UXFileProviderWeb/GetUploadedFile?SessionId=" + this.sessionId + "&FileId=" + fileUrl;
                var windowOpened = window.open(fileUrlNew, fileName);
                if (print && windowOpened) {
                    windowOpened.focus();
                    windowOpened.print();
                }
            }
            catch (ex) {
                errorcallbackMethod(ex);
            }
        }
    };
    CallLayerInteropClass.prototype.callFusionService = function (urlIn, dataIn, callType, callbackMethod, errorcallbackMethod) {
        $.ajax({
            url: this.standaloneAddress + urlIn, type: callType, headers: {
                'SessionId': this.sessionId,
                'AvantiPlugin': this.avantiPluginLoaded
            }, data: dataIn, crossDomain: true
        }).done(function (data) { if (callbackMethod)
            callbackMethod(data); }).fail(function (jqXHR, textStatus, errorThrown) { if (errorcallbackMethod)
            errorcallbackMethod(errorThrown); });
    };
    CallLayerInteropClass.prototype.getDeviceId = function () {
        if (this.runningMode === "Portal") {
            return this.getDeviceIdPortal();
        }
        var deviceId = localStorage.getItem("AVT_DEVICEID");
        if (!deviceId) {
            deviceId = this.sysproInteropInternal.generateUUID();
            localStorage.setItem("AVT_DEVICEID", deviceId);
        }
        else {
            if (!this.sysproInteropInternal.validateUUID(deviceId)) {
                console.log("Invalid deviceID of: " + deviceId + ". Regenerating DeviceID...");
                deviceId = this.sysproInteropInternal.generateUUID();
                localStorage.setItem("AVT_DEVICEID", deviceId);
            }
        }
        return deviceId;
    };
    CallLayerInteropClass.prototype.getDeviceIdPortal = function () {
        var deviceId = localStorage.getItem("AVT_DEVICEID_PORTAL");
        if (!deviceId) {
            deviceId = this.sysproInteropInternal.generateUUID();
            localStorage.setItem("AVT_DEVICEID_PORTAL", deviceId);
        }
        else {
            if (!this.sysproInteropInternal.validateUUID(deviceId)) {
                console.log("Invalid portal deviceID of: " + deviceId + ". Regenerating Portal DeviceID...");
                deviceId = this.sysproInteropInternal.generateUUID();
                localStorage.setItem("AVT_DEVICEID_PORTAL", deviceId);
            }
        }
        return deviceId;
    };
    CallLayerInteropClass.prototype.getBrowserSettings = function () {
        var browserSettings = localStorage.getItem("windowPlacement");
        return browserSettings;
    };
    CallLayerInteropClass.prototype.setBrowserSettings = function (positionsBlob) {
        localStorage.setItem("windowPlacement", positionsBlob);
    };
    CallLayerInteropClass.prototype.removeBrowserSettings = function () {
        localStorage.removeItem("windowPlacement");
    };
    CallLayerInteropClass.prototype.setKMSToken = function (token) {
        if (this.runningMode !== "Portal") {
            localStorage.setItem("AVT_KMSTOKEN", token);
        }
        else {
            localStorage.setItem("AVT_KMSTOKEN_PORTAL", token);
        }
    };
    CallLayerInteropClass.prototype.getKMSToken = function () {
        if (this.runningMode !== "Portal") {
            return localStorage.getItem("AVT_KMSTOKEN");
        }
        else {
            return localStorage.getItem("AVT_KMSTOKEN_PORTAL");
        }
    };
    CallLayerInteropClass.prototype.setMFAToken = function (token) {
        localStorage.setItem("AVT_MFATOKEN", token);
    };
    CallLayerInteropClass.prototype.getMFAToken = function () {
        return localStorage.getItem("AVT_MFATOKEN");
    };
    CallLayerInteropClass.prototype.removeMFAToken = function () {
        return localStorage.removeItem("AVT_MFATOKEN");
    };
    CallLayerInteropClass.prototype.storeData = function (dataKey, dataValue) {
        if (this.interopType === "SYSPRORehostedBrowser") {
            return window.external.dataOperation("storeData", dataKey, dataValue);
        }
        else {
            return this.dataStorage[dataKey] = dataValue;
        }
    };
    CallLayerInteropClass.prototype.retrieveData = function (dataKey) {
        if (this.interopType === "SYSPRORehostedBrowser") {
            return window.external.dataOperation("retrieveData", dataKey, "");
        }
        else {
            return this.dataStorage[dataKey];
        }
    };
    CallLayerInteropClass.prototype.hideMfaResendButton = function () {
        $("#MfaPinEntryDiv").removeClass("col-xs-8");
        $("#MfaPinEntryDiv").addClass("col-xs-11");
        $("#MfaPinResendBtnDiv").hide();
    };
    CallLayerInteropClass.prototype.showMfaResendButton = function () {
        $("#MfaPinEntryDiv").removeClass("col-xs-11");
        $("#MfaPinEntryDiv").addClass("col-xs-8");
        $("#MfaPinResendBtnDiv").show();
    };
    CallLayerInteropClass.prototype.updateWindowPlacement = function (e) {
        var targetID = $(e.currentTarget).data("target").substring(1);
        var offcanvasWindow = $("#" + targetID).data("kendoWindow");
        var sysproModalId = $("#" + targetID).data('syspromodalid') || targetID;
        console.log(targetID, offcanvasWindow, sysproModalId);
        var windowPlacement = JSON.parse(localStorage.getItem('windowPlacement')) || {};
        if (windowPlacement.hasOwnProperty(callLayerInterop.programName) && windowPlacement[callLayerInterop.programName].hasOwnProperty(sysproModalId)) {
            offcanvasWindow.setOptions(windowPlacement[callLayerInterop.programName][sysproModalId]);
        }
    };
    return CallLayerInteropClass;
}());
var SYSPROInteropClass = (function () {
    function SYSPROInteropClass() {
        var _this = this;
        this.undockOffcanvas = function (e) {
            console.log($(e).data("syspromodalid"));
            _this.eventTrigged($(e).data("syspromodalid"), "", "", "", "undockOffcanvas", function (eCurrent) { }, function (eCurrent) { });
            _this.closeModalWindow($(e).data("syspromodalid"));
        };
        this.dockWindow = function (e) {
            var modalWindowId = $(e.currentTarget).closest(".k-window").find(".modal-window-main").data("syspromodalid");
            console.log(modalWindowId);
            _this.eventTrigged(modalWindowId, "", "", "", "dockWindow", function (eCurrent) { }, function (eCurrent) { });
            _this.closeModalWindow(modalWindowId);
        };
        this.version = "807";
        this.threadedCallbackIndexToUse = 0;
        this.threadedCallbacksLookup = new Dictionary();
        this.viewModel = null;
        this.toolbarModel = null;
        this.isInAppBuilder = false;
        this.errorHandler = "Internal";
        this.internalHistoryIndex = 0;
        this.internalHistoryChange = 0;
        this.decimalCharacter = ".";
        this.thousandSeperator = ";";
        this.numericMasking = "";
        this.inputMaskEscapeChar = "";
        this.dateFormat = "yyyy-MM-dd";
        this.harmonyEnabled = false;
        this.harmonyAddress = "";
        this.ignoreLastToolbarChange = false;
        this.predictiveSearchCache = {};
        this.cursorX = 0;
        this.cursorY = 0;
        this.cursorContextMenuOpenedX = 0;
        this.cursorContextMenuOpenedY = 0;
        this.taskDialogContentShown = "";
        this.typingInterval = null;
        this.typingElement = null;
        this.typingOperation = null;
        this.predictiveSearchActive = false;
        this.fullBindRequired = null;
        this.modalWindowStack = [];
        this.bindOnCurrentDivPerformed = false;
        this.bindOnCurrentToolbarPerformed = false;
        this.currentUserSession = null;
        this.reconnectionAttempts = 0;
        this.autoDateChange = false;
        this.isInEntryScreen = "";
        this.recentProgramList = [];
        this.recentCalledProgramList = [];
        this.currentContextMenu = null;
        this.currentContextMenuUnhealthyClose = null;
        this.isProgramaticClose = false;
        this.popupDialogOpened = false;
        this.manualButtonDialogClosed = false;
        this.logDataSource = null;
        this.inDesignMode = false;
        this.lastActivityDateTime = Date.now();
        this.modalWindowHolder = [];
        this.manualSignOff = false;
        this.isTouchDevice = false;
        this.gridHelpers = new AvantiGridsClass(this);
        this.syntaxEditorHelpers = new AvantiSyntaxEditorClass(this);
        this.callLayerInterop = new CallLayerInteropClass(this, queryLayoutUIHelpers);
    }
    SYSPROInteropClass.prototype.generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    };
    SYSPROInteropClass.prototype.validateUUID = function (UUID) {
        var pattern = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$', 'i');
        if (pattern.test(UUID) === true) {
            return true;
        }
        else {
            return false;
        }
    };
    SYSPROInteropClass.prototype.showSmartTag = function (tag) {
        try {
            var dataValue = tag.getAttribute("data-fieldvalue");
            var dataCaption = tag.getAttribute("data-fieldcaption");
            var dataName = tag.getAttribute("data-fieldname");
            if (!dataName)
                dataName = dataCaption;
            this.eventTrigged("", dataCaption, dataValue, dataName, "showSmartTag", function (e) { }, function (e) { });
        }
        catch (ex) {
            this.handleError(ex.message, "showSmartTag");
        }
    };
    SYSPROInteropClass.prototype.hyperlinkClicked = function (tag) {
        try {
            var dataValue = tag.getAttribute("data-fieldvalue");
            var dataCaption = tag.getAttribute("data-fieldcaption");
            var dataName = tag.getAttribute("data-fieldname");
            if (!dataName)
                dataName = dataCaption;
            this.eventTrigged("", dataCaption, dataValue, dataName, "hyperlinkClicked", function (e) { }, function (e) { });
        }
        catch (ex) {
            this.handleError(ex.message, "hyperlinkClicked");
        }
    };
    SYSPROInteropClass.prototype.openLink = function (tag) {
        try {
            if (!tag.classList.contains("disabled")) {
                var dataValue = tag.getAttribute("data-fieldvalue");
                var dataCaption = tag.getAttribute("data-keyaction");
                this.eventTrigged("", dataCaption, dataValue, "", "openLink", function (e) { }, function (e) { });
            }
        }
        catch (ex) {
            this.handleError(ex.message, "openLink");
        }
    };
    SYSPROInteropClass.prototype.getData = function (appNameIn, keyField, keyFieldValue, finalParameter, callbackMethod, errorcallbackMethod) {
        try {
            var NativeCallDataIn = {
                Operation: "getData",
                Application: appNameIn,
                KeyField: keyField,
                KeyFieldValue: keyFieldValue,
                FinalParameter: finalParameter,
                AdditionalField1: "",
                AdditionalField2: "",
                AdditionalField3: "",
                CallbackIndex: this.threadedCallbackIndexToUse,
                CallbackMethod: "sysproInterop.interopCallbackReceived"
            };
            this.threadedCallbacksLookup[this.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod
            };
            while (this.threadedCallbacksLookup[this.threadedCallbackIndexToUse]) {
                this.threadedCallbackIndexToUse++;
            }
            this.callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
        catch (ex) {
            this.handleError(ex.message, "getData");
        }
    };
    SYSPROInteropClass.prototype.eventTrigged = function (appNameIn, keyField, keyFieldValue, finalParameter, buttonClicked, callbackMethod, errorcallbackMethod, synchronous, waitCallback) {
        if (synchronous === void 0) { synchronous = false; }
        if (waitCallback === void 0) { waitCallback = false; }
        try {
            var additionalField4 = null;
            if (waitCallback) {
                additionalField4 = "AWAITCALLBACK";
            }
            var NativeCallDataIn = {
                Operation: "eventTrigged",
                Application: appNameIn,
                KeyField: keyField,
                KeyFieldValue: keyFieldValue,
                FinalParameter: finalParameter,
                AdditionalField1: buttonClicked,
                AdditionalField2: "",
                AdditionalField3: "",
                AdditionalField4: additionalField4,
                CallbackIndex: this.threadedCallbackIndexToUse,
                CallbackMethod: "sysproInterop.interopCallbackReceived"
            };
            this.threadedCallbacksLookup[this.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod
            };
            while (this.threadedCallbacksLookup[this.threadedCallbackIndexToUse]) {
                this.threadedCallbackIndexToUse++;
            }
            this.callLayerInterop.callLayerWithData(NativeCallDataIn, synchronous);
        }
        catch (ex) {
            this.handleError(ex.message, "eventTrigged");
        }
    };
    SYSPROInteropClass.prototype.genericCall = function (Operation, appNameIn, keyField, keyFieldValue, finalParameter, additionalField1, additionalField2, additionalField3, callbackMethod, errorcallbackMethod) {
        try {
            var NativeCallDataIn = {
                Operation: Operation,
                Application: appNameIn,
                KeyField: keyField,
                KeyFieldValue: keyFieldValue,
                FinalParameter: finalParameter,
                AdditionalField1: additionalField1,
                AdditionalField2: additionalField2,
                AdditionalField3: additionalField3,
                CallbackIndex: this.threadedCallbackIndexToUse,
                CallbackMethod: "sysproInterop.interopCallbackReceived"
            };
            this.threadedCallbacksLookup[this.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod
            };
            while (this.threadedCallbacksLookup[this.threadedCallbackIndexToUse]) {
                this.threadedCallbackIndexToUse++;
            }
            this.callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
        catch (ex) {
            this.handleError(ex.message, "genericCall - " + Operation);
        }
    };
    SYSPROInteropClass.prototype.logMessage = function (appNameIn, keyField, keyFieldValue, finalParameter, message) {
        var NativeCallDataIn = {
            Operation: "logMessage",
            Application: appNameIn,
            KeyField: keyField,
            KeyFieldValue: keyFieldValue,
            FinalParameter: finalParameter,
            AdditionalField1: message,
            AdditionalField2: "",
            AdditionalField3: "",
            CallbackIndex: "",
            CallbackMethod: ""
        };
        this.callLayerInterop.callLayerWithData(NativeCallDataIn);
    };
    SYSPROInteropClass.prototype.getModel = function (modelId, callbackMethod, errorcallbackMethod, isModal) {
        try {
            if (!isModal)
                isModal = "";
            var NativeCallDataIn = {
                Operation: "getModel",
                Application: isModal,
                KeyField: modelId,
                KeyFieldValue: "",
                FinalParameter: "",
                AdditionalField1: "",
                AdditionalField2: "",
                AdditionalField3: "",
                CallbackIndex: this.threadedCallbackIndexToUse,
                CallbackMethod: "this.interopCallbackReceived"
            };
            this.threadedCallbacksLookup[this.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod
            };
            while (this.threadedCallbacksLookup[this.threadedCallbackIndexToUse]) {
                this.threadedCallbackIndexToUse++;
            }
            this.callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
        catch (ex) {
            this.handleError(ex.message, "getModel");
        }
    };
    SYSPROInteropClass.prototype.setModel = function (modelId, widgetIn, callbackMethod, errorcallbackMethod) {
        try {
            var NativeCallDataIn = {
                Operation: "setModel",
                Application: "",
                KeyField: modelId,
                KeyFieldValue: JSON.stringify(widgetIn),
                FinalParameter: "",
                AdditionalField1: "",
                AdditionalField2: "",
                AdditionalField3: "",
                CallbackIndex: this.threadedCallbackIndexToUse,
                CallbackMethod: "this.interopCallbackReceived"
            };
            this.threadedCallbacksLookup[this.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod
            };
            while (this.threadedCallbacksLookup[this.threadedCallbackIndexToUse]) {
                this.threadedCallbackIndexToUse++;
            }
            this.callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
        catch (ex) {
            this.handleError(ex.message, "getModel");
        }
    };
    SYSPROInteropClass.prototype.getNotificationsContent = function (callbackMethod, errorcallbackMethod) {
        try {
            var NativeCallDataIn = {
                Operation: "getNotificationsContent",
                Application: "",
                KeyField: "",
                KeyFieldValue: "",
                FinalParameter: "",
                AdditionalField1: "",
                AdditionalField2: "",
                AdditionalField3: "",
                CallbackIndex: this.threadedCallbackIndexToUse,
                CallbackMethod: "this.interopCallbackReceived"
            };
            this.threadedCallbacksLookup[this.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod
            };
            while (this.threadedCallbacksLookup[this.threadedCallbackIndexToUse]) {
                this.threadedCallbackIndexToUse++;
            }
            this.callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
        catch (ex) {
            this.handleError(ex.message, "getNotificationsContent");
        }
    };
    SYSPROInteropClass.prototype.triggerModelChanged = function (modelFound) {
        try {
            this.eventTrigged(JSON.stringify(modelFound), "", "", "", "modelChanged", function (eCurrent) { }, function (eCurrent) { });
        }
        catch (ex) {
            this.handleError(ex.message, "triggerModelChanged");
        }
    };
    SYSPROInteropClass.prototype.performPredictiveSearch = function (predictivesearch, searchvalue, callbackMethod, errorcallbackMethod, optionalIndex) {
        try {
            if (predictivesearch.indexOf("Conversion") === 0) {
                predictivesearch = predictivesearch.replace("Conversion", "");
            }
            if (!optionalIndex)
                optionalIndex = "0";
            var keyFieldData = "";
            if (this.viewModel && this.viewModel.Fields && this.viewModel.Fields.SYSPROKeyData)
                keyFieldData = this.viewModel.Fields.SYSPROKeyData;
            var NativeCallDataIn = {
                Operation: "performPredictiveSearch",
                Application: optionalIndex,
                KeyField: predictivesearch,
                KeyFieldValue: searchvalue,
                FinalParameter: JSON.stringify(keyFieldData),
                AdditionalField1: "",
                AdditionalField2: "",
                AdditionalField3: "",
                CallbackIndex: this.threadedCallbackIndexToUse,
                CallbackMethod: "this.interopCallbackReceived"
            };
            this.threadedCallbacksLookup[this.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod
            };
            while (this.threadedCallbacksLookup[this.threadedCallbackIndexToUse]) {
                this.threadedCallbackIndexToUse++;
            }
            this.callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
        catch (ex) {
            this.handleError(ex.message, "performPredictiveSearch");
        }
    };
    SYSPROInteropClass.prototype.getFileFromServer = function (filePath, callbackMethod, errorcallbackMethod) {
        this.genericCall("getFileFromServer", filePath, "", "", "", "", "", "", callbackMethod, errorcallbackMethod);
    };
    SYSPROInteropClass.prototype.getHtmlFromModel = function (modelType, modelIn, callbackMethod, parentParameter1, parentParameter2, parentParameter3, parentParameter4, errorcallbackMethod, isPreview) {
        try {
            var NativeCallDataIn = {
                Operation: "getHtmlFromModel",
                Application: "",
                KeyField: modelType,
                KeyFieldValue: JSON.stringify(isPreview),
                FinalParameter: JSON.stringify(modelIn),
                AdditionalField1: JSON.stringify(parentParameter1),
                AdditionalField2: JSON.stringify(parentParameter2),
                AdditionalField3: JSON.stringify(parentParameter3),
                AdditionalField4: JSON.stringify(parentParameter4),
                CallbackIndex: this.threadedCallbackIndexToUse,
                CallbackMethod: "this.interopCallbackReceived"
            };
            this.threadedCallbacksLookup[this.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod
            };
            while (this.threadedCallbacksLookup[this.threadedCallbackIndexToUse]) {
                this.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
        catch (ex) {
            this.handleError(ex.message, "getHtmlFromModel");
        }
    };
    SYSPROInteropClass.prototype.setAvailableFieldsInternal = function (dataIn) {
        this.handleError("setAvailableFieldsInternal has been deprecated in Avanti.", "setAvailableFieldsInternal");
    };
    SYSPROInteropClass.prototype.getVisualBuilderLayout = function () {
        try {
            console.log("getVisualBuilderLayout");
            if (SYSPRO_VB) {
                this.internalHistoryIndex = SYSPRO_VB.historyIndex;
                this.internalHistoryChange = 0;
            }
            var CleanOffCanvasModels = {};
            $.each(window.viewModel.OffCanvasLayouts, function (key, value) {
                if (value.Id) {
                    var cleanColumnsOutOC = value.Columns.data();
                    $.each(cleanColumnsOutOC, function (index) {
                        var widgetsOut = this.Widgets;
                        if (widgetsOut) {
                            $.each(widgetsOut, function (index) {
                                if (this.Tabs) {
                                    this.Tabs = this.Tabs.data();
                                }
                            });
                        }
                    });
                    CleanOffCanvasModels["offcanvas-" + value.Id] = {
                        Id: value.Id,
                        OffCanvas: value.OffCanvas,
                        Title: value.Title,
                        Columns: value.Columns.data(),
                        MainToolbar: {
                            IsToolbarVisible: value.MainToolbar.IsToolbarVisible,
                            Columns: value.MainToolbar.Columns.data()
                        }
                    };
                }
            });
            var cleanColumnsOut = window.viewModel.dataSource.data();
            $.each(cleanColumnsOut, function (index) {
                var widgetsOut = this.Widgets;
                if (widgetsOut) {
                    $.each(widgetsOut, function (index) {
                        if (this.Tabs) {
                            this.Tabs = this.Tabs.data();
                        }
                    });
                }
            });
            var columnContent = {
                MainToolbar: {
                    Columns: window.viewModel.toolbar.data()
                },
                Columns: cleanColumnsOut,
                OffCanvasLayouts: CleanOffCanvasModels
            };
            return JSON.stringify(columnContent);
        }
        catch (ex) {
            this.handleError(ex.message, "getVisualBuilderLayout");
        }
    };
    SYSPROInteropClass.prototype.setVisualBuilderLayout = function (DataIn) {
        try {
            console.log("setVisualBuilderLayout");
            window.viewModel.dataSource.data(DataIn);
        }
        catch (ex) {
            this.handleError(ex.message, "setVisualBuilderLayout");
        }
    };
    SYSPROInteropClass.prototype.getToolbarValues = function () {
        try {
            console.log("getToolbarValues");
            if (this.toolbarModel)
                return JSON.stringify(this.toolbarModel.toJSON());
            else
                return "{}";
        }
        catch (ex) {
            this.handleError(ex.message, "getToolbarValues");
        }
    };
    SYSPROInteropClass.prototype.getFormValues = function () {
        try {
            console.log("getFormValues");
            if (this.viewModel)
                return JSON.stringify(this.viewModel.toJSON());
            else
                return "{}";
        }
        catch (ex) {
            this.handleError(ex.message, "getFormValues");
        }
    };
    SYSPROInteropClass.prototype.getInactivityTime = function () {
        return Date.now() - this.lastActivityDateTime;
    };
    SYSPROInteropClass.prototype.getUnsavedChanges = function (DataIn) {
        try {
            console.log("getUnsavedChanges");
            var ChangesToSave = "false";
            if (SYSPRO_VB && (SYSPRO_VB.historyIndex !== this.internalHistoryIndex) || (this.internalHistoryChange !== 0)) {
                ChangesToSave = "true";
            }
            return ChangesToSave;
        }
        catch (ex) {
            this.handleError(ex.message, "getUnsavedChanges");
        }
    };
    SYSPROInteropClass.prototype.setFocus = function (DataIn) {
        try {
            var WindowToSetFocusIn = null;
            var isTab = false;
            var itemToFocus = null;
            for (var i = this.modalWindowHolder.length - 1; i >= 0; i--) {
                if (this.modalWindowHolder[i].NotModal === false) {
                    if (this.modalWindowHolder[i].Window && this.modalWindowHolder[i].Window.element) {
                        WindowToSetFocusIn = this.modalWindowHolder[i].Window.element;
                    }
                    break;
                }
            }
            if (!DataIn || DataIn === " ") {
                var lowestTopLeft = null;
                var lowestTopLeftElement = $(".syspro-focusable:not([disabled]):visible", WindowToSetFocusIn).first();
                $.each($(".syspro-focusable:not([disabled]):visible", WindowToSetFocusIn), function (index) {
                    if ($(this).offset()) {
                        if (!lowestTopLeft || $(this).offset().top + $(this).offset().left <= lowestTopLeft) {
                            lowestTopLeftElement = $(this);
                            lowestTopLeft = lowestTopLeftElement.offset().top + lowestTopLeftElement.offset().left;
                        }
                    }
                });
                lowestTopLeftElement.focus();
            }
            else {
                if (DataIn.indexOf("|NEXT") > 0) {
                    DataIn = DataIn.replace("|NEXT", "");
                    if ($("#" + DataIn.replace(".", "\\."), WindowToSetFocusIn).offset()) {
                        var currPosTotal = $("#" + DataIn.replace(".", "\\."), WindowToSetFocusIn).offset().top + $("#" + DataIn.replace(".", "\\."), WindowToSetFocusIn).offset().left;
                        var lowestDifference = 100000;
                        $.each($(".syspro-focusable:not([disabled]):visible", WindowToSetFocusIn), function (index) {
                            if (this.id !== DataIn) {
                                var itemDifference = $(this).offset().top + $(this).offset().left - currPosTotal;
                                if (itemDifference >= 0 && itemDifference < lowestDifference) {
                                    itemToFocus = $(this);
                                    lowestDifference = itemDifference;
                                }
                            }
                        });
                    }
                    else {
                        console.log("SetFocus Failed  - Field not found " + DataIn);
                    }
                    if (itemToFocus) {
                        console.log("Set focus next item found to be: " + itemToFocus.attr("id"));
                    }
                }
                else if (DataIn.indexOf("Tab.") === 0) {
                    var tabName = DataIn.replace("Tab.", "");
                    var tagFound = $('*[data-tabidentifier="' + tabName + '"]');
                    isTab = true;
                    $.each($(".avanti-tab-link", tagFound.closest(".avanti-tab-links-holder")), function (e) {
                        $(this).removeClass("active");
                        $(this).closest(".nav-item").removeClass("active");
                    });
                    tagFound.addClass("active");
                    tagFound.closest(".nav-item").addClass("active");
                    var tabId = tagFound.attr("href");
                    var actualTab = $(tabId);
                    $.each($(".avanti-tab-pane", actualTab.closest(".tab-content")), function (e) {
                        $(this).removeClass("active");
                        $(this).removeClass("in");
                    });
                    actualTab.addClass("active");
                    actualTab.addClass("in");
                }
                else {
                    itemToFocus = $("#" + DataIn.replace(".", "\\."));
                }
                if (itemToFocus && !isTab) {
                    if (itemToFocus.hasClass("combobox")) {
                        itemToFocus = $("input.combobox", itemToFocus.closest(".form-group"));
                    }
                    itemToFocus.focus();
                }
            }
        }
        catch (ex) {
            this.handleError(ex.message, "setFocus");
        }
    };
    SYSPROInteropClass.prototype.setFieldValue = function (DataIn) {
        try {
            if (DataIn.ParentName === "Toolbar") {
                if (DataIn.PropertyName === "Caption") {
                    $(".avanti-toolbar-button-caption", $("#" + DataIn.ParentName + "\\." + DataIn.FieldName)).html(DataIn.Value);
                }
                if (this.toolbarModel) {
                    if (this.toolbarModel[DataIn.ParentName]) {
                        if (this.toolbarModel[DataIn.ParentName][DataIn.FieldName]) {
                            if (this.toolbarModel[DataIn.ParentName][DataIn.FieldName]) {
                                this.toolbarModel[DataIn.ParentName][DataIn.FieldName].set(DataIn.PropertyName, DataIn.Value);
                                this.ignoreLastToolbarChange = true;
                                var dropdownContainer = $("#" + DataIn.ParentName + "\\." + DataIn.FieldName + ".dropdown-select");
                                if (dropdownContainer !== undefined && dropdownContainer !== null && dropdownContainer.length > 0) {
                                    var dropdownContainerFindOption = dropdownContainer.find("option");
                                    if ((dropdownContainerFindOption !== undefined) && (dropdownContainerFindOption !== null)) {
                                        if (dropdownContainer.find("option").length > 0 && !(dropdownContainer.find("option").length === 1 && dropdownContainer.find("option")[0].innerHTML === "")) {
                                            try {
                                                dropdownContainerFindOption.removeClass('selected');
                                                dropdownContainerFindOption.removeAttr('selected');
                                                dropdownContainer.trigger("change");
                                            }
                                            catch (e) {
                                                $("#" + e.ParentName + "\\." + e.FieldName + ".dropdown-select").parent().find("input")[0].value = e.Value;
                                                console.log(e.message);
                                            }
                                        }
                                    }
                                }
                                var dataFieldComboBox = $("#" + DataIn.ParentName + "\\." + DataIn.FieldName + ".combobox");
                                if (dataFieldComboBox !== undefined && dataFieldComboBox !== null && dataFieldComboBox.length > 0) {
                                    $("#" + DataIn.ParentName + "\\." + DataIn.FieldName + ".combobox.combobox-initialized").combobox('refresh');
                                }
                                $("li", $("#" + DataIn.ParentName + "\\." + DataIn.FieldName).next(".dropdownjs")).removeClass("selected");
                                $("[value='" + DataIn.Value + "']", $("#" + DataIn.ParentName + "\\." + DataIn.FieldName).next(".dropdownjs")).addClass("selected");
                            }
                        }
                    }
                }
                else {
                    this.handleError("At least one full bind of the fields must be performed before the setting an individual field  can be performed.", "setFieldValue");
                }
            }
            else {
                if (this.viewModel) {
                    if (this.viewModel[DataIn.ParentName]) {
                        if (this.viewModel[DataIn.ParentName][DataIn.FieldName]) {
                            if (this.viewModel[DataIn.ParentName][DataIn.FieldName]) {
                                this.viewModel[DataIn.ParentName][DataIn.FieldName].set(DataIn.PropertyName, DataIn.Value);
                            }
                        }
                    }
                }
                else {
                    this.handleError("At least one full bind of the fields must be performed before the setting an individual field  can be performed.", "setFieldValue");
                }
            }
        }
        catch (ex) {
            this.handleError(ex.message, "setFieldValue");
        }
    };
    SYSPROInteropClass.prototype.logSYSPROMessage = function (DataIn) {
        var dataType = DataIn.split('|')[0];
        var eventClass = DataIn.split('|')[1];
        var logMessage = DataIn.split('|')[2];
        if (this.logDataSource) {
            this.logDataSource.add({
                EventClass: eventClass,
                EventDate: new Date(),
                EventType: dataType,
                Message: logMessage
            });
        }
    };
    SYSPROInteropClass.prototype.setEnabled = function (DataIn) {
        try {
            var parentHolder = this;
            var toEnable = DataIn.Enable;
            $.each(DataIn.FieldNames, function (index) {
                if (this.indexOf("Links.") === 0) {
                    var keyAction = this.substr("Links.".length);
                    var linkTag = $("*[data-keyaction='" + keyAction + "']");
                    if (!toEnable) {
                        linkTag.addClass('disabled');
                    }
                    else {
                        linkTag.removeClass('disabled');
                    }
                }
                else {
                    var tagFound = $("#" + this.replace(".", "\\."));
                    if (this.indexOf("Toolbar.") === 0) {
                        if (tagFound.length > 0 && tagFound[0].tagName === "INPUT" && tagFound.is(':focus') && tagFound[0].type !== "checkbox") {
                            parentHolder.ignoreLastToolbarChange = true;
                        }
                        else {
                            parentHolder.ignoreLastToolbarChange = false;
                        }
                        if (tagFound.length === 0) {
                            tagFound = $("#" + this.replace("Toolbar.", "Fields\\.TOOLBAR\\:"));
                        }
                    }
                    if (!tagFound.hasClass("syspro-file-browse-input"))
                        tagFound.prop('disabled', !toEnable);
                    if (tagFound.hasClass("syspro-toolbar-widget-button")) {
                        if (!toEnable) {
                            tagFound.closest("li").addClass('disabled');
                        }
                        else {
                            tagFound.closest("li").removeClass('disabled');
                        }
                    }
                    if (tagFound.hasClass("gridButton") || tagFound.data("keyaction")) {
                        if (!toEnable) {
                            tagFound.addClass('disabled');
                        }
                        else {
                            tagFound.removeClass('disabled');
                        }
                    }
                    if ($(".syspro-browse-button-container", tagFound.closest(".form-group")).length > 0) {
                        if (!toEnable) {
                            $(".syspro-browse-button", $(".syspro-browse-button-container", tagFound.closest(".form-group"))).addClass('disabled');
                        }
                        else {
                            $(".syspro-browse-button", $(".syspro-browse-button-container", tagFound.closest(".form-group"))).removeClass('disabled');
                        }
                    }
                    if (tagFound.hasClass("date-input")) {
                        if (!toEnable) {
                            tagFound.siblings(".input-group-addon").addClass('disabled');
                        }
                        else {
                            tagFound.siblings(".input-group-addon").removeClass('disabled');
                        }
                    }
                    if (tagFound.hasClass("syspro-browse-input")) {
                        if (!toEnable) {
                            tagFound.siblings(".input-group-btn").addClass('disabled');
                        }
                        else {
                            tagFound.siblings(".input-group-btn").removeClass('disabled');
                        }
                    }
                    if (!toEnable) {
                        $(".syspro-hyperlink-button", tagFound.closest(".syspro-entry-content")).addClass('disabled');
                    }
                    else
                        $(".syspro-hyperlink-button", tagFound.closest(".syspro-entry-content")).removeClass('disabled');
                    if (!toEnable) {
                        tagFound.closest(".form-group").addClass('disabled');
                    }
                    else {
                        tagFound.closest(".form-group").removeClass('disabled');
                    }
                }
            });
        }
        catch (ex) {
            this.handleError(ex.message, "setEnabled");
        }
    };
    SYSPROInteropClass.prototype.setChecked = function (DataIn) {
        try {
            var toCheck = DataIn.Enable;
            $.each(DataIn.FieldNames, function (index) {
                var tagFound = $("#" + this.replace(".", "\\."));
                if (toCheck) {
                    tagFound.addClass('avanti-checked');
                    tagFound.attr('checked', "true");
                }
                else {
                    tagFound.removeClass('avanti-checked');
                    tagFound.attr('checked', null);
                }
            });
        }
        catch (ex) {
            this.handleError(ex.message, "setChecked");
        }
    };
    SYSPROInteropClass.prototype.getWidgetVisible = function (DataIn) {
        try {
            var IsVisibleReturn = "";
            $.each(DataIn.FieldNames, function (index) {
                var tagFound = $("#" + this.replace(".", "\\."));
                if (tagFound.length === 0) {
                    tagFound = $('*[data-sysprogridfieldname="' + this + '"]');
                }
                if (IsVisibleReturn)
                    IsVisibleReturn = IsVisibleReturn + ",";
                var isVisible = "false";
                if (tagFound.filter(":visible").length > 0) {
                    isVisible = "true";
                }
                IsVisibleReturn = IsVisibleReturn + isVisible;
            });
            return IsVisibleReturn;
        }
        catch (ex) {
            this.handleError(ex.message, "getWidgetVisible");
        }
    };
    SYSPROInteropClass.prototype.getGlobalValue = function (FieldName) {
        try {
            if (this.currentUserSession) {
                if (this.currentUserSession[FieldName]) {
                    return this.currentUserSession[FieldName];
                }
            }
            if (this.viewModel.Fields) {
                if (this.viewModel.Fields.SYSPROKeyData) {
                    var valueFound = this.viewModel.Fields.SYSPROKeyData.get(FieldName);
                    if (valueFound)
                        return valueFound.Value;
                }
            }
            return "";
        }
        catch (ex) {
            return "";
        }
    };
    SYSPROInteropClass.prototype.setFieldVisible = function (DataIn) {
        try {
            var toShow = DataIn.Enable;
            $.each(DataIn.FieldNames, function (index) {
                var fieldName = this;
                var tagFound;
                if (fieldName.indexOf("Grid.") === 0) {
                    var gridName = fieldName.replace("Grid.", "");
                    tagFound = $('*[data-sysprogridfieldname="' + gridName + '"]');
                    if (tagFound.length > 0)
                        tagFound = tagFound.closest(".noBorderTable");
                }
                else if (fieldName.indexOf("Tab.") === 0) {
                    var tabName = fieldName.replace("Tab.", "");
                    tagFound = $('*[data-tabidentifier="' + tabName + '"]');
                    var tabId = tagFound.attr("href");
                    var actualTab = $(tabId);
                    var tabContent = $(".avanti-tab-pane", actualTab.closest(".tab-content"));
                    if (!toShow) {
                        tabContent.removeClass("active");
                        tabContent.removeClass("in");
                    }
                }
                else {
                    tagFound = $("#" + fieldName.replace(".", "\\."));
                    if (tagFound.length > 0 && (tagFound[0].tagName === "INPUT" || tagFound[0].tagName === "TEXTAREA" || tagFound[0].tagName === "SELECT" || tagFound.hasClass("syspro-databound-radiobutton") || tagFound.hasClass("slider"))) {
                        tagFound = tagFound.closest(".form-group");
                    }
                }
                if (toShow) {
                    tagFound.show();
                }
                else {
                    tagFound.hide();
                }
            });
        }
        catch (ex) {
            this.handleError(ex.message, "setFieldVisible");
        }
    };
    SYSPROInteropClass.prototype.createButtonOnEntryField = function (DataInObject) {
        try {
            $.each(DataInObject.FieldNames, function (index) {
                var DataIn = this;
                var FieldName = DataIn.replace(".", "\\.");
                var FieldNameUnsanitized = DataIn;
                var insertButton = false;
                var ButtonName = "";
                var DisableInput = false;
                var hideButton = false;
                if (DataIn.indexOf("|") > 0) {
                    insertButton = true;
                    FieldName = DataIn.split("|")[0].replace(".", "\\.");
                    FieldNameUnsanitized = DataIn.split("|")[0];
                    ButtonName = DataIn.split("|")[1];
                    if (DataIn.split("|").length > 2) {
                        DisableInput = true;
                    }
                    if (ButtonName === "HIDE") {
                        hideButton = true;
                    }
                }
                var existingNode = $("#" + FieldName);
                var dataValue = existingNode.val();
                var usingDataWidget = null;
                if (!dataValue) {
                    if ($(".form-data-widget", existingNode).length > 0) {
                        usingDataWidget = $(".form-data-widget", existingNode);
                        dataValue = usingDataWidget.text();
                    }
                    else if ($(".data-field-value", existingNode).length > 0) {
                        usingDataWidget = $(".data-field-value", existingNode);
                        dataValue = usingDataWidget.text();
                    }
                    else {
                        dataValue = "NOTFOUND";
                    }
                }
                var dataCaption = FieldNameUnsanitized;
                if (existingNode.length > 0) {
                    $.each(existingNode, function (index) {
                        var innerNode = $(this);
                        if (insertButton) {
                            if (innerNode.hasClass("syspro-button-created")) {
                                $.each(innerNode, function (index) {
                                    var currentEntry = $(this);
                                    if (hideButton) {
                                        if (currentEntry.siblings("a.btn-block").length > 0)
                                            currentEntry.siblings("a.btn-block").hide();
                                        else
                                            $("a.btn-block", currentEntry.closest(".syspro-entry-content")).hide();
                                    }
                                    else {
                                        if (currentEntry.siblings("a.btn-block").length > 0)
                                            currentEntry.siblings("a.btn-block").show();
                                        else
                                            $("a.btn-block", currentEntry.closest(".syspro-entry-content")).show();
                                    }
                                });
                            }
                            else {
                                innerNode.closest(".syspro-entry-content").addClass("additional-input-button");
                                if (dataValue === "NOTFOUND") {
                                    dataValue = "";
                                }
                                var aTagCreated = '<a class="btn btn-default btn-block btn-sm" ref="#" onclick="sysproInterop.hyperlinkClicked(this)" data-fieldname="' + FieldNameUnsanitized + '" data-fieldcaption: "' + dataCaption + '" data-fieldvalue="' + dataValue + '">' + ButtonName + '</a>';
                                $.each(innerNode, function (index) {
                                    var currentEntry = $(this);
                                    if (currentEntry.siblings(".help-block").length === 0) {
                                        if (currentEntry.closest(".input-group").length > 0) {
                                            currentEntry.closest(".input-group").after(aTagCreated);
                                        }
                                        else {
                                            if (currentEntry.closest(".checkbox").length > 0) {
                                                currentEntry.closest(".checkbox").after(aTagCreated);
                                            }
                                            else
                                                currentEntry.parent().append(aTagCreated);
                                        }
                                    }
                                    else {
                                        currentEntry.siblings(".help-block").first().before(aTagCreated);
                                    }
                                });
                                if (DisableInput)
                                    $("input", innerNode.closest(".syspro-entry-content")).hide();
                                innerNode.addClass("syspro-button-created");
                                SYSPRO_VB.sizeAddonButtons();
                            }
                        }
                        else {
                            var itemAdded = null;
                            if (innerNode.hasClass("syspro-button-created")) {
                                if (dataValue !== "NOTFOUND") {
                                    $("a", innerNode).html(dataValue);
                                    if ($("a", innerNode).length > 0 && $("a", innerNode)[0]) {
                                        $("a", innerNode)[0].setAttribute("data-fieldcaption", dataCaption);
                                        $("a", innerNode)[0].setAttribute("data-fieldvalue", dataValue);
                                        $("a", innerNode)[0].setAttribute("data-fieldname", DataIn);
                                    }
                                }
                            }
                            else {
                                if (dataValue === "NOTFOUND") {
                                    dataValue = "";
                                }
                                var nodeContent = "<a ref='#' onclick='sysproInterop.hyperlinkClicked(this)' class='syspro-hyperlink-button' data-fieldname='" + FieldNameUnsanitized + "' data-fieldcaption: '" + dataCaption + "' data-fieldvalue='" + dataValue + "' data-bind='html: " + FieldNameUnsanitized + ".Value'>" + dataValue + "</a>";
                                var containerNode = innerNode.closest(".syspro-entry-content");
                                if (containerNode.length === 0) {
                                    if ($(".data-field-value", innerNode).length > 0) {
                                        $(".data-field-value", innerNode).after(nodeContent);
                                        itemAdded = $(".syspro-hyperlink-button", innerNode);
                                        $(".data-field-value", innerNode).hide();
                                    }
                                    else if ($(".form-data-widget", innerNode).length > 0) {
                                        $(".form-data-widget", innerNode).after(nodeContent);
                                        itemAdded = $(".syspro-hyperlink-button", innerNode);
                                        $(".form-data-widget", innerNode).hide();
                                    }
                                }
                                else {
                                    $(".help-block", containerNode).hide();
                                    innerNode.hide();
                                    $(".input-group-btn", containerNode).hide();
                                    itemAdded = containerNode.append(nodeContent);
                                }
                                existingNode.addClass("syspro-button-created");
                                if (usingDataWidget)
                                    innerNode = usingDataWidget;
                                if (innerNode[0].kendoBindingTarget)
                                    kendo.bind(itemAdded, innerNode[0].kendoBindingTarget.source);
                            }
                        }
                    });
                }
            });
        }
        catch (ex) {
            this.handleError(ex.message, "createButtonOnEntryField");
        }
    };
    SYSPROInteropClass.prototype.showModalWindow = function (DataIn, usageCase) {
        try {
            var modalId = DataIn.ModalId;
            var sysproModalId = DataIn.SYSPROId;
            var isMaximized = DataIn.Maximize;
            var modalHtml = '';
            var divHolder = null;
            var modalHolder = null;
            var InteropHolder = this;
            if (!InteropHolder.callLayerInterop.avantiPluginLoaded && sysproModalId && DataIn.Title && sysproModalId.trimRight() !== "IMPPAS" && sysproModalId !== "IMPMEN" && sysproModalId !== "      " && sysproModalId.trimRight() !== "IMPTIM" && sysproModalId.trimRight().length === 6) {
                InteropHolder.addRecentProgram(sysproModalId.trimRight(), DataIn.Title, "Program", null);
                InteropHolder.callLayerInterop.programName = sysproModalId.trimRight();
            }
            if (DataIn.ModalType === 0) {
                modalHtml = '<div id="' + modalId + '" data-syspromodalid="' + sysproModalId + '" class="modal-window-main"><div class="window-container"><div class="window-content">';
                modalHtml = modalHtml + DataIn.HtmlContent + '</div></div><div class="statusBar sys-bg-inverse"><span class="status-message sys-fg-very-light-gray">This is a status message</span></div></div>';
                $("#offCanvasContainer").append($(modalHtml));
                InteropHolder.modalWindowId = modalId;
                var includeClose = null;
                if (DataIn.NotModal) {
                    includeClose = ["Minimize", "Maximize", "Close"];
                    if (DataIn.NoClose) {
                        includeClose = ["Minimize", "Maximize"];
                    }
                }
                else {
                    includeClose = ["Close"];
                    if (DataIn.NoClose) {
                        includeClose = [];
                    }
                }
                if (DataIn.IncludePin) {
                    if (includeClose) {
                        includeClose.unshift("Pin");
                    }
                    else {
                        includeClose = ["Pin"];
                    }
                }
                modalHolder = SYSPRO_VB.createKendoWindow(modalId, DataIn.Title, function (e) {
                    if ($(".special-text-notes", this.wrapper).length === 1) {
                        $(this.wrapper).addClass('modal-with-special-text-notes');
                    }
                    if (this.wrapper) {
                        this.wrapper
                            .find(".k-i-pin").parent().click(function (e) {
                            InteropHolder.dockWindow(e);
                            e.preventDefault();
                        });
                    }
                }, function (e) {
                    var modalWindow = $(e.sender.element);
                    var kendoWindowInput = modalWindow.data("kendoWindow").options;
                    var topIn = kendoWindowInput.position.top;
                    var leftIn = kendoWindowInput.position.left;
                    var widthIn = kendoWindowInput.width;
                    var heightIn = kendoWindowInput.height;
                    if (isNaN(leftIn)) {
                        if (leftIn === "50%")
                            leftIn = "";
                        else
                            leftIn = leftIn.replace("px", "");
                    }
                    if (isNaN(topIn)) {
                        if (topIn === "50%")
                            topIn = "";
                        else
                            topIn = topIn.replace("px", "");
                    }
                    if (isNaN(widthIn)) {
                        widthIn = widthIn.replace("px", "");
                    }
                    if (isNaN(heightIn)) {
                        heightIn = heightIn.replace("px", "");
                    }
                    var windowClosed = true;
                    var positionCurrent = leftIn + ";" + topIn + ";" + widthIn + ";" + heightIn;
                    if (e.userTriggered) {
                        InteropHolder.isProgramaticClose = false;
                        InteropHolder.modalWindowClosed(modalWindow.data("syspromodalid"), positionCurrent);
                    }
                    if (!DataIn.NotModal) {
                        if (e.userTriggered) {
                            windowClosed = false;
                            e.preventDefault();
                        }
                    }
                    if (windowClosed && e.userTriggered) {
                        var indexRemoved = -1;
                        $.each(InteropHolder.modalWindowHolder, function (index) {
                            if (this.Id == modalWindow.data("syspromodalid")) {
                                indexRemoved = index;
                            }
                        });
                        if (indexRemoved > -1) {
                            InteropHolder.modalWindowHolder.splice(indexRemoved, 1);
                        }
                        else {
                            InteropHolder.modalWindowHolder.pop();
                        }
                    }
                    if (windowClosed) {
                        if (usageCase !== "SearchWindow") {
                            InteropHolder.fullBindRequired = null;
                        }
                    }
                    $(".tooltip").hide();
                    $("[id=loading-cover]").fadeOut();
                }, includeClose, DataIn.Width, DataIn.Height, DataIn.NotModal, true, true, DataIn.Left, DataIn.Top);
                var modalWindowOpened = null;
                var windowPlacement = JSON.parse(localStorage.getItem('windowPlacement')) || {};
                var storedPlacement = windowPlacement.hasOwnProperty(callLayerInterop.programName) && windowPlacement[callLayerInterop.programName].hasOwnProperty(sysproModalId);
                if (storedPlacement) {
                    modalHolder.setOptions(windowPlacement[callLayerInterop.programName][sysproModalId]);
                }
                if ((!DataIn.Left && !DataIn.Top) && !storedPlacement) {
                    modalWindowOpened = modalHolder.center().open();
                }
                else {
                    modalWindowOpened = modalHolder.open();
                }
                if (isMaximized)
                    modalWindowOpened.maximize();
                divHolder = modalHolder.element;
                if (usageCase !== "SearchWindow") {
                    InteropHolder.fullBindRequired = $("#" + modalId);
                }
            }
            else {
                var offCanvasClass = "navbar-offcanvas-right";
                if (DataIn.ModalType === 2) {
                    offCanvasClass = "navbar-offcanvas-bottom";
                }
                modalHtml = '<div class="' + offCanvasClass + ' navbar-offcanvas navbar-offcanvas-touch is-open" id="offcanvas-' + modalId + '"><header class="offcanvas-header">';
                modalHtml = modalHtml + '<h4 class="pull-left sys-mg-t-10 sys-mg-b-5">' + DataIn.Title + '</h4>';
                if (!DataIn.NoClose) {
                    modalHtml = modalHtml + '<span class="pull-right offcanvas-toggle sys-pd-t-10" data-toggle="offcanvas" data-target="#offcanvas-' + modalId + '" onclick="sysproInterop.isProgramaticClose = false;">';
                    modalHtml = modalHtml + '<i class="material-icons">close</i></span>';
                    modalHtml = modalHtml + '<span class="pull-right offcanvas-toggle sys-pd-t-10" data-syspromodalid="' + sysproModalId + '" onclick="sysproInterop.undockOffcanvas(this);" data-tooltip="tooltip" data-placement="bottom" data-original-title="Undock window">';
                    modalHtml = modalHtml + '<i class="material-icons">eject</i></span>';
                }
                modalHtml = modalHtml + '</header>';
                modalHtml = modalHtml + DataIn.HtmlContent;
                modalHtml = modalHtml + '</div>';
                $("#offCanvasContainer").append($(modalHtml));
                divHolder = $("#offcanvas-" + modalId + ' [data-toggle="offcanvas"]');
                modalHolder = new Offcanvas($("#offcanvas-" + modalId + ' [data-toggle="offcanvas"]'));
                var widthIn = DataIn.Width;
                var heightIn = DataIn.Height;
                $("#offcanvas-" + modalId).on("hide.bs.offcanvas", function (e) {
                    if (!InteropHolder.isProgramaticClose) {
                        var positionCurrent = "0;0;" + widthIn + ";" + heightIn;
                        InteropHolder.modalWindowClosed(sysproModalId, positionCurrent);
                    }
                    var windowClosed = true;
                    if (!DataIn.NotModal) {
                        if (!InteropHolder.isProgramaticClose) {
                            windowClosed = false;
                            return e.preventDefault();
                        }
                    }
                    if (windowClosed && !InteropHolder.isProgramaticClose) {
                        var indexRemoved = -1;
                        $.each(InteropHolder.modalWindowHolder, function (index) {
                            if (this.Id == sysproModalId) {
                                indexRemoved = index;
                            }
                        });
                        if (indexRemoved > -1) {
                            InteropHolder.modalWindowHolder.splice(indexRemoved, 1);
                        }
                        else {
                            InteropHolder.modalWindowHolder.pop();
                        }
                        queryLayoutUIHelpers.disposeViewOnly(modalId);
                    }
                    if (windowClosed) {
                        InteropHolder.fullBindRequired = null;
                    }
                    InteropHolder.isProgramaticClose = false;
                });
                $("#offcanvas-" + modalId + ' .offcanvas-toggle').addClass("is-open");
                $("#offcanvas-" + modalId).addClass("in");
                var HeightWidthHolder = "";
                if (DataIn.ModalType == 1) {
                    if (widthIn) {
                        if (!isNaN(widthIn)) {
                            widthIn = widthIn + "px";
                        }
                        $("#offcanvas-" + modalId).css("right", "-" + widthIn);
                        $("#offcanvas-" + modalId).css("max-width", widthIn);
                    }
                    $("#offcanvas-" + modalId).css("height", "100%");
                }
                else {
                    if (!isNaN(heightIn)) {
                        heightIn = heightIn + "px";
                    }
                    $("#offcanvas-" + modalId).css("bottom", "-" + widthIn);
                    $("#offcanvas-" + modalId).css("max-height", widthIn);
                }
                if (usageCase !== "SearchWindow") {
                    InteropHolder.fullBindRequired = $("#offcanvas-" + modalId);
                }
            }
            InteropHolder.modalWindowHolder.push({
                Id: sysproModalId,
                Window: modalHolder,
                NotModal: DataIn.NotModal,
                ModalType: DataIn.ModalType
            });
            if (usageCase !== "SearchWindow") {
                InteropHolder.bindOnCurrentDivPerformed = false;
                InteropHolder.bindOnCurrentToolbarPerformed = false;
            }
            queryLayoutUIHelpers.initializeViewOnly(null, divHolder, modalId);
            queryLayoutUIHelpers.initializeToolbarEvents();
            $("[id=loading-cover]").fadeOut();
            return modalId;
        }
        catch (ex) {
            InteropHolder.handleError(ex.message, "showModalWindow");
        }
    };
    SYSPROInteropClass.prototype.openNewSYSPROInstance = function (DataIn) {
        try {
            if (window.location.href.indexOf("?") > -1) {
                var currentUrl = window.location.href.replace("#", "");
                currentUrl = currentUrl.substring(0, window.location.href.indexOf("?"));
                window.open(currentUrl + "?SecondInstance=true&OpenParameters=" + DataIn, "_blank");
            }
            else
                window.open(window.location.href.replace("#", "") + "?SecondInstance=true&OpenParameters=" + DataIn, "_blank");
        }
        catch (ex) {
            this.handleError(ex.message, "openNewSYSPROInstance");
        }
    };
    SYSPROInteropClass.prototype.undoCalled = function (DataIn) {
        try {
            console.log("undoCalled");
            this.internalHistoryChange = this.internalHistoryChange + 1;
        }
        catch (ex) {
            this.handleError(ex.message, "undoCalled");
        }
    };
    SYSPROInteropClass.prototype.redoCalled = function (DataIn) {
        try {
            console.log("redoCalled");
            this.internalHistoryChange = this.internalHistoryChange - 1;
        }
        catch (ex) {
            this.handleError(ex.message, "redoCalled");
        }
    };
    SYSPROInteropClass.prototype.getAvailableFields = function (callbackMethod, errorcallbackMethod, nocategories) {
        try {
            if (!nocategories)
                nocategories = "false";
            else if (nocategories === true)
                nocategories = "true";
            var NativeCallDataIn = {
                Operation: "getAvailableFields",
                Application: "",
                KeyField: nocategories,
                KeyFieldValue: "",
                FinalParameter: "",
                AdditionalField1: "",
                AdditionalField2: "",
                AdditionalField3: "",
                CallbackIndex: this.threadedCallbackIndexToUse,
                CallbackMethod: "this.interopCallbackReceived"
            };
            this.threadedCallbacksLookup[this.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod
            };
            while (this.threadedCallbacksLookup[this.threadedCallbackIndexToUse]) {
                this.threadedCallbackIndexToUse++;
            }
            this.callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
        catch (ex) {
            this.handleError(ex.message, "getAvailableFields");
        }
    };
    SYSPROInteropClass.prototype.queryForCard = function (cardType, businessObject, keyValue, keyData, callbackMethod, errorcallbackMethod) {
        try {
            var NativeCallDataIn = {
                Operation: "queryForCard",
                Application: keyData,
                KeyField: cardType,
                KeyFieldValue: JSON.stringify(keyValue),
                FinalParameter: businessObject,
                AdditionalField1: "",
                AdditionalField2: "",
                AdditionalField3: "",
                CallbackIndex: this.threadedCallbackIndexToUse,
                CallbackMethod: "this.interopCallbackReceived"
            };
            this.threadedCallbacksLookup[this.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod
            };
            while (this.threadedCallbacksLookup[this.threadedCallbackIndexToUse]) {
                this.threadedCallbackIndexToUse++;
            }
            this.callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
        catch (ex) {
            this.handleError(ex.message, "queryForCard");
        }
    };
    SYSPROInteropClass.prototype.interopCallbackReceived = function (e) {
        try {
            var itemOut = new ErrorMessageModel();
            try {
                itemOut = JSON.parse(e.OutputData);
            }
            catch (ex) {
                itemOut.ErrorMessage = ex.message;
            }
            if (this.threadedCallbacksLookup[e.CallbackIndex]) {
                if (!itemOut) {
                    itemOut = new ErrorMessageModel();
                    itemOut.ErrorMessage = "A blank reply was received from the call.";
                }
                if (itemOut.ErrorMessage) {
                    console.log("interopCallbackReceived ERROR MESSAGE- " + itemOut.ErrorMessage);
                    if (this.threadedCallbacksLookup[e.CallbackIndex].Error)
                        this.threadedCallbacksLookup[e.CallbackIndex].Error(itemOut);
                }
                else {
                    if (this.threadedCallbacksLookup[e.CallbackIndex].Success)
                        this.threadedCallbacksLookup[e.CallbackIndex].Success(itemOut);
                }
                this.threadedCallbacksLookup[e.CallbackIndex] = null;
                this.threadedCallbackIndexToUse = e.CallbackIndex;
            }
        }
        catch (ex) {
            console.log(ex);
            console.log("interopCallbackReceivedERROR - " + JSON.stringify(this.threadedCallbacksLookup[e.CallbackIndex]));
            this.handleError(ex.message, "interopCallbackReceived");
        }
    };
    SYSPROInteropClass.prototype.getStructureForBO = function (selectedBO, setKeyFieldValue, xmlIn, callbackMethod, errorcallbackMethod) {
        try {
            var NativeCallDataIn = {
                Operation: "getStructureForBO",
                Application: "",
                KeyField: "",
                KeyFieldValue: "",
                FinalParameter: "",
                AdditionalField1: selectedBO,
                AdditionalField2: setKeyFieldValue,
                AdditionalField3: xmlIn,
                CallbackIndex: this.threadedCallbackIndexToUse,
                CallbackMethod: "this.interopCallbackReceived"
            };
            this.threadedCallbacksLookup[this.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod
            };
            while (this.threadedCallbacksLookup[this.threadedCallbackIndexToUse]) {
                this.threadedCallbackIndexToUse++;
            }
            this.callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
        catch (ex) {
            this.handleError(ex.message, "getStructureForBO");
        }
    };
    SYSPROInteropClass.prototype.getIconsAvailable = function (callbackMethod, errorcallbackMethod) {
        try {
            this.genericCall("getIconsAvailable", "", "", "", "", "", "", "", callbackMethod, errorcallbackMethod);
        }
        catch (ex) {
            this.handleError(ex.message, "getIconsAvailable");
        }
    };
    SYSPROInteropClass.prototype.queryForTiles = function (listOfTiles, keyFieldData, businessObject, tileParameters, tileTypeNames, callbackMethod, errorcallbackMethod) {
        try {
            this.genericCall("queryForTiles", JSON.stringify(listOfTiles), businessObject, JSON.stringify(keyFieldData), JSON.stringify(tileParameters), JSON.stringify(tileTypeNames), "", "", callbackMethod, errorcallbackMethod);
        }
        catch (ex) {
            this.handleError(ex.message, "queryForTiles");
        }
    };
    SYSPROInteropClass.prototype.callHarmonyService = function (callType, methodName, parametersIn, callbackMethod, errorcallbackMethod) {
        try {
            var parametersRaw;
            if (callType === "GET") {
                parametersRaw = $.param(parametersIn);
            }
            else {
                parametersRaw = JSON.stringify(parametersIn);
            }
            var AddtionalField1 = "";
            if (this.viewModel && this.viewModel.Fields && this.viewModel.Fields.SYSPROKeyData) {
                AddtionalField1 = JSON.stringify(this.viewModel.Fields.SYSPROKeyData);
            }
            this.genericCall("callHarmonyService", "", callType, methodName, parametersRaw, AddtionalField1, "", "", callbackMethod, errorcallbackMethod);
        }
        catch (ex) {
            this.handleError(ex.message, "callHarmonyService");
        }
    };
    SYSPROInteropClass.prototype.selectImage = function (callbackMethod, errorcallbackMethod) {
        try {
            this.genericCall("selectImage", "", "", "", "", "", "", "", callbackMethod, errorcallbackMethod);
        }
        catch (ex) {
            this.handleError(ex.message, "selectImage");
        }
    };
    SYSPROInteropClass.prototype.selectFile = function (callbackMethod, errorcallbackMethod, fileTypes) {
        try {
            this.callLayerInterop.selectFile(callbackMethod, errorcallbackMethod, fileTypes);
        }
        catch (ex) {
            this.handleError(ex.message, "selectFile");
        }
    };
    SYSPROInteropClass.prototype.openFile = function (callbackMethod, errorcallbackMethod, fileUrl, fileName, print) {
        try {
            this.callLayerInterop.openFile(callbackMethod, errorcallbackMethod, fileUrl, fileName, print);
        }
        catch (ex) {
            this.handleError(ex.message, "openFile");
        }
    };
    SYSPROInteropClass.prototype.showDatePicker = function (dateIn) {
        try {
            var interopHolder = this;
            var datepickerId = interopHolder.generateUUID();
            var showLeft = dateIn.LocationX;
            if (!showLeft) {
                showLeft = interopHolder.cursorX;
            }
            var showTop = dateIn.LocationY;
            if (!showTop) {
                showTop = interopHolder.cursorY;
            }
            var parentContainer = $("#harness-container");
            if (interopHolder.modalWindowHolder.length > 0) {
                parentContainer = interopHolder.modalWindowHolder[0].Window.element;
                showTop = parseInt(showTop) - parentContainer.offset().top;
                showLeft = parseInt(showLeft) - parentContainer.offset().left;
            }
            showTop = parseInt(showTop) + 250;
            parentContainer.append("<input id='testpickertemp" + datepickerId + "' style='position: absolute; left: " + showLeft + "px; top: " + showTop + "px; z-index=10000; opacity: 0;'></input>");
            $("#testpickertemp" + datepickerId).datepicker("show").on("changeDate", function (e) {
                var formattedDate = kendo.toString(e.date, "yyyy-MM-dd");
                interopHolder.eventTrigged(dateIn.FieldName, formattedDate, "", "", "fieldChange", function (eCurrent) { }, function (eCurrent) { });
                $("#testpickertemp" + datepickerId).datepicker("destroy");
                $("#testpickertemp" + datepickerId).remove();
            });
        }
        catch (ex) {
            this.handleError(ex.message, "showDatePicker");
        }
    };
    SYSPROInteropClass.prototype.callFromSYSPRO = function (callType, dataIn) {
        try {
            switch (callType) {
                case "bindDataTo":
                    this.bindDataTo(JSON.parse(dataIn));
                    break;
                case "bindToolbar":
                    this.bindToolbar(JSON.parse(dataIn), false, false);
                    break;
                case "setAvailableFields":
                    this.setAvailableFieldsInternal(JSON.parse(dataIn));
                    break;
                case "getVisualBuilderLayout":
                    return this.getVisualBuilderLayout();
                case "setVisualBuilderLayout":
                    this.setVisualBuilderLayout(JSON.parse(dataIn));
                    break;
                case "getUnsavedChanges":
                    return this.getUnsavedChanges(null);
                case "setFocus":
                    return this.setFocus(dataIn);
                case "setFieldValue":
                    return this.setFieldValue(JSON.parse(dataIn));
                case "logSYSPROMessage":
                    return this.logSYSPROMessage(dataIn);
                case "showModalWindow":
                    return this.showModalWindow(JSON.parse(dataIn), null);
                case "openNewSYSPROInstance":
                    return this.openNewSYSPROInstance(dataIn);
                case "setEnabled":
                    return this.setEnabled(JSON.parse(dataIn));
                case "showDatePicker":
                    return this.showDatePicker(JSON.parse(dataIn));
                case "setChecked":
                    return this.setChecked(JSON.parse(dataIn));
                case "setFieldVisible":
                    return this.setFieldVisible(JSON.parse(dataIn));
                case "createButtonOnEntryField":
                    return this.createButtonOnEntryField(JSON.parse(dataIn));
                case "createGridList":
                    return this.gridHelpers.createGridList(JSON.parse(dataIn));
                case "refreshGridList":
                    return this.gridHelpers.refreshGridList(JSON.parse(dataIn));
                case "gridRequestInternalEvent":
                    return this.gridHelpers.gridRequestInternalEvent(JSON.parse(dataIn));
                case "createTreeList":
                    return this.gridHelpers.createTreeList(JSON.parse(dataIn));
                case "refreshTreeList":
                    return this.gridHelpers.refreshTreeList(JSON.parse(dataIn));
                case "treeRequestInternalEvent":
                    return this.gridHelpers.treeRequestInternalEvent(JSON.parse(dataIn));
                case "createTreeView":
                    return this.gridHelpers.createTreeView(JSON.parse(dataIn));
                case "treeViewRequestInternalEvent":
                    return this.gridHelpers.treeViewRequestInternalEvent(JSON.parse(dataIn));
                case "createSyntaxEditor":
                    return this.syntaxEditorHelpers.createSyntaxEditor(JSON.parse(dataIn));
                case "syntaxEditorRequestInternalEvent":
                    return this.syntaxEditorHelpers.syntaxEditorRequestInternalEvent(JSON.parse(dataIn));
                case "showPopupDialog":
                    return this.showPopupDialog(JSON.parse(dataIn));
                case "closeModalWindow":
                    return this.closeModalWindow(dataIn);
                case "setModalWindowTitle":
                    return this.setModalWindowTitle(dataIn);
                case "showTaskDialog":
                    return this.showTaskDialog(JSON.parse(dataIn));
                case "showContextMenu":
                    return this.showContextMenu(JSON.parse(dataIn));
                case "toggleLoadingScreen":
                    return this.toggleLoadingScreen(JSON.parse(dataIn));
                case "setStatusMessage":
                    return this.setStatusMessage(JSON.parse(dataIn));
                case "getFormValues":
                    return this.getFormValues();
                case "getToolbarValues":
                    return this.getToolbarValues();
                case "getInactivityTime":
                    return this.getInactivityTime();
                case "showError":
                    var message = dataIn.split('|')[0];
                    var title = dataIn.split('|')[1];
                    return this.showErrorMessage(message, title);
                case "openFile":
                    return this.openFile(null, function (ex2) {
                        this.handleError(ex2.message, "openFile");
                    }, JSON.parse(dataIn), JSON.parse(dataIn), false);
                case "printFile":
                    return this.openFile(null, function (ex2) {
                        this.handleError(ex2.message, "openFile");
                    }, JSON.parse(dataIn), JSON.parse(dataIn), true);
                case "getWidgetVisible":
                    return this.getWidgetVisible(JSON.parse(dataIn));
                case "signOutAvanti":
                    return this.closeSYSPROFusion(true);
                case "selectFile":
                    return this.selectFileInternal(dataIn);
                case "clearPluginLoaded":
                    this.callLayerInterop.previousAvantiPlugin = this.callLayerInterop.avantiPluginLoaded;
                    this.callLayerInterop.avantiPluginLoaded = "";
                    break;
                case "closeBrowserTab":
                    return this.closeBrowserTab();
                case "sendNotification":
                    this.sendNotification(JSON.parse(dataIn));
                    break;
                case "generateAndInsertHtml":
                    this.generateAndInsertHtml(JSON.parse(dataIn));
                    break;
                case "executeScript":
                    eval(dataIn);
                    break;
                default:
            }
        }
        catch (ex) {
            console.log("callFromSYSPRO Error - " + ex.message);
            this.handleError(ex.message, "callFromSYSPRO");
        }
    };
    SYSPROInteropClass.prototype.generateAndInsertHtml = function (dataIn) {
        console.log("generateAndInsertHtml - " + dataIn.DynamicDivId);
        $("#" + dataIn.DynamicDivId).html(dataIn.HtmlContent);
        this.bindOnCurrentDivPerformed = false;
        queryLayoutUIHelpers.initializeViewOnly(false, $("#" + dataIn.DynamicDivId), "");
    };
    SYSPROInteropClass.prototype.showPopup = function (text) {
        alert(text);
    };
    SYSPROInteropClass.prototype.handleError = function (error, parentMethod) {
        if (this.errorHandler === "Popup")
            this.showPopup("Error: " + parentMethod + " - " + error);
        else if (this.errorHandler === "Log")
            console.log("Error: " + parentMethod + " - " + error);
        else if (this.errorHandler === "Internal") {
            var fullErrorMessage = "Sorry, something has gone wrong when trying to  '" + parentMethod + "'. The technical error message is:";
            if (parentMethod === "CleanError") {
                if (error && error.indexOf("ERROR: ") == 0)
                    error = error.substring(7);
                fullErrorMessage = error;
                error = "";
            }
            this.showErrorMessage(error, fullErrorMessage);
        }
    };
    SYSPROInteropClass.prototype.bindingStarted = function (dataIn) {
    };
    SYSPROInteropClass.prototype.bindingCompleted = function (dataIn) {
    };
    SYSPROInteropClass.prototype.bindDataTo = function (dataModelIn) {
        try {
            this.hideErrorMessage();
            if (this.bindingStarted) {
                this.bindingStarted(dataModelIn);
            }
            var itemOut = new ErrorMessageModel();
            try {
                dataModelIn.DataIn = dataModelIn.DataIn.replace(/\n/g, "\\n")
                    .replace(/\r/g, "\\r")
                    .replace(/\t/g, "\\t")
                    .replace(/\f/g, "\\f");
                itemOut = JSON.parse(dataModelIn.DataIn);
            }
            catch (ex) {
                itemOut.ErrorMessage = ex.message;
            }
            var performFullBind = false;
            if (!this.bindOnCurrentDivPerformed) {
                performFullBind = true;
            }
            this.performBind(itemOut, performFullBind, null, this.fullBindRequired, null, null);
            if (this.bindingCompleted) {
                this.bindingCompleted(itemOut);
            }
        }
        catch (ex) {
            this.handleError(ex.message, "bindDataTo");
        }
    };
    SYSPROInteropClass.prototype.performBind = function (itemIn, fullBind, prefixSelector, selectorItem, callback, clearBoundModel) {
        try {
            var InteropHolder = this;
            if (!prefixSelector) {
                prefixSelector = "";
            }
            if (kendo && kendo.culture()) {
                kendo.culture().numberFormat["."] = InteropHolder.decimalCharacter;
                kendo.culture().numberFormat[","] = InteropHolder.thousandSeperator;
            }
            var itemOut = itemIn;
            if (itemOut && !itemOut.ErrorMessage) {
                if (selectorItem) {
                    var parentId = $(".container-id-holder", selectorItem).data("containerid");
                    if (parentId) {
                        selectorItem = $.merge(selectorItem, $("*[data-parentwindowid='" + parentId + "']"));
                    }
                }
                var BoundItemDiv = $(prefixSelector + " .sys-widget:not(.card-widget,.harmony-widget,.tile-widget,.tile-inner,.syspro-toolbar,.tiles-parent,.syspro-nonbound)", selectorItem);
                if (InteropHolder.viewModel) {
                    if (itemOut.Fields) {
                        $.each(itemOut.Fields, function (key, value) {
                            if (key !== "SYSPROKeyData") {
                                if (InteropHolder.viewModel.Fields.set) {
                                    InteropHolder.viewModel.Fields.set(key, this);
                                }
                                if ($(".syspro-trackfield-change#Fields\\." + key).length > 0) {
                                    $(".syspro-trackfield-change#Fields\\." + key)[0].setAttribute("data-fieldlastvalue", this);
                                }
                                if ($("#Fields\\." + key).hasClass("dropdown-select")) {
                                    var inputfield = $("input.fakeinput", $("#Fields\\." + key).next(".dropdownjs"));
                                    if (this && this.Value === "") {
                                        if (!inputfield.data("backupcolor"))
                                            inputfield.data("backupcolor", inputfield.css("color"));
                                        inputfield.css("color", "white");
                                    }
                                    else {
                                        if (inputfield.data("backupcolor")) {
                                            inputfield.css("color", inputfield.data("backupcolor"));
                                        }
                                    }
                                }
                            }
                        });
                        if (itemOut.Fields.SYSPROKeyData) {
                            if (!InteropHolder.viewModel.Fields.SYSPROKeyData) {
                                if (InteropHolder.viewModel.Fields.set) {
                                    InteropHolder.viewModel.Fields.set("SYSPROKeyData", {});
                                }
                            }
                            $.each(itemOut.Fields.SYSPROKeyData, function (key2, value2) {
                                if (InteropHolder.viewModel.Fields.SYSPROKeyData.set) {
                                    InteropHolder.viewModel.Fields.SYSPROKeyData.set(key2, value2);
                                }
                            });
                        }
                    }
                    else {
                        $.each(itemOut, function (key, value) {
                            if (InteropHolder.viewModel.set) {
                                InteropHolder.viewModel.set(key, this);
                            }
                        });
                    }
                }
                else {
                    fullBind = true;
                    clearBoundModel = true;
                }
                if (fullBind) {
                    if (clearBoundModel)
                        InteropHolder.viewModel = kendo.observable(itemOut);
                    if (jQuery.contains(document.documentElement, BoundItemDiv[0])) {
                        kendo.bind(BoundItemDiv, InteropHolder.viewModel);
                        if (itemOut.Fields) {
                            $.each(itemOut.Fields, function (key, value) {
                                if ($("#Fields\\." + key).hasClass("dropdown-select")) {
                                    if (InteropHolder.viewModel.Fields.set) {
                                        InteropHolder.viewModel.Fields.set(key, this);
                                    }
                                    var inputfield = $("input.fakeinput", $("#Fields\\." + key).next(".dropdownjs"));
                                    if (this && this.Value === "") {
                                        if (!inputfield.data("backupcolor"))
                                            inputfield.data("backupcolor", inputfield.css("color"));
                                        inputfield.css("color", "white");
                                    }
                                    else {
                                        if (inputfield.data("backupcolor")) {
                                            inputfield.css("color", inputfield.data("backupcolor"));
                                        }
                                    }
                                    if (this.Value === null) {
                                        this.Value = "";
                                    }
                                }
                            });
                        }
                        sysproInterop.resizeSparklines(BoundItemDiv);
                        fullBind = true;
                        InteropHolder.bindOnCurrentDivPerformed = true;
                    }
                }
                if (itemOut.SYSPROKeyData || (itemOut.Fields && (itemOut.Fields.SYSPROKeyData || itemOut.Fields.SYSPROKeyData === ""))) {
                    $.each($(prefixSelector + " .card-bindable:not(.harmony-widget,.tile-widget)"), function (index) {
                        InteropHolder.bindGenericCard($(this), itemOut.Fields.SYSPROKeyData);
                    });
                    if (InteropHolder.harmonyEnabled) {
                        $.each($(prefixSelector + " .harmony-widget", selectorItem), function (index) {
                            HarmonyInterop.bindWidget($(this), itemOut.Fields.SYSPROKeyData);
                        });
                    }
                    InteropHolder.bindTiles(itemOut, selectorItem, prefixSelector, fullBind);
                }
            }
            else {
                if (!itemOut) {
                }
                else {
                    InteropHolder.handleError(itemOut.ErrorMessage, "performBind");
                }
            }
            InteropHolder.subscribeToFieldEvents();
            queryLayoutUIHelpers.initSliders(BoundItemDiv);
            SYSPRO_VB.adjustContainerPadding();
            console.log("@@performBind completed");
            if (callback)
                callback(true, "Bind performed successfully.");
        }
        catch (ex) {
            console.log(ex);
        }
    };
    SYSPROInteropClass.prototype.bindToolbar = function (dataModelIn, fullBind, clearBoundModel) {
        try {
            var InteropHolder_1 = this;
            var itemOut = new ToolbarModel();
            try {
                itemOut = JSON.parse(dataModelIn.DataIn);
            }
            catch (ex) {
                itemOut.ErrorMessage = ex.message;
            }
            try {
                $.each(itemOut.Toolbar, function (key, value) {
                    value.Items.Item = Array.isArray(value.Items.Item) ?
                        value.Items.Item :
                        [value.Items.Item];
                });
            }
            catch (_a) { }
            var toolbarDiv = $(".syspro-toolbar");
            if (InteropHolder_1.fullBindRequired) {
                toolbarDiv = $(".syspro-toolbar", InteropHolder_1.fullBindRequired);
            }
            else {
                toolbarDiv = $(".syspro-toolbar");
            }
            if (!InteropHolder_1.bindOnCurrentToolbarPerformed) {
                fullBind = true;
            }
            if (InteropHolder_1.toolbarModel && InteropHolder_1.toolbarModel.Toolbar) {
                if (itemOut.Toolbar) {
                    $.each(itemOut.Toolbar, function (key, value) {
                        if (!this.PredictiveSearch) {
                            if (InteropHolder_1.toolbarModel) {
                                if (InteropHolder_1.toolbarModel.Toolbar.get(key)) {
                                    if (InteropHolder_1.toolbarModel.Toolbar.get(key).PredictiveSearch) {
                                        this.PredictiveSearch = InteropHolder_1.toolbarModel.Toolbar.get(key).PredictiveSearch;
                                    }
                                }
                            }
                        }
                        InteropHolder_1.toolbarModel.Toolbar.set(key, this);
                    });
                }
                else {
                    alert("This  is  legacy and should  not  happen");
                    $.each(itemOut, function (key, value) {
                        InteropHolder_1.toolbarModel.set(key, this);
                    });
                }
            }
            else {
                fullBind = true;
                clearBoundModel = true;
            }
            if (fullBind) {
                if (clearBoundModel)
                    InteropHolder_1.toolbarModel = kendo.observable(itemOut);
                if (jQuery.contains(document.documentElement, toolbarDiv[0])) {
                    kendo.bind(toolbarDiv, InteropHolder_1.toolbarModel);
                }
                InteropHolder_1.bindOnCurrentToolbarPerformed = true;
            }
            $('select.combobox.combobox-initialized').combobox('refresh');
            InteropHolder_1.subscribeToFieldEvents();
        }
        catch (ex) {
            this.handleError(ex.message, "bindToolbar");
        }
    };
    SYSPROInteropClass.prototype.bindGenericCard = function (cardDiv, dataChanged) {
        try {
            var InteropHolder_2 = this;
            var cardWidgetHolder = cardDiv.closest(".card-widget");
            var cardType = cardWidgetHolder.data("cardtype");
            var cardTypeDetail = cardWidgetHolder.data("cardtypedetail");
            var parentFieldPath = cardWidgetHolder.data("parentfieldpath");
            var bindfunctionname = cardWidgetHolder.data("bindfunctionname");
            var afterbindfunctionname = cardWidgetHolder.data("afterbindfunctionname");
            var businessobject = cardWidgetHolder.data("businessobject");
            var keyFieldName = cardTypeDetail;
            var cardkeyvalue = "";
            if (parentFieldPath) {
                var cardkeyHolder = InteropHolder_2.viewModel.toJSON();
                var splitFields = parentFieldPath.split(".");
                var previousValue = keyFieldName;
                $.each(splitFields, function (index) {
                    var valueStr = this + "";
                    if (cardkeyHolder) {
                        if (cardkeyHolder[valueStr]) {
                            cardkeyHolder = cardkeyHolder[valueStr];
                            keyFieldName = previousValue;
                        }
                        else {
                            cardkeyHolder = null;
                        }
                    }
                    previousValue = valueStr;
                });
                cardkeyvalue = cardkeyHolder;
            }
            if (dataChanged[keyFieldName]) {
                if (bindfunctionname) {
                    if (window[bindfunctionname]) {
                        window[bindfunctionname](cardType, cardTypeDetail, cardkeyvalue, cardDiv);
                    }
                }
                if (cardkeyvalue || !parentFieldPath || parentFieldPath.indexOf("Insights") > -1 || parentFieldPath.indexOf("Internal") > -1) {
                    if (businessobject) {
                        var keyData = "";
                        if (InteropHolder_2.viewModel && InteropHolder_2.viewModel.Fields && InteropHolder_2.viewModel.Fields.SYSPROKeyData) {
                            keyData = JSON.stringify(InteropHolder_2.viewModel.Fields.SYSPROKeyData);
                        }
                        InteropHolder_2.queryForCard(cardType, cardTypeDetail, cardkeyvalue, keyData, function (result) {
                            try {
                                if (jQuery.contains(document.documentElement, cardDiv[0])) {
                                    var boundCard = kendo.observable(result);
                                    kendo.bind(cardDiv, boundCard);
                                    queryLayoutUIHelpers.initializeExpandableCards(cardDiv[0]);
                                    if (afterbindfunctionname) {
                                        if (window[afterbindfunctionname]) {
                                            window[afterbindfunctionname](cardType, cardTypeDetail, cardkeyvalue, result, cardDiv);
                                        }
                                    }
                                }
                            }
                            catch (ex) {
                                InteropHolder_2.handleError(ex.message, "bindGenericCard binding callback");
                            }
                        }, function (result) {
                            try {
                                if (result.ErrorMessage.indexOf("' not found") < 0) {
                                    InteropHolder_2.handleError(result.ErrorMessage, "CleanError");
                                }
                                else {
                                    console.log(result.ErrorMessage);
                                }
                            }
                            catch (ex) {
                                InteropHolder_2.handleError(ex.message, "Displaying Error");
                            }
                        });
                    }
                }
            }
        }
        catch (ex) {
            this.handleError(ex.message, "bindGenericCard ");
        }
    };
    SYSPROInteropClass.prototype.bindTiles = function (itemOut, selectorItem, prefixSelector, fullBind) {
        var listOfTiles = [];
        var listOfTileParameters = {};
        var listOfTilesTypes = {};
        var listOfMLTiles = [];
        var listOfMLTileParameters = {};
        var listOfMLTilesTypes = {};
        var oneTileFound = false;
        $.each($(prefixSelector + " .tile:visible", selectorItem), function (index) {
            var tileTypeName = this.getAttribute("data-tiletypename");
            var tileName = this.getAttribute("data-tiletypedetail");
            var parentfieldpath = this.getAttribute("data-parentfieldpath");
            var tileType = this.getAttribute("data-tiletype");
            oneTileFound = true;
            var tileparameters = this.getAttribute("data-tileparameters");
            var KeyValue = null;
            if (tileType !== "Program" && tileName && listOfTiles.indexOf(tileName) === -1) {
                if (parentfieldpath) {
                    KeyValue = itemOut.Fields.SYSPROKeyData[parentfieldpath];
                }
                if (KeyValue || KeyValue === "" || !parentfieldpath || fullBind || (!KeyValue && parentfieldpath && tileparameters && tileparameters.indexOf("\"" + parentfieldpath + "\"") > -1)) {
                    var stillBind = true;
                    if ((!KeyValue && parentfieldpath && tileparameters && tileparameters.indexOf("\"" + parentfieldpath + "\"") > -1)) {
                        try {
                            var parametersManual = JSON.parse(tileparameters);
                            if (!parametersManual[parentfieldpath]) {
                                stillBind = false;
                            }
                        }
                        catch (e) {
                            stillBind = false;
                        }
                        if (!this.getAttribute("data-boundonce")) {
                            stillBind = true;
                        }
                    }
                    if (!parentfieldpath) {
                        if (this.getAttribute("data-boundonce")) {
                            stillBind = false;
                        }
                    }
                    if (tileType && tileType.indexOf("ML") === 0) {
                        $.each(itemOut.Fields.SYSPROKeyData, function (key, value) {
                            if (key && tileparameters && tileparameters.indexOf("\"" + key + "\"") > -1) {
                                stillBind = true;
                            }
                        });
                    }
                    this.setAttribute("data-boundonce", "true");
                    if (stillBind) {
                        if (tileType && tileType.indexOf("ML") === 0) {
                            listOfMLTiles.push(tileName);
                            listOfMLTilesTypes[tileName] = tileTypeName;
                            listOfMLTileParameters[tileName] = tileparameters;
                        }
                        else {
                            listOfTiles.push(tileName);
                            listOfTilesTypes[tileName] = tileTypeName;
                            listOfTileParameters[tileName] = tileparameters;
                        }
                        $(".tile-loading-cover", $(this)).show();
                    }
                }
            }
        });
        var regularTilesBound = this.performTileDataBind(listOfTiles, itemOut, listOfTileParameters, listOfTilesTypes, "COMQTL", prefixSelector, selectorItem);
        var mlTilesBound = this.performTileDataBind(listOfMLTiles, itemOut, listOfMLTileParameters, listOfMLTilesTypes, "SYSPROML", prefixSelector, selectorItem);
        if (!regularTilesBound && !mlTilesBound) {
            if (oneTileFound) {
                this.sizeTiles(0, null);
            }
        }
    };
    SYSPROInteropClass.prototype.performTileDataBind = function (listOfTiles, itemOut, listOfTileParameters, listOfTilesTypes, businessObject, prefixSelector, selectorItem) {
        var InteropHolder = this;
        if (listOfTiles.length > 0) {
            var keyData = {};
            if (InteropHolder.viewModel && InteropHolder.viewModel.Fields && InteropHolder.viewModel.Fields.SYSPROKeyData) {
                keyData = InteropHolder.viewModel.Fields.SYSPROKeyData.toJSON();
            }
            InteropHolder.queryForTiles(listOfTiles, keyData, businessObject, listOfTileParameters, listOfTilesTypes, function (result) {
                if (result.Query) {
                    $.each(result.Query, function (index2) {
                        if (this.Type === "Chart_Bullet" && !$.isArray(this.Value)) {
                            this.Value = [this.Value];
                        }
                        if (this.Type.indexOf("Chart") === 0) {
                            if (this.Value === undefined) {
                                this.Value = [0];
                            }
                        }
                    });
                }
                var TilesInput = kendo.observable(result);
                $.each($(prefixSelector + " .tile:visible", selectorItem), function (index) {
                    if (listOfTiles.indexOf(this.getAttribute("data-tiletypedetail")) >= 0) {
                        if (jQuery.contains(document.documentElement, this)) {
                            kendo.bind($(this), TilesInput);
                        }
                        $(".tile-loading-cover", $(this)).hide();
                    }
                });
                console.log("---------------------------------------------------------------------resizeSparklines Tiles");
                InteropHolder.resizeSparklines($(prefixSelector + " .tile:visible", selectorItem));
                InteropHolder.sizeTiles(0, null);
                if ( sysproInterop.gridStackActive && $(selectorItem).closest('.collapse').length ) {
                    const gridStackId = $(selectorItem).closest('.grid-stack').attr('data-grid-id');
                    const gridStackWidget = $(selectorItem).closest('.grid-stack-item')[0];
                    const height = $(selectorItem).closest('.collapse').actual('outerHeight', { includeMargin: true }) + 45;
                    resizeGridStackItem(gridStackId, gridStackWidget, height, false);
                  }
            }, function (result) {
                try {
                    $.each($(prefixSelector + " .tile:visible", selectorItem), function (index) {
                        if (listOfTiles.indexOf(this.getAttribute("data-tiletypedetail")) >= 0) {
                            $(".tile-loading-cover", $(this)).hide();
                            $('.tile-title:contains("Loading...")', $(this)).text("Load failed");
                        }
                    });
                    InteropHolder.handleError(result.ErrorMessage, "CleanError");
                }
                catch (ex) {
                    InteropHolder.handleError(ex.message, "Displaying Error");
                }
            });
            return true;
        }
        else {
            return false;
        }
    };
    SYSPROInteropClass.prototype.sizeTiles = function (delay, prefix) {
        var interopHelper = this;
        queryLayoutUIHelpers.tilesCreated.forEach(function (value, index) {
            value.packery("layout");
        });
        $('.tile-widget').each(function (index) {
            var tileWidget = $(this);
            tileWidget
                .parents('.tile-widget-wrapper')
                .find('.tile-loading-cover')
                .hide();
        });
        fitty('.small-tile .valueIconWrapper .tile-main-value', {
            minSize: 16,
            maxSize: 20.5,
            multiLine: false
        });
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
            $(titleElement).css("height", targetHeight + "px");
            $(titleElement).addClass("show-more-icon");
            $(titleElement).hover(function () {
                $(titleElement).removeClass("show-more-icon");
                $(titleElement).animate({ height: $(titleElement).get(0).scrollHeight }, 120);
            }, function () {
                $(titleElement).animate({ height: targetHeight }, 60);
                $(titleElement).addClass("show-more-icon");
            });
        }
        ;
        $(".small-tile .tile-title:visible").each(function () {
            var that = this;
            if ($(that).get(0).scrollHeight > 33 && ($(that).siblings(".tile-subtitle").text().length > 0 || $(that).closest('.ai-tile-icon-title').siblings(".tile-subtitle").text().length > 0)) {
                sizeTileTitles(that, 32);
            }
            else if ($(that).get(0).scrollHeight > 46 && ($(that).siblings(".tile-subtitle").text().length === 0 || $(that).closest('.ai-tile-icon-title').siblings(".tile-subtitle").text().length === 0)) {
                sizeTileTitles(that, 45);
            }
        });
        $(".wide-tile .tile-title:visible").each(function () {
            var that = this;
            if ($(that).get(0).scrollHeight > 40 && ($(that).siblings(".tile-subtitle").text().length > 0 || $(that).closest('.ai-tile-icon-title').siblings(".tile-subtitle").text().length > 0)) {
                sizeTileTitles(that, 39);
            }
            else if ($(that).get(0).scrollHeight > 40 && ($(that).siblings(".tile-subtitle").text().length === 0 || $(that).closest('.ai-tile-icon-title').siblings(".tile-subtitle").text().length === 0)) {
                sizeTileTitles(that, 39);
            }
        });
    };
    SYSPROInteropClass.prototype.sizeTilesCallback = function (no_error, msg) {
        if (no_error) {
            this.sizeTiles(null, null);
        }
        else {
            this.showErrorMessage(msg, "sizeTilesCallback");
        }
    };
    SYSPROInteropClass.prototype.setTheme = function (e) {
        if (e && $(e).data("themename") && !$(e).hasClass("sys-fg-success")) {
            var themeName = $(e).data("themename");
            this.selectedThemeChecked(themeName);
            localStorage.setItem("avanticurrentuserthemename", themeName);
            this.activateTheme();
        }
    };
    SYSPROInteropClass.prototype.selectedThemeChecked = function (themeName) {
        var itemNode = $(".avant-theme-switch[data-themename='" + themeName + "']");
        $("i", itemNode).removeClass("sys-fg-white");
        $("i", itemNode).addClass("sys-fg-success");
        $.each($(itemNode).closest("li").siblings(), function (index) {
            $("i", this).removeClass("sys-fg-success");
            $("i", this).removeClass("sys-fg-white").addClass("sys-fg-white");
        });
    };
    SYSPROInteropClass.prototype.activateTheme = function () {
        if (localStorage.getItem("avanticurrentuserthemename")) {
            var themeName = localStorage.getItem("avanticurrentuserthemename");
            $("body").attr("data-theme", themeName);
            this.selectedThemeChecked(themeName);
        }
    };
    SYSPROInteropClass.prototype.initiateExistingTiles = function () {
        $('.tile-widget').each(function (i) {
            $(this).parents('.layout-widget').find(".data-section").removeClass("data-section");
            $(this).parents('.layout-widget').children(".col-sm-12").addClass("tile-widget-wrapper");
            $(this).parents('.layout-widget').find(".panel-body").first().prepend('<div class="tile-loading-cover"><div class="loader"><div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div></div>');
        });
    };
    SYSPROInteropClass.prototype.resizeSparklines = function (container) {
        try {
            var interopHolder_1 = this;
            $.each($(".sparkline-widget-chart:visible", container), function (index) {
                var chartSelected = $(this);
                if (chartSelected.data("kendoChart")) {
                    var chartItem = chartSelected.data("kendoChart");
                    var width = chartSelected.parent().width(), stepSize = 1;
                    if (width <= 80) {
                        stepSize = 8;
                    }
                    else if (width <= 160) {
                        stepSize = 4;
                    }
                    else if (width <= 320) {
                        stepSize = 2;
                    }
                    chartItem.setOptions({
                        categoryAxis: {
                            labels: {
                                step: stepSize
                            }
                        },
                    });
                    console.log("-------------------------------hideShowSparklineSeries from resizeSparklines");
                    interopHolder_1.hideShowSparklineSeries(chartSelected, chartItem);
                }
            });
        }
        catch (ex) {
            this.handleError(ex.message, "resizeSparklines");
        }
    };
    SYSPROInteropClass.prototype.rgbToHex = function (color) {
        color = "" + color;
        if (!color || color.indexOf("rgb") < 0) {
            return color;
        }
        if (color.charAt(0) == "#") {
            return color;
        }
        var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color), r = parseInt(nums[2], 10).toString(16), g = parseInt(nums[3], 10).toString(16), b = parseInt(nums[4], 10).toString(16);
        return "#" + ((r.length == 1 ? "0" + r : r) +
            (g.length == 1 ? "0" + g : g) +
            (b.length == 1 ? "0" + b : b));
    };
    SYSPROInteropClass.prototype.lightenDarkenColour = function (col, amt) {
        col = this.rgbToHex(col);
        var usePound = false;
        if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
        }
        var num = parseInt(col, 16);
        var r = (num >> 16) + amt;
        if (r > 255) {
            r = 255;
        }
        else if (r < 0) {
            r = 0;
        }
        var b = ((num >> 8) & 0x00FF) + amt;
        if (b > 255) {
            b = 255;
        }
        else if (b < 0) {
            b = 0;
        }
        var g = (num & 0x0000FF) + amt;
        if (g > 255) {
            g = 255;
        }
        else if (g < 0) {
            g = 0;
        }
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    };
    SYSPROInteropClass.prototype.hideShowSparklineSeries = function (sparklineContainer, chart) {
        try {
            var refreshrequired = true;
            if (sparklineContainer && sparklineContainer.length > 0) {
                if (!chart) {
                    refreshrequired = false;
                    chart = sparklineContainer.data("kendoChart");
                }
                if (!chart) {
                    kendo.bind(sparklineContainer.closest(".layout-widget"), this.viewModel);
                    chart = sparklineContainer.data("kendoChart");
                }
                if (chart) {
                    if (sparklineContainer.closest(".sparkline-widget").length > 0) {
                        var sparklineWidget = sparklineContainer.closest(".sparkline-widget")[0];
                        var series1visible = sparklineWidget.getAttribute("data-series1visible") === "true";
                        var series2visible = sparklineWidget.getAttribute("data-series2visible") === "true";
                        var series3visible = sparklineWidget.getAttribute("data-series3visible") === "true";
                        var series4visible = sparklineWidget.getAttribute("data-series4visible") === "true";
                        var series1name = sparklineWidget.getAttribute("data-series1name");
                        var series2name = sparklineWidget.getAttribute("data-series2name");
                        var series3name = sparklineWidget.getAttribute("data-series3name");
                        var series4name = sparklineWidget.getAttribute("data-series4name");
                        if (chart.options.series[0])
                            chart.options.series[0].visible = series1visible,
                                chart.options.series[0].visibleInLegend = series1visible;
                        if (chart.options.series[1])
                            chart.options.series[1].visible = series2visible,
                                chart.options.series[1].visibleInLegend = series2visible;
                        if (chart.options.series[2])
                            chart.options.series[2].visible = series3visible,
                                chart.options.series[2].visibleInLegend = series3visible;
                        if (chart.options.series[3])
                            chart.options.series[3].visible = series4visible,
                                chart.options.series[3].visibleInLegend = series4visible;
                        if (chart.options.series[0].type === "rangeBar") {
                            var max = 10;
                            $.each(chart.dataSource.data(), function (index) {
                                if (this) {
                                    if (parseFloat(this.Series1Value) > max) {
                                        max = parseFloat(this.Series1Value);
                                    }
                                    if (parseFloat(this.Series1ValueTo) > max) {
                                        max = parseFloat(this.Series1ValueTo);
                                    }
                                    if (parseFloat(this.Series2Value) > max) {
                                        max = parseFloat(this.Series2Value);
                                    }
                                    if (parseFloat(this.Series2ValueTo) > max) {
                                        max = parseFloat(this.Series2ValueTo);
                                    }
                                    if (parseFloat(this.Series3Value) > max) {
                                        max = parseFloat(this.Series3Value);
                                    }
                                    if (parseFloat(this.Series3ValueTo) > max) {
                                        max = parseFloat(this.Series3ValueTo);
                                    }
                                    if (parseFloat(this.Series4Value) > max) {
                                        max = parseFloat(this.Series4Value);
                                    }
                                    if (parseFloat(this.Series4ValueTo) > max) {
                                        max = parseFloat(this.Series4ValueTo);
                                    }
                                }
                            });
                            chart.options.valueAxis.max = max;
                        }
                        if (series1name && series1name !== undefined && series1name !== 'null' && series1name !== 'undefined' && chart.options.series[0])
                            chart.options.series[0].caption = series1name;
                        if (series2name && series2name !== undefined && series2name !== 'null' && series2name !== 'undefined' && chart.options.series[1])
                            chart.options.series[1].caption = series2name;
                        if (series3name && series3name !== undefined && series3name !== 'null' && series3name !== 'undefined' && chart.options.series[2])
                            chart.options.series[2].caption = series3name;
                        if (series4name && series4name !== undefined && series4name !== 'null' && series4name !== 'undefined' && chart.options.series[3])
                            chart.options.series[3].caption = series4name;
                        if (sparklineWidget.getAttribute("data-charttitlevisible") === "true")
                            chart.options.title.visible = true;
                        else
                            chart.options.title.visible = false;
                        chart.options.title.text = sparklineWidget.getAttribute("data-charttitletext");
                        if (sparklineWidget.getAttribute("data-chartxaxistitle") && sparklineWidget.getAttribute("data-chartxaxistitle") !== 'null' && sparklineWidget.getAttribute("data-chartxaxistitle") !== 'undefined') {
                            chart.options.categoryAxis.title.text = sparklineWidget.getAttribute("data-chartxaxistitle");
                        }
                        if (sparklineWidget.getAttribute("data-chartyaxistitle") && sparklineWidget.getAttribute("data-chartyaxistitle") !== 'null' && sparklineWidget.getAttribute("data-chartyaxistitle") !== 'undefined') {
                            chart.options.valueAxis.title.text = sparklineWidget.getAttribute("data-chartyaxistitle");
                        }
                    }
                    var tileParent = sparklineContainer.closest(".tile-sparkline");
                    if (tileParent.length > 0) {
                        var proposedHeight = tileParent.height();
                        if (tileParent.parents(".small-tile").length > 0) {
                            proposedHeight = tileParent.closest(".tile-bottom-half").height() - tileParent.siblings(".valueIconWrapper").height();
                        }
                        chart.options.chartArea.height = proposedHeight;
                    }
                    var tileInner = sparklineContainer.closest(".tile-inner");
                    if (tileInner.length > 0) {
                        var colorIn = tileInner.css("background-color");
                        chart.options.chartArea.background = colorIn;
                        var axesColor = this.lightenDarkenColour(colorIn, 50);
                        colorIn = tileInner.css("color");
                        chart.options.seriesColors = [colorIn];
                        if (chart.options.series[0]) {
                            chart.options.series[0].color = colorIn;
                        }
                        if (chart.options.categoryAxis) {
                            chart.options.categoryAxis.color = axesColor;
                            if (chart.options.categoryAxis.line)
                                chart.options.categoryAxis.line.color = axesColor;
                            if (chart.options.categoryAxis.labels)
                                chart.options.categoryAxis.labels.color = axesColor;
                        }
                        if (chart.options.valueAxis) {
                            chart.options.valueAxis.color = axesColor;
                            if (chart.options.valueAxis.line)
                                chart.options.valueAxis.line.color = axesColor;
                            if (chart.options.valueAxis.labels)
                                chart.options.valueAxis.labels.color = axesColor;
                        }
                        if (chart.options.legend) {
                            chart.options.legend.labels.color = colorIn;
                        }
                    }
                    if ($("body").attr("data-theme") === "dark" && !sparklineContainer.data("themesetup")) {
                        sparklineContainer.data("themesetup", true);
                        var chartOptions = chart.options;
                        var foregroundColor = $(".fusion-main-page-buttons").css("color");
                        var backgroundColor = $(".column-parent>.panel").css("background-color");
                        chartOptions.chartArea.background = backgroundColor;
                        chartOptions.axisDefaults.color = foregroundColor;
                        chartOptions.valueAxis.color = foregroundColor;
                        chartOptions.categoryAxis.color = foregroundColor;
                        chartOptions.categoryAxis.labels.color = foregroundColor;
                        chartOptions.valueAxis.labels.color = foregroundColor;
                        chartOptions.valueAxis.line.color = foregroundColor;
                        chartOptions.categoryAxis.line.color = foregroundColor;
                        chartOptions.valueAxis.title.color = foregroundColor;
                        chartOptions.categoryAxis.title.color = foregroundColor;
                        chart.setOptions(chartOptions);
                    }
                    if (refreshrequired) {
                        chart.refresh();
                    }
                    else {
                        chart.redraw();
                    }
                }
            }
        }
        catch (ex) {
            console.log("hideShowSparklineSeries error - " + ex.message);
        }
    };
    SYSPROInteropClass.prototype.sparklineSeriesClick = function (e) {
        try {
            this.eventTrigged(e.series.name, e.series.data.indexOf(e.dataItem), e.value, "", "sparklineSeriesClick", function (e) { }, function (e) { });
        }
        catch (ex) {
            this.handleError(ex.message, "sparklineSeriesClick");
        }
    };
    SYSPROInteropClass.prototype.iconSelected = function (e) {
        try {
            this.eventTrigged(e.Name, e.Description, "", "", "iconSelected", function (e) { }, function (e) { });
        }
        catch (ex) {
            this.handleError(ex.message, "iconSelected");
        }
    };
    SYSPROInteropClass.prototype.clipboardCommandCalled = function (commandName) {
        try {
            this.eventTrigged(commandName, "", "", "", "clipboardCommandCalled", function (e) { }, function (e) { });
        }
        catch (ex) {
            this.handleError(ex.message, "clipboardCommandCalled");
        }
    };
    SYSPROInteropClass.prototype.createKendoBinders = function () {
        var InteropHolder = this;
        kendo.data["binders"].tilecolor = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["tilecolor"].get();
                if (value) {
                    $(that.element).closest(".tile-inner")[0].style.backgroundColor = value;
                    var classtobackup = "";
                    $.each($(that.element).closest(".tile-inner")[0].classList, function (index) {
                        if (this.indexOf("sys-bg-") === 0) {
                            classtobackup = this;
                        }
                    });
                    if (classtobackup) {
                        $(that.element).closest(".tile-inner")[0].classList.remove(classtobackup);
                        $(that.element).closest(".tile-inner")[0].setAttribute("data-previoustilecolor", classtobackup);
                    }
                }
                else {
                    if ($(that.element).closest(".tile-inner")[0].getAttribute("data-previoustilecolor"))
                        $(that.element).closest(".tile-inner")[0].classList.add($(that.element).closest(".tile-inner")[0].getAttribute("data-previoustilecolor"));
                }
            }
        });
        kendo.data["binders"].tileiconcolor = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["tileiconcolor"].get();
                if (value) {
                    if (!that.element.getAttribute("previoustileiconcolor")) {
                        that.element.setAttribute("previoustileiconcolor", $(that.element).css("color"));
                    }
                    $(that.element).css("color", value);
                }
                else {
                    var tileiconin = that.element.getAttribute("previoustileiconcolor");
                    if (tileiconin)
                        $(that.element).css("color", tileiconin);
                }
            }
        });
        kendo.data["binders"].tileicon = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["tileicon"].get();
                if (value) {
                    if (!that.element.getAttribute("previoustileicon")) {
                        that.element.setAttribute("previoustileicon", $(that.element).html());
                    }
                    $(that.element).html(value);
                }
                else {
                    var tileiconin = that.element.getAttribute("previoustileicon");
                    if (tileiconin)
                        $(that.element).html(tileiconin);
                }
            }
        });
        kendo.data["binders"].htmltextnonull = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["htmltextnonull"].get();
                if (value || value === "") {
                    $(that.element).html(value);
                }
            }
        });
        kendo.data["binders"].htmltext = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["htmltext"].get();
                if (!value)
                    value = "";
                if ($(that.element).hasClass("syspro-entryfield-description")) {
                    if (value.trim() === "") {
                        $(that.element).removeClass("always-show");
                    }
                    else {
                        $(that.element).addClass("always-show");
                        $(that.element).prev(".syspro-entryfield-tooltip").remove();
                    }
                }
                if ($(that.element).hasClass("syspro-help-block")) {
                    var currentDiv = $(that.element);
                    if (value.trim().length === 0) {
                        currentDiv.addClass("disabled-help-block");
                        currentDiv.removeClass("always-show");
                    }
                    else {
                        currentDiv.removeClass("disabled-help-block");
                        currentDiv.addClass("always-show");
                    }
                }
                if ($(that.element).hasClass("avanti-email-smarttag")) {
                    var parentAnchor = $(that.element).closest("a.avanti-email-smarttag");
                    if (parentAnchor.length > 0) {
                        parentAnchor[0].href = "mailto:" + value;
                        parentAnchor[0].onclick = function () { sysproInterop.ignoreUnload = true; };
                    }
                }
                $(that.element).html(value);
            }
        });
        kendo.data["binders"].inputmask = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["inputmask"].get();
                if (!value)
                    value = "";
                if ($(that.element).hasClass("syspro-numeric-input")) {
                    if (value) {
                        if (that.element.getAttribute("data-inputmask") && !InteropHolder.numericMasking)
                            InteropHolder.numericMasking = that.element.getAttribute("data-inputmask");
                        that.element.setAttribute("data-inputmask", "");
                        that.element.setAttribute("data-inputmask-mask", value);
                        that.element.setAttribute("data-inputmask-greedy", "false");
                        that.element.setAttribute("data-inputmask-insertmode", "false");
                        that.element.setAttribute("data-inputmask-allowminus", "true");
                        that.element.setAttribute("data-inputmask-escapechar", InteropHolder.inputMaskEscapeChar);
                    }
                    else {
                        if (!that.element.getAttribute("data-inputmask")) {
                            that.element.setAttribute("data-inputmask", InteropHolder.numericMasking);
                            that.element.removeAttribute("data-inputmask-mask");
                            that.element.removeAttribute("data-inputmask-greedy");
                            that.element.removeAttribute("data-inputmask-insertmode");
                            that.element.removeAttribute("data-inputmask-allowminus");
                            that.element.removeAttribute("data-inputmask-escapechar");
                        }
                    }
                }
                else {
                    that.element.setAttribute("data-inputmask-mask", value);
                }
                if ($(that.element).inputmask) {
                    $(that.element).inputmask('remove');
                }
                if (value || $(that.element).hasClass("syspro-numeric-input")) {
                    Inputmask().mask(that.element);
                    $(that.element).focus(function (e) {
                        setTimeout(function () {
                            $(that.element).select();
                        }, 10);
                    });
                }
            }
        });
        kendo.data["binders"].entryfieldevents = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["entryfieldevents"].get();
                if (!value)
                    value = "";
                that.element.setAttribute("data-entryfieldevents", value);
                if (that.element.classList.contains("avanti-data-bound-div")) {
                    if ($(that.element).siblings(".avanti-data-bound-target").length > 0) {
                        $(that.element).siblings(".avanti-data-bound-target")[0].setAttribute("data-entryfieldevents", value);
                    }
                }
            }
        });
        kendo.data["binders"].linelength = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["linelength"].get();
                if (value) {
                    var maxLength = parseInt(value);
                    if (!that.element.getAttribute("linelengthset")) {
                        that.element.setAttribute("linelengthset", maxLength);
                        $(that.element).on('input focus keydown keyup', function () {
                            var text = $(this).val();
                            var lines = text.split("\n");
                            var linesout = [];
                            for (var i = 0; i < lines.length; i++) {
                                while (lines[i].length > maxLength) {
                                    var linetoadd = lines[i].substring(0, maxLength);
                                    linesout.push(linetoadd);
                                    lines[i] = lines[i].substring(maxLength);
                                }
                                linesout.push(lines[i]);
                            }
                            $(this).val(linesout.join("\n"));
                        });
                    }
                }
            }
        });
        kendo.data["binders"].decimals = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["decimals"].get();
                if (value && value !== 0 && value !== "0") {
                    that.element.setAttribute("data-inputmask-digits", value);
                    that.element.setAttribute("data-inputmask-digitsOptional", false);
                }
                else {
                    that.element.setAttribute("data-inputmask-digitsOptional", true);
                }
            }
        });
        kendo.data["binders"].datevalue = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["datevalue"].get();
                if (value) {
                    var dateValue = kendo.parseDate(value, "yyyy-MM-dd");
                    InteropHolder.autoDateChange = true;
                    $(that.element).closest(".date").datepicker("setDate", dateValue);
                }
            }
        });
        kendo.data["binders"].widget.hexColor = kendo.data.Binder.extend({
            init: function (widget, bindings, options) {
                kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
                this.widget = widget;
                this._change = $.proxy(this.change, this);
                this.widget.first("change", this._change);
                this._initChange = false;
            },
            refresh: function () {
                if (!this._initChange) {
                    var value = this.bindings.hexColor.get();
                    if (value) {
                        var hex = InteropHolder.rgbaToHex(value);
                        this.widget.value(hex);
                    }
                }
            },
            change: function () {
                var that = this;
                var value = that.widget.value();
                var toRgb = InteropHolder.hexToRgbA(value);
                that._initChange = true;
                try {
                    that.bindings["hexColor"].set(toRgb);
                }
                catch (_a) { }
                that._initChange = false;
            }
        });
        kendo.data["binders"].ignorethousandseperators = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["ignorethousandseperators"].get();
                if (value) {
                    that.element.setAttribute("data-inputmask-groupSeparator", "");
                }
                else {
                    that.element.setAttribute("data-inputmask-groupSeparator", that.element.getAttribute("data-groupseparator"));
                }
            }
        });
        kendo.data["binders"].predictivesearch = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["predictivesearch"].get();
                if (value && value !== "ignore") {
                    InteropHolder.initializePredictiveSearch($(that.element), value);
                }
            }
        });
        kendo.data["binders"].comboboxvalue = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["comboboxvalue"].get();
                if (!value) {
                    $("input.combobox", $(that.element).closest(".form-group")).val("");
                }
                else {
                    if (that.element && that.element.classList.contains('syspro-combobox-inform')) {
                        var optionFound = false;
                        if (that.element.options) {
                            for (var i = 0; i < that.element.options.length; i++) {
                                if (that.element.options[i].value === value) {
                                    optionFound = true;
                                    break;
                                }
                            }
                        }
                        if (!optionFound) {
                            $("input.combobox", $(that.element).closest(".form-group")).val(value);
                        }
                    }
                }
            }
        });
        kendo.data["binders"].entryvalue = kendo.data.Binder.extend({
            init: function (element, bindings, options) {
                kendo.data.Binder.fn.init.call(this, element, bindings, options);
                var that = this;
                $(that.element).on("change", function () {
                    that.change();
                });
            },
            refresh: function () {
                var that = this, value = that.bindings["entryvalue"].get();
                if (value) {
                    var decodedValue = $("<textarea/>").html(value).text();
                    that.element.value = decodedValue;
                }
                else {
                    that.element.value = "";
                }
            },
            change: function () {
                var value = this.element.value;
                this.bindings["entryvalue"].set(value);
            }
        });
        kendo.data["binders"].includebuttons = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["includebuttons"].get();
                var richtextwidget = $(that.element);
                if (value !== undefined) {
                    if (value && value.indexOf("save") > -1) {
                        $(".syspro-richtext-save-button", richtextwidget).show();
                    }
                    else {
                        $(".syspro-richtext-save-button", richtextwidget).hide();
                    }
                    if (value && value.indexOf("refresh") > -1) {
                        $(".syspro-richtext-refresh-button", richtextwidget).show();
                    }
                    else {
                        $(".syspro-richtext-refresh-button", richtextwidget).hide();
                    }
                }
            }
        });
        kendo.data["binders"].isreadonlyrichtext = kendo.data.Binder.extend({
            refresh: function () {
                var that = this, value = that.bindings["isreadonlyrichtext"].get();
                if (value !== undefined) {
                    {
                        if (!value || value === "false")
                            value = null;
                        var richtextwidget = $(that.element);
                        if (value) {
                            if (!$(".avanti-richtextwidget-textholder", richtextwidget).data("kendoEditor")) {
                                $(".avanti-richtextwidget-textholder", richtextwidget).data("disableoninitialize", "true");
                            }
                            else {
                                $(".avanti-richtextwidget-textholder", richtextwidget).attr("disabled", "disabled");
                                $(".avanti-richtextwidget-textholder", richtextwidget).attr("contenteditable", "false");
                                $(".syspro-richtext-insertdate-button", richtextwidget).addClass("disabled");
                                $(".syspro-richtext-refresh-button", richtextwidget).addClass("disabled");
                                $(".syspro-richtext-save-button", richtextwidget).addClass("disabled");
                            }
                        }
                        else {
                            $(".avanti-richtextwidget-textholder", richtextwidget).removeAttr("disabled");
                            $(".avanti-richtextwidget-textholder", richtextwidget).attr("contenteditable", "true");
                            $(".syspro-richtext-insertdate-button", richtextwidget).removeClass("disabled");
                            $(".syspro-richtext-refresh-button", richtextwidget).removeClass("disabled");
                            $(".syspro-richtext-save-button", richtextwidget).removeClass("disabled");
                        }
                    }
                }
            }
        });
    };
    SYSPROInteropClass.prototype.hexToRgbA = function (hex) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
        }
        throw new Error('Bad Hex');
    };
    SYSPROInteropClass.prototype.trim = function (str) {
        return str.replace(/^\s+|\s+$/gm, '');
    };
    SYSPROInteropClass.prototype.rgbaToHex = function (rgba) {
        if (rgba) {
            if (rgba.charAt(0) == "#") {
                return rgba;
            }
            if (rgba.indexOf(",") < 0)
                return null;
            var parts = rgba.split(","), r = parseInt(this.trim(parts[0]), 10), g = parseInt(this.trim(parts[1]), 10), b = parseInt(this.trim(parts[2]), 10);
            if (r > 255) {
                r = 255;
            }
            if (g > 255) {
                g = 255;
            }
            if (b > 255) {
                b = 255;
            }
            var rH = r.toString(16);
            var gH = g.toString(16);
            var bH = b.toString(16);
            return "#" + ((rH.length == 1 ? "0" + rH : rH) +
                (gH.length == 1 ? "0" + gH : gH) +
                (bH.length == 1 ? "0" + bH : bH));
        }
    };
    SYSPROInteropClass.prototype.updateSYSPROKeyDataFromElementChange = function (elementIn, valueIn) {
        if (elementIn.hasClass("predictive-search-initialized")) {
            var predictiveSearchKeyField = elementIn.data("predictivesearch");
            if (predictiveSearchKeyField && valueIn && this.viewModel && this.viewModel.Fields) {
                if (predictiveSearchKeyField.indexOf("Conversion") === 0) {
                    predictiveSearchKeyField = predictiveSearchKeyField.replace("Conversion", "");
                }
                if (!this.viewModel.Fields.SYSPROKeyData[predictiveSearchKeyField]) {
                    this.viewModel.Fields.SYSPROKeyData[predictiveSearchKeyField] = {};
                }
                this.viewModel.Fields.SYSPROKeyData[predictiveSearchKeyField].Value = valueIn;
            }
        }
    };
    SYSPROInteropClass.prototype.initializePredictiveSearch = function (elementIn, predictiveSearchGiven) {
        try {
            var InteropHolder_3 = this;
            elementIn.data("predictivesearch", predictiveSearchGiven);
            var predictivesearchName = predictiveSearchGiven;
            var predictivesearchElement = elementIn;
            if (!elementIn.hasClass("predictive-search-initialized")) {
                var modalIdIn = "";
                $(".syspro-browse-button-container", $(elementIn).closest(".form-group")).show();
                if (elementIn.closest(".modal-window-main").length > 0) {
                    modalIdIn = elementIn.closest(".modal-window-main").attr("id");
                }
                elementIn.addClass("predictive-search-initialized");
                elementIn.textcomplete([{
                        match: /(.+)$/,
                        search: function (term, callback) {
                            elementIn.siblings('.spinner').show();
                            if (!term || (term && term.trim() === "")) {
                                callback([]);
                                elementIn.siblings('.spinner').hide();
                                return;
                            }
                            if (InteropHolder_3.predictiveSearchCache[term]) {
                                callback(InteropHolder_3.predictiveSearchCache[term]);
                                elementIn.siblings('.spinner').hide();
                            }
                            console.log("search performed: " + term);
                            if (InteropHolder_3.typingElement !== predictivesearchElement) {
                                console.log("Setting sysproInterop.typingOperation new typing ele false");
                                InteropHolder_3.typingOperation = false;
                                console.log("TP: " + InteropHolder_3.typingOperation);
                            }
                            InteropHolder_3.typingElement = predictivesearchElement;
                            var indexSelected = 0;
                            if (predictivesearchElement && predictivesearchElement.length > 0)
                                indexSelected = predictivesearchElement[0].selectionStart;
                            console.log("Index in Predictive Search: " + predictivesearchElement[0].selectionStart);
                            InteropHolder_3.performPredictiveSearch(predictivesearchName, term, function (result) {
                                InteropHolder_3.predictiveSearchCache[term] = result;
                                console.log("Showing results: " + InteropHolder_3.typingOperation);
                                if ((InteropHolder_3.typingElement && !InteropHolder_3.typingElement.is(":focus")) || sysproInterop.typingOperation) {
                                    result = [];
                                }
                                if (elementIn && elementIn.length > 0 && document.contains(elementIn[0])) {
                                    callback(result);
                                    elementIn.siblings('.spinner').hide();
                                }
                                else {
                                    if (elementIn) {
                                        callback([]);
                                        elementIn.siblings('.spinner').hide();
                                    }
                                }
                            }, function (e) {
                                InteropHolder_3.typingInterval = false;
                                InteropHolder_3.showErrorMessage(e.ErrorMessage, "Error performing predictive search");
                                callback([]);
                                elementIn.siblings('.spinner').hide();
                            }, indexSelected);
                        },
                        index: 1,
                        template: function (rootItem, searchQuery) {
                            setTimeout(function () {
                                var setupActivate = function () {
                                    InteropHolder_3.predictiveSearchActive = true;
                                };
                                var setupDeactivate = function () {
                                    InteropHolder_3.predictiveSearchActive = false;
                                };
                                $('.syspro-predictivesearch-container').off('mouseenter', setupActivate);
                                $('.syspro-predictivesearch-container').on('mouseenter', setupActivate);
                                $('.syspro-predictivesearch-container').off('mouseleave', setupDeactivate);
                                $('.syspro-predictivesearch-container').on('mouseleave', setupDeactivate);
                            }, 500);
                            var templateTest = WebView_Predictive_Search_Template(rootItem, searchQuery);
                            return templateTest;
                        },
                        replace: function (rootItem) {
                            if (InteropHolder_3.predictiveSearchActive || InteropHolder_3.isTouchDevice) {
                                return rootItem.Id;
                            }
                            else {
                                return;
                            }
                        },
                    }
                ], {
                    cache: true,
                    height: 200,
                    maxCount: 200,
                    debounce: 200,
                    zIndex: (InteropHolder_3.getModalsHighestZIndex() + 1),
                    dropdownClassName: "dropdown-menu textcomplete-dropdown syspro-field-search-dropdown " + modalIdIn,
                    onKeydown: function (e, commands) {
                        console.log("predictive Search onKeydown: " + e.keyCode);
                        if (e.keyCode === 38 || e.keyCode === 40) {
                            console.log("predictive search active");
                            InteropHolder_3.predictiveSearchActive = true;
                        }
                        else if (e.keyCode === 9) {
                            console.log("Setting sysproInterop.typingOperation e.keyCode === 9");
                            InteropHolder_3.typingOperation = true;
                            console.log("TP: " + InteropHolder_3.typingOperation);
                            return commands.KEY_ENTER;
                        }
                        else if (e.keyCode === 13) {
                            console.log("Setting sysproInterop.typingOperation e.keyCode === 13");
                            InteropHolder_3.typingOperation = true;
                            console.log("TP: " + InteropHolder_3.typingOperation);
                        }
                    }
                });
                elementIn.on('keydown', function (e) {
                    var keyCode = e.keyCode || e.which;
                    if (keyCode === 9 || keyCode === 13) {
                        console.log("Setting sysproInterop.typingOperation keydown 913");
                        InteropHolder_3.typingOperation = true;
                        console.log("TP: " + InteropHolder_3.typingOperation);
                    }
                    else {
                        console.log("predictive search inactive");
                        InteropHolder_3.predictiveSearchActive = false;
                        console.log("Setting sysproInterop.typingOperation typing other");
                        InteropHolder_3.typingOperation = false;
                        console.log("TP: " + InteropHolder_3.typingOperation);
                    }
                });
                if (InteropHolder_3.callLayerInterop.interopType === "SYSPRORehostedBrowser") {
                    elementIn.on('input', function () {
                        var textComplete = $(this).data('textComplete');
                        setTimeout(function () {
                            textComplete.trigger();
                        }, 100);
                    });
                }
            }
        }
        catch (ex) {
            this.handleError(ex.message, "initializePredictiveSearch");
        }
    };
    SYSPROInteropClass.prototype.showPopupDialog = function (dataIn) {
        var InteropHolder = this;
        InteropHolder.manualButtonDialogClosed = false;
        var buttonsIn = [];
        $.each(dataIn.Buttons, function (e) {
            var buttonId = this.ButtonId;
            var buttonNew = {
                text: this.Caption,
                primary: this.IsDefault,
                action: function (e) {
                    InteropHolder.popupDialogButtonClicked(e, buttonId);
                }
            };
            buttonsIn.push(buttonNew);
        });
        var popupHolder = $("#dialog").kendoDialog({
            width: "400px",
            title: dataIn.Title,
            closable: true,
            modal: true,
            content: dataIn.HtmlContent,
            actions: buttonsIn,
            open: function () {
                $.material.init();
                $(".k-overlay").addClass("dialog-overlay");
            },
            show: function (e) {
                if (e.sender && e.sender.element && e.sender.element.parent())
                    e.sender.element.parent().css('z-index', parseInt(InteropHolder.getModalsHighestZIndex().toString()) + 1);
            },
            close: function (e) {
                if (!InteropHolder.manualButtonDialogClosed) {
                    InteropHolder.popupDialogOpened = false;
                    var dialogClickedDiv = $("#dialog");
                    var DataOut = {
                        DialogId: $(".dialog-wrapper", dialogClickedDiv).attr("id"),
                        ButtonIdClicked: "CANCEL",
                        OptionIdSelected: "",
                        CheckBoxChecked: false
                    };
                    InteropHolder.eventTrigged(JSON.stringify(DataOut), "", "", "", "popupDialogButtonClicked", function (e) { }, function (e) { });
                }
                $(".k-overlay").removeClass("dialog-overlay");
            }
        });
        InteropHolder.popupDialogOpened = true;
        popupHolder.data("kendoDialog").open();
        if (InteropHolder.popupDialogOpened) {
            $(".k-overlay").addClass("dialog-overlay");
        }
    };
    SYSPROInteropClass.prototype.popupDialogButtonClicked = function (e, buttonId) {
        var dialogClickedDiv = null;
        var dialogClickedObject = null;
        var actionButtonClicked = false;
        if (buttonId) {
            this.manualButtonDialogClosed = true;
        }
        if (!buttonId && $(e).hasClass("dialoglink")) {
            dialogClickedDiv = $("#dialog");
            dialogClickedObject = dialogClickedDiv.data("kendoDialog");
            buttonId = $(e).data("buttonid");
            actionButtonClicked = true;
        }
        else {
            dialogClickedObject = e.sender;
            dialogClickedDiv = dialogClickedObject.element;
        }
        var optionId = "";
        if ($("input.dialog-option-radio:checked", dialogClickedDiv).length > 0)
            optionId = $("input.dialog-option-radio:checked", dialogClickedDiv).val();
        var checkboxChecked = false;
        if ($("input.dialog-option-checkbox:checked", dialogClickedDiv).length > 0)
            checkboxChecked = true;
        var textEntered = "";
        if ($("input.dialog-option-text", dialogClickedDiv).length > 0)
            textEntered = $("input.dialog-option-text", dialogClickedDiv).val();
        var DataOut = {
            DialogId: $(".dialog-wrapper", dialogClickedDiv).attr("id"),
            ButtonIdClicked: buttonId,
            OptionIdSelected: optionId,
            CheckBoxChecked: checkboxChecked,
            TextEntered: textEntered
        };
        this.eventTrigged(JSON.stringify(DataOut), "", "", "", "popupDialogButtonClicked", function (e) { }, function (e) { });
        if (actionButtonClicked) {
            this.manualButtonDialogClosed = true;
            dialogClickedObject.close();
        }
        this.popupDialogOpened = false;
    };
    SYSPROInteropClass.prototype.selectFileInternal = function (fileTypes) {
        try {
            var InteropHolder_4 = this;
            InteropHolder_4.selectFile(function (e) {
                InteropHolder_4.eventTrigged(JSON.stringify(e), "", "", "", "fileSelectedInternal", function (e) { }, function (e) { });
            }, function (ex) {
                InteropHolder_4.handleError(ex.message, "selectFileInternal");
                var outputFile = {
                    ErrorMessage: ex.message
                };
                InteropHolder_4.eventTrigged(JSON.stringify(outputFile), "", "", "", "fileSelectedInternal", function (e) { }, function (e) { });
            }, fileTypes);
        }
        catch (ex) {
            this.handleError(ex.message, "selectFileInternal");
        }
    };
    SYSPROInteropClass.prototype.closeBrowserTab = function () {
        try {
            this.ignoreUnload = true;
            window.close();
        }
        catch (ex) {
            this.handleError(ex.message, "closeBrowserTab");
        }
    };
    SYSPROInteropClass.prototype.closeModalWindow = function (DataIn) {
        try {
            this.isProgramaticClose = true;
            console.log("closeModalWindow " + DataIn);
            var indexRemoved = -1;
            if (DataIn) {
                $.each(this.modalWindowHolder, function (index) {
                    if (this.Id == DataIn) {
                        indexRemoved = index;
                        if (this.ModalType === 0) {
                            if (this.Window && this.Window.close)
                                this.Window.close();
                        }
                        else {
                            if (this.Window && this.Window._close)
                                this.Window._close({
                                    preventDefault: function () { }
                                });
                        }
                        $.each($(".syspro-grid-list", this.Window.element), function (index) {
                            if ($(this).data("kendoGrid")) {
                                $(this).data("kendoGrid").destroy();
                            }
                        });
                        this.Window.element.remove();
                    }
                });
            }
            if (indexRemoved > -1) {
                this.modalWindowHolder.splice(indexRemoved, 1);
            }
            else {
                var lastWindow = this.modalWindowHolder.pop();
                if (lastWindow) {
                    if (lastWindow.Window && lastWindow.Window.close) {
                        lastWindow.Window.close();
                        $.each($(".syspro-grid-list", lastWindow.Window.element), function (index) {
                            if ($(this).data("kendoGrid")) {
                                $(this).data("kendoGrid").destroy();
                            }
                        });
                        lastWindow.Window.element.remove();
                    }
                }
                else
                    console.log("closeModalWindow for " + DataIn + " failed because the window was not opened or has already been closed.");
            }
            if (this.modalWindowHolder.length === 0) {
                for (var i = 0; i < this.recentCalledProgramList.length; i++) {
                    if (this.recentCalledProgramList[i].name === DataIn) {
                        this.recentCalledProgramList.splice(i, 1);
                        i--;
                    }
                }
            }
            else {
                var isCardLeft_1 = true;
                this.modalWindowHolder.forEach(function (value, index) {
                    if (value.Id.indexOf("card ") !== 0)
                        isCardLeft_1 = false;
                });
                if (isCardLeft_1) {
                    this.recentCalledProgramList = [];
                }
            }
            if (DataIn && DataIn.trim() === "IMPTIM") {
                this.callLayerInterop.avantiPluginLoaded = this.callLayerInterop.previousAvantiPlugin;
                this.callLayerInterop.previousAvantiPlugin = "";
            }
            this.bindOnCurrentDivPerformed = false;
            return "";
        }
        catch (ex) {
            this.handleError(ex.message, "closeModalWindow");
        }
    };
    SYSPROInteropClass.prototype.setModalWindowTitle = function (DataIn) {
        try {
            var indexRemoved = -1;
            if (DataIn) {
                var modalId = DataIn.split('|')[0];
                var modalTitle = DataIn.split('|')[1];
                if (modalId.indexOf("PANELTITLE-") === 0) {
                    var panelFound = $('[data-guid="' + modalId.replace("PANELTITLE-", "") + '"]');
                    if (panelFound.length > 0) {
                        $(".panel-heading", panelFound).text(modalTitle);
                    }
                    return "";
                }
                $.each(this.modalWindowHolder, function (index) {
                    if (this.Id == modalId) {
                        indexRemoved = index;
                        if (this.ModalType !== 0) {
                            $("h4", $(this.Window.element).closest(".offcanvas-header")).html(modalTitle);
                        }
                        else {
                            this.Window.title(modalTitle);
                        }
                    }
                });
            }
            if (indexRemoved === -1) {
                var lastWindow = this.modalWindowHolder[this.modalWindowHolder.length - 1];
                if (lastWindow) {
                    if (lastWindow.ModalType !== 0) {
                        $("h4", $(lastWindow.Window.element).closest(".offcanvas-header")).html(modalTitle);
                    }
                    else {
                        lastWindow.Window.title(modalTitle);
                    }
                }
            }
            return "";
        }
        catch (ex) {
            this.handleError(ex.message, "setModalWindowTitle");
        }
    };
    SYSPROInteropClass.prototype.modalWindowClosed = function (DataIn, currentPosition) {
        try {
            if (DataIn && DataIn.indexOf("SearchWindowMain") !== 0) {
                this.eventTrigged(DataIn, currentPosition, "", "", "modalWindowClosed", function (e) { }, function (e) { });
            }
            this.fullBindRequired = null;
            return "";
        }
        catch (ex) {
            this.handleError(ex.message, "closePopupDialog");
        }
    };
    SYSPROInteropClass.prototype.backToMenu = function () {
        try {
            this.eventTrigged("", "", "", "", "backToMenu", function (e) { }, function (e) { });
            return "";
        }
        catch (ex) {
            this.handleError(ex.message, "closePopupDialog");
        }
    };
    SYSPROInteropClass.prototype.showTaskDialog = function (dataIn) {
        var parsedModel = JSON.parse(dataIn.HtmlContent);
        var InteropHolder = this;
        if (InteropHolder.taskDialogContentShown === parsedModel.MainInstruction) {
            if (InteropHolder.notificationHolder) {
                InteropHolder.notificationHolder.hide();
            }
        }
        InteropHolder.taskDialogContentShown = parsedModel.MainInstruction;
        var hideAfterInterval = 4000;
        if (parsedModel.Footer) {
            hideAfterInterval = 8000;
        }
        if (!InteropHolder.notificationHolder) {
            InteropHolder.notificationHolder = $("#taskdialognotification").kendoNotification({
                position: {
                    pinned: true,
                    top: 60,
                    right: 30
                },
                autoHideAfter: 4000,
                stacking: "down",
                templates: [{
                        type: "info",
                        template: $("#taskDialogTemplate").html()
                    }],
                show: function (e) {
                    e.element.parent().css({
                        zIndex: (parseInt(InteropHolder.getModalsHighestZIndex().toString()) + 1)
                    });
                    $(".task-dialog-hyperlink", e.element).on("click", function () {
                        InteropHolder.eventTrigged($(this).data("hyperlinkid"), null, null, null, "taskDialogLinkClicked", null, null);
                    });
                }
            }).data("kendoNotification");
        }
        InteropHolder.notificationHolder.show(parsedModel, null);
    };
    SYSPROInteropClass.prototype.showCustomTaskDialog = function (backgroundColor, iconColor, title, mainInstruction, content, icon) {
        var modalForTaskDialog = {
            BackgroundColor: backgroundColor,
            IconColor: iconColor,
            Title: title,
            MainInstruction: mainInstruction,
            Content: content,
            Icon: icon,
            Hyperlink: "",
            HyperlinkId: ""
        };
        var dataIn = {
            HtmlContent: JSON.stringify(modalForTaskDialog)
        };
        this.showTaskDialog(dataIn);
    };
    SYSPROInteropClass.prototype.hideTaskDialogs = function () {
        if (this.notificationHolder) {
            this.notificationHolder.hide();
        }
    };
    SYSPROInteropClass.prototype.fieldChangedHandler = function (e) {
        var changedElement = e.currentTarget;
        var InteropHolder = this;
        var dataFieldName = changedElement.getAttribute("data-fieldname");
        var dataValue;
        dataValue = changedElement.value;
        if (changedElement.type == "checkbox") {
            dataValue = changedElement.checked;
        }
        if (changedElement.classList.contains('syspro-radiobutton-option')) {
            if (changedElement.checked) {
                var radioButtonParent = $(changedElement).closest(".syspro-databound-radiobutton");
                if (radioButtonParent.length > 0) {
                    dataFieldName = radioButtonParent[0].getAttribute("data-fieldname");
                    changedElement = $(changedElement).closest(".syspro-databound-radiobutton")[0];
                }
                else
                    dataFieldName = changedElement.name;
                dataValue = changedElement.value;
            }
        }
        if (changedElement.classList.contains('syspro-colorpicker')) {
            var dataValueHex = $(changedElement).val();
            dataValue = sysproInterop.hexToRgbA(dataValueHex.toString());
        }
        if (!dataFieldName) {
            if (changedElement.classList.contains('syspro-combobox-inform')) {
                if ($("select", $(changedElement).closest(".form-group")).length > 0)
                    dataFieldName = $("select", $(changedElement).closest(".form-group"))[0].getAttribute("data-fieldname");
            }
        }
        if (changedElement.classList.contains('combobox') && ((changedElement.tagName === "INPUT" && !changedElement.classList.contains('syspro-combobox-inform')) || (changedElement.tagName === "SELECT" && changedElement.classList.contains('syspro-combobox-inform')))) {
            return;
        }
        if (changedElement.classList.contains("dropdown-select")) {
            var inputfield = $("input.fakeinput", $(changedElement).next(".dropdownjs"));
            if (inputfield.data("backupcolor")) {
                inputfield.css("color", inputfield.data("backupcolor"));
            }
        }
        if (changedElement.classList.contains('datetimepicker')) {
            dataValue = $(changedElement).closest(".datetimepicker").val();
            dataValue = kendo.toString(dataValue, sysproInterop.dateFormat.toUpperCase() + " HH:mm");
            if (sysproInterop.viewModel && dataFieldName) {
                var splitFields = dataFieldName.split('.');
                var valueHolder = sysproInterop.viewModel;
                splitFields.forEach(function (element) {
                    if (valueHolder[element]) {
                        valueHolder = valueHolder[element];
                    }
                });
                if (valueHolder) {
                    valueHolder.set("Value", dataValue);
                }
            }
        }
        if (changedElement.classList.contains('date-input')) {
            dataValue = kendo.toString($(changedElement).closest(".date").datepicker("getDate"), "yyyy-MM-dd");
            if (sysproInterop.viewModel && dataFieldName) {
                var splitFields = dataFieldName.split('.');
                var valueHolder = sysproInterop.viewModel;
                splitFields.forEach(function (element) {
                    if (valueHolder[element]) {
                        valueHolder = valueHolder[element];
                    }
                });
                if (valueHolder) {
                    valueHolder.set("Value", dataValue);
                }
            }
        }
        if (changedElement.classList.contains('predictive-search-initialized')) {
            sysproInterop.updateSYSPROKeyDataFromElementChange($(changedElement), dataValue);
        }
        if (changedElement.getAttribute("data-fieldlastvalue") !== dataValue) {
            changedElement.setAttribute("data-fieldlastvalue", dataValue);
            if (changedElement.classList.contains('syspro-combobox-editable')) {
                if (changedElement.parentElement.children[0]) {
                    if (changedElement.parentElement.children[0].children[0]) {
                        var inputCe = changedElement.parentElement.children[0].children[0];
                        dataValue = inputCe.value;
                        if (!dataValue) {
                            return;
                        }
                    }
                }
            }
            sysproInterop.eventTrigged(dataFieldName, dataValue, "", "", "fieldChange", function (eCurrent) { }, function (eCurrent) { });
            if (changedElement.classList.contains('.syspro-field-search-dropdown')) {
                var entryFieldEvents = changedElement.getAttribute("data-entryfieldevents");
                if (entryFieldEvents.indexOf("Tab") > -1) {
                    sysproInterop.eventTrigged(dataFieldName, 9, dataValue, "", "keyDown", function (eCurrent) { }, function (eCurrent) { });
                }
            }
        }
    };
    SYSPROInteropClass.prototype.subscribeToFieldEvents = function () {
        try {
            var InteropHolder_5 = this;
            $(".syspro-trackfield-keydown:not(.syspro-field-search-dropdown)").off("keydown", InteropHolder_5.keyDownTracking);
            $(".syspro-trackfield-keydown:not(.syspro-field-search-dropdown)").on("keydown", InteropHolder_5.keyDownTracking);
            $(".syspro-trackfield-keydown:not(.syspro-field-search-dropdown)").off("focus", InteropHolder_5.focusTracking);
            $(".syspro-trackfield-keydown:not(.syspro-field-search-dropdown)").on("focus", InteropHolder_5.focusTracking);
            $(".syspro-trackfield-keydown:not(.syspro-field-search-dropdown)").off("blur", InteropHolder_5.lostFocusTracking);
            $(".syspro-trackfield-keydown:not(.syspro-field-search-dropdown)").on("blur", InteropHolder_5.lostFocusTracking);
            $(".syspro-trackfield-keydown:not(.syspro-field-search-dropdown)").off("mousedown", InteropHolder_5.mouseDown);
            $(".syspro-trackfield-keydown:not(.syspro-field-search-dropdown)").on("mousedown", InteropHolder_5.mouseDown);
            $("html").on("mousemove", InteropHolder_5.mouseMove);
            $(".syspro-trackfield-change").off("change", InteropHolder_5.fieldChangedHandler);
            $(".syspro-trackfield-change").on("change", InteropHolder_5.fieldChangedHandler);
            $("input.datetimepicker").off("dp.change", InteropHolder_5.fieldChangedHandler);
            $("input.datetimepicker").on("dp.change", InteropHolder_5.fieldChangedHandler);
            $("input.syspro-combobox-editable").off("change", InteropHolder_5.fieldChangedHandler);
            $("input.syspro-combobox-editable").on("change", InteropHolder_5.fieldChangedHandler);
            if ($(".syspro-trackfield-change-richtext")) {
                var editorConfig;
                var toolsList;
                toolsList = [
                    "bold",
                    "italic",
                    "underline",
                    "justifyLeft",
                    "justifyCenter",
                    "justifyRight",
                    "justifyFull",
                    "insertUnorderedList",
                    "insertOrderedList",
                    "indent",
                    "outdent",
                    "subscript",
                    "superscript",
                    "tableWizard",
                    "createTable",
                    "addRowAbove",
                    "addRowBelow",
                    "addColumnLeft",
                    "addColumnRight",
                    "deleteRow",
                    "deleteColumn",
                    "cleanFormatting",
                    "fontName",
                    "fontSize",
                    "foreColor",
                    "backColor"
                ];
                if (!$(".syspro-trackfield-change-richtext").data("kendoEditor")) {
                    $(".syspro-trackfield-change-richtext").html("");
                    editorConfig = {
                        resizable: {
                            content: true,
                            toolbar: false
                        },
                        tools: toolsList,
                        change: function (e) {
                            console.log("RTF Changed!");
                            var dataFieldName = this.body.getAttribute("data-fieldname");
                            var returnType = "#RTFIN#";
                            if (dataFieldName && dataFieldName.endsWith("Html"))
                                returnType = "";
                            var dataValue = returnType + this.value();
                            sysproInterop.eventTrigged(dataFieldName, dataValue, "", "", "fieldChange", function (eCurrent) { }, function (eCurrent) { });
                        }
                    };
                    $(".syspro-trackfield-change-richtext").kendoEditor(editorConfig);
                    var editorElement = $(".syspro-trackfield-change-richtext");
                    if (editorElement.length > 0) {
                        if (editorElement.data("kendoEditor")) {
                            editorElement.data("kendoEditor").toolbar.window.bind("open", function (e) {
                                var editorOffset = editorElement.offset();
                                var outerHeightFound = editorOffset.top + editorElement.outerHeight() + 5;
                                if (editorElement.closest(".modal-window-main").length > 0) {
                                    var windowOffset = editorElement.closest(".modal-window-main").offset();
                                    outerHeightFound = windowOffset.top + editorElement.closest(".modal-window-main").outerHeight() + 5;
                                }
                                e.sender.setOptions({
                                    position: {
                                        top: outerHeightFound,
                                        left: editorOffset.left
                                    }
                                });
                            });
                            if (editorElement.data("disableoninitialize") === "true") {
                                $(".avanti-richtextwidget-textholder", editorElement.closest(".avanti-richtextwidget")).attr("disabled", "disabled");
                                $(".avanti-richtextwidget-textholder", editorElement.closest(".avanti-richtextwidget")).attr("contenteditable", "false");
                                $(".syspro-richtext-insertdate-button", editorElement.closest(".avanti-richtextwidget")).addClass("disabled");
                                $(".syspro-richtext-refresh-button", editorElement.closest(".avanti-richtextwidget")).addClass("disabled");
                                $(".syspro-richtext-save-button", editorElement.closest(".avanti-richtextwidget")).addClass("disabled");
                            }
                        }
                    }
                }
                else {
                    if ($(".syspro-rtfinit").length > 0) {
                        $(".syspro-rtfinit").removeClass("syspro-rtfinit");
                    }
                    if ($(".syspro-rtfinit").length > 0) {
                        editorConfig = {
                            resizable: {
                                content: true,
                                toolbar: false
                            },
                            tools: toolsList,
                            change: function (e) {
                                console.log("RTF Changed!");
                                var dataFieldName = this.body.getAttribute("data-fieldname");
                                var returnType = "#RTFIN#";
                                if (dataFieldName && dataFieldName.endsWith("Html"))
                                    returnType = "";
                                var dataValue = returnType + this.value();
                                sysproInterop.eventTrigged(dataFieldName, dataValue, "", "", "fieldChange", function (eCurrent) { }, function (eCurrent) { });
                            }
                        };
                        $(".syspro-rtfinit").kendoEditor(editorConfig);
                        $(".syspro-rtfinit").removeClass("syspro-rtfinit");
                    }
                }
            }
            $(".syspro-browse-button").off("click");
            $(".syspro-browse-button").on("click", function (e) {
                var predictiveSearchValue = this.getAttribute("data-predictivesearchfield");
                var dataFieldName = this.getAttribute("data-fieldname");
                var dataValue;
                dataValue = this.getAttribute("data-fieldvalue");
                if (predictiveSearchValue === "manual") {
                    var variableSplit = dataFieldName.split(":");
                    var searchRowIndex = parseInt(variableSplit[2]);
                    searchRowIndex = searchRowIndex + 1;
                    InteropHolder_5.eventTrigged(variableSplit[1], searchRowIndex + "|" + variableSplit[3] + "|", "", "", "manualSearchSelected", function (e) { }, function (e) { });
                }
                else {
                    if (dataValue === "#GRIDVALUE#") {
                        dataValue = $(this).siblings("input").val();
                    }
                    InteropHolder_5.openBrowse(dataFieldName, dataValue, predictiveSearchValue, dataFieldName);
                }
            });
            $(".syspro-file-browse-button").off("click");
            $(".syspro-file-browse-button").on("click", function (e) {
                var dataFieldName = this.getAttribute("data-fieldname");
                var filetypes = this.getAttribute("data-filetypes");
                InteropHolder_5.selectFile(function (e) {
                    $("#" + dataFieldName.replace(".", "\\.")).val(e.FilePath);
                    InteropHolder_5.eventTrigged(JSON.stringify(e), dataFieldName, "", "", "fileSelected", function (e) { }, function (e) { });
                }, function (e) { }, filetypes);
            });
            if (!InteropHolder_5.isInAppBuilder) {
                $(".tile").off("click");
                $(".tile:not(.tile-disabled)").on("click", function (index) {
                    var parentfieldpath = this.getAttribute("data-parentfieldpath");
                    var tileparameters = this.getAttribute("data-tileparameters");
                    var tiletypedetail = this.getAttribute("data-tiletypename");
                    var tiletype = this.getAttribute("data-tiletype");
                    var tileDescription = $(".tile-title", this).first().text();
                    if (tiletypedetail && tiletypedetail.indexOf("Plugin|") === 0 || tiletypedetail.indexOf("Link|") === 0) {
                        InteropHolder_5.runProgramInSYSPRO(parentfieldpath, tiletype, tileDescription, tiletypedetail);
                    }
                    else {
                        if (tiletype === "Program") {
                            tileparameters = tiletype;
                            $("[id=loading-cover]").fadeIn();
                        }
                        if (tiletype === "MLText" || tiletype === "MLGauge") {
                            tiletypedetail = tiletype + "|" + tiletypedetail;
                        }
                        var sysproKeys = null;
                        if (InteropHolder_5.viewModel && InteropHolder_5.viewModel.Fields)
                            sysproKeys = JSON.stringify(InteropHolder_5.viewModel.Fields.SYSPROKeyData);
                        InteropHolder_5.eventTrigged(parentfieldpath, tileparameters, tiletypedetail, sysproKeys, "tileClicked", function (eCurrent) { }, function (eCurrent) {
                            if (eCurrent.ErrorMessage)
                                InteropHolder_5.handleError(eCurrent.ErrorMessage, "tileClicked");
                        });
                    }
                });
            }
            $('select.combobox.combobox-initialized').combobox('refresh');
        }
        catch (ex) {
            console.log("Silent Bind Error (Don't panic!) - " + ex.message);
        }
    };
    SYSPROInteropClass.prototype.openBrowse = function (fieldName, fieldValue, predictivesearchfield, fieldIdToPopulate) {
        if (this.callLayerInterop.interopType === "StandaloneBrowser" && (predictivesearchfield && predictivesearchfield !== "ignore" && predictivesearchfield !== "undefined" && predictivesearchfield !== undefined)) {
            var DataIn = {
                SearchType: predictivesearchfield,
                SearchField: fieldIdToPopulate,
                SearchValue: fieldValue
            };
            this.callLayerInterop.callFusionService(this.callLayerInterop.renderMode + "/UXSearchWeb/OpenSearchWindow", DataIn, "GET", function (result) {
            }, function (ex) {
                this.handleError(ex.ErrorMessage, "openBrowse");
            });
        }
        else {
            this.eventTrigged(fieldName, fieldValue, "", "", "fieldBrowse", function (eCurrent) { }, function (eCurrent) { });
        }
    };
    SYSPROInteropClass.prototype.browseValueSelected = function (fieldIdToPopulate, fieldValue, searchType) {
        this.closeModalWindow("SearchWindowMain" + searchType);
        if (fieldIdToPopulate.indexOf("grid:") >= 0) {
            var fieldParameters = fieldIdToPopulate.split(":");
            var gridName = "";
            var cellNumber = "";
            var rowNumber = "";
            var rowNumberInt = 0;
            var cellIndex = "";
            if (fieldParameters.length > 3) {
                gridName = fieldParameters[1];
                rowNumber = fieldParameters[2];
                cellNumber = fieldParameters[3];
                cellIndex = fieldParameters[4];
                rowNumberInt = parseInt(rowNumber);
                rowNumberInt = rowNumberInt + 1;
                var dataIn = {
                    FieldName: gridName,
                    InternalEvent: "SetCellValueKeepDirty",
                    InternalEventParameter: rowNumberInt.toString() + "|" + cellNumber + "|" + fieldValue + "|" + cellIndex
                };
                this.gridHelpers.gridRequestInternalEvent(dataIn);
            }
            else {
                console.log("browseValueSelected Error - Parameters given on browse for grid had too few parameters.");
            }
        }
        else {
            $("#" + fieldIdToPopulate.replace(".", "\\.")).val(fieldValue);
            var modelItemToSet = this.viewModel;
            if (fieldIdToPopulate.indexOf("Toolbar") === 0) {
                modelItemToSet = this.toolbarModel;
            }
            var itemNodes = fieldIdToPopulate.split(".");
            for (var i = 0; i < itemNodes.length; i++) {
                if (itemNodes[i]) {
                    if (modelItemToSet[itemNodes[i]]) {
                        modelItemToSet = modelItemToSet[itemNodes[i]];
                    }
                }
            }
            if (modelItemToSet)
                modelItemToSet.set("Value", fieldValue);
            this.updateSYSPROKeyDataFromElementChange($("#" + fieldIdToPopulate.replace(".", "\\.")), fieldValue);
            this.eventTrigged(fieldIdToPopulate, fieldValue, "", "", "fieldChange", function (eCurrent) {
                $("#" + fieldIdToPopulate.replace(".", "\\.")).focus();
            }, function (eCurrent) { });
            var entryFieldEvents = $("#" + fieldIdToPopulate.replace(".", "\\."))[0].getAttribute("data-entryfieldevents");
            if ($("#" + fieldIdToPopulate.replace(".", "\\.")).hasClass("syspro-toolbar-widget")) {
                this.eventTrigged(fieldIdToPopulate, 9, fieldValue, "", "keyDown", function (eCurrent) { }, function (eCurrent) { });
            }
        }
    };
    SYSPROInteropClass.prototype.keyDownTracking = function (e) {
        var HtmlElement = e.currentTarget;
        if (e.which !== 9) {
            HtmlElement.setAttribute("data-ignoretabs", "");
        }
        if (e.which === 13 || e.which === 9) {
            var dataFieldName = HtmlElement.getAttribute("data-fieldname");
            if (!dataFieldName && HtmlElement.classList.contains("combobox")) {
                if ($("select.combobox-initialized", $(HtmlElement).closest(".form-group")).length > 0) {
                    dataFieldName = $("select.combobox-initialized", $(HtmlElement).closest(".form-group"))[0].getAttribute("data-fieldname");
                }
            }
            var dataValue = HtmlElement.value;
            var entryFieldEvents = HtmlElement.getAttribute("data-entryfieldevents");
            if ((e.which === 13 &&
                (!HtmlElement.classList.contains("syspro-trackfield-change-richtext") ||
                    (entryFieldEvents && entryFieldEvents.indexOf("Enter") > -1))) ||
                (dataFieldName && dataFieldName.indexOf("Toolbar.") === 0) ||
                (entryFieldEvents && entryFieldEvents.indexOf("Tab") > -1)) {
                if (!HtmlElement.getAttribute("data-ignoretabs")) {
                    sysproInterop.eventTrigged(dataFieldName, e.which, dataValue, "", "keyDown", function (eCurrent) { }, function (eCurrent) { });
                }
                else {
                    console.log("Tab Ignored for Wait call.");
                }
            }
            if (e.keyCode === 9) {
                if ((entryFieldEvents && entryFieldEvents.indexOf("Wait") > -1) || (dataFieldName && dataFieldName.indexOf("Toolbar.") === 0)) {
                    var FieldIn = HtmlElement;
                    FieldIn.setAttribute("data-ignoretabs", "true");
                    $(FieldIn).on("blur", function () {
                        FieldIn.setAttribute("data-ignoretabs", "");
                        $(FieldIn).off("blur");
                    });
                    e.preventDefault();
                }
            }
        }
    };
    SYSPROInteropClass.prototype.callPlugin = function (pluginName, callType, DataIn1, DataIn2, pluginCallback, errorCallback, sync, waitCallback) {
        if (pluginCallback === void 0) { pluginCallback = null; }
        if (errorCallback === void 0) { errorCallback = null; }
        if (sync === void 0) { sync = null; }
        if (waitCallback === void 0) { waitCallback = null; }
        try {
            this.eventTrigged(DataIn1, DataIn2, "", "", "PLUGIN|" + pluginName + "|" + callType, function (e) {
                if (pluginCallback) {
                    pluginCallback(e);
                }
            }, function (e) {
                if (pluginCallback) {
                    errorCallback(e);
                }
            }, sync, waitCallback);
            return "";
        }
        catch (ex) {
            this.handleError(ex.message, "callPlugin");
        }
    };
    SYSPROInteropClass.prototype.focusTracking = function (e) {
        var HtmlElement = e.currentTarget;
        var entryFieldEvents = HtmlElement.getAttribute("data-entryfieldevents");
        if (entryFieldEvents && entryFieldEvents.indexOf("Focus") > -1) {
            var currEle = $(HtmlElement);
            var mdown = currEle.data("mdown");
            currEle.removeData("mdown");
            if (!currEle.hasClass("syspro-toolbar-widget") || mdown) {
                var dataFieldName = HtmlElement.getAttribute("data-fieldname");
                sysproInterop.eventTrigged(dataFieldName, "", "", "", "focus", function (eCurrent) { }, function (eCurrent) { });
            }
        }
    };
    SYSPROInteropClass.prototype.lostFocusTracking = function (e) {
        var HtmlElement = e.currentTarget;
        var entryFieldEvents = HtmlElement.getAttribute("data-entryfieldevents");
        if (entryFieldEvents && entryFieldEvents.indexOf("Blur") > -1) {
            var currEle = $(HtmlElement);
            var dataFieldName = HtmlElement.getAttribute("data-fieldname");
            var dataValue = HtmlElement.value;
            sysproInterop.eventTrigged(dataFieldName, dataValue, "", "", "blur", function (eCurrent) { }, function (eCurrent) { });
        }
        if (HtmlElement.classList.contains("predictive-search-initialized")) {
            var textCom = $(HtmlElement).data('textComplete');
            if (textCom && textCom.dropdown) {
                textCom.dropdown.deactivate();
            }
        }
    };
    SYSPROInteropClass.prototype.statusBarClicked = function (e) {
        var HtmlElement = e.currentTarget;
        var currEle = $(HtmlElement);
        var statusBarModalId = currEle.data("statusbarmodalid");
        sysproInterop.eventTrigged(statusBarModalId, "", "", "", "statusBarClicked", function (eCurrent) { }, function (eCurrent) { });
    };
    SYSPROInteropClass.prototype.mouseDown = function (e) {
        var currEle = $(this);
        if (!currEle.is(":focus")) {
            currEle.data("mdown", true);
        }
    };
    SYSPROInteropClass.prototype.mouseMove = function (e) {
        sysproInterop.cursorX = e.pageX;
        sysproInterop.cursorY = e.pageY;
    };
    SYSPROInteropClass.prototype.startHelpTourForApplication = function (isModal) {
        try {
            var interopHelper_1 = this;
            console.log("startHelpTourForApplication");
            this.getModel("", function (data) {
                console.log("Model found!");
                if (typeof hopscotch !== 'undefined') {
                    if (hopscotch) {
                        try {
                            console.log("data.HelpTourContent - " + data.HelpTourContent);
                            var parsedTour = eval(data.HelpTourContent);
                            var tourCurrent = {
                                id: "helptour_" + data.Id,
                                steps: parsedTour
                            };
                            console.log("parsedTour - " + parsedTour.length);
                            hopscotch.startTour(tourCurrent, 0);
                        }
                        catch (ex) {
                            interopHelper_1.handleError(ex.message, "startHelpTourForApplicationLoaded");
                        }
                    }
                }
                else {
                    interopHelper_1.showErrorMessage("The helptour package has not been loaded. This indicates a version mismatch between Base\Samples and Managed Assemblies.", "Loading help tour");
                }
            }, function (error) { }, isModal);
        }
        catch (ex) {
            this.handleError(ex.message, "startHelpTourForApplication");
        }
    };
    SYSPROInteropClass.prototype.addRecentProgram = function (name, description, menuItemType, avantiPlugin) {
        if (this.callLayerInterop.isSecondInstance)
            return;
        var interopHolder = this;
        if (!this.recentProgramList.length) {
            var divToAddTo = $("#programListMenu > .sidebar-menu");
            if (divToAddTo.length > 0 && $(".recent-programs-list", divToAddTo).length === 0) {
                divToAddTo.prepend('<li class="treeview recent-programs-list"><a href="#"><span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">access_time</span>Recent programs <span class="material-icons treeview-menu-expand-indicator pull-right">chevron_right</span></a><ul class="treeview-menu"></ul></li>');
            }
        }
        var programAdded = false;
        var programAddedToStack = false;
        if (description === "Home Menu") {
            programAdded = true;
            programAddedToStack = true;
        }
        else {
            if (this.recentCalledProgramList.length === 0) {
                $.each(this.recentProgramList, function (index) {
                    if (this.name == name) {
                        interopHolder.removeRecentProgram(name);
                        var programIndex_1 = -1;
                        interopHolder.recentProgramList.forEach(function (value, index) {
                            if (value.name === name) {
                                programIndex_1 = index;
                            }
                        });
                        if (programIndex_1 !== -1) {
                            interopHolder.recentProgramList.splice(programIndex_1, 1);
                        }
                    }
                });
            }
            else {
                programAdded = true;
            }
            $.each(this.recentCalledProgramList, function (index) {
                if (this.name == name) {
                    programAddedToStack = true;
                }
            });
        }
        if (!programAdded) {
            var subMenuItemType = "";
            if (avantiPlugin) {
                subMenuItemType = "Plugin|" + avantiPlugin;
            }
            this.recentProgramList.unshift({
                name: name,
                description: description,
                menutype: menuItemType,
                submenuitemtype: subMenuItemType
            });
            var InteropHolder_6 = this;
            $('.recent-programs-list .treeview-menu').prepend('<li><a href="#" class="syspro-program-link" data-sysproprogramname="' + name + '" data-syspromenuitemtype="' + menuItemType + '" data-syspromenuitemsubtype="' + subMenuItemType + '" data-tooltip="tooltip" data-placement="bottom" data-original-title="' + description + '"><span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">exit_to_app</span>' + description + '</a></li>');
            $('.syspro-program-link').off('click');
            $('.syspro-program-link').on('click', function (e) {
                var programToRun = this.getAttribute("data-sysproprogramname");
                var menuItemType = this.getAttribute("data-syspromenuitemtype");
                var syspromenuitemsubtype = this.getAttribute("data-syspromenuitemsubtype");
                var elementClone = $(this).clone();
                elementClone.children().remove();
                var programDescription = elementClone.text();
                InteropHolder_6.runProgramInSYSPRO(programToRun, menuItemType, programDescription, syspromenuitemsubtype);
            });
            if (this.recentProgramList.length > 15) {
                for (var i = 15; i < this.recentProgramList.length; i++) {
                    interopHolder.removeRecentProgram(interopHolder.recentProgramList[i].name);
                }
                this.recentProgramList.length = 15;
            }
            this.updateRecentProgramStorage();
        }
        if (!programAddedToStack) {
            var subMenuItemType = "";
            if (avantiPlugin) {
                subMenuItemType = "Plugin|" + avantiPlugin;
            }
            this.recentCalledProgramList.push({
                name: name,
                description: description,
                menutype: menuItemType,
                submenuitemtype: subMenuItemType
            });
        }
    };
    SYSPROInteropClass.prototype.removeRecentProgram = function (programName) {
        $(".recent-programs-list .treeview-menu [data-sysproprogramname=" + programName + "]").remove();
    };
    SYSPROInteropClass.prototype.bindAvantiNotifications = function (parentdiv) {
        if (parentdiv === void 0) { parentdiv = null; }
        if (!$("#offcanvas-avanti-notifications").data("isopened")) {
            var InteropHolder_7 = this;
            $("#offcanvas-avanti-notifications").data("isopened", "true");
            $("#offcanvas-avanti-notifications .tab-content").html("");
            InteropHolder_7.getNotificationsContent(function (htmlOut) {
                $("#offcanvas-avanti-notifications .tab-content").html(htmlOut);
                if ($("#offcanvas-avanti-notifications a[href='#alertsByType']").closest("li").hasClass("active")) {
                    $("#offcanvas-avanti-notifications #alertsByDate").removeClass("in");
                    $("#offcanvas-avanti-notifications #alertsByDate").removeClass("active");
                    $("#offcanvas-avanti-notifications #alertsByType").addClass("in");
                    $("#offcanvas-avanti-notifications #alertsByType").addClass("active");
                }
                else {
                    $("#offcanvas-avanti-notifications #alertsByType").removeClass("in");
                    $("#offcanvas-avanti-notifications #alertsByType").removeClass("active");
                    $("#offcanvas-avanti-notifications #alertsByDate").addClass("in");
                    $("#offcanvas-avanti-notifications #alertsByDate").addClass("active");
                }
                $("#offcanvas-avanti-notifications .dismiss-notification").on("click", function (e) {
                    if ($(this).closest(".avanti-notification-item").data("avantinotificationid"))
                        InteropHolder_7.dismissNotification($(this).closest(".avanti-notification-item").data("avantinotificationid"));
                    e.stopPropagation();
                });
                $("#offcanvas-avanti-notifications .avanti-notification-withaction").on("click", function (e) {
                    if (this.getAttribute("data-avantinotificationeventtype"))
                        InteropHolder_7.actionNotification($(this).closest(".avanti-notification-item").data("avantinotificationid"), this.getAttribute("data-avantinotificationeventtype"), this.getAttribute("data-avantinotificationeventmetadata1"), this.getAttribute("data-avantinotificationeventmetadata2"));
                });
            }, function (error) {
                InteropHolder_7.handleError(error.ErrorMessage, "Getting notifications");
            });
        }
        else {
            $("#offcanvas-avanti-notifications").data("isopened", "");
        }
    };
    SYSPROInteropClass.prototype.dismissNotification = function (notificationId) {
        var InteropHolder = this;
        var swstmgInput = {
            "PostMessages": {
                "Message": {
                    "MessageKey": notificationId
                }
            }
        };
        var swstmgDoc = {
            "PostMessages": {
                "Parameters": {
                    "ActionType": "D"
                }
            }
        };
        $("#offcanvas-avanti-notifications").data("isopened", "");
        InteropHolder.callBusinessObject("post", "SWSTMG", JSON.stringify(swstmgInput), JSON.stringify(swstmgDoc), function (result) {
            InteropHolder.bindAvantiNotifications();
            if (result && result.postmessages && result.postmessages.Message && result.postmessages.Message.TotatMessagesInInbox) {
                InteropHolder.updateNotificationsCount(result.postmessages.Message.TotatMessagesInInbox);
            }
        }, function (error) {
            InteropHolder.handleError(error.ErrorMessage, "Dismiss notification");
        });
    };
    SYSPROInteropClass.prototype.actionNotification = function (notificationId, eventType, eventMetadata1, eventMetadata2) {
        var InteropHolder = this;
        InteropHolder.callLayerInterop.avantiPluginLoaded = "";
        var wasCalled = InteropHolder.runProgramInSYSPRO(eventMetadata1, eventType, null, eventMetadata2);
        if (eventMetadata1 !== "IMPTSK" && wasCalled) {
            var swstmgInput = {
                "PostMessages": {
                    "Message": {
                        "MessageKey": notificationId,
                        "Status": "99"
                    }
                }
            };
            var swstmgDoc = {
                "PostMessages": {
                    "Parameters": {
                        "ActionType": "U"
                    }
                }
            };
            $("#offcanvas-avanti-notifications").data("isopened", "");
            InteropHolder.callBusinessObject("post", "SWSTMG", JSON.stringify(swstmgInput), JSON.stringify(swstmgDoc), function (result) {
                InteropHolder.bindAvantiNotifications(null);
                if (result && result.postmessages && result.postmessages.Message && result.postmessages.Message.TotatMessagesInInbox) {
                    InteropHolder.updateNotificationsCount(result.postmessages.Message.TotatMessagesInInbox);
                }
            }, function (error) {
                InteropHolder.handleError(error.ErrorMessage, "Action notification");
            });
        }
    };
    SYSPROInteropClass.prototype.sendNotification = function (notificationBlob) {
        try {
            var NotifyData = JSON.parse(notificationBlob.NotificationBlob);
            console.log("Notification Received - " + NotifyData.Title);
            this.showCustomTaskDialog("sys-bg-primary", "sys-fg-white", NotifyData.Title, NotifyData.SubTitle, "", NotifyData.Icon);
            this.updateNotificationsCount(notificationBlob.NotificationsCount);
        }
        catch (ex) {
            this.handleError(ex.message, "sendNotification");
        }
    };
    SYSPROInteropClass.prototype.updateNotificationsCount = function (countShown) {
        if (countShown && countShown > 0) {
            $(".avanti-notifications-count").show();
            $(".avanti-notifications-count").text(countShown);
        }
        else
            $(".avanti-notifications-count").hide();
    };
    SYSPROInteropClass.prototype.bindProgramList = function (divIn, supresserrors, forceRefresh) {
        if (forceRefresh === void 0) { forceRefresh = false; }
        try {
            var InteropHolder_8 = this;
            $("#fusion-sidebar-wrapper2").find('.pin-programlist').hide();
            if (!$("#harness-container").data("dismissprogramlistinitialized")) {
                $("#harness-container").on("click", function () {
                    if ($("#fusion-sidebar-wrapper2").find('.pin-programlist').hasClass('pl-lock')) {
                        $("#fusion-sidebar-wrapper2").removeClass("in");
                    }
                });
                $("#harness-container").data("dismissprogramlistinitialized", "true");
            }
            $('.typeahead-program-list', divIn).val("");
            if (!$('.program-list-search-wrapper', divIn).data("treeviewinitialized") || forceRefresh) {
                var keydata = "";
                if (InteropHolder_8.viewModel && InteropHolder_8.viewModel.Fields && InteropHolder_8.viewModel.Fields.SYSPROKeyData) {
                    keydata = JSON.stringify(InteropHolder_8.viewModel.Fields.SYSPROKeyData);
                }
                var RoleXmlElement = "";
                if (InteropHolder_8.currentUserSession) {
                    if (InteropHolder_8.currentUserSession.OperatorRoleCode) {
                        RoleXmlElement = "<RoleId>" + InteropHolder_8.currentUserSession.OperatorRoleCode + "</RoleId>";
                    }
                }
                InteropHolder_8.callBusinessObject("query", "PROGRAMLIST", "<Query><Key><Filetype>MF</Filetype><SRSOutput>Y</SRSOutput>" + RoleXmlElement + "</Key></Query>", "", function (result) {
                    $('#programListMenu', divIn).html(queryLayoutUIHelpers.createTreeMenu(result, null)[0].outerHTML);
                    $('#programListMenu > .treeview-menu', divIn).removeClass("treeview-menu").addClass("sidebar-menu").tree();
                    $('[data-tooltip="tooltip"]', divIn).tooltip();
                    if ($('.typeahead-program-list', divIn).typeahead) {
                        $('.typeahead-program-list', divIn).typeahead("destroy");
                    }
                    var typeaheadOptions;
                    typeaheadOptions = {
                        source: queryLayoutUIHelpers.programListTypeahead,
                        autoSelect: true,
                        programList: true,
                        fitToElement: true,
                        highlighter: function (item) {
                            var text = this.query;
                            if (text === '') {
                                return item;
                            }
                            var matches = item.match(/(>)([^<]*)(<)/g);
                            var first = [];
                            var second = [];
                            var i;
                            if (matches && matches.length) {
                                for (i = 0; i < matches.length; ++i) {
                                    if (matches[i].length > 2) {
                                        first.push(matches[i]);
                                    }
                                }
                            }
                            else {
                                first = [];
                                first.push(item);
                            }
                            text = text.replace(/[\(\)\/\.\*\+\?\[\]]/g, function (mat) {
                                return '\\' + mat;
                            });
                            var reg = new RegExp(text, 'gi');
                            var m;
                            for (i = 0; i < first.length; ++i) {
                                m = first[i].match(reg);
                                if (m && m.length > 0) {
                                    second.push(first[i]);
                                }
                            }
                            for (i = 0; i < second.length; ++i) {
                                if (!second[i].includes('_')) {
                                    item = item.replace(second[i], second[i].replace(reg, '<strong>$&</strong>'));
                                }
                            }
                            return item;
                        },
                        displayText: function (item) {
                            return typeof item !== 'undefined' && typeof item.name != 'undefined' ?
                                '<div class="row">' +
                                    '<div class="col-xs-1">' +
                                    '<span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">' +
                                    item.icon +
                                    '</span>' +
                                    '</div>' +
                                    '<div class="col-xs-9 typeahead-value-wrapper">' +
                                    (item.breadcrumb != '' ?
                                        '<div class="row typeahead-breadcrumb-wrapper"><div class="col-xs-12 sys-pd-l-10"><span class="typeahead-breadcrumb">' +
                                            item.breadcrumb +
                                            '</span></div></div>' :
                                        '') +
                                    '<div class="row"><div class="col-xs-12 sys-pd-l-10">' +
                                    item.name +
                                    '</div></div>' +
                                    '</div>' +
                                    '<div class="col-xs-2">' +
                                    '<span class="material-icons treeview-menu-expand-indicator pull-right ">chevron_right</span>' +
                                    '</div>' +
                                    '</div>' :
                                '<div class="row">' +
                                    '<div class="col-xs-1">' +
                                    '<span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">' +
                                    item.icon +
                                    '</span>' +
                                    '</div>' +
                                    '<div class="col-xs-9 typeahead-value-wrapper">' +
                                    (item.breadcrumb != '' ?
                                        '<div class="row typeahead-breadcrumb-wrapper"><div class="col-xs-12 sys-pd-l-10"><span class="typeahead-breadcrumb">' +
                                            item.breadcrumb +
                                            '</span></div></div>' :
                                        '') +
                                    '<div class="row"><div class="col-xs-12 sys-pd-l-10">' +
                                    item +
                                    '</div></div>' +
                                    '</div>' +
                                    '<div class="col-xs-2">' +
                                    '<span class="material-icons treeview-menu-expand-indicator pull-right ">chevron_right</span>' +
                                    '</div>' +
                                    '</div>';
                        },
                        afterSelect: function (e) {
                            InteropHolder_8.callLayerInterop.avantiPluginLoaded = "";
                            InteropHolder_8.runProgramInSYSPRO(e.sysproprogramname, e.syspromenuitemtype, e.name, e.syspromenuitemsubtype);
                        }
                    };
                    $('.typeahead-program-list', divIn).typeahead(typeaheadOptions, null);
                    var divToAddTo = $("#programListMenu > .sidebar-menu");
                    if (divToAddTo.length > 0 && $(".recent-programs-list", divToAddTo).length === 0) {
                        divToAddTo.prepend('<li class="treeview recent-programs-list"><a href="#"><span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">access_time</span>Recent programs <span class="material-icons treeview-menu-expand-indicator pull-right">chevron_right</span></a><ul class="treeview-menu"></ul></li>');
                    }
                    InteropHolder_8.updateRecentProgramList();
                    $.each(sysproInterop.recentProgramList, function (index) {
                        $('.recent-programs-list .treeview-menu').append('<li><a href="#" class="syspro-program-link" data-sysproprogramname="' + this.name + '" data-syspromenuitemtype="' + this.menutype + '" data-syspromenuitemsubtype="' + this.submenuitemtype + '" data-tooltip="tooltip" data-placement="bottom" data-original-title="' + this.description + '"><span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">exit_to_app</span>' + this.description + '</a></li>');
                    });
                    $('.syspro-program-link').off('click');
                    $('.syspro-program-link').on('click', function (e) {
                        var programToRun = this.getAttribute("data-sysproprogramname");
                        var menuItemType = this.getAttribute("data-syspromenuitemtype");
                        var syspromenuitemsubtype = this.getAttribute("data-syspromenuitemsubtype");
                        var elementClone = $(this).clone();
                        elementClone.children().remove();
                        var programDescription = elementClone.text();
                        InteropHolder_8.callLayerInterop.avantiPluginLoaded = "";
                        InteropHolder_8.runProgramInSYSPRO(programToRun, menuItemType, programDescription, syspromenuitemsubtype);
                    });
                    queryLayoutUIHelpers.initializeDragDrop();
                    $('.program-list-search-wrapper', divIn).data("treeviewinitialized", "true");
                    $('.program-list-search-wrapper').css('opacity', 1);
                }, function (error) {
                    if (!supresserrors) {
                        InteropHolder_8.handleError(error.ErrorMessage, "bindProgramList");
                    }
                }, true, false, keydata);
            }
        }
        catch (ex) {
            this.handleError(ex.message, "bindProgramList");
        }
    };
    SYSPROInteropClass.prototype.searchProgramList = function (dataSource, searchMenu) {
        var hasVisibleChildren = false;
        var data = dataSource instanceof kendo.data.HierarchicalDataSource && dataSource.data();
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var text = item.Description.toLowerCase();
            var programName;
            if (item.Name != null && typeof item.Name != "undefined")
                programName = item.Name.toLowerCase();
            else
                programName = "";
            var itemVisible = searchMenu === true
                ||
                    searchMenu === ""
                ||
                    text.indexOf(searchMenu) >= 0 ||
                programName.indexOf(searchMenu) >= 0;
            var anyVisibleChildren = this.searchProgramList(item.children, itemVisible || searchMenu);
            hasVisibleChildren = hasVisibleChildren || anyVisibleChildren || itemVisible;
            item.hidden = !itemVisible && !anyVisibleChildren;
        }
        if (data) {
            dataSource.filter({
                field: "hidden",
                operator: "neq",
                value: true
            });
        }
        return hasVisibleChildren;
    };
    SYSPROInteropClass.prototype.runProgramInSYSPRO = function (programName, menuItemType, programDescription, menuItemSubType) {
        var isactioned = false;
        if (menuItemType) {
            if (menuItemSubType && menuItemSubType.indexOf("Link|") === 0) {
                var pluginParameters = menuItemSubType.split("|");
                var pluginName = "";
                var callType = "";
                var parameter1 = "";
                var parameter2 = programName;
                if (pluginParameters.length > 1) {
                    pluginName = pluginParameters[1];
                }
                if (pluginParameters.length > 2) {
                    callType = pluginParameters[2];
                }
                if (pluginParameters.length > 3) {
                    parameter1 = pluginParameters[3];
                }
                menuItemType = "ThirdPartyLink";
                programName = callType;
            }
            if (menuItemType === "Program") {
                if (menuItemSubType && menuItemSubType.indexOf("Plugin|") === 0) {
                    var pluginParameters = menuItemSubType.split("|");
                    var pluginName = "";
                    var callType = "";
                    var parameter1 = "";
                    var parameter2 = programName;
                    if (pluginParameters.length > 1) {
                        pluginName = pluginParameters[1];
                    }
                    if (pluginParameters.length > 2) {
                        callType = pluginParameters[2];
                    }
                    if (pluginParameters.length > 3) {
                        parameter1 = pluginParameters[3];
                    }
                    if (pluginName === "SRSMAIN" && callType === "LoadReportForm") {
                        parameter1 = programDescription;
                    }
                    if (!callType)
                        callType = programName;
                    if ($("#fusion-sidebar-wrapper2").find('.pin-programlist').hasClass('pl-lock')) {
                        $("#fusion-sidebar-wrapper2").removeClass("in");
                    }
                    $("body").removeClass("offcanvas-stop-scrolling");
                    this.callPlugin(pluginName, callType, parameter1, parameter2);
                    isactioned = true;
                }
                else if (menuItemSubType && menuItemSubType.indexOf("Plugin|") === 0) {
                }
                else if (programName) {
                    if ($("#fusion-sidebar-wrapper2").find('.pin-programlist').hasClass('pl-lock')) {
                        $("#fusion-sidebar-wrapper2").removeClass("in");
                    }
                    $("body").removeClass("offcanvas-stop-scrolling");
                    $("[id=loading-cover]").fadeIn();
                    this.eventTrigged(programName, "Program", null, null, "tileClicked", function (eCurrent) { }, function (eCurrent) {
                        if (eCurrent.ErrorMessage)
                            this.handleError(eCurrent.ErrorMessage, "Running program");
                    });
                    isactioned = true;
                }
            }
            else if (menuItemType === "Tile") {
                var sysproKeys = null;
                if (this.viewModel && this.viewModel.Fields)
                    sysproKeys = JSON.stringify(this.viewModel.Fields.SYSPROKeyData);
                this.eventTrigged("", "", programName, sysproKeys, "tileClicked", function (eCurrent) { }, function (eCurrent) {
                    if (eCurrent.ErrorMessage)
                        this.handleError(eCurrent.ErrorMessage, "tileClicked");
                });
                isactioned = true;
            }
            else if (menuItemType === "Flowgraph") {
                if (loadDiagramByName) {
                    loadDiagramByName(programName, programDescription, false);
                }
            }
            else if (menuItemType === "ThirdPartyLink") {
                this.openThirdPartyUrl(callType);
            }
        }
        return isactioned;
    };
    SYSPROInteropClass.prototype.openThirdPartyUrl = function (urlIn) {
        window.open(urlIn, "_blank");
    };
    SYSPROInteropClass.prototype.hideErrorMessage = function () {
        try {
            if (typeof SYSPRO_VB !== 'undefined' && SYSPRO_VB && SYSPRO_VB !== undefined)
                SYSPRO_VB.hideErrorMessage();
        }
        catch (ex) {
        }
    };
    SYSPROInteropClass.prototype.showErrorMessage = function (message, title) {
        try {
            console.log("showErrorMessage - " + message);
            console.log(message);
            if (typeof SYSPRO_VB !== 'undefined' && SYSPRO_VB && SYSPRO_VB !== undefined) {
                SYSPRO_VB.showErrorMessage(message, title);
            }
            else
                alert("Error thrown before initialization of framework: " + message);
        }
        catch (ex) {
            console.log("showErrorMessage unhandled: " + ex.message);
        }
    };
    SYSPROInteropClass.prototype.showHelp = function (programName) {
        try {
            var helpUrl = this.currentUserSession.FullHelpUrl;
            if (!programName || programName.trim() === "") {
                programName = callLayerInterop.programName;
            }
            if (programName && programName.trim() !== "") {
                var sectionMarker = programName.substring(0, 3);
                helpUrl = helpUrl.split("$3$").join(sectionMarker);
                helpUrl = helpUrl.split("$prog$").join(programName);
            }
            else {
                helpUrl = this.currentUserSession.HomeHelpUrl;
            }
            if (helpUrl) {
                window.open(helpUrl, "_blank");
            }
        }
        catch (ex) {
            this.handleError(ex.message, "showHelp");
        }
    };
    SYSPROInteropClass.prototype.toggleLoadingScreen = function (loadingScreenModel) {
        try {
            if (loadingScreenModel.Show == "true") {
                if (loadingScreenModel.Type === "Processing")
                    queryLayoutUIHelpers.showProcessingMessage(loadingScreenModel.Text);
                else
                    $("[id=loading-cover]").fadeIn();
            }
            else {
                queryLayoutUIHelpers.hideProcessingMessage();
                $("[id=loading-cover]").fadeOut();
            }
        }
        catch (ex) {
            this.handleError(ex.message, "toggleLoadingScreen");
        }
    };
    SYSPROInteropClass.prototype.setStatusMessage = function (dataIn) {
        try {
            var InteropHolder = this;
            var statusBarDiv = null;
            if (dataIn.ModalId) {
                statusBarDiv = $("*[data-syspromodalid='" + dataIn.ModalId + "'] .statusBar");
                if (statusBarDiv.length === 0) {
                    statusBarDiv = $("#fusion-wrapper .statusBar");
                }
                statusBarDiv.data("statusbarmodalid", dataIn.ModalId);
            }
            else {
                statusBarDiv = $("#fusion-wrapper .statusBar");
                statusBarDiv.data("statusbarmodalid", "");
            }
            $(".status-message", statusBarDiv).text(dataIn.Text);
            statusBarDiv.show();
            statusBarDiv.off("click", InteropHolder.statusBarClicked);
            statusBarDiv.on("click", InteropHolder.statusBarClicked);
        }
        catch (ex) {
            this.handleError(ex.message, "setStatusMessage");
        }
    };
    SYSPROInteropClass.prototype.showContextMenu = function (menuModel) {
        try {
            var InteropHolder_9 = this;
            var menuContent = menuModel.HtmlContent;
            var locationX = menuModel.LocationX;
            var locationY = menuModel.LocationY;
            if ($("#syspro-context-menu-generic #context-menu-list").length > 0) {
                if ($("#syspro-context-menu-generic #context-menu-list").data("kendoContextMenu")) {
                    $("#syspro-context-menu-generic #context-menu-list").data("kendoContextMenu").destroy();
                }
            }
            if (InteropHolder_9.currentContextMenu) {
                if (InteropHolder_9.currentContextMenu.data("kendoContextMenu"))
                    InteropHolder_9.currentContextMenu.data("kendoContextMenu").destroy();
                InteropHolder_9.currentContextMenu.remove();
                InteropHolder_9.currentContextMenu = null;
            }
            $("#syspro-context-menu-generic").html("");
            $("#syspro-context-menu-generic").html(menuContent);
            InteropHolder_9.currentContextMenuUnhealthyClose = false;
            InteropHolder_9.currentContextMenu = $("#syspro-context-menu-generic #context-menu-list").kendoContextMenu({
                showOn: "",
                select: function (e) {
                    var ActionId = $(e.item).data("contextmenuaction");
                    if (ActionId) {
                        console.log("Context menu clicked: " + ActionId);
                        InteropHolder_9.eventTrigged(ActionId, "", "", "", "contextMenuItemClicked", function (eCurrent) { }, function (eCurrent) { });
                    }
                    e.sender.destroy();
                },
                animation: {
                    close: {
                        duration: 0
                    }
                },
                open: function (e) {
                    InteropHolder_9.currentContextMenuUnhealthyClose = true;
                    var zIndex = parseInt(InteropHolder_9.getModalsHighestZIndex().toString());
                    setTimeout(function (e1) {
                        $(".k-context-menu").closest(".k-animation-container").css("z-index", zIndex + 1);
                    }, 100);
                },
                close: function (e) {
                    InteropHolder_9.currentContextMenuUnhealthyClose = false;
                }
            });
            if (parseInt(locationX) === 0 && parseInt(locationY) === 0) {
                InteropHolder_9.cursorContextMenuOpenedX = InteropHolder_9.cursorX;
                InteropHolder_9.cursorContextMenuOpenedY = InteropHolder_9.cursorY;
                InteropHolder_9.currentContextMenu.data("kendoContextMenu").open(InteropHolder_9.cursorX, InteropHolder_9.cursorY);
            }
            else {
                InteropHolder_9.currentContextMenu.data("kendoContextMenu").open(locationX, locationY);
            }
        }
        catch (ex) {
            this.handleError(ex.message, "showContextMenu");
        }
    };
    SYSPROInteropClass.prototype.callBusinessObject = function (callType, BOName, parameter1, parameter2, callbackMethod, errorcallbackMethod, useXmlIn, useXmlOut, optionalParameters) {
        if (useXmlIn === void 0) { useXmlIn = null; }
        if (useXmlOut === void 0) { useXmlOut = null; }
        if (optionalParameters === void 0) { optionalParameters = null; }
        try {
            if (!useXmlIn)
                useXmlIn = "false";
            else
                useXmlIn = "true";
            if (!useXmlOut)
                useXmlOut = "false";
            else
                useXmlOut = "true";
            if (!optionalParameters)
                optionalParameters = "";
            var NativeCallDataIn = {
                Operation: "callBusinessObject",
                Application: callType,
                KeyField: BOName,
                KeyFieldValue: parameter1,
                FinalParameter: parameter2,
                AdditionalField1: useXmlIn,
                AdditionalField2: useXmlOut,
                AdditionalField3: optionalParameters,
                CallbackIndex: this.threadedCallbackIndexToUse,
                CallbackMethod: "this.interopCallbackReceived"
            };
            this.threadedCallbacksLookup[this.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod
            };
            while (this.threadedCallbacksLookup[this.threadedCallbackIndexToUse]) {
                this.threadedCallbackIndexToUse++;
            }
            this.callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
        catch (ex) {
            this.handleError(ex.message, "callBusinessObject");
        }
    };
    SYSPROInteropClass.prototype.closeSYSPROFusion = function (performReload) {
        console.log("closeSYSPROFusion");
        if (performReload) {
            this.callLayerInterop.setKMSToken("");
            this.manualSignOff = true;
            if (!this.callLayerInterop.isSecondInstance)
                window.location.reload();
            else
                window.close();
        }
        else {
            try {
                var windowCloseData = "";
                $.each(this.modalWindowHolder, function (index) {
                    if (this.NotModal) {
                        var modalWindow = this.Window;
                        var SYSPROId = this.Id;
                        var kendoWindowInput = modalWindow.options;
                        var topIn = kendoWindowInput.position.top;
                        var leftIn = kendoWindowInput.position.left;
                        var widthIn = kendoWindowInput.width;
                        var heightIn = kendoWindowInput.height;
                        if (isNaN(leftIn)) {
                            if (leftIn === "50%")
                                leftIn = "";
                            else
                                leftIn = leftIn.replace("px", "");
                        }
                        if (isNaN(topIn)) {
                            if (topIn === "50%")
                                topIn = "";
                            else
                                topIn = topIn.replace("px", "");
                        }
                        if (isNaN(widthIn)) {
                            widthIn = widthIn.replace("px", "");
                        }
                        if (isNaN(heightIn)) {
                            heightIn = heightIn.replace("px", "");
                        }
                        var positionCurrent = SYSPROId + ";" + leftIn + ";" + topIn + ";" + widthIn + ";" + heightIn;
                        if (!windowCloseData) {
                            windowCloseData = positionCurrent;
                        }
                        else {
                            windowCloseData = windowCloseData + "|" + positionCurrent;
                        }
                    }
                });
                this.eventTrigged(windowCloseData, this.manualSignOff, "", "", "closeBrowser", function (e) {
                }, function (ex) {
                    alert("Error on close SYSPRO - " + ex.message);
                }, true);
            }
            catch (ex) {
                alert("Error on close SYSPRO - " + ex.message);
            }
        }
    };
    SYSPROInteropClass.prototype.storeData = function (dataKey, dataValue) {
        this.callLayerInterop.storeData(dataKey, dataValue);
    };
    SYSPROInteropClass.prototype.retrieveData = function (dataKey) {
        return this.callLayerInterop.retrieveData(dataKey);
    };
    SYSPROInteropClass.prototype.storeDataServer = function (dataKey, dataValue) {
        this.callLayerInterop.storeData(dataKey, dataValue);
    };
    SYSPROInteropClass.prototype.retrieveDataServer = function (dataKey) {
        return this.callLayerInterop.retrieveData(dataKey);
    };
    SYSPROInteropClass.prototype.getLastProgramCalled = function () {
        if (this.recentCalledProgramList &&
            this.recentCalledProgramList.length > 0 &&
            this.recentCalledProgramList[this.recentCalledProgramList.length - 1].name)
            return this.recentCalledProgramList[this.recentCalledProgramList.length - 1].name.trim();
        else
            return "";
    };
    SYSPROInteropClass.prototype.updateRecentProgramStorage = function () {
        var windowPlacement = JSON.parse(localStorage.getItem('windowPlacement')) || {};
        windowPlacement["recentProgramList"] = this.recentProgramList;
        localStorage.setItem('windowPlacement', JSON.stringify(windowPlacement));
    };
    SYSPROInteropClass.prototype.updateRecentProgramList = function () {
        var localStorageItem = localStorage.getItem('windowPlacement');
        var ValidJson = this.IsJsonString(localStorageItem);
        if (ValidJson) {
            var windowPlacement = JSON.parse(localStorage.getItem('windowPlacement')) || {};
            var storedPlacement = windowPlacement.hasOwnProperty("recentProgramList");
            if (storedPlacement) {
                this.recentProgramList = windowPlacement["recentProgramList"];
            }
        }
        else {
            localStorage.removeItem('windowPlacement');
        }
    };
    SYSPROInteropClass.prototype.IsJsonString = function (jsonString) {
        try {
            JSON.parse(jsonString);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    SYSPROInteropClass.prototype.getModalsHighestZIndex = function () {
        try {
            var modalsZIndexes = [];
            if (SYSPRO_VB && SYSPRO_VB.getOpenWindows && SYSPRO_VB.getOpenWindows().length) {
                SYSPRO_VB.getOpenWindows().each(function (idx, modal) {
                    modalsZIndexes.push(parseInt($(modal).css('z-index')));
                });
                return Math.max.apply(Math, modalsZIndexes);
            }
            else {
                return 1000000;
            }
        }
        catch (ex) {
            this.handleError(ex.message, "getModalsHighestZIndex");
        }
    };
    ;
    return SYSPROInteropClass;
}());
var AvantiGridsClass = (function () {
    function AvantiGridsClass(interopIn) {
        var _this = this;
        this.smallGridHeight = 230;
        this.mediumGridHeight = 460;
        this.largeGridHeight = 690;
        this.resizeGridClicked = function (e) {
            var gridHolder = _this;
            var gridDiv = $(".syspro-grid-list", $(e.currentTarget).closest(".panel-body"));
            var currentHeight = gridDiv.data("sysprogridheight");
            var heightToSet = gridHolder.mediumGridHeight;
            var gridHeightMod = 0;
            if ($(e.currentTarget).hasClass("up-arrow")) {
                if (currentHeight === gridHolder.mediumGridHeight) {
                    heightToSet = gridHolder.smallGridHeight;
                    gridHeightMod = 1;
                }
            }
            else if ($(e.currentTarget).hasClass("down-arrow")) {
                if (currentHeight === gridHolder.mediumGridHeight) {
                    heightToSet = gridHolder.largeGridHeight;
                    gridHeightMod = 2;
                }
            }
            gridDiv.data("sysprogridheight", heightToSet);
            var kendoGridObject = gridDiv.data("kendoGrid");
            var gridOptions = kendoGridObject.getOptions();
            gridOptions.height = heightToSet;
            kendoGridObject.setOptions(gridOptions);
            gridHolder.applyGridHeight(gridDiv);
            gridHolder.interopInternal.eventTrigged(gridDiv.data("sysprogridfieldname"), gridHeightMod, "", "", "gridSizeChanged", function (e) { }, null);
        };
        this.gridEditableKeyDown = function (e) {
            try {
                var interopHelper = _this.interopInternal;
                var gridHelper_1 = _this;
                var isEditableItem = false;
                if ($($(e.target).closest('.k-edit-cell'))[0]) {
                    isEditableItem = true;
                }
                else if ($($(e.target).closest('.k-edit-cell'))) {
                    var currentEditingItem = $($(e.target).closest('.k-edit-cell'));
                    if (currentEditingItem) {
                        if (currentEditingItem.context) {
                            if (currentEditingItem.context.className == "form-control dropdown-select") {
                                isEditableItem = true;
                            }
                        }
                    }
                }
                if (e.keyCode === kendo.keys.TAB && isEditableItem == true) {
                    e.preventDefault();
                    var grid = $(e.target).closest("[data-role=grid]").data("kendoGrid");
                    var nextCellTd = null;
                    var currentRow = $(e.target).closest('tr');
                    var currentCell = $(e.target).closest('td');
                    var currentRowIndex = currentRow.index();
                    var currentCellIndex = currentCell.index();
                    if (grid.dataSource.group())
                        currentCellIndex = currentCellIndex - grid.dataSource.group().length;
                    var storePreviousRow;
                    var nextCell;
                    var dataItem = grid.dataItem($(e.target).closest('tr'));
                    var field = grid.columns[currentCellIndex].field;
                    if (!$(e.target).hasClass("k-dropdown")) {
                        var value = $(e.target).val();
                        if (grid.columns[currentCellIndex].type === "date") {
                            var dateFormatOut = $(grid.element).data("dateformatout");
                            var dateObject = kendo.parseDate(value, dateFormatOut);
                            dataItem.set(field, dateObject);
                        }
                        else {
                            dataItem.set(field, value);
                        }
                    }
                    grid.closeCell(currentCell);
                    if (e.shiftKey) {
                        nextCell = currentCell.prevAll(".editable-cell:visible");
                        if (nextCell[0]) {
                            currentCellIndex = nextCell[0].cellIndex;
                            nextCellTd = nextCell[0];
                        }
                        else {
                            currentRow = currentRow.prev();
                            if (currentRow.length > 0) {
                                currentRowIndex = currentRow.index();
                                currentCell = currentRow.children(".editable-cell:visible:last");
                                currentCellIndex = currentCell[0].cellIndex;
                                nextCellTd = currentCell[0];
                                grid.select("tr:eq(" + currentRowIndex + ")");
                            }
                        }
                    }
                    else {
                        nextCell = currentCell.nextAll(".editable-cell:visible");
                        if (nextCell.length > 0) {
                            var collectionRow = dataItem.colDisabled;
                            if (!collectionRow || collectionRow === "undefined") {
                                currentCellIndex = nextCell[0].cellIndex;
                                nextCellTd = nextCell[0];
                            }
                            else {
                                if (collectionRow[collectionRow.length - 1] !== "|") {
                                    collectionRow = collectionRow + "|";
                                }
                                var foundNextCellToFocus = false;
                                for (var i = 0; i < nextCell.length; i++) {
                                    currentCellIndex = nextCell[i].cellIndex;
                                    nextCellTd = nextCell[i];
                                    var collectionCellIndex = currentCellIndex;
                                    var columnName = grid.getOptions().columns[collectionCellIndex].field;
                                    if (!collectionRow.includes(columnName)) {
                                        foundNextCellToFocus = true;
                                        break;
                                    }
                                }
                                if (foundNextCellToFocus === false) {
                                    storePreviousRow = currentRow;
                                    currentRow = currentRow.next();
                                    if (currentRow.length > 0) {
                                        currentRowIndex = currentRow.index();
                                        currentCell = currentRow.children(".editable-cell:visible:first");
                                        currentCellIndex = currentCell[0].cellIndex;
                                        nextCellTd = currentCell[0];
                                        currentRow.data("sysignorerowselectedevent", true);
                                        grid.select("tr:eq(" + currentRowIndex + ")");
                                    }
                                    else {
                                        var fieldName = $(grid.element).data("sysprogridfieldname");
                                        var currentSelectedItem = (grid.dataSource.indexOf(dataItem) + 1) + "|";
                                        var columnDetails = dataItem.toJSON();
                                        var systagInfo = null;
                                        $.each(columnDetails, function (key, value) {
                                            if (key.indexOf("syscolor") === -1 &&
                                                key.indexOf("sysbgcolor") === -1 &&
                                                key.indexOf("sysbold") === -1 &&
                                                key.indexOf("sysdisabled") === -1 &&
                                                key.indexOf("systag") === -1 &&
                                                key.indexOf("sysdec") === -1) {
                                                var columnIsDate = false;
                                                var columnIsComboBox = false;
                                                var columnIsColumnComboBox = false;
                                                for (i = 0; i < grid.columns.length; i++) {
                                                    if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                                        columnIsDate = true;
                                                        break;
                                                    }
                                                    if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                        columnIsComboBox = true;
                                                        break;
                                                    }
                                                    if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                                        columnIsColumnComboBox = true;
                                                        break;
                                                    }
                                                }
                                                if (columnIsDate) {
                                                    currentSelectedItem = currentSelectedItem + gridHelper_1.convertDateForGridOutput(value) + "|";
                                                }
                                                else if (columnIsComboBox) {
                                                    currentSelectedItem = currentSelectedItem + value.key + "|";
                                                }
                                                else if (columnIsColumnComboBox) {
                                                    currentSelectedItem = currentSelectedItem + value.value + "|";
                                                }
                                                else {
                                                    currentSelectedItem = currentSelectedItem + value + "|";
                                                }
                                            }
                                            else {
                                                if (key.indexOf("systag") > 0) {
                                                    systagInfo = systagInfo + key + "='" + value + "';";
                                                }
                                            }
                                        });
                                        if (systagInfo) {
                                            currentSelectedItem = currentSelectedItem + "{{" + systagInfo + "}}";
                                        }
                                        interopHelper.eventTrigged(fieldName, "true|" + currentSelectedItem, "", "", "gridCanAddNewRow", function (e) { }, function (e) { });
                                    }
                                }
                            }
                        }
                        else {
                            storePreviousRow = currentRow;
                            currentRow = currentRow.next();
                            if (currentRow.length > 0) {
                                currentRowIndex = currentRow.index();
                                currentCell = currentRow.children(".editable-cell:visible:first");
                                currentCellIndex = currentCell[0].cellIndex;
                                nextCellTd = currentCell[0];
                                currentRow.data("sysignorerowselectedevent", true);
                                grid.select("tr:eq(" + currentRowIndex + ")");
                            }
                            else {
                                var fieldName = $(grid.element).data("sysprogridfieldname");
                                var currentSelectedItem = (grid.dataSource.indexOf(dataItem) + 1) + "|";
                                var columnDetails = dataItem.toJSON();
                                var systagInfo = null;
                                $.each(columnDetails, function (key, value) {
                                    if (key.indexOf("syscolor") === -1 &&
                                        key.indexOf("sysbgcolor") === -1 &&
                                        key.indexOf("sysbold") === -1 &&
                                        key.indexOf("sysdisabled") === -1 &&
                                        key.indexOf("systag") === -1 &&
                                        key.indexOf("sysdec") === -1) {
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        var columnIsColumnComboBox = false;
                                        for (i = 0; i < grid.columns.length; i++) {
                                            if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                                columnIsDate = true;
                                                break;
                                            }
                                            if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                columnIsComboBox = true;
                                                break;
                                            }
                                            if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                                columnIsColumnComboBox = true;
                                                break;
                                            }
                                        }
                                        if (columnIsDate) {
                                            currentSelectedItem = currentSelectedItem + gridHelper_1.convertDateForGridOutput(value) + "|";
                                        }
                                        else if (columnIsComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.key + "|";
                                        }
                                        else if (columnIsColumnComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.value + "|";
                                        }
                                        else {
                                            currentSelectedItem = currentSelectedItem + value + "|";
                                        }
                                    }
                                    else {
                                        if (key.indexOf("systag") > 0) {
                                            systagInfo = systagInfo + key + "='" + value + "';";
                                        }
                                    }
                                });
                                if (systagInfo) {
                                    currentSelectedItem = currentSelectedItem + "{{" + systagInfo + "}}";
                                }
                                interopHelper.eventTrigged(fieldName, "true|" + currentSelectedItem, "", "", "gridCanAddNewRow", function (e) { }, function (e) { });
                            }
                        }
                    }
                    var newNextCellType = grid.columns[currentCellIndex].type;
                    if (newNextCellType) {
                        if (newNextCellType == "combo") {
                            if (nextCellTd) {
                                if (nextCell[0].childNodes[0]) {
                                    nextCell[0].childNodes[0].focus();
                                }
                            }
                        }
                        else {
                            setTimeout(function () {
                                grid.editCell(grid.tbody.find("tr:eq(" + currentRowIndex + ") td:eq(" + currentCellIndex + ")"));
                            });
                        }
                    }
                    else {
                        setTimeout(function () {
                            grid.editCell(grid.tbody.find("tr:eq(" + currentRowIndex + ") td:eq(" + currentCellIndex + ")"));
                        });
                    }
                }
            }
            catch (ex) {
                _this.interopInternal.handleError(ex.message, "gridKeyDownEvent");
            }
        };
        this.gridRowSelected = function (e) {
            var interopHelper = _this.interopInternal;
            var gridInternal = _this;
            var grid = e.sender;
            var gridDiv = e.sender.element;
            var fieldName = gridDiv.data("sysprogridfieldname");
            var selectedRow = grid.select();
            var lastGridSelection = gridDiv.data("sysprolastgridselection");
            var currentGridSelection = e.sender.select().attr("data-uid");
            if (lastGridSelection != currentGridSelection) {
                lastGridSelection = currentGridSelection;
                gridDiv.data("sysprolastgridselection", lastGridSelection);
                var currentSelectedItem = "";
                if (grid !== null) {
                    var currentDataItem = grid.dataItem(grid.select());
                    if (currentDataItem !== null) {
                        currentSelectedItem = (grid.dataSource.indexOf(currentDataItem) + 1) + "|";
                        var columnDetails = currentDataItem.toJSON();
                        var systagInfo = null;
                        $.each(columnDetails, function (key, value) {
                            if (key.indexOf("syscolor") === -1 &&
                                key.indexOf("sysbgcolor") === -1 &&
                                key.indexOf("sysbold") === -1 &&
                                key.indexOf("sysdisabled") === -1 &&
                                key.indexOf("systag") === -1 &&
                                key.indexOf("sysdec") === -1) {
                                var columnIsDate = false;
                                var columnIsComboBox = false;
                                var columnIsColumnComboBox = false;
                                for (var i = 0; i < grid.columns.length; i++) {
                                    if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                        columnIsDate = true;
                                        break;
                                    }
                                    if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                        columnIsComboBox = true;
                                        break;
                                    }
                                    if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                        columnIsColumnComboBox = true;
                                        break;
                                    }
                                }
                                if (columnIsDate) {
                                    currentSelectedItem = currentSelectedItem + gridInternal.convertDateForGridOutput(value) + "|";
                                }
                                else if (columnIsComboBox) {
                                    currentSelectedItem = currentSelectedItem + value.key + "|";
                                }
                                else if (columnIsColumnComboBox) {
                                    currentSelectedItem = currentSelectedItem + value.value + "|";
                                }
                                else {
                                    currentSelectedItem = currentSelectedItem + value + "|";
                                }
                            }
                            else {
                                if (key.indexOf("systag") > 0) {
                                    systagInfo = systagInfo + key + "='" + value + "';";
                                }
                            }
                        });
                        if (systagInfo) {
                            currentSelectedItem = currentSelectedItem + "{{" + systagInfo + "}}";
                        }
                        if (selectedRow.data("sysignorerowselectedevent") === true) {
                            selectedRow.data("sysignorerowselectedevent", false);
                        }
                        else {
                            interopHelper.eventTrigged(fieldName, currentSelectedItem, "", "", "gridRowSelected", function (e) { }, function (e) { });
                        }
                    }
                }
            }
        };
        this.interopInternal = interopIn;
    }
    AvantiGridsClass.prototype.convertDateForGridOutput = function (value) {
        if (value instanceof Date) {
            return kendo.toString(value, "yyyyMMdd");
        }
        else {
            return kendo.toString(kendo.parseDate(value), "yyyyMMdd");
        }
    };
    AvantiGridsClass.prototype.initializeComments = function (gridDiv) {
        var interopHelper = this.interopInternal;
        var gridInternal = this;
        var gridDivToUse = gridDiv.closest(".noBorderTable");
        $('.comment', gridDivToUse).each(function (idx, elem) {
            $(this).siblings('.truncatedComment').text(gridInternal.truncateWithEllipses($(this).text().trim()));
        });
        var popoverSettings;
        popoverSettings = {
            trigger: 'click',
            placement: 'auto',
            html: 'true',
            title: 'Add a comment',
            container: "body",
            content: '<textarea class="popover-textarea"></textarea>',
            template: '<div class="popover textarea-popover"><div class="arrow"></div>' +
                '<h3 class="popover-title"></h3><div class="popover-content popover-textarea-content">xxx' +
                '</div><div class="popover-footer"><button type="button" class="btn btn-sm btn-default popover-cancel">' +
                '<i class="material-icons">cancel</i></button>&nbsp;' +
                '<button type="button" class="btn btn-primary btn-sm popover-submit pull-right">' +
                '<i class="material-icons">check</i></button></div></div>'
        };
        $(".comment-click-activation", gridDivToUse).popover(popoverSettings)
            .on('shown.bs.popover', function (e) {
            var $this = $(this);
            var $popover = $(e.target).data('bs.popover').$tip;
            $(".textarea-popover").not($popover).popover('hide');
            if ($(".textarea-popover").not($popover).data("bs.popover"))
                $(".textarea-popover").not($popover).data("bs.popover").inState.click = false;
            var $comment = $this.parent().find(".comment");
            var $popoverTextarea = $popover.find('.popover-textarea');
            $popoverTextarea.val($comment.text().trim()).focus();
            $('.popover-cancel').off("click");
            $('.popover-cancel').on("click", function () {
                $this.popover('hide');
                $this.data("bs.popover").inState.click = false;
            });
            $('.popover-submit').off("click");
            $('.popover-submit').on("click", function () {
                $comment.text($popoverTextarea.val().trim());
                $this.parent().find(".truncatedComment").text(gridInternal.truncateWithEllipses($comment.text().trim()));
                if ($comment) {
                    var columnName = $comment[0].getAttribute("data-columnname");
                    var columnUID = $comment[0].getAttribute("data-columnuid");
                    var gridDiv = $this.closest(".syspro-grid-list");
                    if (gridDiv) {
                        var fieldName = gridDiv.data("sysprogridfieldname");
                        var grid = gridDiv.data("kendoGrid");
                        if (grid) {
                            var dataItem = grid.dataSource.getByUid(columnUID.trim());
                            if (dataItem) {
                                var previousValue = dataItem[columnName];
                                dataItem[columnName] = $popoverTextarea.val().trim();
                                var selectedItem = gridDiv.data("kendoGrid").select();
                                var rowIndex;
                                if (selectedItem.length === 0) {
                                    rowIndex = grid.dataSource.total();
                                }
                                else {
                                    rowIndex = selectedItem.index() + 1;
                                }
                                var isLastRow = false;
                                if (selectedItem.index() + 1 == grid.dataSource.total()) {
                                    isLastRow = true;
                                }
                                var currentDataItem = grid.dataItem(selectedItem);
                                if (gridDiv.data("sysprohashiddenrows") == true) {
                                    rowIndex = grid.dataSource.indexOf(currentDataItem) + 1;
                                }
                                var returnChangeEventData = rowIndex + "|" + isLastRow + "|" + columnName + "|" + $popoverTextarea.val().trim() + "|";
                                if (currentDataItem !== null) {
                                    var columnDetails = currentDataItem.toJSON();
                                    var systagInfo = null;
                                    $.each(columnDetails, function (key, value) {
                                        if (key.indexOf("syscolor") === -1 &&
                                            key.indexOf("sysbgcolor") === -1 &&
                                            key.indexOf("sysbold") === -1 &&
                                            key.indexOf("sysdisabled") === -1 &&
                                            key.indexOf("systag") === -1 &&
                                            key.indexOf("sysdec") === -1) {
                                            var columnIsDate = false;
                                            var columnIsComboBox = false;
                                            var columnIsColumnComboBox = false;
                                            for (var i = 0; i < grid.columns.length; i++) {
                                                if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                            if (columnIsDate) {
                                                returnChangeEventData = returnChangeEventData + gridInternal.convertDateForGridOutput(value) + "|";
                                            }
                                            else if (columnIsComboBox) {
                                                returnChangeEventData = returnChangeEventData + value.key + "|";
                                            }
                                            else if (columnIsColumnComboBox) {
                                                returnChangeEventData = returnChangeEventData + value.value + "|";
                                            }
                                            else {
                                                returnChangeEventData += value + "|";
                                            }
                                        }
                                        else {
                                            if (key.indexOf("systag") > 0) {
                                                systagInfo = systagInfo + key + "='" + value + "';";
                                            }
                                        }
                                    });
                                    if (systagInfo) {
                                        returnChangeEventData += "{{" + systagInfo + "}}";
                                    }
                                    if (gridDiv.data("sysprogridreturnpreviousvalue")) {
                                        if (gridDiv.data("sysprogridreturnpreviousvalue") === true) {
                                            returnChangeEventData += "##" + previousValue + "##";
                                            gridDiv.data("sysprogridpreviousvalue", "");
                                        }
                                    }
                                }
                                if (returnChangeEventData !== null) {
                                    interopHelper.eventTrigged(fieldName, returnChangeEventData, "", "", "gridCellChanged", function (e) { }, function (e) { });
                                }
                            }
                        }
                    }
                }
                $this.popover('hide');
                $this.data("bs.popover").inState.click = false;
            });
        });
    };
    AvantiGridsClass.prototype.truncateWithEllipses = function (text) {
        return text.substr(0, 2000) + (text.length > 2001 ? '...' : '');
    };
    AvantiGridsClass.prototype.createGridList = function (dataIn) {
        try {
            var interopHelper_2 = this.interopInternal;
            var gridInternal_1 = this;
            var gridDivs = $('*[data-sysprogridfieldname="' + dataIn.FieldName + '"]');
            var columnModel = {};
            var comboBoxes = {};
            var sysproGroupFooters = [];
            var changedRows = [];
            var initialGrouping = [];
            var initialAggregates = [];
            var initialSorting = [];
            var hasCommandColumn = false;
            var lastGridSelection = "";
            var customSearchRows = null;
            var defaultScrollable = {
                "virtual": true
            };
            var returnPreviousValue = false;
            $.each(gridDivs, function (index) {
                var gridDiv = $(this);
                if (gridDiv.data("kendoGrid")) {
                    gridDiv.data("kendoGrid").destroy();
                    var orignalTable = $(gridDiv.closest(".noBorderTable").data("blanktable"));
                    var containerIn = gridDiv.closest(".noBorderTable");
                    containerIn.empty().append(orignalTable);
                    gridDiv = containerIn.find('.syspro-grid-list');
                }
                else {
                    var gridbackup = gridDiv.closest(".noBorderTable").html();
                    gridDiv.closest(".noBorderTable").data("blanktable", gridbackup);
                }
                var listView = JSON.parse(dataIn.GridData).lv;
                var gridEditable;
                var dateColumnsHolder = [];
                var kendoGridScroll;
                if (listView !== null) {
                    if (listView.prop.editable === true) {
                        gridEditable = {};
                        gridEditable = {
                            mode: "incell",
                            createAt: "bottom",
                            update: true
                        };
                    }
                    if (listView.prop.returnPreviousValue)
                        returnPreviousValue = listView.prop.returnPreviousValue;
                    var dateformatTemplate = "#= !data.{0} ? '" + listView.prop.sysprotranNone + "' : kendo.toString(data.{1},'" + listView.prop.sysproDateFormatOut + "') #";
                    var booleanTemplate = "<input type='checkbox' # if({0}){ # checked #} # # if ((typeof {1}sysdisabled !== 'undefined') && {2}sysdisabled){# disabled #} # />";
                    var booleanTemplateEdit = '<input type="checkbox" #= {0} ? \'checked="checked"\' : "" #  # if ((typeof {1}sysdisabled !== "undefined") && {2}sysdisabled){# disabled #} # class="sysEditGridCheckBox" />';
                    var booleanTemplateDisabled = "<input type='checkbox' # if({0}){ # checked #} # disabled />";
                    var booleanheaderTemplate = "<input type='checkbox' data-columnname='{0}' class='header-checkbox'></input><label style='margin-bottom: 0px; font-weight: normal;' for='header-chb'>{1}</label>";
                    var numberTemplate = "#= !data.{3} && data.{4} !== 0 ? '' : (kendo.toString(data.{0}, 'n' + (data.{1}sysdec==null?'p':data.{2}sysdec))) #";
                    var headerTemplate = "<div><span class='k-icon {0}'/> <a class='k-link' href='#' tabindex='-1'>{1}</a></div>";
                    var comboTemplate = "<select class='form-control dropdown-select' data-columnname='{0}'  data-template='selectTemplate' data-bind='source: {0}.items, value: {0}.value'  # if ((typeof {1}sysdisabled !== 'undefined') && {1}sysdisabled){# disabled #} # ></select>";
                    var radioTemplate = "<form data-template='radiobuttonGridTemplate' data-bind='source: {0}.items'></form>";
                    for (var i = 0; i < listView.cs.c.length; i++) {
                        if (listView.cs.c[i].type === "date") {
                            listView.cs.c[i].template = dateformatTemplate.replace("{1}", listView.cs.c[i].field);
                            listView.cs.c[i].template = listView.cs.c[i].template.replace("{0}", listView.cs.c[i].field);
                            listView.cs.c[i].template = listView.cs.c[i].template.replace("{2}", listView.cs.c[i].field);
                            listView.cs.c[i].format = "{0:" + listView.prop.sysproDateFormatOut + "}";
                            dateColumnsHolder.push(listView.cs.c[i].field);
                        }
                        if (listView.cs.c[i].type === "boolean") {
                            if (!listView.cs.c[i].editable && listView.cs.c[i].editable !== "false" && listView.cs.c[i].editable !== false) {
                                listView.cs.c[i].template = booleanTemplateEdit.replace("{0}", listView.cs.c[i].field);
                                listView.cs.c[i].template = listView.cs.c[i].template.replace("{1}", listView.cs.c[i].field);
                                listView.cs.c[i].template = listView.cs.c[i].template.replace("{2}", listView.cs.c[i].field);
                            }
                            else {
                                if (listView.cs.c[i].editable !== "false") {
                                    listView.cs.c[i].template = booleanTemplateDisabled.replace("{0}", listView.cs.c[i].field);
                                }
                                else {
                                    listView.cs.c[i].template = booleanTemplate.replace("{0}", listView.cs.c[i].field);
                                    listView.cs.c[i].template = listView.cs.c[i].template.replace("{1}", listView.cs.c[i].field);
                                    listView.cs.c[i].template = listView.cs.c[i].template.replace("{2}", listView.cs.c[i].field);
                                }
                            }
                            if (listView.cs.c[i].showInCheckBoxHeader) {
                                if (listView.cs.c[i].showInCheckBoxHeader === true) {
                                    listView.cs.c[i].headerTemplate = booleanheaderTemplate.replace("{0}", listView.cs.c[i].field);
                                    listView.cs.c[i].headerTemplate = listView.cs.c[i].headerTemplate.replace("{1}", listView.cs.c[i].title);
                                }
                            }
                        }
                        if (listView.cs.c[i].type === "number") {
                            listView.cs.c[i].template = numberTemplate.replace("{0}", listView.cs.c[i].field);
                            listView.cs.c[i].template = listView.cs.c[i].template.replace("{1}", listView.cs.c[i].field);
                            listView.cs.c[i].template = listView.cs.c[i].template.replace("{2}", listView.cs.c[i].field);
                            listView.cs.c[i].template = listView.cs.c[i].template.replace("{3}", listView.cs.c[i].field);
                            listView.cs.c[i].template = listView.cs.c[i].template.replace("{4}", listView.cs.c[i].field);
                            listView.cs.c[i].template = listView.cs.c[i].template.replace("{5}", listView.cs.c[i].field);
                            listView.cs.c[i].template = listView.cs.c[i].template.replace("{6}", listView.cs.c[i].field);
                            listView.cs.c[i].template = listView.cs.c[i].template.replace("{7}", listView.cs.c[i].field);
                        }
                        if (listView.cs.c[i].type === "combo") {
                            listView.cs.c[i].template = comboTemplate.replace("{0}", listView.cs.c[i].field).replace("{0}", listView.cs.c[i].field).replace("{0}", listView.cs.c[i].field).replace("{1}", listView.cs.c[i].field).replace("{1}", listView.cs.c[i].field);
                        }
                        if (listView.cs.c[i].type === "radio") {
                            listView.cs.c[i].template = radioTemplate.replace("{0}", listView.cs.c[i].field).replace("{0}", listView.cs.c[i].field).replace("{0}", listView.cs.c[i].field);
                        }
                        listView.cs.c[i].attributes = {
                            style: "background-color: #=data." + listView.cs.c[i].field + "sysbgcolor#; color: #=data." + listView.cs.c[i].field + "syscolor#;" + "font-weight: #=data." + listView.cs.c[i].field + "sysbold#;"
                        };
                        if (listView.prop.editable) {
                            if (!listView.cs.c[i].editable && listView.cs.c[i].editable !== "false" && listView.cs.c[i].editable !== false && listView.cs.c[i].type !== "boolean") {
                                listView.cs.c[i].attributes.class = "editable-cell";
                                if (listView.cs.c[i].type === "date") {
                                    columnModel[listView.cs.c[i].field] = {
                                        editable: true,
                                        type: "date"
                                    };
                                }
                                else {
                                    if (!listView.cs.c[i].type) {
                                        columnModel[listView.cs.c[i].field] = {
                                            editable: true
                                        };
                                    }
                                    else if (listView.cs.c[i].type === 'string') {
                                        columnModel[listView.cs.c[i].field] = {
                                            editable: true
                                        };
                                    }
                                    else if (listView.cs.c[i].type === 'number') {
                                        listView.cs.c[i].editor = function (container, options) {
                                            $('<input data-bind="value:' + options.field + '"/>')
                                                .appendTo(container)
                                                .kendoNumericTextBox({
                                                decimals: 99,
                                                format: (options && options.format)
                                                    ?
                                                        options.format : "n"
                                            });
                                        };
                                        columnModel[listView.cs.c[i].field] = {
                                            editable: true,
                                            type: "number",
                                        };
                                    }
                                    else if (listView.cs.c[i].type === 'boolean') {
                                        columnModel[listView.cs.c[i].field] = {
                                            editable: true,
                                            type: "boolean"
                                        };
                                    }
                                    else if (listView.cs.c[i].type === 'radio') {
                                        columnModel[listView.cs.c[i].field] = {
                                            editable: false,
                                            type: "radio"
                                        };
                                    }
                                    else if (listView.cs.c[i].type === 'combo') {
                                        columnModel[listView.cs.c[i].field] = {
                                            editable: false,
                                            type: "combo"
                                        };
                                    }
                                    if (listView.cs.c[i].search) {
                                        listView.cs.c[i].editor = function (container, options) {
                                            var editorGridDiv = $(container).closest(".syspro-grid-list");
                                            var editorGrid = editorGridDiv.data("kendoGrid");
                                            var editorFieldName = "grid:" + editorGridDiv.data("sysprogridfieldname");
                                            var editorRow = $(container).closest("tr").index();
                                            editorFieldName = editorFieldName + ":" + editorRow + ":" + options.field + ":" + container[0].cellIndex;
                                            var input = $('<input type="text" class="k-input k-textbox" style="width: 80%" name="' + options.field + '" />');
                                            input.appendTo(container);
                                            var editorSearchName = "";
                                            for (i = 0; i < editorGrid.columns.length; i++) {
                                                if (editorGrid.columns[i].field === options.field) {
                                                    editorSearchName = editorGrid.columns[i].search;
                                                    break;
                                                }
                                            }
                                            var buttonElement = $('<a class="syspro-browse-button" href="#" data-fieldname="' + editorFieldName + '" data-fieldvalue="#GRIDVALUE#" data-predictivesearchfield="' + editorSearchName + '"  style="color: white"><i class="material-icons">search</i></a>');
                                            buttonElement.appendTo(container);
                                            if (editorSearchName !== "manual") {
                                                interopHelper_2.initializePredictiveSearch(input, editorSearchName);
                                            }
                                            interopHelper_2.subscribeToFieldEvents();
                                        };
                                    }
                                }
                            }
                            else {
                                if (!listView.cs.c[i].type) {
                                    columnModel[listView.cs.c[i].field] = {
                                        editable: false
                                    };
                                }
                                else if (listView.cs.c[i].type === 'string') {
                                    columnModel[listView.cs.c[i].field] = {
                                        editable: false
                                    };
                                }
                                else if (listView.cs.c[i].type === 'number') {
                                    columnModel[listView.cs.c[i].field] = {
                                        editable: false,
                                        type: "number"
                                    };
                                }
                                else if (listView.cs.c[i].type === 'boolean') {
                                    columnModel[listView.cs.c[i].field] = {
                                        editable: false,
                                        type: "boolean"
                                    };
                                }
                                else if (listView.cs.c[i].type === 'date') {
                                    columnModel[listView.cs.c[i].field] = {
                                        editable: false,
                                        type: "date"
                                    };
                                }
                            }
                        }
                        else {
                            if (!listView.cs.c[i].type) {
                                columnModel[listView.cs.c[i].field] = {
                                    editable: false,
                                    type: "string"
                                };
                            }
                            else if (listView.cs.c[i].type === 'string') {
                                columnModel[listView.cs.c[i].field] = {
                                    editable: false,
                                    type: "string"
                                };
                            }
                            else if (listView.cs.c[i].type === 'number') {
                                columnModel[listView.cs.c[i].field] = {
                                    editable: false,
                                    type: "number"
                                };
                            }
                            else if (listView.cs.c[i].type === 'boolean') {
                                columnModel[listView.cs.c[i].field] = {
                                    editable: false,
                                    type: "boolean"
                                };
                            }
                            else if (listView.cs.c[i].type === 'date') {
                                columnModel[listView.cs.c[i].field] = {
                                    editable: false,
                                    type: "date"
                                };
                            }
                        }
                        if (listView.cs.c[i].image) {
                            listView.cs.c[i].headerTemplate = headerTemplate.replace("{0}", listView.cs.c[i].image);
                            listView.cs.c[i].headerTemplate = listView.cs.c[i].headerTemplate.replace("{1}", listView.cs.c[i].title);
                        }
                    }
                    if (listView.prop.includeEditCommand === true || listView.prop.includeDeleteCommand === true || listView.prop.includeSelectCommand === true) {
                        hasCommandColumn = true;
                        var selectCommand = {
                            command: [{
                                    name: "sysdummybutton",
                                    visible: function () {
                                        return false;
                                    }
                                }, {
                                    name: "sysselectbutton",
                                    className: "btn btn-default btn-select",
                                    iconClass: "k-icon k-i-button",
                                    text: "",
                                    title: "Select",
                                    click: function (e) {
                                        gridInternal_1.gridCommandSelectClicked(e);
                                    }
                                }],
                            "width": 60
                        };
                        var editCommand = {
                            command: [{
                                    name: "sysdummybutton",
                                    visible: function () {
                                        return false;
                                    }
                                }, {
                                    name: "syseditbutton",
                                    className: "btn btn-default btn-edit",
                                    iconClass: "k-icon k-i-edit",
                                    text: "",
                                    title: "Edit",
                                    click: function (e) {
                                        gridInternal_1.gridCommandEditClicked(e);
                                    }
                                }],
                            "width": 60
                        };
                        var deleteCommand = {
                            command: [{
                                    name: "sysdummybutton",
                                    visible: function () {
                                        return false;
                                    }
                                }, {
                                    name: "sysdeletebutton",
                                    className: "btn btn-default btn-delete",
                                    iconClass: "k-icon k-i-delete",
                                    text: "",
                                    title: "Delete",
                                    click: function (e) {
                                        gridInternal_1.gridCommandDeleteClicked(e);
                                    }
                                }],
                            "width": 60
                        };
                        var bothCommand = {
                            command: [{
                                    name: "syseditbutton",
                                    className: "btn btn-default btn-edit",
                                    iconClass: "k-icon k-i-edit",
                                    text: "",
                                    title: "Edit",
                                    click: function (e) {
                                        gridInternal_1.gridCommandEditClicked(e);
                                    }
                                }, {
                                    name: "sysdeletebutton",
                                    className: "btn btn-default btn-delete",
                                    iconClass: "k-icon k-i-delete",
                                    text: "",
                                    title: "Delete",
                                    click: function (e) {
                                        gridInternal_1.gridCommandDeleteClicked(e);
                                    }
                                }],
                            "width": 180
                        };
                        var selectDeleteCommand = {
                            command: [{
                                    name: "sysselectbutton",
                                    className: "btn btn-default btn-select",
                                    iconClass: "k-icon k-i-button",
                                    text: "",
                                    title: "Select",
                                    click: function (e) {
                                        gridInternal_1.gridCommandSelectClicked(e);
                                    }
                                }, {
                                    name: "sysdeletebutton",
                                    className: "btn btn-default btn-delete",
                                    iconClass: "k-icon k-i-delete",
                                    text: "",
                                    title: "Delete",
                                    click: function (e) {
                                        gridInternal_1.gridCommandDeleteClicked(e);
                                    }
                                }],
                            "width": 120
                        };
                        var selectEditCommand = {
                            command: [{
                                    name: "sysselectbutton",
                                    className: "btn btn-default btn-select",
                                    iconClass: "k-icon k-i-button",
                                    text: "",
                                    title: "Select",
                                    click: function (e) {
                                        gridInternal_1.gridCommandSelectClicked(e);
                                    }
                                }, {
                                    name: "syseditbutton",
                                    className: "btn btn-default btn-edit",
                                    iconClass: "k-icon k-i-edit",
                                    text: "",
                                    title: "Edit",
                                    click: function (e) {
                                        gridInternal_1.gridCommandEditClicked(e);
                                    }
                                }],
                            "width": 120
                        };
                        var threeCommand = {
                            command: [{
                                    name: "sysselectbutton",
                                    className: "btn btn-default btn-select",
                                    iconClass: "k-icon k-i-button",
                                    text: "",
                                    title: "Select",
                                    click: function (e) {
                                        gridInternal_1.gridCommandSelectClicked(e);
                                    }
                                }, {
                                    name: "syseditbutton",
                                    className: "btn btn-default btn-edit",
                                    iconClass: "k-icon k-i-edit",
                                    text: "",
                                    title: "Edit",
                                    click: function (e) {
                                        gridInternal_1.gridCommandEditClicked(e);
                                    }
                                }, {
                                    name: "sysdeletebutton",
                                    className: "btn btn-default btn-delete",
                                    iconClass: "k-icon k-i-delete",
                                    text: "",
                                    title: "Delete",
                                    click: function (e) {
                                        gridInternal_1.gridCommandDeleteClicked(e);
                                    }
                                }],
                            "width": 180
                        };
                        if (listView.prop.includeEditCommand === true && listView.prop.includeDeleteCommand === true && listView.prop.includeSelectCommand === true) {
                            listView.cs.c.unshift(threeCommand);
                        }
                        else if (listView.prop.includeEditCommand === true && listView.prop.includeDeleteCommand === true) {
                            listView.cs.c.unshift(bothCommand);
                        }
                        else if ((listView.prop.includeSelectCommand === true && listView.prop.includeDeleteCommand === true)) {
                            listView.cs.c.unshift(selectDeleteCommand);
                        }
                        else if ((listView.prop.includeSelectCommand === true && listView.prop.includeEditCommand === true)) {
                            listView.cs.c.unshift(selectEditCommand);
                        }
                        else {
                            if (listView.prop.includeSelectCommand === true) {
                                listView.cs.c.unshift(selectCommand);
                            }
                            if (listView.prop.includeEditCommand === true) {
                                listView.cs.c.unshift(editCommand);
                            }
                            if (listView.prop.includeDeleteCommand === true) {
                                listView.cs.c.unshift(deleteCommand);
                            }
                        }
                    }
                }
                if (gridDiv.length > 0) {
                    listView.prop.pageable.pageSize = 200;
                    if (gridDiv.closest(".compact-window").length > 0) {
                        var heightIn = $(".window-content", gridDiv.closest(".compact-window")).height();
                        listView.prop.height = 460;
                    }
                    if (gridDiv.data("sysprogridheight")) {
                        var sysprogridheight = gridDiv.data("sysprogridheight");
                        listView.prop.height = sysprogridheight;
                    }
                    var htmlForToolbar = "";
                    if (listView.tbs) {
                        if (listView.tbs.tb) {
                            var template = kendo.template($("#gridToolbarTemplate").html());
                            var toolbar = listView.tbs.tb;
                            $.each(toolbar, function (index) {
                                htmlForToolbar = htmlForToolbar + template(this);
                            });
                        }
                    }
                    if (listView.grps) {
                        initialGrouping = listView.grps.grp;
                        if (initialGrouping.length > 0) {
                            defaultScrollable = {
                                "endless": true
                            };
                        }
                    }
                    if (listView.sort) {
                        initialSorting = listView.sort;
                    }
                    if (listView.aggregate) {
                        initialAggregates = listView.aggregate;
                    }
                    var pageableEmptyText = gridDiv.data("grid-pageable-messages-empty");
                    var pageableOfText = gridDiv.data("grid-pageable-messages-of");
                    var pageablePageText = gridDiv.data("grid-pageable-messages-page");
                    var groupableEmptyText = gridDiv.data("grid-groupable-messages-empty");
                    var columnMenuText = gridDiv.data("grid-columnmenu-messages");
                    var filterableText = gridDiv.data("grid-filterable-messages");
                    var operatorsText = gridDiv.data("grid-operators-string");
                    var parsedcolumnMenuMessages = listView.prop.columnMenu;
                    var parsedfilterableMessages = listView.prop.filterable;
                    if (listView.prop.columnMenu && columnMenuText)
                        parsedcolumnMenuMessages = {
                            messages: columnMenuText
                        };
                    if (listView.prop.filterable && filterableText)
                        parsedfilterableMessages = {
                            messages: filterableText,
                            operators: {
                                string: operatorsText
                            }
                        };
                    var gridHolder = gridDiv.kendoGrid({
                        dataSource: {
                            data: [],
                            group: initialGrouping,
                            sort: initialSorting,
                            pageSize: listView.prop.pageable.pageSize,
                            aggregate: initialAggregates,
                            batch: true,
                            schema: {
                                parse: function (data) {
                                    $.each(data, function (index, item) {
                                        $.each(dateColumnsHolder, function (index) {
                                            item[this] = kendo.parseDate(item[this], listView.prop.sysproDateFormatIn);
                                        });
                                    });
                                    return data;
                                },
                                model: {
                                    fields: columnModel
                                }
                            }
                        },
                        pdf: {
                            allPages: true
                        },
                        excel: {
                            allPages: true
                        },
                        height: listView.prop.height,
                        change: function (e) {
                            gridInternal_1.gridRowSelected(e);
                            var grid = gridDiv.data("kendoGrid");
                            if (gridDiv.data("sysproscrolltonewrow")) {
                                if (gridDiv.data("sysproscrolltonewrow") === true) {
                                    var currentDataItem = grid.dataItem(grid.select());
                                    if (currentDataItem !== null) {
                                        var itemIndex = grid.dataSource.indexOf(currentDataItem);
                                        kendoGridScroll.scrollTo(itemIndex);
                                        gridDiv.data("sysproscrolltonewrow", false);
                                    }
                                }
                            }
                            if (gridDiv.data("sysprocollapsedgroupsflag")) {
                                if (gridDiv.data("sysprocollapsedgroupsflag") === true) {
                                    var CollapsedGroups = gridDiv.data("sysprocollapsedgroups");
                                    if (CollapsedGroups) {
                                        gridInternal_1.expandCollapsedGroups(grid, CollapsedGroups);
                                    }
                                }
                                gridDiv.data("sysprocollapsedgroupsflag", false);
                            }
                            if (gridDiv.data("sysproscrolltoselection")) {
                                if (gridDiv.data("sysproscrolltoselection") === true) {
                                    var scrollPosition = gridDiv.data("sysproscrolltoselectionvalue");
                                    if (!scrollPosition) {
                                        scrollPosition = 0;
                                    }
                                    if (scrollPosition !== 0) {
                                        grid.content.scrollTop(scrollPosition);
                                    }
                                    else {
                                        var scrollContentOffset = this.element.find("tbody").offset().top;
                                        var selectContentOffset = this.select().offset().top;
                                        var distance = selectContentOffset - scrollContentOffset;
                                        this.element.find(".k-grid-content").animate({
                                            scrollTop: distance
                                        }, 400);
                                    }
                                }
                                gridDiv.data("sysproscrolltoselection", false);
                                gridDiv.data("sysproscrolltoselectionvalue", 0);
                            }
                        },
                        sortable: listView.prop.sortable,
                        filterable: parsedfilterableMessages,
                        groupable: {
                            messages: {
                                empty: groupableEmptyText
                            },
                            enabled: listView.prop.groupable
                        },
                        columnMenu: parsedcolumnMenuMessages,
                        resizable: true,
                        reorderable: true,
                        selectable: true,
                        navigatable: true,
                        editable: gridEditable,
                        beforeEdit: function (e) {
                            var savePreviousValue = true;
                            if (gridDiv.data("sysproentrygriddisabled") === true) {
                                e.preventDefault();
                                savePreviousValue = false;
                            }
                            var grid = gridDiv.data("kendoGrid");
                            if (e.model) {
                                if (e.model["colDisabled"] && this.current()) {
                                    var collectionCellIndex = this.current().index();
                                    var columnName = grid.getOptions().columns[collectionCellIndex].field;
                                    if (e.model["colDisabled"].includes(columnName)) {
                                        e.preventDefault();
                                        savePreviousValue = false;
                                    }
                                    if (e.model["commentCell"] === columnName) {
                                        e.preventDefault();
                                        savePreviousValue = false;
                                    }
                                }
                            }
                            if (savePreviousValue === true) {
                                if (gridDiv.data("sysprogridreturnpreviousvalue")) {
                                    if (gridDiv.data("sysprogridreturnpreviousvalue") === true) {
                                        var previousValue = "";
                                        if (this.current()) {
                                            var collectionCellIndex = this.current().index();
                                            var columnName = grid.getOptions().columns[collectionCellIndex].field;
                                            var columnIsDate = false;
                                            var columnIsComboBox = false;
                                            var columnIsColumnComboBox = false;
                                            for (i = 0; i < grid.columns.length; i++) {
                                                if (grid.columns[i].field === columnName && grid.columns[i].type === "date") {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].field === columnName && grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (grid.columns[i].field === columnName && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                            if (columnIsDate) {
                                                previousValue = gridInternal_1.convertDateForGridOutput(e.model[columnName]);
                                            }
                                            else if (columnIsComboBox) {
                                                previousValue = e.model[columnName].key;
                                            }
                                            else if (columnIsColumnComboBox) {
                                                previousValue = e.model[columnName].value + "|";
                                            }
                                            else {
                                                previousValue = e.model[columnName];
                                            }
                                        }
                                        gridDiv.data("sysprogridpreviousvalue", previousValue);
                                    }
                                }
                            }
                        },
                        edit: function (e) {
                            if (gridDiv.data("sysproentrygriddisabled") === true) {
                                this.closeCell();
                            }
                            var grid = gridDiv.data("kendoGrid");
                            if (e.model) {
                                if (e.model["colDisabled"]) {
                                    var collectionCellIndex = e.container.index();
                                    var columnName = grid.getOptions().columns[collectionCellIndex].field;
                                    var columnType = grid.getOptions().columns[collectionCellIndex].type;
                                    if (e.model["colDisabled"].includes(columnName)) {
                                        this.closeCell();
                                    }
                                    else {
                                        if (!columnType) {
                                            $(e.container).find("input[type=text]").select();
                                        }
                                        else {
                                            if (columnType === 'number') {
                                                e.container.find("input").bind("focus", function () {
                                                    if (this.style.display != "none") {
                                                        var element = this;
                                                        setTimeout(function () {
                                                            if (element.select) {
                                                                element.select();
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                                else {
                                    var collectionCellIndex = e.container.index();
                                    var columnType = grid.getOptions().columns[collectionCellIndex].type;
                                    var columnName = grid.getOptions().columns[collectionCellIndex].field;
                                    if (!columnType) {
                                        $(e.container).find("input[type=text]").select();
                                    }
                                    else {
                                        if (columnType === 'number') {
                                            var selectedItem = gridDiv.data("kendoGrid").select();
                                            if (selectedItem) {
                                                var currentDataItem = grid.dataItem(selectedItem);
                                                var currentValue = currentDataItem[columnName];
                                                var columnNamesysDec = columnName + "sysdec";
                                                if (currentDataItem[columnNamesysDec]) {
                                                    currentValue = kendo.toString(currentValue, "n" + currentDataItem[columnNamesysDec]);
                                                    if (e.container.find("input")) {
                                                        if (e.container.find("input")[0]) {
                                                            if (e.container.find("input")[0].value !== currentValue) {
                                                                e.container.find("input")[0].value = currentValue;
                                                            }
                                                        }
                                                        if (e.container.find("input")[1]) {
                                                            e.container.find("input")[1].value = currentValue;
                                                        }
                                                    }
                                                }
                                            }
                                            e.container.find("input").bind("focus", function () {
                                                if (this.style.display != "none") {
                                                    var element = this;
                                                    setTimeout(function () {
                                                        if (element.select) {
                                                            element.select();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        },
                        cellClose: function (e) {
                            var rowIndex = 0;
                            if (e.model.dirty === true) {
                                var returnChangeEventData = "";
                                var grid = gridDiv.data("kendoGrid");
                                var fieldName = gridDiv.data("sysprogridfieldname");
                                var gridColumnsHolder = gridDiv.data("sysprogriddates");
                                var selectedItem = gridDiv.data("kendoGrid").select();
                                if (selectedItem.length === 0) {
                                    rowIndex = grid.dataSource.total();
                                }
                                else {
                                    rowIndex = selectedItem.index() + 1;
                                }
                                var isLastRow = false;
                                if (selectedItem.index() + 1 == grid.dataSource.total()) {
                                    isLastRow = true;
                                }
                                var currentDataItem = grid.dataItem(selectedItem);
                                if (currentDataItem) {
                                    rowIndex = grid.dataSource.indexOf(currentDataItem) + 1;
                                }
                                var returnChangeEventData = rowIndex + "|" + isLastRow + "|";
                                $.each(e.model.dirtyFields, function (key, value) {
                                    returnChangeEventData = returnChangeEventData + key + "|";
                                    if (e.model[key] && e.model[key].key) {
                                        returnChangeEventData = returnChangeEventData + e.model[key].key + "|";
                                    }
                                    else {
                                        var valueToUse = e.model[key];
                                        if (gridColumnsHolder.indexOf(key) > -1) {
                                            if (e.model[key]) {
                                                valueToUse = gridInternal_1.convertDateForGridOutput(e.model[key]);
                                            }
                                            else {
                                                valueToUse = "";
                                            }
                                        }
                                        returnChangeEventData = returnChangeEventData + valueToUse + "|";
                                        if (valueToUse === null) {
                                            returnChangeEventData = null;
                                            currentDataItem = null;
                                        }
                                    }
                                });
                                if (returnChangeEventData !== null) {
                                    if (currentDataItem === null) {
                                        currentDataItem = e.model;
                                    }
                                }
                                if (currentDataItem !== null) {
                                    var columnDetails = currentDataItem.toJSON();
                                    var systagInfo = null;
                                    $.each(columnDetails, function (key, value) {
                                        if (key.indexOf("syscolor") === -1 &&
                                            key.indexOf("sysbgcolor") === -1 &&
                                            key.indexOf("sysbold") === -1 &&
                                            key.indexOf("sysdisabled") === -1 &&
                                            key.indexOf("systag") === -1 &&
                                            key.indexOf("sysdec") === -1) {
                                            var columnIsDate = false;
                                            var columnIsComboBox = false;
                                            var columnIsColumnComboBox = false;
                                            for (i = 0; i < grid.columns.length; i++) {
                                                if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                            if (columnIsDate) {
                                                returnChangeEventData += gridInternal_1.convertDateForGridOutput(value) + "|";
                                            }
                                            else if (columnIsComboBox) {
                                                returnChangeEventData += value.key + "|";
                                            }
                                            else if (columnIsColumnComboBox) {
                                                returnChangeEventData += value.value + "|";
                                            }
                                            else {
                                                returnChangeEventData += (value + "|");
                                            }
                                        }
                                        else {
                                            if (key.indexOf("systag") > 0) {
                                                systagInfo = systagInfo + key + "='" + value + "';";
                                            }
                                        }
                                    });
                                    if (systagInfo) {
                                        returnChangeEventData += "{{" + systagInfo + "}}";
                                    }
                                    if (gridDiv.data("sysprogridreturnpreviousvalue")) {
                                        if (gridDiv.data("sysprogridreturnpreviousvalue") === true) {
                                            returnChangeEventData += "##" + gridDiv.data("sysprogridpreviousvalue") + "##";
                                            gridDiv.data("sysprogridpreviousvalue", "");
                                        }
                                    }
                                }
                                if (returnChangeEventData !== null) {
                                    interopHelper_2.eventTrigged(fieldName, returnChangeEventData, "", "", "gridCellChanged", function (e) { }, function (e) { });
                                }
                                e.model.dirtyFields = {};
                                e.model.dirty = false;
                                var changedRowsEvent = gridDiv.data("sysprogridchangedrows");
                                rowIndex = rowIndex - 1;
                                if (rowIndex >= 0) {
                                    if (changedRowsEvent.indexOf(rowIndex) === -1) {
                                        changedRowsEvent.push(rowIndex);
                                        gridDiv.data("sysprogridchangedrows", changedRowsEvent);
                                    }
                                }
                            }
                            gridDiv.data("sysprolastcellcloseselector", gridDiv.data("kendoGrid").select().index() + "|" + e.container.index());
                        },
                        noRecords: {
                            template: listView.prop.sysprotranNoItemText
                        },
                        scrollable: defaultScrollable,
                        pageable: {
                            messages: {
                                display: "Showing {2} item(s)"
                            },
                            numeric: false,
                            previousNext: false
                        },
                        toolbar: htmlForToolbar,
                        columns: listView.cs.c,
                        dataBinding: function (e) {
                            var scrollTop = this.element.find("div.k-grid-content").scrollTop();
                            gridDiv.data("sysproscrolltop", scrollTop);
                        },
                        dataBound: function () {
                            this.element.find("div.k-grid-content").scrollTop(gridDiv.data("sysproscrolltop"));
                            $(".syspro-grid-row-hyperlink", gridDiv).off("click");
                            $(".syspro-grid-row-hyperlink", gridDiv).on("click", function (e) {
                                gridInternal_1.sysCellClick(e.target);
                            });
                            if (!listView.prop.editable || listView.prop.editable === false) {
                                var arrows = [37, 38, 39, 40];
                                gridDiv.data('kendoGrid').table.off("keydown");
                                gridDiv.data('kendoGrid').table.on("keydown", function (e) {
                                    if (arrows.indexOf(e.keyCode) >= 0) {
                                        setTimeout(function () {
                                            gridDiv.data('kendoGrid').select(gridDiv.data('kendoGrid').current().closest("tr"));
                                        }, 1);
                                    }
                                });
                            }
                            $(".dropdown-select", gridDiv.closest(".noBorderTable")).off("keydown");
                            $(".dropdown-select", gridDiv.closest(".noBorderTable")).on("keydown", gridInternal_1.gridEditableKeyDown);
                            $(".dropdown-select", gridDiv.closest(".noBorderTable")).off("change");
                            $(".dropdown-select", gridDiv.closest(".noBorderTable")).on("change", function (e) { return gridInternal_1.gridCellComboboxChange(e.target); });
                            $(".gridSearchTextBox", gridDiv.closest(".noBorderTable")).off("input");
                            $(".gridSearchTextBox", gridDiv.closest(".noBorderTable")).on("input", function (e) {
                                var grid = gridDiv.data("kendoGrid");
                                var columns = grid.columns;
                                var valueToCompare = e.target.value;
                                valueToCompare = valueToCompare.trim();
                                if (valueToCompare === "") {
                                    var sysprohashiddenrows = gridDiv.data("sysprohashiddenrows");
                                    if (sysprohashiddenrows) {
                                        var hiddenRows = {
                                            logic: 'and',
                                            filters: []
                                        };
                                        hiddenRows.filters.push({
                                            field: 'syshidden',
                                            operator: 'neq',
                                            value: true
                                        });
                                        grid.dataSource.filter(hiddenRows);
                                    }
                                    else {
                                        grid.dataSource.filter([]);
                                    }
                                }
                                else {
                                    var filter = [{
                                            logic: 'or',
                                            filters: []
                                        }];
                                    columns.forEach(function (x) {
                                        if (x.field) {
                                            var type = x.type;
                                            if (!x.isCombbox) {
                                                if (!type) {
                                                    type = 'string';
                                                }
                                                if (type === 'string') {
                                                    filter[0].filters.push({
                                                        field: x.field,
                                                        operator: 'contains',
                                                        value: e.target.value
                                                    });
                                                }
                                                else if (type == 'number') {
                                                    if (gridInternal_1.isNumeric(e.target.value)) {
                                                        filter[0].filters.push({
                                                            field: x.field,
                                                            operator: 'eq',
                                                            value: e.target.value
                                                        });
                                                    }
                                                }
                                                else if (type == 'date') {
                                                    var data = grid.dataSource.data();
                                                    for (var i = 0; i < data.length; i++) {
                                                        var dateStr = kendo.format(x.format, data[i][x.field]);
                                                        if (dateStr.indexOf(e.target.value) === 0) {
                                                            filter[0].filters.push({
                                                                field: x.field,
                                                                operator: 'eq',
                                                                value: data[i][x.field]
                                                            });
                                                        }
                                                    }
                                                }
                                                else if (type == 'boolean' && gridInternal_1.getBoolean(e.target.value) !== null) {
                                                    var bool = gridInternal_1.getBoolean(e.target.value);
                                                    filter[0].filters.push({
                                                        field: x.field,
                                                        operator: 'eq',
                                                        value: bool
                                                    });
                                                }
                                            }
                                        }
                                    });
                                    var sysprohashiddenrows = gridDiv.data("sysprohashiddenrows");
                                    if (sysprohashiddenrows) {
                                        var hiddenRows = {
                                            logic: 'and',
                                            filters: []
                                        };
                                        hiddenRows.filters.push({
                                            field: 'syshidden',
                                            operator: 'neq',
                                            value: true
                                        });
                                        filter.push(hiddenRows);
                                    }
                                    grid.dataSource.filter(filter);
                                }
                            });
                            $(".gridLabelTextBox", gridDiv.closest(".noBorderTable")).off("keydown blur");
                            $(".gridLabelTextBox", gridDiv.closest(".noBorderTable")).on("keydown blur", function (e) {
                                if (gridDiv.data("sysproentrygriddisabled") !== true) {
                                    if (e.type === 'blur') {
                                        var eventId = e.currentTarget.getAttribute("data-gridbuttoneventid");
                                        var textBoxValue = e.target.value;
                                        interopHelper_2.eventTrigged(textBoxValue, eventId, "", "", "gridToolBarTextChanged", function (e) { }, function (e) { });
                                    }
                                    if (e.type === 'keydown') {
                                        if (e.keyCode === 9 || e.keyCode === 13) {
                                            var eventId = e.currentTarget.getAttribute("data-gridbuttoneventid");
                                            var textBoxValue = e.target.value;
                                            interopHelper_2.eventTrigged(textBoxValue, eventId, "", "", "gridToolBarTextChanged", function (e) { }, function (e) { });
                                        }
                                    }
                                }
                                else {
                                    e.preventDefault();
                                }
                            });
                            $(".grid-resize-menu", gridDiv.closest(".panel-body")).show();
                            $(".grid-resize-menu", gridDiv.closest(".panel-body")).kendoMenu({
                                direction: "top"
                            });
                            $(".grid-resize-toolbar", gridDiv.closest(".panel-body")).off("click");
                            $(".grid-resize-toolbar", gridDiv.closest(".panel-body")).on("click", gridInternal_1.resizeGridClicked);
                            gridInternal_1.applyGridHeight(gridDiv);
                            $(".gridButton", gridDiv.closest(".noBorderTable")).off("click");
                            $(".gridButton", gridDiv.closest(".noBorderTable")).on("click", function (e) {
                                if (gridDiv.data("sysproentrygriddisabled") !== true) {
                                    var eventId = e.currentTarget.getAttribute("data-gridbuttoneventid");
                                    if (eventId) {
                                        var dataInObject = {
                                            InternalEvent: "",
                                            FieldName: dataIn.FieldName,
                                            InternalEventParameter: "{}"
                                        };
                                        switch (eventId) {
                                            case "":
                                                break;
                                            case "excelexport":
                                                dataInObject.InternalEvent = "ExcelExport";
                                                gridInternal_1.gridRequestInternalEvent(dataInObject);
                                                break;
                                            case "pdfexport":
                                                dataInObject.InternalEvent = "PDFExport";
                                                gridInternal_1.gridRequestInternalEvent(dataInObject);
                                                break;
                                            case "expandall":
                                                dataInObject.InternalEvent = "ExpandAll";
                                                gridInternal_1.gridRequestInternalEvent(dataInObject);
                                                break;
                                            case "collapseall":
                                                dataInObject.InternalEvent = "CollapseAll";
                                                gridInternal_1.gridRequestInternalEvent(dataInObject);
                                                break;
                                            default:
                                                interopHelper_2.eventTrigged(dataIn.FieldName, eventId, "", "", "gridButtonClicked", function (e) { }, function (e) { });
                                                break;
                                        }
                                    }
                                    $(".tooltip").hide();
                                }
                            });
                            gridInternal_1.applyCheckBoxContentChangeEvent(gridDiv);
                            var kendoGridScrollFactory = gridInternal_1.CreateKendoGridScrollFactory();
                            kendoGridScroll = new kendoGridScrollFactory.Model(gridDiv, function (grid, row) {
                            });
                            queryLayoutUIHelpers.initializeTooltips();
                            gridDiv.data("kendoGrid").tbody.find('tr').each(function () {
                                kendo.bind(this, gridDiv.data("kendoGrid").dataItem(this));
                            });
                            gridInternal_1.addCommentMessageToGrid(this, gridDiv);
                        },
                        sort: function (e) {
                            gridDiv.data("sysprosettingschanged", true);
                        },
                        columnHide: function (e) {
                            gridDiv.data("sysprosettingschanged", true);
                        },
                        columnShow: function (e) {
                            gridDiv.data("sysprosettingschanged", true);
                        },
                        columnReorder: function (e) {
                            gridDiv.data("sysprosettingschanged", true);
                        },
                        columnResize: function (e) {
                            gridDiv.data("sysprosettingschanged", true);
                        },
                        group: function (e) {
                            gridDiv.data("sysprosettingschanged", true);
                        }
                    });
                    gridDiv.data("syspropagesize", listView.prop.pageable.pageSize);
                    gridDiv.data("sysprogridmodel", columnModel);
                    gridDiv.data("sysprogridchangedrows", changedRows);
                    gridDiv.data("sysprogridcustomsearchrows", customSearchRows);
                    gridDiv.data("sysprolastgridselection", lastGridSelection);
                    gridDiv.data("sysproentrygriddisabled", false);
                    gridDiv.data("sysprocomboboxes", comboBoxes);
                    gridDiv.data("sysprohascommandcolumn", hasCommandColumn);
                    gridDiv.data("sysproinitialgrouping", initialGrouping);
                    gridDiv.data("sysproinitialsorting", initialSorting);
                    gridDiv.data("sysproinitialaggregates", initialAggregates);
                    gridDiv.data("dateformatin", listView.prop.sysproDateFormatIn);
                    gridDiv.data("dateformatout", listView.prop.sysproDateFormatOut);
                    gridDiv.data("sysprogriddates", dateColumnsHolder);
                    gridDiv.data("sysprogroupfooters", sysproGroupFooters);
                    gridDiv.data("sysprolastcellcloseselector", "");
                    gridDiv.data("sysprohashiddenrows", false);
                    gridDiv.data("sysprosettingschanged", false);
                    gridDiv.data("sysprokendogridscroll", kendoGridScroll);
                    gridDiv.data("sysprogridpreviousvalue", "");
                    gridDiv.data("sysprogridreturnpreviousvalue", returnPreviousValue);
                    var gridObject = gridDiv.data('kendoGrid');
                    if (hasCommandColumn == true) {
                        var columnDetails = gridObject.getOptions();
                        if (columnDetails.columns.length < 5) {
                            if (columnDetails.columns[0].command.length == 1) {
                                if (columnDetails.columns[0].command[0].title === "Delete") {
                                    columnDetails.columns[0].width = 10;
                                    gridObject.setOptions(columnDetails);
                                }
                            }
                        }
                    }
                }
                else {
                    interopHelper_2.showErrorMessage("No list view with the field name '" + dataIn.FieldName + "' exists in the current webview and it could not be created.", "Create Grid List");
                }
            });
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "createGridList");
        }
    };
    AvantiGridsClass.prototype.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    AvantiGridsClass.prototype.getBoolean = function (str) {
        if ("true".indexOf(str) === 0) {
            return true;
        }
        else if ("false".indexOf(str) === 0) {
            return false;
        }
        else {
            return null;
        }
    };
    AvantiGridsClass.prototype.applyGridHeight = function (gridDiv) {
        if (gridDiv.data("sysprogridheight") === this.largeGridHeight) {
            $(".grid-resize-toolbar.up-arrow", gridDiv.closest(".panel-body")).removeClass("disabled");
            $(".grid-resize-toolbar.down-arrow", gridDiv.closest(".panel-body")).addClass("disabled");
        }
        else if (gridDiv.data("sysprogridheight") === this.mediumGridHeight) {
            $(".grid-resize-toolbar.up-arrow", gridDiv.closest(".panel-body")).removeClass("disabled");
            $(".grid-resize-toolbar.down-arrow", gridDiv.closest(".panel-body")).removeClass("disabled");
        }
        else if (gridDiv.data("sysprogridheight") === this.smallGridHeight) {
            $(".grid-resize-toolbar.up-arrow", gridDiv.closest(".panel-body")).addClass("disabled");
            $(".grid-resize-toolbar.down-arrow", gridDiv.closest(".panel-body")).removeClass("disabled");
        }
    };
    AvantiGridsClass.prototype.gridCellRadioChange = function (e) {
        try {
            var interopHelper = this.interopInternal;
            var gridInternal_2 = this;
            var tr = $(e.closest("tr"));
            var gridDiv = $(e.closest(".syspro-grid-list"));
            var grid = gridDiv.data("kendoGrid");
            var fieldName = gridDiv.data("sysprogridfieldname");
            var previousValue = "";
            if (tr) {
                if (grid) {
                    var rowIdx = $("tr", grid.tbody).index(tr);
                    grid.select("tr:eq(" + rowIdx + ")");
                    var currentDataItem = grid.dataItem(tr);
                    var isLastRow = false;
                    rowIdx++;
                    if (rowIdx == grid.dataSource.total()) {
                        isLastRow = true;
                    }
                    rowIdx = grid.dataSource.indexOf(currentDataItem) + 1;
                    var colName = e.getAttribute("data-columnname");
                    var returnChangeEventData = rowIdx + "|" + isLastRow + "|" + colName + "|" + e.value + "|";
                    if (gridDiv.data("sysprogridreturnpreviousvalue")) {
                        if (gridDiv.data("sysprogridreturnpreviousvalue") === true) {
                            previousValue = currentDataItem[colName].value;
                        }
                    }
                    if (currentDataItem !== null) {
                        var columnDetails = currentDataItem.toJSON();
                        var systagInfo = null;
                        $.each(columnDetails, function (key, value) {
                            if (key.indexOf("syscolor") === -1 &&
                                key.indexOf("sysbgcolor") === -1 &&
                                key.indexOf("sysbold") === -1 &&
                                key.indexOf("sysdisabled") === -1 &&
                                key.indexOf("systag") === -1 &&
                                key.indexOf("sysdec") === -1) {
                                var columnIsDate = false;
                                var columnIsComboBox = false;
                                var columnIsColumnComboBox = false;
                                for (var i = 0; i < grid.columns.length; i++) {
                                    if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                        columnIsDate = true;
                                        break;
                                    }
                                    if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                        columnIsComboBox = true;
                                        break;
                                    }
                                    if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                        columnIsColumnComboBox = true;
                                        break;
                                    }
                                }
                                if (columnIsDate) {
                                    returnChangeEventData += gridInternal_2.convertDateForGridOutput(value) + "|";
                                }
                                else if (columnIsComboBox) {
                                    returnChangeEventData += value.key + "|";
                                }
                                else if (columnIsColumnComboBox) {
                                    returnChangeEventData += e.value + "|";
                                }
                                else {
                                    returnChangeEventData += value + "|";
                                }
                            }
                            else {
                                if (key.indexOf("systag") > 0) {
                                    systagInfo = systagInfo + key + "='" + value + "';";
                                }
                            }
                        });
                        if (systagInfo) {
                            returnChangeEventData += "{{" + systagInfo + "}}";
                        }
                        if (gridDiv.data("sysprogridreturnpreviousvalue")) {
                            if (gridDiv.data("sysprogridreturnpreviousvalue") === true) {
                                returnChangeEventData += "##" + previousValue + "##";
                                gridDiv.data("sysprogridpreviousvalue", "");
                            }
                        }
                    }
                    var fieldName = gridDiv.data("sysprogridfieldname");
                    interopHelper.eventTrigged(fieldName, returnChangeEventData, "", "", "gridCellChanged", function (e) { }, false);
                }
            }
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "gridCellRadioChange");
        }
    };
    AvantiGridsClass.prototype.gridCellRadioClick = function (e) {
        try {
            var gridDiv = $(e.target.closest(".syspro-grid-list"));
            var grid = gridDiv.data("kendoGrid");
            var fieldName = gridDiv.data("sysprogridfieldname");
            if (gridDiv.data("sysproentrygriddisabled") === true) {
                e.preventDefault();
            }
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "gridCellRadioClick");
        }
    };
    AvantiGridsClass.prototype.gridCellComboboxChange = function (e) {
        try {
            var interopHelper = this.interopInternal;
            var gridInternal_3 = this;
            var tr = $(e.closest("tr"));
            var gridDiv = $(e.closest(".syspro-grid-list"));
            var grid = gridDiv.data("kendoGrid");
            var fieldName = gridDiv.data("sysprogridfieldname");
            var previousValue = "";
            if (tr) {
                if (grid) {
                    var rowIdx = $("tr", grid.tbody).index(tr);
                    grid.select("tr:eq(" + rowIdx + ")");
                    var currentDataItem = grid.dataItem(tr);
                    var isLastRow = false;
                    rowIdx++;
                    if (rowIdx == grid.dataSource.total()) {
                        isLastRow = true;
                    }
                    var colName = e.getAttribute("data-columnname");
                    rowIdx = grid.dataSource.indexOf(currentDataItem) + 1;
                    var returnChangeEventData = rowIdx + "|" + isLastRow + "|" + colName + "|" + e.value + "|";
                    currentDataItem[colName].value = e.value;
                    if (gridDiv.data("sysprogridreturnpreviousvalue")) {
                        if (gridDiv.data("sysprogridreturnpreviousvalue") === true) {
                            previousValue = currentDataItem[colName].value;
                        }
                    }
                    if (currentDataItem !== null) {
                        var columnDetails = currentDataItem.toJSON();
                        var systagInfo = null;
                        $.each(columnDetails, function (key, value) {
                            if (key.indexOf("syscolor") === -1 &&
                                key.indexOf("sysbgcolor") === -1 &&
                                key.indexOf("sysbold") === -1 &&
                                key.indexOf("sysdisabled") === -1 &&
                                key.indexOf("systag") === -1 &&
                                key.indexOf("sysdec") === -1) {
                                var columnIsDate = false;
                                var columnIsComboBox = false;
                                var columnIsColumnComboBox = false;
                                for (var i = 0; i < grid.columns.length; i++) {
                                    if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                        columnIsDate = true;
                                        break;
                                    }
                                    if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                        columnIsComboBox = true;
                                        break;
                                    }
                                    if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                        columnIsColumnComboBox = true;
                                        break;
                                    }
                                }
                                if (columnIsDate) {
                                    returnChangeEventData += gridInternal_3.convertDateForGridOutput(value) + "|";
                                }
                                else if (columnIsComboBox) {
                                    returnChangeEventData += value.key + "|";
                                }
                                else if (columnIsColumnComboBox) {
                                    returnChangeEventData += value.value + "|";
                                }
                                else {
                                    returnChangeEventData += value + "|";
                                }
                            }
                            else {
                                if (key.indexOf("systag") > 0) {
                                    systagInfo = systagInfo + key + "='" + value + "';";
                                }
                            }
                        });
                        if (systagInfo) {
                            returnChangeEventData += "{{" + systagInfo + "}}";
                        }
                        if (gridDiv.data("sysprogridreturnpreviousvalue")) {
                            if (gridDiv.data("sysprogridreturnpreviousvalue") === true) {
                                returnChangeEventData += "##" + previousValue + "##";
                                gridDiv.data("sysprogridpreviousvalue", "");
                            }
                        }
                    }
                    var fieldName = gridDiv.data("sysprogridfieldname");
                    interopHelper.eventTrigged(fieldName, returnChangeEventData, "", "", "gridCellChanged", function (e) { }, false);
                }
            }
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "gridCellComboboxChange");
        }
    };
    AvantiGridsClass.prototype.gridCommandSelectClicked = function (e) {
        try {
            var interopHelper = this.interopInternal;
            var gridInternal_4 = this;
            e.preventDefault();
            var currentSelectedItem = "";
            var tr = $(e.target).closest("tr");
            var gridDiv = tr.closest("[data-role=grid]");
            var grid = gridDiv.data("kendoGrid");
            var fieldName = gridDiv.data("sysprogridfieldname");
            if (grid) {
                setTimeout(function () {
                    tr.data("sysignorerowselectedevent", true);
                    grid.select(tr);
                });
                var currentDataItem = grid.dataItem(tr);
                if (currentDataItem !== null) {
                    currentSelectedItem = (grid.dataSource.indexOf(currentDataItem) + 1) + "|";
                    var columnDetails = currentDataItem.toJSON();
                    var systagInfo = null;
                    $.each(columnDetails, function (key, value) {
                        if (key.indexOf("syscolor") === -1 &&
                            key.indexOf("sysbgcolor") === -1 &&
                            key.indexOf("sysbold") === -1 &&
                            key.indexOf("sysdisabled") === -1 &&
                            key.indexOf("systag") === -1 &&
                            key.indexOf("sysdec") === -1) {
                            var columnIsDate = false;
                            var columnIsComboBox = false;
                            var columnIsColumnComboBox = false;
                            for (var i = 0; i < grid.columns.length; i++) {
                                if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                    columnIsDate = true;
                                    break;
                                }
                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                    columnIsComboBox = true;
                                    break;
                                }
                                if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                    columnIsColumnComboBox = true;
                                    break;
                                }
                            }
                            if (columnIsDate) {
                                currentSelectedItem = currentSelectedItem + gridInternal_4.convertDateForGridOutput(value) + "|";
                            }
                            else if (columnIsComboBox) {
                                currentSelectedItem = currentSelectedItem + value.key + "|";
                            }
                            else if (columnIsColumnComboBox) {
                                currentSelectedItem = currentSelectedItem + value.value + "|";
                            }
                            else {
                                currentSelectedItem = currentSelectedItem + value + "|";
                            }
                        }
                        else {
                            if (key.indexOf("systag") > 0) {
                                systagInfo = systagInfo + key + "='" + value + "';";
                            }
                        }
                    });
                    if (systagInfo) {
                        currentSelectedItem = currentSelectedItem + "{{" + systagInfo + "}}";
                    }
                    interopHelper.eventTrigged(fieldName, currentSelectedItem, "", "", "gridCommandSelectClicked", function (e) { }, function (e) { });
                }
            }
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "gridCommandSelectClicked");
        }
    };
    AvantiGridsClass.prototype.gridCommandEditClicked = function (e) {
        try {
            var gridInternal_5 = this;
            e.preventDefault();
            var currentSelectedItem = "";
            var tr = $(e.target).closest("tr");
            var gridDiv = tr.closest("[data-role=grid]");
            var grid = gridDiv.data("kendoGrid");
            var fieldName = gridDiv.data("sysprogridfieldname");
            if (grid) {
                setTimeout(function () {
                    tr.data("sysignorerowselectedevent", true);
                    grid.select(tr);
                });
                var currentDataItem = grid.dataItem(tr);
                if (currentDataItem !== null) {
                    currentSelectedItem = (grid.dataSource.indexOf(currentDataItem) + 1) + "|";
                    var columnDetails = currentDataItem.toJSON();
                    var systagInfo = null;
                    $.each(columnDetails, function (key, value) {
                        if (key.indexOf("syscolor") === -1 &&
                            key.indexOf("sysbgcolor") === -1 &&
                            key.indexOf("sysbold") === -1 &&
                            key.indexOf("sysdisabled") === -1 &&
                            key.indexOf("systag") === -1 &&
                            key.indexOf("sysdec") === -1) {
                            var columnIsDate = false;
                            var columnIsComboBox = false;
                            var columnIsColumnComboBox = false;
                            for (var i = 0; i < grid.columns.length; i++) {
                                if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                    columnIsDate = true;
                                    break;
                                }
                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                    columnIsComboBox = true;
                                    break;
                                }
                                if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                    columnIsColumnComboBox = true;
                                    break;
                                }
                            }
                            if (columnIsDate) {
                                currentSelectedItem = currentSelectedItem + gridInternal_5.convertDateForGridOutput(value) + "|";
                            }
                            else if (columnIsComboBox) {
                                currentSelectedItem = currentSelectedItem + value.key + "|";
                            }
                            else if (columnIsColumnComboBox) {
                                currentSelectedItem = currentSelectedItem + value.value + "|";
                            }
                            else {
                                currentSelectedItem = currentSelectedItem + value + "|";
                            }
                        }
                        else {
                            if (key.indexOf("systag") > 0) {
                                systagInfo = systagInfo + key + "='" + value + "';";
                            }
                        }
                    });
                    if (systagInfo) {
                        currentSelectedItem = currentSelectedItem + "{{" + systagInfo + "}}";
                    }
                    gridInternal_5.interopInternal.eventTrigged(fieldName, currentSelectedItem, "", "", "gridCommandEditClicked", function (e) { }, function (e) { });
                }
            }
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "gridCommandEditClicked");
        }
    };
    AvantiGridsClass.prototype.gridCommandDeleteClicked = function (e) {
        try {
            var interopHelper = this.interopInternal;
            var gridInternal_6 = this;
            e.preventDefault();
            var currentSelectedItem = "";
            var tr = $(e.target).closest("tr");
            var gridDiv = tr.closest("[data-role=grid]");
            var grid = gridDiv.data("kendoGrid");
            var fieldName = gridDiv.data("sysprogridfieldname");
            if (grid) {
                setTimeout(function () {
                    tr.data("sysignorerowselectedevent", true);
                    grid.select(tr);
                });
                var currentDataItem = grid.dataItem(tr);
                if (currentDataItem !== null) {
                    currentSelectedItem = (grid.dataSource.indexOf(currentDataItem) + 1) + "|";
                    var columnDetails = currentDataItem.toJSON();
                    var systagInfo = null;
                    $.each(columnDetails, function (key, value) {
                        if (key.indexOf("syscolor") === -1 &&
                            key.indexOf("sysbgcolor") === -1 &&
                            key.indexOf("sysbold") === -1 &&
                            key.indexOf("sysdisabled") === -1 &&
                            key.indexOf("systag") === -1 &&
                            key.indexOf("sysdec") === -1) {
                            var columnIsDate = false;
                            var columnIsComboBox = false;
                            var columnIsColumnComboBox = false;
                            for (var i = 0; i < grid.columns.length; i++) {
                                if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                    columnIsDate = true;
                                    break;
                                }
                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                    columnIsComboBox = true;
                                    break;
                                }
                                if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                    columnIsColumnComboBox = true;
                                    break;
                                }
                            }
                            if (columnIsDate) {
                                currentSelectedItem = currentSelectedItem + gridInternal_6.convertDateForGridOutput(value) + "|";
                            }
                            else if (columnIsComboBox) {
                                currentSelectedItem = currentSelectedItem + value.key + "|";
                            }
                            else if (columnIsColumnComboBox) {
                                currentSelectedItem = currentSelectedItem + value.value + "|";
                            }
                            else {
                                currentSelectedItem = currentSelectedItem + value + "|";
                            }
                        }
                        else {
                            if (key.indexOf("systag") > 0) {
                                systagInfo = systagInfo + key + "='" + value + "';";
                            }
                        }
                    });
                    if (systagInfo) {
                        currentSelectedItem = currentSelectedItem + "{{" + systagInfo + "}}";
                    }
                    interopHelper.eventTrigged(fieldName, currentSelectedItem, "", "", "gridCommandDeleteClicked", function (e) { }, function (e) { });
                }
            }
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "gridCommandDeleteClicked");
        }
    };
    AvantiGridsClass.prototype.refreshGridList = function (dataIn) {
        try {
            var interopHelper = this.interopInternal;
            var gridInternal_7 = this;
            var listView = JSON.parse(dataIn.GridData);
            var gridDivs = $('*[data-sysprogridfieldname="' + dataIn.FieldName + '"]');
            var returnRows = 0;
            $.each(gridDivs, function (index) {
                var gridDiv = $(this);
                var sysproPageSize = gridDiv.data("syspropagesize");
                var columnModel = gridDiv.data("sysprogridmodel");
                var dateColumnsHolder = gridDiv.data("sysprogriddates");
                var parseDates = function (data) {
                    $.each(data, function (index, item) {
                        $.each(dateColumnsHolder, function (index) {
                            item[this] = kendo.parseDate(item[this], gridDiv.data("dateformatin"));
                        });
                    });
                    return data;
                };
                var initialGrouping = gridDiv.data("sysproinitialgrouping");
                var initialSorting = gridDiv.data("sysproinitialsorting");
                var initialAggregates = gridDiv.data("sysproinitialaggregates");
                var kendoGridScroll = gridDiv.data("sysprokendogridscroll");
                var dataSource = new kendo.data.DataSource({
                    data: listView.lv.rs.r,
                    group: initialGrouping,
                    sort: initialSorting,
                    aggregate: initialAggregates,
                    change: function (e) {
                        if (e.field && e.action == "itemchange") { }
                    },
                    pageSize: sysproPageSize,
                    schema: {
                        parse: function (data) {
                            return parseDates(data);
                        },
                        model: {
                            fields: columnModel
                        }
                    }
                });
                var grid = gridDiv.data("kendoGrid");
                var gridSort;
                if (grid) {
                    var gridOptions = grid.getOptions();
                    var currentToolbar = $(".k-grid-toolbar", gridDiv.closest(".noBorderTable")).html();
                    gridSort = grid.dataSource.sort();
                    if (listView.lv.cls && listView.lv.cls.cl) {
                        for (i = 0; i < listView.lv.cls.cl.length; i++) {
                            var linkColumnName = listView.lv.cls.cl[i].col;
                            var linkColumnEvent = listView.lv.cls.cl[i].event;
                            for (var j = 0; j < gridOptions.columns.length; j++) {
                                if (linkColumnName === gridOptions.columns[j].field) {
                                    if (gridOptions.columns[j].type === "boolean" || gridOptions.columns[j].type === "date")
                                        break;
                                    var defaultTemplate = '#=' + linkColumnName + '#';
                                    if (gridOptions.columns[j].template && gridOptions.columns[j].template.indexOf("syspro-grid-row-hyperlink") < 0) {
                                        defaultTemplate = gridOptions.columns[j].template;
                                    }
                                    gridOptions.columns[j].template = '<div class="syspro-grid-row-hyperlink" data-eventnum="' + gridOptions.columns[j].field + "|" + linkColumnEvent + '">' + defaultTemplate + '</div>';
                                    break;
                                }
                            }
                        }
                        gridOptions.toolbar = currentToolbar,
                            grid.setOptions(gridOptions);
                    }
                    if (dataIn.IsAppend === true) {
                        var currentLinesInGrid = grid.dataSource.data().toJSON();
                        var newLinesToAppend = currentLinesInGrid.concat(listView.lv.rs.r);
                        dataSource = new kendo.data.DataSource({
                            data: newLinesToAppend,
                            group: initialGrouping,
                            sort: initialSorting,
                            aggregate: initialAggregates,
                            pageSize: sysproPageSize,
                            schema: {
                                parse: function (data) {
                                    return parseDates(data);
                                },
                                model: {
                                    fields: columnModel
                                }
                            }
                        });
                        var commentRows = gridDiv.data("sysprocommentrows");
                        if (!commentRows) {
                            gridDiv.data("sysprocommentrows", listView.lv.mss);
                        }
                        else {
                            if (listView.lv.mss) {
                                for (var i = 0; i < listView.lv.mss.ms.length; i++) {
                                    commentRows.ms.push(listView.lv.mss.ms[i]);
                                }
                                gridDiv.data("sysprocommentrows", commentRows);
                            }
                        }
                    }
                    else {
                        dataSource = new kendo.data.DataSource({
                            data: listView.lv.rs.r,
                            group: initialGrouping,
                            sort: initialSorting,
                            aggregate: initialAggregates,
                            pageSize: sysproPageSize,
                            change: function (e) { },
                            schema: {
                                parse: function (data) {
                                    return parseDates(data);
                                },
                                model: {
                                    fields: columnModel
                                }
                            }
                        });
                        if (!listView.lv.mss)
                            gridDiv.data("sysprocommentrows", {
                                "ms": []
                            });
                        else
                            gridDiv.data("sysprocommentrows", listView.lv.mss);
                    }
                    grid.setDataSource(dataSource);
                    gridDiv.data("sysprolastcellcloseselector", "");
                    if (dataIn.IsAppend === true) {
                        if (grid.options.editable.createAt === "bottom") {
                            if (grid.dataSource.total() > sysproPageSize) {
                                kendoGridScroll.scrollTo(grid.dataSource.total() - 1);
                                setTimeout(function () {
                                    var lastRow = grid.tbody.children().last();
                                    if (lastRow && lastRow.length) {
                                        var cellIndex = $(".editable-cell", lastRow[0]).index();
                                        if (cellIndex >= 0) {
                                            lastRow.data("sysignorerowselectedevent", true);
                                            gridDiv.data("sysproscrolltonewrow", true);
                                            if (lastRow.index() >= 0) {
                                                grid.select(lastRow);
                                                try {
                                                    grid.editCell(grid.tbody.find("tr:eq(" + lastRow.index() + ") td:eq(" + cellIndex + ")"));
                                                }
                                                catch (e) {
                                                }
                                            }
                                        }
                                    }
                                }, 500);
                            }
                            else {
                                var lastRow = grid.tbody.children().last();
                                if (lastRow && lastRow.length) {
                                    var cellIndex = $(".editable-cell", lastRow[0]).index();
                                    if (cellIndex >= 0) {
                                        lastRow.data("sysignorerowselectedevent", true);
                                        gridDiv.data("sysproscrolltonewrow", true);
                                        if (lastRow.index() >= 0) {
                                            grid.select(lastRow);
                                            try {
                                                grid.editCell(grid.tbody.find("tr:eq(" + lastRow.index() + ") td:eq(" + cellIndex + ")"));
                                            }
                                            catch (e) {
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    returnRows = grid.dataSource.total();
                    if (grid.options.editable.createAt === "bottom") {
                        gridDiv.closest(".noBorderTable").find("table").off("keydown");
                        gridDiv.closest(".noBorderTable").find("table").on("keydown", gridInternal_7.gridEditableKeyDown);
                    }
                }
                var sysprohashiddenrows = gridDiv.data("sysprohashiddenrows");
                if (sysprohashiddenrows) {
                    var hiddenRows = {
                        logic: 'and',
                        filters: []
                    };
                    hiddenRows.filters.push({
                        field: 'syshidden',
                        operator: 'neq',
                        value: true
                    });
                    grid.dataSource.filter(hiddenRows);
                }
            });
            return returnRows;
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "refreshGridList");
        }
    };
    AvantiGridsClass.prototype.addCommentMessageToGrid = function (grid, gridDiv) {
        try {
            var gridInternal = this;
            var commentRows = gridDiv.data("sysprocommentrows");
            if (commentRows && commentRows.ms) {
                for (var i = 0; i < commentRows.ms.length; i++) {
                    var messageItem = commentRows.ms[i];
                    var itemRowNumber = messageItem.row - 1;
                    var itemColumnName = messageItem.col;
                    var itemColumnIndex = 0;
                    for (var j = 0; j < grid.columns.length; j++) {
                        if (grid.columns[j].field === itemColumnName) {
                            itemColumnIndex = j;
                            break;
                        }
                    }
                    var item = grid.dataSource.data()[itemRowNumber];
                    if (item) {
                        var row = grid.table.find("tr[data-uid='" + item.uid + "']");
                        var container = row.find("td:eq(" + itemColumnIndex + ")");
                        container.removeClass("editable-cell");
                        var htmlIn = '<span class="gridlist-cell-comment" tabindex="0" ></span><span class="truncatedComment"></span><span class="comment" data-columnuid="' + item.uid + ' "data-columnname="' + itemColumnName + '">' + item[itemColumnName] + '</span>';
                        container.html(htmlIn);
                        container.addClass("comment-click-activation");
                        var collectionRow = item["colDisabled"];
                        if (!collectionRow || collectionRow === "undefined") {
                            item["colDisabled"] = "";
                        }
                        collectionRow = item["colDisabled"];
                        if (collectionRow[collectionRow.length - 1] !== "|") {
                            collectionRow = collectionRow + "|";
                        }
                        if (collectionRow.includes(itemColumnName)) {
                            collectionRow = collectionRow.replace("|" + itemColumnName, '');
                        }
                        if (collectionRow.slice(-1) === "|") {
                            collectionRow = collectionRow + itemColumnName;
                        }
                        else {
                            collectionRow = collectionRow + "|" + itemColumnName;
                        }
                        item["colDisabled"] = collectionRow;
                    }
                }
                gridInternal.initializeComments(gridDiv);
            }
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "addCommentMessageToGrid");
        }
    };
    AvantiGridsClass.prototype.applyCheckBoxContentChangeEvent = function (gridDiv) {
        try {
            var interopHelper_3 = this.interopInternal;
            var gridInternal_8 = this;
            $(gridDiv.closest(".noBorderTable")).off("change", "input.sysEditGridCheckBox");
            $(gridDiv.closest(".noBorderTable")).on("change", "input.sysEditGridCheckBox", function (e) {
                var grid = gridDiv.data("kendoGrid");
                if (gridDiv.data("sysproentrygriddisabled") !== true) {
                    var row = $(e.target).closest("tr");
                    row.data("sysignorerowselectedevent", true);
                    var currentDataItem = grid.dataItem($(e.target).closest("tr"));
                    grid.select(currentDataItem);
                    var dsRowIndex = grid.dataSource.indexOf(currentDataItem);
                    var rowIdx = $("tr", grid.tbody).index(row);
                    var colIdx = $("td", row).index(e.target.parentElement);
                    if (grid._group === true) {
                        colIdx = colIdx - grid.dataSource.group().length;
                    }
                    var colName = grid.columns[colIdx].field;
                    currentDataItem[colName] = this.checked;
                    grid.select("tr:eq(" + rowIdx + ")");
                    currentDataItem = grid.dataSource.data()[dsRowIndex];
                    var changedRowsEvent = gridDiv.data("sysprogridchangedrows");
                    if (dsRowIndex >= 0) {
                        if (changedRowsEvent.indexOf(dsRowIndex) === -1) {
                            changedRowsEvent.push(dsRowIndex);
                            gridDiv.data("sysprogridchangedrows", changedRowsEvent);
                        }
                    }
                    dsRowIndex++;
                    rowIdx++;
                    var isLastRow = false;
                    if (rowIdx == grid.dataSource.total()) {
                        isLastRow = true;
                    }
                    var returnChangeEventData = dsRowIndex + "|" + isLastRow + "|" + colName + "|" + this.checked + "|";
                    if (currentDataItem !== null) {
                        var columnDetails = currentDataItem.toJSON();
                        var systagInfo = null;
                        $.each(columnDetails, function (key, value) {
                            if (key.indexOf("syscolor") === -1 &&
                                key.indexOf("sysbgcolor") === -1 &&
                                key.indexOf("sysbold") === -1 &&
                                key.indexOf("sysdisabled") === -1 &&
                                key.indexOf("systag") === -1 &&
                                key.indexOf("sysdec") === -1) {
                                var columnIsDate = false;
                                var columnIsComboBox = false;
                                var columnIsColumnComboBox = false;
                                for (var i = 0; i < grid.columns.length; i++) {
                                    if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                        columnIsDate = true;
                                        break;
                                    }
                                    if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                        columnIsComboBox = true;
                                        break;
                                    }
                                    if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                        columnIsColumnComboBox = true;
                                        break;
                                    }
                                }
                                if (columnIsDate) {
                                    returnChangeEventData += gridInternal_8.convertDateForGridOutput(value) + "|";
                                }
                                else if (columnIsComboBox) {
                                    returnChangeEventData += value.key + "|";
                                }
                                else if (columnIsColumnComboBox) {
                                    returnChangeEventData += value.value + "|";
                                }
                                else {
                                    returnChangeEventData += value + "|";
                                }
                            }
                            else {
                                if (key.indexOf("systag") > 0) {
                                    systagInfo = systagInfo + key + "='" + value + "';";
                                }
                            }
                        });
                        if (systagInfo) {
                            returnChangeEventData += "{{" + systagInfo + "}}";
                        }
                        if (gridDiv.data("sysprogridreturnpreviousvalue")) {
                            if (gridDiv.data("sysprogridreturnpreviousvalue") === true) {
                                var previousValue = e.target.checked;
                                returnChangeEventData += "##" + !previousValue + "##";
                                gridDiv.data("sysprogridpreviousvalue", "");
                            }
                        }
                    }
                    var fieldName = gridDiv.data("sysprogridfieldname");
                    interopHelper_3.eventTrigged(fieldName, returnChangeEventData, "", "", "gridCellChanged", function (e) { }, false);
                    gridInternal_8.gridAutoCheckGridColumnHeader(gridDiv);
                }
                else {
                    var checkValue = e.target.checked;
                    checkValue = !checkValue;
                    e.target.checked = checkValue;
                }
            });
            $(".header-checkbox", gridDiv.closest(".noBorderTable")).off("click");
            $(".header-checkbox", gridDiv.closest(".noBorderTable")).on("click", function (ev) {
                ev.stopPropagation();
                var columnName = ev.target.getAttribute("data-columnname");
                var columnChecked = ev.target.checked;
                if (gridDiv.data("sysproentrygriddisabled") !== true) {
                    var grid = gridDiv.data("kendoGrid");
                    var changedRowsEvent = gridDiv.data("sysprogridchangedrows");
                    $.each(grid.dataSource.data(), function (rowIndex) {
                        var dataItem = grid.dataSource.at(rowIndex);
                        if (rowIndex >= 0) {
                            if (changedRowsEvent.indexOf(rowIndex) === -1) {
                                changedRowsEvent.push(rowIndex);
                            }
                        }
                        if (grid.options.editable.mode === "incell") {
                            dataItem[columnName] = columnChecked;
                        }
                        else {
                            dataItem.set(columnName, columnChecked);
                        }
                    });
                    gridDiv.data("sysprogridchangedrows", changedRowsEvent);
                    grid.refresh();
                    var returnChangeEventData = columnName + "|" + columnChecked;
                    var fieldName = gridDiv.data("sysprogridfieldname");
                    interopHelper_3.eventTrigged(fieldName, returnChangeEventData, "", "", "gridHeaderChecked", function (e) { }, false);
                    setTimeout(function () {
                        ev.target.checked = ev.target.checked;
                    });
                }
                else {
                    var checkValue = ev.target.checked;
                    checkValue = !checkValue;
                    ev.target.checked = checkValue;
                }
            });
            gridInternal_8.gridAutoCheckGridColumnHeader(gridDiv);
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "applyContentChangeEvent");
        }
    };
    AvantiGridsClass.prototype.gridAutoCheckGridColumnHeader = function (gridDiv) {
        if (gridDiv) {
            var grid = gridDiv.data("kendoGrid");
            if (grid) {
                var gridColumns = grid.columns;
                var gridColumnsResults = $.grep(gridColumns, function (d) {
                    return d["showInCheckBoxHeader"] === true;
                });
                if (gridColumnsResults) {
                    if (gridColumnsResults.length > 0) {
                        for (var i = 0; i < gridColumnsResults.length; i++) {
                            var checkBoxColumn = $("input[data-columnname='" + gridColumnsResults[i].field + "']", gridDiv.closest(".noBorderTable"));
                            if (checkBoxColumn) {
                                if (checkBoxColumn[0]) {
                                    var gridData = grid.dataSource.data();
                                    if (gridData.length > 0) {
                                        var matchingResults = $.grep(gridData, function (d) {
                                            return d[gridColumnsResults[i].field] === false;
                                        });
                                        if (matchingResults) {
                                            if (matchingResults.length == 0) {
                                                checkBoxColumn[0].checked = true;
                                            }
                                            else {
                                                checkBoxColumn[0].checked = false;
                                            }
                                        }
                                    }
                                    else {
                                        checkBoxColumn[0].checked = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    AvantiGridsClass.prototype.requestGridListsRefresh = function (elementIn) {
        var interopHelper = this.interopInternal;
        if ($(".syspro-grid-list", elementIn).length > 0) {
            $.each($(".syspro-grid-list", elementIn), function (index) {
                var GridOptions = $(this).data("kendoGrid").getOptions();
                GridOptions.toolbar = $(".k-grid-toolbar", $(this).closest(".noBorderTable")).html();
                $(this).data("kendoGrid").setOptions(GridOptions);
                var sysprogridfieldname = $(this).data("sysprogridfieldname");
                interopHelper.eventTrigged(sysprogridfieldname, "", "", "", "requestGridListRefresh", function (e) { }, false);
            });
        }
    };
    AvantiGridsClass.prototype.sysCellClick = function (item) {
        var gridInternal = this;
        var interopHelper = this.interopInternal;
        var eventNumber = $(item).data("eventnum");
        if (item.className === "syspro-grid-row-hyperlink") {
            var gridDiv = $(item).closest(".syspro-grid-list");
            var grid = gridDiv.data("kendoGrid");
            var fieldName = gridDiv.data("sysprogridfieldname");
            var row = grid.dataItem($(item).closest("tr"));
            var rowTr = $(item).closest("tr");
            rowTr.data("sysignorerowselectedevent", true);
            var columnDetails = row.toJSON();
            var dsRowIndex = grid.dataSource.indexOf(row);
            var currentSelectedItem = (dsRowIndex + 1) + "|";
            var currentDataItem = row;
            var systagInfo = null;
            if (currentDataItem !== null) {
                $.each(columnDetails, function (key, value) {
                    if (key.indexOf("syscolor") === -1 &&
                        key.indexOf("sysbgcolor") === -1 &&
                        key.indexOf("sysbold") === -1 &&
                        key.indexOf("sysdisabled") === -1 &&
                        key.indexOf("systag") === -1 &&
                        key.indexOf("sysdec") === -1) {
                        var columnIsDate = false;
                        var columnIsComboBox = false;
                        var columnIsColumnComboBox = false;
                        for (var i = 0; i < grid.columns.length; i++) {
                            if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                columnIsDate = true;
                                break;
                            }
                            if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                columnIsComboBox = true;
                                break;
                            }
                            if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                columnIsColumnComboBox = true;
                                break;
                            }
                        }
                        if (columnIsDate) {
                            currentSelectedItem = currentSelectedItem + gridInternal.convertDateForGridOutput(value) + "|";
                        }
                        else if (columnIsComboBox) {
                            currentSelectedItem = currentSelectedItem + value.key + "|";
                        }
                        else if (columnIsColumnComboBox) {
                            currentSelectedItem = currentSelectedItem + value.value + "|";
                        }
                        else {
                            currentSelectedItem = currentSelectedItem + value + "|";
                        }
                    }
                    else {
                        if (key.indexOf("systag") > 0) {
                            systagInfo = systagInfo + key + "='" + value + "';";
                        }
                    }
                });
                if (systagInfo) {
                    currentSelectedItem = currentSelectedItem + "{{" + systagInfo + "}}";
                }
                interopHelper.eventTrigged(fieldName, currentSelectedItem, "", "", "gridRowSelected", function (e) {
                    var sysCellClickResult = eventNumber + "|";
                    var systagInfo = null;
                    $.each(columnDetails, function (key, value) {
                        if (key.indexOf("syscolor") === -1 &&
                            key.indexOf("sysbgcolor") === -1 &&
                            key.indexOf("sysbold") === -1 &&
                            key.indexOf("sysdisabled") === -1 &&
                            key.indexOf("systag") === -1 &&
                            key.indexOf("sysdec") === -1) {
                            var columnIsDate = false;
                            var columnIsComboBox = false;
                            var columnIsColumnComboBox = false;
                            for (var i = 0; i < grid.columns.length; i++) {
                                if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                    columnIsDate = true;
                                    break;
                                }
                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                    columnIsComboBox = true;
                                    break;
                                }
                                if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                    columnIsColumnComboBox = true;
                                    break;
                                }
                            }
                            if (columnIsDate) {
                                sysCellClickResult = sysCellClickResult + gridInternal.convertDateForGridOutput(value) + "|";
                            }
                            else if (columnIsComboBox) {
                                sysCellClickResult = sysCellClickResult + value.key + "|";
                            }
                            else if (columnIsColumnComboBox) {
                                sysCellClickResult = sysCellClickResult + value.value + "|";
                            }
                            else {
                                sysCellClickResult = sysCellClickResult + value + "|";
                            }
                        }
                        else {
                            if (key.indexOf("systag") > 0) {
                                systagInfo = systagInfo + key + "='" + value + "';";
                            }
                        }
                    });
                    if (systagInfo) {
                        sysCellClickResult = sysCellClickResult + "{{" + systagInfo + "}}";
                    }
                    interopHelper.eventTrigged(fieldName, sysCellClickResult, "", "", "gridHyperlinkClicked", function (e) { }, function (e) { });
                    grid.select(row);
                }, function (e) { });
            }
        }
    };
    AvantiGridsClass.prototype.gridRequestInternalEvent = function (dataIn) {
        try {
            var interopHelper = this.interopInternal;
            var gridHelper_2 = this;
            var gridDivs = $('*[data-sysprogridfieldname="' + dataIn.FieldName + '"]:visible');
            if (gridDivs.length === 0) {
                gridDivs = $('*[data-sysprogridfieldname="' + dataIn.FieldName + '"]');
            }
            var currentSelectedItem = "";
            var dataItem;
            var SplitInternalEventParameter;
            if (gridDivs.length > 0 || dataIn.InternalEvent === "GetGridLayoutsChanged") {
                var grid = gridDivs.data("kendoGrid");
                if (grid || dataIn.InternalEvent === "GetGridLayoutsChanged") {
                    switch (dataIn.InternalEvent) {
                        case "GetSelectedRow":
                            currentSelectedItem = "false";
                            if (grid.dataItem !== null) {
                                var selectedItem = grid.dataItem(grid.select());
                                if (selectedItem !== null) {
                                    currentSelectedItem = (grid.dataSource.indexOf(selectedItem) + 1) + "|";
                                    var columnDetails = selectedItem.toJSON();
                                    var systagInfo = null;
                                    $.each(columnDetails, function (key, value) {
                                        if (key.indexOf("syscolor") === -1 &&
                                            key.indexOf("sysbgcolor") === -1 &&
                                            key.indexOf("sysbold") === -1 &&
                                            key.indexOf("sysdisabled") === -1 &&
                                            key.indexOf("systag") === -1 &&
                                            key.indexOf("sysdec") === -1) {
                                            var columnIsDate = false;
                                            var columnIsComboBox = false;
                                            var columnIsColumnComboBox = false;
                                            for (i = 0; i < grid.columns.length; i++) {
                                                if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                            if (columnIsDate) {
                                                currentSelectedItem = currentSelectedItem + gridHelper_2.convertDateForGridOutput(value) + "|";
                                            }
                                            else if (columnIsComboBox) {
                                                currentSelectedItem = currentSelectedItem + value.key + "|";
                                            }
                                            else if (columnIsColumnComboBox) {
                                                currentSelectedItem = currentSelectedItem + value.value + "|";
                                            }
                                            else {
                                                currentSelectedItem = currentSelectedItem + value + "|";
                                            }
                                        }
                                        else {
                                            if (key.indexOf("systag") > 0) {
                                                systagInfo = systagInfo + key + "='" + value + "';";
                                            }
                                        }
                                    });
                                    if (systagInfo) {
                                        currentSelectedItem = currentSelectedItem + "{{" + systagInfo + "}}";
                                    }
                                }
                            }
                            break;
                        case "RefreshGrid":
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                grid.refresh();
                                var initialAggregates = gridDiv.data("sysproinitialaggregates");
                                if (initialAggregates) {
                                    grid.dataSource.fetch();
                                }
                            });
                            break;
                        case "Size":
                            currentSelectedItem = grid.dataSource.total() + "|";
                            break;
                        case "InsertRowAt":
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                var grid = gridDiv.data("kendoGrid");
                                var updateRowDetails = JSON.parse(dataIn.InternalEventParameter);
                                var rowIndex = updateRowDetails.updateinfo.row;
                                rowIndex = rowIndex - 1;
                                grid.dataSource.insert(rowIndex, updateRowDetails.lv.r);
                                for (j = 0; j < grid.columns.length; j++) {
                                    if (grid.columns[j].type === "date") {
                                        var columnDateValue = grid.dataSource.data()[rowIndex][grid.columns[j].field];
                                        var columnDateObj = kendo.parseDate(columnDateValue, gridDiv.data("dateformatin"));
                                        grid.dataSource.data()[rowIndex][grid.columns[j].field] = columnDateObj;
                                    }
                                }
                                grid.refresh();
                            });
                            break;
                        case "SetCheckMarkOnColumnMatch":
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                                var selectedItem = grid.dataItem(grid.select());
                                var valueToUpdate;
                                if (SplitInternalEventParameter[1] === "true") {
                                    valueToUpdate = true;
                                }
                                else {
                                    valueToUpdate = false;
                                }
                                var isBoolean = false;
                                var itemCellIndex = 0;
                                for (j = 0; j < grid.columns.length; j++) {
                                    if (grid.columns[j].field === SplitInternalEventParameter[0]) {
                                        itemCellIndex = j;
                                        if (grid.columns[j].type === "boolean") {
                                            isBoolean = true;
                                        }
                                        break;
                                    }
                                }
                                if (isBoolean) {
                                    var columnToMatch = SplitInternalEventParameter[2];
                                    var valueToMatch = SplitInternalEventParameter[3];
                                    var gridData = grid.dataSource.data();
                                    var matchingResults = $.grep(gridData, function (d) {
                                        return d[columnToMatch] === valueToMatch;
                                    });
                                    var changedRowsEvent = gridDiv.data("sysprogridchangedrows");
                                    if (matchingResults) {
                                        if (matchingResults.length > 0) {
                                            for (var i = 0; i < matchingResults.length; i++) {
                                                var rowIndex = grid.dataSource.indexOf(matchingResults[i]);
                                                if (rowIndex >= 0) {
                                                    if (changedRowsEvent.indexOf(rowIndex) === -1) {
                                                        changedRowsEvent.push(rowIndex);
                                                    }
                                                }
                                                matchingResults[i].set(SplitInternalEventParameter[0], valueToUpdate);
                                                if (grid.options.editable.mode === "incell") {
                                                    matchingResults[i][SplitInternalEventParameter[0]] = valueToUpdate;
                                                }
                                            }
                                            gridDiv.data("sysprogridchangedrows", changedRowsEvent);
                                            var scrollPosition = grid.content.scrollTop();
                                            gridDiv.data("sysproscrolltoselectionvalue", scrollPosition);
                                            var CollapsedGroups = gridHelper_2.collectCollapsedGroups(grid);
                                            gridDiv.data("sysprocollapsedgroups", CollapsedGroups);
                                            grid.refresh();
                                            gridDiv.data("sysproscrolltoselection", true);
                                            gridDiv.data("sysprocollapsedgroupsflag", true);
                                            grid.select("tr[data-uid='" + selectedItem.uid + "']");
                                        }
                                    }
                                }
                            });
                            break;
                        case "SetSelectedCheckMark":
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                                var valueToUpdate;
                                if (SplitInternalEventParameter[1] === "true") {
                                    valueToUpdate = true;
                                }
                                else {
                                    valueToUpdate = false;
                                }
                                var isBoolean = false;
                                var itemCellIndex = 0;
                                for (j = 0; j < grid.columns.length; j++) {
                                    if (grid.columns[j].field === SplitInternalEventParameter[0]) {
                                        itemCellIndex = j;
                                        if (grid.columns[j].type === "boolean") {
                                            isBoolean = true;
                                        }
                                        break;
                                    }
                                }
                                if (isBoolean) {
                                    var selectedItem = grid.dataItem(grid.select());
                                    if (selectedItem) {
                                        var itemRowNumber = grid.dataSource.indexOf(selectedItem);
                                        selectedItem.set(SplitInternalEventParameter[0], valueToUpdate);
                                        selectedItem.dirtyFields = {};
                                        selectedItem.dirty = false;
                                        if (isBoolean === true && grid.options.editable.mode === "incell") {
                                            selectedItem[SplitInternalEventParameter[0]] = valueToUpdate;
                                        }
                                        var changedRowsEvent = gridDiv.data("sysprogridchangedrows");
                                        if (itemRowNumber >= 0) {
                                            if (changedRowsEvent.indexOf(itemRowNumber) === -1) {
                                                changedRowsEvent.push(itemRowNumber);
                                                gridDiv.data("sysprogridchangedrows", changedRowsEvent);
                                            }
                                        }
                                        var scrollPosition = grid.content.scrollTop();
                                        gridDiv.data("sysproscrolltoselectionvalue", scrollPosition);
                                        var CollapsedGroups = gridHelper_2.collectCollapsedGroups(grid);
                                        gridDiv.data("sysprocollapsedgroups", CollapsedGroups);
                                        grid.refresh();
                                        gridDiv.data("sysproscrolltoselection", true);
                                        gridDiv.data("sysprocollapsedgroupsflag", true);
                                        grid.select("tr[data-uid='" + selectedItem.uid + "']");
                                    }
                                }
                            });
                            break;
                        case "GetCellValue":
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            dataItem = grid.dataSource.data()[SplitInternalEventParameter[0]];
                            if (dataItem !== null) {
                                currentSelectedItem = dataItem.get(SplitInternalEventParameter[1]) + "|";
                            }
                            break;
                        case "SetCellValue":
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                                var itemRowNumber = SplitInternalEventParameter[0] - 1;
                                var valueToUpdate;
                                if (grid) {
                                    dataItem = grid.dataSource.data()[itemRowNumber];
                                    if (dataItem !== null) {
                                        if (SplitInternalEventParameter[2] === "true") {
                                            valueToUpdate = true;
                                        }
                                        else if (SplitInternalEventParameter[2] === "false") {
                                            valueToUpdate = false;
                                        }
                                        else {
                                            valueToUpdate = SplitInternalEventParameter[2];
                                        }
                                        dataItem.set(SplitInternalEventParameter[1], valueToUpdate);
                                        dataItem.dirtyFields = {};
                                        dataItem.dirty = false;
                                        var itemCellIndex = 0;
                                        var isBoolean = false;
                                        var isEditable = true;
                                        for (j = 0; j < grid.columns.length; j++) {
                                            if (grid.columns[j].field === SplitInternalEventParameter[1]) {
                                                itemCellIndex = j;
                                                if (grid.columns[j].type === "boolean") {
                                                    isBoolean = true;
                                                }
                                                if (grid.columns[j].editable === false) {
                                                    isEditable = false;
                                                }
                                                break;
                                            }
                                        }
                                        if (isBoolean === true && grid.options.editable.mode === "incell") {
                                            dataItem[SplitInternalEventParameter[1]] = valueToUpdate;
                                        }
                                        if (isEditable == false) {
                                            dataItem[SplitInternalEventParameter[1]] = valueToUpdate;
                                        }
                                        var changedRowsEvent = gridDiv.data("sysprogridchangedrows");
                                        if (itemRowNumber >= 0) {
                                            if (changedRowsEvent.indexOf(itemRowNumber) === -1) {
                                                changedRowsEvent.push(itemRowNumber);
                                                gridDiv.data("sysprogridchangedrows", changedRowsEvent);
                                            }
                                        }
                                        var item = grid.dataSource.data()[itemRowNumber];
                                        var rowTr = grid.table.find("tr[data-uid='" + item.uid + "']");
                                        var colTd = rowTr.find("td:eq(" + itemCellIndex + ")");
                                        if (colTd.hasClass("k-dirty-cell")) {
                                            colTd.removeClass("k-dirty-cell");
                                            if (colTd[0].childNodes[0]) {
                                                if (colTd[0].childNodes[0].className === "k-dirty") {
                                                    colTd[0].childNodes[0].remove();
                                                }
                                            }
                                        }
                                        if (SplitInternalEventParameter.length > 2) {
                                            if (SplitInternalEventParameter[3] === "true") {
                                                grid.editCell(grid.tbody.find("tr:eq(" + itemRowNumber + ") td:eq(" + itemCellIndex + ")"));
                                                grid.select();
                                                rowTr.addClass("k-state-selected");
                                            }
                                        }
                                    }
                                }
                                var scrollPosition = grid.content.scrollTop();
                                gridDiv.data("sysproscrolltoselectionvalue", scrollPosition);
                                var CollapsedGroups = gridHelper_2.collectCollapsedGroups(grid);
                                gridDiv.data("sysprocollapsedgroups", CollapsedGroups);
                                grid.refresh();
                                gridDiv.data("sysproscrolltoselection", true);
                                gridDiv.data("sysprocollapsedgroupsflag", true);
                                grid.select("tr[data-uid='" + dataItem.uid + "']");
                                if (isBoolean === false) {
                                    var initialAggregates = gridDiv.data("sysproinitialaggregates");
                                    if (initialAggregates) {
                                        grid.dataSource.fetch();
                                    }
                                }
                            });
                            break;
                        case "SetCellValueKeepDirty":
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                if (grid) {
                                    SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                                    var itemRowNumber = SplitInternalEventParameter[0] - 1;
                                    dataItem = grid.dataSource.data()[itemRowNumber];
                                    if (dataItem !== null) {
                                        dataItem.set(SplitInternalEventParameter[1], SplitInternalEventParameter[2]);
                                    }
                                    var rowIndex = SplitInternalEventParameter[0];
                                    var cellIndex = SplitInternalEventParameter[3];
                                    setTimeout(function () {
                                        grid.editCell(grid.tbody.find("tr:eq(" + itemRowNumber + ") td:eq(" + cellIndex + ")"));
                                        var rowTr = grid.table.find("tr[data-uid='" + dataItem.uid + "']");
                                        rowTr.addClass("k-state-selected");
                                    });
                                }
                            });
                            break;
                        case "SetHeaders":
                            var setHeaderDetails = JSON.parse(dataIn.InternalEventParameter);
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                if (grid) {
                                    var gridOptions = grid.getOptions();
                                    if (gridOptions) {
                                        $.each(setHeaderDetails.lv.cs.c, function (mycs) {
                                            var columnName = setHeaderDetails.lv.cs.c[mycs].field;
                                            var columnValue = setHeaderDetails.lv.cs.c[mycs].title;
                                            var columnSearch = null;
                                            if (setHeaderDetails.lv.cs.c[mycs].search) {
                                                columnSearch = setHeaderDetails.lv.cs.c[mycs].search;
                                            }
                                            for (j = 0; j < gridOptions.columns.length; j++) {
                                                if (gridOptions.columns[j].field === columnName) {
                                                    if (columnValue === "") {
                                                        columnValue = "  ";
                                                    }
                                                    gridOptions.columns[j].title = columnValue;
                                                    if (columnSearch) {
                                                        gridOptions.columns[j].search = columnSearch;
                                                    }
                                                    break;
                                                }
                                            }
                                        });
                                        grid.setOptions(gridOptions);
                                    }
                                }
                            });
                            break;
                        case "FilterColumns":
                            var setFilterColumns = JSON.parse(dataIn.InternalEventParameter);
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                if (grid) {
                                    grid.dataSource.filter(setFilterColumns);
                                }
                            });
                            break;
                        case "GetGridRow":
                            var rowIndex = dataIn.InternalEventParameter;
                            rowIndex = rowIndex - 1;
                            var rowItem = grid.dataSource.at(rowIndex);
                            if (rowItem) {
                                currentSelectedItem = dataIn.InternalEventParameter + "|";
                                var systagInfo = null;
                                $.each(rowItem, function (key, value) {
                                    if (key.indexOf("syscolor") === -1 &&
                                        key.indexOf("sysbgcolor") === -1 &&
                                        key.indexOf("sysbold") === -1 &&
                                        key.indexOf("sysdisabled") === -1 &&
                                        key.indexOf("systag") === -1 &&
                                        key.indexOf("sysdec") === -1) {
                                        var columnFound = false;
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        var columnIsColumnComboBox = false;
                                        for (var i = 0; i < grid.columns.length; i++) {
                                            if (grid.columns[i].field === key) {
                                                columnFound = true;
                                                if (grid.columns[i].type === "date") {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (grid.columns[i].type === "combo" || grid.columns[i].type === "radio") {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (key.indexOf("systag") > 0) {
                                            systagInfo = systagInfo + key + "='" + value + "';";
                                        }
                                    }
                                    if (columnFound === true) {
                                        if (columnIsDate === true) {
                                            currentSelectedItem = currentSelectedItem + gridHelper_2.convertDateForGridOutput(value) + "|";
                                        }
                                        else if (columnIsComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.key + "|";
                                        }
                                        else if (columnIsColumnComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.value + "|";
                                        }
                                        else {
                                            currentSelectedItem += (value + "|");
                                        }
                                    }
                                    else {
                                        if (key === "syshidden") {
                                            currentSelectedItem = currentSelectedItem + "syshidden|";
                                        }
                                    }
                                });
                                if (systagInfo) {
                                    currentSelectedItem = currentSelectedItem + "{{" + systagInfo + "}}";
                                }
                            }
                            if (currentSelectedItem === "") {
                                currentSelectedItem = "false";
                            }
                            break;
                        case "GetAllGridRows":
                            var allGridRows = "";
                            var currentSelectedItem1 = "";
                            $.each(grid.dataSource.data(), function (rowIndex) {
                                var rowItem = grid.dataSource.at(rowIndex);
                                var oneBaseIndex = rowIndex + 1;
                                currentSelectedItem1 = oneBaseIndex + "|";
                                var systagInfo = null;
                                $.each(rowItem, function (key, value) {
                                    if (key.indexOf("syscolor") === -1 &&
                                        key.indexOf("sysbgcolor") === -1 &&
                                        key.indexOf("sysbold") === -1 &&
                                        key.indexOf("sysdisabled") === -1 &&
                                        key.indexOf("systag") === -1 &&
                                        key.indexOf("sysdec") === -1) {
                                        var columnFound = false;
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        var columnIsColumnComboBox = false;
                                        for (var i = 0; i < grid.columns.length; i++) {
                                            if (grid.columns[i].field === key) {
                                                columnFound = true;
                                                if (grid.columns[i].type === "date") {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (grid.columns[i].type === "combo" || grid.columns[i].type === "radio") {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (key.indexOf("systag") > 0) {
                                            systagInfo = systagInfo + key + "='" + value + "';";
                                        }
                                    }
                                    if (columnFound === true) {
                                        if (columnIsDate === true) {
                                            currentSelectedItem1 = currentSelectedItem1 + gridHelper_2.convertDateForGridOutput(value) + "|";
                                        }
                                        else if (columnIsComboBox) {
                                            currentSelectedItem1 = currentSelectedItem1 + value.key + "|";
                                        }
                                        else if (columnIsColumnComboBox) {
                                            currentSelectedItem1 = currentSelectedItem1 + value.value + "|";
                                        }
                                        else {
                                            currentSelectedItem1 += (value + "|");
                                        }
                                    }
                                    else {
                                        if (key === "syshidden") {
                                            currentSelectedItem1 = currentSelectedItem1 + "syshidden|";
                                        }
                                    }
                                });
                                if (systagInfo) {
                                    currentSelectedItem1 = currentSelectedItem1 + "{{" + systagInfo + "}}";
                                }
                                allGridRows = allGridRows + currentSelectedItem1 + "\r\n";
                            });
                            currentSelectedItem = allGridRows;
                            if (currentSelectedItem === "") {
                                currentSelectedItem = "false";
                            }
                            break;
                        case "GetAllChangedGridRows":
                            var allGridRows = "";
                            var currentSelectedItem1 = "";
                            var changedRows = gridDivs.data("sysprogridchangedrows");
                            if (changedRows) {
                                $.each(changedRows, function (rowIndex) {
                                    var rowItem = grid.dataSource.at(this);
                                    var oneBaseIndex = this + 1;
                                    currentSelectedItem1 = oneBaseIndex + "|";
                                    var systagInfo = null;
                                    $.each(rowItem, function (key, value) {
                                        if (key.indexOf("syscolor") === -1 &&
                                            key.indexOf("sysbgcolor") === -1 &&
                                            key.indexOf("sysbold") === -1 &&
                                            key.indexOf("sysdisabled") === -1 &&
                                            key.indexOf("systag") === -1 &&
                                            key.indexOf("sysdec") === -1) {
                                            var columnFound = false;
                                            var columnIsDate = false;
                                            var columnIsComboBox = false;
                                            var columnIsColumnComboBox = false;
                                            for (var i = 0; i < grid.columns.length; i++) {
                                                if (grid.columns[i].field === key) {
                                                    columnFound = true;
                                                    if (grid.columns[i].type === "date") {
                                                        columnIsDate = true;
                                                        break;
                                                    }
                                                    if (grid.columns[i].isCombbox) {
                                                        columnIsComboBox = true;
                                                        break;
                                                    }
                                                    if (grid.columns[i].type === "combo" || grid.columns[i].type === "radio") {
                                                        columnIsColumnComboBox = true;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if (key.indexOf("systag") > 0) {
                                                systagInfo = systagInfo + key + "='" + value + "';";
                                            }
                                        }
                                        if (columnFound === true) {
                                            if (columnIsDate === true) {
                                                currentSelectedItem1 = currentSelectedItem1 + gridHelper_2.convertDateForGridOutput(value) + "|";
                                            }
                                            else if (columnIsComboBox) {
                                                currentSelectedItem1 = currentSelectedItem1 + value.key + "|";
                                            }
                                            else if (columnIsColumnComboBox) {
                                                currentSelectedItem1 = currentSelectedItem1 + value.value + "|";
                                            }
                                            else {
                                                currentSelectedItem1 += (value + "|");
                                            }
                                        }
                                        else {
                                            if (key === "syshidden") {
                                                currentSelectedItem1 = currentSelectedItem1 + "syshidden|";
                                            }
                                        }
                                    });
                                    if (systagInfo) {
                                        currentSelectedItem1 = currentSelectedItem1 + "{{" + systagInfo + "}}";
                                    }
                                    allGridRows = allGridRows + currentSelectedItem1 + "\r\n";
                                });
                                currentSelectedItem = allGridRows;
                            }
                            if (currentSelectedItem === "") {
                                currentSelectedItem = "false";
                            }
                            break;
                        case "GetAllVisibleGridRows":
                            var allGridRows = "";
                            var currentSelectedItem1 = "";
                            var dataSource = grid.dataSource;
                            var filters = dataSource.filter();
                            var allData = dataSource.data();
                            var query = new kendo.data.Query(allData);
                            var filteredData = query.filter(filters).data;
                            $.each(filteredData, function (rowIndex) {
                                var rowItem = filteredData[rowIndex];
                                var oneBaseIndex = Number(rowIndex) + 1;
                                currentSelectedItem1 = oneBaseIndex + "|";
                                var systagInfo = null;
                                $.each(rowItem, function (key, value) {
                                    if (key.indexOf("syscolor") === -1 &&
                                        key.indexOf("sysbgcolor") === -1 &&
                                        key.indexOf("sysbold") === -1 &&
                                        key.indexOf("sysdisabled") === -1 &&
                                        key.indexOf("systag") === -1 &&
                                        key.indexOf("sysdec") === -1) {
                                        var columnFound = false;
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        var columnIsColumnComboBox = false;
                                        for (var i = 0; i < grid.columns.length; i++) {
                                            if (grid.columns[i].field === key) {
                                                columnFound = true;
                                                if (grid.columns[i].type === "date") {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (grid.columns[i].type === "combo" || grid.columns[i].type === "radio") {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (key.indexOf("systag") > 0) {
                                            systagInfo = systagInfo + key + "='" + value + "';";
                                        }
                                    }
                                    if (columnFound === true) {
                                        if (columnIsDate === true) {
                                            currentSelectedItem1 = currentSelectedItem1 + gridHelper_2.convertDateForGridOutput(value) + "|";
                                        }
                                        else if (columnIsComboBox) {
                                            currentSelectedItem1 += (value.key + "|");
                                        }
                                        else if (columnIsColumnComboBox) {
                                            currentSelectedItem1 += (value.value + "|");
                                        }
                                        else {
                                            currentSelectedItem1 += (value + "|");
                                        }
                                    }
                                    else {
                                        if (key === "syshidden") {
                                            currentSelectedItem1 += "syshidden|";
                                        }
                                    }
                                });
                                if (systagInfo) {
                                    currentSelectedItem1 += "{{" + systagInfo + "}}";
                                }
                                allGridRows = allGridRows + currentSelectedItem1 + "\r\n";
                            });
                            currentSelectedItem = allGridRows;
                            if (currentSelectedItem === "") {
                                currentSelectedItem = "false";
                            }
                            break;
                        case "UpdateGridRow":
                            var updateRowDetails = JSON.parse(dataIn.InternalEventParameter);
                            var rowIndex = updateRowDetails.updateinfo.row;
                            rowIndex = rowIndex - 1;
                            var doRefresh = false;
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                grid.closeCell();
                                var dataItem = grid.dataSource.data()[rowIndex];
                                var commentRows = gridDiv.data("sysprocommentrows");
                                if (!commentRows) {
                                    commentRows = {
                                        "ms": []
                                    };
                                }
                                var hasCommentCell = false;
                                if (dataItem) {
                                    $.each(updateRowDetails.lv.r, function (key, value) {
                                        if (value.key && value.val) {
                                            if (dataItem[key].key !== value.key || dataItem[key].value !== value.val) {
                                                dataItem[key].key = value.key;
                                                dataItem[key].value = value.val;
                                                dataItem[key].val = value.val;
                                                doRefresh = true;
                                            }
                                        }
                                        else {
                                            if (key == "commentCell") {
                                                var newComment = {
                                                    "row": "{0}",
                                                    "col": "{1}"
                                                };
                                                newComment.row = (rowIndex + 1) + "";
                                                newComment.col = value;
                                                commentRows.ms.push(newComment);
                                                hasCommentCell = true;
                                                doRefresh = true;
                                            }
                                            else {
                                                var columnIsDate = false;
                                                var columnIsColumnComboBox = false;
                                                for (var i = 0; i < grid.columns.length; i++) {
                                                    if (grid.columns[i].field === key) {
                                                        if (grid.columns[i].type === "date") {
                                                            columnIsDate = true;
                                                            break;
                                                        }
                                                        if (grid.columns[i].type === "combo") {
                                                            columnIsColumnComboBox = true;
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                            if (columnIsDate === true) {
                                                var dateObject = kendo.parseDate(value, gridDiv.data("dateformatin"));
                                                value = dateObject;
                                            }
                                            if (dataItem[key] !== value) {
                                                if (columnIsColumnComboBox === true) {
                                                    if (value.items) {
                                                        dataItem[key] = value;
                                                    }
                                                    else {
                                                        if (dataItem[key].items) {
                                                            dataItem[key].value = value;
                                                        }
                                                        else {
                                                            dataItem[key] = value;
                                                        }
                                                    }
                                                }
                                                else {
                                                    dataItem[key] = value;
                                                }
                                                doRefresh = true;
                                            }
                                        }
                                    });
                                    if (hasCommentCell) {
                                        gridDiv.data("sysprocommentrows", commentRows);
                                    }
                                    if (doRefresh) {
                                        grid.refresh();
                                    }
                                    var initialAggregates = gridDiv.data("sysproinitialaggregates");
                                    if (initialAggregates) {
                                        grid.dataSource.fetch();
                                    }
                                }
                                if (gridDiv.data("sysprohashiddenrows") == true) {
                                    rowIndex = grid.dataSource.indexOf(dataItem);
                                }
                                grid.select("tr:eq(" + rowIndex + ")");
                                if (gridDiv.data("sysprolastcellcloseselector") !== "") {
                                    var sysproLastCellCloseSelector = gridDiv.data("sysprolastcellcloseselector").split("|");
                                    try {
                                        grid.editCell(grid.tbody.find("tr:eq(" + sysproLastCellCloseSelector[0] + ") td:eq(" + sysproLastCellCloseSelector[1] + ")"));
                                    }
                                    catch (error) {
                                    }
                                }
                                var changedRowsEvent = gridDiv.data("sysprogridchangedrows");
                                if (rowIndex >= 0) {
                                    if (changedRowsEvent.indexOf(rowIndex) === -1) {
                                        changedRowsEvent.push(rowIndex);
                                        gridDiv.data("sysprogridchangedrows", changedRowsEvent);
                                    }
                                }
                            });
                            break;
                        case "BeginEditAt":
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            $.each(gridDivs, function (index) {
                                var rowIndex = SplitInternalEventParameter[0] - 1;
                                var cellItemName = SplitInternalEventParameter[1];
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                var dataItem = grid.dataSource.data()[rowIndex];
                                var row = grid.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                                grid.select(row);
                                if (gridDiv.data("sysprohashiddenrows") == true) {
                                    if (rowIndex < 0) {
                                        var currentDataItem = grid.dataItem(grid.select());
                                        rowIndex = grid.dataSource.indexOf(currentDataItem);
                                    }
                                }
                                var movedColumns = grid.getOptions().columns;
                                for (var i = 0; i < movedColumns.length; i++) {
                                    if (movedColumns[i].field == cellItemName) {
                                        cellIndex = i;
                                        break;
                                    }
                                }
                                setTimeout(function () {
                                    try {
                                        grid.editCell(grid.tbody.find("tr[data-uid='" + dataItem.uid + "'] td:eq(" + cellIndex + ")"));
                                    }
                                    catch (error) { }
                                }, 100);
                            });
                            break;
                        case "DeleteCurrentRow":
                            var selectedItem = grid.dataItem(grid.select());
                            if (selectedItem) {
                                var currentSelectedItem1 = String(grid.select().index() + 1);
                                currentSelectedItem1 = currentSelectedItem1 + "|";
                                var columnDetails = selectedItem.toJSON();
                                var systagInfo = null;
                                $.each(columnDetails, function (key, value) {
                                    if (key.indexOf("syscolor") === -1 &&
                                        key.indexOf("sysbgcolor") === -1 &&
                                        key.indexOf("sysbold") === -1 &&
                                        key.indexOf("sysdisabled") === -1 &&
                                        key.indexOf("systag") === -1 &&
                                        key.indexOf("sysdec") === -1) {
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        var columnIsColumnComboBox = false;
                                        for (var i = 0; i < grid.columns.length; i++) {
                                            if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                                columnIsDate = true;
                                                break;
                                            }
                                            if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                columnIsComboBox = true;
                                                break;
                                            }
                                            if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                                columnIsColumnComboBox = true;
                                                break;
                                            }
                                        }
                                        if (columnIsDate) {
                                            currentSelectedItem1 = currentSelectedItem1 + gridHelper_2.convertDateForGridOutput(value) + "|";
                                        }
                                        else if (columnIsComboBox) {
                                            currentSelectedItem1 = currentSelectedItem1 + value.key + "|";
                                        }
                                        else if (columnIsColumnComboBox) {
                                            currentSelectedItem1 = currentSelectedItem1 + value.value + "|";
                                        }
                                        else {
                                            currentSelectedItem1 += (value + "|");
                                        }
                                    }
                                    else {
                                        if (key.indexOf("systag") > 0) {
                                            systagInfo = systagInfo + key + "='" + value + "';";
                                        }
                                    }
                                });
                                if (systagInfo) {
                                    currentSelectedItem1 += "{{" + systagInfo + "}}";
                                }
                                currentSelectedItem = currentSelectedItem1;
                                grid.dataSource.remove(selectedItem);
                            }
                            break;
                        case "HideRowAt":
                            var rowIndex = dataIn.InternalEventParameter;
                            rowIndex = rowIndex - 1;
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                var grid = gridDiv.data("kendoGrid");
                                var sysprohashiddenrows = gridDiv.data("sysprohashiddenrows");
                                gridDiv.data("sysprohashiddenrows", true);
                                var selectedItem = grid.dataSource.at(rowIndex);
                                if (selectedItem) {
                                    selectedItem["syshidden"] = true;
                                }
                                var filter = {
                                    logic: 'and',
                                    filters: []
                                };
                                filter.filters.push({
                                    field: 'syshidden',
                                    operator: 'neq',
                                    value: true
                                });
                                grid.dataSource.filter(filter);
                                var changedRowsEvent = gridDiv.data("sysprogridchangedrows");
                                if (rowIndex >= 0) {
                                    if (changedRowsEvent.indexOf(rowIndex) === -1) {
                                        changedRowsEvent.push(rowIndex);
                                        gridDiv.data("sysprogridchangedrows", changedRowsEvent);
                                    }
                                }
                            });
                            break;
                        case "HideCurrentRow":
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                var grid = gridDiv.data("kendoGrid");
                                var sysprohashiddenrows = gridDiv.data("sysprohashiddenrows");
                                gridDiv.data("sysprohashiddenrows", true);
                                var selectedItem = grid.dataItem(grid.select());
                                var rowIndex = grid.select().index();
                                if (selectedItem) {
                                    selectedItem["syshidden"] = true;
                                }
                                var filter = {
                                    logic: 'and',
                                    filters: []
                                };
                                filter.filters.push({
                                    field: 'syshidden',
                                    operator: 'neq',
                                    value: true
                                });
                                grid.dataSource.filter(filter);
                                var changedRowsEvent = gridDiv.data("sysprogridchangedrows");
                                if (rowIndex >= 0) {
                                    if (changedRowsEvent.indexOf(rowIndex) === -1) {
                                        changedRowsEvent.push(rowIndex);
                                        gridDiv.data("sysprogridchangedrows", changedRowsEvent);
                                    }
                                }
                            });
                            break;
                        case "DeleteRowAt":
                            var rowIndex = dataIn.InternalEventParameter;
                            currentSelectedItem = rowIndex + "|";
                            rowIndex = rowIndex - 1;
                            var selectedItem = grid.dataSource.at(rowIndex);
                            if (selectedItem) {
                                var columnDetails = selectedItem.toJSON();
                                var systagInfo = null;
                                $.each(columnDetails, function (key, value) {
                                    if (key.indexOf("syscolor") === -1 &&
                                        key.indexOf("sysbgcolor") === -1 &&
                                        key.indexOf("sysbold") === -1 &&
                                        key.indexOf("sysdisabled") === -1 &&
                                        key.indexOf("systag") === -1 &&
                                        key.indexOf("sysdec") === -1) {
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        var columnIsColumnComboBox = false;
                                        for (var i = 0; i < grid.columns.length; i++) {
                                            if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                                columnIsDate = true;
                                                break;
                                            }
                                            if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                columnIsComboBox = true;
                                                break;
                                            }
                                            if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                                columnIsColumnComboBox = true;
                                                break;
                                            }
                                        }
                                        if (columnIsDate) {
                                            currentSelectedItem = currentSelectedItem + gridHelper_2.convertDateForGridOutput(value) + "|";
                                        }
                                        else if (columnIsComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.key + "|";
                                        }
                                        else if (columnIsColumnComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.value + "|";
                                        }
                                        else {
                                            currentSelectedItem += (value + "|");
                                        }
                                    }
                                    else {
                                        if (key.indexOf("systag") > 0) {
                                            systagInfo = systagInfo + key + "='" + value + "';";
                                        }
                                    }
                                });
                                if (systagInfo) {
                                    currentSelectedItem += "{{" + systagInfo + "}}";
                                }
                                grid.dataSource.remove(selectedItem);
                            }
                            break;
                        case "SelectRowAt":
                            var rowIndex = dataIn.InternalEventParameter;
                            rowIndex = rowIndex - 1;
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                if (gridDiv) {
                                    gridDiv.data("sysproscrolltoselection", true);
                                    var grid = gridDiv.data("kendoGrid");
                                    if (grid) {
                                        grid.select("tr:not(.k-grouping-row):eq(" + rowIndex + ")");
                                    }
                                }
                            });
                            break;
                        case "DisableEntryGrid":
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                gridDiv.data("sysproentrygriddisabled", true);
                                if (gridDiv.closest(".panel-body")[0]) {
                                    if (gridDiv.closest(".panel-body")[0].className) {
                                        gridDiv.closest(".panel-body")[0].className = "panel-body widget-sysprodisabled";
                                    }
                                }
                            });
                            break;
                        case "EnableEntryGrid":
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                gridDiv.data("sysproentrygriddisabled", false);
                                if (gridDiv.closest(".panel-body")[0]) {
                                    if (gridDiv.closest(".panel-body")[0].className) {
                                        gridDiv.closest(".panel-body")[0].className = "panel-body";
                                    }
                                }
                            });
                            break;
                        case "ApplyComboBox":
                            var comboBoxDetails = JSON.parse(dataIn.InternalEventParameter);
                            var appCurrentSelectedItem = grid.select();
                            if (comboBoxDetails.lv.cbos.cbo.length > 0) {
                                $.each(gridDivs, function (index) {
                                    var gridDiv = $(this);
                                    var grid = gridDiv.data("kendoGrid");
                                    var comboBoxes = gridDiv.data("sysprocomboboxes");
                                    if (grid) {
                                        var gridOptions = grid.getOptions();
                                        if (gridOptions) {
                                            for (var i = 0; i < comboBoxDetails.lv.cbos.cbo.length; i++) {
                                                var comboBoxColumn = comboBoxDetails.lv.cbos.cbo[i].col;
                                                var comboBoxValues = comboBoxDetails.lv.cbos.cbo[i].values;
                                                comboBoxes[comboBoxColumn] = comboBoxValues;
                                                for (j = 0; j < gridOptions.columns.length; j++) {
                                                    if (gridOptions.columns[j].field === comboBoxColumn) {
                                                        gridOptions.columns[j].editor = gridHelper_2.sysproDropDownEditor;
                                                        gridOptions.columns[j].template = "#=" + comboBoxColumn + ".val #";
                                                        gridOptions.columns[j].isCombbox = true;
                                                        break;
                                                    }
                                                }
                                            }
                                            gridDiv.data("sysprocomboboxes", comboBoxes);
                                            grid.setOptions({
                                                columns: gridOptions.columns
                                            });
                                        }
                                    }
                                    gridHelper_2.applyCheckBoxContentChangeEvent(gridDiv);
                                    gridHelper_2.addCommentMessageToGrid(grid, gridDiv);
                                    if (grid.options.editable.createAt === "bottom") {
                                        gridDiv.closest(".noBorderTable").find("table").off("keydown");
                                        gridDiv.closest(".noBorderTable").find("table").on("keydown", gridHelper_2.gridEditableKeyDown);
                                    }
                                });
                                if (grid.options.editable.createAt === "bottom") {
                                    if (appCurrentSelectedItem) {
                                        var cellIndex = $(".editable-cell", appCurrentSelectedItem[0]).index();
                                        if (cellIndex >= 0) {
                                            appCurrentSelectedItem.data("sysignorerowselectedevent", true);
                                            grid.select(appCurrentSelectedItem);
                                            try {
                                                if (appCurrentSelectedItem.index() >= 0) {
                                                    grid.editCell(grid.tbody.find("tr:eq(" + appCurrentSelectedItem.index() + ") td:eq(" + cellIndex + ")"));
                                                }
                                            }
                                            catch (error) {
                                            }
                                            grid.select("tr:eq(" + appCurrentSelectedItem.index() + ")");
                                        }
                                    }
                                }
                            }
                            break;
                        case "ShowGridCellMessage":
                            var messageDetails = JSON.parse(dataIn.InternalEventParameter);
                            if (messageDetails.lv.mss.ms.length > 0) {
                                $.each(gridDivs, function (index) {
                                    var gridDiv = $(this);
                                    $('.gridlist-cell-note', gridDiv).remove();
                                    var grid = gridDiv.data("kendoGrid");
                                    if (grid) {
                                        var scrollPosition = grid.content.scrollTop();
                                        gridDiv.data("sysproscrolltoselectionvalue", scrollPosition);
                                        for (var i = 0; i < messageDetails.lv.mss.ms.length; i++) {
                                            var messageItem = messageDetails.lv.mss.ms[i];
                                            var itemRowNumber = messageItem.row - 1;
                                            var itemColumnName = messageItem.col;
                                            var itemValue = messageItem.val;
                                            var itemSysDisabled = messageItem.sysDisabled;
                                            var valueToUpdate;
                                            var isBoolean = false;
                                            var isEditable = true;
                                            var isNumeric = false;
                                            var isComboBox = false;
                                            for (j = 0; j < grid.columns.length; j++) {
                                                if (grid.columns[j].field === itemColumnName) {
                                                    if (grid.columns[j].type === "boolean") {
                                                        isBoolean = true;
                                                    }
                                                    if (grid.columns[j].type === "number") {
                                                        isNumeric = true;
                                                    }
                                                    if (grid.columns[j].type === "combo") {
                                                        isComboBox = true;
                                                    }
                                                    if (grid.columns[j].editable === false) {
                                                        isEditable = false;
                                                    }
                                                    break;
                                                }
                                            }
                                            if (itemValue) {
                                                var updateDataItem = grid.dataSource.data()[itemRowNumber];
                                                if (updateDataItem) {
                                                    if (itemValue.key && itemValue.val) {
                                                        updateDataItem[itemColumnName].key = itemValue.key;
                                                        updateDataItem[itemColumnName].value = itemValue.val;
                                                        updateDataItem[itemColumnName].val = itemValue.val;
                                                        if (isComboBox === true) {
                                                            updateDataItem[itemColumnName].value = itemValue.key;
                                                            updateDataItem[itemColumnName].val = itemValue.key;
                                                        }
                                                        isComboBox = true;
                                                    }
                                                    else {
                                                        if (itemValue === "true") {
                                                            valueToUpdate = true;
                                                        }
                                                        else if (itemValue === "false") {
                                                            valueToUpdate = false;
                                                        }
                                                        else {
                                                            valueToUpdate = itemValue;
                                                        }
                                                        if (isEditable == false) {
                                                            if (isNumeric == true) {
                                                                updateDataItem[itemColumnName] = kendo.parseFloat(valueToUpdate.trim());
                                                            }
                                                            else {
                                                                updateDataItem[itemColumnName] = valueToUpdate;
                                                            }
                                                        }
                                                        else {
                                                            updateDataItem.set(itemColumnName, valueToUpdate);
                                                        }
                                                        updateDataItem.dirtyFields = {};
                                                        updateDataItem.dirty = false;
                                                        if (isBoolean === true && grid.options.editable.mode === "incell") {
                                                            updateDataItem[itemColumnName] = valueToUpdate;
                                                        }
                                                        var changedRowsEvent = gridDiv.data("sysprogridchangedrows");
                                                        if (itemRowNumber >= 0) {
                                                            if (changedRowsEvent.indexOf(itemRowNumber) === -1) {
                                                                changedRowsEvent.push(itemRowNumber);
                                                                gridDiv.data("sysprogridchangedrows", changedRowsEvent);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (itemSysDisabled) {
                                                var columnValues = "";
                                                var itemRow;
                                                itemRow = grid.dataSource.data()[itemRowNumber];
                                                if (itemRow) {
                                                    var collectionRow = itemRow["colDisabled"];
                                                    if (!collectionRow || collectionRow === "undefined") {
                                                        itemRow["colDisabled"] = "";
                                                    }
                                                    collectionRow = itemRow["colDisabled"];
                                                    if (collectionRow[collectionRow.length - 1] !== "|") {
                                                        collectionRow += "|";
                                                    }
                                                    if (collectionRow.includes(itemColumnName)) {
                                                        collectionRow = collectionRow.replace(itemColumnName + "|", '');
                                                    }
                                                    if (itemSysDisabled === "true") {
                                                        if (collectionRow.slice(-1) === "|") {
                                                            collectionRow += itemColumnName;
                                                        }
                                                        else {
                                                            collectionRow += "|" + itemColumnName;
                                                        }
                                                    }
                                                    if (itemColumnName.includes("sysdisabled") == false)
                                                        itemColumnName += "sysdisabled";
                                                    if (collectionRow) {
                                                        if (itemColumnName !== "") {
                                                            if (itemColumnName.includes("sysdisabled") == false) {
                                                                var itemColumnIndex = itemColumnName + "|";
                                                                if (collectionRow.includes(itemColumnIndex)) {
                                                                    collectionRow = collectionRow.replace(itemColumnIndex, '');
                                                                }
                                                                if (itemSysDisabled === "true") {
                                                                    if (collectionRow.slice(-1) === "|") {
                                                                        collectionRow += itemColumnIndex;
                                                                    }
                                                                    else {
                                                                        collectionRow += "|" + itemColumnIndex;
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                if (isBoolean === true || (isComboBox === true)) {
                                                                    if (itemSysDisabled === "true") {
                                                                        itemRow[itemColumnName] = true;
                                                                    }
                                                                    else {
                                                                        itemRow[itemColumnName] = false;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    itemRow["colDisabled"] = collectionRow;
                                                }
                                            }
                                            var item = grid.dataSource.data()[0];
                                        }
                                        var CollapsedGroups = gridHelper_2.collectCollapsedGroups(grid);
                                        gridDiv.data("sysprocollapsedgroups", CollapsedGroups);
                                        grid.refresh();
                                        gridDiv.data("sysproscrolltoselection", true);
                                        gridDiv.data("sysprocollapsedgroupsflag", true);
                                        $('.gridlist-cell-note', gridDiv.closest(".noBorderTable")).popover('destroy');
                                        $('.gridlist-cell-note', gridDiv.closest(".noBorderTable")).remove();
                                        for (var i = 0; i < messageDetails.lv.mss.ms.length; i++) {
                                            var messageItem = messageDetails.lv.mss.ms[i];
                                            var itemRowNumber = messageItem.row - 1;
                                            var itemColumnName = messageItem.col;
                                            var itemColumnIndex = "0";
                                            var itemMessage = messageItem.msg;
                                            var valueToUpdate;
                                            var isBoolean = false;
                                            for (j = 0; j < grid.columns.length; j++) {
                                                if (grid.columns[j].field === itemColumnName) {
                                                    itemColumnIndex = String(j);
                                                    if (grid.columns[j].type === "boolean") {
                                                        isBoolean = true;
                                                    }
                                                    break;
                                                }
                                            }
                                            var item = grid.dataSource.data()[itemRowNumber];
                                            if (item) {
                                                var row = grid.table.find("tr[data-uid='" + item.uid + "']");
                                                var container = row.find("td:eq(" + itemColumnIndex + ")");
                                                if (itemMessage) {
                                                    if (itemMessage === "" || itemMessage === "undefined") {
                                                        if (container[0]) {
                                                            container[0].remove("span.gridlist-cell-note");
                                                        }
                                                    }
                                                    else {
                                                        var htmlIn = '<a href="#" class="gridlist-cell-note" tabindex="0" data-container="body" data-toggle="popover" data-placement="bottom" data-content="' + itemMessage + '" data-trigger="focus" data-original-title="" title=""></a>';
                                                        container.append(htmlIn);
                                                    }
                                                }
                                            }
                                        }
                                        $('.gridlist-cell-note', gridDiv.closest(".noBorderTable")).popover();
                                        gridDiv.closest(".noBorderTable").on('click', function () {
                                            $("body > .popover").remove();
                                        });
                                    }
                                });
                            }
                            break;
                        case "UpdateRowsByIndex":
                            var updateRowDetails = JSON.parse(dataIn.InternalEventParameter);
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                var grid = gridDiv.data("kendoGrid");
                                var gridData = grid.dataSource.data();
                                var columnToMatch = updateRowDetails.updateinfo.col;
                                if (columnToMatch) {
                                    for (var i = 0; i < updateRowDetails.lv.r.length; i++) {
                                        var itemToUpdate = updateRowDetails.lv.r[i];
                                        if (itemToUpdate) {
                                            var valueToMatch = itemToUpdate.value;
                                            var matchingResults = $.grep(gridData, function (d) {
                                                return d[columnToMatch] === valueToMatch;
                                            });
                                            if (matchingResults) {
                                                if (matchingResults.length > 0) {
                                                    var dataItem = grid.dataSource.getByUid(matchingResults[0].uid);
                                                    $.each(itemToUpdate, function (key, value) {
                                                        if (key !== "value") {
                                                            dataItem[key] = value;
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    grid.refresh();
                                }
                            });
                            break;
                        case "FindRow":
                            currentSelectedItem = "false";
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            var columnToMatch = SplitInternalEventParameter[0];
                            var valueToMatch = SplitInternalEventParameter[1];
                            var gridData = grid.dataSource.data();
                            if (valueToMatch === "true") {
                                valueToMatch = true;
                            }
                            else if (valueToMatch === "false") {
                                valueToMatch = false;
                            }
                            var matchingResults = $.grep(gridData, function (d) {
                                return d[columnToMatch] === valueToMatch;
                            });
                            if (matchingResults) {
                                if (matchingResults.length > 0) {
                                    var dataItem = grid.dataSource.getByUid(matchingResults[0].uid);
                                    var row = grid.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                                    if (row) {
                                        var rowIndex = row[0].rowIndex;
                                        rowIndex++;
                                        currentSelectedItem = rowIndex;
                                    }
                                }
                            }
                            break;
                        case "FindAndSelect":
                            currentSelectedItem = "false";
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            var columnToMatch = SplitInternalEventParameter[0];
                            var valueToMatch = SplitInternalEventParameter[1];
                            var gridData = grid.dataSource.data();
                            var matchingResults = $.grep(gridData, function (d) {
                                return d[columnToMatch] === valueToMatch;
                            });
                            if (matchingResults) {
                                if (matchingResults.length > 0) {
                                    var selectedItem = grid.dataSource.getByUid(matchingResults[0].uid);
                                    var row = grid.tbody.find("tr[data-uid='" + selectedItem.uid + "']");
                                    if (row && row.length > 0) {
                                        if (row[0]) {
                                            var rowIndex = row[0].rowIndex;
                                            $.each(gridDivs, function (index) {
                                                var gridDiv = $(this);
                                                var grid = gridDiv.data("kendoGrid");
                                                gridDiv.data("sysproscrolltoselection", true);
                                                grid.select("tr:not(.k-grouping-row):eq(" + rowIndex + ")");
                                            });
                                            rowIndex++;
                                            currentSelectedItem = rowIndex + "|";
                                            var columnDetails = selectedItem.toJSON();
                                            var systagInfo = null;
                                            $.each(columnDetails, function (key, value) {
                                                if (key.indexOf("syscolor") === -1 &&
                                                    key.indexOf("sysbgcolor") === -1 &&
                                                    key.indexOf("sysbold") === -1 &&
                                                    key.indexOf("sysdisabled") === -1 &&
                                                    key.indexOf("systag") === -1 &&
                                                    key.indexOf("sysdec") === -1) {
                                                    var columnIsDate = false;
                                                    var columnIsComboBox = false;
                                                    var columnIsColumnComboBox = false;
                                                    for (i = 0; i < grid.columns.length; i++) {
                                                        if (grid.columns[i].field === key && grid.columns[i].type === "date") {
                                                            columnIsDate = true;
                                                            break;
                                                        }
                                                        if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                            columnIsComboBox = true;
                                                            break;
                                                        }
                                                        if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                                            columnIsColumnComboBox = true;
                                                            break;
                                                        }
                                                    }
                                                    if (columnIsDate) {
                                                        currentSelectedItem = currentSelectedItem + gridHelper_2.convertDateForGridOutput(value) + "|";
                                                    }
                                                    else if (columnIsComboBox) {
                                                        currentSelectedItem = currentSelectedItem + value.key + "|";
                                                    }
                                                    else if (columnIsColumnComboBox) {
                                                        currentSelectedItem = currentSelectedItem + value.value + "|";
                                                    }
                                                    else {
                                                        currentSelectedItem += (value + "|");
                                                    }
                                                }
                                                else {
                                                    if (key.indexOf("systag") > 0) {
                                                        systagInfo = systagInfo + key + "='" + value + "';";
                                                    }
                                                }
                                            });
                                            if (systagInfo) {
                                                currentSelectedItem += "{{" + systagInfo + "}}";
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        case "FindAndDelete":
                            currentSelectedItem = "false";
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            var columnToMatch = SplitInternalEventParameter[0];
                            var valueToMatch = SplitInternalEventParameter[1];
                            if (valueToMatch === "true") {
                                valueToMatch = true;
                            }
                            else if (valueToMatch === "false") {
                                valueToMatch = false;
                            }
                            var gridData = grid.dataSource.data();
                            var matchingResults = $.grep(gridData, function (d) {
                                return d[columnToMatch] === valueToMatch;
                            });
                            if (matchingResults) {
                                if (matchingResults.length > 0) {
                                    currentSelectedItem = "true";
                                    for (var k = 0; k < matchingResults.length; k++) {
                                        var selectedItem = grid.dataSource.getByUid(matchingResults[k].uid);
                                        grid.dataSource.remove(selectedItem);
                                    }
                                }
                            }
                            break;
                        case "DisableGridCells":
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                var grid = gridDiv.data("kendoGrid");
                                var disabled = SplitInternalEventParameter[0];
                                var itemRowNumber = +SplitInternalEventParameter[1];
                                itemRowNumber = itemRowNumber - 1;
                                var itemRow = grid.dataSource.data()[itemRowNumber];
                                if (itemRow) {
                                    var collectionRow = itemRow["colDisabled"];
                                    if (!collectionRow || collectionRow === "undefined") {
                                        itemRow["colDisabled"] = "";
                                    }
                                    collectionRow = itemRow["colDisabled"];
                                    if (collectionRow[collectionRow.length - 1] !== "|") {
                                        collectionRow = collectionRow + "|";
                                    }
                                    var hasCheckBox = false;
                                    if (collectionRow) {
                                        for (var i = 2; i < SplitInternalEventParameter.length; i++) {
                                            if (SplitInternalEventParameter[i] !== "") {
                                                if (SplitInternalEventParameter[i].includes("sysdisabled") == false) {
                                                    var itemColumnIndex = SplitInternalEventParameter[i] + "|";
                                                    if (collectionRow.includes(itemColumnIndex)) {
                                                        collectionRow = collectionRow.replace(itemColumnIndex, '');
                                                    }
                                                    if (disabled === "true") {
                                                        if (collectionRow.slice(-1) === "|") {
                                                            collectionRow = collectionRow + itemColumnIndex;
                                                        }
                                                        else {
                                                            collectionRow = collectionRow + "|" + itemColumnIndex;
                                                        }
                                                    }
                                                }
                                                else {
                                                    var itemName = SplitInternalEventParameter[i];
                                                    hasCheckBox = true;
                                                    if (disabled === "true") {
                                                        itemRow[itemName] = true;
                                                    }
                                                    else {
                                                        itemRow[itemName] = false;
                                                    }
                                                }
                                            }
                                        }
                                        itemRow["colDisabled"] = collectionRow;
                                        if (hasCheckBox) {
                                            grid.refresh();
                                        }
                                    }
                                }
                            });
                            break;
                        case "DisableCellHyperlink":
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                if (grid) {
                                    var itemRowNumber = SplitInternalEventParameter[0] - 1;
                                    if (itemRowNumber < 0) {
                                        itemRowNumber = 0;
                                    }
                                    var item = grid.dataSource.data()[itemRowNumber];
                                    var rowTr = grid.table.find("tr[data-uid='" + item.uid + "']");
                                    var itemColumnIndex = 0;
                                    itemColumnIndex = parseInt(SplitInternalEventParameter[1]);
                                    itemColumnIndex--;
                                    var hasCommandColumn = gridDiv.data("sysprohascommandcolumn");
                                    if (hasCommandColumn === true) {
                                        itemColumnIndex = itemColumnIndex + 1;
                                    }
                                    var columnFieldName = grid.columns[itemColumnIndex].field;
                                    var columnTemplate = grid.columns[itemColumnIndex].template;
                                    var colTd = rowTr.find("td:eq(" + itemColumnIndex + ")");
                                    if (!columnTemplate) {
                                        if (SplitInternalEventParameter[3]) {
                                            var currentSelectedRow = grid.select().index();
                                            var currentOpenCell = $(".k-edit-cell", gridDiv);
                                            var currentOpenCellIndex = -1;
                                            if (currentOpenCell) {
                                                if (currentOpenCell[0]) {
                                                    currentOpenCellIndex = (currentOpenCell[0]).cellIndex;
                                                }
                                            }
                                            var gridOptions = grid.getOptions();
                                            var defaultTemplate = '#=' + columnFieldName + '#';
                                            gridOptions.columns[itemColumnIndex].template = '<div class="syspro-grid-row-hyperlink" data-eventnum="' + columnFieldName + "|" + SplitInternalEventParameter[3] + '">' + defaultTemplate + '</div>';
                                            grid.setOptions(gridOptions);
                                            gridHelper_2.applyCheckBoxContentChangeEvent(gridDiv);
                                            if (grid.options.editable.createAt === "bottom") {
                                                gridDiv.closest(".noBorderTable").find("table").off("keydown");
                                                gridDiv.closest(".noBorderTable").find("table").on("keydown", gridHelper_2.gridEditableKeyDown);
                                            }
                                            grid.select("tr:eq(" + currentSelectedRow + ")");
                                            if (currentOpenCellIndex >= 0) {
                                                setTimeout(function () {
                                                    try {
                                                        grid.editCell(grid.tbody.find("tr:eq(" + currentSelectedRow + ") td:eq(" + currentOpenCellIndex + ")"));
                                                    }
                                                    catch (error) { }
                                                });
                                            }
                                        }
                                    }
                                    var colTd = rowTr.find("td:eq(" + itemColumnIndex + ")");
                                    if (colTd[0]) {
                                        if (colTd[0].childNodes[0]) {
                                            if (SplitInternalEventParameter[2] === "true") {
                                                if (colTd[0].childNodes[0].className) {
                                                    if (colTd[0].childNodes[0].className === "syspro-grid-row-hyperlink") {
                                                        colTd[0].childNodes[0].className = "";
                                                    }
                                                }
                                            }
                                            else {
                                                colTd[0].childNodes[0].className = "syspro-grid-row-hyperlink";
                                            }
                                        }
                                    }
                                }
                            });
                            break;
                        case "CheckAllCheckBoxes":
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                var disableColumnName = SplitInternalEventParameter[0] + "sysdisabled";
                                grid = gridDiv.data("kendoGrid");
                                if (grid) {
                                    var valueToChange = true;
                                    if (SplitInternalEventParameter[1] === "false") {
                                        valueToChange = false;
                                    }
                                    var dataItem = grid.dataSource.data();
                                    var changedAllValues = true;
                                    for (var i = 0; i < dataItem.length; i++) {
                                        var newDataItem = dataItem[i];
                                        if (!newDataItem[disableColumnName]) {
                                            newDataItem[SplitInternalEventParameter[0]] = valueToChange;
                                        }
                                        else {
                                            changedAllValues = false;
                                        }
                                    }
                                    grid.refresh();
                                }
                                if (changedAllValues) {
                                    var checkBoxColumn = $("input[data-columnname='" + SplitInternalEventParameter[0] + "']", gridDiv.closest(".noBorderTable"));
                                    if (checkBoxColumn) {
                                        if (checkBoxColumn[0]) {
                                            checkBoxColumn[0].checked = valueToChange;
                                        }
                                    }
                                }
                            });
                            break;
                        case "SetColumnBlank":
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                if (grid) {
                                    var valueToChange = "";
                                    var dataItem = grid.dataSource.data();
                                    for (var i = 0; i < dataItem.length; i++) {
                                        var newDataItem = dataItem[i];
                                        newDataItem[dataIn.InternalEventParameter] = valueToChange;
                                    }
                                    grid.refresh();
                                }
                            });
                            break;
                        case "SetFooter":
                            var footerInfoList = dataIn.InternalEventParameter.split(";");
                            if (grid) {
                                var gridOptions = grid.getOptions();
                                for (var j = 0; j < footerInfoList.length; j++) {
                                    var footerItem = footerInfoList[j].split("|");
                                    var footerColumnName = footerItem[0];
                                    var footerColumnValue = footerItem[1];
                                    if (gridOptions) {
                                        for (var i = 0; i < gridOptions.columns.length; i++) {
                                            if (gridOptions.columns[i].field === footerColumnName) {
                                                gridOptions.columns[i].footerTemplate = footerColumnValue;
                                                break;
                                            }
                                        }
                                    }
                                    $.each(gridDivs, function (index) {
                                        var gridDiv = $(this);
                                        var sysproGroupFooters = gridDiv.data("sysprogroupfooters");
                                        sysproGroupFooters[footerColumnName] = footerColumnValue;
                                        gridDiv.data("sysprogroupfooters", sysproGroupFooters);
                                    });
                                }
                                grid.setOptions(gridOptions);
                            }
                            break;
                        case "GetFooter":
                            var footerColumnName = dataIn.InternalEventParameter;
                            currentSelectedItem = "false";
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                var sysproGroupFooters = gridDiv.data("sysprogroupfooters");
                                var footerItem = sysproGroupFooters[footerColumnName];
                                if (footerItem) {
                                    currentSelectedItem = footerItem;
                                }
                            });
                            break;
                        case "GetAutoFooterValue":
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            var footerColumnName = SplitInternalEventParameter[0];
                            var footerColumnType = SplitInternalEventParameter[1];
                            var footerNumberFormat = SplitInternalEventParameter[2];
                            if (grid) {
                                if (footerColumnType === "sum") {
                                    currentSelectedItem = kendo.toString(grid.dataSource.aggregates()[footerColumnName].sum, footerNumberFormat);
                                }
                                else if (footerColumnType === "count") {
                                    currentSelectedItem = kendo.toString(grid.dataSource.aggregates()[footerColumnName].count, footerNumberFormat);
                                }
                                else {
                                    currentSelectedItem = "";
                                }
                            }
                            break;
                        case "SumColumn":
                            var columnName = dataIn.InternalEventParameter;
                            var gridData = grid.dataSource.data();
                            var total = 0;
                            for (var i = 0; i < gridData.length; i++) {
                                total += gridData[i][columnName];
                            }
                            currentSelectedItem = total + "";
                            break;
                        case "GetAllMatchedRows":
                            var currentSelectedItem1 = "false";
                            currentSelectedItem = "false";
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                                var columnToMatch = SplitInternalEventParameter[0];
                                var valueToMatch = SplitInternalEventParameter[1];
                                if (valueToMatch === "true") {
                                    valueToMatch = true;
                                }
                                if (valueToMatch === "false") {
                                    valueToMatch = false;
                                }
                                var columnToMatch1 = "";
                                var valueToMatch1 = "";
                                var matchingResults;
                                var gridData = grid.dataSource.data();
                                if (SplitInternalEventParameter.length > 2) {
                                    columnToMatch1 = SplitInternalEventParameter[2];
                                    valueToMatch1 = SplitInternalEventParameter[3];
                                    matchingResults = $.grep(gridData, function (d) {
                                        return d[columnToMatch] === valueToMatch && d[columnToMatch1] === valueToMatch1;
                                    });
                                }
                                else {
                                    matchingResults = $.grep(gridData, function (d) {
                                        return d[columnToMatch] === valueToMatch;
                                    });
                                }
                                if (matchingResults) {
                                    if (matchingResults.length > 0) {
                                        currentSelectedItem1 = "";
                                        for (var k = 0; k < matchingResults.length; k++) {
                                            var selectedItem = grid.dataSource.getByUid(matchingResults[k].uid);
                                            var row = grid.tbody.find("tr[data-uid='" + selectedItem.uid + "']");
                                            if (row) {
                                                var rowIndex = row[0].rowIndex;
                                                rowIndex++;
                                                currentSelectedItem1 = currentSelectedItem1 + rowIndex + "|";
                                                var columnDetails = selectedItem.toJSON();
                                                var systagInfo = null;
                                                $.each(columnDetails, function (key, value) {
                                                    if (key.indexOf("syscolor") === -1 &&
                                                        key.indexOf("sysbgcolor") === -1 &&
                                                        key.indexOf("sysbold") === -1 &&
                                                        key.indexOf("sysdisabled") === -1 &&
                                                        key.indexOf("systag") === -1 &&
                                                        key.indexOf("sysdec") === -1) {
                                                        var columnIsDate = false;
                                                        var columnIsComboBox = false;
                                                        var columnIsColumnComboBox = false;
                                                        var columnFound = false;
                                                        for (i = 0; i < grid.columns.length; i++) {
                                                            if (grid.columns[i].field === key) {
                                                                if (grid.columns[i].type === "date") {
                                                                    columnIsDate = true;
                                                                }
                                                                columnFound = true;
                                                                break;
                                                            }
                                                            if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                                columnIsComboBox = true;
                                                                columnFound = true;
                                                                break;
                                                            }
                                                            if (grid.columns[i].field === key && (grid.columns[i].type === "combo" || grid.columns[i].type === "radio")) {
                                                                columnIsColumnComboBox = true;
                                                                columnFound = true;
                                                                break;
                                                            }
                                                        }
                                                        if (columnFound) {
                                                            if (columnIsDate) {
                                                                currentSelectedItem1 = currentSelectedItem1 + gridHelper_2.convertDateForGridOutput(value) + "|";
                                                            }
                                                            else if (columnIsComboBox) {
                                                                currentSelectedItem1 += value.key + "|";
                                                            }
                                                            else if (columnIsColumnComboBox) {
                                                                currentSelectedItem1 += value.value + "|";
                                                            }
                                                            else {
                                                                currentSelectedItem1 += value + "|";
                                                            }
                                                        }
                                                        else {
                                                            if (key.indexOf("systag") > 0) {
                                                                systagInfo = systagInfo + key + "='" + value + "';";
                                                            }
                                                        }
                                                    }
                                                });
                                                if (systagInfo) {
                                                    currentSelectedItem1 += "{{" + systagInfo + "}}";
                                                }
                                                currentSelectedItem1 += "\r\n";
                                            }
                                        }
                                    }
                                }
                            });
                            currentSelectedItem = currentSelectedItem1;
                            break;
                        case "CheckForCellDuplicates":
                            currentSelectedItem = "false";
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            var columnToMatch = SplitInternalEventParameter[0];
                            var valueToMatch = SplitInternalEventParameter[1];
                            var matchingResults;
                            var gridData = grid.dataSource.data();
                            matchingResults = $.grep(gridData, function (d) {
                                return d[columnToMatch] === valueToMatch;
                            });
                            if (matchingResults) {
                                if (matchingResults.length > 1) {
                                    currentSelectedItem = "true";
                                }
                            }
                            break;
                        case "GetSettings":
                            var gridOptions = grid.getOptions();
                            var ReturnGridSetting = {};
                            ReturnGridSetting.columns = gridOptions.columns;
                            ReturnGridSetting.group = gridOptions.dataSource.group;
                            ReturnGridSetting.sort = gridOptions.dataSource.sort;
                            currentSelectedItem = JSON.stringify(ReturnGridSetting);
                            break;
                        case "SetSettings":
                            var options = JSON.parse(dataIn.InternalEventParameter);
                            if (options) {
                                var gridOptions = grid.getOptions();
                                var clickEvent0;
                                var clickEvent1;
                                var clickEvent2;
                                var clickEvent3;
                                var visible0;
                                for (var i = 0; i < gridOptions.columns.length; i++) {
                                    if (gridOptions.columns[i].command) {
                                        if (gridOptions.columns[i].command.length > 0) {
                                            for (var j = 0; j < gridOptions.columns[i].command.length; j++) {
                                                if (j === 0) {
                                                    clickEvent0 = gridOptions.columns[i].command[j].click;
                                                    if (gridOptions.columns[i].command[j].visible) {
                                                        visible0 = gridOptions.columns[i].command[j].visible;
                                                    }
                                                }
                                                if (j === 1) {
                                                    clickEvent1 = gridOptions.columns[i].command[j].click;
                                                }
                                                if (j === 2) {
                                                    clickEvent2 = gridOptions.columns[i].command[j].click;
                                                }
                                                if (j === 3) {
                                                    clickEvent3 = gridOptions.columns[i].command[j].click;
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                                gridOptions.dataSource.columns = options.columns;
                                gridOptions.dataSource.group = options.group;
                                gridOptions.dataSource.sort = options.sort;
                                gridOptions.columns = options.columns;
                                for (var i = 0; i < gridOptions.columns.length; i++) {
                                    if (gridOptions.columns[i].command) {
                                        if (gridOptions.columns[i].command.length > 0) {
                                            for (var j = 0; j < gridOptions.columns[i].command.length; j++) {
                                                if (j == 0) {
                                                    gridOptions.columns[i].command[j].click = clickEvent0;
                                                    if (visible0) {
                                                        gridOptions.columns[i].command[j].visible = visible0;
                                                    }
                                                }
                                                if (j == 1) {
                                                    gridOptions.columns[i].command[j].click = clickEvent1;
                                                }
                                                if (j == 2) {
                                                    gridOptions.columns[i].command[j].click = clickEvent2;
                                                }
                                                if (j == 3) {
                                                    gridOptions.columns[i].command[j].click = clickEvent3;
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                                grid.setOptions(gridOptions);
                            }
                            break;
                        case "HideColumns":
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                                if (grid) {
                                    if (SplitInternalEventParameter[0] === "true") {
                                        for (var i = 1; i < SplitInternalEventParameter.length; i++) {
                                            grid.hideColumn(SplitInternalEventParameter[i]);
                                        }
                                    }
                                    else {
                                        for (var i = 1; i < SplitInternalEventParameter.length; i++) {
                                            grid.showColumn(SplitInternalEventParameter[i]);
                                        }
                                    }
                                }
                            });
                            break;
                        case "ShowGroupByBox":
                            $.each(gridDivs, function (index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data("kendoGrid");
                                var gridOptions = grid.getOptions();
                                if (grid) {
                                    gridOptions.groupable.enabled = !gridOptions.groupable.enabled;
                                    grid.setOptions(gridOptions);
                                }
                            });
                            break;
                        case "GetGridLayoutsChanged":
                            var programName = dataIn.InternalEventParameter;
                            var everyGrid = $(".syspro-grid-list");
                            $.each(everyGrid, function (index) {
                                var currentGrid = $(this);
                                if (currentGrid) {
                                    if (currentGrid[0]) {
                                        if (currentGrid[0].attributes["data-sysprogridfieldname"]) {
                                            var gridfieldName = currentGrid[0].attributes["data-sysprogridfieldname"].value;
                                            if (gridfieldName.indexOf(programName) === 0) {
                                                if (currentGrid.data("sysprosettingschanged")) {
                                                    currentSelectedItem = currentSelectedItem + gridfieldName + ",";
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                            if (!currentSelectedItem) {
                                currentSelectedItem = "false";
                            }
                            break;
                        case "ExcelExport":
                            if (grid) {
                                grid.saveAsExcel();
                            }
                            break;
                        case "PDFExport":
                            if (grid) {
                                grid.saveAsPDF();
                            }
                            break;
                        case "ExpandAll":
                            if (grid) {
                                grid.table.find(".k-grouping-row").each(function () {
                                    grid.expandGroup(this);
                                });
                            }
                            break;
                        case "CollapseAll":
                            if (grid) {
                                grid.table.find(".k-grouping-row").each(function () {
                                    grid.collapseGroup(this);
                                });
                            }
                            break;
                    }
                }
            }
            return currentSelectedItem;
        }
        catch (ex) {
            this.interopInternal.handleError(ex, " " + dataIn.InternalEvent + " - gridRequestInternalEvent");
        }
    };
    AvantiGridsClass.prototype.applyColumnTemplate = function (templateSource, templateValue) {
        var splitValue = templateValue.split("|");
        var j = 0;
        for (j = 0; j < splitValue.length; j++) {
            if (splitValue[j]) {
                var compareString = "%" + j + "%";
                templateSource = templateSource.replace(new RegExp(compareString, "g"), splitValue[j]);
            }
        }
        return templateSource;
    };
    AvantiGridsClass.prototype.sysproDropDownEditor = function (container, options) {
        var editorGridDiv = $(container).closest(".syspro-grid-list");
        var comboBoxes = editorGridDiv.data("sysprocomboboxes");
        $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
            dataSource: comboBoxes[options.field],
            dataValueField: "key",
            dataTextField: "val"
        });
    };
    AvantiGridsClass.prototype.createTreeList = function (dataIn) {
        try {
            var interopHelper = this.interopInternal;
            var gridHelper = this;
            var treeDivs = $('*[data-sysprotreefieldname="' + dataIn.FieldName + '"]');
            $.each(treeDivs, function (index) {
                var treeDiv = $(this);
                if (treeDiv.data("kendoTreeList")) {
                    treeDiv.data("kendoTreeList").destroy();
                    treeDiv.empty();
                }
                var treeList = JSON.parse(dataIn.GridData).tl;
                if (treeDiv.data("sysprotreeheight")) {
                    var sysprotreeheight = treeDiv.data("sysprotreeheight");
                    treeList.prop.height = sysprotreeheight;
                }
                treeDiv.data("sysproentrygriddisabled", false);
                treeDiv.data("sysprotreelistinfo", treeList);
                var treeEditable = false;
                if (treeDiv.length > 0) {
                    if (treeList.prop.editable === true) {
                        treeEditable = true;
                        if (treeList.cs.c.length > 0 && (!treeList.cs.c[0].command || treeList.cs.c[0].command.length !== 1)) {
                            treeList.cs.c.unshift({
                                "title": " ",
                                "command": [{
                                        "name": "edit"
                                    }],
                                "width": 100
                            });
                            treeList.cs.c[1].expandable = true;
                        }
                    }
                    var htmlForToolbar = "";
                    if (treeList.tbs) {
                        if (treeList.tbs.tb) {
                            var template = kendo.template($("#gridToolbarTemplate").html());
                            var toolbar = treeList.tbs.tb;
                            $.each(toolbar, function (index) {
                                htmlForToolbar = htmlForToolbar + template(this);
                            });
                        }
                    }
                    treeDiv.kendoTreeList({
                        dataSource: {
                            data: [],
                        },
                        height: treeList.prop.height,
                        sortable: treeList.prop.sortable,
                        filterable: treeList.prop.filterable,
                        groupable: treeList.prop.groupable,
                        columnMenu: treeList.prop.columnMenu,
                        resizable: true,
                        reorderable: true,
                        selectable: true,
                        navigatable: true,
                        editable: treeEditable,
                        toolbar: htmlForToolbar,
                        messages: {
                            noRows: treeList.prop.sysprotranNoItemText
                        },
                        columns: treeList.cs.c,
                        edit: function (e1) {
                            $(".k-grid-update", treeDiv).contents().filter(function () {
                                return (this.nodeType == 3);
                            }).remove();
                            $(".k-grid-cancel", treeDiv).contents().filter(function () {
                                return (this.nodeType == 3);
                            }).remove();
                        }
                    });
                }
            });
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "createTreeList");
        }
    };
    AvantiGridsClass.prototype.refreshTreeList = function (dataIn) {
        try {
            var interopHelper_4 = this.interopInternal;
            var gridInternal_9 = this;
            var treeList = null;
            if (!dataIn.FromRequestInternal) {
                treeList = JSON.parse(dataIn.GridData).tl;
            }
            var treeDivs = $('*[data-sysprotreefieldname="' + dataIn.FieldName + '"]');
            $.each(treeDivs, function (index) {
                var treeDiv = $(this);
                var sysprotreelistinfo = treeDiv.data("sysprotreelistinfo");
                var sysproentrygriddisabled = treeDiv.data("sysproentrygriddisabled");
                var dataSource;
                var columnModel = {};
                var dateColumnsHolder = [];
                if (treeDiv.data("kendoTreeList")) {
                    if (dataIn.FromRequestInternal) {
                        dataSource = treeDiv.data("kendoTreeList").dataSource;
                        treeList = treeDiv.data("sysprohyperlinks");
                    }
                    treeDiv.data("kendoTreeList").destroy();
                    treeDiv.empty();
                    treeDiv.data("sysproentrygriddisabled", sysproentrygriddisabled);
                }
                var leaveBlankForDate = "";
                if (sysprotreelistinfo) {
                    var dateformatTemplate = "#= !data.{0} ? '" + leaveBlankForDate + "' : kendo.toString(data.{1},'" + sysprotreelistinfo.prop.sysproDateFormatOut + "') #";
                    var booleanTemplate = "<input class='sysEditTreeCheckBox' type='checkbox' # if({0}){ # checked #} # # if (((typeof {1}sysdisabled !== 'undefined')) && {2}sysdisabled){# disabled #} # # if (((typeof {3}sysVisible !== 'undefined')) && {4}sysVisible === false){# style='display:none;' #} #  />";
                    var numberTemplate = "#= (kendo.toString(data.{0}, 'n' + (data.{1}sysdec==null?'':data.{2}sysdec))) #";
                    var booleanheaderTemplate = "<input type='checkbox' data-columnname='{0}' class='header-checkbox'></input><label style='margin-bottom: 0px;font-weight: normal; for='header-chb'>{1}</label>";
                    var headerTemplate = "<div><span class='k-icon {0}'/></div>";
                    for (i = 0; i < sysprotreelistinfo.cs.c.length; i++) {
                        if (sysprotreelistinfo.cs.c[i].type === "date") {
                            sysprotreelistinfo.cs.c[i].template = dateformatTemplate.replace("{1}", sysprotreelistinfo.cs.c[i].field);
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace("{0}", sysprotreelistinfo.cs.c[i].field);
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace("{2}", sysprotreelistinfo.cs.c[i].field);
                            sysprotreelistinfo.cs.c[i].format = "{0:" + sysprotreelistinfo.prop.sysproDateFormatOut + "}";
                            dateColumnsHolder.push(sysprotreelistinfo.cs.c[i].field);
                            var sysDateTemplate = sysprotreelistinfo.cs.c[i].template;
                            sysprotreelistinfo.cs.c[i].template = "<span style='background-color: #=data." + sysprotreelistinfo.cs.c[i].field + "sysbgcolor#; color: #=data." + sysprotreelistinfo.cs.c[i].field + "syscolor#;" + "font-weight: #=data." + sysprotreelistinfo.cs.c[i].field + "sysbold#; '>" + sysDateTemplate + "</span>";
                        }
                        else if (sysprotreelistinfo.cs.c[i].type === "boolean") {
                            sysprotreelistinfo.cs.c[i].template = booleanTemplate.replace("{0}", sysprotreelistinfo.cs.c[i].field);
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace("{1}", sysprotreelistinfo.cs.c[i].field);
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace("{2}", sysprotreelistinfo.cs.c[i].field);
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace("{3}", sysprotreelistinfo.cs.c[i].field);
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace("{4}", sysprotreelistinfo.cs.c[i].field);
                            if (sysprotreelistinfo.cs.c[i].showInCheckBoxHeader) {
                                if (sysprotreelistinfo.cs.c[i].showInCheckBoxHeader === true) {
                                    sysprotreelistinfo.cs.c[i].headerTemplate = booleanheaderTemplate.replace("{0}", sysprotreelistinfo.cs.c[i].field);
                                    sysprotreelistinfo.cs.c[i].headerTemplate = sysprotreelistinfo.cs.c[i].headerTemplate.replace("{1}", sysprotreelistinfo.cs.c[i].title);
                                }
                            }
                        }
                        else if (sysprotreelistinfo.cs.c[i].type === "number") {
                            sysprotreelistinfo.cs.c[i].template = numberTemplate.replace("{0}", sysprotreelistinfo.cs.c[i].field);
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace("{1}", sysprotreelistinfo.cs.c[i].field);
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace("{2}", sysprotreelistinfo.cs.c[i].field);
                            var sysNumberTemplate = sysprotreelistinfo.cs.c[i].template;
                            sysprotreelistinfo.cs.c[i].template = "<span style='background-color: #=data." + sysprotreelistinfo.cs.c[i].field + "sysbgcolor#; color: #=data." + sysprotreelistinfo.cs.c[i].field + "syscolor#;" + "font-weight: #=data." + sysprotreelistinfo.cs.c[i].field + "sysbold#; '>" + sysNumberTemplate + "</span>";
                        }
                        else {
                            sysprotreelistinfo.cs.c[i].template = "<span style='background-color: #=data." + sysprotreelistinfo.cs.c[i].field + "sysbgcolor#; color: #=data." + sysprotreelistinfo.cs.c[i].field + "syscolor#;" + "font-weight: #=data." + sysprotreelistinfo.cs.c[i].field + "sysbold#; '>#=data." + sysprotreelistinfo.cs.c[i].field + "#</span>";
                        }
                        if (sysprotreelistinfo.prop.editable) {
                            if (!sysprotreelistinfo.cs.c[i].editable && sysprotreelistinfo.cs.c[i].editable !== "false" && sysprotreelistinfo.cs.c[i].editable !== false && sysprotreelistinfo.cs.c[i].type !== "boolean") {
                                sysprotreelistinfo.cs.c[i].attributes = {
                                    class: "editable-cell"
                                };
                                if (sysprotreelistinfo.cs.c[i].type === "date") {
                                    columnModel[sysprotreelistinfo.cs.c[i].field] = {
                                        editable: true,
                                        type: "date"
                                    };
                                }
                                else {
                                    columnModel[sysprotreelistinfo.cs.c[i].field] = {
                                        editable: true
                                    };
                                    if (sysprotreelistinfo.cs.c[i].search) {
                                        sysprotreelistinfo.cs.c[i].editor = function (container, options) {
                                            var editorTreeDiv = $(container).closest(".syspro-tree-list");
                                            var editorTree = editorTreeDiv.data("kendoTreeList");
                                            var editorFieldName = "grid:" + editorTreeDiv.data("sysprotreefieldname");
                                            var editorRow = $(container).closest("tr").index();
                                            editorFieldName = editorFieldName + ":" + editorRow + ":" + options.field + ":" + container[0].cellIndex;
                                            var input = $('<input type="text" class="k-input k-textbox" style="width: 80%" name="' + options.field + '" />');
                                            input.appendTo(container);
                                            var editorSearchName = "";
                                            for (i = 0; i < editorTree.columns.length; i++) {
                                                if (editorTree.columns[i].field === options.field) {
                                                    editorSearchName = editorTree.columns[i].search;
                                                    break;
                                                }
                                            }
                                            var buttonElement = $('<a class="syspro-browse-button" href="#" data-fieldname="' + editorFieldName + '" data-fieldvalue="" data-predictivesearchfield="' + editorSearchName + '"  style="color: white"><i class="material-icons">search</i></a>');
                                            buttonElement.appendTo(container);
                                            if (editorSearchName !== "manual") {
                                                interopHelper_4.initializePredictiveSearch(input, editorSearchName);
                                            }
                                            interopHelper_4.subscribeToFieldEvents();
                                        };
                                    }
                                }
                            }
                            else {
                                columnModel[sysprotreelistinfo.cs.c[i].field] = {
                                    editable: false
                                };
                            }
                            if (sysprotreelistinfo.cs.c[i].image) {
                                sysprotreelistinfo.cs.c[i].headerTemplate = headerTemplate;
                                sysprotreelistinfo.cs.c[i].headerTemplate = headerTemplate.replace("{0}", sysprotreelistinfo.cs.c[i].image);
                            }
                        }
                    }
                    if (treeList) {
                        if (treeList.cls && treeList.cls.cl) {
                            for (i = 0; i < treeList.cls.cl.length; i++) {
                                var linkColumnName = treeList.cls.cl[i].col;
                                var linkColumnEvent = treeList.cls.cl[i].event;
                                for (var j = 0; j < sysprotreelistinfo.cs.c.length; j++) {
                                    if (linkColumnName === sysprotreelistinfo.cs.c[j].field) {
                                        if (sysprotreelistinfo.cs.c[j].type === "boolean" || sysprotreelistinfo.cs.c[j].type === "date")
                                            break;
                                        var defaultTemplate = '#=' + linkColumnName + '#';
                                        if (sysprotreelistinfo.cs.c[j].template && sysprotreelistinfo.cs.c[j].template.indexOf("syspro-grid-row-hyperlink") < 0) {
                                            defaultTemplate = sysprotreelistinfo.cs.c[j].template;
                                        }
                                        sysprotreelistinfo.cs.c[j].template = '<span class="syspro-grid-row-hyperlink" data-eventnum="' + sysprotreelistinfo.cs.c[j].field + "|" + linkColumnEvent + '">' + defaultTemplate + '</span>';
                                        break;
                                    }
                                }
                            }
                            treeDiv.data("sysprohyperlinks", treeList);
                        }
                    }
                    var initialAggregates = [];
                    if (sysprotreelistinfo.aggregate) {
                        initialAggregates = sysprotreelistinfo.aggregate;
                    }
                    if (!dataIn.FromRequestInternal) {
                        if (dataIn.IsAppend == true) {
                            var currentLinesInTree = tree.dataSource.data().toJSON();
                            var newLinesToAppend = currentLinesInTree.concat(treeList.rs.r);
                            dataSource = new kendo.data.TreeListDataSource({
                                data: newLinesToAppend,
                                aggregate: initialAggregates,
                                schema: {
                                    parse: function (data) {
                                        $.each(data, function (index, item) {
                                            $.each(dateColumnsHolder, function (index) {
                                                if (item) {
                                                    if (item[this]) {
                                                        item[this] = kendo.parseDate(item[this], sysprotreelistinfo.prop.sysproDateFormatIn);
                                                    }
                                                }
                                            });
                                        });
                                        return data;
                                    },
                                    model: {
                                        fields: columnModel
                                    }
                                }
                            });
                        }
                        else {
                            dataSource = new kendo.data.TreeListDataSource({
                                data: treeList.rs.r,
                                aggregate: initialAggregates,
                                schema: {
                                    parse: function (data) {
                                        $.each(data, function (index, item) {
                                            $.each(dateColumnsHolder, function (index) {
                                                try {
                                                    if (item) {
                                                        if (item[this]) {
                                                            item[this] = kendo.parseDate(item[this], sysprotreelistinfo.prop.sysproDateFormatIn);
                                                        }
                                                    }
                                                }
                                                catch (error) {
                                                }
                                            });
                                        });
                                        return data;
                                    },
                                    model: {
                                        fields: columnModel
                                    }
                                }
                            });
                            var changedRows = [];
                            treeDiv.data("sysprogridchangedrows", changedRows);
                            treeDiv.data("sysprogriddates", dateColumnsHolder);
                        }
                    }
                    var treeEditable = false;
                    if (treeDiv.length > 0) {
                        if (sysprotreelistinfo.prop.editable === true) {
                            treeEditable = true;
                            if (sysprotreelistinfo.cs.c.length > 0 && (!sysprotreelistinfo.cs.c[0].command || sysprotreelistinfo.cs.c[0].command.length !== 1)) {
                                sysprotreelistinfo.cs.c.unshift({
                                    "title": " ",
                                    "command": [{
                                            "name": "edit",
                                            "text": {
                                                "edit": " ",
                                                "update": " ",
                                                "cancel": " "
                                            }
                                        }],
                                    "width": 150
                                });
                                sysprotreelistinfo.cs.c[1].expandable = true;
                            }
                        }
                        var htmlForToolbar = "";
                        if (sysprotreelistinfo.tbs) {
                            if (sysprotreelistinfo.tbs.tb) {
                                var template = kendo.template($("#gridToolbarTemplate").html());
                                var toolbar = sysprotreelistinfo.tbs.tb;
                                $.each(toolbar, function (index) {
                                    htmlForToolbar = htmlForToolbar + template(this);
                                });
                            }
                        }
                        var treeSelectedable = true;
                        if (sysproentrygriddisabled === true) {
                            treeSelectedable = false;
                        }
                        else {
                            treeSelectedable = true;
                        }
                        treeDiv.kendoTreeList({
                            dataSource: dataSource,
                            height: sysprotreelistinfo.prop.height,
                            sortable: sysprotreelistinfo.prop.sortable,
                            filterable: sysprotreelistinfo.prop.filterable,
                            groupable: sysprotreelistinfo.prop.groupable,
                            columnMenu: sysprotreelistinfo.prop.columnMenu,
                            resizable: true,
                            reorderable: true,
                            selectable: treeSelectedable,
                            navigatable: true,
                            editable: treeEditable,
                            messages: {
                                noRows: sysprotreelistinfo.prop.sysprotranNoItemText
                            },
                            toolbar: htmlForToolbar,
                            columns: sysprotreelistinfo.cs.c,
                            edit: function (e1) {
                                $(".k-grid-update", treeDiv).css("min-width", "10px");
                                $(".k-grid-cancel", treeDiv).css("min-width", "10px");
                                $(".k-grid-update", treeDiv).contents().filter(function () {
                                    return (this.nodeType == 3);
                                }).remove();
                                $(".k-grid-cancel", treeDiv).contents().filter(function () {
                                    return (this.nodeType == 3);
                                }).remove();
                            },
                            save: function (e) {
                                if (e.model.dirty === true) {
                                    var tree = treeDiv.data("kendoTreeList");
                                    var fieldName = treeDiv.data("sysprotreefieldname");
                                    var currentDataItem1 = treeDiv.data("kendoTreeList").select();
                                    if (currentDataItem1) {
                                        var currentDataItem = tree.dataSource.getByUid(e.model.uid);
                                        var index = tree.dataSource.indexOf(currentDataItem);
                                        var rowIndex = index + 1;
                                        var colName = "";
                                        $.each(e.model.dirtyFields, function (index, value) {
                                            colName = index;
                                            return false;
                                        });
                                        var isLastRow = false;
                                        if (rowIndex == tree.dataSource.total()) {
                                            isLastRow = true;
                                        }
                                        var returnChangeEventData = rowIndex + "|" + isLastRow + "|" + colName + "|" + dataItem[colName] + "|";
                                        if (currentDataItem !== null) {
                                            var columnDetails = currentDataItem.toJSON();
                                            $.each(columnDetails, function (key, value) {
                                                if (key.indexOf("syscolor") === -1 &&
                                                    key.indexOf("sysbgcolor") === -1 &&
                                                    key.indexOf("sysbold") === -1 &&
                                                    key.indexOf("sysdisabled") === -1 &&
                                                    key.indexOf("sysexpanded") === -1 &&
                                                    key.indexOf("sysdec") === -1) {
                                                    var columnIsDate = false;
                                                    var columnIsComboBox = false;
                                                    for (var i = 0; i < tree.columns.length; i++) {
                                                        if (tree.columns[i].field === key && tree.columns[i].type === "date") {
                                                            columnIsDate = true;
                                                            break;
                                                        }
                                                        if (tree.columns[i].field === key && tree.columns[i].isCombbox) {
                                                            columnIsComboBox = true;
                                                            break;
                                                        }
                                                    }
                                                    if (columnIsDate) {
                                                        returnChangeEventData = returnChangeEventData + gridInternal_9.convertDateForGridOutput(value) + "|";
                                                    }
                                                    else if (columnIsComboBox) {
                                                        returnChangeEventData = returnChangeEventData + value.key + "|";
                                                    }
                                                    else {
                                                        returnChangeEventData = returnChangeEventData + value + "|";
                                                    }
                                                }
                                            });
                                        }
                                        var changedRowsEvent = treeDiv.data("sysprogridchangedrows");
                                        rowIndex = rowIndex - 1;
                                        if (rowIndex >= 0) {
                                            if (changedRowsEvent.indexOf(rowIndex) === -1) {
                                                changedRowsEvent.push(rowIndex);
                                                treeDiv.data("sysprogridchangedrows", changedRowsEvent);
                                            }
                                        }
                                        interopHelper_4.eventTrigged(fieldName, returnChangeEventData, "", "", "gridCellChanged", function (e) { }, false);
                                    }
                                }
                            },
                            dataBound: function () {
                                $(".k-grid-edit", treeDiv).css("min-width", "10px");
                                $(".k-grid-edit", treeDiv).contents().filter(function () {
                                    return (this.nodeType == 3);
                                }).remove();
                                $(".syspro-grid-row-hyperlink", treeDiv).off("click");
                                $(".syspro-grid-row-hyperlink", treeDiv).on("click", function (e) {
                                    if (treeDiv.data("sysproentrygriddisabled") === false) {
                                        gridInternal_9.sysTreeListCellClick(e.target);
                                    }
                                });
                                $(".k-grid-edit", treeDiv).each(function () {
                                    if ($(this).closest("tr").hasClass("k-treelist-group")) {
                                        $(this).hide();
                                    }
                                });
                                $(".gridSearchTextBox", treeDiv).off("input");
                                $(".gridSearchTextBox", treeDiv).on("input", function (e) {
                                    var tree = treeDiv.data("kendoTreeList");
                                    var columns = tree.columns;
                                    var valueToCompare = e.target.value;
                                    valueToCompare = valueToCompare.trim();
                                    if (valueToCompare === "") {
                                        tree.dataSource.filter([]);
                                    }
                                    else {
                                        var filter = [{
                                                logic: 'or',
                                                filters: []
                                            }];
                                        columns.forEach(function (x) {
                                            if (x.field) {
                                                var type = x.type;
                                                if (!x.isCombbox) {
                                                    if (!type) {
                                                        type = 'string';
                                                    }
                                                    if (type === 'string') {
                                                        filter[0].filters.push({
                                                            field: x.field,
                                                            operator: 'contains',
                                                            value: e.target.value
                                                        });
                                                    }
                                                    else if (type == 'number') {
                                                        if (gridInternal_9.isNumeric(e.target.value)) {
                                                            filter[0].filters.push({
                                                                field: x.field,
                                                                operator: 'eq',
                                                                value: e.target.value
                                                            });
                                                        }
                                                    }
                                                    else if (type == 'date') {
                                                        var data = grid.dataSource.data();
                                                        for (var i = 0; i < data.length; i++) {
                                                            var dateStr = kendo.format(x.format, data[i][x.field]);
                                                            if (dateStr.indexOf(e.target.value) === 0) {
                                                                filter[0].filters.push({
                                                                    field: x.field,
                                                                    operator: 'eq',
                                                                    value: data[i][x.field]
                                                                });
                                                            }
                                                        }
                                                    }
                                                    else if (type == 'boolean' && gridInternal_9.getBoolean(e.target.value) !== null) {
                                                        var bool = gridInternal_9.getBoolean(e.target.value);
                                                        filter[0].filters.push({
                                                            field: x.field,
                                                            operator: 'eq',
                                                            value: bool
                                                        });
                                                    }
                                                }
                                            }
                                        });
                                        tree.dataSource.filter(filter);
                                    }
                                });
                                $(".gridLabelTextBox", treeDiv).off("keydown");
                                $(".gridLabelTextBox", treeDiv).on("keydown", function (e) {
                                    if (e.keyCode === 9 || e.keyCode === 13) {
                                        var eventId = e.currentTarget.getAttribute("data-gridbuttoneventid");
                                        var textBoxValue = e.target.value;
                                        interopHelper_4.eventTrigged(textBoxValue, eventId, "", "", "gridToolBarTextChanged", function (e) { }, function (e) { });
                                    }
                                });
                                $(".gridButton", treeDiv).off("click");
                                $(".gridButton", treeDiv).on("click", function (e) {
                                    var eventId = e.currentTarget.getAttribute("data-gridbuttoneventid");
                                    if (eventId) {
                                        var dataInObject = {};
                                        dataInObject.FieldName = dataIn.FieldName;
                                        dataInObject.InternalEventParameter = "{}";
                                        switch (eventId) {
                                            case "":
                                                break;
                                            case "excelexport":
                                                dataInObject.InternalEvent = "ExcelExport";
                                                gridInternal_9.treeRequestInternalEvent(dataInObject);
                                                break;
                                            case "pdfexport":
                                                dataInObject.InternalEvent = "PDFExport";
                                                gridInternal_9.treeRequestInternalEvent(dataInObject);
                                                break;
                                            case "expandall":
                                                dataInObject.InternalEvent = "ExpandAll";
                                                gridInternal_9.treeRequestInternalEvent(dataInObject);
                                                break;
                                            case "collapseall":
                                                dataInObject.InternalEvent = "CollapseAll";
                                                gridInternal_9.treeRequestInternalEvent(dataInObject);
                                                break;
                                            default:
                                                interopHelper_4.eventTrigged(dataIn.FieldName, eventId, "", "", "gridButtonClicked", function (e) { }, function (e) { });
                                                break;
                                        }
                                    }
                                });
                                queryLayoutUIHelpers.initializeTooltips();
                                treeDiv.data("kendoTreeList").tbody.find('tr').each(function () {
                                    kendo.bind(this, treeDiv.data("kendoTreeList").dataItem(this));
                                });
                                treeDiv.find('.k-grid-content > table').addClass('table-hover table-striped table-condensed table-noborder');
                            }
                        });
                    }
                    var treeObject = treeDiv.data('kendoTreeList');
                    if (sysprotreelistinfo.prop.sysproRowSelection === true) {
                        treeObject.bind("change", gridInternal_9.treeRowSelected);
                    }
                    var matchingResults = $.grep(treeObject.dataSource.data(), function (d) {
                        return d["sysexpanded"] === true;
                    });
                    if (matchingResults) {
                        if (matchingResults.length > 0) {
                            for (var i = 0; i < matchingResults.length; i++) {
                                var dataItem = treeObject.dataSource.getByUid(matchingResults[i].uid);
                                if (dataItem) {
                                    var row = treeObject.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                                    if (row) {
                                        treeObject.expand(row);
                                    }
                                }
                            }
                        }
                    }
                    gridInternal_9.applyCheckBoxTreeContentChangeEvent(treeDiv);
                }
            });
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "refreshTreeList");
        }
    };
    AvantiGridsClass.prototype.applyCheckBoxTreeContentChangeEvent = function (treeDiv) {
        try {
            var interopHelper_5 = this.interopInternal;
            var gridInternal_10 = this;
            $(".k-grid-content", treeDiv).off("change", "input.sysEditTreeCheckBox");
            $(".k-grid-content", treeDiv).on("change", "input.sysEditTreeCheckBox", function (e) {
                var tree = treeDiv.data("kendoTreeList");
                var currentDataItem = tree.dataItem($(e.target).closest("tr"));
                var rowItem = tree.tbody.find("tr[data-uid='" + currentDataItem.uid + "']");
                tree.select(rowItem);
                var row = $(e.target).closest("tr");
                var rowIdx = $("tr", tree.tbody).index(row);
                var colIdx = $("td", row).index(e.target.parentElement);
                if (tree._group === true) {
                    colIdx = colIdx - 1;
                }
                var colName = tree.columns[colIdx].field;
                currentDataItem[colName] = this.checked;
                currentDataItem = tree.dataSource.data()[rowIdx];
                rowIdx++;
                var isLastRow = false;
                if (rowIdx == tree.dataSource.total()) {
                    isLastRow = true;
                }
                var returnChangeEventData = rowIdx + "|" + isLastRow + "|" + colName + "|" + this.checked + "|";
                if (currentDataItem !== null) {
                    var columnDetails = currentDataItem.toJSON();
                    $.each(columnDetails, function (key, value) {
                        if (key.indexOf("syscolor") === -1 &&
                            key.indexOf("sysbgcolor") === -1 &&
                            key.indexOf("sysbold") === -1 &&
                            key.indexOf("sysdisabled") === -1 &&
                            key.indexOf("sysexpanded") === -1 &&
                            key.indexOf("sysdec") === -1) {
                            var columnIsDate = false;
                            var columnIsComboBox = false;
                            for (var i = 0; i < tree.columns.length; i++) {
                                if (tree.columns[i].field === key && tree.columns[i].type === "date") {
                                    columnIsDate = true;
                                    break;
                                }
                                if (tree.columns[i].field === key && tree.columns[i].isCombbox) {
                                    columnIsComboBox = true;
                                    break;
                                }
                            }
                            if (columnIsDate) {
                                returnChangeEventData = returnChangeEventData + gridInternal_10.convertDateForGridOutput(value) + "|";
                            }
                            else if (columnIsComboBox) {
                                returnChangeEventData = returnChangeEventData + value.key + "|";
                            }
                            else {
                                returnChangeEventData = returnChangeEventData + value + "|";
                            }
                        }
                    });
                    if (currentDataItem) {
                        tree.refresh();
                        var changedRowsEvent = treeDiv.data("sysprogridchangedrows");
                        rowIdx = rowIdx - 1;
                        if (rowIdx >= 0) {
                            if (changedRowsEvent.indexOf(rowIdx) === -1) {
                                changedRowsEvent.push(rowIdx);
                                treeDiv.data("sysprogridchangedrows", changedRowsEvent);
                            }
                        }
                    }
                }
                var fieldName = treeDiv.data("sysprotreefieldname");
                interopHelper_5.eventTrigged(fieldName, returnChangeEventData, "", "", "gridCellChanged", function (e) { }, false);
                gridInternal_10.gridAutoCheckTreeColumnHeader(treeDiv);
            });
            $(".header-checkbox", treeDiv).off("click");
            $(".header-checkbox", treeDiv).on("click", function (ev) {
                ev.stopPropagation();
                var columnName = ev.target.getAttribute("data-columnname");
                var columnChecked = ev.target.checked;
                var tree = treeDiv.data("kendoTreeList");
                var changedRowsEvent = treeDiv.data("sysprogridchangedrows");
                $.each(tree.dataSource.data(), function (rowIndex) {
                    var dataItem = tree.dataSource.at(rowIndex);
                    dataItem[columnName] = columnChecked;
                    if (rowIndex >= 0) {
                        if (changedRowsEvent.indexOf(rowIndex) === -1) {
                            changedRowsEvent.push(rowIndex);
                        }
                    }
                });
                treeDiv.data("sysprogridchangedrows", changedRowsEvent);
                tree.refresh();
                setTimeout(function () {
                    ev.target.checked = ev.target.checked;
                });
                var returnChangeEventData = columnName + "|" + columnChecked;
                var fieldName = treeDiv.data("sysprotreefieldname");
                interopHelper_5.eventTrigged(fieldName, returnChangeEventData, "", "", "gridHeaderChecked", function (e) { }, false);
            });
            gridInternal_10.gridAutoCheckTreeColumnHeader(treeDiv);
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "applyContentTreeChangeEvent");
        }
    };
    AvantiGridsClass.prototype.gridAutoCheckTreeColumnHeader = function (treeDiv) {
        var interopHelper = this.interopInternal;
        if (treeDiv) {
            var tree = treeDiv.data("kendoTreeList");
            if (tree) {
                var treeColumns = tree.columns;
                var treeColumnsResults = $.grep(treeColumns, function (d) {
                    return d["showInCheckBoxHeader"] === true;
                });
                if (treeColumnsResults) {
                    if (treeColumnsResults.length > 0) {
                        for (var i = 0; i < treeColumnsResults.length; i++) {
                            var checkBoxColumn = $("input[data-columnname='" + treeColumnsResults[i].field + "']", treeDiv);
                            if (checkBoxColumn) {
                                if (checkBoxColumn[0]) {
                                    var treeData = tree.dataSource.data();
                                    treeData = $.grep(treeData, function (d) {
                                        return d["parentId"] !== null;
                                    });
                                    if (treeData.length > 0) {
                                        var matchingResults = $.grep(treeData, function (d) {
                                            return d[treeColumnsResults[i].field] === false;
                                        });
                                        if (matchingResults) {
                                            if (matchingResults.length == 0) {
                                                checkBoxColumn[0].checked = true;
                                            }
                                            else {
                                                checkBoxColumn[0].checked = false;
                                            }
                                        }
                                    }
                                    else {
                                        checkBoxColumn[0].checked = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    AvantiGridsClass.prototype.sysTreeListCellClick = function (item) {
        var interopHelper = this.interopInternal;
        var gridHelper = this;
        var eventNumber = "";
        if ($(item).data("eventnum")) {
            eventNumber = $(item).data("eventnum");
        }
        else {
            var parentNode = item.parentNode;
            eventNumber = $(parentNode).data("eventnum");
        }
        var treeDiv = $(item).closest(".syspro-tree-list");
        var tree = treeDiv.data("kendoTreeList");
        var fieldName = treeDiv.data("sysprotreefieldname");
        var row = tree.dataItem($(item).closest("tr"));
        var rowTr = $(item).closest("tr");
        rowTr.data("sysignorerowselectedevent", true);
        var currentDataItem = tree.dataItem(row);
        var currentSelectedItem = rowTr.index() + "|";
        if (currentDataItem !== null) {
            var columnDetails = currentDataItem.toJSON();
            $.each(columnDetails, function (key, value) {
                if (key.indexOf("syscolor") === -1 &&
                    key.indexOf("sysbgcolor") === -1 &&
                    key.indexOf("sysbold") === -1 &&
                    key.indexOf("sysdisabled") === -1 &&
                    key.indexOf("sysexpanded") === -1 &&
                    key.indexOf("sysdec") === -1) {
                    var columnIsDate = false;
                    for (var i = 0; i < tree.columns.length; i++) {
                        if (tree.columns[i].field === key && tree.columns[i].type === "date") {
                            columnIsDate = true;
                        }
                    }
                    if (columnIsDate) {
                        currentSelectedItem = currentSelectedItem + gridHelper.convertDateForGridOutput(value) + "|";
                    }
                    else {
                        currentSelectedItem = currentSelectedItem + value + "|";
                    }
                }
            });
            interopHelper.eventTrigged(fieldName, currentSelectedItem, "", "", "treeRowSelected", function (e) { }, function (e) { });
        }
        var sysTreeListCellClickResult = eventNumber + "|";
        $.each(columnDetails, function (key, value) {
            if (key.indexOf("syscolor") === -1 &&
                key.indexOf("sysbgcolor") === -1 &&
                key.indexOf("sysbold") === -1 &&
                key.indexOf("sysdisabled") === -1 &&
                key.indexOf("sysexpanded") === -1 &&
                key.indexOf("sysdec") === -1) {
                var columnIsDate = false;
                var columnIsComboBox = false;
                for (var i = 0; i < tree.columns.length; i++) {
                    if (tree.columns[i].field === key && tree.columns[i].type === "date") {
                        columnIsDate = true;
                        break;
                    }
                    if (tree.columns[i].field === key && tree.columns[i].isCombbox) {
                        columnIsComboBox = true;
                        break;
                    }
                }
                if (columnIsDate) {
                    sysTreeListCellClickResult = sysTreeListCellClickResult + gridHelper.convertDateForGridOutput(value) + "|";
                }
                else if (columnIsComboBox) {
                    sysTreeListCellClickResult = sysTreeListCellClickResult + value.key + "|";
                }
                else {
                    sysTreeListCellClickResult = sysTreeListCellClickResult + value + "|";
                }
            }
        });
        var raiseHyperlinkClickEvent = false;
        if (item.className === "syspro-grid-row-hyperlink") {
            raiseHyperlinkClickEvent = true;
        }
        if (item.className === "") {
            if (item.parentNode.className === "syspro-grid-row-hyperlink") {
                raiseHyperlinkClickEvent = true;
            }
        }
        if (raiseHyperlinkClickEvent == true) {
            interopHelper.eventTrigged(fieldName, sysTreeListCellClickResult, "", "", "treeHyperlinkClicked", function (e) { }, function (e) { });
        }
    };
    AvantiGridsClass.prototype.treeRequestInternalEvent = function (dataIn) {
        try {
            var interopHelper = this.interopInternal;
            var gridHelper_3 = this;
            var treeDivs = $('*[data-sysprotreefieldname="' + dataIn.FieldName + '"]');
            var currentSelectedItem = "";
            var dataItem;
            var SplitInternalEventParameter;
            if (treeDivs.length > 0) {
                var tree = treeDivs.data("kendoTreeList");
                if (tree !== null) {
                    switch (dataIn.InternalEvent) {
                        case "GetSelectedRow":
                            currentSelectedItem = "false";
                            var selectedRow = tree.select();
                            var currentDataItem = tree.dataItem(tree.select());
                            if (currentDataItem) {
                                currentSelectedItem = selectedRow.index() + "|";
                                var columnDetails = currentDataItem.toJSON();
                                $.each(columnDetails, function (key, value) {
                                    if (key.indexOf("syscolor") === -1 &&
                                        key.indexOf("sysbgcolor") === -1 &&
                                        key.indexOf("sysbold") === -1 &&
                                        key.indexOf("sysdisabled") === -1 &&
                                        key.indexOf("sysexpanded") === -1 &&
                                        key.indexOf("sysdec") === -1) {
                                        var columnIsDate = false;
                                        for (var i = 0; i < tree.columns.length; i++) {
                                            if (tree.columns[i].field === key && tree.columns[i].type === "date") {
                                                columnIsDate = true;
                                            }
                                        }
                                        if (columnIsDate) {
                                            currentSelectedItem = currentSelectedItem + gridHelper_3.convertDateForGridOutput(value) + "|";
                                        }
                                        else {
                                            currentSelectedItem = currentSelectedItem + value + "|";
                                        }
                                    }
                                });
                            }
                            break;
                        case "SetSelectedRow":
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            var rowId = SplitInternalEventParameter[0];
                            var bubbleEvent = SplitInternalEventParameter[1];
                            var dataItem = tree.dataSource.at(rowId);
                            if (dataItem) {
                                var row = tree.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                                tree.select(row);
                                if (dataItem) {
                                    var parentNodeItem1 = tree.dataSource.parentNode(dataItem);
                                    if (parentNodeItem1) {
                                        var parentNodeRow1 = tree.tbody.find("tr[data-uid='" + parentNodeItem1.uid + "']");
                                        tree.expand(parentNodeRow1);
                                        var parentNodeItem2 = tree.dataSource.parentNode(parentNodeItem1);
                                        if (parentNodeItem2) {
                                            var parentNodeRow2 = tree.tbody.find("tr[data-uid='" + parentNodeItem2.uid + "']");
                                            tree.expand(parentNodeRow2);
                                        }
                                    }
                                }
                                if (bubbleEvent === "true") {
                                    var columnDetails = dataItem.toJSON();
                                    $.each(columnDetails, function (key, value) {
                                        if (key.indexOf("syscolor") === -1 &&
                                            key.indexOf("sysbgcolor") === -1 &&
                                            key.indexOf("sysbold") === -1 &&
                                            key.indexOf("sysdisabled") === -1 &&
                                            key.indexOf("sysexpanded") === -1 &&
                                            key.indexOf("sysdec") === -1) {
                                            var columnIsDate = false;
                                            for (var i = 0; i < tree.columns.length; i++) {
                                                if (tree.columns[i].field === key && tree.columns[i].type === "date") {
                                                    columnIsDate = true;
                                                }
                                            }
                                            if (columnIsDate) {
                                                currentSelectedItem = currentSelectedItem + gridHelper_3.convertDateForGridOutput(value) + "|";
                                            }
                                            else {
                                                currentSelectedItem = currentSelectedItem + value + "|";
                                            }
                                        }
                                    });
                                    interopHelper.eventTrigged(dataIn.FieldName, currentSelectedItem, "", "", "treeRowSelected", function (e) { }, function (e) { });
                                }
                            }
                            currentSelectedItem = "";
                            break;
                        case "SetCellValue":
                            var tree = treeDivs.data("kendoTreeList");
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            var itemRowNumber = SplitInternalEventParameter[0] - 1;
                            var valueToUpdate;
                            if (tree) {
                                dataItem = tree.dataSource.data()[itemRowNumber];
                                if (dataItem !== null) {
                                    if (SplitInternalEventParameter[2] === "true") {
                                        valueToUpdate = true;
                                    }
                                    else if (SplitInternalEventParameter[2] === "false") {
                                        valueToUpdate = false;
                                    }
                                    else {
                                        valueToUpdate = SplitInternalEventParameter[2];
                                    }
                                    dataItem.set(SplitInternalEventParameter[1], valueToUpdate);
                                    dataItem.dirtyFields = {};
                                    dataItem.dirty = false;
                                    var itemCellIndex = 0;
                                    var isBoolean = false;
                                    for (var j = 0; j < tree.columns.length; j++) {
                                        if (tree.columns[j].field === SplitInternalEventParameter[1]) {
                                            itemCellIndex = j;
                                            if (tree.columns[j].type === "boolean") {
                                                isBoolean = true;
                                            }
                                            break;
                                        }
                                    }
                                    if (isBoolean) {
                                        var row = tree.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                                        if (row) {
                                            var htmlitem = $("input", $("td", row)[itemCellIndex])[0];
                                            if (htmlitem) {
                                                htmlitem.checked = valueToUpdate;
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        case "DisableEntryGrid":
                            $.each(treeDivs, function (index) {
                                var treeDiv = $(this);
                                treeDiv.data("sysproentrygriddisabled", true);
                                var treeFieldName = treeDiv.data("sysprotreefieldname");
                                var dataInObject = {};
                                dataInObject.FieldName = treeFieldName;
                                dataInObject.GridData = treeDiv.data("sysprotreelistinfo");
                                dataInObject.FromRequestInternal = true;
                                gridHelper_3.refreshTreeList(dataInObject);
                                if (treeDiv[0]) {
                                    if (treeDiv[0].parentElement) {
                                        treeDiv[0].parentElement.className = "panel-body widget-sysprodisabled";
                                    }
                                }
                            });
                            break;
                        case "EnableEntryGrid":
                            $.each(treeDivs, function (index) {
                                var treeDiv = $(this);
                                treeDiv.data("sysproentrygriddisabled", false);
                                var treeFieldName = treeDiv.data("sysprotreefieldname");
                                var dataInObject = {};
                                dataInObject.FieldName = treeFieldName;
                                dataInObject.GridData = treeDiv.data("sysprotreelistinfo");
                                dataInObject.FromRequestInternal = true;
                                gridHelper_3.refreshTreeList(dataInObject);
                                if (treeDiv[0]) {
                                    if (treeDiv[0].parentElement) {
                                        treeDiv[0].parentElement.className = "panel-body";
                                    }
                                }
                            });
                            break;
                        case "SetHeaders":
                            var setHeaderDetails = JSON.parse(dataIn.InternalEventParameter);
                            $.each(treeDivs, function (index) {
                                var treeDiv = $(this);
                                var treeFieldName = treeDiv.data("sysprotreefieldname");
                                var sysprotreelistinfo = treeDiv.data("sysprotreelistinfo");
                                if (treeDiv) {
                                    if (sysprotreelistinfo) {
                                        $.each(setHeaderDetails.lv.cs.c, function (mycs) {
                                            var columnName = setHeaderDetails.lv.cs.c[mycs].field;
                                            var columnValue = setHeaderDetails.lv.cs.c[mycs].title;
                                            var columnSearch = null;
                                            if (setHeaderDetails.lv.cs.c[mycs].search) {
                                                columnSearch = setHeaderDetails.lv.cs.c[mycs].search;
                                            }
                                            for (j = 0; j < sysprotreelistinfo.cs.c.length; j++) {
                                                if (sysprotreelistinfo.cs.c[j].field === columnName) {
                                                    if (columnValue === "") {
                                                        columnValue = "  ";
                                                    }
                                                    sysprotreelistinfo.cs.c[j].title = columnValue;
                                                    if (columnSearch) {
                                                        sysprotreelistinfo.cs.c[j].search = columnSearch;
                                                    }
                                                    break;
                                                }
                                            }
                                        });
                                        treeDiv.data("sysprotreelistinfo", sysprotreelistinfo);
                                        var dataInObject = {};
                                        dataInObject.FieldName = treeFieldName;
                                        dataInObject.GridData = treeDiv.data("sysprotreelistinfo");
                                        dataInObject.FromRequestInternal = true;
                                        gridHelper_3.refreshTreeList(dataInObject);
                                    }
                                }
                            });
                            break;
                        case "UpdateRowsByIndex":
                            var updateRowDetails = JSON.parse(dataIn.InternalEventParameter);
                            $.each(treeDivs, function (index) {
                                var treeDiv = $(this);
                                var tree = treeDiv.data("kendoTreeList");
                                var treeData = tree.dataSource.data();
                                var columnToMatch = updateRowDetails.updateinfo.col;
                                if (columnToMatch) {
                                    for (var i = 0; i < updateRowDetails.lv.r.length; i++) {
                                        var itemToUpdate = updateRowDetails.lv.r[i];
                                        if (itemToUpdate) {
                                            var valueToMatch = itemToUpdate.value;
                                            var matchingResults = $.grep(treeData, function (d) {
                                                return d[columnToMatch] === valueToMatch;
                                            });
                                            if (matchingResults) {
                                                if (matchingResults.length > 0) {
                                                    var dataItem = tree.dataSource.getByUid(matchingResults[0].uid);
                                                    $.each(itemToUpdate, function (key, value) {
                                                        if (key !== "value") {
                                                            dataItem[key] = value;
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    tree.refresh();
                                }
                            });
                            break;
                        case "FindRow":
                            currentSelectedItem = "false";
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            var columnToMatch = SplitInternalEventParameter[0];
                            var valueToMatch = SplitInternalEventParameter[1];
                            if (valueToMatch === "true") {
                                valueToMatch = true;
                            }
                            else if (valueToMatch === "false") {
                                valueToMatch = false;
                            }
                            var treeData = tree.dataSource.data();
                            var matchingResults = $.grep(treeData, function (d) {
                                return d[columnToMatch] === valueToMatch;
                            });
                            if (matchingResults) {
                                if (matchingResults.length > 0) {
                                    var dataItem = tree.dataSource.getByUid(matchingResults[0].uid);
                                    var row = tree.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                                    if (row) {
                                        var rowIndex = row[0].rowIndex;
                                        rowIndex++;
                                        currentSelectedItem = rowIndex;
                                    }
                                }
                            }
                            break;
                        case "GetAllMatchedRows":
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            var columnToMatch = SplitInternalEventParameter[0];
                            var valueToMatch = SplitInternalEventParameter[1];
                            if (valueToMatch === "true") {
                                valueToMatch = true;
                            }
                            if (valueToMatch === "false") {
                                valueToMatch = false;
                            }
                            if (columnToMatch === "parentId") {
                                valueToMatch = parseInt(valueToMatch, 10);
                            }
                            var columnToMatch1 = "";
                            var valueToMatch1 = "";
                            var matchingResults;
                            var treeData = tree.dataSource.data();
                            if (SplitInternalEventParameter.length > 2) {
                                columnToMatch1 = SplitInternalEventParameter[2];
                                valueToMatch1 = SplitInternalEventParameter[3];
                                matchingResults = $.grep(treeData, function (d) {
                                    return d[columnToMatch] === valueToMatch && d[columnToMatch1] === valueToMatch1;
                                });
                            }
                            else {
                                matchingResults = $.grep(treeData, function (d) {
                                    return d[columnToMatch] === valueToMatch;
                                });
                            }
                            currentSelectedItem = "false";
                            if (matchingResults) {
                                if (matchingResults.length > 0) {
                                    currentSelectedItem = "";
                                    for (var k = 0; k < matchingResults.length; k++) {
                                        var selectedItem = tree.dataSource.getByUid(matchingResults[k].uid);
                                        var row = tree.tbody.find("tr[data-uid='" + selectedItem.uid + "']");
                                        if (row) {
                                            var rowIndex = row[0].rowIndex;
                                            rowIndex++;
                                            currentSelectedItem = currentSelectedItem + rowIndex + "|";
                                            var columnDetails = selectedItem.toJSON();
                                            $.each(columnDetails, function (key, value) {
                                                if (key.indexOf("syscolor") === -1 &&
                                                    key.indexOf("sysbgcolor") === -1 &&
                                                    key.indexOf("sysbold") === -1 &&
                                                    key.indexOf("sysdisabled") === -1 &&
                                                    key.indexOf("sysexpanded") === -1 &&
                                                    key.indexOf("sysdec") === -1) {
                                                    var columnIsDate = false;
                                                    var columnIsComboBox = false;
                                                    var columnFound = false;
                                                    for (var i = 0; i < tree.columns.length; i++) {
                                                        if (key === "id" || key === "parentId") {
                                                            break;
                                                        }
                                                        if (tree.columns[i].field === key) {
                                                            if (tree.columns[i].type === "date") {
                                                                columnIsDate = true;
                                                            }
                                                            columnFound = true;
                                                            break;
                                                        }
                                                        if (tree.columns[i].field === key && tree.columns[i].isCombbox) {
                                                            columnIsComboBox = true;
                                                            columnFound = true;
                                                            break;
                                                        }
                                                        if (tree.columns[i].field === key) {
                                                            columnFound = true;
                                                        }
                                                    }
                                                    if (columnFound) {
                                                        if (columnIsDate) {
                                                            currentSelectedItem = currentSelectedItem + gridHelper_3.convertDateForGridOutput(value) + "|";
                                                        }
                                                        else if (columnIsComboBox) {
                                                            currentSelectedItem = currentSelectedItem + value.key + "|";
                                                        }
                                                        else {
                                                            currentSelectedItem = currentSelectedItem + value + "|";
                                                        }
                                                    }
                                                }
                                            });
                                            currentSelectedItem = currentSelectedItem + "\r\n";
                                        }
                                    }
                                }
                            }
                            break;
                        case "GetAllChangedGridRows":
                            currentSelectedItem = "false";
                            $.each(treeDivs, function (index) {
                                var treeDiv = $(this);
                                var tree = treeDiv.data("kendoTreeList");
                                var changedRows = treeDiv.data("sysprogridchangedrows");
                                if (changedRows) {
                                    if (changedRows.length > 0) {
                                        currentSelectedItem = "";
                                        $.each(changedRows, function (rowIndex) {
                                            var selectedItem = tree.dataSource.at(this);
                                            var rowIdx = this + 1;
                                            currentSelectedItem = currentSelectedItem + rowIdx + "|";
                                            var columnDetails = selectedItem.toJSON();
                                            $.each(columnDetails, function (key, value) {
                                                if (key.indexOf("syscolor") === -1 &&
                                                    key.indexOf("sysbgcolor") === -1 &&
                                                    key.indexOf("sysbold") === -1 &&
                                                    key.indexOf("sysdisabled") === -1 &&
                                                    key.indexOf("sysexpanded") === -1 &&
                                                    key.indexOf("sysdec") === -1) {
                                                    var columnIsDate = false;
                                                    var columnIsComboBox = false;
                                                    var columnFound = false;
                                                    for (var i = 0; i < tree.columns.length; i++) {
                                                        if (key === "id" || key === "parentId") {
                                                            break;
                                                        }
                                                        if (tree.columns[i].field === key) {
                                                            if (tree.columns[i].type === "date") {
                                                                columnIsDate = true;
                                                            }
                                                            columnFound = true;
                                                            break;
                                                        }
                                                        if (tree.columns[i].field === key && tree.columns[i].isCombbox) {
                                                            columnIsComboBox = true;
                                                            columnFound = true;
                                                            break;
                                                        }
                                                        if (tree.columns[i].field === key) {
                                                            columnFound = true;
                                                        }
                                                    }
                                                    if (columnFound) {
                                                        if (columnIsDate) {
                                                            currentSelectedItem = currentSelectedItem + gridHelper_3.convertDateForGridOutput(value) + "|";
                                                        }
                                                        else if (columnIsComboBox) {
                                                            currentSelectedItem = currentSelectedItem + value.key + "|";
                                                        }
                                                        else {
                                                            currentSelectedItem = currentSelectedItem + value + "|";
                                                        }
                                                    }
                                                }
                                            });
                                            currentSelectedItem = currentSelectedItem + "\r\n";
                                        });
                                    }
                                }
                            });
                            break;
                        case "DeleteCurrentRow":
                            currentSelectedItem = "false";
                            var selectedRow = tree.select();
                            var currentDataItem = tree.dataItem(tree.select());
                            if (currentDataItem) {
                                currentSelectedItem = selectedRow.index() + "|";
                                var columnDetails = currentDataItem.toJSON();
                                $.each(columnDetails, function (key, value) {
                                    if (key.indexOf("syscolor") === -1 &&
                                        key.indexOf("sysbgcolor") === -1 &&
                                        key.indexOf("sysbold") === -1 &&
                                        key.indexOf("sysdisabled") === -1 &&
                                        key.indexOf("sysexpanded") === -1 &&
                                        key.indexOf("sysdec") === -1) {
                                        var columnIsDate = false;
                                        for (var i = 0; i < tree.columns.length; i++) {
                                            if (tree.columns[i].field === key && tree.columns[i].type === "date") {
                                                columnIsDate = true;
                                            }
                                        }
                                        if (columnIsDate) {
                                            currentSelectedItem = currentSelectedItem + gridHelper_3.convertDateForGridOutput(value) + "|";
                                        }
                                        else {
                                            currentSelectedItem = currentSelectedItem + value + "|";
                                        }
                                    }
                                });
                                tree.dataSource.pushDestroy(currentDataItem);
                            }
                            break;
                        case "SelectRowAt":
                            var rowId = +dataIn.InternalEventParameter;
                            rowId = rowId - 1;
                            var dataItem = tree.dataSource.at(rowId);
                            if (dataItem) {
                                var row = tree.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                                tree.select(row);
                            }
                            break;
                        case "AddChildRow":
                            var addRowDetails = JSON.parse(dataIn.InternalEventParameter);
                            tree.dataSource.pushCreate(addRowDetails);
                            break;
                        case "RemoveChildRow":
                            var removeRowDetails = JSON.parse(dataIn.InternalEventParameter);
                            tree.dataSource.pushDestroy(removeRowDetails);
                            break;
                        case "GetChildRows":
                            var rowId = +dataIn.InternalEventParameter;
                            rowId = rowId - 1;
                            var dataItem = tree.dataSource.at(rowId);
                            if (dataItem) {
                                if (dataItem.hasChildren) {
                                    var children = tree.dataSource.childNodes(dataItem);
                                    currentSelectedItem = "";
                                    for (var k = 0; k < children.length; k++) {
                                        var selectedItem = tree.dataSource.getByUid(children[k].uid);
                                        var row = tree.tbody.find("tr[data-uid='" + selectedItem.uid + "']");
                                        if (row) {
                                            var rowIndex = row[0].rowIndex;
                                            rowIndex++;
                                            currentSelectedItem = currentSelectedItem + rowIndex + "|";
                                            var columnDetails = selectedItem.toJSON();
                                            $.each(columnDetails, function (key, value) {
                                                if (key.indexOf("syscolor") === -1 &&
                                                    key.indexOf("sysbgcolor") === -1 &&
                                                    key.indexOf("sysbold") === -1 &&
                                                    key.indexOf("sysdisabled") === -1 &&
                                                    key.indexOf("sysexpanded") === -1 &&
                                                    key.indexOf("sysdec") === -1) {
                                                    var columnIsDate = false;
                                                    var columnIsComboBox = false;
                                                    for (var i = 0; i < tree.columns.length; i++) {
                                                        if (tree.columns[i].field === key && tree.columns[i].type === "date") {
                                                            columnIsDate = true;
                                                            break;
                                                        }
                                                        if (tree.columns[i].field === key && tree.columns[i].isCombbox) {
                                                            columnIsComboBox = true;
                                                            break;
                                                        }
                                                    }
                                                    if (columnIsDate) {
                                                        currentSelectedItem = currentSelectedItem + gridHelper_3.convertDateForGridOutput(value) + "|";
                                                    }
                                                    else if (columnIsComboBox) {
                                                        currentSelectedItem = currentSelectedItem + value.key + "|";
                                                    }
                                                    else {
                                                        currentSelectedItem = currentSelectedItem + value + "|";
                                                    }
                                                }
                                            });
                                            currentSelectedItem = currentSelectedItem + "\r\n";
                                        }
                                    }
                                }
                            }
                            break;
                        case "Size":
                            currentSelectedItem = tree.dataSource.total() + "|";
                            break;
                        case "ExpandAll":
                            var rows = $("tr.k-treelist-group", tree.tbody);
                            if (rows) {
                                $.each(rows, function (idx, row) {
                                    tree.expand(row);
                                });
                            }
                            break;
                        case "CollapseAll":
                            var rows = $("tr.k-treelist-group", tree.tbody);
                            if (rows) {
                                $.each(rows, function (idx, row) {
                                    tree.collapse(row);
                                });
                            }
                            break;
                        case "ExcelExport":
                            if (tree) {
                                tree.saveAsExcel();
                            }
                            break;
                        case "PDFExport":
                            if (tree) {
                                tree.saveAsPDF();
                            }
                            break;
                        case "GetAllGridRows":
                            var allGridRows = "";
                            currentSelectedItem = "false";
                            $.each(tree.dataSource.data(), function (rowIndex) {
                                var rowItem = tree.dataSource.at(rowIndex);
                                var oneBaseIndex = rowIndex + 1;
                                currentSelectedItem = oneBaseIndex + "|";
                                $.each(rowItem, function (key, value) {
                                    if (key.indexOf("syscolor") === -1 &&
                                        key.indexOf("sysbgcolor") === -1 &&
                                        key.indexOf("sysbold") === -1 &&
                                        key.indexOf("sysdisabled") === -1 &&
                                        key.indexOf("sysexpanded") === -1 &&
                                        key.indexOf("sysdec") === -1) {
                                        var columnFound = false;
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        for (var i = 0; i < tree.columns.length; i++) {
                                            if (tree.columns[i].field === key) {
                                                columnFound = true;
                                                if (tree.columns[i].type === "date") {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (tree.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (columnFound === true) {
                                        if (columnIsDate === true) {
                                            currentSelectedItem = currentSelectedItem + gridHelper_3.convertDateForGridOutput(value) + "|";
                                        }
                                        else if (columnIsComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.key + "|";
                                        }
                                        else {
                                            currentSelectedItem = currentSelectedItem + value + "|";
                                        }
                                    }
                                    else {
                                        if (key === "syshidden") {
                                            currentSelectedItem = currentSelectedItem + "syshidden|";
                                        }
                                    }
                                });
                                allGridRows = allGridRows + currentSelectedItem + "\r\n";
                            });
                            currentSelectedItem = allGridRows;
                            break;
                        case "DisableCellHyperlink":
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            $.each(treeDivs, function (index) {
                                var treeDiv = $(this);
                                var tree = treeDiv.data("kendoTreeList");
                                if (tree) {
                                    var itemRowNumber = SplitInternalEventParameter[0] - 1;
                                    if (itemRowNumber < 0) {
                                        itemRowNumber = 0;
                                    }
                                    var item = tree.dataSource.data()[itemRowNumber];
                                    var rowTr = tree.table.find("tr[data-uid='" + item.uid + "']");
                                    var itemColumnIndex = 0;
                                    itemColumnIndex = parseInt(SplitInternalEventParameter[1]);
                                    itemColumnIndex--;
                                    var hasCommandColumn = treeDiv.data("sysprohascommandcolumn");
                                    if (hasCommandColumn === true) {
                                        itemColumnIndex = itemColumnIndex + 1;
                                    }
                                    var columnFieldName = tree.columns[itemColumnIndex].field;
                                    var columnTemplate = tree.columns[itemColumnIndex].template;
                                    var colTd = rowTr.find("td:eq(" + itemColumnIndex + ")");
                                    if (colTd[0]) {
                                        if (colTd[0].childNodes[1]) {
                                            if (SplitInternalEventParameter[2] === "true") {
                                                if (colTd[0].childNodes[1].className) {
                                                    if (colTd[0].childNodes[1].className === "syspro-grid-row-hyperlink") {
                                                        colTd[0].childNodes[1].className = "";
                                                    }
                                                }
                                            }
                                            else {
                                                colTd[0].childNodes[1].className = "syspro-grid-row-hyperlink";
                                            }
                                        }
                                    }
                                }
                            });
                            break;
                        case "DisableGridCells":
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            $.each(treeDivs, function (index) {
                                var treeDiv = $(this);
                                var tree = treeDiv.data("kendoTreeList");
                                var disabled = SplitInternalEventParameter[0];
                                var itemRowNumber = +SplitInternalEventParameter[1];
                                itemRowNumber = itemRowNumber - 1;
                                var itemRow = tree.dataSource.data()[itemRowNumber];
                                if (itemRow) {
                                    var collectionRow = itemRow["colDisabled"];
                                    if (!collectionRow || collectionRow === "undefined") {
                                        itemRow["colDisabled"] = "";
                                    }
                                    collectionRow = itemRow["colDisabled"];
                                    if (collectionRow[collectionRow.length - 1] !== "|") {
                                        collectionRow = collectionRow + "|";
                                    }
                                    var hasCheckBox = false;
                                    if (collectionRow) {
                                        for (var i = 2; i < SplitInternalEventParameter.length; i++) {
                                            if (SplitInternalEventParameter[i] !== "") {
                                                if (SplitInternalEventParameter[i].includes("sysdisabled") == false) {
                                                    var itemColumnIndex = SplitInternalEventParameter[i] + "|";
                                                    if (collectionRow.includes(itemColumnIndex)) {
                                                        collectionRow = collectionRow.replace(itemColumnIndex, '');
                                                    }
                                                    if (disabled === "true") {
                                                        if (collectionRow.slice(-1) === "|") {
                                                            collectionRow = collectionRow + itemColumnIndex;
                                                        }
                                                        else {
                                                            collectionRow = collectionRow + "|" + itemColumnIndex;
                                                        }
                                                    }
                                                }
                                                else {
                                                    var itemName = SplitInternalEventParameter[i];
                                                    hasCheckBox = true;
                                                    if (disabled === "true") {
                                                        itemRow[itemName] = true;
                                                    }
                                                    else {
                                                        itemRow[itemName] = false;
                                                    }
                                                }
                                            }
                                        }
                                        itemRow["colDisabled"] = collectionRow;
                                        if (hasCheckBox) {
                                            tree.refresh();
                                        }
                                    }
                                }
                            });
                            break;
                        case "ShowGridCellMessage":
                            var messageDetails = JSON.parse(dataIn.InternalEventParameter);
                            if (messageDetails.lv.mss.ms.length > 0) {
                                $.each(treeDivs, function (index) {
                                    var treeDiv = $(this);
                                    $('.gridlist-cell-note', treeDiv).remove();
                                    var tree = treeDiv.data("kendoTreeList");
                                    if (tree) {
                                        for (var i = 0; i < messageDetails.lv.mss.ms.length; i++) {
                                            var messageItem = messageDetails.lv.mss.ms[i];
                                            var itemRowNumber = messageItem.row - 1;
                                            var itemColumnName = messageItem.col;
                                            var itemColumnIndex = 0;
                                            var itemValue = messageItem.val;
                                            var itemSysDisabled = messageItem.sysDisabled;
                                            var valueToUpdate;
                                            var isBoolean = false;
                                            var isEditable = true;
                                            for (j = 0; j < tree.columns.length; j++) {
                                                if (tree.columns[j].field === itemColumnName) {
                                                    itemColumnIndex = j;
                                                    if (tree.columns[j].type === "boolean") {
                                                        isBoolean = true;
                                                    }
                                                    if (tree.columns[j].editable === false) {
                                                        isEditable = false;
                                                    }
                                                    break;
                                                }
                                            }
                                            if (itemValue) {
                                                var updateDataItem = tree.dataSource.data()[itemRowNumber];
                                                if (updateDataItem) {
                                                    if (itemValue === "true") {
                                                        valueToUpdate = true;
                                                    }
                                                    else if (itemValue === "false") {
                                                        valueToUpdate = false;
                                                    }
                                                    else {
                                                        valueToUpdate = itemValue;
                                                    }
                                                    if (isEditable == false) {
                                                        updateDataItem[itemColumnName] = valueToUpdate;
                                                    }
                                                    else {
                                                        updateDataItem.set(itemColumnName, valueToUpdate);
                                                    }
                                                    updateDataItem.dirtyFields = {};
                                                    updateDataItem.dirty = false;
                                                    if (isBoolean === true) {
                                                        updateDataItem[itemColumnIndex] = valueToUpdate;
                                                    }
                                                }
                                            }
                                            if (itemSysDisabled) {
                                                var columnValues = "";
                                                var itemRow;
                                                itemRow = tree.dataSource.data()[itemRowNumber];
                                                if (itemRow) {
                                                    var collectionRow = itemRow["colDisabled"];
                                                    if (!collectionRow || collectionRow === "undefined") {
                                                        itemRow["colDisabled"] = "";
                                                    }
                                                    collectionRow = itemRow["colDisabled"];
                                                    if (collectionRow[collectionRow.length - 1] !== "|") {
                                                        collectionRow = collectionRow + "|";
                                                    }
                                                    var hasCheckBox = false;
                                                    if (collectionRow) {
                                                        if (itemColumnName !== "") {
                                                            if (itemColumnName.includes("sysdisabled") == false) {
                                                                var itemColumnIndex = itemColumnName + "|";
                                                                if (collectionRow.includes(itemColumnIndex)) {
                                                                    collectionRow = collectionRow.replace(itemColumnIndex, '');
                                                                }
                                                                if (itemSysDisabled === "true") {
                                                                    if (collectionRow.slice(-1) === "|") {
                                                                        collectionRow = collectionRow + itemColumnIndex;
                                                                    }
                                                                    else {
                                                                        collectionRow = collectionRow + "|" + itemColumnIndex;
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                hasCheckBox = true;
                                                                if (itemSysDisabled === "true") {
                                                                    itemRow[itemColumnName] = true;
                                                                }
                                                                else {
                                                                    itemRow[itemColumnName] = false;
                                                                }
                                                            }
                                                        }
                                                        itemRow["colDisabled"] = collectionRow;
                                                    }
                                                }
                                            }
                                        }
                                        tree.refresh();
                                        $('.gridlist-cell-note', treeDiv).popover('destroy');
                                        $('.gridlist-cell-note', treeDiv).remove();
                                        for (var i = 0; i < messageDetails.lv.mss.ms.length; i++) {
                                            var messageItem = messageDetails.lv.mss.ms[i];
                                            var itemRowNumber = messageItem.row - 1;
                                            var itemColumnName = messageItem.col;
                                            var itemColumnIndex = 0;
                                            var itemMessage = messageItem.msg;
                                            var valueToUpdate;
                                            var isBoolean = false;
                                            for (j = 0; j < tree.columns.length; j++) {
                                                if (tree.columns[j].field === itemColumnName) {
                                                    itemColumnIndex = j;
                                                    if (tree.columns[j].type === "boolean") {
                                                        isBoolean = true;
                                                    }
                                                    break;
                                                }
                                            }
                                            var item = tree.dataSource.data()[itemRowNumber];
                                            if (item) {
                                                var row = tree.table.find("tr[data-uid='" + item.uid + "']");
                                                var container = row.find("td:eq(" + itemColumnIndex + ")");
                                                if (itemMessage) {
                                                    if (itemMessage === "" || itemMessage === "undefined") {
                                                        if (container[0]) {
                                                            container[0].remove("span.gridlist-cell-note");
                                                        }
                                                    }
                                                    else {
                                                        var htmlIn = '<a href="#" class="gridlist-cell-note" tabindex="0" data-container="body" data-toggle="popover" data-placement="bottom" data-content="' + itemMessage + '" data-trigger="focus" data-original-title="" title=""></a>';
                                                        container.append(htmlIn);
                                                    }
                                                }
                                            }
                                        }
                                        $('.gridlist-cell-note', treeDiv).popover();
                                        treeDiv.on('click', function () {
                                            $("body > .popover").remove();
                                        });
                                    }
                                });
                            }
                            break;
                    }
                }
            }
            return currentSelectedItem;
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "treeRequestInternalEvent");
        }
    };
    AvantiGridsClass.prototype.treeRowSelected = function (e) {
        try {
            var gridHolder = this;
            var tree = e.sender;
            var treeDiv = e.sender.element;
            var fieldName = treeDiv.data("sysprotreefieldname");
            var selectedRow = gridHolder.select();
            var currentSelectedItem = selectedRow.index() + "|";
            if (tree !== null) {
                var currentDataItem = tree.dataItem(gridHolder.select());
                if (currentDataItem !== null) {
                    var columnDetails = currentDataItem.toJSON();
                    $.each(columnDetails, function (key, value) {
                        if (key.indexOf("syscolor") === -1 &&
                            key.indexOf("sysbgcolor") === -1 &&
                            key.indexOf("sysbold") === -1 &&
                            key.indexOf("sysdisabled") === -1 &&
                            key.indexOf("sysexpanded") === -1 &&
                            key.indexOf("sysdec") === -1) {
                            var columnIsDate = false;
                            for (var i = 0; i < tree.columns.length; i++) {
                                if (tree.columns[i].field === key && tree.columns[i].type === "date") {
                                    columnIsDate = true;
                                }
                            }
                            if (columnIsDate) {
                                currentSelectedItem = currentSelectedItem + sysproInterop.gridHelpers.convertDateForGridOutput(value) + "|";
                            }
                            else {
                                currentSelectedItem = currentSelectedItem + value + "|";
                            }
                        }
                    });
                    if (selectedRow.data("sysignorerowselectedevent") === true) {
                        selectedRow.data("sysignorerowselectedevent", false);
                    }
                    else {
                        sysproInterop.eventTrigged(fieldName, currentSelectedItem, "", "", "treeRowSelected", function (e) { }, function (e) { });
                    }
                }
            }
        }
        catch (ex) {
            sysproInterop.handleError(ex.message, "treeRowSelected");
        }
    };
    AvantiGridsClass.prototype.createTreeView = function (dataIn) {
        try {
            var interopHelper_6 = this.interopInternal;
            var treeViewDivs = $('*[data-sysprotreeviewfieldname="' + dataIn.FieldName + '"]');
            $.each(treeViewDivs, function (index) {
                var treeViewDiv = $(this);
                if (treeViewDiv.data("kendoTreeView")) {
                    treeViewDiv.data("kendoTreeView").destroy();
                    treeViewDiv.empty();
                }
                var treeViewData = JSON.parse(dataIn.GridData).tnds;
                var treeViewDataSource = new kendo.data.HierarchicalDataSource({
                    data: treeViewData
                });
                if (treeViewDiv.length > 0) {
                    treeViewDiv.kendoTreeView({
                        loadOnDemand: true,
                        template: kendo.template($("#treeViewContextMenuTemplate").html()),
                        dataSource: treeViewDataSource,
                        expand: function onExpand(e) {
                            var dataItem = e.sender.dataItem(e.node);
                            if (dataItem) {
                                if (dataItem._loaded === false) {
                                    var nodeLevel = dataItem.level();
                                    nodeLevel = nodeLevel + 1;
                                    var parentNode = dataItem.parentNode();
                                    if (parentNode) {
                                        interopHelper_6.eventTrigged(dataIn.FieldName, dataItem.id + "|" + dataItem.text + "|" + dataItem.tag + "|" + nodeLevel + "|" + parentNode.text, "", "", "treeViewNodeExpanded", function (e) { }, function (e) { });
                                    }
                                    else {
                                        interopHelper_6.eventTrigged(dataIn.FieldName, dataItem.id + "|" + dataItem.text + "|" + dataItem.tag + "|" + nodeLevel + "|", "", "", "treeViewNodeExpanded", function (e) { }, function (e) { });
                                    }
                                }
                            }
                        },
                        select: function onSelect(e) {
                            var dataItem = e.sender.dataItem(e.node);
                            if (dataItem) {
                                var nodeLevel = dataItem.level();
                                nodeLevel = nodeLevel + 1;
                                var parentNode = dataItem.parentNode();
                                if (parentNode) {
                                    interopHelper_6.eventTrigged(dataIn.FieldName, dataItem.id + "|" + dataItem.text + "|" + dataItem.tag + "|" + nodeLevel + "|" + parentNode.text, "", "", "treeViewNodeSelected", function (e) { }, function (e) { });
                                }
                                else {
                                    interopHelper_6.eventTrigged(dataIn.FieldName, dataItem.id + "|" + dataItem.text + "|" + dataItem.tag + "|" + nodeLevel + "|", "", "", "treeViewNodeSelected", function (e) { }, function (e) { });
                                }
                            }
                        }
                    });
                    $(".syspro-tree-view").off("click", ".k-icon.k-i-more-horizontal");
                    $(".syspro-tree-view").on("click", ".k-icon.k-i-more-horizontal", function (e) {
                        e.preventDefault();
                        var treeViewSelectedDiv = $(e.currentTarget).closest('[data-sysprotreeviewfieldname]');
                        var selectedFieldName = treeViewSelectedDiv.attr("data-sysprotreeviewfieldname");
                        var treeView = treeViewSelectedDiv.data("kendoTreeView");
                        if (treeView) {
                            var itemNode = $(this).closest(".k-item");
                            if (itemNode) {
                                treeView.select(itemNode);
                                setTimeout(function () {
                                    var dataItem = treeView.dataItem(itemNode);
                                    if (dataItem) {
                                        var nodeLevel = dataItem.level();
                                        nodeLevel = nodeLevel + 1;
                                        var parentNode = dataItem.parentNode();
                                        if (parentNode) {
                                            interopHelper_6.eventTrigged(selectedFieldName, dataItem.id + "|" + dataItem.text + "|" + dataItem.tag + "|" + nodeLevel + "|" + parentNode.text, "", "", "treeViewContextMenuClicked", function (e) { }, function (e) { });
                                        }
                                        else {
                                            interopHelper_6.eventTrigged(selectedFieldName, dataItem.id + "|" + dataItem.text + "|" + dataItem.tag + "|" + nodeLevel, "", "", "treeViewContextMenuClicked", function (e) { }, function (e) { });
                                        }
                                    }
                                }, 50);
                            }
                        }
                    });
                }
            });
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "createTreeView");
        }
    };
    AvantiGridsClass.prototype.treeViewRequestInternalEvent = function (dataIn) {
        try {
            var interopHelper = this.interopInternal;
            var treeDivs = $('*[data-sysprotreeviewfieldname="' + dataIn.FieldName + '"]');
            var currentSelectedItem = "";
            var dataItem;
            var SplitInternalEventParameter;
            if (treeDivs.length > 0) {
                var tree = treeDivs.data("kendoTreeView");
                if (tree !== null) {
                    switch (dataIn.InternalEvent) {
                        case "AddItems":
                            var updateNodeDetails = JSON.parse(dataIn.InternalEventParameter);
                            var nodeId = updateNodeDetails.updateinfo.id;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                tree.append(updateNodeDetails.items, tree.findByUid(dataItem.uid));
                            }
                            break;
                        case "DeleteNode":
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                tree.remove(tree.findByUid(dataItem.uid));
                            }
                            break;
                        case "CollapseAll":
                            tree.collapse(".k-item");
                            break;
                        case "ExpandAll":
                            tree.expand(".k-item");
                            break;
                        case "ExpandNode":
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                tree.expand(tree.findByUid(dataItem.uid));
                            }
                            break;
                        case "GetParentNode":
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                var parentNode = dataItem.parentNode();
                                if (parentNode) {
                                    var nodeLevel = parentNode.level();
                                    nodeLevel = nodeLevel + 1;
                                    var grandParentNode = parentNode.parentNode();
                                    if (grandParentNode) {
                                        currentSelectedItem = parentNode.id + "|" + parentNode.text + "|" + parentNode.tag + "|" + nodeLevel + "|" + grandParentNode.text;
                                    }
                                    else {
                                        currentSelectedItem = parentNode.id + "|" + parentNode.text + "|" + parentNode.tag + "|" + nodeLevel;
                                    }
                                }
                            }
                            break;
                        case "GetNode":
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                currentSelectedItem = dataItem.id + "|" + dataItem.text + "|" + dataItem.tag;
                            }
                            break;
                        case "HasChildren":
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                if (dataItem.hasChildren === true) {
                                    currentSelectedItem = "true";
                                }
                                else {
                                    currentSelectedItem = "false";
                                }
                            }
                            break;
                        case "SetHasChildren":
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            var nodeId = SplitInternalEventParameter[0];
                            var nodeHasChildren = SplitInternalEventParameter[1];
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                dataItem.hasChildren = nodeHasChildren;
                                if (nodeHasChildren === false || nodeHasChildren === "false") {
                                    var items = dataItem.children.data();
                                    for (var i = 0, max = items.length; i < max; i++) {
                                        var item = tree.findByUid(items[0].uid);
                                        tree.remove(item);
                                    }
                                }
                            }
                            break;
                        case "NumChildren":
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                if (dataItem.items) {
                                    currentSelectedItem = dataItem.items.length;
                                }
                                else {
                                    currentSelectedItem = "0";
                                }
                            }
                            break;
                        case "SetSelected":
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                var node = tree.findByUid(dataItem.uid);
                                if (node) {
                                    tree.select(node);
                                    var nodeLevel = dataItem.level();
                                    nodeLevel = nodeLevel + 1;
                                    var parentNode = dataItem.parentNode();
                                    if (parentNode) {
                                        interopHelper.eventTrigged(dataIn.FieldName, dataItem.id + "|" + dataItem.text + "|" + dataItem.tag + "|" + nodeLevel + "|" + parentNode.text, "", "", "treeViewNodeSelected", function (e) { }, function (e) { });
                                    }
                                    else {
                                        interopHelper.eventTrigged(dataIn.FieldName, dataItem.id + "|" + dataItem.text + "|" + dataItem.tag + "|" + nodeLevel, "", "", "treeViewNodeSelected", function (e) { }, function (e) { });
                                    }
                                }
                            }
                            break;
                        case "GetSelected":
                            var selectedNode = tree.select();
                            var dataItem = tree.dataItem(selectedNode);
                            if (dataItem) {
                                var nodeLevel = dataItem.level();
                                nodeLevel = nodeLevel + 1;
                                var parentNode = dataItem.parentNode();
                                currentSelectedItem = dataItem.id + "|" + dataItem.text + "|" + dataItem.tag + "|" + nodeLevel + "|" + parentNode.text;
                            }
                            break;
                        case "UpdateItem":
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                            var nodeId = SplitInternalEventParameter[0];
                            var nodeNewText = SplitInternalEventParameter[1];
                            var nodeNewTag = SplitInternalEventParameter[2];
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                dataItem.text = nodeNewText;
                                dataItem.tag = nodeNewTag;
                            }
                            tree.refresh();
                            break;
                    }
                }
            }
            return currentSelectedItem;
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "treeViewRequestInternalEvent");
        }
    };
    AvantiGridsClass.prototype.CreateKendoGridScrollFactory = function () {
        var KendoGridScroll = {};
        KendoGridScroll.version = '0.0.3';
        KendoGridScroll.Model = function ($grid, callback) {
            this.grid = $grid.data('kendoGrid') || $grid.data('kendoTreeList');
            if (!this.grid) {
                throw 'KendoGridScroll support only kendoGrid or kendoTreeList';
            }
            this.callback = callback;
            this.gridContent = (this.grid.tbody || this.grid.content);
            this.$wrapper = this.grid.options.scrollable.virtual ?
                this.grid.wrapper.find(".k-scrollbar-vertical") : this.grid.wrapper.find('.k-grid-content');
            var that = this;
            this.grid.bind('dataBound', function (e) {
                $nextRow = findRow(that.grid, that.gridContent, that.index, that.$wrapper);
                if (that.callback)
                    that.callback(that.grid, $nextRow);
            });
        };
        KendoGridScroll.Model.prototype.scrollTo = function (index) {
            this.index = index;
            var $visibleRows = this.gridContent.find(">tr:not(.k-grouping-row)");
            var height = 0;
            $visibleRows.map(function (i, item) {
                return $(item).height();
            }).each(function (i, h) {
                height += h;
            });
            height = height / $visibleRows.length;
            var firstVisibleIndex = this.grid.dataSource.indexOf(this.grid.dataItem($visibleRows.first()));
            var relativeVisibleIndex = index - firstVisibleIndex;
            var $row = $visibleRows.eq(relativeVisibleIndex);
            var isNotExist = $row.length == 0;
            var isUp = isNotExist ? true : $row.offset().top < this.$wrapper.offset().top;
            var isDown = isNotExist ? true : ($row.offset().top + $row.height()) >
                this.$wrapper.offset().top + this.$wrapper.height();
            var $nextRow = findRow(this.grid, this.gridContent, this.index, this.$wrapper);
            if (isNotExist || isUp || isDown) {
                this.$wrapper.scrollTop((index - 1) * height);
            }
            if ($nextRow.length > 0) {
                this.callback(this.grid, $nextRow);
            }
        };
        KendoGridScroll.Model.prototype.destroy = function () {
            this.grid.unbind('dataBound');
        };
        function findRow(grid, gridContent, index, $wrapper) {
            var $newVisibleRows = gridContent.find(">tr:not(.k-grouping-row)");
            var item = grid.dataItem($newVisibleRows.first());
            var realIndex = findRealIndex(grid, item);
            if (index - realIndex < 0)
                grid.clearSelection();
            else
                $row = gridContent.find(">tr:not(.k-grouping-row)").eq(index - realIndex);
            return $row;
        }
        function findRealIndex(grid, item) {
            for (var i = 0; i < grid.dataSource._ranges.length; i++) {
                var range = grid.dataSource._ranges[i];
                var realIndex = range.data.indexOf(item);
                if (realIndex >= 0) {
                    return realIndex + range.start;
                }
            }
            return -1;
        }
        return KendoGridScroll;
    };
    AvantiGridsClass.prototype.collectCollapsedGroups = function (grid) {
        try {
            var allGroups = grid.dataSource.group();
            var LevelNames = new Array();
            var collapedGroups = new Array();
            grid.tbody.children(".k-grouping-row").each(function () {
                var groupingRow = this;
                var levelIndex = $(this).children().length;
                if (levelIndex === 1) {
                    LevelNames = new Array();
                    LevelNames.push(groupingRow.innerText);
                }
                $(this).children().each(function () {
                    if (this.attributes['aria-expanded']) {
                        if (levelIndex !== 1) {
                            if (LevelNames.length > levelIndex) {
                                LevelNames.length = levelIndex;
                                LevelNames.push(groupingRow.innerText);
                            }
                            else {
                                LevelNames.push(groupingRow.innerText);
                            }
                        }
                        if (this.attributes['aria-expanded'].value === "false") {
                            collapedGroups.push(JSON.parse(JSON.stringify(LevelNames)));
                            LevelNames.pop();
                        }
                    }
                });
            });
            return collapedGroups;
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "collectCollapsedGroups");
        }
    };
    AvantiGridsClass.prototype.expandCollapsedGroups = function (grid, collapsedGroups) {
        try {
            var LevelNames = new Array();
            grid.tbody.children(".k-grouping-row").each(function () {
                var currentRow = this;
                var currentLevelIndex = $(this).children().length;
                if (currentLevelIndex === 1) {
                    LevelNames = new Array();
                    LevelNames.push(currentRow.innerText);
                }
                $(this).children().each(function () {
                    if (this.attributes['aria-expanded']) {
                        if (currentLevelIndex !== 1) {
                            if (LevelNames.length > currentLevelIndex) {
                                LevelNames.length = currentLevelIndex;
                                LevelNames.push(currentRow.innerText);
                            }
                            else {
                                LevelNames.push(currentRow.innerText);
                            }
                        }
                        for (var i = 0; i < collapsedGroups.length; i++) {
                            if (JSON.stringify(LevelNames) === JSON.stringify(collapsedGroups[i])) {
                                grid.collapseRow($(currentRow));
                                LevelNames.pop();
                                collapsedGroups.splice(i, 1);
                                i = collapsedGroups.length;
                            }
                        }
                    }
                });
            });
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "expandCollapsedGroups");
        }
    };
    return AvantiGridsClass;
}());
var AvantiSearchClass = (function () {
    function AvantiSearchClass(interopInput) {
        this.version = "8.0.0.1";
        this.interopHelper = interopInput;
        this.CustomSearch = false;
        this.ApplySearchFilter = true;
        this.FilterCategoryNum = 0;
        this.$floaty = $('.floaty');
        this.SearchCallBackClicked = false;
        var interopHolder = this;
        this.$floaty.on('mouseover click', function (e) {
            interopHolder.$floaty.addClass('is-active');
            e.stopPropagation();
        });
        this.$floaty.on('mouseout', function () {
            interopHolder.$floaty.removeClass('is-active');
        });
        $('.container').on('click', function () {
            interopHolder.$floaty.removeClass('is-active');
        });
        this.AddedFilters = new Array();
    }
    ;
    AvantiSearchClass.prototype.OpenSearch = function (KeyField, QueryString, Context1, Context2, SourceApp, CallBack, parentdiv) {
        var interopHolder = this;
        try {
            console.log("00 - OpenSearch");
            KeyField = interopHolder.CheckForKeyfieldChange(KeyField);
            interopHolder.AddedFilters = new Array();
            interopHolder.CallBackMethod = CallBack;
            interopHolder.KeyField = KeyField;
            interopHolder.ParentDiv = parentdiv;
            var optionalFilter = "";
            if (Context1 && Context2) {
                optionalFilter = "<LevelId>" + Context1 + "</LevelId><LevelValue>" + Context2 + "</LevelValue>";
            }
            interopHolder.interopHelper.callBusinessObject("query", "ESPQSC-CAT", "<Query><Key>" + optionalFilter + "<KeyField>" + KeyField + "</KeyField></Key></Query>", "", function (result) {
                var ResultString = JSON.stringify(result);
                console.log(ResultString);
                if (!result.Query.Item.PrimaryTable) {
                    interopHolder.KeyFieldDesc = interopHolder.CamelCaseToSentence(KeyField);
                    interopHolder.interopHelper.setModalWindowTitle(parentdiv + "|" + "Search " + interopHolder.KeyFieldDesc);
                    interopHolder.CustomSearch = true;
                    interopHolder.BindSearchListInCard(1000, true);
                }
                else {
                    interopHolder.CustomSearch = false;
                    var replaced = ResultString.split('+').join('Plus');
                    console.log(replaced);
                    if (result.Query.Item)
                        if (result.Query.Item.KeyFieldDesc) {
                            interopHolder.KeyFieldDesc = result.Query.Item.KeyFieldDesc;
                            interopHolder.interopHelper.setModalWindowTitle(parentdiv + "|" + "Search " + interopHolder.KeyFieldDesc);
                        }
                    interopHolder.FilterUIData = result = JSON.parse(replaced);
                    interopHolder.BindFiltersToCard(result, true);
                    $(".avanti-base-class").css("overflow-y", "auto");
                }
            }, function (e) {
                console.log("error:" + e.ErrorMessage);
                if (interopHolder.ParentDiv.is(":visible")) {
                    interopHolder.interopHelper.handleError(e.ErrorMessage, "Load Search Filters");
                }
            }, true, false);
        }
        catch (e) {
            if (interopHolder.ParentDiv.is(":visible"))
                interopHolder.interopHelper.handleError(e.message, "Avanti Open Search");
        }
    };
    ;
    AvantiSearchClass.prototype.BindSearchListInCard = function (RowsToReturn, UpdateSlider) {
        var interopHolder = this;
        try {
            console.log("00 Reached binding method");
            if (!RowsToReturn || RowsToReturn == 0)
                RowsToReturn = 50;
            $(".search-loading-cover", interopHolder.ParentDiv).show();
            if (UpdateSlider) {
                $("#avanti-search-count-slider", interopHolder.ParentDiv).attr("data-slider-max", RowsToReturn);
                var endValueToUse = 50;
                if (endValueToUse > RowsToReturn) {
                    endValueToUse = RowsToReturn;
                }
                $("#avanti-search-count-slider", interopHolder.ParentDiv).attr("data-slider-endvalue", endValueToUse);
                $("#avanti-search-count-slider-button", interopHolder.ParentDiv).text(RowsToReturn);
                var slider = $(".avanti-search-count-slider")[0];
                var sliderObject = {
                    start: Number(RowsToReturn),
                    range: {
                        'min': 0,
                        'max': Number(RowsToReturn)
                    }
                };
                slider.noUiSlider.updateOptions(sliderObject);
            }
            if (interopHolder.KeyField) {
                if (UpdateSlider) {
                    interopHolder.GetSearchAndPerform();
                }
                else {
                    interopHolder.ApplyFilter();
                }
            }
            console.log("99 Finished binding method");
        }
        catch (ex) {
            if (this.ParentDiv.is(":visible"))
                interopHolder.interopHelper.handleError(ex.message, "Initializing Avanti Search");
        }
    };
    ;
    AvantiSearchClass.prototype.GetSearchAndPerform = function () {
        var interopHolder = this;
        if (interopHolder.CustomSearch) {
            interopHolder.ShowHideDefaulttext(true);
            $("#avanti-search-count-slider").hide();
            var timer;
            $(".avanti-search-text-input", interopHolder.ParentDiv).off("input");
            $(".avanti-search-text-input", interopHolder.ParentDiv).on("input", function () {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function () {
                    interopHolder.PerformSearch(null, "", "");
                }, 250);
            });
            $(".avanti-search-button", interopHolder.ParentDiv).off("click");
            $(".avanti-search-button", interopHolder.ParentDiv).on("click", function () { interopHolder.PerformSearch(null, "", ""); });
            interopHolder.PerformSearch(null, "", "");
        }
        else {
            interopHolder.interopHelper.callBusinessObject("query", "ESPQRY", "<Query><Key><FileType>SB</FileType><FileName>" + interopHolder.KeyField + "</FileName></Key></Query>", "", function (result) {
                var AdditionalKeys = [];
                console.log(result);
                var COMFNDSearch = new COMFNDQuery();
                if (result
                    && result.Query
                    && result.Query.Search
                    && result.Query.Search.ReturnRows)
                    if ($("#avanti-search-count-slider", interopHolder.ParentDiv)
                        && $("#avanti-search-count-slider", interopHolder.ParentDiv).length > 0) {
                        $("#avanti-search-count-slider", interopHolder.ParentDiv)[0].noUiSlider.set(result.Query.Search.ReturnRows);
                    }
                var EnteredTextPossition = "GlobalValue";
                if (!(JSON.stringify(result.Query.Search).indexOf("{2}") != -1)) {
                    if (!(JSON.stringify(result.Query.Search).indexOf("{1}") != -1)) {
                        COMFNDSearch.Search.GlobalValue = "**";
                        EnteredTextPossition = "GlobalValue";
                    }
                    else {
                        COMFNDSearch.Search.GlobalValue = "**";
                        COMFNDSearch.Search.GlobalValue1 = "**";
                        EnteredTextPossition = "GlobalValue1";
                        if (result.Query.Search.Where) {
                            $.each(result.Query.Search.Where.Expression, function (index) {
                                if (this.Value === "{0}" && this.Condition.toUpperCase() === "EQ") {
                                    if (interopHolder.interopHelper.getGlobalValue(this.Column)) {
                                        var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue(this.Column));
                                        if (FilterFoundAndSet === false) {
                                            COMFNDSearch.Search.GlobalValue = interopHolder.interopHelper.getGlobalValue(this.Column);
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue
                                            });
                                        }
                                        else {
                                            this.Condition = "LIKE";
                                        }
                                    }
                                    else if (this.Column == "Branch") {
                                        if (interopHolder.interopHelper.getGlobalValue("SABranch")) {
                                            var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue("SABranch"));
                                            if (FilterFoundAndSet === false) {
                                                COMFNDSearch.Search.GlobalValue = interopHolder.interopHelper.getGlobalValue("SABranch");
                                                AdditionalKeys.push({
                                                    key: this.Column,
                                                    value: COMFNDSearch.Search.GlobalValue
                                                });
                                            }
                                            else {
                                                this.Condition = "LIKE";
                                            }
                                        }
                                        else if (interopHolder.interopHelper.getGlobalValue("AssetBranch")) {
                                            var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue("AssetBranch"));
                                            if (FilterFoundAndSet === false) {
                                                COMFNDSearch.Search.GlobalValue = interopHolder.interopHelper.getGlobalValue("AssetBranch");
                                                AdditionalKeys.push({
                                                    key: this.Column,
                                                    value: COMFNDSearch.Search.GlobalValue
                                                });
                                            }
                                            else {
                                                this.Condition = "LIKE";
                                            }
                                        }
                                        else {
                                            this.Condition = "LIKE";
                                        }
                                    }
                                    else {
                                        this.Condition = "LIKE";
                                    }
                                }
                                else if (this.Value === "{1}" && this.Condition.toUpperCase() === "EQ") {
                                    EnteredTextPossition = "GlobalValue";
                                    if (interopHolder.interopHelper.getGlobalValue(this.Column)) {
                                        var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue(this.Column));
                                        if (FilterFoundAndSet === false) {
                                            COMFNDSearch.Search.GlobalValue1 = interopHolder.interopHelper.getGlobalValue(this.Column);
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue1
                                            });
                                        }
                                        else {
                                            this.Condition = "LIKE";
                                        }
                                    }
                                    else if (this.Column == "Branch") {
                                        if (interopHolder.interopHelper.getGlobalValue("SABranch")) {
                                            var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue("SABranch"));
                                            if (FilterFoundAndSet === false) {
                                                COMFNDSearch.Search.GlobalValue1 = interopHolder.interopHelper.getGlobalValue("SABranch");
                                                AdditionalKeys.push({
                                                    key: this.Column,
                                                    value: COMFNDSearch.Search.GlobalValue1
                                                });
                                            }
                                            else {
                                                this.Condition = "LIKE";
                                            }
                                        }
                                        else if (interopHolder.interopHelper.getGlobalValue("AssetBranch")) {
                                            var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue("AssetBranch"));
                                            if (FilterFoundAndSet === false) {
                                                COMFNDSearch.Search.GlobalValue1 = interopHolder.interopHelper.getGlobalValue("AssetBranch");
                                                AdditionalKeys.push({
                                                    key: this.Column,
                                                    value: COMFNDSearch.Search.GlobalValue1
                                                });
                                            }
                                            else {
                                                this.Condition = "LIKE";
                                            }
                                        }
                                        else {
                                            this.Condition = "LIKE";
                                        }
                                    }
                                    else {
                                        this.Condition = "LIKE";
                                    }
                                }
                            });
                        }
                    }
                }
                else {
                    COMFNDSearch.Search.GlobalValue = "**";
                    COMFNDSearch.Search.GlobalValue1 = "**";
                    COMFNDSearch.Search.GlobalValue2 = "**";
                    EnteredTextPossition = "GlobalValue2";
                    if (result.Query.Search.Where) {
                        $.each(result.Query.Search.Where.Expression, function (index) {
                            if (this.Value === "{0}" && this.Condition.toUpperCase() === "EQ") {
                                if (interopHolder.interopHelper.getGlobalValue(this.Column)) {
                                    var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue(this.Column));
                                    if (FilterFoundAndSet === false) {
                                        COMFNDSearch.Search.GlobalValue = interopHolder.interopHelper.getGlobalValue(this.Column);
                                        AdditionalKeys.push({
                                            key: this.Column,
                                            value: COMFNDSearch.Search.GlobalValue
                                        });
                                    }
                                    else {
                                        this.Condition = "LIKE";
                                    }
                                }
                                else if (this.Column == "Branch") {
                                    if (interopHolder.interopHelper.getGlobalValue("SABranch")) {
                                        var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue("SABranch"));
                                        if (FilterFoundAndSet === false) {
                                            COMFNDSearch.Search.GlobalValue = interopHolder.interopHelper.getGlobalValue("SABranch");
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue
                                            });
                                        }
                                        else {
                                            this.Condition = "LIKE";
                                        }
                                    }
                                    else if (interopHolder.interopHelper.getGlobalValue("AssetBranch")) {
                                        var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue("AssetBranch"));
                                        if (FilterFoundAndSet === false) {
                                            COMFNDSearch.Search.GlobalValue = interopHolder.interopHelper.getGlobalValue("AssetBranch");
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue
                                            });
                                        }
                                        else {
                                            this.Condition = "LIKE";
                                        }
                                    }
                                    else {
                                        this.Condition = "LIKE";
                                    }
                                }
                                else {
                                    this.Condition = "LIKE";
                                }
                            }
                            if (this.Value === "{1}" && this.Condition.toUpperCase() === "EQ") {
                                if (interopHolder.interopHelper.getGlobalValue(this.Column)) {
                                    var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue(this.Column));
                                    if (FilterFoundAndSet === false) {
                                        COMFNDSearch.Search.GlobalValue1 = interopHolder.interopHelper.getGlobalValue(this.Column);
                                        AdditionalKeys.push({
                                            key: this.Column,
                                            value: COMFNDSearch.Search.GlobalValue1
                                        });
                                    }
                                    else {
                                        this.Condition = "LIKE";
                                    }
                                }
                                else if (this.Column == "Branch") {
                                    if (interopHolder.interopHelper.getGlobalValue("SABranch")) {
                                        var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue("SABranch"));
                                        if (FilterFoundAndSet === false) {
                                            COMFNDSearch.Search.GlobalValue1 = interopHolder.interopHelper.getGlobalValue("SABranch");
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue1
                                            });
                                        }
                                        else {
                                            this.Condition = "LIKE";
                                        }
                                    }
                                    else if (interopHolder.interopHelper.getGlobalValue("AssetBranch")) {
                                        var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue("AssetBranch"));
                                        if (FilterFoundAndSet === false) {
                                            COMFNDSearch.Search.GlobalValue1 = interopHolder.interopHelper.getGlobalValue("AssetBranch");
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue1
                                            });
                                        }
                                        else {
                                            this.Condition = "LIKE";
                                        }
                                    }
                                    else {
                                        this.Condition = "LIKE";
                                    }
                                }
                                else {
                                    this.Condition = "LIKE";
                                }
                            }
                            if (this.Value === "{2}" && this.Condition.toUpperCase() === "EQ") {
                                if (interopHolder.interopHelper.getGlobalValue(this.Column)) {
                                    var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue(this.Column));
                                    if (FilterFoundAndSet === false) {
                                        COMFNDSearch.Search.GlobalValue2 = interopHolder.interopHelper.getGlobalValue(this.Column);
                                        AdditionalKeys.push({
                                            key: this.Column,
                                            value: COMFNDSearch.Search.GlobalValue2
                                        });
                                    }
                                    else {
                                        this.Condition = "LIKE";
                                    }
                                }
                                else if (this.Column == "Branch") {
                                    if (interopHolder.interopHelper.getGlobalValue("SABranch")) {
                                        var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue("SABranch"));
                                        if (FilterFoundAndSet === false) {
                                            COMFNDSearch.Search.GlobalValue2 = interopHolder.interopHelper.getGlobalValue("SABranch");
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue2
                                            });
                                        }
                                        else {
                                            this.Condition = "LIKE";
                                        }
                                    }
                                    else if (interopHolder.interopHelper.getGlobalValue("AssetBranch")) {
                                        var FilterFoundAndSet = interopHolder.FindAndSelectFilterItem(this.Column, interopHolder.interopHelper.getGlobalValue("AssetBranch"));
                                        if (FilterFoundAndSet === false) {
                                            COMFNDSearch.Search.GlobalValue2 = interopHolder.interopHelper.getGlobalValue("AssetBranch");
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue2
                                            });
                                        }
                                        else {
                                            this.Condition = "LIKE";
                                        }
                                    }
                                    else {
                                        this.Condition = "LIKE";
                                    }
                                }
                                else {
                                    this.Condition = "LIKE";
                                }
                            }
                        });
                    }
                }
                if (AdditionalKeys.length > 0) {
                    var titleText = interopHolder.ParentDiv + "|" + "Search " + interopHolder.KeyFieldDesc + " ";
                    var fieldsDescription = "";
                    for (var i = 0; i < AdditionalKeys.length; i++) {
                        fieldsDescription = fieldsDescription + AdditionalKeys[i].key + ": " + AdditionalKeys[i].value + " ";
                    }
                    if (fieldsDescription)
                        fieldsDescription = " (" + fieldsDescription + ")";
                    interopHolder.interopHelper.setModalWindowTitle(titleText + fieldsDescription);
                }
                interopHolder.AvantiSearchCOMFNDEnteredTextPossition = EnteredTextPossition;
                for (var key in result.Query.Search) {
                    COMFNDSearch.Search[key] = result.Query.Search[key];
                }
                var tableName = result.Query.Search.TableName;
                var timer;
                $(".avanti-search-text-input", interopHolder.ParentDiv).off("input");
                $(".avanti-search-text-input", interopHolder.ParentDiv).on("input", function () {
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(function () {
                        interopHolder.ApplyFilter();
                    }, 250);
                });
                $(".avanti-search-button", interopHolder.ParentDiv).off("click");
                $(".avanti-search-button", interopHolder.ParentDiv).on("click", function () { interopHolder.ApplyFilter(); });
                if (COMFNDSearch.Search.Where.Expression) {
                    if (!COMFNDSearch.Search.Where.Expression.length) {
                        var e = COMFNDSearch.Search.Where.Expression;
                        var e2 = e;
                        COMFNDSearch.Search.Where.Expression = new Array(e2);
                    }
                }
                else {
                    COMFNDSearch.Search.Where.Expression = [];
                }
                if (COMFNDSearch.Search.Where.Expression[0].OpenBracket == '(' &&
                    COMFNDSearch.Search.Where.Expression[COMFNDSearch.Search.Where.Expression.length - 1].CloseBracket == ')') {
                    COMFNDSearch.Search.Where.Expression[0].OpenBracket = '((';
                    COMFNDSearch.Search.Where.Expression[COMFNDSearch.Search.Where.Expression.length - 1].CloseBracket = '))';
                }
                else if (!COMFNDSearch.Search.Where.Expression[0].OpenBracket &&
                    !COMFNDSearch.Search.Where.Expression[COMFNDSearch.Search.Where.Expression.length - 1].CloseBracket) {
                    COMFNDSearch.Search.Where.Expression[0].OpenBracket = '(';
                    COMFNDSearch.Search.Where.Expression[COMFNDSearch.Search.Where.Expression.length - 1].CloseBracket = ')';
                }
                console.log("-----NEW COMFND -----" + JSON.stringify(COMFNDSearch));
                interopHolder.AvantiSearchCOMFNDPlainXML = COMFNDSearch;
                interopHolder.ApplyFilter();
                $(".search-loading-cover", interopHolder.ParentDiv).hide();
            }, function (e) {
                if (interopHolder.ParentDiv.is(":visible"))
                    interopHolder.interopHelper.handleError(e.ErrorMessage, "Getting Default Avanti Search");
            }, true, false);
        }
    };
    ;
    AvantiSearchClass.prototype.FindAndSelectFilterItem = function (ColumnKey, ColumnValue) {
        var interopHolder = this;
        var FoundFilter;
        FoundFilter = false;
        if (interopHolder.AddedFilters.length > 0) {
            interopHolder.AddedFilters.forEach(function (element) {
                if (element.ColumnName === ColumnKey) {
                    switch (element.ControlType) {
                        case "2":
                            {
                                FoundFilter = true;
                                element.DivSelector.val(ColumnValue);
                                element.DivSelector.find("option").removeClass("selected");
                                element.DivSelector.parent().children().find('ul').children().removeClass("selected");
                                element.DivSelector.parent().children().find('ul').children().removeAttr("selected");
                                element.DivSelector.find("option").each(function (index, item) {
                                    if (item.value === ColumnValue) {
                                        $(item).addClass("selected");
                                    }
                                });
                                element.DivSelector.parent().children().find('ul').children().each(function (index, item) {
                                    if (String(item.value) === ColumnValue) {
                                        $(item).addClass("selected");
                                        $(item).attr("selected", "selected");
                                    }
                                });
                                element.DivSelector.parent().children().find('input').val(ColumnValue);
                                break;
                            }
                        case "7":
                            {
                                FoundFilter = true;
                                element.DivSelector.find(":checkbox").each(function (index, item) {
                                    if (item.value === ColumnValue) {
                                        item.checked = true;
                                    }
                                });
                                break;
                            }
                        case "4":
                            {
                                FoundFilter = true;
                                $("[type=radio]", element.DivSelector).each(function (index, item) {
                                    if (item.value === ColumnValue) {
                                        $("[type=radio]", element.DivSelector).eq(index).prop("checked", true);
                                    }
                                });
                                break;
                            }
                        case "0":
                            {
                                FoundFilter = true;
                                element.DivSelector.val(ColumnValue);
                                break;
                            }
                        default:
                            {
                                FoundFilter = false;
                                break;
                            }
                    }
                }
            });
        }
        return FoundFilter;
    };
    AvantiSearchClass.prototype.ApplyGivenSearchFilter = function (FilterSerializedJson) {
        var interopHolder = this;
        console.log("ApplyGivenSearchFilter");
        var localCOMFNDSearchJSON = JSON.parse(JSON.stringify(interopHolder.AvantiSearchCOMFNDPlainXML));
        var filtersCount = FilterSerializedJson.length;
        var index = 1;
        var tableName = interopHolder.AvantiSearchCOMFNDPlainXML.Search.TableName;
        FilterSerializedJson.forEach(function (item) {
            if (item.Value && item.Value != "") {
                if (item.TableName != tableName) {
                    item.Column = item.TableName + "." + item.Column;
                }
                switch (item.Type) {
                    case "0":
                        var tempexp = new Expression;
                        tempexp.AndOr = "and";
                        if (index == 1) {
                            tempexp.OpenBracket = "(";
                        }
                        else {
                            tempexp.OpenBracket = "(";
                        }
                        tempexp.Column = item.Column;
                        tempexp.Condition = "LIKE";
                        tempexp.Value = "%" + item.Value + "%";
                        if (index == filtersCount) {
                            tempexp.CloseBracket = ")";
                        }
                        else {
                            tempexp.CloseBracket = ")";
                        }
                        if (localCOMFNDSearchJSON.Search.Where.Expression) {
                            localCOMFNDSearchJSON.Search.Where.Expression.push(tempexp);
                        }
                        else {
                            localCOMFNDSearchJSON.Search.Where.push({ "Expression": tempexp });
                        }
                        break;
                    case "1":
                        var tempexp = new Expression;
                        tempexp.AndOr = "and";
                        if (index == 1) {
                            tempexp.OpenBracket = "(";
                        }
                        else {
                            tempexp.OpenBracket = "(";
                        }
                        tempexp.Column = item.Column;
                        tempexp.Condition = "EQ";
                        tempexp.Value = item.Value;
                        if (index == filtersCount) {
                            tempexp.CloseBracket = ")";
                        }
                        else {
                            tempexp.CloseBracket = ")";
                        }
                        if (localCOMFNDSearchJSON.Search.Where.Expression) {
                            localCOMFNDSearchJSON.Search.Where.Expression.push(tempexp);
                        }
                        else {
                            localCOMFNDSearchJSON.Search.Where.push({ "Expression": tempexp });
                        }
                        break;
                    case "2":
                    case "3":
                    case "4":
                    case "8":
                        var tempexp = new Expression;
                        tempexp.AndOr = "and";
                        if (index == 1) {
                            tempexp.OpenBracket = "(";
                        }
                        else {
                            tempexp.OpenBracket = "(";
                        }
                        tempexp.Column = item.Column;
                        tempexp.Condition = "EQ";
                        tempexp.Value = item.Value;
                        if (index == filtersCount) {
                            tempexp.CloseBracket = ")";
                        }
                        else {
                            tempexp.CloseBracket = ")";
                        }
                        if (localCOMFNDSearchJSON.Search.Where.Expression) {
                            localCOMFNDSearchJSON.Search.Where.Expression.push(tempexp);
                        }
                        else {
                            localCOMFNDSearchJSON.Search.Where.push({ "Expression": tempexp });
                        }
                        break;
                    case "5":
                        var tempexp = new Expression;
                        var Values = item.Value.split(",");
                        tempexp.AndOr = "and";
                        if (index == 1) {
                            tempexp.OpenBracket = "(";
                        }
                        else {
                            tempexp.OpenBracket = "(";
                        }
                        tempexp.Column = item.Column;
                        tempexp.Condition = "GE";
                        tempexp.Value = Values[0];
                        tempexp.CloseBracket = ")";
                        if (localCOMFNDSearchJSON.Search.Where.Expression) {
                            localCOMFNDSearchJSON.Search.Where.Expression.push(tempexp);
                        }
                        else {
                            localCOMFNDSearchJSON.Search.Where.push({ "Expression": tempexp });
                        }
                        tempexp = new Expression;
                        tempexp.AndOr = "and";
                        tempexp.OpenBracket = "(";
                        tempexp.Column = item.Column;
                        tempexp.Condition = "LE";
                        tempexp.Value = Values[1];
                        if (index == filtersCount) {
                            tempexp.CloseBracket = ")";
                        }
                        else {
                            tempexp.CloseBracket = ")";
                        }
                        if (localCOMFNDSearchJSON.Search.Where.Expression) {
                            localCOMFNDSearchJSON.Search.Where.Expression.push(tempexp);
                        }
                        else {
                            localCOMFNDSearchJSON.Search.Where.push({ "Expression": tempexp });
                        }
                        break;
                    case "7":
                        var Values = item.Value.split(",");
                        var ValuesIndex = 1;
                        var ValuesCount = Values.length;
                        Values.forEach(function (_value) {
                            _value = _value.trim();
                            var tempexp = new Expression;
                            if (ValuesIndex == 1) {
                                tempexp.AndOr = "and";
                                tempexp.OpenBracket = "((";
                            }
                            else {
                                tempexp.AndOr = "or";
                                tempexp.OpenBracket = "(";
                            }
                            tempexp.Column = item.Column;
                            tempexp.Condition = "EQ";
                            tempexp.Value = _value;
                            if (ValuesIndex == ValuesCount) {
                                tempexp.CloseBracket = "))";
                            }
                            else {
                                tempexp.CloseBracket = ")";
                            }
                            if (localCOMFNDSearchJSON.Search.Where.Expression) {
                                localCOMFNDSearchJSON.Search.Where.Expression.push(tempexp);
                            }
                            else {
                                localCOMFNDSearchJSON.Search.Where.push({ "Expression": tempexp });
                            }
                            ValuesIndex++;
                        });
                        break;
                    case "9":
                        var tempexp = new Expression;
                        var Values = item.Value.split(",");
                        tempexp.AndOr = "and";
                        tempexp.OpenBracket = "((";
                        tempexp.Column = item.Column;
                        tempexp.Condition = "GE";
                        tempexp.Value = Values[0];
                        tempexp.CloseBracket = ")";
                        if (localCOMFNDSearchJSON.Search.Where.Expression) {
                            localCOMFNDSearchJSON.Search.Where.Expression.push(tempexp);
                        }
                        else {
                            localCOMFNDSearchJSON.Search.Where.push({ "Expression": tempexp });
                        }
                        tempexp = new Expression;
                        tempexp.AndOr = "and";
                        tempexp.OpenBracket = "(";
                        tempexp.Column = item.Column;
                        tempexp.Condition = "LE";
                        tempexp.Value = Values[1];
                        tempexp.CloseBracket = ")";
                        if (localCOMFNDSearchJSON.Search.Where.Expression) {
                            localCOMFNDSearchJSON.Search.Where.Expression.push(tempexp);
                        }
                        else {
                            localCOMFNDSearchJSON.Search.Where.push({ "Expression": tempexp });
                        }
                        tempexp = new Expression;
                        tempexp.AndOr = "or";
                        tempexp.OpenBracket = "(";
                        tempexp.Column = item.Column;
                        tempexp.Condition = "EQ";
                        tempexp.Value = "0000-00-00";
                        tempexp.CloseBracket = "))";
                        if (localCOMFNDSearchJSON.Search.Where.Expression) {
                            localCOMFNDSearchJSON.Search.Where.Expression.push(tempexp);
                        }
                        else {
                            localCOMFNDSearchJSON.Search.Where.push({ "Expression": tempexp });
                        }
                        break;
                    case "6":
                    default:
                        break;
                }
            }
            index++;
        });
        interopHolder.PerformSearch(localCOMFNDSearchJSON, tableName, interopHolder.AvantiSearchCOMFNDEnteredTextPossition);
    };
    ;
    AvantiSearchClass.prototype.PerformSearch = function (COMFNDSearchJSON, tableName, EnteredTextPossition) {
        var interopHolder = this;
        try {
            console.log("00 Perform Search");
            $(".search-loading-cover", interopHolder.ParentDiv).show();
            var t0 = performance.now();
            var BusinessObject = "COMFND";
            var BOInput = "";
            var searchText = $(".avanti-search-text-input", interopHolder.ParentDiv).val();
            if (interopHolder.CustomSearch == false) {
                var newCOMFNDSearch = COMFNDSearchJSON;
                if (!searchText) {
                    searchText = "**";
                    newCOMFNDSearch.Search[EnteredTextPossition] = searchText;
                }
                else {
                    newCOMFNDSearch.Search[EnteredTextPossition] = "*" + searchText + "*";
                }
                newCOMFNDSearch.Search.IgnoreDuplicates = "Y";
                newCOMFNDSearch.Search.IgnoreMissingKeys = "Y";
                newCOMFNDSearch.Search.IncludeColumnMetadata = "Y";
                newCOMFNDSearch.Search.EspressoSearch = "Y";
                newCOMFNDSearch.Search.Columns = newCOMFNDSearch.Search.Columns;
                newCOMFNDSearch.Search.Where = newCOMFNDSearch.Search.Where;
                newCOMFNDSearch.Search.OrderBy = newCOMFNDSearch.Search.OrderBy;
                var rowsCountToReturn = 50;
                if ($("#avanti-search-count-slider", interopHolder.ParentDiv)
                    && $("#avanti-search-count-slider", interopHolder.ParentDiv).length > 0) {
                    rowsCountToReturn = Number($("#avanti-search-count-slider")[0].noUiSlider.get());
                    if (!rowsCountToReturn || rowsCountToReturn === 0) {
                        rowsCountToReturn = Number($("#avanti-search-count-slider")[0].getAttribute("data-slider-startvalue"));
                    }
                }
                newCOMFNDSearch.Search.ReturnRows = Math.round(rowsCountToReturn);
                BOInput = JSON.stringify(newCOMFNDSearch);
            }
            else {
                BusinessObject = "ESPQRY";
                BOInput = "{\"Query\": {\"Key\": {\"FileType\": \"SS\",\"FileName\": \"" + interopHolder.KeyField + "\",\"SearchValue\": \"**\"  } } }";
            }
            interopHolder.interopHelper.callBusinessObject("query", BusinessObject, BOInput, "{}", function (result) {
                var l0 = performance.now();
                if (tableName === "")
                    tableName = interopHolder.KeyField;
                if (interopHolder.CustomSearch) {
                    result = result.Query;
                    if (result[tableName].HeaderDetails) {
                        if (result[tableName].HeaderDetails.KeyfieldDescription) {
                            interopHolder.interopHelper.setModalWindowTitle(interopHolder.ParentDiv + "|" + "Search " + result[tableName].HeaderDetails.KeyfieldDescription);
                        }
                    }
                }
                var resultsArray = [];
                if (result[tableName].RowsReturned !== 0) {
                    if (result[tableName].RowsReturned == 1) {
                        resultsArray.push(result[tableName].Row);
                    }
                    else {
                        resultsArray = result[tableName].Row;
                    }
                }
                interopHolder.colvalueslookup = new Array();
                if (result[tableName].HeaderDetails) {
                    if (result[tableName].HeaderDetails.ColumnMetadata) {
                        $.each(result[tableName].HeaderDetails.ColumnMetadata.Column, function (column) {
                            var columnItem = this;
                            if (this.ColumnDataType === "FlagYes") {
                                interopHolder.colvalueslookup[columnItem.Name] = new Array();
                                interopHolder.colvalueslookup[columnItem.Name]["Y"] = "&#x2714;";
                                interopHolder.colvalueslookup[columnItem.Name]["N"] = "";
                            }
                            else {
                                if (this.ColumnValues && this.ColumnValues.ColumnValue) {
                                    interopHolder.colvalueslookup[columnItem.Name] = new Array();
                                    $.each(this.ColumnValues.ColumnValue, function (index) {
                                        interopHolder.colvalueslookup[columnItem.Name][this.Value] = this.Text;
                                    });
                                }
                            }
                        });
                    }
                }
                if (result[tableName].HeaderDetails.Columns) {
                    if (!Array.isArray(result[tableName].HeaderDetails.Columns.Column)) {
                        result[tableName].HeaderDetails.Columns.Column = [result[tableName].HeaderDetails.Columns.Column];
                    }
                }
                var LoopColumns = null;
                if (result[tableName].HeaderDetails.ColumnMetadata) {
                    LoopColumns = result[tableName].HeaderDetails.ColumnMetadata.Column;
                }
                if (!LoopColumns) {
                    LoopColumns = result[tableName].HeaderDetails.Columns.Column;
                }
                if (!Array.isArray(LoopColumns)) {
                    LoopColumns = [LoopColumns];
                }
                var Columns = [];
                var fieldName = "";
                $.each(LoopColumns, function (index, column) {
                    var columnIn = {
                        field: column.Name,
                        title: interopHolder.FormatLinkedColumns(column.Description),
                        encoded: false,
                        width: 0,
                        template: null
                    };
                    if (column.Name) {
                        column = column;
                        var columnIn = {
                            field: column.Name,
                            title: interopHolder.FormatLinkedColumns(column.Description),
                            encoded: false,
                            width: 140,
                            template: null
                        };
                    }
                    else {
                        fieldName = column;
                        if (index == 0) {
                            fieldName = "Id";
                        }
                        else if (index == 1) {
                            fieldName = "Description";
                        }
                        else if (index == 3) {
                            fieldName = "AdditionalField1";
                        }
                        else if (index == 4) {
                            fieldName = "AdditionalField2";
                        }
                        else if (index == 5) {
                            fieldName = "DisplayField1";
                        }
                        else if (index == 6) {
                            fieldName = "DisplayField2";
                        }
                        else if (index == 7) {
                            fieldName = "DisplayField3";
                        }
                        else if (index == 8) {
                            fieldName = "DisplayField4";
                        }
                        else if (index == 9) {
                            fieldName = "DisplayField5";
                        }
                        columnIn = {
                            field: fieldName,
                            title: interopHolder.CamelCaseToSentence(column),
                            encoded: false,
                            width: 140,
                            template: null
                        };
                    }
                    if (interopHolder.colvalueslookup[column.Name]) {
                        var templaterequired = "#= AvantiSearchInterop.colvalueslookup['" + column.Name + "'][" + column.Name + "] || AvantiSearchInterop.colvalueslookup['" + column.Name + "'][" + column.Name + "] === '' ? AvantiSearchInterop.colvalueslookup['" + column.Name + "'][" + column.Name + "] : " + column.Name + " ? " + column.Name + " : '' #";
                        columnIn.template = templaterequired;
                    }
                    if (!interopHolder.CustomSearch) {
                        Columns.push(columnIn);
                    }
                    else {
                        if (index != 2) {
                            Columns.push(columnIn);
                        }
                    }
                });
                if (interopHolder.CustomSearch) {
                    interopHolder.KeyFieldColumn = "Id";
                }
                else {
                    interopHolder.KeyFieldColumn = result[tableName].HeaderDetails.Columns.Column[0];
                }
                var actionTemplatePrt1 = " <a onclick=\"sysproInterop.showSmartTag(this)\" data-fieldcaption=\"ESPRESSOKEYFIELD:";
                var actionTemplatePrt2 = "\" data-fieldvalue=\"";
                var actionTemplatePrt3 = "\">";
                var actionTemplatePrt4 = "<span class=\"text-primary sys-fg-primary\">";
                var actionTemplatePrt5 = "</span>";
                var actionTemplatePrt6 = "</a>";
                Columns.push({
                    field: "Actions",
                    template: function (dataItem) {
                        return actionTemplatePrt1 + kendo.htmlEncode(interopHolder.KeyFieldColumn) + actionTemplatePrt2 + kendo.htmlEncode(dataItem[interopHolder.KeyFieldColumn]) + actionTemplatePrt3 + actionTemplatePrt4 + "Actions" + actionTemplatePrt5 + actionTemplatePrt6;
                    },
                    width: 90
                });
                var ActionColumnIndex = Columns.length - 1;
                var grid = $(".avanti-search-results-grid", interopHolder.ParentDiv).data("kendoGrid");
                if (!grid) {
                    $(".avanti-search-results-grid", interopHolder.ParentDiv).kendoGrid({
                        dataSource: {
                            data: resultsArray,
                            pageSize: 500,
                            batch: true
                        },
                        selectable: "single",
                        height: 400,
                        change: function (arg) {
                        },
                        sortable: true,
                        filterable: true,
                        scrollable: {
                            virtual: true
                        },
                        resizable: true,
                        pageable: {
                            messages: {
                                display: "Showing {2} item(s)"
                            },
                            numeric: false,
                            previousNext: false
                        },
                        columns: Columns
                    }).on("click", "tbody td", function (e) {
                        var grid = $(".avanti-search-results-grid").data("kendoGrid");
                        var cell = $(e.currentTarget);
                        var cellIndex = cell[0].cellIndex;
                        if (grid.columns.length != (cellIndex + 1)) {
                            var dataItem = grid.dataItem(cell.closest("tr"));
                            var selected = dataItem[interopHolder.KeyFieldColumn];
                            if (callLayerInterop.avantiPluginLoaded.toUpperCase() === "SRSMAIN") {
                                if (tableName === "EccRevHistory") {
                                    selected += "/" + dataItem.get("Release");
                                }
                            }
                            console.log("Selected: " + selected);
                            if (interopHolder.CallBackMethod) {
                                if (interopHolder.SearchCallBackClicked === false) {
                                    interopHolder.SearchCallBackClicked = true;
                                    interopHolder.CallBackMethod(selected);
                                }
                                var timer = setTimeout(function () {
                                    interopHolder.SearchCallBackClicked = false;
                                }, 200);
                            }
                        }
                        else {
                            grid.clearSelection();
                        }
                    });
                }
                else {
                    var dataSource = new kendo.data.DataSource({
                        data: resultsArray,
                        pageSize: 20
                    });
                    grid.setDataSource(dataSource);
                }
                if (interopHolder.CustomSearch) {
                    var gridHolder = interopHolder.ParentDiv;
                    interopHolder.interopHelper.performPredictiveSearch(interopHolder.KeyField, searchText, function (result) {
                        resultsArray = result;
                        var dataSource = new kendo.data.DataSource({
                            data: resultsArray,
                            pageSize: 20
                        });
                        var gridInput = $(".avanti-search-results-grid", gridHolder).data("kendoGrid");
                        gridInput.setDataSource(dataSource);
                        var t1 = performance.now();
                        var tsec = 0;
                        tsec = +(((t1 - t0) / 1000).toFixed(2));
                        $(".avanti-search-results-text-count", gridHolder).text(result.length);
                        $(".avanti-search-results-text-duration", gridHolder).text(tsec);
                        $(".search-loading-cover", gridHolder).hide();
                    }, function (e) { }, "0");
                }
                var t1 = performance.now();
                var l1 = performance.now();
                var lsec = 0;
                lsec = +(((l1 - l0) / 1000).toFixed(2));
                console.log("Execution time after BO call: " + lsec + " seconds");
                var tsec = 0;
                tsec = +(((t1 - t0) / 1000).toFixed(2));
                $(".avanti-search-results-text-count", interopHolder.ParentDiv).text(result[tableName].RowsReturned);
                $(".avanti-search-results-text-duration", interopHolder.ParentDiv).text(tsec);
                $(".search-loading-cover", interopHolder.ParentDiv).hide();
            }, function (e) {
                if (interopHolder.ParentDiv.is(":visible"))
                    interopHolder.interopHelper.handleError(e.ErrorMessage, "Performing Avanti Search");
            }, false, false);
            console.log("99 Perform Search");
        }
        catch (ex) {
            if (interopHolder.ParentDiv.is(":visible"))
                interopHolder.interopHelper.handleError(ex.message, "Initializing Avanti Search");
        }
    };
    ;
    AvantiSearchClass.prototype.BindFiltersToCard = function (Query, UpdateSlider) {
        var interopHolder = this;
        console.log("00 BindFiltersToCard");
        try {
            var QueryString = null;
            var Context1 = null;
            var Context2 = null;
            var SourceApp = null;
            interopHolder.InitApplyFilterButton();
            if (Query) {
                var value = Query.Query.Item;
                if (value && value.Columns && value.Columns.Categories) {
                    $.each(value.Columns.Categories, function (Categorykey, Categoryvalue) {
                        console.log(Categorykey);
                        var PanelBarID = "Avanti-Filter-Template" + Categorykey;
                        var _PanelBar = $("#" + PanelBarID, interopHolder.ParentDiv);
                        if (_PanelBar.length === 0) {
                            $("#panelbar", interopHolder.ParentDiv).append(interopHolder.ReturnTabPanelHTML(Categorykey.toString()));
                            interopHolder.FilterCategoryNum++;
                        }
                        var DIVID = "Avanti-Filter-Template" + Categorykey;
                        var DivToBindTo = $("#" + PanelBarID, interopHolder.ParentDiv);
                        if (!Categoryvalue.Column.length) {
                            Categoryvalue.Column = new Array(Categoryvalue.Column);
                        }
                        if (Categoryvalue.Column.length > 0) {
                            for (var i = 0; i < Categoryvalue.Column.length; i++) {
                                if (Categoryvalue.Column[i].ColumnDefault === null) {
                                    Categoryvalue.Column[i].ColumnDefault = "";
                                }
                            }
                        }
                        var HarmonyObservable = kendo.observable(Categoryvalue);
                        kendo.bind(DivToBindTo, HarmonyObservable);
                        if (!Categoryvalue.Column.length) {
                            var singleFilterString = JSON.stringify(Categoryvalue.Column);
                            Categoryvalue.Column = [];
                            Categoryvalue.Column.push(JSON.parse(singleFilterString));
                        }
                        for (var i = 0; i < Categoryvalue.Column.length; i++) {
                            console.log("Tbl Desc: " + Categoryvalue.Column[i].TableDesc);
                            interopHolder.InitializeAndPopulateControl(Categoryvalue.Column[i]);
                        }
                    });
                }
                var RowCount = 50;
                if (Query.Query.Item && Query.Query.Item.PrimaryRows) {
                    RowCount = Query.Query.Item.PrimaryRows;
                }
                else if (Query.Query.Item && Query.Query.Item.Columns && Query.Query.Item.Columns.PrimaryRows) {
                    RowCount = Query.Query.Item.Columns.PrimaryRows;
                }
                if (RowCount == 0) {
                    RowCount = 50;
                }
                interopHolder.BindSearchListInCard(RowCount, UpdateSlider);
                queryLayoutUIHelpers.initializeViewOnly(false, $("#panelbar", interopHolder.ParentDiv), "");
                interopHolder.ShowHideDefaulttext(!value || !value.Columns || !value.Columns.Categories || value.Columns.Categories.length === 0);
                console.log("99 - BindFiltersToCard");
            }
        }
        catch (e) {
            if (interopHolder.ParentDiv.is(":visible"))
                interopHolder.interopHelper.handleError(e.message, "Bind Search Filter");
        }
    };
    ;
    AvantiSearchClass.prototype.ApplyFilter = function () {
        var interopHolder = this;
        console.log("00 Apply Filter");
        try {
            if (!interopHolder.ApplySearchFilter)
                return;
            var FilterItems = [];
            var Column = "";
            var Value = "";
            var TableName = "";
            var Type = "";
            var _ControlId = "";
            var Counter = 0;
            var _ControlId = "";
            $.each($(".Filter-Data-Item"), function (index) {
                console.log(this.getAttribute("data-ColumnObject"));
                Column = this.getAttribute("data-name");
                TableName = this.getAttribute("data-tablename");
                Type = this.getAttribute("data-ColumnObject");
                switch (Type) {
                    case "0":
                        Value = ($("input", this).val()).toString();
                        break;
                    case "1":
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        Value = ($("#" + _ControlId, interopHolder.ParentDiv).val()).toString();
                        break;
                    case "2":
                        var id = "Filter_" + Column + "_" + TableName + "_" + Type;
                        Value = String($("#" + id, interopHolder.ParentDiv).val());
                        if (Value === "none" || Value === "All") {
                            Value = "";
                        }
                        break;
                    case "3":
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        var id = "Filter_" + Column + "_" + TableName + "_" + Type;
                        Value = "N";
                        if ($("#" + id, interopHolder.ParentDiv).is(":checked")) {
                            Value = "Y";
                        }
                        break;
                    case "4":
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        var id = "Filter_" + Column + "_" + TableName + "_" + Type;
                        Value = interopHolder.GetTheSelectedRadioButton(id);
                        console.log("Radio Button ID:" + id);
                        console.log("Radio Button value:" + Value);
                        break;
                    case "5":
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        var sliderID = "RangeSlider_" + Column + "_" + TableName + "_" + Type;
                        if (!$("#" + sliderID, interopHolder.ParentDiv)) {
                            Value = $("#" + sliderID, interopHolder.ParentDiv)[0].getAttribute("data-slider-startvalue") + "," + $("#" + sliderID, interopHolder.ParentDiv)[0].getAttribute("data-slider-endvalue");
                        }
                        else {
                            Value = "#IGNORE#";
                        }
                        break;
                    case "7":
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        var id = "Filter_" + Column + "_" + TableName + "_" + Type;
                        Value = "";
                        Value = interopHolder.GetAllCheckedCheckBoxes(id);
                        break;
                    case "8":
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        Value = interopHolder.GetDateInBOFormat(_ControlId);
                        break;
                    case "9":
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        var sliderID = "DateRangeSlider_" + Column + "_" + TableName + "_" + Type;
                        if (!$("#" + sliderID, interopHolder.ParentDiv)) {
                            if (!$("#" + sliderID, interopHolder.ParentDiv)[0].getAttribute("data-slider-endvalue") || !$("#" + sliderID, interopHolder.ParentDiv)[0].getAttribute("data-slider-startvalue") || $("#" + sliderID, interopHolder.ParentDiv)[0].getAttribute("data-slider-startvalue") === "0" || $("#" + sliderID, interopHolder.ParentDiv)[0].getAttribute("data-slider-endvalue") === "0" || $("#" + sliderID, interopHolder.ParentDiv)[0].getAttribute("data-slider-startvalue") === "null" || $("#" + sliderID, interopHolder.ParentDiv)[0].getAttribute("data-slider-endvalue") === "null") {
                                Value = "#IGNORE#";
                            }
                            else {
                                Value = $("#" + sliderID, interopHolder.ParentDiv)[0].getAttribute("data-slider-startvalue") + "," + $("#" + sliderID, interopHolder.ParentDiv)[0].getAttribute("data-slider-endvalue");
                            }
                        }
                        else {
                            Value = "#IGNORE#";
                        }
                        break;
                }
                console.log($("input", this).val());
                TableName = TableName.split('Plus').join('+');
                if (Value !== "#IGNORE#") {
                    FilterItems.push({ "Column": Column, "Value": Value, "TableName": TableName, "Type": Type });
                    Counter++;
                }
            });
            console.log(FilterItems);
            interopHolder.ApplyGivenSearchFilter(FilterItems);
        }
        catch (e) {
            console.log(e.message);
            if (interopHolder.ParentDiv.is(":visible"))
                interopHolder.interopHelper.handleError(e.message, "Error on Apply Filter");
        }
    };
    ;
    AvantiSearchClass.prototype.InitializeAndPopulateControl = function (Item) {
        var interopHolder = this;
        try {
            var ControlID = "Filter_" + Item.ColumnName + "_" + Item.TableName + "_" + Item.ColumnObject;
            var ObjectType = Item.ColumnObject;
            var FilterItem = new ExistingFilters();
            FilterItem.TableName = Item.TableName;
            FilterItem.ColumnName = Item.ColumnName;
            FilterItem.ControlType = Item.ColumnObject;
            FilterItem.DivSelector = $("#" + ControlID, interopHolder.ParentDiv);
            interopHolder.AddedFilters.push(FilterItem);
            switch (ObjectType) {
                case "0":
                    break;
                case "1":
                    break;
                case "2":
                    interopHolder.InitAndPopulateComboBox(ControlID, Item);
                    break;
                case "3":
                    break;
                case "4":
                    interopHolder.BuildRadioButtons(ControlID, Item);
                    break;
                case "5":
                    ControlID = "RangeSlider_" + Item.ColumnName + "_" + Item.TableName + "_" + Item.ColumnObject;
                    ControlID = "Chart_" + Item.ColumnName + "_" + Item.TableName + "_" + Item.ColumnObject;
                    if (Item.NumSliderValues) {
                        var _ChartData = queryLayoutUIHelpers.calculateYValuesOnNormalCurve(parseInt(Item.NumSliderValues.NumMinimum), parseInt(Item.NumSliderValues.NumMaximum), parseFloat(Item.NumSliderValues.NumStdDev), parseFloat(Item.NumSliderValues.NumAverage), 30);
                        interopHolder.BuildAndPopulateChart(ControlID, "", Item.ColumnDesc, "", "", "", parseInt(Item.NumSliderValues.NumMinimum), parseInt(Item.NumSliderValues.NumMaximum), _ChartData);
                    }
                    break;
                case "6":
                    break;
                case "7":
                    interopHolder.BuildCheckBoxes(ControlID, Item);
                    break;
                case "8":
                    interopHolder.InitDatePicker(ControlID);
                    break;
            }
        }
        catch (ex) {
            if (interopHolder.ParentDiv.is(":visible"))
                interopHolder.interopHelper.handleError(ex.message, "Initialize and populate filters");
        }
    };
    ;
    AvantiSearchClass.prototype.InitAndPopulateComboBox = function (ControlID, Data) {
        var interopHolder = this;
        try {
            var CBData = [];
            if (Data.ColumnValues && Data.ColumnValues.ColumnValue) {
                CBData = Data.ColumnValues.ColumnValue;
            }
            var Itemvalue = "";
            $("#" + ControlID, interopHolder.ParentDiv).append('<option value="none">All</option>');
            for (var i = 0; i < CBData.length; i++) {
                Itemvalue = interopHolder.RemoveSingleQuotes(CBData[i].Value);
                if (Itemvalue != "") {
                    if (!CBData[i].Description) {
                        CBData[i].Description = Itemvalue;
                    }
                    $("#" + ControlID, interopHolder.ParentDiv).append('<option value="' + Itemvalue + '">' + CBData[i].Description + '</option>');
                }
            }
        }
        catch (e) {
            console.log(e.message);
        }
    };
    ;
    AvantiSearchClass.prototype.InitPanelBar = function () {
        var panelBar = $(this.ParentDiv + " " + "#panelbar").kendoPanelBar().data("kendoPanelBar");
    };
    AvantiSearchClass.prototype.BuildAndPopulateChart = function (ControlId, Theme, ChartTitle, ChartType, XAxisTitle, YAxisTitle, MIN, MAX, ChartData) {
        var interopHolder = this;
        try {
            Theme = "blueOpal";
            ChartType = "area";
            XAxisTitle = "";
            YAxisTitle = "";
            var new_number = 0;
            var NewChartData = [];
            var maxValue = ChartData.reduce(function (a, b) {
                return Math.max(a, b);
            });
            var minValue = ChartData.reduce(function (a, b) {
                return Math.min(a, b);
            });
            $("#" + ControlId, interopHolder.ParentDiv).kendoChart({
                chartArea: { height: 80 },
                theme: Theme,
                legend: {
                    visible: false
                },
                series: [{
                        type: ChartType,
                        data: ChartData,
                        line: {
                            style: "smooth"
                        }
                    }],
                categoryAxis: {
                    min: MIN,
                    max: MAX,
                    categories: NewChartData,
                    majorGridLines: {
                        visible: false
                    },
                    majorTicks: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: false, template: "#= value #", format: "{00.00}"
                },
                valueAxis: {
                    max: maxValue,
                    min: minValue,
                    title: {
                        text: YAxisTitle
                    },
                    majorGridLines: {
                        visible: false
                    },
                    visible: false
                }
            });
        }
        catch (e) {
            if (interopHolder.ParentDiv.is(":visible"))
                interopHolder.interopHelper.handleError(e.message, "Error on Plot chart");
        }
    };
    ;
    AvantiSearchClass.prototype.BuildCheckBoxes = function (ControlID, Data) {
        var interopHolder = this;
        try {
            var CBData = [];
            if (Data.ColumnValues && Data.ColumnValues.ColumnValue) {
                CBData = Data.ColumnValues.ColumnValue;
            }
            var ItemValue = "";
            var selectedValue = null;
            var ClassName = "Check_" + Data.ColumnName;
            var Items = [{ "caption": "All", "value": "All", "Name": Data.ColumnName, "id": Data.ColumnName + ItemValue, "Class": ClassName }];
            for (var i = 0; i < CBData.length; i++) {
                ItemValue = interopHolder.RemoveSingleQuotes(CBData[i].Value);
                if (ItemValue != "") {
                    if (!CBData[i].Description) {
                        CBData[i].Description = ItemValue;
                    }
                    Items.push({ "caption": CBData[i].Description, "value": ItemValue, "Name": Data.ColumnName, "id": Data.ColumnName + ItemValue, "Class": ClassName });
                }
                if (selectedValue == null)
                    selectedValue = "All";
            }
            if (Items.length == 1) {
                interopHolder.RemoveFilterItem(ControlID);
                return;
            }
            var _CBData = {
                id: "checkboxgroup", Items: Items
            };
            var DivToBindTo = $("#" + ControlID, interopHolder.ParentDiv);
            var CBObservable = kendo.observable(_CBData);
            kendo.bind(DivToBindTo, CBObservable);
            interopHolder.CheckAllCheckBoxed(Data.ColumnName, ClassName);
        }
        catch (e) {
            if (interopHolder.ParentDiv.is(":visible"))
                interopHolder.interopHelper.handleError(e.message, "Error on Build checkboxes");
        }
    };
    ;
    AvantiSearchClass.prototype.BuildRadioButtons = function (ControlID, Data) {
        var interopHolder = this;
        try {
            var RadioButtons = [];
            if (Data.ColumnValues && Data.ColumnValues.ColumnValue) {
                RadioButtons = Data.ColumnValues.ColumnValue;
            }
            var Items = [{ "caption": "All", "value": "All", "Name": Data.ColumnName, "id": Data.ColumnName + ItemValue }];
            var ItemValue = "";
            var selectedValue = null;
            for (var i = 0; i < RadioButtons.length; i++) {
                ItemValue = interopHolder.RemoveSingleQuotes(RadioButtons[i].Value);
                if (ItemValue != "") {
                    if (!RadioButtons[i].Description) {
                        RadioButtons[i].Description = ItemValue;
                    }
                    Items.push({ "caption": RadioButtons[i].Description, "value": ItemValue, "Name": Data.ColumnName, "id": Data.ColumnName + ItemValue });
                }
                if (selectedValue == null)
                    selectedValue = "All";
            }
            if (Items.length == 0) {
                interopHolder.RemoveFilterItem(ControlID);
                return;
            }
            var RBData = {
                selectedValue: selectedValue, id: "radiogroup", Items: Items
            };
            var DivToBindTo = $("#" + ControlID, interopHolder.ParentDiv);
            var RBObservable = kendo.observable(RBData);
            kendo.bind(DivToBindTo, RBObservable);
        }
        catch (e) {
            if (interopHolder.ParentDiv.is(":visible"))
                interopHolder.interopHelper.handleError(e.message, "Error on Build Radio Buttons");
        }
    };
    AvantiSearchClass.prototype.RemoveSingleQuotes = function (Value) {
        var ItemValue;
        Value = Value.trim();
        ItemValue = Value.substring(1, Value.length - 1);
        return ItemValue.trim();
    };
    ;
    AvantiSearchClass.prototype.CamelCaseToSentence = function (CamelCaseString) {
        if (CamelCaseString) {
            return CamelCaseString.replace(/^[a-z]|[A-Z]/g, function (v, i) {
                return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
            });
        }
        else {
            return "";
        }
    };
    ;
    AvantiSearchClass.prototype.RemoveFilterItem = function (ControlID) {
        var interopHolder = this;
        console.log("Removed Control Filter Item: " + ControlID);
        $("#" + ControlID, interopHolder.ParentDiv).parent().parent().remove();
        console.log("Removed DIV - " + ControlID);
    };
    ;
    AvantiSearchClass.prototype.InitApplyFilterButton = function () {
        var interopHolder = this;
        $("#ApplyFilterButton", interopHolder.ParentDiv).kendoButton();
        $("#ClearFilter", interopHolder.ParentDiv).kendoButton();
    };
    ;
    AvantiSearchClass.prototype.InitNumericTextBoxes = function (ControlID) {
        var interopHolder = this;
        $("#" + ControlID, interopHolder.ParentDiv).kendoNumericTextBox();
    };
    AvantiSearchClass.prototype.ShowHideDefaulttext = function (Show) {
        var interopHolder = this;
        try {
            if (Show) {
                $("#nosearchfilters", interopHolder.ParentDiv).show();
                $(".floaty", interopHolder.ParentDiv).hide();
                $("#nosearchfilters", interopHolder.ParentDiv).closest(".column-parent").addClass("minimized");
            }
            else {
                $("#nosearchfilters", interopHolder.ParentDiv).hide();
                $(".floaty", interopHolder.ParentDiv).show();
                $("#nosearchfilters", interopHolder.ParentDiv).closest(".column-parent").removeClass("minimized");
            }
        }
        catch (e) {
        }
    };
    ;
    AvantiSearchClass.prototype.SetAutomaticSearch = function () {
        var interopHolder = this;
        try {
            var NodeToPrependTo = $("#Auto-Search", interopHolder.ParentDiv).parent();
            if (interopHolder.ApplySearchFilter === true) {
                interopHolder.ApplySearchFilter = false;
                $("#Auto-Search-mi", interopHolder.ParentDiv).remove();
                $("#Auto-Search", interopHolder.ParentDiv).remove();
                NodeToPrependTo.removeClass("floaty-list-item floaty-list-item--blue");
                NodeToPrependTo.addClass("floaty-list-item floaty-list-item--gray");
                var itagstring = "<i id='Auto-Search-mi'class='material-icons' style='vertical-align:middle'>highlight_off</i><span id='Auto-Search' class='floaty-list-item-label'>Automatic search: OFF</span>";
                NodeToPrependTo.prepend(itagstring);
            }
            else {
                interopHolder.ApplySearchFilter = true;
                $("#Auto-Search-mi", interopHolder.ParentDiv).remove();
                $("#Auto-Search", interopHolder.ParentDiv).remove();
                NodeToPrependTo.removeClass("floaty-list-item floaty-list-item--gray");
                NodeToPrependTo.addClass("floaty-list-item floaty-list-item--blue");
                var itagstring = "<i id='Auto-Search-mi'class='material-icons' style='vertical-align:middle'>autorenew</i><span id='Auto-Search' class='floaty-list-item-label'>Automatic search: ON</span>";
                NodeToPrependTo.prepend(itagstring);
            }
        }
        catch (e) {
            throw (e);
        }
    };
    ;
    AvantiSearchClass.prototype.InitDatePicker = function (ControlID) {
        var interopHolder = this;
        var datepicker = $("#" + ControlID, interopHolder).data("kendoDatePicker");
        if (datepicker) {
            datepicker.value(new Date());
        }
    };
    ;
    AvantiSearchClass.prototype.GetTheSelectedRadioButton = function (id) {
        var interopHolder = this;
        var Value = "";
        var ListOfRadioButtons = $("#" + id, interopHolder.ParentDiv).find(":radio:checked");
        if (ListOfRadioButtons.length > 0)
            Value = ListOfRadioButtons[0].value;
        if (Value == "All")
            Value = "";
        return Value;
    };
    ;
    AvantiSearchClass.prototype.setRangeSliderMinValue = function () {
        var interopHolder = this;
        try {
            var ColumnName = $(event.target).closest(".form-group").getAttribute("data-name");
            var TableName = $(event.target).closest(".form-group").getAttribute("data-tablename");
            var ColumnObject = $(event.target).closest(".form-group").getAttribute("data-ColumnObject");
            var min = parseInt($(event.target).getAttribute("data-NumMinValue"));
            var ControlID = "RangeSlider_" + ColumnName + "_" + TableName + "_" + ColumnObject;
            var EndValue = parseInt($("#" + ControlID, interopHolder.ParentDiv)[0].getAttribute("data-slider-endvalue"));
            $("#" + ControlID, interopHolder.ParentDiv)[0].noUiSlider.set([min, EndValue]);
            interopHolder.ApplyFilter();
        }
        catch (e) {
            console.log("Error: " + e.message);
        }
    };
    ;
    AvantiSearchClass.prototype.setRangeSliderMaxValue = function () {
        var interopHolder = this;
        try {
            var ColumnName = $(event.target).closest(".form-group").getAttribute("data-name");
            ;
            var TableName = $(event.target).closest(".form-group").getAttribute("data-tablename");
            var ColumnObject = $(event.target).closest(".form-group").getAttribute("data-ColumnObject");
            var max = parseInt($(event.target).getAttribute("data-NumMaxValue"));
            var ControlID = "RangeSlider_" + ColumnName + "_" + TableName + "_" + ColumnObject;
            var StartValue = parseInt($("#" + ControlID, interopHolder.ParentDiv)[0].getAttribute("data-slider-startvalue"));
            $("#" + ControlID, interopHolder.ParentDiv)[0].noUiSlider.set([StartValue, max]);
            interopHolder.ApplyFilter();
        }
        catch (e) {
            console.log("Error: " + e.message);
        }
    };
    ;
    AvantiSearchClass.prototype.setRowCountSliderMaxValue = function () {
        var interopHolder = this;
        try {
            var ControlID = "avanti-search-count-slider";
            var max = parseInt($("#" + ControlID, interopHolder.ParentDiv).getAttribute("data-slider-max"));
            $("#" + ControlID, interopHolder.ParentDiv)[0].noUiSlider.set([1, max]);
        }
        catch (e) {
            console.log("Error: " + e.message);
        }
    };
    ;
    AvantiSearchClass.prototype.ApplyFilterButtonClicked = function () {
        var interopHolder = this;
        var CurrentSearchSetting = interopHolder.ApplySearchFilter;
        interopHolder.ApplySearchFilter = true;
        interopHolder.ApplyFilter();
        interopHolder.ApplySearchFilter = CurrentSearchSetting;
    };
    ;
    AvantiSearchClass.prototype.FormatLinkedColumns = function (ColumnHeader) {
        if (ColumnHeader) {
            return ColumnHeader.replace("_", " ");
        }
        else {
            return "";
        }
    };
    ;
    AvantiSearchClass.prototype.GetAllCheckedCheckBoxes = function (id) {
        var interopHolder = this;
        var Value = "";
        var ListOfCheckboxes = $("#" + id, interopHolder.ParentDiv).find(":checkbox");
        if (ListOfCheckboxes.length > 1) {
            for (var i = 1; i < ListOfCheckboxes.length; i++) {
                if (ListOfCheckboxes[i].checked) {
                    Value += ListOfCheckboxes[i].value + ",";
                }
                else {
                    ListOfCheckboxes[0].checked = false;
                }
            }
        }
        if (ListOfCheckboxes.length > 0) {
            if (ListOfCheckboxes[0].checked) {
                return "";
            }
        }
        Value = Value.substring(0, Value.length - 1);
        return Value;
    };
    ;
    AvantiSearchClass.prototype.GetDateInBOFormat = function (_ControlId) {
        try {
            try {
                return kendo.toString($("#" + _ControlId).closest(".date").datepicker("getDate"), "yyyy-MM-dd");
            }
            catch (e) {
                return "#IGNORE#";
            }
        }
        catch (e) {
            console.log("Error in GetDateInBOFormat: " + e.message);
        }
    };
    ;
    AvantiSearchClass.prototype.CheckAllCheckBoxed = function (DIVID, ClassName) {
        var interopHolder = this;
        $("#" + DIVID).click(function () {
            $("." + ClassName).prop("checked", $(this).prop("checked"));
            interopHolder.ApplyFilter();
        });
    };
    ;
    AvantiSearchClass.prototype.ClearSearchFilters = function () {
        var interopHolder = this;
        try {
            interopHolder.BindFiltersToCard(interopHolder.FilterUIData, false);
        }
        catch (e) {
            if (interopHolder.ParentDiv.is(":visible"))
                interopHolder.interopHelper.handleError(e.message, "Error on Reset Search Filter");
        }
    };
    ;
    AvantiSearchClass.prototype.FormatNumberToTwoDecimalPlaces = function (NumVal) {
        return parseFloat(NumVal).toFixed(2);
    };
    ;
    AvantiSearchClass.prototype.ReturnTabPanelHTML = function (Categorykey) {
        var interopHolder = this;
        var HTMLString = "";
        HTMLString = "<div class='row'>";
        HTMLString += "<div class='col-sm-12'>";
        HTMLString += "<div class='panel-group' id='24b725fc-1ced-443e-b687-6014e0a5a912" + interopHolder.FilterCategoryNum + "' role='tablist' aria- multiselectable='true'>";
        HTMLString += "<div class='panel sys-widget sys-box-shadow-off '>";
        HTMLString += "<h4 class='sys-mg-off' role='tab' id='ae6854d2-ac24-47da-9dd6-68783444a02f" + interopHolder.FilterCategoryNum + "'>";
        HTMLString += "<a class='sys-fg-lighten panel-heading sys-block sys-bg-white sys-fg-primary sys-pd-off-l' data-toggle='collapse' data-parent='#24b725fc-1ced-443e-b687-6014e0a5a912" + interopHolder.FilterCategoryNum + "' href='#7703c5f2-0fd9-4856-8c97-83a07c777170" + interopHolder.FilterCategoryNum + "' ariaexpanded='false' aria-controls='7703c5f2-0fd9-4856-8c97-83a07c777170" + interopHolder.FilterCategoryNum + "' aria-expanded='true'>";
        HTMLString += "<i class='material-icons sys-mg-r-2'>brightness_5</i>";
        HTMLString += interopHolder.CamelCaseToSentence(Categorykey);
        HTMLString += "<i class='material-icons pull-right collapsible-open-icon'>keyboard_arrow_down</i>";
        HTMLString += "<i class='material-icons pull-right collapsible-close-icon'>keyboard_arrow_up</i>";
        HTMLString += "</a>";
        HTMLString += "</h4>";
        HTMLString += "<div class='panel-collapse collapse in' id='7703c5f2-0fd9-4856-8c97-83a07c777170" + interopHolder.FilterCategoryNum + "' role='tabpanel' aria-labelledby='ae6854d2-ac24-47da-9dd6-68783444a02f" + interopHolder.FilterCategoryNum + "' aria-expanded='true' style=''>";
        HTMLString += "<!-- FILTERS WILL GO HERE -->";
        HTMLString += "<div id='Avanti-Filter-Template" + Categorykey + "'>";
        HTMLString += "<div data-bind='source: Column' data-template='Filter_Template'>";
        HTMLString += "</div>";
        HTMLString += "</div>";
        HTMLString += "<!-- FILTERS WILL GO HERE -->";
        HTMLString += "</div></div></div></div>";
        HTMLString += "</div>";
        return HTMLString;
    };
    ;
    AvantiSearchClass.prototype.SliderEnd = function (e) {
        this.ApplyFilter();
    };
    AvantiSearchClass.prototype.CheckForKeyfieldChange = function (CurrentKeyfield) {
        var interopHolder = this;
        var SuggestedKeyfield = CurrentKeyfield;
        if (CurrentKeyfield.indexOf("Conversion") === 0) {
            CurrentKeyfield = CurrentKeyfield.replace("Conversion", "");
            SuggestedKeyfield = CurrentKeyfield;
            if (CurrentKeyfield === "StockCode") {
                if (interopHolder.interopHelper.getGlobalValue("Warehouse")) {
                    SuggestedKeyfield = "WarehouseStockCode";
                }
            }
            if (CurrentKeyfield === "Warehouse") {
                if (interopHolder.interopHelper.getGlobalValue("StockCode")) {
                    SuggestedKeyfield = "StockCodeWarehouse";
                }
            }
            try {
                if (CurrentKeyfield === "ComplaintOwner") {
                    if (JSON.parse(this.interopHelper.getToolbarValues()).Toolbar.CMSPOWTB40200.Value == "Global") {
                        SuggestedKeyfield = "Operator";
                    }
                }
                if (CurrentKeyfield === "ComplaintUser") {
                    if (JSON.parse(this.interopHelper.getToolbarValues()).Toolbar.CMSPURTB40200.Value == "Global") {
                        SuggestedKeyfield = "Operator";
                    }
                }
                if (CurrentKeyfield === "ComplaintGroup") {
                    if (JSON.parse(this.interopHelper.getToolbarValues()).Toolbar.CMSPGRTB40200.Value == "Global") {
                        SuggestedKeyfield = "OperatorGroup";
                    }
                }
            }
            catch (_a) { }
        }
        return SuggestedKeyfield;
    };
    return AvantiSearchClass;
}());
var AvantiSyntaxEditorClass = (function () {
    function AvantiSyntaxEditorClass(interopIn) {
        this.interopInternal = interopIn;
    }
    AvantiSyntaxEditorClass.prototype.createSyntaxEditor = function (dataIn) {
        try {
            var interopHelper_7 = this.interopInternal;
            var syntaxEditorsDivs = $('*[data-sysprosyntaxeditorfieldname="' + dataIn.FieldName + '"]');
            $.each(syntaxEditorsDivs, function (index) {
                var syntaxEditorsDiv = $(this);
                var syntaxEditorData = JSON.parse(dataIn.SyntaxEditorData);
                var editor;
                if (syntaxEditorsDiv.length > 0) {
                    editor = ace.edit(syntaxEditorsDiv.attr('id'), { showPrintMargin: false });
                    ace.config.set('basePath', '../../Samples');
                    try {
                        editor.session.setMode("ace/mode/" + syntaxEditorData.mode);
                    }
                    catch (e) {
                        console.log("Failed to set mode '" + syntaxEditorData.mode + "'");
                        editor.session.setMode("ace/mode/vbscript");
                    }
                    editor.setValue(atob(syntaxEditorData.text));
                    if ($("body").attr("data-theme") === "dark") {
                        editor.setTheme('ace/theme/ambiance');
                    }
                    else {
                        editor.setTheme('ace/theme/chrome');
                    }
                    syntaxEditorsDiv.attr("sysproeditorchanged", "false");
                    editor.on("change", function () {
                        syntaxEditorsDiv.attr("sysproeditorchanged", "true");
                    });
                    if (syntaxEditorData && syntaxEditorData.selectionEvents && syntaxEditorData.selectionEvents === "true") {
                        editor.session.selection.on('changeSelection', function (e) {
                            setTimeout(function () {
                                var selectedText = editor.getSelectedText();
                                if (selectedText.length > 1) {
                                    if (!/\s/g.test(selectedText)) {
                                        if (selectedText !== syntaxEditorsDiv.attr("sysproeditorlastselection")) {
                                            var currentFieldName = syntaxEditorsDiv.attr("data-sysprosyntaxeditorfieldname");
                                            syntaxEditorsDiv.attr("sysproeditorlastselection", selectedText);
                                            interopHelper_7.eventTrigged(currentFieldName, selectedText, "", "", "syntaxEditorTextSelected", function (e) { }, function (e) { });
                                        }
                                    }
                                }
                            }, 100);
                        });
                    }
                    editor.gotoLine(editor.session.getLength());
                }
            });
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "createSyntaxEditor");
        }
    };
    AvantiSyntaxEditorClass.prototype.syntaxEditorRequestInternalEvent = function (dataIn) {
        try {
            var interopHelper = this.interopInternal;
            var syntaxEditorsDivs = $('*[data-sysprosyntaxeditorfieldname="' + dataIn.FieldName + '"]');
            var currentSelectedItem = "";
            var dataItem;
            var SplitInternalEventParameter;
            var editor_1;
            if (syntaxEditorsDivs.length > 0) {
                $.each(syntaxEditorsDivs, function (index) {
                    var syntaxEditorsDiv = $(this);
                    editor_1 = ace.edit(syntaxEditorsDiv.attr('id'), { showPrintMargin: false, basePath: '..\..\Samples' });
                    if (dataIn.InternalEventParameter)
                        SplitInternalEventParameter = dataIn.InternalEventParameter.split("|");
                    switch (dataIn.InternalEvent.toLowerCase()) {
                        case "SetValue".toLowerCase():
                            editor_1.setValue(atob(dataIn.InternalEventParameter));
                            syntaxEditorsDiv.attr("sysproeditorchanged", "false");
                            break;
                        case "SetMode".toLowerCase():
                            editor_1.session.setMode("ace/mode/" + dataIn.InternalEventParameter);
                            break;
                        case "SetTheme".toLowerCase():
                            editor_1.setTheme("ace/theme/" + dataIn.InternalEventParameter);
                            break;
                        case "ClearText".toLowerCase():
                            editor_1.setValue("");
                            break;
                        case "InsertAtCursor".toLowerCase():
                            editor_1.insert(dataIn.InternalEventParameter);
                            editor_1.focus();
                            break;
                        case "SetReadOnly".toLowerCase():
                            editor_1.setReadOnly(dataIn.InternalEventParameter);
                            break;
                        case "SetLineFocus".toLowerCase():
                            editor_1.focus();
                            if (dataIn.InternalEventParameter) {
                                if (SplitInternalEventParameter[0] !== 0) {
                                    var FocusLine = SplitInternalEventParameter[0];
                                    var FocusColumn = SplitInternalEventParameter[1];
                                    editor_1.gotoLine(FocusLine, FocusColumn);
                                }
                            }
                            break;
                        case "GetValue".toLowerCase():
                            currentSelectedItem = btoa(editor_1.getValue());
                            break;
                        case "HasChanged".toLowerCase():
                            currentSelectedItem = syntaxEditorsDiv.attr("sysproeditorchanged");
                            break;
                        case "findText".toLowerCase():
                            var allText = editor_1.getValue();
                            var allLines = allText.split("\n");
                            var MatchLine = 0;
                            var MatchColumn = 0;
                            for (var i = 0; i < allLines.length; i++) {
                                var indexInLine = allLines[i].toLowerCase().indexOf(dataIn.InternalEventParameter.toLowerCase());
                                if (indexInLine >= 0) {
                                    MatchLine = i + 1;
                                    MatchColumn = indexInLine + 1;
                                    i = allLines.length;
                                }
                            }
                            currentSelectedItem = MatchLine + "|" + MatchColumn;
                            break;
                        case "getTextLength".toLowerCase():
                            currentSelectedItem = String(editor_1.getValue().length);
                            break;
                    }
                });
            }
            return currentSelectedItem;
        }
        catch (ex) {
            this.interopInternal.handleError(ex.message, "syntaxEditorRequestInternalEvent");
        }
    };
    return AvantiSyntaxEditorClass;
}());
function sysproInteropFunction(argument) {
    try {
        return eval(argument);
    }
    catch (e) {
        alert("sysproInteropFunction - " + argument + " - " + e.message);
    }
}
function sysproInteropSparklineSeriesClick(e) {
    sysproInterop.sparklineSeriesClick(e);
}
function formatnumber(value) {
    return kendo.toString(parseFloat(value), "n");
}
$(window).bind("resizeEnd", function (e) {
    console.log("---------------------------------------------------------------------resizeEnd");
    sysproInterop.resizeSparklines(null);
    SYSPRO_VB.adjustContainerPadding();
});
$(window).on("load", function (e) {
    sysproInterop.createKendoBinders();
    sysproInterop.subscribeToFieldEvents();
});
$(window).one("touchstart", function (e) {
    sysproInterop.isTouchDevice = true;
});
function RegEscape(inputString) {
    return inputString.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function WebView_Predictive_Search_Template(subCategory, searchQuery) {
    if (searchQuery === "*") {
        searchQuery = "";
    }
    searchQuery = this.RegEscape(searchQuery);
    var queryRegEx = new RegExp("(" + searchQuery + ")", 'gi');
    var stringTemplate = '<div class="text-complete syspro-predictivesearch-container">';
    stringTemplate =
        stringTemplate +
            '<div class="syspro-predictivesearch-item syspro-predictivesearch-image-container"><img src=" ' +
            subCategory.Image +
            '" class="syspro-predictivesearch-image" onerror="this.style.display = \'none\'"></img></div>';
    stringTemplate =
        stringTemplate + '<div class="syspro-predictivesearch-item"><strong>' + subCategory.Id.replace(queryRegEx, '<span class="highlightedTerm">$1</span>') + '</strong>';
    if (subCategory.Description)
        stringTemplate =
            stringTemplate + '<div class="sys-400 sys-txt-md"><strong>' + subCategory.Description.replace(queryRegEx, '<span class="highlightedTerm">$1</span>') + '</strong></div>';
    if (subCategory.AdditionalField1)
        stringTemplate = stringTemplate + '<div class="sys-400 sys-txt-md">' + subCategory.AdditionalField1.replace(queryRegEx, '<span class="highlightedTerm">$1</span>') + '</div>';
    if (subCategory.AdditionalField2)
        stringTemplate = stringTemplate + '<div class="sys-400 sys-txt-md">' + subCategory.AdditionalField2.replace(queryRegEx, '<span class="highlightedTerm">$1</span>') + '</div>';
    if (subCategory.AdditionalField3)
        stringTemplate = stringTemplate + '<div class="sys-400 sys-txt-md">' + subCategory.AdditionalField3.replace(queryRegEx, '<span class="highlightedTerm">$1</span>') + '</div>';
    stringTemplate = stringTemplate + '</div></div>';
    return stringTemplate;
}
function OpenMenuScreen() {
    if (callLayerInterop.menuHtml) {
        $("#harness-container").html("");
        $("#harness-container").html(callLayerInterop.menuHtml);
        $("body")[0].setAttribute("data-column-layout", callLayerInterop.menuDetail);
        $("[id=loading-cover]").fadeOut();
        queryLayoutUIHelpers.initializeViewOnly(false, null, null);
        queryLayoutUIHelpers.initializeToolbarEvents();
        sysproInterop.viewModel = null;
        sysproInterop.toolbarModel = null;
    }
}
var queryLayoutUIHelpers = new QueryLayoutUIHelpersClass();
var sysproInterop = new SYSPROInteropClass();
var callLayerInterop = sysproInterop.callLayerInterop;
var AvantiSearchInterop = new AvantiSearchClass(sysproInterop);