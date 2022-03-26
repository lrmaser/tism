from datetime import datetime
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(
        name='Demo User 1', email='demo1@aa.io', password='password', profile_image=None, about=None, created_at=datetime.now())
    demo2 = User(
        name='Demo User 2', email='demo2@aa.io', password='password', profile_image=None, about=None, created_at=datetime.now())
    demo3 = User(
        name='Demo User 3', email='demo3@aa.io', password='password', profile_image=None, about=None, created_at=datetime.now())
    laura = User(
        name='Laura Maser', email='laura.maser3@yahoo.com', password='password', profile_image="https://avatars.githubusercontent.com/u/92398763?v=4.jpg", about="I am a software engineer who will soon be graduating from App Academy. I discovered my passion for programming when I was a senior in high school and took it up as an off and on hobby since. I'm happy to finally have the skills to break into the tech world and to have created the site you're on now. It was created using the following technologies: JavaScript, React, Redux, HTML, CSS, Python, Flask, SQLAlchemy, Alembic, and PostgreSQL.", created_at=datetime.now())
    james = User(
        name='James Tuttle', email='james@aa.io', password='password', profile_image="https://avatars.githubusercontent.com/u/2349101?v=4.jpg", about=None, created_at=datetime.now())
    brendon = User(
        name='Brendon James', email='brendon@aa.io', password='password', profile_image="https://avatars.githubusercontent.com/u/92548825?v=4.jpg", about=None, created_at=datetime.now())
    katerina = User(
        name='Katerina Kreibich', email='katerina@aa.io', password='password', profile_image="https://avatars.githubusercontent.com/u/87352324?v=4.jpg", about=None, created_at=datetime.now())
    joan = User(
        name='Joan Buck', email='joan@aa.io', password='password', profile_image="https://avatars.githubusercontent.com/u/90011287?v=4.jpg", about=None, created_at=datetime.now())
    whit = User(
        name='Whit Minson', email='whit@aa.io', password='password', profile_image="https://avatars.githubusercontent.com/u/89945390?v=4.jpg", about=None, created_at=datetime.now())
    john = User(
        name='John Smith', email='john@aa.io', password='password', profile_image=None, about=None, created_at=datetime.now())
    leonel = User(
        name='Leonel Murillo', email='leonel@aa.io', password='password', profile_image="https://avatars.githubusercontent.com/u/72574258?v=4.jpg", about=None, created_at=datetime.now())
    david = User(
        name='David Alliger', email='david@aa.io', password='password', profile_image="https://avatars.githubusercontent.com/u/88861592?v=4.jpg", about=None, created_at=datetime.now())
    vern = User(
        name='Vern Chao', email='vern@aa.io', password='password', profile_image="https://avatars.githubusercontent.com/u/91238232?v=4.jpg", about=None, created_at=datetime.now())


    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(laura)
    db.session.add(james)
    db.session.add(brendon)
    db.session.add(katerina)
    db.session.add(joan)
    db.session.add(whit)
    db.session.add(john)
    db.session.add(leonel)
    db.session.add(david)
    db.session.add(vern)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
