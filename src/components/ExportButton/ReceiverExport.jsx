export const ReceiverExport = ({ data }) => {
    const downloadCSV = () => {
        // Convert data to CSV string
        const csvContent = [
            ['id', 'First Name', 'Last Name', 'Phone', 'Address', 'Details Name', 'Created At']
        ].concat(
            data.map(item => [
                item.id,
                item.firstName,
                item.lastName,
                item.phone,
                item.address,
                item.details.name,
                item.createdAt
            ])
        );

        // Create a CSV string
        const csvString = csvContent.map(row => row.join(',')).join('\n');

        // Create a Blob containing the CSV data
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

        // Create a download link and trigger a click to download the file
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'receiver_data.csv');
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={downloadCSV}
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
            Export
        </button>
    );
};