import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface RentCardProps {
  title: string;
  location: string;
  price: string;
  image: string;
}

const RentCard = ({ title, location, price, image }: RentCardProps) => {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '300px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '3px 3px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px) scale(1.05)',
          boxShadow: '5px 5px 20px rgba(0,0,0,0.3)',
        },
      }}
    >
      <CardMedia
        component='img'
        height='200'
        image={image}
        alt={title}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant='h5' component='h2'>
          {title}
        </Typography>
        <Typography color='text.secondary'>{location}</Typography>
        <Typography variant='h6' color='primary' sx={{ mt: 2 }}>
          {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RentCard;
