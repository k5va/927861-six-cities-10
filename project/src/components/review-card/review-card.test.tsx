import {render, screen} from '@testing-library/react';
import {ReviewCard} from '..';
import {mockReview} from '../../mocks';

describe('Component: ReviewCard', () => {
  it('should render correctly', () => {
    const review = mockReview();
    render(
      <ReviewCard review={review} />
    );

    expect(screen.getByText(new RegExp(review.comment, 'i'))).toBeInTheDocument();
  });
});
