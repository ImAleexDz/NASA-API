const request = require ( 'request' );

const getAsteroids = ( year, month, day ) => {
    
    const URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${year}-${month}-${day}&end_date=${year}-${month}-${day}&api_key=DEMO_KEY`;

    return new Promise ( ( resolve, reject ) => {

        request( URL, ( error, response, body ) => {

            const json = JSON.parse(body);

            if( !error && response.statusCode === 200 ) {
                const asteroids = json.near_earth_objects[`${year}-${month}-${day}`].map( element => { 
                    const { id, name, is_potentially_hazardous_asteroid } = element;

                    return {
                        [id] : {
                            name,
                            is_potentially_hazardous_asteroid
                        }
                    }
                });

                resolve(asteroids);

            } else {

                switch( response.statusCode ) {
                    case 400:
                        reject( `${json.http_error} ${json.error_message}` );
                        break;

                    default:
                        reject('Error desconocido');
                }
            }
        })
    })
}

getAsteroids('1994', '08', '10')
.then( ( res ) => console.log( res ) )
.catch( ( err ) => console.log( err ) );