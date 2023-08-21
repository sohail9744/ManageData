sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "Iffco/clap/formatter/formatter",
    "sap/m/MessageBox",
    "sap/ui/core/message/Message",
    "sap/ui/core/library",
    "sap/ui/core/Fragment",
    "../utils/ruleEngine"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, formatter, MessageBox, Message, library, Fragment, ruleEngine) {
        "use strict";
        // shortcut for sap.ui.core.ValueState
        var ValueState = library.ValueState;

        // shortcut for sap.ui.core.MessageType
        var MessageType = library.MessageType;

        return Controller.extend("Iffco.clap.controller.view2", {
            formatter: formatter,
            onInit: function () {
                var that = this;
                var oMessageManager, oModel, oView;

                oView = this.getView();
                // set message model
                oMessageManager = sap.ui.getCore().getMessageManager();
                oView.setModel(oMessageManager.getMessageModel(), "message");

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("CustomerDetail").attachPatternMatched(this._onRouteMatched, this);
                new sap.m.BusyDialog().close();

                this.flagForFirstTime = true;

                if (!this.Incoterms) {
                    this.Incoterms = new sap.ui.xmlfragment("Iffco.clap.fragments.Incoterms", this);
                    this.getView().addDependent(this.Incoterms);
                }
                if (!this.AccAssmntGrp) {
                    this.AccAssmntGrp = new sap.ui.xmlfragment("Iffco.clap.fragments.AccAssmntGrp", this);
                    this.getView().addDependent(this.AccAssmntGrp);
                }

            },

            handleAmtFields: function (evt) {
                this.getView().getModel("Customers").getData().zirr_bank_guarantee_amt = this.getView().getModel("Customers").getData().zirr_bank_guarantee_amt ? this.getView().getModel("Customers").getData().zirr_bank_guarantee_amt.toString() : "0";
                this.getView().getModel("Customers").getData().zlc_issuance_amount = this.getView().getModel("Customers").getData().zlc_issuance_amount ? this.getView().getModel("Customers").getData().zlc_issuance_amount.toString() : "0";
                this.getView().getModel("Customers").getData().zlc_confirming_amount = this.getView().getModel("Customers").getData().zlc_confirming_amount ? this.getView().getModel("Customers").getData().zlc_confirming_amount.toString() : "0";
                this.getView().getModel("Customers").getData().zcri_amount = this.getView().getModel("Customers").getData().zcri_amount ? this.getView().getModel("Customers").getData().zcri_amount.toString() : "0";
                this.getView().getModel("Customers").getData().zclassa_customer_amount = this.getView().getModel("Customers").getData().zclassa_customer_amount ? this.getView().getModel("Customers").getData().zclassa_customer_amount.toString() : "0";
                this.getView().getModel("Customers").getData().zcash_deposit_adv_amount = this.getView().getModel("Customers").getData().zcash_deposit_adv_amount ? this.getView().getModel("Customers").getData().zcash_deposit_adv_amount.toString() : "0";
                this.getView().getModel("Customers").getData().zavalization_draft_amount = this.getView().getModel("Customers").getData().zavalization_draft_amount ? this.getView().getModel("Customers").getData().zavalization_draft_amount.toString() : "0";

                //    Unsecured amt fields
                this.getView().getModel("Customers").getData().zopen_clean_credit_amount = this.getView().getModel("Customers").getData().zopen_clean_credit_amount ? this.getView().getModel("Customers").getData().zopen_clean_credit_amount.toString() : "0";
                this.getView().getModel("Customers").getData().zcad_amount = this.getView().getModel("Customers").getData().zcad_amount ? this.getView().getModel("Customers").getData().zcad_amount.toString() : "0";
                this.getView().getModel("Customers").getData().zpoc_in_hand_amount = this.getView().getModel("Customers").getData().zpoc_in_hand_amount ? this.getView().getModel("Customers").getData().zpoc_in_hand_amount.toString() : "0";
                this.getView().getModel("Customers").getData().zundated_or_security_deposit_c = this.getView().getModel("Customers").getData().zundated_or_security_deposit_c ? this.getView().getModel("Customers").getData().zundated_or_security_deposit_c.toString() : "0";
                this.getView().getModel("Customers").getData().zcri_insurer_amount = this.getView().getModel("Customers").getData().zcri_insurer_amount ? this.getView().getModel("Customers").getData().zcri_insurer_amount.toString() : "0";
                this.getView().getModel("Customers").getData().zuncfrmd_lc_nonapvd_bnkamt = this.getView().getModel("Customers").getData().zuncfrmd_lc_nonapvd_bnkamt ? this.getView().getModel("Customers").getData().zuncfrmd_lc_nonapvd_bnkamt.toString() : "0";
                // this.getView().getModel("Customers").getData().zlc_issuance_amount = this.getView().getModel("Customers").getData().zlc_issuance_amount.toString();

            },

            _onRouteMatched: async function (oEvent) {
                var that = this;
                this.busyDialog = new sap.m.BusyDialog();
                this.busyDialog.close();
                this.onClearMessagePopover();
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel([]), "commentsModel");
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel([]), "salesModel");
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel([]), "creditSegmentModel");
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel([]), "dmsModel");
                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel([]), "attachmentsModel");




                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel([]), "salesDataModel");

                console.log(this.getView().getModel("salesDataModel").getData())

                this.getOwnerComponent().getModel("salesModel").oData = [];
                this.process = oEvent.getParameters().arguments.process;

                this.getView().getModel("appView").setProperty("/firstTym", 'add');
                this.mode = oEvent.getParameters().arguments.mode;
                this.getView().getModel("appView").setProperty("/mode", this.mode);
                // Mohammad Sohail: will add it later in Manage application is already added
                //this.onClear();
                // this.onClearFiles();  // commented by mujaida
                // this.sPath = "/ZDD_CUSTOMER";
                // this.filter = [];
                if (this.mode == "edit") {
                    this.getView().getModel("appView").setProperty("/mode", false);
                    this.zcustomer_num = oEvent.getParameters().arguments.zcustomer_num;
                    this.zsales_orgnization = oEvent.getParameters().arguments.zsales_orgnization !== undefined ? oEvent.getParameters().arguments.zsales_orgnization : "";
                    // this.filter.push(new sap.ui.model.Filter("zcustomer_num", "EQ", this.zcustomer_num));
                    this.sPath = "/ZDD_CUSTOMER(zcustomer_num=guid'" + this.zcustomer_num + "')";
                    this.onCustomerData();
                    this.handleRuleEngineConfiguration();
                }
                if (this.mode === "CHANGE") {
                    this.zbusinessId = oEvent.getParameters().arguments.zbusinessPartnerId
                    this.sPath = '/ZDD_CUSTOMER'
                    // this.sPath = `/ZDD_CUSTOMER/?$filter=zbusiness_partner_id eq '${this.zbusinessId}'`;
                    this.onCustomerData();
                    this.handleRuleEngineConfiguration();
                }
            },
            onCustomerData: function (filters) {
                return new Promise((resolve, reject) => {
                    var oModel = this.getView().getModel();
                    oModel.read(this.sPath, {
                        urlParameters: {
                            "$expand": "to_salesarea,to_comments,to_credit"
                        },
                        success: function (oData, oResponse) {
                            if (this.mode === "CHANGE") {
                                oData = oData.results.filter(item => item.zbusiness_partner_id === this.zbusinessId);
                                if (oData.length > 0) {
                                    oData = oData[0]
                                }
                                this.zcustomer_num = oData.zcustomer_num;
                                this.sPath = "/ZDD_CUSTOMER(zcustomer_num=guid'" + this.zcustomer_num + "')";
                            }
                            var oCustomerDetailModel = this.getView().getModel("Customers");
                            delete oData.__metadata;
                            delete oData.to_zdd_comments;

                            var salesItem = this.getOwnerComponent().getModel("salesDataModel").getData();
                            var listItem = this.getOwnerComponent().getModel("commentsModel").getData();
                            var creditSegmentItem = this.getOwnerComponent().getModel("creditSegmentModel").getData();

                            for (var i = 0; i < oData.to_comments.results.length; i++) {
                                listItem.push({
                                    "zcomment": oData.to_comments.results[i].zcomment,
                                    "zcustomer_num": oData.to_comments.results[i].zcustomer_num,
                                    "Flag": "U",
                                    "createdat": oData.to_comments.results[i].createdat,
                                    "zcreated_by": oData.to_comments.results[i].createdby,

                                });
                            }
                            this.getOwnerComponent().getModel("commentsModel").updateBindings(true);

                            for (var i = 0; i < oData.to_salesarea.results.length; i++) {
                                salesItem.push({
                                    "zsales_area_id": oData.to_salesarea.results[i].zsales_area_id,
                                    "zcustomer_num": oData.to_salesarea.results[i].zcustomer_num,
                                    "Flag": "U",
                                    "zdistribution_channel": oData.to_salesarea.results[i].zdistribution_channel,
                                    "zdistribution_channel_text": oData.to_salesarea.results[i].zdistribution_channel_text,
                                    "zdivision": oData.to_salesarea.results[i].zdivision,
                                    "zdivision_text": oData.to_salesarea.results[i].zdivision_text,
                                    "zsales_orgnization": oData.to_salesarea.results[i].zsales_orgnization,
                                    "zsales_orgnization_text": oData.to_salesarea.results[i].zsales_orgnization_text,
                                    "zsettlement_group": oData.to_salesarea.results[i].zsettlement_group,
                                    "zaccount_assignment_group": oData.to_salesarea.results[i].zaccount_assignment_group,
                                    "zagency_business": oData.to_salesarea.results[i].zagency_business,
                                    "zdocument_index_active": oData.to_salesarea.results[i].zdocument_index_active,
                                    "zmanual_invoice_maintenance": oData.to_salesarea.results[i].zmanual_invoice_maintenance,
                                    "zrebate": oData.to_salesarea.results[i].zrebate,
                                    "zpricing": oData.to_salesarea.results[i].zpricing,
                                    "zinvoicing_dates": oData.to_salesarea.results[i].zinvoicing_dates,
                                    "zinvoicing_list_dates": oData.to_salesarea.results[i].zinvoicing_list_dates,
                                    "zcustomer_group1": oData.to_salesarea.results[i].zcustomer_group1,
                                    "zcustomer_group2": oData.to_salesarea.results[i].zcustomer_group2,
                                    "zcustomer_group3": oData.to_salesarea.results[i].zcustomer_group3,
                                    "zcustomer_group4": oData.to_salesarea.results[i].zcustomer_group4,
                                    "zcustomer_group5": oData.to_salesarea.results[i].zcustomer_group5,
                                    "zcustomer_group": oData.to_salesarea.results[i].zcustomer_group,
                                    "zinco_term": oData.to_salesarea.results[i].zinco_term,
                                    "zinco_location1": oData.to_salesarea.results[i].zinco_location1,
                                    "zpayment_terms": oData.to_salesarea.results[i].zpayment_terms,
                                    "zcredit_control_area": oData.to_salesarea.results[i].zcredit_control_area,
                                    "zpayment_gurantee_procedure": oData.to_salesarea.results[i].zpayment_gurantee_procedure,
                                    "zcomplete_delivery": oData.to_salesarea.results[i].zcomplete_delivery,
                                    "zmaximum_number_of_part_delive": oData.to_salesarea.results[i].zmaximum_number_of_part_delive,
                                    "zpartial_delivery_per_item": oData.to_salesarea.results[i].zpartial_delivery_per_item,
                                    "zunlimited_tolerance": oData.to_salesarea.results[i].zunlimited_tolerance,
                                    "zunder_delivery_tolerance": oData.to_salesarea.results[i].zunder_delivery_tolerance,
                                    "zover_delivery_tolerance": oData.to_salesarea.results[i].zover_delivery_tolerance,
                                    "zbill_to_buyer": oData.to_salesarea.results[i].zbill_to_buyer,
                                    "zonly_ship_to": oData.to_salesarea.results[i].zonly_ship_to,
                                    "zsales_person": oData.to_salesarea.results[i].zsales_person,
                                    "zagent": oData.to_salesarea.results[i].zagent,
                                    "zprice_group": oData.to_salesarea.results[i].zprice_group,
                                    "zpricelist": oData.to_salesarea.results[i].zpricelist,
                                    "zprice_procedured_term": oData.to_salesarea.results[i].zprice_procedured_term,
                                    "zcustomer_statistics_group": oData.to_salesarea.results[i].zcustomer_statistics_group,
                                    "zsales_district": oData.to_salesarea.results[i].zsales_district,
                                    "zsales_office": oData.to_salesarea.results[i].zsales_office,
                                    "zsales_group": oData.to_salesarea.results[i].zsales_group,
                                    "zabc_class": oData.to_salesarea.results[i].zabc_class,
                                    "zsales_currency": oData.to_salesarea.results[i].zsales_currency,
                                    // "zcurrency": oData.to_salesarea.results[i].zcurrency,
                                    "zaccount_at_customer": oData.to_salesarea.results[i].zaccount_at_customer,
                                    "zswitch_off_rounding": oData.to_salesarea.results[i].zswitch_off_rounding,
                                    "zorderprobability": oData.to_salesarea.results[i].zorderprobability,
                                    "zauthorization_group": oData.to_salesarea.results[i].zauthorization_group,
                                    "zitemproposal": oData.to_salesarea.results[i].zitemproposal,
                                    "zunit_of_measure_group": oData.to_salesarea.results[i].zunit_of_measure_group,
                                    "zexchange_rate_type": oData.to_salesarea.results[i].zexchange_rate_type,
                                    "zpp_customer_procedure": oData.to_salesarea.results[i].zpp_customer_procedure,
                                    "zshipping_conditions": oData.to_salesarea.results[i].zshipping_conditions,
                                    "zdelivery_plant": oData.to_salesarea.results[i].zdelivery_plant,
                                    "zdelivery_priority": oData.to_salesarea.results[i].zdelivery_priority,
                                    "zorder_combination": oData.to_salesarea.results[i].zorder_combination,
                                    "zrelevant_pod": oData.to_salesarea.results[i].zrelevant_pod,
                                    "zpod_timeframe": oData.to_salesarea.results[i].zpod_timeframe,
                                    "zcountry": oData.to_salesarea.results[i].zcountry,
                                    "ztaxcategory": oData.to_salesarea.results[i].ztaxcategory,
                                    "ztax_classification": oData.to_salesarea.results[i].ztax_classification,
                                    "ztax_category2": oData.to_salesarea.results[i].ztax_category2,
                                    "ztax_classification2": oData.to_salesarea.results[i].ztax_classification2,
                                    "zrule": oData.to_salesarea.results[i].zrule,
                                    "ztax_category2": oData.to_salesarea.results[i].ztax_category2,
                                    "zrisk_class": oData.to_salesarea.results[i].zrisk_class,
                                    "zcheck_rule": oData.to_salesarea.results[i].zcheck_rule,
                                    "zlimit_define": oData.to_salesarea.results[i].zlimit_define,
                                    "zlimit": oData.to_salesarea.results[i].zlimit,
                                    "zvalidity_to": oData.to_salesarea.results[i].zvalidity_to,
                                    "zcredit_segment": oData.to_salesarea.results[i].zcredit_segment,
                                    "zrelationship_to_bp": oData.to_salesarea.results[i].zrelationship_to_bp,
                                    "zcredit_control_area_desc": oData.to_salesarea.results[i].zcredit_control_area_desc,
                                    "zcredit_segment_desc": oData.to_salesarea.results[i].zcredit_segment_desc,
                                    "zblockedincm": oData.to_salesarea.results[i].zblockedincm,
                                    "zspecialattention": oData.to_salesarea.results[i].zspecialattention,
                                    "zutiliation_ptg": oData.to_salesarea.results[i].zutiliation_ptg,
                                    "zresubmission_on": oData.to_salesarea.results[i].zresubmission_on,
                                    "zinfo_category": oData.to_salesarea.results[i].zinfo_category,
                                    "zinfo_type": oData.to_salesarea.results[i].zinfo_type,
                                    "zname_of_type": oData.to_salesarea.results[i].zname_of_type,
                                    "zrelevant": oData.to_salesarea.results[i].zrelevant,
                                    "zindividual_step": oData.to_salesarea.results[i].zindividual_step,
                                    "zcredit_amount": oData.to_salesarea.results[i].zcredit_amount,
                                    "zdate_from": oData.to_salesarea.results[i].zdate_from,
                                    "zdate_to": oData.to_salesarea.results[i].zdate_to,
                                    "zcredit_curr": oData.to_salesarea.results[i].zcredit_curr,
                                    "zentered_on": oData.to_salesarea.results[i].zentered_on,
                                    "zdeleted_on": oData.to_salesarea.results[i].zdeleted_on,
                                    "zresubmission_date": oData.to_salesarea.results[i].zresubmission_date,
                                    "ztext_field": oData.to_salesarea.results[i].ztext_field,
                                    "zcredit_curr": oData.to_salesarea.results[i].zcredit_curr,
                                    "zblock_reason": oData.to_salesarea.results[i].zblock_reason


                                });
                            }
                            this.getOwnerComponent().getModel("salesDataModel").updateBindings(true);

                            for (var i = 0; i < oData.to_credit.results.length; i++) {
                                creditSegmentItem.push({
                                    "zcredit_id": oData.to_credit.results[i].zcredit_id,
                                    "zcustomer_num": oData.to_credit.results[i].zcustomer_num,
                                    "Flag": "U",
                                    "zinfo_type": oData.to_credit.results[i].zinfo_type,
                                    "zname_of_type": oData.to_credit.results[i].zname_of_type,
                                    "zrelevant": oData.to_credit.results[i].zrelevant,
                                    "zindividual_step": oData.to_credit.results[i].zindividual_step,
                                    "zcredit_amount": oData.to_credit.results[i].zcredit_amount,
                                    "zcredit_curr": oData.to_credit.results[i].zcredit_curr,
                                    "zdate_from": oData.to_credit.results[i].zdate_from,
                                    "zdate_to": oData.to_credit.results[i].zdate_to,
                                    "zentered_on": oData.to_credit.results[i].zentered_on,
                                    "zdeleted_on": oData.to_credit.results[i].zdeleted_on,
                                    "zresubmission_date": oData.to_credit.results[i].zresubmission_date,
                                    "ztext_field": oData.to_credit.results[i].ztext_field,

                                });
                            }
                            this.getOwnerComponent().getModel("creditSegmentModel").updateBindings(true);

                            oCustomerDetailModel.setData(oData);
                            oCustomerDetailModel.refresh();

                            var masterData = this.getView().getModel("Customers").getData();
                            //Mohammad Sohail: For Temporary purpose status, we have to remove below line 293
                            // this.getView().getModel("Customers").setProperty("/zrequest_status", "In Draft");
                            if (masterData.ztype_of_entity === 'Co-Operative (COOP)' || masterData.ztype_of_entity === 'CONSORTIUM'
                                || masterData.ztype_of_entity === 'Government' || masterData.ztype_of_entity === 'Limited Liability Partnership'
                                || masterData.ztype_of_entity === 'Other' || masterData.ztype_of_entity === 'Partnership'
                                || masterData.ztype_of_entity === 'Private Limited Company' || masterData.ztype_of_entity === 'Public Limited Company'
                                || masterData.ztype_of_entity === 'Sole Proprietorship') {
                                this.getView().getModel("appView").getData().TypeOfEntity1 = true;
                                this.getView().getModel("appView").getData().TypeOfEntity2 = true;
                                this.getView().getModel("appView").getData().TypeOfEntity3 = true;
                                this.getView().getModel("appView").getData().TypeOfEntity4 = true;
                                this.getView().getModel("appView").getData().TypeOfEntity5 = true;
                                this.getView().getModel("appView").getData().TypeOfEntity6 = true;
                                this.getView().getModel("appView").getData().TypeOfEntity7 = true;
                                this.getView().getModel("appView").getData().TypeOfEntity8 = true;
                                this.getView().getModel("appView").getData().TypeOfEntity9 = true;
                            }
                            this.getView().getModel("appView").setProperty("/vertical", this.getView().getModel("Customers").getData().zdescription);
                            this.getDmsData();
                            resolve();
                        }.bind(this),
                        error: function (oError) {
                            // sap.m.MessageBox.error("onCustomerData error: " + oError);
                            this.onCustomerData();
                            console.log("Customer Data and Sales Data is triggering ERROR: " + oError);
                        }.bind(this)
                    });
                })
            },
            getDmsData: function (evt) {
                var serviceURL = this.getOwnerComponent().getModel("DMS").sServiceUrl;
                var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);
                var path = "/GetAllOriginals?LinkedSAPObjectKey='" + this.zcustomer_num
                    + "'&BusinessObjectTypeName='" + "KNA1" + "";

                console.log(path);
                path = path.replaceAll("KNA1", "KNA1%27");

                oModel.read(path, {
                    success: function (oData, oResponse) {
                        var attachmentsItem = this.getOwnerComponent().getModel("attachmentsModel").getData();

                        for (var i = 0; i < oData.results.length; i++) {
                            attachmentsItem.push({
                                "FieldName": oData.results[i].FileName.split("_")[0],
                                "FileName": oData.results[i].FileName.split("_")[1],
                                "DocumentInfoRecordDocType": oData.results[i].DocumentInfoRecordDocType,
                                "DocumentInfoRecordDocNumber": oData.results[i].DocumentInfoRecordDocNumber,
                                "ArchiveDocumentID": oData.results[i].ArchiveDocumentID,
                                "LinkedSAPObjectKey": oData.results[i].LinkedSAPObjectKey,
                                "BusinessObjectTypeName": oData.results[i].BusinessObjectTypeName,
                                "MimeType": oData.results[i].MimeType,
                                "LogicalDocument": oData.results[i].LogicalDocument,
                                "DocumentInfoRecordDocVersion": oData.results[i].DocumentInfoRecordDocVersion,
                                "DocumentInfoRecordDocPart": oData.results[i].DocumentInfoRecordDocPart,
                                "Flag": "U",
                            });
                        }
                        this.getOwnerComponent().getModel("attachmentsModel").updateBindings(true);

                        var flatObj = {};
                        oData.results.forEach(function (obj) {
                            var sField = "";
                            sField += obj.FileName.split("_")[0];
                            flatObj[sField] = obj.FileName.split("_")[1];
                        })
                        console.log(flatObj);
                        this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel({}), "getDmsModel");
                        this.getView().getModel("getDmsModel").oData = flatObj;
                        this.getView().getModel("getDmsModel").updateBindings(true);
                        console.log(oData);
                    }.bind(this), error: function (err) {

                    }
                });
            },
            handleRuleEngineConfiguration: async function () {
                this.busyDialog.open();
                this.process = (this.process === "Create Customer") ? "CREATE" : (this.process === "Change Customer") ? "CHANGE" : "EXTEND";
                var sCustomerType = this.getView().getModel("appView").getProperty("/vertical") === 'Cash' ? 'Cash' : 'Credit'
                var sBPGrouping = this.getView().getModel("appView").getProperty("/bpg");
                const configObject = {
                    oModel: this.getOwnerComponent().getModel("RuleEngine"),
                    process: this.process,
                    aCustomerType: sCustomerType.toLocaleUpperCase(),
                    sBPGrouping: sBPGrouping.toLocaleUpperCase()
                }

                let fieldMappingModelsData = await ruleEngine(configObject);

                this.getOwnerComponent().setModel(new sap.ui.model.json.JSONModel(fieldMappingModelsData), "fieldMappingModels");
                this.getView().getModel("fieldMappingModels").updateBindings(true);
                this.getOwnerComponent().getModel().refresh(true);
                this.busyDialog.close();


            },
            updateFeilds: function (evt) {
                var oModel = this.getView().getModel("RuleEngine");
                // this.getView().setBusy(true);
                oModel.read("/ZDD_RULE_UPDATE", {
                    // filters: [new sap.ui.model.Filter("rule_id", "EQ", ruleid)],
                    // urlParameters: {
                    //     "$top": 10000
                    // },

                    success: function (oData, oResponse) {
                        // console.log("success");
                        // console.log(oData.results);
                    }.bind(this),
                    error: function (err) {

                    }.bind(this)
                });
            },
            onDescriptionSelect: function (oEvent) {
                var oCustomerDetailModel = this.getView().getModel("Customers");
                oCustomerDetailModel.setProperty("/zdescription", oEvent.getParameters().selectedIndex);
            },

            saveRequest: function () {
                var that = this;
                this.buttonText = 'save';
                var amtFieldState = this.handleAmtFieldsValidation();
                if (amtFieldState === true) {
                    var oModel = this.getView().getModel();
                    var oCustomerDetailModel = this.getView().getModel("Customers");
                    delete oCustomerDetailModel.getData().to_zdd_sale;
                    delete oCustomerDetailModel.getData().to_zdd_comments;
                    var oEntry = oCustomerDetailModel.getData();

                    var creditLimitType = this.getView().getModel("appView").getProperty("/selectedType");

                    if (creditLimitType === "Secured Credit Limit" || creditLimitType === "Secured Credit") {
                        oEntry.zcredit_limit_type = "Secured Credit";
                    } else if (creditLimitType === "UnSecured Credit Limit" || creditLimitType === "UnSecured Credit") {
                        oEntry.zcredit_limit_type = "UnSecured Credit";
                    } else {
                        oEntry.zcredit_limit_type = "Both";
                    }

                    this.handleAmtFields();

                    // if (this.mode == "edit" && that.custNum) {
                    if (this.mode == "edit") {
                        // oEntry.zrequest_no = req_no;
                        // oEntry.zsales_orgnization =  this.getView().getModel("salesModel").getData().length > 0 ? this.getView().getModel("salesModel").getData()[0].zsales_orgnization.split(" - ")[0] : "";
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
                        delete oEntry.zmobile_country_number;

                        delete oEntry.BusinessPartnerDD;
                        delete oEntry.BPRoles;
                        delete oEntry.requests;
                        delete oEntry.EntryCollection;

                        // var creditLimitType = this.getView().getModel("appView").getProperty("/selectedType");

                        // if(creditLimitType === "Secured Credit Limit" || creditLimitType === "Secured Credit"){
                        //     oEntry.zcredit_limit_type = "Secured Credit";
                        // }else if(creditLimitType === "UnSecured Credit Limit" || creditLimitType === "UnSecured Credit"){
                        //     oEntry.zcredit_limit_type = "UnSecured Credit";
                        // }else{
                        //     oEntry.zcredit_limit_type = "Both";
                        // }

                        // oEntry.zcredit_limit_type = this.getView().getModel("appView").getProperty("/selectedType") === 0 ? "Secured Credit" : "UnSecured Credit";
                        // if (this.getView().byId("CreditProfileSection2").getAggregation("_views") !== null) {
                        //     oEntry.zblockedincm = this.getView().byId("CreditProfileSection2").getAggregation("_views")[0].getContent()[0].getContent()[1].getSelected() ? 'Y' : 'N';
                        //     oEntry.zspecialattention = this.getView().byId("CreditProfileSection2").getAggregation("_views")[0].getContent()[0].getContent()[3].getSelected() ? 'Y' : 'N';
                        // }
                        if (this.getView().byId("orderData13").getAggregation("_views") !== null) {
                            oEntry.zroute_audit_is_performed = this.getView().byId("orderData13").getAggregation("_views")[0].getContent()[0].getContent()[25].getSelected() ? 'Y' : 'N';
                        }
                        oEntry.zdescription = this.getView().getModel("appView").getProperty("/vertical") === 'CASH' ? 'CASH' : 'CREDIT';
                        oEntry.ztype_of_customer = oEntry.zdescription;
                        //oEntry.zbusiness_partner_id_grouping = this.getView().getModel("appView").getProperty("/bpg");
                        // oEntry.zcountry = this.getView().byId("orderData9").getAggregation("_views")[0].getContent()[0].getContent()[3].getValue().split(" - ")[0];
                        // oEntry.zblock_reason = this.getView().byId("CreditProfileSection2").getAggregation("_views") !== null ? this.getView().byId("CreditProfileSection2").getAggregation("_views")[0].getContent()[0].getContent()[5].getValue().split(" - ")[0] : "";

                        // if (this.getView().byId("CreditProfileSection4").getAggregation("_views") !== null) {
                        //     oEntry.zdata_outdated = this.getView().byId("CreditProfileSection4").getAggregation("_views")[0].getContent()[0].getContent()[2].getSelected() ? 'Y' : 'N';
                        // }
                        if (this.getView().byId("Planned6").getAggregation("_views") !== null) {
                            oEntry.zproxima = this.getView().byId("Planned6").getAggregation("_views")[0].getContent()[0].getContent()[9].getSelected() ? 'Y' : 'N';
                        }
                        // if (this.getView().byId("salesAreadata15").getAggregation("_views") !== null) {
                        //     oEntry.zcredit_control_area = this.getView(.).byId("salesAreadata15").getAggregation("_views")[0].getContent()[0].getContent()[7].getValue().split(" - ")[0];
                        //     // oEntry.zpayment_terms = this.getView().byId("salesAreadata15").getAggregation("_views")[0].getContent()[0].getContent()[5].getValue().split(" ")[0];
                        // }

                        delete oEntry.to_credit;
                        this.reqNumber = oEntry.zrequest_no;
                        if (this.getView().getModel("Customers").getData().zdate_founded === null || this.getView().getModel("Customers").getData().zdate_founded.length < 13) {
                            oEntry.zdate_founded = oEntry.zdate_founded ? this.dateFormatter(oEntry.zdate_founded) : null;
                        }
                        if (this.getView().getModel("Customers").getData().zliquidationdate === null || this.getView().getModel("Customers").getData().zliquidationdate.length < 13) {
                            oEntry.zliquidationdate = oEntry.zliquidationdate ? this.dateFormatter(oEntry.zliquidationdate) : null;
                        }
                        if (this.getView().getModel("Customers").getData().zdate === null || (this.getView().getModel("Customers").getData().zdate != null && this.getView().getModel("Customers").getData().zdate.length < 13)) {
                            oEntry.zdate = oEntry.zdate ? this.dateFormatter(oEntry.zdate) : null;
                        }
                        // if (this.getView().getModel("Customers").getData().zvalidity_to === null || this.getView().getModel("Customers").getData().zvalidity_to.length < 13) {
                        //     oEntry.zvalidity_to = oEntry.zvalidity_to ? this.dateFormatter(oEntry.zvalidity_to) : null;
                        // }
                        if (this.getView().getModel("Customers").getData().zvalid_from === null || this.getView().getModel("Customers").getData().zvalid_from.length < 13) {
                            oEntry.zvalid_from = oEntry.zvalid_from ? this.dateFormatter(oEntry.zvalid_from) : null;
                        }
                        if (this.getView().getModel("Customers").getData().zvalid_to === null || this.getView().getModel("Customers").getData().zvalid_to.length < 13) {
                            oEntry.zvalid_to = oEntry.zvalid_to ? this.dateFormatter(oEntry.zvalid_to) : null;
                        }
                        // if (this.getView().getModel("Customers").getData().zentry_date === null || this.getView().getModel("Customers").getData().zentry_date.length < 13) {
                        //     oEntry.zentry_date = oEntry.zentry_date ? this.dateFormatter(oEntry.zentry_date) : null;
                        // }
                        if (this.getView().getModel("Customers").getData().zduedate === null || this.getView().getModel("Customers").getData().zduedate.length < 13) {
                            oEntry.zduedate = oEntry.zduedate ? this.dateFormatter(oEntry.zduedate) : null;
                        }
                        //oEntry.zcreated_date = oEntry.zcreated_date ? this.dateFormatter(oEntry.zcreated_date) : null;
                        if (this.getView().getModel("Customers").getData().zupdated_date === null || this.getView().getModel("Customers").getData().zupdated_date.length < 13) {
                            oEntry.zupdated_date = oEntry.zupdated_date ? this.dateFormatter(oEntry.zupdated_date) : null;
                        }
                        if (this.getView().getModel("Customers").getData().zfinalizedon === null || this.getView().getModel("Customers").getData().zfinalizedon.length < 13) {
                            oEntry.zfinalizedon = oEntry.zfinalizedon ? this.dateFormatter(oEntry.zfinalizedon) : null;
                        }
                        // if (this.getView().getModel("Customers").getData().zlast_key_date === null || this.getView().getModel("Customers").getData().zlast_key_date.length < 13) {
                        //     oEntry.zlast_key_date = oEntry.zlast_key_date ? this.dateFormatter(oEntry.zlast_key_date) : null;
                        // }
                        // if (this.getView().getModel("Customers").getData().zpayment_on === null || this.getView().getModel("Customers").getData().zpayment_on.length < 13) {
                        //     oEntry.zpayment_on = oEntry.zpayment_on ? this.dateFormatter(oEntry.zpayment_on) : null;
                        // }
                        if (this.getView().getModel("Customers").getData().zcreated_date === null || this.getView().getModel("Customers").getData().zcreated_date.length < 13) {
                            oEntry.zcreated_date = oEntry.zcreated_date ? this.dateFormatter(oEntry.zcreated_date) : null;
                        }
                        if (this.getView().getModel("Customers").getData().zcl_validity_proposed_date === null || this.getView().getModel("Customers").getData().zcl_validity_proposed_date.length < 13) {
                            oEntry.zcl_validity_proposed_date = oEntry.zcl_validity_proposed_date ? this.dateFormatter(oEntry.zcl_validity_proposed_date) : null;
                        }
                        // if (this.getView().getModel("Customers").getData().zresubmission_on === null || this.getView().getModel("Customers").getData().zresubmission_on.length < 13) {
                        //     oEntry.zresubmission_on = oEntry.zresubmission_on ? this.dateFormatter(oEntry.zresubmission_on) : null;
                        // }
                        if (this.getView().getModel("Customers").getData().zvalid_passport_date === null || this.getView().getModel("Customers").getData().zvalid_passport_date.length < 13) {
                            oEntry.zvalid_passport_date = oEntry.zvalid_passport_date ? this.dateFormatter(oEntry.zvalid_passport_date) : null;
                        }
                        if (this.getView().getModel("Customers").getData().zvisa_valid_date === null || this.getView().getModel("Customers").getData().zvisa_valid_date.length < 13) {
                            oEntry.zvisa_valid_date = oEntry.zvisa_valid_date ? this.dateFormatter(oEntry.zvisa_valid_date) : null;
                        }
                        //  if (this.getView().getModel("Customers").getData().znet_due_date === null || this.getView().getModel("Customers").getData().znet_due_date.length < 13) {
                        //     oEntry.znet_due_date = oEntry.znet_due_date ? this.dateFormatter(oEntry.znet_due_date) : null;
                        // }

                        oEntry.zstate = oEntry.zstate ? oEntry.zstate.split(" - ")[0] : "";
                        oEntry.zcountry = oEntry.zcountry ? oEntry.zcountry.split(" - ")[0] : "";
                        oEntry.ztransportation_zone = oEntry.ztransportation_zone ? oEntry.ztransportation_zone.split(" - ")[0] : "";
                        oEntry.zreason_code_conversion = oEntry.zreason_code_conversion ? oEntry.zreason_code_conversion.split(" - ")[0] : "";
                        oEntry.zselection_rule = oEntry.zselection_rule ? oEntry.zselection_rule.split(" - ")[0] : "";
                        oEntry.zlanguage = oEntry.zlanguage ? oEntry.zlanguage.split(" - ")[0] : "";
                        oEntry.zcompany_code = oEntry.zcompany_code ? oEntry.zcompany_code.split(" - ")[0] : "";
                        oEntry.zar_pledging_indicator = oEntry.zar_pledging_indicator ? oEntry.zar_pledging_indicator.split(" - ")[0] : "";
                        oEntry.zgrouping_key = oEntry.zgrouping_key ? oEntry.zgrouping_key.split(" - ")[0] : "";
                        oEntry.zaccounting_clerk = oEntry.zaccounting_clerk ? oEntry.zaccounting_clerk.split(" - ")[0] : "";
                        oEntry.zaccount_statement = oEntry.zaccount_statement ? oEntry.zaccount_statement.split(" - ")[0] : "";
                        oEntry.zselection_rule = oEntry.zselection_rule ? oEntry.zselection_rule.split(" - ")[0] : "";
                        oEntry.zreason_code_conversion = oEntry.zreason_code_conversion ? oEntry.zreason_code_conversion.split(" - ")[0] : "";
                        oEntry.zhouse_bank = oEntry.zhouse_bank ? oEntry.zhouse_bank.split(" - ")[0] : "";
                        oEntry.zpayment_method_supplement = oEntry.zpayment_method_supplement ? oEntry.zpayment_method_supplement.split(" - ")[0] : "";
                        oEntry.znegotiated_leave = oEntry.zknown_egotiated_leave ? oEntry.zknown_egotiated_leave.split(" - ")[0] : "";
                        oEntry.zinterest_indicator = oEntry.zinterest_indicator ? oEntry.zinterest_indicator.split(" - ")[0] : "";
                        oEntry.zrelease_group = oEntry.zrelease_group ? oEntry.zrelease_group.split(" - ")[0] : "";
                        oEntry.zplanning_group = oEntry.zplanning_group ? oEntry.zplanning_group.split(" - ")[0] : "";
                        oEntry.zsort_key = oEntry.zsort_key ? oEntry.zsort_key.split(" - ")[0] : "";
                        oEntry.zvalue_adjustment = oEntry.zvalue_adjustment ? oEntry.zvalue_adjustment.split(" - ")[0] : "";
                        oEntry.zauthorization_group = oEntry.zauthorization_group ? oEntry.zauthorization_group.split(" - ")[0] : "";
                        oEntry.zhead_office = oEntry.zhead_office ? oEntry.zhead_office.split(" - ")[0] : "";
                        oEntry.zcustomer_legal_name = oEntry.zcustomer_legal_name ? oEntry.zcustomer_legal_name.split(" - ")[0] : "";
                        oEntry.zcredit_limit_currency = oEntry.zcredit_limit_currency ? oEntry.zcredit_limit_currency.split(" - ")[0] : "";
                        oEntry.ztype_of_entity = oEntry.ztype_of_entity ? oEntry.ztype_of_entity.split(" - ")[0] : "";
                        oEntry.zsource_of_inquiry = oEntry.zsource_of_inquiry ? oEntry.zsource_of_inquiry.split(" - ")[0] : "";
                        oEntry.zlicense_type = oEntry.zlicense_type ? oEntry.zlicense_type.split(" - ")[0] : "";
                        // delete oEntry.ztype_of_Entity;
                        if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("Intercompany")) {
                            oEntry.zbusiness_partner_grouping = "Z070";
                        }
                        else if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("Sold")) {
                            oEntry.zbusiness_partner_grouping = "BP01"
                        }
                        else if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("Ship")) {
                            oEntry.zbusiness_partner_grouping = "BP02"
                        }
                        else if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("One")) {
                            oEntry.zbusiness_partner_grouping = "BP08"
                        }

                        oEntry.zregion = oEntry.zstate;
                        oModel.update(this.sPath, oEntry, {
                            success: function (oData, oResponse) {
                                // jQuery.sap.require("sap.m.MessageBox");
                                // sap.m.MessageBox.success("Customer Id " + this.getView().getModel("Customers").getData().zrequest_no + " saved Successfully");
                                this.handleSalesData();
                            }.bind(this),
                            error: function (err) {

                            }
                        });

                    } else {
                        if (!oEntry.zbusiness_unit_name || !oEntry.zvertical || !oEntry.zcustomer_type || !oEntry.zchannel_group || !oEntry.zcustomer_legal_name || !oEntry.zcompany_code) {
                            // MessageBox.error("Please fill Mandotry fields");
                            var mandatoryFields = [
                                { field: "zbusiness_unit_name", label: "Business Unit" },
                                { field: "zvertical", label: "Vertical" },
                                { field: "zcustomer_type", label: "Customer Type" },
                                { field: "zchannel_group", label: "Channel Group" },
                                { field: "zcustomer_legal_name", label: "Legal Name" },
                                { field: "zcompany_code", label: "Company Code" }
                            ];
                            var missingFields = [];
                            mandatoryFields.forEach(function (fieldObj) {
                                var fieldValue = oEntry[fieldObj.field];
                                if (!fieldValue) {
                                    missingFields.push(fieldObj.label);
                                }
                            });
                            if (missingFields.length > 0) {
                                var errorMessage = "Please fill in the following mandatory fields: " + missingFields.join(", ");
                                MessageBox.error(errorMessage);
                            }
                        } else {
                            // this.handleAmtFields();
                            var req_no = Math.floor(1000 + Math.random() * 9000) + "";
                            oEntry.zrequest_no = req_no;
                            // oEntry.zsales_orgnization =  this.getView().getModel("salesModel").getData().length > 0 ? this.getView().getModel("salesModel").getData()[0].zsales_orgnization.split(" - ")[0] : "";
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
                            delete oEntry.zmobile_country_number;

                            delete oEntry.BusinessPartnerDD;
                            delete oEntry.BPRoles;
                            delete oEntry.requests;
                            delete oEntry.EntryCollection;

                            // oEntry.zcredit_limit_type = this.getView().getModel("appView").getProperty("/selectedType") === 0 ? "Secured Credit" : "UnSecured Credit";
                            // if (this.getView().byId("CreditProfileSection2").getAggregation("_views") !== null) {
                            //     oEntry.zblockedincm = this.getView().byId("CreditProfileSection2").getAggregation("_views")[0].getContent()[0].getContent()[1].getSelected() ? 'Y' : 'N';
                            //     oEntry.zspecialattention = this.getView().byId("CreditProfileSection2").getAggregation("_views")[0].getContent()[0].getContent()[3].getSelected() ? 'Y' : 'N';
                            // }
                            if (this.getView().byId("orderData13").getAggregation("_views") !== null) {
                                oEntry.zroute_audit_is_performed = this.getView().byId("orderData13").getAggregation("_views")[0].getContent()[0].getContent()[25].getSelected() ? 'Y' : 'N';
                            }
                            if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("Intercompany")) {
                                oEntry.zbusiness_partner_grouping = "Z070";
                            }
                            else if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("Sold")) {
                                oEntry.zbusiness_partner_grouping = "BP01"
                            }
                            else if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("Ship")) {
                                oEntry.zbusiness_partner_grouping = "BP02"
                            }
                            else if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("One")) {
                                oEntry.zbusiness_partner_grouping = "BP08"
                            }
                            oEntry.zdescription = this.getView().getModel("appView").getProperty("/vertical") === 'CASH' ? 'CASH' : 'CREDIT';
                            oEntry.ztype_of_customer = oEntry.zdescription;
                            // oEntry.zcountry = this.getView().byId("orderData9").getAggregation("_views")[0].getContent()[0].getContent()[3].getValue().split(" - ")[0];
                            // oEntry.zblock_reason = this.getView().byId("CreditProfileSection2").getAggregation("_views") !== null ? this.getView().byId("CreditProfileSection2").getAggregation("_views")[0].getContent()[0].getContent()[5].getValue().split(" - ")[0] : "";

                            // if (this.getView().byId("CreditProfileSection4").getAggregation("_views") !== null) {
                            //     oEntry.zdata_outdated = this.getView().byId("CreditProfileSection4").getAggregation("_views")[0].getContent()[0].getContent()[2].getSelected() ? 'Y' : 'N';
                            // }
                            if (this.getView().byId("Planned6").getAggregation("_views") !== null) {
                                oEntry.zproxima = this.getView().byId("Planned6").getAggregation("_views")[0].getContent()[0].getContent()[9].getSelected() ? 'Y' : 'N';
                            }
                            // if (this.getView().byId("salesAreadata15").getAggregation("_views") !== null) {
                            //     oEntry.zcredit_control_area = this.getView().byId("salesAreadata15").getAggregation("_views")[0].getContent()[0].getContent()[7].getValue().split(" - ")[0];
                            //     // oEntry.zpayment_terms = this.getView().byId("salesAreadata15").getAggregation("_views")[0].getContent()[0].getContent()[5].getValue().split(" ")[0];
                            // }
                            // if (this.getView().byId("CreditAnalysisView").getAggregation("_views") !== null) {
                            //     oEntry.zcountry_rating = this.getView().byId("CreditAnalysisView").getAggregation("_views")[0].getContent()[0].getContent()[23].getValue().split(" ; ")[0];
                            // }
                            // if (this.getView().byId("Planned4").getAggregation("_views") !== null) {
                            //     oEntry.ztotal_credit_amount = this.getView().byId("Planned4").getAggregation("_views")[0].getContent()[0].getContent()[5].getValue().toString();
                            // }


                            // if(this.getView().byId("erpCustomersydata7").getAggregation("_views") !== null){
                            // oEntry.zterms_of_payment = this.getView().byId("erpCustomersydata7").getAggregation("_views")[0].getContent()[0].getContent()[1].getValue().split(' ')[0];
                            // }

                            var custData = this.getView().getModel("Customers").getData();
                            if (custData.zdate_founded === undefined || custData.zdate_founded === null || custData.zdate_founded.length < 13) {
                                oEntry.zdate_founded = oEntry.zdate_founded ? this.dateFormatter(oEntry.zdate_founded) : null;
                            }
                            if (custData.zliquidationdate === undefined || custData.zliquidationdate === null || custData.zliquidationdate.length < 13) {
                                oEntry.zliquidationdate = oEntry.zliquidationdate ? this.dateFormatter(oEntry.zliquidationdate) : null;
                            }
                            if (custData.zdate === undefined || custData.zdate === null || custData.zdate.length < 13) {
                                oEntry.zdate = oEntry.zdate ? this.dateFormatter(oEntry.zdate) : null;
                            }
                            // if (custData.zvalidity_to === undefined || custData.zvalidity_to === null || custData.zvalidity_to.length < 13) {
                            //     oEntry.zvalidity_to = oEntry.zvalidity_to ? this.dateFormatter(oEntry.zvalidity_to) : null;
                            // }
                            if (custData.zvalid_from === undefined || custData.zvalid_from === null || custData.zvalid_from.length < 13) {
                                oEntry.zvalid_from = oEntry.zvalid_from ? this.dateFormatter(oEntry.zvalid_from) : null;
                            }
                            if (custData.zvalid_to === undefined || custData.zvalid_to === null || custData.zvalid_to.length < 13) {
                                oEntry.zvalid_to = oEntry.zvalid_to ? this.dateFormatter(oEntry.zvalid_to) : null;
                            }
                            // if (custData.zentry_date === undefined || custData.zentry_date === null || custData.zentry_date.length < 13) {
                            //     oEntry.zentry_date = oEntry.zentry_date ? this.dateFormatter(oEntry.zentry_date) : null;
                            // }
                            if (custData.zduedate === undefined || custData.zduedate === null || custData.zduedate.length < 13) {
                                oEntry.zduedate = oEntry.zduedate ? this.dateFormatter(oEntry.zduedate) : null;
                            }
                            //oEntry.zcreated_date = oEntry.zcreated_date ? this.dateFormatter(oEntry.zcreated_date) : null;
                            if (custData.zupdated_date === undefined || custData.zupdated_date === null || custData.zupdated_date.length < 13) {
                                oEntry.zupdated_date = oEntry.zupdated_date ? this.dateFormatter(oEntry.zupdated_date) : null;
                            }
                            if (custData.zfinalizedon === undefined || custData.zfinalizedon === null || custData.zfinalizedon.length < 13) {
                                oEntry.zfinalizedon = oEntry.zfinalizedon ? this.dateFormatter(oEntry.zfinalizedon) : null;
                            }
                            // if (custData.zlast_key_date === undefined || custData.zlast_key_date === null || custData.zlast_key_date.length < 13) {
                            //     oEntry.zlast_key_date = oEntry.zlast_key_date ? this.dateFormatter(oEntry.zlast_key_date) : null;
                            // }
                            // if (custData.zpayment_on === undefined || custData.zpayment_on === null || custData.zpayment_on.length < 13) {
                            //     oEntry.zpayment_on = oEntry.zpayment_on ? this.dateFormatter(oEntry.zpayment_on) : null;
                            // }
                            if (custData.zcreated_date === undefined || custData.zcreated_date === null || custData.zcreated_date.length < 13) {
                                oEntry.zcreated_date = oEntry.zcreated_date ? this.dateFormatter(oEntry.zcreated_date) : null;
                            }
                            if (custData.zcl_validity_proposed_date === undefined || custData.zcl_validity_proposed_date === null || custData.zcl_validity_proposed_date.length < 13) {
                                oEntry.zcl_validity_proposed_date = oEntry.zcl_validity_proposed_date ? this.dateFormatter(oEntry.zcl_validity_proposed_date) : null;
                            }
                            // if (custData.zresubmission_on === undefined || custData.zresubmission_on === null || custData.zresubmission_on.length < 13) {
                            //     oEntry.zresubmission_on = oEntry.zresubmission_on ? this.dateFormatter(oEntry.zresubmission_on) : null;
                            // }
                            if (custData.zvalid_passport_date === undefined || custData.zvalid_passport_date === null || custData.zvalid_passport_date.length < 13) {
                                oEntry.zvalid_passport_date = oEntry.zvalid_passport_date ? this.dateFormatter(oEntry.zvalid_passport_date) : null;
                            }
                            if (custData.zvisa_valid_date === undefined || custData.zvisa_valid_date === null || custData.zvisa_valid_date.length < 13) {
                                oEntry.zvisa_valid_date = oEntry.zvisa_valid_date ? this.dateFormatter(oEntry.zvisa_valid_date) : null;
                            }
                            // if (custData.znet_due_date === undefined || custData.znet_due_date === null || custData.znet_due_date.length < 13) {
                            //     oEntry.znet_due_date = oEntry.znet_due_date ? this.dateFormatter(oEntry.znet_due_date) : null;
                            // }
                            oEntry.zstate = oEntry.zstate ? oEntry.zstate.split(" - ")[0] : "";
                            oEntry.zcountry = oEntry.zcountry ? oEntry.zcountry.split(" - ")[0] : "";
                            oEntry.ztransportation_zone = oEntry.ztransportation_zone ? oEntry.ztransportation_zone.split(" - ")[0] : "";
                            oEntry.zreason_code_conversion = oEntry.zreason_code_conversion ? oEntry.zreason_code_conversion.split(" - ")[0] : "";
                            oEntry.zselection_rule = oEntry.zselection_rule ? oEntry.zselection_rule.split(" - ")[0] : "";
                            oEntry.zlanguage = oEntry.zlanguage ? oEntry.zlanguage.split(" - ")[0] : "";
                            oEntry.zcompany_code = oEntry.zcompany_code ? oEntry.zcompany_code.split(" - ")[0] : "";
                            oEntry.zar_pledging_indicator = oEntry.zar_pledging_indicator ? oEntry.zar_pledging_indicator.split(" - ")[0] : "";
                            oEntry.zgrouping_key = oEntry.zgrouping_key ? oEntry.zgrouping_key.split(" - ")[0] : "";
                            oEntry.zaccounting_clerk = oEntry.zaccounting_clerk ? oEntry.zaccounting_clerk.split(" - ")[0] : "";
                            oEntry.zaccount_statement = oEntry.zaccount_statement ? oEntry.zaccount_statement.split(" - ")[0] : "";
                            oEntry.zselection_rule = oEntry.zselection_rule ? oEntry.zselection_rule.split(" - ")[0] : "";
                            oEntry.zreason_code_conversion = oEntry.zreason_code_conversion ? oEntry.zreason_code_conversion.split(" - ")[0] : "";
                            oEntry.zhouse_bank = oEntry.zhouse_bank ? oEntry.zhouse_bank.split(" - ")[0] : "";
                            oEntry.zpayment_method_supplement = oEntry.zpayment_method_supplement ? oEntry.zpayment_method_supplement.split(" - ")[0] : "";
                            oEntry.znegotiated_leave = oEntry.zknown_egotiated_leave ? oEntry.zknown_egotiated_leave.split(" - ")[0] : "";
                            oEntry.zinterest_indicator = oEntry.zinterest_indicator ? oEntry.zinterest_indicator.split(" - ")[0] : "";
                            oEntry.zrelease_group = oEntry.zrelease_group ? oEntry.zrelease_group.split(" - ")[0] : "";
                            oEntry.zplanning_group = oEntry.zplanning_group ? oEntry.zplanning_group.split(" - ")[0] : "";
                            oEntry.zsort_key = oEntry.zsort_key ? oEntry.zsort_key.split(" - ")[0] : "";
                            oEntry.zvalue_adjustment = oEntry.zvalue_adjustment ? oEntry.zvalue_adjustment.split(" - ")[0] : "";
                            oEntry.zauthorization_group = oEntry.zauthorization_group ? oEntry.zauthorization_group.split(" - ")[0] : "";
                            oEntry.zhead_office = oEntry.zhead_office ? oEntry.zhead_office.split(" - ")[0] : "";
                            oEntry.zcustomer_legal_name = oEntry.zcustomer_legal_name ? oEntry.zcustomer_legal_name.split(" - ")[0] : "";
                            oEntry.zcredit_limit_currency = oEntry.zcredit_limit_currency ? oEntry.zcredit_limit_currency.split(" - ")[0] : "";
                            oEntry.ztype_of_entity = oEntry.ztype_of_entity ? oEntry.ztype_of_entity.split(" - ")[0] : "";
                            oEntry.zsource_of_inquiry = oEntry.zsource_of_inquiry ? oEntry.zsource_of_inquiry.split(" - ")[0] : "";
                            oEntry.zlicense_type = oEntry.zlicense_type ? oEntry.zlicense_type.split(" - ")[0] : "";
                            // delete oEntry.ztype_of_Entity;

                            oEntry.zregion = oEntry.zstate;

                            oModel.create("/ZDD_CUSTOMER", oEntry, {
                                success: function (oData, oResponse) {
                                    that.reqestNo = req_no;
                                    that.custNum = oData.zcustomer_num;
                                    this.getView().getModel("appView").setProperty("/newCustId", oData.zcustomer_num);
                                    //         jQuery.sap.require("sap.m.MessageBox");
                                    // sap.m.MessageBox.success("Customer Id " + this.reqestNo + " saved Successfully");
                                    this.handleSalesData();

                                }.bind(this),
                                error: function (oError) {
                                    this.getView().setBusy(false);
                                }
                            });
                        }
                    }
                } else {
                    MessageBox.error(this.amtValidationMesg);
                }
            },
            submitRequest: function () {
                var that = this;
                // var validFromState = this.getView().byId("orderData193").getAggregation("_views")[0].getContent()[0].getContent()[5].getValueState();
                // var validToState = this.getView().byId("orderData193").getAggregation("_views")[0].getContent()[0].getContent()[7].getValueState();
                // var emailState = this.getView().byId("orderData8").getAggregation("_views")[0].getContent()[0].getContent()[14].getValueState();

                // if(emailState !== 'Error' && validFromState !== 'Error' && validToState !== 'Error'){



                var state = this.handleValidateFormFields();
                if (state == true) {
                    var amtFieldState = this.handleAmtFieldsValidation();
                    if (amtFieldState === true) {
                        var oModel = this.getView().getModel();
                        var oCustomerDetailModel = this.getView().getModel("Customers");
                        delete oCustomerDetailModel.getData().to_zdd_sale;
                        delete oCustomerDetailModel.getData().to_zdd_comments;
                        var oEntry = oCustomerDetailModel.getData();

                        var creditLimitType = this.getView().getModel("appView").getProperty("/selectedType");

                        if (creditLimitType === "Secured Credit Limit" || creditLimitType === "Secured Credit") {
                            oEntry.zcredit_limit_type = "Secured Credit";
                        } else if (creditLimitType === "UnSecured Credit Limit" || creditLimitType === "UnSecured Credit") {
                            oEntry.zcredit_limit_type = "UnSecured Credit";
                        } else {
                            oEntry.zcredit_limit_type = "Both";
                        }
                        this.handleAmtFields();

                        // if (this.mode == "edit" || this.custNum) {
                        if (this.mode == "edit") {
                            // oEntry.zsales_orgnization =  this.getView().getModel("salesModel").getData().length > 0 ? this.getView().getModel("salesModel").getData()[0].zsales_orgnization.split(" - ")[0] : "";
                            oEntry.zrequest_type = "Create Customer";
                            oEntry.zrequest_status = "In Progress";
                            delete oEntry.zindividual_paymen;
                            delete oEntry.ztelephone_country_number_exte;
                            delete oEntry.zfax_country_number_extension;
                            delete oEntry.zhouse_number;
                            delete oEntry.zindividual_paymen;
                            delete oEntry.zamount_insured;
                            delete oEntry.to_comments;
                            delete oEntry.to_salesarea;
                            delete oEntry.zmobile_country_number;

                            delete oEntry.BusinessPartnerDD;
                            delete oEntry.BPRoles;
                            delete oEntry.requests;
                            delete oEntry.EntryCollection;

                            // oEntry.zcredit_limit_type = this.getView().getModel("appView").getProperty("/selectedType") === 0 ? "Secured Credit" : "UnSecured Credit";
                            // if (this.getView().byId("CreditProfileSection2").getAggregation("_views") !== null) {
                            //     oEntry.zblockedincm = this.getView().byId("CreditProfileSection2").getAggregation("_views")[0].getContent()[0].getContent()[1].getSelected() ? 'Y' : 'N';
                            //     oEntry.zspecialattention = this.getView().byId("CreditProfileSection2").getAggregation("_views")[0].getContent()[0].getContent()[3].getSelected() ? 'Y' : 'N';
                            // }
                            if (this.getView().byId("orderData13").getAggregation("_views") !== null) {
                                oEntry.zroute_audit_is_performed = this.getView().byId("orderData13").getAggregation("_views")[0].getContent()[0].getContent()[25].getSelected() ? 'Y' : 'N';
                            }
                            //oEntry.zbusiness_partner_id_grouping = this.getView().getModel("appView").getProperty("/bpg");
                            oEntry.zdescription = this.getView().getModel("appView").getProperty("/vertical") === 'CASH' ? 'CASH' : 'CREDIT';
                            oEntry.ztype_of_customer = oEntry.zdescription;
                            // oEntry.zcountry = this.getView().byId("orderData9").getAggregation("_views")[0].getContent()[0].getContent()[3].getValue().split(" - ")[0];
                            // oEntry.zblock_reason = this.getView().byId("CreditProfileSection2").getAggregation("_views") !== null ? this.getView().byId("CreditProfileSection2").getAggregation("_views")[0].getContent()[0].getContent()[5].getValue().split(" - ")[0] : "";

                            // if (this.getView().byId("CreditProfileSection4").getAggregation("_views") !== null) {
                            //     oEntry.zdata_outdated = this.getView().byId("CreditProfileSection4").getAggregation("_views")[0].getContent()[0].getContent()[2].getSelected() ? 'Y' : 'N';
                            // }
                            if (this.getView().byId("Planned6").getAggregation("_views") !== null) {
                                oEntry.zproxima = this.getView().byId("Planned6").getAggregation("_views")[0].getContent()[0].getContent()[9].getSelected() ? 'Y' : 'N';
                            }
                            // if (this.getView().byId("salesAreadata15").getAggregation("_views") !== null) {
                            //     oEntry.zcredit_control_area = this.getView().byId("salesAreadata15").getAggregation("_views")[0].getContent()[0].getContent()[7].getValue().split(" - ")[0];
                            //     // oEntry.zpayment_terms = this.getView().byId("salesAreadata15").getAggregation("_views")[0].getContent()[0].getContent()[5].getValue().split(" ")[0];
                            // }
                            // if (this.getView().byId("CreditAnalysisView").getAggregation("_views") !== null) {
                            //     oEntry.zcountry_rating = this.getView().byId("CreditAnalysisView").getAggregation("_views")[0].getContent()[0].getContent()[23].getValue().split(" ; ")[0];
                            // }
                            // if (this.getView().byId("Planned4").getAggregation("_views") !== null) {
                            //     oEntry.ztotal_credit_amount = this.getView().byId("Planned4").getAggregation("_views")[0].getContent()[0].getContent()[5].getValue().toString();
                            // }
                            // if(this.getView().byId("erpCustomersydata7").getAggregation("_views") !== null){
                            // oEntry.zterms_of_payment = this.getView().byId("erpCustomersydata7").getAggregation("_views")[0].getContent()[0].getContent()[1].getValue().split(' ')[0];
                            // }   
                            // if (this.getView().getModel("Customers").getData().zpayment_terms !== "") {
                            //     oEntry.zpayment_terms = oEntry.zpayment_terms.split(" ")[0];
                            // }
                            var custData = this.getView().getModel("Customers").getData();
                            this.reqNumber = custData.zrequest_no;
                            if (custData.zdate_founded && custData.zdate_founded.length < 13) {
                                oEntry.zdate_founded = oEntry.zdate_founded ? this.dateFormatter(oEntry.zdate_founded) : null;
                            }
                            if (custData.zliquidationdate && custData.zliquidationdate.length < 13) {
                                oEntry.zliquidationdate = oEntry.zliquidationdate ? this.dateFormatter(oEntry.zliquidationdate) : null;
                            }
                            if (custData.zdate && custData.zdate.length < 13) {
                                oEntry.zdate = oEntry.zdate ? this.dateFormatter(oEntry.zdate) : null;
                            }
                            if (custData.zvalidity_to && custData.zvalidity_to.length < 13) {
                                oEntry.zvalidity_to = oEntry.zvalidity_to ? this.dateFormatter(oEntry.zvalidity_to) : null;
                            }
                            if (custData.zvalid_from && custData.zvalid_from.length < 13) {
                                oEntry.zvalid_from = oEntry.zvalid_from ? this.dateFormatter(oEntry.zvalid_from) : null;
                            }
                            if (custData.zvalid_to && custData.zvalid_to.length < 13) {
                                oEntry.zvalid_to = oEntry.zvalid_to ? this.dateFormatter(oEntry.zvalid_to) : null;
                            }
                            if (custData.zentry_date && custData.zentry_date.length < 13) {
                                oEntry.zentry_date = oEntry.zentry_date ? this.dateFormatter(oEntry.zentry_date) : null;
                            }
                            if (custData.zduedate && custData.zduedate.length < 13) {
                                oEntry.zduedate = oEntry.zduedate ? this.dateFormatter(oEntry.zduedate) : null;
                            }
                            //oEntry.zcreated_date = oEntry.zcreated_date ? this.dateFormatter(oEntry.zcreated_date) : null;
                            if (custData.zupdated_date && custData.zupdated_date.length < 13) {
                                oEntry.zupdated_date = oEntry.zupdated_date ? this.dateFormatter(oEntry.zupdated_date) : null;
                            }
                            if (custData.zfinalizedon && custData.zfinalizedon.length < 13) {
                                oEntry.zfinalizedon = oEntry.zfinalizedon ? this.dateFormatter(oEntry.zfinalizedon) : null;
                            }
                            if (custData.zlast_key_date && custData.zlast_key_date.length < 13) {
                                oEntry.zlast_key_date = oEntry.zlast_key_date ? this.dateFormatter(oEntry.zlast_key_date) : null;
                            }
                            if (custData.zpayment_on && custData.zpayment_on.length < 13) {
                                oEntry.zpayment_on = oEntry.zpayment_on ? this.dateFormatter(oEntry.zpayment_on) : null;
                            }
                            if (custData.zcreated_date && custData.zcreated_date.length < 13) {
                                oEntry.zcreated_date = oEntry.zcreated_date ? this.dateFormatter(oEntry.zcreated_date) : null;
                            }
                            if (custData.zcl_validity_proposed_date && custData.zcl_validity_proposed_date.length < 13) {
                                oEntry.zcl_validity_proposed_date = oEntry.zcl_validity_proposed_date ? this.dateFormatter(oEntry.zcl_validity_proposed_date) : null;
                            }
                            if (custData.zresubmission_on && custData.zresubmission_on.length < 13) {
                                oEntry.zresubmission_on = oEntry.zresubmission_on ? this.dateFormatter(oEntry.zresubmission_on) : null;
                            }
                            if (custData.zvalid_passport_date && custData.zvalid_passport_date.length < 13) {
                                oEntry.zvalid_passport_date = oEntry.zvalid_passport_date ? this.dateFormatter(oEntry.zvalid_passport_date) : null;
                            }
                            if (custData.zvisa_valid_date && custData.zvisa_valid_date.length < 13) {
                                oEntry.zvisa_valid_date = oEntry.zvisa_valid_date ? this.dateFormatter(oEntry.zvisa_valid_date) : null;
                            }
                            // if (custData.znet_due_date && custData.znet_due_date.length < 13) {
                            //     oEntry.znet_due_date = oEntry.znet_due_date ? this.dateFormatter(oEntry.znet_due_date) : null;
                            // }

                            delete oEntry.to_credit;
                            oEntry.zstate = oEntry.zstate ? oEntry.zstate.split(" - ")[0] : "";
                            oEntry.zcountry = oEntry.zcountry ? oEntry.zcountry.split(" - ")[0] : "";
                            oEntry.ztransportation_zone = oEntry.ztransportation_zone ? oEntry.ztransportation_zone.split(" - ")[0] : "";
                            oEntry.zreason_code_conversion = oEntry.zreason_code_conversion ? oEntry.zreason_code_conversion.split(" - ")[0] : "";
                            oEntry.zselection_rule = oEntry.zselection_rule ? oEntry.zselection_rule.split(" - ")[0] : "";
                            oEntry.zlanguage = oEntry.zlanguage ? oEntry.zlanguage.split(" - ")[0] : "";
                            oEntry.zcompany_code = oEntry.zcompany_code ? oEntry.zcompany_code.split(" - ")[0] : "";
                            oEntry.zar_pledging_indicator = oEntry.zar_pledging_indicator ? oEntry.zar_pledging_indicator.split(" - ")[0] : "";
                            oEntry.zgrouping_key = oEntry.zgrouping_key ? oEntry.zgrouping_key.split(" - ")[0] : "";
                            oEntry.zaccounting_clerk = oEntry.zaccounting_clerk ? oEntry.zaccounting_clerk.split(" - ")[0] : "";
                            oEntry.zaccount_statement = oEntry.zaccount_statement ? oEntry.zaccount_statement.split(" - ")[0] : "";
                            oEntry.zselection_rule = oEntry.zselection_rule ? oEntry.zselection_rule.split(" - ")[0] : "";
                            oEntry.zreason_code_conversion = oEntry.zreason_code_conversion ? oEntry.zreason_code_conversion.split(" - ")[0] : "";
                            oEntry.zhouse_bank = oEntry.zhouse_bank ? oEntry.zhouse_bank.split(" - ")[0] : "";
                            oEntry.zpayment_method_supplement = oEntry.zpayment_method_supplement ? oEntry.zpayment_method_supplement.split(" - ")[0] : "";
                            oEntry.znegotiated_leave = oEntry.zknown_egotiated_leave ? oEntry.zknown_egotiated_leave.split(" - ")[0] : "";
                            oEntry.zinterest_indicator = oEntry.zinterest_indicator ? oEntry.zinterest_indicator.split(" - ")[0] : "";
                            oEntry.zrelease_group = oEntry.zrelease_group ? oEntry.zrelease_group.split(" - ")[0] : "";
                            oEntry.zplanning_group = oEntry.zplanning_group ? oEntry.zplanning_group.split(" - ")[0] : "";
                            oEntry.zsort_key = oEntry.zsort_key ? oEntry.zsort_key.split(" - ")[0] : "";
                            oEntry.zvalue_adjustment = oEntry.zvalue_adjustment ? oEntry.zvalue_adjustment.split(" - ")[0] : "";
                            oEntry.zauthorization_group = oEntry.zauthorization_group ? oEntry.zauthorization_group.split(" - ")[0] : "";
                            oEntry.zhead_office = oEntry.zhead_office ? oEntry.zhead_office.split(" - ")[0] : "";
                            oEntry.zcustomer_legal_name = oEntry.zcustomer_legal_name ? oEntry.zcustomer_legal_name.split(" - ")[0] : "";
                            oEntry.zcredit_limit_currency = oEntry.zcredit_limit_currency ? oEntry.zcredit_limit_currency.split(" - ")[0] : "";
                            oEntry.ztype_of_entity = oEntry.ztype_of_entity ? oEntry.ztype_of_entity.split(" - ")[0] : "";
                            oEntry.zsource_of_inquiry = oEntry.zsource_of_inquiry ? oEntry.zsource_of_inquiry.split(" - ")[0] : "";
                            oEntry.zlicense_type = oEntry.zlicense_type ? oEntry.zlicense_type.split(" - ")[0] : "";
                            if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("Intercompany")) {
                                oEntry.zbusiness_partner_grouping = "Z070";
                            }
                            else if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("Sold")) {
                                oEntry.zbusiness_partner_grouping = "BP01"
                            }
                            else if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("Ship")) {
                                oEntry.zbusiness_partner_grouping = "BP02"
                            }
                            else if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("One")) {
                                oEntry.zbusiness_partner_grouping = "BP08"
                            }
                            oEntry.zregion = oEntry.zstate;
                            // delete oEntry.ztype_of_Entity;
                            oModel.update(this.sPath, oEntry, {
                                success: function (oData, oResponse) {
                                    // jQuery.sap.require("sap.m.MessageBox");
                                    // sap.m.MessageBox.success("Customer Id " + this.getView().getModel("Customers").getData().zrequest_no + " saved Successfully");
                                    this.handleSalesData();
                                    if (oEntry.zdescription !== 'CASH') {
                                        var sCreatedAt = "";
                                        if (oEntry.zcreated_date) {
                                            if (oEntry.zcreated_date.getDate() < 10) {
                                                sCreatedAt += "0" + oEntry.zcreated_date.getDate() + ".";
                                            } else {
                                                sCreatedAt += oEntry.zcreated_date.getDate() + ".";
                                            }
                                            if ((oEntry.zcreated_date.getMonth() + 1) < 10) {
                                                sCreatedAt += "0" + (oEntry.zcreated_date.getMonth() + 1);
                                            } else {
                                                sCreatedAt += (oEntry.zcreated_date.getMonth() + 1);
                                            }
                                            sCreatedAt += "." + oEntry.zcreated_date.getFullYear();
                                        }

                                        var sLinkToTask = that.createLinkToTask();

                                        var oWFModel = this.getOwnerComponent().getModel("Workflow");
                                        var body = {
                                            "definitionId": "eu10.iffcodevprocessautomation.iffcocustomerservices.iFFCOCustomerCreate",
                                            "context": {
                                                "requesttype": "create",
                                                "customerid": oEntry.zcustomer_num,
                                                "customername": oEntry.zfirst_name,
                                                "customersitename": oEntry.zfirst_name,
                                                "customercountry": oEntry.zcountry,
                                                "businessunit": oEntry.zbusiness_unit_name,
                                                "createdbyuserid": oEntry.zcreated_by,
                                                "createdbyname": oEntry.zcreated_by,
                                                "createdbyrole": "Sales Person",
                                                "createdon": sCreatedAt,
                                                "salesorganizationid": this.getView().getModel("salesDataModel").getData().length !== 0 ? this.getView().getModel("salesDataModel").getData()[0].zsales_orgnization.split(" - ")[0] : "",
                                                "linktotask": sLinkToTask,
                                                "testmode": true,
                                                "bulkdocumentid": "",
                                                "requestid": that.reqNumber,
                                                "channel": oEntry.zchannel
                                            }
                                        };
                                        oWFModel.create("/createWF", { body: JSON.stringify(body) }, {
                                            success: function (oData) {
                                                sap.m.MessageToast.show("Customer is submitted Successfully");
                                            },
                                            error: function (oError) {
                                                sap.m.MessageToast.show("Error while initiating workflow request!");
                                            }
                                        });
                                    }
                                }.bind(this),

                                error: function (oError) {
                                    that.getView().getModel("Customers").setProperty("/zrequest_status", "In Draft");
                                    MessageBox.error(oError.message);


                                }
                            });

                        } else {
                            var req_no = Math.floor(1000 + Math.random() * 9000) + "";
                            oEntry.zrequest_no = req_no;

                            oEntry.zrequest_type = "Create Customer";
                            oEntry.zrequest_status = "In Progress";
                            delete oEntry.zindividual_paymen;
                            delete oEntry.ztelephone_country_number_exte;
                            delete oEntry.zfax_country_number_extension;
                            delete oEntry.zhouse_number;
                            delete oEntry.zindividual_paymen;
                            delete oEntry.zamount_insured;
                            delete oEntry.to_comments;
                            delete oEntry.to_salesarea;
                            delete oEntry.zmobile_country_number;
                            delete oEntry.BusinessPartnerDD;
                            delete oEntry.BPRoles;
                            delete oEntry.requests;
                            delete oEntry.EntryCollection;

                            // oEntry.zsales_orgnization =  this.getView().getModel("salesModel").getData().length > 0 ? this.getView().getModel("salesModel").getData()[0].zsales_orgnization.split(" - ")[0] : "";

                            // oEntry.zcredit_limit_type = this.getView().getModel("appView").getProperty("/selectedType") === 0 ? "Secured Credit" : "UnSecured Credit";
                            // if (this.getView().byId("CreditProfileSection2").getAggregation("_views") !== null) {
                            //     oEntry.zblockedincm = this.getView().byId("CreditProfileSection2").getAggregation("_views")[0].getContent()[0].getContent()[1].getSelected() ? 'Y' : 'N';
                            //     oEntry.zspecialattention = this.getView().byId("CreditProfileSection2").getAggregation("_views")[0].getContent()[0].getContent()[3].getSelected() ? 'Y' : 'N';
                            // }
                            if (this.getView().byId("orderData13").getAggregation("_views") !== null) {
                                oEntry.zroute_audit_is_performed = this.getView().byId("orderData13").getAggregation("_views")[0].getContent()[0].getContent()[25].getSelected() ? 'Y' : 'N';
                            }
                            // oEntry.zbusiness_partner_id_grouping = this.getView().getModel("appView").getProperty("/bpg");
                            oEntry.zdescription = this.getView().getModel("appView").getProperty("/vertical") === 'CASH' ? 'CASH' : 'CREDIT';
                            oEntry.ztype_of_customer = oEntry.zdescription;
                            // oEntry.zcountry = this.getView().byId("orderData9").getAggregation("_views")[0].getContent()[0].getContent()[3].getValue().split(" - ")[0];
                            // oEntry.zblock_reason = this.getView().byId("CreditProfileSection2").getAggregation("_views") !== null ? this.getView().byId("CreditProfileSection2").getAggregation("_views")[0].getContent()[0].getContent()[5].getValue().split(" - ")[0] : "";

                            // if (this.getView().byId("CreditProfileSection4").getAggregation("_views") !== null) {
                            //     oEntry.zdata_outdated = this.getView().byId("CreditProfileSection4").getAggregation("_views")[0].getContent()[0].getContent()[2].getSelected() ? 'Y' : 'N';
                            // }
                            if (this.getView().byId("Planned6").getAggregation("_views") !== null) {
                                oEntry.zproxima = this.getView().byId("Planned6").getAggregation("_views")[0].getContent()[0].getContent()[9].getSelected() ? 'Y' : 'N';
                            }
                            var custData = this.getView().getModel("Customers").getData();
                            if (custData.zdate_founded && custData.zdate_founded.length < 13) {
                                oEntry.zdate_founded = oEntry.zdate_founded ? this.dateFormatter(oEntry.zdate_founded) : null;
                            }
                            if (custData.zliquidationdate && custData.zliquidationdate.length < 13) {
                                oEntry.zliquidationdate = oEntry.zliquidationdate ? this.dateFormatter(oEntry.zliquidationdate) : null;
                            }
                            if (custData.zdate && custData.zdate.length < 13) {
                                oEntry.zdate = oEntry.zdate ? this.dateFormatter(oEntry.zdate) : null;
                            }
                            if (custData.zvalidity_to && custData.zvalidity_to.length < 13) {
                                oEntry.zvalidity_to = oEntry.zvalidity_to ? this.dateFormatter(oEntry.zvalidity_to) : null;
                            }
                            if (custData.zvalid_from && custData.zvalid_from.length < 13) {
                                oEntry.zvalid_from = oEntry.zvalid_from ? this.dateFormatter(oEntry.zvalid_from) : null;
                            }
                            if (custData.zvalid_to && custData.zvalid_to.length < 13) {
                                oEntry.zvalid_to = oEntry.zvalid_to ? this.dateFormatter(oEntry.zvalid_to) : null;
                            }
                            if (custData.zentry_date && custData.zentry_date.length < 13) {
                                oEntry.zentry_date = oEntry.zentry_date ? this.dateFormatter(oEntry.zentry_date) : null;
                            }
                            if (custData.zduedate && custData.zduedate.length < 13) {
                                oEntry.zduedate = oEntry.zduedate ? this.dateFormatter(oEntry.zduedate) : null;
                            }
                            //oEntry.zcreated_date = oEntry.zcreated_date ? this.dateFormatter(oEntry.zcreated_date) : null;
                            if (custData.zupdated_date && custData.zupdated_date.length < 13) {
                                oEntry.zupdated_date = oEntry.zupdated_date ? this.dateFormatter(oEntry.zupdated_date) : null;
                            }
                            if (custData.zfinalizedon && custData.zfinalizedon.length < 13) {
                                oEntry.zfinalizedon = oEntry.zfinalizedon ? this.dateFormatter(oEntry.zfinalizedon) : null;
                            }
                            if (custData.zlast_key_date && custData.zlast_key_date.length < 13) {
                                oEntry.zlast_key_date = oEntry.zlast_key_date ? this.dateFormatter(oEntry.zlast_key_date) : null;
                            }
                            if (custData.zpayment_on && custData.zpayment_on.length < 13) {
                                oEntry.zpayment_on = oEntry.zpayment_on ? this.dateFormatter(oEntry.zpayment_on) : null;
                            }
                            if (custData.zcreated_date && custData.zcreated_date.length < 13) {
                                oEntry.zcreated_date = oEntry.zcreated_date ? this.dateFormatter(oEntry.zcreated_date) : null;
                            }
                            if (custData.zcl_validity_proposed_date && custData.zcl_validity_proposed_date.length < 13) {
                                oEntry.zcl_validity_proposed_date = oEntry.zcl_validity_proposed_date ? this.dateFormatter(oEntry.zcl_validity_proposed_date) : null;
                            }
                            if (custData.zresubmission_on && custData.zresubmission_on.length < 13) {
                                oEntry.zresubmission_on = oEntry.zresubmission_on ? this.dateFormatter(oEntry.zresubmission_on) : null;
                            }
                            if (custData.zvalid_passport_date && custData.zvalid_passport_date.length < 13) {
                                oEntry.zvalid_passport_date = oEntry.zvalid_passport_date ? this.dateFormatter(oEntry.zvalid_passport_date) : null;
                            }
                            if (custData.zvisa_valid_date && custData.zvisa_valid_date.length < 13) {
                                oEntry.zvisa_valid_date = oEntry.zvisa_valid_date ? this.dateFormatter(oEntry.zvisa_valid_date) : null;
                            }
                            // if (custData.znet_due_date && custData.znet_due_date.length < 13) {
                            //     oEntry.znet_due_date = oEntry.znet_due_date ? this.dateFormatter(oEntry.znet_due_date) : null;
                            // }
                            oEntry.zstate = oEntry.zstate ? oEntry.zstate.split(" - ")[0] : "";
                            oEntry.zcountry = oEntry.zcountry ? oEntry.zcountry.split(" - ")[0] : "";
                            oEntry.ztransportation_zone = oEntry.ztransportation_zone ? oEntry.ztransportation_zone.split(" - ")[0] : "";
                            oEntry.zreason_code_conversion = oEntry.zreason_code_conversion ? oEntry.zreason_code_conversion.split(" - ")[0] : "";
                            oEntry.zselection_rule = oEntry.zselection_rule ? oEntry.zselection_rule.split(" - ")[0] : "";
                            oEntry.zlanguage = oEntry.zlanguage ? oEntry.zlanguage.split(" - ")[0] : "";
                            oEntry.zcompany_code = oEntry.zcompany_code ? oEntry.zcompany_code.split(" - ")[0] : "";
                            oEntry.zar_pledging_indicator = oEntry.zar_pledging_indicator ? oEntry.zar_pledging_indicator.split(" - ")[0] : "";
                            oEntry.zgrouping_key = oEntry.zgrouping_key ? oEntry.zgrouping_key.split(" - ")[0] : "";
                            oEntry.zaccounting_clerk = oEntry.zaccounting_clerk ? oEntry.zaccounting_clerk.split(" - ")[0] : "";
                            oEntry.zaccount_statement = oEntry.zaccount_statement ? oEntry.zaccount_statement.split(" - ")[0] : "";
                            oEntry.zselection_rule = oEntry.zselection_rule ? oEntry.zselection_rule.split(" - ")[0] : "";
                            oEntry.zreason_code_conversion = oEntry.zreason_code_conversion ? oEntry.zreason_code_conversion.split(" - ")[0] : "";
                            oEntry.zhouse_bank = oEntry.zhouse_bank ? oEntry.zhouse_bank.split(" - ")[0] : "";
                            oEntry.zpayment_method_supplement = oEntry.zpayment_method_supplement ? oEntry.zpayment_method_supplement.split(" - ")[0] : "";
                            oEntry.znegotiated_leave = oEntry.zknown_egotiated_leave ? oEntry.zknown_egotiated_leave.split(" - ")[0] : "";
                            oEntry.zinterest_indicator = oEntry.zinterest_indicator ? oEntry.zinterest_indicator.split(" - ")[0] : "";
                            oEntry.zrelease_group = oEntry.zrelease_group ? oEntry.zrelease_group.split(" - ")[0] : "";
                            oEntry.zplanning_group = oEntry.zplanning_group ? oEntry.zplanning_group.split(" - ")[0] : "";
                            oEntry.zsort_key = oEntry.zsort_key ? oEntry.zsort_key.split(" - ")[0] : "";
                            oEntry.zvalue_adjustment = oEntry.zvalue_adjustment ? oEntry.zvalue_adjustment.split(" - ")[0] : "";
                            oEntry.zauthorization_group = oEntry.zauthorization_group ? oEntry.zauthorization_group.split(" - ")[0] : "";
                            oEntry.zhead_office = oEntry.zhead_office ? oEntry.zhead_office.split(" - ")[0] : "";
                            oEntry.zcustomer_legal_name = oEntry.zcustomer_legal_name ? oEntry.zcustomer_legal_name.split(" - ")[0] : "";
                            oEntry.zcredit_limit_currency = oEntry.zcredit_limit_currency ? oEntry.zcredit_limit_currency.split(" - ")[0] : "";
                            oEntry.ztype_of_entity = oEntry.ztype_of_entity ? oEntry.ztype_of_entity.split(" - ")[0] : "";
                            oEntry.zsource_of_inquiry = oEntry.zsource_of_inquiry ? oEntry.zsource_of_inquiry.split(" - ")[0] : "";
                            oEntry.zlicense_type = oEntry.zlicense_type ? oEntry.zlicense_type.split(" - ")[0] : "";
                            // delete oEntry.ztype_of_Entity;
                            if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("Intercompany")) {
                                oEntry.zbusiness_partner_grouping = "Z070";
                            }
                            else if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("Sold")) {
                                oEntry.zbusiness_partner_grouping = "BP01"
                            }
                            else if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("Ship")) {
                                oEntry.zbusiness_partner_grouping = "BP02"
                            }
                            else if (this.getView().getModel("appView").getProperty("/bpg").split(" ")[0].includes("One")) {
                                oEntry.zbusiness_partner_grouping = "BP08"
                            }
                            oEntry.zregion = oEntry.zstate;
                            oModel.create("/ZDD_CUSTOMER", oEntry, {
                                success: function (oData, oResponse) {
                                    this.custNum = oData.zcustomer_num;
                                    this.reqNumber = oData.zrequest_no;

                                    //      jQuery.sap.require("sap.m.MessageBox");
                                    // sap.m.MessageBox.success("Customer Id " + this.reqestNo + " saved Successfully");
                                    this.handleSalesData();
                                    this.getView().getModel("appView").setProperty("/newCustId", oData.zcustomer_num);
                                    if (oData.zdescription !== 'CASH') {
                                        var sCreatedAt = "";
                                        if (oData.zcreated_date) {
                                            if (oData.zcreated_date.getDate() < 10) {
                                                sCreatedAt += "0" + oData.zcreated_date.getDate() + ".";
                                            } else {
                                                sCreatedAt += oData.zcreated_date.getDate() + ".";
                                            }
                                            if ((oData.zcreated_date.getMonth() + 1) < 10) {
                                                sCreatedAt += "0" + (oData.zcreated_date.getMonth() + 1);
                                            } else {
                                                sCreatedAt += (oData.zcreated_date.getMonth() + 1);
                                            }
                                            sCreatedAt += "." + oData.zcreated_date.getFullYear();
                                        }

                                        var sLinkToTask = that.createLinkToTask();

                                        var oWFModel = this.getOwnerComponent().getModel("Workflow");
                                        var body = {
                                            "definitionId": "eu10.iffcodevprocessautomation.iffcocustomerservices.iFFCOCustomerCreate",
                                            "context": {
                                                "requesttype": "create",
                                                "customerid": that.custNum,
                                                "customername": oData.zfirst_name,
                                                "customersitename": oData.zfirst_name,
                                                "customercountry": oData.zcountry,
                                                "businessunit": oData.zbusiness_unit_name,
                                                "createdbyuserid": oData.zcreated_by,
                                                "createdbyname": oData.zcreated_by,
                                                "createdbyrole": "Sales Person",
                                                "createdon": sCreatedAt,
                                                "salesorganizationid": oData.zsales_orgnization ? oData.zsales_orgnization : "",
                                                "linktotask": sLinkToTask,
                                                "testmode": true,
                                                "bulkdocumentid": "",
                                                "requestid": that.reqNumber,
                                                "channel": oData.zchannel
                                            }
                                        };
                                        oWFModel.create("/createWF", { body: JSON.stringify(body) }, {
                                            success: function (oData) {
                                                sap.m.MessageToast.show("Customer is submitted Successfully");
                                            },
                                            error: function (oError) {
                                                sap.m.MessageToast.show("Error while initiating workflow request!");
                                            }
                                        });
                                    }

                                    // this.handleSalesData();

                                }.bind(this),

                                error: function (oError) {
                                    that.getView().getModel("Customers").setProperty("/zrequest_status", "In Draft");
                                    MessageBox.error(oError.message);
                                }
                            });
                        }
                    } else {
                        MessageBox.error(this.amtValidationMesg);
                    }
                } else {
                    that.getView().setBusy(false);
                    MessageBox.error(this.ValidationMesg);
                }

            },

            dateFormatter: function (value) {
                if (value.length < 15) {
                    var sNotifDate = new Date(value.toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
                    return sNotifDate;
                } else return "";
            },
            handleSalesData: function (evt) {
                var that = this;
                var serviceURL = this.getOwnerComponent().getModel().sServiceUrl;
                var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);

                this.salesPath = "/ZDD_CUST_SALESAREAS";

                var salesEntry = this.getView().getModel("salesDataModel").getData();
                var batchSalesChanges = [];

                salesEntry.forEach(function (obj, index) {
                    if (obj.Flag == undefined) {

                        obj.zcustomer_num = this.custNum == undefined ? this.zcustomer_num : this.custNum;

                    }
                }.bind(this));

                salesEntry.forEach(function (obj, index) {

                    if (obj.Flag == undefined) {
                        obj.zsales_area_id = index.toString();
                        obj.zsales_orgnization = obj.zsales_orgnization ? obj.zsales_orgnization.split(" - ")[0] : "";
                        // obj.zsales_orgnization_text = obj.zsales_orgnization ? obj.zsales_orgnization.split(" - ")[1] : "";

                        obj.zdistribution_channel = obj.zdistribution_channel ? obj.zdistribution_channel.split(" - ")[0] : "";
                        // obj.zdistribution_channel_text = obj.zdistribution_channel ? obj.zdistribution_channel.split(" - ")[1] : "";

                        obj.zdivision = obj.zdivision ? obj.zdivision.split(" - ")[0] : "";
                        // obj.zdivision_text = obj.zdivision ? obj.zdivision.split(" - ")[0] : "";

                        obj.zinvoicing_dates = obj.zinvoicing_dates ? obj.zinvoicing_dates.split(" - ")[0] : "";
                        obj.zinvoicing_list_dates = obj.zinvoicing_list_dates ? obj.zinvoicing_list_dates.split(" - ")[0] : "";
                        obj.zcustomer_group1 = obj.zcustomer_group1 ? obj.zcustomer_group1.split(" - ")[0] : "";
                        // obj.zcustomer_group1_text = obj.zcustomer_group1 ? obj.zcustomer_group1.split(" - ")[1] : "";
                        obj.zcustomer_group2 = obj.zcustomer_group2 ? obj.zcustomer_group2.split(" - ")[0] : "";
                        // obj.zcustomer_group2_text = obj.zcustomer_group1 ? obj.zcustomer_group1.split(" - ")[1] : "";
                        obj.zcustomer_group3 = obj.zcustomer_group3 ? obj.zcustomer_group3.split(" - ")[0] : "";
                        // obj.zcustomer_group3_text = obj.zcustomer_group1 ? obj.zcustomer_group1.split(" - ")[1] : "";
                        obj.zcustomer_group4 = obj.zcustomer_group4 ? obj.zcustomer_group4.split(" - ")[0] : "";
                        // obj.zcustomer_group4_text = obj.zcustomer_group1 ? obj.zcustomer_group1.split(" - ")[1] : "";
                        obj.zcustomer_group5 = obj.zcustomer_group5 ? obj.zcustomer_group5.split(" - ")[0] : "";
                        // obj.zcustomer_group5_text = obj.zcustomer_group1 ? obj.zcustomer_group1.split(" - ")[1] : "";
                        obj.zcustomer_group = obj.zcustomer_group ? obj.zcustomer_group.split(" - ")[0] : "";
                        // obj.zcustomer_group_text = obj.zcustomer_group1 ? obj.zcustomer_group1.split(" - ")[1] : "";
                        // obj.zinco_term = obj.zsales_orgnization ? obj.zinco_term.split(" - ")[0] : "";
                        obj.zcredit_control_area = obj.zcredit_control_area ? obj.zcredit_control_area.split(" - ")[0] : "";
                        // obj.zcredit_control_area_desc = obj.zcredit_control_area ? obj.zcredit_control_area.split(" - ")[1] : "";

                        obj.zprice_group = obj.zprice_group ? obj.zprice_group.split(" - ")[0] : "";
                        // obj.zprice_group_text = obj.zprice_group ? obj.zprice_group.split(" - ")[1] : "";
                        // obj.zcredit_control_area = obj.zcredit_control_area ? obj.zcredit_control_area.split(" - ")[0] : "";
                        obj.zpricelist = obj.zpricelist ? obj.zpricelist.split(" - ")[0] : "";
                        obj.zcredit_segment = obj.zcredit_segment ? obj.zcredit_segment.split(" - ")[0] : "";
                        // obj.zpricelist_text = obj.zpricelist ? obj.zpricelist.split(" - ")[1] : "";

                        obj.zprice_procedured_term = obj.zprice_procedured_term ? obj.zprice_procedured_term.split(" - ")[0] : "";
                        obj.zprice_procedured_term_text = obj.zprice_procedured_term ? obj.zprice_procedured_term.split(" - ")[1] : "";

                        obj.ztaxcategory = obj.ztaxcategory ? obj.ztaxcategory.split(" - ")[0] : "";
                        obj.ztax_classification = obj.ztax_classification ? obj.ztax_classification.split(" - ")[0] : "";
                        obj.zdelivery_priority = obj.zdelivery_priority ? obj.zdelivery_priority.split(" - ")[0] : "";
                        //Unit of Measure Group
                        obj.zunit_of_measure_group = obj.zunit_of_measure_group ? obj.zunit_of_measure_group.split(" - ")[0] : "";
                        obj.zexchange_rate_type = obj.zexchange_rate_type ? obj.zexchange_rate_type.split(" - ")[0] : "";
                        obj.zpp_customer_procedure = obj.zpp_customer_procedure ? obj.zpp_customer_procedure.split(" - ")[0] : "";

                        obj.zshipping_conditions = obj.zshipping_conditions ? obj.zshipping_conditions.split(" - ")[0] : "";
                        // obj.zshipping_conditions_text = obj.zshipping_conditions ? obj.zshipping_conditions.split(" - ")[1] : "";
                        // obj.zcredit_control_area = obj.zcredit_control_area ? obj.zcredit_control_area.split(" - ")[0] : "";
                        obj.zdelivery_plant = obj.zdelivery_plant ? obj.zdelivery_plant.split(" - ")[0] : "";
                        // obj.zdelivery_plant_text = obj.zdelivery_plant ? obj.zdelivery_plant.split(" - ")[1] : "";
                        obj.zsales_currency = obj.zsales_currency ? obj.zsales_currency.split(" - ")[0] : "";

                        obj.zauthorization_group = obj.zauthorization_group ? obj.zauthorization_group.split(" - ")[0] : "";
                        // obj.zauthorization_group_text = obj.zauthorization_group ? obj.zauthorization_group.split(" - ")[1] : "";

                        obj.zsales_district = obj.zsales_district ? obj.zsales_district.split(" - ")[0] : "";
                        // obj.zsales_district_text = obj.zsales_district ? obj.zsales_district.split(" - ")[1] : "";


                        obj.zinfo_category = obj.zinfo_category ? obj.zinfo_category.split(" - ")[0] : "";
                        obj.zinfo_type = obj.zinfo_type ? obj.zinfo_type.split(" - ")[0] : "";
                        obj.zblock_reason = obj.zblock_reason ? obj.zblock_reason.split(" - ")[0] : "";

                        obj.zresubmission_on = obj.zresubmission_on ? this.dateFormatter(obj.zresubmission_on) : null;
                        obj.zdate_from = obj.zdate_from ? this.dateFormatter(obj.zdate_from) : null;
                        obj.zdate_to = obj.zdate_to ? this.dateFormatter(obj.zdate_to) : null;
                        obj.zentered_on = obj.zentered_on ? this.dateFormatter(obj.zentered_on) : null;
                        obj.zdeleted_on = obj.zdeleted_on ? this.dateFormatter(obj.zdeleted_on) : null;
                        obj.zvalidity_to = obj.zvalidity_to ? this.dateFormatter(obj.zvalidity_to) : null;
                        obj.zresubmission_date = obj.zresubmission_date ? this.dateFormatter(obj.zresubmission_date) : null;
                        obj.zlimit = obj.zlimit ? obj.zlimit.toString() : '0';
                        var salesVal = this.getView().byId("salesAreadata17").getAggregation("_views")[0].getContent()[0].getContent()[1].getItems();
                        var checkBoxValue = salesVal.length > 0 ? salesVal[index].getItems()[0].getContent()[0].getItems()[0].getContent() : "";

                        //    delete obj.zpayment_terms;

                        // if(checkBoxValue.length > 0){
                        //     obj.zblockedincm = checkBoxValue[123].getSelected() ? 'Y' : 'N';
                        //     obj.zspecialattention = checkBoxValue[125].getSelected() ? 'Y' : 'N';
                        //     obj.zrelevant = checkBoxValue[152].getSelected() ? 'Y' : 'N';
                        // }else{
                        //     obj.zblockedincm = 'N';
                        //     obj.zspecialattention = 'N';
                        //     obj.zrelevant = 'N';
                        // }
                        if (checkBoxValue.length > 0) {
                            if (checkBoxValue[123].getId().includes("box")) {
                                obj.zblockedincm = checkBoxValue[123].getSelected() ? 'Y' : 'N';
                            }
                            if (checkBoxValue[125].getId().includes("box")) {
                                obj.zspecialattention = checkBoxValue[125].getSelected() ? 'Y' : 'N';
                            }
                            if (checkBoxValue[153].getId().includes("box")) {
                                obj.zrelevant = checkBoxValue[153].getSelected() ? 'Y' : 'N';
                            }
                        } else {
                            obj.zblockedincm = 'N';
                            obj.zspecialattention = 'N';
                            obj.zrelevant = 'N';
                        }

                        // delete obj.Flag;
                        batchSalesChanges.push(oModel.createBatchOperation("/ZDD_CUST_SALESAREAS", "POST", obj));
                    } else if (obj.Flag === 'U') {
                        var salesUpdatePath = "/ZDD_CUST_SALESAREAS(zcustomer_num=guid'" + obj.zcustomer_num + "',zsales_orgnization='" + obj.zsales_orgnization + "',zsales_area_id='" + obj.zsales_area_id + "')";
                        // var salesUpdatePath = "/ZDD_CUST_SALESAREAS(zcustomer_num=guid'" + obj.zcustomer_num + "',zsales_area_id='" + obj.zsales_area_id + "')";

                        obj.zsales_orgnization = obj.zsales_orgnization ? obj.zsales_orgnization.split(" - ")[0] : "";


                        obj.zdistribution_channel = obj.zdistribution_channel ? obj.zdistribution_channel.split(" - ")[0] : "";


                        obj.zdivision = obj.zdivision ? obj.zdivision.split(" - ")[0] : "";


                        obj.zinvoicing_dates = obj.zinvoicing_dates ? obj.zinvoicing_dates.split(" - ")[0] : "";
                        obj.zinvoicing_list_dates = obj.zinvoicing_list_dates ? obj.zinvoicing_list_dates.split(" - ")[0] : "";
                        obj.zcustomer_group1 = obj.zcustomer_group1 ? obj.zcustomer_group1.split(" - ")[0] : "";

                        obj.zcustomer_group2 = obj.zcustomer_group2 ? obj.zcustomer_group2.split(" - ")[0] : "";

                        obj.zcustomer_group3 = obj.zcustomer_group3 ? obj.zcustomer_group3.split(" - ")[0] : "";

                        obj.zcustomer_group4 = obj.zcustomer_group4 ? obj.zcustomer_group4.split(" - ")[0] : "";

                        obj.zcustomer_group5 = obj.zcustomer_group5 ? obj.zcustomer_group5.split(" - ")[0] : "";

                        obj.zcustomer_group = obj.zcustomer_group ? obj.zcustomer_group.split(" - ")[0] : "";

                        obj.zcredit_control_area = obj.zcredit_control_area ? obj.zcredit_control_area.split(" - ")[0] : "";

                        obj.zprice_group = obj.zprice_group ? obj.zprice_group.split(" - ")[0] : "";

                        obj.zpricelist = obj.zpricelist ? obj.zpricelist.split(" - ")[0] : "";
                        obj.zcredit_segment = obj.zcredit_segment ? obj.zcredit_segment.split(" - ")[0] : "";


                        obj.zprice_procedured_term = obj.zprice_procedured_term ? obj.zprice_procedured_term.split(" - ")[0] : "";

                        obj.ztaxcategory = obj.ztaxcategory ? obj.ztaxcategory.split(" - ")[0] : "";
                        obj.ztax_classification = obj.ztax_classification ? obj.ztax_classification.split(" - ")[0] : "";
                        obj.zdelivery_priority = obj.zdelivery_priority ? obj.zdelivery_priority.split(" - ")[0] : "";
                        obj.zshipping_conditions = obj.zshipping_conditions ? obj.zshipping_conditions.split(" - ")[0] : "";
                        //Unit of Measure Group
                        obj.zunit_of_measure_group = obj.zunit_of_measure_group ? obj.zunit_of_measure_group.split(" - ")[0] : "";
                        obj.zexchange_rate_type = obj.zexchange_rate_type ? obj.zexchange_rate_type.split(" - ")[0] : "";
                        obj.zpp_customer_procedure = obj.zpp_customer_procedure ? obj.zpp_customer_procedure.split(" - ")[0] : "";

                        obj.zshipping_conditions = obj.zshipping_conditions ? obj.zshipping_conditions.split(" - ")[0] : "";
                        // obj.zshipping_conditions_text = obj.zshipping_conditions ? obj.zshipping_conditions.split(" - ")[1] : "";
                        obj.zdelivery_plant = obj.zdelivery_plant ? obj.zdelivery_plant.split(" - ")[0] : "";
                        obj.zdelivery_plant_text = obj.zdelivery_plant ? obj.zdelivery_plant.split(" - ")[0] : "";
                        obj.zsales_currency = obj.zsales_currency ? obj.zsales_currency.split(" - ")[0] : "";

                        obj.zauthorization_group = obj.zauthorization_group ? obj.zauthorization_group.split(" - ")[0] : "";


                        obj.zsales_district = obj.zsales_district ? obj.zsales_district.split(" - ")[0] : "";



                        obj.zinfo_category = obj.zinfo_category ? obj.zinfo_category.split(" - ")[0] : "";
                        obj.zinfo_type = obj.zinfo_type ? obj.zinfo_type.split(" - ")[0] : "";
                        obj.zblock_reason = obj.zblock_reason ? obj.zblock_reason.split(" - ")[0] : "";

                        if (obj.zresubmission_on === null || typeof obj.zresubmission_on === 'string') {
                            obj.zresubmission_on = obj.zresubmission_on ? this.dateFormatter(obj.zresubmission_on) : null;
                        }

                        if (obj.zdate_from === null || typeof obj.zdate_from === 'string') {
                            obj.zdate_from = obj.zdate_from ? this.dateFormatter(obj.zdate_from) : null;
                        }

                        if (obj.zdate_to === null || typeof obj.zdate_to === 'string') {
                            obj.zdate_to = obj.zdate_to ? this.dateFormatter(obj.zdate_to) : null;
                        }

                        if (obj.zentered_on === null || typeof obj.zentered_on === 'string') {
                            obj.zentered_on = obj.zentered_on ? this.dateFormatter(obj.zentered_on) : null;
                        }

                        if (obj.zdeleted_on === null || typeof obj.zdeleted_on === 'string') {
                            obj.zdeleted_on = obj.zdeleted_on ? this.dateFormatter(obj.zdeleted_on) : null;
                        }

                        if (obj.zvalidity_to === null || typeof obj.zvalidity_to === 'string') {
                            obj.zvalidity_to = obj.zvalidity_to ? this.dateFormatter(obj.zvalidity_to) : null;
                        }

                        if (obj.zresubmission_date === null || typeof obj.zresubmission_date === 'string') {
                            obj.zresubmission_date = obj.zresubmission_date ? this.dateFormatter(obj.zresubmission_date) : null;
                        }

                        // obj.zresubmission_on = obj.zresubmission_on ? this.dateFormatter(obj.zresubmission_on) : null;
                        // obj.zdate_from = obj.zdate_from ? this.dateFormatter(obj.zdate_from) : null;
                        // obj.zdate_to = obj.zdate_to ? this.dateFormatter(obj.zdate_to) : null;
                        // obj.zentered_on = obj.zentered_on ? this.dateFormatter(obj.zentered_on) : null;
                        // obj.zdeleted_on = obj.zdeleted_on ? this.dateFormatter(obj.zdeleted_on) : null;
                        // obj.zvalidity_to = obj.zvalidity_to ? this.dateFormatter(obj.zvalidity_to) : null;
                        // obj.zresubmission_date = obj.zresubmission_date ? this.dateFormatter(obj.zresubmission_date) : null;
                        var salesVal = this.getView().byId("salesAreadata17").getAggregation("_views")[0].getContent()[0].getContent()[1].getItems();
                        var checkBoxValue = salesVal.length > 0 ? salesVal[index].getItems()[0].getContent()[0].getItems()[0].getContent() : "";
                        if (checkBoxValue.length > 0) {
                            if (checkBoxValue[123].getId().includes("box")) {
                                obj.zblockedincm = checkBoxValue[123].getSelected() ? 'Y' : 'N';
                            }
                            if (checkBoxValue[125].getId().includes("box")) {
                                obj.zspecialattention = checkBoxValue[125].getSelected() ? 'Y' : 'N';
                            }
                            if (checkBoxValue[153].getId().includes("box")) {
                                obj.zrelevant = checkBoxValue[153].getSelected() ? 'Y' : 'N';
                            }
                        } else {
                            obj.zblockedincm = 'N';
                            obj.zspecialattention = 'N';
                            obj.zrelevant = 'N';
                        }
                        obj.zlimit = obj.zlimit ? obj.zlimit.toString() : '0';

                        delete obj.Flag;
                        // delete obj.zpayment_terms;
                        batchSalesChanges.push(oModel.createBatchOperation(salesUpdatePath, "PUT", obj));
                    } else if (obj.Flag === 'D') {
                        var salesDeletePath = "/ZDD_CUST_SALESAREAS(zcustomer_num=guid'" + obj.zcustomer_num + "',zsales_orgnization='" + obj.zsales_orgnization + "',zsales_area_id='" + obj.zsales_area_id + "')";
                        oModel.remove(salesDeletePath, {
                            method: "DELETE",
                            success: function (data) {

                            },
                            error: function (e) {
                                jQuery.sap.require("sap.m.MessageBox");
                                sap.m.MessageBox(e);
                            }
                        });
                    }
                }.bind(this));

                oModel.addBatchChangeOperations(batchSalesChanges);
                oModel.submitBatch(function (data) {

                }, function (err) {
                    sap.m.MessageBox.error("Internal Server Error");
                    // that.getView().setBusy(false);
                });


                this.handleCreditSegmentData();

            },
            handleCreditSegmentData: function (evt) {
                var that = this;
                var serviceURL = this.getOwnerComponent().getModel().sServiceUrl;
                var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);

                var creditEntry = this.getView().getModel("creditSegmentModel").getData();
                var batchCreditChanges = [];
                creditEntry.forEach(function (obj, index) {
                    if (obj.Flag == 'A') {
                        obj.zcustomer_num = this.custNum == undefined ? this.zcustomer_num : this.custNum;

                    }
                }.bind(this));

                creditEntry.forEach(function (obj, index) {
                    if (obj.Flag == 'A') {
                        obj.zcredit_id = index.toString();
                        delete obj.Flag;
                        batchCreditChanges.push(oModel.createBatchOperation("/ZCDS_CREDIT_MGT", "POST", obj));
                    }
                });

                oModel.addBatchChangeOperations(batchCreditChanges);
                oModel.submitBatch(function (data) {

                }, function (err) {
                    sap.m.MessageBox.error("Internal Server Error");
                });
                this.handleCommentsData();
            },

            handleCommentsData: function () {

                var that = this;
                this.onConfirm();
                var listItem = this.getOwnerComponent().getModel("commentsModel").getData();
                var serviceURL = this.getOwnerComponent().getModel().sServiceUrl;
                var oModel = new sap.ui.model.odata.ODataModel(serviceURL, true);


                var batchChanges = [];
                listItem.forEach(function (obj, index) {
                    if (obj.Flag == undefined) {
                        obj.zcustomer_num = obj.zcustomer_num = this.custNum == undefined ? this.zcustomer_num : this.custNum;
                    }

                }.bind(this));
                listItem.forEach(function (obj, index) {
                    obj.zcomment_id = index.toString();

                    if (obj.Flag == undefined) {
                        delete obj.Flag;
                        batchChanges.push(oModel.createBatchOperation("/ZDD_CUST_COMMENTS", "POST", obj));
                    }
                });

                oModel.addBatchChangeOperations(batchChanges);

                oModel.submitBatch(function (data) {
                }, function (err) {
                    this.getView().setBusy(false);
                    sap.m.MessageBox.error("Internal Server Error");

                });
                this.getView().setBusy(false);
                var oRouter = this.getOwnerComponent().getRouter();
                this.reqestNo = this.reqestNo ? this.reqestNo : this.getView().getModel("Customers").getData().zrequest_no;
                this.successMesg = this.buttonText === 'save' ? 'saved' : 'submitted';

                if (this.getView().byId("salesAreadata17").getAggregation("_views") !== null) {
                    var panel = this.getView().byId("salesAreadata17").getAggregation("_views")[0].getContent()[0].getContent()[1].getItems();
                }
                if (panel.length > 0) {
                    for (var i = 0; i < panel.length; i++) {
                        panel[i].destroy();
                    }
                }
                this.getView().getModel("appView").setProperty("/generateSale", false);
                this.getView().getModel("appView").setProperty("/addSales", false);

                MessageBox.confirm(
                    "Customer id " + this.reqestNo + " has been " + this.successMesg + " successfully",
                    {
                        actions: [MessageBox.Action.OK],
                        emphasizedAction: MessageBox.Action.OK,
                        onClose: function (sAction) {
                            if (sAction === "OK") {

                                oRouter.navTo("RouteView1");
                            }
                        }
                    })
                //    sap.m.MessageToast.show("Customer id " + this.reqestNo +" has be "+this.successMesg+ " successfully");
                // oRouter.navTo("RouteView1");

            },

            //value Help for Account Assignment Group
            handleValueHelpForAccAssmntGrp: function (evt) {
                this.AccAssGrp = evt.getSource();
                this.AccAssmntGrp.getBinding("items").filter([]);
                this.AccAssmntGrp.open();
            },
            handleValueHelpAccAssignGrpConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.AccAssGrp.setValue(title + " - " + desc);
                // this.busyDialog.close();
            },
            handleValueHelpAccAssignGrpSearch: function (evt) {
                var sValue = evt.getParameter("value");
                if (sValue.length > 0) {
                    if (sValue.length == 2) {
                        var oFilter1 = new sap.ui.model.Filter("Accountgrp", 'Contains', sValue);
                        this.AccAssmntGrp.getBinding("items").filter([oFilter1]);
                    } else {
                        var oFilter2 = new sap.ui.model.Filter("Vtext", 'Contains', sValue);
                        this.AccAssmntGrp.getBinding("items").filter([oFilter2]);
                    }
                } else {
                    this.AccAssmntGrp.getBinding("items").filter([]);
                }
            },
            handleValueHelpAccAssignGrpClose: function (params) {
                this.AccAssmntGrp.close();
            },

            //Value Help for Incoterms
            handleValueHelpForIncoterms: function (evt) {
                this.IncotermsField = evt.getSource();
                this.Incoterms.getBinding("items").filter([]);
                this.Incoterms.open();
            },
            handleValueHelpIncotermsClose: function () {
                this.Incoterms._dialog.close();
            },
            handleValueHelpIncotermsConfirm: function (evt) {
                var title = evt.getParameter("selectedItems")[0].getProperty("title");
                var desc = evt.getParameter("selectedItems")[0].getProperty("description");
                this.IncotermsField.setValue(title + " - " + desc);
                // this.busyDialog.close();
            },
            handleValueHelpIncotermsSearch: function (evt) {
                var sValue = evt.getParameter("value");
                if (sValue.length > 0) {
                    var oFilter1 = new sap.ui.model.Filter("Inco1", 'Contains', sValue);

                    this.Incoterms.getBinding("items").filter([oFilter1]);
                } else {
                    this.Incoterms.getBinding("items").filter([]);
                }
            },

            // //Value Help for Currency
            // handleValueHelpForCurrency: function (evt) {
            //     this.currencyField = evt.getSource();
            //     this.currency.getBinding("items").filter([]);
            //     this.currency.open();
            // },
            // handleValueHelpCurrencyClose: function () {
            //     this.currency._dialog.close();
            // },
            // handleValueHelpCurrencyConfirm: function (evt) {
            //     var title = evt.getParameter("selectedItems")[0].getProperty("title");
            //     var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            //     this.currencyField.setValue(title + " - " + desc);
            // },
            // handleValueHelpCurrencySearch: function (evt) {
            //     var sValue = evt.getParameter("value");
            //     if (sValue.length > 0) {
            //         var oFilter1 = new sap.ui.model.Filter("Waers", 'Contains', sValue);
            //         this.currency.getBinding("items").filter([oFilter1]);
            //     } else {
            //         this.currency.getBinding("items").filter([]);
            //     }
            // },

            //  //Value Help for Shipping Condition
            //  handleValueHelpForShippingCondn: function (evt) {
            //     this.ShpngCndn = evt.getSource();
            //     this.ShippingCondn.getBinding("items").filter([]);
            //     this.ShippingCondn.open();
            // },
            // handleValueHelpShippingCondnConfirm: function (evt) {
            //     var title = evt.getParameter("selectedItems")[0].getProperty("title");
            //     var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            //     this.ShpngCndn.setValue(title + " - " + desc);
            //     this.ShippingCondn.getBinding("items").filter([]);
            //     this.ShippingCondn.close();
            // },
            // handleValueHelpShippingCondnSearch: function (evt) {
            //     var sValue = evt.getParameter("value");
            //     if (sValue.length > 0) {
            //         if (sValue.length == 2) {
            //             var oFilter1 = new sap.ui.model.Filter("Shipping", 'Contains', sValue);
            //             this.ShippingCondn.getBinding("items").filter([oFilter1]);
            //         } else {
            //             var oFilter2 = new sap.ui.model.Filter("Description", 'Contains', sValue);
            //             this.ShippingCondn.getBinding("items").filter([oFilter2]);
            //         }
            //     } else {
            //         this.ShippingCondn.getBinding("items").filter([]);
            //     }
            // },
            // handleValueHelpShippingCondnClose: function (evt) {
            //     this.ShippingCondn.close();
            // },

            // //Value Help for Tax Classification
            // handleValueHelpForTaxClssfn: function (evt) {
            //     this.TaxClass = evt.getSource();
            //     this.TaxClassfn.getBinding("items").filter([]);
            //     this.TaxClassfn.open();
            // },
            // handleValueHelpTaxClassfnConfirm: function (evt) {
            //     var title = evt.getParameter("selectedItems")[0].getProperty("title");
            //     var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            //     this.TaxClass.setValue(title + " - " + desc);
            //     this.TaxClassfn.getBinding("items").filter([]);
            //     this.TaxClassfn.close();
            // },
            // handleValueHelpTaxClassfnSearch: function (evt) {
            //     var sValue = evt.getParameter("value");
            //     if (sValue.length > 0) {
            //         if (sValue.length == 2) {
            //             var oFilter1 = new sap.ui.model.Filter("Taxclassification", 'Contains', sValue);
            //             this.TaxClassfn.getBinding("items").filter([oFilter1]);
            //         } else {
            //             var oFilter2 = new sap.ui.model.Filter("Description", 'Contains', sValue);
            //             this.TaxClassfn.getBinding("items").filter([oFilter2]);
            //         }
            //     } else {
            //         this.TaxClassfn.getBinding("items").filter([]);
            //     }
            // },
            // handleValueHelpTaxClassfnClose: function (evt) {
            //     this.TaxClassfn.close();
            // },
            //  //Value Help for Tax Category
            //  handleValueHelpForTaxCat: function (evt) {
            //     this.TaxCat = evt.getSource();
            //     this.TaxCategory.getBinding("items").filter([]);
            //     this.TaxCategory.open();
            // },
            // handleValueHelpTaxCatConfirm: function (evt) {
            //     var title = evt.getParameter("selectedItems")[0].getProperty("title");
            //     var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            //     this.TaxCat.setValue(title + " - " + desc);
            //     this.TaxCategory.getBinding("items").filter([]);
            //     this.TaxCategory.close();
            // },
            // handleValueHelpTaxCatSearch: function (evt) {
            //     var sValue = evt.getParameter("value");
            //     if (sValue.length > 0) {
            //         if (sValue.length == 2) {
            //             var oFilter1 = new sap.ui.model.Filter("Taxcategory", 'Contains', sValue);
            //             this.TaxCategory.getBinding("items").filter([oFilter1]);
            //         } else {
            //             var oFilter2 = new sap.ui.model.Filter("Description", 'Contains', sValue);
            //             this.TaxCategory.getBinding("items").filter([oFilter2]);
            //         }
            //     } else {
            //         this.TaxCategory.getBinding("items").filter([]);
            //     }
            // },
            // handleValueHelpTaxCatClose: function (evt) {
            //     this.TaxCategory.close();
            // },

            // //Value Help for Customer Group
            // handleValueHelpForCusGrp: function (evt) {
            //     this.cField = evt.getSource();
            //     this.customerGrp.getBinding("items").filter([]);
            //     this.customerGrp.open();
            // },
            // handleValueHelpcusGrpConfirm: function (evt) {
            //     var title = evt.getParameter("selectedItems")[0].getProperty("title");
            //     var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            //     this.cField.setValue(title + " - " + desc);
            //     this.customerGrp.getBinding("items").filter([]);
            //     this.customerGrp.close();
            // },
            // handleValueHelpcusGrpSearch: function (evt) {
            //     var sValue = evt.getParameter("value");
            //     if (sValue.length > 0) {
            //         if (sValue.length == 2) {
            //             var oFilter1 = new sap.ui.model.Filter("Customergroup", 'Contains', sValue);
            //             this.customerGrp.getBinding("items").filter([oFilter1]);
            //         } else {
            //             var oFilter2 = new sap.ui.model.Filter("Description", 'Contains', sValue);
            //             this.customerGrp.getBinding("items").filter([oFilter2]);
            //         }
            //     } else {
            //         this.customerGrp.getBinding("items").filter([]);
            //     }
            // },
            // handleValueHelpcusGrp1Close: function (evt) {
            //     this.customerGrp.close();
            // },

            // //Value Help for Customer Group 1
            // handleValueHelpForCusGrp1: function (evt) {
            //     this.c1Field = evt.getSource();
            //     this.customerGrp1.getBinding("items").filter([]);
            //     this.customerGrp1.open();
            // },
            // handleValueHelpcusGrp1Confirm: function (evt) {
            //     var title = evt.getParameter("selectedItems")[0].getProperty("title");
            //     var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            //     this.c1Field.setValue(title + " - " + desc);
            //     this.customerGrp1.getBinding("items").filter([]);
            //     this.customerGrp1.close();
            // },
            // handleValueHelpcusGrp1Search: function (evt) {
            //     var sValue = evt.getParameter("value");
            //     if (sValue.length > 0) {
            //         if (sValue.length == 2) {
            //             var oFilter1 = new sap.ui.model.Filter("Customergroup1", 'Contains', sValue);
            //             this.customerGrp1.getBinding("items").filter([oFilter1]);
            //         } else {
            //             var oFilter2 = new sap.ui.model.Filter("Description", 'Contains', sValue);
            //             this.customerGrp1.getBinding("items").filter([oFilter2]);
            //         }
            //     } else {
            //         this.customerGrp1.getBinding("items").filter([]);
            //     }
            // },
            // handleValueHelpcusGrp1Close: function (evt) {
            //     this.customerGrp1.close();
            // },

            // //Value Help for Customer Group 2
            // handleValueHelpForCusGrp2: function (evt) {
            //     this.c2Field = evt.getSource();
            //     this.customerGrp2.getBinding("items").filter([]);
            //     this.customerGrp2.open();
            // },
            // handleValueHelpcusGrp2Confirm: function (evt) {
            //     var title = evt.getParameter("selectedItems")[0].getProperty("title");
            //     var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            //     this.c2Field.setValue(title + " - " + desc);
            //     this.customerGrp2.getBinding("items").filter([]);
            //     this.customerGrp2.close();
            // },
            // handleValueHelpcusGrp2Search: function (evt) {
            //     var sValue = evt.getParameter("value");
            //     if (sValue.length > 0) {
            //         if (sValue.length == 2) {
            //             var oFilter1 = new sap.ui.model.Filter("Customergroup2", 'Contains', sValue);
            //             this.customerGrp2.getBinding("items").filter([oFilter1]);
            //         } else {
            //             var oFilter2 = new sap.ui.model.Filter("Description", 'Contains', sValue);
            //             this.customerGrp2.getBinding("items").filter([oFilter2]);
            //         }
            //     } else {
            //         this.customerGrp2.getBinding("items").filter([]);
            //     }
            // },
            // handleValueHelpcusGrp2Close: function (params) {
            //     this.customerGrp2.close();
            // },

            // //Value Help for Customer Group 3
            // handleValueHelpForCusGrp3: function (evt) {
            //     this.c3Field = evt.getSource();
            //     this.customerGrp3.getBinding("items").filter([]);
            //     this.customerGrp3.open();
            // },
            // handleValueHelpcusGrp3Confirm: function (evt) {
            //     var title = evt.getParameter("selectedItems")[0].getProperty("title");
            //     var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            //     this.c3Field.setValue(title + " - " + desc);
            //     this.customerGrp3.getBinding("items").filter([]);
            //     this.customerGrp3.close();
            // },
            // handleValueHelpcusGrp3Search: function (evt) {
            //     var sValue = evt.getParameter("value");
            //     if (sValue.length > 0) {
            //         if (sValue.length == 2) {
            //             var oFilter1 = new sap.ui.model.Filter("Customergroup3", 'Contains', sValue);
            //             this.customerGrp3.getBinding("items").filter([oFilter1]);
            //         } else {
            //             var oFilter2 = new sap.ui.model.Filter("Description", 'Contains', sValue);
            //             this.customerGrp3.getBinding("items").filter([oFilter2]);
            //         }
            //     } else {
            //         this.customerGrp3.getBinding("items").filter([]);
            //     }
            // },
            // handleValueHelpcusGrp3Close: function (evt) {
            //     this.customerGrp3.close();
            // },

            // //Value Help for Customer Group 4
            // handleValueHelpForCusGrp4: function (evt) {
            //     this.c4Field = evt.getSource();
            //     this.customerGrp4.getBinding("items").filter([]);
            //     this.customerGrp4.open();
            // },
            // handleValueHelpcusGrp4Confirm: function (evt) {
            //     var title = evt.getParameter("selectedItems")[0].getProperty("title");
            //     var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            //     this.c4Field.setValue(title + " - " + desc);
            //     this.customerGrp4.getBinding("items").filter([]);
            //     this.customerGrp4.close();
            // },
            // handleValueHelpcusGrp4Search: function (evt) {
            //     var sValue = evt.getParameter("value");
            //     if (sValue.length > 0) {
            //         if (sValue.length == 2) {
            //             var oFilter1 = new sap.ui.model.Filter("Customergroup4", 'Contains', sValue);
            //             this.customerGrp4.getBinding("items").filter([oFilter1]);
            //         } else {
            //             var oFilter2 = new sap.ui.model.Filter("Description", 'Contains', sValue);
            //             this.customerGrp4.getBinding("items").filter([oFilter2]);
            //         }
            //     } else {
            //         this.customerGrp4.getBinding("items").filter([]);
            //     }
            // },
            // handleValueHelpcusGrp4Close: function (params) {
            //     this.customerGrp4.close();
            // },

            // //Value Help for Customer Group 5
            // handleValueHelpForCusGrp5: function (evt) {
            //     this.c5Field = evt.getSource();
            //     this.customerGrp5.getBinding("items").filter([]);
            //     this.customerGrp5.open();
            // },
            // handleValueHelpcusGrp5Confirm: function (evt) {
            //     var title = evt.getParameter("selectedItems")[0].getProperty("title");
            //     var desc = evt.getParameter("selectedItems")[0].getProperty("description");
            //     this.c5Field.setValue(title + " - " + desc);
            //     this.customerGrp5.getBinding("items").filter([]);
            //     this.customerGrp5.close();
            // },
            // handleValueHelpcusGrp5Search: function (evt) {
            //     var sValue = evt.getParameter("value");
            //     if (sValue.length > 0) {
            //         if (sValue.length == 2) {
            //             var oFilter1 = new sap.ui.model.Filter("Customergroup5", 'Contains', sValue);
            //             this.customerGrp5.getBinding("items").filter([oFilter1]);
            //         } else {
            //             var oFilter2 = new sap.ui.model.Filter("Description", 'Contains', sValue);
            //             this.customerGrp5.getBinding("items").filter([oFilter2]);
            //         }
            //     } else {
            //         this.customerGrp2.getBinding("items").filter([]);
            //     }
            // },
            // handleValueHelpcusGrp5Close: function (params) {
            //     this.customerGrp5.close();
            // },

            //Max length property
            handleSetMaxLength: function (evt) {
                var val = evt.getSource().getValue().length;
                var maxLen = evt.getSource().getMaxLength();
                if (val >= maxLen) {
                    evt.getSource().setType("Text");
                } else {
                    evt.getSource().setType("Number");
                }
            },
            //Navigation
            onBack: function () {
                this.getView().getModel("appView").setProperty("/generateSale", false);
                this.getView().getModel("appView").setProperty("/addSales", false);

                if (this.getView().byId("salesAreadata17").getAggregation("_views")[0].getContent()[0].getContent()[1]?.getItems()) {
                    let panel = this.getView().byId("salesAreadata17").getAggregation("_views")[0].getContent()[0].getContent()[1]?.getItems();
                    for (var i = 0; i < panel.length; i++) {
                        panel[i].destroy();
                    }
                }
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteView1");
            },
            handleLiveChange: function (value) {
                if (value) {
                    var sNotifDate = new Date(value.toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
                    return sNotifDate;
                } else return "";
            },

            handleCreditLimitTypeSelect: function (evt) {
                // console.log("hi");
                var that = this;
                this.getView().getModel("appView").setProperty("/selectedType", evt.getSource().getSelectedButton().getText());
                this.getView().getModel("appView").updateBindings();
                // that.selectedType = evt.getSource().getSelectedButton().getText();

            },

            onClear: function () {
                var that = this;
                var State = true;
                var salesRequired = true;


                if (this.getView().getModel("appView").getProperty("/vertical") === 'CASH') {
                    var simpleFormIdArr = ["orderData1", "orderData5", "orderData9", "orderData6", "orderData8",
                        "orderData12", "orderData81", "orderData193", "orderData86", "orderData125"]
                } else {
                    var simpleFormIdArr = [
                        "orderData1", "orderData5", "orderData9", "orderData6", "orderData8",
                        "orderData12", "orderData81", "orderData193", "orderData86", "orderData125",
                        "erpCustomersydata1", "erpCustomersydata3", "erpCustomersydata5", "erpCustomersydata7", "erpCustomersydata9",
                        "erpCustomersydata11", "erpCustomersydata13", "erpCustomersydata15", "erpCustomersydata17", "erpCustomersydata19",
                        "erpCustomersydata21"
                        // "Planned", "Planned2", "Planned3", "Planned4",            //"commented by mujaida"
                        // "Planned6", "CreditAnalysisView", "orderData13", "CustomerBackgroundView", "DetailsOfExpectedView"
                    ];
                }

                for (var j = 0; j < simpleFormIdArr.length; j++) {
                    var content = this.getView().byId(simpleFormIdArr[j]).getAggregation("_views") !== null ? this.getView().byId(simpleFormIdArr[j]).getAggregation("_views")[0].getContent()[0].getContent() : "";
                    var isVisible = this.getView().byId(simpleFormIdArr[j]).getParent().getParent().getVisible();

                    if (isVisible) {
                        for (var b = 0; b < content.length; b++) {
                            if (content[b].getMetadata().getName() != "sap.ui.core.Title") {
                                if (content[b].getVisible()) {
                                    if (content[b].getMetadata().getName() == "sap.m.Label" && content[b].getRequired() === true && content[b].getVisible() ===
                                        true) {
                                        if (content[b + 1].getMetadata().getName() == "sap.m.Input") {

                                            content[b + 1].setValueState("None");
                                            that.removeValidationError(content[b]);

                                        } else if (content[b + 1].getMetadata().getName() == "sap.m.MultiInput") {

                                            content[b + 1].setValueState("None");
                                            that.removeValidationError(content[b]);

                                        } else if (content[b + 1].getMetadata().getName() == "sap.m.Select") {

                                            content[b + 1].setValueState("None");
                                            that.removeValidationError(content[b]);

                                        } else if (content[b + 1].getMetadata().getName() == "sap.m.DatePicker") {

                                            content[b + 1].setValueState("None");
                                            that.removeValidationError(content[b]);

                                        } else if (content[b + 1].getMetadata().getName() == 'sap.ui.unified.FileUploader') {
                                            // content[b + 1].setValue("");
                                            content[b + 1].setValueState("None");
                                            that.removeValidationError(content[b]);
                                        }
                                    }


                                }
                            }
                        }
                    }
                }
                var custType = this.getView().getModel("appView").getProperty("/customerType");

                var formId = this.getView().byId("salesAreadata17").getAggregation("_views") ? this.getView().byId("salesAreadata17").getAggregation("_views")[0].getContent()[0].getContent()[1].getItems() : null;


                // var formId = this.getView().byId("salesAreadata17").getAggregation("_views")[0].getContent()[0].getContent()[1].getItems();

                if (formId) {
                    for (var i = 0; i < formId.length; i++) {
                        var salesFormContent = this.getView().byId("salesAreadata17").getAggregation("_views")[0].getContent()[0].getContent()[1].getItems()[i].getItems()[0].getContent()[0].getItems()[0].getContent();
                        var isSalesAreaVisible = this.getView().byId("salesAreadata17").getParent().getParent().getVisible();
                        if (isSalesAreaVisible) {
                            for (var b = 0; b < salesFormContent.length; b++) {
                                if (salesFormContent[b].getMetadata().getName() != "sap.ui.core.Title") {
                                    if (salesFormContent[b].getVisible()) {
                                        if (salesFormContent[b].getMetadata().getName() == "sap.m.Label" && salesFormContent[b].getRequired() === true && salesFormContent[b].getVisible() ===
                                            true) {
                                            if (salesFormContent[b + 1].getMetadata().getName() == "sap.m.Input") {

                                                salesFormContent[b + 1].setValueState("None");
                                                that.removeValidationError(salesFormContent[b]);

                                            } else if (salesFormContent[b + 1].getMetadata().getName() == "sap.m.MultiInput") {

                                                salesFormContent[b + 1].setValueState("None");
                                                that.removeValidationError(salesFormContent[b]);

                                            } else if (salesFormContent[b + 1].getMetadata().getName() == "sap.m.Select") {

                                                salesFormContent[b + 1].setValueState("None");
                                                that.removeValidationError(salesFormContent[b]);

                                            } else if (salesFormContent[b + 1].getMetadata().getName() == "sap.m.DatePicker") {

                                                salesFormContent[b + 1].setValueState("None");
                                                that.removeValidationError(salesFormContent[b]);

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },

            //commented by mujaida
            // onClearFiles: function () {
            //     var simpleFormIdArr = ["CreditAnalysisView", "Planned2", "orderData193", "orderData13"];

            //     for (var j = 0; j < simpleFormIdArr.length; j++) {
            //         var content = this.getView().byId(simpleFormIdArr[j]).getAggregation("_views") !== null ? this.getView().byId(simpleFormIdArr[j]).getAggregation("_views")[0].getContent()[0].getContent() : "";
            //         var isVisible = this.getView().byId(simpleFormIdArr[j]).getParent().getParent().getVisible();

            //         if (isVisible) {
            //             for (var b = 0; b < content.length; b++) {
            //                 if (content[b].getMetadata().getName() != "sap.ui.core.Title") {
            //                     if (content[b].getVisible()) {
            //                         if (content[b].getMetadata().getName() == "sap.m.Label" && content[b].getVisible() ===
            //                             true) {
            //                             if (content[b + 1].getMetadata().getName() == "sap.ui.unified.FileUploader") {
            //                                 if (content[b + 1].getValue() !== "") {
            //                                     content[b + 1].clear();

            //                                 }
            //                             }
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // },
            handleAmtFieldsValidation: function () {
                var amtFieldState = true;

                var simpleForms = ["Planned2", "Planned3"];
                for (var j = 0; j < simpleForms.length; j++) {
                    var content = this.getView().byId(simpleForms[j]).getAggregation("_views") !== null ? this.getView().byId(simpleForms[j]).getAggregation("_views")[0].getContent()[0].getContent() : "";
                    var isVisible = this.getView().byId(simpleForms[j]).getParent().getParent().getVisible();
                    if (isVisible) {
                        for (var b = 0; b < content.length; b++) {
                            if (content[b].getMetadata().getName() != "sap.ui.core.Title") {
                                if (content[b].getVisible()) {
                                    if (content[b].getMetadata().getName() == "sap.m.Label" && content[b].getVisible() ===
                                        true) {
                                        if (content[b + 1].getMetadata().getName() == "sap.m.Input") {
                                            if (content[b + 1].getValueState() == "Error") {
                                                // content[b + 1].setValueState("Error").setValueStateText("");
                                                amtFieldState = false;
                                                this.registerValidationError(content[b]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                }

                if (amtFieldState === false) {
                    this.amtValidationMesg = "Please check the amount fields";
                }

                return amtFieldState;


            },
            handleValidateFormFields: function () {
                var that = this;
                var State = true;
                var salesRequired = true;


                if (this.getView().getModel("appView").getProperty("/vertical") === 'CASH') {
                    var simpleFormIdArr = ["orderData1", "orderData5", "orderData9", "orderData6", "orderData8",
                        "orderData12", "orderData81", "orderData193", "orderData86", "orderData125"]
                } else {
                    var simpleFormIdArr = [
                        "orderData1", "orderData5", "orderData9", "orderData6", "orderData8",
                        "orderData12", "orderData81", "orderData193", "orderData86", "orderData125",
                        "erpCustomersydata1", "erpCustomersydata3", "erpCustomersydata5", "erpCustomersydata7", "erpCustomersydata9",
                        "erpCustomersydata11", "erpCustomersydata13", "erpCustomersydata15", "erpCustomersydata17", "erpCustomersydata19",
                        "erpCustomersydata21",
                        "Planned", "Planned2", "Planned3", "Planned4",
                        "Planned6", "CreditAnalysisView", "orderData13", "CustomerBackgroundView", "DetailsOfExpectedView"
                    ];
                }



                for (var j = 0; j < simpleFormIdArr.length; j++) {
                    var content = this.getView().byId(simpleFormIdArr[j]).getAggregation("_views") !== null ? this.getView().byId(simpleFormIdArr[j]).getAggregation("_views")[0].getContent()[0].getContent() : "";
                    var isVisible = this.getView().byId(simpleFormIdArr[j]).getParent().getParent().getVisible();

                    if (isVisible) {
                        for (var b = 0; b < content.length; b++) {
                            if (content[b].getMetadata().getName() != "sap.ui.core.Title") {
                                if (content[b].getVisible()) {
                                    if (content[b].getMetadata().getName() == "sap.m.Label" && content[b].getRequired() === true && content[b].getVisible() ===
                                        true) {
                                        if (content[b + 1].getMetadata().getName() == "sap.m.Input") {
                                            if (content[b + 1].getValue() == "") {
                                                content[b + 1].setValueState("Error").setValueStateText("");
                                                State = false;
                                                that.registerValidationError(content[b]);
                                            } else {
                                                content[b + 1].setValueState("None").setValueStateText("");
                                                that.removeValidationError(content[b]);
                                            }
                                        } else if (content[b + 1].getMetadata().getName() == "sap.m.MultiInput") {
                                            if (content[b + 1].getValue() == "") {
                                                content[b + 1].setValueState("Error").setValueStateText("");
                                                State = false;
                                                that.registerValidationError(content[b]);
                                            } else {
                                                content[b + 1].setValueState("None").setValueStateText("");
                                                that.removeValidationError(content[b]);
                                            }
                                        } else if (content[b + 1].getMetadata().getName() == "sap.m.Select") {
                                            if (content[b + 1].getSelectedKey() == "None") {
                                                content[b + 1].setValueState("Error").setValueStateText("");
                                                State = false;
                                                that.registerValidationError(content[b]);
                                            } else {
                                                content[b + 1].setValueState("None").setValueStateText("");
                                                that.removeValidationError(content[b]);
                                            }
                                        } else if (content[b + 1].getMetadata().getName() == "sap.m.DatePicker") {
                                            if (content[b + 1].getValue() == "") {
                                                content[b + 1].setValueState("Error").setValueStateText("");
                                                State = false;
                                                that.registerValidationError(content[b]);
                                            } else {
                                                content[b + 1].setValueState("None").setValueStateText("");
                                                that.removeValidationError(content[b]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                var custType = this.getView().getModel("appView").getProperty("/customerType");

                var formId = this.getView().byId("salesAreadata17").getAggregation("_views")[0].getContent()[0].getContent()[1].getItems();

                for (var i = 0; i < formId.length; i++) {
                    var salesFormContent = this.getView().byId("salesAreadata17").getAggregation("_views")[0].getContent()[0].getContent()[1].getItems()[i].getItems()[0].getContent()[0].getItems()[0].getContent();
                    var isSalesAreaVisible = this.getView().byId("salesAreadata17").getParent().getParent().getVisible();
                    if (isSalesAreaVisible) {
                        for (var b = 0; b < salesFormContent.length; b++) {
                            if (salesFormContent[b].getMetadata().getName() != "sap.ui.core.Title") {
                                if (salesFormContent[b].getVisible()) {
                                    if (salesFormContent[b].getMetadata().getName() == "sap.m.Label" && salesFormContent[b].getRequired() === true && salesFormContent[b].getVisible() ===
                                        true) {
                                        if (salesFormContent[b + 1].getMetadata().getName() == "sap.m.Input") {
                                            if (salesFormContent[b + 1].getValue() == "") {
                                                salesFormContent[b + 1].setValueState("Error").setValueStateText("");
                                                State = false;
                                                that.registerValidationError(salesFormContent[b]);
                                            } else {
                                                salesFormContent[b + 1].setValueState("None").setValueStateText("");
                                                that.removeValidationError(salesFormContent[b]);
                                            }
                                        } else if (salesFormContent[b + 1].getMetadata().getName() == "sap.m.MultiInput") {
                                            if (salesFormContent[b + 1].getValue() == "") {
                                                salesFormContent[b + 1].setValueState("Error").setValueStateText("");
                                                State = false;
                                                that.registerValidationError(salesFormContent[b]);
                                            } else {
                                                salesFormContent[b + 1].setValueState("None").setValueStateText("");
                                                that.removeValidationError(salesFormContent[b]);
                                            }
                                        } else if (salesFormContent[b + 1].getMetadata().getName() == "sap.m.Select") {
                                            if (salesFormContent[b + 1].getSelectedKey() == "None") {
                                                salesFormContent[b + 1].setValueState("Error").setValueStateText("");
                                                State = false;
                                                that.registerValidationError(salesFormContent[b]);
                                            } else {
                                                salesFormContent[b + 1].setValueState("None").setValueStateText("");
                                                that.removeValidationError(salesFormContent[b]);
                                            }
                                        } else if (salesFormContent[b + 1].getMetadata().getName() == "sap.m.DatePicker") {
                                            if (salesFormContent[b + 1].getValue() == "") {
                                                salesFormContent[b + 1].setValueState("Error").setValueStateText("");
                                                State = false;
                                                that.registerValidationError(salesFormContent[b]);
                                            } else {
                                                salesFormContent[b + 1].setValueState("None").setValueStateText("");
                                                that.removeValidationError(salesFormContent[b]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (State === false) {
                    this.ValidationMesg = "Please fill the required fields";
                }

                return State;
            },
            handleLiveChangeForCusReqRadioButtonYes: function (evt) {
                this.getView().getModel("appView").setProperty("/custType", evt.getSource().getText());
                this.getView().getModel("appView").updateBindings(true);
            },
            handleLiveChangeForCusReqRadioButtonNo: function (evt) {
                this.getView().getModel("appView").setProperty("/custType", evt.getSource().getText());
                this.getView().getModel("appView").updateBindings(true);
            },
            onConfirm: function () {
                try {
                    var dmsPath = this.getOwnerComponent().getModel("DMS").sMetadataUrl;
                    $.ajax({
                        type: "GET",
                        // url: "/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/$metadata",
                        url: dmsPath,
                        processData: false,
                        contentType: false,
                        headers: {

                            "X-CSRF-Token": "Fetch"

                        },
                        success: function (data, response, header) {
                            // handle success
                            this.token = header.getResponseHeader("x-csrf-token")
                            console.log(data);
                            this.dms();
                        }.bind(this),
                        error: function (jqXHR, textStatus, errorThrown) {
                            // handle error
                        }
                    });

                } catch (err) {

                }
            },
            dms: function (evt) {
                var dmsData = this.getOwnerComponent().getModel("dmsModel").getData();
                var dmsPath = this.getOwnerComponent().getModel("DMS").sServiceUrl;
                dmsPath = this.getOwnerComponent().getModel("DMS").sServiceUrl + '/AttachmentContentSet';

                for (var i = 0; i < dmsData.length; i++) {
                    $.ajax({
                        type: "POST",
                        // url: "/sap/opu/odata/sap/API_CV_ATTACHMENT_SRV/AttachmentContentSet",
                        url: dmsPath,
                        processData: false,
                        contentType: false,
                        data: this.getOwnerComponent().getModel("dmsModel").getData()[i].file,
                        // data: this.getView().getModel("appView").getProperty("/dmsFile"),
                        headers: {
                            "Content-Type": "application/pdf",
                            "slug": this.getOwnerComponent().getModel("dmsModel").getData()[i].fileName,
                            "BusinessObjectTypeName": "KNA1",
                            "LinkedSAPObjectKey": this.custNum,
                            "X-CSRF-Token": this.token,
                        },
                        success: function (data, response) {

                            console.log(data);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            // handle error
                        }
                    });
                }
            },

            onMessagePopoverPress: function (oEvent) {
                var oSourceControl = oEvent.getSource();
                this._getMessagePopover().then(function (oMessagePopover) {
                    oMessagePopover.openBy(oSourceControl);
                });
            },

            registerCustomValidationError: function (content) {
                var sTarget = "/" + content.target;
                var aMessages = sap.ui.getCore().getMessageManager().getMessageModel().getData();
                var sMessage = aMessages.filter(function (mItem) {
                    return mItem.target === sTarget;
                });
                if (!sMessage || sMessage.length === 0) {
                    var oMessage = new Message({
                        message: "Missing Required table: " + content.table,
                        type: MessageType.Error,
                        target: "/" + content.target,
                        processor: content.model
                    });
                    sap.ui.getCore().getMessageManager().addMessages(oMessage);
                }
            },

            registerValidationError: function (content) {
                var sTarget = "/" + content.getProperty("text").replaceAll(' ', '');
                var aMessages = sap.ui.getCore().getMessageManager().getMessageModel().getData();
                var sMessage = aMessages.filter(function (mItem) {
                    return mItem.target === sTarget;
                });
                if (!sMessage || sMessage.length === 0) {
                    var oMessage = new Message({
                        message: "Missing Required Field: " + content.getProperty("text"),
                        type: MessageType.Error,
                        target: sTarget,
                        processor: content.getModel()
                    });
                    sap.ui.getCore().getMessageManager().addMessages(oMessage);
                }
            },

            removeCustomValidationError: function (content) {
                var sTarget = content && content.target;
                sTarget = "/" + sTarget;
                var aMessages = sap.ui.getCore().getMessageManager().getMessageModel().getData();
                var sMessage = aMessages.filter(function (mItem) {
                    return mItem.target === sTarget;
                });
                if (sMessage) {
                    sap.ui.getCore().getMessageManager().removeMessages(sMessage);
                }
            },

            removeValidationError: function (content) {
                var sTarget = content && content.getProperty("text") && content.getProperty("text").replaceAll(' ', '');
                sTarget = "/" + sTarget;
                var aMessages = sap.ui.getCore().getMessageManager().getMessageModel().getData();
                var sMessage = aMessages.filter(function (mItem) {
                    return mItem.target === sTarget;
                });
                if (sMessage) {
                    sap.ui.getCore().getMessageManager().removeMessages(sMessage);
                }
            },

            onClearMessagePopover: function () {
                sap.ui.getCore().getMessageManager().removeAllMessages();
            },

            //################ Private APIs ###################

            _getMessagePopover: function () {
                var oView = this.getView();

                // create popover lazily (singleton)
                if (!this._pMessagePopover) {
                    this._pMessagePopover = Fragment.load({
                        id: oView.getId(),
                        name: "Iffco.clap.fragments.MessagePopover"
                    }).then(function (oMessagePopover) {
                        oView.addDependent(oMessagePopover);
                        return oMessagePopover;
                    });
                }
                return this._pMessagePopover;
            },

            createLinkToTask: function () {
                var sLink = "https://iffcodevprocessautomation.launchpad.cfapps.eu10.hana.ondemand.com/comsapspaprocessautomation.comsapspainbox-2.80.0/inbox.html";
                return sLink;
                // https://iffcodevprocessautomation-
                // "https://<org name>-<space>-<approuter>#WorkflowTask-DisplayMyInbox?sap-ui-app-id-hint=cross.fnd.fiori.inbox&/detail/NA/<taskID>/TaskCollection(SAP__Origin='NA',InstanceID=‘<‘task ID’)"            }
                // https://iffcodevprocessautomation.launchpad.cfapps.eu10.hana.ondemand.com/comsapspaprocessautomation.comsapspainbox-2.80.0/inbox.html#/detail/NA/6453f9ed-d2d7-11ed-ad7a-eeee0a8cc1ca/TaskCollection(SAP__Origin='NA',InstanceID='6453f9ed-d2d7-11ed-ad7a-eeee0a8cc1ca')
            }
        });
    });