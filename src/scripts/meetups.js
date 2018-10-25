// Location: Nashville
fetch("https://www.eventbriteapi.com/v3/events/search/?location.address=Nashville&expand=venue&q=Halloween&token=5ZSP7WSNF6DPPGDKLCTZ")
.then( (eventbriteData) => eventbriteData.json() )
.then( (eventbriteParsedData) => console.log(returns) 
)
