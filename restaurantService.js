const { client } = require('./db');
const { ObjectId } = require('mongodb');

async function createRestaurant(newRestaurant) {
    const result = await client.db("restaurantDB").collection("restaurants").insertOne(newRestaurant);
    console.log(`New restaurant created with the following id: ${result.insertedId}`);
}

async function getRestaurants() {
    const result = await client.db("restaurantDB").collection("restaurants").find().toArray();
    return result;
}

async function getRestaurantById(id) {
    const result = await client.db("restaurantDB").collection("restaurants").findOne({ _id: new ObjectId(id) });
    return result;
}

async function updateRestaurant(id, updatedRestaurant) {
    const result = await client.db("restaurantDB").collection("restaurants").replaceOne({ _id: new ObjectId(id) }, updatedRestaurant);
    console.log(`Updated restaurant with id ${id}`);
}

async function deleteRestaurant(id) {
    const result = await client.db("restaurantDB").collection("restaurants").deleteOne({ _id: new ObjectId(id) });
    console.log(`Deleted restaurant with id ${id}`);
}

async function createMenu(restaurantId, newMenu) {
    const result = await client.db("restaurantDB").collection("menus").insertOne(newMenu);
    const restaurant = await getRestaurantById(restaurantId);
    restaurant.menus.push(result.insertedId);
    updateRestaurant(restaurantId, restaurant);
    console.log(`New menu created with the following id: ${result.insertedId}`);
}

async function getMenuById(id) {
    const result = await client.db("restaurantDB").collection("menus").findOne({ _id: new ObjectId(id) });
    return result;
}

async function searchRestaurantsByMenu(name) {
    const menus = await client.db("restaurantDB").collection("menus").find({ name: name }).toArray();
    const restaurantIds = menus.map(menu => menu.restaurantId);
    const restaurants = await client.db("restaurantDB").collection("restaurants").find({ _id: { $in: restaurantIds }}).toArray();
    return restaurants;
}

async function searchRestaurantsByName(name) {
    const restaurants = await client.db("restaurantDB").collection("restaurants").find({ name: name }).toArray();
    return restaurants;
}

module.exports = { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant, createMenu, getMenuById, searchRestaurantsByMenu, searchRestaurantsByName };
