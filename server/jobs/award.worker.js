'use strict';


module.exports = function(){
  var mongoose = require('mongoose'),
      Award = mongoose.model('Award'),
      Commit = mongoose.model('Commit'),
      User = mongoose.model('User');

  var date = new Date();
  var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
  var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  var maxNumberOfCommits = 0;
  var userRef;

  function findAllUsers(callback){
    User.find({}, function(err, data){
      if(!err) callback(data);
    });
  }

  function processUser(user){
    var query = Commit.find({userId: user.remoteId});
    query.where('createdAt').gte(firstDayOfMonth);
    query.where('createdAt').lte(lastDayOfMonth);
    query.count();
    query.exec(function(err, data){
      console.log('Process User: ', user.name);
      if(data > 0 && data > maxNumberOfCommits){
        maxNumberOfCommits = data;
        userRef = user;
      }
    });
  }

  this.start = function(){
      findAllUsers(function(users){
        users.forEach(function(user){
          processUser(user);
        });
        setTimeout(function () {
          console.log('O usuário foi: ', userRef);
          if(userRef){
            var award = new Award();
            award.month = firstDayOfMonth.getMonth();
            award.year = firstDayOfMonth.getFullYear();
            award.user = userRef;
            award.numberOfCommits = maxNumberOfCommits;
            console.log('User awarded: ', userRef.name);
            award.save(function(err){
              if(err) console.log(err);
            })
          }
        }, 5000);

      });
  }
}
