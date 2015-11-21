Lancealot.TaskEntryView = Backbone.View.extend({

  template: Templates['taskManager'],

  events: {
    'submit': 'handleSubmit'
  },

  initialize: function() {
    //this.render();
  },

  render: function(){
    this.$el.html(this.template());
    return this;
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var name = $('#description').val();
    var start = $('#start').val();
    var end = $('#end').val();
    var url = window.location.href.split('/');
    var task = new Lancealot.Task({
      name: name,
      start: start,
      end: end,
      job: url[url.length - 1]
    });

    task.save({});

    $('input').val('');
  }

});
