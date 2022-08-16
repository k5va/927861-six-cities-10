import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ReviewsForm} from '../../components';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types';
import {mockOffer} from '../../mocks';
import {AppStatus, NameSpace} from '../../const';

const mockStore = configureMockStore<State>();
const offer = mockOffer();
const store = mockStore({
  [NameSpace.Data]: {appStatus: AppStatus.Ready}
});

describe('Component: ReviewsForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ReviewsForm offerId={offer.id} />
      </Provider>
    );

    expect(screen.getByPlaceholderText(
      /Tell how was your stay, what you like and what can be improved/i)
    ).toBeInTheDocument();
  });

  it('Should dispatch postReview on submit', async () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ReviewsForm offerId={offer.id} />
      </Provider>
    );

    (screen.getByRole('button') as HTMLButtonElement).disabled = false;
    await userEvent.click(screen.getByRole('button'));
    expect(store.dispatch).toBeCalled();
  });
});
