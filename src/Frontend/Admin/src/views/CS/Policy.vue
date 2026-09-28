<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">개인정보 처리방침</div>
			<div class="tab-con">
				<Editor v-if="st" @getContentData="getContentData" :mode="'save'" :content="content"></Editor>
			</div>
		</div>
	</div>
</template>

<script>
import Editor from '../../components/Editor';
export default {
	name: 'Kakao',
	components: { Editor },

	data() {
		return { content: '', st: false };
	},
	created() {
		this.getContent();
	},
	mounted() {},
	beforeUnmount() {},
	computed: {},
	methods: {
		getContent() {
			this.$apiGET('/admin/cs/policy/item').then(re => {
				if (re) {
					this.content = re.content;
					this.st = true;
				}
			});
		},
		saveContent(content) {
			this.$apiPOST('/admin/cs/policy/update', { content: content }).then(() => {
				alert('저장되었습니다.');
			});
		},
		getContentData(data) {
			this.saveContent(data);
		},
	},
};
</script>
