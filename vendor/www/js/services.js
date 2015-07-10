angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  var id = 0;

  // Some fake testing data
  var chats = [/*{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }*/];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    add: function(chat) {
      chat.id = ++id;
      chats.push(chat);
    }
  };
})

.factory('identity', function($ionicUser, auth) {
  var identified = true;

  // Identifies a user with the Ionic User service
  return {
    Identify : function() {
      console.log('Ionic User: Identifying with Ionic User service');

      var user = $ionicUser.get();
      if(!user.user_id) {
        // Set your user_id here, or generate a random one.
        user.user_id = $ionicUser.generateGUID();
      };

      // Add some metadata to your user object.
      angular.extend(user, {
        //user_id: auth.profile.user_id,
        name: auth.profile.name,
        image: auth.profile.picture
      });

      // Identify your user with the Ionic User Service
      $ionicUser.identify(user).then(function(){
        identified = true;
        alert('Identified user ' + auth.profile.name + '\n ID ' + auth.profile.user_id);
      });

      return true;
    },
    identified : identified
  };

})

.factory('notification', function($ionicPush, auth, Chats) {
  // Registers a device for push notifications and stores its token
  return {
    Register : function() {
      console.log('Ionic Push: Registering user');

      // Register with the Ionic Push service.  All parameters are optional.
      $ionicPush.register({
        canShowAlert: true, //Can pushes show an alert on your screen?
        canSetBadge: true, //Can pushes update app icon badges?
        canPlaySound: true, //Can notifications play a sound?
        canRunActionsOnWake: true, //Can run actions outside the app,
        onNotification: function(notification) {
          // Handle new push notifications here
          console.log(notification);
          if (notification.event == "message") {
            var chat = {
              id: 0,
              name: notification.from,
              lastText: notification.message,
              face: auth.profile.picture
            };
            Chats.add(chat);
          }
          return true;
        }
      });
    }
  };
});

