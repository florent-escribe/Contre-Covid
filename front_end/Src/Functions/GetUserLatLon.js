export default function GetUserLatLon (id) {
    const route = "/user/position/" + id
    const url = new URL (route, 'http://localhost:5000/')
    console.log("Requesting : " + url.toString())
    fetch(url, {
        method : "GET"
    }).then((res) => res.json()).then(console.log)
}