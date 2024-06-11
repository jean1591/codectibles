export interface KingdomCellInterface {
  icon: string;
  size: number;
}

export type Kingdom = (KingdomCellInterface | null)[];
