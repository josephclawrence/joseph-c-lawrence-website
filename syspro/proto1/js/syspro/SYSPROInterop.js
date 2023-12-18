
function sysproInteropFunction(argument) {
    return eval(argument);
}

function sysproInteropSparklineSeriesClick(e) {
    sysproInterop.sparklineSeriesClick(e);
}


var sysproInterop = {
    version: "000",
    threadedCallbackIndexToUse: 0,
    threadedCallbacksLookup: {},
    bindingStarted: null,
    bindingCompleted: null,
    viewModel: null,
    setAvailableFields: null,
    errorHandler: "Internal",
    internalHistoryIndex: 0,
    internalHistoryChange: 0,
    decimalCharacter: ".",
    thousandSeperator: ",",
    harmonyEnabled: false,
    harmonyAddress: "",
    generateUUID:  function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    },
    showSmartTag:  function(tag)
    {
        try {
            var dataValue = tag.dataset.fieldvalue;
            var dataCaption = tag.dataset.fieldcaption;
            var dataName = tag.dataset.fieldname;
            //If  the field  name is blank  then use the field name because a  card might not have it.
            if (!dataName)
                dataName = dataCaption;
            sysproInterop.eventTrigged("", dataCaption, dataValue, dataName, "showSmartTag", function (e) { }, function (e) { });
        } catch (ex) {
            sysproInterop.handleError(ex.message, "showSmartTag");
        }
    },
    openLink: function (tag) {
        try {
            var dataValue = tag.dataset.fieldvalue;
            var dataCaption = tag.dataset.keyaction;
            //alert("openLink - " + dataCaption+"-"+ dataValue);
            sysproInterop.eventTrigged("", dataCaption, dataValue, "", "openLink", function (e) { }, function (e) { });
        } catch (ex) {
            sysproInterop.handleError(ex.message, "openLink");
        }
    },
    getData: function (appNameIn, keyField, keyFieldValue, finalParameter, callbackMethod, errorcallbackMethod) {
        try
        {
        var NativeCallDataIn = {
            Operation: "getData",
            Application: appNameIn,
            KeyField: keyField,
            KeyFieldValue: keyFieldValue,
            FinalParameter: finalParameter,
            AdditionalField1: "",
            AdditionalField2: "",
            AdditionalField3: "",
            CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
            CallbackMethod: "sysproInterop.interopCallbackReceived"
        }

        sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] =
       {
           Success: callbackMethod,
           Error: errorcallbackMethod
       };
        while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
            sysproInterop.threadedCallbackIndexToUse++;
        }
        callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
        catch (ex) {
            sysproInterop.handleError(ex.message, "getData");
        }

    },
    eventTrigged: function (appNameIn, keyField, keyFieldValue, finalParameter, buttonClicked, callbackMethod, errorcallbackMethod) {
        try
        {
        var NativeCallDataIn = {
            Operation: "eventTrigged",
            Application: appNameIn,
            KeyField: keyField,
            KeyFieldValue: keyFieldValue,
            FinalParameter: finalParameter,
            AdditionalField1: buttonClicked,
            AdditionalField2: "",
            AdditionalField3: "",
            CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
            CallbackMethod: "sysproInterop.interopCallbackReceived"
        }

        sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] =
       {
           Success: callbackMethod,
           Error: errorcallbackMethod
       };
        while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
            sysproInterop.threadedCallbackIndexToUse++;
        }
        callLayerInterop.callLayerWithData(NativeCallDataIn);
    }
        catch (ex) {
            sysproInterop.handleError(ex.message, "eventTrigged");
}

    },
    genericCall: function (Operation, appNameIn, keyField, keyFieldValue, finalParameter, additionalField1, additionalField2, additionalField3, callbackMethod, errorcallbackMethod) {
        try
        {
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
            CallbackMethod: "sysproInterop.interopCallbackReceived"
        }


        sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] =
       {
           Success: callbackMethod,
           Error: errorcallbackMethod
       };
        while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
            sysproInterop.threadedCallbackIndexToUse++;
        }
        callLayerInterop.callLayerWithData(NativeCallDataIn);
    }
        catch (ex) {
            sysproInterop.handleError(ex.message, "genericCall - " + Operation);
}
    },


    logMessage: function (appNameIn, keyField, keyFieldValue, finalParameter, message) {
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
        }

        callLayerInterop.callLayerWithData(NativeCallDataIn);

    },

    getModel: function (modelId, callbackMethod, errorcallbackMethod) {
        try{
        var NativeCallDataIn = {
            Operation: "getModel",
            Application: "",
            KeyField: modelId,
            KeyFieldValue: "",
            FinalParameter: "",
            AdditionalField1: "",
            AdditionalField2: "",
            AdditionalField3: "",
            CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
            CallbackMethod: "sysproInterop.interopCallbackReceived"
        }

        sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] =
         {
             Success: callbackMethod,
             Error: errorcallbackMethod
         };
        while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
        
            sysproInterop.threadedCallbackIndexToUse++;
        }
        callLayerInterop.callLayerWithData(NativeCallDataIn);

    }
        catch (ex) {
            sysproInterop.handleError(ex.message, "getModel");
}
    },

    //SubType, ParentDisplayStyle, ParentBorderClass
    getHtmlFromModel: function (modelType, modelIn, callbackMethod, parentParameter1, parentParameter2, parentParameter3, errorcallbackMethod) {
        try
        {
        var NativeCallDataIn = {
            Operation: "getHtmlFromModel",
            Application: "",
            KeyField: modelType,
            KeyFieldValue: "",
            FinalParameter: JSON.stringify(modelIn),
            AdditionalField1: JSON.stringify(parentParameter1),
            AdditionalField2: JSON.stringify(parentParameter2),
            AdditionalField3: JSON.stringify(parentParameter3),
            CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
            CallbackMethod: "sysproInterop.interopCallbackReceived"
        }

        sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] =
         {
             Success: callbackMethod,
             Error: errorcallbackMethod
         };
        while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
            sysproInterop.threadedCallbackIndexToUse++;
        }
        callLayerInterop.callLayerWithData(NativeCallDataIn);
    }
        catch (ex) {
            sysproInterop.handleError(ex.message, "getHtmlFromModel");
}
    },
    setAvailableFieldsInternal: function (dataIn) {

        try {
        console.log("setAvailableFieldsInternal: " + dataIn);
        if (sysproInterop.setAvailableFields) {
            sysproInterop.setAvailableFields(JSON.parse(dataIn));
        }
    }
        catch (ex) {
            sysproInterop.handleError(ex.message, "setAvailableFieldsInternal");
}
    },
    getVisualBuilderLayout: function()
    {
        try {
            console.log("getVisualBuilderLayout");

            if (SYSPRO_VB) {
                //When SYPPRO requests the layout , it  is  to  save so make sure unsaved changes are reset here.
                sysproInterop.internalHistoryIndex = SYSPRO_VB.historyIndex;
                sysproInterop.internalHistoryChange = 0;
            }
        var columnContent = { Columns: viewModel.dataSource.data() };
        return JSON.stringify(columnContent);
    }
        catch (ex) {
            sysproInterop.handleError(ex.message, "getVisualBuilderLayout");
}
    },
    setVisualBuilderLayout: function (DataIn) {
        try
        {
        console.log("setVisualBuilderLayout");
        viewModel.dataSource.data(DataIn);
        }
        catch (ex) {
            sysproInterop.handleError(ex.message, "setVisualBuilderLayout");
        }
    },
    getUnsavedChanges: function (DataIn) {
        try {
            console.log("getUnsavedChanges");
            var ChangesToSave = "false";
            //If the history index is different from the internal one or changes have been undone or redone then there are changes to save.
            if (SYSPRO_VB && (SYSPRO_VB.historyIndex != sysproInterop.internalHistoryIndex) || (sysproInterop.internalHistoryChange !== 0)) {
                ChangesToSave = "true";
            }
            return ChangesToSave;
        }
        catch (ex) {
            sysproInterop.handleError(ex.message, "getUnsavedChanges");
        }
    },
    undoCalled: function (DataIn) {
        try {
            console.log("undoCalled");
            sysproInterop.internalHistoryChange = sysproInterop.internalHistoryChange + 1;
        }
        catch (ex) {
            sysproInterop.handleError(ex.message, "undoCalled");
        }
    },
    redoCalled: function (DataIn) {
        try {
            console.log("redoCalled");
            sysproInterop.internalHistoryChange = sysproInterop.internalHistoryChange - 1;
        }
        catch (ex) {
            sysproInterop.handleError(ex.message, "redoCalled");
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
    queryForCard: function (cardType, businessObject, keyValue, callbackMethod, errorcallbackMethod) {
        try {
        var NativeCallDataIn = {
            Operation: "queryForCard",
            Application: "",
            KeyField: cardType,
            KeyFieldValue: JSON.stringify(keyValue),
            FinalParameter: businessObject,
            AdditionalField1: "",
            AdditionalField2: "",
            AdditionalField3: "",
            CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
            CallbackMethod: "sysproInterop.interopCallbackReceived"
        }

        sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] =
          {
              Success: callbackMethod,
              Error: errorcallbackMethod
          };
        while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
            sysproInterop.threadedCallbackIndexToUse++;
        }
        callLayerInterop.callLayerWithData(NativeCallDataIn);
    }
catch(ex)
{
    sysproInterop.handleError(ex.message, "queryForCard");
}
    },
    interopCallbackReceived: function (e) {
     
try{        var itemOut = {};
    try {
        
        itemOut = JSON.parse(e.OutputData);
   

    } catch (ex) {
    
            itemOut.ErrorMessage = ex.message;
        }
        if (sysproInterop.threadedCallbacksLookup[e.CallbackIndex]) {
            if (!itemOut)
            {
                itemOut = {};
                itemOut.ErrorMessage = "A blank reply was received from the call.";
            }
            if (itemOut.ErrorMessage)
            {
                //If it is an ErrorMessage then trigger the error callback instead.
                if (sysproInterop.threadedCallbacksLookup[e.CallbackIndex].Error)
                    sysproInterop.threadedCallbacksLookup[e.CallbackIndex].Error(itemOut);
            } else
            {
                console.log("interopCallbackReceivedPreCall" + JSON.stringify(sysproInterop.threadedCallbacksLookup[e.CallbackIndex]));
                if (sysproInterop.threadedCallbacksLookup[e.CallbackIndex].Success)
                    sysproInterop.threadedCallbacksLookup[e.CallbackIndex].Success(itemOut);
            }
            sysproInterop.threadedCallbacksLookup[e.CallbackIndex] = null;
            sysproInterop.threadedCallbackIndexToUse = e.CallbackIndex;
        }
    }
catch(ex)
{
    console.log("interopCallbackReceivedERROR" + JSON.stringify(sysproInterop.threadedCallbacksLookup[e.CallbackIndex]));
    sysproInterop.handleError(ex.message, "interopCallbackReceived");
}
       
    },
    getAvailableFields: function (callbackMethod, errorcallbackMethod, nocategories) {
        try {
            if (!nocategories)
                nocategories = "false";
            else
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
                CallbackIndex: sysproInterop.threadedCallbackIndexToUse,
                CallbackMethod: "sysproInterop.interopCallbackReceived"
            }

            sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse] =
                {
                    Success: callbackMethod,
                    Error: errorcallbackMethod
                };
            while (sysproInterop.threadedCallbacksLookup[sysproInterop.threadedCallbackIndexToUse]) {
                sysproInterop.threadedCallbackIndexToUse++;
            }
            callLayerInterop.callLayerWithData(NativeCallDataIn);
        }
