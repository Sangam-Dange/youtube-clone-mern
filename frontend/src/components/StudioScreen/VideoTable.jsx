import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import "./VideoTable.scss";
import { MdOutlineModeEditOutline } from "react-icons/md";

import {
  AiOutlineDownload,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineShareAlt,
  AiOutlineYoutube,
} from "react-icons/ai";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#282828",
    color: "#a7a497",

    "&:hover": {
      // color: "blue !important"
    },
  },
  [`&.${tableCellClasses.body}`]: {
    // backgroundColor: "#282828",
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    // border: 0,
  },
}));

function createData(
  video,
  desc,
  visibility,
  restrictions,
  date,
  views,
  comments,
  likes
) {
  return {
    video,
    desc,
    visibility,
    restrictions,
    date,
    views,
    comments,
    likes,
  };
}

const rows = [
  createData(
    "Pasoori new song",
    "jwbdja jw dajw awj wjd endekj jedje jie jie joaijde aio j jaioej ie iocenonoiceni aejieij ioajoncnan ea joejiofejfioeh faeu egyfehih n",
    "Private",
    "Made for Kids",
    "21 Jan 2023",
    0,
    0,
    "-"
  ),
  createData(
    "Pasoori news song",
    "jwbdja jw dajw awj wjd ",
    "Public",
    "Made for Kids",
    "21 Jan 2023",
    0,
    0,
    "-"
  ),
  // createData(
  //   "Pasoori newc song",
  //   "Private",
  //   "Made for Kids",
  //   "21 Jan 2023",
  //   0,
  //   0,
  //   "-"
  // ),
  // createData(
  //   "Pasoori newa song",
  //   "Private",
  //   "Made for Kids",
  //   "21 Jan 2023",
  //   0,
  //   0,
  //   "-"
  // ),
  // createData(
  //   "Pasoori newsx song",
  //   "Private",
  //   "Made for Kids",
  //   "21 Jan 2023",
  //   0,
  //   0,
  //   "-"
  // ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "video",
    numeric: false,
    disablePadding: true,
    label: "Video",
    align: "left",
  },
  {
    id: "visibility",
    numeric: false,
    disablePadding: false,
    label: "Visibility",
    align: "right",
  },
  {
    id: "restrictions",
    numeric: false,
    disablePadding: false,
    label: "Restrictions",
    align: "right",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
    align: "right",
  },
  {
    id: "views",
    numeric: true,
    disablePadding: false,
    label: "Views",
    align: "right",
  },
  {
    id: "comments",
    numeric: true,
    disablePadding: false,
    label: "Comments",
    align: "right",
  },
  {
    id: "likes",
    numeric: true,
    disablePadding: false,
    label: "Likes",
    align: "right",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Videos
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.video);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, video) => {
    const selectedIndex = selected.indexOf(video);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, video);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (video) => selected.indexOf(video) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer sx={{ maxHeight: "530px" }}>
        <Table
          sx={{
            minWidth: 750,
          }}
          stickyHeader
          aria-labelledby="sticky table"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />

          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.video);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover={true}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.video}
                    selected={isItemSelected}
                  >
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.video)}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="left"
                    >
                      <div className="video__div">
                        <div className="video__thumbnail">
                          <img
                            src="https://images.unsplash.com/photo-1540829016269-e05670f88adb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80"
                            alt="pic"
                          />
                          <p>00:58</p>
                        </div>
                        <div className="video__desc">
                          <h4>{row.video}</h4>
                          <p>
                            {row.desc.length > 50
                              ? row.desc.slice(0, 50) + "..."
                              : row.desc}
                          </p>
                          <div>
                            <Tooltip title="Details">
                              <IconButton>
                                <MdOutlineModeEditOutline
                                  size={"20px"}
                                  color={"grey"}
                                  className="row__tab__icons"
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View on YouTube">
                              <IconButton>
                                <AiOutlineYoutube
                                  size={"20px"}
                                  color={"grey"}
                                  className="row__tab__icons"
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Download">
                              <IconButton>
                                <AiOutlineDownload
                                  size={"20px"}
                                  color={"grey"}
                                  className="row__tab__icons"
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Share">
                              <IconButton>
                                <AiOutlineShareAlt
                                  size={"20px"}
                                  color={"grey"}
                                  className="row__tab__icons"
                                />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <div className="visibility">
                        {row.visibility === "Private" ? (
                          <AiOutlineEyeInvisible className="vis__icon" />
                        ) : (
                          <AiOutlineEye className="vis__icon" />
                        )}
                        {row.visibility}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.restrictions}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.date}</StyledTableCell>
                    <StyledTableCell align="right">{row.views}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.comments}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.likes}</StyledTableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow>
                <StyledTableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ color: "#a7a497" }}
      />
    </>
  );
}
