import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import rawData from '../../sampleData/day2.txt';
import { getSumOfValidGameNumbersWithSumPower } from './utils';
import { ERROR, isNumValid } from '../../utils';
  
export class Day2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
        };
    }

    getAnswer = () => {
        fetch(rawData)
        .then(r => r.text())
        .then(text => {
            const maxValues = {
                red: this.red || 0,
                green: this.green || 0,
                blue: this.blue || 0,
            };
            const answer = getSumOfValidGameNumbersWithSumPower(text, maxValues);
            this.setState({
                result: answer,
            });
        });
    };

    setMaxColor = (event) => {
        const { id, value } = event.target;
        this[id] = value;
    }

    render() {
        const { result } = this.state;
        const { sumGames, sumPowers, allSumPowers } = result || {};
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
                <div>
                    <text className="day-header">Day 2: The Color Game</text>
                    <br />
                    <text> Figure out the number of colored blocks...</text>
                    <br />
                </div>
                <div>
                    <TextField id="red" label="Red" variant="outlined" onChange={this.setMaxColor}/>
                    <TextField id="green" label="Green" variant="outlined" onChange={this.setMaxColor} />
                    <TextField id="blue" label="Blue" variant="outlined" onChange={this.setMaxColor}/>
                </div>
                <div>
                    <Button variant="contained" onClick={this.getAnswer}>Get Day 2 Answer</Button>
                </div>
                <div>
                    <ul>
                        <li>Sum of Valid Game Numbers: { sumGamesMessage }</li>
                        <li>Sum of Valid Powers: { sumPowerMessage }</li>
                        <li>Sum of ALL Powers: { sumAllPowerMessage }</li>
                    </ul>
                </div>
            </div>
        );
    }
};