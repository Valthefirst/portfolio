import uvicorn
import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import credentials
from pyrebase import pyrebase

import firebase_admin
import motor.motor_asyncio

from router import router

app = FastAPI(
    title="Portfolio Backend",
    description="This is the backend for my portfolio that will handle auth and requests",
    docs_url="/"
)

origins = [
    "http://localhost:3000",
    "https://portfolio-blond-eight-32.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

if not firebase_admin._apps:
    cred = credentials.Certificate("./serviceAccountKey.json")
    firebase_admin.initialize_app(cred)

firebaseConfig = {
    "apiKey": os.getenv("API_KEY"),
    "authDomain": os.getenv("AUTH_DOMAIN"),
    "projectId": os.getenv("PROJECT_ID"),
    "storageBucket": os.getenv("STORAGE_BUCKET"),
    "messagingSenderId": os.getenv("MESSAGING_SENDER_ID"),
    "appId": os.getenv("APP_ID"),
    "databaseURL": ""
}

firebase = pyrebase.initialize_app(firebaseConfig)

app.include_router(router)

client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URL"))
db = client.get_database("x")
projects_collection = db["projects"]
testimonials_collection = db.get_collection("testimonials")
experiences_collection = db.get_collection("experiences")
me_collection = db.get_collection("me")
resumes_collection = db.get_collection("resumes")
# skills_collection = db.get_collection("skills")
skills_software_dev_tools_collection = db.get_collection("skills_software_dev_tools")
skills_database_collection = db.get_collection("skills_database")
skills_programming_languages_collection = db.get_collection("skills_programming_languages")
skills_frameworks_collection = db.get_collection("skills_frameworks")
skills_operating_systems_collection = db.get_collection("skills_operating_systems")
skills_cloud_productivity_tools_collection = db.get_collection("skills_cloud_productivity_tools")

# @app.on_event("startup")
# async def startup_event():
#     await load_project_data()


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
