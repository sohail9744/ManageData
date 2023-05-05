sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("Iffco.createCustomer.controller.App", {
        onInit() {
          var oViewModel = new sap.ui.model.json.JSONModel({
            zcustNum:"",
            zsalesOrg:"",
            ztext:"",
            selectedType:"Secured credit Limit",
            newCustId:""
          });
          this.getView().setModel(oViewModel, "appView");
        }
      });
    }
  );
  