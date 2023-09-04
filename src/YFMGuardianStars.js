import React from 'react';
import { ReactComponent as GuardianStarChart } from "./guardian_star_chart.svg";
import './YFM.css';

function YFMGuardianStarChart() {
    return (
        <>
            <h1>Guardian Star Chart</h1>
            <div style={{ textAlign: 'center' }}>
                <GuardianStarChart
                    style={{ width: '80%', height: '80%' }}
                />
            </div>
        </>
    );
}

export { YFMGuardianStarChart };