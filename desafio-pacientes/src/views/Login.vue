<template>
    <div id="login" class="login">
        <div class="container">
            <div class="row flex-md-row flex-column-reverse">
                <div class="col-md-6 col-12 image-col">
                    <img src='../assets/images/Illustration.svg'>
                </div>
                <div class="col-md-6 col-12 d-flex align-items-center justify-content-center form-col">
                    <div class="login-form col-12 p-5 pt-0">
                        <div class="form">
                            <h2 class="title">Faça login para continuar</h2>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control" v-model="credentials.email" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <label>Senha</label>
                                <input type="password" class="form-control" v-model="credentials.password" placeholder="Senha">
                            </div>
                            <div class="btn-area mb-3">
                                <button class="login-btn mt-3" type="button" @click="login()">Entrar</button>
                            </div>
                            <div class="signUp">
                                <h2>Não possui conta? <a href="/cadastro">Cadastre-se</a></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data (){
        return{
            credentials:{
                email: '',
                password: ''
            }
        }
    },
    methods:{
        async login(){
            await axios.get('http://localhost:3000/usuarios')
            .then(response => {
                const user = response.data.find(u => u.email === this.credentials.email && u.password === this.credentials.password)
                if(user){
                    this.$store.commit('loggedUser' , user)
                    this.$router.push('/usuario')
                } else {
                    this.$swal({
                        title: 'Erro!',
                        text: 'Usuário ou senha incorretos',
                        icon: 'error',
                        confirmButtonText: 'Ok',
                    });
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    mounted(){
        // localStorage.clear();
    }
}
</script>

<style lang="scss">
    #login{
        .form{
            .login-btn{
                background: #282e5c;
                padding: 9px 0;
                width: 100%;
                border-radius: 0.375rem;
                border: 1px solid #282e5c;
                color: #fff;
                transition: 0.5s;
                &:hover{
                    background: #282e5c98;
                    transition: 0.5s;
                    color: #fff;
                }
            }
            .signUp{
                h2{
                    font-size: 18px;
                    a{
                        color: #282e5c;
                        transition: 0.5s;
                    &:hover{
                        transition: 0.5s;
                        color: blue;
                    }
                    }
                }
            }
        }
        img{
            max-width: 100%;
        }
        @media screen and (max-width:968px){
            background: #e6eefa;
            .image-col{
                margin-top: -300px;
            }
            .form-col{
                z-index: 99;
                padding-top: 40px;
            }
        }
    }
</style>