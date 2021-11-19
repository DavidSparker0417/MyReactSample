import { useEffect, useState } from 'react';

export default function JsonApp() {
    const [jcontents, setJcontents] = useState({})
    const getData = () => {
        fetch('manifest.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                setJcontents(myJson)
            });
    }
    
    useEffect(() => {
        getData()
    }, [])
    return(
        <div>
            Json Test!
            <ul>
            {
                Object.keys(jcontents).map((key, i) =>
                    <li key={i}>{i}. {key}</li>)
            }
            </ul>
        </div>
    )
}