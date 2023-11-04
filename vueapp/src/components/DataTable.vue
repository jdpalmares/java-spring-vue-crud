<template>
    <div>
        <b-row>
            <b-alert v-model="showSuccessAlert" variant="success" dismissible>
            {{ alertMessage }}
            </b-alert>
        </b-row>
        <b-row>
            <customer-overview
                :totalCustomers="numberOfCustomers"
                :activeCustomers="activeCustomers"
                @totalCustomersIsActive="setFilterTotalIsActive"
                @activeCustomerIsActive="setFilterActiveIsActive"
            ></customer-overview>
        </b-row>
        <b-row class="mt-3">
            <b-card>
            <b-row align-h="between">
                <b-col cols="6">
                <h3>{{ tableHeader }}</h3>
                </b-col>
                <b-col cols="2">
                <b-row>
                    <b-col>
                    <b-button
                        variant="primary"
                        id="show-btn"
                        @click="showCreateModal"
                    >
                        <b-icon-plus class="text-white"></b-icon-plus>
                        <span class="h6 text-white">New User</span>
                    </b-button>
                    </b-col>
                </b-row>
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-table
                striped
                hover
                :items="items"
                :fields="fields"
                class="text-center"
                >
                <template #cell(contact_name)="data">
                    {{
                    `${data.item.contact_firstname} ${data.item.contact_lastname}`
                    }}
                </template>
                <template #cell(customer_status)="data">
                    <b-icon-bookmark-check-fill
                    variant="success"
                    v-if="data.item.email !== null"
                    >Active</b-icon-bookmark-check-fill>
                    <b-icon-bookmark-x-fill
                    variant="danger"
                    v-else
                    >Inactive</b-icon-bookmark-x-fill>
                </template>
                <template #cell(actions)="data">
                    <b-row>
                        <!-- <b-col cols="7"> TODO uncomment and use icons if it can render
                            <b-icon-pencil-square
                                class="action-item"
                                variant="primary"
                                @click="getRowData(data.item.id)"
                            >Edit</b-icon-pencil-square>
                        </b-col> -->
                        <!-- <b-col cols="1">
                            <b-icon-trash-fill
                                class="action-item"
                                variant="danger"
                                
                            >X</b-icon-trash-fill>
                        </b-col> @click="getRowData(data.item.id)" -->
                        <b-col cols="7">
                            <b-button
                                variant="primary"
                                id="show-btn"
                                @click="showDeleteModal(data.item.id)"
                            >
                                <span class="h6 text-white">Edit</span>
                            </b-button>
                        </b-col>
                        <b-col cols="1">
                            <b-button
                                variant="danger"
                                id="show-btn"
                                @click="showDeleteModal(data.item.id)"
                            >
                                <span class="h6 text-white">X</span>
                            </b-button>
                        </b-col>
                    </b-row>
                </template>
                </b-table>
            </b-row>
            </b-card>
        </b-row>
    
        <!-- Modal for adding new customers ref="CreateCustomerModal"-->
        <b-modal
            v-model="createModalShow"
            size="xl"
            hide-footer
            title="New User"
        >
            <create-customer-modal
                @closeCreateModal="closeCreateModal"
                @reloadDataTable="getUserData"
                @showSuccessAlert="showAlertCreate"
            ></create-customer-modal>
        </b-modal>
    
        <!-- Modal for updating customers -->
        <b-modal
            ref="edit-customer-modal"
            size="xl"
            hide-footer
            title="Edit Customer"
        >
            <edit-customer-form
                @closeEditModal="closeEditModal"
                @reloadDataTable="getUserData"
                @showSuccessAlert="showAlertUpdate"
                :customerId="customerId"
            ></edit-customer-form>
        </b-modal>
    
        <!-- Delete Customer Modal -->
        <b-modal
            ref="delete-customer-modal"
            size="md"
            hide-footer
            title="Confirm Deletion"
        >
            <delete-customer-modal
                @closeDeleteModal="closeDeleteModal"
                @reloadDataTable="getUserData"
                @showDeleteAlert="showDeleteSuccessModal"
                :customerId="customerId"
            ></delete-customer-modal>
        </b-modal>
        </div>
    </template>
    
<script>
    import CreateCustomerModal from "@/components/CreateCustomerModal.vue";
import CustomerOverview from "@/components/CustomerOverview.vue";
import DeleteCustomerModal from "@/components/DeleteCustomerModal.vue";
import EditCustomerForm from "@/components/EditCustomerForm.vue";
import axios from "axios";
    
    export default {
        components: {
        CustomerOverview,
        CreateCustomerModal,
        EditCustomerForm,
        DeleteCustomerModal,
        },
        data() {
        return {
            fields: [
            {
                key: "firstName",
                label: "First Name",
                sortable: false,
            },
            {
                key: "lastName",
                label: "Last Name",
                sortable: false,
            },
            {
                key: "email",
                label: "E-Mail",
                sortable: false,
            },
            {
                key: "phoneNumber",
                label: "Phone Number",
                sortable: false,
            },
            "actions",
            ],
            items: [],
            numberOfCustomers: 0,
            activeCustomers: 0,
            activeCustomersData: [],
            customerId: 1,
            companySearchTerm: "",
            tableHeader: "",
            showSuccessAlert: false,
            alertMessage: "",
            createModalShow: false,
        };
        },
        mounted() {
        this.getUserData();
        },
        methods: {
        showCreateModal() {
            this.createModalShow = true;
        },
        closeCreateModal() {
            this.createModalShow = false;
        },
        getUserData() {
            axios
            .get("http://127.0.0.1:8080/users")
            .then((response) => {
                this.tableHeader = "All Users";
                this.items = response.data;
                this.numberOfCustomers = response.data.length;
                this.activeCustomersData = response.data.filter(
                (item) => item.email !== null
                );
                this.activeCustomers = this.activeCustomersData.length;
            })
            .catch((error) => {
                console.log(error);
            });
        },
        getRowData(id) {
            this.$refs["edit-customer-modal"].show();
            this.customerId = id;
        },
        closeEditModal() {
            this.$refs["edit-customer-modal"].hide();
        },
        setFilterTotalIsActive() {
            this.tableHeader = "Total Users";
            this.getUserData();
        },
        setFilterActiveIsActive() {
            this.tableHeader = "Active Users";
            this.items = this.activeCustomersData;
        },
        showAlertCreate() {
            this.showSuccessAlert = true;
            this.alertMessage = "User was created successfully!";
        },
        showAlertUpdate() {
            this.showSuccessAlert = true;
            this.alertMessage = "User was updated successfully";
        },
        showDeleteModal(id) {
            this.$refs["delete-customer-modal"].show();
            this.customerId = id;
        },
        closeDeleteModal() {
            this.$refs["delete-customer-modal"].hide();
        },
        showDeleteSuccessModal() {
            this.showSuccessAlert = true;
            this.alertMessage = "User was deleted successfully!";
        },
        },
    };
</script>

<style>
    .action-item:hover {
    cursor: pointer;
    }
</style>