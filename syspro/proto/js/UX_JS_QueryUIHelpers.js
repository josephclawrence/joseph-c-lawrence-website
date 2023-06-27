var queryLayoutUIHelpers = {
    offCanvasesCreated: [],
    tilesCreated: [],
    kendoWindowsCreated: [],
    kendoWindowsCreatedInContainer: {},
    programListTypeahead: [],
    typeParent: { a: null, b: null, c: null, current: null },
    formatLongNumber: function(value, kendoFormat) {
        if (!kendoFormat) {
            kendoFormat = 'n0';
        }
        if (value == 0) {
            return 0;
        } else {
            // for testing
            //value = Math.floor(Math.random()*1001);

            // hundreds
            if (value <= 999) {
                return kendo.toString(value, kendoFormat);
            }
            // thousands
            else if (value >= 1000 && value <= 999999) {
                return kendo.toString(value / 1000, kendoFormat) + 'K';
            }
            // millions
            else if (value >= 1000000 && value <= 999999999) {
                return kendo.toString(value / 1000000, kendoFormat) + 'M';
            }
            // billions
            else if (value >= 1000000000 && value <= 999999999999) {
                return kendo.toString(value / 1000000000, kendoFormat) + 'B';
            } else return kendo.toString(value, kendoFormat);
        }
    },
    addWindowToTrackingList: function(newWindow, containerId) {
        if (containerId) {
            if (queryLayoutUIHelpers.kendoWindowsCreatedInContainer[containerId]) {
                queryLayoutUIHelpers.kendoWindowsCreatedInContainer[containerId].push(newWindow);
            } else {
                queryLayoutUIHelpers.kendoWindowsCreatedInContainer[containerId] = [newWindow];
            }
        } else {
            queryLayoutUIHelpers.kendoWindowsCreated.push(newWindow);
        }
    },
    disposeOfWindows: function(containerId) {
        if (containerId) {
            if (queryLayoutUIHelpers.kendoWindowsCreatedInContainer[containerId]) {
                while (queryLayoutUIHelpers.kendoWindowsCreatedInContainer[containerId].length > 0) {
                    var windowToRemove = queryLayoutUIHelpers.kendoWindowsCreatedInContainer[containerId].pop();
                    $.each($('.syspro-grid-list', windowToRemove.element), function(index) {
                        if ($(this).data('kendoGrid')) {
                            //Manually dispose of every kendo grid because of weird disposal issue with Joes new Table structure.
                            $(this)
                                .data('kendoGrid')
                                .destroy();
                        }
                    });
                    windowToRemove.destroy();
                }
            }
        } else {
            while (queryLayoutUIHelpers.kendoWindowsCreated.length > 0) {
                var windowToRemove = queryLayoutUIHelpers.kendoWindowsCreated.pop();
                $.each($('.syspro-grid-list', windowToRemove.element), function(index) {
                    if ($(this).data('kendoGrid')) {
                        //Manually dispose of every kendo grid because of weird disposal issue with Joes new Table structure.
                        $(this)
                            .data('kendoGrid')
                            .destroy();
                    }
                });
                windowToRemove.destroy();
            }
        }
    },
    initializeIconSelector: function() {
        sysproInterop.getIconsAvailable(
            function(result) {
                $('#icontreeview').kendoListView({
                    template: kendo.template($('#icon-treeview-template').html()),
                    dataSource: result,
                    dataBound: function() {
                        if ($('[data-tooltip="tooltip"]').length > 0) $('[data-tooltip="tooltip"]').tooltip();

                        $('.icon-item').click(function(e) {
                            console.log('selected: ' + JSON.stringify(e));
                            console.log('selected: ' + JSON.stringify(this));
                            sysproInterop.iconSelected(
                                $('#icontreeview')
                                    .data('kendoListView')
                                    .dataItem(this)
                            );
                        });
                    },
                });
            },
            function(error) {}
        );

        var handleTextBox = function(callback) {
            return function(e) {
                if (e.type != 'keypress' || kendo.keys.ENTER == e.keyCode) {
                    callback(e);
                }
            };
        };

        var filter = handleTextBox(function(e) {
            var filterText = $('#filterText').val();
            var treeView = $('#icontreeview').data('kendoListView');
            //if (filterText !== "") {
            treeView.dataSource.filter({
                field: 'Description',
                operator: 'contains',
                value: filterText,
            });
            // } else {
            //     treeView.dataSource.filter({});
            // }
        });

        $('#filterText').keypress(filter);
        $('#filterText').change(filter);
    },
    initializeTooltips: function() {
        if ($('[data-tooltip="tooltip"]').length > 0) $('[data-tooltip="tooltip"]').tooltip();
    },
    initializeDragDrop: function() {
        SYSPRO_VB.initProgramListTileDragging(function(
            tileParent,
            ProgramName,
            ProgramDescription,
            ItemType,
            ItemSubType
        ) {
            var tileParentIn = tileParent;
            var tileworkingGuid = tileParent.closest('.layout-widget').data('guid');
            var TileToBind = false;
            var programDescriptionIn = ProgramName;
            var ParentFieldPath = '';
            //ItemSubType contains the Plugin details if it is a  program.
            var tileTypeDetail = ItemSubType;
            if (ItemType === 'Tile') {
                ItemType = ItemSubType;
                //In the case of the tile it is crucial that the tile type detail is the tiles  name
                tileTypeDetail = ProgramName;
                TileToBind = true;
            } else {
                programDescriptionIn = ProgramDescription;
                //Just in case set the tileTypedetail to the name
                if (!tileTypeDetail) tileTypeDetail = ProgramDescription;
                ParentFieldPath = ProgramName;
            }

            sysproInterop.getModel(tileworkingGuid, function(modelFound) {
                //Need a way to add a tile to the model, get the model out and then call into SYSPRO with it.
                if (modelFound && modelFound.Rows && modelFound.Rows.length > 0 && modelFound.Rows[0].Columns) {
                    //0 2 7 4 8 1 6 3 9
                    var tileColorToUse = 0;
                    var ComplementaryTilesColorIndex = [0, 2, 7, 4, 8, 1, 6, 3, 9];
                    if (
                        modelFound.Rows[0].Columns.length > 0 &&
                        modelFound.Rows[0].Columns[0].Widgets &&
                        modelFound.Rows[0].Columns[0].Widgets.length > 0
                    ) {
                        var previousColor = modelFound.Rows[0].Columns[0].Widgets[0].BackgroundColor;
                        if (ComplementaryTilesColorIndex.indexOf(previousColor) > 1) {
                            tileColorToUse =
                                ComplementaryTilesColorIndex[ComplementaryTilesColorIndex.indexOf(previousColor) - 1];
                        } else {
                            tileColorToUse = ComplementaryTilesColorIndex.length - 1;
                        }
                    }
                    var tileModel = {
                        TileType: ItemType,
                        TileTypeIcon: null,
                        TileTypeIconColor: 0,
                        TileTypeDetail: tileTypeDetail,
                        TileTypeName: ProgramName,
                        ParentFieldPath: ParentFieldPath,
                        Details: {
                            Color: 9,
                            Size: 0,
                            Name: null,
                            Visibility: false,
                            Alignment: 0,
                            Weight: 0,
                            Tooltip: null,
                        },
                        TileWidth: 2,
                        TileParameters: {},
                        SubType: 'DragDropRequest',
                        Title: ProgramDescription,
                        PrimaryStyle: 0,
                        SecondaryStyle: 0,
                        WidgetName: null,
                        Collapsible: false,
                        IsCollapsibleOpen: false,
                        Border: 0,
                        BackgroundColor: tileColorToUse,
                        TitleBackground: 0,
                        TitleForeground: 0,
                        Id: sysproInterop.generateUUID(),
                        Index: 0,
                        index: 0,
                        TypeName: 'Tile',
                        HasChildren: false,
                    };

                    sysproInterop.getHtmlFromModel(
                        'Widget',
                        tileModel,
                        function(htmlOut) {
                            $('.tile-width-marker', $('.tile-widget', tileParentIn)).after(htmlOut);
                            queryLayoutUIHelpers.disposeViewOnly();
                            queryLayoutUIHelpers.initializeViewOnly(null, tileParentIn);
                            sysproInterop.subscribeToFieldEvents();

                            //Finally if it is a tile then bind it.
                            if (TileToBind)
                                sysproInterop.bindTiles(sysproInterop.viewModel, $('.tile-widget', tileParentIn), '');
                        },
                        function(ex) {
                            console.log('getHtmlFromModel for tile error - ' + ex.message);
                        }
                    );

                    modelFound.Rows[0].Columns.unshift({ Widgets: [tileModel] });
                    sysproInterop.setModel(
                        tileworkingGuid,
                        modelFound,
                        function(e) {
                            if (e) {
                                console.log('SetModel performed');
                                sysproInterop.getModel('', function(MainModelFound) {
                                    sysproInterop.triggerModelChanged(MainModelFound);
                                });
                            } else {
                                console.log('SetModel not performed. No Id found.');
                            }
                        },
                        function(e) {}
                    );
                }
            });
        });
    },
    initializeViewOnly: function(ignoreControls, containerDiv, containerId) {
        if ($.material && !ignoreControls) {
            $.material.init();
        }

        var sliders = $('.slider', containerDiv);
        $.each(sliders, function(index) {
            var sliderCreated = false;
            if (this.noUiSlider) {
                //If the slider has already been initialized then just set its options.
                sliderCreated = true;
            }
            var currValue = 30;
            currValue = parseInt(this.getAttribute('data-fieldvalue'));
            var sliderInput = this;
            var minValue = 0;
            var maxValue = 100;
            var isNotBound = $(this).hasClass('nonbound-slider');
            var connectValue = [true, false];
            var isDateSlider = $(this).hasClass('avanti-date-slider');
            var isSentimentSlider = $(this).hasClass('avanti-sentiment-slider');
            var sliderTooltip = $(this).data('avanti-slider-tooltip-format');
            var changeEvent = $(this).data('slider-event-change');
            var stepsIn = null;
            var tooltipsIn = true;
            if (isNotBound) {
                var startvalueInput = this.getAttribute('data-slider-startvalue');
                if (isDateSlider) {
                    // Create a new date from a string, return as a timestamp.
                    function timestamp(str) {
                        var dateOut = kendo.parseDate(str, 'yyyy-MM-dd');
                        if (!dateOut) return 0;
                        return dateOut.getTime();
                    }
                    var startValue = 0;
                    if (startvalueInput) {
                        startValue = timestamp(this.getAttribute('data-slider-startvalue'));
                    }
                    var endValue = timestamp(this.getAttribute('data-slider-endvalue'));
                    var startValueOut = startValue;
                    if (startValue === 0 || endValue === 0) {
                        this.getAttribute('data-slider-status', 'disabled');
                        return;
                    }
                    if (startValueOut)
                        startValueOut = kendo.toString(new Date(parseFloat(startValueOut)), 'yyyy-MM-dd');
                    var endValueOut = endValue;
                    if (endValueOut) endValueOut = kendo.toString(new Date(parseFloat(endValueOut)), 'yyyy-MM-dd');
                    sliderInput.setAttribute('data-slider-startvalue', startValueOut);
                    sliderInput.setAttribute('data-slider-endvalue', endValueOut);
                    minValue = timestamp(this.getAttribute('data-slider-min'));
                    maxValue = timestamp(this.getAttribute('data-slider-max'));

                    // Steps of one week
                    stepsIn = 7 * 24 * 60 * 60 * 1000;
                    var formatInput = {
                        to: function(value) {
                            return kendo.toString(new Date(value), sysproInterop.dateFormat);
                        },
                        from: function(value) {
                            return kendo.toString(new Date(value), sysproInterop.dateFormat);
                        },
                    };

                    if (startvalueInput) {
                        currValue = [startValue, endValue];
                        connectValue = [false, true, false];
                        tooltipsIn = [formatInput, formatInput];
                    } else {
                        currValue = endValue;
                        connectValue = true;
                        tooltipsIn = [formatInput];
                    }
                } else if (isSentimentSlider) {
                    var startValue = 0;
                    if (startvalueInput) {
                        startValue = parseInt(this.getAttribute('data-slider-startvalue'));
                    }
                    var tooltipformat = true;
                    console.log('sentiment tooltip stuff');

                    tooltipformat = {
                        to: function(value) {
                            var sentiment;
                            var sentimentColor;
                            var sentimentI;
                            switch (true) {
                                case value > 7:
                                    sentiment = 'Very satisfied';
                                    sentimentI = 'sentiment_very_satisfied';
                                    sentimentColor = 'sys-fg-success';
                                    break;
                                case value > 2 && value < 6:
                                    sentiment = 'Satisfied';
                                    sentimentI = 'sentiment_satisfied';
                                    sentimentColor = 'sys-fg-success';
                                    break;
                                case value > -2 && value < 3:
                                    sentimentI = 'sentiment_neutral';
                                    sentiment = 'Neutral';
                                    sentimentColor = 'text-info';
                                    break;
                                case value > -5 && value < -1:
                                    sentimentI = 'sentiment_dissatisfied';
                                    sentiment = 'Dissatisfied';
                                    sentimentColor = 'sys-fg-warning';
                                    break;
                                case value < -5:
                                    sentimentI = 'sentiment_very_dissatisfie';
                                    sentiment = 'Very dissatisfied';
                                    sentimentColor = 'sys-fg-danger';
                                    break;
                                default:
                                    sentimentI = 'sentiment_very_satisfied';
                                    sentiment = 'Very satisfied';
                                    break;
                            }
                            setTimeout(function() {
                                $.each($('.noUi-tooltip'), function() {
                                    $(this).html(
                                        $(this)
                                            .html()
                                            .replace(
                                                sentiment,
                                                '<i class="avanti-sentiment-image-slider material-icons ' +
                                                    sentimentColor +
                                                    '">' +
                                                    sentimentI +
                                                    '</i>'
                                            )
                                    );
                                });
                            }, 200);
                            return sentiment;
                        },
                        from: function(value) {
                            return queryLayoutUIHelpers.formatLongNumber(value, sliderTooltip);
                        },
                    };
                    var endValue = parseInt(this.getAttribute('data-slider-endvalue'));
                    minValue = parseInt(this.getAttribute('data-slider-min'));
                    maxValue = parseInt(this.getAttribute('data-slider-max'));
                    if (startvalueInput) {
                        currValue = [startValue, endValue];
                        connectValue = [false, true, false];
                        tooltipsIn = [tooltipformat, tooltipformat];
                    } else {
                        currValue = endValue;
                        connectValue = true;
                        tooltipsIn = [tooltipformat];
                    }
                } else {
                    var startValue = 0;
                    if (startvalueInput) {
                        startValue = parseInt(this.getAttribute('data-slider-startvalue'));
                    }
                    var tooltipformat = true;
                    tooltipformat = {
                        to: function(value) {
                            return queryLayoutUIHelpers.formatLongNumber(value, sliderTooltip);
                        },
                        from: function(value) {
                            return queryLayoutUIHelpers.formatLongNumber(value, sliderTooltip);
                        },
                    };
                    var endValue = parseInt(this.getAttribute('data-slider-endvalue'));
                    minValue = parseInt(this.getAttribute('data-slider-min'));
                    maxValue = parseInt(this.getAttribute('data-slider-max'));
                    if (startvalueInput) {
                        currValue = [startValue, endValue];
                        connectValue = [false, true, false];
                        tooltipsIn = [tooltipformat, tooltipformat];
                    } else {
                        currValue = endValue;
                        connectValue = true;
                        tooltipsIn = [tooltipformat];
                    }
                }
            }
            if (minValue === maxValue) {
                maxValue = minValue + 100;
            }

            if (sliderCreated) {
                this.noUiSlider.updateOptions({
                    start: currValue,
                    connect: connectValue,
                    range: {
                        min: minValue,
                        max: maxValue,
                    },
                    tooltips: tooltipsIn,
                });
            } else {
                noUiSlider.create(this, {
                    start: currValue,
                    connect: connectValue,
                    range: {
                        min: minValue,
                        max: maxValue,
                    },
                    tooltips: tooltipsIn,
                });
            }

            this.noUiSlider.off('change');
            this.noUiSlider.on('change', function(e, e2, e3) {
                if (isNotBound) {
                    var startValue = 0;
                    var endValue = 0;
                    if (e.length > 1) {
                        startValue = e[0];
                        endValue = e[1];
                    } else {
                        endValue = e[0];
                    }
                    if (isDateSlider) {
                        if (startValue) startValue = kendo.toString(new Date(parseFloat(startValue)), 'yyyy-MM-dd');
                        if (endValue) endValue = kendo.toString(new Date(parseFloat(endValue)), 'yyyy-MM-dd');
                    }

                    sliderInput.setAttribute('data-slider-startvalue', startValue);
                    sliderInput.setAttribute('data-slider-endvalue', endValue);
                    if (changeEvent) {
                        eval(changeEvent);
                    }
                } else {
                    var dataFieldName = sliderInput.getAttribute('data-fieldname');
                    var dataValue = e[0];
                    //sliderInput.setAttribute("data-fieldvalue", dataValue);
                    if (sysproInterop) {
                        //Now manually set the value.
                        if (sysproInterop.viewModel && sysproInterop.viewModel)
                            sysproInterop.viewModel.set(dataFieldName + '.Value', dataValue);
                        sysproInterop.eventTrigged(
                            dataFieldName,
                            dataValue,
                            '',
                            '',
                            'fieldChange',
                            function(eCurrent) {},
                            function(eCurrent) {}
                        );
                    }
                }
                //var dataValue = this.getAttribute("data-fieldvalue");
                //alert(JSON.stringify(e3));
                //this.setAttribute("data-fieldvalue", e[0]);
            });
        });
        $('.minimize-column', containerDiv).off('click');
        $('.minimize-column', containerDiv).on('click', function(e) {
            var parentColumn = $(this).closest('.column-parent');
            if (parentColumn.hasClass('minimized')) {
                parentColumn.removeClass('minimized');
            } else {
                parentColumn.addClass('minimized');
            }
        });
        //Initialize OffCanvas Layouts
        $.each($('.modal-center'), function(index) {
            var ocId = this.id;
            var currentOC = $(this);
            //Only initialize a window if it has not been created already.
            if (!currentOC.data('kendoWindow')) {
                var ocDiv = $('.offcanvas-toggle[data-target="#' + ocId + '"]', containerDiv);
                ocDiv.removeClass('offcanvas-toggle');
                ocDiv.addClass('in-modal-window');

                //if the initialization was performed on a container then add it it a seperate list with id.

                queryLayoutUIHelpers.addWindowToTrackingList(
                    SYSPRO_VB.createKendoWindow(
                        ocId,
                        currentOC.data('modaltitle'),
                        function(e) {},
                        function(e) {},
                        ['Close'],
                        null,
                        null,
                        true,
                        true,
                        false
                    ),
                    containerId
                );

                ocDiv.on('click', function() {
                    if (currentOC.data('kendoWindow')) {
                        currentOC
                            .data('kendoWindow')
                            .center()
                            .open();
                    } else {
                        var currWindow = SYSPRO_VB.createKendoWindow(
                            ocId,
                            currentOC.data('modaltitle'),
                            function(e) {},
                            function(e) {},
                            ['Close'],
                            null,
                            null,
                            true,
                            true,
                            false
                        );
                        queryLayoutUIHelpers.addWindowToTrackingList(currWindow, containerId);
                        currWindow.center().open();
                    }

                    sysproInterop.requestGridListsRefresh(currentOC);
                    if ($('.tile-widget', currentOC).length > 0) {
                        sysproInterop.bindTiles(sysproInterop.viewModel, $('.tile-widget', currentOC), '');
                    }
                });
            }
        });

        //On collapsible shown resize grids and also call the request from SYSPRO.
        $(document).on('shown.bs.collapse', function(arg) {
            if ($('.syspro-grid-list', arg.target).length > 0) {
                if ($('.syspro-grid-list', arg.target).data('kendoGrid')) {
                    $('.syspro-grid-list', arg.target)
                        .data('kendoGrid')
                        .refresh();
                    sysproInterop.requestGridListsRefresh($('.syspro-grid-list', arg.target).parent());
                }
            }
            if ($('.tile-widget', arg.target).length > 0) {
                sysproInterop.bindTiles(sysproInterop.viewModel, $('.tile-widget', arg.target), '');
            }
            // sysproInterop.sizeTiles(0);
            // sysproInterop.resizeSparklines();
        });

        //Initialize OffCanvas
        $('[data-toggle="offcanvas"]').each(function() {
            if (!$(this).hasClass('in-modal-window')) {
                if ($(this).data('isocinitialized')) {
                    //only initialize once.
                } else {
                    var oc;
                    $(this).data('isocinitialized', 'true');

                    oc = new Offcanvas($(this));
                    // queryLayoutUIHelpers.offCanvasesCreated.push($(this));
                    return oc;
                }
            }
        });

        //$(window).on('resize', function () {
        //    $('.navbar-offcanvas.in').each(function () {
        //        return $(this).removeClass('in');
        //    });
        //    return $('.offcanvas-toggle').removeClass('is-open');
        //});
        var toggleoffcanvas = function(e) {
            var el, selector;

            if (!$(this).hasClass('js-offcanvas-has-events')) {
                selector = $(this).attr('data-target');
                el = $(selector);
                if (el) {
                    //el.height('');
                    el.removeClass('in');
                    $('body').removeClass('offcanvas-stop-scrolling');
                    return $('body').css({
                        overflow: '',
                        position: '',
                    });
                }
            } else {
                selector = $(this).attr('data-target');
                el = $(selector);
                console.log(el);
                sysproInterop.requestGridListsRefresh(el);
                if ($('.tile-widget', el).length > 0) {
                    sysproInterop.bindTiles(sysproInterop.viewModel, $('.tile-widget', el), '');
                }
            }
        };
        $('.offcanvas-toggle', containerDiv).each(function() {
            $(this).off('click', toggleoffcanvas);
            $(this).on('click', toggleoffcanvas);
        });

        //inputNumber.addEventListener('change', function () {
        //    slider.noUiSlider.set([null, this.value]);
        //});

        //Inputmask().mask(document.querySelectorAll("input"));
        $('.dropdown-select', containerDiv).dropdown({ autoinit: false });
        //$('.date-input').bootstrapMaterialDatePicker({ format: sysproInterop.dateFormat.toUpperCase(), weekStart: 0, time: false });

        //$('.date', containerDiv).datetimepicker({

        //    format: sysproInterop.dateFormat.toUpperCase(),
        //    icons: {
        //        time: 'material-icons',
        //        date: 'material-icons',
        //        up: 'material-icons',
        //        down: 'material-icons',
        //        previous: 'material-icons',
        //        next: 'material-icons',
        //        today: 'material-icons',
        //        clear: 'material-icons',
        //        close: 'material-icons'
        //    },
        //    showTodayButton: true
        //});
        // initialise date pickers
        $('.date', containerDiv).datepicker({
            format: sysproInterop.dateFormat.toLowerCase(),
            //{
            //    toDisplay: function (date, format, language){
            //        var strOut = kendo.toString(date, sysproInterop.dateFormat);
            //        return strOut;
            //    },
            //    toValue: function (date, format, language) {
            //        var dateOut = kendo.parseDate(date, format);
            //        return dateOut;
            //    }

            //},
            maxViewMode: 2,
            todayBtn: true,
            autoclose: true,
            todayHighlight: true,
            showOnFocus: false,
            zIndexOffset: 99999,
        });
        var comboboxes = $('.combobox:not(.combobox-initialized)').combobox({ newOptionsAllowed: true });
        $('.combobox:not(.combobox-initialized)').addClass('combobox-initialized');

        queryLayoutUIHelpers.initializeTooltips();
        //if ($('[data-tooltip="tooltip"]').length > 0)
        //    $('[data-tooltip="tooltip"]').tooltip();

        $.each($('.tile-widget', containerDiv), function(index) {
            var packeryIn = $(this).packery({
                itemSelector: '.tile:not(.tile-width-marker)',
                gutter: 0,
                //stamp: '.stamp',
                columnWidth: 142,
                transitionDuration: '0.27s',
            });
            packeryIn.packery('layout');
            queryLayoutUIHelpers.tilesCreated.push(packeryIn);
        });

        //Next initialize dragdrop  for tiles.
        queryLayoutUIHelpers.initializeDragDrop();
        // We are not currently using this, so not necessary to include for now, but maybe good to have it in there commented out..
        // Scroll on hover text for overflowing text in data widgets
        //Check in Gulfile to make reference  to this js.
        //$(".overflowing").hoverForMore({
        //    speed: 40.0,		// Measured in pixels-per-second
        //    loop: false,		// Scroll to the end and stop, or loop continuously?
        //    gap: 20,			// When looping, insert this many pixels of blank space
        //    target: false,		// Hover on this CSS selector instead of the text line itself
        //    removeTitle: true,	// By default, remove the title attribute, as a tooltip is redundant
        //    snapback: true,		// Animate when de-activating, as opposed to instantly reverting
        //    addStyles: true,	// Auto-add CSS; leave this on unless you need to override default styles
        //    alwaysOn: false,	// If you're insane, you can turn this into a <marquee> tag. (Please don't.)
        //    // In case you want to alter the events which activate and de-activate the effect:
        //    startEvent: "mouseenter",
        //    stopEvent: "mouseleave"
        //});
        //$.inputmask.defaults.escapeChar = "//";
        $(document).ready(function() {
            $(document).off('click', '.disabled, .disabled a');
            $(document).on('click', '.disabled, .disabled a', function(e) {
                console.log('this was clicked');
                e.stopImmediatePropagation();
            });

            $(window).resize(function() {
                if (this.resizeTO) clearTimeout(this.resizeTO);
                this.resizeTO = setTimeout(function() {
                    $(this).trigger('resizeEnd');
                }, 250);
                //SYSPRO_VB.sizeTiles();
                // Replacing the above with the contents of the function:
                // queryLayoutUIHelpers.sizeTiles(0);
            });

            $(window).bind('resizeEnd', function() {
                sysproInterop.sizeTiles(0);
            });

            var __resetLayout = Packery.prototype._resetLayout;
            Packery.prototype._resetLayout = function() {
                __resetLayout.call(this);
                // reset packer
                var parentSize = getSize(this.element.parentNode);
                var colW = this.columnWidth + this.gutter;
                this.fitWidth = Math.floor((parentSize.innerWidth + this.gutter) / colW) * colW;
                this.packer.width = this.fitWidth;
                this.packer.height = Number.POSITIVE_INFINITY;
                this.packer.reset();
            };

            Packery.prototype._getContainerSize = function() {
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
                    height: this.maxY - this.gutter,
                };
            };

            // always resize
            Packery.prototype.needsResizeLayout = function() {
                return true;
            };

            sysproInterop.initiateExistingTiles();
            sysproInterop.sizeTiles(0);
        });
    },
    toolbarEventHandler: function(index) {
        var dataFieldName = this.getAttribute('data-fieldname');

        if (!this.disabled) {
            if (dataFieldName === 'FusionInternal.HelpTour') {
                var isModal = '';
                if ($(this).closest('.modal-window-main').length > 0) {
                    isModal = 'ModalWindow';
                }
                sysproInterop.startHelpTourForApplication(isModal);
            } else if (dataFieldName === 'Toolbar.NOTES002') {
                //Use the date in format yyyy-MM-dd for SYSPRO consistency. (Could use sysproInterop.dateFormat instead)
                var dateStamp = kendo.toString(new Date(), 'yyyy/MM/dd');
                //Now include the Operator name after the date as well.
                var OperatorNameIn = '';
                if (sysproInterop.currentUserSession) OperatorNameIn = sysproInterop.currentUserSession.OperatorName;
                dateStamp = dateStamp + ' ' + OperatorNameIn;
                var notesInputField = $('#Fields\\.IMPWEDF0NOTESMAIN');
                if (notesInputField.length === 0) {
                    //If the Notes control doesn't  exist then look for the richtext one.
                    notesInputField = $('#Fields\\.NOTESMAINRTF');
                    var richTextContainer = $(this).closest('.avanti-richtextwidget');
                    if (richTextContainer.length > 0) {
                        notesInputField = $('.avanti-richtextwidget-textholder', richTextContainer);
                    }

                    if (notesInputField.data('kendoEditor')) {
                        //Find  the selection in the rich text control and then set it.
                        //Might need to trigger a fieldChange?
                        var editorControl = notesInputField.data('kendoEditor');
                        //First set focus
                        editorControl.focus();
                        var selectionIn = editorControl.getSelection();
                        var nodeSelected = selectionIn.focusNode;
                        var selectionStartIndex = selectionIn.focusOffset;
                        var selectionRange = selectionIn.rangeCount - 1;

                        //This determines  if there is selection inside the editor.
                        if (
                            $(selectionIn.focusNode).hasClass('body-edit-mode') ||
                            $(selectionIn.focusNode)
                                .parent()
                                .hasClass('k-window-titlebar')
                        ) {
                            //TODO: Need to trigger a fieldChange here manually
                            //If no node  is selected then just insert it right at the start of  the editor control
                            editorControl.value(dateStamp + editorControl.value());
                        } else {
                            //If there is selection inside the editor then insert the date stamp as  usual at that point.
                            if (nodeSelected.nodeName === '#text') nodeSelected = nodeSelected.parentNode;
                            var strTest = $(nodeSelected).text();

                            var newText =
                                strTest.substr(0, selectionStartIndex) +
                                dateStamp +
                                strTest.substr(selectionStartIndex + selectionRange);

                            $(nodeSelected).text(newText);
                            //TODO: a  field   change triggers here  but only with the old value (Before inserting the date) so possibly need to trigger a new fieldChange  with the new value  as well.
                        }
                    }
                } else {
                    var cursorPosStart = notesInputField.prop('selectionStart');
                    var cursorPosEnd = notesInputField.prop('selectionEnd');
                    var v = notesInputField.val();
                    var textBefore = v.substring(0, cursorPosStart);
                    var textAfter = v.substring(cursorPosEnd, v.length);
                    notesInputField.val(textBefore + dateStamp + textAfter);
                }
            } else {
                if (dataFieldName && dataFieldName.indexOf('Toolbar.AVANTICARDBUILDER') === 0) {
                    //Avanti Card Builder calls will be handled by seperate code.
                    //Need to try limit calls  out  of here to  keep code generic..
                    if (sysproCardBuilder) {
                        sysproCardBuilder.toolbarEvent(dataFieldName);
                    }
                } else {
                    sysproInterop.eventTrigged(
                        dataFieldName,
                        '',
                        '',
                        '',
                        'toolbarEvent',
                        function(eCurrent) {},
                        function(eCurrent) {}
                    );
                }
            }
        }
    },
    initializeToolbarEvents: function() {
        $('.syspro-toolbar-widget-button').off('click', queryLayoutUIHelpers.toolbarEventHandler);
        $('.syspro-toolbar-widget-button').on('click', queryLayoutUIHelpers.toolbarEventHandler);
        //If Input  event is need for  immediate change not tab off.
        //$(".syspro-toolbar-widget-editfield").off("input");
        //$(".syspro-toolbar-widget-editfield").on("input", function (index) {
        //    var fieldName = $(this).data("fieldname");
        //    var fieldValue = $(this).val();
        //    sysproInterop.eventTrigged(fieldName, fieldValue, "", "", "toolbarEvent", function (eCurrent) { }, function (eCurrent) { });
        //});
        $('.syspro-toolbar-widget-change').off('change');
        $('.syspro-toolbar-widget-change').on('change', function(index) {
            if (this.classList.contains('combobox') && this.tagName === 'SELECT') {
                return;
            }
            //console.log("Toolbar Event: ignoreLastToolbarChange first -" + sysproInterop.ignoreLastToolbarChange);
            if (!sysproInterop.ignoreLastToolbarChange) {
                var dataFieldName = this.getAttribute('data-fieldname');
                if (!dataFieldName && this.id) {
                    dataFieldName = this.id.replace('undefined', '');
                }
                var dataValue = this.value;
                if (this.type == 'checkbox') {
                    dataValue = this.checked;
                }
                //If a toolbar event for a change has already been triggered for the same value then rather don'ttrigger it again and rather send it again.
                console.log('Toolbar Event: ' + dataValue + ',' + this.getAttribute('data-lastchangevalue'));
                if (dataValue !== this.getAttribute('data-lastchangevalue')) {
                    this.setAttribute('data-lastchangevalue', dataValue);

                    //Now check if the field is a KeyField(With predictive search and if so update SYSPROKeyData and bind cards)
                    sysproInterop.updateSYSPROKeyDataFromElementChange($(this), dataValue);
                    // console.log("Toolbar Event: eventTrigged");
                    sysproInterop.eventTrigged(
                        dataFieldName,
                        dataValue,
                        '',
                        '',
                        'toolbarEvent',
                        function(eCurrent) {},
                        function(eCurrent) {}
                    );
                } else {
                    this.setAttribute('data-lastchangevalue', null);
                }
            }
            // console.log("Toolbar Event: ignoreLastToolbarChange last - " + sysproInterop.ignoreLastToolbarChange);
            sysproInterop.ignoreLastToolbarChange = false;
            //console.log("Toolbar Event: ignoreLastToolbarChange last set - " + sysproInterop.ignoreLastToolbarChange);
        });
    },
    disposeVisualDesigner: function() {
        //$.each(SYSPRO_VB.visualDesignerWindows, function (index) {
        //    if (this && this.destroy)
        //        this.destroy();
        //});
        //SYSPRO_VB.visualDesignerWindows = [];
        var column1InputId = sysproInterop.generateUUID(),
            column2InputId = sysproInterop.generateUUID();
        SYSPRO_VB.history = [];
        SYSPRO_VB.historyIndex = 0;
        SYSPRO_VB.column1Copy = {
            PrimaryStyle: 0,
            ResponsiveStyle: 3,
            Widgets: [],
            Id: column1InputId,
            Index: 1,
            TypeName: 'Column',
            HasChildren: false,
            index: 1,
        };

        SYSPRO_VB.column2Copy = {
            PrimaryStyle: 0,
            ResponsiveStyle: 3,
            Widgets: [],
            Id: column2InputId,
            Index: 2,
            TypeName: 'Column',
            HasChildren: false,
            index: 2,
        };

        //Clean up event handlers
        $('.disabled, .disabled a').off('click');
        $('.menu-toggle').off('click');
        $('.menu-toggle-tab').off('click');
        $("input[name='column-layout']")
            .parent()
            .off('click');
        $("input[name='column-layout']").off('change');
        $('#exportTotalJSON').off('click');
        $('.block-bg-button').off('shown.bs.popover');
        $(document).off('click', '.add-row-section');
        $(document).off('click', '.add-data-section');
        $(document).off('click', '.remove-section');
        $(document).off('click', '.remove-row-section');
        $(document).off('click', '.edit-row-section');
        $(document).off('click', '.add-toolbar-section');
        $(document).off('click', '.remove-toolbar-widget');
        $(document).off('click', '.edit-toolbar-widget');
        $('.window-content').off('click');
        $(document).off('shown.bs.collapse');
        $('#initial-fields-list-data-window.fieldsPanelBar .list-group-item.field-name').off('click');
        $("#dataWindow input[name='data-window-off-canvas-type']").off('change');
        $('.links-fields-list-data-edit-window .list-group-item').off('click');
        $("#dataEditWindow input[name='data-edit-window-off-canvas-type']").off('click');
        $('#tiles-list').off('click');
        $("#tileWindow input[name='tile_text_colour']").off('change');
        $('.clear-color-selections').off('click');
        $('#tiles-list').off('click');
        $('#toolbar-widgets-list.fieldsPanelBar .list-group-item').off('click');
        $("#toolbarWindow input[name='off-canvas-type']").off('change');
        //Clear the drilldowns that have been created and initialize them with the previous contents.
        $('#initial-fields-list').html('');
        $('#initial-fields-list-data-window-wrapper').html(
            '<ul id="initial-fields-list-data-window" class="fieldsPanelBar list-group"></ul>'
        );
        $('#initial-fields-list-data-edit-window-wrapper').html(
            '<ul id="initial-fields-list-data-edit-window" class="fieldsPanelBar"></ul>'
        );

        $('#toolbar-widget-list-wrapper').html('<ul id="toolbar-widgets-list" class="fieldsPanelBar list-group"></ul>');
        $('#toolbar-widget-edit-list-wrapper').html(
            '<ul id="edit-toolbar-widgets-list" class="fieldsPanelBar list-group"></ul>'
        );

        $('#tile-widgets-list-wrapper').html('<ul id="tiles-list" class="fieldsPanelBar"></ul>');
        $('#tile-widgets-edit-list-wrapper').html('<ul id="tiles-edit-list" class="fieldsPanelBar"></ul>');
        $('#quick-add-layout .quick-sortable-list.row').html('');
        $('#GridlistWidgets .layout-radio-options').html('');
        $('#editGridlistWidgets .layout-radio-options').html('');

        $('#quick-add-layout .quick-sortable-list.row').html('');
        $('#AvailableCards .layout-radio-options').html('');
        $('#editCard .layout-radio-options').html('');

        $('#quick-add-layout .quick-sortable-list.row').html('');
        $('#HarmonyWidgets .layout-radio-options').html('');
        $('#EditHarmonyWidgets .layout-radio-options').html('');
        $('#tiles-parameters-wrapper').empty();

        $(window).off('resize');
        // clicking the options
        if (SYSPRO_VB.layoutWidgetSelectOptions) {
            $.each(SYSPRO_VB.layoutWidgetSelectOptions, function(idx, opt) {
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
            $.each(SYSPRO_VB.offCanvasWindows, function(key, value) {
                if (SYSPRO_VB.offCanvasWindows[key] && SYSPRO_VB.offCanvasWindows[key].destroy)
                    SYSPRO_VB.offCanvasWindows[key].destroy();
                $(key).remove();
            });
        }
        SYSPRO_VB.offCanvasWindows = {};
        SYSPRO_VB.fieldsListHTML = '';
        SYSPRO_VB.chartsListHTML = '';
        SYSPRO_VB.toolbarListHTML = '';
        SYSPRO_VB.tilesListHTML = '';
        SYSPRO_VB.tileWidgetFields = [];
        SYSPRO_VB.tileOptionsHTML = '';
    },
    disposeViewOnly: function(containerId) {
        queryLayoutUIHelpers.disposeOfWindows(containerId);
        var indexRemoved = [];
        if (!containerId) {
            //Only perform blanket disposal of  modals  if this disposal was called  for  a main layout not for a specific  modal.
            $.each(sysproInterop.modalWindowHolder, function(index) {
                if (!this.NotModal) {
                    indexRemoved.push(index);
                    if (this.ModalType === 0) {
                        this.Window.close();
                    } else {
                        this.Window.close();
                        this.Window.element.remove();
                    }
                }
            });
            while (indexRemoved.length > 0) {
                var IndexToRemove = indexRemoved.pop();
                sysproInterop.modalWindowHolder.splice(indexRemoved, 1);
            }
        }
        //queryLayoutUIHelpers.offCanvasesCreated = [];
        if (!containerId) {
            //Also only dispose  of tiles and collapsible event handlers if a main layout  was opened.
            $.each(queryLayoutUIHelpers.tilesCreated, function(index) {
                this.packery('destroy');
            });
            queryLayoutUIHelpers.tilesCreated = [];
            //$('.syspro-program-link').off('click');
            //$('.syspro-program-link').on('click', function (e) {
            //    var programToRun = this.getAttribute("data-sysproprogramname");
            //    sysproInterop.runProgramInSYSPRO(programToRun);
            //});
            $(document).off('shown.bs.collapse');
        }
    },
    initialiazeChartData: function(e) {
        var currChart = e.sender;
        var schemaSet = currChart.element[0].getAttribute('data-dataschemasetup');
        if (!schemaSet) {
            var fieldnames = currChart.element[0].getAttribute('data-fieldnames');
            var fieldsIn = {};
            if (fieldnames) {
                $.each(fieldnames.split(','), function(index) {
                    if (this) {
                        fieldsIn[this] = { type: 'number' };
                    }
                });

                var dataIn = e.sender.dataSource.data();
                var dataSource = new kendo.data.DataSource({
                    data: dataIn,
                    schema: {
                        model: {
                            fields: fieldsIn,
                        },
                    },
                });
                currChart.element[0].setAttribute('data-dataschemasetup', 'SchemaBind');
                currChart.setDataSource(dataSource);
                sysproInterop.hideShowSparklineSeries($(currChart.element[0]));
            }
        } else {
            currChart.element[0].setAttribute('data-dataschemasetup', '');
        }
    },

    calculateYValueOnNormalCurve: function(x, sd, m) {
        return Math.exp(-Math.pow(x - m, 2) / (2 * Math.pow(sd, 2))) / (sd * Math.sqrt(2 * Math.PI));
    },
    calculateYValuesOnNormalCurve: function(min, max, sd, m, numobs) {
        if (max === min) max = min + 1;
        var numobsside = numobs / (max - min);

        var outputvals = [];
        for (var lc = 0; lc <= numobs; lc = lc + 1) {
            var valueIn = lc / numobsside;
            outputvals.push(queryLayoutUIHelpers.calculateYValueOnNormalCurve(lc, sd, m));
        }
        return outputvals;
    },
    showProcessingMessage: function(message) {
        if (message) {
            $('#processingMessage').text(message);
            $('#processingMessageContainer').animate({ top: '0px' }, 400);
        } else {
            $('#processingMessageContainer').animate({ top: '-30px' }, 400);
        }
    },

    hideProcessingMessage: function() {
        $('#processingMessageContainer').animate({ top: '-150px' }, 300);
    },
    createTreeMenu: function(obj, level) {
        level = level || 0;
        // --------v create an <ul> element
        var c,
            $a,
            $li,
            breadcrumb = '',
            $ul = $('<ul>', { class: 'treeview-menu' });
        if (queryLayoutUIHelpers.typeParent.current !== obj.Description) {
            if (obj.Type === 'Folder') {
                queryLayoutUIHelpers.typeParent.current = obj.Description;

                if (level === 1) {
                    queryLayoutUIHelpers.typeParent.a = obj.Description;
                    queryLayoutUIHelpers.typeParent.b = null;
                    queryLayoutUIHelpers.typeParent.c = null;
                } else if (level === 2) {
                    queryLayoutUIHelpers.typeParent.b = obj.Description;
                    queryLayoutUIHelpers.typeParent.c = null;
                } else if (level === 3) {
                    queryLayoutUIHelpers.typeParent.c = obj.Description;
                }
            }
        }

        breadcrumb += queryLayoutUIHelpers.typeParent.a ? queryLayoutUIHelpers.typeParent.a + ' > ' : '';
        breadcrumb += queryLayoutUIHelpers.typeParent.b ? queryLayoutUIHelpers.typeParent.b + ' > ' : '';
        breadcrumb += queryLayoutUIHelpers.typeParent.c ? queryLayoutUIHelpers.typeParent.c + ' > ' : '';
        // --v loop through its children
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
            //if (obj.Children[c].Tooltip) {
            //   item += 'data-tooltip="tooltip" data-placement="bottom" data-original-title="' + obj.Children[c].Tooltip + '"';
            //}
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
            // if the child has a 'folder' prop on its own, call me again
            if (children) {
                $li.append(queryLayoutUIHelpers.createTreeMenu(obj.Children[c], level + 1));
            }
            $ul.append($li);
            if (!children) {
                queryLayoutUIHelpers.programListTypeahead.push({
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
    },
    initializeExpandableCards: function(card) {
        //$.each($(".card-widget"), function (index) {

        //    var card = this;
        //var miniViewHeight = $(card).find(".miniView").outerHeight();
        var cardBindableHeight = 0;
        var cardholderdiv = $(card).find('.card-bindable');
        if ($(card).find('.card-bindable').length === 0 && $(card).hasClass('card-bindable')) {
            cardholderdiv = $(card);
        }

        cardBindableHeight = cardholderdiv.outerHeight();

        var expandedViewHeight = $(card)
            .find('.expandedView')
            .outerHeight();

        //Store the heights in case they get set to 0.
        if (cardBindableHeight !== 0) {
            cardholderdiv.data('storedheight', cardBindableHeight);
        } else {
            if (cardholderdiv.data('storedheight') > 0) cardBindableHeight = cardholderdiv.data('storedheight');
        }

        if (expandedViewHeight !== 0) {
            $(card)
                .find('.expandedView')
                .data('storedheight', expandedViewHeight);
        } else {
            if (
                $(card)
                    .find('.expandedView')
                    .data('storedheight') > 0
            )
                expandedViewHeight = $(card)
                    .find('.expandedView')
                    .data('storedheight');
        }

        if (!$(card).data('isinitialized')) {
            $(card)
                .find('.expandedView')
                .css('height', '0px');
            $(card)
                .find('.expandedView')
                .css('display', 'block');
            cardholderdiv.css('minHeight', cardBindableHeight);
            $(card).data('isinitialized', true);
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
            var fade = { opacity: 1, height: expandedViewHeight + 'px' };
            elem.css(fade);
        }

        function shrinkFade(elem) {
            var fade = { opacity: 0, height: '0px' };
            elem.css(fade);
        }

        $(card)
            .find('.expand-card')
            .off('click')
            .on('click', function(e) {
                e.preventDefault();
                slideFade($(this).closest('.miniView'));
            });

        $(card)
            .find('.shrink-card')
            .off('click')
            .on('click', function(e) {
                e.preventDefault();
                shrinkFade($(this).closest('.expandedView'));
            });

        $(card)
            .find('.miniView')
            .off('transitionend webkitTransitionEnd oTransitionEnd')
            .on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
                if (e.originalEvent.propertyName === 'opacity' && $(this).css('opacity') == 0) {
                    expandFade($(this).siblings('.expandedView'));
                    $(this).css('height', '0px');
                }
            });

        $(card)
            .find('.expandedView')
            .off('transitionend webkitTransitionEnd oTransitionEnd')
            .on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
                if (e.originalEvent.propertyName === 'opacity' && $(this).css('opacity') == 0) {
                    $(card)
                        .find('.miniView')
                        .css('height', 'auto');
                    slideInFade($(this).siblings('.miniView'));
                }
            });
        // } );
    },
};
