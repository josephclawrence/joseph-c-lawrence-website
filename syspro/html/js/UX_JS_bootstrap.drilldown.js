(function($){

	$.fn.drilldown = function(options) {

		//set default options
		var defaults = {
			wrapper_class		: 'drilldown panel panel-default sys-bd-off sys-box-shadow-off sys-mg-off-b',
			menu_class			: 'drilldown-menu',
			submenu_class	    : 'list-group',
			parent_class		: 'dd-parent list-group-item',
			parent_class_link	: 'dd-parent-a',
			active_class		: 'active',
			header_class_list   : 'breadcrumb',
			header_class		: 'panel-heading',
			class_selected      : 'dd-selected',
// 			show_count		    : true,
			count_class			: 'dd-count',
			default_text		: 'Select item',
			header_tag		    : 'div',// h3
			header_tag_class    : 'list-group-item active' // hidden list-group-item active
		};

		//call in the default options
		var options = $.extend(defaults, options);

		//act upon the element that is passed into the design
		return this.each(function(options){

			var $ddObj = this;
			
			$($ddObj).addClass(defaults.menu_class);

			$($ddObj).addClass(defaults.submenu_class);

			$($ddObj).removeClass('hidden');

			var $wrapperObj = '<div class="'+defaults.wrapper_class+'" />';

			$($ddObj).wrap($wrapperObj);

			var $wrapper = $($ddObj).parent();

			var objIndex = $($wrapper).index('.'+defaults.wrapper_class.replace(/ /g,"."));

			var idHeader = defaults.header_class.replace(/ /g,"_") + '-'+objIndex;
			var idWrapper = defaults.wrapper_class.replace(/ /g,"_") + '-'+objIndex;

			$($wrapper).attr('id',idWrapper);

			var $header = '<div id="'+idHeader+'" class="'+defaults.header_class+'"></div>';
			
			setUpDrilldown();
			
			resetDrilldown($ddObj, $wrapper);
			
			$("#sidebar-wrapper").on("transitionend",
			 	function(a){
					resizeDrilldown($ddObj, $wrapper);
					$(this).off(a);
				}
			);
			
			$(window).bind('resizeEnd', function () {
				if ( SYSPRO_VB.openWindow === 'dataWindow' || SYSPRO_VB.openWindow === 'dataEditWindow' || SYSPRO_VB.openWindow === 'tileWindow' || SYSPRO_VB.openWindow === 'tileEditWindow' ) {
					resizeDrilldown($ddObj, $wrapper);
				}
			});

			$('li a',$ddObj).click(function(e){

				$link = this;
				$activeLi = $(this).parent('li').stop();
				$siblingsLi = $($activeLi).siblings();

				// Drilldown action
				if($('> ul',$activeLi).length){
					if($($link).hasClass(defaults.active_class)){
						$('ul a',$activeLi).removeClass(defaults.active_class);
						$('ul ul',$activeLi).removeClass(defaults.active_class);
						resetDrilldown($ddObj, $wrapper);
					} else {
						actionDrillDown($activeLi, $wrapper, $ddObj);
					}
				}

				// scroll to top on click
				$($wrapper,$ddObj).scrollTop(0);

				// Prevent browsing to link if has child links
				if($(this).next('ul').length > 0){
					e.preventDefault();
		
					e.stopPropagation();
					$($link).trigger('drilldown.parentclick');
				} else {
					//$($link).trigger('click');
					$($link).addClass(defaults.active_class);
				}

				$($link).trigger('drilldown.linklclick');

			}); // $('li a',$ddObj).click(function(e){
			//---------------------------------------------
			// Breadcrumbs

			//$('#'+idHeader+' a').live('click',function(e){
			$('#'+idHeader).on('click', 'a', function(e){

				// Get link index
				var linkIndex = parseInt($(this).index('#'+idHeader+' a'));
				if(linkIndex == 0){
					console.log('initial breadcrumb clicked');
					$('a',$ddObj).removeClass(defaults.active_class);
					$('ul',$ddObj).removeClass(defaults.active_class);
				} else {
					// Select equivalent active link
					linkIndex = linkIndex-1;
					$('a.'+defaults.active_class+':gt('+linkIndex+')',$ddObj).removeClass(defaults.active_class);
					$('ul.'+defaults.active_class+':gt('+linkIndex+')',$ddObj).removeClass(defaults.active_class);
				}

				resetDrilldown($ddObj, $wrapper);

				e.preventDefault();
	
				$($ddObj).trigger('drilldown.linklclick');
			});
			//---------------------------------------------
			// helper functions
			//---------------------------------------------
			// Set up accordion
			function setUpDrilldown(){

	
				$('ul',$ddObj).each(function(){
					$(this).addClass(defaults.submenu_class);
				});

				$($ddObj).before($header);

				$arrow = '<i class="material-icons pull-right">keyboard_arrow_right</i>';

				// Get width of menu container & height of list item
				var menuWidth = $($ddObj).actual( 'outerWidth', { includeMargin : true });
				menuWidth += 'px';

				var itemHeight = $('li',$ddObj).actual( 'outerHeight', { includeMargin : true });
				// Get height of largest sub menu
				var objUl = $('ul',$ddObj);
				var maxItems = findMaxHeight(objUl);

				// Get level of largest sub menu
	
				//var maxUl = $(objUl+'[rel="'+maxItems+'"]');
				var maxUl = $('[rel="'+maxItems+'"]', objUl);
				var getIndex = findMaxIndex(maxUl);

				// Set menu container height
				menuHeight = (itemHeight * maxItems) + 5;

				//-------------------------------
	
				var showObj = $('> ul', $wrapper);
				var itemCount = $('>li', showObj).length;
				var menuHeight = itemHeight * itemCount;
				var menuHeightAll = itemHeight * itemCount + $($header).height();

				$($wrapper).css({height: menuHeightAll+'px', width: menuWidth});
				
				$($ddObj).css({height: menuHeight+'px', width: menuWidth});
				//-------------------------------
				// Set sub menu width and offset
				$('li',$ddObj).each(function(){
					$(this).css({width: menuWidth});
					$('ul',this).css({width: menuWidth, marginRight: '-'+menuWidth, marginTop: '0'});
					if($('> ul',this).length){
						$(this).addClass(defaults.parent_class);
						
// 						if(defaults.show_count == true){
						var parentLink = $('> ul > li',this);
						var countParent = parseInt($(parentLink).length);
						getCount = countParent;
						$('> a',this).append(' <span class="'+defaults.count_class+'">('+getCount+')</span>');
// 						}
						
						$('> a',this).addClass(defaults.parent_class_link).append($arrow);
					}
				});
				//-------------------------------
				// Add css class
				$('ul',$wrapper).each(function(){
		
					//$(this).addClass(defaults.submenu_class);
					$('li:last',this).addClass('last');
				});

				$('> ul > li:last',$wrapper).addClass('last');

			} // function setUpDrilldown(){
				
			this.drillto = function(element) {
				actionDrillDown(element, $wrapper, $ddObj)
			};
			
			this.resetDdMenu = function() {
				$('a',$ddObj).removeClass(defaults.active_class);
				$('ul',$ddObj).removeClass(defaults.active_class);
				
				resetDrilldown($ddObj, $wrapper);
				$($wrapper,$ddObj).scrollTop(0);
			};
			//---------------------------------------------
		}); // return this.each(function(options){
		//-------------------------------------------------
		// Drill Down
		function actionDrillDown(element, wrapper, obj) {
			//actionDrillDown($activeLi, $wrapper, $ddObj);
			var showObj = $('> ul',element);
			showObj.css('opacity', 0);
			element.closest('.dd-parent').css({
				borderColor: '#fff',
				backgroundColor: '#fff'
			});
			
			// Declare header
			var $header = $('.'+defaults.header_class, wrapper);

			// Get new breadcrumb and header text
			var getNewBreadcrumb = $(defaults.header_tag,$header).text(); // .html()
			var getNewHeaderClone = $('> a',element).clone();
			getNewHeaderClone.find(".material-icons").remove();
			var getNewHeaderText = getNewHeaderClone.text(); // .html()

			// Add new breadcrumb
			if(!$('ul',$header).length){
				$($header).prepend('<ul class="'+defaults.header_class_list+'"></ul>');
			}
			
			if (getNewBreadcrumb == defaults.default_text) {
	
				$('ul li:last-child',$header).remove();
				$('ul',$header).append('<li class="first"><a href="#"><i class="material-icons">keyboard_arrow_left</i> All</a></li>');
			
			} else {
	
				$('ul li:last-child',$header).remove();
				$('ul',$header).append('<li><a href="#">'+getNewBreadcrumb+'</a></li>');
			}

			$('ul',$header).append('<li class="active">'+getNewHeaderText+'</li>');

			// Update header text
			updateHeader($header, getNewHeaderText);

			// declare child link
			var activeLink = $('> a',element);

			// add active class to link
			$(activeLink).addClass(defaults.active_class);
			$(showObj).addClass(defaults.active_class);
			//-----------------------------------

			
			var itemHeight = $(element).actual( 'outerHeight', { includeMargin : true });
			var itemCount = $('>li', showObj).length;
			var menuHeight = (itemHeight * itemCount) + 5;
			$(obj).css({height: menuHeight+'px'});
			if ( menuHeight > 344 ) {
				$(obj).css('overflow-y', 'scroll');
			} else {
				$(obj).css('overflow-y', 'hidden');
			}
			var headerHeight = $($header).actual( 'outerHeight', { includeMargin : true });
			var menuHeightAll = menuHeight + headerHeight;

			$(wrapper).css({height: menuHeightAll+'px'});
			
			//-----------------------------------
			//$('> ul li',element).show();
			$(showObj).velocity({"margin-right": 0}, {
					duration: 600, 
					easing: 'easeOutQuint',
					complete: function() {element.closest('.dd-parent').css({
							borderColor: '#ddd'
						})
					}
				}
			);
			
			setTimeout(function() {
				$(showObj).velocity({opacity: 1}, {
						duration: 300, 
						easing: 'easeOutQuint',
						queue: false
					}
				);
			}, 200);

			// Find all sibling items & hide
			var $siblingsLi = $(element).siblings();
			$($siblingsLi).hide();

			// If using breadcrumbs hide this element
			$(activeLink).hide();

		}// function actionDrillDown(element, wrapper, obj)
				
		// Drill Up
		function actionDrillUp(element, obj, wrapper){
			// Declare header
			var $header = $('.'+defaults.header_class, wrapper);

			var activeLink = $('> a',element);
			var checklength = $('.'+defaults.active_class, wrapper).length;
			var activeIndex = $(activeLink).index('.'+defaults.active_class, wrapper);

			// Get width of menu for animating right
			var menuWidth = $(obj).actual( 'outerWidth', { includeMargin : true });
			$('ul',element).css('margin-right',-menuWidth+'px');

			// Show all elements
			$(activeLink).addClass(defaults.active_class);
			$('> ul', element).addClass(defaults.active_class);
			$('> ul li',element).show();
			$('a',element).show();

			// Get new header text from clicked link
			var getNewHeaderText = $('> a',element).html();
			$(defaults.header_tag,$header).html(getNewHeaderText);

			var breadcrumbIndex = activeIndex-1;
			$('a:gt('+activeIndex+')',$header).remove();
		} // function actionDrillUp(element, obj, wrapper){

		function updateHeader(obj, html){

			if(!$(defaults.header_tag,obj).length){
				$(obj).append('<'+defaults.header_tag+' class="hidden '+defaults.header_tag_class+'"></'+defaults.header_tag+'>');
			}

			$(defaults.header_tag,obj).html(html);

		} // function updateHeader(obj, html){

		// Reset using active links
		function resetDrilldown(obj, wrapper){
			var $header = $('.'+defaults.header_class, wrapper);
			$('ul',$header).remove();
			$('a',$header).remove();
			$('li',obj).show();
			$('a',obj).show();
			var menuWidth = $(obj).actual( 'outerWidth', { includeMargin : true });

			$('ul',obj).css('margin-right',-menuWidth+'px');

			updateHeader($header, defaults.default_text);
			

			// Add new breadcrumb
			var getNewBreadcrumb = $(defaults.header_tag,$header).text(); // .html()
			console.log(getNewBreadcrumb);
			if(!$('ul',$header).length){
				$($header).prepend('<ul class="'+defaults.header_class_list+'"></ul>');
			}
			
			if(getNewBreadcrumb == defaults.default_text){
				$('ul',$header).append('<li class="active">'+defaults.default_text+'</li>');
			}
			

			var activeObj = obj;

			$('a.' + defaults.active_class, obj).each(function(i){
				var $activeLi = $(this).parent('li').stop();
				actionDrillDown($activeLi, wrapper, obj);
				//actionDrillUp($activeLi, obj, wrapper);
				activeObj = $(this).parent('li');
			});
			//-----------------------------------

			var showObj;
			if ($('> ul', activeObj).length){
				showObj = $('> ul', activeObj);
			}
			else {
				// root ul
				var showObj = activeObj;
			}
			var itemCount = $('>li', showObj).length;
			var itemHeight = $('li',showObj).actual( 'outerHeight', { includeMargin : true });
			var menuHeight = (itemHeight * itemCount) + 5;
			var headerHeight = $($header).actual( 'outerHeight', { includeMargin : true });
			var menuHeightAll = (itemHeight * itemCount) + headerHeight + 5;

			$(wrapper).css({height: menuHeightAll+'px'});
			$(obj).css({height: menuHeight+'px'});
			if ( menuHeight > 344 ) {
				$(obj).css('overflow-y', 'scroll');
			} else {
				$(obj).css('overflow-y', 'hidden');
			}
			// scroll to top 
			$(obj).scrollTop(0);
			//-----------------------------------
		} // function resetDrilldown(obj, wrapper){
		
		
		function resizeDrilldown($ddObj, $wrapper) {
				// set wrapper to auto width to force resize
				$($wrapper).css({width: 'auto'});
				$($ddObj).css({width: 'auto'});
				var menuWidth = $($wrapper).actual( 'outerWidth', { includeMargin : true });
				menuWidth += 'px';
				$($wrapper).css({width: menuWidth});
				$($ddObj).css({width: menuWidth});
				$('li',$ddObj).each(function(){
					$(this).css({width: menuWidth});
					$('ul',this).css({width: menuWidth, marginRight: '-'+menuWidth, marginTop: '0'});
				});
				resetDrilldown($ddObj, $wrapper);
		}

		function findMaxHeight(element){
			var maxValue = undefined;
			$(element).each(function(){
				var val = parseInt($('> li',this).length);
				$(this).attr('rel',val);
				if (maxValue === undefined || maxValue < val){
					maxValue = val;
				}
			});
			return maxValue;
		}

		function findMaxIndex(element){
			var maxIndex = undefined;
			$(element).each(function(){
				var val = parseInt($(this).parents('li').length);
				if (maxIndex === undefined || maxIndex < val) {
					maxIndex = val;
				}
			});
			return maxIndex;
		}

	};
})(jQuery);