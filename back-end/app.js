import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Employee, User, sequelize } from "./Model/model.js";

const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(cors());

// api for adding new employee
app.post("/api/add-customer", async (req, res) => {
  const { firstName, lastName, address, designation } = req.body;
  if (!firstName || !lastName || !address || !designation) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const newEmployee = await Employee.create({
      firstName,
      lastName,
      address,
      designation,
    });
    res.status(200).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// api for employee list
app.get("/api/customer-list", async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 10;
    const users = await Employee.findAll({
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// api for deleting an employee from list
app.delete("/api/delete-customer/:id", async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employee.destroy();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// api for updating details of an employee
app.put("/api/update-customer/:id", async (req, res) => {
  const employeeId = req.params.id;
  const updatedEmployeeData = req.body;
  try {
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employee.update(updatedEmployeeData);
    return res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
