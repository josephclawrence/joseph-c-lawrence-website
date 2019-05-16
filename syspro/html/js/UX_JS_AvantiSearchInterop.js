var AvantiSearchInterop = {
    version: "000",
    AvantiSearchCOMFNDPlainXML: null,
    AvantiSearchCOMFNDEnteredTextPossition: null,
    ParentDiv: null,
    FilterCategoryNum: 0,
    FilterUIData: null,
    FilterKeyField: "",
    //This is a setting to apply the search filter when changes happen on the UI Filter.
    //By Default this flag is set to true.
    ApplySearchFilter: true,
    KeyFieldColumn: null,
    ActionColumnIndex: 0,
    SearchCallBackClicked: false,
    CustomSearch: false,
    KeyField: "",
    KeyFieldDesc: "",
    //DefaultWhereStatement: [],
    //Calls a business
    OpenSearch: function (KeyField, QueryString, Context1, Context2, SourceApp, CallBack, parentdiv) {

        try {
            console.log("00 - OpenSearch");

            //Set to default from the Entry field
            if (QueryString !== "") {
                $(".avanti-search-text-input").val(QueryString);
            }

            AvantiSearchInterop.ParentDiv = parentdiv;

            sysproInterop.callBusinessObject("query", "ESPQSC-CAT", "<Query><Key><KeyField>" + KeyField + "</KeyField></Key></Query>", "", function (result) {

                var ResultString = JSON.stringify(result);
                console.log(ResultString);

                if (!result.Query.Item.PrimaryTable) {

                    AvantiSearchInterop.KeyField = KeyField;
                    AvantiSearchInterop.KeyFieldDesc = AvantiSearchInterop.CamelCaseToSentence(KeyField);
                    sysproInterop.setModalWindowTitle(parentdiv + "|" + "Search " + AvantiSearchInterop.KeyFieldDesc);
                    AvantiSearchInterop.CustomSearch = true;

                    //Call the search component to bind with some default data
                    AvantiSearchInterop.BindSearchListInCard(KeyField, CallBack, null, null, AvantiSearchInterop.ParentDiv, 1000);
                }
                else {
                    AvantiSearchInterop.CustomSearch = false;
                    //
                    var replaced = ResultString.split('+').join('Plus');

                    console.log(replaced);

                    //Replace WindowTitle with KeyField description
                    if (result.Query.Item)
                        if (result.Query.Item.KeyFieldDesc) {
                            AvantiSearchInterop.KeyFieldDesc = result.Query.Item.KeyFieldDesc;
                            sysproInterop.setModalWindowTitle(parentdiv + "|" + "Search " + AvantiSearchInterop.KeyFieldDesc);
                        }

                    AvantiSearchInterop.FilterKeyField = KeyField;
                    AvantiSearchInterop.FilterUIData = result = JSON.parse(replaced);

                    AvantiSearchInterop.BindFiltersToCard(result, KeyField, CallBack);
                    //Make the filter scrollable and limit the height.
                    $(".avanti-base-class").css("overflow-y", "scroll");
                    $(".avanti-base-class").css("max-height", 460);
                }
            }, function (e) { console.log("error:" + e.ErrorMessage) }, true, false);

        } catch (e) {
            sysproInterop.handleError(e.message, "Avanti Open Search");
        }
    },

    //This is the initial binding and initialize method for the search card
    //If no keyFieldName is supplied, then the user select and change a keyfield on the UI
    //
    // Input:   keyFieldName    -> Key field, exp. StockCode
    //          ValueSelected   -> Method to call with the result
    BindSearchListInCard: function (keyFieldName, ValueSelected, Additional1, Additional2, AvantiSearchParentDivVar, RowsToReturn) {
        try {
            console.log("00 Reached binding method");
            if (!RowsToReturn)
                RowsToReturn = 50;

            if (AvantiSearchParentDivVar == null) {
                AvantiSearchParentDivVar = AvantiSearchParentDiv();
            }
            $(".search-loading-cover", AvantiSearchParentDivVar).show();
            $("#avanti-search-count-slider", AvantiSearchParentDivVar).attr("data-slider-max", RowsToReturn);
            //Hardcode rows to return to 50 first up
            var endValueToUse = 50;
            if (endValueToUse > RowsToReturn) {
                endValueToUse = RowsToReturn;
            }

            $("#avanti-search-count-slider", AvantiSearchParentDivVar).attr("data-slider-endvalue", endValueToUse);
            $("#avanti-search-count-slider-button", AvantiSearchParentDivVar).text(RowsToReturn);
            $(".avanti-search-count-slider")[0].noUiSlider.updateOptions({

                range: {
                    'min': 0,
                    'max': parseInt(RowsToReturn)
                }
            })

            if (keyFieldName) {
                //We already have a KeyField, start performing search
                AvantiSearchInterop.GetSearchAndPerform(keyFieldName, ValueSelected, Additional1, Additional2, AvantiSearchParentDivVar)
            }
            else {
                //Find all the Espresso Key fields and add to a combobox
                sysproInterop.callBusinessObject("query",
                    "ESPQRY",
                    "<Query><Key><FileType>KF</FileType></Key></Query>",
                    "",
                    function (result) {
                        KeyFields = [];
                        result.Query.KeyField.Row.forEach(function (item) {

                            KeyFields.push({ text: item.KeyFieldDesc, value: item.KeyFieldName });
                        }
                        )

                        $(".avanti-search-key-fields", AvantiSearchParentDivVar).kendoComboBox({
                            dataTextField: "text",
                            dataValueField: "value",
                            dataSource: KeyFields,
                            filter: "contains",
                            suggest: true,
                            footerTemplate: 'Total #: instance.dataSource.total() # items found',
                            select: function (e) {
                                if (e.item) {
                                    //First teardown the previous grid
                                    var CHANGE = 'change',
                                        $grid = $(".avanti-search-results-grid", AvantiSearchParentDivVar);


                                    // Unbind existing refreshHandler in order to re-create with different column set
                                    if ($grid.length > 0 && $grid.data().kendoGrid) {
                                        var thisKendoGrid = $grid.data().kendoGrid;

                                        if (thisKendoGrid.dataSource && thisKendoGrid._refreshHandler) {
                                            thisKendoGrid.dataSource.unbind(CHANGE, thisKendoGrid._refreshHandler);
                                            $grid.removeData('kendoGrid');
                                            $grid.empty();
                                        }
                                    }

                                    var dataItem = this.dataItem(e.item.index());
                                    console.log("event :: select (" + dataItem.text + " : " + dataItem.value + ")");
                                    var KeyFieldName = dataItem.value;
                                    //A KeyField has been selected, start performing search
                                    AvantiSearchInterop.GetSearchAndPerform(KeyFieldName, ValueSelected, Additional1, Additional2)
                                    $(".search-loading-cover", AvantiSearchParentDivVar).hide();

                                } else {
                                    //kendoConsole.log("event :: select");
                                }
                            }
                        });
                    },
                    function (e) { sysproInterop.handleError(e.ErrorMessage, "Avanti Search Get Key Fields"); }
                    , true, false);
            }

            console.log("99 Finished binding method");
        }
        catch (ex) {
            sysproInterop.handleError(ex.message, "Initializing Avanti Search");
        }
    },

    //Uses a KeyField and finds the appropiate COMFND search criteria
    GetSearchAndPerform: function (KeyFieldName, ValueSelected, Additional1, Additional2, AvantiSearchParentDivVar) {

        if (AvantiSearchInterop.CustomSearch) {
            //Hide filter window
            AvantiSearchInterop.ShowHideDefaulttext(true);
            //Hide slider control for now
            $("#avanti-search-count-slider").hide();

            var timer;

            //add enter event listener
            $(".avanti-search-text-input", AvantiSearchParentDivVar).off("input");
            $(".avanti-search-text-input", AvantiSearchParentDivVar).on("input", function () {
                //Add a 250ms delay, so avoid a call for every character typed
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function () {
                    AvantiSearchInterop.PerformSearch("", "", ValueSelected, "", AvantiSearchParentDivVar);

                }, 250);
            });
            $(".avanti-search-button", AvantiSearchParentDivVar).off("click");
            $(".avanti-search-button", AvantiSearchParentDivVar).on("click", function () { AvantiSearchInterop.PerformSearch("", "", ValueSelected, "", AvantiSearchParentDivVar); });

            AvantiSearchInterop.PerformSearch("", "", ValueSelected, "", AvantiSearchParentDivVar);
        }
        else {
            //Get the search json
            sysproInterop.callBusinessObject("query",
                "ESPQRY",
                "<Query><Key><FileType>SB</FileType><FileName>" + KeyFieldName + "</FileName></Key></Query>",
                "",
                function (result) {

                    //Used to set title later
                    var AdditionalKeys = [];

                    console.log(result);
                    var COMFNDSearch = {};
                    COMFNDSearch.Search = {};

                    //Additional Parameters could have been supplied, as they will remain static, add them to the Search Criteria so long
                    //Also save which element to add the entered text against
                    //If I know what the extra fields are, I can try and get their values using the call below:
                    //sysproInterop.viewModel.Fields.SYSPROKeyData.toJSON()["Customer"].Value
                    var EnteredTextPossition = "GlobalValue";
                    if (!JSON.stringify(result.Query.Search).includes("{2}")) {
                        if (!JSON.stringify(result.Query.Search).includes("{1}")) {
                            //This is a single key, don't have to do anything
                            COMFNDSearch.Search.GlobalValue = "**";
                            EnteredTextPossition = "GlobalValue";
                        }
                        else {
                            //We have a double key
                            COMFNDSearch.Search.GlobalValue = "**";
                            COMFNDSearch.Search.GlobalValue1 = "**";
                            EnteredTextPossition = "GlobalValue1";
                            if (result.Query.Search.Where) {
                                $.each(result.Query.Search.Where.Expression, function (index) {
                                    if (this.Value === "{0}" && this.Condition.toUpperCase() === "EQ") {
                                        //Get the global value of the index column selected and use that to filter the search as expected if there is one. Eg for a warehouse stockcode get the current warehouse.
                                        if (sysproInterop.getGlobalValue(this.Column)) {
                                            COMFNDSearch.Search.GlobalValue = sysproInterop.getGlobalValue(this.Column);
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue
                                            });
                                        } else if (this.Column == "Branch") {//Branch is an exception and could be saved as SABranch or AssetBranch
                                            if (sysproInterop.getGlobalValue("SABranch")) {
                                                COMFNDSearch.Search.GlobalValue = sysproInterop.getGlobalValue("SABranch");
                                                AdditionalKeys.push({
                                                    key: this.Column,
                                                    value: COMFNDSearch.Search.GlobalValue
                                                });
                                            } else if (sysproInterop.getGlobalValue("AssetBranch")) {
                                                COMFNDSearch.Search.GlobalValue = sysproInterop.getGlobalValue("AssetBranch");
                                                AdditionalKeys.push({
                                                    key: this.Column,
                                                    value: COMFNDSearch.Search.GlobalValue
                                                });
                                            } else {
                                                this.Condition = "LIKE";
                                            }
                                        } else {
                                            this.Condition = "LIKE";
                                        }

                                    } else if (this.Value === "{1}" && this.Condition.toUpperCase() === "EQ") {
                                        //Get the global value of the index column selected and use that to filter the search as expected if there is one. Eg for a stockcode warehouse get the current stockcode.
                                        if (sysproInterop.getGlobalValue(this.Column)) {
                                            COMFNDSearch.Search.GlobalValue1 = sysproInterop.getGlobalValue(this.Column);
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue1
                                            });
                                        } else if (this.Column == "Branch") {//Branch is an exception and could be saved as SABranch or AssetBranch
                                            if (sysproInterop.getGlobalValue("SABranch")) {
                                                COMFNDSearch.Search.GlobalValue1 = sysproInterop.getGlobalValue("SABranch");
                                                AdditionalKeys.push({
                                                    key: this.Column,
                                                    value: COMFNDSearch.Search.GlobalValue1
                                                });
                                            } else if (sysproInterop.getGlobalValue("AssetBranch")) {
                                                COMFNDSearch.Search.GlobalValue1 = sysproInterop.getGlobalValue("AssetBranch");
                                                AdditionalKeys.push({
                                                    key: this.Column,
                                                    value: COMFNDSearch.Search.GlobalValue1
                                                });
                                            } else {
                                                this.Condition = "LIKE";
                                            }
                                        } else {
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
                                    //Get the global value of the index column selected and use that to filter the search as expected if there is one. Eg for a warehouse stockcode get the current warehouse.
                                    if (sysproInterop.getGlobalValue(this.Column)) {
                                        COMFNDSearch.Search.GlobalValue = sysproInterop.getGlobalValue(this.Column);
                                        AdditionalKeys.push({
                                            key: this.Column,
                                            value: COMFNDSearch.Search.GlobalValue
                                        });
                                    } else if (this.Column == "Branch") {//Branch is an exception and could be saved as SABranch or AssetBranch
                                        if (sysproInterop.getGlobalValue("SABranch")) {
                                            COMFNDSearch.Search.GlobalValue = sysproInterop.getGlobalValue("SABranch");
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue
                                            });
                                        } else if (sysproInterop.getGlobalValue("AssetBranch")) {
                                            COMFNDSearch.Search.GlobalValue = sysproInterop.getGlobalValue("AssetBranch");
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue
                                            });
                                        } else {
                                            this.Condition = "LIKE";
                                        }
                                    } else {
                                        this.Condition = "LIKE";
                                    }
                                }
                                if (this.Value === "{1}" && this.Condition.toUpperCase() === "EQ") {
                                    //Get the global value of the index column selected and use that to filter the search as expected if there is one. Eg for a warehouse stockcode get the current warehouse.
                                    if (sysproInterop.getGlobalValue(this.Column)) {
                                        COMFNDSearch.Search.GlobalValue1 = sysproInterop.getGlobalValue(this.Column);
                                        AdditionalKeys.push({
                                            key: this.Column,
                                            value: COMFNDSearch.Search.GlobalValue1
                                        });
                                    } else if (this.Column == "Branch") {//Branch is an exception and could be saved as SABranch or AssetBranch
                                        if (sysproInterop.getGlobalValue("SABranch")) {
                                            COMFNDSearch.Search.GlobalValue1 = sysproInterop.getGlobalValue("SABranch");
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue1
                                            });
                                        } else if (sysproInterop.getGlobalValue("AssetBranch")) {
                                            COMFNDSearch.Search.GlobalValue1 = sysproInterop.getGlobalValue("AssetBranch");
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue1
                                            });
                                        } else {
                                            this.Condition = "LIKE";
                                        }
                                    } else {
                                        this.Condition = "LIKE";
                                    }
                                }
                                if (this.Value === "{2}" && this.Condition.toUpperCase() === "EQ") {
                                    //Get the global value of the index column selected and use that to filter the search as expected if there is one. Eg for a warehouse stockcode get the current warehouse.
                                    if (sysproInterop.getGlobalValue(this.Column)) {
                                        COMFNDSearch.Search.GlobalValue2 = sysproInterop.getGlobalValue(this.Column);
                                        AdditionalKeys.push({
                                            key: this.Column,
                                            value: COMFNDSearch.Search.GlobalValue2
                                        });
                                    } else if (this.Column == "Branch") {//Branch is an exception and could be saved as SABranch or AssetBranch
                                        if (sysproInterop.getGlobalValue("SABranch")) {
                                            COMFNDSearch.Search.GlobalValue2 = sysproInterop.getGlobalValue("SABranch");
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue2
                                            });
                                        } else if (sysproInterop.getGlobalValue("AssetBranch")) {
                                            COMFNDSearch.Search.GlobalValue2 = sysproInterop.getGlobalValue("AssetBranch");
                                            AdditionalKeys.push({
                                                key: this.Column,
                                                value: COMFNDSearch.Search.GlobalValue2
                                            });
                                        } else {
                                            this.Condition = "LIKE";
                                        }
                                    } else {
                                        this.Condition = "LIKE";
                                    }
                                }
                            });
                        }
                    }
                    //if (result.Query.Search.Where)
                    //{
                    //  AvantiSearchInterop.DefaultWhereStatement = result.Query.Search.Where;
                    //} else
                    //{
                    //    AvantiSearchInterop.DefaultWhereStatement = [];
                    //}

                    //Set title again to include addition keys
                    if (AdditionalKeys.length > 0) {
                        var titleText = AvantiSearchInterop.ParentDiv + "|" + "Search " + AvantiSearchInterop.KeyFieldDesc + " ";
                        var fieldsDescription = "";
                        for (var i = 0; i < AdditionalKeys.length; i++) {
                            fieldsDescription = fieldsDescription + AdditionalKeys[i].key + ": " + AdditionalKeys[i].value + " "
                        }
                        if (fieldsDescription)
                            fieldsDescription = " (" + fieldsDescription + ")";
                        sysproInterop.setModalWindowTitle(titleText + fieldsDescription)
                    }


                    AvantiSearchCOMFNDEnteredTextPossition = EnteredTextPossition;
                    //After you added the Global values, add the rest of the criteria.
                    //The Global values need to be on to, or the search will fail
                    for (var key in result.Query.Search) {
                        COMFNDSearch.Search[key] = result.Query.Search[key]
                    }
                    var tableName = result.Query.Search.TableName;


                    var timer;

                    //add enter event listener
                    $(".avanti-search-text-input", AvantiSearchParentDivVar).off("input");
                    $(".avanti-search-text-input", AvantiSearchParentDivVar).on("input", function () {
                        //Add a 250ms delay, so avoid a call for every character typed
                        if (timer) {
                            clearTimeout(timer);
                        }
                        timer = setTimeout(function () {
                            AvantiSearchInterop.PerformSearch(COMFNDSearch, tableName, ValueSelected, EnteredTextPossition, AvantiSearchParentDivVar);

                        }, 250);
                    });
                    $(".avanti-search-button", AvantiSearchParentDivVar).off("click");
                    $(".avanti-search-button", AvantiSearchParentDivVar).on("click", function () { AvantiSearchInterop.PerformSearch(COMFNDSearch, tableName, ValueSelected, EnteredTextPossition, AvantiSearchParentDivVar); });

                    //Ensure the Expressions is in a JSON array
                    if (COMFNDSearch.Search.Where.Expression) {
                        if (!COMFNDSearch.Search.Where.Expression.length) {
                            COMFNDSearch.Search.Where.Expression = [COMFNDSearch.Search.Where.Expression];
                        }
                    }
                    else { //if no Expression exist, create an empty Array so long.
                        COMFNDSearch.Search.Where.Expression = [];
                    }

                    //Enclose the default where clause in double brackets to they apply as a single condition.
                    if (COMFNDSearch.Search.Where.Expression[0].OpenBracket == '(' &&
                        COMFNDSearch.Search.Where.Expression[COMFNDSearch.Search.Where.Expression.length - 1].CloseBracket == ')') {
                        COMFNDSearch.Search.Where.Expression[0].OpenBracket = '((';
                        COMFNDSearch.Search.Where.Expression[COMFNDSearch.Search.Where.Expression.length - 1].CloseBracket = '))';
                    }
                        //if no brackets exist, also enclose with brackets.
                    else if (!COMFNDSearch.Search.Where.Expression[0].OpenBracket &&
                        !COMFNDSearch.Search.Where.Expression[COMFNDSearch.Search.Where.Expression.length - 1].CloseBracket) {
                        COMFNDSearch.Search.Where.Expression[0].OpenBracket = '(';
                        COMFNDSearch.Search.Where.Expression[COMFNDSearch.Search.Where.Expression.length - 1].CloseBracket = ')';

                    }

                    //COMFNDSearch.Search = result.Query.Search;
                    console.log("-----NEW COMFND -----" + JSON.stringify(COMFNDSearch));
                    AvantiSearchInterop.AvantiSearchCOMFNDPlainXML = COMFNDSearch;
                    _tableName = tableName;
                    AvantiSearchInterop.PerformSearch(COMFNDSearch, tableName, ValueSelected, EnteredTextPossition, AvantiSearchParentDivVar);
                    $(".search-loading-cover", AvantiSearchParentDivVar).hide();
                },
                function (e) {
                    sysproInterop.handleError(e.ErrorMessage, "Getting Default Avanti Search");
                }
                , true, false);
        }
    },
    //The filter options will be serialized to JSON, and passed in here to execute a refreshed search.
    // Input:   keyFieldName            -> Key field, exp. StockCode
    //          callBackMethod          -> Method to call with the result
    //          FilterSerializedJson    -> The filter options serialized
    ApplyGivenSearchFilter: function (keyFieldName, callBackMethod, FilterSerializedJson, AvantiSearchParentDivVar) {

        console.log("ApplyGivenSearchFilter");

        //Make an unreference copy of the Search object
        //var localCOMFNDSearchJSON = AvantiSearchInterop.AvantiSearchCOMFNDPlainXML;
        var localCOMFNDSearchJSON = JSON.parse(JSON.stringify(AvantiSearchInterop.AvantiSearchCOMFNDPlainXML));

        //Reset the default where statement but don't clear it? This this does apply.
        //localCOMFNDSearchJSON.Search.Where = AvantiSearchInterop.DefaultWhereStatement;


        var filtersCount = FilterSerializedJson.length;
        var index = 1;
        var tableName = AvantiSearchInterop.AvantiSearchCOMFNDPlainXML.Search.TableName;

        FilterSerializedJson.forEach(function (item) {
            if (item.Value != "") {
                if (item.TableName != tableName) {
                    item.Column = item.TableName + "." + item.Column;
                }

                switch (item.Type) {
                    case "0": // Text

                        //{
                        //    "AndOr": "and",
                        //    "OpenBracket": "((",
                        //    "Column": "InvBuyer.Email",
                        //    "Condition": "LIKE",
                        //    "Value": "{0}",
                        //    "CloseBracket": ")"
                        //}

                        var tempexp = {};
                        tempexp.AndOr = "and";
                        if (index == 1)//first filter Open bracket
                        {
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
                    case "1": // Numeric
                        var tempexp = {};
                        tempexp.AndOr = "and";
                        if (index == 1)//first filter Open bracket
                        {
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
                        } break;
                    case "2": // ComboBox
                    case "3": //CheckBox
                    case "4": //RadioButton
                    case "8": // Date
                        var tempexp = {};
                        tempexp.AndOr = "and";
                        if (index == 1)//first filter Open bracket
                        {
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
                        } break;
                    case "5": // Slider
                        var tempexp = {};
                        var Values = item.Value.split(",");
                        tempexp.AndOr = "and";
                        if (index == 1)//first filter Open bracket
                        {
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

                        tempexp = {};
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
                    case "7": // CheckBox All Options
                        var Values = item.Value.split(",");
                        var ValuesIndex = 1;
                        var ValuesCount = Values.length;
                        Values.forEach(function (_value) {
                            _value = _value.trim();
                            var tempexp = {};

                            if (ValuesIndex == 1)//first filter Open bracket
                            {
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
                            } ValuesIndex++;
                        });
                        break;
                    case "9": // DateSlider
                        var tempexp = {};
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
                        tempexp = {};
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
                        tempexp = {};
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
                        } break;

                    case "6": // Browse (not supported yet)
                    default:
                        break;


                }
            }

            index++;
        });

        //console.log(localCOMFNDSearchJSON);
        //console.log(JSON.stringify(localCOMFNDSearchJSON));

        AvantiSearchInterop.PerformSearch(localCOMFNDSearchJSON, tableName, callBackMethod, AvantiSearchCOMFNDEnteredTextPossition, AvantiSearchParentDivVar)

    },
    colvalueslookup: null,

    //Pass all parameters needed from the bind into here.
    // Input:   COMFNDSearchJSON    -> The search that COMFND is expecting. We will add filters and the entered text.
    //          tableName           -> The table name that the search is on. We need this to troll through the COMFND results.
    //          callBackMethod      -> Method to call with the selected value
    //          EnteredTextPossition-> Which Global value element to add the enetered text against for the search
    PerformSearch: function (COMFNDSearchJSON, tableName, callBackMethod, EnteredTextPossition, AvantiSearchParentDivVar) {
        try {
            console.log("00 Perform Search");
            $(".search-loading-cover", AvantiSearchParentDivVar).show();
            var t0 = performance.now();

            var BusinessObject = "COMFND";
            var BOInput = "";
            var searchText = $(".avanti-search-text-input", AvantiSearchParentDivVar).val();
            if (AvantiSearchInterop.CustomSearch == false) {

                var newCOMFNDSearch = COMFNDSearchJSON;
                //newCOMFNDSearch.Search.AvantiSearch = "Y";
                newCOMFNDSearch.Search.IgnoreDuplicates = "Y";
                newCOMFNDSearch.Search.IgnoreMissingKeys = "Y";
                newCOMFNDSearch.Search.IncludeColumnMetadata = "Y";
                newCOMFNDSearch.Search.EspressoSearch = "Y";

                if (!searchText) {
                    searchText = "**";
                    //TODO find a CDATA replacement
                    //newCOMFNDSearch.Search.GlobalValue = "<![CDATA[" + searchText + "]]>"
                    newCOMFNDSearch.Search[EnteredTextPossition] = searchText;
                } else {
                    //newCOMFNDSearch.Search.GlobalValue = "<![CDATA[*" + searchText + "*]]>"
                    newCOMFNDSearch.Search[EnteredTextPossition] = "*" + searchText + "*";
                }

                var rowsCountToReturn = $("#avanti-search-count-slider")[0].getAttribute("data-slider-endvalue");
                if (!rowsCountToReturn || rowsCountToReturn === "undefined") {
                    rowsCountToReturn = $("#avanti-search-count-slider")[0].getAttribute("data-slider-startvalue");
                }
                newCOMFNDSearch.Search.ReturnRows = Math.round(parseFloat(rowsCountToReturn));
                BOInput = JSON.stringify(newCOMFNDSearch);
            }
            else {
                BusinessObject = "ESPQRY";
                BOInput = "{\"Query\": {\"Key\": {\"FileType\": \"SS\",\"FileName\": \"" + AvantiSearchInterop.KeyField + "\",\"SearchValue\": \"**\"  } } }";
                //BOInput = "<Query><Key><FileType>SS</FileType><FileName>" + AvantiSearchInterop.KeyField + "</FileName></Key></Query>";
            }

            sysproInterop.callBusinessObject("query", BusinessObject, BOInput, "{}", function (result) {
                // console.log(result);
                var l0 = performance.now();

                //for custom searches
                if (tableName === "")
                    tableName = AvantiSearchInterop.KeyField;

                if (AvantiSearchInterop.CustomSearch) {
                    result = result.Query;
                }

                var resultsArray = [];


                if (result[tableName].RowsReturned !== 0) {
                    //Intentional == because RowsReturned could be a string with spaces "    1"
                    if (result[tableName].RowsReturned == 1) {
                        resultsArray.push(result[tableName].Row);
                    }
                    else {
                        resultsArray = result[tableName].Row;
                    }
                }

                AvantiSearchInterop.colvalueslookup = {};

                if (result[tableName].HeaderDetails) {
                    if (result[tableName].HeaderDetails.ColumnMetadata) {
                        $.each(result[tableName].HeaderDetails.ColumnMetadata.Column, function (column) {
                            var columnItem = this;
                            if (this.ColumnDataType === "FlagYes") {

                                AvantiSearchInterop.colvalueslookup[columnItem.Name] = {};
                                AvantiSearchInterop.colvalueslookup[columnItem.Name]["Y"] = "&#x2714;";
                                AvantiSearchInterop.colvalueslookup[columnItem.Name]["N"] = "";

                            } else {

                                if (this.ColumnValues && this.ColumnValues.ColumnValue) {


                                    AvantiSearchInterop.colvalueslookup[columnItem.Name] = {};

                                    $.each(this.ColumnValues.ColumnValue, function (index) {

                                        AvantiSearchInterop.colvalueslookup[columnItem.Name][this.Value] = this.Text;

                                    });
                                }
                            }
                        });
                    }

                }

                ////Add ticks for Ledger codes on Control Flag and On Hold Flag
                //result[tableName].HeaderDetails.ColumnMetadata.Column["forEach"](function (_value) {
                //    if (_value.ColumnDataType === "FlagYes") {
                //        resultsArray["forEach"](function (ColumnValue) {
                //            if (ColumnValue[_value.Name]) {
                //                if (ColumnValue[_value.Name] === "Y") {
                //                    ColumnValue[_value.Name] = "&#x2714;";
                //                } else if (ColumnValue[_value.Name] === "N") {
                //                    ColumnValue[_value.Name] = "";//"&#x274C;";
                //                }
                //            }

                //        });
                //    }

                //    else if(_value.ColumnValues.ColumnValue)
                //    {
                //        AvantiSearchInterop.colvalueslookup[_value.Name] = {};

                //        $.each(_value.ColumnValues.ColumnValue,  function(index){

                //            AvantiSearchInterop.colvalueslookup[_value.Name][this.Value] = this.Text;

                //        });

                //        //resultsArray["forEach"](function (ColumnValue) {
                //        //    if (ColumnValue[_value.Name]) {

                //        //        var found = _value.ColumnValues.ColumnValue.find(function (element) {
                //        //            if (element.Value === ColumnValue[_value.Name])
                //        //            {
                //        //                return element.Text;
                //        //            }
                //        //       });

                //        //        if (!found)
                //        //        {
                //        //            found = _value.ColumnValues.ColumnValue.find(function (element) {
                //        //                if (element.Other === "Y") {
                //        //                    return element.Text;
                //        //                }
                //        //            });
                //        //        }

                //        //        if (found) {
                //        //            ColumnValue[_value.Name] = found.Text;
                //        //        }

                //        //    }

                //        //});

                //    }
                //});


                //if (tableName == "GenMaster") {
                //    resultsArray["forEach"](function (_value) {
                //        if(_value.ControlAccFlag)
                //        {
                //            if(_value.ControlAccFlag === "Y") {
                //                _value.ControlAccFlag = "&#x2714;";
                //            } else if (_value.ControlAccFlag === "N") {
                //                _value.ControlAccFlag = "";//"&#x274C;";
                //            }
                //        }
                //        if (_value.AccOnHldFlag) {
                //            if (_value.AccOnHldFlag === "Y") {
                //                _value.AccOnHldFlag = "&#x2714;";
                //            } else if (_value.AccOnHldFlag === "N") {
                //                _value.AccOnHldFlag = "";//"&#x274C;";
                //            }
                //        }
                //    });
                //}

                //Ensure columns returned is an Array
                if (result[tableName].HeaderDetails.Columns) {
                    //if Columns is not an array
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
                //Now check if LoopColumns is an array and not a single item as well and correct it.
                if (!Array.isArray(LoopColumns)) {
                    LoopColumns = [LoopColumns];
                }


                //Give better column headings > QtyOnHand => Qty on hand
                var Columns = [];
                $.each(LoopColumns, function (index, column) {

                    //var columnText;


                    //var columnDesc = result[tableName].HeaderDetails.ColumnMetadata.Column.find(function (element) {
                    //    if (element.Name === column) {
                    //        return element.Description;
                    //    }
                    //});



                    //var columnDesc;
                    //if(column["#text"])
                    //{
                    //    columnText = column["#text"];
                    //    columnDesc = column["@Description"];
                    //}
                    //else
                    //{
                    //    columnText= column;
                    //    columnDesc = columnText;
                    //}

                    if (column.Name) {
                        var columnIn = {
                            field: column.Name,
                            title: AvantiSearchInterop.FormatLinkedColumns(column.Description),
                            encoded: false,
                            width: 140
                        };
                    } else {
                        fieldName = column;
                        if (index == 0) {
                            fieldName = "Id"
                        }
                        else if (index == 1) {
                            fieldName = "Description"
                        }
                            //Skip 3rd (index 2) as it will be duplicated and ignored
                        else if (index == 3) {
                            fieldName = "AdditionalField1"
                        }
                        else if (index == 4) {
                            fieldName = "AdditionalField2"
                        } else if (index == 5) {
                            fieldName = "DisplayField1"
                        } else if (index == 6) {
                            fieldName = "DisplayField2"
                        } else if (index == 7) {
                            fieldName = "DisplayField3"
                        } else if (index == 8) {
                            fieldName = "DisplayField4"
                        } else if (index == 9) {
                            fieldName = "DisplayField5"
                        }


                        var columnIn = {
                            field: fieldName,
                            title: AvantiSearchInterop.CamelCaseToSentence(column),
                            encoded: false,
                            width: 140
                        };
                    }
                    if (AvantiSearchInterop.colvalueslookup[column.Name]) {
                        //var Default = AvantiSearchInterop.colvalueslookup.find(function (values) {
                        //    if(values.Other == "Y")
                        //        return values.Text;
                        //});
                        //var Default = column.ColumnValues.ColumnValue.find(function (values) {
                        //    if (values.Other == "Y")
                        //        return values.Text;
                        //});
                        //if (Default)
                        //    var templaterequired = "#= AvantiSearchInterop.colvalueslookup['" + column.Name + "'][" + column.Name + "] ? AvantiSearchInterop.colvalueslookup['" + column.Name + "'][" + column.Name + "] : '" + Default.Text + "' #";
                        //else
                        //If the actual value is blank then it won't exist in the look up so make it blank as well.
                        var templaterequired = "#= AvantiSearchInterop.colvalueslookup['" + column.Name + "'][" + column.Name + "] || AvantiSearchInterop.colvalueslookup['" + column.Name + "'][" + column.Name + "] === '' ? AvantiSearchInterop.colvalueslookup['" + column.Name + "'][" + column.Name + "] : " + column.Name + " ? " + column.Name + " : '' #";

                        columnIn.template = templaterequired;
                    }
                    if (!AvantiSearchInterop.CustomSearch) {
                        Columns.push(columnIn);
                    } else {
                        //Skip 3rd (index 2)  as it will be duplicated and ignored
                        if (index != 2) {
                            Columns.push(columnIn);
                        }
                    }
                });

                if (AvantiSearchInterop.CustomSearch) {
                    AvantiSearchInterop.KeyFieldColumn = "Id";
                }
                else {
                    AvantiSearchInterop.KeyFieldColumn = result[tableName].HeaderDetails.Columns.Column[0];
                }

                //var actionTemplate = " <a onclick=\"sysproInterop.showSmartTag(this)\" data-fieldcaption=\"# KeyFieldColumn #\" data-fieldvalue=\"# KeyFieldValue #\">";
                //actionTemplate += "<span class=\"sys-mg-t-off sys-txt-lg sys-mg-b-5 text-primary sys-fg-primary pull-left\"># KeyFieldValue #</span>";
                //actionTemplate += "</a>";

                var actionTemplatePrt1 = " <a onclick=\"sysproInterop.showSmartTag(this)\" data-fieldcaption=\"ESPRESSOKEYFIELD:";
                var actionTemplatePrt2 = "\" data-fieldvalue=\"";
                var actionTemplatePrt3 = "\">";
                var actionTemplatePrt4 = "<span class=\"text-primary sys-fg-primary\">";
                var actionTemplatePrt5 = "</span>";
                var actionTemplatePrt6 = "</a>";


                //result[tableName].HeaderDetails.Columns.Column.push({
                Columns.push({
                    field: "Actions",
                    //template: "<strong>NINO</strong>"
                    //template: actionTemplate
                    template: function (dataItem) {
                        return actionTemplatePrt1 + kendo.htmlEncode(AvantiSearchInterop.KeyFieldColumn) + actionTemplatePrt2 + kendo.htmlEncode(dataItem[AvantiSearchInterop.KeyFieldColumn]) + actionTemplatePrt3 + actionTemplatePrt4 + "Actions" + actionTemplatePrt5 + actionTemplatePrt6;
                    },
                    width: 90
                }
                    );

                ActionColumnIndex = Columns.length - 1;
                //.forEach(function (item) {

                //    item.Actions = item[0].value;
                //});
                //$.each(resultsArray, function (index) {
                //    this.KeyFieldColumn = AvantiSearchInterop.KeyFieldColumn;
                //    this.KeyFieldValue = this[AvantiSearchInterop.KeyFieldColumn];
                //});

                //if grid doesnt exist then create it otherwise just set the datasource.
                var grid = $(".avanti-search-results-grid", AvantiSearchParentDivVar).data("kendoGrid");
                //First check if the grid has actually been initialized
                if (!grid) {
                    //select inside modelid
                    $(".avanti-search-results-grid", AvantiSearchParentDivVar).kendoGrid({
                        dataSource: {
                            data: resultsArray,
                            pageSize: 20
                        },
                        selectable: "single",
                        height: 400,
                        change: function (arg) {

                            //var grid = $(".avanti-search-results-grid").data("kendoGrid");
                            //var row = $(grid.tbody).closest("tr");
                            ////var rowIdx = $("tr", grid.tbody).index(row);
                            //var colIdx = $("td", row).index(this);
                            //alert(rowIdx + '-' + colIdx);

                            //if (ActionColumnIndex != colIdx) {
                            //    var selected = $.map(this.select(), function (item) {
                            //        //return $(item).text();
                            //        return item.cells["0"].textContent;
                            //    });
                            //    console.log("Selected: " + selected);
                            //    if (callBackMethod)
                            //        callBackMethod(selected);
                            //}
                            //kendoConsole.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
                        },
                        sortable: true,
                        filterable: true,
                        scrollable: {
                            endless: true
                        },
                        resizable: true,
                        //This pagable is used by the endless scrolling
                        pageable: {
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
                            var selected = dataItem[AvantiSearchInterop.KeyFieldColumn];

                            //If we browsing on EccRevHistory Table then return the Version and the release
                            //For SRS Only
                            if (callLayerInterop.avantiPluginLoaded === "SRSMain") {
                                if (tableName === "EccRevHistory") {
                                    selected += "/" + dataItem.Release;
                                }
                            }

                            console.log("Selected: " + selected);
                            if (callBackMethod) {
                                if (AvantiSearchInterop.SearchCallBackClicked === false) {
                                    AvantiSearchInterop.SearchCallBackClicked = true;
                                    callBackMethod(selected);

                                }

                                //Add a 200ms delay, so avoid the callback method being executed twice
                                var timer = setTimeout(function () {
                                    AvantiSearchInterop.SearchCallBackClicked = false;
                                }, 200);
                            }
                        }
                        else {
                            grid.clearSelection();
                        }
                    });

                }
                else {
                    //Set Data source
                    var dataSource = new kendo.data.DataSource({
                        data: resultsArray,
                        pageSize: 20
                    });

                    grid.setDataSource(dataSource);
                }

                if (AvantiSearchInterop.CustomSearch) {

                    var gridHolder = AvantiSearchParentDivVar;

                    sysproInterop.performPredictiveSearch(AvantiSearchInterop.KeyField, searchText, function (result) {
                        resultsArray = result;
                        //Set Data source
                        var dataSource = new kendo.data.DataSource({
                            data: resultsArray,
                            pageSize: 20
                        });
                        //
                        var gridInput = $(".avanti-search-results-grid", gridHolder).data("kendoGrid");

                        gridInput.setDataSource(dataSource);


                        var t1 = performance.now();
                        var tsec = 0;
                        //Calculate execution time to 2 decimal places
                        tsec = +(((t1 - t0) / 1000).toFixed(2));
                        //$(".avanti-search-results-text", AvantiSearchParentDivVar).text("|-Results-|: " + result[tableName].RowsReturned + " |-results-| (" + tsec + " |-seconds-|)");
                        $(".avanti-search-results-text-count", gridHolder).text(result.length);
                        $(".avanti-search-results-text-duration", gridHolder).text(tsec);
                        $(".search-loading-cover", gridHolder).hide();


                    }, function (e) { })
                }
                span = document.getElementById("resultsBox");
                var t1 = performance.now();
                var l1 = performance.now();

                var lsec = 0;
                //Calculate execution time to 2 decimal places
                lsec = +(((l1 - l0) / 1000).toFixed(2));
                console.log("Execution time after BO call: " + lsec + " seconds");

                var tsec = 0;
                //Calculate execution time to 2 decimal places
                tsec = +(((t1 - t0) / 1000).toFixed(2));
                //$(".avanti-search-results-text", AvantiSearchParentDivVar).text("|-Results-|: " + result[tableName].RowsReturned + " |-results-| (" + tsec + " |-seconds-|)");
                $(".avanti-search-results-text-count", AvantiSearchParentDivVar).text(result[tableName].RowsReturned);
                $(".avanti-search-results-text-duration", AvantiSearchParentDivVar).text(tsec);
                $(".search-loading-cover", AvantiSearchParentDivVar).hide();
            }, function (e) {
                sysproInterop.handleError(e.ErrorMessage, "Performing Avanti Search");
            }
                , false, false);

            console.log("99 Perform Search");
        }
        catch (ex) {
            sysproInterop.handleError(ex.message, "Initializing Avanti Search");
        }
    },

    ///FILTER UI FUNCTIONS
    //Removes the specified Filter Control
    RemoveFilterItem: function (ControlID) {
        console.log("Removed Control Filter Item: " + ControlID);
        $("#" + ControlID, AvantiSearchInterop.ParentDiv).parent().parent().remove();
        console.log("Removed DIV - " + ControlID);
    },

    //Takes in a string and strips out the start and end quotes (Only supports single quotes)
    RemoveSingleQuotes: function (Value) {

        //Remove leading and trailing spaces
        Value = Value.trim();

        ItemValue = Value.substring(1, Value.length - 1);
        return ItemValue.trim();
    },

    //Plots a chart above slider control, use Mean and Median for visualization
    //The X and Y Axis titles are blank for now
    //The ChartData must be an array of number example:  [20, 1, 18, 3, 15, 5, 10, 6, 9, 6, 10]

    //Plots a chart above slider control, use Mean and Median for visualization
    //The X and Y Axis titles are blank for now
    //The ChartData must be an array of number example:  [20, 1, 18, 3, 15, 5, 10, 6, 9, 6, 10]
    BuildAndPopulateChart: function (ControlId, Theme, ChartTitle, ChartType, XAxisTitle, YAxisTitle, MIN, MAX, ChartData) {
        try {
            Theme = "blueOpal";
            ChartType = "area";

            XAxisTitle = "";
            YAxisTitle = "";
            var new_number = 0;
            var NewChartData = [];

            //NewChartData.push(MIN);
            //var Arrayinput = 0;
            //for (var i = MIN; i < MAX - 1; i++) {                 
            //    NewChartData.push("");
            //}

            //NewChartData.push(MAX);
            //NewChartData = [];
            //NewChartData.push(MAX++);

            var maxValue = ChartData.reduce(function (a, b) {
                return Math.max(a, b);
            });
            var minValue = ChartData.reduce(function (a, b) {
                return Math.min(a, b);
            });

            $("#" + ControlId, AvantiSearchInterop.ParentDiv).kendoChart({
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
                    //step: 1,
                    //title: {
                    //    text: XAxisTitle
                    //},
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

        } catch (e) {
            sysproInterop.handleError(e.message, "Error on Plot chart");
        }
    },

    //Builds a list of Radio buttons by binding to a HTML Template
    BuildRadioButtons: function (ControlID, Data) {
        try {
            var RadioButtons = [];

            if (Data.ColumnValues && Data.ColumnValues.ColumnValue) {
                RadioButtons = Data.ColumnValues.ColumnValue;
            }

            var Items = [{ "caption": "All", "value": "All", "Name": Data.ColumnName, "id": Data.ColumnName + ItemValue }];
            var ItemValue = "";
            var selectedValue = null;

            for (var i = 0; i < RadioButtons.length; i++) {
                ItemValue = AvantiSearchInterop.RemoveSingleQuotes(RadioButtons[i].Value);

                if (ItemValue != "") {
                    if (!RadioButtons[i].Description) {
                        RadioButtons[i].Description = ItemValue;
                    }
                    Items.push({ "caption": RadioButtons[i].Description, "value": ItemValue, "Name": Data.ColumnName, "id": Data.ColumnName + ItemValue });
                }

                if (selectedValue == null)
                    selectedValue = "All";
            }

            //Remove the Filter as there are no controls to be added to the UI
            if (Items.length == 0) {
                AvantiSearchInterop.RemoveFilterItem(ControlID);
                return;
            }

            //Only Data bind if we have items
            var RBData = {
                selectedValue: selectedValue, id: "radiogroup", Items: Items
            };

            var DivToBindTo = $("#" + ControlID, AvantiSearchInterop.ParentDiv);

            //Parse the result
            var RBObservable = kendo.observable(RBData);

            //Bind the data to the UI
            kendo.bind(DivToBindTo, RBObservable);
        } catch (e) {
            sysproInterop.handleError(e.message, "Error on Build Radio Buttons");
        }
    },

    //Builds a list of Check boxeds by binding to a HTML Template
    BuildCheckBoxes: function (ControlID, Data) {
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

                ItemValue = AvantiSearchInterop.RemoveSingleQuotes(CBData[i].Value);

                if (ItemValue != "") {
                    if (!CBData[i].Description) {
                        CBData[i].Description = ItemValue;
                    }
                    Items.push({ "caption": CBData[i].Description, "value": ItemValue, "Name": Data.ColumnName, "id": Data.ColumnName + ItemValue, "Class": ClassName });
                }

                if (selectedValue == null)
                    selectedValue = "All";
            }

            //Remove the Filter as there are no controls to be added to the UI
            if (Items.length == 1) {
                AvantiSearchInterop.RemoveFilterItem(ControlID);
                return;
            }

            //Only Data bind if we have items
            var _CBData = {
                id: "checkboxgroup", Items: Items
            };

            var DivToBindTo = $("#" + ControlID, AvantiSearchInterop.ParentDiv);

            //Parse the result
            var CBObservable = kendo.observable(_CBData);

            //Bind the data to the UI
            kendo.bind(DivToBindTo, CBObservable);

            //Function to check all CheckBoxes
            AvantiSearchInterop.CheckAllCheckBoxed(Data.ColumnName, ClassName);

        } catch (e) {
            sysproInterop.handleError(e.message, "Error on Build checkboxes");
        }
    },

    //Initializes and populates comobox
    InitAndPopulateComboBox: function (ControlID, Data) {
        try {

            //var ComboBoxData = [{ Item: "Select an item..." }];//{ Item: "Select an item..." }
            var CBData = [];

            if (Data.ColumnValues && Data.ColumnValues.ColumnValue) {
                CBData = Data.ColumnValues.ColumnValue;
            }
            var Itemvalue = "";

            //Add a none option
            $("#" + ControlID, AvantiSearchInterop.ParentDiv).append('<option value="none">All</option>');

            for (var i = 0; i < CBData.length; i++) {

                Itemvalue = AvantiSearchInterop.RemoveSingleQuotes(CBData[i].Value);

                if (Itemvalue != "") {
                    if (!CBData[i].Description) {
                        CBData[i].Description = Itemvalue;
                    }
                    $("#" + ControlID, AvantiSearchInterop.ParentDiv).append('<option value="' + Itemvalue + '">' + CBData[i].Description + '</option>');
                }

            }
        } catch (e) {
            console.log(e.message);
        }
    },

    InitPanelBar: function () {
        var panelBar = $("#panelbar", AvantiSearchInterop.ParentDiv).kendoPanelBar().data("kendoPanelBar");
    },

    PerformBrowse: function () {
        alert("Ready to browse");
    },

    InitDatePicker: function (ControlID) {

        // create DatePicker from input HTML element        
        var datepicker = $("#" + ControlID, AvantiSearchInterop.ParentDiv).data("kendoDatePicker");

        //Now set the date
        if (datepicker) {
            datepicker.value(new Date());
        }
    },

    InitApplyFilterButton: function () {
        $("#ApplyFilterButton", AvantiSearchInterop.ParentDiv).kendoButton();
        $("#ClearFilter", AvantiSearchInterop.ParentDiv).kendoButton();
    },

    InitNumericTextBoxes: function (ControlID) {
        $("#" + ControlID, AvantiSearchInterop.ParentDiv).kendoNumericTextBox();
    },

    //Gets the value of all selected check boxes
    GetAllCheckedCheckBoxes: function (id) {
        var Value = "";

        //Get the Div
        var ListOfCheckboxes = $("#" + id, AvantiSearchInterop.ParentDiv).find(":checkbox");

        if (ListOfCheckboxes.length > 0) {
            if (ListOfCheckboxes[0].checked) {
                return "";
            }
        }

        if (ListOfCheckboxes.length > 1) {
            for (var i = 1; i < ListOfCheckboxes.length; i++) {
                if (ListOfCheckboxes[i].checked) {
                    Value += ListOfCheckboxes[i].value + ",";
                }
            }
        }

        Value = Value.substring(0, Value.length - 1);
        return Value;
    },

    //Formats the Date in this for CCYY-MM-dd
    GetDateInBOFormat: function (_ControlId) {
        try {
            try {
                return $("#" + _ControlId).data("DateTimePicker").date().format("YYYY-MM-DD");
            } catch (e) {
                return "#IGNORE#";
            }
        } catch (e) {
            console.log("Error in GetDateInBOFormat: " + e.message);
        }
    },

    //Gets the value of the selected radio button
    GetTheSelectedRadioButton: function (id) {

        //Get the Div
        var Value = "";

        var ListOfRadioButtons = $("#" + id, AvantiSearchInterop.ParentDiv).find(":radio:checked");

        if (ListOfRadioButtons.length > 0)
            Value = ListOfRadioButtons[0].value;
        if (Value == "All")
            Value = "";
        return Value;
    },

    setRangeSliderMinValue: function () {
        try {
            // <!--<div id="RangeSlider_#= ColumnName #_#= TableName #_#= ColumnObject #" class="humidity AVANTI-RANGE-SLIDER">-->

            var ColumnName = event.target.closest(".form-group").getAttribute("data-name");
            var TableName = event.target.closest(".form-group").getAttribute("data-tablename");
            var ColumnObject = event.target.closest(".form-group").getAttribute("data-ColumnObject");
            var min = parseInt(event.target.getAttribute("data-NumMinValue"));

            var ControlID = "RangeSlider_" + ColumnName + "_" + TableName + "_" + ColumnObject;

            //Get the slider end Value
            var EndValue = $("#" + ControlID, AvantiSearchInterop.ParentDiv)[0].getAttribute("data-slider-endvalue");

            //Set the Min Value
            $("#" + ControlID, AvantiSearchInterop.ParentDiv)[0].noUiSlider.set([min, EndValue]);

            AvantiSearchInterop.ApplyFilter();
        } catch (e) {
            console.log("Error: " + e.message)
        }
    },

    setRangeSliderMaxValue: function () {
        try {
            // <!--<div id="RangeSlider_#= ColumnName #_#= TableName #_#= ColumnObject #" class="humidity AVANTI-RANGE-SLIDER">-->

            var ColumnName = event.target.closest(".form-group").getAttribute("data-name");;
            var TableName = event.target.closest(".form-group").getAttribute("data-tablename");
            var ColumnObject = event.target.closest(".form-group").getAttribute("data-ColumnObject");
            var max = parseInt(event.target.getAttribute("data-NumMaxValue"));

            var ControlID = "RangeSlider_" + ColumnName + "_" + TableName + "_" + ColumnObject;

            //Get the slider end Value
            var StartValue = $("#" + ControlID, AvantiSearchInterop.ParentDiv)[0].getAttribute("data-slider-startvalue");

            //Set the Min Value 
            $("#" + ControlID, AvantiSearchInterop.ParentDiv)[0].noUiSlider.set([StartValue, max]);

            AvantiSearchInterop.ApplyFilter();
        } catch (e) {
            console.log("Error: " + e.message)
        }
    },

    setRowCountSliderMaxValue: function () {
        try {
            var ControlID = "avanti-search-count-slider";
            var max = parseInt($("#" + ControlID, AvantiSearchInterop.ParentDiv).getAttribute("data-slider-max"));


            //Set the Min Value 
            $("#" + ControlID, AvantiSearchInterop.ParentDiv)[0].noUiSlider.set([1, max]);
        } catch (e) {
            console.log("Error: " + e.message);
        }
    },

    CheckBoxClick: function (e) {

    },


    //When the apply filer is called we serialize the filter values to json
    ApplyFilter: function () {

        console.log("00 Apply Filter");

        try {

            if (!AvantiSearchInterop.ApplySearchFilter)
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
                Value = $("input", this).val();
                TableName = this.getAttribute("data-tablename");
                Type = this.getAttribute("data-ColumnObject");

                switch (Type) {
                    case "1":
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        Value = $("#" + _ControlId, AvantiSearchInterop.ParentDiv).val();
                        break;
                    case "2":
                        if (Value === "none" || Value === "All") {
                            Value = "";
                        }
                        break;
                    case "3":
                        //<input type="checkbox" id="Filter_#= ColumnName #_#= TableName #_#= ColumnObject #">
                        //Get the boolean value of the single checkbox
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        var id = "Filter_" + Column + "_" + TableName + "_" + Type;
                        Value = "N";

                        if ($("#" + id, AvantiSearchInterop.ParentDiv).is(":checked")) {
                            Value = "Y";
                        }

                        break;
                    case "4":
                        //Get the selected radio button
                        //<div id="Filter_#= ColumnName #_#= TableName #_#= ColumnObject #">
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        var id = "Filter_" + Column + "_" + TableName + "_" + Type;
                        Value = AvantiSearchInterop.GetTheSelectedRadioButton(id);
                        console.log("Radio Button ID:" + id);
                        console.log("Radio Button value:" + Value);
                        break;
                    case "5":
                        //RangeSlider_Price_InvMaster_5
                        //RangeSlider_#= ColumnName #_#= TableName #_#= ColumnObject #
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        var sliderID = "RangeSlider_" + Column + "_" + TableName + "_" + Type;
                        Value = $("#" + sliderID, AvantiSearchInterop.ParentDiv)[0].getAttribute("data-slider-startvalue") + "," + $("#" + sliderID, AvantiSearchInterop.ParentDiv)[0].getAttribute("data-slider-endvalue");
                        break;
                    case "7":
                        //Get All the checked Check boxes
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        var id = "Filter_" + Column + "_" + TableName + "_" + Type;
                        Value = "";

                        Value = AvantiSearchInterop.GetAllCheckedCheckBoxes(id);
                        break;
                    case "8":
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        Value = AvantiSearchInterop.GetDateInBOFormat(_ControlId);
                        break;
                    case "9":
                        //DateRangeSlider_Price_InvMaster_9
                        //DateRangeSlider_#= ColumnName #_#= TableName #_#= ColumnObject #
                        _ControlId = "Filter_" + Column + "_" + TableName + "_" + Type;
                        var sliderID = "DateRangeSlider_" + Column + "_" + TableName + "_" + Type;
                        if (!$("#" + sliderID, AvantiSearchInterop.ParentDiv)[0].getAttribute("data-slider-endvalue") || !$("#" + sliderID, AvantiSearchInterop.ParentDiv)[0].getAttribute("data-slider-startvalue") || $("#" + sliderID, AvantiSearchInterop.ParentDiv)[0].getAttribute("data-slider-startvalue") === "0" || $("#" + sliderID, AvantiSearchInterop.ParentDiv)[0].getAttribute("data-slider-endvalue") === "0" || $("#" + sliderID, AvantiSearchInterop.ParentDiv)[0].getAttribute("data-slider-startvalue") === "null" || $("#" + sliderID, AvantiSearchInterop.ParentDiv)[0].getAttribute("data-slider-endvalue") === "null") {
                            Value = "#IGNORE#";
                        } else {
                            Value = $("#" + sliderID, AvantiSearchInterop.ParentDiv)[0].getAttribute("data-slider-startvalue") + "," + $("#" + sliderID, AvantiSearchInterop.ParentDiv)[0].getAttribute("data-slider-endvalue");
                        }
                        break;
                }

                console.log($("input", this).val());

                //Put back the  + in the table name
                TableName = TableName.split('Plus').join('+');
                if (Value !== "#IGNORE#") {
                    FilterItems.push({ "Column": Column, "Value": Value, "TableName": TableName, "Type": Type });

                    Counter++;
                }
            });

            console.log(FilterItems);

            AvantiSearchInterop.ApplyGivenSearchFilter("StockCode", "", FilterItems, AvantiSearchInterop.ParentDiv);

        } catch (e) {
            console.log(e.message);
            sysproInterop.handleError(e.message, "Error on Apply Filer");
        }
    },

    ApplyFilterButtonClicked: function () {

        var CurrentSearchSetting = AvantiSearchInterop.ApplySearchFilter;
        AvantiSearchInterop.ApplySearchFilter = true;

        AvantiSearchInterop.ApplyFilter();

        AvantiSearchInterop.ApplySearchFilter = CurrentSearchSetting;
    },

    InitSliderControl: function (ControlID, SliderValues) {
        try {

            console.log("InitSliderControl ");

            //"RangeSlider_#= ColumnName #_#= TableName #_#= ColumnObject #" 
            //RangeSlider_ProductClass_ArCustomer_5

            var Min = 0;
            var Max = 100;

            if (SliderValues.NumSliderValues.NumMinimum === "") {
                Min = 0;
            } else {
                Min = parseInt(SliderValues.NumSliderValues.NumMinimum);
            }

            if (SliderValues.NumSliderValues.NumMaximum === "") {
                Max = 0;
            } else {
                Max = parseInt(SliderValues.NumSliderValues.NumMaximum);
            }

            $("#" + ControlID, AvantiSearchInterop.ParentDiv).kendoRangeSlider({
                min: parseInt(Min),
                max: parseInt(Max),
                orientation: "horizontal"
            });

        } catch (e) {
            console.log("InitSliderControl - " + e.message);
            sysproInterop.handleError(e.message, "Initialize slider control");
        }
    },

    InitializeAndPopulateControl: function (Item) {
        try {

            var ControlID = "Filter_" + Item.ColumnName + "_" + Item.TableName + "_" + Item.ColumnObject;
            var ObjectType = Item.ColumnObject;

            //0 - Text
            //1 - Numeric
            //2 - ComboBox
            //3 - CheckBox
            //4 - RadioButton
            //5 - Slider
            //6 - Browse
            //7 - Check Box All
            //8 - DatePicker
            switch (ObjectType) {

                case "0":
                    //TODO:
                    break;
                case "1":
                    break;
                case "2":
                    AvantiSearchInterop.InitAndPopulateComboBox(ControlID, Item)
                    break;
                case "3":

                    break;
                case "4":
                    AvantiSearchInterop.BuildRadioButtons(ControlID, Item);
                    break;
                case "5":
                    ControlID = "RangeSlider_" + Item.ColumnName + "_" + Item.TableName + "_" + Item.ColumnObject;
                    //AvantiSearchInterop.InitSliderControl(ControlID, Item);
                    ControlID = "Chart_" + Item.ColumnName + "_" + Item.TableName + "_" + Item.ColumnObject;
                    //"Chart_#= ColumnName #_#= TableName #_#= ColumnObject #"
                    var _ChartData = queryLayoutUIHelpers.calculateYValuesOnNormalCurve(parseInt(Item.NumSliderValues.NumMinimum), parseInt(Item.NumSliderValues.NumMaximum), parseFloat(Item.NumSliderValues.NumStdDev), parseFloat(Item.NumSliderValues.NumAverage), 30);
                    AvantiSearchInterop.BuildAndPopulateChart(ControlID, "", Item.ColumnDesc, "", "", "", parseInt(Item.NumSliderValues.NumMinimum), parseInt(Item.NumSliderValues.NumMaximum), _ChartData);
                    //"RangeSlider_#= ColumnName #_#= TableName #_#= ColumnObject #"
                    //var NoUISlider = $("#" + ControlID, AvantiSearchInterop.ParentDiv);
                    break;
                case "6":
                    //TODO: Textbox with Browse - Not supported for V 1
                    break;
                case "7":
                    AvantiSearchInterop.BuildCheckBoxes(ControlID, Item);
                    break;
                case "8":
                    AvantiSearchInterop.InitDatePicker(ControlID);
                    break;

            }
        } catch (ex) {
            sysproInterop.handleError(ex.message, "Initialize and populate filters");
        }
    },

    ReturnTabPanelHTML: function (Categorykey) {

        var HTMLString = "";

        HTMLString = "<div class='col-sm-12'>";
        HTMLString += "<div class='panel-group' id='24b725fc-1ced-443e-b687-6014e0a5a912" + AvantiSearchInterop.FilterCategoryNum + "' role='tablist' aria- multiselectable='true'>";
        HTMLString += "<div class='panel sys-widget sys-box-shadow-off '>";
        HTMLString += "<h4 class='sys-mg-off' role='tab' id='ae6854d2-ac24-47da-9dd6-68783444a02f" + AvantiSearchInterop.FilterCategoryNum + "'>";
        HTMLString += "<a class='sys-fg-lighten panel-heading sys-block sys-bg-white sys-fg-primary sys-pd-off-l' data-toggle='collapse' data-parent='#24b725fc-1ced-443e-b687-6014e0a5a912" + AvantiSearchInterop.FilterCategoryNum + "' href='#7703c5f2-0fd9-4856-8c97-83a07c777170" + AvantiSearchInterop.FilterCategoryNum + "' ariaexpanded='false' aria-controls='7703c5f2-0fd9-4856-8c97-83a07c777170" + AvantiSearchInterop.FilterCategoryNum + "' aria-expanded='true'>";
        HTMLString += "<i class='material-icons sys-mg-r-2'>brightness_5</i>";
        HTMLString += AvantiSearchInterop.CamelCaseToSentence(Categorykey);
        HTMLString += "<i class='material-icons pull-right collapsible-open-icon'>keyboard_arrow_down</i>";
        HTMLString += "<i class='material-icons pull-right collapsible-close-icon'>keyboard_arrow_up</i>";
        HTMLString += "</a>";
        HTMLString += "</h4>";
        HTMLString += "<div class='panel-collapse collapse in' id='7703c5f2-0fd9-4856-8c97-83a07c777170" + AvantiSearchInterop.FilterCategoryNum + "' role='tabpanel' aria-labelledby='ae6854d2-ac24-47da-9dd6-68783444a02f" + AvantiSearchInterop.FilterCategoryNum + "' aria-expanded='true' style=''>";
        HTMLString += "<!-- FILTERS WILL GO HERE -->";
        HTMLString += "<div id='Avanti-Filter-Template" + Categorykey + "'>";
        HTMLString += "<div data-bind='source: Column' data-template='Filter_Template'>";
        HTMLString += "</div>";
        HTMLString += "</div>";
        HTMLString += "<!-- FILTERS WILL GO HERE -->";
        HTMLString += "</div></div></div></div>";

        return HTMLString;
    },

    CamelCaseToSentence: function (CamelCaseString) {
        if (CamelCaseString) {
            return CamelCaseString.replace(/^[a-z]|[A-Z]/g, function (v, i) {
                return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
            });
        } else {
            return "";
        }
    },
    FormatLinkedColumns: function (ColumnHeader) {
        if (ColumnHeader) {
            return ColumnHeader.replace("_", " ");
        } else {
            return "";
        }
    },
    BindFiltersToCard: function (Query, KeyField, CallBack) {

        console.log("00 BindFiltersToCard");

        try {

            //var KeyField = null;
            var QueryString = null;
            var Context1 = null;
            var Context2 = null;
            var SourceApp = null;

            //Setup Apply Filter Button
            AvantiSearchInterop.InitApplyFilterButton();

            if (Query) {

                //Add the categories                      
                var value = Query.Query.Item;

                if (value && value.Columns && value.Columns.Categories) {
                    //Generate The filters for this Category
                    $.each(value.Columns.Categories, function (Categorykey, Categoryvalue) {

                        console.log(Categorykey);

                        //Check if there is a Panlel bar
                        var PanelBarID = "Avanti-Filter-Template" + Categorykey;

                        var _PanelBar = $("#" + PanelBarID, AvantiSearchInterop.ParentDiv);

                        if (_PanelBar.length === 0) {

                            //Add the categories  
                            $("#panelbar", AvantiSearchInterop.ParentDiv).append(AvantiSearchInterop.ReturnTabPanelHTML(Categorykey));
                            AvantiSearchInterop.FilterCategoryNum++;
                            //$("#panelbar", AvantiSearchInterop.ParentDiv).append("<li class='k-state-active'>" + Categorykey + "<div id='Avanti-Filter-Template" + Categorykey + "'> <div data-bind='source: Column' data-template='Filter_Template'></div></div ><hr style= 'border-top: dotted 1px; margin-top:21px; margin-bottom:0px; color:#b9b9b9;' /></li>");
                        }

                        var DIVID = "Avanti-Filter-Template" + Categorykey;
                        var DivToBindTo = $("#" + PanelBarID, AvantiSearchInterop.ParentDiv);

                        //Parse the result
                        var HarmonyObservable = kendo.observable(Categoryvalue);

                        //Bind the data to the UI
                        kendo.bind(DivToBindTo, HarmonyObservable);

                        //If there's only one filter, create an array to load it into.
                        if (!Categoryvalue.Column.length) {
                            var singleFilterString = JSON.stringify(Categoryvalue.Column);
                            Categoryvalue.Column = [];
                            Categoryvalue.Column.push(JSON.parse(singleFilterString));
                        }

                        //Initialise the control  
                        for (var i = 0; i < Categoryvalue.Column.length; i++) {
                            console.log("Tbl Desc: " + Categoryvalue.Column[i].TableDesc);
                            AvantiSearchInterop.InitializeAndPopulateControl(Categoryvalue.Column[i]);
                        }
                    });
                }
                var RowCount = 50;

                if (Query.Query.Item && Query.Query.Item.PrimaryRows) {
                    //For Nino
                    RowCount = Query.Query.Item.PrimaryRows;
                }
                else if (Query.Query.Item && Query.Query.Item.Columns && Query.Query.Item.Columns.PrimaryRows) {
                    //For Nino
                    RowCount = Query.Query.Item.Columns.PrimaryRows;
                }

                //Nino - Don't make it 0.
                if (RowCount == 0) {
                    RowCount = 50;
                }

                //Call the search component to bind with some default data
                AvantiSearchInterop.BindSearchListInCard(KeyField, CallBack, null, null, AvantiSearchInterop.ParentDiv, RowCount);

                queryLayoutUIHelpers.initializeViewOnly();

                AvantiSearchInterop.ShowHideDefaulttext(!value || !value.Columns || !value.Columns.Categories || value.Columns.Categories.length === 0);

                console.log("99 - BindFiltersToCard");
            }

        } catch (e) {
            sysproInterop.handleError(e.message, "Error on Bind Search Filter");
        }
    },

    //Clears the filters set by the users
    ClearSearchFilters: function () {
        try {
            AvantiSearchInterop.BindFiltersToCard(AvantiSearchInterop.FilterUIData, AvantiSearchInterop.FilterKeyField, "");

        } catch (e) {
            sysproInterop.handleError(e.message, "Error on Reset Search Filter");
        }
    },

    //Takes in Float and formats to have 2 decimal places
    FormatNumberToTwoDecimalPlaces: function (NumVal) {
        return parseFloat(NumVal).toFixed(2);
    },

    //Sets the checked state of all check Boxes based on the state of the Check All state
    CheckAllCheckBoxed: function (DIVID, ClassName) {
        $("#" + DIVID).click(function () {
            $("." + ClassName).prop("checked", $(this).prop("checked"));

            AvantiSearchInterop.ApplyFilter();
        });
    },

    SliderEnd: function (e) {
        AvantiSearchInterop.ApplyFilter();
    },

    ShowHideDefaulttext: function (Show) {
        try {

            if (Show) {
                $("#nosearchfilters", AvantiSearchInterop.ParentDiv).show();
                $(".floaty", AvantiSearchInterop.ParentDiv).hide();
                $("#nosearchfilters", AvantiSearchInterop.ParentDiv).closest(".column-parent").addClass("minimized");

            }
            else {
                $("#nosearchfilters", AvantiSearchInterop.ParentDiv).hide();
                $(".floaty", AvantiSearchInterop.ParentDiv).show();
                $("#nosearchfilters", AvantiSearchInterop.ParentDiv).closest(".column-parent").removeClass("minimized");
            }
        } catch (e) {

        }
    },

    //Switch Automatic switch on and off.
    SetAutomaticSearch: function () {
        try {

            var NodeToPrependTo = $("#Auto-Search", AvantiSearchInterop.ParentDiv).parent();

            if (AvantiSearchInterop.ApplySearchFilter === true) {

                AvantiSearchInterop.ApplySearchFilter = false;
                $("#Auto-Search-mi", AvantiSearchInterop.ParentDiv).remove();

                $("#Auto-Search", AvantiSearchInterop.ParentDiv).remove();

                NodeToPrependTo.removeClass("floaty-list-item floaty-list-item--blue");
                NodeToPrependTo.addClass("floaty-list-item floaty-list-item--gray");

                var itagstring = "<i id='Auto-Search-mi'class='material-icons' style='vertical-align:middle'>highlight_off</i><span id='Auto-Search' class='floaty-list-item-label'>Automatic search: OFF</span>";

                NodeToPrependTo.prepend(itagstring);
            }
            else {
                AvantiSearchInterop.ApplySearchFilter = true;
                $("#Auto-Search-mi", AvantiSearchInterop.ParentDiv).remove();
                $("#Auto-Search", AvantiSearchInterop.ParentDiv).remove();

                NodeToPrependTo.removeClass("floaty-list-item floaty-list-item--gray");
                NodeToPrependTo.addClass("floaty-list-item floaty-list-item--blue");

                var itagstring = "<i id='Auto-Search-mi'class='material-icons' style='vertical-align:middle'>autorenew</i><span id='Auto-Search' class='floaty-list-item-label'>Automatic search: ON</span>";

                NodeToPrependTo.prepend(itagstring);
            }

        } catch (e) {
            throw (e);
        }
    }
};

var $floaty = $('.floaty');

$floaty.on('mouseover click', function (e) {
    $floaty.addClass('is-active');
    e.stopPropagation();
});

$floaty.on('mouseout', function () {
    $floaty.removeClass('is-active');
});

$('.container').on('click', function () {
    $floaty.removeClass('is-active');
});