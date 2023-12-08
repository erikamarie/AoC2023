import React from 'react';
import Button from '@mui/material/Button';
import rawData from './day1.txt';
import { getSumFirstLastDigit } from './utils';
import { ERROR } from '../../utils';
import { Item } from '../../customRenderers/Item';
  
export class Day1 extends React.Component {
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
            const answer = getSumFirstLastDigit(text);
            this.setState({
                result: answer,
            });
        });
        // Day 1: 55208, 54578
    };

    render() {
        const { result } = this.state;
        return (
            <div className="day1">
                <text className="day-header">Day 1: Digit Code</text>
                <br />
                <text> Figure out the right codes from digits...</text>
                <br />
                <Button variant="contained" onClick={this.getAnswer}>Day 1 Answer</Button>
                <Item> Sum Numbers: { result || ERROR } </Item>
            </div>
        );
    }
};