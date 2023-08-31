sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    "sap/ui/core/Fragment",
    "Iffco/clap/formatter/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, Fragment, formatter) {

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
                if (!this.ex) {
                    this.ex = new sap.ui.xmlfragment("Iffco.clap.fragments.ExistingCustomer", this);
                    this.getView().addDependent(this.ex);
                    this.ex.setModel(this.getOwnerComponent().getModel());
                }
                this.existingCustomerList();
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
            existingCustomerList: function (evt) {
                var serviceURL = this.getOwnerComponent().getModel("S4D111").sServiceUrl;
                var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);
                this.arr = [];
                //i don't thing
                oModel.read("/ExistingCustomerSet", {
                    success: function (oData, oResponse) {
                        var aCombinedData = [];
                        var aUniqueCustomers = [];
                        oData.results.forEach(function (oCustomer) {
                            if (!aUniqueCustomers.includes(oCustomer.zbusiness_partner_id)) {
                                aUniqueCustomers.push(oCustomer.zbusiness_partner_id);
                                aCombinedData.push(oCustomer);
                            }
                        });
                        this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(aCombinedData), "existingCustomerSet");
                    }.bind(this),
                    error: function (error) {
                        console.log("Existing Customer API error: " + oData);
                    },
                });
            },
            handleCancel: function () {
                this.ex.close();
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
                let process = oEvent.getSource().getBindingContext().getProperty("zrequest_type");
                let zStatus = oEvent.getSource().getBindingContext().getProperty("zrequest_status");

                if (zStatus === "In Progress") {
                    this.getView().getModel("appView").setProperty("/status", false)
                }
                if (zStatus === "In Draft") {
                    this.getView().getModel("appView").setProperty("/status", true)
                }
                if (zStatus === "Completed") {
                    this.getView().getModel("appView").setProperty("/status", true)
                }
                this.getView().getModel("appView").setProperty("/process", process);
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
            },
            getSelections: function (evt) {
                var that = this;
                this.getView().getModel("appView").setProperty("/selectedMode", evt.getParameters().selected);
                this.zcustomer_legal_name = evt.getSource().getSelectedContexts()[0].getObject().zcustomer_legal_name;
                this.zbusinessPartnerId = evt.getSource().getSelectedContexts()[0].getObject().zbusiness_partner_id;
            },
            handleOK: function (evt) {
                if (this.ex.getContent()[1].getSelectedItem()) {
                    this.check2 = true;
                    var busyDialog = new sap.m.BusyDialog();
                    busyDialog.open();
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("CustomerDetail", {
                        "process": this.getView().getModel("appView").getProperty("/process"),
                        "mode": "COPY S4 RECORD",
                        "zbusinessPartnerId": this.zbusinessPartnerId
                    });
                    if (!this.check1 && !this.checkB) {
                        this.checkB = true;
                        setTimeout(function () {
                            busyDialog.close();
                        }, 28000);
                    } else {
                        busyDialog.close();
                    }
                } else {
                    sap.m.MessageBox.information("Please select a record to continue.");
                }
            },
            handleChangeCustomer: function (oEvent) {
                this.getView().getModel("appView").setProperty("/process", 'CHANGE');
                this.onClearSelection();
                this.onSearchExist();
                this.ex.open();
            },
            handleExtendCustomer: function (oEvent) {
                this.getView().getModel("appView").setProperty("/process", 'EXTEND');
                this.onClearSelection();
                this.onSearchExist();
                this.ex.open();
            },
            onClearSelection: function () {
                var table = this.ex.getContent()[1]; // Replace "yourTableId" with the actual ID of your table
                // Get all items/rows in the table
                var items = table.getItems();

                // Iterate over each item and set its "selected" property to false
                items.forEach(function (item) {
                    item.setSelected(false);
                });

                //to remove the preselected filters - Mujaida
                var filterItems = this.ex.getContent()[0].getFilterItems();
                if (filterItems.length > 0) {
                    for (var a = 0; a < filterItems.length; a++) {
                        filterItems[a].getControl().setValue();
                    }
                }
            },
            onSearchExist: function () {
                var oTable = this.ex;
                var oFilter = this.ex.getContent()[0];
                var aFilters = [];
                for (var i = 0; i < oFilter.getAllFilterItems().length; i++) {
                    var sName = oFilter.getAllFilterItems()[i].getProperty("name");
                    var sPath = "";
                    var dPath = "";
                    var sValue = "";
                    var sKeys = [];
                    if (sName === "Business Partner Id") {
                        sPath = "zbusiness_partner_id";
                        sValue = oFilter.getAllFilterItems()[i].getControl().getValue();
                    } else if (sName === "Customer Name") {
                        sPath = "zfirst_name";
                        sValue = oFilter.getAllFilterItems()[i].getControl().getValue();

                    } else if (sName === "Company Code") {
                        sPath = "zcompany_code";
                        sValue = oFilter.getAllFilterItems()[i].getControl().getValue();
                    }
                    else if (sName === "Customer Legal Name") {
                        sPath = "zcustomer_legal_name";
                        sValue = oFilter.getAllFilterItems()[i].getControl().getValue();
                    }
                    else if (sName == "Status") {
                        sPath = "zrequest_status";
                        sKeys = oFilter.getAllFilterItems()[i].getControl().getSelectedKeys();
                    }
                    else if (sName == "Request Type") {
                        sPath = "zrequest_type";
                        sKeys = oFilter.getAllFilterItems()[i].getControl().getSelectedKeys();
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
                oTable.getContent()[1].getBinding("items").filter(aFilters);
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

            // handleNewCustomer: function (oEvent) {
            //     this.check2 = true;
            //     this.getView().getModel("appView").setProperty("/addSales", true);
            //     this.getView().getModel("appView").setProperty("/selectedType", "Secured Credit Limit");

            //     var busyDialog = new sap.m.BusyDialog();
            //     busyDialog.open();
            //     var oRouter = this.getOwnerComponent().getRouter();
            //     oRouter.navTo("CustomerDetail", {
            //         "zcustomer_num": "1",
            //         "zsales_orgnization": "2",
            //         "mode": "add",
            //         "process": "Create Customer"
            //     });
            //     if (!this.check1 && !this.checkB) {
            //         this.checkB = true;
            //         setTimeout(function () {
            //             busyDialog.close();
            //         }, 28000);
            //     } else {
            //         busyDialog.close();
            //     }

            // },
            // handleBulkRequest:function () {
            //         this.bulkRequest.open();

            // }
        });
    });
