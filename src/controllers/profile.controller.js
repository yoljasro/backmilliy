const { Profile } = require('../Profile/profile.entity');

// Create a new profile
const createProfile = async (req, res) => {
  try {
    const { name, date, number } = req.body;

    // Takroriy telefon raqamini tekshirish
    const existingProfile = await Profile.findOne({ number });
    if (existingProfile) {
      return res.status(400).json({ message: 'Этот номер телефона уже зарегистрирован.' });
    }

    // Yangi profil yaratish
    const newProfile = new Profile({ name, date, number });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Barcha profillarni olish
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Profilni o'chirish
const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfile = await Profile.findByIdAndDelete(id);
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Profilni yangilash
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, number } = req.body;

    const updatedProfile = await Profile.findByIdAndUpdate(
      id, 
      { name, date, number }, 
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { createProfile, getAllProfiles, deleteProfile, updateProfile };
