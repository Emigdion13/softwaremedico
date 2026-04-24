import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackButton({ label = 'Volver', variant = 'outlined', sx = {} }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Try to go back, if history is empty go to home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <Button
      variant={variant}
      startIcon={<ArrowBackIcon />}
      onClick={handleClick}
      sx={{ borderRadius: '12px', ...sx }}
    >
      {label}
    </Button>
  );
}

export default BackButton;
