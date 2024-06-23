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
const getOrderItemsBySection = async (req, res) => {
<<<<<<< HEAD
  const {sectionId, Status} = req.params;
  
  try {
    let query = `SELECT * FROM fn_get_order_items_by_section($1`;
    let values = [sectionId];
    let valueCounter = 2; 
=======
  const {sectionId, branchId, Status} = req.params;
  
  try {
    let query = `SELECT * FROM fn_get_order_items_by_section($1, $2`;
    let values = [sectionId, branchId];
    let valueCounter = 3; 
>>>>>>> 904be0effa7ae20bc1adfe8fb66fb3565d248a4b

    if (Status) {
      query += `, $${valueCounter++}`;
      values.push(Status);
    } else {
      query += `, NULL`;
    }
    query += `)`;
      const result = await client.query(query, values);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
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
    creditDetails,
    additionalDiscount,
    tableId,
    addressId,
    customerPhoneId
  } = req.body;

  try {
    let query = "CALL add_virtual_order($1, $2, $3, $4, $5, $6, $7";
    let values = [
      customerId,
      branchId,
      orderType,
      orderStatus,
      totalPrice,
      paymentMethod,
      orderItems
    ];
    let valueCounter = 8;

    if (creditDetails) {
      query += `, $${valueCounter++}`;
      values.push(creditDetails);
    } else {
      query += `, NULL`;
    }

    if (additionalDiscount) {
      query += `, $${valueCounter++}`;
      values.push(additionalDiscount);
    } else {
      query += `, 0`;
    }

    if (tableId) {
      query += `, $${valueCounter++}`;
      values.push(tableId);
    } else {
      query += `, NULL`;
    }

    if (addressId) {
      query += `, $${valueCounter++}`;
      values.push(addressId);
    } else {
      query += `, NULL`;
    }

    if (customerPhoneId) {
      query += `, $${valueCounter++}`;
      values.push(customerPhoneId);
    } else {
      query += `, NULL`;
    }

    query += `)`;

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

const updateOrderStatus = async (req, res) => {
  const {orderId,orderStatus} = req.body;

  try {
    const query = `call pr_change_order_status($1, $2)`;
    const values = [orderId,orderStatus];
    await client.query(query, values);
    res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
} catch (err) {
  res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
}
};
















module.exports = {
    getVirtualOrderDetails,
    getNonVirtualOrderDetails,
    getOrderItemsBySection,

    addVirtualOrder,
    addNonVirtualOrder,
    
    
    updateOrderStatus,
    
}