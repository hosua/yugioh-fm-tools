import { ButtonGroup, Button, Table, Container, FloatingLabel, Form } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './YFM.css'

/* TODO: Maybe make this its own class in the future if I want to reuse this */
function BootstrapTable(props) {
    const [data, setData] = useState(props.data || []); // data of the table
    const [filteredData, setFilteredData] = useState([]); // the filtered table
    const [dataFilter, setDataFilter] = useState(''); // string to filter by
    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState('asc');
    const [omitCols, setOmitCols] = useState(props.omitted || []);

    // Since re-rendering the table every onChange event is slow, we want to add
    // a delay from when the user stops typing before the render should occur.
    useEffect(() => {
        // Define a timer to delay filtering
        let timeoutId;

        // Function to update filtered data after a delay
        const updateFilteredData = () => {
            if (Array.isArray(data)) {
                setFilteredData(
                    data.filter((dt) =>
                        // Check if any column contains the filter text
                        Object.values(dt).some((val) => {
                            return (val) ?
                                val.toString().toLowerCase().includes(dataFilter.toLowerCase()) :
                                false;
                        })
                    )
                );
            }
        };

        // Clear previous timeout (if any) and start a new one
        clearTimeout(timeoutId);
        timeoutId = setTimeout(updateFilteredData, 250); // delay (in ms)

        // Clean up the timeout on unmount
        return () => clearTimeout(timeoutId);
    }, [dataFilter, data]);

    useEffect(() => {
        setData(props.data)
        setFilteredData(props.data)
    }, [props.data]);

    const handleDataFilter = (filter) => {
        setDataFilter(filter);
    };

    const handleSort = (col) => {
        if (sortCol === col) {
            // Toggle the sort direction
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            // Set a new sort column in ascending direction
            setSortCol(col);
            setSortDir('asc');
        }
    };

    const sortedData = [...filteredData].sort((a, b) => {
        const colA = a[sortCol];
        const colB = b[sortCol];

        // Handle null values
        if (colA === null) {
            return sortDir === 'asc' ? -1 : 1;
        }
        if (colB === null) {
            return sortDir === 'asc' ? 1 : -1;
        }
        // ascending
        if (sortDir === 'asc') {
            return (colA < colB) ? -1 : 1;
        }
        // descending
        return (colA > colB) ? -1 : 1;
    });

    // Render the table headers and rows only when data is available
    const columnHeaders = Object
        .keys(data[0])
        .filter((col) => !omitCols.includes(col));
    const tableHeaders = columnHeaders
        .map((col) => (
            <th key={col}>
                {col}
                <Button
                    variant="link"
                    onClick={() => handleSort(col)}
                    style={{ width: '20px' }}
                >
                    {sortCol === col ? (
                        // The active col
                        <i className={`fa fa-sort-${sortDir === 'asc' ? 'up' : 'down'}`}></i>
                    ) : (
                        // The inactive col
                        <i className={`sort-button fa fa-sort`}></i>
                    )
                    }
                </Button>
            </th >
        ));

    const tableRows = sortedData
        .map((entry, index) => (
            <tr key={index}>
                {columnHeaders.map((key) => (
                    <td key={key}>{entry[key]}</td>
                ))}
            </tr>
        ));

    return (
        <>
            <h2>{props.header}</h2>
            <Container data-bs-theme="dark">
                <FloatingLabel label="Search">
                    <Form.Control
                        style={{ width: '200px' }}
                        type="text"
                        value={dataFilter}
                        onChange={(e) => handleDataFilter(e.target.value)}
                    />
                </FloatingLabel>
                <Table striped bordered hover data-bs-theme="dark">
                    <thead>
                        <tr>
                            {tableHeaders}
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </Table>
            </Container >
        </>
    );
}

function YFMDatabaseCardList() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('yugioh-fm-tools/api/fetch-card-list', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });

                if (response.ok) {
                    const fetched_data = await response.json();
                    console.log(`card list data: ${JSON.stringify(fetched_data)}`)
                    setData(fetched_data)
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();

    }, []); // Empty dependency array to run the effect only once after the initial render

    // Fail-safe: Show a loading message or component when data is not loaded
    if (data.length === 0) {
        return <p>Loading data...</p>;
    }

    return (
        <>
            <BootstrapTable
                header="Card List Database"
                data={data}
            />
        </>
    );
}

function YFMDatabaseCardDrops() {
    const [duelists, setDuelists] = useState([]);
    const [data, setData] = useState([]);
    const [selectedDuelist, setSelectedDuelist] = useState('');
    const [dataTable, setDataTable] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('yugioh-fm-tools/api/fetch-duelists', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });

                if (response.ok) {
                    const fetched_duelists = await response.json();
                    setDuelists(fetched_duelists)
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []); // Empty dependency array to run the effect only once after the initial render


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('yugioh-fm-tools/api/fetch-card-drops', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        queryFilter: selectedDuelist,
                    }),
                });

                if (response.ok) {
                    const fetched_data = await response.json();
                    console.log(`card drops data: ${JSON.stringify(fetched_data)}`)
                    setData(fetched_data)
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        if (selectedDuelist) {
            fetchData();
        }

    }, [selectedDuelist]);
    // NOTE: Very important to understand here: putting selectedDuelist here
    // means that this useEffect() will occur when selectedDuelist is changed! 

    const handleDuelistSelect = (duelist) => {
        console.log(`Selected Duelist: ${duelist}`)
        setSelectedDuelist(duelist);
    };

    // Fail-safe: Show a loading message or component when data is not loaded
    if (duelists.length === 0) {
        return <p>Loading database... if this is taking too long, the database may be down. Sorry about that! </p>;
    }

    return (
        <>
            <Container data-bs-theme="dark">
                <h1>Card Drops Database</h1>
                <h2>Select a Duelist</h2>
                <ButtonGroup className="d-flex flex-wrap">
                    {duelists.map((entry, index) => (
                        <Button
                            key={index}
                            variant="outline-light"
                            style={{ borderRadius: '0' }}
                            onClick={() => handleDuelistSelect(entry.Name)}
                        >
                            {entry.Name}
                        </Button>
                    ))}
                </ButtonGroup>
            </Container>
            <br />
            <br />
            {data.length === 0 ? (
                null
            ) : (
                <BootstrapTable
                    header={selectedDuelist}
                    data={data}
                    omitted={['ID', 'Duelist']}
                />
            )}
        </>
    );
}

export { YFMDatabaseCardList, YFMDatabaseCardDrops };