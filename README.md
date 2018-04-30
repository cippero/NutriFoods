[Check out the app!](https://nutrifoods.herokuapp.com/)
# NutriFoodS

## Project Proposal
NutriFoodS is an app for checking the nutritional values of meals and ingrediants and saving them to your profile. API provided by [Nutritionix](https://developer.nutritionix.com/).

## Wireframes
Search for foods by using natural language or enter the name of the food and then specify an amount:
![01_search](https://user-images.githubusercontent.com/37132245/39436404-c0a681ac-4c52-11e8-8b2f-44503a3d92d1.png)
![02_autocomplete](https://user-images.githubusercontent.com/37132245/39436422-ccfb0a22-4c52-11e8-9c1c-339d348623da.png)
![03_autocompletequantity](https://user-images.githubusercontent.com/37132245/39436431-d0750374-4c52-11e8-9e08-dc6e236dbea4.png)
![04_naturalsearch](https://user-images.githubusercontent.com/37132245/39436447-d33d9792-4c52-11e8-821d-59222564769b.png)
Get nutritional info about your searched food:
![05_nutrientinfo](https://user-images.githubusercontent.com/37132245/39436450-d60dcf6e-4c52-11e8-8938-6be452493c05.png)
Sign up or login to save foods in your profile:
![08_createprofile](https://user-images.githubusercontent.com/37132245/39436461-de92ec32-4c52-11e8-9fcb-88cf9a506768.png)
![06_savefood](https://user-images.githubusercontent.com/37132245/39436453-d91f383c-4c52-11e8-8362-9585c651b8ab.png)
![07_deletefood](https://user-images.githubusercontent.com/37132245/39436458-db79a4b4-4c52-11e8-933d-97301da288c9.png)
Edit your profile:
![09_editprofile](https://user-images.githubusercontent.com/37132245/39436464-e0af8688-4c52-11e8-817d-42238ea10be5.png)
![10_editting](https://user-images.githubusercontent.com/37132245/39436466-e2e0e334-4c52-11e8-9851-35c0e7de955e.png)

## Instructions
Enter meal/ingrediants and quantity directly into the search bar or select the food's name from the autocomplete and then enter the desired quantity to see a bubble with nutritional information. If you're registered and logged in, you can also save items and then view them in your profile.

## Technologies and Tools
* Sublime
* Git & Github
* HTML5 & CSS3
* JavaScript
* Node.js
* Express
* MongoDB
* Mongoose
* Bootstrap
* jquery
* EJS
* Auth/Bcrypt

## Routes
| CRUD          | Route             | Functionality                      |
|:--------------|:------------------|:-----------------------------------|
| GET           | /index            | Renders app homepage               |
| POST          | /search           | Populates autocomplete list        |
| POST          | /search/nutrients | Queries API for nutritional values |
| POST          | /search/item      | Save item to database              |
| DELETE        | /search/item/:id  | Deletes item from database         |
| GET           | /auth/login       | Renders login page                 |
| POST          | /auth/login       | Authenticate login credentials     |
| GET           | /auth/signup      | Renders signup page                |
| POST          | /auth/signup      | User creation route                |
| GET           | /auth/logout      | User logout route                  |
| GET           | /profile          | Renders profile page               |
| GET           | /profile/edit     | Renders profile edit page          |
| PUT           | /profile/edit     | Updates user profile               |

## Workflow
1. Created the backend routes.
1. Hooked up external API for getting food info.
1. Set up frontend functionality for interacting with info fetched from backend.
1. Styled the app.
1. Fixed bugs.

## How to Improve
1. Improve the design.
1. Sort foods in profile by day, and show a total of nutrients per day.
1. Based on user dietary goals, calculate daily intake and show user how on track they are.
1. Edit saved foods.
