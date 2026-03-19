export interface Notification {
  id: string;
  type: 'newRequest' | 'requestAccepted' | 'requestRefused';
  title: string;
  message: string;
  time: Date;
  data?: any;
  removing?: boolean;
}