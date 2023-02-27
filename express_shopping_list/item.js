const items = require("./fakeDb");

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        items.push(this);
    }

    // Finds all items
    static findAllItems() {
        return items;
    }

    // Finds a specific item by name
    static find(name) {
        const itemFound = items.find(i => i.name === name)
        if(itemFound === undefined) {
            throw {message: "Item not found", status: 404}
        }
        return itemFound
    }

    // After finding a specific item by name, updates it
    static update(name, data) {
        let itemFound = Item.find(name);
        if(itemFound === undefined){
            throw {message: "Item not found", status: 404}
        }
        itemFound.name = data.name;
        itemFound.price = data.price;
        console.log('itemFound', itemFound)
        return itemFound;
    }

    // After finding a specific item, removes it
    static remove(name) {
        let itemFound = Item.find(name);
        if (itemFound === undefined) {
            throw {message: "Item not found", status: 404}
        }
        items.splice(itemFound, 1);
    }
};

module.exports = Item