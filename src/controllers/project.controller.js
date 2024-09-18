const { Project } = require('../projects/project.entity');

// Create Project
const createProject = async (req, res) => {
    try {
        const { title , description , image } = req.body;
        const newProject = new Project({ title , description , image  });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProject, getAllProjects };
