const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");

const getCustomerAddresses = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const query = `SELECT * FROM fn_get_customer_addresses($1)`;
    const values = [customerId];
    const result = await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { attendance: result.rows },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};
const getCustomerInformation = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const query = `SELECT * FROM fn_get_customer_info($1)`;
    const values = [customerId];
    const result = await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { information: result.rows },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};
const getCustomerPhones = async (req, res) => {
  const customerId = req.params.customerId;
  try {
    const query = `SELECT * FROM fn_get_customer_phones($1)`;
    const values = [customerId];
    const result = await client.query(query, values);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { phones: result.rows } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};
const getFriendRequests = async (req, res) => {
  const accountId = req.params.accountId;
  try {
    const query = `SELECT * FROM fn_get_friend_requests($1)`;
    const values = [accountId];
    const result = await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { requests: result.rows },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};
const getFriendsList = async (req, res) => {
  const accountId = req.params.accountId;
  try {
    const query = `SELECT fn_get_friends_list($1)`;
    const values = [accountId];
    const result = await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { friendList: result.rows },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const getCustomerOrders = async (req, res) => {
  const customerId = req.params.customerId;
  const limit = req.params.limit;
  const status = req.params.status;

  try {
    const query = `SELECT * FROM fn_get_customer_orders($1, $2, $3)`;
    const values = [customerId, limit, status];
    const result = await client.query(query, values);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { orders: result.rows } });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const getCustomerBookings = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const query = `SELECT * FROM fn_get_customer_bookings($1)`;
    const values = [customerId];
    const result = await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { bookings: result.rows },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const getCustomerSignInInfo = async (req, res) => {
  const customerPhone = req.params.customerPhone;

  try {
    const query = `SELECT * FROM fn_get_customer_sign_in_info($1)`;
    const values = [customerPhone];
    const result = await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { customerInfo: result.rows },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const getCustomerMenuRatings = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const query = `SELECT * FROM fn_get_customer_menu_ratings($1)`;
    const values = [customerId];
    const result = await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { customerMenuRatings: result.rows },
    });
  } catch (err) {
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const updateCustomerAddress = async (req, res) => {
  const { customerId, addressId, customerAddress, customerCity, locationCoordinates } = req.body;

  try {
    const query = `call pr_update_customer_address($1, $2, $3, $4, $5)`;
    const values = [customerId, addressId, customerAddress, customerCity, locationCoordinates];
    await client.query(query, values);

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: res.locals.notice,
      data: values,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: httpStatusText.ERROR, message: "Server Error" });
  }
};

const addCustomer = async (req, res) => {
  const { firstName, lastName, gender, phone, address, city = null, locationCoordinates = null, birthDate = null } = req.body;

  try {
    const query = `call pr_add_customer($1, $2, $3, $4, $5, $6, $7, $8)`;
    const values = [firstName, lastName, gender, phone, address, city, locationCoordinates, birthDate];
    await client.query(query, values);

    res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: httpStatusText.ERROR, message: "Server Error" });
  }
};

const addCustomerAddress = async (req, res) => {
  const { customerId, address, city = null, locationCoordinates = null } = req.body;

  try {
    const query = `call pr_add_customer_address($1, $2, $3, $4)`;
    const values = [customerId, address, city, locationCoordinates];
    await client.query(query, values);

    res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: httpStatusText.ERROR, message: "Server Error" });
  }
};

const addCustomerPhone = async (req, res) => {
  const { customerId, phone } = req.body;

  try {
    const query = `call pr_add_customer_phone($1, $2)`;
    const values = [customerId, phone];
    await client.query(query, values);

    res.status(201).json({ status: httpStatusText.SUCCESS, data: values });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: httpStatusText.ERROR, message: "Server Error" });
  }
};

const addFavorite = async (req, res) => {
  const { customerId, itemId } = req.body;
  try {
    const query = `CALL pr_add_favorite($1, $2)`;
    const values = [customerId, itemId];
    await client.query(query, values);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: {
        customerId: customerId,
        itemId: itemId,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
  }
};

const addCustomerAccount = async (req, res) => {
  const {
    customerId,
    firstName,
    lastName,
    gender,
    phone,
    password,
    address,
    city = null,
    locationCoordinates = null,
    birthDate = null,
    profileImg = null,
  } = req.body;
  console.log(req.body);  
  try {
    const query = `CALL pr_add_account_to_customer ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    const values = [customerId, firstName, lastName, gender, phone, password, address, city, locationCoordinates, birthDate, profileImg];
    await client.query(query, values);
    console.log();
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { customerId }})
  } catch (error) {
    res.status(500).json({ status: httpStatusText.ERROR, message: error.message });
  }
};

module.exports = {
  getCustomerAddresses,
  getCustomerInformation,
  getCustomerPhones,
  getFriendRequests,
  getCustomerOrders,
  getCustomerBookings,
  getCustomerSignInInfo,
  getCustomerMenuRatings,

  getFriendsList,

  updateCustomerAddress,

  addCustomer,
  addCustomerAddress,
  addCustomerPhone,
  addFavorite,
  addCustomerAccount,
};
