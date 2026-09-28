<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">뉴스 업로드</div>
			<div class="table-text col-6">
				<table class="table">
					<colgroup>
						<col width="20%" />
						<col width="80%" />
					</colgroup>
					<tr>
						<th>구분</th>
						<td>
							<label class="input-checkbox">
								<input type="radio" name="mode" v-model="mode" value="all" />
								<span class="checkbox radio"></span>
								<span class="text">전체</span>
							</label>
							<label class="input-checkbox">
								<input type="radio" name="mode" v-model="mode" value="normal" />
								<span class="checkbox radio"></span>
								<span class="text">일반 회원 뉴스</span>
							</label>
							<label class="input-checkbox">
								<input type="radio" name="mode" v-model="mode" value="biz" />
								<span class="checkbox radio"></span>
								<span class="text">비즈니스 회원 뉴스</span>
							</label>
						</td>
					</tr>
					<tr>
						<th>제목</th>
						<td><input type="text" class="form-control" v-model="title" /></td>
					</tr>
					<tr>
						<th>뉴스 연동 URL</th>
						<td><input type="text" class="form-control" v-model="url" /></td>
					</tr>
					<tr>
						<th>뉴스 출처</th>
						<td><input type="text" class="form-control" v-model="ref" /></td>
					</tr>
					<tr>
						<th>작성자</th>
						<td>
							<input type="text" class="form-control" :value="$store.getters.getUserInfo.mem_name" disabled />
						</td>
					</tr>
					<tr>
						<th>작성일</th>
						<td><input type="date" class="form-control" v-model="refDate" /></td>
					</tr>
				</table>
			</div>
			<div class="btn-wrap mt-4">
				<button type="button" class="btn btn-sm btn-secondary" @click="$btnOnRouterBack()">취소</button>
				<button type="button" class="btn btn-sm btn-primary" @click="updateNews()">등록</button>
				123231
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Kakao',
	components: {},
	data() {
		return {
			mode: 'all', //전체 : all, 일반 : nomal, 비즈니스 : biz
			title: '', //제목
			url: '', //url
			ref: '', //출처
			refDate: '', //작성일
		};
	},
	created() {},
	computed: {},
	methods: {
		updateNews() {
			if (this.title == '') {
				alert('제목을 입력하세요.');
				return;
			}
			if (this.url == '') {
				alert('URL을 입력하세요.');
				return;
			}
			if (this.ref == '') {
				alert('출처를 입력하세요.');
				return;
			}
			if (this.refDate == '') {
				alert('작성일을 입력하세요.');
				return;
			}

			if (!confirm('등록 하시겠습니까?')) {
				return;
			}

			this.$apiPOST('/admin/cs/news/add', {
				mode: this.mode,
				title: this.title,
				url: this.url,
				ref: this.ref,
				refDate: this.refDate,
			}).then(() => {
				this.$btnOnRouterBack();
			});
		},
	},
};
</script>

<style></style>
