sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "Iffco/createCustomer/formatter/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, formatter) {
        "use strict";

        return Controller.extend("Iffco.createCustomer.controller.view2", {
            formatter: formatter,
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("CustomerDetail").attachMatched(this._onRouteMatched, this);

                // this.getView().setModel(new sap.ui.model.json.JSONModel([]), "salesModel")
                this.flagForFirstTime = true;
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel([]), "commentsModel");
                if (!this.Country) {
                    this.Country = new sap.ui.xmlfragment("Iffco.createCustomer.fragments.Country", this);
                    this.getView().addDependent(this.Country);
                    this.Country.setModel(this.getOwnerComponent().getModel());
                }
                if (!this.salesData) {
                    this.salesData = new sap.ui.xmlfragment("Iffco.createCustomer.fragments.SalesFields",
                        this);
                    this.getView().addDependent(this.salesData);
                }
                // if (!this.salesOrg) {
                //     this.salesOrg = new sap.ui.xmlfragment("Iffco.clap.fragments.Channel", this);
                //     this.getView().addDependent(this.salesOrg);
                // }
                // handleValueHelpForSalesOrg
                // if (!this.ChannelGrp) {
                //     this.ChannelGrp = new sap.ui.xmlfragment("Iffco.clap.fragments.ChannelGrp", this);
                //     this.getView().addDependent(this.ChannelGrp);
                // }
                // if (!this.CreditLimitCurr) {
                //     this.CreditLimitCurr = new sap.ui.xmlfragment("Iffco.clap.fragments.CreditLimitCurr", this);
                //     this.getView().addDependent(this.CreditLimitCurr);
                // }
                // if (!this.CustInterRating) {
                //     this.CustInterRating = new sap.ui.xmlfragment("Iffco.clap.fragments.CustInterRating", this);
                //     this.getView().addDependent(this.CustInterRating);
                // }
                // if (!this.CustType) {
                //     this.CustType = new sap.ui.xmlfragment("Iffco.clap.fragments.CustType", this);
                //     this.getView().addDependent(this.CustType);
                // }
                if (!this.Incoterms) {
                    this.Incoterms = new sap.ui.xmlfragment("Iffco.createCustomer.fragments.Incoterms", this);
                    this.getView().addDependent(this.Incoterms);
                }
                // if (!this.LicenceType) {
                //     this.LicenceType = new sap.ui.xmlfragment("Iffco.clap.fragments.LicenceType", this);
                //     this.getView().addDependent(this.LicenceType);
                // }
                // if (!this.LneOfBusinessType) {
                //     this.LneOfBusinessType = new sap.ui.xmlfragment("Iffco.clap.fragments.LneOfBusinessType", this);
                //     this.getView().addDependent(this.LneOfBusinessType);
                // }
                // if (!this.SourceOfEnquiry) {
                //     this.SourceOfEnquiry = new sap.ui.xmlfragment("Iffco.clap.fragments.SourceOfEnquiry", this);
                //     this.getView().addDependent(this.SourceOfEnquiry);
                // }
                // if (!this.State) {
                //     this.State = new sap.ui.xmlfragment("Iffco.clap.fragments.State", this);
                //     this.getView().addDependent(this.State);
                // }
                // if (!this.SubChannel) {
                //     this.SubChannel = new sap.ui.xmlfragment("Iffco.clap.fragments.SubChannel", this);
                //     this.getView().addDependent(this.SubChannel);
                // }
                // if (!this.TrsptnZone) {
                //     this.TrsptnZone = new sap.ui.xmlfragment("Iffco.clap.fragments.TrsptnZone", this);
                //     this.getView().addDependent(this.TrsptnZone);
                // }
                // if (!this.TypeOfEntity) {
                //     this.TypeOfEntity = new sap.ui.xmlfragment("Iffco.clap.fragments.TypeOfEntity", this);
                //     this.getView().addDependent(this.TypeOfEntity);
                // }

            },
            _onRouteMatched: function (oEvent) {
                this.getOwnerComponent().getModel("commentsModel").oData = []
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel([]), "salesModel");
                this.getView().setModel(new sap.ui.model.json.JSONModel({}), "salesInfoModel");
                this.getOwnerComponent().getModel("salesModel").oData = [];
                // this.getView().setModel(new sap.ui.model.json.JSONModel({}), "commentsInfoModel");
                this.mode = oEvent.getParameters().arguments.mode;
                if (this.mode == "edit") {
                    this.zcustomer_num = oEvent.getParameters().arguments.zcustomer_num;
                    //  this.getView().getModel("appView").setProperty("/zcustNum", oEvent.getParameters().arguments.zcustomer_num);
                    //  this.getView().getModel("appView").setProperty("/zsalesOrg", oEvent.getParameters().arguments.zsales_orgnization);
                    this.zsales_orgnization = oEvent.getParameters().arguments.zsales_orgnization;
                    var oModel = this.getView().getModel();
                    this.sPath = "/ZDD_CUSTOMER(zcustomer_num=guid'" + this.zcustomer_num + "',zsales_orgnization='" + this.zsales_orgnization + "')"

                    oModel.read(this.sPath, {
                        urlParameters: {
                            "$expand": "to_salesarea,to_comments"
                        },
                        success: function (oData, oResponse) {
                            console.log(oData);
                            var oCustomerDetailModel = this.getView().getModel("Customers");
                            delete oData.__metadata;
                            delete oData.to_zdd_comments;


                            var salesItem = this.getOwnerComponent().getModel("salesModel").getData();
                            var listItem = this.getOwnerComponent().getModel("commentsModel").getData();

                            for (var i = 0; i < oData.to_comments.results.length; i++) {
                                listItem.push({
                                    "zcomment": oData.to_comments.results[i].zcomment,
                                    "zcustomer_num": oData.to_comments.results[i].zcustomer_num,
                                    "flag": "u"
                                    // "createdat" : oData.to_zdd_comments.results[i].createdat,
                                    // "createdby" : oData.to_zdd_comments.results[i].createdby,

                                });
                            }
                            for (var i = 0; i < oData.to_salesarea.results.length; i++) {
                                salesItem.push({
                                    "zsales_area_id": oData.to_salesarea.results[i].zsales_area_id,
                                    "zcustomer_num": oData.to_salesarea.results[i].zcustomer_num,
                                    "flag": "u",
                                    "zdistribution_channel": oData.to_salesarea.results[i].zdistribution_channel,
                                    "zdistribution_channel_text": oData.to_salesarea.results[i].zdistribution_channel_text,
                                    "zdivision": oData.to_salesarea.results[i].zdivision,
                                    "zdivision_text": oData.to_salesarea.results[i].zdivision_text,
                                    "zsales_orgnization": oData.to_salesarea.results[i].zsales_orgnization,
                                    "zsales_orgnization_text": oData.to_salesarea.results[i].zsales_orgnization_text

                                });
                            }

                            this.getOwnerComponent().getModel("commentsModel").updateBindings(true);

                            oCustomerDetailModel.setData(oData);
                            oCustomerDetailModel.refresh();
                            this.getOwnerComponent().getModel("salesModel").updateBindings(true);

                        }.bind(this),
                        error: function (oError) {

                        }

                    });
                }
                if (this.flagForFirstTime)
                    window.setTimeout(function () {
                        this.handleRuleEngineConfiguration();
                    }.bind(this), 2000)
                else
                    this.handleRuleEngineConfiguration();
            },

            handleRuleEngineConfiguration: function (oEvent) {
                var process = "CREATE";
                var sCustomerType = this.getView().byId("orderdata").getParent().getSubSections()[0].getBlocks()[0].getAggregation("_views")[0].getContent()[0].getContent()[5].getSelectedButton().getText();
                var sBPGrouping = this.getView().byId("orderdata").getParent().getSubSections()[1].getBlocks()[0].getAggregation("_views")[0].getContent()[0].getContent()[1].getSelectedItem().getText();
                this.ruleId = "";
                if (process !== "" && sCustomerType !== "" && sBPGrouping !== "") {
                    var oModel = this.getView().getModel("RuleEngine");
                    oModel.read("/Zdd_rule_engine", {
                        urlParameters: {
                            "$top": 10000
                        },
                        success: function (oData, oResponse) {
                            for (var i = 0; i < oData.results.length; i++) {
                                if (oData.results[i].customer_type === sCustomerType.toUpperCase() && oData.results[i].zbusiness_partner_id === sBPGrouping.toUpperCase()) {
                                    this.ruleId = oData.results[i].rule_id;
                                }
                            }

                            if (this.ruleId == "" || this.ruleId == undefined) {
                                MessageBox.confirm("Rule engine Configuration does not exist for the selected keys?", {
                                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                                    emphasizedAction: MessageBox.Action.OK,
                                    onClose: function (sAction) {
                                        if (sAction === "CANCEL") {
                                            oFilterBar.getFilterItems()[1].getControl().setSelectedItem(null);
                                        }
                                        else {
                                            this.onCreate(process, sCustomerType, sBPGrouping);
                                        }
                                    }.bind(this)
                                });
                            } else {
                                this.onRead(this.ruleId);
                            }
                        }.bind(this),
                        error: function (oError) { }
                    });
                }
            },
            onRead: function (ruleid) {
                var oModel = this.getView().getModel("RuleEngine");
                this.getView().setBusy(true);
                oModel.read("/ZDD_RULE_UPDATE_FIELDS", {
                    filters: [new sap.ui.model.Filter("rule_id", "EQ", ruleid)],
                    urlParameters: {
                        "$top": 10000
                    },

                    success: function (oData, oResponse) {
                        this.getView().setBusy(false);
                        console.log(oData.results);
                        this.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "fieldMappingModel");

                    }.bind(this),
                    error: function (oError) {
                        this.getView().setBusy(false);
                    }.bind(this)
                });
            },
            onDescriptionSelect: function (oEvent) {
                var oCustomerDetailModel = this.getView().getModel("Customers");
                oCustomerDetailModel.setProperty("/zdescription", oEvent.getParameters().selectedIndex);
            },
            saveRequest: function () {
                var that = this;
                // var state = this.handleValidateFormFields();
                // if (state == true) {
                var oModel = this.getView().getModel();
                var oCustomerDetailModel = this.getView().getModel("Customers");
                delete oCustomerDetailModel.getData().to_zdd_sale;
                delete oCustomerDetailModel.getData().to_zdd_comments;
                var oEntry = oCustomerDetailModel.getData();


                oEntry.zcredit_limit_type = this.getView().getModel("appView").getProperty("/selectedType");


                // oEntry.zrequest_no = req_no;

                // delete oEntry.BPRoles;
                // delete oEntry.requests;
                // delete oEntry.EntryCollection;


                if (this.mode == "edit") {
                    delete oEntry.zindividual_paymen;
                    delete oEntry.ztelephone_country_number_exte;
                    delete oEntry.zfax_country_number_extension;
                    delete oEntry.zhouse_number;
                    delete oEntry.zindividual_paymen;
                    delete oEntry.zamount_insured;
                    delete oEntry.to_comments;
                    delete oEntry.to_salesarea;

                    oEntry.zdate_founded = null;
                    oEntry.zliquidationdate = null;
                    delete oEntry.BusinessPartnerDD;
                    // delete oEntry.BPRoles;
                    // delete oEntry.requests;
                    // delete oEntry.EntryCollection;
                    oModel.update(this.sPath, oEntry, {
                        success: function (oData, oResponse) {
                            this.handleSalesData();
                        }.bind(this),
                        error: function (err) {

                        }
                    });

                } else {
                    var req_no = Math.floor(1000 + Math.random() * 9000) + "";
                    oEntry.zrequest_no = req_no;
                    oEntry.zsales_orgnization = "20";
                    oEntry.zrequest_type = "Create Customer";
                    oEntry.zrequest_status = "In Draft";
                    delete oEntry.zindividual_paymen;
                    delete oEntry.ztelephone_country_number_exte;
                    delete oEntry.zfax_country_number_extension;
                    delete oEntry.zhouse_number;
                    delete oEntry.zindividual_paymen;
                    delete oEntry.zamount_insured;
                    delete oEntry.to_comments;
                    delete oEntry.to_salesarea;
                    // oEntry.zdate_founded=null;
                    // oEntry.zliquidationdate=null;
                    // oEntry.zdate=null;
                    // oEntry.zvalidity_to=null;
                    // oEntry.zvalid_from=null;
                    // oEntry.zvalid_to=null;
                    // oEntry.zentry_date=null;
                    // oEntry.zduedate=null;
                    // oEntry.zcreated_date=null;
                    // oEntry.zupdated_date=null;
                    // oEntry.zfinalizedon=null;
                    // oEntry.zlast_key_date=null;
                    oEntry.zdate_founded = oEntry.zdate_founded != "" ? this.dateFormatter(oEntry.zdate_founded) : null;
                    oEntry.zliquidationdate = oEntry.zliquidationdate != "" ? this.dateFormatter(oEntry.zliquidationdate) : null;
                    oEntry.zdate = oEntry.zdate != "" ? this.dateFormatter(oEntry.zdate) : null;
                    oEntry.zvalidity_to = oEntry.zvalidity_to != "" ? this.dateFormatter(oEntry.zvalidity_to) : null;
                    oEntry.zvalid_from = oEntry.zvalid_from != "" ? this.dateFormatter(oEntry.zvalid_from) : null;
                    oEntry.zvalid_to = oEntry.zvalid_to != "" ? this.dateFormatter(oEntry.zvalid_to) : null;
                    oEntry.zentry_date = oEntry.zentry_date != "" ? this.dateFormatter(oEntry.zentry_date) : null;
                    oEntry.zduedate = oEntry.zduedate != "" ? this.dateFormatter(oEntry.zduedate) : null;
                    oEntry.zcreated_date = oEntry.zcreated_date != "" ? this.dateFormatter(oEntry.zcreated_date) : null;
                    oEntry.zupdated_date = oEntry.zupdated_date != "" ? this.dateFormatter(oEntry.zupdated_date) : null;
                    oEntry.zfinalizedon = oEntry.zfinalizedon != "" ? this.dateFormatter(oEntry.zfinalizedon) : null;
                    oEntry.zlast_key_date = oEntry.zlast_key_date != "" ? this.dateFormatter(oEntry.zlast_key_date) : null;

                    delete oEntry.BusinessPartnerDD;
                    delete oEntry.BPRoles;
                    delete oEntry.requests;
                    delete oEntry.EntryCollection;
                    oModel.create("/ZDD_CUSTOMER", oEntry, {

                        success: function (oData, oResponse) {
                            this.custNum = oData.zcustomer_num;
                            this.getView().getModel("appView").setProperty("/newCustId", oData.zcustomer_num);
                            this.handleSalesData();

                        }.bind(this),
                        error: function (oError) {

                        }
                    });
                }
            },
            submitRequest: function () {
                var that = this;
                // var state = this.handleValidateFormFields();
                // if (state == true) {
                var oModel = this.getView().getModel();
                var oCustomerDetailModel = this.getView().getModel("Customers");
                delete oCustomerDetailModel.getData().to_zdd_sale;
                delete oCustomerDetailModel.getData().to_zdd_comments;
                var oEntry = oCustomerDetailModel.getData();


                oEntry.zcredit_limit_type = this.getView().getModel("appView").getProperty("/selectedType");


                if (this.mode == "edit") {
                    delete oEntry.zindividual_paymen;
                    delete oEntry.ztelephone_country_number_exte;
                    delete oEntry.zfax_country_number_extension;
                    delete oEntry.zhouse_number;
                    delete oEntry.zindividual_paymen;
                    delete oEntry.zamount_insured;
                    delete oEntry.to_comments;
                    delete oEntry.to_salesarea;

                    oEntry.zdate_founded = null;
                    oEntry.zliquidationdate = null;
                    delete oEntry.BusinessPartnerDD;

                    oModel.update(this.sPath, oEntry, {
                        success: function (oData, oResponse) {
                            this.handleSalesData();
                        }.bind(this),
                        error: function (err) {

                        }
                    });

                } else {
                    var req_no = Math.floor(1000 + Math.random() * 9000) + "";
                    oEntry.zrequest_no = req_no;
                    oEntry.zsales_orgnization = "20";
                    oEntry.zrequest_type = "Create Customer";
                    oEntry.zrequest_status = "In Draft";
                    delete oEntry.zindividual_paymen;
                    delete oEntry.ztelephone_country_number_exte;
                    delete oEntry.zfax_country_number_extension;
                    delete oEntry.zhouse_number;
                    delete oEntry.zindividual_paymen;
                    delete oEntry.zamount_insured;
                    delete oEntry.to_comments;
                    delete oEntry.to_salesarea;

                    oEntry.zdate_founded = null;
                    oEntry.zliquidationdate = null;
                    oEntry.zdate = null;
                    oEntry.zvalidity_to = null;
                    oEntry.zvalid_from = null;
                    oEntry.zvalid_to = null;
                    oEntry.zentry_date = null;
                    oEntry.zduedate = null;
                    oEntry.zcreated_date = null;
                    oEntry.zupdated_date = null;
                    oEntry.zfinalizedon = null;
                    oEntry.zlast_key_date = null;

                    delete oEntry.BusinessPartnerDD;
                    delete oEntry.BPRoles;
                    delete oEntry.requests;
                    delete oEntry.EntryCollection;
                    oModel.create("/ZDD_CUSTOMER", oEntry, {

                        success: function (oData, oResponse) {
                            this.custNum = oData.zcustomer_num;
                            this.getView().getModel("appView").setProperty("/newCustId", oData.zcustomer_num);
                            var context = JSON.stringify({
                                //"definitionId": "claimapprovals_prd",
                                "definitionId": "iffco.customercreate",
                                "context": {
                                    "claims": {
                                        "zcustomer_num": this.custNum,
                                    }
                                }
                            });
                            var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
                            var appPath = appId.replaceAll(".", "/");
                            var appModulePath = jQuery.sap.getModulePath(appPath);

                            $.ajax({
                                // type: "GET",
                                //url: appModulePath + "/bpmworkflowruntime/v1/xsrf-token",
                                url: "/cc952151-d163-4a33-a204-db4622b1eb71.Iffco-clap.Iffcoclap-0.0.1/bpmworkflowruntime/v1/xsrf-token",
                                method: "GET",
                                headers: {
                                    "X-CSRF-Token": "Fetch",
                                },
                                success: function (data, statusText, xhr) {
                                    var token = xhr.getResponseHeader("X-CSRF-Token");
                                    $.ajax({
                                        type: "POST",
                                        //url: appModulePath + "/bpmworkflowruntime/rest/v1/workflow-instances",
                                        url: "/cc952151-d163-4a33-a204-db4622b1eb71.Iffco-clap.Iffcoclap-0.0.1/bpmworkflowruntime/v1/workflow-instances",
                                        data: context,
                                        headers: {
                                            "X-CSRF-Token": token
                                        },
                                        success: function (oResponse) {
                                           sap.m.MessageToast.show("Customer is submitted Successfully");
                                        },error:function(err){

                                        }
                                    });
                                }, error: function (err) {

                                }
                            });
                            this.handleSalesData();

                        }.bind(this),
                        error: function (oError) {

                        }
                    });
                }
            },

            dateFormatter: function (value) {
                if (value) {
                    var sNotifDate = new Date(value.toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
                    return sNotifDate;
                } else return "";
            },
            handleSalesData: function (evt) {
                var that = this;
                var serviceURL = this.getOwnerComponent().getModel().sServiceUrl;
                var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);

                this.salesPath = "/ZDD_CUST_SALESAREAS";

                var salesEntry = this.getView().getModel("salesModel").getData();
                var batchSalesChanges = [];
                salesEntry.forEach(function (obj, index) {
                    if (obj.flag == undefined) {
                        obj.zcustomer_num = this.custNum == undefined ? this.zcustomer_num : this.custNum;
                        // obj.zsales_area_id = index;
                    }
                }.bind(this));
                // for(var i=0;i<salesEntry.length;i++){

                // }
                salesEntry.forEach(function (obj, index) {
                    // obj.zsales_area_id = index.toString();
                    // obj.zcustomer_num == undefined ? that.zcustomer_num : that.zcustomer_num;
                    if (obj.flag == undefined) {
                        obj.zsales_area_id = index.toString();
                        delete obj.flag;
                        batchSalesChanges.push(oModel.createBatchOperation("/ZDD_CUST_SALESAREAS", "POST", obj));
                    }
                });

                oModel.addBatchChangeOperations(batchSalesChanges);
                oModel.submitBatch(function (data) {

                }, function (err) {
                    sap.m.MessageBox.error("Internal Server Error");
                    // that.getView().setBusy(false);
                });
                this.handleCommentsData();


            },

            handleCommentsData: function (evt) {
                // var oModel = this.getView().getModel();      
                // this.getView().getModel("appView").setProperty("/ztext", evt.getParameters().value);
                var that = this;
                var listItem = this.getOwnerComponent().getModel("commentsModel").getData();
                var serviceURL = this.getOwnerComponent().getModel().sServiceUrl;
                var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);


                var batchChanges = [];
                listItem.forEach(function (obj, index) {
                    if (obj.flag == undefined) {
                        obj.zcustomer_num = obj.zcustomer_num = this.custNum == undefined ? this.zcustomer_num : this.custNum;
                    }

                }.bind(this));
                listItem.forEach(function (obj, index) {
                    obj.zcomment_id = index.toString();
                    // obj.zcustomer_num == undefined ? that.zcustomer_num : that.zcustomer_num;
                    if (obj.flag == undefined) {
                        delete obj.flag;
                        batchChanges.push(oModel.createBatchOperation("/ZDD_CUST_COMMENTS", "POST", obj));
                    }
                });
                oModel.addBatchChangeOperations(batchChanges);
                // sap.m.MessageBox.confirm("Customer Id submitted " + this.custNum + " Successfully");
                oModel.submitBatch(function (data) {

                }, function (err) {
                    sap.m.MessageBox.error("Internal Server Error");
                    // that.getView().setBusy(false);
                });

            },
            handleDeleteSalesGrid: function (e) {
                var that = this;
                var oModel = this.getView().getModel();
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
                        sap.m.MessageBox("err");
                    }
                });
            },
            handleValueHelpForCountry: function (evt) {
                this.countryField = evt.getSource();
                this.Country.getBinding("items").filter([]);
                this.Country.open();
            },
            handleValueHelpCountrClose:function (params) {
                this.Country._dialog.close();
            },
            handleValueHelpCountryConfirm:function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
			var desc = evt.getParameter("selectedItems")[0].getProperty("description");
			this.countryField .setValue(title + " - " + desc);
            },
            handleValueHelpForIncoterms:function(evt){
                this.IncotermsField = evt.getSource();
                this.Incoterms.getBinding("items").filter([]);
                this.Incoterms.open();
            },
            handleValueHelpIncotermsClose:function (params) {
                this.Incoterms._dialog.close();
            },
            handleValueHelpIncotermsConfirm:function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
			var desc = evt.getParameter("selectedItems")[0].getProperty("description");
			this.IncotermsField .setValue(title + " - " + desc);
            },
            handleValueHelpForSalesOrg:function(evt){
                // this.IncotermsField = evt.getSource();
                // this.Incoterms.getBinding("items").filter([]);
                // this.Incoterms.open();
            },
            onBack: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView1");
            },
            handleLiveChange: function (value) {
                if (value) {
                    var sNotifDate = new Date(value.toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
                    return sNotifDate;
                } else return "";
            },
            // handleCreditLimitTypeSelect:function(evt){
            //         var selectedType = evt;
            // },
            handleCreditLimitTypeSelect: function (evt) {
                // console.log("hi");
                var that = this;
                this.getView().getModel("appView").setProperty("/selectedType", evt.getSource().getSelectedButton().getText());
                this.getView().getModel("appView").updateBindings();
                // that.selectedType = evt.getSource().getSelectedButton().getText();
                this.toggleSubsection();
            },
            toggleSubsection: function (evt) {
                console.log(evt);
            },
            handleAddSales: function (evt) {
                this.salesData.open();
            },
            handleCancelOutputTax: function (evt) {
                this.salesData.close();
            },
            handleAddSalesGrid: function (evt) {
                // var that = this;

                var salesOrg = this.salesData.getContent()[0].getContent()[1].getValue();
                var distribution = this.salesData.getContent()[0].getContent()[3].getValue();
                var division = this.salesData.getContent()[0].getContent()[5].getValue();
                // var taxClsSplit = taxCls.split(" - ")[0];
                // this.handleUpdateTaxgridOrder();
                var arr = {
                    // "zcustomer_num":this.custNum,
                    "zsales_orgnization": salesOrg,
                    "zsales_area_id": this.opOrder,
                    "zsales_orgnization_text": "abc",
                    "zdivision": division,
                    "zdivision_text": "abcd",
                    "zdistribution_channel": distribution,
                    "zdistribution_channel_text": "abcde"
                };


                this.getView().getModel("salesModel").oData.push(arr);
                this.getView().getModel("salesModel").updateBindings(true);

                this.handleCancelOutputTax();
            },
            handleUpdateTaxgridOrder: function (evt) {
                var model = this.getView().getModel("salesModel").oData;
                if (model.length > 0) {
                    for (var i = model.length - 1; i >= 0; i--) {
                        this.opOrder = model[i].zsales_area_id;
                        var integ = parseInt(this.opOrder);
                        integ++;
                        var res = integ;
                        this.opOrder = res.toString();
                        // this.serialNo = i + 2;
                        // console.log(this.order);
                        // console.log(this.serialNo);
                        break;
                    }
                } else {
                    this.opOrder = '1';
                }
            },
            handleValidateFormFields: function () {
                var State = true;
                var simpleFormIdArr = [
                    "orderData1", "orderData5", "orderData9", "orderData6", "orderData8",
                    "orderData12", "orderData81", "orderData193", "orderData86", "orderData125",
                    "erpCustomersydata1", "erpCustomersydata3", "erpCustomersydata5", "erpCustomersydata7", "erpCustomersydata9",
                    "erpCustomersydata11", "erpCustomersydata13", "erpCustomersydata15", "erpCustomersydata17", "erpCustomersydata19",
                    "erpCustomersydata21", "salesAreadata3", "salesAreadata5", "salesAreadata11", "salesAreadata7",
                    "salesAreadata9", "salesAreadata13", "salesAreadata15", "salesAreadata17", "salesAreadata19",
                    "salesAreadata21", "salesAreadata23", "CreditProfileSection1",
                    "Planned", "Planned2", "Planned3", "Planned4", "Planned5",
                    "Planned6", "CreditPerformanceEvaluationView", "CreditAnalysisView"
                ];
                // var simpleFormIdArr = [""orderData19","salesAreadata1", "comment"];
                for (var j = 0; j < simpleFormIdArr.length; j++) {
                    var content = this.getView().byId(simpleFormIdArr[j]).getAggregation("_views")[0].getContent()[0].getContent();
                    for (var b = 0; b < content.length; b++) {
                        if (content[b].getMetadata().getName() != "sap.ui.core.Title") {
                            if (content[b].getVisible()) {
                                if (content[b].getMetadata().getName() == "sap.m.Label" && content[b].getRequired() === true && content[b].getVisible() ===
                                    true) {
                                    if (content[b + 1].getMetadata().getName() == "sap.m.Input") {
                                        if (content[b + 1].getValue() == "") {
                                            content[b + 1].setValueState("Error").setValueStateText("");
                                            State = false;
                                        } else
                                            content[b + 1].setValueState("None").setValueStateText("");
                                    } else if (content[b + 1].getMetadata().getName() == "sap.m.MultiInput") {
                                        if (content[b + 1].getValue() == "") {
                                            content[b + 1].setValueState("Error").setValueStateText("");
                                            State = false;
                                        } else
                                            content[b + 1].setValueState("None").setValueStateText("");
                                    } else if (content[b + 1].getMetadata().getName() == "sap.m.Select") {
                                        if (content[b + 1].getSelectedKey() == "None") {
                                            content[b + 1].setValueState("Error").setValueStateText("");
                                            State = false;
                                        } else
                                            content[b + 1].setValueState("None").setValueStateText("");
                                    } else if (content[b + 1].getMetadata().getName() == "sap.m.DatePicker") {
                                        if (content[b + 1].getValue() == "") {
                                            content[b + 1].setValueState("Error").setValueStateText("");
                                            State = false;
                                        } else
                                            content[b + 1].setValueState("None").setValueStateText("");
                                    }
                                }
                            }
                        }
                    }
                }
                return State;
            }
            // onPost:function(evt){

            // }
        });
    });