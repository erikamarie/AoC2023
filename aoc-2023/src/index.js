import React from 'react';
import ReactDOM from 'react-dom/client';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import './index.css';
import { Item } from './customRenderers/Item';
import { Day1 } from './components/day1/day1';
import { Day2 } from './components/day2/day2';
import { Day3 } from './components/day3/day3';
import { Day4 } from './components/day4/day4';
import { Day5 } from './components/day5/day5';

  
  class SnowGlobal extends React.Component {
    renderComponents = () => {
        return (
            <Stack spacing={4}>
                <Item>
                    <Day5></Day5>
                </Item>
                <Item>
                    <Day4></Day4>
                </Item>
                <Item>
                    <Day3></Day3>
                </Item>
                <Item>
                    <Day2></Day2>
                </Item>
                <Item>
                    <Day1></Day1>
                </Item>
            </Stack>
        );
    }
    render() {
        return (
            <div className="snow-global-output">
                <text className="header">Advent of Code 2023</text>
                <Box sx={{ width: '100%' }}>
                    {this.renderComponents()}
                </Box>
            </div>
        );
    }
  }
    
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<SnowGlobal />);
  