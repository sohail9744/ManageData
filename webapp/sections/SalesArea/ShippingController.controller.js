sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("Iffco.clap.sections.SalesArea.ShippingController", {
        /**
         * @override
         */
        onInit: function() {
            //Controller.prototype.onInit.apply(this, arguments);
            if (!this.DelvryPriorty) {
                this.DelvryPriorty = new sap.ui.xmlfragment("Iffco.clap.fragments.delvryPriorty", this);
                this.getView().addDependent(this.DelvryPriorty);
                this.DelvryPriorty.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            if (!this.DelvryPlant) {
                this.DelvryPlant = new sap.ui.xmlfragment("Iffco.clap.fragments.DeliveryPlant", this);
                this.getView().addDependent(this.DelvryPlant);
                this.DelvryPlant.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            if (!this.ShippingCondn) {
                this.ShippingCondn = new sap.ui.xmlfragment("Iffco.clap.fragments.ShippingCondn", this);
                this.getView().addDependent(this.ShippingCondn);
                this.ShippingCondn.setModel(this.getOwnerComponent().getModel("S4D"));
            }
        
        },
          //Value Help for Delivery Priority
          handleValueHelpForDelvPrior:function(evt){
            this.delvField = evt.getSource();
            this.DelvryPriorty.getBinding("items").filter([]);
            this.DelvryPriorty.open();
        },
        handleValueHelpDelvPriorConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.delvField.setValue(title + " - " + desc);
        },
        handleValueHelpDelvPriorSearch: function (evt) {
            var sValue = evt.getParameter("value");
             var filters = [];
             if (sValue.length > 0) {
                 var filter1 = new sap.ui.model.Filter({
                     path: "Deliverypriority",
                     operator: "Contains",
                     value1: sValue
                 });
                 var filter2 = new sap.ui.model.Filter({
                     path: "Bezei",
                     operator: "Contains",
                     value1: sValue
                 });
                 var sFilters = [filter1, filter2];
                 filters.push(new sap.ui.model.Filter(sFilters, false));
                 this.DelvryPriorty.getBinding("items").filter(filters, false);
             } else {
                 this.DelvryPriorty.getBinding("items").filter([]);
             }
         },
        handleValueHelpDelvPriorClose:function(evt){
            this.DelvryPriorty.close();
        },

         //Value Help for Shipping Condition
         handleValueHelpForShippingCondn: function (evt) {
            this.ShpngCndn = evt.getSource();
            this.ShippingCondn.getBinding("items").filter([]);
            this.ShippingCondn.open();
        },
        handleValueHelpShippingCondnConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.ShpngCndn.setValue(title + " - " + desc);
            this.ShippingCondn.getBinding("items").filter([]);
            this.ShippingCondn.close();
        },
        handleValueHelpShippingCondnSearch: function (evt) {
            var sValue = evt.getParameter("value");
             var filters = [];
             if (sValue.length > 0) {
                 var filter1 = new sap.ui.model.Filter({
                     path: "Shipping",
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
                 this.ShippingCondn.getBinding("items").filter(filters, false);
             } else {
                 this.ShippingCondn.getBinding("items").filter([]);
             }
         },
        handleValueHelpShippingCondnClose: function (evt) {
            this.ShippingCondn.close();
        },

        //Value help for Delivery Plant
        handleValueHelpForDelvryPlant: function (evt) {
            this.DelvryPlnt = evt.getSource();
            this.DelvryPlant.getBinding("items").filter([]);
            this.DelvryPlant.open();
        },
        handleValueHelpDelvPlantConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.DelvryPlnt.setValue(title + " - " + desc);
            this.DelvryPlant.getBinding("items").filter([]);
            this.DelvryPlant.close();
        },
        handleValueHelpDelvPlantSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Plant",
                    operator: "Contains",
                    value1: sValue
                });
                var filter2 = new sap.ui.model.Filter({
                    path: "Name",
                    operator: "Contains",
                    value1: sValue
                });
                var sFilters = [filter1, filter2];
                filters.push(new sap.ui.model.Filter(sFilters, false));
                this.DelvryPlant.getBinding("items").filter(filters, false);
            } else {
                this.DelvryPlant.getBinding("items").filter([]);
            }
        },
        handleValueHelpDelvPlantClose: function (evt) {
            this.DelvryPlant.close();
        },
         //Max length property
         handleSetMaxLength:function (evt) {
            var val = evt.getSource().getValue().length;
            var maxLen = evt.getSource().getMaxLength();
            if(val >= maxLen){
                evt.getSource().setType("Text");
            }else{
                evt.getSource().setType("Number");
            }
        },
	});
});