import React from 'react';
import { render, screen, act } from '@testing-library/react';
import CountdownTimer from './CountdownTimer';

describe('CountdownTimer Component (Exercise 2)', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('displays initial countdown value and decrements every second', () => {
    render(<CountdownTimer initialValue={5} />);

    expect(screen.getByText('Time Remaining: 5')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('Time Remaining: 4')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Time Remaining: 2')).toBeInTheDocument();
  });

  test('stops counting down when it reaches 0', () => {
    render(<CountdownTimer initialValue={2} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Time Remaining: 0')).toBeInTheDocument();

    // Advance further, should remain 0
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByText('Time Remaining: 0')).toBeInTheDocument();
  });

  test('cleans up interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval');
    const { unmount } = render(<CountdownTimer initialValue={10} />);

    unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
