import datetime
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


# @router.get("/projects/{project_id}",
#             response_description="Get a single project",
#             response_model=models.ProjectModel,
#             response_model_by_alias=False)
# async def get_project(project_id: str):
#     if (
#             project := await main.projects_collection.find_one({"projectId": project_id})
#     ) is not None:
#         return project
#
#     raise HTTPException(status_code=404, detail=f"Project {project_id} not found")


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
    "/testimonials",
    response_description="List all testimonials",
    response_model=models.TestimonialCollection,
    response_model_by_alias=False)
async def list_testimonials():
    return models.TestimonialCollection(testimonials=await main.testimonials_collection.find().to_list())


# @router.get("/testimonials/{testimonial_id}",
#             response_description="Get a single testimonial",
#             response_model=models.TestimonialModel,
#             response_model_by_alias=False)
# async def get_testimonial(testimonial_id: str):
#     if (
#             testimonial := await main.testimonials_collection.find_one({"testimonialId": testimonial_id})
#     ) is not None:
#         return testimonial
#
#     raise HTTPException(status_code=404, detail=f"Testimonial {testimonial_id} not found")


@router.post("/testimonials",
             response_description="Add new testimonial",
             response_model=models.TestimonialModel,
             status_code=201,
             response_model_by_alias=False)
async def create_testimonial(testimonial: models.TestimonialModel):
    testimonial.testimonialId = str(uuid.uuid4())
    testimonial.date = str(datetime.date.today())
    testimonial.isVerified = False
    await main.testimonials_collection.insert_one(testimonial.model_dump())
    return testimonial


@router.put("/testimonials/{testimonial_id}",
            response_description="Update a testimonial",
            response_model=models.TestimonialModel,
            response_model_by_alias=False)
async def update_testimonial(request: Request, testimonial_id: str, testimonial: models.UpdateTestimonialModel):
    await verify_token(request)
    if (
            existing_testimonial := await main.testimonials_collection.find_one({"testimonialId": testimonial_id})
    ) is not None:
        # If the update is empty, we should still return the matching document:
        if testimonial.dict(exclude_unset=True) == {}:
            return existing_testimonial

        updated_testimonial = {**existing_testimonial, **testimonial.dict()}
        await main.testimonials_collection.update_one({"testimonialId": testimonial_id}, {"$set": updated_testimonial})
        return updated_testimonial

    raise HTTPException(status_code=404, detail=f"Testimonial {testimonial_id} not found")


@router.delete("/testimonials/{testimonial_id}",
               response_description="Delete testimonial",
               status_code=204)
async def delete_testimonial(request: Request, testimonial_id: str):
    await verify_token(request)
    delete_result = await main.testimonials_collection.delete_one({"testimonialId": testimonial_id})

    if delete_result.deleted_count == 1:
        return Response(status_code=204)

    raise HTTPException(status_code=404, detail=f"Testimonial {testimonial_id} not found")


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


@router.get("/skills/software-dev-tools",
            response_description="List all skills",
            response_model=models.SkillCollection,
            response_model_by_alias=False)
async def list_skills_software_dev_tools():
    return models.SkillCollection(skills=await main.skills_software_dev_tools_collection.find().to_list())


@router.post("/skills/software-dev-tools",
             response_description="Add new skill",
             response_model=models.SkillModel,
             status_code=201,
             response_model_by_alias=False)
async def create_skill_software_dev_tools(request: Request, skill: models.SkillModel):
    await verify_token(request)
    skill.skillId = str(uuid.uuid4())
    await main.skills_software_dev_tools_collection.insert_one(skill.model_dump())
    return skill


@router.put("/skills/software-dev-tools/{skill_id}",
            response_description="Update skills",
            response_model=models.SkillModel,
            response_model_by_alias=False)
async def update_skill_software_dev_tools(request: Request, skill_id: str, skills: models.UpdateSkillsModel):
    await verify_token(request)
    if (
            existing_skills := await main.skills_software_dev_tools_collection.find_one({"skillId": skill_id})
    ) is not None:
        # If the update is empty, we should still return the matching document:
        if skills.dict(exclude_unset=True) == {}:
            return existing_skills

        updated_skills = {**existing_skills, **skills.dict()}
        await main.skills_software_dev_tools_collection.update_one({"skillId": skill_id}, {"$set": updated_skills})
        return updated_skills

    raise HTTPException(status_code=404, detail=f"Skill {skill_id} not found")


@router.delete("/skills/software-dev-tools/{skill_id}",
               response_description="Delete skills",
               status_code=204)
async def delete_skills_software_dev_tools(request: Request, skill_id: str):
    await verify_token(request)
    delete_result = await main.skills_software_dev_tools_collection.delete_one({"skillId": skill_id})

    if delete_result.deleted_count == 1:
        return Response(status_code=204)

    raise HTTPException(status_code=404, detail=f"Skill {skill_id} not found")


