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
skills_collection = db.get_collection("skills")


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
        # {
        #     "projectId": "42b3c7e2-2f05-4829-9e02-9f78560dadb4",
        #     "name": "Weather App",
        #     "description": "A weather app that shows the current weather for your location or a searched one.",
        #     "date": "November 2024 - December 2024",
        #     "link": "x.com",
        #     # "image": "d"
        # },
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
            "picture": "https://i.postimg.cc/fyjj0qTR/valpic.png",
            "education": "Computer Science Technology, Champlain College, Saint-Lambert",
            "hobbies": {
                "Cooking": {
                    "description": "I got into cooking a while back, experimenting with different ingredients. It's "
                                   "my go-to activity for relaxation and creativity, especially with various cuisines.",
                    "image": "https://i.postimg.cc/C184wL3D/pasta.jpg"
                },
                "Photography": {
                    "description": "I've delved into photography, capturing moments and views that speak to me. From "
                                   "nature shots to urban landscapes, it allows me to preserve memories uniquely.",
                    "image": "https://i.postimg.cc/TwBHcs6j/photo4.jpg"
                }
            },
            "github": "https://github.com/Valthefirst",
            "linkedin": "https://www.linkedin.com/in/valentine-nneji/",
            "email": "ama.val@live.ca",
        }
    ]

    skils = [
        {
            "Software Development Tools": {
                "GitHub": "https://i.postimg.cc/B6kPQrWK/github-PNG47.png",
                "Docker": "https://i.postimg.cc/nhFbMMGv/docker.png",
                "Atlassian": "https://i.postimg.cc/tCz80pG7/jira.png",
                "IntelliJ": "https://i.postimg.cc/pXv31y7g/intelliJ.png",
                "VS Code": "https://i.postimg.cc/FRjDjV91/vscode.png",
                "Windows Powershell": "https://i.postimg.cc/FRjDjV91/vscode.png"
            },
            "Databases": {
                "MongoDB": "https://i.postimg.cc/t4SfTkTj/mongodb.png",
                "MySQL": "https://i.postimg.cc/1z8dNFnN/mysql.png",
                "PostgreSQL": "https://i.postimg.cc/T16NSHkr/postgre.jpg",
                "Firebase": "https://i.postimg.cc/3wqPL15B/firebase.png"
            },
            "Programming Languages": {
                "Python": "https://i.postimg.cc/tC9mNwnb/python.png",
                "Java": "https://i.postimg.cc/C5T90KKn/java.png",
                "JavaScript": "https://i.postimg.cc/GtFVm1B7/javascript.png",
                "C#": "https://i.postimg.cc/bYkKT16x/c.png",
                "Swift": "https://i.postimg.cc/k5Rj5dzQ/swift.jpg"
            },
            "Frameworks": {
                "React": "https://i.postimg.cc/wvKwyGYS/react.png",
                "Spring Boot": "https://i.postimg.cc/28T9cGnZ/springboot.png",
                ".Net": "https://i.postimg.cc/RZFsjtTb/net.png",
                "Next.js": "https://i.postimg.cc/JhS23hZY/nextjs.png"
            },
            "Operating Systems": {
                "Windows": "https://i.postimg.cc/0jnn45Ks/windows.png",
                "MacOS": "https://i.postimg.cc/HkhZHLZW/macos.png",
                "Linux": "https://i.postimg.cc/zGX686q7/linux.png"
            },
            "Cloud-based productivity tools": {
                "Google Workspace": "https://i.postimg.cc/1tNbbFyZ/google.png",
                "Microsoft 365": "https://i.postimg.cc/qRnZ1dGJ/office365.jpg"
            },

        }
    ]

    # Upsert projects (update if exists, insert if not)
    for project in projects:
        await projects_collection.update_one({"projectId": project["projectId"]}, {"$set": project}, upsert=True)

    # Upsert comments (update if exists, insert if not)
    for comment in comments:
        await comments_collection.update_one({"commentId": comment["commentId"]}, {"$set": comment}, upsert=True)

    # Upsert experience (update if exists, insert if not)
    for experience in experience:
        await experiences_collection.update_one({"experienceId": experience["experienceId"]}, {"$set": experience},
                                                upsert=True)

    # Upsert skills (update if exists, insert if not)
    for skill in skils:
        await skills_collection.update_one({}, {"$set": skill}, upsert=True)

    # Upsert me (update if exists, insert if not)
    for me_data in me:
        await me_collection.update_one({}, {"$set": me_data}, upsert=True)

    print("Project data loaded successfully!")


if __name__ == "__main__":
    import asyncio

    asyncio.run(load_project_data())
