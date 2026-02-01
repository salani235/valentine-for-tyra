
export interface Memory {
  id: number;
  imageUrl: string;
  message: string;
  isSpicy?: boolean;
  effect?: 'sunflowers' | 'butterflies' | 'hearts' | 'sparkles'; 
}

export enum AppPhase {
  INVITE = 'INVITE',
  CELEBRATE = 'CELEBRATE'
}
