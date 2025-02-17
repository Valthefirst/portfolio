import uuid

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.responses import Response
from firebase_admin import auth

import main
import models

router = APIRouter()


@router.post('/login')
async def create_access_token(user_data: models.LoginSchema):
    email = user_data.email
    password = user_data.password

    try:
        user = main.firebase.auth().sign_in_with_email_and_password(
            email=email,
            password=password
        )

        token = user['idToken']

        return JSONResponse(
            content={"token": token},
            status_code=200
        )

    except:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )


@router.post('/ping')
async def validate_token(request: Request):
    headers = request.headers
    jwt = headers.get("authorization")
    user = auth.verify_id_token(jwt)
    return user


@router.get("/hi")
async def hello(request: Request):
    user = await verify_token(request)
    return {"message": f"Welcome back {user['user_id']}"}


@router.get(
    "/projects",
    response_description="List all projects",
    response_model=models.ProjectCollection,
    response_model_by_alias=False,
)
async def list_projects():
    return models.ProjectCollection(projects=await main.projects_collection.find().to_list())


@router.get("/projects/{project_id}",
            response_description="Get a single project",
            response_model=models.ProjectModel,
            response_model_by_alias=False)
async def get_project(project_id: str):
    if (
            project := await main.projects_collection.find_one({"projectId": project_id})
    ) is not None:
        return project

    raise HTTPException(status_code=404, detail=f"Project {project_id} not found")


@router.post("/projects",
             response_description="Add new project",
             response_model=models.ProjectModel,
             status_code=201,
             response_model_by_alias=False)
async def create_project(request: Request, project: models.ProjectModel):
    await verify_token(request)
    project.projectId = str(uuid.uuid4())
    await main.projects_collection.insert_one(project.model_dump())
    return project


@router.put("/projects/{project_id}",
            response_description="Update a project",
            response_model=models.ProjectModel,
            response_model_by_alias=False)
async def update_project(request: Request, project_id: str, project: models.UpdateProjectModel):
    await verify_token(request)
    if (
            existing_project := await main.projects_collection.find_one({"projectId": project_id})
    ) is not None:
        # If the update is empty, we should still return the matching document:
        if project.dict(exclude_unset=True) == {}:
            return existing_project

        updated_project = {**existing_project, **project.dict()}
        await main.projects_collection.update_one({"projectId": project_id}, {"$set": updated_project})
        return updated_project

    raise HTTPException(status_code=404, detail=f"Project {project_id} not found")


@router.delete("/projects/{project_id}",
               response_description="Delete project",
               status_code=204)
async def delete_project(request: Request, project_id: str):
    await verify_token(request)
    delete_result = await main.projects_collection.delete_one({"projectId": project_id})

    if delete_result.deleted_count == 1:
        return Response(status_code=204)

    raise HTTPException(status_code=404, detail=f"Project {project_id} not found")


async def verify_token(request: Request):
    authorization_header = request.headers.get("authorization")

    if not authorization_header:
        raise HTTPException(
            status_code=418,
            detail="Authorization header is missing."
        )

    try:
        scheme, token = authorization_header.split()
        if scheme.lower() != "bearer":
            raise HTTPException(
                status_code=418,
                detail="Use 'Bearer ' before the jwt."
            )
        if not token:
            raise HTTPException(
                status_code=418,
                detail="JWT token is missing."
            )
    except ValueError:
        raise HTTPException(
            status_code=418,
            detail="Invalid authorization header format. Expected 'Authorization: Bearer <JWT_TOKEN>'."
        )

    try:
        user = auth.verify_id_token(token)
        return user

    except auth.InvalidIdTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired JWT token. Please login again."
        )

    except Exception as e:
        print(f"Token verification error: {e}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error during token verification."
        )
