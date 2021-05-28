# employees-back

Backend service for employees page

To create needed tables and add mock data run:
```
npm run runQuery
```

Env variables:
```
PORT: Port to run the service
POSTGRESS_DB: String with for the database Ie. postgresql://postgres:password@localhost:5432/database
```

To check the graph endpoint go to:
```
localhost:PORT/employees/search
```
