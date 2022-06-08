import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

class Copyright extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const properties = this.props;
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...properties}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>
        {' '}
        {new Date().getFullYear()}
        .
      </Typography>
    );
  }
}

export default Copyright;
