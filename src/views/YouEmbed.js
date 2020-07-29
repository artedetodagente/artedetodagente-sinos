import React from 'react'

function YouEmbed(props) {

  const url = props.url || "https://www.youtube.com/watch?v=TxnbWa9SPdI"
  const vid = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w-]{10,12})\b/)[1]

  return (
    <div class='embed-container'>
      <iframe title={vid} src={`https://www.youtube.com/embed/${vid}`} frameborder="0" allowfullscreen="allowfullscreen"></iframe>
    </div>
  );
}

export default YouEmbed;
