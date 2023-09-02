import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { YFMDuelCommonStratsApp } from './YFMDuelCommonStrats.js';
import { YFMDuelCalcApp } from './YFMDuelCalc.js';
import { YFMDatabase } from './YFMDatabase.js';
import { YFMNavbar } from './YFMNavbar.js'

function App() {
  return (
    <>
      <div className="yfmc-body">
        <HashRouter>
          <YFMNavbar />
          <Routes>
            <Route path="yugioh-fm-tools/duel-common-strats" element={<YFMDuelCommonStratsApp />} />
            <Route path="yugioh-fm-tools/duel-calculator" element={<YFMDuelCalcApp />} />
            <Route path="yugioh-fm-tools/database/cards" element={<YFMDatabase />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
