

export default function GetUserCovidState (id,updateFunction) {
    const route = "/user/" + id
    const url = new URL (route, 'http://localhost:5000/')
    console.log("Requesting : " + url.toString())
    fetch(url, {
        method : "GET"
    }).then((res) => res.json()).then(updateFunction)
}