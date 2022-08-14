declare global {
  interface Window {
    phantom: any;
  }
}

export interface Job {
  name: string;
  address: string;
  credit: number;
}
