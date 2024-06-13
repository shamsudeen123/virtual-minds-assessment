"use client";
import { tableRowdata } from "@/constants/table";
import CustomTable from "@/molecules/CustomTable";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import CustomeSnackbar from "@/molecules/CustomeSnackbar";
import { BASE_URL } from "@/constants/config";

function CustomerListing() {
  const [employeeList, setEmployeeList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSnackbar, setSnackbar] = useState(false);

  useEffect(() => {
    // on mount emp list api will called
    getEmployeeList();
  }, [pageNumber]);

  // function for handling edit feature
  const handleEditClick = (row) => {
      window.location.href =
        "/add-customer?firstName=" +
        row.firstName +
        "&lastName=" +
        row.lastName +
        "&address=" +
        row.address +
        "&designation=" +
        row.designation +
        "&id=" +
        row.id;
  };

  // function for handling delete feature
  const handleDeleteClick = (id) => {
      setLoading(true);
      // api call for delete an employee from list
      axios({
        method: "delete",
        url: BASE_URL + "/api/delete-customer/" + id,
      })
        .then((response) => {
          // popup toast on success
          setSnackbar(true);
          setMessage("Successfully deleted employee!");
          setLoading(false);
          if (response) getEmployeeList(); // once after delete success emp list api will be called
        })
        .catch(() => {
          // popup toast on failure
          setSnackbar(true);
          setMessage("Something went wrong!");
        });
  };

  const getEmployeeList = () => {
    setLoading(true);
    // api for emp list view
    axios({
      method: "get",
      url: BASE_URL + "/api/customer-list?page=" + pageNumber,
    }).then((response) => {
      setLoading(false);
      if (response.status === 200) setEmployeeList(response.data); // setting response to local state
    });
  };

  const handlePageChange = (event, page) => {
    setPageNumber(page); // setting pagination page value
  };

  const handleLogout = () => {
    localStorage.clear(); // will clear entire local storage items
    window.location.href = "/auth/sign-in"; // once after clearing will redirect to sign in page
  };

  return (
    <Grid
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        padding: 4,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
          Customer listview
        </Typography>
        <Box>
            <Link href="/add-customer">
              <Button variant="contained" color="primary" sx={{ ml: 2 }}>
                Add Customer
              </Button>
            </Link>
        </Box>
      </Box>
      {isLoading && <CircularProgress />}
      {employeeList.length > 0 ? (
        <CustomTable
          {...{ employeeList, handleEditClick, handleDeleteClick }}
        />
      ) : (
        <Typography variant="h4" sx={{ m: 10 }}>
          No Data Found
        </Typography>
      )}
      <Pagination
        sx={{ mt: 2 }}
        count={10}
        color="primary"
        onChange={handlePageChange}
      />
      {showSnackbar && <CustomeSnackbar {...{ message }} />}
    </Grid>
  );
}

export default CustomerListing;
