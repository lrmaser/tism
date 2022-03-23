from flask.cli import AppGroup
from .users import seed_users, undo_users
from .special_interests import seed_special_interests, undo_special_interests

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_special_interests()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_special_interests()
