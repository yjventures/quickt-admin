import React from 'react'
import printIcon from '../../assets/img/country/printer.svg'

const PrintButton = ({ data }) => {
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');

        printWindow.document.write('<html><head><title>User Data</title></head><body>');
        printWindow.document.write('<h1>User Data</h1>');
        printWindow.document.write('<table border="1">');
        printWindow.document.write('<style>table {border-collapse: collapse; width: 100%;} th, td {text-align: left; padding: 8px;} tr:nth-child(even) {background-color: #f2f2f2;}</style>');

        // Header row
        printWindow.document.write('<tr>');
        Object.keys(data[0]).forEach(key => {
            printWindow.document.write(`<th>${key}</th>`);
        });
        printWindow.document.write('</tr>');

        // Data rows
        data.forEach(user => {
            printWindow.document.write('<tr>');
            Object.values(user).forEach(value => {
                printWindow.document.write(`<td>${value}</td>`);
            });
            printWindow.document.write('</tr>');
        });

        printWindow.document.write('</table></body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <button
            onClick={handlePrint}

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
                fontStyle: 'normal'
            }}>
            Print
            <img src={printIcon} alt="printIcon" style={{ marginLeft: '5px' }} />
        </button >
    )
}

export default PrintButton