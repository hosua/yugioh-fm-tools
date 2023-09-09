// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { YFMDuelCommonStratsApp } from './YFMDuelCommonStrats.jsx';
import { YFMDuelCalcApp } from './YFMDuelCalc.jsx';
import { YFMDatabaseCardList } from './YFMDatabase.jsx';
import { YFMDatabaseCardDrops } from './YFMDatabase.jsx';
import { YFMNavbar } from './YFMNavbar.jsx';
import { YFMGuardianStarChart } from './YFMGuardianStars.jsx';

function App() {
  return (
    <>
      <div className="yfmc-body">
        <HashRouter>
          <YFMNavbar />
          <Routes>
            <Route path="yugioh-fm-tools/duel-common-strats" element={<YFMDuelCommonStratsApp />} />
            <Route path="yugioh-fm-tools/duel-calculator" element={<YFMDuelCalcApp />} />
            <Route path="yugioh-fm-tools/database/card-list" element={<YFMDatabaseCardList />} />
            <Route path="yugioh-fm-tools/database/card-drops" element={<YFMDatabaseCardDrops />} />
            <Route path="yugioh-fm-tools/guardian-star" element={<YFMGuardianStarChart />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
