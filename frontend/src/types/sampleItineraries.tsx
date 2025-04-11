import { SampleItinerary } from "./itinerary";

export const sampleItineraries: SampleItinerary[] = [
  {
    id: 1,
    title: "Tokyo Cultural, Culinary, Tech & Shopping Adventure for Two",
    destination: "Tokyo, Japan",
    duration: "7 days",
    groupSize: "2 travelers",
    description: "A 7-day immersive journey through Tokyo, blending traditional culture, innovative technology, exquisite cuisine, and vibrant shopping experiences for two.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/1280px-Skyscrapers_of_Shinjuku_2009_January.jpg",
    price: 3000,
    tags: ["culture", "food", "technology", "shopping"],
    dailyBreakdown: [
      {
        "day": 1,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Arrival at Narita (NRT) or Haneda (HND) & Transfer to Hotel",
            "location": "Narita International Airport or Haneda Airport to Shinjuku Area",
            "details": "Arrive at either Narita or Haneda airport. Clear immigration and customs. Take the Narita Express or Limousine Bus (from NRT, approx. ¥3000-¥3500 per person) or Keikyu Line or Limousine Bus (from HND, approx. ¥630-¥1250 per person) to your hotel in the Shinjuku area. Check in and leave luggage.",
            "cost": "$60 - $80 (for two)"
          },
          {
            "time": "1:00 PM",
            "activity": "Lunch in Shinjuku Gyoen National Garden Area",
            "location": "Shinjuku Gyoen National Garden & nearby restaurants",
            "details": "Explore the diverse landscape gardens of Shinjuku Gyoen (entry ¥500 per person). Afterwards, enjoy lunch at a local restaurant near the garden. Options range from casual ramen to more refined Japanese cuisine.",
            "cost": "$30 - $50"
          },
          {
            "time": "4:00 PM",
            "activity": "Tokyo Metropolitan Government Building Observation Decks",
            "location": "Tokyo Metropolitan Government Building",
            "details": "Ascend to the free observation decks of the Tokyo Metropolitan Government Building for panoramic views of the city skyline, including Mount Fuji on a clear day. Great for orientation.",
            "cost": "$0"
          },
          {
            "time": "7:00 PM",
            "activity": "Dinner and Drinks in Shinjuku Golden Gai",
            "location": "Shinjuku Golden Gai",
            "details": "Experience the unique atmosphere of Golden Gai, a network of narrow alleys filled with tiny, atmospheric bars and eateries. Enjoy dinner at one of the small restaurants and have drinks at a cozy bar.",
            "cost": "$60 - $100"
          }
        ]
      },
      {
        "day": 2,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Visit the Tsukiji Outer Market",
            "location": "Tsukiji Outer Market",
            "details": "Explore the vibrant Tsukiji Outer Market, a bustling area with fresh seafood, produce, and various food stalls. Sample local delicacies and enjoy a fresh seafood breakfast or early lunch.",
            "cost": "$30 - $60"
          },
          {
            "time": "11:00 AM",
            "activity": "Cultural Immersion at Senso-ji Temple",
            "location": "Senso-ji Temple, Asakusa",
            "details": "Take the Ginza Line to Asakusa and visit Senso-ji, Tokyo's oldest temple. Explore Nakamise-dori market leading to the temple, offering traditional crafts and snacks. Participate in a fortune-telling ritual (omikuji).",
            "cost": "$0 (small costs for offerings or souvenirs)"
          },
          {
            "time": "2:00 PM",
            "activity": "Sumida River Cruise to Odaiba",
            "location": "Sumida River & Odaiba Bay",
            "details": "Enjoy a scenic river cruise from Asakusa to Odaiba (approx. ¥1200-¥1800 per person). Admire the city skyline from a different perspective.",
            "cost": "$25 - $35 (for two)"
          },
          {
            "time": "4:00 PM",
            "activity": "Explore Odaiba's Futuristic Entertainment",
            "location": "Odaiba area (e.g., DiverCity Tokyo Plaza, Miraikan)",
            "details": "Discover Odaiba, a man-made island with futuristic architecture, entertainment options, and shopping. Visit DiverCity Tokyo Plaza with its life-sized Gundam statue or the Miraikan (National Museum of Emerging Science and Innovation, entry ¥630 per person) to experience cutting-edge technology.",
            "cost": "$15 - $30 (for Miraikan entry)"
          },
          {
            "time": "7:00 PM",
            "activity": "Dinner with Bay Views in Odaiba",
            "location": "Restaurants in Odaiba with bay views",
            "details": "Enjoy dinner at one of the many restaurants in Odaiba offering stunning views of Tokyo Bay and the Rainbow Bridge.",
            "cost": "$70 - $120"
          }
        ]
      },
      {
        "day": 3,
        "activities": [
          {
            "time": "9:30 AM",
            "activity": "Immerse Yourself in Pop Culture at Harajuku",
            "location": "Takeshita Street & Meiji Jingu Shrine, Harajuku",
            "details": "Start by exploring the vibrant and quirky Takeshita Street, known for its unique street style, trendy shops, and colorful snacks. Afterwards, find tranquility at the serene Meiji Jingu Shrine, a peaceful oasis dedicated to Emperor Meiji and Empress Shoken.",
            "cost": "$10 - $30 (for snacks and small purchases)"
          },
          {
            "time": "12:30 PM",
            "activity": "Lunch in Harajuku/Omotesando",
            "location": "Restaurants in Harajuku or Omotesando",
            "details": "Enjoy lunch in the Harajuku area, choosing from themed cafes, crepe stands, or more upscale options on Omotesando, Tokyo's Champs-Élysées.",
            "cost": "$30 - $60"
          },
          {
            "time": "2:00 PM",
            "activity": "High-End Shopping on Omotesando",
            "location": "Omotesando Avenue",
            "details": "Stroll down Omotesando, admiring the stylish architecture and browsing the flagship stores of international luxury brands and trendy Japanese designers.",
            "cost": "$0 (window shopping) or variable"
          },
          {
            "time": "5:00 PM",
            "activity": "Cat Cafe Experience in Shibuya",
            "location": "Cat cafes in Shibuya",
            "details": "Experience a unique Japanese phenomenon by visiting a cat cafe in the bustling Shibuya area. Relax and interact with friendly felines (typically ¥1000-¥2000 per person for an hour including a drink).",
            "cost": "$20 - $40"
          },
          {
            "time": "7:00 PM",
            "activity": "Dinner and Shibuya Crossing Experience",
            "location": "Restaurants around Shibuya Crossing",
            "details": "Enjoy dinner at a restaurant overlooking the iconic Shibuya Scramble Crossing, the world's busiest intersection. Witness the organized chaos from above and then experience crossing it yourself.",
            "cost": "$50 - $90"
          }
        ]
      },
      {
        "day": 4,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Day Trip to Hakone (Culture & Nature)",
            "location": "Hakone region (approx. 1.5-2 hours from Shinjuku by train)",
            "details": "Take a scenic train ride to Hakone, a mountain resort town known for its natural beauty and art museums. Purchase a Hakone Free Pass (approx. ¥6000 per person) for discounted transportation.",
            "cost": "$120 (for two Hakone Free Passes)"
          },
          {
            "time": "10:30 AM",
            "activity": "Lake Ashi Cruise with Mount Fuji Views (weather permitting)",
            "location": "Lake Ashi, Hakone",
            "details": "Enjoy a relaxing cruise on Lake Ashi, surrounded by stunning views of Mount Fuji (if visible) and lush scenery. The Hakone Sightseeing Cruise is included in the Free Pass.",
            "cost": "$0 (included in Free Pass)"
          },
          {
            "time": "12:00 PM",
            "activity": "Lunch in Hakone",
            "location": "Restaurants around Lake Ashi or Gora",
            "details": "Have lunch at a local restaurant in Hakone, trying regional specialties like soba noodles or seafood.",
            "cost": "$40 - $70"
          },
          {
            "time": "1:30 PM",
            "activity": "Hakone Open-Air Museum",
            "location": "Hakone Open-Air Museum",
            "details": "Explore the Hakone Open-Air Museum, showcasing contemporary sculptures against the backdrop of the surrounding mountains (entry included in Free Pass).",
            "cost": "$0 (included in Free Pass)"
          },
          {
            "time": "4:00 PM",
            "activity": "Hakone Ropeway (volcanic hot springs views)",
            "location": "Hakone Ropeway",
            "details": "Ride the Hakone Ropeway, offering views of volcanic hot springs, Mount Fuji, and panoramic landscapes (included in Free Pass).",
            "cost": "$0 (included in Free Pass)"
          },
          {
            "time": "6:00 PM",
            "activity": "Return to Tokyo & Dinner in Shinjuku",
            "location": "Shinjuku area",
            "details": "Take the train back to Shinjuku and enjoy dinner at a restaurant of your choice.",
            "cost": "$50 - $90"
          }
        ]
      },
      {
        "day": 5,
        "activities": [
          {
            "time": "9:30 AM",
            "activity": "Explore Akihabara - Electric Town",
            "location": "Akihabara district",
            "details": "Immerse yourselves in the vibrant world of electronics, anime, manga, and gaming in Akihabara. Browse through numerous shops selling the latest gadgets, retro games, and collectibles.",
            "cost": "$10 - $50 (depending on purchases)"
          },
          {
            "time": "12:00 PM",
            "activity": "Themed Cafe Experience in Akihabara",
            "location": "Themed cafes in Akihabara (e.g., Gundam Cafe, AKB48 Cafe & Shop)",
            "details": "Enjoy lunch at one of Akihabara's many themed cafes, offering a unique dining experience related to anime, manga, or gaming.",
            "cost": "$30 - $50"
          },
          {
            "time": "2:00 PM",
            "activity": "Arcade Gaming in Akihabara",
            "location": "Arcades in Akihabara (e.g., Taito Station, Sega Game Center)",
            "details": "Experience Japan's famous arcade culture by spending some time playing a variety of games, from classic retro titles to the latest immersive experiences.",
            "cost": "$20 - $40"
          },
          {
            "time": "5:00 PM",
            "activity": "Yanaka Ginza Shopping Street",
            "location": "Yanaka Ginza",
            "details": "Take a break from the neon lights and explore the charming Yanaka Ginza, a traditional shopping street with local shops selling crafts, snacks, and everyday goods. Enjoy the nostalgic atmosphere.",
            "cost": "$10 - $30 (for snacks and small purchases)"
          },
          {
            "time": "7:00 PM",
            "activity": "Dinner in Ueno Area",
            "location": "Restaurants in Ueno near Yanaka",
            "details": "Enjoy dinner in the Ueno area, known for its diverse culinary scene, ranging from traditional Japanese restaurants to international options.",
            "cost": "$40 - $80"
          }
        ]
      },
      {
        "day": 6,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Visit the Ghibli Museum (if tickets booked in advance)",
            "location": "Mitaka (approx. 30-45 minutes from central Tokyo by train)",
            "details": "If you've booked tickets well in advance, immerse yourselves in the enchanting world of Studio Ghibli at the Ghibli Museum (entry approx. ¥1000 per person). Explore the whimsical exhibits and learn about the animation process.",
            "cost": "$20 (for two tickets)"
          },
          {
            "time": "12:00 PM",
            "activity": "Lunch in Kichijoji",
            "location": "Restaurants in Kichijoji near the Ghibli Museum",
            "details": "Enjoy lunch in the trendy neighborhood of Kichijoji, known for its independent shops, cafes, and Inokashira Park.",
            "cost": "$30 - $50"
          },
          {
            "time": "2:00 PM",
            "activity": "Explore Inokashira Park & Ghibli Museum Grounds (if no museum visit)",
            "location": "Inokashira Park, Kichijoji",
            "details": "If not visiting the Ghibli Museum, spend the afternoon relaxing in Inokashira Park, rent a rowboat on the pond, or visit the Inokashira Park Zoo. You can also explore the exterior of the Ghibli Museum.",
            "cost": "$5 - $10 (for boat rental or zoo entry)"
          },
          {
            "time": "4:00 PM",
            "activity": "Shopping in Shimokitazawa",
            "location": "Shimokitazawa district",
            "details": "Discover the bohemian charm of Shimokitazawa, a neighborhood filled with vintage clothing stores, independent boutiques, theaters, and cozy cafes.",
            "cost": "$20 - $50 (depending on purchases)"
          },
          {
            "time": "7:00 PM",
            "activity": "Farewell Dinner in Shibuya or Shinjuku",
            "location": "Restaurant of your choice in Shibuya or Shinjuku",
            "details": "Enjoy a special farewell dinner at a restaurant you've been wanting to try, reflecting on your Tokyo adventures.",
            "cost": "$80 - $150"
          }
        ]
      },
      {
        "day": 7,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Last Minute Souvenir Shopping",
            "location": "Department stores or shopping streets in your area",
            "details": "Do some last-minute souvenir shopping at department stores like Takashimaya or Isetan, or explore local shopping streets for unique finds.",
            "cost": "Variable"
          },
          {
            "time": "11:00 AM",
            "activity": "Enjoy a Final Japanese Meal",
            "location": "Cafe or restaurant near your hotel",
            "details": "Savor one last delicious Japanese meal, whether it's a comforting bowl of ramen, delicate sushi, or a hearty curry.",
            "cost": "$20 - $40"
          },
          {
            "time": "1:00 PM",
            "activity": "Transfer to Narita (NRT) or Haneda (HND) Airport",
            "location": "Hotel to Narita or Haneda Airport",
            "details": "Take the Narita Express or Limousine Bus (to NRT) or Keikyu Line or Limousine Bus (to HND) to the airport for your departure.",
            "cost": "$60 - $80 (for two)"
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "title": "Romantic Greek Island Hopping: Santorini & Mykonos",
    "destination": "Santorini & Mykonos, Greece",
    "duration": "10 days",
    "groupSize": "4 travelers",
    "description": "A 10-day romantic escape to the enchanting Greek islands of Santorini and Mykonos, experiencing stunning beaches, rich culture, exquisite cuisine, and unforgettable moments.",
    "image": "https://images.unsplash.com/photo-1688664562000-4c1f7cdb48f8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FudG9yaW5pJTIwZ3JlZWNlfGVufDB8MHwwfHx8MA%3D%3D0",
    "price": 4500,
    "tags": ["beach", "culture", "romance", "food"],
    "dailyBreakdown": [
      {
        "day": 1,
        "activities": [
          {
            "time": "12:00 PM",
            "activity": "Arrival in Santorini (JTR) & Check-in",
            "location": "Santorini (JTR) Airport to Fira/Oia Hotel",
            "details": "Arrive at Santorini Airport (JTR). Transfer to your hotel in either Fira or Oia (pre-booked private transfer recommended for a group of 4, approx. €80-€120). Check in and settle in.  Enjoy the initial views of the caldera.",
            "cost": "$100-150"
          },
          {
            "time": "3:00 PM",
            "activity": "Explore Fira or Oia Town",
            "location": "Fira or Oia",
            "details": "Depending on your hotel location, explore the main town.  Wander through the white-washed streets, browse the shops, and take in the breathtaking views. Oia is known for its stunning sunsets, while Fira is the capital with more shops and restaurants.",
            "cost": "$0"
          },
          {
            "time": "7:00 PM",
            "activity": "Sunset Dinner with Caldera Views",
            "location": "Fira or Oia Restaurant",
            "details": "Enjoy a memorable first dinner at a restaurant with caldera views. Many restaurants offer traditional Greek cuisine with a romantic ambiance. Reservations are highly recommended, especially in Oia for sunset. Consider Roka in Oia or Argo in Fira.",
            "cost": "$100-200"
          }
        ]
      },
      {
        "day": 2,
        "activities": [
          {
            "time": "10:00 AM",
            "activity": "Santorini Volcano & Hot Springs Boat Tour",
            "location": "Fira Old Port",
            "details": "Take a boat tour to the volcanic island of Nea Kameni. Hike to the crater and learn about the island's volcanic history.  Continue to Palea Kameni to swim in the therapeutic hot springs. Many tours include this (approx. €30-€50 per person).",
            "cost": "$120-200"
          },
          {
            "time": "2:00 PM",
            "activity": "Lunch at a Seaside Restaurant",
            "location": "Boat Tour Stop or Return to Fira/Oia",
            "details": "Enjoy lunch either on the boat (some tours include it) or at a restaurant after returning from the tour. Many restaurants near the port or in Fira/Oia offer fresh seafood and Greek specialties.",
            "cost": "$80-150"
          },
          {
            "time": "5:00 PM",
            "activity": "Wine Tasting at a Local Winery",
            "location": "Santorini Winery (e.g., Santo Wines, Venetsanos)",
            "details": "Santorini is known for its unique Assyrtiko wine. Visit a local winery for a tasting session, learning about the island's viticulture and enjoying the stunning views.  Pre-booking is recommended. (approx. €40-€70 per person).",
            "cost": "$160-280"
          },
          {
            "time": "8:00 PM",
            "activity": "Romantic Dinner in Oia",
            "location": "Oia",
            "details": "Enjoy a romantic dinner in Oia, famous for its breathtaking sunsets. Choose a restaurant with caldera views and savor the local cuisine. Consider Ambrosia Restaurant.",
            "cost": "$150-300"
          }
        ]
      },
      {
        "day": 3,
        "activities": [
          {
            "time": "10:00 AM",
            "activity": "Explore Akrotiri Archaeological Site",
            "location": "Akrotiri",
            "details": "Visit the fascinating Akrotiri archaeological site, a Minoan Bronze Age settlement preserved by a volcanic eruption.  Learn about the island's ancient history (entry approx. €12 per person).",
            "cost": "$50"
          },
          {
            "time": "12:00 PM",
            "activity": "Beach Time and Lunch at Perissa/Perivolos",
            "location": "Perissa or Perivolos Beach",
            "details": "Head to the black sand beaches of Perissa or Perivolos. Relax on sunbeds, swim in the Aegean Sea, and enjoy lunch at one of the beachside restaurants. Many offer casual fare and seafood.",
            "cost": "$60-120 (including lunch and beachside rentals)"
          },
          {
            "time": "5:00 PM",
            "activity": "Fira Town Exploration & Shopping",
            "location": "Fira",
            "details": "Return to Fira and explore the town's shops, offering everything from souvenirs and local crafts to jewelry and clothing. Enjoy the lively atmosphere.",
            "cost": "$50-200 (depending on shopping)"
          },
          {
            "time": "8:00 PM",
            "activity": "Dinner and Drinks in Fira",
            "location": "Fira",
            "details": "Enjoy dinner in Fira. Many restaurants offer a range of cuisines, from traditional Greek to international. Afterwards, explore Fira's nightlife with its bars and clubs.",
            "cost": "$100-200"
          }
        ]
      },
      {
        "day": 4,
        "activities": [
          {
            "time": "10:00 AM",
            "activity": "Relaxing Morning at the Hotel/Pool",
            "location": "Your Hotel",
            "details": "Enjoy a leisurely morning at your hotel. Relax by the pool, enjoy the views, and recharge for the day.",
            "cost": "$0"
          },
          {
            "time": "1:00 PM",
            "activity": "Lunch in Imerovigli",
            "location": "Imerovigli",
            "details": "Travel to Imerovigli, known as the 'Balcony of Santorini' for its stunning views. Have lunch at a restaurant with caldera views.  Consider Anogi.",
            "cost": "$80-150"
          },
          {
            "time": "3:00 PM",
            "activity": "Hike from Fira to Oia (or vice versa)",
            "location": "Fira to Oia Hiking Trail",
            "details": "Embark on the scenic hike between Fira and Oia. The trail offers breathtaking views of the caldera.  Wear comfortable shoes and bring water. The hike takes about 2-3 hours.",
            "cost": "$0"
          },
          {
            "time": "7:00 PM",
            "activity": "Sunset Viewing and Dinner in Oia",
            "location": "Oia",
            "details": "Witness the world-famous Oia sunset. Find a good spot to watch the spectacle, then enjoy dinner at a restaurant in Oia. Reservations are essential.",
            "cost": "$150-300"
          }
        ]
      },
      {
        "day": 5,
        "activities": [
          {
            "time": "10:00 AM",
            "activity": "Ferry to Mykonos",
            "location": "Santorini Port to Mykonos Port",
            "details": "Take a morning ferry from Santorini to Mykonos. The ferry ride takes approximately 2-3 hours. Pre-book ferry tickets (approx. €50-€80 per person).",
            "cost": "$200-320"
          },
          {
            "time": "1:00 PM",
            "activity": "Check-in to Mykonos Hotel & Lunch",
            "location": "Mykonos Town or other area",
            "details": "Arrive in Mykonos and transfer to your hotel. Check in and have lunch at a local restaurant. Mykonos Town has many options.",
            "cost": "$80-150"
          },
          {
            "time": "4:00 PM",
            "activity": "Explore Mykonos Town (Chora)",
            "location": "Mykonos Town (Chora)",
            "details": "Explore the charming Mykonos Town (Chora) with its white-washed buildings, narrow streets, and iconic windmills. Visit Little Venice and enjoy the vibrant atmosphere.",
            "cost": "$0"
          },
          {
            "time": "8:00 PM",
            "activity": "Dinner and Cocktails in Mykonos Town",
            "location": "Mykonos Town",
            "details": "Enjoy dinner at one of Mykonos Town's many restaurants, offering a range of cuisines. Afterwards, experience the island's famous nightlife with cocktails at a bar in Little Venice or a club.",
            "cost": "$150-300"
          }
        ]
      },
      {
        "day": 6,
        "activities": [
          {
            "time": "11:00 AM",
            "activity": "Beach Day at Paradise or Super Paradise Beach",
            "location": "Paradise or Super Paradise Beach",
            "details": "Spend the day at one of Mykonos's famous party beaches. Enjoy the sun, swim in the clear blue water, and experience the lively beach bars and music. (Beach chair rentals approx. €20-€50 per person).",
            "cost": "$100-300 (including rentals and drinks)"
          },
          {
            "time": "2:00 PM",
            "activity": "Lunch at the Beach",
            "location": "Beach Restaurants",
            "details": "Have lunch at one of the beachside restaurants, offering casual fare, seafood, and drinks.",
            "cost": "$80-150"
          },
          {
            "time": "6:00 PM",
            "activity": "Sunset at 180 Sunset Bar",
            "location": "Mykonos Town",
            "details": "Enjoy the sunset at 180 Sunset Bar in Mykonos Town.  It offers panoramic views of the town and the Aegean Sea. (Drinks approx. €20+).",
            "cost": "$80-200"
          },
          {
            "time": "8:00 PM",
            "activity": "Dinner in Mykonos Town",
            "location": "Mykonos Town",
            "details": "Dine at a restaurant in Mykonos Town. Consider Interni for a stylish atmosphere or Kiki's Tavern for a more traditional experience (be prepared to queue).",
            "cost": "$150-300"
          }
        ]
      },
      {
        "day": 7,
        "activities": [
          {
            "time": "10:00 AM",
            "activity": "Day Trip to Delos Island",
            "location": "Delos Island (ferry from Mykonos Town)",
            "details": "Take a morning ferry to the uninhabited island of Delos, a UNESCO World Heritage site and one of the most important archaeological sites in Greece. Explore the ancient ruins (ferry approx. €20 per person, entry approx. €12 per person).",
            "cost": "$128"
          },
          {
            "time": "1:00 PM",
            "activity": "Lunch on Delos or Mykonos",
            "location": "Delos (limited options) or Mykonos Town",
            "details": "Have a light lunch on Delos (limited options, consider bringing snacks) or back in Mykonos Town after returning from the trip.",
            "cost": "$60-120"
          },
          {
            "time": "4:00 PM",
            "activity": "Relax at Psarou Beach",
            "location": "Psarou Beach",
            "details": "Spend the afternoon at Psarou Beach, one of Mykonos's most glamorous beaches. Enjoy the upscale atmosphere, swim in the crystal-clear water, and relax on the beach. (Beach chair rentals can be expensive, €50+ per person).",
            "cost": "$200-400 (including rentals and drinks)"
          },
          {
            "time": "8:00 PM",
            "activity": "Fine Dining Experience",
            "location": "Mykonos Town",
            "details": "Enjoy a fine dining experience at one of Mykonos's upscale restaurants. Consider Nobu Matsuhisa Mykonos for Japanese cuisine or Sea Satin Market for seafood with a view.",
            "cost": "$200-400"
          }
        ]
      },
      {
        "day": 8,
        "activities": [
          {
            "time": "11:00 AM",
            "activity": "Beach Hopping: Ornos & Agios Ioannis",
            "location": "Ornos Beach & Agios Ioannis Beach",
            "details": "Explore two different beaches on Mykonos. Start at Ornos, a family-friendly beach with calm waters. Then, head to Agios Ioannis, offering beautiful views of Delos. Enjoy swimming, sunbathing, and relaxing.",
            "cost": "$50-150 (for rentals and transport)"
          },
          {
            "time": "1:00 PM",
            "activity": "Lunch at a Beach Taverna",
            "location": "Beach Tavernas",
            "details": "Enjoy lunch at a traditional Greek taverna near one of the beaches, savoring fresh seafood and local dishes.",
            "cost": "$80-150"
          },
          {
            "time": "5:00 PM",
            "activity": "Mykonos Windmills & Sunset",
            "location": "Mykonos Windmills",
            "details": "Visit the iconic Mykonos windmills, a symbol of the island. Enjoy the views and capture beautiful sunset photos.",
            "cost": "$0"
          },
          {
            "time": "7:00 PM",
            "activity": "Dinner and Live Music",
            "location": "Mykonos Town",
            "details": "Enjoy dinner in Mykonos Town and find a place with live Greek music for a festive evening. Many tavernas offer traditional music and dancing.",
            "cost": "$150-300"
          }
        ]
      },
      {
        "day": 9,
        "activities": [
          {
            "time": "10:00 AM",
            "activity": "Shopping in Mykonos Town",
            "location": "Mykonos Town",
            "details": "Spend the morning shopping in Mykonos Town. Explore the boutiques, art galleries, and souvenir shops. Find unique clothing, jewelry, and local crafts.",
            "cost": "Variable"
          },
          {
            "time": "1:00 PM",
            "activity": "Farewell Lunch with a View",
            "location": "Mykonos Town",
            "details": "Enjoy a special farewell lunch at a restaurant with a view, reminiscing about your Greek island adventure. Consider a restaurant overlooking the harbor.",
            "cost": "$100-200"
          },
          {
            "time": "4:00 PM",
            "activity": "Return to Santorini",
            "location": "Mykonos Port to Santorini Port",
            "details": "Take an afternoon ferry back to Santorini. (approx. 2-3 hours).",
            "cost": "$200-320"
          },
          {
            "time": "7:00 PM",
            "activity": "Final Dinner in Santorini",
            "location": "Santorini (Fira or Oia)",
            "details": "Enjoy your final dinner in Santorini, perhaps revisiting a favorite restaurant or trying a new one. Savor the last views of the caldera.",
            "cost": "$150-300"
          }
        ]
      },
      {
        "day": 10,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Breakfast with a View",
            "location": "Your Hotel",
            "details": "Enjoy a final breakfast at your hotel, taking in the stunning views of the caldera.",
            "cost": "$0 (included in hotel)"
          },
          {
            "time": "11:00 AM",
            "activity": "Departure from Santorini (JTR)",
            "location": "Hotel to Santorini (JTR) Airport",
            "details": "Transfer to Santorini Airport (JTR) for your departure. Pre-book a transfer for your group.",
            "cost": "$80-120"
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "title": "Bali Wellness Retreat: Nature, Culture, and Relaxation",
    "destination": "Bali, Indonesia",
    "duration": "8 days",
    "groupSize": "3 travelers",
    "description": "An 8-day journey to Bali, focusing on wellness, immersion in nature, cultural exploration, and deep relaxation. This itinerary is designed to rejuvenate the mind, body, and spirit.",
    "image": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsaSUyMGluZG9uZXNpYXxlbnwwfHwwfHx8MA%3D%3D",
    "price": 2500,
    "tags": ["wellness", "nature", "culture", "relaxation"],
    "dailyBreakdown": [
      {
        "day": 1,
        "activities": [
          {
            "time": "12:00 PM",
            "activity": "Arrival at Denpasar (DPS) & Transfer to Ubud",
            "location": "Ngurah Rai International Airport (DPS) to Ubud",
            "details": "Arrive at Denpasar International Airport (DPS).  Take a pre-booked private transfer to your hotel or villa in Ubud (approx. 1.5-hour drive). Check in and settle in.",
            "cost": "$50 - $70"
          },
          {
            "time": "3:00 PM",
            "activity": "Relax and Acclimatize",
            "location": "Ubud Hotel/Villa",
            "details": "Spend the afternoon relaxing at your accommodation.  Enjoy the pool, gardens, or spa facilities.  This allows time to adjust to the time difference and tropical climate.",
            "cost": "$0"
          },
          {
            "time": "7:00 PM",
            "activity": "Welcome Dinner in Ubud",
            "location": "Ubud, Restaurant TBD",
            "details": "Enjoy a delicious and healthy welcome dinner at one of Ubud's many restaurants.  Consider trying a restaurant with vegetarian or vegan options, which are abundant in Ubud. Explore local Balinese cuisine.",
            "cost": "$30 - $50"
          }
        ]
      },
      {
        "day": 2,
        "activities": [
          {
            "time": "7:00 AM",
            "activity": "Morning Yoga Session",
            "location": "Ubud Yoga Studio (e.g., The Yoga Barn, Radiantly Alive)",
            "details": "Start the day with a rejuvenating yoga session at one of Ubud's renowned yoga studios.  Enjoy a class suitable for all levels, surrounded by lush greenery. (Approx. $10-$15 per person).",
            "cost": "$30 - $45"
          },
          {
            "time": "9:00 AM",
            "activity": "Healthy Breakfast",
            "location": "Ubud Cafe",
            "details": "Enjoy a healthy breakfast at a local cafe. Many cafes in Ubud offer organic, vegan, and vegetarian options. Try a smoothie bowl or fresh fruit.",
            "cost": "$20 - $30"
          },
          {
            "time": "10:30 AM",
            "activity": "Tegalalang Rice Terraces",
            "location": "Tegalalang Rice Terraces",
            "details": "Visit the stunning Tegalalang Rice Terraces, a UNESCO World Heritage Site.  Take a leisurely walk through the terraces, enjoy the views, and take photos.  (Small entrance fee/donation may apply).",
            "cost": "$10"
          },
          {
            "time": "1:00 PM",
            "activity": "Lunch with a View",
            "location": "Restaurant near Tegalalang",
            "details": "Have lunch at a restaurant overlooking the rice terraces.  Many restaurants in the area offer Indonesian and international cuisine with breathtaking views.",
            "cost": "$30 - $50"
          },
          {
            "time": "3:00 PM",
            "activity": "Visit Tirta Empul Temple",
            "location": "Tirta Empul Temple, Tampaksiring",
            "details": "Experience a purification ritual at Tirta Empul, a significant Hindu water temple.  You can participate in the Melukat ritual (wear a sarong and sash).",
            "cost": "$10"
          },
          {
            "time": "7:00 PM",
            "activity": "Ubud Cultural Performance",
            "location": "Ubud (various venues)",
            "details": "Enjoy a traditional Balinese dance performance, such as Legong or Kecak.  These performances showcase Balinese culture, music, and storytelling. (Ticket prices vary, approx. $10-$20 per person).",
            "cost": "$30 - $60"
          }
        ]
      },
      {
        "day": 3,
        "activities": [
          {
            "time": "8:00 AM",
            "activity": "Morning Nature Walk",
            "location": "Campuhan Ridge Walk, Ubud",
            "details": "Enjoy a scenic morning walk along the Campuhan Ridge Walk.  This easy trek offers beautiful views of the surrounding hills and rice paddies.",
            "cost": "$0"
          },
          {
            "time": "10:00 AM",
            "activity": "Visit the Sacred Monkey Forest Sanctuary",
            "location": "Sacred Monkey Forest Sanctuary, Ubud",
            "details": "Explore the Sacred Monkey Forest Sanctuary, home to hundreds of Balinese long-tailed macaques.  Walk through the forest, observe the monkeys, and enjoy the natural surroundings. (Entry fee approx. $5-$8 per person).",
            "cost": "$15 - $24"
          },
          {
            "time": "12:00 PM",
            "activity": "Lunch in Ubud",
            "location": "Ubud, Restaurant TBD",
            "details": "Have lunch at one of Ubud's many cafes or restaurants.  Explore the diverse culinary scene, from traditional Indonesian food to international cuisine.",
            "cost": "$30 - $50"
          },
          {
            "time": "2:00 PM",
            "activity": "Balinese Cooking Class",
            "location": "Ubud (various cooking schools)",
            "details": "Participate in a Balinese cooking class and learn to prepare traditional dishes.  Visit a local market to buy ingredients and then cook in a traditional kitchen. (Approx. $25-$40 per person).",
            "cost": "$75 - $120"
          },
          {
            "time": "6:00 PM",
            "activity": "Relaxing Spa Treatment",
            "location": "Ubud Spa",
            "details": "Enjoy a relaxing Balinese massage or spa treatment.  Ubud is known for its many spas offering traditional healing therapies. (Prices vary, approx. $20-$50 per person).",
            "cost": "$60 - $150"
          },
          {
            "time": "8:00 PM",
            "activity": "Dinner in Ubud",
            "location": "Ubud, Restaurant TBD",
            "details": "Enjoy dinner at a restaurant in Ubud.  Consider trying a restaurant with live music or a cultural performance.",
            "cost": "$30 - $50"
          }
        ]
      },
      {
        "day": 4,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Travel to Canggu",
            "location": "Ubud to Canggu",
            "details": "Check out from your Ubud accommodation and travel to Canggu (approx. 1.5-hour drive).  Arrange for a private driver or taxi.",
            "cost": "$40 - $60"
          },
          {
            "time": "11:00 AM",
            "activity": "Check in to Canggu Accommodation",
            "location": "Canggu",
            "details": "Check in to your hotel or villa in Canggu.  Settle in and relax.",
            "cost": "$0"
          },
          {
            "time": "12:00 PM",
            "activity": "Lunch in Canggu",
            "location": "Canggu Cafe",
            "details": "Enjoy lunch at one of Canggu's trendy cafes.  Canggu offers a variety of healthy and international food options.",
            "cost": "$30 - $50"
          },
          {
            "time": "2:00 PM",
            "activity": "Beach Time at Echo Beach",
            "location": "Echo Beach, Canggu",
            "details": "Spend the afternoon at Echo Beach, a popular spot for surfing and relaxing.  Enjoy the beach atmosphere and watch the surfers.",
            "cost": "$0"
          },
          {
            "time": "5:00 PM",
            "activity": "Sunset Drinks",
            "location": "Canggu Beach Bar",
            "details": "Enjoy sunset drinks at one of Canggu's beach bars.  Many bars offer happy hour specials and stunning ocean views.",
            "cost": "$30 - $60"
          },
          {
            "time": "7:00 PM",
            "activity": "Dinner in Canggu",
            "location": "Canggu Restaurant",
            "details": "Have dinner at a restaurant in Canggu.  Explore the diverse culinary scene, from casual beachside eateries to more upscale dining.",
            "cost": "$40 - $70"
          }
        ]
      },
      {
        "day": 5,
        "activities": [
          {
            "time": "8:00 AM",
            "activity": "Morning Surf Lesson",
            "location": "Canggu Surf School",
            "details": "Take a morning surf lesson at one of Canggu's surf schools.  Learn to ride the waves or improve your surfing skills. (Approx. $20-$30 per person).",
            "cost": "$60 - $90"
          },
          {
            "time": "10:00 AM",
            "activity": "Beach Relaxation",
            "location": "Batu Bolong Beach, Canggu",
            "details": "Relax on Batu Bolong Beach, a popular spot with a relaxed vibe.  Enjoy the sun, swim in the ocean, and soak up the beach atmosphere.",
            "cost": "$0"
          },
          {
            "time": "12:00 PM",
            "activity": "Lunch at a Beachside Cafe",
            "location": "Canggu, Beachside Cafe",
            "details": "Have lunch at a casual beachside cafe. Enjoy fresh seafood, salads, or Indonesian dishes.",
            "cost": "$30 - $50"
          },
          {
            "time": "2:00 PM",
            "activity": "Explore Canggu Shops",
            "location": "Canggu",
            "details": "Explore the trendy shops and boutiques in Canggu.  Find unique clothing, jewelry, souvenirs, and artwork.",
            "cost": "Variable"
          },
          {
            "time": "5:00 PM",
            "activity": "Sunset Horseback Riding",
            "location": "Canggu, Bali Equestrian Center",
            "details": "Enjoy a romantic sunset horseback ride along the beach.  Experience the beauty of the coastline from a different perspective. (Approx. $40-$60 per person).",
            "cost": "$120 - $180"
          },
          {
            "time": "7:00 PM",
            "activity": "Dinner in Canggu",
            "location": "Canggu Restaurant",
            "details": "Enjoy dinner at one of Canggu's many restaurants.  Canggu has a vibrant food scene with options for every taste.",
            "cost": "$40 - $70"
          }
        ]
      },
      {
        "day": 6,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Day Trip to Uluwatu",
            "location": "Canggu to Uluwatu",
            "details": "Take a day trip to Uluwatu (approx. 1.5-hour drive from Canggu).  Hire a private driver or taxi.",
            "cost": "$50 - $70"
          },
          {
            "time": "10:30 AM",
            "activity": "Visit Uluwatu Temple",
            "location": "Uluwatu Temple",
            "details": "Visit the Uluwatu Temple, a stunning temple perched on a cliff overlooking the ocean.  Enjoy the breathtaking views and learn about the temple's history. (Entry fee approx. $5 per person).",
            "cost": "$15"
          },
          {
            "time": "12:00 PM",
            "activity": "Lunch with a View",
            "location": "Restaurant near Uluwatu",
            "details": "Have lunch at a restaurant with a view of the Uluwatu cliffs and the ocean.",
            "cost": "$30 - $50"
          },
          {
            "time": "2:00 PM",
            "activity": "Relax at Padang Padang Beach",
            "location": "Padang Padang Beach",
            "details": "Spend the afternoon at Padang Padang Beach, a small but beautiful beach known for its clear blue water.  Enjoy swimming and sunbathing.",
            "cost": "$0"
          },
          {
            "time": "5:00 PM",
            "activity": "Watch the Kecak Fire Dance at Uluwatu",
            "location": "Uluwatu Temple",
            "details": "Watch the traditional Kecak fire dance performance at Uluwatu Temple at sunset.  The performance is a dramatic and captivating cultural experience. (Ticket price approx. $10 per person).",
            "cost": "$30"
          },
          {
            "time": "7:00 PM",
            "activity": "Dinner in Jimbaran",
            "location": "Jimbaran Beach",
            "details": "Enjoy a seafood dinner on Jimbaran Beach.  Dine at a restaurant with tables set up on the sand and enjoy fresh grilled seafood. (Prices vary, expect to pay for the seafood by weight).",
            "cost": "$80 - $150"
          },
          {
            "time": "9:00 PM",
            "activity": "Return to Canggu",
            "location": "Jimbaran to Canggu",
            "details": "Return to your accommodation in Canggu.",
            "cost": "$50 - $70"
          }
        ]
      },
      {
        "day": 7,
        "activities": [
          {
            "time": "10:00 AM",
            "activity": "Visit a Canggu Wellness Center",
            "location": "Canggu (e.g., The Practice, Samadi Bali)",
            "details": "Spend the morning at a wellness center in Canggu.  Participate in a yoga class, meditation session, or workshop. (Prices vary depending on the activity).",
            "cost": "$30 - $60"
          },
          {
            "time": "12:00 PM",
            "activity": "Healthy Lunch",
            "location": "Canggu Cafe",
            "details": "Enjoy a healthy lunch at a cafe in Canggu.  Many cafes offer organic, vegan, and vegetarian options.",
            "cost": "$30 - $50"
          },
          {
            "time": "2:00 PM",
            "activity": "Relax by the Pool or Beach",
            "location": "Canggu",
            "details": "Spend the afternoon relaxing by your hotel or villa pool, or return to your favorite Canggu beach for some sun and relaxation.",
            "cost": "$0"
          },
          {
            "time": "6:00 PM",
            "activity": "Farewell Dinner",
            "location": "Canggu Restaurant",
            "details": "Enjoy a special farewell dinner at a restaurant in Canggu.  Choose a place with a great atmosphere and delicious food to celebrate your Bali trip.",
            "cost": "$50 - $100"
          },
          {
            "time": "8:00 PM",
            "activity": "Enjoy Live Music",
            "location": "Canggu Bar",
            "details": "Enjoy live music at one of Canggu's bars.  Many venues offer live bands or DJs, creating a vibrant atmosphere.",
            "cost": "$30 - $60 (drinks)"
          }
        ]
      },
      {
        "day": 8,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Departure from Denpasar (DPS)",
            "location": "Canggu to Ngurah Rai International Airport (DPS)",
            "details": "Check out from your accommodation in Canggu and transfer to Denpasar International Airport (DPS) for your departure flight. Allow ample time for traffic. (approx 1-1.5 hours).",
            "cost": "$40 - $60"
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "Barcelona for Two: Food, Shopping, Nightlife & Relaxation",
    "destination": "Barcelona, Spain",
    "duration": "8 days",
    "groupSize": "2 travelers",
    "description": "A 4-day itinerary balancing culinary delights, shopping experiences, vibrant nightlife, and moments of relaxation in the beautiful city of Barcelona.",
    "image": "https://images.unsplash.com/photo-1591206521749-6f6f8ead79c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhcmNlbG9uYSUyMHNwYWlufGVufDB8MHwwfHx8MA%3D%3D",
    "price": 1200,
    "tags": ["food", "shopping", "nightlife", "relaxation"],
    "dailyBreakdown": [
      {
        "day": 1,
        "activities": [
          {
            "time": "10:00 AM",
            "activity": "Explore La Boqueria Market & Tapas Lunch",
            "location": "La Rambla, 91, 08001 Barcelona",
            "details": "Wander through the vibrant stalls of La Boqueria, one of Europe's most famous food markets. Sample fresh juices, local cheeses, and cured meats. Enjoy a delicious tapas lunch at one of the market's counters like Bar Pinotxo or El Quim de la Boqueria.",
            "cost": "$50"
          },
          {
            "time": "02:00 PM",
            "activity": "Stroll Passeig de Gràcia & Luxury Shopping",
            "location": "Passeig de Gràcia, Barcelona",
            "details": "Walk along the elegant Passeig de Gràcia, admiring Gaudí's architectural masterpieces like Casa Batlló and Casa Milà (La Pedrera) from the outside. Indulge in window shopping or browse the high-end boutiques featuring international and Spanish designers.",
            "cost": "$0 (window shopping) - $Variable (purchases)"
          },
          {
            "time": "08:00 PM",
            "activity": "Dinner in El Born & Cocktail Bar",
            "location": "El Born neighborhood",
            "details": "Explore the charming El Born district with its narrow streets and medieval architecture. Enjoy dinner at a restaurant like Tapeo Born (tapas) or Cal Boter (traditional Catalan). Afterwards, head to a stylish cocktail bar like Dr. Stravinsky or Paradiso for drinks.",
            "cost": "$80"
          }
        ]
      },
      {
        "day": 2,
        "activities": [
          {
            "time": "10:30 AM",
            "activity": "Sagrada Família Visit (Pre-booked Tickets)",
            "location": "Carrer de Mallorca, 401, 08013 Barcelona",
            "details": "Visit Antoni Gaudí's iconic Sagrada Família basilica. Book tickets online in advance to avoid long queues. Explore the stunning interior and exterior architecture, and consider taking the elevator up one of the towers for panoramic city views.",
            "cost": "$50 (for two tickets)"
          },
          {
            "time": "01:00 PM",
            "activity": "Picnic Lunch in Park Güell",
            "location": "Park Güell, 08024 Barcelona",
            "details": "Take a taxi or public transport to Park Güell. Purchase some local delicacies from a nearby bakery or deli and enjoy a relaxing picnic lunch amidst Gaudí's whimsical park. Explore the monumental zone (requires timed entry ticket booked in advance).",
            "cost": "$30 (including park entry)"
          },
          {
            "time": "07:00 PM",
            "activity": "Relaxing Beach Time & Paella Dinner in Barceloneta",
            "location": "Barceloneta Beach",
            "details": "Head to Barceloneta Beach for a relaxing stroll along the sand or simply unwind by the sea. Enjoy a traditional paella dinner at one of the many seafood restaurants lining the boardwalk, such as Can Solé or Salamanca.",
            "cost": "$70"
          }
        ]
      },
      {
        "day": 3,
        "activities": [
          {
            "time": "10:00 AM",
            "activity": "Gothic Quarter Exploration & Local Shops",
            "location": "Gothic Quarter (Barri Gòtic), Barcelona",
            "details": "Wander through the narrow, winding streets of the historic Gothic Quarter. Visit the Barcelona Cathedral, Plaça Sant Jaume, and explore the unique boutiques and artisan shops selling leather goods, jewelry, and local crafts.",
            "cost": "$10 (optional small purchases)"
          },
          {
            "time": "01:00 PM",
            "activity": "Tapas Hopping in Poble Sec",
            "location": "Poble Sec neighborhood",
            "details": "Experience the authentic tapas scene in the Poble Sec neighborhood. Enjoy a casual lunch by hopping between different bars along Carrer de Blai, sampling various pinchos and small tapas with a glass of wine or vermouth at each stop.",
            "cost": "$40"
          },
          {
            "time": "09:00 PM",
            "activity": "Flamenco Show & Late-Night Drinks",
            "location": "Various locations (e.g., Tablao Cordobes, Palau Dalmases)",
            "details": "Immerse yourselves in Spanish culture with a passionate flamenco show. Choose a reputable tablao and book tickets in advance. Afterwards, enjoy late-night drinks at a trendy bar in the Raval or El Born neighborhoods.",
            "cost": "$90 (for two for the show) + $30 (drinks)"
          }
        ]
      },
      {
        "day": 4,
        "activities": [
          {
            "time": "10:30 AM",
            "activity": "Montjuïc Hill Visit & Cable Car Ride",
            "location": "Montjuïc Hill, Barcelona",
            "details": "Take the funicular and/or cable car up Montjuïc Hill for stunning panoramic views of Barcelona and the coastline. Visit Montjuïc Castle, explore the gardens, or see the Magic Fountain show (check show times).",
            "cost": "$40 (for cable car and potential entry fees)"
          },
          {
            "time": "01:30 PM",
            "activity": "Leisurely Brunch in Eixample",
            "location": "Eixample neighborhood",
            "details": "Enjoy a relaxed brunch at one of the many stylish cafes in the Eixample district. Choose from options like brunch & cake or Federal Café for delicious food and a comfortable atmosphere.",
            "cost": "$40"
          },
          {
            "time": "04:00 PM",
            "activity": "Last-Minute Souvenir Shopping & Departure Preparations",
            "location": "Areas around Plaça Catalunya or Gothic Quarter",
            "details": "Do some last-minute souvenir shopping for friends and family. Enjoy a final coffee or gelato before heading back to your accommodation to prepare for departure.",
            "cost": "$Variable (souvenirs) + $10 (coffee/gelato)"
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "title": "Big Apple Adventure for Three",
    "destination": "New York City, USA",
    "duration": "5 days",
    "groupSize": "3 travelers",
    "description": "A 5-day exploration of New York City, balancing iconic landmarks, diverse dining experiences, shopping excursions, outdoor activities, and enriching museum visits for a group of three.",
    "image": "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5ldyUyMHlvcmslMjBjaXR5fGVufDB8MHwwfHx8MA%3D%3D",
    "price": 2500,
    "tags": ["food", "shopping", "outdoor", "museums"],
    "dailyBreakdown": [
      {
        "day": 1,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Breakfast at Russ & Daughters Cafe",
            "location": "127 Orchard St, New York, NY 10002",
            "details": "Start your day with classic New York Jewish fare like bagels, lox, and babka in a historic setting. Expect a short wait.",
            "cost": "$45"
          },
          {
            "time": "10:30 AM",
            "activity": "Explore the Tenement Museum",
            "location": "103 Orchard St, New York, NY 10002",
            "details": "Take a guided tour of this fascinating museum that tells the stories of immigrant families who lived in the Lower East Side. Book tickets in advance.",
            "cost": "$90"
          },
          {
            "time": "1:00 PM",
            "activity": "Lunch in Little Italy",
            "location": "Mulberry Street, New York, NY",
            "details": "Wander through Little Italy and choose from numerous trattorias for a traditional Italian lunch. Enjoy pasta, pizza, or seafood.",
            "cost": "$60"
          },
          {
            "time": "3:00 PM",
            "activity": "Shopping in SoHo",
            "location": "Broadway and surrounding streets, New York, NY",
            "details": "Explore the trendy boutiques, designer stores, and art galleries in the SoHo district. Find unique clothing, accessories, and home goods.",
            "cost": "$100+"
          },
          {
            "time": "6:00 PM",
            "activity": "Walk across the Brooklyn Bridge",
            "location": "Starts at Park Row, Manhattan or Adams St, Brooklyn",
            "details": "Enjoy a scenic walk across the iconic Brooklyn Bridge, taking in breathtaking views of the Manhattan skyline and the Statue of Liberty.",
            "cost": "$0"
          },
          {
            "time": "8:00 PM",
            "activity": "Dinner in DUMBO",
            "location": "Various restaurants in DUMBO, Brooklyn",
            "details": "Have dinner in the trendy DUMBO (Down Under the Manhattan Bridge Overpass) neighborhood, offering diverse cuisines with waterfront views.",
            "cost": "$75"
          }
        ]
      },
      {
        "day": 2,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Breakfast at Joe's Pizza",
            "location": "Multiple locations (e.g., 7 Carmine St, New York, NY 10014)",
            "details": "Experience a classic New York slice of pizza for breakfast. A quick and affordable way to start the day.",
            "cost": "$15"
          },
          {
            "time": "10:00 AM",
            "activity": "Visit the Metropolitan Museum of Art (The Met)",
            "location": "1000 Fifth Ave, New York, NY 10028",
            "details": "Explore one of the world's largest and finest art museums, housing collections spanning various cultures and time periods. Allow at least 3-4 hours.",
            "cost": "$90 (suggested donation)"
          },
          {
            "time": "1:30 PM",
            "activity": "Picnic Lunch in Central Park",
            "location": "Great Lawn or Sheep Meadow, Central Park",
            "details": "Grab sandwiches and snacks from a nearby deli and enjoy a relaxing picnic lunch in the iconic Central Park.",
            "cost": "$40"
          },
          {
            "time": "3:00 PM",
            "activity": "Explore Central Park",
            "location": "Central Park, New York, NY",
            "details": "Rent bikes, stroll through Strawberry Fields (John Lennon memorial), visit Bethesda Terrace and Fountain, or simply relax and people-watch.",
            "cost": "$30 (bike rental)"
          },
          {
            "time": "6:00 PM",
            "activity": "Pre-theater drinks",
            "location": "Various bars near Times Square",
            "details": "Enjoy cocktails or appetizers at a bar near the theater district before your Broadway show.",
            "cost": "$60"
          },
          {
            "time": "8:00 PM",
            "activity": "See a Broadway Show",
            "location": "Various theaters in the Theater District",
            "details": "Experience the magic of Broadway by attending a world-class theatrical performance. Book tickets well in advance.",
            "cost": "$300+"
          }
        ]
      },
      {
        "day": 3,
        "activities": [
          {
            "time": "9:30 AM",
            "activity": "Breakfast at Chelsea Market",
            "location": "75 9th Ave, New York, NY 10011",
            "details": "Explore the diverse food vendors at Chelsea Market and grab breakfast from one of the many options, from pastries to tacos.",
            "cost": "$40"
          },
          {
            "time": "11:00 AM",
            "activity": "Walk the High Line",
            "location": "Starts at Gansevoort Street and runs north to 34th Street",
            "details": "Stroll along this elevated linear park built on former railway lines, offering unique city views and public art installations.",
            "cost": "$0"
          },
          {
            "time": "1:00 PM",
            "activity": "Lunch in the Meatpacking District",
            "location": "Various restaurants in the Meatpacking District",
            "details": "Enjoy lunch at one of the trendy restaurants in the Meatpacking District, known for its upscale dining options.",
            "cost": "$70"
          },
          {
            "time": "2:30 PM",
            "activity": "Visit the Whitney Museum of American Art",
            "location": "99 Gansevoort St, New York, NY 10014",
            "details": "Explore a premier collection of modern and contemporary American art. Enjoy the outdoor terraces with city views.",
            "cost": "$75"
          },
          {
            "time": "5:00 PM",
            "activity": "Shopping in Greenwich Village",
            "location": "Bleecker Street and surrounding areas, New York, NY",
            "details": "Browse the eclectic shops, bookstores, and vintage stores in the charming Greenwich Village.",
            "cost": "$50+"
          },
          {
            "time": "7:30 PM",
            "activity": "Dinner in Greenwich Village",
            "location": "Various restaurants in Greenwich Village",
            "details": "Enjoy a cozy dinner in one of the many diverse restaurants in Greenwich Village, offering everything from Italian to American cuisine.",
            "cost": "$65"
          }
        ]
      },
      {
        "day": 4,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Breakfast at a local diner",
            "location": "Various diners throughout Manhattan",
            "details": "Experience a classic New York diner breakfast with pancakes, eggs, and coffee.",
            "cost": "$30"
          },
          {
            "time": "10:00 AM",
            "activity": "Visit the 9/11 Memorial & Museum",
            "location": "180 Greenwich St, New York, NY 10007",
            "details": "Pay your respects at the 9/11 Memorial and explore the museum to learn about the events and their aftermath. Allow ample time.",
            "cost": "$87"
          },
          {
            "time": "1:00 PM",
            "activity": "Lunch in the Financial District",
            "location": "Various restaurants in the Financial District",
            "details": "Grab a quick and casual lunch in the bustling Financial District.",
            "cost": "$45"
          },
          {
            "time": "2:30 PM",
            "activity": "Ferry to the Statue of Liberty and Ellis Island",
            "location": "Departs from Battery Park, Manhattan",
            "details": "Take a ferry to visit the iconic Statue of Liberty and the historic Ellis Island Immigration Museum. Book ferry tickets in advance.",
            "cost": "$63"
          },
          {
            "time": "6:00 PM",
            "activity": "Happy Hour in Stone Street Historic District",
            "location": "Stone Street, New York, NY",
            "details": "Enjoy drinks and appetizers in the charming cobblestone pedestrian street with historic pubs and bars.",
            "cost": "$50"
          },
          {
            "time": "8:00 PM",
            "activity": "Dinner in the Lower East Side",
            "location": "Various restaurants in the Lower East Side",
            "details": "Explore the diverse culinary scene of the Lower East Side, offering everything from trendy eateries to classic delis.",
            "cost": "$70"
          }
        ]
      },
      {
        "day": 5,
        "activities": [
          {
            "time": "9:30 AM",
            "activity": "Brunch in the West Village",
            "location": "Various restaurants in the West Village",
            "details": "Enjoy a leisurely brunch in the charming and picturesque West Village.",
            "cost": "$60"
          },
          {
            "time": "11:00 AM",
            "activity": "Shopping on Bleecker Street",
            "location": "Bleecker Street, New York, NY",
            "details": "Browse the unique boutiques and designer stores on Bleecker Street for last-minute souvenirs or personal treats.",
            "cost": "$75+"
          },
          {
            "time": "1:00 PM",
            "activity": "Visit the American Museum of Natural History",
            "location": "Central Park West at 79th St, New York, NY 10024",
            "details": "Explore fascinating exhibits on dinosaurs, human origins, and the natural world. Allow at least 2-3 hours.",
            "cost": "$81 (suggested donation)"
          },
          {
            "time": "4:00 PM",
            "activity": "Relax and Reflect in Central Park",
            "location": "Conservatory Water or The Lake, Central Park",
            "details": "Enjoy a final relaxing moment in Central Park, perhaps renting a rowboat on The Lake or strolling around Conservatory Water.",
            "cost": "$20 (rowboat rental)"
          },
          {
            "time": "6:00 PM",
            "activity": "Farewell Dinner in Midtown",
            "location": "Various restaurants in Midtown Manhattan",
            "details": "Enjoy a final celebratory dinner in the heart of Midtown, choosing from a wide range of cuisines.",
            "cost": "$90"
          },
          {
            "time": "8:00 PM",
            "activity": "Rooftop Bar with City Views",
            "location": "Various rooftop bars in Manhattan",
            "details": "End your trip with drinks at a rooftop bar, enjoying stunning panoramic views of the New York City skyline.",
            "cost": "$75"
          }
        ]
      }
    ]
  },
  {
    "id": 6,
    "title": "Andean Exploration: Machu Picchu & Cultural Immersion (10 Days)",
    "destination": "Machu Picchu, Peru",
    "duration": "10 days",
    "groupSize": "5 travelers",
    "description": "A 10-day journey through Peru, blending the awe-inspiring wonder of Machu Picchu with rich cultural experiences, outdoor adventures, and opportunities for relaxation, tailored for a group of five.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg",
    "price": 3500,
    "tags": ["cultural", "outdoor", "food", "relaxation"],
    "dailyBreakdown": [
      {
        "day": 1,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Arrival in Cusco & Transfer to Hotel",
            "location": "Alejandro Velasco Astete International Airport (CUZ), Cusco",
            "details": "Arrive at Cusco airport. Meet your pre-arranged private transfer and head to your hotel in the historic San Blas neighborhood. Settle in and take it easy to acclimatize to the altitude (approx. 11,200 ft).",
            "cost": "$100 (for private transfer)"
          },
          {
            "time": "1:00 PM",
            "activity": "Lunch at a Traditional Cusqueñan Restaurant",
            "location": "San Blas neighborhood, Cusco",
            "details": "Enjoy a leisurely lunch at a local restaurant in San Blas. Try traditional Peruvian dishes like *lomo saltado* or *ají de gallina*. Focus on light and easily digestible food on your first day.",
            "cost": "$75 (for 5 people)"
          },
          {
            "time": "4:00 PM",
            "activity": "Gentle Exploration of San Blas & Artisan Market",
            "location": "San Blas Plaza and surrounding streets, Cusco",
            "details": "Take a slow walk around the charming San Blas neighborhood, known for its artisan workshops and picturesque streets. Browse the local crafts and art at the San Blas market. Return to the hotel for a relaxing evening.",
            "cost": "$20 (optional souvenirs)"
          }
        ]
      },
      {
        "day": 2,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Cusco City Tour: Coricancha & Cathedral",
            "location": "Coricancha (Temple of the Sun) and Cusco Cathedral, Cusco",
            "details": "Embark on a guided tour of Cusco's historical center. Visit Coricancha, the impressive Incan Temple of the Sun, and the opulent Cusco Cathedral in the Plaza de Armas, learning about their rich history and architecture.",
            "cost": "$100 (for guided tour and entrance fees)"
          },
          {
            "time": "1:00 PM",
            "activity": "Lunch with a View",
            "location": "Restaurant overlooking Plaza de Armas, Cusco",
            "details": "Enjoy lunch at a restaurant with a balcony view of the bustling Plaza de Armas. Sample more Peruvian cuisine while soaking in the city atmosphere.",
            "cost": "$85 (for 5 people)"
          },
          {
            "time": "3:00 PM",
            "activity": "Sacsayhuaman Archaeological Site",
            "location": "Sacsayhuaman, overlooking Cusco",
            "details": "Take a short taxi ride to Sacsayhuaman, a magnificent Incan fortress with massive stone walls. Explore the site with your guide and learn about its significance.",
            "cost": "$30 (taxi) + included in Cusco Tourist Ticket (see notes)"
          }
        ]
      },
      {
        "day": 3,
        "activities": [
          {
            "time": "8:00 AM",
            "activity": "Full-Day Sacred Valley Tour: Chinchero",
            "location": "Chinchero, Sacred Valley",
            "details": "Begin your exploration of the Sacred Valley with a visit to Chinchero, known for its traditional weaving practices and Incan ruins. Participate in a weaving demonstration and browse local textiles.",
            "cost": "$120 (for guided tour and transport)"
          },
          {
            "time": "12:00 PM",
            "activity": "Lunch in Urubamba",
            "location": "Urubamba, Sacred Valley",
            "details": "Enjoy a delicious lunch in Urubamba, known for its fertile lands and agricultural produce. Many restaurants here offer fresh, locally sourced ingredients.",
            "cost": "$90 (for 5 people)"
          },
          {
            "time": "2:30 PM",
            "activity": "Ollantaytambo Fortress & Town Exploration",
            "location": "Ollantaytambo, Sacred Valley",
            "details": "Visit the impressive Incan fortress of Ollantaytambo, a strategically important site with well-preserved architecture. Explore the charming town with its narrow cobblestone streets and ancient water channels.",
            "cost": "included in Sacred Valley Tour"
          }
        ]
      },
      {
        "day": 4,
        "activities": [
          {
            "time": "8:00 AM",
            "activity": "Train to Aguas Calientes (Machu Picchu Town)",
            "location": "Ollantaytambo Train Station to Aguas Calientes Station",
            "details": "Take a scenic train journey through the Urubamba River Valley to Aguas Calientes, the town at the base of Machu Picchu. Enjoy the stunning landscapes along the way.",
            "cost": "$400 (round-trip for 5 people - budget for Inca Rail or PeruRail)"
          },
          {
            "time": "11:00 AM",
            "activity": "Hotel Check-in & Town Exploration",
            "location": "Aguas Calientes",
            "details": "Check into your hotel in Aguas Calientes. Take some time to explore the small town, visit the local market, and soak in the atmosphere.",
            "cost": "$0"
          },
          {
            "time": "6:00 PM",
            "activity": "Relaxing Hot Springs Visit & Dinner",
            "location": "Aguas Calientes Hot Springs",
            "details": "Enjoy a relaxing soak in the natural hot springs of Aguas Calientes, known for their therapeutic mineral waters. Afterwards, have dinner at a local restaurant in town.",
            "cost": "$15 (hot springs entrance per person) + $80 (dinner for 5)"
          }
        ]
      },
      {
        "day": 5,
        "activities": [
          {
            "time": "6:00 AM",
            "activity": "Early Bus to Machu Picchu Citadel",
            "location": "Bus stop in Aguas Calientes to Machu Picchu entrance",
            "details": "Take an early bus up the winding road to the entrance of Machu Picchu to avoid the biggest crowds and witness the sunrise over the mountains (weather permitting).",
            "cost": "$90 (round-trip bus for 5 people)"
          },
          {
            "time": "7:00 AM",
            "activity": "Guided Tour of Machu Picchu",
            "location": "Machu Picchu Citadel",
            "details": "Embark on a comprehensive guided tour of the Lost City of the Incas. Learn about its history, architecture, and significance as you explore its various sectors and temples.",
            "cost": "$150 (for private guided tour) + included in Machu Picchu entrance ticket (see notes)"
          },
          {
            "time": "12:00 PM",
            "activity": "Exploration & Optional Hike (Huayna Picchu/Machu Picchu Mountain)",
            "location": "Machu Picchu Citadel",
            "details": "After the guided tour, you'll have some free time to explore Machu Picchu at your own pace. For those who booked in advance, consider hiking Huayna Picchu or Machu Picchu Mountain for stunning panoramic views (additional permit required).",
            "cost": "$0 (exploration) + $200 (approx. for 5 Huayna Picchu permits, if booked)"
          }
        ]
      },
      {
        "day": 6,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Second Entry to Machu Picchu (Optional) or Relaxing Morning",
            "location": "Machu Picchu Citadel (optional) / Aguas Calientes",
            "details": "For those who wish to delve deeper, consider a second entry to Machu Picchu to explore different areas or revisit favorite spots (requires purchasing a separate ticket in advance). Alternatively, enjoy a relaxing morning in Aguas Calientes.",
            "cost": "$150 (approx. for 5 second entry tickets) / $0"
          },
          {
            "time": "1:00 PM",
            "activity": "Lunch in Aguas Calientes",
            "location": "Restaurant in Aguas Calientes",
            "details": "Have lunch in Aguas Calientes before preparing for your return journey.",
            "cost": "$70 (for 5 people)"
          },
          {
            "time": "3:00 PM",
            "activity": "Train and Transfer Back to Cusco",
            "location": "Aguas Calientes Station to Cusco Hotel",
            "details": "Take the train back to Ollantaytambo, followed by a private transfer back to your hotel in Cusco. Enjoy the evening at your leisure.",
            "cost": "included in Day 4 train cost + $100 (private transfer from Ollantaytambo to Cusco)"
          }
        ]
      },
      {
        "day": 7,
        "activities": [
          {
            "time": "10:00 AM",
            "activity": "Cooking Class: Peruvian Cuisine",
            "location": "Cusco (various cooking schools)",
            "details": "Immerse yourselves in Peruvian gastronomy with a hands-on cooking class. Learn to prepare classic dishes like ceviche, causa, and quinoa soup. Enjoy the fruits of your labor for lunch.",
            "cost": "$250 (for 5 people)"
          },
          {
            "time": "2:00 PM",
            "activity": "Relaxation at the Hotel or Exploring Local Markets",
            "location": "Your hotel in Cusco or Mercado San Pedro",
            "details": "Enjoy a relaxing afternoon at your hotel, perhaps indulging in a massage or simply unwinding. Alternatively, explore the vibrant Mercado San Pedro, a local market brimming with fresh produce, meats, cheeses, and souvenirs.",
            "cost": "$50 (optional massage) / $20 (optional market purchases)"
          },
          {
            "time": "7:00 PM",
            "activity": "Dinner and Live Music",
            "location": "Restaurant in Cusco with live Andean music",
            "details": "Enjoy a delicious dinner at a restaurant in Cusco that features live Andean music. Experience the local culture through its vibrant sounds and flavors.",
            "cost": "$95 (for 5 people)"
          }
        ]
      },
      {
        "day": 8,
        "activities": [
          {
            "time": "9:00 AM",
            "activity": "Mountain Biking or Hiking in the Sacred Valley",
            "location": "Around Pisac or other areas in the Sacred Valley",
            "details": "Embark on an outdoor adventure with a guided mountain biking tour or a scenic hike in the Sacred Valley. Enjoy the stunning landscapes and fresh air. Choose a route that suits the group's fitness level.",
            "cost": "$200 (for guided biking/hiking tour and equipment rental)"
          },
          {
            "time": "1:00 PM",
            "activity": "Picnic Lunch in the Sacred Valley",
            "location": "Scenic spot in the Sacred Valley",
            "details": "Enjoy a pre-arranged picnic lunch amidst the beautiful scenery of the Sacred Valley after your outdoor activity.",
            "cost": "$60 (for picnic lunch)"
          },
          {
            "time": "4:00 PM",
            "activity": "Visit to a Local Brewery or Pisco Tasting",
            "location": "Cusco or Sacred Valley",
            "details": "Experience the local beverage scene with a visit to a craft brewery to sample local beers or participate in a pisco tasting session to learn about Peru's national spirit.",
            "cost": "$75 (for 5 people)"
          }
        ]
      },
      {
        "day": 9,
        "activities": [
          {
            "time": "10:00 AM",
            "activity": "Artisan Workshop Visit",
            "location": "San Blas or surrounding areas in Cusco",
            "details": "Visit a local artisan workshop to witness traditional crafts being made, such as ceramics, textiles, or wood carvings. Engage with the artists and learn about their techniques and inspirations.",
            "cost": "$25 (optional small purchases)"
          },
          {
            "time": "1:00 PM",
            "activity": "Farewell Lunch at a Fine Dining Restaurant",
            "location": "Upscale restaurant in Cusco",
            "details": "Enjoy a special farewell lunch at one of Cusco's acclaimed restaurants, savoring refined Peruvian cuisine and reflecting on your incredible journey.",
            "cost": "$120 (for 5 people)"
          },
          {
            "time": "4:00 PM",
            "activity": "Relaxing Afternoon & Souvenir Shopping",
            "location": "Cusco city center",
            "details": "Spend the afternoon relaxing at your hotel, revisiting favorite spots in Cusco, or doing some last-minute souvenir shopping at the various markets and shops.",
            "cost": "$50 (optional souvenirs)"
          }
        ]
      },
      {
        "day": 10,
        "activities": [
          {
            "time": "8:00 AM",
            "activity": "Breakfast at the Hotel",
            "location": "Your hotel in Cusco",
            "details": "Enjoy a final breakfast at your hotel.",
            "cost": "included in hotel stay"
          },
          {
            "time": "9:30 AM",
            "activity": "Transfer to Alejandro Velasco Astete International Airport (CUZ)",
            "location": "Your hotel in Cusco to Cusco Airport",
            "details": "Your pre-arranged private transfer will take you to the airport for your departure.",
            "cost": "$100 (for private transfer)"
          },
          {
            "time": "N/A",
            "activity": "Departure from Cusco",
            "location": "Alejandro Velasco Astete International Airport (CUZ), Cusco",
            "details": "Depart from Cusco.",
            "cost": "$0"
          }
        ]
      }
    ]
  }
];