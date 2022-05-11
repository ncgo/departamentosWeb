<template>
  <div class="simple-example">
    <VueMeetingSelector
      class="simple-example__meeting-selector"
      v-model="meeting"
      :date="date"
      :loading="loading"
      :class-names="classNames"
      :meetings-days="meetingsDays"
      @next-date="nextDate"
      @previous-date="previousDate"
    />
    <p>meeting Selected: {{ meeting ? meeting : "No Meeting selected" }}</p>
  </div>
</template>

<script>
import VueMeetingSelector from "vue-meeting-selector";

export default {
  name: "SimpleExample",
  components: {
    VueMeetingSelector,
  },
  data() {
    return {
      date: new Date(),
      meetingsDays: [],
      meeting: null,
      loading: true,
      nbDaysToDisplay: 5,
    };
  },
  computed: {
    // because of line-height, font-type you might need to change top value
    classNames() {
      return {
        tabLoading: "loading-div",
      };
    },
  },
  methods: {
    // @click on button-right
    async nextDate() {
      // display loading
    },
    // @click on button-left
    async previousDate() {
      // display loading
    },
  },
  async created() {
    // get meetings
  },
};
</script>

<style scoped>
/* .simple-example {
  margin-top: 3em;
  &__meeting-selector {
    max-width: 542px;
  }
}
// since our scss is scoped we need to use ::v-deep
::v-deep .loading-div {
  top: 58px !important;
} */
</style>
