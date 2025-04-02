var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// declare var bootstrap: any;
var daaVinciActive = localStorage.getItem('daaVinciActive');
var systemPrompt = "Your name is 'Da Vinci', you are the 'Syspro AI helper'. Introduce yourself as such, and answer as such if asked. Always use a friendly but professional tone.         \n\nYour main responsibilities are to retrieve data from Syspro, make tasks easier, help people use Syspro, and to make data easier to digest by summarising and visualising.\n\nIf your response will include multiple rows from a SQL query (2 or more rows), each of which having 2 or more columns of data, then return the data as JSON. Immediately before the JSON and before any of your response that wraps the JSON, include the text 'KendoGrid: Here starts JSON:' (without any other characters), and then include no further text after the JSON. Also always wrap the actual code in three backticks (```). For column titles, always replace underscores (_) with a space. DO NOT return any other kind of table with your own formatting. Very importantly (!), NEVER insert a line like '// Additional rows have been omitted for brevity' into the JSON, because it makes JSON invalid. Instead, if there are more than 50 rows, provide some text before the JSON saying that you have only included the first X number of rows. NB: Always follow this rule when returning JSON for anything. Follow these instructions if your answer includes multiple orders, products, customers, invoices, jobs, or multiple of any other record.\n\nAgain, if your response includes 2 or more rows from a SQL query, with 2 or more columns, DO NOT return a normal text response with all the data, but return it as JSON, following the instructions I just gave you.\n\nWith any response, at the end, provide some 'suggested queries' by following the instructions given later. Please remember this.\n\nIf asked to 'tell me about', 'analyse', or 'explain' some data, then make the relevant queries to get the data, and then write a paragraph in a professional, business report style. Explain any trends in the data over time, any anomalies, and compare similar time periods if relevant (for example the same month in differnt years, if that is in the requested data). Above all, answer any specific questions in the request. If asked to analyse some 'order' data, then query the 'order' and 'order_details' tables to get the data. Include actual numbers and dates from the database as examples, where relevant.\n\nIf asked about a single specific order, or if your response to a query is one specific order, then use the following instructions to return JSON. You will need to perform a SQL query on the 'orders' table to get all the data, probably using the 'order_id' as the unique identifier. When you have all that data, then return the following JSON template, but with the placeholders shown by the column name inside pointy brackets. For example replace '<order_type>' with the value you get for 'order_type' from the 'orders' table. If any of the values are missing, you MUST include that property in the JSON, with a value of an empty string. Use the following code template below, and ALWAYS include the text \"Here starts avantiCard:\" BEFORE the code, and then no text at all after the code (unless it is 'suggested queries' as described below). Also always wrap the actual code in three backticks (```), along with the type of code in your response.:\n\n[\n   {{\n      \"templateName\": \"orderCard\",\n      \"order_id\": <order_id>,\n      \"order_type\": <order_type>,\n      \"status\": <status>,\n      \"customer_id\": <customer_id>,\n      \"customer_name\": <customer_name>,\n      \"purchase_order_number\": <purchase_order_number>,\n      \"Salesperson\": <Salesperson>,\n      \"order_date\": <order_date>,\n      \"ship_address\": <ship_address>,\n      \"ship_city\": <ship_city>,\n      \"ship_country\": <ship_country>,\n      \"ship_postal_code\": <ship_postal_code>,\n      \"ship_region\": <ship_region>\n   }}\n]\n\nWith any response, at the end, provide some 'suggested queries' by following the instructions given later. Please remember this. If your response is about a single order, a suggested query could be if there is an invoice associated with this order. Another suggested query could be to get more details and view the card for the customer from the order.\n\nWhenever you return HTML or JavaScript as part of an answer, include 'Here starts code:' immediately before the code, and nothing at all after the code. Always wrap the actual code in three backticks (```), which is your expected way of presenting code, along with the type of code in your response.\n\nInstructions for returning a chart or graph: \nIf asked to provide a chart or graph, or to graph or chart or plot some data, then return a JSON object of all the options for a 'Kendo UI for JQuery' chart using the template below. If any part of a query asks you to provide a chart or graph, then only follow these instructions for providing a chart, do not return the data in any other format, or in text. Do not first respond with the data, and then return the chart in a subsequent reply, just return the data for the chart immediately exactly as per these instructions here. Use the following code template below, and ALWAYS include the text \"Here starts chart data:\" BEFORE the code, and then no text at all after the code (unless it is 'suggested queries' as described below):\n\n[{{\n    \"dataSource\": {{\n        \"data\": $data\n    }},\n    \"theme\": \"material\",\n    \"title\": {{\n        \"align\": \"center\",\n        \"text\": $title\n    }},\n    \"legend\": {{\n        \"visible\": true\n    }},\n    \"seriesDefaults\": {{\n        \"type\": $type,\n        \"labels\": {{\n            \"visible\": true,\n            \"background\": \"transparent\"\n        }}\n    }},\n    \"series\": [{{\n        \"field\": $fieldName,\n        \"categoryField\": $categoryName\n    }}],\n    \"valueAxis\": {{\n        \"majorGridLines\": {{\n            \"visible\": false\n        }},\n        \"visible\": true\n    }},\n    \"categoryAxis\": {{\n        \"majorGridLines\": {{\n            \"visible\": false\n        }},\n        \"line\": {{\n            \"visible\": true\n        }},\n        \"labels\": {{\n            \"rotation\": -55\n        }}\n    }}\n}}]\n\nReplace the following placeholders with the relevant values: Replace $title with an appropriate title for the chart, considering what data you were asked to show in the chart. Replace $type with whatever type of chart is specified, and if no type is specified, then replace $type with 'column'. Replace $data with an array of the data you got from your SQL query, in the following format, replacing $fieldName with the field name, $categoryName with the category name, and replacing $fieldValue and $categoryValue with the appropriate values:\n\n[\n   {{\n         $fieldName: $fieldValue,\n         $categoryName: $categoryValue\n   }},\n   {{\n         $fieldName: $fieldValue,\n         $categoryName: $categoryValue\n   }}\n]\n        \nMake sure to only include the real data from your response. Don't ever add demo or dummy data, or any data that you did not find from a SQL query. Very important: You MUST REMOVE all comments (lines with '//' at the start) from this data and do not add any. Make sure to keep the square brackets which wrap all the code, so that it is valid JSON. If asked to format a value as a currency, then just do this for the labels, don't include a currency symbol along with numerical values in $fieldValue or $categoryValue.\n\nIf asked for a Gantt chart, then do exacty the same as above but use the following code template:\n\n[{{\n    \"dataSource\": {{\n        \"data\": $data\n    }},\n    \"theme\": \"material\",\n    \"title\": {{\n        \"align\": \"center\",\n        \"text\": $title\n    }},\n    \"legend\": {{\n        \"visible\": false\n    }},\n    \"series\": [{{\n      \"fromField\": $fromField,\n      \"toField\": $toField,\n      \"categoryField\": $categoryField,,\n    }}],\n    \"seriesDefaults\": {{         \n        \"type\": \"rangeBar\",\n        \"labels\": {{\n            \"visible\": true,\n            \"background\": \"transparent\"\n        }}\n    }},\n    \"valueAxis\": {{\n        \"majorGridLines\": {{\n            \"visible\": false\n        }},\n        \"visible\": true\n    }},\n    \"categoryAxis\": {{\n        \"majorGridLines\": {{\n            \"visible\": false\n        }},\n        \"line\": {{\n            \"visible\": true\n        }}\n    }}\n}}]\n\nReplace $fromField with the appropriate field from the data (likely to be \"start_date\", or similar). Replace $toField with the appropriate field from the data (likely to be \"end_date\", or similar). Replace $cetegoryField with the appropriate field from the data (likely to be \"description\", or \"job_id\" or similar). If asked for a Gantt or rangebar chart of jobs, then query the \"jobs\" table to get the jobs requested in my query, and make sure to get the \"description\", \"start_date\" and \"end_date\" columns.\n\nDo not return the code for a chart unless specifically requested to do so.\n\nThat is the end of instructions for returning charts and graphs.\n\nIf asked for contact or address details (for example a person's contact details, or a company's contact details, or a customer address or customer contact or name and address of a customer, or the contact details from an invoice) then return HTML using the following template below, where '$name', '$address', '$city', '$postal_code' should be replaced with the data you are returning (these are examples - you can also use the same pattern with other bits of contact information). '$name' can be for 'name' or 'customer_name' for example. If you do not have one or more of those bits of data, then exclude from the HTML the div element which has the data-cdetail attribute set to the relevant name of the bit of data. For example if you could not find the name from column 'customer_name', exclude from the HTML the element with data-cdetail='name', and any inner HTML of that element. IMMEDIATELY BEFORE the HTML, ALWAYS include the text 'Here starts code:', and include NO TEXT after the end of the provided HTML (unless it is 'suggested queries' as described below). Also always wrap the actual code in three backticks (```), which is your expected way of presenting code. Here is the HTML template to use:\n\n   <div class=\"k-card-body\">\n      <div data-cdetail=\"name\">\n         <b>Name: </b>\n         <span>$name</span>\n      </div>\n      <div data-cdetail=\"address\">\n         <b>Address: </b>\n         <span>$address</span>, \n         <span>$city</span>, \n         <span>$postal_code</span>\n      </div>\n   </div>  \n\nNB: You can also use the above 'card' HTML template for cases where I have not specifically provided HTML for a different card. For example if I ask for a card for a particular warehouse, you can just use this template and return it with all the details you have on the specific warehouse.\n\nIf I ask about how to use Syspro, or Avanti, or which syspro program to use to do something, ALWAYS use the \"search_syspro_help_dot_com\" tool to find an answer. If you use the 'search_syspro_help_dot_com' tool then DO NOT provide any 'suggested queries'.\n\nIf I ask for all the information about a single particular stock code, or product code, or product, or to see the stock code card, or product card, for a single particular stock code, product code, or product, then use the following instructions and JSON template below: You need to calculate one value 'GP', by first subtracting the value for 'cost' from the value for 'price', dividing that value by the value for 'price', and multiplying that value by 100 (rounded to 2 decimal places). When you have all that data, then return the following JSON template, but with the placeholders shown by the column name inside pointy brackets. For example replace '<quantity_on_hand>' with the value you get for 'quantity_on_hand' from the 'warehouses' table. If any of the values are missing, you MUST include that property in the JSON, with a value of an empty string. Use the following code template below, and ALWAYS include the text \"Here starts avantiCard:\" BEFORE the code, and then no text at all after the code (unless it is 'suggested queries' as described below). Also always wrap the actual code in three  (```), which is your expected way of presenting code, along with the type of code in your response.:\n\n[\n   {{\n      \"templateName\": \"stockCodeCard\",\n      \"product_id\": <product_id>,\n      \"LongDesc\": <LongDesc>,\n      \"category\": <category>,\n      \"price\": <price>,\n      \"cost\": <cost>,\n      \"quantity_on_hand\": <quantity_on_hand>,\n      \"quantity_sold\": <quantity_sold>,\n      \"warehouse_id\": <warehouse_id>,\n      \"GP\": <GP>\n   }}\n]\n\nNB: If your response to a query is a few different products, then please always ignore any product that has no product ID, product_id or product code. This means that if for example asked for the top 5 products, and one of those five has no product ID (meaning, that column just has an empty string, or is empty), then remove this from your response, and include another one.\n\nIf asked for all the information about a single particular job or job code or job id, or to see the job card for a single particular job or job code or job id, then use the following instructions and JSON template below: You will need to use the supplied or returned job code to do a SQL query. When you have all the data, then return the following JSON template, but with the placeholders shown by the column name inside pointy brackets. For example replace '<product_name>' with the value you get for 'product_name' from the 'jobs' table. If any of the values are missing, you MUST include that property in the JSON, with a value of an empty string. Use the following code template below, and ALWAYS include the text \"Here starts avantiCard:\" BEFORE the code, and then no text at all after the code (unless it is 'suggested queries' as described below). Also always wrap the actual code in three backticks (```), which is your expected way of presenting code, along with the type of code in your response.:\n\n[\n   {{\n      \"templateName\": \"jobCard\",\n      \"job_id\": <job_id>,\n      \"description\": <description>,\n      \"product_name\": <product_name>,\n      \"product_id\": <product_id>,\n      \"start_date\": <start_date>,\n      \"end_date\": <end_date>\n   }}\n]\n\nIf I ask to: create a quote, say that I want to create a quote, create a purchase order, create a sales order, start a new purchase order, make a quote, make a sales order, make a purchase order, or any rephrasing of these requests, then respond with just the text 'Use the wizard'. Do not use this response in any other situation.\n\nIf asked to 'tell me about', or 'analyse', or 'explain' some data, do so by making the relevant queries to get data, then writing a paragraph in a professional, business report style. Explain any trends in the data over time, any anomalies, and compare similar time periods if relevant (for example the same month in differnt years, if that is in the requested data). Above all answer any specific questions in the request. If asked to analyse some 'order' data, then query the 'order_details' table to get the data.\n\nNB: if your answer will include multiple rows of SQL data, then follow the previous instructions about responding with JSON. If you execute a SQL query and get back 2 or more rows of data with 2 or more columns, then do not provide the data in normal text or in your own formatting, but instead respond with the data formatted as JSON, according to the previous instructions I gave about responding with multiple rows of data.\n\nDon't forget, when responding with code of any type (e.g. JSON, JavaScript, HTML etc.), always include the extra code detailed in my previous instructions.\n\nBased on what is asked, provide some 'suggested queries' in the specific format described below. ONLY use JSON, preceded by the EXACT text 'Here are suggested queries'. ALWAYS incude that exact text before the JSON. Still include your usual syntax of wrapping the JSON in three backticks (```). The JSON should be as follows:\n\n[\n   {{\n      \"title\": \"<Short version>\",\n      \"value\": \"<Long version>\"\n   }},\n   {{\n      \"title\": \"<Short version>\",\n      \"value\": \"<Long version>\"\n   }}\n]\n\nwhere <Short version> should be a brief 3 or 4 word description of the suggested query written as a 'call to action' with a command as the first word such as 'View', 'Get' etc., and <Long version> should be a well formulated prompt for the same 'suggested query'. If the 'suggested query' is about one record (one salesperson, product, stock code, warehouse, invoice, order, job etc.) in particular, ALWAYS include the ID or name of that record in the 'short version' as well.\n\nDon't give suggested queries in normal text, only JSON. Don't give suggested queries if you use the 'search_syspro_help_dot_com' tool.\n\nAlways try suggest 1 to 4 further interesting things I should ask you. Examples of 'suggested queries' are 'What are the past 12 monthly sales for <Customer name>' if asked for any information about a customer; 'Stock codes commonly ordered with <Stock code>' if asked any query about one or more stock codes; or 'Which customer orders <Stock code> most frequently' if asked about either a customer, or a stock code, or a salesperson. In the 'Long version' always include a placeholder like I have in the examples, either <Customer ID>, <Customer name>, <Stock Codes>, <Salesperson ID> or <Order ID>. provide these 'suggested queries' at the end of most of your responses.\n\nIf asked some query, and your response is to find the ID or name of one record (which could be an invoice, an order, a customer, an invoice line item, or a product or stock code), then always include AT LEAST the one 'suggested query' which has <Short version> = 'Get all details for <record ID/Name' and <Long version> = 'Return all available details, in the form of a card if appropriate, for <Record type> <record ID/Name>' where <Record type> is the type of thing you just returned (order, customer, invoice, product etc.), and the <record ID/Name> is the ID or name that was in your response to the previous query. Do not suggest a query about historical prices because this does not exist in the DB.\n\nAlways wrap all code in your responses in three backticks (```), which is your expected way of presenting code.\n\nRemember, with SQL queries ALWAYS use SQL Server syntax, NOT MySQL syntax. Always use table Aliases in SQL queries to prevent 'Ambiguous column name' errors. Don't ever tell me you are executing a SQL query. If you have some problems matching what I ask to SQL table and columns, just make the best match you can, execute a query, and return the results. Don't say what you have changed, and don't say if you are having difficulties or misunderstanding, that's not a problem. Just execute the query without saying any of the details, and return the best results you can. Do not ever return SQL code in a response, just execute the SQL query and return the data from the query. Do not ever fabricate results, make up results, or mix real data with dummy, demo or created data. If you execute a SQL query and there are no results, then just say that. Always limit the number of results queried to 50.\n";
function recordFieldsPrompt(programName) {
    var _a;
    var programHumanName = (_a = queryLayoutUIHelpers.programListTypeahead.find(function (x) { return x.sysproprogramname === programName; })) === null || _a === void 0 ? void 0 : _a.name;
    return "The following JSON contains the current fields data loaded into program " + programHumanName + " with ID " + programName + ". You can use this data if asked about the current value of a field, or to analyse data in the current program. Identify fields by the \"field\" property or the \"caption\" property. You can always look in this data if given a field name or ID that you do not recognise as a column or table name in SQL:\n    \n    ";
}
;
var session_id, chatActive = false;
var contextVariablesOptions = {
    "Customer name": ["Bayside Bikes", "Bikes & Blades - North", "Country Gardens - East"],
    "Customer ID": ["000000000000001", "000000000000002", "000000000000003"],
    "Stock Codes": ["A100", "A200", "B200"],
    "Order ID": ["000000000800136", "000000000800137", "000000000800138"],
    "Salesperson ID": ["100", "200", "101"]
};
var contextVariables = {
    "Customer name": contextVariablesOptions["Customer name"][Math.floor(Math.random() * 3)],
    "Customer ID": contextVariablesOptions["Customer ID"][Math.floor(Math.random() * 3)],
    "Stock Codes": contextVariablesOptions["Stock Codes"][Math.floor(Math.random() * 3)],
    "Order ID": contextVariablesOptions["Order ID"][Math.floor(Math.random() * 3)],
    "Salesperson ID": contextVariablesOptions["Salesperson ID"][Math.floor(Math.random() * 3)],
};
var smartLinkReplaceStrings = ["Inventory Control Manager", "Inventory Management - Maintenance", "Inventory Query", "Inventory ATP Query", "Inventory at a Glance", "Inventory Forecasting", "Inventory Optimization"];
var programsByCode = {};
var programsByName = {};
var baseViewModel = {
    templateName: '',
    order_id: '',
    order_type: '',
    status: '',
    customer_id: '',
    customer_name: '',
    purchase_order_number: '',
    Salesperson: '',
    order_date: '',
    ship_address: '',
    ship_city: '',
    ship_country: '',
    ship_postal_code: '',
    ship_region: '',
    product_id: '',
    LongDesc: '',
    category: '',
    price: '',
    cost: '',
    quantity_on_hand: '',
    quantity_sold: '',
    warehouse_id: '',
    GP: '',
    job_id: '',
    description: '',
    product_name: '',
    start_date: '',
    end_date: ''
};
var apiURL = "https://sysprogptwebapi.ahcah9exgugedfd5.westus2.azurecontainer.io";
var headers = {
    "Content-type": "application/json",
    "accept": "application/json"
};
// gpt-4-turbo-preview
var gptModel = "gpt-4o";
var agentType = "chat-conversational-react-description";
var WizardCardComponent = kendo.chat.Component.extend({
    init: function (options, view) {
        console.log(options);
        kendo.chat.Component.fn.init.call(this, options, view);
        this.element.attr("data-msg-id", generateUUID());
        this.element.addClass("k-card chat-msg-card").append('<form id="wizard" style="width:100%; margin: 0 auto;" novalidate></form>');
        setTimeout(function () {
            initWizard();
        }, 300);
    }
});
kendo.chat.registerComponent("WizardCardComponent", WizardCardComponent);
var ContactCardComponent = kendo.chat.Component.extend({
    init: function (options, view) {
        console.log(options);
        kendo.chat.Component.fn.init.call(this, options, view);
        this.element.attr("data-msg-id", generateUUID());
        this.element.addClass("k-card chat-msg-card").append(options.html);
    }
});
kendo.chat.registerComponent("ContactCardComponent", ContactCardComponent);
var GridComponent = kendo.chat.Component.extend({
    init: function (options, view) {
        console.log(options);
        kendo.chat.Component.fn.init.call(this, options, view);
        // Create a <div> from which the Calendar will be initialized.
        var gridElement = $('<div>');
        // Initialize the grid component by passing the provided value.
        gridElement.kendoGrid({
            dataSource: options.dataSource,
            scrollable: true,
        });
        gridElement.data("kendoGrid").setOptions({ columns: gridElement.data("kendoGrid").getOptions().columns.map(function (col) { return __assign(__assign({}, col), { width: "150px" }); }) });
        // create a context menu just if there is a column with an ID
        var possibleIDCols = ["order", "order id", "order_id", "customer id", "customer_id", "product id", "product_id", "product code", "job id", "job_id", "warehouse", "warehouse_id", "warehouse id", "invoice_id"];
        if (options.dataSource.length) {
            console.log('yes there is something');
            Object.keys(options.dataSource[0]).forEach(function (item, idx) {
                if (possibleIDCols.includes(item.toLowerCase())) {
                    var recordTHead = $("[data-field=\"" + item + "\"]", gridElement);
                    var recordColIdx = $(".k-table-thead th", gridElement).index(recordTHead);
                    var targetProgram_1 = getTargetProgram(item);
                    console.log('recordTHead', recordTHead, 'recordColIdx', recordColIdx);
                    gridElement.find("td:nth-child(" + (recordColIdx + 1) + ")").append("<i class='material-icons sys-fg-primary view-record'>more_horiz</i>");
                    $("<ul id=\"record-view-menu-" + idx + "\">\n                  <li class=\"view-record-card\">View card in chat</li>\n                  <li class=\"load-record\">Go to record</li>\n               </ul>").appendTo("#recordViewMenus").kendoContextMenu({
                        target: gridElement,
                        filter: "td:nth-child(" + (recordColIdx + 1) + ") .view-record",
                        showOn: "click",
                        select: function (e) {
                            console.log(e);
                            var grid = gridElement.data("kendoGrid");
                            var model = grid.dataItem($(e.target).closest("tr"));
                            console.log(model);
                            var recordID = model[item];
                            console.log(recordID);
                            if ($(e.item).hasClass("view-record-card")) {
                                chat.postMessage("Show me the card for " + item + " " + recordID);
                            }
                            else if ($(e.item).hasClass("load-record")) {
                                if (targetProgram_1 && sysproInterop) {
                                    sysproInterop.runProgramInSYSPRO(targetProgram_1 + " " + recordID, "Program", "", "");
                                }
                            }
                        }
                    });
                }
            });
        }
        // Place the grid within the Chat card.
        var bodyElement = $('<div>').addClass("k-card-body").append(gridElement);
        this.element.attr("data-msg-id", generateUUID());
        this.element.addClass("k-card chat-msg-card").append(bodyElement);
    }
});
kendo.chat.registerComponent("GridComponent", GridComponent);
var CardComponent = kendo.chat.Component.extend({
    init: function (options, view) {
        console.log(options);
        kendo.chat.Component.fn.init.call(this, options, view);
        var templateName = options.templateName;
        console.log('templateName', templateName, "#davinci" + templateName + "-template");
        console.log($("#davinci" + templateName + "-template"));
        var template = kendo.template($("#davinci" + templateName + "-template").html());
        var boundTemplate = template(options.data); //Execute the template
        // var bodyElement = $('<div>').addClass("k-card-body").append(gridElement);
        this.element.attr("data-msg-id", generateUUID());
        this.element.addClass("chat-msg-card").append(boundTemplate);
    }
});
kendo.chat.registerComponent("CardComponent", CardComponent);
var ChartComponent = kendo.chat.Component.extend({
    init: function (options, view) {
        console.log(options);
        kendo.chat.Component.fn.init.call(this, options, view);
        // Create a <div> from which the Calendar will be initialized.
        var gridElement = $('<div>');
        // if ( options.chartData.seriesDefaults && options.chartData.seriesDefaults.type && options.chartData.seriesDefaults.type === "rangeBar" ) {
        //    if ( options.chartData.dataSource?.data && options.chartData.dataSource?.data.length ) {
        //       for (let i = 0; i < options.chartData.dataSource?.data.length; i++) {
        //          console.log(options.chartData.dataSource.data[i]);
        //          if (options.chartData.dataSource.data[i].start_date) {
        //             options.chartData.dataSource.data[i].start_date = new Date(options.chartData.dataSource.data[i].start_date);
        //          }
        //          if (options.chartData.dataSource.data[i].end_date) {
        //             options.chartData.dataSource.data[i].end_date = new Date(options.chartData.dataSource.data[i].end_date);
        //          }
        //       }
        //    }
        // }
        // console.log(options);
        // Initialize the grid component by passing the provided value.
        gridElement.kendoChart(options.chartData);
        // Place the grid within the Chat card.
        var bodyElement = $('<div>').addClass("k-card-body").append(gridElement);
        this.element.attr("data-msg-id", generateUUID());
        this.element.addClass("k-card chat-msg-card").append(bodyElement);
    }
});
kendo.chat.registerComponent("ChartComponent", ChartComponent);
var CodeComponent = kendo.chat.Component.extend({
    init: function (options, view) {
        kendo.chat.Component.fn.init.call(this, options, view);
        // Create a <div> from which the Calendar will be initialized.
        var gridElement = $('<div>');
        // Initialize the grid component by passing the provided value.
        gridElement.kendoGrid({
            dataSource: [{
                    firstName: "John",
                    lastName: "Smith",
                    email: "john.smith@telerik.com"
                },
                {
                    firstName: "Jane",
                    lastName: "Smith",
                    email: "jane.smith@telerik.com"
                },
                {
                    firstName: "Josh",
                    lastName: "Davis",
                    email: "josh.davis@telerik.com"
                },
                {
                    firstName: "Cindy",
                    lastName: "Jones",
                    email: "cindy.jones@telerik.com"
                }
            ]
        });
        // Place the grid within the Chat card.
        var bodyElement = $('<div>').addClass("k-card-body").append(gridElement);
        this.element.attr("data-msg-id", generateUUID());
        this.element.addClass("k-card chat-msg-card").append(bodyElement);
    }
});
kendo.chat.registerComponent("CodeComponent", CodeComponent);
var daVinciUser = {
    id: 'daVinci',
    name: "da Vinci",
    iconUrl: "/img/davinci.png"
};
var responses = {
    summary: {
        title: "Da Vinci data summaries",
        content: "To create summaries from your data, Da Vinci learns about the patterns and regularities in your numerical and other data, directly from your database. From its understanding of trends, anomalies, and other things that seem noteworthy, it is able to produce helpful written descriptions that can save hours of traditional data analysis.",
    },
    tile: {
        title: "Da Vinci predictive tiles",
        content: "The data displayed in this tile is based on Da Vinci's trend prediction machine learning model. This model learns from your data, identifies trends, and predicts future values.",
    },
    automation: {
        title: "Da Vinci automated process",
        content: "This process was designed by an admin, and utilises Da Vinci Vision to automatically identify fields and information on invoices, and map them to fields in Syspro.",
    }
};
var techInfo = {
    summary: {
        title: "Da Vinci data summaries",
        content: "Here is some technical information about the actual model used, perhaps confidence intervals, and the method (algorithm) of learning, etc.",
    },
    tile: {
        title: "Da Vinci predictive tiles",
        content: "Here is some technical information about the actual model used, perhaps confidence intervals, and the method (algorithm) of learning, etc.",
    },
};
// const pdfGen = new jspdf.jsPDF({
//     unit: 'px',
// });
var daVinciWindow = $("#daVinciWindow").kendoWindow({
    actions: ["Heart", "More-Vertical", "Minus", "Plus", "Close"],
    draggable: false,
    resizable: false,
    width: "500px",
    height: "500px",
    // maxHeight: "750px",
    // maxWidth: "1000px",
    title: "Ask Da Vinci",
    visible: false,
    position: {
        top: window.innerHeight - 515,
        left: window.innerWidth - 515,
    },
    animation: {
        open: {
            effects: "slideIn:up fadeIn",
            duration: 150
        },
        close: {
            effects: "slideIn:up fadeIn",
            reverse: true,
            duration: 150
        }
    },
    close: function (e) {
        daVinciWindow.setOptions({
            width: "500px",
            height: "500px",
            position: {
                top: window.innerHeight - 515,
                left: window.innerWidth - 515,
            },
        });
    },
    open: function () {
        initFavesMenu();
    },
}).data("kendoWindow");
$(document).on("click", '[aria-labelledby="daVinciWindow_wnd_title"] .k-svg-i-plus', function (e) {
    // $("#daVinciWindow").siblings(".k-window-titlebar").find(".k-svg-i-plus").parent().click(function (e) {
    // daVinciWindow.wrapper.find(".k-svg-i-plus").parent().on("click", function (e) {
    console.log(daVinciWindow);
    daVinciWindow.setOptions({
        width: window.innerWidth - 320,
        height: window.innerHeight - 70,
        position: {
            top: 55,
            left: 305,
        },
    });
    $("#daVinciChat").find(".k-chart").each(function (idx, elem) {
        var chart = $(elem).data("kendoChart");
        if (chart && chart.redraw) {
            chart.redraw();
        }
    });
    initFavesMenu();
    e.preventDefault();
});
$(document).on("click", '[aria-labelledby="daVinciWindow_wnd_title"] .k-svg-i-minus', function (e) {
    // $("#daVinciWindow").siblings(".k-window-titlebar").find(".k-svg-i-minus").parent().click(function (e) {
    // daVinciWindow.wrapper.find(".k-svg-i-minus").parent().on("click", function (e) {
    console.log(daVinciWindow);
    daVinciWindow.setOptions({
        width: "500px",
        height: "500px",
        position: {
            top: window.innerHeight - 515,
            left: window.innerWidth - 515,
        },
    });
    $("#daVinciChat").find(".k-chart").each(function (idx, elem) {
        var chart = $(elem).data("kendoChart");
        if (chart && chart.redraw) {
            chart.redraw();
        }
    });
    initFavesMenu();
    e.preventDefault();
});
function setVMFieldsUpdated(updated) {
    if (typeof state !== 'undefined') {
        state.vmFieldsUpdated = !!updated;
    }
    else {
        return;
    }
}
function setModel(e) {
    if (e && $(e).data("modelname") && !$(e).hasClass("sys-fg-success")) {
        var modelName = $(e).data("modelname");
        selectedModelChecked(modelName);
        activateModel(modelName);
    }
}
;
function selectedModelChecked(modelName) {
    var itemNode = $(".avanti-model-switch[data-modelname='" + modelName + "']");
    $("i", itemNode).removeClass("sys-fg-white");
    $("i", itemNode).addClass("sys-fg-success");
    $.each($(itemNode).closest("li").siblings(), function (index) {
        $("i", this).removeClass("sys-fg-success");
        $("i", this).removeClass("sys-fg-white").addClass("sys-fg-white");
    });
}
;
function activateModel(modelName) {
    gptModel = modelName;
    initialiseDaVinci();
}
;
function initialiseDaVinci() {
    // Set up various templates for use in the chat
    var davinciresponse_template = kendo.template($('#davinciresponse-template').html());
    kendo.chat.registerTemplate("davinciresponse", davinciresponse_template);
    var davincisumresponse_template = kendo.template($('#davincisumresponse-template').html());
    kendo.chat.registerTemplate("davincisumresponse", davincisumresponse_template);
    var davincitileresponse_template = kendo.template($('#davincitileresponse-template').html());
    kendo.chat.registerTemplate("davincitileresponse", davincitileresponse_template);
    var davinciautoresponse_template = kendo.template($('#davinciautoresponse-template').html());
    kendo.chat.registerTemplate("davinciautoresponse", davinciautoresponse_template);
    var technicalinfo_template = kendo.template($('#technicalinfo-template').html());
    kendo.chat.registerTemplate("technicalinfo", technicalinfo_template);
    var sysprolearn_template = kendo.template($('#sysprolearn-template').html());
    kendo.chat.registerTemplate("sysprolearn", sysprolearn_template);
    var davinciconfirm_template = kendo.template($('#davinciconfirm-template').html());
    kendo.chat.registerTemplate("davinciconfirm", davinciconfirm_template);
    var davinciconfirmed_template = kendo.template($('#davinciconfirmed-template').html());
    kendo.chat.registerTemplate("davinciconfirmed", davinciconfirmed_template);
    var davincicode_template = kendo.template($('#davincicode-template').html());
    kendo.chat.registerTemplate("davincicode", davincicode_template);
    var confidence_template = kendo.template($('#confidence-template').html());
    kendo.chat.registerTemplate("confidence", confidence_template);
    var models_template = kendo.template($('#models-template').html());
    kendo.chat.registerTemplate("models", models_template);
    $("#davinciButton").show();
    $("#davinciButton").kendoFloatingActionButton({
        enabled: false,
        size: "small",
        alignOffset: { x: 20, y: 35 },
        click: function () {
            return __awaiter(this, void 0, void 0, function () {
                var fieldsPrompt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, convertRecordData()];
                        case 1:
                            fieldsPrompt = _a.sent();
                            $("#daVinciWindow").data("kendoWindow").open();
                            if (!chatActive) {
                                console.log('session_id ', session_id);
                                console.log('system_prompt ', systemPrompt + ' ' + fieldsPrompt);
                                setTimeout(function () {
                                    chat.renderUserTypingIndicator(daVinciUser);
                                    $(".k-typing-indicator-bubble .k-author").text("Da Vinci is thinking");
                                }, 250);
                                fetch(apiURL + "/run_conversation", {
                                    method: "POST",
                                    headers: headers,
                                    body: JSON.stringify({
                                        "session_id": session_id,
                                        "input": "Hello, I'm Joe",
                                        "system_prompt": typeof state !== 'undefined' && state.vmFieldsUpdated === true ? systemPrompt + ' ' + fieldsPrompt : '',
                                    })
                                })
                                    .then(function (response) { return response.json(); })
                                    .then(function (json) {
                                    setVMFieldsUpdated(false);
                                    console.log(json);
                                    chat.renderMessage({
                                        type: "text",
                                        text: json.output
                                    }, daVinciUser);
                                    renderEmptyActions();
                                });
                                chatActive = true;
                            }
                            setTimeout(function () {
                                $("#daVinciChat .k-message-box input").focus();
                            }, 220);
                            return [2 /*return*/];
                    }
                });
            });
        }
    });
    fetch(apiURL + "/get_active_conversation_list", {
        method: "GET",
        headers: headers,
    })
        .then(function (response) { return response.json(); })
        .then(function (json) {
        if (json.length) {
            json.forEach(function (item) {
                console.log(item);
                console.log("active session: " + item.session_id);
                if (item.session_description === "prototype") {
                    fetch(apiURL + "/delete_session?session_id=" + item.session_id, {
                        method: "DELETE",
                        headers: headers,
                    });
                }
            });
        }
        fetch(apiURL + "/initialize_conversation", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                "session_description": "prototype",
                "system_prompt": systemPrompt,
                "model_to_use": gptModel,
                "temperature": 0.25,
                "max_iterations": 2,
                "agent_type": agentType,
                "chat_history": []
            })
        })
            .then(function (initResponse) { return initResponse.json(); })
            .then(function (initJson) {
            console.log(initJson);
            session_id = initJson.session_id;
            var button = $("#davinciButton").getKendoFloatingActionButton();
            button.enable();
            $("#davinciButton").addClass("pulse alive");
        });
    });
    if (window.sysproInterop) {
        sysproInterop.callBusinessObject("query", "COMFND", "<Query> <Category>Program</Category> <TableName>AdmPrograms</TableName> <Columns> <Column>Program</Column> <Column>ProgramDesc</Column> <Column>ModuleDescription</Column> <ColumnGroupBy>0,1</ColumnGroupBy> </Columns> <Where> <Expression> <OpenBracket>(</OpenBracket> <Column>ComponentType</Column> <Condition>EQ</Condition> <Value> </Value> <CloseBracket>)</CloseBracket> </Expression> <Expression> <AndOr>And</AndOr> <OpenBracket>(</OpenBracket> <Column>ModuleDescription</Column> <Condition>NE</Condition> <Value>Software Development Kit</Value> <CloseBracket>)</CloseBracket> </Expression> </Where> <OrderBy> <Column>Program</Column> </OrderBy> </Query>", "", function (sucess) {
            // debugger;
            sucess.AdmPrograms.Row.forEach(function (item) {
                // programsByCode[item.Program] = {"ProgramCode": item.Program, "Desciption": item.ProgramDesc, "Module": item.ModuleDescription, "AltName": "" };
                programsByName[item.ProgramDesc] = { "ProgramCode": item.Program, "Desciption": item.ProgramDesc, "Module": item.ModuleDescription };
            });
            queryLayoutUIHelpers.programListTypeahead.forEach(function (item) {
                // if(programsByCode[item.sysproprogramname])
                // {
                //     programsByCode[item.sysproprogramname].AltName = item.name;
                // }
                if (!programsByName[item.name]) {
                    programsByName[item.name] = { "ProgramCode": item.sysproprogramname, "Desciption": item.name, "Module": item.breadcrumb };
                }
            });
        }, function (error) {
            debugger;
        }, true, false);
    }
}
function convertRecordData() {
    return __awaiter(this, void 0, void 0, function () {
        var recordJSON, programName, field, keyField, promptifiedJSON;
        return __generator(this, function (_a) {
            recordJSON = [];
            if (window.sysproInterop && sysproInterop.recentCalledProgramList.length > 0) {
                programName = sysproInterop.recentCalledProgramList[sysproInterop.recentCalledProgramList.length - 1].name;
            }
            else {
                programName = "IMPMEN";
            }
            // var module = programName.substring(0, 3)
            // helpSite = helpSite.split("$3$").join(module);
            // helpSite = helpSite.split("$prog$").join(programName);
            // if ( programName === "IMPMEN" ) {
            //     helpSite = sysproInterop.currentUserSession.HomeHelpUrl;
            // }
            // const response = await fetch(helpSite, {
            //     mode: 'no-cors'
            // });
            // const html = await response.text();
            // const parser = new DOMParser();
            // const doc = parser.parseFromString(html, "text/html");
            // const tableRows = doc.querySelectorAll('table tbody tr');
            // tableRows.forEach(function(tableRow) {
            //     const caption = tableRow.firstElementChild.textContent;
            //     const help = tableRow.lastElementChild.textContent;
            //     helpInfo[caption] = help;
            //     console.log(helpInfo);
            // });
            if (window.sysproInterop && window.sysproInterop.viewModel && window.sysproInterop.viewModel.Fields) {
                for (field in window.sysproInterop.viewModel.Fields) {
                    if (field !== "SYSPROKeyData") {
                        recordJSON.push({
                            field: field,
                            caption: window.sysproInterop.viewModel.Fields[field].Caption,
                            description: window.sysproInterop.viewModel.Fields[field].Description,
                            value: window.sysproInterop.viewModel.Fields[field].Value,
                        });
                    }
                    else {
                        for (keyField in window.sysproInterop.viewModel.Fields["SYSPROKeyData"]) {
                            recordJSON.push({
                                field: keyField,
                                value: window.sysproInterop.viewModel.Fields["SYSPROKeyData"][keyField].Value,
                            });
                        }
                    }
                }
                promptifiedJSON = JSON.stringify(recordJSON).replaceAll("{", "{{").replaceAll("}", "}}");
                // console.log("recordJSON", recordJSON);
                // console.log("promptifiedJSON", promptifiedJSON);
                // console.log("Full thing", recordFieldsPrompt(programName) + promptifiedJSON);
                return [2 /*return*/, recordFieldsPrompt(programName) + promptifiedJSON];
            }
            else {
                return [2 /*return*/];
            }
            return [2 /*return*/];
        });
    });
}
function initFavesMenu() {
    $('#faves-menu').kendoContextMenu({
        target: '[aria-labelledby="daVinciWindow_wnd_title"] .k-window-titlebar-action[aria-label="Heart"]',
        alignToAnchor: true,
        showOn: "click",
        select: function (e) {
            console.log(e.item);
            var query = $(e.item).find(".k-menu-link-text").text();
            chat.postMessage(query);
            this.close();
        }
    });
}
;
//Creating dynamic link that automatically click
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    console.log(link);
    document.body.appendChild(link);
    link.click();
}
function getTargetProgram(item) {
    var targetProgram = item.toLowerCase().includes("order")
        ? "SORPEN"
        : item.toLowerCase().includes("customer")
            ? "ARSPEN"
            : item.toLowerCase().includes("product") || item.toLowerCase().includes("inventory") || item.toLowerCase().includes("stock")
                ? "INVPEN"
                : item.toLowerCase().includes("job")
                    ? "WIPPEN"
                    : null;
    return targetProgram;
}
$(document).on("click", ".clickable", function () {
    var targetProgram = $(this).attr("data-target-program");
    if (window.sysproInterop)
        sysproInterop.runProgramInSYSPRO(targetProgram, "Program", "", "");
});
// function printToFile(div) {
//     console.log('printToFile', div);
//     html2canvas(div).then(canvas => {
//         console.log(canvas);
//         var myImage = canvas.toDataURL("image/png");
//         downloadURI("data:" + myImage, "yourImage.png");
//     });
// }
function renderMsgActions() {
    setTimeout(function () {
        $(".k-card-list").last().prepend("<span class='chat-user-msg-actions sys-pd-r-10 sys-mg-t-15'><a class='flag-query'><i class='material-icons text-muted'>flag</i></a><a class='flag-query'><i class='material-icons text-muted'>send</i></a><a class='export-response'><i class='material-icons text-muted'>file_download</i></a></span>");
        $(".k-card-list").last().find('.export-response').on('click', function () {
            var exportElement = $(this).closest('.chat-user-msg-actions').siblings('.chat-msg-card');
            // printToFile(exportElement[0]);
        });
    }, 500);
}
function checkAndRenderResponseActions(responseString) {
    if (responseString && !responseString.includes('Here are suggested queries') && !responseString.toLowerCase().includes('suggested queries') && responseString.replace(/\s/g, '').length) {
        console.log('about to render straight up response');
        chat.renderMessage({
            type: "text",
            text: responseString.trim()
        }, daVinciUser);
        renderResponseActions();
    }
}
function renderResponseActions() {
    setTimeout(function () {
        $(".k-message-group[vinci]").last().find(".k-message").last().append("<span class='chat-user-msg-actions sys-pd-r-10'><a class='flag-query'><i class='material-icons text-muted'>flag</i></a><a class='flag-query'><i class='material-icons text-muted'>send</i></a><a class='export-response'><i class='material-icons text-muted'>file_download</i></a></span>");
    }, 300);
    setTimeout(function () {
        console.log('here it is:', $(".k-message-group[vinci]").last().find(".k-message").last().find('.flag-query'));
        $(".k-message-group[vinci]").last().find(".k-message").last().find('.flag-query').on('click', function () {
            console.log('hello there');
            chat.renderUserTypingIndicator(daVinciUser);
            $(".k-typing-indicator-bubble .k-author").text("Da Vinci is thinking");
            chat.renderMessage({
                type: "text",
                text: "You have indicated there's something wrong with this response - please help me understand more so I can improve. How could my last response be better?"
            }, daVinciUser);
            renderEmptyActions();
            chat.renderSuggestedActions([
                {
                    title: "Formatted differently",
                    value: "Formatted differently"
                },
                {
                    title: "More correct data",
                    value: "More correct data"
                },
                ,
                {
                    title: "Something else",
                    value: "Something else"
                }
            ]);
        });
    }, 500);
}
function brevityCheck(brevityDisclaimer) {
    if (brevityDisclaimer) {
        chat.renderMessage({
            type: "text",
            text: "Please note that there are many more results for your query, and I have included only the first few. To investigate the full set of results use the appropriate Syspro program."
        }, daVinciUser);
        renderEmptyActions();
    }
}
function renderEmptyActions() {
    $(".k-message-group[vinci]").last().find(".k-message").last().append("<span class='chat-user-msg-actions sys-pd-r-10'></span>");
}
function isJsonString(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
function fixJSON(jsonStr) {
    if (isJsonString(jsonStr)) {
        return jsonStr;
    }
    else {
        var fixedJSON = void 0;
        try {
            fixedJSON = partialParse(jsonStr);
        }
        catch (e) {
            return false;
        }
        return JSON.stringify(fixedJSON);
    }
}
function removeTrailingComma(string) {
    return string.replace(/\,(?!\s*?[\{\[\"\'\w])/g, '');
}
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    if (!isNaN(uuid.substring(0, 1))) {
        uuid = 'a' + uuid.substring(1);
    }
    return uuid;
}
;
var codeCheck = 'Here starts code:';
var chartCheck = 'Here starts chart data:';
var commentRegex = /\/\/.+\n/;
var awaitTrainingInput = false;
// Overwrite Kendo clearing of suggested actions
if (kendo.chat && kendo.chat.ChatView && kendo.chat.ChatView.fn._removeSuggestedActions) {
    kendo.chat.ChatView.fn._removeSuggestedActions = function () {
        return;
    };
}
;
var chat = $("#daVinciChat").kendoChat({
    user: {
        // id: "sysproUser",
        name: "sysproUser",
        iconUrl: "https://ui-avatars.com/api/?background=027f02&color=fff&name=Joe&length=1"
    },
    post: function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var fieldsPrompt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(args);
                        return [4 /*yield*/, convertRecordData()];
                    case 1:
                        fieldsPrompt = _a.sent();
                        // React on a user post action.
                        setTimeout(function () {
                            if (args.from && args.from.name && args.from.name === "sysproUser") {
                                $(".k-message-group[me]").last().find(".k-message").last().prepend("<span class='chat-user-msg-actions sys-pd-r-10'><a class='fave-query'><i class='material-icons text-muted'>favorite</i></a></span>");
                            }
                        }, 500);
                        if (args.text && args.text.includes("More correct data")) {
                            // chat.renderUserTypingIndicator(daVinciUser);
                            // $(".k-typing-indicator-bubble .k-author").text("Da Vinci is thinking");
                            setTimeout(function () {
                                chat.renderMessage({
                                    type: "text",
                                    text: "Have not yet fleshed out this branch of the tree..."
                                }, daVinciUser);
                                renderEmptyActions();
                            }, 250);
                        }
                        if (args.text && args.text.includes("Formatted differently")) {
                            // chat.renderUserTypingIndicator(daVinciUser);
                            // $(".k-typing-indicator-bubble .k-author").text("Da Vinci is thinking");
                            setTimeout(function () {
                                chat.renderMessage({
                                    type: "text",
                                    text: "Please enter a clear, specific instruction of what format you would like this type of response to be in, and I will remember this in future. For example you could say something like 'when you give me information about sales data, please show me a chart, not a grid'."
                                }, daVinciUser);
                                renderEmptyActions();
                                awaitTrainingInput = true;
                            }, 250);
                        }
                        if (args.text && args.text.includes("Something else")) {
                            // chat.renderUserTypingIndicator(daVinciUser);
                            // $(".k-typing-indicator-bubble .k-author").text("Da Vinci is thinking");
                            setTimeout(function () {
                                chat.renderMessage({
                                    type: "text",
                                    text: "Have not yet fleshed out this branch of the tree..."
                                }, daVinciUser);
                                renderEmptyActions();
                            }, 250);
                        }
                        if (args.text && ![
                            "Please provide more technical information.",
                            "There's something wrong with this.",
                            "Formatted differently",
                            "Something else",
                            "More correct data"
                        ].includes(args.text) && !awaitTrainingInput) {
                            setTimeout(function () {
                                chat.renderUserTypingIndicator(daVinciUser);
                                $(".k-typing-indicator-bubble .k-author").text("Da Vinci is thinking");
                            }, 300);
                            console.log("system_prompt:", systemPrompt + ' ' + fieldsPrompt);
                            fetch(apiURL + "/run_conversation", {
                                method: "POST",
                                headers: headers,
                                body: JSON.stringify({
                                    "session_id": session_id,
                                    "input": args.text,
                                    "system_prompt": systemPrompt + ' ' + fieldsPrompt,
                                })
                            })
                                .then(function (response) { return response.json(); })
                                .then(function (json) {
                                setVMFieldsUpdated(false);
                                console.log(json);
                                var responseString = "" + json.output;
                                var responseStringArray;
                                var brevityDisclaimer = responseString.includes('//') && responseString.includes('brevity') ? true : false;
                                // const brevityDisclaimerText = "Please note that there are many more results for your query, and I have included only the first few. To investigate the full set of results use the appropriate Syspro program.";
                                var malformedResponse = "Sorry, I was not able to  create a good response for this, can you perhaps try and rephrase your question?";
                                // extra bit, but might not work... && !json.output.toLowerCase().includes("here starts") e.g in cases where there is just a text response off the back of a SQL query this would not work out.
                                if ((json.intermediate_steps.length === 1 && json.intermediate_steps[0].length && json.intermediate_steps[0][0].tool && json.intermediate_steps[0][0].tool === "sql_db_query" && json.intermediate_steps[0][1] === "")
                                    ||
                                        (json.intermediate_steps.length === 2 && json.intermediate_steps[0].length && json.intermediate_steps[0][0].tool && json.intermediate_steps[0][0].tool === "sql_db_query" && json.intermediate_steps[0][1] === "" && json.intermediate_steps[1].length && json.intermediate_steps[1][0].tool && json.intermediate_steps[1][0].tool === "sql_db_query" && json.intermediate_steps[1][1] === "")
                                    ||
                                        (json.intermediate_steps.length === 2 && json.intermediate_steps[0].length && json.intermediate_steps[0][0].tool && json.intermediate_steps[0][0].tool === "sql_db_query_checker" && json.intermediate_steps[1].length && json.intermediate_steps[1][0].tool && json.intermediate_steps[1][0].tool === "sql_db_query" && json.intermediate_steps[1][1] === "")) {
                                    chat.renderMessage({
                                        type: "text",
                                        text: "Sorry, I couldn't find any data in response to that query. Please check the detail of the query to make sure there isn't a mistake, or maybe reformulate your question."
                                    }, daVinciUser);
                                    renderEmptyActions();
                                    responseString = "";
                                }
                                else if (responseString.includes("Use the wizard")) {
                                    console.log('wizard', responseString);
                                    chat.renderAttachments({
                                        attachments: [{
                                                contentType: "WizardCardComponent",
                                            }]
                                    }, daVinciUser);
                                    renderMsgActions();
                                    daVinciWindow.setOptions({ width: 900, height: 600 });
                                    setTimeout(function () {
                                        daVinciWindow.center();
                                    }, 150);
                                    setTimeout(function () {
                                        $("#daVinciChat .k-wizard:last-child").find("input").first().focus();
                                    }, 250);
                                    responseString = "";
                                }
                                else if (responseString.includes(codeCheck) || responseString.includes("```html")) {
                                    console.log('html response');
                                    console.log(responseString);
                                    var code = void 0, codeToRemove = void 0;
                                    if (responseString.includes("```html")) {
                                        code = responseString.substring(responseString.indexOf("```html") + 7, responseString.indexOf("```", responseString.indexOf("```html") + 8)).replace("Here starts code:", "");
                                        codeToRemove = "```html" + code + "```";
                                    }
                                    else if (responseString.includes("```")) {
                                        code = responseString.substring(responseString.indexOf("```") + 3, responseString.indexOf("```", responseString.indexOf("```") + 4));
                                        codeToRemove = "```" + code + "```";
                                    }
                                    else {
                                        console.log(responseString.indexOf(codeCheck));
                                        code = responseString.slice(responseString.indexOf(codeCheck) + codeCheck.length);
                                        codeToRemove = code;
                                    }
                                    console.log(code);
                                    // Get any text in the response that is not the returned code, e.g. some caveats about the content of the code, or a description of what it is that is returned by GPT outside of the actual code
                                    responseStringArray = responseString.split(codeToRemove);
                                    console.log('responseStringArray:', responseStringArray);
                                    responseString = responseString.replace(codeToRemove, "").replace("Here starts code:", "");
                                    responseStringArray[0] = responseStringArray[0].replace("Here starts code:", "").trim();
                                    console.log('responseStringArray after replace string', responseStringArray);
                                    //    if (!responseString.includes('Here are suggested queries') && !responseString.toLowerCase().includes('suggested queries:') && responseString.replace(/\s/g, '').length) {
                                    checkAndRenderResponseActions(responseStringArray[0]);
                                    chat.renderAttachments({
                                        attachments: [{
                                                contentType: "ContactCardComponent",
                                                content: {
                                                    html: code
                                                }
                                            }]
                                    }, daVinciUser);
                                    renderMsgActions();
                                    // } else if (responseString.includes('avantiCard')) {
                                }
                                else if (responseString.includes('avantiCard')) {
                                    console.log('avanti card');
                                    console.log(responseString);
                                    var code = void 0, codeToRemove = void 0;
                                    if (responseString.includes("```json")) {
                                        if (responseString.indexOf("```", responseString.indexOf("```json") + 8) < 0) {
                                            responseString = responseString + '```';
                                        }
                                        ;
                                        code = responseString.substring(responseString.indexOf("```json") + 7, responseString.indexOf("```", responseString.indexOf("```json") + 8)).replace("Here starts avantiCard:", "");
                                        codeToRemove = "```json" + code + "```";
                                    }
                                    else if (responseString.includes("```")) {
                                        if (responseString.indexOf("```", responseString.indexOf("```") + 4) < 0) {
                                            responseString = responseString + '```';
                                        }
                                        ;
                                        code = responseString.substring(responseString.indexOf("```") + 3, responseString.indexOf("```", responseString.indexOf("```") + 4));
                                        codeToRemove = "```" + code + "```";
                                    }
                                    else {
                                        code = responseString.slice(responseString.indexOf('Here starts avantiCard:') + 'Here starts avantiCard:'.length);
                                        codeToRemove = code;
                                    }
                                    if (code.match(commentRegex) && code.match(commentRegex).length) {
                                        code = code.replace(commentRegex, '');
                                        code = removeTrailingComma(code);
                                    }
                                    // Get any text in the response that is not the returned code, e.g. some caveats about the content of the code, or a description of what it is that is returned by GPT outside of the actual code
                                    responseStringArray = responseString.split(codeToRemove);
                                    console.log('responseStringArray:', responseStringArray);
                                    responseString = responseString.replace(codeToRemove, "").replace("Here starts avantiCard:", "");
                                    responseStringArray[0] = responseStringArray[0].replace("Here starts code:", "").replace("Here starts avantiCard:", "").trim();
                                    checkAndRenderResponseActions(responseStringArray[0]);
                                    //    if (!responseString.includes('Here are suggested queries') && !responseString.toLowerCase().includes('suggested queries:') && responseString.replace(/\s/g, '').length) {
                                    //       console.log('about to render straight up response');
                                    //       chat.renderMessage({
                                    //          type: "text",
                                    //          text: responseString.trim()
                                    //       }, daVinciUser);
                                    //       renderResponseActions();
                                    //    }
                                    brevityCheck(brevityDisclaimer);
                                    var fixedCode = fixJSON(code);
                                    var data = Array.isArray(JSON.parse(fixedCode)) ? JSON.parse(fixedCode)[0] : JSON.parse(fixedCode);
                                    console.log('data', data, data.templateName);
                                    if (isJsonString(fixedCode)) {
                                        chat.renderAttachments({
                                            attachments: [{
                                                    contentType: "CardComponent",
                                                    content: {
                                                        templateName: data.templateName,
                                                        data: __assign(__assign({}, baseViewModel), data)
                                                    }
                                                }]
                                        }, daVinciUser);
                                        renderMsgActions();
                                    }
                                    else {
                                        chat.renderMessage({
                                            type: "text",
                                            text: malformedResponse
                                        }, daVinciUser);
                                        renderEmptyActions();
                                    }
                                    console.log(fixedCode);
                                }
                                else if (responseString.includes('KendoGrid')) {
                                    console.log('kendo grid');
                                    console.log(responseString);
                                    var code = void 0, codeToRemove = void 0;
                                    if (responseString.includes("```json")) {
                                        if (responseString.indexOf("```", responseString.indexOf("```json") + 8) < 0) {
                                            responseString = responseString + '```';
                                        }
                                        ;
                                        code = responseString.substring(responseString.indexOf("```json") + 7, responseString.indexOf("```", responseString.indexOf("```json") + 8)).replace("KendoGrid: Here starts JSON:", "");
                                        codeToRemove = "```json" + code + "```";
                                    }
                                    else if (responseString.includes("```")) {
                                        if (responseString.indexOf("```", responseString.indexOf("```") + 4) < 0) {
                                            responseString = responseString + '```';
                                        }
                                        ;
                                        code = responseString.substring(responseString.indexOf("```") + 3, responseString.indexOf("```", responseString.indexOf("```") + 4));
                                        codeToRemove = "```" + code + "```";
                                    }
                                    else {
                                        code = responseString.slice(responseString.indexOf('Here starts JSON:') + 'Here starts JSON:'.length);
                                        codeToRemove = code;
                                    }
                                    if (code.match(commentRegex) && code.match(commentRegex).length) {
                                        console.log('yes i found a regex');
                                        console.log(code.match(/\/\/.+\n/)[0]);
                                        code = code.replace(commentRegex, '');
                                        code = removeTrailingComma(code);
                                        console.log(code);
                                    }
                                    // Get any text in the response that is not the returned code, e.g. some caveats about the content of the code, or a description of what it is that is returned by GPT outside of the actual code
                                    responseStringArray = responseString.split(codeToRemove);
                                    console.log('responseStringArray:', responseStringArray);
                                    responseString = responseString.replace(codeToRemove, "").replace("KendoGrid: Here starts JSON:", "");
                                    responseStringArray[0] = responseStringArray[0].replace("Here starts code:", "").replace("KendoGrid: Here starts JSON:", "").trim();
                                    checkAndRenderResponseActions(responseStringArray[0]);
                                    //    if (!responseString.includes('Here are suggested queries') && !responseString.toLowerCase().includes('suggested queries:') && responseString.replace(/\s/g, '').length) {
                                    //       console.log('about to render straight up response');
                                    //       chat.renderMessage({
                                    //          type: "text",
                                    //          text: responseString.trim()
                                    //       }, daVinciUser);
                                    //       renderResponseActions();
                                    //    }
                                    brevityCheck(brevityDisclaimer);
                                    //    if (brevityDisclaimer) {
                                    //       console.log('inserting brevity disclaimer');
                                    //       chat.renderMessage({
                                    //          type: "text",
                                    //          text: brevityDisclaimerText
                                    //       }, daVinciUser);
                                    //       renderEmptyActions();
                                    //    }
                                    var fixedCode = fixJSON(code);
                                    if (isJsonString(fixedCode)) {
                                        chat.renderAttachments({
                                            attachments: [{
                                                    contentType: "GridComponent",
                                                    content: {
                                                        dataSource: JSON.parse(fixedCode)
                                                    }
                                                }]
                                        }, daVinciUser);
                                        renderMsgActions();
                                    }
                                    else {
                                        chat.renderMessage({
                                            type: "text",
                                            text: malformedResponse
                                        }, daVinciUser);
                                        renderEmptyActions();
                                    }
                                    console.log(fixedCode);
                                }
                                else if (responseString.includes(chartCheck) || (responseString.includes("chart") && responseString.includes("Here is"))) {
                                    console.log('kendo chart');
                                    console.log(responseString);
                                    var code = void 0, codeToRemove = void 0;
                                    if (responseString.includes("```javascript")) {
                                        if (responseString.indexOf("```", responseString.indexOf("```javascript") + 14) < 0) {
                                            responseString = responseString + '```';
                                        }
                                        ;
                                        code = responseString.substring(responseString.indexOf("```javascript") + 13, responseString.indexOf("```", responseString.indexOf("```javascript") + 14)).replace("Here starts chart data:", "");
                                        codeToRemove = "```javascript" + code + "```";
                                    }
                                    else if (responseString.includes("```json")) {
                                        if (responseString.indexOf("```", responseString.indexOf("```json") + 8) < 0) {
                                            responseString = responseString + '```';
                                        }
                                        ;
                                        code = responseString.substring(responseString.indexOf("```json") + 7, responseString.indexOf("```", responseString.indexOf("```json") + 8)).replace("Here starts chart data:", "");
                                        codeToRemove = "```json" + code + "```";
                                    }
                                    else if (responseString.includes("```")) {
                                        if (responseString.indexOf("```", responseString.indexOf("```") + 4) < 0) {
                                            responseString = responseString + '```';
                                        }
                                        ;
                                        code = responseString.substring(responseString.indexOf("```") + 3, responseString.indexOf("```", responseString.indexOf("```") + 4)).replace("Here starts chart data:", "");
                                        codeToRemove = "```" + code + "```";
                                    }
                                    else {
                                        console.log(responseString.indexOf(chartCheck));
                                        console.log(chartCheck.length);
                                        code = responseString.slice(responseString.indexOf(chartCheck) + chartCheck.length);
                                        codeToRemove = code;
                                    }
                                    if (code.match(commentRegex) && code.match(commentRegex).length) {
                                        console.log('yes i found a regex');
                                        console.log(code.match(commentRegex));
                                        code = code.replace(commentRegex, '');
                                        code = removeTrailingComma(code);
                                        console.log(code);
                                    }
                                    // Get any text in the response that is not the returned code, e.g. some caveats about the content of the code, or a description of what it is that is returned by GPT outside of the actual code
                                    responseStringArray = responseString.split(codeToRemove);
                                    console.log('responseStringArray:', responseStringArray);
                                    responseString = responseString.replace(codeToRemove, "").replace("Here starts chart data:", "");
                                    responseStringArray[0] = responseStringArray[0].replace("Here starts code:", "").replace("Here starts chart data:", "").trim();
                                    checkAndRenderResponseActions(responseStringArray[0]);
                                    //    if (!responseString.includes('Here are suggested queries') && !responseString.toLowerCase().includes('suggested queries:') && responseString.replace(/\s/g, '').length) {
                                    //       console.log('about to render straight up response');
                                    //       chat.renderMessage({
                                    //          type: "text",
                                    //          text: responseString.trim()
                                    //       }, daVinciUser);
                                    //       renderResponseActions();
                                    //    }
                                    brevityCheck(brevityDisclaimer);
                                    //    if (brevityDisclaimer) {
                                    //       console.log('inserting brevity disclaimer');
                                    //       chat.renderMessage({
                                    //          type: "text",
                                    //          text: brevityDisclaimerText
                                    //       }, daVinciUser);
                                    //       renderEmptyActions();
                                    //    }
                                    var fixedCode = fixJSON(code);
                                    if (isJsonString(fixedCode)) {
                                        chat.renderAttachments({
                                            attachments: [{
                                                    contentType: "ChartComponent",
                                                    content: {
                                                        chartData: JSON.parse(fixedCode)[0]
                                                    }
                                                }]
                                        }, daVinciUser);
                                        renderMsgActions();
                                    }
                                    else {
                                        chat.renderMessage({
                                            type: "text",
                                            text: malformedResponse
                                        }, daVinciUser);
                                        renderEmptyActions();
                                    }
                                }
                                else if (json.intermediate_steps.length
                                    && json.intermediate_steps[0].length
                                    && json.intermediate_steps[0][0].tool
                                    && json.intermediate_steps[0][0].tool === "search_syspro_help_dot_com") {
                                    console.log('learning used');
                                    // for (const prog of smartLinkReplaceStrings) {
                                    //     const targetProgram = getTargetProgram(prog);
                                    //     responseString = responseString.replace(prog, `<span data-target-program='${targetProgram}' class='clickable'>${prog}</span>`);
                                    // }
                                    var progRegExAsterisks = /\*\*[^\*]*\*\*/mg;
                                    var progRegExQuotes = /\"[^\*]*\"/mg;
                                    var progNamesInResponse = __spreadArrays(responseString.match(progRegExAsterisks) || [], responseString.match(progRegExQuotes) || []);
                                    console.log('progNamesInResponse', progNamesInResponse);
                                    console.log('programsByName', programsByName);
                                    if (progNamesInResponse && progNamesInResponse.length) {
                                        for (var _i = 0, progNamesInResponse_1 = progNamesInResponse; _i < progNamesInResponse_1.length; _i++) {
                                            var prog = progNamesInResponse_1[_i];
                                            var cleanProgName = prog.replaceAll('*', '').replaceAll('"', '');
                                            var targetProgram = programsByName[cleanProgName];
                                            console.log('targetProgram', targetProgram);
                                            if (targetProgram) {
                                                responseString = responseString.replaceAll(prog, "<span data-target-program='" + targetProgram.ProgramCode + "' class='clickable'>" + cleanProgName + "</span>");
                                            }
                                        }
                                    }
                                    if (responseString.includes('Here are suggested queries')) {
                                        responseString = responseString.substring(0, responseString.indexOf('Here are suggested queries'));
                                    }
                                    else if (responseString.toLowerCase().includes('suggested queries')) {
                                        responseString = responseString.substring(0, responseString.indexOf('suggested queries'));
                                    }
                                    var references = json.intermediate_steps[0][1] && json.intermediate_steps[0][1].source_documents && json.intermediate_steps[0][1].source_documents.length
                                        ? json.intermediate_steps[0][1].source_documents.map(function (ref) {
                                            var _a, _b;
                                            return {
                                                title: (_a = ref.metadata) === null || _a === void 0 ? void 0 : _a.title,
                                                link: (_b = ref.metadata) === null || _b === void 0 ? void 0 : _b.source,
                                            };
                                        })
                                        : null;
                                    console.log(json.intermediate_steps[0][1].source_documents);
                                    console.log(json.intermediate_steps[0][1].source_documents[0].metadata);
                                    console.log(json.intermediate_steps[0][1].source_documents[0].metadata.title);
                                    console.log(references);
                                    chat.renderAttachments({
                                        attachments: [{
                                                contentType: "sysprolearn",
                                                content: {
                                                    "content": responseString,
                                                    "references": references,
                                                }
                                            }],
                                        attachmentLayout: "list"
                                    }, daVinciUser);
                                    renderMsgActions();
                                }
                                else if (!responseString.includes('Here are suggested queries') && !responseString.toLowerCase().includes('suggested queries')) {
                                    console.log('about to render straight up response');
                                    chat.renderMessage({
                                        type: "text",
                                        text: responseString.trim()
                                    }, daVinciUser);
                                    renderResponseActions();
                                }
                                console.log('here is the pre suggested actions bit');
                                console.log(responseString);
                                var suggestedQueriesString = responseStringArray ? (responseStringArray[1] || responseStringArray[0]).trim() : responseString.trim();
                                // extract and correctly prepare the 'suggested queries' as suggested actions for the Kendo Chat API
                                if (suggestedQueriesString.includes('Here are suggested queries') || suggestedQueriesString.toLowerCase().includes('suggested queries')) {
                                    console.log('yes there are suggested queries');
                                    var sqText = suggestedQueriesString.substring(suggestedQueriesString.indexOf('Here are suggested queries'), suggestedQueriesString.lastIndexOf("```") + 3);
                                    var otherText = '';
                                    if (suggestedQueriesString.includes('Here are suggested queries')) {
                                        otherText = suggestedQueriesString.substring(0, suggestedQueriesString.lastIndexOf('Here are suggested queries'));
                                    }
                                    else if (suggestedQueriesString.toLowerCase().includes('suggested queries')) {
                                        otherText = suggestedQueriesString.substring(0, suggestedQueriesString.toLowerCase().lastIndexOf('suggested queries'));
                                    }
                                    console.log('sqText', sqText);
                                    console.log('otherText', otherText);
                                    var sqJSONraw = sqText.includes("```json")
                                        ? sqText.substring(sqText.indexOf("```json") + 7, sqText.lastIndexOf("```"))
                                        : sqText.substring(sqText.indexOf("```") + 3, sqText.lastIndexOf("```"));
                                    console.log(sqText.includes("```json"));
                                    console.log('sqJSONraw:', sqJSONraw);
                                    var sqJSON = sqJSONraw.split("<Customer name>").join("Customer " + contextVariables["Customer name"])
                                        .split("<Customer ID>").join("Customer " + contextVariables["Customer ID"])
                                        .split("<Stock Codes>").join("Stock code " + contextVariables["Stock Codes"])
                                        .split("<Order ID>").join("Order " + contextVariables["Order ID"])
                                        .split("<Salesperson ID>").join("Salesperson " + contextVariables["Salesperson ID"]);
                                    console.log('sqJSON', sqJSON);
                                    // Check if 'otherText' is just whitespace...
                                    if (otherText.replace(/\s/g, '').length) {
                                        console.log('posting "otherText" message:', otherText);
                                        chat.renderMessage({
                                            type: "text",
                                            text: otherText
                                        }, daVinciUser);
                                        renderEmptyActions();
                                    }
                                    chat.renderMessage({
                                        type: "text",
                                        text: "Here are some suggested further queries:"
                                    }, daVinciUser);
                                    renderEmptyActions();
                                    chat.renderSuggestedActions(JSON.parse(sqJSON));
                                }
                            });
                        }
                        else if (awaitTrainingInput) {
                            awaitTrainingInput = false;
                            setTimeout(function () {
                                chat.renderMessage({
                                    type: "text",
                                    text: 'Thank you, I will use this instruction in future responses, pending adminstrator approval. How else can I help you?'
                                }, daVinciUser);
                                alert("This will be added as a customer specific prompt: " + args.text);
                            }, 300);
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    sendMessage: function (e) {
        console.log(e);
    },
    actionClick: function (e) {
        console.log(this);
        console.log(e);
        if (![
            "Please provide more technical information.",
            "There's something wrong with this.",
            "Formatted differently",
            "Something else",
            "More correct data"
        ].includes(e.text)) {
            setTimeout(function () {
                chat.renderUserTypingIndicator(daVinciUser);
                $(".k-typing-indicator-bubble .k-author").text("Da Vinci is thinking");
            }, 400);
        }
    }
}).data("kendoChat");
// function initChatCardTooltips(elem) {
//     $('[data-bs-toggle="tooltip"]', elem).each(function(idx, element) {
//        const tooltip = new bootstrap.Tooltip(element);
//     });            
// }
// function technicalInfo() {
//     setTimeout(function() {
//        chat.clearUserTypingIndicator(daVinciUser);
//        chat.renderAttachments({
//           attachments: [{
//              contentType: "technicalinfo",
//              content: {
//                 "title": techInfo["tile"].title,
//                 "content": techInfo["tile"].content,
//              }
//           }],
//           attachmentLayout: "list"
//        }, daVinciUser);
//        renderMsgActions();
//        $(".k-message-list-content > div:last-child")[0].scrollIntoView();
//        initChatCardTooltips($(".k-message-list-content > div:last-child")[0]);
//     }, 3000);
// };
function initWizard() {
    $("#wizard").kendoWizard({
        pager: true,
        done: function (e) {
            e.originalEvent.preventDefault();
            chat.renderMessage({
                type: "text",
                text: 'Great, the new XXX is now saved and accessible here.'
            }, daVinciUser);
            renderEmptyActions();
        },
        steps: [
            {
                title: "Step 1",
                buttons: ["next"],
                form: {
                    orientation: "vertical",
                    formData: {
                        One: "Some value",
                        2: "Another value",
                        Three: "And more value",
                    },
                    items: [
                        { field: "One", label: "Some field:", validation: { required: true } },
                        { field: "2", label: "Another field:", validation: { required: true } },
                        { field: "Three", label: "And another:", validation: { required: true }, hint: "Hint: enter alphanumeric characters only." }
                    ]
                }
            },
            {
                title: "Step 2",
                buttons: ["previous", "done"],
                form: {
                    orientation: "vertical",
                    items: [
                        { field: "ConfigName", label: "Config name", validation: { required: true } },
                        {
                            field: "ConfigOptions",
                            label: "Config options:",
                            validation: { required: true },
                            editor: "RadioGroup",
                            editorOptions: {
                                items: ["One", "2", "Three"],
                                layout: "horizontal",
                                labelPosition: "before"
                            }
                        },
                        { field: "About", label: { text: "About:", optional: true } }
                    ]
                }
            }
        ]
    });
}
function tokenize(input) {
    var current = 0;
    var tokens = [];
    while (current < input.length) {
        var char = input[current];
        if (char === '\\') {
            current++;
            continue;
        }
        if (char === '{') {
            tokens.push({
                type: 'brace',
                value: '{'
            });
            current++;
            continue;
        }
        if (char === '}') {
            tokens.push({
                type: 'brace',
                value: '}'
            });
            current++;
            continue;
        }
        if (char === '[') {
            tokens.push({
                type: 'paren',
                value: '['
            });
            current++;
            continue;
        }
        if (char === ']') {
            tokens.push({
                type: 'paren',
                value: ']'
            });
            current++;
            continue;
        }
        if (char === ':') {
            tokens.push({
                type: 'separator',
                value: ':'
            });
            current++;
            continue;
        }
        if (char === ',') {
            tokens.push({
                type: 'delimiter',
                value: ','
            });
            current++;
            continue;
        }
        if (char === '"') {
            var value = '';
            var danglingQuote = false;
            char = input[++current];
            while (char !== '"') {
                if (current === input.length) {
                    danglingQuote = true;
                    break;
                }
                if (char === '\\') {
                    current++;
                    if (current === input.length) {
                        danglingQuote = true;
                        break;
                    }
                    value += char + input[current];
                    char = input[++current];
                }
                else {
                    value += char;
                    char = input[++current];
                }
            }
            char = input[++current];
            if (!danglingQuote) {
                tokens.push({
                    type: 'string',
                    value: value
                });
            }
            continue;
        }
        var WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }
        var NUMBERS = /[0-9]/;
        if (NUMBERS.test(char) || char === '-' || char === '.') {
            var _value = '';
            if (char === '-') {
                _value += char;
                char = input[++current];
            }
            while (NUMBERS.test(char) || char === '.') {
                _value += char;
                char = input[++current];
            }
            tokens.push({
                type: 'number',
                value: _value
            });
            continue;
        }
        var LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
            var _value2 = '';
            while (LETTERS.test(char)) {
                if (current === input.length) {
                    break;
                }
                _value2 += char;
                char = input[++current];
            }
            if (_value2 == 'true' || _value2 == 'false') {
                tokens.push({
                    type: 'name',
                    value: _value2
                });
            }
            else {
                throw new Error('Invalid token:', _value2 + ' is not a valid token!');
            }
            continue;
        }
        current++;
    }
    return tokens;
}
function strip(tokens) {
    if (tokens.length === 0) {
        return tokens;
    }
    var lastToken = tokens[tokens.length - 1];
    switch (lastToken.type) {
        case 'separator':
            tokens = tokens.slice(0, tokens.length - 1);
            return strip(tokens);
            break;
        case 'number':
            var lastCharacterOfLastToken = lastToken.value[lastToken.value.length - 1];
            if (lastCharacterOfLastToken === '.' || lastCharacterOfLastToken === '-') {
                tokens = tokens.slice(0, tokens.length - 1);
                return strip(tokens);
            }
        case 'string':
            var tokenBeforeTheLastToken = tokens[tokens.length - 2];
            if (tokenBeforeTheLastToken.type === 'delimiter') {
                tokens = tokens.slice(0, tokens.length - 1);
                return strip(tokens);
            }
            else if (tokenBeforeTheLastToken.type === 'brace' && tokenBeforeTheLastToken.value === '{') {
                tokens = tokens.slice(0, tokens.length - 1);
                return strip(tokens);
            }
            break;
        case 'delimiter':
            tokens = tokens.slice(0, tokens.length - 1);
            return strip(tokens);
            break;
    }
    return tokens;
}
function unstrip(tokens) {
    var tail = [];
    tokens.map(function (token) {
        if (token.type === 'brace') {
            if (token.value === '{') {
                tail.push('}');
            }
            else {
                tail.splice(tail.lastIndexOf('}'), 1);
            }
        }
        if (token.type === 'paren') {
            if (token.value === '[') {
                tail.push(']');
            }
            else {
                tail.splice(tail.lastIndexOf(']'), 1);
            }
        }
    });
    if (tail.length > 0) {
        tail.reverse().map(function (item) {
            if (item === '}') {
                tokens.push({
                    type: 'brace',
                    value: '}'
                });
            }
            else if (item === ']') {
                tokens.push({
                    type: 'paren',
                    value: ']'
                });
            }
        });
    }
    return tokens;
}
function generate(tokens) {
    var output = '';
    tokens.map(function (token) {
        switch (token.type) {
            case 'string':
                output += '"' + token.value + '"';
                break;
            default:
                output += token.value;
                break;
        }
    });
    return output;
}
function partialParse(input) {
    return JSON.parse(generate(unstrip(strip(tokenize(input)))));
}
;