var checkForDefender = function(defender){
  if (Meteor.users.find({username: defender}).count() === 0){
    throw new Meteor.Error(
      alert( "Sorry the Username you are trying to challenge is not valid!" )
    );
  }
};

var checkForUserAsDefender = function(options){
  if (options.defender === options.username) {
    throw new Meteor.Error(
      alert( "You can't bet yourself!" )
    );
  }
};

var getDefenderByUsername = function(defender){
  return Meteor.users.findOne({ username: defender });
}

Template.createBetForm.helpers({
  image: function(){
    return Session.get("image");
  }
})

Template.createBetForm.events({
  "submit .create-bet" : function(event){
    event.preventDefault();
    var bet = {}
    bet.title = event.target.betTitle.value;
    bet.wager = event.target.betWager.value;
    bet.user = Meteor.user();
    bet.defender = event.target.defender.value;
    bet.defender_id = Meteor.users.find({username: defender}).fetch()[0]._id;
    bet.image = Session.get('image_id');
    bet.type = 'bet';

    checkForUserAsDefender({ username: username, defender: defender });
    checkForDefender(defender);

    Meteor.call('createBet', username, defender, title, wager, betImage);
    Meteor.call('createBetNotification', username, defender, type);

    if (Friends.find({ $and: [ { user: user._id }, { friend: defender }  ]}).count() === 0) {

      Meteor.call("addFriend", defender_id, username);
      Meteor.call("addFriend", user._id, defender);
    }

    Router.go('/dashboard');
  },

  "click .take-photo" : function(event){
    event.preventDefault();

    var cameraOptions = {
      width: 700,
      height: 500,
      quality: 100
    };

    MeteorCamera.getPicture(cameraOptions, function(error, data){
      var image = Images.insert(data);
      Session.set('image', data);
      Session.set('image_id', image._id);
    });
  }
});