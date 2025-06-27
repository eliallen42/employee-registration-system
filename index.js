/*
        JavaScript Final Project
        Simple Employee Registration System

        Author: Eli Allen
        Date: 3/28/2025

        Filename: index.js
*/

window.addEventListener("load", function() {
    const tableBody = document.getElementById("employee-table-body");
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    function displayEmployees(filteredEmployees) {
        tableBody.innerHTML = ""; // Clear the existing table
        filteredEmployees.forEach(employee => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${employee.id}</td>
                <td><a href="empInfo.html?id=${employee.id}">${employee.lastName}, ${employee.firstName}</a></td>
                <td>${employee.position}</td>
                <td>${employee.department}</td>
                <td>${employee.workPhone}</td>
                <td>${employee.email}</td>
                `;
                
            tableBody.appendChild(row);
        });
    }
    // Initially display all employees
    displayEmployees(employees);

    // Search function
    function searchEmployees() {
        const query = document.getElementById("search-input").value.toLowerCase();

        const filteredEmployees = employees.filter(employee => {
            return (
                employee.id.includes(query) ||
                `${employee.lastName}, ${employee.firstName}`.toLowerCase().startsWith(query)
            );
        });

        displayEmployees(filteredEmployees);
    }

    // Add event listener for clicking search button and pressing Enter
    document.getElementById("search-button").addEventListener("click", searchEmployees);
    document.getElementById("search-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchEmployees();
        }
    });
});