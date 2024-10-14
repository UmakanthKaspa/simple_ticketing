
<template>
    <ListView :columns="[
        {
            label: 'category',
            key: 'category',

        },
        {
            label: 'Description',
            key: 'description',
        },

        {
            label: 'Status',
            key: 'status',
        },]" 
        
        :rows="[{
      category: {
        label: 'John Doe',
        image: 'https://avatars.githubusercontent.com/u/499550',
      },
      description: {
        label: 'Active',
        bg_color: 'bg-green-600',
      },
      status: {
        label: 'Developer',
        color: 'green',
      },
    },]" 

        
        
        :options="{
            selectable: true,
            showTooltip: true,
            resizeColumn: true,
            emptyState: {
                title: 'No records found',
                description: 'Create a new record to get started',
                button: {
                    label: 'New Record',
                    variant: 'solid',
                },
            },
            getRowRoute: (row) => console.log(row),

        }" >
        </ListView>
</template>

<script setup>

import { createListResource, ListView } from 'frappe-ui'

let ticketsList = createListResource({
    doctype: 'Support Ticket',
    fields: ['description', 'status', 'category'],
    orderBy: 'creation desc'

})
ticketsList.fetch()
</script>