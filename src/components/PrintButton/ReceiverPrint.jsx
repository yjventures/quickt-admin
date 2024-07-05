import printIcon from '../../assets/img/country/printer.svg'

export const ReceiverPrint = ({ allData }) => {
    // console.log(allData);

    const printData = (data) => {
        // Create table structure for print
        const tableHeader = `
            <tr>
                <th>id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Associated User</th>
                <th>Created At</th>
            </tr>`;

        const tableRows = data.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.firstName}</td>
                <td>${item.lastName}</td>
                <td>${item.phone}</td>
                <td>${item.address}</td>
                <td>${item.details.name}</td>
                <td>${new Date(item.createdAt).toLocaleString()}</td>
            </tr>`).join('');

        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Receiver Data</title></head><body>');
        printWindow.document.write('<table border="1">' + tableHeader + tableRows + '</table>');
        printWindow.document.write('<style>table {border-collapse: collapse; width: 100%;} th, td {text-align: left; padding: 8px;} tr:nth-child(even) {background-color: #f2f2f2;}</style>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <button
            onClick={() => printData(allData)}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40px',
                width: '100px',
                cursor: 'pointer',
                backgroundColor: '#fff',
                borderRadius: '15px',
                border: '1px solid #E9E9EA',
                color: '#1D1929',
                fontFamily: 'Open Sans',
                fontSize: '14px',
                fontStyle: 'normal',
            }}>
            Print
            <img src={printIcon} alt="printIcon" style={{ marginLeft: '5px' }} />

        </button>
    );
};
