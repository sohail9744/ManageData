sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("Iffco.clap.sections.CustomerBasicDetails.IdentificationNumbersController", {
		/**
		 * @override
		 */
		onInit: function() {
			// Controller.prototype.onInit.apply(this, arguments);
			if (!this.License) {
				this.License = new sap.ui.xmlfragment("Iffco.clap.fragments.LicenceType",this);
				this.getView().addDependent(this.License);
				this.License.setModel(this.getOwnerComponent().getModel());
			  }
			if (!this.SrcOfEnquiry) {
				this.SrcOfEnquiry = new sap.ui.xmlfragment("Iffco.clap.fragments.SourceOfEnquiry",this);
				this.getView().addDependent(this.SrcOfEnquiry);
				this.SrcOfEnquiry.setModel(this.getOwnerComponent().getModel());
			  }
		
		},
       //Validation of the date field Valid From
		handleStartDateChange: function (evt) {
			this.ExpStrtDate = evt.getSource();
			this.getView().byId("validFrom").setValue(this.ExpStrtDate.getValue());
			if (this.ExpEndDate) {
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
			this.getView().byId("validTo").setValue(this.ExpEndDate.getValue());
			if (this.ExpStrtDate.getValue() !== "" && this.ExpEndDate.getValue() !== "") {
				//if (this.ExpStrtDate.getValue() > this.ExpEndDate.getValue()) {

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
		handleValidateVat: function (evt) {
			var gstinVal = evt.getSource().getValue();
			if (gstinVal !== "") {
				var reggst = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if (!reggst.test(gstinVal) && gstinVal != '') {
					sap.m.MessageBox.error('The Entered Vat Is Invalid.');
					evt.getSource().setValueState("Error").setValueStateText(
						"The Entered Vat Is Invalid.");
				} else
					evt.getSource().setValueState("None").setValueStateText("");
			} else evt.getSource().setValueState("None").setValueStateText("");
		},
		
		//Value Help for License
		handleValueHelpForLicense: function (evt) {
            this.LicenseField = evt.getSource();
            this.License.getBinding("items").filter([]);
            this.License.open();
        },
        handleValueHelpLicenseTypSearch: function (evt) {
            var sValue = evt.getParameter("value");
            if (sValue.length > 0) {
                var oFilter1 = new sap.ui.model.Filter("licence_type", 'Contains', sValue);
                this.License.getBinding("items").filter([oFilter1]);
            } else {
                this.License.getBinding("items").filter([]);
            }
        },
        handleValueHelpLicenseTypConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.LicenseField.setValue(title + " " + desc);
            this.License.getBinding("items").filter([]);
            this.License.close();
        },
        handleValueHelpLicenseTypClose: function (evt) {
            this.License.close();
        },

		//Value Help for Source Of Enquiry
		handleValueHelpForSourceOfEnquiry: function (evt) {
            this.SrcOfEnquiryField = evt.getSource();
            this.SrcOfEnquiry.getBinding("items").filter([]);
            this.SrcOfEnquiry.open();
        },
        handleValueHelpSrcOfEnqrySearch: function (evt) {
            var sValue = evt.getParameter("value");
            if (sValue.length > 0) {
                    var oFilter1 = new sap.ui.model.Filter("zsource_of_enquiry", 'Contains', sValue);
                    this.SrcOfEnquiry.getBinding("items").filter([oFilter1]);
            } else {
                this.SrcOfEnquiry.getBinding("items").filter([]);
            }
        },
        handleValueHelpSrcOfEnqryConfirm: function (evt) {
            var title = evt.getParameter("selectedItems")[0].getProperty("title");
            var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            this.SrcOfEnquiryField.setValue(title + " - " + desc);
            this.SrcOfEnquiry.getBinding("items").filter([]);
            this.SrcOfEnquiry.close();
        },
        handleValueHelpSrcOfEnqryClose: function (evt) {
            this.SrcOfEnquiry.close();
        }
	});
});