@router.get("/skills/database",
            response_description="List all skills",
            response_model=models.SkillCollection,
            response_model_by_alias=False)
async def list_skills_database():
    return models.SkillCollection(skills=await main.skills_database_collection.find().to_list())


@router.post("/skills/database",
             response_description="Add new skill",
             response_model=models.SkillModel,
             status_code=201,
             response_model_by_alias=False)
async def create_skill_database(request: Request, skill: models.SkillModel):
    await verify_token(request)
    skill.skillId = str(uuid.uuid4())
    await main.skills_database_collection.insert_one(skill.model_dump())
    return skill


@router.put("/skills/database/{skill_id}",
            response_description="Update skills",
            response_model=models.SkillModel,
            response_model_by_alias=False)
async def update_skill_database(request: Request, skill_id: str, skills: models.UpdateSkillsModel):
    await verify_token(request)
    if (
            existing_skills := await main.skills_database_collection.find_one({"skillId": skill_id})
    ) is not None:
        # If the update is empty, we should still return the matching document:
        if skills.dict(exclude_unset=True) == {}:
            return existing_skills

        updated_skills = {**existing_skills, **skills.dict()}
        await main.skills_database_collection.update_one({"skillId": skill_id}, {"$set": updated_skills})
        return updated_skills

    raise HTTPException(status_code=404, detail=f"Skill {skill_id} not found")


@router.delete("/skills/database/{skill_id}",
               response_description="Delete skills",
               status_code=204)
async def delete_skills_database(request: Request, skill_id: str):
    await verify_token(request)
    delete_result = await main.skills_database_collection.delete_one({"skillId": skill_id})

    if delete_result.deleted_count == 1:
        return Response(status_code=204)

    raise HTTPException(status_code=404, detail=f"Skill {skill_id} not found")

@router.get("/skills/database",
            response_description="List all skills",
            response_model=models.SkillCollection,
            response_model_by_alias=False)
async def list_skills_database():
    return models.SkillCollection(skills=await main.skills_database_collection.find().to_list())


@router.get("/skills/languages",
            response_description="List all skills",
            response_model=models.SkillCollection,
            response_model_by_alias=False)
async def list_skills_languages():
    return models.SkillCollection(skills=await main.skills_programming_languages_collection.find().to_list())


@router.post("/skills/languages",
             response_description="Add new skill",
             response_model=models.SkillModel,
             status_code=201,
             response_model_by_alias=False)
async def create_skill_languages(request: Request, skill: models.SkillModel):
    await verify_token(request)
    skill.skillId = str(uuid.uuid4())
    await main.skills_languages_collection.insert_one(skill.model_dump())
    return skill


@router.put("/skills/languages/{skill_id}",
            response_description="Update skills",
            response_model=models.SkillModel,
            response_model_by_alias=False)
async def update_skill_languages(request: Request, skill_id: str, skills: models.UpdateSkillsModel):
    await verify_token(request)
    if (
            existing_skills := await main.skills_languages_collection.find_one({"skillId": skill_id})
    ) is not None:
        # If the update is empty, we should still return the matching document:
        if skills.dict(exclude_unset=True) == {}:
            return existing_skills

        updated_skills = {**existing_skills, **skills.dict()}
        await main.skills_languages_collection.update_one({"skillId": skill_id}, {"$set": updated_skills})
        return updated_skills

    raise HTTPException(status_code=404, detail=f"Skill {skill_id} not found")


@router.delete("/skills/languages/{skill_id}",
               response_description="Delete skills",
               status_code=204)
async def delete_skills_languages(request: Request, skill_id: str):
    await verify_token(request)
    delete_result = await main.skills_languages_collection.delete_one({"skillId": skill_id})

    if delete_result.deleted_count == 1:
        return Response(status_code=204)

    raise HTTPException(status_code=404, detail=f"Skill {skill_id} not found")


@router.get("/skills/frameworks",
            response_description="List all skills",
            response_model=models.SkillCollection,
            response_model_by_alias=False)
async def list_skills_frameworks():
    return models.SkillCollection(skills=await main.skills_frameworks_collection.find().to_list())


@router.post("/skills/frameworks",
             response_description="Add new skill",
             response_model=models.SkillModel,
             status_code=201,
             response_model_by_alias=False)
async def create_skill_frameworks(request: Request, skill: models.SkillModel):
    await verify_token(request)
    skill.skillId = str(uuid.uuid4())
    await main.skills_frameworks_collection.insert_one(skill.model_dump())
    return skill


@router.put("/skills/frameworks/{skill_id}",
            response_description="Update skills",
            response_model=models.SkillModel,
            response_model_by_alias=False)
