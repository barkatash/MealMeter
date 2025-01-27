import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
Box,
  TablePagination,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
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

const MealValues = ({ selectedPortion }) => {
  const { id } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [fbValues, setFbValues] = useState([[]]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchFbValues = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/fb/values/${id}`,
          {
            params: { id: id, weight: selectedPortion !== "" ? selectedPortion : 100 },
          }
        );
        setFbValues(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };
    if (id) {
      fetchFbValues();
    }
  }, [id, apiUrl, selectedPortion]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = fbValues
    .filter((value) => Math.round(value[1]) > 0)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    
      <Box>
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nutrient</StyledTableCell>
              <StyledTableCell align="right">Value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((value) => (
              <StyledTableRow key={value[0]}>
                <StyledTableCell component="th" scope="row">
                  {value[0]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {Math.round(value[1])} {value[2]}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={fbValues.filter((value) => Math.round(value[1]) > 0).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: 'white',
          borderTop: `1px solid ${theme => theme.palette.divider}`,
        }}
      />
    </Box>
  );
};

export default MealValues;
