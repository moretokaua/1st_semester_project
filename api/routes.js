
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './server.js';

const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
const routes = express.Router()
 
 routes.post('/login', async (req, res)=>{
    try {
        const { email, senha } = req.body;
        if(email != null && email != "" && senha != null && senha != "")
        {
            const { recordset } = await pool.query`select id, nome from Usuario where email = ${email} and senha = ${senha}`;
            if(recordset.length == 0)
            {
                return res.status(401).json('usuario ou senha incorreta')
            }

            return res.status(200).json(recordset)
        }
            return res.status(400).json("bad request")
    } 
    catch (error){
        console.log(error)
        return res.status(500).json('Error on server!')
    }
})

routes.post('/cadastro', async(req, res)=>{
    try{
        const {nome, email, senha} = req.body;
        console.log(nome, email, senha)
        if(nome != null && nome != "" && email != null && email != "" &&
            senha != null && senha != "")
        {
            const { recordset } = await pool.query`select email from Usuario where email = ${email}`;
            if(recordset.length == 0)
            {
                await pool.query`insert into Usuario values(${nome},${email},${senha})`
                return res.status(200).json('Cadastrado com sucesso')            
            }
            else{
                return res.status(400).json('Email ja cadastrado')
            }

        }
        return res.status(400).json("bad request") 
    }
    catch(error){
        //2627 é o code number padrão no SQL Server para violação de
        //registro unico, nesse caso a pessoa esta tentando inserir um email ja cadastrado
        if(error.number == 2627)
        {
            return res.status(409).json('Email ja cadastrado!')
        }
        return res.status(500).json('Error on server!')
    }
}) 

routes.get('/lista/:id_usuario', async (req, res)=>{
    try {
        const {id_usuario} = req.body;
            await pool.query`
            select a.id, a.titulo from Animes as a
            inner join animes_usuario as au
            on au.id_anime = a.id
            inner join Usuario as u
            on u.id = au.id_usuario
            where u.id = ${id_usuario}`
            return res.status(200).json('select feito com sucesso')
        }
    catch (error) {
     console.error(error);
     res.status(500).send(`erro ao retornar item da lista`);
    }
})

routes.post('/lista/add/:id_usuario', async (req, res) => {
    try {
      const { id_usuario } = req.params;
      const { id_anime } = req.body;
      console.log({id_usuario, id_anime})
      
      await pool.query`INSERT INTO animes_usuario values(${id_usuario}, ${id_anime})`
      return res.status(200).json('Anime adicionado com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar anime:', error);
      return res.status(500).json('Erro ao adicionar anime');
    }
  });

  routes.delete('/lista/deletar/:id_usuario', async (req, res) => {
    try {
      const { id_usuario } = req.params;
      const { id_anime } = req.body;
      console.log({id_usuario, id_anime})
      
      await pool.query`remove from animes_usuario values(${id_anime})`
      return res.status(200).json('Anime excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir anime:', error);
      return res.status(500).json('Erro ao excluir anime');
    }
  });

export default routes