/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// this object is generated from Flow Builder under "..." > Endpoint > Snippets > Responses
// To navigate to a screen, return the corresponding response from the endpoint. Make sure the response is encrypted.
const SCREEN_RESPONSES = {
    PARTNER_SELECTOR: {
        "screen": "PARTNER_SELECTOR",
        "data": {
            "partners": [
                {
                    "id": "Partner 1",
                    "title": "Partner 1"
                },
                {
                    "id": "Partner 2",
                    "title": "Partner 2"
                },
                {
                    "id": "Partner 3",
                    "title": "Partner 3"
                }
            ]
        }
    },
    INVOICE_DETAILS: {
        "screen": "INVOICE_DETAILS",
        "data": {
            "cta_label": "Submit",
            "screen_heading": "",
            
            "purpose_code": [
                {
                    "id": "P1001",
                    "title": "P1001"
                },
                {
                    "id": "P1002",
                    "title": "P1002"
                }
            ],
            "transaction_type": [
                {
                    "id": "service",
                    "title": "service"
                },
                {
                    "id": "software",
                    "title": "Software"
                }
            ]
        }
    }
    // SUCCESS: {
    //     "screen": "SUCCESS",
    //     "data": {
    //         "extension_message_response": {
    //             "params": {
    //                 "flow_token": "REPLACE_FLOW_TOKEN",
    //                 "some_param_name": "PASS_CUSTOM_VALUE"
    //             }
    //         }
    //     }
    // },
};


export const getNextScreen = async (decryptedBody) => {
  const { screen, data, version, action, flow_token } = decryptedBody;
  // handle health check request
  if (action === "ping") {
    return {
      data: {
        status: "active",
      },
    };
  }

  // handle error notification
  if (data?.error) {
    console.warn("Received client error:", data);
    return {
      data: {
        acknowledged: true,
      },
    };
  }

  // handle initial request when opening the flow and display LOAN screen
  if (action === "INIT") {
    return {
      ...SCREEN_RESPONSES.PARTNER_SELECTOR,
    };
  }

  if (action === "data_exchange") {
    // handle the request based on the current screen
    switch (screen) {
      // handles when user submits PRODUCT_SELECTOR screen
      case "PARTNER_SELECTOR":
        const partner_selection = data.partner_selection;
        return {
          ...SCREEN_RESPONSES.INVOICE_DETAILS,
          data: {
            // copy initial screen data then override specific fields
            ...SCREEN_RESPONSES.INVOICE_DETAILS.data,
           
            cta_label: "Submit",
            screen_heading: `Provide withdrawal info for ${partner_selection}`,
          },
        };
    //   case "INVOICE_DETAILS":
    //     // TODO here process user selected preferences and return customised offer
    //     return {
    //       ...SCREEN_RESPONSES.INVOICE_DETAILS,
    //       data: {
    //         // copy initial screen data then override specific fields
    //         ...SCREEN_RESPONSES.OFFER.data,
    //         offer_label: "Here are 4 shortlisted " + data.selected_product + "s",
    //         selected_product: data.selected_product,
    //       },
    //     };

      default:
        break;
    }
  }

  console.error("Unhandled request body:", decryptedBody);
  throw new Error(
    "Unhandled endpoint request. Make sure you handle the request action & screen logged above."
  );
};