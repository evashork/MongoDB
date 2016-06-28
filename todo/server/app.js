var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var todos = [
	{
		id: 1,
		title: '코드랩 참석',
		completed: true
	},
	{
		id: 2,
		title: '요가 하기',
		completed: true
	}
];

// bodyParser 설정
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// 파일폴더 소스 설정
app.use('/', express.static(path.join(__dirname, '../client')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// todo 리스트
app.get('/api/todos', function (req, res) {
	res.json(todos);
});

// todo 생성
app.post('/api/todos', function (req, res) {
	var newTodoId = todos.length > 0 ? todos[todos.length -1].id + 1 : 1;

	var newTodo = {
		id : newTodoId,
		title : req.body.title,
		completed: false
	};
	todos.push(newTodo);

	res.json(newTodo);
});

// todo 삭제
app.delete('/api/todos/:id', function(req, res){
	var delId = req.params.id;	
	console.log(delId);
	// index 찾기
	var findIdx = todos.findIndex(function(t){	// javascript - findIndex 배열에서 true값이 나올때까지 조회한다.
		//console.log(t.id);
		return t.id == delId;
	});
	//console.log(findIdx);
	// remove
	if(findIdx > -1){ 							// index가 있을 경우
		todos.splice(findIdx, 1); 				// javascript - splice 배열에서 지운다
	}
	res.json(todos);
})

// 메인 페이지 설정
app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.listen(3000, function () {
  console.log('3000포트 오픈 성공');
});