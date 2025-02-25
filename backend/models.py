from typing import Optional, List, Dict
from pydantic import ConfigDict, BaseModel, Field


class LoginSchema(BaseModel):
    email: str
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "email@email.com",
                "password": "password123"
            }
        }


class ProjectModel(BaseModel):
    projectId: Optional[str] = None
    name: str = Field(...)
    description: str = Field(...)
    date: str = Field(...)
    link: str = Field(...)


class UpdateProjectModel(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    link: Optional[str] = None


class ExperienceModel(BaseModel):
    experienceId: Optional[str] = None
    title: str = Field(...)
    company: str = Field(...)
    location: str = Field(...)
    date: str = Field(...)
    descriptions: List[str] = Field(...)


class UpdateExperienceModel(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    date: Optional[str] = None
    descriptions: Optional[List[str]] = None


class TestimonialModel(BaseModel):
    testimonialId: Optional[str] = None
    content: str = Field(...)
    date: Optional[str] = None
    name: str = Field(...)
    isVerified: Optional[bool] = None


class UpdateTestimonialModel(BaseModel):
    content: Optional[str] = None
    date: Optional[str] = None
    name: Optional[str] = None
    isVerified: Optional[bool] = None


class HobbyModel(BaseModel):
    description: str = Field(...)
    image: str = Field(...)


class MeModel(BaseModel):
    bio: str = Field(...)
    picture: str = Field(...)
    education: str = Field(...)
    hobbies: Dict[str, HobbyModel] = Field(...)
    github: str = Field(...)
    linkedin: str = Field(...)
    email: str = Field(...)


class UpdateMeModel(BaseModel):
    bio: Optional[str] = None
    picture: Optional[str] = None
    education: Optional[str] = None
    hobbies: Optional[Dict[str, HobbyModel]] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    email: Optional[str] = None


class ResumeModel(BaseModel):
    english: str = Field(...)
    french: str = Field(...)


class UpdateResumeModel(BaseModel):
    english: Optional[str] = None
    french: Optional[str] = None


class SkillModel(BaseModel):
    skillId: Optional[str] = None
    name: str = Field(...)
    imageLink: str = Field(...)


class UpdateSkillsModel(BaseModel):
    name: Optional[str] = None
    imageLink: Optional[str] = None


class ProjectCollection(BaseModel):
    """
    A container holding a list of `ProjectModel` instances.

    This exists because providing a top-level array in a JSON response can be a [vulnerability](https://haacked.com/archive/2009/06/25/json-hijacking.aspx/)
    """

    projects: List[ProjectModel]


class ExperienceCollection(BaseModel):
    experiences: List[ExperienceModel]


class TestimonialCollection(BaseModel):
    testimonials: List[TestimonialModel]


class SkillCollection(BaseModel):
    skills: List[SkillModel]
