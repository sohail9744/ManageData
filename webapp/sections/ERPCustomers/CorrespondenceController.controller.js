sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("Iffco.clap.sections.ERPCustomers.CorrespondenceController", {
        onInit: function() {
                this.handleAccClerkModel();
                if (!this.AccountingClerk) {
                        this.AccountingClerk = new sap.ui.xmlfragment("Iffco.clap.fragments.AccoutingClerk", this);
                        this.getView().addDependent(this.AccountingClerk);
                }
                if (!this.AccountStatement) {
                        this.AccountStatement = new sap.ui.xmlfragment("Iffco.clap.fragments.AccountStatement", this);
                        this.getView().addDependent(this.AccountStatement);
                }
        },
         //Creating a model for the get service of Accounting Clerk field in order to remove duplicate records.
         handleAccClerkModel: function(evt){
            var serviceURL = this.getOwnerComponent().getModel("S4D").sServiceUrl;
            var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);
            oModel.read("/AccountingClerkSet", {
                success: function (oData, oResponse) {
                    var aCombinedData = [];
                    var aUniqueCustomers = [];
                    oData.results.forEach(function (obj) {
                        if (!aUniqueCustomers.includes(obj.Accountingclerk)){
                            aUniqueCustomers.push(obj.Accountingclerk);
                            aCombinedData.push(obj);
                        }
                    });
                    // debugger
                    this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(aCombinedData), "AccClerkModel");
                    this.getOwnerComponent().getModel("AccClerkModel").updateBindings(true);
                }.bind(this),
                error: function (oError) { }
            });
        },
        
        //Value Help for Accounting Clerk
        handleValueHelpForAccountingClerk: function (evt) {
                this.AccountingClerkField = evt.getSource();
                this.AccountingClerk.getBinding("items").filter([]);
                this.AccountingClerk.open();
            },
            handleValueHelpAcctClerkSearch: function (evt) {
                var sValue = evt.getParameter("value");
                var filters = [];
                if (sValue.length > 0) {
                    var filter1 = new sap.ui.model.Filter({
                        path: "Accountingclerk",
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
                    this.AccountingClerk.getBinding("items").filter(filters, false);
                } else {
                    this.AccountingClerk.getBinding("items").filter([]);
                }
            },
            handleValueHelpAcctClerkConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.AccountingClerkField.setValue(title + " - " + desc);
                this.AccountingClerk.getBinding("items").filter([]);
                this.AccountingClerk.close();
            },
            handleValueHelpAcctClerkClose: function (evt) {
                this.AccountingClerk.close();
            },

        //Value Help for Accounting Statement
        handleValueHelpForAccountStatement: function (evt) {
                this.AcctStatemntField = evt.getSource();
                this.AccountStatement.getBinding("items").filter([]);
                this.AccountStatement.open();
            },
            handleValueHelpAcctStatemntSearch: function (evt) {
                var sValue = evt.getParameter("value");
                var filters = [];
                if (sValue.length > 0) {
                    var filter1 = new sap.ui.model.Filter({
                        path: "Accountstatements",
                        operator: "EQ",
                        value1: sValue
                    });
                    var filter2 = new sap.ui.model.Filter({
                        path: "Description",
                        operator: "Contains",
                        value1: sValue
                    });
                    var sFilters = [filter1, filter2];
                    filters.push(new sap.ui.model.Filter(sFilters, false));
                    this.AccountStatement.getBinding("items").filter(filters, false);
                } else {
                    this.AccountStatement.getBinding("items").filter([]);
                }
            },
            handleValueHelpAcctStatemntConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.AcctStatemntField.setValue(title + " - " + desc);
                this.AccountStatement.getBinding("items").filter([]);
                this.AccountStatement.close();
            },
            handleValueHelpAcctStatemntClose: function (evt) {
                this.AccountStatement.close();
            }
	});
});