catch(ex)
        {
    sysproInterop.handleError(ex.message, "getAvailableFields");
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
    getIconsAvailable: function (callbackMethod, errorcallbackMethod) {
        try {
            sysproInterop.genericCall("getIconsAvailable", "", "", "", "", "", "", "", callbackMethod, errorcallbackMethod)
        }
        catch (ex) {
            sysproInterop.handleError(ex.message, "getIconsAvailable");
        }
    },
    queryForTiles: function (listOfTiles, keyFieldData, businessObject, callbackMethod, errorcallbackMethod) {
        try {
            sysproInterop.genericCall("queryForTiles", JSON.stringify(listOfTiles), businessObject,  JSON.stringify(keyFieldData), "", "", "", "", callbackMethod, errorcallbackMethod)
        }
        catch (ex) {
            sysproInterop.handleError(ex.message, "queryForTiles");
        }
    },
    callHarmonyService: function (callType, methodName, parametersIn, callbackMethod, errorcallbackMethod) {
        try {{}
            var parametersRaw;
            if (callType === "GET")
            {
                parametersRaw = $.param(parametersIn);
            } else
            {
                parametersRaw =  JSON.stringify(parametersIn);
            }
            sysproInterop.genericCall("callHarmonyService", "", callType, methodName, parametersRaw, "", "", "", callbackMethod, errorcallbackMethod)
        }
        catch (ex) {
            sysproInterop.handleError(ex.message, "callHarmonyService");
        }
    },
    callFromSYSPRO: function (callType, dataIn) {
        try
        {
            //console.log("callFromSYSPRO - " + callType + " : " + dataIn);
            //These define any methods supported that can be called from SYSPRO.
            switch (callType) {
                case "bindDataTo":

                    sysproInterop.bindDataTo(JSON.parse(dataIn));
                    break;
                case "setAvailableFields":

                    sysproInterop.setAvailableFieldsInternal(JSON.parse(dataIn));
                    break;
                case "getVisualBuilderLayout":
                    return sysproInterop.getVisualBuilderLayout();

                    break;
                case "setVisualBuilderLayout":
                    sysproInterop.setVisualBuilderLayout(JSON.parse(dataIn));

                    break;
                case "getUnsavedChanges":
                    return sysproInterop.getUnsavedChanges();
                    break;
                case "executeScript":
                    eval(dataIn);
                    break;
                default:

            }
        }catch(ex)
        {
            sysproInterop.handleError(ex.message, "callFromSYSPRO");
        }
    },

    showPopup: function (text) {
        alert(text);
    },

    handleError: function (error, parentMethod) {
        if (sysproInterop.errorHandler === "Popup")
            //This just alerts errors  for  easy debugging.
            sysproInterop.showPopup("Error: " + parentMethod + " - " + error);
        else if (sysproInterop.errorHandler === "Log")
            console.log("Error: " + parentMethod + " - " + error);
        else if (sysproInterop.errorHandler === "Internal") {
            //This should set an html element to show it inline.
            var fullErrorMessage = "Sorry, something has gone wrong when trying to  '" + parentMethod + "'. The technical error message is:";
            if (parentMethod === "CleanError") {
                //TODO: In the future we could adjust this to show a warning or info message instead of an error.
                if (error)
                    error = error.substring(7);

                fullErrorMessage = error;
                error = "";
            }
            SYSPRO_VB.showErrorMessage(error, fullErrorMessage);
        }
    },

    bindDataTo: function (dataModelIn) {
        try {
            console.log("bindDataTo");
            //alert("bindDataTo");
            if (sysproInterop.bindingStarted) {
                sysproInterop.bindingStarted(dataModelIn);
            }

            var itemOut = {};
            try {
                itemOut = JSON.parse(dataModelIn.DataIn);
            } catch (ex) {
                itemOut.ErrorMessage = ex.message;
            }

            sysproInterop.performBind(itemOut);
           
            if (sysproInterop.bindingCompleted) {
                sysproInterop.bindingCompleted(itemOut);
            }
        } catch (ex) {
            
            sysproInterop.handleError(ex.message, "bindDataTo");
        }
    },
    performBind: function (itemIn, fullBind, prefixSelector, selectorItem) {
        try {
            console.log("performBind");
            if (!prefixSelector)
            {
                prefixSelector = "";
            }
            //alert("bindDataTo");
            //Next set the kendo  environment settings
            if (kendo && kendo.culture()) {
                kendo.culture().numberFormat["."] = sysproInterop.decimalCharacter;
                kendo.culture().numberFormat[","] = sysproInterop.thousandSeperator;
            }
            var itemOut = itemIn;
            if (itemOut && !itemOut.ErrorMessage) {
                //For now all the bind does set a label value.
                //Will be expanded to use Kendo binding

                var BoundItemDiv = $(prefixSelector + " .sys-widget:not(.card-widget,.harmony-widget,.tile-widget,.tile-inner)", selectorItem);


                if (sysproInterop.viewModel && !fullBind) {
                    //Just in case fields is not given then go through Parents
                    if (itemOut.Fields) {
                        $.each(itemOut.Fields, function (key, value) {
                            // console.log("performBind - " + key);
                            if (key !== "SYSPROKeyData") {
                                sysproInterop.viewModel.Fields.set(key, this);
                            } 
                        });
                    
                        //alert(JSON.stringify(itemOut.Fields.SYSPROKeyData));
                    //    alert(itemOut.Fields.SYSPROKeyData.length);
                                if (itemOut.Fields.SYSPROKeyData)
                        {
                                    if (!sysproInterop.viewModel.Fields.SYSPROKeyData) {
                                        sysproInterop.viewModel.Fields.set("SYSPROKeyData", {});
                                    }
                                    $.each(itemOut.Fields.SYSPROKeyData, function (key2, value2) {

                                       // 
                                        
                                        sysproInterop.viewModel.Fields.SYSPROKeyData.set(key2, value2);
                                    });
                        }
                    
                    }
                    else {
                        //This  is  legacy and should  not  happen.
                        alert("This  is  legacy and should  not  happen");
                        $.each(itemOut, function (key, value) {
                           // console.log("performBind - " + key);
                            sysproInterop.viewModel.set(key, this);
                        });
                    }

                } else {
                    console.log("Full Bind");
                    sysproInterop.viewModel = kendo.observable(itemOut);
                    console.log("Full Bind 0");
                    kendo.bind(BoundItemDiv, sysproInterop.viewModel);
                    console.log("Full Bind 1");

                }

                //After a data bind, process all chharts, hiding any series that are blank.
                $(prefixSelector + " .sparkline-widget", selectorItem).each(function (index) {
                    sysproInterop.hideShowSparklineSeries($(".sparkline-widget-chart", $(this)));
                });


            //Finally bind any cards in the screen
                if (itemOut.SYSPROKeyData || itemOut.Fields.SYSPROKeyData || itemOut.Fields.SYSPROKeyData === "") {
                    //Only bind the cards if the SYSPRO Key Data is given because it has changed.
                    console.log("Binding Cards");
            
                    $.each($(prefixSelector + " .card-bindable:not(.harmony-widget,.tile-widget)", selectorItem), function (index) {
                        console.log("card-bindable: " +  index); 
                        sysproInterop.bindGenericCard($(this), itemOut.Fields.SYSPROKeyData);
                    });
                    if (sysproInterop.harmonyEnabled) {
                        $.each($(prefixSelector + " .harmony-widget", selectorItem), function (index) {
                            console.log("harmony-widget: " + index);
                            //Call harmonyInterop
                            HarmonyInterop.bindWidget($(this), itemOut.Fields.SYSPROKeyData);
                        });
                    }
                    //Next Bind any tile widgets
                    //First Populate a list of all tiles in use.
                    var listOfTiles = [];
                    $.each($(prefixSelector + " .tile", selectorItem), function (index) {
                        var tileName = $(this).data("tiletypedetail");
                        //Only add it  if it  doesn't  exist.
                        if (tileName && listOfTiles.indexOf(tileName) === -1)
                            listOfTiles.push(tileName);
                    });
                    //OOnly try query for tiles, if there  is  at least one item to query.
                    if (listOfTiles.length > 0) {
                        //Now call  the interop with the list of tiles   to get the data.
                        sysproInterop.queryForTiles(listOfTiles, itemOut.Fields.SYSPROKeyData, "COMQTL", function (result) {
                            //Now Loop  through all tile-widget's  and bind the master widget to  it.
                            $.each($(prefixSelector + " .tile-widget", selectorItem), function (index) {
                                console.log("harmony-widget: " + index);
                                //Call bind of the tiles
                                var TilesInput = kendo.observable(result);
                                kendo.bind($(this), TilesInput);
                            });
                        },
                        function (result) {
                            try {
                                //If the query for the card fails with an error message processed then it can be outputted  as a clean error.
                                sysproInterop.handleError(result.ErrorMessage, "CleanError");
                            } catch (ex) {
                                sysproInterop.handleError(ex.message);
                            }
                        }

                )
                    }

            }
            } else {
                if (!itemOut) {
                    console.log("performBind ignored because of blank input data.");
                }else
                {
                    sysproInterop.handleError(itemOut.ErrorMessage, "performBind");
                }
            }
        } catch (ex) {

            sysproInterop.handleError(ex.message, "performBind");
        }
    },
    bindGenericCard: function (cardDiv, dataChanged) {
        try{
        console.log("bindGenericCard");

      //  var boundCardDiv = $("#carddatabind_" + modelId);

        //console.log("boundCardDiv - " + cardDiv.closest(".layout-widget").siblings("span").html());
        var cardWidgetHolder = cardDiv.closest(".card-widget");
        var cardType = cardWidgetHolder.data("cardtype");
        var cardTypeDetail = cardWidgetHolder.data("cardtypedetail");
        var parentFieldPath = cardWidgetHolder.data("parentfieldpath");
        var keyFieldName = cardTypeDetail;
        var cardkeyvalue = "";
            //Only perform  a query for the card if the value  has changed.
            //TODO:  This needs  to rather check the keyfield after  SYSPROKeyData and bind to that.
        console.log("bindGenericCard 01: " + parentFieldPath);
            if (parentFieldPath) {
                var cardkeyHolder = sysproInterop.viewModel.toJSON();

                var splitFields = parentFieldPath.split(".");
                var previousValue = keyFieldName;
                $.each(splitFields, function (index) {
                    // console.log("splitFields - " + this);
                    
                    if (cardkeyHolder) {
                        if (cardkeyHolder[this]) {
                            cardkeyHolder = cardkeyHolder[this];
                            //Always use the second last value as  the keyfield
                            keyFieldName = previousValue;
                        }
                        else {
                            cardkeyHolder = null;


                        }
                    }
                    previousValue = this;
                });

                cardkeyvalue = cardkeyHolder;
                
                console.log("keyFieldName - " + keyFieldName);
                console.log("cardkeyvalue - " + cardkeyvalue);
            }
            if (dataChanged[keyFieldName]) {
                console.log("bindGenericCard 02: " + dataChanged[keyFieldName]);
               // alert("dataChanged - "+keyFieldName);
            //$("#LogDiv").text("cardkeyvalue: " + cardkeyvalue + "- " + parentFieldPath);
            //Only bind the card if it has a key value or it is a dashboard so parentFieldPath is blank  or contains insights.
            if (cardkeyvalue || !parentFieldPath || parentFieldPath.indexOf("Insights") > -1) {
                sysproInterop.queryForCard(cardType, cardTypeDetail, cardkeyvalue, function (result) {
                    try {
                        console.log("bindGenericCard 03: "+result);
                        var boundCard = kendo.observable(result);
                        kendo.bind(cardDiv, boundCard);
                    } catch (ex) {
                        sysproInterop.handleError(ex.message, "bindGenericCard binding callback");
                    }
                },
                function (result) {
                    try {
                        //If the query for the card fails with an error message processed then it can be outputted  as a clean error.
                        sysproInterop.handleError(result.ErrorMessage, "CleanError");
                    } catch (ex) {
                        sysproInterop.handleError(ex.message);
                    }
                });
            }
        }
    }catch(ex)
{
        sysproInterop.handleError(ex.message, "bindGenericCard");
}
    },
    
    resizeSparklines:  function()
    {
        try{
        $.each($(".sparkline-widget-chart:visible"), function (index) {
            var chartSelected = $(this);
          

            if (chartSelected.data("kendoChart")) {

                var chartItem = chartSelected.data("kendoChart");

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
            
                    sysproInterop.hideShowSparklineSeries(chartSelected, chartItem);
            }
        });
    }catch(ex)
{
        sysproInterop.handleError(ex.message, "resizeSparklines");
}
    },
    //Process and redraw sparklines to make  sure  the series are  shown and  hidden correctly. (If  series seem squashhed  or  blank series  are  shown then the bug is in here!)
    hideShowSparklineSeries: function (sparklineContainer, chart) {
        try
        {
            var refreshrequired = true;
            console.log("hideShowSparklineSeries");
            if (sparklineContainer && sparklineContainer.length > 0) {
                if (!chart) {
                    refreshrequired = false;
                    //sparklineContainer = $(".sparkline-widget-chart", $(sparklineContainer));
                    chart = sparklineContainer.data("kendoChart");

                }
                if (!chart) {  //If no chart is  initialized yet then try initialize  it.
                    kendo.bind(sparklineContainer.closest(".layout-widget"), sysproInterop.viewModel);
                    chart = sparklineContainer.data("kendoChart");
                }
                if (chart) {
                    if (sparklineContainer.closest(".sparkline-widget").length > 0) {
                        //If  it has  a parent sparkline  widget then it has visibility options that need  to be set up.
                        //Now get the databound visibility of the series and the names and set  them because Kendo does not  support doing this dynamically.
                        var sparklineWidget = sparklineContainer.closest(".sparkline-widget")[0];

                        var series1visible = sparklineWidget.dataset.series1visible === "true";
                        var series2visible = sparklineWidget.dataset.series2visible === "true";
                        var series3visible = sparklineWidget.dataset.series3visible === "true";
                        var series4visible = sparklineWidget.dataset.series4visible === "true";
                        var series1name = sparklineWidget.dataset.series1name;
                        var series2name = sparklineWidget.dataset.series2name;
                        var series3name = sparklineWidget.dataset.series3name;
                        var series4name = sparklineWidget.dataset.series4name;

                        chart.options.series[0].visible = series1visible;
                        chart.options.series[1].visible = series2visible;
                        chart.options.series[2].visible = series3visible;
                        chart.options.series[3].visible = series3visible;
                        //Only change the chart name if series1name has  a value.
                        if (series1name && series1name !== undefined && series1name !== 'undefined')
                            chart.options.series[0].caption = series1name;

                        chart.options.series[1].caption = series2name;
                        chart.options.series[2].caption = series3name;
                        chart.options.series[3].caption = series3name;
                    }
                    if (refreshrequired) {
                        chart.refresh();
                    } else {
                        chart.redraw();
                    }
                }
            }
        }catch (ex)
        {
            sysproInterop.handleError(ex.message, "hideShowSparklineSeries");
        }
    },
   
    sparklineSeriesClick: function(e)
    {
        try {
            sysproInterop.eventTrigged(e.series.name, e.series.data.indexOf(e.dataItem), e.value, "", "sparklineSeriesClick", function (e) { }, function (e) { });
        } catch (ex) {
            sysproInterop.handleError(ex.message, "sparklineSeriesClick");
        }

    },

    iconSelected: function (e) {
        try {

            sysproInterop.eventTrigged(e.Name, e.Description, "", "", "iconSelected", function (e) { }, function (e) { });
        } catch (ex) {
            sysproInterop.handleError(ex.message, "iconSelected");
        }

    }



};

