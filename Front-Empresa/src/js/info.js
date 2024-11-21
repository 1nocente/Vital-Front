export async function getEspecialidade(){
    const url = `https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/especialidade`
    const response = await fetch(url)
    const data = await response.json()
    return data.especialidades
}


export async function getMedico(){
    const url = `https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/medico`
    const response = await fetch(url)
    const data = await response.json()
    return data.medicos
}


export async function getConsulta (id) {
    const url = `https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/consulta/${id}`
    const response = await fetch(url)
    const data = await response.json()
    return data.consulta[0]
 }