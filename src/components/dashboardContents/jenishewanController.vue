<template>
<v-container>
    <v-card>
    <v-container grid-list-md mb-0>
        <h2 class = "text-md-center">Data Jenis Hewan</h2>
        <v-layout row wrap style="margin:10px">
        <v-flex xs6>
            <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3" @click="dialog = true">
            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
                Tambah Jenis Hewan
            </v-btn>
        </v-flex>
        <v-flex xs6 class="text-right">
            <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
            </v-text-field>
        </v-flex>
        </v-layout>

        <v-data-table
        :headers="headers"
        :items="jenishewans"
        :search="keyword"
        :loading="load">
        <template v-slot:body="{ items }" >
            <tbody>
            <tr v-for="(item,index) in items" :key="item.id_jenis_hewan">
                <td>{{ index + 1 }}</td>
                <td>{{ item.nama_jenis_hewan }}</td>
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
        <span class="headline">Jenis Hewan Profile</span>
        </v-card-title>
        <v-card-text>
        <v-container>
            <v-row>
            <v-col cols="12">
                <v-text-field label="Nama_Jenis_Hewan*" v-model="form.nama_jenis_hewan" required></v-text-field>
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
        text: 'Nama_Jenis_Hewan',
        value: 'nama_jenis_hewan'
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
    jenishewans: [],
    snackbar: false,
    color: null,
    text: '',
    load: false,
    form: {
        nama_jenis_hewan: '',
        created_date: '', 
        updated_date: '',
        deleted_date: '',
    },
    jenishewans: new FormData,
    typeInput: 'new',
    errors: '',
    updateId: '',
    }
},
methods: {
    getData() {
    var url = this.$apiUrl + '/jenishewan'
    this.$http.get(url).then(response => {
        this.jenishewans = response.data.message
    })
    },
    sendData() {
    this.jenishewan.append('nama_jenis_hewan', this.form.nama_jenis_hewan);
    this.jenishewan.append('created_date', this.form.created_date);
    this.jenishewan.append('updated_date', this.form.updated_date);
    this.jenishewan.append('deleted_date', this.form.deleted_date);
    var uri = this.$apiUrl + '/jenishewan'
    this.load = true
    this.$http.post(uri, this.jenishewan).then(response => {
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
    this.jenishewan.append('nama_jenis_hewan', this.form.nama_jenis_hewan);
    this.jenishewan.append('created_date', this.form.created_date);
    this.jenishewan.append('updated_date', this.form.updated_date);
    this.jenishewan.append('deleted_date', this.form.deleted_date);
    var uri = this.$apiUrl + '/jenishewan/' + this.updatedId;
    this.load = true
    this.$http
        .post(uri, this.jenishewan)
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
    this.form.nama_jenis_hewan = item.nama_jenis_hewan;
    this.form.created_date = item.created_date;
    this.form.updated_date = item.updated_date;
    this.form.deleted_date = item.deleted_date;
    this.updatedId = item.id;
    },

    deleteData(deleteId) {
    var uri = this.$apiUrl + '/jenishewan/' + deleteId;
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
        nama_jenis_hewan: '',
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