//The call layer interop decides on how to call into the native layer to get data and subscribe to events etc.
var callLayerInterop = {

    interopType: "SYSPRORehostedBrowser",
    // interopType: "StandaloneBrowser",

    intializeInteropLayer: function (interopTypeIn) {
     

        if (interopTypeIn) {
            callLayerInterop.interopType = interopTypeIn;
        }
        //Override console.log for debugging and logging purposes.
        if (callLayerInterop.interopType === "SYSPRORehostedBrowser") {
            console = {
                log: function (message) {
                    try {
                        sysproInterop.logMessage(null, null, null, null, JSON.stringify(message));
                    } catch (ex) {

                    }
                }
            }
        }
        else if (callLayerInterop.interopType === "StandaloneBrowser") {
            //If it's standalone subscibe to a SignalR for event propagation. //trigger calledFromNative from 
        }

    },

    callLayerWithData: function (dataIn) {

        if (callLayerInterop.interopType === "SYSPRORehostedBrowser") {
            var serializedData = JSON.stringify(dataIn);
            //Calls into the script interop layer of browser.
            try {
                window.external.callFromScript(serializedData);
            } catch (ex) {

            }
        }
        else if (callLayerInterop.interopType === "StandaloneBrowser") {

            if (dataIn.Operation === "logMessage") {
                //console.log(dataIn.AdditionalField1);
            } else {
                //This would do an ajax call to our server with rehosted OWIN as comms.
                if (!dataIn.AdditionalField1)
                    dataIn.AdditionalField1 = "";
                if (!dataIn.AdditionalField2)
                    dataIn.AdditionalField2 = "";
                if (!dataIn.AdditionalField3)
                    dataIn.AdditionalField3 = "";

                $.ajax({
                    url: "http://192.168.1.8/UXTools/api/UXInteropWeb/CallFromScript",
                    data: dataIn,
                    contentType:"application/json; charset=utf-8",

                }).done(function (result) {
                    sysproInterop.callFromSYSPRO(result.MethodName, result.DataOut);
                })
                .fail(function (ex) {
                    console.log("error");
                })
                .always(function () {
                    console.log("complete");
                });
            }
        }

    },

    calledFromNative: function (callType, appNameIn, componentIn, keyFieldValue, dataIn) {

        sysproInterop.callFromSYSPRO(callType, appNameIn, componentIn, keyFieldValue, dataIn);
    }
}

callLayerInterop.intializeInteropLayer("StandaloneBrowser");



function formatnumber(value)
{
    return kendo.toString(parseFloat(value), "n");
}

$(window).bind("resize", function (e) {
    sysproInterop.resizeSparklines();
});
