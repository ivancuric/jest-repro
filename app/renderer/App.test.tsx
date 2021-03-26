import { render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

import App, { useStore } from './App';

test('renders counter', () => {
  render(<App />);
  const counter = screen.getByTestId('count');
  expect(counter).toBeInTheDocument();
});

test('counter is at 0', () => {
  render(<App />);
  const counter = screen.getByTestId('count');
  expect(counter).toHaveTextContent('0');
});

test('renders controls', () => {
  render(<App />);
  const addButton = screen.getByRole('button', { name: 'Add 1' });
  const resetButton = screen.getByRole('button', { name: 'Reset' });
  expect(addButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
});

test('increment works', () => {
  render(<App />);
  const addButton = screen.getByRole('button', { name: 'Add 1' });
  const counter = screen.getByTestId('count');

  userEvent.click(addButton);
  expect(counter).toHaveTextContent('1');
});

describe('custom initial count', () => {
  beforeEach(() => useStore.setState({ count: 5 }));

  test('inital count is 5', () => {
    render(<App />);
    const counter = screen.getByTestId('count');

    expect(counter).toHaveTextContent('5');
  });

  test('reset works', () => {
    render(<App />);
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    const counter = screen.getByTestId('count');

    userEvent.click(resetButton);
    expect(counter).toHaveTextContent('0');
  });
});

test('store works', () => {
  const { result } = renderHook(() => useStore());

  expect(result.current.count).toBe(0);
});

test('can increase store', () => {
  const { result } = renderHook(() => useStore());
  act(() => {
    result.current.add(5);
  });

  expect(result.current.count).toBe(5);
});
