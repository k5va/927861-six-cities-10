import {render, screen} from '@testing-library/react';
import {Rating} from '../../components';

describe('Component: Rating', () => {
  it('should render correctly', () => {

    render(
      <Rating rate={4.8} />
    );

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });
});
