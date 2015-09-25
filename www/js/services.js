angular.module('starter.services', [])

.factory('Journal', function() {
  // Give us an example object
  var journal = [
    {
      "id": 1,
      "title": "My 1st Entry",
      "content": "This is a sample entry."
    }
  ];

  // If we have a journal object, use that!
  // Added to function for use at both initialization
  // and later to be able to refresh the journal
  var loadJournal = function() {
    if (localStorage.journal)
      journal = JSON.parse(localStorage.journal);
  };

  var save = function() {
    localStorage.journal = JSON.stringify(journal);
  };

  loadJournal();

  return {
    all: function() {
      return journal;
    },
    remove: function(entry) {
      journal.splice(journal.indexOf(entry), 1);
      save();
    },
    get: function(entryId) {
      for (var i = 0; i < journal.length; i++) {
        if (journal[i].id === parseInt(entryId)) {
          return journal[i];
        }
      }
      return null;
    },
    add: function(entry) {
      // Assumes entries are ordered by id (asc) and
      // will reuse ids when last entries are removed,
      // but at least addresses duplicates and removal
      entry.id = journal[journal.length - 1].id + 1
      journal.push(entry);
      save();
    },
    update: function(entry) {
      for (var i = 0; i < journal.length; i++) {
        if (journal[i].id == entry.id) {
          journal[i] = entry;
          save();
        }
      }
      return null;
    },
    refresh: function() {
      loadJournal();
      return journal;
    }
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
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
  }];

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
    }
  };
});
