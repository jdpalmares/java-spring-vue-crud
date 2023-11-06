# java-spring-vue-crud
Dockerised CRUD Application using Java/Spring and Vue.js (Vue 3 and custom Bootstrap)

## Prerequisites:

- Java jdk version 21.0.1 and UP
- Node version v18.18.2 and UP
- Nuxt and/or vue installed globally

## Running the app locally

- Run the back-end first:
  - Go to the back-end folder via `cd javaspringapi`
  - The back-end is already dockerised but you'll have to build it using `mvn clean package -DskipTests`
  - After it succeeds (generated javapringapi-0.0.1-SNAPSHOT.jar), dockerise it using `docker compose up -d`
- Then execute the client:
  - Go to back to the root folder `cd ..` and then `cd vueapp`
  - Run the app using `npm run server` (should use port 8081, will have CORS problem if not)

## TODO improvements

- Dockerise both back-end and front-end
- Unit tests on back-end (BE)
- Unit tests on front-end (FE)
- Use specific port numbers for both BE and FE and configure CORS on BE for it
- Put patch mapping for BE for more optimized updates
- Form validations on new user (must not be empty and have specific ranges)
- Form validations on edit user (empty check and diff check)
- Implement active users again and only be able to edit active users