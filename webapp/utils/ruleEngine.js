sap.ui.define([], function () {
    "use strict";

    return function ({ oModel, process, aCustomerType, sBPGrouping }) {
        return new Promise(function (resolve, reject) {
            const retryFunction = function () {
                var aFilters = [];
                aFilters.push(new sap.ui.model.Filter("Process", "EQ", process));
                aFilters.push(new sap.ui.model.Filter("CustomerType", "EQ", aCustomerType));
                aFilters.push(new sap.ui.model.Filter("ZbusinessPartnerId", "EQ", sBPGrouping));

                oModel.read("/ZDD_GET_RULE_Details", {
                    filters: aFilters,
                    urlParameters: {
                        "$top": 10000,
                        'Cache-Control': 'no-cache', // Prevent caching
                        'Pragma': 'no-cache'
                    },
                    success: function (oData, oResponse) {
                        var flatObj = {};
                        // Process the data and populate flatObj
                        oData.results.forEach(function (obj, index) {
                            var sField = "";
                            var rField = "";

                            sField += obj.Fieldname.split(" ").join("");
                            rField += obj.Fieldname.split(" ").join("");

                            if (obj.Visibility) {
                                sField += "Visible";
                                if (!Object.keys(flatObj).includes(sField)) {
                                    if (obj.Visibility === "Y") {
                                        flatObj[sField] = true;
                                    } else {
                                        flatObj[sField] = false;
                                    }
                                } else {
                                    sField += obj.Customersub1.split(" ").join("");
                                    console.log(sField);
                                    // sField += obj.replace(":", "").split(" ").join("");
                                    if (obj.Visibility === "Y") {
                                        flatObj[sField] = true;
                                    } else {
                                        flatObj[sField] = false;
                                    }
                                }
                            }
                            if (obj.Mandatory) {
                                rField += "Mandatory";

                                if (!Object.keys(flatObj).includes(rField)) {
                                    if (obj.Mandatory === "Y") {
                                        flatObj[rField] = true;
                                    } else {
                                        flatObj[rField] = false;
                                    }
                                } else {
                                    rField += obj.Customersub1.split(" ").join("");
                                    if (obj.Mandatory === "Y") {
                                        flatObj[rField] = true;
                                    } else {
                                        flatObj[rField] = false;
                                    }
                                }
                            }
                        }.bind(this))
                        console.log("Rule Engine ki line khatam hogyi hai: ", flatObj);
                        resolve(flatObj); // Resolve the Promise with processed data
                    },
                    error: function (oError) {
                        console.log("Rule Engine is calling Again:", oError);
                        console.log("<h1>Triggering Rule engine in 2 seconds</h1>");
                        // setTimeout(() => {
                        retryFunction()
                        // }, 2000);
                    }
                });
            }
            retryFunction();
        });
    };
});
