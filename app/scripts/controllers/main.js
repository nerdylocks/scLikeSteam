'use strict';

LikeStream.controller('UserMgmt', function($scope, $rootScope, $route, $http, $browser, $cookies, $cookieStore){
    OAuth.initialize('bKANLpsjGu9trGEcW-ZxuFpbkiM');

    $rootScope.API_ENDPOINT = 'https://api.soundcloud.com/';
    var me = 'me.json?oauth_token=';
    var users = 'ueser?oauth_token=';

    $rootScope.LogIn = function () {
        OAuth.popup('soundcloud', function (error, result) {
            //use result.access_token in your API request
            if (error) {
                alert(error);
            } else {
                // Get access token, store it in cookies
                $cookies.access_token = result.access_token;
                $rootScope.GetUserProfile(result.access_token);
            }
        });
    }

    $rootScope.LogOut = function(){
        $cookieStore.remove($cookies.access_token);
        $cookieStore.remove("access_token");
<<<<<<< HEAD
        window.location = 'http://nerdylocks.github.io/scLikeSteam/app';
=======
        $rootScope.User = "";
        $route.reload();
>>>>>>> master
    }

    $rootScope.GetUserProfile = function(access_token){
        $http.get($rootScope.API_ENDPOINT + 'me.json?oauth_token=' + access_token).success(function(data){
            $cookieStore.put(access_token, data);
            $rootScope.User = $cookieStore.get(access_token);
<<<<<<< HEAD
            console.log($rootScope.User);
            window.location = 'http://nerdylocks.github.io/scLikeSteam/app';
=======

            $route.reload();
>>>>>>> master
        });
    }
    $rootScope.following = [];
    $scope.getMyFollingsIds = function(userId){
        $http.get($rootScope.API_ENDPOINT + 'users/' + userId + '/followings.json?oauth_token=' + $cookies.access_token).success(function(data){
            //angular.forEach(data, function(key, value){
                $rootScope.following = data.id;
                console.log($rootScope.following);

            //});
        });
    }
    $rootScope.User =  $cookieStore.get($cookies.access_token);
    console.log($rootScope.User);
    $scope.getMyFollingsIds($rootScope.User);



});
LikeStream.controller('MainCtrl', function ($scope, $http, $rootScope, $cookies, $cookieStore) {

    var widgetIframe = document.getElementById('sc-widget'),
        widget       = SC.Widget(widgetIframe);

    if($rootScope.User){
        $http.get($rootScope.User.uri + '/followings.json?oauth_token=' + $cookies.access_token).success(function(data){
            $scope.followers = data;
        });
    }
    $scope.favs;
    $scope.getLikes = function(user_id){
        $http.get($rootScope.API_ENDPOINT + 'users/' + user_id + '/favorites.json?oauth_token=' + $cookies.access_token).success(function(data){
            $scope.favs = data;
            console.log($scope.favs);
            $scope.checkFollowing();
        });
    }

    $scope.Follow = function(userId){
        $http.put($rootScope.API_ENDPOINT + 'me/followings/' + userId + '?oauth_token=' + $cookies.access_token).success(function(data){
            console.log(data);
            alert('Following ' + userId);

        });
    }

    $scope.checkFollowing = function(userId){
        angular.forEach($scope.favs, function(key, value){
            if(key.id = userId){
                console.log('match found ', userId, key.id = userId);
            }
        });

    }
    $scope.isLiked = 'liked-false';
    $scope.Like = function(trackId){
        $http.put($rootScope.API_ENDPOINT + 'me/favorites/' + trackId + '?oauth_token=' + $cookies.access_token).success(function(data){
            if(data.status == "201 - Created"){
                $scope.favs[trackId].user_favorite = true;
            }

        });
    }

    $scope.togglePlay = function(track){

        widget.load(track, {
            show_artwork: false,
            auto_play:true,
            show_comments:false,
            buying:false,
            liking:false,
            sharing:false,
            show_playcount:false,
            show_user:false,
        });

    }

});

LikeStream.controller('Likes', function ($scope, $rootScope,$routeParams, $http, $cookies) {
    if($rootScope.User){

    }
});
