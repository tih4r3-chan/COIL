""" models.py """

from sqlalchemy import Column, Integer, String, Float, Text
from db import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    full_name = Column(String(100), nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    weight = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(10), nullable=False)
    goal = Column(String(50), nullable=False)
    physical_activity_level = Column(Integer, nullable=False)
    health_conditions = Column(Text, nullable=True)  # Guardamos una lista en formato CSV
    password_hash = Column(String(255), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'
