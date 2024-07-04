import React from 'react';

const RevenueExport = ({ allData, completedData, pendingData, flaggedData }) => {
    const [showMenu, setShowMenu] = React.useState(false);

    const downloadCSV = (data) => {
        console.log(data);

        // Convert data to CSV string
        const csvContent = [
            ['id', 'senderName', 'receiverName', 'phone', 'BaseAmount', 'TotalAmount', 'TransactionFees', 'GatewayFees', 'convertedAmount', 'Date', 'Currency', 'payoutStatus', 'transferStatus', 'transactionNumber', 'createdAt', 'flag']
        ].concat(
            data.map(transaction => [
                transaction.id,
                transaction.senders.name,
                transaction.receiverName,
                transaction.phone,
                transaction.BaseAmount,
                transaction.Totalamount,
                transaction.TransactionFees,
                transaction.GatewayFees,
                transaction.convertedAmount,
                new Date(transaction.Date).toISOString(),
                transaction.Currency,
                transaction.payoutStatus ? 'true' : 'false',
                transaction.transferStatus,
                transaction.transactionNumber,
                new Date(transaction.createdAt).toISOString(),
                transaction.flag ? 'true' : 'false'
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
        link.setAttribute('download', 'transaction_data.csv');
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };




    return (
        <div
            onClick={(e) => {
                setShowMenu(false)
            }}
            style={{
                position: "relative",
            }}>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu(!showMenu)
                }}
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
            {
                showMenu && <div style={{
                    position: "absolute",
                    top: "50px",
                    right: "0",
                    backgroundColor: "#fff",
                    width: "195px",
                    border: "1px solid #E9E9EA",
                    borderRadius: "5px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    zIndex: 1
                }}>
                    <p
                        onClick={() => downloadCSV(allData)}
                        style={{
                            padding: "10px",
                            cursor: "pointer",
                            backgroundColor: "#F5F5F5",
                        }}
                    >
                        Export all data
                    </p>
                    <p
                        onClick={() => downloadCSV(completedData)}
                        style={{
                            padding: "10px",
                            cursor: "pointer",
                            backgroundColor: "#F5F5F5",
                        }}
                    >
                        Export completed data
                    </p>
                    <p
                        onClick={() => downloadCSV(pendingData)}
                        style={{
                            padding: "10px",
                            cursor: "pointer",
                            backgroundColor: "#F5F5F5",
                        }}
                    >
                        Export pending data
                    </p>
                    <p
                        onClick={() => downloadCSV(flaggedData)}
                        style={{
                            padding: "10px",
                            cursor: "pointer",
                            backgroundColor: "#F5F5F5",
                        }}
                    >
                        Export falgged data
                    </p>
                </div>
            }
        </div>

    );
};

export default RevenueExport;
