sap.ui.define([
  "sap/ui/core/mvc/Controller",
  'sap/ui/model/Filter',
  'sap/ui/model/FilterOperator',
  '../../utils/ruleEngine'
], function (
  Controller, Filter, FilterOperator, ruleEngine
) {
  "use strict";

  return Controller.extend("Iffco.clap.sections.CustomerBasicDetails.BusinessDetailsController", {
    /**
     * @override
     */
    onInit: function () {
      // if (!this.ChannelGrp) {
      //   this.ChannelGrp = new sap.ui.xmlfragment(
      //     "Iffco.clap.fragments.ChannelGrp",
      //     this
      //   );
      //   this.getView().addDependent(this.ChannelGrp);
      //   this.ChannelGrp.setModel(this.getOwnerComponent().getModel());
      // }
      // if (!this.subChannel) {
      //   this.subChannel = new sap.ui.xmlfragment(
      //     "Iffco.clap.fragments.SubChannel",
      //     this
      //   );
      //   this.getView().addDependent(this.subChannel);
      //   this.subChannel.setModel(this.getOwnerComponent().getModel());
      // }
      // if (!this.channel) {
      //   this.channel = new sap.ui.xmlfragment(
      //     "Iffco.clap.fragments.Channel",
      //     this
      //   );
      //   this.getView().addDependent(this.channel);
      //   this.channel.setModel(this.getOwnerComponent().getModel());
      // }
      // if (!this.lineOfBusinessType) {
      //   this.lineOfBusinessType = new sap.ui.xmlfragment(
      //     "Iffco.clap.fragments.LneOfBusinessType",
      //     this
      //   );
      //   this.getView().addDependent(this.lineOfBusinessType);
      //   this.lineOfBusinessType.setModel(this.getOwnerComponent().getModel());
      // }
      // if (!this.customerType) {
      //   this.customerType = new sap.ui.xmlfragment(
      //     "Iffco.clap.fragments.CustType",
      //     this
      //   );
      //   this.getView().addDependent(this.customerType);
      //   this.customerType.setModel(this.getOwnerComponent().getModel());
      // }
      // if (!this.customerInternalRating) {
      //   this.customerInternalRating = new sap.ui.xmlfragment(
      //     "Iffco.clap.fragments.CustInterRating",
      //     this
      //   );
      //   this.getView().addDependent(this.customerInternalRating);
      //   this.customerInternalRating.setModel(this.getOwnerComponent().getModel());
      // }

    },
    onAfterRendering: function () {

      if (!this.ChannelGrp) {
        this.ChannelGrp = new sap.ui.xmlfragment(
          "Iffco.clap.fragments.ChannelGrp",
          this
        );
        this.getView().addDependent(this.ChannelGrp);
        this.ChannelGrp.setModel(this.getOwnerComponent().getModel());
      }
      if (!this.subChannel) {
        this.subChannel = new sap.ui.xmlfragment(
          "Iffco.clap.fragments.SubChannel",
          this
        );
        this.getView().addDependent(this.subChannel);
        this.subChannel.setModel(this.getOwnerComponent().getModel());
      }
      if (!this.channel) {
        this.channel = new sap.ui.xmlfragment(
          "Iffco.clap.fragments.Channel",
          this
        );
        this.getView().addDependent(this.channel);
        this.channel.setModel(this.getOwnerComponent().getModel());
      }
      if (!this.lineOfBusinessType) {
        this.lineOfBusinessType = new sap.ui.xmlfragment(
          "Iffco.clap.fragments.LneOfBusinessType",
          this
        );
        this.getView().addDependent(this.lineOfBusinessType);
        this.lineOfBusinessType.setModel(this.getOwnerComponent().getModel());
      }
      if (!this.customerType) {
        this.customerType = new sap.ui.xmlfragment(
          "Iffco.clap.fragments.CustType",
          this
        );
        this.getView().addDependent(this.customerType);
        this.customerType.setModel(this.getOwnerComponent().getModel());
      }
      if (!this.customerInternalRating) {
        this.customerInternalRating = new sap.ui.xmlfragment(
          "Iffco.clap.fragments.CustInterRating",
          this
        );
        this.getView().addDependent(this.customerInternalRating);
        this.customerInternalRating.setModel(this.getOwnerComponent().getModel());
      }
      this.onSelectChange();

    },
    onSelectChange: function (evt) {
      //this.getView().getModel("appView").setProperty("/bpg", evt.getSource().getSelectedItem().mProperties.text);
      let busGpID = this.getView().getModel("Customers").getData().zbusiness_partner_grouping;
      if (busGpID === 'Ship To') {
        this.getView().getModel("MasterData").getData().BPRoles[0].visiblity = false;
        this.getView().getModel("MasterData").getData().BPRoles[1].visiblity = true;
        this.getView().getModel("MasterData").getData().BPRoles[2].visiblity = false;
      } else {
        this.getView().getModel("MasterData").getData().BPRoles[0].visiblity = true;
        this.getView().getModel("MasterData").getData().BPRoles[1].visiblity = true;
        this.getView().getModel("MasterData").getData().BPRoles[2].visiblity = true;
      }
      this.getView().getModel("MasterData").updateBindings(true);
      //this.handleRuleEngineConfiguration();
    },
    handleRuleEngineConfiguration: async function (oEvent) {
      this.getView().setBusy(true);
      var process = this.getView().getModel("appView").getProperty("/process");
      var sCustomerType = this.getView().getModel("appView").getProperty("/vertical") === 'Cash' ? 'CASH' : 'CREDIT'
      var sBPGrouping = this.getView().getModel("Customers").getData().zbusiness_partner_grouping;

      const configObject = {
        oModel: this.getView().getModel("RuleEngine"),
        process: process.toLocaleUpperCase(),
        aCustomerType: sCustomerType.toLocaleUpperCase(),
        sBPGrouping: sBPGrouping.toLocaleUpperCase()
      }
      let fieldMappingModelsData = await ruleEngine(configObject);
      this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(fieldMappingModelsData), "fieldMappingModels");
      this.getView().getModel("fieldMappingModels").updateBindings(true);
      this.getOwnerComponent().getModel().refresh(true);
      this.getView().setBusy(false);
    },

    // Customer type value help
    handleValueHelpForCustomerType: function (evt) {
      this.customerTypeField = evt.getSource();
      this.customerType.open();
    },
    handleValueHelpCustTypeClose: function () {
      this.customerType._dialog.close();
    },
    handleValueHelpCustTypeConfirm: function (evt) {
      this.customerTypeVal = evt
        .getParameter("selectedItems")[0]
        .getProperty("title");
      var desc = evt
        .getParameter("selectedItems")[0]
        .getProperty("description");
      this.customerTypeField.setValue(this.customerTypeVal);
    },
    handleValueHelpCustTypeSearch: function (evt) {
      var sValue = evt.getParameter("value");
      if (sValue.length > 0) {
        var oFilter1 = new sap.ui.model.Filter("customertype", "Contains", sValue);
        this.customerType.getBinding("items").filter([oFilter1]);
      } else {
        this.customerType.getBinding("items").filter([]);
      }
    },

    // Customer internal rating
    handleValueHelpForCustomerInternalRating: function (evt) {
      this.customerInternalRatingField = evt.getSource();

      this.customerInternalRating.open();
    },
    handleValueHelpCustInterRatingClose: function () {
      this.customerInternalRating._dialog.close();
    },
    handleValueHelpCustInterRatingConfirm: function (evt) {
      this.customerInternalRatingVal = evt
        .getParameter("selectedItems")[0]
        .getProperty("title");
      var desc = evt
        .getParameter("selectedItems")[0]
        .getProperty("description");
      this.customerInternalRatingField.setValue(this.customerInternalRatingVal);
    },
    handleValueHelpCustInterRatingSearch: function (evt) {
      var sValue = evt.getParameter("value");
      if (sValue.length > 0) {
        var oFilter1 = new sap.ui.model.Filter("class", "Contains", sValue);
        this.customerInternalRating.getBinding("items").filter([oFilter1]);
      } else {
        this.customerInternalRating.getBinding("items").filter([]);
      }
    },


    handleValueHelpForChannelGrp: function (evt) {
      this.ChannelGrpField = evt.getSource();
      this.ChannelGrp.getBinding("items").filter([]);
      this.ChannelGrp.open();
    },
    handleValueHelpChannelGrpClose: function () {
      this.ChannelGrp._dialog.close();
    },
    handleValueHelpChannelGrpConfirm: function (evt) {
      this.chnlGrpVal = evt
        .getParameter("selectedItems")[0]
        .getProperty("title");
      var desc = evt
        .getParameter("selectedItems")[0]
        .getProperty("description");
      this.ChannelGrpField.setValue(this.chnlGrpVal);
    },
    handleValueHelpChannelGrpSearch: function (evt) {
      var sValue = evt.getParameter("value");
      if (sValue.length > 0) {
        var oFilter1 = new sap.ui.model.Filter("channelgroup", "Contains", sValue);
        this.ChannelGrp.getBinding("items").filter([oFilter1]);
      } else {
        this.ChannelGrp.getBinding("items").filter([]);
      }
    },

    handleValueHelpForChannel: function (evt) {
      this.channelField = evt.getSource();
      var val = this.getView().byId("channelGrpId").getValue();
      if (val) {
        this.channel
          .getBinding("items")
          .filter([new sap.ui.model.Filter("channelgroup", "Contains", val)]);
        this.channel.open();
      } else {
        sap.m.MessageBox.error("Please select the Channel Group");
      }
    },
    handleValueHelpChannelClose: function () {
      this.channel._dialog.close();
    },
    handleValueHelpChannelConfirm: function (evt) {
      this.chnlValue = evt
        .getParameter("selectedItems")[0]
        .getProperty("title");
      var desc = evt
        .getParameter("selectedItems")[0]
        .getProperty("description");
      this.channelField.setValue(this.chnlValue + " " + desc);
    },
    handleValueHelpChannelSearch: function (evt) {
      var sValue = evt.getParameter("value");
      if (sValue.length > 0) {
        var oFilter1 = new sap.ui.model.Filter("channel", "Contains", sValue);
        this.channel.getBinding("items").filter([oFilter1]);
      } else {
        this.channel.getBinding("items").filter([]);
      }
    },

    handleValueHelpForSubChannel: function (evt) {
      this.subChannelField = evt.getSource();
      var val = this.getView().byId("channelGrpId").getValue();
      var val1 = this.getView().byId("channelId").getValue();
      if (val1) {
        this.subChannel.getBinding("items").filter([new sap.ui.model.Filter("channel", "EQ", val1)]);
        this.subChannel.open();
      } else if (!val && val1) {
        sap.m.MessageBox.error("Please select the Channel Group");
      } else if (!val1 && val) {
        sap.m.MessageBox.error("Please select the Channel");
      } else {
        sap.m.MessageBox.error("Please select the Channel Group and Channel");
      }
    },
    handleValueHelpSubChannelClose: function () {
      this.subChannel._dialog.close();
    },
    handleValueHelpSubChannelConfirm: function (evt) {
      this.subChnlValue = evt
        .getParameter("selectedItems")[0]
        .getProperty("title");
      var desc = evt
        .getParameter("selectedItems")[0]
        .getProperty("description");
      this.subChannelField.setValue(this.subChnlValue + " " + desc);
    },
    handleValueHelpSubChannelSearch: function (evt) {
      var sValue = evt.getParameter("value");
      if (sValue.length > 0) {
        var oFilter1 = new sap.ui.model.Filter("subchannel", "Contains", sValue);
        this.subChannel.getBinding("items").filter([oFilter1]);
      } else {
        this.subChannel.getBinding("items").filter([]);
      }
    },
    handleValueHelpForlineOfBusinessType: function (evt) {
      this.lineOfBusinessTypeField = evt.getSource();
      var val = this.getView().byId("channelGrpId").getValue();
      var val1 = this.getView().byId("channelId").getValue();
      var val2 = this.getView().byId("subChannelId").getValue();
      if (val2) {
        this.lineOfBusinessType.getBinding("items").filter([new sap.ui.model.Filter("subchannel", "EQ", val2)]);
        this.lineOfBusinessType.open();
      } else if (!val && val1 && val2) {
        sap.m.MessageBox.error("Please select the Channel Group");
      } else if (!val1 && val && val2) {
        sap.m.MessageBox.error("Please select the Channel");
      } else if (!val2 && val1 && val) {
        sap.m.MessageBox.error("Please select the Sub Channel");
      } else {
        sap.m.MessageBox.error(
          "Please select the Channel Group, Channel and Sub Channel"
        );
      }
    },
    handleValueHelpLineOfBusinessTypeClose: function () {
      this.lineOfBusinessType._dialog.close();
    },
    handleValueHelpLineOfBusinessTypeConfirm: function (evt) {
      var title = evt.getParameter("selectedItems")[0].getProperty("title");
      var desc = evt
        .getParameter("selectedItems")[0]
        .getProperty("description");
      this.lineOfBusinessTypeField.setValue(title + " " + desc);
    },
    handleValueHelplobSearch: function (evt) {
      var sValue = evt.getParameter("value");
      if (sValue.length > 0) {
        var oFilter1 = new sap.ui.model.Filter("lineofbusinesstype", "Contains", sValue);
        this.lineOfBusinessType.getBinding("items").filter([oFilter1]);
      } else {
        this.lineOfBusinessType.getBinding("items").filter([]);
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
    onSearch: function () {
      var oModel = this.getView().getModel();
      var oTable = this.ChannelGrp;
      var oFilter = this.ChannelGrp.getContent()[0];
      var aFilters = [];
      for (var i = 0; i < oFilter.getAllFilterItems().length; i++) {
        var sName = oFilter.getAllFilterItems()[i].getProperty("name");
        var sPath = "";
        var dPath = "";
        var sValue = "";
        var sKeys = [];
        if (sName === "Channel Group") {
          sPath = "channelgroup";
          sValue = oFilter.getAllFilterItems()[i].getControl().getValue();
        } else if (sName === "Channel") {
          sPath = "channel";
          sValue = oFilter.getAllFilterItems()[i].getControl().getValue();

        } else if (sName === "Sub Channel") {
          sPath = "subchannel";
          sValue = oFilter.getAllFilterItems()[i].getControl().getValue();
        }
        else if (sName === "Line of business type") {
          sPath = "lineofbusinesstype";
          sValue = oFilter.getAllFilterItems()[i].getControl().getValue();
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
      // this.ex.getContent()[1].getBinding("items").filter(aFilters);
      // this.ex.getContent()[1].getBinding("items").filter(aFilters)
    },
    handleRequestnavigation: function (evt) {
      var that = this;
      var channelGrp = evt.getSource().getBindingContext().getProperty("channelgroup");
      var channel = evt.getSource().getBindingContext().getProperty("channel");
      var subChannel = evt.getSource().getBindingContext().getProperty("subchannel");
      var lob = evt.getSource().getBindingContext().getProperty("lineofbusinesstype");

      this.getView().byId("channelGrpId").setValue(channelGrp);
      this.getView().byId("channelId").setValue(channel);
      this.getView().byId("subChannelId").setValue(subChannel);
      this.getView().byId("lobtId").setValue(lob);
      this.ChannelGrp.close();

    },
    handleCancel: function () {
      this.ChannelGrp.close();
    }
  });
});