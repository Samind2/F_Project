const Store = require("../models/store.models");

// Create and Save a New Store
exports.create = async (req, res) => {
  const { storeId, storeName, address, latitude, longitude, deliveryRadius } = req.body;

  // Check for required fields
  if (!storeName || !address || !latitude || !longitude || !deliveryRadius) {
    res.status(400).send({
      message: "Store Name, Address, Latitude, Longitude, and Delivery Radius cannot be empty!",
    });
    return; // Stop further execution
  }

  try {
    // Check if store already exists
    const existingStore = await Store.findOne({ where: { storeName: storeName } });
    if (existingStore) {
      res.status(400).send({
        message: "Store already exists!",
      });
      return;
    }

    // Create a new store
    const newStore = {
      storeId,
      storeName,
      address,
      latitude,
      longitude,
      deliveryRadius,
    };

    const data = await Store.create(newStore);
    res.status(201).send(data); // Send created store with 201 status
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while creating the store.",
    });
  }
};