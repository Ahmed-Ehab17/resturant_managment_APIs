const { client } = require("../config/dbConfig");
const httpStatusText = require("../utils/httpStatusText");


const addSupplier = async(req, res) => {
    const { firstName, lastName, type, phoneNumber, address, city, locationCoordinates } = req.body;

    try{
        const query = `CALL pr_add_supplier($1, $2, $3, $4, $5, $6, $7)`;
        const values = [ firstName, lastName, type, phoneNumber, address, city, locationCoordinates ];

        await client.query(query, values)
        res.status(200).json({ status: httpStatusText.SUCCESS, data: values });
    }catch(err){
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message})
    }
};

const addSupplyEmployee = async (req, res) => {
    const { companyId, firstName, lastName, phoneNumber, gender } = req.body;

    const companyIdExistQuery = await client.query(`SELECT EXISTS(SELECT 1 FROM suppliers WHERE supplier_id = $1);`, [companyId])
    const companyIdExist = companyIdExistQuery.rows[0].exists
    if(!companyIdExist){
        return res.status(400).json({ status: httpStatusText.FAIL, data: { "companyId" : "ID is not Exist" }})
    }

    const phoneDuplicateQuery = await client.query(`SELECT EXISTS(SELECT 1 FROM supply_companies_employees WHERE supply_emp_phone = $1);`, [phoneNumber])
    const phoneDuplicate = phoneDuplicateQuery.rows[0].exists
    if(phoneDuplicate){
        return res.status(400).json({ status: httpStatusText.FAIL, data: { "phoneNumber" : "Phone Number is Already in use" }})
    }

    try{
        const query = `CALL pr_add_supply_employee($1, $2, $3, $4, $5)`
        const values = [ companyId, firstName, lastName, phoneNumber, gender ]

        await client.query(query, values)
        res.status(200).json({ status: httpStatusText.SUCCESS, data: values })
    }catch(err){
        console.log(err)
        res.status(500).json({ status: httpStatusText.ERROR, message: err.message });
    }
};


module.exports = {
    addSupplier,
    addSupplyEmployee,
}