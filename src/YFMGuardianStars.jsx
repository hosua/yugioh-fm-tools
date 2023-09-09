import './YFM.css';
import { Image } from 'react-bootstrap';


function YFMGuardianStarChart() {
    return (
        <>
            <h1>Guardian Star Chart</h1>
            <div style={{ textAlign: 'center' }}>
                <Image
                    style={{ width: '80%', height: '80%' }}
                    src="guardian_star_chart.svg"
                />
            </div>
        </>
    );
}

export { YFMGuardianStarChart };