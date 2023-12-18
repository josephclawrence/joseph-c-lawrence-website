var AvantiMLInterop = {
    version: "8.0.0.0",

    BindMLWizard: function () {
        console.log("00 - BindMLWizard");
        //alert("00 - BindMLWizard");
        var navListItems = $('div.setup-panel div a'),
      allWells = $('.setup-content'),
      allNextBtn = $('.nextBtn');

        allWells.hide();

        navListItems.click(function (e) {
            e.preventDefault();
            var $target = $($(this).attr('href')),
                $item = $(this);

            if (!$item.hasClass('disabled')) {
                navListItems.removeClass('btn-success').addClass('btn-default');
                $item.addClass('btn-success');
                allWells.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
            }
        });

        allNextBtn.click(function () {
            var curStep = $(this).closest(".setup-content"),
                curStepBtn = curStep.attr("id"),
                nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                curInputs = curStep.find("input[type='text'],input[type='url']"),
                isValid = true;

            $(".form-group").removeClass("has-error");
            for (var i = 0; i < curInputs.length; i++) {
                if (!curInputs[i].validity.valid) {
                    isValid = false;
                    $(curInputs[i]).closest(".form-group").addClass("has-error");
                }
            }

            if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
        });

        $('div.setup-panel div a.btn-success').trigger('click');

    },

    InitAndBindRadioButtons: function () {
        try {
            console.log("00 InitAndBindRadioButtons");
            var selectedValue = "syspro.ml.regression";
            var Items = [{ "caption": "Regression", "value": "syspro.ml.regression", "Name": "RBRegression", "id": "IDRBRegression" }];

            Items.push({ "caption": "Classification", "value": "syspro.ml.classification", "Name": "RBClassification", "id": "IDRBClassification" });


            //Only Data bind if we have items
            var RBData = {
                selectedValue: selectedValue, id: "radiogroup", Items: Items
            };

            //Get the Div to bind to
            var DivToBindTo = $("#MLModel");

            //Parse the result
            var RBObservable = kendo.observable(RBData);

            //Bind the data to the UI
            kendo.bind(DivToBindTo, RBObservable);

        } catch (e) { sysproInterop.handleError(e.message, "Error on Build Radio Buttons"); }
    },

    InitAndBindDropDown: function () {
        console.log("00 InitAndBindDropDown");
        try {
            var CBData = [{ Item: "SYSPROServer" }, { Item: "SYSPROML" }];

            var LevelId = "0";
            var LevelValue = "SYSPRO";

            var XMLIN = "<Query><Key><FileType>DS</FileType><LevelId>" + LevelId + "</LevelId><LevelValue>" + LevelValue + "</LevelValue></Key></Query>";

            sysproInterop.callBusinessObject("query", "HRMQRY", XMLIN, "", function (result) {
                
                console.log(result);

                if (result.Query.DataSources) {
                    
                    if (result.Query.DataSources.Row){
                    
                        if (!result.Query.DataSources.Row.length) {
                            result.Query.DataSources.Row = AvantiSRSInterop.ConvertoArray(result.Query.DataSources.Row);
                        }
                        //Databind to drop down
                        for (var i = 0; i < result.Query.DataSources.Row.length; i++) {
                            $("#MLDSN").append('<option value="' + result.Query.DataSources.Row[i].DataSourceId + '">' + result.Query.DataSources.Row[i].DataSourceName + '</option>');
                        }
                }
            }

            }, function (e) { console.log("error:" + e.message) }, true, false);

            //for (var i = 0; i < CBData.length; i++) {

            //    //$("#" + ControlID, AvantiSearchInterop.ParentDiv).append('<option value="' + Itemvalue + '">' + CBData[i].Description + '</option>');
            //    $("#MLDSN").append('<option value="' + CBData[i].Item + '">' + CBData[i].Item + '</option>');

            //}

            var OutputColumns = [{ Item: "Column1" }, { Item: "Column2" }, { Item: "Column3" }, { Item: "Column4" }, { Item: "Column5" }];

            for (var i = 0; i < OutputColumns.length; i++) {
                $("#MLOutPutField").append('<option value="' + OutputColumns[i].Item + '">' + OutputColumns[i].Item + '</option>');
            }

        } catch (e) { sysproInterop.handleError(e.message, "Error on Build DropDownList"); }
    },

    SaveNewMLProject: function () {
        console.log("00 SaveNewMLProject");
        try {

            var JSONData = {};

            //var JSONArray = [];
            var datasource = {};
            var ml = {};
            var tpot = {};

            $.each($(".Ml-Wiz-Data-Item"), function (index) {

                console.log($("input", this).val());

                var Type = this.getAttribute("data-ColumnObject");
                var PropertyName = this.getAttribute("data-ColumnName");
                var Value = $("input", this).val();

                switch (Type) {

                    case "4":
                        var id = PropertyName + "_" + Type;
                        Value = AvantiSearchInterop.GetTheSelectedRadioButton(id);
                        break;
                    case "2":
                        //Get the index
                        break;
                }

                //JSONArray.push({PropertyName : Value})
                JSONData[PropertyName] = Value;
            });

            //JSONArray.push(JSONData);

            //console.log(JSONArray);

            //Call business Object to post
            sysproInterop.callPlugin("SMLMain", "SaveNewMLProject", JSON.stringify(JSONData));
        }
        catch (e) {
            sysproInterop.handleError(e.message, "Error on Create Project");
        }
    }

};
