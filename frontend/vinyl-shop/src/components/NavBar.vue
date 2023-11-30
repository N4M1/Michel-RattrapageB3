<template>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/">Vue Shop</router-link>
      </div>
      <div class="navbar-actions">
        <router-link to="/signup" class="navbar-button">Sign Up</router-link>
        <router-link to="/signin" class="navbar-button">Sign In</router-link>
      </div>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #333;
    color: white;
  }
  
  .navbar a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
  }
  
  .navbar a:hover {
    text-decoration: underline;
  }
  
  .navbar-button {
    border: 1px solid white;
    padding: 8px 12px;
    border-radius: 4px;
    margin: 0 5px;
    cursor: pointer;
  }
  
  /* Optional: Adjust background and hover styles for buttons */
  .navbar-button:hover {
    background-color: white;
    color: #333;
  }
  </style>