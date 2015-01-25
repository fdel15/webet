Template.messages.helpers({
  messages: function(){
    return Messages.find({ bet: this._id },
      { sort: { time: -1 } }
    )
  }
});

Template.entry.events({
  "submit .messenger" : function(event){
    event.preventDefault();

    var message = event.target.message.value,
         sentBy = Meteor.user().username,
            bet = this._id;

    Messages.insert({
      message: message,
      sentBy: sentBy,
      bet: bet
    });

    event.target.message.value = '';
  }
});