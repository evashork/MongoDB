// 서비스 - 데이터 관리
angular.module('todomvc')
	.factory('todoStorage', function($http){ 
		// $http 는 
		var storage = {
			// 데이터
			todos: [],
			// todo 리스트
			get:function(callback){
				$http.get('/api/todos').then(function success(response){
					storage.todos = response.data
					callback(storage.todos);
				});
			},
			// todo 생성
			post:function(newTodoTitle){
				var body = {
					title : newTodoTitle
				}
				$http.post('/api/todos', body).then(function success(response){
					storage.todos.push(response.data);
				});
			},
			// todo 삭제
			destory:function(todo){
				var findIdx = storage.todos.findIndex(function (t) {
		            return t.id === todo.id;
	          	});

				$http.delete('/api/todos/'+todo.id).then(function success(response){
					console.log('dddd');
		          	 if (findIdx > -1) {
			            storage.todos.splice(response.data, 1);
			          };
				});
          	},
			// 완료 항목 삭제
			destoryCompleted:function(){
				var notCompleted = storage.todos.filter(function(t){	// javascript - filter 
				return t.completed === false;		// 미완료인 항목을 찾는다.
				});
				angular.copy(notCompleted,storage.todos);
			}
		}

		return storage;
	});