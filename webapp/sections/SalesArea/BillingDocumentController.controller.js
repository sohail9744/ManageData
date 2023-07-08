sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("Iffco.clap.sections.SalesArea.BillingDocumentController", {


        //value Help for Invoice Dates
        handleValueHelpForInvcDates: function (evt) {
            this.InvcDateField = evt.getSource();
            this.InvcDates.getBinding("items").filter([]);
            this.InvcDates.open();
        },
        handleValueHelpInvcDateConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.InvcDateField.setValue(title + " - " + desc);
        },
        handleValueHelpInvcDateSearch: function (evt) {
           var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Invoicedate",
                    operator: "Contains",
                    value1: sValue
                });
                var filter2 = new sap.ui.model.Filter({
                    path: "Description",
                    operator: "Contains",
                    value1: sValue
                });
                var sFilters = [filter1, filter2];
                filters.push(new sap.ui.model.Filter(sFilters, false));
                this.InvcDates.getBinding("items").filter(filters, false);
            } else {
                this.InvcDates.getBinding("items").filter([]);
            }
        },
        handleValueHelpInvcDateClose: function (params) {
            this.InvcDates.close();
        },
	});
});