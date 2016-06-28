// 컨트롤러
angular.module('todomvc')
	.controller('todomvcCtrl', function($scope, todoStorage){
		//$scope는 자바스크립트와 html을 연결해주는 역활을 한다. 데이터 바인딩
		// todoStorage는 서비스에서 가져온 것

		// todo 리스트 - get 서비스 사용, 비동기 코드 콜백
		todoStorage.get(function(data){
			$scope.todos = data;
		});

		// todo 추가
		$scope.add = function(newTodoTitle) {
			// 빈값이 왔을 경우 리턴
			newTodoTitle = newTodoTitle.trim();
			if(newTodoTitle === '') return;
			// post 서비스 사용
			todoStorage.post(newTodoTitle);
			$scope.newTodoTitle = '';
		}

		// todo 삭제 - destory 서비스 사용
		$scope.remove = function(todo){
			todoStorage.destory(todo);
		};

		// 완료 항목 삭제 - destoryCompleted - 서비스 사용
		$scope.clearCompleted = function(){
			todoStorage.destoryCompleted();
		}
})