sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("Iffco.clap.controller.App", {
        onInit() {
          var oViewModel = new sap.ui.model.json.JSONModel({
            zcustNum:"",
            zsalesOrg:"",
            ztext:"",
            selectedType: 'Secured Credit Limit',
            newCustId:"",
            custType:"Credit",
            customerType: 0,
            mode:"",
            selectedMode:false,
            distributionChannel:"",
            cca:"",
            bpg:"SOLD TO",
            process:"",
            salesFlag:false,
            addSales: false,
            blockedCmValue:"",
            content:"",
            token:"",
            firstTym:"",
            vertical:"Credit",
            generateSale:false,
            TypeOfEntity1: "",
            TypeOfEntity2: "",
            TypeOfEntity3: "",
            TypeOfEntity4: "",
            TypeOfEntity5: "",
            TypeOfEntity6: "",
            TypeOfEntity7: "",
            TypeOfEntity8: "",
            TypeOfEntity9: "",
            dmsFile:[{}],
            clapFields: false,
            status: true,
            blockCustomer: false
          });
          this.getView().setModel(oViewModel, "appView");
          this.getView().getModel("appView").updateBindings(true);
        }
      });
    }
  );
  