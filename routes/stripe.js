
var stripe=require('stripe')('sk_test_51M2J4LB44gmytfLQAej1X9ZVy07JEK7Ml5lWKip1noAu0VJy2wudGPDvqM8znLW3q71GTDSe5yrTxV0tVI46HA1j00WcExOBAy');

// Create a Payment Intent
const createPaymentIntent = async (amount, currency) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
      });
      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  };
  
  module.exports = {
    createPaymentIntent,
  };