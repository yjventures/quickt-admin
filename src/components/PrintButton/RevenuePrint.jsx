import React from 'react'
import printIcon from '../../assets/img/country/printer.svg'

export const RevenuePrint = ({ allData, completedData, pendingData, flaggedData }) => {
    const [showMenu, setShowMenu] = React.useState(false);

    const printData = (data) => {
        // Create table structure for print
        const tableHeader = `
            <tr>
                <th>id</th>
                <th>Sender name</th>
                <th>Receiver name</th>
                <th>Phone</th>
                <th>Base amount</th>
                <th>Total amount</th>
                <th>QuickT fees</th>
                <th>Gateway fees</th>
                <th>Whish fees</th>
                <th>Converted amount</th>
                <th>Date</th>
                <th>Currency</th>
                <th>Payout status</th>
                <th>Transfer status</th>
                <th>Transaction number</th>
                <th>Created At</th>
                <th>Flag</th>
            </tr>`;

        const tableRows = data.map(transaction => `
            <tr>
                <td>${transaction.id}</td>
                <td>${transaction.senders.name}</td>
                <td>${transaction.receiverName}</td>
                <td>${transaction.phone}</td>
                <td>${transaction.BaseAmount}</td>
                <td>${transaction.Totalamount}</td>
                <td>${transaction.TransactionFees}</td>
                <td>${transaction.GatewayFees}</td>
                <td>${transaction.WhishFees}</td>
                <td>${transaction.convertedAmount}</td>
                <td>${new Date(transaction.Date).toLocaleString()}</td>
                <td>${transaction.Currency}</td>
                <td>${transaction.payoutStatus ? 'true' : 'false'}</td>
                <td>${transaction.transferStatus}</td>
                <td>${transaction.transactionNumber}</td>
                <td>${new Date(transaction.createdAt).toLocaleString()}</td>
                <td>${transaction.flag ? 'true' : 'false'}</td>
            </tr>`).join('');

        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Transaction Data</title></head><body>');
        printWindow.document.write('<table border="1">' + tableHeader + tableRows + '</table>');
        printWindow.document.write('<table border="1">');
        printWindow.document.write('<style>table {border-collapse: collapse; width: 100%;} th, td {text-align: left; padding: 8px;} tr:nth-child(even) {background-color: #f2f2f2;}</style>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
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
                Print
                <img src={printIcon} alt="printIcon" style={{ marginLeft: '5px' }} />
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
                        onClick={() => printData(allData)}
                        style={{
                            padding: "10px",
                            cursor: "pointer",
                            backgroundColor: "#F5F5F5",
                        }}
                    >
                        Print all data
                    </p>
                    <p
                        onClick={() => printData(completedData)}
                        style={{
                            padding: "10px",
                            cursor: "pointer",
                            backgroundColor: "#F5F5F5",
                        }}
                    >
                        Print completed data
                    </p>
                    <p
                        onClick={() => printData(pendingData)}
                        style={{
                            padding: "10px",
                            cursor: "pointer",
                            backgroundColor: "#F5F5F5",
                        }}
                    >
                        Print pending data
                    </p>
                    <p
                        onClick={() => printData(flaggedData)}
                        style={{
                            padding: "10px",
                            cursor: "pointer",
                            backgroundColor: "#F5F5F5",
                        }}
                    >
                        Print flagged data
                    </p>
                </div>
            }
        </div>
    );
};
