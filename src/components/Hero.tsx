export async  function Hero ({ slug } ) {
  const payload = await getPayload({config});
  const hero = await payload.find( {
    collection: 'pages',
    where:{
      slug:{
        equals: slug 
      }
    }

  });

  return (
    <div>
      <h5>{hero.eyebrow}</h4>
      <h2>{hero.heading}</h2>
      
    
      
      
    </div>
    )
  
  

