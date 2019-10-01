
import 'react-native';
import React from 'react';
import Card from '../../src/components/Card';
import renderer from 'react-test-renderer';
import expectExport from 'expect';

it('renders correctly', () => {
    const tree = renderer.create('<Card />').toJSON();
    expectExport(tree).toMatchSnapshot();
});


// Testing onCardPressed
// Mock an object of item
// Create an instance of <Card /> and pass mocked item, 
// index, player and onCardPressed props
// Validate if onCardPressed prop is called from onCardPressed method
