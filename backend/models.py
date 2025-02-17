from typing import Optional, List
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
    image: str = Field(...)
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
    )


class UpdateProjectModel(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    link: Optional[str] = None
    image: Optional[str] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
    )


class ProjectCollection(BaseModel):
    """
    A container holding a list of `StudentModel` instances.

    This exists because providing a top-level array in a JSON response can be a [vulnerability](https://haacked.com/archive/2009/06/25/json-hijacking.aspx/)
    """

    projects: List[ProjectModel]
