Template.betItem.helpers({
  openStatus: function(){
    return ( this.status === "open" ) ? true : false;
  },

  pendingStatus: function(){
    return ( this.status === "pending" ) ? true : false;
  },

  completedStatus: function(){
    return ( this.status === "completed" ) ? true : false;
  },

  showEditForm: function(){
    if( Session.get("edit") ){
      return true;
    } else {
      Session.set("edit", false);
      return false;
    }
  },
    showCompleteBetForm: function(){
      if( Session.get("complete?") ){
        return true;
      } else {
        Session.set("completed?", false);
        return false;
      }
    },
});

Template.betItem.events({
  'click .remove_bet_button' : function(){
    Meteor.call("deleteBet", this._id);
  },

  'click .accept_button' : function(){
     Meteor.call("updateStatus", this._id, "pending");
  },

  'click .complete_bet_button' : function(){
    Meteor.call("updateStatus", this._id, "completed");
  },

  'click .edit_button' : function(){
    Session.set('edit', !Session.get('edit'));
  },

  'submit .edit-bet' : function(event){
    event.preventDefault();

    var title = event.target.betTitle.value,
        wager = event.target.betWager.value,
        user = Meteor.user().username,
        defender = event.target.defender.value;

    Meteor.call("editBet", this._id, user, defender, title, wager);

    Session.set('edit', !Session.get('edit'));
  }
});
