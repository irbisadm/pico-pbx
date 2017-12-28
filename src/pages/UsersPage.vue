<template lang="pug">
  el-container
    el-aside(width="200px")
      LeftMenu
    el-main
      div.ppbx__header_filter
        div
          h1 UsersPage
        div
          el-button(@click="updateData", icon="el-icon-refresh", size="mini", :loading="onLoading")
        div
          el-button(@click="displayFilters = !displayFilters", icon="el-icon-more", size="mini")
      el-card(class="box-card",v-if="displayFilters")
        el-form(rel="filter", :model="params")
          el-form-item(label="Display name")
            el-input(v-model="params.display", placeholder="Display name")
          el-form-item(label="User name")
            el-input(v-model="params.name", placeholder="User name")
          el-form-item(label="Active")
            el-switch(v-model="params.active")
          el-form-item
            el-button(@click="updateData", :loading="onLoading") Filter

      el-table(:data="userData", width="100%")
        el-table-column(label="Status")
          template(slot-scope="scope")
            el-tag(:type="scope.row.type", close-transition) {{scope.row.status}}
        el-table-column(prop="user_display_name", label="Display name")
        el-table-column(prop="user_name", label="User name")
        el-table-column(prop="mobile_phone", label="Mobile phone")
        el-table-column(fixed="right", label="Operations")
          template(slot-scope="scope")
            el-button(type="text" size="small", @click="$router.push(`/user/${scope.row.user_id}/`)") Detail
            el-button(type="text" size="small", @click="$router.push(`/user/${scope.row.user_id}/edit/`)") Edit
      .ppbx__paginaton
        el-pagination(@size-change='updatePageSize', @current-change='updatePage', :current-page.sync='page', :page-sizes='[10, 20, 50, 100]', :page-size='pageSize', layout='total, sizes, prev, pager, next, jumper', :total='total')
</template>

<script lang="ts">
  import LeftMenu from '@/components/LeftMenu.vue'
  import Voximplant, {UsersRequest} from "../Voximplant";
  import Vue from "vue";
  import Component from 'vue-class-component'

  @Component({
    props: {},
    components: {
      LeftMenu
    }
  })
  export default class UsersPage extends Vue {
    params = {
      active: true,
      name: '',
      display: '',
    };
    rawUserData: Array<any> = [];
    page: number = 1;
    pageSize: number = 10;
    total: number = 0;
    displayFilters: boolean = false;
    onLoading: boolean = false;

    mounted() {
      this.updateData();
    }

    updatePage(e) {
      this.page = e;
      this.updateData();
    }

    updatePageSize(e) {
      this.pageSize = e;
      this.updateData();
    }

    updateData() {
      if (this.onLoading)
        return;
      this.onLoading = true;
      const command: UsersRequest = {
        cmd: 'GetUsers',
        count: this.pageSize,
        offset: (this.pageSize * (this.page - 1))
      };
      if (this.displayFilters) {
        command.user_active = this.params.active;
        command.user_name = this.params.name;
        command.user_display_name = this.params.display;
      }
      Voximplant.get().requestApi(command as UsersRequest).then((e) => {
        this.total = e.data.total_count;
        this.rawUserData = e.data.result;
        this.onLoading = false;
      }).catch(e => {
        this.$message.error(`Error while data retrieve: ${e.message}`);
        this.onLoading = false;
      })
    }

    get userData() {
      return this.rawUserData.map((item) => {
        return {
          user_id: item.user_id,
          user_display_name: item.user_display_name,
          user_name: item.user_name,
          mobile_phone: item.mobile_phone,
          status: (item.frozen) ? "Frozen" : (!item.active ? 'Active' : 'Disabled'),
          type: (item.frozen) ? "warning" : (!item.active ? 'success' : 'danger'),
        }
      })
    }
  }
</script>

<style scoped>
  .ppbx__paginaton {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: stretch;
    align-items: center;
    .el-pagination {
      order: 0;
      flex: 0 1 auto;
      align-self: auto;
    }
  }

  .ppbx__header_filter {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: center;
    & > div {
      order: 0;
      flex: 0 1 auto;
      align-self: auto;
      margin-right: 0.5rem;
    }
  }

  .box-card {
    margin-bottom: 1rem;
  }
</style>
