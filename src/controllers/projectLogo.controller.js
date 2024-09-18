const { ProjectLogo } = require('../ProjectsLogo/projectLogo.entity');

// Create ProjectLogos
const createProjectLogo = async (req, res) => {
    try {
        const { image } = req.body;
        const newProjectLogo = new ProjectLogo({  image  });
        await newProjectLogo.save();
        res.status(201).json(newProjectLogo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all ProjectLogos
const getAllProjectLogos = async (req, res) => {
    try {
        const projectsLogo = await ProjectLogo.find();
        res.status(200).json(projectsLogo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProjectLogo, getAllProjectLogos };
