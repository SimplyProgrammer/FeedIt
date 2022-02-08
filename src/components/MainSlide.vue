<template>
<div class = "all-100">
	<DevicePreview ref = "preview"/>
	
	<Schedule ref = "schdule" @onTimeStampsSchanged="syncTimeStamp"/>
</div>
</template>

<script>
import Schedule from '@/components/Schedule.vue';
import DevicePreview from '@/components/DevicePreview.vue';

export default {
	components: {
		Schedule, DevicePreview
	},

	props: {
		data: {
			type: Object
		}
	},

	methods: {
		syncTimeStamp(timeStamp)
		{
			this.data.timeStamps = timeStamp;
		}
	},

	mounted() {
		this.$refs.schdule.timeStamps = this.data.timeStamps;
	}
}
</script>

<style lang="scss" scoped>

</style>