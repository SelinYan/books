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
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

// TODO: Implement search functionality
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: "1px solid gray",
  "&:hover, &:focus-within": {
    borderColor: theme.palette.primary.main,
  },
  margin: theme.spacing(2, 0),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

function Books() {
  // const [books, setBooks] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  //'axios-hooks' library, designed to make Axios requests simpler with built-in state management for loading, response, and error
  const [{ data: books, loading, error }] = useAxios(
    "http://localhost:3000/books"
  );
  //loading, a boolean that indicates whether the request is in progress
  //error, an object that stores any error that occurs

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  // console.log(searchQuery);
  console.log(filteredBooks);

  useEffect(() => {
    if (books) {
      const filtered = books.filter(
        (book) =>
          book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (book.genres &&
            book.genres.some((genre) =>
              genre.toLowerCase().includes(searchQuery.toLowerCase())
            ))
      );
      setFilteredBooks(filtered);
    }
  }, [books, searchQuery]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching books:", error);
    }
  }, [error]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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

  return (
    <Box
      sx={{
        mx: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search book…"
          inputProps={{ "aria-label": "search" }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Search>
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
            {filteredBooks.map((book) => (
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
