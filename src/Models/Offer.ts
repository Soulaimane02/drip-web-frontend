import OfferStatus from "./OfferStatus";

interface Offer {
  price: number;
  articleId: string;
  status: OfferStatus;
}

export default Offer;
