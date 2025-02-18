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
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
    )


class UpdateProjectModel(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    link: Optional[str] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
    )


class ExperienceModel(BaseModel):
    experienceId: Optional[str] = None
    title: str = Field(...)
    company: str = Field(...)
    location: str = Field(...)
    date: str = Field(...)
    descriptions: List[str] = Field(...)
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
    )


class UpdateExperienceModel(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    date: Optional[str] = None
    descriptions: Optional[List[str]] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
    )


class CommentModel(BaseModel):
    commentId: Optional[str] = None
    content: str = Field(...)
    timestamp: str = Field(...)
    name: str = Field(...)
    isVerified: bool = Field(...)
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
    )


class UpdateCommentModel(BaseModel):
    content: Optional[str] = None
    timestamp: Optional[str] = None
    name: Optional[str] = None
    isVerified: Optional[bool] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
    )


class MeModel(BaseModel):
    bio: str = Field(...)
    education: str = Field(...)
    hobbies: Dict[str, str] = Field(...)
    github: str = Field(...)
    linkedin: str = Field(...)
    email: str = Field(...)


class UpdateMeModel(BaseModel):
    bio: Optional[str] = None
    education: Optional[str] = None
    hobbies: Dict[str, str] = Field(...)
    github: Optional[str] = None
    linkedin: Optional[str] = None
    email: Optional[str] = None


class ProjectCollection(BaseModel):
    """
    A container holding a list of `ProjectModel` instances.

    This exists because providing a top-level array in a JSON response can be a [vulnerability](https://haacked.com/archive/2009/06/25/json-hijacking.aspx/)
    """

    projects: List[ProjectModel]


class ExperienceCollection(BaseModel):
    experiences: List[ExperienceModel]


class CommentCollection(BaseModel):
    comments: List[CommentModel]


class MeCollection(BaseModel):
    me: List[MeModel]
