sap.ui.define([
    "sap/ui/core/mvc/Controller",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("Iffco.clap.sections.CustomerBasicDetails.SiteDetailsController", {
            /**
             * @override
             */
            onInit: function() {
                // Controller.prototype.onInit.apply(this, arguments);
                if (!this.legalName) {
                    this.legalName = new sap.ui.xmlfragment("Iffco.clap.fragments.LegalName", this);
                    this.getView().addDependent(this.legalName);
                }
                if (!this.Authorization) {
                    this.Authorization = new sap.ui.xmlfragment("Iffco.clap.fragments.AuthorizationGrp", this);
                    this.getView().addDependent(this.Authorization);
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
            handleValueHelpForLegalName: function (evt) {
                this.legalNameField = evt.getSource();
                this.legalName.getBinding("items").filter([]);
                this.legalName.open();
            },
            handleValueHelpLegalNameClose: function (params) {
                this.legalName._dialog.close();
            },
            handleValueHelpLegalNameConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                this.legalNameField.setValue(title);
            },
            handleValueHelpLegalNameSearch: function (evt) {
                var sValue = evt.getParameter("value");
                if (sValue.length > 0) {
                        var oFilter1 = new sap.ui.model.Filter("Name1", 'Contains', sValue);
                        this.legalName.getBinding("items").filter([oFilter1]);
                } 
            },

            //Value Help for Authorization
            handleValueHelpForAuthorization: function (evt) {
                this.authorField = evt.getSource();
                this.Authorization.getBinding("items").filter([]);
                this.Authorization.open();
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
            handleValueHelpAuthurClose: function (params) {
                this.Authorization.close();
            },
            handleValueHelpAuthurConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.authorField.setValue(title + " - " + desc);
                this.Authorization.getBinding("items").filter([]);
                this.Authorization.close();
            }
	});

});