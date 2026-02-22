export const SHOPPING_PLAN_MARCH_8 = {
  date: "2025-03-08",
  day: "Saturday",
  areas: [
    {
      name: "Tokyo Skytree Town (Solamachi)",
      time: "10:00 - 15:00",
      station: "Oshiage Station (Direct access)",
      advice: "Most target shops are in the East Yard. Start from East Yard (Oshiage side) and work your way up/down.",
      route: "Oshiage Station (B3F) -> 1F (Store lockers if needed) -> 5F (Workman Girl) -> 4F (Pokemon & Food Samples) -> 3F (Uniqlo & Loft) -> 2F (Donguri Republic) -> Lunch -> To Kiyosumi.",
      shops: [
        {
          name: "#Workman GIRL",
          location: "East Yard 5F",
          hours: "10:00-21:00",
          notes: "Focus on functional/casual wear. 'Workman Shoes' is often adjacent."
        },
        {
          name: "Pokémon Center Skytree Town",
          location: "East Yard 4F",
          hours: "10:00-21:00",
          notes: "Can get crowded. Rayquaza is the mascot here."
        },
        {
          name: "Ganso Shokuhin Sample-ya (Food Samples)",
          location: "East Yard 4F",
          hours: "10:00-21:00",
          notes: "Unique souvenir. DIY kits available. Located near the Pokemon Center."
        },
        {
          name: "Uniqlo / Loft",
          location: "East Yard 3F",
          hours: "10:00-21:00",
          notes: "Large scale Uniqlo. Loft has great stationery/lifestyle goods."
        },
        {
          name: "Donguri Republic (Ghibli)",
          location: "East Yard 2F",
          hours: "10:00-21:00",
          notes: "Outdoor entrance area often. Great character goods."
        },
        {
          name: "Neutral (Lifestyle)",
          location: "East Yard 2F or 3F",
          hours: "10:00-21:00",
          notes: "Look for 'Nakagawa Masashichi Shoten' (Japanese diverse crafts) on 4F for high quality souvenirs."
        }
      ]
    },
    {
      name: "Kiyosumi Shirakawa",
      time: "15:15 - 19:30",
      station: "Kiyosumi-shirakawa Station (A3 Exit)",
      advice: "Kiyosumi Garden closes earliest (17:00), so go there immediately if you want to enter. Many shops close by 18:00 or 19:00.",
      route: "Station (A3) -> Kiyosumi Garden (until 16:30 entry) -> Teapond -> Babaghuri (walk) -> Rikashitsu -> Blue Bottle / Allpress (Coffee break) -> Dinner.",
      shops: [
        {
          name: "Kiyosumi Garden",
          type: "Garden",
          hours: "09:00-17:00 (Last entry 16:30)",
          notes: "Traditional Japanese garden. Priority #1 due to closing time."
        },
        {
          name: "TEAPOND",
          type: "Tea Specialty Shop",
          hours: "11:00-19:00",
          location: "2-min walk from Garden",
          notes: "Beautiful packaging, great for gifts. Specialty tea importer."
        },
        {
          name: "Babaghuri (Jurgen Lehl)",
          type: "Lifestyle / Clothing",
          hours: "11:00-19:00",
          location: "Kiyosumi 3-1-7 (Former warehouse)",
          notes: "High-end natural materials, clothing, ceramics. Very atmospheric warehouse space."
        },
        {
          name: "Rikashitsu (Science Room)",
          type: "Glassware / Zakka",
          hours: "13:30-18:00 (Sat/Sun/Hol)",
          location: "Hirano 1-9-7",
          notes: "Laboratory glassware repurposed for home use (vases, containers). Unique aesthetic."
        },
        {
          name: "Blue Bottle Coffee Kiyosumi (Flagship)",
          type: "Cafe",
          hours: "08:00-19:00",
          location: "Hirano 1-4-8",
          notes: "The flagship roastery. Iconic architecture."
        }
      ]
    }
  ]
};
