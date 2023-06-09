import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo.js';
import {Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography} from '@material-ui/core';
import { call, signout } from './service/ApiService';
import './App.css';

class App extends React.Component {
  

  constructor(props) {
    super(props);
    this.state= {
      items: [],
      // 1) 로딩중이라는 상태를 표현할 변수를 생성자에 추가
      loading: true,
    };
  }

  componentDidMount() {
    // 2) Todo 리스트를 가져오는 GET 요청이 성공적으로 리턴하는 경우 loading을 false로 수정, 더 이상 로딩중 아님을 표시
    call("/todo", "GET", null).then((response) =>
      this.setState({items: response.data, loading: false})
    );
  };
  
  add = (item) => {
    call("/todo", "GET", null).then((response) =>
      this.setState({items: response.data})
    );
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({items: response.data})
   );
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({items: response.data})
      );
  };

  

  

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin: 16}}>
        <List>
          {this.state.items.map((item, idx) => (
           <Todo 
            item={item} 
            key={item.id} 
            delete={this.delete} 
            update={this.update}
           />
        ))}
        </List>
      </Paper>
    );

    // navigationBar
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography>오늘의 할일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    // 로딩중 아닐 때 렌더링할 부분
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );

    // 로딩중 일 때 렌더링할 부분
    var loadingPage = <h1> 로딩중...</h1>;

    var content = loadingPage;

    if(!this.state.loading) {
      // 로딩중이 아니면 totoListPage
      content = todoListPage;
    }
    return <div className="App">{content}</div>;
  }
}


    
    
    
    // props로 넘겨주기
  //   return (
  //     <div className="App">
  //       {/* 내비게이션 바 렌더링 */}
  //       {navigationBar} 
  //       <Container maxWidth="md">
  //         {/* AddTodo 컴포넌트에서 add() 함수를 props로 넘겨받아 onButtonClick에 사용 */}
  //         <AddTodo add={this.add}/>
  //         <div className='TodoList'>{todoItems}</div>
  //       </Container>
  //     </div>
  //   );
  // }
  
// }

export default App;
