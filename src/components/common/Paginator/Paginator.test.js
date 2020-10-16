import React from 'react';
import { create } from "react-test-renderer";
import { Paginator } from './Paginator';

describe("Paginator component", () => {
  test("should show only 10 pages when totalItemsCount=11 pageSize 10 portionSize=10", () => {
    const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} />);
    const root = component.root;
    const p = root.findAllByType('p');
    expect(p.length).toBe(10);
  });
  test("should show only 1 button", () => {
    const component = create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} />);
    const root = component.root;
    const button = root.findAllByType('button');
    expect(button.length).toBe(1);
  });
});