import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Spinner} from '../../components';
import {AppStatus, NameSpace} from '../../const';
import {State} from '../../types';

const mockStore = configureMockStore<State>();
const store = mockStore({
  [NameSpace.Data]: {appStatus: AppStatus.Pending}
});


describe('Component: Spinner', () => {
  it('should render correctly when app status pending', () => {

    render(
      <Provider store={store}>
        <Spinner />
      </Provider>
    );

    expect(screen.getByRole(/progressbar/i)).toBeInTheDocument();
  });
});
