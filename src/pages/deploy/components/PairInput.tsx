import * as React from 'react';
import { Component } from 'react';
import { Input, InputNumber } from 'antd';

interface PairInputProps {
  value?: any;
  onChange?: any;
  useNum: boolean;
  firstPlaceholder: string;
  secondPlaceHolder: string;
  names: [];
}

interface PairInputState {
  first: any;
  second: any;
}

class PairInput extends Component<PairInputProps, PairInputState> {
  static defaultProps = {
    names: ['key', 'value'],
  };

  constructor(props: any) {
    super(props);
    this.state = {
      first: undefined,
      second: undefined,
    };
  }

  onFirstChange = (value: any) => {
    const data = this.props.useNum ? value : value.target.value;
    this.setState({
      first: data,
    });
  };

  onSecondChange = (value: any) => {
    const data = this.props.useNum ? value : value.target.value;
    this.setState({
      second: data,
    });
  };

  render() {
    return <div style={{ width: '90%', display: 'inline-block' }}>
      {
        this.props.useNum ?
          <InputNumber
            placeholder={this.props.firstPlaceholder}
            value={this.state.first}
            onChange={this.onFirstChange}
            style={{ width: '45%' }}
          /> :
          <Input
            placeholder={this.props.firstPlaceholder}
            value={this.state.first}
            onChange={this.onFirstChange}
            style={{ width: '45%' }}
          />
      }
      <span style={{ marginLeft: 10, marginRight: 10, width: '10%' }}>
        {this.props.useNum ? '-' : '='}
      </span>
      {
        this.props.useNum ?
          <InputNumber
            placeholder={this.props.secondPlaceHolder}
            value={this.state.second}
            onChange={this.onSecondChange}
            style={{ width: '45%' }}
          /> :
          <Input
            placeholder={this.props.secondPlaceHolder}
            value={this.state.second}
            onChange={this.onSecondChange}
            style={{ width: '45%' }}
          />
      }
    </div>;
  }
}

export default PairInput;
