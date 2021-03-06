var myModule = angular.module('Angello.Storyboard', [])
  .controller('StoryboardCtrl', function(STORY_STATUSES, ENDPOINT_URI, loadingService, StoriesModel) {

    var storyboard = this;

    storyboard.endpoint_uri = ENDPOINT_URI;

    storyboard.currentStory = null;
    storyboard.editedStory = {};

    storyboard.setCurrentStory = function(story) {
      storyboard.currentStory = story;
      storyboard.editedStory = angular.copy(storyboard.currentStory);
    };

    storyboard.resetForm = function () {
      storyboard.currentStory = null;
      storyboard.editedStory = {};
      storyboard.detailsForm.$setPristine();
      storyboard.detailsForm.$setUntouched();
      loadingService.setLoading();
      StoriesModel.test();

      StoriesModel.all().
        then(function(result) {
          console.log('test then $http.get');
          console.log(result.data);
        });

    };

    function ID() {
      return '_' + Math.random().toString(36).substr(2, 9);
    }

    storyboard.createStory = function() {
      console.log('Creating story...');
      var newStory = angular.copy(storyboard.editedStory);
      newStory.id = ID();
      newStory.status = 'To Do';
      storyboard.stories.push(newStory);
      storyboard.resetForm();
    };

    storyboard.deleteStory = function(storyId) {
      // using underscore to remove item from stories array
      storyboard.stories = _.filter(storyboard.stories, function(item) {
        return item.id !== storyId;
      });
    };

    storyboard.updateStory = function() {
      var fields = ['title', 'description', 'reporter', 'type', 'status'];

      fields.forEach(function(field) {
        storyboard.currentStory[field] = storyboard.editedStory[field];
      });

      storyboard.resetForm();
    };

    storyboard.updateCancel = function() {
      storyboard.resetForm();
    };

    storyboard.stories = [
      {
        id: 1,
        reporter: 1,
        title: 'First Story',
        type: 'Spike',
        description: 'This is a test',
        status: 'To Do'
      },
      {
        id: 2,
        reporter: 2,
        title: 'Second Story',
        type: 'Enhancement',
        description: 'Testing something',
        status: 'In Progress'
      },
      {
        id: 3,
        reporter: 3,
        title: 'Third Story',
        type: 'Enhancement',
        description: 'A Third Test',
        status: 'In Progress'
      },
      {
        id: 4,
        reporter: 2,
        title: 'New Story',
        type: 'Enhancement',
        description: 'More Test',
        status: 'Code Review'
      }
    ];

    storyboard.showUserId = function(id) {
      console.log('user.id: ' + id);
    };

    storyboard.users = [
      {id: 1, name: 'Mike-1'},
      {id: 2, name: 'Tom-2'},
      {id: 3, name: 'Albert-3'},
      {id: 4, name: 'John-4'}
    ];

    storyboard.statuses = STORY_STATUSES;
});

myModule.value('STORY_STATUSES', [
  {name: 'To Do'},
  {name: 'In Progress'},
  {name: 'In Planning'},
  {name: 'Enhancement'},
  {name: 'Code Review'}
]);

myModule.constant('ENDPOINT_URI', 'https://angello123.firebaseio.com');

myModule.service('loadingService', function() {
  var service = this;
  service.setLoading = function() {
    console.log('doing something running loadingService.setLoading');
  };
});

//myModule.service('StoriesModel', function($http, AuthModel, ENDPOINT_URI) {
myModule.service('StoriesModel', function($http, ENDPOINT_URI) {
  var service = this,
      root = '/clients/', 
      format = '.json',
      path = '/stories/';

  var currentUserId = 'alexis';

  function getUrl(postfix) {
    console.log(ENDPOINT_URI + root + currentUserId + postfix);
    return ENDPOINT_URI + root + currentUserId + postfix;
  }

  service.test = function() {
    console.log('test function from service');
  };

  service.all = function() {
    return $http.get(getUrl(path + format));
  };
});
