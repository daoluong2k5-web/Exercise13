import React from 'react';
import { render, screen, act } from '@testing-library/react';
import WindowSize from './WindowSize';

describe('WindowSize Component (Exercise 3)', () => {
  test('renders current window size', () => {
    window.innerWidth = 1024;
    window.innerHeight = 768;

    render(<WindowSize />);

    expect(screen.getByText('Window size: 1024 x 768')).toBeInTheDocument();
  });

  test('updates window size when resize event fires', () => {
    window.innerWidth = 1024;
    window.innerHeight = 768;

    render(<WindowSize />);

    act(() => {
      window.innerWidth = 800;
      window.innerHeight = 600;
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByText('Window size: 800 x 600')).toBeInTheDocument();
  });

  test('removes resize event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<WindowSize />);

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
