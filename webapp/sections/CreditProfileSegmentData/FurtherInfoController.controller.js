sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "Iffco/clap/formatter/formatter",
    "sap/m/MessageBox",
  ],
  function (Controller, formatter, MessageBox) {
    "use strict";

    return Controller.extend(
      "Iffco.clap.sections.CreditProfileSegmentData.FurtherInfoController",
      {
        formatter: formatter,
        /**
         * @override
         */
        onInit: function () {
          if (!this.furtherInfo) {
            this.furtherInfo = new sap.ui.xmlfragment(
              "Iffco.clap.fragments.creditSegment",
              this
            );
            this.getView().addDependent(this.furtherInfo);
            this.furtherInfo.setModel(this.getOwnerComponent().getModel());
          }
          if (!this.infoCat) {
            this.infoCat = new sap.ui.xmlfragment(
              "Iffco.clap.fragments.InfoCat",
              this
            );
            this.getView().addDependent(this.infoCat);
            this.infoCat.setModel(this.getOwnerComponent().getModel());
          }
          if (!this.indusType) {
            this.indusType = new sap.ui.xmlfragment(
              "Iffco.clap.fragments.IndustryType",
              this
            );
            this.getView().addDependent(this.indusType);
            this.indusType.setModel(this.getOwnerComponent().getModel());
          }
        },
        handleValueHelpIndusTypeSearch: function (evt) {
          var sValue = evt.getParameter("value");
          var filters = [];
          if (sValue.length > 0) {
            var filter1 = new sap.ui.model.Filter({
              path: "InformationType",
              operator: "Contains",
              value1: sValue,
            });
            var filter2 = new sap.ui.model.Filter({
              path: "NameOfType",
              operator: "Contains",
              value1: sValue,
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
              value1: sValue,
            });
            var filter2 = new sap.ui.model.Filter({
              path: "InformationDes",
              operator: "Contains",
              value1: sValue,
            });
            var sFilters = [filter1, filter2];
            filters.push(new sap.ui.model.Filter(sFilters, false));
            this.infoCat.getBinding("items").filter(filters, false);
          } else {
            this.infoCat.getBinding("items").filter([]);
          }
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
        handleFurtherOpen: function (evt) {
          this.furtherInfo.open();
        },
        handleAddCreditGrid: function (evt) {
          var that = this;

          var infoType = this.furtherInfo
            .getContent()[0]
            .getContent()[1]
            .getValue();
          var nameOfComp = this.furtherInfo
            .getContent()[0]
            .getContent()[3]
            .getValue()
            .split(" ")[0];
          var relevence = this.furtherInfo
            .getContent()[0]
            .getContent()[5]
            .getSelected()
            ? "Y"
            : "N";
          var indiStp = this.furtherInfo
            .getContent()[0]
            .getContent()[7]
            .getValue();
          var amt = this.furtherInfo.getContent()[0].getContent()[9].getValue();
          var frmDate = this.furtherInfo
            .getContent()[0]
            .getContent()[11]
            .getValue()
            ? this.dateFormatter(
                this.furtherInfo.getContent()[0].getContent()[11].getValue()
              )
            : null;
          var toDate = this.furtherInfo
            .getContent()[0]
            .getContent()[13]
            .getValue()
            ? this.dateFormatter(
                this.furtherInfo.getContent()[0].getContent()[13].getValue()
              )
            : null;
          var enteredOn = this.furtherInfo
            .getContent()[0]
            .getContent()[15]
            .getValue()
            ? this.dateFormatter(
                this.furtherInfo.getContent()[0].getContent()[15].getValue()
              )
            : null;
          var deletedOn = this.furtherInfo
            .getContent()[0]
            .getContent()[17]
            .getValue()
            ? this.dateFormatter(
                this.furtherInfo.getContent()[0].getContent()[17].getValue()
              )
            : null;
          var reSubmit = this.furtherInfo
            .getContent()[0]
            .getContent()[19]
            .getValue()
            ? this.dateFormatter(
                this.furtherInfo.getContent()[0].getContent()[19].getValue()
              )
            : null;
          var textArea = this.furtherInfo
            .getContent()[0]
            .getContent()[21]
            .getValue();

          var arr = {
            zinfo_type: infoType,
            zname_of_type: nameOfComp,
            zrelevant: relevence,
            zindividual_step: indiStp,
            zcredit_amount: amt,
            zdate_from: frmDate,
            zdate_to: toDate,
            zentered_on: enteredOn,
            zdeleted_on: deletedOn,
            zresubmission_date: reSubmit,
            ztext_field: textArea,
            Flag: "A",
          };
          if (
            this.furtherInfo
              .getContent()[0]
              .getContent()[11]
              .getValueState() === "None" &&
            this.furtherInfo
              .getContent()[0]
              .getContent()[13]
              .getValueState() === "None" &&
            this.furtherInfo
              .getContent()[0]
              .getContent()[15]
              .getValueState() === "None" &&
            this.furtherInfo
              .getContent()[0]
              .getContent()[17]
              .getValueState() === "None"
          ) {
            this.getView().getModel("creditSegmentModel").oData.push(arr);
            this.getView().getModel("creditSegmentModel").updateBindings(true);
            this.handleCancelCreditGrid();
          } else {
            MessageBox.error("Please check date fields validation");
          }
        },
        handleCancelCreditGrid: function (evt) {
          this.furtherInfo.getContent()[0].getContent()[1].setValue("");
          this.furtherInfo.getContent()[0].getContent()[3].setValue("");
          // this.furtherInfo.getContent()[0].getContent()[5].setValue("");
          this.furtherInfo.getContent()[0].getContent()[7].setValue("");
          this.furtherInfo.getContent()[0].getContent()[9].setValue("");
          this.furtherInfo.getContent()[0].getContent()[11].setValue("");
          this.furtherInfo.getContent()[0].getContent()[13].setValue("");
          this.furtherInfo.getContent()[0].getContent()[15].setValue("");
          this.furtherInfo.getContent()[0].getContent()[17].setValue("");
          this.furtherInfo.getContent()[0].getContent()[19].setValue("");

          this.furtherInfo.close();
        },
        dateFormatter: function (value) {
          if (value) {
            var sNotifDate = new Date(value.toString().split("GMT")[0] + " UTC")
              .toISOString()
              .split(".")[0];
            return sNotifDate;
          } else return "";
        },
        handleValueHelpForInfoCat: function (evt) {
          this.infoCatField = evt.getSource();
          var serviceURL = this.getOwnerComponent().getModel("S4D").sServiceUrl;
          var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);

          oModel.read("/CreditInformationSet", {
            success: function (oData, oResponse) {
              var aCombinedData = [];
              var aUniqueCustomers = [];
              oData.results.forEach(function (oCustomer) {
                if (!aUniqueCustomers.includes(oCustomer.InformationDes)) {
                  aUniqueCustomers.push(oCustomer.InformationDes);
                  aCombinedData.push(oCustomer);
                }
              });

              this.getOwnerComponent().setModel(
                new sap.ui.model.json.JSONModel(aCombinedData),
                "creditInfoSet"
              );
            }.bind(this),
            error: function (error) {},
          });

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
        handleValueHelpForIndusType: function (evt) {
          this.indusTypeField = evt.getSource();
          if (this.infoCatValue !== undefined) {
            var serviceURL =
              this.getOwnerComponent().getModel("S4D").sServiceUrl;
            var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);

            oModel.read("/CreditInformationSet", {
              filters: [
                new sap.ui.model.Filter(
                  "InformationCat",
                  sap.ui.model.FilterOperator.EQ,
                  this.infoCatValue
                ),
              ],
              success: function (oData, oResponse) {
                var aCombinedData = [];
                var aUniqueCustomers = [];
                oData.results.forEach(function (oCustomer) {
                  if (!aUniqueCustomers.includes(oCustomer.NameOfType)) {
                    aUniqueCustomers.push(oCustomer.NameOfType);
                    aCombinedData.push(oCustomer);
                  }
                });

                this.getOwnerComponent().setModel(
                  new sap.ui.model.json.JSONModel(aCombinedData),
                  "creditInfoSet1"
                );
              }.bind(this),
              error: function (error) {},
            });
            this.indusType.open();
          } else {
            MessageBox.error("Please Select Information category first");
          }
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
        handleDeleteCreditSegmentGrid: function (e) {
          var that = this;
          var oModel = this.getView().getModel();
          if (
            e.getSource().getBindingContext("creditSegmentModel").getObject()
              .zcredit_id !== undefined
          ) {
            var creditId = e
              .getSource()
              .getBindingContext("creditSegmentModel")
              .getObject().zcredit_id;
            var custNum = e
              .getSource()
              .getBindingContext("creditSegmentModel")
              .getObject().zcustomer_num;
            var salesOrg = "";
            that.dPath =
              "/ZCDS_CREDIT_MGT(zcustomer_num=guid'" +
              custNum +
              "',zsales_orgnization='" +
              salesOrg +
              "',zcredit_id='" +
              creditId +
              "')";
            that
              .getView()
              .getModel("creditSegmentModel")
              .oData.splice(
                e
                  .getSource()
                  .getBindingContext("creditSegmentModel")
                  .getObject().zcredit_id,
                1
              );
            // that.getView().getModel("salesModel").updateBindings(true);
            e.getSource()
              .getBindingContext("creditSegmentModel")
              .getModel()
              .updateBindings(true);
            oModel.remove(that.dPath, {
              method: "DELETE",
              success: function (data) {},
              error: function (e) {
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox(e);
              },
            });
          } else {
            e
              .getSource()
              .getBindingContext("creditSegmentModel")
              .getObject().Flag = "D";
            e.getSource()
              .getBindingContext("creditSegmentModel")
              .getModel()
              .updateBindings(true);
          }
        },
        //Validation of the date field Valid From
        handleStartDateChange: function (evt) {
          this.ExpStrtDate = evt.getSource();
          // this.getView().byId("fromDate").setValue(this.ExpStrtDate.getValue());
          if (this.ExpEndDate && this.ExpStrtDate.getValue()) {
            if (
              this.ExpStrtDate.getValue() !== "" &&
              this.ExpEndDate.getValue() !== ""
            ) {
              if (this.ExpStrtDate.getValue() > this.ExpEndDate.getValue()) {
                this.ExpStrtDate.setValueState("Error").setValueStateText(
                  "Start Date must be equal to or lesser than end date"
                );
                this.ExpEndDate.setValueState("Error").setValueStateText(
                  "Start Date must be equal to or lesser than end date"
                );
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
          // this.getView().byId("toDate").setValue(this.ExpEndDate.getValue());
          if (
            this.ExpStrtDate.getValue() !== "" &&
            this.ExpEndDate.getValue() !== ""
          ) {
            //if (this.ExpStrtDate.getValue() > this.ExpEndDate.getValue()) {

            if (
              new Date(this.ExpStrtDate.getValue()) >
              new Date(this.ExpEndDate.getValue())
            ) {
              this.ExpStrtDate.setValueState("Error").setValueStateText(
                "Start Date must be equal to or lesser than end date"
              );
              this.ExpEndDate.setValueState("Error").setValueStateText(
                "Start Date must be equal to or lesser than end date"
              );
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
          // this.getView().byId("enteredOn").setValue(this.ExpStrtDate1.getValue());
          if (this.ExpEndDate1) {
            if (
              this.ExpStrtDate1.getValue() !== "" &&
              this.ExpEndDate.getValue() !== ""
            ) {
              if (this.ExpStrtDate1.getValue() > this.ExpEndDate1.getValue()) {
                this.ExpStrtDate1.setValueState("Error").setValueStateText(
                  "Start Date must be equal to or lesser than end date"
                );
                this.ExpEndDate1.setValueState("Error").setValueStateText(
                  "Start Date must be equal to or lesser than end date"
                );
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
          // this.getView().byId("deletedOn").setValue(this.ExpEndDate.getValue());
          if (
            this.ExpStrtDate1.getValue() !== "" &&
            this.ExpEndDate1.getValue() !== ""
          ) {
            //if (this.ExpStrtDate.getValue() > this.ExpEndDate.getValue()) {

            if (
              new Date(this.ExpStrtDate1.getValue()) >
              new Date(this.ExpEndDate1.getValue())
            ) {
              this.ExpStrtDate1.setValueState("Error").setValueStateText(
                "Start Date must be equal to or lesser than end date"
              );
              this.ExpEndDate1.setValueState("Error").setValueStateText(
                "Start Date must be equal to or lesser than end date"
              );
            } else {
              this.ExpStrtDate1.setValueState("None").setValueStateText("");
              this.ExpEndDate1.setValueState("None").setValueStateText("");
            }
          } else {
            this.ExpStrtDate1.setValueState("None").setValueStateText("");
            this.ExpEndDate1.setValueState("None").setValueStateText("");
          }
        },
      }
    );
  }
);
