const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");

const getVirtualOrderDetails = async (req, res) => {
    const orderId = req.params.orderId;
  
    try {
      const query = `SELECT * FROM fn_get_virtual_order_details($1)`;
      const values = [orderId];
      const result = await client.query(query, values);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: { virtualOrderDetails: result.rows } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const getNonVirtualOrderDetails = async (req, res) => {
    const orderId = req.params.orderId;
  
    try {
      const query = `SELECT * FROM fn_get_non_virtual_order_details($1)`;
      const values = [orderId];
      const result = await client.query(query, values);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: { virtualOrderDetails: result.rows } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const addVirtualOrder = async (req, res) => {
    const {
      customerId,
      branchId,
      orderType,
      orderStatus,
      totalPrice,
      paymentMethod,
      orderItems,
      additionalDiscount,
      tableId,
      addressId,
      customerPhoneId,
    } = req.body;
  
    try {
      const query = `call add_virtual_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
      const values = [
      customerId,
      branchId,
      orderType,
      orderStatus,
      totalPrice,
      paymentMethod,
      orderItems,
      additionalDiscount,
      tableId,
      addressId,
      customerPhoneId,
      ];
      await client.query(query, values);
      res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const addNonVirtualOrder = async (req, res) => {
    const {
      customerId,
      branchId,
      orderType,
      orderStatus,
      totalPrice,
      paymentMethod,
      orderItems,
      additionalDiscount,
      creditCardNumber,
      creditCardExpireMonth,
      creditCardExpireDay,
      nameOnCard,
      tableId,
      addressId,
      customerPhoneId,
    } = req.body;
  
    try {
      const query = `call add_non_virtual_order($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;
      const values = [
        customerId,
        branchId,
        orderType,
        orderStatus,
        totalPrice,
        paymentMethod,
        orderItems,
        additionalDiscount,
        creditCardNumber,
        creditCardExpireMonth,
        creditCardExpireDay,
        nameOnCard,
        tableId,
        addressId,
        customerPhoneId,
      ];
      await client.query(query, values);
      res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};
















module.exports = {
    getVirtualOrderDetails,
    getNonVirtualOrderDetails,

    addVirtualOrder,
    addNonVirtualOrder,
    
}