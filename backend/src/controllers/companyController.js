import Company from "../models/Company.js";

export const createCompany = async (req, res) => {
  try {
    const company = await Company.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ user: req.user._id }).sort({
      name: 1
    });

    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
