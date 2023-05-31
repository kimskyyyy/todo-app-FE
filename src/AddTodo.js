import React from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item : {title: ""}};
        this.add = props.add; // props의 함수를 this.add에 연결
    }


    // onInputChane함수: 사용자가 input 필드에 키를 입력될 때 마다 실행되며 input필드에 담긴 문자열을 자바스크립트 오브젝트에 저장
    onInputChange = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        console.log("e.target: " + e.target)
        this.setState({item: thisItem});
        console.log(thisItem);
        console.log(thisItem.title);
    }

    // onButtonClick함수: 사용자가 '+'버튼을 클릭할 때 실행되며, onInputChange에서 저장하고 있던 문자열을 리스트에 추가
    onButtonClick = () => {
        this.add(this.state.item); // add 함수 사용
        this.setState({item: {title: ""}});
    }

    // enterKeyEventHandler함수: 사용자가 input 필드상에서 엔터 또는 리턴키를 눌렀을 때 실행되며 기능은 onButtonClick과 같음
    enterKeyEventHandler = (e) => {
        if(e.key === 'Enter') {
            this.onButtonClick();
        }
    }
    

    render() {
        return (
            <Paper style={{margin: 16, padding: 16}}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{paddingRight: 16}}>
                        <TextField 
                            placeholder="Add Todo here" 
                            fullWidth
                            onChange={this.onInputChange}
                            value={this.state.item.title}
                            onKeyPress={this.enterKeyEventHandler}
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button
                            fullWidth 
                            color="secondary" 
                            variant="outlined"
                            onClick={this.onButtonClick}
                            >
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

        )
    }
}

export default AddTodo;