
document.querySelector("#login")
    .addEventListener("click", ()=>
    {
        console.log('clicou')

        const email = document.querySelector("#email").value
        const senha = document.querySelector("#senha").value

        if(email != null && email != "" && senha != "" && senha != null)
        {
            fetch(`http://192.168.1.78:3000/login`,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    "email" : email,
                    "senha" : senha
                })
            }).then(async (resposta)=> {
                if(resposta.status != 200){
                    console.log(resposta.json())
                    alert("Usuário e/ou senha inexistentes! Veja se todos os campos estão preenchidos corretamente!")
                }
                else{
                    const usuario = await resposta.json()
                    localStorage.setItem('usuario', JSON.stringify({id: usuario[0].id, nome: usuario[0].nome}));                    
                    alert("Login feito com sucesso! ₍^._.^₎ 𐒡")
                    window.location.href = 'inicio.html'
                }
            })
        }
        else{
            alert("Usuário e/ou senha inexistentes! Veja se todos os campos estão preenchidos corretamente!")
        }
    })