const { Motto } = require('../Motto/motto.entity');

// Create Motto
const createMotto = async (req, res) => {
  try {
    const { title , description } = req.body;
    const newMotto = new Motto({ title , description });
    await newMotto.save();
    res.status(201).json(newMotto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Barcha kompaniyalarni olish
const getAllMotto = async (req, res) => {
  try {
    const mottos = await Motto.find();
    res.status(200).json(mottos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createMotto, getAllMotto };
