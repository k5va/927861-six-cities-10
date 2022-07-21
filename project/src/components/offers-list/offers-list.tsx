import {PlaceCard} from '../../components';
import {Offer} from '../../types';
import {OffersListProps} from './types';

function OffersList({offers, mode, onActiveOfferChange}: OffersListProps): JSX.Element {

  const onMouseOver = (offer: Offer) => {
    onActiveOfferChange?.(offer);
  };

  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          mode={mode}
          onMouseOver={onMouseOver}
        />
      ))}
    </>
  );
}

export default OffersList;
