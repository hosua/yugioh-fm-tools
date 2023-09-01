import logo from './logo.svg';
import './App.css';

import { Row, Col, Button, FloatingLabel, InputGroup, Form, Container } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function YFMDuelCalc() {
  const initValues = {
    effectiveAttacks: 0,
    defensiveWins: 0,
    fusions: 0,
    magics: 0,
    traps: 0,
    equips: 0,
    faceDowns: 0,
    lifePoints: 8000,
    cardsRemaining: 40,
    turnsPassed: 0,
  };

  const [values, setValues] = useState({
    effectiveAttacks: 0,
    defensiveWins: 0,
    fusions: 0,
    magics: 0,
    traps: 0,
    equips: 0,
    faceDowns: 0,
    lifePoints: 8000,
    cardsRemaining: 40,
    turnsPassed: 0,
  });


  const [totalPts, setTotalPts] = useState(0);

  function calcTotalPts() {
    let totalPoints = 0;
    Object.keys(values).forEach(key => {
      totalPoints += calcPts(key);
    });
    return totalPoints;
  }

  const handleInputChange = (key, newValue) => {
    newValue = Math.min(Math.max(0, newValue), 8000);
    setValues((prevValues) => ({
      ...prevValues,
      [key]: newValue,
    }));
    setTotalPts(calcTotalPts());

  };

  const handleReset = () => {
    const resetConfirmed = window.confirm('Are you sure you want to reset?');
    if (resetConfirmed) {
      setValues(initValues);
    }
  };

  useEffect(() => {
    setTotalPts(calcTotalPts());
    // Confirmation dialog when the user tries to refresh the page
    const handleBeforeUnload = (e) => {
      if (Object.values(values).some(value => value !== 0)) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    // Attach the event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [values]); // Empty dependency array to run it once after mounting

  function calcPts(key) {
    var pts = 0;
    switch (key) {
      case 'turnsPassed':
        var turnsPassed = values[key];
        if (turnsPassed <= 4) pts = +12;
        else if (turnsPassed <= 8) pts = +8;
        else if (turnsPassed <= 28) pts = 0;
        else if (turnsPassed <= 32) pts = -8;
        else pts = -12;
        break;

      case 'effectiveAttacks':
        var effectiveAttacks = values[key];
        if (effectiveAttacks <= 1) pts = +4;
        else if (effectiveAttacks <= 3) pts = +2;
        else if (effectiveAttacks <= 9) pts = 0;
        else if (effectiveAttacks <= 19) pts = -2;
        else pts = -4;
        break;


      case 'defensiveWins':
        var defensiveWins = values[key];
        if (defensiveWins <= 1) pts = 0;
        else if (defensiveWins <= 5) pts = -10;
        else if (defensiveWins <= 9) pts = -20;
        else if (defensiveWins <= 14) pts = -30;
        else pts = -40;
        break;


      case 'faceDowns':
        var faceDowns = values[key];
        if (faceDowns === 0) pts = 0;
        else if (faceDowns <= 10) pts = -2;
        else if (faceDowns <= 20) pts = -4;
        else if (faceDowns <= 30) pts = -6;
        else pts = -8;
        break;

      case 'fusions':
        var fusions = values[key];
        if (fusions === 0) pts = +4;
        else if (fusions <= 4) pts = 0;
        else if (fusions <= 9) pts = -4;
        else if (fusions <= 14) pts = -8;
        else pts = -12;
        break;

      case 'equips':
        var equips = values[key];
        if (equips === 0) pts = +4;
        else if (equips <= 4) pts = 0;
        else if (equips <= 9) pts = -4;
        else if (equips <= 14) pts = -8;
        else pts = -12;
        break;

      case 'magics':
        var magics = values[key];
        if (magics === 0) pts = 2;
        else if (magics <= 3) pts = -4;
        else if (magics <= 6) pts = -8;
        else if (magics <= 9) pts = -12;
        else pts = -16;
        break;

      case 'traps':
        var traps = values[key];
        if (traps === 0) pts = 2;
        else if (traps <= 2) pts = -8;
        else if (traps <= 4) pts = -16;
        else if (traps <= 6) pts = -24;
        else pts = -32;
        break;

      case 'cardsRemaining':
        var cardsUsed = 40 - values[key];
        if (cardsUsed <= 8) pts = 15;
        else if (cardsUsed <= 12) pts = 12;
        else if (cardsUsed <= 32) pts = 0;
        else if (cardsUsed <= 36) pts = -5;
        else pts = -7;
        break;

      case 'lifePoints':
        var lifePoints = values[key];
        if (lifePoints >= 8000) pts = +6;
        else if (lifePoints >= 7000) pts = +4;
        else if (lifePoints >= 1000) pts = 0;
        else if (lifePoints >= 100) pts = -5;
        else pts = -7;
        break;

      default:
        console.log(`Unknown key ${key}`);
        break;
    }
    return pts;
  }

  function calcGrade() {
    var actualTotalPts = 50 + totalPts;
    console.log(`actual total pts: ${actualTotalPts}`)
    if (actualTotalPts >= 90) return "S-POW";
    else if (actualTotalPts >= 80) return "A-POW";
    else if (actualTotalPts >= 70) return "B-POW";
    else if (actualTotalPts >= 60) return "C-POW";
    else if (actualTotalPts >= 50) return "D-POW";
    else if (actualTotalPts >= 40) return "D-TEC";
    else if (actualTotalPts >= 30) return "C-TEC";
    else if (actualTotalPts >= 20) return "B-TEC";
    else if (actualTotalPts >= 10) return "A-TEC";
    else return "S-TEC";
  }

  function InputElement({ label, value, id, onChange, isValid }) {
    const handleDecrement = () => {
      const newValue = Math.max(0, value - 1);
      onChange(id, newValue);
    };

    const handleIncrement = () => {
      const newValue = value + 1;
      onChange(id, newValue);
    };
    return (
      <>
        <Button variant="secondary" onClick={handleDecrement}>-</Button>
        <FloatingLabel label={`${label}`}>
          <Form.Control
            style={{ height: '75px' }}
            type="number"
            min="0"
            value={value}
            onChange={(e) => onChange(id, parseInt(e.target.value))}
            readOnly
            isValid={isValid}
          />
        </FloatingLabel>
        <Button variant="secondary" onClick={handleIncrement}>+</Button>
        <InputGroup.Text style={{ width: '13%', paddingRight: '40px' }}>{
          (calcPts(id) < 0) ? ("−" + ('0000' + Math.abs(calcPts(id))).slice(-2)) : "+" + (('00' + calcPts(id)).slice(-2))
        }</InputGroup.Text>
      </>
    );
  }

  function LifePointsElement({ label, value, id, onChange, isValid }) {
    const lifePointIntervalsNeg = [
      { label: '-10', value: -10 },
      { label: '-50', value: -50 },
      { label: '-100', value: -100 },
      { label: '-500', value: -500 },
      { label: '-1000', value: -1000 },
    ]
    const lifePointIntervalsPos = [
      { label: '+10', value: 10 },
      { label: '+50', value: 50 },
      { label: '+100', value: 100 },
      { label: '+500', value: 500 },
      { label: '+1000', value: 1000 },
    ]
    return (
      <>
        <InputGroup>
          {lifePointIntervalsNeg.map(interval => (
            <Col style={{ paddingLeft: '0', paddingRight: '0', display: 'flex', flexDirection: 'column' }}>
              <Button
                key={interval.label}
                variant="outline-danger"
                onClick={() => handleInputChange('lifePoints', values.lifePoints + interval.value)}
              >
                {interval.label}
              </Button>
            </Col>
          ))}
        </InputGroup>
        <InputGroup>
          <FloatingLabel label={`${label}`}>
            <Form.Control
              style={{ height: '75px' }}
              type="number"
              min="0"
              value={value}
              onChange={(e) => onChange(id, parseInt(e.target.value))}
              readOnly
              isValid={isValid}
            />
          </FloatingLabel >
          <InputGroup.Text style={{ width: '13%', paddingRight: '40px' }}>{
            (calcPts(id) < 0) ? ("−" + ('0000' + Math.abs(calcPts(id))).slice(-2)) : "+" + (('00' + calcPts(id)).slice(-2))
          }</InputGroup.Text>
        </InputGroup>
        <InputGroup>
          {lifePointIntervalsPos.map(interval => (
            <Col style={{ paddingLeft: '0', paddingRight: '0', display: 'flex', flexDirection: 'column' }}>
              <Button
                key={interval.label}
                variant="outline-success"
                onClick={() => handleInputChange('lifePoints', values.lifePoints + interval.value)}
              >
                {interval.label}
              </Button>
            </Col>
          ))}
        </InputGroup>
      </>
    );
  }

  return (
    <>
      <div className="yfmcalc-body" data-bs-theme="dark">
        <h1 className="mt-3 yfmc-title">Yu-Gi-Oh Forbidden Memories</h1>
        <h2 className="mt-3 yfmc-title">Duel Points Calculator</h2>
        <p className="ms-5 me-5"> This calculator was created based on the information from this <a href="https://www.neoseeker.com/forums/3085/t2018541-calculating-duel-rank/">guide</a>. If there is anything you don't understand, please read it! </p>
        <p className="ms-5 me-5">When you can no longer lose any more points for the given duel statistic, the form will turn green. You should work on your other duel statistics in this case. </p>
        <Container>
          <Row>
            <Col>
              <InputGroup className='yfmcalc-input'>
                <InputGroup.Text>Total Points: </InputGroup.Text>
                <InputGroup.Text>50 + ({(totalPts >= 0) ? "+" + totalPts : totalPts}) = {50 + totalPts} </InputGroup.Text>
                <InputGroup.Text><strong>{calcGrade()}</strong></InputGroup.Text>
              </InputGroup>
            </Col>
            <Col xs="auto" className="ml-auto">
              <InputGroup>
                <Button onClick={handleReset} variant="danger">Reset</Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
        <Container>
          <Form>
            <Row>
              <Col md={6}>
                <InputGroup className="yfmcalc-input">
                  <InputElement
                    label="Turns Passed"
                    id='turnsPassed'
                    value={values.turnsPassed}
                    pts={calcPts('turnsPassed')}
                    onChange={handleInputChange}
                    isValid={values.turnsPassed >= 33}
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <InputGroup className="yfmcalc-input">
                  <InputElement
                    label="Effective Attacks"
                    id='effectiveAttacks'
                    value={values.effectiveAttacks}
                    pts={calcPts('effectiveAttacks')}
                    onChange={handleInputChange}
                    isValid={values.effectiveAttacks >= 20}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <InputGroup className='yfmcalc-input'>
                  <InputElement
                    label="Defense Wins"
                    id='defensiveWins'
                    value={values.defensiveWins}
                    pts={calcPts('defensiveWins')}
                    onChange={handleInputChange}
                    isValid={values.defensiveWins >= 15}
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <InputGroup className='yfmcalc-input'>
                  <InputElement
                    label="Face Downs"
                    id='faceDowns'
                    value={values.faceDowns}
                    pts={calcPts('faceDowns')}
                    onChange={handleInputChange}
                    isValid={values.faceDowns >= 31}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <InputGroup className='yfmcalc-input'>
                  <InputElement
                    label="Fusions"
                    id="fusions"
                    value={values.fusions}
                    pts={calcPts('fusions')}
                    onChange={handleInputChange}
                    isValid={values.fusions >= 15}
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <InputGroup className='yfmcalc-input'>
                  <InputElement
                    label="Equips"
                    id='equips'
                    value={values.equips}
                    pts={calcPts('equips')}
                    onChange={handleInputChange}
                    isValid={values.equips >= 15}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <InputGroup className='yfmcalc-input'>
                  <InputElement
                    label="Magics"
                    id="magics"
                    value={values.magics}
                    pts={calcPts('magics')}
                    onChange={handleInputChange}
                    isValid={values.magics >= 10}
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <InputGroup className='yfmcalc-input'>
                  <InputElement
                    label="Traps"
                    id="traps"
                    value={values.traps}
                    pts={calcPts('traps')}
                    onChange={handleInputChange}
                    isValid={values.traps >= 7}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <InputGroup className='yfmcalc-input'>
                  <InputElement
                    label="Cards Remaining"
                    id="cardsRemaining"
                    value={values.cardsRemaining}
                    pts={calcPts('cardsRemaining')}
                    onChange={handleInputChange}
                    isValid={values.cardsRemaining < 4}
                  />
                </InputGroup>
              </Col>
              <br />
            </Row>
            <LifePointsElement
              style={{ marginLeft: '0px' }}
              label="Life Points Remaining"
              id="lifePoints"
              value={values.lifePoints}
              pts={calcPts('lifePoints')}
              onChange={handleInputChange}
              isValid={values.lifePoints < 100}
            />
            <br />
          </Form>
        </Container>
      </div >
    </>
  );
}

function App() {
  return (
    <>
      <YFMDuelCalc />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    </>
  );
}

export default App;
