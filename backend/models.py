from sqlalchemy import Column, Integer, String, Text, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from db import Base
import bcrypt


#Modelo user
class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, autoincrement=True)  # Asegúrate de que esto esté presente
    full_name = Column(String(100), nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    weight = Column(Float, nullable=False)
    height = Column(Float, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(10), nullable=False)
    goal = Column(String(50), nullable=False)
    physical_activity_level = Column(Integer, nullable=False)
    health_conditions = Column(Text, nullable=True)  # Guardamos una lista en formato CSV
    password_hash = Column(String(255), nullable=False)  # Este campo almacena el hash de la contraseña

    # Puedes agregar un método para establecer la contraseña
    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def __repr__(self):
        return f"<User   (username={self.username}, full_name={self.full_name})>"

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
