import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import imageGrp from '../../assets/img/profile/imageGrp.svg'
import ProfileForm from '../../components/Profile/ProfileForm'
import ProfileData from '../../components/Profile/ProfileData'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import { useQuery } from 'react-query'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { VerticalAlignBottom } from '@mui/icons-material'

const Profile = () => {
  const [searchUser, setSearchUser] = useState('');
  const [userId, setUserId] = useState('64d08e82e45e1b7fe0719f81');
  const [type, setType] = React.useState('name');

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const { isLoading, error, data } = useQuery('allUsers', () =>
    fetch('http://localhost:5000/all-users', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwt')}`
      }
    })
      .then(res => res.json())
  );

  if (isLoading) return 'Loading...';

  if (error) return 'Internal server error: ' + error.message;

  const options = data?.data?.map((option) => {
    const firstLetter = option.email[0].toUpperCase();
    return {
      firstLetter: firstLetter,
      ...option,
    };
  });
  const handleInputChange = (event, value) => {
    const selectedOption = options.find(option => type === 'name' ? option.name === value : option.email === value);
    if (selectedOption) {
      console.log(selectedOption)
      setSearchUser(selectedOption.email);
      setUserId(selectedOption._id)
    }
  };
  return (
    <Box>
      <Box sx={{ height: '30vh', zIndex: -1, background: `linear-gradient(180deg, #3E6EC9 0%, #0D55DF 100%)`, position: 'relative' }}>
        {/* <img
          style={{ position: 'absolute', right: 40, top: 20, cursor: 'pointer' }}
          src={imageGrp}
          alt="change-Image-icon"
        /> */}
      </Box>
      {/* search box */}
      <Select
        sx={{
          position: 'absolute',
          top: '84px',
          right: '5%',
          width: '130px',
          height: '43px',
          background: '#FFFFFF',
          // transform: 'translateX(-50%)',
        }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={type}
        onChange={handleChangeType}
      >
        <MenuItem value={'name'}>Name</MenuItem>
        <MenuItem value={'email'}>Email</MenuItem>
      </Select>
      <Autocomplete
        id="grouped-demo"
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => type === 'name' ? option.name : option.email}
        onInputChange={handleInputChange}
        // inputValue={searchUser}
        sx={{
          width: '88%', margin: '0 auto', background: '#fff', borderRadius: 1, mt: -18, mb: 10,
        }}
        renderInput={(params) => <TextField {...params} placeholder='Search user' />}
      />
      <Grid container spacing={2} style={{ marginTop: "-60px", zIndex: 1, height: "100%" }}>
        {/* <TextField id="outlined-basic" label="Select type" variant="outlined" sx={{ width: '20%', margin: '0 auto', background: '#F1F1F1', borderRadius: '10px', mb: 3, }} /> */}
        <Grid item xs={12} md={5} style={{ display: 'flex', justifyContent: 'center' }}>
          <ProfileForm userId={userId} />
        </Grid>
        <Grid item xs={12} md={7}>
          <ProfileData userId={userId} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Profile