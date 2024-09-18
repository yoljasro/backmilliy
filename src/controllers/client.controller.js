const { Client } = require('../Clients/client.entity');

// Company yaratish
const createClient = async (req, res) => {
    try {
        const { title , video } = req.body;
        const newClient = new Client({ title , video });
        await newClient.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Barcha kompaniyalarni olish
const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createClient, getAllClients };
