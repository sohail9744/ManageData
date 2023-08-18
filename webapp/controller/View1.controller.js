sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    "sap/ui/core/Fragment",
    "Iffco/clap/formatter/formatter",
    "../utils/ruleEngine"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Fragment, formatter, ruleEngine) {
        "use strict";

        return Controller.extend("Iffco.clap.controller.View1", {
            formatter: formatter,
            onInit: function () {
                this.check1 = false;
                this.check2 = false;
                if (!this.bulkRequest) {
                    this.bulkRequest = new sap.ui.xmlfragment("Iffco.clap.fragments.bulkUpload", this);
                    this.getView().addDependent(this.bulkRequest);
                }
                if (!this.CompCode) {
                    this.CompCode = new sap.ui.xmlfragment("Iffco.clap.fragments.CompCode", this);
                    this.getView().addDependent(this.CompCode);
                }
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteView1").attachPatternMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function (oEvent) {
                // debugger
                var oView = this.getView();
                // if (oView.getDomRef() && oView.getParent() && oEvent.getParameter("name") === "RouteView1") {
                let oTable = oView.byId("table");
                oTable.getModel().refresh();
                oTable.getModel().updateBindings();
                // }
            },

            // reset functionality on adapt filters
            onReset: function (evt) {
                // to fetch the selected filter items
                var filterBars = evt.getSource().mAggregations.filterGroupItems;

                for (var i = 0; i < filterBars.length; i++) {
                    if (filterBars[i].getVisibleInFilterBar() === false) {
                        filterBars[i].setVisibleInFilterBar(true);
                    }
                }
            },
            handleValueHelpForCompCode: function (evt) {
                this.CompCodeField = evt.getSource();
                this.CompCode.getBinding("items").filter([]);
                this.CompCode.open();
            },
            handleValueHelpCompCodeSearch: function (evt) {
                var sValue = evt.getParameter("value");
                var filters = [];
                if (sValue.length > 0) {
                    var filter1 = new sap.ui.model.Filter({
                        path: "Bukrs",
                        operator: "Contains",
                        value1: sValue
                    });
                    var filter2 = new sap.ui.model.Filter({
                        path: "Butxt",
                        operator: "Contains",
                        value1: sValue
                    });
                    var sFilters = [filter1, filter2];
                    filters.push(new sap.ui.model.Filter(sFilters, false));
                    this.CompCode.getBinding("items").filter(filters, false);
                } else {
                    this.CompCode.getBinding("items").filter([]);
                }
            },
            handleValueHelpCompCodeConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.CompCodeField.setValue(title + " - " + desc);
                this.CompCode.getBinding("items").filter([]);
                this.CompCode.close();
            },
            handleValueHelpCompCodeClose: function (evt) {
                this.CompCode.close();
            },
            handleRequestnavigation: function (oEvent) {
                this.check2 = true;
                var busyDialog = new sap.m.BusyDialog();
                busyDialog.open();
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("CustomerDetail", {
                    "zcustomer_num": oEvent.getSource().getBindingContext().getProperty("zcustomer_num"),
                    "zsales_orgnization": oEvent.getSource().getBindingContext().getProperty("zsales_orgnization"),
                    // "zsales_orgnization":'20',
                    "mode": "edit",
                    "process": oEvent.getSource().getBindingContext().getProperty("zrequest_type")
                });
                if (!this.check1 && !this.checkB) {
                    this.checkB = true;
                    setTimeout(function () {
                        busyDialog.close();
                    }, 28000);
                } else {
                    busyDialog.close();
                }
                // if(!this.check2 && !this.checkB2){
                //     this.checkB2  = true;
                //     setTimeout(function () {
                //         BI.close();
                //     }, 28000);
                // }else{
                //     BI.close(); 
                // }
            },
            onSearch: function () {
                var oModel = this.getView().getModel();
                var oTable = this.getView().byId("table");
                var oFilter = this.getView().byId("filterbar");
                var aFilters = [];
                for (var i = 0; i < oFilter.getAllFilterItems().length; i++) {
                    var sName = oFilter.getAllFilterItems()[i].getProperty("name");
                    var sPath = "";
                    var dPath = "";
                    var sValue = "";
                    var sKeys = [];
                    if (sName === "Request Number") {
                        sPath = "zrequest_no";
                        sValue = oFilter.getAllFilterItems()[i].getControl().getValue();
                    } else if (sName === "Customer Name") {
                        sPath = "zfirst_name";
                        sValue = oFilter.getAllFilterItems()[i].getControl().getValue();

                    } else if (sName === "Company Code") {
                        sPath = "zcompany_code";
                        // sValue = oFilter.getAllFilterItems()[i].getControl().getValue();
                        sValue = oFilter.getAllFilterItems()[i].getControl().getValue().split(" -")[0];
                    }
                    else if (sName === "License Code") {
                        sPath = "zimport_license_number";
                        sValue = oFilter.getAllFilterItems()[i].getControl().getValue();
                    }
                    else if (sName == "Status") {
                        sPath = "zrequest_status";
                        sKeys = oFilter.getAllFilterItems()[i].getControl().getSelectedKeys();
                    }
                    else if (sName == "Business Unit") {
                        sPath = "zbusiness_unit_name";
                        sKeys = oFilter.getAllFilterItems()[i].getControl().getSelectedKeys();
                    }
                    else if (sName == "Request Type") {
                        sPath = "zrequest_type";
                        sKeys = oFilter.getAllFilterItems()[i].getControl().getSelectedKeys();
                    }
                    else if (sName == "Date Range") {
                        sPath = "zcreated_date";
                        dPath = "zupdated_date";

                        var a = oFilter.getAllFilterItems()[i].getControl();
                        var from = a.mProperties.dateValue;
                        var to = a.mProperties.secondDateValue;
                        if (from != null) {
                            aFilters.push(new Filter({ path: sPath, operator: FilterOperator.GE, value1: from }));
                            aFilters.push(new Filter({ path: dPath, operator: FilterOperator.LE, value1: to }));
                        }
                    }

                    if (sPath !== "") {
                        if (sValue !== "") {
                            aFilters.push(new Filter({ path: sPath, operator: FilterOperator.Contains, value1: sValue }));
                        }
                        if (sKeys.length > 0) {
                            var aKeysFilter = [];
                            for (var j = 0; j < sKeys.length; j++) {
                                if (sKeys[j] !== "All") {
                                    aKeysFilter.push(new Filter({ path: sPath, operator: FilterOperator.Contains, value1: sKeys[j] }));
                                }
                            }
                            if (aKeysFilter.length > 0) {
                                aFilters.push(new Filter({
                                    filters: aKeysFilter,
                                    and: false
                                }));
                            }
                        }
                    }
                }
                oTable.getBinding("items").filter(aFilters);

            },
            handleEditCustomer: function (oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();

                if (!this._pDialog) {
                    this._pDialog = Fragment.load({
                        id: oView.getId(),
                        name: "Iffco.clap.fragments.LegalName",
                        controller: this
                    }).then(function (oDialog) {
                        oDialog.setModel(oView.getModel("LegalName"));
                        return oDialog;
                    });
                }

                this._pDialog.then(function (oDialog) {
                    // this._configDialog(oButton, oDialog);
                    oDialog.open();
                }.bind(this));

            },

            onDialogClose: function (oEvent) {
                var aContexts = oEvent.getParameter("selectedContexts");
                // if (aContexts && aContexts.length) {
                //     MessageToast.show("You have chosen " + aContexts.map(function (oContext) { return oContext.getObject().Name; }).join(", "));
                // } else {
                //     MessageToast.show("No new item was selected.");
                // }
                oEvent.getSource().getBinding("items").filter([]);
            },

            handleNewCustomer: function (oEvent) {
                this.check2 = true;
                this.getView().getModel("appView").setProperty("/addSales", true);
                this.getView().getModel("appView").setProperty("/selectedType", "Secured Credit Limit");

                var busyDialog = new sap.m.BusyDialog();
                busyDialog.open();
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("CustomerDetail", {
                    "zcustomer_num": "1",
                    "zsales_orgnization": "2",
                    "mode": "add",
                    "process": "Create Customer"
                });
                if (!this.check1 && !this.checkB) {
                    this.checkB = true;
                    setTimeout(function () {
                        busyDialog.close();
                    }, 28000);
                } else {
                    busyDialog.close();
                }

            },
            // handleBulkRequest:function () {
            //         this.bulkRequest.open();

            // }
        });
    });
