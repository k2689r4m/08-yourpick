<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">문의 상태</div>
			<div class="tab-con">
				<div class="table-text">
					<table class="table" v-if="item">
						<colgroup>
							<col width="15%" />
							<col width="85%" />
						</colgroup>
						<tr>
							<th>문의제목</th>
							<td>{{ item.qTitle }}</td>
						</tr>
						<tr>
							<th>구분</th>
							<td>{{ item.userType }}</td>
						</tr>
						<tr>
							<th>이름</th>
							<td>{{ item.name }}</td>
						</tr>
						<tr>
							<th>이메일</th>
							<td>{{ item.email }}</td>
						</tr>
						<tr>
							<th>작성일</th>
							<td>{{ item.qDate }}</td>
						</tr>
						<tr>
							<th>문의내용</th>
							<td>
								<div v-html="item.qMemo?.split('\n').join('<br />')"></div>
							</td>
						</tr>
						<tr>
							<th>답변제목</th>
							<td>
								<textarea class="form-control" v-model="item.aTitle"></textarea>
							</td>
						</tr>
						<tr>
							<th>답변내용</th>
							<td>
								<textarea class="form-control textarea" rows="5" v-model="item.aMemo"></textarea>
							</td>
						</tr>
						<tr>
							<th>처리상태</th>
							<td>
								<select class="form-select" v-model="item.state">
									<option>대기</option>
									<option>완료</option>
								</select>
							</td>
						</tr>
					</table>
				</div>
				<div class="btn-wrap mt-4">
					<button type="button" class="btn btn-sm btn-secondary" @click="$btnOnRouterBack()">목록</button>
					<!-- <button type="button" class="btn btn-sm btn-danger">취소</button> -->
					<button type="button" class="btn btn-sm btn-primary" @click="updateItem">저장</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Approval',
	components: {},
	data() {
		return {
			item: null,
		};
	},
	created() {
		this.getItem();
	},
	computed: {},
	methods: {
		getItem() {
			this.$apiGET('/admin/inqu/biz/item?id=' + this.$route.params.id).then(re => {
				this.item = re;
			});
		},
		updateItem() {
			if (!confirm('저장 하시겠습니까?')) {
				return;
			}

			this.$apiPOST('/admin/inqu/biz/item', {
				id: this.$route.params.id,
				aTitle: this.item.aTitle,
				aMemo: this.item.aMemo,
				aST: this.item.state == '대기' ? false : true,
			}).then(() => {});
		},
	},
};
</script>

<style></style>
