(function () {
    var __bind = function (fn, me) {
        return function () {
            return fn.apply(me, arguments);
        };
    };

    (function ($, window) {
        var Offcanvas;
        window.Offcanvas = Offcanvas = (function () {
            function Offcanvas(element) {
                var t, target;
                this.element = element;
                this.bodyOverflow = __bind(this.bodyOverflow, this);
                this._sendEventsAfter = __bind(this._sendEventsAfter, this);
                this._sendEventsBefore = __bind(this._sendEventsBefore, this);
                this._close = __bind(this._close, this);
                this._open = __bind(this._open, this);
                this._clicked = __bind(this._clicked, this);
                this._navbarHeight = __bind(this._navbarHeight, this);
                target = this.element.attr("data-target")
                    ? this.element.attr("data-target")
                    : false;
                if (target) {
                    this.target = $(target);
                    if (
                        this.target.length &&
                        !this.target.hasClass("js-offcanvas-done")
                    ) {
                        this.element.addClass("js-offcanvas-has-events");
                        this.location = this.target.hasClass(
                            "navbar-offcanvas-right"
                        )
                            ? "right"
                            : "left";
                        this.target.addClass(
                            this._transformSupported()
                                ? "offcanvas-transform js-offcanvas-done"
                                : "offcanvas-position js-offcanvas-done"
                        );
                        this.target.data("offcanvas", this);
                        this.element.on("click", this._clicked);
                        this.target.on(
                            "transitionend",
                            (function (_this) {
                                return function () {
                                    if (_this.target.is(":not(.in)")) {
                                        return _this.target.height("");
                                    }
                                };
                            })(this)
                        );
                        this.target.on(
                            "offcanvas.toggle",
                            (function (_this) {
                                return function (e) {
                                    return _this._clicked(e);
                                };
                            })(this)
                        );
                        this.target.on(
                            "offcanvas.close",
                            (function (_this) {
                                return function (e) {
                                    return _this._close(e);
                                };
                            })(this)
                        );
                        this.target.on(
                            "offcanvas.open",
                            (function (_this) {
                                return function (e) {
                                    return _this._open(e);
                                };
                            })(this)
                        );
                    }
                } else {
                    console.warn(
                        "Offcanvas: `data-target` attribute must be present."
                    );
                }
            }

            Offcanvas.prototype._navbarHeight = function () {
                if (this.target.is(".in")) {
                    return this.target.height($(window).outerHeight() - $("#fusion-toolbar").outerHeight());
                }
            };

            Offcanvas.prototype._clicked = function (e) {
                e.preventDefault();
                this._sendEventsBefore();
                $(".navbar-offcanvas")
                    .not(this.target)
                    .trigger("offcanvas.close");
                this.target.toggleClass("in");
                this.element.toggleClass("is-open");
                this._navbarHeight();
                return this.bodyOverflow();
            };

            Offcanvas.prototype._open = function (e) {
                e.preventDefault();
                if (this.target.is(".in")) {
                    return;
                }
                this._sendEventsBefore();
                this.target.addClass("in");
                this.element.addClass("is-open");
                this._navbarHeight();
                return this.bodyOverflow();
            };

            Offcanvas.prototype._close = function (e) {
                e.preventDefault();
                if (this.target.is(":not(.in)")) {
                    return;
                }
                this._sendEventsBefore();
                this.target.removeClass("in");
                this.element.removeClass("is-open");
                this._navbarHeight();
                return this.bodyOverflow();
            };

            Offcanvas.prototype._sendEventsBefore = function () {
                if (this.target.hasClass("in")) {
                    return this.target.trigger("hide.bs.offcanvas");
                } else {
                    return this.target.trigger("show.bs.offcanvas");
                }
            };

            Offcanvas.prototype._sendEventsAfter = function () {
                if (this.target.hasClass("in")) {
                    return this.target.trigger("shown.bs.offcanvas");
                } else {
                    return this.target.trigger("hidden.bs.offcanvas");
                }
            };

            Offcanvas.prototype.bodyOverflow = function (events) {
                if (events == null) {
                    events = true;
                }
                // if (this.target.is(".in")) {
                //     $("body").addClass("offcanvas-stop-scrolling");
                // } else {
                //     $("body").removeClass("offcanvas-stop-scrolling");
                // }
                if (events) {
                    return this._sendEventsAfter();
                }
            };

            Offcanvas.prototype._transformSupported = function () {
                var asSupport, el, regex, translate3D;
                el = document.createElement("div");
                translate3D = "translate3d(0px, 0px, 0px)";
                regex = /translate3d\(0px, 0px, 0px\)/g;
                el.style.cssText =
                    "-webkit-transform: " +
                    translate3D +
                    "; -moz-transform: " +
                    translate3D +
                    "; -o-transform: " +
                    translate3D +
                    "; transform: " +
                    translate3D;
                asSupport = el.style.cssText.match(regex);
                return asSupport.length != null;
            };

            return Offcanvas;
        })();
        $.fn.bsOffcanvas = function () {
            return this.each(function () {
                return new Offcanvas($(this));
            });
        };
        return $(function () {
            $('[data-toggle="offcanvas"]').each(function () {
                return $(this).bsOffcanvas();
            });
            return $(".offcanvas-toggle").each(function () {
                return $(this).on("click", function (e) {
                    var el, selector;
                    if (!$(this).hasClass("js-offcanvas-has-events")) {
                        selector = $(this).attr("data-target");
                        el = $(selector);
                        if (el) {
                            //el.height('');
                            el.removeClass("in");
                            return $("body").css({
                                overflow: "",
                                position: "",
                            });
                        }
                    }
                });
            });
        });
    })(window.jQuery, window);
}.call(this));
