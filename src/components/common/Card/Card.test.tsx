import { render, screen } from '@testing-library/react';
import Card from '.';

test('Render Card succesfully', () => {
  render(<Card title="title">content</Card>);
  
  expect(screen.getByTestId(/card-title/i)).toHaveTextContent('title');
  expect(screen.getByTestId(/card-content/i)).toHaveTextContent('content');
});
