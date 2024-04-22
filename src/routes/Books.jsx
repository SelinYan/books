import { useEffect, useState } from "react";
// import axios from "axios";
import useAxios from "axios-hooks";
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
} from "@mui/material";

function Books() {
  // const [books, setBooks] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  //'axios-hooks' library, designed to make Axios requests simpler with built-in state management for loading, response, and error
  const [{ data: books, loading, error }] = useAxios(
    "http://localhost:3000/books"
  );
  //loading, a boolean that indicates whether the request is in progress
  //error, an object that stores any error that occurs

  useEffect(() => {
    if (error) {
      console.error("Error fetching books:", error);
    }
  }, [error]);

  // useEffect(() => {
  //   if (books.length === 0) {
  //     getBooks();
  //   }
  // }, []);

  // TODO: Replace axios with useAxios hook
  // async function getBooks() {
  //   try {
  //     const response = await axios.get("http://localhost:3000/books");
  //     setBooks(response.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // TODO: Implement search functionality
  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Stack
            sx={{ justifyContent: "space-around" }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap">
            {books.map((book) => (
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "15%",
                  minWidth: 200,
                }}
                key={book.name}>
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    mt: "auto",
                    pl: 2,
                  }}>
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
