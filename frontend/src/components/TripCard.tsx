// import { useState } from "react";
// import { Card, Button } from "react-bootstrap";
// import {
//   Heart,
//   GeoAltFill,
//   Star,
//   Calendar,
//   People,
// } from "react-bootstrap-icons";
// import LoginModal from "../pages/LoginModal";

// interface TripCardProps {
//   trip: {
//     id: string;
//     title: string;
//     location: string;
//     image: string;
//     rating: number;
//     days: number;
//     people: number;
//     price: number;
//   };
// }

// export default function TripCard({ trip }: TripCardProps) {
//   const [isFavorite, setIsFavorite] = useState(false);

//   return (
//     <Card className="h-100 card-hover border overflow-hidden">
//       <div className="position-relative img-zoom-container">
//         <div
//           className="img-zoom bg-secondary"
//           style={{
//             backgroundImage: `url(${
//               trip.image || "https://via.placeholder.com/600x400"
//             })`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             height: "200px",
//           }}
//         ></div>
//         <Button
//           variant="light"
//           size="sm"
//           className="position-absolute end-0 top-0 m-2 rounded-circle p-1"
//           onClick={() => setIsFavorite(!isFavorite)}
//         >
//           <Heart className={`heart-icon ${isFavorite ? "active" : ""}`} />
//         </Button>
//       </div>
//       <Card.Body>
//         <div className="d-flex justify-content-between align-items-start">
//           <div>
//             <Card.Title className="h5 mb-1">{trip.title}</Card.Title>
//             <div className="d-flex align-items-center text-muted small mb-2">
//               <GeoAltFill size={12} className="me-1" />
//               <span>{trip.location}</span>
//             </div>
//           </div>
//           <div className="d-flex align-items-center">
//             <Star size={14} className="text-warning me-1" />
//             <span className="fw-medium small">{trip.rating}</span>
//           </div>
//         </div>
//         <div className="d-flex gap-3 text-muted small mb-3">
//           <div className="d-flex align-items-center">
//             <Calendar size={12} className="me-1" />
//             <span>{trip.days} days</span>
//           </div>
//           <div className="d-flex align-items-center">
//             <People size={12} className="me-1" />
//             <span>{trip.people} people</span>
//           </div>
//         </div>
//         <div className="d-flex justify-content-between align-items-center">
//           <div>
//             <span className="fw-bold">${trip.price}</span>
//             <span className="text-muted small"> / person</span>
//           </div>
//           <LoginModal
//             trigger={
//               <Button variant="outline-primary" size="sm">
//                 View Trip
//               </Button>
//             }
//           />
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }
