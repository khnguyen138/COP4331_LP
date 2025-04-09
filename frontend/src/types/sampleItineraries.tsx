import { SampleItinerary } from "./itinerary";

export const sampleItineraries: SampleItinerary[] = [
    {
        id: 1,
        title: "Tokyo Cultural, Culinary, Tech & Shopping Adventure for Two",
        destination: "Tokyo, Japan",
        duration: 7,
        groupSize: 2,
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
        "duration": 10,
        "groupSize": 4,
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
        "duration": 8,
        "groupSize": 3,
        "description": "An 8-day journey to Bali, focusing on wellness, immersion in nature, cultural exploration, and deep relaxation. This itinerary is designed to rejuvenate the mind, body, and spirit.",
        "image": "https://images.unsplash.com/photo-1591206521749-6f6f8ead79c1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhcmNlbG9uYSUyMHNwYWlufGVufDB8MHwwfHx8MA%3D%3D",
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
    }
];