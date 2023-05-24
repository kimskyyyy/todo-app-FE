import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import {Paper, List, Container} from '@material-ui/core';
import './App.css';

class App extends React.Component {
  

  constructor(props) {
    super(props);
    this.state= {
      items: [
        // {id: 0, title: "Hello World", done: true},
        // {id: 1, title: "Hello World2", done: false},
      ],
    };
  }

  

  

  
  add = (item) => {
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length; // key를 위한 id
    item.done = false; // done 초기화
    thisItems.push(item); // 리스트에 아이템 추가
    this.setState({items: thisItems});
    console.log("After add Items: ", this.state.items);
  }

  delete = (item) => {
    const thisItems = this.state.items;
    console.log("Before delete Items: ", this.state.items)
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({items: newItems}, () => {
      console.log("After delete Items: ", this.state.items)
    });
  }

  

  

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin: 16}}>
        <List>
          {this.state.items.map((item, idx) => (
           <Todo item={item} key={item.id} delete={this.delete} />
        ))}
        </List>
      </Paper>
    );

    
    
    

    return (
      <div className="App">
        <Container maxWidth="md">
          {/* AddTodo 컴포넌트에서 add() 함수를 props로 넘겨받아 onButtonClick에 사용 */}
          <AddTodo add={this.add}/>
          <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    );
  }


  componentDidMount() {
    const requestOptions = {
      mehtod: "GET",
      headers: {"Content-Type": "application/json"},
    };

    fetch("http://localhost:8080/api/todo", requestOptions)
    .then((response) => response.json())
    .then(
      (response) => {
        this.setState({
          items: response.data,
        });
      },
      (error) => {
        this.setState({
          error,
        });
      }
    );
  };
  
}

export default App;
