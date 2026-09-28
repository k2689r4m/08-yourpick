<template>
	<div>
		<textarea id="sample"></textarea>
		<div class="btn-wrap">
			<button @click="$btnOnRouterBack()" class="btn btn-sm btn-secondary">취소</button>
			<button v-if="mode == 'save'" @click="reContents" class="btn btn-sm btn-primary">저장</button>
			<button v-else-if="mode == 'edit'" @click="reContents" class="btn btn-sm btn-primary">수정</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Editor',
	props: {
		mode: {
			type: String,
			default: 'save',
		},
		content: {
			type: String,
			default: '',
		},
	},
	components: {},
	computed: {},
	data() {
		return { editor: null };
	},

	created() {},
	mounted() {
		this.initEditor();
	},
	beforeUnmount() {
		this.editor.destroy();
		this.editor = null;
	},
	updated() {},
	methods: {
		initEditor() {
			this.$loadScript('https://cdn.jsdelivr.net/npm/suneditor@latest/dist/suneditor.min.js')
				.then(() => {
					this.$loadScript('https://cdn.jsdelivr.net/npm/suneditor@latest/src/lang/ko.js')
						.then(() => {
							this.$nextTick(() => {
								this.editor = window.SUNEDITOR.create(document.getElementById('sample') || 'sample', {
									lang: window.SUNEDITOR_LANG['ko'],
									minHeight: 350,
									width: 'auto',
								});

								this.editor.setContents(this.content);
							});
						})
						.catch(() => {});
				})
				.catch(() => {});
		},
		reContents() {
			this.$emit('getContentData', this.editor.getContents(true));
		},
	},
};
</script>
