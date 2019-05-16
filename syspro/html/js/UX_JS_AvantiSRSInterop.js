var AvantiSRSInterop = {
    version: "8.0.0.0",


    //Builds the SRS MENU with no icons
    BindSRSMenu: function () {
        try {

            console.log("00 - BindSRSMenu");

            var XMLIN = "<Query><Key><FileType>MF</FileType></Key></Query>";

            sysproInterop.callBusinessObject("query", "COMGET-SRS", XMLIN, "", function (result) {

                console.log(result);

                try {

                    for (i = 0; i < result.ReportMenu.Report.length; i++) {

                        result.ReportMenu.Report[i].Report = AvantiSRSInterop.ConvertoArray(result.ReportMenu.Report[i].Report);

                        if (result.ReportMenu.Report[i].Report.hasOwnProperty("length")) {
                            if (result.ReportMenu.Report[i].Report.length) {
                                for (j = 0; j < result.ReportMenu.Report[i].Report.length; j++) {

                                    result.ReportMenu.Report[i].Report[j].Report = AvantiSRSInterop.ConvertoArray(result.ReportMenu.Report[i].Report[j].Report);
                                }
                            }
                        }

                        if (!result.ReportMenu.Report[i].Report.length) {
                            result.ReportMenu.Report[i].Report = AvantiSRSInterop.ConvertoArray(Report);
                        }
                    }
                }
                catch (e) {

                }

                var inline = new kendo.data.HierarchicalDataSource({
                    data: result.ReportMenu.Report,
                    schema: {
                        model: {
                            children: "Report"
                        }
                    }
                });

                console.log("DataSource: " + inline);

                $("#treeview-right").kendoTreeView({
                    dataSpriteCssClassField: "sprite",
                    dataSource: inline,
                    select: function (e) {

                        //If there is no type then this is not a report
                        if (this.dataItem(e.node).Type) {

                            //Call load report form
                            console.log("Report Id - " + this.dataItem(e.node).Id);
                            sysproInterop.callPlugin("SRSMain", "srstreeviewevent", this.dataItem(e.node).Id + "|" + this.dataItem(e.node).Description);
                        }
                    },
                    dataTextField: ["Description", "Description"],

                });

            }, function (e) { console.log("error:" + e.message) }, true, false);

            console.log("99 - BindSRSMenu");

        } catch (ex) {
            sysproInterop.handleError(ex.message, "BindSRSMenu");
        }
    },

    ConvertoArray: function (Report) {

        if (!Array.isArray(Report))
            return new Array(Report);
        else
            return Report;
    },

    BinSRSArchive: function () {
        try {

            //alert("BinSRSArchive");

            var XMLIN = "<Query><Key><FileType>BA</FileType></Key></Query>";

            sysproInterop.callBusinessObject("query", "COMQAR", XMLIN, "", function (result) {
                console.log("COMQAR XML OUT");
                //alert(result);
                console.log(result);

                var inline = new kendo.data.HierarchicalDataSource({
                    data: result.Query.ReportArchive.Company,
                    schema: {
                        model: {
                            children: ["Company", "Year", "Month", "Operator"]
                        }
                    }
                });

                $("#treeview-report-archive").kendoTreeView({
                    dataSource: inline
                });

            });

        } catch (ex) {
            console.log(ex.message);
            sysproInterop.handleError(ex.message, "BinSRSArchive");
        }
    },

    Bind_Report_Queue: function () {
        try {
            sysproInterop.callPlugin("SRSMain", "refreshreportqueue", "");
        } catch (ex) {
            console.log("Bind_Report_Queue: " + ex.message);
            sysproInterop.handleError(ex.message, "Bind_Report_Queue");
        }
    },
    GetVersion :function(){return AvantiSRSInterop.version;}
};
