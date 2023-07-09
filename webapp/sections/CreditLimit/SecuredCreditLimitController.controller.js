sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function(
	Controller,
    MessageBox
) {
	"use strict";

	return Controller.extend("Iffco.clap.sections.CreditLimit.SecuredCreditLimitController", {
        onInit: function() {
            // Controller.prototype.onInit.apply(this, arguments);
            if (!this.bankCountry) {
                this.bankCountry = new sap.ui.xmlfragment("Iffco.clap.fragments.BankCountry", this);
                this.getView().addDependent(this.bankCountry);
            }
            if (!this.bank) {
                this.bank = new sap.ui.xmlfragment("Iffco.clap.fragments.Bank", this);
                this.getView().addDependent(this.bank);
            }

            if (!this.bankCountry1) {
                this.bankCountry1 = new sap.ui.xmlfragment("Iffco.clap.fragments.BankCountryIc", this);
                this.getView().addDependent(this.bankCountry1);
            }
            if (!this.bank1) {
                this.bank1 = new sap.ui.xmlfragment("Iffco.clap.fragments.BankIc", this);
                this.getView().addDependent(this.bank1);
            }
        
        },
        handleValueHelpForBankCountry:function (evt) {
            this.bankCountryField = evt.getSource();
                this.bankCountry.getBinding("items").filter([]);
                this.bankCountry.open();
        },
        handleValueHelpForBankCountry1:function (evt) {
            this.bankCountryField1 = evt.getSource();
                this.bankCountry1.getBinding("items").filter([]);
                this.bankCountry1.open();
        },
        handleValueHelpForBank:function (evt) {
            this.bankField = evt.getSource();
            var bankCountryOdataVal = this.getView().getModel("Customers").getData().zlc_issuance_bankcountry;
            
                this.bank.getBinding("items").filter([]);
                if(this.bankCountryVal){
                this.bank.getBinding("items").filter([new sap.ui.model.Filter("country", "Contains", this.bankCountryVal)]);
                this.bank.open();
                }else if(bankCountryOdataVal){
                    this.bank.getBinding("items").filter([new sap.ui.model.Filter("country", "Contains", bankCountryOdataVal)]);
                    this.bank.open();
                    } else{
                    MessageBox.error("Please Select Bank Country first");
                }
        },
        handleValueHelpForBank1:function (evt) {
            this.bankField1 = evt.getSource();
            var bankCountry1OdataVal = this.getView().getModel("Customers").getData().zlc_confirming_bank_country;
                this.bank1.getBinding("items").filter([]);
                if(this.bankCountryVal1 !== undefined){
                this.bank1.getBinding("items").filter([new sap.ui.model.Filter("country", "Contains", this.bankCountryVal1)]);
                this.bank1.open();
                }else if(bankCountry1OdataVal){
                    this.bank.getBinding("items").filter([new sap.ui.model.Filter("country", "Contains", bankCountry1OdataVal)]);
                    this.bank.open();
                    }
                else{
                    MessageBox.error("Please Select Bank Country first");
                }
        },
        handleValueHelpBankCountryConfirm:function (evt){
            this.bankCountryVal = evt.getParameter("selectedItems")[0].getProperty("title");
                this.bankCountryField.setValue(this.bankCountryVal);
        },
        handleValueHelpBankCountryConfirm1:function (evt){
            this.bankCountryVal1 = evt.getParameter("selectedItems")[0].getProperty("title");
                this.bankCountryField1.setValue(this.bankCountryVal1);
        },
        handleValueHelpBankConfirm:function (evt){
            this.bankVal = evt.getParameter("selectedItems")[0].getProperty("title");
                this.bankField.setValue(this.bankVal);
        },
        handleValueHelpBankConfirm1:function (evt){
            this.bankVal1 = evt.getParameter("selectedItems")[0].getProperty("title");
                this.bankField1.setValue(this.bankVal1);
        },
        handleValueHelpBankClose:function () {
            this.bank.close();
        },
        handleValueHelpBankClose1:function () {
            this.bank1.close();
        },
        handleValueHelpBankCountryClose:function () {
            this.bankCountry.close();
        },
        handleValueHelpBankCountryClose1:function () {
            this.bankCountry1.close();
        },
        handleValueHelpBankSearch:function (evt) {
            var sValue = evt.getParameter("value");
                if (sValue.length > 0) {
                        var oFilter1 = new sap.ui.model.Filter("bank", 'Contains', sValue);
                        this.bank.getBinding("items").filter([oFilter1]);
                } else {
                    this.bank.getBinding("items").filter([]);
                }
        },
        handleValueHelpBankSearch1:function (evt) {
            var sValue = evt.getParameter("value");
                if (sValue.length > 0) {
                        var oFilter1 = new sap.ui.model.Filter("bank", 'Contains', sValue);
                        this.bank1.getBinding("items").filter([oFilter1]);
                } else {
                    this.bank1.getBinding("items").filter([]);
                }
        },
        handleValueHelpBankCountrySearch:function (evt) {
            var sValue = evt.getParameter("value");
                if (sValue.length > 0) {
                        var oFilter1 = new sap.ui.model.Filter("Country", 'Contains', sValue);
                        this.bankCountry.getBinding("items").filter([oFilter1]);
                } else {
                    this.bankCountry.getBinding("items").filter([]);
                }
        },
        handleValueHelpBankCountrySearch1:function (evt) {
            var sValue = evt.getParameter("value");
                if (sValue.length > 0) {
                        var oFilter1 = new sap.ui.model.Filter("Country", 'Contains', sValue);
                        this.bankCountry1.getBinding("items").filter([oFilter1]);
                } else {
                    this.bankCountry1.getBinding("items").filter([]);
                }
        },
        onConfirm:function (evt) {
            // var oFormData = new FormData();
            this.getView().getModel("appView").setProperty("/dmsFile", new FormData());
            // var oFileUploader = evt.getSource();
            var id=evt.getSource().getId().split("Collapsed--")[1];
            // var oFile = oFileUploader.getFocusDomRef().files[0];
            var oFile = evt.getParameter("files")[0];
            var fileName = evt.getParameters().files[0].name;
            var dmsData = this.getView().getModel("dmsModel").getData();
            this.getView().getModel("appView").getProperty("/dmsFile").append("file", oFile);
            dmsData.push({
                file:this.getView().getModel("appView").getProperty("/dmsFile"),
                fileName: id+"_"+fileName
            });
              this.getView().getModel("dmsModel").updateBindings(true);
            this.firstTime=false;
        },
        handleSetMaxLength:function (evt) {
            var val = evt.getSource().getValue().length;
            var maxLen = evt.getSource().getMaxLength();
            if(val >= maxLen){
                evt.getSource().setType("Text");
            }else{
                evt.getSource().setType("Number");
            }
        },
        handleCalcuate:function (evt) {
        //     var that = this;
        //     // this.getView().getModel("appView").setProperty("scl", evt.getSource().getValue());
        //     if(a == undefined){
        //     var a;
        //     a=evt.getSource().getValue();
        //     a+=parseInt(evt.getSource().getValue());
        //     console.log(a);
        //     }
        }


	});
});