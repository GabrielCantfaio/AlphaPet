export type PetSize = 'Pequeno' | 'Médio' | 'Grande';

export type BookingTier = 'classic' | 'hygienic' | 'complete';

export interface ExtraService {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Booking {
  id: string;
  petName: string;
  petType: 'Cachorro' | 'Gato';
  size: PetSize;
  tier: BookingTier;
  extras: string[]; // ids of ExtraService
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  status: 'Pendente' | 'Confirmado' | 'Concluído' | 'Cancelado';
  totalPrice: number;
  notes?: string;
  createdAt: string;
}

export type ActiveTab = 'services' | 'booking' | 'my-bookings' | 'store' | 'about';

export interface PricingDetail {
  service: string;
  pequenoPrice: number;
  medioPrice: number;
  grandePrice: number;
}
