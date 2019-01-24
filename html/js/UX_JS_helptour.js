var tour = {
  id: "syspro-deg",
  i18n: { closeTooltip: "End tour" },
  steps: [
	{
      title: "Welcome to the tour!",
      content: "You will progress through a few steps to learn how to use the visual builder. Click 'Next' to keep going.",
      target:  document.querySelector("#tour_starter"),
      placement: "left",
//       arrowOffset: 200,
      showNextButton: true
    },
    {
      title: "Add a layout section",
      content: "You start off by adding layout sections - these are set layouts into which you can add individual fields (bits of data) at a later stage. Click the 'Add layout section' button to the left now.",
      target:  document.querySelector("#main_column_0 .add-row-section"),
      placement: "right",
      nextOnTargetClick: true,
      showNextButton: false
    },
    {
      title: "Choose a type of layout section",
      content: "There are three main types (layout sections, cards and charts) to play around with - select 'Add layout section' for now...",
      target: document.querySelector("#tour_layout_widget"),
      placement: "bottom",
      nextOnTargetClick: true,
      showNextButton: false,
      showPrevButton: true,
      onPrev: function() {
	      SYSPRO_VB.rowWindow.close();
      }
    },
    {
      title: "Choose a layout section",
      content: "Most of the layout sections are sets of columns and rows, to ensure your information is well structured and easy to read. You can also add list views and carousels (so you can click to cycle through a few different bits of content). Select the 2 column layout section to continue the tour.",
      delay: 120,
      target: document.querySelector("#rowWindow #tour_2_col"),
      placement: "bottom",
      xOffset: -10,
      nextOnTargetClick: true,
      showNextButton: false,
      showPrevButton: true
    },
    {
      title: "Style the layout section",
      content: "You can add a title, make the whole section collapsible, and choose whether each block should be seperate or joined, and what kind of borders it should have. These options just change the way the layout section looks. You can choose some options now, and then click 'Add section'",
      delay: 200,
      zindex: 999999,
      target: document.querySelector("#addLayoutWidgetButton"),
      arrowOffset: 100,
      xOffset: -310,
      yOffset: -550,
      placement: "left",
      nextOnTargetClick: true,
      showNextButton: false,
      showPrevButton: true
    },
    {
      title: "Add a data widget",
      content: "Now you have your first layout widget, you can add some actual data to it. Click one of the plus icons to the left to do this.",
      delay: 120,
      zindex: 999999,
      target: document.querySelector("#main_column_0"),
      yOffset: 100,
      placement: "right",
      nextOnTargetClick: true,
      showNextButton: false,
      showPrevButton: true
    },
    {
      title: "Choose a data field",
      content: "to the left are all the available fields you can choose to add to your layout section. Select a data field by clicking it, and then click 'Next'",
      delay: 220,
      zindex: 999999,
      target: document.querySelector("#initial-fields-list-data-window"),
      placement: "right",
      nextOnTargetClick: false,
      showNextButton: true,
      showPrevButton: true
    },
    {
      title: "Style the data",
      content: "You can now change the way the data will look with the styling options on the right. Click 'Add field' at the bottom right when you are done.",
      delay: 100,
      zindex: 999999,
      target: document.querySelector("#addDataButtonPopoverWrap"),
      arrowOffset: 100,
      xOffset: -310,
      yOffset: -550,
      placement: "left",
      nextOnTargetClick: true,
      showNextButton: false,
      showPrevButton: true
    },
    {
      title: "Drag and drop data widgets",
      content: "You can drag and drop data widgets - drag the one you just created to the other available place in your layout section by hovering over it, and clicking and dragging on this icon: <i class='material-icons text-primary drag-row-section'>open_with</i> - Click 'Next' when you have done it.",
      delay: 200,
      zindex: 999999,
      target: document.querySelector("#main_column_0"),
      placement: "right",
      yOffset: 100,
      nextOnTargetClick: true,
      showNextButton: true,
      showPrevButton: true
    },
    {
      title: "Edit a data widget",
      content: "You can also edit an existing data widget by clicking the 'More' icon: <i class='material-icons text-primary'>more_vert</i> that shows when you move the mouse arrow over it, then clicking 'Edit' - try it now, and click next when the edit window appears.",
      delay: 100,
      zindex: 999999,
      target: document.querySelector("#main_column_0"),
      placement: "right",
      yOffset: 100,
      nextOnTargetClick: false,
      showNextButton: true,
      showPrevButton: true
    },
    {
      title: "Make some changes",
      content: "Try change some styling options, or perhaps even the data field, then click 'Save changes'.",
      delay: 400,
      zindex: 999999,
      xOffset: 40,
      yOffset: -400,
      target: document.querySelector("#editDataWidgetSaveButton"),
      placement: "right",
      nextOnTargetClick: true,
      showNextButton: false,
      showPrevButton: true
    },
    {
      title: "Move a layout section",
      content: "You can drag and drop layout sections - drag the one above to the middle column by hovering over it, and clicking and dragging on this icon: <i class='material-icons text-primary drag-row-section'>open_with</i> that appears to the top left - Click 'Next' when you have done it.",
      delay: 100,
      zindex: 999999,
      target: document.querySelector("#main_column_0"),
      placement: "bottom",
      nextOnTargetClick: false,
      showNextButton: true,
      showPrevButton: true
    },
    {
      title: "Edit a layout section",
      content: "Make changes to a layout section by clicking the 'More' icon: <i class='material-icons text-primary'>more_vert</i> that appears to the top right when you move the mouse arrow over it, then clicking 'Edit' - try it now, and click next when the edit window appears.",
      delay: 100,
      zindex: 999999,
      target: document.querySelector("#main_column_1"),
      placement: "bottom",
      nextOnTargetClick: false,
      showNextButton: true,
      showPrevButton: true
    },
    {
      title: "Make some changes",
      content: "Make some changes to your layout section, then click 'Save changes' when you are done.",
      delay: 100,
      zindex: 999999,
      target: document.querySelector("#editLayoutWidgetButton"),
      placement: "right",
      xOffset: 40,
      yOffset: -400,
      nextOnTargetClick: true,
      showNextButton: false,
      showPrevButton: true
    },
    {
      title: "Using the quick add feature",
      content: "You can also add layout sections by dragging them from the Quick Add menu. Click this icon to open the menu: <i class='material-icons text-primary'>add_to_photos</i> ",
      delay: 100,
      zindex: 999999,
      target: document.querySelector("#quickAddLayoutTourStop"),
      placement: "right",
      xOffset: -5,
      nextOnTargetClick: true,
      showNextButton: false,
      showPrevButton: true
    },
    {
      title: "Drag to add a layout section",
      content: "You can click and drag a layout section from the menu, onto the main layout area when you move your mouse over one and see this icon: <i class='material-icons text-primary drag-row-section'>open_with</i>. Try it now with the 3 column layout section, and click 'Next' when you have done it.",
      delay: 350,
      zindex: 999999,
      target: document.querySelector("#sidebar-wrapper"),
      placement: "right",
      yOffset: 100,
      nextOnTargetClick: false,
      showNextButton: true,
      showPrevButton: true
    },
    {
      title: "Quick add data fields",
      content: "You can also add data fields in the same way - of course you would have to style them later, if required, by editing them like you did previously. Click the <i class='material-icons text-primary'>note_add</i> icon to the right to show the Quick Add data menu.",
      delay: 350,
      zindex: 999999,
      target: document.querySelector("#quickAddDataTourStop"),
      placement: "right",
      xOffset: -5,
      nextOnTargetClick: true,
      showNextButton: false,
      showPrevButton: true
    },
    {
      title: "Drag to add a data field",
      content: "You can click and drag a data field from the menu, into an available space in a layout section. Click to expand one of the data field sections to the left, and then click and drag a data field whenever you see the: <i class='material-icons text-primary drag-row-section'>open_with</i> icon. Drag your data field to one of the available, pulsing green spaces, and click 'Next' when you're done.",
      delay: 130,
      zindex: 999999,
      target: document.querySelector("#sidebar-wrapper"),
      placement: "right",
      yOffset: 100,
      nextOnTargetClick: false,
      showNextButton: true,
      showPrevButton: true
    },
    {
      title: "Change overall layout",
      content: "You don't have to use the three column layout - you can try out the different options displayed after clicking this icon to the right: <i class='material-icons text-primary'>view_column</i> - try some different options, then switch back to three columns and click next to continue the help tour.",
      delay: 350,
      zindex: 999999,
      target: document.querySelector("#quickAddDataTourStop"),
      placement: "right",
      xOffset: -5,
      nextOnTargetClick: false,
      showNextButton: true,
      showPrevButton: true
    }
    
  ]
};

// Start the tour!
