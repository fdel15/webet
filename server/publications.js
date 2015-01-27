Meteor.publish('bets', function(){
  return Bets.find();
});

Meteor.publish('betNotifications', function(){
  return BetNotifications.find();
});

Meteor.publish('messages', function(){
  return Messages.find();
});

Meteor.publish('allUsernames', function(){
  return Meteor.users.find();
});

Meteor.publish('images', function(){
  return Images.find();

});

Meteor.publish("friendsList", function() {
  return Friends.find();
});

