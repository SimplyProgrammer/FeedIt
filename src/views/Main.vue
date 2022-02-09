<template>
	<ion-page>
		<Header ref="header"/>
		<ion-content>
			<swiper :modules="[Navigation, Pagination, Scrollbar, A11y]" :slides-per-view="1" :space-between="0" class="swiper" ref="swiper">
				<swiper-slide class="swiper-slide">
					<Card />
				</swiper-slide>
				<swiper-slide class="swiper-slide">
					<Card />
				</swiper-slide>
				<swiper-slide class="swiper-slide">
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
		Card,
		// Navigation,
		// Pagination,
		// Scrollbar,
		// A11y
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
.swiper {
	height: 100%;
}
</style>