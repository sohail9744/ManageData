sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "Iffco/clap/formatter/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, formatter) {
        "use strict";

        return Controller.extend("Iffco.clap.sections.Comments.AttachmentsController", {
            formatter: formatter,
            onClickAttachment:function (evt) {
                var serviceURL = this.getOwnerComponent().getModel("DMS").sServiceUrl;
                var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);
                
                var path = serviceURL+"/AttachmentContentSet(DocumentInfoRecordDocType='" + evt.getSource().getBindingContext("attachmentsModel").getObject().DocumentInfoRecordDocType +
                                        "',DocumentInfoRecordDocNumber='" + evt.getSource().getBindingContext("attachmentsModel").getObject().DocumentInfoRecordDocNumber +
                                         "',DocumentInfoRecordDocVersion='" + '00'+
                                          "',DocumentInfoRecordDocPart='" + '000' +
                                           "',LogicalDocument='" + evt.getSource().getBindingContext("attachmentsModel").getObject().LogicalDocument 
                                           + "',ArchiveDocumentID='" + evt.getSource().getBindingContext("attachmentsModel").getObject().ArchiveDocumentID 
                                            + "',LinkedSAPObjectKey='" + evt.getSource().getBindingContext("attachmentsModel").getObject().LinkedSAPObjectKey 
                                            +"',BusinessObjectTypeName='" + evt.getSource().getBindingContext("attachmentsModel").getObject().BusinessObjectTypeName + ")/$value";
                                            path = path.replaceAll("KNA1","KNA1'");
                                            window.open(path);
           

                                        },
              handleDeleteAttachment : function (evt) {
                 this.inputValue = evt.getSource();
                this.objs = evt.getSource().getBindingContext("attachmentsModel").getObject();
               this.DocumentInfoRecordDocType = evt.getSource().getBindingContext("attachmentsModel").getObject().DocumentInfoRecordDocType;
               this.LogicalDocument = evt.getSource().getBindingContext("attachmentsModel").getObject().LogicalDocument;
               this.ArchiveDocumentID = evt.getSource().getBindingContext("attachmentsModel").getObject().ArchiveDocumentID;
               this.LinkedSAPObjectKey = evt.getSource().getBindingContext("attachmentsModel").getObject().LinkedSAPObjectKey;
               this.BusinessObjectTypeName = evt.getSource().getBindingContext("attachmentsModel").getObject().BusinessObjectTypeName;
        
               this.DocumentInfoRecordDocNumber = evt.getSource().getBindingContext("attachmentsModel").getObject().DocumentInfoRecordDocNumber;
                MessageBox.confirm("Are you sure you want to delete this File?", {
                    actions: ["Yes", "No"],
                    emphasizedAction: "Yes",
                    onClose: function (oEvent) {
                        if (oEvent == "Yes"){
                var serviceURL = this.getOwnerComponent().getModel("DMS").sServiceUrl;
                var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);
                var path = "/AttachmentContentSet(DocumentInfoRecordDocType='" + this.DocumentInfoRecordDocType +
                "',DocumentInfoRecordDocNumber='" + this.DocumentInfoRecordDocNumber +
                 "',DocumentInfoRecordDocVersion='" + '00'+
                  "',DocumentInfoRecordDocPart='" + '000' +
                   "',LogicalDocument='" + this.LogicalDocument 
                   + "',ArchiveDocumentID='" + this.ArchiveDocumentID 
                    + "',LinkedSAPObjectKey='" + this.LinkedSAPObjectKey 
                    +"',BusinessObjectTypeName='" + this.BusinessObjectTypeName + ")";
                    path = path.replaceAll("KNA1","KNA1'");
                    this.inputValue.getBindingContext("attachmentsModel").getObject().Flag="D";
                    this.inputValue.getBindingContext("attachmentsModel").getModel().updateBindings(true);
                                            oModel.remove(path, {
                                                // method: "DELETE",
                                                success: function (oData, oResponse) {
                                                    // delete this.objs;
                                                    // for(var i=0;i<this.getView().getModel("attachmentsModel").getData().length;i++){
                                                    //     if(this.getView().getModel("attachmentsModel").getData()[i].FieldName === this.inputValue.getBindingContext("attachmentsModel").getModel().getData()[i].FieldName){
                                                    //         this.getView().getModel("attachmentsModel").getData()(this.inputValue.getBindingContext("attachmentsModel").getModel().getData()[i], 1);
                                                    //         this.inputValue.getBindingContext("attachmentsModel").getModel().updateBindings(true);
                                                    //         MessageBox.success("File has been deleted successfully");
                                                    //     }
                                                    // }
                                    
                                            }.bind(this),
                                            error:function (err) {
                                                
                                            }
                                        })
                                    }
                                }.bind(this),
                                });
                                
                                        
              }
	});

});