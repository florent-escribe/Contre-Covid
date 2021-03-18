

export default function GetUserAdress (updateFunction) {
    const route = "/user"
    const url = new URL (route, 'http://localhost:5000/')
    console.log("Requesting " + url.toString())
    fetch(url, {
        method : 'GET'
      }
    ).then((response) => response.json()).then(updateFunction)
}
