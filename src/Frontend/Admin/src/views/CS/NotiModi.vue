<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">공지사항</div>
			<div class="table-text">
				<table class="table">
					<tr>
						<th>제목</th>
						<td><input type="text" class="form-control" v-model="item.title" /></td>
					</tr>
					<tr>
						<th>구분</th>
						<td>
							<label class="input-checkbox">
								<input type="radio" name="mode" v-model="item.mode" value="normal" />
								<span class="checkbox radio"></span>
								<span class="text">일반 회원 공지사항</span>
							</label>
							<label class="input-checkbox">
								<input type="radio" name="mode" v-model="item.mode" value="biz" />
								<span class="checkbox radio"></span>
								<span class="text">비즈니스 회원 공지사항</span>
							</label>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<Editor v-if="st" @getContentData="getContentData" :mode="'edit'" :content="item.content"></Editor>
						</td>
					</tr>
				</table>
			</div>
			<!-- <div class="btn-wrap mt-4">
				<button type="button" class="btn btn-sm btn-secondary" @click="$btnOnRouterBack()">취소</button>
				<button type="button" class="btn btn-sm btn-primary" @click="updateNews()">수정</button>
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
			item: {
				mode: '',
				title: '',
				content: '',
				cId: null,
			},
			st: false,
		};
	},
	created() {
		this.getContent();
	},
	computed: {},
	methods: {
		getContent() {
			this.$apiGET('/admin/cs/noti/item?id=' + this.$route.params.id).then(data => {
				if (data) {
					this.cId = data.id;
					this.item.title = data.title;
					this.item.mode = data.mode;
					this.item.content = data.content;
					this.st = true;
				}
			});
		},
		getContentData(data) {
			if (this.title == '') {
				alert('제목을 입력하세요.');
				return;
			}
			if (!confirm('수정 하시겠습니까?')) {
				return;
			}
			this.$apiPOST('/admin/cs/noti/update', {
				id: this.$route.params.id,
				mode: this.item.mode,
				title: this.item.title,
				content: data,
			}).then(() => {
				this.$btnOnRouterBack();
			});
		},
	},
};
</script>

<style></style>