async def update_skill_frameworks(request: Request, skill_id: str, skills: models.UpdateSkillsModel):
    await verify_token(request)
    if (
            existing_skills := await main.skills_frameworks_collection.find_one({"skillId": skill_id})
    ) is not None:
        # If the update is empty, we should still return the matching document:
        if skills.dict(exclude_unset=True) == {}:
            return existing_skills

        updated_skills = {**existing_skills, **skills.dict()}
        await main.skills_frameworks_collection.update_one({"skillId": skill_id}, {"$set": updated_skills})
        return updated_skills

    raise HTTPException(status_code=404, detail=f"Skill {skill_id} not found")


@router.delete("/skills/frameworks/{skill_id}",
               response_description="Delete skills",
               status_code=204)
async def delete_skills_frameworks(request: Request, skill_id: str):
    await verify_token(request)
    delete_result = await main.skills_frameworks_collection.delete_one({"skillId": skill_id})

    if delete_result.deleted_count == 1:
        return Response(status_code=204)

    raise HTTPException(status_code=404, detail=f"Skill {skill_id} not found")


@router.get("/skills/operating-systems",
            response_description="List all skills",
            response_model=models.SkillCollection,
            response_model_by_alias=False)
async def list_skills_operating_systems():
    return models.SkillCollection(skills=await main.skills_operating_systems_collection.find().to_list())


@router.post("/skills/operating-systems",
             response_description="Add new skill",
             response_model=models.SkillModel,
             status_code=201,
             response_model_by_alias=False)
async def create_skill_operating_systems(request: Request, skill: models.SkillModel):
    await verify_token(request)
    skill.skillId = str(uuid.uuid4())
    await main.skills_operating_systems_collection.insert_one(skill.model_dump())
    return skill


@router.put("/skills/operating-systems/{skill_id}",
            response_description="Update skills",
            response_model=models.SkillModel,
            response_model_by_alias=False)
async def update_skill_operating_systems(request: Request, skill_id: str, skills: models.UpdateSkillsModel):
    await verify_token(request)
    if (
            existing_skills := await main.skills_operating_systems_collection.find_one({"skillId": skill_id})
    ) is not None:
        # If the update is empty, we should still return the matching document:
        if skills.dict(exclude_unset=True) == {}:
            return existing_skills

        updated_skills = {**existing_skills, **skills.dict()}
        await main.skills_operating_systems_collection.update_one({"skillId": skill_id}, {"$set": updated_skills})
        return updated_skills

    raise HTTPException(status_code=404, detail=f"Skill {skill_id} not found")


@router.delete("/skills/operating-systems/{skill_id}",
               response_description="Delete skills",
               status_code=204)
async def delete_skills_operating_systems(request: Request, skill_id: str):
    await verify_token(request)
    delete_result = await main.skills_operating_systems_collection.delete_one({"skillId": skill_id})

    if delete_result.deleted_count == 1:
        return Response(status_code=204)

    raise HTTPException(status_code=404, detail=f"Skill {skill_id} not found")


@router.get("/skills/cloud-productivity-tools",
            response_description="List all skills",
            response_model=models.SkillCollection,
            response_model_by_alias=False)
async def list_skills_cloud_productivity_tools():
    return models.SkillCollection(skills=await main.skills_cloud_productivity_tools_collection.find().to_list())


@router.post("/skills/cloud-productivity-tools",
             response_description="Add new skill",
             response_model=models.SkillModel,
             status_code=201,
             response_model_by_alias=False)
async def create_skill_cloud_productivity_tools(request: Request, skill: models.SkillModel):
    await verify_token(request)
    skill.skillId = str(uuid.uuid4())
    await main.skills_cloud_productivity_tools_collection.insert_one(skill.model_dump())
    return skill


@router.put("/skills/cloud-productivity-tools/{skill_id}",
            response_description="Update skills",
            response_model=models.SkillModel,
            response_model_by_alias=False)
async def update_skill_cloud_productivity_tools(request: Request, skill_id: str, skills: models.UpdateSkillsModel):
    await verify_token(request)
    if (
            existing_skills := await main.skills_cloud_productivity_tools_collection.find_one({"skillId": skill_id})
    ) is not None:
        # If the update is empty, we should still return the matching document:
        if skills.dict(exclude_unset=True) == {}:
            return existing_skills

        updated_skills = {**existing_skills, **skills.dict()}
        await main.skills_cloud_productivity_tools_collection.update_one({"skillId": skill_id},
                                                                         {"$set": updated_skills})
        return updated_skills

    raise HTTPException(status_code=404, detail=f"Skill {skill_id} not found")


@router.delete("/skills/cloud-productivity-tools/{skill_id}",
               response_description="Delete skills",
               status_code=204)
async def delete_skills_cloud_productivity_tools(request: Request, skill_id: str):
    await verify_token(request)
    delete_result = await main.skills_cloud_productivity_tools_collection.delete_one({"skillId": skill_id})

    if delete_result.deleted_count == 1:
        return Response(status_code=204)

    raise HTTPException(status_code=404, detail=f"Skill {skill_id} not found")


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
