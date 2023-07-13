sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (
    Controller
) {
    "use strict";

    return Controller.extend("Iffco.clap.sections.CreditLimit.CreditLimitController", {
        handleCreditLimitTypeSelect: function (evt) {
            this.getView().getModel("appView").setProperty("/selectedType", evt.getSource().getSelectedButton().getText());

            
           
        }
    });
});