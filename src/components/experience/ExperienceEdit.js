import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getExperience, saveExperience } from "../managers/ExperienceManager"
import { getExperienceTypes } from "../managers/ExperienceTypeManager"

export const ExperienceEdit = () => {

    const {experienceId, tripId} = useParams()
    const navigate = useNavigate()
    const [experienceTypes, setExperienceTypes] = useState([])
    const [experience, updateExperience] = useState({
        "title": "",
        "address": "",
        "websiteUrl": "",
        "experienceTypeId": 0
    })

    useEffect(
        () => {
            getExperience(experienceId)
                .then(data => {
                    const convertedExp = {
                        id: data.id,
                        title: data.title,
                        address: data.address,
                        websiteUrl: data.website_url,
                        experienceTypeId: data.experience_type.id,
                        experienceType: data.experience_type
                    }
                    updateExperience(convertedExp)})
            getExperienceTypes()
                .then(data => setExperienceTypes(data))
        },
        []
    )

    const handleSave = (event) => {
        event.preventDefault()

        saveExperience(experience)
            .then(() => navigate(`/trip/${tripId}`))
    }

    return <main>
        <form>
            <fieldset>
                <label htmlFor="title"></label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="title"
                    value={experience.title}
                    onChange={
                        (event) => {
                            const copy = {...experience}
                            copy.title = event.target.value
                            updateExperience(copy)
                        }
                    }
                />
            </fieldset>
            <fieldset>
                <label htmlFor="address"></label>
                <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="address"
                    value={experience.address}
                    onChange={
                        (event) => {
                            const copy = {...experience}
                            copy.address = event.target.value
                            updateExperience(copy)
                        }
                    }
                />
            </fieldset>
            <fieldset>
                <label htmlFor="website"></label>
                <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="website"
                    value={experience.websiteUrl}
                    onChange={
                        (event) => {
                            const copy = {...experience}
                            copy.websiteUrl = event.target.value
                            updateExperience(copy)
                        }
                    }
                />
            </fieldset>
            <fieldset>
                <label htmlFor="experienceType"></label>
                <select
                    onChange={
                        (event) => {
                            const copy = {...experience}
                            copy.experienceTypeId = parseInt(event.target.value)
                            updateExperience(copy)
                        }
                    }
                    className="form-control">
                        <option value={0}
                            className="form-control">
                            {experience.experienceType?.name}</option>
                        {
                            experienceTypes.map(expType => <option
                            key={expType.id}
                            value={expType.id}>
                            {expType.name}</option>)
                        }
                </select>
            </fieldset>
            <button onClick={(event) => handleSave(event)}>Save</button>
        </form>
    </main>
}