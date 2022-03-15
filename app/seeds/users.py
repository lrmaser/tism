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

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
