"""create user stim aids association table

Revision ID: 21d9ebfb9dd7
Revises: b10ed1f2d7cd
Create Date: 2022-03-15 17:44:51.725673

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '21d9ebfb9dd7'
down_revision = 'b10ed1f2d7cd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_stim_aids',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('stim_aid_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['stim_aid_id'], ['stim_aids.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'stim_aid_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_stim_aids')
    # ### end Alembic commands ###
