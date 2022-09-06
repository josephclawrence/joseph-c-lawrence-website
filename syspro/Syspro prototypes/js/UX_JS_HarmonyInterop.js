// HARMONY Interop

//VARIABLES

var newsFeedCount = 0;

//Used for Geo Location
var address = new Array();
var done = false;
var ClientGeoLocation = null;

var HarmonyInterop = {
    isInitialized: false,
    fieldSelected: "",
    categorySelected: "",
    tableSelected: "",
    AliasType: [],
    AliasValue: [],
    typingInterval: false,
    searchInterval: false,
    currentPostBeatAttachment: [],
    currentPostBeatFileAttachment: [],
    currentPostBeatImageAttachment: [],
    currentPostBeatPDFAttachment: [],
    textCompleteSearchCache: {},
    raiseCustomEvent: function (eventId, data) {
        try {
            var ce = new CustomEvent(eventId, { "detail": data });
            window.dispatchEvent(ce);
        }
        catch (ex) {
            try {
                var ev = document.createEvent("CustomEvent");
                ev.initCustomEvent(eventId, false, false, data);
                window.dispatchEvent(ev);
            }
            catch (ex) {
                throw ex;
            }
        }
    },
    bindAllWidgets: function () {
        if (sysproInterop.harmonyEnabled) {
            $.each($(".harmony-widget"), function (index) {
                console.log("harmony-widget: " + index);
                //Call harmonyInterop
                HarmonyInterop.bindWidget($(this));
            });
        }
    },

    bindWidget: function (DivToBind, SYSPROKeyData) {
        try {

            if (!DivToBind)
                return;
            console.log("00 bindWidget" + DivToBind);

            var ControllerName = DivToBind.data("controllername") + "/" + DivToBind.data("harmonywidgetname");

            var HarmonyWidgetName = DivToBind.data("harmonywidgetname");

            //If its a Add Beat widget then there is no data to be requested from the server

            if (HarmonyWidgetName === "AddBeat") {
                HarmonyInterop.initializeAutoComplete(DivToBind, "");
                //MC : Add Beat now requires the image & name of the user I am commenting this if statement out.
                //    return;
            }

            var beats = DivToBind;
            //MC: parameters used for "SeeMore" functionality
            var parametersIn = {};

            var widgetParameters = DivToBind.data("parameters");

            if (widgetParameters) {
                parametersIn = JSON.parse(widgetParameters);
            }

            //Call into SYSPRP Interop to call the Harmony Service
            sysproInterop.callHarmonyService("GET", ControllerName, parametersIn, function (result) {
                try {
                    var TypedResult = JSON.parse(result);
                    console.log("callHarmonyService-" + DivToBind.data("harmonywidgetname") + "-" + result);
                    //MC used for searches on components : 

                    HarmonyInterop.searchInterval = false;
                    if (TypedResult.ErrorMessage) {
                        SYSPRO_VB.showErrorMessage(TypedResult.ErrorMessage, "Error Calling " + ControllerName);
                    }
                    else {

                        if ((ControllerName === "Trending/GetTrendingItems") || (ControllerName === "Trending/GetTrendingItemsForFollowItem")) {
                            //bind the trending drill down to its event handler
                            HarmonyTrendingChart.bindTrendingDrillDown();
                            //bind trending chart to its div
                            HarmonyTrendingChart.renderChartInDiv(DivToBind, TypedResult, 0);

                        } else {

                            if (ControllerName === "NewsFeeds/Beats") {
                                //   console.log("Processing Feed");
                                //Replace all #'s with nicely templated html  chunks.
                                $.each(TypedResult.Beats, function (index) {
                                    //   console.log("Processing Feed - " + this.Feed +" - "+ this.FollowItems.length);
                                    this.Feed = ProcessFeedHtml(this.Feed, this.FollowItems);
                                });
                                //Now Bind the Show more data
                                //Get the replies template - 
                                $('.ShowMoreNewsFeeds').remove();
                                var HrmReplyTemplate = kendo.template($("#Harmony-ShowMore-Template").html());
                                var result = HrmReplyTemplate(TypedResult);
                                DivToBind.append(result);
                            } else if (ControllerName === "NewsFeeds/WhatYouMissed") {

                                //Replace all #'s with nicely templated html  chunks.
                                //MH - Fixed beats to be looped from Missed Carousel property
                                $.each(TypedResult.MissedCarousel.CarouselPage.Beats, function (index) {

                                    this.Feed = ProcessFeedHtml(this.Feed, this.FollowItems);
                                });

                            }


                            //Parse the result
                            var HarmonyObservable = kendo.observable(TypedResult);
                            //Bind the data to the UI
                            kendo.bind(DivToBind, HarmonyObservable);

                            if (ControllerName === "Filter/GetFilter") {
                                //initializing sliders
                                queryLayoutUIHelpers.initializeViewOnly();
                            }

                        }
                    }
                } catch (e) {

                    SYSPRO_VB.showErrorMessage(e.message, "Error parsing Harmony Service output for " + DivToBind.data("harmonywidgetname"));
                }
            },
            function (error) {
                SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error calling Harmony Service for " + DivToBind.data("harmonywidgetname"));
            });
            $(".harmony-widget-floating-refresh", DivToBind).off("click");
            $(".harmony-widget-floating-refresh", DivToBind).on("click", function (e) {
                HarmonyInterop.bindWidget($(this).closest(".harmony-widget"));
            });
            // MC:  on/off event subscriptions 
            HarmonyInterop.subscribeToComponent(DivToBind);
        } catch (ex) {
            console.log(ex.message);
        }
    },

    DateFormat: function (dateIn) {
        return kendo.toString(dateIn, "yyyy-MM-dd HH:mm:ss.ffffff zzzzz").substring(0, "yyyy-MM-dd HH:mm:ss.ffffff zzzzz".length);
    },

    PostFilter: function (DivToBind, FilterXMLData) {
        try {

            var ControllerName = ControllerName = "Filter/PostXmlFilterData";

            sysproInterop.callHarmonyService("POST", ControllerName, FilterXMLData, function (result) {
                try {
                    var ReturnedResults = JSON.parse(result);
                    if (ReturnedResults.ErrorMessage) {
                        SYSPRO_VB.showErrorMessage(ReturnedResults.ErrorMessage, "Error Calling " + ControllerName);
                    }
                    else {
                        //show filtered beats
                        $(".hrm-filtered-section").removeClass("hide");
                        $(".hrm-filtered-section").addClass("show");

                        //Replace all #'s with nicely templated html  chunks.
                        $.each(ReturnedResults.FilterData[0].HrmFilteredList, function (index) {
                            //   console.log("Processing Feed - " + this.Feed +" - "+ this.FollowItems.length);
                            this.BeatText = ProcessFeedHtml(this.BeatText, this.ReturnedItems);
                        });

                        //Parse the result
                        var HarmonyObservable = kendo.observable(ReturnedResults);
                        //Bind the data to the UI
                        kendo.bind(DivToBind, HarmonyObservable);


                        //initializing sliders
                        queryLayoutUIHelpers.initializeViewOnly();


                    }

                } catch (e) {
                    SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony PostFilter");

                }
            });
        }
        catch (e) {
            SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony PostFilter");
        }

    },

    PostBeat: function (DivToBind, MessageIn, FollowItems) {
        try {

            //Get the Geo Location of where the beat was posted
            var ClientGeoLocation = "";
            var HumanReadableLocation = "";

            address = new Array();

            if (!navigator.geolocation) {
                //Then just post the beat with out Geolocation
                PostBeatToHarmonyServer();
            }
            else {
                //MC : copied this from js file Mithal gave to Debby, unable to post without this change
                try {
                    PostBeatToHarmonyServer();
                    //navigator.geolocation.getCurrentPosition(GetCurrentLocationsuccess, GetCurrentLocationerror);
                } catch (e) {
                    PostBeatToHarmonyServer();
                }
            }

            function GetCurrentLocationsuccess(position) {

                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                ClientGeoLocation = latitude + ';' + longitude;

                console.log("GeoLocation:" + ClientGeoLocation);

                var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=false";

                var AddressJSON = $.getJSON(url, function (json) {
                    HarmonyInterop.Create_Address(json);
                })
                    .done(function (json) {
                        //When this rest call is done
                    })
                    .fail(function () {
                        HumanReadableLocation = '';
                        PostBeatToHarmonyServer();
                    })
                    .always(function () {
                        //Post the beat
                    });

                // Set another completion function for the request above
                AddressJSON.complete(function () {
                    //Post the beat
                    HumanReadableLocation = address['city'];
                    PostBeatToHarmonyServer();
                });
            }

            function GetCurrentLocationerror() {

                console.log("Unable to retrieve your location");
                //We still want to post the beat
                PostBeatToHarmonyServer();
            }

            //Calls the worker service to post the beat
            function PostBeatToHarmonyServer() {
                var parentid = $(".harmony-beat-entry-postbutton", DivToBind.closest(".harmony-beat-entry-parent")).data("beatparentid");
                if (!parentid)
                    parentid = "";

                //Attachments : add Files/Images/PDFS into one array:
                HarmonyInterop.currentPostBeatAttachment = (HarmonyInterop.currentPostBeatFileAttachment).concat((HarmonyInterop.currentPostBeatImageAttachment), (HarmonyInterop.currentPostBeatPDFAttachment));
                var BeatJSON = {
                    "Message": MessageIn,
                    "PostDateTime": HarmonyInterop.DateFormat(new Date()),
                    "ParentId": parentid,
                    "FollowItems": FollowItems,
                    "Attachments": HarmonyInterop.currentPostBeatAttachment,
                    "GeoLocation": ClientGeoLocation,
                    "HumanReadableLocation": HumanReadableLocation
                };

                var ControllerName = ControllerName = "Beats/AddBeat";

                sysproInterop.callHarmonyService("POST", ControllerName, BeatJSON, function (result) {

                    try {

                        //Clear the beat text if the POST was successful                  
                        selectedItems = [];
                        taggedWords = [];
                        finalList = [];
                        replacementsMade = [];
                        //clear the input field
                        DivToBind.html('');
                        //clear attachments:
                        if (HarmonyInterop.currentPostBeatAttachment) {

                            if (HarmonyInterop.currentPostBeatAttachment.length == 4) {
                                $('.harmony-add-attachment-container').removeClass("hide");
                            }
                            HarmonyInterop.currentPostBeatAttachment = [];
                            HarmonyInterop.currentPostBeatFileAttachment = [];
                            HarmonyInterop.currentPostBeatImageAttachment = [];
                            HarmonyInterop.currentPostBeatPDFAttachment = [];

                            $(".harmony-attachment-count").text("0 of 4");
                            //remove line from screen: 
                            var DivToRemove = DivToBind.find(".harmony-added-file");
                            $(".harmony-added-file").remove();
                            $(".harmony-added-image").remove();
                            $(".harmony-added-pdf").remove();
                            $('.harmony-file-attach').addClass('text-muted');
                            $('.harmony-file-attach').removeClass('sys-fg-twitter');
                            $('.harmony-image-attach').addClass('text-muted');
                            $('.harmony-image-attach').removeClass('sys-fg-twitter');
                            $('.harmony-pdf-attach').addClass('text-muted');
                            $('.harmony-pdf-attach').removeClass('sys-fg-twitter');
                            $('.image-attachment').removeClass('disable-mouse-events');
                            $('.file-attachment').removeClass('disable-mouse-events');
                            $('.pdf-attachment').removeClass('disable-mouse-events');

                            $('.file-attachment-list').addClass("hide");
                            $('.image-attachment-list').addClass("hide");
                            $('.pdf-attachment-list').addClass("hide");

                            $('.file-attachment-list').removeClass("show");
                            $('.image-attachment-list').removeClass("show");
                            $('.pdf-attachment-list').removeClass("show");
                        }

                        //If it is a reply then hide/remove the replies div
                        var RepliesDiv = $("#HarmonyReplies");

                        if (!RepliesDiv)
                            $("#HarmonyReplies").remove();
                        //Now rebind the whole screen.
                        HarmonyInterop.bindAllWidgets();

                    } catch (e) {
                        SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony Service");
                    }
                },
                function (error) {
                    SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Calling Harmony Service");
                });
            }

        } catch (e) {
            SYSPRO_VB.showErrorMessage(e.ErrorMessage, "Error Calling Harmony PostBeat");
        }
    },

    //When close button a reply is clicked
    CloseReplyToBeat: function () {
        try {
            $('.HarmonyReplies').remove();
            $('.Harmony-Replies-Follow-Items').remove();
            $('.HrmBeatItem').find(".hrm-key-field-template-reply").removeClass("hrm-key-field-template-reply");
            $('.HrmBeatItem').show();
            if ($("#feed").length > 0) {
                $("#feed").carousel('cycle');
            }
            return;

            var BeatDiv = $(event.target).closest("[data-beatid]");
            var RepliesDiv = $(BeatDiv).find(".HarmonyReplies");
            if (RepliesDiv.is(':visible')) {
                $(RepliesDiv).remove();
                $(BeatDiv).find(".harmony-reply-body").show();
            }
            var HrmBeatItem = BeatDiv.find(".HrmBeatItem");

            if (HrmBeatItem.is(':visible')) {
                $(HrmBeatItem).hide();
            } else {
                $(HrmBeatItem).show();
            }

        } catch (e) {
            SYSPRO_VB.showErrorMessage(e.ErrorMessage, "Error Close Reply to Beat");
        }
    },

    FollowFields: function () {
        try {
            var ControllerName = ControllerName = "Follow/FollowField";

            var BeatJSON = {
                "KeyTable": "InvMaster",
                "KeyColumn": "StockCode",
                "KeyValue": "A100",
                "FollowField": "StockCode"
            };

            sysproInterop.callHarmonyService("GET", ControllerName, BeatJSON, function (result) {
                try {

                    var TypedResult = JSON.parse(result);

                    if (TypedResult.ErrorMessage) {
                        SYSPRO_VB.showErrorMessage(TypedResult.ErrorMessage, "Error Calling " + ControllerName);
                    }

                } catch (e) {
                    SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony Service");
                }
            },
            function (error) {
                SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Calling Harmony Service");
            });

        } catch (e) {

        }
    },

    IsUserFollowing: function () {
        try {
            var ControllerName = ControllerName = "Follow/IsUserFollowing";

            var BeatJSON = {
                "KeyTable": "InvMaster",
                "KeyColumn": "StockCode",
                "KeyValue": "A100",
                "FollowField": "StockCode"
            };

            sysproInterop.callHarmonyService("GET", ControllerName, BeatJSON, function (result) {
                try {

                    var TypedResult = JSON.parse(result);

                    if (TypedResult.ErrorMessage) {
                        SYSPRO_VB.showErrorMessage(TypedResult.ErrorMessage, "Error Calling " + ControllerName);
                    }

                } catch (e) {
                    SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony Service");
                }
            },
            function (error) {
                SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Calling Harmony Service");
            });

        } catch (e) {

        }
    },

    AdmireBeat: function (BeatId, UserId) {
        try {
            var ControllerName = ControllerName = "Beats/AdmireBeat";

            var BeatJSON = {
                "BeatId": BeatId,
                "UserId": UserId
            };

            sysproInterop.callHarmonyService("GET", ControllerName, BeatJSON, function (result) {
                try {

                    var TypedResult = JSON.parse(result);

                    if (TypedResult.ErrorMessage) {
                        SYSPRO_VB.showErrorMessage(TypedResult.ErrorMessage, "Error Calling " + ControllerName);
                    }

                } catch (e) {
                    SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony Service");
                }
            },
            function (error) {
                SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Calling Harmony Service");
            });

        } catch (e) {

        }
    },

    Rebeat: function (BeatId) {
        try {
            var ControllerName = ControllerName = "Beats/ReBeat";

            var BeatJSON = {
                "BeatId": BeatId
            };

            sysproInterop.callHarmonyService("GET", ControllerName, BeatJSON, function (result) {
                try {

                    var TypedResult = JSON.parse(result);

                    if (TypedResult.ErrorMessage) {
                        SYSPRO_VB.showErrorMessage(TypedResult.ErrorMessage, "Error Calling " + ControllerName);
                    }

                } catch (e) {
                    SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony Service");
                }
            },
            function (error) {
                SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Calling Harmony Service");
            });

        } catch (e) {

        }
    },

    UnAdmireBeat: function (BeatId, UserId) {
        try {
            var ControllerName = ControllerName = "Beats/UnAdmireBeat";

            var BeatJSON = {
                "BeatId": BeatId,
                "UserId": UserId
            };

            sysproInterop.callHarmonyService("GET", ControllerName, BeatJSON, function (result) {
                try {
                    var TypedResult = JSON.parse(result);

                    if (TypedResult.ErrorMessage) {

                        SYSPRO_VB.showErrorMessage(TypedResult.ErrorMessage, "Error Calling " + ControllerName);
                    }

                } catch (e) {
                    SYSPRO_VB.showErrorMessage(e.message, "Error unadmiring beat");
                }
            },
            function (error) {
                SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error unadmiring beat");
            });

        } catch (e) {

        }

    }, UploadImage: function (ImageJSON) {
        try {
            var ControllerName = "Images/UpLoadImage";

            sysproInterop.callHarmonyService("POST", ControllerName, ImageJSON, function (result) {

                try {

                    var TypedResult = JSON.parse(result);

                    if (TypedResult.ErrorMessage) {

                        SYSPRO_VB.showErrorMessage(TypedResult.ErrorMessage, "Error Calling " + ControllerName);
                    }
                    else {
                        //Bind the data to the UI
                        $("#ProfileImage").attr("src", TypedResult.ProfilePicture);
                        $("#ProfileCard").toggle().toggle();
                        console.log("UploadImage - Performed Profile Bind");
                    }

                } catch (e) {
                    SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony Service");
                }
            },
            function (error) {
                SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Calling Harmony Service");
            });

        } catch (e) {

        }
    },
    UploadAttachment: function (ImageJSON) {
        try {
            var ControllerName = "Beats/UploadAttachment";

            sysproInterop.callHarmonyService("POST", ControllerName, ImageJSON, function (result) {

                try {

                    var TypedResult = JSON.parse(result);

                    if (TypedResult.ErrorMessage) {

                        SYSPRO_VB.showErrorMessage(TypedResult.ErrorMessage, "Error Calling " + ControllerName);
                    }
                    else {
                        //Bind the data to the UI
                        console.log("UploadImage - Performed Profile Bind");
                    }

                } catch (e) {
                    SYSPRO_VB.showErrorMessage(e.message, "Error Uploading Attachment");
                }
            },
            function (error) {
                SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Uploading Attachment");
            });

        } catch (e) {
            SYSPRO_VB.showErrorMessage(e.ErrorMessage, "Error Uploading Attachment");
        }
    },

    BrowseImage: function () {

        var ImageData = sysproInterop.selectImage();

        if (!ImageData) {
            HarmonyInterop.UploadImage(ImageData);
        }

    },

    FollowAlias: function () {
        try {
            var webcall = "Follow/FollowField";
            var DataIN = {
                "KeyTable": "InvMaster",
                "KeyColumn": "StockCode",
                "KeyValue": "A100",
                "FollowField": "StockCode",
                "Context": "",
            };

            sysproInterop.callHarmonyService("GET", webcall, DataIN, function (result) {
                try {
                    var TypedResult = JSON.parse(result);

                    if (TypedResult.ErrorMessage) {
                        SYSPRO_VB.showErrorMessage(TypedResult.ErrorMessage, "Error Calling " + ControllerName);
                    }

                } catch (e) {
                    SYSPRO_VB.showErrorMessage(e.message, "Error unadmiring beat");
                }
            },
 function (error) {
     SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error unadmiring beat");
 });


        } catch (ex) {

        }
    },

    //Calls the service to get more beats
    ShowMoreBeats: function (e) {
        try {

            var follow = e.parentNode.attributes["data-follow"].nodeValue;
            var friends = e.parentNode.attributes["data-friends"].nodeValue;
            var popular = e.parentNode.attributes["data-popular"].nodeValue;
            var loose = e.parentNode.attributes["data-loose"].nodeValue;

            var DataIn = {
                "FollowItemId": follow,
                "FriendId": friends,
                "PopularId": popular,
                "LooseId": loose,
            };

            var ControllerName = "NewsFeeds/ShowMoreBeats";

            sysproInterop.callHarmonyService("GET", ControllerName, DataIn, function (result) {
                try {
                    var TypedResult = JSON.parse(result);

                    //Replace all #'s with nicely templated html  chunks.
                    $.each(TypedResult.Beats, function (index) {
                        this.Feed = ProcessFeedHtml(this.Feed, this.FollowItems);
                    });

                    //Parse the result
                    var HarmonyObservable = kendo.observable(TypedResult);

                    //Bind the data to the UI
                    var beats_template_show_more = kendo.template($("#beats_template").html());
                    var beatsDiv = $("#Beat");

                    for (var key in TypedResult.Beats) {

                        var htmlresult = beats_template_show_more(TypedResult.Beats[key]);
                        $(".Show-More-Beats-Here").append(htmlresult);
                    }

                    //Get the replies template - 
                    $('.ShowMoreNewsFeeds').remove();

                    var beatsDiv = $("#Beats");
                    var Show_More_Beats_Template = kendo.template($("#Harmony-ShowMore-Template").html());
                    var Show_More_Beats_Template_Data = Show_More_Beats_Template(TypedResult);
                    beatsDiv.append(Show_More_Beats_Template_Data);

                    if (TypedResult.ErrorMessage) {

                        SYSPRO_VB.showErrorMessage(TypedResult.ErrorMessage, "Error Calling " + ControllerName);
                    }

                } catch (e) {
                    SYSPRO_VB.showErrorMessage(e.message, "Error unadmiring beat");
                }
            },
         function (error) {
             SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error unadmiring beat");
         });

        } catch (ex) {
            SYSPRO_VB.showErrorMessage("Error on Show More Beats : " + ex.message);
        }
    },

    InitializeAttachments: function () {

        //Attachments show and hide list of attachments
        //var fileItemsClick = $(".file-attachment");
        //fileItemsClick.off('click');
        //fileItemsClick.on('click', function () {
        //    console.log("file-attachment on  click")
        //    $('.file-attachment').toggleClass('beat-click');
        //    $('.harmony-file-attach').toggleClass('sys-fg-twitter');
        //    $('.pdf-attachment').toggleClass('profileDisable');
        //    $('.image-attachment').toggleClass('profileDisable');
        //});
        //var imageItemsClick = $(".image-attachment");
        //imageItemsClick.on('click', function () {
        //    $('.image-attachment').toggleClass('beat-click');
        //    $('.harmony-image-attach').toggleClass('sys-fg-twitter');
        //    $('.pdf-attachment').toggleClass('profileDisable');
        //    $('.file-attachment').toggleClass('profileDisable');
        //});
        //var pdfItemsClick = $(".pdf-attachment");
        //pdfItemsClick.on('click', function () {
        //    $('.pdf-attachment').toggleClass('beat-click');
        //    $('.harmony-pdf-attach').toggleClass('sys-fg-twitter');
        //    $('.image-attachment').toggleClass('profileDisable');
        //    $('.file-attachment').toggleClass('profileDisable');

        //});

        ////Init Suggestions

        ////---------------------------
        ////  Beats Click - show Add beats action drill down
        ////---------------------------
        //var previewBeatsClick = $('.harmony-beat-entry-preview');
        //previewBeatsClick.on('click', function () {
        //    $('.harmony-beat-entry-preview').toggleClass('beat-click');
        //});
        //previewBeatsClick.off('click', function () {
        //});
        //var actionBeatsClick = $('.harmony-beat-entry-action');
        //actionBeatsClick.on('click', function () {
        //    $('.harmony-beat-entry-action').toggleClass('beat-click');

        //});
        //actionBeatsClick.off('click');
        //var beatSuggestionClick = $('.harmony-what-to-beat');
        //beatSuggestionClick.on('click', function () {
        //    $('.harmony-what-to-beat').toggleClass('beat-click');
        //    $('.harmony-light-switch').toggleClass('sys-fg-twitter');
        //});
        ////added the off click but then this is never triggered:
        ////beatSuggestionClick.off('click');

        //var actionBeatClose = $(".harmony-beat-entry-action-close");
        //actionBeatClose.on('click', function () {
        //    $('.harmony-beat-entry-action').toggleClass('beat-click');
        //    $('.harmony-beat-entry-preview').toggleClass('beat-click');
        //});

    },

    //    }
    //},

    BindHarmonyNewsFeed: function (result) {
        try {

            // Activate carousel:
            //--------------------------
            $('.carousel').carousel({
                interval: 4000
            });

            //In and around newsFeeds
            $.each(result.InAndAroundSYSPRO.Pages, function (index)
            { this.feed = this.feed.replace(/#[a-z0-9A-Z]+/g, '<span class="text-primary">$&</span>') });

            //--------------------------
            // bind data to NewsAlert divs:
            //--------------------------
            kendo.bind($("#NewsAlert"), result);

        } catch (ee) {
            SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Binding Harmony NewsFeed");
        }

    },

    initializeAutoComplete: function (divIn, parentId) {
        try {

            $(".harmony-beat-entry-postbutton", divIn).off('click');
            $(".harmony-beat-entry-postbutton", divIn).on('click', function () {
                PostBeatClicked($(".harmony-beat-entry", divIn));
                //MC:  recent post button to hide post screen and display 'summary' screen:
                $('.harmony-beat-entry-preview').show();
                $('.harmony-beat-entry-action').toggleClass("hide");
                $('.harmony-beat-entry-action').toggleClass("show");
                //MC:  carousel can cycle again:
                if ($("#feed").length > 0) {
                    $("#feed").carousel('cycle');

                }
            });
            $(".harmony-beat-entry-postbutton", divIn).data("beatparentid", parentId);
            //MC:  This var will contain the key selected 
            var searchText;

            if ($('.harmony-beat-entry', divIn).data("textcompleteinitialized") !== "true") {
                //    var textcomplete = new Textcomplete($('#sysBeat'));
                $('.harmony-beat-entry', divIn).textcomplete([
                //textcomplete.register([
                    {
                        //Rexexp: \B matches at any position between two word characters as well as at any position between two non-word characters
                        match: /\B#(\w{1,})$/,  //MUST be a RegExp or a Function which returns a RegExp MUST contain capturing groups and SHOULD end with $
                        //The searchFunc MUST be a Function which gets two arguments, term and callback
                        search: function (term, callback) { //The word captured by indexNumber-th group is going to be the term argument 
                            console.log("search performed: " + term);
                            var holder = this;
                            HarmonyInterop.tableSelected = '';
                            HarmonyInterop.categorySelected = '';
                            HarmonyInterop.fieldSelected = '';
                            HarmonyInterop.AliasType = [];
                            HarmonyInterop.AliasValue = [];
                            searchText = term;
                            if (!HarmonyInterop.typingInterval) {
                                HarmonyInterop.typingInterval = true;
                                // setTimeout(function () {
                                console.log("search GetRootItems Initialized - " + term + " - " + searchText);
                                sysproInterop.callHarmonyService("GET", "AutoComplete/GetRootItems", { QueryValue: term }, function (result) {
                                    try {
                                        HarmonyInterop.typingInterval = false;
                                        var TypedResult = JSON.parse(result);

                                        console.log("search GetRootItems Completed - " + term + " - results count - " + TypedResult.length);
                                        //It MUST invoke callback with an Array. It is guaranteed that the function will be invoked exclusively even though it contains async call.
                                        callback(TypedResult);
                                    } catch (e) {
                                        HarmonyInterop.typingInterval = false;
                                        SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony Service");
                                        callback([]);
                                    }
                                },
                                          function (error) {
                                              HarmonyInterop.typingInterval = false;
                                              SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Calling Harmony Service");
                                              callback([]);
                                          });

                            }
                        },
                        index: 1,
                        template: function (rootItem) {
                            var templateTest = "";
                            if (rootItem.Type === "History") {
                                templateTest = Alias_Template(rootItem);
                            }
                            else {
                                templateTest = HistoryNew_Template(rootItem);
                            }
                            return templateTest;

                        },
                        replace: function (rootItem) {
                            HarmonyInterop.AliasType.push(rootItem);
                            return '#' + rootItem.DataField1;

                        }
                    },
                //                             2nd Level Drill Down - Category
                //              This TextComplete check for sub details for categories
                //              Categories being Supplier / Contact / Customer / Stock Code
                //          -----------------------------------------------------------------

                    {
                        //Rexexp: fields starting with # the characters and containing a period.
                        match: /(\B#\w*\b\.*(\S[^\.\s]*))$/, ///(\B#\w*\b\.\w*)$/,
                        search: function (term, callback) {
                            //term contains e.g. '#Contact.'
                            //need the text thats typed after the "." to match this with subCategory
                            //Need to identify the data that will be generated.
                            //Containing category selected:
                            var startPosition = term.indexOf("#") + 1;
                            var endPosition = term.indexOf("."), startPosition;
                            searchText = term;
                            HarmonyInterop.categorySelected = term.substring(startPosition, endPosition);
                            HarmonyInterop.fieldSelected = '';
                            HarmonyInterop.AliasValue = [];
                            var subCatTerm = term.substr(term.indexOf(".") + 1);
                            if (!subCatTerm)
                                subCatTerm = "";
                            if (!HarmonyInterop.typingInterval) {
                                HarmonyInterop.typingInterval = true;
                                console.log("search GetDataList initialized - " + subCatTerm + " - " + HarmonyInterop.categorySelected + " - " + term);
                                sysproInterop.callHarmonyService("GET", "AutoComplete/GetDataList", { QueryValue: subCatTerm, RootName: HarmonyInterop.categorySelected }, function (result) {
                                    try {
                                        //alert("GetDataList returned " + HarmonyInterop.typingInterval);
                                        HarmonyInterop.typingInterval = false;

                                        var TypedResult = JSON.parse(result);
                                        if (TypedResult.length > 0) {
                                            HarmonyInterop.tableSelected = TypedResult[0].DataField3;
                                            HarmonyInterop.categorySelected = TypedResult[0].Type;
                                            //if user did not select by clicking this will still be empty - lets set it manually:
                                            if (HarmonyInterop.AliasType.length == 0) {
                                                var manualObject = {
                                                    "DataField1": HarmonyInterop.categorySelected,
                                                    "DataField2": HarmonyInterop.tableSelected,
                                                    "DataField3": "",
                                                    "Key": HarmonyInterop.categorySelected,
                                                    "Type": "Category"
                                                };
                                                //alert("type : " + type);
                                                HarmonyInterop.AliasType.push(manualObject);

                                                //alert("HarmonyInterop.AliasType : " + JSON.stringify(HarmonyInterop.AliasType));
                                            }
                                        }

                                        callback(TypedResult);

                                    } catch (e) {
                                        HarmonyInterop.typingInterval = false;
                                        SYSPRO_VB.showErrorMessage(e.message, "Error Calling GetDataList");
                                        callback([]);
                                    }
                                },
                          function (error) {
                              HarmonyInterop.typingInterval = false;
                              SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Calling GetDataList");
                              callback([]);
                          });
                            }
                        },
                        index: 1,

                        template: function (subCategory) {
                            var templateTest = Category_Template(subCategory);
                            return templateTest;
                        },
                        replace: function (subCategory) {
                            //HarmonyInterop.categorySelected = subCategory.Type;
                            HarmonyInterop.AliasValue.push(subCategory);
                            AliasFullValue = subCategory;
                            HarmonyInterop.fieldSelected = subCategory.DataField1;
                            return '#' + HarmonyInterop.getAlias(subCategory.Type, subCategory.DataField1, subCategory.Key, "");

                        }
                    },

                //                                      3rd Level Drill Down 
                //                                  Once a category is selected, 
                //                  a list of all the fields available (table fields?) should appear
                //              ---------------------------------------------------------------------
                    {

                        //Rexexp: fields starting with # the characters and containing a SECOND period.
                        match: /(\B#\w*\b\..*\.\w*)$/,  //(\B#\w*\b.*\..*\..\w*)$/,//(\B#\w*\b\.*?(\.\w*)(\w*\b\.\w*))$/
                        search: function (term, callback) {
                            //term contains e.g. '#Contact.000001.'
                            //need the subCategory to identify the fields that will be generated.
                            var startPosition = term.indexOf("#") + 1;
                            var endPosition = term.indexOf("."), startPosition;
                            //HarmonyInterop.categorySelected = term.substring(startPosition, endPosition);
                            //update Fields dataset with selected category
                            searchText = term;
                            var startPositionNext = term.indexOf(".") + 1;
                            var endPositionNext = (term.substring(startPositionNext) + 1).indexOf(".") + startPositionNext;
                            //select characters entered after the second period
                            if (HarmonyInterop.fieldSelected == "") {
                                HarmonyInterop.fieldSelected = term.substring(startPositionNext, endPositionNext);

                            }
                            var searchValue = term.substring(endPositionNext + 1);

                            console.log("search  GetDataFields initialized - " + searchValue + " - " + HarmonyInterop.tableSelected + " - " + HarmonyInterop.fieldSelected + " - " + term);
                            //only continue if table is defined.

                            if (HarmonyInterop.tableSelected != null && HarmonyInterop.tableSelected != "") {
                                if (!HarmonyInterop.typingInterval) {
                                    HarmonyInterop.typingInterval = true;

                                    sysproInterop.callHarmonyService("GET", "AutoComplete/GetDataFields", { QueryValue: searchValue, RootName: HarmonyInterop.tableSelected, KeyColumnName: HarmonyInterop.categorySelected, KeyFieldValue: HarmonyInterop.fieldSelected }, function (result) {
                                        try {
                                            HarmonyInterop.typingInterval = false;
                                            var TypedResult = JSON.parse(result);
                                            if (TypedResult.length > 0) {
                                                var type = TypedResult[0].Type;

                                                HarmonyInterop.fieldSelected = TypedResult[0].DataField1;
                                                //if user did not select by clicking this will still be empty - lets set it manually:
                                                if (HarmonyInterop.AliasValue.length == 0) {
                                                    var manualObject = [{
                                                        "DataField1": HarmonyInterop.fieldSelected,
                                                        "DataField2": "",
                                                        "DataField3": HarmonyInterop.tableSelected,
                                                        "Key": "",
                                                        "Type": type.toString()
                                                    }];
                                                    HarmonyInterop.AliasValue.push(manualObject);
                                                }
                                            }


                                            callback(TypedResult);
                                        } catch (e) {
                                            HarmonyInterop.typingInterval = false;
                                            SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony Service");
                                            callback([]);
                                        }
                                    },
                                   function (error) {
                                       HarmonyInterop.typingInterval = false;
                                       SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Calling Harmony Service");
                                       callback([]);
                                   });
                                }
                            }
                        },
                        index: 1,

                        template: function (field) {
                            var selections = "<small > " + field.Type + " : " + "</small><small> " + field.Key + '</small>';
                            return selections;
                        },
                        replace: function (field) {
                            //MC added function call : update list containing table/field selection details.
                            var aliasOutput = UpdateSelectionList(field, $('.harmony-beat-entry', divIn));
                            //MC selectedItems.length is already increased.. less one to stay insycn
                            var htmlHolder = GenerateHtmlBlockFromHashAlias(aliasOutput, HarmonyInterop.categorySelected, HarmonyInterop.fieldSelected, field.Type, field.Key.replace(/[^\w]/g, "_"), true, "", selectedItems.length - 1);
                            AddReplacementsMadeItem("#" + aliasOutput, htmlHolder);
                            return htmlHolder;
                        }
                    },
                //                             4 Text Replacement options
                //             Activates when @ was pressed and lists all users
                //    ---------------------------------------------------------------------------------

                    {
                        //Rexexp: fields starting with @ .
                        match: /\B@(\w*)$/,
                        search: function (term, callback) {
                            //       term contains e.g. '@Dani'
                            HarmonyInterop.tableSelected = '';
                            HarmonyInterop.categorySelected = '';
                            HarmonyInterop.fieldSelected = '';
                            HarmonyInterop.AliasType = [];
                            HarmonyInterop.AliasValue = [];
                            if (!HarmonyInterop.typingInterval) {
                                HarmonyInterop.typingInterval = true;

                                sysproInterop.callHarmonyService("GET", "AutoComplete/GetUserList", { QueryValue: term }, function (result) {
                                    try {

                                        HarmonyInterop.typingInterval = false;
                                        var TypedResult = JSON.parse(result);
                                        callback(TypedResult);
                                    } catch (e) {
                                        HarmonyInterop.typingInterval = false;
                                        SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony Service");
                                        callback([]);
                                    }
                                },
                                 function (error) {
                                     HarmonyInterop.typingInterval = false;
                                     SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Calling Harmony Service");
                                     callback([]);
                                 });
                            }
                        },
                        index: 1,

                        template: function (user) {
                            var scenarioSelection = null;
                            if (user.Type === "History") {
                                scenarioSelection = User_Alias_Template(user);
                            }
                            else {
                                scenarioSelection = user_Template(user);
                            }
                            return scenarioSelection;
                        },
                        replace: function (user) {
                            console.log("user: " + JSON.stringify(user));
                            if (user.Key) {
                                AliasUser = user;
                                var htmlHolder = GenerateHtmlBlockFromHashAlias(user.Key, user.Key, null, null, null, true, null, selectedItems.length);
                                AddReplacementsMadeItem("@" + user.Key, htmlHolder);
                                AddSelectedItem($('.harmony-beat-entry', divIn), "@" + user.Key, "HrmUser", "UserId", "", "", "", "");
                                return htmlHolder;
                            }
                        }
                    }

                ]);

                //overriding/adding to 'keyup' with 'input' event
                //If this is not included the dropdown will not be triggered in SYSPRO
                //   $('.harmony-beat-entry', divIn).on('input', function () {
                if (callLayerInterop.interopType === "SYSPRORehostedBrowser") {
                    $('.harmony-beat-entry', divIn).on('DOMCharacterDataModified', function () {
                        console.log("sysbeat input");
                        var textComplete = $(this).data('textComplete');
                        // Cursor has not set yet. And wait 100ms to skip global click event.
                        setTimeout(function () {
                            // Cursor is ready.
                            textComplete.trigger();
                        }, 100);

                    });
                }
                //$('#sysBeat').off('textinput');
                //$('#sysBeat').on('textinput', function () {
                //    console.log("sysbeat input");
                //    //var textComplete = $(this).data('textComplete');
                //    //// Cursor has not set yet. And wait 100ms to skip global click event.
                //    //setTimeout(function () {
                //    //    // Cursor is ready.
                //    //    textComplete.trigger();
                //    //}, 100);

                //});
                var editable = null;
                if ($('.harmony-beat-entry', divIn).length > 0)
                    editable = $('.harmony-beat-entry', divIn)[0];
                if (editable) {
                    editable.addEventListener("input", function () {

                        ProcessMissingTags($('.harmony-beat-entry', divIn));
                    }, false);
                    editable.addEventListener("DOMNodeInserted", function () {

                        ProcessMissingTags($('.harmony-beat-entry', divIn));
                    }, false);
                    editable.addEventListener("DOMNodeRemoved", function () {

                        ProcessMissingTags($('.harmony-beat-entry', divIn));
                    }, false);
                    editable.addEventListener("DOMCharacterDataModified", function () {

                        ProcessMissingTags($('.harmony-beat-entry', divIn));
                    }, false);
                }

                //var contents = $('#sysBeat').val();
                //$('#sysBeat').blur(function () {
                //    console.log("sysbeat Blur + " + contents);
                //})
                //MC Done ================================================
                $('.harmony-beat-entry', divIn).data("textcompleteinitialized", "true");
            }
            //  alert('done');
        } catch (ex) {
            SYSPRO_VB.showErrorMessage("Initailize Beat Entry - " + ex.message);
        }

    }

    //----------------------------------------------------------------------------------------//
    //See More button click will increase the number of items displayed
    // ps: FilterBeats component calls the post method and not bindWidget method
    //----------------------------------------------------------------------------------------//
, seeMore: function (e) {

    try {
        var div = $(e).closest(".harmony-widget");
        var searchValue = $(div).find(".harmony-search-text").val();
        if (div.data("parameters")) {
            //Edit existing seeMoreClicks value with click count
            var dataParameters = JSON.parse(div.data("parameters"));
            var seeMoreClicks = dataParameters["seemore"];
            if (typeof seeMoreClicks != "undefined") {
                seeMoreClicks = (parseFloat(seeMoreClicks) + 1).toString();
                div.data("parameters", '{ "seemore": "' + seeMoreClicks + '",  "search":"' + searchValue + '" }');

            } else {
                div.data("parameters", '{ "seemore": "2",  "search":"' + searchValue + '" }');
            }

        } else {
            div.data("parameters", '{ "seemore": "2",  "search":"' + searchValue + '" }');

        }
        if ($(e).hasClass("hrm-see-more-beats")) {
            HarmonyInterop.postFilterNewsFeeds(e);
        } else
            HarmonyInterop.bindWidget(div);
    } catch (e) {
        SYSPRO_VB.showErrorMessage("Error returned when increasing items : " + e.message);
    }
},
    //----------------------------------------------------------------------------------------//
    //See More Filter Component
    // Filter Components contains 3 see more buttons - setting separate parameters for each
    //----------------------------------------------------------------------------------------//
    seeMoreFilter: function (e) {
        console.log("seeMoreFilter");
        try {
            var div = $(e).closest(".harmony-widget");
            //identify which button was clicked:
            var selection;
            if ($(e).hasClass("hrm-see-more-follow-items")) {
                selection = "followitems";
            } else if ($(e).hasClass("hrm-see-more-users")) {
                selection = "users";
            }
            if (div.data("parameters")) {
                //Edit existing seeMoreClicks value with click count
                var dataParameters = JSON.parse(div.data("parameters"));
                var seeMoreUsers = dataParameters["seeMoreUsers"];
                var seeMoreFollowItems = dataParameters["seeMoreFollowItems"];

                if (typeof seeMoreUsers != "undefined" && typeof seeMoreFollowItems != "undefined") {
                    if (selection == "followitems")
                        seeMoreFollowItems = (parseFloat(seeMoreFollowItems) + 1).toString();
                    else
                        seeMoreUsers = (parseFloat(seeMoreUsers) + 1).toString();

                    div.data("parameters", '{ "seeMoreUsers": "' + seeMoreUsers + '" ,"seeMoreFollowItems": "' + seeMoreFollowItems + ' "}');

                } else {
                    div.data("parameters", '{ "seeMoreUsers": "1", "seeMoreFollowItems": "1" }');
                }

            } else {
                if (selection == "followitems")
                    div.data("parameters", '{ "seeMoreUsers": "1", "seeMoreFollowItems": "2"}');
                else
                    return div.data("parameters", '{ "seeMoreUsers": "2", "seeMoreFollowItems": "1"}');
            }
            HarmonyInterop.bindWidget(div);
        } catch (e) {
            SYSPRO_VB.showErrorMessage("Error returned when increasing items : " + e.message);
        }
    },

    //----------------------------------------------------------------------------------------//
    //Update Follow Item list
    //----------------------------------------------------------------------------------------//
    addFollowItem: function (e) {
        try {
            var div = $(e).closest(".follow-item");
            var divHarmonyWidget = $(e).closest(".harmony-widget");
            var Beat = div.html();

            var followItemId = $(div).find(".follow-item-id").data("followitemid");
            var DataIn = {
                "FollowItemId": followItemId
            };
            var ControllerName = ControllerName = "Trending/PostHrmUserFollowItem";
            sysproInterop.callHarmonyService("GET", ControllerName, DataIn, function (result) {
                try {
                    var itemAdded = div.find(".follow-item-added");
                    itemAdded.removeClass("btn-follow");
                    itemAdded.removeClass("text-muted");
                    itemAdded.addClass("btn-following");
                    itemAdded.addClass("sys-bg-twitter");
                    itemAdded.css("color", "white");
                    itemAdded.html("Following");
                    HarmonyInterop.bindAllWidgets();
                } catch (e) {
                    SYSPRO_VB.showErrorMessage("Unable to add selection : " + e.message);
                }
            });

        } catch (e) {
            SYSPRO_VB.showErrorMessage("Unable to add selection : " + e.message);
        }
    },

    //----------------------------------------------------------------------------------------//
    //Remove Follow Item list
    //----------------------------------------------------------------------------------------//
    deleteFollowItem: function (e) {
        try {
            var div = $(e).closest(".follow-item");
            var divHarmonyWidget = $(e).closest(".harmony-widget");
            var Beat = div.html();
            var followItemId = $(div).find(".follow-item-id").data("followitemid");

            var DataIn = {
                "FollowItemId": followItemId
            };
            var ControllerName = ControllerName = "Trending/DeleteHrmUserFollowItem";
            sysproInterop.callHarmonyService("GET", ControllerName, DataIn, function (result) {
                try {
                    var itemAdded = div.find(".follow-item-added");
                    itemAdded.addClass("btn-follow");
                    itemAdded.addClass("text-muted");
                    itemAdded.removeClass("btn-following");
                    itemAdded.removeClass("sys-bg-twitter");
                    itemAdded.css("color", "#888888");
                    //itemAdded.removeClass("sys-fg-white");
                    //itemAdded.css("border-color", "");
                    itemAdded.html("Follow");
                    HarmonyInterop.bindAllWidgets();
                } catch (e) {
                    SYSPRO_VB.showErrorMessage("Unable to remove follow item : " + e.message);
                }
            });
            //setTimeout(HarmonyInterop.bindWidget(divHarmonyWidget),5000);
        } catch (e) {
            SYSPRO_VB.showErrorMessage("Unable to remove follow item  : " + e.message);
        }
    },
    OpenAttachment: function (e) {
        try {
            var Uri = e.attributes["data-HrmAttachmentUri"].nodeValue;
            var FileName = e.attributes["data-MediaFileName"].nodeValue;


            sysproInterop.openFile(function () { }, function (e) { }, Uri, FileName);

        } catch (e) {
            sysproInterop.showErrorMessage(e.message);
        }
    },
    //----------------------------------------
    //  Change profile image
    //----------------------------------------
    uploadProfilePicture: function () {
        sysproInterop.selectImage(function (e) { HarmonyInterop.UploadImage(e); $("#ProfileImage").attr('src', ""); });
    },
    //------------------------------------------------------------------//
    //  This function will take selected text and add to input span
    //------------------------------------------------------------------//
    suggestiveBeatSelection: function (e) {
        console.log("suggestiveBeatSelection");
        //hide suggestion
        $('.harmony-beat-suggestion').toggleClass("hide");
        $('.harmony-beat-suggestion').toggleClass("show");
        //switch off lightbulb
        $('.harmony-light-switch').toggleClass('sys-fg-twitter');

        //find closest div & text selection
        var div = $(e).closest(".harmony-suggestion-selection");
        var suggestText = $(".active .harmony-suggestive-text").html();
        //select text already entered maybe:
        var postEntry = $(".harmony-beat-entry").html();
        //Set focus and put caret at end of text:
        $(".harmony-beat-entry").focus().html(postEntry + suggestText);

    },
    //----------------------------------------
    //  Add File Attachments to Beat 
    // Change color
    // Increase total
    // add span label & display total
    //----------------------------------------
    uploadFileAttachment: function (e) {
        var div = $(e).closest(".harmony-attachments");

        sysproInterop.selectFile(function (e) {
            console.log("uploadFileAttachment e: " + e);

            var attachmentKey = 1;

            //Get filename from path:
            if (HarmonyInterop.currentPostBeatFileAttachment.length > 0) {

                for (var i = 0; i < HarmonyInterop.currentPostBeatFileAttachment.length; i++) {
                    if (HarmonyInterop.currentPostBeatFileAttachment[i].index > attachmentKey) attachmentKey = HarmonyInterop.currentPostBeatFileAttachment[i].index;
                };
                attachmentKey++;
                e.index = attachmentKey;
                HarmonyInterop.currentPostBeatFileAttachment.push(e);
            } else {
                e.index = attachmentKey;
                HarmonyInterop.currentPostBeatFileAttachment.push(e);
            }
            //change background color of icon
            if (HarmonyInterop.currentPostBeatFileAttachment.length === 1) {
                $('.harmony-file-attach').addClass('sys-fg-twitter');
                //disable pdf unclick selection
                $('.file-attachment').toggleClass('disable-mouse-events');
            } else if (HarmonyInterop.currentPostBeatFileAttachment.length === 0) {
                $('.harmony-file-attach').addClass('text-muted');
                $('.harmony-file-attach').removeClass('sys-fg-twitter');
            } else if (HarmonyInterop.currentPostBeatFileAttachment.length === 4) {
                //allow only 4 files to be uploaded:
                $('.harmony-add-attachment-container').addClass("hide");
            }

            //Add number of attachments:
            var attachmentDiv = div.find(".harmony-attachment-count");
            attachmentDiv.addClass("sys-fg-twitter text-center");
            attachmentDiv.text(HarmonyInterop.currentPostBeatFileAttachment.length + " of 4");


            // var indexFileAttachment = HarmonyInterop.currentPostBeatFileAttachment.length - 1;
            var filename = e.FilePath.split('\\').pop();

            //Img source : preview image
            var filePreview = "data:image/png;base64," + e.FileBase64;
            //alert(filePreview);
            ////Add new attachment to list
            var addDiv = div.find(".harmony-add-file-container");
            addDiv.append("<div class='harmony-added-file'><a href='#' class='sys-mg-r-10 thumbnail harmony-attachment-container' style='width:100px !important' ><img src='" + filePreview + "' style='max-width:80%; max-height: 80%;; position:relative;' ><i class='harmony-attachment-container-close material-icons ' style='position:absolute; top:4%; margin-left:15%;'>close</i><div class='text-muted  sys-txt-sm sys-pd-t-5'>" + filename + "</div><div class='harmony-file-attachment-index' style='display:none'>" + attachmentKey + "</div></a></div>");

        }, null, "AllFiles");
    },
    //----------------------------------------
    //  Add Image Attachments to Beat 
    // Change color
    // Increase total
    // add span label & display total
    //----------------------------------------
    uploadImageAttachment: function (e) {
        var div = $(e).closest(".harmony-attachments");

        sysproInterop.selectFile(function (e) {
            var attachmentKey = 1;

            //Get filename from path:
            if (HarmonyInterop.currentPostBeatImageAttachment.length > 0) {

                for (var i = 0; i < HarmonyInterop.currentPostBeatImageAttachment.length; i++) {
                    if (HarmonyInterop.currentPostBeatImageAttachment[i].index > attachmentKey) attachmentKey = HarmonyInterop.currentPostBeatImageAttachment[i].index;
                };
                attachmentKey++;
                e.index = attachmentKey;
                HarmonyInterop.currentPostBeatImageAttachment.push(e);
            } else {
                e.index = attachmentKey;
                HarmonyInterop.currentPostBeatImageAttachment.push(e);
            }

            //change background color of icon
            if (HarmonyInterop.currentPostBeatImageAttachment.length === 1) {
                $('.harmony-image-attach').addClass('sys-fg-twitter');
                //disable pdf unclick selection
                $('.image-attachment').toggleClass('disable-mouse-events');
            } else if (HarmonyInterop.currentPostBeatImageAttachment.length === 0) {
                $('.harmony-image-attach').addClass('text-muted');
                $('.harmony-image-attach').removeClass('sys-fg-twitter');
            } else if (HarmonyInterop.currentPostBeatImageAttachment.length === 4) {
                //allow only 4 files to be uploaded:
                $('.harmony-add-attachment-container').addClass("hide");
            }
            //Add number of attachments:
            var attachmentDiv = div.find(".harmony-attachment-count");
            attachmentDiv.addClass("sys-fg-twitter text-center");
            attachmentDiv.text(HarmonyInterop.currentPostBeatImageAttachment.length + " of 4");

            //Get filename from path:
            var indexImageAttachment = HarmonyInterop.currentPostBeatImageAttachment.length - 1;
            var imageName = e.FilePath.split('\\').pop();

            //Img source : preview image
            var imagePreview = "data:image/png;base64," + e.FileBase64;

            //Add new attachment to list
            var addDiv = div.find(".harmony-add-image-container");
            addDiv.append("<div class='harmony-added-image'><a href='#' class='thumbnail sys-mg-r-10 harmony-attachment-container' style='width:100px !important'><img src='" + imagePreview + "'  style='max-width:80%; max-height: 80%;; position:relative;' ><i class='harmony-attachment-container-close material-icons ' style='position:absolute; top:4%; margin-left:15%;'>close</i><div class='text-muted sys-txt-sm sys-pd-t-5'>" + imageName + "</div><div class='harmony-image-attachment-index' style='display:none'>" + attachmentKey + "</div></a></div>");

        }, null, "Images");
    },
    //----------------------------------------
    //  Add PDF Attachments to Beat 
    // Change color
    // Increase total
    // add span label & display total
    //----------------------------------------
    uploadPDFAttachment: function (e) {
        var div = $(e).closest(".harmony-attachments");

        sysproInterop.selectFile(function (e) {
            var attachmentKey = 1;

            //Get filename from path:
            if (HarmonyInterop.currentPostBeatPDFAttachment.length > 0) {

                for (var i = 0; i < HarmonyInterop.currentPostBeatPDFAttachment.length; i++) {
                    if (HarmonyInterop.currentPostBeatPDFAttachment[i].index > attachmentKey) attachmentKey = HarmonyInterop.currentPostBeatPDFAttachment[i].index;
                };
                attachmentKey++;
                e.index = attachmentKey;
                HarmonyInterop.currentPostBeatPDFAttachment.push(e);
            } else {
                e.index = attachmentKey;
                HarmonyInterop.currentPostBeatPDFAttachment.push(e);
            }
            //change background color of icon
            if (HarmonyInterop.currentPostBeatPDFAttachment.length === 1) {
                $('.harmony-pdf-attach').addClass('sys-fg-twitter');
                //disable pdf unclick selection
                $('.pdf-attachment').toggleClass('disable-mouse-events');
            } else if (HarmonyInterop.currentPostBeatPDFAttachment.length === 0) {
                $('.harmony-pdf-attach').addClass('text-muted');
                $('.harmony-pdf-attach').removeClass('sys-fg-twitter');
            } else if (HarmonyInterop.currentPostBeatPDFAttachment.length === 4) {
                //allow only 4 files to be uploaded:
                $('.harmony-add-attachment-container').addClass("hide");
            }

            //Add number of attachments:
            var attachmentDiv = div.find(".harmony-attachment-count");
            attachmentDiv.addClass("sys-fg-twitter text-center");
            attachmentDiv.text(HarmonyInterop.currentPostBeatPDFAttachment.length + " of 4");

            //Get filename from path:
            var indexPDFAttachment = HarmonyInterop.currentPostBeatPDFAttachment.length - 1;
            var pdfName = e.FilePath.split('\\').pop();

            //Img source : preview image
            var pdfPreview = "data:image/png;base64," + e.FileBase64;

            //Add new attachment to list
            var addDiv = div.find(".harmony-add-pdf-container");
            addDiv.append("<div class='harmony-added-pdf'><a href='#' class='thumbnail sys-mg-r-10 harmony-attachment-container' style='width:100px !important'><img src='" + pdfPreview + "'  style='max-width:80%; max-height: 80%;; position:relative;' ><i class='harmony-attachment-container-close material-icons ' style='position:absolute; top:4%; margin-left:15%;' >close</i><div class='text-muted sys-txt-sm sys-pd-t-5'>" + pdfName + "</div><div class='harmony-pdf-attachment-index' style='display:none'>" + attachmentKey + "</div></a></div>");

        }, null, "Documents");
    },
    //----------------------------------------
    //  remove file Attachment from  currentPostBeatFileAttachment
    //----------------------------------------
    removeFileAttachment: function (e) {
        console.log("removeFileAttachment");
        var div = $(e).closest(".harmony-added-file");

        var fileId = div.find(".harmony-file-attachment-index").text();
        //remove file from array:
        for (var i = 0; i < HarmonyInterop.currentPostBeatFileAttachment.length; i++) {
            if (HarmonyInterop.currentPostBeatFileAttachment[i].index == fileId) {
                HarmonyInterop.currentPostBeatFileAttachment.splice(i, 1);
                //update number of attachments:
                $(".harmony-attachment-count").text(HarmonyInterop.currentPostBeatFileAttachment.length + " of 4");

                //remove line from screen:
                div.remove(".harmony-added-file");

                if (HarmonyInterop.currentPostBeatFileAttachment.length === 0) {
                    $('.harmony-file-attach').addClass('text-muted');
                    $('.harmony-file-attach').removeClass('sys-fg-twitter');
                    $('.file-attachment-list').toggleClass("hide");
                    $('.file-attachment-list').toggleClass("show");
                    //enable image & file selections
                    $('.image-attachment').toggleClass('disable-mouse-events');
                    $('.pdf-attachment').toggleClass('disable-mouse-events');
                    $('.file-attachment').toggleClass('disable-mouse-events');

                } else if (HarmonyInterop.currentPostBeatFileAttachment.length < 4) {
                    //allow only 4 files to be uploaded:
                    $('.harmony-add-attachment-container').removeClass("hide");
                };
            }
        }

    },
    //----------------------------------------
    //  remove image Attachment from  currentPostBeatImageAttachment
    //----------------------------------------
    removeImageAttachment: function (e) {
        var div = $(e).closest(".harmony-added-image");

        var fileId = div.find(".harmony-image-attachment-index").text();
        //remove file from array:
        for (var i = 0; i < HarmonyInterop.currentPostBeatImageAttachment.length; i++) {
            if (HarmonyInterop.currentPostBeatImageAttachment[i].index == fileId) {
                HarmonyInterop.currentPostBeatImageAttachment.splice(i, 1);
                //update number of attachments: 
                $(".harmony-attachment-count").text(HarmonyInterop.currentPostBeatImageAttachment.length + " of 4");

                //remove line from screen:
                div.remove(".harmony-added-image");
                //update total display:
                if (HarmonyInterop.currentPostBeatImageAttachment.length === 0) {
                    $('.harmony-image-attach').addClass('text-muted');
                    $('.harmony-image-attach').removeClass('sys-fg-twitter');
                    $('.image-attachment-list').toggleClass("hide");
                    $('.image-attachment-list').toggleClass("show");
                    //enable image & file selections
                    $('.file-attachment').toggleClass('disable-mouse-events');
                    $('.pdf-attachment').toggleClass('disable-mouse-events');
                    $('.image-attachment').toggleClass('disable-mouse-events');
                } else if (HarmonyInterop.currentPostBeatImageAttachment.length < 4) {
                    //allow only 4 files to be uploaded:
                    $('.harmony-add-attachment-container').removeClass("hide");
                }
            }
        }
    },
    //----------------------------------------
    //  remove pdf Attachment from  currentPostBeatPDFAttachment
    //----------------------------------------
    removePDFAttachment: function (e) {
        var div = $(e).closest(".harmony-added-pdf");

        var fileId = div.find(".harmony-pdf-attachment-index").text();
        //remove file from array:
        for (var i = 0; i < HarmonyInterop.currentPostBeatPDFAttachment.length; i++) {
            if (HarmonyInterop.currentPostBeatPDFAttachment[i].index == fileId) {
                HarmonyInterop.currentPostBeatPDFAttachment.splice(i, 1);

                //update number of attachments:
                $(".harmony-attachment-count").text(HarmonyInterop.currentPostBeatPDFAttachment.length + " of 4");

                //remove line from screen:
                div.remove(".harmony-added-pdf");

                if (HarmonyInterop.currentPostBeatPDFAttachment.length === 0) {
                    $('.harmony-pdf-attach').addClass('text-muted');
                    $('.harmony-pdf-attach').removeClass('sys-fg-twitter');
                    $('.pdf-attachment-list').toggleClass("hide");
                    $('.pdf-attachment-list').toggleClass("show");
                    //enable image & file selections
                    $('.image-attachment').toggleClass('disable-mouse-events');
                    $('.file-attachment').toggleClass('disable-mouse-events');
                    $('.pdf-attachment').toggleClass('disable-mouse-events');
                } else if (HarmonyInterop.currentPostBeatPDFAttachment.length < 4) {
                    //allow only 4 files to be uploaded:
                    $('.harmony-add-attachment-container').removeClass("hide");
                }
            }
        }
    },
    //---------------------------------------------------------------------
    //  Add Beat: remove #*word* Div and entry in selectedItems array 
    //---------------------------------------------------------------------
    removeTextCompleteWord: function (e) {
        console.log("removeTextCompleteWord");
        var div = $(e).closest(".harmony-text-complete");

        //find identifier:
        var selectedItemIdentifier = div.data('identifier');

        //remove entry in array:
        selectedItems.splice(selectedItemIdentifier, 1);
        replacementsMade.splice(selectedItemIdentifier, 1);
        //remove div
        div.remove(".harmony-text-complete");

    },
    //-----------------------------------------
    //  Profile selection Click - show/hide selections
    //  - Beats
    //  - Followers
    //  - Following
    //-----------------------------------------
    profileSelectionClicked: function (e) {
        console.log("profileBeatsClicked");
        //check if any of the selections were clicked, to show and hide components

        if ($(".text-blue-underline").length == 0) {
            //Identify which section was selected to show 
            if ($(e).closest(".sys-profile-beats").length == 1) {
                $('.sys-profile-beats-list').show();
                $('.sys-profile-beats-header').toggleClass('text-blue-underline');
                $('.sys-profile-following').toggleClass('disable-mouse-events');
                $('.sys-profile-followers').toggleClass('disable-mouse-events');
            } else if ($(e).closest(".sys-profile-following").length == 1) {
                $('.sys-profile-following-list').show();
                $('.sys-profile-following-header').toggleClass('text-blue-underline');
                $('.sys-profile-beats').toggleClass('disable-mouse-events');
                $('.sys-profile-followers').toggleClass('disable-mouse-events');
            } else if ($(e).closest(".sys-profile-followers").length == 1) {
                $('.sys-profile-followers-list').show();
                $('.sys-profile-followers-header').toggleClass('text-blue-underline');
                $('.sys-profile-beats').toggleClass('disable-mouse-events');
                $('.sys-profile-following').toggleClass('disable-mouse-events');
            }
        } else {
            //Identify which section was selected to  hide 
            if ($(e).closest(".sys-profile-beats").length == 1) {
                $('.sys-profile-beats-list').hide();
                $('.sys-profile-beats-header').toggleClass('text-blue-underline');
                $('.sys-profile-following').toggleClass('disable-mouse-events');
                $('.sys-profile-followers').toggleClass('disable-mouse-events');
            } else if ($(e).closest(".sys-profile-following").length == 1) {
                $('.sys-profile-following-list').hide();
                $('.sys-profile-following-header').toggleClass('text-blue-underline');
                $('.sys-profile-beats').toggleClass('disable-mouse-events');
                $('.sys-profile-followers').toggleClass('disable-mouse-events');
            } else if ($(e).closest(".sys-profile-followers").length == 1) {
                $('.sys-profile-followers-list').hide();
                $('.sys-profile-followers-header').toggleClass('text-blue-underline');
                $('.sys-profile-beats').toggleClass('disable-mouse-events');
                $('.sys-profile-following').toggleClass('disable-mouse-events');
            }

        }
    },

    //---------------------------------------------------
    //  Mouse over/out : Hover functionality, show section list
    //  - Beats
    //  - Followers
    //  - Following
    //---------------------------------------------------
    profileSelectionOverOut: function (e) {
        console.log("profileSelectionOverOut");
        var list;
        //check if any of the selections were clicked, only continue if nothing was clicked.
        if ($(".text-blue-underline").length == 0) {
            //Identify which section was selected to show  

            if ($(e).closest(".sys-profile-beats").length == 1) {
                list = $('.sys-profile-beats-list');
                $('.sys-profile-beats-header').toggleClass('text-underline');
            } else if ($(e).closest(".sys-profile-following").length == 1) {
                list = $('.sys-profile-following-list');
                $('.sys-profile-following-header').toggleClass('text-underline');
            } else if ($(e).closest(".sys-profile-followers").length == 1) {
                list = $('.sys-profile-followers-list');
                $('.sys-profile-followers-header').toggleClass('text-underline');
            }
            $(list).toggleClass("hide");
            $(list).toggleClass("show");
        }
    },

    //---------------------------------------------------
    //  Mouse over : Display profile email and location
    //---------------------------------------------------
    profileDetailOver: function () {
        $('.sys-profile-detail').toggleClass("hide");
        $('.sys-profile-detail').toggleClass("show");
    },
    //---------------------------------------------------
    //  Mouse out : Display profile email and location
    //---------------------------------------------------
    profileDetailOut: function () {
        $('.sys-profile-detail').toggleClass("hide");
        $('.sys-profile-detail').toggleClass("show");
    },

    //---------------------------------------------------
    //  Search: Follow Items list
    //---------------------------------------------------
    searchItemsList: function (e) {
        try {

            console.log("searchItemsList");
            //find searched text
            var searchDiv = $(e).closest(".harmony-search");
            var searchFollowItems = $(searchDiv).find(".harmony-search-text").val();
            //alert("searchWord: " + searchFollowItems);
            var div = $(e).closest(".harmony-widget");
            //alert("div: " + JSON.stringify(div));
            if (div.data("parameters")) {
                //add search to parameters
                var dataParameters = JSON.parse(div.data("parameters"));
                //alert("dataParameters: " + dataParameters);
                div.data("parameters", '{ "search":"' + searchFollowItems + '" }');
            } else {
                div.data("parameters", '{ "search":"' + searchFollowItems + '" }');
                //add search to parameters
                var dataParameters = JSON.parse(div.data("parameters"));
                // alert("dataParameters: " + dataParameters);
            }
            HarmonyInterop.bindWidget(div);

        } catch (ex) {
            alert("searchFollowItemsList error: " + ex.message);

        }

    },
    //---------------------------------------------------
    //  Filter: Newsfeeds
    //---------------------------------------------------
    filterDateRangeSlider: function (e) {
        console.log("Slide :: new slide values are: ");
        var div = $(this).closest(".harmony-widget");
        var singleDate = $(".hrm-filter-date-single").val("");
    },

    //---------------------------------------------------
    //  Filter: Newsfeeds
    //  get Kendo data
    //  get slider data
    //---------------------------------------------------
    postFilterNewsFeeds: function (e) {
        try {
            console.log("postFilterNewsFeeds : " + e);
            //get datasource
            var div = $(e).closest(".harmony-widget");
            var filterData = $(div).find(".hrm-main-filter");
            var filterKendoData = filterData[0].kendoBindingTarget.source.FilterData[0];

            //get noUiSlider values:
            //---------------------
            filterKendoData.CreatedDateTime_End = $(".hrm-filter-date-range")[0].getAttribute("data-slider-endvalue");
            filterKendoData.CreatedDateTime_Start = $(".hrm-filter-date-range")[0].getAttribute("data-slider-startvalue");
            filterKendoData.Sentiment_End = $(".avanti-sentiment-slider")[0].getAttribute("data-slider-endvalue");
            filterKendoData.Sentiment_Start = $(".avanti-sentiment-slider")[0].getAttribute("data-slider-startvalue");
            filterKendoData.RebeatCount_End = $(".hrm-filter-rebeat-count")[0].getAttribute("data-slider-endvalue");
            filterKendoData.RebeatCount_Start = $(".hrm-filter-rebeat-count")[0].getAttribute("data-slider-startvalue");
            filterKendoData.AdmiredCount_End = $(".hrm-filter-admire-count")[0].getAttribute("data-slider-endvalue");
            filterKendoData.AdmiredCount_Start = $(".hrm-filter-admire-count")[0].getAttribute("data-slider-startvalue");
            filterKendoData.NrOfAttachments_End = $(".hrm-filter-attachment-count")[0].getAttribute("data-slider-endvalue");
            filterKendoData.NrOfAttachments_Start = $(".hrm-filter-attachment-count")[0].getAttribute("data-slider-startvalue");



            //get paging:
            // parameters used for "SeeMore" functionality
            var parametersIn = {};

            var widgetParameters = div.data("parameters");

            if (widgetParameters) {
                parametersIn = JSON.parse(widgetParameters);
            }
            filterKendoData.Paging = parametersIn.seemore
            HarmonyInterop.PostFilter(div, filterKendoData);

        } catch (ex) {
            alert("postFilterNewsFeeds error: " + ex.message);
        }

    },
    //---------------------------------------------------------------------
    //  On/off event subscriptions.
    //  This can be used whenever event handling is done directory in HTML
    //---------------------------------------------------------------------
    subscribeToComponent: function (currentDiv) {
        //Profile component (Beats/Following/Followers) click event handlers
        $('.harmony-profile-selectable', currentDiv).off('click');
        $('.harmony-profile-selectable', currentDiv).on('click', function (e) {
            HarmonyInterop.profileSelectionClicked(this);
        });

        //Profile component (Beats/Following/Followers) hover event handlers
        $('.harmony-profile-selectable', currentDiv).off('mouseleave');
        $('.harmony-profile-selectable', currentDiv).on('mouseleave', function (e) {
            HarmonyInterop.profileSelectionOverOut(this);
        });
        $('.harmony-profile-selectable', currentDiv).off('mouseenter');
        $('.harmony-profile-selectable', currentDiv).on('mouseenter', function (e) {
            HarmonyInterop.profileSelectionOverOut(this);
        });

        //Profile component (user information) hover event handlers
        $('.harmony-profile-detail-hover', currentDiv).off('mouseleave');
        $('.harmony-profile-detail-hover', currentDiv).on('mouseleave', function (e) {
            HarmonyInterop.profileDetailOut(this);
        });
        $('.harmony-profile-detail-hover', currentDiv).off('mouseenter');
        $('.harmony-profile-detail-hover', currentDiv).on('mouseenter', function (e) {
            HarmonyInterop.profileDetailOver(this);
        });

        //Profile image click event handler
        $('.harmony-profile-image-selectable', currentDiv).off('click');
        $('.harmony-profile-image-selectable', currentDiv).on('click', function (e) {
            HarmonyInterop.uploadProfilePicture(this);
        });

        //Profile follower click event handler (using event delegation because the list is populated after the initial bind)
        $(currentDiv).off('click', '.harmony-profile-follower-selectable');
        $(currentDiv).on('click', '.harmony-profile-follower-selectable', function (e) {
            HarmonyInterop.addFollowItem(this);
        });

        //Profile unfollow click event handler (using event delegation because the list is populated after the initial bind)
        $(currentDiv).off('click', '.harmony-profile-unfollow-selectable');
        $(currentDiv).on('click', '.harmony-profile-unfollow-selectable', function (e) {
            HarmonyInterop.deleteFollowItem(this);
        });

        //seeMore click event handler
        $('.harmony-see-more', currentDiv).off('click');
        $('.harmony-see-more', currentDiv).on('click', function (e) {
            HarmonyInterop.seeMore(this);
        });

        //Compose new beat preview click event handler 
        // - show entry screen and set focus
        // - hide preview
        $('.harmony-beat-entry-preview', currentDiv).off('click');
        $('.harmony-beat-entry-preview', currentDiv).on('click', function (e) {
            $('.harmony-beat-entry-preview').hide();
            $('.harmony-beat-entry-action').toggleClass("hide");
            $('.harmony-beat-entry-action').toggleClass("show");
            $('.harmony-beat-entry').focus();
        });

        //Compose new beat close('X') button click event handler
        // - show preview screen 
        // - hide entry screen
        $('.harmony-beat-entry-action-close', currentDiv).off('click');
        $('.harmony-beat-entry-action-close', currentDiv).on('click', function (e) {
            $('.harmony-beat-entry-preview').show();
            $('.harmony-beat-entry-action').toggleClass("hide");
            $('.harmony-beat-entry-action').toggleClass("show");
        });


        //Compose new beat suggestion click event handler (using event delegation because the list is populated after the initial bind on replying to a beat)
        // - show/hide suggestion screen 
        // - change font color
        $(currentDiv).off('click', '.harmony-what-to-beat');
        $(currentDiv).on('click', '.harmony-what-to-beat', function (e) {
            $('.harmony-beat-suggestion').toggleClass('hide');
            $('.harmony-beat-suggestion').toggleClass('show');
            $('.harmony-light-switch').toggleClass('sys-fg-twitter');
        });
        //Suggestive - selection made
        $(currentDiv).off('click', '.harmony-suggestive-button');
        $(currentDiv).on('click', '.harmony-suggestive-button', function (e) {
            HarmonyInterop.suggestiveBeatSelection(this);
        });

        //Compose new beat Attachment File click event handler(using event delegation because the list is populated after the initial bind on replying to a beat)
        // - show/hide file attachment screen 
        // - change icon font color
        // - disable pdf & image attachment selections
        $(currentDiv).off('click', '.file-attachment');
        $(currentDiv).on('click', '.file-attachment', function (e) {
            $('.file-attachment-list').toggleClass("hide");
            $('.file-attachment-list').toggleClass("show");
            $('.harmony-file-attach').toggleClass('sys-fg-twitter');
            $('.pdf-attachment').toggleClass('disable-mouse-events');
            $('.image-attachment').toggleClass('disable-mouse-events');
        });
        //file attachment added
        $(currentDiv).off('click', '.harmony-add-file-button');
        $(currentDiv).on('click', '.harmony-add-file-button', function (e) {
            HarmonyInterop.uploadFileAttachment(this);
        });
        //file attachment removed
        $(currentDiv).off('click', '.harmony-added-file');
        $(currentDiv).on('click', '.harmony-added-file', function (e) {
            HarmonyInterop.removeFileAttachment(this);
        });

        //Compose new beat Attachment image click event handler(using event delegation because the list is populated after the initial bind on replying to a beat)
        // - show/hide image attachment screen 
        // - change icon font color
        // - disable pdf & file attachment selections
        $(currentDiv).off('click', '.image-attachment');
        $(currentDiv).on('click', '.image-attachment', function (e) {
            $('.image-attachment-list').toggleClass("hide");
            $('.image-attachment-list').toggleClass("show");
            $('.harmony-image-attach').toggleClass('sys-fg-twitter');
            $('.pdf-attachment').toggleClass('disable-mouse-events');
            $('.file-attachment').toggleClass('disable-mouse-events');
        });
        //Image attachment added
        $(currentDiv).off('click', '.harmony-add-image-button');
        $(currentDiv).on('click', '.harmony-add-image-button', function (e) {
            HarmonyInterop.uploadImageAttachment(this);
        });
        //Image attachment removed
        $(currentDiv).off('click', '.harmony-added-image');
        $(currentDiv).on('click', '.harmony-added-image', function (e) {
            HarmonyInterop.removeImageAttachment(this);
        });
        //Compose new beat Attachment File click event handler
        // - show/hide file attachment screen 
        // - change icon font color
        // - disable pdf & image file attachment selections
        $(currentDiv).off('click', '.pdf-attachment');
        $(currentDiv).on('click', '.pdf-attachment', function (e) {
            $('.pdf-attachment-list').toggleClass("hide");
            $('.pdf-attachment-list').toggleClass("show");
            $('.harmony-pdf-attach').toggleClass('sys-fg-twitter');
            $('.image-attachment').toggleClass('disable-mouse-events');
            $('.file-attachment').toggleClass('disable-mouse-events');
        });
        //PDF attachment added
        $(currentDiv).off('click', '.harmony-add-pdf-button');
        $(currentDiv).on('click', '.harmony-add-pdf-button', function (e) {
            HarmonyInterop.uploadPDFAttachment(this);
        });
        //PDF attachment removed
        $(currentDiv).off('click', '.harmony-added-pdf');
        $(currentDiv).on('click', '.harmony-added-pdf', function (e) {
            HarmonyInterop.removePDFAttachment(this);
        });

        //searching items in trending list
        $(currentDiv).off('input', '.harmony-trending-search');
        $(currentDiv).on('input', '.harmony-trending-search', function (e) {
            if (!HarmonyInterop.searchInterval) {
                var eShelved = this;
                HarmonyInterop.searchInterval = true;
                setTimeout(function () {
                    HarmonyInterop.searchItemsList(eShelved);
                }, 500);
            }
        });

        //searching items in Suggesting follow items list
        $(currentDiv).off('input', '.harmony-follow-search');
        $(currentDiv).on('input', '.harmony-follow-search', function (e) {

            if (!HarmonyInterop.searchInterval) {
                var eShelved = this;
                HarmonyInterop.searchInterval = true;
                setTimeout(function () {
                    HarmonyInterop.searchItemsList(eShelved);
                }, 500);
            }
        });

        //searching items in NewsFeeds items list
        $(currentDiv).off('input', '.harmony-beats-search');
        $(currentDiv).on('input', '.harmony-beats-search', function (e) {

            if (!HarmonyInterop.searchInterval) {
                var eShelved = this;
                HarmonyInterop.searchInterval = true;
                setTimeout(function () {
                    HarmonyInterop.searchItemsList(eShelved);
                }, 500);
            }
        });

        //search clear text('X') button click event handler
        $(currentDiv).off('click', '.harmony-search-clear');
        $(currentDiv).on('click', '.harmony-search-clear', function (e) {
            console.log("search - Close");
            var div = $(this).closest(".harmony-widget");
            var searchText = $(div).find(".harmony-search-text");
            var cleared = searchText.val("");
            HarmonyInterop.searchItemsList(this);
        });

        //Filter newsfeed
        $(currentDiv).off('click', '.harmony-filter-newsfeeds');
        $(currentDiv).on('click', '.harmony-filter-newsfeeds', function (e) {
            HarmonyInterop.postFilterNewsFeeds(this);
        });

        //Filter component - single date selection
        //       Setting date ranges to the single selected value
        $(currentDiv).off('dp.change', '.hrm-filter-date-single-parent');
        $(currentDiv).on('dp.change', '.hrm-filter-date-single-parent', function (e) {
            console.log(e.date.format("YYYY-MM-DD"));
            var singleDate = e.date.format("YYYY-MM-DD");
            var formattedSelectedDate = new Date(singleDate).getTime();
            var slider = document.getElementsByClassName("hrm-filter-date-range");
            slider[0].noUiSlider.set([formattedSelectedDate, formattedSelectedDate]);
            var sliderDates = HarmonyInterop.DateFormat(singleDate).substring(0, 10);
            $(".hrm-filter-date-range")[0].setAttribute("data-slider-endvalue", sliderDates);
            $(".hrm-filter-date-range")[0].setAttribute("data-slider-startvalue", sliderDates);

        });
    },
    //---------------------------------------------------------------------------------------------------------------------------------------------
    //  Smarttags on follow and following components:
    //---------------------------------------------------------------------------------------------------------------------------------------------
    smartTag: function (e) {
        var div = $(this).closest(".harmony-widget");
        var keyColumnAndFieldDiv = $(div).find(".follow-item-name");
        sysproInterop.showSmartTag(e);
    },

    //---------------------------------------------------------------------------------------------------------------------------------------------
    //  imageError handling.
    //  This is used onerror for images.  
    //  data-defaultImage: This data attribute must populated with a image that should be used when an error occured
    //  data-imageerror: This a flag indicating whether there was an error with the data-defaultImage and then stops it from looping.
    //---------------------------------------------------------------------------------------------------------------------------------------------
    imageerrorhandler: function (imagediv) {
        console.log("imageErrorHandler");
        if (imagediv.getAttribute('data-imageerror') === 'true') {
            return;
        }
        else if ((imagediv.getAttribute('data-defaultImage')) && (imagediv.getAttribute('data-defaultImage') !== 'null') && (imagediv.getAttribute('data-defaultImage') !== 'undefined')) {
            imagediv.src = imagediv.getAttribute('data-defaultImage');
            imagediv.setAttribute('data-imageerror', 'true');
        }
    },
    //---------------------------------------------------------------------
    // identifies the AliasIn
    // takes Contact name and add "_" where spaces.
    //---------------------------------------------------------------------

    getAlias: function (key, datafield1, value, fieldname, fieldvalue) {
        console.log("getAlias");
        if (key === "Contact")
            datafield1 = value.split(" ").join("_");
        if (fieldname && fieldvalue) {
            return key + "." + datafield1 + "." + fieldname + "." + fieldvalue.split(" ").join("_");

        }
        else if (fieldname)
            return key + "." + datafield1 + "." + fieldname;
        else
            return key + "." + datafield1;

    }


    //START - GeoLocation for beats posted

            , GetGeoLocationOfHarmonyBeat: function (callback) {

                var GeoLocation = "";

                address = new Array();

                if (!navigator.geolocation) {
                    return "";
                }

                function success(position) {

                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;

                    var HrmClientGeoLocation = latitude + ';' + longitude;

                    console.log("GeoLocation:" + ClientGeoLocation);

                    //Build up the address inforamtion
                    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=false";

                    var jqxhr = $.getJSON(url, function (json) {
                        HarmonyInterop.Create_Address(json);
                    })
                        .done(function (json) {
                        })
                                        .fail(function () {
                                        })
                                .always(function () {
                                });

                    // Set another completion function for the request above
                    jqxhr.complete(function () {
                        //Post the beat
                    });

                    var HrmHumanReadableLocation = "";

                    console.log("HrmClientGeoLocation " + HrmClientGeoLocation);
                    console.log("HrmHumanReadableLocation " + HrmHumanReadableLocation);

                    //callback();
                    return HrmClientGeoLocation;
                }


                function error() {
                    GeoLocation = "Unable to retrieve your location";
                }

                navigator.geolocation.getCurrentPosition(success, error);
            }

    , GetHumanReadableLocation: function (location) {
        if (location == "" || location == null)
            return "";

        var result = location.split(";");

        if (result.length == 2) {
            HarmonyInterop.Convert_LatLng_To_Address(result[0], result[1]);

            if (!address['city'])
                return address['city'];
            else
                return location;

        }
        else {
            return "";
        }

    }

    , Convert_LatLng_To_Address: function (lat, lng) {
        var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=false";
        //jQuery.getJSON(url, function (json) {
        //    HarmonyInterop.Create_Address(json);         
        //});
        var jqxhr = $.getJSON(url, function (json) {
            HarmonyInterop.Create_Address(json);
            //Post the beat
            alert("success");
        })
            .done(function (json) {
                alert("second success" + JSON.stringify(json));
            })
            .fail(function () {
                alert("error");
            })
            .always(function () {
                alert("complete");
            });

        // Perform other work here ...

        // Set another completion function for the request above
        jqxhr.complete(function () {
            alert("second complete");
        });

    }

    /*
* Create an address out of the json 
*/
    , Create_Address: function (json) {

        if (!HarmonyInterop.check_status(json)) // If the json file's status is not ok, then return
            return 0;

        //Setup the address array
        address['country'] = HarmonyInterop.google_getCountry(json);
        address['province'] = HarmonyInterop.google_getProvince(json);
        address['city'] = HarmonyInterop.google_getCity(json);
        address['street'] = HarmonyInterop.google_getStreet(json);
        address['postal_code'] = HarmonyInterop.google_getPostalCode(json);
        address['country_code'] = HarmonyInterop.google_getCountryCode(json);
        address['formatted_address'] = HarmonyInterop.google_getAddress(json);
    }

    , check_status: function (json) {
        if (json["status"] == "OK") return true;
        return false;
    }

    , google_getCountry: function (json) {
        return HarmonyInterop.Find_Long_Name_Given_Type("country", json["results"][0]["address_components"], false);
    }

    , google_getProvince: function (json) {
        return HarmonyInterop.Find_Long_Name_Given_Type("administrative_area_level_1", json["results"][0]["address_components"], true);
    }

    , google_getCity: function (json) {
        return HarmonyInterop.Find_Long_Name_Given_Type("locality", json["results"][0]["address_components"], false);
    }

    , google_getStreet: function (json) {
        return HarmonyInterop.Find_Long_Name_Given_Type("street_number", json["results"][0]["address_components"], false) + ' ' + Find_Long_Name_Given_Type("route", json["results"][0]["address_components"], false);
    }

    , google_getPostalCode: function (json) {
        return HarmonyInterop.Find_Long_Name_Given_Type("postal_code", json["results"][0]["address_components"], false);
    }

    , google_getCountryCode: function (json) {
        return HarmonyInterop.Find_Long_Name_Given_Type("country", json["results"][0]["address_components"], true);
    }

    , google_getAddress: function (json) {
        return json["results"][0]["formatted_address"];
    }

    , Find_Long_Name_Given_Type: function (t, a, short_name) {
        var key;
        for (key in a) {
            if ((a[key]["types"]).indexOf(t) != -1) {
                if (short_name)
                    return a[key]["short_name"];
                return a[key]["long_name"];
            }
        }
    }

    //END - GeoLocation for beats posted

};


var HarmonyTrendingChart = {
    renderChartInDiv: function (divToBind, dataToBind, currentLayer, parentPath, parentSentiment) {

        //alert(JSON.stringify(dataToBind));
        var divToRender = "SYSPRO_Harmony_Component_TrendingChart";
        if (currentLayer && currentLayer !== 0)
            divToRender = "trending-child-layer"
        var child = $("." + divToRender, divToBind);

        var ownerDiv = child[0];

        ///object to hold global settings
        var chartOptions = {
            width: 1600,
            height: 1600,
            diameter: 1768,
            labelFontSize: 24,
            class: 'SysproChartPack'
        };


        ///cleanup svg
        d3.select(ownerDiv).selectAll("svg").remove();

        ///create main svg element
        var svg = d3.select(ownerDiv).append("svg")
        .attr("width", chartOptions.width)
        .attr("height", chartOptions.height);

        var margin = 20,
            diameter = +svg.attr("width"),
            ///create a group to hold all the elements & shift it's origin to the center of the svg

        g = svg.append("g");//.attr("transform", "matrix(1, 0, 0, 1, " + diameter / 2 + ", " + diameter / 2 + ")");    

        ///this scales the color of the node - so nodes at different levels of the hierarchy have different shades of color
        ///the domain [1,7] represents up a hierarchy that can go up to 7 levels deep
        ///the range([0.5, 0.99]) represents the colors scale that can go from 0 to 1
        ///this scale increases exponentially (square root)
        //var depthScale = d3.scaleSqrt()
        //    .domain([1, 7])
        //    .range([0.99, 0.99]);

        var colorGoodSentimentScale = d3.scalePow()
            .domain([0, 10])
            .range([0.25, 0.80]);

        var colorBadSentimentScale = d3.scalePow()
            .domain([-10, 0])
            .range([0.85, 0.25]);

        var colorGood = d3.scaleSequential(d3.interpolateGreens);
        var colorBad = d3.scaleSequential(d3.interpolateReds);
        var colorNeutral = "#bfbfbf";

        var sentimentToColor = function (sentiment) {
            switch (sentiment) {

                case 0: {
                    return colorNeutral;
                }

                case 1:
                case 2: {
                    return "#cce5cc";
                }

                case 3:
                case 4: {
                    return "#99cc99"
                }

                case 5:
                case 6: {
                    return "#66b266";
                }

                case 7:
                case 8: {
                    return "#329932";
                }

                case 9:
                case 10: {
                    return "#008000";
                }

                case -1:
                case -2: {
                    return "#ffcccc";
                }

                case -3:
                case -4: {
                    return "#ff9999";
                }

                case -5:
                case -6: {
                    return "#ff6666";
                }

                case -7:
                case -8: {
                    return "#ff3232";
                }

                case -9:
                case -10: {
                    return "#ff0000";
                }

                default: {
                    return null;
                }

            }
        }

        ///this is for theming - the color scheme in use
        ///var color = d3.scaleSequential(d3.interpolateRdYlGn);

        ///create a packed layout
        var pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(2);

        ///wrap the dataset into the root element
        var root = { "name": "Trending", "children": dataToBind, "isRoot": true };
        if (parentSentiment || parentSentiment === 0)
            root.sentiment = parentSentiment;
        root = d3.hierarchy(root)
            .sum(function (d) { return d.size; })
            .sort(function (a, b) { return b.name > a.name; });

        var focus = root,
            nodes = pack(root).descendants(),
            view;

        ///this create the initial nodes - circles
        var categoryNodes = g.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("class", function (d) {
                return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
            })
            .style("fill", function (d) {
                var sentiment = d.data.sentiment || 0;
                if (d.parent === null && (parentSentiment === null || parentSentiment === undefined)) {
                    return null;
                }
                return sentimentToColor(sentiment);
                //if (sentiment === 0) {
                //    if (d.parent) {     ///don't style the root node
                //        return colorNeutral;
                //    }
                //}
                //else if (sentiment < 0) {
                //    return colorBad(colorBadSentimentScale(sentiment));
                //}
                //else if (sentiment > 0) {
                //    return colorGood(colorGoodSentimentScale(sentiment));
                //}
                //else {
                //    return null;
                //}
            })
            .on("click", function (d) {
                if (d.data.isRoot) {
                    HarmonyInterop.raiseCustomEvent("SYSPRO.Harmony.Search", d.data);
                }
                else if ((focus !== d) && (!d.data.isRoot)) {
                    if (!parentPath)
                        parentPath = "";
                    else
                        parentPath = ">" + parentPath;
                    d3.select("#myChartBreadcrumb").text(parentPath + ">" + (d.data.path ? d.data.path : ""));
                    //d.data.children = [
                    //    { name: "test1", size: 10, sentiment: -5 },
                    //    { name: "test2", size: 20, sentiment: 5 }
                    //];

                    //alert(JSON.stringify(d.data));
                    if (d.data.children.length === 0) {
                        var parametersIn = {
                            levelIn: d.data.level,
                            followItemId: d.data.ItemDetail.FollowItemId,
                            linkFollowItemId: d.data.ItemDetail.LinkFollowItemId,
                            keyTable: d.data.ItemDetail.TableName,
                            keyColumn: d.data.ItemDetail.KeyColumn,
                            keyValue: d.data.ItemDetail.KeyValue,
                            followField: d.data.ItemDetail.FollowField,
                            path: d.data.path,
                            IsRoot: false
                        };

                        sysproInterop.callHarmonyService("GET", "Trending/GetTrendingItemsForFollowItem", parametersIn, function (result) {

                            var TypedResult = JSON.parse(result);

                            if (TypedResult.length > 0) {
                                if ($(".trending-child-layer-parent", divToBind).length > 0) {
                                    $(".trending-child-layer-parent", divToBind).remove();
                                }

                                var childDiv = $(".SYSPRO_Harmony_Component_TrendingChart", divToBind);
                                childDiv.hide();

                                var newdiv = $("<div class='trending-child-layer-parent'><a href='#' class='trending-back-layer'>Back</a><div class='trending-child-layer'></div></div>");
                                childDiv.after(newdiv);
                                $(".trending-back-layer", divToBind).click(function () {
                                    $(".SYSPRO_Harmony_Component_TrendingChart", divToBind).show();
                                    $(".trending-child-layer-parent", divToBind).hide();
                                });
                                HarmonyTrendingChart.renderChartInDiv(divToBind, TypedResult, 1, d.data.path, d.data.sentiment);
                            }
                        });
                        //else
                        //{
                        //    setTimeout(function () {
                        //        $(".SYSPRO_Harmony_Component_TrendingChart", divToBind).hide();
                        //        $(".trending-child-layer-parent", divToBind).show();
                        //    }, 500);

                        //}

                    }
                    HarmonyInterop.raiseCustomEvent("SYSPRO.Harmony.Search", d.data);
                }
                else {
                    if (currentLayer && currentLayer !== 0) {
                        $(".SYSPRO_Harmony_Component_TrendingChart", divToBind).show();
                        $(".trending-child-layer-parent", divToBind).hide();
                    }
                    d3.select("#myChartBreadcrumb").text(">");
                }

                if (focus !== d) zoom(d), d3.event.stopPropagation();
            });

        var mainlabels = categoryLabels = g.selectAll("text")
            .data(nodes)
            .enter().append("g")

        ///this creates the initial labels for the nodes
        var categoryLabels = mainlabels.append("text").attr("class", "label")
            .style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
            .style("display", function (d) { return d.parent === root ? "inline" : "none"; })
            .style("font-size", function (d) {
                return chartOptions.labelFontSize + 'px';
            })
            .text(function (d) { return d.data.name; });


        var secondCatLabels = mainlabels.append("text").attr("dy", "-1em").attr("class", "labelgray")
            .style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
            .style("display", function (d) { return d.parent === root ? "inline" : "none"; })
            .style("font-size", function (d) {
                return chartOptions.labelFontSize + 'px';
            }).text(function (d) {
                var labelVal = "";
                if (d.data.ItemDetail) {
                    if (d.data.ItemDetail.FollowField) {
                        labelVal = d.data.ItemDetail.KeyColumn + ": " + d.data.ItemDetail.KeyValue;

                    } else if (d.data.ItemDetail.KeyValue) {
                        labelVal = d.data.ItemDetail.KeyColumn;
                    }
                }

                return labelVal;
            });


        // categoryLabels = categoryLabels.selectAll("text")
        //.data(nodes)
        //.enter().append("text")
        //.attr("class", "label")
        //.style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
        //.style("display", function (d) { return d.parent === root ? "inline" : "none"; })
        //.style("font-size", function (d) {
        //    return '20px';
        //})
        //.text(function (d) { return "Hello"; });



        var node = g.selectAll("circle,text");

        ///setup zoom on click
        svg.on("click", function () { zoom(root); });


        ///do inital zoom on root (outer) node
        zoomTo([root.x, root.y, root.r * 2 + margin]);

        function zoom(d) {
            focus = d;

            ///setup the zoom transition
            var transition = d3.transition()
                .duration(750)
                .tween("zoom", function (d) {
                    var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                    return function (t) { zoomTo(i(t)); };
                });

            ///show focused labels & hide non-focused labels
            transition.selectAll("text")
                .style("fill-opacity", function (d) {
                    ///if focused node has children - show labels for all it's children i.e. d is a child of the focused node, show it's label
                    ///if focused node has no children - show it's label
                    var result = 0;

                    if ((d == null) || (d == undefined)) {
                        result = 0;
                    }
                    else if (d === root) {
                        result = 0;
                    }
                    else if ((d === focus) && (d.children === undefined)) {
                        result = 1;
                    }
                    else if ((d.parent === focus)) {
                        result = 1;
                    }
                    else {
                        result = 0;
                    }
                    return result;
                })
                .on("start", function (d) {
                    if ((d != null) && (d !== undefined)) {
                        if (d.parent === focus) this.style.display = "inline";
                        if ((d === focus) && (d.children === undefined)) this.style.display = "inline";
                    }
                })
                .on("end", function (d) {
                    if ((d != null) && (d !== undefined)) {
                        if (d.parent !== focus) this.style.display = "none";
                        if ((d === focus) && (d.children === undefined)) this.style.display = "inline";
                    }
                });
        }


        function zoomTo(v) {
            var k = diameter / v[2];
            view = v;

            var calcLength = ownerDiv.clientWidth;

            //if (root.children && root.children.length) {
            svg.attr("width", calcLength);
            svg.attr("height", calcLength);
            //}
            //else {
            //    svg.attr("width", 0);
            //    svg.attr("height", 0);
            //}

            var scaleFactor = calcLength / chartOptions.width;
            g.attr("transform", "matrix(" + scaleFactor + ", 0, 0, " + scaleFactor + ", " + scaleFactor * diameter / 2 + ", " + scaleFactor * diameter / 2 + ")");

            ///zooms in on the selected node & scales it to fill the svg element
            node.attr("transform", function (d) {
                return "matrix(1, 0, 0, 1, " + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")";
            });
            categoryNodes.attr("r", function (d) {
                return d.r * k;
            });

            ///scales the text label to fill it's node
            categoryLabels
                .style("font-size", function (d) {
                    var bbox = this.getBBox();

                    var currentFontSize = this.style.fontSize || (chartOptions.labelFontSize + "px");
                    currentFontSize = +("" + currentFontSize).replace("px", "");

                    var newFontSize = (2 * d.r * k * currentFontSize + margin) / (Math.max(bbox.width, 0 * bbox.height));
                    newFontSize = newFontSize === Infinity ? 1 : (2 * d.r - 2) * newFontSize / (2 * d.r);
                    return newFontSize + "px";
                })
            .attr("dy", "0.33em");

            secondCatLabels.style("font-size", function (d) {
                var oldText = null;
                if (d.data.name.length > this.textContent.length) {
                    oldText = this.textContent;
                    this.textContent = d.data.name;
                }

                var bbox = this.getBBox();

                var currentFontSize = this.style.fontSize || (chartOptions.labelFontSize + "px");
                currentFontSize = +("" + currentFontSize).replace("px", "");

                var newFontSize = (2 * d.r * k * currentFontSize + margin) / (Math.max(bbox.width, 0 * bbox.height));
                newFontSize = newFontSize === Infinity ? 1 : (2 * d.r - 4) * newFontSize / (2 * d.r);
                newFontSize = 0.8 * newFontSize;

                if (oldText !== null) {
                    this.textContent = oldText;
                }

                return newFontSize + "px";
            })
            .attr("dy", function (d) {
                var bbox = this.getBBox();
                return "-1em";
            });
        }

        if (ownerDiv) {
            new ResizeSensor(ownerDiv, function () {
                if (focus) {
                    zoom(focus);
                }
            });
        }

    },

    bindTrendingDrillDown: function () {
        window.addEventListener("SYSPRO.Harmony.Search", function (e) {
            //console.log(e.detail.ItemDetail.FollowItemId);

            var typedResult = {};

            if ((e.detail == null) || (e.detail.isRoot)) {
                typedResult.data = {};
                typedResult.data.detail = e.detail;

                var observableDetail = kendo.observable(typedResult);

                kendo.bind($("#trendingDetail"), observableDetail);
                kendo.bind($("#trendingDetailKeyInfo"), observableDetail);
                $("#trendingDetailPieChart").hide();

                return;
            }

            var params = {
                keyTable: e.detail.ItemDetail.TableName,
                keyColumn: e.detail.ItemDetail.KeyColumn,
                keyValue: e.detail.ItemDetail.KeyValue,
            }

            var level1MessageMaker = function (detail) {
                var maxChildItem = null;
                var maxSubTopicItem = null;

                var maxChild = null;
                var maxSubTopic = null;
                var pieChartSeries = [];
                var totalBeatCount = 0;
                detail.children.forEach(function (item) {

                    totalBeatCount = totalBeatCount + parseInt(item.size);
                });
                console.log("totalBeatCount - " + totalBeatCount);
                //if (detail.level === 1) {
                detail.children.forEach(function (item) {
                    pieChartSeries.push({
                        category: item.name,
                        value: item.size,
                        //tooltip: item.name + ' - ' + item.size + ' beats',
                        percentage: kendo.toString((parseInt(item.size)) / totalBeatCount, "p")
                    });

                    //if (item.isChild) {
                    if (true) {
                        if ((maxChild == null) || (item.size > maxChild.size)) {
                            maxChild = item;
                        }
                    }
                    else {
                        if ((maxSubTopic == null) || (item.size > maxSubTopic.size)) {
                            maxSubTopic = item;
                        }
                    }
                });

                if (maxChild != null) {
                    maxChildItem = maxChild;
                }
                if (maxSubTopic != null) {
                    maxSubTopicItem = maxSubTopic.name;
                }

                //}

                return { trendingChild: maxChildItem, trendingSubTopic: maxSubTopicItem, pieChartSeries: pieChartSeries };

            }

            sysproInterop.callHarmonyService("GET", "Trending/GetTrendingItemKeyInfo", params, function (result) {

                typedResult.data = {};
                typedResult.data.detail = e.detail;
                typedResult.data.columns = JSON.parse(result);

                var msgs = level1MessageMaker(e.detail);
                typedResult.data.trendingChild = msgs.trendingChild
                typedResult.data.trendingSubTopic = msgs.trendingSubTopic;

                typedResult.data.series = msgs.pieChartSeries;

                var observableDetail = kendo.observable(typedResult);

                kendo.bind($("#trendingDetail"), observableDetail);
                kendo.bind($("#trendingDetailKeyInfo"), observableDetail);

                function createChart() {
                    if (!typedResult.data.series.length) {
                        $("#trendingDetailPieChart").hide();
                        return;
                    }
                    else {
                        $("#trendingDetailPieChart").show();
                    }

                    $("#trendingDetailPieChart").kendoChart({
                        theme: "bootstrap",
                        visible: true,
                        legend: {
                            visible: false,
                            position: "top"
                        },
                        //seriesDefaults: {
                        //    labels: {
                        //        visible: true,
                        //        background: "transparent",
                        //        template: "#= dataItem.category # - #= dataItem.percentage # %"
                        //    }
                        //},
                        series: [{
                            type: "pie",
                            overlay: {
                                gradient: "none"
                            },
                            //Removed labels inside chart area
                            //labels: {
                            //    position: "insideEnd",
                            //    visible: true,
                            //    background: "transparent",
                            //    template: "#= dataItem.percentage #%"
                            //},
                            data: typedResult.data.series
                        }],
                        tooltip: {
                            visible: true,
                            template: "#= dataItem.category # - #= dataItem.percentage # (#= dataItem.value # beats)"
                        },
                        chartArea: {
                            height: 140,
                            width: 140
                        }
                    });
                }
                createChart();
                //$(document).ready(function () {
                //    createChart();
                //    $(document).bind("kendo:skinChange", createChart);
                //});

            });

        });
        window.addEventListener("SYSPRO.Harmony.TrendingDrilldown", function (e) {
            console.log("SYSPRO.Harmony.TrendingDrilldown");


            if ($("#Beats").length > 0) {
                //Find news feed and if it exists then bind it to drill down items.
                var DivToBind = $("#Beats").closest(".harmony-widget");

                var params = e.detail;
                sysproInterop.callHarmonyService("GET", "Trending/GetDrilldownBeats", params, function (result) {
                    var TypedResult = JSON.parse(result);

                    $.each(TypedResult.Beats, function (index) {
                        //   console.log("Processing Feed - " + this.Feed +" - "+ this.FollowItems.length);
                        this.Feed = ProcessFeedHtml(this.Feed, this.FollowItems);
                    });
                    //Now Bind the Show more data
                    //Get the replies template -
                    //Dont need show more in the news feed for this drill down.
                    $('.ShowMoreNewsFeeds').remove();
                    //var HrmReplyTemplate = kendo.template($("#Harmony-ShowMore-Template").html());
                    //var result = HrmReplyTemplate(TypedResult);
                    //DivToBind.append(result);

                    //Parse the result
                    var HarmonyObservable = kendo.observable(TypedResult);
                    //Bind the data to the UI
                    kendo.bind(DivToBind, HarmonyObservable);
                });
            }
        });

    },

    clickTrendingDrillDown: function (e) {

        var dataHolder = $(e).closest(".trending-drilldown-metadata");
        var parametersIn = {
            levelIn: dataHolder.data("levelid"),
            followItemId: dataHolder.data("followitemid"),
            linkFollowItemId: dataHolder.data("linkfollowitemid"),
            keyTable: dataHolder.data("keytable"),
            keyColumn: dataHolder.data("keycolumn"),
            keyValue: dataHolder.data("keyvalue"),
            followField: dataHolder.data("followfield"),
            path: ""
        };

        HarmonyInterop.raiseCustomEvent("SYSPRO.Harmony.TrendingDrilldown", parametersIn);
    }

}


//function listener(evt, sender) {
//    console.log("listener evt - " + JSON.stringify(evt));
//    console.log("listener sender - " + JSON.stringify(sender));
//    ProcessMissingTags($(evt).closest(".harmony-beat-entry"));
//}

var AliasUser = [];
var AliasFullValue = null;
var selectedItems = [];
var replacementsMade = [];

var UserInput = true;
//----------------------------------------------------------------------------------------//
// MC:  This function gets triggered on the 3rd drill down:
//  -  records all the'#'key fields entered (List) i.e. #CustomerName
//----------------------------------------------------------------------------------------//

function UpdateSelectionList(item, sender) {
    try {
        console.log("UpdateSelectionList item - " + JSON.stringify(item));
        console.log("UpdateSelectionList AliasValue - " + JSON.stringify(AliasFullValue));
        var AliasIn;
        if (AliasFullValue) {
            if (AliasFullValue.Key) {
                AliasIn = HarmonyInterop.getAlias(AliasFullValue.Type, AliasFullValue.DataField1, AliasFullValue.Key, "");
            }
            else if (AliasFullValue.Type) {
                AliasIn = HarmonyInterop.getAlias(AliasFullValue.Type, AliasFullValue.DataField1, AliasFullValue.Key, "");
            }
            if (item.Type) {
                if (item.Key) {
                    AliasIn = HarmonyInterop.getAlias(AliasFullValue.Type, AliasFullValue.DataField1, AliasFullValue.Key, item.Type, item.Key);
                } else {
                    AliasIn = HarmonyInterop.getAlias(AliasFullValue.Type, AliasFullValue.DataField1, AliasFullValue.Key, item.Type);
                }

            }
            AddSelectedItem(sender, "#" + AliasIn, AliasFullValue.DataField3, AliasFullValue.Type, item.Type, AliasFullValue.DataField1, "", item.Key);
        }
        else {
            //USE HarmonyInterop.categorySelected, HarmonyInterop.fieldSelected for missing data
            if (item.Type) {
                if (item.Key) {
                    AliasIn = HarmonyInterop.getAlias(HarmonyInterop.categorySelected, HarmonyInterop.fieldSelected, item.Key, item.Type, item.Key);
                } else {
                    AliasIn = HarmonyInterop.getAlias(HarmonyInterop.categorySelected, HarmonyInterop.fieldSelected, "", item.Type);
                }

            }
            AddSelectedItem(sender, "#" + AliasIn, HarmonyInterop.tableSelected, HarmonyInterop.categorySelected, item.Type, HarmonyInterop.fieldSelected, "", item.Key);
        }

        return AliasIn;
    } catch (e) {
        SYSPRO_VB.showErrorMessage("UpdateSelectionList error : " + e.message);
    }

}

//----------------------------------------------------------------------------------------//
//                                  Template for category FIELDS (3rd drilldown)
//----------------------------------------------------------------------------------------//

function CategoryFIELD_Template(subCategory) {
    return "<div class='text-complete sys-200 sys-txt-sm sys-mg-off sys-pd-off'> " + subCategory.Type + " : " + subCategory.Key + '</div>';
}


//----------------------------------------------------------------------------------------//
//                                  Template for category details
//----------------------------------------------------------------------------------------//

function Category_Template(subCategory) {
    if (subCategory.Type === "Contact") {
        return '<div><img src="' + subCategory.DataField2 + '" style="width:25px; height:25px; display:inline-block; border-radius: 50%;"></img><span class="text-complete sys-pd-off">  ' + subCategory.Key + '</span></div>';

    } else {
        return '<div class="text-complete sys-pd-off">' + subCategory.Key + "<br><div class='sys-200 sys-txt-md'> Title: " + subCategory.DataField1 + '</div></div>';
    }
}

//----------------------------------------------------------------------------------------//
//              Template for suggestions based on History and New Category Beats
//----------------------------------------------------------------------------------------//
function HistoryNew_Template(hashfield) {
    return '<div class="text-complete sys-txt-md sys-pd-off">' + hashfield.Key + '</div>';

}

function Alias_Template(hashfield) {

    return '<div class="text-complete sys-pd-off" >' + hashfield.Key + '</div>';
}

//----------------------------------------------------------------------------------------//
//                      Template for Users (@ prefixed)
//----------------------------------------------------------------------------------------//

function user_Template(user) {
    if (user.DataField3 === "Y") {
        return '<div class="text-complete sys-pd-off sys-pd-off"><img src="' + user.DataField2 + '" style="width:25px; height:25px; display:inline-block; border-radius: 50%;"></img>' + '<small> ' + user.DataField1 + '</small><br><small>Name : ' + user.Key + '</small></div>';

    } else {
        return '<div class="text-complete sys-pd-off sys-pd-off"><img src="' + user.DataField2 + '" style="width:25px; height:25px; display:inline-block; border-radius: 50%;"></img>' + '<small> ' + user.DataField1 + '</small><br><small>Name : ' + user.Key + '</small><br><small  style="font-style: italic">Offline</small></div></div>';

    }
}
function User_Alias_Template(user) {

    if (user.DataField3 === "Y") {
        return '<div  class="text-complete sys-pd-off sys-pd-off"><img src="' + user.DataField2 + '" style="width:25px; height:25px; display:inline-block; border-radius: 50%;"></img>' + '<small style="font-style: italic"> ' + user.DataField1 + '</small><br><small style="font-style: italic">Name : ' + user.Key + '</small></div>';

    } else {
        return '<div class="text-complete sys-pd-off sys-pd-off"><img src="' + user.DataField2 + '" style="width:25px; height:25px; display:inline-block; border-radius: 50%;"></img>' + '<small style="font-style: italic"> ' + user.DataField1 + '</small><br><small style="font-style: italic">Name : ' + user.Key + '</small><br><small style="font-style: italic">Offline</small></div>';
    }

    //return '<div><img src="' + user.DataField2 + '" style="width:25px; height:25px; display:inline-block; border-radius: 50%;"></img><div class="sys-alias" style="font-style:italic; font-weight: 400;">' + user.Key + '</div></div>';
}

//----------------------------------------------------------------------------------------//
//                                      Post Beat function
//  - get data that was entered and save it somewhere
//----------------------------------------------------------------------------------------//


function ProcessMissingTags(sender) {
    if (UserInput) {
        var Beat = sender.html();
        if (HarmonyInterop.AliasValue.length == 0 && HarmonyInterop.AliasType.length == 0 && AliasUser.length == 0) {
            BeatText = sender.text();
            var taggedTypes = BeatText.match(/#(\w*)([^\w.*]$)/g);
            var userTypes = BeatText.match(/@(\w*)$\w*\s([^\w*]$)/g);
            var taggedValues = BeatText.match(/#(\w*\b\.*(\S[^\.\s]*))([^\w.*]$)/g);  //match(/#(\w*?)\.(\w*?)( )/g)
            if (taggedTypes) {
                //console.log("!AliasType : this - " + this + "taggedtypes" + taggedTypes);
                $.each(taggedTypes, function (index) {
                    var type = this.toString();
                    console.log("!AliasType : " + type);
                    var cleanValue = type.match(/#(\S*)\w/g);
                    if (cleanValue != null) {
                        var cleanType = cleanValue.toString();

                        cleanType = cleanType.replace("#", "").trim();
                        var htmlHolder = GenerateHtmlBlockFromHashAlias(cleanType, cleanType, null, null, null, true, null, selectedItems.length);
                        AddReplacementsMadeItem("#" + cleanType, htmlHolder);
                        AddSelectedItem(sender, "#" + cleanType, "UserDefined", cleanType, "", "", "", "");
                        UserInput = false;
                        //sender.html(Beat.replace("#" + cleanType, htmlHolder));
                        sender.html(Beat.replace(cleanValue.toString(), htmlHolder));
                        UserInput = true;
                        Beat = sender.html();
                        //setEndOfContenteditable($(".harmony-beat-entry")[0]);

                    }
                    HarmonyInterop.AliasValue = [];
                    HarmonyInterop.AliasType = [];
                    HarmonyInterop.tableSelected = "";
                });
            } else if (taggedValues) {
                console.log("AliasValue not set");
            }
            if (userTypes) {
                $.each(userTypes, function (index) {
                    var tagClean = SanitiseBeatText(this);
                    tagClean = tagClean.replace(/\W$/g, "");
                    console.log(tagClean + "- @" + userTypes.Key);
                    if ("@" + userTypes.Key != tagClean.trim()) {
                        console.log("no usertype match found : @" + userTypes.Key + " " + tagClean.trim());
                        //replace function did not execute
                        //lookup name, and use correct casing.  GetUserList
                        if (!HarmonyInterop.typingInterval) {
                            HarmonyInterop.typingInterval = true;
                            sysproInterop.callHarmonyService("GET", "AutoComplete/GetUserList", { QueryValue: tagClean }, function (result) {
                                try {
                                    HarmonyInterop.typingInterval = false;
                                    var TypedResult = JSON.parse(result);
                                    if (TypedResult[0].Key != null) {
                                        userTypes.Key = TypedResult[0].Key;
                                    } else {
                                        userTypes.Key = queryValue;
                                    }
                                    if (typeof userTypes.Key == "undefined") {
                                        var queryValue = tagClean.substring(1);
                                        userTypes.Key = queryValue;
                                    }
                                    if (userTypes.Key != "") {
                                        console.log("!!!!!!!!!!!MATCHTYPE - " + userTypes.Key + " " + this);
                                        var htmlHolder = GenerateHtmlBlockFromHashAlias(userTypes.Key, userTypes.Key, null, null, null, true, null, selectedItems.length);
                                        AddReplacementsMadeItem("@" + userTypes.Key, htmlHolder);
                                        AddSelectedItem(sender, "@" + userTypes.Key, "HrmUser", "UserId", "", "", "", "");
                                        UserInput = false;
                                        sender.html(Beat.replace(userTypes[0].trim(), htmlHolder));
                                        UserInput = true;
                                        Beat = sender.html();
                                        //setEndOfContenteditable($(".harmony-beat-entry")[0]);
                                        AliasUser = [];
                                        HarmonyInterop.AliasValue = [];
                                        HarmonyInterop.AliasType = [];
                                        HarmonyInterop.tableSelected = "";


                                    }
                                }
                                catch (e) {
                                    HarmonyInterop.typingInterval = false;
                                    SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony Service ");
                                }
                            });
                        }
                    }
                    if (userTypes.Key != "") {
                        console.log("!!!!!!!!!!!MATCHTYPE - " + userTypes.Key + " " + tagClean.replace("@", "").trim());
                        // var htmlHolder = "<div class='alias-" + AliasType.DataField1 + " sys-txt-sm alert alert-info alert-dismissible sys-pd-10 sys-pd-r-20' style='display: inline-block;'><button type='button'  style='display: inline-block;' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><span class='sys-700'>" + AliasType.DataField1 + "</span></div> ";
                        var htmlHolder = GenerateHtmlBlockFromHashAlias(userTypes.Key, userTypes.Key, null, null, null, true, null, selectedItems.length);
                        if (replacementsMade.length > 0) {
                            //check for duplicates
                            var replacementDuplicates = $.inArray("@" + userTypes.Key, replacementsMade);
                            // alert("replacementDuplicates", replacementDuplicates);
                            if (replacementDuplicates > 0) {
                                replacementsMade.push({ "Alias": "@" + userTypes.Key, "Html": htmlHolder.split("'").join("\"") });
                            }
                        } else {
                            replacementsMade.push({
                                "Alias": "@" + userTypes.Key, "Html": htmlHolder.split("'").join("\"")
                            });
                        }
                        AddSelectedItem(sender, "@" + userTypes.Key, "HrmUser", "UserId", "", "", "", "");
                        UserInput = false;
                        sender.html(Beat.replace("@" + userTypes.Key, htmlHolder));
                        UserInput = true;
                        Beat = sender.html();
                        //setEndOfContenteditable($(".harmony-beat-entry")[0]);
                        HarmonyInterop.AliasValue = [];
                        HarmonyInterop.AliasType = [];
                        HarmonyInterop.tableSelected = "";
                    }

                });
            }
        }
        if (HarmonyInterop.AliasValue.length > 0) {
            //selected from menu   
            BeatText = sender.text();
            var taggedConcepts = BeatText.match(/#(\w*\b\.*(\S[^\.\s]*))([^\w.*]$)/g); //.match(/#(\w*\b\.*(\S[^\.\s]*))( )/g); //.match(/#(\w*?)\.(\w*?)( )/g)
            if (taggedConcepts) {
                $.each(taggedConcepts, function (index) {
                    var tagClean = SanitiseBeatText(this);
                    tagClean = tagClean.replace(/\W$/g, "");
                    var aliasToReplace = HarmonyInterop.getAlias(HarmonyInterop.AliasValue[0].Type, HarmonyInterop.AliasValue[0].DataField1, HarmonyInterop.AliasValue[0].Key, "");
                    var alias = HarmonyInterop.getAlias(HarmonyInterop.AliasValue[0].Type, HarmonyInterop.AliasValue[0].DataField1, HarmonyInterop.AliasValue[0].Key, "");
                    if (("#" + aliasToReplace) == tagClean.trim()) {
                        //alert("!!!!!!!!!!!MATCHVALUE - " + tagClean + " - " + "#" + aliasToReplace);
                        //using AliasType[0].Key to be case sensitive save...
                        var htmlHolder = GenerateHtmlBlockFromHashAlias(alias, HarmonyInterop.AliasType[0].DataField1, HarmonyInterop.AliasValue[0].DataField1, null, HarmonyInterop.AliasValue[0].Key, true, "", selectedItems.length);
                        AddReplacementsMadeItem("#" + alias, htmlHolder);
                        AddSelectedItem(sender, "#" + alias, HarmonyInterop.AliasValue[0].DataField3, HarmonyInterop.AliasType[0].DataField1, "", HarmonyInterop.AliasValue[0].DataField1, "", HarmonyInterop.AliasValue[0].DataField1);
                        UserInput = false;
                        //sender.html(Beat.replace("#" + aliasToReplace, htmlHolder));
                        sender.html(Beat.replace(tagClean.trim(), htmlHolder));
                        UserInput = true;
                        Beat = sender.html();
                        //setEndOfContenteditable($(".harmony-beat-entry")[0]);
                        HarmonyInterop.AliasValue = [];
                        HarmonyInterop.AliasType = [];
                        HarmonyInterop.tableSelected = "";

                    }
                });
            }
        }

        //This gets triggered  when user did not select
        if (HarmonyInterop.AliasType.length > 0) {
            BeatText = sender.text();
            var taggedTypes = BeatText.match(/#(\w*)([^\w.*]$)/g);
            var taggedValues = BeatText.match(/#(\w*\b\.*(\S[^\.\s]*))([^\w.*]$)/g);  //match(/#(\w*?)\.(\w*?)( )/g)
            if (taggedTypes) {
                $.each(taggedTypes, function (index) {
                    var tagClean = SanitiseBeatText(this);
                    tagClean = tagClean.replace(/\W$/g, "");
                    var tempDF1 = HarmonyInterop.AliasType[0].DataField1;
                    if (tagClean == "#" + HarmonyInterop.AliasType[0].Key) {
                        //alert("!!!!!!!!!!!MATCHTYPE - " + this);
                        var htmlHolder = GenerateHtmlBlockFromHashAlias(HarmonyInterop.AliasType[0].DataField1, HarmonyInterop.AliasType[0].DataField1, null, null, null, true, null, selectedItems.length);
                        AddReplacementsMadeItem("#" + HarmonyInterop.AliasType[0].DataField1, htmlHolder);
                        AddSelectedItem(sender, "#" + HarmonyInterop.AliasType[0].DataField1, HarmonyInterop.AliasType[0].DataField2, HarmonyInterop.AliasType[0].DataField1, "", "", "", "");
                        UserInput = false;
                        //sender.html(Beat.replace("#" + tempDF1, htmlHolder));
                        sender.html(Beat.replace(tagClean, htmlHolder));
                        UserInput = true;
                        Beat = sender.html();
                        //setEndOfContenteditable($(".harmony-beat-entry")[0]);
                        HarmonyInterop.AliasValue = [];
                        HarmonyInterop.AliasType = [];
                        HarmonyInterop.tableSelected = "";

                    }
                });
            } else if (taggedValues) {
                //alert("AliasValue not set");
                $.each(taggedValues, function (index) {
                    var value = this.toString();
                    //removing special characters at end of tagged word
                    var cleanValue = value.match(/#(\S*)\w($[$\s])/g);
                    var aliasValue;
                    var aliasToReplace;
                    if (cleanValue) {
                        aliasValue = cleanValue[0].toString().trim();
                        aliasToReplace = cleanValue[0].toString().trim();
                    }
                    else {
                        aliasValue = value.trim();
                        aliasToReplace = value.trim();
                    }
                    aliasValue = aliasValue.replace("#", "");
                    aliasValue = aliasValue.split(".");

                    //     GetKeyFieldValue - when the user types in a key word, convert to correct key i.e. "1" vs "0000001"
                    if (HarmonyInterop.tableSelected != "" && HarmonyInterop.categorySelected != "" && aliasValue[1] != "") {
                        if (!HarmonyInterop.typingInterval) {
                            HarmonyInterop.typingInterval = true;
                            sysproInterop.callHarmonyService("GET", "AutoComplete/GetKeyFieldValue", { RootName: HarmonyInterop.tableSelected, KeyColumnName: HarmonyInterop.categorySelected, KeyFieldValue: aliasValue[1] }, function (result) {
                                try {
                                    HarmonyInterop.typingInterval = false;
                                    var TypedResult = JSON.parse(result);
                                    //if it is null then its a UDF value
                                    if (TypedResult.DataField1 != null) {
                                        HarmonyInterop.fieldSelected = TypedResult.DataField1;
                                        HarmonyInterop.tableSelected = TypedResult.DataField3;
                                        HarmonyInterop.categorySelected = TypedResult.Type;
                                        //if user did not select by clicking this will still be empty - lets set it manually:
                                        var manualObject = [{
                                            "DataField1": HarmonyInterop.fieldSelected,
                                            "DataField2": "",
                                            "DataField3": HarmonyInterop.tableSelected,
                                            "Key": "",
                                            "Type": HarmonyInterop.categorySelected
                                        }];
                                    } else {
                                        HarmonyInterop.fieldSelected = aliasValue[1];
                                        HarmonyInterop.categorySelected = aliasValue[0];
                                        //if user did not select by clicking this will still be empty - lets set it manually:
                                        var manualObject = [{
                                            "DataField1": HarmonyInterop.fieldSelected,
                                            "DataField2": "",
                                            "DataField3": HarmonyInterop.tableSelected,
                                            "Key": "",
                                            "Type": HarmonyInterop.categorySelected
                                        }];
                                    }


                                    var alias = ('#' + HarmonyInterop.categorySelected + "." + HarmonyInterop.fieldSelected);
                                    var htmlHolder = GenerateHtmlBlockFromHashAlias(HarmonyInterop.categorySelected + "." + HarmonyInterop.fieldSelected, HarmonyInterop.categorySelected, HarmonyInterop.fieldSelected, null, null, true, "", selectedItems.length);
                                    AddReplacementsMadeItem(alias, htmlHolder);
                                    AddSelectedItem(sender, alias, HarmonyInterop.tableSelected, alias, "", "", "", "");
                                    UserInput = false;
                                    sender.html(Beat.replace(aliasToReplace, htmlHolder));
                                    UserInput = true;
                                    Beat = sender.html();
                                    //setEndOfContenteditable($(".harmony-beat-entry")[0]);
                                    HarmonyInterop.AliasValue = [];
                                    HarmonyInterop.AliasType = [];
                                    HarmonyInterop.tableSelected = "";
                                    HarmonyInterop.fieldSelected = "";
                                    HarmonyInterop.categorySelected = "";


                                }
                                catch (e) {
                                    HarmonyInterop.typingInterval = false;
                                    SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony Service ");

                                }
                            });
                        }
                    }
                    //var aliasToReplace = cleanValue[0].toString().trim(); //('#' + aliasValue[0] + "." + aliasValue[1]);


                });
            }
        }
        if (typeof AliasUser != "undefined") {
            BeatText = sender.text();
            var userTypes = BeatText.match(/@(\w*)([^\w*]$)/g);
            if (userTypes) {
                $.each(userTypes, function (index) {
                    var tagClean = SanitiseBeatText(this);
                    tagClean = tagClean.replace(/\W$/g, "");
                    if ("@" + userTypes.Key != tagClean.trim()) {
                        console.log("no usertype match found : @" + userTypes.Key + " " + this + "");
                        //replace function did not execute
                        //AliasType will not contain this information
                        //lookup name, and use correct casing.  GetUserList
                        if (!HarmonyInterop.typingInterval) {
                            HarmonyInterop.typingInterval = true;
                            var queryValue = tagClean.substring(1);
                            sysproInterop.callHarmonyService("GET", "AutoComplete/GetUserList", { QueryValue: queryValue }, function (result) {
                                try {
                                    HarmonyInterop.typingInterval = false;
                                    var TypedResult = JSON.parse(result);
                                    if (TypedResult[0].Key != null) {
                                        userTypes.Key = TypedResult[0].Key;
                                    } else {
                                        userTypes.Key = queryValue;
                                    }
                                    if (typeof userTypes.Key == "undefined") {
                                        var queryValue = tagClean.substring(1);
                                        userTypes.Key = queryValue;
                                    }
                                    if (userTypes.Key != "") {
                                        console.log("!!!!!!!!!!!MATCHTYPE - " + userTypes.Key + " " + this);
                                        var htmlHolder = GenerateHtmlBlockFromHashAlias(userTypes.Key, userTypes.Key, null, null, null, true, null, selectedItems.length);
                                        AddReplacementsMadeItem("@" + userTypes.Key, htmlHolder);
                                        AddSelectedItem(sender, "@" + userTypes.Key, "HrmUser", "UserId", "", "", "", "");
                                        UserInput = false;
                                        sender.html(Beat.replace(userTypes[0].trim(), htmlHolder));
                                        UserInput = true;
                                        Beat = sender.html();
                                        //setEndOfContenteditable($(".harmony-beat-entry")[0]);
                                        AliasUser = [];
                                        HarmonyInterop.AliasValue = [];
                                        HarmonyInterop.AliasType = [];
                                        HarmonyInterop.tableSelected = "";


                                    }
                                }
                                catch (e) {
                                    HarmonyInterop.typingInterval = false;
                                    SYSPRO_VB.showErrorMessage(e.message, "Error Calling Harmony Service ");
                                }
                            });
                        }
                        console.log(userTypes.Key);
                    }

                });
            }
        }
    }
}

//------------------------------------------------
//  sets the caret at the end of the line
// this was returning end of memory error when replying to beat
//  i am leaving this here if in future i want to attempt something
// like this again.... been there - done that...
//------------------------------------------------
function setEndOfContenteditable(contentEditableElement) {
    alert("setEndOfContenteditable");
    var range, selection;
    if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if (document.selection)//IE 8 and lower
    {
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }

}
function FindFollowItem(FollowItems, Alias) {
    var ItemFound = null;
    $.each(FollowItems, function (index) {
        //console.log("FindFollowItem - " + Alias + ", " + this.Alias)
        if (this.Alias === Alias) {
            //   console.log("FindFollowItem Matched- " + Alias + ", " + this.Alias)
            ItemFound = this;
        }
    });
    return ItemFound;
}

function ProcessFeedHtml(Feed, FollowItems) {
    //console.log("ProcessFeedHtml-1+" + FollowItems.length);
    var TaggedFourthExp = Feed.match(/(\#\w*\.\S*\.\S*\w|$)/g);//Feed.match(/(\B#\w*\b\.*(\S[^\.\s]*)\.*(\S[^\.\s]*)\.*(\S[^\.\s]*)|$)/g);
    var TaggedFullExp = Feed.match(/(\B#\w*\b\.*(\S[^\.\s]*)\.*(\S[^\.\s]*)|$)/g); // Feed.match(/#(\w*?)\.(\w*?)\.(\w*?)(?=[^\w\.]|$)/g);
    var TaggedHalfExp = Feed.match(/#(\w*?)\.(\w*?)(?=[^\w\.]|$)/g); //Feed.match(/#(\w*)([^\w.*]$)/g);
    var TaggedRootExp = Feed.match(/#(\w*?)(?=[^\w\.]|$)/g);
    var UserExp = Feed.match(/@(\w*?)(?=[^\w\.]|$)/g);

    if (TaggedFourthExp) {
        $.each(TaggedFourthExp, function (index) {
            var HolderIn = this + "";

            var FollowItem = FindFollowItem(FollowItems, HolderIn);
            if (FollowItem) {
                var Alias = HolderIn.substring(1);
                var TypeName = HolderIn.substring(1, HolderIn.indexOf("."));
                var Value = HolderIn.substring(HolderIn.indexOf(".") + 1, HolderIn.lastIndexOf("."));
                var endLength = HolderIn.indexOf(" ");
                if (endLength === -1) {
                    endLength = HolderIn.length;
                }
                var FieldName = HolderIn.substring(HolderIn.lastIndexOf(".") + 1, endLength);
                var htmlHolder = GenerateHtmlBlockFromHashAlias(Alias, FollowItem.KeyColumn, FollowItem.KeyValue, FollowItem.FollowField, FollowItem.CurrentValue, false, FollowItem.FollowItemId, null, FollowItem.KeyDescription);
                //var htmlHolder = "<div class='alias-" + Alias + " sys-txt-sm alert alert-info alert-dismissible sys-pd-10 sys-pd-r-20' style='display: inline-block;'><button type='button'  style='display: inline-block;' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><span class='sys-700'>" + TypeName + ":  " + Value + "</span><span></br>" + FieldName + "</span></div> ";
                Feed = Feed.replace(this + "", htmlHolder);
            }
        });
    }
    if (TaggedFullExp) {
        $.each(TaggedFullExp, function (index) {
            var HolderIn = this + "";

            var FollowItem = FindFollowItem(FollowItems, HolderIn);
            if (FollowItem) {
                var Alias = HolderIn.substring(1);


                var TypeName = HolderIn.substring(1, HolderIn.indexOf("."));

                var Value = HolderIn.substring(HolderIn.indexOf(".") + 1, HolderIn.lastIndexOf("."));

                var endLength = HolderIn.indexOf(" ");
                if (endLength === -1) {
                    endLength = HolderIn.length;
                }
                var FieldName = HolderIn.substring(HolderIn.lastIndexOf(".") + 1, endLength);
                var htmlHolder = GenerateHtmlBlockFromHashAlias(Alias, FollowItem.KeyColumn, FollowItem.KeyValue, FollowItem.FollowField, FollowItem.CurrentValue, false, FollowItem.FollowItemId, null, FollowItem.KeyDescription);
                //var htmlHolder = "<div class='alias-" + Alias + " sys-txt-sm alert alert-info alert-dismissible sys-pd-10 sys-pd-r-20' style='display: inline-block;'><button type='button'  style='display: inline-block;' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><span class='sys-700'>" + TypeName + ":  " + Value + "</span><span></br>" + FieldName + "</span></div> ";
                Feed = Feed.replace(this + "", htmlHolder);
            }
        });
    }

    if (TaggedHalfExp) {
        $.each(TaggedHalfExp, function (index) {
            var half = this.toString();
            var cleanValue = half.match(/#(\S*)\w|$[$\s]/g);
            var cleanType = cleanValue[0].toString();

            var HolderIn = cleanType + "";

            var Alias = HolderIn.substring(1);

            var FollowItem = FindFollowItem(FollowItems, HolderIn);

            if (FollowItem) {

                var TypeName = HolderIn.substring(1, HolderIn.indexOf("."));
                var endLength = HolderIn.indexOf(" ");
                if (endLength === -1) {
                    endLength = HolderIn.length;
                }
                var Value = HolderIn.substring(HolderIn.indexOf(".") + 1, endLength);
                var htmlHolder = GenerateHtmlBlockFromHashAlias(Alias, FollowItem.KeyColumn, FollowItem.KeyValue, FollowItem.FollowField, FollowItem.CurrentValue, false, FollowItem.FollowItemId, null, FollowItem.KeyDescription);
                //var htmlHolder = GenerateHtmlBlockFromHashAlias(Alias, TypeName, Value, null, null, false);
                Feed = Feed.replace(this + "", htmlHolder);
            }
        });
    }

    if (TaggedRootExp) {
        $.each(TaggedRootExp, function (index) {
            var HolderIn = this + "";
            var FollowItem = FindFollowItem(FollowItems, HolderIn);
            if (FollowItem) {
                var Alias = HolderIn.substring(1);
                var TypeName = Alias;
                var htmlHolder = GenerateHtmlBlockFromHashAlias(Alias, FollowItem.KeyColumn, FollowItem.KeyValue, FollowItem.FollowField, FollowItem.CurrentValue, false, FollowItem.FollowItemId, null, FollowItem.KeyDescription);
                //var htmlHolder = GenerateHtmlBlockFromHashAlias(Alias, TypeName, null, null, null, false);
                //var htmlHolder = "<div class='alias-" + Alias + " sys-txt-sm alert alert-info alert-dismissible sys-pd-10 sys-pd-r-20' style='display: inline-block;'><button type='button'  style='display: inline-block;' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><span class='sys-700'>" + TypeName + "</span></div>";
                Feed = Feed.replace(this + "", htmlHolder);
            }
        });
    }
    if (UserExp) {
        $.each(UserExp, function (index) {
            var HolderIn = this + "";
            var FollowItem = FindFollowItem(FollowItems, HolderIn);
            if (FollowItem) {
                var Alias = HolderIn.substring(1);
                var TypeName = Alias;
                var htmlHolder = GenerateHtmlBlockFromHashAlias(Alias, Alias, null, null, null, false, FollowItem.FollowItemId);
                //var htmlHolder = GenerateHtmlBlockFromHashAlias(Alias, TypeName, null, null, null, false);
                //var htmlHolder = "<div class='alias-" + Alias + " sys-txt-sm alert alert-info alert-dismissible sys-pd-10 sys-pd-r-20' style='display: inline-block;'><button type='button'  style='display: inline-block;' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><span class='sys-700'>" + TypeName + "</span></div>";
                Feed = Feed.replace(this + "", htmlHolder);
            }
        });
    }

    return Feed;
}

//MC pls dont add "#" colors here, it confuses textcomplete with "#" follow items
function GenerateHtmlBlockFromHashAlias(Alias, Type, Key, Field, FieldValue, IncludeClose, FollowItemId, Identifier, KeyDescription) {
    var fielditem = false;
    var buttonHtml = "";
    if (IncludeClose)
        buttonHtml = "<i class='material-icons sys-txt-xs pull-right' style='color:rgba(51,51,51); margin-bottom: 8px;' onclick='HarmonyInterop.removeTextCompleteWord(this)'>close</i>";

    var fieldHtml = "";
    var headerHtml = "";
    var htmlHolder = "<span contenteditable='false' class='text-muted sys-txt-md' data-followitemid='" + FollowItemId + "'>";
    if (Field) {
        fieldHtml = buttonHtml + "<span contenteditable='false' class='text-muted sys-txt-md sys-mg-t-2' ></br>" + Field + ": " + FieldValue;
        fielditem = true;
    }
    if (Type == "Contact") {
        var fieldCaption = Type.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
        var aliasSplit = Alias.split(".");
        var contactfield;
        if (aliasSplit.length > 1)
            contactfield = aliasSplit[1];
        else
            contactfield = "";
        if (fielditem) {
            headerHtml = "<a style='background-color: aliceblue !important; text-decoration: none !important; border-bottom-color: rgb(0,120,215); border-bottom-width: thin; border-bottom-style: solid;' onclick='sysproInterop.showSmartTag(this)' data-fieldcaption='ESPRESSOKEYFIELD:" + fieldCaption + "' data-fieldvalue='" + Key + "'><span contenteditable='false' class='sys-500 text-muted' >" + Type + ":  " + contactfield + "</a>";
        } else {
            headerHtml = "<a style='background-color: aliceblue !important; text-decoration: none !important; border-bottom-color: rgb(0,120,215); border-bottom-width: thin; border-bottom-style: solid;' onclick='sysproInterop.showSmartTag(this)' data-fieldcaption='ESPRESSOKEYFIELD:" + fieldCaption + "' data-fieldvalue='" + Key + "'><span contenteditable='false' class='sys-500 text-muted' >" + Type + ":  " + contactfield + buttonHtml + "</a>";
        }

    } else if (Key) {
        //Replace upper with lower with space inbetween
        var fieldCaption = Type.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
        if (KeyDescription) {
            if (fielditem) {
                headerHtml = "<a style='background-color: aliceblue !important; text-decoration: none !important; border-bottom-color: rgb(0,120,215); border-bottom-width: thin; border-bottom-style: solid;' onclick='sysproInterop.showSmartTag(this)' data-fieldcaption='ESPRESSOKEYFIELD:" + fieldCaption + "' data-fieldvalue='" + Key + "'><span contenteditable='false' class='sys-500 text-muted' >" + Type + ":  " + Key + " - " + KeyDescription + "</a>";
            } else {
                headerHtml = "<a style='background-color: aliceblue !important; text-decoration: none !important; border-bottom-color: rgb(0,120,215); border-bottom-width: thin; border-bottom-style: solid;' onclick='sysproInterop.showSmartTag(this)' data-fieldcaption='ESPRESSOKEYFIELD:" + fieldCaption + "' data-fieldvalue='" + Key + "'><span contenteditable='false' class='sys-500 text-muted' >" + Type + ":  " + Key + " - " + KeyDescription + buttonHtml + "</a>";
            }
        } else {
            if (fielditem) {
                headerHtml = "<a style='background-color: aliceblue !important; text-decoration: none !important; border-bottom-color: rgb(0,120,215); border-bottom-width: thin; border-bottom-style: solid;' onclick='sysproInterop.showSmartTag(this)' data-fieldcaption='ESPRESSOKEYFIELD:" + fieldCaption + "' data-fieldvalue='" + Key + "'><span contenteditable='false' class='sys-500 text-muted' >" + Type + ":  " + Key + "</a>";
            } else {
                headerHtml = "<a style='background-color: aliceblue !important; text-decoration: none !important; border-bottom-color: rgb(0,120,215); border-bottom-width: thin; border-bottom-style: solid;' onclick='sysproInterop.showSmartTag(this)' data-fieldcaption='ESPRESSOKEYFIELD:" + fieldCaption + "' data-fieldvalue='" + Key + "'><span contenteditable='false' class='sys-500 text-muted' >" + Type + ":  " + Key + buttonHtml + "</a>";
            }
        }
    }
    else if (Type) {
        if (fielditem) {
            headerHtml = "<span contenteditable='false' class='sys-500 text-muted'>" + Type;
        }
        else {
            headerHtml = "<span contenteditable='false' class='sys-500 text-muted'>" + Type + buttonHtml;

        }
    } else {
        headerHtml = "<span contenteditable='false' class='sys-500 text-muted' >" + Alias;
    }

    htmlHolder = "<div class='alias-" + Alias + " harmony-text-complete hrm-key-field-template' contenteditable='false' data-identifier=" + Identifier + ">" + htmlHolder + headerHtml + fieldHtml + "</span></span></div>";
    return htmlHolder;
}
//Removing any unwanted html
function SanitiseBeatText(BeatClean) {
    var DivBeat = "<div>" + BeatClean + "</div>";
    var cleanBeat = $(DivBeat).text();
    // alert("cleanBeat : " + cleanBeat);
    return cleanBeat;
}

//contains the replacement arrays build up with # entries
function AddReplacementsMadeItem(AliasHolder, htmHolder) {
    if (AliasHolder.indexOf("undefined") == -1) {
        //MD:  not adding duplicates effected the final formatting of the items when posting
        //if (replacementsMade.length > 0) {
            //check for duplicates
           // var replacementDuplicates = $.grep(replacementsMade, function (n) { return n.Alias == AliasHolder })
            //if (replacementDuplicates.length == 0) {
             //   replacementsMade.push({ "Alias": AliasHolder, "Html": htmHolder.split("'").join("\"") });
         //   }
      //  } else {
            replacementsMade.push({
                "Alias": AliasHolder, "Html": htmHolder.split("'").join("\"")
            });
   //     }
    }
}

//containing all entred '#' words in beat
function AddSelectedItem(div, alias, table, keycolumn, followfield, keyvalue, context, currentvalue) {
    if (alias.indexOf("undefined") == -1) {
        if (selectedItems.length > 0) {
            //check for duplicates:
            var selectedDuplicates = $.grep(selectedItems, function (n) { return n.Alias == alias; })
            if (selectedDuplicates.length == 0) {
                selectedItems.push({
                    "Index": div.prop("selectionStart"),
                    "Alias": alias,
                    "TableName": table,
                    "KeyColumn": keycolumn,
                    "FollowField": followfield,
                    "KeyValue": keyvalue,
                    "Context": context,
                    "CurrentValue": currentvalue,
                    "Identifier": selectedItems.length  //MC:  i added the identifier, when deleting selection i need to identify the entry
                });
            }
        } else {
            selectedItems.push({
                "Index": div.prop("selectionStart"),
                "Alias": alias,
                "TableName": table,
                "KeyColumn": keycolumn,
                "FollowField": followfield,
                "KeyValue": keyvalue,
                "Context": context,
                "CurrentValue": currentvalue,
                "Identifier": 0
            });
        }
        //cleanout all arrays:
        HarmonyInterop.AliasValue = [];
        HarmonyInterop.AliasType = [];
        HarmonyInterop.tableSelected = "";
    }
}
function PostBeatClicked(div) {
    try {

        console.log("PostBeatClicked - " + div);

        var DivIn = div;
        var Beat = DivIn.html();
        //mc:  html() replaces special characters - this changes them back
        Beat = Beat.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');

        //Dont post empty beats
        var beatTrim = Beat.replace(/\s+/g, '');
        beatTrim = beatTrim.replace(/&nbsp;/g, '');
        var emptybeat = beatTrim.trim().length <= 0;

        if (!emptybeat) {
            var BeatClean = "";
            BeatClean = Beat;
            //check for any missing stuff...
            //AliasType / Value should be set if post ends with #StockCode.A100
            if (HarmonyInterop.AliasType.length > 0 || HarmonyInterop.AliasValue.length > 0) {
                if (HarmonyInterop.AliasType.length > 0) {
                    var htmlHolder = GenerateHtmlBlockFromHashAlias(HarmonyInterop.AliasType[0].DataField1, HarmonyInterop.AliasType[0].DataField1, null, null, null, true, null, selectedItems.length);
                    AddReplacementsMadeItem("#" + HarmonyInterop.AliasType[0].DataField1, htmlHolder);
                    AddSelectedItem($('.harmony-beat-entry', div), "#" + HarmonyInterop.AliasType[0].DataField1, HarmonyInterop.AliasType[0].DataField3, HarmonyInterop.AliasType[0].DataField1, "", "", "", "");

                }
                if (HarmonyInterop.AliasValue.length > 0) {
                    var alias = HarmonyInterop.getAlias(HarmonyInterop.AliasValue[0].Type, HarmonyInterop.AliasValue[0].DataField1, HarmonyInterop.AliasValue[0].Key, "");
                    var htmlHolder = GenerateHtmlBlockFromHashAlias(alias, HarmonyInterop.AliasValue[0].Type, HarmonyInterop.AliasValue[0].DataField1, null, null, true, "", selectedItems.length);
                    AddReplacementsMadeItem("#" + alias, htmlHolder);
                    AddSelectedItem($('.harmony-beat-entry', div), "#" + alias, HarmonyInterop.AliasValue[0].DataField3, HarmonyInterop.AliasValue[0].Type, "", HarmonyInterop.AliasValue[0].DataField1, "", HarmonyInterop.AliasValue[0].DataField1);
                }
            }
            if (replacementsMade) {
                $.each(replacementsMade, function (index) {
                    console.log("replacementsMade - " + this.Alias + " - " + this.Html);
                    var startIndex = BeatClean.indexOf("<div class=\"alias-" + this.Alias.substring(1));
                    if (startIndex > -1) {
                        var toReplace = BeatClean.substring(startIndex, BeatClean.indexOf("</div>", startIndex) + 6);
                        console.log("toReplace - " + toReplace);
                        BeatClean = BeatClean.replace(toReplace, this.Alias);
                    }
                });
            }

            //cleanup HTML stuff
            BeatClean = SanitiseBeatText(BeatClean);

            var beatText = "Post Beat clicked: " + Beat;

            var taggedWords = [];
            var finalList = [];
            //console.log("PostBeatClicked - " + Beat);
            //console.log("PostBeatClickedClean - " + BeatClean);

            //Step1:  list of words starts with # and end with space.
            taggedWords = BeatClean.match(/#(\S*)\w|$[$\s]/g);  //match(/#(\S*)( )/g); //.match(/#(\w*)( )/g);

            if (!selectedItems) {
                selectedItems = [];
            }
            $.each(selectedItems, function (index) {
                if (selectedItems[index].TableName == "") {
                    selectedItems[index].TableName = "UserDefined";
                }
                //word contains something like #Test.MyTest, MyTest = KeyValue & Test = KeyColumn
                if (selectedItems[index].KeyColumn.indexOf(".") >= 0 && selectedItems[index].KeyValue == "") {
                    var fullStopPosition = selectedItems[index].KeyColumn.indexOf(".");
                    selectedItems[index].KeyValue = selectedItems[index].KeyColumn.substring(fullStopPosition + 1);
                    if (selectedItems[index].KeyColumn.indexOf("#") >= 0) {
                        selectedItems[index].KeyColumn = selectedItems[index].KeyColumn.substring(1, fullStopPosition);
                    }
                }
                finalList.push(selectedItems[index]);
            });

            if (!taggedWords) {
                taggedWords = [];
            }
            //Step2:  Compare with values in selectedItems
            // only continue if # was posted
            if (taggedWords.length !== null || selectedItems.length !== 0) {
                for (var i = 0; i < taggedWords.length; i++) {
                    var entryFound = false;
                    for (var j = 0; j < selectedItems.length; j++) {
                        console.log("taggedWords - " + taggedWords[i] + "," + selectedItems[j].Alias);
                        if (taggedWords[i] === selectedItems[j].Alias) {
                            if (!entryFound) {
                                entryFound = true;
                            }
                        }
                    } if (entryFound === false) {
                        // finalList.push({"Alias"taggedWords[i]);
                        var exclHash = taggedWords[i].replace("#", "");
                        //find keyvalue in word #keyColumn.KeyValue 
                        var keyValue;
                        var keyColumn;
                        var fullStopPosition = exclHash.indexOf(".");

                        if (exclHash.indexOf(".") > 0) {
                            keyColumn = exclHash.substring(0, fullStopPosition);
                            keyValue = exclHash.substring(fullStopPosition + 1);
                        } else {
                            keyValue = "";
                            keyColumn = exclHash;
                        }
                        finalList.push({
                            "Index": i,
                            "Alias": taggedWords[i],
                            "TableName": "UserDefined",
                            "KeyColumn": keyColumn,
                            "FollowField": "",
                            "KeyValue": keyValue,
                            "Context": "",
                            "CurrentValue": ""
                        });
                    }
                }
            }

            //Step3:  looping through all the # fields that was added to the array
            for (var k = 0; k < finalList.length; k++) {
                if (k === 0)
                    beatText += " Trending fields : " + finalList[k];
                else
                    beatText += ", " + finalList[k];
            }
            // SYSPRO_VB.showErrorMessage(beatText);
            HarmonyInterop.PostBeat(DivIn, BeatClean, finalList);
            //cleanout all arrays:
            HarmonyInterop.AliasValue = [];
            HarmonyInterop.AliasType = [];
            HarmonyInterop.tableSelected = "";
        }
    } catch (e) {
        SYSPRO_VB.showErrorMessage("error when posting a beat! " + e.message);
    }
}


//----------------------------------------------------------------------------------------//
//When the User admires a beat, Update the Harmony Database                               //
//----------------------------------------------------------------------------------------//
function AdmiredClicked() {
    try {

        var BeatDiv = $(event.target).closest("[data-beatid]");

        var BeatId = BeatDiv.attr('data-beatid');

        var UserIdDiv = $(event.target).closest("[data-userid]");
        var UserId = UserIdDiv.attr("data-userid");

        var hasDefaultClass = $(event.target).hasClass("btn-default");

        var AdmiredCount = $(event.target).children("span").text();

        AdmiredCount = parseInt($(event.target).children("span").text());

        if (hasDefaultClass) {
            //Get Beat Beat Id        
            HarmonyInterop.AdmireBeat(BeatId, UserId);

            AdmiredCount++;
            $(event.target).addClass("btn-admired").removeClass("btn-default");

            // set text before displaying message     
            $(event.target).children("span").text(AdmiredCount);
            $(event.target).children("span").addClass("text-admired").removeClass("text-muted");
            $(event.target).children("i").text("favorite");
        }
        else {
            HarmonyInterop.UnAdmireBeat(BeatId, UserId);
            AdmiredCount--;
            $(event.target).addClass("btn-default").removeClass("btn-admired");

            // set text before displaying message              
            $(event.target).children("span").text(AdmiredCount);
            $(event.target).children("span").addClass("text-muted").removeClass("text-admired");
            $(event.target).children("i").text("favorite_border");
        }
    } catch (e) {
        alert(e.message);
    }
}

//when the user rebeats a beat
function RebeatClicked() {
    try {

        var BeatDiv = $(event.target).closest("[data-beatid]");
        var BeatId = BeatDiv.attr('data-beatid');

        console.log($(event.target).children("span"));

        var RebeatCount = $(event.target).children("span").text();
        RebeatCount = $(event.target).find('span').text();

        RebeatCount = parseInt($(event.target).children("span").text());
        if (RebeatCount == 0) {
            HarmonyInterop.Rebeat(BeatId);
            RebeatCount++;

            // set text before displaying message     
            $(event.target).children("span").text(RebeatCount);
            $(event.target).addClass("btn-rebeat").removeClass("btn-default");

            // set text before displaying message     
            $(event.target).closest("span").addClass("text-rebeat").removeClass("text-muted");
        }
    } catch (e) {
        SYSPRO_VB.showErrorMessage("error on Rebeat! " + e.message);
    }
}

//Get Geo Location

function getGeoLocationOfBeat() {

    var GeoLocation = "";

    if (!navigator.geolocation) {
        return "";
    }

    function success(position) {

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        ClientGeoLocation = latitude + ';' + longitude;

        console.log("GeoLocation:" + ClientGeoLocation);

        //Build up the address inforamtion
        GetPlaceFromLatLng(ClientGeoLocation)

        return ClientGeoLocation;
    }

    function error() {
        GeoLocation = "Unable to retrieve your location";
    }

    navigator.geolocation.getCurrentPosition(success, error);
}

function prompt(window, pref, message, callback) {

    return callback(true);

    var branch = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefBranch);

    if (branch.getPrefType(pref) === branch.PREF_STRING) {
        switch (branch.getCharPref(pref)) {
            case "always":
                return callback(true);
            case "never":
                return callback(false);
        }
    }

    function remember(value, result) {
        return function () {
            done = true;
            branch.setCharPref(pref, value);
            callback(result);
        }
    }

    var self = window.PopupNotifications.show(
        window.gBrowser.selectedBrowser,
        "geolocation",
        message,
        "geo-notification-icon",
    {
        label: "Share Location",
        accessKey: "S",
        callback: function (notification) {
            done = true;
            callback(true);
        }
    }, [
                {
                    label: "Always Share",
                    accessKey: "A",
                    callback: remember("always", true)
                },
                {
                    label: "Never Share",
                    accessKey: "N",
                    callback: remember("never", false)
                }
    ], {
        eventCallback: function (event) {
            if (event === "dismissed") {
                if (!done) callback(false);
                done = true;
                window.PopupNotifications.remove(self);
            }
        },
        persistWhileVisible: true
    });
}

//Gets the city for the Latitude and Longitiude
function GetPlaceFromLatLng(location) {
    if (location == "" || location == null)
        return "";

    var result = location.split(";");

    if (result.length == 2) {

        Convert_LatLng_To_Address(result[0], result[1]);

        if (!address['city'])
            return address['city'];
        else
            return location;

        callback();
    }
    else {
        return "";
    }
    return location;
}

//Reverse Longitude, latitude
/*
   * Get the json file from Google Geo
   */
function Convert_LatLng_To_Address(lat, lng, callback) {
    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=false";
    jQuery.getJSON(url, function (json) {
        Create_Address(json, callback);
        callback();
    });
}

/*
* Create an address out of the json 
*/
function Create_Address(json, callback) {
    if (!check_status(json)) // If the json file's status is not ok, then return
        return 0;
    address['country'] = google_getCountry(json);
    address['province'] = google_getProvince(json);
    address['city'] = google_getCity(json);
    address['street'] = google_getStreet(json);
    address['postal_code'] = google_getPostalCode(json);
    address['country_code'] = google_getCountryCode(json);
    address['formatted_address'] = google_getAddress(json);
    callback();
}

/* 
* Check if the json data from Google Geo is valid 
*/
function check_status(json) {
    if (json["status"] == "OK") return true;
    return false;
}

/*
* Given Google Geocode json, return the value in the specified element of the array
*/

function google_getCountry(json) {
    return Find_Long_Name_Given_Type("country", json["results"][0]["address_components"], false);
}
function google_getProvince(json) {
    return Find_Long_Name_Given_Type("administrative_area_level_1", json["results"][0]["address_components"], true);
}
function google_getCity(json) {
    return Find_Long_Name_Given_Type("locality", json["results"][0]["address_components"], false);
}
function google_getStreet(json) {
    return Find_Long_Name_Given_Type("street_number", json["results"][0]["address_components"], false) + ' ' + Find_Long_Name_Given_Type("route", json["results"][0]["address_components"], false);
}
function google_getPostalCode(json) {
    return Find_Long_Name_Given_Type("postal_code", json["results"][0]["address_components"], false);
}
function google_getCountryCode(json) {
    return Find_Long_Name_Given_Type("country", json["results"][0]["address_components"], true);
}
function google_getAddress(json) {
    return json["results"][0]["formatted_address"];
}

/*
* Searching in Google Geo json, return the long name given the type. 
* (if short_name is true, return short name)
*/

function Find_Long_Name_Given_Type(t, a, short_name) {
    var key;
    for (key in a) {
        if ((a[key]["types"]).indexOf(t) != -1) {
            if (short_name)
                return a[key]["short_name"];
            return a[key]["long_name"];
        }
    }
}


//When the user replies to a beat, show the compose screen with the replies listed below
function ComposeReplyToBeat(e) {
    try {

        if ($("#Harmony-Reply-Template").length > 0) {
            $('.HarmonyReplies').remove();
            $('.HrmBeatItem').show();

            //Get the replies template
            var HrmReplyTemplate = kendo.template($("#Harmony-Reply-Template").html());
            var BeatDiv = $(event.target).closest("[data-beatid]");

            //Get the User and Beat Id
            var BeatId = BeatDiv.attr('data-beatid');
            console.log("01 ComposeReplyToBeat");
            var ReplyData = {
                User: BeatDiv.attr('data-user')
                , Url: BeatDiv.attr('data-Url')
                , TimeAgo: BeatDiv.attr('data-TimeAgo')
                , Location: BeatDiv.attr('data-Location')
                , Sentiment: BeatDiv.attr('data-Sentiment')
                , Feed: BeatDiv.attr('data-Feed')
                , BeatId: BeatDiv.attr('data-beatid')
                , Media: BeatDiv.attr('data-Media')
                , NumberOfAttachments: BeatDiv.attr('data-NumberOfAttachments')
            };

            //ComposeReply 
            var result = HrmReplyTemplate(ReplyData);

            console.log("02 ComposeReplyToBeat");

            var addeddiv = BeatDiv.prepend(result);
            BeatDiv.children().show();

            //Initialize the auto complete
            HarmonyInterop.initializeAutoComplete(addeddiv, BeatId);
            HarmonyInterop.InitializeAttachments();

            //pause the carousel 
            if ($("#feed").length > 0) {
                $("#feed").carousel('pause');
            }

            //Hide the beat Item information
            var HrmBeatItem = BeatDiv.find(".HrmBeatItem");

            if (HrmBeatItem.is(':visible')) {
                $(HrmBeatItem).hide();
            } else {
                $(HrmBeatItem).show();
            }
            var mm = BeatDiv.find(".hrm-key-field-template");
            mm.addClass("hrm-key-field-template-reply");

            //Append replies to this
            sysproInterop.callHarmonyService("GET", "NewsFeeds/GetFollowItemReplies", { ParentBeatId: BeatId }, function (result) {
                try {
                    var TypedResult = JSON.parse(result);
                    var otherresult = "";

                    //Carry on processing if there are beats
                    if (TypedResult.Beats == null) {

                        //Generate HTML and insert with replies
                        //Replace all #'s with nicely templated html  chunks.            
                        $.each(TypedResult.Beats, function (index) {
                            this.Feed = ProcessFeedHtml(this.Feed, this.FollowItems);
                        });
                    }

                    //Parse the result
                    var HarmonyObservable = kendo.observable(TypedResult);

                    //Loop through the JSON and Generate HTML
                    $.each(TypedResult.Beats, function (index, element) {

                        //Get HTML Template
                        var template = kendo.template($("#beats_template").html());

                        var templateData = template(TypedResult.Beats[index]);

                        templateData = templateData.split("beat-border").join("");
                        templateData = templateData.split("reply-border").join("beat-reply-border");

                        templateData = templateData.split("col-xs-3").join("col-xs-6");
                        templateData = templateData.split("col-sm-3").join("col-sm-6");

                        otherresult += templateData;

                        //Get the attachment template
                        $("#example").html(otherresult);

                        $(".hrm-reply-to-remove", "#example").remove();
                    });

                } catch (e) {
                    SYSPRO_VB.showErrorMessage(e.message, "Error on GetFollowItemReplies");
                }
            },
                   function (error) {
                       SYSPRO_VB.showErrorMessage(error.ErrorMessage, "Error Calling Harmony Service");
                   });
        } else {
            sysproInterop.showErrorMessage("'Reply to beat' component is needed to reply to a beat.  Please add the missing component to use this functionality.", "Missing component");
        }
    } catch (e) {
        SYSPRO_VB.showErrorMessage("error on Rebeat! " + e.message);
    }
}

//(function () {
//    window.addEventListener("SYSPRO.Harmony.Search", function (e) {       
//        //console.log(e.detail.ItemDetail.FollowItemId);

//        var typedResult = {};

//        if ((e.detail == null) || (e.detail.isRoot)) {
//            typedResult.data = {};
//            typedResult.data.detail = e.detail;

//            var observableDetail = kendo.observable(typedResult);

//            kendo.bind($("#trendingDetail"), observableDetail);
//            kendo.bind($("#trendingDetailKeyInfo"), observableDetail);
//            $("#trendingDetailPieChart").hide();

//            return;
//        }

//        var params = {
//            keyTable: e.detail.ItemDetail.TableName,
//            keyColumn: e.detail.ItemDetail.KeyColumn,
//            keyValue: e.detail.ItemDetail.KeyValue,
//        }

//        var level1MessageMaker = function (detail) {
//            var maxChildItem = null;
//            var maxSubTopicItem = null;

//            var maxChild = null;
//            var maxSubTopic = null;
//            var pieChartSeries = [];
//            var totalBeatCount = 0;
//            detail.children.forEach(function (item) {

//                totalBeatCount = totalBeatCount + parseInt(item.size);
//            });
//            console.log("totalBeatCount - " + totalBeatCount);
//            //if (detail.level === 1) {
//            detail.children.forEach(function (item) {
//                pieChartSeries.push({
//                    category: item.name,
//                    value: item.size,
//                    //tooltip: item.name + ' - ' + item.size + ' beats',
//                    percentage: kendo.toString((parseInt(item.size)) / totalBeatCount, "p")
//                });

//                //if (item.isChild) {
//                if (true) {
//                    if ((maxChild == null) || (item.size > maxChild.size)) {
//                        maxChild = item;
//                    }
//                }
//                else {
//                    if ((maxSubTopic == null) || (item.size > maxSubTopic.size)) {
//                        maxSubTopic = item;
//                    }
//                }
//            });

//            if (maxChild != null) {
//                maxChildItem = maxChild;
//            }
//            if (maxSubTopic != null) {
//                maxSubTopicItem = maxSubTopic.name;
//            }

//            //}

//            return { trendingChild: maxChildItem, trendingSubTopic: maxSubTopicItem, pieChartSeries: pieChartSeries };

//        }

//        sysproInterop.callHarmonyService("GET", "Trending/GetTrendingItemKeyInfo", params, function (result) {

//            typedResult.data = {};
//            typedResult.data.detail = e.detail;
//            typedResult.data.columns = JSON.parse(result);

//            var msgs = level1MessageMaker(e.detail);
//            typedResult.data.trendingChild = msgs.trendingChild
//            typedResult.data.trendingSubTopic = msgs.trendingSubTopic;

//            typedResult.data.series = msgs.pieChartSeries;

//            var observableDetail = kendo.observable(typedResult);

//            kendo.bind($("#trendingDetail"), observableDetail);
//            kendo.bind($("#trendingDetailKeyInfo"), observableDetail);

//            function createChart() {
//                if (!typedResult.data.series.length) {
//                    $("#trendingDetailPieChart").hide();
//                    return;
//                }
//                else {
//                    $("#trendingDetailPieChart").show();
//                }

//                $("#trendingDetailPieChart").kendoChart({
//                    theme: "bootstrap",
//                    visible: true,
//                    legend: {
//                        visible: false,
//                        position: "top"
//                    },
//                    //seriesDefaults: {
//                    //    labels: {
//                    //        visible: true,
//                    //        background: "transparent",
//                    //        template: "#= dataItem.category # - #= dataItem.percentage # %"
//                    //    }
//                    //},
//                    series: [{
//                        type: "pie",
//                        overlay: {
//                            gradient: "none"
//                        },
//                        //Removed labels inside chart area
//                        //labels: {
//                        //    position: "insideEnd",
//                        //    visible: true,
//                        //    background: "transparent",
//                        //    template: "#= dataItem.percentage #%"
//                        //},
//                        data: typedResult.data.series
//                    }],
//                    tooltip: {
//                        visible: true,
//                        template: "#= dataItem.category # - #= dataItem.percentage # (#= dataItem.value # beats)"
//                    },
//                    chartArea: {
//                        height: 140,
//                        width: 140
//                    }
//                });
//            }
//            createChart();
//            //$(document).ready(function () {
//            //    createChart();
//            //    $(document).bind("kendo:skinChange", createChart);
//            //});

//        });

//    });
//    window.addEventListener("SYSPRO.Harmony.TrendingDrilldown", function (e) {
//        console.log("SYSPRO.Harmony.TrendingDrilldown");


//        if ($("#Beats").length > 0)
//        {
//            //Find news feed and if it exists then bind it to drill down items.
//            var DivToBind = $("#Beats").closest(".harmony-widget");

//            var params = e.detail;
//        sysproInterop.callHarmonyService("GET", "Trending/GetDrilldownBeats", params, function (result) {
//            var TypedResult = JSON.parse(result);

//            $.each(TypedResult.Beats, function (index) {
//            //   console.log("Processing Feed - " + this.Feed +" - "+ this.FollowItems.length);
//                this.Feed = ProcessFeedHtml(this.Feed, this.FollowItems);
//        });
//            //Now Bind the Show more data
//            //Get the replies template -
//            //Dont need show more in the news feed for this drill down.
//            $('.ShowMoreNewsFeeds').remove();
//            //var HrmReplyTemplate = kendo.template($("#Harmony-ShowMore-Template").html());
//            //var result = HrmReplyTemplate(TypedResult);
//            //DivToBind.append(result);

//            //Parse the result
//            var HarmonyObservable = kendo.observable(TypedResult);
//            //Bind the data to the UI
//            kendo.bind(DivToBind, HarmonyObservable);
//        });
//    }
//    });

//});
