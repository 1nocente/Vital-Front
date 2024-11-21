'use strict'

const LoginEmpresa = () => {
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('entrar')

  button.addEventListener('click', async () => {
    const cnpj = document.getElementById('cnpj').value.trim()
    const password = document.getElementById('senha').value.trim()

    if (cnpj === '' || password === '') {
      alert('Por favor, preencha todos os campos!')
    } else {
      try {
        const response = await fetch('https://vital-back-geh2haera4f5hzfb.brazilsouth-01.azurewebsites.net/v1/vital/loginEmpresa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cnpj, senha: password }),
        })

        const result = await response.json()

        if (response.ok) {
          if (result.status_code === 200) {
            localStorage.setItem('idC', result.id_empresa)
            console.log(result.id_empresa)
            window.location.href = '/inicio' 
          } else {
            alert(result.message || 'Ocorreu um erro inesperado.')
          }
        } else {
          alert(result.message || 'Erro ao tentar fazer login. Por favor, tente novamente.')
        }
      } catch (error) {
        console.log(error)
        alert('Erro ao tentar fazer login. Por favor, tente novamente.')
      }
    }
  })
})

}
export default LoginEmpresa;
