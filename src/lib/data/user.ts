// lib/data/users.ts

export type User = {
  id: string;
  name: string;
  keywords: string;
  joinedDate: string;
  status: 'pending' | 'delivered';
  createdAt: string;
};

export const users: User[] = [
  {
    id: '1',
    name: 'Ali Khan',
    keywords: 'developer, react, javascript',
    joinedDate: '2025-05-13',
    status: 'pending',
    createdAt: '2025-05-13',
  },
  {
    id: '2',
    name: 'Sara Malik',
    keywords: 'designer, figma, uiux',
    joinedDate: '2022-12-05',
    status: 'delivered',
    createdAt: '2025-05-13',
  },
  {
    id: '3',
    name: 'Ahmed Raza',
    keywords: 'backend, nodejs, express',
    joinedDate: '2024-03-18',
    status: 'pending',
    createdAt: '2025-05-13',
  },
  {
    id: '4',
    name: 'Hina Aslam',
    keywords: 'fullstack, mongodb, nextjs',
    joinedDate: '2021-08-22',
    status: 'delivered',
    createdAt: '2025-05-13',
  },
  {
    id: '5',
    name: 'Usman Javed',
    keywords: 'data analyst, python, sql',
    joinedDate: '2020-05-30',
    status: 'pending',
    createdAt: '2025-05-13',
  },
  {
    id: '6',
    name: 'Nadia Tariq',
    keywords: 'qa, testing, selenium',
    joinedDate: '2022-09-14',
    status: 'delivered',
    createdAt: '2025-05-13',
  },
  {
    id: '7',
    name: 'Bilal Mehmood',
    keywords: 'devops, aws, docker',
    joinedDate: '2023-06-11',
    status: 'pending',
    createdAt: '2025-05-13',
  },
  {
    id: '8',
    name: 'Maria Yousaf',
    keywords: 'mobile, flutter, dart',
    joinedDate: '2024-01-25',
    status: 'delivered',
    createdAt: '2025-05-13',
  },
  {
    id: '9',
    name: 'Zain Ul Abideen',
    keywords: 'game dev, unity, csharp',
    joinedDate: '2022-07-19',
    status: 'pending',
    createdAt: '2025-05-13',
  },
  {
    id: '10',
    name: 'Rabia Naveed',
    keywords: 'seo, marketing, content',
    joinedDate: '2021-03-07',
    status: 'delivered',
    createdAt: '2025-04-13',
  },
];
