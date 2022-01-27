<template>
	<ion-card>
		<ion-card-header>
			<img :src="card.frontImgUrl"/>
		</ion-card-header>
		<ion-card-content>
			<h5>{{card.name}}</h5>
			<div class="tags">
				<ion-chip v-for="tag in card.tags ?? [card.slug] ?? []" :key="tag" @click.stop="$emit('chipClicked', tag)">
					{{tag}}
				</ion-chip>
			</div>
			<p>{{card.description}}</p>
		</ion-card-content>
	</ion-card>
</template>

<script>
export default {
	props: {
		card: {
			required: true
		}
	}
}
</script>