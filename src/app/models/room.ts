export interface Room {
  id: string;
  name: string;
  type: 'Single' | 'Double' | 'Suite';
  price: number;
  isAvailable: boolean;
  description?: string;
  imageUrl?: string;
}