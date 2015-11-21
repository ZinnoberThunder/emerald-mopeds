Lancealot.TasksListView = Backbone.View.extend({

  tagName: 'table',
  className: 'table table-striped',

  template: Templates['tasktablehead'],

  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },

  render: function(){
    this.$el.empty();
    var taskEntryView = new Lancealot.TaskEntryView(); 
    $('#container').append(taskEntryView.render().el);
    this.$el.append(this.template());
    return this;
  },

  addOne: function(item){
    var view = new Lancealot.TaskView({ model: item });
    this.$el.append(view.render().el);
  },

  addAll: function(){
    console.log(this.collection);
    this.collection.forEach(this.addOne, this);
  },

  filteredRender: function(list) {
    this.$el.empty();
    this.$el.html(this.template());
    list.forEach(this.addOne, this);
  }

});
