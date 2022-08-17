import {configureMockStore} from '@jedmao/redux-mock-store';
import {renderHook} from '@testing-library/react';
import {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {NameSpace} from '../../const';
import {useFavoritesCount} from '../../hooks';
import {mockOffers} from '../../mocks';
import {State} from '../../types';

const mockStore = configureMockStore<State>();
const offers = mockOffers().map((offer) => ({...offer, isFavorite: true}));
const store = mockStore({
  [NameSpace.Data]: {offers},
});

describe('Hook: useFavoritesCount', () => {
  it('should return count favorites correctly', () => {
    const {result} = renderHook(
      () => useFavoritesCount(),
      {
        wrapper: ({children}: PropsWithChildren): JSX.Element =>
          <Provider store={store}>{children}</Provider>
      }
    );

    const favoritesCount = result.current;
    expect(favoritesCount).toEqual(offers.length);
  });
});
