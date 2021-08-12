import * as React from 'react';
import Button from "../button/Button";
import Enzyme, { shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe("Button test", () => {
  test("test props style", () => {
    // 这个<div></div>是我测试写的，本来是引入的一个组件
    const wrapper = shallow(<Button style={{color: '#000'}}>测试btn</Button>);
    expect(wrapper.props().style.color).toBe("#000");
  });
});
