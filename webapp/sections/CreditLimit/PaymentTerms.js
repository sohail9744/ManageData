sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'], function (coreLibrary, BlockBase) {
	"use strict";

	var ViewType = coreLibrary.mvc.ViewType;

	var HourConf = BlockBase.extend("Iffco.clap.sections.CreditLimit.PaymentTerms", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "Iffco.clap.sections.CreditLimit.PaymentTerms",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "Iffco.clap.sections.CreditLimit.PaymentTerms",
					type: ViewType.XML
				}
			}
		}
	});
	return HourConf;
});
