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
              Começa no próximo dia 21 de julho, com atividades que se estenderão pelos próximos meses, o Festival Arte de Toda Gente. O Evento vai reunir dezenas de professores, especialistas e artistas das mais diversas vertentes e origens geográficas em uma série de oficinas, mostras, encontros e apresentações, ao vivo e gravadas, transmitidas gratuitamente pela internet, promovendo capacitação, acessibilidade e difusão das diversas formas de arte produzidas no país. Pela primeira vez, em um só evento, estarão combinadas, de forma complementar, atividades promovidas pelos três projetos do programa Arte de Toda Gente: Bossa Criativa, Um Novo Olhar e Sistema Nacional de Orquestras Sociais – Sinos, lançados ao longo de 2020 pela parceria entre a Fundação Nacional de Artes – Funarte e a Universidade Federal do Rio de Janeiro – UFRJ, com curadoria de sua Escola de Música.
            </div>
            <RedLink
              target="_blank" 
              to={{ pathname: "https://forms.gle/nc5XE1QakNGkViEY7" }}>
                Inscreva-se
            </RedLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeFunarte
