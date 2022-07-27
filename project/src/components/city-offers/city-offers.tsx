import {OffersList, Map, OffersSorting} from '../../components';
import {Offer} from '../../types';
import {CityOfferProps} from './types';
import {OfferCardMode, OffersSortingType} from '../../const';
import {useState} from 'react';
import {sortOffers} from '../../utils';

function CityOffers({offers}: CityOfferProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const [activeSorting, setActiveSorting] = useState(OffersSortingType.Popular);
  const city = offers[0].city;

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
              offers={sortOffers(offers, activeSorting)}
              mode={OfferCardMode.Cities}
              onActiveOfferChange={(isActive, offer) => setActiveOffer(isActive ? offer : null)}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <Map city={city} offers={offers} selectedOffer={activeOffer} mode={'cities'} />
        </div>
      </div>
    </div>
  );
}

export default CityOffers;
