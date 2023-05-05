sap.ui.define([], function () {
	"use strict";

	return {
		getFieldVisibility: function (visibleFlag) {
			if(visibleFlag == true || visibleFlag == "Y")
            return true;
            else
            return false;
		},
        getFieldMandatory:function(mandatFlag){
            if(visibleFlag == true || visibleFlag == "Y")
            return true;
            else
            return false;
        },
        dateFormatter: function (value) {
                if (value) {
                    var sNotifDate = new Date(value.toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
                    return sNotifDate;
                } else return null;
            }
	};
});