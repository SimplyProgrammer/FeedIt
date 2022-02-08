<template>
	<ion-page>
		<Header ref="header"/>

		<ion-content>
			<swiper :modules="[Navigation, Pagination, Scrollbar, A11y]" :slides-per-view="1" :space-between="50" class="all-100" ref="swiper">
				<swiper-slide>
					<Card />
				</swiper-slide>
			</swiper>
		</ion-content>
	</ion-page>
</template>

<script>
import Header from '@/components/Header.vue';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Card from '@/components/card.vue';

export default {
	components: {
		Header,
		Card
	},

	data() {
		return {
			this: this,
			deviceName: "",
			deviceIp: "",
			deviceProfiles: [

			],
		}
	},

	methods: {
		add()
		{
			this.deviceProfiles.push({
				name: this.deviceName,
				ip: this.deviceIp,
				timeStamps: this.$refs.addProdSchdule.timeStamps,
			});
			
			this.deviceName = this.deviceIp = "";
			this.$refs.addProdSchdule.timeStamps = [];
			this.$refs.addProd.close();
		}
	},
}
</script>

<style lang="scss" scoped>
ion-content {
	// --padding-end: 10px;
	// --padding-start: 10px;
	// --padding-top: 10px;
	// --padding-bottom: 10px;
}

// ion-row {
// 	max-width: 550px;
// 	margin: auto;
// 	margin-bottom: 30px;
// }

// ion-footer {
// 	position: absolute;
//  	bottom: 0;
// }
</style>