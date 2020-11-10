import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom"
import { HashLink as Link } from 'react-router-hash-link'
import styled from 'styled-components'
import tw from 'tailwind.macro'

import api from '../services/api'
import { AccessLink } from '../components/CommonStyles'

const ProfileName = styled.h1`
  ${tw`text-4xl uppercase mb-8`}
`

const ProfileContainer = styled.div`
  ${tw`flex flex-col md:flex-row`}
  .profile-main {
    ${tw`md:mr-16 md:w-8/12`}
  }
  .profile-info {
    ${tw`md:w-4/12`}
  }
`

export default function PageCursosProfessor({id, projeto}) {

  // const {path} = useRouteMatch()
  const {profid} = useParams()
  const [professor,setProfessor] = useState()

  useEffect(()=>{
    async function fetchData(){
      const response = await api.get(`/professores?id=${profid}`)
      setProfessor(response.data[0])
    }
    fetchData()
  },[profid])

  return (
    <>
      <div className="title-1">
        <span><Link to={`/`}>Home</Link> &raquo;&nbsp;</span>
        <span><Link to={`/cursos/${projeto.slug}`}>{projeto.title}</Link></span>
      </div>

      {professor &&
        <ProfileContainer>
          <div className="profile-main">

            <ProfileName>{professor && professor.name}</ProfileName>

            {professor.bio}
            <p>&nbsp;</p>

            <h3>Cursos</h3>
            <AccessLink
              title={professor.curso.title}
              url={`/cursos/${id}/${professor.curso.slug}`}
              />
            <p>&nbsp;</p>

          </div>
          <div className="profile-info">
            {professor.image &&
              <img alt={professor.name} src={`https://admin.sinos.art.br${professor.image.url}`}/>
            }
          </div>
        </ProfileContainer>
      }
    </>
  )
}