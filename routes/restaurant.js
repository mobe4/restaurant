const express = require('express');
const router = express.Router();

// Import Restaurant service
const { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant, createMenu, getMenuById, searchRestaurantsByMenu, searchRestaurantsByName } = require('../restaurantService');

// Create a new restaurant
router.post('/', async (req, res) => {
    const newRestaurant = req.body;
    await createRestaurant(newRestaurant);
    res.status(201).send({ message: 'Restaurant created' });
});

// Get all restaurants
router.get('/', async (req, res) => {
    const restaurants = await getRestaurants();
    res.status(200).send(restaurants);
});

// Get a restaurant by ID
router.get('/:id', async (req, res) => {
    const restaurant = await getRestaurantById(req.params.id);
    res.status(200).send(restaurant);
});

// Update a restaurant
router.put('/:id', async (req, res) => {
    const updatedRestaurant = req.body;
    await updateRestaurant(req.params.id, updatedRestaurant);
    res.status(200).send({ message: 'Restaurant updated' });
});

// Delete a restaurant
router.delete('/:id', async (req, res) => {
    await deleteRestaurant(req.params.id);
    res.status(200).send({ message: 'Restaurant deleted' });
});

// Create a new menu for a restaurant
router.post('/:id/menus', async (req, res) => {
    const newMenu = req.body;
    await createMenu(req.params.id, newMenu);
    res.status(201).send({ message: 'Menu created' });
});

// Get a menu by ID
router.get('/menus/:id', async (req, res) => {
    const menu = await getMenuById(req.params.id);
    res.status(200).send(menu);
});

// Search restaurants by menu name
router.get('/search/menu/:name', async (req, res) => {
    const restaurants = await searchRestaurantsByMenu(req.params.name);
    res.status(200).send(restaurants);
});

// Search restaurants by restaurant name
router.get('/search/name/:name', async (req, res) => {
    const restaurants = await searchRestaurantsByName(req.params.name);
    res.status(200).send(restaurants);
});

module.exports = router;
