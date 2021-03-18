

export default function AddRetail(cnom_in,surface_in,tnom_in,ville_in,dep_in,region_in) {
    const route = "/retail/add"
    const url = new URL (route, "http://localhost:5000/")
    console.log('post')
    fetch(url, {
        method : 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        body : JSON.stringify({
            cnom : cnom_in,
            surface : surface_in,
            tnom : tnom_in,
            ville : ville_in,
            departement : dep_in,
            region : region_in
        })
    })
}