import React from 'react';
import Button from '@mui/material/Button';
import rawData from '../../sampleData/day3.txt';
// import rawData from '../../sampleData/day3_sample.txt';
import { getSumEngineParts } from './utils';
import { ERROR } from '../../utils';
import { Item } from '../../customRenderers/Item';
  
export class Day3 extends React.Component {
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
            const answer = getSumEngineParts(text);
            this.setState({
                result: answer,
            });
        });
    };

    render() {
        const { result } = this.state;
        const { gearRatios, sumPartNumbers } = result || {};
        return (
            <div className="day1">
                <text className="day-header">Day 3: The Engine</text>
                <br />
                <text> We need an engine code...</text>
                <br />
                <Button variant="contained" onClick={this.getAnswer}>Get Day 3 Answer</Button>
                <Item>
                    Part 1: { sumPartNumbers || ERROR }
                    Part 2: { gearRatios || ERROR }
                </Item>
            </div>
        );
    }
};