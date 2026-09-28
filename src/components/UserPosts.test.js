import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserPosts from './UserPosts';

describe('UserPosts Component (Exercise 1)', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('fetches and displays posts for a given userId', async () => {
    const mockPosts = [
      { id: 1, title: 'First Post Title', body: 'First Post Body' },
      { id: 2, title: 'Second Post Title', body: 'Second Post Body' },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    render(<UserPosts userId={1} />);

    expect(screen.getByText(/loading posts.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('First Post Title')).toBeInTheDocument();
      expect(screen.getByText('First Post Body')).toBeInTheDocument();
      expect(screen.getByText('Second Post Title')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts?userId=1');
  });

  test('refetches data when userId prop changes', async () => {
    const mockPostsUser1 = [{ id: 1, title: 'User 1 Post', body: 'Content 1' }];
    const mockPostsUser2 = [{ id: 2, title: 'User 2 Post', body: 'Content 2' }];

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPostsUser1,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPostsUser2,
      });

    const { rerender } = render(<UserPosts userId={1} />);

    await waitFor(() => {
      expect(screen.getByText('User 1 Post')).toBeInTheDocument();
    });

    // Rerender with different userId
    rerender(<UserPosts userId={2} />);

    await waitFor(() => {
      expect(screen.getByText('User 2 Post')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts?userId=2');
  });
});
