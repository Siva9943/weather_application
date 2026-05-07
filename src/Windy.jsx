export default function Windy({w}) {
    return(
        
        <div>
           {
    w && (

        <iframe
            width="100%"
            height="450"
            frameBorder="0"
            title="Windy Weather Map"
            src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=${w.coord.lat}&lon=${w.coord.lon}`}
        ></iframe>

    )
}
        
        </div>
    )
}
