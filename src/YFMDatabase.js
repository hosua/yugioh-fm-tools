import { Button, Table, Container, FloatingLabel, Form } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './YFM.css'

/* Parameters for BootstrapTable
 * header="your header"
 * subheader="your subheader" (optional)
 * data={your_data}
 * post='yugioh-fm-tools/api/fetch-db'
 */
function BootstrapTable(props) {
    const [data, setData] = useState([]); // data of the table
    const [filteredData, setFilteredData] = useState([]); // the filtered table
    const [dataFilter, setDataFilter] = useState(''); // string to filter by
    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState('asc');


    // Since re-rendering the table every onChange event is slow, we want to add
    // a delay from when the user stops typing before the render should occur.
    useEffect(() => {
        // Define a timer to delay filtering
        let timeoutId;

        // Function to update filtered data after a delay
        const updateFilteredData = () => {
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
        };

        // Clear previous timeout (if any) and start a new one
        clearTimeout(timeoutId);
        timeoutId = setTimeout(updateFilteredData, 250); // delay (in ms)

        // Clean up the timeout on unmount
        return () => clearTimeout(timeoutId);
    }, [dataFilter, data]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(props.post, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });

                if (response.ok) {
                    const fetched_data = await response.json();
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
    const columnHeaders = Object.keys(data[0]);
    const tableHeaders = columnHeaders.map((col) => (
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

    const tableRows = sortedData.map((entry, index) => (
        <tr key={index}>
            {columnHeaders.map((key) => (
                <td key={key}>{entry[key]}</td>
            ))}
        </tr>
    ));

    return (
        <>
            <h1>{props.header}</h1>
            <hr />
            <h2>{props.subheader}</h2>
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


function YFMDatabase() {
    return (
        <>
            <BootstrapTable
                header="Yu-Gi-Oh Forbidden Memories Database"
                subheader="Cards Table"
                post='yugioh-fm-tools/api/fetch-db'
                filterButtons=''
            />
        </>
    );
}

export { YFMDatabase };