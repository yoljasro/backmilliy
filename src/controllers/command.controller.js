const { Command } = require('../Command/command.entity');

// Create Command
const createCommand = async (req, res) => {
    try {
        const { name , image , jobTitle } = req.body;
        const newCommand = new Command({ name , image , jobTitle });
        await newCommand.save();
        res.status(201).json(newCommand);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Command
const getAllCommand = async (req, res) => {
    try {
        const commands = await Command.find();
        res.status(200).json(commands);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCommand, getAllCommand };
