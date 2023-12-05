import React from 'react';
import ReactDOM from 'react-dom/client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import './index.css';
import { Item } from './customRenderers/Item';
import rawDay1 from './sampleData/day1.txt';
import rawDay2 from './sampleData/day2.txt';

import { 
    getSumFirstLastDigit,
    getSumOfValidGameNumbers
} from './utils';
  
  class SnowGlobal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Merry Christmas, shitter was full!',
            day1Result: null,
            day2Result: null,
        };
      }

    componentDidMount() {
        // Commented in favor of user-driven requests
        // this.parseDay1();
        // this.parseDay2();
    }

    getDay1Answer = () => {
        fetch(rawDay1)
        .then(r => r.text())
        .then(text => {
            const day1Answer = getSumFirstLastDigit(text);
            this.setState({
                day1Result: day1Answer,
            });
        });
        // Day 1: 55208, 54578
    }

    getDay2Answer = () => {
        fetch(rawDay2)
        .then(r => r.text())
        .then(text => {
            const day2Answer = getSumOfValidGameNumbers(text);
            this.setState({
                day2Result: day2Answer,
            });
        });
    }
    
    renderDay1 = () => {
        const { day1Result, message } = this.state;
        return (
            <div className="day1">
                <text className="day-header">Day 1: Digit Code</text>
                <Button variant="contained" onClick={this.getDay1Answer}>Day 1 Solution</Button>
                <Item>
                    { day1Result || message }
                </Item>
            </div>
        );
    }

    renderDay2 = () => {
        const { day2Result, message } = this.state;
        const error = day2Result === 0 ? 'No Valid Games' : message;
        const dayMessage = day2Result && day2Result > 0 ? day2Result : error;
        return (
            <div className="day2">
                <text className="day-header">Day 2: The Game</text>
                <TextField id="red" label="Red" variant="outlined" defaultValue={0}/>
                <TextField id="red" label="Green" variant="outlined" defaultValue={0} />
                <TextField id="red" label="Blue" variant="outlined" defaultValue={0}/>
                <div>
                    <Button variant="contained" onClick={this.getDay2Answer}>Submit</Button>
                </div>
                <div>
                    { dayMessage }
                </div>
            </div>
        );
    }
    
    render() {
        console.log('Rendering...');
        return (
            <div className="snow-global-output">
                <text className="header">Advent of Code 2023</text>
                <Box sx={{ width: '100%' }}>
                    <Stack spacing={4}>
                        <Item>{this.renderDay1()}</Item>
                        <Item>{this.renderDay2()}</Item>
                    </Stack>
                </Box>
            </div>
        );
    }
  }
    
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<SnowGlobal />);
  