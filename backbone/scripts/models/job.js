// Job Model
Lancealot.Job = Backbone.Model.extend({
  urlRoot: '/jobs',
  id: 1,
  select: function(){
    this.trigger("jobViewClick", this);
  }
});
