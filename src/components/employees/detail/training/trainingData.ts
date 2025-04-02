
// Mock data for training types
export const trainingTypes = [
  { id: "bhv-new", name: "BHV - Nieuw" },
  { id: "bhv-refresh", name: "BHV - Herhaling" },
  { id: "vca-basic", name: "VCA Basis" },
  { id: "vca-vol", name: "VCA-VOL" },
  { id: "first-aid", name: "EHBO" },
  { id: "forklift", name: "Heftruck" }
];

// Enhanced mock data for training providers and available dates
export const trainingProviders: Record<string, Array<{
  id: number;
  name: string;
  availableDates: Array<{
    date: Date;
    spotsLeft: number;
    time: string;
    location: string;
    trainer: string;
  }>;
}>> = {
  "bhv-new": [
    {
      id: 1,
      name: "Veiligheid & Co",
      availableDates: [
        { 
          date: new Date(2024, 7, 15), 
          spotsLeft: 5,
          time: "09:00 - 16:00",
          location: "Hoofdkantoor Amsterdam",
          trainer: "Jan Bakker"
        },
        { 
          date: new Date(2024, 7, 20), 
          spotsLeft: 3,
          time: "09:30 - 16:30",
          location: "Trainingscentrum Utrecht",
          trainer: "Petra de Jong"
        },
        { 
          date: new Date(2024, 7, 27), 
          spotsLeft: 0,
          time: "08:30 - 15:30",
          location: "Hoofdkantoor Amsterdam",
          trainer: "Jan Bakker"
        } // Full
      ]
    },
    {
      id: 2,
      name: "BHV Centrum Nederland",
      availableDates: [
        { 
          date: new Date(2024, 7, 10), 
          spotsLeft: 2,
          time: "10:00 - 17:00",
          location: "Trainingscentrum Rotterdam",
          trainer: "Marco Visser"
        },
        { 
          date: new Date(2024, 8, 5), 
          spotsLeft: 8,
          time: "09:00 - 16:00",
          location: "Trainingscentrum Eindhoven",
          trainer: "Lisa Jansen"
        }
      ]
    }
  ],
  "bhv-refresh": [
    {
      id: 1,
      name: "Veiligheid & Co",
      availableDates: [
        { 
          date: new Date(2024, 7, 18), 
          spotsLeft: 4,
          time: "09:00 - 13:00",
          location: "Hoofdkantoor Amsterdam",
          trainer: "Jan Bakker"
        },
        { 
          date: new Date(2024, 8, 1), 
          spotsLeft: 0,
          time: "13:00 - 17:00",
          location: "Trainingscentrum Utrecht",
          trainer: "Petra de Jong"
        } // Full
      ]
    },
    {
      id: 3,
      name: "Hulpverlening Academie",
      availableDates: [
        { 
          date: new Date(2024, 7, 22), 
          spotsLeft: 6,
          time: "09:00 - 13:00",
          location: "Trainingscentrum Den Haag",
          trainer: "Robert Smit"
        }
      ]
    }
  ],
  "vca-basic": [
    {
      id: 4,
      name: "VCA Opleidingen",
      availableDates: [
        { 
          date: new Date(2024, 7, 12), 
          spotsLeft: 7,
          time: "09:00 - 16:00",
          location: "Hoofdkantoor Amsterdam",
          trainer: "Kees Janssen"
        },
        { 
          date: new Date(2024, 7, 25), 
          spotsLeft: 4,
          time: "09:00 - 16:00",
          location: "Trainingscentrum Utrecht",
          trainer: "Marieke de Vries"
        }
      ]
    }
  ],
  "vca-vol": [
    {
      id: 4,
      name: "VCA Opleidingen",
      availableDates: [
        { 
          date: new Date(2024, 7, 13), 
          spotsLeft: 6,
          time: "09:00 - 17:00",
          location: "Hoofdkantoor Amsterdam",
          trainer: "Peter Verhoeven"
        },
        { 
          date: new Date(2024, 7, 26), 
          spotsLeft: 2,
          time: "09:00 - 17:00",
          location: "Trainingscentrum Utrecht",
          trainer: "Marieke de Vries"
        }
      ]
    }
  ],
  "first-aid": [
    {
      id: 5,
      name: "Rode Kruis",
      availableDates: [
        { 
          date: new Date(2024, 8, 3), 
          spotsLeft: 5,
          time: "10:00 - 16:00",
          location: "Rode Kruis Centrum Amsterdam",
          trainer: "Sandra Nieuwenhuis"
        }
      ]
    }
  ],
  "forklift": [
    {
      id: 6,
      name: "Logistiek Training Centrum",
      availableDates: [
        { 
          date: new Date(2024, 7, 19), 
          spotsLeft: 4,
          time: "08:30 - 16:30",
          location: "Praktijkcentrum Almere",
          trainer: "Johan Willemsen"
        },
        { 
          date: new Date(2024, 8, 9), 
          spotsLeft: 7,
          time: "08:30 - 16:30",
          location: "Praktijkcentrum Rotterdam",
          trainer: "Bas Evers"
        }
      ]
    }
  ]
};
