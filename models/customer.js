var bookshelf = require('./../bookshelf');
var user = require('./user');

var Customer = bookshelf.Model.extend({
  tableName: 'customers',
  user: function(){
    return this.belongsTo(User);
  }
});

module.exports = Customer;
