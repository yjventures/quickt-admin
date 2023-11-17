import { Box } from '@mui/material'
import { light } from '@mui/material/styles/createPalette';
import React from 'react'
import PathName from '../../components/PathName/PathName';
import ExportButton from '../../components/ExportButton/ExportButton';
import PrintButton from '../../components/PrintButton/PrintButton';
import searchIcon from '../../assets/img/country/search.svg'
import filterIcon from '../../assets/img/country/filter.svg'
import CreateNewButton from '../../components/CreateNewButton/CreateNewButton';
import CountriesMainContent from '../../components/Country/CountriesMainContent';

const Country = () => {
  const path = window.location.pathname.split('/')[2].toUpperCase();
  return (
    <Box sx={{ height: '100vh', px: 3, overflow: 'scroll' }}>
      {/* pathname */}
      <PathName path={path} />
      {/* searchbar and other buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <img src={searchIcon} alt="searchIcon" style={{
            height: '15px',
            width: '15px',
            position: 'absolute',
            top: '13px',
            left: '15px',
            color: '#ccc'
          }} />
          <input type="text" placeholder="Search" style={{
            height: '40px',
            width: '500px',
            borderRadius: '25px',
            border: '1px solid #E9E9EA',
            color: '#1D1929',
            outline: 'none',
            padding: '0 45px'
          }} />
          {/* filter icon */}
          <img src={filterIcon}
            onClick={() => alert('Show filtering popup')}
            alt="filter-icon" style={{
              height: '15px',
              width: '15px',
              position: 'absolute',
              top: '13px',
              right: '35px',
              color: '#ccc',
              cursor: 'pointer'
            }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ExportButton />
          <span style={{ marginLeft: '10px' }}></span>
          <PrintButton />
          <span style={{ marginLeft: '10px' }}></span>
          <CreateNewButton text={"Country"} />
        </Box>
      </Box>

      {/* main contents */}
      <CountriesMainContent />
    </Box>
  )
}

export default Country