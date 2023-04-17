<template>
    <div id="cadastro" class="cadastro">
        <div class="container">
            <div class="row flex-md-row flex-column-reverse">
                <div class="col-12 col-md-6 image-col">
                    <img src='../assets/images/Illustration.svg'>
                </div>
                <div class="col-md-6 col-12 d-flex justify-content-center form-col">
                    <div class="cadastro-form col-12 p-5 pt-4">
                        <div class="form">
                            <h2 class="title">Crie sua conta</h2>
                            <form enctype="multipart/form-data">
                                <div class="form-group mb-2">
                                    <label>Nome completo</label>
                                    <input type="text" class="form-control" v-model="credentials.name">
                                </div>
                                <div class="form-group mb-2">
                                    <label>Nome completo da mãe</label>
                                    <input type="text" class="form-control" v-model="credentials.motherName">
                                </div>
                                <div class="form-group mb-2">
                                    <label>Data de nascimento</label>
                                    <input type="date" class="form-control" v-model="credentials.birthday">
                                </div>
                                <div class="form-group mb-2">
                                    <label>CPF</label>
                                    <input type="text" class="form-control" v-model="credentials.cpf" v-maska data-maska="###.###.###-##">
                                </div>
                                <div class="form-group mb-2">
                                    <label>CNS* (cartão nacional de saúde, com validação)</label>
                                    <input type="text" class="form-control" v-model="credentials.cns" v-maska data-maska="### #### #### ####">
                                </div>
                                <div class="form-group mb-2">
                                    <label>CEP</label>
                                    <input type="text" class="form-control" v-model="credentials.cep" v-on:keyup="searchCep()" v-maska data-maska="#####-###">
                                </div>
                                <div class="form-group mb-2">
                                    <label>Endereço</label>
                                    <input type="text" class="form-control" v-model="credentials.address">
                                </div>
                                <div class="form-group mb-2">
                                    <label>Bairro</label>
                                    <input type="text" class="form-control" v-model="credentials.neighborhood">
                                </div>
                                <div class="form-group mb-2">
                                    <label>Cidade</label>
                                    <input type="text" class="form-control" v-model="credentials.city">
                                </div>
                                <div class="form-group mb-2">
                                    <label>Estado</label>
                                    <input type="text" class="form-control" v-model="credentials.state">
                                </div>
                                <div class="form-group mb-2">
                                    <label>Email</label>
                                    <input type="email" class="form-control" v-model="credentials.email">
                                </div>
                                <div class="form-group mb-2">
                                    <label>Senha</label>
                                    <input type="password" class="form-control" v-model="credentials.password">
                                </div>
                                <div class="form-group mb-2">
                                    <label>Sua foto</label>
                                    <input type="file" class="form-control" ref="photoInput" @change="handlePhotoChange">
                                </div>
                                <div class="btn-area mb-3">
                                    <button class="cadastro-btn mt-3" type="button" @click="registerUser()">Cadastrar</button>
                                </div>
                            </form>
                            <div class="signUp">
                                <h2>Já possui conta? <a href="/">Fazer login</a></h2>
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
import { vMaska } from 'maska'
import { cnsValidation } from '../helpers/ValidateCns.js'
export default {
    directives: { maska: vMaska },
    mixins: [cnsValidation],
    data (){
        return{
            credentials:{
                name: '',
                motherName: '',
                birthday: '',
                cpf: '',
                cns: '',
                cep: '',
                address: '',
                neighborhood: '',
                city: '',
                state: '',
                email: '',
                password: '',
                userPhoto: null,
                fileName: ''
            }
        }
    },
    methods:{
       handlePhotoChange() {
            this.credentials.userPhoto = this.$refs.photoInput.files[0];
            this.credentials.fileName =  this.$refs.photoInput.files[0].name
        },
    async registerUser(){
        const cpfExists = await this.checkExistingData('cpf', this.credentials.cpf);
        const emailExists = await this.checkExistingData('email', this.credentials.email);
        const cnsExists = await this.checkExistingData('cns', this.credentials.cns);
        if (cpfExists || emailExists || cnsExists) {
            const errorMessage = cpfExists ? 'CPF já cadastrado.' :
            emailExists ? 'E-mail já cadastrado.' :
            cnsExists ? 'CNS já cadastrado.' :
            'Erro desconhecido.';
            this.$swal({
                title: 'Erro!',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Ok',
            });
            return;
        }
        if (this.credentials.cns.startsWith('1') || this.credentials.cns.startsWith('2')) {
            if (!this.validateCNSPrimary(this.credentials.cns)) {
                this.$swal({
                title: 'Erro!',
                text: 'O CNS informado é inválido',
                icon: 'error',
                confirmButtonText: 'Ok',
                });
                return;
            }
        } else {
            if (!this.validateCNS(this.credentials.cns)) {
                this.$swal({
                title: 'Erro!',
                text: 'O CNS informado é inválido',
                icon: 'error',
                confirmButtonText: 'Ok',
                });
                return;
            }
        }
        for (let key in this.credentials) {
            if (!this.credentials[key] && this.userPhoto == null) {
                this.$swal({
                    title: 'Erro!',
                    text: 'Preencha todos os campos!',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                });
                return;
            }
        }
        let formData = new FormData();
        formData.append('image', this.credentials.userPhoto);
        await axios.post('http://localhost:3001/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(function(response){
            console.log(response)
        }).catch(function(error){
            console.log(error)
        })
        let $scope = this;
        await axios.post('http://localhost:3000/usuarios', this.credentials).then(function(response){
            console.log(response)
            $scope.$store.commit('loggedUser' , response.data)
            $scope.$router.push('/usuario')
            $scope.$swal({
                title: 'Sucesso!',
                text: `Paciente ${$scope.credentials.name} cadastrado com sucesso!`,
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok',
                dangerMode: false,
        })
        }).catch(function(error){
            console.log(error)
        })
    },
        async checkExistingData(field, value) {
            const response = await axios.get(`http://localhost:3000/usuarios?${field}=${value}`);
            return response.data.length > 0;
        },
        searchCep () {        
            let cep = this.credentials.cep.toString().replace(/\D/g, '');
            if (cep.length === 8) {
                axios.get(`https://viacep.com.br/ws/${ this.credentials.cep }/json/`).then((response) => {
                    this.data = response.data
                    this.credentials.address = response.data.logradouro
                    this.credentials.city = response.data.localidade
                    this.credentials.neighborhood = response.data.bairro
                    this.credentials.state = response.data.uf
                })
            }
        },
    }
}
</script>

<style lang="scss">
    #cadastro{
        .form{
            .cadastro-btn{
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
                margin-top: -270px;
            }
            .form-col{
                z-index: 99;
                padding-top: 40px;
            }
        }
    }
</style>