<template>
<v-container>
    <v-card>
    <v-container grid-list-md mb-0>
        <h2 class = "text-md-center">Data Supplier</h2>
        <v-layout row wrap style="margin:10px">
        <v-flex xs6>
            <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialog = true">
            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Supplier
            </v-btn>
        </v-flex>
        <v-flex xs6 class="text-right">
            <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
            </v-text-field>
        </v-flex>
        </v-layout>

        <v-data-table
        :headers="headers"
        :items="suppliers"
        :search="keyword"
        :loading="load">
        <template v-slot:body="{ items }" >
            <tbody>
            <tr v-for="(item,index) in items" :key="item.id_supplier">
                <td>{{ index + 1 }}</td>
                <td>{{ item.nama_supplier }}</td>
                <td>{{ item.alamat_supplier }}</td>
                <td>{{ item.nomor_hp_supplier }}</td>
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
        <span class="headline">Supplier Profile</span>
        </v-card-title>
        <v-card-text>
        <v-container>
            <v-row>
            <v-col cols="12">
                <v-text-field label="Nama_Supplier*" v-model="form.nama_supplier" required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Alamat_Supplier*" v-model="form.alamat_supplier" required></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field label="Nomor_HP_Supplier*" v-model="form.nomor_hp_supplier"  required></v-text-field>
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
        text: 'Nama_Supplier',
        value: 'nama_supplier'
        },
        {
        text: 'Alamat_Supplier',
        value: 'alamat_supplier'
        },
        {
        text: 'Nomor_HP_Supplier',
        value: 'nomor_hp_supplier'
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
    suppliers: [],
    snackbar: false,
    color: null,
    text: '',
    load: false,
    form: {
        nama_supplier: '',
        alamat_supplier: '',
        nomor_hp_supplier: '', 
        created_date: '', 
        updated_date: '',
        deleted_date: '',
    },
    suppliers: new FormData,
    typeInput: 'new',
    errors: '',
    updateId: '',
    }
},
methods: {
    getData() {
    var url = this.$apiUrl + '/supplier'
    this.$http.get(url).then(response => {
        this.suppliers = response.data.message
    })
    },
    sendData() {
    this.supplier.append('nama_supplier', this.form.nama_supplier);
    this.supplier.append('alamat_supplier', this.form.alamat_supplier);
    this.supplier.append('nomor_hp_supplier', this.form.nomor_hp_supplier);
    this.supplier.append('created_date', this.form.created_date);
    this.supplier.append('updated_date', this.form.updated_date);
    this.supplier.append('deleted_date', this.form.deleted_date);
    var uri = this.$apiUrl + '/supplier'
    this.load = true
    this.$http.post(uri, this.supplier).then(response => {
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
    this.supplier.append('nama_supplier', this.form.nama_supplier);
    this.supplier.append('alamat_supplier', this.form.alamat_supplier);
    this.supplier.append('nomor_hp_supplier', this.form.nomor_hp_supplier);
    this.supplier.append('created_date', this.form.created_date);
    this.supplier.append('updated_date', this.form.updated_date);
    this.supplier.append('deleted_date', this.form.deleted_date);
    var uri = this.$apiUrl + '/supplier/' + this.updatedId;
    this.load = true
    this.$http
        .post(uri, this.supplier)
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
    this.form.nama_supplier = item.nama_supplier;
    this.form.alamat_supplier = item.alamat_supplier;
    this.form.nomor_hp_supplier = item.nomor_hp_supplier;
    this.form.created_date = item.created_date;
    this.form.updated_date = item.updated_date;
    this.form.deleted_date = item.deleted_date;
    this.updatedId = item.id;
    },

    deleteData(deleteId) {
    var uri = this.$apiUrl + '/supplier/' + deleteId;
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
        nama_supplier: '',
        alamat_supplier: '',
        nomor_hp_supplier: '', 
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