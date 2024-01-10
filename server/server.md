# API Endpoints

| Method | Path      | Function            |
| ------ | --------- | ------------------- |
| GET    | /runs     | Get all runs        |
| POST   | /runs     | Create new run      |
| GET    | /runs/:id | Get specific run    |
| DELETE | /runs/:id | Delete specific run |
| PUT    | /runs/:id | Update specific run |

# Database Schemas

## User Schema

| Key      | Type   | Required |
| -------- | ------ | -------- |
| Username | String | True     |
| Email    | String | True     |
| Password | String | True     |

## Run Schema

| Key         | Type   | Required |
| ----------- | ------ | -------- |
| Distance    | Number | True     |
| Duration    | Number | True     |
| Pace        | Number | True     |
| Temperature | Number | True     |
| Weight      | Number | True     |
