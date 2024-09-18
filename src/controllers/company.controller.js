const { Company } = require('../companies/company.entity');

// Company yaratish
const createCompany = async (req, res) => {
  try {
    const { companyName, email, address, profilePhotoLocation, encryptedPassword } = req.body;
    const newCompany = new Company({ companyName, email, address, profilePhotoLocation, encryptedPassword });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Barcha kompaniyalarni olish
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCompany, getAllCompanies };
