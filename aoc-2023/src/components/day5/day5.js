import React from 'react';
import Button from '@mui/material/Button';
// import rawData from '../../sampleData/day5.txt';
import rawData from '../../sampleData/day5_sample.txt';
import { getAnswers } from './utils';
import { ERROR } from '../../utils';
import { Item } from '../../customRenderers/Item';
  
export class Day5 extends React.Component {
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
                <text className="day-header">Day 5: Seed Fertilizer</text>
                <br />
                <text> If you give a seed fertilizer...</text>
                <br />
                <Button variant="contained" onClick={this.getAnswer}>Get Day 5 Answer</Button>
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