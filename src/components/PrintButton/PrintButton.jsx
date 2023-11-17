import React from 'react'
import printIcon from '../../assets/img/country/printer.svg'

const PrintButton = () => {
    return (
        <button style={{
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