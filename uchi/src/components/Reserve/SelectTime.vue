<script setup lang="ts">
import { defineComponent, ref, computed } from "vue";
import router from "../../router";
import { useRoute } from "vue-router";

import VueMeetingSelector from "vue-meeting-selector";
import slotsGenerator from "vue-meeting-selector/src/helpers/slotsGenerator";

const props = defineProps<{
  showTime: Func;
  id: string;
}>();

const meeting = ref(null);
const meetingsDays = ref([]);
const nbDaysToDisplay = ref(5);
const date = ref(new Date());

const dateSelected = ref(false);
const dateClean = ref("");

const route = useRoute();

const initMeetingsDays = () => {
  const start = {
    hours: 8,
    minutes: 0,
  };
  const end = {
    hours: 16,
    minutes: 0,
  };

  meetingsDays.value = slotsGenerator(
    new Date(),
    nbDaysToDisplay.value,
    start,
    end,
    30
  );
};

initMeetingsDays();

const meetingSelector = ref(null);

const up = () => meetingSelector.value.previousMeetings();

const down = () => meetingSelector.value.nextMeetings();

const nextDate = () => {
  const start = {
    hours: 8,
    minutes: 0,
  };
  const end = {
    hours: 16,
    minutes: 0,
  };

  const d = new Date(date.value);

  const newDate = new Date(d.setDate(d.getDate() + 7));
  date.value = newDate;
  meetingsDays.value = slotsGenerator(
    newDate,
    nbDaysToDisplay.value,
    start,
    end,
    30
  );
};

const previousDate = () => {
  const start = {
    hours: 8,
    minutes: 0,
  };
  const end = {
    hours: 16,
    minutes: 0,
  };

  const d = new Date(date.value);

  d.setDate(d.getDate() - 7);

  const formatingDate = (dateToFormat) => {
    const dateParsed = new Date(dateToFormat);
    const day =
      dateParsed.getDate() < 10
        ? `0${dateParsed.getDate()}`
        : dateParsed.getDate();
    const month =
      dateParsed.getMonth() + 1 < 10
        ? `0${dateParsed.getMonth() + 1}`
        : dateParsed.getMonth() + 1;
    const year = dateParsed.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const newDate =
    formatingDate(new Date()) >= formatingDate(d) ? new Date() : new Date(d);

  date.value = newDate;

  meetingsDays.value = slotsGenerator(
    newDate,
    nbDaysToDisplay.value,
    start,
    end,
    30
  );
};

const handleSelect = (meeting) => {
  dateSelected.value = true;

  let dt = meeting.date;
  dateClean.value = `${(dt.getMonth() + 1).toString().padStart(2, "0")}/${dt
    .getDate()
    .toString()
    .padStart(2, "0")}/${dt.getFullYear().toString().padStart(4, "0")} ${dt
    .getHours()
    .toString()
    .padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}:${dt
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;
};

const handleUnselect = () => {
  dateSelected.value = false;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const amenityId = route.params.id;
  const token = localStorage.getItem("token");
  const api =
    import.meta.env.VITE_HOST + "/api/amenity/" + amenityId + "/reserve";

  const body = {
    date: meeting.value.date,
    serviceId: props.id,
  };

  const res = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });

  const resObject = await res.json();
  alert(resObject.message);
};
</script>

<template>
  <div id="app">
    <h4 class="title">Select Time</h4>
    <button class="close" @click="showTime">Close</button>
    <vue-meeting-selector
      ref="meetingSelector"
      class="meeting-selector"
      v-model="meeting"
      :date="date"
      :loading="false"
      :meetings-days="meetingsDays"
      @next-date="nextDate"
      @previous-date="previousDate"
      @meeting-slot-selected="handleSelect"
      @meeting-slot-unselected="handleUnselect"
    />
    <form @submit="handleSubmit">
      <div class="confirmContainer" v-if="dateSelected">
        <button class="confirmBtn">Confirm</button>
        <p>{{ dateClean }}</p>
      </div>
    </form>
  </div>
</template>

<style scoped>
#app {
  background-color: #fffffff0;
  position: fixed;
  z-index: 90;
  width: 35rem;
  height: 30rem;
  left: calc(50% - 17.5rem);
  bottom: 24%;
  border-radius: 1rem;
}

.title {
  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;
}

.close {
  background-color: transparent;
  border: 0;
  font-weight: bold;
  position: absolute;
  top: 0;
  right: 1rem;
}

.close:hover {
  cursor: pointer;
  text-decoration: underline;
}

.confirmContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0rem;
}

.confirmBtn {
  width: 7rem;
  background-color: #ba76f4;
  border: 0;
  border-radius: 0.4rem;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  height: 2rem;
  margin-right: 1rem;
}

.confirmBtn:hover {
  background-color: #7b2cbf;
  cursor: pointer;
}
</style>
