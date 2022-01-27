<template>
	<div class="schedule all-100">
		<ion-grid class="ion-padding" ref="scrollable">
			<transition-group name="appear">
				<ion-row v-for="(stamp, i) in timeStamps" :key="i">
					<ion-col>
						<ion-card :class="{cardDisabled: !stamp.enable}">
							<ion-card-content>
								<ion-datetime presentation="time" :value="stamp.value" @ionChange="stamp.value = $event.target.value"></ion-datetime>
								<ion-toggle v-model="stamp.enable"></ion-toggle>
							</ion-card-content>
						</ion-card>
					</ion-col>
				</ion-row>
			</transition-group>
		</ion-grid>

		<ion-footer>
			<ion-buttons>
				<ion-button class="wideButton" fill="solid" color="success" shape="round" @click="newTimeStamp()">
					Add
				</ion-button>
			</ion-buttons>
		</ion-footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			timeStamps: []
		}
	},

	methods: {
		newTimeStamp()
		{
			this.timeStamps.push({
				value: "08:30",
				enable: true
			});

			var gridEl = this.$refs.scrollable.$el;
			setTimeout(() => gridEl.scrollTo(0, gridEl.scrollHeight), 10); 
		}
	},

	mounted() {

	},
}
</script>

<style lang="scss" scoped>
.schedule {
	width: 100%;
	max-width: 400px;
	min-width: 265px;
	height: 550px;
	margin: auto;

	background: aliceblue;
	border-radius: 10px;
}

.cardDisabled {
	background: lightslategray;

	ion-datetime {
		--background: #99aabb;
	}
}

ion-datetime {
	border-radius: 10px;
	border: 1px solid rgba(0, 0, 0, .1);
}

ion-buttons {
	height: 40px;
}

ion-toggle {
	width: 50px;
	height: 24px;
	--background-checked: var(--ion-color-success);

	--handle-spacing: 1px;
	--handle-background: var(--ion-color-success-contrast);
	--handle-background-checked: var(--ion-color-success-contrast);
}

ion-grid {
	overflow: auto;
	scroll-behavior: smooth;
	height: calc(100% - 40px);
}

ion-footer {
	background: white;
	border-radius: 10px;
}

::-webkit-scrollbar {
	display: none;
}
</style>