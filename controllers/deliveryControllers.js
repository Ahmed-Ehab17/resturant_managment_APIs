const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");

const getDeliveringOrders = async (req, res) => {
  const { employeeId, orderStatus, branchId } = req.query;

  try {
      let query = `SELECT * FROM get_delivering_orders(`;
      let values = [];
      let valueCounter = 1; 

      if (employeeId) {
          query += `$${valueCounter++}`;
          values.push(employeeId);
      } else {
          query += `NULL`;
      }

      query += `, `;

      if (orderStatus) {
          query += `$${valueCounter++}`;
          values.push(orderStatus);
      } else {
          query += `NULL`;
      }
      
      query += `, `;

      if (branchId) {
          query += `$${valueCounter++}`;
          values.push(branchId);
      } else {
          query += `NULL`;
      }

      query += `)`;

      const result = await client.query(query, values);
      res.status(200).json({ status: httpStatusText.SUCCESS, data: result.rows });
  } catch (err) {
      res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const changeDeliveryOrderStatus = async (req, res) => {
    const { orderId, newStatus } = req.body;
  
    try {
      const query = 'CALL change_delivering_order_status($1, $2)';
      const values = [orderId, newStatus];
      await client.query(query, values);
  
      res.status(200).json({ status: httpStatusText.SUCCESS,data:values});
    } catch (error) {
      res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
    }
  };


const assignOrderToDelivery = async (req, res) => {
    const { orderId, deliveryEmployeeId } = req.body;
    
    try {
      const query = 'CALL assign_order_to_delivery($1, $2)';
      const values = [orderId, deliveryEmployeeId];
      await client.query(query, values);
  
      res.status(200).json({ status: httpStatusText.SUCCESS,data:values});
    } catch (error) {
      res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
    }
  };


const reassignDeliveryOrderEmployee = async (req, res) => {
    const { orderId, newEmployeeId } = req.body;
  
    try {
      const query = 'CALL reassign_delivery_order_employee($1, $2)';
      const values = [orderId, newEmployeeId];
      await client.query(query, values);
  
      res.status(200).json({ status: httpStatusText.SUCCESS,data:values});
    } catch (error) {
      res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
    }
  };







  module.exports = {
    getDeliveringOrders,

    changeDeliveryOrderStatus,


    assignOrderToDelivery,
    reassignDeliveryOrderEmployee,
}