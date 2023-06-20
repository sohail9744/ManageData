sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("Iffco.clap.sections.SalesArea.TaxIndicatorController", {
        /**
         * @override
         */
        onInit: function() {
            //Controller.prototype.onInit.apply(this, arguments);
            if(!this.TaxCategory){
                this.TaxCategory = new sap.ui.xmlfragment("Iffco.clap.fragments.TaxCategory", this);
                this.getView().addDependent(this.TaxCategory);
                this.TaxCategory.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            if(!this.TaxClassfn){
                this.TaxClassfn = new sap.ui.xmlfragment("Iffco.clap.fragments.TaxClassfn", this);
                this.getView().addDependent(this.TaxClassfn);
                this.TaxClassfn.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            
        
        },
           //Value Help for .length <= 1
           handleValueHelpForTaxCat: function (evt) {
            this.TaxCat = evt.getSource();
            this.TaxCategory.getBinding("items").filter([]);
            this.TaxCategory.open();
        },
        handleValueHelpTaxCatConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.TaxCat.setValue(title + " - " + desc);
            this.TaxCategory.getBinding("items").filter([]);
            this.TaxCategory.close();
        },
        handleValueHelpTaxCatSearch: function (evt) {
            var sValue = evt.getParameter("value");
             var filters = [];
             if (sValue.length > 0) {
                 var filter1 = new sap.ui.model.Filter({
                     path: "Taxcategory",
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
                 this.TaxCategory.getBinding("items").filter(filters, false);
             } else {
                 this.TaxCategory.getBinding("items").filter([]);
             }
         },
        handleValueHelpTaxCatClose: function (evt) {
            this.TaxCategory.close();
        },

        //Value Help for Tax Classification
        handleValueHelpForTaxClssfn: function (evt) {
            this.TaxClass = evt.getSource();
            this.TaxClassfn.getBinding("items").filter([]);
            this.TaxClassfn.open();
        },
        handleValueHelpTaxClassfnConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.TaxClass.setValue(title + " - " + desc);
            this.TaxClassfn.getBinding("items").filter([]);
            this.TaxClassfn.close();
        },
        handleValueHelpTaxClassfnSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Taxclassification",
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
                this.TaxClassfn.getBinding("items").filter(filters, false);
            } else {
                this.TaxClassfn.getBinding("items").filter([]);
            }
        },
        handleValueHelpTaxClassfnClose: function (evt) {
            this.TaxClassfn.close();
        }
	});
});