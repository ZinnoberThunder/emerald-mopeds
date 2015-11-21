// Router

/*
Look at app.js to see where this router comes into play.
Based on the specified route (eg '/', '/add'), the router
will render the appropriate view (eg 'AppView', 'JobEntryView')
*/

Lancealot.Router = Backbone.Router.extend({

  initialize: function(options) {
    this.$el = options.el;
  },

  routes: {
    '': 'index',
    'add': 'addJob',
    'addclient': 'addClient',
    'clients': 'showClients',
    'singleJob/:id': 'showTasks'
  },

  swapView: function(view){
    this.$el.html(view.render().el);
  },

  index: function(){
    var jobs = new Lancealot.Jobs();
    var appView = new Lancealot.AppView({ collection: jobs });
    this.swapView(appView);
  },

  addJob: function(){
    var clients = new Lancealot.Clients();
    this.swapView(new Lancealot.JobEntryView({collection: clients}));
  },

  addClient: function(){
    this.swapView(new Lancealot.ClientEntryView());
  },

  showClients: function(){
    var clients = new Lancealot.Clients();
    var clientsView = new Lancealot.ClientsListView({ collection: clients });
    this.swapView(clientsView);
  },

  showTasks: function(id) {
    var tasks = new Lancealot.Tasks([{job_id: id}], {job_id: id});
    var tasksView = new Lancealot.TasksListView({ collection: tasks });
    this.swapView(tasksView);

  }

  // showTasks: function(id){
  //   console.log("id in router", id);
  //   var that = this;
  //   //var job = new Lancealot.Job({_id: id});
  //   var jobModel = new Lancealot.Job(); 
  //   var job = jobModel.fetch({_id: id,
  //     success: function (data) {
  //       console.log(data);
  //       for(var each in data.attributes){
  //         console.log(data.attributes[each]._id);
  //         if(data.attributes[each]._id === id){
  //           that.swapView(new Lancealot.singleJobView({model: data.attributes[each]}));
  //         }
  //       }
  //     }});
  // }
});
