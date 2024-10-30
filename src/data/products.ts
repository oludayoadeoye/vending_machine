export const products = [
  {
    id: '1',
    name: 'Classic Cola',
    price: 2.50,
    quantity: 10,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=200&h=200',
    code: 'A1'
  },
  {
    id: '2',
    name: 'Crunchy Chips',
    price: 1.75,
    quantity: 15,
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=200&h=200',
    code: 'A2'
  },
  {
    id: '3',
    name: 'Chocolate Bar',
    price: 2.00,
    quantity: 8,
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=200&h=200',
    code: 'A3'
  },
  {
    id: '4',
    name: 'Sparkling Water',
    price: 1.50,
    quantity: 12,
    image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&q=80&w=200&h=200',
    code: 'A4'
  }
];

export const acceptedMoney: Money[] = [
  { value: 0.25, label: '25¢' },
  { value: 0.50, label: '50¢' },
  { value: 1.00, label: '$1' },
  { value: 2.00, label: '$2' },
  { value: 5.00, label: '$5' }
];