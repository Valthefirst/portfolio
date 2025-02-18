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
    response_model_by_alias=False)
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


@router.get(
    "/experiences",
    response_description="List all experiences",
    response_model=models.ExperienceCollection,
    response_model_by_alias=False)
async def list_experiences():
    return models.ExperienceCollection(experiences=await main.experiences_collection.find().to_list())


# @router.get("/experiences/{experience_id}",
#             response_description="Get a single experience",
#             response_model=models.ExperienceModel,
#             response_model_by_alias=False)
# async def get_experience(experience_id: str):
#     if (
#             experience := await main.experiences_collection.find_one({"experienceId": experience_id})
#     ) is not None:
#         return experience
#
#     raise HTTPException(status_code=404, detail=f"Experience {experience_id} not found")


@router.post("/experiences",
             response_description="Add new experience",
             response_model=models.ExperienceModel,
             status_code=201,
             response_model_by_alias=False)
async def create_experience(request: Request, experience: models.ExperienceModel):
    await verify_token(request)
    experience.experienceId = str(uuid.uuid4())
    await main.experiences_collection.insert_one(experience.model_dump())
    return experience


@router.put("/experiences/{experience_id}",
            response_description="Update an experience",
            response_model=models.ExperienceModel,
            response_model_by_alias=False)
async def update_experience(request: Request, experience_id: str, experience: models.UpdateExperienceModel):
    await verify_token(request)
    if (
            existing_experience := await main.experiences_collection.find_one({"experienceId": experience_id})
    ) is not None:
        # If the update is empty, we should still return the matching document:
        if experience.dict(exclude_unset=True) == {}:
            return existing_experience

        updated_experience = {**existing_experience, **experience.dict()}
        await main.experiences_collection.update_one({"experienceId": experience_id}, {"$set": updated_experience})
        return updated_experience

    raise HTTPException(status_code=404, detail=f"Experience {experience_id} not found")


@router.delete("/experiences/{experience_id}",
               response_description="Delete experience",
               status_code=204)
async def delete_experience(request: Request, experience_id: str):
    await verify_token(request)
    delete_result = await main.experiences_collection.delete_one({"experienceId": experience_id})

    if delete_result.deleted_count == 1:
        return Response(status_code=204)

    raise HTTPException(status_code=404, detail=f"Experience {experience_id} not found")


@router.get(
    "/comments",
    response_description="List all comments",
    response_model=models.CommentCollection,
    response_model_by_alias=False)
async def list_comments():
    return models.CommentCollection(comments=await main.comments_collection.find().to_list())


# @router.get("/comments/{comment_id}",
#             response_description="Get a single comment",
#             response_model=models.CommentModel,
#             response_model_by_alias=False)
# async def get_comment(comment_id: str):
#     if (
#             comment := await main.comments_collection.find_one({"commentId": comment_id})
#     ) is not None:
#         return comment
#
#     raise HTTPException(status_code=404, detail=f"Comment {comment_id} not found")


@router.post("/comments",
             response_description="Add new comment",
             response_model=models.CommentModel,
             status_code=201,
             response_model_by_alias=False)
async def create_comment(comment: models.CommentModel):
    comment.commentId = str(uuid.uuid4())
    await main.comments_collection.insert_one(comment.model_dump())
    return comment


@router.put("/comments/{comment_id}",
            response_description="Update a comment",
            response_model=models.CommentModel,
            response_model_by_alias=False)
async def update_comment(request: Request, comment_id: str, comment: models.UpdateCommentModel):
    await verify_token(request)
    if (
            existing_comment := await main.comments_collection.find_one({"commentId": comment_id})
    ) is not None:
        # If the update is empty, we should still return the matching document:
        if comment.dict(exclude_unset=True) == {}:
            return existing_comment

        updated_comment = {**existing_comment, **comment.dict()}
        await main.comments_collection.update_one({"commentId": comment_id}, {"$set": updated_comment})
        return updated_comment

    raise HTTPException(status_code=404, detail=f"Comment {comment_id} not found")


@router.delete("/comments/{comment_id}",
               response_description="Delete comment",
               status_code=204)
async def delete_comment(request: Request, comment_id: str):
    await verify_token(request)
    delete_result = await main.comments_collection.delete_one({"commentId": comment_id})

    if delete_result.deleted_count == 1:
        return Response(status_code=204)

    raise HTTPException(status_code=404, detail=f"Comment {comment_id} not found")


@router.get(
    "/me",
    response_description="Get personal information",
    response_model=models.MeModel,
    response_model_by_alias=False)
async def get_me():
    return await main.me_collection.find_one()


@router.put("/me",
            response_description="Update personal information",
            response_model=models.MeModel,
            response_model_by_alias=False)
async def update_me(request: Request, me: models.MeModel):
    await verify_token(request)
    updated_me = await main.me_collection.find_one_and_update({}, {"$set": me.dict()})
    return updated_me


# @router.get("/skills",
#             response_description="Get skills",
#             response_model=models.SkillsCategoryModel,
#             response_model_by_alias=False)
# async def get_skills():
#     return await main.skills_collection.find_one()
#
#
# @router.put("/skills",
#             response_description="Update skills",
#             response_model=models.SkillsCategoryModel,
#             response_model_by_alias=False)
# async def update_skills(request: Request, skills: models.SkillsCategoryModel):
#     await verify_token(request)
#     updated_skills = await main.skills_collection.find_one_and_update({}, {"$set": skills.dict()})
#     return updated_skills



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
