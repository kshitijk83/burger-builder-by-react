import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {burgerbuilder} from './BurgerBuilder';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<burgerbuilder fetchIngHandler={()=>{}} />);
    })

    it('should render <BuildControl /> when receiving ingredients', ()=>{
        wrapper.setProps({ings: {salad:0}});
    });
});