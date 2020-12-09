import pytest
from model import Walk 


@pytest.fixture
def simple_walk(init_database):
    return Walk.query.get(1)


