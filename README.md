# Tism

Tism is a community forum for neurodivergent (primarily autistic) individuals to bond over shared special interests and stim aids. It is a loose clone of Product Hunt, where users can submit posts and comments as well as a product listing page for stim aids. Users also have profile pages where they can include a profile image, share about themselves, and list their special interests.

<br>

## Index

* [Live Site](https://tism-app.herokuapp.com/)
* [Wiki](https://github.com/lrmaser/tism/wiki)
* [Feature List](https://github.com/lrmaser/tism/wiki/Feature-List)
* [Database Schema](https://github.com/lrmaser/tism/wiki/Database-Schema)
* [API Routes](https://github.com/lrmaser/tism/wiki/API-Routes)
* [Frontend Routes](https://github.com/lrmaser/tism/wiki/Frontend-Routes)
* [User Stories](https://github.com/lrmaser/tism/wiki/User-Stories)
* [Wireframes](https://github.com/lrmaser/tism/wiki/Wireframes)

<br>

## Technologies Used

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height=40/>

<br>

## Getting started

1. Clone this repository
   ```
   git@github.com:lrmaser/tism.git
   ```

2. Install dependencies in the root directory
   ```
   pipenv install
   ```

3. Install dependencies in the /react-app directory
   ```
   npm install
   ```

4. Create a **.env** file based on the **.env.example** file in the root directory

5. Setup your PostgreSQL user, password, and database according to your **.env** file

6. Get into pipenv, migrate the database, seed the database, and run the flask app
   ```
   pipenv shell
   ```

   ```
   flask db upgrade
   ```

   ```
   flask seed all
   ```

   ```
   flask run
   ```

7. In the /react-app directory, run the react app
   ```
   npm start
   ```

8. You can use a demo user or create an account to begin using Tism.

<br>

## Features

### Splash Page
![Splash Page](https://user-images.githubusercontent.com/92398763/160252115-120f8958-0edb-4e7b-8c2a-e60568971dd1.png)

<br>

### Login Modal
![Login Modal](https://user-images.githubusercontent.com/92398763/160252120-93721f5f-7ee5-476e-933e-192dc76b20de.png)

<br>

### Posts Page
![Posts Page](https://user-images.githubusercontent.com/92398763/160252126-1af6aeca-f6e7-4e4b-9b4e-e67f8b3ac3b2.png)

<br>

### Post Detail/Comments Page
![Post Detail-Comments Page](https://user-images.githubusercontent.com/92398763/160252131-1febee6a-6103-4641-8882-83c8d53f54f2.png)

<br>

### Stim Aids Page (Product Listing)
![Stim Aids Page](https://user-images.githubusercontent.com/92398763/160252379-c77b73f9-8771-41fe-bc07-544a751555b5.png)

<br>

### User Profile Page
![Profile Page](https://user-images.githubusercontent.com/92398763/160252136-e4e0aca3-a9dd-417d-9076-e64addba44fc.png)

