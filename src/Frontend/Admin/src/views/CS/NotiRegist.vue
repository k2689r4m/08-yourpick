<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">공지사항</div>
			<div class="table-text">
				<table class="table">
					<tr>
						<th>제목</th>
						<td><input type="text" class="form-control" v-model="title" /></td>
					</tr>
					<tr>
						<th>구분</th>
						<td>
							<label class="input-checkbox">
								<input type="radio" name="mode" v-model="mode" value="normal" />
								<span class="checkbox radio"></span>
								<span class="text">일반 회원 공지사항</span>
							</label>
							<label class="input-checkbox">
								<input type="radio" name="mode" v-model="mode" value="biz" />
								<span class="checkbox radio"></span>
								<span class="text">비즈니스 회원 공지사항</span>
							</label>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<Editor @getContentData="getContentData" :mode="'save'"></Editor>
						</td>
					</tr>
				</table>
			</div>
			<!-- <div class="btn-wrap mt-4">
				<button type="button" class="btn btn-sm btn-secondary">취소</button>
				<button type="button" class="btn btn-sm btn-primary">등록</button>
			</div> -->
		</div>
	</div>
</template>

<script>
import Editor from '../../components/Editor';
export default {
	name: 'Kakao',
	components: { Editor },
	data() {
		return {
			mode: 'normal',
			title: '',
			content: '',
			cId: null,
		};
	},
	created() {},
	computed: {},
	methods: {
		getContent() {
			this.$apiGET('/admin/cs/noti/add').then(re => {
				if (re) {
					this.content = re.content;
					this.cId = re.id;
				}
			});
		},
		saveContent(content) {
			this.$apiPOST('/admin/cs/noti/add', {
				mode: this.mode,
				title: this.title,
				content: content,
			}).then(() => {
				this.$btnOnRouterBack();
			});
		},
		getContentData(data) {
			if (this.title == '') {
				alert('제목을 입력하세요.');
				return;
			}
			if (!confirm('등록 하시겠습니까?')) {
				return;
			}
			this.saveContent(data);
		},
	},
};
</script>

<style></style>
