"""Merge multiple heads

Revision ID: 474e15bbcc21
Revises: 7432b1a75478, 8fe468ba0ca5
Create Date: 2023-11-14 12:00:35.669457

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '474e15bbcc21'
down_revision = ('7432b1a75478', '8fe468ba0ca5')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
