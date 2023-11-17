import React from 'react'
import exportIcon from '../../assets/img/country/export.svg'

const ExportButton = () => {
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
            Export
            <img src={exportIcon} alt="export" style={{ marginLeft: '5px'}} />
        </button >
    )
}

export default ExportButton