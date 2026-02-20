const EmployModel = require('../Models/EmployModel');

const createEmploy = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    const body = req.body;
    body.profileImage = req.file ? req.file.path : null;

    const emp = new EmployModel(body);
    await emp.save();

    res.status(201).json({
      message: "Employ created",
      success: true,
    });

  } catch (err) {
    console.error("CREATE EMPLOY ERROR:", err); // 🔥 important

    res.status(500).json({
      message: 'Internal server Error',
      success: false,
      error: err.message
    });
  }
};


const updateEmployById = async (req,res)=>{
 try {
  const {name, email, phone,salary, department} = req.body;
  const {id} = req.params;
  let updateData = {
    name,
    email,
    phone,
    salary,
    department,
    updatedAt: Date.now()
  };

  if(req.file){
    updateData.profileImage = req.file.path; 
  }
  console.log(updateData);
  const updateEmploy = await EmployModel.findByIdAndUpdate(
    id,
    updateData,
    {new:true}
  );

    if(!updateEmploy){
      return res.status(404).json({ message: "Employ not found"});
    }

  res.status(200)
     .json({
      message: "Employ updated",
      success: true,
      data: updateEmploy
     })
 } catch (err) {
  res.status(500).json({
    message: 'Internal server Error',
    success: false,
    error: err.message
    
  })
  
 }
}

const getAllEmploy = async (req,res)=>{
 try { 
     let {page,limit,search} = req.query;
     page = parseInt(page) || 1;
     limit = parseInt(limit) || 10;
     const skip = (page - 1)*limit;



    let searchCriteria = {};
    if(search){
      searchCriteria = {
        name:{
          $regex: search,
          $options: 'i'
        }
      }
    }


    const totalEmployees = await EmployModel.countDocuments(searchCriteria);


  const emp = await EmployModel.find(searchCriteria)
  .skip(skip)
  .limit(limit)
  .sort({ updatedAt: -1 });

  const totalPages = Math.ceil(totalEmployees/limit);
  res.status(200).json({
  message: "Employ fetched",
  success: true,
  data: {
    employs: emp,
    pagination: {
      totalEmploys: totalEmployees,
      currentPage: page,
      totalPages,
      pageSize: limit
    }
  }
});

 } catch (err) {
  res.status(500).json({
    message: 'Internal server Error',
    success: false,
    error: err.message
    
  })
  
 }
}


const getEmployById = async (req,res)=>{
 try {
  const {id}=req.params;
  const emp = await EmployModel.findById(id);
  res.status(200)
     .json({

      message: "Get Employ Details",
      success: true,
      data: emp
     })
 } catch (err) {
  res.status(500).json({
    message: 'Internal server Error',
    success: false,
    error: err.message
    
  })
  
 }
}

const deleteEmployById = async (req,res)=>{
 try {
  const {id}=req.params;
  const emp = await EmployModel.findByIdAndDelete(id);
  res.status(200)
     .json({

      message: "Employ deleted",
      success: true,
      data: emp
     })
 } catch (err) {
  res.status(500).json({
    message: 'Internal server Error',
    success: false,
    error: err.message
    
  })
  
 }
}


module.exports = {
    createEmploy,
    getAllEmploy,
    getEmployById,
    deleteEmployById,
    updateEmployById,
}