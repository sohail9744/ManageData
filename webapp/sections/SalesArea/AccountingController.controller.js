sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (
    Controller,
    MessageBox
) {
    "use strict";

    return Controller.extend("Iffco.clap.sections.SalesArea.AccountingController", {
        onInit: function () {
            //debugger
            if (!this.salesData) {
                this.salesData = new sap.ui.xmlfragment("Iffco.clap.fragments.SalesFields", this);
                this.getView().addDependent(this.salesData);
            }
            if (!this.bp) {
                this.bp = new sap.ui.xmlfragment("Iffco.clap.fragments.BpRelation", this);
                this.getView().addDependent(this.bp);
            }
            if (!this.salesOrganization) {
                this.salesOrganization = new sap.ui.xmlfragment("Iffco.clap.fragments.SalesOrg", this);
                this.getView().addDependent(this.salesOrganization);
                this.salesOrganization.setModel(this.getOwnerComponent().getModel());
            }
            if (!this.distribution) {
                this.distribution = new sap.ui.xmlfragment("Iffco.clap.fragments.Distribution", this);
                this.getView().addDependent(this.distribution);
                this.distribution.setModel(this.getOwnerComponent().getModel("DistChannelModel"));
            }
            if (!this.division) {
                this.division = new sap.ui.xmlfragment("Iffco.clap.fragments.DivisionSet", this);
                this.getView().addDependent(this.division);
                this.division.setModel(this.getOwnerComponent().getModel("DivModel"));
            }

            if (!this.InvcDates) {
                this.InvcDates = new sap.ui.xmlfragment("Iffco.clap.fragments.InvcDates", this);
                this.InvcDates.setModel(this.getOwnerComponent().getModel());
                this.getView().addDependent(this.InvcDates);
            }

            if (!this.InvcLists) {
                this.InvcLists = new sap.ui.xmlfragment("Iffco.clap.fragments.InvcList", this);
                this.InvcLists.setModel(this.getOwnerComponent().getModel());
                this.getView().addDependent(this.InvcLists);
            }

            if (!this.customerGrp) {
                this.customerGrp = new sap.ui.xmlfragment("Iffco.clap.fragments.CustGroup", this);
                this.getView().addDependent(this.customerGrp);
                this.customerGrp.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            if (!this.TaxCategory) {
                this.TaxCategory = new sap.ui.xmlfragment("Iffco.clap.fragments.TaxCategory", this);
                this.getView().addDependent(this.TaxCategory);
                this.TaxCategory.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            if (!this.TaxClassfn) {
                this.TaxClassfn = new sap.ui.xmlfragment("Iffco.clap.fragments.TaxClassfn", this);
                this.getView().addDependent(this.TaxClassfn);
                this.TaxClassfn.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            if (!this.customerGrp1) {
                this.customerGrp1 = new sap.ui.xmlfragment("Iffco.clap.fragments.custGrp1", this);
                this.getView().addDependent(this.customerGrp1);
                this.customerGrp1.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            if (!this.customerGrp2) {
                this.customerGrp2 = new sap.ui.xmlfragment("Iffco.clap.fragments.custGrp2", this);
                this.getView().addDependent(this.customerGrp2);
                this.customerGrp2.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            if (!this.customerGrp3) {
                this.customerGrp3 = new sap.ui.xmlfragment("Iffco.clap.fragments.custGrp3", this);
                this.getView().addDependent(this.customerGrp3);
                this.customerGrp3.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            if (!this.customerGrp4) {
                this.customerGrp4 = new sap.ui.xmlfragment("Iffco.clap.fragments.custGrp4", this);
                this.getView().addDependent(this.customerGrp4);
                this.customerGrp4.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            if (!this.customerGrp5) {
                this.customerGrp5 = new sap.ui.xmlfragment("Iffco.clap.fragments.custGrp5", this);
                this.getView().addDependent(this.customerGrp5);
                this.customerGrp5.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            if (!this.DelvryPlant) {
                this.DelvryPlant = new sap.ui.xmlfragment("Iffco.clap.fragments.DeliveryPlant", this);
                this.getView().addDependent(this.DelvryPlant);
                this.DelvryPlant.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            // if (!this.DelvryPriorty) {
            //     this.DelvryPriorty = new sap.ui.xmlfragment("Iffco.clap.fragments.delvryPriorty", this);
            //     this.getView().addDependent(this.DelvryPriorty);
            //     this.DelvryPriorty.setModel(this.getOwnerComponent().getModel("S4D"));
            // }
            if (!this.CCA) {
                this.CCA = new sap.ui.xmlfragment("Iffco.clap.fragments.CreditControl", this);
                this.getView().addDependent(this.CCA);
                this.CCA.setModel(this.getOwnerComponent().getModel());
            }

            if (!this.Incoterms) {
                this.Incoterms = new sap.ui.xmlfragment("Iffco.clap.fragments.Incoterms", this);
                this.getView().addDependent(this.Incoterms);
                this.Incoterms.setModel(this.getOwnerComponent().getModel());
            }

            if (!this.PriceGroup) {
                this.PriceGroup = new sap.ui.xmlfragment("Iffco.clap.fragments.priceGroup", this);
                this.getView().addDependent(this.PriceGroup);
                this.PriceGroup.setModel(this.getOwnerComponent().getModel());
            }
            if (!this.PPDetermination) {
                this.PPDetermination = new sap.ui.xmlfragment("Iffco.clap.fragments.PpDetermination", this);
                this.getView().addDependent(this.PPDetermination);
                this.PPDetermination.setModel(this.getOwnerComponent().getModel());
            }
            if (!this.PriceList) {
                this.PriceList = new sap.ui.xmlfragment("Iffco.clap.fragments.priceList", this);
                this.getView().addDependent(this.PriceList);
                this.PriceList.setModel(this.getOwnerComponent().getModel());
            }

            if (!this.Currency) {
                this.Currency = new sap.ui.xmlfragment("Iffco.clap.fragments.Currency", this);
                this.getView().addDependent(this.Currency);
                this.Currency.setModel(this.getOwnerComponent().getModel());
            }
            if (!this.Authorization) {
                this.Authorization = new sap.ui.xmlfragment("Iffco.clap.fragments.AuthorizationGrp", this);
                this.getView().addDependent(this.Authorization);
                this.Authorization.setModel(this.getOwnerComponent().getModel());
            }
            if (!this.salesDist) {
                this.salesDist = new sap.ui.xmlfragment("Iffco.clap.fragments.salesDistrict", this);
                this.getView().addDependent(this.salesDist);
                this.salesDist.setModel(this.getOwnerComponent().getModel());
            }

            if (!this.DelvryPriorty) {
                this.DelvryPriorty = new sap.ui.xmlfragment("Iffco.clap.fragments.delvryPriorty", this);
                this.getView().addDependent(this.DelvryPriorty);
                this.DelvryPriorty.setModel(this.getOwnerComponent().getModel("S4D"));
            }
            if (!this.ShippingCondn) {
                this.ShippingCondn = new sap.ui.xmlfragment("Iffco.clap.fragments.ShippingCondn", this);
                this.getView().addDependent(this.ShippingCondn);
                this.ShippingCondn.setModel(this.getOwnerComponent().getModel("S4D"));
            }

            // if(!this.TaxCategory){
            //     this.TaxCategory = new sap.ui.xmlfragment("Iffco.clap.fragments.TaxCategory", this);
            //     this.getView().addDependent(this.TaxCategory);
            //     this.TaxCategory.setModel(this.getOwnerComponent().getModel("S4D"));
            // }
            // if(!this.TaxClassfn){
            //     this.TaxClassfn = new sap.ui.xmlfragment("Iffco.clap.fragments.TaxClassfn", this);
            //     this.getView().addDependent(this.TaxClassfn);
            //     this.TaxClassfn.setModel(this.getOwnerComponent().getModel("S4D"));
            // }

            if (!this.blockReason) {
                this.blockReason = new sap.ui.xmlfragment("Iffco.clap.fragments.BlockedReason", this);
                this.getView().addDependent(this.blockReason);
                this.blockReason.setModel(this.getOwnerComponent().getModel());
            }

            if (!this.cs) {
                this.cs = new sap.ui.xmlfragment("Iffco.clap.fragments.creditSegmentData", this);
                this.getView().addDependent(this.creditSegment);
                this.cs.setModel(this.getOwnerComponent().getModel());
            }

            if (!this.furtherInfo) {
                this.furtherInfo = new sap.ui.xmlfragment("Iffco.clap.fragments.creditSegment", this);
                this.getView().addDependent(this.furtherInfo);
                this.furtherInfo.setModel(this.getOwnerComponent().getModel());
            }
            if (!this.infoCat) {
                this.infoCat = new sap.ui.xmlfragment("Iffco.clap.fragments.InfoCat", this);
                this.getView().addDependent(this.infoCat);
                this.infoCat.setModel(this.getOwnerComponent().getModel());
            }
            if (!this.indusType) {
                this.indusType = new sap.ui.xmlfragment("Iffco.clap.fragments.IndustryType", this);
                this.getView().addDependent(this.indusType);
                this.indusType.setModel(this.getOwnerComponent().getModel());
            }

        },
        onAfterRendering: function (oEvent) {
            var that = this;
            that.oModel = this.getOwnerComponent().getModel();
            that.handleDivisionModel();
            that.handleCCAModel();
            that.handleDistbChanlModel();
            that.handleTaxClsModel();
        },

        //Creating a model for the get service of Division field in order to remove duplicate records.
        handleDivisionModel: function (evt) {
            var serviceURL = this.getOwnerComponent().getModel("S4D").sServiceUrl;
            var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);
            oModel.read("/DivisionSet", {
                success: function (oData, oResponse) {
                    var aCombinedData = [];
                    var aUniqueCustomers = [];
                    oData.results.forEach(function (obj) {
                        if (!aUniqueCustomers.includes(obj.Division)) {
                            aUniqueCustomers.push(obj.Division);
                            aCombinedData.push(obj);
                        }
                    });
                    // debugger
                    this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(aCombinedData), "DivModel");
                    this.getOwnerComponent().getModel("DivModel").updateBindings(true);
                }.bind(this),
                error: function (oError) { }
            });
        },

        //Creating a model for the get service of Distribution Channel field in order to remove duplicate records.
        handleDistbChanlModel: function (evt) {
            var serviceURL = this.getOwnerComponent().getModel("S4D").sServiceUrl;
            var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);
            oModel.read("/DistriChannelSet", {
                success: function (oData, oResponse) {
                    var aCombinedData = [];
                    var aUniqueCustomers = [];
                    oData.results.forEach(function (obj) {
                        if (!aUniqueCustomers.includes(obj.Distributionchannel)) {
                            aUniqueCustomers.push(obj.Distributionchannel);
                            aCombinedData.push(obj);
                        }
                    });
                    // debugger
                    this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(aCombinedData), "DistChannelModel");
                    this.getOwnerComponent().getModel("DistChannelModel").updateBindings(true);
                }.bind(this),
                error: function (oError) { }
            });
        },

        //Creating a model for the get service of Credit Control Area field in order to remove duplicate records.
        handleCCAModel: function (evt) {
            // debugger
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/ZDD_CM_MASTER", {
                success: function (oData, oResponse) {
                    // var oData = this.CCA.getBinding("items");
                    var aCombinedData = [];
                    var aUniqueCustomers = [];
                    oData.results.forEach(function (obj) {
                        if (!aUniqueCustomers.includes(obj.credit_control_area)) {
                            aUniqueCustomers.push(obj.credit_control_area);
                            aCombinedData.push(obj);
                        }
                    });
                    // debugger
                    this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(aCombinedData), "CCAModel");
                    this.getOwnerComponent().getModel("CCAModel").updateBindings(true);
                }.bind(this),
                error: function (oError) { }
            });
        },

        //Creating a model for the get service of Tax Classification field to remove duplicate records.
        handleTaxClsModel: function () {
            var that = this;
            var serviceURL = this.getOwnerComponent().getModel("S4D").sServiceUrl;
            var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);
            oModel.read("/TaxCategoryClasSet", {
                success: function (oData, oResponse) {
                    var aCombinedData = [];
                    var aUniqueCustomers = [];
                    oData.results.forEach(function (obj) {
                        if (!aUniqueCustomers.includes(obj.Taxclassification)) {
                            aUniqueCustomers.push(obj.Taxclassification);
                            aCombinedData.push(obj);
                        }
                    });
                    that.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(aCombinedData), "TaxClsModel");
                    that.getOwnerComponent().getModel("TaxClsModel").updateBindings(true);
                }.bind(that),
                error: function (oError) { }
            });
        },

        handleAddSales: function (evt) {
            this.salesData.open();
        },
        handleAddSalesGrid: function (evt) {
            // var that = this;
            var salesState = this.handleValidateSalesFields();
            if (salesState == true) {
                var salesOrg = this.salesData.getContent()[0].getContent()[1].getValue();
                var distribution = this.salesData.getContent()[0].getContent()[3].getValue();
                var division = this.salesData.getContent()[0].getContent()[5].getValue();

                //  var salesOrgMandat = this.getView().getModel("fieldMappingModels").getData().SalesOrganizationMandatory;
                //  var distributionMandat = this.getView().getModel("fieldMappingModels").getData().DistributionChannelMandatory;
                //  var divisionMandat = this.getView().getModel("fieldMappingModels").getData().DivisionMandatory;
                // var taxClsSplit = taxCls.split(" - ")[0];
                // this.handleUpdateTaxgridOrder();

                var arr = {
                    // "zcustomer_num":this.custNum,
                    "zsales_orgnization": salesOrg.split(" - ")[0],
                    "zsales_orgnization_text": salesOrg.split(" - ")[1],
                    "zdivision": division.split(" - ")[0],
                    "zdivision_text": division.split(" - ")[1],
                    "zdistribution_channel": distribution.split(" - ")[0],
                    "zdistribution_channel_text": distribution.split(" - ")[1],
                    "Flag": 'A',
                };
                this.getView().getModel("salesModel").oData.push(arr);
                this.getView().getModel("salesModel").updateBindings(true);

                if (this.getView().getModel("salesModel").oData.length > 0) {
                    this.getView().getModel("appView").setProperty("/salesFlag", true);
                }
                // this.createPanel();

                this.handleCancelSalesGrid();
            } else {
                MessageBox.error("Please validate the error fields");
            }

        },
        createPanel: function (evt) {

        },

        handleValidateSalesFields: function (evt) {
            var salesState = true;
            var content = this.salesData.getContent()[0].getContent();
            for (var b = 0; b < content.length; b++) {
                if (content[b].getMetadata().getName() != "sap.ui.core.Title") {
                    if (content[b].getVisible()) {
                        if (content[b].getMetadata().getName() == "sap.m.Label" && content[b].getRequired() === true && content[b].getVisible() ===
                            true) {
                            if (content[b + 1].getMetadata().getName() == "sap.m.Input") {
                                if (content[b + 1].getValue() == "") {
                                    content[b + 1].setValueState("Error").setValueStateText("");
                                    salesState = false;
                                } else
                                    content[b + 1].setValueState("None").setValueStateText("");
                            } else if (content[b + 1].getMetadata().getName() == "sap.m.MultiInput") {
                                if (content[b + 1].getValue() == "") {
                                    content[b + 1].setValueState("Error").setValueStateText("");
                                    salesState = false;
                                } else
                                    content[b + 1].setValueState("None").setValueStateText("");
                            }
                        }
                    }
                }
            }
            if (salesState === false) {
                this.ValidationMesg = "Please fill the required fields";
            }
            return salesState;
        },
        handleDeleteSalesGrid: function (e) {
            var that = this;
            var oModel = this.getView().getModel();
            if (e.getSource().getBindingContext("salesModel").getObject().zsales_area_id !== undefined) {
                var salesAreaId = e.getSource().getBindingContext("salesModel").getObject().zsales_area_id;
                var custNum = e.getSource().getBindingContext("salesModel").getObject().zcustomer_num;
                var salesOrg = e.getSource().getBindingContext("salesModel").getObject().zsales_orgnization;
                that.dPath = "/ZDD_CUST_SALESAREAS(zcustomer_num=guid'" + custNum + "',zsales_orgnization='" + salesOrg + "',zsales_area_id='" + salesAreaId + "')";
                that.getView().getModel("salesModel").oData.splice(e.getSource().getBindingContext("salesModel").getObject().zsales_area_id, 1);
                // that.getView().getModel("salesModel").updateBindings(true);
                e.getSource().getBindingContext("salesModel").getModel().updateBindings(true);
                oModel.remove(that.dPath, {
                    method: "DELETE",
                    success: function (data) {

                    },
                    error: function (e) {
                        jQuery.sap.require("sap.m.MessageBox");
                        sap.m.MessageBox(e);
                    }
                });
            } else {
                e.getSource().getBindingContext("salesModel").getObject().Flag = 'D';
                e.getSource().getBindingContext("salesModel").getModel().updateBindings(true);
            }
        },
        handleCancelSalesGrid: function (evt) {
            this.salesData.getContent()[0].getContent()[1].setValue("");
            this.salesData.getContent()[0].getContent()[3].setValue("");
            this.salesData.getContent()[0].getContent()[5].setValue("");
            this.salesData.close();
        },
        handleValueHelpForSalesOrg: function (evt) {
            this.salesOrgField = evt.getSource();
            this.salesOrganization.getBinding("items").filter([]);
            this.salesOrganization.open();
        },
        handleValueHelpSalesOrgClose: function () {
            this.salesOrganization._dialog.close();
        },
        handleValueHelpSalesOrgConfirm: function (evt) {
            this.salesTitle = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.salesOrgField.setValue(this.salesTitle + " - " + desc);
        },
        handleValueHelpSalesOrgSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Salesorg",
                    operator: "Contains",
                    value1: sValue
                });
                var filter2 = new sap.ui.model.Filter({
                    path: "Salesorgtext",
                    operator: "Contains",
                    value1: sValue
                });
                var sFilters = [filter1, filter2];
                filters.push(new sap.ui.model.Filter(sFilters, false));
                this.salesOrganization.getBinding("items").filter(filters, false);
            } else {
                this.salesOrganization.getBinding("items").filter([]);
            }
        },

        handleValueHelpForDistChannel: function (evt) {
            this.distributionField = evt.getSource();
            if (this.salesTitle) {
                this.distribution.getBinding("items").filter([new sap.ui.model.Filter("SalesOrg", "EQ", this.salesTitle)]);

                this.distribution.open();
            } else {
                MessageBox.error("Please select Sales organization");
            }

        },
        handleValueHelpDistributionClose: function () {
            this.distribution._dialog.close();
        },
        handleValueHelpDistributionConfirm: function (evt) {
            this.distributionTitle = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.distributionField.setValue(this.distributionTitle + " - " + desc);
            this.getView().getModel("appView").setProperty("/distributionChannel", this.distributionTitle);
        },
        handleValueHelpDistribSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Distributionchannel",
                    operator: "Contains",
                    value1: sValue
                });
                var filter2 = new sap.ui.model.Filter({
                    path: "Distributionchanneltext",
                    operator: "Contains",
                    value1: sValue
                });
                var sFilters = [filter1, filter2];
                filters.push(new sap.ui.model.Filter(sFilters, false));
                this.distribution.getBinding("items").filter(filters, false);
            } else {
                this.distribution.getBinding("items").filter([]);
            }
        },

        handleValueHelpForDivision: function (evt) {
            this.divisionField = evt.getSource();

            if (this.distributionTitle) {
                this.division.getBinding("items").filter([new sap.ui.model.Filter("Distributionchannel", "EQ", this.distributionTitle)]);

                this.division.open();
            } else {
                MessageBox.error("Please select Distribution Channel");
            }
        },
        handleValueHelpDivisionClose: function () {
            this.division._dialog.close();
        },
        handleValueHelpDivisionConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.divisionField.setValue(title + " - " + desc);
        },
        handleValueHelpDivisionSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Division",
                    operator: "Contains",
                    value1: sValue
                });
                var filter2 = new sap.ui.model.Filter({
                    path: "Divisiontext",
                    operator: "Contains",
                    value1: sValue
                });
                var sFilters = [filter1, filter2];
                filters.push(new sap.ui.model.Filter(sFilters, false));
                this.division.getBinding("items").filter(filters, false);
            } else {
                this.division.getBinding("items").filter([]);
            }
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
        handleValueHelpDelvPlantClose: function () {
            this.DelvryPlant.close();
        },
        handleCreate: function (evt) {
            var that = this;
            var objects =
            {
                "zsettlement_group": "",
                "zaccount_assignment_group": "",
                "zagency_business": "",
                "zdocument_index_active": "",
                "zmanual_invoice_maintenance": "",
                "zrebate": "",
                "zpricing": "",
                "zinvoicing_dates": "",
                "zinvoicing_list_dates": "",
                "zcustomer_group1": "",
                "zcustomer_group2": "",
                "zcustomer_group3": "",
                "zcustomer_group4": "",
                "zcustomer_group5": "",
                "zcustomer_group": "",
                "zinco_term": "",
                "zinco_location1": "",
                "zpayment_terms": "",
                "zcredit_control_area": "",
                "zpayment_gurantee_procedure": "",
                "zcomplete_delivery": "",
                "zmaximum_number_of_part_delive": "0.0",
                "zpartial_delivery_per_item": "",
                "zunlimited_tolerance": "",
                "zunder_delivery_tolerance": "0.0",
                "zover_delivery_tolerance": "0.0",
                "zbill_to_buyer": "",
                "zonly_ship_to": "",
                "zsales_person": "",
                "zagent": "",
                "zprice_group": "",
                "zpricelist": "",
                "zprice_procedured_term": "",
                "zcustomer_statistics_group": "",
                "zsales_district": "",
                "zsales_office": "",
                "zsales_group": "",
                "zcustomer_group": "",
                "zabc_class": "",
                "zsales_currency": "",
                "zaccount_at_customer": "",
                "zswitch_off_rounding": "",
                "zorderprobability": "",
                "zauthorization_group": "",
                "zitemproposal": "",
                "zunit_of_measure_group": "",
                "zexchange_rate_type": "",
                "zpp_customer_procedure": "",
                "zdelivery_priority": "",
                "zshipping_conditions": "",
                "zdelivery_plant": "",
                "zorder_combination": "",
                "zrelevant_pod": "",
                "zpod_timeframe": "0.0",
                // "zcountry" : "",
                "ztaxcategory": "",
                "ztax_classification": "",
                "ztax_category2": "",
                "ztax_classification2": "",
                "zrule": "",
                "zrisk_class": "",
                "zcheck_rule": "",
                "zlimit_define": "",
                "zlimit": "0.0",
                "zvalidity_to": "",
                "zcredit_segment": "",
                "zrelationship_to_bp": "",
                "zcredit_control_area_desc": "",
                "zcredit_segment_desc": "",
                "zblockedincm": "",
                "zspecialattention": "",
                "zblock_reason": "",
                // "zcredit_exposure" : "",
                "zutiliation_ptg": "0.0",
                "zresubmission_on": "",
                "zinfo_category": "",
                "zinfo_type": "",
                "zname_of_type": "",
                "zrelevant": "",
                "zindividual_step": "",
                "zcredit_amount": "0.0",
                "zcredit_curr": "",
                "zdate_from": "",
                "zdate_to": "",
                "zentered_on": "",
                "zdeleted_on": "",
                "zresubmission_date": "",
                "ztext_field": ""
                // "zhighest_dunning_data_outdated" : "",
                // "zdunning_level" : "",
                // "zdunning_amt" : "",
                // "zdunning_doc" : "",
                // "zdunning_not" : "",
                // "zhighest_dunning_currency" : "",
                // "zdunning_notice_id" : "",
                // "zdunning_notice_date" : "",
                // "zoldest_open_data_outdated" : "",
                // "zoldest_open_amount" : "",
                // "znet_due_date" : "",
                // "zdays_in_arrears" : "",
                // "zoldest_open_doc" : "",
                // "zoldest_open_currency" : "",
                // "zoldest_open_id" : "",
                // "zlast_payment_outdated" : "",
                // "zpayment_on" : "",
                // "zlast_payment_amount" : "",
                // "zlast_payment_doc" : "",
                // "zpayment_currency" : "",
                // "zpayment_id" : "",
                // "zkey_figures_data_outdated" : "",
                // "zdso" : "",
                // "zdso_amount" : "",
                // "zkey_figures_currency" : "",
                // "zwo_cash_discount" : "",
                // "zwith_cash_discount" : "",
                // "zmax_sales" : "",
                // "zwo_cash_days_in_arrears" : "",
                // "zwith_cash_days_in_arrears" : "",
                // "zsales" : "",
                // "zcollection_amt_ptg" : "",


            };

            //    this.getOwnerComponent().getModel("salesDataModel").getData().push(JSON.parse(JSON.stringify(objects)));
            //    this.getOwnerComponent().getModel("salesDataModel").updateBindings(true); 
            //    this.getView().getModel("appView").setProperty("/count", this.count+1);
            //    console.log(this.count);
            var count = this.getView().getModel("salesDataModel").getData().length;
            var container = this.getView().byId("container");
            this.salesPanel = new sap.ui.xmlfragment("frag" + count, "Iffco.clap.fragments.salesPanel", this);
            this.getView().addDependent(this.salesPanel);
            this.getOwnerComponent().getModel("salesDataModel").getData().push(JSON.parse(JSON.stringify(objects)));
            this.getOwnerComponent().getModel("salesDataModel").updateBindings(true);
            //    var count = this.getView().getModel("salesDataModel").getData().length;

            //    this.getView().getModel("appView").setProperty("/count", this.count+1);
            console.log(count);
            container.addItem(this.salesPanel);
            //   var headerText = salesPanel.getItems()[0].getContent()[0].getParent().getHeaderText();
            var headerCount = count + 1;
            // var buttonText =   salesPanel.getItems()[0].getHeaderToolbar().getContent()[2];
            // var buttonText =   salesPanel.getItems()[0].getHeaderToolbar().getContent()[0];
            // var headerText = salesPanel.getItems()[0].getHeaderToolbar().getContent()[0].getText();
            //   salesPanel.getItems()[0].getContent()[0].getParent().getHeaderToolbar().getContent()[0].getText()

            // salesPanel.getItems()[0].getHeaderToolbar().getContent()[0].setText(headerText+ " "+headerCount);
            // buttonText.setText(headerText +" "+headerCount);



            var simpleForm = this.salesPanel.getItems()[0].getContent()[0].getItems()[0];

            simpleForm.bindElement({
                path: "/" + count,
                model: "salesDataModel"
            });
            var oModel = this.getOwnerComponent().getModel();
            let custdata = this.getView().getModel("Customers").getData();
            var that = this
            if (custdata.zbusiness_unit_name) {
                oModel.read("/ZDD_BU_CC_VH", {
                    success: function (oData, oResponse) {
                        var bpRelData = [];
                        oData.results.forEach(function (obj) {
                            if (obj.Businessunit === custdata.zbusiness_unit_name) {
                                bpRelData.push(obj);
                            }
                        });
                        var bpValue = this.getOwnerComponent().getModel("salesDataModel").getData()
                        for (let m = 0; m < bpValue.length; m++) {
                            bpValue[m].zrelationship_to_bp = bpRelData[0].cc
                        }
                        this.getOwnerComponent().getModel("salesDataModel").updateBindings(true);
                    }.bind(this),

                    error: function (oError) { }

                });

            }
        },
        handleGenerateSales: function () {

            // var generateSale=false;
            // this.getView().getModel("appView").setProperty("/generateSale", false);

            if (this.getView().getModel("appView").getProperty("/generateSale") === false) {
                if (this.getView().getModel("salesDataModel").getData().length > 0) {
                    for (var i = 0; i < this.getView().getModel("salesDataModel").getData().length; i++) {
                        var count = i;
                        var container = this.getView().byId("container");

                        var salesPanel = new sap.ui.xmlfragment("frag" + count, "Iffco.clap.fragments.salesPanel", this);
                        this.getView().addDependent(salesPanel);

                        container.addItem(salesPanel);

                        //     var headerText = salesPanel.getItems()[0].getContent()[0].getParent().getHeaderText();
                        //   var headerCount = count+1;
                        //   salesPanel.getItems()[0].getContent()[0].getParent().setHeaderText(headerText +" "+headerCount);

                        var salesOrg = this.getView().getModel("salesDataModel").getData()[i].zsales_orgnization;
                        var distribution = this.getView().getModel("salesDataModel").getData()[i].zdistribution_channel;
                        var division = this.getView().getModel("salesDataModel").getData()[i].zdivision;

                        var headerText = salesPanel.getItems()[i].getHeaderToolbar().getContent()[0].getText();
                        salesPanel.getItems()[i].getHeaderToolbar().getContent()[0].setText(headerText + " (" + salesOrg + " - " + distribution + " - " + division + ") ");



                        var simpleForm = salesPanel.getItems()[0].getContent()[0].getItems()[0];

                        this.getView().getModel("appView").setProperty("/generateSale", true);

                        simpleForm.bindElement({
                            path: "/" + count,
                            model: "salesDataModel"
                        })
                        this.getView().getModel("salesDataModel").updateBindings(true);

                    }
                    this.getView().getModel("appView").setProperty("/addSales", true);
                } else {
                    MessageBox.information("There is no sales area to generate");
                }
            } else {
                MessageBox.information("Sales area is already generated");
            }


        },

        //    this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel([]), "salesModel");

        //value Help for Invoice Dates
        handleValueHelpForInvcDates: function (evt) {
            this.InvcDateField = evt.getSource();
            this.InvcDates.getBinding("items").filter([]);
            this.InvcDates.open();
        },
        handleValueHelpInvcDateConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.InvcDateField.setValue(title + " - " + desc);
        },
        handleValueHelpInvcDateSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Invoicedate",
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
                this.InvcDates.getBinding("items").filter(filters, false);
            } else {
                this.InvcDates.getBinding("items").filter([]);
            }
        },
        handleValueHelpInvcDateClose: function (params) {
            this.InvcDates.close();
        },

        //value Help for Invoice Lists
        handleValueHelpForInvcLists: function (evt) {
            this.InvListField = evt.getSource();
            this.InvcLists.getBinding("items").filter([]);
            this.InvcLists.open();
        },
        handleValueHelpInvcListConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.InvListField.setValue(title + " - " + desc);
        },
        handleValueHelpInvcListSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Invoicedate",
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
                this.InvcLists.getBinding("items").filter(filters, false);
            } else {
                this.InvcLists.getBinding("items").filter([]);
            }
        },
        handleValueHelpInvcListClose: function (params) {
            this.InvcLists.close();
        },

        //Value Help for Customer Group
        handleValueHelpForCusGrp: function (evt) {
            this.cField = evt.getSource();
            this.customerGrp.getBinding("items").filter([]);
            this.customerGrp.open();
        },
        handleValueHelpcusGrpConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.cField.setValue(title + " - " + desc);
            this.customerGrp.getBinding("items").filter([]);
            this.customerGrp.close();
        },
        handleValueHelpcusGrpSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Customergroup",
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
                this.customerGrp.getBinding("items").filter(filters, false);
            } else {
                this.customerGrp.getBinding("items").filter([]);
            }
        },
        handleValueHelpcusGrp1Close: function (evt) {
            this.customerGrp.close();
        },

        //Value Help for Customer Group 1
        handleValueHelpForCusGrp1: function (evt) {
            this.c1Field = evt.getSource();
            this.customerGrp1.getBinding("items").filter([]);
            this.customerGrp1.open();
        },
        handleValueHelpcusGrp1Confirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.c1Field.setValue(title + " - " + desc);
            this.customerGrp1.getBinding("items").filter([]);
            this.customerGrp1.close();
        },
        handleValueHelpcusGrp1Search: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Customergroup1",
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
                this.customerGrp1.getBinding("items").filter(filters, false);
            } else {
                this.customerGrp1.getBinding("items").filter([]);
            }
        },
        handleValueHelpcusGrp1Close: function (evt) {
            this.customerGrp1.close();
        },

        //Value Help for Customer Group 2
        handleValueHelpForCusGrp2: function (evt) {
            this.c2Field = evt.getSource();
            this.customerGrp2.getBinding("items").filter([]);
            this.customerGrp2.open();
        },
        handleValueHelpcusGrp2Confirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.c2Field.setValue(title + " - " + desc);
            this.customerGrp2.getBinding("items").filter([]);
            this.customerGrp2.close();
        },
        handleValueHelpcusGrp2Search: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Customergroup2",
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
                this.customerGrp2.getBinding("items").filter(filters, false);
            } else {
                this.customerGrp2.getBinding("items").filter([]);
            }
        },
        handleValueHelpcusGrp2Close: function (params) {
            this.customerGrp2.close();
        },

        //Value Help for Customer Group 3
        handleValueHelpForCusGrp3: function (evt) {
            this.c3Field = evt.getSource();
            this.customerGrp3.getBinding("items").filter([]);
            this.customerGrp3.open();
        },
        handleValueHelpcusGrp3Confirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.c3Field.setValue(title + " - " + desc);
            this.customerGrp3.getBinding("items").filter([]);
            this.customerGrp3.close();
        },
        handleValueHelpcusGrp3Search: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Customergroup3",
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
                this.customerGrp3.getBinding("items").filter(filters, false);
            } else {
                this.customerGrp3.getBinding("items").filter([]);
            }
        },
        handleValueHelpcusGrp3Close: function (evt) {
            this.customerGrp3.close();
        },

        //Value Help for Customer Group 4
        handleValueHelpForCusGrp4: function (evt) {
            this.c4Field = evt.getSource();
            this.customerGrp4.getBinding("items").filter([]);
            this.customerGrp4.open();
        },
        handleValueHelpcusGrp4Confirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.c4Field.setValue(title + " - " + desc);
            this.customerGrp4.getBinding("items").filter([]);
            this.customerGrp4.close();
        },
        handleValueHelpcusGrp4Search: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Customergroup4",
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
                this.customerGrp4.getBinding("items").filter(filters, false);
            } else {
                this.customerGrp4.getBinding("items").filter([]);
            }
        },
        handleValueHelpcusGrp4Close: function (params) {
            this.customerGrp4.close();
        },

        //Value Help for Customer Group 5
        handleValueHelpForCusGrp5: function (evt) {
            this.c5Field = evt.getSource();
            this.customerGrp5.getBinding("items").filter([]);
            this.customerGrp5.open();
        },
        handleValueHelpcusGrp5Confirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.c5Field.setValue(title + " - " + desc);
            this.customerGrp5.getBinding("items").filter([]);
            this.customerGrp5.close();
        },
        handleValueHelpcusGrp5Search: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Customergroup5",
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
                this.customerGrp5.getBinding("items").filter(filters, false);
            } else {
                this.customerGrp5.getBinding("items").filter([]);
            }
        },
        handleValueHelpcusGrp5Close: function (params) {
            this.customerGrp5.close();
        },

        //Value Help for Inco Terms
        handleValueHelpForIncoterms: function (evt) {
            this.IncotermsField = evt.getSource();
            this.Incoterms.getBinding("items").filter([]);
            this.Incoterms.open();
        },
        handleValueHelpIncotermsConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            this.IncotermsField.setValue(title);

        },
        handleValueHelpIncotermsClose: function (evt) {
            this.Incoterms._dialog.close();
        },
        handleValueHelpIncotermsSearch: function (evt) {
            var sValue = evt.getParameter("value");
            if (sValue.length > 0) {
                var oFilter1 = new sap.ui.model.Filter("Inco1", 'Contains', sValue);
                this.Incoterms.getBinding("items").filter([oFilter1]);
            } else {
                this.Incoterms.getBinding("items").filter([]);
            }
        },

        //Value Help for Credit Control
        handleValueHelpForCreditControl: function (evt) {
            this.CCAField = evt.getSource();
            if (this.getView().getModel("appView").getProperty("/distributionChannel")) {

                this.CCA.getBinding("items").filter([new sap.ui.model.Filter("DistributionChannel", "EQ", this.getView().getModel("appView").getProperty("/distributionChannel")),
                new sap.ui.model.Filter("SalesOrg", "EQ", this.salesTitle)]);
                this.CCA.open();

            } else {
                MessageBox.error("Please select Distribution channel first");
            }
        },
        handleValueHelpCCAClose: function (params) {
            this.CCA._dialog.close();
        },
        handleValueHelpCCAConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.CCAField.setValue(title + " - " + desc);
            if (this.salesPanel.getItems()) {
                // var credtSegmnt = this.salesPanel.getItems()[0].getContent()[0].getItems()[0].getContent()[144];
                // this.cs.getBinding("items").filter([new sap.ui.model.Filter("credit_control_area", "EQ", title)]);
                // credtSegmnt.setValue(this.CCAField.getValue());
            }
            this.getView().getModel("appView").setProperty("/cca", title);
        },
        handleValueHelpCCASearch: function (evt) {
            var sValue = evt.getParameter("value");
            var val1 = this.getView().getModel("appView").getProperty("/distributionChannel");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "credit_control_area",
                    operator: "Contains",
                    value1: sValue
                });
                var filter2 = new sap.ui.model.Filter({
                    path: "cca_description",
                    operator: "Contains",
                    value1: sValue
                });
                var sFilters = [filter1, filter2];
                filters.push(new sap.ui.model.Filter(sFilters, false));
                if (val1.length > 0) {
                    filters.push(new sap.ui.model.Filter("distribution_channel", "EQ", val1));
                }
                this.CCA.getBinding("items").filter(filters, true);
            } else {
                this.CCA.getBinding("items").filter([new sap.ui.model.Filter("distribution_channel", "EQ", val1)]);
            }
        },
        handleValueHelpForPriceGrp: function (evt) {
            this.PriceGroupField = evt.getSource();
            this.PriceGroup.getBinding("items").filter([]);
            this.PriceGroup.open();
        },
        handleValueHelpPriceGrpConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.PriceGroupField.setValue(title + " - " + desc);
            // this.busyDialog.close();
        },
        handleValueHelpPriceGrpSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Pricegroup",
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
                this.PriceGroup.getBinding("items").filter(filters, false);
            } else {
                this.PriceGroup.getBinding("items").filter([]);
            }
        },
        handleValueHelpPriceGrpClose: function (params) {
            this.PriceGroup.close();
        },

        //value Help for PP Determination
        handleValueHelpForPPDetermination: function (evt) {
            this.PpDetrmntn = evt.getSource();
            this.PPDetermination.getBinding("items").filter([]);
            this.PPDetermination.open();
        },
        handleValueHelpPPDetrmntnConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.PpDetrmntn.setValue(title + " - " + desc);
            // this.busyDialog.close();
        },
        handleValueHelpPPDetrmntnSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "PpDetermination",
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
                this.PPDetermination.getBinding("items").filter(filters, false);
            } else {
                this.PPDetermination.getBinding("items").filter([]);
            }
        },
        handleValueHelpPPDetrmntnClose: function (params) {
            this.PPDetermination.close();
        },

        //value Help for Sales Area - Price List
        handleValueHelpForPriceList: function (evt) {
            this.PriceListField = evt.getSource();
            this.PriceList.getBinding("items").filter([]);
            this.PriceList.open();
        },
        handleValueHelpPriceListConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.PriceListField.setValue(title + " - " + desc);
            // this.busyDialog.close();
        },
        handleValueHelpPriceListSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Pltyp",
                    operator: "Contains",
                    value1: sValue
                });
                var filter2 = new sap.ui.model.Filter({
                    path: "Ptext",
                    operator: "Contains",
                    value1: sValue
                });
                var sFilters = [filter1, filter2];
                filters.push(new sap.ui.model.Filter(sFilters, false));
                this.PriceList.getBinding("items").filter(filters, false);
            } else {
                this.PriceList.getBinding("items").filter([]);
            }
        },
        handleValueHelpPriceListClose: function (params) {
            this.PriceList.close();
        },

        // value help for currency
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

        // value help for sales dist
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

        //Value Help for Delivery Priority
        handleValueHelpForDelvPrior: function (evt) {
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
        handleValueHelpDelvPriorClose: function (evt) {
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

        //Value Help for Tax Category
        handleValueHelpForTaxCat: function (evt) {
            this.TaxCat = evt.getSource();
            this.TaxCategory.getBinding("items").filter([]);
            this.TaxCategory.open();
        },
        handleValueHelpTaxCatConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            this.taxCatTitle = title;
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
            if (this.taxCatTitle.length > 0) {
                this.TaxClassfn.getBinding("items").filter([new sap.ui.model.Filter("Taxcategory", "EQ", this.taxCatTitle)]);
                this.TaxClassfn.open();
            } else {
                sap.m.MessageBox.error("Please select the Tax Category");
            }
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
                // var val = this.getView().byId("LAND1").getValue();
                // this.TaxClassfn.getBinding("items").filter([new sap.ui.model.Filter("Taxcategory", "EQ", val.split(" - ")[0])]);
            }
        },
        handleValueHelpTaxClassfnClose: function (evt) {
            this.TaxClassfn.close();
        },
        handleSetMaxLength: function (evt) {
            var val = evt.getSource().getValue().length;
            var maxLen = evt.getSource().getMaxLength();
            if (val >= maxLen) {
                evt.getSource().setType("Text");
            } else {
                evt.getSource().setType("Number");
            }
        },
        handleDeleteSalesArea: function (evt) {
            var that = this;
            var buttonText = evt.getSource().getText();

            var val = evt.getSource().getParent().getParent().sId.split('panel')[1];

            var panels = this.getView().byId("container").getItems();

            for (var i = 0; i < panels.length; i++) {
                if (val === panels[i].getItems()[0].sId.split('panel')[1]) {
                    var delObj = evt.getSource().getParent().getParent().getParent().getItems()[0].getContent()[0].getItems()[0].getBindingContext("salesDataModel").getObject();
                    if (delObj.Flag === 'U') {
                        delObj.Flag = 'D';
                        evt.getSource().getParent().getParent().getParent().destroy();
                        // this.getView().getContent()[0].getContent()[2].getItems()[i].destroy();
                        console.log("deleted");
                    } else {
                        evt.getSource().getParent().getParent().getParent().destroy();
                    }

                }

            }
            MessageBox.information("Sales Area has been deleted");


        },
        //  Credit limit value helps

        handleValueHelpForBlockReason: function (evt) {
            this.blockReasonField = evt.getSource();
            this.blockReason.getBinding("items").filter([]);
            this.blockReason.open();
        },
        handleValueHelpBlockReasonClose: function (params) {
            this.blockReason._dialog.close();
        },
        handleValueHelpBlockReasonConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.blockReasonField.setValue(title + " - " + desc);
        },
        handleValueHelpBlockedReasonSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "Blockreason",
                    operator: "Contains",
                    value1: sValue
                });
                var filter2 = new sap.ui.model.Filter({
                    path: "Blockreasontxt",
                    operator: "Contains",
                    value1: sValue
                });
                var sFilters = [filter1, filter2];
                filters.push(new sap.ui.model.Filter(sFilters, false));
                this.blockReason.getBinding("items").filter(filters, false);
            } else {
                this.blockReason.getBinding("items").filter([]);
            }
        },

        handleValueHelpForCS: function (evt) {
            this.creditSegmentField = evt.getSource();
            if (this.getView().getModel("appView").getProperty("/cca")) {
                this.cs.getBinding("items").filter([new sap.ui.model.Filter("credit_control_area", "EQ", this.getView().getModel("appView").getProperty("/cca")),
                new sap.ui.model.Filter("SalesOrg", "EQ", this.salesTitle)]);
                this.cs.open();
            } else {
                MessageBox.error("Please select the credit control area first");
            }
        },
        handleValueHelpCSClose: function (params) {
            this.cs._dialog.close();
        },
        onChangeBP: function (evt) {
            
            this.bpRealtionInputField = evt.getSource();
            const bpId = this.getView().getModel("Customers").getData().zbusiness_unit_name;
            if (bpId) {
                this.bp.getBinding("items").filter([new sap.ui.model.Filter("Businessunit", "EQ", bpId)]);
                this.bp.open();
            } else {
                MessageBox.error("Please select the Business Unit first");
            }
        },
        handleValueHelpBpConfirm: function (evt) {
            const selectedBpTitle = evt.getParameter("selectedItems")[0].getProperty("title");
            this.bpRealtionInputField.setValue(selectedBpTitle);
        },
        handleValueHelpBpSearch: function (evt) {
            var sValue = evt.getParameter("value");
            let mBPID = this.getView().getModel("Customers").getData().zbusiness_unit_name;
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "cc",
                    operator: "EQ",
                    value1: sValue
                });
                var filter2 = new sap.ui.model.Filter({
                    path: "Businessunit",
                    operator: "EQ",
                    value1: mBPID
                });
                var sFilters = [filter1, filter2];
                filters.push(new sap.ui.model.Filter(sFilters, false));
                this.bp.getBinding("items").filter(filters, false);
            } else {
                this.bp.getBinding("items").filter([new sap.ui.model.Filter("Businessunit", "EQ", mBPID)]);
            }
        },
        handleValueHelpCSConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.creditSegmentField.setValue(title + " - " + desc);
        },

        handleValueHelpForIndusType: function (evt) {
            this.indusTypeField = evt.getSource();
            this.indusType.getBinding("items").filter([new sap.ui.model.Filter("InformationCat", 'Contains', this.infoCatValue)]);
            this.indusType.open();
        },
        handleValueHelpIndusTypeConfirm: function (evt) {
            this.indusTypeValue = evt
                .getParameter("selectedItems")[0]
                .getProperty("title");
            var desc = evt
                .getParameter("selectedItems")[0]
                .getProperty("description");
            this.indusTypeField.setValue(this.indusTypeValue);
            this.furtherInfo.getContent()[0].getContent()[3].setValue(desc);
            // this.getView().byId("nameOfType").setValue(desc);
        },
        handleValueHelpIndusTypeClose: function (evt) {
            this.indusType._dialog.close();
        },

        handleValueHelpForInfoCat: function (evt) {
            this.infoCatField = evt.getSource();
            this.infoCat.getBinding("items").filter([]);
            this.infoCat.open();
        },
        handleValueHelpInfoCatConfirm: function (evt) {
            this.infoCatValue = evt
                .getParameter("selectedItems")[0]
                .getProperty("title");
            var desc = evt
                .getParameter("selectedItems")[0]
                .getProperty("description");
            this.infoCatField.setValue(this.infoCatValue + " - " + desc);
        },
        handleValueHelpInfoCatClose: function (evt) {
            this.infoCat._dialog.close();
        },

        handleValueHelpIndusTypeSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "InformationType",
                    operator: "Contains",
                    value1: sValue
                });
                var filter2 = new sap.ui.model.Filter({
                    path: "NameOfType",
                    operator: "Contains",
                    value1: sValue
                });
                var sFilters = [filter1, filter2];
                filters.push(new sap.ui.model.Filter(sFilters, false));
                this.indusType.getBinding("items").filter(filters, false);
            } else {
                this.indusType.getBinding("items").filter([]);
            }
        },
        handleValueHelpInfoCatSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var filters = [];
            if (sValue.length > 0) {
                var filter1 = new sap.ui.model.Filter({
                    path: "InformationCat",
                    operator: "Contains",
                    value1: sValue
                });
                var filter2 = new sap.ui.model.Filter({
                    path: "InformationDes",
                    operator: "Contains",
                    value1: sValue
                });
                var sFilters = [filter1, filter2];
                filters.push(new sap.ui.model.Filter(sFilters, false));
                this.infoCat.getBinding("items").filter(filters, false);
            } else {
                this.infoCat.getBinding("items").filter([]);
            }
        },

        dateFormatter: function (value) {
            if (value) {
                var sNotifDate = new Date(value.toString().split("GMT")[0] + " UTC")
                    .toISOString()
                    .split(".")[0];
                return sNotifDate;
            } else return "";
        },

        handleStartDateChange: function (evt) {
            this.ExpStrtDate = evt.getSource();
            if (this.ExpEndDate && this.ExpStrtDate.getValue()) {
                if (this.ExpStrtDate.getValue() !== "" && this.ExpEndDate.getValue() !== "") {
                    if (this.ExpStrtDate.getValue() > this.ExpEndDate.getValue()) {
                        this.ExpStrtDate.setValueState("Error").setValueStateText("Start Date must be equal to or lesser than end date");
                        this.ExpEndDate.setValueState("Error").setValueStateText("Start Date must be equal to or lesser than end date");
                    } else {
                        this.ExpStrtDate.setValueState("None").setValueStateText("");
                        this.ExpEndDate.setValueState("None").setValueStateText("");
                    }
                } else {
                    this.ExpStrtDate.setValueState("None").setValueStateText("");
                    this.ExpEndDate.setValueState("None").setValueStateText("");
                }
            } else {
                this.ExpStrtDate.setValueState("None").setValueStateText("");
            }
        },

        //Validation of the date field Valid To
        handleEndDateChange: function (evt) {
            this.ExpEndDate = evt.getSource();

            if (this.ExpStrtDate.getValue() !== "" && this.ExpEndDate.getValue() !== "") {
                if (new Date(this.ExpStrtDate.getValue()) > new Date(this.ExpEndDate.getValue())) {
                    this.ExpStrtDate.setValueState("Error").setValueStateText("Start Date must be equal to or lesser than end date");
                    this.ExpEndDate.setValueState("Error").setValueStateText("Start Date must be equal to or lesser than end date");
                } else {
                    this.ExpStrtDate.setValueState("None").setValueStateText("");
                    this.ExpEndDate.setValueState("None").setValueStateText("");
                }
            } else {
                this.ExpStrtDate.setValueState("None").setValueStateText("");
                this.ExpEndDate.setValueState("None").setValueStateText("");
            }
        },
        //Validation of the date field Valid From
        handleStartDateChange1: function (evt) {
            this.ExpStrtDate1 = evt.getSource();

            if (this.ExpEndDate1) {
                if (this.ExpStrtDate1.getValue() !== "" && this.ExpEndDate.getValue() !== "") {
                    if (this.ExpStrtDate1.getValue() > this.ExpEndDate1.getValue()) {
                        this.ExpStrtDate1.setValueState("Error").setValueStateText("Start Date must be equal to or lesser than end date");
                        this.ExpEndDate1.setValueState("Error").setValueStateText("Start Date must be equal to or lesser than end date");
                    } else {
                        this.ExpStrtDate1.setValueState("None").setValueStateText("");
                        this.ExpEndDate1.setValueState("None").setValueStateText("");
                    }
                } else {
                    this.ExpStrtDate1.setValueState("None").setValueStateText("");
                    this.ExpEndDate1.setValueState("None").setValueStateText("");
                }
            } else {
                this.ExpStrtDate1.setValueState("None").setValueStateText("");
            }
        },

        //Validation of the date field Valid To
        handleEndDateChange1: function (evt) {
            this.ExpEndDate1 = evt.getSource();
            if (this.ExpStrtDate1.getValue() !== "" && this.ExpEndDate1.getValue() !== "") {
                if (new Date(this.ExpStrtDate1.getValue()) > new Date(this.ExpEndDate1.getValue())) {
                    this.ExpStrtDate1.setValueState("Error").setValueStateText("Start Date must be equal to or lesser than end date");
                    this.ExpEndDate1.setValueState("Error").setValueStateText("Start Date must be equal to or lesser than end date");
                } else {
                    this.ExpStrtDate1.setValueState("None").setValueStateText("");
                    this.ExpEndDate1.setValueState("None").setValueStateText("");
                }
            } else {
                this.ExpStrtDate1.setValueState("None").setValueStateText("");
                this.ExpEndDate1.setValueState("None").setValueStateText("");
            }
        },




    });
});