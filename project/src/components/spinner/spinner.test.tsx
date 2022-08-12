import {render, screen} from '@testing-library/react';
import {Spinner} from '../../components';

describe('Component: Spinner', () => {
  it('should render correctly', () => {

    render(
      <Spinner />
    );

    expect(screen.getByRole(/progressbar/i)).toBeInTheDocument();
  });
});
