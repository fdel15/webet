Template.navigation.helpers({
  notificationsCount: function(){
    return betNotifications.find({
      toNotify: Meteor.user().username
    }).count();
  }
});

Template.navigation.events({
  "click .open-button" : function(){
    Session.set( "user", Meteor.user().username );
    Session.set( "status", "open" );
  },

  "click .pending-button" : function(){
    Session.set( "user", Meteor.user().username );
    Session.set( "status", "pending" );
  },

  "click .completed-button" : function(){
    Session.set( "user", Meteor.user().username );
    Session.set( "status", "complete" );
  },

  "click .deleteAllNotifications" : function(){
    Meteor.call("deleteAllNotifications", Meteor.user().username)
  },

  "click .logout-link" : function(){
    Session.keys = {};
    Meteor.logout();
  }
});
