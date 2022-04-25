<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import useDatabase from '../composables/useDatabase';
import { useUserStore } from '../stores/useUserStore';
import BasePlan from '../components/BasePlan.vue';
import BaseModal from '../components/BaseModal.vue';

const router = useRouter();
const store = useUserStore();
const { signOut } = useAuth();
const { fetchSchedules, deleteSchedule, copySchedule, createSchedule } =
  useDatabase();

const handleLogOut = async () => {
  await signOut();
  router.push({ name: 'Login' });
};

const plans = ref<any[]>([]);
const currentPlan = reactive<{ id?: number; name?: string }>({
  id: undefined,
  name: undefined,
});
const showModal = ref(false);

const setPlans = async () => {
  const result = await fetchSchedules(store.user!.id);
  if (result) plans.value = result;
};

onMounted(async () => {
  await setPlans();
});

const deletePlan = async () => {
  if (currentPlan.id) {
    plans.value = plans.value.filter(
      (plan) => plan.schedule_id !== currentPlan.id
    );
    closeModal();
    await deleteSchedule(currentPlan.id);
  } else {
    closeModal();
    return;
  }

  currentPlan.id = undefined;
  currentPlan.name = undefined;
};

const openDeleteModal = (plan: { id: number; name: string }) => {
  currentPlan.id = plan.id;
  currentPlan.name = plan.name;

  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
};

const showCreateDialog = ref(false);
const scheduleName = ref<string>('');
const closeCreateDialog = () => (showCreateDialog.value = false);
const openCreateDialog = () => (showCreateDialog.value = true);

const createNewSchedule = async () => {
  if (scheduleName.value) {
    await createSchedule(scheduleName.value);
  } else return;

  closeCreateDialog();
  await setPlans();
  scheduleName.value = '';
};

const showCopyDialog = ref(false);
const copyID = ref<number>(-1);
const closeCopyDialog = () => (showCopyDialog.value = false);
const openCopyDialog = (originalID: number) => {
  showCopyDialog.value = true;
  copyID.value = originalID;
};
const createCopy = async () => {
  const resultingID = await createSchedule('test');

  if (resultingID && copyID.value !== -1) {
    await copySchedule(copyID.value, resultingID);
    await setPlans();
  } else {
    closeCopyDialog();
  }

  closeCopyDialog();
};
</script>
<template>
  <div
    v-if="plans"
    class="col-start-5 col-end-9 self-center grid gap-2 mb-8 p-4 rounded-lg shadow-sm bg-white"
  >
    <div class="flex justify-between items-center mb-4">
      <span
        ><button
          @click="handleLogOut"
          class="ml-1 btn hover:text-white hover:bg-slate-500"
        >
          Sign Out
        </button></span
      >
      <span
        @click="openCreateDialog"
        class="mr-1 cursor-pointer hover:scale-110"
      >
        <font-awesome-icon icon="plus" size="lg"></font-awesome-icon>
      </span>
    </div>
    <base-plan
      v-for="plan in plans"
      @delete="openDeleteModal"
      @copy="openCopyDialog"
      :key="plan.schedule_id"
      :name="plan.schedule_name"
      :id="plan.schedule_id"
      :username="store.user!.user_metadata.username"
    ></base-plan>
    <base-modal v-show="showModal" @close="closeModal">
      <template v-slot:main>
        <p>
          {{
            `Are you sure you would like to delete plan ${currentPlan.name}?`
          }}
        </p>
      </template>
      <template v-slot:actions="{ close }">
        <div class="flex">
          <button @click="deletePlan" class="btn btn--reject">Delete</button>
          <button @click="close" class="btn btn--primary">Cancel</button>
        </div>
      </template>
    </base-modal>
    <base-modal v-show="showCreateDialog" @close="closeCreateDialog">
      <template v-slot:main>
        <p>Enter a name for the new schedule.</p>
      </template>
      <template v-slot:actions="{ close }">
        <input
          class="appearance-none rounded-md py-1 px-2 border-2 border-gray-100 w-full"
          type="text"
          name="name"
          id="schedule-name"
          v-model="scheduleName"
        />
        <div class="flex">
          <button
            @click="createNewSchedule"
            :disabled="scheduleName === ''"
            class="btn btn--primary"
          >
            Add
          </button>
          <button @click="close" class="btn btn--reject">Cancel</button>
        </div>
      </template>
    </base-modal>
    <base-modal v-show="showCopyDialog" @close="closeCopyDialog">
      <template v-slot:main>
        <p>Enter a name for the copy.</p>
      </template>
      <template v-slot:actions="{ close }">
        <div class="flex">
          <button @click="createCopy" class="btn btn--primary">
            Duplicate
          </button>
          <button @click="close" class="btn btn--reject">Cancel</button>
        </div>
      </template>
    </base-modal>
  </div>
  <span v-else>Loading...</span>
</template>
