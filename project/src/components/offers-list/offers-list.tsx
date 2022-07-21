import {useState} from 'react';
import {PlaceCard} from '../../components';
import {PlaceCardMode} from '../../const';
import {Offer} from '../../types';
import {OffersListProps} from './types';

function OffersList({offers, onOfferHover}: OffersListProps): JSX.Element {
  const [, setActiveOffer] = useState<null | Offer>(null);

  const onMouseOver = (offer: Offer) => {
    setActiveOffer(offer); // TODO: Why save to state?
    onOfferHover(offer);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <PlaceCard key={offer.id} offer={offer} mode={PlaceCardMode.Cities} onMouseOver={onMouseOver} />
      )}
    </div>
  );
}

export default OffersList;
