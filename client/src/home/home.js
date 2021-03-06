angular
    .module('caroOnline')
    .controller('homeCtrl', homeCtrl);

function homeCtrl($scope, $http, auth, $location, $window, $timeout, dialog) {
    if (auth.isLoggedIn() == false) {
        $location.path('/')
    }

    let tmp = {};
    $scope.rooms = [];
    $scope.users = [];
    let user = JSON.parse(auth.getUser());


    socket.on('deleteRoom', function (data) {
        $http.post('/api/room/delete', data)
            .then(function successCallback(dt) {
                $scope.rooms.forEach(function (room, i) {
                    if (room.id == data.id) {
                        $scope.rooms.splice(i, 1);
                        // $window.location.reload();
                    }
                })
            }, function errorCallback(err) {
                console.log(err);
            })
    })

    $http.post('/api/user/list', tmp)
        .then(function successCallback(data) {
            $scope.users = data.data.listUser;
        }, function errorCallback(err) {
            console.log(err);
        })

    $http.post('/api/room/list', tmp)
        .then(function successCallback(data) {
            $scope.rooms = data.data.listRoom;
        }, function errorCallback(err) {
            console.log(err);
        })

    $scope.addRoom = function () {
        dialog.nameRoom(function (result) {
            console.log(JSON.stringify(result));
            
            if (result) {
                // socket.emit('joinRoom', {
                //     room: result,
                //     user: user
                // });
                $window.sessionStorage['room'] = JSON.stringify(result);
                $location.path('/room')
            }
        })
    }

    socket.on('roomNew', function (data) {
        $timeout(function () {
            $scope.rooms.push(data)
        })
    })

    $scope.joinRoom = function (roomName) {
        $http.post('/api/room/info', { name: roomName })
            .then(function successCallback(data) {
                socket.emit('joinRoom', {
                    room: data.data.room,
                    user: user
                });
                $window.sessionStorage['room'] = JSON.stringify(data.data.room);
                $location.path('/room');
            }, function errorCallback(err) {
                console.log(err);
            })
    }
}
