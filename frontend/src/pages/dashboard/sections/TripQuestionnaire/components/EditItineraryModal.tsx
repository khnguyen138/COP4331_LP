import React from "react";
import { Modal, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Activity, Itinerary } from "../../../../../types/itinerary";

interface EditItineraryModalProps {
  show: boolean;
  onHide: () => void;
  itinerary: Itinerary | null;
  onSave: (updatedItinerary: Itinerary) => void;
}

const EditItineraryModal: React.FC<EditItineraryModalProps> = ({
  show,
  onHide,
  itinerary,
  onSave,
}) => {
  const [editingItinerary, setEditingItinerary] =
    React.useState<Itinerary | null>(null);

  React.useEffect(() => {
    if (itinerary) {
      setEditingItinerary({ ...itinerary });
    }
  }, [itinerary]);

  if (!editingItinerary) return null;

  const handleInputChange = (field: string, value: any) => {
    setEditingItinerary((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleActivityChange = (
    dayIndex: number,
    activityIndex: number,
    field: keyof Activity,
    value: string
  ) => {
    const newBreakdown = [...editingItinerary.dailyBreakdown];
    newBreakdown[dayIndex].activities[activityIndex] = {
      ...newBreakdown[dayIndex].activities[activityIndex],
      [field]: value,
    };
    setEditingItinerary((prev) => ({
      ...prev!,
      dailyBreakdown: newBreakdown,
    }));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" className="edit-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Itinerary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editingItinerary.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={editingItinerary.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editingItinerary.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={editingItinerary.price}
                  onChange={(e) =>
                    handleInputChange("price", parseFloat(e.target.value))
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  value={editingItinerary.tags.join(", ")}
                  onChange={(e) =>
                    handleInputChange(
                      "tags",
                      e.target.value.split(",").map((tag) => tag.trim())
                    )
                  }
                  placeholder="Enter tags separated by commas"
                />
              </Form.Group>
            </Col>
          </Row>

          <h5>Daily Activities</h5>
          {editingItinerary.dailyBreakdown.map((day, dayIndex) => (
            <Card key={dayIndex} className="mb-3">
              <Card.Body>
                <h6>Day {day.day}</h6>
                {day.activities.map((activity, actIndex) => (
                  <div key={actIndex} className="mb-3 p-3 border rounded">
                    <Form.Group className="mb-2">
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        type="text"
                        value={activity.time}
                        onChange={(e) =>
                          handleActivityChange(
                            dayIndex,
                            actIndex,
                            "time",
                            e.target.value
                          )
                        }
                        placeholder="e.g., 9:00 AM"
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Activity</Form.Label>
                      <Form.Control
                        type="text"
                        value={activity.activity}
                        onChange={(e) =>
                          handleActivityChange(
                            dayIndex,
                            actIndex,
                            "activity",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type="text"
                        value={activity.location}
                        onChange={(e) =>
                          handleActivityChange(
                            dayIndex,
                            actIndex,
                            "location",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Details</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={activity.details}
                        onChange={(e) =>
                          handleActivityChange(
                            dayIndex,
                            actIndex,
                            "details",
                            e.target.value
                          )
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Cost</Form.Label>
                      <Form.Control
                        type="text"
                        value={activity.cost}
                        onChange={(e) =>
                          handleActivityChange(
                            dayIndex,
                            actIndex,
                            "cost",
                            e.target.value
                          )
                        }
                        placeholder="e.g., $25"
                      />
                    </Form.Group>
                  </div>
                ))}
              </Card.Body>
            </Card>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onSave(editingItinerary);
            onHide();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditItineraryModal;
