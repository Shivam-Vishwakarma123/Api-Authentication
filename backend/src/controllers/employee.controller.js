"use strict";

const Employee = require("../models/employee.model");
const fs = require("fs");

exports.findAll = function (req, res) {
  Employee.findAll(function (err, employee) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", employee);
    res.send(employee);
  });
};

exports.create = function (req, res) {
  const new_employee = new Employee(req.body);
  new_employee.emp_img = req.file ? req.file.path : null;
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Employee.create(new_employee, function (err, employee) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Employee added successfully!",
        data: employee,
      });
    });
  }
};

exports.findById = function (req, res) {
  Employee.findById(req.params.id, function (err, employee) {
    if (err) res.send(err);
    if (employee.length > 0) {
      res.json(employee);
    } else {
      res.json({ message: "Id not exists" });
    }
  });
};

exports.update = function (req, res) {
  const new_employee = new Employee(req.body);
  new_employee.emp_img = req.file ? req.file.path : null;
  console.log('new_employee', new_employee)
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    var update_message;
    if (new_employee.emp_img != null || new_employee.emp_img != "") {
      Employee.findById(req.params.id, function (err, employee) {
        if (err) res.send(err);
        if (employee.length > 0) {
          const old_emp_img_path = employee[0].emp_img;
          // Delete old image file from server
          if (old_emp_img_path) {
            fs.unlink(old_emp_img_path, (err) => {
              if (err) {
                console.error("Error deleting old image file: ", err);
              }
            });
            update_message = "Old image removed and new image uploaded";
          }
        } else {
          res.json({ message: "Id not exists" });
        }
      });
    }
    console.log('new_employee_after', new_employee)
    Employee.update(req.params.id, new_employee, function (err, employee) {
      if (err) res.send(err);
      res.json({
        error: false,
        message: "Employee successfully updated",
        image: update_message,
      });
    });
  }
};

exports.delete = function (req, res) {
  const new_employee = new Employee(req.body);
  new_employee.emp_img = req.file ? req.file.path : null;
  var update_message;
  if (new_employee.emp_img != null || new_employee.emp_img != "") {
    Employee.findById(req.params.id, function (err, employee) {
      if (err) res.send(err);
      if (employee.length > 0) {
        const old_emp_img_path = employee[0].emp_img;
        // Delete old image file from server
        if (old_emp_img_path) {
          fs.unlink(old_emp_img_path, (err) => {
            if (err) {
              console.error("Error deleting old image file: ", err);
            }
          });
          update_message = "Old image removed.";
        }
      } else {
        res.json({ message: "Id not exists" });
      }
    });
  }
  Employee.delete(req.params.id, function (err, employee) {
    if (err) res.send(err);
    res.json({
      error: false,
      message: "Employee successfully deleted",
      image: update_message,
    });
  });
};
