import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  tableCellClasses,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: theme.spacing(2),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const MealIngredients = ({ selectedPortion }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const [fbIngredients, setFbIngredients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchFbIngredients = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/fb/ingredients/${id}`, {
          params: {
            id: id,
            weight: selectedPortion !== "" ? selectedPortion : 100,
          },
        });
        setFbIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    if (id) {
      fetchFbIngredients();
    }
  }, [id, apiUrl, selectedPortion]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = fbIngredients
    .filter((value) => Math.round(value[2]) > 0)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Ingredient</StyledTableCell>
              <StyledTableCell align="right">Weight (g)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((ingredient) => (
              <StyledTableRow key={ingredient[0]}>
                <StyledTableCell component="th" scope="row">
                  {ingredient[1]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {Math.round(ingredient[2])}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={fbIngredients.filter((value) => Math.round(value[2]) > 0).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: "white",
          borderTop: `1px solid ${(theme) => theme.palette.divider}`,
        }}
      />
    </Box>
  );
};

export default MealIngredients;
