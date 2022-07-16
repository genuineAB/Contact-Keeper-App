# Contact Keeper

This is an app that enables users to save their contacts. This will be a fullstack react project.

## Running the Application
To run the dependencies for this project, cd into project directory and run `npm install`. After your installation is complete run `npm run server`.



## API REFERENCE

### GETTING STARTED
    Base URL: At present this app can only be run locally and is not hosted as a base URL. The backend app is hosted at the default, http://127.0.0.1:5000/.

    Authentication: This version of the application does not require authentication or API keys

### Pre-requisites and Local Development
Developers using this project should already have Nodejs, postman installed on their local machines.


### ENDPOINTS

#### GET /api/auth
    General:
        Returns the details of a logged in user, this include the id, name, email, and date of the logged in user. To be able run this endpoint successfully, you need to pass a header key and a token value. The header key we use is `x-auth-toke` and the token value is gotten from the login endpoint. This is best done with a postman app. Sample: GET http://127.0.0.1:5000/api/auth {
            "user": {
                "_id": "XXXXXX7e92151XXXXX",
                "name": "Oluwagbemi Banji",
                "email": "o.banj@gmail.com",
                "date": "2022-07-15T16:42:31.091Z",
                "__v": 0
            }
        }

#### GET /api/contacts
    General:
        Returns an array contacts for a logged in user. To be able run this endpoint successfully, you need to pass a header key and a token value. The header key we use is `x-auth-toke` and the token value is gotten from the login endpoint. This is best done with a postman app. Sample: GET http://127.0.0.1:5000/api/contacts {
            "contacts": [
                {
                    "type": "Personal",
                    "_id": "XXXXX49a3841cXXXXXXXXX",
                    "name": "Adunni Ademi",
                    "email": "a.duni@crispymail.com",
                    "phone": "080243535434",
                    "user": "XXXXXXXXe9215XXXXXXXXXXX",
                    "date": "2022-07-16T14:00:58.700Z",
                    "__v": 0
                },
                {
                    "type": "Professional",
                    "_id": "XXXXd2c3XXXXXXXXXXXXX",
                    "name": "Joke Ololade",
                    "email": "j.lolohotmail.com",
                    "phone": "081452462345",
                    "user": "XXXXXXXX8f7e921512eXXXXXX",
                    "date": "2022-07-16T13:56:56.168Z",
                    "__v": 0
                }
            ]
        }

#### POST /api/auth
    General:
        This endpoint provides the platform for a user to log in to the application, on successful log in it returns a JWT that gives the user access to his/her content in the database. The header key we use is Content-Type with a value of application/json. This is best done with a postman app. Sample: POST http://127.0.0.1:5000/api/auth {{
            "email": "o.banj@gmail.com",
            "password": "XXXXXXXXXXX"
        }} {
            "token": "XXXXXXXiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMTk4ZjdlOTIxNTEyZTY0ODBmNmMyIn0sImlhdCI6MTY1Nzk5MDUyOCwiZXhwIjoxNjU4MzUwNTI4fQ.t7cmJqXXXXXXXXXXXX"
        }}

#### POST /api/users
    General:
        This endpoint provides the platform to register a new user in the database, on successful registration it returns a JWT that gives the user access to his/her content in the database. The header key we use is Content-Type with a value of application/json. This is best done with a postman app. Sample: POST http://127.0.0.1:5000/api/users {{
            "name":"John Harvest",
            "email": "jHarvest@gmail.com",
            "password": "XXXXXXXXXX"
        }} {
            "token": "XXXXXXXXXzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMmM2MDQzODQxYzExYWY0ODRlYzQ2In0sImlhdCI6MTY1Nzk4MDQyMSwiZXhwIjoxNjU4MzQwNDIxfQ.vfQaofCXXXXXXXXXXXXXXXX"
        }}


#### POST /api/contacts
    General:
        This endpoint provides the platform to add a contact to a particular user. To be able run this endpoint successfully, you need to pass a header key and the user JWT token. It returns the details of the newly added contact. The header key we use is Content-Type with a value of application/json. This is best done with a postman app. Sample: POST http://127.0.0.1:5000/api/contacts {{
            "name": "Maxwell Gaiya",
            "email": "mgaiya@iit.com",
            "phone": "070552345243",
            "type": "Professional"
        }} {
            "contact": {
            "type": "Professional",
            "_id": "XXXXXf151XXXXXXXXXXXX",
            "name": "Maxwell Gaiya",
            "email": "mgaiya@iit.com",
            "phone": "070552345243",
            "user": "XXXX98f7XXXXXXXXXXXXX",
            "date": "2022-07-16T17:11:45.445Z",
            "__v": 0
            }
        }}


#### PATCH /api/contacts/:id
    General:
        This endpoint makes it possible to update the details of a contact, it takes the id of the contact to be updated. To be able run this endpoint successfully, you need to pass a header key and the user JWT token. It returns the details of the updated contact. The header key we use is Content-Type with a value of application/json. This is best done with a postman app. Sample: PATCH http://127.0.0.1:5000/api/contacts/:id {{
            "name": "Adunni Ade"
        }} {
            "contact": {
            "type": "Personal",
            "_id": "XXXXX9a3841c11aXXXXXX",
            "name": "Adunni Ade",
            "email": "a.duni@crispymail.com",
            "phone": "080243535434",
            "user": "XXXXXXXf7e921512eXXXXXX",
            "date": "2022-07-16T14:00:58.700Z",
            "__v": 0
            }
        }}

#### DELETE /api/contacts/:id
    General:
        This endpoint makes it possible to delete a contact, it requires the id of the contact to be updated. To be able run this endpoint successfully, you need to pass a header key and the user JWT token. It returns a Contact deleted message. This is best done with a postman app. Sample: DELETE http://127.0.0.1:5000/api/contacts/:id { {
            "msg": "Contact deleted"
            }
        }
