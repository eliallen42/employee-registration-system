/*
        JavaScript Final Project
        Simple Employee Registration System

        Author: Eli Allen
        Date: 3/28/2025

        Filename: empInfo.js
*/

window.addEventListener("load", function() {
    let employeeId = null;

    try {
        // Attempt to retrieve and parse employee data from localStorage
        const employees = JSON.parse(this.localStorage.getItem("employees")) || [];

        // Get the employee ID from the URL query string
        const urlParams = new URLSearchParams(window.location.search);
        const employeeId = urlParams.get("id");

        const employee = employees.find(emp => emp.id === employeeId);

        if (employee) {
            document.getElementById("employee-id").textContent = employee.id;
            document.getElementById("first-name").textContent = employee.firstName;
            document.getElementById("middle-name").textContent = employee.middleName;
            document.getElementById("last-name").textContent = employee.lastName;
            document.getElementById("dob").textContent = employee.dob;
            document.getElementById("ssn").textContent = employee.ssn;
            document.getElementById("address").textContent = employee.address;
            document.getElementById("city").textContent = employee.city;
            document.getElementById("state").textContent = employee.state;
            document.getElementById("zip").textContent = employee.zip;
            document.getElementById("hire-date").textContent = employee.hireDate;
            document.getElementById("position").textContent = employee.position;
            document.getElementById("department").textContent = employee.department;
            document.getElementById("home-phone").textContent = employee.homePhone;
            document.getElementById("work-phone").textContent = employee.workPhone;
            document.getElementById("mobile-phone").textContent = employee.mobilePhone;
            document.getElementById("email").textContent = employee.email;
        } else {
                document.getElementById("employee-form").innerHTML = `<p>Employee not found.</p>`;
        }
    // Handle any errors that occur during the retrieval or parsing process
    } catch (error) {
        console.error("Error retrieving or parsing employee data:", error);
        document.getElementById("employee-form").innerHTML = `<p>Error loading employee data.</p>`;
    }    
});

// Function to handle the Edit/Save button click
document.getElementById("edit-button").addEventListener("click", function() {
    const fields = document.querySelectorAll('.field-row > div, .field-row > input');


    // If we are in Edit mode (button says "Save"), save the values back to divs
    if (this.innerText === "Save") {
        try {
            // Loop over all input fields and change them back to div
            fields.forEach(function(field) {
                if (field.tagName === 'INPUT') {
                    // Create a new div with the input value
                    const divField = document.createElement('div');
                    divField.innerText = field.value;
                    divField.id = field.id;

                    // replace the input field with the new div
                    field.replaceWith(divField);
                }
            });

            // Save the updated employee data back to local storage
            const employeeId = document.getElementById("employee-id").textContent;
            let employees = JSON.parse(localStorage.getItem("employees")) || [];
            let employee = employees.find(emp => emp.id === employeeId);

            if (employee) {
                employee.firstName = document.getElementById("first-name").textContent;
                employee.middleName = document.getElementById("middle-name").textContent;
                employee.lastName = document.getElementById("last-name").textContent;
                employee.dob = document.getElementById("dob").textContent;
                employee.ssn = document.getElementById("ssn").textContent;
                employee.address = document.getElementById("address").textContent;
                employee.city = document.getElementById("city").textContent;
                employee.state = document.getElementById("state").textContent;
                employee.zip = document.getElementById("zip").textContent;
                employee.hireDate = document.getElementById("hire-date").textContent;
                employee.position = document.getElementById("position").textContent;
                employee.department = document.getElementById("department").textContent;
                employee.homePhone = document.getElementById("home-phone").textContent;
                employee.workPhone = document.getElementById("work-phone").textContent;
                employee.mobilePhone = document.getElementById("mobile-phone").textContent;
                employee.email = document.getElementById("email").textContent;

                localStorage.setItem("employees", JSON.stringify(employees));

                console.log("Employee data saved.");
            } else {
                console.error("Employee not found in local storage.");
            }
        // Handle any errors that occur during the save process    
        } catch (error) {
            console.error("Error saving employee data:", error);
            alert("There was an issue saving the employee data. Please try again.");
        }
        
        // Change button back to "Edit"
        this.innerText = "Edit";
    } else {
        // Otherwise, switch to Edit mode (replace divs with input fields)
        fields.forEach(function(field) {
            if (field.tagName === 'DIV') {
                // Create a new input field with the div value
                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.value = field.textContent;
                inputField.id = field.id;

                // replace the div with the new input field
                field.replaceWith(inputField);
            }
        });

        // Change button text to "Save"
        this.innerText = "Save";
    }
});