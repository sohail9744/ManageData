sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'], function (coreLibrary, BlockBase) {
	"use strict";

	var ViewType = coreLibrary.mvc.ViewType;

	var HourConf = BlockBase.extend("Iffco.clap.sections.Summary.RequestHistory", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "Iffco.clap.sections.Summary.RequestHistory",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "Iffco.clap.sections.Summary.RequestHistory",
					type: ViewType.XML
				}
			}
		}
	});
	return HourConf;
});
