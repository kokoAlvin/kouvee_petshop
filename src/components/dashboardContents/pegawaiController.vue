<template>
<v-container>
    <v-card>
    <v-container grid-list-md mb-0>
        <h2 class = "text-md-center">Data Pegawai</h2>
        <v-layout row wrap style="margin:10px">
        <v-flex xs6>
            <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialog = true">
            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Pegawai
            </v-btn>
        </v-flex>
        <v-flex xs6 class="text-right">
            <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
            </v-text-field>
        </v-flex>
        </v-layout>

        <v-data-table
        :headers="headers"
        :items="pegawais"
        :search="keyword"
        :loading="load">
        <template v-slot:body="{ items }" >
            <tbody>
            <tr v-for="(item,index) in items" :key="item.id_pegawai">
                <td>{{ index + 1 }}</td>
                <td>{{ item.nama_pegawai }}</td>
                <td>{{ item.alamat_pegawai }}</td>
                <td>{{ item.tanggal_lahir_pegawai }}</td>
                <td>{{ item.nomor_hp_pegawai }}</td>
                <td>{{ item.role_pegawai }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.password }}</td>
                <td>{{ item.created_date }}</td>
                <td>{{ item.updated_date }}</td>
                <td>{{ item.deleted_date }}</td>
                <td class="text-center">
                <v-btn icon color="indigo" light @click="editHandler(item)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="error" light @click="deleteData(item.id)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                </td>
            </tr>
            </tbody>
        </template>
        </v-data-table>
    </v-container>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
        <v-card-title>
        <span class="headline">Pegawai Profile</span>
        </v-card-title>
        <v-card-text>
        <v-container>
            <v-row>
            <v-col cols="12">
                <v-text-field label="Nama_Pegawai*" v-model="form.nama_pegawai" required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Alamat_Pegawai*" v-model="form.alamat_pegawai" required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Tanggal_Lahir_Pegawai*" v-model="form.tanggal_lahir_pegawai"  required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Nomor_HP_Pegawai*" v-model="form.nomor_hp_pegawai"  required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Role_Pegawai*" v-model="form.role_pegawai" required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Username*" v-model="form.username"  required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Password*" v-model="form.password"  required></v-text-field>
            </v-col>
            </v-row>
        </v-container>
        <small>*indicates required fields</small>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
    {{ text }}
    <v-btn dark text @click="snackbar = false"> Close </v-btn>
    </v-snackbar>
</v-container>
</template>

