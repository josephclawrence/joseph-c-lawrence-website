/* QueryLayoutUIHandlers  provides UI handling usually performed  by the visual builders sysproscript file but for  the standard query layout. */
$(window).ready(function () {
    //Only if SYSPRO_VB has not  been initialized then does the QueryUIHelpers class need  to be  initialized.
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
    
   
    SYSPRO_VB = {
        // Error Notification setup
        errorNotification: $("#errorNotification").kendoNotification({
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

        }).data("kendoNotification"),
        // Error Notification display function
        showErrorMessage: function (message, title) {
            console.log("showErrorMessage - "+title +" - "+message);
            if (title && title != '') {
                title = title;
            } else {
                title = "Sorry, something has gone wrong. The technical error message is:";
            }
            SYSPRO_VB.errorNotification.show({
                title: title,
                message: message
            }, "error");
        },
        hideErrorMessage: function () {
            console.log("hideErrorMessage");
            SYSPRO_VB.errorNotification.hide();
        },
        //Store the visual designer windows for disposal.
        visualDesignerWindows: [],
        diagrams: {},
        // Create a Kendo UI diagram
        createDiagram: function (diagramData, containerElement, editable) {

            var shapesDataSource = SYSPRO_VB.localDataSource({
                data: diagramData.shapesData || [],
                schema: {
                    model: {
                        id: "Id",
                        fields: {
                            Id: { type: "string", editable: false },
                            Title: { type: "string" },
                            Program: {
                                type: "string",
                                parse: function (val) {
                                    return typeof val === "string" ? { Name: val } : typeof val.Name === "string" ? val : { Name: "Select program" };
                                }
                            },
                            Color: { type: "string" },
                            path: { type: "string" },
                            x: { type: "number" },
                            y: { type: "number" },
                            width: { type: "number" },
                            height: { type: "number" }
                        }
                    }
                }
            });

            var connectionsDataSource = SYSPRO_VB.localDataSource({
                data: diagramData.connectionsData || [],
                schema: {
                    model: {
                        id: "Id",
                        fields: {
                            Id: { type: "string", editable: false },
                            from: { type: "string" },
                            to: { type: "string" }
                        }
                    }
                }
            });


            var shapesEditable = editable ? {
                tools: [{
                    name: "edit",
                    icon: "pencil"
                }, {
                    name: "delete",
                    icon: "trash"
                }]
            } : false;

            var connectionsEditable = editable ? {
                tools: [{
                    name: "delete"
                }]
            } : false;

            var overallEditable = editable ? {
                resize: false,
                rotate: false,
                tools: [{}],
                shapeTemplate: function (dataItem) {
                    return kendo.template($("#programEditTemplate").html())(dataItem);
                }
            } : false;

            var clickFunction = editable ? false : function (e) {
                if (e.item instanceof kendo.dataviz.diagram.Shape) {
                    //console.log('You just clicked the:' + e.item.dataItem.Program + 'element');
                    sysproInterop.runProgramInSYSPRO(e.item.dataItem.Program.Name, e.item.dataItem.Program.Type, e.item.dataItem.Program.Description, e.item.dataItem.Program.SubType);
                } else {
                    console.log("Clicked a connection.");
                }
            };

            function updateShapeProperties(shape) {
                $(".shapeBackgroundColorPicker", containerElement).getKendoColorPicker().value(kendo.parseColor(shape.dataItem.Color));
            }

            function updateConnectionProperties(shape) {
                $("input.connectionStartCap", containerElement).getKendoDropDownList().value(shape.startCap);
                $("input.connectionEndCap", containerElement).getKendoDropDownList().value(shape.endCap);
            }

            function onDataBound(e) {
                this.bringIntoView(this.shapes);
            }

            var select = editable ? function (e) {
                if (e.selected.length) {
                    SYSPRO_VB.diagramSelected = e.selected;
                    var element = e.selected[0];
                    if (element instanceof kendo.dataviz.diagram.Shape) {
                        updateShapeProperties(element);
                    } else {
                        updateConnectionProperties(element.options);
                    }
                }
            } : false;

            return $(editable ? '.diagramEdit' : '.diagram', containerElement).kendoDiagram({
                theme: "default",
                dataSource: shapesDataSource,
                connectionsDataSource: connectionsDataSource,
                shapeDefaults: {
                    visual: SYSPRO_VB.visualTemplate,
                    width: 120,
                    height: 120,
                    fill: "#ecf0f1",
                    editable: shapesEditable
                },
                connectionDefaults: {
                    stroke: {
                        color: "#2c3e50",
                        width: 2
                    },
                    type: "cascading",
                    endCap: "ArrowEnd",
                    editable: connectionsEditable
                },
                layout: diagramData.layout,
                editable: overallEditable,
                select: select,
                click: clickFunction,
                // toolBarClick: function (e) {
                //     console.log(e);
                // },
                edit: function (e) {
                    SYSPRO_VB.diagramActiveItemProgram = e.shape.Program;
                },
                zoom: 0.8,
                dataBound: onDataBound
            }).data("kendoDiagram");

        },

        // Return a Kendo Diagram shape from given options
        visualTemplate: function (options) {
            var dataviz = kendo.dataviz;
            var g = new dataviz.diagram.Group();
            var dataItem = options.dataItem;
            var dataItemTitle = dataItem.Title;
            var dataItemSubTitle = dataItem.SubTitle;
            var dataItemProgram = dataItem.Program.Name;
            var dataItemType = dataItem.Program.Type;
            var dataItemClickable = dataItem.Clickable; // Boolean            
            var titleX, titleY, programX, programY;

            g.drawingElement.options.tooltip = {
                content: dataItemProgram + ' (' + dataItemType + ')',
                shared: true
            };

            if (dataItem.type === "circle") {
                g.append(new dataviz.diagram.Circle({
                    width: dataItem.width || 120,
                    height: dataItem.height || 120,
                    stroke: {
                        width: 0
                    },
                    fill: {
                        color: dataItem.Color || "#ecf0f1"
                    }
                }));
            } else if (dataItem.path !== null && dataItem.path !== undefined) {
                g.append(new kendo.dataviz.diagram.Path({
                    data: dataItem.path,
                    stroke: {
                        width: 0
                    },
                    fill: dataItem.Color || "#ecf0f1"
                }));

                switch (dataItem.shapeName) {
                    case 'data':
                        titleX = 25;
                        titleY = 35;
                        programX = 25;
                        programY = 55;
                        break;
                    case 'decision':
                        titleX = 25;
                        titleY = 35;
                        programX = 25;
                        programY = 55;
                        break;
                    case 'delay':
                        titleX = 15;
                        titleY = 35;
                        programX = 15;
                        programY = 55;
                        break;
                    case 'display':
                        titleX = 25;
                        titleY = 35;
                        programX = 25;
                        programY = 55;
                        break;
                    case 'document':
                        titleX = 15;
                        titleY = 30;
                        programX = 15;
                        programY = 50;
                        break;
                    case 'manualinput':
                        titleX = 15;
                        titleY = 40;
                        programX = 15;
                        programY = 60;
                        break;
                    case 'manualoperation':
                        titleX = 25;
                        titleY = 35;
                        programX = 25;
                        programY = 55;
                        break;
                    case 'merge':
                        dataItemTitle = '';
                        dataItemProgram = '';
                        break;
                    case 'or':
                        dataItemTitle = '';
                        dataItemProgram = '';
                        break;
                    case 'preparation':
                        titleX = 25;
                        titleY = 35;
                        programX = 25;
                        programY = 55;
                        break;
                    case 'process':
                        titleX = 15;
                        titleY = 35;
                        programX = 15;
                        programY = 55;
                        break;
                    case 'octagon':
                        titleX = 20;
                        titleY = 20;
                        programX = 20;
                        programY = 40;
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
                    fill: dataItem.Color || "#ecf0f1"
                }));
            }

            g.append(new dataviz.diagram.TextBlock({
                text: dataItemTitle,
                x: titleX || 15,
                y: titleY || 15,
                fill: "#fff"
            }));

            g.append(new dataviz.diagram.TextBlock({
                text: dataItemSubTitle,
                x: programX || 15,
                y: programY || 35,
                fill: "#fff"
            }));

            if (dataItemClickable) {
                g.append(new dataviz.diagram.Image({
                    source: "../../UX_IMG_openProgram.png",
                    x: 3,
                    y: 3,
                    width: 18,
                    height: 18
                }));
            }

            // g.append(new dataviz.diagram.TextBlock({
            //     text: dataItemType,
            //     x: programX || 15,
            //     y: programY + 20 || 55,
            //     fill: "#fff"
            // }));

            return g;
        },

        // Helper function to create local data source for Kendo UI diagram
        localDataSource: function (options) {
            var id = options.schema.model.id;
            var data = options.data;
            var newId = -1;
            var created, updated, deleted;

            var dataSource = new kendo.data.DataSource($.extend(true, {
                transport: {
                    read: function (e) {
                        created = {};
                        updated = {};
                        deleted = {};

                        e.success(data || []);
                    },

                    update: function (e) {
                        var item = e.data;
                        if (!created[item[id]]) {
                            updated[item[id]] = item;
                        }
                        e.success();
                    },

                    destroy: function (e) {
                        var idValue = e.data[id];
                        if (!created[idValue]) {
                            deleted[idValue] = e.data;
                        } else {
                            delete created[idValue];
                        }
                        e.success();
                    },
                    create: function (e) {
                        var item = e.data;
                        // item[id] = newId--;
                        item[id] = sysproInterop.generateUUID();
                        created[item[id]] = $.extend(true, {}, item);

                        e.success(item);
                    }
                },
            }, options));

            dataSource.getChanges = function () {
                return {
                    deleted: SYSPRO_VB.toArray(deleted),
                    created: SYSPRO_VB.toArray(created),
                    updated: SYSPRO_VB.toArray(updated)
                }
            };

            return dataSource;
        },

        toArray: function (changes) {
            var result = [];
            for (var id in changes) {
                result.push(changes[id]);
            }
            return result;
        },

        // Fuction to create a Kendo UI Window
        createKendoWindow: function (windowID, windowTitle, openFunction, closeFunction, actionsIn, width, height, notmodal, issysprowindow, disposeonclose, left, top) {
            if (!actionsIn)
                actionsIn = [];
           
            var widthInput = "900px";
            var heightInput = "550px";

            var topInput = "50%";
            var leftInput = "50%";
            //If a top or left are given then position the box accordingly
            if (top) topInput = top + "px";
            if (left) leftInput = left + "px";

            if (width)
                widthInput = width + "px";
            if (height)
                heightInput = height + "px";
            var ismodal = true;
            if (notmodal)
                ismodal = false;
            var deactivateMethod = null;
            if (disposeonclose) {
                //If its a syspro window dispose of it after it closes.
                deactivateMethod = function () {
                    this.destroy();
                };
            }
            $("#" + windowID).kendoWindow({ //create a window
                actions: actionsIn,
                draggable: true,
                minHeight: "100px",
                minWidth: "100px",
                width: widthInput,
                height: heightInput,
                modal: ismodal,
                position: {
                    top: topInput,
                    left: leftInput
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
                deactivate: deactivateMethod,
                visible: false,
                open: openFunction,
                close: closeFunction,
                activate: function (e) { ElementQueries.init() }
            });
            
            var windowHolder = $("#" + windowID).data("kendoWindow");

            if (issysprowindow && windowHolder)
            {
                //If its a syspro window then add compact to the wrapper.
                windowHolder.wrapper.addClass("compact-window");
            }
            return windowHolder;
        },
        //Destroy all treeview Kendo widgets
        destroyTreeViews: function () {

            for (var prop in SYSPRO_VB.invisibleTreeViews) {
                var treeview = $("#" + prop).data("kendoTreeView");
                if (treeview) {
                    treeview.destroy();
                }
                $("#" + prop).remove();
            }

        },
        // Size add on buttons
        sizeAddonButtons: function () {
            $('.additional-input-button').each(function () {
                var parentWidth = $(this).width();
                var input = $(this).find('.input-group').length ? $(this).find('.input-group') : $(this).find('input');
                var inputWidth = input.width();
                var button = $(this).find('.btn.btn-sm.btn-default');
                var buttonWidth = button.textWidth() + 18;
                if (parentWidth <= (126 + buttonWidth)) {
                    //button.width('100%');
                    button.css('width', '100%');
                    button.css('margin-left', '0px');
                    input.width('100%');
                    input.css('width', '100%');
                } else {
                    button.width(buttonWidth - 18);
                    button.css('margin-left', '5px');
                    input.width(parentWidth - buttonWidth - 10);
                }
            });
        },
        initProgramListTileDragging: function () {

        }

    };

    // alert(JSON.stringify(SYSPRO_VB));


    //TODO:  Need to add code to handle setting the value of a radio button to the property automatically.
    //var slider = document.getElementById('slider');
    //if (slider)
    //    {
    //    noUiSlider.create(slider, {
    //        start: 30,
    //        connect: [true, false],
    //        range: {
    //            'min': 0,
    //            'max': 60
    //        }
    //    });
    //    }
      
    //    slider.noUiSlider.on('update', function (values, handle) {
    //        var value = values[handle];

    //        inputNumber.value = value;
    //    });

        //inputNumber.addEventListener('change', function () {
        //    slider.noUiSlider.set([null, this.value]);
        //});
        //var slider = document.getElementById('slider1');
        //noUiSlider.create(slider, {
        //    start: 30,
        //    connect: [true, false],
        //    range: {
        //        'min': 0,
        //        'max': 60
        //    }
        //});
        //slider.noUiSlider.on('update', function (values, handle) {
        //    var value = values[handle];

        //    inputNumber.value = value;
        //});

        //inputNumber.addEventListener('change', function () {
        //    slider.noUiSlider.set([null, this.value]);
        //});

        
     
        //$("input").on("blur", function () {
        //    $("#event-list").text("Blur event");
        //});
        //$("input").on("focus", function () {
        //    $("#event-list").text("Focus event");
        //});
        //$("input").on("focusin", function () {
        //    $("#event-list").text("Focus in event");
        //});
        //$("input").on("focusout", function () {
        //    $("#event-list").text("Focus out event");
        //});
        //$("input").on("change", function () {
        //    $("#event-list").text("Change event");
        //});
        //$("select").on("select", function () {
        //    $("#event-list").text("Select event");
        //});


    // textWidth jQuery function
    $.fn.textWidth = function (text, font) {
        if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').appendTo(document.body);
        var htmlText = text || this.val() || this.text();
        htmlText = $.fn.textWidth.fakeEl.text(htmlText).html(); //encode to Html
        htmlText = htmlText.replace(/\s/g, "&nbsp;"); //replace trailing and leading spaces
        $.fn.textWidth.fakeEl.html(htmlText).css('font', font || this.css('font'));
        return $.fn.textWidth.fakeEl.width();
    };

    queryLayoutUIHelpers.initializeViewOnly();
    queryLayoutUIHelpers.initializeToolbarEvents();



});






