// App Model

/*
Sets up client side business logic
*/

var App = Backbone.Model.extend({
//These get replaced, logic in router needs to be changed to set them here
//Also: is it Lancealot.Jobs() instead?  seems like it

//NEW GREAT IDEA: PUT THE ROUTER IN HERE?
  initialize: function() {
    this.set('jobs', new Lancealot.Jobs());
    this.set('clients', new Lancealot.Clients());
  },


});