sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("Iffco.clap.sections.CreditLimit.CreditLimitController", {
        handleCreditLimitTypeSelect:function (evt) {
            // this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel([]), "creditTypeModel");
            this.getView().getModel("appView").setProperty("/selectedType",evt.getSource().getSelectedButton().getText());
            // evt.getParameters().selectedIndex
            

            // this.getOwner
            // evt.mParameters.selectedIndex
            // console.log("h2");
        }
	});
});