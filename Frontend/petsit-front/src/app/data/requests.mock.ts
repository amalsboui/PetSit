export interface Request {
  id: number;
  ownerId: number;
  sitterId?: number;      
  animalType: string;
  petName?: string;   
  startDate: string;
  endDate: string;
  description: string;
  status: 'pending' | 'accepted' | 'refused';
  sitter: {          
    firstname: string;
    lastname: string;
  };
  owner: {          
    firstname: string;
    lastname: string;
  };

}
/*
export const REQUESTS: Request[] = [
  {
    id: 1,
    ownerId: 1,
    ownerName: 'Amal',
    sitterId: 101,
    sitterName: 'Yasmine',
    animalType: 'Dog',
    petName: 'Max',
    startDate: '2025-03-10',
    endDate: '2025-03-15',
    description: 'Friendly dog, needs daily walks.',
    status: 'pending',
  },
  {
    id: 2,
    ownerId: 2,
    ownerName: 'Eya',
    sitterId: 102,
    sitterName: 'Bob',
    animalType: 'Cat',
    petName: 'Luna',
    startDate: '2025-04-01',
    endDate: '2025-04-05',
    description: 'Indoor cat, calm and independent.',
    status: 'accepted',
  },
  {
    id: 3,
    ownerId: 3,
    ownerName: 'Sara',
    sitterId: 103,
    sitterName: 'Alice',
    animalType: 'Rabbit',
    petName: 'Snow',
    startDate: '2025-05-02',
    endDate: '2025-05-04',
    description: 'Needs feeding twice a day.',
    status: 'refused',
  },
  {
    id: 4,
    ownerId: 4,
    ownerName: 'John',
    sitterId: 101,
    sitterName: 'Yasmine',
    animalType: 'Dog',
    petName: 'Buddy',
    startDate: '2025-06-01',
    endDate: '2025-06-03',
    description: 'Energetic dog, likes long walks.',
    status: 'pending',
  },
  {
    id: 5,
    ownerId: 5,
    ownerName: 'Maya',
    sitterId: 103,
    sitterName: 'Alice',
    animalType: 'Cat',
    petName: 'Whiskers',
    startDate: '2025-07-10',
    endDate: '2025-07-15',
    description: 'Shy cat, prefers quiet environment.',
    status: 'pending',
  }
];*/