import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Root from "./routes/Root";
import Books from "./routes/Books";
import Book from "./routes/Book";
import AddBook from "./routes/AddBook";
import ErrorPage from "./routes/ErrorPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d40",
    },
    secondary: {
      main: "#ffab40",
    },
  },
});

function App() {
  const basename = import.meta.env.DEV ? "/" : "/books/";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Books /> },
        { path: "/book/:bookId", element: <Book /> },
        { path: "/addnew", element: <AddBook /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} basename={basename}></RouterProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
