<template>
  <header class="flex w-full justify-between items-center p-5">
    <img src="../assets/images/dunder_mifflin_logo.svg" class="w-24" />

    <Popover>
      <template #target="{ togglePopover }">
        <Button @click="togglePopover()">
          <img src="https://i.pravatar.cc/100" alt="" class="w-10 rounded-2xl">
        </Button>
      </template>
      <template #body-main="{ togglePopover }">
        <div class="p-2 w-fit">

          <button @click="swithToDesk(togglePopover)">Swith To Desk</button>
        </div>
      </template>
    </Popover>
  </header>
</template>

<script setup>
import { Popover } from "frappe-ui";
function swithToDesk(togglePopover) {
  togglePopover()
}
</script>