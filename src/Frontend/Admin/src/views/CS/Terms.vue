<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">이용약관</div>
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
			this.$apiGET('/admin/cs/term/item').then(re => {
				if (re) {
					this.content = re.content;
					this.st = true;
				}
			});
		},
		saveContent(content) {
			this.$apiPOST('/admin/cs/term/update', { content: content }).then(() => {
				alert('저장되었습니다.');
			});
		},
		getContentData(data) {
			this.saveContent(data);
		},
	},
};
</script>
