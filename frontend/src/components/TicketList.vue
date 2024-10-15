<template>
  <!-- Header -->
  <div class="flex justify-between">
    <h1>Support Tickets</h1>
    <Button @click="dialog = !dialog" :variant="'solid'" theme="gray" size="md" label="+ New Ticket" />
  </div>

  <!-- list container -->
  <div>
    <ListView :columns="columns" :rows="rows" :options="listOptions" row-key="id">

      <ListHeader>
        <ListHeaderItem v-for="column in columns" :key="column.key" :item="column">
          <template #prefix="{ item }">
            <FeatherIcon :name="item.icon" class="h-4 w-4" />
          </template>
        </ListHeaderItem>
      </ListHeader>

      <ListRows>
        <ListRow v-for="row in rows" :key="row.id" :row="row">
          <template #default="{ column, item }">
            <ListRowItem :item="item" :align="column.align">
              <template #prefix>
              </template>
              <Badge v-if="column.key === 'status'" :variant="'solid'" :theme="getBadgeVariant(row.status)" size="md"
                label="Badge">
                {{ row.status }}
              </Badge>
            </ListRowItem>
          </template>
        </ListRow>
      </ListRows>

    </ListView>
  </div>


  <Dialog v-model="dialog" :options="{
    size: 'xl',
  }">
    <template #body-title>
      <h3>Create new ticket</h3>
    </template>

    <template #body-content>
      <div class="p-2">
        <FormControl type="text" size="sm" variant="subtle" placeholder="Title" label="Title"
          v-model="newTicket.title" />
      </div>

      <div class="p-2">
        <FormControl type="select" :options=statusOptions size="sm" variant="subtle" placeholder="Status" label="Status"
          v-model="newTicket.status" />
      </div>

      <div class="p-2">
        <FormControl type="select" :options=categoryOptions size="sm" variant="subtle" placeholder="Category"
          label="Category" v-model="newTicket.category" />
      </div>

      <TextEditor ref="editor" :fixedMenu="true" editorClass="prose-sm max-w-none p-2 min-h-28"
        placeholder="Describe your problem..." @change="val => newTicket.description = val" />
    </template>

    <template #actions>
      <Button class="ml-2" @click="createNewTicket">
        Create
      </Button>
    </template>

  </Dialog>

</template>

<script setup>
import {
  createListResource,
  ListView,
  ListRows,
  ListRow,
  ListRowItem,
  ListHeader,
  FeatherIcon,
  Badge,
  ListHeaderItem,
  Button,
  Dialog,
  FormControl,
  TextEditor
} from "frappe-ui";
import { computed, reactive, ref } from 'vue';

let dialog = ref(false)
let newTicket = reactive({
  title: '',
  status: 'Open',
  category: 'Delivery',
  description: ''
})

const ticketsResource = createListResource({
  doctype: 'Support Ticket',
  fields: ['title', 'status', 'category', 'creation', 'name', 'priority'],
  orderBy: 'creation desc',
  auto: true,
});

const listOptions = {
  onRowClick: row => console.log(row),
  selectable: true,
  showTooltip: true,
  resizeColumn: true,
};

const columns = [
  { label: 'Title', key: 'title', icon: 'file-text' },
  { label: 'Status', key: 'status', icon: 'check-circle' },
  { label: 'Category', key: 'category', icon: 'folder' },
  { label: 'Priority', key: 'priority', icon: 'alert-triangle' },
];

const rows = computed(() => {
  if (!ticketsResource.list.data) {
    return [];
  }
  return ticketsResource.list.data.map((ticket) => ({
    id: ticket.name,
    title: ticket.title,
    status: ticket.status,
    category: ticket.category,
    priority: ticket.priority,
  }));
});

const statusOptions = [
  {
    label: 'Open',
    value: 'Open',
  },
  {
    label: 'Waiting for reply',
    value: 'Waiting for reply',
  },
  {
    label: 'Resolved',
    value: 'Resolved',
  },
  {
    label: 'Closed',
    value: 'Closed',
  }
]
const categoryOptions = [
  {
    label: 'Delivery',
    value: 'Delivery',
  },
  {
    label: 'Paper Quality',
    value: 'Paper Quality',
  },
  {
    label: 'Other',
    value: 'Other',
  }
]

const getBadgeVariant = status => {
  const variants = {
    'Open': 'green',
    'In Progress': 'orange',
    'Closed': 'red',
  };
  return variants[status] || 'gray';
};

function createNewTicket() {
  ticketsResource.insert.submit(
    newTicket
  )
}
</script>