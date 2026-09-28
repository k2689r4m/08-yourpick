<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">회원 상세 정보</div>
			<div class="tab-con" v-if="item">
				<div class="table-top">
					<div class="left">
						<div class="tit">기본정보</div>
					</div>
				</div>
				<div class="table-text">
					<table class="table">
						<colgroup>
							<col width="15%" />
							<col width="35%" />
							<col width="15%" />
							<col width="35%" />
						</colgroup>
						<tr>
							<th>회원구분</th>
							<td colspan="3">{{ item.type }}</td>
						</tr>
						<tr>
							<th>이름</th>
							<td colspan="3">{{ item.name }}</td>
						</tr>
						<tr>
							<th>이메일</th>
							<td colspan="3">{{ item.email }}</td>
						</tr>
						<tr>
							<th>비밀번호</th>
							<td colspan="3">
								<input type="text" class="form-control sm" placeholder="변경할 비밀번호" v-model="password" />
								<!-- <button type="button" class="btn btn-sm btn-light">변경</button> -->
							</td>
						</tr>
						<tr>
							<th>연락처</th>
							<td colspan="3">
								<input type="text" class="form-control sm" v-model="item.phone" />
							</td>
						</tr>
						<tr>
							<th>생년월일</th>
							<td colspan="3">
								<input type="text" class="form-control sm" v-model="item.birthday" />
							</td>
						</tr>
						<tr>
							<th>정보수신동의</th>
							<td colspan="3">
								<label class="input-checkbox">
									<input type="radio" name="radio" v-model="item.agreeSt" :value="1" />
									<span class="checkbox radio"></span>
									<span class="text">유</span>
								</label>
								<label class="input-checkbox">
									<input type="radio" name="radio" v-model="item.agreeSt" :value="0" />
									<span class="checkbox radio"></span>
									<span class="text">무</span>
								</label>
							</td>
						</tr>
						<tr>
							<th>가입일</th>
							<td>{{ $dateFormat(item.created_at, 'YYYY-MM-DD') }}</td>
							<th>최근접속</th>
							<td>{{ $dateFormat(item.loginDate, 'YYYY-MM-DD') }}</td>
						</tr>
					</table>
				</div>
				<div class="table-top">
					<div class="left">
						<div class="tit">보유이용권</div>
					</div>
				</div>
				<div class="table-wrap">
					<table class="table">
						<tr>
							<th>구분</th>
							<th>이용권명</th>
							<th>수량</th>
							<th>유효기간</th>
							<th>사용유무</th>
						</tr>
						<tr>
							<td>무료이용권</td>
							<td>안심거래리포트</td>
							<td>1건</td>
							<td>2023.01.01 ~ 2023.01.08</td>
							<td>사용안함</td>
						</tr>
					</table>
				</div>
				<div class="btn-wrap mt-4">
					<button type="button" class="btn btn-sm btn-secondary" @click="$btnOnRouterBack()">목록</button>
					<button type="button" class="btn btn-sm btn-primary" @click="updateItem">저장하기</button>
					<button type="button" class="btn btn-sm btn-danger" @click="deleteItem">회원박탈</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserDetail',
	components: {},
	data() {
		return {
			item: null,
			password: '',
		};
	},
	created() {
		this.getItem();
	},
	computed: {},
	methods: {
		getItem() {
			this.$apiGET('/admin/user/item?id=' + this.$route.params.id).then(re => {
				this.item = re;
			});
		},
		updateItem() {
			if (!confirm('저장 하시겠습니까?')) {
				return;
			}

			this.$apiPOST('/admin/user/item', {
				id: this.item.id,
				password: this.password,
				phone: this.item.phone,
				birthday: this.item.birthday,
				agreeSt: this.item.agreeSt,
			}).then(() => {});
		},
		deleteItem() {
			if (!confirm('정말로 삭제하시겠습니까?')) {
				return;
			}

			this.$apiPOST('/admin/user/item/del', { id: this.item.id }).then(() => {
				this.$btnOnRouterBack();
			});
		},
	},
};
</script>

<style></style>
