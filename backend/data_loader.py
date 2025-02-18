import os
from dotenv import load_dotenv
import motor.motor_asyncio

load_dotenv()

# Create MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URL"))
# db = client["portfolio"]  # database name
db = client["x"]  # database name
projects_collection = db["projects"]
comments_collection = db.get_collection("comments")
experiences_collection = db.get_collection("experiences")
me_collection = db.get_collection("me")


async def load_project_data():
    projects = [
        {
            "projectId": "5a5d14d9-5c46-4962-a52e-1a6bf56046e8",
            "name": "League Alerts",
            "description": "A portfolio website that showcases my projects and skills.",
            "date": "September 2024 - February 2025",
            "link": "x.com",
            # "image": "d"
        },
        {
            "projectId": "42b3c7e2-2f05-4829-9e02-9f78560dadb4",
            "name": "Weather App",
            "description": "A weather app that shows the current weather for your location or a searched one.",
            "date": "November 2024 - December 2024",
            "link": "x.com",
            # "image": "d"
        },
        {
            "projectId": "184181c4-2ecd-4663-8c71-7cc105ab759d",
            "name": "Library Management System",
            "description": "A web service for a library management platform that allows users to borrow and return "
                           "books.",
            "date": "February 2024 - May 2024",
            "link": "https://github.com/Valthefirst/library-management-system",
            # "image": "d"
        },
        {
            "projectId": "bd6884f3-26da-4227-bd5b-512123e140ee",
            "name": "Personal Library Manager Application",
            "description": "A web app that allows you to keep track of the books you have and the authors of your "
                           "books.",
            "date": "September 2023 - December 2023",
            "link": "https://github.com/Valthefirst/library-manager-application",
            # "image": "d"
        }
    ]

    comments = [
        {
            "commentId": "d1194703-05b2-4185-85b4-40ff16185f95",
            "content": "Valentine is an amazing guy to work with.",
            "timestamp": "2025-02-12 00:15:19.635632",
            "name": "John Doe",
            "isVerified": True,
        },
        {
            "commentId": "14ee389e-bc4f-49fc-bdfc-c52f60175402",
            "content": "Valentine is very professional and delivers on time.",
            "timestamp": "2025-02-12 00:20:03.369079",
            "name": "Jane Doe",
            "isVerified": True,
        }
    ]

    experience = [
        {
            "experienceId": "53e88470-26fe-4d26-8d22-77708b238518",
            "title": "Tech Support",
            "company": "CIUSSS de l'Ouest-de-l'Île-de-Montréal",
            "location": "Montreal, QC",
            "date": "March 2025 - May 2025",
            "descriptions": [
                "Helped system users of Saint-Mary's Hospital with technical issues and provided support."
            ]
        },
        {
            "experienceId": "f8d91257-fc69-40ca-8940-93350747330e",
            "title": "Fast Food Worker",
            "company": "La Ronde",
            "location": "Montreal, QC",
            "date": "August 2021 - Present",
            "descriptions": [
                "Take orders and serve clients in a fast paced environment.",
                "Process orders with computerized cash registers.",
                "Train new employees on the menu and customer service.",
                "Guide, inform and answer questions from visitors."
            ]
        }
    ]

    me = [
        {
            "bio": "Hi, my name is Valentine, and I'm 21 years old. In my third year of Computer Science, I have a "
                   "genuine interest in IT Support and Software Development and I'm always eager to expand my "
                   "toolkit. I thrive on the energy and creativity that come from teamwork and working together to "
                   "solve problems.",
            "education": "Computer Science Technology, Champlain College, Saint-Lambert",
            "hobbies": {
                "Cooking": "I got into cooking a while back, experimenting with different ingredients. It's my go-to "
                           "activity for relaxation and creativity, especially with various cuisines.",
                "Photography": "I've delved into photography, capturing moments and views that speak to me. From "
                               "nature shots to urban landscapes, it allows me to preserve memories uniquely."
            },
            "github": "https://github.com/Valthefirst",
            "linkedin": "https://www.linkedin.com/in/valentine-nneji/",
            "email": "ama.val@live.ca",
        }
    ]

    # Upsert projects (update if exists, insert if not)
    for project in projects:
        # project["_id"] = await get_next_sequence("project_id")  # Auto-increment ID
        await projects_collection.update_one({"projectId": project["projectId"]}, {"$set": project}, upsert=True)

    # Upsert projects (update if exists, insert if not)
    for comment in comments:
        # project["_id"] = await get_next_sequence("project_id")  # Auto-increment ID
        await comments_collection.update_one({"commentId": comment["commentId"]}, {"$set": comment}, upsert=True)

    # Upsert projects (update if exists, insert if not)
    for experience in experience:
        # project["_id"] = await get_next_sequence("project_id")  # Auto-increment ID
        await experiences_collection.update_one({"experienceId": experience["experienceId"]}, {"$set": experience},
                                                upsert=True)

    # Upsert me (update if exists, insert if not)
    for me_data in me:
        await me_collection.update_one({}, {"$set": me_data}, upsert=True)

    print("Project data loaded successfully!")


if __name__ == "__main__":
    import asyncio

    asyncio.run(load_project_data())
