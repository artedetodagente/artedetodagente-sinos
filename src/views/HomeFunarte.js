import React from 'react'
import { RedLink } from '../components/CommonStyles'

function HomeFunarte() {
  return (
    <section id="funarte" className="home-curso full-section" style={{ backgroundImage: `url(${require('../assets/images/Funarte.jpg')})`, backgroundPosition: 'right top' }}>
      <div className="curso-info">
        <div className="col col-1">
          <div className="title">Academia Virtual Sinos - Festival Arte de Toda Gente</div>
          <div className="content">
            <div className="text">
              O Sistema Nacional de Orquestras Sociais participa do Festival Arte de Toda Gente com a Academia Virtual Sinos, que compreende hoje duas séries de oficinas ao vivo. A primeira delas oferece a alunos e integrantes de orquestras de projetos sociais aulas ao vivo de diversos instrumentos, ministradas por professores de uma das vertentes do Sinos, o Projeto Espiral. A segunda série tem como foco os professores e instrutores dessas orquestras sociais e está a cargo da equipe de outra frente do projeto Sinos, o Curso de Pedagogia das Cordas. A participação nessas atividades é gratuita, mas é necessário  inscrever-se previamente, pois o número de vagas é limitado. Conheça a programação completa das oficinas e faça a sua inscrição.
            </div>
            <div className="grid grid-cols-2 gap-2">
              <RedLink
                target="_blank" 
                to={{ pathname: "https://docs.google.com/forms/d/e/1FAIpQLSfDIRn5IdWeZBtqR5Hg-4pTO9bRT51niH2KNYtVh2D3RRTpdg/viewform?usp=sf_link" }}>
                  Projeto Espiral -  Agosto 1° Semana
              </RedLink>
              <RedLink
                target="_blank" 
                to={{ pathname: "https://docs.google.com/forms/d/e/1FAIpQLSfZwcSWvdSAMNWTM_VWmVp-UoDawbfepwFSjsZuwIf5cOOhUg/viewform?usp=sf_link" }}>
                  Projeto Espiral - Agosto 2° Semana
              </RedLink>
              <RedLink
                target="_blank" 
                to={{ pathname: "https://docs.google.com/forms/d/e/1FAIpQLSfQE2mxzt4cn7xtAQzNkx3lkwaKqGGJDIEc4hJsGJnskGcVxg/viewform?usp=sf_link" }}>
                  Projeto Espiral - Agosto 3° Semana
              </RedLink>
              <RedLink
                target="_blank" 
                to={{ pathname: "https://docs.google.com/forms/d/e/1FAIpQLSdiuvrMzQlGDukg91PypTRrcn2d_yxp1bpqoPX2osms1kjTmQ/viewform?usp=sf_link" }}>
                  Projeto Espiral - Agosto 4° Semana
              </RedLink>
              <RedLink
                target="_blank" 
                to={{ pathname: "https://docs.google.com/forms/d/e/1FAIpQLScQF5PQGgxehrJjbY_mLkzvkVLP6IAiYqFJzwJHc_VHsrT14g/viewform?usp=sf_link" }}>
                  Pedagogia das Cordas
              </RedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeFunarte
