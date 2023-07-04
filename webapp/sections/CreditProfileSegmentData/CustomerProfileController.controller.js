sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("Iffco.clap.sections.CreditProfileSegmentData.CustomerProfileController", {
            /**
             * @override
             */
            onInit: function () {
                // Controller.prototype.onInit.apply(this, arguments);
                if (!this.cs) {
                    this.cs = new sap.ui.xmlfragment("Iffco.clap.fragments.creditSegmentData", this);
                    this.getView().addDependent(this.creditSegment);
                    this.cs.setModel(this.getOwnerComponent().getModel());
                }

            },
            handleValueHelpForBP: function () {
                alert("BP relation value help triggered");
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
            handleCreditSegmentValue: function (evt) {
                this.getView().byId("cs").setValue()
            },
            handleValueHelpForCS: function (evt) {
                this.creditSegmentField = evt.getSource();
                if (this.getView().getModel("appView").getProperty("/cca")) {
                    this.cs.getBinding("items").filter([new sap.ui.model.Filter("credit_control_area", "Contains", this.getView().getModel("appView").getProperty("/cca"))]);
                    this.cs.open();
                } else {
                    MessageBox.error("Please select Credit Control Area");
                }
            },
            handleValueHelpCSClose: function (params) {
                this.cs._dialog.close();
            },
            handleValueHelpCSConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.creditSegmentField.setValue(title + " - " + desc);
            },
            // handleValueHelpCreditSegmentSearch: function (evt) {
            //     var sValue = evt.getParameter("value");
            //     if (sValue.length > 0) {
            //         if (sValue.length <= 2) {
            //             var oFilter1 = new sap.ui.model.Filter("Land1", 'EQ', sValue);
            //             this.creditSegment.getBinding("items").filter([oFilter1]);
            //         } else {
            //             var oFilter2 = new sap.ui.model.Filter("Landx", 'Contains', sValue);
            //             this.creditSegment.getBinding("items").filter([oFilter2]);
            //         }
            //         // this.Country.getBinding("items").filter([oFilter2]);
            //     } else {
            //         this.creditSegment.getBinding("items").filter([]);
            //     }
            // },
        });

    });