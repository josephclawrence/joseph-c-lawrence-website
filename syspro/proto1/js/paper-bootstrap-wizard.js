/*!

 =========================================================
 * Paper Bootstrap Wizard - v1.0.2
 =========================================================
 
 * Product Page: https://www.creative-tim.com/product/paper-bootstrap-wizard
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-bootstrap-wizard/blob/master/LICENSE.md)
 
 =========================================================
 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// Paper Bootstrap Wizard Functions

searchVisible = 0;
transparent = true;

$(document).ready(function() {
    // Wizard Initialization
    $(".wizard-card").bootstrapWizard({
        tabClass: "nav nav-pills",
        nextSelector: ".btn-next",
        previousSelector: ".btn-previous",

        onNext: function(tab, navigation, index) {
            var $valid = true; // use some validator
            if (!$valid) {
                $validator.focusInvalid();
                return false;
            }
        },

        onInit: function(tab, navigation, index) {
            //check number of tabs and fill the entire row
            var $total = navigation.find("li").length;
            $width = 100 / $total;

            navigation.find("li").css("width", $width + "%");
        },

        onTabClick: function(tab, navigation, index) {
            var $valid = true; // use some validator

            if (!$valid) {
                return false;
            } else {
                return true;
            }
        },

        onTabShow: function(tab, navigation, index) {
            var $total = navigation.find("li").length;
            var $current = index + 1;

            var $wizard = navigation.closest(".wizard-card");

            // If it's the last tab then hide the last button and show the finish instead
            if ($current >= $total) {
                $($wizard)
                    .find(".btn-next")
                    .hide();
                $($wizard)
                    .find(".btn-finish")
                    .show();
            } else {
                $($wizard)
                    .find(".btn-next")
                    .show();
                $($wizard)
                    .find(".btn-finish")
                    .hide();
            }

            //update progress
            var move_distance = 100 / $total;
            move_distance = move_distance * index + move_distance / 2;

            $wizard.find($(".progress-bar")).css({ width: move_distance + "%" });
            //e.relatedTarget // previous tab

            $wizard.find($(".wizard-card .nav-pills li.active a .icon-circle")).addClass("checked");
        },
    });

    $(".set-full-height").css("height", "auto");
});

//  //Function to show image before upload

// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();

//         reader.onload = function (e) {
//             $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
//         }
//         reader.readAsDataURL(input.files[0]);
//     }
// }
