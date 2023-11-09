"""Merge multiple heads

Revision ID: 7432b1a75478
Revises: 2aa89006c9c1, a9836e3baeee
Create Date: 2023-11-09 17:38:18.409915

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7432b1a75478'
down_revision = ('2aa89006c9c1', 'a9836e3baeee')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
