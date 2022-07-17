import {useState} from 'react';
import {PlaceCard} from '../../components';
import {Offer} from '../../types';
import {OffersListProps} from './types';

function OffersList({offers}: OffersListProps): JSX.Element {
  const [, setActiveOffer] = useState<null | Offer>(null);

  const onMouseOver = (offer: Offer) => setActiveOffer(offer);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} onMouseOver={onMouseOver} />)}
    </div>
  );
}

export default OffersList;
