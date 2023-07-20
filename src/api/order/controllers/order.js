"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const result = await super.create(ctx);
    console.log("result", result);

    
    const midtransClient = require("midtrans-client");
    // Create Snap API instance
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-oQIGshiP-QkHY1aJPKPKBAwx",
      clientKey: "SB-Mid-client-HFlOSFm8XIHUf3B3",
    });

    let parameter = {
      transaction_details: {
        order_id: result.data.id,
        gross_amount: result.data.attributes.totalPrice,
      },
      credit_card: {
        secure: true,
      },
    };

    let response = await snap.createTransaction(parameter);
  
/*
    const midtransClient = require("midtrans-client");
    // Create Core API instance
    let core = new midtransClient.CoreApi({
      isProduction: false,
      // serverKey : 'YOUR_SERVER_KEY',
      // clientKey : 'YOUR_CLIENT_KEY'
      serverKey: "SB-Mid-server-oQIGshiP-QkHY1aJPKPKBAwx",
      clientKey: "SB-Mid-client-HFlOSFm8XIHUf3B3",
    });

    let parameter = {
      //   payment_type: "credit_card",
      payment_type: "bank_transfer",
      transaction_details: {
        gross_amount: result.data.attributes.totalPrice,
        order_id: result.data.id,

        // order_id: "test-transaction-54321",
      },
      credit_card: {
        token_id: "CREDIT_CARD_TOKEN", // change with your card token
        authentication: true,
      },
    };

    // charge transaction
    let response = await core.charge(parameter);
*/
    return response;
  },
}));
