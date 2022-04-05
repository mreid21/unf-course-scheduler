<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import useDatabase from '../composables/useDatabase';
import { useUserStore } from '../stores/useUserStore';
import BasePlan from '../components/BasePlan.vue';
const router = useRouter();
const store = useUserStore();
const { signOut } = useAuth();
const { fetchSchedules } = useDatabase();

const handleLogOut = async () => {
  await signOut();
  router.push({ name: 'Login' });
};

const plans = ref<any[]>([]);

onMounted(async () => {
  const result = await fetchSchedules(store.user!.id);

  if (result) plans.value = result;
  console.log(result);
});
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
      <span class="mr-1 cursor-pointer hover:scale-110">
        <font-awesome-icon icon="plus" size="lg"></font-awesome-icon>
      </span>
    </div>
    <base-plan
      v-for="plan in plans"
      @click="store.setCurrentPlan(plan.schedule_id)"
      :key="plan.schedule_id"
      :name="plan.schedule_name"
      :id="plan.schedule_id"
      :username="store.user!.user_metadata.username"
    ></base-plan>
  </div>
  <span v-else>Loading...</span>
</template>