<script>
export default {
data() {
    return {
    dialog: false,
    keyword: '',
    headers: [
        {
        text: 'No',
        value: 'no',
        },
        {
        text: 'Nama_Pegawai',
        value: 'nama_pegawai'
        },
        {
        text: 'Alamat_Pegawai',
        value: 'alamat_pegawai'
        },
        {
        text: 'Tanggal_Lahir_Pegawai',
        value: 'tanggal_lahir_pegawai'
        },
        {
        text: 'Nomor_HP_Pegawai',
        value: 'nomor_hp_pegawai'
        },
        {
        text: 'Role_Pegawai',
        value:'role_pegawai'
        },
        {
        text: 'Username',
        value: 'username'
        },
        {
        text: 'Password',
        value: 'password'
        },
        {
        text: 'Created_Date',
        value: 'created_date',
        sortable : false
        },
        {
        text: 'Updated_Date',
        value: 'updated_date',
        sortable : false
        },
        {
        text: 'Deleted_Date',
        value: 'deleted_date',
        sortable : false
        },
        {
        text: 'Aksi',
        value: null,
        sortable : false
        },
    ],
    pegawais: [],
    snackbar: false,
    color: null,
    text: '',
    load: false,
    form: {
        nama_pegawai: '',
        alamat_pegawair: '',
        tanggal_lahir_pegawai: '', 
        nomor_hp_pegawai: '', 
        role_pegawai: '',
        username: '',
        password: '',
        created_date: '', 
        updated_date: '',
        deleted_date: '',
    },
    pegawais: new FormData,
    typeInput: 'new',
    errors: '',
    updateId: '',
    }
},
methods: {
    getData() {
    var url = this.$apiUrl + '/pegawai'
    this.$http.get(url).then(response => {
        this.pegawais = response.data.message
    })
    },
    sendData() {
    this.pegawai.append('nama_pegawai', this.form.nama_pegawai);
    this.pegawai.append('alamat_pegawai', this.form.alamat_pegawai);
    this.pegawai.append('tanggal_lahir_pegawai', this.form.tanggal_lahir_pegawai);
    this.pegawai.append('nomor_hp_pegawai', this.form.nomor_hp_pegawai);
    this.pegawai.append('role_pegawai', this.form.role_pegawai);
    this.pegawai.append('username', this.form.username);
    this.pegawai.append('password', this.form.password);
    this.pegawai.append('created_date', this.form.created_date);
    this.pegawai.append('updated_date', this.form.updated_date);
    this.pegawai.append('deleted_date', this.form.deleted_date);
    var uri = this.$apiUrl + '/pegawai'
    this.load = true
    this.$http.post(uri, this.pegawai).then(response => {
        this.snackbar = true;
        this.color = 'green';
        this.text = response.data.message;

        this.load = false;
        this.dialog = false
        this.getData();
        this.resetForm();
        })
        .catch(error => {
        this.errors = error
        this.snackbar = true;
        this.text = 'Try Again';
        this.color = 'red';
        this.load = false;
        })
    },

    updateData() {
    this.pegawai.append('nama_pegawai', this.form.nama_pegawai);
    this.pegawai.append('alamat_pegawai', this.form.alamat_pegawai);
    this.pegawai.append('tanggal_lahir_pegawai', this.form.tanggal_lahir_pegawai);
    this.pegawai.append('nomor_hp_pegawai', this.form.nomor_hp_pegawai);
    this.pegawai.append('role_pegawai', this.form.role_pegawai);
    this.pegawai.append('username', this.form.username);
    this.pegawai.append('password', this.form.password);
    this.pegawai.append('created_date', this.form.created_date);
    this.pegawai.append('updated_date', this.form.updated_date);
    this.pegawai.append('deleted_date', this.form.deleted_date);
    var uri = this.$apiUrl + '/pegawai/' + this.updatedId;
    this.load = true
    this.$http
        .post(uri, this.pegawai)
        .then(response => {
        this.snackbar = true;
        this.color = 'green';
        this.text = response.data.message;
        this.load = false;
        this.dialog = false
        this.getData();
        this.resetForm();
        this.typeInput = 'new';
        })
        .catch(error => {
        this.errors = error
        this.snackbar = true;
        this.text = 'Try Again';
        this.color = 'red';
        this.load = false;
        this.typeInput = 'new';
        })
    },

    editHandler(item) {
    this.typeInput = 'edit';
    this.dialog = true;
    this.form.nama_pegawai = item.nama_pegawai;
    this.form.alamat_pegawai = item.alamat_pegawai;
    this.form.tanggal_lahir_pegawai = item.tanggal_lahir_pegawai;
    this.form.nomor_hp_pegawai = item.nomor_hp_pegawai;
    this.form.created_date = item.created_date;
    this.form.updated_date = item.updated_date;
    this.form.deleted_date = item.deleted_date;
    this.updatedId = item.id;
    },

    deleteData(deleteId) {
    var uri = this.$apiUrl + '/pegawair/' + deleteId;
    this.$http.delete(uri).then(response =>{
        this.snackbar = true;
        this.text = response.data.message;
        this.color = 'green'
        this.deleteDialog = false;
        this.getData();
        }).catch(error => {
        this.errors = error
        this.snackbar = true;
        this.text = 'Try Again';
        this.color = 'red';
        })
    },
    setForm() {
    if (this.typeInput === 'new') {
        this.sendData()
    } else {
        console.log("dddd")
        this.updateData()
    }
    },
    resetForm() {
    this.form = {
        nama_pegawai: '',
        alamat_pegawair: '',
        tanggal_lahir_pegawai: '', 
        nomor_hp_pegawai: '', 
        role_pegawai: '',
        username: '',
        password: '',
        created_date: '', 
        updated_date: '',
        deleted_date: '',
    }
    }
},
mounted() {
    this.getData();
}
}
</script>