sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function(
	Controller,
    MessageBox
) {
	"use strict";

	return Controller.extend("Iffco.clap.sections.SalesArea.GIController", {
        /**
         * @override
         */
        onInit: function() {
            if (!this.salesData) {
                this.salesData = new sap.ui.xmlfragment("Iffco.clap.fragments.SalesFields", this);
                this.getView().addDependent(this.salesData);
            }
            if (!this.salesOrganization) {
                this.salesOrganization = new sap.ui.xmlfragment("Iffco.clap.fragments.SalesOrg", this);
                this.getView().addDependent(this.salesOrganization);
                this.salesOrganization.setModel(this.getOwnerComponent().getModel());
            }
            if (!this.distribution) {
                this.distribution = new sap.ui.xmlfragment("Iffco.clap.fragments.Distribution", this);
                this.getView().addDependent(this.distribution);
                
            }
            if (!this.division) {
                this.division = new sap.ui.xmlfragment("Iffco.clap.fragments.DivisionSet", this);
                this.getView().addDependent(this.division);
            }
            
        },
        handleAddSales: function (evt) {
            this.salesData.open();
        },
        handleAddSalesGrid: function (evt) {
            // var that = this;
           var salesState = this.handleValidateSalesFields();
           if(salesState == true){
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

            if(this.getView().getModel("salesModel").oData.length > 0){
                this.getView().getModel("appView").setProperty("/salesFlag", true);
            }

            this.handleCancelSalesGrid();
        }else{
            MessageBox.error("Please validate the error fields");
        }
        
        },
        
        handleValidateSalesFields : function (evt) {
            var salesState= true;
            var content = this.salesData.getContent()[0].getContent();
            for(var b=0; b<content.length; b++){
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
            if(salesState === false ){
                this.ValidationMesg = "Please fill the required fields";
            }
            return salesState;
        },
        handleDeleteSalesGrid: function (e) {
            var that = this;
            var oModel = this.getView().getModel();
            if(e.getSource().getBindingContext("salesModel").getObject().zsales_area_id !== undefined){
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
        }else{
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
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.salesOrgField.setValue(title + " - " + desc);
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
            this.distribution.getBinding("items").filter([]);
            this.distribution.open();
        },
        handleValueHelpDistributionClose: function () {
            this.distribution._dialog.close();
        },
        handleValueHelpDistributionConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.distributionField.setValue(title + " - " + desc);
            this.getView().getModel("appView").setProperty("/distributionChannel", title);
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
            this.division.getBinding("items").filter([]);
            this.division.open();
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
        }
	});
});