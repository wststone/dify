"""Merge multiple heads

Revision ID: 3f9cc14b44e8
Revises: 474e15bbcc21, fca025d3b60f
Create Date: 2023-12-01 09:50:14.945261

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3f9cc14b44e8'
down_revision = ('474e15bbcc21', 'fca025d3b60f')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
