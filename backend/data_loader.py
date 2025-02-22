import os
from dotenv import load_dotenv
import motor.motor_asyncio

load_dotenv()

# Create MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URL"))
# db = client["portfolio"]  # database name
db = client["x"]  # database name
projects_collection = db["projects"]
testimonials_collection = db.get_collection("testimonials")
experiences_collection = db.get_collection("experiences")
me_collection = db.get_collection("me")
# skills_collection = db.get_collection("skills")
skills_software_dev_tools_collection = db.get_collection("skills_software_dev_tools")
skills_database_collection = db.get_collection("skills_database")
skills_programming_languages_collection = db.get_collection("skills_programming_languages")
skills_frameworks_collection = db.get_collection("skills_frameworks")
skills_operating_systems_collection = db.get_collection("skills_operating_systems")
skills_cloud_productivity_tools_collection = db.get_collection("skills_cloud_productivity_tools")


def replace_dots_in_keys(data):
    if isinstance(data, dict):
        return {key.replace('.', '_'): replace_dots_in_keys(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [replace_dots_in_keys(item) for item in data]
    else:
        return data


async def load_project_data():
    projects = [
        {
            "projectId": "5a5d14d9-5c46-4962-a52e-1a6bf56046e8",
            "name": "League Alerts",
            "description": "A portfolio website that showcases my projects and skills.",
            "date": "September 2024 - February 2025",
            "link": "https://league-alerts.web.app",
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

    testimonials = [
        {
            "testimonialId": "d1194703-05b2-4185-85b4-40ff16185f95",
            "content": "Valentine is an amazing guy to work with.",
            "date": "2025-02-12",
            "name": "John Doe",
            "isVerified": True,
        },
        {
            "testimonialId": "14ee389e-bc4f-49fc-bdfc-c52f60175402",
            "content": "Valentine is very professional and delivers on time.",
            "date": "2025-02-12",
            "name": "Jane Doe",
            "isVerified": False,
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

    skills_software_dev_tools = [
        {
            "skillId": "7dd73041-d26f-4928-85e9-b5e9e42f6e48",
            "name": "GitHub",
            "imageLink": "https://i.postimg.cc/B6kPQrWK/github-PNG47.png"
        },
        {
            "skillId": "732cdeca-bfda-47b2-8cff-2e51a2f14573",
            "name": "Docker",
            "imageLink": "https://i.postimg.cc/nhFbMMGv/docker.png"
        },
        {
            "skillId": "2cadbea9-2f97-4c44-ae0a-0d8a0cfecf76",
            "name": "Jira",
            "imageLink": "https://i.postimg.cc/BZFC9wB1/jira.png"
        },
        {
            "skillId": "fb2c7047-ecbb-4cbc-a537-9dbfc1ce231f",
            "name": "IntelliJ",
            "imageLink": "https://i.postimg.cc/pXv31y7g/intelliJ.png"
        },
        {
            "skillId": "11b493b6-2ff0-40fa-8b33-b83f46a4d104",
            "name": "VS Code",
            "imageLink": "https://i.postimg.cc/FRjDjV91/vscode.png"
        },
        {
            "skillId": "3fde7504-cf5c-4303-b2b8-fe01eb1c1a51",
            "name": "Windows Powershell",
            "imageLink": "https://i.postimg.cc/sx4HR98b/powershell-ISE.png"
        }
    ]

    skills_database = [
        {
            "skillId": "1784d9eb-a977-4816-b52f-d557378964ba",
            "name": "MongoDB",
            "imageLink": "https://i.postimg.cc/t4SfTkTj/mongodb.png"
        },
        {
            "skillId": "5407a5b9-bca2-4aa0-bbe5-7f872a721a3b",
            "name": "MySQL",
            "imageLink": "https://i.postimg.cc/1z8dNFnN/mysql.png"
        },
        {
            "skillId": "7ae7297d-e923-494a-a0f5-626f2c98dbd8",
            "name": "PostgreSQL",
            "imageLink": "https://i.postimg.cc/KzkDY9Xw/postgre.png"
        },
        {
            "skillId": "d9771e5a-a7ab-474c-b462-0ec11b2864ad",
            "name": "Firebase",
            "imageLink": "https://i.postimg.cc/L4G8cx6w/firebase.png"
        }
    ]

    skills_programming_languages = [
        {
            "skillId": "fae0cb4b-0c0a-4737-ad3f-9148011e4c59",
            "name": "JavaScript",
            "imageLink": "https://i.postimg.cc/GtFVm1B7/javascript.png"
        },
        {
            "skillId": "4029a486-30a1-407d-bae3-6f7a6ec5e061",
            "name": "Java",
            "imageLink": "https://i.postimg.cc/C5T90KKn/java.png"
        },
        {
            "skillId": "45681935-bbcc-47a3-90a5-85b9f26f8163",
            "name": "C#",
            "imageLink": "https://i.postimg.cc/bYkKT16x/c.png"
        },
        {
            "skillId": "27f4e631-cf0e-4092-8a03-1ba6cc19d8dc",
            "name": "TypeScript",
            "imageLink": "https://i.postimg.cc/Gtw6QTd7/ts.png"
        },
        {
            "skillId": "ebbdbb0c-cce7-4a5a-8d1a-e96775e98b45",
            "name": "Python",
            "imageLink": "https://i.postimg.cc/tC9mNwnb/python.png"
        },
        {
            "skillId": "c0c70c5e-f8ea-4b8c-a6c0-e56a16e8ee7c",
            "name": "Swift",
            "imageLink": "https://i.postimg.cc/Xv5ZPt92/swift.png"
        }
    ]

    skills_frameworks = [
        {
            "skillId": "5e2ced34-8d91-4d6e-8e6e-f890ba71f8ce",
            "name": "React",
            "imageLink": "https://i.postimg.cc/wvKwyGYS/react.png"
        },
        {
            "skillId": "7c669ef2-4c73-4fa0-bf89-253c193e9636",
            "name": "Spring Boot",
            "imageLink": "https://i.postimg.cc/mk73YtgS/springboot.png"
        },
        {
            "skillId": "9c549c94-d345-44c8-b329-384e1213fd96",
            "name": ".Net",
            "imageLink": "https://i.postimg.cc/RZFsjtTb/net.png"
        },
        {
            "skillId": "02312731-38d4-4c13-8493-ebc48427d726",
            "name": "Angular",
            "imageLink": "https://i.postimg.cc/KYs5F6Wt/angular.png"
        },
        {
            "skillId": "290c0984-492f-4a71-b437-6f1f98ac2a7d",
            "name": "Next.js",
            "imageLink": "https://i.postimg.cc/JhS23hZY/nextjs.png"
        }
    ]

    skills_operating_systems = [
        {
            "skillId": "4810d510-7c36-495a-9922-9f758d22bfd2",
            "name": "Windows",
            "imageLink": "https://i.postimg.cc/0jnn45Ks/windows.png"
        },
        {
            "skillId": "b43b5917-06b7-4998-9ebc-da1a9506d8b5",
            "name": "macOS",
            "imageLink": "https://i.postimg.cc/HkhZHLZW/macos.png"
        },
        {
            "skillId": "f7073625-674a-4dc4-959b-6b7781b7bd36",
            "name": "Linux",
            "imageLink": "https://i.postimg.cc/zGX686q7/linux.png"
        }
    ]

    skills_cloud_productivity_tools = [
        {
            "skillId": "7dd73041-d26f-4928-85e9-b5e9e42f6e48",
            "name": "Google Workspace",
            "imageLink": "https://i.postimg.cc/1tNbbFyZ/google.png"
        },
        {
            "skillId": "732cdeca-bfda-47b2-8cff-2e51a2f14573",
            "name": "Microsoft Office",
            "imageLink": "https://i.postimg.cc/1tkcVpst/office.png"
        }
    ]

    # Upsert projects (update if exists, insert if not)
    for project in projects:
        await projects_collection.update_one({"projectId": project["projectId"]}, {"$set": project}, upsert=True)

    # Upsert testimonials (update if exists, insert if not)
    for testimonial in testimonials:
        await testimonials_collection.update_one({"testimonialId": testimonial["testimonialId"]}, {"$set": testimonial},
                                                 upsert=True)

    # Upsert experience (update if exists, insert if not)
    for experience in experience:
        await experiences_collection.update_one({"experienceId": experience["experienceId"]}, {"$set": experience},
                                                upsert=True)

    # Upsert skills_software_dev_tools (update if exists, insert if not)
    for skill in skills_software_dev_tools:
        await skills_software_dev_tools_collection.update_one({"skillId": skill["skillId"]}, {"$set": skill},
                                                              upsert=True)

    # Upsert skills_database (update if exists, insert if not)
    for skill in skills_database:
        await skills_database_collection.update_one({"skillId": skill["skillId"]}, {"$set": skill},
                                                    upsert=True)

    # Upsert skills_programming_languages (update if exists, insert if not)
    for skill in skills_programming_languages:
        await skills_programming_languages_collection.update_one({"skillId": skill["skillId"]}, {"$set": skill},
                                                                 upsert=True)

    skills_frameworks = replace_dots_in_keys(skills_frameworks)

    # Upsert skills_frameworks (update if exists, insert if not)
    for skill in skills_frameworks:
        await skills_frameworks_collection.update_one({"skillId": skill["skillId"]}, {"$set": skill},
                                                      upsert=True)

    # Upsert skills_operating_systems (update if exists, insert if not)
    for skill in skills_operating_systems:
        await skills_operating_systems_collection.update_one({"skillId": skill["skillId"]}, {"$set": skill},
                                                             upsert=True)

    # Upsert skills_cloud_productivity_tools (update if exists, insert if not)
    for skill in skills_cloud_productivity_tools:
        await skills_cloud_productivity_tools_collection.update_one({"skillId": skill["skillId"]}, {"$set": skill},
                                                                    upsert=True)

    # Upsert me (update if exists, insert if not)
    for me_data in me:
        await me_collection.update_one({}, {"$set": me_data}, upsert=True)

    print("Project data loaded successfully!")


if __name__ == "__main__":
    import asyncio

    asyncio.run(load_project_data())
