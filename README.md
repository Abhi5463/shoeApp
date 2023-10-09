# Shoe Store App

## Description

The Shoe Store App is a mobile application that allows users to browse and purchase shoes online. This app provides a user-friendly interface to view shoe details, select sizes, and add products to the shopping cart.


## Features

- **Admin Flow:**
  - Admin registers and chooses the role as "Admin."
  - Admin logs in using valid credentials.
  - Admin is navigated to the Shoe Upload Form screen based on their role.
  - Admin can enter shoe details and upload them to the app.

- **Consumer Flow:**
  - Consumer registers and chooses the role as "Consumer."
  - When the consumer logs in, they are redirected to the home screen based on their role.
  - The consumer can scroll through the product list uploaded by the admin.
  - The consumer can add products to the cart.
  - The consumer can remove products from the cart.
  - The consumer can navigate to the cart to check out the added products.

## Tech Stack Used

The Shoe Store App is built using the following technologies:

- **React Native**: The core framework for building the mobile app.
- **CSS**: Styling and layout of the app.
- **Redux Toolkit**: Used for managing the state of the shopping cart, allowing users to add and remove products.
- **Node.js**: Used to run the server-side code.
- **Express.js**: A web application framework for Node.js, used to create APIs for user authentication, registration, uploading shoes, and fetching shoes.
- **MongoDB**: The database used to store user data and shoe data.
- **Database**: Two collections are created, one for user data and another for shoe data.

## Installation

To use the Shoe Store App on your mobile device, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run the following command to install the required dependencies:

   ```bash
   npm install
