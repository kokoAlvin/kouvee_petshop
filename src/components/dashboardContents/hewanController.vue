<template>
<v-container>
    <v-card>
    <v-container grid-list-md mb-0>
        <h2 class = "text-md-center">Data Hewan</h2>
        <v-layout row wrap style="margin:10px">
        <v-flex xs6>
            <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialog = true">
            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Hewan
            </v-btn>
        </v-flex>
        <v-flex xs6 class="text-right">
            <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
            </v-text-field>
        </v-flex>
        </v-layout>

        <v-data-table
        :headers="headers"
        :items="hewans"
        :search="keyword"
        :loading="load">
        <template v-slot:body="{ items }" >
            <tbody>
            <tr v-for="(item,index) in items" :key="item.id_hewan">
                <td>{{ index + 1 }}</td>
                <td>{{ item.nama_hewan}}</td>
                <td>{{ item.id_jenis_hewan }}</td>
                <td>{{ item.id_ukuran_hewan }}</td>
                <td>{{ item.id_customer }}</td>
                <td>{{ item.tanggal_lahir_hewan }}</td>
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
        <span class="headline">Hewan Profile</span>
        </v-card-title>
        <v-card-text>
        <v-container>
            <v-row>
            <v-col cols="12">
                <v-text-field label="Nama_Hewan*" v-model="form.nama_hewan" required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="ID_Jenis_hewan*" v-model="form.id_jenis_hewan" required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="ID_Ukuran_Hewan*" v-model="form.id_ukuran_hewan"  required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="ID_Customer*" v-model="form.id_customer"  required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Tanggal_Lahir_Hewan*" v-model="form.tanggal_lahir_hewan"  required></v-text-field>
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
        text: 'Nama_Hewan',
        value: 'nama_hewan'
        },
        {
        text: 'ID_Jenis_Hewan',
        value: 'id_jenis_hewan'
        },
        {
        text: 'ID_Ukuran_Hewan',
        value: 'id_ukuran_hewan'
        },
        {
        text: 'ID_Customer',
        value: 'id_customer'
        },
        {
        text: 'Tanggal_Lahir_Hewan',
        value: 'tanggal_lahir_hewan',
        sortable : false
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
    hewans: [],
    snackbar: false,
    color: null,
    text: '',
    load: false,
    form: {
        nama_hewan: '',
        id_jenis_hewan: '',
        id_ukuran_hewan: '',
        id_customer: '', 
        tanggal_lahir_hewan: '', 
        created_date: '', 
        updated_date: '',
        deleted_date: '',
    },
    hewans: new FormData,
    typeInput: 'new',
    errors: '',
    updateId: '',
    }
},
methods: {
    getData() {
    var url = this.$apiUrl + '/hewan'
    this.$http.get(url).then(response => {
        this.hewans = response.data.message
    })
    },
    sendData() {
    this.hewan.append('id_jenis_hewan', this.form.nama_hewan);
    this.hewan.append('id_jenis_hewan', this.form.id_jenis_hewan);
    this.hewan.append('id_ukuran_hewan', this.form.id_ukuran_hewan);
    this.hewan.append('id_customer', this.form.id_customer);
    this.hewan.append('tanggal_lahir_hewan', this.form.tanggal_lahir_hewan);
    this.hewan.append('created_date', this.form.created_date);
    this.hewan.append('updated_date', this.form.updated_date);
    this.hewan.append('deleted_date', this.form.deleted_date);
    var uri = this.$apiUrl + '/hewan'
    this.load = true
    this.$http.post(uri, this.hewan).then(response => {
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
    this.hewan.append('id_jenis_hewan', this.form.nama_hewan);
    this.hewan.append('id_jenis_hewan', this.form.id_jenis_hewan);
    this.hewan.append('id_ukuran_hewan', this.form.id_ukuran_hewan);
    this.hewan.append('id_customer', this.form.id_customer);
    this.hewan.append('tanggal_lahir_hewan', this.form.tanggal_lahir_hewan);
    this.hewan.append('created_date', this.form.created_date);
    this.hewan.append('updated_date', this.form.updated_date);
    this.hewan.append('deleted_date', this.form.deleted_date);
    var uri = this.$apiUrl + '/hewan/' + this.updatedId;
    this.load = true
    this.$http
        .post(uri, this.hewan)
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
    this.form.nama_hewan = item.nama_hewan;
    this.form.id_jenis_hewan = item.id_jenis_hewan;
    this.form.id_ukuran_hewan = item.id_ukuran_hewan;
    this.form.id_customer = item.id_customer;
    this.form.tanggal_lahir_hewan = item.tanggal_lahir_hewan;
    this.form.created_date = item.created_date;
    this.form.updated_date = item.updated_date;
    this.form.deleted_date = item.deleted_date;
    this.updatedId = item.id;
    },

    deleteData(deleteId) {
    var uri = this.$apiUrl + '/hewan/' + deleteId;
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
        nama_hewan: '',
        id_jenis_hewan: '',
        id_ukuran_hewan: '',
        id_customer: '', 
        tanggal_lahir_hewan: '', 
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