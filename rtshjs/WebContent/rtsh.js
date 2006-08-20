/*
Real Time Syntax Highlighting JS - RTSHJS v0.61

You can use and modify this as you want. 
Just keep my credits somewhere around. Thanks.

Fernando M.A.d.S. - fermads@gmail.com
*/

RTSH = function() {

	RTSH = this;
	var browser = String;	
	var range = null;
	var strFound = String;

	this.initialize = function() {
		browser = this.detect();
		if(browser == 2) { // FF
			document.designMode = "On";
			document.addEventListener('keypress', RTSH.keyHandler, true);
		} 
		else if(browser == 1) { // IE
			document.onkeydown = this.keyHandler;
		}
		else {
			// TODO: textarea without syntax highlighting for non supported browsers
		}
		this.syntaxHighlight(1);
		window.scroll(0,0);
	}

	this.detect = function() {
		if(navigator.appName.indexOf("Microsoft") !=- 1) return 1;
		else if (navigator.appName == "Netscape") return 2;
		else return 0;
	}

	this.keyHandler = function(evt) {
		evt = (evt) ? evt : (window.event) ? event : null;
	  	if(evt) {
	    	var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
		    if(charCode == 13 || charCode == 32) {
			 	RTSH.syntaxHighlight();
			  	RTSH.findString('');
			}
		}    
	}

	this.findString = function(str) { // JavaScripter.net. Copyright © 1999-2000, Alexei Kourbatov
		if(browser == 2) { // FF
			strFound = self.find(str);
			if (!strFound) {
			   strFound = self.find(str,0,1)
			   while (self.find(str,0,1)) continue;
		    }
		}
		if(browser == 1) { // IE
			if (range != null) {
				range.collapse(false);
				strFound=range.findText(str);
				if(strFound) range.select();
			}
		  	if(range == null || strFound == 0) {
			    range = self.document.body.createTextRange()
				strFound = range.findText(str);
			   	if (strFound) range.select();
	  		}
		}
	}

	this.syntaxHighlight = function() {
		if(browser == 2) { // FF
			document.execCommand("inserthtml", false, '&#127;');
			x = document.getElementById('edt').innerHTML;
			x = x.replace(/<[bis]>|<\/[bis]>/ig,'');
			x = x.replace(/<\/?span.*?>/g,'');			
			x = x.replace(/<\/?pre>/g,''); 
		}
		else if(browser == 1) { // IE
			if(!arguments[0]) document.selection.createRange().text = "";
			x = document.getElementById('edt').innerHTML;
			x = x.replace(/<\/?STRONG>|<\/?EM>|<\/?FONT.*?>/g,'');
			x = '<P>'+x;
			x = x.replace(/<\/?PRE>/ig,'');
			x = x.replace(/<P><P>/,'<P>'); 
			x = x.replace(/<\/?[bis]>/ig,'');
			x = x.replace(/\n/g,'<P>');
			x = x.replace(/\r/g,'</P>');
			x = x.replace(/<P><\/P>/g,'<P>&nbsp;</P>');						
			}
		x = x.replace(/([\"\'].*?[\"\'])/g,'<s>$1</s>'); // strings
		x = x.replace(/(public|class|import|protected|private|static|final|new|extends|float|long|return|continue|null|false|true|throws|boolean|void|try|if|for|switch|catch|int|else)([ \"\'\{\(;<])/g,'<b>$1</b>$2'); // reserved words
		x = x.replace(/\/\/(.*?)(<br>|<\/P>)/g,'<i>//$1</i>$2'); // comments 
		x = x.replace(/\/\*(.*?)\*\//g,'<i>/*$1*/</i>'); // comments
//		alert(x);
		document.getElementById('edt').innerHTML = '<PRE>'+x+'</PRE>';
	}
}

// globals
onload = function() {
	new RTSH();
	RTSH.initialize();
	}
