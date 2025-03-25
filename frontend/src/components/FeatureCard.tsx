import type { ReactNode } from "react";
import { Card } from "react-bootstrap";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="h-100 card-hover border">
      <Card.Body className="p-4">
        <div className="feature-icon text-primary mb-3">{icon}</div>
        <Card.Title className="fw-medium">{title}</Card.Title>
        <Card.Text className="text-muted small">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
