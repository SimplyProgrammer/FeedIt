<template>
	<div class="selector d-flex ion-justify-content-evenly">
		<div v-for="(data, i) in values" :key="i" class="data" @click="toggleTagFilter(i)" :class="{'active' : activeValues.includes(i) }">
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
		values: {
			type: Array,
			default: []
		},
		multiselection: {
			type: Boolean,
			default: true
		},

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
				this.activeValues = [velue];
				return;
			}

            if (this.activeValues.includes(velue)) {
                this.activeValues = this.activeValues.filter(item => item != velue);
            } else {
                this.activeValues.push(velue);
            }
			this.$emit("selected", this.activeValues);
        },
	},

	computed: {
		selectedValues: function() {
			return this.activeValues.sort();
		}
	}
}
</script>

<style lang="scss" scoped>
.selector {
	padding: 10px 0;
	box-shadow: 0px 0px 15px -5px rgba(0, 0, 0, 0.3);
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
			transition: 0.2s;
		}

		p {
			margin: 0;
		}

		ion-icon {
			opacity: 0.5;
			margin-top: 10px;
			width: 5px;
			height: 5px;
			transition: 0.2s;
		}
	}
}
</style>