<template>
    <div id="usuario" class="usuario pb-5">
        <div class="container pt-5" v-if="this.$store.state.user.userData.email != ''">
            <h2>Área restrita</h2>
            <div class="row">
                <div class="col-md-4 col-12 pr-md-1 mb-md-0 mb-4">
                    <div class="col-12 card-content p-4">
                        <div class="row align-items-center">
                            <div class="col-4">
                                <img class="userImage" :src="'../../uploads/' + this.$store.state.user.userData.fileName">
                            </div>
                            <div class="col-8 user-info">
                                <p>{{this.$store.state.user.userData.name}}</p>
                                <p>{{this.$store.state.user.userData.city}} - {{this.$store.state.user.userData.state}}</p>
                            </div>
                        </div>
                        <div class="row align-items-end more-infos h-100">
                            <div class="col-12">
                                <button  class="moreInfosBtn" type="button" @click="toggleRegisterUser">{{this.registerUserText}}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8 col-12 pl-md-1">
                    <div class="col-12 card-content p-4 pt-0">
                        <div class="row">
                            <div class="textHero col-9 pt-4">
                                <h2>Olá, {{this.$store.state.user.userData.name}}</h2>
                                <p>Bem vindo a área restrita,<button type="button" @click="logout()">Sair</button></p>
                                <div>
                                    <p>Total de pacientes cadastrados: {{filteredUsers(users).length}}</p>
                                </div>
                            </div>
                            <div class="col-3">
                                <img class="user-img" src="../assets/images/heroDoc.png">
                            </div>
                        </div>
                    </div>
                    <div class="col-12 p-3 mt-4 card-infos">
                        <div class="form-group" v-if="!registerUserSec">
                            <input type="text" class="form-control" v-model="searchText" placeholder="Digite o nome do paciente">
                            <ul v-if="searchText">
                                <li v-for="(user) in filteredUsers(users, searchText)" :key="user.id" @click="selectUser(user)">
                                {{ user.name }}
                                </li>
                                <li v-if="filteredUsers(users, searchText).length === 0">
                                    Nenhum resultado encontrado para '{{searchText}}'
                                </li>
                            </ul>
                        </div>
                        <div class="col-12 mt-2" v-if="selectedUser || registerUserSec">
                            <div class="mb-4">
                                <div class="row mb-2">
                                    <div class="col">
                                        <label>Nome</label>
                                        <input type="text" class="form-control" v-model="credentials.name"/>
                                    </div>
                                    <div class="col">
                                        <label>Nome da mãe</label>
                                        <input type="text" class="form-control" v-model="credentials.motherName"/>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col">
                                        <label>Data de nascimento</label>
                                        <input type="date" class="form-control" v-model="credentials.birthday"/>
                                    </div>
                                    <div class="col">
                                        <label>CPF</label>
                                        <input type="text" class="form-control" v-model="credentials.cpf" v-maska data-maska="###.###.###-##"/>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col">
                                        <label>CNS</label>
                                        <input type="text" class="form-control" v-model="credentials.cns" v-maska data-maska="### #### #### ####"/>
                                    </div>
                                    <div class="col">
                                        <label>Cep</label>
                                        <input type="text" class="form-control" v-model="credentials.cep" v-maska data-maska="#####-###" v-on:keyup="searchCep()" />
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col">
                                        <label>Endereço</label>
                                        <input type="text" class="form-control" v-model="credentials.address"/>
                                    </div>
                                    <div class="col">
                                        <label>Bairro</label>
                                        <input type="text" class="form-control" v-model="credentials.neighborhood"/>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col">
                                        <label>Cidade</label>
                                        <input type="text" class="form-control" v-model="credentials.city"/>
                                    </div>
                                    <div class="col">
                                        <label>Estado</label>
                                        <input type="text" class="form-control" v-model="credentials.state"/>
                                    </div>
                                </div>
                                <div class="form-group" v-if="!registerUserSec">
                                    <label>Email</label>
                                    <input type="email" class="form-control" v-model="credentials.email"/>
                                </div>
                                 <div class="row mb-2" v-else>
                                    <div class="col">
                                        <label>Email</label>
                                    <input type="email" class="form-control" v-model="credentials.email"/>
                                    </div>
                                    <div class="col">
                                        <label>Senha</label>
                                        <input type="password" class="form-control" v-model="credentials.password"/>
                                    </div>
                                </div>
                                <div class="form-group mb-2" v-if="registerUserSec">
                                    <label>Sua foto</label>
                                    <input type="file" class="form-control" ref="photoInput" @change="handlePhotoChange">
                                </div>
                            </div>
                            <div class="row cta-buttons">
                                <div class="col-6 text-center" v-if="!registerUserSec">
                                    <button class="w-100" type="button" @click="editUser">Editar dados</button>
                                </div>
                                <div class="col-6 text-center" v-if="!registerUserSec">
                                    <button class="w-100" type="button" @click="deleteUser">Excluir Paciente</button>
                                </div>
                                <div class="col-12 text-center" v-if="registerUserSec">
                                    <button class="w-100" type="button" @click="registerUser">Cadastrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            {{this.$router.push('/')}}
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import { vMaska } from "maska"
    import { cnsValidation } from '../helpers/ValidateCns.js'
    export default ({
        directives: { maska: vMaska },
        mixins: [cnsValidation],
        data () {
            return{
                users: [],
                selectedUser: '',
                registerUserSec: false,
                registerUserText: 'Cadastrar paciente',
                searchText: '',
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
            logout(){
                this.$store.commit('logoutUser')
                this.$router.push('/')
            },
            handlePhotoChange() {
                this.credentials.userPhoto = this.$refs.photoInput.files[0];
                this.credentials.fileName =  this.$refs.photoInput.files[0].name
            },
            async usersList(){
                let $scope = this
                await axios.get('http://localhost:3000/usuarios').then(function(response){
                    $scope.users = response.data
                }).catch(function(error){
                    console.log(error)
                })
            },
            selectUser(user) {
                this.selectedUser = user.id;
                this.selectedUserValues();
            },
            selectedUserValues(){
                this.credentials = this.users.find(u => u.id === this.selectedUser)    
                this.searchText = ''
            },
            filteredUsers(users) {
                let filteredUsers = users.filter(user => {
                    return user.id !== this.$store.state.user.userData.id && user.name.toLowerCase().includes(this.searchText.toLowerCase());
                });
                return filteredUsers;
            },
            toggleRegisterUser() {
                this.registerUserSec = !this.registerUserSec;
                this.registerUserText = this.registerUserSec ? 'Pesquisar pacientes' : 'Cadastrar paciente';
                this.selectedUser = !this.selectUser
                this.credentials = {
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
            },
            async checkExistingData(field, value) {
                const response = await axios.get(`http://localhost:3000/usuarios?${field}=${value}`);
                return response.data.length > 0;
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
                    if (!this.credentials[key] && key != 'userPhoto') {
                        console.log(key)
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
                let $scope = this
                await axios.post('http://localhost:3000/usuarios' , this.credentials).then(function(response){
                    $scope.registerUserSec = !$scope.registerUserSec
                    $scope.selectedUser = response.data.id
                    $scope.usersList()
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
            deleteUser() {
                this.$swal({
                    title: 'Atenção!',
                    text: `Você deseja realmente excluir o Paciente ${this.credentials.name}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Cancelar',
                    dangerMode: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                    axios.delete(`http://localhost:3000/usuarios/${this.credentials.id}`)
                        .then(() => {
                        this.$swal({
                            title: 'Paciente excluído!',
                            icon: 'success',
                        });
                        this.usersList()
                        this.selectedUser = "";
                        document.querySelector('.form-control').selectedIndex = 0;
                        })
                        .catch((error) => {
                        this.$swal({
                            title: 'Erro ao excluir Paciente!',
                            text: error.message,
                            icon: 'error',
                        });
                        });
                    }
                });
            },
            editUser() {
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
                    if (!this.credentials[key] && key != 'userPhoto') {
                        console.log(key)
                        this.$swal({
                            title: 'Erro!',
                            text: 'Preencha todos os campos!',
                            icon: 'error',
                            confirmButtonText: 'Ok',
                        });
                        return;
                    }
                }
                axios.put(`http://localhost:3000/usuarios/${this.credentials.id}`, this.credentials)
                .then(() => {
                    this.$swal({
                        title: 'Dados atualizados!',
                        text: 'Os dados do Paciente foram atualizados com sucesso.',
                        icon: 'success',
                    });
                    this.usersList();
                })
                .catch((error) => {
                    this.$swal({
                        title: 'Erro ao atualizar dados!',
                        text: error.message,
                        icon: 'error',
                    });
                });
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
        },
        mounted(){
            this.usersList()
            console.log(this.$store.state.user.userData)
        }
    })
</script>

<style lang="scss">
    #usuario{
        background-image: url('../assets/images/bgUser.svg');
        min-height: 100vh;
        background-size: cover;
        .card-content{
            background: #fff;
            border-radius: 10px;
            height: 200px;
            .textHero{
                p{
                    button{
                        background: transparent;
                        border: none;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
            }
            .user-info{
                p{
                    margin: 0;
                }
            }
            .userImage{
                width: 75px;
                height: 75px;
                clip-path: circle();
                object-fit: cover;
            }
            .user-img{
                height: 240px;
                margin-top: -20px;
            }
            .more-infos{
                .moreInfosBtn{
                    background: #282e5c;
                    padding: 9px 0;
                    width: 100%;
                    border-radius: 0.375rem;
                    border: 1px solid #282e5c;
                    color: #fff;
                    transition: 0.5s;
                    margin-bottom: 70px;
                    &:hover{
                        background: #282e5c90;
                    }
                }
            }
            @media screen and (max-width:968px){
                .col-3{
                    img{
                        height: 225px;
                        object-fit: cover;
                        position: absolute;
                        right: 5px;
                        margin-top: -20px;
                    }
                }
            }
        }
        .card-infos{
            background: #ffffff;
            border-radius: 0.375rem;
            ul {
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
                width: 100%;
                background-color: #fff;
                border-radius: 0 0 0.375rem 0.375rem;
                list-style: none;
                padding: 0;
                li{
                    cursor: pointer;
                    padding: 10px 20px;
                    transition: 0.5s;
                    &:hover{
                        background: #f1f1f1;
                        transition: 0.5s;
                    }
                }
            }
        }
        .cta-buttons{
            button{
                background: #282e5c;
                border: 1px solid #282e5c;
                padding: 9px 0;
                border-radius: 0.375rem;
                transition: 0.5s;
                color: #fff;
                &:hover{
                    background: #282e5c90;
                }
            }
        }
    }
</style>