import React from 'react'
import { RedLink } from '../components/CommonStyles'

function HomeFunarte() {
  return (
    <section id="funarte" className="home-curso full-section" style={{ backgroundImage: `url(${require('../assets/images/Pedagogia-das-cordas.jpg')})`, backgroundPosition: 'right top', height: 'auto', backgroundSize: 'cover' }}>
      <div className="curso-info">
        <div className="col col-1">
          <div className="title">
            Pedagogia das cordas - Módulo I
          </div>
          <div className="content">
            <div className="text">
              <p>
                Convidamos a todos para o primeiro, de uma série de seis cursos, sobre o ensino coletivo de instrumentos de cordas. Nomeamos esse primeiro Curso, Pedagogia das Cordas – Módulo I.
              </p>
              <p>
                Será um curso de 30h, totalmente gratuito e com certificação. Serão ao todo 8 semanas de atividades. 
              </p>
              <p>
                O curso será ofertado em um formato totalmente online, com encontros para esclarecimento de dúvidas e aprofundamentos em tempo real através do software de webconferências Zoom.
              </p>
              <p>
                O conteúdo visa capacitar o docente para a prática do ensino coletivo de instrumentos de cordas. Serão apresentados seus principais pontos e desafios, bem como o papel do educador, a estrutura da aula coletiva e seu planejamento. O conteúdo também trabalhará questões fundamentais de técnica e postura através de olhares para o Violoncelo, Contrabaixo, Viola e Violino.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <RedLink
                target="_blank" 
                to={{ pathname: "https://forms.gle/i65aV1h7dTX2XLWV6" }}>
                  Faça sua inscrição
              </RedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeFunarte
