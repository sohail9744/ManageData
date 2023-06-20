sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("Iffco.clap.sections.CustomerBasicDetails.CommunicationDataController", {
        // Email validation
		handleValidateEmail: function (evt) {
			var gstinVal = evt.getSource().getValue();
			if (gstinVal !== "") {
				var reggst = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if (!reggst.test(gstinVal) && gstinVal != '') {
					sap.m.MessageBox.error('The Entered Email Is Invalid.');
					evt.getSource().setValueState("Error").setValueStateText(
						"The Entered Email Is Invalid.");
				} else
					evt.getSource().setValueState("None").setValueStateText("");
			} else evt.getSource().setValueState("None").setValueStateText("");
		},
		handleSetMaxLength:function (evt) {
            var val = evt.getSource().getValue().length;
            var maxLen = evt.getSource().getMaxLength();
            if(val >= maxLen){
                evt.getSource().setType("Text");
            }else{
                evt.getSource().setType("Number");
            }
        }
	});
});