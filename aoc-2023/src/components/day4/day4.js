import React from 'react';
import Button from '@mui/material/Button';
import rawData from '../../sampleData/day4.txt';
// import rawData from '../../sampleData/day4_sample.txt';
// import rawData from '../../sampleData/day4_p2_sample.txt';
import { getAnswers } from './utils';
import { ERROR } from '../../utils';
import { Item } from '../../customRenderers/Item';
  
export class Day4 extends React.Component {
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
            const answer = getAnswers(text);
            this.setState({
                result: answer,
            });
        });
    };

    render() {
        const { result } = this.state;
        const { part1, part2 } = result || {};
        return (
            <div className="day4">
                <text className="day-header">Day 4: Scratchoff Winners</text>
                <br />
                <text> Get winning scratchoff tickets...</text>
                <br />
                <Button variant="contained" onClick={this.getAnswer}>Get Day 4 Answer</Button>
                <Item>
                    Part 1: { part1 || ERROR }
                </Item>
                <Item>
                    Part 2: { part2 || ERROR }
                </Item>
            </div>
        );
    }
};