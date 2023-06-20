sap.ui.define([
    "sap/ui/core/mvc/Controller",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("Iffco.clap.sections.SalesArea.SalesOrderController", {
            /**
             * @override
             */
            onInit: function() {
                // Controller.prototype.onInit.apply(this, arguments);
                if (!this.Currency) {
                    this.Currency = new sap.ui.xmlfragment("Iffco.clap.fragments.Currency", this);
                    this.getView().addDependent(this.Currency);
                }
                if (!this.Authorization) {
                    this.Authorization = new sap.ui.xmlfragment("Iffco.clap.fragments.AuthorizationGrp", this);
                    this.getView().addDependent(this.Authorization);
                }
                if (!this.salesDist) {
                    this.salesDist = new sap.ui.xmlfragment("Iffco.clap.fragments.salesDistrict", this);
                    this.getView().addDependent(this.salesDist);
                }
                if (!this.customerGrp) {
                    this.customerGrp = new sap.ui.xmlfragment("Iffco.clap.fragments.CustGroup", this);
                    this.getView().addDependent(this.customerGrp);
                    this.customerGrp.setModel(this.getOwnerComponent().getModel("S4D"));
                }
                if (!this.unitOfMsrGrp) {
                    this.unitOfMsrGrp = new sap.ui.xmlfragment("Iffco.clap.fragments.UnitOfMeasureGrp", this);
                    this.getView().addDependent(this.unitOfMsrGrp);
                    this.unitOfMsrGrp.setModel(this.getOwnerComponent().getModel("S4D"));
                }
                if (!this.exchngRateType) {
                    this.exchngRateType = new sap.ui.xmlfragment("Iffco.clap.fragments.ExchangeRateType", this);
                    this.getView().addDependent(this.exchngRateType);
                    this.exchngRateType.setModel(this.getOwnerComponent().getModel("S4D"));
                }
                if (!this.PPCustProcedure) {
                    this.PPCustProcedure = new sap.ui.xmlfragment("Iffco.clap.fragments.PPCustrProcedure", this);
                    this.getView().addDependent(this.PPCustProcedure);
                    this.PPCustProcedure.setModel(this.getOwnerComponent().getModel("S4D"));
                }
            
            },
            //Value Help for Customer Group
            handleValueHelpForCusGrp: function (evt) {
                this.c1Field = evt.getSource();
                this.customerGrp.getBinding("items").filter([]);
                this.customerGrp.open();
            },
            handleValueHelpcusGrpConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.c1Field.setValue(title + " - " + desc);
                this.customerGrp.getBinding("items").filter([]);
                this.customerGrp.close();
            },
            handleValueHelpcusGrp1Close: function (evt) {
                this.customerGrp.close();
            },

            //Value Help for Currency
            handleValueHelpForCurrency: function (evt) {
                this.currencyField = evt.getSource();
                this.Currency.getBinding("items").filter([]);
                this.Currency.open();
            },
            handleValueHelpCurrencyClose: function (params) {
                this.Currency._dialog.close();
            },
            handleValueHelpCurrencyConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.currencyField.setValue(title + " - " + desc);
                this.Currency.getBinding("items").filter([]);
                this.Currency.close();
            },
            handleValueHelpCurrencySearch: function (evt) {
                var sValue = evt.getParameter("value");
                 var filters = [];
                 if (sValue.length > 0) {
                     var filter1 = new sap.ui.model.Filter({
                         path: "Waers",
                         operator: "Contains",
                         value1: sValue
                     });
                     var filter2 = new sap.ui.model.Filter({
                         path: "ltext",
                         operator: "Contains",
                         value1: sValue
                     });
                     var sFilters = [filter1, filter2];
                     filters.push(new sap.ui.model.Filter(sFilters, false));
                     this.Currency.getBinding("items").filter(filters, false);
                 } else {
                     this.Currency.getBinding("items").filter([]);
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
            },

            //Value Help for Authorization
            handleValueHelpForAuthorization: function (evt) {
                this.authorField = evt.getSource();
                this.Authorization.getBinding("items").filter([]);
                this.Authorization.open();
            },
            handleValueHelpAuthurClose: function (params) {
                this.Authorization.close();
            },
            handleValueHelpAuthrSearch: function (evt) {
                var sValue = evt.getParameter("value");
                 var filters = [];
                 if (sValue.length > 0) {
                     var filter1 = new sap.ui.model.Filter({
                         path: "Authori",
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
                     this.Authorization.getBinding("items").filter(filters, false);
                 } else {
                     this.Authorization.getBinding("items").filter([]);
                 }
             },
            handleValueHelpAuthurConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.authorField.setValue(title + " - " + desc);
                this.Authorization.getBinding("items").filter([]);
                this.Authorization.close();
            },

            //Value Help for Sales District
            handleValueHelpForsalesDist: function (evt) {
                this.salesDistField = evt.getSource();
                this.salesDist.getBinding("items").filter([]);
                this.salesDist.open();
            },
            handleValueHelpSalesDistConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.salesDistField.setValue(title + " - " + desc);
                this.salesDist.getBinding("items").filter([]);
                this.salesDist.close();
            },
            handleValueHelpSalesDistSearch: function (evt) {
                var sValue = evt.getParameter("value");
                var filters = [];
                if (sValue.length > 0) {
                    var filter1 = new sap.ui.model.Filter({
                        path: "District",
                        operator: "Contains",
                        value1: sValue
                    });
                    var filter2 = new sap.ui.model.Filter({
                        path: "Discription",
                        operator: "Contains",
                        value1: sValue
                    });
                    var sFilters = [filter1, filter2];
                    filters.push(new sap.ui.model.Filter(sFilters, false));
                    this.salesDist.getBinding("items").filter(filters, false);
                } else {
                    this.salesDist.getBinding("items").filter([]);
                }
            },
            handleValueHelpSalesDistClose: function (params) {
                this.salesDist.close();
            },

            //Value Help for Unit Of Measure Group
            handleValueHelpForUntOfMeasrGrp: function (evt) {
                this.unitOfMsrGrpField = evt.getSource();
                this.unitOfMsrGrp.getBinding("items").filter([]);
                this.unitOfMsrGrp.open();
            },
            handleValueHelpUntMsrGrpConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.unitOfMsrGrpField.setValue(title + " - " + desc);
                this.unitOfMsrGrp.getBinding("items").filter([]);
                this.unitOfMsrGrp.close();
            },
            handleValueHelpUntMsrGrpSearch: function (evt) {
              var sValue = evt.getParameter("value");
                var filters = [];
                if (sValue.length > 0) {
                    var filter1 = new sap.ui.model.Filter({
                        path: "UnitMeasureGroup",
                        operator: "Contains",
                        value1: sValue
                    });
                    var filter2 = new sap.ui.model.Filter({
                        path: "Discription",
                        operator: "Contains",
                        value1: sValue
                    });
                    var sFilters = [filter1, filter2];
                    filters.push(new sap.ui.model.Filter(sFilters, false));
                    this.unitOfMsrGrp.getBinding("items").filter(filters, false);
                } else {
                    this.unitOfMsrGrp.getBinding("items").filter([]);
                }
            },
            handleValueHelpUntMsrGrpClose: function (params) {
                this.unitOfMsrGrp.close();
            },

            //Value Help for Exchange Rate Type
            handleValueHelpForExchngRateType: function (evt) {
                this.exchngRateTypeField = evt.getSource();
                this.exchngRateType.getBinding("items").filter([]);
                this.exchngRateType.open();
            },
            handleValueHelpExchngRateTypeConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.exchngRateTypeField.setValue(title + " - " + desc);
                this.exchngRateType.getBinding("items").filter([]);
                this.exchngRateType.close();
            },
            handleValueHelpExchngRateTypeSearch: function (evt) {
               var sValue = evt.getParameter("value");
                var filters = [];
                if (sValue.length > 0) {
                    var filter1 = new sap.ui.model.Filter({
                        path: "Exchangeratetype",
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
                    this.exchngRateType.getBinding("items").filter(filters, false);
                } else {
                    this.exchngRateType.getBinding("items").filter([]);
                }
            },
            handleValueHelpExchngRateTypeClose: function (params) {
                this.exchngRateType.close();
            },

            //Value Help for PP Customer Procedure
            handleValueHelpForPPCustProcedure: function (evt) {
                this.PPCustProcedureField = evt.getSource();
                this.PPCustProcedure.getBinding("items").filter([]);
                this.PPCustProcedure.open();
            },
            handleValueHelpPPCustProcedureConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.PPCustProcedureField.setValue(title + " - " + desc);
                this.PPCustProcedure.getBinding("items").filter([]);
                this.PPCustProcedure.close();
            },
            handleValueHelpPPCustProcedureSearch: function (evt) {
               var sValue = evt.getParameter("value");
                var filters = [];
                if (sValue.length > 0) {
                    var filter1 = new sap.ui.model.Filter({
                        path: "Ppcustproce",
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
                    this.PPCustProcedure.getBinding("items").filter(filters, false);
                } else {
                    this.PPCustProcedure.getBinding("items").filter([]);
                }
            },
            handleValueHelpPPCustProcedureClose: function (params) {
                this.PPCustProcedure.close();
            }
	});

});