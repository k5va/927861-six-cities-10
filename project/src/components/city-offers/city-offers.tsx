import {OffersList, Map, OffersSorting, Spinner, NoOffers} from '../../components';
import {Offer} from '../../types';
import {AppStatus, OfferCardMode, OffersSortingType} from '../../const';
import {useCallback, useMemo, useState} from 'react';
import {findCityOffers, sortOffers} from '../../utils';
import {useAppSelector} from '../../hooks';
import {getAppStatus, getCity, getOffers} from '../../store/selectors';

function CityOffers(): JSX.Element {
  const cityName = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const appStatus = useAppSelector(getAppStatus);

  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [activeSorting, setActiveSorting] = useState(OffersSortingType.Popular);

  const onActiveOfferChange = useCallback(
    (isActive: boolean, offer: Offer) => setActiveOffer(isActive ? offer : null),
    []
  );

  const filteredOffers = useMemo<Offer[]>(
    () => sortOffers(findCityOffers(cityName, offers), activeSorting),
    [cityName, offers, activeSorting]
  );

  if (appStatus === AppStatus.Pending) {
    return <Spinner />;
  }

  if (appStatus === AppStatus.Ready && filteredOffers.length === 0) {
    return <NoOffers city={cityName} />;
  }

  const city = filteredOffers[0].city;

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city.name}</b>
          <OffersSorting
            sorting={activeSorting}
            onSortingChange={(sorting) => {setActiveSorting(sorting);}}
          />
          <div className="cities__places-list places__list tabs__content">
            <OffersList
              offers={filteredOffers}
              mode={OfferCardMode.Cities}
              onActiveOfferChange={onActiveOfferChange}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <Map city={city} offers={filteredOffers} selectedOffer={activeOffer} mode={'cities'} />
        </div>
      </div>
    </div>
  );
}

export default CityOffers;
