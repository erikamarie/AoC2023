import React from 'react';
import Button from '@mui/material/Button';
import rawData from './day7.txt';
// import rawData from './day7_sample.txt';
import { getAnswers } from './utils';
import { ERROR } from '../../utils';
import { Item } from '../../customRenderers/Item';
  
export class Day7 extends React.Component {
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
        // const { part1, part2 } = result || {};
        return (
            <div className="day">
                <text className="day-header">Day 7: TBD</text>
                <br />
                <text> TBD...</text>
                <br />
                <Button variant="contained" onClick={this.getAnswer}>Get Day 7 Answer</Button>
                <Item>
                    Part 1: { result || ERROR }
                </Item>
            </div>
        );
    }
};