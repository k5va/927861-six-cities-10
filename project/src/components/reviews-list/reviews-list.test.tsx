import {render, screen} from '@testing-library/react';
import {ReviewsList} from '../../components';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types';
import {mockReviews} from '../../mocks';
import { NameSpace } from '../../const';

const mockStore = configureMockStore<State>();
const reviews = mockReviews();
const store = mockStore({
  [NameSpace.Data]: {reviews}
});

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ReviewsList />
      </Provider>
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).not.toEqual([]);
  });
});
