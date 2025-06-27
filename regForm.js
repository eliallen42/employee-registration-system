/*
        JavaScript Final Project
        Simple Employee Registration System

        Author: Eli Allen
        Date: 3/28/2025

        Filename: regForm.js
*/

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("employee-form");

    // Load existing employees from LocalStorage or create a new array
    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

        // Clear all previous error messages
        document.querySelectorAll(".error-message").forEach(span => span.textContent = "");

        // Create a new employee object from form values
        const newEmployee = {
            id: document.getElementById("employee-id").value.trim(),
            firstName: document.getElementById("first-name").value.trim(),
            middleName: document.getElementById("middle-name").value.trim(),
            lastName: document.getElementById("last-name").value.trim(),
            dob: document.getElementById("dob").value.trim(),
            ssn: document.getElementById("ssn").value.trim(),
            address: document.getElementById("address").value.trim(),
            city: document.getElementById("city").value.trim(),
            state: document.getElementById("state").value.trim(),
            zip: document.getElementById("zip").value.trim(),
            hireDate: document.getElementById("hire-date").value.trim(),
            position: document.getElementById("position").value.trim(),
            department: document.getElementById("department").value.trim(),
            homePhone: document.getElementById("home-phone").value.trim(),
            workPhone: document.getElementById("work-phone").value.trim(),
            mobilePhone: document.getElementById("mobile-phone").value.trim(),
            email: document.getElementById("email").value.trim()
        };

        // Validation functions
        const validateSSN = (ssn) => {
            const ssnPattern = /^\d{3}-\d{2}-\d{4}$/; // Format: XXX-XX-XXXX
            return ssnPattern.test(ssn);
        };

        const validatePhoneNumber = (phone) => {
            const phonePattern = /^(?:\(\d{3}\)\s?|\d{3}-)\d{3}-\d{4}$/; // Format: (XXX) XXX-XXXX or XXX-XXX-XXXX
            return phonePattern.test(phone);
        };

        const validateZipCode = (zip) => {
            const zipPattern = /^\d{5}(-\d{4})?$/; // Format: XXXXX or XXXXX-XXXX
            return zipPattern.test(zip);
        }

        // Validate SSN
        if (!validateSSN(newEmployee.ssn)) {
            document.getElementById("ssn-error").textContent = "SSN must be in format XXX-XX-XXXX.";
            return; // Stop form submission
        }

        // Validate all phone numbers
        const phoneFields = [
            {value: newEmployee.homePhone, id: "home-phone"},
            {value: newEmployee.workPhone, id: "work-phone"},
            {value: newEmployee.mobilePhone, id: "mobile-phone"}
        ];

        for (let phone of phoneFields) {
            if (!validatePhoneNumber(phone.value)) {
                const errorSpan = document.getElementById(`${phone.id}-error`);
                if (errorSpan) {
                    errorSpan.textContent = "Phone number must be in format (XXX) XXX-XXXX or XXX-XXX-XXXX.";
                }
                return; // Stop form submission
            }
        }

        // Validate ZIP Code
        if (!validateZipCode(newEmployee.zip)) {
            const zipError = document.getElementById("zip-error");
            if (zipError) {
                zipError.textContent = "ZIP Code must be in format XXXXX or XXXXX-XXXX.";
            }
            return; // Stop form submissio
        }
        

        // Add new employee to the array and save to LocalStorage
        employees.push(newEmployee);
        localStorage.setItem("employees", JSON.stringify(employees));
        console.log("Saved employee data:", JSON.parse(localStorage.getItem("employees")));
        alert("Employee information saved!");

        // Redirect to index.html
        window.location.href = "index.html";
    });
});