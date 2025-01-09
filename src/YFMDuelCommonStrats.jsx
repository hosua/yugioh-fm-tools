import {
  Row,
  Col,
  ListGroup,
  Button,
  FloatingLabel,
  InputGroup,
  Form,
  Container,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./YFM.css";

function YFMCommonStrats() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h4 style={{ textAlign: "center" }}>
              Method 1<br />
              (4 Effective Attacks)
            </h4>
            <ListGroup>
              <ListGroup.Item>Effective Attacks x4</ListGroup.Item>
              <ListGroup.Item>Fuses x15</ListGroup.Item>
              <ListGroup.Item>Pure Magic x1</ListGroup.Item>
              <ListGroup.Item>Trigger Trap x1</ListGroup.Item>
              <ListGroup.Item>Equip Magic x1</ListGroup.Item>
              <ListGroup.Item>Face Down x1</ListGroup.Item>
              <ListGroup.Item>Life Points &lt; 7000</ListGroup.Item>
              <ListGroup.Item>Cards Remaining &lt; 4</ListGroup.Item>
              <ListGroup.Item>9+ Turns Passed</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <h4 style={{ textAlign: "center" }}>
              Method 2<br />
              (4 Pure Magics)
            </h4>
            <ListGroup>
              <ListGroup.Item>Pure Magic x4</ListGroup.Item>
              <ListGroup.Item>Fuses x15</ListGroup.Item>
              <ListGroup.Item>Trigger Trap x1</ListGroup.Item>
              <ListGroup.Item>Equip Magic x1</ListGroup.Item>
              <ListGroup.Item>Face Down x1</ListGroup.Item>
              <ListGroup.Item>Life Points &lt; 7000</ListGroup.Item>
              <ListGroup.Item>Cards Remaining &lt; 4</ListGroup.Item>
              <ListGroup.Item>9+ Turns Passed</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <h4 style={{ textAlign: "center" }}>
              Method 3<br />
              (4 Equip Magics)
            </h4>
            <ListGroup>
              <ListGroup.Item>Equip Magic x4</ListGroup.Item>
              <ListGroup.Item>Fuses x15</ListGroup.Item>
              <ListGroup.Item>Pure Magic x1</ListGroup.Item>
              <ListGroup.Item>Trigger Trap x1</ListGroup.Item>
              <ListGroup.Item>Face Down x1</ListGroup.Item>
              <ListGroup.Item>Life Points &lt; 7000</ListGroup.Item>
              <ListGroup.Item>Cards Remaining &lt; 4</ListGroup.Item>
              <ListGroup.Item>9+ Turns Passed</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function ValidateInput({ label, min, max, value, onChange }) {
  const [inputValue, setInputValue] = useState(0);

  const isMaxReached = value >= max;

  return (
    <FloatingLabel label={`${label} (${max})`}>
      <Form.Control
        style={{ height: "75px" }}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        isValid={isMaxReached}
      />
    </FloatingLabel>
  );
}

function YFMDuelCommonStratsApp() {
  const [values, setValues] = useState({
    method1: {
      attacks: 0,
      fuses: 0,
      magic: 0,
      trap: 0,
      equip: 0,
      faceDown: 0,
      lifePoints: false,
      cardsRemaining: false,
      turnsPassed: false,
    },
    method2: {
      fuses: 0,
      magic: 0,
      trap: 0,
      faceDown: 0,
      lifePoints: false,
      cardsRemaining: false,
      turnsPassed: false,
    },
    method3: {
      fuses: 0,
      magic: 0,
      trap: 0,
      equips: 0,
      faceDown: 0,
      lifePoints: false,
      cardsRemaining: false,
      turnsPassed: false,
    },
  });

  const handleInputChange = (method, key, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [method]: {
        ...prevValues[method],
        [key]: newValue,
      },
    }));
  };

  const handleFormReset = (method) => {
    setValues((prevValues) => ({
      ...prevValues,
      [method]: {
        attacks: 0,
        fuses: 0,
        magic: 0,
        trap: 0,
        equip: 0,
        faceDown: 0,
        lifePoints: false,
        cardsRemaining: false,
        turnsPassed: false,
      },
    }));
  };

  /* Ensure that the user doesn't accidentally reload the page and lose the data */
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); // Empty dependency array to ensure the effect is run only once

  return (
    <>
      <div className="yfmc-body" data-bs-theme="dark">
        <h3 className="yfmc-title">Common A-TEC Strategies</h3>
        <p className="ms-5 me-5" style={{ textAlign: "center" }}>
          This page is a simple page that helps you keep track of progress
          towards getting an A-TEC grading in Yugioh FM.
        </p>
        <p className="ms-5 me-5" style={{ textAlign: "center" }}>
          For more details, watch this{" "}
          <a href="https://www.youtube.com/watch?v=dmyEi5hBdQA">video</a>.
        </p>
        <YFMCommonStrats />
        <hr />
        <Container>
          {/* Method 1 Form */}
          <Form>
            <h4>Method 1 (Effective Attacks) </h4>
            <InputGroup style={{ width: "auto" }}>
              <ValidateInput
                label="Effective Attacks"
                min="0"
                max="4"
                value={values.method1.attacks}
                onChange={(e) =>
                  handleInputChange(
                    "method1",
                    "attacks",
                    parseInt(e.target.value),
                  )
                }
              />
              <ValidateInput
                label="Fuses"
                min="0"
                max="15"
                value={values.method1.fuses}
                onChange={(e) =>
                  handleInputChange(
                    "method1",
                    "fuses",
                    parseInt(e.target.value),
                  )
                }
              />
              <ValidateInput
                label="Magic"
                min="0"
                max="1"
                value={values.method1.magic}
                onChange={(e) =>
                  handleInputChange(
                    "method1",
                    "magic",
                    parseInt(e.target.value),
                  )
                }
              />
              <ValidateInput
                label="Trap"
                min="0"
                max="1"
                value={values.method1.trap}
                onChange={(e) =>
                  handleInputChange("method1", "trap", parseInt(e.target.value))
                }
              />
              <ValidateInput
                label="Equip"
                min="0"
                max="1"
                value={values.method1.equip}
                onChange={(e) =>
                  handleInputChange(
                    "method1",
                    "equip",
                    parseInt(e.target.value),
                  )
                }
              />
              <ValidateInput
                label="Face Down"
                min="0"
                max="1"
                value={values.method1.faceDown}
                onChange={(e) =>
                  handleInputChange(
                    "method1",
                    "faceDown",
                    parseInt(e.target.value),
                  )
                }
              />
            </InputGroup>
            <InputGroup className="mt-3">
              <InputGroup.Text>Life Points &lt; 7000</InputGroup.Text>
              <InputGroup.Checkbox
                onChange={(e) =>
                  handleInputChange("method1", "lifePoints", e.target.checked)
                }
                checked={values.method1.lifePoints}
                className="me-3"
              />
              <InputGroup.Text>Cards Remaining &lt; 4</InputGroup.Text>
              <InputGroup.Checkbox
                onChange={(e) =>
                  handleInputChange(
                    "method1",
                    "cardsRemaining",
                    e.target.checked,
                  )
                }
                checked={values.method1.cardsRemaining}
                className="me-3"
              />
              <InputGroup.Text>9+ Turns Passed</InputGroup.Text>
              <InputGroup.Checkbox
                onChange={(e) =>
                  handleInputChange("method1", "turnsPassed", e.target.checked)
                }
                checked={values.method1.turnsPassed}
                className="me-3"
              />
              <Button
                style={{ marginLeft: "auto" }}
                className="rounded-start"
                variant="danger"
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to reset Method 1?",
                  );
                  if (confirmed) {
                    handleFormReset("method1");
                  }
                }}
              >
                Reset Method 1
              </Button>
            </InputGroup>
          </Form>
        </Container>
        <hr />
        <Container>
          {/* Method 2 Form */}
          <Form>
            <h4>Method 2 (4 Magics) </h4>
            <InputGroup>
              <ValidateInput
                label="Fuses"
                min="0"
                max="15"
                value={values.method2.fuses}
                onChange={(e) =>
                  handleInputChange(
                    "method2",
                    "fuses",
                    parseInt(e.target.value),
                  )
                }
              />
              <ValidateInput
                label="Magic"
                min="0"
                max="4"
                value={values.method2.magic}
                onChange={(e) =>
                  handleInputChange(
                    "method2",
                    "magic",
                    parseInt(e.target.value),
                  )
                }
              />
              <ValidateInput
                label="Trap"
                min="0"
                max="1"
                value={values.method2.trap}
                onChange={(e) =>
                  handleInputChange("method2", "trap", parseInt(e.target.value))
                }
              />
              <ValidateInput
                label="Face-Down"
                min="0"
                max="1"
                value={values.method2.faceDown}
                onChange={(e) =>
                  handleInputChange(
                    "method2",
                    "faceDown",
                    parseInt(e.target.value),
                  )
                }
              />
            </InputGroup>
            <InputGroup className="mt-3">
              <InputGroup.Text>Life Points &lt; 7000</InputGroup.Text>
              <InputGroup.Checkbox
                onChange={(e) =>
                  handleInputChange("method2", "lifePoints", e.target.checked)
                }
                checked={values.method2.lifePoints}
                className="me-3"
              />
              <InputGroup.Text>Cards Remaining &lt; 4</InputGroup.Text>
              <InputGroup.Checkbox
                onChange={(e) =>
                  handleInputChange(
                    "method2",
                    "cardsRemaining",
                    e.target.checked,
                  )
                }
                checked={values.method2.cardsRemaining}
                className="me-3"
              />
              <InputGroup.Text>9+ Turns Passed</InputGroup.Text>
              <InputGroup.Checkbox
                onChange={(e) =>
                  handleInputChange("method2", "turnsPassed", e.target.checked)
                }
                checked={values.method2.turnsPassed}
                className="me-3"
              />
              <Button
                style={{ marginLeft: "auto" }}
                className="rounded-start"
                variant="danger"
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to reset Method 2?",
                  );
                  if (confirmed) {
                    handleFormReset("method2");
                  }
                }}
              >
                Reset Method 2
              </Button>
            </InputGroup>
          </Form>
        </Container>
        <hr />
        <Container>
          {/* Method 3 Form*/}
          <Form>
            <h4>Method 3 (5 Equips, Fastest Method) </h4>
            <InputGroup>
              <ValidateInput
                label="Fuses"
                min="0"
                max="15"
                value={values.method3.fuses}
                onChange={(e) =>
                  handleInputChange(
                    "method3",
                    "fuses",
                    parseInt(e.target.value),
                  )
                }
              />
              <ValidateInput
                label="Magic"
                min="0"
                max="1"
                value={values.method3.magic}
                onChange={(e) =>
                  handleInputChange(
                    "method3",
                    "magic",
                    parseInt(e.target.value),
                  )
                }
              />
              <ValidateInput
                label="Trap"
                min="0"
                max="1"
                value={values.method3.trap}
                onChange={(e) =>
                  handleInputChange("method3", "trap", parseInt(e.target.value))
                }
              />
              <ValidateInput
                label="Equips"
                min="0"
                max="5"
                value={values.method3.equips}
                onChange={(e) =>
                  handleInputChange(
                    "method3",
                    "equips",
                    parseInt(e.target.value),
                  )
                }
              />
              <ValidateInput
                label="Face-Down"
                min="0"
                max="1"
                value={values.method3.faceDown}
                onChange={(e) =>
                  handleInputChange(
                    "method3",
                    "faceDown",
                    parseInt(e.target.value),
                  )
                }
              />
            </InputGroup>
            <InputGroup className="mt-3">
              <InputGroup.Text>Life Points &lt; 7000</InputGroup.Text>
              <InputGroup.Checkbox
                onChange={(e) =>
                  handleInputChange("method3", "lifePoints", e.target.checked)
                }
                checked={values.method3.lifePoints}
                className="me-3"
              />
              <InputGroup.Text>Cards Remaining &lt; 4</InputGroup.Text>
              <InputGroup.Checkbox
                onChange={(e) =>
                  handleInputChange(
                    "method3",
                    "cardsRemaining",
                    e.target.checked,
                  )
                }
                checked={values.method3.cardsRemaining}
                className="me-3"
              />
              <InputGroup.Text>9+ Turns Passed</InputGroup.Text>
              <InputGroup.Checkbox
                onChange={(e) =>
                  handleInputChange("method3", "turnsPassed", e.target.checked)
                }
                checked={values.method3.turnsPassed}
                className="me-3"
              />
              <Button
                style={{ marginLeft: "auto" }}
                className="rounded-start"
                variant="danger"
                onClick={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to reset Method 3?",
                  );
                  if (confirmed) {
                    handleFormReset("method3");
                  }
                }}
              >
                Reset Method 3
              </Button>
            </InputGroup>
          </Form>
        </Container>
        <hr />
      </div>
    </>
  );
}

export { YFMDuelCommonStratsApp };
