// import React from "react";
// import {
//   FaPlane,
//   FaMapMarkedAlt,
//   FaHeart,
//   FaCalendarAlt,
//   FaUpload,
// } from "react-icons/fa";

// interface WelcomeSectionProps {
//   user: string;
// }

// const WelcomeSection: React.FC<WelcomeSectionProps> = ({ user }) => {
//   // Mock data - replace with actual data from your backend
//   const stats = {
//     tripsPlanned: 3,
//     destinationsVisited: 5,
//     wishlistItems: 8,
//   };

//   const nextTrip = {
//     destination: "Paris, France",
//     dates: "June 15-22, 2024",
//     daysUntil: 45,
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Welcome Section */}
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold mb-3">
//             Welcome back,{" "}
//             <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
//               {user}
//             </span>
//           </h1>
//           <p className="text-gray-500 text-lg">
//             Ready to plan your next adventure?
//           </p>
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//           {/* Left Column - Next Trip & Quick Actions */}
//           <div className="lg:col-span-8 space-y-8">
//             {/* Next Trip Card */}
//             <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
//               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-700 mb-2">
//                     Next Upcoming Trip
//                   </h2>
//                   <h3 className="text-3xl font-bold mb-2">
//                     {nextTrip.destination}
//                   </h3>
//                   <div className="flex items-center gap-2 text-gray-600">
//                     <FaCalendarAlt />
//                     <span>{nextTrip.dates}</span>
//                   </div>
//                 </div>
//                 <div className="text-center bg-white rounded-xl p-4 shadow-sm">
//                   <div className="text-4xl font-bold text-purple-500">
//                     {nextTrip.daysUntil}
//                   </div>
//                   <div className="text-gray-500">days until departure</div>
//                 </div>
//               </div>
//               <div className="flex gap-3 mt-6">
//                 <button className="px-6 py-2 bg-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity">
//                   View Itinerary
//                 </button>
//                 <button className="px-6 py-2 border border-purple-500 text-purple-500 rounded-xl hover:bg-purple-50 transition-colors">
//                   Edit Trip
//                 </button>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               <button className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-colors">
//                 <div className="bg-purple-100 p-2 rounded-lg">
//                   <FaPlane className="text-purple-500" />
//                 </div>
//                 <span className="font-medium">Plan New Trip</span>
//               </button>
//               <button className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-colors">
//                 <div className="bg-blue-100 p-2 rounded-lg">
//                   <FaHeart className="text-blue-500" />
//                 </div>
//                 <span className="font-medium">View Wishlist</span>
//               </button>
//               <button className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-colors">
//                 <div className="bg-green-100 p-2 rounded-lg">
//                   <FaUpload className="text-green-500" />
//                 </div>
//                 <span className="font-medium">Upload Documents</span>
//               </button>
//             </div>
//           </div>

//           {/* Right Column - Stats */}
//           <div className="lg:col-span-4">
//             <div className="bg-white rounded-2xl border border-gray-100 p-6">
//               <h2 className="text-lg font-semibold mb-6">Your Travel Stats</h2>
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="bg-purple-100 p-2 rounded-lg">
//                       <FaMapMarkedAlt className="text-purple-500" />
//                     </div>
//                     <span className="text-gray-600">Trips Planned</span>
//                   </div>
//                   <span className="font-semibold">{stats.tripsPlanned}</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="bg-blue-100 p-2 rounded-lg">
//                       <FaPlane className="text-blue-500" />
//                     </div>
//                     <span className="text-gray-600">Destinations Visited</span>
//                   </div>
//                   <span className="font-semibold">
//                     {stats.destinationsVisited}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="bg-pink-100 p-2 rounded-lg">
//                       <FaHeart className="text-pink-500" />
//                     </div>
//                     <span className="text-gray-600">Wishlist Items</span>
//                   </div>
//                   <span className="font-semibold">{stats.wishlistItems}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeSection;
