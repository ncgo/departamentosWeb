<script setup lang="ts">
import { defineComponent, ref } from "vue";
import VueMeetingSelector from "vue-meeting-selector";
import slotsGenerator from "vue-meeting-selector/src/helpers/slotsGenerator";

defineProps<{
  showTime: Func;
}>();

const meeting = ref(null);
const meetingsDays = ref([]);
const nbDaysToDisplay = ref(5);
const date = ref(new Date());

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

const showRef = () => {
  console.log(this.hey);
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
    />
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
</style>
