"use client";
import { BASE_URL } from "@/constants/config";
import CustomDropdown from "@/molecules/CustomDropdown";
import CustomTextField from "@/molecules/CustomTextField";
import CustomeSnackbar from "@/molecules/CustomeSnackbar";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AddCustomer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showSnackbar, setSnackbar] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    // setting state for edit functionality
    if (queryParams.get("firstName")) {
      let firstNames = queryParams.get("firstName");
      setFirstName(firstNames);
      setLastName(queryParams.get("lastName"));
      setAddress(queryParams.get("address"));
      setDesignation(queryParams.get("designation"));
    }
  }, []);

  // handling on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!firstName || !lastName || !designation || !address) {
      setError("All fields are required");
      return;
    }

    if (firstName && lastName && designation && address) {
      const requestBody = { firstName, lastName, designation, address };
      // create employee section
      if (!queryParams.get("firstName")) {
        // api call for create emp
        axios({
          method: "post",
          url: BASE_URL + "/api/add-customer",
          data: requestBody,
        })
          .then((response) => {
            // popup toast on sucess
            setSnackbar(true);
            setMessage("Employee added successfully!");
            if (response.status === 200)
              setTimeout(() => {
                window.location.href = "/customer-listing"; // on success redirect to listing page
              }, 2000);
          })
          .catch((error) => {
            // popup toast on failure
            setSnackbar(true);
            setMessage("something went wrong!");
          });
      }
      // update emp section
      else if (queryParams.get("firstName")) {
        // api call for update emp
        axios({
          method: "put",
          url:
          BASE_URL + "/api/update-customer/" + queryParams.get("id"),
          data: requestBody,
        })
          .then((response) => {
            // popup toast on failure
            setSnackbar(true);
            setMessage("Employee details updated successfully!");
            if (response.status === 200)
              setTimeout(() => {
                window.location.href = "/customer-listing"; // on success redirect to listing page
              }, 2000);
          })
          .catch((error) => {
            // popup toast on failure
            setSnackbar(true);
            setMessage("Something went wrong!");
          });
      }
    }
    // Clear form fields after successful signup
    setFirstName("");
    setLastName("");
    setAddress("");
    setDesignation("");
    setError("");
  };

  return (
    <Grid
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          maxHeight: 500,
          padding: 10,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3);",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            sx={{ display: "flex", justifyContent: "center", fontWeight: 600 }}
          >
            ADD CUSTOMER
          </Typography>
          <CustomTextField
            label="First Name"
            type="text"
            value={firstName}
            setCallback={setFirstName}
            required={true}
          />
          <CustomTextField
            label="Last Name"
            type="type"
            value={lastName}
            setCallback={setLastName}
            required={true}
          />
          <CustomTextField
            label="Address"
            type="text"
            value={address}
            setCallback={setAddress}
            required={true}
          />
          <CustomDropdown
            {...{
              input: "Designation",
              value: designation,
              setCallback: setDesignation,
              menu: [
                "Software Developer",
                "Technical Support",
                "Software Architect",
                "Project Manager",
              ],
              error,
            }}
          />
          <Button
            sx={{ padding: "10px 0px" }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            ADD
          </Button>
        </form>
      </Box>
      {showSnackbar && <CustomeSnackbar {...{ message }} />}
    </Grid>
  );
}

export default AddCustomer;
