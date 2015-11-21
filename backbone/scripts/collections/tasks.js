//Tasks collection
Lancealot.Tasks = Backbone.Collection.extend({

  model: Lancealot.Task,

  url: function() {
    return '/jobs/' + this.job_id;
  },

  initialize: function(models, options) {
    _.extend(this, _.pick(options, 'job_id'));
    console.log("task models", models);
    console.log("opts", this.job_id);
    console.log(this.url()); 
  }

});
