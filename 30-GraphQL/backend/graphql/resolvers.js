// The resolver is an exported object where we 
// need a hello method from our schema.js definition

module.exports = {
    hello() {
        return {
            text: 'Hello World',
            views: 12345
        }
    }
};