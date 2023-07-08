sap.ui.define(["sap/ui/core/library", 'sap/uxap/BlockBase'], function (coreLibrary, BlockBase) {
	"use strict";

	var ViewType = coreLibrary.mvc.ViewType;

	var HourConf = BlockBase.extend("Iffco.clap.sections.Comments.Attachments", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "Iffco.clap.sections.Comments.Attachments",
					type: ViewType.XML
				},
				Expanded: {
					viewName: "Iffco.clap.sections.Comments.Attachments",
					type: ViewType.XML
				}
			}
		}
	});
	return HourConf;
});
