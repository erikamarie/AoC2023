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
    getSumOfValidGameNumbersWithSumPower,
    isNumValid,
} from './utils';
  
const ERROR = 'ERROR: Shitter was full, Clark!';
  class SnowGlobal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            const maxValues = {
                red: this.red || 0,
                green: this.green || 0,
                blue: this.blue || 0,
            };
            const day2Answer = getSumOfValidGameNumbersWithSumPower(text, maxValues);
            this.setState({
                day2Result: day2Answer,
            });
        });
    }
    
    renderDay1 = () => {
        const { day1Result } = this.state;
        return (
            <div className="day1">
                <text className="day-header">Day 1: Digit Code</text>
                <Button variant="contained" onClick={this.getDay1Answer}>Day 1 Solution</Button>
                <Item>
                    { day1Result || ERROR }
                </Item>
            </div>
        );
    }
    setMaxColor = (event) => {
        const { id, value } = event.target;
        this[id] = value;
    }
    renderDay2 = () => {
        const { day2Result } = this.state;
        const { sumGames, sumPowers, allSumPowers } = day2Result || {};
        const validGames = isNumValid(sumGames);
        const validPower = isNumValid(sumPowers);
        const validAllPower = isNumValid(allSumPowers);
        const error = validGames ? 'No Valid Games' : ERROR;
        const powerError = validPower ? 'No Valid Power' : error;
        const allPowerError = validAllPower ? 'No Valid All Power' : ERROR;
        const sumGamesMessage = validGames ? sumGames : error;
        const sumPowerMessage = validPower ? sumPowers : powerError;
        const sumAllPowerMessage = validAllPower ? allSumPowers : allPowerError;
        return (
            <div className="day2">
                <text className="day-header">Day 2: The Game</text>
                <TextField id="red" label="Red" variant="outlined" onChange={this.setMaxColor}/>
                <TextField id="green" label="Green" variant="outlined" onChange={this.setMaxColor} />
                <TextField id="blue" label="Blue" variant="outlined" onChange={this.setMaxColor}/>
                <div>
                    <Button variant="contained" onClick={this.getDay2Answer}>Get Valid Games</Button>
                </div>
                <div>
                    Sum of Valid Game Numbers: { sumGamesMessage }
                </div>
                <div>
                    Sum of Valid Powers: { sumPowerMessage }
                </div>
                <div>
                    Sum of ALL Powers: { sumAllPowerMessage }
                </div>
            </div>
        );
    }
    
    render() {
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
  