    document.querySelector("#cadastro")
    .addEventListener("click",()=>{

        const nome = document.querySelector("#nome").value
        const email = document.querySelector("#email").value
        const senha = document.querySelector("#senha").value
    
        if(nome != null && nome != "" && email != null && email != "" && email.includes("@") && senha != null && senha != ""){
        fetch(`http://192.168.1.78:3000/cadastro`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                "nome" : nome,
                "email" : email,
                "senha" : senha
            })
        }).then((resposta)=>{
            if(resposta.status != 200){
                alert('Email já cadastrado!')
            }
            else{
                alert('Cadastro feito com sucesso! ₍^._.^₎ 𐒡')
                window.location.href = 'inicio.html'
            }
        })
        }
        else{
        alert("Veja se todos os campos estão preenchidos corretamente! Não deixe nenhum campo vazio!")
        }
    })