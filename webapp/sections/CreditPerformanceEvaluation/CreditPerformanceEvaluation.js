sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'], function (coreLibrary, BlockBase) {
	"use strict";

	var ViewType = coreLibrary.mvc.ViewType;

	var HourConf = BlockBase.extend("Iffco.clap.sections.CreditPerformanceEvaluation.CreditPerformanceEvaluation", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "Iffco.clap.sections.CreditPerformanceEvaluation.CreditPerformanceEvaluation",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "Iffco.clap.sections.CreditPerformanceEvaluation.CreditPerformanceEvaluation",
					type: ViewType.XML
				}
			}
		}
	});
	return HourConf;
});
