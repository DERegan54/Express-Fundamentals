process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
let items = require('../fakeDb');

let item = {name: "crackers", price: 5}


// Test setup
beforeEach(async () => {
    items.push(item)
});

afterEach(async () => {
    items.length = 0;
});


// GET Tests: Get list of items, Get a specific item, Item not found
describe('GET /items', async function() {
    test ('Gets a list of all items', async function() {
        const response = await request(app).get(`/items`);
        const {items} = response.body;
        expect(response.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
});


describe('GET /items/:name', async function () {
    test ('Get a specific item', async function() {
        const response = await request(app).get(`/items/${item.name}`);
        expect (response.statusCode).toBe(200);
        expect(response.body.item).toEqual(item);
    });

    test('Item not in db, respond with 404', async function () {
        const response = await request(app).get(`/items/0`);
        expect(response.statusCode).toBe(404);
    })
});


// POST test: Create and return a new list item 
describe('POST /items', async function() {
    test('Creates a new list item', async function () {
        const response = await (await request(app).post(`/items`)).send({name: "Cheerios", price: 3.99}
        );
        expect(response.statusCode).toBe(200);
        expect(response.body.item.name).toEqual("Cheerios");
        expect(response.body.item.price).toEqual(3.99);
    });
});


// PATCH test: update and return existing item, item not found
describe('PATCH /items/:name', async function () {
    test ('Updates a specific item', async function () {
        const respose = await request(app).patch(`/items/${item.name}`).send({price: 2.99}
            );
        expect(response.statusCode).toBe(200);
        expect(response.body.price).toEqual({price: 2.99}); 
    })

    test ("Item not in db, respond with 404", async function () {
        const response = await request(app).patch(`/items/0`);
        expect(response.statusCode).toBe(404);
    });
});


// DELETE test: deletes a specific item
describe('DELETE /items/:name', async function () {
    test ('Deletes a specific item', async function () {
        const response = await request(app).delete(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Item deleted."});
    });
});
