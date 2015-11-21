Lancealot.TaskView = Backbone.View.extend({

  tagName: 'tr',

  template: Templates['taskInfo'],

  initialize: function() {
    this.model.on('change', this.render, this);
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});
