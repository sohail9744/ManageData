sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("Iffco.clap.sections.CreditLimit.PaymentTermsController", {
        onInit: function() {
            // Controller.prototype.onInit.apply(this, arguments);
            if (!this.paymentTerms) {
                this.paymentTerms = new sap.ui.xmlfragment("Iffco.clap.fragments.PaymentTerms", this);
                this.getView().addDependent(this.paymentTerms);
            }
            
        
        },
        handleValueHelpForPaymentTerms:function (evt) {
            this.paymentTermsField = evt.getSource();
                this.paymentTerms.getBinding("items").filter([]);
                this.paymentTerms.open();
        },
        handleValueHelpPaymentTermsConfirm:function (evt){
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
                this.paymentTermsField.setValue(title);
        },
        handleValueHelpPaymentTermsClose:function () {
            this.paymentTerms.close();
        },
        handleValueHelpPaymentTermsSearch:function (evt) {
            var sValue = evt.getParameter("value");
                if (sValue.length > 0) {
                        var oFilter1 = new sap.ui.model.Filter("paymentterm", 'Contains', sValue);
                        this.paymentTerms.getBinding("items").filter([oFilter1]);
                } else {
                    this.paymentTerms.getBinding("items").filter([]);
                }
        },
        handleSetMaxLength:function (evt) {
            var val = evt.getSource().getValue().length;
            var maxLen = evt.getSource().getMaxLength();
            if(val >= maxLen){
                evt.getSource().setType("Text");
            }else{
                evt.getSource().setType("Number");
            }
        }


	});
});