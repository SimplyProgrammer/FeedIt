<template>
	<div class="selector d-flex ion-justify-content-evenly">
		<div v-for="(data, i) in data" :key="i" class="data" @click="toggleTagFilter(i)" :class="{'active' : activeValues.includes(i) }">
			<div class="name-wrapper">
				<p>{{data}}</p>
			</div>
			<ion-icon :icon="icons.ellipse"></ion-icon>
		</div>
	</div>
</template>

<script>
export default {

	props: {
		data: [],
		values: [],
		multiselection: true
	},

	data() {
		return {
			activeValues: []
		}
	},

	methods: {
		toggleTagFilter(velue) {
			if (!this.multiselection)
			{
				selectedValues = [value];
				return;
			}

            if (this.selectedValues.includes(velue)) {
                this.selectedValues = this.selectedValues.filter(item => item != velue);
            } else {
                this.selectedValues.push(velue);
            }
        },
	},

	computed: {
		selectedValues: function() {
			var selected = [];
			for (const element of this.activeValues.sort()) {
				selected.push(element);
			}
			return selected;
		}
	}
}
</script>

<style lang="scss" scoped>
selector {
	padding: 10px 0;
	// box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.3);
	border-radius: 10px;

	.data {
		display: flex;
		flex-direction: column;
		align-items: center;

		&.active {
			.name-wrapper {
				background-color: #f5b942;
			}

			ion-icon {
				opacity: 0;
			}
		}

		.name-wrapper {
			width: 30px;
			height: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50px;
		}

		p {
			margin: 0;
		}

		ion-icon {
			opacity: 0.5;
			margin-top: 10px;
			width: 5px;
			height: 5px;
		}
	}
}
</style>