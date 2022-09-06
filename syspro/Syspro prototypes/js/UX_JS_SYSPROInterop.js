function sysproInteropFunction(argument) {
    try {
        return eval(argument);
    } catch (e) {
        alert('sysproInteropFunction - ' + argument + ' - ' + e.message);
    }
}

function sysproInteropSparklineSeriesClick(e) {
    sysproInterop.sparklineSeriesClick(e);
}

var sysproInterop = {
    version: '805',
    threadedCallbackIndexToUse: 0,
    threadedCallbacksLookup: {},
    bindingStarted: null,
    bindingCompleted: null,
    viewModel: null,
    toolbarModel: null,
    setAvailableFields: null,
    isInAppBuilder: false,
    errorHandler: 'Internal',
    internalHistoryIndex: 0,
    internalHistoryChange: 0,
    decimalCharacter: '.',
    thousandSeperator: ',',
    numericMasking: '',
    dateFormat: 'yyyy-MM-dd',
    harmonyEnabled: false,
    harmonyAddress: '',
    ignoreLastToolbarChange: false,
    predictiveSearchCache: {},
    cursorX: 0,
    cursorY: 0,
    cursorContextMenuOpenedX: 0,
    cursorContextMenuOpenedY: 0,
    taskDialogContentShown: '',
    typingInterval: null,
    typingElement: null,
    typingOperation: null,
    predictiveSearchActive: false,
    fullBindRequired: null,
    modalWindowStack: [],
    bindOnCurrentDivPerformed: false,
    bindOnCurrentToolbarPerformed: false,
    currentUserSession: null,
    reconnectionAttempts: 0,
    autoDateChange: false,
    //TODO: This should be null when SYSPRO returns if it is an entry or setup.
    isInEntryScreen: '',
    recentProgramList: [],
    currentContextMenu: null,
    currentContextMenuUnhealthyClose: null,
    isProgramaticClose: false,
    popupDialogOpened: false,
    manualButtonDialogClosed: false,
    //Set based on if the Visual Designer in Avanti is open.
    inDesignMode: false,
    //stores the time since a keydown or mousedown was used to track whether the user has interacted with Avanti.
    lastActivityDateTime: Date.now(),
    convertDateForGridOutput: function(value) {
        if (value instanceof Date) {
            return kendo.toString(value, 'yyyyMMdd');
        } else {
            return kendo.toString(kendo.parseDate(value), 'yyyyMMdd');
        }
    },
    generateUUID: function() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
        });
        return uuid;
    },
    showSmartTag: function(tag) {
        try {
            var dataValue = tag.getAttribute('data-fieldvalue');
            var dataCaption = tag.getAttribute('data-fieldcaption');
            var dataName = tag.getAttribute('data-fieldname');
            //If  the field  name is blank  then use the field name because a  card might not have it.
            if (!dataName) dataName = dataCaption;
            sysproInterop.eventTrigged(
                '',
                dataCaption,
                dataValue,
                dataName,
                'showSmartTag',
                function(e) {},
                function(e) {}
            );
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'showSmartTag');
        }
    },
    hyperlinkClicked: function(tag) {
        try {
            var dataValue = tag.getAttribute('data-fieldvalue');
            var dataCaption = tag.getAttribute('data-fieldcaption');
            var dataName = tag.getAttribute('data-fieldname');
            //If  the field  name is blank  then use the field name because a  card might not have it.
            if (!dataName) dataName = dataCaption;
            sysproInterop.eventTrigged(
                '',
                dataCaption,
                dataValue,
                dataName,
                'hyperlinkClicked',
                function(e) {},
                function(e) {}
            );
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'hyperlinkClicked');
        }
    },
    openLink: function(tag) {
        try {
            var dataValue = tag.getAttribute('data-fieldvalue');
            var dataCaption = tag.getAttribute('data-keyaction');
            //alert("openLink - " + dataCaption+"-"+ dataValue);
            sysproInterop.eventTrigged('', dataCaption, dataValue, '', 'openLink', function(e) {}, function(e) {});
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'openLink');
        }
    },
    getData: function(appNameIn, keyField, keyFieldValue, finalParameter, callbackMethod, errorcallbackMethod) {
        try {
            var NativeCallDataIn = {
                Operation: 'getData',
                Application: appNameIn,
                KeyField: keyField,
                KeyFieldValue: keyFieldValue,
                FinalParameter: finalParameter,
                AdditionalField1: '',
                AdditionalField2: '',
                AdditionalField3: '',
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: 'sysproInterop.interopCallbackReceived',
            };

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod,
            };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getData');
        }
    },
    eventTrigged: function(
        appNameIn,
        keyField,
        keyFieldValue,
        finalParameter,
        buttonClicked,
        callbackMethod,
        errorcallbackMethod,
        synchronous
    ) {
        try {
            var NativeCallDataIn = {
                Operation: 'eventTrigged',
                Application: appNameIn,
                KeyField: keyField,
                KeyFieldValue: keyFieldValue,
                FinalParameter: finalParameter,
                AdditionalField1: buttonClicked,
                AdditionalField2: '',
                AdditionalField3: '',
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: 'sysproInterop.interopCallbackReceived',
            };

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod,
            };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn, synchronous);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'eventTrigged');
        }
    },
    genericCall: function(
        Operation,
        appNameIn,
        keyField,
        keyFieldValue,
        finalParameter,
        additionalField1,
        additionalField2,
        additionalField3,
        callbackMethod,
        errorcallbackMethod
    ) {
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
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: 'sysproInterop.interopCallbackReceived',
            };

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod,
            };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'genericCall - ' + Operation);
        }
    },
    logMessage: function(appNameIn, keyField, keyFieldValue, finalParameter, message) {
        var NativeCallDataIn = {
            Operation: 'logMessage',
            Application: appNameIn,
            KeyField: keyField,
            KeyFieldValue: keyFieldValue,
            FinalParameter: finalParameter,
            AdditionalField1: message,
            AdditionalField2: '',
            AdditionalField3: '',
            CallbackIndex: '',
            CallbackMethod: '',
        };

        callLayerInterop.callLayerWithData(NativeCallDataIn);
    },
    getModel: function(modelId, callbackMethod, errorcallbackMethod, isModal) {
        try {
            if (!isModal) isModal = '';
            var NativeCallDataIn = {
                Operation: 'getModel',
                Application: isModal,
                KeyField: modelId,
                KeyFieldValue: '',
                FinalParameter: '',
                AdditionalField1: '',
                AdditionalField2: '',
                AdditionalField3: '',
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: 'sysproInterop.interopCallbackReceived',
            };

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod,
            };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getModel');
        }
    },
    setModel: function(modelId, widgetIn, callbackMethod, errorcallbackMethod) {
        try {
            var NativeCallDataIn = {
                Operation: 'setModel',
                Application: '',
                KeyField: modelId,
                KeyFieldValue: JSON.stringify(widgetIn),
                FinalParameter: '',
                AdditionalField1: '',
                AdditionalField2: '',
                AdditionalField3: '',
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: 'sysproInterop.interopCallbackReceived',
            };

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod,
            };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getModel');
        }
    },
    getNotificationsContent: function(callbackMethod, errorcallbackMethod) {
        try {
            var NativeCallDataIn = {
                Operation: 'getNotificationsContent',
                Application: '',
                KeyField: '',
                KeyFieldValue: '',
                FinalParameter: '',
                AdditionalField1: '',
                AdditionalField2: '',
                AdditionalField3: '',
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: 'sysproInterop.interopCallbackReceived',
            };

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod,
            };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getNotificationsContent');
        }
    },
    triggerModelChanged: function(modelFound) {
        try {
            sysproInterop.eventTrigged(
                JSON.stringify(modelFound),
                '',
                '',
                '',
                'modelChanged',
                function(eCurrent) {},
                function(eCurrent) {}
            );
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'triggerModelChanged');
        }
    },
    performPredictiveSearch: function(
        predictivesearch,
        searchvalue,
        callbackMethod,
        errorcallbackMethod,
        optionalIndex
    ) {
        try {
            if (!optionalIndex) optionalIndex = '0';
            var keyFieldData = '';
            if (
                sysproInterop.viewModel &&
                sysproInterop.viewModel.Fields &&
                sysproInterop.viewModel.Fields.SYSPROKeyData
            )
                keyFieldData = sysproInterop.viewModel.Fields.SYSPROKeyData;
            var NativeCallDataIn = {
                Operation: 'performPredictiveSearch',
                Application: optionalIndex,
                KeyField: predictivesearch,
                KeyFieldValue: searchvalue,
                FinalParameter: JSON.stringify(keyFieldData),
                AdditionalField1: '',
                AdditionalField2: '',
                AdditionalField3: '',
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: 'sysproInterop.interopCallbackReceived',
            };

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod,
            };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'performPredictiveSearch');
        }
    },
    getFileFromServer: function(filePath, callbackMethod, errorcallbackMethod) {
        sysproInterop.genericCall(
            'getFileFromServer',
            filePath,
            '',
            '',
            '',
            '',
            '',
            '',
            callbackMethod,
            errorcallbackMethod
        );
    },
    //SubType, ParentDisplayStyle, ParentBorderClass
    getHtmlFromModel: function(
        modelType,
        modelIn,
        callbackMethod,
        parentParameter1,
        parentParameter2,
        parentParameter3,
        parentParameter4,
        errorcallbackMethod,
        isPreview
    ) {
        try {
            var NativeCallDataIn = {
                Operation: 'getHtmlFromModel',
                Application: '',
                KeyField: modelType,
                KeyFieldValue: JSON.stringify(isPreview),
                FinalParameter: JSON.stringify(modelIn),
                AdditionalField1: JSON.stringify(parentParameter1),
                AdditionalField2: JSON.stringify(parentParameter2),
                AdditionalField3: JSON.stringify(parentParameter3),
                AdditionalField4: JSON.stringify(parentParameter4),
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: 'sysproInterop.interopCallbackReceived',
            };

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod,
            };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getHtmlFromModel');
        }
    },
    setAvailableFieldsInternal: function(dataIn) {
        try {
            console.log('setAvailableFieldsInternal: ' + dataIn);
            if (sysproInterop.setAvailableFields) {
                sysproInterop.setAvailableFields(JSON.parse(dataIn));
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'setAvailableFieldsInternal');
        }
    },
    getVisualBuilderLayout: function() {
        try {
            console.log('getVisualBuilderLayout');

            if (SYSPRO_VB) {
                //When SYPPRO requests the layout , it  is  to  save so make sure unsaved changes are reset here.
                sysproInterop.internalHistoryIndex = SYSPRO_VB.historyIndex;
                sysproInterop.internalHistoryChange = 0;
            }
            var CleanOffCanvasModels = {};
            //Now  Build the list of off  canvas layouts with the datasources parsed correctly.
            $.each(window.viewModel.OffCanvasLayouts, function(key, value) {
                if (value.Id) {
                    CleanOffCanvasModels['offcanvas-' + value.Id] = {
                        Id: value.Id,
                        OffCanvas: value.OffCanvas,
                        Title: value.Title,
                        Columns: value.Columns.data(),
                        MainToolbar: {
                            IsToolbarVisible: value.MainToolbar.IsToolbarVisible,
                            Columns: value.MainToolbar.Columns.data(),
                        },
                    };
                }
            });

            var columnContent = {
                MainToolbar: {
                    Columns: window.viewModel.toolbar.data(),
                },
                Columns: window.viewModel.dataSource.data(),
                OffCanvasLayouts: CleanOffCanvasModels,
            };
            return JSON.stringify(columnContent);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getVisualBuilderLayout');
        }
    },
    setVisualBuilderLayout: function(DataIn) {
        try {
            console.log('setVisualBuilderLayout');
            viewModel.dataSource.data(DataIn);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'setVisualBuilderLayout');
        }
    },
    //Mithal - Added Function to get Toolbar Values
    getToolbarValues: function(e) {
        try {
            console.log('getToolbarValues');

            if (sysproInterop.toolbarModel) return JSON.stringify(sysproInterop.toolbarModel.toJSON());
            else return '{}';
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getToolbarValues');
        }
    },
    getFormValues: function(e) {
        try {
            console.log('getFormValues');
            if (sysproInterop.viewModel) return JSON.stringify(sysproInterop.viewModel.toJSON());
            else return '{}';
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getFormValues');
        }
    },
    getInactivityTime: function(e) {
        return Date.now() - sysproInterop.lastActivityDateTime;
    },
    getUnsavedChanges: function(DataIn) {
        try {
            console.log('getUnsavedChanges');
            var ChangesToSave = 'false';
            //If the history index is different from the internal one or changes have been undone or redone then there are changes to save.
            if (
                (SYSPRO_VB && SYSPRO_VB.historyIndex !== sysproInterop.internalHistoryIndex) ||
                sysproInterop.internalHistoryChange !== 0
            ) {
                ChangesToSave = 'true';
            }
            return ChangesToSave;
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getUnsavedChanges');
        }
    },
    setFocus: function(DataIn) {
        try {
            //Default the window to set focus in to null
            var WindowToSetFocusIn = null; //sysproInterop.fullBindRequired

            var itemToFocus = null;
            //Next loop through modalWindowHolder and select the lowest one that is modal.
            for (var i = sysproInterop.modalWindowHolder.length - 1; i >= 0; i--) {
                if (sysproInterop.modalWindowHolder[i].NotModal === false) {
                    if (
                        sysproInterop.modalWindowHolder[i].Window &&
                        sysproInterop.modalWindowHolder[i].Window.element
                    ) {
                        WindowToSetFocusIn = sysproInterop.modalWindowHolder[i].Window.element;
                    }

                    break;
                }
            }
            //Escape the  .  in the jquery selector
            if (!DataIn || DataIn === ' ') {
                //If the field name given is blank or spaces (*Wopa COBOL Style*) set focus  to the first enabled vebview  field.
                //$(".syspro-focusable:not([disabled]):visible").first().focus();
                //$(".syspro-focusable:not([disabled]):visible").first().click();

                var lowestTopLeft = null;
                var lowestTopLeftElement = $('.syspro-focusable:not([disabled]):visible', WindowToSetFocusIn).first();
                $.each($('.syspro-focusable:not([disabled]):visible', WindowToSetFocusIn), function(index) {
                    if ($(this).offset()) {
                        if (!lowestTopLeft || $(this).offset().top + $(this).offset().left <= lowestTopLeft) {
                            lowestTopLeftElement = $(this);
                            lowestTopLeft = lowestTopLeftElement.offset().top + lowestTopLeftElement.offset().left;
                        }
                    }
                });
                lowestTopLeftElement.focus();
                //lowestTopLeftElement.prop("autofocus");
                //lowestTopLeftElement.click();
            } else {
                if (DataIn.indexOf('|NEXT') > 0) {
                    DataIn = DataIn.replace('|NEXT', '');

                    if ($('#' + DataIn.replace('.', '\\.'), WindowToSetFocusIn).offset()) {
                        var currPosTotal =
                            $('#' + DataIn.replace('.', '\\.'), WindowToSetFocusIn).offset().top +
                            $('#' + DataIn.replace('.', '\\.'), WindowToSetFocusIn).offset().left;
                        var lowestDifference = 100000;
                        $.each($('.syspro-focusable:not([disabled]):visible', WindowToSetFocusIn), function(index) {
                            //if its not the current one.
                            if (this.id !== DataIn) {
                                var itemDifference = $(this).offset().top + $(this).offset().left - currPosTotal;
                                //if the difference between the current item and the item given is positive and it's less than the previous lowest value then make it the current low.
                                if (itemDifference >= 0 && itemDifference < lowestDifference) {
                                    itemToFocus = $(this);
                                    lowestDifference = itemDifference;
                                }
                            }
                        });
                    } else {
                        console.log('SetFocus Failed  - Field not found ' + DataIn);
                    }
                    if (itemToFocus) {
                        console.log('Set focus next item found to be: ' + itemToFocus.attr('id'));
                    }
                } else {
                    itemToFocus = $('#' + DataIn.replace('.', '\\.'));
                }
                //Finally select the next field instead.
                if (itemToFocus) {
                    if (itemToFocus.hasClass('combobox')) {
                        itemToFocus = $('input.combobox', itemToFocus.closest('.form-group'));
                    }
                    itemToFocus.focus();
                }
                //$("#" + DataIn.replace(".", "\\.")).prop("autofocus");
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'setFocus');
        }
    },
    setFieldValue: function(DataIn) {
        try {
            //DataIN consists of:
            //ParentName, FieldName, PropertyName, Value
            if (DataIn.ParentName === 'Toolbar') {
                if (DataIn.PropertyName === 'Caption') {
                    $('.avanti-toolbar-button-caption', '#' + DataIn.ParentName + '\\.' + DataIn.FieldName).html(
                        DataIn.Value
                    );
                }
                if (sysproInterop.toolbarModel) {
                    if (sysproInterop.toolbarModel[DataIn.ParentName]) {
                        if (sysproInterop.toolbarModel[DataIn.ParentName][DataIn.FieldName]) {
                            if (sysproInterop.toolbarModel[DataIn.ParentName][DataIn.FieldName]) {
                                sysproInterop.toolbarModel[DataIn.ParentName][DataIn.FieldName].set(
                                    DataIn.PropertyName,
                                    DataIn.Value
                                );
                                sysproInterop.ignoreLastToolbarChange = true;
                                var dropdownContainer = $(
                                    '#' + DataIn.ParentName + '\\.' + DataIn.FieldName + '.dropdown-select'
                                );
                                if (dropdownContainer.length > 0) {
                                    if (
                                        dropdownContainer.find('option').length > 0 &&
                                        !(
                                            dropdownContainer.find('option').length === 1 &&
                                            dropdownContainer.find('option')[0].innerHTML === ''
                                        )
                                    ) {
                                        dropdownContainer.trigger('change');
                                    }
                                }

                                if ($('#' + DataIn.ParentName + '\\.' + DataIn.FieldName + '.combobox').length > 0) {
                                    $(
                                        '#' +
                                            DataIn.ParentName +
                                            '\\.' +
                                            DataIn.FieldName +
                                            '.combobox.combobox-initialized'
                                    ).combobox('refresh');
                                }
                            }
                        }
                    }
                } else {
                    sysproInterop.handleError(
                        'At least one full bind of the fields must be performed before the setting an individual field  can be performed.',
                        'setFieldValue'
                    );
                }
            } else {
                if (sysproInterop.viewModel) {
                    if (sysproInterop.viewModel[DataIn.ParentName]) {
                        if (sysproInterop.viewModel[DataIn.ParentName][DataIn.FieldName]) {
                            if (sysproInterop.viewModel[DataIn.ParentName][DataIn.FieldName]) {
                                sysproInterop.viewModel[DataIn.ParentName][DataIn.FieldName].set(
                                    DataIn.PropertyName,
                                    DataIn.Value
                                );
                            }
                        }
                    }
                } else {
                    sysproInterop.handleError(
                        'At least one full bind of the fields must be performed before the setting an individual field  can be performed.',
                        'setFieldValue'
                    );
                }
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'setFieldValue');
        }
    },
    setEnabled: function(DataIn) {
        try {
            //Loop  through field names and then set enabled/disabled  on them.
            var toEnable = DataIn.Enable;
            $.each(DataIn.FieldNames, function(index) {
                if (this.indexOf('Links.') === 0) {
                    //If its a link then handle it differently by looking for the KeyAction of the Link.
                    var keyAction = this.substr('Links.'.length);
                    var linkTag = $("*[data-keyaction='" + keyAction + "']");
                    if (!toEnable) {
                        linkTag.addClass('disabled');
                    } else {
                        linkTag.removeClass('disabled');
                    }
                } else {
                    var tagFound = $('#' + this.replace('.', '\\.'));
                    //Originally adding disabled setting disabled seemed to be triggering a change event but it is now inconsistent.
                    //I've tweaked it to now only trigger if the ttag in question has focus although it may cause other issues.
                    if (this.indexOf('Toolbar.') === 0) {
                        if (
                            tagFound.length > 0 &&
                            tagFound[0].tagName === 'INPUT' &&
                            tagFound.is(':focus') &&
                            tagFound[0].type !== 'checkbox'
                        ) {
                            sysproInterop.ignoreLastToolbarChange = true;
                        } else {
                            sysproInterop.ignoreLastToolbarChange = false;
                        }
                    }
                    //For the file browse, make sure the user can never input directly into the input even when set enabled is called.
                    if (!tagFound.hasClass('syspro-file-browse-input')) tagFound.prop('disabled', !toEnable);

                    if (tagFound.hasClass('syspro-toolbar-widget-button')) {
                        if (!toEnable) {
                            tagFound.closest('li').addClass('disabled');
                        } else {
                            tagFound.closest('li').removeClass('disabled');
                        }
                    }
                    if (tagFound.hasClass('gridButton')) {
                        if (!toEnable) {
                            tagFound.addClass('disabled');
                        } else {
                            tagFound.removeClass('disabled');
                        }
                    }
                    if ($('.syspro-browse-button-container', tagFound.closest('.form-group')).length > 0) {
                        if (!toEnable) {
                            $(
                                '.syspro-browse-button',
                                $('.syspro-browse-button-container', tagFound.closest('.form-group'))
                            ).addClass('disabled');
                        } else {
                            $(
                                '.syspro-browse-button',
                                $('.syspro-browse-button-container', tagFound.closest('.form-group'))
                            ).removeClass('disabled');
                        }
                    }

                    //.input-group-addon date-input
                    //Handle disabling of the date input button
                    if (tagFound.hasClass('date-input')) {
                        if (!toEnable) {
                            tagFound.siblings('.input-group-addon').addClass('disabled');
                        } else {
                            tagFound.siblings('.input-group-addon').removeClass('disabled');
                        }
                    }

                    if (tagFound.hasClass('syspro-browse-input')) {
                        if (!toEnable) {
                            tagFound.siblings('.input-group-btn').addClass('disabled');
                        } else {
                            tagFound.siblings('.input-group-btn').removeClass('disabled');
                        }
                    }
                    if (!toEnable) {
                        $('.syspro-hyperlink-button', tagFound.closest('.syspro-entry-content')).addClass('disabled');
                    } else
                        $('.syspro-hyperlink-button', tagFound.closest('.syspro-entry-content')).removeClass(
                            'disabled'
                        );

                    if (!toEnable) {
                        tagFound.closest('.form-group').addClass('disabled');
                    } else {
                        tagFound.closest('.form-group').removeClass('disabled');
                    }
                }
            });
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'setEnabled');
        }
    },
    setChecked: function(DataIn) {
        try {
            //Loop  through field names and then set enabled/disabled  on them.
            var toCheck = DataIn.Enable;
            $.each(DataIn.FieldNames, function(index) {
                var tagFound = $('#' + this.replace('.', '\\.'));

                if (toCheck) {
                    tagFound.addClass('avanti-checked');
                    tagFound.attr('checked', true);
                } else {
                    tagFound.removeClass('avanti-checked');
                    tagFound.attr('checked', null);
                }
            });
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'setChecked');
        }
    },
    getWidgetVisible: function(DataIn) {
        try {
            var IsVisibleReturn = '';
            //Loop  through field names and then return whether they are visible or not.
            $.each(DataIn.FieldNames, function(index) {
                var tagFound = $('#' + this.replace('.', '\\.'));
                if (tagFound.length === 0) {
                    //If no tag is found then look for a grid instead.
                    tagFound = $('*[data-sysprogridfieldname="' + this + '"]');
                }
                if (IsVisibleReturn) IsVisibleReturn = IsVisibleReturn + ',';
                var isVisible = 'false';
                if (tagFound.filter(':visible').length > 0) {
                    isVisible = 'true';
                }
                IsVisibleReturn = IsVisibleReturn + isVisible;
            });
            return IsVisibleReturn;
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getWidgetVisible');
        }
    },
    getGlobalValue: function(FieldName) {
        try {
            if (sysproInterop.currentUserSession) {
                if (sysproInterop.currentUserSession[FieldName]) {
                    return sysproInterop.currentUserSession[FieldName];
                }
            }
            if (sysproInterop.viewModel.Fields) {
                if (sysproInterop.viewModel.Fields.SYSPROKeyData) {
                    var valueFound = sysproInterop.viewModel.Fields.SYSPROKeyData.get(FieldName);
                    if (valueFound) return valueFound.Value;
                }
            }
            return '';
        } catch (ex) {
            return '';
        }
    },
    setFieldVisible: function(DataIn) {
        try {
            //Loop  through field names and hide or show them as required.
            var toShow = DataIn.Enable;
            $.each(DataIn.FieldNames, function(index) {
                var tagFound = $('#' + this.replace('.', '\\.'));
                if (
                    tagFound.length > 0 &&
                    (tagFound[0].tagName === 'INPUT' ||
                        tagFound[0].tagName === 'TEXTAREA' ||
                        tagFound[0].tagName === 'SELECT' ||
                        tagFound.hasClass('syspro-databound-radiobutton'))
                ) {
                    //If the tag found is an input then its form-group parent must be shown or hidden because it includes the label and other buttons etc.
                    tagFound = tagFound.closest('.form-group');
                }
                if (toShow) {
                    tagFound.show();
                } else {
                    tagFound.hide();
                }
            });
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'setFieldVisible');
        }
    },
    //Create a smart tag link button over text field if required. This is for SYSPRO behavior where an entry field is replace with a link to Edit Bins etc.
    createButtonOnEntryField: function(DataInObject) {
        try {
            $.each(DataInObject.FieldNames, function(index) {
                var DataIn = this;
                var FieldName = DataIn.replace('.', '\\.');
                var FieldNameUnsanitized = DataIn;
                var insertButton = false;
                var ButtonName = '';
                var DisableInput = false;
                var hideButton = false;
                if (DataIn.indexOf('|') > 0) {
                    insertButton = true;
                    FieldName = DataIn.split('|')[0].replace('.', '\\.');
                    FieldNameUnsanitized = DataIn.split('|')[0];
                    ButtonName = DataIn.split('|')[1];
                    if (DataIn.split('|').length > 2) {
                        DisableInput = true;
                    }
                    if (ButtonName === 'HIDE') {
                        //If a hide instruction is given then rather hide the button.
                        hideButton = true;
                    }
                }

                var existingNode = $('#' + FieldName);
                var dataValue = existingNode.val();
                var usingDataWidget = null;
                if (!dataValue) {
                    //If there is no data value find the form data widget which will have it.
                    if ($('.form-data-widget', existingNode).length > 0) {
                        usingDataWidget = $('.form-data-widget', existingNode);
                        dataValue = usingDataWidget.text();
                    } else if ($('.data-field-value', existingNode).length > 0) {
                        usingDataWidget = $('.data-field-value', existingNode);
                        dataValue = usingDataWidget.text();
                    } else {
                        //Otherwise there is not value bound here leave it as is.
                        dataValue = 'NOTFOUND';
                    }
                }
                var dataCaption = FieldNameUnsanitized;

                if (existingNode.length > 0) {
                    if (insertButton) {
                        if (existingNode.hasClass('syspro-button-created')) {
                            $.each(existingNode, function(index) {
                                var currentEntry = $(this);
                                if (hideButton) {
                                    if (currentEntry.siblings('a.btn-block').length > 0)
                                        currentEntry.siblings('a.btn-block').hide();
                                    else $('a.btn-block', currentEntry.closest('.syspro-entry-content')).hide();
                                } else {
                                    if (currentEntry.siblings('a.btn-block').length > 0)
                                        currentEntry.siblings('a.btn-block').show();
                                    else $('a.btn-block', currentEntry.closest('.syspro-entry-content')).show();
                                }
                            });
                        } else {
                            existingNode.closest('.syspro-entry-content').addClass('additional-input-button');
                            if (dataValue === 'NOTFOUND') {
                                dataValue = '';
                            }
                            // existingNode.after('<a class="input-group-addon hyperlink-button-adjacent"><a ref="#" onclick="sysproInterop.hyperlinkClicked(this)" data-fieldname="' + FieldNameUnsanitized + '" data-fieldcaption: "' + dataCaption + '" data-fieldvalue="' + dataValue + '">' + ButtonName + '</a></span>');
                            var aTagCreated =
                                '<a class="btn btn-default btn-block btn-sm" ref="#" onclick="sysproInterop.hyperlinkClicked(this)" data-fieldname="' +
                                FieldNameUnsanitized +
                                '" data-fieldcaption: "' +
                                dataCaption +
                                '" data-fieldvalue="' +
                                dataValue +
                                '">' +
                                ButtonName +
                                '</a>';

                            $.each(existingNode, function(index) {
                                var currentEntry = $(this);
                                if (currentEntry.siblings('.help-block').length === 0) {
                                    if (currentEntry.closest('.input-group').length > 0) {
                                        //From joe if there  is an input group then put it after that.
                                        currentEntry.closest('.input-group').after(aTagCreated);
                                    } else {
                                        if (currentEntry.closest('.checkbox').length > 0) {
                                            currentEntry.closest('.checkbox').after(aTagCreated);
                                        } else currentEntry.parent().append(aTagCreated);
                                    }
                                } else {
                                    //Joe has asked that the a tag come directly before any help block if there is one.
                                    currentEntry
                                        .siblings('.help-block')
                                        .first()
                                        .before(aTagCreated);
                                }
                            });
                            if (DisableInput) $('input', existingNode.closest('.syspro-entry-content')).hide();
                            existingNode.addClass('syspro-button-created');
                            //Now call Joe to resize the add on buttons.
                            SYSPRO_VB.sizeAddonButtons();
                        }
                    } else {
                        var itemAdded = null;

                        if (existingNode.hasClass('syspro-button-created')) {
                            if (dataValue !== 'NOTFOUND') {
                                $('a', existingNode).html(dataValue);

                                if ($('a', existingNode).length > 0 && $('a', existingNode)[0]) {
                                    $('a', existingNode)[0].setAttribute('data-fieldcaption', dataCaption);
                                    $('a', existingNode)[0].setAttribute('data-fieldvalue', dataValue);
                                    $('a', existingNode)[0].setAttribute('data-fieldname', DataIn);
                                }
                            }
                        } else {
                            if (dataValue === 'NOTFOUND') {
                                dataValue = '';
                            }
                            var nodeContent =
                                "<a ref='#' onclick='sysproInterop.hyperlinkClicked(this)' class='syspro-hyperlink-button' data-fieldname='" +
                                FieldNameUnsanitized +
                                "' data-fieldcaption: '" +
                                dataCaption +
                                "' data-fieldvalue='" +
                                dataValue +
                                "' data-bind='html: " +
                                FieldNameUnsanitized +
                                ".Value'>" +
                                dataValue +
                                '</a>';
                            var containerNode = existingNode.closest('.syspro-entry-content');
                            if (containerNode.length === 0) {
                                //If it's not in an entry form the treat it like a display form and a hyperlink to it.
                                if ($('.data-field-value', existingNode).length > 0) {
                                    $('.data-field-value', existingNode).after(nodeContent);
                                    itemAdded = $('.syspro-hyperlink-button', existingNode);
                                    $('.data-field-value', existingNode).hide();
                                } else if ($('.form-data-widget', existingNode).length > 0) {
                                    //If there isn;t an explicit value then it is a diplay field in an entry form so find the form data widget and add it after that.
                                    $('.form-data-widget', existingNode).after(nodeContent);
                                    itemAdded = $('.syspro-hyperlink-button', existingNode);
                                    $('.form-data-widget', existingNode).hide();
                                }
                            } else {
                                $('.help-block', containerNode).hide();
                                existingNode.hide();
                                $('.input-group-btn', containerNode).hide();
                                //Now bind the value of the button to the existing data source so that changes reflect in it.
                                itemAdded = containerNode.append(nodeContent);
                            }
                            existingNode.addClass('syspro-button-created');

                            //Make sure it is bound correctly and then rebind it.
                            if (usingDataWidget) existingNode = usingDataWidget;
                            if (existingNode[0].kendoBindingTarget)
                                kendo.bind(itemAdded, existingNode[0].kendoBindingTarget.source);
                        }
                    }
                }
            });
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'createButtonOnEntryField');
        }
    },
    showModalWindow: function(DataIn, usageCase) {
        try {
            var modalId = DataIn.ModalId;
            var sysproModalId = DataIn.SYSPROId;
            //if (sysproModalId && sysproModalId.indexOf("IMPTIM") === 0) {
            //    callLayerInterop.previousAvantiPlugin = callLayerInterop.avantiPluginLoaded;
            //    callLayerInterop.avantiPluginLoaded = "";
            //}
            //var modalHtml = '<div class="modal fade" id="' + modalId + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Modal title</h4>';
            //modalHtml = modalHtml + '</div><div class="modal-body">' + DataIn.ModalContent + '</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div>';
            var modalHtml = '';
            var divHolder = null;
            var modalHolder = null;
            if (DataIn.ModalType === 0) {
                modalHtml =
                    '<div id="' +
                    modalId +
                    '" data-syspromodalid="' +
                    sysproModalId +
                    '" class="modal-window-main"><div class="window-container"><div class="window-content">';
                modalHtml =
                    modalHtml +
                    DataIn.HtmlContent +
                    '</div></div><div class="statusBar sys-bg-inverse"><span class="status-message sys-fg-very-light-gray">This is a status message</span></div></div>';
                //TODO: Should it have  an id of wrapper,could  be confused with other ones built  in QueryLayoutBody.
                $('#wrapper').append($(modalHtml));

                //  $('#' + modalId).modal('show');
                sysproInterop.modalWindowId = modalId;

                var includeClose = null;
                if (DataIn.NotModal) {
                    //Include a close, maximize and minimize when it is not modal.
                    includeClose = ['Minimize', 'Maximize', 'Close'];
                    if (DataIn.NoClose) {
                        includeClose = ['Minimize', 'Maximize'];
                    }
                } else {
                    //Always include a close
                    includeClose = ['Close'];
                    if (DataIn.NoClose) {
                        includeClose = [];
                    }
                }

                modalHolder = SYSPRO_VB.createKendoWindow(
                    modalId,
                    DataIn.Title,
                    function(e) {
                        //Handle open event by adding class to window that contains long text items.

                        if ($('.special-text-notes', this.wrapper).length === 1) {
                            //.special-text-notes could even just be textarea for now.
                            $(this.wrapper).addClass('modal-with-special-text-notes');
                        }
                    },
                    function(e) {
                        var modalWindow = $(e.sender.element);
                        var kendoWindowInput = modalWindow.data('kendoWindow').options;
                        //The position given to SYSPRO is left|top|width|height
                        var topIn = kendoWindowInput.position.top;
                        var leftIn = kendoWindowInput.position.left;
                        var widthIn = kendoWindowInput.width;
                        var heightIn = kendoWindowInput.height;
                        //When the top or left is 50% then center then send through blank to Phil and when he sends blank through to center it.
                        if (isNaN(leftIn)) {
                            if (leftIn === '50%') leftIn = '';
                            else leftIn = leftIn.replace('px', '');
                        }
                        if (isNaN(topIn)) {
                            if (topIn === '50%') topIn = '';
                            else topIn = topIn.replace('px', '');
                        }
                        if (isNaN(widthIn)) {
                            widthIn = widthIn.replace('px', '');
                        }
                        if (isNaN(heightIn)) {
                            heightIn = heightIn.replace('px', '');
                        }
                        var windowClosed = true;
                        var positionCurrent = leftIn + ';' + topIn + ';' + widthIn + ';' + heightIn;
                        if (e.userTriggered) {
                            sysproInterop.isProgramaticClose = false;
                            sysproInterop.modalWindowClosed(modalWindow.data('syspromodalid'), positionCurrent);
                        }
                        if (!DataIn.NotModal) {
                            if (e.userTriggered) {
                                windowClosed = false;
                                e.preventDefault();
                            }
                        }
                        if (windowClosed && e.userTriggered) {
                            var indexRemoved = -1;
                            //Finally remove the window from the modal window holder
                            $.each(sysproInterop.modalWindowHolder, function(index) {
                                if (this.Id == modalWindow.data('syspromodalid')) {
                                    indexRemoved = index;
                                }
                            });
                            if (indexRemoved > -1) {
                                sysproInterop.modalWindowHolder.splice(indexRemoved, 1);
                            } else {
                                sysproInterop.modalWindowHolder.pop();
                            }
                        }
                        if (windowClosed) {
                            //Don't change binding behaviour if the window shown is the search window
                            if (usageCase !== 'SearchWindow') {
                                //When the window is actually closed then make sure it isn't used in binding anymore.
                                sysproInterop.fullBindRequired = null;
                            }
                        }
                        $('[id=loading-cover]').fadeOut();
                    },
                    includeClose,
                    DataIn.Width,
                    DataIn.Height,
                    DataIn.NotModal,
                    true,
                    true,
                    DataIn.Left,
                    DataIn.Top
                );
                if (!DataIn.Left && !DataIn.Top) {
                    modalHolder.center().open();
                } else {
                    modalHolder.open();
                }
                divHolder = modalHolder.element;
                if (usageCase !== 'SearchWindow') {
                    //Only set the binding context div  if it isn't in the search window because that doesnt  need binding directly.
                    sysproInterop.fullBindRequired = $('#' + modalId);
                }
            } else {
                var offCanvasClass = 'navbar-offcanvas-right';
                if (DataIn.ModalType === 2) {
                    offCanvasClass = 'navbar-offcanvas-bottom';
                }
                modalHtml =
                    '<div class="' +
                    offCanvasClass +
                    ' navbar-offcanvas navbar-offcanvas-touch is-open" id="offcanvas-' +
                    modalId +
                    '"><header class="offcanvas-header">';
                modalHtml = modalHtml + '<h4 class="pull-left sys-mg-t-10 sys-mg-b-5">' + DataIn.Title + '</h4>';

                modalHtml =
                    modalHtml +
                    '<span class="pull-right offcanvas-toggle sys-pd-t-10" data-toggle="offcanvas" data-target="#offcanvas-' +
                    modalId +
                    '">';
                if (!DataIn.NoClose) modalHtml = modalHtml + '<i class="material-icons">close</i></span>';
                modalHtml = modalHtml + '</header>';
                modalHtml = modalHtml + DataIn.HtmlContent;
                modalHtml = modalHtml + '</div>';
                $('#wrapper').append($(modalHtml));
                divHolder = $('[data-toggle="offcanvas"]', '#offcanvas-' + modalId);
                modalHolder = new Offcanvas($('[data-toggle="offcanvas"]', '#offcanvas-' + modalId));
                //modalHolder.on("close", function (e) {
                //    console.log("off canvas closed " + modalId);
                //});
                $('#offcanvas-' + modalId).on('hide.bs.offcanvas', function(e) {
                    if (!sysproInterop.isProgramaticClose) {
                        sysproInterop.modalWindowClosed(sysproModalId, '');
                    }
                    var windowClosed = true;
                    if (!DataIn.NotModal) {
                        if (!sysproInterop.isProgramaticClose) {
                            windowClosed = false;

                            return e.preventDefault();
                        }
                    }
                    if (windowClosed && !sysproInterop.isProgramaticClose) {
                        var indexRemoved = -1;
                        //Finally remove the window from the modal window holder
                        $.each(sysproInterop.modalWindowHolder, function(index) {
                            if (this.Id == modalWindow.data('syspromodalid')) {
                                indexRemoved = index;
                            }
                        });
                        if (indexRemoved > -1) {
                            sysproInterop.modalWindowHolder.splice(indexRemoved, 1);
                        } else {
                            sysproInterop.modalWindowHolder.pop();
                        }
                        queryLayoutUIHelpers.disposeViewOnly(modalId);
                    }
                    if (windowClosed) {
                        //When the window is actually closed then make sure it isn't used in binding anymore.
                        sysproInterop.fullBindRequired = null;
                    }
                    sysproInterop.isProgramaticClose = false;
                });
                $('.offcanvas-toggle', '#offcanvas-' + modalId).addClass('is-open');
                $('#offcanvas-' + modalId).addClass('in');
                if (DataIn.ModalType == 1) $('#offcanvas-' + modalId).css('height', '100%');
                // modalHolder = $("#offcanvas-" + modalId);
                //Don't change binding behaviour if the window shown is the search window
                if (usageCase !== 'SearchWindow') {
                    sysproInterop.fullBindRequired = $('#offcanvas-' + modalId);
                }
            }
            //Support multiple modal windows.
            sysproInterop.modalWindowHolder.push({
                Id: sysproModalId,
                Window: modalHolder,
                NotModal: DataIn.NotModal,
                ModalType: DataIn.ModalType,
            });

            //Try bind to popup div always (Not just when modal), the viewModal should still be the same.
            //If it is modal then only bind on the modal window.
            //Don't change binding behaviour if the window shown is the search window
            if (usageCase !== 'SearchWindow') {
                sysproInterop.bindOnCurrentDivPerformed = false;
                sysproInterop.bindOnCurrentToolbarPerformed = false;
            }
            queryLayoutUIHelpers.initializeViewOnly(null, divHolder, modalId);
            queryLayoutUIHelpers.initializeToolbarEvents();
            $('[id=loading-cover]').fadeOut();
            return modalId;
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'showModalWindow');
        }
    },
    openNewSYSPROInstance: function(DataIn) {
        try {
            window.open(
                window.location.href.replace('#', '') + '?SecondInstance=true&OpenParameters=' + DataIn,
                '_blank'
            );
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'openNewSYSPROInstance');
        }
    },
    undoCalled: function(DataIn) {
        try {
            console.log('undoCalled');
            sysproInterop.internalHistoryChange = sysproInterop.internalHistoryChange + 1;
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'undoCalled');
        }
    },
    redoCalled: function(DataIn) {
        try {
            console.log('redoCalled');
            sysproInterop.internalHistoryChange = sysproInterop.internalHistoryChange - 1;
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'redoCalled');
        }
    },
    ////TODO: This is not implemented in the native side, depends if Phil will Call in to update or Joe will request it.
    //getAvailableFields: function (modelType, modelIn, callbackMethod, parentParameter1, parentParameter2, parentParameter3) {
    //    var NativeCallDataIn = {
    //        Operation: "getAvailableFields",
    //        Application: "",
    //        KeyField: modelType,
    //        KeyFieldValue: "",
    //        FinalParameter: JSON.stringify(modelIn),
    //        AdditionalField1: JSON.stringify(parentParameter1),
    //        AdditionalField2: JSON.stringify(parentParameter2),
    //        AdditionalField3: JSON.stringify(parentParameter3),
    //        CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
    //        CallbackMethod: ""
    //    }

    //    sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = callbackMethod;
    //    while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse + 1]) {
    //        sysproInterop.threadedCallbackIndexToUse++;
    //    }
    //    callLayerInterop.callLayerWithData(NativeCallDataIn);

    //},
    getAvailableFields: function(callbackMethod, errorcallbackMethod, nocategories) {
        try {
            if (!nocategories) nocategories = 'false';
            else nocategories = 'true';

            var NativeCallDataIn = {
                Operation: 'getAvailableFields',
                Application: '',
                KeyField: nocategories,
                KeyFieldValue: '',
                FinalParameter: '',
                AdditionalField1: '',
                AdditionalField2: '',
                AdditionalField3: '',
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: 'sysproInterop.interopCallbackReceived',
            };

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod,
            };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getAvailableFields');
        }
    },
    queryForCard: function(cardType, businessObject, keyValue, keyData, callbackMethod, errorcallbackMethod) {
        try {
            var NativeCallDataIn = {
                Operation: 'queryForCard',
                Application: keyData,
                KeyField: cardType,
                KeyFieldValue: JSON.stringify(keyValue),
                FinalParameter: businessObject,
                AdditionalField1: '',
                AdditionalField2: '',
                AdditionalField3: '',
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: 'sysproInterop.interopCallbackReceived',
            };

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod,
            };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'queryForCard');
        }
    },
    interopCallbackReceived: function(e) {
        try {
            var itemOut = {};
            try {
                itemOut = JSON.parse(e.OutputData);
            } catch (ex) {
                itemOut.ErrorMessage = ex.message;
            }
            if (sysproInterop.threadedCallbacksLookup[e.CallbackIndex]) {
                if (!itemOut) {
                    itemOut = {};
                    itemOut.ErrorMessage = 'A blank reply was received from the call.';
                }
                if (itemOut.ErrorMessage) {
                    console.log('interopCallbackReceived ERROR MESSAGE- ' + itemOut.ErrorMessage);
                    //If it is an ErrorMessage then trigger the error callback instead.
                    if (sysproInterop.threadedCallbacksLookup[e.CallbackIndex].Error)
                        sysproInterop.threadedCallbacksLookup[e.CallbackIndex].Error(itemOut);
                } else {
                    // console.log("interopCallbackReceivedPreCall - " + JSON.stringify(sysproInterop.threadedCallbacksLookup[e.CallbackIndex]));
                    if (sysproInterop.threadedCallbacksLookup[e.CallbackIndex].Success)
                        sysproInterop.threadedCallbacksLookup[e.CallbackIndex].Success(itemOut);
                }
                sysproInterop.threadedCallbacksLookup[e.CallbackIndex] = null;
                sysproInterop.threadedCallbackIndexToUse = e.CallbackIndex;
            }
        } catch (ex) {
            console.log(
                'interopCallbackReceivedERROR - ' +
                    JSON.stringify(sysproInterop.threadedCallbacksLookup[e.CallbackIndex])
            );
            sysproInterop.handleError(ex.message, 'interopCallbackReceived');
        }
    },
    getStructureForBO: function(selectedBO, setKeyFieldValue, xmlIn, callbackMethod, errorcallbackMethod) {
        try {
            var NativeCallDataIn = {
                Operation: 'getStructureForBO',
                Application: '',
                KeyField: '',
                KeyFieldValue: '',
                FinalParameter: '',
                AdditionalField1: selectedBO,
                AdditionalField2: setKeyFieldValue,
                AdditionalField3: xmlIn,
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: 'sysproInterop.interopCallbackReceived',
            };

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod,
            };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getStructureForBO');
        }
    },
    //This is no longer used as all interop callbacks come from here.
    //eventTriggeredSuccess: function (e) {
    //    var itemOut = {};
    //    try {
    //        itemOut = JSON.parse(e.OutputData);
    //    } catch (ex) {
    //        itemOut.ErrorMessage = ex.message;
    //    }
    //    if (sysproInterop.threadedCallbacksLookup[e.CallbackIndex]) {
    //        if (itemOut.ErrorMessage) {
    //            //If it is an ErrorMessage then trigger the error callback instead.
    //            if (sysproInterop.threadedCallbacksLookup[e.CallbackIndex].Error)
    //                sysproInterop.threadedCallbacksLookup[e.CallbackIndex].Error(itemOut);
    //        } else {
    //            if (sysproInterop.threadedCallbacksLookup[e.CallbackIndex].Success)
    //                sysproInterop.threadedCallbacksLookup[e.CallbackIndex].Success(itemOut);
    //        }
    //        sysproInterop.threadedCallbacksLookup[e.CallbackIndex] = null;
    //        sysproInterop.threadedCallbackIndexToUse = e.CallbackIndex;
    //    }
    //},
    getIconsAvailable: function(callbackMethod, errorcallbackMethod) {
        try {
            sysproInterop.genericCall(
                'getIconsAvailable',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                callbackMethod,
                errorcallbackMethod
            );
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'getIconsAvailable');
        }
    },
    queryForTiles: function(
        listOfTiles,
        keyFieldData,
        businessObject,
        tileParameters,
        tileTypeNames,
        callbackMethod,
        errorcallbackMethod
    ) {
        try {
            sysproInterop.genericCall(
                'queryForTiles',
                JSON.stringify(listOfTiles),
                businessObject,
                JSON.stringify(keyFieldData),
                JSON.stringify(tileParameters),
                JSON.stringify(tileTypeNames),
                '',
                '',
                callbackMethod,
                errorcallbackMethod
            );
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'queryForTiles');
        }
    },
    callHarmonyService: function(callType, methodName, parametersIn, callbackMethod, errorcallbackMethod) {
        try {
            var parametersRaw;
            if (callType === 'GET') {
                parametersRaw = $.param(parametersIn);
            } else {
                parametersRaw = JSON.stringify(parametersIn);
            }
            //Next get the SYSPROKeyDataContext
            var AddtionalField1 = '';
            if (
                sysproInterop.viewModel &&
                sysproInterop.viewModel.Fields &&
                sysproInterop.viewModel.Fields.SYSPROKeyData
            ) {
                AddtionalField1 = JSON.stringify(sysproInterop.viewModel.Fields.SYSPROKeyData);
            }

            sysproInterop.genericCall(
                'callHarmonyService',
                '',
                callType,
                methodName,
                parametersRaw,
                AddtionalField1,
                '',
                '',
                callbackMethod,
                errorcallbackMethod
            );
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'callHarmonyService');
        }
    },
    selectImage: function(callbackMethod, errorcallbackMethod) {
        try {
            sysproInterop.genericCall('selectImage', '', '', '', '', '', '', '', callbackMethod, errorcallbackMethod);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'selectImage');
        }
    },
    selectFile: function(callbackMethod, errorcallbackMethod, fileTypes) {
        try {
            callLayerInterop.selectFile(callbackMethod, errorcallbackMethod, fileTypes);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'selectFile');
        }
    },
    openFile: function(callbackMethod, errorcallbackMethod, fileUrl, fileName, print) {
        try {
            callLayerInterop.openFile(callbackMethod, errorcallbackMethod, fileUrl, fileName, print);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'openFile');
        }
    },
    showDatePicker: function(dateIn) {
        try {
            var datepickerId = sysproInterop.generateUUID();
            var showLeft = dateIn.LocationX;
            if (!showLeft) {
                showLeft = sysproInterop.cursorX;
            }
            var showTop = dateIn.LocationY;
            if (!showTop) {
                showTop = sysproInterop.cursorY;
            }

            var parentContainer = $('#harness-container');
            if (sysproInterop.modalWindowHolder.length > 0) {
                parentContainer = sysproInterop.modalWindowHolder[0].Window.element;
                showTop = parseInt(showTop) - parentContainer.offset().top;
                showLeft = parseInt(showLeft) - parentContainer.offset().left;
            }
            showTop = parseInt(showTop) + 250;

            parentContainer.append(
                "<input id='testpickertemp" +
                    datepickerId +
                    "' style='position: absolute; left: " +
                    showLeft +
                    'px; top: ' +
                    showTop +
                    "px; z-index=10000; opacity: 0;'></input>"
            );
            $('#testpickertemp' + datepickerId)
                .datepicker('show')
                .on('changeDate', function(e) {
                    var formattedDate = kendo.toString(e.date, 'yyyy-MM-dd');

                    sysproInterop.eventTrigged(
                        dateIn.FieldName,
                        formattedDate,
                        '',
                        '',
                        'fieldChange',
                        function(eCurrent) {},
                        function(eCurrent) {}
                    );
                    $('#testpickertemp' + datepickerId).datepicker('destroy');
                    $('#testpickertemp' + datepickerId).remove();
                });
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'showDatePicker');
        }
    },
    callFromSYSPRO: function(callType, dataIn) {
        try {
            //console.log("callFromSYSPRO - " + callType);
            //These define any methods supported that can be called from SYSPRO.
            switch (callType) {
                case 'bindDataTo':
                    sysproInterop.bindDataTo(JSON.parse(dataIn));
                    break;
                case 'bindToolbar':
                    sysproInterop.bindToolbar(JSON.parse(dataIn));
                    break;
                case 'setAvailableFields':
                    sysproInterop.setAvailableFieldsInternal(JSON.parse(dataIn));
                    break;
                case 'getVisualBuilderLayout':
                    return sysproInterop.getVisualBuilderLayout();

                case 'setVisualBuilderLayout':
                    sysproInterop.setVisualBuilderLayout(JSON.parse(dataIn));

                    break;
                case 'getUnsavedChanges':
                    return sysproInterop.getUnsavedChanges();

                case 'setFocus':
                    return sysproInterop.setFocus(dataIn);

                case 'setFieldValue':
                    return sysproInterop.setFieldValue(JSON.parse(dataIn));

                case 'showModalWindow':
                    return sysproInterop.showModalWindow(JSON.parse(dataIn));

                case 'openNewSYSPROInstance':
                    return sysproInterop.openNewSYSPROInstance(dataIn);

                case 'setEnabled':
                    return sysproInterop.setEnabled(JSON.parse(dataIn));
                case 'showDatePicker':
                    return sysproInterop.showDatePicker(JSON.parse(dataIn));
                case 'setChecked':
                    return sysproInterop.setChecked(JSON.parse(dataIn));
                case 'setFieldVisible':
                    return sysproInterop.setFieldVisible(JSON.parse(dataIn));

                case 'createButtonOnEntryField':
                    return sysproInterop.createButtonOnEntryField(JSON.parse(dataIn));

                case 'createGridList':
                    return sysproInterop.createGridList(JSON.parse(dataIn));
                case 'refreshGridList':
                    return sysproInterop.refreshGridList(JSON.parse(dataIn));
                case 'gridRequestInternalEvent':
                    return sysproInterop.gridRequestInternalEvent(JSON.parse(dataIn));
                case 'createTreeList':
                    return sysproInterop.createTreeList(JSON.parse(dataIn));
                case 'refreshTreeList':
                    return sysproInterop.refreshTreeList(JSON.parse(dataIn));
                case 'treeRequestInternalEvent':
                    return sysproInterop.treeRequestInternalEvent(JSON.parse(dataIn));
                case 'createTreeView':
                    return sysproInterop.createTreeView(JSON.parse(dataIn));
                case 'treeViewRequestInternalEvent':
                    return sysproInterop.treeViewRequestInternalEvent(JSON.parse(dataIn));
                case 'showPopupDialog':
                    return sysproInterop.showPopupDialog(JSON.parse(dataIn));
                case 'closeModalWindow':
                    return sysproInterop.closeModalWindow(dataIn);
                case 'setModalWindowTitle':
                    return sysproInterop.setModalWindowTitle(dataIn);
                case 'showTaskDialog':
                    return sysproInterop.showTaskDialog(JSON.parse(dataIn));
                case 'showContextMenu':
                    return sysproInterop.showContextMenu(JSON.parse(dataIn));
                case 'toggleLoadingScreen':
                    return sysproInterop.toggleLoadingScreen(JSON.parse(dataIn));
                case 'setStatusMessage':
                    return sysproInterop.setStatusMessage(JSON.parse(dataIn));
                case 'getFormValues':
                    return sysproInterop.getFormValues();
                case 'getToolbarValues':
                    return sysproInterop.getToolbarValues();
                case 'getInactivityTime':
                    return sysproInterop.getInactivityTime();
                case 'showError':
                    var message = dataIn.split('|')[0];
                    var title = dataIn.split('|')[1];

                    return sysproInterop.showErrorMessage(message, title);
                case 'openFile':
                    return sysproInterop.openFile(
                        null,
                        function(ex2) {
                            sysproInterop.handleError(ex2.message, 'openFile');
                        },
                        JSON.parse(dataIn),
                        JSON.parse(dataIn)
                    );
                case 'printFile':
                    return sysproInterop.openFile(
                        null,
                        function(ex2) {
                            sysproInterop.handleError(ex2.message, 'openFile');
                        },
                        JSON.parse(dataIn),
                        JSON.parse(dataIn),
                        true
                    );
                case 'getWidgetVisible':
                    return sysproInterop.getWidgetVisible(JSON.parse(dataIn));
                case 'signOutAvanti':
                    return sysproInterop.closeSYSPROFusion(true);
                case 'selectFile':
                    return sysproInterop.selectFileInternal(dataIn);
                case 'clearPluginLoaded':
                    //console.log("clearing plugin loaded");
                    //Clears the current plugin loaded. This is generally when the plugin in question returns false on handling a method.
                    //if (callLayerInterop.avantiPluginLoaded)
                    callLayerInterop.previousAvantiPlugin = callLayerInterop.avantiPluginLoaded;
                    callLayerInterop.avantiPluginLoaded = '';

                    break;
                case 'closeBrowserTab':
                    return sysproInterop.closeBrowserTab();
                case 'sendNotification':
                    sysproInterop.sendNotification(JSON.parse(dataIn));
                    break;
                case 'executeScript':
                    eval(dataIn);
                    break;
                default:
            }
        } catch (ex) {
            console.log('callFromSYSPRO Error - ' + ex.message);
            sysproInterop.handleError(ex.message, 'callFromSYSPRO');
        }
    },

    showPopup: function(text) {
        alert(text);
    },

    handleError: function(error, parentMethod) {
        if (sysproInterop.errorHandler === 'Popup')
            //This just alerts errors  for  easy debugging.
            sysproInterop.showPopup('Error: ' + parentMethod + ' - ' + error);
        else if (sysproInterop.errorHandler === 'Log') console.log('Error: ' + parentMethod + ' - ' + error);
        else if (sysproInterop.errorHandler === 'Internal') {
            //This should set an html element to show it inline.
            var fullErrorMessage =
                "Sorry, something has gone wrong when trying to  '" +
                parentMethod +
                "'. The technical error message is:";
            if (parentMethod === 'CleanError') {
                //TODO: In the future we could adjust this to show a warning or info message instead of an error.
                if (error && error.indexOf('ERROR: ') == 0) error = error.substring(7);

                fullErrorMessage = error;
                error = '';
            }
            sysproInterop.showErrorMessage(error, fullErrorMessage);
        }
    },

    bindDataTo: function(dataModelIn) {
        try {
            //console.log("bindDataTo");
            sysproInterop.hideErrorMessage();
            //alert("bindDataTo");
            if (sysproInterop.bindingStarted) {
                sysproInterop.bindingStarted(dataModelIn);
            }

            var itemOut = {};
            try {
                //need to change these to replace all not just one
                dataModelIn.DataIn = dataModelIn.DataIn.replace(/\n/g, '\\n')
                    .replace(/\r/g, '\\r')
                    .replace(/\t/g, '\\t')
                    .replace(/\f/g, '\\f');

                itemOut = JSON.parse(dataModelIn.DataIn);
            } catch (ex) {
                itemOut.ErrorMessage = ex.message;
            }
            var performFullBind = false;
            if (!sysproInterop.bindOnCurrentDivPerformed) {
                performFullBind = true;
            }

            //A Full Bind option is required for cases like show modal where new elements have been added and need to be bound again.
            sysproInterop.performBind(itemOut, performFullBind, null, sysproInterop.fullBindRequired);

            //Don't Reset the Full Bind Property
            //sysproInterop.fullBindRequired = null;
            if (sysproInterop.bindingCompleted) {
                sysproInterop.bindingCompleted(itemOut);
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'bindDataTo');
        }
    },
    performBind: function(itemIn, fullBind, prefixSelector, selectorItem, callback, clearBoundModel) {
        try {
            //console.log("performBind");
            if (!prefixSelector) {
                prefixSelector = '';
            }
            //alert("bindDataTo");
            //Next set the kendo  environment settings
            if (kendo && kendo.culture()) {
                kendo.culture().numberFormat['.'] = sysproInterop.decimalCharacter;
                kendo.culture().numberFormat[','] = sysproInterop.thousandSeperator;
            }
            var itemOut = itemIn;
            if (itemOut && !itemOut.ErrorMessage) {
                //Need to find off canvas windows outside of selector item to do a bind on as well.
                if (selectorItem) {
                    var parentId = $('.container-id-holder', selectorItem).data('containerid');
                    if (parentId) {
                        selectorItem = $.merge(selectorItem, $("*[data-parentwindowid='" + parentId + "']"));
                    }
                }
                //For now all the bind does set a label value.
                //Will be expanded to use Kendo binding

                var BoundItemDiv = $(
                    prefixSelector +
                        ' .sys-widget:not(.card-widget,.harmony-widget,.tile-widget,.tile-inner,.syspro-toolbar,.tiles-parent,.syspro-nonbound)',
                    selectorItem
                );

                if (sysproInterop.viewModel) {
                    //Just in case fields is not given then go through Parents
                    if (itemOut.Fields) {
                        $.each(itemOut.Fields, function(key, value) {
                            // console.log("performBind - " + key);
                            if (key !== 'SYSPROKeyData') {
                                sysproInterop.viewModel.Fields.set(key, this);
                                //If the value specified is blank and it is for a dropdown then set the value to bank manually in the visable input.
                                if ($('#Fields\\.' + key).hasClass('dropdown-select')) {
                                    var inputfield = $('input.fakeinput', $('#Fields\\.' + key).next('.dropdownjs'));
                                    if (this && this.Value === '') {
                                        //setting the value doesn't work because it is overridden so instead set it to white color and backup the old one.
                                        if (!inputfield.data('backupcolor'))
                                            inputfield.data('backupcolor', inputfield.css('color'));
                                        inputfield.css('color', 'white');
                                    } else {
                                        if (inputfield.data('backupcolor')) {
                                            inputfield.css('color', inputfield.data('backupcolor'));
                                        }
                                    }
                                }
                            }
                        });

                        //alert(JSON.stringify(itemOut.Fields.SYSPROKeyData));
                        //    alert(itemOut.Fields.SYSPROKeyData.length);
                        if (itemOut.Fields.SYSPROKeyData) {
                            if (!sysproInterop.viewModel.Fields.SYSPROKeyData) {
                                sysproInterop.viewModel.Fields.set('SYSPROKeyData', {});
                            }
                            $.each(itemOut.Fields.SYSPROKeyData, function(key2, value2) {
                                //

                                sysproInterop.viewModel.Fields.SYSPROKeyData.set(key2, value2);
                            });
                        }
                    } else {
                        //This  is  legacy and should  not  happen.
                        //  alert("This  is  legacy and should  not  happen");
                        $.each(itemOut, function(key, value) {
                            // console.log("performBind - " + key);
                            sysproInterop.viewModel.set(key, this);
                        });
                    }
                } else {
                    fullBind = true;
                    clearBoundModel = true;
                }

                if (fullBind) {
                    //console.log("Full Bind");
                    if (clearBoundModel) sysproInterop.viewModel = kendo.observable(itemOut);
                    //console.log("Full Bind 0");
                    //Only if BoundItemDiv is currently in the document
                    if (jQuery.contains(document.documentElement, BoundItemDiv[0])) {
                        kendo.bind(BoundItemDiv, sysproInterop.viewModel);
                        $.each(itemOut.Fields, function(key, value) {
                            if ($('#Fields\\.' + key).hasClass('dropdown-select')) {
                                sysproInterop.viewModel.Fields.set(key, this);
                                //If the value specified is blank and it is for a dropdown then set the value to bank manually in the visable input.

                                var inputfield = $('input.fakeinput', $('#Fields\\.' + key).next('.dropdownjs'));
                                if (this && this.Value === '') {
                                    //setting the value doesn't work because it is overridden so instead set it to white color and backup the old one.
                                    if (!inputfield.data('backupcolor'))
                                        inputfield.data('backupcolor', inputfield.css('color'));
                                    inputfield.css('color', 'white');
                                } else {
                                    if (inputfield.data('backupcolor')) {
                                        inputfield.css('color', inputfield.data('backupcolor'));
                                    }
                                }
                            }
                        });
                        //console.log("Full Bind 1");
                        //this  happens the very first time.
                        fullBind = true;
                        sysproInterop.bindOnCurrentDivPerformed = true;
                    }
                }

                //Next force a change on dropdowns to select the correct item
                //$(".dropdown-select", BoundItemDiv).val($(".dropdown-select", BoundItemDiv).val());
                //$("select.dropdown-select", BoundItemDiv).init();
                //After a data bind, process all chharts, hiding any series that are blank.
                //$(prefixSelector + " .sparkline-widget", selectorItem).each(function (index) {
                //    console.log("-------------------------------hideShowSparklineSeries from bind");
                //    sysproInterop.hideShowSparklineSeries($(".sparkline-widget-chart", $(this)));
                //});

                //Finally bind any cards in the screen
                if (itemOut.SYSPROKeyData || itemOut.Fields.SYSPROKeyData || itemOut.Fields.SYSPROKeyData === '') {
                    //Only bind the cards if the SYSPRO Key Data is given because it has changed.
                    //console.log("Binding Cards");
                    //Cards should be updated everywhere even if not modal so removed selectorItem.
                    $.each($(prefixSelector + ' .card-bindable:not(.harmony-widget,.tile-widget)'), function(index) {
                        //console.log("card-bindable: " + index);
                        sysproInterop.bindGenericCard($(this), itemOut.Fields.SYSPROKeyData);
                    });
                    if (sysproInterop.harmonyEnabled) {
                        $.each($(prefixSelector + ' .harmony-widget', selectorItem), function(index) {
                            //console.log("harmony-widget: " + index);
                            //Call harmonyInterop
                            HarmonyInterop.bindWidget($(this), itemOut.Fields.SYSPROKeyData);
                        });
                    }
                    //Next Bind any tile widgets
                    sysproInterop.bindTiles(itemOut, selectorItem, prefixSelector, fullBind);
                }
            } else {
                if (!itemOut) {
                    //console.log("performBind ignored because of blank input data.");
                } else {
                    sysproInterop.handleError(itemOut.ErrorMessage, 'performBind');
                }
            }

            sysproInterop.subscribeToFieldEvents();
            if (callback) callback(true, 'Bind performed successfully.');
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'performBind');
            if (callback) callback(false, ex.message);
        }
    },
    bindToolbar: function(dataModelIn, fullBind, clearBoundModel) {
        try {
            //console.log("bindToolbar");

            //sysproInterop.hideErrorMessage();

            var itemOut = {};
            try {
                itemOut = JSON.parse(dataModelIn.DataIn);
            } catch (ex) {
                itemOut.ErrorMessage = ex.message;
            }

            var toolbarDiv = $('.syspro-toolbar');
            if (sysproInterop.fullBindRequired) {
                toolbarDiv = $('.syspro-toolbar', sysproInterop.fullBindRequired);
            } else {
                toolbarDiv = $('.syspro-toolbar');
            }
            if (!sysproInterop.bindOnCurrentToolbarPerformed) {
                fullBind = true;
            }
            if (sysproInterop.toolbarModel && sysproInterop.toolbarModel.Toolbar) {
                //Just in case fields is not given then go through Parents
                if (itemOut.Toolbar) {
                    $.each(itemOut.Toolbar, function(key, value) {
                        sysproInterop.toolbarModel.Toolbar.set(key, this);
                    });
                } else {
                    //This  is  legacy and should  not  happen.
                    alert('This  is  legacy and should  not  happen');
                    $.each(itemOut, function(key, value) {
                        // console.log("performBind - " + key);
                        sysproInterop.toolbarModel.set(key, this);
                    });
                }
            } else {
                fullBind = true;
                clearBoundModel = true;
            }

            if (fullBind) {
                //console.log("Full Toolbar Bind");
                if (clearBoundModel) sysproInterop.toolbarModel = kendo.observable(itemOut);
                //console.log("Full Toolbar Bind 0");
                //Only call bind if the toolbarDiv is in the document.
                if (jQuery.contains(document.documentElement, toolbarDiv[0])) {
                    kendo.bind(toolbarDiv, sysproInterop.toolbarModel);
                }
                //  console.log(JSON.stringify(sysproInterop.toolbarModel.Toolbar.ACTION30005));
                //console.log("Full Toolbar Bind 1");

                sysproInterop.bindOnCurrentToolbarPerformed = true;
            }

            $('select.combobox.combobox-initialized').combobox('refresh');
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'bindToolbar');
        }
    },
    bindGenericCard: function(cardDiv, dataChanged) {
        try {
            //console.log("bindGenericCard");

            //  var boundCardDiv = $("#carddatabind_" + modelId);

            //console.log("boundCardDiv - " + cardDiv.closest(".layout-widget").siblings("span").html());
            var cardWidgetHolder = cardDiv.closest('.card-widget');
            var cardType = cardWidgetHolder.data('cardtype');
            var cardTypeDetail = cardWidgetHolder.data('cardtypedetail');
            var parentFieldPath = cardWidgetHolder.data('parentfieldpath');
            var bindfunctionname = cardWidgetHolder.data('bindfunctionname');
            var afterbindfunctionname = cardWidgetHolder.data('afterbindfunctionname');
            var businessobject = cardWidgetHolder.data('businessobject');
            var keyFieldName = cardTypeDetail;
            var cardkeyvalue = '';
            //Only perform  a query for the card if the value  has changed.
            //TODO:  This needs  to rather check the keyfield after  SYSPROKeyData and bind to that.
            //console.log("bindGenericCard 01: " + parentFieldPath);
            if (parentFieldPath) {
                var cardkeyHolder = sysproInterop.viewModel.toJSON();

                var splitFields = parentFieldPath.split('.');
                var previousValue = keyFieldName;
                $.each(splitFields, function(index) {
                    // console.log("splitFields - " + this);
                    var valueStr = this + '';
                    if (cardkeyHolder) {
                        if (cardkeyHolder[valueStr]) {
                            cardkeyHolder = cardkeyHolder[valueStr];
                            //Always use the second last value as  the keyfield
                            keyFieldName = previousValue;
                        } else {
                            cardkeyHolder = null;
                        }
                    }
                    previousValue = valueStr;
                });

                cardkeyvalue = cardkeyHolder;

                //console.log("keyFieldName - " + keyFieldName);
                //console.log("cardkeyvalue - " + cardkeyvalue);
            }
            if (dataChanged[keyFieldName]) {
                //console.log("bindGenericCard 02: " + dataChanged[keyFieldName]);

                //Perform prebind function before any BO call is performed.
                if (bindfunctionname) {
                    if (window[bindfunctionname]) {
                        //TODO: Is this the best way to execute a Function existing in the HTML?
                        window[bindfunctionname](cardType, cardTypeDetail, cardkeyvalue);
                    }
                }
                //Only bind the card if it has a key value or it is a dashboard so parentFieldPath is blank  or contains insights.

                if (
                    cardkeyvalue ||
                    !parentFieldPath ||
                    parentFieldPath.indexOf('Insights') > -1 ||
                    parentFieldPath.indexOf('Internal') > -1
                ) {
                    //Only call a BO query if there is a BO to call
                    if (businessobject) {
                        //Pass through SYSPRO Key Data as well
                        var keyData = '';
                        if (
                            sysproInterop.viewModel &&
                            sysproInterop.viewModel.Fields &&
                            sysproInterop.viewModel.Fields.SYSPROKeyData
                        ) {
                            keyData = JSON.stringify(sysproInterop.viewModel.Fields.SYSPROKeyData);
                        }
                        sysproInterop.queryForCard(
                            cardType,
                            cardTypeDetail,
                            cardkeyvalue,
                            keyData,
                            function(result) {
                                try {
                                    //console.log("bindGenericCard 03: " + result);
                                    //Only call bind if the cardDiv is in the document.
                                    if (jQuery.contains(document.documentElement, cardDiv[0])) {
                                        var boundCard = kendo.observable(result);

                                        kendo.bind(cardDiv, boundCard);
                                        //This initailizes event handlers for expandable cards.
                                        queryLayoutUIHelpers.initializeExpandableCards(cardDiv[0]);
                                        //perform post bind after bo call.
                                        if (afterbindfunctionname) {
                                            if (window[afterbindfunctionname]) {
                                                //TODO: Is this the best way to execute a Function existing in the HTML?
                                                window[afterbindfunctionname](
                                                    cardType,
                                                    cardTypeDetail,
                                                    cardkeyvalue,
                                                    result
                                                );
                                            }
                                        }
                                    }
                                } catch (ex) {
                                    sysproInterop.handleError(ex.message, 'bindGenericCard binding callback');
                                }
                            },
                            function(result) {
                                try {
                                    //If the query for the card fails with an error message processed then it can be outputted  as a clean error.
                                    sysproInterop.handleError(result.ErrorMessage, 'CleanError');
                                } catch (ex) {
                                    sysproInterop.handleError(ex.message);
                                }
                            }
                        );
                    }
                }
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'bindGenericCard ');
        }
    },
    bindTiles: function(itemOut, selectorItem, prefixSelector, fullBind) {
        //First Populate a list of all tiles in use.
        var listOfTiles = [];
        var listOfTileParameters = {};
        var listOfTilesTypes = {};
        var listOfMLTiles = [];
        var listOfMLTileParameters = {};
        var listOfMLTilesTypes = {};

        var oneTileFound = false;
        $.each($(prefixSelector + ' .tile:visible', selectorItem), function(index) {
            var tileTypeName = this.getAttribute('data-tiletypename');
            var tileName = this.getAttribute('data-tiletypedetail');
            var parentfieldpath = this.getAttribute('data-parentfieldpath');
            var tileType = this.getAttribute('data-tiletype');
            oneTileFound = true;
            //TODO: Pass through parameters  for tiles
            var tileparameters = this.getAttribute('data-tileparameters');
            var KeyValue = null;

            //Only add it  if it  doesn't  exist and it isn't a program
            if (tileType !== 'Program' && tileName && listOfTiles.indexOf(tileName) === -1) {
                if (parentfieldpath) {
                    //First check if the key  field  for the tile has a value
                    KeyValue = itemOut.Fields.SYSPROKeyData[parentfieldpath];
                }

                //Now check that the tile has a key value or a fullbind was called or it doesn't have a parentfieldpath (It's doesn't require  a key)
                //Or if it doesn't have a KeyValue but it's parentfieldpath does  appear in the tile parameters (it has a preconfigured value) then also bind it.

                if (
                    KeyValue ||
                    KeyValue === '' ||
                    !parentfieldpath ||
                    fullBind ||
                    (!KeyValue &&
                        parentfieldpath &&
                        tileparameters &&
                        tileparameters.indexOf('"' + parentfieldpath + '"') > -1)
                ) {
                    var stillBind = true;
                    if (
                        !KeyValue &&
                        parentfieldpath &&
                        tileparameters &&
                        tileparameters.indexOf('"' + parentfieldpath + '"') > -1
                    ) {
                        try {
                            var parametersManual = JSON.parse(tileparameters);
                            if (!parametersManual[parentfieldpath]) {
                                stillBind = false;
                            }
                        } catch (e) {
                            stillBind = false;
                        }

                        //If it has never been bound before then do one anyway.
                        if (!this.getAttribute('data-boundonce')) {
                            stillBind = true;
                        }
                    }
                    if (!parentfieldpath) {
                        //If it doesn't have a parent field path lets assume it only needs to be bound once so try that?
                        if (this.getAttribute('data-boundonce')) {
                            stillBind = false;
                        }
                    }

                    //Now Binding for ML Tiles should only occur if any property in the current KeyData exists in the current Parameter set.
                    if (tileType && tileType.indexOf('ML') === 0) {
                        $.each(itemOut.Fields.SYSPROKeyData, function(key, value) {
                            if (key && tileparameters && tileparameters.indexOf('"' + key + '"') > -1) {
                                stillBind = true;
                            }
                        });
                    }

                    this.setAttribute('data-boundonce', 'true');

                    if (stillBind) {
                        if (tileType && tileType.indexOf('ML') === 0) {
                            listOfMLTiles.push(tileName);
                            listOfMLTilesTypes[tileName] = tileTypeName;
                            listOfMLTileParameters[tileName] = tileparameters;
                        } else {
                            // alert(tileparameters + "," + KeyValue);

                            listOfTiles.push(tileName);
                            listOfTilesTypes[tileName] = tileTypeName;
                            listOfTileParameters[tileName] = tileparameters;
                        }
                        //console.log("tile found to  bind with value" + tileName);
                        //If we are binding with this tile then show the loading piece.
                        $('.tile-loading-cover', $(this)).show();
                    }
                }
            }
        });

        var regularTilesBound = sysproInterop.performTileDataBind(
            listOfTiles,
            itemOut,
            listOfTileParameters,
            listOfTilesTypes,
            'COMQTL',
            prefixSelector,
            selectorItem
        );
        var mlTilesBound = sysproInterop.performTileDataBind(
            listOfMLTiles,
            itemOut,
            listOfMLTileParameters,
            listOfMLTilesTypes,
            'SYSPROML',
            prefixSelector,
            selectorItem
        );
        if (!regularTilesBound && !mlTilesBound) {
            //Only if no tiles of any type were bound
            if (oneTileFound) {
                //If at least one tile was found but none required binding then resize it anyway.
                sysproInterop.sizeTiles(0);
            }
        }
    },
    performTileDataBind: function(
        listOfTiles,
        itemOut,
        listOfTileParameters,
        listOfTilesTypes,
        businessObject,
        prefixSelector,
        selectorItem
    ) {
        //console.log("Bind Tiles Query:");
        // console.log(listOfTiles);
        //Only try query for tiles, if there  is  at least one item to query.
        if (listOfTiles.length > 0) {
            //Pass through SYSPRO Key Data as well
            var keyData = {};
            if (
                sysproInterop.viewModel &&
                sysproInterop.viewModel.Fields &&
                sysproInterop.viewModel.Fields.SYSPROKeyData
            ) {
                keyData = sysproInterop.viewModel.Fields.SYSPROKeyData.toJSON();
            }

            //Now call  the interop with the list of tiles   to get the data.
            sysproInterop.queryForTiles(
                listOfTiles,
                keyData,
                businessObject,
                listOfTileParameters,
                listOfTilesTypes,
                function(result) {
                    if (result.Query) {
                        $.each(result.Query, function(index2) {
                            //If the given value is not an array, we have a problem with Kendo Chart Binding so convert it to one.
                            if (this.Type === 'Chart_Bullet' && !$.isArray(this.Value)) {
                                this.Value = [this.Value];
                            }
                        });
                    }
                    //console.log("tile data: " + JSON.stringify(result));
                    //Call bind of the tiles
                    var TilesInput = kendo.observable(result);
                    //Now Loop  through all tile-widget's  and bind the master widget to  it.
                    $.each($(prefixSelector + ' .tile:visible', selectorItem), function(index) {
                        //Only bind individual tiles because this is the data returned for them specifically. (So it doesn't clear other ones)
                        if (listOfTiles.indexOf(this.getAttribute('data-tiletypedetail')) >= 0) {
                            //console.log("tile-widget: " + index);

                            //Only if this is currently in the document
                            if (jQuery.contains(document.documentElement, this)) {
                                kendo.bind($(this), TilesInput);
                            }
                            //If it has been bound then hide the loading piece.
                            $('.tile-loading-cover', $(this)).hide();
                        }
                    });
                    console.log(
                        '---------------------------------------------------------------------resizeSparklines Tiles'
                    );
                    //Tiles can have charts so do  a hide  show with them.
                    sysproInterop.resizeSparklines($(prefixSelector + ' .tile:visible', selectorItem));
                    sysproInterop.sizeTiles(0);
                },
                function(result) {
                    try {
                        $.each($(prefixSelector + ' .tile:visible', selectorItem), function(index) {
                            if (listOfTiles.indexOf(this.getAttribute('data-tiletypedetail')) >= 0) {
                                //If there was an unexpected error then hide the loading indicator.
                                $('.tile-loading-cover', $(this)).hide();
                                $('.tile-title:contains("Loading...")', $(this)).text('Load failed');
                            }
                        });
                        //If the query for the card fails with an error message processed then it can be outputted  as a clean error.
                        sysproInterop.handleError(result.ErrorMessage, 'CleanError');
                    } catch (ex) {
                        sysproInterop.handleError(ex.message);
                    }
                }
            );
            return true;
        } else {
            return false;
        }
    },
    sizeTiles: function(delay, prefix) {
        $('.tile-widget').each(function(index) {
            var tileWidget = $(this);

            if (
                SYSPRO_VB.tileWidgets &&
                $(this).closest('.draggable-row-section').length > 0 &&
                SYSPRO_VB.tileWidgets[
                    $(this)
                        .closest('.draggable-row-section')
                        .data('guid')
                ]
            )
                SYSPRO_VB.tileWidgets[
                    $(this)
                        .closest('.draggable-row-section')
                        .data('guid')
                ].packery('layout');

            //tileWidget.parents('.tile-widget-wrapper').find('.tile-loading-cover').hide();
        });
        $.each(queryLayoutUIHelpers.tilesCreated, function(index) {
            $(this).packery('layout');
        });
    },

    // Callback function for calling sizeTiles from performBind callback
    sizeTilesCallback: function(no_error, msg) {
        if (no_error) {
            sysproInterop.sizeTiles();
        } else {
            sysproInterop.showErrorMessage(msg);
        }
    },

    initiateExistingTiles: function() {
        $('.tile-widget').each(function(i) {
            $(this)
                .parents('.layout-widget')
                .find('.data-section')
                .removeClass('data-section');
            $(this)
                .parents('.layout-widget')
                .children('.col-sm-12')
                .addClass('tile-widget-wrapper');
            $(this)
                .parents('.layout-widget')
                .find('.panel-body')
                .first()
                .prepend(
                    '<div class="tile-loading-cover"><div class="loader"><div class="square" ></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square"></div><div class="square last"></div><div class="square clear"></div><div class="square "></div><div class="square last"></div></div></div>'
                );
            //if ($(this).parents('.layout-widget').data("guid")) {
            //    var tileWidget = viewModel.dataSource.get($(this).parents('.layout-widget').data("guid"));
            //    SYSPRO_VB.initiateTiles(tileWidget);
            //}
        });
    },
    resizeSparklines: function(container) {
        try {
            console.log('resizeSparklines');
            $.each($('.sparkline-widget-chart:visible', container), function(index) {
                var chartSelected = $(this);

                if (chartSelected.data('kendoChart')) {
                    var chartItem = chartSelected.data('kendoChart');

                    var width = chartSelected.parent().width(),
                        stepSize = 1;

                    if (width <= 80) {
                        stepSize = 8;
                        displayLegend = false;
                    } else if (width <= 160) {
                        stepSize = 4;
                    } else if (width <= 320) {
                        stepSize = 2;
                    }

                    chartItem.setOptions({
                        categoryAxis: { labels: { step: stepSize } },
                    });

                    //  kendo.resize($(this));
                    console.log('-------------------------------hideShowSparklineSeries from resizeSparklines');
                    sysproInterop.hideShowSparklineSeries(chartSelected, chartItem);
                }
            });
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'resizeSparklines');
        }
    },
    //Process and redraw sparklines to make  sure  the series are  shown and  hidden correctly. (If  series seem squashhed  or  blank series  are  shown then the bug is in here!)
    hideShowSparklineSeries: function(sparklineContainer, chart) {
        try {
            var refreshrequired = true;
            console.log('hideShowSparklineSeries');

            if (sparklineContainer && sparklineContainer.length > 0) {
                if (!chart) {
                    refreshrequired = false;
                    //sparklineContainer = $(".sparkline-widget-chart", $(sparklineContainer));
                    chart = sparklineContainer.data('kendoChart');
                }
                if (!chart) {
                    //If no chart is  initialized yet then try initialize  it.
                    kendo.bind(sparklineContainer.closest('.layout-widget'), sysproInterop.viewModel);
                    chart = sparklineContainer.data('kendoChart');
                }
                if (chart) {
                    if (sparklineContainer.closest('.sparkline-widget').length > 0) {
                        // console.log(chart);
                        //If  it has  a parent sparkline  widget then it has visibility options that need  to be set up.
                        //Now get the databound visibility of the series and the names and set  them because Kendo does not  support doing this dynamically.
                        var sparklineWidget = sparklineContainer.closest('.sparkline-widget')[0];

                        var series1visible = sparklineWidget.getAttribute('data-series1visible') === 'true';
                        var series2visible = sparklineWidget.getAttribute('data-series2visible') === 'true';
                        var series3visible = sparklineWidget.getAttribute('data-series3visible') === 'true';
                        var series4visible = sparklineWidget.getAttribute('data-series4visible') === 'true';
                        var series1name = sparklineWidget.getAttribute('data-series1name');
                        var series2name = sparklineWidget.getAttribute('data-series2name');
                        var series3name = sparklineWidget.getAttribute('data-series3name');
                        var series4name = sparklineWidget.getAttribute('data-series4name');

                        if (chart.options.series[0])
                            (chart.options.series[0].visible = series1visible),
                                (chart.options.series[0].visibleInLegend = series1visible);
                        if (chart.options.series[1])
                            (chart.options.series[1].visible = series2visible),
                                (chart.options.series[1].visibleInLegend = series2visible);
                        if (chart.options.series[2])
                            (chart.options.series[2].visible = series3visible),
                                (chart.options.series[2].visibleInLegend = series3visible);
                        if (chart.options.series[3])
                            (chart.options.series[3].visible = series4visible),
                                (chart.options.series[3].visibleInLegend = series4visible);
                        if (chart.options.series[0].type === 'rangeBar') {
                            var max = 10;
                            $.each(chart.dataSource.data(), function(index) {
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
                        //Only change the chart name if series1name has  a value.
                        if (
                            series1name &&
                            series1name !== undefined &&
                            series1name !== 'undefined' &&
                            chart.options.series[0]
                        )
                            chart.options.series[0].caption = series1name;
                        if (
                            series2name &&
                            series2name !== undefined &&
                            series2name !== 'undefined' &&
                            chart.options.series[1]
                        )
                            chart.options.series[1].caption = series2name;
                        if (
                            series3name &&
                            series3name !== undefined &&
                            series3name !== 'undefined' &&
                            chart.options.series[2]
                        )
                            chart.options.series[2].caption = series3name;
                        if (
                            series4name &&
                            series4name !== undefined &&
                            series4name !== 'undefined' &&
                            chart.options.series[3]
                        )
                            chart.options.series[3].caption = series4name;

                        if (sparklineWidget.getAttribute('data-charttitlevisible') === 'true')
                            chart.options.title.visible = true;
                        else chart.options.title.visible = false;
                        chart.options.title.text = sparklineWidget.getAttribute('data-charttitletext');
                        if (sparklineWidget.getAttribute('data-chartxaxistitle')) {
                            chart.options.categoryAxis.title.text = sparklineWidget.getAttribute(
                                'data-chartxaxistitle'
                            );
                            //chartxaxistitle
                        }
                        if (sparklineWidget.getAttribute('data-chartyaxistitle')) {
                            chart.options.valueAxis.title.text = sparklineWidget.getAttribute('data-chartyaxistitle');
                            //chartxaxistitle
                        }
                    }
                    //Next check if the sparkline  is  in tile layout and if so set the height accordingly.
                    var tileParent = sparklineContainer.closest('.tile-widget');

                    if (tileParent.length > 0) {
                        var proposedHeight = tileParent.find('.tile-width-marker').width() - 10;
                        chart.options.chartArea.height = proposedHeight;
                        console.log('Chart Height set to - ' + proposedHeight);
                    }
                    if (refreshrequired) {
                        chart.refresh();
                    } else {
                        chart.redraw();
                    }
                }
            }
        } catch (ex) {
            console.log('hideShowSparklineSeries error - ' + ex.message);
            //sysproInterop.handleError(ex.message, "hideShowSparklineSeries");
        }
    },

    sparklineSeriesClick: function(e) {
        try {
            sysproInterop.eventTrigged(
                e.series.name,
                e.series.data.indexOf(e.dataItem),
                e.value,
                '',
                'sparklineSeriesClick',
                function(e) {},
                function(e) {}
            );
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'sparklineSeriesClick');
        }
    },

    iconSelected: function(e) {
        try {
            sysproInterop.eventTrigged(e.Name, e.Description, '', '', 'iconSelected', function(e) {}, function(e) {});
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'iconSelected');
        }
    },
    clipboardCommandCalled: function(commandName) {
        try {
            sysproInterop.eventTrigged(
                commandName,
                '',
                '',
                '',
                'clipboardCommandCalled',
                function(e) {},
                function(e) {}
            );
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'clipboardCommandCalled');
        }
    },
    createKendoBinders: function() {
        kendo.data.binders.tilecolor = kendo.data.Binder.extend({
            //This creates a simple binder for html where if the text does have a value then dont replace it with null
            refresh: function() {
                var that = this,
                    value = that.bindings['tilecolor'].get();
                if (value) {
                    $(that.element).closest('.tile-inner')[0].style.backgroundColor = value;
                    var classtobackup = '';
                    $.each($(that.element).closest('.tile-inner')[0].classList, function(index) {
                        if (this.indexOf('sys-bg-') === 0) {
                            classtobackup = this;
                        }
                    });
                    if (classtobackup) {
                        //Find and remove any background color classes which override things
                        $(that.element)
                            .closest('.tile-inner')[0]
                            .classList.remove(classtobackup);
                        $(that.element)
                            .closest('.tile-inner')[0]
                            .setAttribute('data-previoustilecolor', classtobackup);
                    }
                } else {
                    //If the color bound is blank then add on the previous color class.
                    if (
                        $(that.element)
                            .closest('.tile-inner')[0]
                            .getAttribute('data-previoustilecolor')
                    )
                        $(that.element)
                            .closest('.tile-inner')[0]
                            .classList.add(
                                $(that.element)
                                    .closest('.tile-inner')[0]
                                    .getAttribute('data-previoustilecolor')
                            );
                }
            },
        });
        kendo.data.binders.tileiconcolor = kendo.data.Binder.extend({
            //This creates a simple binder for icons color  in tiles  where  the value is backed up so it can be reset to  what it was.
            refresh: function() {
                var that = this,
                    value = that.bindings['tileiconcolor'].get();
                if (value) {
                    //First back up  the previous  icon color and then use  the new  one.
                    if (!that.element.getAttribute('previoustileiconcolor')) {
                        that.element.setAttribute('previoustileiconcolor', $(that.element).css('color'));
                    }
                    $(that.element).css('color', value);
                } else {
                    //If this changes to null or blank  then use  the previous  icon color backed  up.
                    var tileiconin = that.element.getAttribute('previoustileiconcolor');
                    if (tileiconin) $(that.element).css('color', tileiconin);
                }
            },
        });
        kendo.data.binders.tileicon = kendo.data.Binder.extend({
            //This creates a simple binder for icons  in tiles  where  the value is backed up so it can be reset to  what it was.
            refresh: function() {
                var that = this,
                    value = that.bindings['tileicon'].get();
                if (value) {
                    //First back up  the previous  icon and then use  the new  one.
                    if (!that.element.getAttribute('previoustileicon')) {
                        that.element.setAttribute('previoustileicon', $(that.element).html());
                    }
                    $(that.element).html(value);
                } else {
                    //If this changes to null or blank  then use  the previous  icon backed  up.
                    var tileiconin = that.element.getAttribute('previoustileicon');
                    if (tileiconin) $(that.element).html(tileiconin);
                }
            },
        });
        kendo.data.binders.htmltextnonull = kendo.data.Binder.extend({
            //This creates a simple binder for html where if the text does have a value then dont replace it with null
            refresh: function() {
                var that = this,
                    value = that.bindings['htmltextnonull'].get();
                if (value) {
                    $(that.element).html(value);
                }
            },
        });
        kendo.data.binders.htmltext = kendo.data.Binder.extend({
            //This creates a simple binder for html in cards  so that blank values are displayed as a blank string instead of "null"
            refresh: function() {
                var that = this,
                    value = that.bindings['htmltext'].get();
                if (!value) value = '';
                if ($(that.element).hasClass('syspro-entryfield-description')) {
                    if (value.trim() === '') {
                        $(that.element).removeClass('always-show');
                    } else {
                        $(that.element).addClass('always-show');
                        //
                        $(that.element)
                            .prev('.syspro-entryfield-tooltip')
                            .remove();
                    }
                }
                if ($(that.element).hasClass('syspro-help-block')) {
                    //Finally check for any blank help blocks and hide them.

                    var currentDiv = $(that.element);
                    if (value.trim().length === 0) {
                        currentDiv.addClass('disabled-help-block');
                        currentDiv.removeClass('always-show');
                    } else {
                        currentDiv.removeClass('disabled-help-block');
                        currentDiv.addClass('always-show');
                    }
                }

                $(that.element).html(value);
            },
        });
        kendo.data.binders.inputmask = kendo.data.Binder.extend({
            //This creates a binder for input masks for numerics and then other types like unit quantity processing.
            refresh: function() {
                var that = this,
                    value = that.bindings['inputmask'].get();
                if (!value) value = '';
                if ($(that.element).hasClass('syspro-numeric-input')) {
                    if (value) {
                        //Backup the numeric masking if required
                        if (that.element.getAttribute('data-inputmask') && !sysproInterop.numericMasking)
                            sysproInterop.numericMasking = that.element.getAttribute('data-inputmask');
                        //Clear  numeric  stuff
                        that.element.setAttribute('data-inputmask', '');
                        //Set the other masking
                        that.element.setAttribute('data-inputmask-mask', value);
                        that.element.setAttribute('data-inputmask-greedy', 'false');
                        that.element.setAttribute('data-inputmask-insertmode', 'false');
                        that.element.setAttribute('data-inputmask-allowminus', 'true');
                        that.element.setAttribute('data-inputmask-escapechar', sysproInterop.inputMaskEscapeChar);
                        //data-inputmask-greedy="false" data-inputmask-escapechar="@ViewBag.InputMaskEscapeChar"
                    } else {
                        //if the inputmask is given then revert to the numeric input mask
                        if (!that.element.getAttribute('data-inputmask')) {
                            //reset the  numeric  stuff
                            that.element.setAttribute('data-inputmask', sysproInterop.numericMasking);
                            //Clear the other masking
                            that.element.removeAttribute('data-inputmask-mask');
                            that.element.removeAttribute('data-inputmask-greedy');
                            that.element.removeAttribute('data-inputmask-insertmode');

                            that.element.removeAttribute('data-inputmask-allowminus');
                            that.element.removeAttribute('data-inputmask-escapechar');
                        }
                    }
                } else {
                    that.element.setAttribute('data-inputmask-mask', value);
                }
                //if (!(that.element.disabled))
                //{
                //When the input mask bind is triggered it has changed so tear it down and reinitialize
                if ($(that.element).inputmask) {
                    $(that.element).inputmask('remove');
                }
                //if it has a different binding value or it's numeric then it must be recreated.
                if (value || $(that.element).hasClass('syspro-numeric-input')) {
                    //Whenever the data bound changes, the input mask may have  changed and so it must be reinitialized.
                    Inputmask().mask(that.element);
                    //If there is any masking then select all of the field when it is set focus to:
                    $(that.element).focus(function(e) {
                        setTimeout(function() {
                            $(that.element).select();
                        }, 10);
                    });
                }
                //}
            },
        });
        //entryfieldevents
        kendo.data.binders.entryfieldevents = kendo.data.Binder.extend({
            //This creates a simple binder for html in cards  so that blank values are displayed as a blank string instead of "null"
            refresh: function() {
                var that = this,
                    value = that.bindings['entryfieldevents'].get();
                if (!value) value = '';

                that.element.setAttribute('data-entryfieldevents', value);
            },
        });

        kendo.data.binders.decimals = kendo.data.Binder.extend({
            //This creates a simple binder for decimal compulsary values for  the input mask  on numbers.
            refresh: function() {
                var that = this,
                    value = that.bindings['decimals'].get();

                if (value && value !== 0 && value !== '0') {
                    that.element.setAttribute('data-inputmask-digits', value);
                    that.element.setAttribute('data-inputmask-digitsOptional', false);
                } else {
                    that.element.setAttribute('data-inputmask-digitsOptional', true);
                }
            },
        });

        kendo.data.binders.datevalue = kendo.data.Binder.extend({
            //This creates a simple binder for date values to format them to the date format.
            refresh: function() {
                var that = this,
                    value = that.bindings['datevalue'].get();

                if (value) {
                    //Parse the date from the standard SYSPRO format of yyyy-MM-dd
                    var dateValue = kendo.parseDate(value, 'yyyy-MM-dd');
                    sysproInterop.autoDateChange = true;
                    //And to string it to the dateFormat from getSYSPROInfo
                    // that.element.value = kendo.toString(dateValue, sysproInterop.dateFormat);
                    // if ($(that.element).datepicker()) {
                    $(that.element)
                        .closest('.date')
                        .datepicker('setDate', dateValue);
                    // $(that.element).datepicker("setDate", dateValue);
                    // }
                }
            },
        });
        //kendo.data.binders.griddatevalue = kendo.data.Binder.extend({

        //    init: function (element, bindings, options) {
        //        var that = element;
        //        if (that && !that.getAttribute("data-dateinit")) {
        //            that.setAttribute("data-dateinit", "true");

        //            //dataholderfordate
        //            //$(that).prev(".dataholderfordate").val(bindings["griddatevalue"].get());
        //            $(that).next(".date").datepicker({
        //                format: that.getAttribute("data-date-format-in").toLowerCase(),
        //                //{
        //                //    toDisplay: function (date, format, language) {
        //                //        var strOut = kendo.toString(date, that.element.getAttribute("data-date-format-out"));
        //                //        that.element.value = strOut;
        //                //        return strOut;
        //                //    },
        //                //    toValue: function (date, format, language) {
        //                //        var dateOut = kendo.parseDate(date, that.element.getAttribute("data-date-format-in"));
        //                //        return dateOut;
        //                //    }

        //                //},
        //                maxViewMode: 2,
        //                todayBtn: true,
        //                autoclose: true,
        //                todayHighlight: true,
        //                zIndexOffset: 99999
        //            });
        //        }

        //        //$(that.element).closest(".date").datepicker().on("changeDate", function (e) {
        //        //    this.setAttribute("griddatevalue", kendo.toString(date, this.getAttribute("data-date-format-out")));
        //        //});

        //    },
        //    //This creates a simple binder for date values to format them to the date format.
        //    refresh: function () {

        //        //change: function (element) {
        //        //    var value = this.element.value;
        //        //    //this.bindings["griddatevalue"].set(value); //update the View-Model
        //        //}
        //    }
        //});
        kendo.data.binders.ignorethousandseperators = kendo.data.Binder.extend({
            //This creates a simple binder for decimal compulsary values for  the input mask  on numbers.
            refresh: function() {
                var that = this,
                    value = that.bindings['ignorethousandseperators'].get();

                if (value) {
                    that.element.setAttribute('data-inputmask-groupSeparator', '');
                } else {
                    that.element.setAttribute(
                        'data-inputmask-groupSeparator',
                        that.element.getAttribute('data-groupseparator')
                    );
                }
            },
        });
        kendo.data.binders.predictivesearch = kendo.data.Binder.extend({
            //This creates a simple binder for decimal compulsary values for  the input mask  on numbers.
            refresh: function() {
                var that = this,
                    value = that.bindings['predictivesearch'].get();

                if (value && value !== 'ignore') {
                    //Initialize a specific predictive seach on an input specified.
                    sysproInterop.initializePredictiveSearch($(that.element), value);
                }
            },
        });
        kendo.data.binders.comboboxvalue = kendo.data.Binder.extend({
            //This creates a simple binder for combo box values when blank
            refresh: function() {
                var that = this,
                    value = that.bindings['comboboxvalue'].get();

                if (!value) {
                    $('input.combobox', $(that.element).closest('.form-group')).val('');
                } else {
                    //Now if it's in a form then set the input manually in case the select doesn't have the value.
                    if (that.element && that.element.classList.contains('syspro-combobox-inform')) {
                        //first check if it has options and if it does check if it's a valid option in which case don't set the input because it will automatically.
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
                            $('input.combobox', $(that.element).closest('.form-group')).val(value);
                        }
                    }
                }
            },
        });
        kendo.data.binders.entryvalue = kendo.data.Binder.extend({
            init: function(element, bindings, options) {
                //call the base constructor
                kendo.data.Binder.fn.init.call(this, element, bindings, options);

                var that = this;
                //listen for the change event of the element
                $(that.element).on('change', function() {
                    that.change(); //call the change function
                });
            },
            //This creates a simple binder for decimal compulsary values for  the input mask  on numbers.
            refresh: function() {
                var that = this,
                    value = that.bindings['entryvalue'].get();

                if (value) {
                    var decodedValue = $('<textarea/>')
                        .html(value)
                        .text();
                    that.element.value = decodedValue;
                } else {
                    that.element.value = '';
                }
            },
            change: function() {
                var value = this.element.value;
                this.bindings['entryvalue'].set(value); //update the View-Model
            },
        });

        kendo.data.binders.includebuttons = kendo.data.Binder.extend({
            //creates a binder that hides and shows buttons in a richtext widget.
            refresh: function() {
                var that = this,
                    value = that.bindings['includebuttons'].get();
                var richtextwidget = $(that.element);
                if (value !== undefined) {
                    if (value && value.indexOf('save') > -1) {
                        $('.syspro-richtext-save-button', richtextwidget).show();
                    } else {
                        $('.syspro-richtext-save-button', richtextwidget).hide();
                    }
                    if (value && value.indexOf('refresh') > -1) {
                        $('.syspro-richtext-refresh-button', richtextwidget).show();
                    } else {
                        $('.syspro-richtext-refresh-button', richtextwidget).hide();
                    }
                }
            },
        });
        kendo.data.binders.isreadonlyrichtext = kendo.data.Binder.extend({
            //creates a binder that hides and shows buttons in a richtext widget.
            refresh: function() {
                var that = this,
                    value = that.bindings['isreadonlyrichtext'].get();
                if (value !== undefined) {
                    {
                        if (!value || value === 'false') value = null;
                        var richtextwidget = $(that.element);
                        if (value) {
                            //if it hasn't been initialized yet then mark it for disabling on startup otherwise disable as usual.
                            if (!$('.avanti-richtextwidget-textholder', richtextwidget).data('kendoEditor')) {
                                $('.avanti-richtextwidget-textholder', richtextwidget).data(
                                    'disableoninitialize',
                                    'true'
                                );
                            } else {
                                $('.avanti-richtextwidget-textholder', richtextwidget).attr('disabled', 'disabled');
                                $('.avanti-richtextwidget-textholder', richtextwidget).attr('contenteditable', 'false');
                                $('.syspro-richtext-insertdate-button', richtextwidget).addClass('disabled');
                                $('.syspro-richtext-refresh-button', richtextwidget).addClass('disabled');
                                $('.syspro-richtext-save-button', richtextwidget).addClass('disabled');
                            }
                        } else {
                            $('.avanti-richtextwidget-textholder', richtextwidget).removeAttr('disabled');
                            $('.avanti-richtextwidget-textholder', richtextwidget).attr('contenteditable', 'true');
                            $('.syspro-richtext-insertdate-button', richtextwidget).removeClass('disabled');
                            $('.syspro-richtext-refresh-button', richtextwidget).removeClass('disabled');
                            $('.syspro-richtext-save-button', richtextwidget).removeClass('disabled');
                        }
                    }
                }
            },
        });
    },

    //Check if the field is a KeyField(With predictive search and if so update SYSPROKeyData and bind cards)
    updateSYSPROKeyDataFromElementChange: function(elementIn, valueIn) {
        if (elementIn.hasClass('predictive-search-initialized')) {
            var predictiveSearchKeyField = elementIn.data('predictivesearch');
            if (predictiveSearchKeyField && valueIn && sysproInterop.viewModel && sysproInterop.viewModel.Fields) {
                if (!sysproInterop.viewModel.Fields.SYSPROKeyData[predictiveSearchKeyField]) {
                    //if the field is not in KeyData then add it in.
                    sysproInterop.viewModel.Fields.SYSPROKeyData[predictiveSearchKeyField] = {};
                }
                sysproInterop.viewModel.Fields.SYSPROKeyData[predictiveSearchKeyField].Value = valueIn;
                //No need to do a bind because SYSPRO will and the value may be invalid.
                //sysproInterop.bindDataTo();
            }
        }
    },
    initializePredictiveSearch: function(elementIn, predictiveSearchGiven) {
        try {
            elementIn.data('predictivesearch', predictiveSearchGiven);
            var predictivesearchName = predictiveSearchGiven;
            var predictivesearchElement = elementIn;
            if (!elementIn.hasClass('predictive-search-initialized')) {
                //If it's in standalone browser mode then show the browse button which for browsing in Fusion mode.
                $('.syspro-browse-button-container', $(elementIn).closest('.form-group')).show();

                elementIn.addClass('predictive-search-initialized');

                elementIn.textcomplete(
                    [
                        {
                            //Rexexp: \B matches at any position between two word characters as well as at any position between two non-word characters
                            match: /(.+)$/, //MUST be a RegExp or a Function which returns a RegExp MUST contain capturing groups and SHOULD end with $
                            //The searchFunc MUST be a Function which gets two arguments, term and callback
                            search: function(term, callback) {
                                //The word captured by indexNumber-th group is going to be the term argument
                                if (!term || (term && term.trim() === '')) {
                                    //If the searchh field is  blank then just return empty to  close the predictive search.
                                    callback([]);
                                    return;
                                }
                                if (sysproInterop.predictiveSearchCache[term])
                                    callback(sysproInterop.predictiveSearchCache[term]);
                                console.log('search performed: ' + term);
                                //Call the interop function to get predictive search items
                                // if (!sysproInterop.typingInterval) {
                                // sysproInterop.typingInterval = true;
                                if (sysproInterop.typingElement !== predictivesearchElement) {
                                    console.log('Setting sysproInterop.typingOperation new typing ele false');
                                    sysproInterop.typingOperation = false;
                                    console.log('TP: ' + sysproInterop.typingOperation);
                                }
                                sysproInterop.typingElement = predictivesearchElement;
                                var indexSelected = '0';
                                if (predictivesearchElement && predictivesearchElement.length > 0)
                                    indexSelected = predictivesearchElement[0].selectionStart;
                                console.log('Index in Predictive Search: ' + predictivesearchElement[0].selectionStart);
                                //if (sysproInterop.typingOperation)
                                //sysproInterop.typingOperation = false;
                                sysproInterop.performPredictiveSearch(
                                    predictivesearchName,
                                    term,
                                    function(result) {
                                        // console.log("performPredictiveSearch out - "+result);
                                        // sysproInterop.typingInterval = false;
                                        sysproInterop.predictiveSearchCache[term] = result;
                                        console.log('Showing results: ' + sysproInterop.typingOperation);
                                        if (
                                            (sysproInterop.typingElement &&
                                                !sysproInterop.typingElement.is(':focus')) ||
                                            sysproInterop.typingOperation
                                        ) {
                                            //If the element doesn't have focus anymore then clear out the results because we don't want it popping up anymore.
                                            result = [];
                                        }
                                        if (elementIn && elementIn.length > 0 && document.contains(elementIn[0])) {
                                            callback(result);
                                        } else {
                                            if (elementIn) {
                                                callback([]);
                                            }
                                        }
                                    },
                                    function(e) {
                                        sysproInterop.typingInterval = false;
                                        sysproInterop.showErrorMessage(
                                            e.ErrorMessage,
                                            'Error performing predictive search'
                                        );
                                        callback([]);
                                    },
                                    indexSelected
                                );

                                // }
                            },

                            index: 1,
                            template: function(rootItem) {
                                setTimeout(function() {
                                    var setupActivate = function() {
                                        sysproInterop.predictiveSearchActive = true;
                                    };
                                    var setupDeactivate = function() {
                                        sysproInterop.predictiveSearchActive = false;
                                    };
                                    $('.syspro-predictivesearch-container').off('mouseenter', setupActivate);
                                    $('.syspro-predictivesearch-container').on('mouseenter', setupActivate);
                                    $('.syspro-predictivesearch-container').off('mouseleave', setupDeactivate);
                                    $('.syspro-predictivesearch-container').on('mouseleave', setupDeactivate);
                                }, 500);

                                var templateTest = WebView_Predictive_Search_Template(rootItem);
                                return templateTest;
                            },
                            //The replaceFunc MUST be a Function which returns a String, an Array of two Strings or undefined.
                            //It is invoked when a user will click and select an item of autocomplete dropdown.
                            //If undefined is returned from a replaceFunc, textcomplete does not replace the text.
                            replace: function(rootItem) {
                                //for gl codes use the full code in AdditionalField1 if  it has been set (Probably need to check if structured GL is enabled)
                                //Disable any GL code based functionality
                                //if (rootItem.AdditionalField1 && predictivesearchName === "GLCode") {
                                //return rootItem.AdditionalField1;
                                //}
                                if (sysproInterop.predictiveSearchActive) {
                                    return rootItem.Id;
                                } else {
                                    return;
                                }
                            },
                        },
                    ],
                    {
                        cache: true,
                        height: 200,
                        maxCount: 200,
                        debounce: 200,
                        zIndex: 100000,
                        dropdownClassName: 'dropdown-menu textcomplete-dropdown syspro-field-search-dropdown',
                        onKeydown: function(e, commands) {
                            console.log('predictive Search onKeydown: ' + e.keyCode);
                            // `commands` has `KEY_UP`, `KEY_DOWN`, `KEY_ENTER`, `KEY_PAGEUP`, `KEY_PAGEDOWN`,
                            // `KEY_ESCAPE` and `SKIP_DEFAULT`.
                            if (e.keyCode === 38 || e.keyCode === 40) {
                                console.log('predictive search active');
                                sysproInterop.predictiveSearchActive = true;
                            }

                            if (e.keyCode === 9) {
                                console.log('Setting sysproInterop.typingOperation e.keyCode === 9');
                                sysproInterop.typingOperation = true;

                                console.log('TP: ' + sysproInterop.typingOperation);
                                //setTimeout(function () { $(e.target).blur(); }, 100);
                                return commands.KEY_ENTER;
                            }
                            if (e.keyCode === 13) {
                                console.log('Setting sysproInterop.typingOperation e.keyCode === 13');
                                sysproInterop.typingOperation = true;

                                console.log('TP: ' + sysproInterop.typingOperation);
                                //setTimeout(function () { $(e.target).blur(); }, 100);
                            }

                            // If the function does not return a result or undefined is returned,
                            // the plugin uses default behavior.
                        },
                    }
                );
                elementIn.on('keydown', function(e) {
                    var keyCode = e.keyCode || e.which;
                    if (keyCode === 9 || keyCode === 13) {
                        console.log('Setting sysproInterop.typingOperation keydown 913');

                        sysproInterop.typingOperation = true;
                        console.log('TP: ' + sysproInterop.typingOperation);
                    } else {
                        console.log('predictive search inactive');
                        sysproInterop.predictiveSearchActive = false;
                        console.log('Setting sysproInterop.typingOperation typing other');
                        sysproInterop.typingOperation = false;

                        console.log('TP: ' + sysproInterop.typingOperation);
                    }
                });
                //elementIn.on('focus', function (e) {
                //    console.log("Setting sysproInterop.typingOperation focus false");
                //    sysproInterop.typingOperation = false;

                //    console.log("TP: " + sysproInterop.typingOperation);
                //});

                if (callLayerInterop.interopType === 'SYSPRORehostedBrowser') {
                    //This workaround is required  because  of the SYSPRO IE Rehosted Browser and  KeyDowns.
                    elementIn.on('input', function() {
                        var textComplete = $(this).data('textComplete');
                        // Cursor has not set yet. And wait 100ms to skip global click event.
                        setTimeout(function() {
                            // Cursor is ready.
                            textComplete.trigger();
                        }, 100);
                    });
                }
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'initializePredictiveSearch');
        }
    },
    createGridList: function(dataIn) {
        try {
            var gridDivs = $('*[data-sysprogridfieldname="' + dataIn.FieldName + '"]');
            //Used to create the models
            var columnModel = {};
            var comboBoxes = {};
            var sysproGroupFooters = [];
            var changedRows = [];
            var initialGrouping = [];
            var initialAggregates = [];
            var initialSorting = [];
            var hasCommandColumn = false;
            var lastGridSelection = '';
            $.each(gridDivs, function(index) {
                var gridDiv = $(this);

                if (gridDiv.data('kendoGrid')) {
                    gridDiv.data('kendoGrid').destroy(); // destroy the Grid
                    var orignalTable = $(gridDiv.closest('.noBorderTable').data('blanktable'));
                    var containerIn = gridDiv.closest('.noBorderTable');
                    containerIn.empty().append(orignalTable);
                    gridDiv = containerIn.find('.syspro-grid-list');
                } else {
                    //backup the table for reinitialization
                    var gridbackup = gridDiv.closest('.noBorderTable').html();
                    gridDiv.closest('.noBorderTable').data('blanktable', gridbackup);
                }
                var listView = JSON.parse(dataIn.GridData).lv;
                var gridEditable = false;
                //Holds a list of editable date column names
                var dateColumnsHolder = [];

                //If there are date columns update the template
                if (listView !== null) {
                    //Set the optiins for an editable grid
                    if (listView.prop.editable === true) {
                        gridEditable = {};
                        gridEditable = { mode: 'incell', createAt: 'bottom', update: true };
                    }
                    //Example of the data format template: "#= (!a6 == null || a6 = '0000-00-00') ? 'None' : kendo.toString(kendo.parseDate(a6, 'yyyy-MM-dd'), 'MM/dd/yyyy') #"
                    var dateformatTemplate =
                        "#= !data.{0} ? '" +
                        listView.prop.sysprotranNone +
                        "' : kendo.toString(data.{1},'" +
                        listView.prop.sysproDateFormatOut +
                        "') #";

                    var booleanTemplate =
                        "<input type='checkbox' # if({0}){ # checked #} # # if ((typeof {1}sysdisabled !== 'undefined') && {2}sysdisabled){# disabled #} # />";
                    var booleanTemplateEdit =
                        '<input type="checkbox" #= {0} ? \'checked="checked"\' : "" #  # if ((typeof {1}sysdisabled !== "undefined") && {2}sysdisabled){# disabled #} # class="sysEditGridCheckBox" />';
                    var booleanTemplateDisabled = "<input type='checkbox' # if({0}){ # checked #} # disabled />";
                    var booleanheaderTemplate =
                        "<input type='checkbox' data-columnname='{0}' class='header-checkbox'></input><label style='margin-bottom: 0px;font-weight: normal; for='header-chb'>{1}</label>";
                    var numberTemplate =
                        "#= !data.{3} && data.{4} !== 0 ? '' : (kendo.toString(data.{0}, 'n' + (data.{1}sysdec==null?'p':data.{2}sysdec))) #"; //KKD
                    var headerTemplate =
                        "<div><span class='k-icon {0}'/> <a class='k-link' href='#' tabindex='-1'>{1}</a></div>";
                    var comboTemplate =
                        "<select class='form-control dropdown-select' data-columnname='{0}'  data-template='selectTemplate' data-bind='source: {0}.items, value: {0}.value' onchange='sysproInterop.gridCellComboboxChange(this);'></select>";
                    var radioTemplate =
                        "<form data-template='radiobuttonGridTemplate' data-bind='source: {0}.items'></form>";
                    for (i = 0; i < listView.cs.c.length; i++) {
                        if (listView.cs.c[i].type === 'date') {
                            listView.cs.c[i].template = dateformatTemplate.replace('{1}', listView.cs.c[i].field);
                            listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                '{0}',
                                listView.cs.c[i].field
                            );
                            listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                '{2}',
                                listView.cs.c[i].field
                            );
                            listView.cs.c[i].format = '{0:' + listView.prop.sysproDateFormatOut + '}';
                            dateColumnsHolder.push(listView.cs.c[i].field);
                        }
                        //If we have a boolean column treat as checkbox
                        if (listView.cs.c[i].type === 'boolean') {
                            if (
                                !listView.cs.c[i].editable &&
                                listView.cs.c[i].editable !== 'false' &&
                                listView.cs.c[i].editable !== false
                            ) {
                                listView.cs.c[i].template = booleanTemplateEdit.replace('{0}', listView.cs.c[i].field);

                                listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                    '{1}',
                                    listView.cs.c[i].field
                                );
                                listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                    '{2}',
                                    listView.cs.c[i].field
                                );
                            } else {
                                if (listView.cs.c[i].editable !== 'false') {
                                    listView.cs.c[i].template = booleanTemplateDisabled.replace(
                                        '{0}',
                                        listView.cs.c[i].field
                                    ); //Disabled on an EntryGrid
                                } else {
                                    listView.cs.c[i].template = booleanTemplate.replace('{0}', listView.cs.c[i].field);
                                    listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                        '{1}',
                                        listView.cs.c[i].field
                                    );
                                    listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                        '{2}',
                                        listView.cs.c[i].field
                                    );
                                }
                            }
                            if (listView.cs.c[i].showInCheckBoxHeader) {
                                if (listView.cs.c[i].showInCheckBoxHeader === true) {
                                    listView.cs.c[i].headerTemplate = booleanheaderTemplate.replace(
                                        '{0}',
                                        listView.cs.c[i].field
                                    );
                                    listView.cs.c[i].headerTemplate = listView.cs.c[i].headerTemplate.replace(
                                        '{1}',
                                        listView.cs.c[i].title
                                    );
                                }
                            }
                        }
                        //If we have a number column we might need to specify the number of decimals to apply a template
                        if (listView.cs.c[i].type === 'number') {
                            listView.cs.c[i].template = numberTemplate.replace('{0}', listView.cs.c[i].field);
                            listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                '{1}',
                                listView.cs.c[i].field
                            );
                            listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                '{2}',
                                listView.cs.c[i].field
                            );
                            listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                '{3}',
                                listView.cs.c[i].field
                            );
                            listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                '{4}',
                                listView.cs.c[i].field
                            );
                            listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                '{5}',
                                listView.cs.c[i].field
                            );
                            listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                '{6}',
                                listView.cs.c[i].field
                            );
                            listView.cs.c[i].template = listView.cs.c[i].template.replace(
                                '{7}',
                                listView.cs.c[i].field
                            );
                        }

                        if (listView.cs.c[i].type === 'combo') {
                            listView.cs.c[i].template = comboTemplate
                                .replace('{0}', listView.cs.c[i].field)
                                .replace('{0}', listView.cs.c[i].field)
                                .replace('{0}', listView.cs.c[i].field);
                        }

                        if (listView.cs.c[i].type === 'radio') {
                            listView.cs.c[i].template = radioTemplate
                                .replace('{0}', listView.cs.c[i].field)
                                .replace('{0}', listView.cs.c[i].field)
                                .replace('{0}', listView.cs.c[i].field);
                        }

                        //While looping through each column also add the attribute for cell color support
                        listView.cs.c[i].attributes = {
                            style:
                                'background-color: #=data.' +
                                listView.cs.c[i].field +
                                'sysbgcolor#; color: #=data.' +
                                listView.cs.c[i].field +
                                'syscolor#;',
                        };
                        //Check if the grid is editable
                        if (listView.prop.editable) {
                            if (
                                !listView.cs.c[i].editable &&
                                listView.cs.c[i].editable !== 'false' &&
                                listView.cs.c[i].editable !== false &&
                                listView.cs.c[i].type !== 'boolean'
                            ) {
                                listView.cs.c[i].attributes.class = 'editable-cell';
                                //If the field is editable and is a date update the model so that the infrastructure can add a date picker
                                if (listView.cs.c[i].type === 'date') {
                                    columnModel[listView.cs.c[i].field] = { editable: true, type: 'date' };
                                } else {
                                    //if (listView.cs.c[i].field !== "a0") {
                                    //If it is any other editable field - update the model
                                    if (!listView.cs.c[i].type) {
                                        columnModel[listView.cs.c[i].field] = {
                                            editable: true,
                                        };
                                    } else if (listView.cs.c[i].type === 'string') {
                                        columnModel[listView.cs.c[i].field] = {
                                            editable: true,
                                        };
                                    } else if (listView.cs.c[i].type === 'number') {
                                        columnModel[listView.cs.c[i].field] = {
                                            editable: true,
                                            type: 'number',
                                        };
                                    } else if (listView.cs.c[i].type === 'boolean') {
                                        columnModel[listView.cs.c[i].field] = {
                                            editable: true,
                                            type: 'boolean',
                                        };
                                    } else if (listView.cs.c[i].type === 'radio') {
                                        columnModel[listView.cs.c[i].field] = {
                                            editable: false,
                                            type: 'radio',
                                        };
                                    }
                                    //   }
                                    //Check if this column requires an Avanti Search Button
                                    if (listView.cs.c[i].search) {
                                        listView.cs.c[i].editor = function(container, options) {
                                            //Get the grid name, the current row and the name of the column ie. grid|ARSPENLZ|0|a1|0
                                            var editorGridDiv = $(container).closest('.syspro-grid-list');
                                            var editorGrid = editorGridDiv.data('kendoGrid');
                                            var editorFieldName = 'grid:' + editorGridDiv.data('sysprogridfieldname');
                                            var editorRow = $(container)
                                                .closest('tr')
                                                .index();
                                            editorFieldName =
                                                editorFieldName +
                                                ':' +
                                                editorRow +
                                                ':' +
                                                options.field +
                                                ':' +
                                                container[0].cellIndex;
                                            //Create an inputbox
                                            var input = $(
                                                '<input type="text" class="k-input k-textbox" style="width: 80%" name="' +
                                                    options.field +
                                                    '" />'
                                            );
                                            input.appendTo(container);

                                            //Now work out the name of the browse
                                            var editorSearchName = '';
                                            for (i = 0; i < editorGrid.columns.length; i++) {
                                                if (editorGrid.columns[i].field === options.field) {
                                                    editorSearchName = editorGrid.columns[i].search;
                                                    break;
                                                }
                                            }

                                            //Now create the browse button
                                            //When the field value is set to #GRIDVALUE# then it will find and pass the value of the input to the browse that was opened.
                                            var buttonElement = $(
                                                '<a class="syspro-browse-button" href="#" data-fieldname="' +
                                                    editorFieldName +
                                                    '" data-fieldvalue="#GRIDVALUE#" data-predictivesearchfield="' +
                                                    editorSearchName +
                                                    '"  style="color: white"><i class="material-icons">search</i></a>'
                                            );
                                            buttonElement.appendTo(container);

                                            //Now hook it all up for the predictive search and search button, if the predictive search is not manual
                                            if (editorSearchName !== 'manual') {
                                                sysproInterop.initializePredictiveSearch(input, editorSearchName);
                                            }

                                            sysproInterop.subscribeToFieldEvents();
                                        };
                                    }
                                }
                            } else {
                                //Build up a model of the items that are NOT editable and feed it to the grid
                                if (!listView.cs.c[i].type) {
                                    columnModel[listView.cs.c[i].field] = {
                                        editable: false,
                                    };
                                } else if (listView.cs.c[i].type === 'string') {
                                    columnModel[listView.cs.c[i].field] = {
                                        editable: false,
                                    };
                                } else if (listView.cs.c[i].type === 'number') {
                                    columnModel[listView.cs.c[i].field] = {
                                        editable: false,
                                        type: 'number',
                                    };
                                } else if (listView.cs.c[i].type === 'boolean') {
                                    columnModel[listView.cs.c[i].field] = {
                                        editable: false,
                                        type: 'boolean',
                                    };
                                } else if (listView.cs.c[i].type === 'date') {
                                    columnModel[listView.cs.c[i].field] = {
                                        editable: false,
                                        type: 'date',
                                    };
                                }
                            }
                        } else {
                            //This is not an editable grid
                            if (!listView.cs.c[i].type) {
                                columnModel[listView.cs.c[i].field] = {
                                    editable: false,
                                    type: 'string',
                                };
                            } else if (listView.cs.c[i].type === 'string') {
                                columnModel[listView.cs.c[i].field] = {
                                    editable: false,
                                    type: 'string',
                                };
                            } else if (listView.cs.c[i].type === 'number') {
                                columnModel[listView.cs.c[i].field] = {
                                    editable: false,
                                    type: 'number',
                                };
                            } else if (listView.cs.c[i].type === 'boolean') {
                                columnModel[listView.cs.c[i].field] = {
                                    editable: false,
                                    type: 'boolean',
                                };
                            } else if (listView.cs.c[i].type === 'date') {
                                columnModel[listView.cs.c[i].field] = {
                                    editable: false,
                                    type: 'date',
                                };
                            }
                        }
                        //Check if need to apply a image to the coloumn headers
                        if (listView.cs.c[i].image) {
                            listView.cs.c[i].headerTemplate = headerTemplate.replace('{0}', listView.cs.c[i].image);
                            listView.cs.c[i].headerTemplate = listView.cs.c[i].headerTemplate.replace(
                                '{1}',
                                listView.cs.c[i].title
                            );
                        }
                    }
                    //Check if we need to add an edit button
                    if (
                        listView.prop.includeEditCommand === true ||
                        listView.prop.includeDeleteCommand === true ||
                        listView.prop.includeSelectCommand === true
                    ) {
                        hasCommandColumn = true;
                        //Create the 3 buttons
                        var selectCommand = {
                            command: [
                                {
                                    name: 'sysselectbutton',
                                    className: 'btn btn-default btn-select',
                                    iconClass: 'k-icon k-i-button',
                                    text: '',
                                    title: 'Select',
                                    click: function(e) {
                                        sysproInterop.gridCommandSelectClicked(e);
                                    },
                                },
                            ],
                            width: 60,
                        };
                        var editCommand = {
                            command: [
                                {
                                    name: 'syseditbutton',
                                    className: 'btn btn-default btn-edit',
                                    iconClass: 'k-icon k-i-edit',
                                    text: '',
                                    title: 'Edit',
                                    click: function(e) {
                                        sysproInterop.gridCommandEditClicked(e);
                                    },
                                },
                            ],
                            width: 60,
                        };
                        var deleteCommand = {
                            command: [
                                {
                                    name: 'sysdeletebutton',
                                    className: 'btn btn-default btn-delete',
                                    iconClass: 'k-icon k-i-delete',
                                    text: '',
                                    title: 'Delete',
                                    click: function(e) {
                                        sysproInterop.gridCommandDeleteClicked(e);
                                    },
                                },
                            ],
                            width: 60,
                        };
                        var bothCommand = {
                            command: [
                                {
                                    name: 'syseditbutton',
                                    className: 'btn btn-default btn-edit',
                                    iconClass: 'k-icon k-i-edit',
                                    text: '',
                                    title: 'Edit',
                                    click: function(e) {
                                        sysproInterop.gridCommandEditClicked(e);
                                    },
                                },
                                {
                                    name: 'sysdeletebutton',
                                    className: 'btn btn-default btn-delete',
                                    iconClass: 'k-icon k-i-delete',
                                    text: '',
                                    title: 'Delete',
                                    click: function(e) {
                                        sysproInterop.gridCommandDeleteClicked(e);
                                    },
                                },
                            ],
                            width: 180,
                        };
                        var selectDeleteCommand = {
                            command: [
                                {
                                    name: 'sysselectbutton',
                                    className: 'btn btn-default btn-select',
                                    iconClass: 'k-icon k-i-button',
                                    text: '',
                                    title: 'Select',
                                    click: function(e) {
                                        sysproInterop.gridCommandSelectClicked(e);
                                    },
                                },
                                {
                                    name: 'sysdeletebutton',
                                    className: 'btn btn-default btn-delete',
                                    iconClass: 'k-icon k-i-delete',
                                    text: '',
                                    title: 'Delete',
                                    click: function(e) {
                                        sysproInterop.gridCommandDeleteClicked(e);
                                    },
                                },
                            ],
                            width: 120,
                        };
                        var selectEditCommand = {
                            command: [
                                {
                                    name: 'sysselectbutton',
                                    className: 'btn btn-default btn-select',
                                    iconClass: 'k-icon k-i-button',
                                    text: '',
                                    title: 'Select',
                                    click: function(e) {
                                        sysproInterop.gridCommandSelectClicked(e);
                                    },
                                },
                                {
                                    name: 'syseditbutton',
                                    className: 'btn btn-default btn-edit',
                                    iconClass: 'k-icon k-i-edit',
                                    text: '',
                                    title: 'Edit',
                                    click: function(e) {
                                        sysproInterop.gridCommandEditClicked(e);
                                    },
                                },
                            ],
                            width: 120,
                        };
                        var threeCommand = {
                            command: [
                                {
                                    name: 'sysselectbutton',
                                    className: 'btn btn-default btn-select',
                                    iconClass: 'k-icon k-i-button',
                                    text: '',
                                    title: 'Select',
                                    click: function(e) {
                                        sysproInterop.gridCommandSelectClicked(e);
                                    },
                                },
                                {
                                    name: 'syseditbutton',
                                    className: 'btn btn-default btn-edit',
                                    iconClass: 'k-icon k-i-edit',
                                    text: '',
                                    title: 'Edit',
                                    click: function(e) {
                                        sysproInterop.gridCommandEditClicked(e);
                                    },
                                },
                                {
                                    name: 'sysdeletebutton',
                                    className: 'btn btn-default btn-delete',
                                    iconClass: 'k-icon k-i-delete',
                                    text: '',
                                    title: 'Delete',
                                    click: function(e) {
                                        sysproInterop.gridCommandDeleteClicked(e);
                                    },
                                },
                            ],
                            width: 180,
                        };
                        if (
                            listView.prop.includeEditCommand === true &&
                            listView.prop.includeDeleteCommand === true &&
                            listView.prop.includeSelectCommand === true
                        ) {
                            //Select, Edit Delete
                            listView.cs.c.unshift(threeCommand);
                        } else if (
                            listView.prop.includeEditCommand === true &&
                            listView.prop.includeDeleteCommand === true
                        ) {
                            //Edit, Delete
                            listView.cs.c.unshift(bothCommand);
                        } else if (
                            listView.prop.includeSelectCommand === true &&
                            listView.prop.includeDeleteCommand === true
                        ) {
                            //Select, Delete
                            listView.cs.c.unshift(selectDeleteCommand);
                        } else if (
                            listView.prop.includeSelectCommand === true &&
                            listView.prop.includeEditCommand === true
                        ) {
                            //Select, Edit
                            listView.cs.c.unshift(selectEditCommand);
                        } else {
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
                    //Bind Columns and properties
                    listView.prop.pageable.pageSize = 100; //Hard code the pageSize for virtual Scrolling kkdvirtual
                    if (gridDiv.closest('.compact-window').length > 0) {
                        //if it's  inside  a modal then make the height the full window height.
                        var heightIn = $('.window-content', gridDiv.closest('.compact-window')).height();
                        //if (heightIn && heightIn > 0)
                        //    listView.prop.height = heightIn;
                        //else
                        listView.prop.height = 460;
                    }
                    //If a specific size is given then use what was setup.
                    if (gridDiv.data('sysprogridheight')) {
                        var sysprogridheight = gridDiv.data('sysprogridheight');
                        listView.prop.height = sysprogridheight;
                    }
                    //Add a toolbar if required
                    var htmlForToolbar = '';
                    if (listView.tbs) {
                        if (listView.tbs.tb) {
                            var template = kendo.template($('#gridToolbarTemplate').html());
                            var toolbar = listView.tbs.tb;
                            $.each(toolbar, function(index) {
                                htmlForToolbar = htmlForToolbar + template(this);
                            });
                        }
                    }
                    //Check and set the initialGrouping
                    if (listView.grps) {
                        initialGrouping = listView.grps.grp;
                    }
                    if (listView.sort) {
                        initialSorting = listView.sort;
                    }
                    //Check and set the initialSorting
                    if (listView.aggregate) {
                        initialAggregates = listView.aggregate;
                    }
                    //Setup translated messages for the grid.
                    var pageableEmptyText = gridDiv.data('grid-pageable-messages-empty');
                    var pageableOfText = gridDiv.data('grid-pageable-messages-of');
                    var pageablePageText = gridDiv.data('grid-pageable-messages-page');
                    var groupableEmptyText = gridDiv.data('grid-groupable-messages-empty');
                    var columnMenuText = gridDiv.data('grid-columnmenu-messages');
                    var filterableText = gridDiv.data('grid-filterable-messages');
                    var operatorsText = gridDiv.data('grid-operators-string');
                    var parsedcolumnMenuMessages = listView.prop.columnMenu;
                    var parsedfilterableMessages = listView.prop.filterable;

                    if (listView.prop.columnMenu && columnMenuText)
                        parsedcolumnMenuMessages = {
                            messages: columnMenuText,
                        };
                    if (listView.prop.filterable && filterableText)
                        parsedfilterableMessages = {
                            messages: filterableText,
                            operators: {
                                string: operatorsText,
                            },
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
                                parse: function(data) {
                                    $.each(data, function(index, item) {
                                        $.each(dateColumnsHolder, function(index) {
                                            item[this] = kendo.parseDate(item[this], listView.prop.sysproDateFormatIn);
                                        });
                                    });

                                    return data;
                                },
                                model: {
                                    fields: columnModel,
                                },
                            }, //used for editable grids
                        },
                        height: listView.prop.height, //I just bound the height, we can change it in ConvertXmlToJSON
                        change: function(e) {
                            if (gridDiv.data('sysproscrolltoselection')) {
                                if (gridDiv.data('sysproscrolltoselection') === true) {
                                    //The following code handles the scolling based on the selected row
                                    var scrollContentOffset = this.element.find('tbody').offset().top;
                                    var selectContentOffset = this.select().offset().top;
                                    var distance = selectContentOffset - scrollContentOffset;

                                    this.element.find('.k-grid-content').animate(
                                        {
                                            scrollTop: distance,
                                        },
                                        400
                                    );
                                }
                                gridDiv.data('sysproscrolltoselection', false);
                            }
                        },
                        sortable: listView.prop.sortable,
                        filterable: parsedfilterableMessages,
                        groupable: {
                            messages: {
                                empty: groupableEmptyText,
                            },
                            enabled: listView.prop.groupable,
                        },
                        columnMenu: parsedcolumnMenuMessages,
                        resizable: true,
                        reorderable: true,
                        selectable: true,
                        navigatable: true,
                        editable: gridEditable,
                        edit: function(e) {
                            //Check if the Grid is disabled
                            if (gridDiv.data('sysproentrygriddisabled') === true) {
                                this.closeCell();
                            }
                            var grid = gridDiv.data('kendoGrid');
                            //There is a property against every row that has a list of columns that a disabled
                            //Check this property and close the cell accordingly
                            if (e.model) {
                                if (e.model['colDisabled']) {
                                    var collectionCellIndex = e.container.index();
                                    //Now get the columnname
                                    var columnName = grid.getOptions().columns[collectionCellIndex].field;

                                    if (e.model['colDisabled'].includes(columnName)) {
                                        this.closeCell();
                                    }
                                }
                            }
                        },
                        cellClose: function(e) {
                            //Event fires when a cell has changed
                            if (e.model.dirty === true) {
                                var returnChangeEventData = '';

                                //Get the Grid and currently select Row
                                var grid = gridDiv.data('kendoGrid');

                                var fieldName = gridDiv.data('sysprogridfieldname');
                                var gridColumnsHolder = gridDiv.data('sysprogriddates');
                                var selectedItem = gridDiv.data('kendoGrid').select();
                                var rowIndex = 0;
                                //When zero it is on a new row on the grid...ie there were no previous rows
                                if (selectedItem.length === 0) {
                                    rowIndex = grid.dataSource.total();
                                } else {
                                    rowIndex = selectedItem.index() + 1;
                                }

                                //Is this the last row we are editing
                                var isLastRow = false;
                                if (selectedItem.index() + 1 == grid.dataSource.total()) {
                                    isLastRow = true;
                                }
                                var currentDataItem = grid.dataItem(selectedItem);

                                if (gridDiv.data('sysprohashiddenrows') == true) {
                                    //Get the row index from the dataSource if there are hidden rows
                                    rowIndex = grid.dataSource.indexOf(currentDataItem) + 1;
                                }

                                var returnChangeEventData = rowIndex + '|' + isLastRow + '|';

                                //This loop should have 1 dirty field...write it out
                                $.each(e.model.dirtyFields, function(key, value) {
                                    returnChangeEventData = returnChangeEventData + key + '|';
                                    //Check if it is a combobox whose value has changed
                                    if (e.model[key] && e.model[key].key) {
                                        returnChangeEventData = returnChangeEventData + e.model[key].key + '|';
                                    } else {
                                        //check if it's a date and if so format it to yyyyMMdd
                                        var valueToUse = e.model[key];
                                        if (gridColumnsHolder.indexOf(key) > -1) {
                                            if (e.model[key]) {
                                                valueToUse = sysproInterop.convertDateForGridOutput(e.model[key]);
                                            } else {
                                                valueToUse = '';
                                            }
                                        }
                                        returnChangeEventData = returnChangeEventData + valueToUse + '|';

                                        //Check if the value that is changed is null, we don't want to bubble the event up
                                        if (valueToUse === null) {
                                            returnChangeEventData = null;
                                            currentDataItem = null;
                                        }
                                    }
                                });

                                //This will usually happen on a new row on the grid...ie there were no previous rows
                                if (returnChangeEventData !== null) {
                                    if (currentDataItem === null) {
                                        currentDataItem = e.model;
                                    }
                                }

                                //Now return the values of each cell
                                if (currentDataItem !== null) {
                                    var columnDetails = currentDataItem.toJSON();
                                    $.each(columnDetails, function(key, value) {
                                        //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                        if (
                                            key.indexOf('syscolor') === -1 &&
                                            key.indexOf('sysbgcolor') === -1 &&
                                            key.indexOf('sysdisabled') === -1 &&
                                            key.indexOf('sysdec') === -1
                                        ) {
                                            //Check if the column is a date as we want to return the date in the format that it was given
                                            var columnIsDate = false;
                                            var columnIsComboBox = false;
                                            var columnIsColumnComboBox = false;
                                            //Flag the field if it is a date or combobox
                                            for (i = 0; i < grid.columns.length; i++) {
                                                if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (
                                                    grid.columns[i].field === key &&
                                                    (grid.columns[i].type === 'combo' ||
                                                        grid.columns[i].type === 'radio')
                                                ) {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                            //Check if the column is a date and return it in the correct format
                                            if (columnIsDate) {
                                                returnChangeEventData =
                                                    returnChangeEventData +
                                                    sysproInterop.convertDateForGridOutput(value) +
                                                    '|';
                                            } else if (columnIsComboBox) {
                                                returnChangeEventData = returnChangeEventData + value.key + '|';
                                            } else if (columnIsColumnComboBox) {
                                                returnChangeEventData = returnChangeEventData + value.value + '|';
                                            } else {
                                                returnChangeEventData = returnChangeEventData + value + '|';
                                            }
                                        }
                                    });
                                }
                                //Raise the event up to SYSPRO
                                if (returnChangeEventData !== null) {
                                    sysproInterop.eventTrigged(
                                        fieldName,
                                        returnChangeEventData,
                                        '',
                                        '',
                                        'gridCellChanged',
                                        function(e) {},
                                        function(e) {}
                                    );
                                }
                                //Clean up the dirty flag
                                e.model.dirtyFields = {};
                                e.model.dirty = false;
                                var changedRowsEvent = gridDiv.data('sysprogridchangedrows');
                                rowIndex = rowIndex - 1; //set it back to a zerobased array
                                if (changedRowsEvent.indexOf(rowIndex) === -1) {
                                    changedRowsEvent.push(rowIndex);
                                    gridDiv.data('sysprogridchangedrows', changedRowsEvent);
                                }
                            }
                            gridDiv.data('sysprolastcellcloseselector', e.container.selector);
                        },
                        noRecords: {
                            template: listView.prop.sysprotranNoItemText,
                        },
                        scrollable: {
                            //endless: true
                            virtual: true, //kkdvirtual
                        },
                        //This pagable is used by the endless scrolling
                        pageable: {
                            messages: {
                                //empty: pageableEmptyText,
                                //of: pageableOfText,
                                //page: pageablePageText
                                display: 'Showing {2} item(s)',
                            },
                            numeric: false,
                            previousNext: false,
                        },
                        toolbar: htmlForToolbar,
                        columns: listView.cs.c,
                        dataBinding: function(e) {
                            //Store the scrollTop, we need this because when the grid rebinds, it scrolls to the top
                            var scrollTop = this.element.find('div.k-grid-content').scrollTop();
                            gridDiv.data('sysproscrolltop', scrollTop);
                        },
                        dataBound: function() {
                            this.element.find('div.k-grid-content').scrollTop(gridDiv.data('sysproscrolltop'));
                            $('.syspro-grid-row-hyperlink', gridDiv).on('click', function(e) {
                                sysproInterop.sysCellClick(e.target);
                            });
                            //Cater for keyboard navigation and row selection
                            if (!listView.prop.editable || listView.prop.editable === false) {
                                var arrows = [37, 38, 39, 40];
                                gridDiv.data('kendoGrid').table.off('keydown');
                                gridDiv.data('kendoGrid').table.on('keydown', function(e) {
                                    if (arrows.indexOf(e.keyCode) >= 0) {
                                        setTimeout(function() {
                                            gridDiv.data('kendoGrid').select(
                                                gridDiv
                                                    .data('kendoGrid')
                                                    .current()
                                                    .closest('tr')
                                            );
                                        }, 1);
                                    }
                                });
                            }
                            //Toolbar GridSearch TextBox
                            $('.gridSearchTextBox', gridDiv).off('input');
                            $('.gridSearchTextBox', gridDiv).on('input', function(e) {
                                var grid = gridDiv.data('kendoGrid');

                                var columns = grid.columns;
                                var valueToCompare = e.target.value;
                                valueToCompare = valueToCompare.trim();
                                if (valueToCompare === '') {
                                    //Get the has hidden rows flag
                                    var sysprohashiddenrows = gridDiv.data('sysprohashiddenrows');
                                    if (sysprohashiddenrows) {
                                        var hiddenRows = { logic: 'and', filters: [] };
                                        hiddenRows.filters.push({
                                            field: 'syshidden',
                                            operator: 'neq',
                                            value: true,
                                        });
                                        grid.dataSource.filter(hiddenRows);
                                    } else {
                                        grid.dataSource.filter([]);
                                    }
                                } else {
                                    var filter = [{ logic: 'or', filters: [] }];

                                    columns.forEach(function(x) {
                                        if (x.field) {
                                            var type = x.type;
                                            //If it is a combobox ignore it
                                            if (!x.isCombbox) {
                                                if (!type) {
                                                    type = 'string';
                                                }
                                                if (type === 'string') {
                                                    filter[0].filters.push({
                                                        field: x.field,
                                                        operator: 'contains',
                                                        value: e.target.value,
                                                    });
                                                } else if (type == 'number') {
                                                    if (sysproInterop.isNumeric(e.target.value)) {
                                                        filter[0].filters.push({
                                                            field: x.field,
                                                            operator: 'eq',
                                                            value: e.target.value,
                                                        });
                                                    }
                                                } else if (type == 'date') {
                                                    var data = grid.dataSource.data();
                                                    for (var i = 0; i < data.length; i++) {
                                                        var dateStr = kendo.format(x.format, data[i][x.field]);
                                                        // change to includes() if you wish to filter that way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
                                                        if (dateStr.startsWith(e.target.value)) {
                                                            filter[0].filters.push({
                                                                field: x.field,
                                                                operator: 'eq',
                                                                value: data[i][x.field],
                                                            });
                                                        }
                                                    }
                                                } else if (
                                                    type == 'boolean' &&
                                                    sysproInterop.getBoolean(e.target.value) !== null
                                                ) {
                                                    var bool = sysproInterop.getBoolean(e.target.value);
                                                    filter[0].filters.push({
                                                        field: x.field,
                                                        operator: 'eq',
                                                        value: bool,
                                                    });
                                                }
                                            }
                                        }
                                    });
                                    //Get the has hidden rows flag
                                    var sysprohashiddenrows = gridDiv.data('sysprohashiddenrows');
                                    if (sysprohashiddenrows) {
                                        var hiddenRows = { logic: 'and', filters: [] };
                                        hiddenRows.filters.push({
                                            field: 'syshidden',
                                            operator: 'neq',
                                            value: true,
                                        });
                                        filter.push(hiddenRows);
                                    }
                                    grid.dataSource.filter(filter);
                                }
                            });
                            //Toolbar gridLabelTextBox
                            //TODO: Grid html changes for Joe.
                            $('.gridLabelTextBox', gridDiv.closest('.noBorderTable')).off('keydown blur');
                            $('.gridLabelTextBox', gridDiv.closest('.noBorderTable')).on('keydown blur', function(e) {
                                //BLUR is if the textbox has lost focus
                                if (e.type === 'blur') {
                                    var eventId = e.currentTarget.getAttribute('data-gridbuttoneventid');
                                    var textBoxValue = e.target.value;
                                    sysproInterop.eventTrigged(
                                        textBoxValue,
                                        eventId,
                                        '',
                                        '',
                                        'gridToolBarTextChanged',
                                        function(e) {},
                                        function(e) {}
                                    );
                                }
                                if (e.type === 'keydown') {
                                    //Check for a TAB(9) or ENTER(13) keycode and bubble the event up
                                    if (e.keyCode === 9 || e.keyCode === 13) {
                                        var eventId = e.currentTarget.getAttribute('data-gridbuttoneventid');
                                        var textBoxValue = e.target.value;
                                        sysproInterop.eventTrigged(
                                            textBoxValue,
                                            eventId,
                                            '',
                                            '',
                                            'gridToolBarTextChanged',
                                            function(e) {},
                                            function(e) {}
                                        );
                                    }
                                }
                            });
                            //Toobar Button Click Event
                            $('.gridButton', gridDiv.closest('.noBorderTable')).off('click');
                            $('.gridButton', gridDiv.closest('.noBorderTable')).on('click', function(e) {
                                var eventId = e.currentTarget.getAttribute('data-gridbuttoneventid');
                                if (eventId) {
                                    var dataInObject = {};
                                    dataInObject.FieldName = dataIn.FieldName;
                                    dataInObject.InternalEventParameter = '{}';
                                    switch (eventId) {
                                        case '':
                                            break;
                                        case 'excelexport':
                                            dataInObject.InternalEvent = 'ExcelExport';
                                            sysproInterop.gridRequestInternalEvent(dataInObject);
                                            break;
                                        case 'pdfexport':
                                            dataInObject.InternalEvent = 'PDFExport';
                                            sysproInterop.gridRequestInternalEvent(dataInObject);
                                            break;
                                        case 'expandall':
                                            dataInObject.InternalEvent = 'ExpandAll';
                                            sysproInterop.gridRequestInternalEvent(dataInObject);
                                            break;
                                        case 'collapseall':
                                            dataInObject.InternalEvent = 'CollapseAll';
                                            sysproInterop.gridRequestInternalEvent(dataInObject);
                                        default:
                                            sysproInterop.eventTrigged(
                                                dataIn.FieldName,
                                                eventId,
                                                '',
                                                '',
                                                'gridButtonClicked',
                                                function(e) {},
                                                function(e) {}
                                            );
                                            break;
                                    }
                                }
                            });

                            //Finally initialize any tooltips  in the toolbar of  the grid.
                            queryLayoutUIHelpers.initializeTooltips();
                            gridDiv
                                .data('kendoGrid')
                                .tbody.find('tr')
                                .each(function() {
                                    kendo.bind(this, gridDiv.data('kendoGrid').dataItem(this));
                                });
                        },
                        //GridSetting Events
                        sort: function(e) {
                            gridDiv.data('sysprosettingschanged', true);
                        },
                        columnHide: function(e) {
                            gridDiv.data('sysprosettingschanged', true);
                        },
                        columnShow: function(e) {
                            gridDiv.data('sysprosettingschanged', true);
                        },
                        columnReorder: function(e) {
                            gridDiv.data('sysprosettingschanged', true);
                        },
                        columnResize: function(e) {
                            gridDiv.data('sysprosettingschanged', true);
                        },
                        group: function(e) {
                            gridDiv.data('sysprosettingschanged', true);
                        },
                    });
                    //Handle key strokes on Editable Grids
                    if (listView.prop.editable === true) {
                        gridHolder.find('table').off('keydown');
                        gridHolder.find('table').on('keydown', sysproInterop.gridEditableKeyDown);
                    }

                    //Store the pageSize and grid model as we need it in the refreshGridList function
                    gridDiv.data('syspropagesize', listView.prop.pageable.pageSize);
                    gridDiv.data('sysprogridmodel', columnModel);
                    gridDiv.data('sysprogridchangedrows', changedRows);
                    gridDiv.data('sysprolastgridselection', lastGridSelection);
                    gridDiv.data('sysproentrygriddisabled', false);
                    gridDiv.data('sysprocomboboxes', comboBoxes);
                    gridDiv.data('sysprohascommandcolumn', hasCommandColumn);
                    gridDiv.data('sysproinitialgrouping', initialGrouping);
                    gridDiv.data('sysproinitialsorting', initialSorting);
                    gridDiv.data('sysproinitialaggregates', initialAggregates);
                    gridDiv.data('dateformatin', listView.prop.sysproDateFormatIn);
                    gridDiv.data('dateformatout', listView.prop.sysproDateFormatOut);
                    gridDiv.data('sysprogriddates', dateColumnsHolder);
                    gridDiv.data('sysprogroupfooters', sysproGroupFooters);
                    gridDiv.data('sysprolastcellcloseselector', '');
                    gridDiv.data('sysprohashiddenrows', false);
                    gridDiv.data('sysprosettingschanged', false);
                    var gridObject = gridDiv.data('kendoGrid');

                    //For programs like ARSP94 that only has 2 columns, make the command column small so that it doesn't stretch
                    //Only do this if there is 1 command button and the button is a delete(ie. it is not being used for a search)
                    if (hasCommandColumn == true) {
                        var columnDetails = gridObject.getOptions();
                        if (columnDetails.columns.length < 5) {
                            if (columnDetails.columns[0].command.length == 1) {
                                if (columnDetails.columns[0].command[0].title === 'Delete') {
                                    columnDetails.columns[0].width = 10;
                                    gridObject.setOptions(columnDetails);
                                }
                            }
                        }
                    }

                    //Check if there is rowSelection event required create the event handle
                    if (listView.prop.sysproRowSelection === true) {
                        gridObject.bind('change', sysproInterop.gridRowSelected);
                    }
                } else {
                    sysproInterop.showErrorMessage(
                        "No list view with the field name '" +
                            dataIn.FieldName +
                            "' exists in the current webview and it could not be created."
                    );
                }
            });
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'createGridList');
        }
    },
    isNumeric: function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    getBoolean: function(str) {
        if ('true'.startsWith(str)) {
            return true;
        } else if ('false'.startsWith(str)) {
            return false;
        } else {
            return null;
        }
    },
    gridCellRadioChange: function(e) {
        try {
            var tr = $(e.closest('tr'));
            var gridDiv = $(e.closest('.syspro-grid-list'));
            var grid = gridDiv.data('kendoGrid');
            var fieldName = gridDiv.data('sysprogridfieldname');

            if (tr) {
                if (grid) {
                    //Select the row
                    //grid.select(tr);
                    var rowIdx = $('tr', grid.tbody).index(tr);
                    grid.select('tr:eq(' + rowIdx + ')');
                    var currentDataItem = grid.dataItem(tr);

                    //Is this the last row we are editing
                    var isLastRow = false;
                    rowIdx++;
                    if (rowIdx == grid.dataSource.total()) {
                        isLastRow = true;
                    }

                    var colName = e.getAttribute('data-columnname');
                    var returnChangeEventData = rowIdx + '|' + isLastRow + '|' + colName + '|' + e.value + '|';
                    //currentDataItem[colName].value = e.value;

                    //Now return the values of each cell
                    if (currentDataItem !== null) {
                        var columnDetails = currentDataItem.toJSON();
                        $.each(columnDetails, function(key, value) {
                            //If the node key starts with "syscolor" or "sysbgcolor" don't output
                            if (
                                key.indexOf('syscolor') === -1 &&
                                key.indexOf('sysbgcolor') === -1 &&
                                key.indexOf('sysdisabled') === -1 &&
                                key.indexOf('sysdec') === -1
                            ) {
                                //Check if the column is a date as we want to return the date in the format that it was given
                                var columnIsDate = false;
                                var columnIsComboBox = false;
                                var columnIsColumnComboBox = false;
                                //Flag the field if it is a date or combobox
                                for (i = 0; i < grid.columns.length; i++) {
                                    if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                        columnIsDate = true;
                                        break;
                                    }
                                    if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                        columnIsComboBox = true;
                                        break;
                                    }
                                    if (
                                        grid.columns[i].field === key &&
                                        (grid.columns[i].type === 'combo' || grid.columns[i].type === 'radio')
                                    ) {
                                        columnIsColumnComboBox = true;
                                        break;
                                    }
                                }
                                //Check if the column is a date and return it in the correct format
                                if (columnIsDate) {
                                    returnChangeEventData =
                                        returnChangeEventData + sysproInterop.convertDateForGridOutput(value) + '|';
                                } else if (columnIsComboBox) {
                                    returnChangeEventData = returnChangeEventData + value.key + '|';
                                } else if (columnIsColumnComboBox) {
                                    returnChangeEventData = returnChangeEventData + e.value + '|';
                                } else {
                                    returnChangeEventData = returnChangeEventData + value + '|';
                                }
                            }
                        });
                    }

                    var fieldName = gridDiv.data('sysprogridfieldname');
                    //Raise the event up to SYSPRO
                    sysproInterop.eventTrigged(fieldName, returnChangeEventData, '', '', 'gridCellChanged', function(
                        e
                    ) {});
                }
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'gridCellRadioChange');
        }
    },
    gridCellComboboxChange: function(e) {
        try {
            var tr = $(e.closest('tr'));
            var gridDiv = $(e.closest('.syspro-grid-list'));
            var grid = gridDiv.data('kendoGrid');
            var fieldName = gridDiv.data('sysprogridfieldname');

            if (tr) {
                if (grid) {
                    //Select the row
                    //grid.select(tr);
                    var rowIdx = $('tr', grid.tbody).index(tr);
                    grid.select('tr:eq(' + rowIdx + ')');
                    var currentDataItem = grid.dataItem(tr);

                    //Is this the last row we are editing
                    var isLastRow = false;
                    rowIdx++;
                    if (rowIdx == grid.dataSource.total()) {
                        isLastRow = true;
                    }

                    var colName = e.getAttribute('data-columnname');
                    var returnChangeEventData = rowIdx + '|' + isLastRow + '|' + colName + '|' + e.value + '|';
                    currentDataItem[colName].value = e.value;

                    //Now return the values of each cell
                    if (currentDataItem !== null) {
                        var columnDetails = currentDataItem.toJSON();
                        $.each(columnDetails, function(key, value) {
                            //If the node key starts with "syscolor" or "sysbgcolor" don't output
                            if (
                                key.indexOf('syscolor') === -1 &&
                                key.indexOf('sysbgcolor') === -1 &&
                                key.indexOf('sysdisabled') === -1 &&
                                key.indexOf('sysdec') === -1
                            ) {
                                //Check if the column is a date as we want to return the date in the format that it was given
                                var columnIsDate = false;
                                var columnIsComboBox = false;
                                var columnIsColumnComboBox = false;
                                //Flag the field if it is a date or combobox
                                for (i = 0; i < grid.columns.length; i++) {
                                    if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                        columnIsDate = true;
                                        break;
                                    }
                                    if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                        columnIsComboBox = true;
                                        break;
                                    }
                                    if (
                                        grid.columns[i].field === key &&
                                        (grid.columns[i].type === 'combo' || grid.columns[i].type === 'radio')
                                    ) {
                                        columnIsColumnComboBox = true;
                                        break;
                                    }
                                }
                                //Check if the column is a date and return it in the correct format
                                if (columnIsDate) {
                                    returnChangeEventData =
                                        returnChangeEventData + sysproInterop.convertDateForGridOutput(value) + '|';
                                } else if (columnIsComboBox) {
                                    returnChangeEventData = returnChangeEventData + value.key + '|';
                                } else if (columnIsColumnComboBox) {
                                    returnChangeEventData = returnChangeEventData + value.value + '|';
                                } else {
                                    returnChangeEventData = returnChangeEventData + value + '|';
                                }
                            }
                        });
                    }

                    var fieldName = gridDiv.data('sysprogridfieldname');
                    //Raise the event up to SYSPRO
                    sysproInterop.eventTrigged(fieldName, returnChangeEventData, '', '', 'gridCellChanged', function(
                        e
                    ) {});
                }
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'gridCellComboboxChange');
        }
    },
    gridCommandSelectClicked: function(e) {
        try {
            e.preventDefault();
            var currentSelectedItem = '';
            var tr = $(e.target).closest('tr');
            var gridDiv = tr.closest('[data-role=grid]');
            var grid = gridDiv.data('kendoGrid');
            var fieldName = gridDiv.data('sysprogridfieldname');
            if (grid) {
                //Highlight the row
                setTimeout(function() {
                    tr.data('sysignorerowselectedevent', true);
                    grid.select(tr);
                });

                var currentDataItem = grid.dataItem(tr);
                if (currentDataItem !== null) {
                    currentSelectedItem = tr[0].rowIndex + 1 + '|';
                    var columnDetails = currentDataItem.toJSON();
                    $.each(columnDetails, function(key, value) {
                        //If the node key starts with "syscolor" or "sysbgcolor" don't output
                        if (
                            key.indexOf('syscolor') === -1 &&
                            key.indexOf('sysbgcolor') === -1 &&
                            key.indexOf('sysdisabled') === -1 &&
                            key.indexOf('sysdec') === -1
                        ) {
                            //Check if the column is a date as we want to return the date in the format that it was given
                            var columnIsDate = false;
                            var columnIsComboBox = false;
                            var columnIsColumnComboBox = false;
                            //Flag the field if it is a date or combobox
                            for (i = 0; i < grid.columns.length; i++) {
                                if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                    columnIsDate = true;
                                    break;
                                }
                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                    columnIsComboBox = true;
                                    break;
                                }
                                if (
                                    grid.columns[i].field === key &&
                                    (grid.columns[i].type === 'combo' || grid.columns[i].type === 'radio')
                                ) {
                                    columnIsColumnComboBox = true;
                                    break;
                                }
                            }
                            //Check if the column is a date and return it in the correct format
                            if (columnIsDate) {
                                currentSelectedItem =
                                    currentSelectedItem + sysproInterop.convertDateForGridOutput(value) + '|';
                            } else if (columnIsComboBox) {
                                currentSelectedItem = currentSelectedItem + value.key + '|';
                            } else if (columnIsColumnComboBox) {
                                currentSelectedItem = currentSelectedItem + value.value + '|';
                            } else {
                                currentSelectedItem = currentSelectedItem + value + '|';
                            }
                        }
                    });
                    sysproInterop.eventTrigged(
                        fieldName,
                        currentSelectedItem,
                        '',
                        '',
                        'gridCommandSelectClicked',
                        function(e) {},
                        function(e) {}
                    );
                }
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'gridCommandSelectClicked');
        }
    },
    gridCommandEditClicked: function(e) {
        try {
            e.preventDefault();
            var currentSelectedItem = '';
            var tr = $(e.target).closest('tr');
            var gridDiv = tr.closest('[data-role=grid]');
            var grid = gridDiv.data('kendoGrid');
            var fieldName = gridDiv.data('sysprogridfieldname');
            if (grid) {
                //Highlight the row
                setTimeout(function() {
                    tr.data('sysignorerowselectedevent', true);
                    grid.select(tr);
                });

                var currentDataItem = grid.dataItem(tr);
                if (currentDataItem !== null) {
                    currentSelectedItem = tr[0].rowIndex + 1 + '|';
                    var columnDetails = currentDataItem.toJSON();
                    $.each(columnDetails, function(key, value) {
                        //If the node key starts with "syscolor" or "sysbgcolor" don't output
                        if (
                            key.indexOf('syscolor') === -1 &&
                            key.indexOf('sysbgcolor') === -1 &&
                            key.indexOf('sysdisabled') === -1 &&
                            key.indexOf('sysdec') === -1
                        ) {
                            //Check if the column is a date as we want to return the date in the format that it was given
                            var columnIsDate = false;
                            var columnIsComboBox = false;
                            var columnIsColumnComboBox = false;
                            //Flag the field if it is a date or combobox
                            for (i = 0; i < grid.columns.length; i++) {
                                if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                    columnIsDate = true;
                                    break;
                                }
                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                    columnIsComboBox = true;
                                    break;
                                }
                                if (
                                    grid.columns[i].field === key &&
                                    (grid.columns[i].type === 'combo' || grid.columns[i].type === 'radio')
                                ) {
                                    columnIsColumnComboBox = true;
                                    break;
                                }
                            }
                            //Check if the column is a date and return it in the correct format
                            if (columnIsDate) {
                                currentSelectedItem =
                                    currentSelectedItem + sysproInterop.convertDateForGridOutput(value) + '|';
                            } else if (columnIsComboBox) {
                                currentSelectedItem = currentSelectedItem + value.key + '|';
                            } else if (columnIsColumnComboBox) {
                                currentSelectedItem = currentSelectedItem + value.value + '|';
                            } else {
                                currentSelectedItem = currentSelectedItem + value + '|';
                            }
                        }
                    });
                    sysproInterop.eventTrigged(
                        fieldName,
                        currentSelectedItem,
                        '',
                        '',
                        'gridCommandEditClicked',
                        function(e) {},
                        function(e) {}
                    );
                }
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'gridCommandEditClicked');
        }
    },
    gridCommandDeleteClicked: function(e) {
        try {
            e.preventDefault();
            var currentSelectedItem = '';
            var tr = $(e.target).closest('tr');
            var gridDiv = tr.closest('[data-role=grid]');
            var grid = gridDiv.data('kendoGrid');
            var fieldName = gridDiv.data('sysprogridfieldname');
            if (grid) {
                //Highlight the row
                setTimeout(function() {
                    tr.data('sysignorerowselectedevent', true);
                    grid.select(tr);
                });

                var currentDataItem = grid.dataItem(tr);
                if (currentDataItem !== null) {
                    currentSelectedItem = tr[0].rowIndex + 1 + '|';
                    var columnDetails = currentDataItem.toJSON();
                    $.each(columnDetails, function(key, value) {
                        //If the node key starts with "syscolor" or "sysbgcolor" don't output
                        if (
                            key.indexOf('syscolor') === -1 &&
                            key.indexOf('sysbgcolor') === -1 &&
                            key.indexOf('sysdisabled') === -1 &&
                            key.indexOf('sysdec') === -1
                        ) {
                            //Check if the column is a date as we want to return the date in the format that it was given
                            var columnIsDate = false;
                            var columnIsComboBox = false;
                            var columnIsColumnComboBox = false;
                            //Flag the field if it is a date or combobox
                            for (i = 0; i < grid.columns.length; i++) {
                                if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                    columnIsDate = true;
                                    break;
                                }
                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                    columnIsComboBox = true;
                                    break;
                                }
                                if (
                                    grid.columns[i].field === key &&
                                    (grid.columns[i].type === 'combo' || grid.columns[i].type === 'radio')
                                ) {
                                    columnIsColumnComboBox = true;
                                    break;
                                }
                            }
                            //Check if the column is a date and return it in the correct format
                            if (columnIsDate) {
                                currentSelectedItem =
                                    currentSelectedItem + sysproInterop.convertDateForGridOutput(value) + '|';
                            } else if (columnIsComboBox) {
                                currentSelectedItem = currentSelectedItem + value.key + '|';
                            } else if (columnIsColumnComboBox) {
                                currentSelectedItem = currentSelectedItem + value.value + '|';
                            } else {
                                currentSelectedItem = currentSelectedItem + value + '|';
                            }
                        }
                    });
                    sysproInterop.eventTrigged(
                        fieldName,
                        currentSelectedItem,
                        '',
                        '',
                        'gridCommandDeleteClicked',
                        function(e) {},
                        function(e) {}
                    );
                }
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'gridCommandDeleteClicked');
        }
    },
    gridEditableKeyDown: function(e) {
        try {
            if (e.keyCode === kendo.keys.TAB && $($(e.target).closest('.k-edit-cell'))[0]) {
                e.preventDefault();
                var grid = $(this)
                    .closest('[data-role=grid]')
                    .data('kendoGrid');
                //Get the current row and current cell along with their indexes
                var currentRow = $(e.target).closest('tr');
                var currentCell = $(e.target).closest('td');
                var currentRowIndex = currentRow.index();
                var currentCellIndex = currentCell.index();
                //If grouping is used the current cell index is off because of dummy cells being created with breaks values in the grid.
                if (grid.dataSource.group()) currentCellIndex = currentCellIndex - grid.dataSource.group().length;
                var storePreviousRow;
                var nextCell;

                //Set the field just in case the prevent default doesn't work and call the cellClose event
                var dataItem = grid.dataItem($(e.target).closest('tr'));
                var field = grid.columns[currentCellIndex].field;
                if (!$(e.target).hasClass('k-dropdown')) {
                    var value = $(e.target).val();
                    if (grid.columns[currentCellIndex].type === 'date') {
                        var dateFormatOut = $(grid.element).data('dateformatout');
                        var dateObject = kendo.parseDate(value, dateFormatOut);
                        dataItem.set(field, dateObject);
                    } else {
                        dataItem.set(field, value);
                    }
                }
                grid.closeCell(currentCell);

                //Check if the user clicked the previous key
                if (e.shiftKey) {
                    //Get the previous editable cells
                    nextCell = currentCell.prevAll('.editable-cell:visible');
                    if (nextCell[0]) {
                        //There is a prev editable cell
                        currentCellIndex = nextCell[0].cellIndex;
                    } else {
                        //There is NO prev editable cell
                        currentRow = currentRow.prev();
                        if (currentRow.length > 0) {
                            //We have a previous row
                            currentRowIndex = currentRow.index();
                            currentCell = currentRow.children('.editable-cell:visible:last');
                            currentCellIndex = currentCell[0].cellIndex;
                            grid.select('tr:eq(' + currentRowIndex + ')');
                        }
                    }
                } else {
                    //Get the next editable cells
                    nextCell = currentCell.nextAll('.editable-cell:visible');
                    if (nextCell.length > 0) {
                        //There is a next editable visible cell
                        //Now check if there are any disabled columns for this row
                        var collectionRow = dataItem.colDisabled;
                        if (!collectionRow || collectionRow === 'undefined') {
                            //There are no disabled columns
                            currentCellIndex = nextCell[0].cellIndex;
                        } else {
                            //There disabled columns
                            //Make sure the last character is a "|"
                            if (collectionRow[collectionRow.length - 1] !== '|') {
                                collectionRow = collectionRow + '|';
                            }
                            //Now loop through all the visible editable cells and make sure that they are NOT disabled
                            var foundNextCellToFocus = false;
                            for (var i = 0; i < nextCell.length; i++) {
                                currentCellIndex = nextCell[i].cellIndex;
                                var collectionCellIndex = currentCellIndex;

                                //Now get the columnname
                                var columnName = grid.getOptions().columns[collectionCellIndex].field;

                                if (!collectionRow.includes(columnName)) {
                                    foundNextCellToFocus = true;
                                    break;
                                }
                            }
                            //I didn't find a cell to set focus to because they are all flagged as disabled
                            if (foundNextCellToFocus === false) {
                                //Add a new row
                                //There is NO next editable cell, see if there is a next row
                                storePreviousRow = currentRow;
                                currentRow = currentRow.next();
                                if (currentRow.length > 0) {
                                    //We have a next row
                                    currentRowIndex = currentRow.index();
                                    currentCell = currentRow.children('.editable-cell:visible:first');
                                    currentCellIndex = currentCell[0].cellIndex;
                                    grid.select('tr:eq(' + currentRowIndex + ')');
                                } else {
                                    //There is no next row...we could automatically add a new row but Phil rather wants me to tell him that a new row could be added
                                    //So I am just going to raise an event to tell him a new row can be added
                                    var fieldName = $(grid.element).data('sysprogridfieldname');
                                    var currentSelectedItem = currentRowIndex + 1 + '|';
                                    var columnDetails = dataItem.toJSON();
                                    $.each(columnDetails, function(key, value) {
                                        //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                        if (
                                            key.indexOf('syscolor') === -1 &&
                                            key.indexOf('sysbgcolor') === -1 &&
                                            key.indexOf('sysdisabled') === -1 &&
                                            key.indexOf('sysdec') === -1
                                        ) {
                                            //Check if the column is a date as we want to return the date in the format that it was given
                                            var columnIsDate = false;
                                            var columnIsComboBox = false;
                                            var columnIsColumnComboBox = false;
                                            //Flag the field if it is a date or combobox
                                            for (i = 0; i < grid.columns.length; i++) {
                                                if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (
                                                    grid.columns[i].field === key &&
                                                    (grid.columns[i].type === 'combo' ||
                                                        grid.columns[i].type === 'radio')
                                                ) {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                            //Check if the column is a date and return it in the correct format
                                            if (columnIsDate) {
                                                currentSelectedItem =
                                                    currentSelectedItem +
                                                    sysproInterop.convertDateForGridOutput(value) +
                                                    '|';
                                            } else if (columnIsComboBox) {
                                                currentSelectedItem = currentSelectedItem + value.key + '|';
                                            } else if (columnIsColumnComboBox) {
                                                currentSelectedItem = currentSelectedItem + value.value + '|';
                                            } else {
                                                currentSelectedItem = currentSelectedItem + value + '|';
                                            }
                                        }
                                    });

                                    sysproInterop.eventTrigged(
                                        fieldName,
                                        'true|' + currentSelectedItem,
                                        '',
                                        '',
                                        'gridCanAddNewRow',
                                        function(e) {},
                                        function(e) {}
                                    );
                                }
                            }
                        }
                    } else {
                        //There is NO next editable cell, see if there is a next row
                        storePreviousRow = currentRow;
                        currentRow = currentRow.next();
                        if (currentRow.length > 0) {
                            //We have a next row
                            currentRowIndex = currentRow.index();
                            currentCell = currentRow.children('.editable-cell:visible:first');
                            currentCellIndex = currentCell[0].cellIndex;
                            grid.select('tr:eq(' + currentRowIndex + ')');
                        } else {
                            //There is no next row...we could automatically add a new row but Phil rather wants me to tell him that a new row could be added
                            //So I am just going to raise an event to tell him a new row can be added
                            var fieldName = $(grid.element).data('sysprogridfieldname');
                            var currentSelectedItem = currentRowIndex + 1 + '|';
                            var columnDetails = dataItem.toJSON();
                            $.each(columnDetails, function(key, value) {
                                //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                if (
                                    key.indexOf('syscolor') === -1 &&
                                    key.indexOf('sysbgcolor') === -1 &&
                                    key.indexOf('sysdisabled') === -1 &&
                                    key.indexOf('sysdec') === -1
                                ) {
                                    //Check if the column is a date as we want to return the date in the format that it was given
                                    var columnIsDate = false;
                                    var columnIsComboBox = false;
                                    var columnIsColumnComboBox = false;
                                    //Flag the field if it is a date or combobox
                                    for (i = 0; i < grid.columns.length; i++) {
                                        if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                            columnIsDate = true;
                                            break;
                                        }
                                        if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                            columnIsComboBox = true;
                                            break;
                                        }
                                        if (
                                            grid.columns[i].field === key &&
                                            (grid.columns[i].type === 'combo' || grid.columns[i].type === 'radio')
                                        ) {
                                            columnIsColumnComboBox = true;
                                            break;
                                        }
                                    }
                                    //Check if the column is a date and return it in the correct format
                                    if (columnIsDate) {
                                        currentSelectedItem =
                                            currentSelectedItem + sysproInterop.convertDateForGridOutput(value) + '|';
                                    } else if (columnIsComboBox) {
                                        currentSelectedItem = currentSelectedItem + value.key + '|';
                                    } else if (columnIsColumnComboBox) {
                                        currentSelectedItem = currentSelectedItem + value.value + '|';
                                    } else {
                                        currentSelectedItem = currentSelectedItem + value + '|';
                                    }
                                }
                            });

                            sysproInterop.eventTrigged(
                                fieldName,
                                'true|' + currentSelectedItem,
                                '',
                                '',
                                'gridCanAddNewRow',
                                function(e) {},
                                function(e) {}
                            );
                        }
                    }
                }

                //Wait for cell to close and Grid to rebind when changes have been made
                setTimeout(function() {
                    grid.editCell(grid.tbody.find('tr:eq(' + currentRowIndex + ') td:eq(' + currentCellIndex + ')'));
                });
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'gridKeyDownEvent');
        }
    },
    refreshGridList: function(dataIn) {
        try {
            var listView = JSON.parse(dataIn.GridData).lv;
            var gridDivs = $('*[data-sysprogridfieldname="' + dataIn.FieldName + '"]');
            var returnRows = 0;
            $.each(gridDivs, function(index) {
                var gridDiv = $(this);
                var sysproPageSize = gridDiv.data('syspropagesize');
                var columnModel = gridDiv.data('sysprogridmodel');
                var dateColumnsHolder = gridDiv.data('sysprogriddates');
                var parseDates = function(data) {
                    $.each(data, function(index, item) {
                        $.each(dateColumnsHolder, function(index) {
                            item[this] = kendo.parseDate(item[this], gridDiv.data('dateformatin'));
                        });
                    });
                    return data;
                };
                var initialGrouping = gridDiv.data('sysproinitialgrouping');
                var initialSorting = gridDiv.data('sysproinitialsorting');
                var initialAggregates = gridDiv.data('sysproinitialaggregates');
                var dataSource = new kendo.data.DataSource({
                    data: listView.rs.r,
                    group: initialGrouping,
                    sort: initialSorting,
                    aggregate: initialAggregates,
                    change: function(e) {
                        if (e.field && e.action == 'itemchange') {
                            //var groupFooterIndex = 0;
                            //var groupFooters = grid.tbody.children(".k-group-footer");
                            //function updateGroupFooters(items) {
                            //    for (var idx = 0; idx < items.length; idx++) {
                            //        var item = items[idx];
                            //        if (item.hasSubgroups) {
                            //            updateGroupFooters(item.items);
                            //        }
                            //        groupFooters.eq(groupFooterIndex).replaceWith(grid.groupFooterTemplate(item.aggregates));
                            //        groupFooterIndex++;
                            //    }
                            //}
                            //updateGroupFooters(this.view());
                            //grid.footer.find(".k-footer-template").replaceWith(grid.footerTemplate(this.aggregates()));
                        }
                    },
                    pageSize: sysproPageSize,
                    schema: {
                        parse: function(data) {
                            return parseDates(data);
                        },
                        model: {
                            fields: columnModel,
                        },
                    }, //used for editable grids
                });
                //Get the grid and Grid Options
                var grid = gridDiv.data('kendoGrid');
                var gridSort;
                //First check if the grid has actually been initialized
                if (grid) {
                    var gridOptions = grid.getOptions();
                    //get toolbar html....because the setOptions recreates the toolbar
                    var currentToolbar = $('.k-grid-toolbar', gridDiv).html();
                    //Store the current grid Sort state
                    gridSort = grid.dataSource.sort();

                    //Cater for hyperlinks in the cells of the grid, to handle an onclick event
                    if (listView.cls && listView.cls.cl) {
                        //Loop through each item in cls/cl, get the column name and event number
                        for (i = 0; i < listView.cls.cl.length; i++) {
                            var linkColumnName = listView.cls.cl[i].col;
                            var linkColumnEvent = listView.cls.cl[i].event;
                            //Loop through the columns in the grid for each of the hyperlink columns
                            for (j = 0; j < gridOptions.columns.length; j++) {
                                if (linkColumnName === gridOptions.columns[j].field) {
                                    //If the column is boolean or date don't hyperlink it
                                    if (
                                        gridOptions.columns[j].type === 'boolean' ||
                                        gridOptions.columns[j].type === 'date'
                                    )
                                        break;
                                    var defaultTemplate = '#=' + linkColumnName + '#';
                                    if (gridOptions.columns[j].template) {
                                        defaultTemplate = gridOptions.columns[j].template;
                                    }
                                    gridOptions.columns[j].template =
                                        '<div class="syspro-grid-row-hyperlink" data-eventnum="' +
                                        gridOptions.columns[j].field +
                                        '|' +
                                        linkColumnEvent +
                                        '">' +
                                        defaultTemplate +
                                        '</div>';
                                    break;
                                }
                            }
                        }
                        //Now that we have updated the template for the sysCellClick event set the options and update the toolbar(this contains checked and disabled properties)
                        gridOptions.toolbar = currentToolbar;
                        grid.setOptions(gridOptions);
                    }

                    //Check if we want to append data to the grid that already has data in it
                    if (dataIn.IsAppend === true) {
                        //If we in here then there is a grid and we want to append
                        //For perf issues, get what is in the grid and append
                        var currentLinesInGrid = grid.dataSource.data().toJSON();
                        var newLinesToAppend = currentLinesInGrid.concat(listView.rs.r);
                        dataSource = new kendo.data.DataSource({
                            data: newLinesToAppend,
                            sort: gridSort,
                            group: initialGrouping,
                            sort: initialSorting,
                            aggregate: initialAggregates,
                            pageSize: sysproPageSize,
                            schema: {
                                parse: function(data) {
                                    return parseDates(data);
                                },
                                model: {
                                    fields: columnModel,
                                },
                            }, //used for editable grids
                        });
                    } else {
                        dataSource = new kendo.data.DataSource({
                            data: listView.rs.r,
                            sort: gridSort,
                            group: initialGrouping,
                            sort: initialSorting,
                            aggregate: initialAggregates,
                            pageSize: sysproPageSize,
                            schema: {
                                parse: function(data) {
                                    return parseDates(data);
                                },
                                model: { fields: columnModel },
                            }, //used for editable grids
                        });
                    }
                    grid.setDataSource(dataSource);

                    //If this is an editable grid, get the last row and begin edit on the first editable cell
                    if (dataIn.IsAppend === true) {
                        if (grid.options.editable.createAt === 'bottom') {
                            var lastRow = grid.tbody.children().last();
                            if (lastRow && lastRow.length) {
                                var cellIndex = $('.editable-cell', lastRow[0]).index();
                                if (cellIndex >= 0) {
                                    lastRow.data('sysignorerowselectedevent', true);
                                    grid.select(lastRow);
                                    grid.editCell(
                                        grid.tbody.find('tr:eq(' + lastRow.index() + ') td:eq(' + cellIndex + ')')
                                    );
                                }
                            }
                        }
                    }

                    //After the grid is populated raise an event back to the infrastructure returning the number of rows
                    returnRows = grid.dataSource.total();
                    sysproInterop.applyCheckBoxContentChangeEvent(gridDiv);

                    //Handle key strokes on Editable Grids
                    if (grid.options.editable.createAt === 'bottom') {
                        gridDiv.find('table').off('keydown');
                        gridDiv.find('table').on('keydown', sysproInterop.gridEditableKeyDown);
                    }
                }

                //Get the has hidden rows flag
                var sysprohashiddenrows = gridDiv.data('sysprohashiddenrows');
                if (sysprohashiddenrows) {
                    var hiddenRows = { logic: 'and', filters: [] };
                    hiddenRows.filters.push({
                        field: 'syshidden',
                        operator: 'neq',
                        value: true,
                    });
                    grid.dataSource.filter(hiddenRows);
                }
            });
            return returnRows;
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'refreshGridList');
        }
    },
    applyCheckBoxContentChangeEvent: function(gridDiv) {
        try {
            //This function is to support editable checkbox checked/unchecked events
            $('.k-grid-content', gridDiv.closest('.noBorderTable')).off('change', 'input.sysEditGridCheckBox');
            $('.k-grid-content', gridDiv.closest('.noBorderTable')).on('change', 'input.sysEditGridCheckBox', function(
                e
            ) {
                var grid = gridDiv.data('kendoGrid');

                //Only do this if the grid is enabled
                if (gridDiv.data('sysproentrygriddisabled') !== true) {
                    //Get the current dataItem
                    var currentDataItem = grid.dataItem($(e.target).closest('tr'));
                    grid.select(currentDataItem);
                    //Get the row and Column index
                    var row = $(e.target).closest('tr');
                    var dsRowIndex = grid.dataSource.indexOf(currentDataItem);

                    var rowIdx = $('tr', grid.tbody).index(row);
                    var colIdx = $('td', row).index(e.target.parentElement);
                    //If the grid is currently group remove 1 from colIndex
                    if (grid._group === true) {
                        colIdx = colIdx - 1;
                    }

                    var colName = grid.columns[colIdx].field;
                    //Set the value of the checkbox, do it this way instead of the normal set
                    currentDataItem[colName] = this.checked;
                    //Select and highlight the current row
                    grid.select('tr:eq(' + rowIdx + ')');

                    currentDataItem = grid.dataSource.data()[dsRowIndex];
                    dsRowIndex++;
                    rowIdx++;

                    //Is this the last row we are editing
                    var isLastRow = false;
                    if (rowIdx == grid.dataSource.total()) {
                        isLastRow = true;
                    }

                    var returnChangeEventData = dsRowIndex + '|' + isLastRow + '|' + colName + '|' + this.checked + '|';

                    //Now return the values of each cell
                    if (currentDataItem !== null) {
                        var columnDetails = currentDataItem.toJSON();
                        $.each(columnDetails, function(key, value) {
                            //If the node key starts with "syscolor" or "sysbgcolor" don't output
                            if (
                                key.indexOf('syscolor') === -1 &&
                                key.indexOf('sysbgcolor') === -1 &&
                                key.indexOf('sysdisabled') === -1 &&
                                key.indexOf('sysdec') === -1
                            ) {
                                //Check if the column is a date as we want to return the date in the format that it was given
                                var columnIsDate = false;
                                var columnIsComboBox = false;
                                var columnIsColumnComboBox = false;
                                //Flag the field if it is a date or combobox
                                for (i = 0; i < grid.columns.length; i++) {
                                    if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                        columnIsDate = true;
                                        break;
                                    }
                                    if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                        columnIsComboBox = true;
                                        break;
                                    }
                                    if (
                                        grid.columns[i].field === key &&
                                        (grid.columns[i].type === 'combo' || grid.columns[i].type === 'radio')
                                    ) {
                                        columnIsColumnComboBox = true;
                                        break;
                                    }
                                }
                                //Check if the column is a date and return it in the correct format
                                if (columnIsDate) {
                                    returnChangeEventData =
                                        returnChangeEventData + sysproInterop.convertDateForGridOutput(value) + '|';
                                } else if (columnIsComboBox) {
                                    returnChangeEventData = returnChangeEventData + value.key + '|';
                                } else if (columnIsColumnComboBox) {
                                    returnChangeEventData = returnChangeEventData + value.value + '|';
                                } else {
                                    returnChangeEventData = returnChangeEventData + value + '|';
                                }
                            }
                        });
                    }

                    var fieldName = gridDiv.data('sysprogridfieldname');
                    //Raise the event up to SYSPRO
                    sysproInterop.eventTrigged(fieldName, returnChangeEventData, '', '', 'gridCellChanged', function(
                        e
                    ) {});

                    //check if I need to update the header
                    sysproInterop.gridAutoCheckGridColumnHeader(gridDiv);
                } else {
                    //Undo the check or check because the grid is disabled
                    var checkValue = e.target.checked;
                    checkValue = !checkValue;
                    e.target.checked = checkValue;
                }
            });

            //Handle the Checkbox Header check event
            $('.header-checkbox', gridDiv.closest('.noBorderTable')).off('click');
            $('.header-checkbox', gridDiv.closest('.noBorderTable')).on('click', function(ev) {
                ev.stopPropagation();
                var columnName = ev.target.getAttribute('data-columnname');
                var columnChecked = ev.target.checked;
                //Only do this if the grid is enabled
                if (gridDiv.data('sysproentrygriddisabled') !== true) {
                    var grid = gridDiv.data('kendoGrid');
                    $.each(grid.dataSource.data(), function(rowIndex) {
                        var dataItem = grid.dataSource.at(rowIndex);
                        if (grid.options.editable.mode === 'incell') {
                            dataItem[columnName] = columnChecked;
                        } else {
                            dataItem.set(columnName, columnChecked);
                        }
                    });
                    grid.refresh();
                    returnChangeEventData = columnName + '|' + columnChecked;
                    var fieldName = gridDiv.data('sysprogridfieldname');
                    sysproInterop.eventTrigged(fieldName, returnChangeEventData, '', '', 'gridHeaderChecked', function(
                        e
                    ) {});
                    //Set the checkbox to the value it was, the grid.refresh, re-paints the checkbox
                    setTimeout(function() {
                        ev.target.checked = ev.target.checked;
                    });
                } else {
                    //Undo the check or check because the grid is disabled
                    var checkValue = ev.target.checked;
                    checkValue = !checkValue;
                    ev.target.checked = checkValue;
                }
            });
            sysproInterop.gridAutoCheckGridColumnHeader(gridDiv);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'applyContentChangeEvent');
        }
    },
    //This functions gets called to check if ALL the checkboxes across all the columns should be checked
    gridAutoCheckGridColumnHeader: function(gridDiv) {
        if (gridDiv) {
            var grid = gridDiv.data('kendoGrid');
            if (grid) {
                var gridColumns = grid.columns;
                var gridColumnsResults = $.grep(gridColumns, function(d) {
                    return d['showInCheckBoxHeader'] === true;
                });
                //Do we have any columns headers with a checkbox
                if (gridColumnsResults) {
                    if (gridColumnsResults.length > 0) {
                        for (i = 0; i < gridColumnsResults.length; i++) {
                            var checkBoxColumn = $(
                                "input[data-columnname='" + gridColumnsResults[i].field + "']",
                                gridDiv.closest('.noBorderTable')
                            );
                            if (checkBoxColumn) {
                                if (checkBoxColumn[0]) {
                                    //get the datasource and check if there are any rows that unchecked
                                    var gridData = grid.dataSource.data();
                                    if (gridData.length > 0) {
                                        //Find all rows that are false
                                        var matchingResults = $.grep(gridData, function(d) {
                                            return d[gridColumnsResults[i].field] === false;
                                        });
                                        if (matchingResults) {
                                            //If there are no false rows check the header checkbox
                                            if (matchingResults.length == 0) {
                                                checkBoxColumn[0].checked = true;
                                            } else {
                                                checkBoxColumn[0].checked = false;
                                            }
                                        }
                                    } else {
                                        checkBoxColumn[0].checked = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    requestGridListsRefresh: function(elementIn) {
        if ($('.syspro-grid-list', elementIn).length > 0) {
            $.each($('.syspro-grid-list', elementIn), function(index) {
                var sysprogridfieldname = $(this).data('sysprogridfieldname');
                //TODO: Call SYSPRO to request that a grid list be refreshed.
                sysproInterop.eventTrigged(sysprogridfieldname, '', '', '', 'requestGridListRefresh', function(e) {});
            });
        }
    },
    //When a hyperlink inside a grid is clicked
    sysCellClick: function(item) {
        //Get the event number
        var eventNumber = $(item).data('eventnum');
        //Do this check because the DisableHyperlink event could have been called, if it is called don't exit the functions
        if (item.className === 'syspro-grid-row-hyperlink') {
            //Based on the item, get the grid
            var gridDiv = $(item).closest('.syspro-grid-list');
            var grid = gridDiv.data('kendoGrid');
            var fieldName = gridDiv.data('sysprogridfieldname');
            var row = grid.dataItem($(item).closest('tr'));
            var rowTr = $(item).closest('tr');
            rowTr.data('sysignorerowselectedevent', true);
            var columnDetails = row.toJSON();

            var dsRowIndex = grid.dataSource.indexOf(row);

            //First we have to fire the selected row event
            var currentSelectedItem = dsRowIndex + 1 + '|';

            var currentDataItem = row;
            if (currentDataItem !== null) {
                $.each(columnDetails, function(key, value) {
                    //If the node key starts with "syscolor" or "sysbgcolor" don't output
                    if (
                        key.indexOf('syscolor') === -1 &&
                        key.indexOf('sysbgcolor') === -1 &&
                        key.indexOf('sysdisabled') === -1 &&
                        key.indexOf('sysdec') === -1
                    ) {
                        //Check if the column is a date as we want to return the date in the format that it was given
                        var columnIsDate = false;
                        var columnIsComboBox = false;
                        var columnIsColumnComboBox = false;
                        //Flag the field if it is a date or combobox
                        for (i = 0; i < grid.columns.length; i++) {
                            if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                columnIsDate = true;
                                break;
                            }
                            if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                columnIsComboBox = true;
                                break;
                            }
                            if (
                                grid.columns[i].field === key &&
                                (grid.columns[i].type === 'combo' || grid.columns[i].type === 'radio')
                            ) {
                                columnIsColumnComboBox = true;
                                break;
                            }
                        }
                        //Check if the column is a date and return it in the correct format
                        if (columnIsDate) {
                            currentSelectedItem =
                                currentSelectedItem + sysproInterop.convertDateForGridOutput(value) + '|';
                        } else if (columnIsComboBox) {
                            currentSelectedItem = currentSelectedItem + value.key + '|';
                        } else if (columnIsColumnComboBox) {
                            currentSelectedItem = currentSelectedItem + value.value + '|';
                        } else {
                            currentSelectedItem = currentSelectedItem + value + '|';
                        }
                    }
                });
                sysproInterop.eventTrigged(
                    fieldName,
                    currentSelectedItem,
                    '',
                    '',
                    'gridRowSelected',
                    function(e) {
                        //After we call gridrowSelected raise the
                        //Now raise the grid hyperlink clicked
                        var sysCellClickResult = eventNumber + '|';
                        $.each(columnDetails, function(key, value) {
                            //If the node key starts with "syscolor" or "sysbgcolor" don't output
                            if (
                                key.indexOf('syscolor') === -1 &&
                                key.indexOf('sysbgcolor') === -1 &&
                                key.indexOf('sysdisabled') === -1 &&
                                key.indexOf('sysdec') === -1
                            ) {
                                //Check if the column is a date as we want to return the date in the format that it was given
                                var columnIsDate = false;
                                var columnIsComboBox = false;
                                var columnIsColumnComboBox = false;
                                //Flag the field if it is a date or combobox
                                for (i = 0; i < grid.columns.length; i++) {
                                    if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                        columnIsDate = true;
                                        break;
                                    }
                                    if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                        columnIsComboBox = true;
                                        break;
                                    }
                                    if (
                                        grid.columns[i].field === key &&
                                        (grid.columns[i].type === 'combo' || grid.columns[i].type === 'radio')
                                    ) {
                                        columnIsColumnComboBox = true;
                                        break;
                                    }
                                }
                                //Check if the column is a date and return it in the correct format
                                if (columnIsDate) {
                                    sysCellClickResult =
                                        sysCellClickResult + sysproInterop.convertDateForGridOutput(value) + '|';
                                } else if (columnIsComboBox) {
                                    sysCellClickResult = sysCellClickResult + value.key + '|';
                                } else if (columnIsColumnComboBox) {
                                    sysCellClickResult = sysCellClickResult + value.value + '|';
                                } else {
                                    sysCellClickResult = sysCellClickResult + value + '|';
                                }
                            }
                        });
                        sysproInterop.eventTrigged(
                            fieldName,
                            sysCellClickResult,
                            '',
                            '',
                            'gridHyperlinkClicked',
                            function(e) {},
                            function(e) {}
                        );
                        grid.select(row);
                    },
                    function(e) {}
                );
            }
        }
    },
    //Grid RowSelection changed
    gridRowSelected: function(e) {
        var grid = e.sender;
        var gridDiv = e.sender.element;
        var fieldName = gridDiv.data('sysprogridfieldname');
        var selectedRow = this.select();

        //Work out if an existing row has been selected
        var lastGridSelection = gridDiv.data('sysprolastgridselection');
        var currentGridSelection = e.sender.select().attr('data-uid');

        if (lastGridSelection != currentGridSelection) {
            lastGridSelection = currentGridSelection;
            gridDiv.data('sysprolastgridselection', lastGridSelection);
            var currentSelectedItem = selectedRow.index() + 1 + '|';
            if (grid !== null) {
                var currentDataItem = grid.dataItem(this.select());
                if (currentDataItem !== null) {
                    var columnDetails = currentDataItem.toJSON();
                    $.each(columnDetails, function(key, value) {
                        //If the node key starts with "syscolor" or "sysbgcolor" don't output
                        if (
                            key.indexOf('syscolor') === -1 &&
                            key.indexOf('sysbgcolor') === -1 &&
                            key.indexOf('sysdisabled') === -1 &&
                            key.indexOf('sysdec') === -1
                        ) {
                            //Check if the column is a date as we want to return the date in the format that it was given
                            var columnIsDate = false;
                            var columnIsComboBox = false;
                            var columnIsColumnComboBox = false;
                            //Flag the field if it is a date or combobox
                            for (i = 0; i < grid.columns.length; i++) {
                                if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                    columnIsDate = true;
                                    break;
                                }
                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                    columnIsComboBox = true;
                                    break;
                                }
                                if (
                                    grid.columns[i].field === key &&
                                    (grid.columns[i].type === 'combo' || grid.columns[i].type === 'radio')
                                ) {
                                    columnIsColumnComboBox = true;
                                    break;
                                }
                            }
                            //Check if the column is a date and return it in the correct format
                            if (columnIsDate) {
                                currentSelectedItem =
                                    currentSelectedItem + sysproInterop.convertDateForGridOutput(value) + '|';
                            } else if (columnIsComboBox) {
                                currentSelectedItem = currentSelectedItem + value.key + '|';
                            } else if (columnIsColumnComboBox) {
                                currentSelectedItem = currentSelectedItem + value.value + '|';
                            } else {
                                currentSelectedItem = currentSelectedItem + value + '|';
                            }
                        }
                    });
                    //Check if i must ignore the row selected event, this could come from command delete button click
                    if (selectedRow.data('sysignorerowselectedevent') === true) {
                        selectedRow.data('sysignorerowselectedevent', false);
                    } else {
                        sysproInterop.eventTrigged(
                            fieldName,
                            currentSelectedItem,
                            '',
                            '',
                            'gridRowSelected',
                            function(e) {},
                            function(e) {}
                        );
                    }
                }
            }
        }
    },
    //Internal events that will be called from SYSPRO, GetSelectedRow, getSize, etc
    gridRequestInternalEvent: function(dataIn) {
        try {
            //Get the gridDiv
            //RH: So these requests should give priority to visible grids.
            var gridDivs = $('*[data-sysprogridfieldname="' + dataIn.FieldName + '"]:visible');
            if (gridDivs.length === 0) {
                //RH: If however there are no visible grids then fall back on one that isn't visible so things continue working as usual.
                gridDivs = $('*[data-sysprogridfieldname="' + dataIn.FieldName + '"]');
            }
            var currentSelectedItem = '';
            var dataItem;
            var SplitInternalEventParameter;
            if (gridDivs.length > 0 || dataIn.InternalEvent === 'GetGridLayoutsChanged') {
                //Get the grid
                var grid = gridDivs.data('kendoGrid');
                //Perform looser null check for uninitialized grids.
                if (grid || dataIn.InternalEvent === 'GetGridLayoutsChanged') {
                    switch (dataIn.InternalEvent) {
                        //GetSelectedRow
                        case 'GetSelectedRow':
                            currentSelectedItem = 'false'; //Set this to false
                            if (grid.dataItem !== null) {
                                var selectedItem = grid.dataItem(grid.select());
                                if (selectedItem !== null) {
                                    currentSelectedItem = grid.select().index() + 1 + '|';
                                    var columnDetails = selectedItem.toJSON();
                                    $.each(columnDetails, function(key, value) {
                                        //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                        if (
                                            key.indexOf('syscolor') === -1 &&
                                            key.indexOf('sysbgcolor') === -1 &&
                                            key.indexOf('sysdisabled') === -1 &&
                                            key.indexOf('sysdec') === -1
                                        ) {
                                            //Check if the column is a date as we want to return the date in the format that it was given
                                            var columnIsDate = false;
                                            var columnIsComboBox = false;
                                            var columnIsColumnComboBox = false;
                                            //Flag the field if it is a date or combobox
                                            for (i = 0; i < grid.columns.length; i++) {
                                                if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (
                                                    grid.columns[i].field === key &&
                                                    (grid.columns[i].type === 'combo' ||
                                                        grid.columns[i].type === 'radio')
                                                ) {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                            //Check if the column is a date and return it in the correct format
                                            if (columnIsDate) {
                                                currentSelectedItem =
                                                    currentSelectedItem +
                                                    sysproInterop.convertDateForGridOutput(value) +
                                                    '|';
                                            } else if (columnIsComboBox) {
                                                currentSelectedItem = currentSelectedItem + value.key + '|';
                                            } else if (columnIsColumnComboBox) {
                                                currentSelectedItem = currentSelectedItem + value.value + '|';
                                            } else {
                                                currentSelectedItem = currentSelectedItem + value + '|';
                                            }
                                        }
                                    });
                                }
                            }
                            break;
                        //Size get the total size of the Grid
                        case 'Size':
                            currentSelectedItem = grid.dataSource.total() + '|';
                            break;
                        //Checks or unchecks a checkbox in a specific cell for the selected row
                        //dataIn.InternalEventParameter = "a1|true" a1 is the column name and true/false is the value to be set
                        case 'SetCheckMarkOnColumnMatch':
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data('kendoGrid');
                                SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                                //SplitInternalEventParameter[0] , the name of the checkbox. a001
                                //SplitInternalEventParameter[1] , value that the checkbox must be set to. true/false
                                //SplitInternalEventParameter[2] , name of the column the check must be done on
                                //SplitInternalEventParameter[3] , value of the column the check must be done on
                                //Get the boolean value
                                var valueToUpdate;
                                if (SplitInternalEventParameter[1] === 'true') {
                                    valueToUpdate = true;
                                } else {
                                    valueToUpdate = false;
                                }
                                //Check if the column is a Boolean column
                                var isBoolean = false;
                                var itemCellIndex = 0;
                                for (j = 0; j < grid.columns.length; j++) {
                                    if (grid.columns[j].field === SplitInternalEventParameter[0]) {
                                        itemCellIndex = j;
                                        if (grid.columns[j].type === 'boolean') {
                                            isBoolean = true;
                                        }
                                        break;
                                    }
                                }
                                if (isBoolean) {
                                    var columnToMatch = SplitInternalEventParameter[2];
                                    var valueToMatch = SplitInternalEventParameter[3];
                                    var gridData = grid.dataSource.data();

                                    var matchingResults = $.grep(gridData, function(d) {
                                        return d[columnToMatch] === valueToMatch;
                                    });
                                    if (matchingResults) {
                                        if (matchingResults.length > 0) {
                                            for (var i = 0; i < matchingResults.length; i++) {
                                                //Set the value
                                                matchingResults[i].set(SplitInternalEventParameter[0], valueToUpdate);

                                                //If it is a boolean and an editable grid fors the change trigger, otherwise the checkbox doesn't get updated
                                                if (grid.options.editable.mode === 'incell') {
                                                    matchingResults[i][SplitInternalEventParameter[0]] = valueToUpdate;
                                                }
                                            }
                                            grid.refresh();
                                        }
                                    }
                                }
                            });
                            break;
                        case 'SetSelectedCheckMark':
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data('kendoGrid');
                                SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                                //Get the boolean value
                                var valueToUpdate;
                                if (SplitInternalEventParameter[1] === 'true') {
                                    valueToUpdate = true;
                                } else {
                                    valueToUpdate = false;
                                }
                                //Check if the column is a Boolean column
                                var isBoolean = false;
                                var itemCellIndex = 0;
                                for (j = 0; j < grid.columns.length; j++) {
                                    if (grid.columns[j].field === SplitInternalEventParameter[0]) {
                                        itemCellIndex = j;
                                        if (grid.columns[j].type === 'boolean') {
                                            isBoolean = true;
                                        }
                                        break;
                                    }
                                }
                                //Only if this is boolean do the work
                                if (isBoolean) {
                                    //Get the selected row
                                    var selectedItem = grid.dataItem(grid.select());
                                    if (selectedItem) {
                                        //Get the selected item
                                        var itemRowNumber = grid.select().index() + 1;
                                        //Set the value
                                        selectedItem.set(SplitInternalEventParameter[0], valueToUpdate);

                                        selectedItem.dirtyFields = {};
                                        selectedItem.dirty = false;

                                        //If it is a boolean and an editable grid fors the change trigger, otherwise the checkbox doesn't get updated
                                        if (isBoolean === true && grid.options.editable.mode === 'incell') {
                                            selectedItem[SplitInternalEventParameter[0]] = valueToUpdate;
                                        }

                                        //Flag the row as being changed
                                        var changedRowsEvent = gridDiv.data('sysprogridchangedrows');
                                        if (changedRowsEvent.indexOf(itemRowNumber) === -1) {
                                            changedRowsEvent.push(itemRowNumber);
                                            gridDiv.data('sysprogridchangedrows', changedRowsEvent);
                                        }
                                        grid.refresh();
                                        itemRowNumber = itemRowNumber - 1;
                                        grid.select('tr:not(.k-grouping-row):eq(' + itemRowNumber + ')');
                                    }
                                }
                            });
                            break;
                        //Gets the value of a specified cell
                        //dataIn.InternalEventParameter = "4|a1" where 4 is the row number and a1 is the column name
                        case 'GetCellValue':
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            dataItem = grid.dataSource.data()[SplitInternalEventParameter[0]];
                            if (dataItem !== null) {
                                currentSelectedItem = dataItem.get(SplitInternalEventParameter[1]) + '|';
                            }
                            break;
                        //Gets the state of the specified checkbox
                        //dataIn.InternalEventParameter = "4|a1|value|true" where 4 is the row number and a1 is the column name and the value to be updated
                        case 'SetCellValue':
                            //For  set cell value this must be performed  for  each grid.
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data('kendoGrid');
                                SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                                var itemRowNumber = SplitInternalEventParameter[0] - 1;
                                var valueToUpdate;
                                if (grid) {
                                    dataItem = grid.dataSource.data()[itemRowNumber];
                                    if (dataItem !== null) {
                                        if (SplitInternalEventParameter[2] === 'true') {
                                            valueToUpdate = true;
                                        } else if (SplitInternalEventParameter[2] === 'false') {
                                            valueToUpdate = false;
                                        } else {
                                            valueToUpdate = SplitInternalEventParameter[2];
                                        }
                                        dataItem.set(SplitInternalEventParameter[1], valueToUpdate);
                                        dataItem.dirtyFields = {};
                                        dataItem.dirty = false;

                                        //Now make sure we remove the dirty indicator
                                        var itemCellIndex = 0;
                                        var isBoolean = false;
                                        //Now get the cell index
                                        for (j = 0; j < grid.columns.length; j++) {
                                            if (grid.columns[j].field === SplitInternalEventParameter[1]) {
                                                itemCellIndex = j;
                                                if (grid.columns[j].type === 'boolean') {
                                                    isBoolean = true;
                                                }
                                                break;
                                            }
                                        }

                                        //If it is a boolean and an editable grid fors the change trigger, otherwise the checkbox doesn't get updated
                                        if (isBoolean === true && grid.options.editable.mode === 'incell') {
                                            dataItem[SplitInternalEventParameter[1]] = valueToUpdate;
                                        }
                                        //Flag the row as being changed
                                        var changedRowsEvent = gridDiv.data('sysprogridchangedrows');
                                        if (changedRowsEvent.indexOf(itemRowNumber) === -1) {
                                            changedRowsEvent.push(itemRowNumber);
                                            gridDiv.data('sysprogridchangedrows', changedRowsEvent);
                                        }

                                        var item = grid.dataSource.data()[itemRowNumber];
                                        var rowTr = grid.table.find("tr[data-uid='" + item.uid + "']");
                                        var colTd = rowTr.find('td:eq(' + itemCellIndex + ')');
                                        if (colTd.hasClass('k-dirty-cell')) {
                                            colTd.removeClass('k-dirty-cell');
                                            if (colTd[0].childNodes[0]) {
                                                if (colTd[0].childNodes[0].className === 'k-dirty') {
                                                    colTd[0].childNodes[0].remove();
                                                }
                                            }
                                        }
                                        //Do a begin edit
                                        if (SplitInternalEventParameter.length > 2) {
                                            if (SplitInternalEventParameter[3] === 'true') {
                                                grid.editCell(
                                                    grid.tbody.find(
                                                        'tr:eq(' + itemRowNumber + ') td:eq(' + itemCellIndex + ')'
                                                    )
                                                );
                                                grid.select();
                                                rowTr.addClass('k-state-selected'); //Show row as selected
                                            }
                                        }
                                    }
                                }
                                grid.refresh();
                                //call this to update the totals, but only do it if we have totals
                                if (isBoolean === false) {
                                    initialAggregates = gridDiv.data('sysproinitialaggregates');
                                    if (initialAggregates) {
                                        grid.dataSource.fetch();
                                    }
                                }
                            });
                            break;
                        case 'SetCellValueKeepDirty':
                            //For  set cell value this must be performed  for  each grid.
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data('kendoGrid');
                                if (grid) {
                                    SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                                    var itemRowNumber = SplitInternalEventParameter[0] - 1;
                                    dataItem = grid.dataSource.data()[itemRowNumber];
                                    if (dataItem !== null) {
                                        dataItem.set(SplitInternalEventParameter[1], SplitInternalEventParameter[2]);
                                    }
                                    var rowIndex = SplitInternalEventParameter[0];
                                    var cellIndex = SplitInternalEventParameter[3];
                                    setTimeout(function() {
                                        grid.editCell(
                                            grid.tbody.find('tr:eq(' + itemRowNumber + ') td:eq(' + cellIndex + ')')
                                        );
                                        var rowTr = grid.table.find("tr[data-uid='" + dataItem.uid + "']");
                                        rowTr.addClass('k-state-selected'); //Show row as selected
                                    });
                                }
                            });
                            break;
                        case 'SetHeaders':
                            var setHeaderDetails = JSON.parse(dataIn.InternalEventParameter);
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data('kendoGrid');
                                if (grid) {
                                    var gridOptions = grid.getOptions();
                                    if (gridOptions) {
                                        $.each(setHeaderDetails.lv.cs.c, function(mycs) {
                                            var columnName = setHeaderDetails.lv.cs.c[mycs].field;
                                            var columnValue = setHeaderDetails.lv.cs.c[mycs].title;
                                            for (j = 0; j < gridOptions.columns.length; j++) {
                                                if (gridOptions.columns[j].field === columnName) {
                                                    gridOptions.columns[j].title = columnValue;
                                                    break;
                                                }
                                            }
                                        });
                                        grid.setOptions(gridOptions);
                                    }
                                }
                            });
                            break;
                        case 'FilterColumns':
                            var setFilterColumns = JSON.parse(dataIn.InternalEventParameter);
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data('kendoGrid');
                                if (grid) {
                                    grid.dataSource.filter(setFilterColumns);
                                }
                            });
                            break;
                        case 'GetGridRow':
                            var rowIndex = dataIn.InternalEventParameter;
                            rowIndex = rowIndex - 1; //Subtract 1 from row index as SYSPRO's grids are 1 based
                            var rowItem = grid.dataSource.at(rowIndex);
                            if (rowItem) {
                                var columnDetails = grid.columns;
                                currentSelectedItem = dataIn.InternalEventParameter + '|';
                                $.each(rowItem, function(key, value) {
                                    //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                    if (
                                        key.indexOf('syscolor') === -1 &&
                                        key.indexOf('sysbgcolor') === -1 &&
                                        key.indexOf('sysdisabled') === -1 &&
                                        key.indexOf('sysdec') === -1
                                    ) {
                                        var columnFound = false;
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        var columnIsColumnComboBox = false;
                                        //Flag the field if it is a date or combobox
                                        for (i = 0; i < grid.columns.length; i++) {
                                            if (grid.columns[i].field === key) {
                                                columnFound = true;
                                                if (grid.columns[i].type === 'date') {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (
                                                    grid.columns[i].type === 'combo' ||
                                                    grid.columns[i].type === 'radio'
                                                ) {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (columnFound === true) {
                                        //Append the column data
                                        if (columnIsDate === true) {
                                            currentSelectedItem =
                                                currentSelectedItem +
                                                sysproInterop.convertDateForGridOutput(value) +
                                                '|';
                                        } else if (columnIsComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.key + '|';
                                        } else if (columnIsColumnComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.value + '|';
                                        } else {
                                            currentSelectedItem = currentSelectedItem + value + '|';
                                        }
                                    } else {
                                        if (key === 'syshidden') {
                                            currentSelectedItem = currentSelectedItem + 'syshidden|';
                                        }
                                    }
                                });
                            }
                            break;
                        case 'GetAllGridRows':
                            var allGridRows = '';
                            currentSelectedItem = '';
                            $.each(grid.dataSource.data(), function(rowIndex) {
                                var rowItem = grid.dataSource.at(rowIndex);
                                var oneBaseIndex = rowIndex + 1;
                                currentSelectedItem = oneBaseIndex + '|';
                                $.each(rowItem, function(key, value) {
                                    //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                    if (
                                        key.indexOf('syscolor') === -1 &&
                                        key.indexOf('sysbgcolor') === -1 &&
                                        key.indexOf('sysdisabled') === -1 &&
                                        key.indexOf('sysdec') === -1
                                    ) {
                                        var columnFound = false;
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        var columnIsColumnComboBox = false;
                                        //Flag the field if it is a date or combobox
                                        for (i = 0; i < grid.columns.length; i++) {
                                            if (grid.columns[i].field === key) {
                                                columnFound = true;
                                                if (grid.columns[i].type === 'date') {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (
                                                    grid.columns[i].type === 'combo' ||
                                                    grid.columns[i].type === 'radio'
                                                ) {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (columnFound === true) {
                                        //Append the column data
                                        if (columnIsDate === true) {
                                            currentSelectedItem =
                                                currentSelectedItem +
                                                sysproInterop.convertDateForGridOutput(value) +
                                                '|';
                                        } else if (columnIsComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.key + '|';
                                        } else if (columnIsColumnComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.value + '|';
                                        } else {
                                            currentSelectedItem = currentSelectedItem + value + '|';
                                        }
                                    } else {
                                        if (key === 'syshidden') {
                                            currentSelectedItem = currentSelectedItem + 'syshidden|';
                                        }
                                    }
                                });
                                //Add the row
                                allGridRows = allGridRows + currentSelectedItem + '\r\n';
                            });
                            currentSelectedItem = allGridRows;
                            break;
                        case 'GetAllChangedGridRows':
                            var allGridRows = '';
                            currentSelectedItem = '';
                            var changedRows = gridDivs.data('sysprogridchangedrows');
                            if (changedRows) {
                                $.each(changedRows, function(rowIndex) {
                                    var rowItem = grid.dataSource.at(this);
                                    var oneBaseIndex = this + 1;
                                    currentSelectedItem = oneBaseIndex + '|';
                                    $.each(rowItem, function(key, value) {
                                        //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                        if (
                                            key.indexOf('syscolor') === -1 &&
                                            key.indexOf('sysbgcolor') === -1 &&
                                            key.indexOf('sysdisabled') === -1 &&
                                            key.indexOf('sysdec') === -1
                                        ) {
                                            var columnFound = false;
                                            var columnIsDate = false;
                                            var columnIsComboBox = false;
                                            var columnIsColumnComboBox = false;
                                            //Flag the field if it is a date or combobox
                                            for (i = 0; i < grid.columns.length; i++) {
                                                if (grid.columns[i].field === key) {
                                                    columnFound = true;
                                                    if (grid.columns[i].type === 'date') {
                                                        columnIsDate = true;
                                                        break;
                                                    }
                                                    if (grid.columns[i].isCombbox) {
                                                        columnIsComboBox = true;
                                                        break;
                                                    }
                                                    if (
                                                        grid.columns[i].type === 'combo' ||
                                                        grid.columns[i].type === 'radio'
                                                    ) {
                                                        columnIsColumnComboBox = true;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        if (columnFound === true) {
                                            //Append the column data
                                            if (columnIsDate === true) {
                                                currentSelectedItem =
                                                    currentSelectedItem +
                                                    sysproInterop.convertDateForGridOutput(value) +
                                                    '|';
                                            } else if (columnIsComboBox) {
                                                currentSelectedItem = currentSelectedItem + value.key + '|';
                                            } else if (columnIsColumnComboBox) {
                                                currentSelectedItem = currentSelectedItem + value.value + '|';
                                            } else {
                                                currentSelectedItem = currentSelectedItem + value + '|';
                                            }
                                        } else {
                                            if (key === 'syshidden') {
                                                currentSelectedItem = currentSelectedItem + 'syshidden|';
                                            }
                                        }
                                    });
                                    //Add the row
                                    allGridRows = allGridRows + currentSelectedItem + '\r\n';
                                });
                                currentSelectedItem = allGridRows;
                            }
                            break;
                        case 'GetAllVisibleGridRows':
                            var allGridRows = '';
                            currentSelectedItem = '';
                            // Gets the data source from the grid.
                            var dataSource = grid.dataSource;

                            // Gets the filter from the dataSource
                            var filters = dataSource.filter();

                            // Gets the full set of data from the data source
                            var allData = dataSource.data();

                            // Applies the filter to the data
                            var query = new kendo.data.Query(allData);
                            var filteredData = query.filter(filters).data;

                            $.each(filteredData, function(rowIndex) {
                                var rowItem = filteredData[rowIndex];
                                var oneBaseIndex = rowIndex + 1;
                                currentSelectedItem = oneBaseIndex + '|';
                                $.each(rowItem, function(key, value) {
                                    //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                    if (
                                        key.indexOf('syscolor') === -1 &&
                                        key.indexOf('sysbgcolor') === -1 &&
                                        key.indexOf('sysdisabled') === -1 &&
                                        key.indexOf('sysdec') === -1
                                    ) {
                                        var columnFound = false;
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        var columnIsColumnComboBox = false;
                                        //Flag the field if it is a date or combobox
                                        for (i = 0; i < grid.columns.length; i++) {
                                            if (grid.columns[i].field === key) {
                                                columnFound = true;
                                                if (grid.columns[i].type === 'date') {
                                                    columnIsDate = true;
                                                    break;
                                                }
                                                if (grid.columns[i].isCombbox) {
                                                    columnIsComboBox = true;
                                                    break;
                                                }
                                                if (
                                                    grid.columns[i].type === 'combo' ||
                                                    grid.columns[i].type === 'radio'
                                                ) {
                                                    columnIsColumnComboBox = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (columnFound === true) {
                                        //Append the column data
                                        if (columnIsDate === true) {
                                            currentSelectedItem =
                                                currentSelectedItem +
                                                sysproInterop.convertDateForGridOutput(value) +
                                                '|';
                                        } else if (columnIsComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.key + '|';
                                        } else if (columnIsColumnComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.value + '|';
                                        } else {
                                            currentSelectedItem = currentSelectedItem + value + '|';
                                        }
                                    } else {
                                        if (key === 'syshidden') {
                                            currentSelectedItem = currentSelectedItem + 'syshidden|';
                                        }
                                    }
                                });
                                //Add the row
                                allGridRows = allGridRows + currentSelectedItem + '\r\n';
                            });
                            currentSelectedItem = allGridRows;
                            break;
                        case 'UpdateGridRow':
                            var updateRowDetails = JSON.parse(dataIn.InternalEventParameter);
                            //Get the specified Row
                            var rowIndex = updateRowDetails.updateinfo.row;
                            rowIndex = rowIndex - 1; //Subtract 1 from row index as SYSPRO's grids are 1 based
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data('kendoGrid');
                                grid.closeCell();
                                var dataItem = grid.dataSource.data()[rowIndex];
                                if (dataItem) {
                                    $.each(updateRowDetails.lv.r, function(key, value) {
                                        if (value.key && value.val) {
                                            //Check if we are updating a combobox
                                            dataItem[key].key = value.key;
                                            dataItem[key].value = value.val;
                                        } else {
                                            var columnIsDate = false;
                                            //Flag the field if it is a date
                                            for (i = 0; i < grid.columns.length; i++) {
                                                if (grid.columns[i].field === key) {
                                                    if (grid.columns[i].type === 'date') {
                                                        columnIsDate = true;
                                                        break;
                                                    }
                                                }
                                            }
                                            if (columnIsDate === true) {
                                                var dateObject = kendo.parseDate(value, gridDiv.data('dateformatin'));
                                                value = dateObject;
                                            }
                                            dataItem[key] = value;
                                        }
                                    });
                                    grid.refresh();

                                    //call this to update the totals, but only do it if we have totals
                                    initialAggregates = gridDiv.data('sysproinitialaggregates');
                                    if (initialAggregates) {
                                        grid.dataSource.fetch();
                                    }
                                }

                                if (gridDiv.data('sysprohashiddenrows') == true) {
                                    rowIndex = grid.dataSource.indexOf(dataItem);
                                }

                                grid.select('tr:eq(' + rowIndex + ')');
                                if (gridDiv.data('sysprolastcellcloseselector') !== '') {
                                    var sysproLastCellCloseSelector = gridDiv.data('sysprolastcellcloseselector');
                                    grid.editCell(grid.tbody.find(sysproLastCellCloseSelector));
                                    gridDiv.data('sysprolastcellcloseselector', '');
                                }

                                var changedRowsEvent = gridDiv.data('sysprogridchangedrows');
                                if (changedRowsEvent.indexOf(rowIndex) === -1) {
                                    changedRowsEvent.push(rowIndex);
                                    gridDiv.data('sysprogridchangedrows', changedRowsEvent);
                                }
                            });
                            break;
                        case 'BeginEditAt':
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');

                            $.each(gridDivs, function(index) {
                                var rowIndex = SplitInternalEventParameter[0] - 1;
                                var cellItemName = SplitInternalEventParameter[1];

                                var gridDiv = $(this);
                                grid = gridDiv.data('kendoGrid');

                                grid.select('tr:eq(' + rowIndex + ')');
                                if (gridDiv.data('sysprohashiddenrows') == true) {
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

                                setTimeout(function() {
                                    grid.editCell(grid.tbody.find('tr:eq(' + rowIndex + ') td:eq(' + cellIndex + ')'));
                                });
                            });
                            break;
                        case 'DeleteCurrentRow':
                            //First we get the current row
                            var selectedItem = grid.dataItem(grid.select());
                            if (selectedItem) {
                                currentSelectedItem = grid.select().index() + 1;
                                currentSelectedItem = currentSelectedItem + '|';
                                //Return the details of the row before the delete
                                var columnDetails = selectedItem.toJSON();
                                $.each(columnDetails, function(key, value) {
                                    //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                    if (
                                        key.indexOf('syscolor') === -1 &&
                                        key.indexOf('sysbgcolor') === -1 &&
                                        key.indexOf('sysdisabled') === -1 &&
                                        key.indexOf('sysdec') === -1
                                    ) {
                                        //Check if the column is a date as we want to return the date in the format that it was given
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        var columnIsColumnComboBox = false;
                                        //Flag the field if it is a date or combobox
                                        for (i = 0; i < grid.columns.length; i++) {
                                            if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                                columnIsDate = true;
                                                break;
                                            }
                                            if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                columnIsComboBox = true;
                                                break;
                                            }
                                            if (
                                                grid.columns[i].field === key &&
                                                (grid.columns[i].type === 'combo' || grid.columns[i].type === 'radio')
                                            ) {
                                                columnIsColumnComboBox = true;
                                                break;
                                            }
                                        }
                                        //Check if the column is a date and return it in the correct format
                                        if (columnIsDate) {
                                            currentSelectedItem =
                                                currentSelectedItem +
                                                sysproInterop.convertDateForGridOutput(value) +
                                                '|';
                                        } else if (columnIsComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.key + '|';
                                        } else if (columnIsColumnComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.value + '|';
                                        } else {
                                            currentSelectedItem = currentSelectedItem + value + '|';
                                        }
                                    }
                                });

                                //Delete the row
                                grid.dataSource.remove(selectedItem);
                            }
                            break;
                        case 'HideRowAt':
                            var rowIndex = dataIn.InternalEventParameter;
                            rowIndex = rowIndex - 1; //Subtract 1 from row index as SYSPRO's grids are 1 based
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                var grid = gridDiv.data('kendoGrid');
                                var sysprohashiddenrows = gridDiv.data('sysprohashiddenrows');

                                //Flag the grid has having hidden rows
                                gridDiv.data('sysprohashiddenrows', true);

                                //Find the data item and set it's hidden property
                                var selectedItem = grid.dataSource.at(rowIndex);
                                if (selectedItem) {
                                    selectedItem['syshidden'] = true;
                                }
                                //Only add the filter if there wasn't a previous filter
                                var filter = { logic: 'and', filters: [] };
                                filter.filters.push({
                                    field: 'syshidden',
                                    operator: 'neq',
                                    value: true,
                                });
                                grid.dataSource.filter(filter);
                            });
                            break;
                        case 'HideCurrentRow':
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                var grid = gridDiv.data('kendoGrid');
                                var sysprohashiddenrows = gridDiv.data('sysprohashiddenrows');
                                //Flag the grid has having hidden rows
                                gridDiv.data('sysprohashiddenrows', true);
                                //Find the data item and set it's hidden property
                                var selectedItem = grid.dataItem(grid.select());
                                if (selectedItem) {
                                    selectedItem['syshidden'] = true;
                                }
                                //Only add the filter if there wasn't a previous filter
                                var filter = { logic: 'and', filters: [] };
                                filter.filters.push({
                                    field: 'syshidden',
                                    operator: 'neq',
                                    value: true,
                                });
                                grid.dataSource.filter(filter);
                            });
                            break;
                        case 'DeleteRowAt':
                            //Get the specified Row
                            var rowIndex = dataIn.InternalEventParameter;
                            currentSelectedItem = rowIndex + '|';
                            rowIndex = rowIndex - 1; //Subtract 1 from row index as SYSPRO's grids are 1 based
                            var selectedItem = grid.dataSource.at(rowIndex);
                            if (selectedItem) {
                                //Return the details of the row before the delete
                                var columnDetails = selectedItem.toJSON();
                                $.each(columnDetails, function(key, value) {
                                    //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                    if (
                                        key.indexOf('syscolor') === -1 &&
                                        key.indexOf('sysbgcolor') === -1 &&
                                        key.indexOf('sysdisabled') === -1 &&
                                        key.indexOf('sysdec') === -1
                                    ) {
                                        //Check if the column is a date as we want to return the date in the format that it was given
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        var columnIsColumnComboBox = false;
                                        //Flag the field if it is a date or combobox
                                        for (i = 0; i < grid.columns.length; i++) {
                                            if (grid.columns[i].field === key && grid.columns[i].type === 'date') {
                                                columnIsDate = true;
                                                break;
                                            }
                                            if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                columnIsComboBox = true;
                                                break;
                                            }
                                            if (
                                                grid.columns[i].field === key &&
                                                (grid.columns[i].type === 'combo' || grid.columns[i].type === 'radio')
                                            ) {
                                                columnIsColumnComboBox = true;
                                                break;
                                            }
                                        }
                                        //Check if the column is a date and return it in the correct format
                                        if (columnIsDate) {
                                            currentSelectedItem =
                                                currentSelectedItem +
                                                sysproInterop.convertDateForGridOutput(value) +
                                                '|';
                                        } else if (columnIsComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.key + '|';
                                        } else if (columnIsColumnComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.value + '|';
                                        } else {
                                            currentSelectedItem = currentSelectedItem + value + '|';
                                        }
                                    }
                                });

                                //Delete the row
                                grid.dataSource.remove(selectedItem);
                            }
                            break;
                        case 'SelectRowAt':
                            var rowIndex = dataIn.InternalEventParameter;
                            rowIndex = rowIndex - 1; //Subtract 1 from row index as SYSPRO's grids are 1 based

                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                var grid = gridDiv.data('kendoGrid');
                                gridDiv.data('sysproscrolltoselection', true);
                                //Select the tr that is not a grouping row
                                grid.select('tr:not(.k-grouping-row):eq(' + rowIndex + ')');
                            });
                            break;
                        case 'DisableEntryGrid':
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                gridDiv.data('sysproentrygriddisabled', true);
                            });
                            break;
                        case 'EnableEntryGrid':
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                gridDiv.data('sysproentrygriddisabled', false);
                            });
                            break;
                        case 'ApplyComboBox':
                            var comboBoxDetails = JSON.parse(dataIn.InternalEventParameter);
                            var appCurrentSelectedItem = grid.select();
                            //First check if have been provided with the correct details
                            if (comboBoxDetails.lv.cbos.cbo.length > 0) {
                                $.each(gridDivs, function(index) {
                                    var gridDiv = $(this);
                                    var grid = gridDiv.data('kendoGrid');

                                    //Get the current sysprocomboxes dictionary
                                    var comboBoxes = gridDiv.data('sysprocomboboxes');

                                    //Get the column and values that must be updated in comboboxes dictionary
                                    if (grid) {
                                        var gridOptions = grid.getOptions();
                                        if (gridOptions) {
                                            for (var i = 0; i < comboBoxDetails.lv.cbos.cbo.length; i++) {
                                                var comboBoxColumn = comboBoxDetails.lv.cbos.cbo[i].col;
                                                var comboBoxValues = comboBoxDetails.lv.cbos.cbo[i].values;

                                                //Now add the items to the comboxes dictionary
                                                comboBoxes[comboBoxColumn] = comboBoxValues;

                                                for (j = 0; j < gridOptions.columns.length; j++) {
                                                    if (gridOptions.columns[j].field === comboBoxColumn) {
                                                        gridOptions.columns[j].editor =
                                                            sysproInterop.sysproDropDownEditor;
                                                        gridOptions.columns[j].template =
                                                            '#=' + comboBoxColumn + '.val #';
                                                        gridOptions.columns[j].isCombbox = true;
                                                        break;
                                                    }
                                                }
                                            }
                                            //Set the sysprocomboboxes value
                                            gridDiv.data('sysprocomboboxes', comboBoxes);
                                            grid.setOptions({ columns: gridOptions.columns });
                                        }
                                    }
                                    sysproInterop.applyCheckBoxContentChangeEvent(gridDiv);

                                    //Handle key strokes on Editable Grids
                                    if (grid.options.editable.createAt === 'bottom') {
                                        gridDiv.find('table').off('keydown');
                                        gridDiv.find('table').on('keydown', sysproInterop.gridEditableKeyDown);
                                    }
                                });

                                //We need to begin edit, because the appendtogrid is being performed, then apply combobox and the focus is not being set
                                if (grid.options.editable.createAt === 'bottom') {
                                    if (appCurrentSelectedItem) {
                                        var cellIndex = $('.editable-cell', appCurrentSelectedItem[0]).index();
                                        if (cellIndex >= 0) {
                                            appCurrentSelectedItem.data('sysignorerowselectedevent', true);
                                            grid.select(appCurrentSelectedItem);
                                            grid.editCell(
                                                grid.tbody.find(
                                                    'tr:eq(' +
                                                        appCurrentSelectedItem.index() +
                                                        ') td:eq(' +
                                                        cellIndex +
                                                        ')'
                                                )
                                            );
                                            grid.select('tr:eq(' + appCurrentSelectedItem.index() + ')');
                                        }
                                    }
                                }
                            }
                            break;
                        case 'ShowGridCellMessage':
                            //Parse input JSON
                            var messageDetails = JSON.parse(dataIn.InternalEventParameter);

                            //Check if we have any messages to process
                            if (messageDetails.lv.mss.ms.length > 0) {
                                $.each(gridDivs, function(index) {
                                    var gridDiv = $(this);
                                    //First remove the old notes just in case.
                                    $('.gridlist-cell-note', gridDiv).remove();
                                    var grid = gridDiv.data('kendoGrid');
                                    if (grid) {
                                        //First thing we do is update all the values and set all the disabled fields
                                        for (var i = 0; i < messageDetails.lv.mss.ms.length; i++) {
                                            //Get the message Details
                                            var messageItem = messageDetails.lv.mss.ms[i];
                                            var itemRowNumber = messageItem.row - 1;
                                            var itemColumnName = messageItem.col;
                                            var itemColumnIndex = 0;
                                            var itemValue = messageItem.val;
                                            var itemSysDisabled = messageItem.sysDisabled;
                                            var valueToUpdate;

                                            //First we get the columnIndex and the type because we will need it later
                                            var isBoolean = false;
                                            var isEditable = true;
                                            for (j = 0; j < grid.columns.length; j++) {
                                                if (grid.columns[j].field === itemColumnName) {
                                                    itemColumnIndex = j;
                                                    if (grid.columns[j].type === 'boolean') {
                                                        isBoolean = true;
                                                    }
                                                    //set a flag if the field is not editable
                                                    if (grid.columns[j].editable === false) {
                                                        isEditable = false;
                                                    }
                                                    break;
                                                }
                                            }

                                            //Check if I need to update the value
                                            if (itemValue) {
                                                var updateDataItem = grid.dataSource.data()[itemRowNumber];
                                                if (updateDataItem) {
                                                    if (itemValue === 'true') {
                                                        valueToUpdate = true;
                                                    } else if (itemValue === 'false') {
                                                        valueToUpdate = false;
                                                    } else {
                                                        valueToUpdate = itemValue;
                                                    }
                                                    if (isEditable == false) {
                                                        updateDataItem[itemColumnName] = valueToUpdate;
                                                    } else {
                                                        updateDataItem.set(itemColumnName, valueToUpdate);
                                                    }
                                                    updateDataItem.dirtyFields = {};
                                                    updateDataItem.dirty = false;

                                                    //If it is a boolean and an editable grid fors the change trigger, otherwise the checkbox doesn't get updated
                                                    if (isBoolean === true && grid.options.editable.mode === 'incell') {
                                                        updateDataItem[itemColumnIndex] = valueToUpdate;
                                                    }
                                                    //Flag the row as being changed
                                                    var changedRowsEvent = gridDiv.data('sysprogridchangedrows');
                                                    if (changedRowsEvent.indexOf(itemRowNumber) === -1) {
                                                        changedRowsEvent.push(itemRowNumber);
                                                        gridDiv.data('sysprogridchangedrows', changedRowsEvent);
                                                    }
                                                }
                                            }
                                            //Check if there is an item to be enabled or disabled
                                            if (itemSysDisabled) {
                                                //Get the columnValues for the row
                                                var columnValues = '';
                                                var itemRow;
                                                itemRow = grid.dataSource.data()[itemRowNumber];
                                                if (itemRow) {
                                                    //Check if have the colDisabled property
                                                    var collectionRow = itemRow['colDisabled'];
                                                    if (!collectionRow || collectionRow === 'undefined') {
                                                        itemRow['colDisabled'] = '';
                                                    }
                                                    collectionRow = itemRow['colDisabled'];
                                                    //Make sure the last character is a "|"
                                                    if (collectionRow[collectionRow.length - 1] !== '|') {
                                                        collectionRow = collectionRow + '|';
                                                    }
                                                    var hasCheckBox = false;
                                                    if (collectionRow) {
                                                        if (itemColumnName !== '') {
                                                            if (itemColumnName.includes('sysdisabled') == false) {
                                                                var itemColumnIndex = itemColumnName + '|';
                                                                //If we find an entry always remove it
                                                                if (collectionRow.includes(itemColumnIndex)) {
                                                                    collectionRow = collectionRow.replace(
                                                                        itemColumnIndex,
                                                                        ''
                                                                    );
                                                                }
                                                                //Now if it is disabled add it
                                                                if (itemSysDisabled === 'true') {
                                                                    if (collectionRow.slice(-1) === '|') {
                                                                        collectionRow = collectionRow + itemColumnIndex;
                                                                    } else {
                                                                        collectionRow =
                                                                            collectionRow + '|' + itemColumnIndex;
                                                                    }
                                                                }
                                                            } else {
                                                                //I assume here we have a checkbox
                                                                hasCheckBox = true;
                                                                if (itemSysDisabled === 'true') {
                                                                    itemRow[itemColumnName] = true;
                                                                } else {
                                                                    itemRow[itemColumnName] = false;
                                                                }
                                                            }
                                                        }
                                                        itemRow['colDisabled'] = collectionRow;
                                                    }
                                                }
                                            }
                                        }
                                        grid.refresh();

                                        //Now we should  probably dispose  of  the old  popovers
                                        $('.gridlist-cell-note', gridDiv.closest('.noBorderTable')).popover('destroy');
                                        $('.gridlist-cell-note', gridDiv.closest('.noBorderTable')).remove();
                                        //Now we update the message
                                        for (var i = 0; i < messageDetails.lv.mss.ms.length; i++) {
                                            //Get the message Details
                                            var messageItem = messageDetails.lv.mss.ms[i];
                                            var itemRowNumber = messageItem.row - 1;
                                            var itemColumnName = messageItem.col;
                                            var itemColumnIndex = 0;
                                            var itemMessage = messageItem.msg;
                                            var valueToUpdate;

                                            //First we get the columnIndex and the type because we will need it later
                                            var isBoolean = false;
                                            for (j = 0; j < grid.columns.length; j++) {
                                                if (grid.columns[j].field === itemColumnName) {
                                                    itemColumnIndex = j;
                                                    if (grid.columns[j].type === 'boolean') {
                                                        isBoolean = true;
                                                    }
                                                    break;
                                                }
                                            }
                                            //Set the cell values
                                            var item = grid.dataSource.data()[itemRowNumber];
                                            if (item) {
                                                var row = grid.table.find("tr[data-uid='" + item.uid + "']");
                                                var container = row.find('td:eq(' + itemColumnIndex + ')'); //Then find the column - includes hidden fields (starting at 0)
                                                if (itemMessage) {
                                                    if (itemMessage === '' || itemMessage === 'undefined') {
                                                        //Find the span with the gridlist-cell-note and remove it
                                                        if (container[0]) {
                                                            container[0].remove('span.gridlist-cell-note');
                                                        }
                                                    } else {
                                                        var htmlIn =
                                                            '<a href="#" class="gridlist-cell-note" tabindex="0" data-container="body" data-toggle="popover" data-placement="bottom" data-content="' +
                                                            itemMessage +
                                                            '" data-trigger="focus" data-original-title="" title=""></a>';
                                                        container.append(htmlIn);
                                                    }
                                                }
                                            }
                                        }
                                        //Finally initialize the code
                                        $('.gridlist-cell-note', gridDiv.closest('.noBorderTable')).popover();
                                    }
                                });
                            }
                            break;
                        case 'UpdateRowsByIndex':
                            var updateRowDetails = JSON.parse(dataIn.InternalEventParameter);
                            //Get the column and value to match
                            var gridData = grid.dataSource.data();
                            var columnToMatch = updateRowDetails.updateinfo.col;

                            //Did i get a column
                            if (columnToMatch) {
                                //Loop through all the entries that has been provided
                                for (var i = 0; i < updateRowDetails.lv.r.length; i++) {
                                    var itemToUpdate = updateRowDetails.lv.r[i];
                                    if (itemToUpdate) {
                                        var valueToMatch = itemToUpdate.value;
                                        var matchingResults = $.grep(gridData, function(d) {
                                            return d[columnToMatch] === valueToMatch;
                                        });
                                        if (matchingResults) {
                                            if (matchingResults.length > 0) {
                                                var dataItem = grid.dataSource.getByUid(matchingResults[0].uid);
                                                $.each(itemToUpdate, function(key, value) {
                                                    if (key !== 'value') {
                                                        dataItem[key] = value;
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                                grid.refresh();
                            }
                            break;
                        case 'FindRow':
                            currentSelectedItem = 'false';
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            var columnToMatch = SplitInternalEventParameter[0];
                            var valueToMatch = SplitInternalEventParameter[1];
                            var gridData = grid.dataSource.data();

                            var matchingResults = $.grep(gridData, function(d) {
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
                        case 'FindAndSelect':
                            currentSelectedItem = 'false';
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            var columnToMatch = SplitInternalEventParameter[0];
                            var valueToMatch = SplitInternalEventParameter[1];
                            var gridData = grid.dataSource.data();

                            var matchingResults = $.grep(gridData, function(d) {
                                return d[columnToMatch] === valueToMatch;
                            });
                            if (matchingResults) {
                                if (matchingResults.length > 0) {
                                    var selectedItem = grid.dataSource.getByUid(matchingResults[0].uid);
                                    var row = grid.tbody.find("tr[data-uid='" + selectedItem.uid + "']");
                                    if (row) {
                                        var rowIndex = row[0].rowIndex;

                                        $.each(gridDivs, function(index) {
                                            var gridDiv = $(this);
                                            var grid = gridDiv.data('kendoGrid');
                                            gridDiv.data('sysproscrolltoselection', true);
                                            //Select the tr that is not a grouping row
                                            grid.select('tr:not(.k-grouping-row):eq(' + rowIndex + ')');
                                        });

                                        rowIndex++;
                                        currentSelectedItem = rowIndex + '|';
                                        var columnDetails = selectedItem.toJSON();
                                        $.each(columnDetails, function(key, value) {
                                            //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                            if (
                                                key.indexOf('syscolor') === -1 &&
                                                key.indexOf('sysbgcolor') === -1 &&
                                                key.indexOf('sysdisabled') === -1 &&
                                                key.indexOf('sysdec') === -1
                                            ) {
                                                //Check if the column is a date as we want to return the date in the format that it was given
                                                var columnIsDate = false;
                                                var columnIsComboBox = false;
                                                var columnIsColumnComboBox = false;
                                                //Flag the field if it is a date or combobox
                                                for (i = 0; i < grid.columns.length; i++) {
                                                    if (
                                                        grid.columns[i].field === key &&
                                                        grid.columns[i].type === 'date'
                                                    ) {
                                                        columnIsDate = true;
                                                        break;
                                                    }
                                                    if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                        columnIsComboBox = true;
                                                        break;
                                                    }
                                                    if (
                                                        grid.columns[i].field === key &&
                                                        (grid.columns[i].type === 'combo' ||
                                                            grid.columns[i].type === 'radio')
                                                    ) {
                                                        columnIsColumnComboBox = true;
                                                        break;
                                                    }
                                                }
                                                //Check if the column is a date and return it in the correct format
                                                if (columnIsDate) {
                                                    currentSelectedItem =
                                                        currentSelectedItem +
                                                        sysproInterop.convertDateForGridOutput(value) +
                                                        '|';
                                                } else if (columnIsComboBox) {
                                                    currentSelectedItem = currentSelectedItem + value.key + '|';
                                                } else if (columnIsColumnComboBox) {
                                                    currentSelectedItem = currentSelectedItem + value.value + '|';
                                                } else {
                                                    currentSelectedItem = currentSelectedItem + value + '|';
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                            break;
                        case 'FindAndDelete':
                            currentSelectedItem = 'false';
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            var columnToMatch = SplitInternalEventParameter[0];
                            var valueToMatch = SplitInternalEventParameter[1];
                            var gridData = grid.dataSource.data();

                            var matchingResults = $.grep(gridData, function(d) {
                                return d[columnToMatch] === valueToMatch;
                            });
                            if (matchingResults) {
                                if (matchingResults.length > 0) {
                                    var selectedItem = grid.dataSource.getByUid(matchingResults[0].uid);
                                    var row = grid.tbody.find("tr[data-uid='" + selectedItem.uid + "']");
                                    if (row) {
                                        var rowIndex = row[0].rowIndex;
                                        rowIndex++;
                                        currentSelectedItem = rowIndex + '|';
                                        var columnDetails = selectedItem.toJSON();
                                        $.each(columnDetails, function(key, value) {
                                            //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                            if (
                                                key.indexOf('syscolor') === -1 &&
                                                key.indexOf('sysbgcolor') === -1 &&
                                                key.indexOf('sysdisabled') === -1 &&
                                                key.indexOf('sysdec') === -1
                                            ) {
                                                //Check if the column is a date as we want to return the date in the format that it was given
                                                var columnIsDate = false;
                                                var columnIsComboBox = false;
                                                var columnIsColumnComboBox = false;
                                                //Flag the field if it is a date or combobox
                                                for (i = 0; i < grid.columns.length; i++) {
                                                    if (
                                                        grid.columns[i].field === key &&
                                                        grid.columns[i].type === 'date'
                                                    ) {
                                                        columnIsDate = true;
                                                        break;
                                                    }
                                                    if (grid.columns[i].field === key && grid.columns[i].isCombbox) {
                                                        columnIsComboBox = true;
                                                        break;
                                                    }
                                                    if (
                                                        grid.columns[i].field === key &&
                                                        (grid.columns[i].type === 'combo' ||
                                                            grid.columns[i].type === 'radio')
                                                    ) {
                                                        columnIsColumnComboBox = true;
                                                        break;
                                                    }
                                                }
                                                //Check if the column is a date and return it in the correct format
                                                if (columnIsDate) {
                                                    currentSelectedItem =
                                                        currentSelectedItem +
                                                        sysproInterop.convertDateForGridOutput(value) +
                                                        '|';
                                                } else if (columnIsComboBox) {
                                                    currentSelectedItem = currentSelectedItem + value.key + '|';
                                                } else if (columnIsColumnComboBox) {
                                                    currentSelectedItem = currentSelectedItem + value.value + '|';
                                                } else {
                                                    currentSelectedItem = currentSelectedItem + value + '|';
                                                }
                                            }
                                        });
                                        grid.dataSource.remove(selectedItem);
                                    }
                                }
                            }
                            break;
                        case 'DisableGridCells':
                            //First we split the parameters out. dataIn.InternalEventParameter = "false|4|a1|a2|a3|a4|" where true means enable, false means disable, 4 is the row number and a1,a2,a3,a4 is the column name
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                var grid = gridDiv.data('kendoGrid');
                                var disabled = SplitInternalEventParameter[0]; //Contains true or false
                                var itemRowNumber = +SplitInternalEventParameter[1]; //Contains the row number
                                itemRowNumber = itemRowNumber - 1; //I receive in a 1 based array convert to zero based
                                //Get the Row from the DataSource
                                var itemRow = grid.dataSource.data()[itemRowNumber];
                                if (itemRow) {
                                    //Check if have the colDisabled property
                                    var collectionRow = itemRow['colDisabled'];
                                    if (!collectionRow || collectionRow === 'undefined') {
                                        itemRow['colDisabled'] = '';
                                    }
                                    collectionRow = itemRow['colDisabled'];
                                    //Make sure the last character is a "|"
                                    if (collectionRow[collectionRow.length - 1] !== '|') {
                                        collectionRow = collectionRow + '|';
                                    }
                                    var hasCheckBox = false;
                                    if (collectionRow) {
                                        for (var i = 2; i < SplitInternalEventParameter.length; i++) {
                                            if (SplitInternalEventParameter[i] !== '') {
                                                if (SplitInternalEventParameter[i].includes('sysdisabled') == false) {
                                                    var itemColumnIndex = SplitInternalEventParameter[i] + '|';
                                                    //If we find an entry always remove it
                                                    if (collectionRow.includes(itemColumnIndex)) {
                                                        collectionRow = collectionRow.replace(itemColumnIndex, '');
                                                    }
                                                    //Now if it is disabled add it
                                                    if (disabled === 'true') {
                                                        if (collectionRow.slice(-1) === '|') {
                                                            collectionRow = collectionRow + itemColumnIndex;
                                                        } else {
                                                            collectionRow = collectionRow + '|' + itemColumnIndex;
                                                        }
                                                    }
                                                } else {
                                                    var itemName = SplitInternalEventParameter[i];
                                                    //I assume here we have a checkbox
                                                    hasCheckBox = true;
                                                    if (disabled === 'true') {
                                                        itemRow[itemName] = true;
                                                    } else {
                                                        itemRow[itemName] = false;
                                                    }
                                                }
                                            }
                                        }
                                        itemRow['colDisabled'] = collectionRow;
                                        if (hasCheckBox) {
                                            grid.refresh();
                                        }
                                    }
                                }
                            });
                            break;
                        case 'DisableCellHyperlink':
                            //First we split the parameters out. dataIn.InternalEventParameter = "1|1|true|999" where true means row number, 1 means columnIndex, true to enable or disable
                            //999 is optional, if passed it will use it to create a column event
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');

                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);

                                grid = gridDiv.data('kendoGrid');
                                if (grid) {
                                    var itemRowNumber = SplitInternalEventParameter[0] - 1; //Contains the row number
                                    var item = grid.dataSource.data()[itemRowNumber];
                                    var rowTr = grid.table.find("tr[data-uid='" + item.uid + "']");
                                    var itemColumnIndex = 0;
                                    itemColumnIndex = parseInt(SplitInternalEventParameter[1]);
                                    itemColumnIndex--;

                                    var hasCommandColumn = gridDiv.data('sysprohascommandcolumn');
                                    if (hasCommandColumn === true) {
                                        itemColumnIndex = itemColumnIndex + 1;
                                    }
                                    //Get the columnName and Template
                                    var columnFieldName = grid.columns[itemColumnIndex].field;
                                    var columnTemplate = grid.columns[itemColumnIndex].template;

                                    var colTd = rowTr.find('td:eq(' + itemColumnIndex + ')');

                                    if (!columnTemplate) {
                                        //We Don'thave a template, create one
                                        if (SplitInternalEventParameter[3]) {
                                            //Get the currently selected row
                                            var currentSelectedRow = grid.select().index();
                                            //Get the currently editable Cell
                                            var currentOpenCell = $('.k-edit-cell', gridDiv);
                                            var currentOpenCellIndex = -1;
                                            if (currentOpenCell) {
                                                if (currentOpenCell[0]) {
                                                    currentOpenCellIndex = currentOpenCell[0].cellIndex;
                                                }
                                            }

                                            var gridOptions = grid.getOptions();
                                            var defaultTemplate = '#=' + columnFieldName + '#';
                                            gridOptions.columns[itemColumnIndex].template =
                                                '<div class="syspro-grid-row-hyperlink" data-eventnum="' +
                                                columnFieldName +
                                                '|' +
                                                SplitInternalEventParameter[3] +
                                                '">' +
                                                defaultTemplate +
                                                '</div>';
                                            grid.setOptions(gridOptions);
                                            sysproInterop.applyCheckBoxContentChangeEvent(gridDiv);

                                            //Handle key strokes on Editable Grids
                                            if (grid.options.editable.createAt === 'bottom') {
                                                gridDiv.find('table').off('keydown');
                                                gridDiv.find('table').on('keydown', sysproInterop.gridEditableKeyDown);
                                            }

                                            //Selecte the row that was previous selected
                                            grid.select('tr:eq(' + currentSelectedRow + ')');
                                            if (currentOpenCellIndex >= 0) {
                                                setTimeout(function() {
                                                    grid.editCell(
                                                        grid.tbody.find(
                                                            'tr:eq(' +
                                                                currentSelectedRow +
                                                                ') td:eq(' +
                                                                currentOpenCellIndex +
                                                                ')'
                                                        )
                                                    );
                                                });
                                            }
                                        }
                                    }

                                    //Does this column have a template....if it does then the cell already has a div, just remove and add the hyperlink accordingly
                                    var colTd = rowTr.find('td:eq(' + itemColumnIndex + ')');
                                    if (colTd[0]) {
                                        if (colTd[0].childNodes[0]) {
                                            if (SplitInternalEventParameter[2] === 'true') {
                                                if (colTd[0].childNodes[0].className) {
                                                    //Disable
                                                    if (
                                                        colTd[0].childNodes[0].className === 'syspro-grid-row-hyperlink'
                                                    ) {
                                                        colTd[0].childNodes[0].className = '';
                                                    }
                                                }
                                            } else {
                                                //Enable
                                                colTd[0].childNodes[0].className = 'syspro-grid-row-hyperlink';
                                            }
                                        }
                                    }
                                }
                            });
                            break;
                        case 'CheckAllCheckBoxes':
                            //First we split the parameters out. dataIn.InternalEventParameter = "a5|true" where a5 means the column, true to check or disable
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data('kendoGrid');
                                if (grid) {
                                    var valueToChange = true;
                                    if (SplitInternalEventParameter[1] === 'false') {
                                        valueToChange = false;
                                    }
                                    var dataItem = grid.dataSource.data();
                                    //Loop through all the items in the datasource check for duplicates, this in case insensitive
                                    for (var i = 0; i < dataItem.length; i++) {
                                        var newDataItem = dataItem[i];
                                        newDataItem[SplitInternalEventParameter[0]] = valueToChange;
                                    }
                                    grid.refresh();
                                }
                                var checkBoxColumn = $(
                                    "input[data-columnname='" + SplitInternalEventParameter[0] + "']",
                                    gridDiv.closest('.noBorderTable')
                                );
                                if (checkBoxColumn) {
                                    if (checkBoxColumn[0]) {
                                        checkBoxColumn[0].checked = valueToChange;
                                    }
                                }
                            });
                            break;
                        case 'SetFooter':
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            var footerColumnName = SplitInternalEventParameter[0];
                            var footerColumnValue = SplitInternalEventParameter[1];
                            if (grid) {
                                var gridOptions = grid.getOptions();
                                if (gridOptions) {
                                    for (var i = 0; i < gridOptions.columns.length; i++) {
                                        if (gridOptions.columns[i].field === footerColumnName) {
                                            gridOptions.columns[i].footerTemplate = footerColumnValue;
                                            grid.setOptions(gridOptions);
                                            break;
                                        }
                                    }
                                }
                            }

                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                var sysproGroupFooters = gridDiv.data('sysprogroupfooters');
                                sysproGroupFooters[footerColumnName] = footerColumnValue;
                                gridDiv.data('sysprogroupfooters', sysproGroupFooters);
                            });
                            break;
                        case 'GetFooter':
                            var footerColumnName = dataIn.InternalEventParameter;
                            currentSelectedItem = 'false';
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                var sysproGroupFooters = gridDiv.data('sysprogroupfooters');
                                var footerItem = sysproGroupFooters[footerColumnName];
                                if (footerItem) {
                                    currentSelectedItem = footerItem;
                                }
                            });
                            break;
                        case 'GetAutoFooterValue':
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            var footerColumnName = SplitInternalEventParameter[0];
                            var footerColumnType = SplitInternalEventParameter[1];
                            var footerNumberFormat = SplitInternalEventParameter[2]; //n2
                            if (grid) {
                                if (footerColumnType === 'sum') {
                                    currentSelectedItem = kendo.toString(
                                        grid.dataSource.aggregates()[footerColumnName].sum,
                                        footerNumberFormat
                                    );
                                } else if (footerColumnType === 'count') {
                                    currentSelectedItem = kendo.toString(
                                        grid.dataSource.aggregates()[footerColumnName].count,
                                        footerNumberFormat
                                    );
                                } else {
                                    currentSelectedItem = '';
                                }
                            }
                            break;
                        case 'SumColumn':
                            var columnName = dataIn.InternalEventParameter;
                            var gridData = grid.dataSource.data();
                            var total = 0;
                            for (var i = 0; i < gridData.length; i++) {
                                total += gridData[i][columnName];
                            }
                            currentSelectedItem = total + '';
                            break;
                        case 'GetAllMatchedRows':
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            var columnToMatch = SplitInternalEventParameter[0];
                            var valueToMatch = SplitInternalEventParameter[1];
                            //If the valueToMatch is "true" or "false" make it true or false
                            if (valueToMatch === 'true') {
                                valueToMatch = true;
                            }
                            if (valueToMatch === 'false') {
                                valueToMatch = false;
                            }
                            //We allow for 2 filters, check if we have a 2nd one
                            var columnToMatch1 = '';
                            var valueToMatch1 = '';
                            var matchingResults;
                            var gridData = grid.dataSource.data();
                            if (SplitInternalEventParameter.length > 2) {
                                columnToMatch1 = SplitInternalEventParameter[2];
                                valueToMatch1 = SplitInternalEventParameter[3];
                                //Do the grep with 2 filters
                                matchingResults = $.grep(gridData, function(d) {
                                    return d[columnToMatch] === valueToMatch && d[columnToMatch1] === valueToMatch1;
                                });
                            } else {
                                //Do the grep with 1 filter
                                matchingResults = $.grep(gridData, function(d) {
                                    return d[columnToMatch] === valueToMatch;
                                });
                            }

                            currentSelectedItem = 'false';
                            if (matchingResults) {
                                if (matchingResults.length > 0) {
                                    currentSelectedItem = '';
                                    //Loop through each item in the matching result
                                    for (var k = 0; k < matchingResults.length; k++) {
                                        var selectedItem = grid.dataSource.getByUid(matchingResults[k].uid);
                                        var row = grid.tbody.find("tr[data-uid='" + selectedItem.uid + "']");
                                        if (row) {
                                            var rowIndex = row[0].rowIndex;
                                            rowIndex++;
                                            currentSelectedItem = currentSelectedItem + rowIndex + '|';
                                            var columnDetails = selectedItem.toJSON();
                                            $.each(columnDetails, function(key, value) {
                                                //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                                if (
                                                    key.indexOf('syscolor') === -1 &&
                                                    key.indexOf('sysbgcolor') === -1 &&
                                                    key.indexOf('sysdisabled') === -1 &&
                                                    key.indexOf('sysdec') === -1
                                                ) {
                                                    //Check if the column is a date as we want to return the date in the format that it was given
                                                    var columnIsDate = false;
                                                    var columnIsComboBox = false;
                                                    var columnIsColumnComboBox = false;
                                                    //Flag the field if it is a date or combobox
                                                    for (i = 0; i < grid.columns.length; i++) {
                                                        if (
                                                            grid.columns[i].field === key &&
                                                            grid.columns[i].type === 'date'
                                                        ) {
                                                            columnIsDate = true;
                                                            break;
                                                        }
                                                        if (
                                                            grid.columns[i].field === key &&
                                                            grid.columns[i].isCombbox
                                                        ) {
                                                            columnIsComboBox = true;
                                                            break;
                                                        }
                                                        if (
                                                            grid.columns[i].field === key &&
                                                            (grid.columns[i].type === 'combo' ||
                                                                grid.columns[i].type === 'radio')
                                                        ) {
                                                            columnIsColumnComboBox = true;
                                                            break;
                                                        }
                                                    }
                                                    //Check if the column is a date and return it in the correct format
                                                    if (columnIsDate) {
                                                        currentSelectedItem =
                                                            currentSelectedItem +
                                                            sysproInterop.convertDateForGridOutput(value) +
                                                            '|';
                                                    } else if (columnIsComboBox) {
                                                        currentSelectedItem = currentSelectedItem + value.key + '|';
                                                    } else if (columnIsColumnComboBox) {
                                                        currentSelectedItem = currentSelectedItem + value.value + '|';
                                                    } else {
                                                        currentSelectedItem = currentSelectedItem + value + '|';
                                                    }
                                                }
                                            });
                                            currentSelectedItem = currentSelectedItem + '\r\n'; //Add carridge return
                                        }
                                    }
                                }
                            }
                            break;
                        case 'CheckForCellDuplicates':
                            currentSelectedItem = 'false';
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            var columnToMatch = SplitInternalEventParameter[0];
                            var valueToMatch = SplitInternalEventParameter[1];
                            var matchingResults;
                            //Get the dataSource and to the check
                            var gridData = grid.dataSource.data();
                            matchingResults = $.grep(gridData, function(d) {
                                return d[columnToMatch] === valueToMatch;
                            });
                            if (matchingResults) {
                                if (matchingResults.length > 1) {
                                    currentSelectedItem = 'true';
                                }
                            }
                            break;
                        case 'GetSettings':
                            var gridOptions = grid.getOptions();
                            var ReturnGridSetting = {};

                            ReturnGridSetting.columns = gridOptions.columns;
                            ReturnGridSetting.group = gridOptions.dataSource.group;
                            ReturnGridSetting.sort = gridOptions.dataSource.sort;

                            currentSelectedItem = JSON.stringify(ReturnGridSetting);
                            break;
                        case 'SetSettings':
                            var options = JSON.parse(dataIn.InternalEventParameter);
                            if (options) {
                                var gridOptions = grid.getOptions();
                                var clickEvent0;
                                var clickEvent1;
                                var clickEvent2;
                                //We need to store the click event on the CommandButton and reset it after we setOptions
                                for (var i = 0; i < gridOptions.columns.length; i++) {
                                    if (gridOptions.columns[i].command) {
                                        if (gridOptions.columns[i].command.length > 0) {
                                            for (var j = 0; j < gridOptions.columns[i].command.length; j++) {
                                                if (j === 0) {
                                                    clickEvent0 = gridOptions.columns[i].command[j].click;
                                                }
                                                if (j === 1) {
                                                    clickEvent1 = gridOptions.columns[i].command[j].click;
                                                }
                                                if (j === 2) {
                                                    clickEvent2 = gridOptions.columns[i].command[j].click;
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

                                //Now restore all the click events before we setOptions
                                //https://stackoverflow.com/questions/30124793/telerik-kendo-ui-grid-loses-custom-command-event-handler-after-persisting-and-r
                                for (var i = 0; i < gridOptions.columns.length; i++) {
                                    if (gridOptions.columns[i].command) {
                                        if (gridOptions.columns[i].command.length > 0) {
                                            for (var j = 0; j < gridOptions.columns[i].command.length; j++) {
                                                if (j == 0) {
                                                    gridOptions.columns[i].command[j].click = clickEvent0;
                                                }
                                                if (j == 1) {
                                                    gridOptions.columns[i].command[j].click = clickEvent1;
                                                }
                                                if (j == 2) {
                                                    gridOptions.columns[i].command[j].click = clickEvent2;
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }

                                grid.setOptions(gridOptions);
                            }
                            break;
                        case 'HideColumns':
                            $.each(gridDivs, function(index) {
                                var gridDiv = $(this);
                                grid = gridDiv.data('kendoGrid');
                                SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                                if (grid) {
                                    if (SplitInternalEventParameter[0] === 'true') {
                                        for (var i = 1; i < SplitInternalEventParameter.length; i++) {
                                            grid.hideColumn(SplitInternalEventParameter[i]);
                                        }
                                    } else {
                                        for (var i = 1; i < SplitInternalEventParameter.length; i++) {
                                            grid.showColumn(SplitInternalEventParameter[i]);
                                        }
                                    }
                                }
                            });
                            break;
                        case 'GetGridLayoutsChanged':
                            var programName = dataIn.InternalEventParameter;
                            var everyGrid = $('.syspro-grid-list');
                            $.each(everyGrid, function(index) {
                                var currentGrid = $(this);
                                if (currentGrid) {
                                    if (currentGrid[0]) {
                                        if (currentGrid[0].attributes['data-sysprogridfieldname']) {
                                            var gridfieldName =
                                                currentGrid[0].attributes['data-sysprogridfieldname'].value;
                                            if (gridfieldName.startsWith(programName)) {
                                                if (currentGrid.data('sysprosettingschanged')) {
                                                    currentSelectedItem = currentSelectedItem + gridfieldName + ',';
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                            if (!currentSelectedItem) {
                                currentSelectedItem = 'false';
                            }
                            break;
                        case 'ExcelExport':
                            if (grid) {
                                grid.saveAsExcel();
                            }
                            break;
                        case 'PDFExport':
                            if (grid) {
                                grid.saveAsPDF();
                            }
                            break;
                        case 'ExpandAll':
                            if (grid) {
                                grid.table.find('.k-grouping-row').each(function() {
                                    grid.expandGroup(this);
                                });
                            }
                            break;
                        case 'CollapseAll':
                            if (grid) {
                                grid.table.find('.k-grouping-row').each(function() {
                                    grid.collapseGroup(this);
                                });
                            }
                            break;
                    }
                }
            }
            return currentSelectedItem;
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'gridRequestInternalEvent');
        }
    },
    sysproDropDownEditor: function(container, options) {
        //Get the GridDiv
        var editorGridDiv = $(container).closest('.syspro-grid-list');
        var comboBoxes = editorGridDiv.data('sysprocomboboxes');
        //https://dojo.telerik.com/eSUSUyeK to repro issue. Call setOptions and rebind after adding field with combo box.
        $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: comboBoxes[options.field],
                dataValueField: 'key',
                dataTextField: 'val',
            });
    },
    createTreeList: function(dataIn) {
        try {
            //Find all the treeLists with the specified name
            var treeDivs = $('*[data-sysprotreefieldname="' + dataIn.FieldName + '"]');
            $.each(treeDivs, function(index) {
                //For each of the treeLists create an instance of it
                var treeDiv = $(this);

                if (treeDiv.data('kendoTreeList')) {
                    treeDiv.data('kendoTreeList').destroy(); // destroy the Grid
                    treeDiv.empty();
                }
                //Store the treeList information, we will use it all in the refreshTreeList function
                var treeList = JSON.parse(dataIn.GridData).tl;

                //If a specific size is given then use what was setup.
                if (treeDiv.data('sysprotreeheight')) {
                    var sysprotreeheight = treeDiv.data('sysprotreeheight');
                    //the height is set here so when the treelist is refreshed it retrieves it from the data attribute when it creates it again.
                    treeList.prop.height = sysprotreeheight;
                }

                //The treelist doesn't work like the grid list. We we create the treelist it does the least amount of work.
                //When we bind the data we will do allot of the other formatting work.
                treeDiv.data('sysprotreelistinfo', treeList);
                var treeEditable = false;
                if (treeDiv.length > 0) {
                    //Bind Columns and properties
                    if (treeList.prop.editable === true) {
                        treeEditable = {};
                        treeEditable = true; //{ mode: "inline", createAt: "bottom", update: true };
                        //If the treelist is editable and it has more than one column and it hasn't already added one then add an edit column to the start.
                        if (
                            treeList.cs.c.length > 0 &&
                            (!treeList.cs.c[0].command || treeList.cs.c[0].command.length !== 1)
                        ) {
                            treeList.cs.c.unshift({ title: ' ', command: [{ name: 'edit' }], width: 100 });
                            //Make the next column expandable.
                            treeList.cs.c[1].expandable = true;
                        }
                    }
                    //Add a toolbar if required
                    var htmlForToolbar = '';
                    if (treeList.tbs) {
                        if (treeList.tbs.tb) {
                            var template = kendo.template($('#gridToolbarTemplate').html());
                            var toolbar = treeList.tbs.tb;
                            $.each(toolbar, function(index) {
                                htmlForToolbar = htmlForToolbar + template(this);
                            });
                        }
                    }

                    treeDiv.kendoTreeList({
                        dataSource: {
                            data: [],
                        },
                        height: treeList.prop.height, //I just bound the height, we can change it in ConvertXmlToJSON
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
                            noRows: treeList.prop.sysprotranNoItemText,
                        },
                        columns: treeList.cs.c,
                        edit: function(e1) {
                            //When the update and cancel buttons are shown, take away the text to simplify them and lower the max width so they take up less space.
                            $('.k-grid-update', treeDiv)
                                .contents()
                                .filter(function() {
                                    return this.nodeType == 3;
                                })
                                .remove();
                            $('.k-grid-cancel', treeDiv)
                                .contents()
                                .filter(function() {
                                    return this.nodeType == 3;
                                })
                                .remove();
                        },
                    });
                }
            });
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'createTreeList');
        }
    },
    refreshTreeList: function(dataIn) {
        try {
            var treeList = JSON.parse(dataIn.GridData).tl;
            var treeDivs = $('*[data-sysprotreefieldname="' + dataIn.FieldName + '"]');
            $.each(treeDivs, function(index) {
                var treeDiv = $(this);
                var tree = treeDiv.data('kendoTreeList');
                var sysprotreelistinfo = treeDiv.data('sysprotreelistinfo'); //Get the info that we stored in the createTreeList function
                //Sort out the dataSource
                var dataSource;
                var columnModel = {};
                //Holds a list of editable date column names
                var dateColumnsHolder = [];
                //Because treeLists don't work in exactly the same was as the grid, we destroy it and recreate it
                if (treeDiv.data('kendoTreeList')) {
                    treeDiv.data('kendoTreeList').destroy(); // destroy the Grid
                    treeDiv.empty();
                }

                var leaveBlankForDate = ''; //Left the dates in a treelist blank, because it looks better blank on the parent nodes
                //If there are date columns update the template
                if (sysprotreelistinfo !== null) {
                    //Example of the data format template: "#= (!a6 == null || a6 = '0000-00-00') ? 'None' : kendo.toString(kendo.parseDate(a6, 'yyyy-MM-dd'), 'MM/dd/yyyy') #"
                    //var dateformatTemplate = "#= (!kendo.parseDate(data.{0},'" + sysprotreelistinfo.prop.sysproDateFormatIn + "')) ? '" + sysprotreelistinfo.prop.sysprotranNone + "' : kendo.toString(kendo.parseDate(data.{1}, '" + sysprotreelistinfo.prop.sysproDateFormatIn + "'), '" + sysprotreelistinfo.prop.sysproDateFormatOut + "') #";
                    //var dateformatTemplate = "#= (!kendo.parseDate(data.{0},'" + sysprotreelistinfo.prop.sysproDateFormatIn + "')) ? ' ' : kendo.toString(kendo.parseDate(data.{1}, '" + sysprotreelistinfo.prop.sysproDateFormatIn + "'), '" + sysprotreelistinfo.prop.sysproDateFormatOut + "') #";
                    var dateformatTemplate =
                        "#= !data.{0} ? '" +
                        leaveBlankForDate +
                        "' : kendo.toString(data.{1},'" +
                        sysprotreelistinfo.prop.sysproDateFormatOut +
                        "') #";
                    var booleanTemplate =
                        "<input class='sysEditTreeCheckBox' type='checkbox' # if({0}){ # checked #} # # if (((typeof {1}sysdisabled !== 'undefined')) && {2}sysdisabled){# disabled #} # # if (((typeof {3}sysVisible !== 'undefined')) && {4}sysVisible === false){# style='display:none;' #} #  />";
                    var numberTemplate =
                        "#= (kendo.toString(data.{0}, 'n' + (data.{1}sysdec==null?'':data.{2}sysdec))) #";
                    var booleanheaderTemplate =
                        "<input type='checkbox' data-columnname='{0}' class='header-checkbox'></input><label style='margin-bottom: 0px;font-weight: normal; for='header-chb'>{1}</label>";
                    var headerTemplate = "<div><span class='k-icon {0}'/></div>"; //Only cater for images...in the treeview the text doesn't seem to work
                    for (i = 0; i < sysprotreelistinfo.cs.c.length; i++) {
                        if (sysprotreelistinfo.cs.c[i].type === 'date') {
                            sysprotreelistinfo.cs.c[i].template = dateformatTemplate.replace(
                                '{1}',
                                sysprotreelistinfo.cs.c[i].field
                            );
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace(
                                '{0}',
                                sysprotreelistinfo.cs.c[i].field
                            );
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace(
                                '{2}',
                                sysprotreelistinfo.cs.c[i].field
                            );
                            sysprotreelistinfo.cs.c[i].format =
                                '{0:' + sysprotreelistinfo.prop.sysproDateFormatOut + '}';
                            dateColumnsHolder.push(sysprotreelistinfo.cs.c[i].field);
                            var sysDateTemplate = sysprotreelistinfo.cs.c[i].template;
                            sysprotreelistinfo.cs.c[i].template =
                                "<span style='background-color: #=data." +
                                sysprotreelistinfo.cs.c[i].field +
                                'sysbgcolor#; color: #=data.' +
                                sysprotreelistinfo.cs.c[i].field +
                                "syscolor#; '>" +
                                sysDateTemplate +
                                '</span>';
                        } else if (sysprotreelistinfo.cs.c[i].type === 'boolean') {
                            sysprotreelistinfo.cs.c[i].template = booleanTemplate.replace(
                                '{0}',
                                sysprotreelistinfo.cs.c[i].field
                            );
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace(
                                '{1}',
                                sysprotreelistinfo.cs.c[i].field
                            );
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace(
                                '{2}',
                                sysprotreelistinfo.cs.c[i].field
                            );
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace(
                                '{3}',
                                sysprotreelistinfo.cs.c[i].field
                            );
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace(
                                '{4}',
                                sysprotreelistinfo.cs.c[i].field
                            );

                            //Cater for checkbox in the header
                            if (sysprotreelistinfo.cs.c[i].showInCheckBoxHeader) {
                                if (sysprotreelistinfo.cs.c[i].showInCheckBoxHeader === true) {
                                    sysprotreelistinfo.cs.c[i].headerTemplate = booleanheaderTemplate.replace(
                                        '{0}',
                                        sysprotreelistinfo.cs.c[i].field
                                    );
                                    sysprotreelistinfo.cs.c[i].headerTemplate = sysprotreelistinfo.cs.c[
                                        i
                                    ].headerTemplate.replace('{1}', sysprotreelistinfo.cs.c[i].title);
                                }
                            }
                        } else if (sysprotreelistinfo.cs.c[i].type === 'number') {
                            sysprotreelistinfo.cs.c[i].template = numberTemplate.replace(
                                '{0}',
                                sysprotreelistinfo.cs.c[i].field
                            );
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace(
                                '{1}',
                                sysprotreelistinfo.cs.c[i].field
                            );
                            sysprotreelistinfo.cs.c[i].template = sysprotreelistinfo.cs.c[i].template.replace(
                                '{2}',
                                sysprotreelistinfo.cs.c[i].field
                            );
                            var sysNumberTemplate = sysprotreelistinfo.cs.c[i].template;
                            sysprotreelistinfo.cs.c[i].template =
                                "<span style='background-color: #=data." +
                                sysprotreelistinfo.cs.c[i].field +
                                'sysbgcolor#; color: #=data.' +
                                sysprotreelistinfo.cs.c[i].field +
                                "syscolor#; '>" +
                                sysNumberTemplate +
                                '</span>';
                        } else {
                            //While looping through each column also add the attribute for cell color support
                            //Cell color support is not support as it is on the grid. Here we had to do a work around and do it on a template
                            sysprotreelistinfo.cs.c[i].template =
                                "<span style='background-color: #=data." +
                                sysprotreelistinfo.cs.c[i].field +
                                'sysbgcolor#; color: #=data.' +
                                sysprotreelistinfo.cs.c[i].field +
                                "syscolor#; '>#=data." +
                                sysprotreelistinfo.cs.c[i].field +
                                '#</span>';
                        }
                        //Check if the grid is editable
                        if (sysprotreelistinfo.prop.editable) {
                            if (
                                !sysprotreelistinfo.cs.c[i].editable &&
                                sysprotreelistinfo.cs.c[i].editable !== 'false' &&
                                sysprotreelistinfo.cs.c[i].editable !== false &&
                                sysprotreelistinfo.cs.c[i].type !== 'boolean'
                            ) {
                                sysprotreelistinfo.cs.c[i].attributes = {
                                    class: 'editable-cell',
                                };
                                //If the field is editable and is a date update the model so that the infrastructure can add a date picker
                                if (sysprotreelistinfo.cs.c[i].type === 'date') {
                                    columnModel[sysprotreelistinfo.cs.c[i].field] = { editable: true, type: 'date' };
                                } else {
                                    columnModel[sysprotreelistinfo.cs.c[i].field] = {
                                        editable: true,
                                    };
                                    //Check if this column requires an Avanti Search Button
                                    if (sysprotreelistinfo.cs.c[i].search) {
                                        sysprotreelistinfo.cs.c[i].editor = function(container, options) {
                                            //Get the tree name, the current row and the name of the column ie. grid|ARSPENLZ|0|a1|0
                                            var editorTreeDiv = $(container).closest('.syspro-tree-list');
                                            var editorTree = editorTreeDiv.data('kendoTreeList');
                                            var editorFieldName = 'grid:' + editorTreeDiv.data('sysprotreefieldname');
                                            var editorRow = $(container)
                                                .closest('tr')
                                                .index();
                                            editorFieldName =
                                                editorFieldName +
                                                ':' +
                                                editorRow +
                                                ':' +
                                                options.field +
                                                ':' +
                                                container[0].cellIndex;
                                            //Create an inputbox
                                            var input = $(
                                                '<input type="text" class="k-input k-textbox" style="width: 80%" name="' +
                                                    options.field +
                                                    '" />'
                                            );
                                            input.appendTo(container);

                                            //Now work out the name of the browse
                                            var editorSearchName = '';
                                            for (i = 0; i < editorTree.columns.length; i++) {
                                                if (editorTree.columns[i].field === options.field) {
                                                    editorSearchName = editorTree.columns[i].search;
                                                    break;
                                                }
                                            }

                                            //Now create the browse button
                                            var buttonElement = $(
                                                '<a class="syspro-browse-button" href="#" data-fieldname="' +
                                                    editorFieldName +
                                                    '" data-fieldvalue="" data-predictivesearchfield="' +
                                                    editorSearchName +
                                                    '"  style="color: white"><i class="material-icons">search</i></a>'
                                            );
                                            buttonElement.appendTo(container);

                                            //Now hook it all up for the predictive search and search button
                                            if (editorSearchName !== 'manual') {
                                                sysproInterop.initializePredictiveSearch(input, editorSearchName);
                                            }

                                            sysproInterop.subscribeToFieldEvents();
                                        };
                                    }
                                }
                            } else {
                                //Build up a model of the items that are NOT editable and feed it to the grid
                                columnModel[sysprotreelistinfo.cs.c[i].field] = {
                                    editable: false,
                                };
                            }
                            //Check if need to apply a image to the coloumn headers
                            if (sysprotreelistinfo.cs.c[i].image) {
                                sysprotreelistinfo.cs.c[i].headerTemplate = headerTemplate;
                                sysprotreelistinfo.cs.c[i].headerTemplate = headerTemplate.replace(
                                    '{0}',
                                    sysprotreelistinfo.cs.c[i].image
                                );
                            }
                        }
                    }
                    //Check the JSON file that we got to see if we need to cater for hyperlinks on a grid
                    if (treeList.cls && treeList.cls.cl) {
                        //Loop through each item in cls/cl, get the column name and event number
                        for (i = 0; i < treeList.cls.cl.length; i++) {
                            var linkColumnName = treeList.cls.cl[i].col;
                            var linkColumnEvent = treeList.cls.cl[i].event;
                            //Loop through the columns in the grid for each of the hyperlink columns
                            for (j = 0; j < sysprotreelistinfo.cs.c.length; j++) {
                                if (linkColumnName === sysprotreelistinfo.cs.c[j].field) {
                                    //If the column is boolean or date don't hyperlink it
                                    if (
                                        sysprotreelistinfo.cs.c[j].type === 'boolean' ||
                                        sysprotreelistinfo.cs.c[j].type === 'date'
                                    )
                                        break;
                                    var defaultTemplate = '#=' + linkColumnName + '#';
                                    if (sysprotreelistinfo.cs.c[j].template) {
                                        defaultTemplate = sysprotreelistinfo.cs.c[j].template;
                                    }
                                    sysprotreelistinfo.cs.c[j].template =
                                        '<span class="syspro-grid-row-hyperlink" data-eventnum="' +
                                        sysprotreelistinfo.cs.c[j].field +
                                        '|' +
                                        linkColumnEvent +
                                        '">' +
                                        defaultTemplate +
                                        '</span>';
                                    break;
                                }
                            }
                        }
                    }
                }
                var initialAggregates = [];
                //Cater for the aggregates
                if (sysprotreelistinfo.aggregate) {
                    initialAggregates = sysprotreelistinfo.aggregate;
                }

                //Check if we want to append data to the grid that already has data in it
                if (dataIn.IsAppend == true) {
                    //If we in here then there is a grid and we want to append
                    //For perf issues, get what is in the grid and append
                    var currentLinesInTree = tree.dataSource.data().toJSON();
                    var newLinesToAppend = currentLinesInTree.concat(treeList.rs.r);
                    dataSource = new kendo.data.TreeListDataSource({
                        data: newLinesToAppend,
                        aggregate: initialAggregates,
                        schema: {
                            parse: function(data) {
                                $.each(data, function(index, item) {
                                    $.each(dateColumnsHolder, function(index) {
                                        item[this] = kendo.parseDate(
                                            item[this],
                                            sysprotreelistinfo.prop.sysproDateFormatIn
                                        );
                                    });
                                });

                                return data;
                            },
                            model: {
                                fields: columnModel,
                            },
                        }, //used for editable grids
                    });
                } else {
                    dataSource = new kendo.data.TreeListDataSource({
                        data: treeList.rs.r,
                        aggregate: initialAggregates,
                        schema: {
                            parse: function(data) {
                                $.each(data, function(index, item) {
                                    $.each(dateColumnsHolder, function(index) {
                                        item[this] = kendo.parseDate(
                                            item[this],
                                            sysprotreelistinfo.prop.sysproDateFormatIn
                                        );
                                    });
                                });

                                return data;
                            },
                            model: {
                                fields: columnModel,
                            },
                        }, //used for editable grids
                    });
                }

                //Now we re-create the grid
                var treeEditable = false;
                if (treeDiv.length > 0) {
                    //Bind Columns and properties
                    if (sysprotreelistinfo.prop.editable === true) {
                        treeEditable = true;
                        //If the treelist is editable and it has more than one column and it hasn't already added one then add an edit column to the start.
                        if (
                            sysprotreelistinfo.cs.c.length > 0 &&
                            (!sysprotreelistinfo.cs.c[0].command || sysprotreelistinfo.cs.c[0].command.length !== 1)
                        ) {
                            sysprotreelistinfo.cs.c.unshift({
                                title: ' ',
                                command: [{ name: 'edit', text: { edit: ' ', update: ' ', cancel: ' ' } }],
                                width: 100,
                            });
                            //Make the next column expandable.
                            sysprotreelistinfo.cs.c[1].expandable = true;
                        }
                    }
                    //Add a toolbar if required
                    var htmlForToolbar = '';
                    if (sysprotreelistinfo.tbs) {
                        if (sysprotreelistinfo.tbs.tb) {
                            var template = kendo.template($('#gridToolbarTemplate').html());
                            var toolbar = sysprotreelistinfo.tbs.tb;
                            $.each(toolbar, function(index) {
                                htmlForToolbar = htmlForToolbar + template(this);
                            });
                        }
                    }
                    treeDiv.kendoTreeList({
                        dataSource: dataSource,
                        height: sysprotreelistinfo.prop.height, //I just bound the height, we can change it in ConvertXmlToJSON
                        sortable: sysprotreelistinfo.prop.sortable,
                        filterable: sysprotreelistinfo.prop.filterable,
                        groupable: sysprotreelistinfo.prop.groupable,
                        columnMenu: sysprotreelistinfo.prop.columnMenu,
                        resizable: true,
                        reorderable: true,
                        selectable: true,
                        navigatable: true,
                        editable: treeEditable,
                        messages: {
                            noRows: sysprotreelistinfo.prop.sysprotranNoItemText,
                        },
                        toolbar: htmlForToolbar,
                        columns: sysprotreelistinfo.cs.c,
                        edit: function(e1) {
                            //When the update and cancel buttons are shown, take away the text to simplify them and lower the max width so they take up less space.
                            $('.k-grid-update', treeDiv).css('min-width', '10px');
                            $('.k-grid-cancel', treeDiv).css('min-width', '10px');
                            $('.k-grid-update', treeDiv)
                                .contents()
                                .filter(function() {
                                    return this.nodeType == 3;
                                })
                                .remove();
                            $('.k-grid-cancel', treeDiv)
                                .contents()
                                .filter(function() {
                                    return this.nodeType == 3;
                                })
                                .remove();
                        },
                        dataBound: function() {
                            //When the edit buttons are shown, take away the text to simplify them and lower the max width so they take up less space.
                            $('.k-grid-edit', treeDiv).css('min-width', '10px');
                            $('.k-grid-edit', treeDiv)
                                .contents()
                                .filter(function() {
                                    return this.nodeType == 3;
                                })
                                .remove();
                            $('.syspro-grid-row-hyperlink', treeDiv).on('click', function(e) {
                                sysproInterop.sysTreeListCellClick(e.target);
                            });
                            $('.k-grid-edit', treeDiv).each(function() {
                                if (
                                    $(this)
                                        .closest('tr')
                                        .hasClass('k-treelist-group')
                                ) {
                                    $(this).hide();
                                }
                            });
                            //Toolbar GridSearch TextBox
                            $('.gridSearchTextBox', treeDiv).off('input');
                            $('.gridSearchTextBox', treeDiv).on('input', function(e) {
                                var tree = treeDiv.data('kendoTreeList');

                                var columns = tree.columns;
                                var valueToCompare = e.target.value;
                                valueToCompare = valueToCompare.trim();
                                if (valueToCompare === '') {
                                    tree.dataSource.filter([]);
                                } else {
                                    var filter = [{ logic: 'or', filters: [] }];
                                    columns.forEach(function(x) {
                                        if (x.field) {
                                            var type = x.type;
                                            //If it is a combobox ignore it
                                            if (!x.isCombbox) {
                                                if (!type) {
                                                    type = 'string';
                                                }
                                                if (type === 'string') {
                                                    filter[0].filters.push({
                                                        field: x.field,
                                                        operator: 'contains',
                                                        value: e.target.value,
                                                    });
                                                } else if (type == 'number') {
                                                    if (sysproInterop.isNumeric(e.target.value)) {
                                                        filter[0].filters.push({
                                                            field: x.field,
                                                            operator: 'eq',
                                                            value: e.target.value,
                                                        });
                                                    }
                                                } else if (type == 'date') {
                                                    var data = grid.dataSource.data();
                                                    for (var i = 0; i < data.length; i++) {
                                                        var dateStr = kendo.format(x.format, data[i][x.field]);
                                                        // change to includes() if you wish to filter that way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
                                                        if (dateStr.startsWith(e.target.value)) {
                                                            filter[0].filters.push({
                                                                field: x.field,
                                                                operator: 'eq',
                                                                value: data[i][x.field],
                                                            });
                                                        }
                                                    }
                                                } else if (
                                                    type == 'boolean' &&
                                                    sysproInterop.getBoolean(e.target.value) !== null
                                                ) {
                                                    var bool = sysproInterop.getBoolean(e.target.value);
                                                    filter[0].filters.push({
                                                        field: x.field,
                                                        operator: 'eq',
                                                        value: bool,
                                                    });
                                                }
                                            }
                                        }
                                    });
                                    tree.dataSource.filter(filter);
                                }
                            });
                            //Toolbar gridLabelTextBox
                            $('.gridLabelTextBox', treeDiv).off('keydown');
                            $('.gridLabelTextBox', treeDiv).on('keydown', function(e) {
                                //Check for a TAB(9) or ENTER(13) keycode and bubble the event up
                                if (e.keyCode === 9 || e.keyCode === 13) {
                                    var eventId = e.currentTarget.getAttribute('data-gridbuttoneventid');
                                    var textBoxValue = e.target.value;
                                    sysproInterop.eventTrigged(
                                        textBoxValue,
                                        eventId,
                                        '',
                                        '',
                                        'gridToolBarTextChanged',
                                        function(e) {},
                                        function(e) {}
                                    );
                                }
                            });

                            //Toobar Button Click Event
                            $('.gridButton', treeDiv).off('click');
                            $('.gridButton', treeDiv).on('click', function(e) {
                                var eventId = e.currentTarget.getAttribute('data-gridbuttoneventid');
                                if (eventId) {
                                    var dataInObject = {};
                                    dataInObject.FieldName = dataIn.FieldName;
                                    dataInObject.InternalEventParameter = '{}';
                                    switch (eventId) {
                                        case '':
                                            break;
                                        case 'excelexport':
                                            dataInObject.InternalEvent = 'ExcelExport';
                                            sysproInterop.treeRequestInternalEvent(dataInObject);
                                            break;
                                        case 'pdfexport':
                                            dataInObject.InternalEvent = 'PDFExport';
                                            sysproInterop.treeRequestInternalEvent(dataInObject);
                                            break;
                                        case 'expandall':
                                            dataInObject.InternalEvent = 'ExpandAll';
                                            sysproInterop.treeRequestInternalEvent(dataInObject);
                                            break;
                                        case 'collapseall':
                                            dataInObject.InternalEvent = 'CollapseAll';
                                            sysproInterop.treeRequestInternalEvent(dataInObject);
                                            break;
                                        default:
                                            sysproInterop.eventTrigged(
                                                dataIn.FieldName,
                                                eventId,
                                                '',
                                                '',
                                                'gridButtonClicked',
                                                function(e) {},
                                                function(e) {}
                                            );
                                            break;
                                    }
                                }
                            });
                            //Finally initialize any tooltips  in the toolbar of  the grid.
                            queryLayoutUIHelpers.initializeTooltips();
                            treeDiv
                                .data('kendoTreeList')
                                .tbody.find('tr')
                                .each(function() {
                                    kendo.bind(this, treeDiv.data('kendoTreeList').dataItem(this));
                                });
                        },
                    });
                }
                //Get the tree object
                var treeObject = treeDiv.data('kendoTreeList');

                //Check if there is rowSelection event required create the event handle
                if (sysprotreelistinfo.prop.sysproRowSelection === true) {
                    treeObject.bind('change', sysproInterop.treeRowSelected);
                }

                //Now check if there are sysexpanded nodes and expand those nodes
                var matchingResults = $.grep(treeObject.dataSource.data(), function(d) {
                    return d['sysexpanded'] === true;
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
                sysproInterop.applyCheckBoxTreeContentChangeEvent(treeDiv);
            });
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'refreshTreeList');
        }
    },
    applyCheckBoxTreeContentChangeEvent: function(treeDiv) {
        try {
            //This function is to support editable checkbox checked/unchecked events
            $('.k-grid-content', treeDiv).off('change', 'input.sysEditTreeCheckBox');
            $('.k-grid-content', treeDiv).on('change', 'input.sysEditTreeCheckBox', function(e) {
                var tree = treeDiv.data('kendoTreeList');
                //Get the current dataItem
                var currentDataItem = tree.dataItem($(e.target).closest('tr'));
                var rowItem = tree.tbody.find("tr[data-uid='" + currentDataItem.uid + "']");
                tree.select(rowItem);

                //Get the row and Column index
                var row = $(e.target).closest('tr');
                var rowIdx = $('tr', tree.tbody).index(row);
                var colIdx = $('td', row).index(e.target.parentElement);
                //If the grid is currently group remove 1 from colIndex
                if (tree._group === true) {
                    colIdx = colIdx - 1;
                }

                var colName = tree.columns[colIdx].field;

                //Set the value of the checkbox, do it this way instead of the normal set
                currentDataItem[colName] = this.checked;
                currentDataItem = tree.dataSource.data()[rowIdx];
                rowIdx++;

                //Is this the last row we are editing
                var isLastRow = false;
                if (rowIdx == tree.dataSource.total()) {
                    isLastRow = true;
                }

                var returnChangeEventData = rowIdx + '|' + isLastRow + '|' + colName + '|' + this.checked + '|';

                //Now return the values of each cell
                if (currentDataItem !== null) {
                    var columnDetails = currentDataItem.toJSON();
                    $.each(columnDetails, function(key, value) {
                        //If the node key starts with "syscolor" or "sysbgcolor" don't output
                        if (
                            key.indexOf('syscolor') === -1 &&
                            key.indexOf('sysbgcolor') === -1 &&
                            key.indexOf('sysdisabled') === -1 &&
                            key.indexOf('sysexpanded') === -1 &&
                            key.indexOf('sysdec') === -1
                        ) {
                            //Check if the column is a date as we want to return the date in the format that it was given
                            var columnIsDate = false;
                            var columnIsComboBox = false;
                            //Flag the field if it is a date or combobox
                            for (i = 0; i < tree.columns.length; i++) {
                                if (tree.columns[i].field === key && tree.columns[i].type === 'date') {
                                    columnIsDate = true;
                                    break;
                                }
                                if (tree.columns[i].field === key && tree.columns[i].isCombbox) {
                                    columnIsComboBox = true;
                                    break;
                                }
                            }
                            //Check if the column is a date and return it in the correct format
                            if (columnIsDate) {
                                returnChangeEventData =
                                    returnChangeEventData + sysproInterop.convertDateForGridOutput(value) + '|';
                            } else if (columnIsComboBox) {
                                returnChangeEventData = returnChangeEventData + value.key + '|';
                            } else {
                                returnChangeEventData = returnChangeEventData + value + '|';
                            }
                        }
                    });
                }

                var fieldName = treeDiv.data('sysprotreefieldname');
                //Raise the event up to SYSPRO
                sysproInterop.eventTrigged(fieldName, returnChangeEventData, '', '', 'gridCellChanged', function(e) {});

                //check if I need to update the header
                sysproInterop.gridAutoCheckTreeColumnHeader(treeDiv);
            });

            //Handle the Checkbox Header check event
            $('.header-checkbox', treeDiv).off('click');
            $('.header-checkbox', treeDiv).on('click', function(ev) {
                ev.stopPropagation();
                var columnName = ev.target.getAttribute('data-columnname');
                var columnChecked = ev.target.checked;
                var tree = treeDiv.data('kendoTreeList');

                $.each(tree.dataSource.data(), function(rowIndex) {
                    var dataItem = tree.dataSource.at(rowIndex);
                    dataItem[columnName] = columnChecked;
                });
                var colIdx = ev.target.parentElement.cellIndex;

                tree.tbody.find('tr').each(function() {
                    var htmlitem = $('input', $('td', this)[colIdx])[0];
                    htmlitem.checked = columnChecked;
                });

                //Set the checkbox to the value it was, the grid.refresh, re-paints the checkbox
                setTimeout(function() {
                    ev.target.checked = ev.target.checked;
                });
                returnChangeEventData = columnName + '|' + columnChecked;
                var fieldName = treeDiv.data('sysprotreefieldname');
                sysproInterop.eventTrigged(fieldName, returnChangeEventData, '', '', 'gridHeaderChecked', function(
                    e
                ) {});
            });
            sysproInterop.gridAutoCheckTreeColumnHeader(treeDiv);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'applyContentTreeChangeEvent');
        }
    },
    //This functions gets called to check if ALL the checkboxes across all the columns should be checked
    gridAutoCheckTreeColumnHeader: function(treeDiv) {
        if (treeDiv) {
            var tree = treeDiv.data('kendoTreeList');
            if (tree) {
                var treeColumns = tree.columns;
                var treeColumnsResults = $.grep(treeColumns, function(d) {
                    return d['showInCheckBoxHeader'] === true;
                });
                //Do we have any columns headers with a checkbox
                if (treeColumnsResults) {
                    if (treeColumnsResults.length > 0) {
                        for (i = 0; i < treeColumnsResults.length; i++) {
                            var checkBoxColumn = $(
                                "input[data-columnname='" + treeColumnsResults[i].field + "']",
                                treeDiv
                            );
                            if (checkBoxColumn) {
                                if (checkBoxColumn[0]) {
                                    //get the datasource and check if there are any rows that unchecked
                                    var treeData = tree.dataSource.data();
                                    //First get a list of everything that isn't a parent
                                    treeData = $.grep(treeData, function(d) {
                                        return d['parentId'] !== null;
                                    });

                                    if (treeData.length > 0) {
                                        //Find all rows that are false
                                        var matchingResults = $.grep(treeData, function(d) {
                                            return d[treeColumnsResults[i].field] === false;
                                        });
                                        if (matchingResults) {
                                            //If there are no false rows check the header checkbox
                                            if (matchingResults.length == 0) {
                                                checkBoxColumn[0].checked = true;
                                            } else {
                                                checkBoxColumn[0].checked = false;
                                            }
                                        }
                                    } else {
                                        checkBoxColumn[0].checked = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    //When a hyperlink inside a tree is clicked
    sysTreeListCellClick: function(item) {
        //Get the event number, this could be in a span depending on the formating(bgcolor, hyperlink, etc. If it is in a span get the event number from parentNode
        var eventNumber = '';
        if ($(item).data('eventnum')) {
            eventNumber = $(item).data('eventnum');
        } else {
            var parentNode = item.parentNode;
            eventNumber = $(parentNode).data('eventnum');
        }

        //Based on the item, get the grid
        var treeDiv = $(item).closest('.syspro-tree-list');
        var tree = treeDiv.data('kendoTreeList');
        var fieldName = treeDiv.data('sysprotreefieldname');
        var row = tree.dataItem($(item).closest('tr'));
        var rowTr = $(item).closest('tr');

        //First we have to fire the selected row event
        rowTr.data('sysignorerowselectedevent', true);
        var currentDataItem = tree.dataItem(row);
        var currentSelectedItem = rowTr.index() + '|';
        if (currentDataItem !== null) {
            var columnDetails = currentDataItem.toJSON();
            $.each(columnDetails, function(key, value) {
                //If the node key starts with "syscolor" or "sysbgcolor" don't output
                if (
                    key.indexOf('syscolor') === -1 &&
                    key.indexOf('sysbgcolor') === -1 &&
                    key.indexOf('sysdisabled') === -1 &&
                    key.indexOf('sysexpanded') === -1 &&
                    key.indexOf('sysdec') === -1
                ) {
                    //Check if the column is a date as we want to return the date in the format that it was given
                    var columnIsDate = false;
                    for (i = 0; i < tree.columns.length; i++) {
                        if (tree.columns[i].field === key && tree.columns[i].type === 'date') {
                            columnIsDate = true;
                        }
                    }
                    //Check if the column is a date and return it in the correct format
                    if (columnIsDate) {
                        currentSelectedItem = currentSelectedItem + sysproInterop.convertDateForGridOutput(value) + '|';
                    } else {
                        currentSelectedItem = currentSelectedItem + value + '|';
                    }
                }
            });
            sysproInterop.eventTrigged(
                fieldName,
                currentSelectedItem,
                '',
                '',
                'treeRowSelected',
                function(e) {},
                function(e) {}
            );
        }

        //Raise the Hyperlink clicked event
        var sysTreeListCellClickResult = eventNumber + '|';
        $.each(columnDetails, function(key, value) {
            //If the node key starts with "syscolor" or "sysbgcolor" don't output
            if (
                key.indexOf('syscolor') === -1 &&
                key.indexOf('sysbgcolor') === -1 &&
                key.indexOf('sysdisabled') === -1 &&
                key.indexOf('sysexpanded') === -1 &&
                key.indexOf('sysdec') === -1
            ) {
                //Check if the column is a date as we want to return the date in the format that it was given
                var columnIsDate = false;
                var columnIsComboBox = false;
                //Flag the field if it is a date or combobox
                for (i = 0; i < tree.columns.length; i++) {
                    if (tree.columns[i].field === key && tree.columns[i].type === 'date') {
                        columnIsDate = true;
                        break;
                    }
                    if (tree.columns[i].field === key && tree.columns[i].isCombbox) {
                        columnIsComboBox = true;
                        break;
                    }
                }
                //Check if the column is a date and return it in the correct format
                if (columnIsDate) {
                    sysTreeListCellClickResult =
                        sysTreeListCellClickResult + sysproInterop.convertDateForGridOutput(value) + '|';
                } else if (columnIsComboBox) {
                    sysTreeListCellClickResult = sysTreeListCellClickResult + value.key + '|';
                } else {
                    sysTreeListCellClickResult = sysTreeListCellClickResult + value + '|';
                }
            }
        });
        sysproInterop.eventTrigged(
            fieldName,
            sysTreeListCellClickResult,
            '',
            '',
            'treeHyperlinkClicked',
            function(e) {},
            function(e) {}
        );
    },
    treeRequestInternalEvent: function(dataIn) {
        try {
            //Get the treeDivs
            var treeDivs = $('*[data-sysprotreefieldname="' + dataIn.FieldName + '"]');
            var currentSelectedItem = '';
            var dataItem;
            var SplitInternalEventParameter;
            if (treeDivs.length > 0) {
                //Get the tree
                var tree = treeDivs.data('kendoTreeList');
                if (tree !== null) {
                    switch (dataIn.InternalEvent) {
                        //GetSelectedRow
                        case 'GetSelectedRow':
                            currentSelectedItem = 'false';
                            var selectedRow = tree.select();
                            var currentDataItem = tree.dataItem(tree.select());
                            if (currentDataItem) {
                                currentSelectedItem = selectedRow.index() + '|';
                                var columnDetails = currentDataItem.toJSON();
                                $.each(columnDetails, function(key, value) {
                                    //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                    if (
                                        key.indexOf('syscolor') === -1 &&
                                        key.indexOf('sysbgcolor') === -1 &&
                                        key.indexOf('sysdisabled') === -1 &&
                                        key.indexOf('sysexpanded') === -1 &&
                                        key.indexOf('sysdec') === -1
                                    ) {
                                        //Check if the column is a date as we want to return the date in the format that it was given
                                        var columnIsDate = false;
                                        for (i = 0; i < tree.columns.length; i++) {
                                            if (tree.columns[i].field === key && tree.columns[i].type === 'date') {
                                                columnIsDate = true;
                                            }
                                        }
                                        //Check if the column is a date and return it in the correct format
                                        if (columnIsDate) {
                                            currentSelectedItem =
                                                currentSelectedItem +
                                                sysproInterop.convertDateForGridOutput(value) +
                                                '|';
                                        } else {
                                            currentSelectedItem = currentSelectedItem + value + '|';
                                        }
                                    }
                                });
                            }
                            break;
                        case 'SetSelectedRow':
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            var rowId = SplitInternalEventParameter[0];
                            var bubbleEvent = SplitInternalEventParameter[1];
                            var dataItem = tree.dataSource.at(rowId);
                            if (dataItem) {
                                var row = tree.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                                tree.select(row);
                                if (bubbleEvent === 'true') {
                                    var columnDetails = dataItem.toJSON();
                                    $.each(columnDetails, function(key, value) {
                                        //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                        if (
                                            key.indexOf('syscolor') === -1 &&
                                            key.indexOf('sysbgcolor') === -1 &&
                                            key.indexOf('sysdisabled') === -1 &&
                                            key.indexOf('sysexpanded') === -1 &&
                                            key.indexOf('sysdec') === -1
                                        ) {
                                            //Check if the column is a date as we want to return the date in the format that it was given
                                            var columnIsDate = false;
                                            for (i = 0; i < tree.columns.length; i++) {
                                                if (tree.columns[i].field === key && tree.columns[i].type === 'date') {
                                                    columnIsDate = true;
                                                }
                                            }
                                            //Check if the column is a date and return it in the correct format
                                            if (columnIsDate) {
                                                currentSelectedItem =
                                                    currentSelectedItem +
                                                    sysproInterop.convertDateForGridOutput(value) +
                                                    '|';
                                            } else {
                                                currentSelectedItem = currentSelectedItem + value + '|';
                                            }
                                        }
                                    });
                                    sysproInterop.eventTrigged(
                                        dataIn.FieldName,
                                        currentSelectedItem,
                                        '',
                                        '',
                                        'treeRowSelected',
                                        function(e) {},
                                        function(e) {}
                                    );
                                }
                            }
                            currentSelectedItem = '';
                            break;
                        //dataIn.InternalEventParameter = "4|a1|value|true" where 4 is the row number and a1 is the column name and the value to be updated
                        case 'SetCellValue':
                            var tree = treeDivs.data('kendoTreeList');
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            var itemRowNumber = SplitInternalEventParameter[0] - 1;
                            var valueToUpdate;
                            if (tree) {
                                dataItem = tree.dataSource.data()[itemRowNumber];
                                if (dataItem !== null) {
                                    if (SplitInternalEventParameter[2] === 'true') {
                                        valueToUpdate = true;
                                    } else if (SplitInternalEventParameter[2] === 'false') {
                                        valueToUpdate = false;
                                    } else {
                                        valueToUpdate = SplitInternalEventParameter[2];
                                    }
                                    dataItem.set(SplitInternalEventParameter[1], valueToUpdate);
                                    dataItem.dirtyFields = {};
                                    dataItem.dirty = false;

                                    //Is this a Boolean
                                    var itemCellIndex = 0;
                                    var isBoolean = false;
                                    //Now get the cell index
                                    for (j = 0; j < tree.columns.length; j++) {
                                        if (tree.columns[j].field === SplitInternalEventParameter[1]) {
                                            itemCellIndex = j;
                                            if (tree.columns[j].type === 'boolean') {
                                                isBoolean = true;
                                            }
                                            break;
                                        }
                                    }

                                    //Check if this is a boolean
                                    if (isBoolean) {
                                        var row = tree.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                                        if (row) {
                                            var htmlitem = $('input', $('td', row)[itemCellIndex])[0];
                                            if (htmlitem) {
                                                htmlitem.checked = valueToUpdate;
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        case 'GetAllMatchedRows':
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            var columnToMatch = SplitInternalEventParameter[0];
                            var valueToMatch = SplitInternalEventParameter[1];
                            //If the valueToMatch is "true" or "false" make it true or false
                            if (valueToMatch === 'true') {
                                valueToMatch = true;
                            }
                            if (valueToMatch === 'false') {
                                valueToMatch = false;
                            }
                            //If the column to match is the parentId then treat the valueToMatch as a number
                            if (columnToMatch === 'parentId') {
                                valueToMatch = parseInt(valueToMatch, 10);
                            }
                            //We allow for 2 filters, check if we have a 2nd one
                            var columnToMatch1 = '';
                            var valueToMatch1 = '';
                            var matchingResults;
                            var treeData = tree.dataSource.data();
                            if (SplitInternalEventParameter.length > 2) {
                                columnToMatch1 = SplitInternalEventParameter[2];
                                valueToMatch1 = SplitInternalEventParameter[3];
                                //Do the grep with 2 filters
                                matchingResults = $.grep(treeData, function(d) {
                                    return d[columnToMatch] === valueToMatch && d[columnToMatch1] === valueToMatch1;
                                });
                            } else {
                                //Do the grep with 1 filter
                                matchingResults = $.grep(treeData, function(d) {
                                    return d[columnToMatch] === valueToMatch;
                                });
                            }

                            currentSelectedItem = 'false';
                            if (matchingResults) {
                                if (matchingResults.length > 0) {
                                    currentSelectedItem = '';
                                    //Loop through each item in the matching result
                                    for (var k = 0; k < matchingResults.length; k++) {
                                        var selectedItem = tree.dataSource.getByUid(matchingResults[k].uid);
                                        var row = tree.tbody.find("tr[data-uid='" + selectedItem.uid + "']");
                                        if (row) {
                                            var rowIndex = row[0].rowIndex;
                                            rowIndex++;
                                            currentSelectedItem = currentSelectedItem + rowIndex + '|';
                                            var columnDetails = selectedItem.toJSON();
                                            $.each(columnDetails, function(key, value) {
                                                //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                                if (
                                                    key.indexOf('syscolor') === -1 &&
                                                    key.indexOf('sysbgcolor') === -1 &&
                                                    key.indexOf('sysdisabled') === -1 &&
                                                    key.indexOf('sysexpanded') === -1 &&
                                                    key.indexOf('sysdec') === -1
                                                ) {
                                                    //Check if the column is a date as we want to return the date in the format that it was given
                                                    var columnIsDate = false;
                                                    var columnIsComboBox = false;
                                                    //Flag the field if it is a date or combobox
                                                    for (i = 0; i < tree.columns.length; i++) {
                                                        if (
                                                            tree.columns[i].field === key &&
                                                            tree.columns[i].type === 'date'
                                                        ) {
                                                            columnIsDate = true;
                                                            break;
                                                        }
                                                        if (
                                                            tree.columns[i].field === key &&
                                                            tree.columns[i].isCombbox
                                                        ) {
                                                            columnIsComboBox = true;
                                                            break;
                                                        }
                                                    }
                                                    //Check if the column is a date and return it in the correct format
                                                    if (columnIsDate) {
                                                        currentSelectedItem =
                                                            currentSelectedItem +
                                                            sysproInterop.convertDateForGridOutput(value) +
                                                            '|';
                                                    } else if (columnIsComboBox) {
                                                        currentSelectedItem = currentSelectedItem + value.key + '|';
                                                    } else {
                                                        currentSelectedItem = currentSelectedItem + value + '|';
                                                    }
                                                }
                                            });
                                            currentSelectedItem = currentSelectedItem + '\r\n'; //Add carridge return
                                        }
                                    }
                                }
                            }
                            break;
                        case 'SelectRowAt':
                            var rowId = +dataIn.InternalEventParameter;
                            rowId = rowId - 1;
                            var dataItem = tree.dataSource.at(rowId);
                            if (dataItem) {
                                var row = tree.tbody.find("tr[data-uid='" + dataItem.uid + "']");
                                tree.select(row);
                            }
                            break;
                        case 'GetChildRows':
                            var rowId = +dataIn.InternalEventParameter;
                            rowId = rowId - 1;
                            var dataItem = tree.dataSource.at(rowId);
                            if (dataItem) {
                                if (dataItem.hasChildren) {
                                    var children = tree.dataSource.childNodes(dataItem);
                                    currentSelectedItem = '';
                                    //Loop through each item in the matching result
                                    for (var k = 0; k < children.length; k++) {
                                        var selectedItem = tree.dataSource.getByUid(children[k].uid);
                                        var row = tree.tbody.find("tr[data-uid='" + selectedItem.uid + "']");
                                        if (row) {
                                            var rowIndex = row[0].rowIndex;
                                            rowIndex++;
                                            currentSelectedItem = currentSelectedItem + rowIndex + '|';
                                            var columnDetails = selectedItem.toJSON();
                                            $.each(columnDetails, function(key, value) {
                                                //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                                if (
                                                    key.indexOf('syscolor') === -1 &&
                                                    key.indexOf('sysbgcolor') === -1 &&
                                                    key.indexOf('sysdisabled') === -1 &&
                                                    key.indexOf('sysexpanded') === -1 &&
                                                    key.indexOf('sysdec') === -1
                                                ) {
                                                    //Check if the column is a date as we want to return the date in the format that it was given
                                                    var columnIsDate = false;
                                                    var columnIsComboBox = false;
                                                    //Flag the field if it is a date or combobox
                                                    for (i = 0; i < tree.columns.length; i++) {
                                                        if (
                                                            tree.columns[i].field === key &&
                                                            tree.columns[i].type === 'date'
                                                        ) {
                                                            columnIsDate = true;
                                                            break;
                                                        }
                                                        if (
                                                            tree.columns[i].field === key &&
                                                            tree.columns[i].isCombbox
                                                        ) {
                                                            columnIsComboBox = true;
                                                            break;
                                                        }
                                                    }
                                                    //Check if the column is a date and return it in the correct format
                                                    if (columnIsDate) {
                                                        currentSelectedItem =
                                                            currentSelectedItem +
                                                            sysproInterop.convertDateForGridOutput(value) +
                                                            '|';
                                                    } else if (columnIsComboBox) {
                                                        currentSelectedItem = currentSelectedItem + value.key + '|';
                                                    } else {
                                                        currentSelectedItem = currentSelectedItem + value + '|';
                                                    }
                                                }
                                            });
                                            currentSelectedItem = currentSelectedItem + '\r\n'; //Add carridge return
                                        }
                                    }
                                }
                            }
                            break;
                        case 'Size':
                            currentSelectedItem = tree.dataSource.total() + '|';
                            break;
                        case 'ExpandAll':
                            var rows = $('tr.k-treelist-group', tree.tbody);
                            if (rows) {
                                $.each(rows, function(idx, row) {
                                    tree.expand(row);
                                });
                            }
                            break;
                        case 'CollapseAll':
                            var rows = $('tr.k-treelist-group', tree.tbody);
                            if (rows) {
                                $.each(rows, function(idx, row) {
                                    tree.collapse(row);
                                });
                            }
                            break;
                        case 'ExcelExport':
                            if (tree) {
                                tree.saveAsExcel();
                            }
                            break;
                        case 'PDFExport':
                            if (tree) {
                                tree.saveAsPDF();
                            }
                            break;
                        case 'GetAllGridRows':
                            var allGridRows = '';
                            currentSelectedItem = 'false';
                            $.each(tree.dataSource.data(), function(rowIndex) {
                                var rowItem = tree.dataSource.at(rowIndex);
                                var oneBaseIndex = rowIndex + 1;
                                currentSelectedItem = oneBaseIndex + '|';
                                $.each(rowItem, function(key, value) {
                                    //If the node key starts with "syscolor" or "sysbgcolor" don't output
                                    if (
                                        key.indexOf('syscolor') === -1 &&
                                        key.indexOf('sysbgcolor') === -1 &&
                                        key.indexOf('sysdisabled') === -1 &&
                                        key.indexOf('sysexpanded') === -1 &&
                                        key.indexOf('sysdec') === -1
                                    ) {
                                        var columnFound = false;
                                        var columnIsDate = false;
                                        var columnIsComboBox = false;
                                        //Flag the field if it is a date or combobox
                                        for (i = 0; i < tree.columns.length; i++) {
                                            if (tree.columns[i].field === key) {
                                                columnFound = true;
                                                if (tree.columns[i].type === 'date') {
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
                                        //Append the column data
                                        if (columnIsDate === true) {
                                            currentSelectedItem =
                                                currentSelectedItem +
                                                sysproInterop.convertDateForGridOutput(value) +
                                                '|';
                                        } else if (columnIsComboBox) {
                                            currentSelectedItem = currentSelectedItem + value.key + '|';
                                        } else {
                                            currentSelectedItem = currentSelectedItem + value + '|';
                                        }
                                    } else {
                                        if (key === 'syshidden') {
                                            currentSelectedItem = currentSelectedItem + 'syshidden|';
                                        }
                                    }
                                });
                                //Add the row
                                allGridRows = allGridRows + currentSelectedItem + '\r\n';
                            });
                            currentSelectedItem = allGridRows;
                            break;
                    }
                }
            }
            return currentSelectedItem;
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'treeRequestInternalEvent');
        }
    },
    //Tree RowSelection changed
    treeRowSelected: function(e) {
        try {
            var tree = e.sender;
            var treeDiv = e.sender.element;
            var fieldName = treeDiv.data('sysprotreefieldname');
            var selectedRow = this.select();

            var currentSelectedItem = selectedRow.index() + '|';
            if (tree !== null) {
                var currentDataItem = tree.dataItem(this.select());
                if (currentDataItem !== null) {
                    var columnDetails = currentDataItem.toJSON();
                    $.each(columnDetails, function(key, value) {
                        //If the node key starts with "syscolor" or "sysbgcolor" don't output
                        if (
                            key.indexOf('syscolor') === -1 &&
                            key.indexOf('sysbgcolor') === -1 &&
                            key.indexOf('sysdisabled') === -1 &&
                            key.indexOf('sysexpanded') === -1 &&
                            key.indexOf('sysdec') === -1
                        ) {
                            //Check if the column is a date as we want to return the date in the format that it was given
                            var columnIsDate = false;
                            for (i = 0; i < tree.columns.length; i++) {
                                if (tree.columns[i].field === key && tree.columns[i].type === 'date') {
                                    columnIsDate = true;
                                }
                            }
                            //Check if the column is a date and return it in the correct format
                            if (columnIsDate) {
                                currentSelectedItem =
                                    currentSelectedItem + sysproInterop.convertDateForGridOutput(value) + '|';
                            } else {
                                currentSelectedItem = currentSelectedItem + value + '|';
                            }
                        }
                    });

                    if (selectedRow.data('sysignorerowselectedevent') === true) {
                        selectedRow.data('sysignorerowselectedevent', false);
                    } else {
                        sysproInterop.eventTrigged(
                            fieldName,
                            currentSelectedItem,
                            '',
                            '',
                            'treeRowSelected',
                            function(e) {},
                            function(e) {}
                        );
                    }
                }
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'treeRowSelected');
        }
    },
    createTreeView: function(dataIn) {
        try {
            //Find all the treeLists with the specified name
            var treeViewDivs = $('*[data-sysprotreeviewfieldname="' + dataIn.FieldName + '"]');
            $.each(treeViewDivs, function(index) {
                //For each of the treeView create an instance of it
                var treeViewDiv = $(this);

                if (treeViewDiv.data('kendoTreeView')) {
                    treeViewDiv.data('kendoTreeView').destroy(); // destroy the TreeView
                    treeViewDiv.empty();
                }
                //Store the treeList information
                var treeViewData = JSON.parse(dataIn.GridData).tnds;

                var treeViewDataSource = new kendo.data.HierarchicalDataSource({
                    data: treeViewData,
                });

                if (treeViewDiv.length > 0) {
                    treeViewDiv.kendoTreeView({
                        loadOnDemand: true,
                        dataSource: treeViewDataSource,
                        expand: function onExpand(e) {
                            var dataItem = e.sender.dataItem(e.node);
                            if (dataItem) {
                                if (dataItem._loaded === false) {
                                    //Get the Node Level
                                    var nodeLevel = dataItem.level();
                                    nodeLevel = nodeLevel + 1;
                                    //Get the ParentNode
                                    var parentNode = dataItem.parentNode();
                                    //Raise the event
                                    if (parentNode) {
                                        sysproInterop.eventTrigged(
                                            dataIn.FieldName,
                                            dataItem.id +
                                                '|' +
                                                dataItem.text +
                                                '|' +
                                                dataItem.tag +
                                                '|' +
                                                nodeLevel +
                                                '|' +
                                                parentNode.text,
                                            '',
                                            '',
                                            'treeViewNodeExpanded',
                                            function(e) {},
                                            function(e) {}
                                        );
                                    } else {
                                        sysproInterop.eventTrigged(
                                            dataIn.FieldName,
                                            dataItem.id +
                                                '|' +
                                                dataItem.text +
                                                '|' +
                                                dataItem.tag +
                                                '|' +
                                                nodeLevel +
                                                '|',
                                            '',
                                            '',
                                            'treeViewNodeExpanded',
                                            function(e) {},
                                            function(e) {}
                                        );
                                    }
                                }
                            }
                        },
                        select: function onSelect(e) {
                            var dataItem = e.sender.dataItem(e.node);
                            if (dataItem) {
                                //Get the Node Level
                                var nodeLevel = dataItem.level();
                                nodeLevel = nodeLevel + 1;
                                //Get the ParentNode
                                var parentNode = dataItem.parentNode();
                                //Raise the event
                                if (parentNode) {
                                    sysproInterop.eventTrigged(
                                        dataIn.FieldName,
                                        dataItem.id +
                                            '|' +
                                            dataItem.text +
                                            '|' +
                                            dataItem.tag +
                                            '|' +
                                            nodeLevel +
                                            '|' +
                                            parentNode.text,
                                        '',
                                        '',
                                        'treeViewNodeSelected',
                                        function(e) {},
                                        function(e) {}
                                    );
                                } else {
                                    sysproInterop.eventTrigged(
                                        dataIn.FieldName,
                                        dataItem.id + '|' + dataItem.text + '|' + dataItem.tag + '|' + nodeLevel + '|',
                                        '',
                                        '',
                                        'treeViewNodeSelected',
                                        function(e) {},
                                        function(e) {}
                                    );
                                }
                            }
                        },
                    });
                }
            });
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'createTreeView');
        }
    },
    treeViewRequestInternalEvent: function(dataIn) {
        try {
            //Get the treeViewDivs
            var treeDivs = $('*[data-sysprotreeviewfieldname="' + dataIn.FieldName + '"]');
            var currentSelectedItem = '';
            var dataItem;
            var SplitInternalEventParameter;
            if (treeDivs.length > 0) {
                //Get the tree
                var tree = treeDivs.data('kendoTreeView');
                if (tree !== null) {
                    switch (dataIn.InternalEvent) {
                        case 'AddItems':
                            var updateNodeDetails = JSON.parse(dataIn.InternalEventParameter);
                            //Get the specified Row
                            var nodeId = updateNodeDetails.updateinfo.id;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                tree.append(updateNodeDetails.items, tree.findByUid(dataItem.uid));
                            }
                            break;
                        case 'DeleteNode':
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                tree.remove(tree.findByUid(dataItem.uid));
                            }
                            break;
                        case 'CollapseAll':
                            tree.collapse('.k-item');
                            break;
                        case 'ExpandAll':
                            tree.expand('.k-item');
                            break;
                        case 'ExpandNode':
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                tree.expand(tree.findByUid(dataItem.uid));
                            }
                            break;
                        case 'GetParentNode':
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                var parentNode = dataItem.parentNode();
                                if (parentNode) {
                                    //Get the Node Level
                                    var nodeLevel = parentNode.level();
                                    nodeLevel = nodeLevel + 1;
                                    //Get the GrandParentNode
                                    var grandParentNode = parentNode.parentNode();
                                    if (grandParentNode) {
                                        currentSelectedItem =
                                            parentNode.id +
                                            '|' +
                                            parentNode.text +
                                            '|' +
                                            parentNode.tag +
                                            '|' +
                                            nodeLevel +
                                            '|' +
                                            grandParentNode.text;
                                    } else {
                                        currentSelectedItem =
                                            parentNode.id +
                                            '|' +
                                            parentNode.text +
                                            '|' +
                                            parentNode.tag +
                                            '|' +
                                            nodeLevel;
                                    }
                                }
                            }
                            break;
                        case 'GetNode':
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                currentSelectedItem = dataItem.id + '|' + dataItem.text + '|' + dataItem.tag;
                            }
                            break;
                        case 'HasChildren':
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                if (dataItem.hasChildren === true) {
                                    currentSelectedItem = 'true';
                                } else {
                                    currentSelectedItem = 'false';
                                }
                            }
                            break;
                        case 'SetHasChildren':
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
                            var nodeId = SplitInternalEventParameter[0];
                            var nodeHasChildren = SplitInternalEventParameter[1];
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                dataItem.hasChildren = nodeHasChildren;
                                if (nodeHasChildren === false || nodeHasChildren === 'false') {
                                    var items = dataItem.children.data();
                                    for (var i = 0, max = items.length; i < max; i++) {
                                        var item = tree.findByUid(items[0].uid);
                                        tree.remove(item);
                                    }
                                }
                            }
                            break;
                        case 'NumChildren':
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                if (dataItem.items) {
                                    currentSelectedItem = dataItem.items.length;
                                } else {
                                    currentSelectedItem = '0';
                                }
                            }
                            break;
                        case 'SetSelected':
                            var nodeId = dataIn.InternalEventParameter;
                            var dataItem = tree.dataSource.get(nodeId);
                            if (dataItem) {
                                var node = tree.findByUid(dataItem.uid);
                                if (node) {
                                    tree.select(node);
                                    //Fire the treeViewNodeSelected event
                                    //Get the Node Level
                                    var nodeLevel = dataItem.level();
                                    nodeLevel = nodeLevel + 1;
                                    //Get the ParentNode
                                    var parentNode = dataItem.parentNode();
                                    if (parentNode) {
                                        //Raise the event
                                        sysproInterop.eventTrigged(
                                            dataIn.FieldName,
                                            dataItem.id +
                                                '|' +
                                                dataItem.text +
                                                '|' +
                                                dataItem.tag +
                                                '|' +
                                                nodeLevel +
                                                '|' +
                                                parentNode.text,
                                            '',
                                            '',
                                            'treeViewNodeSelected',
                                            function(e) {},
                                            function(e) {}
                                        );
                                    } else {
                                        sysproInterop.eventTrigged(
                                            dataIn.FieldName,
                                            dataItem.id + '|' + dataItem.text + '|' + dataItem.tag + '|' + nodeLevel,
                                            '',
                                            '',
                                            'treeViewNodeSelected',
                                            function(e) {},
                                            function(e) {}
                                        );
                                    }
                                }
                            }
                            break;
                        case 'GetSelected':
                            var selectedNode = tree.select();
                            var dataItem = tree.dataItem(selectedNode);
                            if (dataItem) {
                                //Get the Node Level
                                var nodeLevel = dataItem.level();
                                nodeLevel = nodeLevel + 1;
                                //Get the ParentNode
                                var parentNode = dataItem.parentNode();
                                currentSelectedItem =
                                    dataItem.id +
                                    '|' +
                                    dataItem.text +
                                    '|' +
                                    dataItem.tag +
                                    '|' +
                                    nodeLevel +
                                    '|' +
                                    parentNode.text;
                            }
                            break;
                        case 'UpdateItem':
                            SplitInternalEventParameter = dataIn.InternalEventParameter.split('|');
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
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'treeViewRequestInternalEvent');
        }
    },
    showPopupDialog: function(dataIn) {
        sysproInterop.manualButtonDialogClosed = false;
        //alert(dataIn);
        var buttonsIn = [];

        $.each(dataIn.Buttons, function(e) {
            var buttonId = this.ButtonId;
            var buttonNew = {
                text: this.Caption,
                primary: this.IsDefault,
                action: function(e) {
                    sysproInterop.popupDialogButtonClicked(e, buttonId);
                },
            };
            buttonsIn.push(buttonNew);
        });

        //DataIn will Include the Html for the Dialog. Needs a way to call back to  MA which should lock from a  SYSPRO perspective until its gets the callback.
        var popupHolder = $('#dialog').kendoDialog({
            width: '400px',
            title: dataIn.Title,
            closable: true,
            modal: true,
            content: dataIn.HtmlContent,
            actions: buttonsIn,
            open: function() {
                $.material.init();
            },
            close: function(e) {
                if (!sysproInterop.manualButtonDialogClosed) {
                    sysproInterop.popupDialogOpened = false;
                    var dialogClickedDiv = $('#dialog');
                    var DataOut = {
                        DialogId: $('.dialog-wrapper', dialogClickedDiv).attr('id'),
                        ButtonIdClicked: 'CANCEL',
                        OptionIdSelected: '',
                        CheckBoxChecked: false,
                    };

                    sysproInterop.eventTrigged(
                        JSON.stringify(DataOut),
                        '',
                        '',
                        '',
                        'popupDialogButtonClicked',
                        function(e) {},
                        function(e) {}
                    );
                }
            },
        });
        sysproInterop.popupDialogOpened = true;
        popupHolder.data('kendoDialog').open();
    },
    popupDialogButtonClicked: function(e, buttonId) {
        var dialogClickedDiv = null;
        var dialogClickedObject = null;
        var actionButtonClicked = false;
        if (buttonId) {
            //If a button id is passed through it's a dismiss button so set the manual flag so only one event fires.
            sysproInterop.manualButtonDialogClosed = true;
        }
        if (!buttonId && $(e).hasClass('dialoglink')) {
            dialogClickedDiv = $('#dialog');
            dialogClickedObject = dialogClickedDiv.data('kendoDialog');
            buttonId = $(e).data('buttonid');

            actionButtonClicked = true;
        } else {
            dialogClickedObject = e.sender;

            dialogClickedDiv = dialogClickedObject.element;
        }

        var optionId = '';
        //Now get the value of Options in the form.
        if ($('input.dialog-option-radio:checked', dialogClickedDiv).length > 0)
            optionId = $('input.dialog-option-radio:checked', dialogClickedDiv).val();
        //SYSPRO seems  to  support  only single check box  so if any check box  is  checked  then set it to true.
        var checkboxChecked = false;
        if ($('input.dialog-option-checkbox:checked', dialogClickedDiv).length > 0) checkboxChecked = true;
        var textEntered = '';
        if ($('input.dialog-option-text', dialogClickedDiv).length > 0)
            textEntered = $('input.dialog-option-text', dialogClickedDiv).val();

        var DataOut = {
            DialogId: $('.dialog-wrapper', dialogClickedDiv).attr('id'),
            ButtonIdClicked: buttonId,
            OptionIdSelected: optionId,
            CheckBoxChecked: checkboxChecked,
            TextEntered: textEntered,
        };

        sysproInterop.eventTrigged(
            JSON.stringify(DataOut),
            '',
            '',
            '',
            'popupDialogButtonClicked',
            function(e) {},
            function(e) {}
        );

        //assume if actionButtonClicked then close  the  dialog automatically
        if (actionButtonClicked) {
            sysproInterop.manualButtonDialogClosed = true;
            dialogClickedObject.close();
        }
        sysproInterop.popupDialogOpened = false;
    },
    selectFileInternal: function(fileTypes) {
        try {
            sysproInterop.selectFile(
                function(e) {
                    sysproInterop.eventTrigged(
                        JSON.stringify(e),
                        '',
                        '',
                        '',
                        'fileSelected',
                        function(e) {},
                        function(e) {}
                    );
                },
                function(ex) {
                    sysproInterop.handleError(ex.message, 'selectFileInternal');
                    var outputFile = {
                        ErrorMessage: ex.message,
                    };
                    sysproInterop.eventTrigged(
                        JSON.stringify(outputFile),
                        '',
                        '',
                        '',
                        'fileSelected',
                        function(e) {},
                        function(e) {}
                    );
                },
                fileTypes
            );
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'selectFileInternal');
        }
    },
    closeBrowserTab: function() {
        try {
            sysproInterop.ignoreUnload = true;
            window.close();
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'closeBrowserTab');
        }
    },
    closeModalWindow: function(DataIn) {
        try {
            sysproInterop.isProgramaticClose = true;
            console.log('closeModalWindow ' + DataIn);
            var indexRemoved = -1;
            if (DataIn) {
                $.each(sysproInterop.modalWindowHolder, function(index) {
                    if (this.Id == DataIn) {
                        indexRemoved = index;
                        this.Window.close();
                        //BIG disposal change! Regardless of the ModalType, dispose  of the window and remove it.
                        //if (this.ModalType !== 0) {
                        $.each($('.syspro-grid-list', this.Window.element), function(index) {
                            if ($(this).data('kendoGrid')) {
                                //Manually dispose of every kendo grid because of weird disposal issue with Joes new Table structure.
                                $(this)
                                    .data('kendoGrid')
                                    .destroy();
                            }
                        });
                        this.Window.element.remove();
                        // }
                    }
                });
            }

            if (indexRemoved > -1) {
                sysproInterop.modalWindowHolder.splice(indexRemoved, 1);
            } else {
                var lastWindow = sysproInterop.modalWindowHolder.pop();
                //Only if there is a last window then remove it from the list.
                if (lastWindow) {
                    lastWindow.Window.close();

                    //BIG disposal change! Regardless of the ModalType, dispose  of the window and remove it.
                    // if (lastWindow.ModalType !== 0) {
                    $.each($('.syspro-grid-list', lastWindow.Window.element), function(index) {
                        if ($(this).data('kendoGrid')) {
                            //Manually dispose of every kendo grid because of weird disposal issue with Joes new Table structure.
                            $(this)
                                .data('kendoGrid')
                                .destroy();
                        }
                    });
                    lastWindow.Window.element.remove();
                    //}
                } else
                    console.log(
                        'closeModalWindow for ' +
                            DataIn +
                            ' failed because the window was not opened or has already been closed.'
                    );
            }

            if (DataIn && DataIn.trim() === 'IMPTIM') {
                callLayerInterop.avantiPluginLoaded = callLayerInterop.previousAvantiPlugin;
                callLayerInterop.previousAvantiPlugin = '';
            }
            //Rego - TPMT60 when a modal window closed make sure to clear out the already bound flag because it affects TPMT60.
            sysproInterop.bindOnCurrentDivPerformed = false;
            return '';
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'closeModalWindow');
        }
    },
    setModalWindowTitle: function(DataIn) {
        try {
            var indexRemoved = -1;

            if (DataIn) {
                var modalId = DataIn.split('|')[0];
                var modalTitle = DataIn.split('|')[1];

                if (modalId.indexOf('PANELTITLE-') === 0) {
                    //If setModalWindowTitle is used for a panel instead then find the panel with the matching data-guid
                    var panelFound = $('[data-guid="' + modalId.replace('PANELTITLE-', '') + '"]');
                    if (panelFound.length > 0) {
                        $('.panel-heading', panelFound).text(modalTitle);
                    }
                    //After setting the panel title, return so it doesn't try set any modals title.
                    return '';
                }

                $.each(sysproInterop.modalWindowHolder, function(index) {
                    if (this.Id == modalId) {
                        indexRemoved = index;
                        if (this.ModalType !== 0) {
                            $('h4', $(this.Window.element).closest('.offcanvas-header')).html(modalTitle);
                        } else {
                            this.Window.title(modalTitle);
                        }
                    }
                });
            }
            if (indexRemoved === -1) {
                var lastWindow = sysproInterop.modalWindowHolder[sysproInterop.modalWindowHolder.length - 1];
                if (lastWindow) {
                    if (lastWindow.ModalType !== 0) {
                        $('h4', $(lastWindow.Window.element).closest('.offcanvas-header')).html(modalTitle);
                    } else {
                        lastWindow.Window.title(modalTitle);
                    }
                }
            }

            return '';
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'setModalWindowTitle');
        }
    },
    modalWindowClosed: function(DataIn, currentPosition) {
        try {
            //Dont trigger anything for SearchWindowMain
            if (DataIn && DataIn.indexOf('SearchWindowMain') !== 0) {
                //Trigger an event back in SYSPRO to  close  the current program and go  back to the menu in SYSPRO.
                sysproInterop.eventTrigged(
                    DataIn,
                    currentPosition,
                    '',
                    '',
                    'modalWindowClosed',
                    function(e) {},
                    function(e) {}
                );
            }
            sysproInterop.fullBindRequired = null;
            return '';
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'closePopupDialog');
        }
    },
    backToMenu: function() {
        try {
            //Trigger an event back in SYSPRO to  close  the current program and go  back to the menu in SYSPRO.
            sysproInterop.eventTrigged('', '', '', '', 'backToMenu', function(e) {}, function(e) {});
            return '';
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'closePopupDialog');
        }
    },
    modalWindowHolder: [],
    notificationHolder: null,
    showTaskDialog: function(dataIn) {
        //Show Task Dialog Window.
        var parsedModel = JSON.parse(dataIn.HtmlContent);

        if (sysproInterop.taskDialogContentShown === parsedModel.MainInstruction) {
            //If the same instruction is  being shown then dont stack it but rather hide the current one and show the same one.
            if (sysproInterop.notificationHolder) {
                sysproInterop.notificationHolder.hide();
            }
        }
        sysproInterop.taskDialogContentShown = parsedModel.MainInstruction;
        var hideAfterInterval = 4000;
        if (parsedModel.Footer) {
            //If the dialog has a footer, it is a hyperlink so make it "linger longer"
            hideAfterInterval = 8000;
        }
        if (!sysproInterop.notificationHolder) {
            sysproInterop.notificationHolder = $('#taskdialognotification')
                .kendoNotification({
                    position: {
                        pinned: true,
                        top: 60,
                        right: 30,
                    },
                    autoHideAfter: 4000,
                    stacking: 'down',
                    templates: [
                        {
                            type: 'info',
                            template: $('#taskDialogTemplate').html(),
                        },
                    ],
                    show: function(e) {
                        e.element.parent().css({ zIndex: 99999 });
                        $('.task-dialog-hyperlink', e.element).on('click', function() {
                            sysproInterop.eventTrigged(
                                $(this).data('hyperlinkid'),
                                null,
                                null,
                                null,
                                'taskDialogLinkClicked'
                            );
                        });
                    },
                })
                .data('kendoNotification');
        }
        sysproInterop.notificationHolder.show(parsedModel);
    },
    showCustomTaskDialog: function(backgroundColor, iconColor, title, mainInstruction, content, icon) {
        var modalForTaskDialog = {
            BackgroundColor: backgroundColor,
            IconColor: iconColor,
            Title: title,
            MainInstruction: mainInstruction,
            Content: content,
            Icon: icon,
            Hyperlink: '',
            HyperlinkId: '',
        };
        var dataIn = {
            HtmlContent: JSON.stringify(modalForTaskDialog),
        };
        sysproInterop.showTaskDialog(dataIn);
    },
    hideTaskDialogs: function() {
        if (sysproInterop.notificationHolder) {
            sysproInterop.notificationHolder.hide();
        }
    },
    fieldChangedHandler: function(e) {
        var dataFieldName = this.getAttribute('data-fieldname');

        var dataValue = this.value;
        if (this.type == 'checkbox') {
            dataValue = this.checked;
        }
        if (this.classList.contains('syspro-radiobutton-option')) {
            if (this.checked) {
                var radioButtonParent = $(this).closest('.syspro-databound-radiobutton');
                if (radioButtonParent.length) dataFieldName = radioButtonParent[0].getAttribute('data-fieldname');
                else dataFieldName = this.name;
                dataValue = this.value;
            }
        }

        if (!dataFieldName) {
            if (this.classList.contains('syspro-combobox-inform')) {
                if ($('select', $(this).closest('.form-group')).length > 0)
                    dataFieldName = $('select', $(this).closest('.form-group'))[0].getAttribute('data-fieldname');
            }
        }
        //Not sure why a field change on a combo box input field is not triggered because for toolbars it shouldbe the SELECT that is ignored.
        //For fields in forms to be safe I am checking if it is in a form, then don't trigger a change for a select and only for the input becuase it should  fire once in all cases.
        if (
            this.classList.contains('combobox') &&
            ((this.tagName === 'INPUT' && !this.classList.contains('syspro-combobox-inform')) ||
                (this.tagName === 'SELECT' && this.classList.contains('syspro-combobox-inform')))
        ) {
            return;
        }
        if (this.classList.contains('dropdown-select')) {
            var inputfield = $('input.fakeinput', $(this).next('.dropdownjs'));
            //If the value was cleared using the color then set it back to the backup.
            if (inputfield.data('backupcolor')) {
                inputfield.css('color', inputfield.data('backupcolor'));
            }
        }
        if (this.classList.contains('date-input')) {
            //  var dataFieldName = "";
            //if ($(this).datepicker()) {
            dataValue = kendo.toString(
                $(this)
                    .closest('.date')
                    .datepicker('getDate'),
                'yyyy-MM-dd'
            );
            //}
            //   var dataValue = e.date.format("YYYY-MM-DD");
        }
        //This is purely so it does not have to create a jquery object of this before calling.
        if (this.classList.contains('predictive-search-initialized')) {
            sysproInterop.updateSYSPROKeyDataFromElementChange($(this), dataValue);
        }
        sysproInterop.eventTrigged(
            dataFieldName,
            dataValue,
            '',
            '',
            'fieldChange',
            function(eCurrent) {},
            function(eCurrent) {}
        );

        if (this.classList.contains('.syspro-field-search-dropdown')) {
            var entryFieldEvents = this.getAttribute('data-entryfieldevents');
            //Now if it's  a tab check if SYSPRO  need to listen to this.
            if (entryFieldEvents.indexOf('Tab') > -1) {
                //After Field change also execute a tab if it is a predictive search. Hoping this behaves in SYSPRO.
                sysproInterop.eventTrigged(
                    dataFieldName,
                    9,
                    dataValue,
                    '',
                    'keyDown',
                    function(eCurrent) {},
                    function(eCurrent) {}
                );
            }
        }
    },
    subscribeToFieldEvents: function() {
        try {
            //Removing keyUp because  the webview now handles predictive searches for SYSPRO.
            //$(".syspro-trackfield-input").off("input");
            //$(".syspro-trackfield-input").on("input", function (e) {
            //    var inputOfEvent = this;
            //    var dataFieldName = this.getAttribute("data-fieldname");
            //   // var characterIn = String.fromCharCode(e.which);
            //    var dataValue = this.value;
            //    var inputRect = this.getBoundingClientRect();
            //    sysproInterop.eventTrigged(dataFieldName, Math.round(inputRect.left)+";"+Math.round(inputRect.top), dataValue, "", "keyUp", function (eCurrent) {
            //        //if (characterIn !== eCurrent) {
            //        //    //If SYSPRO  returns a different character  cancel the event and add the  new character.
            //        //    e.preventDefault();
            //        //    inputOfEvent.value = inputOfEvent.value + eCurrent;
            //        //}
            //    }, function (eCurrent) { });
            //});

            $('.syspro-trackfield-keydown:not(.syspro-field-search-dropdown)').off(
                'keydown',
                sysproInterop.keyDownTracking
            );
            $('.syspro-trackfield-keydown:not(.syspro-field-search-dropdown)').on(
                'keydown',
                sysproInterop.keyDownTracking
            );
            $('.syspro-trackfield-keydown:not(.syspro-field-search-dropdown)').off(
                'focus',
                sysproInterop.focusTracking
            );
            $('.syspro-trackfield-keydown:not(.syspro-field-search-dropdown)').on('focus', sysproInterop.focusTracking);
            $('.syspro-trackfield-keydown:not(.syspro-field-search-dropdown)').off(
                'mousedown',
                sysproInterop.mouseDown
            );
            $('.syspro-trackfield-keydown:not(.syspro-field-search-dropdown)').on('mousedown', sysproInterop.mouseDown);
            $('html').on('mousemove', sysproInterop.mouseMove);

            $('.syspro-trackfield-change').off('change', sysproInterop.fieldChangedHandler);
            $('.syspro-trackfield-change').on('change', sysproInterop.fieldChangedHandler);
            //$(".date").off();
            //$(".date").on("dp.change", function (e) {
            //    if (!sysproInterop.autoDateChange) {
            //        var dataFieldName = "";
            //        if ($(this).find(".syspro-trackfield-change").length > 0) {
            //            dataFieldName = $(this).find(".syspro-trackfield-change")[0].getAttribute("data-fieldname");
            //        }
            //        var dataValue = e.date.format("YYYY-MM-DD");

            //        sysproInterop.eventTrigged(dataFieldName, dataValue, "", "", "fieldChange", function (eCurrent) { }, function (eCurrent) { });
            //    }
            //    sysproInterop.autoDateChange = false;
            //});

            //if ($(".date").datapicker()) {
            //    $(".date").datapicker().off("changeDate");
            //    $(".date").datapicker().on("changeDate", function (e) {
            //        var dataFieldName = "";
            //        if ($(this).find(".syspro-trackfield-change").length > 0) {
            //            dataFieldName = $(this).find(".syspro-trackfield-change")[0].getAttribute("data-fieldname");
            //        }
            //        var dataValue = e.date.format("YYYY-MM-DD");

            //        sysproInterop.eventTrigged(dataFieldName, dataValue, "", "", "fieldChange", function (eCurrent) { }, function (eCurrent) { });
            //    });
            //}

            if (!$('.syspro-trackfield-change-richtext').data('kendoEditor')) {
                $('.syspro-trackfield-change-richtext').kendoEditor({
                    resizable: {
                        content: true,
                    },
                    tools: [
                        'bold',
                        'italic',
                        'underline',
                        'justifyLeft',
                        'justifyCenter',
                        'justifyRight',
                        'justifyFull',
                        'insertUnorderedList',
                        'insertOrderedList',
                        'indent',
                        'outdent',
                        'createLink',
                        'unlink',
                        'insertImage',
                        'subscript',
                        'superscript',
                        'tableWizard',
                        'createTable',
                        'addRowAbove',
                        'addRowBelow',
                        'addColumnLeft',
                        'addColumnRight',
                        'deleteRow',
                        'deleteColumn',
                        'cleanFormatting',
                        'fontName',
                        'fontSize',
                        'foreColor',
                        'backColor',
                    ],
                    change: function(e) {
                        console.log('RTF Changed!');
                        var dataFieldName = this.body.getAttribute('data-fieldname');

                        var dataValue = '#RTFIN#' + this.value();
                        sysproInterop.eventTrigged(
                            dataFieldName,
                            dataValue,
                            '',
                            '',
                            'fieldChange',
                            function(eCurrent) {},
                            function(eCurrent) {}
                        );
                    },
                });
                var editorElement = $('.syspro-trackfield-change-richtext');
                if (editorElement.length > 0) {
                    if (editorElement.data('kendoEditor')) {
                        editorElement.data('kendoEditor').toolbar.window.bind('open', function(e) {
                            var editorOffset = editorElement.offset();
                            var outerHeightFound = editorOffset.top + editorElement.outerHeight() + 5;
                            if (editorElement.closest('.modal-window-main').length > 0) {
                                var windowOffset = editorElement.closest('.modal-window-main').offset();
                                outerHeightFound =
                                    windowOffset.top + editorElement.closest('.modal-window-main').outerHeight() + 5;
                            }
                            e.sender.setOptions({
                                position: {
                                    top: outerHeightFound,
                                    left: editorOffset.left,
                                },
                            });
                        });
                        if (editorElement.data('disableoninitialize') === 'true') {
                            $(
                                '.avanti-richtextwidget-textholder',
                                editorElement.closest('.avanti-richtextwidget')
                            ).attr('disabled', 'disabled');
                            $(
                                '.avanti-richtextwidget-textholder',
                                editorElement.closest('.avanti-richtextwidget')
                            ).attr('contenteditable', 'false');
                            $(
                                '.syspro-richtext-insertdate-button',
                                editorElement.closest('.avanti-richtextwidget')
                            ).addClass('disabled');
                            $(
                                '.syspro-richtext-refresh-button',
                                editorElement.closest('.avanti-richtextwidget')
                            ).addClass('disabled');
                            $('.syspro-richtext-save-button', editorElement.closest('.avanti-richtextwidget')).addClass(
                                'disabled'
                            );
                        }
                    }
                }
            }
            //$(".syspro-trackfield-change-other").off("set");
            //$(".syspro-trackfield-change-other").on("set", function (e) {
            //    var dataFieldName = this.getAttribute("data-fieldname");
            //    var dataValue = this.getAttribute("data-fieldvalue");

            //    sysproInterop.eventTrigged(dataFieldName, dataValue, "", "", "fieldChange", function (eCurrent) { }, function (eCurrent) { });
            //});
            $('.syspro-browse-button').off('click');
            $('.syspro-browse-button').on('click', function(e) {
                //var inputFieldId = this.getAttribute("data-inputfieldid");
                var predictiveSearchValue = this.getAttribute('data-predictivesearchfield');
                var dataFieldName = this.getAttribute('data-fieldname');
                var dataValue = this.getAttribute('data-fieldvalue'); // $(this).closest(".input-group-btn").prevUntil(".syspro-browse-input")[0].value;
                // var dataValue = this.value;
                if (predictiveSearchValue === 'manual') {
                    var variableSplit = dataFieldName.split(':');
                    var searchRowIndex = parseInt(variableSplit[2]);
                    searchRowIndex = searchRowIndex + 1;

                    //Raise an event back with the name of the grid, the rowNumber and the cellName
                    sysproInterop.eventTrigged(
                        variableSplit[1],
                        searchRowIndex + '|' + variableSplit[3] + '|',
                        '',
                        '',
                        'manualSearchSelected',
                        function(e) {},
                        function(e) {}
                    );
                } else {
                    if (dataValue === '#GRIDVALUE#') {
                        //If the browse button is in a grid then get the value from the sibling that is an input and pass that through.
                        dataValue = $(this)
                            .siblings('input')
                            .val();
                    }
                    sysproInterop.openBrowse(dataFieldName, dataValue, predictiveSearchValue, dataFieldName);
                }
            });

            //Handle file browse in SYSPRO where file open dialog must be opened and a filename sent to SYSPRO.
            $('.syspro-file-browse-button').off('click');
            $('.syspro-file-browse-button').on('click', function(e) {
                var dataFieldName = this.getAttribute('data-fieldname');
                var filetypes = this.getAttribute('data-filetypes');
                sysproInterop.selectFile(
                    function(e) {
                        $('#' + dataFieldName.replace('.', '\\.')).val(e.FilePath);
                        sysproInterop.eventTrigged(
                            JSON.stringify(e),
                            dataFieldName,
                            '',
                            '',
                            'fileSelected',
                            function(e) {},
                            function(e) {}
                        );
                    },
                    function(e) {},
                    filetypes
                );
            });
            //Now also subscribe  to  clicks  on tiles if we are not in the app builder.
            if (!sysproInterop.isInAppBuilder) {
                $('.tile').off('click');
                $('.tile:not(.tile-disabled)').on('click', function(index) {
                    var parentfieldpath = this.getAttribute('data-parentfieldpath');
                    var tileparameters = this.getAttribute('data-tileparameters');
                    var tiletypedetail = this.getAttribute('data-tiletypename');
                    var tiletype = this.getAttribute('data-tiletype');
                    var tileDescription = $('.tile-title', this)
                        .first()
                        .text();
                    if (tiletypedetail && tiletypedetail.indexOf('Plugin|') === 0) {
                        //If it's a plugin then branch to a plugin instead of calling a regular tile.
                        sysproInterop.runProgramInSYSPRO(parentfieldpath, tiletype, tileDescription, tiletypedetail);
                    } else {
                        if (tiletype === 'Program') {
                            tileparameters = tiletype;
                            $('[id=loading-cover]').fadeIn();
                        }
                        var sysproKeys = null;
                        if (sysproInterop.viewModel && sysproInterop.viewModel.Fields)
                            sysproKeys = JSON.stringify(sysproInterop.viewModel.Fields.SYSPROKeyData);

                        sysproInterop.eventTrigged(
                            parentfieldpath,
                            tileparameters,
                            tiletypedetail,
                            sysproKeys,
                            'tileClicked',
                            function(eCurrent) {},
                            function(eCurrent) {
                                if (eCurrent.ErrorMessage)
                                    sysproInterop.handleError(eCurrent.ErrorMessage, 'tileClicked');
                            }
                        );
                    }
                });
            }

            //And  then refresh combobox
            $('select.combobox.combobox-initialized').combobox('refresh');
        } catch (ex) {
            //TODO: Be Silent here for now, the shows an input mask error.
            //sysproInterop.handleError(ex.message, "subscribeToFieldEvents");
            console.log("Silent Bind Error (Don't panic!)" - ex.message);
        }
    },
    openBrowse: function(fieldName, fieldValue, predictivesearchfield, fieldIdToPopulate) {
        if (
            callLayerInterop.interopType === 'StandaloneBrowser' &&
            (predictivesearchfield &&
                predictivesearchfield !== 'ignore' &&
                predictivesearchfield !== 'undefined' &&
                predictivesearchfield !== undefined)
        ) {
            //Call up the search  and when the value is selected set the input with the fieldIdToPopulate
            var DataIn = {
                SearchType: predictivesearchfield,
                SearchField: fieldIdToPopulate,
                SearchValue: fieldValue,
            };
            callLayerInterop.callFusionService(
                callLayerInterop.renderMode + '/UXSearchWeb/OpenSearchWindow',
                DataIn,
                'GET',
                function(result) {},
                function(ex) {
                    sysproInterop.handleError(ex.ErrorMessage, 'openBrowse');
                }
            );
        } else {
            sysproInterop.eventTrigged(
                fieldName,
                fieldValue,
                '',
                '',
                'fieldBrowse',
                function(eCurrent) {},
                function(eCurrent) {}
            );
        }
    },
    browseValueSelected: function(fieldIdToPopulate, fieldValue, searchType) {
        sysproInterop.closeModalWindow('SearchWindowMain' + searchType);

        if (fieldIdToPopulate.indexOf('grid:') >= 0) {
            //If the browse is located in a grid then populate the correct cell in the grid.
            var fieldParameters = fieldIdToPopulate.split(':');
            var gridName = '';
            var cellNumber = '';
            var rowNumber = '';
            var cellIndex = '';
            if (fieldParameters.length > 3) {
                gridName = fieldParameters[1];
                rowNumber = fieldParameters[2];
                cellNumber = fieldParameters[3];
                cellIndex = fieldParameters[4];
                rowNumber = parseInt(rowNumber);
                rowNumber = rowNumber + 1;
                var dataIn = {
                    FieldName: gridName,
                    InternalEvent: 'SetCellValueKeepDirty',
                    InternalEventParameter: rowNumber + '|' + cellNumber + '|' + fieldValue + '|' + cellIndex,
                };
                sysproInterop.gridRequestInternalEvent(dataIn);
            } else {
                console.log('browseValueSelected Error - Parameters given on browse for grid had too few parameters.');
            }
        } else {
            //Now we should also set the datamodel as well
            $('#' + fieldIdToPopulate.replace('.', '\\.')).val(fieldValue);
            var modelItemToSet = sysproInterop.viewModel;
            if (fieldIdToPopulate.indexOf('Toolbar') === 0) {
                modelItemToSet = sysproInterop.toolbarModel;
            }
            var itemNodes = fieldIdToPopulate.split('.');
            for (var i = 0; i < itemNodes.length; i++) {
                if (itemNodes[i]) {
                    if (modelItemToSet[itemNodes[i]]) {
                        modelItemToSet = modelItemToSet[itemNodes[i]];
                    }
                }
            }
            if (modelItemToSet) modelItemToSet.set('Value', fieldValue);

            //And set the value in the SYSPROKeyData as well.
            sysproInterop.updateSYSPROKeyDataFromElementChange(
                $('#' + fieldIdToPopulate.replace('.', '\\.')),
                fieldValue
            );
            //Should field change or toolbar event be triggered here for toolbars specifically?

            sysproInterop.eventTrigged(
                fieldIdToPopulate,
                fieldValue,
                '',
                '',
                'fieldChange',
                function(eCurrent) {
                    //After triggering a field change then set focus to it.
                    $('#' + fieldIdToPopulate.replace('.', '\\.')).focus();
                },
                function(eCurrent) {}
            );
            //     var entryFieldEvents = $("#" + fieldIdToPopulate.replace(".", "\\."))[0].getAttribute("data-entryfieldevents");
            ////Now if it's  a tab check if SYSPRO  need to listen to this.
            //if (entryFieldEvents.indexOf("Tab") > -1) {
            ////After Field change also execute a tab if it is a predictive search. Hoping this behaves in SYSPRO.
            //sysproInterop.eventTrigged(fieldIdToPopulate, 9, fieldValue, "", "keyDown", function (eCurrent) {
            //}, function (eCurrent) { });
            //}

            var entryFieldEvents = $('#' + fieldIdToPopulate.replace('.', '\\.'))[0].getAttribute(
                'data-entryfieldevents'
            );
            //Now if it's a toolbar input then execute a automatic tab. We are going round and round on this as it causes strange behavior but Phil now wants it to do this. 23/03/2018
            if ($('#' + fieldIdToPopulate.replace('.', '\\.')).hasClass('syspro-toolbar-widget')) {
                //After Field change also execute a tab. Hoping this behaves in SYSPRO.
                sysproInterop.eventTrigged(
                    fieldIdToPopulate,
                    9,
                    fieldValue,
                    '',
                    'keyDown',
                    function(eCurrent) {},
                    function(eCurrent) {}
                );
            }
        }
    },
    keyDownTracking: function(e) {
        //Only tab and enter should fire keydown for SYSPRO.
        if (e.which === 13 || e.which === 9) {
            var dataFieldName = this.getAttribute('data-fieldname');
            if (!dataFieldName && this.classList.contains('combobox')) {
                //If it's a combo box then look for the data field on the select near it.
                if ($('select.combobox-initialized', $(this).closest('.form-group')).length > 0) {
                    dataFieldName = $('select.combobox-initialized', $(this).closest('.form-group'))[0].getAttribute(
                        'data-fieldname'
                    );
                }
            }
            var dataValue = this.value;
            var entryFieldEvents = this.getAttribute('data-entryfieldevents');
            if (e.which !== 9) {
                //if any key other than tab is pressed then stop ignoring tabs if they were being ignored.
                this.setAttribute('data-ignoretabs', '');
            }
            //Now always  fire an enter  or if it's  a tab check if SYSPRO  need to listen to this.
            //Or if it's in a toolbar then just always trigger the tab event.
            if (
                e.which === 13 ||
                (dataFieldName && dataFieldName.indexOf('Toolbar.') === 0) ||
                (entryFieldEvents && entryFieldEvents.indexOf('Tab') > -1)
            ) {
                // var characterIn = String.fromCharCode(e.which);
                if (!this.getAttribute('data-ignoretabs')) {
                    //Only trigger keydowns if the isnt ignore tabs on the field.
                    sysproInterop.eventTrigged(
                        dataFieldName,
                        e.which,
                        dataValue,
                        '',
                        'keyDown',
                        function(eCurrent) {},
                        function(eCurrent) {}
                    );
                } else {
                    console.log('Tab Ignored for Wait call.');
                }
            }

            if (e.keyCode === 9) {
                if (
                    (entryFieldEvents && entryFieldEvents.indexOf('Wait') > -1) ||
                    (dataFieldName && dataFieldName.indexOf('Toolbar.') === 0)
                ) {
                    var FieldIn = this;
                    //Ignore subsequent tabs until the field loses focus.
                    FieldIn.setAttribute('data-ignoretabs', 'true');
                    $(FieldIn).on('blur', function() {
                        FieldIn.setAttribute('data-ignoretabs', '');
                        $(FieldIn).off('blur');
                    });

                    e.preventDefault();
                }
            }
        }
    },
    callPlugin: function(pluginName, callType, DataIn1, DataIn2) {
        try {
            //Trigger an event back but not into  SYSPRO but into SRS
            sysproInterop.eventTrigged(
                DataIn1,
                DataIn2,
                '',
                '',
                'PLUGIN|' + pluginName + '|' + callType,
                function(e) {},
                function(e) {}
            );
            return '';
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'callPlugin');
        }
    },
    focusTracking: function(e) {
        var entryFieldEvents = this.getAttribute('data-entryfieldevents');
        //Now fire a gain focus if SYSPRO has opted in using the entry field events in the bind xml.
        if (entryFieldEvents && entryFieldEvents.indexOf('Focus') > -1) {
            var currEle = $(this);
            var mdown = currEle.data('mdown');
            // Remove the flag so we don't have it set next time if the user
            // uses the tab key to come back.
            currEle.removeData('mdown');
            //if the field is in a toolbar then also make sure it was triggered by a mouse down as well
            if (!currEle.hasClass('syspro-toolbar-widget') || mdown) {
                var dataFieldName = this.getAttribute('data-fieldname');
                sysproInterop.eventTrigged(
                    dataFieldName,
                    '',
                    '',
                    '',
                    'focus',
                    function(eCurrent) {},
                    function(eCurrent) {}
                );
            }
        }
    },
    mouseDown: function(e) {
        var currEle = $(this);

        // Only set the data attribute if it's not already focused, as the
        // focus event wouldn't fire afterwards, leaving the flag set.
        if (!currEle.is(':focus')) {
            currEle.data('mdown', true);
        }
    },
    mouseMove: function(e) {
        //e.pageX
        //e.pageY
        sysproInterop.cursorX = e.pageX;
        sysproInterop.cursorY = e.pageY;
    },
    //Starts the help  tour for the current application if there is one to load.
    startHelpTourForApplication: function(isModal) {
        try {
            console.log('startHelpTourForApplication');
            sysproInterop.getModel(
                '',
                function(data) {
                    console.log('Model found!');
                    if (typeof hopscotch !== 'undefined') {
                        if (hopscotch) {
                            try {
                                console.log('data.HelpTourContent - ' + data.HelpTourContent);
                                var parsedTour = eval(data.HelpTourContent);
                                var tourCurrent = {
                                    id: 'helptour_' + data.Id,
                                    steps: parsedTour,
                                };

                                console.log('parsedTour - ' + parsedTour.length);
                                // console.log("tourCurrent - " + tourCurrent);
                                hopscotch.startTour(tourCurrent, 0);
                            } catch (ex) {
                                sysproInterop.handleError(ex.message, 'startHelpTourForApplicationLoaded');
                            }
                        }
                    } else {
                        sysproInterop.showErrorMessage(
                            'The helptour package has not been loaded. This indicates a version mismatch between BaseSamples and Managed Assemblies.'
                        );
                    }
                },
                function(error) {},
                isModal
            );
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'startHelpTourForApplication');
        }
    },
    addRecentProgram: function(name, description, menuItemType, avantiPlugin) {
        if (!sysproInterop.recentProgramList.length) {
            var divToAddTo = $('#programListMenu > .sidebar-menu');

            if (divToAddTo.length > 0 && $('.recent-programs-list', divToAddTo).length === 0) {
                divToAddTo.prepend(
                    '<li class="treeview recent-programs-list"><a href="#"><span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">access_time</span>Recent programs <span class="material-icons treeview-menu-expand-indicator pull-right">chevron_right</span></a><ul class="treeview-menu"></ul></li>'
                );
            }
        }
        var programAdded = false;
        $.each(sysproInterop.recentProgramList, function(index) {
            if (this.name == name) {
                programAdded = true;
            }
        });
        if (!programAdded) {
            var subMenuItemType = '';
            if (avantiPlugin) {
                subMenuItemType = 'Plugin|' + avantiPlugin;
            }
            sysproInterop.recentProgramList.push({
                name: name,
                description: description,
                menutype: menuItemType,
                submenuitemtype: subMenuItemType,
            });
            $('.recent-programs-list .treeview-menu').append(
                '<li><a href="#" class="syspro-program-link" data-sysproprogramname="' +
                    name +
                    '" data-syspromenuitemtype="' +
                    menuItemType +
                    '" data-syspromenuitemsubtype="' +
                    subMenuItemType +
                    '" data-tooltip="tooltip" data-placement="bottom" data-original-title="' +
                    description +
                    '"><span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">exit_to_app</span>' +
                    description +
                    '</a></li>'
            );
            //resubscribe to the program link click after the recent item is added.
            $('.syspro-program-link').off('click');
            $('.syspro-program-link').on('click', function(e) {
                var programToRun = this.getAttribute('data-sysproprogramname');
                var menuItemType = this.getAttribute('data-syspromenuitemtype');
                var syspromenuitemsubtype = this.getAttribute('data-syspromenuitemsubtype');
                var elementClone = $(this).clone();
                elementClone.children().remove();
                //elementClone
                //var elementClone = e.draggable.element.find('a.syspro-program-link').children().not(e.draggable.element.find('a.syspro-program-link').children()).clone();
                //elementClone.find('i, span').remove();
                var programDescription = elementClone.text();
                sysproInterop.runProgramInSYSPRO(programToRun, menuItemType, programDescription, syspromenuitemsubtype);
            });
        }
    },
    //populates the Avanti Notification tabs with notifications for the user logged in.
    bindAvantiNotifications: function(divIn) {
        //Check if the notifications tab is opening or closing and only bind if it is opening.
        if (!$('#offcanvas-avanti-notifications').data('isopened')) {
            $('#offcanvas-avanti-notifications').data('isopened', 'true');
            //first clear the previous notifications
            $('.tab-content', '#offcanvas-avanti-notifications').html('');

            //Now call the server to  populate the notifications.
            sysproInterop.getNotificationsContent(
                function(htmlOut) {
                    //first clear the previous notifications
                    $('.tab-content', '#offcanvas-avanti-notifications').html(htmlOut);
                    if (
                        $("a[href='#alertsByType']", '#offcanvas-avanti-notifications')
                            .closest('li')
                            .hasClass('active')
                    ) {
                        //If the type tab is selected then set the relevant classes on the types tab and vice versa.
                        $('#alertsByDate', '#offcanvas-avanti-notifications').removeClass('in');
                        $('#alertsByDate', '#offcanvas-avanti-notifications').removeClass('active');
                        $('#alertsByType', '#offcanvas-avanti-notifications').addClass('in');
                        $('#alertsByType', '#offcanvas-avanti-notifications').addClass('active');
                    } else {
                        $('#alertsByType', '#offcanvas-avanti-notifications').removeClass('in');
                        $('#alertsByType', '#offcanvas-avanti-notifications').removeClass('active');
                        $('#alertsByDate', '#offcanvas-avanti-notifications').addClass('in');
                        $('#alertsByDate', '#offcanvas-avanti-notifications').addClass('active');
                    }
                    $('.dismiss-notification', '#offcanvas-avanti-notifications').on('click', function(e) {
                        //Only try to dismiss an item if it has a notification id which should always be the case.
                        if (
                            $(this)
                                .closest('.avanti-notification-item')
                                .data('avantinotificationid')
                        )
                            sysproInterop.dismissNotification(
                                $(this)
                                    .closest('.avanti-notification-item')
                                    .data('avantinotificationid')
                            );

                        e.stopPropagation();
                    });
                    $('.avanti-notification-withaction', '#offcanvas-avanti-notifications').on('click', function(e) {
                        //Only try to dismiss an item if it has a event type which should always be the case.
                        if (this.getAttribute('data-avantinotificationeventtype'))
                            sysproInterop.actionNotification(
                                $(this)
                                    .closest('.avanti-notification-item')
                                    .data('avantinotificationid'),
                                this.getAttribute('data-avantinotificationeventtype'),
                                this.getAttribute('data-avantinotificationeventmetadata1'),
                                this.getAttribute('data-avantinotificationeventmetadata2')
                            );
                    });
                },
                function(error) {
                    //TODO: otherwise show an error in the notifications  off canvas
                    sysproInterop.handleError(error.ErrorMessage, 'Getting notifications');
                }
            );
        } else {
            $('#offcanvas-avanti-notifications').data('isopened', '');
        }
    },
    dismissNotification: function(notificationId) {
        var swstmgInput = {
            PostMessages: {
                Message: {
                    MessageKey: notificationId,
                    //    "ActionId": "99"
                },
            },
        };
        var swstmgDoc = {
            PostMessages: {
                Parameters: {
                    ActionType: 'D',
                },
            },
        };
        //Pretend it is not opened so it rebinds the contents
        $('#offcanvas-avanti-notifications').data('isopened', '');
        sysproInterop.callBusinessObject(
            'post',
            'SWSTMG',
            JSON.stringify(swstmgInput),
            JSON.stringify(swstmgDoc),
            function(result) {
                sysproInterop.bindAvantiNotifications();
                //Probably need to updateNotificationsCount here as well using new BO output.
                if (
                    result &&
                    result.postmessages &&
                    result.postmessages.Message &&
                    result.postmessages.Message.TotatMessagesInInbox
                ) {
                    sysproInterop.updateNotificationsCount(result.postmessages.Message.TotatMessagesInInbox);
                }
            },
            function(error) {
                sysproInterop.handleError(error.ErrorMessage, 'Dismiss notification');
            }
        );
    },
    actionNotification: function(notificationId, eventType, eventMetadata1, eventMetadata2) {
        //Any notifications should be actioned by SYSPRO only.
        callLayerInterop.avantiPluginLoaded = '';
        //First run the actual program or action
        var wasCalled = sysproInterop.runProgramInSYSPRO(eventMetadata1, eventType, null, eventMetadata2);
        //Don't dismiss the message if nothing was actions or the task list was shown.
        if (eventMetadata1 !== 'IMPTSK' && wasCalled) {
            //Then mark the task message as completed by calling the BO.
            var swstmgInput = {
                PostMessages: {
                    Message: {
                        MessageKey: notificationId,
                        Status: '99',
                    },
                },
            };
            var swstmgDoc = {
                PostMessages: {
                    Parameters: {
                        ActionType: 'U',
                    },
                },
            };
            //Pretend it is not opened so it rebinds the contents
            $('#offcanvas-avanti-notifications').data('isopened', '');
            sysproInterop.callBusinessObject(
                'post',
                'SWSTMG',
                JSON.stringify(swstmgInput),
                JSON.stringify(swstmgDoc),
                function(result) {
                    sysproInterop.bindAvantiNotifications();
                    //Probably need to updateNotificationsCount here as well using new BO output.
                    if (
                        result &&
                        result.postmessages &&
                        result.postmessages.Message &&
                        result.postmessages.Message.TotatMessagesInInbox
                    ) {
                        sysproInterop.updateNotificationsCount(result.postmessages.Message.TotatMessagesInInbox);
                    }
                },
                function(error) {
                    sysproInterop.handleError(error.ErrorMessage, 'Action notification');
                }
            );
        }
    },
    sendNotification: function(notificationBlob) {
        try {
            var NotifyData = JSON.parse(notificationBlob.NotificationBlob);
            console.log('Notification Received - ' + NotifyData.Title);
            sysproInterop.showCustomTaskDialog(
                'sys-bg-primary',
                'sys-fg-white',
                NotifyData.Title,
                NotifyData.SubTitle,
                '',
                NotifyData.Icon
            );
            sysproInterop.updateNotificationsCount(notificationBlob.NotificationsCount);
            //Display the notification and update the number of items.
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'sendNotification');
        }
    },
    updateNotificationsCount: function(countShown) {
        if (countShown && countShown > 0) {
            $('.avanti-notifications-count').show();
            $('.avanti-notifications-count').text(countShown);
        } else $('.avanti-notifications-count').hide();
    },
    //Creates  a  treeview with a program list in given div.
    bindProgramList: function(divIn) {
        try {
            //If the dismissal of  the program list on click in the main container is not initialized then initialize it.
            if (!$('#harness-container').data('dismissprogramlistinitialized')) {
                $('#harness-container').on('click', function() {
                    $('#fusion-sidebar-wrapper2').removeClass('in');
                });
                $('#harness-container').data('dismissprogramlistinitialized', 'true');
            }

            //This doesn't prevent the search from being reinitialized but for now rather leave it as is. May need to change it in future tpo check if the context has changed or it hasn't been rendered yet.
            //TODO: Only initialize the program list when it is being opened and it hasn't been initialized for the current context.
            if (!$('.program-list-search-wrapper', divIn).data('treeviewinitialized')) {
                var keydata = '';
                if (
                    sysproInterop.viewModel &&
                    sysproInterop.viewModel.Fields &&
                    sysproInterop.viewModel.Fields.SYSPROKeyData
                ) {
                    keydata = JSON.stringify(sysproInterop.viewModel.Fields.SYSPROKeyData);
                }
                //Call  BO and the populate treeview
                sysproInterop.callBusinessObject(
                    'query',
                    'PROGRAMLIST',
                    '<Query><Key><Filetype>MF</Filetype><SRSOutput>Y</SRSOutput></Key></Query>',
                    '',
                    function(result) {
                        $('#programListMenu', divIn).html(queryLayoutUIHelpers.createTreeMenu(result));
                        $('#programListMenu > .treeview-menu', divIn)
                            .removeClass('treeview-menu')
                            .addClass('sidebar-menu')
                            .tree();

                        $('[data-tooltip="tooltip"]', divIn).tooltip();
                        if ($('.typeahead-program-list', divIn).typeahead) {
                            $('.typeahead-program-list', divIn).typeahead('destroy');
                        }
                        $('.typeahead-program-list', divIn).typeahead({
                            source: queryLayoutUIHelpers.programListTypeahead,
                            autoSelect: true,
                            programList: true,
                            fitToElement: true,
                            highlighter: function(item) {
                                var text = this.query;
                                if (text === '') {
                                    return item;
                                }
                                var matches = item.match(/(>)([^<]*)(<)/g);
                                var first = [];
                                var second = [];
                                var i;
                                if (matches && matches.length) {
                                    //html
                                    for (i = 0; i < matches.length; ++i) {
                                        if (matches[i].length > 2) {
                                            //escape '><'
                                            first.push(matches[i]);
                                        }
                                    }
                                } else {
                                    //text
                                    first = [];
                                    first.push(item);
                                }
                                text = text.replace(/[\(\)\/\.\*\+\?\[\]]/g, function(mat) {
                                    return '\\' + mat;
                                });
                                var reg = new RegExp(text, 'gi');
                                var m;
                                for (i = 0; i < first.length; ++i) {
                                    m = first[i].match(reg);
                                    if (m && m.length > 0) {
                                        //find all text nodes matches
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
                            displayText: function(item) {
                                return typeof item !== 'undefined' && typeof item.name != 'undefined'
                                    ? '<div class="row">' +
                                          '<div class="col-xs-1">' +
                                          '<span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">' +
                                          item.icon +
                                          '</span>' +
                                          '</div>' +
                                          '<div class="col-xs-9 typeahead-value-wrapper">' +
                                          (item.breadcrumb != ''
                                              ? '<div class="row typeahead-breadcrumb-wrapper"><div class="col-xs-12 sys-pd-l-10"><span class="typeahead-breadcrumb">' +
                                                item.breadcrumb +
                                                '</span></div></div>'
                                              : '') +
                                          '<div class="row"><div class="col-xs-12 sys-pd-l-10">' +
                                          item.name +
                                          '</div></div>' +
                                          '</div>' +
                                          '<div class="col-xs-2">' +
                                          '<span class="material-icons treeview-menu-expand-indicator pull-right ">chevron_right</span>' +
                                          '</div>' +
                                          '</div>'
                                    : '<div class="row">' +
                                          '<div class="col-xs-1">' +
                                          '<span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">' +
                                          item.icon +
                                          '</span>' +
                                          '</div>' +
                                          '<div class="col-xs-9 typeahead-value-wrapper">' +
                                          (item.breadcrumb != ''
                                              ? '<div class="row typeahead-breadcrumb-wrapper"><div class="col-xs-12 sys-pd-l-10"><span class="typeahead-breadcrumb">' +
                                                item.breadcrumb +
                                                '</span></div></div>'
                                              : '') +
                                          '<div class="row"><div class="col-xs-12 sys-pd-l-10">' +
                                          item +
                                          '</div></div>' +
                                          '</div>' +
                                          '<div class="col-xs-2">' +
                                          '<span class="material-icons treeview-menu-expand-indicator pull-right ">chevron_right</span>' +
                                          '</div>' +
                                          '</div>';
                            },

                            afterSelect: function(e) {
                                callLayerInterop.avantiPluginLoaded = '';
                                sysproInterop.runProgramInSYSPRO(
                                    e.sysproprogramname,
                                    e.syspromenuitemtype,
                                    e.name,
                                    e.syspromenuitemsubtype
                                );
                            },
                        });

                        var divToAddTo = $('#programListMenu > .sidebar-menu');

                        if (divToAddTo.length > 0 && $('.recent-programs-list', divToAddTo).length === 0) {
                            divToAddTo.prepend(
                                '<li class="treeview recent-programs-list"><a href="#"><span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">access_time</span>Recent programs <span class="material-icons treeview-menu-expand-indicator pull-right">chevron_right</span></a><ul class="treeview-menu"></ul></li>'
                            );
                        }
                        $.each(sysproInterop.recentProgramList, function(index) {
                            $('.recent-programs-list .treeview-menu').append(
                                '<li><a href="#" class="syspro-program-link" data-sysproprogramname="' +
                                    this.name +
                                    '" data-syspromenuitemtype="' +
                                    this.menutype +
                                    '" data-syspromenuitemsubtype="' +
                                    this.submenuitemtype +
                                    '" data-tooltip="tooltip" data-placement="bottom" data-original-title="' +
                                    this.description +
                                    '"><span class="material-icons treeview-menu-icon pull-left sys-mg-r-5">exit_to_app</span>' +
                                    this.description +
                                    '</a></li>'
                            );
                        });

                        $('.syspro-program-link').off('click');
                        $('.syspro-program-link').on('click', function(e) {
                            var programToRun = this.getAttribute('data-sysproprogramname');
                            var menuItemType = this.getAttribute('data-syspromenuitemtype');
                            var syspromenuitemsubtype = this.getAttribute('data-syspromenuitemsubtype');
                            var elementClone = $(this).clone();
                            elementClone.children().remove();
                            //elementClone
                            //var elementClone = e.draggable.element.find('a.syspro-program-link').children().not(e.draggable.element.find('a.syspro-program-link').children()).clone();
                            //elementClone.find('i, span').remove();
                            var programDescription = elementClone.text();
                            callLayerInterop.avantiPluginLoaded = '';
                            sysproInterop.runProgramInSYSPRO(
                                programToRun,
                                menuItemType,
                                programDescription,
                                syspromenuitemsubtype
                            );
                        });
                        queryLayoutUIHelpers.initializeDragDrop();
                        //$('.program-list-search', divIn).off('input');
                        //$('.program-list-search', divIn).on('input', function (e) {
                        //    var searchMenu = $(this).val().toLowerCase();
                        //    //var searchMenu = this.value;
                        //    var dataSource = $(".treeview-container", divIn).data("kendoTreeView").dataSource;
                        //    sysproInterop.searchProgramList(dataSource, searchMenu);
                        //});
                        //var node = kendo.data.Node.define({
                        //    hasChildren: "Children",
                        //    children: "Children"
                        //});
                        //var MenuData = new kendo.data.HierarchicalDataSource({
                        //    data: result.Children,
                        //    schema: { model: node }
                        //});
                        ////data-select="onSelect" data-template="menu-template" data-text-field="MenuName"
                        //$(".treeview-container", divIn).kendoTreeView({
                        //    dataSource: MenuData,
                        //    template: $("#menu-template").text(),
                        //    textField: "Description",
                        //    select: function (e) {
                        //        var tree = $(".treeview-container", divIn).data('kendoTreeView');
                        //        var dataItem = tree.dataItem(e.node);
                        //        //alert("onSelect : " + dataItem.ProgramName);
                        //        //sysproInterop.eventTrigged("ARSPEN", "Program", null, null, "tileClicked", function (eCurrent) { }, function (eCurrent) { if (eCurrent.ErrorMessage) sysproInterop.handleError(eCurrent.ErrorMessage, "tileClicked"); });
                        //        //sysproInterop.eventTrigged(dataItem.ProgramName, "Program", null, null, "tileClicked", function (eCurrent) { }, function (eCurrent) { if (eCurrent.ErrorMessage) sysproInterop.handleError(eCurrent.ErrorMessage, "tileClicked"); });
                        //        sysproInterop.runProgramInSYSPRO(dataItem.Name);
                        //    }
                        //});
                        ////Add recently viewed kendo treeview
                        //if (!$(".recently-viewed", divIn).data("kendoTreeView")) {
                        //    $(".recently-viewed", divIn).kendoTreeView({
                        //        dataSource: [{ text: "None", "MenuName": "None" }],
                        //        template: $("#recent-menu-template").text(),
                        //        select: function (e) {
                        //            var recentTree = $(".recently-viewed", divIn).data('kendoTreeView');
                        //            var dataItem = recentTree.dataItem(e.node);
                        //            sysproInterop.runProgramInSYSPRO(dataItem.Name);
                        //        }
                        //    });
                        //}
                        $('.program-list-search-wrapper', divIn).data('treeviewinitialized', 'true');
                        $('.program-list-search-wrapper').css('opacity', 1);
                    },
                    function(error) {
                        sysproInterop.handleError(error.ErrorMessage, 'bindProgramList');
                    },
                    true,
                    false,
                    keydata
                );
            }
            //MC add manual OnClick event handler for KendoTreeView - Program list
            //$(".treeview-container", divIn).off("click", "li .k-state-selected");
            //$(".treeview-container", divIn).on("click", "li .k-state-selected", function (e) {
            //    var treeview = $(".treeview-container", divIn).data("kendoTreeView"),
            //        node = $(this).closest("li")[0];
            //    treeview.trigger("select", { node: node });
            //});
            //    //MC add manual OnClick event handler for KendoTreeView - Recent Program list
            //$(".recently-viewed", divIn).off("click", "li .k-state-selected");
            //$(".recently-viewed", divIn).on("click", "li .k-state-selected", function (e) {
            //    var treeview = $(".recently-viewed", divIn).data("kendoTreeView"),
            //        node = $(this).closest("li")[0];
            //    treeview.trigger("select", {
            //        node: node
            //    });
            //});
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'bindProgramList');
        }
    },
    searchProgramList: function(dataSource, searchMenu) {
        var hasVisibleChildren = false;
        var data = dataSource instanceof kendo.data.HierarchicalDataSource && dataSource.data();

        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var text = item.Description.toLowerCase();
            var programName;
            if (item.Name != null && typeof item.Name != 'undefined') programName = item.Name.toLowerCase();
            else programName = '';

            var itemVisible =
                searchMenu === true || //parent already matches
                searchMenu === '' || //query is empty
                text.indexOf(searchMenu) >= 0 ||
                programName.indexOf(searchMenu) >= 0;

            var anyVisibleChildren = sysproInterop.searchProgramList(item.children, itemVisible || searchMenu); // pass true if parent matches

            hasVisibleChildren = hasVisibleChildren || anyVisibleChildren || itemVisible;
            item.hidden = !itemVisible && !anyVisibleChildren;
        }
        if (data) {
            // re-apply filter on children
            dataSource.filter({ field: 'hidden', operator: 'neq', value: true });
        }
        return hasVisibleChildren;
    },
    runProgramInSYSPRO: function(programName, menuItemType, programDescription, menuItemSubType) {
        var isactioned = false;

        if (menuItemType) {
            if (menuItemType === 'Program') {
                if (menuItemSubType && menuItemSubType.indexOf('Plugin|') === 0) {
                    //If the menu item requires a plugin to execute then run the plugin required by splitting the plugin type.
                    var pluginParameters = menuItemSubType.split('|');
                    var pluginName = '';
                    var callType = '';
                    var parameter1 = '';
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
                    //SRSMain requires the description if the report is being called.
                    if (pluginName === 'SRSMAIN' && callType === 'LoadReportForm') {
                        parameter1 = programDescription;
                    }
                    //if the calltype is blank then it's probably in the program name given.
                    if (!callType) callType = programName;
                    //First close the program list pull out.
                    $('#fusion-sidebar-wrapper2').removeClass('in');
                    $('body').removeClass('offcanvas-stop-scrolling');
                    sysproInterop.callPlugin(pluginName, callType, parameter1, parameter2);
                    isactioned = true;
                } else if (programName) {
                    //First close the program list pull out.
                    $('#fusion-sidebar-wrapper2').removeClass('in');
                    $('body').removeClass('offcanvas-stop-scrolling');
                    $('[id=loading-cover]').fadeIn();
                    sysproInterop.eventTrigged(
                        programName,
                        'Program',
                        null,
                        null,
                        'tileClicked',
                        function(eCurrent) {},
                        function(eCurrent) {
                            if (eCurrent.ErrorMessage)
                                sysproInterop.handleError(eCurrent.ErrorMessage, 'Running program');
                        }
                    );
                    isactioned = true;
                }
            } else if (menuItemType === 'Tile') {
                var sysproKeys = null;
                if (sysproInterop.viewModel && sysproInterop.viewModel.Fields)
                    sysproKeys = JSON.stringify(sysproInterop.viewModel.Fields.SYSPROKeyData);
                //Assume the ParentFieldPath is blank and parameters are blank because it falls under the program list.
                sysproInterop.eventTrigged(
                    '',
                    '',
                    programName,
                    sysproKeys,
                    'tileClicked',
                    function(eCurrent) {},
                    function(eCurrent) {
                        if (eCurrent.ErrorMessage) sysproInterop.handleError(eCurrent.ErrorMessage, 'tileClicked');
                    }
                );
                isactioned = true;
            } else if (menuItemType === 'Flowgraph') {
                if (loadDiagramByName) {
                    loadDiagramByName(programName, programDescription, false);
                }
            }
        }
        return isactioned;
    },
    hideErrorMessage: function() {
        try {
            if (typeof SYSPRO_VB !== 'undefined' && SYSPRO_VB && SYSPRO_VB !== undefined) SYSPRO_VB.hideErrorMessage();
        } catch (ex) {
            //Hiding error messages isn't an issue to throw exceptions on.
        }
    },
    showErrorMessage: function(message, title) {
        try {
            if (typeof SYSPRO_VB !== 'undefined' && SYSPRO_VB && SYSPRO_VB !== undefined) {
                SYSPRO_VB.showErrorMessage(message, title);
            } else alert('Error thrown before initialization of framework: ' + message);
        } catch (ex) {
            console.log('showErrorMessage unhandled: ' + ex.message);
        }
    },
    //Show's the help window for the give program. If program name is leftblank the current program is used. If no current program is open the home screen of the help is shown.
    showHelp: function(programName) {
        try {
            var helpUrl = sysproInterop.currentUserSession.FullHelpUrl;
            if (!programName || programName.trim() === '') {
                programName = callLayerInterop.programName;
            }
            if (programName && programName.trim() !== '') {
                var sectionMarker = programName.substring(0, 3);
                //Replace all instances of $prog$ with the program name
                helpUrl = helpUrl.split('$3$').join(sectionMarker);
                //Replace all instances of $prog$ with the program name
                helpUrl = helpUrl.split('$prog$').join(programName);
            } else {
                helpUrl = sysproInterop.currentUserSession.HomeHelpUrl;
            }
            if (helpUrl) {
                window.open(helpUrl, '_blank');
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'showHelp');
        }
    },
    //Shows or hides a loading screen of the type specified with the text specified.
    toggleLoadingScreen: function(loadingScreenModel) {
        try {
            if (loadingScreenModel.Show == 'true') {
                if (loadingScreenModel.Type === 'Processing')
                    queryLayoutUIHelpers.showProcessingMessage(loadingScreenModel.Text);
                else $('[id=loading-cover]').fadeIn();
            } else {
                queryLayoutUIHelpers.hideProcessingMessage();
                $('[id=loading-cover]').fadeOut();
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'toggleLoadingScreen');
        }
    },
    //Shows or hides a loading screen of the type specified with the text specified.
    setStatusMessage: function(dataIn) {
        try {
            var statusBarDiv = null;
            if (dataIn.ModalId) {
                //Set the status in the modal window given
                statusBarDiv = $('.statusBar', '*[data-syspromodalid="' + dataIn.ModalId + '"]');
                if (statusBarDiv.length === 0)
                    //Set the status in the main layout if a matching modal was not found.
                    statusBarDiv = $('.statusBar', '#fusion-wrapper');
            } else {
                //Set the status in the main layout.
                statusBarDiv = $('.statusBar', '#fusion-wrapper');
            }

            $('.status-message', statusBarDiv).text(dataIn.Text);
            statusBarDiv.show();
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'setStatusMessage');
        }
    },
    //Shows  a  context menu with the structure provided.
    showContextMenu: function(menuModel) {
        try {
            //menuContent, locationX,  locationY
            var menuContent = menuModel.HtmlContent;
            var locationX = menuModel.LocationX;
            var locationY = menuModel.LocationY;

            if ($('#context-menu-list', '#syspro-context-menu-generic').length > 0) {
                if ($('#context-menu-list', '#syspro-context-menu-generic').data('kendoContextMenu')) {
                    $('#context-menu-list', '#syspro-context-menu-generic')
                        .data('kendoContextMenu')
                        .destroy();
                }
            }
            //Disposal seems like it needs to be done on the context menu specifically now not on the div that contained the html.
            if (sysproInterop.currentContextMenu) {
                //If the context menu was not disposed then dispose of it.
                if (sysproInterop.currentContextMenu.data('kendoContextMenu'))
                    sysproInterop.currentContextMenu.data('kendoContextMenu').destroy();
                sysproInterop.currentContextMenu.remove();
                sysproInterop.currentContextMenu = null;
            }
            //It  is assumed that menuContent  contains an id of context-menu-list  at the root  of the  menu.
            $('#syspro-context-menu-generic').html('');
            $('#syspro-context-menu-generic').html(menuContent);
            sysproInterop.currentContextMenuUnhealthyClose = false;
            sysproInterop.currentContextMenu = $('#context-menu-list', '#syspro-context-menu-generic').kendoContextMenu(
                {
                    select: function(e) {
                        var ActionId = $(e.item).data('contextmenuaction');
                        if (ActionId) {
                            console.log('Context menu clicked: ' + ActionId);

                            sysproInterop.eventTrigged(
                                ActionId,
                                '',
                                '',
                                '',
                                'contextMenuItemClicked',
                                function(eCurrent) {},
                                function(eCurrent) {}
                            );
                        }
                        //Finally dispose of the context menu.
                        e.sender.destroy();
                    },
                    animation: {
                        close: {
                            //I've hidden the close animation because of the deactivate workaround shown below.
                            duration: 0,
                        },
                    },
                    open: function(e) {
                        //The context menu was opened so expect a close before a deactivate.
                        sysproInterop.currentContextMenuUnhealthyClose = true;
                        // console.log("Kendo context menu opened :");
                        setTimeout(function(e1) {
                            //Workaround to surface context menu.
                            $('.k-context-menu')
                                .closest('.k-animation-container')
                                .css('z-index', '1000000');
                        }, 100);
                        //   console.log(e);
                    },
                    close: function(e) {
                        sysproInterop.currentContextMenuUnhealthyClose = false;
                    },
                    deactivate: function(e) {
                        //If deactivate is called beofre a close then assume it is unhealthy because of the scroll and therefore open it again.
                        //In this case use the previous cursor location that it was opened at not the current one.
                        //if (sysproInterop.currentContextMenuUnhealthyClose) {
                        //    if (parseInt(locationX) === 0 && parseInt(locationY) === 0) {
                        //        //If the location is given as zeroes then open it at the current cursor location.
                        //        //Just in case if the last known contextmenu position was not set then use the current ones.
                        //        if (!sysproInterop.cursorContextMenuOpenedX)
                        //            sysproInterop.cursorContextMenuOpenedX = sysproInterop.cursorX;
                        //        if (!sysproInterop.cursorContextMenuOpenedY)
                        //            sysproInterop.cursorContextMenuOpenedY = sysproInterop.cursorY;
                        //        sysproInterop.currentContextMenu.data("kendoContextMenu").open(sysproInterop.cursorContextMenuOpenedX, sysproInterop.cursorContextMenuOpenedY);
                        //    } else {
                        //        sysproInterop.currentContextMenu.data("kendoContextMenu").open(locationX, locationY);
                        //    }
                        //}
                    },
                }
            );

            if (parseInt(locationX) === 0 && parseInt(locationY) === 0) {
                //If the location is given as zeroes then open it at the current cursor location.
                sysproInterop.cursorContextMenuOpenedX = sysproInterop.cursorX;
                sysproInterop.cursorContextMenuOpenedY = sysproInterop.cursorY;
                sysproInterop.currentContextMenu
                    .data('kendoContextMenu')
                    .open(sysproInterop.cursorX, sysproInterop.cursorY);
            } else {
                sysproInterop.currentContextMenu.data('kendoContextMenu').open(locationX, locationY);
            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'showContextMenu');
        }
    },
    //Calls a business Object in SYSPRO with the given call type.
    //callType: The business object type eg. query, post, add, update
    //parameter1: The Xml or JSON in.
    //parameter2: The Xml or JSON out.
    //callbackMethod: Success callback function with a single parameter with the output of the business object.
    //errorcallbackMethod: Callback function with an error  parameter
    //useXmlIn: parameter1 is given as JSON
    //useXmlOut: The callbackmethod result is given as xml
    callBusinessObject: function(
        callType,
        BOName,
        parameter1,
        parameter2,
        callbackMethod,
        errorcallbackMethod,
        useXmlIn,
        useXmlOut,
        optionalParameters
    ) {
        try {
            if (!useXmlIn) useXmlIn = 'false';
            else useXmlIn = 'true';
            if (!useXmlOut) useXmlOut = 'false';
            else useXmlOut = 'true';
            if (!optionalParameters) optionalParameters = '';
            var NativeCallDataIn = {
                Operation: 'callBusinessObject',
                Application: callType,
                KeyField: BOName,
                KeyFieldValue: parameter1,
                FinalParameter: parameter2,
                AdditionalField1: useXmlIn,
                AdditionalField2: useXmlOut,
                AdditionalField3: optionalParameters,
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: 'sysproInterop.interopCallbackReceived',
            };

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] = {
                Success: callbackMethod,
                Error: errorcallbackMethod,
            };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        } catch (ex) {
            sysproInterop.handleError(ex.message, 'callBusinessObject');
        }
    },
    closeSYSPROFusion: function(performReload) {
        console.log('closeSYSPROFusion');
        if (performReload) {
            //If it is a second instance then close the window instead of trying to reload the logon screen.
            if (!callLayerInterop.isSecondInstance) window.location.reload();
            else window.close();
        } else {
            try {
                //First build up a list of non modal windows that are open and their respective locations.
                var windowCloseData = '';
                $.each(sysproInterop.modalWindowHolder, function(index) {
                    //If the Window is not modal then add it to the list
                    if (this.NotModal) {
                        var modalWindow = this.Window;
                        var SYSPROId = this.Id;

                        var kendoWindowInput = modalWindow.options;
                        //The position given to SYSPRO is left|top|width|height
                        var topIn = kendoWindowInput.position.top;
                        var leftIn = kendoWindowInput.position.left;
                        var widthIn = kendoWindowInput.width;
                        var heightIn = kendoWindowInput.height;
                        //When the top or left is 50% then center then send through blank to Phil and when he sends blank through to center it.
                        if (isNaN(leftIn)) {
                            if (leftIn === '50%') leftIn = '';
                            else leftIn = leftIn.replace('px', '');
                        }
                        if (isNaN(topIn)) {
                            if (topIn === '50%') topIn = '';
                            else topIn = topIn.replace('px', '');
                        }
                        if (isNaN(widthIn)) {
                            widthIn = widthIn.replace('px', '');
                        }
                        if (isNaN(heightIn)) {
                            heightIn = heightIn.replace('px', '');
                        }
                        var positionCurrent = SYSPROId + ';' + leftIn + ';' + topIn + ';' + widthIn + ';' + heightIn;
                        if (!windowCloseData) {
                            windowCloseData = positionCurrent;
                        } else {
                            windowCloseData = windowCloseData + '|' + positionCurrent;
                        }
                    }
                });
                //Tell SYSPRO that the browser  has  closed.
                sysproInterop.eventTrigged(
                    windowCloseData,
                    '',
                    '',
                    '',
                    'closeBrowser',
                    function(e) {},
                    function(ex) {
                        alert('Error on close SYSPRO - ' + ex.message);
                    },
                    true
                );
            } catch (ex) {
                alert('Error on close SYSPRO - ' + ex.message);
            }
        }
    },
};

//The call layer interop decides on how to call into the native layer to get data and subscribe to events etc.
var callLayerInterop = {
    interopType: 'SYSPRORehostedBrowser',
    runningMode: null,
    standaloneAddress: 'http://localhost/UXTools/',
    //For build mode MVCServer64 and MVCDebug (For IIS and Cloud builds) this should be set to mvc and for others api.
    renderMode: 'api',
    // interopType: "StandaloneBrowser",
    connectionId: null,
    sessionId: null,
    menuHtml: null,
    menuDetail: null,
    changeFromKeyPress: false,
    validationInProgress: false,
    devMode: '',
    serverSessionIdOverride: '',
    avantiPluginLoaded: '',
    ignoreUnload: false,
    //This indicates if the application was properly logged into or if it is a second automated instance.
    isSecondInstance: false,
    //The previous plugin is stored purely so that when IMPTIM is clicked it can be reloaded.
    previousAvantiPlugin: '',
    programName: '',
    //This function is purely for when running in the browser to setup events  and  set the addresses and defaults required.
    initializeInBrowser: function(optionalAddress, optionalMode) {
        callLayerInterop.runningMode = optionalMode;
        callLayerInterop.interopType = 'StandaloneBrowser';
        if (optionalAddress) {
            callLayerInterop.standaloneAddress = optionalAddress;
        }
        $('.combobox-logon:not(.combobox-initialized)').combobox({ newOptionsAllowed: true });
        $('.combobox-logon:not(.combobox-initialized)').addClass('combobox-initialized');

        $(document).on('keydown', function(event) {
            var keycode = event.keyCode || event.which;
            if (keycode == '112' || keycode === 112) {
                sysproInterop.showHelp();
                event.preventDefault();
                return false;
            }
            return true;
        });

        $('input.syspro-logon-field').on('change', function(e) {
            if (!callLayerInterop.changeFromKeyPress) {
                var idOfChange = '';
                if (e.target) idOfChange = e.target.id;
                if (!callLayerInterop.validationInProgress) {
                    callLayerInterop.validateCredentials(idOfChange);
                }
            }
            callLayerInterop.changeFromKeyPress = false;
        });
        $('#logonForm').off('keypress');
        $('#logonForm').on('keypress', function(event) {
            var keycode = event.keyCode || event.which;
            if (keycode == '13' || keycode === 13) {
                if (!callLayerInterop.validationInProgress) {
                    callLayerInterop.changeFromKeyPress = true;
                    if (!$('button', '.logon-button').is(':focus')) {
                        console.log('ENTER: Validation not in progress, intializeInteropLayer');
                        callLayerInterop.intializeInteropLayer('AnyValueSetsFusionOnEnter');
                    }
                }
            }
        });
        $('select.syspro-logon-field-combo').on('change', function(e) {
            if (e.currentTarget.value) {
                var idOfChange = '';
                if (e.currentTarget) idOfChange = e.currentTarget.id;
                if (!callLayerInterop.validationInProgress) {
                    callLayerInterop.validateCredentials(idOfChange);
                }
            }
        });

        //Next hide the Change password form and subscribe to the change password click.
        //This should alwyas happen.
        //if (callLayerInterop.runningMode === "Portal") {
        //Add event handlers for the change password functionality.
        $('.change-password-link').off('click');
        $('.change-password-link').on('click', function(e) {
            $('#logonForm').hide();
            $('#forgotPasswordForm').show();
            $('#ChangePasswordForm_operator').val($('#UserName').val());
            if ($('#UserName').val())
                $('#ChangePasswordForm_operator')
                    .closest('.form-group')
                    .removeClass('is-empty');
        });

        $('.back-to-logon-link').off('click');
        $('.back-to-logon-link').on('click', function(e) {
            $('#logonForm').show();
            $('#forgotPasswordForm').hide();
            $('#UserName').val($('#ChangePasswordForm_operator').val());
            if ($('#ChangePasswordForm_operator').val())
                $('#UserName')
                    .closest('.form-group')
                    .removeClass('is-empty');
        });
        //}
        var url_string = window.location.href;
        if (url_string) {
            url_string = url_string.replace('??', '?');
        }
        var url = '';
        var SecondInstance = '';
        var OpenParameters = '';
        var MASessionIdOverride = '';
        try {
            url = new URL(url_string);
            //Should url parameters be  used or should a hash parameter be used.
            SecondInstance = url.searchParams.get('SecondInstance');
            OpenParameters = url.searchParams.get('OpenParameters');
        } catch (e) {
            var getParameterByName = function(name) {
                var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
                return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
            };
            SecondInstance = getParameterByName('SecondInstance');
            OpenParameters = getParameterByName('OpenParameters');
        }

        if (SecondInstance === 'true') {
            $('#logonForm').hide();
            callLayerInterop.isSecondInstance = true;
            callLayerInterop.intializeInteropLayer('SecondInstance', OpenParameters);
        } else if (SecondInstance === 'debug') {
            //If in debug mode visually indicate to the user.
            $('body').addClass('dev-mode-body');
            callLayerInterop.intializeInteropLayer('debug', OpenParameters);
        } else {
            $('#UserName').focus();
        }
        //SecondInstance=true&OpenParameters
        //finally subscribe to keydowns and mousedowns to update the lastActivityDateTime
        $(window).on('mousedown', function(e) {
            sysproInterop.lastActivityDateTime = Date.now();
        });
        $(window).on('keydown', function(e) {
            sysproInterop.lastActivityDateTime = Date.now();
        });
    },
    //This function is purely for when running in the browser to validate the operator credentials entered on tab.
    validateCredentials: function(fieldName) {
        callLayerInterop.validationInProgress = true;
        console.log('validateCredentials');
        $('#loading-cover').fadeIn();
        //a temporary session id is used  to validate each credential.
        var sessionIdForValidate = sysproInterop.generateUUID();

        var operatorIn = $('#UserName').val();
        var operatorPasswordIn = $('#UserPwd').val();
        var companyIn = $('#CompId').val();
        var companyPasswordIn = $('#CompPass').val();
        if (!operatorIn) operatorIn = '';
        if (!operatorPasswordIn) operatorPasswordIn = '';
        if (!companyIn) companyIn = '';
        if (!companyPasswordIn) companyPasswordIn = '';
        var dataIn = {
            SessionId: sessionIdForValidate,
            Operator: operatorIn,
            OperatorPassword: operatorPasswordIn,
            Company: companyIn,
            CompanyPassword: companyPasswordIn,
        };

        $.ajax({
            url: callLayerInterop.standaloneAddress + callLayerInterop.renderMode + '/UXInteropWeb/ValidateCredentials',
            data: dataIn,
            contentType: 'application/json; charset=utf-8',
        })
            .done(function(result) {
                callLayerInterop.showValidationOutput(result, fieldName);
                $('[id=loading-cover]').fadeOut();
                callLayerInterop.validationInProgress = false;
                // sysproInterop.callFromSYSPRO(result.MethodName, result.DataOut);
            })
            .fail(function(result) {
                var errorToShow = result.statusText;
                if (errorToShow === 'error') {
                    errorToShow = 'Cannot connect to server: ' + callLayerInterop.standaloneAddress;
                }
                sysproInterop.showErrorMessage('Error validating credentials - ' + errorToShow);
                $('[id=loading-cover]').fadeOut();
                callLayerInterop.validationInProgress = false;
            });
    },
    showValidationOutput: function(result, fieldChanged) {
        //First clear out the oldstuff.
        $('.help-block').removeClass('always-show');
        $('.help-block').text('');
        $('.form-group').removeClass('has-error');
        $('.form-group').removeClass('has-information');
        $('.form-group').removeClass('has-warning');

        if (result.UserName) {
            $('#UserName').val(result.UserName);
            $('#ChangePasswordForm_operator').val(result.UserName);
            if (result.UserName)
                $('#ChangePasswordForm_operator')
                    .closest('.form-group')
                    .removeClass('is-empty');
            $('#CompId')
                .closest('.form-group')
                .removeClass('is-empty');
        }

        if (result.UserNameFull) {
            $('#UserName')
                .closest('.form-group')
                .addClass('has-information');
            $('#UserName')
                .next('.help-block')
                .addClass('always-show');
            $('#UserName')
                .next('.help-block')
                .removeClass('error-message');
            $('#UserName')
                .next('.help-block')
                .text(result.UserNameFull);
            //  $(".fusion-current-account-name").text(result.UserNameFull);
        }

        if (result.CompanyName) {
            $('#CompId')
                .closest('.form-group')
                .addClass('has-information');
            $('#CompId')
                .next('.help-block')
                .addClass('always-show');
            $('#CompId')
                .next('.help-block')
                .removeClass('error-message');
            $('#CompId')
                .next('.help-block')
                .text(result.CompanyName);
        }
        if (result.CompaniesAvailable && result.CompaniesAvailable.length >= 1) {
            //Remove the any previous companies

            $('#CompId').html("<option value=''></option>");
            $.each(result.CompaniesAvailable, function(index) {
                var isselected = '';
                if (result.CompanyId === this.value) isselected = "selected='selected'";
                $('#CompId').append(
                    "<option value='" +
                        this.Value +
                        "' " +
                        isselected +
                        '>' +
                        this.Value +
                        ' - ' +
                        this.Description +
                        '</option>'
                );
            });
            if (!result.CompanyId) {
                //Only if the company is blank then do  a refresh otherwise it will be refreshed after the company id is set.
                if ($('#CompId').length > 0)
                    $('#CompId')
                        .data('combobox')
                        .refresh();
            }
        }
        if (result.CompanyId) {
            $('#CompId')
                .closest('.form-group')
                .removeClass('is-empty');
            $('#CompId').val(result.CompanyId);
            if ($('#CompId').data('combobox'))
                $('#CompId')
                    .data('combobox')
                    .refresh();
        }
        if (result.ValidationMessage) {
            if (!result.ValidationMessage.IsGlobal) {
                if (
                    (fieldChanged === 'UserName' &&
                        (result.ValidationMessage.FieldName === 'UserPwd' ||
                            result.ValidationMessage.FieldName === 'CompPass')) ||
                    (fieldChanged === 'CompId' &&
                        (result.ValidationMessage.FieldName === 'UserPwd' ||
                            result.ValidationMessage.FieldName === 'CompPass')) ||
                    (fieldChanged === 'UserPwd' && result.ValidationMessage.FieldName === 'CompPass')
                ) {
                    //If the user name has changed and the password was validated then:
                    //If the password is blank then don't show the error.
                } else {
                    $('#' + result.ValidationMessage.FieldName)
                        .closest('.form-group')
                        .addClass(result.ValidationMessage.ValidationClass);
                    $('#' + result.ValidationMessage.FieldName)
                        .next('.help-block')
                        .addClass('error-message');
                    $('#' + result.ValidationMessage.FieldName)
                        .next('.help-block')
                        .text(result.ValidationMessage.Text);
                }
            } else {
                sysproInterop.showErrorMessage(result.ValidationMessage.Text);
            }
            return false;
        }

        return true;
    },
    //This function is purely for when running in the browser to change the password of the operator.
    changePassword: function() {
        callLayerInterop.validationInProgress = true;
        console.log('changePassword');
        $('#loading-cover').fadeIn();

        var operatorIn = $('#ChangePasswordForm_operator').val();
        var operatorPasswordIn = $('#ChangePasswordForm_oldpassword').val();
        var operatorNewPasswordIn = $('#ChangePasswordForm_newpassword').val();
        var operatorConfirmPasswordIn = $('#ChangePasswordForm_confirmnewpassword').val();
        if (!operatorIn) operatorIn = '';
        if (!operatorPasswordIn) operatorPasswordIn = '';
        if (!operatorNewPasswordIn) operatorNewPasswordIn = '';
        if (!operatorConfirmPasswordIn) operatorConfirmPasswordIn = '';
        var dataIn = {
            UserName: operatorIn,
            OldPassword: operatorPasswordIn,
            NewPassword: operatorNewPasswordIn,
            ConfirmNewPassword: operatorConfirmPasswordIn,
        };

        $.ajax({
            url: callLayerInterop.standaloneAddress + callLayerInterop.renderMode + '/UxInternalWeb/ChangePassword',
            data: dataIn,
            type: 'POST',
        })
            .done(function(result) {
                callLayerInterop.showValidationOutputChangePassword(result);
                $('[id=loading-cover]').fadeOut();
                callLayerInterop.validationInProgress = false;
                // sysproInterop.callFromSYSPRO(result.MethodName, result.DataOut);
            })
            .fail(function(result) {
                var errorToShow = result.statusText;
                if (errorToShow === 'error') {
                    errorToShow = 'Cannot connect to server: ' + callLayerInterop.standaloneAddress;
                }
                sysproInterop.showErrorMessage('Error validating credentials - ' + errorToShow);
                $('[id=loading-cover]').fadeOut();
                callLayerInterop.validationInProgress = false;
            });
    },
    showValidationOutputChangePassword: function(result) {
        //First clear out the oldstuff.
        $('.help-block').removeClass('always-show');
        $('.help-block').text('');
        $('.form-group').removeClass('has-error');
        $('.form-group').removeClass('has-information');
        $('.form-group').removeClass('has-warning');

        if (result.ValidationMessage) {
            if (!result.ValidationMessage.IsGlobal) {
                $('#' + result.ValidationMessage.FieldName)
                    .closest('.form-group')
                    .addClass(result.ValidationMessage.ValidationClass);
                $('#' + result.ValidationMessage.FieldName)
                    .next('.help-block')
                    .addClass('error-message');
                $('#' + result.ValidationMessage.FieldName)
                    .next('.help-block')
                    .text(result.ValidationMessage.Text);
            } else {
                if (result.ValidationMessage.ValidationStyle == 1) {
                    sysproInterop.showCustomTaskDialog(
                        'sys-bg-success',
                        'sys-fg-white',
                        'Password change',
                        'Password changed successfully',
                        '',
                        'done'
                    );

                    $('#logonForm').show();
                    $('#forgotPasswordForm').hide();
                } else {
                    sysproInterop.showErrorMessage(result.ValidationMessage.Text);
                }
            }
            return false;
        }

        return true;
    },
    decompressString: function(inputStr, useCompression) {
        if (sysproInterop.currentUserSession && sysproInterop.currentUserSession.UseCompression && useCompression) {
            var compressData = atob(inputStr);
            compressData = compressData.split('').map(function(e) {
                return e.charCodeAt(0);
            });
            var binData = new Uint8Array(compressData);
            //Decompress  data
            var fulldata = pako.inflate(binData, { raw: true });
            var charsetIn = 'windows-1252';
            if (sysproInterop.currentUserSession && sysproInterop.currentUserSession.Charset) {
                charsetIn = sysproInterop.currentUserSession.Charset;
            }
            var decoderIn = new TextDecoder(charsetIn);
            var outstr = decoderIn.decode(fulldata);
            return outstr;
        } else {
            return inputStr;
        }
    },
    intializeInteropLayer: function(optionalAddress, openParameters) {
        console.log('intializeInteropLayer - ' + optionalAddress);

        //Override console.log for debugging and logging purposes.
        if (callLayerInterop.interopType === 'SYSPRORehostedBrowser') {
            console = {
                log: function(message) {
                    try {
                        sysproInterop.logMessage(null, null, null, null, JSON.stringify(message));
                    } catch (ex) {}
                },
            };
        } else if (callLayerInterop.interopType === 'StandaloneBrowser') {
            if (!callLayerInterop.validationInProgress) {
                //Pretty major tweak but only initialize the layer if it's not currently busy.
                //This is checked in few other places but fail safe should be here as well.
                if (optionalAddress === 'debug') {
                    callLayerInterop.devMode = optionalAddress;
                    callLayerInterop.serverSessionIdOverride = openParameters;
                    optionalAddress = '';
                }
                //Only if an optional address  is given in the constructor then should the interop stuff execute.
                if (optionalAddress) {
                    if (callLayerInterop.devMode) {
                        //TODO: Should this clear out the dev mode flags?
                        optionalAddress = callLayerInterop.devMode;
                        openParameters = callLayerInterop.serverSessionIdOverride;
                    }
                    callLayerInterop.validationInProgress = true;
                    $('#loading-cover').fadeIn();
                    //If it's standalone subscribe to a SignalR for event propagation. //trigger calledFromNative from
                    // Declare a proxy to reference the hub.

                    $.connection.hub.url = callLayerInterop.standaloneAddress + 'signalr/hubs';
                    // Start the connection.

                    var chat = $.connection.scriptHub;

                    if (chat) {
                        // Create a function that the hub can call to broadcast messages.
                        chat.client.broadcastMessage = function(
                            name,
                            fulldata,
                            detail,
                            windowDetails,
                            useCompression,
                            avantiPlugin
                        ) {
                            try {
                                //console.log("SERVERMESSAGE " + name);
                                //This means that the avanti Plugin will be set for any call received so any replies will be sent to the plugin loaded.
                                // console.log("avantiPluginLoaded - " + avantiPlugin);
                                //Assume that we are only interested in plugins loaded when they are not SYSPRO itself.
                                if (callLayerInterop.avantiPluginLoaded)
                                    callLayerInterop.previousAvantiPlugin = callLayerInterop.avantiPluginLoaded;
                                callLayerInterop.avantiPluginLoaded = avantiPlugin;
                                if (name == 'ShowError') {
                                    $('[id=loading-cover]').fadeOut();
                                    sysproInterop.showErrorMessage(fulldata, detail);
                                    var executionOutput2 = 'ERROR: ' + fulldata;
                                    //Trigger an invocationcallback just in case to release the thread lock.
                                    sysproInterop.eventTrigged(
                                        executionOutput2,
                                        '',
                                        '',
                                        '',
                                        'invocationCallback',
                                        function(e) {},
                                        function(e) {}
                                    );
                                } else if (name == 'InsertBody' || name == 'InsertBodyDesigner') {
                                    fulldata = callLayerInterop.decompressString(fulldata, useCompression);
                                    //Insert the html in the  document  and remove the old body tag.
                                    //$("body").html("");

                                    //Perform some basic disposal to clean up the older view stuff.
                                    queryLayoutUIHelpers.disposeVisualDesigner();
                                    queryLayoutUIHelpers.disposeViewOnly();
                                    //if (name == "InsertBodyDesigner") {
                                    //    $("#harness-container").hide();

                                    //    $("#harness-container-visualdesigner").html("");
                                    //    if (!callLayerInterop.menuHtml) {
                                    //        callLayerInterop.menuHtml = fulldata;
                                    //        callLayerInterop.menuDetail = detail;
                                    //    }
                                    //    //Add toggled wrapper for these cases.
                                    //    $("#harness-container-visualdesigner").html("<div id=\"wrapper\" class=\"toggled\">" + fulldata + "</div>");
                                    //    $("#harness-container-visualdesigner").show();
                                    //} else {

                                    //$("#harness-container-visualdesigner").hide();
                                    //$("#harness-container-visualdesigner").html("");
                                    var BoundItemDiv = $(
                                        '.sys-widget:not(.card-widget,.harmony-widget,.tile-widget,.tile-inner,.syspro-toolbar,.tiles-parent,.syspro-nonbound)',
                                        '#harness-container'
                                    );
                                    kendo.unbind(BoundItemDiv);
                                    $.each($('.syspro-grid-list'), function(index) {
                                        if ($(this).data('kendoGrid')) {
                                            //Manually dispose of every kendo grid because of weird disposal issue with Joes new Table structure.
                                            $(this)
                                                .data('kendoGrid')
                                                .destroy();
                                        }
                                    });
                                    kendo.destroy($('#harness-container'));
                                    $('#harness-container').html('');
                                    if (!callLayerInterop.menuHtml) {
                                        callLayerInterop.menuHtml = fulldata;
                                        callLayerInterop.menuDetail = detail;
                                    }
                                    //Add toggled wrapper for these cases.
                                    $('#harness-container').html(
                                        '<div id="wrapper" class="toggled">' + fulldata + '</div>'
                                    );
                                    $('#harness-container').show();
                                    //}
                                    if (windowDetails) {
                                        var parsedDetails = JSON.parse(windowDetails);
                                        //Check whether the current Program is an Entry or Setup and then set the sysproInterop.isInEntryScreen to ProgramType variable.
                                        sysproInterop.isInEntryScreen = parsedDetails.ProgramType;
                                        callLayerInterop.programName = parsedDetails.Program;
                                        $('head title').text(parsedDetails.Title + ' - SYSPRO Avanti');
                                        //if (parsedDetails.Program === "IMPMEN")
                                        //{
                                        $('.application-sub-title').text(parsedDetails.Title);
                                        //} else
                                        //{
                                        //    $(".application-sub-title").text("SYSPRO Avanti");
                                        //}

                                        if (name == 'InsertBody') {
                                            //Make sure not to add the IMenu to the navigation history.
                                            // $(".current-application-recent", ".recently-viewed-history").removeClass("current-application-recent");
                                            if (
                                                parsedDetails.Program &&
                                                parsedDetails.Title &&
                                                parsedDetails.Program !== 'IMPMEN' &&
                                                parsedDetails.Program !== '      '
                                            ) {
                                                sysproInterop.addRecentProgram(
                                                    parsedDetails.Program,
                                                    parsedDetails.Title,
                                                    'Program',
                                                    avantiPlugin
                                                );

                                                //if its a normal body insert then add it to the recently viewed items in the back button.
                                                //recently-viewed-history
                                                //<li><a href="#" onclick="sysproInterop.backToMenu();">Home</a></li>
                                                //sysproInterop.eventTrigged(dataItem.ProgramName, "Program", null, null, "tileClicked", function (eCurrent) { }, function (eCurrent) { if (eCurrent.ErrorMessage) sysproInterop.handleError(eCurrent.ErrorMessage, "tileClicked"); });
                                                //First remove the current tag from the previous

                                                //var runProgramAction = "sysproInterop.runProgramInSYSPRO(\"" + parsedDetails.Program + "\");";

                                                ////$(".recently-viewed-history").append("<li class='current-application-recent'><a href='#' onclick='" + runProgramAction + "'>" + parsedDetails.Title + "</a></li>")
                                                //var recentTreeView = $(".recently-viewed-history").data("kendoTreeView");
                                                //if (!recentTreeView) {
                                                //    $(".recently-viewed-history").kendoTreeView({
                                                //        dataSource: [{ text: "None", "MenuName": "None" }],
                                                //        template: $("#recent-menu-template").text(),
                                                //        select: function (e) {
                                                //            var recentTree = $(".recently-viewed-history").data('kendoTreeView');
                                                //            var dataItem = recentTree.dataItem(e.node);
                                                //            sysproInterop.runProgramInSYSPRO(dataItem.Name);
                                                //        }
                                                //    });
                                                //}
                                                //recentTreeView = $(".recently-viewed-history").data("kendoTreeView");
                                                //// appends a new node to the first treeview item
                                                //var node = $(".recently-viewed-history li:contains('" + parsedDetails.Title + "')");
                                                ////add if it does not exist
                                                //if (recentTreeView && node.length == 0) {
                                                //    var removeNone = $(".recently-viewed-history li:contains('None')");;
                                                //    if (removeNone.length > 0) {
                                                //        recentTreeView.remove(removeNone);
                                                //    }
                                                //    recentTreeView.append({ "MenuName": parsedDetails.Title, "Name": parsedDetails.Program });
                                                //}
                                                //$(".recently-viewed-history").append("<li class='current-application-recent'><a href='#' onclick='" + runProgramAction + "'>" + parsedDetails.Title + "</a></li>")
                                            }
                                        }
                                    }
                                    //Set the data attribute in both ways to ensure the layout is retrieved correctly.
                                    $('body')[0].setAttribute('data-column-layout', detail);
                                    $('body').data('column-layout', detail);
                                    $('[id=loading-cover]').fadeOut();
                                    $('.fusion-bottom-toolbar').hide();

                                    if (name == 'InsertBody') {
                                        sysproInterop.inDesignMode = false;
                                        queryLayoutUIHelpers.initializeViewOnly();
                                        queryLayoutUIHelpers.initializeToolbarEvents();
                                        $('#builder-toolbar').hide();
                                        $('.fusion-maininstance-buttons').show();
                                    } else {
                                        sysproInterop.inDesignMode = true;
                                        SYSPRO_VB.init();
                                        queryLayoutUIHelpers.initializeToolbarEvents();
                                        $('#builder-toolbar').show();
                                        $('.fusion-maininstance-buttons').hide();
                                    }
                                    sysproInterop.viewModel = null;
                                    sysproInterop.toolbarModel = null;
                                    //Binds should now be done to the full screen again for the new body inserted.
                                    sysproInterop.fullBindRequired = null;
                                } else if (name == 'OpenSearchWindow') {
                                    fulldata = callLayerInterop.decompressString(fulldata, useCompression);
                                    var modalId = sysproInterop.showModalWindow(JSON.parse(fulldata), 'SearchWindow');
                                    //Now call Avanti Search Open Search
                                    //Somehow get/have a generic callback method which would set the outgoing field when clicked and pass it through.
                                    var SearchType = detail.split('|')[0];
                                    var SearchField = detail.split('|')[1];
                                    var SearchValue = '';
                                    if (detail.split('|').length > 2) SearchValue = detail.split('|')[2];
                                    //BindSearchListInCard(SearchType, function (ValueClicked) {
                                    //    sysproInterop.browseValueSelected(SearchField, ValueClicked, SearchType);
                                    //});
                                    AvantiSearchInterop.OpenSearch(
                                        SearchType,
                                        SearchValue,
                                        '',
                                        '',
                                        '',
                                        function(ValueClicked) {
                                            sysproInterop.browseValueSelected(SearchField, ValueClicked, SearchType);
                                        },
                                        $('#' + modalId)
                                    );
                                } else if (name == 'ExecuteScript') {
                                    //TODO: Remove logging of full script being executed.
                                    ///  var dataIn = {};
                                    try {
                                        fulldata = callLayerInterop.decompressString(fulldata, useCompression);
                                        var executionOutput = sysproInteropFunction(fulldata);
                                        //Execute a function and then return the output.

                                        if (!executionOutput || executionOutput === undefined) {
                                            executionOutput = '';
                                        }
                                        //In the case of  executeScript, windowDetails represents whether a response is awaited and if there is perform a invocationCallback
                                        //dataIn.InvocationResult = executionOutput;
                                    } catch (exScript) {
                                        executionOutput = 'ERROR: ' + exScript.message;
                                        sysproInterop.showErrorMessage(
                                            exScript.message,
                                            'The instruction from the SYSPRO Server failed'
                                        );
                                    }
                                    if (windowDetails === 'True') {
                                        //Pass through the GUID to setTimeout just in case it loses it.
                                        setTimeout(
                                            function(callguid) {
                                                // console.log("invocationCallback - " + callguid);
                                                sysproInterop.eventTrigged(
                                                    executionOutput,
                                                    callguid,
                                                    '',
                                                    '',
                                                    'invocationCallback',
                                                    function(e) {},
                                                    function(e) {}
                                                );
                                            },
                                            0,
                                            detail
                                        );
                                    }
                                } else if (name == 'SetLogonCredentials') {
                                    var SessionDetails = JSON.parse(fulldata);
                                    if (SessionDetails) {
                                        sysproInterop.currentUserSession = SessionDetails;
                                        $('.fusion-current-account-name').text(
                                            sysproInterop.currentUserSession.OperatorName
                                        );
                                        sysproInterop.dateFormat = sysproInterop.currentUserSession.DateFormat;
                                        if (!sysproInterop.currentUserSession.NotificationsCount)
                                            sysproInterop.currentUserSession.NotificationsCount = 0;
                                        sysproInterop.updateNotificationsCount(
                                            sysproInterop.currentUserSession.NotificationsCount
                                        );
                                        //TODO: Set the CompanyName as well.
                                    }
                                } else if (name === 'SendNotification') {
                                    //In the case of external notifications, don't clear the plugin held because it hasn't received focus.
                                    if (callLayerInterop.avantiPluginLoaded === avantiPlugin)
                                        callLayerInterop.avantiPluginLoaded = callLayerInterop.previousAvantiPlugin;
                                    //Display the notification and update the UI.
                                    sysproInterop.sendNotification(JSON.parse(fulldata));
                                    return '';
                                } else if (name == 'ExitSYSPRO') {
                                    sysproInterop.showErrorMessage(
                                        'The SYSPRO.exe on the server linked to your session has been closed. Please refresh your browser (F5)  and logon again.',
                                        'SYSPRO server closed.'
                                    );
                                    return '';
                                }
                            } catch (ex) {
                                sysproInterop.handleError(ex.message, 'ServerMessage');
                            }
                        };
                    } else {
                        $('[id=loading-cover]').fadeOut();
                        callLayerInterop.validationInProgress = false;
                        sysproInterop.showErrorMessage(
                            "Cannot connect to the Avanti server '" +
                                callLayerInterop.standaloneAddress +
                                "'. Please check your network settings and try again.",
                            'Logon Failed'
                        );
                    }
                    sysproInterop.reconnectionAttempts = 0;
                    if ($.connection.hub.disconnected) {
                        $.connection.hub.disconnected(function(e) {
                            console.log('SIGNALR disconnected ' + callLayerInterop.connectionId);
                            if (sysproInterop.reconnectionAttempts < 20) {
                                sysproInterop.showCustomTaskDialog(
                                    'sys-bg-danger',
                                    'sys-fg-white',
                                    'Connection with Avanti server lost',
                                    'Please wait while Avanti attempts to reconnect.',
                                    '',
                                    'portable_wifi_off'
                                );
                                setTimeout(function() {
                                    sysproInterop.showCustomTaskDialog(
                                        'sys-bg-primary',
                                        'sys-fg-white',
                                        'Connecting to Avanti server',
                                        'Connection in progress...',
                                        '',
                                        'wifi_tethering'
                                    );
                                    $.connection.hub
                                        .start({ withCredentials: false })
                                        .done(function() {
                                            //Now need to update the server about this.
                                            console.log('SIGNALR reconnected on ' + $.connection.hub.id);
                                            sysproInterop.reconnectionAttempts = 0;
                                            var dataIn = {
                                                SessionIdOld: callLayerInterop.connectionId,
                                                SessionIdNew: $.connection.hub.id,
                                            };
                                            $.ajax({
                                                url:
                                                    callLayerInterop.standaloneAddress +
                                                    callLayerInterop.renderMode +
                                                    '/UXInteropWeb/UpdateScriptSessionId',
                                                data: dataIn,
                                                contentType: 'application/json; charset=utf-8',
                                            }).done(function(result) {
                                                sysproInterop.showCustomTaskDialog(
                                                    'sys-bg-success',
                                                    'sys-fg-white',
                                                    'Connection successful',
                                                    'You may continue using Avanti.',
                                                    '',
                                                    'wifi'
                                                );

                                                callLayerInterop.connectionId = $.connection.hub.id;
                                            });
                                        })
                                        .fail(function(ex) {
                                            sysproInterop.reconnectionAttempts = sysproInterop.reconnectionAttempts + 1;
                                            console.log(
                                                'error on reconnect number ' +
                                                    sysproInterop.reconnectionAttempts +
                                                    ' - ' +
                                                    ex.message
                                            );
                                            var AttemptsLeft = 20 - sysproInterop.reconnectionAttempts;
                                            sysproInterop.showCustomTaskDialog(
                                                'sys-bg-danger',
                                                'sys-fg-white',
                                                'Connection attempt failed',
                                                'Please check your connectivity. Avanti will continue to attempt to reconnect ' +
                                                    AttemptsLeft +
                                                    ' more times.',
                                                '',
                                                'portable_wifi_off'
                                            );
                                        });
                                }, 5000); // Restart connection after 5 seconds.
                            } else {
                                sysproInterop.showCustomTaskDialog(
                                    'sys-bg-danger',
                                    'sys-fg-white',
                                    'Connection with Avanti server lost',
                                    '20 reconnection attempts failed. Please check connectivity and reload Avanti.',
                                    '',
                                    'portable_wifi_off'
                                );
                            }
                        });
                    }
                    var ConnectSucceed = false;
                    //$.support.cors = true;
                    $.connection.hub
                        .start({ withCredentials: false })
                        .done(function() {
                            ConnectSucceed = true;
                            callLayerInterop.connectionId = $.connection.hub.id;
                            var secondInstance = '';
                            var openParametersInput = '';
                            if (optionalAddress === 'SecondInstance' && openParameters) {
                                secondInstance = 'true';
                                openParametersInput = openParameters;
                            } else if (optionalAddress === 'debug' && openParameters) {
                                //If in debug mode then use openparameters as the override session id for the MA.
                                secondInstance = 'debug';
                                openParametersInput = openParameters;
                            }

                            var operatorIn = $('#UserName').val();
                            var operatorPasswordIn = $('#UserPwd').val();
                            var companyIn = $('#CompId').val();
                            var companyPasswordIn = $('#CompPass').val();
                            if (!operatorIn) operatorIn = '';
                            if (!operatorPasswordIn) operatorPasswordIn = '';
                            if (!companyIn) companyIn = '';
                            if (!companyPasswordIn) companyPasswordIn = '';

                            var dataIn = {
                                SessionId: callLayerInterop.connectionId,
                                Operator: operatorIn,
                                OperatorPassword: operatorPasswordIn,
                                Company: companyIn,
                                CompanyPassword: companyPasswordIn,
                                ServerAddress: callLayerInterop.standaloneAddress,
                                SecondInstance: secondInstance,
                                OpenParameters: openParametersInput,
                            };

                            $.ajax({
                                url:
                                    callLayerInterop.standaloneAddress +
                                    callLayerInterop.renderMode +
                                    '/UXInteropWeb/CreateSession',
                                data: dataIn,
                                contentType: 'application/json; charset=utf-8',
                            })
                                .done(function(result) {
                                    if (!callLayerInterop.showValidationOutput(result)) {
                                        $('[id=loading-cover]').fadeOut();
                                    } else {
                                        // $(".fusion-current-account-name").text(result.UserNameFull);
                                        $('.fusion-logon-page-buttons').hide();
                                        $('.fusion-main-page-buttons').show();

                                        //Add toolbar-loaded class to fusion toolbar for Joe.
                                        $('#fusion-toolbar').addClass('toolbar-loaded');
                                        $('#logonForm').off('keypress');
                                        if (secondInstance === 'true') {
                                            $('.fusion-maininstance-buttons').hide();
                                        }
                                        $('a[href^=mailto],a[href^=tel]').click(function(evt) {
                                            sysproInterop.ignoreUnload = true;
                                        });
                                        //Next set the onbefore unload for prompting for the close.
                                        window.onbeforeunload = function() {
                                            if (!sysproInterop.ignoreUnload) {
                                                sysproInterop.closeSYSPROFusion();
                                                //Only prompt if the user is in an Entry/Setup Screen
                                                var IsInEntryScreenPrompt = null;
                                                if (
                                                    sysproInterop.isInEntryScreen === 'ENTRY' ||
                                                    sysproInterop.popupDialogOpened
                                                )
                                                    IsInEntryScreenPrompt =
                                                        'Are you sure you want to close SYSPRO Fusion? All unsaved changes will be lost.';

                                                return IsInEntryScreenPrompt;
                                            }
                                        };
                                        window.onunload = function() {
                                            if (!sysproInterop.ignoreUnload) {
                                                callLayerInterop.sessionId = null;
                                                //Should do close SYSPRO here but not reliable because of Signal disconnecting.
                                            }
                                            sysproInterop.ignoreUnload = false;
                                        };
                                        console.log('Session Created: ' + result.DataOut);
                                        if (result.DataOut) {
                                            callLayerInterop.sessionId = result.DataOut;
                                        } else {
                                            $('[id=loading-cover]').fadeOut();
                                        }
                                    }
                                    console.log('Create Session complete');
                                    // sysproInterop.callFromSYSPRO(result.MethodName, result.DataOut);
                                })
                                .fail(function(ex) {
                                    console.log('Create Session failed');
                                    $('[id=loading-cover]').fadeOut();
                                    console.log('error - ' + ex.message);
                                    if (!ex.message) {
                                        ex.message =
                                            'Creation of the users session fail. Server not found at: ' +
                                            callLayerInterop.standaloneAddress;
                                    }
                                    sysproInterop.showErrorMessage(ex.message);
                                })
                                .always(function() {
                                    console.log('Create Session always');
                                    callLayerInterop.validationInProgress = false;
                                });
                        })
                        .always(function() {
                            if (!ConnectSucceed) {
                                callLayerInterop.validationInProgress = false;
                                $('[id=loading-cover]').fadeOut();
                                sysproInterop.showErrorMessage('Server sockets connection failed.');
                                console.log('Connect Finished: validationInProgress false');
                            }
                        });
                }
            }
        }
    },

    callLayerWithData: function(dataIn, synchronous) {
        if (callLayerInterop.interopType === 'SYSPRORehostedBrowser') {
            var serializedData = JSON.stringify(dataIn);
            //Calls into the script interop layer of browser.
            try {
                window.external.callFromScript(serializedData);
            } catch (ex) {
                console.log('SYSPRORehostedBrowser window.external.callFromScript: ' + ex.message);
            }
        } else if (callLayerInterop.interopType === 'StandaloneBrowser') {
            if (dataIn.Operation === 'logMessage') {
                //console.log(dataIn.AdditionalField1);
            } else {
                // $("#loading-cover").fadeIn();
                //dataIn.SessionId = callLayerInterop.sessionId;
                //This would do an ajax call to our server with rehosted OWIN as comms.

                if (!dataIn.KeyFieldValue) dataIn.KeyFieldValue = '';
                if (!dataIn.AdditionalField1) dataIn.AdditionalField1 = '';
                var avantiPlugin = '';
                //for popupDialogButtonClicked don't call from the plugin because Avanti must release the thread first.
                if (
                    dataIn.Operation === 'eventTrigged' &&
                    dataIn.AdditionalField1 !== 'invocationCallback' &&
                    dataIn.AdditionalField1 !== 'popupDialogButtonClicked' &&
                    dataIn.AdditionalField1.indexOf('PLUGIN|') !== 0
                ) {
                    //dataIn.AdditionalField1 = "PLUGIN|" + callLayerInterop.avantiPluginLoaded + "|" + dataIn.AdditionalField1;
                    //Rather use the header to pass the plugin through. Hoping this still works as expected. Is cleaner at least.
                    avantiPlugin = callLayerInterop.avantiPluginLoaded;
                }

                if (!dataIn.AdditionalField2) dataIn.AdditionalField2 = '';
                if (!dataIn.AdditionalField3) dataIn.AdditionalField3 = '';
                if (!dataIn.AdditionalField4) dataIn.AdditionalField4 = '';
                var useAsync = true;
                if (synchronous) {
                    useAsync = false;
                }
                $.ajax({
                    url:
                        callLayerInterop.standaloneAddress +
                        callLayerInterop.renderMode +
                        '/UXInteropWeb/CallFromScript',
                    type: 'POST',
                    headers: {
                        SessionId: callLayerInterop.sessionId,
                        AvantiPlugin: avantiPlugin,
                    },
                    data: dataIn,
                    async: useAsync,
                    // contentType:"application/json; charset=utf-8",
                })
                    .done(function(result) {
                        sysproInterop.callFromSYSPRO(result.MethodName, result.DataOut);
                    })
                    .fail(function(ex) {
                        console.log('error');
                    })
                    .always(function() {
                        //  console.log("complete");
                    });
            }
        }
    },

    calledFromNative: function(callType, appNameIn, componentIn, keyFieldValue, dataIn) {
        //$("#loading-cover").fadeOut();
        sysproInterop.callFromSYSPRO(callType, appNameIn, componentIn, keyFieldValue, dataIn);
    },
    selectFile: function(callbackMethod, errorcallbackMethod, fileTypes) {
        if (callLayerInterop.interopType === 'SYSPRORehostedBrowser')
            sysproInterop.genericCall(
                'selectFile',
                fileTypes,
                '',
                '',
                '',
                '',
                '',
                '',
                callbackMethod,
                errorcallbackMethod
            );
        else if (callLayerInterop.interopType === 'StandaloneBrowser') {
            try {
                //If  it's standalone then use the html5 file api.
                var fileSelector = document.createElement('input');
                fileSelector.setAttribute('type', 'file');
                var filterType = '';
                if (fileTypes === 'Images') filterType = 'image/*';
                else if (fileTypes === 'Documents') filterType = '.pdf, .docx, .doc, .xls, .xlsx';
                else if (fileTypes) filterType = fileTypes;
                fileSelector.setAttribute('accept', filterType);
                $(fileSelector).on('change', function(e) {
                    var files = e.target.files;

                    $.each(files, function(index) {
                        var reader = new FileReader();
                        var currentFile = this;
                        reader.onload = function(e) {
                            //e.target.result
                            //this.name
                            //file.type

                            console.log('File  Loaded:  ' + e.target.result);
                            var base64Content = e.target.result.substring(
                                e.target.result.indexOf(';base64,') + ';base64,'.length
                            );
                            console.log('File  name:  ' + currentFile.name);
                            var fileExtIn = currentFile.name.substr(currentFile.name.lastIndexOf('.'));

                            console.log('File  type:  ' + fileExtIn);
                            // public String FilePath { get; set; }
                            //public String FileExt { get; set; }
                            //public String FileBase64 { get; set; }
                            //public String ErrorMessage { get; set; }
                            var fileOut = {
                                FilePath: currentFile.name,
                                FileExt: fileExtIn,
                                FileBase64: base64Content,
                                ErrorMessage: '',
                            };
                            callbackMethod(fileOut);
                        };

                        reader.readAsDataURL(this);
                    });
                });
                fileSelector.click();
            } catch (ex) {
                errorcallbackMethod(ex);
            }
        }
    },
    openFile: function(callbackMethod, errorcallbackMethod, fileUrl, fileName, print) {
        if (callLayerInterop.interopType === 'SYSPRORehostedBrowser')
            sysproInterop.genericCall(
                'openFile',
                fileUrl,
                fileName,
                '',
                '',
                '',
                '',
                '',
                callbackMethod,
                errorcallbackMethod
            );
        else if (callLayerInterop.interopType === 'StandaloneBrowser') {
            try {
                var fileUrl =
                    callLayerInterop.standaloneAddress +
                    'api/UXFileProviderWeb/GetUploadedFile?SessionId=' +
                    callLayerInterop.sessionId +
                    '&FileId=' +
                    fileUrl;
                var windowOpened = window.open(fileUrl, fileName);
                if (print && windowOpened) {
                    windowOpened.focus();
                    windowOpened.print();
                }
            } catch (ex) {
                errorcallbackMethod(ex);
            }
        }
    },
    callFusionService: function(urlIn, dataIn, callType, callbackMethod, errorcallbackMethod) {
        $.ajax({
            url: callLayerInterop.standaloneAddress + urlIn,
            type: callType,
            headers: {
                SessionId: callLayerInterop.sessionId,
                AvantiPlugin: callLayerInterop.avantiPluginLoaded,
            },
            data: dataIn,
            crossDomain: true,
        })
            .done(function(data) {
                if (callbackMethod) callbackMethod(data);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                if (errorcallbackMethod) errorcallbackMethod(errorThrown);
            });
    },
};

function formatnumber(value) {
    return kendo.toString(parseFloat(value), 'n');
}

$(window).bind('resizeEnd', function(e) {
    console.log('---------------------------------------------------------------------resizeEnd');
    sysproInterop.resizeSparklines();
});

$(window).load(function(e) {
    sysproInterop.createKendoBinders();
    sysproInterop.subscribeToFieldEvents();
});

//callLayerInterop.intializeInteropLayer("SYSPRORehostedBrowser");

function WebView_Predictive_Search_Template(subCategory) {
    var stringTemplate = '<div class="text-complete syspro-predictivesearch-container">';
    stringTemplate =
        stringTemplate +
        '<div class="syspro-predictivesearch-item syspro-predictivesearch-image-container"><img src=" ' +
        subCategory.Image +
        '" class="syspro-predictivesearch-image" onerror="this.style.display = \'none\'"></img></div>';
    stringTemplate =
        stringTemplate + '<div class="syspro-predictivesearch-item"><strong>' + subCategory.Id + '</strong>';
    if (subCategory.Description)
        stringTemplate =
            stringTemplate + '<div class="sys-400 sys-txt-md"><strong>' + subCategory.Description + '</strong></div>';
    if (subCategory.AdditionalField1)
        stringTemplate = stringTemplate + '<div class="sys-400 sys-txt-md">' + subCategory.AdditionalField1 + '</div>';
    if (subCategory.AdditionalField2)
        stringTemplate = stringTemplate + '<div class="sys-400 sys-txt-md">' + subCategory.AdditionalField2 + '</div>';
    if (subCategory.AdditionalField3)
        stringTemplate = stringTemplate + '<div class="sys-400 sys-txt-md">' + subCategory.AdditionalField3 + '</div>';
    stringTemplate = stringTemplate + '</div></div>';
    // return '<div class="textComplete sys-pd-off"><img src=" ' + subCategory.DataField2 + '" style="width:25px; height:25px"></img>  ' + subCategory.Key + "<br><div class='sys-200 sys-txt-sm'> Title: " + subCategory.DataField1 + '</div></div>';
    return stringTemplate;
}

function OpenMenuScreen() {
    if (callLayerInterop.menuHtml) {
        $('#harness-container').html('');
        $('#harness-container').html(callLayerInterop.menuHtml);
        $('body')[0].setAttribute('data-column-layout', callLayerInterop.menuDetail);
        $('[id=loading-cover]').fadeOut();
        queryLayoutUIHelpers.initializeViewOnly();
        queryLayoutUIHelpers.initializeToolbarEvents();
        sysproInterop.viewModel = null;
        sysproInterop.toolbarModel = null;
    }
}
