""" models.py """

from sqlalchemy import Column, Integer, String, Text, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
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

class Activity(Base):
    __tablename__ = 'activities'
    
    activity_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    activity_type = Column(String)
    description = Column(Text)
    date = Column(Date)
    created_at = Column(Date)

    user = relationship("User", back_populates="activities")

class Meal(Base):
    __tablename__ = 'meals'
    
    meal_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    meal_type = Column(String)
    food_items = Column(Text)
    calories = Column(Integer)
    date = Column(Date)
    created_at = Column(Date)

    user = relationship("User", back_populates="meals")

User.activities = relationship("Activity", back_populates="user")
User.meals = relationship("Meal", back_populates="user")


def __repr__(self):
        return f'<User {self.username}>'
