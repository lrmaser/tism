# Tism

Tism is a community forum for neurodivergent (primarily autistic) individuals to bond over shared special interests. It is a loose clone of Product Hunt, where users can submit posts and comments. Users also have profile pages where they can include a profile image, share about themselves, and list their special interests.

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
* Add screenshot

<br>

### Login Modal
* Add screenshot

<br>

### Posts Page
* Add screenshot

<br>

### Post Detail/Comments Page
* Add screenshot

<br>

### User Profile Page
* Add screenshot
